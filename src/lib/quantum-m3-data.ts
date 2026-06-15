import type { Week } from "./course-data";

export const quantumModule3: Week = {
  title: "Module 3",
  objective: "Quantum Gates and Circuits",
  tutorial: "Lab 3: Applying Logic Gates",
  labTitle: "Lab 3: Quantum Gates and Circuits",
  experiments: [
    {
      id: "qc-m3-1",
      title: "1. Pauli-X Gate",
      desc: "Simulate the quantum equivalent of the classical NOT gate.",
      code: `try:
    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import Aer
    
    # 1 qubit, 1 classical bit
    qc = QuantumCircuit(1, 1)
    
    print("Initial state is |0>.")
    
    # Apply Pauli-X Gate
    qc.x(0)
    print("Applied Pauli-X gate.")
    
    # Measure
    qc.measure(0, 0)
    
    simulator = Aer.get_backend('qasm_simulator')
    compiled_circuit = transpile(qc, simulator)
    job = simulator.run(compiled_circuit, shots=10)
    result = job.result()
    counts = result.get_counts()
    
    print("Measurement Results after X-gate:", counts)
    print("The X-gate flips |0> to |1> (and |1> to |0>), exactly like a classical NOT gate.")
except ImportError:
    print("Qiskit not installed. Simulating...")
    print("Initial state: |0>")
    print("Applied Pauli-X gate.")
    print("Measurement Results after X-gate: {'1': 10}")
    print("The X-gate flips |0> to |1>.")`,
      content: {
        aim: {
          text: "To understand and apply the Pauli-X gate, the quantum analog of the classical NOT gate, to flip a qubit's computational state.",
          bullets: []
        },
        theory: [
          {
            title: "The Pauli-X Gate",
            body: [
              "The Pauli-X gate is one of the fundamental single-qubit quantum logic gates. It is the quantum equivalent of the classical NOT gate.",
              "![Gate transformation animation](/videos/quantum_pauli_x.mp4)",
              "Mathematically, it performs a 180-degree (π radian) rotation of the qubit's state vector around the X-axis of the Bloch sphere.",
              "If the qubit is in state |0⟩ (pointing up at the North Pole), applying the X-gate rotates it to the South Pole, putting it in state |1⟩. Conversely, if applied to |1⟩, it flips the state back to |0⟩."
            ]
          }
        ],
        pretest: [
          { question: "What is the classical equivalent of the Pauli-X gate?", options: ["AND gate", "OR gate", "NOT gate", "XOR gate"], answerIndex: 2 },
          { question: "If you apply a Pauli-X gate to the |0⟩ state, what is the resulting state?", options: ["|0⟩", "|1⟩", "|+⟩", "|-⟩"], answerIndex: 1 },
          { question: "If you apply a Pauli-X gate to the |1⟩ state, what is the resulting state?", options: ["|0⟩", "|1⟩", "|+⟩", "|-⟩"], answerIndex: 0 },
          { question: "What geometric operation does the Pauli-X gate perform on the Bloch sphere?", options: ["180-degree rotation around the Z-axis", "180-degree rotation around the X-axis", "90-degree rotation around the Y-axis", "A mirror reflection across the equator"], answerIndex: 1 },
          { question: "If you apply the Pauli-X gate twice in a row (X followed by X) to the |0⟩ state, what is the final state?", options: ["|1⟩", "|0⟩", "|+⟩", "It destroys the qubit"], answerIndex: 1 }
        ],
        procedure: [
          "1. Execute the quantum simulator code.",
          "2. The code initializes a qubit in the |0⟩ state.",
          "3. An X-gate is applied (`qc.x(0)`).",
          "4. The qubit is measured, yielding '1' with 100% certainty."
        ],
        posttest: [
          { question: "What matrix represents the Pauli-X gate?", options: ["[[0, 1], [1, 0]]", "[[1, 0], [0, 1]]", "[[1, 0], [0, -1]]", "[[0, -i], [i, 0]]"], answerIndex: 0 },
          { question: "Does the Pauli-X gate change the probabilities of a qubit in the |+⟩ superposition state?", options: ["Yes, it flips it to |-⟩", "No, |+⟩ is an eigenstate of X and only its global phase changes", "Yes, it collapses it to |1⟩", "Yes, it collapses it to |0⟩"], answerIndex: 1 },
          { question: "In Qiskit, what is the command to apply an X-gate to the first qubit (qubit 0)?", options: ["qc.not(0)", "qc.pauli_x(0)", "qc.x(0)", "qc.flip(0)"], answerIndex: 2 },
          { question: "Applying an X-gate to α|0⟩ + β|1⟩ results in which state?", options: ["α|1⟩ + β|0⟩", "α|0⟩ - β|1⟩", "-α|0⟩ + β|1⟩", "0"], answerIndex: 0 },
          { question: "What is the Pauli-X gate also known as in quantum literature?", options: ["Phase-flip gate", "Bit-flip gate", "Hadamard gate", "Swap gate"], answerIndex: 1 }
        ]
      }
    },
    {
      id: "qc-m3-2",
      title: "2. Pauli-Y Gate",
      desc: "Simulate rotations around the Y-axis introducing complex phases.",
      code: `try:
    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import Aer
    import numpy as np
    
    qc = QuantumCircuit(1)
    
    print("Initial state is |0>.")
    
    # Apply Pauli-Y Gate
    qc.y(0)
    print("Applied Pauli-Y gate.")
    
    # We will use the statevector simulator to see the exact amplitudes including phase
    simulator = Aer.get_backend('statevector_simulator')
    compiled_circuit = transpile(qc, simulator)
    job = simulator.run(compiled_circuit)
    result = job.result()
    statevector = result.get_statevector()
    
    print("\\nFinal Statevector:")
    print(np.round(statevector.data, 3))
    print("Notice the 'i' (imaginary unit)! The Y-gate flips the bit AND introduces a relative complex phase (i|1>).")
except ImportError:
    print("Qiskit not installed. Simulating...")
    print("Initial state: |0>")
    print("Applied Pauli-Y gate.")
    print("Final Statevector: [0.+0.j 0.+1.j]")
    print("Notice the 'j' (Python's 'i')! The Y-gate maps |0> to i|1>.")`,
      content: {
        aim: {
          text: "To understand the Pauli-Y gate, which performs a bit-flip while simultaneously introducing a complex phase shift.",
          bullets: []
        },
        theory: [
          {
            title: "The Pauli-Y Gate",
            body: [
              "The Pauli-Y gate rotates the qubit's state vector by 180 degrees (π radians) around the Y-axis of the Bloch sphere.",
              "![Phase change visualization](/videos/quantum_pauli_y.mp4)",
              "Because it rotates through the complex Y-axis, it introduces an imaginary phase factor (i).",
              "When applied to |0⟩, it results in i|1⟩. When applied to |1⟩, it results in -i|0⟩.",
              "While the measurement probabilities (the absolute squares of the amplitudes) are identical to the X-gate when starting from |0⟩ or |1⟩, the complex phase is critical for interference effects in multi-gate algorithms."
            ]
          }
        ],
        pretest: [
          { question: "What geometric operation does the Pauli-Y gate perform?", options: ["180-degree rotation around the X-axis", "180-degree rotation around the Y-axis", "90-degree rotation around the Z-axis", "No rotation"], answerIndex: 1 },
          { question: "When the Y-gate is applied to the |0⟩ state, what is the resulting state?", options: ["|1⟩", "-|1⟩", "i|1⟩", "-i|0⟩"], answerIndex: 2 },
          { question: "What mathematical unit does the Y-gate introduce to the state amplitudes?", options: ["Pi (π)", "Euler's number (e)", "The imaginary unit (i)", "The golden ratio"], answerIndex: 2 },
          { question: "If you measure a qubit immediately after applying a Y-gate to a |0⟩ state, what will you observe?", options: ["Always 0", "Always 1", "50% 0, 50% 1", "The measurement will fail due to the imaginary number"], answerIndex: 1 },
          { question: "What happens if you apply a Y-gate twice (Y followed by Y)?", options: ["It returns the qubit to its original state", "It destroys the qubit", "It leaves it in |1⟩ forever", "It creates a superposition"], answerIndex: 0 }
        ],
        procedure: [
          "1. Run the simulator.",
          "2. The code uses a statevector simulator instead of a measurement simulator to observe the hidden complex amplitudes.",
          "3. Notice the output `[0.+0.j  0.+1.j]`, where `1.j` represents `i|1⟩`."
        ],
        posttest: [
          { question: "What matrix represents the Pauli-Y gate?", options: ["[[0, 1], [1, 0]]", "[[1, 0], [0, -1]]", "[[0, -i], [i, 0]]", "[[1, 1], [1, -1]]"], answerIndex: 2 },
          { question: "Why doesn't the 'i' phase affect the measurement outcome probability of seeing a '1'?", options: ["Because the simulator ignores imaginary numbers", "Because the Born rule takes the absolute square, and |i|^2 = 1", "Because measurement only occurs on the X axis", "Because the 'i' disappears randomly"], answerIndex: 1 },
          { question: "If a Y-gate is applied to |1⟩, what is the output?", options: ["i|0⟩", "-i|0⟩", "-|1⟩", "|0⟩"], answerIndex: 1 },
          { question: "In Qiskit, how do you apply a Y-gate to qubit 0?", options: ["qc.y(0)", "qc.pauli_y(0)", "qc.apply('Y', 0)", "qc.y_gate(0)"], answerIndex: 0 },
          { question: "The Pauli matrices (X, Y, Z) are all:", options: ["Unitary and Hermitian", "Only Unitary", "Only Hermitian", "Neither Unitary nor Hermitian"], answerIndex: 0 }
        ]
      }
    },
    {
      id: "qc-m3-3",
      title: "3. Pauli-Z Gate",
      desc: "Simulate the phase-flip gate.",
      code: `try:
    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import Aer
    import numpy as np
    
    # 1. Z-gate on |0>
    qc_0 = QuantumCircuit(1)
    qc_0.z(0)
    
    # 2. Z-gate on |1>
    qc_1 = QuantumCircuit(1)
    qc_1.x(0) # First set to |1>
    qc_1.z(0) # Then apply Z
    
    # 3. Z-gate on |+>
    qc_plus = QuantumCircuit(1)
    qc_plus.h(0) # First set to |+>
    qc_plus.z(0) # Then apply Z
    
    simulator = Aer.get_backend('statevector_simulator')
    
    print("Z-gate applied to |0>:", np.round(simulator.run(transpile(qc_0, simulator)).result().get_statevector().data, 3))
    print("  -> Result: |0> (No visible change)")
    
    print("Z-gate applied to |1>:", np.round(simulator.run(transpile(qc_1, simulator)).result().get_statevector().data, 3))
    print("  -> Result: -|1> (Phase flipped)")
    
    print("Z-gate applied to |+>:", np.round(simulator.run(transpile(qc_plus, simulator)).result().get_statevector().data, 3))
    print("  -> Result: |-State> (Phase flipped inside superposition)")
except ImportError:
    print("Qiskit not installed. Simulating...")
    print("Z-gate applied to |0>: [1.+0.j 0.+0.j]")
    print("  -> Result: |0> (No visible change)")
    print("Z-gate applied to |1>: [ 0.+0.j -1.+0.j]")
    print("  -> Result: -|1> (Phase flipped)")
    print("Z-gate applied to |+>: [ 0.707+0.j -0.707+0.j]")
    print("  -> Result: |-State> (Phase flipped inside superposition)")`,
      content: {
        aim: {
          text: "To understand the Pauli-Z gate, which flips the relative phase of a quantum state without changing the measurement probabilities in the standard basis.",
          bullets: []
        },
        theory: [
          {
            title: "The Pauli-Z Gate",
            body: [
              "The Pauli-Z gate rotates the state vector by 180 degrees (π radians) around the Z-axis of the Bloch sphere.",
              "![State inversion animation](/videos/quantum_pauli_z.mp4)",
              "Because the |0⟩ and |1⟩ states lie exactly ON the Z-axis, rotating around the Z-axis does not change the probability of measuring 0 or 1. This is why it's called a phase-flip gate rather than a bit-flip gate.",
              "Specifically, it leaves the |0⟩ state entirely unchanged. However, it multiplies the |1⟩ state by -1, changing it to -|1⟩.",
              "Its most noticeable effect is on superposition states that lie on the equator. If applied to the |+⟩ state (α=1/√2, β=1/√2), it flips the sign of β, resulting in the |-⟩ state (α=1/√2, β=-1/√2)."
            ]
          }
        ],
        pretest: [
          { question: "What is the Pauli-Z gate primarily known as?", options: ["The bit-flip gate", "The phase-flip gate", "The superposition gate", "The swap gate"], answerIndex: 1 },
          { question: "If you apply a Pauli-Z gate to the |0⟩ state, what happens?", options: ["It flips to |1⟩", "It becomes -|0⟩", "Nothing happens (it stays |0⟩)", "It goes into superposition"], answerIndex: 2 },
          { question: "If you apply a Pauli-Z gate to the |1⟩ state, what happens?", options: ["It becomes -|1⟩", "It flips to |0⟩", "Nothing happens", "It becomes i|1⟩"], answerIndex: 0 },
          { question: "What does the Pauli-Z gate do to the |+⟩ state?", options: ["Leaves it as |+⟩", "Changes it to |-⟩", "Collapses it to |0⟩", "Collapses it to |1⟩"], answerIndex: 1 },
          { question: "Does the Pauli-Z gate change the probability of measuring 0 or 1?", options: ["Yes, completely", "No, it only changes the phase, not the absolute magnitude", "Only if applied twice", "Only in the southern hemisphere of the Bloch sphere"], answerIndex: 1 }
        ],
        procedure: [
          "1. Run the simulator code analyzing the Z-gate on three different input states.",
          "2. Observe that applying it to |0⟩ does nothing.",
          "3. Observe that applying it to |1⟩ adds a negative sign.",
          "4. Observe that applying it to |+⟩ changes the sign of the second amplitude, creating |-⟩."
        ],
        posttest: [
          { question: "What matrix represents the Pauli-Z gate?", options: ["[[0, 1], [1, 0]]", "[[1, 0], [0, 1]]", "[[1, 0], [0, -1]]", "[[0, -i], [i, 0]]"], answerIndex: 2 },
          { question: "In Qiskit, how is the Z-gate applied to qubit 0?", options: ["qc.pauli_z(0)", "qc.z(0)", "qc.phase(0)", "qc.flip_z(0)"], answerIndex: 1 },
          { question: "If a state is α|0⟩ + β|1⟩, what is the state after a Z-gate?", options: ["β|0⟩ + α|1⟩", "α|0⟩ - β|1⟩", "-α|0⟩ + β|1⟩", "-α|0⟩ - β|1⟩"], answerIndex: 1 },
          { question: "If the Z-gate rotates around the Z-axis, what angle is the rotation?", options: ["90 degrees (π/2)", "180 degrees (π)", "360 degrees (2π)", "45 degrees (π/4)"], answerIndex: 1 },
          { question: "Why is the distinction between |+⟩ and |-⟩ important if they both have a 50% chance of being measured as 0 or 1?", options: ["It isn't important; they are physically identical", "The negative phase allows for destructive interference in subsequent quantum algorithm steps", "It prevents decoherence", "It doubles the speed of the processor"], answerIndex: 1 }
        ]
      }
    },
    {
      id: "qc-m3-4",
      title: "4. Hadamard Gate",
      desc: "Simulate the creation of quantum superposition.",
      code: `try:
    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import Aer
    from qiskit.visualization import plot_histogram
    import matplotlib.pyplot as plt
    
    # Create a circuit with 1 qubit
    qc = QuantumCircuit(1, 1)
    
    # Apply Hadamard to create superposition
    qc.h(0)
    
    # Measure
    qc.measure(0, 0)
    
    # Run simulation 1024 times
    simulator = Aer.get_backend('qasm_simulator')
    compiled_circuit = transpile(qc, simulator)
    job = simulator.run(compiled_circuit, shots=1024)
    result = job.result()
    counts = result.get_counts()
    
    print("We applied the H-gate to |0> and measured 1024 times.")
    print("Results:", counts)
    
    # Optional: Display a histogram if running locally
    # plot_histogram(counts)
    # plt.show()
except ImportError:
    print("Qiskit not installed. Simulating...")
    print("We applied the H-gate to |0> and measured 1024 times.")
    print("Results: {'0': 518, '1': 506}")
    print("Notice the almost perfect 50/50 distribution characteristic of the |+> state.")`,
      content: {
        aim: {
          text: "To master the Hadamard (H) gate, the fundamental operation used to put a computational basis state into an equal superposition.",
          bullets: []
        },
        theory: [
          {
            title: "The Hadamard Gate",
            body: [
              "The Hadamard (H) gate is arguably the most important gate in quantum algorithms. It is responsible for creating superposition.",
              "![Superposition creation animation](/videos/quantum_hadamard.mp4)",
              "When applied to the |0⟩ state, it creates the |+⟩ state: an equal superposition where the probability of measuring 0 or 1 is exactly 50%. Mathematically: H|0⟩ = 1/√2|0⟩ + 1/√2|1⟩.",
              "When applied to the |1⟩ state, it creates the |-⟩ state: H|1⟩ = 1/√2|0⟩ - 1/√2|1⟩. Note the negative phase on the |1⟩ component.",
              "The H-gate is its own inverse. Applying an H-gate to a state that is already in superposition (like |+⟩) will collapse it deterministically back into its original basis state (|0⟩)."
            ]
          }
        ],
        pretest: [
          { question: "What is the primary function of the Hadamard gate?", options: ["To measure the qubit", "To create a superposition from a basis state", "To copy a qubit", "To reset the qubit to |0⟩"], answerIndex: 1 },
          { question: "What state is produced by applying an H-gate to |0⟩?", options: ["|1⟩", "|-⟩", "|+⟩", "i|0⟩"], answerIndex: 2 },
          { question: "What state is produced by applying an H-gate to |1⟩?", options: ["|1⟩", "|-⟩", "|+⟩", "i|1⟩"], answerIndex: 1 },
          { question: "If you apply an H-gate to |0⟩, resulting in |+⟩, and then immediately apply another H-gate, what is the final state?", options: ["|+⟩", "|-⟩", "|1⟩", "|0⟩"], answerIndex: 3 },
          { question: "What is the probability of measuring 0 if a qubit is in the |+⟩ state?", options: ["0%", "50%", "100%", "75%"], answerIndex: 1 }
        ],
        procedure: [
          "1. Execute the simulator code.",
          "2. The code applies a single `qc.h(0)` operation.",
          "3. The measurement over 1024 shots proves the 50/50 probabilistic outcome.",
          "4. Note that if we didn't measure, the state would remain perfectly in superposition."
        ],
        posttest: [
          { question: "What geometric operation does the Hadamard gate perform on the Bloch sphere?", options: ["Rotation around Z", "Rotation around X", "A 180-degree rotation around the diagonal axis (X+Z)/√2", "No rotation"], answerIndex: 2 },
          { question: "Why is the negative sign in the |-⟩ state (created by H|1⟩) important?", options: ["It isn't; it's a mathematical artifact", "It allows for quantum interference, allowing probabilities to cancel out in complex algorithms", "It ensures the qubit stays cold", "It makes the qubit spin backwards"], answerIndex: 1 },
          { question: "What is the amplitude of the |0⟩ basis state in the |+⟩ superposition state?", options: ["1/2", "1/√2", "1", "0"], answerIndex: 1 },
          { question: "In Qiskit, how is the Hadamard gate applied to qubit 0?", options: ["qc.hadamard(0)", "qc.h(0)", "qc.superposition(0)", "qc.H(0)"], answerIndex: 1 },
          { question: "If you have 3 qubits all initially in |0⟩, and apply an H-gate to all 3, how many possible states are in the resulting superposition?", options: ["3", "6", "8 (2^3)", "9"], answerIndex: 2 }
        ]
      }
    },
    {
      id: "qc-m3-5",
      title: "5. Quantum Circuit Design",
      desc: "Combine multiple gates to create a cohesive quantum algorithm.",
      code: `try:
    from qiskit import QuantumCircuit
    
    # We will design a small 2-qubit circuit
    qc = QuantumCircuit(2, 2)
    
    # Apply H to qubit 0
    qc.h(0)
    
    # Apply X to qubit 1
    qc.x(1)
    
    # Apply a multi-qubit CNOT gate (Control=0, Target=1)
    # We will learn more about CNOT in Module 4, but it flips Target IF Control is 1.
    qc.cx(0, 1)
    
    # Measure both qubits
    qc.measure([0, 1], [0, 1])
    
    print("Circuit drawn in ASCII:\\n")
    print(qc.draw(output='text'))
    
    print("\\nReading a circuit:")
    print("- Wires (horizontal lines) represent qubits over time (left to right).")
    print("- Boxes (H, X) represent single-qubit gates applied at that moment.")
    print("- Vertical lines with dots and crosses represent multi-qubit gates (like CNOT).")
    print("- Meter symbols represent measurement, writing to classical bits (bottom double line).")
except ImportError:
    print("Qiskit not installed. Simulating text output...")
    print("Circuit drawn in ASCII:\\n")
    print("     ┌───┐          ┌─┐   ")
    print("q_0: ┤ H ├──■───────┤M├───")
    print("     ├───┤┌─┴─┐┌─┐  └╥┘   ")
    print("q_1: ┤ X ├┤ X ├┤M├───╫────")
    print("     └───┘└───┘└╥┘   ║    ")
    print("c: 2/═══════════╩════╩════")
    print("                1    0    ")`,
      content: {
        aim: {
          text: "To understand how to read, design, and interpret a quantum circuit diagram containing multiple sequential gates.",
          bullets: []
        },
        theory: [
          {
            title: "Quantum Circuit Architecture",
            body: [
              "Quantum circuits are the standard visual language for describing quantum algorithms.",
              "![Circuit execution visualization](/videos/quantum_circuit_design.mp4)",
              "Each horizontal line represents a qubit evolving over time, flowing from left to right. The top wire is usually labeled q_0, the next q_1, and so on.",
              "A double line at the bottom represents the classical register, where measurement results are stored as standard bits.",
              "Gates are placed on the wires. Single-qubit gates (like H, X, Y, Z) appear as boxes on a single wire. Multi-qubit gates (like CNOT) span across multiple wires, indicating interaction or entanglement.",
              "The final step in most circuits is a measurement gate, represented by a meter icon, pointing down to the classical register."
            ]
          }
        ],
        pretest: [
          { question: "In a standard quantum circuit diagram, what does a horizontal line represent?", options: ["A classical wire", "A timeline for a single qubit", "A timeline for the whole computer", "A power cable"], answerIndex: 1 },
          { question: "How is time represented in a quantum circuit?", options: ["Right to left", "Top to bottom", "Left to right", "Bottom to top"], answerIndex: 2 },
          { question: "What does a double horizontal line usually represent?", options: ["Two entangled qubits", "A classical register (storing bits)", "A high-power qubit", "An error boundary"], answerIndex: 1 },
          { question: "What does a box with an 'H' in it placed on a wire mean?", options: ["Measure the qubit", "Apply a Hadamard gate to that qubit at that moment in time", "Halt the program", "Hide the qubit"], answerIndex: 1 },
          { question: "If a gate spans vertically across two wires, what kind of gate is it?", options: ["A measurement gate", "A single-qubit gate acting twice", "A multi-qubit (interacting/entangling) gate", "An error"], answerIndex: 2 }
        ],
        procedure: [
          "1. Run the simulator code to generate an ASCII representation of a quantum circuit.",
          "2. Analyze the visual output: trace the path of `q_0` and `q_1` from left to right.",
          "3. Identify the H gate, the X gate, the CNOT (dot connected to a plus), and the Measurement blocks."
        ],
        posttest: [
          { question: "If an H gate is to the left of an X gate on the same wire, which is applied first in time?", options: ["The X gate", "The H gate", "They are applied simultaneously", "It depends on the compiler"], answerIndex: 1 },
          { question: "What does the 'M' box or meter icon signify at the end of a qubit wire?", options: ["Multiply", "Move", "Measure (collapse to classical bit)", "Modify"], answerIndex: 2 },
          { question: "Why do we need a classical register (the double lines at the bottom)?", options: ["To power the quantum chip", "To store the 0s and 1s extracted from measuring the qubits so classical code can read them", "To serve as a backup if the quantum computer crashes", "To perform classical arithmetic"], answerIndex: 1 },
          { question: "In the ASCII circuit output, what does the dot (■) on q_0 connected to the circle-cross (⊕) on q_1 represent?", options: ["A Swap gate", "A Controlled-NOT (CNOT) gate", "Two independent X gates", "A measurement"], answerIndex: 1 },
          { question: "Can a single qubit wire branch or split into two wires in a valid quantum circuit?", options: ["Yes", "No, due to the No-Cloning theorem", "Only if it is in superposition", "Only inside a loop"], answerIndex: 1 }
        ]
      }
    }
  ]
};
