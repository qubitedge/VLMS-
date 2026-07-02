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
              "Quantum computation represents a paradigm shift in information processing, intrinsically predicated upon the foundational axioms of quantum mechanics. In stark contrast to classical deterministic architectures utilizing binary bits (0 or 1), quantum hardware manipulates quantum bits (qubits). A fundamental qubit resides within a two-dimensional complex Hilbert space, permitting simultaneous existence in an arbitrary linear combination of basis states |0⟩ and |1⟩—a phenomenon strictly defined as quantum superposition. [S1]",
              "Furthermore, non-local quantum correlations, formally defined as entanglement, mathematically bind multi-qubit systems such that the quantum state of the composite system cannot be factored into individual subsystem states. Coupled with wave-like interference dynamics—which strategically amplify correct computational amplitudes while destructively suppressing erroneous paths—these mechanics afford quantum platforms exponential speedups for specialized computational problem classes. [S1]"
            ]
          },
          {
            title: "Qiskit — The Quantum Computing Platform",
            body: [
              "To practically interface with physical quantum hardware, robust software abstractions and execution platforms are required. A prominent standard is Qiskit, a comprehensive open-source Python Software Development Kit (SDK) pioneered by IBM. Qiskit provides a rigorous framework for the synthesis, topological routing, and execution of quantum circuits, bridging the gap between theoretical algorithm design and physical realization on superconducting transmon architectures via cloud infrastructure. [S2]"
            ]
          },
          {
            title: "Typical Qiskit Workflow",
            body: [
              "A typical algorithmic execution loop within Qiskit follows a systematic lifecycle, seamlessly transitioning from abstract mathematical formulation to physical hardware execution.",
              "[TABLE]:<table class=\"w-full text-sm border border-slate-300 rounded-xl my-6 shadow-xl shadow-purple-900/10 overflow-hidden\"><thead class=\"bg-gradient-to-r from-purple-700 to-blue-600 text-white\"><tr><th class=\"p-4 text-left font-bold tracking-wider\">Operational Phase</th><th class=\"p-4 text-left font-bold tracking-wider\">Computational Action</th></tr></thead><tbody class=\"divide-y divide-slate-200\"><tr class=\"hover:bg-purple-50 transition-colors\"><td class=\"p-4 font-bold text-purple-700\">Initialization</td><td class=\"p-4 text-slate-700\">Instantiation of discrete quantum and classical state registers</td></tr><tr class=\"hover:bg-blue-50 transition-colors\"><td class=\"p-4 font-bold text-blue-700\">Unitary Evolution</td><td class=\"p-4 text-slate-700\">Sequential application of unitary operators (e.g., Pauli-X, Hadamard, CNOT) to manipulate the state vector</td></tr><tr class=\"hover:bg-fuchsia-50 transition-colors\"><td class=\"p-4 font-bold text-fuchsia-700\">Measurement</td><td class=\"p-4 text-slate-700\">Projective measurement collapsing the quantum superposition into classical determinism</td></tr><tr class=\"hover:bg-purple-50 transition-colors\"><td class=\"p-4 font-bold text-purple-700\">Execution & Tomography</td><td class=\"p-4 text-slate-700\">Deployment to physical or simulated architectures, followed by statistical probability aggregation</td></tr></tbody></table>"
            ]
          },
          {
            title: "IBM Quantum Execution Options",
            body: [
              "Execution paradigms within the IBM Quantum ecosystem encompass two primary modalities. Classical Quantum Simulators offer deterministic emulation of the state vector and density matrix, primarily utilized for idealized algorithmic verification and noise-model benchmarking. Conversely, Real Quantum Hardware executes the compiled topological graph natively on physical quantum processing units (QPUs), subjecting the computation to inherent hardware infidelities, decoherence times (T1/T2), and systemic noise channels. The strategic deployment of cloud-based execution frameworks further optimizes these native operations, dynamically reducing circuit latency and effectively balancing qubit readout fidelity against environmental decoherence. [S3][S4]"
            ]
          },
          {
            title: "References",
            body: [
              "[S1] \"Foundations of Quantum Information Science\" — ScienceDirect. https://www.sciencedirect.com/science/chapter/bookseries/abs/pii/S0065245825000956",
              "[S2] \"Simulation Methodologies for Quantum States\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0045794926002130",
              "[S3] \"Architectural Paradigms in Quantum Computing\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S2773186326001465",
              "[S4] \"Cloud-Based Execution and Hardware Optimization on IBM Quantum\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0263224126012522"
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
          "[S1] \"Foundations of Quantum Information Science\" — ScienceDirect. https://www.sciencedirect.com/science/chapter/bookseries/abs/pii/S0065245825000956",
          "[S2] \"Simulation Methodologies for Quantum States\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0045794926002130",
          "[S3] \"Architectural Paradigms in Quantum Computing\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S2773186326001465",
          "[S4] \"Cloud-Based Execution and Hardware Optimization on IBM Quantum\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0263224126012522",
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
              "The ontological foundation of quantum information theory necessitates the precise mathematical description of isolated physical systems, formalized as quantum states. While classical deterministic systems traverse mutually exclusive binary states (0 or 1), a quantum bit (qubit) inhabits a continuous two-dimensional complex Hilbert space. This affords the formulation of coherent linear superpositions. An arbitrary pure single-qubit state is mathematically delineated as a state vector |ψ⟩ = α|0⟩ + β|1⟩, where α and β constitute complex probability amplitudes. According to the Born rule, the squared moduli of these amplitudes dictating projective measurement probabilities must strictly adhere to the normalization constraint: |α|² + |β|² = 1. [S1]"
            ]
          },
          {
            title: "Dirac (Bra-Ket) Notation",
            body: [
              "Quantum state vectors and density operators are conventionally expressed utilizing the Dirac bra-ket formalism, a mathematically rigorous notation for navigating complex vector spaces. Within this formalism, a 'ket' |ψ⟩ denotes a column vector residing in the primary Hilbert space, while a 'bra' ⟨ψ| represents its dual, the conjugate transpose row vector. This mathematical apparatus elegantly streamlines the computation of inner products (probability amplitudes) and outer products (density matrices). [S2]",
              "[TABLE]:<table class=\"w-full text-sm border border-slate-300 rounded-xl my-6 shadow-xl shadow-purple-900/10 overflow-hidden\"><thead class=\"bg-gradient-to-r from-purple-700 to-blue-600 text-white\"><tr><th class=\"p-4 text-left font-bold tracking-wider\">State Designation</th><th class=\"p-4 text-left font-bold tracking-wider\">Dirac Notation</th><th class=\"p-4 text-left font-bold tracking-wider\">Vector Representation</th></tr></thead><tbody class=\"divide-y divide-slate-200\"><tr class=\"hover:bg-purple-50 transition-colors\"><td class=\"p-4 font-bold text-purple-700\">Computational Basis Zero</td><td class=\"p-4 font-mono text-xs text-blue-700\">|0⟩</td><td class=\"p-4 text-slate-700\">[1, 0]^T</td></tr><tr class=\"hover:bg-blue-50 transition-colors\"><td class=\"p-4 font-bold text-blue-700\">Computational Basis One</td><td class=\"p-4 font-mono text-xs text-purple-700\">|1⟩</td><td class=\"p-4 text-slate-700\">[0, 1]^T</td></tr><tr class=\"hover:bg-fuchsia-50 transition-colors\"><td class=\"p-4 font-bold text-fuchsia-700\">Hadamard Plus State</td><td class=\"p-4 font-mono text-xs text-fuchsia-700\">|+⟩</td><td class=\"p-4 text-slate-700\">[1/√2, 1/√2]^T</td></tr></tbody></table>"
            ]
          },
          {
            title: "Quantum Gates and State Manipulation",
            body: [
              "In direct contrast to classical logic primitives, quantum state manipulation is achieved through the systematic application of unitary operators (quantum gates). These reversible transformations, such as the Hadamard (H), Pauli-X (X), and Pauli-Z (Z) matrices, deterministically rotate the state vector across the topological surface of the Bloch sphere. For instance, the application of the Hadamard operator onto a computational basis state instantiates a maximally symmetric coherent superposition, thereby generating an equiprobable measurement distribution indispensable for quantum parallelism. [S3]"
            ]
          },
          {
            title: "Exploring Quantum States with Qiskit",
            body: [
              "The algorithmic instantiation of these quantum phenomena is effectively modeled through advanced software developmental frameworks such as Qiskit. This programmatic architecture facilitates the precise initialization of quantum registers, the application of multi-qubit unitary operations, and the subsequent statistical tomography of the resultant state vectors. Furthermore, sophisticated submodules natively support the Density Matrix formalism (ρ = ∑ p_i |ψ_i⟩⟨ψ_i|), permitting the rigorous computational analysis of mixed states, quantum decoherence, and classical uncertainty propagation within open quantum systems. [S4]"
            ]
          },
          {
            title: "References",
            body: [
              "[S1] \"Mathematical Formalisms of Quantum States\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0375960125005973",
              "[S2] \"Geometric Representation and Bloch Sphere Dynamics\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S2211379725001081",
              "[S3] \"Multi-Qubit Superposition and Entanglement Architectures\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S2352152X25033092",
              "[S4] \"Density Matrix Formalism for Mixed Quantum States\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0030399226008820"
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
          "[S1] \"Mathematical Formalisms of Quantum States\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0375960125005973",
          "[S2] \"Geometric Representation and Bloch Sphere Dynamics\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S2211379725001081",
          "[S3] \"Multi-Qubit Superposition and Entanglement Architectures\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S2352152X25033092",
          "[S4] \"Density Matrix Formalism for Mixed Quantum States\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0030399226008820",
          "Nielsen, M.A. & Chuang, I.L. — Quantum Computation and Quantum Information",
          "Qiskit Textbook — Representing Qubit States: https://qiskit.org/textbook/ch-states/",
          "IBM Quantum Learning: https://learning.quantum-computing.ibm.com/"
        ]
      }
    }
  ]
};
