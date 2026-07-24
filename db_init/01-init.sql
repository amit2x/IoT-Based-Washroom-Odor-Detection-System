CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Create the foundational telemetry table
CREATE TABLE IF NOT EXISTS washroom_telemetry (
    time TIMESTAMPTZ NOT NULL,
    device_id TEXT NOT NULL,
    terminal TEXT,
    washroom_id TEXT,
    avg_nh3_ppm DOUBLE PRECISION,
    peak_nh3_ppm DOUBLE PRECISION,
    avg_temperature_c DOUBLE PRECISION,
    avg_humidity_percent DOUBLE PRECISION,
    throughput INTEGER,
    occupancy_inside INTEGER,
    abandon_rate_percent DOUBLE PRECISION,
    raw_whi DOUBLE PRECISION
);

-- Scalability: Convert to a TimescaleDB hypertable
-- This partitions the data by time automatically, allowing massive scalability 
-- for millions of records per day without performance degradation.
SELECT create_hypertable('washroom_telemetry', 'time', if_not_exists => TRUE);

-- Scalability: Create indexes for fast dashboard querying by location and device
CREATE INDEX IF NOT EXISTS ix_washroom_telemetry_device_id ON washroom_telemetry (device_id, time DESC);
CREATE INDEX IF NOT EXISTS ix_washroom_telemetry_terminal_washroom ON washroom_telemetry (terminal, washroom_id, time DESC);
