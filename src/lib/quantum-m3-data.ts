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
            title: "What Is the Pauli-X Gate?",
            body: [
              "The Pauli-X gate is the quantum world's version of a light switch — it flips a qubit from one state to the other:",
              "![Gate transformation animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781612931/Animation_showing_only_a_quant_plqpx5.mp4)",
              "• Classical computers have a NOT gate that flips 0 to 1 and 1 to 0",
              "• The X-gate does exactly the same job, but for qubits — written in code as `qc.x(0)`",
              "Geometrically, it performs a 180-degree spin of the qubit's state vector around the X-axis of the Bloch sphere — imagine grabbing a globe and flipping it from the North Pole straight down to the South Pole."
            ]
          },
          {
            title: "Reading the Flip in Code",
            body: [
              "In our `code` cell, the qubit starts at the North Pole — state |0⟩ — before anything happens:",
              "• `qc.x(0)` applies the gate, rotating the qubit to the South Pole, state |1⟩",
              "• `qc.measure(0, 0)` then locks in that result",
              "Running the circuit for `shots=10` and printing `counts` shows `{'1': 10}` every single time — 100% certainty, with zero randomness. That's the X-gate's signature: it doesn't create uncertainty, it just swaps one definite state for the other."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Execute the quantum simulator code.",
          "2. The code initializes a qubit in the |0⟩ state.",
          "3. An X-gate is applied (`qc.x(0)`).",
          "4. The qubit is measured, yielding '1' with 100% certainty."
        ],
        posttest: []
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
            title: "A Flip With a Twist",
            body: [
              "The Pauli-Y gate also flips the qubit's state, just like the X-gate — but it adds a secret ingredient along the way: a complex phase.",
              "![Phase change visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781612932/Animation_showing_only_a_Bloch_1_vjuoie.mp4)",
              "• Geometrically, it's a 180-degree rotation around the Y-axis of the Bloch sphere, instead of the X-axis",
              "Think of the X-gate as flipping a coin face-down to face-up, while the Y-gate flips it the same way but also gives it a quarter-turn spin in the air — same final 'side,' but with extra information tagging along."
            ]
          },
          {
            title: "Spotting the Imaginary Number in Code",
            body: [
              "This 'extra spin' shows up in code as the imaginary unit `i` (written as `j` in Python):",
              "• `qc.y(0)` applies the gate to a qubit starting in |0⟩",
              "• Using the `statevector_simulator` instead of a regular measurement lets us peek at the hidden amplitudes before collapse",
              "The printed result `[0.+0.j  0.+1.j]` is the qubit in state i|1⟩ — same measurement odds as the X-gate, but carrying a complex phase that becomes crucial later when gates start interfering with each other in bigger algorithms."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the simulator.",
          "2. The code uses a statevector simulator instead of a measurement simulator to observe the hidden complex amplitudes.",
          "3. Notice the output `[0.+0.j  0.+1.j]`, where `1.j` represents `i|1⟩`."
        ],
        posttest: []
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
            title: "The Gate That Changes Sign, Not Identity",
            body: [
              "The Pauli-Z gate is the odd one out — it doesn't flip |0⟩ to |1⟩ at all. Instead, it rotates the state vector 180 degrees around the Z-axis of the Bloch sphere, the same axis |0⟩ and |1⟩ already sit on:",
              "![State inversion animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781612932/Quantum_circuit_showing_superpos__202606161758_maymef.mp4)",
              "• Because |0⟩ and |1⟩ live directly on that axis, spinning around it leaves them looking unchanged in terms of measurement odds",
              "• This is why it's called a phase-flip gate, not a bit-flip gate"
            ]
          },
          {
            title: "Tracing Three Cases in Code",
            body: [
              "Our `code` cell tests the Z-gate on three different starting states to show what 'phase flip' really means:",
              "• `qc_0.z(0)` applied straight to |0⟩ — output stays `[1.+0.j  0.+0.j]`, completely unchanged",
              "• `qc_1.x(0)` then `qc_1.z(0)` — flips to |1⟩ first, then Z slaps a minus sign on it, giving `-|1⟩`",
              "• `qc_plus.h(0)` then `qc_plus.z(0)` — builds the |+⟩ superposition first, then Z flips the sign of just the second amplitude, transforming it into the |-⟩ state",
              "The lesson: Z is invisible on its own basis states, but it quietly rewires the relationship between amplitudes in a superposition — and that hidden sign change matters enormously once interference comes into play."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the simulator code analyzing the Z-gate on three different input states.",
          "2. Observe that applying it to |0⟩ does nothing.",
          "3. Observe that applying it to |1⟩ adds a negative sign.",
          "4. Observe that applying it to |+⟩ changes the sign of the second amplitude, creating |-⟩."
        ],
        posttest: []
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
            title: "Meet the Gate That Builds Superposition",
            body: [
              "If the Pauli gates are about flipping and twisting an already-definite state, the Hadamard (H) gate is about creating genuine uncertainty:",
              "![Superposition creation animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781612933/2-qubit_circuit_Bell_state_created_202606161756_bdx5av.mp4)",
              "• Applying `qc.h(0)` to a definite |0⟩ produces the |+⟩ state — an equal 50/50 superposition",
              "• Mathematically: H|0⟩ = 1/√2|0⟩ + 1/√2|1⟩",
              "Picture it like balancing a coin perfectly on its edge — give it the slightest push (the H-gate) and it becomes equally likely to land heads or tails."
            ]
          },
          {
            title: "Confirming the 50/50 Split With Real Numbers",
            body: [
              "In our `code` cell, the circuit applies `qc.h(0)` then measures `1024` times (`shots=1024`) to see the H-gate's signature in action:",
              "• The printed `counts` dictionary shows results close to `{'0': 518, '1': 506}` — almost exactly half and half",
              "• Applied instead to |1⟩, H produces the |-⟩ state: H|1⟩ = 1/√2|0⟩ - 1/√2|1⟩, with the same 50/50 odds but a flipped sign",
              "One neat trick: the H-gate is its own inverse — apply it a second time to |+⟩ and it snaps right back to the original definite state, no randomness involved."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Execute the simulator code.",
          "2. The code applies a single `qc.h(0)` operation.",
          "3. The measurement over 1024 shots proves the 50/50 probabilistic outcome.",
          "4. Note that if we didn't measure, the state would remain perfectly in superposition."
        ],
        posttest: []
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
            title: "Reading a Circuit Like a Sheet of Music",
            body: [
              "A quantum circuit diagram is just a timeline — read left to right — showing every gate a qubit passes through:",
              "• Each horizontal wire represents one qubit evolving over time, usually labeled `q_0`, `q_1`, and so on",
              "• Single-qubit gates like H, X, Y, Z appear as labeled boxes sitting directly on a wire",
              "In our `code` cell, `qc.h(0)` places an H box on wire `q_0`, and `qc.x(1)` places an X box on wire `q_1` — exactly where you'd expect from reading the diagram."
            ]
          },
          {
            title: "Spotting Multi-Qubit Gates and Measurement",
            body: [
              "Some gates touch more than one wire at once — these are multi-qubit gates, and they're where entanglement enters the picture:",
              "• `qc.cx(0, 1)` draws as a vertical line connecting `q_0` (a dot, the control) to `q_1` (a crossed circle, the target)",
              "• It flips the target qubit only if the control qubit is |1⟩ — a rule we'll dig into properly in Module 4",
              "Finally, `qc.measure([0, 1], [0, 1])` draws as meter icons pointing down into the double-line classical register at the bottom — the moment where quantum information becomes an ordinary readable bit."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the simulator code to generate an ASCII representation of a quantum circuit.",
          "2. Analyze the visual output: trace the path of `q_0` and `q_1` from left to right.",
          "3. Identify the H gate, the X gate, the CNOT (dot connected to a plus), and the Measurement blocks."
        ],
        posttest: []
      }
    }
  ]
};
