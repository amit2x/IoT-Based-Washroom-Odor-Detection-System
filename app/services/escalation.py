from redis.asyncio import Redis
from app.models.domain import IncidentState, FloorState
from app.core.logger import logger
from app.db.redis import get_redis

class EscalationEngine:
    async def evaluate_floor_state(self, terminal: str, washroom_id: str, new_state: str):
        # For simplicity, we assume floor can be derived from washroom_id
        # e.g., washroom_id = "L2_M01" -> floor = "L2"
        floor = washroom_id.split("_")[0] if "_" in washroom_id else "unknown_floor"
        
        redis = await get_redis()
        floor_state_key = f"state:floor:{terminal}:{floor}:incidents"
        
        if new_state == IncidentState.ACTIVE_INCIDENT.value:
            await redis.sadd(floor_state_key, washroom_id)
        else:
            await redis.srem(floor_state_key, washroom_id)
            
        active_count = await redis.scard(floor_state_key)
        
        floor_status_key = f"state:floor:{terminal}:{floor}:status"
        current_floor_status = await redis.get(floor_status_key)
        
        if active_count >= 2 and current_floor_status != FloorState.FLOOR_CRITICAL.value:
            await redis.set(floor_status_key, FloorState.FLOOR_CRITICAL.value)
            logger.critical(f"Floor Escalation! {terminal} Floor {floor} is now FLOOR_CRITICAL")
            
        elif active_count < 2 and current_floor_status == FloorState.FLOOR_CRITICAL.value:
            await redis.set(floor_status_key, FloorState.NORMAL.value)
            logger.info(f"Floor Recovery. {terminal} Floor {floor} is back to NORMAL")

escalation_engine = EscalationEngine()
