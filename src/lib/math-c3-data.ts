// lib/comp-arch-data.ts

import { Course } from './course-data';
import { compArchShortNotes } from './math-c3-short-notes';

export const compArchCourse: Course = {
  id: "computer-architecture-and-digital-logic",
  title: "Computer Architecture and Digital Logic",
  objectives: [
    "To establish a strong foundation in number systems, binary arithmetic, and data representation techniques.",
    "To master the fundamentals of computer architecture, including the intricate workings of the datapath and the control unit.",
    "To delve deep into the internal architecture of modern microprocessors, understanding how they fetch, decode, and execute instructions.",
    "To explore the intricacies of memory hierarchy, from ultra-fast cache mechanisms and main memory to virtual memory mapping.",
    "To comprehensively understand digital logic gates, universal gates, and the application of Boolean algebra for circuit optimization.",
    "To design and analyze complex combinational and arithmetic circuits using practical methods like Karnaugh maps and multiplexers.",
    "To gain hands-on insights into input-output organization, addressing modes, and the execution of fundamental assembly language programming."
  ],
  shortNotes: compArchShortNotes,
  introduction: [
    "Computer architecture and digital logic form the foundation of modern computing. From the binary digits that represent all data to the complex instruction pipelines of modern processors, every computer is built on these fundamental concepts.",
    "This course starts at the very bottom—number systems and binary arithmetic—and builds up through logic gates, combinational circuits, and finally to full computer architecture.",
    "You'll learn how a simple NAND gate can be combined to build complex circuits, how a microprocessor fetches and executes instructions, and how memory hierarchies make computing fast and cost-effective.",
    "The course covers both the theoretical foundations (Boolean algebra, Karnaugh maps) and practical applications (assembly programming, memory design)."
  ],
  targetAudience: {
    primary: "Undergraduate students in Computer Science and Electronics Engineering studying the foundations of computer architecture.",
    prerequisites: [
      "Basic understanding of algebra",
      "Familiarity with binary numbers is helpful but not required",
      "No prior programming experience required"
    ],
    usefulFor: [
      "Students preparing for GATE CS and interviews",
      "Students interested in hardware design and embedded systems",
      "Students wanting to understand how computers work from the bottom up",
      "Anyone pursuing careers in computer engineering or microprocessor design"
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "Computer Science and Engineering",
    course: "Computer Architecture and Digital Logic",
    credits: "L:3 T:0 P:0 C:3",
    yearSem: "Second Year, First Semester",
    branches: "CSE, IT, and Electronics",
    totalExperiments: "4 Modules with 8 experiments",
    compiler: "Digital logic and assembly concepts",
    units: [
      { unit: "Unit I", topics: "Number Systems and Binary Arithmetic", weeks: "Module 1" },
      { unit: "Unit II", topics: "Computer Architecture Fundamentals", weeks: "Module 2" },
      { unit: "Unit III", topics: "Microprocessors and Memory Hierarchy", weeks: "Module 3" },
      { unit: "Unit IV", topics: "Digital Logic and Combinational Circuits", weeks: "Module 4" }
    ]
  },
  weeks: [
    {
      title: "MODULE 1",
      objective: "Number Systems, Signed Representation, Floating Point, Binary Arithmetic",
      tutorial: "Tutorial 1: Number Systems and Binary Arithmetic",
      labTitle: "Lab 1: Number Systems",
      experiments: [
        {
          id: "arch-m1-1",
          title: "Number Systems and Conversions",
          desc: "Understand binary, octal, decimal, and hexadecimal number systems and convert between them.",
          expected: "Able to convert numbers between any two number systems.",
          content: {
            aim: {
              text: "This experiment introduces the number systems used in computing. While humans use decimal, computers use binary. You'll learn to work with binary, octal, and hexadecimal, and convert between them. Understanding these systems is essential for understanding how computers represent data.",
              bullets: [
                "Understand decimal (base 10) as the familiar system",
                "Learn binary (base 2) as the computer's native system",
                "Learn octal (base 8) as a compact representation",
                "Learn hexadecimal (base 16) as a compact representation",
                "Convert between different number systems"
              ]
            },
            theory: [
              {
                title: "Why Binary? The Two-State World of Computers",
                body: [
                  "Computers are built from billions of tiny switches that can be either ON or OFF. Each switch stores one bit of information—a binary digit.",
                  "Binary uses only two digits: 0 and 1.",
                  "![Binary Switch](/math_number_systems.webp)",
                  "Just like decimal, binary is positional: each position represents a power of 2.",
                  "Binary: 1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11₁₀.",
                  "Every binary number converts to a decimal number, and vice versa.",
                  "Why not use decimal directly? Because building a 10-state switch is much harder than building a 2-state switch. Binary is the simplest and most reliable way to build computers."
                ]
              },
              {
                title: "Decimal to Binary—The Division Method",
                body: [
                  "To convert decimal to binary, divide repeatedly by 2 and record the remainders.",
                  "Example: Convert 13₁₀ to binary.",
                  "13 ÷ 2 = 6 remainder 1 (least significant bit)",
                  "6 ÷ 2 = 3 remainder 0",
                  "3 ÷ 2 = 1 remainder 1",
                  "1 ÷ 2 = 0 remainder 1 (most significant bit)",
                  "Reading remainders from bottom to top: 13₁₀ = 1101₂.",
                  "Check: 1×8 + 1×4 + 0×2 + 1×1 = 13. ✓"
                ]
              },
              {
                title: "Octal and Hexadecimal—Shorthand for Binary",
                body: [
                  "Binary numbers get long quickly. 255₁₀ is 11111111₂—eight bits!",
                  "Octal (base 8) groups binary digits in threes: 11111111₂ = 377₈.",
                  "Hexadecimal (base 16) groups binary digits in fours: 11111111₂ = FF₁₆.",
                  "Octal uses digits 0-7.",
                  "Hexadecimal uses 0-9 and A-F (10-15).",
                  "These systems are important because they're compact yet easily convertible to binary—they're the 'human-friendly' versions of binary.",
                  "In computing, you'll see:",
                  "• Assembly code and memory dumps use hex.",
                  "• File permissions (Unix) are often in octal.",
                  "• IP addresses are sometimes in octal (old-style)."
                ]
              },
              {
                title: "Conversions Between Systems",
                body: [
                  "Two-step method: Convert to decimal first, then to the target system.",
                  "Example: Convert 2A₁₆ to octal.",
                  "Step 1: 2A₁₆ = 2×16¹ + 10×16⁰ = 32 + 10 = 42₁₀.",
                  "Step 2: 42₁₀ to octal: 42 ÷ 8 = 5 remainder 2, 5 ÷ 8 = 0 remainder 5 → 52₈.",
                  "Shortcut: Convert hex to binary (each hex digit = 4 bits), then binary to octal (group in threes).",
                  "2A₁₆ = 0010 1010₂ = 010 101 010₂ = 252₈."
                ]
              },
              {
                title: "Why These Systems Matter",
                body: [
                  "Understanding number systems is essential for:",
                  "• Understanding how computers store data",
                  "• Debugging programs (memory addresses, bitwise operations)",
                  "• Designing hardware (address decoding, multiplexers)",
                  "• Working with assembly language",
                  "• Understanding machine code and instruction formats",
                  "• Studying cryptography and data encoding",
                  "In modern computing, hex is everywhere: memory addresses in debuggers, color codes in web design (#FF0000), and UUIDs (Universal Unique Identifiers) are written in hex."
                ]
              }
            ],
            pretest: [
              { question: "Why do computers use binary?", options: ["It stores more data than decimal", "It requires 10 switch states", "It is easier to build reliable two-state switches", "It uses fewer digits"], answerIndex: 2 },
              { question: "A binary digit is called a:", options: ["Byte", "Nibble", "Word", "Bit"], answerIndex: 3 },
              { question: "Which digits are used in the binary number system?", options: ["0–7", "0 and 1", "0–9", "A–F"], answerIndex: 1 },
              { question: "What does the binary number 1011₂ equal in decimal?", options: ["9", "10", "11", "13"], answerIndex: 2 },
              { question: "In binary, each position represents a power of:", options: ["8", "16", "10", "2"], answerIndex: 3 },
              { question: "Which binary digit represents an OFF switch?", options: ["0", "1", "2", "A"], answerIndex: 0 },
              { question: "Which method is commonly used to convert decimal to binary?", options: ["Multiplication by 10", "Repeated division by 2", "Subtraction by 2", "Addition by 2"], answerIndex: 1 },
              { question: "What is the binary equivalent of 13₁₀?", options: ["1010", "1110", "1001", "1101"], answerIndex: 3 },
              { question: "While converting decimal to binary using division, the binary number is obtained by reading the remainders:", options: ["Left to right", "Top to bottom", "Bottom to top", "Right to left"], answerIndex: 2 },
              { question: "Which remainder forms the least significant bit (LSB)?", options: ["The first remainder", "The last remainder", "The middle remainder", "None of these"], answerIndex: 0 },
              { question: "Which number system groups binary digits into groups of 3?", options: ["Decimal", "Hexadecimal", "Binary", "Octal"], answerIndex: 3 },
              { question: "Which number system groups binary digits into groups of 4?", options: ["Decimal", "Hexadecimal", "Octal", "Binary"], answerIndex: 1 },
              { question: "Which of the following is a valid hexadecimal digit?", options: ["G", "H", "F", "Z"], answerIndex: 2 },
              { question: "The hexadecimal digit A represents:", options: ["8", "9", "11", "10"], answerIndex: 3 },
              { question: "The hexadecimal digit F represents:", options: ["14", "15", "16", "13"], answerIndex: 1 }
            ],
            procedure: [
              "Open the number systems workspace",
              "Convert decimal numbers to binary using the division method",
              "Convert binary numbers to decimal",
              "Convert between octal, decimal, and hexadecimal",
              "Practice conversions between all systems",
              "Complete the quiz to test your understanding"
            ],
            posttest: [
              { question: "What is the hexadecimal equivalent of 11111111₂?", options: ["EE", "FF", "AA", "FE"], answerIndex: 1 },
              { question: "What is the octal equivalent of 11111111₂?", options: ["255", "277", "377", "357"], answerIndex: 2 },
              { question: "Which statement about hexadecimal is correct?", options: ["It uses digits 0–7 only.", "It uses digits 1–16 only.", "It uses digits 0–9 and letters A–F.", "It uses only letters A–Z."], answerIndex: 2 },
              { question: "Which number system is commonly used in memory dumps?", options: ["Binary", "Decimal", "Octal", "Hexadecimal"], answerIndex: 3 },
              { question: "Which number system is commonly used for Unix file permissions?", options: ["Binary", "Decimal", "Octal", "Hexadecimal"], answerIndex: 2 },
              { question: "The hexadecimal number 2A₁₆ is equal to:", options: ["40", "41", "42", "43"], answerIndex: 2 },
              { question: "The octal equivalent of 42₁₀ is:", options: ["51", "52", "62", "54"], answerIndex: 1 },
              { question: "Which is the easiest method to convert between different number systems?", options: ["Guess the value", "Convert through decimal first", "Multiply by 2", "Divide by 10"], answerIndex: 1 },
              { question: "In shortcut conversion, one hexadecimal digit equals:", options: ["2 bits", "3 bits", "4 bits", "8 bits"], answerIndex: 2 },
              { question: "Why are octal and hexadecimal considered human-friendly?", options: ["They use fewer symbols than binary.", "They are compact and easy to convert to binary.", "They are faster than binary.", "They eliminate binary completely."], answerIndex: 1 },
              { question: "Which of the following is NOT listed as an application of number systems?", options: ["Cryptography", "Assembly language", "Address decoding", "Video editing"], answerIndex: 3 },
              { question: "Which web color code is written in hexadecimal?", options: ["#2550000", "#FF0000", "#7777777", "#101010"], answerIndex: 1 },
              { question: "Understanding number systems helps in:", options: ["Machine code and instruction formats", "Cooking recipes", "Music composition only", "Weather forecasting"], answerIndex: 0 },
              { question: "Which statement about binary is correct?", options: ["It uses digits 0–9.", "It uses eight symbols.", "It is a positional number system based on powers of 2.", "It uses letters A–F."], answerIndex: 2 },
              { question: "Why is understanding number systems important in computing?", options: ["It helps understand data storage, hardware, and debugging.", "It replaces programming languages.", "It eliminates the need for memory.", "It reduces electricity consumption."], answerIndex: 0 }
            ],
            references: [
              "Stallings, W. - 'Computer Organization and Architecture', 10th Edition, Chapter 2 on Number Systems",
              "Mano, M.M. - 'Digital Design', 6th Edition, Chapter 1 on Number Systems"
            ]
          }
        },
        {
          id: "arch-m1-2",
          title: "Signed Representation and Binary Arithmetic",
          desc: "Understand how computers represent signed numbers and perform binary arithmetic.",
          expected: "Able to perform binary addition, subtraction, and represent signed numbers.",
          content: {
            aim: {
              text: "This experiment covers how computers represent negative numbers and perform arithmetic. You'll learn about sign-magnitude, one's complement, and two's complement representations. You'll also practice binary addition and subtraction—the fundamental operations of all computation.",
              bullets: [
                "Understand sign-magnitude representation",
                "Understand one's complement",
                "Understand two's complement",
                "Perform binary addition and subtraction",
                "Understand overflow in binary arithmetic"
              ]
            },
            theory: [
              {
                title: "Signed Number Representations—How to Handle Negatives",
                body: [
                  "Computers need to represent both positive and negative numbers. There are three common ways:",
                  "1. Sign-magnitude: The first bit is the sign (0 = positive, 1 = negative), the rest are the magnitude.",
                  "Example (4 bits): +3 = 0011, -3 = 1011.",
                  "Problem: Two zeros (0000 and 1000).",
                  "2. One's complement: Negative numbers are the bitwise complement of positive numbers.",
                  "Example (4 bits): +3 = 0011, -3 = 1100.",
                  "Problem: Still two zeros (0000 and 1111).",
                  "3. Two's complement (the standard in modern computers):",
                  "Negative numbers are the bitwise complement plus 1.",
                  "Example (4 bits): +3 = 0011, -3 = 1101.",
                  "Two's complement: +0 = 0000, -0 = 0000 (only one zero!).",
                  "Two's complement is used because it makes addition and subtraction simple—the same hardware works for both signed and unsigned numbers."
                ]
              },
              {
                title: "Two's Complement—The Winner",
                body: [
                  "Two's complement is the standard because it has three key advantages:",
                  "1. Only one zero representation.",
                  "2. Addition and subtraction are the same for signed and unsigned numbers.",
                  "3. The range is symmetric: for n bits, range is -2^(n-1) to 2^(n-1)-1.",
                  "For 4 bits: range is -8 to 7.",
                  "For 8 bits: range is -128 to 127.",
                  "For 32 bits: range is -2.147 billion to 2.147 billion.",
                  "To negate a number in two's complement: flip all bits and add 1.",
                  "Example: +3 = 0011, flip = 1100, add 1 = 1101 = -3. ✓"
                ]
              },
              {
                title: "Binary Addition and Subtraction",
                body: [
                  "Addition is straightforward, just like decimal: 0+0=0, 0+1=1, 1+0=1, 1+1=0 carry 1.",
                  "Example: 5 + 3 = 0101 + 0011 = 1000 = 8.",
                  "Subtraction is done by adding the two's complement: A - B = A + (~B + 1).",
                  "Example: 5 - 3 = 0101 + (1101) = 0010 = 2.",
                  "This is why two's complement is so powerful: the same addition hardware handles both addition and subtraction!"
                ]
              },
              {
                title: "Overflow—When Numbers Get Too Big",
                body: [
                  "Overflow occurs when the result of an operation exceeds the range that can be represented.",
                  "For 4-bit two's complement (-8 to 7):",
                  "5 + 4 = 9, but 9 > 7 → overflow! 0101 + 0100 = 1001 = -7 (wrong answer!).",
                  "How to detect overflow: If the carry into the sign bit differs from the carry out of the sign bit.",
                  "In programming languages, overflow is often ignored (it wraps around). This is why you might see unexpected results when numbers get very large—like in the famous Y2K bug or the PlayStation 2's 32-bit integer overflow."
                ]
              },
              {
                title: "Floating Point Representation—IEEE 754",
                body: [
                  "Integers are easy, but what about numbers like 3.14?",
                  "IEEE 754 is the standard for floating-point numbers.",
                  "A float (single precision) uses 32 bits:",
                  "• 1 bit: sign",
                  "• 8 bits: exponent (biased by 127)",
                  "• 23 bits: mantissa (fraction)",
                  "A double (double precision) uses 64 bits:",
                  "• 1 bit: sign",
                  "• 11 bits: exponent (biased by 1023)",
                  "• 52 bits: mantissa",
                  "The value is: (-1)^sign × (1.mantissa) × 2^(exponent - bias).",
                  "Floating point is a trade-off: it can represent a huge range of numbers, but not all numbers exactly (3.14 is an approximation)."
                ]
              }
            ],
            pretest: [
              { question: "Which signed number representation uses the first bit as the sign bit?", options: ["Two's complement", "Sign-magnitude", "Binary-coded decimal", "Gray code"], answerIndex: 1 },
              { question: "In sign-magnitude representation, a sign bit of 1 indicates:", options: ["Positive number", "Zero", "Negative number", "Overflow"], answerIndex: 2 },
              { question: "What is the 4-bit sign-magnitude representation of −3?", options: ["0011", "1100", "1101", "1011"], answerIndex: 3 },
              { question: "What is the main disadvantage of sign-magnitude representation?", options: ["No negative numbers", "Two representations for zero", "Cannot perform addition", "Uses extra memory"], answerIndex: 1 },
              { question: "In one's complement, a negative number is obtained by:", options: ["Adding 1 only", "Dividing by 2", "Taking the bitwise complement", "Multiplying by −1"], answerIndex: 2 },
              { question: "What is the one's complement representation of −3 (4 bits)?", options: ["1011", "1100", "1110", "1001"], answerIndex: 1 },
              { question: "Which representation is the standard in modern computers?", options: ["Sign-magnitude", "One's complement", "Excess-3", "Two's complement"], answerIndex: 3 },
              { question: "In two's complement, a negative number is obtained by:", options: ["Multiplying by 2", "Reversing the digits", "Flipping all bits and adding 1", "Shifting left"], answerIndex: 2 },
              { question: "What is the two's complement representation of −3 (4 bits)?", options: ["1101", "1011", "1110", "1000"], answerIndex: 0 },
              { question: "Which representation has only one representation of zero?", options: ["Sign-magnitude", "One's complement", "Two's complement", "Binary-coded decimal"], answerIndex: 2 },
              { question: "What is the positive zero in two's complement?", options: ["0000", "1111", "1000", "0111"], answerIndex: 0 },
              { question: "Which advantage makes two's complement widely used?", options: ["Requires two sign bits", "Uses decimal arithmetic", "Same hardware performs addition and subtraction", "Eliminates binary numbers"], answerIndex: 2 },
              { question: "The range of a 4-bit two's complement number is:", options: ["−7 to +8", "−8 to +7", "−15 to +15", "0 to 15"], answerIndex: 1 },
              { question: "The range of an 8-bit two's complement number is:", options: ["−255 to +255", "−64 to +63", "−128 to +127", "−127 to +128"], answerIndex: 2 },
              { question: "The range of an n-bit two's complement number is:", options: ["−2ⁿ to 2ⁿ−1", "−2ⁿ⁻¹ to 2ⁿ⁻¹−1", "0 to 2ⁿ−1", "−2ⁿ⁻¹ to 2ⁿ"], answerIndex: 1 }
            ],
            procedure: [
              "Open the arithmetic workspace",
              "Practice sign-magnitude, one's complement, and two's complement",
              "Convert between signed representations",
              "Perform binary addition and subtraction",
              "Detect overflow in binary operations",
              "Understand IEEE 754 floating point",
              "Complete the quiz to test your understanding"
            ],
            posttest: [
              { question: "To negate a number in two's complement, you should:", options: ["Shift left by one bit", "Reverse the digits", "Add 2", "Flip all bits and add 1"], answerIndex: 3 },
              { question: "Binary subtraction is performed using:", options: ["Decimal conversion", "Repeated subtraction", "Two's complement addition", "Gray code"], answerIndex: 2 },
              { question: "Which expression correctly represents binary subtraction?", options: ["A + B", "A − B = A + (~B + 1)", "A × B", "A ÷ B"], answerIndex: 1 },
              { question: "What is the binary sum of 0101 + 0011?", options: ["0110", "0111", "1000", "1010"], answerIndex: 2 },
              { question: "The binary result of 5 − 3 is:", options: ["0001", "0010", "0011", "0100"], answerIndex: 1 },
              { question: "Overflow occurs when:", options: ["A number becomes negative", "Division by zero occurs", "Result exceeds the representable range", "A carry is generated"], answerIndex: 2 },
              { question: "Which operation causes overflow in 4-bit two's complement?", options: ["2 + 2", "5 + 4", "3 + 1", "4 − 2"], answerIndex: 1 },
              { question: "Overflow is detected when:", options: ["Carry into sign bit equals carry out", "Carry into sign bit differs from carry out", "Result is zero", "Sign bit is zero"], answerIndex: 1 },
              { question: "In many programming languages, integer overflow usually:", options: ["Stops program execution", "Generates a syntax error", "Wraps around to another value", "Deletes memory"], answerIndex: 2 },
              { question: "IEEE 754 is the standard for:", options: ["Binary addition", "Floating-point representation", "Memory addressing", "Logic gates"], answerIndex: 1 },
              { question: "A single-precision floating-point number uses:", options: ["16 bits", "32 bits", "48 bits", "64 bits"], answerIndex: 1 },
              { question: "In IEEE 754 single precision, how many bits are used for the exponent?", options: ["23", "11", "8", "16"], answerIndex: 2 },
              { question: "In IEEE 754 double precision, how many bits are used for the mantissa?", options: ["23", "64", "32", "52"], answerIndex: 3 },
              { question: "What is the exponent bias for IEEE 754 single precision?", options: ["63", "255", "127", "1023"], answerIndex: 2 },
              { question: "Which statement about floating-point numbers is correct?", options: ["They represent every decimal number exactly.", "They cannot represent negative values.", "They provide a large range but may approximate some values.", "They use only integer arithmetic."], answerIndex: 2 }
            ],
            references: [
              "Stallings, W. - 'Computer Organization and Architecture', 10th Edition, Chapter 2 on Number Systems",
              "Mano, M.M. - 'Digital Design', 6th Edition, Chapter 1 on Number Systems"
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 2",
      objective: "Computer Architecture Basics, Datapath, Control, I/O, Instruction Cycle",
      tutorial: "Tutorial 2: Computer Architecture Fundamentals",
      labTitle: "Lab 2: Computer Architecture",
      experiments: [
        {
          id: "arch-m2-1",
          title: "Von Neumann Architecture and Functional Units",
          desc: "Understand the Von Neumann architecture and the functional units of a computer.",
          expected: "Able to describe the major components of a computer and their functions.",
          content: {
            aim: {
              text: "This experiment introduces the Von Neumann architecture—the conceptual model that underlies most modern computers. You'll learn about the major functional units: CPU, memory, and I/O. You'll understand how they interact and how this architecture has shaped modern computing.",
              bullets: [
                "Understand the Von Neumann architecture",
                "Learn about the CPU and its components",
                "Understand memory organization",
                "Learn about I/O systems",
                "Explore the bus system"
              ]
            },
            theory: [
              {
                title: "The Von Neumann Architecture—The Blueprint of Modern Computers",
                body: [
                  "John von Neumann proposed this architecture in 1945. Every modern computer follows it.",
                  "The key idea: both data and programs are stored in the same memory.",
                  "![Von Neumann Architecture](/von_neumann_architecture.webp)",
                  "The architecture has four main components:",
                  "1. Memory: Stores both data and instructions.",
                  "2. CPU: Processes data by executing instructions.",
                  "3. Input: Devices that bring data into the computer.",
                  "4. Output: Devices that send data out of the computer.",
                  "The 'Von Neumann bottleneck': The single bus between CPU and memory limits performance because fetching data and instructions both use the same path—this is why modern CPUs have caches."
                ]
              },
              {
                title: "The CPU—The Brain of the Computer",
                body: [
                  "The CPU (Central Processing Unit) has three main parts:",
                  "• ALU (Arithmetic Logic Unit): Performs arithmetic and logic operations (add, subtract, AND, OR, etc.).",
                  "• Registers: Small, fast memory inside the CPU for temporary storage.",
                  "• Control Unit: Decodes instructions and controls the flow of data.",
                  "![CPU Structure](/cpu_internal_architecture.webp)",
                  "The CPU fetches instructions from memory, decodes them, and executes them.",
                  "This is the 'fetch-decode-execute' cycle that we'll explore in the next experiment."
                ]
              },
              {
                title: "Memory Organization—The Storage Hierarchy",
                body: [
                  "Memory in a computer is organized in a hierarchy:",
                  "• Registers: Fastest, smallest (inside CPU).",
                  "• Cache: Very fast, moderate size (on or near CPU).",
                  "• RAM: Fast, large (main memory).",
                  "• Disk: Slow, huge (storage).",
                  "![Memory Hierarchy](/memory_hierarchy_pyramid.webp)",
                  "This hierarchy exists because speed costs money: faster memory is more expensive per bit.",
                  "The goal is to keep the most frequently used data in the fastest memory—this is why caches work so well."
                ]
              },
              {
                title: "Input and Output—The Interface to the World",
                body: [
                  "I/O (Input/Output) devices connect the computer to the outside world.",
                  "Input devices: Keyboard, mouse, camera, microphone, network interface.",
                  "Output devices: Monitor, printer, speakers, network interface.",
                  "The I/O system handles communication between the CPU and devices.",
                  "There are three main methods:",
                  "1. Programmed I/O: The CPU polls the device (checks status). Simple but wastes CPU time.",
                  "2. Interrupt-driven I/O: The device interrupts the CPU when it needs attention. More efficient.",
                  "3. DMA (Direct Memory Access): The device transfers data directly to/from memory without CPU involvement. Most efficient for large transfers."
                ]
              },
              {
                title: "Buses—The Communication Channels",
                body: [
                  "The bus system connects the CPU, memory, and I/O devices.",
                  "Three main types of buses:",
                  "• Data bus: Carries data between components.",
                  "• Address bus: Carries memory addresses.",
                  "• Control bus: Carries control signals (read/write, interrupt, clock).",
                  "Bus width (number of parallel lines) determines performance:",
                  "• 8-bit bus: Carries 8 bits at a time.",
                  "• 32-bit bus: Carries 32 bits at a time.",
                  "• 64-bit bus: Carries 64 bits at a time.",
                  "Modern CPUs have multiple buses (front-side bus, memory bus, I/O bus) to reduce bottlenecks."
                ]
              }
            ],
            pretest: [
              { question: "Who proposed the architecture that is followed by most modern computers?", options: ["John von Neumann", "Charles Babbage", "Alan Turing", "Blaise Pascal"], answerIndex: 0 },
              { question: "In the Von Neumann Architecture, what is stored in the same memory?", options: ["CPU and ALU", "Data and programs", "Input and output devices", "Registers and cache"], answerIndex: 1 },
              { question: "Which of the following is not one of the four main components of the Von Neumann Architecture?", options: ["Memory", "CPU", "Compiler", "Output"], answerIndex: 2 },
              { question: "Which component is responsible for executing instructions?", options: ["Cache", "Memory", "Input Unit", "CPU"], answerIndex: 3 },
              { question: "The main reason for the Von Neumann bottleneck is:", options: ["Small register size", "Single communication path between CPU and memory", "Slow keyboard input", "Large hard disk"], answerIndex: 1 },
              { question: "Modern processors reduce the Von Neumann bottleneck mainly by using:", options: ["Registers", "DMA", "Cache memory", "Printers"], answerIndex: 2 },
              { question: "Which CPU component performs arithmetic operations like addition and subtraction?", options: ["ALU", "Control Unit", "Cache", "Register"], answerIndex: 0 },
              { question: "Which CPU component temporarily stores data during execution?", options: ["RAM", "Registers", "Disk", "Bus"], answerIndex: 1 },
              { question: "Which part of the CPU controls the movement of data and interprets instructions?", options: ["Memory", "ALU", "Control Unit", "Cache"], answerIndex: 2 },
              { question: "Which sequence correctly represents the instruction cycle?", options: ["Decode → Execute → Fetch", "Execute → Fetch → Decode", "Fetch → Execute → Decode", "Fetch → Decode → Execute"], answerIndex: 3 },
              { question: "Which memory is located inside the CPU?", options: ["Registers", "RAM", "Disk", "SSD"], answerIndex: 0 },
              { question: "Which memory level is placed between registers and RAM?", options: ["Disk", "Cache", "ROM", "Flash Memory"], answerIndex: 1 },
              { question: "Which memory in the hierarchy has the largest storage capacity?", options: ["Registers", "Cache", "RAM", "Disk"], answerIndex: 3 },
              { question: "Why is memory organized into a hierarchy?", options: ["To increase monitor resolution", "Faster memory costs more per bit", "To reduce CPU instructions", "To eliminate RAM"], answerIndex: 1 },
              { question: "Which type of memory provides the fastest access to data?", options: ["Registers", "Cache", "RAM", "Disk"], answerIndex: 0 }
            ],
            procedure: [
              "Open the architecture workspace",
              "Review the Von Neumann architecture",
              "Learn about the CPU's functional units",
              "Understand the memory hierarchy",
              "Explore I/O systems",
              "Complete the quiz to test your understanding"
            ],
            posttest: [
              { question: "Which memory stores frequently accessed data to improve system performance?", options: ["RAM", "ROM", "Cache", "Disk"], answerIndex: 2 },
              { question: "Which of the following is an input device?", options: ["Printer", "Speaker", "Keyboard", "Monitor"], answerIndex: 2 },
              { question: "Which of the following is an output device?", options: ["Mouse", "Camera", "Microphone", "Printer"], answerIndex: 3 },
              { question: "Which device can act as both an input and an output device?", options: ["Keyboard", "Network Interface", "Scanner", "Webcam"], answerIndex: 1 },
              { question: "In Programmed I/O, the CPU communicates with a device by:", options: ["Polling its status repeatedly", "Using DMA", "Using cache memory", "Using virtual memory"], answerIndex: 0 },
              { question: "Which I/O technique allows the CPU to continue working until a device requests attention?", options: ["Programmed I/O", "Interrupt-driven I/O", "Polling", "Memory Mapping"], answerIndex: 1 },
              { question: "Which I/O method is most efficient for transferring large amounts of data?", options: ["Interrupt-driven I/O", "Programmed I/O", "DMA", "Polling"], answerIndex: 2 },
              { question: "DMA transfers data directly between:", options: ["CPU and ALU", "Register and Cache", "Input and Output devices only", "Device and Main Memory"], answerIndex: 3 },
              { question: "Which bus transfers actual data among computer components?", options: ["Data Bus", "Address Bus", "Control Bus", "Expansion Bus"], answerIndex: 0 },
              { question: "Which bus carries memory location information?", options: ["Control Bus", "Address Bus", "Data Bus", "System Bus"], answerIndex: 1 },
              { question: "Which bus carries signals such as read, write, interrupt, and clock?", options: ["Data Bus", "Address Bus", "Control Bus", "Memory Bus"], answerIndex: 2 },
              { question: "What does the width of a bus determine?", options: ["Memory capacity", "Number of instructions", "Amount of data transferred at one time", "CPU temperature"], answerIndex: 2 },
              { question: "A 32-bit data bus transfers how many bits simultaneously?", options: ["16 bits", "32 bits", "64 bits", "128 bits"], answerIndex: 1 },
              { question: "Which statement best explains why caches improve computer performance?", options: ["They increase hard disk capacity.", "They store operating systems permanently.", "They keep frequently used data close to the CPU.", "They replace RAM completely."], answerIndex: 2 },
              { question: "Why do modern computers use multiple buses instead of a single bus?", options: ["To reduce communication bottlenecks and improve performance.", "To increase the number of CPUs.", "To replace the memory hierarchy.", "To eliminate input and output devices."], answerIndex: 0 }
            ],
            references: [
              "Stallings, W. - 'Computer Organization and Architecture', 10th Edition, Chapter 1 on Basic Concepts",
              "Patterson, D.A. and Hennessy, J.L. - 'Computer Organization and Design', 5th Edition, Chapter 1 on Computer Architecture"
            ]
          }
        },
        {
          id: "arch-m2-2",
          title: "Instruction Cycle—Fetch, Decode, Execute, Interrupt",
          desc: "Understand the instruction cycle of a CPU—fetch, decode, execute, and interrupt.",
          expected: "Able to explain the instruction cycle and the role of the control unit.",
          content: {
            aim: {
              text: "This experiment explores the instruction cycle—the heartbeat of the CPU. You'll learn how a CPU fetches instructions from memory, decodes them to understand what to do, executes them using the ALU, and handles interrupts. This is the fundamental process that makes all computation possible.",
              bullets: [
                "Understand the fetch phase",
                "Understand the decode phase",
                "Understand the execute phase",
                "Understand the interrupt phase",
                "Trace the instruction cycle for simple instructions"
              ]
            },
            theory: [
              {
                title: "The Instruction Cycle—How the CPU Runs a Program",
                body: [
                  "The instruction cycle is the process the CPU follows for each instruction:",
                  "1. Fetch: The CPU fetches an instruction from memory.",
                  "2. Decode: The CPU decodes the instruction to understand what operation to perform.",
                  "3. Execute: The CPU performs the operation.",
                  "4. (Optional) Interrupt: Handle interrupts from I/O devices.",
                  "![Instruction Cycle](/math_instruction_cycle.webp)",
                  "This cycle repeats billions of times per second!",
                  "The Program Counter (PC) keeps track of the address of the next instruction to fetch."
                ]
              },
              {
                title: "Fetch—Getting the Instruction",
                body: [
                  "The fetch phase has three steps:",
                  "1. The CPU puts the address from the Program Counter (PC) onto the address bus.",
                  "2. Memory reads the instruction at that address and puts it on the data bus.",
                  "3. The CPU stores the instruction in the Instruction Register (IR).",
                  "After the fetch, the PC is incremented (by 1 for each byte) to point to the next instruction.",
                  "This is why instructions are stored in memory—it's a continuous stream of bytes that the CPU processes one at a time."
                ]
              },
              {
                title: "Decode—Understanding the Instruction",
                body: [
                  "The decode phase interprets the instruction:",
                  "• The instruction format tells the CPU what operation to perform.",
                  "• It identifies the opcode (operation code) and the operands.",
                  "• The control unit generates the control signals needed for execution.",
                  "Instruction format: [Opcode] [Operand1] [Operand2]",
                  "Example: ADD R1, R2, R3 → R1 = R2 + R3.",
                  "The control unit is the 'conductor' of the CPU—it orchestrates all the other components."
                ]
              },
              {
                title: "Execute—Performing the Operation",
                body: [
                  "The execute phase performs the actual operation:",
                  "• The ALU performs the arithmetic or logic operation.",
                  "• Data is moved between registers and memory.",
                  "• The result is stored back in a register or memory.",
                  "Different operations take different numbers of cycles:",
                  "• Register-to-register addition: 1 cycle (fast).",
                  "• Memory-to-register addition: 2-3 cycles (slower).",
                  "• Multiplication: 3-5 cycles (slower).",
                  "This is why optimizing programs to minimize memory access can dramatically improve performance."
                ]
              },
              {
                title: "Interrupts—Handling the Unexpected",
                body: [
                  "Interrupts allow the CPU to respond to external events:",
                  "• I/O interrupts: A device needs attention (key pressed, data arrived).",
                  "• Timer interrupts: A timer has expired (time-slicing in multitasking).",
                  "• Hardware interrupts: Error conditions (division by zero, page fault).",
                  "The interrupt cycle:",
                  "1. The CPU finishes the current instruction.",
                  "2. It saves the current state (PC and registers) to the stack.",
                  "3. It jumps to the interrupt handler (Interrupt Service Routine).",
                  "4. After handling the interrupt, it restores the state and resumes.",
                  "This is how multitasking works—the CPU switches between processes so fast that they appear to run simultaneously."
                ]
              }
            ],
            pretest: [
              { question: "What is the first stage of the instruction cycle?", options: ["Decode", "Execute", "Interrupt", "Fetch"], answerIndex: 3 },
              { question: "Which stage interprets the instruction before execution?", options: ["Decode", "Fetch", "Interrupt", "Memory"], answerIndex: 0 },
              { question: "During which stage does the CPU perform the required operation?", options: ["Decode", "Fetch", "Execute", "Interrupt"], answerIndex: 2 },
              { question: "Which stage of the instruction cycle is optional?", options: ["Fetch", "Decode", "Execute", "Interrupt"], answerIndex: 3 },
              { question: "Which register stores the address of the next instruction?", options: ["Instruction Register", "Program Counter", "Memory Register", "Accumulator"], answerIndex: 1 },
              { question: "The instruction cycle repeats:", options: ["Once every minute", "Only during system startup", "Billions of times per second", "Only when interrupts occur"], answerIndex: 2 },
              { question: "During the fetch phase, the CPU places the address on the:", options: ["Data bus", "Address bus", "Control bus", "System bus"], answerIndex: 1 },
              { question: "Which component reads the instruction after receiving the address?", options: ["ALU", "Registers", "Memory", "Cache Controller"], answerIndex: 2 },
              { question: "After reading the instruction, memory places it on the:", options: ["Address bus", "Control bus", "Interrupt bus", "Data bus"], answerIndex: 3 },
              { question: "Which register stores the fetched instruction?", options: ["Program Counter", "Instruction Register", "Status Register", "Index Register"], answerIndex: 1 },
              { question: "After fetching an instruction, the Program Counter is:", options: ["Cleared", "Incremented", "Decremented", "Shifted"], answerIndex: 1 },
              { question: "Why is the Program Counter incremented?", options: ["To restart execution", "To point to the next instruction", "To clear memory", "To reset the CPU"], answerIndex: 1 },
              { question: "During the decode phase, the CPU identifies the:", options: ["Cache size", "Memory capacity", "Opcode and operands", "Bus width"], answerIndex: 2 },
              { question: "The opcode specifies:", options: ["Memory address", "Operation to be performed", "Register size", "Interrupt priority"], answerIndex: 1 },
              { question: "The operands in an instruction represent:", options: ["Clock signals", "Bus addresses", "Input devices", "Data or register values used in the operation"], answerIndex: 3 }
            ],
            procedure: [
              "Open the architecture workspace",
              "Review the instruction cycle steps",
              "Trace the instruction cycle for simple instructions",
              "Understand the role of the control unit",
              "Explore interrupt handling",
              "Complete the quiz to test your understanding"
            ],
            posttest: [
              { question: "Which CPU component generates control signals during decoding?", options: ["ALU", "Control Unit", "Cache", "Memory"], answerIndex: 1 },
              { question: "The instruction ADD R1, R2, R3 performs:", options: ["R2 = R1 + R3", "R3 = R1 + R2", "R1 = R2 + R3", "R1 = R1 + R2"], answerIndex: 2 },
              { question: "Which CPU component is often called the \"conductor\" of the CPU?", options: ["ALU", "Register", "Cache", "Control Unit"], answerIndex: 3 },
              { question: "Which component performs arithmetic and logic operations during execution?", options: ["Memory", "ALU", "Program Counter", "Instruction Register"], answerIndex: 1 },
              { question: "During execution, results are typically stored in:", options: ["Registers or memory", "Address bus", "Control bus", "Cache only"], answerIndex: 0 },
              { question: "Which operation generally requires the fewest CPU cycles?", options: ["Multiplication", "Memory-to-register addition", "Register-to-register addition", "Interrupt handling"], answerIndex: 2 },
              { question: "Which operation usually requires the most CPU cycles?", options: ["Register-to-register addition", "Multiplication", "Instruction fetch", "Program Counter update"], answerIndex: 1 },
              { question: "Why does minimizing memory access improve performance?", options: ["Memory access is slower than register access", "Memory increases bus width", "Registers are slower than RAM", "Memory disables interrupts"], answerIndex: 0 },
              { question: "What is the primary purpose of an interrupt?", options: ["To increase memory size", "To stop the CPU permanently", "To allow the CPU to respond to external events", "To reduce cache usage"], answerIndex: 2 },
              { question: "Which of the following is an example of an I/O interrupt?", options: ["Key pressed on a keyboard", "CPU startup", "Memory allocation", "Register reset"], answerIndex: 0 },
              { question: "Timer interrupts are mainly used for:", options: ["Data encryption", "Time-slicing in multitasking", "Increasing RAM", "Register allocation"], answerIndex: 1 },
              { question: "Which of the following is a hardware interrupt example?", options: ["Mouse movement", "Division by zero", "Saving a file", "Opening a browser"], answerIndex: 1 },
              { question: "Before servicing an interrupt, the CPU first:", options: ["Clears all memory", "Restarts the operating system", "Finishes the current instruction", "Deletes the interrupt"], answerIndex: 2 },
              { question: "Before jumping to the interrupt handler, the CPU saves its current state to the:", options: ["Cache", "Stack", "ROM", "Hard Disk"], answerIndex: 1 },
              { question: "After completing the Interrupt Service Routine (ISR), the CPU:", options: ["Shuts down", "Starts a new program", "Clears all registers", "Restores the saved state and resumes execution"], answerIndex: 3 }
            ],
            references: [
              "Stallings, W. - 'Computer Organization and Architecture', 10th Edition, Chapter 3 on Instruction Cycle",
              "Patterson, D.A. and Hennessy, J.L. - 'Computer Organization and Design', 5th Edition, Chapter 4 on Instruction Execution"
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 3",
      objective: "Microprocessor Fundamentals (8085/8086/ARM), Assembly, Memory Hierarchy",
      tutorial: "Tutorial 3: Microprocessors and Memory",
      labTitle: "Lab 3: Microprocessor Architecture",
      experiments: [
        {
          id: "arch-m3-1",
          title: "Microprocessor Architecture and Assembly Programming",
          desc: "Learn the architecture of microprocessors (8085, 8086, ARM) and basic assembly programming.",
          expected: "Able to explain microprocessor architecture and write simple assembly programs.",
          content: {
            aim: {
              text: "This experiment introduces microprocessors—the chips that power everything from microwaves to smartphones. You'll learn about the evolution of microprocessors from the 8085 to ARM, their internal architecture, and how to write simple assembly programs. Assembly language is the lowest-level human-readable representation of code.",
              bullets: [
                "Understand the evolution of microprocessors",
                "Learn the internal architecture (ALU, registers, buses)",
                "Understand addressing modes",
                "Write simple assembly programs",
                "Understand instruction execution and timing"
              ]
            },
            theory: [
              {
                title: "The Evolution of Microprocessors",
                body: [
                  "Microprocessors have evolved dramatically since the 1970s:",
                  "• 1971: Intel 4004 (4-bit, 740 kHz, 2,300 transistors). The first microprocessor.",
                  "• 1974: Intel 8080 (8-bit, 2 MHz, 6,000 transistors). Used in the Altair 8800.",
                  "• 1976: Intel 8085 (8-bit, 3 MHz, 6,500 transistors). Improved 8080.",
                  "• 1978: Intel 8086 (16-bit, 5 MHz, 29,000 transistors). First x86 processor.",
                  "• 1982: Intel 80286 (16-bit, 8 MHz, 134,000 transistors).",
                  "• 1985: Intel 80386 (32-bit, 16 MHz, 275,000 transistors).",
                  "• 1993: Intel Pentium (32-bit, 60 MHz, 3.1 million transistors).",
                  "• 2006: Intel Core (64-bit, 2.66 GHz, 151 million transistors).",
                  "• 2023: Apple M3 (3 nm, >20 billion transistors).",
                  "ARM processors (used in most phones and tablets) follow a different philosophy: RISC (Reduced Instruction Set Computer) with fewer, simpler instructions that execute faster."
                ]
              },
              {
                title: "Microprocessor Architecture—Inside the Chip",
                body: [
                  "A microprocessor contains several key components:",
                  "• ALU (Arithmetic Logic Unit): Performs arithmetic and logic operations.",
                  "• Register File: A set of high-speed storage locations inside the CPU.",
                  "• Control Unit: Decodes instructions and generates control signals.",
                  "• Buses: Internal data, address, and control buses.",
                  "• Cache: Small, fast memory inside the CPU.",
                  "![Microprocessor Architecture](/cpu_internal_architecture.webp)",
                  "Registers are the fastest memory in the computer. The 8085 has 6 general-purpose registers (B, C, D, E, H, L) and a few special registers (Program Counter, Stack Pointer).",
                  "ARM has 16 general-purpose registers (R0-R15), where R13 is the stack pointer, R14 is the link register, and R15 is the program counter."
                ]
              },
              {
                title: "Addressing Modes—How to Access Data",
                body: [
                  "Addressing modes specify how to compute the address of an operand:",
                  "1. Immediate Addressing: The operand is in the instruction itself.",
                  "   Example: MOV R1, #5 (load the value 5 into R1).",
                  "2. Direct Addressing: The address of the operand is in the instruction.",
                  "   Example: MOV R1, [1000] (load the value at address 1000 into R1).",
                  "3. Indirect Addressing: A register contains the address of the operand.",
                  "   Example: MOV R1, [R2] (load the value at the address in R2).",
                  "4. Indexed Addressing: Base + offset.",
                  "   Example: MOV R1, [R2 + #4] (load from address R2 + 4).",
                  "Different addressing modes give programmers flexibility and are used for different data structures."
                ]
              },
              {
                title: "Simple Assembly Programs",
                body: [
                  "Assembly language is a human-readable version of machine code.",
                  "Example (8085): Add two numbers",
                  "```\nLDA 1000H  ; Load first number from address 1000H into A\nMOV B, A   ; Copy A to B\nLDA 1001H  ; Load second number from address 1001H into A\nADD B      ; Add B to A (result in A)\nSTA 1002H  ; Store result at address 1002H\nHLT        ; Halt\n```",
                  "Example (ARM): Add two numbers",
                  "```\nLDR R0, =1000  ; Load address 1000 into R0\nLDR R1, [R0]   ; Load value at 1000 into R1\nLDR R2, [R0, #4] ; Load value at 1004 into R2\nADD R3, R1, R2 ; R3 = R1 + R2\nSTR R3, [R0, #8] ; Store result at 1008\n```",
                  "Assembly is still used in: embedded systems, device drivers, operating system kernels, and performance-critical code."
                ]
              },
              {
                title: "Instruction Execution and Timing",
                body: [
                  "The time to execute an instruction depends on:",
                  "• Clock speed (faster clock = faster execution).",
                  "• Number of cycles per instruction (CPI).",
                  "Example (8085):",
                  "• MOV A, B: 1 cycle (fastest).",
                  "• ADD B: 1 cycle.",
                  "• LDA 1000H: 4 cycles (slower—memory access).",
                  "• STA 1000H: 4 cycles.",
                  "Execution time = (number of instructions × CPI) / clock speed.",
                  "Modern processors improve performance through:",
                  "• Pipelining: Multiple instructions in different stages simultaneously.",
                  "• Superscalar: Multiple instructions executed per cycle.",
                  "• Out-of-order execution: Instructions executed in a different order for efficiency."
                ]
              }
            ],
            pretest: [
              { question: "Which was the world's first microprocessor?", options: ["Intel 4004", "Intel 8085", "Intel 8086", "Intel Pentium"], answerIndex: 0 },
              { question: "The Intel 4004 was introduced in:", options: ["1974", "1971", "1976", "1978"], answerIndex: 1 },
              { question: "Which microprocessor was used in the Altair 8800?", options: ["Intel 8085", "Intel 8086", "Intel 8080", "Intel 80386"], answerIndex: 2 },
              { question: "Which processor is an improved version of the Intel 8080?", options: ["Intel Pentium", "Intel Core", "Intel 8086", "Intel 8085"], answerIndex: 3 },
              { question: "Which processor was the first member of the x86 family?", options: ["Intel 8086", "Intel 80286", "Intel 80386", "Intel Core"], answerIndex: 0 },
              { question: "Which processor introduced 32-bit architecture according to the timeline?", options: ["Intel 80286", "Intel 80386", "Intel Pentium", "Apple M3"], answerIndex: 1 },
              { question: "Which processor had approximately 3.1 million transistors?", options: ["Intel Core", "Intel Pentium", "Intel 8086", "Intel 8085"], answerIndex: 1 },
              { question: "Which processor mentioned in the notes is built using 3 nm technology?", options: ["Intel Pentium", "Intel Core", "Apple M3", "Intel 80386"], answerIndex: 2 },
              { question: "ARM processors mainly follow which architecture philosophy?", options: ["CISC", "RISC", "EPIC", "SIMD"], answerIndex: 1 },
              { question: "RISC stands for:", options: ["Reduced Instruction Set Computer", "Random Integrated System Computer", "Register Instruction System Controller", "Reduced Integrated Storage Circuit"], answerIndex: 0 },
              { question: "Which component performs arithmetic and logical operations?", options: ["Register File", "Control Unit", "ALU", "Cache"], answerIndex: 2 },
              { question: "Which component stores high-speed temporary data inside the CPU?", options: ["Register File", "RAM", "Hard Disk", "ROM"], answerIndex: 0 },
              { question: "Which unit decodes instructions and generates control signals?", options: ["Cache", "ALU", "Bus", "Control Unit"], answerIndex: 3 },
              { question: "Which memory is considered the fastest in a computer?", options: ["Cache", "Registers", "RAM", "SSD"], answerIndex: 1 },
              { question: "How many general-purpose registers does the 8085 have?", options: ["4", "6", "8", "16"], answerIndex: 1 }
            ],
            procedure: [
              "Open the microprocessor workspace",
              "Review the evolution of microprocessors",
              "Learn the internal architecture",
              "Understand addressing modes",
              "Write simple assembly programs",
              "Complete the quiz to test your understanding"
            ],
            posttest: [
              { question: "How many general-purpose registers are available in ARM?", options: ["8", "12", "16", "32"], answerIndex: 2 },
              { question: "In ARM architecture, which register acts as the Stack Pointer?", options: ["R15", "R14", "R13", "R12"], answerIndex: 2 },
              { question: "In ARM architecture, the Program Counter is:", options: ["R13", "R14", "R10", "R15"], answerIndex: 3 },
              { question: "Which addressing mode stores the operand directly inside the instruction?", options: ["Immediate Addressing", "Direct Addressing", "Indexed Addressing", "Indirect Addressing"], answerIndex: 0 },
              { question: "In MOV R1, [1000], the address is provided directly in the instruction. This is:", options: ["Indexed Addressing", "Direct Addressing", "Immediate Addressing", "Indirect Addressing"], answerIndex: 1 },
              { question: "In MOV R1, [R2], the register contains the operand address. This is:", options: ["Immediate Addressing", "Indexed Addressing", "Indirect Addressing", "Direct Addressing"], answerIndex: 2 },
              { question: "Which addressing mode uses Base + Offset?", options: ["Direct Addressing", "Indexed Addressing", "Immediate Addressing", "Indirect Addressing"], answerIndex: 1 },
              { question: "Assembly language is best described as:", options: ["A high-level programming language", "A scripting language", "A human-readable form of machine code", "A database language"], answerIndex: 2 },
              { question: "In the 8085 program, which instruction stores the result into memory?", options: ["LDA", "ADD", "MOV", "STA"], answerIndex: 3 },
              { question: "In the ARM example, which instruction performs the addition?", options: ["STR", "ADD", "LDR", "MOV"], answerIndex: 1 },
              { question: "Which of the following is a common application of assembly language?", options: ["Operating system kernels", "Word processing", "Spreadsheet creation", "Web browsing"], answerIndex: 0 },
              { question: "Which factor directly affects instruction execution time?", options: ["Screen resolution", "Clock speed", "Monitor size", "Keyboard layout"], answerIndex: 1 },
              { question: "According to the notes, which 8085 instruction requires 4 cycles?", options: ["ADD B", "MOV A, B", "LDA 1000H", "HLT"], answerIndex: 2 },
              { question: "Which technique allows multiple instructions to be in different execution stages simultaneously?", options: ["Out-of-order execution", "Superscalar", "Pipelining", "DMA"], answerIndex: 2 },
              { question: "Which modern processor feature executes multiple instructions in a single clock cycle?", options: ["Pipelining", "Cache Memory", "Interrupt Handling", "Superscalar"], answerIndex: 3 }
            ],
            references: [
              "Stallings, W. - 'Computer Organization and Architecture', 10th Edition, Chapter 7 on Microprocessors",
              "Mazidi, M.A. - 'The 8051 Microcontroller and Embedded Systems', 2nd Edition, Chapters 1-3 on Microprocessor Architecture"
            ]
          }
        },
        {
          id: "arch-m3-2",
          title: "Memory Hierarchy—Cache, Main Memory, Virtual Memory",
          desc: "Understand the memory hierarchy from cache to virtual memory.",
          expected: "Able to explain cache mapping techniques, virtual memory, and the memory hierarchy.",
          content: {
            aim: {
              text: "This experiment explores the memory hierarchy—the layered approach to memory that balances speed, size, and cost. You'll learn about cache memory and its mapping techniques, main memory (RAM, ROM), and virtual memory concepts. Understanding this hierarchy is essential for system performance optimization.",
              bullets: [
                "Understand the need for memory hierarchy",
                "Learn about cache mapping techniques",
                "Understand main memory types (RAM, ROM)",
                "Explore virtual memory concepts",
                "Understand the role of secondary storage"
              ]
            },
            theory: [
              {
                title: "The Memory Hierarchy—Why We Need Layers",
                body: [
                  "A single type of memory can't satisfy all needs:",
                  "• Speed: We need fast memory for performance.",
                  "• Size: We need large memory for complex programs.",
                  "• Cost: Memory must be affordable.",
                  "The solution: a hierarchy of memory types:",
                  "![Memory Hierarchy Layers](/memory_hierarchy_pyramid.webp)",
                  "Level 0: Registers (fastest, smallest, most expensive)",
                  "Level 1: Cache (very fast, small, expensive)",
                  "Level 2: Main Memory (fast, large, affordable)",
                  "Level 3: Disk (slow, huge, cheap)",
                  "The goal: keep the most frequently used data in the fastest memory."
                ]
              },
              {
                title: "Cache Memory—The Speed Booster",
                body: [
                  "Cache is a small, fast memory that stores copies of frequently used data from main memory.",
                  "How it works: When the CPU needs data, it checks the cache first. If the data is there (a hit), it's fast. If not (a miss), the CPU waits for data from main memory.",
                  "Cache mapping: How data from main memory is placed in cache:",
                  "1. Direct Mapping: Each memory block maps to exactly one cache slot.",
                  "   Simple but inefficient.",
                  "2. Fully Associative Mapping: Any memory block can go anywhere in cache.",
                  "   Flexible but expensive to implement.",
                  "3. Set-Associative Mapping: A compromise between direct and fully associative.",
                  "   Memory blocks are divided into sets, each block can go anywhere in its set.",
                  "Cache replacement policies: When the cache is full, which block to remove?",
                  "• LRU (Least Recently Used): Remove the block not used for the longest time.",
                  "• FIFO (First In First Out): Remove the oldest block.",
                  "• Random: Randomly remove a block."
                ]
              },
              {
                title: "Main Memory—RAM and ROM",
                body: [
                  "Main memory is where programs and data are stored when the computer is running.",
                  "RAM (Random Access Memory):",
                  "• Volatile: Data is lost when power is turned off.",
                  "• Read-write: Can be both read and written.",
                  "• DRAM (Dynamic RAM): Needs periodic refresh. Cheaper, slower.",
                  "• SRAM (Static RAM): No refresh needed. Faster, more expensive.",
                  "ROM (Read-Only Memory):",
                  "• Non-volatile: Data is retained when power is off.",
                  "• Read-only: Can only be read (except for programmable variants).",
                  "• Types: Mask ROM (factory-programmed), PROM (programmable once), EPROM (erasable), EEPROM (electrically erasable).",
                  "ROM stores firmware—the low-level software that boots the computer."
                ]
              },
              {
                title: "Virtual Memory—Making Memory Look Bigger",
                body: [
                  "Virtual memory makes it seem like the computer has more memory than it actually has.",
                  "How it works:",
                  "• The program uses virtual addresses.",
                  "• The MMU (Memory Management Unit) translates virtual addresses to physical addresses.",
                  "• Only part of the program is in physical memory at any time.",
                  "• The rest is stored on disk (in the swap file or page file).",
                  "Two key concepts:",
                  "1. Paging: Memory is divided into fixed-size pages (typically 4KB).",
                  "2. Segmentation: Memory is divided into variable-size segments.",
                  "Page replacement algorithms (when a new page is needed and memory is full):",
                  "• LRU (Least Recently Used): Remove the page not used for the longest time.",
                  "• FIFO (First In First Out): Remove the oldest page.",
                  "• Clock algorithm: A variation of LRU used in many operating systems."
                ]
              },
              {
                title: "Secondary Storage and the Future of Memory",
                body: [
                  "Secondary storage provides permanent storage for data and programs:",
                  "• HDD (Hard Disk Drive): Magnetic storage, cheap, slow, large capacity.",
                  "• SSD (Solid State Drive): Flash memory, faster, more expensive, lower capacity.",
                  "• Optical storage: CD, DVD, Blu-ray.",
                  "Trends in memory technology:",
                  "• NAND flash (SSDs): Getting cheaper and faster.",
                  "• Persistent memory (Optane, MRAM): Combines the speed of RAM with the persistence of storage.",
                  "• Storage class memory: A new tier between main memory and storage.",
                  "The future: Memory technologies that are both fast and persistent, blurring the line between memory and storage."
                ]
              }
            ],
            pretest: [
              { question: "Why is a memory hierarchy used in computers?", options: ["To satisfy speed, size, and cost requirements simultaneously.", "To eliminate RAM completely.", "To increase processor clock speed.", "To reduce the number of registers."], answerIndex: 0 },
              { question: "Which level of the memory hierarchy is the fastest?", options: ["Main Memory", "Cache", "Registers", "Disk"], answerIndex: 2 },
              { question: "Which memory level provides the largest storage capacity?", options: ["Registers", "Disk", "Cache", "Main Memory"], answerIndex: 1 },
              { question: "Which memory level is located directly below registers in the hierarchy?", options: ["Cache", "Disk", "ROM", "Main Memory"], answerIndex: 0 },
              { question: "The primary purpose of cache memory is to:", options: ["Store the operating system permanently.", "Store copies of frequently used data.", "Replace RAM.", "Increase disk capacity."], answerIndex: 1 },
              { question: "A cache hit occurs when:", options: ["Data is found in the cache.", "Data is stored on disk.", "Data is removed from memory.", "Cache memory becomes full."], answerIndex: 0 },
              { question: "A cache miss means:", options: ["Data is available in registers.", "The CPU must fetch data from main memory.", "The cache has been deleted.", "Memory is corrupted."], answerIndex: 1 },
              { question: "Which cache mapping technique assigns each memory block to exactly one cache location?", options: ["Fully Associative Mapping", "Set-Associative Mapping", "Direct Mapping", "Random Mapping"], answerIndex: 2 },
              { question: "Which cache mapping technique allows a memory block to be placed anywhere in the cache?", options: ["Direct Mapping", "Fully Associative Mapping", "Indexed Mapping", "Set Mapping"], answerIndex: 1 },
              { question: "Which cache mapping method is a compromise between direct and fully associative mapping?", options: ["Sequential Mapping", "Circular Mapping", "Set-Associative Mapping", "Random Mapping"], answerIndex: 2 },
              { question: "Which cache replacement policy removes the least recently used block?", options: ["LRU", "FIFO", "Random", "MRU"], answerIndex: 0 },
              { question: "Which replacement policy removes the oldest block first?", options: ["Random", "FIFO", "Clock", "LRU"], answerIndex: 1 },
              { question: "Which replacement policy selects a block randomly for removal?", options: ["FIFO", "LRU", "Random", "Clock"], answerIndex: 2 },
              { question: "RAM is classified as:", options: ["Non-volatile memory", "Permanent memory", "Read-only memory", "Volatile memory"], answerIndex: 3 },
              { question: "What happens to RAM contents when power is turned off?", options: ["They are permanently stored.", "They are transferred to ROM.", "They are lost.", "They are copied to cache."], answerIndex: 2 }
            ],
            procedure: [
              "Open the memory workspace",
              "Review the memory hierarchy",
              "Understand cache mapping techniques",
              "Learn about RAM and ROM",
              "Explore virtual memory concepts",
              "Complete the quiz to test your understanding"
            ],
            posttest: [
              { question: "Which type of RAM requires periodic refreshing?", options: ["SRAM", "DRAM", "PROM", "EEPROM"], answerIndex: 1 },
              { question: "Which type of RAM does not require periodic refresh?", options: ["DRAM", "SDRAM", "SRAM", "DDR RAM"], answerIndex: 2 },
              { question: "ROM is mainly used to store:", options: ["Temporary variables", "Firmware", "Cache data", "Virtual memory"], answerIndex: 1 },
              { question: "Which type of ROM can be programmed only once?", options: ["EEPROM", "EPROM", "PROM", "Flash ROM"], answerIndex: 2 },
              { question: "Which ROM type can be erased electrically?", options: ["Mask ROM", "EEPROM", "PROM", "DRAM"], answerIndex: 1 },
              { question: "Virtual memory allows a computer to:", options: ["Increase processor speed.", "Appear to have more memory than physically available.", "Replace cache memory.", "Remove the need for RAM."], answerIndex: 1 },
              { question: "Which hardware unit translates virtual addresses into physical addresses?", options: ["ALU", "Control Unit", "MMU", "Register File"], answerIndex: 2 },
              { question: "In virtual memory, pages are typically:", options: ["Variable-sized blocks", "Fixed-sized blocks", "Unlimited in size", "Equal to disk sectors"], answerIndex: 1 },
              { question: "Which memory management technique divides memory into variable-sized segments?", options: ["Paging", "Segmentation", "Swapping", "Caching"], answerIndex: 1 },
              { question: "Which page replacement algorithm is a variation of LRU?", options: ["FIFO", "Random", "Clock Algorithm", "Stack Algorithm"], answerIndex: 2 },
              { question: "Which storage device uses magnetic technology?", options: ["SSD", "HDD", "Blu-ray Disc", "EEPROM"], answerIndex: 1 },
              { question: "Which secondary storage device uses flash memory?", options: ["HDD", "CD", "SSD", "DVD"], answerIndex: 2 },
              { question: "Which of the following is an example of optical storage?", options: ["SSD", "RAM", "Blu-ray Disc", "Cache"], answerIndex: 2 },
              { question: "Persistent memory aims to combine:", options: ["Large capacity with magnetic storage", "RAM speed with storage persistence", "Cache with ROM", "HDD with optical storage"], answerIndex: 1 },
              { question: "Storage Class Memory is intended to:", options: ["Replace registers completely.", "Replace the CPU.", "Remove virtual memory.", "Create a new layer between main memory and storage."], answerIndex: 3 }
            ],
            references: [
              "Stallings, W. - 'Computer Organization and Architecture', 10th Edition, Chapters 4-5 on Memory",
              "Patterson, D.A. and Hennessy, J.L. - 'Computer Organization and Design', 5th Edition, Chapter 5 on Memory Hierarchy"
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 4",
      objective: "Digital Logic Gates, Boolean Algebra, Karnaugh Maps, Combinational Circuits",
      tutorial: "Tutorial 4: Digital Logic and Combinational Circuits",
      labTitle: "Lab 4: Digital Logic",
      experiments: [
        {
          id: "arch-m4-1",
          title: "Logic Gates and Boolean Algebra",
          desc: "Learn about basic logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) and Boolean algebra.",
          expected: "Able to understand logic gates, truth tables, and Boolean algebra operations.",
          content: {
            aim: {
              text: "This experiment introduces digital logic—the foundation of all digital circuits. You'll learn about basic logic gates, their truth tables, and Boolean algebra—the mathematical system that underlies all digital design.",
              bullets: [
                "Understand basic logic gates (AND, OR, NOT)",
                "Understand universal gates (NAND, NOR)",
                "Understand XOR and XNOR gates",
                "Learn Boolean algebra postulates and theorems",
                "Simplify Boolean expressions"
              ]
            },
            theory: [
              {
                title: "Logic Gates—The Building Blocks of Digital Circuits",
                body: [
                  "A logic gate is an electronic circuit that performs a Boolean function.",
                  "There are seven basic logic gates:",
                  "1. AND: Output is 1 only if all inputs are 1.",
                  "   Symbol: A · B, Truth: 0·0=0, 0·1=0, 1·0=0, 1·1=1",
                  "2. OR: Output is 1 if any input is 1.",
                  "   Symbol: A + B, Truth: 0+0=0, 0+1=1, 1+0=1, 1+1=1",
                  "3. NOT: Output is the complement of the input.",
                  "   Symbol: A' or ¬A, Truth: ¬0=1, ¬1=0",
                  "4. NAND: AND followed by NOT (universal gate).",
                  "   Symbol: (A·B)', Truth: 0·0=1, 0·1=1, 1·0=1, 1·1=0",
                  "5. NOR: OR followed by NOT (universal gate).",
                  "   Symbol: (A+B)', Truth: 0+0=1, 0+1=0, 1+0=0, 1+1=0",
                  "6. XOR: Output is 1 if inputs differ.",
                  "   Symbol: A ⊕ B, Truth: 0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0",
                  "7. XNOR: Output is 1 if inputs are the same.",
                  "   Symbol: (A⊕B)', Truth: 0⊕0=1, 0⊕1=0, 1⊕0=0, 1⊕1=1",
                  "![Logic Gates](/logic_gates_symbols.webp)"
                ]
              },
              {
                title: "Boolean Algebra—The Mathematics of Logic",
                body: [
                  "Boolean algebra is the mathematical system used to analyze and simplify digital circuits.",
                  "Variables: A, B, C, ... (take values 0 or 1).",
                  "Operators: AND (·), OR (+), NOT (').",
                  "Postulates (axioms):",
                  "1. 0 · 0 = 0, 0 + 0 = 0",
                  "2. 0 · 1 = 0, 0 + 1 = 1",
                  "3. 1 · 0 = 0, 1 + 0 = 1",
                  "4. 1 · 1 = 1, 1 + 1 = 1",
                  "5. Complement: ¬0 = 1, ¬1 = 0",
                  "Theorems (derived from the postulates):",
                  "• Idempotent: A · A = A, A + A = A",
                  "• Double negation: ¬(¬A) = A",
                  "• Absorption: A · (A + B) = A, A + (A · B) = A",
                  "• De Morgan's: ¬(A · B) = ¬A + ¬B, ¬(A + B) = ¬A · ¬B",
                ]
              },
              {
                title: "Truth Tables—Mapping Inputs to Outputs",
                body: [
                  "A truth table lists all possible input combinations and the corresponding outputs.",
                  "Example: Half adder (adds two bits):",
                  "| A | B | Sum | Carry |",
                  "| 0 | 0 |  0  |   0   |",
                  "| 0 | 1 |  1  |   0   |",
                  "| 1 | 0 |  1  |   0   |",
                  "| 1 | 1 |  0  |   1   |",
                  "Sum = A ⊕ B (XOR), Carry = A · B (AND).",
                  "Truth tables are the foundation of digital design—they tell us exactly what a circuit must do."
                ]
              },
              {
                title: "Simplifying Boolean Expressions—Getting Smaller Circuits",
                body: [
                  "Simplification reduces the number of gates needed to implement a function.",
                  "Methods:",
                  "1. Boolean algebra manipulation (using the theorems).",
                  "2. Karnaugh maps (K-maps) — covered in the next experiment.",
                  "3. Quine-McCluskey (tabular method).",
                  "Example: Simplify F = A'B' + A'B + AB",
                  "F = A'(B' + B) + AB = A'·1 + AB = A' + AB",
                  "F = A' + AB = A' + B (absorption).",
                  "Original circuit: 4 gates. Simplified: 1 gate!",
                  "Simplification reduces cost, size, and power consumption."
                ]
              },
              {
                title: "From Logic Gates to Microprocessors",
                body: [
                  "Logic gates are the building blocks of all digital systems:",
                  "• Gates combine to form combinational circuits (adders, multiplexers).",
                  "• Combinational circuits combine to form sequential circuits (flip-flops, registers).",
                  "• Sequential circuits form functional units (ALU, control unit).",
                  "• Functional units form the CPU.",
                  "The transistor count in modern CPUs is in the billions—each one is a tiny switch that works like a logic gate."
                ]
              }
            ],
            pretest: [
              { question: "A logic gate is an electronic circuit that performs a:", options: ["Arithmetic operation", "Boolean function", "Memory operation", "Storage operation"], answerIndex: 1 },
              { question: "Which logic gate produces an output of 1 only when all inputs are 1?", options: ["OR", "XOR", "AND", "NOR"], answerIndex: 2 },
              { question: "Which logic gate produces an output of 1 if at least one input is 1?", options: ["OR", "AND", "NAND", "XNOR"], answerIndex: 0 },
              { question: "Which gate outputs the complement of its input?", options: ["XOR", "NAND", "OR", "NOT"], answerIndex: 3 },
              { question: "Which gate is obtained by applying a NOT operation to an AND gate?", options: ["NOR", "XOR", "NAND", "XNOR"], answerIndex: 2 },
              { question: "Which gate is obtained by applying a NOT operation to an OR gate?", options: ["XNOR", "NOR", "NAND", "XOR"], answerIndex: 1 },
              { question: "Which logic gate gives an output of 1 when the inputs are different?", options: ["XOR", "AND", "NOR", "OR"], answerIndex: 0 },
              { question: "Which logic gate gives an output of 1 when both inputs are the same?", options: ["XOR", "XNOR", "NAND", "AND"], answerIndex: 1 },
              { question: "Which two gates are known as universal gates?", options: ["AND and OR", "XOR and XNOR", "NAND and NOR", "AND and NOT"], answerIndex: 2 },
              { question: "The Boolean operator '+' represents:", options: ["NOT", "OR", "XOR", "AND"], answerIndex: 1 },
              { question: "The Boolean operator '·' represents:", options: ["AND", "OR", "NAND", "NOT"], answerIndex: 0 },
              { question: "In Boolean algebra, the complement of 1 is:", options: ["2", "1", "0", "Undefined"], answerIndex: 2 },
              { question: "Which theorem states A · A = A?", options: ["Absorption", "Idempotent", "De Morgan's", "Double Negation"], answerIndex: 1 },
              { question: "Which theorem states ¬(¬A) = A?", options: ["Idempotent", "De Morgan's", "Absorption", "Double Negation"], answerIndex: 3 },
              { question: "Which theorem is represented by A + (A · B) = A?", options: ["Absorption", "Idempotent", "De Morgan's", "Complement"], answerIndex: 0 }
            ],
            procedure: [
              "Open the digital logic workspace",
              "Review the basic logic gates and truth tables",
              "Learn Boolean algebra postulates and theorems",
              "Simplify Boolean expressions",
              "Implement logic functions using gates",
              "Complete the quiz to test your understanding"
            ],
            posttest: [
              { question: "Which theorem states ¬(A · B) = ¬A + ¬B?", options: ["Complement", "Absorption", "De Morgan's", "Idempotent"], answerIndex: 2 },
              { question: "A truth table is used to:", options: ["Store binary numbers", "Display all input combinations and outputs", "Increase processor speed", "Simplify assembly programs"], answerIndex: 1 },
              { question: "In a half adder, the Sum output is generated using:", options: ["OR", "XOR", "NAND", "AND"], answerIndex: 1 },
              { question: "In a half adder, the Carry output is generated using:", options: ["AND", "OR", "XOR", "NOR"], answerIndex: 0 },
              { question: "What are the outputs of a half adder when A = 1 and B = 1?", options: ["Sum = 1, Carry = 0", "Sum = 1, Carry = 1", "Sum = 0, Carry = 1", "Sum = 0, Carry = 0"], answerIndex: 2 },
              { question: "Which method of simplification is introduced in the next experiment?", options: ["Quine–McCluskey", "Boolean Algebra", "Karnaugh Map (K-map)", "Binary Tree"], answerIndex: 2 },
              { question: "Which simplification technique is also known as the tabular method?", options: ["K-map", "Boolean Algebra", "Truth Table", "Quine–McCluskey"], answerIndex: 3 },
              { question: "The primary goal of Boolean simplification is to:", options: ["Increase memory size", "Reduce the number of logic gates", "Increase CPU frequency", "Expand storage capacity"], answerIndex: 1 },
              { question: "Simplifying Boolean expressions mainly reduces:", options: ["Screen resolution", "Processor temperature only", "Network bandwidth", "Cost, size, and power consumption"], answerIndex: 3 },
              { question: "Combinational circuits are formed by combining:", options: ["Registers", "Logic gates", "RAM modules", "Processors"], answerIndex: 1 },
              { question: "Which of the following is an example of a combinational circuit?", options: ["Register", "Flip-flop", "Adder", "Counter"], answerIndex: 2 },
              { question: "Which type of circuit includes flip-flops and registers?", options: ["Combinational circuits", "Sequential circuits", "Arithmetic circuits", "Memory buses"], answerIndex: 1 },
              { question: "Functional units such as the ALU and Control Unit are formed from:", options: ["Sequential circuits", "Optical devices", "Cache memory", "Hard disks"], answerIndex: 0 },
              { question: "Functional units combine to form the:", options: ["Memory hierarchy", "CPU", "Bus system", "Input devices"], answerIndex: 1 },
              { question: "Modern CPUs contain billions of:", options: ["Capacitors", "Resistors", "Logic gates implemented using transistors", "Relays"], answerIndex: 2 }
            ],
            references: [
              "Mano, M.M. - 'Digital Design', 6th Edition, Chapter 2 on Boolean Algebra",
              "Roth, C.H. - 'Fundamentals of Logic Design', 7th Edition, Chapter 2 on Boolean Algebra"
            ]
          }
        },
        {
          id: "arch-m4-2",
          title: "Karnaugh Maps and Combinational Circuits",
          desc: "Learn to simplify Boolean functions using Karnaugh maps and design combinational circuits.",
          expected: "Able to simplify functions using K-maps and design adders, multiplexers, and decoders.",
          content: {
            aim: {
              text: "This experiment covers Karnaugh maps—a graphical method for simplifying Boolean expressions. You'll also learn to design combinational circuits like adders, subtractors, multiplexers, and decoders—the building blocks of ALUs and control units.",
              bullets: [
                "Understand Karnaugh maps for 2, 3, and 4 variables",
                "Group minterms to simplify expressions",
                "Design half adders and full adders",
                "Design subtractors and comparators",
                "Design multiplexers and demultiplexers",
                "Design encoders and decoders"
              ]
            },
            theory: [
              {
                title: "Karnaugh Maps—Visual Boolean Simplification",
                body: [
                  "A Karnaugh map (K-map) is a graphical way to simplify Boolean expressions.",
                  "It represents all possible input combinations in a grid.",
                  "![Karnaugh Map](/karnaugh_map_example.webp)",
                  "For 2 variables: 2×2 grid.",
                  "For 3 variables: 2×4 grid.",
                  "For 4 variables: 4×4 grid.",
                  "How to simplify:",
                  "1. Fill in the K-map with 1s for each minterm.",
                  "2. Group adjacent 1s in powers of 2 (1, 2, 4, 8, ...).",
                  "3. The larger the group, the simpler the expression.",
                  "4. Each group gives a product term.",
                  "5. OR all the product terms to get the simplified expression.",
                  "Example: F(A,B,C) = Σ(0,1,2,3,7)",
                  "K-map grouping: 000, 001, 010, 011 → group of 4 → A'",
                  "111 → group of 1 → ABC",
                  "F = A' + ABC = A' + BC (absorption)."
                ]
              },
              {
                title: "Adders and Subtractors—The Arithmetic Unit",
                body: [
                  "Adders perform binary addition—the most common operation in the ALU.",
                  "Half Adder: Adds 2 bits.",
                  "• Sum = A ⊕ B, Carry = A · B",
                  "Full Adder: Adds 3 bits (A, B, and carry-in).",
                  "• Sum = A ⊕ B ⊕ C_in",
                  "• Carry_out = (A·B) + (C_in·(A⊕B))",
                  "![Adder Circuit](/math_full_adder.webp)",
                  "Subtractor: Subtracts two binary numbers using addition.",
                  "• Use two's complement: A - B = A + (~B + 1).",
                  "• The same adder can be used for both addition and subtraction!",
                  "Ripple-carry adder: Simple but slow (carry propagates through all bits).",
                  "Carry-lookahead adder: Faster (carry is computed in parallel)."
                ]
              },
              {
                title: "Multiplexers and Demultiplexers—Data Selectors",
                body: [
                  "Multiplexer (MUX): Selects one of several inputs and routes it to a single output.",
                  "• 2-to-1 MUX: 2 data inputs, 1 select line.",
                  "• 4-to-1 MUX: 4 data inputs, 2 select lines.",
                  "• 8-to-1 MUX: 8 data inputs, 3 select lines.",
                  "MUX is the basis of many digital designs:",
                  "• ALU operation selection.",
                  "• Register file read/write.",
                  "• Bus arbitration.",
                  "Demultiplexer (DEMUX): Routes one input to one of several outputs.",
                  "• 1-to-2 DEMUX: 1 data input, 1 select line.",
                  "• 1-to-4 DEMUX: 1 data input, 2 select lines.",
                  "• Used in decoders and address decoders."
                ]
              },
              {
                title: "Encoders and Decoders—Data Converters",
                body: [
                  "Encoder: Converts from one format to another (compresses data).",
                  "• Example: 8-to-3 encoder: 8 inputs → 3-bit output.",
                  "• Binary encoder: Output is the binary representation of the active input.",
                  "• Priority encoder: If multiple inputs are active, output the highest-priority one.",
                  "Decoder: Converts from one format to another (expands data).",
                  "• Example: 3-to-8 decoder: 3-bit input → 8 outputs.",
                  "• Each output corresponds to one input combination.",
                  "Decoders are used in:",
                  "• Memory address decoders (select a specific memory location).",
                  "• Display drivers (convert a number to a 7-segment display pattern).",
                  "• Instruction decoders (decode which operation to perform)."
                ]
              },
              {
                title: "Design Example—A Simple ALU",
                body: [
                  "Let's design a 4-bit ALU that can perform four operations:",
                  "• ADD (A + B)",
                  "• SUB (A - B)",
                  "• AND (A · B)",
                  "• OR (A + B)",
                  "Components:",
                  "• 4-bit adder (for ADD and SUB).",
                  "• 4-bit AND and OR gates.",
                  "• 4-to-1 MUX to select the output.",
                  "• Control lines (2 bits) to select the operation.",
                  "This is how real ALUs work—they just combine simple circuits in a smart way.",
                  "Modern ALUs are more complex (with multiplication, division, shifting, and more), but the basic idea is the same."
                ]
              }
            ],
            pretest: [
              { question: "What is the primary purpose of a Karnaugh Map (K-map)?", options: ["Increase memory capacity", "Simplify Boolean expressions graphically", "Perform arithmetic operations", "Store binary data"], answerIndex: 1 },
              { question: "A K-map for 2 variables consists of:", options: ["2 × 2 grid", "2 × 4 grid", "4 × 4 grid", "8 × 8 grid"], answerIndex: 0 },
              { question: "A K-map for 3 variables is arranged as:", options: ["2 × 2", "4 × 4", "2 × 4", "8 × 2"], answerIndex: 2 },
              { question: "A K-map for 4 variables contains:", options: ["2 × 4 cells", "4 × 4 cells", "8 × 8 cells", "2 × 8 cells"], answerIndex: 1 },
              { question: "The first step in K-map simplification is to:", options: ["Draw logic gates", "Fill the map with 1s for the given minterms", "Convert to hexadecimal", "Perform binary addition"], answerIndex: 1 },
              { question: "Adjacent 1s in a K-map should be grouped in powers of:", options: ["10", "4", "2", "8 only"], answerIndex: 2 },
              { question: "Larger groups in a K-map generally produce:", options: ["More complex expressions", "Simpler Boolean expressions", "Larger truth tables", "More variables"], answerIndex: 1 },
              { question: "After forming groups in a K-map, each group produces a:", options: ["Memory address", "Product term", "Sum output", "Register value"], answerIndex: 1 },
              { question: "The final simplified Boolean expression is obtained by:", options: ["ANDing all product terms", "ORing all product terms", "XORing all product terms", "Complementing all product terms"], answerIndex: 1 },
              { question: "Which circuit performs binary addition in an ALU?", options: ["Decoder", "Multiplexer", "Adder", "Encoder"], answerIndex: 2 },
              { question: "A Half Adder adds:", options: ["Two bits", "Three bits", "Four bits", "Eight bits"], answerIndex: 0 },
              { question: "The Sum output of a Half Adder is:", options: ["A · B", "A + B", "A ⊕ B", "A'"], answerIndex: 2 },
              { question: "The Carry output of a Half Adder is:", options: ["A · B", "A ⊕ B", "A + B", "A'"], answerIndex: 0 },
              { question: "A Full Adder adds:", options: ["Two inputs only", "Three inputs including carry-in", "Four inputs", "Two carry bits"], answerIndex: 1 },
              { question: "Which input is present in a Full Adder but not in a Half Adder?", options: ["Sum", "Carry-out", "Carry-in", "Overflow"], answerIndex: 2 }
            ],
            procedure: [
              "Open the digital logic workspace",
              "Use K-maps to simplify Boolean expressions",
              "Design half adders and full adders",
              "Design multiplexers and demultiplexers",
              "Design encoders and decoders",
              "Design a simple ALU",
              "Complete the quiz to test your understanding"
            ],
            posttest: [
              { question: "Binary subtraction is commonly performed using:", options: ["Gray code", "One's complement only", "Two's complement", "BCD"], answerIndex: 2 },
              { question: "Which type of adder is simple but slower because the carry propagates through all bits?", options: ["Carry-lookahead adder", "Ripple-carry adder", "Half Adder", "Parallel adder"], answerIndex: 1 },
              { question: "Which adder computes carries in parallel for higher speed?", options: ["Ripple-carry adder", "Half Adder", "Full Adder", "Carry-lookahead adder"], answerIndex: 3 },
              { question: "A Multiplexer (MUX) is used to:", options: ["Store data permanently", "Select one input and send it to a single output", "Perform subtraction", "Expand data"], answerIndex: 1 },
              { question: "A 4-to-1 Multiplexer requires:", options: ["1 select line", "2 select lines", "3 select lines", "4 select lines"], answerIndex: 1 },
              { question: "An 8-to-1 Multiplexer requires:", options: ["1 select line", "2 select lines", "3 select lines", "4 select lines"], answerIndex: 2 },
              { question: "Which application commonly uses Multiplexers?", options: ["ALU operation selection", "Permanent storage", "Memory refresh", "Disk formatting"], answerIndex: 0 },
              { question: "A Demultiplexer (DEMUX) routes:", options: ["Many inputs to one output", "One input to one of several outputs", "Many outputs to one input", "Multiple outputs to multiple inputs"], answerIndex: 1 },
              { question: "A 1-to-4 DEMUX uses:", options: ["One select line", "Two select lines", "Three select lines", "Four select lines"], answerIndex: 1 },
              { question: "An Encoder is used to:", options: ["Expand data", "Compress input information into fewer output bits", "Store binary numbers", "Perform addition"], answerIndex: 1 },
              { question: "Which encoder outputs the highest-priority active input when multiple inputs are active?", options: ["Binary encoder", "Priority encoder", "Decimal encoder", "Gray encoder"], answerIndex: 1 },
              { question: "A 3-to-8 Decoder converts:", options: ["8 inputs into 3 outputs", "3-bit input into 8 outputs", "3 outputs into 8 inputs", "8 outputs into 3 inputs"], answerIndex: 1 },
              { question: "Which of the following is a common application of a decoder?", options: ["Memory address decoding", "Cache replacement", "Program execution", "Data compression"], answerIndex: 0 },
              { question: "In the simple 4-bit ALU described, which component selects the required operation output?", options: ["Decoder", "Encoder", "4-to-1 Multiplexer", "Register"], answerIndex: 2 },
              { question: "The ALU operations described in the design example are selected using:", options: ["One control line", "Two control lines", "Three control lines", "Four control lines"], answerIndex: 1 }
            ],
            references: [
              "Mano, M.M. - 'Digital Design', 6th Edition, Chapters 3-4 on Combinational Logic",
              "Roth, C.H. - 'Fundamentals of Logic Design', 7th Edition, Chapters 4-6 on Combinational Circuits"
            ]
          }
        }
      ]
    }
  ]
};