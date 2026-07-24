from redis.asyncio import Redis
from app.models.schemas import TelemetryPayload
from app.models.domain import IncidentState
from app.core.config import settings
from app.core.logger import logger
from app.services.escalation import escalation_engine

class IncidentEngine:
    def __init__(self, redis: Redis):
        self.redis = redis

    async def process_reading(self, payload: TelemetryPayload):
        if not payload.washroom_id or not payload.terminal:
            return

        whi = payload.raw_whi
        washroom_id = payload.washroom_id
        
        debounce_key = f"debounce:{washroom_id}"
        state_key = f"state:washroom:{washroom_id}"

        current_state = await self.redis.get(state_key) or IncidentState.NORMAL.value
        
        if whi >= settings.WHI_WARNING_THRESHOLD:
            # Recovering or Normal
            await self._set_state(washroom_id, payload.terminal, IncidentState.NORMAL.value)
            await self.redis.set(debounce_key, 0)
            
        elif whi >= settings.WHI_CRITICAL_THRESHOLD and whi < settings.WHI_WARNING_THRESHOLD:
            # Warning state
            await self._set_state(washroom_id, payload.terminal, IncidentState.PENDING_ALERT.value)
            await self.redis.set(debounce_key, 0)
            
        else:
            # Critical reading (WHI < 30)
            if current_state != IncidentState.ACTIVE_INCIDENT.value:
                debounce_count = await self.redis.incr(debounce_key)
                if debounce_count >= settings.DEBOUNCE_THRESHOLD:
                    await self._set_state(washroom_id, payload.terminal, IncidentState.ACTIVE_INCIDENT.value)
                    logger.info(f"Washroom {washroom_id} entered ACTIVE_INCIDENT state")

    async def _set_state(self, washroom_id: str, terminal: str, new_state: str):
        state_key = f"state:washroom:{washroom_id}"
        old_state = await self.redis.get(state_key)
        
        if old_state != new_state:
            await self.redis.set(state_key, new_state)
            # Notify escalation engine
            await escalation_engine.evaluate_floor_state(
                terminal=terminal,
                washroom_id=washroom_id,
                new_state=new_state
            )

def get_incident_engine(redis: Redis) -> IncidentEngine:
    return IncidentEngine(redis)
