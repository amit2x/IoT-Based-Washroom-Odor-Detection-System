from redis.asyncio import Redis, ConnectionPool
from app.core.config import settings
from app.core.logger import logger

class RedisClient:
    def __init__(self):
        self.pool = ConnectionPool.from_url(settings.REDIS_URL, decode_responses=True)
        self.client = Redis(connection_pool=self.pool)

    async def get_client(self) -> Redis:
        return self.client

    async def close(self):
        await self.client.aclose()
        logger.info("Redis connection closed")

redis_manager = RedisClient()

async def get_redis():
    return await redis_manager.get_client()
