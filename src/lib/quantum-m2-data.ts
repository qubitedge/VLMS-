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
            title: "The Same Question, Two Very Different Answers",
            body: [
              "A classical bit is the stubborn, predictable cousin in this story. It can only ever be 0 or 1, and flipping it always gives the exact same answer:",
              "![Comparison animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781609635/Classical_bit_vs_qubit_comparison_202606161541_ro45og.mp4)",
              "• In our `code` cell, `classical_bit = 0` then `classical_bit = 1 - classical_bit` is a NOT operation — run it a million times, you get `1` every single time, no surprises",
              "A qubit is the unpredictable cousin. It doesn't just store 0 or 1 — it can hold a blend of both, called superposition."
            ]
          },
          {
            title: "Same Starting Point, Same Operation — Different Results Every Time",
            body: [
              "This is the part that breaks people's brains the first time they see it: the exact same qubit, given the exact same instruction, doesn't always give the same answer.",
              "• `qc.h(0)` applies a Hadamard gate — the 'half-NOT' that pushes a qubit from a definite |0⟩ into a 50/50 superposition",
              "• `qc.measure(0, 0)` then forces a collapse into either 0 or 1",
              "• Running `simulator.run(compiled_circuit, shots=10)` fires this exact same circuit 10 separate times",
              "The printed `counts` dictionary — something like `{'0': 5, '1': 5}` — is the smoking-gun evidence: ten identical setups, yet a genuine mix of outcomes. And it scales: while N classical bits can only ever represent one of 2^N states at a time, N qubits in superposition can represent all 2^N states simultaneously."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the comparison script.",
          "2. Observe that a classical 'NOT' operation yields exactly the expected result 100% of the time.",
          "3. Observe that a quantum 'Hadamard' operation creates a probabilistic output over multiple identical runs."
        ],
        posttest: []
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
            title: "Turning an Invisible State Into Something You Can See",
            body: [
              "A qubit's state involves complex numbers, which is hard to picture directly. So physicists found a clever trick: map every possible qubit state onto the surface of a globe — the Bloch Sphere.",
              "![3D Bloch Sphere](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781609632/Bloch_Sphere_quantum_computing_s__202606161545_ncozjn.mp4)",
              "• North Pole = the classical state |0⟩",
              "• South Pole = the classical state |1⟩",
              "In our `code` cell, `vector = [0, 0, 1]` is exactly the North Pole — the point on the sphere representing a qubit sitting purely in |0⟩. That's why `plot_bloch_vector(vector, title='Qubit in State |0>')` draws the arrow pointing straight up."
            ]
          },
          {
            title: "The Equator, and Why Gates Are Just Rotations",
            body: [
              "Anywhere between the poles represents a superposition — and the equator is special:",
              "• Points on the equator, like |+⟩ at `[x=1, y=0, z=0]`, represent perfect 50/50 superpositions",
              "• Compare this to |0⟩'s `[x=0, y=0, z=1]` and |1⟩'s `[x=0, y=0, z=-1]` — same sphere, totally different latitude",
              "This geometric picture pays off beautifully: every quantum logic gate (like the Hadamard from Experiment 1) can be visualized as simply rotating this arrow around the X, Y, or Z axis. A gate isn't some abstract operation — it's a spin of the globe."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Execute the simulator code.",
          "2. Review the X, Y, and Z coordinate mappings for common quantum states.",
          "3. Understand how |0⟩ maps to [0,0,1] and |1⟩ maps to [0,0,-1]."
        ],
        posttest: []
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
            title: "You Can't Build on a Messy Foundation",
            body: [
              "Imagine starting a math problem on a whiteboard that still has leftover scribbles from someone else's homework. You'd get the wrong answer before you even begin. Quantum computers have the exact same problem — and they solve it the same way: wipe the board clean first.",
              "![Initialization animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781609633/Qubit_initialization_in_quantum___202606161549_tukldx.mp4)",
              "• By default, every qubit in our framework starts at the ground state |0⟩",
              "• In our `code` cell, a fresh `qc = QuantumCircuit(3)` automatically begins life as the state |000⟩ — no extra code needed",
              "If qubits were left in a random or leftover entangled state from a previous calculation, every result that follows would be corrupted."
            ]
          },
          {
            title: "Telling the Qubits Exactly Where to Start",
            body: [
              "Sometimes you don't want the default |000⟩ — you want a specific custom starting point. That's what `qc.initialize('101', qc.qubits)` does in our `code` cell: it manually forces the three qubits into the state |101⟩ instead of the default.",
              "Physically, this 'reset to zero' isn't just bookkeeping — it means actively cooling the qubit to its lowest energy state, or rapidly measuring it and conditionally flipping it back to |0⟩ if needed. Either way, the goal is the same: guarantee a known, trustworthy baseline before the real computation begins."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the initialization simulator script.",
          "2. Note that the default state is |000⟩.",
          "3. Observe how a custom string like '101' can be used to set a specific classical baseline."
        ],
        posttest: []
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
            title: "Kets — Writing Quantum States as Columns",
            body: [
              "Paul Dirac gave physicists a clean shorthand for quantum states, and our code uses it directly:",
              "![State representation visualizer](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781609633/Quantum_state_representation_vis__202606161552_f0enlh.mp4)",
              "• `ket_0 = np.array([[1], [0]])` is the column vector for |0⟩",
              "• `ket_1 = np.array([[0], [1]])` is the column vector for |1⟩",
              "Whenever you see a state written as |something⟩, picture exactly this — a column vector, just like the ones printed by our `code` cell."
            ]
          },
          {
            title: "Bras, and the Inner Product That Reveals Overlap",
            body: [
              "Flip a ket on its side (transpose it) and you get its 'bra' — written ⟨something|. In our `code` cell, `bra_0 = ket_0.T` does exactly this flip.",
              "• Multiplying a bra by a ket, like `np.dot(bra_0, ket_0)`, gives the inner product ⟨0|0⟩",
              "• This number tells you how much one state overlaps with another",
              "Two outcomes prove the rule: `inner_prod` for ⟨0|0⟩ comes out to exactly 1 (a state always fully overlaps with itself), while `ortho_prod` for ⟨0|1⟩ comes out to exactly 0 — these states are orthogonal, meaning completely distinguishable from one another, like North and East pointing in totally different directions."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the Python linear algebra script.",
          "2. Review how kets are represented as 2x1 arrays and bras as 1x2 arrays.",
          "3. Notice that the inner product of orthogonal states like <0|1> evaluates to exactly 0."
        ],
        posttest: []
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
            title: "Amplitudes Are Not Probabilities — Yet",
            body: [
              "It's tempting to think the numbers in front of |0⟩ and |1⟉ are probabilities directly, but they're not — they're amplitudes, and you need one extra step to turn them into real percentages.",
              "![Measurement visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781609633/Quantum_processor_in_refrigerator_202606161559_sfajbj.mp4)",
              "• In our `code` cell, `amplitude_0 = np.sqrt(3)/2` and `amplitude_1 = 1/2` describe the state |ψ⟩ = (√3/2)|0⟩ + (1/2)|1⟩",
              "Notice these numbers themselves don't look like '75%' or '25%' — that conversion is the whole point of this experiment."
            ]
          },
          {
            title: "Squaring Your Way to a Real Percentage",
            body: [
              "The rule is simple: square the amplitude to get the actual probability. In our `code` cell, this is exactly what happens:",
              "• `prob_0 = np.abs(amplitude_0)**2` takes √3/2 and squares it to get 0.75 — a 75% chance of measuring |0⟩",
              "• `prob_1 = np.abs(amplitude_1)**2` takes 1/2 and squares it to get 0.25 — a 25% chance of measuring |1⟩",
              "And just like every experiment before this one, the `total` printed at the end checks out to exactly 100% — proof the state was valid all along. If the amplitudes had been complex numbers instead of plain real numbers, the same idea still works: multiply by the complex conjugate (α × α*) to get the same kind of guaranteed-real, guaranteed-positive probability."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Observe the Python calculation script.",
          "2. We provide the amplitude √3/2 for |0⟩ and 1/2 for |1⟩.",
          "3. The script calculates the absolute squares, resulting in 75% and 25% probabilities."
        ],
        posttest: []
      }
    }
  ]
};
