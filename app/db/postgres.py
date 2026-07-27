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
            await self.initialize_schema()
        except Exception as e:
            logger.error(f"Failed to connect to PostgreSQL: {e}")
            raise

    async def initialize_schema(self):
        if not self.pool:
            return
        try:
            async with self.pool.acquire() as conn:
                # Create incident_events table
                await conn.execute("""
                CREATE TABLE IF NOT EXISTS incident_events (
                    time TIMESTAMPTZ NOT NULL,
                    washroom_id TEXT NOT NULL,
                    terminal TEXT NOT NULL,
                    old_state TEXT NOT NULL,
                    new_state TEXT NOT NULL,
                    whi DOUBLE PRECISION
                );
                """)
                try:
                    await conn.execute("SELECT create_hypertable('incident_events', 'time', if_not_exists => TRUE);")
                except Exception as ex:
                    logger.warning(f"Could not convert incident_events to hypertable: {ex}")
                
                await conn.execute("CREATE INDEX IF NOT EXISTS ix_incident_events_washroom_time ON incident_events (washroom_id, time DESC);")

                # Create floor_escalation_events table
                await conn.execute("""
                CREATE TABLE IF NOT EXISTS floor_escalation_events (
                    time TIMESTAMPTZ NOT NULL,
                    floor TEXT NOT NULL,
                    terminal TEXT NOT NULL,
                    old_status TEXT NOT NULL,
                    new_status TEXT NOT NULL,
                    active_incident_count INTEGER NOT NULL
                );
                """)
                try:
                    await conn.execute("SELECT create_hypertable('floor_escalation_events', 'time', if_not_exists => TRUE);")
                except Exception as ex:
                    logger.warning(f"Could not convert floor_escalation_events to hypertable: {ex}")

                await conn.execute("CREATE INDEX IF NOT EXISTS ix_floor_escalation_events_floor_time ON floor_escalation_events (floor, time DESC);")
                logger.info("Database schema initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize database schema: {e}")

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
