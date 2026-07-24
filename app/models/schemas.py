from pydantic import BaseModel, Field
from datetime import datetime

class TelemetryPayload(BaseModel):
    device_id: str = Field(..., min_length=1)
    timestamp: datetime
    avg_nh3_ppm: float = Field(..., ge=0, le=100)
    peak_nh3_ppm: float = Field(..., ge=0, le=100)
    avg_temperature_c: float = Field(..., ge=-10, le=80)
    avg_humidity_percent: float = Field(..., ge=0, le=100)
    throughput: int = Field(..., ge=0)
    occupancy_inside: int = Field(..., ge=0)
    abandon_rate_percent: float = Field(..., ge=0, le=100)
    raw_whi: float = Field(..., ge=0, le=100)
    
    # Inferred from MQTT topic (washroom/{terminal}/{washroom_id}/{msg_type})
    terminal: str | None = None
    washroom_id: str | None = None
    msg_type: str | None = None
