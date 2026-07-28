import asyncio
from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.redis import redis_manager
from app.db.postgres import db_manager
from app.services.mqtt import mqtt_subscriber
from app.workers.priority import priority_worker
from app.workers.normal import normal_worker
from app.services.batcher import telemetry_batcher
from app.services.audit import audit_batcher
from app.core.logger import logger

bg_tasks = []

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up FastAPI components...")
    
    # 1. Initialize Databases
    await db_manager.connect()
    # Redis is implicitly initialized via pool but we can ping it here if needed
    
    # 2. Start telemetry batcher monitor
    await telemetry_batcher.start_monitor()
    await audit_batcher.start_monitor()
    
    # 3. Start workers
    bg_tasks.append(asyncio.create_task(priority_worker()))
    for _ in range(3):
        bg_tasks.append(asyncio.create_task(normal_worker()))
        
    # 4. Start MQTT Subscriber last so it starts pushing to queues only when workers are ready
    bg_tasks.append(asyncio.create_task(mqtt_subscriber.start()))
    
    yield
    
    logger.info("Shutting down FastAPI components...")
    
    # Graceful shutdown
    for task in bg_tasks:
        task.cancel()
        
    await asyncio.gather(*bg_tasks, return_exceptions=True)
    await telemetry_batcher.stop_monitor()
    await audit_batcher.stop_monitor()

    await db_manager.disconnect()
    await redis_manager.close()

app = FastAPI(
    title="AAI Intelligent Washroom Monitoring Pipeline",
    lifespan=lifespan
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":

    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)