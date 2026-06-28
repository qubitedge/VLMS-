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
            title: "What Is Entanglement?",
            body: [
              "Entanglement is a purely quantum phenomenon where two particles become so deeply linked that you can no longer describe one without describing the other:",
              "• It's like two coins that are magically tied together — flip one and the other instantly matches it, no matter how far apart they are",
              "• Einstein called this 'spooky action at a distance' because measuring one entangled particle instantaneously determines the state of its partner",
              "In our `code` cell, this connection is built in exactly two lines: `qc.h(0)` puts qubit 0 into superposition, and `qc.cx(0, 1)` is the Controlled-NOT (CNOT) gate that links qubit 1's fate to qubit 0's."
            ]
          },
          {
            title: "Reading the Entangled Results",
            body: [
              "Once entangled, the two qubits behave as a single correlated unit rather than two independent ones:",
              "• `qc.measure([0,1], [0,1])` measures both qubits at once",
              "• Running this `shots=1000` times and checking `counts` shows only `'00'` and `'11'` ever appear — never `'01'` or `'10'`",
              "That's the proof: when qubit 0 collapses to 0, qubit 1 instantly collapses to 0 as well — and the same goes for 1. The correlation is perfect and instantaneous."
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
            title: "Meet the Four Bell States",
            body: [
              "If entanglement is a special handshake between two qubits, the Bell States are the four 'official' ways that handshake can happen:",
              "• They are the four maximally entangled states possible for a pair of qubits, also called EPR pairs",
              "• Together they form a complete basis — every possible two-qubit entangled state can be built from them",
              "In code, each state comes from the same basic recipe — `qc.h(0)` then `qc.cx(0,1)` — with small tweaks. Adding an `qc.x(0)` or `qc.x(1)` beforehand (an X gate, which flips a qubit) changes which Bell state you land on."
            ]
          },
          {
            title: "Mapping the Math to the Code",
            body: [
              "Each Bell state has its own formula, and each formula has a matching block in the `code` cell:",
              "• `qc1` (just H then CX) builds |Φ+⟩ = 1/√2(|00⟩ + |11⟩) — perfect positive correlation",
              "• `qc2` (X, then H, then CX) builds |Φ-⟩ = 1/√2(|00⟩ - |11⟩) — same correlation, flipped phase",
              "• `qc3` (H, then X on qubit 1, then CX) builds |Ψ+⟩ = 1/√2(|01⟩ + |10⟩) — perfect anti-correlation",
              "• `qc4` (X, H, X, then CX) builds |Ψ-⟩ = 1/√2(|01⟩ - |10⟩) — anti-correlation, flipped phase",
              "When you print `sv1.data`, `sv2.data`, etc., the `0.71` values you see are just 1/√2 rounded — the code output and the textbook formula are literally the same numbers."
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
            title: "Sending a Quantum State, Not Matter",
            body: [
              "Quantum teleportation sounds like science fiction, but it does something very specific: it moves a quantum state from one qubit to another without physically moving any particle:",
              "• Three qubits are involved: `q0` (Alice's payload — the state to send), `q1` (Alice's half of an entangled pair), and `q2` (Bob's half)",
              "In the `code` cell, `qc.x(0)` prepares a test state on q0, and `qc.h(1)` + `qc.cx(1, 2)` builds the entangled bridge between Alice and Bob before anything is sent."
            ]
          },
          {
            title: "The Handshake That Completes the Transfer",
            body: [
              "Teleportation finishes with a mix of quantum gates and an old-fashioned phone call:",
              "• `qc.cx(0, 1)` and `qc.h(0)` are Alice's joint operations on her two qubits",
              "• `qc.measure([0, 1], [0, 1])` collapses Alice's qubits — and destroys her original state in the process, which is exactly what the No-Cloning Theorem demands",
              "Bob then uses Alice's two classical bits as instructions: `qc.cx(1, 2)` and `qc.cz(0, 2)` are his correction gates. After that, measuring `q2` always gives `'1'` — proof that Alice's original state successfully reappeared on Bob's qubit."
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
            title: "Why You Can't Photocopy a Qubit",
            body: [
              "Copying a file on your computer is trivial — read the bits, write them somewhere else. Quantum states don't allow this trick at all:",
              "• The No-Cloning Theorem says it's physically impossible to create a perfect copy of an unknown quantum state",
              "• If you try to measure the state first to 'read' it, you immediately collapse it — destroying the very superposition you wanted to copy",
              "Our `code` cell proves this with algebra rather than a circuit — it walks through what a hypothetical cloning gate `U` would have to do."
            ]
          },
          {
            title: "Following the Proof Line by Line",
            body: [
              "The proof hinges on one key quantum rule: every physical operation must be linear.",
              "• The printed line `U(|psi> |0>) = |psi> |psi>` is the wishful definition of a cloning machine",
              "• Applying linearity to a superposition gives `a|00> + b|11>` — only the matching terms",
              "• But a genuine clone of `a|0> + b|1>` paired with itself expands to `a^2|00> + ab|01> + ab|10> + b^2|11>` — extra cross terms that the linear version can never produce",
              "Since those two expressions can never match for a general superposition, the conclusion printed at the end — that cloning is forbidden — falls directly out of the math, not just intuition."
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
            title: "Building an Unbreakable Key With Light",
            body: [
              "BB84 is the first quantum cryptography protocol, letting Alice and Bob agree on a secret key that's secure thanks to physics itself, not just clever math:",
              "• `alice_bits` are the random 0s and 1s Alice wants to eventually share as a key",
              "• `alice_bases` are her random choice of how to encode each bit — think of a basis as a 'style' of envelope she seals each bit in",
              "Bob doesn't know which envelope style Alice used for each bit, so `bob_bases` is his own independent random guess for each one."
            ]
          },
          {
            title: "Sifting Out the Secret Key",
            body: [
              "The magic of BB84 is what happens when Bob's guesses are checked against Alice's choices:",
              "• In the `for i in range(length)` loop, if `alice_bases[i] == bob_bases[i]`, Bob's measurement matches Alice's bit perfectly",
              "• If the bases don't match, `bob_bits.append(random.choice([0, 1]))` shows Bob just gets a random, useless result — the uncertainty principle in action",
              "Afterward, Alice and Bob publicly compare only their bases (never their bits) and keep just the positions where `alice_bases[i] == bob_bases[i]` — that's the `sifted_key`. Any eavesdropper trying to peek would disturb the photons and introduce errors Alice and Bob could easily catch, which is exactly why this key is provably secure."
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
