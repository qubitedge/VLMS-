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
            title: "The Black-Box Problem — Constant or Balanced?",
            body: [
              "Imagine a sealed box with a hidden function inside. You're told one thing for certain: this function is either Constant (it spits out the exact same answer — all 0s or all 1s — no matter what you feed it) or Balanced (it splits its answers exactly 50/50 between 0 and 1):",
              "• Your job is to figure out which type it is, without ever seeing inside the box",
              "• Classically, in the worst case, you'd need to check more than half of all possible inputs — `(2^N)/2 + 1` queries — before you could be 100% sure",
              "The Deutsch–Jozsa algorithm gets the answer with total certainty using just ONE query — no matter how big N is. That's not a small speedup; it's exponential."
            ]
          },
          {
            title: "Reading the Algorithm in Code",
            body: [
              "In our `code` cell, the setup does three things before we ever touch the hidden function:",
              "• `qc.x(1)` flips the ancilla (helper) qubit to |1⟩",
              "• `qc.h(0)` and `qc.h(1)` push both qubits into superposition — now we're effectively testing every input at once",
              "The line `qc.cx(0, 1)` is the oracle — the 'hidden function' itself, here implemented as a Balanced function using a simple CNOT gate. After a final `qc.h(0)` and `qc.measure(0, 0)`, quantum interference does the rest: a measured `'1'` means Balanced, a `'0'` means Constant. Running it confirms the result in exactly one shot, every time."
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
            title: "Finding a Needle in an Unsorted Haystack",
            body: [
              "Picture a phone book with a million names, but completely unsorted — no alphabetical order, nothing. You need to find one specific name:",
              "• Classically, there's no shortcut — you check entries one by one, averaging N/2 checks before finding it",
              "• For a million entries, that's roughly 500,000 checks on average",
              "Grover's algorithm, conceived by Lov Grover in 1996, slashes that down to just √N checks — about 1,000 checks for the same million-entry list."
            ]
          },
          {
            title: "Amplitude Amplification — Code Without the Circuit",
            body: [
              "Our `code` cell prints this comparison directly: `print(\"For N = 1,000,000, average queries = √1,000,000 = 1,000\")`. But how does the quantum version actually achieve this?",
              "• It starts every item in equal superposition — all candidates are 'equally likely' at first",
              "• An oracle flips the phase of just the correct item, tagging it as 'negative' without anyone looking at it directly",
              "A diffusion operator then reflects every amplitude about the average — and like a seesaw, this shrinks the wrong answers' amplitudes while growing the correct one's. Repeat this O(√N) times and the right answer becomes overwhelmingly likely to be measured. The print statement comparing `500,000 vs 1,000 queries` is exactly this quadratic speedup quantified."
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
            title: "Why Factoring Big Numbers Matters",
            body: [
              "Every time you see a padlock icon in your browser, you're trusting that factoring a giant number into its two prime components is practically impossible for a classical computer — that's the entire foundation of RSA encryption:",
              "• A 2048-bit number would take classical computers millions of years to factor",
              "• Shor's algorithm, devised by Peter Shor in 1994, can do it in a tiny fraction of that time",
              "This is why Shor's algorithm is considered one of the most consequential quantum algorithms ever discovered."
            ]
          },
          {
            title: "Turning Factoring Into Period-Finding",
            body: [
              "In our `code` cell, we set `N = 15` and pick a helper number `a = 7`. The real trick is rephrasing 'find the factors' as 'find the period':",
              "• The loop `for x in range(1, 10): val = (a**x) % N` is hunting for the smallest x where `7^x mod 15` loops back to 1",
              "• Classically, this period-finding loop is slow for large N — but the Quantum Fourier Transform (QFT) finds this exact period almost instantly",
              "Once the period `r` is found (here, `r = 4`), it's all classical math from there: `math.gcd(a**(r//2) - 1, N)` and `math.gcd(a**(r//2) + 1, N)` extract the actual prime factors — `3` and `5` — closing the loop between quantum speed and classical algebra."
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
            title: "Teaching AI to Think in Hilbert Space",
            body: [
              "Classical machine learning often struggles when patterns in data are too tangled for simple math to separate cleanly. Quantum Machine Learning (QML) asks: what if we used entanglement itself as the pattern-recognition tool?",
              "• A Quantum Support Vector Machine (QSVM) maps ordinary data into an exponentially large quantum space using a 'quantum feature map'",
              "• Patterns invisible to classical algorithms can become easy to separate once mapped into this richer space",
              "Our `code` cell's print statement, `Uses quantum entanglement to map data into ultra-high-dimensional spaces`, is describing exactly this — entanglement doing the heavy lifting that classical kernels struggle with."
            ]
          },
          {
            title: "Hybrid Algorithms — Quantum and Classical Working Together",
            body: [
              "Most practical QML today isn't 'fully quantum' — it's a handshake between a quantum circuit and a classical computer:",
              "• A Variational Quantum Eigensolver (VQE) uses a quantum circuit to calculate a cost function",
              "• A classical optimizer then tweaks the circuit's parameters, just like adjusting weights in a neural network",
              "This loop — quantum calculates, classical adjusts, repeat — is what our `code` cell calls a Quantum Neural Network (QNN) when used as a layer. The final printed warning about QRAM bottlenecks is a real, current limitation: getting massive datasets in and out of a quantum state is still slow, and is one of the biggest open challenges in the field."
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
            title: "Quantum Computers Aren't Here to Replace Your Laptop",
            body: [
              "It's tempting to imagine quantum computers as 'faster versions' of regular computers — but that's not the goal. They're specialized coprocessors, built to solve specific problems that classical machines genuinely cannot handle efficiently:",
              "• Richard Feynman observed that nature itself behaves quantum mechanically",
              "• So to simulate nature accurately — like molecules, proteins, and chemical reactions — you need a machine that thinks the same way nature does",
              "Our `code` cell's first printed section on Chemistry and Drug Discovery captures this directly: classical computers fail here because electron interactions grow exponentially, while a quantum computer handles that complexity natively."
            ]
          },
          {
            title: "From Finance to Cybersecurity — Where Quantum Hits Hardest",
            body: [
              "Beyond chemistry, the same quantum advantage of evaluating many possibilities simultaneously reshapes several other industries:",
              "• Financial Modeling — evaluating millions of portfolio pathways at once using superposition",
              "• Logistics — QAOA (Quantum Approximate Optimization Algorithm) finding near-optimal routes across massive networks, tackling problems like the Traveling Salesperson Problem",
              "And then there's the double-edged sword of Cybersecurity: the same quantum power that threatens to break RSA encryption via Shor's Algorithm also offers the fix — Quantum Key Distribution (BB84), creating networks that are provably unhackable rather than just difficult to hack."
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
