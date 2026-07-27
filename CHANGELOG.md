Based on both codebases and the architectural evolution we’ve discussed, Mark 2 (M2) is much more than a bug-fix release—it represents a transition from a functional prototype into a production-oriented backend. Below is a structured changelog that you can include in your project diary or documentation.

⸻

Intelligent Washroom Monitoring & Automated Incident Management System

Mark 2 (M2) Changelog

Overview

Mark 2 focuses on scalability, data persistence, analytics, and operational reliability. While Mark 1 successfully implemented the complete incident detection pipeline, Mark 2 expands the architecture into a system capable of supporting enterprise-grade monitoring and long-term operational analysis.

⸻

New Features

1. Floor Telemetry Batching Engine (NEW)

Mark 1

* Processed every telemetry packet independently.
* No floor-level aggregation.

Mark 2

* Introduced a dedicated Telemetry Batching Engine.
* Groups incoming telemetry by floor.
* Continuously monitors floor health.
* Reduces duplicate processing.
* Forms the foundation for floor-wide analytics and reporting.

Benefit

* Lower processing overhead
* Better scalability
* Enables floor intelligence instead of isolated node intelligence

⸻

2. Persistent Incident Event Logging (NEW)

Mark 1

Incident state changes only existed inside Redis.

If Redis was cleared:

* Incident history disappeared.
* No historical audit trail.

Mark 2

Every incident transition is now permanently stored in PostgreSQL.

Examples include:

NORMAL
↓
PENDING_ALERT
↓
ACTIVE_INCIDENT
↓
RESOLVED

Each transition records:

* Timestamp
* Washroom ID
* Terminal
* Previous State
* New State
* WHI

Benefit

* Complete audit history
* Historical investigations
* Analytics
* Reporting
* Future ML datasets

⸻

3. Database-backed Incident Timeline

Incident events are now automatically inserted into the database whenever the state machine changes state.

This creates a permanent operational history rather than relying solely on Redis.

⸻

4. Background Batching Monitor

A dedicated batching monitor now starts during FastAPI startup.

Startup sequence became:

Database
↓
Telemetry Batcher
↓
Priority Workers
↓
Normal Workers
↓
MQTT Subscriber

This guarantees the batching engine is ready before telemetry begins arriving.

⸻

5. Graceful Shutdown Improvements

Shutdown now also stops the batching monitor cleanly before disconnecting from PostgreSQL.

Benefits:

* No unfinished batching jobs
* Cleaner shutdown
* Better resource management

⸻

Data Architecture Improvements

Mark 1

Sensors
↓
MQTT
↓
Redis
↓
State Machine
↓
Alerts

Mostly real-time.

Little historical intelligence.

⸻

Mark 2

Sensors
↓
MQTT
↓
Dual Queue
↓
Floor Batching Engine
↓
State Machine
↓
Redis
↓
PostgreSQL Persistence
↓
Historical Analytics

The backend now supports both:

* Real-time decision making
* Long-term data analysis

⸻

Reliability Improvements

State Change Persistence

Previously:

Redis
↓
Lost after failure

Now:

Redis
+
PostgreSQL

Meaning:

* Fast access
* Permanent storage

⸻

Testing Improvements

Mark 2 introduces a dedicated testing suite.

Added:

* Dummy MQTT Publisher
* Escalation Simulator
* Floor Batch Tests
* Escalation Tests

This makes regression testing significantly easier.

⸻

Better Separation of Responsibilities

Mark 1 services primarily handled:

* MQTT
* Incident Engine
* Rate Limiting
* Queue

Mark 2 introduces an additional specialized service:

Batcher Service

This keeps batching logic independent from the incident engine and improves maintainability.

⸻

Operational Benefits

Compared to Mark 1, Mark 2 provides:

* Floor-level telemetry aggregation
* Permanent incident history
* Database-backed audit logging
* Better startup orchestration
* Cleaner shutdown handling
* Improved modular architecture
* Automated regression testing
* Stronger foundation for future analytics and dashboards
