# AAI Intelligent Washroom Monitoring Pipeline

An advanced, real-time IoT telemetry ingestion and incident monitoring pipeline. It processes sensor telemetry/alerts, manages state-machine escalations, rate-limits devices via distributed Redis Lua tokens, and batches time-series data to TimescaleDB.

---

## 🏗️ Architecture & Stack
* **MQTT Cluster**: Clustered EMQX nodes (`emqx1`, `emqx2`, `emqx3`) for ingestion.
* **Load Balancer**: Clustered HAProxy with Keepalived Virtual IP (`172.20.0.10`) failover.
* **FastAPI Pipeline**: Asynchronously routes messages using a Dual-Queue (Priority & Normal) setup.
* **State Machine & Escalation Engine**: Manages washroom status states (`NORMAL`, `PENDING_ALERT`, `ACTIVE_INCIDENT`, `RESOLVED`) and floor escalation status (`FLOOR_CRITICAL`).
* **Databases**: Redis for rate limiting, cache, state management, and write buffering; TimescaleDB for time-series telemetry analysis.

---

## 📂 Directory Layout
* `app/` - Core FastAPI implementation (MQTT listener, workers, database connections, and business logic engines).
* `db_init/` - SQL schemas to initialize TimescaleDB tables and hypertables.
* `haproxy/` - TCP & HTTP routing configs for the EMQX cluster backend.
* `tests/` - Unit tests, simulated scale runners, and performance benchmarks.

---

## 🚀 Getting Started

### 1. Run the Entire Stack (Docker)
1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
2. Start all services in the background:
   ```bash
   docker-compose up -d --build
   ```

### 2. Local App Development (Hybrid Mode)
To run databases/brokers in Docker and the FastAPI application locally:
1. Setup a virtual environment & install dependencies:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```
2. Launch database/broker containers:
   ```bash
   docker-compose up -d emqx1 emqx2 emqx3 haproxy1 haproxy2 keepalived1 keepalived2 redis timescaledb
   ```
3. Run the FastAPI application:
   ```bash
   python -m app.main
   ```

---

## 🧪 Testing & Verification

* **Run All Unit Tests**:
  ```bash
  python -m unittest discover -s tests
  ```
* **Simulate Telemetry Load**:
  ```bash
  python tests/publish_dummy_mqtt.py
  ```
* **Simulate State Machine/Escalations**:
  ```bash
  python tests/simulate_escalation.py
  ```
* **Run Latency & Performance Benchmarks**:
  ```bash
  python tests/benchmark_latency.py
  python tests/benchmark_process_message.py
  ```
