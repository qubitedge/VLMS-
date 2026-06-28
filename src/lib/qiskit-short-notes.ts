export const qiskitShortNotes = `
# Quantum Computing using Qiskit Lab — Short Notes

---

## Module 1: Quantum Computing Foundations

### 1.1 Quantum Computing Platforms
- **IBM Quantum Composer**: Cloud-based drag-and-drop circuit builder with real-time statevector visualization. Supports both simulator and real quantum hardware execution.
- **Qiskit**: Open-source Python SDK by IBM for quantum computing. Components include Terra (circuits), Aer (simulators), Machine Learning, and Nature.
- **PennyLane**: Cross-platform Python library for differentiable quantum programming. Integrates with TensorFlow and PyTorch for quantum ML.
- **QSim**: India's quantum computing simulator supporting 30+ qubit simulations for algorithm research and education.

### 1.2 Quantum States
- **Pure States**: Maximum knowledge about a quantum system; described by a single state vector |ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1.
- **Superposition**: A qubit exists in multiple states simultaneously until measured. |+⟩ = (|0⟩ + |1⟩)/√2 is an equal superposition.
- **Entangled States**: Multi-qubit states that cannot be factored into individual qubit states. Bell states are maximally entangled.
- **Mixed States**: Statistical ensembles described by density matrices ρ. Purity Tr(ρ²) ranges from 1/d (maximally mixed) to 1 (pure).

---

## Module 2: Quantum Gates and Circuit Design

### 2.1 Single-Qubit Gates
- **Pauli-X (NOT)**: Flips |0⟩ ↔ |1⟩. Matrix: [[0,1],[1,0]]. Rotation of π around X-axis.
- **Pauli-Y**: Flips with complex phase. Matrix: [[0,-i],[i,0]]. Rotation of π around Y-axis.
- **Pauli-Z**: Adds phase of -1 to |1⟩. Matrix: [[1,0],[0,-1]]. Rotation of π around Z-axis.
- **Hadamard (H)**: Creates equal superposition. |0⟩ → (|0⟩+|1⟩)/√2. Essential for quantum parallelism.
- **S Gate**: Phase of π/2 (i). S = √Z. Matrix: [[1,0],[0,i]].
- **T Gate**: Phase of π/4. T = √S. Critical for fault-tolerant computation.
- **Bloch Sphere**: Geometric representation of single-qubit states. North pole = |0⟩, South pole = |1⟩.

### 2.2 Multi-Qubit Gates
- **CNOT (CX)**: Two-qubit gate — flips target if control is |1⟩. Foundation for entanglement creation.
- **SWAP**: Exchanges states of two qubits. Decomposes into 3 CNOTs.
- **Toffoli (CCX)**: Three-qubit gate — flips target if both controls are |1⟩. Reversible classical AND.
- **Controlled-Z (CZ)**: Adds phase -1 to |11⟩. Symmetric — no distinct control/target.
- **Universal Gate Set**: CNOT + all single-qubit gates = universal for quantum computation.

---

## Module 3: Advanced Quantum Operations

### 3.1 Phase Gates and U Gate
- **S Gate**: Phase π/2 → S = U(0, 0, π/2). S² = Z.
- **T Gate**: Phase π/4 → T = U(0, 0, π/4). T² = S. Essential for fault tolerance.
- **U(θ, φ, λ)**: Universal single-qubit gate. Any 1-qubit operation = U with specific parameters.
- Special cases: U(π, 0, π) = X, U(π/2, 0, π) = H, U(0, 0, π) = Z.
- Phase gates enable quantum interference — the mechanism behind quantum speedup.

### 3.2 Born Rule and Quantum Registers
- **Born Rule**: P(k) = |⟨k|ψ⟩|². Connects quantum formalism to measurement probabilities.
- For α|0⟩ + β|1⟩: P(0) = |α|², P(1) = |β|². Always P(0) + P(1) = 1.
- **Measurement Collapse**: After measurement, superposition is destroyed. The state becomes the measured outcome.
- **QuantumRegister**: Named collection of qubits (e.g., 'data', 'ancilla').
- **ClassicalRegister**: Named collection of classical bits for storing measurement results.
- Multiple shots build statistical estimates of probability distributions.

### 3.3 Quantum Communication
- **Bell States**: Four maximally entangled two-qubit states: |Φ±⟩, |Ψ±⟩.
- **Quantum Teleportation**: Transfers quantum state using shared Bell pair + 2 classical bits. Original state is destroyed (no-cloning).
- Protocol: Bell pair → Bell measurement → Classical communication → Correction gates.
- **QKD (BB84)**: Quantum Key Distribution. Any eavesdropping disturbs quantum states → detectable.
- **No-Cloning Theorem**: Unknown quantum states cannot be perfectly copied.
- **No-Communication Theorem**: Entanglement alone cannot transmit information.

---

## Module 4: Quantum Algorithms & Circuit Optimization

### 4.1 Unitary Operators and Bell States
- All quantum gates are unitary matrices: U†U = UU† = I.
- Unitarity ensures: probability preservation, reversibility, eigenvalues on unit circle.
- The four Bell states form a complete orthonormal basis for maximally entangled 2-qubit states.
- Bell measurement = reverse of Bell state creation: CNOT → H → Measure.
- Operator class in Qiskit extracts gate matrices for verification.

### 4.2 Rotation Gates
- **Rx(θ)**: Rotation around X-axis. Changes both amplitude and phase.
- **Ry(θ)**: Rotation around Y-axis. Changes amplitudes (probabilities) with real coefficients.
- **Rz(θ)**: Rotation around Z-axis. Changes only relative phase.
- **Variational Circuits**: Parameterized circuits with Ry rotations + CNOT entanglement layers.
- Used in VQE (chemistry), QAOA (optimization), QNN (machine learning).
- Parameters optimized by classical optimizer in hybrid quantum-classical loop.
- Barren plateau problem: vanishing gradients in deep variational circuits.

### 4.3 Barriers and Circuit Optimization
- **Barriers**: Compiler directives preventing gate reordering. No physical operation.
- Use cases: separating algorithm phases, debugging, benchmarking, ensuring measurement order.
- **Transpilation**: Circuit optimization for efficiency and hardware compatibility.
- Optimization levels 0–3: from no optimization to aggressive gate cancellation.
- **Gate Cancellation**: H·H = I, X·X = I — redundant gate pairs removed.
- **Gate Fusion**: Adjacent rotations combined into single rotation.
- **Routing**: SWAP insertion for hardware connectivity constraints.
- **Trade-off**: Higher optimization reduces depth but may alter logical structure.

---

## Key Formulas

| Concept | Formula |
|---------|---------|
| Qubit State | |ψ⟩ = α|0⟩ + β|1⟩, |α|² + |β|² = 1 |
| Born Rule | P(k) = |⟨k|ψ⟩|² |
| Unitarity | U†U = I |
| Density Matrix (Pure) | ρ = |ψ⟩⟨ψ| |
| Purity | Tr(ρ²), range: [1/d, 1] |
| Bell State |Φ+⟩ | (|00⟩ + |11⟩)/√2 |
| Rx(θ) | [[cos(θ/2), -i·sin(θ/2)], [-i·sin(θ/2), cos(θ/2)]] |
| Ry(θ) | [[cos(θ/2), -sin(θ/2)], [sin(θ/2), cos(θ/2)]] |
| Rz(θ) | [[e^(-iθ/2), 0], [0, e^(iθ/2)]] |

---

## Module Summary

| Module | Theme | Projects |
|--------|-------|----------|
| Module 1 | Quantum Computing Foundations | 2 |
| Module 2 | Quantum Gates & Circuit Design | 2 |
| Module 3 | Advanced Quantum Operations | 3 |
| Module 4 | Quantum Algorithms & Circuit Optimization | 3 |

**Total Projects: 10**
`;
