import asyncio
from app.services.queue import queue_router
from app.services.incident import get_incident_engine
from app.services.batcher import telemetry_batcher
from app.db.redis import get_redis
from app.core.logger import logger

async def normal_worker():
    logger.info("Starting normal queue worker")
    redis = await get_redis()
    incident_engine = get_incident_engine(redis)
    
    while True:
        try:
            payload = await queue_router.normal_queue.get()
            # Process state machine for incident debouncing
            await incident_engine.process_reading(payload)
            
            # Push payload to Redis floor buffer for batched DB writes
            await telemetry_batcher.push_payload(payload.terminal, payload.washroom_id, payload, redis)
            
            queue_router.normal_queue.task_done()
        except asyncio.CancelledError:
            break
        except Exception as e:
            logger.error(f"Error in normal worker: {e}")
