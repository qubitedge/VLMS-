import type { Week } from "./course-data";

export const qiskitModule1: Week = {
  title: "Module 1",
  objective: "Quantum Computing Foundations",
  tutorial: "Lab 1: Quantum Computing Platforms & States",
  labTitle: "Lab 1: Quantum Computing Foundations",
  experiments: [
    {
      id: "qk-m1-1",
      title: "1. Exploring Quantum Computing Platforms",
      desc: "Learn how to design and simulate quantum circuits using IBM Quantum Composer, Qiskit, PennyLane, and QSim.",
      code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
import numpy as np

# Create a simple quantum circuit using Qiskit
qc = QuantumCircuit(2)
qc.h(0)          # Apply Hadamard gate to qubit 0
qc.cx(0, 1)      # Apply CNOT gate (qubit 0 controls qubit 1)

# Simulate the statevector
sv = Statevector.from_instruction(qc)
print("Statevector:", sv)
print("Probabilities:", sv.probabilities_dict())
print("\\nCircuit Diagram:")
print(qc.draw())`,
      content: {
        aim: {
          text: "To explore quantum computing platforms using Qiskit and understand the workflow of designing, simulating, and executing quantum circuits on IBM Quantum systems.",
          bullets: [
            "Understand the fundamentals of quantum computing platforms and the Qiskit framework.",
            "Set up and explore the Qiskit development environment.",
            "Create and simulate basic quantum circuits using Qiskit.",
            "Execute quantum circuits on IBM Quantum simulators and real quantum hardware.",
            "Analyze the measurement results and understand the quantum circuit execution process."
          ]
        },
        theory: [
          {
            title: "Quantum Computing Fundamentals",
            body: [
              "Quantum computing is a new computing technology based on the principles of quantum mechanics. Unlike classical computers, which use bits that can store only 0 or 1, quantum computers use quantum bits (qubits). A qubit can exist in the state |0⟩, |1⟩, or a combination of both states at the same time, known as superposition. This property allows quantum computers to process information differently from classical computers.",
              "Another important property of quantum computing is entanglement, where two or more qubits become connected in such a way that the state of one qubit depends on the state of another, even when they are far apart. Quantum computers also use interference, which helps increase the probability of correct outcomes while reducing incorrect ones. These properties enable quantum computers to solve certain complex problems more efficiently than classical computers."
            ]
          },
          {
            title: "Qiskit — The Quantum Computing Platform",
            body: [
              "To program quantum computers, developers use software frameworks known as quantum computing platforms. One of the most popular platforms is Qiskit, an open-source Python Software Development Kit (SDK) developed by IBM. Qiskit allows users to design quantum circuits, simulate them on a classical computer, and execute them on real IBM Quantum processors through the cloud."
            ]
          },
          {
            title: "Typical Qiskit Workflow",
            body: [
              "A typical workflow in Qiskit consists of the following steps:",
              "1. Create a quantum circuit by defining qubits and classical bits.",
              "2. Apply quantum gates such as X, H, or CX to manipulate the qubits.",
              "3. Measure the qubits to obtain the output.",
              "4. Execute the circuit on a simulator or a real quantum device.",
              "5. Analyze the measurement results."
            ]
          },
          {
            title: "IBM Quantum Execution Options",
            body: [
              "IBM Quantum provides two execution options:",
              "Quantum Simulators: These run quantum circuits on a classical computer and are useful for testing and learning.",
              "Real Quantum Hardware: These execute circuits on actual quantum processors, allowing users to observe the behavior of real qubits."
            ]
          }
        ],
        pretest: [
          { question: "What is IBM Quantum Composer?", options: ["A text editor for Python", "A graphical quantum circuit builder", "A database management tool", "A machine learning framework"], answerIndex: 1 },
          { question: "Which programming language is Qiskit based on?", options: ["Java", "C++", "Python", "JavaScript"], answerIndex: 2 },
          { question: "What is the primary purpose of Qiskit Aer?", options: ["Circuit visualization", "High-performance quantum simulation", "Code compilation", "Data storage"], answerIndex: 1 },
          { question: "PennyLane is primarily designed for:", options: ["Web development", "Differentiable quantum programming", "Image processing", "Network security"], answerIndex: 1 },
          { question: "QSim is developed by which country?", options: ["USA", "China", "India", "Germany"], answerIndex: 2 },
          { question: "What is a quantum circuit?", options: ["A classical electronic circuit", "A sequence of quantum gates applied to qubits", "A type of neural network", "A database query"], answerIndex: 1 },
          { question: "Which of these is NOT a quantum computing platform?", options: ["Qiskit", "PennyLane", "TensorFlow", "IBM Quantum Composer"], answerIndex: 2 },
          { question: "What does a Hadamard gate do?", options: ["Entangles two qubits", "Creates superposition", "Measures a qubit", "Resets a qubit"], answerIndex: 1 },
          { question: "IBM Quantum Composer allows execution on:", options: ["Only simulators", "Only real quantum hardware", "Both simulators and real hardware", "Classical computers only"], answerIndex: 2 },
          { question: "PennyLane integrates with which ML frameworks?", options: ["Only NumPy", "TensorFlow and PyTorch", "Only Scikit-learn", "MATLAB only"], answerIndex: 1 }
        ],
        procedure: [
          "Open IBM Quantum Composer and create a new circuit with 2 qubits.",
          "Drag a Hadamard gate onto qubit 0 and a CNOT gate with qubit 0 as control and qubit 1 as target.",
          "Observe the resulting statevector and probability distribution in the composer visualization.",
          "Write the equivalent circuit in Qiskit using QuantumCircuit, apply the same gates, and simulate using Statevector.",
          "Compare the results from IBM Quantum Composer and Qiskit simulation.",
          "Explore PennyLane documentation and create a simple circuit using qml.device and qml.qnode decorators.",
          "Review QSim's capabilities for simulating larger circuits and compare its simulation limits."
        ],
        posttest: [
          { question: "In Qiskit, which class is used to create a quantum circuit?", options: ["QuantumRegister", "QuantumCircuit", "QuantumGate", "QuantumProcessor"], answerIndex: 1 },
          { question: "What does the CNOT gate do?", options: ["Creates superposition", "Flips the target qubit conditionally based on the control qubit", "Measures both qubits", "Resets the circuit"], answerIndex: 1 },
          { question: "How does IBM Quantum Composer differ from Qiskit?", options: ["Composer is graphical while Qiskit is programmatic", "They are identical tools", "Composer only works offline", "Qiskit cannot simulate circuits"], answerIndex: 0 },
          { question: "What is the advantage of PennyLane over Qiskit for ML tasks?", options: ["It runs faster on quantum hardware", "It supports automatic differentiation of quantum circuits", "It has more quantum gates", "It requires no Python knowledge"], answerIndex: 1 },
          { question: "A Bell state can be created using which combination of gates?", options: ["Two X gates", "Hadamard followed by CNOT", "Two Hadamard gates", "SWAP gate only"], answerIndex: 1 },
          { question: "What does Statevector.from_instruction() return?", options: ["A classical bit string", "The quantum state vector after circuit execution", "The circuit diagram", "Error information"], answerIndex: 1 },
          { question: "Which Qiskit component handles transpilation?", options: ["Qiskit Aer", "Qiskit Terra", "Qiskit Nature", "Qiskit ML"], answerIndex: 1 },
          { question: "QSim can simulate circuits with up to approximately how many qubits?", options: ["5 qubits", "10 qubits", "30+ qubits", "1000 qubits"], answerIndex: 2 },
          { question: "What is the output of measuring a qubit in superposition?", options: ["Always 0", "Always 1", "Randomly 0 or 1 with equal probability", "An error"], answerIndex: 2 },
          { question: "Which platform would you choose for quantum-classical hybrid ML research?", options: ["IBM Quantum Composer", "QSim", "PennyLane", "None of these"], answerIndex: 2 }
        ],
        references: [
          "IBM Quantum Documentation: https://quantum-computing.ibm.com/",
          "Qiskit Textbook: https://qiskit.org/textbook/",
          "PennyLane Documentation: https://pennylane.ai/",
          "QSim India: https://qctoolkit.in/"
        ]
      }
    },
    {
      id: "qk-m1-2",
      title: "2. Understanding Quantum States",
      desc: "Study different representations of quantum information including pure states, superposition, entangled states, and mixed states.",
      code: `from qiskit.quantum_info import Statevector, DensityMatrix
import numpy as np

# Pure State: |0⟩
pure_state = Statevector([1, 0])
print("Pure State |0⟩:", pure_state)
print("Probabilities:", pure_state.probabilities_dict())

# Superposition State: (|0⟩ + |1⟩) / √2
superposition = Statevector([1/np.sqrt(2), 1/np.sqrt(2)])
print("\\nSuperposition State:", superposition)
print("Probabilities:", superposition.probabilities_dict())

# Mixed State as Density Matrix
rho_mixed = DensityMatrix(np.array([[0.5, 0], [0, 0.5]]))
print("\\nMixed State (maximally mixed):")
print(rho_mixed)
print("Purity:", rho_mixed.purity())`,
      content: {
        aim: {
          text: "To understand the concept of quantum states and learn how qubits are represented and manipulated using Qiskit.",
          bullets: [
            "Understand the difference between classical bits and quantum bits (qubits).",
            "Explore the concepts of quantum states, superposition, and state vectors.",
            "Represent single-qubit states using Dirac (bra-ket) notation.",
            "Create and visualize different quantum states using Qiskit.",
            "Analyze the effect of quantum gates on qubit states."
          ]
        },
        theory: [
          {
            title: "Quantum States and Qubits",
            body: [
              "A quantum state describes the condition of a qubit at any given time. In classical computing, a bit can have only one of two values: 0 or 1. In contrast, a qubit (quantum bit) can exist in the state |0⟩, |1⟩, or in a combination of both states simultaneously. This unique property is called superposition.",
              "A general quantum state of a single qubit is represented as: |ψ⟩ = α|0⟩ + β|1⟩, where α (alpha) and β (beta) are complex probability amplitudes. The values of α and β determine the probability of measuring the qubit in either the |0⟩ or |1⟩ state. Since the total probability must always equal 1, they satisfy the condition: |α|² + |β|² = 1."
            ]
          },
          {
            title: "Dirac (Bra-Ket) Notation",
            body: [
              "Quantum states are commonly written using Dirac (bra-ket) notation, where:",
              "|0⟩ represents the basis state corresponding to classical 0.",
              "|1⟩ represents the basis state corresponding to classical 1."
            ]
          },
          {
            title: "Quantum Gates and State Manipulation",
            body: [
              "Unlike classical bits, qubits can be manipulated using quantum gates. Gates such as the Hadamard (H) gate, Pauli-X (X) gate, and Pauli-Z (Z) gate change the state of a qubit. For example, applying the Hadamard gate to |0⟩ creates an equal superposition of |0⟩ and |1⟩, meaning the qubit has an equal probability of being measured as either 0 or 1."
            ]
          },
          {
            title: "Exploring Quantum States with Qiskit",
            body: [
              "The Qiskit framework provides tools to create quantum circuits, initialize qubits, apply quantum gates, simulate quantum states, and visualize them using state vectors and measurement results. This allows learners to understand how quantum states evolve during computation and how different quantum operations affect the behavior of qubits.",
              "In this experiment, students will explore the representation of quantum states, create basic quantum circuits in Qiskit, apply quantum gates to manipulate qubits, and observe how the state of a qubit changes before and after measurement. This forms the foundation for understanding more advanced concepts such as entanglement, interference, and quantum algorithms."
            ]
          }
        ],
        pretest: [
          { question: "What is a qubit?", options: ["A classical bit", "A quantum bit that can exist in superposition", "A type of transistor", "A binary number"], answerIndex: 1 },
          { question: "A pure state is described by:", options: ["A density matrix only", "A state vector |ψ⟩", "A probability distribution", "A classical register"], answerIndex: 1 },
          { question: "What does superposition mean in quantum computing?", options: ["A qubit is broken", "A qubit exists in multiple states simultaneously", "Two qubits are connected", "A qubit is measured"], answerIndex: 1 },
          { question: "The state |0⟩ has probability of measuring 0 equal to:", options: ["0%", "50%", "100%", "Unknown"], answerIndex: 2 },
          { question: "What is the normalization condition for a qubit state α|0⟩ + β|1⟩?", options: ["|α|² + |β|² = 0", "|α|² + |β|² = 1", "|α| + |β| = 1", "α + β = 1"], answerIndex: 1 },
          { question: "Entangled states involve:", options: ["A single qubit", "Multiple qubits with correlated measurements", "Only classical bits", "Independent qubits"], answerIndex: 1 },
          { question: "A density matrix is used to describe:", options: ["Only pure states", "Only entangled states", "Both pure and mixed states", "Classical states only"], answerIndex: 2 },
          { question: "What is the purity of a pure state?", options: ["0", "0.5", "1", "Undefined"], answerIndex: 2 },
          { question: "A Bell state is an example of:", options: ["A separable state", "A mixed state", "A maximally entangled state", "A classical state"], answerIndex: 2 },
          { question: "The Bloch sphere represents:", options: ["Multi-qubit states", "Single-qubit pure states geometrically", "Classical bits", "Entanglement measures"], answerIndex: 1 }
        ],
        procedure: [
          "Create a pure state |0⟩ using Statevector([1, 0]) and verify its probabilities.",
          "Create a superposition state using the Hadamard transformation and verify equal probability outcomes.",
          "Construct a two-qubit entangled Bell state |Φ+⟩ and verify that it cannot be expressed as a tensor product of individual qubit states.",
          "Create a mixed state density matrix using DensityMatrix and compute its purity.",
          "Compare the purity values of pure states (purity = 1) and mixed states (purity < 1).",
          "Visualize the difference between pure and mixed states on the Bloch sphere representation."
        ],
        posttest: [
          { question: "Why can't an entangled state be written as a tensor product of individual states?", options: ["Because it involves classical correlations only", "Because the correlations between qubits are quantum mechanical and non-separable", "Because tensor products don't exist", "Because entanglement is a computational error"], answerIndex: 1 },
          { question: "What is the density matrix of a pure state |ψ⟩?", options: ["ρ = |ψ⟩⟨ψ|", "ρ = I/2", "ρ = |ψ⟩ + ⟨ψ|", "ρ = 0"], answerIndex: 0 },
          { question: "A maximally mixed single-qubit state has purity:", options: ["1", "0.5", "0", "2"], answerIndex: 1 },
          { question: "What happens to an entangled pair when one qubit is measured?", options: ["Nothing changes", "The other qubit's state is immediately determined", "Both qubits are destroyed", "The entanglement grows stronger"], answerIndex: 1 },
          { question: "The |+⟩ state is obtained by applying which gate to |0⟩?", options: ["X gate", "Z gate", "Hadamard gate", "CNOT gate"], answerIndex: 2 },
          { question: "How many Bell states exist?", options: ["2", "3", "4", "8"], answerIndex: 2 },
          { question: "Mixed states arise due to:", options: ["Quantum entanglement only", "Classical uncertainty about the quantum state", "Too many qubits", "Measurement errors only"], answerIndex: 1 },
          { question: "The trace of a valid density matrix equals:", options: ["0", "0.5", "1", "2"], answerIndex: 2 },
          { question: "Which representation is more general — state vectors or density matrices?", options: ["State vectors", "Density matrices", "Both are equally general", "Neither can represent quantum states"], answerIndex: 1 },
          { question: "If ρ² = ρ, the state is:", options: ["Mixed", "Entangled", "Pure", "Invalid"], answerIndex: 2 }
        ],
        references: [
          "Nielsen, M.A. & Chuang, I.L. — Quantum Computation and Quantum Information",
          "Qiskit Textbook — Representing Qubit States: https://qiskit.org/textbook/ch-states/",
          "IBM Quantum Learning: https://learning.quantum-computing.ibm.com/"
        ]
      }
    }
  ]
};
