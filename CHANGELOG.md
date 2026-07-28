# Changelog

All notable changes to the **Intelligent Washroom Monitoring & Automated Incident Management System** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2026-07-28 (Mark 3)

### Added
- **Ingestion Auditing Pipeline**: Added real-time auditing of raw telemetry payloads before parsing or schema validation. Pushes raw messages into a Redis queue (`state:audit_buffer`) and performs transaction-safe bulk insert into PostgreSQL/TimescaleDB (`raw_telemetry_audit` table).
- **MQTT Broker Clustering**: Deployed a three-node clustered EMQX setup (`emqx1`, `emqx2`, `emqx3`) using static node discovery to handle high MQTT subscription loads.
- **Active-Passive Load Balancing & High Availability (HA)**: Configured dual HAProxy instances (`haproxy1`, `haproxy2`) distributing MQTT TCP (1883), MQTT WebSockets (8083), and EMQX Dashboard (18083) traffic in round-robin fashion.
- **VRRP Virtual IP Failover**: Configured Keepalived containers managing a shared Virtual IP (`172.20.0.10`) for load-balancer failover, insulating the FastAPI subscriber from backend broker failures.
- **Lua-Based Distributed Rate Limiting**: Implemented atomic check-and-consume token-bucket rate limiting via compiled Redis Lua scripts (`LUA_RATE_LIMITER` in `app/services/rate_limit.py`) for multi-instance scalability.
- **Data Retention Policy**: Enforced automated 14-day data retention on the `raw_telemetry_audit` TimescaleDB hypertable to optimize storage footprints.
- **Comprehensive Benchmarking & Tests**:
  - `tests/test_audit.py`: Unit tests verifying Redis buffer actions, size-based flushes, timeout flushes, and database failure recovery.
  - `tests/benchmark_latency.py`: Latency benchmark measures pushing 10,000 raw payloads to estimate average, P95, P99, and maximum Redis insertion latencies.
  - `tests/benchmark_process_message.py`: Latency comparison tests measuring processing overhead introduced by the new raw auditing tap.

### Changed
- **Consolidated Worker Architecture**: Streamlined the worker runtime by extracting shared processing logic from `normal_worker` and `priority_worker` into a unified `run_worker` helper inside `app/workers/common.py`.
- **Concurrent Queue Routing**: Re-engineered item retrieval using a clean `_get_next_payload` routine that monitors both priority and normal queues concurrently via `asyncio.wait`, ensuring strict prioritization.
- **Explicit Schema Verification**: Configured `PostgresManager` to perform strict schema verification on connection, raising a loud `RuntimeError` at startup if any core hypertables or extensions are missing.
- **DSN Connection Parsing**: Sanitized PostgreSQL URL parsing to automatically strip Python-specific prefixes (e.g. `postgresql+asyncpg://`) for direct compatibility with native `asyncpg`.
- **Atomic Telemetry Batcher Cleanup**: Optimized telemetry buffer cleaning using a Lua script (`_CHECK_AND_REMOVE_EMPTY_LUA`) to query length and remove keys from the active buffers list atomically.

### Fixed
- **Debounce State Safety**: Configured a 1-hour Redis TTL on warning debounce keys (`debounce:{washroom_id}`) to avoid memory leaks.
- **Cleaner Debounce Reset**: Replaced legacy `set(..., 0)` debounce resets with clean Redis `delete(debounce_key)` operations.
- **Audit Tap Exception Isolation**: Isolated raw audit pipeline failures from main message routing, logging warning events without stopping telemetry ingestion.

---

## [2.0.0] - 2026-07-15 (Mark 2)

### Added
- **Floor Telemetry Batching Engine**: Introduced a dedicated batching engine (`app/services/batcher.py`) that groups incoming telemetry by floor, reducing duplicate writes and lowering processing overhead.
- **Persistent Incident Event Logging**: Configured permanent transition logging (`NORMAL` ➔ `PENDING_ALERT` ➔ `ACTIVE_INCIDENT` ➔ `RESOLVED`) to PostgreSQL/TimescaleDB (`incident_events` table) for historical auditing.
- **Database-Backed Incident Timeline**: Enabled automatic timeline insertions during state machine state changes, building a historical audit trail.
- **Background Batching Monitor**: Configured startup orchestration launching the database, batchers, and worker threads prior to starting the MQTT listener.
- **Graceful Shutdown Lifecycles**: Enhanced shutdown routines to stop the batching monitor cleanly before database disconnection, avoiding unfinished batching jobs.
- **Dedicated Regression Testing Suite**: Added tests including dummy MQTT publishers, escalation simulators, floor batch tests, and escalation tests.

### Changed
- **Separation of Responsibilities**: Isolated telemetry batching logic into a specialized `Batcher Service`, decoupling it from the main state/incident processing engine.

---

## [1.0.0] - 2026-06-01 (Mark 1)

### Added
- **Core Ingestion Pipeline**: Initial MQTT subscriber loop connecting washroom sensors to the FastAPI backend.
- **In-Memory Rate Limiting**: Basic local rate-limiting functionality to guard downstream services.
- **Redis State Management**: Built initial state machine and queues stored entirely in-memory within Redis (without historical database persistence).
- **Incident Engine**: Basic threshold evaluations for washroom status.
