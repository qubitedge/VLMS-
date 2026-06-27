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
            title: "Phase Gates: S and T",
            body: [
              "Phase gates modify the relative phase of the |1⟩ component without changing measurement probabilities in the computational basis. While this may seem trivial, phases are crucial for quantum interference — the mechanism that enables quantum speedup.",
              "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Gate</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Phase Added</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Matrix</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Relation</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">S</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">π/2 (90°)</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">[[1,0],[0,i]]</td><td class=\"p-3 text-muted-foreground\">S = √Z</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">T</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">π/4 (45°)</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">[[1,0],[0,e^(iπ/4)]]</td><td class=\"p-3 text-muted-foreground\">T = √S</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Z</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">π (180°)</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">[[1,0],[0,-1]]</td><td class=\"p-3 text-muted-foreground\">Z = S²</td></tr></tbody></table>"
            ]
          },
          {
            title: "Universal U Gate",
            body: [
              "The U gate U(θ, φ, λ) is the most general single-qubit gate. Any single-qubit unitary operation can be expressed using three parameters: θ (rotation angle), φ (phase 1), and λ (phase 2).",
              "Special cases: U(0, 0, π) = Z, U(0, 0, π/2) = S, U(π, 0, π) = X, U(π/2, 0, π) = H. This means every named single-qubit gate is just a specific parameterization of the U gate.",
              "The U gate is particularly important for variational quantum algorithms where gate parameters are optimized classically to find optimal quantum circuits."
            ]
          }
        ],
        pretest: [
          { question: "The S gate adds a phase of:", options: ["π", "π/2", "π/4", "2π"], answerIndex: 1 },
          { question: "How is the T gate related to the S gate?", options: ["T = S²", "S = T²", "T = 2S", "They are unrelated"], answerIndex: 1 },
          { question: "The U gate takes how many parameters?", options: ["1", "2", "3", "4"], answerIndex: 2 },
          { question: "Phase gates change:", options: ["Measurement probabilities", "The relative phase between |0⟩ and |1⟩", "The number of qubits", "The circuit depth"], answerIndex: 1 },
          { question: "Any single-qubit gate can be expressed as:", options: ["A CNOT gate", "A U(θ, φ, λ) gate", "A measurement", "A classical gate"], answerIndex: 1 },
          { question: "U(π, 0, π) is equivalent to:", options: ["H gate", "X gate", "Z gate", "S gate"], answerIndex: 1 },
          { question: "Quantum interference relies on:", options: ["Classical probability", "Phase differences between quantum amplitudes", "Measurement only", "Entanglement only"], answerIndex: 1 },
          { question: "The S† (S-dagger) gate adds a phase of:", options: ["π/2", "-π/2", "π", "π/4"], answerIndex: 1 },
          { question: "Why are phase gates important for quantum algorithms?", options: ["They speed up classical computation", "They enable constructive and destructive interference", "They create entanglement", "They measure qubits"], answerIndex: 1 },
          { question: "The identity gate is U(θ, φ, λ) with:", options: ["θ=π, φ=0, λ=0", "θ=0, φ=0, λ=0", "θ=π/2, φ=0, λ=π", "θ=π, φ=π, λ=π"], answerIndex: 1 }
        ],
        procedure: [
          "Create a circuit applying S gate after Hadamard and observe the phase change in the statevector.",
          "Apply the T gate similarly and compare the phase with the S gate result.",
          "Implement the universal U(θ, φ, λ) gate with specific parameters and verify the resulting state.",
          "Demonstrate that S = U(0, 0, π/2) and T = U(0, 0, π/4) by comparing statevectors.",
          "Experiment with different U gate parameters to understand how θ, φ, and λ each affect the qubit state.",
          "Build a circuit using only U gates that reproduces the behavior of H → S → T."
        ],
        posttest: [
          { question: "After H → S on |0⟩, the state is:", options: ["(|0⟩ + i|1⟩)/√2", "(|0⟩ + |1⟩)/√2", "|1⟩", "(|0⟩ − |1⟩)/√2"], answerIndex: 0 },
          { question: "How many S gates equal one Z gate?", options: ["1", "2", "3", "4"], answerIndex: 1 },
          { question: "The θ parameter in U(θ, φ, λ) controls:", options: ["Global phase", "Rotation angle around the Bloch sphere", "Entanglement strength", "Measurement basis"], answerIndex: 1 },
          { question: "Why is the U gate called 'universal'?", options: ["It works on any quantum computer", "Any single-qubit operation can be expressed as a U gate", "It can replace all multi-qubit gates", "It is the fastest gate"], answerIndex: 1 },
          { question: "Phase kickback is important for:", options: ["Classical computing", "Quantum phase estimation algorithms", "Data storage", "Error removal"], answerIndex: 1 },
          { question: "The T gate is essential for:", options: ["Creating entanglement", "Fault-tolerant quantum computation", "Measuring qubits", "Classical logic"], answerIndex: 1 },
          { question: "Constructive interference in quantum circuits:", options: ["Cancels amplitudes", "Amplifies correct answer amplitudes", "Creates errors", "Reduces probability"], answerIndex: 1 },
          { question: "What is the inverse of the T gate?", options: ["T", "S", "T† (T-dagger)", "Z"], answerIndex: 2 },
          { question: "In variational algorithms, U gate parameters are:", options: ["Fixed constants", "Optimized by a classical optimizer", "Random values", "Always zero"], answerIndex: 1 },
          { question: "The phase gate P(λ) is equivalent to:", options: ["U(0, 0, λ)", "U(λ, 0, 0)", "U(0, λ, 0)", "U(λ, λ, λ)"], answerIndex: 0 }
        ],
        references: [
          "Qiskit Documentation — Phase Gates: https://qiskit.org/documentation/",
          "Fault-Tolerant Quantum Computation — Gottesman-Knill Theorem",
          "IBM Quantum Learning: https://learning.quantum-computing.ibm.com/"
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
qc = QuantumCircuit(1, 1)
qc.ry(np.pi/3, 0)  # Rotate to create unequal superposition
sv = Statevector.from_instruction(QuantumCircuit(1).compose(QuantumCircuit(1).compose(
    QuantumCircuit(1).ry(np.pi/3, 0))))

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
        pretest: [
          { question: "The Born rule gives us:", options: ["Exact measurement outcomes", "Probabilities of measurement outcomes", "Gate operations", "Circuit depth"], answerIndex: 1 },
          { question: "For state α|0⟩ + β|1⟩, P(|0⟩) equals:", options: ["α", "|α|²", "α²", "1/α"], answerIndex: 1 },
          { question: "After measurement, a qubit in superposition:", options: ["Remains in superposition", "Collapses to one definite state", "Becomes entangled", "Is destroyed"], answerIndex: 1 },
          { question: "A QuantumRegister in Qiskit holds:", options: ["Classical bits", "Qubits", "Measurement results", "Gate parameters"], answerIndex: 1 },
          { question: "Measurement in quantum computing is:", options: ["Reversible", "Irreversible", "Optional for computation", "Always deterministic"], answerIndex: 1 },
          { question: "An ancilla qubit is:", options: ["The main data qubit", "An auxiliary qubit used for computation", "A classical bit", "A measurement device"], answerIndex: 1 },
          { question: "What does |⟨k|ψ⟩|² represent?", options: ["Energy", "Probability amplitude", "Measurement probability", "Entanglement degree"], answerIndex: 2 },
          { question: "Classical registers store:", options: ["Quantum states", "Gate operations", "Measurement results as classical bits", "Superposition states"], answerIndex: 2 },
          { question: "Running a quantum circuit many times gives:", options: ["The same result each time", "A probability distribution matching Born rule predictions", "Random noise", "No useful information"], answerIndex: 1 },
          { question: "Named registers help with:", options: ["Faster computation", "Circuit organization and readability", "Creating entanglement", "Reducing errors"], answerIndex: 1 }
        ],
        procedure: [
          "Create a qubit state with unequal superposition using Ry(θ) and compute the theoretical probabilities using the Born rule.",
          "Simulate the circuit and compare measured probability distributions with theoretical predictions.",
          "Create named QuantumRegister and ClassicalRegister objects and build a structured circuit.",
          "Apply Hadamard and CNOT operations on specific registers and add measurement operations.",
          "Run the circuit multiple times and observe how results converge to Born rule predictions.",
          "Experiment with different rotation angles and verify P(0) + P(1) = 1 always holds."
        ],
        posttest: [
          { question: "If a qubit is in state (√3/2)|0⟩ + (1/2)|1⟩, P(|0⟩) is:", options: ["1/2", "3/4", "1/4", "√3/2"], answerIndex: 1 },
          { question: "Why do we need multiple shots when running quantum circuits?", options: ["To fix errors", "To build statistical estimates of probability distributions", "To make the circuit longer", "To create entanglement"], answerIndex: 1 },
          { question: "Measurement collapses superposition because:", options: ["The hardware is noisy", "Interaction with the measurement apparatus forces a definite outcome", "It's a software bug", "Qubits have limited memory"], answerIndex: 1 },
          { question: "An ancilla qubit initialized to |0⟩ is typically used for:", options: ["Main computation only", "Helper operations like phase kickback or error detection", "Storing final results", "Nothing useful"], answerIndex: 1 },
          { question: "In 1000 shots of a 50/50 superposition, you'd expect approximately:", options: ["Exactly 500 zeros", "Roughly 500 zeros with statistical variation", "All zeros", "All ones"], answerIndex: 1 },
          { question: "The Born rule applies to:", options: ["Only single qubits", "Any quantum measurement in any basis", "Only entangled states", "Only classical systems"], answerIndex: 1 },
          { question: "Multiple quantum registers in one circuit:", options: ["Must have the same size", "Can have different sizes and names", "Cannot interact with each other", "Are always entangled"], answerIndex: 1 },
          { question: "What is a 'shot' in quantum computing?", options: ["A type of gate", "One execution of a quantum circuit followed by measurement", "A quantum error", "A classical computation"], answerIndex: 1 },
          { question: "Mid-circuit measurement allows:", options: ["Nothing special", "Conditional operations based on measurement results", "Faster computation", "Error-free circuits"], answerIndex: 1 },
          { question: "The total probability across all measurement outcomes must equal:", options: ["0", "0.5", "1", "The number of qubits"], answerIndex: 2 }
        ],
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
        pretest: [
          { question: "Quantum teleportation transfers:", options: ["Physical matter", "A quantum state using entanglement and classical bits", "Energy faster than light", "Classical data"], answerIndex: 1 },
          { question: "How many classical bits are needed for teleportation?", options: ["0", "1", "2", "3"], answerIndex: 2 },
          { question: "A Bell pair is:", options: ["A single qubit state", "A maximally entangled two-qubit state", "A classical bit pair", "A measurement outcome"], answerIndex: 1 },
          { question: "QKD stands for:", options: ["Quantum Key Detection", "Quantum Key Distribution", "Quantum Knowledge Database", "Quantum Kernel Design"], answerIndex: 1 },
          { question: "Eavesdropping on a quantum channel:", options: ["Is undetectable", "Disturbs the quantum states and is detectable", "Improves the signal", "Has no effect"], answerIndex: 1 },
          { question: "The BB84 protocol was proposed by:", options: ["Einstein", "Bennett and Brassard", "Shor", "Grover"], answerIndex: 1 },
          { question: "Teleportation requires:", options: ["Only quantum channels", "Only classical channels", "Both quantum and classical channels", "Neither"], answerIndex: 2 },
          { question: "The no-cloning theorem states:", options: ["Qubits can be freely copied", "Unknown quantum states cannot be perfectly copied", "Classical bits cannot be copied", "Entanglement can be cloned"], answerIndex: 1 },
          { question: "Superdense coding allows:", options: ["Sending 1 classical bit per qubit", "Sending 2 classical bits using 1 qubit and shared entanglement", "Faster-than-light communication", "Unlimited data transfer"], answerIndex: 1 },
          { question: "Bell measurement distinguishes between:", options: ["Classical bit values", "The four Bell states", "Gate types", "Circuit depths"], answerIndex: 1 }
        ],
        procedure: [
          "Create a Bell pair using H + CNOT and verify the entangled state.",
          "Build the complete quantum teleportation circuit with 3 qubits and 3 classical bits.",
          "Prepare an arbitrary state on qubit 0 using Ry rotation.",
          "Implement Bell measurement (CNOT + H + measure) on qubits 0 and 1.",
          "Apply classical corrections (conditional X and Z) on qubit 2 based on measurement results.",
          "Verify that qubit 2 ends up in the same state that was originally on qubit 0."
        ],
        posttest: [
          { question: "Why doesn't teleportation violate the no-cloning theorem?", options: ["It does violate it", "The original state is destroyed during Bell measurement", "It only works for classical states", "Cloning is allowed for entangled states"], answerIndex: 1 },
          { question: "After teleportation, Alice's qubit:", options: ["Has the original state", "Is in a definite computational basis state (collapsed)", "Is entangled with Bob's", "Is destroyed physically"], answerIndex: 1 },
          { question: "The security of QKD is based on:", options: ["Computational difficulty", "Laws of quantum physics", "Classical encryption", "Network protocols"], answerIndex: 1 },
          { question: "In the BB84 protocol, if Alice and Bob use different bases:", options: ["They always agree", "They discard those bits", "The key is compromised", "Communication fails"], answerIndex: 1 },
          { question: "Quantum repeaters are needed for:", options: ["Local quantum circuits", "Long-distance quantum communication", "Gate optimization", "Error creation"], answerIndex: 1 },
          { question: "The no-communication theorem prevents:", options: ["All quantum communication", "Using entanglement alone to send information", "Classical communication", "Teleportation"], answerIndex: 1 },
          { question: "How many Bell states exist?", options: ["2", "3", "4", "8"], answerIndex: 2 },
          { question: "Entanglement swapping allows:", options: ["Creating entanglement between particles that never interacted", "Destroying entanglement", "Copying quantum states", "Classical key exchange"], answerIndex: 0 },
          { question: "The quantum internet will rely on:", options: ["Classical routers only", "Entanglement distribution and quantum repeaters", "Faster-than-light signals", "Traditional encryption"], answerIndex: 1 },
          { question: "If Eve intercepts and measures qubits in QKD:", options: ["Nothing happens", "She introduces detectable errors in the key", "She gets the key without detection", "The protocol restarts automatically"], answerIndex: 1 }
        ],
        references: [
          "Bennett et al. — Teleporting an Unknown Quantum State (1993)",
          "BB84 Protocol — Bennett and Brassard (1984)",
          "Qiskit Textbook — Quantum Teleportation: https://qiskit.org/textbook/ch-algorithms/teleportation.html"
        ]
      }
    }
  ]
};
