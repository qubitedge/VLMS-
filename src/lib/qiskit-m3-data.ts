import type { Week } from "./course-data";

export const qiskitModule3: Week = {
  title: "Module 3",
  objective: "Advanced Quantum Operations",
  tutorial: "Lab 3: Phase Gates, Measurement & Communication",
  labTitle: "Lab 3: Advanced Quantum Operations",
  experiments: [
    {
      id: "qk-m3-1",
      title: "1. Phase Gates and Universal U Gates",
      desc: "Study phase manipulation and universal single-qubit operations using parameterized quantum gates.",
      code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
import numpy as np

# S Gate (Phase = π/2)
qc_s = QuantumCircuit(1)
qc_s.h(0)
qc_s.s(0)
sv_s = Statevector.from_instruction(qc_s)
print("After H + S gate:", sv_s)

# T Gate (Phase = π/4)
qc_t = QuantumCircuit(1)
qc_t.h(0)
qc_t.t(0)
sv_t = Statevector.from_instruction(qc_t)
print("After H + T gate:", sv_t)

# Universal U Gate — U(θ, φ, λ)
theta = np.pi / 4   # Rotation angle
phi = np.pi / 3      # Phase 1
lam = np.pi / 6      # Phase 2

qc_u = QuantumCircuit(1)
qc_u.u(theta, phi, lam, 0)
sv_u = Statevector.from_instruction(qc_u)
print("\\nAfter U(π/4, π/3, π/6):", sv_u)
print("Probabilities:", sv_u.probabilities_dict())

# Demonstrating S = U(0, 0, π/2)
qc_s_via_u = QuantumCircuit(1)
qc_s_via_u.h(0)
qc_s_via_u.u(0, 0, np.pi/2, 0)
sv_s_u = Statevector.from_instruction(qc_s_via_u)
print("\\nS via U gate:", sv_s_u)

print("\\nCircuit:")
print(qc_u.draw())`,
      content: {
        aim: {
          text: "To understand phase gates (S and T) and the universal U gate, and learn how arbitrary single-qubit rotations are implemented using parameterized quantum gates for interference-based quantum algorithms.",
          bullets: [
            "Apply S and T phase shifts and understand their matrix representations",
            "Implement the universal U(θ, φ, λ) gate for arbitrary rotations",
            "Understand how interference is created through phase manipulation",
            "Express any single-qubit gate using the U gate parameterization"
          ]
        },
        theory: [
          {
            title: "Quantum Gates as the Building Blocks of Quantum Circuits",
            body: [
              "Quantum gates are basic quantum circuits that act on a small number of qubits and serve as the fundamental building blocks of larger quantum circuits, playing the same structural role that classical logic gates play in digital circuits. [S1]",
              "A quantum gate is implemented as a unitary reversible operator U that converts an initial qubit state into a final qubit state while guaranteeing no loss of quantum information, in contrast to irreversible classical operations. [S2]",
              "Some quantum gates act on a single qubit, while others act on two or more qubits at once; multi-qubit gates are essential because the size of the quantum state vector grows exponentially with the number of qubits, and this growth is what allows quantum algorithms to outperform classical ones on certain tasks. [S2]"
            ]
          },
          {
            title: "Structure of Single-Qubit Gates",
            body: [
              "Every single-qubit gate is a unitary matrix with three real degrees of freedom, and if finite precision is acceptable, the complete set of such gates can be approximated arbitrarily well using a small, well-chosen set of elementary gates. [S1]",
              "A single-qubit gate is represented as a 2×2 matrix that maps the basis states |0⟩ and |1⟩ to new combinations of |0⟩ and |1⟩, and a table of the standard single-qubit gates — Pauli-X, Pauli-Y, Pauli-Z, Hadamard, and the phase-shift (T) gate — along with their matrices and physical descriptions is compiled from prior literature. [S2]",
              "Among these, the Pauli-X gate maps |0⟩ to |1⟩ and |1⟩ to |0⟩, making it the direct quantum equivalent of the classical NOT gate. [S2]"
            ]
          },
          {
            title: "The Phase Gate",
            body: [
              "The phase gate P(θ) has no classical logic-gate equivalent; it leaves |0⟩ unchanged but shifts the relative phase of |1⟩ by an angle θ, with θ typically taken to be an irrational multiple of π. [S1]",
              "Equivalently, the phase-shift gate leaves the basis state |0⟩ unaltered while mapping |1⟩ to e^(iφ)|1⟩, introducing a phase factor without changing the measurement probabilities of the state. [S2]"
            ]
          },
          {
            title: "The Hadamard Gate and Universal Gate Sets",
            body: [
              "The Hadamard gate is one of the two basis single-qubit gates (alongside the phase gate) chosen to build a universal gate set, and it creates a superposition of the basis states — for example, mapping |1⟩ to an equal-weight superposition of |1⟩ and |0⟩. [S1]",
              "It has been shown that the CNOT gate, combined with a Hadamard gate and a phase gate, together form a universal set sufficient to generate any transformation needed to implement a general-purpose quantum computer. [S1]",
              "The Hadamard gate is described as creating superposition by mapping |0⟩ to an equal superposition of |0⟩ and |1⟩, and |1⟩ to an equal superposition of |0⟩ and −|1⟩, which is why it is one of the most widely used quantum gates in practice. [S2]"
            ]
          },
          {
            title: "References",
            body: [
          "[S1] \"Quantum Gate\" — ScienceDirect Topics (drawing on F. Alexander Bais & J. Doyne Farmer, \"The Physics of Information,\" in Philosophy of Information, 2008). https://www.sciencedirect.com/topics/engineering/quantum-gate — see Figure 8 (single-qubit gate action diagram) and Figure 9 (CNOT circuit diagram) in the source chapter.",
          "[S2] \"Qubit Gate\" — ScienceDirect Topics (drawing on Olatunji et al., \"Quantum computing in renewable energy exploration,\" in Design, Analysis, and Applications of Renewable Energy Systems, 2021). https://www.sciencedirect.com/topics/engineering/qubit-gate — see Figure 22.3 (Bloch sphere) and Table 22.1 (gate symbols/matrices) in the source chapter."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Create a circuit applying S gate after Hadamard and observe the phase change in the statevector.",
          "Apply the T gate similarly and compare the phase with the S gate result.",
          "Implement the universal U(θ, φ, λ) gate with specific parameters and verify the resulting state.",
          "Demonstrate that S = U(0, 0, π/2) and T = U(0, 0, π/4) by comparing statevectors.",
          "Experiment with different U gate parameters to understand how θ, φ, and λ each affect the qubit state.",
          "Build a circuit using only U gates that reproduces the behavior of H → S → T."
        ],
        posttest: [],
        references: [
          "[S1] \"Quantum Gate\" — ScienceDirect Topics (drawing on F. Alexander Bais & J. Doyne Farmer, \"The Physics of Information,\" in Philosophy of Information, 2008). https://www.sciencedirect.com/topics/engineering/quantum-gate — see Figure 8 (single-qubit gate action diagram) and Figure 9 (CNOT circuit diagram) in the source chapter.",
          "[S2] \"Qubit Gate\" — ScienceDirect Topics (drawing on Olatunji et al., \"Quantum computing in renewable energy exploration,\" in Design, Analysis, and Applications of Renewable Energy Systems, 2021). https://www.sciencedirect.com/topics/engineering/qubit-gate — see Figure 22.3 (Bloch sphere) and Table 22.1 (gate symbols/matrices) in the source chapter."
        ]
      }
    },
    {
      id: "qk-m3-2",
      title: "2. Born Rule and Quantum Registers",
      desc: "Understand how quantum measurements produce probabilistic outcomes and learn to organize multiple qubits using quantum registers.",
      code: `from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit.quantum_info import Statevector
import numpy as np

# Born Rule Demonstration
qc_simple = QuantumCircuit(1)
qc_simple.ry(np.pi/3, 0)
sv = Statevector.from_instruction(qc_simple)
probs = sv.probabilities_dict()
print("State after Ry(π/3):", sv)
print("Born Rule Probabilities:", probs)
print(f"P(|0⟩) = cos²(π/6) = {np.cos(np.pi/6)**2:.4f}")
print(f"P(|1⟩) = sin²(π/6) = {np.sin(np.pi/6)**2:.4f}")

# Quantum Registers
qr1 = QuantumRegister(2, name='data')
qr2 = QuantumRegister(1, name='ancilla')
cr = ClassicalRegister(3, name='output')

qc_reg = QuantumCircuit(qr1, qr2, cr)
qc_reg.h(qr1[0])
qc_reg.cx(qr1[0], qr1[1])
qc_reg.h(qr2[0])
qc_reg.measure(qr1[0], cr[0])
qc_reg.measure(qr1[1], cr[1])
qc_reg.measure(qr2[0], cr[2])

print("\\nQuantum Register Circuit:")
print(qc_reg.draw())`,
      content: {
        aim: {
          text: "To understand the Born rule governing quantum measurement probabilities and learn to organize qubits into named quantum registers for structuring larger quantum circuits.",
          bullets: [
            "Interpret measurement probabilities using the Born rule",
            "Create and use named quantum and classical registers",
            "Analyze how measurement collapses quantum superposition",
            "Simulate probabilistic quantum systems and verify statistical outcomes"
          ]
        },
        theory: [
          {
            title: "The Born Rule",
            body: [
              "The Born rule is the fundamental postulate of quantum mechanics that connects the mathematical formalism to experimental results. It states that the probability of measuring a quantum state |ψ⟩ in basis state |k⟩ is P(k) = |⟨k|ψ⟩|².",
              "For a qubit in state α|0⟩ + β|1⟩: P(0) = |α|² and P(1) = |β|². This means quantum mechanics is inherently probabilistic — we can only predict the probability of each outcome, not the definite result.",
              "After measurement, the quantum state 'collapses' to the measured outcome. This is irreversible — the superposition information is lost."
            ]
          },
          {
            title: "Quantum Registers",
            body: [
              "Quantum registers are collections of qubits grouped together for organizational purposes. In Qiskit, QuantumRegister and ClassicalRegister allow you to name and structure your circuit's qubits and bits.",
              "Using named registers improves circuit readability and is essential for larger quantum algorithms where different groups of qubits serve different purposes (e.g., 'data' qubits vs 'ancilla' qubits).",
              "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Register Type</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Purpose</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Example</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">QuantumRegister</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Holds qubits for quantum operations</td><td class=\"p-3 text-muted-foreground\">QuantumRegister(3, 'data')</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">ClassicalRegister</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Stores measurement results</td><td class=\"p-3 text-muted-foreground\">ClassicalRegister(3, 'output')</td></tr></tbody></table>"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Create a qubit state with unequal superposition using Ry(θ) and compute the theoretical probabilities using the Born rule.",
          "Simulate the circuit and compare measured probability distributions with theoretical predictions.",
          "Create named QuantumRegister and ClassicalRegister objects and build a structured circuit.",
          "Apply Hadamard and CNOT operations on specific registers and add measurement operations.",
          "Run the circuit multiple times and observe how results converge to Born rule predictions.",
          "Experiment with different rotation angles and verify P(0) + P(1) = 1 always holds."
        ],
        posttest: [],
        references: [
          "Qiskit Textbook — Measurement: https://qiskit.org/textbook/ch-states/measurement.html",
          "Born Rule — Quantum Mechanics Postulates",
          "IBM Quantum Learning: https://learning.quantum-computing.ibm.com/"
        ]
      }
    },
    {
      id: "qk-m3-3",
      title: "3. Quantum Entanglement and Communication",
      desc: "Learn how entangled qubits enable secure communication and quantum teleportation, with applications in quantum networking.",
      code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
import numpy as np

# Create Bell Pair (Entanglement Source)
def create_bell_pair():
    qc = QuantumCircuit(2)
    qc.h(0)
    qc.cx(0, 1)
    return qc

# Quantum Teleportation Circuit
def teleportation_circuit():
    qc = QuantumCircuit(3, 3)
    
    # Step 1: Prepare state to teleport on qubit 0
    qc.ry(np.pi/3, 0)  # Arbitrary state
    qc.barrier()
    
    # Step 2: Create Bell pair between qubits 1 and 2
    qc.h(1)
    qc.cx(1, 2)
    qc.barrier()
    
    # Step 3: Bell measurement on qubits 0 and 1
    qc.cx(0, 1)
    qc.h(0)
    qc.barrier()
    
    # Step 4: Measure qubits 0 and 1
    qc.measure(0, 0)
    qc.measure(1, 1)
    qc.barrier()
    
    # Step 5: Classical corrections on qubit 2
    qc.x(2).c_if(1, 1)   # If qubit 1 measured 1, apply X
    qc.z(2).c_if(0, 1)   # If qubit 0 measured 1, apply Z
    qc.measure(2, 2)
    
    return qc

# Demonstrate Bell Pair
bell = create_bell_pair()
sv = Statevector.from_instruction(bell)
print("Bell State |Φ+⟩:", sv)
print("Probabilities:", sv.probabilities_dict())

# Show Teleportation Circuit
teleport = teleportation_circuit()
print("\\nTeleportation Circuit:")
print(teleport.draw())`,
      content: {
        aim: {
          text: "To explore quantum entanglement as a resource for communication, implement quantum teleportation protocols, and understand the basics of Quantum Key Distribution (QKD) for secure communication.",
          bullets: [
            "Generate Bell pairs as entanglement resources",
            "Implement the quantum teleportation protocol",
            "Explore QKD protocols for secure key exchange",
            "Understand fundamental quantum communication concepts"
          ]
        },
        theory: [
          {
            title: "Quantum Entanglement for Communication",
            body: [
              "Quantum entanglement is a phenomenon where two or more qubits become correlated in such a way that the quantum state of each qubit cannot be described independently. The four Bell states form a basis for maximally entangled two-qubit systems.",
              "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Bell State</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Expression</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Creation Circuit</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|Φ+⟩</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">(|00⟩ + |11⟩)/√2</td><td class=\"p-3 text-muted-foreground\">H → CNOT</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|Φ−⟩</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">(|00⟩ − |11⟩)/√2</td><td class=\"p-3 text-muted-foreground\">X → H → CNOT</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|Ψ+⟩</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">(|01⟩ + |10⟩)/√2</td><td class=\"p-3 text-muted-foreground\">X(1) → H → CNOT</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|Ψ−⟩</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">(|01⟩ − |10⟩)/√2</td><td class=\"p-3 text-muted-foreground\">X(0,1) → H → CNOT</td></tr></tbody></table>"
            ]
          },
          {
            title: "Quantum Teleportation & QKD",
            body: [
              "Quantum teleportation transfers a quantum state from one qubit to another using a shared Bell pair and two classical bits of communication. It does not transmit matter or energy faster than light — the classical communication is still required.",
              "The protocol: (1) Alice and Bob share a Bell pair. (2) Alice performs a Bell measurement on her data qubit and her half of the Bell pair. (3) Alice sends the 2-bit measurement result classically. (4) Bob applies correction gates (X and/or Z) based on Alice's message to recover the original state.",
              "Quantum Key Distribution (QKD), such as the BB84 protocol, uses quantum states to establish a shared secret key between two parties. Any eavesdropping attempt disturbs the quantum states and is detectable, providing information-theoretic security."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Create a Bell pair using H + CNOT and verify the entangled state.",
          "Build the complete quantum teleportation circuit with 3 qubits and 3 classical bits.",
          "Prepare an arbitrary state on qubit 0 using Ry rotation.",
          "Implement Bell measurement (CNOT + H + measure) on qubits 0 and 1.",
          "Apply classical corrections (conditional X and Z) on qubit 2 based on measurement results.",
          "Verify that qubit 2 ends up in the same state that was originally on qubit 0."
        ],
        posttest: [],
        references: [
          "Bennett et al. — Teleporting an Unknown Quantum State (1993)",
          "BB84 Protocol — Bennett and Brassard (1984)",
          "Qiskit Textbook — Quantum Teleportation: https://qiskit.org/textbook/ch-algorithms/teleportation.html"
        ]
      }
    }
  ]
};
