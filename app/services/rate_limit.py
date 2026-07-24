import time
from redis.asyncio import Redis
from app.core.config import settings
from app.core.logger import logger

class RateLimiter:
    def __init__(self, redis: Redis):
        self.redis = redis
        self.limit = settings.RATE_LIMIT_MESSAGES
        self.window = settings.RATE_LIMIT_WINDOW_SECONDS

    async def is_allowed(self, device_id: str) -> bool:
        key = f"rate_limit:{device_id}"
        current_time = int(time.time())
        
        # We can use a simpler approach with Lua script or just simple pipelining
        # Let's use simple logic since this is a demonstration of token bucket
        try:
            data = await self.redis.hgetall(key)
            if not data:
                # First request
                await self.redis.hset(key, mapping={"tokens": self.limit - 1, "last_refill": current_time})
                await self.redis.expire(key, self.window * 2)
                return True
            
            tokens = int(data.get("tokens", self.limit))
            last_refill = int(data.get("last_refill", current_time))
            
            # Refill tokens
            if current_time - last_refill >= self.window:
                tokens = self.limit
                last_refill = current_time
            
            if tokens > 0:
                await self.redis.hset(key, mapping={"tokens": tokens - 1, "last_refill": last_refill})
                await self.redis.expire(key, self.window * 2)
                return True
            else:
                logger.warning(f"Device {device_id} exceeded rate limit")
                return False
        except Exception as e:
            logger.error(f"Rate limiting failed for {device_id}: {e}")
            # Fail closed or open? Fail closed for safety
            return False
