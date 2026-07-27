import asyncio
import time
from redis.asyncio import Redis
from app.models.schemas import TelemetryPayload
from app.db.redis import get_redis
from app.db.postgres import db_manager
from app.core.logger import logger

class TelemetryBatcher:
    def __init__(self):
        self._monitor_task: asyncio.Task | None = None

    async def push_payload(self, terminal: str, washroom_id: str, payload: TelemetryPayload, redis: Redis = None):
        # Extract floor from washroom_id (e.g., "L2_M01" -> "L2", "L2-M01" -> "L2")
        floor = "unknown_floor"
        for sep in ("_", "-"):
            if sep in washroom_id:
                floor = washroom_id.split(sep)[0]
                break

        if redis is None:
            redis = await get_redis()

        buffer_key = f"state:floor:{terminal}:{floor}:telemetry_buffer"
        payload_json = payload.model_dump_json()

        # Add to buffer and register active buffer
        length = await redis.rpush(buffer_key, payload_json)
        await redis.sadd("state:active_telemetry_buffers", buffer_key)

        # Trigger immediate flush if size limit is reached (100)
        if length >= 100:
            logger.info(f"Buffer size limit (100) reached for {buffer_key}. Flushing immediately.")
            await self.flush_buffer(buffer_key, redis)

    async def flush_buffer(self, buffer_key: str, redis: Redis = None):
        if redis is None:
            redis = await get_redis()

        temp_key = f"{buffer_key}:temp"

        # Atomically rename to temp_key to avoid race conditions with incoming writes
        try:
            await redis.rename(buffer_key, temp_key)
        except Exception:
            # Key might not exist (already renamed or empty)
            return

        # Fetch elements
        items = await redis.lrange(temp_key, 0, -1)
        if not items:
            await redis.delete(temp_key)
            return

        # Parse payloads and prepare db parameters
        list_of_tuples = []
        for item in items:
            try:
                payload = TelemetryPayload.model_validate_json(item)
                list_of_tuples.append((
                    payload.timestamp,
                    payload.device_id,
                    payload.terminal,
                    payload.washroom_id,
                    payload.avg_nh3_ppm,
                    payload.peak_nh3_ppm,
                    payload.avg_temperature_c,
                    payload.avg_humidity_percent,
                    payload.throughput,
                    payload.occupancy_inside,
                    payload.abandon_rate_percent,
                    payload.raw_whi
                ))
            except Exception as parse_err:
                logger.warning(f"Skipping malformed telemetry payload during batch insert: {parse_err}")

        # Perform bulk write
        if list_of_tuples:
            try:
                await self._bulk_insert_to_db(list_of_tuples)
                # Successful insert, clean up temp key
                await redis.delete(temp_key)
            except Exception as db_err:
                logger.error(f"Bulk insert failed for {buffer_key}: {db_err}. Restoring buffered items.")
                # Attempt to restore elements to the main buffer to prevent data loss
                try:
                    while await redis.llen(temp_key) > 0:
                        val = await redis.rpop(temp_key)
                        if val:
                            await redis.lpush(buffer_key, val)
                except Exception as restore_err:
                    logger.critical(f"Failed to restore temp buffer after DB failure: {restore_err}")
                raise db_err

        # Update last flush time
        current_time = time.time()
        parts = buffer_key.split(":")
        if len(parts) >= 5:
            t = parts[2]
            f = parts[3]
            last_flush_key = f"state:floor:{t}:{f}:last_flush_time"
            await redis.set(last_flush_key, str(current_time))

        # Clean up active buffers set if queue is empty
        active_len = await redis.llen(buffer_key)
        if active_len == 0:
            await redis.srem("state:active_telemetry_buffers", buffer_key)

    async def _bulk_insert_to_db(self, list_of_tuples):
        if not db_manager.pool:
            raise RuntimeError("Database pool not initialized")

        query = """
        INSERT INTO washroom_telemetry (
            time, device_id, terminal, washroom_id, avg_nh3_ppm, peak_nh3_ppm,
            avg_temperature_c, avg_humidity_percent, throughput, occupancy_inside,
            abandon_rate_percent, raw_whi
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        """
        async with db_manager.pool.acquire() as conn:
            await conn.executemany(query, list_of_tuples)

    async def start_monitor(self):
        if self._monitor_task is not None:
            return
        self._monitor_task = asyncio.create_task(self.monitor_and_flush())

    async def stop_monitor(self):
        if self._monitor_task is None:
            return
        self._monitor_task.cancel()
        try:
            await self._monitor_task
        except asyncio.CancelledError:
            pass
        self._monitor_task = None

    async def monitor_and_flush(self):
        logger.info("Telemetry batcher monitor started")
        redis = await get_redis()
        while True:
            try:
                active_buffers = await redis.smembers("state:active_telemetry_buffers")
                current_time = time.time()

                for buffer_key in active_buffers:
                    length = await redis.llen(buffer_key)
                    if length == 0:
                        await redis.srem("state:active_telemetry_buffers", buffer_key)
                        continue

                    # Check flush trigger conditions
                    parts = buffer_key.split(":")
                    if len(parts) >= 5:
                        t = parts[2]
                        f = parts[3]
                        last_flush_key = f"state:floor:{t}:{f}:last_flush_time"
                        last_flush_time_str = await redis.get(last_flush_key)

                        should_flush = False
                        if length >= 100:
                            should_flush = True
                        elif last_flush_time_str is None:
                            should_flush = True
                        else:
                            time_since_last = current_time - float(last_flush_time_str)
                            if time_since_last >= 5.0:
                                should_flush = True

                        if should_flush:
                            await self.flush_buffer(buffer_key, redis)

            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"Error in telemetry batcher monitor: {e}")

            await asyncio.sleep(0.5)

telemetry_batcher = TelemetryBatcher()
