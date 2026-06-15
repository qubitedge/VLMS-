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
              "![Algorithm flow visualization](/videos/quantum_deutsch_jozsa.mp4)",
              "Imagine a hidden function that takes a binary string as input and outputs a single 0 or 1. You are guaranteed that this function is either completely 'Constant' (outputs the same thing for every input) or perfectly 'Balanced' (outputs 0 for half the inputs and 1 for the other half).",
              "Classically, if you have N bits of input, you might have to query the function (2^N)/2 + 1 times in the worst case to be 100% sure if it's constant or balanced.",
              "By putting all input bits into a superposition and utilizing quantum interference, the Deutsch-Jozsa algorithm determines the answer with 100% certainty in exactly ONE query, proving an exponential quantum speedup."
            ]
          }
        ],
        pretest: [
          { question: "What kind of problem does the Deutsch-Jozsa algorithm solve?", options: ["Factoring numbers", "Sorting lists", "Black-box function evaluation (Constant vs Balanced)", "Finding the shortest path"], answerIndex: 2 },
          { question: "How many queries does the classical algorithm need in the worst-case scenario for an N-bit input?", options: ["1", "N", "(2^N)/2 + 1", "2^N"], answerIndex: 2 },
          { question: "How many queries does the quantum Deutsch-Jozsa algorithm need?", options: ["Exactly 1", "N", "(2^N)/2", "2"], answerIndex: 0 },
          { question: "What does a 'Constant' function do?", options: ["Returns the input unchanged", "Returns random numbers", "Always returns the same output (all 0s or all 1s)", "Outputs 0 half the time and 1 half the time"], answerIndex: 2 },
          { question: "What mechanism is primarily responsible for the speedup in this algorithm?", options: ["Faster clock speeds", "Quantum interference (phase kickback)", "More RAM", "Classical parallel processing"], answerIndex: 1 }
        ],
        procedure: [
          "1. Run the Deutsch-Jozsa simulator code.",
          "2. The code sets up an ancilla (helper) qubit in the |-⟩ state.",
          "3. It passes the input through a 'Balanced' oracle (a simple CNOT).",
          "4. After measuring the input qubit, observe that it deterministically outputs '1', proving the function is balanced in one shot."
        ],
        posttest: [
          { question: "In the simulator circuit, why do we apply an X gate and then an H gate to the ancilla (qubit 1)?", options: ["To make it measure as 1", "To put it into the |-⟩ state, which enables 'phase kickback' from the oracle", "To erase its memory", "To entangle it"], answerIndex: 1 },
          { question: "What is the output of the DJ algorithm if the oracle function is Constant?", options: ["All 1s", "All 0s", "A random mix", "It crashes"], answerIndex: 1 },
          { question: "What does the oracle representing a Constant f(x)=0 look like in a quantum circuit?", options: ["A CNOT gate", "Nothing (identity matrix on the data wires)", "An X gate", "A measurement gate"], answerIndex: 1 },
          { question: "Is the Deutsch-Jozsa algorithm widely used in real-world commercial applications?", options: ["Yes, for banking", "No, it is primarily an academic proof-of-concept for quantum speedup", "Yes, for machine learning", "Yes, for video games"], answerIndex: 1 },
          { question: "What mathematical property allows the probabilities of the wrong answers to cancel each other out in this algorithm?", options: ["Constructive interference", "Destructive interference (caused by negative phases)", "Decoherence", "Superposition"], answerIndex: 1 }
        ]
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
              "![Search amplification animation](/videos/quantum_grover.mp4)",
              "Classically, searching an unsorted list requires checking each item one by one, taking O(N) time.",
              "Grover's algorithm initializes a superposition of all possible items. It then iteratively applies an oracle that 'tags' the correct item with a negative phase.",
              "Following the oracle, a 'diffusion operator' performs 'amplitude amplification', which shrinks the probability of the wrong items and grows the probability of the correct item.",
              "This finds the target in O(√N) steps, offering a quadratic speedup."
            ]
          }
        ],
        pretest: [
          { question: "What is the primary use case for Grover's algorithm?", options: ["Sorting a list", "Searching an unsorted database", "Multiplying numbers", "Compressing files"], answerIndex: 1 },
          { question: "What kind of speedup does Grover's algorithm provide over classical search?", options: ["No speedup", "Linear speedup", "Quadratic speedup", "Exponential speedup"], answerIndex: 2 },
          { question: "If a classical search takes N steps, how many steps does Grover's algorithm take?", options: ["N/2", "N^2", "√N", "log(N)"], answerIndex: 2 },
          { question: "What is the core technique used in Grover's algorithm to boost the correct answer?", options: ["Amplitude Amplification", "Error Correction", "Quantum Teleportation", "Machine Learning"], answerIndex: 0 },
          { question: "What does the Grover oracle do to the target item's amplitude?", options: ["Makes it zero", "Multiplies it by -1 (phase flip)", "Adds 1 to it", "Deletes it"], answerIndex: 1 }
        ],
        procedure: [
          "1. Read the mathematical comparison generated by the script.",
          "2. Compare the classical steps (500,000) vs the quantum steps (1,000) for N=1,000,000.",
          "3. Understand that while this isn't exponential, for N=1 trillion, classical takes 500 billion steps while quantum takes only 1 million."
        ],
        posttest: [
          { question: "What happens during 'inversion about the mean' in amplitude amplification?", options: ["All amplitudes become equal", "The negative amplitude (the target) grows significantly larger positively, while others shrink", "All amplitudes become negative", "The mean becomes zero"], answerIndex: 1 },
          { question: "What happens if you run the Grover iterations too many times?", options: ["It works perfectly", "The probability of the correct answer will actually start decreasing ('overshooting')", "The computer crashes", "It turns into Shor's algorithm"], answerIndex: 1 },
          { question: "Can Grover's algorithm be used to 'brute force' crack symmetric encryption keys like AES?", options: ["No, it has no cryptographic applications", "Yes, it effectively halves the key size (e.g., AES-256 is reduced to AES-128 strength)", "Yes, it breaks it instantly", "Only if you know the password"], answerIndex: 1 },
          { question: "What state do all qubits start in before the first Grover iteration?", options: ["An equal superposition of all possible states", "All |0⟩", "All |1⟩", "An entangled Bell state"], answerIndex: 0 },
          { question: "Unlike Shor's algorithm, Grover's algorithm relies entirely on:", options: ["Quantum Fourier Transform", "Amplitude Amplification", "Teleportation", "RSA encryption"], answerIndex: 1 }
        ]
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
              "![Factorization visualization](/videos/quantum_shors.mp4)",
              "Modern cryptography (like RSA used in secure web browsing) relies entirely on the assumption that factoring very large numbers (e.g., 2048-bit numbers) is practically impossible for classical computers, taking millions of years.",
              "Shor's algorithm breaks the factoring problem down into a 'period finding' problem. It uses the Quantum Fourier Transform (QFT) to find this period almost instantly.",
              "Once the period is found quantumly, simple classical mathematics (Greatest Common Divisor) extracts the prime factors, breaking the encryption."
            ]
          }
        ],
        pretest: [
          { question: "What is the primary function of Shor's algorithm?", options: ["To sort lists", "To factor large integers into primes", "To encrypt data", "To teleport information"], answerIndex: 1 },
          { question: "Which major cryptographic system is threatened by Shor's algorithm?", options: ["AES", "RSA (Public-Key Cryptography)", "SHA-256", "Quantum Key Distribution"], answerIndex: 1 },
          { question: "What kind of speedup does Shor's algorithm provide?", options: ["Linear", "Quadratic", "Exponential", "No speedup"], answerIndex: 2 },
          { question: "Shor's algorithm reduces the problem of factoring to what other mathematical problem?", options: ["Matrix multiplication", "Finding the period of a modular exponentiation function", "Solving a quadratic equation", "Finding the shortest path"], answerIndex: 1 },
          { question: "Which quantum subroutine is critical to Shor's period-finding?", options: ["Grover Iterator", "Quantum Fourier Transform (QFT)", "Hadamard Transform", "Quantum Teleportation"], answerIndex: 1 }
        ],
        procedure: [
          "1. Run the Python demonstration script.",
          "2. Review the output showing the hybrid classical-quantum approach.",
          "3. See how the sequence 7^x mod 15 repeats its pattern, and the period 'r' is found to be 4.",
          "4. Observe the final classical algebra step that successfully factors 15 into 3 and 5."
        ],
        posttest: [
          { question: "In the algorithm, if the period 'r' is found to be an odd number, what must happen?", options: ["The factors are negative", "The algorithm succeeds anyway", "The algorithm fails for that guess, and must be restarted with a new random 'a'", "The computer breaks"], answerIndex: 2 },
          { question: "Why hasn't Shor's algorithm broken the internet yet?", options: ["Because RSA was updated to block it", "Because building a fault-tolerant quantum computer with enough qubits (millions) is currently beyond our hardware capabilities", "Because the math was proven wrong", "Because it's illegal"], answerIndex: 1 },
          { question: "What is Post-Quantum Cryptography (PQC)?", options: ["Encryption using qubits", "Classical encryption algorithms designed to be secure against both classical AND quantum computer attacks", "Encryption that is no longer secure", "A brand of quantum hardware"], answerIndex: 1 },
          { question: "Which algorithm provides an exponential speedup: Shor's or Grover's?", options: ["Both", "Neither", "Grover's", "Shor's"], answerIndex: 3 },
          { question: "What is the time complexity of Shor's algorithm?", options: ["O(2^N)", "Polynomial time O(N^3)", "O(1)", "O(N!)"], answerIndex: 1 }
        ]
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
              "![QML workflow visualization](/videos/quantum_qml.mp4)",
              "One major approach is the Quantum Support Vector Machine (QSVM). Classical SVMs map data to higher dimensions using the 'kernel trick'. Quantum feature maps use quantum entanglement to map data into an exponentially large Hilbert space, potentially uncovering patterns completely invisible to classical computers.",
              "Another approach is Hybrid Quantum-Classical algorithms like VQE or QAOA. In these, a parameterized quantum circuit evaluates a complex function, and a classical CPU uses gradient descent to adjust the circuit's parameters, combining the strengths of both architectures."
            ]
          }
        ],
        pretest: [
          { question: "What does QML stand for?", options: ["Quantum Measurement Logic", "Quantum Machine Learning", "Quick Math Library", "Quantum Matrix Loop"], answerIndex: 1 },
          { question: "What is a 'hybrid' quantum-classical algorithm?", options: ["An algorithm that runs half on Mac and half on PC", "An algorithm where a quantum processor handles a specific hard calculation, and a classical processor handles optimization/control", "An algorithm written in two programming languages", "A classical algorithm simulating quantum mechanics"], answerIndex: 1 },
          { question: "What is the purpose of a Quantum Feature Map in QSVM?", options: ["To display a map on the screen", "To store data permanently", "To map classical data into a highly complex, entangled quantum state space to find boundaries", "To compress images"], answerIndex: 2 },
          { question: "What is one of the major current bottlenecks for QML?", options: ["Quantum computers are too fast", "Loading massive amounts of classical data into quantum states (the I/O problem)", "Machine learning is obsolete", "Python is too slow"], answerIndex: 1 },
          { question: "What does VQE stand for?", options: ["Vector Quantum Encoding", "Visual Quantum Environment", "Variational Quantum Eigensolver", "Virtual Qubit Engine"], answerIndex: 2 }
        ],
        procedure: [
          "1. Review the printed overview of QML concepts.",
          "2. Note the three primary approaches: QSVM, VQE, and QNN.",
          "3. Understand the data I/O bottleneck currently holding back deep learning applications on quantum hardware."
        ],
        posttest: [
          { question: "In a Parameterized Quantum Circuit (PQC) used as a Quantum Neural Network, what corresponds to the 'weights' in a classical neural net?", options: ["The number of qubits", "The rotation angles of the quantum gates", "The temperature of the cryostat", "The measurement results"], answerIndex: 1 },
          { question: "What classical technique is often paired with a quantum circuit in hybrid algorithms to minimize the cost function?", options: ["Gradient descent / optimization", "Binary search", "Quick sort", "Hashing"], answerIndex: 0 },
          { question: "Why is a quantum state space advantageous for classification tasks?", options: ["It is smaller and easier to manage", "It provides access to a much larger, multi-dimensional feature space due to superposition and entanglement", "It doesn't require electricity", "It prevents overfitting"], answerIndex: 1 },
          { question: "What is QRAM?", options: ["Quantum Random Access Memory (theoretical hardware for fast data loading)", "Quantum Read-Only Memory", "Quantum Router Allocation Method", "A software library"], answerIndex: 0 },
          { question: "Which is a more realistic near-term application of QML?", options: ["Training ChatGPT entirely on a quantum computer", "Classifying highly complex, small-dataset quantum chemistry states using hybrid algorithms", "Replacing all classical GPUs", "Sorting emails"], answerIndex: 1 }
        ]
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
              "![Industry case-study animations](/videos/quantum_applications.mp4)",
              "As Richard Feynman noted, nature is quantum mechanical. Therefore, to simulate nature accurately (like molecular chemistry and drug interactions), we need a quantum computer. This is expected to be the first major commercial breakthrough.",
              "Other major areas include optimization (finance, logistics, traffic routing), where evaluating a massive number of permutations simultaneously provides an enormous advantage."
            ]
          }
        ],
        pretest: [
          { question: "Are quantum computers expected to replace classical computers for all tasks?", options: ["Yes, entirely", "No, they will likely act as specialized coprocessors for specific complex problems", "Only for smartphones", "Yes, within 5 years"], answerIndex: 1 },
          { question: "Why are classical computers bad at simulating complex molecules?", options: ["They don't have the right software", "The number of quantum interactions between electrons grows exponentially, quickly overwhelming classical RAM", "Chemists don't know how to code", "Classical computers are too hot"], answerIndex: 1 },
          { question: "Who famously said, 'Nature isn't classical, dammit, and if you want to make a simulation of nature, you'd better make it quantum mechanical'?", options: ["Albert Einstein", "Richard Feynman", "Stephen Hawking", "Niels Bohr"], answerIndex: 1 },
          { question: "What is QAOA primarily used for?", options: ["Factoring numbers", "Approximate optimization problems (like logistics)", "Sending emails", "Drawing graphics"], answerIndex: 1 },
          { question: "How will quantum computing impact the battery industry?", options: ["By making batteries obsolete", "By accurately simulating new molecular structures for higher capacity and efficiency", "By using batteries to power the qubits", "It won't"], answerIndex: 1 }
        ],
        procedure: [
          "1. Read the output describing the 5 major industry applications.",
          "2. Reflect on how exponential speedups in optimization and simulation can disrupt these sectors.",
          "3. Understand the dual nature of cybersecurity: quantum computing creates a threat (Shor's) but provides a solution (QKD)."
        ],
        posttest: [
          { question: "In logistics, what classic mathematical problem are quantum algorithms trying to optimize?", options: ["The Pythagorean theorem", "The Traveling Salesperson Problem (routing)", "Long division", "Calculus integrals"], answerIndex: 1 },
          { question: "What is the primary quantum advantage in financial modeling?", options: ["Printing digital money", "Evaluating vast numbers of market scenarios and risk pathways simultaneously", "Making the stock market predictable 100% of the time", "Replacing accountants"], answerIndex: 1 },
          { question: "Why is drug discovery currently so slow and expensive?", options: ["Because real-world lab synthesis and trial-and-error are required since classical computers cannot perfectly simulate complex proteins", "Because the FDA requires quantum computers", "Because there aren't enough scientists", "Because computers cannot process 3D images"], answerIndex: 0 },
          { question: "Which industry will likely see the *first* commercially valuable quantum advantage?", options: ["Video game rendering", "Materials Science and Chemistry simulation", "Web browsing", "Word processing"], answerIndex: 1 },
          { question: "What term describes the point where a quantum computer can perform a calculation that is practically impossible for any classical computer?", options: ["Quantum Supremacy (or Quantum Advantage)", "Quantum Leap", "The Singularity", "Quantum Entanglement"], answerIndex: 0 }
        ]
      }
    }
  ]
};
