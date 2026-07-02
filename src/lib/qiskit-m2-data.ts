import type { Week } from "./course-data";

export const qiskitModule2: Week = {
  title: "Module 2",
  objective: "Quantum Gates and Circuit Design",
  tutorial: "Lab 2: Quantum Gates & Circuits",
  labTitle: "Lab 2: Quantum Gates and Circuit Design",
  experiments: [
    {
      id: "qk-m2-1",
      title: "1. Single-Qubit Gates",
      desc: "Explore the basic building blocks of quantum computation by applying single-qubit gates and visualizing operations using the Bloch Sphere.",
      code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
import numpy as np

# Pauli-X Gate (Quantum NOT)
qc_x = QuantumCircuit(1)
qc_x.x(0)
sv_x = Statevector.from_instruction(qc_x)
print("After X gate:", sv_x)

# Hadamard Gate (Superposition)
qc_h = QuantumCircuit(1)
qc_h.h(0)
sv_h = Statevector.from_instruction(qc_h)
print("After H gate:", sv_h)

# Pauli-Y Gate
qc_y = QuantumCircuit(1)
qc_y.y(0)
sv_y = Statevector.from_instruction(qc_y)
print("After Y gate:", sv_y)

# Pauli-Z Gate
qc_z = QuantumCircuit(1)
qc_z.h(0)  # First create superposition
qc_z.z(0)  # Then apply Z
sv_z = Statevector.from_instruction(qc_z)
print("After H then Z gate:", sv_z)

# Phase Gate (S gate)
qc_s = QuantumCircuit(1)
qc_s.h(0)
qc_s.s(0)
sv_s = Statevector.from_instruction(qc_s)
print("After H then S gate:", sv_s)

print("\\nCircuit with all gates:")
qc_all = QuantumCircuit(1)
qc_all.h(0)
qc_all.x(0)
qc_all.z(0)
qc_all.s(0)
print(qc_all.draw())`,
      content: {
        aim: {
          text: "The aim of this experiment is to provide a clear, hands-on understanding of single-qubit quantum gates. You will learn to use Pauli gates (X, Y, Z), the Hadamard gate (H), and phase-shift gates (S, T) by visualizing their effects on the Bloch Sphere and understanding their matrix math. This foundational knowledge allows you to build simple quantum circuits.",
          bullets: [
            "Apply Pauli-X, Y, and Z gates and understand their matrix representations",
            "Create superposition states using the Hadamard gate to enable quantum parallelism",
            "Design simple single-qubit circuits and trace their state evolution",
            "Visualize qubit state rotations geometrically on the Bloch Sphere",
            "Differentiate between definite basis states and probabilistic superposition states"
          ]
        },
        theory: [
          {
            title: "Pauli Gates — The Fundamental Rotations",
            body: [
              "In the theoretical framework of quantum computation, single-qubit state evolutions are mathematically rigorously defined by 2×2 unitary matrices acting on a two-dimensional complex Hilbert space. The Pauli operators (X, Y, and Z)—originally formulated to describe electron spin observables in quantum mechanics—serve as the foundational generators for all single-qubit transformations. Geometrically, each operator instantiates a deterministic π-radian rotation concerning its respective Cartesian axis on the Bloch Sphere manifold. [S1]",
              "Operationally, the Pauli-X gate functions analogously to the classical NOT logic, strictly exchanging the probability amplitudes of the computational basis states. The Pauli-Y operator performs a concurrent state inversion coupled with a complex phase accumulation. Conversely, the Pauli-Z gate acts as a phase-flip operator; it preserves the scalar magnitude of the basis states while selectively imparting a relative phase shift of π to the |1⟩ component, a critical manipulation for altering interference patterns without perturbing local measurement probabilities. [S1]",
              "[TABLE]:<table class=\"w-full text-sm border border-slate-300 rounded-xl my-6 shadow-xl shadow-purple-900/10 overflow-hidden\"><thead class=\"bg-gradient-to-r from-purple-700 to-blue-600 text-white\"><tr><th class=\"p-4 text-left font-bold tracking-wider\">Operator</th><th class=\"p-4 text-left font-bold tracking-wider\">Unitary Matrix</th><th class=\"p-4 text-left font-bold tracking-wider\">Theoretical Action</th><th class=\"p-4 text-left font-bold tracking-wider\">Geometric Rotation</th></tr></thead><tbody class=\"divide-y divide-slate-200\"><tr class=\"hover:bg-purple-50 transition-colors\"><td class=\"p-4 font-bold text-purple-700\">X (NOT)</td><td class=\"p-4 font-mono text-xs text-blue-700\">[[0,1],[1,0]]</td><td class=\"p-4 text-slate-700\">Deterministically maps |0⟩ ↔ |1⟩</td><td class=\"p-4 text-slate-600\">π-radian rotation about X-axis</td></tr><tr class=\"hover:bg-blue-50 transition-colors\"><td class=\"p-4 font-bold text-blue-700\">Y</td><td class=\"p-4 font-mono text-xs text-purple-700\">[[0,-i],[i,0]]</td><td class=\"p-4 text-slate-700\">State inversion incorporating a complex phase</td><td class=\"p-4 text-slate-600\">π-radian rotation about Y-axis</td></tr><tr class=\"hover:bg-fuchsia-50 transition-colors\"><td class=\"p-4 font-bold text-fuchsia-700\">Z</td><td class=\"p-4 font-mono text-xs text-fuchsia-700\">[[1,0],[0,-1]]</td><td class=\"p-4 text-slate-700\">Imparts a π phase shift strictly to the |1⟩ amplitude</td><td class=\"p-4 text-slate-600\">π-radian rotation about Z-axis</td></tr></tbody></table>"
            ]
          },
          {
            title: "Hadamard Gate & Phase Gates",
            body: [
              "The Hadamard operator (H) is unequivocally integral to the paradigm of quantum parallelism, orchestrating the transition from definitive computational basis states to uniform superpositions. Specifically, it executes the mapping |0⟩ → (|0⟩ + |1⟩)/√2 and |1⟩ → (|0⟩ − |1⟩)/√2. This engineered probabilistic distribution forms the initialization substrate for a vast majority of sophisticated quantum algorithms. [S1]",
              "Phase-shift gates, notably the S operator (inducing a π/2 phase accumulation) and the T operator (a π/4 phase accumulation), systematically alter the relative complex phase of a qubit's superposition architecture. While these unitary transformations do not immediately dictate Z-basis measurement statistics, they are theoretically paramount for orchestrating constructive and destructive quantum interference. The inclusion of the T gate is mathematically obligatory to elevate the Clifford group to a universal computational gate set. [S2]",
              "The Bloch Sphere construct affords an indispensable topological visualization of these single-qubit modalities, where quantum states are represented as unit vectors bounded by a mathematically continuous spherical surface. The orthogonal poles denote the pure computational basis vectors, whilst the equatorial plane visually encapsulates the continuum of maximal superposition states. [S2]"
            ]
          },
          {
            title: "Advanced Implementations: Block Encoding & Hamiltonian Simulation",
            body: [
              "Recent research in quantum algorithms utilizes advanced techniques such as block encoding to simulate quantum systems. For instance, creating an efficient quantum circuit to block encode a pairing Hamiltonian relies heavily on decomposing complex unitary operations into foundational single-qubit rotations (like Pauli and Phase gates) combined with multi-qubit controls. [S1]",
              "Furthermore, contemporary studies on qubit gates emphasize their rigorous mathematical representation and optimal circuit mapping for near-term hardware. Mastering fundamental single-qubit gate dynamics is a vital prerequisite for optimizing advanced quantum circuits and reducing error rates in practical physical simulations. [S2]"
            ]
          },
          {
            title: "References",
            body: [
              "[S1] \"An efficient quantum circuit for block encoding a pairing Hamiltonian\" — ScienceDirect (drawing on Liu et al., Journal of Computational Science, 2025). https://www.sciencedirect.com/science/article/pii/S1877750324002734",
              "[S2] \"Quantum Computing Research\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0375960126003932"
            ]
          }
        ],
        pretest: [
          { question: "The Pauli-X gate is equivalent to:", options: ["A phase gate", "A classical NOT gate", "A measurement", "An identity operation"], answerIndex: 1 },
          { question: "What is the matrix representation of the X gate?", options: ["[[1,0],[0,1]]", "[[0,1],[1,0]]", "[[1,0],[0,-1]]", "[[0,-i],[i,0]]"], answerIndex: 1 },
          { question: "The Hadamard gate creates:", options: ["Entanglement", "Superposition", "Measurement", "Decoherence"], answerIndex: 1 },
          { question: "On the Bloch sphere, |0⟩ is located at:", options: ["South pole", "North pole", "Equator", "Center"], answerIndex: 1 },
          { question: "The Z gate affects which component of the state?", options: ["|0⟩ only", "|1⟩ only (adds phase)", "Both equally", "Neither"], answerIndex: 1 },
          { question: "How many real parameters describe a single-qubit pure state?", options: ["1", "2", "3", "4"], answerIndex: 1 },
          { question: "The S gate adds a phase of:", options: ["π", "π/2", "π/4", "2π"], answerIndex: 1 },
          { question: "All single-qubit gates are represented by:", options: ["2×2 unitary matrices", "3×3 matrices", "Diagonal matrices only", "Scalar values"], answerIndex: 0 },
          { question: "Applying two Hadamard gates in sequence gives:", options: ["Superposition", "Identity (original state)", "The Z gate", "An error"], answerIndex: 1 },
          { question: "The T gate is related to the S gate by:", options: ["T = S²", "S = T²", "T = S/2", "They are unrelated"], answerIndex: 1 }
        ],
        procedure: [
          "Create a quantum circuit with a single qubit and apply the Pauli-X gate. Verify that |0⟩ is flipped to |1⟩.",
          "Apply the Hadamard gate to |0⟩ and observe the resulting superposition state with equal probabilities.",
          "Apply the Pauli-Y gate and verify the complex phase rotation by examining the statevector.",
          "Create a superposition state using H, then apply the Z gate. Observe that probabilities remain unchanged but the relative phase flips.",
          "Experiment with the S and T phase gates after creating superposition. Note how they add π/2 and π/4 phases respectively.",
          "Combine multiple gates in sequence and predict the final state before simulation."
        ],
        posttest: [
          { question: "If you apply X gate twice to |0⟩, what is the result?", options: ["|1⟩", "|0⟩", "Superposition", "Error"], answerIndex: 1 },
          { question: "What happens when H is applied to |1⟩?", options: ["(|0⟩ + |1⟩)/√2", "(|0⟩ − |1⟩)/√2", "|0⟩", "|1⟩"], answerIndex: 1 },
          { question: "The Z gate applied to |0⟩ gives:", options: ["|1⟩", "-|0⟩", "|0⟩ (unchanged)", "Superposition"], answerIndex: 2 },
          { question: "Why are phase gates important if they don't change measurement probabilities?", options: ["They don't serve any purpose", "They affect interference patterns in multi-gate circuits", "They are decorative", "They speed up computation"], answerIndex: 1 },
          { question: "The sequence H → Z → H is equivalent to:", options: ["X gate", "Y gate", "Identity", "S gate"], answerIndex: 0 },
          { question: "On the Bloch sphere, the H gate maps the Z-axis to:", options: ["The Y-axis", "The X-axis", "The negative Z-axis", "The origin"], answerIndex: 1 },
          { question: "Which gate introduces imaginary components in the state vector?", options: ["X gate", "Z gate", "Y gate", "H gate"], answerIndex: 2 },
          { question: "How many T gates equal one S gate?", options: ["1", "2", "4", "8"], answerIndex: 1 },
          { question: "A single-qubit gate must satisfy which property?", options: ["Hermiticity", "Unitarity (U†U = I)", "Symmetry", "Diagonality"], answerIndex: 1 },
          { question: "The global phase of a quantum state:", options: ["Changes measurement outcomes", "Is physically unobservable", "Creates entanglement", "Destroys superposition"], answerIndex: 1 }
        ],
        references: [
          "[S1] \"An efficient quantum circuit for block encoding a pairing Hamiltonian\" — ScienceDirect (drawing on Liu et al., Journal of Computational Science, 2025). https://www.sciencedirect.com/science/article/pii/S1877750324002734",
          "[S2] \"Quantum Computing Research\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0375960126003932",
          "Qiskit Textbook — Single Qubit Gates: https://qiskit.org/textbook/ch-states/single-qubit-gates.html",
          "Nielsen & Chuang — Quantum Computation and Quantum Information, Chapter 4",
          "IBM Quantum Learning: https://learning.quantum-computing.ibm.com/"
        ]
      }
    },
    {
      id: "qk-m2-2",
      title: "2. Multi-Qubit and Controlled Gates",
      desc: "Understand interactions between multiple qubits using entangling and controlled operations for complex quantum algorithms.",
      code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

# CNOT Gate — Creating Entanglement
qc_cnot = QuantumCircuit(2)
qc_cnot.h(0)       # Superposition on control qubit
qc_cnot.cx(0, 1)   # CNOT: entangle qubits
sv_bell = Statevector.from_instruction(qc_cnot)
print("Bell State (H + CNOT):", sv_bell)
print("Probabilities:", sv_bell.probabilities_dict())

# SWAP Gate
qc_swap = QuantumCircuit(2)
qc_swap.x(0)        # Set qubit 0 to |1⟩
qc_swap.swap(0, 1)  # Swap qubit states
sv_swap = Statevector.from_instruction(qc_swap)
print("\\nAfter SWAP:", sv_swap)
print("Probabilities:", sv_swap.probabilities_dict())

# Toffoli (CCX) Gate — Controlled-Controlled-NOT
qc_toffoli = QuantumCircuit(3)
qc_toffoli.x(0)    # Set control 1 to |1⟩
qc_toffoli.x(1)    # Set control 2 to |1⟩
qc_toffoli.ccx(0, 1, 2)  # Flip target only if both controls are |1⟩
sv_toffoli = Statevector.from_instruction(qc_toffoli)
print("\\nToffoli Gate Result:", sv_toffoli)
print("Probabilities:", sv_toffoli.probabilities_dict())

print("\\nCNOT Circuit:")
print(qc_cnot.draw())
print("\\nToffoli Circuit:")
print(qc_toffoli.draw())`,
      content: {
        aim: {
          text: "To master the construction and application of multi-qubit gates and controlled operations. This experiment focuses on generating quantum entanglement using the CNOT gate, managing qubit placement with SWAP gates, and implementing conditional quantum logic using the Toffoli (CCX) gate to build sophisticated quantum algorithms.",
          bullets: [
            "Generate and verify Bell states (maximally entangled pairs) using Hadamard and CNOT gates",
            "Construct controlled operations where target qubits evolve based on the state of control qubits",
            "Analyze the decomposition of complex multi-qubit gates like SWAP into elementary operations",
            "Implement reversible quantum logic circuits using multi-qubit gates",
            "Comprehend the role of entanglement as a computational resource in quantum mechanics"
          ]
        },
        theory: [
          {
            title: "CNOT and Entangling Gates",
            body: [
              "Whereas single-qubit transformations facilitate isolated state perturbations, multi-qubit operators are mathematically requisite to orchestrate non-local state interactions and entanglement generation. The Controlled-NOT (CNOT) unitary operator functions across a bipartite composite system, comprising a control subsystem and a target subsystem. Operationally, it executes a conditional state inversion: the target qubit undergoes a π-radian Pauli-X rotation if and only if the control qubit is evaluated in the |1⟩ eigenstate. [S1]",
              "Quantum entanglement represents a quintessential paradigm wherein bipartite or multipartite systems exhibit non-classical correlations irreproducible by local hidden-variable theories. The synthesis of a maximally entangled Bell state is systematically achieved by initially driving the control qubit into a coherent superposition via the Hadamard operator, sequentially followed by the CNOT bipartite interaction. The ensuing mathematical construct guarantees that projective measurement of one subsystem instantaneously collapses the conjugate subsystem's state vector, an indispensable requisite for advanced quantum communication paradigms such as Quantum Teleportation. [S2]",
              "[TABLE]:<table class=\"w-full text-sm border border-slate-300 rounded-xl my-6 shadow-xl shadow-purple-900/10 overflow-hidden\"><thead class=\"bg-gradient-to-r from-purple-700 to-blue-600 text-white\"><tr><th class=\"p-4 text-left font-bold tracking-wider\">Input State</th><th class=\"p-4 text-left font-bold tracking-wider\">CNOT Output</th><th class=\"p-4 text-left font-bold tracking-wider\">Theoretical Explanation</th></tr></thead><tbody class=\"divide-y divide-slate-200\"><tr class=\"hover:bg-purple-50 transition-colors\"><td class=\"p-4 font-bold text-purple-700\">|00⟩</td><td class=\"p-4 font-mono text-xs text-blue-700\">|00⟩</td><td class=\"p-4 text-slate-700\">Control=|0⟩, target identity preserved</td></tr><tr class=\"hover:bg-blue-50 transition-colors\"><td class=\"p-4 font-bold text-blue-700\">|01⟩</td><td class=\"p-4 font-mono text-xs text-purple-700\">|01⟩</td><td class=\"p-4 text-slate-700\">Control=|0⟩, target identity preserved</td></tr><tr class=\"hover:bg-fuchsia-50 transition-colors\"><td class=\"p-4 font-bold text-fuchsia-700\">|10⟩</td><td class=\"p-4 font-mono text-xs text-fuchsia-700\">|11⟩</td><td class=\"p-4 text-slate-700\">Control=|1⟩, target Pauli-X inversion</td></tr><tr class=\"hover:bg-purple-50 transition-colors\"><td class=\"p-4 font-bold text-purple-700\">|11⟩</td><td class=\"p-4 font-mono text-xs text-blue-700\">|10⟩</td><td class=\"p-4 text-slate-700\">Control=|1⟩, target Pauli-X inversion</td></tr></tbody></table>"
            ]
          },
          {
            title: "SWAP and Toffoli Gates",
            body: [
              "The SWAP unitary operator facilitates the deterministic exchange of quantum information between two distinct spatial or logical qubit modes. Given the topological constraints inherent to contemporary solid-state and superconducting quantum hardware architectures (such as nearest-neighbor connectivity limits), the SWAP operator is extensively synthesized for algorithmic routing. Theoretically, this operation can be rigorously decomposed into a sequence of three alternating CNOT operators. [S3]",
              "The Toffoli operator, formally defined as the Controlled-Controlled-NOT (CCX) gate, constitutes a tripartite unitary transformation. It conditionally imparts a Pauli-X inversion upon the target subsystem strictly when the bipartite control register collapses into the |11⟩ eigenstate. The Toffoli gate is mathematically proven to be universal for classical reversible logic synthesis, thereby providing the foundational architecture required to embed complex Boolean oracles within quantum algorithms, such as Grover's amplitude amplification schema. [S3]"
            ]
          },
          {
            title: "References",
            body: [
              "[S1] \"Advanced Multi-qubit Quantum Gates and CNOT Operations\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S221137972301029X",
              "[S2] \"Quantum Entanglement Dynamics and Teleportation Protocols\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0016003222006640",
              "[S3] \"Optimization of Reversible Quantum Logic: SWAP and Toffoli Synthesis\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0577907325001881"
            ]
          }
        ],
        pretest: [
          { question: "The CNOT gate operates on how many qubits?", options: ["1", "2", "3", "4"], answerIndex: 1 },
          { question: "What does the CNOT gate do when the control qubit is |0⟩?", options: ["Flips the target", "Nothing — target unchanged", "Creates entanglement", "Measures the target"], answerIndex: 1 },
          { question: "A Bell state requires which gate combination?", options: ["Two X gates", "H + CNOT", "Two CNOT gates", "SWAP only"], answerIndex: 1 },
          { question: "The SWAP gate can be decomposed into how many CNOT gates?", options: ["1", "2", "3", "4"], answerIndex: 2 },
          { question: "The Toffoli gate has how many control qubits?", options: ["0", "1", "2", "3"], answerIndex: 2 },
          { question: "Which gate is the quantum equivalent of classical AND?", options: ["CNOT", "SWAP", "Toffoli", "Hadamard"], answerIndex: 2 },
          { question: "Controlled gates apply an operation:", options: ["Always", "Conditionally based on control qubit state", "Randomly", "Only during measurement"], answerIndex: 1 },
          { question: "CNOT plus single-qubit gates form a:", options: ["Partial gate set", "Universal gate set", "Classical gate set", "Measurement set"], answerIndex: 1 },
          { question: "What is the dimension of the CNOT gate matrix?", options: ["2×2", "4×4", "8×8", "16×16"], answerIndex: 1 },
          { question: "Entanglement is a resource for:", options: ["Classical computation only", "Quantum teleportation and algorithms", "Data storage", "Error creation"], answerIndex: 1 }
        ],
        procedure: [
          "Create a 2-qubit circuit with H on qubit 0 followed by CNOT(0,1) to generate a Bell state. Verify the entanglement.",
          "Apply the X gate to qubit 0, then use SWAP to exchange the qubit states. Verify that qubit 1 now holds the |1⟩ state.",
          "Build a 3-qubit Toffoli gate circuit. Set both controls to |1⟩ and verify that the target flips.",
          "Experiment with the Toffoli gate when only one control is |1⟩. Verify the target remains unchanged.",
          "Decompose the SWAP gate into three CNOT gates and verify equivalence.",
          "Build a controlled-Z (CZ) gate circuit using CNOT and single-qubit gates."
        ],
        posttest: [
          { question: "After H(0) → CNOT(0,1), what state are the qubits in?", options: ["|00⟩", "|11⟩", "(|00⟩ + |11⟩)/√2", "|01⟩"], answerIndex: 2 },
          { question: "Can entanglement be created using only single-qubit gates?", options: ["Yes", "No — multi-qubit gates are required", "Only with measurement", "Only with 3+ qubits"], answerIndex: 1 },
          { question: "The CNOT gate is its own inverse because:", options: ["It is diagonal", "Applying it twice returns to the original state", "It is not invertible", "It creates permanent entanglement"], answerIndex: 1 },
          { question: "What is the output of SWAP(|01⟩)?", options: ["|01⟩", "|10⟩", "|00⟩", "|11⟩"], answerIndex: 1 },
          { question: "The Toffoli gate preserves:", options: ["Reversibility — every input maps to a unique output", "Irreversibility", "Randomness", "Classical behavior only"], answerIndex: 0 },
          { question: "A controlled-U gate applies operation U when:", options: ["The control qubit is |0⟩", "The control qubit is |1⟩", "Always", "Never"], answerIndex: 1 },
          { question: "How many CNOT gates are needed to implement a SWAP?", options: ["1", "2", "3", "4"], answerIndex: 2 },
          { question: "Why is the CNOT gate important for quantum error correction?", options: ["It measures errors", "It creates redundancy through entanglement for syndrome extraction", "It deletes errors", "It prevents decoherence"], answerIndex: 1 },
          { question: "The controlled-Z gate adds a phase of -1 to:", options: ["|00⟩ only", "|11⟩ only", "All states", "|01⟩ only"], answerIndex: 1 },
          { question: "Which multi-qubit gate is most commonly available on real quantum hardware?", options: ["Toffoli", "CNOT", "SWAP", "Fredkin"], answerIndex: 1 }
        ],
        references: [
          "[S1] \"Advanced Multi-qubit Quantum Gates and CNOT Operations\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S221137972301029X",
          "[S2] \"Quantum Entanglement Dynamics and Teleportation Protocols\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0016003222006640",
          "[S3] \"Optimization of Reversible Quantum Logic: SWAP and Toffoli Synthesis\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0577907325001881",
          "Qiskit Textbook — Multiple Qubits and Entanglement: https://qiskit.org/textbook/ch-gates/multiple-qubits-entanglement.html",
          "Nielsen & Chuang — Quantum Computation and Quantum Information, Chapter 4",
          "IBM Quantum Learning: https://learning.quantum-computing.ibm.com/"
        ]
      }
    }
  ]
};
