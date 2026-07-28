# Intelligent Washroom Monitoring & Automated Incident Management System Changelog

---

## [M3] Mark 3 (M3) Changelog - Latest Update

### Overview
Mark 3 focuses on production readiness, high availability (HA), raw telemetry data auditing, distributed rate-limiting, and worker consolidation. It upgrades the system architecture to a multi-instance, fault-tolerant cluster deployment backed by active-passive load balancing and comprehensive performance benchmarking.

---

### New Features & Enhancements

#### 1. Ingestion Auditing Pipeline (Audit Service & Raw Telemetry Audit) (NEW)
* **Real-time Ingestion Auditing**: Captures every incoming raw MQTT telemetry payload and topic *before* parsing, schema validation, or rate limiting occurs, guaranteeing a complete raw data audit trail.
* **Fast Write Buffering**: Raw payloads are buffered into a Redis-backed queue (`state:audit_buffer`) using optimized `rpush` operations to isolate the MQTT subscriber loop from database write latency.
* **Dual Flushing Conditions**: Automatically triggers a batch flush of telemetry audit records when the buffer reaches 100 messages or after a 5-second interval has elapsed.
* **Atomic Buffer Renaming**: Employs Redis `rename` to atomically swap the active write buffer to a temporary key (`state:audit_buffer:temp`) prior to database writes, preventing race conditions with concurrent incoming MQTT writes.
* **Transaction-safe Bulk Insertion**: Executes multi-row writes to PostgreSQL/TimescaleDB (`raw_telemetry_audit` table) within a transaction using the new `executemany` database manager API.
* **Telemetry Recovery & Fault Tolerance**: If database writes fail, a recovery routine pops data from the temp key back to the main Redis buffer, ensuring zero telemetry audit data loss.
* **Automated Data Retention**: Configures a TimescaleDB data retention policy of 14 days on the `raw_telemetry_audit` hypertable to automatically clean up raw historical messages and optimize disk usage.

#### 2. High Availability MQTT & Load Balancing Architecture (NEW)
* **EMQX Clustered Broker**: Deploys a three-node clustered EMQX setup (`emqx1`, `emqx2`, `emqx3`) for distributed, fault-tolerant MQTT message ingestion.
* **Active-Passive Load Balancers (HAProxy)**: Deploys dual HAProxy load balancer nodes (`haproxy1` and `haproxy2`) load balancing MQTT TCP (1883), MQTT WebSockets (8083), and EMQX Dashboard (18083) across all three EMQX nodes.
* **Seamless Virtual IP Failover (Keepalived VRRP)**: Integrates Keepalived containers configured via Virtual Router Redundancy Protocol (VRRP) to manage a single shared virtual IP (`172.20.0.10`). If the primary load balancer goes down, the VIP seamlessly transitions to the backup load balancer.
* **Backend Insulation**: The FastAPI subscriber binds directly to the Keepalived VIP, making the ingestion pipeline resilient to individual broker or load balancer node failures.

#### 3. Distributed Lua-Based Rate Limiting (NEW)
* **Atomic Redis Execution**: Replaces local/in-memory rate limiting with a compiled Lua script (`LUA_RATE_LIMITER`) running atomically on the Redis database server.
* **Distributed Scalability**: Eliminates check-then-set race windows across multiple FastAPI ingestion worker instances in clustered environments.
* **Automatic Resource Cleanup**: Configures an automatic TTL (twice the rate limit window) on rate-limiting hashes using Redis `EXPIRE` to clean up inactive device states and prevent memory leaks.
* **Fail-Closed Resilience**: If Redis connectivity drops or script execution fails, the rate limiter fails closed (`return False`), protecting downstream queues and workers from payload floods.

#### 4. Unified Worker & Queue Routing Architecture
* **Consolidated Workers**: Streamlines the worker runtime by extracting common processing logic from `normal_worker` and `priority_worker` into a shared, robust worker module (`app/workers/common.py`).
* **Non-blocking Prioritization**: Implements a clean `_get_next_payload` routine that monitors both priority and normal queues concurrently via `asyncio.wait`, ensuring strict prioritization and safe task cancellation.

#### 5. Reliability, Database & Resource Safety Improvements
* **Loud Schema Verification**: Updates `PostgresManager` to perform schema validation on connection. It checks for the existence of all four core hypertables (`washroom_telemetry`, `incident_events`, `floor_escalation_events`, `raw_telemetry_audit`) and throws a loud `RuntimeError` on startup if tables are missing, avoiding silent schema degradation.
* **DSN Parsing**: Strips Python-specific prefixes (e.g., `postgresql+asyncpg://`) from connection URLs to ensure native `asyncpg` DSN driver compatibility.
* **Atomic Telemetry Batcher Cleanup**: Introduces a Lua-based check-and-remove script (`_CHECK_AND_REMOVE_EMPTY_LUA`) to query length and remove keys from the `state:active_telemetry_buffers` Redis set atomically, resolving flush concurrency issues.
* **State & Debounce Safety**: Adds a 1-hour TTL safety net to active debounce keys (`debounce:{washroom_id}`) to clear inactive warning states from Redis. Debounce counters are reset via Redis `delete` instead of `set(..., 0)` for cleaner state tracking.

#### 6. Automated Testing & Performance Benchmarks (NEW)
* **Audit Service Unit Tests**: Adds `tests/test_audit.py` with comprehensive unit tests simulating Redis/PostgreSQL interfaces to verify buffering, size limits, timeouts, and DB failover recovery.
* **Throughput & Latency Benchmarks**: Adds `tests/benchmark_latency.py` to evaluate pushing 10,000 raw messages to the Redis audit buffer, measuring average, P95, P99, and maximum latencies.
* **Ingestion Tap Overhead Benchmarks**: Adds `tests/benchmark_process_message.py` to compare message processing latencies with and without the audit tap enabled, calculating average overhead and percentage latency difference.

---

## [M2] Mark 2 (M2) Changelog

### Overview
Mark 2 focuses on scalability, data persistence, analytics, and operational reliability. While Mark 1 successfully implemented the complete incident detection pipeline, Mark 2 expands the architecture into a system capable of supporting enterprise-grade monitoring and long-term operational analysis.

---

### New Features

#### 1. Floor Telemetry Batching Engine (NEW)

**Mark 1**
* Processed every telemetry packet independently.
* No floor-level aggregation.

**Mark 2**
* Introduced a dedicated Telemetry Batching Engine.
* Groups incoming telemetry by floor.
* Continuously monitors floor health.
* Reduces duplicate processing.
* Forms the foundation for floor-wide analytics and reporting.

**Benefit**
* Lower processing overhead.
* Better scalability.
* Enables floor intelligence instead of isolated node intelligence.

---

#### 2. Persistent Incident Event Logging (NEW)

**Mark 1**
* Incident state changes only existed inside Redis.
* If Redis was cleared, incident history disappeared and no historical audit trail remained.

**Mark 2**
* Every incident transition is now permanently stored in PostgreSQL.
* Transition pipeline: `NORMAL` ➔ `PENDING_ALERT` ➔ `ACTIVE_INCIDENT` ➔ `RESOLVED`.
* Each transition records: Timestamp, Washroom ID, Terminal, Previous State, New State, and WHI.

**Benefit**
* Complete audit history.
* Historical investigations.
* Analytics, reporting, and future ML datasets.

---

#### 3. Database-backed Incident Timeline
* Incident events are now automatically inserted into the database whenever the state machine changes state.
* This creates a permanent operational history rather than relying solely on Redis.

---

#### 4. Background Batching Monitor
* A dedicated batching monitor now starts during FastAPI startup.
* Startup sequence:
  `Database` ➔ `Telemetry Batcher` ➔ `Priority Workers` ➔ `Normal Workers` ➔ `MQTT Subscriber`
* This guarantees the batching engine is ready before telemetry begins arriving.

---

#### 5. Graceful Shutdown Improvements
* Shutdown now also stops the batching monitor cleanly before disconnecting from PostgreSQL.
* **Benefits**: No unfinished batching jobs, cleaner shutdown, and better resource management.

---

### Data Architecture Improvements

**Mark 1**
```
Sensors ➔ MQTT ➔ Redis ➔ State Machine ➔ Alerts
```
* Mostly real-time.
* Little historical intelligence.

**Mark 2**
```
Sensors ➔ MQTT ➔ Dual Queue ➔ Floor Batching Engine ➔ State Machine ➔ Redis ➔ PostgreSQL Persistence ➔ Historical Analytics
```
* The backend now supports both real-time decision making and long-term data analysis.

---

### Reliability Improvements

**State Change Persistence**
* **Previously**: Redis ➔ Lost after failure.
* **Now**: Redis + PostgreSQL ➔ Fast access + permanent storage.

---

### Testing Improvements
Mark 2 introduces a dedicated testing suite:
* Dummy MQTT Publisher
* Escalation Simulator
* Floor Batch Tests
* Escalation Tests

This makes regression testing significantly easier.

---

### Better Separation of Responsibilities
* **Mark 1**: Services primarily handled MQTT, Incident Engine, Rate Limiting, and Queue.
* **Mark 2**: Introduces an additional specialized **Batcher Service** to keep batching logic independent from the incident engine and improve maintainability.

---

### Operational Benefits
Compared to Mark 1, Mark 2 provides:
* Floor-level telemetry aggregation.
* Permanent incident history.
* Database-backed audit logging.
* Better startup orchestration.
* Cleaner shutdown handling.
* Improved modular architecture.
* Automated regression testing.
* Stronger foundation for future analytics and dashboards.
