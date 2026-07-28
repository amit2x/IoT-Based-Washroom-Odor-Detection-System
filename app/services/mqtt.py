import asyncio
import json
import aiomqtt
from app.core.config import settings
from app.core.logger import logger
from app.models.schemas import TelemetryPayload
from pydantic import ValidationError
from app.services.rate_limit import RateLimiter
from app.services.queue import queue_router
from app.db.redis import get_redis
from app.services.audit import audit_batcher

class MQTTSubscriber:
    def __init__(self):
        self.client_args = {
            "hostname": settings.MQTT_HOST,
            "port": settings.MQTT_PORT,
            "username": settings.MQTT_USER,
            "password": settings.MQTT_PASSWORD,
        }
        self.reconnect_interval = 3

    async def start(self):
        logger.info("Starting MQTT Subscriber...")
        redis = await get_redis()
        rate_limiter = RateLimiter(redis)
        
        while True:
            try:
                async with aiomqtt.Client(**self.client_args) as client:
                    await client.subscribe("washroom/+/+/telemetry")
                    await client.subscribe("washroom/+/+/alerts")
                    logger.info("Successfully subscribed to MQTT topics")
                    
                    async for message in client.messages:
                        await self.process_message(message, rate_limiter)
            except aiomqtt.MqttError as error:
                logger.error(f"MQTT connection error: {error}. Reconnecting in {self.reconnect_interval}s...")
                await asyncio.sleep(self.reconnect_interval)
            except asyncio.CancelledError:
                logger.info("MQTT Subscriber stopped")
                break
            except Exception as e:
                logger.error(f"Unexpected MQTT error: {e}")
                await asyncio.sleep(self.reconnect_interval)

    async def process_message(self, message, rate_limiter: RateLimiter):
        topic = str(message.topic)
        payload_bytes = message.payload

        # Audit tap - capture raw message before parsing
        try:
            await audit_batcher.push_raw(topic, payload_bytes)
        except Exception as e:
            logger.warning(f"Failed to push message to raw audit log (topic={topic}): {e}")

        
        # 1. Parse JSON
        try:
            payload_dict = json.loads(payload_bytes.decode())
        except Exception as e:
            logger.warning(f"Rejected malformed JSON from {topic}: {e}")
            return
            
        # 2. Extract context from topic
        parts = topic.split('/')
        if len(parts) >= 4:
            payload_dict['terminal'] = parts[1]
            payload_dict['washroom_id'] = parts[2]
            payload_dict['msg_type'] = parts[3]
            
        # 3. Pydantic Validation
        try:
            payload = TelemetryPayload(**payload_dict)
        except ValidationError as e:
            logger.warning(f"Rejected invalid schema from {topic}: {e.errors()}")
            return
            
        # 4. Rate Limiting
        if not await rate_limiter.is_allowed(payload.device_id):
            return
            
        # 5. Route to Queue
        await queue_router.route_message(payload)

mqtt_subscriber = MQTTSubscriber()
