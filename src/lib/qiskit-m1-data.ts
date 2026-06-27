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
          text: "To explore the major quantum computing platforms — IBM Quantum Composer, Qiskit, PennyLane, and QSim — and understand their capabilities for designing, simulating, and executing quantum circuits.",
          bullets: [
            "Navigate the IBM Quantum Composer drag-and-drop interface",
            "Write and execute simple Qiskit programs",
            "Compare PennyLane and QSim for quantum algorithm development",
            "Build and simulate basic quantum circuits"
          ]
        },
        theory: [
          {
            title: "IBM Quantum Composer",
            body: [
              "IBM Quantum Composer is a cloud-based graphical tool that allows users to build quantum circuits by dragging and dropping gates onto qubit wires. It provides real-time visualization of quantum state probabilities and supports execution on both simulators and real quantum hardware via the IBM Quantum Network.",
              "Key Features: Visual circuit builder, real-time statevector display, access to real quantum processors, integration with Qiskit for programmatic control."
            ]
          },
          {
            title: "Qiskit — IBM's Quantum SDK",
            body: [
              "Qiskit is an open-source software development kit for working with quantum computers at the level of pulses, circuits, and algorithms. It is written in Python and provides tools for creating and manipulating quantum programs and running them on prototype quantum devices and simulators.",
              "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Component</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Purpose</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Qiskit Terra</td><td class=\"p-3 text-muted-foreground\">Core circuits and transpilation</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Qiskit Aer</td><td class=\"p-3 text-muted-foreground\">High-performance simulators</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Qiskit Machine Learning</td><td class=\"p-3 text-muted-foreground\">Quantum ML algorithms</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Qiskit Nature</td><td class=\"p-3 text-muted-foreground\">Chemistry and physics simulations</td></tr></tbody></table>"
            ]
          },
          {
            title: "PennyLane & QSim",
            body: [
              "PennyLane is a cross-platform Python library for differentiable programming of quantum computers, enabling quantum machine learning, optimization, and quantum chemistry. It integrates seamlessly with popular ML frameworks like TensorFlow and PyTorch.",
              "QSim is India's first quantum computing simulator, developed to support quantum algorithm research and education. It allows users to simulate quantum circuits with up to 30+ qubits on classical hardware."
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
          text: "To study and differentiate between various quantum state representations including pure states, superposition, entangled states, and mixed states, and understand how quantum information differs fundamentally from classical bits.",
          bullets: [
            "Differentiate between pure and mixed quantum states",
            "Understand density matrices and their physical interpretation",
            "Analyze superposition and entangled state representations",
            "Interpret qubit behavior under measurement"
          ]
        },
        theory: [
          {
            title: "Pure States and Superposition",
            body: [
              "A pure quantum state represents maximum knowledge about a quantum system. It can be described by a single state vector |ψ⟩ in Hilbert space. A qubit in a pure state can be written as |ψ⟩ = α|0⟩ + β|1⟩, where |α|² + |β|² = 1.",
              "Superposition is the ability of a quantum system to exist in multiple states simultaneously. Unlike a classical bit which is either 0 or 1, a qubit in superposition carries information about both outcomes until measured.",
              "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">State Type</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Description</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Example</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|0⟩ (Ground)</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Definite state — always measures 0</td><td class=\"p-3 text-muted-foreground\">[1, 0]</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|+⟩ (Plus)</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Equal superposition — 50/50 outcome</td><td class=\"p-3 text-muted-foreground\">[1/√2, 1/√2]</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">|Φ+⟩ (Bell)</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Maximally entangled two-qubit state</td><td class=\"p-3 text-muted-foreground\">[1/√2, 0, 0, 1/√2]</td></tr></tbody></table>"
            ]
          },
          {
            title: "Entangled and Mixed States",
            body: [
              "Entangled states are multi-qubit states that cannot be factored into individual qubit states. The most famous examples are the four Bell states. When two qubits are entangled, measuring one instantly determines the state of the other, regardless of distance.",
              "Mixed states represent statistical ensembles of pure states and arise when there is classical uncertainty about which quantum state the system is in. They are described using density matrices ρ rather than state vectors. A maximally mixed state ρ = I/2 represents complete ignorance about the qubit's state.",
              "The purity Tr(ρ²) ranges from 1/d (maximally mixed) to 1 (pure state), where d is the dimension of the Hilbert space."
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
