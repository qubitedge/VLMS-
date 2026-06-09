import type { Course } from "./course-data";

export const iotCourse: Course = {
  id: "iot",
  title: "IoT Virtual Lab — JNTUGV Virtual Labs",
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
    "This Virtual IoT Lab is developed for B.Tech students at Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) as a browser-based, hands-on learning environment that requires no physical hardware, no microcontroller boards, and no electronic components to get started. Using industry-standard simulation tools including Tinkercad Circuits, Wokwi Online Simulator, and Node-RED, students can design circuits, write firmware, test sensor behavior, and visualize real-time data — all within a browser window.",
    "The lab covers 5 comprehensive modules spanning the complete IoT development lifecycle — from sensor interfacing and microcontroller programming to Wi-Fi communication, cloud-based monitoring, and smart agriculture automation. Each experiment includes a clear objective, theoretical background, circuit schematic, simulation setup, step-by-step procedure, and a post-experiment assessment.",
    "Students will work with industry-relevant technologies including Arduino and ESP8266/ESP32 microcontrollers, DHT11/DHT22 temperature and humidity sensors, PIR motion sensors, LDR light sensors, relay modules, MQTT protocol, HTTP-based APIs, WebSocket communication, and cloud IoT platforms such as ThingSpeak and Adafruit IO. All circuit simulations are performed on Tinkercad and Wokwi, both of which are free, browser-based, and require only a free account to use.",
    "By the end of this lab students will have hands-on experience building complete IoT systems from the sensor layer through the communication layer to the cloud visualization layer — the full IoT stack.",
    "Feedback: We value your feedback to improve this virtual lab experience continuously. Your responses help us improve experiment quality, simulation accuracy, and the overall learning experience for future students. Submit feedback to your department email. This IoT Virtual Lab is developed and maintained by the Yukta Dev Squad, JNTUGV under the guidance of the Department of Electronics and Communication Engineering and Computer Science Engineering. We acknowledge the Tinkercad, Wokwi, ThingSpeak, Adafruit IO, and Node-RED platforms for providing free, high-quality tools that make browser-based IoT education possible."
  ],
  targetAudience: {
    primary: "B.Tech students of Electronics and Communication Engineering (ECE), Computer Science Engineering (CSE), Information Technology (IT), Electrical and Electronics Engineering (EEE), and allied branches at Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) enrolled in IoT, Embedded Systems, or related elective/core lab courses.",
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
      "Faculty members designing IoT lab curricula aligned to JNTUGV syllabus.",
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
          desc: "Interface a DHT11 or DHT22 digital temperature sensor with an Arduino Uno. Read temperature values in Celsius and Fahrenheit using the DHT library. Display readings on the Serial Monitor. Simulate the full circuit on Tinkercad including sensor wiring, pull-up resistor, and serial output.\n\nSolve: http://localhost:8080/workspace?exp=iot-m1-1", 
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
            pretest: [
              {
                question: "What type of output signal does the DHT11 sensor produce?",
                options: ["Analog voltage proportional to temperature", "PWM signal with duty cycle proportional to temperature", "Digital serial data transmitted over a single-wire protocol", "I2C data on two wires (SDA and SCL)"],
                answerIndex: 2
              },
              {
                question: "Why is a pull-up resistor mandatory on the DHT11/DHT22 data line?",
                options: ["To limit current and protect the sensor from damage", "Because the sensor uses an open-drain output that floats at undefined voltage when released — the pull-up resistor holds the line HIGH in the idle state ensuring reliable communication", "To filter noise on the data line", "To step down the 5V signal to 3.3V for the sensor"],
                answerIndex: 1
              },
              {
                question: "What is the temperature accuracy of the DHT22 sensor?",
                options: ["±5°C", "±2°C", "±1°C", "±0.5°C"],
                answerIndex: 3
              },
              {
                question: "What does the Arduino function isnan() check when reading DHT sensor values?",
                options: ["Whether the temperature is below zero", "Whether the sensor is connected to the correct pin", "Whether the sensor reading failed and returned Not a Number indicating a communication error", "Whether the humidity value is above 100%"],
                answerIndex: 2
              },
              {
                question: "What is the Fahrenheit equivalent of 25°C?",
                options: ["57°F", "77°F", "45°F", "93°F"],
                answerIndex: 1
              }
            ],
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
            posttest: [
              {
                question: "A DHT11 sensor reads 28°C. What is the equivalent temperature in Fahrenheit?",
                options: ["72.4°F", "82.4°F", "56.8°F", "95.0°F"],
                answerIndex: 1
              },
              {
                question: "The Arduino Serial Monitor shows NaN for the temperature reading. What is the most likely cause?",
                options: ["The temperature is below 0°C which DHT11 cannot measure", "The pull-up resistor is missing or the DATA wire is loose causing communication failure between Arduino and DHT11", "The Serial baud rate is set incorrectly", "The LED is short-circuiting the data line"],
                answerIndex: 1
              },
              {
                question: "A student connects the DHT11 DATA pin directly to Arduino D4 without a pull-up resistor. What will happen?",
                options: ["The sensor works normally since the Arduino has internal pull-ups", "The sensor will read temperature as always 0°C", "The communication will be unreliable — readings may fail intermittently or always return NaN due to the floating data line", "The Arduino will reset continuously"],
                answerIndex: 2
              },
              {
                question: "In a smart greenhouse the acceptable temperature range is 18°C to 32°C. Write the condition in pseudocode that activates a cooling fan relay when temperature is too high and a heating element relay when temperature is too low.",
                options: ["if temp > 18: fan ON; if temp < 32: heater ON", "if temp > 32: fan ON, heater OFF; if temp < 18: heater ON, fan OFF; else: both OFF", "if temp != 25: fan ON", "if temp > 32 AND temp < 18: activate both"],
                answerIndex: 1
              },
              {
                question: "A DHT22 sensor is used in a cold storage facility monitoring temperature between -20°C and 5°C. Why is DHT22 chosen over DHT11 for this application?",
                options: ["DHT22 is cheaper than DHT11 making it more economical for industrial use", "DHT11 has a minimum temperature range of 0°C and cannot measure negative temperatures — DHT22 supports -40°C to 80°C covering the entire cold storage range — additionally DHT22's ±0.5°C accuracy is critical for precise cold chain monitoring", "DHT22 has a faster sampling rate of 10 readings per second", "DHT11 requires a different library that is incompatible with cold storage firmware"],
                answerIndex: 1
              }
            ],
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
          desc: "Read humidity percentage from the DHT11/DHT22 sensor and implement threshold-based alerting — activate an LED when humidity exceeds a set limit. Understand the difference between relative humidity and absolute humidity. Simulate on Tinkercad with LED indicator circuit.\n\nSolve: http://localhost:8080/workspace?exp=iot-m1-2", 
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
            pretest: [
              {
                question: "What does Relative Humidity of 100% mean physically?",
                options: ["The air contains 100 grams of water per cubic meter", "The air is fully saturated with water vapor at the current temperature — any further addition of moisture or decrease in temperature causes condensation", "The humidity sensor is reading at maximum range", "The temperature equals the dew point minus 100"],
                answerIndex: 1
              },
              {
                question: "Why does the same absolute amount of water vapor result in lower relative humidity at higher temperatures?",
                options: ["Water vapor evaporates faster at higher temperatures", "Warm air has a higher saturation vapor pressure — it can hold more moisture — so the same amount of water vapor represents a smaller fraction of the maximum possible, giving lower RH", "Higher temperatures cause the DHT sensor to read lower values", "There is no relationship between temperature and relative humidity"],
                answerIndex: 1
              },
              {
                question: "A server room humidity alarm is set at 65% RH. The current reading is 72% RH. Which action should the IoT system take?",
                options: ["Activate the heating system to raise temperature", "Activate the dehumidifier to reduce moisture and send an alert notification", "Increase the cooling to lower temperature only", "No action needed — 72% is within safe range"],
                answerIndex: 1
              },
              {
                question: "What Arduino DHT library function computes the apparent temperature combining temperature and humidity?",
                options: ["dht.readHeatIndex()", "dht.computeHeatIndex(temperature, humidity, isFahrenheit)", "dht.getFeelsLike()", "dht.apparentTemperature()"],
                answerIndex: 1
              },
              {
                question: "Indoor humidity of 25% RH most likely causes which of the following effects?",
                options: ["Mold growth on walls", "Condensation on windows", "Dry skin, static electricity, and respiratory irritation", "Flooding in low-lying areas"],
                answerIndex: 2
              }
            ],
            procedure: [
              "Step 1: Open Previous Tinkercad Circuit. Open the Tinkercad circuit built in Experiment 1.1 and copy it.",
              "Step 2: Add Second LED for Dual-Threshold Alert. Add a second LED (yellow or blue) to the breadboard. Connect its anode to Arduino pin D8 via a 220Ω resistor.",
              "Step 3: Add Green Status LED. Add a third LED (green) connected to Arduino pin D9 via 220Ω resistor for the normal range indicator.",
              "Step 4: Update Firmware. Define HIGH_THRESHOLD = 70.0 and LOW_THRESHOLD = 30.0. Read humidity and compute Heat Index. Implement three-state LED logic: High (Red), Low (Yellow), Normal (Green).",
              "Step 5: Start Simulation and Test All Three States. Click Start Simulation. Click DHT11 sensor and adjust Humidity slider to test 25%, 50%, and 75%.",
              "Step 6: Record Observations. Record LED state and Serial Monitor output. Verify Heat Index values.",
              "Step 7: Explore Wokwi for Enhanced Simulation."
            ],
            posttest: [
              {
                question: "At temperature 35°C and humidity 85% what does the Heat Index being significantly higher than 35°C indicate?",
                options: ["The thermometer is faulty", "The sensor is overloaded with high humidity readings", "High humidity reduces the effectiveness of evaporative cooling (sweating) making the environment feel considerably hotter than the actual temperature", "Heat Index is always higher than actual temperature regardless of humidity"],
                answerIndex: 2
              },
              {
                question: "A museum conservator sets humidity thresholds at 45% (low) and 55% (high) for artifact preservation. Current reading is 52% — which LEDs should be ON?",
                options: ["Red LED (high alert)", "Yellow LED (low alert)", "Green LED (normal — 52% is within 45-55% range)", "All LEDs ON simultaneously"],
                answerIndex: 2
              },
              {
                question: "Why does high humidity promote mold growth?",
                options: ["Mold consumes water vapor directly from the air", "High humidity (above 70% RH) provides the moisture necessary for mold spores to germinate and grow on surfaces", "Mold grows faster at lower temperatures which correlate with high humidity", "High humidity reduces oxygen concentration enabling anaerobic mold growth"],
                answerIndex: 1
              },
              {
                question: "The dht.readHumidity() function returns NaN. Which debugging step should be performed first?",
                options: ["Replace the DHT library with a different library", "Check the physical connections — verify VCC is at 5V, GND is connected, DATA pin matches the pin number in code, and the 10kΩ pull-up resistor is present on the data line", "Increase the delay between readings to 10 seconds", "Change Serial baud rate from 9600 to 115200"],
                answerIndex: 1
              },
              {
                question: "A smart HVAC system reads humidity at 68% and temperature at 26°C. Based on your dual-threshold system (30% low, 70% high) what action should the system take and why?",
                options: ["Activate humidifier — humidity is below 70%", "Take no action — current humidity 68% is within the normal range (30-70%) — status is NORMAL and no alert should trigger", "Activate dehumidifier immediately — approaching the upper threshold", "Activate cooling — temperature is above 25°C"],
                answerIndex: 1
              }
            ],
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
          desc: "Interface a Light Dependent Resistor (LDR) in a voltage divider circuit with the Arduino analog input pin. Read raw ADC values and convert to lux approximation. Implement automatic light control — activate an LED when ambient light falls below a threshold. Simulate on Tinkercad.\n\nSolve: http://localhost:8080/workspace?exp=iot-m1-3", 
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
            pretest: [
              {
                question: "What happens to the resistance of an LDR when light intensity increases?",
                options: ["Resistance increases proportionally to light intensity", "Resistance remains constant regardless of light", "Resistance decreases — more light releases more charge carriers reducing resistance", "Resistance increases then decreases at very high intensity"],
                answerIndex: 2
              },
              {
                question: "In the LDR voltage divider circuit with VCC=5V, R_fixed=10kΩ, and R_LDR=10kΩ (medium light), what voltage appears at the Arduino analog pin?",
                options: ["5V", "0V", "2.5V", "1.25V"],
                answerIndex: 2
              },
              {
                question: "What is the maximum ADC value returned by Arduino's analogRead() function?",
                options: ["255", "512", "1023", "4095"],
                answerIndex: 2
              },
              {
                question: "An Arduino analogRead() returns 512. What is the corresponding input voltage assuming 5V reference?",
                options: ["2.0V", "2.5V", "3.0V", "1.5V"],
                answerIndex: 1
              },
              {
                question: "In the automatic light control system when should the LED activate?",
                options: ["When the ADC value is high (bright light detected)", "When the ADC value is low (darkness detected — LDR resistance high, voltage divider output low)", "When the ADC value equals exactly 512", "When the temperature exceeds the threshold"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Create New Tinkercad Circuit. Place an Arduino Uno, breadboard, LDR, two resistors (10kΩ and 220Ω), and a red LED.",
              "Step 2: Build the Voltage Divider Circuit. Connect 5V → LDR → Junction → 10kΩ resistor → GND. Connect Junction to A0.",
              "Step 3: Add LED Circuit. Connect LED anode → 220Ω resistor → Arduino D13. Connect LED cathode → GND.",
              "Step 4: Write Firmware. Define LDR_PIN as A0, LED_PIN as D13, DARKNESS_THRESHOLD as 400. Loop reads ADC value using analogRead(), converts to voltage, prints to Serial Monitor, and activates LED when ADC value is below threshold.",
              "Step 5: Simulate and Test. Click Start Simulation. Click on the LDR and adjust the light intensity slider. Observe LED activation.",
              "Step 6: Record and Calibrate. Record ADC values at 5 different light levels. Compute corresponding voltage and resistance."
            ],
            posttest: [
              {
                question: "An LDR circuit produces ADC value 100 in a dimly lit room. The darkness threshold is 300. What is the LED state and what does this indicate?",
                options: ["LED OFF — room is bright enough", "LED ON — ADC value (100) is below threshold (300) indicating insufficient light, the automatic light turns ON", "LED blinks — ADC value is at the boundary", "LED OFF — threshold logic is inverted for LDR circuits"],
                answerIndex: 1
              },
              {
                question: "A student changes the fixed resistor in the voltage divider from 10kΩ to 47kΩ while keeping the LDR the same. How does this affect the circuit sensitivity?",
                options: ["No change — the ADC reading is independent of the fixed resistor", "The circuit becomes more sensitive to changes in light at lower light levels — the operating point of the voltage divider shifts making it better at detecting subtle changes in dim light conditions", "The Arduino analog pin receives 47 times more voltage causing damage", "The LED activates more frequently due to higher resistor value"],
                answerIndex: 1
              },
              {
                question: "What is the ADC resolution of Arduino Uno's analogRead() function and what voltage change corresponds to one ADC step?",
                options: ["8-bit resolution, 20mV per step", "10-bit resolution, approximately 4.88mV per step (5V/1024)", "12-bit resolution, approximately 1.2mV per step", "16-bit resolution, approximately 0.076mV per step"],
                answerIndex: 1
              },
              {
                question: "In a smart street lighting system using LDR the lights should turn ON at dusk (approximately 10 lux) and OFF at dawn (approximately 50 lux). Why are two different thresholds used instead of one?",
                options: ["Two thresholds are required by the Arduino analogRead() function", "Using two different thresholds (hysteresis) prevents rapid flickering of lights when the light level hovers near a single threshold — lights turn ON at 10 lux and only turn OFF when light rises to 50 lux", "Dusk and dawn have different colors of light requiring separate calibration", "LDR resistance behaves differently during morning versus evening"],
                answerIndex: 1
              },
              {
                question: "The LDR in a Tinkercad simulation is replaced with a fixed 10kΩ resistor (same as the voltage divider resistor). What ADC value will analogRead() always return?",
                options: ["0 — no light sensor means no reading", "1023 — maximum light", "511 or 512 — the voltage divider with two equal resistors always produces VCC/2 = 2.5V which maps to ADC ≈ 512", "Random values — without an LDR the reading is unpredictable"],
                answerIndex: 2
              }
            ],
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
          desc: "Interface a Passive Infrared (PIR) motion sensor with Arduino. Detect presence and absence of motion from the digital output of the PIR module. Trigger an alarm LED and buzzer on motion detection. Implement a cooldown timer to prevent repeated triggers. Simulate on Tinkercad.\n\nSolve: http://localhost:8080/workspace?exp=iot-m1-4", 
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
            pretest: [
              {
                question: "Why is the PIR sensor called passive?",
                options: ["It requires very low power to operate", "It detects motion passively by receiving infrared radiation emitted by moving warm objects without emitting any signal itself", "It cannot detect fast-moving objects", "It requires passive cooling to operate"],
                answerIndex: 1
              },
              {
                question: "What does the PIR sensor output pin produce when no motion is detected?",
                options: ["HIGH (5V)", "Alternating HIGH and LOW pulses", "Analog voltage proportional to motion speed", "LOW (0V)"],
                answerIndex: 3
              },
              {
                question: "Why must you wait 30-60 seconds after powering on the PIR sensor before relying on its readings?",
                options: ["The sensor needs time to charge its internal capacitors", "The sensor requires a warm-up calibration period to establish baseline ambient infrared levels — during this period the output fluctuates producing false detections", "The Arduino Serial Monitor takes 60 seconds to initialize", "The Fresnel lens needs time to focus properly"],
                answerIndex: 1
              },
              {
                question: "In repeatable trigger mode what happens if motion is continuously detected throughout the time-delay period?",
                options: ["The output goes LOW after the set time regardless of continued motion", "The sensor generates an error signal", "The output remains HIGH and the time-delay timer continuously resets as long as motion persists", "The sensitivity potentiometer automatically reduces range"],
                answerIndex: 2
              },
              {
                question: "A PIR-based room occupancy sensor falsely triggers when sunlight moves across the floor through a window. What is the most likely cause?",
                options: ["The PIR sensor is incompatible with natural light", "Moving sunlight patterns create differential infrared changes similar to a person moving — the PIR sensor cannot distinguish between body heat infrared and the infrared component of sunlight", "The Arduino firmware has a software bug", "The time-delay potentiometer is set too low"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Build Circuit on Tinkercad. Open Tinkercad and create a new circuit. Place Arduino Uno, PIR sensor, Red LED (motion alert), Piezo buzzer (alarm), Green LED (idle status indicator), and 220Ω resistors.",
              "Step 2: Wire the PIR Sensor. PIR VCC → Arduino 5V, PIR GND → Arduino GND, PIR OUT → Arduino digital pin D2.",
              "Step 3: Wire LEDs and Buzzer. Red LED anode → 220Ω → Arduino D7. Green LED anode → 220Ω → Arduino D8. Buzzer positive → Arduino D9.",
              "Step 4: Write State Machine Firmware. Defines PIR_PIN=D2, RED_LED=D7, GREEN_LED=D8, BUZZER=D9. Implement three-state state machine with IDLE, MOTION_DETECTED, COOLDOWN states. Include warm-up delay.",
              "Step 5: Simulate Motion Detection. Click Start Simulation. Wait for warm-up countdown. Click the PIR sensor to trigger motion.",
              "Step 6: Test All States. Verify idle state, motion detection state, and cooldown state. Test multiple consecutive detections."
            ],
            posttest: [
              {
                question: "A PIR sensor in an office controls the lights automatically. The time-delay potentiometer is set to 2 minutes. An employee leaves their desk for 3 minutes. What happens to the lights?",
                options: ["Lights turn OFF after 2 minutes of no motion and remain OFF until motion is detected again", "Lights turn OFF immediately when the employee leaves", "Lights remain ON indefinitely regardless of motion", "Lights blink after 1 minute as a warning"],
                answerIndex: 0
              },
              {
                question: "A security system must distinguish between a human intruder and a cat moving in the room. What PIR adjustment reduces false triggers from small animals?",
                options: ["Increase the time-delay potentiometer to maximum", "Reduce the sensitivity potentiometer to minimum range and mount the PIR sensor higher than the cat's head height so the detection zone covers human height but not floor-level pet movement", "Set PIR to single-trigger mode only", "Replace the Fresnel lens with a narrower field lens"],
                answerIndex: 1
              },
              {
                question: "The Arduino Serial Monitor shows MOTION DETECTED repeatedly every second with no one in the room. What are two possible causes?",
                options: ["The PIR sensor has no warm-up period and normal fluctuation during calibration OR a heat source such as sunlight, HVAC vent, or hot appliance is moving within the sensor's field of view causing false triggers", "The digitalWrite threshold is set too low", "The PIR sensor is compatible only with 3.3V microcontrollers", "The cooldown timer is too short causing immediate re-triggering"],
                answerIndex: 0
              },
              {
                question: "In a smart home system PIR sensors are placed in every room to control HVAC — rooms with detected presence receive cooling and unoccupied rooms are set to energy-saving mode. What IoT architecture pattern does this represent?",
                options: ["Cloud-only processing — all sensor data sent to cloud for decision making", "Edge computing with local actuation — presence decisions made locally on the microcontroller without cloud round-trip latency ensuring immediate HVAC response", "Batch processing — all room data collected for one hour then processed together", "Peer-to-peer communication between PIR sensors without a microcontroller"],
                answerIndex: 1
              },
              {
                question: "A student implements the state machine with IDLE, MOTION_DETECTED, and COOLDOWN states but forgets to include the cooldown state. What problem occurs in the security system?",
                options: ["The system becomes more sensitive detecting more motions", "Without cooldown the system immediately returns to IDLE after the motion period ends — if the PIR output is still HIGH (person still present) the system immediately triggers another MOTION_DETECTED cycle causing rapid continuous alarm activation and buzzer noise", "The system permanently stays in MOTION_DETECTED state", "The LED fails to activate due to missing state logic"],
                answerIndex: 1
              }
            ],
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
          desc: "Control an LED or lamp using a relay module connected to an ESP8266/ESP32. Implement Wi-Fi connectivity and expose a simple web server on the microcontroller. Control the light ON/OFF from a browser on the same Wi-Fi network. Simulate the relay circuit on Tinkercad and Wi-Fi web server on Wokwi.\n\nSolve: http://localhost:8080/workspace?exp=iot-m2-1", 
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
            pretest: [
              {
                question: "What is the primary advantage of ESP8266 over Arduino Uno for IoT applications?",
                options: ["ESP8266 has more analog input pins than Arduino Uno", "ESP8266 has built-in Wi-Fi enabling direct internet connectivity without additional hardware", "ESP8266 operates at 5V making it compatible with more sensors", "ESP8266 has a larger flash memory of 256KB"],
                answerIndex: 1
              },
              {
                question: "In a relay module what is the function of the Normally Open (NO) contact?",
                options: ["It remains closed when the relay coil is de-energized and opens when energized", "It remains open when the relay coil is de-energized and closes when the coil is energized allowing current to flow through the load", "It is always open regardless of relay state", "It connects directly to the microcontroller GPIO pin"],
                answerIndex: 1
              },
              {
                question: "What HTTP port does the ESP8266 web server listen on by default in the standard smart home implementation?",
                options: ["8080", "443", "22", "80"],
                answerIndex: 3
              },
              {
                question: "What does WiFi.localIP() return after successful Wi-Fi connection?",
                options: ["The MAC address of the ESP8266", "The IP address of the Wi-Fi router", "The IP address assigned to the ESP8266 by the router's DHCP server", "The public IP address of the internet connection"],
                answerIndex: 2
              },
              {
                question: "Why must server.handleClient() be called inside the Arduino loop() function?",
                options: ["It resets the Wi-Fi connection every loop iteration", "It continuously polls for incoming HTTP requests and processes them — without this call the server never responds to browser requests", "It sends periodic heartbeat signals to the Wi-Fi router", "It updates the relay state automatically based on time"],
                answerIndex: 1
              }
            ],
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
            posttest: [
              {
                question: "A student's ESP32 web server works on the local Wi-Fi network but cannot be accessed from outside the home network. What is the most likely reason?",
                options: ["The ESP32 is not powerful enough for internet access", "The home router uses NAT (Network Address Translation) — the ESP32 has a private local IP address not routable from the internet. Port forwarding on the router or a cloud relay service like ngrok is needed for external access", "HTTP port 80 is blocked by the ESP32 firmware", "ESP32 can only communicate with devices on the same subnet"],
                answerIndex: 1
              },
              {
                question: "The Wokwi simulation shows the ESP32 repeatedly printing dots without connecting to Wi-Fi. What is the most likely firmware error?",
                options: ["The WebServer library is not included", "The SSID is set to \"Wokwi-GUEST\" but the password is set to a non-empty string — Wokwi's guest network requires an empty password string \"\"", "GPIO 26 is not available on ESP32", "server.begin() is called before WiFi.begin()"],
                answerIndex: 1
              },
              {
                question: "A relay module's IN pin is connected to ESP32 GPIO 26. The relay is active-LOW meaning it activates when GPIO is LOW and deactivates when HIGH. How must the handleOn and handleOff functions be modified?",
                options: ["No change needed — relay polarity is handled by the relay module automatically", "handleOn should call digitalWrite(26, LOW) to activate the relay and handleOff should call digitalWrite(26, HIGH) to deactivate it — reversing the logic for active-LOW relay", "The relay IN pin should be connected to 3.3V instead of GPIO", "Active-LOW relays require a separate Arduino sketch — they cannot be used with ESP32"],
                answerIndex: 1
              },
              {
                question: "A smart home system has 5 appliances (lights, fan, TV, AC, water heater). How should the web server firmware be structured to control all five independently?",
                options: ["Use one URL /control for all appliances and pass the appliance name as a query parameter", "Define separate GPIO pins for each appliance relay, register separate server.on() handlers for each appliance (/light/on, /light/off, /fan/on, /fan/off, etc.), and serve a unified control dashboard HTML page with buttons for all five appliances", "Use five separate ESP32 boards each with one web server", "Control all appliances through a single relay using time-multiplexing"],
                answerIndex: 1
              },
              {
                question: "What is the key security vulnerability of the simple HTTP web server implementation in this experiment and how would you address it in a production smart home system?",
                options: ["HTTP is vulnerable to man-in-the-middle attacks and has no authentication — anyone on the same Wi-Fi network can control the lights. Production systems should use HTTPS with TLS encryption and add username/password authentication or token-based access control", "The relay clicking sound reveals the system location to intruders", "ESP32 web servers are inherently insecure and should never be used in production", "The vulnerability is the fixed IP address — use dynamic DNS to improve security"],
                answerIndex: 0
              }
            ],
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
          desc: "Monitor temperature using a DHT sensor connected to ESP8266/ESP32. Automatically activate a DC fan (represented by a relay) when temperature exceeds a set threshold. Implement manual override via a web interface. Combine sensor reading and relay control in one firmware. Simulate on Wokwi.\n\nSolve: http://localhost:8080/workspace?exp=iot-m2-2", 
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
            pretest: [
              {
                question: "What is hysteresis in the context of automatic fan control and why is it important?",
                options: ["Hysteresis is the delay between temperature measurement and fan activation — important for accuracy", "Hysteresis uses two different thresholds (ON threshold higher than OFF threshold) to create a dead band that prevents rapid relay switching (chatter) when temperature hovers near a single threshold", "Hysteresis is the measurement error of the DHT22 sensor that must be compensated", "Hysteresis refers to the time the fan takes to reach full speed after activation"],
                answerIndex: 1
              },
              {
                question: "A fan control system has ON threshold 32°C and OFF threshold 28°C. The temperature sequence is 25, 30, 33, 31, 29, 27°C. When does the fan turn ON and OFF?",
                options: ["ON at 30°C, OFF at 29°C", "ON at 33°C (first reading above 32°C), OFF at 27°C (first reading below 28°C)", "ON at 32°C exactly, OFF at 28°C exactly", "ON and OFF at every reading since temperature keeps changing"],
                answerIndex: 1
              },
              {
                question: "What is the difference between open-loop and closed-loop fan control?",
                options: ["Open-loop uses sensors while closed-loop uses timers", "Open-loop activates the fan based on fixed schedules without measuring actual temperature — closed-loop continuously reads temperature and adjusts fan state to maintain the desired thermal condition", "Closed-loop uses more relays than open-loop", "Open-loop is more energy efficient than closed-loop always"],
                answerIndex: 1
              },
              {
                question: "In the ESP32 fan automation web dashboard what is the purpose of the manual override feature?",
                options: ["Manual override replaces the DHT22 sensor with a potentiometer for temperature setting", "Manual override allows the user to force the fan ON or OFF regardless of sensor readings — useful for maintenance, testing, or when sensor readings are suspect", "Manual override enables OTA (Over The Air) firmware updates", "Manual override switches the ESP32 from Wi-Fi to Bluetooth mode"],
                answerIndex: 1
              },
              {
                question: "What does a 50% PWM duty cycle applied to a fan motor achieve compared to a 100% duty cycle?",
                options: ["The fan runs at exactly half the speed consuming exactly half the power", "The fan runs at approximately half speed — actual speed reduction depends on fan motor characteristics but power consumption is approximately halved reducing heat generation and noise", "The fan runs at full speed for half the time then stops completely", "PWM at 50% is equivalent to relay switching at 50% — the fan cannot operate at intermediate speeds"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Open Wokwi and Create ESP32 Project.",
              "Step 2: Add Components: DHT22 sensor, LED (blue — representing fan), and Resistor (220Ω).",
              "Step 3: Write Firmware combining DHT22 reading, hysteresis logic for controlFan(), and WebServer handlers.",
              "Step 4: Simulate and Test Automatic Mode. Adjust DHT22 slider and observe automatic fan (LED) activation and deactivation based on thresholds.",
              "Step 5: Test Manual Override. Access the web dashboard, switch to manual mode, and force the fan ON/OFF.",
              "Step 6: Observe Hysteresis Behavior. Set temperature between ON and OFF thresholds and verify the fan state remains unchanged (dead band)."
            ],
            posttest: [
              {
                question: "A student sets ON threshold to 30°C and OFF threshold to 30°C (same value). The temperature fluctuates between 29.8°C and 30.2°C due to sensor noise. What problem occurs and how does hysteresis fix it?",
                options: ["No problem — identical thresholds make the system more precise", "The relay switches ON and OFF extremely rapidly (chatter) as temperature oscillates across the single threshold — hysteresis fixes this by setting OFF threshold to 27°C creating a 3°C dead band where the relay state does not change", "The ESP32 crashes when both thresholds are equal", "The fan runs at 50% speed when temperature equals the threshold"],
                answerIndex: 1
              },
              {
                question: "A greenhouse requires temperature between 22°C and 28°C. Design the fan control thresholds: fan should activate to cool when temperature is too high and deactivate when cooled sufficiently with 2°C hysteresis.",
                options: ["ON at 28°C, OFF at 26°C", "ON at 22°C, OFF at 24°C", "ON at 25°C, OFF at 25°C", "ON at 30°C, OFF at 20°C"],
                answerIndex: 0
              },
              {
                question: "The DHT22 reads 31°C but the actual room temperature is 29°C. The fan activates unnecessarily. How should this calibration error be corrected in firmware?",
                options: ["Replace the DHT22 with DHT11 for better accuracy", "Add a calibration offset constant: correctedTemp = rawTemp + calibrationOffset where calibrationOffset = actualTemp - rawTemp = 29 - 31 = -2.0°C", "Increase the ON threshold to 33°C to compensate", "Use the average of 10 readings to eliminate error"],
                answerIndex: 1
              },
              {
                question: "In a server room cooling system using this fan automation design what additional sensor would significantly improve the system and why?",
                options: ["A PIR sensor to detect when IT staff are present", "A humidity sensor to monitor relative humidity — server rooms require both temperature below 27°C and humidity between 40-60% RH. High humidity causes condensation on servers and low humidity causes static discharge — the fan control should consider both parameters", "An LDR to detect when server lights are ON indicating active usage", "A sound sensor to detect server fan noise indicating overheating"],
                answerIndex: 1
              },
              {
                question: "The ESP32 fan automation web dashboard refreshes every 30 seconds using an HTML meta refresh tag. A student wants real-time updates every second without full page reloads. Which technology should replace the meta refresh?",
                options: ["Increase the meta refresh interval to 1 second — it achieves the same result", "Use JavaScript fetch() API with setInterval() to request only the temperature and fan status data (as JSON from a /status endpoint) every second and update the DOM without reloading the full page — or implement WebSocket for bidirectional real-time communication", "Use HTTP POST requests instead of GET for faster updates", "Use MQTT directly in the browser to receive sensor data"],
                answerIndex: 1
              }
            ],
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
          desc: "Implement a keypad-based door lock using a 4x4 matrix keypad and a servo motor as the lock actuator. Accept a PIN code — servo rotates to open on correct PIN and remains locked on incorrect PIN. Add a buzzer alert for incorrect attempts. Simulate on Tinkercad with keypad, servo, and buzzer.\n\nSolve: http://localhost:8080/workspace?exp=iot-m2-3", 
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
            pretest: [
              {
                question: "A 4x4 matrix keypad has 16 keys but uses only 8 connection wires. How does this work?",
                options: ["Eight wires carry digital serial data encoding all 16 key states", "Keys are arranged in a 4-row by 4-column grid — the Arduino scans rows one at a time and reads which column pin goes LOW to identify the pressed key requiring only 4 row + 4 column = 8 wires", "Only 8 keys are actually functional — the rest are decorative", "The 8 wires use PWM multiplexing to simulate 16 separate connections"],
                answerIndex: 1
              },
              {
                question: "A servo motor receives a PWM pulse of 2ms width. What position does it rotate to?",
                options: ["0° (fully clockwise)", "90° (center position)", "45° (quarter turn)", "180° (fully counterclockwise)"],
                answerIndex: 3
              },
              {
                question: "Why is a security lockout after failed attempts important in a PIN-based door lock?",
                options: ["The lockout saves battery power by disabling the keypad", "The lockout prevents brute-force attacks where an attacker systematically tries all possible PIN combinations — without lockout a 4-digit PIN (10,000 combinations) could be cracked in minutes", "The lockout gives the Arduino time to process the incorrect PIN", "The lockout prevents multiple users from entering PIN simultaneously"],
                answerIndex: 1
              },
              {
                question: "What does lcd.setCursor(0, 1) do?",
                options: ["Moves cursor to column 1, row 0 of the LCD", "Moves cursor to column 0, row 1 — the beginning of the second row of the LCD", "Sets LCD brightness to level 1", "Clears the LCD and moves to position (0,1)"],
                answerIndex: 1
              },
              {
                question: "A student changes the correct PIN from \"1234\" to \"9876\" in firmware and re-uploads. What other security consideration should be addressed?",
                options: ["The servo motor must be recalibrated after PIN change", "Hard-coded PINs in firmware are a security risk — if the device is physically accessed the firmware can be read and the PIN extracted. A better approach stores the PIN hash in EEPROM and allows PIN change through a secured interface", "The LCD display must be cleared before the new PIN takes effect", "The keypad debounce timing must be reconfigured for the new PIN"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Build Tinkercad Circuit with Arduino Uno, 4x4 Matrix Keypad, Micro servo motor, 16x2 LCD display, Piezo buzzer.",
              "Step 2: Wire Keypad to Arduino (Row pins to D9-D6, Column pins to D5-D2).",
              "Step 3: Wire Servo Motor to D11.",
              "Step 4: Wire LCD Display.",
              "Step 5: Wire Buzzer to D10.",
              "Step 6: Write State Machine Firmware including Keypad.h, Servo.h, LiquidCrystal.h.",
              "Step 7: Simulate and Test. Test correct PIN ('1234') and wrong PINs to trigger lockout."
            ],
            posttest: [
              {
                question: "A student sets the servo LOCKED position to 0° and UNLOCKED to 90°. The servo moves correctly but the physical bolt does not fully retract. What is the most likely mechanical adjustment needed?",
                options: ["Increase the servo PWM frequency", "Change the UNLOCKED angle from 90° to 120° or 135° to provide more rotation for full bolt retraction — servo angles must be mechanically calibrated to the actual lock mechanism", "Use a larger servo motor with higher torque", "Reduce the 5V supply to 3.3V for more precise servo control"],
                answerIndex: 1
              },
              {
                question: "Why does the smart door lock firmware use millis() for the auto-lock timer instead of delay(5000)?",
                options: ["millis() is more accurate than delay() for long durations", "delay(5000) blocks all code execution for 5 seconds making the system unresponsive to keypad input, buzzer control, and LCD updates — millis() allows non-blocking timing where the system continues processing while waiting", "delay() does not work with servo motors", "millis() automatically triggers the servo write() function after the timer expires"],
                answerIndex: 1
              },
              {
                question: "The system uses String comparison to check the PIN. What security improvement should be implemented for a production door lock?",
                options: ["Use integer comparison instead of String comparison for speed", "Store a cryptographic hash (SHA-256) of the correct PIN instead of the plain text PIN — compare the hash of the entered PIN against the stored hash so the actual PIN is never stored in readable form in firmware or EEPROM", "Use a longer PIN of 8 digits instead of 4", "Compare PIN character by character using a for loop instead of String equals"],
                answerIndex: 1
              },
              {
                question: "A property manager wants to issue temporary PIN codes that expire after 24 hours for Airbnb guests. What hardware addition to the basic smart lock system enables this feature?",
                options: ["Add a second keypad for backup PIN entry", "Add a real-time clock (RTC) module such as DS3231 — the RTC provides accurate current time allowing the firmware to check whether a temporary PIN is within its valid time window and reject expired PINs", "Add a second servo motor for a deadbolt", "Add a Bluetooth module to receive time synchronization from smartphones"],
                answerIndex: 1
              },
              {
                question: "After implementing the smart door lock a security audit reveals that pressing * on the keypad clears the entered PIN and returns to IDLE — allowing an attacker to see which digits cause the partial PIN display to change. How should the firmware handle the * key?",
                options: ["Disable the * key entirely — 4x4 keypad should only use numeric keys", "Make the clear function always clear after a fixed delay of 2 seconds regardless of how many digits are entered — this way the attacker cannot determine which digit was last entered from the timing of the clear operation", "Map * to the digit 5 to confuse attackers", "Require the user to press # before entering PIN to activate the keypad"],
                answerIndex: 1
              }
            ],
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
          desc: "Build a multi-sensor security system combining PIR motion detection and an LDR-based night detection. Arm the alarm only during nighttime (LDR detects darkness) and trigger a buzzer alarm when motion is detected. Send an alert notification via Adafruit IO MQTT feed. Simulate on Wokwi.\n\nSolve: http://localhost:8080/workspace?exp=iot-m2-4", 
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
            pretest: [
              {
                question: "Why does the security system use the condition (PIR_triggered AND LDR_dark) rather than PIR_triggered alone?",
                options: ["The LDR provides more accurate motion detection than PIR alone", "Combining both conditions drastically reduces false alarms — a genuine nighttime intrusion satisfies both conditions simultaneously while daytime PIR triggers (pets, sunlight) fail the LDR darkness check", "The ESP32 cannot process PIR input without LDR calibration data", "The LDR detection provides backup when PIR battery runs low"],
                answerIndex: 1
              },
              {
                question: "In the IoT alert architecture why is the local buzzer activated before the MQTT message is published to the cloud?",
                options: ["MQTT requires the buzzer as a confirmation signal before accepting the message", "Local buzzer response is instantaneous (no network dependency) ensuring immediate alarm even if Wi-Fi is down — cloud notification is sent after local alarm as an additional layer", "Adafruit IO requires a minimum 5-second delay before accepting security alerts", "The buzzer generates the frequency needed for MQTT data encoding"],
                answerIndex: 1
              },
              {
                question: "An Adafruit IO MQTT feed has topic 'john/feeds/security-alert'. What does the 'john' part represent?",
                options: ["The device name of the ESP32", "The Adafruit IO username of the account owner", "The geographic location of the sensor", "The feed creation date identifier"],
                answerIndex: 1
              },
              {
                question: "The LDR ADC reads 150 in nighttime and 900 in daytime. What DARK_THRESHOLD value correctly identifies nighttime conditions?",
                options: ["50 — too low, would only trigger in complete darkness", "500 — midway between 150 and 900 correctly identifies nighttime (readings below 500) while remaining above daytime readings", "1000 — higher than all LDR readings, always triggers", "150 — exactly matches nighttime reading but sensor variation would cause failures"],
                answerIndex: 1
              },
              {
                question: "What is the purpose of QoS level 1 in MQTT for security alert messages?",
                options: ["It encrypts the message for secure transmission", "It guarantees the message is delivered at least once — the broker acknowledges receipt and the publisher retransmits if no acknowledgment is received ensuring critical security alerts are not silently lost", "It limits the message transmission to one attempt regardless of delivery success", "It reserves bandwidth for high-priority messages on the network"],
                answerIndex: 1
              }
            ],
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
            posttest: [
              {
                question: "The home security system triggers at 3 AM when a cat walks through the room. The LDR correctly detects nighttime. What hardware modification would prevent cat-triggered false alarms while still detecting human intruders?",
                options: ["Increase the DARK_THRESHOLD to make the system less sensitive to darkness", "Mount the PIR sensor at ceiling height (2.4-2.7m) angled downward — at this height the detection zone covers human head-and-torso height but a low-mounted cat passes below the primary detection zone. Additionally adjust the PIR sensitivity potentiometer to minimum range", "Add a second LDR for redundancy", "Reduce the alarm duration from 30 seconds to 5 seconds"],
                answerIndex: 1
              },
              {
                question: "The MQTT publish call in the firmware returns false (failure). The Wi-Fi is connected. What are two likely causes?",
                options: ["The buzzer is interfering with Wi-Fi signal", "The Adafruit IO username or Active Key (password) is incorrect in the firmware constants, OR the Adafruit IO MQTT broker connection dropped and client.connect() must be called again before publishing — always check and reconnect MQTT before publishing", "Adafruit IO free tier does not support MQTT from ESP32", "The MQTT topic string must be lowercase only"],
                answerIndex: 1
              },
              {
                question: "A student wants the security system to send a WhatsApp message instead of just updating an Adafruit IO feed. What is the simplest integration path?",
                options: ["Implement a custom WhatsApp API client directly on the ESP32", "Use Adafruit IO Actions or IFTTT — when the security-alert feed receives a new value trigger an IFTTT applet that calls the Twilio WhatsApp API or uses IFTTT's built-in notification service to send a message", "Connect a GSM module to the ESP32 and use AT commands to send WhatsApp", "WhatsApp integration is not possible with IoT devices"],
                answerIndex: 1
              },
              {
                question: "The security system must also work when Wi-Fi is unavailable (power cut to router). How should the firmware be modified to ensure local alarm functionality is preserved?",
                options: ["Add a second Wi-Fi antenna to improve connection reliability", "Separate local alarm logic from MQTT publishing — the buzzer and LED activation should execute immediately based on sensor conditions without waiting for MQTT publish success. Use non-blocking MQTT calls and continue local alarm regardless of network status", "Store alert messages in a queue and publish them when Wi-Fi reconnects — delay local alarm until network is restored", "Use Bluetooth instead of Wi-Fi for more reliable local communication"],
                answerIndex: 1
              },
              {
                question: "A security system has been deployed in a house. The homeowner reports the alarm triggers every morning around 7 AM when sunlight enters through an east-facing window warming the floor. The PIR detects the temperature differential. How should the software be updated to handle this?",
                options: ["Disable the alarm permanently between 6 AM and 8 AM", "Use time-based arming — arm only between 10 PM and 6 AM using an RTC module for accurate time, and check the LDR reading against a higher threshold that accounts for early morning light. Additionally implement a configurable arm/disarm schedule through the web interface", "Replace the PIR sensor with an ultrasonic distance sensor", "Add a second PIR sensor facing away from the window and require both PIRs to trigger simultaneously"],
                answerIndex: 1
              }
            ],
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
          desc: "Connect an ESP8266/ESP32 to a public MQTT broker (broker.hivemq.com or test.mosquitto.org). Publish DHT sensor data (temperature and humidity) to a topic every 5 seconds. Subscribe to a control topic and act on received commands (turn LED on/off). Visualize published data in Node-RED dashboard. Simulate device on Wokwi.\n\nSolve: http://localhost:8080/workspace?exp=iot-m3-1", 
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
            pretest: [
              {
                question: "Why is MQTT called a publish/subscribe protocol?",
                options: ["Because messages are published to a public internet registry and anyone can subscribe for a fee", "Because devices publish messages to a central broker on named topics and other devices subscribe to those topics to receive messages — publishers and subscribers never communicate directly", "Because MQTT uses a magazine-style scheduled delivery system", "Because the broker publishes acknowledgments and clients subscribe to error logs"],
                answerIndex: 1
              },
              {
                question: "What is the role of the MQTT broker?",
                options: ["It stores all IoT sensor data in a relational database for historical analysis", "It generates sensor readings when devices are offline", "It receives messages from publishers and routes them to all clients subscribed to the matching topic", "It acts as a web server responding to HTTP GET requests from IoT devices"],
                answerIndex: 2
              },
              {
                question: "A temperature sensor publishes to topic factory/zone1/temperature. A dashboard subscribes to factory/+/temperature. Will the dashboard receive the temperature message?",
                options: ["No — the + wildcard only matches numeric characters", "Yes — the + single-level wildcard matches exactly one topic level and zone1 is one level so the subscription matches", "No — wildcards only work with the # character", "Yes — but only if QoS level 2 is used"],
                answerIndex: 1
              },
              {
                question: "A new Node-RED dashboard connects to the MQTT broker and subscribes to device/pump/status. The pump published its last status 10 minutes ago with the retained flag set. What does the dashboard receive?",
                options: ["Nothing — it must wait for the pump to publish its next status update", "An error message because the retained message has expired", "The last retained message immediately upon subscribing so the dashboard knows the current pump status without waiting", "All historical messages the pump has ever published"],
                answerIndex: 2
              },
              {
                question: "An IoT sensor node in a remote field loses network connectivity. Before disconnecting it had registered a Last Will and Testament. What happens?",
                options: ["The broker deletes all messages from that sensor and notifies all subscribers to stop listening", "The broker automatically publishes the pre-registered LWT message on the LWT topic notifying subscribers that the device has gone offline", "The sensor node stores messages locally and bulk-uploads them when reconnected", "Nothing happens — LWT only activates on graceful disconnection"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Set Up Mosquitto MQTT Broker. Install Mosquitto and run on port 1883.",
              "Step 2: Set Up Node-RED Dashboard (Subscriber). Create a flow with MQTT-in node connected to dashboard elements.",
              "Step 3: Simulate Arduino Publisher on Wokwi. Connect DHT22 and add PubSubClient library.",
              "Step 4: Write Publisher Firmware. Connect to WiFi, connect to MQTT broker, publish sensor data to 'iot/sensor/data', subscribe to 'iot/device/command'.",
              "Step 5: Subscribe and Observe Messages. Watch JSON messages arrive on topics.",
              "Step 6: Test Command Flow (Subscriber → Publisher). Publish messages like 'LED_ON' from Node-RED to command the Arduino."
            ],
            posttest: [
              {
                question: "An MQTT broker serves 500 temperature sensors all publishing to factory/sensors/#. An analytics dashboard subscribes to the same topic. How many TCP connections does the broker maintain and how many does the HTTP equivalent require for the same real-time update rate?",
                options: ["MQTT maintains 501 persistent connections (500 publishers + 1 subscriber); HTTP would require 500 separate polling connections per update cycle generating far more overhead", "MQTT and HTTP maintain the same number of connections", "MQTT maintains one shared connection for all devices", "HTTP requires fewer connections because it reuses the same socket"],
                answerIndex: 0
              },
              {
                question: "A factory sensor must deliver a motor shutdown command with guaranteed exactly-once delivery. Which QoS level should be used and why?",
                options: ["QoS 0 — it is the fastest and motors respond quickly enough", "QoS 1 — at-least-once delivery is sufficient for motor control", "QoS 2 — exactly-once delivery guarantees the shutdown command executes precisely once preventing both missed execution (QoS 0 risk) and duplicate execution that could cause unsafe double-shutdown sequences", "QoS 2 is unnecessary — MQTT TCP ensures reliable delivery without QoS"],
                answerIndex: 2
              },
              {
                question: "A student subscribes to topic home/floor1/+/temperature. Which of the following topics will NOT deliver messages to this subscriber?",
                options: ["home/floor1/bedroom/temperature", "home/floor1/kitchen/temperature", "home/floor1/bathroom/temperature", "home/floor1/room2/sensor/temperature"],
                answerIndex: 3
              },
              {
                question: "A smart irrigation system uses MQTT. Each field zone publishes soil moisture to farm/zone{N}/moisture. A central controller subscribes and publishes watering commands back. The internet connection is unreliable. Which MQTT feature ensures the controller immediately knows the last moisture reading when it reconnects?",
                options: ["Keep-alive packets preserve the last reading in transit buffers", "LWT automatically republishes the last sensor reading on reconnect", "Retained messages — each zone publishes with retain=true so the broker stores the last moisture value and delivers it to the controller immediately upon resubscription without waiting for the next publish cycle", "QoS 2 stores messages in the broker queue for offline clients indefinitely"],
                answerIndex: 2
              },
              {
                question: "A student's Arduino MQTT client disconnects from the broker every 5 minutes exactly. The keep-alive interval is set to 60 seconds. What is the most likely cause?",
                options: ["The MQTT broker is configured to reject connections from microcontrollers", "The broker's keep-alive timeout fires because the Arduino is not calling client.loop() frequently enough — without regular loop() calls the PINGREQ is not sent, the broker sees a timeout at the keep-alive interval, and drops the connection", "The QoS level is set too high causing connection resets", "The DHT22 sensor interferes with the WiFi signal causing disconnections"],
                answerIndex: 1
              }
            ],
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
          desc: "Implement HTTP GET and POST requests from an ESP8266/ESP32 to a remote server. Send sensor data as JSON payload via HTTP POST to a free REST API endpoint (webhook.site or similar). Parse HTTP response and act on server commands. Understand request-response cycle and status codes. Simulate on Wokwi.\n\nSolve: http://localhost:8080/workspace?exp=iot-m3-2", 
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
            pretest: [
              {
                question: "What is the fundamental difference between HTTP and MQTT communication models?",
                options: ["HTTP uses UDP while MQTT uses TCP", "HTTP follows a request/response model where the client initiates every exchange and must poll for new data; MQTT follows a publish/subscribe model where the broker pushes data to subscribers instantly", "HTTP is encrypted by default while MQTT is unencrypted", "HTTP supports only text data while MQTT supports binary"],
                answerIndex: 1
              },
              {
                question: "An IoT device sends temperature data to a cloud server. Which HTTP method and status code pair correctly represents a successful new data upload?",
                options: ["GET request → 200 OK", "POST request → 201 Created", "PUT request → 200 OK", "DELETE request → 204 No Content"],
                answerIndex: 1
              },
              {
                question: "An ESP8266 firmware makes an HTTP POST to upload sensor data every 30 seconds. The server is temporarily down. The http.POST() call returns -1. What should the firmware do?",
                options: ["Immediately reset the ESP8266 via watchdog timer", "Log the failure to Serial Monitor, increment a retry counter, and attempt reconnection after a delay — do not block indefinitely as this prevents sensor readings from continuing", "Stop making HTTP requests permanently until reflashed", "Switch to HTTP GET requests as a fallback"],
                answerIndex: 1
              },
              {
                question: "A student hardcodes the server URL in firmware. The server IP address changes. What is the better design pattern?",
                options: ["Hardcode multiple fallback IP addresses in firmware", "Fetch the server endpoint from a configuration GET request on startup or store it in EEPROM so it can be updated over the network without reflashing firmware", "Use DNS with a fixed domain name stored in EEPROM and resolve it on each request", "Hardcoding is acceptable because server IPs never change in production"],
                answerIndex: 1
              },
              {
                question: "What does HTTP status code 401 indicate when an IoT device receives it from a cloud API?",
                options: ["The server successfully received the data but could not store it", "The request was unauthorized — the device's API key or authentication token is missing, expired, or invalid", "The server endpoint URL is incorrect", "The JSON payload was malformed"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Set Up Local Express REST API Server on Node.js handling POST /api/data and GET /api/config.",
              "Step 2: Set Up Wokwi Simulation. Add ESP8266 and DHT22.",
              "Step 3: Write Configuration Fetch Firmware. Connect to WiFi, send GET to API, parse JSON to extract settings like upload interval.",
              "Step 4: Write Sensor Upload Firmware. Build JSON payload of temperature data and POST it to the API.",
              "Step 5: Test Complete Data Flow. Verify data arrives at the server console.",
              "Step 6: Test Error Handling. Stop the server and verify the ESP8266 gracefully handles connection failure without crashing."
            ],
            posttest: [
              {
                question: "A weather station uploads data every 60 seconds using HTTP POST. It must also receive configuration updates from a server. What is the most efficient approach?",
                options: ["Open a permanent HTTP connection to the server and listen for config changes", "Run a second HTTP server on the ESP8266 to receive incoming POST requests from the cloud", "Include the latest configuration as a JSON response body in the 201 reply to each data POST — the device reads the response and applies any updated config, eliminating a separate GET request", "Use HTTP long-polling — hold the POST connection open until the server responds with new config"],
                answerIndex: 2
              },
              {
                question: "An IoT device uploads to a public cloud API using HTTP. The API key is hardcoded in firmware. A competitor reverse-engineers the firmware and extracts the key. What is the correct secure design?",
                options: ["Encrypt the API key with Base64 encoding before storing in firmware", "Store credentials in a secure element or provision them at manufacturing time via a certificate-based mutual TLS handshake — never hardcode API keys in firmware that can be extracted", "Use a shorter API key that is harder to find in binary", "Switch from HTTP to MQTT which encrypts API keys automatically"],
                answerIndex: 1
              },
              {
                question: "An ESP8266 makes 48 HTTP POST requests per day (every 30 minutes). Each request uses a new TCP connection. A developer changes to HTTP keep-alive persistent connections. What is the primary benefit?",
                options: ["Data payloads become smaller because headers are not repeated", "TCP connection establishment overhead (three-way handshake) is eliminated for subsequent requests reducing latency and power consumption — critical for battery-powered IoT devices", "The server can push data to the device without polling", "JSON payloads are automatically compressed"],
                answerIndex: 1
              },
              {
                question: "A student uses HTTP GET to send sensor data by encoding values in the URL: GET /data?temp=27.3&hum=58.5. A senior engineer asks them to change to HTTP POST with a JSON body. Why?",
                options: ["GET requests are not supported by ESP8266", "POST with JSON body is more appropriate — GET requests encode data in the URL which has length limits, is logged in server access logs, appears in browser history, and is cached by proxies — sensor data is a resource creation action (POST semantics) not a retrieval", "JSON cannot be parsed from URL query parameters", "GET requests do not support authentication headers"],
                answerIndex: 1
              },
              {
                question: "An IoT fleet of 10,000 devices all send HTTP POST requests to a single server every 30 seconds. The server struggles under load. What architectural change best addresses this?",
                options: ["Reduce upload frequency to every 5 minutes for all devices", "Migrate to MQTT — a single broker handles 10,000 persistent connections efficiently routing all messages with minimal per-message overhead, far better than 10,000 devices each establishing new HTTP TCP connections every 30 seconds", "Add more CPU cores to the HTTP server", "Switch from JSON to XML payloads to reduce processing overhead"],
                answerIndex: 1
              }
            ],
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
          desc: "Implement a WebSocket server on ESP8266/ESP32. Connect from a browser-based WebSocket client. Send real-time sensor data from device to browser without polling. Implement bidirectional control — browser sends commands, device responds with sensor readings. Simulate on Wokwi.\n\nSolve: http://localhost:8080/workspace?exp=iot-m3-3", 
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
            pretest: [
              {
                question: "What is the key difference between WebSocket and HTTP that makes WebSocket suitable for real-time IoT dashboards?",
                options: ["WebSocket uses UDP for faster delivery while HTTP uses TCP", "WebSocket establishes a persistent full-duplex TCP connection where the server can push data to the browser immediately without waiting for a client request, eliminating the latency and overhead of HTTP polling", "WebSocket automatically compresses JSON data while HTTP does not", "WebSocket connections are more secure than HTTP because they use a different encryption algorithm"],
                answerIndex: 1
              },
              {
                question: "After the WebSocket handshake what HTTP status code does the server send to confirm the protocol upgrade?",
                options: ["200 OK", "301 Moved Permanently", "101 Switching Protocols", "201 Created"],
                answerIndex: 2
              },
              {
                question: "A browser dashboard uses HTTP polling every 500ms to check for new sensor data from an ESP8266. The developer replaces it with WebSocket. What is the primary benefit?",
                options: ["WebSocket allows the dashboard to store data locally in the browser", "WebSocket eliminates the 500ms polling delay and HTTP overhead — sensor data is pushed to the browser instantly as it changes with minimal per-message overhead, reducing both latency and unnecessary network traffic", "WebSocket automatically formats data as a table in the browser", "WebSocket is encrypted by default while HTTP polling is not"],
                answerIndex: 1
              },
              {
                question: "A WebSocket server on ESP8266 has three browser clients connected simultaneously. The firmware calls webSocket.broadcastTXT(payload). What happens?",
                options: ["Only the most recently connected client receives the message", "The message is sent to the broker which forwards it to all clients", "All three connected browser clients receive the same message simultaneously", "The ESP8266 sends the message three times sequentially creating network congestion"],
                answerIndex: 2
              },
              {
                question: "Under what condition should a developer choose MQTT over WebSocket for an IoT system?",
                options: ["When a browser dashboard needs to display live data", "When a single ESP8266 needs to communicate with a single browser", "When hundreds of IoT devices need to share data with multiple subscribers and a central broker is needed for routing, authentication, retained messages, and QoS guarantees — MQTT's broker architecture scales far better than point-to-point WebSocket for device-to-device messaging", "When the communication must be full-duplex"],
                answerIndex: 2
              }
            ],
            procedure: [
              "Step 1: Set Up ESP8266 WebSocket Server on Wokwi.",
              "Step 2: Write ESP8266 Firmware to start HTTP Server on port 80 and WebSocket Server on port 81. Use webSocket.broadcastTXT() to send data to all clients.",
              "Step 3: Build Browser Dashboard HTML/JS establishing a WebSocket connection to the ESP8266.",
              "Step 4: Connect and Test. Open the browser to the ESP8266's IP. Observe real-time updates without polling.",
              "Step 5: Test Multi-Client Broadcasting by opening multiple browser tabs simultaneously.",
              "Step 6: Test Disconnection Handling by closing and reopening tabs."
            ],
            posttest: [
              {
                question: "A factory robot sends its position (X, Y, angle) 30 times per second to a control dashboard. Which protocol is most appropriate and why?",
                options: ["HTTP POST — reliable and widely supported", "MQTT — low overhead and broker handles routing", "WebSocket — the persistent full-duplex connection eliminates HTTP connection overhead for high-frequency streaming, delivers sub-10ms latency, and allows the dashboard to send control commands back simultaneously on the same connection", "UDP — fastest because there is no connection overhead"],
                answerIndex: 2
              },
              {
                question: "A student's ESP8266 WebSocket server crashes after a few minutes when multiple browsers connect. What is the most likely memory-related cause?",
                options: ["WebSocket uses too much CPU leaving no resources for WiFi", "Each broadcast allocates a new String object without freeing memory — String fragmentation in Arduino C++ heap causes memory exhaustion; solution is to use fixed char arrays or StaticJsonDocument with stack allocation instead of heap", "The WebSocket library is incompatible with multiple clients", "The ESP8266 only supports one simultaneous connection"],
                answerIndex: 1
              },
              {
                question: "A WebSocket connection between browser and ESP8266 disconnects every time the router is rebooted. The dashboard shows stale data indefinitely. What must the JavaScript client implement?",
                options: ["A backup HTTP polling fallback that activates when WebSocket fails", "An onclose event handler that implements automatic reconnection with exponential backoff — attempting to reconnect after 1s, 2s, 4s, 8s... to restore the connection without user intervention", "A page refresh on disconnect using window.location.reload()", "A second simultaneous WebSocket connection as a hot standby"],
                answerIndex: 1
              },
              {
                question: "A developer argues that MQTT with a WebSocket transport (MQTT over WS, port 9001) combines the benefits of both protocols. What does this mean?",
                options: ["It is technically impossible to run MQTT over WebSocket", "MQTT brokers like Mosquitto support WebSocket transport meaning browser JavaScript clients can connect via a native WebSocket connection while still using MQTT publish/subscribe semantics — combining browser-native connectivity with MQTT's QoS, retained messages, and topic routing", "MQTT over WebSocket is only supported by commercial brokers", "It means using WebSocket for sensor data and MQTT for commands on the same device"],
                answerIndex: 1
              },
              {
                question: "A live sensor dashboard updates every 100ms via WebSocket. A user on a mobile network with 200ms latency opens the dashboard. What is the effective update rate they experience and what design change improves perceived responsiveness?",
                options: ["They experience 10 updates per second — no design change is needed", "They experience updates every 300ms (100ms broadcast interval + 200ms network latency); implement client-side interpolation — the browser estimates intermediate values between received data points to render smooth animation at the target rate regardless of network conditions", "Reduce the broadcast interval to 50ms to compensate for latency", "WebSocket automatically buffers and replays missed frames for mobile clients"],
                answerIndex: 1
              }
            ],
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
          desc: "Implement ESP-NOW peer-to-peer communication between two ESP32 devices. One device acts as a sensor node (transmitter) sending temperature readings. Second device acts as a display node (receiver) showing received data on an OLED display. No Wi-Fi router required. Simulate on Wokwi with two ESP32 instances.\n\nSolve: http://localhost:8080/workspace?exp=iot-m3-4", 
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
            pretest: [
              {
                question: "Why does ESP-NOW not require a WiFi router while standard WiFi MQTT communication does?",
                options: ["ESP-NOW uses a different radio frequency that bypasses routers", "ESP-NOW communicates directly between devices using MAC addresses at the WiFi chip layer without establishing a WiFi network association — devices talk directly like walkie-talkies rather than routing messages through a central access point", "ESP-NOW uses Bluetooth instead of WiFi", "ESP-NOW requires a cloud server instead of a local router"],
                answerIndex: 1
              },
              {
                question: "What is the maximum payload size per ESP-NOW packet?",
                options: ["1024 bytes", "512 bytes", "250 bytes", "64 bytes"],
                answerIndex: 2
              },
              {
                question: "A battery-powered ESP8266 sensor needs to transmit temperature data every 5 minutes and then sleep. Which protocol minimizes power consumption?",
                options: ["WiFi MQTT — the broker maintains the connection while the device sleeps", "HTTP POST — stateless connections are more power efficient", "ESP-NOW — the device wakes from deep sleep, transmits a 250-byte packet in under 1 millisecond to the gateway MAC address with no connection setup overhead, then returns to deep sleep — consuming active radio power for less than 10ms total", "WebSocket — persistent connections eliminate reconnection power cost"],
                answerIndex: 2
              },
              {
                question: "Two ESP8266 devices communicate via ESP-NOW. The receiver is out of range. What does the sender's send callback report?",
                options: ["The packet is queued and retransmitted when the receiver returns to range", "ESP_NOW_SEND_FAIL — ESP-NOW is connectionless and has no acknowledgment retry mechanism beyond the single MAC-layer ACK; if the receiver is out of range the send callback reports failure immediately", "The packet is silently dropped with no callback notification", "ESP-NOW automatically switches to WiFi MQTT as a fallback"],
                answerIndex: 1
              },
              {
                question: "A student wants to send ESP-NOW messages to all nearby ESP8266 devices without knowing their MAC addresses. What addressing mode should they use?",
                options: ["Unicast with IP broadcast address 255.255.255.255", "Register each device individually with their specific MAC address", "Use the broadcast MAC address FF:FF:FF:FF:FF:FF as the peer — ESP-NOW will deliver the packet to all nearby ESP8266 devices listening on the same WiFi channel regardless of their specific MAC address", "Use DNS multicast to resolve all nearby ESP8266 hostnames"],
                answerIndex: 2
              }
            ],
            procedure: [
              "Step 1: Find Receiver MAC Address. Upload a sketch to the first device that prints its MAC address.",
              "Step 2: Configure Sender Wokwi Project. Add DHT22 and set the receiver's MAC address in the code.",
              "Step 3: Write Sender Firmware. Initialize ESP-NOW, add peer, register send callback, and send DHT22 data periodically.",
              "Step 4: Write Receiver Firmware. Initialize ESP-NOW, register receive callback, and parse incoming struct.",
              "Step 5: Simulate Both Devices simultaneously in two browser tabs.",
              "Step 6: Test Bidirectional Communication by sending an ACK back to the sender."
            ],
            posttest: [
              {
                question: "A student deploys 50 ESP8266 soil moisture sensors across a farm. Each sensor transmits data every 10 minutes via ESP-NOW to a single gateway. The gateway uploads aggregated data to a cloud MQTT broker. What are two advantages of this architecture over 50 individual WiFi-connected sensors?",
                options: ["Sensors can use simple ESP-NOW with deep sleep between transmissions — active radio time under 10ms vs several seconds for WiFi association — dramatically extending battery life. The gateway concentrates WiFi infrastructure cost on a single device eliminating 50 individual router registrations and IP assignments", "ESP-NOW transmits faster data than WiFi", "The cloud broker directly communicates with each ESP-NOW sensor", "ESP-NOW is more secure than WiFi by default"],
                answerIndex: 0
              },
              {
                question: "An ESP-NOW sender's onDataSent callback receives ESP_NOW_SEND_FAIL for a specific peer. What are two possible causes?",
                options: ["The receiver is out of ESP-NOW range OR the receiver's ESP-NOW receive callback is not registered correctly — in both cases the MAC-layer ACK is not received by the sender within the timeout window causing the send failure status", "The payload exceeds 512 bytes", "The sender has not connected to a WiFi router", "ESP-NOW requires both devices to use the same WiFi password"],
                answerIndex: 0
              },
              {
                question: "An ESP-NOW gateway receives packets from 30 sensor nodes. The firmware stores each sensor's last reading in a global array indexed by sender MAC address. The gateway then formats all 30 readings as JSON and publishes to MQTT every 60 seconds. What design problem exists with this architecture as the number of nodes scales to 200?",
                options: ["ESP-NOW only supports 20 registered peers — a mesh relay layer is needed where sensor nodes relay each other's packets to the gateway extending the peer limit and range", "JSON cannot represent more than 100 sensor readings", "MQTT cannot subscribe to topics from ESP-NOW gateways", "ESP-NOW bandwidth is too low for 200 sensors"],
                answerIndex: 0
              },
              {
                question: "A developer compares ESP-NOW and LoRa for an IoT system spanning a 5km agricultural field. Which protocol should they choose and why?",
                options: ["ESP-NOW — it is simpler to program on ESP8266", "LoRa — ESP-NOW's 200-meter range is insufficient for a 5km field; LoRa's 2-15km range at the cost of higher latency (50-500ms) and lower bandwidth is the appropriate choice when long range is the primary requirement and real-time response is not critical", "ESP-NOW with signal amplifiers to extend range", "Both protocols have identical range specifications"],
                answerIndex: 1
              },
              {
                question: "A student implements a bidirectional ESP-NOW link where both devices simultaneously send and receive. The firmware calls esp_now_send() inside the onDataRecv callback. What problem does this cause?",
                options: ["ESP-NOW does not support bidirectional communication", "Calling esp_now_send() inside the receive callback can cause stack overflow or undefined behavior because the callback runs in a WiFi interrupt context — the correct approach is to set a flag in the callback and call esp_now_send() from the main loop() where the stack is safe", "The receiver automatically disables transmission after receiving a packet", "Both devices transmit simultaneously causing a permanent collision state"],
                answerIndex: 1
              }
            ],
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
          desc: "Connect an ESP8266/ESP32 to ThingSpeak cloud platform. Send temperature and humidity data from DHT22 sensor every 15 seconds. Create a ThingSpeak channel with two fields. Build a real-time line chart dashboard on ThingSpeak showing live sensor readings. Simulate device on Wokwi, cloud on ThingSpeak.\n\nSolve: http://localhost:8080/workspace?exp=iot-m4-1", 
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
            pretest: [
              {
                question: "An ESP8266 publishes temperature data to an MQTT broker every 5 seconds. A Node-RED dashboard subscribes to the same topic. What happens if the broker goes offline for 30 seconds?",
                options: ["The ESP8266 stores readings locally and replays them when the broker reconnects", "The dashboard freezes on the last received value — no updates appear; the ESP8266 publish calls fail silently or with connection error; upon broker restart the MQTT client reconnects and resumes live updates without historical gap recovery", "Node-RED automatically switches to a backup broker", "The ESP8266 switches to HTTP POST as a fallback protocol"],
                answerIndex: 1
              },
              {
                question: "A developer wants to display the last 1 hour of temperature readings as a continuous line chart. What must the Node-RED chart widget receive for each data point?",
                options: ["Only the temperature value — Node-RED timestamps data automatically", "A JSON object with both a value field and an x (timestamp) field so the chart can correctly position data points on the time axis", "An array of all historical readings sent in a single MQTT message", "The topic name is used as the x-axis label"],
                answerIndex: 1
              },
              {
                question: "What is the correct MQTT QoS level for a real-time dashboard displaying non-critical temperature readings that update every 5 seconds?",
                options: ["QoS 0 (fire and forget) — occasional missed readings are acceptable for high-frequency sensor data and QoS 0 has the lowest overhead", "QoS 2 (exactly once) — every reading must be delivered precisely once", "QoS 1 with retain flag — ensures the dashboard always shows the last value", "QoS 3 — highest reliability for real-time systems"],
                answerIndex: 0
              }
            ],
            procedure: [
              "Step 1: Install Node-RED and node-red-dashboard.",
              "Step 2: Configure MQTT Broker Node using broker.hivemq.com.",
              "Step 3: Add JSON Parse Node to convert incoming string payload to a JavaScript object.",
              "Step 4: Build Dashboard Widgets (Gauge, Chart, LED, Text) and wire function nodes.",
              "Step 5: Write and Upload ESP8266 Firmware to read DHT22 and publish to the topic as JSON. Observe dashboard."
            ],
            posttest: [
              {
                question: "A student notices the Node-RED line chart shows duplicate data points at irregular intervals. What is the most likely cause?",
                options: ["The MQTT broker is sending each message twice", "QoS 1 guarantees at-least-once delivery — if the broker does not receive the PUBACK from Node-RED within the timeout it retransmits the message resulting in duplicate chart points; switching to QoS 0 eliminates duplicates at the cost of potential loss", "The DHT22 sensor sends two readings per cycle", "Node-RED chart nodes always buffer and deduplicate incoming messages"],
                answerIndex: 1
              },
              {
                question: "A dashboard must alert operators when temperature exceeds 40°C for more than 3 consecutive readings. How should this logic be implemented in Node-RED?",
                options: ["Set the gauge widget maximum to 40°C and it automatically triggers alerts", "Use a function node that maintains a counter in context storage — increment when temp > 40°C, reset when temp <= 40°C, and trigger the ui_notification node only when the counter reaches 3", "Connect a trigger node directly to the MQTT input node", "The MQTT broker handles threshold logic server-side"],
                answerIndex: 1
              }
            ],
            references: [
              "Node-RED Documentation: https://nodered.org/docs/",
              "HiveMQ Public Broker: https://www.hivemq.com/public-mqtt-broker/"
            ]
          }
        },
        { 
          id: "iot-m4-2", 
          title: "Experiment 4.2 — Data Logging", 
          desc: "Implement continuous sensor data logging to ThingSpeak or Google Sheets via IFTTT. Store timestamped temperature, humidity, and LDR readings. Download historical data as CSV. Perform basic statistics (min, max, average) using ThingSpeak MATLAB analysis. Simulate device on Wokwi.\n\nSolve: http://localhost:8080/workspace?exp=iot-m4-2", 
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
            pretest: [
              {
                question: "Why is a relational database like MySQL a poor choice for storing IoT sensor data at high ingestion rates compared to InfluxDB?",
                options: ["MySQL cannot store floating-point numbers accurately", "Relational databases use row-based storage with transaction overhead per insert — at 10,000 inserts per second the lock contention and B-tree index updates severely degrade write throughput. InfluxDB uses columnar time-sorted storage with batched writes optimized for the append-only, time-ordered insert pattern of sensor data", "MySQL does not support timestamps", "InfluxDB supports more data types than MySQL"],
                answerIndex: 1
              },
              {
                question: "A student configures a Telegraf MQTT consumer with topic iot/lab/+/data. Which of the following topics will NOT be captured?",
                options: ["iot/lab/sensor01/data", "iot/lab/sensor99/data", "iot/lab/esp8266/data", "iot/lab/room1/sensor01/data — the single-level wildcard + matches exactly one topic level, so two sub-levels between lab and data will not match; the # multi-level wildcard would be required"],
                answerIndex: 3
              },
              {
                question: "An InfluxDB bucket has a retention policy of 7 days. What happens to data logged 8 days ago?",
                options: ["It is compressed and moved to cold storage automatically", "It is permanently deleted by InfluxDB's background compaction process — retention policies are hard deletes not archives; data older than the policy duration is irrecoverably purged unless separately archived before expiry", "It is moved to a separate 'expired' bucket", "Queries return null values for expired data points"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Install and Configure InfluxDB. Create an organization, bucket, and API token.",
              "Step 2: Configure Telegraf with MQTT consumer input and InfluxDB v2 output.",
              "Step 3: Flash ESP8266 Firmware to publish JSON payloads.",
              "Step 4: Query Logged Data using Flux query language.",
              "Step 5: Connect Grafana and create a dashboard panel."
            ],
            posttest: [
              {
                question: "A student's InfluxDB query returns no results even though Telegraf shows successful writes. What is the most likely cause?",
                options: ["InfluxDB does not support JSON data from MQTT", "The Flux query time range does not overlap the write timestamps — for example range(start: -1h) will miss data written more than 1 hour ago; adjusting the range to -24h would reveal the data if it exists within the retention period", "Telegraf writes to a different database by default", "InfluxDB requires data to be committed before it can be queried"],
                answerIndex: 1
              },
              {
                question: "An IoT deployment logs GPS coordinates (latitude, longitude) alongside sensor readings. Should coordinates be stored as InfluxDB tags or fields, and why?",
                options: ["Tags — coordinates are metadata that identify device location", "Fields — GPS coordinates are high-cardinality floating-point values; storing them as tags (which are indexed strings) would cause tag cardinality explosion degrading query performance; fields are unindexed and ideal for high-cardinality numeric values that are not used as filter keys", "Both tags and fields simultaneously for maximum query flexibility", "GPS coordinates should be stored in a separate relational database"],
                answerIndex: 1
              }
            ],
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
          desc: "Build a complete remote monitoring system using Adafruit IO. Create feeds for temperature, humidity, and motion status. Build an Adafruit IO dashboard with gauges, line charts, and status indicators. Access the dashboard from a mobile browser to monitor sensor readings remotely in real time. Simulate device on Wokwi.\n\nSolve: http://localhost:8080/workspace?exp=iot-m4-3", 
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
            pretest: [
              {
                question: "An application queries the Device Shadow of an ESP8266 that has been offline for 2 hours. What does it receive?",
                options: ["An error indicating the device is offline", "The last reported state that the device published before going offline — the shadow persists the most recent reported state indefinitely regardless of device connectivity, allowing applications to always retrieve the last known values", "An empty shadow document", "AWS IoT Core automatically polls the device when queried"],
                answerIndex: 1
              },
              {
                question: "A developer pushes a desired state change to set an ESP8266's sampling interval to 60 seconds. The device is currently offline. What happens when it reconnects?",
                options: ["The desired state change is lost if the device was offline when it was published", "Upon reconnection the device receives the shadow delta document containing the pending desired changes and should update its configuration to match; the delta mechanism ensures devices converge to the desired state even after extended offline periods", "The device must explicitly request configuration updates after reconnecting", "AWS IoT Core retransmits the desired state only if the device requests it within 5 minutes"],
                answerIndex: 1
              },
              {
                question: "Why does AWS IoT Core use X.509 certificates rather than username/password authentication for device connections?",
                options: ["X.509 certificates are simpler to manage than passwords", "Certificates provide per-device identity and mutual authentication without shared secrets — if a password database is compromised all devices are at risk, but a certificate compromise affects only the one device whose private key is exposed, and the certificate can be individually revoked", "MQTT does not support username/password authentication", "Username/password authentication requires internet connectivity"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Create AWS IoT Thing and generate certificates.",
              "Step 2: Configure ESP8266 Firmware with endpoint, certificate, private key, and Root CA.",
              "Step 3: Implement Telemetry Publishing to publish JSON readings and update shadow reported state.",
              "Step 4: Subscribe to Shadow Delta to parse and apply configuration changes.",
              "Step 5: Test Remote Monitoring using AWS IoT Core MQTT test client and Device Shadow console."
            ],
            posttest: [
              {
                question: "An ESP8266 publishes telemetry every 10 seconds to AWS IoT Core. The device has a 1-year deployment lifespan. Approximately how many MQTT messages will be published?",
                options: ["Approximately 315,000 messages — 6 per minute × 60 minutes × 24 hours × 365 days = 3,153,600 annual messages at 10-second intervals; AWS IoT Core pricing is per message so this calculation directly impacts deployment cost", "Approximately 86,400 messages", "Approximately 52,560 messages", "Message count is irrelevant as AWS IoT Core is a flat-rate service"],
                answerIndex: 0
              },
              {
                question: "What is the purpose of the AWS IoT Core Rules Engine in a remote monitoring architecture?",
                options: ["It filters out malformed MQTT messages before delivery to devices", "Rules Engine evaluates SQL-like queries against incoming MQTT messages and triggers actions — routing messages to DynamoDB for storage, invoking Lambda functions for analytics, sending SNS alerts on threshold conditions — enabling serverless IoT data pipelines without custom backend infrastructure", "It manages X.509 certificate issuance and renewal automatically", "It provides the Device Shadow synchronization mechanism"],
                answerIndex: 1
              }
            ],
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
          desc: "Configure ThingSpeak ThingAlerts or Adafruit IO triggers to send an email or notification when sensor values cross defined thresholds. Implement temperature alert above 35°C, humidity alert above 80%, and motion detection alert. Test alert delivery end-to-end. Simulate sensor data using Wokwi with tunable values.\n\nSolve: http://localhost:8080/workspace?exp=iot-m4-4", 
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
            pretest: [
              {
                question: "A temperature alert is configured to trigger above 40°C with no hysteresis. The sensor reports: 39.9, 40.1, 39.8, 40.2, 39.9. How many alert notifications are sent?",
                options: ["1 — only the first breach triggers an alert", "2 — stateful alerting fires once and clears once", "2 notifications for the two readings above 40°C (40.1 and 40.2) — without hysteresis every individual reading above threshold generates an alert event in a stateless alerting system", "0 — the threshold has not been exceeded for a sustained period"],
                answerIndex: 2
              },
              {
                question: "What is the purpose of a dead-band in IoT alert configuration?",
                options: ["It defines the time window during which alerts are suppressed after midnight", "A dead-band establishes separate trigger and clear thresholds with a gap between them — preventing alert flapping when sensor values oscillate near a single threshold boundary, reducing notification volume and alert fatigue", "It limits the maximum number of alerts per hour", "It defines the minimum time between successive sensor readings"],
                answerIndex: 1
              },
              {
                question: "An SNS topic has two subscriptions: email (filter: all severities) and SMS (filter: CRITICAL only). A WARNING temperature alert is published. What happens?",
                options: ["Both email and SMS subscribers receive the notification", "Only the email subscriber receives the notification — the SMS subscription filter policy rejects WARNING severity messages; SNS filter policies evaluate each subscription independently allowing fine-grained routing without modifying the publisher", "Neither subscriber receives the notification because WARNING requires acknowledgment", "The message is held in the SNS topic until a CRITICAL alert is also published"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Design Alert State Machine with thresholds and hysteresis bands.",
              "Step 2: Configure AWS IoT Core Rule to publish to an SNS topic on threshold breach.",
              "Step 3: Configure SNS Topic and Subscriptions with filter policies.",
              "Step 4: Implement Node-RED Alert Flow with routing by severity.",
              "Step 5: Implement Alert Acknowledgment via dashboard button."
            ],
            posttest: [
              {
                question: "An operator receives 200 WARNING emails in one hour because a sensor oscillates between 37.5°C and 38.5°C. How should the alerting system be modified to address this?",
                options: ["Increase the WARNING threshold to 42°C to reduce sensitivity", "Implement two changes: add hysteresis so WARNING clears at 36°C (not 38°C) eliminating oscillation-driven flapping; and switch to stateful alerting so one email is sent on the initial WARNING trigger and another on the subsequent clear event regardless of how many threshold crossings occur", "Switch from email to SMS to reduce alert volume", "Increase sensor sampling interval to 60 seconds"],
                answerIndex: 1
              },
              {
                question: "A student implements a trend-based alert that fires when temperature increases by more than 5°C per minute. What two data points does the alert logic require?",
                options: ["The maximum and minimum temperatures in the current hour", "The current temperature reading and the temperature reading from exactly 60 seconds ago — the rate of change is (current_temp - previous_temp) / elapsed_seconds * 60; this requires the alerting function to store previous readings with their timestamps in context storage", "The current reading and the long-term average temperature", "Two consecutive readings regardless of the time interval between them"],
                answerIndex: 1
              },
              {
                question: "A production IoT system sends CRITICAL alerts via AWS SNS email to a team of 10 engineers. The sensor malfunctions and generates 500 CRITICAL readings in 5 minutes. What mechanism should prevent 500 individual emails from being sent?",
                options: ["AWS SNS automatically deduplicates identical messages", "Implement alert deduplication at the IoT Rules Engine level using a stateful function (AWS Lambda with DynamoDB) that tracks alert state per device — new CRITICAL emails are suppressed until the alert is cleared and re-triggered, converting 500 readings into 1 alert email and 1 clear email", "Set SNS subscription filter to maximum 10 messages per hour", "The email provider's spam filter will suppress duplicate alerts automatically"],
                answerIndex: 1
              }
            ],
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
          desc: "Interface a capacitive soil moisture sensor with ESP8266/ESP32. Read raw ADC values and convert to percentage moisture level. Display readings on Serial Monitor and an OLED display. Send moisture data to ThingSpeak for remote monitoring. Simulate on Wokwi with potentiometer representing moisture sensor output.\n\nSolve: http://localhost:8080/workspace?exp=iot-m5-1", 
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
            pretest: [
              {
                question: "Why do capacitive soil moisture sensors last longer than resistive sensors in field deployments?",
                options: ["Capacitive sensors are made from more durable materials", "Capacitive sensors measure dielectric permittivity without passing current through the soil — eliminating electrolytic corrosion of the electrodes that rapidly degrades resistive sensors in moist environments", "Capacitive sensors operate at lower voltages", "Capacitive sensors are coated with waterproof resin"],
                answerIndex: 1
              },
              {
                question: "An ESP8266 ADC reads 750 with dry soil and 300 with fully saturated soil. What is the moisture percentage when ADC reads 525?",
                options: ["25%", "50%", "75%", "30%"],
                answerIndex: 1
              },
              {
                question: "Why must soil moisture sensors be calibrated per soil type rather than using universal constants?",
                options: ["Different soils have different dielectric properties — clay, loam, and sandy soils hold water differently, producing different ADC values at the same actual water content, requiring individual dry and wet calibration readings per deployment environment", "Sensor hardware varies between manufacturers", "ESP8266 ADC values change with temperature", "Calibration is only needed for resistive sensors"],
                answerIndex: 0
              },
              {
                question: "A soil moisture sensor reads 18% moisture. What automated action should the irrigation controller trigger?",
                options: ["Suspend irrigation — soil is sufficiently moist", "Activate the irrigation pump — moisture is below the 30% dry threshold requiring immediate watering", "Send a flood warning alert", "No action — 18% is within the optimal range"],
                answerIndex: 1
              },
              {
                question: "A farmer wants to monitor soil moisture across 10 field zones from a central dashboard. Which IoT architecture is most appropriate?",
                options: ["Each sensor connects directly to the cloud via individual WiFi", "Sensors transmit via ESP-NOW to a field gateway which aggregates all 10 readings and publishes to an MQTT broker for dashboard visualization", "Sensors store data on SD cards for weekly manual retrieval", "A single sensor in the center of the field represents all zones"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Hardware Setup in Wokwi. Add ESP8266, soil moisture sensor (potentiometer), OLED display, and a red LED.",
              "Step 2: Calibration Constants. Define DRY_VALUE = 750 and WET_VALUE = 300.",
              "Step 3: Write Sensor Reading Firmware. Read A0, map raw value to 0–100% moisture, constrain to valid range, and print to Serial Monitor.",
              "Step 4: Implement Alert Logic. If moisture < 30 turn on red LED and display DRY status. If moisture > 60 turn off LED and display MOIST status.",
              "Step 5: MQTT Transmission. Connect to WiFi and publish moisture percentage to an MQTT topic.",
              "Step 6: Simulate and Observe. Adjust the potentiometer to simulate soil conditions and view results."
            ],
            posttest: [
              {
                question: "A student notices the soil moisture sensor reads 105% after heavy rain. What code fix resolves this?",
                options: ["Replace the sensor with a higher-range model", "Use constrain(moisturePercent, 0, 100) to clamp the mapped value within valid bounds — ADC values beyond the WET_VALUE calibration point would otherwise produce out-of-range percentages", "Increase the WET_VALUE calibration constant", "Add a waterproof casing to the sensor"],
                answerIndex: 1
              },
              {
                question: "The farmer reports that the irrigation pump activates briefly even when soil is moist due to sensor noise fluctuations around the 30% threshold. What software solution eliminates this?",
                options: ["Replace the capacitive sensor with a resistive sensor", "Implement hysteresis — set the irrigation ON threshold at 25% and the OFF threshold at 35% so the pump only activates when moisture drops clearly below 25% and only deactivates when it recovers clearly above 35%, preventing rapid toggling at the boundary", "Increase the sensor reading interval to once per hour", "Use a hardware low-pass filter on the ADC input"],
                answerIndex: 1
              },
              {
                question: "Soil moisture readings from a field sensor vary by ±8% even with stable soil conditions. What is the most likely cause?",
                options: ["The ESP8266 ADC is inherently noisy — averaging multiple consecutive readings (e.g., 10-sample rolling average) significantly reduces noise-induced variation in the mapped moisture percentage", "The soil moisture is actually fluctuating due to underground water movement", "The WiFi radio interferes with the ADC when transmitting", "The OLED display draws too much current affecting ADC reference voltage"],
                answerIndex: 0
              },
              {
                question: "A precision agriculture system deploys 50 soil moisture sensors across different crop zones. The central dashboard must display each zone's status in real time. What MQTT topic structure best supports zone-level filtering and zone-type grouping?",
                options: ["Single topic: farm/allzones with all sensor data in one JSON payload", "farm/{crop_type}/{zone_id}/moisture — enables dashboard subscribers to filter by crop type (e.g., farm/wheat/+/moisture) or individual zone (e.g., farm/wheat/zone3/moisture) using MQTT wildcard subscriptions", "Sequential numbered topics: sensor1, sensor2, sensor3", "A single retained topic updated by whichever sensor transmitted last"],
                answerIndex: 1
              },
              {
                question: "After three months of field deployment, all soil moisture sensors begin reading systematically higher than actual soil moisture. What is the most likely cause and solution?",
                options: ["ESP8266 firmware degrades over time — reflash all devices", "Sensor electrode coating degradation or mineral salt buildup on the sensor surface shifts the dielectric response — sensors require field recalibration by re-measuring DRY_VALUE and WET_VALUE constants with fresh dry and saturated soil samples at the deployment site", "WiFi interference from nearby devices shifts ADC readings", "MQTT broker clock drift causes timestamp misalignment"],
                answerIndex: 1
              }
            ],
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
          desc: "Build an automatic irrigation controller using soil moisture sensor data. When moisture falls below a dry threshold activate a water pump relay. When moisture rises above a wet threshold deactivate the pump. Add a manual override switch and a status display on LCD. Simulate full circuit on Tinkercad and Wokwi.\n\nSolve: http://localhost:8080/workspace?exp=iot-m5-2", 
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
            pretest: [
              {
                question: "Why does a relay module use active-low logic (LOW = ON) in most ESP8266 irrigation projects?",
                options: ["ESP8266 digital pins output higher current when LOW", "Most relay modules use an NPN transistor driver that pulls the relay coil to ground when the control pin is LOW — matching the ESP8266 which pulls output pins LOW more reliably at 3.3V logic levels", "Active-low logic consumes less power", "HIGH signals interfere with WiFi transmission"],
                answerIndex: 1
              },
              {
                question: "A soil moisture sensor reads 25% (below the 30% dry threshold) but the pump was already running for 6 minutes. The MAX_RUN_TIME is 5 minutes. What should the controller do?",
                options: ["Continue running the pump since soil is still dry", "Deactivate the pump immediately — the safety interlock MAX_RUN_TIME has been exceeded regardless of current moisture reading, preventing field flooding even if the moisture sensor has malfunctioned", "Increase the dry threshold to 20%", "Send an alert and wait for manual override"],
                answerIndex: 1
              },
              {
                question: "Why is it important to implement a minimum off time between irrigation cycles?",
                options: ["Relays require a cool-down period after switching", "Water takes time to distribute through soil — without a minimum off time the pump could rapidly re-activate before soil moisture readings reflect the water just delivered, causing over-irrigation", "MQTT brokers cannot handle rapid state-change messages", "ESP8266 WiFi requires reconnection time between transmissions"],
                answerIndex: 1
              },
              {
                question: "A student connects the relay IN pin directly to the ESP8266 3.3V pin instead of a GPIO pin. What is the result?",
                options: ["The relay activates and deactivates based on WiFi signal strength", "The relay remains permanently ON since the 3.3V pin is always at 3.3V — pump control requires a GPIO pin toggled by firmware logic", "The relay burns out due to overvoltage", "The relay functions normally since 3.3V is within specification"],
                answerIndex: 1
              },
              {
                question: "What MQTT topic structure best supports remote monitoring of both moisture level and pump state on a dashboard?",
                options: ["Single topic farm/status with combined payload", "Separate topics farm/zone1/moisture for sensor data and farm/zone1/pump for actuator state — enabling dashboard panels to subscribe independently and log sensor and actuator data with separate retention policies", "farm/pump/on and farm/pump/off as binary toggle topics", "A REST API endpoint is more appropriate than MQTT for actuator state"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Hardware Setup in Wokwi. Add ESP8266, soil moisture sensor, relay module, LED (simulating pump), and OLED.",
              "Step 2: Define Thresholds and Safety Constants (DRY_THRESHOLD, WET_THRESHOLD, MAX_RUN_TIME, MIN_OFF_TIME).",
              "Step 3: Implement Control Loop. Read moisture every 2 seconds, and evaluate logic to turn pump ON or OFF.",
              "Step 4: Implement Safety Interlock. Track pumpStartTime and force deactivate pump if MAX_RUN_TIME is exceeded.",
              "Step 5: MQTT State Publishing. Publish to 'farm/zone1/moisture' and 'farm/zone1/pump'.",
              "Step 6: Simulate Full Irrigation Cycle. Adjust potentiometer to verify pump activates and deactivates correctly."
            ],
            posttest: [
              {
                question: "The irrigation pump activates and deactivates rapidly every few seconds around the 30% moisture threshold. What two changes fix this?",
                options: ["Implement hysteresis (activate at 25%, deactivate at 40%) AND enforce a minimum off time of 60 seconds — both changes together prevent threshold oscillation and protect the pump motor from rapid switching damage", "Replace the relay with a MOSFET for faster switching", "Increase MQTT publish frequency to reduce dashboard lag", "Use a resistive sensor instead of capacitive"],
                answerIndex: 0
              },
              {
                question: "An irrigation system runs the pump for the full 5-minute MAX_RUN_TIME on every cycle but moisture never rises above 15%. What does this indicate?",
                options: ["The dry threshold is set too high", "The soil sensor is reading incorrectly — or there is a physical problem with the irrigation system such as a blocked pipe, broken pump, or depleted water source — the sensor data and physical physical system should both be inspected", "The MAX_RUN_TIME should be increased to 10 minutes", "MQTT is not publishing pump state correctly"],
                answerIndex: 1
              },
              {
                question: "A student wants the irrigation system to skip activation even when soil is dry if rain is forecast within 6 hours. What additional integration is required?",
                options: ["A second soil moisture sensor measuring rainfall", "Integration with a weather forecast API — the firmware fetches a 6-hour precipitation forecast via HTTP GET and suppresses irrigation activation if rain probability exceeds a configured threshold, saving water and preventing over-saturation", "A mechanical rain gauge connected to an additional analog pin", "MQTT retained messages from a manual weather input topic"],
                answerIndex: 1
              },
              {
                question: "The relay module burns out after two weeks. What is the most likely cause and hardware solution?",
                options: ["Voltage spikes from the ESP8266 GPIO exceeded relay specifications", "The pump motor generates inductive back-EMF spikes when switching that can exceed the relay contact rating over time — adding a flyback diode across the pump motor terminals and selecting a relay with a higher contact current rating than the pump's startup current solves this", "The relay was not rated for 3.3V control signals", "MQTT state messages caused GPIO interference"],
                answerIndex: 1
              },
              {
                question: "A government agricultural program requires the irrigation system to log every pump activation with timestamp, duration, moisture at start, and moisture at stop to a remote database. What architecture change is needed?",
                options: ["Store all logs locally on the ESP8266 EEPROM", "The gateway publishes structured irrigation event payloads to a dedicated MQTT topic (farm/zone1/irrigation_log) which a cloud subscriber consumes and writes to a time-series database — enabling audit trails, water usage reporting, and crop yield correlation analysis", "Email logs to the farmer after each irrigation cycle", "Use HTTP GET requests with query parameters for each log entry"],
                answerIndex: 1
              }
            ],
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
          desc: "Build a complete weather monitoring station using DHT22 (temperature and humidity), BMP280 (barometric pressure and altitude), and LDR (light intensity). Display all readings on a 16x2 LCD. Send all sensor data to ThingSpeak for historical logging and visualization. Simulate on Wokwi.\n\nSolve: http://localhost:8080/workspace?exp=iot-m5-3", 
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
            pretest: [
              {
                question: "A BMP280 pressure sensor reads 1013 hPa at 8AM and 1007 hPa at 11AM. What weather prediction does this 6 hPa/3 hour pressure drop indicate?",
                options: ["Stable conditions — 6 hPa change is within the normal daily variation", "Rapid pressure fall of 2 hPa/hour exceeds the storm threshold — a significant weather deterioration event such as a thunderstorm is likely within 6–12 hours", "Rising pressure — the reading was taken at a lower altitude", "BMP280 sensor drift — recalibrate before interpreting the reading"],
                answerIndex: 1
              },
              {
                question: "Why does a farm-level weather station provide more useful data than the nearest regional weather service?",
                options: ["Farm stations have higher sensor accuracy than national weather services", "Microclimatic conditions within a farm — affected by elevation, topography, vegetation, and soil type — can differ significantly from regional averages; a low-lying field may have 8–10°C colder nighttime temperatures creating frost risk that a regional station 20km away would not detect", "Farm stations transmit data faster via IoT protocols", "National weather services do not cover agricultural areas"],
                answerIndex: 1
              },
              {
                question: "Humidity in a greenhouse reads 87% for 3 consecutive hours. What agricultural risk does this create?",
                options: ["Drought stress — high humidity indicates insufficient irrigation", "Elevated fungal and mold disease risk — most fungal crop pathogens (botrytis, powdery mildew, downy mildew) proliferate rapidly above 80% RH; the system should alert the farmer and activate ventilation or dehumidification", "Sensor malfunction — humidity cannot exceed 80% in an open greenhouse", "Heat stress — high humidity correlates with high temperature"],
                answerIndex: 1
              },
              {
                question: "Why is the LDR connected via a voltage divider rather than directly to A0?",
                options: ["The LDR produces a current output that must be converted to voltage", "The LDR is a variable resistor — without a fixed series resistor forming a voltage divider, the ADC pin would see either near-zero or near-supply voltage with no useful analog range; the voltage divider converts resistance change to a proportional voltage across the ADC's input range", "A0 cannot handle resistive sensor connections", "The voltage divider provides short-circuit protection for the LDR"],
                answerIndex: 1
              },
              {
                question: "A weather station publishes readings every 10 seconds to MQTT. A dashboard chart needs to display a 7-day historical trend. Where should historical data be stored?",
                options: ["In the ESP8266 EEPROM — it holds 4KB of data suitable for 7 days of readings", "A cloud time-series database (InfluxDB, TimescaleDB) subscribed to the MQTT topic stores every reading with its timestamp — the dashboard queries the database for historical ranges rather than retrieving raw readings from the device", "The MQTT broker retains all historical messages indefinitely by default", "A Node-RED flow stores all messages in browser localStorage"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Hardware Setup in Wokwi with ESP8266, DHT22 (D4), BMP280 (I2C), LDR (A0 voltage divider), and OLED (I2C).",
              "Step 2: Install Libraries (DHT, Adafruit BMP280, ArduinoJson, PubSubClient).",
              "Step 3: Multi-Sensor Polling in loop() every 5 seconds.",
              "Step 4: Weather Status Assessment based on pressure trend and thresholds.",
              "Step 5: JSON Payload and MQTT Publishing to farm/weather/station01.",
              "Step 6: OLED Display of current readings."
            ],
            posttest: [
              {
                question: "The weather station correctly detects STORM_WARNING but the farmer receives no alert. The MQTT broker is running and other topics are publishing. What is the most likely cause?",
                options: ["The BMP280 pressure reading is inaccurate", "The alert is only published to farm/weather/alerts when status is not CLEAR — the farmer's notification app may not be subscribed to this topic, or the alert topic subscription was lost after a broker restart; verify the subscription and implement retained messages for alert topics", "MQTT cannot transmit alert messages — use HTTP POST instead", "The storm caused WiFi interference blocking the alert"],
                answerIndex: 1
              },
              {
                question: "Temperature readings from the weather station are consistently 3–4°C higher than an independent reference thermometer. What is the most likely cause?",
                options: ["DHT22 sensors have a factory calibration error of ±4°C", "The DHT22 is mounted too close to heat-generating components (ESP8266, relay, power supply) — self-heating from nearby electronics causes elevated readings; the sensor should be mounted in a radiation shield at least 20–30cm from any heat source", "The ArduinoJson library introduces computation delays affecting readings", "The OLED display warms the enclosure causing ambient temperature rise"],
                answerIndex: 1
              },
              {
                question: "A weather station deployed in a field stops sending MQTT messages after 6 hours even though the power supply is functioning. What is the most likely cause and fix?",
                options: ["The MQTT broker subscription expired after 6 hours", "The ESP8266 WiFi stack can lose connection due to router DHCP lease renewal, signal fluctuation, or memory fragmentation — implementing an MQTT reconnection loop with WiFi.reconnect() and a watchdog timer that resets the ESP8266 after 5 minutes of connection failure ensures continuous operation", "DHT22 sensors require recalibration every 6 hours", "JSON payload size exceeds MQTT broker limits after extended operation"],
                answerIndex: 1
              },
              {
                question: "The farmer wants to receive predictive disease risk alerts before visible symptoms appear. Which sensor combination and algorithm provides early fungal disease risk detection?",
                options: ["Temperature sensor and light sensor only", "Sustained humidity above 80% RH combined with temperature in the 18–25°C range for more than 4 consecutive hours — the temperature-humidity-time combination drives the Mills Period model for fungal spore germination; alerts triggered before the period completes give the farmer time to apply preventive fungicide", "Pressure sensor alone is sufficient for disease prediction", "LDR readings below 200 lux indicate disease risk"],
                answerIndex: 1
              },
              {
                question: "A student installs weather stations at 5 locations across a 100-hectare farm. How should the MQTT topic and Node-RED dashboard be structured to show both individual station data and a farm-wide average?",
                options: ["Use a single shared topic farm/weather and average in the broker", "Each station publishes to farm/weather/{station_id}/readings; a Node-RED function node subscribes to farm/weather/+/readings using a wildcard, maintains a running average across all active stations, and publishes the farm average to farm/weather/average — enabling both per-station and farm-wide dashboard panels from the same data stream", "Calculate averages on the ESP8266 before publishing", "Use five separate MQTT brokers, one per station"],
                answerIndex: 1
              }
            ],
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
          desc: "Combine soil moisture, temperature, and humidity monitoring in one system. Define optimal ranges for each parameter for a specific crop (example: tomatoes require soil moisture 60-80%, temperature 20-30°C, humidity 65-75%). Generate local buzzer alerts and remote Adafruit IO notifications when any parameter goes out of the optimal range. Simulate on Wokwi with ThingSpeak and Adafruit IO integration.\n\nSolve: http://localhost:8080/workspace?exp=iot-m5-4", 
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
            pretest: [
              {
                question: "A temperature sensor reads 1.8°C. The crop is frost-sensitive with a critical threshold of 2°C. What alert should the system generate?",
                options: ["No alert — 1.8°C is above freezing", "FROST_RISK CRITICAL — the temperature is below the 2°C critical threshold for frost-sensitive crops; ice crystal formation in leaf cells begins at temperatures above 0°C for many tropical crops and the system should immediately alert the farmer and activate frost protection measures", "INFO alert — temperature is close to but not at the threshold", "DROUGHT alert — cold temperatures reduce transpiration"],
                answerIndex: 1
              },
              {
                question: "A crop health monitoring system publishes a DISEASE_RISK alert every 5 seconds because humidity remains at 85% throughout the afternoon. What is the consequence and fix?",
                options: ["Frequent alerts ensure the farmer does not miss the warning", "Alert flooding overwhelms notification channels and causes the farmer to ignore all alerts (alarm fatigue) — implementing deduplication that suppresses repeat alerts of the same type within a 30-minute window, with escalation re-notification if severity increases, maintains useful alerting without flooding", "MQTT brokers automatically deduplicate retained messages", "Publishing more frequently improves dashboard response time"],
                answerIndex: 1
              },
              {
                question: "Temperature has been above 38°C for 3 hours. The system sent a WARNING alert at the 30-minute mark. What should the alert system do now?",
                options: ["Suppress further alerts since a warning was already sent", "Escalate to CRITICAL severity and re-publish the alert — the heat stress duration has passed the 2-hour escalation threshold indicating likely crop damage is now occurring rather than merely developing; escalation justifies a new notification bypassing the deduplication hold", "Downgrade to INFO since the condition is no longer new", "Wait for the farmer to acknowledge the WARNING before escalating"],
                answerIndex: 1
              },
              {
                question: "A farmer wants to receive crop health alerts on their smartphone even when they are 50km from the farm. What notification architecture delivers alerts reliably to a mobile device?",
                options: ["ESP8266 sends SMS directly via GSM module", "ESP8266 publishes to MQTT broker → Node-RED flow subscribes and calls Telegram Bot API → farmer receives Telegram push notification on smartphone — this routes alerts through existing internet infrastructure to any location without requiring the farmer's phone to be on the local farm network", "The farmer checks the Node-RED dashboard manually every hour", "MQTT brokers send push notifications directly to mobile apps"],
                answerIndex: 1
              },
              {
                question: "A monitoring system detects both DROUGHT (moisture 18%) and DISEASE_RISK (humidity 84%) simultaneously for the same crop zone. Which alert takes priority and why?",
                options: ["Both alerts have equal priority and should both be published", "Both alerts should be published simultaneously with their respective severities on separate sub-topics (farm/zone2/alert/drought, farm/zone2/alert/disease_risk) — they represent independent threat vectors requiring different responses (irrigation vs fungicide) and suppressing one risks missing a critical action", "The most recently triggered alert takes priority", "Only CRITICAL severity alerts are published — WARNING alerts are displayed locally"],
                answerIndex: 1
              }
            ],
            procedure: [
              "Step 1: Define Alert Threshold Table with constants for FROST_RISK, HEAT_STRESS, DROUGHT, FLOOD_RISK, DISEASE_RISK.",
              "Step 2: Implement Alert State Tracking struct tracking alertType, severity, startTime, lastPublishedTime.",
              "Step 3: Deduplication Logic to skip publishing unless 30 minutes elapsed or severity escalated.",
              "Step 4: Severity Escalation logic for prolonged conditions.",
              "Step 5: MQTT Alert Publishing to farm/zone1/alerts with JSON payloads.",
              "Step 6: Simulate All Alert Categories with potentiometers in Wokwi."
            ],
            posttest: [
              {
                question: "A farmer reports receiving 200+ DISEASE_RISK alert notifications overnight from a single monitoring station. The humidity remained elevated throughout the night. What two system fixes prevent this while ensuring the farmer is still informed?",
                options: ["Implement a 30-minute deduplication window suppressing repeat alerts of the same type AND send a nightly summary digest compiling all active alert types, durations, and sensor readings into a single scheduled report — reducing notification volume while maintaining full situational awareness", "Disable disease risk monitoring during nighttime hours", "Increase the humidity threshold to 95% to reduce alert frequency", "Limit total daily alerts to 10 regardless of conditions"],
                answerIndex: 0
              },
              {
                question: "A critical frost event occurs but the farmer does not receive the MQTT alert because their Telegram bot subscription expired. What architectural redundancy prevents missed critical alerts?",
                options: ["Store the alert in the ESP8266 EEPROM and display it locally", "Publish critical alerts to multiple notification channels simultaneously (Telegram + email + SMS gateway + MQTT retained message) — channel redundancy ensures at least one delivery path succeeds even if individual services experience outages or subscription issues", "Increase MQTT QoS to level 2 for guaranteed delivery", "The MQTT broker stores undelivered alerts for 30 days by default"],
                answerIndex: 1
              },
              {
                question: "A crop monitoring system correctly generates alerts but the recommended actions are generic ('contact agronomist'). How can the system deliver crop-specific, actionable guidance?",
                options: ["Train a machine learning model on sensor data", "Maintain a crop-alert-action lookup table keyed by crop type and alert category — when the farmer configures their crop type at setup, the system selects context-specific recommended actions (e.g., for rice + DISEASE_RISK: 'Apply carbendazim at 1g/L within 4 hours of first symptom detection') making alerts immediately actionable without agronomist consultation", "Generic advice is appropriate for automated systems", "Action recommendations require human agronomist input at all times"],
                answerIndex: 1
              },
              {
                question: "An alert system generates 15 different alert types across 20 monitoring zones. Operations staff struggle to prioritize which alerts to act on first. What dashboard design addresses this?",
                options: ["List all 500 possible zone-alert combinations in alphabetical order", "A priority-sorted alert queue ranked by severity (CRITICAL first) then by duration (longest active first) — with color coding (red/orange/yellow) and a one-click 'acknowledge' action that removes resolved alerts — mirrors industrial alarm management best practices and prevents critical alerts from being buried under lower-priority notifications", "Show only the most recent alert regardless of severity", "A separate dashboard per zone is more manageable than a unified view"],
                answerIndex: 1
              },
              {
                question: "A student wants to add automated response actions to the alert system — automatically activating frost heaters when FROST_RISK is triggered. How should this be implemented?",
                options: ["Wire the frost heater directly to the ESP8266 GPIO pin", "Use Node-RED to subscribe to the farm/zone1/alerts topic, check for FROST_RISK and CRITICAL severity, and publish an ON command to an MQTT actuator topic that the heater controller subscribes to — decoupling the monitoring logic from actuator control", "Add a delay(10000) loop in the alert code", "Hardcode the frost heater IP address in the ESP8266"],
                answerIndex: 1
              }
            ],
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
