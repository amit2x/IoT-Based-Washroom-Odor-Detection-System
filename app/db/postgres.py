import asyncpg
from app.core.config import settings
from app.core.logger import logger

class PostgresManager:
    def __init__(self):
        self.pool: asyncpg.Pool | None = None

    async def connect(self):
        try:
            # Note: The asyncpg DSN doesn't usually use the +asyncpg scheme 
            # like SQLAlchemy does, so we replace it if needed.
            dsn = settings.POSTGRES_URL.replace("postgresql+asyncpg://", "postgresql://")
            self.pool = await asyncpg.create_pool(dsn=dsn)
            logger.info("PostgreSQL connected successfully")
        except Exception as e:
            logger.error(f"Failed to connect to PostgreSQL: {e}")
            raise

    async def disconnect(self):
        if self.pool:
            await self.pool.close()
            logger.info("PostgreSQL disconnected")

    async def execute(self, query: str, *args):
        if not self.pool:
            raise RuntimeError("Database pool not initialized")
        async with self.pool.acquire() as conn:
            return await conn.execute(query, *args)

db_manager = PostgresManager()
