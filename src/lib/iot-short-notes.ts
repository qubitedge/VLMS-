export const iotShortNotes = `IoT LAB — SHORT NOTES
(Standard Curriculum)

INTRODUCTION TO IoT
The Internet of Things (IoT) refers to the network of physical devices embedded with sensors, software, and connectivity that enables them to collect and exchange data over the internet. IoT bridges the physical world and the digital world — allowing machines, appliances, vehicles, and environments to be monitored and controlled remotely.
Why IoT?

Enables automation of repetitive tasks (auto irrigation, auto lighting).
Provides real-time monitoring from anywhere in the world.
Reduces human intervention, errors, and operational costs.
Powers smart homes, smart agriculture, smart cities, and healthcare.

Core Components of an IoT System:

Sensors: Collect data from the physical environment (temperature, moisture, motion).
Microcontroller/Processor: Processes sensor data and makes decisions (Arduino, ESP32).
Connectivity: Sends data to cloud or other devices (Wi-Fi, MQTT, HTTP).
Cloud Platform: Stores and visualizes data (ThingSpeak, Adafruit IO).
Actuators: Take physical actions based on decisions (relay, motor, buzzer).


MODULE 1 — SENSOR INTERFACING
Overview:
Sensors are devices that detect physical quantities and convert them into electrical signals readable by a microcontroller. Understanding how to interface sensors is the foundation of all IoT projects.

![Module 1 Overview](/iot-m1-overview.webp)

Analog vs Digital Sensors:
Analog sensors output a continuous voltage signal proportional to the measured quantity. The microcontroller reads this using its ADC (Analog-to-Digital Converter). Example: LDR, soil moisture sensor.
Digital sensors output discrete HIGH/LOW or encoded digital data. Example: DHT11/DHT22 (single-wire protocol), PIR (HIGH when motion detected).
Data Acquisition:
The process of reading sensor output, converting it to meaningful units, and storing or transmitting it. Steps: sensor outputs signal → microcontroller reads via analogRead() or digitalRead() → raw value converted to physical units → data used for display, control, or upload.
Sensor Calibration:
Raw sensor output is not always directly meaningful. Calibration maps raw values to accurate physical measurements by comparing sensor output against a known reference. Offset calibration adds or subtracts a fixed error. Scale calibration adjusts the slope. Example for moisture sensor: moisture% = map(rawADC, DRY_VALUE, WET_VALUE, 0, 100).

Experiment 1.1 — Temperature Sensor Interfacing (DHT11/DHT22)

![Experiment 1.1](/iot-m1-1.webp)

DHT11/DHT22 Overview:
The DHT11/DHT22 is a digital sensor that measures both temperature and humidity using a single data wire. Inside it contains a thermistor (for temperature) and a capacitive humidity element, plus an internal 8-bit microcontroller that digitizes readings.
DHT11 vs DHT22:
DHT11: Range 0–50°C, accuracy ±2°C, humidity 20–90% RH. Cheaper and less precise.
DHT22: Range -40 to 80°C, accuracy ±0.5°C, humidity 0–100% RH. More precise and wider range.
Communication Protocol:
The sensor uses a single-wire serial protocol. The Arduino pulls the data line LOW for 18ms (start signal), then HIGH for 20–40µs. The sensor responds with 80µs LOW then 80µs HIGH, followed by 40 bits of data (humidity integer, humidity decimal, temperature integer, temperature decimal, checksum). The checksum byte ensures data integrity.
Key Code Points:
#include <DHT.h>
DHT dht(DHTPIN, DHT22);
float temp = dht.readTemperature();
float hum = dht.readHumidity();
A 10kΩ pull-up resistor is required on the data pin. Minimum 2-second delay between readings.
Conversion: Celsius to Fahrenheit: F = (C × 9/5) + 32

Experiment 1.2 — Humidity Monitoring (DHT11/DHT22)
Relative Humidity (RH):
RH is the ratio of actual water vapor in air to the maximum water vapor air can hold at that temperature, expressed as a percentage. RH = 100% means air is fully saturated. The DHT sensor uses a capacitive element — two electrodes sandwich a polymer substrate that changes capacitance as it absorbs moisture.

![Experiment 1.2](/iot-m1-2.webp)

Importance of Humidity Monitoring:
RH > 70% promotes mold, fungal growth, and corrosion. RH < 30% causes static electricity, respiratory discomfort, and desiccation. Server rooms, greenhouses, hospitals, and food storage require precise humidity control.
LCD 16x2 Display:
Uses HD44780 controller. 16 characters × 2 rows. Controlled by LiquidCrystal library. Key functions: lcd.begin(16,2), lcd.setCursor(col, row), lcd.print("text").
Threshold Alerting:
Define thresholds (e.g., HIGH_HUM = 70, LOW_HUM = 30). Use if-else to display warning messages on LCD row 2 and trigger buzzer. This is the fundamental pattern for all sensor-based alerting.

Experiment 1.3 — Light Sensor Interfacing (LDR)
LDR (Light Dependent Resistor):
A photoresistor made of CdS semiconductor. In darkness: resistance is very high (1MΩ+). In bright light: resistance drops to ~100Ω due to photoconductivity — light photons excite electrons, creating charge carriers that lower resistance.

![LDR](/iot-ldr.webp)
Voltage Divider Circuit:
LDR alone cannot be read by Arduino — it is a resistor, not a voltage source. A voltage divider is formed with a fixed 10kΩ resistor in series. The midpoint voltage: Vout = Vcc × R_fixed / (R_LDR + R_fixed). This voltage (0–5V) is read by analogRead() → returns 0–1023.
analogRead() and ADC:
Arduino Uno has a 10-bit ADC: maps 0–5V → 0–1023. ESP32 has a 12-bit ADC: maps 0–3.3V → 0–4095.
Auto LED Control:
if (lightValue < 400) { digitalWrite(ledPin, HIGH); } else { digitalWrite(ledPin, LOW); }
This is the basic principle of automatic street lights, night lamps, and screen auto-brightness.
map() Function:
Used to scale values: int brightness = map(lightValue, 0, 1023, 255, 0); maps sensor range to inverse PWM range for smooth dimming via analogWrite().

Experiment 1.4 — Motion Sensor Interfacing (PIR)
PIR Sensor (Passive Infrared):
Detects motion by sensing changes in infrared radiation emitted by warm bodies. Called "passive" because it does not emit radiation — only detects it. Stationary bodies produce no output; only movement across the field of view triggers the sensor.

![PIR Sensor](/iot-pir1.webp)
HC-SR501 PIR Module:
Operating voltage: 5–20V DC. Digital output: HIGH (3.3V) when motion detected, LOW otherwise. Has two potentiometers — one for sensitivity (range: 3m–7m), one for time delay (how long output stays HIGH: 3s–300s). Jumper selects retriggering mode: H (continuous HIGH as long as motion present) or L (single pulse per detection).

![HC-SR501 PIR Module](/iot-pir2.webp)
Fresnel Lens:
The plastic dome on the PIR focuses infrared radiation onto the sensing element and divides the field of view into detection zones. Motion across zones (rather than directly toward the sensor) is most reliably detected.

![Fresnel Lens](/iot-fresnel.webp)
Key Code Pattern:
int motionState = digitalRead(pirPin);
if (motionState == HIGH) { /* motion detected */ }
Applications: Security systems, automatic lighting, energy saving (lights off when no one present), people counting.

MODULE 2 — SMART HOME AUTOMATION
Overview:
Smart home automation uses microcontrollers, sensors, and internet connectivity to automate household devices — lights, fans, locks, and security systems — controllable remotely via smartphones or triggered automatically by sensor data.
Relay Module:
A relay is an electrically operated switch. A low-voltage GPIO signal (3.3V/5V) from the microcontroller controls an electromagnet that physically switches a high-voltage circuit (230V AC). This isolation protects the microcontroller from mains voltage. Most modules are active LOW — relay activates when IN pin is pulled LOW.

![Relay Module](/iot-relay.webp)
ESP8266/ESP32 Wi-Fi:
ESP8266 and ESP32 are Wi-Fi enabled microcontrollers. In Station mode they connect to an existing router and get an IP address. In Access Point mode they create their own Wi-Fi hotspot. They can host a web server on port 80 accessible from any browser on the same network.

![ESP8266/ESP32 Wi-Fi](/iot-esp32.webp)

Experiment 2.1 — Smart Light Control
Web Server on ESP:
The ESP8266WebServer or WebServer library allows the ESP to host an HTTP server. Handlers are registered for specific URL paths using server.on("/path", handlerFunction). When a browser sends a request to that URL, the handler executes.
Control Flow:
Browser → HTTP GET /toggle → ESP toggles relay state → ESP sends HTML response with updated state back to browser. The HTML page contains a button linked to /toggle and text showing current state (ON/OFF).
Active LOW Relay Logic:
digitalWrite(relayPin, HIGH) — relay OFF (appliance off).
digitalWrite(relayPin, LOW) — relay ON (appliance on).
Always initialize to HIGH to ensure appliance starts in OFF state.

Experiment 2.2 — Fan Automation
PWM Speed Control:
PWM (Pulse Width Modulation) rapidly switches power ON/OFF at a fixed frequency. Duty cycle (% of time HIGH) controls effective voltage → controls motor speed. analogWrite(pin, 0–255) in Arduino. On ESP32, use ledcSetup() and ledcWrite() for hardware PWM.

![PWM Speed Control](/iot-pwm.webp)
Temperature Thresholds:
Below 25°C → speed = 0 (OFF)
25–30°C → speed = 80 (LOW, ~31% duty cycle)
30–35°C → speed = 160 (MEDIUM, ~63% duty cycle)
Above 35°C → speed = 255 (HIGH, 100% duty cycle)
Hysteresis:
Prevents chattering around threshold boundaries. Fan turns ON when temp rises above 30°C but only turns OFF when temp drops below 27°C. The 3°C dead band absorbs natural sensor fluctuations.

Experiment 2.3 — Smart Door Lock
Servo Motor:
A DC motor with built-in gear reduction and position feedback (potentiometer). Rotates to a specific angle (0–180°) based on PWM pulse width. 1ms pulse = 0°, 1.5ms = 90°, 2ms = 180°. servo.write(angle) in Arduino controls position. 0° = locked, 90° = unlocked in this application.

![Servo Motor](/iot-servo.webp)
4×4 Matrix Keypad:
16 buttons in 4 rows × 4 columns. Arduino scans by activating one row at a time and reading which column is active. The Keypad library handles scanning automatically. Characters are read with keypad.getKey().
Access Control Logic:
Characters are appended to a buffer string as keys are pressed. When # is pressed: compare buffer with stored PIN. Match → servo unlocks → auto re-locks after 5 seconds. No match → error buzzer → increment fail counter. After 3 failures → 30-second lockout. * clears the buffer.

Experiment 2.4 — Home Security Alarm
Multi-Sensor Security System:
PIR sensors cover interior zones. Magnetic reed switches cover doors and windows (door opens → magnet moves away → switch opens → digital pin reads HIGH). Multiple zones are monitored independently so the system can identify which zone triggered.

![Multi-Sensor Security System](/iot-multi-sensor.webp)
Alarm States:
DISARMED: All sensor triggers ignored.
ARMED: All sensors active — any trigger raises alarm.
ALARM: Siren/buzzer active, LED flashing, notifications sent.
An arming button or PIN toggles between DISARMED and ARMED.

![Alarm States](/iot-alarm-states.webp)
IFTTT Webhooks Notification:
HTTP GET request to: https://maker.ifttt.com/trigger/{event}/with/key/{key}?value1={zone}&value2={time}
IFTTT applet then sends email, push notification, or SMS to the homeowner's phone — providing remote alert capability without a dedicated app.

MODULE 3 — IoT COMMUNICATION PROTOCOLS
Overview:
Communication protocols define the rules for data exchange between IoT devices and servers. The choice of protocol affects bandwidth, power consumption, latency, reliability, and scalability.

![IoT Protocols](/iot-protocols.webp)
Protocol Comparison:
ProtocolTypeBest ForHTTPRequest-ResponseSimple API calls, REST servicesMQTTPublish-SubscribeFrequent sensor data, low bandwidthWebSocketFull-DuplexReal-time dashboards, live controlESP-NOWPeer-to-PeerLocal D2D, no router needed

Experiment 3.1 — MQTT Publish/Subscribe
MQTT Architecture:
MQTT follows a client-broker model. All communication goes through a central broker (server).
Publisher: Sends messages to a topic on the broker.
Subscriber: Registers interest in a topic. Broker pushes matching messages to it automatically.
Broker: Routes messages from publishers to all matching subscribers.

![MQTT Architecture](/iot-mqtt-arch.webp)
Topics:
String-based routing addresses. Use / as separator. Example: home/livingroom/temperature. Wildcards: + matches one level (home/+/temperature), # matches all remaining levels (home/#).
QoS Levels:
QoS 0 (At most once): Fire and forget. No acknowledgment. Fastest.
QoS 1 (At least once): Guaranteed delivery but may duplicate.
QoS 2 (Exactly once): Guaranteed single delivery. Slowest but most reliable.
Key Code:
PubSubClient client(wifiClient);
client.setServer("broker.hivemq.com", 1883);
client.publish("home/temp", String(temp).c_str());
client.subscribe("home/light/command");
client.loop(); must be called in every loop() iteration to process messages.
MQTT vs HTTP:
HTTP requires repeated polling (client asks "any new data?" every few seconds). MQTT pushes data to subscribers immediately — much more efficient. A device sending data every 10 seconds over HTTP consumes 10× more bandwidth than MQTT.

Experiment 3.2 — HTTP-Based Data Transfer
HTTP Methods:
GET: Parameters in URL. Example: /update?field1=25.3. Simple, cacheable, but data visible in URL. Limited size.
POST: Data in request body as JSON or form data. More secure, supports large payloads. Used for structured data.
HTTP Response Codes:
200 OK (success), 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error.
REST API:
Architectural style using HTTP methods for CRUD on URL-identified resources. IoT cloud platforms (ThingSpeak, Adafruit IO, OpenWeatherMap) expose REST APIs.
ArduinoJson:
Library for creating and parsing JSON on Arduino/ESP devices.
StaticJsonDocument<200> doc;
doc["temperature"] = 25.3;
serializeJson(doc, payload); converts JSON object to string for sending.

![ArduinoJson](/iot-arduinojson.webp)
HTTPClient Usage:
HTTPClient http;
http.begin(url);
int code = http.GET(); or http.POST(payload);
String response = http.getString();
http.end();

Experiment 3.3 — WebSocket Communication
WebSocket Protocol:
Provides persistent, full-duplex (bidirectional) TCP connection between client and server. Unlike HTTP (connection closes after each response), WebSocket keeps the connection alive — both sides can send data at any time without waiting for a request.
Handshake:
Starts as HTTP with "Upgrade: websocket" header. Server responds "101 Switching Protocols". Connection upgraded to WebSocket.
ESP32 WebSocket Server:
ESPAsyncWebServer + AsyncWebSocket libraries enable WebSocket on ESP32.
AsyncWebSocket ws("/ws");
server.addHandler(&ws);
ws.textAll(jsonString); broadcasts to all connected clients.
Browser JavaScript:
var ws = new WebSocket("ws://" + window.location.host + "/ws");
ws.onmessage = function(event) { /* update DOM with event.data */ };
ws.send("toggle"); sends message to ESP.
Use Case:
Real-time sensor dashboards where values update on screen without page refresh. Bidirectional — browser can also send commands back to ESP32 through the same connection.

Experiment 3.4 — Device-to-Device Messaging (ESP-NOW)
ESP-NOW Protocol:
Espressif's proprietary wireless protocol for direct ESP-to-ESP communication without a Wi-Fi router. Operates at the MAC address layer. Range up to 200m (open space). Latency under 1ms. Payload up to 250 bytes.

![ESP-NOW Protocol](/iot-esp-now.webp)
Setup:
WiFi.mode(WIFI_STA);
esp_now_init();
Register peer with receiver's MAC address.
Register send callback (confirms delivery status).
Register receive callback (triggered when data arrives).
Structured Data Exchange:
Define identical struct on both sender and receiver:
struct SensorData { float temperature; float humidity; };
Sender: esp_now_send(peerMAC, (uint8_t*)&data, sizeof(data));
Receiver callback casts received bytes: SensorData recv = (SensorData)data;
Advantages over cloud-based D2D:
No internet required. Very low latency. Works in power outages (if battery backed). Useful for local automation (sensor node → control node) without depending on cloud infrastructure.

MODULE 4 — CLOUD-BASED IoT MONITORING
Overview:
Cloud IoT platforms store, visualize, and analyze data uploaded by IoT devices. They enable remote monitoring from anywhere with internet access, long-term data storage, and trend analysis.
ThingSpeak:
IoT cloud platform by MathWorks. Data organized in Channels with up to 8 Fields. Data uploaded via HTTP GET with Write API Key. Built-in charts, gauges, histograms. MATLAB Analytics for cloud-side data processing. Free tier: 1 channel, update every 15 seconds minimum.
Adafruit IO:
IoT platform with drag-and-drop dashboard builder. Data organized in Feeds. Supports MQTT (broker: io.adafruit.com, port 1883). Dashboard blocks: line chart, gauge, toggle, color picker, stream. Free tier: 30 data points per minute.

![Adafruit IO](/iot-adafruit-io.webp)

Experiment 4.1 — Real-Time Dashboard Creation
Dashboard Widgets:
Line Chart: Shows data trend over time. Best for temperature/humidity history.
Gauge: Displays current value as a dial. Best for single current readings.
Boolean Toggle: Shows and controls ON/OFF state.
Stream: Raw incoming data log.
Data Upload URL (ThingSpeak):
https://api.thingspeak.com/update?api_key=WRITE_KEY&field1=TEMP&field2=HUM
Response: HTTP 200 with entry number if successful.
Key Principle:
Never update faster than the platform's minimum interval. Add delay(15000) minimum for ThingSpeak. Exceeding rate limits returns HTTP 0 response — check for this in code.

Experiment 4.2 — Data Logging
Cloud vs Local Logging:
Cloud logging: Accessible anywhere, long-term storage, sharing possible, internet required.
Local (SD card) logging: Works offline, immediate, limited capacity, requires physical access to retrieve data.
SD Card Interface (SPI):
MOSI = GPIO 23, MISO = GPIO 19, SCK = GPIO 18, CS = GPIO 5 on ESP32.
SD.begin(CS_PIN); initializes the card.
FILE_APPEND mode adds to existing file without overwriting.

![SD Card Interface](/iot-sd-card.webp)
CSV Format:
timestamp,temperature,humidity
1200,25.3,65.2
1215,25.5,64.8
Simple, human-readable, importable to Excel/Python for analysis.
Dual Logging Pattern:

Read sensor.
Write to SD card (local backup — always works).
If Wi-Fi connected → upload to cloud.
If not connected → buffer in SD, upload later.
This ensures no data loss even with intermittent connectivity.


Experiment 4.3 — Remote Monitoring
Adafruit IO MQTT Feed Format:
Topic: username/feeds/feedname
Publish: client.publish("yourname/feeds/temperature", String(temp).c_str());
Subscribe: client.subscribe("yourname/feeds/light/command");

![Adafruit IO MQTT Feed Format](/iot-adafruit-mqtt.webp)
System Health Monitoring:
Beyond sensor data, always monitor:
WiFi.RSSI() → signal strength (lower = weaker, e.g., -80dBm is weak, -40dBm is strong).
millis()/1000 → device uptime in seconds.
ESP.getFreeHeap() → available memory (memory leaks show as decreasing values).
Publish these as separate feeds for complete remote visibility.
MQTT Reconnect Pattern:
void reconnect() {
while (!client.connected()) {
if (client.connect(clientID, username, aioKey)) { resubscribe(); }
else { delay(5000); }
}
}
Call reconnect() at the start of every loop() iteration to maintain connection.

Experiment 4.4 — Alert Generation
Alert Cooldown:
Prevents alert spam when sensor stays above threshold. Track time of last alert:
if ((millis() - lastAlertTime) > COOLDOWN_MS) { sendAlert(); lastAlertTime = millis(); }
Typical cooldown: 5 minutes (300,000ms).
Alert Hysteresis:
Alert triggers at one threshold, clears at another.
Alert ON when temp > 35°C. Alert OFF when temp drops below 32°C.
The 3°C dead band prevents repeated toggling.
Multi-Level Alerting:
INFO (score > 70): Green LED, no alert sent.
WARNING (score 40–70): Yellow LED, single beep, log to Serial.
CRITICAL (score < 40): Red LED, continuous buzzer, MQTT + cloud alert.
IFTTT Webhook URL:
https://maker.ifttt.com/trigger/EVENTNAME/with/key/YOUR_KEY?value1=VAL1&value2=VAL2&value3=VAL3
Three values (value1, value2, value3) can carry contextual data (e.g., sensor type, current reading, location).

MODULE 5 — SMART AGRICULTURE IoT
Overview:
Smart agriculture applies IoT sensor networks, automation, and data analytics to farming — optimizing water use, predicting crop stress, and automating routine tasks. Key goal: grow more with less (less water, less fertilizer, less labor) through data-driven decision making.
Precision Agriculture:
Uses location-specific sensor data rather than uniform field-wide treatment. IoT enables per-zone monitoring and actuation — applying the right input at the right place at the right time.
Key Agricultural Parameters:
Soil moisture (40–70% for most crops), temperature (18–30°C optimal), humidity (60–80% RH), light intensity (>10,000 lux for full sun crops), atmospheric pressure (trend indicates weather change).

Experiment 5.1 — Soil Moisture Monitoring
Capacitive vs Resistive Sensors:
Resistive: Two bare metal probes measure conductivity of soil. Simple, cheap, but corrodes within weeks due to electrolysis.
Capacitive: Measures dielectric constant change of soil with moisture. No bare conductors — durable for long-term field deployment. Preferred choice.

![Capacitive vs Resistive Sensors](/iot-cap-res.webp)
Calibration Process:

Measure ADC value in completely dry soil or open air → DRY_VALUE (e.g., 3200).
Measure ADC value in fully saturated soil → WET_VALUE (e.g., 800).
map(rawADC, DRY_VALUE, WET_VALUE, 0, 100) converts to percentage.
constrain(moisture, 0, 100) clips out-of-range values.

Status Classification:
moisture < 30% → DRY — Irrigate immediately.
moisture 30–70% → OPTIMAL — Normal growing conditions.
moisture > 70% → WET — Risk of waterlogging, root rot.

Experiment 5.2 — Automatic Irrigation System
Closed-Loop Control:
Sensor (moisture sensor) measures process variable (soil moisture). Controller (ESP32) compares it to setpoint (40%). Actuator (pump via relay) is activated if below setpoint, deactivated when setpoint is reached. The loop repeats — this is closed-loop feedback control.

![Closed-Loop Control](/iot-closed-loop.webp)
Safety Features:
Maximum pump run time: Pump cannot run for more than 5 minutes in one cycle. Prevents pump burnout and overwatering if sensor fails.
Dry run protection: If pump runs for maximum time but moisture hasn't increased, sensor may have failed → generate alert.
Manual override: Web interface allows farmer to force pump ON or OFF regardless of sensor reading.
Relay Activation:
Active LOW relay: digitalWrite(relayPin, LOW) = pump ON. digitalWrite(relayPin, HIGH) = pump OFF.
Always initialize relay to HIGH (pump OFF) in setup() to prevent unexpected pump activation on startup or reset.

![Relay Activation](/iot-relay-activation.webp)

Experiment 5.3 — Weather Monitoring Station
Sensors Used:
DHT22: Temperature (-40 to 80°C) and Humidity (0–100% RH).
BMP280: Atmospheric pressure (300–1100 hPa) and temperature via I2C. Standard sea-level pressure = 1013.25 hPa.
LDR/BH1750: Light intensity in lux or relative percentage.
BMP280 Key Readings:
float pressure = bmp.readPressure() / 100.0F; converts Pascals to hPa.
float altitude = bmp.readAltitude(1013.25); estimates altitude from pressure.
Pressure-Based Weather Forecasting:
Falling pressure (below 1005 hPa, decreasing) → Storm/rain approaching.
Rising pressure (above 1020 hPa, increasing) → Fair/clear weather.
Rapid drop (>3 hPa in 3 hours) → Strong storm likely.
Heat Index:
Combines temperature and humidity to give a "feels like" temperature.
dht.computeHeatIndex(temp, humidity, false) calculates it in Celsius.
Above 40°C heat index → dangerous conditions for fieldworkers.
Data Aggregation:
Instead of uploading every raw reading, compute 10-minute averages, min, and max. Reduces upload frequency, smooths noise, and provides more meaningful statistics for trend analysis.

Experiment 5.4 — Crop Health Alerts
Composite Health Score:
A single 0–100 score computed from multiple parameters. Each parameter gets a sub-score (100 if within optimal range, decreasing proportionally if outside). Weighted average:
Score = (moisture_score × 0.40) + (temp_score × 0.30) + (humidity_score × 0.20) + (light_score × 0.10)
Alert Levels Based on Score:
Score > 70 → HEALTHY: Green LED, no action needed.
Score 40–70 → WARNING: Yellow LED, single beep, log to MQTT.
Score < 40 → CRITICAL: Red LED, continuous buzzer, MQTT + cloud alert.
Advantages of Composite Score Over Individual Alerts:
Reduces alert noise — instead of 4 separate alerts, one score captures overall plant health. Intuitive — farmers understand a single percentage score easily. Prioritizes — high-weight parameters (moisture) influence the score more.
MQTT-Based Alert Flow:
ESP32 publishes health score to farm/crop/health_score topic.
ESP32 publishes alert level to farm/crop/alert topic.
Node-RED or cloud subscriber receives these and triggers appropriate actions (start pump, send SMS, log to database) without any additional code on the ESP32.

![MQTT-Based Alert Flow](/iot-mqtt-flow.webp)
Optimal Ranges Reference (Tomato Example):
ParameterOptimal RangeToo Low ImpactToo High ImpactSoil Moisture40–65%Wilting, stressRoot rot, anaerobiaTemperature18–28°CChilling injuryHeat stress, blossom dropHumidity60–80% RHWater stressFungal disease (blight)Light40–90% scalePoor photosynthesisLeaf scorching

TOOL REFERENCE SUMMARY
Simulation Tools:
Wokwi (https://wokwi.com): Online simulator for ESP32, ESP8266, Arduino. Supports DHT, PIR, BMP280, LCD, relay, servo, motor, keypad, MQTT simulation.
Tinkercad Circuits (https://www.tinkercad.com): Browser-based circuit simulator for Arduino Uno. Good for basic sensor interfacing and analog circuits.
Cloud Platforms:
ThingSpeak: Simple REST API data logging and charting. Best for beginners. Min 15s update interval on free tier.
Adafruit IO: MQTT-first platform with powerful dashboard builder. 30 data points/minute on free tier.
HiveMQ: Public MQTT broker (broker.hivemq.com:1883) for testing MQTT without setting up a local broker.
Key Libraries:
DHT.h: DHT11/DHT22 sensor reading.
PubSubClient.h: MQTT client for ESP8266/ESP32.
HTTPClient.h: HTTP GET/POST for ESP32.
ArduinoJson.h: JSON creation and parsing.
ESPAsyncWebServer.h: Async web + WebSocket server on ESP32.
LiquidCrystal_I2C.h: I2C LCD display control.
Adafruit_BMP280.h: BMP280 pressure sensor.
ESP32Servo.h: Servo motor control on ESP32.
Keypad.h: Matrix keypad scanning.
`;
