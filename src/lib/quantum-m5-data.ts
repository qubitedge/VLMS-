import type { Week } from "./course-data";

export const quantumModule5: Week = {
  title: "Module 5",
  objective: "Quantum Algorithms and Applications",
  tutorial: "Lab 5: Running Quantum Algorithms",
  labTitle: "Lab 5: Algorithms and Applications",
  experiments: [
    {
      id: "qc-m5-1",
      title: "1. Deutsch–Jozsa Algorithm",
      desc: "Simulate an algorithm that exponentially outperforms classical computers.",
      code: `try:
    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import Aer
    
    print("--- Deutsch-Jozsa Algorithm Simulator ---")
    print("Goal: Determine if a hidden function is 'Constant' or 'Balanced' in 1 query.")
    
    # 2-qubit circuit (1 data qubit + 1 helper/ancilla qubit)
    qc = QuantumCircuit(2, 1)
    
    # Setup
    qc.x(1) # Flip ancilla to 1
    qc.h(0) # Superposition for data
    qc.h(1) # Superposition for ancilla
    
    qc.barrier()
    # Oracle: We will implement a 'Balanced' function (e.g., f(x) = x)
    # A balanced oracle simply applies a CNOT from data to ancilla
    qc.cx(0, 1)
    qc.barrier()
    
    # Measurement preparation
    qc.h(0)
    qc.measure(0, 0)
    
    simulator = Aer.get_backend('qasm_simulator')
    compiled_circuit = transpile(qc, simulator)
    job = simulator.run(compiled_circuit, shots=10)
    result = job.result()
    counts = result.get_counts()
    
    print("Result:", counts)
    print("If output is '1', the function is Balanced. If '0', it is Constant.")
    print("Notice we determined this with 100% certainty in ONE evaluation!")
except ImportError:
    print("Qiskit not installed. Simulating output...")
    print("--- Deutsch-Jozsa Algorithm Simulator ---")
    print("Goal: Determine if a hidden function is 'Constant' or 'Balanced' in 1 query.")
    print("Result: {'1': 10}")
    print("If output is '1', the function is Balanced. If '0', it is Constant.")
    print("Notice we determined this with 100% certainty in ONE evaluation!")`,
      content: {
        aim: {
          text: "To understand and execute the Deutsch-Jozsa algorithm, one of the earliest examples of a quantum algorithm that is exponentially faster than any possible deterministic classical algorithm.",
          bullets: []
        },
        theory: [
          {
            title: "Deutsch–Jozsa Algorithm",
            body: [
              "Proposed in 1992, the Deutsch-Jozsa algorithm solves a specific 'black box' problem.",
              "![Algorithm flow visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781864212/Classical_vs_Quantum_function_query_202606191521_xr9oci.mp4)",
              "Imagine a hidden function that takes a binary string as input and outputs a single 0 or 1. You are guaranteed that this function is either completely 'Constant' (outputs the same thing for every input) or perfectly 'Balanced' (outputs 0 for half the inputs and 1 for the other half).",
              "Classically, if you have N bits of input, you might have to query the function (2^N)/2 + 1 times in the worst case to be 100% sure if it's constant or balanced.",
              "By putting all input bits into a superposition and utilizing quantum interference, the Deutsch-Jozsa algorithm determines the answer with 100% certainty in exactly ONE query, proving an exponential quantum speedup."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the Deutsch-Jozsa simulator code.",
          "2. The code sets up an ancilla (helper) qubit in the |-⟩ state.",
          "3. It passes the input through a 'Balanced' oracle (a simple CNOT).",
          "4. After measuring the input qubit, observe that it deterministically outputs '1', proving the function is balanced in one shot."
        ],
        posttest: []
      }
    },
    {
      id: "qc-m5-2",
      title: "2. Grover's Search Algorithm",
      desc: "Simulate a quadratic speedup for searching unsorted databases.",
      code: `print("--- Grover's Search Algorithm (Simulation) ---")
print("Goal: Find a specific marked item in an unsorted list of N items.")
print("\\nClassical Approach:")
print("- You must check each item one by one.")
print("- Average time: N/2 queries. Worst case: N queries.")
print("- For N = 1,000,000, average queries = 500,000")

print("\\nGrover's Quantum Approach:")
print("- Uses 'Amplitude Amplification'.")
print("- Flips the phase of the target item, then inverts all amplitudes about their mean.")
print("- Time: O(√N) queries.")
print("- For N = 1,000,000, average queries = √1,000,000 = 1,000")

print("\\nSpeedup:")
print("500,000 vs 1,000 queries. This is a quadratic speedup!")
print("While not exponential like Shor's, quadratic speedup is massive for big data.")`,
      content: {
        aim: {
          text: "To understand Grover's Algorithm, which provides a quadratic speedup over classical computing for unstructured search problems.",
          bullets: []
        },
        theory: [
          {
            title: "Grover's Search Algorithm",
            body: [
              "Invented by Lov Grover in 1996, this algorithm searches an unsorted database of N items for a specific target.",
              "![Search amplification animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781864197/Classical_vs_Quantum_Search_202606191524_etkb8t.mp4)",
              "Classically, searching an unsorted list requires checking each item one by one, taking O(N) time.",
              "Grover's algorithm initializes a superposition of all possible items. It then iteratively applies an oracle that 'tags' the correct item with a negative phase.",
              "Following the oracle, a 'diffusion operator' performs 'amplitude amplification', which shrinks the probability of the wrong items and grows the probability of the correct item.",
              "This finds the target in O(√N) steps, offering a quadratic speedup."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Read the mathematical comparison generated by the script.",
          "2. Compare the classical steps (500,000) vs the quantum steps (1,000) for N=1,000,000.",
          "3. Understand that while this isn't exponential, for N=1 trillion, classical takes 500 billion steps while quantum takes only 1 million."
        ],
        posttest: []
      }
    },
    {
      id: "qc-m5-3",
      title: "3. Shor's Algorithm (Concept)",
      desc: "Interactive demonstration of the logic behind Shor's Algorithm.",
      code: `import math

print("--- Shor's Algorithm Concept (Period Finding) ---")
print("Goal: Factor a large number N into its prime components.")
print("Example: Let's try to factor N = 15.")

N = 15
a = 7 # Pick a random number 'a' co-prime to N

print(f"1. Choose random 'a' = {a}")
print(f"2. Check if GCD({a}, {N}) > 1: GCD is {math.gcd(a, N)}. Proceed.")

print("\\n3. The Quantum Part: Find the period 'r' of the function f(x) = a^x mod N")
print("Classically, this is hard. Quantumly, the Quantum Fourier Transform does this instantly!")

# Simulating finding the period 'r'
for x in range(1, 10):
    val = (a**x) % N
    print(f"   {a}^{x} mod {N} = {val}")
    if val == 1:
        r = x
        break

print(f"\\n   Period 'r' found: {r}")

print("\\n4. Classical Math to get prime factors:")
if r % 2 == 0:
    factor1 = math.gcd(a**(r//2) - 1, N)
    factor2 = math.gcd(a**(r//2) + 1, N)
    print(f"   Factor 1: GCD({a}^{r//2} - 1, 15) = {factor1}")
    print(f"   Factor 2: GCD({a}^{r//2} + 1, 15) = {factor2}")
    print(f"\\nSuccess! The prime factors of {N} are {factor1} and {factor2}.")
else:
    print("Period 'r' was odd, algorithm must be run again with a new 'a'.")`,
      content: {
        aim: {
          text: "To understand the mathematical workflow of Shor's Algorithm and how it threatens modern RSA encryption.",
          bullets: []
        },
        theory: [
          {
            title: "Shor's Algorithm",
            body: [
              "Formulated by Peter Shor in 1994, this algorithm finds the prime factors of an integer N in polynomial time, representing an exponential speedup over the best known classical algorithms.",
              "![Factorization visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781864197/RSA_encryption_factoring_with_Sh__202606191528_grtrm9.mp4)",
              "Modern cryptography (like RSA used in secure web browsing) relies entirely on the assumption that factoring very large numbers (e.g., 2048-bit numbers) is practically impossible for classical computers, taking millions of years.",
              "Shor's algorithm breaks the factoring problem down into a 'period finding' problem. It uses the Quantum Fourier Transform (QFT) to find this period almost instantly.",
              "Once the period is found quantumly, simple classical mathematics (Greatest Common Divisor) extracts the prime factors, breaking the encryption."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the Python demonstration script.",
          "2. Review the output showing the hybrid classical-quantum approach.",
          "3. See how the sequence 7^x mod 15 repeats its pattern, and the period 'r' is found to be 4.",
          "4. Observe the final classical algebra step that successfully factors 15 into 3 and 5."
        ],
        posttest: []
      }
    },
    {
      id: "qc-m5-4",
      title: "4. Quantum Machine Learning",
      desc: "Interactive demo exploring QML concepts.",
      code: `print("--- Quantum Machine Learning (QML) Overview ---")
print("QML explores the intersection of quantum computing and AI.")
print("\\nKey Concepts:")
print("1. Quantum Support Vector Machines (QSVM):")
print("   - Uses quantum entanglement to map data into ultra-high-dimensional spaces.")
print("   - This 'Quantum Feature Map' makes complex non-linear classification easier.")
print("2. Variational Quantum Eigensolvers (VQE):")
print("   - A hybrid algorithm.")
print("   - A quantum circuit calculates a complex cost function.")
print("   - A classical optimizer adjusts the circuit parameters (weights) to minimize the cost.")
print("3. Quantum Neural Networks (QNN):")
print("   - Parameterized quantum circuits acting as layers in a neural network.")
print("\\nChallenge:")
print("Data input/output is slow. Getting huge classical datasets IN and OUT of a quantum state (QRAM) is currently a major bottleneck for QML.")`,
      content: {
        aim: {
          text: "To explore the integration of quantum computing into machine learning pipelines and understand the concepts of Quantum Feature Maps and Hybrid Algorithms.",
          bullets: []
        },
        theory: [
          {
            title: "Quantum Machine Learning",
            body: [
              "Quantum Machine Learning (QML) aims to utilize quantum computers to improve the speed or capability of AI and machine learning tasks.",
              "![QML workflow visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781864212/Classical_vs_quantum_neural_netw__202606191544_pyijkd.mp4)",
              "One major approach is the Quantum Support Vector Machine (QSVM). Classical SVMs map data to higher dimensions using the 'kernel trick'. Quantum feature maps use quantum entanglement to map data into an exponentially large Hilbert space, potentially uncovering patterns completely invisible to classical computers.",
              "Another approach is Hybrid Quantum-Classical algorithms like VQE or QAOA. In these, a parameterized quantum circuit evaluates a complex function, and a classical CPU uses gradient descent to adjust the circuit's parameters, combining the strengths of both architectures."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Review the printed overview of QML concepts.",
          "2. Note the three primary approaches: QSVM, VQE, and QNN.",
          "3. Understand the data I/O bottleneck currently holding back deep learning applications on quantum hardware."
        ],
        posttest: []
      }
    },
    {
      id: "qc-m5-5",
      title: "5. Real-World Applications",
      desc: "Interactive exploration dashboard of industry use-cases.",
      code: `print("--- Quantum Computing Industry Applications ---")
print("\\n1. Chemistry and Drug Discovery")
print("- Simulating complex molecules and proteins accurately.")
print("- Classical computers fail because the number of electron interactions grows exponentially.")
print("- Quantum computers simulate quantum mechanics natively!")

print("\\n2. Financial Modeling")
print("- Portfolio optimization and risk analysis.")
print("- Evaluating millions of financial pathways simultaneously using superposition.")

print("\\n3. Logistics and Supply Chain")
print("- Solving the Traveling Salesperson Problem and traffic routing.")
print("- QAOA (Quantum Approximate Optimization Algorithm) finds near-optimal paths in massive networks.")

print("\\n4. Materials Science")
print("- Discovering room-temperature superconductors.")
print("- Designing better, high-capacity batteries.")

print("\\n5. Cybersecurity")
print("- Threat: Breaking RSA encryption (Shor's Algorithm).")
print("- Solution: Creating unhackable networks using Quantum Key Distribution (BB84).")`,
      content: {
        aim: {
          text: "To survey the transformative real-world applications of quantum computing across various global industries.",
          bullets: []
        },
        theory: [
          {
            title: "Real-World Applications",
            body: [
              "Quantum computers are not designed to replace classical computers for everyday tasks like sending emails or playing video games. They are specialized coprocessors designed to solve specific problems that are intractable for classical machines.",
              "![Industry case-study animations](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781864210/Quantum_Computing_branches_diagram_202606191546_ddcvpc.mp4)",
              "As Richard Feynman noted, nature is quantum mechanical. Therefore, to simulate nature accurately (like molecular chemistry and drug interactions), we need a quantum computer. This is expected to be the first major commercial breakthrough.",
              "Other major areas include optimization (finance, logistics, traffic routing), where evaluating a massive number of permutations simultaneously provides an enormous advantage."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Read the output describing the 5 major industry applications.",
          "2. Reflect on how exponential speedups in optimization and simulation can disrupt these sectors.",
          "3. Understand the dual nature of cybersecurity: quantum computing creates a threat (Shor's) but provides a solution (QKD)."
        ],
        posttest: []
      }
    }
  ]
};
