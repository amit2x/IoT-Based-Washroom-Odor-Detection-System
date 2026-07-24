

### 🚀 Features

- **Add FastAPI backend for washroom monitoring system (Backend Mark1)**:
  - **Asynchronous Lifespan Management**: Gracefully orchestrates startup/shutdown of PostgreSQL, Redis connections, and background task workers.
  - **TimescaleDB Telemetry Storage**: Configured `washroom_telemetry` table converted to a TimescaleDB hypertable for optimized time-series querying, indexed by device and location.
  - **Real-time MQTT Subscription Pipeline**: Built-in MQTT subscriber utilizing `aiomqtt` to ingest raw sensor data streams.
  - **Redis Queue & Workers**: Asynchronous processing pipeline utilizing Redis for task queuing, featuring a dedicated `priority_worker` and multiple parallel `normal_worker` instances.
  - **Incident & Escalation Services**: Business logic for anomaly detection, incident creation, rate-limiting, and alert escalation.
  - **Docker Compose Setup**: Bundled configurations for TimescaleDB and Redis to enable easy containerized deployment.
## [1.1.0] - 2026-07-24


### ⚙️ Taks to be done 

- *(release)* 0.1.0
- *(release)* 0.1.1
- *(release)* 1.1.0
## [1.0.1] - 2026-07-24

### ⚙️ Takes to be done 

- Import local changes
- *(release)* 1.0.1
