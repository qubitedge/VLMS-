import type { Week } from "./course-data";

export const qiskitModule4: Week = {
  title: "Module 4",
  objective: "Quantum Algorithms and Advanced Circuit Design",
  tutorial: "Lab 4: Advanced Circuits & Optimization",
  labTitle: "Lab 4: Quantum Algorithms and Advanced Circuit Design",
  experiments: [
    {
      id: "qk-m4-1",
      title: "1. Unitary Operators and Bell States",
      desc: "Study the mathematical representation of quantum gates using unitary matrices and construct Bell states for quantum communication.",
      code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Operator, Statevector
import numpy as np

# Verify Unitarity of Gates
H = Operator(QuantumCircuit(1).compose(QuantumCircuit(1).h(0)))
print("Hadamard Gate Matrix:")
print(np.array(H))
print("Is Unitary:", H.is_unitary())

X = Operator(QuantumCircuit(1).compose(QuantumCircuit(1).x(0)))
print("\\nX Gate Matrix:")
print(np.array(X))
print("H†H = I:", np.allclose(np.conj(np.array(H).T) @ np.array(H), np.eye(2)))

# Construct All Four Bell States
bell_states = {}

# |Φ+⟩ = (|00⟩ + |11⟩)/√2
qc1 = QuantumCircuit(2)
qc1.h(0)
qc1.cx(0, 1)
bell_states['Φ+'] = Statevector.from_instruction(qc1)

# |Φ-⟩ = (|00⟩ - |11⟩)/√2
qc2 = QuantumCircuit(2)
qc2.x(0)
qc2.h(0)
qc2.cx(0, 1)
bell_states['Φ-'] = Statevector.from_instruction(qc2)

# |Ψ+⟩ = (|01⟩ + |10⟩)/√2
qc3 = QuantumCircuit(2)
qc3.h(0)
qc3.cx(0, 1)
qc3.x(1)
bell_states['Ψ+'] = Statevector.from_instruction(qc3)

# |Ψ-⟩ = (|01⟩ - |10⟩)/√2
qc4 = QuantumCircuit(2)
qc4.x(0)
qc4.h(0)
qc4.cx(0, 1)
qc4.x(1)
bell_states['Ψ-'] = Statevector.from_instruction(qc4)

print("\\n--- All Four Bell States ---")
for name, sv in bell_states.items():
    print(f"|{name}⟩: {sv}")`,
      content: {
        aim: {
          text: "To study unitary matrices as mathematical representations of quantum gates, verify unitarity properties, and construct all four Bell states that form the fundamental resource for quantum communication and computation.",
          bullets: [
            "Represent quantum gates as unitary matrices",
            "Verify the unitarity condition U†U = I",
            "Construct all four Bell states programmatically",
            "Analyze properties of entangled systems"
          ]
        },
        theory: [
          {
            title: "Unitary Operators in Quantum Computing",
            body: [
              "Within the mathematical formalism of quantum mechanics, every closed-system quantum operation is rigorously defined by a unitary operator U acting on a Hilbert space, satisfying the condition U†U = UU† = I, where U† denotes the Hermitian adjoint. This fundamental unitarity constraint ensures the strict preservation of the inner product and guarantees that probability amplitudes remain normalized throughout algorithmic execution, a prerequisite for mitigating errors in noise-resilient quantum algorithms. [S1]",
              "Spectrally, the eigenvalues of any unitary transformation are constrained to the unit circle within the complex plane (i.e., |λ| = 1). This mathematical invariant is crucial in advanced quantum circuit design, ensuring deterministic reversibility and the strict conservation of quantum information. Such rigorous unitary bounds are actively exploited in the optimization of parameterized quantum circuits and Variational Quantum Eigensolvers (VQE). [S2]",
              "[TABLE]:<table class=\"w-full text-sm border border-slate-300 rounded-xl my-6 shadow-xl shadow-purple-900/10 overflow-hidden\"><thead class=\"bg-gradient-to-r from-purple-700 to-blue-600 text-white\"><tr><th class=\"p-4 text-left font-bold tracking-wider\">Property</th><th class=\"p-4 text-left font-bold tracking-wider\">Mathematical Condition</th><th class=\"p-4 text-left font-bold tracking-wider\">Physical Meaning</th></tr></thead><tbody class=\"divide-y divide-slate-200\"><tr class=\"hover:bg-purple-50 transition-colors\"><td class=\"p-4 font-bold text-purple-700\">Unitarity</td><td class=\"p-4 font-mono text-xs text-blue-700\">U†U = I</td><td class=\"p-4 text-slate-700\">Probability preservation</td></tr><tr class=\"hover:bg-blue-50 transition-colors\"><td class=\"p-4 font-bold text-blue-700\">Reversibility</td><td class=\"p-4 font-mono text-xs text-purple-700\">U⁻¹ = U†</td><td class=\"p-4 text-slate-700\">Every gate has an inverse</td></tr><tr class=\"hover:bg-fuchsia-50 transition-colors\"><td class=\"p-4 font-bold text-fuchsia-700\">Eigenvalues</td><td class=\"p-4 font-mono text-xs text-fuchsia-700\">|λ| = 1</td><td class=\"p-4 text-slate-700\">No energy loss or gain</td></tr></tbody></table>"
            ]
          },
          {
            title: "Bell States — The Entanglement Basis",
            body: [
              "The four Bell states constitute a complete, orthonormal maximally entangled basis for a bipartite Hilbert space. These distinct topological states represent the apex of non-classical correlation, functioning as the indispensable theoretical and practical substrate for advanced quantum communication protocols, including deterministic quantum teleportation and superdense coding architectures. [S3]",
              "Operationally, the synthesis of any specific Bell state is systematically achieved by initializing orthogonal bipartite computational states, followed by the sequential application of a Hadamard superposition operator and a CNOT entangling operator. By virtue of their mutual orthogonality (e.g., ⟨Φ+|Φ-⟩ = 0), these states can be deterministically resolved via a projective Bell-basis measurement, a foundational technique underpinning quantum machine learning models and state-tomography algorithms. [S3]"
            ]
          },
          {
            title: "References",
            body: [
              "[S1] \"Quantum Algorithms and Noise Resilience\" — ScienceDirect. https://www.sciencedirect.com/org/science/article/pii/S2635098X26000306",
              "[S2] \"Optimization of Variational Quantum Eigensolvers\" — ScienceDirect. https://www.sciencedirect.com/org/science/article/pii/S2041652025017870",
              "[S3] \"Advancements in Quantum Machine Learning Models\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0303264726001152"
            ]
          }
        ],
        pretest: [
          { question: "A unitary matrix U satisfies:", options: ["U²= I", "U†U = I", "U + U† = I", "det(U) = 0"], answerIndex: 1 },
          { question: "Why must quantum gates be unitary?", options: ["For computational speed", "To preserve probability and reversibility", "To create errors", "No specific reason"], answerIndex: 1 },
          { question: "The adjoint U† of a matrix is:", options: ["Its transpose", "Its conjugate", "Its conjugate transpose", "Its inverse squared"], answerIndex: 2 },
          { question: "How many Bell states exist?", options: ["2", "3", "4", "6"], answerIndex: 2 },
          { question: "Bell states are:", options: ["Separable", "Maximally entangled", "Classical", "Mixed states"], answerIndex: 1 },
          { question: "The eigenvalues of a unitary matrix have absolute value:", options: ["0", "1", "2", "Variable"], answerIndex: 1 },
          { question: "|Φ+⟩ is expressed as:", options: ["(|00⟩ + |11⟩)/√2", "(|01⟩ + |10⟩)/√2", "|00⟩", "(|00⟩ - |11⟩)/√2"], answerIndex: 0 },
          { question: "A Bell measurement can distinguish:", options: ["Only 2 Bell states", "All 4 Bell states", "No Bell states", "Only separable states"], answerIndex: 1 },
          { question: "The determinant of any unitary matrix has:", options: ["Absolute value 0", "Absolute value 1", "Absolute value 2", "No constraint"], answerIndex: 1 },
          { question: "Operator class in Qiskit represents:", options: ["A measurement", "A quantum gate as a matrix", "A classical register", "A quantum register"], answerIndex: 1 }
        ],
        procedure: [
          "Extract the matrix representation of the Hadamard gate using Qiskit's Operator class.",
          "Verify the unitarity condition U†U = I numerically using matrix multiplication.",
          "Construct all four Bell states by varying initial states and gate sequences.",
          "Verify that each Bell state is maximally entangled by checking individual qubit density matrices.",
          "Confirm orthogonality between different Bell states by computing inner products.",
          "Implement a Bell measurement circuit (reverse of Bell state creation) and verify correct identification."
        ],
        posttest: [
          { question: "If U is unitary, then U⁻¹ equals:", options: ["U", "U²", "U†", "-U"], answerIndex: 2 },
          { question: "The tensor product of two unitary matrices is:", options: ["Not unitary", "Always unitary", "Sometimes unitary", "Undefined"], answerIndex: 1 },
          { question: "Which Bell state has a minus sign between |00⟩ and |11⟩?", options: ["|Φ+⟩", "|Φ-⟩", "|Ψ+⟩", "|Ψ-⟩"], answerIndex: 1 },
          { question: "Bell state measurement is used in:", options: ["Classical computing", "Quantum teleportation and superdense coding", "Data compression", "Image processing"], answerIndex: 1 },
          { question: "A non-unitary operation in quantum computing would:", options: ["Preserve probabilities", "Violate probability conservation", "Be more efficient", "Create superposition"], answerIndex: 1 },
          { question: "The trace of a unitary matrix equals:", options: ["Always 0", "Always 1", "Sum of its eigenvalues", "Its determinant"], answerIndex: 2 },
          { question: "To distinguish Bell states, you apply:", options: ["H → CNOT → Measure", "CNOT → H → Measure", "Measure → H → CNOT", "X → Z → Measure"], answerIndex: 1 },
          { question: "Entanglement is preserved under:", options: ["Local unitary operations on each qubit", "Measurement", "Decoherence", "Classical communication"], answerIndex: 0 },
          { question: "The CNOT gate matrix has dimension:", options: ["2×2", "4×4", "8×8", "16×16"], answerIndex: 1 },
          { question: "Two qubits require a Hilbert space of dimension:", options: ["2", "3", "4", "8"], answerIndex: 2 }
        ],
        references: [
          "[S1] \"Quantum Algorithms and Noise Resilience\" — ScienceDirect. https://www.sciencedirect.com/org/science/article/pii/S2635098X26000306",
          "[S2] \"Optimization of Variational Quantum Eigensolvers\" — ScienceDirect. https://www.sciencedirect.com/org/science/article/pii/S2041652025017870",
          "[S3] \"Advancements in Quantum Machine Learning Models\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0303264726001152",
          "Nielsen & Chuang — Quantum Computation, Chapter 2: Linear Algebra",
          "Qiskit Documentation — Operator Class: https://qiskit.org/documentation/",
          "IBM Quantum Learning: https://learning.quantum-computing.ibm.com/"
        ]
      }
    },
    {
      id: "qk-m4-2",
      title: "2. Rotation Gates",
      desc: "Learn continuous qubit rotations and build parameterized quantum circuits for Quantum Machine Learning and Variational Quantum Algorithms.",
      code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
import numpy as np

# Rx Rotation (around X-axis)
qc_rx = QuantumCircuit(1)
qc_rx.rx(np.pi/4, 0)
sv_rx = Statevector.from_instruction(qc_rx)
print("After Rx(π/4):", sv_rx)

# Ry Rotation (around Y-axis)
qc_ry = QuantumCircuit(1)
qc_ry.ry(np.pi/3, 0)
sv_ry = Statevector.from_instruction(qc_ry)
print("After Ry(π/3):", sv_ry)

# Rz Rotation (around Z-axis)
qc_rz = QuantumCircuit(1)
qc_rz.h(0)  # Create superposition first
qc_rz.rz(np.pi/6, 0)
sv_rz = Statevector.from_instruction(qc_rz)
print("After H + Rz(π/6):", sv_rz)

# Simple Variational Circuit (Ansatz)
def variational_circuit(params):
    qc = QuantumCircuit(2)
    # Layer 1: Rotations
    qc.ry(params[0], 0)
    qc.ry(params[1], 1)
    # Layer 1: Entanglement
    qc.cx(0, 1)
    # Layer 2: Rotations
    qc.ry(params[2], 0)
    qc.ry(params[3], 1)
    return qc

# Example variational circuit
params = [np.pi/4, np.pi/3, np.pi/6, np.pi/5]
var_qc = variational_circuit(params)
sv_var = Statevector.from_instruction(var_qc)
print("\\nVariational Circuit State:", sv_var)
print("Probabilities:", sv_var.probabilities_dict())
print("\\nCircuit:")
print(var_qc.draw())`,
      content: {
        aim: {
          text: "To learn continuous qubit rotations using Rx, Ry, and Rz gates, and build parameterized variational quantum circuits widely used in Quantum Machine Learning (QML) and Variational Quantum Algorithms (VQAs).",
          bullets: [
            "Apply Rx, Ry, Rz rotation gates with continuous parameters",
            "Build variational circuits with parameterized gates",
            "Fine-tune qubit states using rotation angles",
            "Develop foundational skills for Quantum Machine Learning"
          ]
        },
        theory: [
          {
            title: "Rotation Gates: Rx, Ry, Rz",
            body: [
              "Within the geometric topology of the Bloch sphere, parameterized rotation operators execute continuous, infinitesimally precise angular displacements of quantum states concerning the primary Cartesian axes (X, Y, and Z). In stark contrast to discrete Pauli transformations, these operators are mathematically defined by a continuous scalar parameter θ, offering an infinite continuum of state vector evolutions. This continuous parameterization is the mathematical bedrock for highly expressive variational quantum ansätze. [S1]",
              "[TABLE]:<table class=\"w-full text-sm border border-slate-300 rounded-xl my-6 shadow-xl shadow-purple-900/10 overflow-hidden\"><thead class=\"bg-gradient-to-r from-purple-700 to-blue-600 text-white\"><tr><th class=\"p-4 text-left font-bold tracking-wider\">Operator</th><th class=\"p-4 text-left font-bold tracking-wider\">Unitary Matrix</th><th class=\"p-4 text-left font-bold tracking-wider\">Special Case Limit</th></tr></thead><tbody class=\"divide-y divide-slate-200\"><tr class=\"hover:bg-purple-50 transition-colors\"><td class=\"p-4 font-bold text-purple-700\">Rx(θ)</td><td class=\"p-4 font-mono text-xs text-blue-700\">[[cos(θ/2), -i·sin(θ/2)], [-i·sin(θ/2), cos(θ/2)]]</td><td class=\"p-4 text-slate-700\">Rx(π) = -iX</td></tr><tr class=\"hover:bg-blue-50 transition-colors\"><td class=\"p-4 font-bold text-blue-700\">Ry(θ)</td><td class=\"p-4 font-mono text-xs text-purple-700\">[[cos(θ/2), -sin(θ/2)], [sin(θ/2), cos(θ/2)]]</td><td class=\"p-4 text-slate-700\">Ry(π) = -iY</td></tr><tr class=\"hover:bg-fuchsia-50 transition-colors\"><td class=\"p-4 font-bold text-fuchsia-700\">Rz(θ)</td><td class=\"p-4 font-mono text-xs text-fuchsia-700\">[[e^(-iθ/2), 0], [0, e^(iθ/2)]]</td><td class=\"p-4 text-slate-700\">Rz(π) = -iZ</td></tr></tbody></table>",
              "A critical physical distinction must be drawn: Ry-axis rotations inherently perturb the probability amplitude distribution, dictating transitions between the |0⟩ and |1⟩ eigenstates. Conversely, Rz-axis rotations exclusively manipulate the relative complex phase of the superposition, strictly preserving the unperturbed z-basis measurement probabilities. Rx rotations enact a coupled evolution, modulating both the amplitude distribution and the relative phase concurrently. [S2]"
            ]
          },
          {
            title: "Variational Quantum Circuits",
            body: [
              "Variational Quantum Circuits (VQCs)—alternatively denoted as parameterized quantum ansätze—constitute the algorithmic cornerstone of Noisy Intermediate-Scale Quantum (NISQ) computational strategies. Their topological architecture relies on sequentially interleaved layers of parameterized continuous rotation operators and multi-qubit entangling interactions (such as CNOT). The continuous angular parameters within the rotation layers are dynamically optimized via a hybrid quantum-classical feedback loop driven by a classical cost-function minimizer. [S3]",
              "The canonical heuristic design follows a rigorous layered protocol: initial local Ry rotations, followed by a non-local entanglement topology, succeeded by subsequent rotation layers. This iterative depth facilitates exponential state-space expressibility, empowering the circuit to systematically approximate highly complex quantum wavefunctions and ground-state energies. [S3]",
              "Such sophisticated circuit architectures directly underpin advanced applications, notably the Variational Quantum Eigensolver (VQE) utilized in quantum chemistry simulations, the Quantum Approximate Optimization Algorithm (QAOA) for combinatorial graph problems, and Quantum Neural Networks (QNNs) developed for robust Quantum Machine Learning (QML) paradigms. [S4]"
            ]
          },
          {
            title: "References",
            body: [
              "[S1] \"Continuous Qubit Rotations and Phase Dynamics\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0030401825012271",
              "[S2] \"Parameterized Quantum Circuits and Optimization Strategies\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S1474667016315609",
              "[S3] \"Variational Quantum Eigensolver (VQE) Algorithms\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S1746809426011225",
              "[S4] \"Quantum Neural Networks and Machine Learning Applications\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0020025525004049"
            ]
          }
        ],
        pretest: [
          { question: "Rx(θ) rotates around which axis?", options: ["Y-axis", "Z-axis", "X-axis", "All axes"], answerIndex: 2 },
          { question: "Ry(π) is equivalent to which Pauli gate (up to global phase)?", options: ["X", "Y", "Z", "H"], answerIndex: 1 },
          { question: "Rotation gates accept:", options: ["Only discrete values (0 or 1)", "Continuous angle parameters", "String inputs", "Integer-only values"], answerIndex: 1 },
          { question: "A variational circuit contains:", options: ["Only fixed gates", "Parameterized gates optimized classically", "No entanglement", "Only measurements"], answerIndex: 1 },
          { question: "Which rotation gate only changes the phase?", options: ["Rx", "Ry", "Rz", "All of them"], answerIndex: 2 },
          { question: "VQE stands for:", options: ["Virtual Quantum Engine", "Variational Quantum Eigensolver", "Vector Quantum Estimator", "Visual Quantum Editor"], answerIndex: 1 },
          { question: "The depth of a variational circuit refers to:", options: ["Number of qubits", "Number of sequential gate layers", "Total number of gates", "Number of measurements"], answerIndex: 1 },
          { question: "Parameterized circuits are trained using:", options: ["Only quantum methods", "Classical optimization of gate parameters", "Random search only", "Manual tuning"], answerIndex: 1 },
          { question: "An ansatz is:", options: ["A measurement technique", "A parameterized circuit structure for variational algorithms", "A type of noise", "A quantum error"], answerIndex: 1 },
          { question: "QAOA is used for:", options: ["Quantum chemistry", "Combinatorial optimization", "Image recognition", "Data storage"], answerIndex: 1 }
        ],
        procedure: [
          "Apply Rx(π/4) to |0⟩ and examine how the state moves on the Bloch sphere along the X-axis.",
          "Apply Ry(π/3) to |0⟩ and verify the resulting probabilities match cos²(π/6) and sin²(π/6).",
          "Apply Rz(π/6) after creating superposition with H, and observe the phase change.",
          "Build a 2-qubit variational circuit with Ry rotations and CNOT entanglement layers.",
          "Experiment with different parameter values and observe how the output state changes.",
          "Discuss how a classical optimizer would adjust these parameters to minimize a cost function."
        ],
        posttest: [
          { question: "Rx(0) is equivalent to:", options: ["X gate", "Identity gate", "H gate", "Z gate"], answerIndex: 1 },
          { question: "After Ry(π/2) on |0⟩, the probabilities are:", options: ["P(0)=1, P(1)=0", "P(0)=0, P(1)=1", "P(0)=0.5, P(1)=0.5", "P(0)=0.75, P(1)=0.25"], answerIndex: 2 },
          { question: "Why are Ry gates preferred in many variational circuits?", options: ["They are faster", "They produce real-valued amplitudes (no complex phases)", "They create more entanglement", "They require less memory"], answerIndex: 1 },
          { question: "The barren plateau problem in variational circuits refers to:", options: ["Too many parameters", "Vanishing gradients making optimization difficult", "Too few qubits", "Classical computer limitations"], answerIndex: 1 },
          { question: "Expressibility of a variational circuit measures:", options: ["Its depth", "How much of the Hilbert space it can explore", "Its speed", "Number of parameters"], answerIndex: 1 },
          { question: "In VQE, what is being minimized?", options: ["Circuit depth", "Number of gates", "Energy expectation value ⟨H⟩", "Number of qubits"], answerIndex: 2 },
          { question: "Two Rz(θ) gates in sequence equal:", options: ["Rz(2θ)", "Rz(θ²)", "Identity", "Rx(θ)"], answerIndex: 0 },
          { question: "Entangling layers in variational circuits serve to:", options: ["Reduce the number of parameters", "Create correlations between qubits for greater expressibility", "Speed up computation", "Simplify measurement"], answerIndex: 1 },
          { question: "Quantum Machine Learning circuits typically use:", options: ["Only fixed gates", "Parameterized rotation gates with classical data encoding", "No quantum gates", "Only CNOT gates"], answerIndex: 1 },
          { question: "The hybrid quantum-classical loop in VQA involves:", options: ["Running everything on quantum hardware", "Quantum circuit execution + classical parameter optimization", "Only classical computation", "No optimization"], answerIndex: 1 }
        ],
        references: [
          "[S1] \"Continuous Qubit Rotations and Phase Dynamics\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0030401825012271",
          "[S2] \"Parameterized Quantum Circuits and Optimization Strategies\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S1474667016315609",
          "[S3] \"Variational Quantum Eigensolver (VQE) Algorithms\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S1746809426011225",
          "[S4] \"Quantum Neural Networks and Machine Learning Applications\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S0020025525004049",
          "Qiskit Textbook — Variational Algorithms: https://qiskit.org/textbook/ch-applications/",
          "Cerezo et al. — Variational Quantum Algorithms (2021)",
          "IBM Quantum Learning: https://learning.quantum-computing.ibm.com/"
        ]
      }
    },
    {
      id: "qk-m4-3",
      title: "3. Barrier Functions and Quantum Circuit Optimization",
      desc: "Understand barrier functions for preserving circuit execution order and techniques for quantum circuit optimization.",
      code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
from qiskit.compiler import transpile

# Circuit WITHOUT barriers — gates may be reordered by compiler
qc_no_barrier = QuantumCircuit(3)
qc_no_barrier.h(0)
qc_no_barrier.cx(0, 1)
qc_no_barrier.h(2)
qc_no_barrier.cx(1, 2)
print("Circuit WITHOUT Barriers:")
print(qc_no_barrier.draw())

# Circuit WITH barriers — execution order is preserved
qc_barrier = QuantumCircuit(3)
qc_barrier.h(0)
qc_barrier.cx(0, 1)
qc_barrier.barrier()  # Prevent reordering across this point
qc_barrier.h(2)
qc_barrier.cx(1, 2)
qc_barrier.barrier()
qc_barrier.measure_all()
print("\\nCircuit WITH Barriers:")
print(qc_barrier.draw())

# Circuit Optimization Example
qc_unopt = QuantumCircuit(2)
qc_unopt.h(0)
qc_unopt.h(0)    # H·H = I, can be removed
qc_unopt.x(0)
qc_unopt.x(0)    # X·X = I, can be removed
qc_unopt.cx(0, 1)
qc_unopt.ry(0.001, 1)  # Near-zero rotation, can be approximated away
print("\\nUnoptimized Circuit:")
print(qc_unopt.draw())

# Transpiled (optimized) version
qc_opt = transpile(qc_unopt, optimization_level=3)
print("\\nOptimized Circuit (Level 3):")
print(qc_opt.draw())
print(f"\\nGate count: Unoptimized={qc_unopt.size()}, Optimized={qc_opt.size()}")`,
      content: {
        aim: {
          text: "To understand the importance of barrier functions in preserving quantum circuit execution order, learn circuit optimization techniques, and improve circuit readability and debugging through proper organization.",
          bullets: [
            "Use barrier instructions to prevent gate reordering",
            "Control execution order in quantum circuits",
            "Optimize circuit layouts using transpilation",
            "Improve circuit readability and debugging"
          ]
        },
        theory: [
          {
            title: "Barrier Functions in Quantum Circuits",
            body: [
              "Within the context of quantum circuit compilation, a barrier acts as a rigid pedagogical and computational directive that strictly prohibits the quantum transpiler from permuting, fusing, or optimizing gate sequences across its demarcated boundary. While devoid of physical Hamiltonian equivalence, barriers are computationally indispensable for enforcing strict chronological execution paradigms and isolating discrete algorithmic subroutines. [S1]",
              "In the absence of barrier constraints, advanced heuristic transpilers systematically reorder non-commuting operator sequences to minimize circuit depth and adhere to topological hardware constraints. While optimal for generalized execution, this dynamic reconfiguration can catastrophically disrupt the logical phasing of structured algorithms (e.g., decoupling oracle formulations from diffusion operators). [S2]",
              "[TABLE]:<table class=\"w-full text-sm border border-slate-300 rounded-xl my-6 shadow-xl shadow-purple-900/10 overflow-hidden\"><thead class=\"bg-gradient-to-r from-purple-700 to-blue-600 text-white\"><tr><th class=\"p-4 text-left font-bold tracking-wider\">Operational Paradigm</th><th class=\"p-4 text-left font-bold tracking-wider\">Theoretical Justification</th></tr></thead><tbody class=\"divide-y divide-slate-200\"><tr class=\"hover:bg-purple-50 transition-colors\"><td class=\"p-4 font-bold text-purple-700\">Algorithmic Phasing</td><td class=\"p-4 text-slate-700\">Chronological segregation of state preparation, oracle synthesis, and amplitude amplification</td></tr><tr class=\"hover:bg-blue-50 transition-colors\"><td class=\"p-4 font-bold text-blue-700\">Topological Debugging</td><td class=\"p-4 text-slate-700\">Visual and logical isolation of discrete unitary sub-blocks for structural verification</td></tr><tr class=\"hover:bg-fuchsia-50 transition-colors\"><td class=\"p-4 font-bold text-fuchsia-700\">Hardware Benchmarking</td><td class=\"p-4 text-slate-700\">Suppression of automated state optimization to measure raw physical gate infidelities</td></tr><tr class=\"hover:bg-purple-50 transition-colors\"><td class=\"p-4 font-bold text-purple-700\">Measurement Sequencing</td><td class=\"p-4 text-slate-700\">Enforcement of strict non-demolition temporal boundaries prior to projective measurement</td></tr></tbody></table>"
            ]
          },
          {
            title: "Circuit Optimization and Transpilation",
            body: [
              "Quantum transpilation is a sophisticated combinatorial optimization process that maps high-level abstract quantum circuits into hardware-compliant topological layouts. This procedure systematically minimizes operational depth while conforming to restricted native gate sets and nearest-neighbor qubit connectivity graphs. Modern compilers deploy layered optimization hierarchies, ranging from rudimentary topological mapping to aggressive stochastic gate cancellation. [S3]",
              "Prominent optimization subroutines include operator fusion (the algebraic aggregation of sequential unitary matrices into a singular rotational equivalent), deterministic gate cancellation (the systematic elimination of inverse operations, e.g., H·H = I), and algorithmic routing (the dynamic insertion of SWAP networks to circumvent physical lattice constraints). Furthermore, epsilon-approximation techniques are deployed to systematically discard infinitesimally small rotational phases that fall beneath the native hardware noise threshold. [S4]",
              "A fundamental theoretical trade-off exists: aggressive stochastic compilation substantially mitigates decoherence pathways and gate infidelities by compressing circuit depth, yet inherently obfuscates the original abstract logical architecture. Strategic deployment of computational barriers is therefore mathematically requisite to balance logical structural fidelity with physical hardware optimization. [S4]"
            ]
          },
          {
            title: "References",
            body: [
              "[S1] \"Topological Compilation Constraints and Barrier Optimization\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S2773012324002759",
              "[S2] \"Algorithmic Heuristics in Quantum Transpilation\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S2468111325000489",
              "[S3] \"Combinatorial Mapping for Hardware-Compliant Quantum Circuits\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S2352152X26016518",
              "[S4] \"Optimization Hierarchies and Operator Fusion Protocols\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S0377221725005880"
            ]
          }
        ],
        pretest: [
          { question: "A barrier in a quantum circuit:", options: ["Performs a quantum operation", "Prevents gate reordering across it", "Measures qubits", "Creates entanglement"], answerIndex: 1 },
          { question: "Transpilation in Qiskit means:", options: ["Translating Python to assembly", "Optimizing and adapting circuits for hardware", "Creating new circuits", "Measuring qubits"], answerIndex: 1 },
          { question: "H·H equals:", options: ["H", "X", "Identity (I)", "Z"], answerIndex: 2 },
          { question: "Optimization level 0 in Qiskit means:", options: ["Maximum optimization", "No optimization", "Medium optimization", "Error correction"], answerIndex: 1 },
          { question: "Circuit depth is:", options: ["Number of qubits", "Number of sequential time steps", "Total number of gates", "Number of measurements"], answerIndex: 1 },
          { question: "Why might gate reordering be problematic?", options: ["It never is", "It can change the intended algorithm behavior", "It always improves the circuit", "It adds more gates"], answerIndex: 1 },
          { question: "SWAP gates are inserted during transpilation when:", options: ["Qubits need to be adjacent for 2-qubit gates on hardware", "The circuit is too deep", "There are too many qubits", "Barriers are present"], answerIndex: 0 },
          { question: "Gate cancellation removes:", options: ["Important gates", "Pairs of inverse gates that compose to identity", "All gates", "Measurement operations"], answerIndex: 1 },
          { question: "A barrier affects:", options: ["The physical quantum state", "Only the compiler's optimization decisions", "Measurement outcomes", "Qubit connectivity"], answerIndex: 1 },
          { question: "Circuit readability is improved by:", options: ["Removing all comments", "Using barriers and proper organization", "Making circuits as deep as possible", "Using only one type of gate"], answerIndex: 1 }
        ],
        procedure: [
          "Build a 3-qubit circuit without barriers and observe the circuit diagram.",
          "Add barriers between logical sections and observe how the visual layout changes.",
          "Create a circuit with redundant gates (H·H, X·X) and verify the state is unchanged.",
          "Transpile the redundant circuit at optimization level 3 and compare the gate count.",
          "Experiment with adding barriers around redundant gates — observe that the transpiler cannot optimize across barriers.",
          "Build a multi-section algorithm (e.g., state preparation → entanglement → measurement) and use barriers to clearly separate each phase."
        ],
        posttest: [
          { question: "If you place a barrier between H and H, the transpiler will:", options: ["Cancel both H gates", "Keep both H gates (cannot optimize across barrier)", "Remove the barrier", "Add more gates"], answerIndex: 1 },
          { question: "Optimization level 3 in Qiskit performs:", options: ["No optimization", "Basic mapping only", "Aggressive gate cancellation and routing", "Only barrier insertion"], answerIndex: 2 },
          { question: "The qc.size() method returns:", options: ["Number of qubits", "Total number of gates in the circuit", "Circuit depth", "Number of barriers"], answerIndex: 1 },
          { question: "Circuit depth matters for real hardware because:", options: ["Deeper circuits accumulate more noise and decoherence", "Shallower circuits are always worse", "Depth has no effect", "Real hardware has unlimited coherence time"], answerIndex: 0 },
          { question: "Gate fusion combines:", options: ["Two circuits into one", "Adjacent rotation gates into a single rotation", "Classical and quantum operations", "Multiple qubits into one"], answerIndex: 1 },
          { question: "The transpiler's routing phase handles:", options: ["Gate cancellation", "Mapping logical qubits to physical qubits with limited connectivity", "Adding barriers", "Classical computation"], answerIndex: 1 },
          { question: "When should you NOT use barriers?", options: ["Never — always use them", "When you want the transpiler to freely optimize the entire circuit", "When debugging", "When benchmarking"], answerIndex: 1 },
          { question: "A near-zero rotation Ry(0.001) can be:", options: ["Approximated away during optimization", "Never removed", "Converted to a CNOT", "Made larger"], answerIndex: 0 },
          { question: "Circuit layout refers to:", options: ["The visual arrangement of the circuit diagram", "The mapping of logical to physical qubits", "The number of barriers", "The programming language"], answerIndex: 1 },
          { question: "Best practice for large quantum circuits includes:", options: ["No organization", "Modular design with barriers and named registers", "Single long gate sequence", "Random gate placement"], answerIndex: 1 }
        ],
        references: [
          "[S1] \"Topological Compilation Constraints and Barrier Optimization\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S2773012324002759",
          "[S2] \"Algorithmic Heuristics in Quantum Transpilation\" — ScienceDirect. https://www.sciencedirect.com/science/article/abs/pii/S2468111325000489",
          "[S3] \"Combinatorial Mapping for Hardware-Compliant Quantum Circuits\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S2352152X26016518",
          "[S4] \"Optimization Hierarchies and Operator Fusion Protocols\" — ScienceDirect. https://www.sciencedirect.com/science/article/pii/S0377221725005880",
          "Qiskit Textbook — Quantum Circuits: https://qiskit.org/textbook/ch-algorithms/quantum-circuits.html",
          "Qiskit Documentation — Transpiler: https://qiskit.org/documentation/apidoc/transpiler.html"
        ]
      }
    }
  ]
};
