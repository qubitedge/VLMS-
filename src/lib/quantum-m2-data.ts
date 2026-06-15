import type { Week } from "./course-data";

export const quantumModule2: Week = {
  title: "Module 2",
  objective: "Qubits and Quantum Information",
  tutorial: "Lab 2: Working with Qubits",
  labTitle: "Lab 2: Qubits and Quantum Information",
  experiments: [
    {
      id: "qc-m2-1",
      title: "1. Classical Bits vs Qubits",
      desc: "Compare the deterministic nature of classical bits with the probabilistic nature of qubits.",
      code: `try:
    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import Aer
    
    print("--- Classical Bit Simulation ---")
    print("Bit starts at 0. Applying a NOT operation...")
    classical_bit = 0
    classical_bit = 1 - classical_bit # NOT operation
    print(f"Classical Bit Value: {classical_bit} (Always exactly 1)")
    
    print("\\n--- Qubit Simulation ---")
    print("Qubit starts at |0>. Applying a 'half-NOT' (Hadamard) operation...")
    qc = QuantumCircuit(1, 1)
    qc.h(0) # Put into superposition
    qc.measure(0, 0)
    
    simulator = Aer.get_backend('qasm_simulator')
    compiled_circuit = transpile(qc, simulator)
    job = simulator.run(compiled_circuit, shots=10)
    result = job.result()
    counts = result.get_counts(qc)
    
    print("Running the exact same quantum operation 10 times:")
    print(f"Results: {counts}")
    print("Notice the probabilistic nature: you get a mix of 0s and 1s from the exact same initial state!")
except ImportError:
    print("Qiskit not found. Simulating...")
    print("--- Classical Bit Simulation ---")
    print("Bit Value: 1 (Always exactly 1)")
    print("\\n--- Qubit Simulation ---")
    print("Results: {'0': 5, '1': 5}")
    print("Notice the probabilistic nature!")`,
      content: {
        aim: {
          text: "To clearly differentiate between the strict binary behavior of classical bits and the probabilistic superposition of quantum bits (qubits).",
          bullets: []
        },
        theory: [
          {
            title: "Classical Bits vs Qubits",
            body: [
              "A classical bit is the fundamental unit of information in classical computing. It can hold only one of two values: 0 or 1. Every operation on a classical bit is deterministic.",
              "![Comparison animation](/videos/quantum_bit_vs_qubit.mp4)",
              "A quantum bit, or qubit, is the basic unit of quantum information. Thanks to superposition, a qubit can be in state |0⟩, state |1⟩, or any linear combination of the two.",
              "While a classical system with N bits can represent exactly one of 2^N possible states at any given time, a quantum system with N qubits can represent a superposition of all 2^N states simultaneously."
            ]
          }
        ],
        pretest: [
          { question: "What values can a single classical bit hold?", options: ["Only 0", "Only 1", "Either 0 or 1, but not both", "Both 0 and 1 simultaneously"], answerIndex: 2 },
          { question: "What allows a qubit to hold a combination of 0 and 1?", options: ["Entanglement", "Superposition", "Decoherence", "Interference"], answerIndex: 1 },
          { question: "How many states can 3 classical bits represent at ONE specific moment?", options: ["1", "3", "8", "16"], answerIndex: 0 },
          { question: "How many states can 3 qubits represent SIMULTANEOUSLY?", options: ["1", "3", "8", "16"], answerIndex: 2 },
          { question: "Which notation is used to represent the computational basis states of a qubit?", options: ["Binary notation (0, 1)", "Dirac bracket notation (|0⟩, |1⟩)", "Hexadecimal notation", "ASCII notation"], answerIndex: 1 }
        ],
        procedure: [
          "1. Run the comparison script.",
          "2. Observe that a classical 'NOT' operation yields exactly the expected result 100% of the time.",
          "3. Observe that a quantum 'Hadamard' operation creates a probabilistic output over multiple identical runs."
        ],
        posttest: [
          { question: "Why do we run quantum circuits multiple times (shots) in simulations?", options: ["Because quantum computers are slow", "To build up a statistical probability distribution of the outcomes", "To prevent the computer from crashing", "To heat up the qubits"], answerIndex: 1 },
          { question: "Are quantum operations deterministic before measurement?", options: ["Yes, the evolution of the state vector is completely deterministic", "No, everything is completely random", "Only if there are more than 10 qubits", "Only in classical simulators"], answerIndex: 0 },
          { question: "Which physical system is often used to build physical qubits?", options: ["Copper wires", "Superconducting loops", "Standard silicon transistors", "Vacuum tubes"], answerIndex: 1 },
          { question: "If you measure a qubit, what type of information do you extract?", options: ["A complex number", "A wave function", "Classical information (0 or 1)", "An entanglement pattern"], answerIndex: 2 },
          { question: "What is the primary advantage of processing 2^N states simultaneously?", options: ["Exponential parallelism for specific types of algorithms", "It uses less electricity", "It prevents hackers from reading the screen", "It makes the computer run strictly faster for all tasks like word processing"], answerIndex: 0 }
        ]
      }
    },
    {
      id: "qc-m2-2",
      title: "2. Bloch Sphere",
      desc: "Visualize single qubit states geometrically.",
      code: `try:
    from qiskit.visualization import plot_bloch_vector
    import matplotlib.pyplot as plt
    import numpy as np
    
    print("The Bloch Sphere is a 3D geometric representation of a qubit.")
    print("North Pole (Z-axis) = |0>")
    print("South Pole (-Z-axis) = |1>")
    print("Equator (X/Y-axis) = Equal superpositions")
    
    # Coordinate array: [x, y, z]
    # Let's point the vector at the North Pole (|0>)
    vector = [0, 0, 1]
    
    fig = plot_bloch_vector(vector, title='Qubit in State |0>')
    plt.show()
    
    print("Run this code locally with Qiskit to see the 3D plot!")
except ImportError:
    print("Qiskit not installed. Simulating Bloch sphere logic...")
    print("State |0>: [x=0, y=0, z=1] (North Pole)")
    print("State |1>: [x=0, y=0, z=-1] (South Pole)")
    print("State |+>: [x=1, y=0, z=0] (Equator, X-axis)")`,
      content: {
        aim: {
          text: "To understand the geometric representation of a single qubit's state using the Bloch Sphere.",
          bullets: []
        },
        theory: [
          {
            title: "The Bloch Sphere",
            body: [
              "Because a single qubit state requires complex numbers to describe, it can be mathematically mapped to the surface of a 3-dimensional sphere of radius 1, known as the Bloch Sphere.",
              "![3D Bloch Sphere](/videos/quantum_bloch_sphere.mp4)",
              "The North Pole represents the classical state |0⟩, and the South Pole represents the classical state |1⟩.",
              "Points on the surface of the sphere between the poles represent quantum superpositions. The equator represents states with exactly 50/50 probability, such as |+⟩ and |-⟩.",
              "Quantum logic gates can be visualized as rotations of the state vector around the X, Y, or Z axes of this sphere."
            ]
          }
        ],
        pretest: [
          { question: "What does the Bloch Sphere represent?", options: ["The orbit of an electron", "The state space of a single qubit", "The physical shape of a quantum computer", "A black hole's event horizon"], answerIndex: 1 },
          { question: "Where is the |0⟩ state located on the Bloch sphere?", options: ["The equator", "The South Pole", "The North Pole", "Inside the sphere"], answerIndex: 2 },
          { question: "Where is the |1⟩ state located?", options: ["The equator", "The South Pole", "The North Pole", "Outside the sphere"], answerIndex: 1 },
          { question: "What do points on the equator of the Bloch sphere represent?", options: ["Errors in computation", "Equal superpositions of |0⟩ and |1⟩", "Classical states", "Decohered qubits"], answerIndex: 1 },
          { question: "Can the Bloch sphere perfectly represent the state of multiple entangled qubits?", options: ["Yes", "No, it is only for single unentangled qubits", "Only if it is a 4D sphere", "Yes, by adding more arrows"], answerIndex: 1 }
        ],
        procedure: [
          "1. Execute the simulator code.",
          "2. Review the X, Y, and Z coordinate mappings for common quantum states.",
          "3. Understand how |0⟩ maps to [0,0,1] and |1⟩ maps to [0,0,-1]."
        ],
        posttest: [
          { question: "If a quantum gate rotates the state vector 180 degrees around the X-axis starting from the North Pole, where does it end up?", options: ["North Pole", "Equator", "South Pole", "It disappears"], answerIndex: 2 },
          { question: "What happens to the vector's length on the Bloch sphere if the qubit loses coherence (decoherence) to the environment?", options: ["It shrinks inside the sphere", "It grows outside the sphere", "It stays exactly the same", "It spins infinitely"], answerIndex: 0 },
          { question: "Which angle represents the phase between the |0⟩ and |1⟩ amplitudes?", options: ["The angle theta from the Z-axis", "The angle phi around the XY equator plane", "The radius r", "The speed of rotation"], answerIndex: 1 },
          { question: "A pure quantum state always lies where on the Bloch sphere?", options: ["Exactly at the origin", "On the surface of the sphere", "Somewhere deep inside the sphere", "Only at the poles"], answerIndex: 1 },
          { question: "Applying a Z-gate to the |+⟩ state moves the vector from the +X axis to the:", options: ["+Y axis", "-Y axis", "-X axis", "-Z axis"], answerIndex: 2 }
        ]
      }
    },
    {
      id: "qc-m2-3",
      title: "3. Qubit Initialization",
      desc: "Learn how quantum circuits initialize states to a baseline.",
      code: `try:
    from qiskit import QuantumCircuit
    
    # 3-Qubit circuit
    qc = QuantumCircuit(3)
    
    print("By default, all qubits in Qiskit are initialized to |0>.")
    print("Initial State representation: |000>")
    
    # Let's manually initialize a specific state: |101>
    # Qiskit orders bits from right-to-left (q2 q1 q0)
    qc.initialize('101', qc.qubits)
    
    print("State manually initialized to |101> using qc.initialize().")
    print(qc.draw(output='text'))
except ImportError:
    print("Qiskit not installed. Simulating...")
    print("By default, all qubits are initialized to |0>.")
    print("Initial State representation: |000>")
    print("State manually initialized to |101>.")`,
      content: {
        aim: {
          text: "To understand the necessity of setting a known baseline state before quantum computation begins.",
          bullets: []
        },
        theory: [
          {
            title: "Initialization and Reset",
            body: [
              "Before a quantum algorithm can run, the computer must be initialized to a known, well-defined baseline state. In almost all quantum computing frameworks, this default starting state is the ground state: |0⟩ for every qubit.",
              "![Initialization animation](/videos/quantum_initialization.mp4)",
              "If the qubits start in a random, noisy, or entangled state from a previous calculation, the results of the current algorithm will be corrupted.",
              "Physically, initializing a qubit to |0⟩ involves actively cooling the system down to its lowest energy state or performing a rapid measurement and conditional reset to force it into |0⟩."
            ]
          }
        ],
        pretest: [
          { question: "What is the standard default initialization state for qubits in most frameworks?", options: ["|1⟩", "|0⟩", "|+⟩", "Random"], answerIndex: 1 },
          { question: "Why is initialization critical?", options: ["To heat up the processor", "To ensure the algorithm starts from a known baseline, preventing corrupted results", "To entangle the qubits", "To generate random numbers"], answerIndex: 1 },
          { question: "How is a multiple qubit system initialized by default?", options: ["|111...1⟩", "|000...0⟩", "An equal superposition of all states", "It depends on the time of day"], answerIndex: 1 },
          { question: "What physical concept generally corresponds to the |0⟩ state in hardware?", options: ["The highest energy state", "The ground (lowest) energy state", "Maximum temperature", "Maximum momentum"], answerIndex: 1 },
          { question: "Can you initialize a qubit directly into the |1⟩ state in software?", options: ["Yes, using specific initialization commands or applying an X-gate immediately", "No, it is physically impossible", "Only on classical computers", "Only if you measure it first"], answerIndex: 0 }
        ],
        procedure: [
          "1. Run the initialization simulator script.",
          "2. Note that the default state is |000⟩.",
          "3. Observe how a custom string like '101' can be used to set a specific classical baseline."
        ],
        posttest: [
          { question: "In Qiskit, how are multi-qubit states ordered in string representation?", options: ["Left to right (q0 q1 q2)", "Right to left (q2 q1 q0)", "Randomly", "Top to bottom"], answerIndex: 1 },
          { question: "What gate would you apply to a |0⟩ initialized qubit to immediately change its baseline to |1⟩?", options: ["H-gate", "Z-gate", "X-gate", "Y-gate"], answerIndex: 2 },
          { question: "If a circuit has 5 qubits, what is the default tensor product state?", options: ["|00000⟩", "|11111⟩", "|0⟩", "5|0⟩"], answerIndex: 0 },
          { question: "What is the process of forcing a qubit to |0⟩ mid-circuit called?", options: ["Superposition", "Reset operation", "Entanglement", "Teleportation"], answerIndex: 1 },
          { question: "Why is physical initialization difficult in real hardware?", options: ["It requires heating the system", "It requires extreme cooling and isolating the system from thermal noise to reach the true ground state", "Code compilers don't support it", "Because 0 is not a valid quantum state"], answerIndex: 1 }
        ]
      }
    },
    {
      id: "qc-m2-4",
      title: "4. Quantum State Representation",
      desc: "Mathematical representation using Dirac Bra-Ket notation.",
      code: `import numpy as np

# Ket notation representation of |0> and |1>
ket_0 = np.array([[1], [0]])
ket_1 = np.array([[0], [1]])

print("Ket |0> Column Vector:\\n", ket_0)
print("\\nKet |1> Column Vector:\\n", ket_1)

# Bra notation (complex conjugate transpose of Ket)
bra_0 = ket_0.T
bra_1 = ket_1.T

print("\\nBra <0| Row Vector:\\n", bra_0)
print("\\nBra <1| Row Vector:\\n", bra_1)

# Inner product <0|0> should be 1 (normalized)
inner_prod = np.dot(bra_0, ket_0)
print("\\nInner Product <0|0> (Should be 1):", inner_prod[0][0])

# Orthogonality <0|1> should be 0
ortho_prod = np.dot(bra_0, ket_1)
print("Inner Product <0|1> (Should be 0 - Orthogonal):", ortho_prod[0][0])`,
      content: {
        aim: {
          text: "To understand Dirac's bra-ket notation and basic linear algebra vector representations of quantum states.",
          bullets: []
        },
        theory: [
          {
            title: "Bra-Ket Notation",
            body: [
              "Invented by Paul Dirac, bra-ket notation is the standard mathematical language of quantum mechanics.",
              "![State representation visualizer](/videos/quantum_braket.mp4)",
              "A 'ket' written as |ψ⟩ represents a column vector describing a quantum state.",
              "A 'bra' written as ⟨ψ| represents a row vector, specifically the complex conjugate transpose of the ket.",
              "Putting them together forms a 'bra-ket' ⟨φ|ψ⟩, which calculates the inner product (dot product) of the two vectors. This inner product tells us how much the state |ψ⟩ overlaps with the state |φ⟩."
            ]
          }
        ],
        pretest: [
          { question: "What does a ket |ψ⟩ represent mathematically?", options: ["A scalar", "A row vector", "A column vector", "A matrix"], answerIndex: 2 },
          { question: "What does a bra ⟨ψ| represent mathematically?", options: ["The complex conjugate transpose (row vector) of the ket", "The inverse matrix", "A column vector", "A real number"], answerIndex: 0 },
          { question: "Who invented bra-ket notation?", options: ["Albert Einstein", "Paul Dirac", "Richard Feynman", "Niels Bohr"], answerIndex: 1 },
          { question: "What mathematical operation does ⟨φ|ψ⟩ represent?", options: ["Outer product", "Inner product (dot product)", "Cross product", "Tensor product"], answerIndex: 1 },
          { question: "What is the column vector representation of the standard |0⟩ state?", options: ["[1, 0]^T", "[0, 1]^T", "[1, 1]^T", "[0, 0]^T"], answerIndex: 0 }
        ],
        procedure: [
          "1. Run the Python linear algebra script.",
          "2. Review how kets are represented as 2x1 arrays and bras as 1x2 arrays.",
          "3. Notice that the inner product of orthogonal states like <0|1> evaluates to exactly 0."
        ],
        posttest: [
          { question: "If the inner product ⟨ψ|φ⟩ equals 0, what does it mean about the two states?", options: ["They are identical", "They are orthogonal (mutually exclusive)", "They are entangled", "They are in superposition"], answerIndex: 1 },
          { question: "What is the result of ⟨0|0⟩?", options: ["0", "1", "-1", "Infinity"], answerIndex: 1 },
          { question: "What does the outer product |ψ⟩⟨φ| produce?", options: ["A scalar number", "A matrix (operator)", "A smaller vector", "Zero"], answerIndex: 1 },
          { question: "How is the |1⟩ state represented as a column vector?", options: ["[1, 0]^T", "[0, 1]^T", "[1, -1]^T", "[0.5, 0.5]^T"], answerIndex: 1 },
          { question: "If a state vector is normalized, its inner product with itself (⟨ψ|ψ⟩) must equal:", options: ["0", "1", "0.5", "2"], answerIndex: 1 }
        ]
      }
    },
    {
      id: "qc-m2-5",
      title: "5. Qubit Measurement Calculations",
      desc: "Calculate measurement probabilities manually using amplitudes.",
      code: `import numpy as np

# Let's calculate probabilities for a custom superposition
# |psi> = sqrt(3)/2 |0> + 1/2 |1>

amplitude_0 = np.sqrt(3)/2
amplitude_1 = 1/2

prob_0 = np.abs(amplitude_0)**2
prob_1 = np.abs(amplitude_1)**2

print(f"State: {amplitude_0:.3f}|0> + {amplitude_1:.3f}|1>")
print(f"Probability of measuring |0>: {prob_0 * 100:.1f}%")
print(f"Probability of measuring |1>: {prob_1 * 100:.1f}%")

total = prob_0 + prob_1
print(f"Total Probability: {total * 100:.1f}%")`,
      content: {
        aim: {
          text: "To manually calculate and verify the probabilities of quantum measurement outcomes from raw state amplitudes.",
          bullets: []
        },
        theory: [
          {
            title: "Calculating Probabilities",
            body: [
              "The state of a qubit is |ψ⟩ = α|0⟩ + β|1⟩.",
              "![Measurement visualization](/videos/quantum_measurement_calc.mp4)",
              "To find the probability of the qubit collapsing into the |0⟩ state upon measurement in the standard Z-basis, we take the absolute square of α, denoted as |α|².",
              "To find the probability of collapsing into the |1⟩ state, we calculate |β|².",
              "If the amplitudes are complex numbers (e.g., α = a + bi), the absolute square is calculated by multiplying the number by its complex conjugate: |α|² = α * α* = a² + b²."
            ]
          }
        ],
        pretest: [
          { question: "What mathematical operation do you perform on an amplitude to find its measurement probability?", options: ["Square root", "Absolute square", "Logarithm", "Divide by 2"], answerIndex: 1 },
          { question: "If α = 1/√2, what is the probability of measuring 0?", options: ["1/√2", "1/4", "1/2", "1"], answerIndex: 2 },
          { question: "If β = i (the imaginary unit), what is the probability of measuring 1?", options: ["-1", "i", "1", "0"], answerIndex: 2 },
          { question: "What must the sum of the probabilities of all possible outcomes equal?", options: ["0", "0.5", "1", "100"], answerIndex: 2 },
          { question: "Does the phase (e.g., a negative sign or an 'i') on an amplitude affect the probability of measuring that specific basis state?", options: ["Yes, significantly", "No, taking the absolute square removes global phase effects on probability", "Only if it is a negative sign", "Only if the state is |1⟩"], answerIndex: 1 }
        ],
        procedure: [
          "1. Observe the Python calculation script.",
          "2. We provide the amplitude √3/2 for |0⟩ and 1/2 for |1⟩.",
          "3. The script calculates the absolute squares, resulting in 75% and 25% probabilities."
        ],
        posttest: [
          { question: "For the state |ψ⟩ = √0.9|0⟩ - √0.1|1⟩, what is the probability of measuring 1?", options: ["0.9", "0.1", "-0.1", "0.8"], answerIndex: 1 },
          { question: "For the state |ψ⟩ = (1/2)|0⟩ + (i√3/2)|1⟩, what is the probability of measuring 0?", options: ["1/4 (25%)", "3/4 (75%)", "1/2 (50%)", "0"], answerIndex: 0 },
          { question: "For the same state, what is the probability of measuring 1?", options: ["1/4 (25%)", "3/4 (75%)", "1/2 (50%)", "0"], answerIndex: 1 },
          { question: "What happens to the global phase (like an overall negative sign multiplying the entire state) during measurement probability calculation?", options: ["It reverses the probabilities", "It cancels out and has no observable effect", "It makes the probability negative", "It creates an error"], answerIndex: 1 },
          { question: "If a state is perfectly centered on the equator of the Bloch sphere, what are its measurement probabilities in the Z-basis?", options: ["100% for |0⟩", "100% for |1⟩", "50% for |0⟩ and 50% for |1⟩", "0% for both"], answerIndex: 2 }
        ]
      }
    }
  ]
};
