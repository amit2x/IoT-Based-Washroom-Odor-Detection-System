import asyncio
import json
import os
from datetime import datetime, timezone
import aiomqtt

async def publish_messages():
    mqtt_host = os.getenv("MQTT_HOST", "localhost")
    print(f"Connecting to local MQTT broker on {mqtt_host}:1883...")
    async with aiomqtt.Client(mqtt_host, 1883) as client:
        
        # Helper to create telemetry payload dict
        def make_payload(device_id: str, raw_whi: float):
            return {
                "device_id": device_id,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "avg_nh3_ppm": 5.0,
                "peak_nh3_ppm": 10.0,
                "avg_temperature_c": 23.5,
                "avg_humidity_percent": 58.0,
                "throughput": 4,
                "occupancy_inside": 2,
                "abandon_rate_percent": 0.0,
                "raw_whi": raw_whi
            }
            # def make_payload(device_id: str, raw_whi: float):
            # return {
            #     "device_id": "broken_sensor_99",
            #     "raw_whi": "CRITICAL_FAILURE_TEXT_NOT_A_FLOAT",
            #     "missing_time_entirely": True
            #     # Note: 'time', 'timestamp', and all other fields are removed!
            # }

        # 1. Send 3 critical messages for L2_WashroomA
        print("\nPublishing 3 critical telemetry readings for L2_WashroomA...")
        for i in range(3):
            topic = "washroom/T1/L2_WashroomA/telemetry"
            payload = make_payload("device_washroom_a", 15.0)
            await client.publish(topic, payload=json.dumps(payload))
            print(f"  Published critical message {i+1} to {topic}")
            await asyncio.sleep(0.5)

        # 2. Send 3 critical messages for L2_WashroomB
        print("\nPublishing 3 critical telemetry readings for L2_WashroomB...")
        for i in range(3):
            topic = "washroom/T1/L2_WashroomB/telemetry"
            payload = make_payload("device_washroom_b", 15.0)
            await client.publish(topic, payload=json.dumps(payload))
            print(f"  Published critical message {i+1} to {topic}")
            await asyncio.sleep(0.5)

        # Wait a moment
        await asyncio.sleep(1.0)
        
        # 3. Recover L2_WashroomA by sending a normal reading
        print("\nPublishing 1 normal telemetry reading to recover L2_WashroomA...")
        topic = "washroom/T1/L2_WashroomA/telemetry"
        payload = make_payload("device_washroom_a", 85.0)
        await client.publish(topic, payload=json.dumps(payload))
        print(f"  Published normal message to {topic}")
        
        print("\nDone publishing dummy MQTT telemetry messages!")

if __name__ == "__main__":
    asyncio.run(publish_messages())
