from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AAI Intelligent Washroom Monitoring"
    MQTT_HOST: str = "localhost"
    MQTT_PORT: int = 1883
    MQTT_USER: str | None = None
    MQTT_PASSWORD: str | None = None
    
    REDIS_URL: str = "redis://127.0.0.1:6379/0"
    POSTGRES_URL: str = "postgresql+asyncpg://postgres:postgres@127.0.0.1:5433/washroom_db"
    
    RATE_LIMIT_MESSAGES: int = 2
    RATE_LIMIT_WINDOW_SECONDS: int = 60
    
    DEBOUNCE_THRESHOLD: int = 3
    WHI_CRITICAL_THRESHOLD: float = 30.0
    WHI_WARNING_THRESHOLD: float = 50.0
    
    class Config:
        env_file = ".env"

settings = Settings()
