import type { Course } from "./course-data";
import { iotShortNotes } from "./iot-short-notes";

export const iotCourse: Course = {
  id: "iot",
  title: "IoT Virtual Lab — JNTUGV Virtual Labs",
  shortNotes: iotShortNotes,
  objectives: [
    "To introduce students to the fundamental concepts of IoT architecture including the sensor layer, communication layer, processing layer, and cloud application layer and understand how each layer interacts in a complete IoT system.",
    "To train students in interfacing analog and digital sensors including DHT11/DHT22 temperature and humidity sensors, LDR light-dependent resistors, and PIR passive infrared motion sensors with Arduino and ESP8266/ESP32 microcontrollers using Tinkercad and Wokwi simulations.",
    "To understand sensor data acquisition, analog-to-digital conversion, sensor calibration, and signal conditioning techniques required to obtain accurate real-world measurements from physical sensors.",
    "To implement smart home automation systems by controlling relays for appliances, integrating Wi-Fi communication via ESP8266/ESP32, and enabling remote control through mobile applications and web dashboards.",
    "To understand and implement IoT communication protocols including MQTT publish/subscribe messaging, HTTP/HTTPS RESTful data transfer, and WebSocket bidirectional communication and recognize when each protocol is most appropriate.",
    "To connect IoT devices to cloud platforms such as ThingSpeak and Adafruit IO, perform real-time data logging, create live monitoring dashboards, and configure automated alert generation based on sensor threshold values.",
    "To apply IoT concepts to smart agriculture by building soil moisture monitoring systems, automated irrigation controllers, weather monitoring stations, and crop health alert systems demonstrating the practical impact of IoT on precision farming.",
    "To develop the ability to design complete end-to-end IoT solutions — from sensor hardware and microcontroller firmware through communication protocols to cloud visualization — using industry-standard tools and platforms."
  ],
  introduction: [
    "The Internet of Things (IoT) is one of the most transformative technologies of the 21st century. By connecting physical devices, sensors, and actuators to the internet, IoT enables machines to collect, share, and act on real-world data without human intervention. From smart homes and precision agriculture to industrial automation and healthcare monitoring, IoT systems are reshaping how the world works at every level.",
    "The Virtual IoT Lab provides a browser-based, hands-on learning environment that requires no physical hardware, no microcontroller boards, and no electronic components to get started. Using industry-standard simulation tools including Tinkercad Circuits, Wokwi Online Simulator, and Node-RED, students can design circuits, write firmware, test sensor behavior, and visualize real-time data — all within a browser window.",
    "The lab covers 5 comprehensive modules spanning the complete IoT development lifecycle — from sensor interfacing and microcontroller programming to Wi-Fi communication, cloud-based monitoring, and smart agriculture automation. Each experiment includes a clear objective, theoretical background, circuit schematic, simulation setup, step-by-step procedure, and a post-experiment assessment.",
    "Students will work with industry-relevant technologies including Arduino and ESP8266/ESP32 microcontrollers, DHT11/DHT22 temperature and humidity sensors, PIR motion sensors, LDR light sensors, relay modules, MQTT protocol, HTTP-based APIs, WebSocket communication, and cloud IoT platforms such as ThingSpeak and Adafruit IO. All circuit simulations are performed on Tinkercad and Wokwi, both of which are free, browser-based, and require only a free account to use.",
    "By the end of this lab students will have hands-on experience building complete IoT systems from the sensor layer through the communication layer to the cloud visualization layer — the full IoT stack.",
    "Feedback: We value your feedback to improve this virtual lab experience continuously. Your responses help us improve experiment quality, simulation accuracy, and the overall learning experience for future students. We acknowledge the Tinkercad, Wokwi, ThingSpeak, Adafruit IO, and Node-RED platforms for providing free, high-quality tools that make browser-based IoT education possible."
  ],
  targetAudience: {
    primary: "Students of Electronics, Computer Science, Information Technology, and allied engineering disciplines learning IoT and embedded systems.",
    prerequisites: [
      "Knowledge of basic electronics — voltage, current, resistance, and Ohm's law.",
      "Familiarity with C/C++ programming fundamentals for Arduino firmware.",
      "Understanding of basic digital logic and microcontroller concepts.",
      "Awareness of computer networks and the internet at an introductory level.",
      "No prior experience with physical Arduino boards or IoT platforms is required — all experiments are simulation-based."
    ],
    usefulFor: [
      "Final year students doing IoT-based projects who need to prototype and test systems before hardware procurement.",
      "Diploma-to-B.Tech lateral entry students wanting to build IoT skills from scratch.",
      "Faculty members designing IoT lab curricula aligned to standard engineering syllabi.",
      "Hobbyists and self-learners interested in smart home and agriculture automation.",
      "Students preparing for IoT-related internships at companies like Qubitedge Technologies, TCS iON, and Infosys where IoT skills are actively required."
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "ECE, CSE, IT, EEE, and allied branches",
    course: "Internet of Things Lab / Embedded Systems Lab / IoT Applications (refer JNTUGV curriculum for specific course code)",
    credits: "Core or Elective Lab",
    yearSem: "Third Year or Fourth Year",
    branches: "ECE, CSE, IT, EEE",
    totalExperiments: "20 (4 experiments per module)",
    compiler: "Tinkercad Circuits, Wokwi Simulator, Node-RED, ThingSpeak, Adafruit IO, Arduino Web Editor",
    units: [
      { unit: "Module 1", topics: "Sensor Interfacing (Analog and digital sensors, data acquisition, calibration)", weeks: "Week 1" },
      { unit: "Module 2", topics: "Smart Home Automation (Relay control, Wi-Fi communication, mobile app integration)", weeks: "Week 2" },
      { unit: "Module 3", topics: "IoT Communication Protocols (MQTT, HTTP/HTTPS, WebSocket, client-server architecture)", weeks: "Week 3" },
      { unit: "Module 4", topics: "Cloud-Based IoT Monitoring (Cloud platforms, real-time visualization, alert generation)", weeks: "Week 4" },
      { unit: "Module 5", topics: "Smart Agriculture IoT (Precision agriculture, automation logic, environmental monitoring)", weeks: "Week 5" }
    ]
  },
  weeks: [
    {
      title: "Module 1",
      objective: "Learn how sensors collect data and communicate with microcontrollers. Concepts Covered: Analog and digital sensors, data acquisition, sensor calibration. Simulation Tool: Tinkercad Circuits, Wokwi Online Simulator.",
      tutorial: "Sensor Interfacing",
      labTitle: "Sensor Interfacing",
      experiments: [
        { 
          id: "iot-m1-1", 
          title: "Experiment 1.1 — Temperature Sensor Interfacing (DHT11/DHT22)", 
          desc: "Interface a DHT11 or DHT22 digital temperature sensor with an Arduino Uno. Read temperature values in Celsius and Fahrenheit using the DHT library. Display readings on the Serial Monitor. Simulate the full circuit on Tinkercad including sensor wiring, pull-up resistor, and serial output.", 
          expected: "Values read successfully.",
          content: {
            aim: {
              text: "In this experiment the student will interface a DHT11 or DHT22 digital temperature and humidity sensor with an Arduino Uno microcontroller, write firmware to read temperature values in both Celsius and Fahrenheit using the DHT Arduino library, display readings on the Serial Monitor, and simulate the complete circuit on Tinkercad Circuits. The student will understand how digital sensors communicate with microcontrollers using a single-wire protocol, how the DHT library abstracts low-level timing, and why temperature monitoring is the foundational building block of virtually every IoT system.",
              bullets: [
                "Understand the difference between DHT11 and DHT22 in terms of accuracy, range, and cost",
                "Wire the DHT sensor correctly to the Arduino including the mandatory pull-up resistor on the data line",
                "Write Arduino firmware to initialize the DHT library and read temperature in Celsius and Fahrenheit",
                "Convert between Celsius and Fahrenheit using the standard formula",
                "Display timestamped temperature readings on the Arduino Serial Monitor",
                "Implement a threshold alert that activates an LED when temperature exceeds a set value",
                "Simulate the complete circuit on Tinkercad without any physical hardware",
                "Analyze the single-wire communication protocol used by DHT sensors at a conceptual level"
              ]
            },
            theory: [
              {
                title: "What is a Temperature Sensor?",
                body: [
                  "A temperature sensor is an electronic device that measures the thermal energy of its environment and converts it into an electrical signal that can be read by a microcontroller or computer. Temperature sensing is the most common IoT data acquisition task — used in weather stations, HVAC systems, cold chain monitoring, industrial process control, smart agriculture, and healthcare.",
                  "Temperature sensors are broadly classified into two categories based on their output signal type: Analog temperature sensors produce a continuously varying voltage proportional to temperature. The LM35 is a classic example producing 10mV per degree Celsius. The Arduino reads this using its analog input pins and the analogRead() function which returns a 10-bit ADC value (0 to 1023).",
                  "Digital temperature sensors integrate the sensing element, signal conditioning, and analog-to-digital conversion on a single chip and output pre-processed digital data through a standard communication protocol. The DHT11 and DHT22 are digital temperature sensors."
                ]
              },
              {
                title: "DHT11 vs DHT22 — Detailed Comparison",
                body: [
                  "DHT11: Range 0°C to 50°C, Accuracy ±2°C. Humidity Range 20% to 80% RH, Accuracy ±5% RH. Sampling Rate 1 reading/sec. Cost: Lower. Best Use: Indoor low-cost projects.",
                  "DHT22 (AM2302): Range -40°C to 80°C, Accuracy ±0.5°C. Humidity Range 0% to 100% RH, Accuracy ±2% RH. Sampling Rate 1 reading per 2 seconds. Cost: Higher. Best Use: Precision monitoring.",
                  "For classroom experiments and prototyping DHT11 is sufficient. For agriculture, HVAC, and industrial IoT DHT22 is recommended due to its wider range and higher accuracy."
                ]
              },
              {
                title: "DHT Sensor Pin Configuration",
                body: [
                  "The DHT11/DHT22 sensor has four pins:",
                  "Pin 1 (VCC): Power supply — connect to 5V on Arduino.",
                  "Pin 2 (DATA): Single-wire bidirectional data line — connect to any Arduino digital pin (commonly D2 or D4). A 4.7kΩ to 10kΩ pull-up resistor is mandatory between DATA and VCC.",
                  "Pin 3 (NC): Not connected — leave unconnected.",
                  "Pin 4 (GND): Ground — connect to GND on Arduino.",
                  "Why is the pull-up resistor mandatory? The DHT sensor uses an open-drain data line. Without the pull-up resistor the data line floats at an undefined voltage when the sensor releases it, causing communication errors and incorrect readings."
                ]
              },
              {
                title: "DHT Single-Wire Communication Protocol",
                body: [
                  "The DHT sensor transmits 40 bits of data per reading: 8 bits humidity integer part, 8 bits humidity decimal part, 8 bits temperature integer part, 8 bits temperature decimal part, and 8 bits checksum (sum of previous 4 bytes for error detection).",
                  "Communication sequence: Start signal: Arduino pulls data line LOW for at least 18ms then releases it HIGH. This wakes the sensor. Sensor response: DHT pulls data line LOW for 80μs then HIGH for 80μs confirming it is ready. Data transmission: DHT transmits 40 bits. Each bit starts with a 50μs LOW pulse followed by either a 26-28μs HIGH pulse (bit = 0) or a 70μs HIGH pulse (bit = 1).",
                  "The DHT library handles all timing-critical operations automatically so the student only needs to call dht.readTemperature() and dht.readHumidity()."
                ]
              },
              {
                title: "Temperature Unit Conversion & Arduino Library",
                body: [
                  "Celsius to Fahrenheit: °F = (°C × 9/5) + 32",
                  "Fahrenheit to Celsius: °C = (°F - 32) × 5/9",
                  "The Arduino ecosystem uses the DHT sensor library by Adafruit which simplifies all communication.",
                  "Key library functions: DHT dht(PIN, DHT11): Constructor — specify data pin number and sensor type. dht.begin(): Initialize the sensor. dht.readTemperature(): Returns temperature in Celsius as a float. dht.readTemperature(true): Returns temperature in Fahrenheit. isnan(value): Returns true if the reading failed (Not a Number)."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Create a Tinkercad Account and New Circuit. Go to https://www.tinkercad.com and sign in with a free account. Click Create → Circuits. A new blank workspace opens with a component panel on the right.",
              "Step 2: Place Components on the Breadboard. Search for and place: Arduino Uno R3, Breadboard small, DHT11 Sensor, Resistor 10kΩ, LED red, Resistor 220Ω.",
              "Step 3: Wire the Circuit. Connect DHT11 VCC to 5V, GND to GND, DATA to D4. Connect 10kΩ pull-up resistor between DHT11 DATA pin and 5V. Connect LED anode to D7 via 220Ω resistor and cathode to GND.",
              "Step 4: Open the Code Editor. In Tinkercad click the Code button at the top right. Switch from Blocks to Text mode.",
              "Step 5: Write the Firmware. Include DHT library, initialize Serial and DHT sensor, read temperature and humidity every 2 seconds, print to Serial Monitor, and activate LED when temperature exceeds threshold.",
              "Step 6: Start Simulation. Click the green Start Simulation button. Open the Serial Monitor. Observe temperature readings.",
              "Step 7: Interact with the Simulation. Click on the DHT11 sensor. Adjust the temperature slider above the threshold and observe the LED turning ON.",
              "Step 8: Record Observations. Record temperature in Celsius and Fahrenheit at 20°C, 30°C, and 40°C. Verify LED activation.",
              "Step 9: Explore Wokwi for DHT22. Open https://wokwi.com and create a new ESP32 project. Add a DHT22 sensor. Wire identically. Modify firmware and observe higher precision readings.",
              "Step 10: Proceed to Posttest."
            ],
            posttest: [],
            references: [
              "Storey N., Electronics: A Systems Approach, 5th Edition, Pearson",
              "Monk S., Programming Arduino: Getting Started with Sketches, 2nd Edition, McGraw Hill",
              "Adafruit DHT Sensor Library Documentation: https://github.com/adafruit/DHT-sensor-library",
              "Tinkercad Circuits Getting Started Guide: https://www.tinkercad.com/learn/circuits",
              "Wokwi ESP32 Simulator Documentation: https://docs.wokwi.com"
            ]
          }
        },
        { 
          id: "iot-m1-2", 
          title: "Experiment 1.2 — Humidity Monitoring (DHT11/DHT22)", 
          desc: "Read humidity percentage from the DHT11/DHT22 sensor and implement threshold-based alerting — activate an LED when humidity exceeds a set limit. Understand the difference between relative humidity and absolute humidity. Simulate on Tinkercad with LED indicator circuit.", 
          expected: "Humidity read and LED triggered successfully.",
          content: {
            aim: {
              text: "In this experiment the student will extend the DHT sensor interfacing from Experiment 1.1 to focus specifically on relative humidity monitoring. The student will implement threshold-based humidity alerting using an LED indicator, understand the difference between relative and absolute humidity, implement a dual-threshold system that distinguishes between too-dry and too-humid conditions, and display humidity trends on the Serial Monitor with appropriate status messages.",
              bullets: [
                "Understand relative humidity as a percentage of maximum moisture air can hold at a given temperature",
                "Read humidity values from DHT11/DHT22 using dht.readHumidity()",
                "Implement a dual-threshold alert system — LED1 for high humidity and LED2 for low humidity",
                "Understand why humidity monitoring is critical for agriculture, HVAC, server rooms, and museums",
                "Combine temperature and humidity readings to compute the Heat Index (apparent temperature)",
                "Simulate the complete circuit on Tinkercad with multiple LED indicators",
                "Log humidity trends showing rising and falling patterns across multiple reading cycles"
              ]
            },
            theory: [
              {
                title: "What is Relative Humidity?",
                body: [
                  "Humidity measures the amount of water vapor present in the air. Relative Humidity (RH) is defined as the ratio of the actual water vapor pressure to the maximum possible water vapor pressure at a given temperature, expressed as a percentage.",
                  "RH = 0%: Completely dry air — no water vapor present. RH = 100%: Air is fully saturated — dew point reached, condensation begins.",
                  "RH depends on temperature: warm air holds more moisture than cold air. If air at 100% RH is cooled the excess moisture condenses as dew, rain, or fog."
                ]
              },
              {
                title: "Why Humidity Monitoring Matters",
                body: [
                  "Human comfort: The ideal indoor humidity for human comfort is 40% to 60% RH.",
                  "Agriculture: Crops require specific humidity ranges. Low humidity causes plant stress. High humidity promotes fungal diseases.",
                  "Electronics and server rooms: Humidity must be maintained below 60% to prevent condensation and above 40% to prevent static discharge.",
                  "Museums and archives: Paintings and artifacts require 45-55% RH."
                ]
              },
              {
                title: "Heat Index Calculation",
                body: [
                  "The Heat Index (apparent temperature or 'feels like' temperature) combines temperature and humidity to describe how hot it actually feels to the human body.",
                  "The DHT library provides a built-in computeHeatIndex() function: float heatIndex = dht.computeHeatIndex(temperature, humidity, false); (false parameter means Celsius input/output)"
                ]
              },
              {
                title: "Dual-Threshold Alert System",
                body: [
                  "For robust humidity monitoring implement two thresholds:",
                  "High threshold (example: 70% RH): Activate HIGH humidity alert — red LED ON, indicates risk of mold or condensation.",
                  "Low threshold (example: 30% RH): Activate LOW humidity alert — blue or yellow LED ON, indicates too dry conditions.",
                  "Normal range (30% to 70%): Both LEDs OFF, green LED ON indicating normal conditions."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Open Previous Tinkercad Circuit. Open the Tinkercad circuit built in Experiment 1.1 and copy it.",
              "Step 2: Add Second LED for Dual-Threshold Alert. Add a second LED (yellow or blue) to the breadboard. Connect its anode to Arduino pin D8 via a 220Ω resistor.",
              "Step 3: Add Green Status LED. Add a third LED (green) connected to Arduino pin D9 via 220Ω resistor for the normal range indicator.",
              "Step 4: Update Firmware. Define HIGH_THRESHOLD = 70.0 and LOW_THRESHOLD = 30.0. Read humidity and compute Heat Index. Implement three-state LED logic: High (Red), Low (Yellow), Normal (Green).",
              "Step 5: Start Simulation and Test All Three States. Click Start Simulation. Click DHT11 sensor and adjust Humidity slider to test 25%, 50%, and 75%.",
              "Step 6: Record Observations. Record LED state and Serial Monitor output. Verify Heat Index values.",
              "Step 7: Explore Wokwi for Enhanced Simulation."
            ],
            posttest: [],
            references: [
              "ASHRAE Standard 55 — Thermal Environmental Conditions for Human Occupancy",
              "Tinkercad Circuits: https://www.tinkercad.com",
              "Wokwi Simulator Documentation: https://docs.wokwi.com"
            ]
          }
        },
        { 
          id: "iot-m1-3", 
          title: "Experiment 1.3 — Light Sensor Interfacing (LDR)", 
          desc: "Interface a Light Dependent Resistor (LDR) in a voltage divider circuit with the Arduino analog input pin. Read raw ADC values and convert to lux approximation. Implement automatic light control — activate an LED when ambient light falls below a threshold. Simulate on Tinkercad.", 
          expected: "LDR values read and LED triggered successfully.",
          content: {
            aim: {
              text: "In this experiment the student will interface a Light Dependent Resistor (LDR) in a voltage divider circuit with the Arduino analog input pin A0, read raw ADC values using analogRead(), convert ADC values to voltage and approximate lux values, implement automatic light control that activates an LED when ambient light falls below a darkness threshold, and simulate the complete circuit on Tinkercad. The student will understand analog sensor interfacing, the voltage divider principle, ADC resolution, and how light-dependent automation is implemented in real IoT systems.",
              bullets: [
                "Understand the LDR as a photoresistive analog sensor whose resistance decreases with increasing light",
                "Build a voltage divider circuit using LDR and a fixed resistor to produce a voltage proportional to light intensity",
                "Read analog voltage using Arduino's 10-bit ADC producing values from 0 to 1023",
                "Convert ADC readings to voltage and approximate lux using calibration formulas",
                "Implement automatic LED activation when the ADC reading indicates darkness",
                "Simulate the circuit on Tinkercad using the LDR (photoresistor) component",
                "Understand the fundamental difference between analog and digital sensor interfacing"
              ]
            },
            theory: [
              {
                title: "What is an LDR?",
                body: [
                  "A Light Dependent Resistor (LDR), also called a photoresistor or photocell, is a passive analog sensor whose electrical resistance changes inversely with the intensity of incident light. In darkness the LDR resistance is very high (typically 1MΩ to 10MΩ). In bright light the resistance drops dramatically (typically 100Ω to 1kΩ).",
                  "LDR working principle: Light photons hitting the semiconductor material (usually cadmium sulfide — CdS) excite electrons into the conduction band increasing the number of charge carriers and reducing resistance."
                ]
              },
              {
                title: "Voltage Divider Circuit",
                body: [
                  "The LDR produces a resistance value but the Arduino reads voltage. A voltage divider converts the LDR resistance change into a measurable voltage change.",
                  "Circuit: VCC (5V) → LDR → Junction Point A → Fixed Resistor (10kΩ) → GND. Voltage at Junction Point A: V_A = VCC × R_fixed / (R_LDR + R_fixed).",
                  "More light → Higher voltage at A0 → Higher ADC reading. Darkness → Lower voltage at A0 → Lower ADC reading."
                ]
              },
              {
                title: "Arduino ADC and analogRead()",
                body: [
                  "The Arduino Uno has a 10-bit Analog to Digital Converter (ADC) on its analog pins A0 to A5.",
                  "10-bit resolution: Converts input voltage (0V to 5V) into a digital value from 0 to 1023 (2¹⁰ = 1024 steps).",
                  "ADC formula: ADC_value = (V_input / V_reference) × 1023",
                  "Inverse (voltage from ADC): V_input = ADC_value × (5.0 / 1023.0)"
                ]
              },
              {
                title: "Analog vs Digital Sensor Comparison",
                body: [
                  "Analog Sensor (LDR): Continuous voltage output, read via analogRead() A0 to A5, 10-bit resolution, requires voltage divider, manual conversion.",
                  "Digital Sensor (DHT11): Discrete digital bits output, read via digitalRead() or library, fixed precision, factory calibrated, simple pull-up circuit."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Create New Tinkercad Circuit. Place an Arduino Uno, breadboard, LDR, two resistors (10kΩ and 220Ω), and a red LED.",
              "Step 2: Build the Voltage Divider Circuit. Connect 5V → LDR → Junction → 10kΩ resistor → GND. Connect Junction to A0.",
              "Step 3: Add LED Circuit. Connect LED anode → 220Ω resistor → Arduino D13. Connect LED cathode → GND.",
              "Step 4: Write Firmware. Define LDR_PIN as A0, LED_PIN as D13, DARKNESS_THRESHOLD as 400. Loop reads ADC value using analogRead(), converts to voltage, prints to Serial Monitor, and activates LED when ADC value is below threshold.",
              "Step 5: Simulate and Test. Click Start Simulation. Click on the LDR and adjust the light intensity slider. Observe LED activation.",
              "Step 6: Record and Calibrate. Record ADC values at 5 different light levels. Compute corresponding voltage and resistance."
            ],
            posttest: [],
            references: [
              "Monk S., Make: Electronics, 2nd Edition, Maker Media",
              "Arduino analogRead() Reference: https://www.arduino.cc/reference/en/language/functions/analog-io/analogread/",
              "Tinkercad LDR Circuit Tutorial: https://www.tinkercad.com/learn/circuits"
            ]
          }
        },
        { 
          id: "iot-m1-4", 
          title: "Experiment 1.4 — Motion Sensor Interfacing (PIR)", 
          desc: "Interface a Passive Infrared (PIR) motion sensor with Arduino. Detect presence and absence of motion from the digital output of the PIR module. Trigger an alarm LED and buzzer on motion detection. Implement a cooldown timer to prevent repeated triggers. Simulate on Tinkercad.", 
          expected: "Motion detected and buzzer triggered successfully.",
          content: {
            aim: {
              text: "In this experiment the student will interface a Passive Infrared (PIR) motion sensor with an Arduino Uno, detect human presence by reading the PIR digital output, activate an alarm LED and buzzer on motion detection, implement a configurable cooldown timer to prevent repeated false triggers, and simulate the complete circuit on Tinkercad. The student will understand how PIR sensors detect infrared radiation changes caused by moving warm bodies, why PIR sensors are passive (require no emitter), and how they are used in real security, energy management, and smart home systems.",
              bullets: [
                "Understand the PIR sensor working principle based on differential infrared radiation detection",
                "Read the PIR digital output (HIGH on motion, LOW on no motion) using digitalRead()",
                "Implement a state machine with three states — idle, motion detected, and cooldown",
                "Activate LED and buzzer on motion detection and deactivate after cooldown period",
                "Print timestamped motion events to Serial Monitor",
                "Implement sensitivity and time-delay adjustments using the PIR sensor's built-in potentiometers",
                "Simulate the complete circuit on Tinkercad using the PIR sensor component"
              ]
            },
            theory: [
              {
                title: "What is a PIR Sensor?",
                body: [
                  "A Passive Infrared (PIR) sensor is an electronic sensor that detects infrared (IR) radiation emitted by warm objects — particularly human bodies. The term passive means the sensor only receives infrared radiation — it does not emit any signal of its own unlike active sensors such as ultrasonic sensors which emit a pulse and detect the echo.",
                  "All objects above absolute zero temperature (0 Kelvin = -273.15°C) emit infrared radiation. The amount of infrared radiation emitted increases with temperature. Human bodies at 37°C emit significant infrared radiation in the 8-14 micrometer wavelength range making PIR sensors highly effective for human presence detection."
                ]
              },
              {
                title: "PIR Sensor Working Principle",
                body: [
                  "The PIR sensor contains a pyroelectric element — a crystalline material that generates an electric charge when it absorbs infrared radiation. The sensor uses two pyroelectric elements arranged differentially:",
                  "Static scene: Both elements receive equal infrared radiation from the background. Their signals cancel out. Output remains LOW.",
                  "Moving warm object: As a person moves across the sensor's field of view one element receives more infrared radiation than the other. The differential signal causes the output to go HIGH indicating motion detected.",
                  "Fresnel lens: The white plastic dome covering the PIR sensor is a Fresnel lens that focuses and channels infrared radiation from a wide field of view (typically 110 degrees horizontal, 70 degrees vertical) onto the pyroelectric elements. It also creates multiple detection zones giving the sensor sensitivity to motion across its full field."
                ]
              },
              {
                title: "HC-SR501 PIR Sensor Module",
                body: [
                  "The HC-SR501 is the most commonly used PIR module in Arduino projects. It has three pins: VCC (5V to 20V), OUT (Digital HIGH/LOW), GND.",
                  "Two adjustable potentiometers on the module: Sensitivity potentiometer (Adjusts detection range from approximately 3m to 7m) and Time-delay potentiometer (Sets how long the output remains HIGH after motion is detected — from 3s to 5m).",
                  "Two output mode jumper settings: Single trigger mode (L): Output goes HIGH for the set time delay then returns LOW — even if motion continues. Repeatable trigger mode (H): Output remains HIGH as long as motion is continuously detected — resets the timer each time new motion is detected."
                ]
              },
              {
                title: "PIR Detection Timing",
                body: [
                  "Initialization time: PIR sensors require a warm-up period of approximately 30-60 seconds after power-on during which they calibrate to the ambient infrared level of the environment. During this period the output may fluctuate — ignore readings during warm-up.",
                  "Detection cycle: Motion detected → OUT goes HIGH. Output stays HIGH for time-delay setting. Output goes LOW (inhibit period begins — typically 3 seconds where new detections are ignored). After inhibit period the sensor is ready for the next detection."
                ]
              },
              {
                title: "State Machine for PIR-Based Security System",
                body: [
                  "A state machine organizes the firmware logic into discrete states with defined transitions:",
                  "State 0 — IDLE: PIR output is LOW. No motion. LED OFF, buzzer OFF. Transition: PIR goes HIGH → move to State 1.",
                  "State 1 — MOTION DETECTED: PIR output is HIGH. LED ON, buzzer ON. Record detection timestamp. Transition: After motionDuration (example 5 seconds) → move to State 2.",
                  "State 2 — COOLDOWN: PIR may still be HIGH but system ignores it. LED blinks slowly. Buzzer OFF. Transition: After cooldownDuration (example 10 seconds) → return to State 0."
                ]
              },
              {
                title: "PIR vs Other Motion Sensors",
                body: [
                  "PIR: Passive, infrared detection, very low power, cannot detect through walls, low cost.",
                  "Ultrasonic: Active, echo time-of-flight, low power, cannot detect through walls, low cost.",
                  "Microwave: Active, Doppler radar, medium power, can detect through walls, medium cost."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Build Circuit on Tinkercad. Open Tinkercad and create a new circuit. Place Arduino Uno, PIR sensor, Red LED (motion alert), Piezo buzzer (alarm), Green LED (idle status indicator), and 220Ω resistors.",
              "Step 2: Wire the PIR Sensor. PIR VCC → Arduino 5V, PIR GND → Arduino GND, PIR OUT → Arduino digital pin D2.",
              "Step 3: Wire LEDs and Buzzer. Red LED anode → 220Ω → Arduino D7. Green LED anode → 220Ω → Arduino D8. Buzzer positive → Arduino D9.",
              "Step 4: Write State Machine Firmware. Defines PIR_PIN=D2, RED_LED=D7, GREEN_LED=D8, BUZZER=D9. Implement three-state state machine with IDLE, MOTION_DETECTED, COOLDOWN states. Include warm-up delay.",
              "Step 5: Simulate Motion Detection. Click Start Simulation. Wait for warm-up countdown. Click the PIR sensor to trigger motion.",
              "Step 6: Test All States. Verify idle state, motion detection state, and cooldown state. Test multiple consecutive detections."
            ],
            posttest: [],
            references: [
              "Monk S., Programming Arduino: Getting Started with Sketches, 2nd Edition, McGraw Hill",
              "HC-SR501 PIR Sensor Datasheet: https://www.mpja.com/download/31227sc.pdf",
              "Arduino digitalRead() Reference: https://www.arduino.cc/reference/en/language/functions/digital-io/digitalread/",
              "Tinkercad PIR Simulation: https://www.tinkercad.com/learn/circuits",
              "Wokwi PIR Simulator: https://wokwi.com",
              "Arduino millis() Reference: https://www.arduino.cc/reference/en/language/functions/time/millis/"
            ]
          }
        }
      ]
    },
    {
      title: "Module 2",
      objective: "Control appliances remotely using IoT. Concepts Covered: Relay control, Wi-Fi communication, mobile app integration. Simulation Tool: Tinkercad Circuits, Wokwi (ESP8266/ESP32).",
      tutorial: "Smart Home Automation",
      labTitle: "Smart Home Automation",
      experiments: [
        { 
          id: "iot-m2-1", 
          title: "Experiment 2.1 — Smart Light Control", 
          desc: "Control an LED or lamp using a relay module connected to an ESP8266/ESP32. Implement Wi-Fi connectivity and expose a simple web server on the microcontroller. Control the light ON/OFF from a browser on the same Wi-Fi network. Simulate the relay circuit on Tinkercad and Wi-Fi web server on Wokwi.", 
          expected: "Relay toggled via web server successfully.",
          content: {
            aim: {
              text: "In this experiment the student will implement a smart light control system using an ESP8266 or ESP32 microcontroller connected to a relay module that switches an LED or lamp ON and OFF. The student will host a simple HTML web server directly on the ESP8266/ESP32, connect it to a Wi-Fi network, and control the light from any browser on the same network by visiting the microcontroller's IP address. The student will simulate the relay circuit on Tinkercad and the Wi-Fi web server on Wokwi.",
              bullets: [
                "Understand the ESP8266/ESP32 as a Wi-Fi enabled microcontroller superior to Arduino Uno for IoT",
                "Connect the ESP8266/ESP32 to a Wi-Fi network using WiFi.h library",
                "Host an HTTP web server on the microcontroller using the ESP8266WebServer or WebServer library",
                "Serve an HTML control page with ON and OFF buttons from the microcontroller",
                "Control a relay module connected to an LED or lamp through GET request handling",
                "Display the current light status and IP address on the Serial Monitor",
                "Simulate relay circuit on Tinkercad and Wi-Fi web server behavior on Wokwi",
                "Understand the concept of the microcontroller as an IoT edge device serving its own web interface"
              ]
            },
            theory: [
              {
                title: "ESP8266 vs ESP32 vs Arduino Uno",
                body: [
                  "The Arduino Uno is an excellent microcontroller for basic electronics and sensor experiments but lacks built-in Wi-Fi or Bluetooth making it unsuitable for direct IoT connectivity. The ESP8266 and ESP32 are Wi-Fi enabled microcontroller modules that run Arduino-compatible firmware making them the standard choice for IoT projects.",
                  "Important: ESP8266 and ESP32 operate at 3.3V logic level. Never connect 5V signals directly to their GPIO pins — use level shifters or voltage dividers."
                ]
              },
              {
                title: "Relay Module",
                body: [
                  "A relay is an electrically operated switch that uses a low-power control signal (3.3V or 5V from microcontroller) to switch a high-power circuit (AC mains 230V or DC loads).",
                  "Relay module components: Coil (energized by the control signal), Armature (mechanical switch pulled by magnetic field), Contacts (COM, NO, NC).",
                  "COM-NO connection: Open when relay is OFF, closed when ON. Used for loads that should be OFF by default.",
                  "COM-NC connection: Closed when relay is OFF, open when ON. Used for fail-safe systems where loads should be ON by default."
                ]
              },
              {
                title: "ESP8266 Wi-Fi Connection",
                body: [
                  "The ESP8266/ESP32 connects to an existing Wi-Fi network using the WiFi library:",
                  "WiFi.begin(ssid, password): Initiates connection to the specified network.",
                  "WiFi.status(): Returns connection status — WL_CONNECTED when successfully connected.",
                  "WiFi.localIP(): Returns the IP address assigned by the router's DHCP server."
                ]
              },
              {
                title: "HTTP Web Server on ESP8266/ESP32",
                body: [
                  "The WebServer library allows the microcontroller to act as an HTTP server.",
                  "server.on(\"/\", handleRoot): Register a handler function for the root URL path.",
                  "server.begin(): Start the server. server.handleClient(): Must be called repeatedly in loop() — processes incoming HTTP requests.",
                  "server.send(200, \"text/html\", html): Send an HTTP 200 OK response with HTML content."
                ]
              },
              {
                title: "Smart Light System Architecture",
                body: [
                  "Browser → HTTP GET /on → Wi-Fi Router → ESP8266 Web Server → GPIO HIGH → Relay → LED/Lamp ON",
                  "This represents a complete local IoT control loop: user interface (browser) → communication layer (HTTP over Wi-Fi) → processing layer (ESP8266) → actuation layer (relay and lamp)."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Open Wokwi and Create ESP32 Project. Select ESP32 as the board.",
              "Step 2: Add Components to Wokwi Circuit. Add an LED (represents light) and Resistor (220Ω). Connect to GPIO pin 26.",
              "Step 3: Write ESP32 Web Server Firmware. Include WiFi.h and WebServer.h. Setup Wi-Fi connection to 'Wokwi-GUEST', define handleRoot, handleOn, and handleOff functions to control GPIO 26.",
              "Step 4: Configure Wokwi Wi-Fi. Use SSID 'Wokwi-GUEST' and empty password.",
              "Step 5: Start Simulation. Wait for IP address assignment in Serial Monitor.",
              "Step 6: Access the Web Server. Use Wokwi's virtual browser to access the IP address.",
              "Step 7: Test Light Control. Click ON and OFF buttons in the browser and observe LED changes.",
              "Step 8: Simulate Relay Circuit on Tinkercad to understand physical relay switching.",
              "Step 9: Record Observations."
            ],
            posttest: [],
            references: [
              "Schwartz M., Internet of Things with ESP8266, Packt Publishing, 2016",
              "Kolban N., Kolban's Book on ESP32, Free PDF, 2018",
              "ESP8266 Arduino Core Documentation: https://arduino-esp8266.readthedocs.io",
              "ESP32 Arduino Core Documentation: https://docs.espressif.com/projects/arduino-esp32",
              "Wokwi ESP32 Wi-Fi Simulation: https://docs.wokwi.com/guides/esp32-wifi"
            ]
          }
        },
        { 
          id: "iot-m2-2", 
          title: "Experiment 2.2 — Fan Automation", 
          desc: "Monitor temperature using a DHT sensor connected to ESP8266/ESP32. Automatically activate a DC fan (represented by a relay) when temperature exceeds a set threshold. Implement manual override via a web interface. Combine sensor reading and relay control in one firmware. Simulate on Wokwi.", 
          expected: "Fan automated correctly.",
          content: {
            aim: {
              text: "In this experiment the student will build an automatic fan control system using an ESP32 microcontroller, a DHT22 temperature sensor, and a relay module. The fan activates automatically when temperature exceeds a defined threshold and deactivates when temperature returns below the threshold. A web interface hosted on the ESP32 displays the current temperature and fan status and allows manual override. The student will simulate the complete system on Wokwi and understand the concept of closed-loop feedback control in IoT systems.",
              bullets: [
                "Combine DHT22 temperature sensing with relay-based fan control in one firmware",
                "Implement closed-loop feedback control — sensor reading drives actuator state automatically",
                "Set configurable ON and OFF thresholds with hysteresis to prevent rapid switching",
                "Build a web dashboard showing real-time temperature, fan status, and manual override controls",
                "Understand hysteresis as the technique of using two different thresholds to prevent relay chatter",
                "Simulate the system on Wokwi with DHT22, LED (representing fan), and relay",
                "Display temperature trend indicating whether temperature is rising or falling"
              ]
            },
            theory: [
              {
                title: "Closed-Loop Feedback Control in IoT",
                body: [
                  "An open-loop system executes actions without measuring the result. A closed-loop system continuously measures the output and adjusts the actuator to maintain the desired state.",
                  "Closed-loop systems are more efficient, responsive, and reliable. Every thermostat, HVAC system, refrigerator, and industrial process controller uses closed-loop feedback. IoT adds remote monitoring and control to closed-loop systems."
                ]
              },
              {
                title: "Hysteresis — Preventing Relay Chatter",
                body: [
                  "If a single threshold of 30°C is used, rapid ON-OFF-ON-OFF cycling called relay chatter or hunting occurs as temperature fluctuates around the threshold. This causes mechanical wear and arcing at contacts.",
                  "Hysteresis solves this by using two thresholds: ON threshold (fan activates when temperature rises above 30°C) and OFF threshold (fan deactivates when temperature falls below 27°C).",
                  "With a 3°C hysteresis band the fan stays ON until temperature clearly drops — no rapid switching."
                ]
              },
              {
                title: "Web Dashboard with Real-Time Status",
                body: [
                  "The ESP32 web dashboard for fan automation includes real-time temperature display, fan status indicator, mode selector (Automatic or Manual), manual override buttons, and temperature trend indicator (arrow showing whether temperature is rising or falling)."
                ]
              },
              {
                title: "Temperature Trend Detection",
                body: [
                  "Store the previous temperature reading:",
                  "If currentTemp > previousTemp + 0.5: trend = RISING (↑)",
                  "If currentTemp < previousTemp - 0.5: trend = FALLING (↓)",
                  "Else: trend = STABLE (→)",
                  "The 0.5°C deadband prevents false trend changes from sensor noise."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Open Wokwi and Create ESP32 Project.",
              "Step 2: Add Components: DHT22 sensor, LED (blue — representing fan), and Resistor (220Ω).",
              "Step 3: Write Firmware combining DHT22 reading, hysteresis logic for controlFan(), and WebServer handlers.",
              "Step 4: Simulate and Test Automatic Mode. Adjust DHT22 slider and observe automatic fan (LED) activation and deactivation based on thresholds.",
              "Step 5: Test Manual Override. Access the web dashboard, switch to manual mode, and force the fan ON/OFF.",
              "Step 6: Observe Hysteresis Behavior. Set temperature between ON and OFF thresholds and verify the fan state remains unchanged (dead band)."
            ],
            posttest: [],
            references: [
              "Schwartz M., Internet of Things with ESP8266, Packt Publishing, 2016",
              "Espressif ESP32 Technical Reference Manual: https://www.espressif.com/en/support/documents/technical-documents",
              "Wokwi DHT22 Simulation: https://docs.wokwi.com/parts/wokwi-dht22",
              "Adafruit DHT Library: https://github.com/adafruit/DHT-sensor-library"
            ]
          }
        },
        { 
          id: "iot-m2-3", 
          title: "Experiment 2.3 — Smart Door Lock", 
          desc: "Implement a keypad-based door lock using a 4x4 matrix keypad and a servo motor as the lock actuator. Accept a PIN code — servo rotates to open on correct PIN and remains locked on incorrect PIN. Add a buzzer alert for incorrect attempts. Simulate on Tinkercad with keypad, servo, and buzzer.", 
          expected: "Door unlocked with correct PIN.",
          content: {
            aim: {
              text: "In this experiment the student will build a PIN-based smart door lock using a 4x4 matrix keypad for PIN entry, a servo motor as the physical lock actuator, an LCD display for user feedback, and a buzzer for audio alerts. Correct PIN entry rotates the servo to the unlocked position. Incorrect PIN triggers a buzzer alert and increments a failed attempt counter. Three consecutive failed attempts trigger a lockout period. The student will simulate the complete system on Tinkercad.",
              bullets: [
                "Interface a 4x4 matrix keypad with Arduino using the Keypad library",
                "Understand matrix keypad scanning — rows and columns and key detection",
                "Control a servo motor using the Servo library to physically represent lock and unlock positions",
                "Display system status messages on a 16x2 LCD using the LiquidCrystal library",
                "Implement a security lockout mechanism after three failed attempts",
                "Use the buzzer for audio feedback differentiating correct and incorrect PIN entry",
                "Simulate the complete circuit on Tinkercad including keypad, servo, LCD, and buzzer",
                "Understand how this system generalizes to RFID, fingerprint, and face recognition based locks"
              ]
            },
            theory: [
              {
                title: "Matrix Keypad Working Principle",
                body: [
                  "A 4x4 matrix keypad has 16 keys arranged in a 4-row by 4-column grid. It uses 8 wires (4 row pins + 4 column pins) instead of 16 individual wires.",
                  "Key detection using row-column scanning: The Arduino drives each row pin LOW one at a time while keeping the rest HIGH. While driving row R LOW the Arduino reads all four column pins. If column C reads LOW the key at position (R, C) is pressed.",
                  "The Keypad library handles all scanning automatically. The student only needs to define the key map and call keypad.getKey()."
                ]
              },
              {
                title: "Servo Motor",
                body: [
                  "A servo motor is a DC motor with a built-in gearbox and position feedback circuit that allows precise angular positioning. Standard hobby servos rotate from 0° to 180°.",
                  "Control signal: PWM pulse on a single wire. 1ms pulse → 0°, 1.5ms pulse → 90° (center), 2ms pulse → 180°.",
                  "Lock/Unlock positions: LOCKED: servo at 0° (bolt extended, door locked). UNLOCKED: servo at 90° (bolt retracted, door unlocked)."
                ]
              },
              {
                title: "Security Lockout Logic",
                body: [
                  "Failed attempt counter increments on each wrong PIN entry. After 3 failed attempts: System enters LOCKOUT state for 30 seconds, all keypad input ignored, LCD displays \"LOCKED OUT\" with countdown, and buzzer sounds continuously.",
                  "This prevents brute-force PIN guessing — 4-digit PIN has 10,000 combinations. At 3 attempts every 30 seconds an attacker would need 27 hours to try all combinations."
                ]
              },
              {
                title: "PIN Entry State Machine",
                body: [
                  "State 0 — IDLE (LOCKED): Display \"Enter PIN:\". Accept keypad input.",
                  "State 1 — PIN COMPLETE: Compare enteredPIN with correctPIN. If match → UNLOCKED. If no match → increment failCount, WRONG PIN.",
                  "State 2 — UNLOCKED: Servo rotates to 90°. Display \"DOOR UNLOCKED\". After 5 seconds automatically re-lock.",
                  "State 3 — WRONG PIN: Display \"WRONG PIN! X/3\". Buzzer short beep. Clear enteredPIN. If failCount >= 3 → LOCKOUT.",
                  "State 4 — LOCKOUT: Display \"LOCKED OUT 30s\". All input ignored. Countdown. After 30 seconds reset and return to IDLE."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Build Tinkercad Circuit with Arduino Uno, 4x4 Matrix Keypad, Micro servo motor, 16x2 LCD display, Piezo buzzer.",
              "Step 2: Wire Keypad to Arduino (Row pins to D9-D6, Column pins to D5-D2).",
              "Step 3: Wire Servo Motor to D11.",
              "Step 4: Wire LCD Display.",
              "Step 5: Wire Buzzer to D10.",
              "Step 6: Write State Machine Firmware including Keypad.h, Servo.h, LiquidCrystal.h.",
              "Step 7: Simulate and Test. Test correct PIN ('1234') and wrong PINs to trigger lockout."
            ],
            posttest: [],
            references: [
              "Monk S., Programming Arduino: Getting Started with Sketches, 2nd Edition, McGraw Hill",
              "Arduino Keypad Library: https://playground.arduino.cc/Code/Keypad/",
              "Arduino Servo Library: https://www.arduino.cc/reference/en/libraries/servo/",
              "Arduino LiquidCrystal Library: https://www.arduino.cc/reference/en/libraries/liquidcrystal/",
              "Tinkercad Servo and Keypad Tutorial: https://www.tinkercad.com/learn/circuits"
            ]
          }
        },
        { 
          id: "iot-m2-4", 
          title: "Experiment 2.4 — Home Security Alarm", 
          desc: "Build a multi-sensor security system combining PIR motion detection and an LDR-based night detection. Arm the alarm only during nighttime (LDR detects darkness) and trigger a buzzer alarm when motion is detected. Send an alert notification via Adafruit IO MQTT feed. Simulate on Wokwi.", 
          expected: "Alarm triggered during night time.",
          content: {
            aim: {
              text: "In this experiment the student will build a multi-sensor home security system that combines a PIR motion sensor for intrusion detection and an LDR for nighttime detection on an ESP32 microcontroller. The alarm activates only during nighttime (when LDR detects darkness) and motion is detected simultaneously. When both conditions are met the ESP32 activates a buzzer alarm locally and publishes an alert message to an Adafruit IO MQTT feed for remote notification. The student will simulate the device on Wokwi and configure the Adafruit IO cloud dashboard.",
              bullets: [
                "Combine PIR and LDR sensor data in a logical AND condition for smart alarm triggering",
                "Understand why combining multiple sensor inputs reduces false alarm rates",
                "Connect ESP32 to Adafruit IO using the MQTT protocol for cloud-based alert publishing",
                "Configure an Adafruit IO feed and dashboard to receive and display security alerts",
                "Implement an alarm state machine with DISARMED, ARMED, TRIGGERED, and ALERT SENT states",
                "Simulate the multi-sensor circuit on Wokwi with both PIR and LDR components",
                "Understand the complete IoT alert pipeline from physical detection to cloud notification"
              ]
            },
            theory: [
              {
                title: "Multi-Sensor Fusion for Reduced False Alarms",
                body: [
                  "Single-sensor security systems suffer from high false alarm rates. PIR triggers on pets or sunlight. LDR triggers on any light change like headlights.",
                  "Multi-sensor fusion combines inputs: Alarm = PIR_triggered AND LDR_dark (nighttime detected). This logical AND condition dramatically reduces false positives."
                ]
              },
              {
                title: "IoT Alert Architecture",
                body: [
                  "Physical Detection Layer: PIR detects motion + LDR detects darkness.",
                  "Local Response Layer: Buzzer alarm activated immediately.",
                  "Cloud Alert Layer: ESP32 publishes MQTT message to Adafruit IO feed.",
                  "Notification Layer: Adafruit IO dashboard shows alert. IFTTT or Adafruit IO Actions send notification."
                ]
              },
              {
                title: "MQTT and Adafruit IO",
                body: [
                  "MQTT is a lightweight publish-subscribe messaging protocol. Broker: Central server (Adafruit IO). Publisher: ESP32. Subscriber: Adafruit IO dashboard.",
                  "Publishing an alert: client.publish('username/feeds/security-alert', 'MOTION DETECTED - INTRUDER ALERT')"
                ]
              },
              {
                title: "Alarm State Machine",
                body: [
                  "State 0 — DISARMED: System inactive.",
                  "State 1 — ARMED: LDR detects darkness. System actively monitors PIR.",
                  "State 2 — TRIGGERED: Both PIR HIGH and LDR dark confirmed. Buzzer activates.",
                  "State 3 — ALERT SENT: MQTT alert published to Adafruit IO. Buzzer continues for 30 seconds."
                ]
              },
              {
                title: "Night Detection using LDR",
                body: [
                  "isDark = (analogRead(LDR_PIN) < DARK_THRESHOLD). At dusk, isDark = true and the system arms automatically."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Create Adafruit IO Account and Feed named 'security-alert'.",
              "Step 2: Create Adafruit IO Dashboard with a Text block widget connected to the feed.",
              "Step 3: Open Wokwi and Create ESP32 Project with PIR sensor, LDR, red LED, and piezo buzzer.",
              "Step 4: Wire Components.",
              "Step 5: Write Firmware incorporating WiFi, Adafruit MQTT, and the four-state alarm machine logic.",
              "Step 6: Simulate the circuit and verify the logic requires both PIR motion and LDR darkness to trigger.",
              "Step 7: Verify Adafruit IO Alert appears on the dashboard.",
              "Step 8: Test Day Mode to ensure daytime motion does not trigger the alarm."
            ],
            posttest: [],
            references: [
              "Schwartz M., Internet of Things with ESP8266, Packt Publishing, 2016",
              "Adafruit IO Documentation: https://io.adafruit.com/api/docs/mqtt.html",
              "Adafruit MQTT Library: https://github.com/adafruit/Adafruit_MQTT_Library",
              "HC-SR501 PIR Sensor Datasheet: https://www.mpja.com/download/31227sc.pdf",
              "IFTTT Adafruit IO Integration: https://ifttt.com/adafruit"
            ]
          }
        }
      ]
    },
    {
      title: "Module 3",
      objective: "Understand how IoT devices communicate. Concepts Covered: MQTT, HTTP/HTTPS, WebSocket, client-server architecture. Simulation Tool: Wokwi Online Simulator, Node-RED, HiveMQ Public Broker.",
      tutorial: "IoT Communication Protocols",
      labTitle: "IoT Communication Protocols",
      experiments: [
        { 
          id: "iot-m3-1", 
          title: "Experiment 3.1 — MQTT Publish/Subscribe", 
          desc: "Connect an ESP8266/ESP32 to a public MQTT broker (broker.hivemq.com or test.mosquitto.org). Publish DHT sensor data (temperature and humidity) to a topic every 5 seconds. Subscribe to a control topic and act on received commands (turn LED on/off). Visualize published data in Node-RED dashboard. Simulate device on Wokwi.", 
          expected: "MQTT communication successful.",
          content: {
            aim: {
              text: "In this experiment the student will implement MQTT (Message Queuing Telemetry Transport) publish/subscribe communication between an Arduino Uno (publisher) and a Node-RED broker dashboard (subscriber), transmit sensor data over a local MQTT broker, observe topic-based message routing, and simulate the complete communication flow using Wokwi and a local Mosquitto broker. The student will understand how MQTT's lightweight publish/subscribe model enables scalable IoT messaging, why MQTT is preferred over HTTP for constrained devices, and how MQTT is used in real industrial monitoring, smart home, and telemetry systems.",
              bullets: [
                "Understand the MQTT protocol architecture — broker, publisher, and subscriber roles",
                "Publish sensor readings from Arduino to a topic using the PubSubClient library",
                "Subscribe to a command topic and receive actuation messages from Node-RED",
                "Implement QoS levels 0, 1, and 2 and understand their delivery guarantees",
                "Observe MQTT message flow using MQTT Explorer or Node-RED debug panel",
                "Understand retained messages, Last Will and Testament (LWT), and keep-alive mechanisms",
                "Simulate the complete MQTT publish/subscribe flow using Wokwi and a local broker"
              ]
            },
            theory: [
              {
                title: "What is MQTT?",
                body: [
                  "MQTT (Message Queuing Telemetry Transport) is a lightweight, publish/subscribe network protocol designed for constrained devices and low-bandwidth, high-latency, or unreliable networks.",
                  "MQTT operates on TCP/IP and uses a central broker to route messages between publishers and subscribers. Unlike HTTP's request-response model where a client must poll a server for new data, MQTT's publish/subscribe model allows devices to push data instantly as it changes and receive commands without polling — making it far more efficient for IoT applications."
                ]
              },
              {
                title: "MQTT Architecture — Broker, Publisher, Subscriber",
                body: [
                  "Broker: The central server (e.g., Mosquitto, HiveMQ, AWS IoT Core) that receives all messages from publishers and routes them to matching subscribers. The broker manages topic subscriptions, QoS delivery, retained messages, and client sessions. The broker never stores business logic — it only routes.",
                  "Publisher: A client (e.g., Arduino with a temperature sensor) that sends messages to the broker on a specific topic. The publisher has no knowledge of how many subscribers exist or whether any are listening — it simply publishes and the broker handles delivery.",
                  "Subscriber: A client (e.g., Node-RED dashboard, smartphone app) that registers interest in one or more topics with the broker. When a message arrives on a subscribed topic the broker pushes it to the subscriber immediately."
                ]
              },
              {
                title: "MQTT Topics",
                body: [
                  "Topics are UTF-8 strings that act as routing addresses for messages. Topics are hierarchical using the forward slash / as a separator: home/livingroom/temperature.",
                  "Wildcards allow subscribers to match multiple topics with a single subscription: Single-level wildcard (+) matches exactly one level. Multi-level wildcard (#) matches all remaining levels."
                ]
              },
              {
                title: "MQTT Quality of Service (QoS) Levels",
                body: [
                  "MQTT defines three QoS levels for message delivery guarantees:",
                  "QoS 0 (At most once): No guarantee — fire and forget. Non-critical sensor readings.",
                  "QoS 1 (At least once): Delivered at least once (duplicates possible). Alerts, commands.",
                  "QoS 2 (Exactly once): Guaranteed exactly once delivery. Financial transactions, critical actuation."
                ]
              },
              {
                title: "MQTT Special Features",
                body: [
                  "Retained Messages: When a publisher sends a message with the retained flag set to true, the broker stores the last message on that topic. New subscribers immediately receive the retained message upon subscribing.",
                  "Last Will and Testament (LWT): When a client connects to the broker it can register a 'will' message — a topic and payload that the broker will automatically publish if the client disconnects ungracefully (network failure, power cut).",
                  "Keep-Alive: MQTT clients send periodic PINGREQ packets to the broker to confirm the connection is alive even when no data is being published."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Set Up Mosquitto MQTT Broker. Install Mosquitto and run on port 1883.",
              "Step 2: Set Up Node-RED Dashboard (Subscriber). Create a flow with MQTT-in node connected to dashboard elements.",
              "Step 3: Simulate Arduino Publisher on Wokwi. Connect DHT22 and add PubSubClient library.",
              "Step 4: Write Publisher Firmware. Connect to WiFi, connect to MQTT broker, publish sensor data to 'iot/sensor/data', subscribe to 'iot/device/command'.",
              "Step 5: Subscribe and Observe Messages. Watch JSON messages arrive on topics.",
              "Step 6: Test Command Flow (Subscriber → Publisher). Publish messages like 'LED_ON' from Node-RED to command the Arduino."
            ],
            posttest: [],
            references: [
              "Banks A. and Gupta R., MQTT Version 3.1.1 OASIS Standard, OASIS, 2014",
              "Eclipse Mosquitto Broker Documentation: https://mosquitto.org/documentation/",
              "PubSubClient Arduino Library: https://pubsubclient.knolleary.net/",
              "Node-RED MQTT Documentation: https://nodered.org/docs/user-guide/nodes#mqtt",
              "HiveMQ MQTT Essentials Guide: https://www.hivemq.com/mqtt-essentials/"
            ]
          }
        },
        { 
          id: "iot-m3-2", 
          title: "Experiment 3.2 — HTTP-Based Data Transfer", 
          desc: "Implement HTTP GET and POST requests from an ESP8266/ESP32 to a remote server. Send sensor data as JSON payload via HTTP POST to a free REST API endpoint (webhook.site or similar). Parse HTTP response and act on server commands. Understand request-response cycle and status codes. Simulate on Wokwi.", 
          expected: "HTTP transfer successful.",
          content: {
            aim: {
              text: "In this experiment the student will implement HTTP GET and POST requests from an Arduino ESP8266 to a local REST API server, transmit sensor data as JSON over HTTP, retrieve configuration data using GET requests, understand RESTful API design for IoT endpoints, and simulate the complete HTTP communication flow using Wokwi and a Node.js Express server. The student will understand how HTTP request/response communication works for IoT data upload, why HTTP is appropriate for non-real-time IoT data logging, and how REST APIs are used in cloud IoT platforms such as ThingSpeak, Adafruit IO, and custom backends.",
              bullets: [
                "Understand HTTP methods — GET, POST, PUT, DELETE — and their IoT use cases",
                "Send sensor data as a JSON POST body to a REST API endpoint",
                "Parse JSON responses from GET requests using the ArduinoJson library",
                "Handle HTTP status codes (200 OK, 400 Bad Request, 500 Server Error) in firmware",
                "Implement periodic data upload with configurable interval",
                "Understand the difference between HTTP polling and MQTT push for IoT",
                "Simulate HTTP client firmware on Wokwi and test with a local Express server"
              ]
            },
            theory: [
              {
                title: "What is HTTP?",
                body: [
                  "HTTP (Hypertext Transfer Protocol) is the foundational communication protocol of the World Wide Web. It follows a request/response model where a client sends a request to a server and waits for a response. HTTP operates over TCP/IP and is stateless.",
                  "For IoT applications HTTP is widely used for data upload to cloud platforms, firmware OTA (Over-The-Air) updates, and configuration retrieval. While not as efficient as MQTT for real-time streaming, HTTP's universal support, simple debugging with tools like Postman and curl, and compatibility with existing web infrastructure make it the preferred choice for periodic data logging and REST API integrations."
                ]
              },
              {
                title: "HTTP Methods and IoT Use Cases",
                body: [
                  "GET: Retrieve data from server (Fetch device configuration, download firmware version info).",
                  "POST: Send new data to server (Upload sensor readings, register a new device).",
                  "PUT: Update existing data (Update device settings or calibration values).",
                  "DELETE: Remove data (Deregister a device, delete old sensor records).",
                  "PATCH: Partial update (Update only one field of a device record)."
                ]
              },
              {
                title: "RESTful API Design for IoT",
                body: [
                  "REST (Representational State Transfer) is an architectural style for designing HTTP APIs. A RESTful IoT API follows these principles:",
                  "Resource-based URLs: Each IoT entity is a resource with a unique URL.",
                  "Stateless: Every request contains all information needed. JSON payloads for interoperability.",
                  "HTTP status codes communicate the outcome: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error."
                ]
              },
              {
                title: "HTTP Data Upload Flow for IoT",
                body: [
                  "Periodic Data Upload Pattern: Read sensor, Build JSON payload, Open HTTP connection to server endpoint, Send POST request with JSON body and Content-Type: application/json header, Read HTTP response code, Parse response body, Close HTTP connection, Wait for upload interval.",
                  "Configuration Fetch Pattern: On startup send GET to /api/devices/{id}/config, Parse JSON response for upload_interval, alert_threshold, enabled flags. Apply configuration to firmware constants. Periodically re-fetch config."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Set Up Local Express REST API Server on Node.js handling POST /api/data and GET /api/config.",
              "Step 2: Set Up Wokwi Simulation. Add ESP8266 and DHT22.",
              "Step 3: Write Configuration Fetch Firmware. Connect to WiFi, send GET to API, parse JSON to extract settings like upload interval.",
              "Step 4: Write Sensor Upload Firmware. Build JSON payload of temperature data and POST it to the API.",
              "Step 5: Test Complete Data Flow. Verify data arrives at the server console.",
              "Step 6: Test Error Handling. Stop the server and verify the ESP8266 gracefully handles connection failure without crashing."
            ],
            posttest: [],
            references: [
              "Fielding R., Architectural Styles and the Design of Network-based Software Architectures (REST), UC Irvine, 2000",
              "ESP8266HTTPClient Library: https://arduino-esp8266.readthedocs.io/en/latest/esp8266httpclient.html",
              "ArduinoJson Library Documentation: https://arduinojson.org/",
              "MDN HTTP Status Codes Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
            ]
          }
        },
        { 
          id: "iot-m3-3", 
          title: "Experiment 3.3 — WebSocket Communication", 
          desc: "Implement a WebSocket server on ESP8266/ESP32. Connect from a browser-based WebSocket client. Send real-time sensor data from device to browser without polling. Implement bidirectional control — browser sends commands, device responds with sensor readings. Simulate on Wokwi.", 
          expected: "WebSocket connection established.",
          content: {
            aim: {
              text: "In this experiment the student will implement a WebSocket server on an ESP8266 microcontroller and a WebSocket client on a browser dashboard, establish a persistent full-duplex communication channel, transmit live sensor data from ESP8266 to browser in real time, send LED control commands from the browser dashboard back to the ESP8266, and simulate the complete WebSocket flow using Wokwi. The student will understand how WebSocket upgrades an HTTP connection into a persistent bidirectional channel, why WebSocket is superior to HTTP polling for live dashboards, and how WebSocket is used in real-time IoT monitoring, robotics telemetry, and live control panels.",
              bullets: [
                "Understand the WebSocket handshake and upgrade mechanism from HTTP",
                "Implement a WebSocket server on ESP8266 using the arduinoWebSockets library",
                "Broadcast JSON sensor data to all connected browser clients every second",
                "Receive text commands from the browser and actuate hardware accordingly",
                "Build a browser-based HTML/JavaScript WebSocket client dashboard",
                "Compare WebSocket, HTTP polling, and MQTT for real-time IoT use cases",
                "Simulate the full WebSocket communication on Wokwi"
              ]
            },
            theory: [
              {
                title: "What is WebSocket?",
                body: [
                  "WebSocket is a communication protocol that provides a persistent, full-duplex (bidirectional) communication channel over a single TCP connection.",
                  "WebSocket solves the fundamental limitation of HTTP for real-time applications: in HTTP, the server cannot push data to the client. WebSocket eliminates this by upgrading the initial HTTP connection into a persistent socket where both the client and server can send data at any time without waiting for a request."
                ]
              },
              {
                title: "WebSocket Handshake — HTTP Upgrade",
                body: [
                  "WebSocket begins with an HTTP handshake to establish the connection. The client sends an HTTP GET request with special Upgrade headers: 'Upgrade: websocket'.",
                  "The server responds with '101 Switching Protocols'. After this handshake the TCP connection remains open and both parties communicate using the WebSocket frame format."
                ]
              },
              {
                title: "WebSocket vs HTTP Polling vs MQTT",
                body: [
                  "WebSocket: Full-duplex, persistent connection, server push enabled, very low overhead per message.",
                  "HTTP Polling: Half-duplex, new connection per request, no server push, high overhead per message.",
                  "MQTT: Both directions via broker, persistent TCP to broker, server push enabled via broker, low overhead per message."
                ]
              },
              {
                title: "State Machine for WebSocket IoT Dashboard",
                body: [
                  "State 0 — WAITING FOR CLIENT: ESP8266 WebSocket server running. No browser connected.",
                  "State 1 — STREAMING: Browser connected. ESP8266 broadcasts JSON sensor data every 1 second.",
                  "State 2 — COMMAND EXECUTION: Command received from browser. Execute actuation (LED/buzzer). Send acknowledgment back to browser."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Set Up ESP8266 WebSocket Server on Wokwi.",
              "Step 2: Write ESP8266 Firmware to start HTTP Server on port 80 and WebSocket Server on port 81. Use webSocket.broadcastTXT() to send data to all clients.",
              "Step 3: Build Browser Dashboard HTML/JS establishing a WebSocket connection to the ESP8266.",
              "Step 4: Connect and Test. Open the browser to the ESP8266's IP. Observe real-time updates without polling.",
              "Step 5: Test Multi-Client Broadcasting by opening multiple browser tabs simultaneously.",
              "Step 6: Test Disconnection Handling by closing and reopening tabs."
            ],
            posttest: [],
            references: [
              "Fette I. and Melnikov A., The WebSocket Protocol RFC 6455, IETF, 2011: https://www.rfc-editor.org/rfc/rfc6455",
              "arduinoWebSockets Library by Links2004: https://github.com/Links2004/arduinoWebSockets",
              "MDN WebSocket API Reference: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket"
            ]
          }
        },
        { 
          id: "iot-m3-4", 
          title: "Experiment 3.4 — Device-to-Device Messaging", 
          desc: "Implement ESP-NOW peer-to-peer communication between two ESP32 devices. One device acts as a sensor node (transmitter) sending temperature readings. Second device acts as a display node (receiver) showing received data on an OLED display. No Wi-Fi router required. Simulate on Wokwi with two ESP32 instances.", 
          expected: "ESP-NOW messaging successful.",
          content: {
            aim: {
              text: "In this experiment the student will implement direct device-to-device communication between two ESP8266 microcontrollers using the ESP-NOW protocol, transmit sensor data from a sender device to a receiver device without any router or broker, implement bidirectional acknowledgment messaging, and simulate the multi-device communication flow using two Wokwi projects. The student will understand how ESP-NOW enables ultra-low latency peer-to-peer communication, why device-to-device messaging is used in mesh sensor networks and robotics, and how ESP-NOW compares to WiFi MQTT and Bluetooth for IoT device communication.",
              bullets: [
                "Understand ESP-NOW peer-to-peer protocol architecture and MAC address-based addressing",
                "Configure ESP8266 as ESP-NOW sender and receiver roles",
                "Transmit structured sensor data packets between devices without a router",
                "Implement delivery callbacks to confirm message receipt",
                "Build a multi-node data aggregation pattern — multiple senders, one receiver gateway",
                "Compare ESP-NOW, Bluetooth, Zigbee, and LoRa for device-to-device IoT",
                "Simulate dual-device ESP-NOW messaging using Wokwi"
              ]
            },
            theory: [
              {
                title: "What is Device-to-Device Communication?",
                body: [
                  "Device-to-device (D2D) communication refers to direct communication between IoT nodes without routing through a central server, broker, or internet gateway.",
                  "D2D communication is essential in scenarios where a central server is unavailable, ultra-low latency is required, devices must form self-healing mesh networks, or power consumption must be minimized."
                ]
              },
              {
                title: "ESP-NOW Protocol",
                body: [
                  "ESP-NOW is a connectionless wireless communication protocol developed by Espressif for ESP8266 and ESP32 microcontrollers. It operates at the WiFi layer (2.4GHz) but without requiring a WiFi router or access point.",
                  "Key characteristics: Range up to 200 meters line-of-sight, maximum 250 bytes per packet, under 1 millisecond latency, AES-128 encryption (optional), compatible with deep sleep."
                ]
              },
              {
                title: "ESP-NOW Architecture and MAC Addressing",
                body: [
                  "ESP-NOW uses MAC (Media Access Control) addresses to identify devices. Setup flow: Initialize ESP-NOW with esp_now_init(), Register peer device by MAC address, Register send callback, Register receive callback, Send data."
                ]
              },
              {
                title: "ESP-NOW Data Structures",
                body: [
                  "ESP-NOW transmits raw byte arrays. Structured data is sent using C structs cast to byte arrays, which must match on both the sender and receiver side."
                ]
              },
              {
                title: "Multi-Node Gateway Pattern",
                body: [
                  "A common ESP-NOW topology has multiple sensor nodes (senders) transmitting to one gateway node (receiver) which aggregates data and uploads to a cloud server via WiFi."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Find Receiver MAC Address. Upload a sketch to the first device that prints its MAC address.",
              "Step 2: Configure Sender Wokwi Project. Add DHT22 and set the receiver's MAC address in the code.",
              "Step 3: Write Sender Firmware. Initialize ESP-NOW, add peer, register send callback, and send DHT22 data periodically.",
              "Step 4: Write Receiver Firmware. Initialize ESP-NOW, register receive callback, and parse incoming struct.",
              "Step 5: Simulate Both Devices simultaneously in two browser tabs.",
              "Step 6: Test Bidirectional Communication by sending an ACK back to the sender."
            ],
            posttest: [],
            references: [
              "Espressif ESP-NOW Documentation: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/network/esp_now.html",
              "Random Nerd Tutorials ESP-NOW Guide: https://randomnerdtutorials.com/esp-now-esp8266-nodemcu-arduino-ide/",
              "ESP8266 espnow.h Library Reference: https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html",
              "Zigbee vs LoRa vs ESP-NOW Comparison: https://www.espressif.com/en/solutions/device-connectivity/esp-now"
            ]
          }
        }
      ]
    },
    {
      title: "Module 4",
      objective: "Send sensor data to cloud platforms and visualize it. Concepts Covered: Cloud IoT platforms, data analytics, real-time visualization. Simulation Tool: Wokwi (for device firmware), ThingSpeak and Adafruit IO (for cloud).",
      tutorial: "Cloud-Based IoT Monitoring",
      labTitle: "Cloud-Based IoT Monitoring",
      experiments: [
        { 
          id: "iot-m4-1", 
          title: "Experiment 4.1 — Real-Time Dashboard Creation", 
          desc: "Connect an ESP8266/ESP32 to ThingSpeak cloud platform. Send temperature and humidity data from DHT22 sensor every 15 seconds. Create a ThingSpeak channel with two fields. Build a real-time line chart dashboard on ThingSpeak showing live sensor readings. Simulate device on Wokwi, cloud on ThingSpeak.", 
          expected: "ThingSpeak dashboard updated.",
          content: {
            aim: {
              text: "In this experiment the student will connect an ESP8266 microcontroller to a cloud IoT platform, publish live sensor readings via MQTT, and visualize the data stream in a real-time dashboard. The student will understand how IoT data flows from physical sensors through message brokers to web-based dashboards, and gain practical experience designing responsive gauge, chart, and indicator widgets.",
              bullets: [
                "Understand the IoT data pipeline: sensor → MQTT publish → broker → dashboard subscribe",
                "Configure Node-RED dashboard with gauge, chart, and LED indicator widgets",
                "Connect ESP8266 to a public MQTT broker (broker.hivemq.com) over WiFi",
                "Publish DHT22 temperature and humidity readings as JSON payloads",
                "Display live data with auto-refresh on a Node-RED UI dashboard",
                "Understand dashboard design principles: widget selection, color coding, refresh rates"
              ]
            },
            theory: [
              {
                title: "What is a Real-Time IoT Dashboard?",
                body: [
                  "A real-time dashboard is a web-based visualization interface that continuously displays live data from IoT devices. Unlike static reports, dashboards subscribe to live data streams and update widgets — gauges, charts, maps, indicators — as new readings arrive. Dashboards are the human-facing layer of any IoT system, translating raw sensor values into actionable visual insights.",
                  "Key dashboard design principles: Immediacy (widgets must update within seconds of sensor transmission), Clarity (each widget type matches the data type), Context (ranges, thresholds, and color bands communicate normal vs alert conditions)."
                ]
              },
              {
                title: "Node-RED and the Dashboard Module",
                body: [
                  "Node-RED is a flow-based programming tool built on Node.js that connects hardware devices, APIs, and online services. The node-red-dashboard module adds UI widgets that auto-generate a web interface accessible at http://localhost:1880/ui.",
                  "Key Node-RED concepts: Flow (a visual wiring diagram), msg.payload (the data object passed between nodes), Function node (custom JavaScript transformation), Dashboard group (logical container for widgets)."
                ]
              },
              {
                title: "MQTT Publish-Subscribe for Dashboard Feeds",
                body: [
                  "The dashboard subscribes to MQTT topics that the ESP8266 publishes to. Each incoming message triggers widget updates. The ESP8266 publishes JSON payloads containing multiple sensor fields per packet, which the Node-RED function node parses and routes to individual widgets."
                ]
              },
              {
                title: "Dashboard Widget Types",
                body: [
                  "Gauge: Float (0-100%) for current temperature, pressure, CO2.",
                  "Line Chart: Time-series float for temperature trend over time.",
                  "LED Indicator: Boolean for device online/offline, alert active.",
                  "Text Display: String/Number for raw value with unit label."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Install Node-RED and node-red-dashboard.",
              "Step 2: Configure MQTT Broker Node using broker.hivemq.com.",
              "Step 3: Add JSON Parse Node to convert incoming string payload to a JavaScript object.",
              "Step 4: Build Dashboard Widgets (Gauge, Chart, LED, Text) and wire function nodes.",
              "Step 5: Write and Upload ESP8266 Firmware to read DHT22 and publish to the topic as JSON. Observe dashboard."
            ],
            posttest: [],
            references: [
              "Node-RED Documentation: https://nodered.org/docs/",
              "HiveMQ Public Broker: https://www.hivemq.com/public-mqtt-broker/"
            ]
          }
        },
        { 
          id: "iot-m4-2", 
          title: "Experiment 4.2 — Data Logging", 
          desc: "Implement continuous sensor data logging to ThingSpeak or Google Sheets via IFTTT. Store timestamped temperature, humidity, and LDR readings. Download historical data as CSV. Perform basic statistics (min, max, average) using ThingSpeak MATLAB analysis. Simulate device on Wokwi.", 
          expected: "Data logged successfully.",
          content: {
            aim: {
              text: "In this experiment the student will implement persistent time-series data logging for IoT sensor streams. Sensor data published via MQTT will be ingested by Telegraf, stored in InfluxDB, and queried to produce historical trend analysis. The student will understand why time-series databases are preferred over relational databases for IoT workloads and how to design an efficient data retention policy.",
              bullets: [
                "Understand time-series data characteristics and why IoT logging differs from transactional databases",
                "Configure Telegraf MQTT consumer plugin to subscribe to sensor topics",
                "Write incoming sensor data to InfluxDB measurements (tables)",
                "Query historical data using Flux query language",
                "Configure data retention policies to automatically expire old sensor data",
                "Visualize logged data with Grafana connected to InfluxDB as a data source",
                "Compare InfluxDB, TimescaleDB, and flat-file CSV logging for IoT use cases"
              ]
            },
            theory: [
              {
                title: "Time-Series Data and IoT Logging",
                body: [
                  "IoT sensors generate time-series data — sequences of measurements indexed by timestamp. Unlike transactional data, sensor data is write-heavy, rarely updated, queried by time order, high cardinality, and retention-bounded."
                ]
              },
              {
                title: "InfluxDB Architecture",
                body: [
                  "InfluxDB is an open-source time-series database optimized for high-throughput sensor data ingestion. Key concepts: Measurement (table), Field (numeric sensor value), Tag (metadata string label), Timestamp, Bucket (data store with retention policy)."
                ]
              },
              {
                title: "Telegraf MQTT Consumer",
                body: [
                  "Telegraf is a plugin-driven server agent for collecting and sending metrics. The MQTT consumer plugin subscribes to MQTT topics and forwards messages to InfluxDB."
                ]
              },
              {
                title: "Flux Query Language",
                body: [
                  "InfluxDB 2.x uses Flux, a functional data scripting language, for queries. Queries can filter by time range, measurement, tags, and perform aggregations like mean()."
                ]
              },
              {
                title: "Data Retention Policies",
                body: [
                  "IoT systems generate enormous data volumes. Retention policies automatically delete data older than a specified duration, keeping storage costs bounded."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Install and Configure InfluxDB. Create an organization, bucket, and API token.",
              "Step 2: Configure Telegraf with MQTT consumer input and InfluxDB v2 output.",
              "Step 3: Flash ESP8266 Firmware to publish JSON payloads.",
              "Step 4: Query Logged Data using Flux query language.",
              "Step 5: Connect Grafana and create a dashboard panel."
            ],
            posttest: [],
            references: [
              "InfluxDB 2.x Documentation: https://docs.influxdata.com/influxdb/v2/",
              "Telegraf MQTT Consumer Plugin: https://docs.influxdata.com/telegraf/v1/plugins/#input-mqtt_consumer",
              "Grafana InfluxDB Integration: https://grafana.com/docs/grafana/latest/datasources/influxdb/",
              "Flux Query Language Reference: https://docs.influxdata.com/flux/v0/"
            ]
          }
        },
        { 
          id: "iot-m4-3", 
          title: "Experiment 4.3 — Remote Monitoring", 
          desc: "Build a complete remote monitoring system using Adafruit IO. Create feeds for temperature, humidity, and motion status. Build an Adafruit IO dashboard with gauges, line charts, and status indicators. Access the dashboard from a mobile browser to monitor sensor readings remotely in real time. Simulate device on Wokwi.", 
          expected: "Remote monitoring dashboard active.",
          content: {
            aim: {
              text: "In this experiment the student will connect an ESP8266 to AWS IoT Core and implement the Device Shadow pattern to enable remote monitoring of device state from anywhere on the internet. The student will understand how Device Shadows decouple physical device availability from application state queries, and implement a bidirectional command channel for remote sensor configuration.",
              bullets: [
                "Understand the AWS IoT Core architecture: Thing Registry, Device Shadow, Rules Engine",
                "Provision an IoT Thing with X.509 certificate-based mutual TLS authentication",
                "Connect ESP8266 to AWS IoT Core using MQTT over TLS (port 8883)",
                "Publish telemetry to device/esp01/telemetry topic",
                "Implement Device Shadow for last-known-state retrieval",
                "Use the Shadow delta mechanism to remotely configure sensor sampling interval",
                "Monitor device connectivity status using IoT Core lifecycle events"
              ]
            },
            theory: [
              {
                title: "Cloud IoT Platform Architecture",
                body: [
                  "Cloud IoT platforms provide managed infrastructure for connecting, authenticating, and managing fleets of IoT devices at scale. AWS IoT Core is a fully managed service that handles millions of simultaneous device connections, routes messages to cloud services, and persists device state."
                ]
              },
              {
                title: "Device Shadow",
                body: [
                  "The Device Shadow is a JSON document stored in the cloud that represents the last-known state of a device. Applications query the shadow to get device state even when the physical device is offline. Sections: reported, desired, delta."
                ]
              },
              {
                title: "X.509 Certificate Authentication",
                body: [
                  "AWS IoT Core uses mutual TLS (mTLS) authentication — both the server and the device present X.509 certificates. Each IoT Thing is provisioned with a unique device certificate and private key."
                ]
              },
              {
                title: "Remote Monitoring vs Local Monitoring",
                body: [
                  "Remote monitoring provides global internet access, X.509 mutual TLS, millions of devices scale, and built-in Device Shadow compared to local monitoring via Node-RED."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Create AWS IoT Thing and generate certificates.",
              "Step 2: Configure ESP8266 Firmware with endpoint, certificate, private key, and Root CA.",
              "Step 3: Implement Telemetry Publishing to publish JSON readings and update shadow reported state.",
              "Step 4: Subscribe to Shadow Delta to parse and apply configuration changes.",
              "Step 5: Test Remote Monitoring using AWS IoT Core MQTT test client and Device Shadow console."
            ],
            posttest: [],
            references: [
              "AWS IoT Core Developer Guide: https://docs.aws.amazon.com/iot/latest/developerguide/",
              "AWS Device Shadow Service: https://docs.aws.amazon.com/iot/latest/developerguide/iot-device-shadows.html",
              "ESP8266 AWS IoT Library: https://github.com/debsahu/ESP-MQTT-AWS-IoT-Core"
            ]
          }
        },
        { 
          id: "iot-m4-4", 
          title: "Experiment 4.4 — Alert Generation", 
          desc: "Configure ThingSpeak ThingAlerts or Adafruit IO triggers to send an email or notification when sensor values cross defined thresholds. Implement temperature alert above 35°C, humidity alert above 80%, and motion detection alert. Test alert delivery end-to-end. Simulate sensor data using Wokwi with tunable values.", 
          expected: "Alert sent on threshold crossing.",
          content: {
            aim: {
              text: "In this experiment the student will implement a complete IoT alert pipeline that detects threshold violations in sensor data and delivers real-time notifications through multiple channels including email, SMS, and dashboard push notifications. The student will understand alert fatigue prevention, hysteresis-based alerting, and the difference between stateless and stateful alerting strategies.",
              bullets: [
                "Design threshold-based and trend-based alert conditions for sensor data",
                "Implement hysteresis to prevent alert flapping at threshold boundaries",
                "Configure AWS Simple Notification Service (SNS) for multi-channel alert delivery",
                "Build a Node-RED alert flow with email (nodemailer), dashboard notification, and MQTT alert topic",
                "Implement alert severity levels: INFO, WARNING, CRITICAL",
                "Build an alert acknowledgment mechanism to prevent repeated notifications",
                "Understand alert fatigue and apply dead-band filtering"
              ]
            },
            theory: [
              {
                title: "IoT Alert Classification",
                body: [
                  "IoT alerts are classified by severity (INFO, WARNING, CRITICAL, EMERGENCY), trigger type, and urgency. A well-designed alert system minimizes false positives (alert fatigue) while ensuring no critical condition is missed."
                ]
              },
              {
                title: "Hysteresis and Alert Flapping Prevention",
                body: [
                  "Alert flapping occurs when a value oscillates around a threshold, generating rapid successive alert and clear events. Hysteresis introduces separate trigger and clear thresholds to create a dead band."
                ]
              },
              {
                title: "AWS SNS Multi-Channel Notifications",
                body: [
                  "AWS Simple Notification Service (SNS) is a pub/sub messaging service that fans out messages to multiple subscriber endpoints simultaneously. SNS message attributes allow routing logic using subscription filter policies."
                ]
              },
              {
                title: "Stateless vs Stateful Alerting",
                body: [
                  "Stateless alerting fires on every reading above threshold. Stateful alerting fires once on transition and clears on recovery. Debounced alerting fires after N consecutive breaches. Trend-based alerting fires on rate-of-change exceeding limit."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Design Alert State Machine with thresholds and hysteresis bands.",
              "Step 2: Configure AWS IoT Core Rule to publish to an SNS topic on threshold breach.",
              "Step 3: Configure SNS Topic and Subscriptions with filter policies.",
              "Step 4: Implement Node-RED Alert Flow with routing by severity.",
              "Step 5: Implement Alert Acknowledgment via dashboard button."
            ],
            posttest: [],
            references: [
              "AWS SNS Developer Guide: https://docs.aws.amazon.com/sns/latest/dg/"
            ]
          }
        }
      ]
    },
    {
      title: "Module 5",
      objective: "Monitor and automate agricultural systems. Concepts Covered: Precision agriculture, automation logic, environmental monitoring. Simulation Tool: Tinkercad, Wokwi, ThingSpeak.",
      tutorial: "Smart Agriculture IoT",
      labTitle: "Smart Agriculture IoT",
      experiments: [
        { 
          id: "iot-m5-1", 
          title: "Experiment 5.1 — Soil Moisture Monitoring", 
          desc: "Interface a capacitive soil moisture sensor with ESP8266/ESP32. Read raw ADC values and convert to percentage moisture level. Display readings on Serial Monitor and an OLED display. Send moisture data to ThingSpeak for remote monitoring. Simulate on Wokwi with potentiometer representing moisture sensor output.", 
          expected: "Soil moisture read successfully.",
          content: {
            aim: {
              text: "In this experiment the student will interface a capacitive soil moisture sensor with an ESP8266 microcontroller, read analog soil moisture levels, calibrate raw ADC values to percentage readings, and display data on Serial Monitor and an OLED display. The student will understand how capacitive sensors differ from resistive sensors, why soil moisture measurement is critical in precision agriculture, and how to threshold moisture levels for irrigation decision logic.",
              bullets: [
                "Understand capacitive vs resistive soil moisture sensing principles",
                "Interface analog soil moisture sensor with ESP8266 ADC pin",
                "Calibrate sensor output to 0-100% moisture scale",
                "Implement threshold-based alert logic",
                "Display real-time moisture data on OLED and Serial Monitor",
                "Transmit moisture readings to MQTT broker for remote monitoring"
              ]
            },
            theory: [
              {
                title: "What is Soil Moisture Monitoring?",
                body: [
                  "Soil moisture monitoring measures the volumetric water content in soil to determine when and how much to irrigate. In precision agriculture, continuous soil moisture data prevents overwatering (which causes root rot and nutrient leaching) and underwatering (which causes crop stress and yield loss). IoT-based monitoring replaces manual inspection with automated, data-driven irrigation decisions."
                ]
              },
              {
                title: "Capacitive Soil Moisture Sensors",
                body: [
                  "Capacitive sensors measure soil moisture by detecting changes in the dielectric permittivity of soil — wet soil has a higher dielectric constant than dry soil, changing the capacitance of the sensor electrodes. Unlike resistive sensors, capacitive sensors do not pass current through the soil, preventing electrode corrosion and extending sensor lifespan significantly.",
                  "Key characteristics: Output is an analog voltage. Dry soil output is high ADC count, Wet soil output is low ADC count. Calibration is required per soil type."
                ]
              },
              {
                title: "ESP8266 ADC and Sensor Interfacing",
                body: [
                  "The ESP8266 has a single 10-bit ADC pin (A0) with a 0–1V input range (NodeMCU boards include a voltage divider for 0–3.3V). Raw ADC values (0–1023) are mapped to moisture percentage using calibration constants."
                ]
              },
              {
                title: "Threshold-Based Irrigation Logic",
                body: [
                  "Moisture thresholds define irrigation trigger points:",
                  "Below 30%: Dry — trigger irrigation",
                  "30–60%: Optimal — no action",
                  "Above 60%: Wet — suspend irrigation"
                ]
              },
              {
                title: "Precision Agriculture and IoT",
                body: [
                  "Precision agriculture uses sensor data to apply the right input (water, fertilizer) at the right place and time. IoT soil moisture sensors enable variable-rate irrigation — applying more water to dry zones and less to wet zones — reducing water usage by 20–50% compared to schedule-based irrigation."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Hardware Setup in Wokwi. Add ESP8266, soil moisture sensor (potentiometer), OLED display, and a red LED.",
              "Step 2: Calibration Constants. Define DRY_VALUE = 750 and WET_VALUE = 300.",
              "Step 3: Write Sensor Reading Firmware. Read A0, map raw value to 0–100% moisture, constrain to valid range, and print to Serial Monitor.",
              "Step 4: Implement Alert Logic. If moisture < 30 turn on red LED and display DRY status. If moisture > 60 turn off LED and display MOIST status.",
              "Step 5: MQTT Transmission. Connect to WiFi and publish moisture percentage to an MQTT topic.",
              "Step 6: Simulate and Observe. Adjust the potentiometer to simulate soil conditions and view results."
            ],
            posttest: [],
            references: [
              "Espressif ESP8266 ADC Documentation: https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/",
              "Capacitive Soil Moisture Sensor Datasheet: https://www.dfrobot.com/product-1385.html",
              "Random Nerd Tutorials ESP8266 Soil Moisture: https://randomnerdtutorials.com/esp8266-soil-moisture-sensor/",
              "PubSubClient MQTT Library: https://pubsubclient.knolleary.net/",
              "FAO Precision Irrigation Guide: https://www.fao.org/land-water/water/irrigation/"
            ]
          }
        },
        { 
          id: "iot-m5-2", 
          title: "Experiment 5.2 — Automatic Irrigation System", 
          desc: "Build an automatic irrigation controller using soil moisture sensor data. When moisture falls below a dry threshold activate a water pump relay. When moisture rises above a wet threshold deactivate the pump. Add a manual override switch and a status display on LCD. Simulate full circuit on Tinkercad and Wokwi.", 
          expected: "Pump automated successfully.",
          content: {
            aim: {
              text: "In this experiment the student will build an automated irrigation controller that reads soil moisture, makes irrigation decisions based on configurable thresholds, controls a water pump via a relay module, implements safety timers to prevent over-irrigation, and reports pump status to an MQTT dashboard. The student will understand relay-based actuator control, safety interlock logic, and closed-loop feedback automation.",
              bullets: [
                "Interface a relay module with ESP8266 for pump control",
                "Implement closed-loop moisture-to-pump feedback logic",
                "Add maximum-run-time safety interlock to prevent flooding",
                "Publish pump state and moisture data to MQTT broker",
                "Simulate pump activation and deactivation cycles in Wokwi",
                "Understand actuator control patterns in agricultural automation"
              ]
            },
            theory: [
              {
                title: "What is Automatic Irrigation?",
                body: [
                  "Automatic irrigation systems replace manual watering schedules with sensor-driven, demand-based water delivery. The system continuously monitors soil moisture and activates a water pump only when moisture drops below a threshold — stopping when the target moisture level is restored. This closed-loop control approach is more efficient than timer-based irrigation which waters regardless of actual soil conditions."
                ]
              },
              {
                title: "Relay Module for Pump Control",
                body: [
                  "A relay is an electrically controlled mechanical switch. The ESP8266 outputs a 3.3V digital signal to a relay module which switches a separate high-voltage (230V AC or 12V DC) circuit powering the irrigation pump. This isolates the low-voltage microcontroller circuit from the high-voltage pump circuit.",
                  "Most relay modules are active-low, meaning a LOW signal turns the relay ON."
                ]
              },
              {
                title: "Closed-Loop Irrigation Logic",
                body: [
                  "The control loop continuously evaluates moisture and pump state:",
                  "If moisture < DRY_THRESHOLD (30%) AND pump is OFF → activate pump, record start time",
                  "If moisture > WET_THRESHOLD (60%) AND pump is ON → deactivate pump",
                  "If pump run time > MAX_RUN_TIME (5 minutes) → force deactivate (safety interlock)"
                ]
              },
              {
                title: "Safety Interlocks",
                body: [
                  "Uncontrolled pump operation can flood fields and damage crops. Safety interlocks include:",
                  "Maximum run time: Force pump OFF after a configurable duration regardless of moisture reading",
                  "Minimum off time: Prevent rapid pump cycling by enforcing a minimum rest period between activations",
                  "Sensor fault detection: If moisture reads < 0% or > 100%, treat as sensor fault and disable pump"
                ]
              },
              {
                title: "Automation Logic in Precision Agriculture",
                body: [
                  "Closed-loop automated systems in agriculture reduce labor costs, optimize water usage, and respond faster than human operators to changing soil conditions. Integration with weather forecast APIs further optimizes irrigation by suppressing activation before predicted rainfall."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Hardware Setup in Wokwi. Add ESP8266, soil moisture sensor, relay module, LED (simulating pump), and OLED.",
              "Step 2: Define Thresholds and Safety Constants (DRY_THRESHOLD, WET_THRESHOLD, MAX_RUN_TIME, MIN_OFF_TIME).",
              "Step 3: Implement Control Loop. Read moisture every 2 seconds, and evaluate logic to turn pump ON or OFF.",
              "Step 4: Implement Safety Interlock. Track pumpStartTime and force deactivate pump if MAX_RUN_TIME is exceeded.",
              "Step 5: MQTT State Publishing. Publish to 'farm/zone1/moisture' and 'farm/zone1/pump'.",
              "Step 6: Simulate Full Irrigation Cycle. Adjust potentiometer to verify pump activates and deactivates correctly."
            ],
            posttest: [],
            references: [
              "Relay Module with ESP8266 Tutorial: https://randomnerdtutorials.com/esp8266-relay-module/",
              "Closed-Loop Control in Embedded Systems: https://www.arduino.cc/en/Tutorial/BuiltInExamples",
              "PubSubClient MQTT Library: https://pubsubclient.knolleary.net/",
              "Espressif ESP8266 GPIO Documentation: https://docs.espressif.com/"
            ]
          }
        },
        { 
          id: "iot-m5-3", 
          title: "Experiment 5.3 — Weather Monitoring Station", 
          desc: "Build a complete weather monitoring station using DHT22 (temperature and humidity), BMP280 (barometric pressure and altitude), and LDR (light intensity). Display all readings on a 16x2 LCD. Send all sensor data to ThingSpeak for historical logging and visualization. Simulate on Wokwi.", 
          expected: "Weather parameters monitored.",
          content: {
            aim: {
              text: "In this experiment the student will build a multi-sensor weather monitoring station that measures ambient temperature, relative humidity, atmospheric pressure, and light intensity, fuses multi-sensor data into an actionable weather assessment, publishes readings to an MQTT broker with structured JSON payloads, and visualizes data on a Node-RED agricultural dashboard. The student will understand multi-sensor data fusion, JSON payload design, and agricultural weather parameter thresholds.",
              bullets: [
                "Interface DHT22 (temperature/humidity), BMP280 (pressure/altitude), and LDR (light) with ESP8266",
                "Implement multi-sensor polling at configurable intervals",
                "Fuse sensor readings into a unified weather status assessment",
                "Publish structured JSON payloads to MQTT",
                "Understand pressure-based weather prediction (falling pressure = incoming storm)",
                "Visualize data on Node-RED dashboard with gauges and charts"
              ]
            },
            theory: [
              {
                title: "What is a Weather Monitoring Station?",
                body: [
                  "An agricultural weather monitoring station measures local microclimatic conditions — temperature, humidity, pressure, wind speed, rainfall, and solar radiation — that directly affect crop growth, pest activity, disease risk, and irrigation needs. Unlike national weather services which report regional averages, farm-level stations capture field-specific conditions that can differ significantly from regional data."
                ]
              },
              {
                title: "Sensor Suite",
                body: [
                  "DHT22: Measures ambient temperature (±0.5°C accuracy) and relative humidity (±2% RH accuracy). Single-wire digital protocol.",
                  "BMP280: Measures barometric pressure (±1 hPa) and can derive altitude from pressure. Communicates via I2C. Pressure readings indicate incoming weather changes.",
                  "LDR (Light Dependent Resistor): Measures ambient light intensity as an analog voltage via a voltage divider on A0."
                ]
              },
              {
                title: "Pressure-Based Weather Prediction",
                body: [
                  "Barometric pressure trends are a reliable short-range weather predictor: Pressure falling > 3 hPa/hour means Rapid deterioration — storm likely within 6 hours. Pressure rising means Clearing and improving conditions."
                ]
              },
              {
                title: "JSON Payload Design for Multi-Sensor Data",
                body: [
                  "Structured JSON payloads enable dashboard visualization and database storage. An ArduinoJson document can combine temperature, humidity, pressure, light, status, and timestamp into a single publishable string."
                ]
              },
              {
                title: "Agricultural Weather Thresholds",
                body: [
                  "Temperature: Safe 15–35°C. Alert < 10°C (frost) or > 38°C (heat stress).",
                  "Humidity: Safe 40–70% RH. Alert > 80% RH (fungal disease risk).",
                  "Pressure: Safe stable ±1 hPa/h. Alert falling > 3 hPa/h (storm incoming).",
                  "Light: Safe 400–800 lux. Alert < 100 lux (prolonged cloud cover)."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Hardware Setup in Wokwi with ESP8266, DHT22 (D4), BMP280 (I2C), LDR (A0 voltage divider), and OLED (I2C).",
              "Step 2: Install Libraries (DHT, Adafruit BMP280, ArduinoJson, PubSubClient).",
              "Step 3: Multi-Sensor Polling in loop() every 5 seconds.",
              "Step 4: Weather Status Assessment based on pressure trend and thresholds.",
              "Step 5: JSON Payload and MQTT Publishing to farm/weather/station01.",
              "Step 6: OLED Display of current readings."
            ],
            posttest: [],
            references: [
              "Adafruit BMP280 Library: https://github.com/adafruit/Adafruit_BMP280_Library",
              "DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library",
              "ArduinoJson Library: https://arduinojson.org/",
              "FAO Crop Weather Monitoring: https://www.fao.org"
            ]
          }
        },
        { 
          id: "iot-m5-4", 
          title: "Experiment 5.4 — Crop Health Alerts", 
          desc: "Combine soil moisture, temperature, and humidity monitoring in one system. Define optimal ranges for each parameter for a specific crop (example: tomatoes require soil moisture 60-80%, temperature 20-30°C, humidity 65-75%). Generate local buzzer alerts and remote Adafruit IO notifications when any parameter goes out of the optimal range. Simulate on Wokwi with ThingSpeak and Adafruit IO integration.", 
          expected: "Crop health alerts generated.",
          content: {
            aim: {
              text: "In this experiment the student will build a crop health monitoring and alert system that continuously evaluates multi-sensor environmental data against crop-specific health thresholds, generates categorized alerts (frost risk, heat stress, disease risk, drought, flood), publishes prioritized alerts to MQTT with severity levels, and simulates alert escalation from warning to critical. The student will understand alert taxonomy, severity escalation logic, and notification delivery architecture in agricultural IoT systems.",
              bullets: [
                "Define crop-specific threshold tables for multiple alert categories",
                "Implement multi-condition alert logic with severity levels (INFO, WARNING, CRITICAL)",
                "Build an alert deduplication mechanism to prevent notification flooding",
                "Publish structured alert payloads to MQTT with severity and recommended action",
                "Implement alert escalation when conditions persist beyond time thresholds",
                "Simulate all alert categories in Wokwi"
              ]
            },
            theory: [
              {
                title: "What are Crop Health Alerts?",
                body: [
                  "Crop health alerts are automated notifications triggered when measured environmental parameters exceed safe thresholds for a specific crop. Unlike simple threshold alarms, a well-designed crop alert system categorizes alert types, assigns severity levels, avoids alert flooding through deduplication, and escalates severity when harmful conditions persist."
                ]
              },
              {
                title: "Alert Categories in Agricultural IoT",
                body: [
                  "FROST_RISK: Temp < 2°C (CRITICAL). HEAT_STRESS: Temp > 38°C for > 2 hours (WARNING → CRITICAL). DROUGHT: Soil moisture < 20% for > 4 hours (WARNING → CRITICAL). FLOOD_RISK: Soil moisture > 90% (WARNING). DISEASE_RISK: Humidity > 80% + Temp 18–25°C (WARNING)."
                ]
              },
              {
                title: "Alert Deduplication",
                body: [
                  "Without deduplication, a sensor reading every 5 seconds would publish hundreds of identical alerts per hour. Alert deduplication tracks: Last alert type sent, Timestamp of last alert, Whether the condition was cleared between alerts. Alerts are re-sent only when: the condition category changes; severity escalates; or a minimum re-notification interval has elapsed."
                ]
              },
              {
                title: "Severity Escalation",
                body: [
                  "Conditions that persist beyond initial warning thresholds escalate to higher severity. For example, heat stress after 2 hours becomes CRITICAL, updating the severity level and message in the payload."
                ]
              },
              {
                title: "Notification Delivery Architecture",
                body: [
                  "MQTT alerts are consumed by multiple downstream systems: Node-RED dashboard panels, Telegram/WhatsApp Push notifications, Email gateways for reports, Actuator controllers for automated responses."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Step 1: Define Alert Threshold Table with constants for FROST_RISK, HEAT_STRESS, DROUGHT, FLOOD_RISK, DISEASE_RISK.",
              "Step 2: Implement Alert State Tracking struct tracking alertType, severity, startTime, lastPublishedTime.",
              "Step 3: Deduplication Logic to skip publishing unless 30 minutes elapsed or severity escalated.",
              "Step 4: Severity Escalation logic for prolonged conditions.",
              "Step 5: MQTT Alert Publishing to farm/zone1/alerts with JSON payloads.",
              "Step 6: Simulate All Alert Categories with potentiometers in Wokwi."
            ],
            posttest: [],
            references: [
              "Node-RED Dashboard: https://flows.nodered.org/node/node-red-dashboard",
              "PubSubClient MQTT Library: https://pubsubclient.knolleary.net/",
              "JNTUGV IoT Lab Syllabus, Module 5"
            ]
          }
        }
      ]
    }
  ]
};
