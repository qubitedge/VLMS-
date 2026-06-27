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
          text: "To understand and apply single-qubit quantum gates including Pauli gates (X, Y, Z), Hadamard gate, and Phase gates, and visualize qubit state transformations on the Bloch Sphere.",
          bullets: [
            "Apply Pauli-X, Y, Z gates and understand their matrix representations",
            "Create superposition states using the Hadamard gate",
            "Design simple single-qubit circuits",
            "Visualize qubit rotations on the Bloch Sphere"
          ]
        },
        theory: [
          {
            title: "Pauli Gates — The Fundamental Rotations",
            body: [
              "The Pauli gates are the most fundamental single-qubit gates in quantum computing. Each corresponds to a 180° rotation around one of the three axes of the Bloch Sphere.",
              "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Gate</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Matrix</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Action</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Bloch Rotation</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">X (NOT)</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">[[0,1],[1,0]]</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Flips |0⟩ ↔ |1⟩</td><td class=\"p-3 text-muted-foreground\">π around X-axis</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Y</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">[[0,-i],[i,0]]</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Flips with phase</td><td class=\"p-3 text-muted-foreground\">π around Y-axis</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Z</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">[[1,0],[0,-1]]</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Adds phase to |1⟩</td><td class=\"p-3 text-muted-foreground\">π around Z-axis</td></tr></tbody></table>"
            ]
          },
          {
            title: "Hadamard Gate & Phase Gates",
            body: [
              "The Hadamard gate (H) creates an equal superposition by mapping |0⟩ → (|0⟩ + |1⟩)/√2 and |1⟩ → (|0⟩ − |1⟩)/√2. It is one of the most frequently used gates in quantum algorithms as it enables quantum parallelism.",
              "Phase gates add a relative phase to the |1⟩ component without affecting probabilities. The S gate adds a phase of π/2 (i), while the T gate adds π/4. These are essential building blocks for fault-tolerant quantum computation.",
              "The Bloch Sphere provides a geometric representation of single-qubit states. The north pole represents |0⟩, the south pole represents |1⟩, and points on the equator represent equal superpositions with different phases."
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
          text: "To understand and implement multi-qubit quantum gates including CNOT, SWAP, Toffoli, and other controlled gates, and explore how conditional quantum logic enables complex quantum algorithms.",
          bullets: [
            "Generate entanglement using the CNOT gate",
            "Construct controlled operations with multiple control qubits",
            "Implement quantum logic circuits using multi-qubit gates",
            "Understand how multi-qubit gates serve as algorithm building blocks"
          ]
        },
        theory: [
          {
            title: "CNOT and Entangling Gates",
            body: [
              "The Controlled-NOT (CNOT or CX) gate is a two-qubit gate that flips the target qubit if and only if the control qubit is |1⟩. It is the most important two-qubit gate and, combined with single-qubit gates, forms a universal gate set for quantum computing.",
              "When a Hadamard gate is applied to the control qubit followed by a CNOT, the result is a Bell state — a maximally entangled two-qubit state. This is the foundation for quantum teleportation, superdense coding, and many quantum algorithms.",
              "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Input</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">CNOT Output</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Explanation</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|00⟩</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">|00⟩</td><td class=\"p-3 text-muted-foreground\">Control=0, target unchanged</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|01⟩</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">|01⟩</td><td class=\"p-3 text-muted-foreground\">Control=0, target unchanged</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|10⟩</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">|11⟩</td><td class=\"p-3 text-muted-foreground\">Control=1, target flipped</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|11⟩</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">|10⟩</td><td class=\"p-3 text-muted-foreground\">Control=1, target flipped</td></tr></tbody></table>"
            ]
          },
          {
            title: "SWAP and Toffoli Gates",
            body: [
              "The SWAP gate exchanges the states of two qubits: |ψ₁ψ₂⟩ → |ψ₂ψ₁⟩. It can be decomposed into three CNOT gates. SWAP operations are crucial in quantum circuit optimization when qubits need to be adjacent for two-qubit gate execution on real hardware.",
              "The Toffoli gate (CCX) is a three-qubit gate that flips the target qubit only when both control qubits are |1⟩. It is a reversible version of the classical AND gate and is universal for classical computation. Combined with the Hadamard gate, it becomes universal for quantum computation as well."
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
          "Qiskit Textbook — Multiple Qubits and Entanglement: https://qiskit.org/textbook/ch-gates/multiple-qubits-entanglement.html",
          "Nielsen & Chuang — Quantum Computation and Quantum Information, Chapter 4",
          "IBM Quantum Learning: https://learning.quantum-computing.ibm.com/"
        ]
      }
    }
  ]
};
