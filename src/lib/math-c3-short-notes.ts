export const compArchShortNotes = `COMPUTER ARCHITECTURE & DIGITAL LOGIC - SHORT NOTES
(Standard Curriculum)
COURSE OVERVIEW

Computer Architecture and Digital Logic bridges the gap between hardware and software. It starts at the most fundamental level with number systems and binary arithmetic, moving up to the digital logic gates that make computation possible. From there, it explores how these components are combined to form a microprocessor, detailing the CPU's internal architecture, instruction cycles, and the overarching memory hierarchy.

Why Learn Computer Architecture & Digital Logic?

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Reason</th><th class="p-3 border border-cyan/20 tracking-wide text-left">What It Means For You</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Foundation of Computing</td><td class="p-3 border border-cyan/20">Understand how data is represented as binary numbers and processed by logic gates.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Hardware-Software Interface</td><td class="p-3 border border-cyan/20">Learn how low-level assembly instructions drive physical hardware.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">System Performance</td><td class="p-3 border border-cyan/20">Discover how the CPU interacts with the memory hierarchy to speed up computation.</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Digital Design</td><td class="p-3 border border-cyan/20">Gain the ability to analyze and design simple combinational and arithmetic circuits.</td></tr></tbody></table>

MODULE 1: Number Systems & Binary Arithmetic

1.1 Number Systems

* **Number System:** A method of representing numbers using a specific base (radix).
* **Binary (Base 2):** Uses digits **0** and **1**; fundamental for computers.
* **Octal (Base 8):** Uses digits **0–7**; 1 octal digit = **3 binary bits**.
* **Decimal (Base 10):** Uses digits **0–9**; commonly used by humans.
* **Hexadecimal (Base 16):** Uses digits **0–9** and **A–F**; 1 hexadecimal digit = **4 binary bits**.

1.2 Number System Conversion

* Convert numbers between **Binary, Decimal, Octal, and Hexadecimal**.
* Binary ↔ Decimal uses positional values.
* Binary ↔ Octal uses **3-bit grouping**.
* Binary ↔ Hexadecimal uses **4-bit grouping**.

1.3 Signed Number Representation

* **Sign-Magnitude:** MSB represents the sign.
* **1's Complement:** Invert all bits of the positive number.
* **2's Complement:** 1's complement + 1; the standard representation in modern computers.

1.4 Floating-Point Representation (IEEE 754)

* Used to represent **real (decimal) numbers**.
* Consists of **Sign Bit**, **Exponent**, and **Mantissa**.
* Available in **32-bit (Single Precision)** and **64-bit (Double Precision)** formats.

1.5 Binary Arithmetic

* **Binary Addition:** Performed using binary addition rules and carry.
* **Binary Subtraction:** Uses borrowing or **2's complement**.
* **Binary Multiplication:** Similar to decimal multiplication.
* **Binary Division:** Performed using repeated subtraction and shifting.

Key Points

* Binary is the language of computers.
* Octal and Hexadecimal simplify binary representation.
* **2's Complement** is the most commonly used signed number representation.
* **IEEE 754** is the standard for floating-point numbers.
* Binary arithmetic forms the basis of digital computations.

![Number Systems and Binary Arithmetic Cheatsheet](/math_number_systems.webp)

MODULE 2: Computer Architecture Basics

2.1 Fundamentals of Computer Design

* **Computer Architecture:** Computer architecture is the design and organization of a computer system. It defines how hardware components work together to execute programs efficiently.

* **Computer Design:** It focuses on implementing the architecture by designing the processor, memory, input/output devices, and communication pathways.

* **Goals of Computer Design:**

  * Improve system performance.
  * Increase reliability.
  * Reduce power consumption.
  * Optimize cost and efficiency.

2.2 Functional Units of a Computer

* **Functional Units:** A computer consists of several units that work together to process data and execute instructions.
* **Input Unit:** Accepts data and instructions from the user and converts them into machine-readable form.
* **Central Processing Unit (CPU):** The brain of the computer that processes data and controls all system operations.
* **Memory Unit:** Stores data, instructions, and intermediate results required during execution.
* **Output Unit:** Converts processed data into human-readable form and displays the final result.

2.3 Data Path and Control Path

* **Data Path:** The data path consists of hardware components such as registers, ALU, buses, and memory that transfer and process data within the computer.
* **Control Path:** The control path consists of the Control Unit (CU), which generates control signals and coordinates the execution of instructions.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide text-left">Data Path</th><th class="p-3 border border-cyan/20 tracking-wide text-left">Control Path</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Transfers and processes data</td><td class="p-3 border border-cyan/20">Generates control signals</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Includes ALU, registers, buses, and memory</td><td class="p-3 border border-cyan/20">Includes Control Unit and control circuits</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Performs arithmetic and logical operations</td><td class="p-3 border border-cyan/20">Controls the sequence of operations</td></tr></tbody></table>

2.4 Input-Output Organization

* **Input-Output (I/O) Organization:** It manages communication between the computer and external devices such as keyboards, monitors, printers, and storage devices.

* **Functions of I/O Organization:**

  * Transfers data between CPU, memory, and I/O devices.
  * Controls communication with peripheral devices.
  * Improves system efficiency during data transfer.

* **Data Transfer Methods:**

  * **Programmed I/O**
  * **Interrupt-Driven I/O**
  * **Direct Memory Access (DMA)**

2.5 Instruction Cycle

* **Instruction Cycle:** The instruction cycle is the sequence of steps performed by the CPU to execute an instruction.

* **Stages of the Instruction Cycle:**
  * **Fetch:** Retrieves the instruction from main memory using the Program Counter (PC).
  * **Decode:** The Control Unit interprets the instruction and determines the required operation.
  * **Execute:** The CPU performs the specified operation using the ALU or other hardware components.
  * **Write Back:** The result is stored in a register or memory (if required).

2.6 Control Unit (CU)

* **Control Unit:** The Control Unit directs and coordinates all operations of the computer system.

* **Functions of the Control Unit:**
  * Fetches instructions from memory.
  * Decodes instructions.
  * Generates control signals.
  * Coordinates communication between CPU, memory, and I/O devices.
  * Ensures instructions are executed in the correct sequence.

Key Points

* Computer architecture defines the structure and organization of a computer system.
* A computer consists of **Input Unit, CPU, Memory Unit, and Output Unit**.
* The **Data Path** processes data, while the **Control Path** manages operations.
* The instruction cycle consists of **Fetch → Decode → Execute → Write Back**.
* The **Control Unit** controls and synchronizes all computer operations.

![Computer Architecture Basics](/cpu_internal_architecture.webp)

MODULE 3: Microprocessor Fundamentals & Memory Hierarchy

3.1 Evolution of Microprocessors

* **Microprocessor:** A microprocessor is a programmable integrated circuit (IC) that acts as the Central Processing Unit (CPU) of a computer. It performs arithmetic, logical, and control operations.
* **8085 Microprocessor:** An 8-bit microprocessor introduced by Intel. It was widely used in early computer systems and embedded applications.
* **8086 Microprocessor:** A 16-bit microprocessor with improved processing speed and larger memory addressing capability than the 8085.
* **Pentium Processor:** A high-performance processor introduced by Intel with advanced features such as pipelining, superscalar architecture, and higher clock speeds.
* **ARM Processor:** A low-power, high-performance processor based on RISC architecture. It is widely used in smartphones, tablets, and embedded systems.

3.2 CPU Internal Architecture

* **CPU Architecture:** The CPU consists of several components that work together to process instructions and data.
* **Arithmetic Logic Unit (ALU):** Performs arithmetic operations (addition, subtraction, multiplication, division) and logical operations (AND, OR, NOT, XOR).
* **Registers:** Small, high-speed storage locations inside the CPU used to temporarily store data, instructions, and addresses.
* **Buses:** Communication pathways that transfer data, addresses, and control signals between the CPU, memory, and I/O devices.

Types of Buses

* **Data Bus:** Transfers data between CPU, memory, and peripherals.
* **Address Bus:** Carries memory addresses from CPU to memory.
* **Control Bus:** Carries control signals such as Read, Write, and Interrupt.

3.3 Addressing Modes and Instruction Formats

* **Addressing Mode:** Specifies how the CPU accesses operands required for executing an instruction.

Common Addressing Modes

* **Immediate Addressing:** Operand is included in the instruction.
* **Direct Addressing:** Memory address of the operand is specified directly.
* **Indirect Addressing:** Address of the operand is stored in another memory location or register.
* **Register Addressing:** Operand is stored in a CPU register.

Instruction Format

* **Opcode:** Specifies the operation to be performed.
* **Operand:** Specifies the data or memory location involved in the operation.

3.4 Instruction Execution and Timing

* **Instruction Execution:** The CPU executes instructions in a sequence to perform a task.

Execution Steps

* Fetch the instruction from memory.
* Decode the instruction.
* Execute the operation.
* Store the result.

Instruction Timing

* Measured using **clock cycles**.
* Faster processors execute more instructions per second.
* Performance depends on clock frequency and instruction complexity.

3.5 Simple Assembly Programs

* **Assembly Language:** A low-level programming language that uses mnemonic instructions to communicate directly with the processor.

Common Instructions

* **MOV** – Transfers data.
* **ADD** – Adds two values.
* **SUB** – Subtracts one value from another.
* **INC** – Increments a value by 1.
* **DEC** – Decrements a value by 1.
* **JMP** – Jumps to another instruction.

3.6 Memory Hierarchy

* **Memory Hierarchy:** Memory is organized in different levels to improve performance, reduce access time, and lower cost.

Need for Memory Hierarchy

* Improves processing speed.
* Reduces memory access time.
* Balances performance and cost.

3.7 Cache Memory

* **Cache Memory:** A small, high-speed memory located between the CPU and main memory. It stores frequently used data and instructions.

Cache Mapping Techniques

* Direct Mapping
* Fully Associative Mapping
* Set Associative Mapping

Cache Replacement Policies

* FIFO (First In, First Out)
* LRU (Least Recently Used)
* Random Replacement

3.8 Main Memory

* **Main Memory:** Primary memory used to store programs and data currently being executed.

Types of Main Memory

* **RAM (Random Access Memory):** Volatile memory used for temporary data storage.
* **ROM (Read Only Memory):** Non-volatile memory that stores permanent instructions.
* **DRAM (Dynamic RAM):** Requires periodic refreshing and is commonly used as main memory.
* **SRAM (Static RAM):** Faster and more expensive than DRAM; commonly used in cache memory.

3.9 Virtual Memory

* **Virtual Memory:** A memory management technique that allows programs to use more memory than the available physical RAM.

Virtual Memory Techniques

* **Paging:** Divides memory into fixed-size pages for efficient management.
* **Segmentation:** Divides memory into logical segments based on program structure.

3.10 Secondary Storage

* **Secondary Storage:** Non-volatile storage used to permanently store data and programs.

Examples

* Hard Disk Drive (HDD)
* Solid State Drive (SSD)
* USB Flash Drive
* CD/DVD
* Memory Card

Key Points

* A **microprocessor** acts as the CPU of a computer.
* **8085, 8086, Pentium, and ARM** represent the evolution of processor technology.
* The CPU contains **ALU, Registers, and Buses**.
* **Addressing modes** determine how operands are accessed.
* **Cache memory** improves system performance by reducing memory access time.
* **RAM** is volatile, while **ROM** is non-volatile.
* **Virtual memory** extends memory using paging and segmentation.
* **Secondary storage** provides permanent data storage.

![Microprocessor Fundamentals & Memory Hierarchy](/memory_hierarchy_pyramid.webp)

MODULE 4: Digital Logic Gates, Boolean Algebra & Combinational Circuits

4.1 Introduction to Digital Logic Gates

* **Digital Logic Gates:** Logic gates are the basic building blocks of digital electronic circuits. They perform logical operations on one or more binary inputs to produce a single binary output.

Basic Logic Gates

* **AND Gate:** Produces output **1** only when all inputs are **1**.
* **OR Gate:** Produces output **1** if at least one input is **1**.
* **NOT Gate:** Produces the complement (inverse) of the input.

Universal Logic Gates

* **NAND Gate:** Combination of AND followed by NOT. It can be used to implement any logical circuit.
* **NOR Gate:** Combination of OR followed by NOT. It is also a universal gate used to construct all other logic gates.

Special Logic Gates

* **XOR (Exclusive OR):** Produces output **1** only when the inputs are different.
* **XNOR (Exclusive NOR):** Produces output **1** only when the inputs are the same.

Truth Tables and Circuit Symbols

* Truth tables represent the relationship between input combinations and corresponding outputs.
* Circuit symbols provide a graphical representation of logic gates in digital circuits.

Logic Gate Implementation Using Transistors

* Logic gates are implemented using semiconductor devices such as **BJT** and **MOSFET** transistors.
* Transistors act as electronic switches to produce the required logical output.

4.2 Boolean Algebra and Simplification

* **Boolean Algebra:** A mathematical system used to analyze and simplify digital logic circuits. It operates using binary values (**0** and **1**).

Boolean Postulates and Theorems

* Identity Law
* Null Law
* Idempotent Law
* Complement Law
* Commutative Law
* Associative Law
* Distributive Law
* De Morgan's Theorems

Canonical Forms

* **SOP (Sum of Products):** A Boolean expression written as the OR of multiple AND terms.
* **POS (Product of Sums):** A Boolean expression written as the AND of multiple OR terms.

Simplification Techniques

* Simplification using Boolean identities.
* Algebraic manipulation of Boolean expressions.
* Karnaugh Maps (K-Maps) for minimizing logic functions.

Karnaugh Maps

* **2-Variable K-Map**
* **3-Variable K-Map**
* **4-Variable K-Map**

K-Maps reduce the number of logic gates required in a circuit by simplifying Boolean expressions.

4.3 Combinational Circuits

* **Combinational Circuit:** A digital circuit whose output depends only on the current input values. It does not store previous information.

Arithmetic Circuits

* **Half Adder:** Adds two binary digits and produces **Sum** and **Carry** outputs.
* **Full Adder:** Adds three binary inputs (including carry-in) and produces **Sum** and **Carry** outputs.
* **Half Subtractor:** Performs subtraction of two binary bits and produces **Difference** and **Borrow**.
* **Full Subtractor:** Subtracts three binary inputs (including borrow-in).

Comparison Circuits

* **Comparator:** Compares two binary numbers and determines whether one is greater than, less than, or equal to the other.

Data Selection Circuits

* **Multiplexer (MUX):** Selects one input from multiple inputs and forwards it to a single output using selection lines.
* **Demultiplexer (DEMUX):** Takes one input and distributes it to one of several outputs.

Coding Circuits

* **Encoder:** Converts multiple input lines into a smaller binary code.
* **Decoder:** Converts binary information into one of several output lines.

Design Examples

* Arithmetic circuits.
* Code converters (Binary to Gray, Gray to Binary, BCD converters).

Key Points

* Logic gates are the fundamental building blocks of digital systems.
* **NAND** and **NOR** are universal gates.
* Boolean algebra simplifies complex digital circuits.
* **Karnaugh Maps (K-Maps)** provide an easy method for logic simplification.
* Combinational circuits depend only on present inputs.
* Adders, subtractors, multiplexers, demultiplexers, encoders, and decoders are widely used in digital electronics.

![Digital Logic Gates Symbols](/logic_gates_symbols.webp)

OVERALL SUMMARY

Computer Architecture and Digital Logic serves as the essential link between software programming and hardware execution. By mastering these concepts, you now understand:

*   **How Computers Speak:** Translating decimal data into binary, octal, and hexadecimal formats.
*   **How Computers Think:** Utilizing fundamental logic gates (AND, OR, NOT, NAND) and Boolean algebra to form complex combinational circuits (Adders, MUX).
*   **How Computers Work:** The internal structure of the CPU (ALU, Registers, Buses), the systematic Fetch-Decode-Execute cycle, and the evolution of microprocessors.
*   **How Computers Remember:** The critical balance of the memory hierarchy, from high-speed Cache and RAM to persistent Virtual Memory and Secondary Storage.

This foundational knowledge enables you to write more efficient code, understand system bottlenecks, and serves as a stepping stone into advanced fields like embedded systems, operating system design, and hardware engineering.
`;
