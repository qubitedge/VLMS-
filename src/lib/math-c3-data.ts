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
                  "![Binary Switch](/binary_switch.webp)",
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
                  "![Decimal to Binary](/decimal_to_binary.webp)",
                  "Check: 1×8 + 1×4 + 0×2 + 1×1 = 13. ✓"
                ]
              },
              {
                title: "Octal and Hexadecimal—Shorthand for Binary",
                body: [
                  "Binary numbers get long quickly. 255₁₀ is 11111111₂—eight bits!",
                  "Octal (base 8) groups binary digits in threes: 11111111₂ = 377₈.",
                  "Hexadecimal (base 16) groups binary digits in fours: 11111111₂ = FF₁₆.",
                  "![Octal Hexadecimal](/octal_hexadecimal.webp)",
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
                  "![Conversion Example](/conversion_example.webp)",
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
            pretest: [],
            procedure: [
              "Open the number systems workspace",
              "Convert decimal numbers to binary using the division method",
              "Convert binary numbers to decimal",
              "Convert between octal, decimal, and hexadecimal",
              "Practice conversions between all systems",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
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
                  "![Signed Representations](/signed_representations.webp)",
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
                  "![Two's Complement](/twos_complement.webp)",
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
                  "![Binary Addition](/binary_addition.webp)",
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
                  "![Overflow](/overflow.webp)",
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
                  "![IEEE 754](/ieee_754.webp)",
                  "A double (double precision) uses 64 bits:",
                  "• 1 bit: sign",
                  "• 11 bits: exponent (biased by 1023)",
                  "• 52 bits: mantissa",
                  "The value is: (-1)^sign × (1.mantissa) × 2^(exponent - bias).",
                  "Floating point is a trade-off: it can represent a huge range of numbers, but not all numbers exactly (3.14 is an approximation)."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the arithmetic workspace",
              "Practice sign-magnitude, one's complement, and two's complement",
              "Convert between signed representations",
              "Perform binary addition and subtraction",
              "Detect overflow in binary operations",
              "Understand IEEE 754 floating point",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
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
                  "![CPU Structure](/cpu_structure.webp)",
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
                  "![Memory Hierarchy](/memory_hierarchy.webp)",
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
                  "![IO System](/io_system.webp)",
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
                  "![Bus System](/bus_system.webp)",
                  "Bus width (number of parallel lines) determines performance:",
                  "• 8-bit bus: Carries 8 bits at a time.",
                  "• 32-bit bus: Carries 32 bits at a time.",
                  "• 64-bit bus: Carries 64 bits at a time.",
                  "Modern CPUs have multiple buses (front-side bus, memory bus, I/O bus) to reduce bottlenecks."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the architecture workspace",
              "Review the Von Neumann architecture",
              "Learn about the CPU's functional units",
              "Understand the memory hierarchy",
              "Explore I/O systems",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
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
                  "![Instruction Cycle](/instruction_cycle.webp)",
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
                  "![Fetch Phase](/fetch_phase.webp)",
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
                  "![Decode Phase](/decode_phase.webp)",
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
                  "![Execute Phase](/execute_phase.webp)",
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
                  "![Interrupt Handling](/interrupt_handling.webp)",
                  "The interrupt cycle:",
                  "1. The CPU finishes the current instruction.",
                  "2. It saves the current state (PC and registers) to the stack.",
                  "3. It jumps to the interrupt handler (Interrupt Service Routine).",
                  "4. After handling the interrupt, it restores the state and resumes.",
                  "This is how multitasking works—the CPU switches between processes so fast that they appear to run simultaneously."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the architecture workspace",
              "Review the instruction cycle steps",
              "Trace the instruction cycle for simple instructions",
              "Understand the role of the control unit",
              "Explore interrupt handling",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
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
                  "![Microprocessor Evolution](/microprocessor_evolution.webp)",
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
                  "![Microprocessor Architecture](/microprocessor_architecture.webp)",
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
                  "![Addressing Modes](/addressing_modes.webp)",
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
                  "![Assembly Program](/assembly_program.webp)",
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
            pretest: [],
            procedure: [
              "Open the microprocessor workspace",
              "Review the evolution of microprocessors",
              "Learn the internal architecture",
              "Understand addressing modes",
              "Write simple assembly programs",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
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
                  "![Memory Hierarchy Layers](/memory_hierarchy_layers.webp)",
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
                  "![Cache Mapping](/cache_mapping.webp)",
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
                  "![RAM vs ROM](/ram_vs_rom.webp)",
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
                  "![Virtual Memory](/virtual_memory.webp)",
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
                  "![Storage Comparison](/storage_comparison.webp)",
                  "The future: Memory technologies that are both fast and persistent, blurring the line between memory and storage."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the memory workspace",
              "Review the memory hierarchy",
              "Understand cache mapping techniques",
              "Learn about RAM and ROM",
              "Explore virtual memory concepts",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
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
                  "![Logic Gates](/logic_gates.webp)"
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
                  "![Boolean Algebra](/boolean_algebra.webp)"
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
                  "![Truth Table](/truth_table.webp)",
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
                  "![Gates to Microprocessor](/gates_to_microprocessor.webp)",
                  "The transistor count in modern CPUs is in the billions—each one is a tiny switch that works like a logic gate."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the digital logic workspace",
              "Review the basic logic gates and truth tables",
              "Learn Boolean algebra postulates and theorems",
              "Simplify Boolean expressions",
              "Implement logic functions using gates",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
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
                  "![Karnaugh Map](/karnaugh_map.webp)",
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
                  "![Adder Circuit](/adder_circuit.webp)",
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
                  "![Multiplexer](/multiplexer.webp)",
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
                  "![Encoder Decoder](/encoder_decoder.webp)",
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
                  "![Simple ALU](/simple_alu.webp)",
                  "This is how real ALUs work—they just combine simple circuits in a smart way.",
                  "Modern ALUs are more complex (with multiplication, division, shifting, and more), but the basic idea is the same."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the digital logic workspace",
              "Use K-maps to simplify Boolean expressions",
              "Design half adders and full adders",
              "Design multiplexers and demultiplexers",
              "Design encoders and decoders",
              "Design a simple ALU",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
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