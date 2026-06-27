export const mathShortNotes = `MATHEMATICAL, PHYSICAL AND COMPUTING FOUNDATIONS OF QUANTUM COMPUTING - SHORT NOTES


INTRODUCTION

This course bridges the mathematical, physical, and computing foundations essential for understanding quantum computing. Quantum computing represents a paradigm shift in computation, leveraging the principles of quantum mechanics, superposition, entanglement, and interference, to solve problems that are intractable for classical computers.

The course is structured into five units:
1. Linear Algebra: Vectors, matrices, eigenvalues, and Hilbert spaces
2. Probability, Statistics, and Classical Physics: Statistical methods, Lagrangian and Hamiltonian mechanics, Maxwell's equations
3. Computer Architecture: Number systems, binary arithmetic, and the instruction cycle
4. Microprocessors and Memory: CPU architecture, addressing modes, memory hierarchy
5. Digital Logic and Combinational Circuits: Logic gates, Boolean algebra, and circuit design

Each unit builds upon the previous, creating a comprehensive foundation for quantum computing studies.


UNIT I: LINEAR ALGEBRA

VECTOR SPACES

A vector space V over a field F (usually ℝ or ℂ) is a set of vectors with two operations:
- Vector addition: u + v ∈ V
- Scalar multiplication: c·v ∈ V for c ∈ F

The operations satisfy eight axioms: closure, associativity, commutativity, additive identity, additive inverse, distributive (scalar over vector), distributive (vector over scalar), and scalar associativity.

Key Example: ℝⁿ (n-dimensional real vectors) is a vector space over ℝ.

Dimension: The number of basis vectors needed to span the space. For n qubits, the state space has dimension 2ⁿ.

SUBSPACES: A subset W of V that is itself a vector space (closed under addition and scalar multiplication).

![Vector Space and Subspace Visualization](/vector_space_basics.webp)

LINEAR TRANSFORMATIONS

A linear transformation T: V → W satisfies:
- T(u + v) = T(u) + T(v)
- T(c·v) = c·T(v)

Representation: Once bases are chosen, T is represented by a matrix. If V has dimension n and W has dimension m, T is an m×n matrix.

Kernel (Null Space): ker(T) = {v ∈ V | T(v) = 0}
Image (Range): im(T) = {T(v) | v ∈ V}

Rank-Nullity Theorem: dim(V) = dim(ker(T)) + dim(im(T))

COMPLEX VECTORS AND MATRICES

In quantum mechanics, vectors and matrices are over the complex numbers ℂ.

Conjugate Transpose (Hermitian Adjoint): A† = (Ā)ᵀ

Important matrix classes:
- Hermitian: A† = A, represent observables (measurements)
- Unitary: U†U = I, represent quantum gates (evolution)
- Normal: A†A = AA†, diagonalizable (includes Hermitian and unitary)
- Positive Semidefinite: ⟨v|A|v⟩ ≥ 0 for all v, represent density matrices

EIGENVALUES AND EIGENVECTORS

For a matrix A, an eigenvector v ≠ 0 satisfies Av = λv, where λ is the eigenvalue.

Characteristic Equation: det(A − λI) = 0
Characteristic Polynomial: p(λ) = det(A − λI)

Properties:
- Eigenvalues of Hermitian matrices are real
- Eigenvalues of unitary matrices have |λ| = 1
- Eigenvectors of Hermitian matrices corresponding to distinct eigenvalues are orthogonal
- Every Hermitian matrix can be diagonalized by a unitary matrix

Spectral Theorem: A = UDU†, where D is diagonal (eigenvalues) and U is unitary (eigenvectors as columns).

![Eigenvalue and Eigenvector Geometric Meaning](/eigenvectors_geometric.webp)

INNER PRODUCT SPACES AND HILBERT SPACES

Inner Product: A function ⟨·,·⟩: V × V → F such that:
1. ⟨u, v⟩ = ⟨v, u⟩* (conjugate symmetry)
2. ⟨u, v + w⟩ = ⟨u, v⟩ + ⟨u, w⟩ (linearity in second argument)
3. ⟨u, c·v⟩ = c·⟨u, v⟩ (homogeneity)
4. ⟨v, v⟩ ≥ 0, and ⟨v, v⟩ = 0 iff v = 0 (positive definiteness)

Norm: ||v|| = √⟨v, v⟩

Orthogonality: ⟨u, v⟩ = 0

Hilbert Space: A complete inner product space (all Cauchy sequences converge). Quantum state space is a Hilbert space.

Dirac Notation:
- Ket: |v⟩ (column vector)
- Bra: ⟨v| (row vector, conjugate transpose)
- Inner Product: ⟨u|v⟩
- Outer Product: |u⟩⟨v| (an operator)

Orthonormal Basis: {|eᵢ⟩} with ⟨eᵢ|eⱼ⟩ = δᵢⱼ (Kronecker delta).

![Qubit State on the Bloch Sphere](/quantum_bloch_sphere.webp)

DIAGONALIZATION

A matrix A is diagonalizable if there exists P such that A = PDP⁻¹, where D is diagonal.

Procedure:
1. Find eigenvalues λ₁, ..., λₙ
2. Find eigenvectors v₁, ..., vₙ
3. Form P = [v₁ ... vₙ] and D = diag(λ₁, ..., λₙ)
4. Verify A = PDP⁻¹

A matrix is diagonalizable iff it has n linearly independent eigenvectors.

Every Hermitian matrix is diagonalizable with a unitary P (P†P = I).

APPLICATIONS TO QUANTUM COMPUTING

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Concept</th><th class="p-3 border border-cyan/20">Mathematical Formulation</th><th class="p-3 border border-cyan/20">Quantum Application</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">State</td><td class="p-3 border border-cyan/20">Vector |ψ⟩ in Hilbert space</td><td class="p-3 border border-cyan/20">|ψ⟩ = α|0⟩ + β|1⟩</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Gate</td><td class="p-3 border border-cyan/20">Unitary matrix U</td><td class="p-3 border border-cyan/20">Hadamard: H = (1/√2)[[1,1],[1,-1]]</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Measurement</td><td class="p-3 border border-cyan/20">Hermitian operator M</td><td class="p-3 border border-cyan/20">Pauli Z: Z = [[1,0],[0,-1]]</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Probability</td><td class="p-3 border border-cyan/20">Born rule: |⟨φ|ψ⟩|²</td><td class="p-3 border border-cyan/20">P(|1⟩) = |β|²</td></tr></tbody></table>


UNIT II: PROBABILITY, STATISTICS, AND CLASSICAL PHYSICS

PROBABILITY AND STATISTICS

Probability Axioms (Kolmogorov):
1. 0 ≤ P(E) ≤ 1 for any event E
2. P(S) = 1 (sample space)
3. For mutually exclusive events: P(E₁ ∪ E₂ ∪ ...) = Σ P(Eᵢ)

Conditional Probability: P(A|B) = P(A∩B)/P(B)

Bayes' Theorem: P(A|B) = P(B|A)·P(A)/P(B)

RANDOM VARIABLES

Discrete Random Variable: Takes countable values. PMF: P(X = x)
Continuous Random Variable: Takes values in a continuous range. PDF: f(x) such that P(a ≤ X ≤ b) = ∫_a^b f(x) dx

Expected Value: E[X] = Σ x·P(X=x) (discrete), E[X] = ∫ x·f(x) dx (continuous)
Variance: Var(X) = E[(X−E[X])²] = E[X²] − (E[X])²
Standard Deviation: σ = √Var(X)

COMMON PROBABILITY DISTRIBUTIONS

Binomial: P(X = k) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ, Mean = np, Variance = np(1−p)
Poisson: P(X = k) = e⁻λ λᵏ/k!, Mean = λ, Variance = λ
Normal (Gaussian): f(x) = (1/(σ√(2π))) e^−(x−μ)²/(2σ²), Mean = μ, Variance = σ²

![Probability Distribution Curves](/probability_distributions.webp)

CENTRAL LIMIT THEOREM

For i.i.d. random variables X₁, ..., Xₙ with mean μ and variance σ²:
X̄ = (1/n)ΣXᵢ is approximately N(μ, σ²/n) as n → ∞.

In quantum experiments, this explains why measurement results cluster around the expectation value.

LAGRANGIAN MECHANICS

Lagrangian: L = T − V (kinetic − potential)

Principle of Least Action: The actual path minimizes S = ∫ L dt.

Euler-Lagrange Equation: d/dt(∂L/∂q̇) − ∂L/∂q = 0

For a particle in 1D: L = ½mẋ² − V(x) → mẍ = −dV/dx (Newton's second law)

HAMILTONIAN MECHANICS

Hamiltonian: H = p·q̇ − L, where p = ∂L/∂q̇ is canonical momentum.

For a particle: H = p²/2m + V(q) (total energy)

Hamilton's Equations:
q̇ = ∂H/∂p, ṗ = −∂H/∂q

Quantum Connection: Promote q and p to operators satisfying [q̂, p̂] = iℏ. The Schrödinger equation is iℏ∂|ψ⟩/∂t = Ĥ|ψ⟩.

MAXWELL'S EQUATIONS

Gauss's Law: ∇·E = ρ/ε₀
Gauss's Law for Magnetism: ∇·B = 0
Faraday's Law: ∇×E = −∂B/∂t
Ampère-Maxwell Law: ∇×B = μ₀J + μ₀ε₀∂E/∂t

Wave Equation: ∇²E = μ₀ε₀ ∂²E/∂t², with speed c = 1/√(μ₀ε₀)

In a medium: v = 1/√(με), n = c/v = √(με/μ₀ε₀)

Quantum Connection: Quantized electromagnetic field gives photons. Quantum electrodynamics (QED) is the quantum version of electromagnetism.

![Electromagnetic Wave Propagation](/em_wave_propagation.webp)


UNIT III: COMPUTER ARCHITECTURE

NUMBER SYSTEMS

Binary (base 2): digits 0,1. Used internally by computers.
Octal (base 8): digits 0-7. Compact representation of binary (3 bits per digit).
Decimal (base 10): digits 0-9. Human-readable.
Hexadecimal (base 16): digits 0-9, A-F. Compact representation of binary (4 bits per digit).

Conversion:
- Binary to Decimal: multiply each bit by 2ⁱ and sum
- Decimal to Binary: repeated division by 2, record remainders
- Binary to Octal: group bits in 3s from right
- Binary to Hexadecimal: group bits in 4s from right

BINARY ARITHMETIC

Addition: 0+0=0, 0+1=1, 1+0=1, 1+1=0 (carry 1)
Subtraction: Uses borrow method or 2's complement addition
Multiplication: Shift-and-add method
Division: Long division with shifts

SIGNED NUMBER REPRESENTATIONS

Sign-Magnitude: MSB is sign (0=positive, 1=negative), remaining bits are magnitude. Range: −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1). Two zeros.

1's Complement: Flip all bits of positive number. Range: −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1). Two zeros.

2's Complement: 1's complement + 1. Range: −2ⁿ⁻¹ to +(2ⁿ⁻¹−1). One zero. Used in all modern computers.

IEEE 754 FLOATING POINT

Single Precision (32 bits): 1 sign, 8 exponent (bias 127), 23 mantissa
Double Precision (64 bits): 1 sign, 11 exponent (bias 1023), 52 mantissa

Value = (−1)^sign × 1.mantissa × 2^(exponent − bias)

Special values: 0 (all zero), Infinity (exp all 1s, mantissa 0), NaN (exp all 1s, mantissa ≠ 0).

COMPUTER ARCHITECTURE BASICS

Von Neumann Architecture:
- CPU (ALU + Control Unit + Registers)
- Memory (stores data and programs)
- I/O Devices
- System Bus (address, data, control)

Datapath: Components that process data (registers, ALU, buses).
Control Path: Directs the datapath (generates control signals).

![Von Neumann Architecture Block Diagram](/von_neumann_architecture.webp)

INSTRUCTION CYCLE

1. Fetch: Get instruction from memory (PC → address, instruction → IR)
2. Decode: Interpret opcode and addressing mode (control unit)
3. Execute: ALU performs operation, result stored
4. Store/Write-back: Result stored in register/memory
5. Update PC: Increment to next instruction

ADDRESSING MODES

Immediate: Operand in instruction (ADD R1, #5)
Register: Operand in register (ADD R1, R2)
Direct: Operand at memory address (ADD R1, [1000])
Indirect: Address of operand in memory (ADD R1, [[1000]])
Register Indirect: Address in register (ADD R1, [R2])
Indexed: Base + offset (ADD R1, [R2 + 10])
Relative: PC + offset (for branches)


UNIT IV: MICROPROCESSORS AND MEMORY

MICROPROCESSOR EVOLUTION

Intel 4004 (1971): 4-bit, 2,300 transistors, 740 kHz
Intel 8085 (1976): 8-bit, 6,500 transistors, 3-5 MHz, 64 KB memory
Intel 8086 (1978): 16-bit, 29,000 transistors, 5-10 MHz, 1 MB memory (x86 architecture)
Intel 80386 (1985): 32-bit, 275,000 transistors, 16-33 MHz, 4 GB memory
Pentium (1993): 32-bit, 3.1M transistors, superscalar
ARM (1985): 32-bit RISC, low power, dominates mobile market
Modern: 64-bit, billions of transistors, multi-core, 3-5 GHz

CPU INTERNAL ARCHITECTURE

ALU: Performs arithmetic and logic operations
Registers: Fast on-chip storage (general-purpose and special-purpose)
- PC (Program Counter): Address of next instruction
- IR (Instruction Register): Current instruction
- SP (Stack Pointer): Top of stack
- Flags/Status Register: Condition flags (zero, carry, overflow, sign)
Buses: Address, Data, Control
Pipeline: Multiple instructions in different stages simultaneously

CISC vs RISC:
- CISC: Complex instructions, variable length, many addressing modes (x86)
- RISC: Simple instructions, fixed length, few addressing modes (ARM, RISC-V)

![CPU Internal Architecture and Datapath](/cpu_internal_architecture.webp)

MEMORY HIERARCHY

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Level</th><th class="p-3 border border-cyan/20">Speed</th><th class="p-3 border border-cyan/20">Size</th><th class="p-3 border border-cyan/20">Technology</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Registers</td><td class="p-3 border border-cyan/20">0.3 ns</td><td class="p-3 border border-cyan/20">~100 B</td><td class="p-3 border border-cyan/20">Flip-flops</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">L1 Cache</td><td class="p-3 border border-cyan/20">1-2 ns</td><td class="p-3 border border-cyan/20">32-64 KB</td><td class="p-3 border border-cyan/20">SRAM</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">L2 Cache</td><td class="p-3 border border-cyan/20">3-5 ns</td><td class="p-3 border border-cyan/20">256-512 KB</td><td class="p-3 border border-cyan/20">SRAM</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">L3 Cache</td><td class="p-3 border border-cyan/20">10-20 ns</td><td class="p-3 border border-cyan/20">4-32 MB</td><td class="p-3 border border-cyan/20">SRAM</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Main Memory</td><td class="p-3 border border-cyan/20">50-100 ns</td><td class="p-3 border border-cyan/20">8-128 GB</td><td class="p-3 border border-cyan/20">DRAM</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">SSD</td><td class="p-3 border border-cyan/20">0.1 ms</td><td class="p-3 border border-cyan/20">256 GB-8 TB</td><td class="p-3 border border-cyan/20">Flash</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">HDD</td><td class="p-3 border border-cyan/20">10-15 ms</td><td class="p-3 border border-cyan/20">1-20 TB</td><td class="p-3 border border-cyan/20">Magnetic</td></tr></tbody></table>

CACHE MEMORY

Mapping Techniques:
- Direct Mapping: Block → fixed cache location (address mod cache size)
- Fully Associative: Any block anywhere (needs hardware search)
- Set-Associative: Block → specific set, any location in set

Replacement Policies:
- LRU (Least Recently Used): Evict least recently accessed
- FIFO (First In, First Out): Evict oldest block
- Random: Evict random block
- LFU (Least Frequently Used): Evict least accessed

MAIN MEMORY

RAM (Random Access Memory): Volatile, read-write
- SRAM (Static RAM): Fast, expensive, used for cache
- DRAM (Dynamic RAM): Slower, cheap, used for main memory (needs refresh)
- SDRAM: Synchronized with CPU clock
- DDR SDRAM: Double Data Rate (DDR4, DDR5)

ROM (Read-Only Memory): Non-volatile
- Mask ROM: Factory programmed
- PROM: Programmable once
- EPROM: Erasable (UV light)
- EEPROM: Electrically erasable
- Flash: Type of EEPROM (SSDs, USB drives)

VIRTUAL MEMORY

Paging: Physical memory divided into frames, virtual memory into pages. Page table maps virtual pages to physical frames. Page fault → OS brings page from disk.

Segmentation: Variable-sized segments (code, data, stack, heap). Segment table maps segments to physical memory.

TLB (Translation Lookaside Buffer): Cache for page table entries.

Secondary Storage: Non-volatile storage (HDD, SSD, optical).

![Memory Hierarchy Pyramid](/memory_hierarchy_pyramid.webp)


UNIT V: DIGITAL LOGIC AND COMBINATIONAL CIRCUITS

LOGIC GATES

Basic Gates:
- AND: Output 1 only if all inputs 1
- OR: Output 1 if any input 1
- NOT: Output = complement of input

Universal Gates (can implement any Boolean function):
- NAND: NOT AND (output 0 only if all inputs 1)
- NOR: NOT OR (output 1 only if all inputs 0)

Special Gates:
- XOR: Output 1 if inputs differ
- XNOR: Output 1 if inputs same

![Logic Gate Symbols and Truth Tables](/logic_gates_symbols.webp)

BOOLEAN ALGEBRA

Identity Law: x + 0 = x, x · 1 = x
Null Law: x + 1 = 1, x · 0 = 0
Idempotent Law: x + x = x, x · x = x
Involution Law: ¬(¬x) = x
Complement Law: x + ¬x = 1, x · ¬x = 0
Commutative Law: x + y = y + x, x · y = y · x
Associative Law: (x+y)+z = x+(y+z), (x·y)·z = x·(y·z)
Distributive Law: x·(y+z) = x·y + x·z, x + y·z = (x+y)·(x+z)
De Morgan's Laws: ¬(x·y) = ¬x + ¬y, ¬(x+y) = ¬x · ¬y
Absorption Law: x + x·y = x, x·(x+y) = x

Canonical Forms:
- SOP (Sum of Products): OR of AND terms (minterms)
- POS (Product of Sums): AND of OR terms (maxterms)

KARNAUGH MAPS

K-maps provide visual Boolean simplification.

2-variable: 2×2 grid
3-variable: 2×4 grid (order: 00, 01, 11, 10)
4-variable: 4×4 grid (order: 00, 01, 11, 10 for both rows and columns)

Simplification Steps:
1. Fill 1s from truth table
2. Identify groups of 1s (powers of 2: 1, 2, 4, 8, 16)
3. Make groups as large as possible
4. Each group → product term (AND)
5. Sum (OR) all product terms

![Karnaugh Map Grouping Example](/karnaugh_map_example.webp)

COMBINATIONAL CIRCUITS

Adders:
- Half Adder: Sum = A⊕B, Carry = A·B
- Full Adder: Sum = A⊕B⊕C_in, C_out = A·B + C_in·(A⊕B)

Subtractors:
- Half Subtractor: Diff = A⊕B, Borrow = ¬A·B
- Full Subtractor: Diff = A⊕B⊕B_in, Borrow = ¬A·B + B_in·(A⊕B)

Multiplexers (MUX): Select one of many inputs to output. 2:1 MUX: Out = S·I₀ + ¬S·I₁.

Demultiplexers (DEMUX): Route one input to one of many outputs.

Encoders: Convert multiple inputs to binary code. Priority encoder selects highest-priority input.

Decoders: Convert binary code to one-hot output. 3:8 decoder: 3-bit input, 8 outputs (one active).

Applications:
- Adders: Arithmetic circuits (CPU, calculator)
- MUX/DEMUX: Data routing, bus switching
- Encoders/Decoders: Memory addressing, display drivers, code conversion
- Seven-segment decoder: BCD to display digits

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Circuit</th><th class="p-3 border border-cyan/20">Function</th><th class="p-3 border border-cyan/20">Example Use</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Full Adder</td><td class="p-3 border border-cyan/20">3-bit addition with carry</td><td class="p-3 border border-cyan/20">Multi-bit arithmetic</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">4:1 MUX</td><td class="p-3 border border-cyan/20">Select one of 4 inputs</td><td class="p-3 border border-cyan/20">Data routing</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">3:8 Decoder</td><td class="p-3 border border-cyan/20">Binary to one-hot</td><td class="p-3 border border-cyan/20">Memory addressing</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">8:3 Priority Encoder</td><td class="p-3 border border-cyan/20">One-hot to binary (priority)</td><td class="p-3 border border-cyan/20">Interrupt handling</td></tr></tbody></table>


COMPLEXITY CHEAT SHEET

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Operation</th><th class="p-3 border border-cyan/20">Time Complexity</th><th class="p-3 border border-cyan/20">Notes</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Number system conversion</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">n = number of digits</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Binary addition</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Ripple carry adder</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Matrix multiplication (naive)</td><td class="p-3 border border-cyan/20">O(n³)</td><td class="p-3 border border-cyan/20">Can be optimized</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Eigenvalue computation</td><td class="p-3 border border-cyan/20">O(n³)</td><td class="p-3 border border-cyan/20">QR algorithm</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">K-map simplification</td><td class="p-3 border border-cyan/20">O(2ⁿ)</td><td class="p-3 border border-cyan/20">n = number of variables</td></tr></tbody></table>
`;