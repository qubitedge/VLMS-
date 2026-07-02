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
            title: "Quantum Gates as the Building Blocks of Quantum Circuits",
            body: [
              "Quantum gates are basic quantum circuits that act on a small number of qubits and serve as the fundamental building blocks of larger quantum circuits, playing the same structural role that classical logic gates play in digital circuits. [S1]",
              "A quantum gate is implemented as a unitary reversible operator U that converts an initial qubit state into a final qubit state while guaranteeing no loss of quantum information, in contrast to irreversible classical operations. [S2]",
              "Some quantum gates act on a single qubit, while others act on two or more qubits at once; multi-qubit gates are essential because the size of the quantum state vector grows exponentially with the number of qubits, and this growth is what allows quantum algorithms to outperform classical ones on certain tasks. [S2]"
            ]
          },
          {
            title: "Structure of Single-Qubit Gates",
            body: [
              "Every single-qubit gate is a unitary matrix with three real degrees of freedom, and if finite precision is acceptable, the complete set of such gates can be approximated arbitrarily well using a small, well-chosen set of elementary gates. [S1]",
              "A single-qubit gate is represented as a 2×2 matrix that maps the basis states |0⟩ and |1⟩ to new combinations of |0⟩ and |1⟩, and a table of the standard single-qubit gates — Pauli-X, Pauli-Y, Pauli-Z, Hadamard, and the phase-shift (T) gate — along with their matrices and physical descriptions is compiled from prior literature. [S2]",
              "Among these, the Pauli-X gate maps |0⟩ to |1⟩ and |1⟩ to |0⟩, making it the direct quantum equivalent of the classical NOT gate. [S2]"
            ]
          },
          {
            title: "The Phase Gate",
            body: [
              "The phase gate P(θ) has no classical logic-gate equivalent; it leaves |0⟩ unchanged but shifts the relative phase of |1⟩ by an angle θ, with θ typically taken to be an irrational multiple of π. [S1]",
              "Equivalently, the phase-shift gate leaves the basis state |0⟩ unaltered while mapping |1⟩ to e^(iφ)|1⟩, introducing a phase factor without changing the measurement probabilities of the state. [S2]"
            ]
          },
          {
            title: "The Hadamard Gate and Universal Gate Sets",
            body: [
              "The Hadamard gate is one of the two basis single-qubit gates (alongside the phase gate) chosen to build a universal gate set, and it creates a superposition of the basis states — for example, mapping |1⟩ to an equal-weight superposition of |1⟩ and |0⟩. [S1]",
              "It has been shown that the CNOT gate, combined with a Hadamard gate and a phase gate, together form a universal set sufficient to generate any transformation needed to implement a general-purpose quantum computer. [S1]",
              "The Hadamard gate is described as creating superposition by mapping |0⟩ to an equal superposition of |0⟩ and |1⟩, and |1⟩ to an equal superposition of |0⟩ and −|1⟩, which is why it is one of the most widely used quantum gates in practice. [S2]"
            ]
          },
          {
            title: "References",
            body: [
          "[S1] \"Quantum Gate\" — ScienceDirect Topics (drawing on F. Alexander Bais & J. Doyne Farmer, \"The Physics of Information,\" in Philosophy of Information, 2008). https://www.sciencedirect.com/topics/engineering/quantum-gate — see Figure 8 (single-qubit gate action diagram) and Figure 9 (CNOT circuit diagram) in the source chapter.",
          "[S2] \"Qubit Gate\" — ScienceDirect Topics (drawing on Olatunji et al., \"Quantum computing in renewable energy exploration,\" in Design, Analysis, and Applications of Renewable Energy Systems, 2021). https://www.sciencedirect.com/topics/engineering/qubit-gate — see Figure 22.3 (Bloch sphere) and Table 22.1 (gate symbols/matrices) in the source chapter."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Create a circuit applying S gate after Hadamard and observe the phase change in the statevector.",
          "Apply the T gate similarly and compare the phase with the S gate result.",
          "Implement the universal U(θ, φ, λ) gate with specific parameters and verify the resulting state.",
          "Demonstrate that S = U(0, 0, π/2) and T = U(0, 0, π/4) by comparing statevectors.",
          "Experiment with different U gate parameters to understand how θ, φ, and λ each affect the qubit state.",
          "Build a circuit using only U gates that reproduces the behavior of H → S → T."
        ],
        posttest: [],
        references: [
          "[S1] \"Quantum Gate\" — ScienceDirect Topics (drawing on F. Alexander Bais & J. Doyne Farmer, \"The Physics of Information,\" in Philosophy of Information, 2008). https://www.sciencedirect.com/topics/engineering/quantum-gate — see Figure 8 (single-qubit gate action diagram) and Figure 9 (CNOT circuit diagram) in the source chapter.",
          "[S2] \"Qubit Gate\" — ScienceDirect Topics (drawing on Olatunji et al., \"Quantum computing in renewable energy exploration,\" in Design, Analysis, and Applications of Renewable Energy Systems, 2021). https://www.sciencedirect.com/topics/engineering/qubit-gate — see Figure 22.3 (Bloch sphere) and Table 22.1 (gate symbols/matrices) in the source chapter."
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
            title: "The Born Rule: Formal Statement",
            body: [
              "For a system in state |ψ⟩ and an observable A with an orthonormal eigenbasis {|a1⟩,...,|an⟩}, associate each eigenvector |ai⟩ with a projector Pi and eigenvalue λi; the Born rule states that the probability of a measurement of A returning the value λi is |⟨ai|ψ⟩|², which is equivalent to writing the same probability as the expectation value ⟨ψ|Pi|ψ⟩ of the corresponding projector. [S1]",
              "This matches the more general measurement postulate: an exact measurement of an observable always yields one of its eigenvalues as a result, and if the system was in state |α⟩ beforehand, the probability that the outcome is eigenvalue a(i) is given by |⟨a(i)|α⟩|² — since some eigenvalue must always occur, these probabilities across all possible outcomes must sum to exactly 1. [S2]",
              "The rule is illustrated concretely by the measurement of a single qubit in the state |ψ⟩ = α0|0⟩ + α1|1⟩ using a one-qubit measurement gate in the computational basis: the instrument reports 0, corresponding to |0⟩, with probability p0 = |α0|², and reports 1, corresponding to |1⟩, with probability p1 = |α1|² — precisely the calculation your lab performs using Ry(θ). [S1]"
            ]
          },
          {
            title: "Quantum Registers and the Generalized Born Rule",
            body: [
              "For a register of n qubits, if only the first qubit is measured, the n-qubit state can be written as a superposition of two branches — one pairing the first qubit's |0⟩ outcome with a corresponding state of the remaining n − 1 qubits, and the other pairing the |1⟩ outcome with a different corresponding state of those same remaining qubits. [S1]",
              "This is the generalized Born rule: if the measured qubit collapses to |0⟩, the untouched n − 1 qubits are left in the specific state associated with that branch; if it collapses to |1⟩, they are left in the other branch's state instead — the same logic extends to measuring the first k qubits of an n-qubit register, where an outcome x = r leaves the remaining n − k qubits in the state tied to branch r. [S1]",
              "This generalized rule is what underlies partial measurement of a multi-qubit register in practice: for example, in the Bernstein–Vazirani oracle circuit, measuring only the output register of a multi-qubit computation leaves the input register collapsed into a superposition tied to the specific outcome observed on the measured qubits, rather than destroying the whole register's information at once. [S4]"
            ]
          },
          {
            title: "Why the Born Rule Holds: The Gleason Theorem",
            body: [
              "A measurement changes the density operator describing a quantum system: the post-measurement state carries new probabilities and differs from the state that existed immediately before the measurement was performed. [S3]",
              "The Gleason theorem shows that the ensemble average of a repeatedly measured observable A equals the trace of the product of the measurement operator and the system's density operator, tr(Aρ) — a result that can be derived directly from the completeness relation satisfied by any orthonormal eigenbasis. [S3]",
              "This theorem provides the deeper justification for the Born rule: rather than treating the probability formula as an arbitrary postulate, Gleason's result shows that this exact probability rule follows naturally from the structure of the lattice of subspaces of a real or complex Hilbert space, given only a few basic consistency requirements on how probabilities are assigned to measurement outcomes. [S3]"
            ]
          },
          {
            title: "References",
            body: [
              "[S1] \"Measurements and Quantum Information,\" Section 2.5 (Born Rule) — Dan C. Marinescu & Gabriela M. Marinescu, in Classical and Quantum Information, 2012. ScienceDirect Topics: https://www.sciencedirect.com/topics/mathematics/born-rule — see Figure 2.6(a) for the single-qubit measurement-gate diagram and Figure 2.6(b) for the register-measurement diagram.",
              "[S2] \"Quantum Mechanics Fundamentals,\" Section 2.6.1 (Projective Measurements) — Ivan B. Djordjevic, in Quantum Information Processing, Quantum Computing, and Quantum Error Correction, 2nd Ed., 2021. ScienceDirect Topics: https://www.sciencedirect.com/topics/mathematics/born-rule — see Figure 2.1 for the selective-measurement (filtration) diagram.",
              "[S3] \"Measurements and Quantum Information,\" Section 2.10 (Gleason Theorem) — Dan C. Marinescu & Gabriela M. Marinescu, in Classical and Quantum Information, 2012. ScienceDirect Topics: https://www.sciencedirect.com/topics/mathematics/born-rule",
              "[S4] \"Preliminaries\" — Dan C. Marinescu & Gabriela M. Marinescu, in Classical and Quantum Information, 2012. ScienceDirect Topics: https://www.sciencedirect.com/topics/mathematics/born-rule — see Figure 1.22 for the Simon-oracle circuit that applies the extended/generalized Born rule to a multi-qubit register."
            ]
          }
        ],
        
        pretest: [],
        procedure: [
          "Create a qubit state with unequal superposition using Ry(θ) and compute the theoretical probabilities using the Born rule.",
          "Simulate the circuit and compare measured probability distributions with theoretical predictions.",
          "Create named QuantumRegister and ClassicalRegister objects and build a structured circuit.",
          "Apply Hadamard and CNOT operations on specific registers and add measurement operations.",
          "Run the circuit multiple times and observe how results converge to Born rule predictions.",
          "Experiment with different rotation angles and verify P(0) + P(1) = 1 always holds."
        ],
        posttest: [],
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
            title: "Bell States and Entanglement",
            body: [
              "A complete Bell-state measurement projects an arbitrary two-photon state onto one of four maximally entangled Bell states, and this operation underlies photonic quantum teleportation, superdense coding, entanglement swapping, quantum repeaters, and quantum key distribution alike. [S1]",
              "One of the most striking properties of quantum information is that quantum correlations, unlike classical correlations, cannot be freely shared: if two qubits are in a maximally entangled pure state, neither of them can be simultaneously correlated with a third system elsewhere in the universe — a property known as the monogamy of entanglement. [S2]",
              "A joint (pure) Bell-pair state is known exactly, yet the state of either qubit taken on its own is a mixed state — reflected mathematically in the fact that the trace of the squared density operator equals 1 for the full pair but less than 1 for either qubit alone, which is precisely why measuring one half of an entangled pair yields a random outcome even though the pair as a whole is perfectly defined. [S2]"
            ]
          },
          {
            title: "Quantum Teleportation: Principle and Circuit",
            body: [
              "Quantum teleportation transfers quantum information from a source to a destination by using entanglement in a Bell (EPR) pair to transport an arbitrary quantum state |ψ⟩ between two distant observers, conventionally called Alice and Bob; the protocol uses three qubits, with qubit 1 carrying the arbitrary state to be teleported and qubits 2 and 3 pre-shared as a Bell pair. [S3]",
              "The circuit applies a CNOT gate (qubit 1 as control, qubit 2 as target) followed by a Hadamard gate on qubit 1; measurements are then performed on qubits 1 and 2, and depending on the two classical measurement outcomes, a conditional X and/or Z correction is applied to qubit 3, after which qubit 3 carries the originally teleported state |ψ⟩. [S3]",
              "This matches the historical account of the protocol: Alice takes an unknown qubit, performs a two-qubit gate on it together with her half of a shared entangled pair, measures both, and transmits the two-bit result to Bob over a conventional channel; the result identifies exactly one of four single-qubit corrections for Bob to apply — one of which is simply 'do nothing' — after which his qubit is left in the customer's original state. [S4]",
              "Because two classical bits must physically reach Bob before he can complete the protocol, there is no instantaneous signaling and no violation of relativity, and because all record of the original state is destroyed at Alice's end during her measurement, no illegal copy of the quantum state is ever created. [S4]"
            ]
          },
          {
            title: "Experimental Teleportation and the Role of Bell Measurement",
            body: [
              "Quantum state teleportation transfers the information in an arbitrary qubit state using only two bits of classical communication, provided Alice and Bob already share two qubits in a maximally entangled Bell state; performing a Bell-state measurement on the input photon and Alice's half of the entangled pair projects Bob's photon into one of four possible states, which he can then convert into the original input state using a fixed, simple transformation once he learns which of the four outcomes occurred. [S3]",
              "Quantum state teleportation was first demonstrated experimentally by the Zeilinger group at the University of Innsbruck, who were able to unambiguously determine two of the four Bell states and confirm that the input photon's state had indeed been transferred to Bob for those cases; a separate group at Caltech later teleported the coherent state of an optical mode using squeezed light rather than polarization entanglement. [S3]",
              "Beyond direct teleportation, a Bell-state measurement performed on two photons — each belonging to a different, previously independent entangled pair — leaves the two remaining photons entangled with each other even though they never directly interacted; this process, called entanglement swapping, can in principle be applied repeatedly to transfer entanglement between increasingly distant sites and also serves as a method of event-ready detection, since a successful Bell-state measurement unambiguously signals that an entangled pair has been prepared. [S5]"
            ]
          },
          {
            title: "Quantum Key Distribution: The BB84 Protocol",
            body: [
              "In a quantum key distribution protocol, two parties who initially share no secret information exchange data over quantum and classical channels so that they end up sharing a secret key, in such a way that any eavesdropping attempt is detected with non-zero probability; this relies on the fact that nonorthogonal quantum states cannot be measured without disturbing them, and on the no-cloning theorem, which prevents an eavesdropper from copying the transmitted qubits for later analysis. [S6]",
              "In the BB84 protocol, Alice sends Bob a sequence of qubits prepared with equal probability in one of two mutually nonorthogonal bases; Bob measures each qubit in a randomly chosen one of the two bases, and afterward the two parties publicly compare which basis was used for each qubit, keeping only the results where their basis choices happened to match and discarding the rest. [S6]",
              "To check for eavesdropping, Alice and Bob sacrifice a subset of their matching-basis qubits, with Alice publicly announcing the state she prepared and Bob checking it against his measurement outcome; if the results disagree more often than the protocol's expected error rate allows, they conclude the channel has been disturbed by an eavesdropper and discard the entire key, restarting the process with fresh qubits. [S6]",
              "The security intuition for entanglement-based QKD is straightforward: if the shared state between Alice and Bob is close to a pure, maximally entangled state, an eavesdropper is necessarily uncorrelated with (or 'factored out' of) that state — meaning the global state is close to a simple product of Alice-and-Bob's entangled pair and the eavesdropper's own uncorrelated state, which is exactly what makes an eavesdropper's presence detectable through disturbed correlations. [S7]"
            ]
          },
          {
            title: "References",
            body: [
              "[S1] \"Quantum Key Distribution,\" Section 15.7.1 (Photonic Bell-State Measurements) — Ivan B. Djordjevic, in Quantum Information Processing, Quantum Computing, and Quantum Error Correction, 2nd Ed., 2021. ScienceDirect Topics: https://www.sciencedirect.com/topics/mathematics/bell-state — see Figure 15.12 (polarization Bell-state measurement setup) and Figure 15.13 (time-bin Bell-state measurement setup).",
              "[S2] \"Measurements and Quantum Information\" — Dan C. Marinescu & Gabriela M. Marinescu, in Classical and Quantum Information, 2012. ScienceDirect Topics: https://www.sciencedirect.com/topics/mathematics/bell-state",
              "[S3] \"Basics of quantum information, quantum communication, quantum sensing, and quantum networking,\" Section 1.4 (Quantum Teleportation) — Ivan B. Djordjevic, in Quantum Communication, Quantum Networks, and Quantum Sensing, 2022. ScienceDirect Topics: https://www.sciencedirect.com/topics/engineering/quantum-teleportation — see Figure 1.10 (teleportation circuit diagram).",
              "[S3] \"QUANTUM OPTICS | Entanglement and Quantum Information\" — P.G. Kwiat & D.F.V. James, in Encyclopedia of Modern Optics, 2005. ScienceDirect Topics: https://www.sciencedirect.com/topics/engineering/quantum-teleportation — see Figure 4 (teleportation scheme with entangled photon source and Bell-state analyzer).",
              "[S4] \"Quantum information technology\" — Timothy P. Spiller, Materials Today, 2003. ScienceDirect Topics: https://www.sciencedirect.com/topics/engineering/quantum-teleportation — see Figure 6 (2 km fiber quantum teleportation apparatus).",
              "[S5] \"Quantum Entanglement and Information Processing,\" Section 3 (Quantum teleportation and entanglement swapping) — M. Aspelmeyer & A. Zeilinger, Les Houches, 2004. ScienceDirect Topics: https://www.sciencedirect.com/topics/physics-and-astronomy/teleportation — see Figure 2 (entanglement-swapping scheme).",
              "[S6] \"Quantum Information and Computation,\" Section 5.1 (Key Distribution) — Jeffrey Bub, in Philosophy of Physics, 2007. ScienceDirect Topics: https://www.sciencedirect.com/topics/physics-and-astronomy/quantum-key-distribution",
              "[S7] \"Quantum Entanglement and Information Processing,\" Section 2.2 (Quantum key distribution with entanglement) — N. Gisin & N. Brunner, Les Houches, 2004. ScienceDirect Topics: https://www.sciencedirect.com/topics/physics-and-astronomy/quantum-key-distribution"
            ]
          }
        ],
        
        pretest: [],
        procedure: [
          "Create a Bell pair using H + CNOT and verify the entangled state.",
          "Build the complete quantum teleportation circuit with 3 qubits and 3 classical bits.",
          "Prepare an arbitrary state on qubit 0 using Ry rotation.",
          "Implement Bell measurement (CNOT + H + measure) on qubits 0 and 1.",
          "Apply classical corrections (conditional X and Z) on qubit 2 based on measurement results.",
          "Verify that qubit 2 ends up in the same state that was originally on qubit 0."
        ],
        posttest: [],
        references: [
          "Bennett et al. — Teleporting an Unknown Quantum State (1993)",
          "BB84 Protocol — Bennett and Brassard (1984)",
          "Qiskit Textbook — Quantum Teleportation: https://qiskit.org/textbook/ch-algorithms/teleportation.html"
        ]
      }
    }
  ]
};
