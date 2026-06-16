import type { Week } from "./course-data";

export const quantumModule4: Week = {
  title: "Module 4",
  objective: "Entanglement and Quantum Communication",
  tutorial: "Lab 4: Entangling Qubits",
  labTitle: "Lab 4: Entanglement and Communication",
  experiments: [
    {
      id: "qc-m4-1",
      title: "1. Quantum Entanglement",
      desc: "Simulate the mysterious connection between two qubits.",
      code: `try:
    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import Aer
    
    qc = QuantumCircuit(2, 2)
    
    # Put qubit 0 in superposition
    qc.h(0)
    
    # Entangle qubit 1 with qubit 0 using a CNOT gate
    qc.cx(0, 1)
    
    # Measure both
    qc.measure([0,1], [0,1])
    
    simulator = Aer.get_backend('qasm_simulator')
    compiled_circuit = transpile(qc, simulator)
    job = simulator.run(compiled_circuit, shots=1000)
    result = job.result()
    counts = result.get_counts(qc)
    
    print("Measurement results of the Entangled Pair (1000 shots):")
    print(counts)
    print("Notice that we ONLY measure '00' or '11'. We NEVER measure '01' or '10'.")
    print("When qubit 0 collapses to '0', qubit 1 instantaneously collapses to '0'.")
    print("When qubit 0 collapses to '1', qubit 1 instantaneously collapses to '1'.")
except ImportError:
    print("Qiskit not installed. Simulating output...")
    print("Measurement results of the Entangled Pair (1000 shots):")
    print("{'00': 503, '11': 497}")
    print("Notice that we ONLY measure '00' or '11'.")`,
      content: {
        aim: {
          text: "To create and observe quantum entanglement, demonstrating how the measurement of one particle instantaneously determines the state of another.",
          bullets: []
        },
        theory: [
          {
            title: "Quantum Entanglement",
            body: [
              "Entanglement is a purely quantum phenomenon where two or more particles become intrinsically linked, such that the state of one cannot be described independently of the state of the other.",
              "![Entanglement animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781614030/Entangled_pair_measurement_corre__202606161811_psr9zf.mp4)",
              "Einstein famously referred to it as 'spooky action at a distance' because measuring one entangled particle instantaneously determines the state of its partner, even if they are light-years apart.",
              "The most common way to entangle two qubits is to place the first qubit in a superposition using a Hadamard (H) gate, and then use a Controlled-NOT (CNOT) gate to link the second qubit to the first.",
              "In a perfectly entangled |Φ+⟩ state, if you measure the first qubit and get a 0, the second qubit is guaranteed to be 0. If you get a 1, the second is guaranteed to be 1."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the quantum circuit simulator.",
          "2. Observe the creation of the entangled state using an H gate followed by a CX (CNOT) gate.",
          "3. Look at the measurement results across 1000 iterations.",
          "4. Confirm that the only outcomes are '00' and '11', proving their correlated collapse."
        ],
        posttest: []
      }
    },
    {
      id: "qc-m4-2",
      title: "2. Bell States",
      desc: "Generate the four maximally entangled 2-qubit states.",
      code: `try:
    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import Aer
    from qiskit.quantum_info import Statevector
    import numpy as np

    print("Generating the 4 Bell States:")
    
    # 1. Phi+ (|00> + |11>)
    qc1 = QuantumCircuit(2)
    qc1.h(0); qc1.cx(0,1)
    sv1 = Statevector.from_instruction(qc1)
    print("1. Phi+ :", np.round(sv1.data, 2))
    
    # 2. Phi- (|00> - |11>)
    qc2 = QuantumCircuit(2)
    qc2.x(0); qc2.h(0); qc2.cx(0,1)
    sv2 = Statevector.from_instruction(qc2)
    print("2. Phi- :", np.round(sv2.data, 2))
    
    # 3. Psi+ (|01> + |10>)
    qc3 = QuantumCircuit(2)
    qc3.h(0); qc3.x(1); qc3.cx(0,1)
    sv3 = Statevector.from_instruction(qc3)
    print("3. Psi+ :", np.round(sv3.data, 2))
    
    # 4. Psi- (|01> - |10>)
    qc4 = QuantumCircuit(2)
    qc4.x(0); qc4.h(0); qc4.x(1); qc4.cx(0,1)
    sv4 = Statevector.from_instruction(qc4)
    print("4. Psi- :", np.round(sv4.data, 2))
except ImportError:
    print("Qiskit not installed. Simulating Statevector output...")
    print("1. Phi+ : [ 0.71  0.    0.    0.71]")
    print("2. Phi- : [ 0.71  0.    0.   -0.71]")
    print("3. Psi+ : [ 0.    0.71  0.71  0.  ]")
    print("4. Psi- : [ 0.    0.71 -0.71  0.  ]")`,
      content: {
        aim: {
          text: "To construct and analyze the four Bell States, the foundation of all bipartite maximally entangled systems.",
          bullets: []
        },
        theory: [
          {
            title: "The Four Bell States",
            body: [
              "There are four specific, maximally entangled quantum states of two qubits, collectively known as the Bell States (or EPR pairs).",
              "![Bell State visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781614030/Bell_state_diagram_quantum_circuit_202606161814_r8iuu6.mp4)",
              "They form a complete orthonormal basis for the 4-dimensional state space of two qubits.",
              "The states are:\n1. |Φ+⟩ = 1/√2(|00⟩ + |11⟩) -> Perfect positive correlation.\n2. |Φ-⟩ = 1/√2(|00⟩ - |11⟩) -> Perfect positive correlation with a phase shift.\n3. |Ψ+⟩ = 1/√2(|01⟩ + |10⟩) -> Perfect anti-correlation.\n4. |Ψ-⟩ = 1/√2(|01⟩ - |10⟩) -> Perfect anti-correlation with a phase shift.",
              "These specific states are used in quantum teleportation, superdense coding, and quantum cryptography."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the Python generation script.",
          "2. Observe how applying initial X gates (bit flips) to the control or target qubits before the H-CNOT sequence generates the different Bell states.",
          "3. Notice the statevector arrays mapping to the math formulas (0.71 is approx 1/√2)."
        ],
        posttest: []
      }
    },
    {
      id: "qc-m4-3",
      title: "3. Quantum Teleportation",
      desc: "Simulate transferring quantum state information across distances.",
      code: `try:
    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import Aer
    from qiskit.visualization import plot_histogram
    
    # 3 Qubits, 3 Classical bits
    # q0: Alice's state to teleport, q1: Alice's half of EPR pair, q2: Bob's half
    qc = QuantumCircuit(3, 3)
    
    # Step 1: Create an arbitrary state to teleport on q0 (e.g., apply X)
    qc.x(0) 
    qc.barrier()
    
    # Step 2: Create entangled Bell pair between Alice (q1) and Bob (q2)
    qc.h(1)
    qc.cx(1, 2)
    qc.barrier()
    
    # Step 3: Alice performs operations on her qubits (q0, q1)
    qc.cx(0, 1)
    qc.h(0)
    qc.barrier()
    
    # Step 4: Alice measures her qubits and sends classical bits to Bob
    qc.measure([0, 1], [0, 1])
    qc.barrier()
    
    # Step 5: Bob applies gates based on Alice's classical bits to recover the state
    # If q1 measured 1, apply X
    qc.cx(1, 2)
    # If q0 measured 1, apply Z
    qc.cz(0, 2)
    
    # Measure Bob's qubit to verify teleportation (Should be 1 because we applied X initially)
    qc.measure(2, 2)
    
    simulator = Aer.get_backend('qasm_simulator')
    compiled_circuit = transpile(qc, simulator)
    job = simulator.run(compiled_circuit, shots=1000)
    result = job.result()
    
    print("Teleportation circuit executed!")
    print("Bob's measurement is the first bit in the output string (c2).")
    print("Results:", result.get_counts())
    print("Notice that Bob ALWAYS measures '1', proving the state of q0 was teleported to q2!")
except ImportError:
    print("Qiskit not installed. Simulating output...")
    print("Results: {'100': 254, '101': 246, '110': 250, '111': 250}")
    print("Notice that Bob (the leftmost bit) ALWAYS measures '1', proving teleportation worked!")`,
      content: {
        aim: {
          text: "To implement the Quantum Teleportation protocol, transferring an unknown quantum state from one qubit to another using entanglement and classical communication.",
          bullets: []
        },
        theory: [
          {
            title: "Quantum Teleportation",
            body: [
              "Quantum teleportation allows the exact transfer of quantum information (a state vector) from one location to another. It does not transport physical matter.",
              "![Teleportation animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781614030/Quantum_state_transfer_animation_202606161816_vn6tse.mp4)",
              "It requires three qubits: the qubit to be teleported (Alice's payload), and a pre-shared entangled pair (one with Alice, one with Bob).",
              "Alice performs a joint measurement on her payload qubit and her half of the entangled pair, which collapses their states and destroys the original payload (satisfying the No-Cloning Theorem).",
              "She then calls Bob on a classical telephone to tell him her two measurement results (00, 01, 10, or 11).",
              "Based on those two classical bits, Bob applies specific correction gates (X and/or Z) to his half of the entangled pair. After correction, Bob's qubit is in the exact identical state as Alice's original payload."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Study the teleportation circuit architecture.",
          "2. Note the initial preparation: we put the payload qubit into state |1⟩ as a test.",
          "3. Run the simulator.",
          "4. Look at the measurement results. The leftmost bit represents Bob's qubit. It should always be 1, regardless of what Alice measured (the rightmost two bits), proving the state successfully hopped from q0 to q2."
        ],
        posttest: []
      }
    },
    {
      id: "qc-m4-4",
      title: "4. No-Cloning Theorem",
      desc: "Understand why copying quantum data is physically impossible.",
      code: `print("--- The No-Cloning Theorem ---")
print("Theorem: It is impossible to create an identical copy of an arbitrary unknown quantum state.")
print("\\nWhy?")
print("1. Quantum mechanics is linear. Matrix operations must be linear.")
print("2. A hypothetical 'cloning' matrix U would have to do this:")
print("   U(|psi> |0>) = |psi> |psi>")
print("3. If we try this on a superposition state |psi> = a|0> + b|1>:")
print("   Linearity dictates: U((a|0> + b|1>) |0>) = a U(|0>|0>) + b U(|1>|0>)")
print("   Which equals: a|00> + b|11>")
print("4. BUT, a true clone of |psi> would be:")
print("   (a|0> + b|1>) ⊗ (a|0> + b|1>) = a^2|00> + ab|01> + ab|10> + b^2|11>")
print("\\nConclusion: a|00> + b|11> ≠ a^2|00> + ab|01> + ab|10> + b^2|11>")
print("Therefore, the linear laws of quantum mechanics forbid cloning!")`,
      content: {
        aim: {
          text: "To mathematically and conceptually prove the No-Cloning Theorem, a foundational limitation of quantum mechanics.",
          bullets: []
        },
        theory: [
          {
            title: "The No-Cloning Theorem",
            body: [
              "In classical computing, copying data is trivial. You just read the bits and write them somewhere else.",
              "![Communication flow animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781614282/Network_diagram_quantum_communic__202606161820_f0w1ez.mp4)",
              "In quantum computing, it is strictly physically impossible to make a perfect copy of an unknown quantum state. This is known as the No-Cloning Theorem.",
              "If you try to measure the state to copy it, you collapse it, destroying the original superposition.",
              "If you try to use a physical quantum gate (which must be a linear matrix) to clone it, the mathematics of linearity fail to replicate the cross-terms of a superposition, as shown in the simulator output.",
              "This theorem is the fundamental reason why quantum teleportation destroys the original state, and why quantum cryptography is so secure."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Read the mathematical proof output generated by the simulator script.",
          "2. Note step 3, which shows the result of applying a linear operator to a superposition.",
          "3. Note step 4, which shows the algebraic expansion of a true cloned state.",
          "4. Understand that because the results of step 3 and step 4 do not match, a universal cloning gate cannot exist."
        ],
        posttest: []
      }
    },
    {
      id: "qc-m4-5",
      title: "5. Quantum Cryptography Basics (BB84)",
      desc: "Simulate the BB84 Quantum Key Distribution protocol.",
      code: `import random

print("--- BB84 Quantum Key Distribution Simulator ---")
length = 10

# 1. Alice generates random bits and random encoding bases (0=Rectilinear/Z, 1=Diagonal/X)
alice_bits = [random.choice([0, 1]) for _ in range(length)]
alice_bases = [random.choice([0, 1]) for _ in range(length)]

# 2. Bob randomly chooses bases to measure the incoming photons
bob_bases = [random.choice([0, 1]) for _ in range(length)]
bob_bits = []

# 3. Measurement simulation
for i in range(length):
    if alice_bases[i] == bob_bases[i]:
        # Bob chose the correct basis, measures Alice's bit perfectly
        bob_bits.append(alice_bits[i])
    else:
        # Bob chose the wrong basis, measures a completely random bit
        bob_bits.append(random.choice([0, 1]))

# 4. Sifting: They publicly compare bases and discard mismatches
sifted_key = []
for i in range(length):
    if alice_bases[i] == bob_bases[i]:
        sifted_key.append(alice_bits[i])

print(f"Alice's Bits:   {alice_bits}")
print(f"Alice's Bases:  {alice_bases}")
print(f"Bob's Bases:    {bob_bases}")
print(f"Bob's Bits:     {bob_bits}")
print(f"\\nMatching Bases? {[a==b for a,b in zip(alice_bases, bob_bases)]}")
print(f"Final Secure Sifted Key: {sifted_key}")
print(f"Generated a {len(sifted_key)}-bit perfectly secure cryptographic key!")`,
      content: {
        aim: {
          text: "To simulate and understand the BB84 protocol, demonstrating how quantum mechanics enables unconditionally secure key distribution.",
          bullets: []
        },
        theory: [
          {
            title: "BB84 Quantum Key Distribution",
            body: [
              "Proposed by Bennett and Brassard in 1984, BB84 is the first quantum cryptography protocol. It provides a way for two parties (Alice and Bob) to securely share a cryptographic key.",
              "![BB84 visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781614117/Alice_sends_qubits_to_Bob_202606161818_zpo3uv.mp4)",
              "Alice sends a stream of photons to Bob. She randomly encodes each photon's bit (0 or 1) into one of two bases (e.g., standard horizontal/vertical, or diagonal +45/-45 degrees).",
              "Bob doesn't know which basis Alice used, so he guesses randomly for each photon.",
              "If Bob guesses correctly, he reads the exact bit Alice sent. If he guesses wrong, he gets a random result due to the uncertainty principle.",
              "Later, they publicly call each other and compare ONLY the bases they used (not the bits). They keep the bits where their bases matched, forming a shared, secure key.",
              "If an eavesdropper (Eve) intercepts the photons, she must also guess bases. Because of the No-Cloning theorem and wave collapse, her incorrect guesses will irreversibly corrupt the photons, creating a high error rate that Alice and Bob can easily detect."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the Python simulator for the BB84 protocol.",
          "2. Review the arrays generated for Alice's Bits, Alice's Bases, and Bob's Bases.",
          "3. Notice how the 'Matching Bases' array dictates which bits are kept.",
          "4. See the final Sifted Key, which is a perfectly shared secret string of bits."
        ],
        posttest: []
      }
    }
  ]
};
