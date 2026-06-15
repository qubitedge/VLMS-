import type { Week } from "./course-data";

export const quantumModule1: Week = {
  title: "Module 1",
  objective: "Foundations of Quantum Physics",
  tutorial: "Lab 1: Quantum Physics Basics",
  labTitle: "Lab 1: Foundations of Quantum Physics",
  experiments: [
    {
      id: "qc-m1-1",
      title: "1. Wave-Particle Duality",
      desc: "Understand how quantum entities exhibit both wave and particle properties.",
      code: `import numpy as np
import matplotlib.pyplot as plt

# Simulate a double-slit interference pattern (1D)
x = np.linspace(-10, 10, 500)
wavelength = 1.0
slit_distance = 3.0

# Wave amplitudes from two slits
wave1 = np.cos(2 * np.pi * (x - slit_distance/2) / wavelength)
wave2 = np.cos(2 * np.pi * (x + slit_distance/2) / wavelength)

# Total intensity (interference)
intensity = (wave1 + wave2)**2

plt.figure(figsize=(8, 4))
plt.plot(x, intensity, color='cyan')
plt.title('Double-Slit Interference Pattern')
plt.xlabel('Screen Position')
plt.ylabel('Intensity')
plt.grid(True, alpha=0.3)
plt.show()

print("Interference pattern generated! The peaks represent high probability of detecting a particle (constructive interference).")`,
      content: {
        aim: {
          text: "To understand the dual nature of matter and light, demonstrating how particles can exhibit interference patterns similar to waves.",
          bullets: []
        },
        theory: [
          {
            title: "Wave-Particle Duality",
            body: [
              "Wave-particle duality is the concept in quantum mechanics that every particle or quantum entity may be described as either a particle or a wave.",
              "![Double-slit animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781507208/Wave-particle_duality_animation___202606151224_bnn1ey.mp4)",
              "In the classic double-slit experiment, when photons or electrons are fired at a barrier with two slits, they form an interference pattern on the screen behind the barrier. This happens even if they are fired one at a time, indicating that a single particle interferes with itself as a wave.",
              "However, if detectors are placed at the slits to observe which slit the particle passes through, the interference pattern disappears, and a clumped particle pattern emerges. This illustrates the observer effect."
            ]
          }
        ],
        pretest: [
          { question: "What does the double-slit experiment primarily demonstrate about quantum particles?", options: ["They are exclusively waves", "They are exclusively particles", "They exhibit both wave and particle characteristics", "They do not exist until measured"], answerIndex: 2 },
          { question: "If you place a detector to see which slit an electron goes through, what happens to the interference pattern on the screen?", options: ["It becomes sharper", "It disappears", "It doubles in size", "Nothing happens"], answerIndex: 1 },
          { question: "What is constructive interference?", options: ["When two waves cancel each other out", "When two waves add together to make a larger wave", "When a particle stops moving", "When light bends around an object"], answerIndex: 1 },
          { question: "Can a single electron fired through a double-slit create an interference pattern over time?", options: ["Yes", "No", "Only if it is heated", "Only in a vacuum"], answerIndex: 0 },
          { question: "Which scientist is famously associated with proposing that matter has wave-like properties (matter waves)?", options: ["Albert Einstein", "Isaac Newton", "Louis de Broglie", "Max Planck"], answerIndex: 2 }
        ],
        procedure: [
          "1. Run the Python simulator to visualize the mathematical interference of two waves.",
          "2. Observe the resulting intensity pattern.",
          "3. Notice the peaks (constructive interference) and troughs (destructive interference)."
        ],
        posttest: [
          { question: "In the context of the double-slit experiment, what does a peak in the interference pattern represent?", options: ["A location where the particle cannot be found", "A location with high probability of finding the particle", "The physical location of the slits", "The speed of the particle"], answerIndex: 1 },
          { question: "If the distance between the two slits is increased, what generally happens to the interference fringes?", options: ["They get closer together", "They get further apart", "They disappear", "They turn into a solid line"], answerIndex: 0 },
          { question: "Which equation relates a particle's wavelength to its momentum?", options: ["E = mc^2", "F = ma", "λ = h/p", "V = IR"], answerIndex: 2 },
          { question: "Why don't we observe wave-like behavior in everyday macroscopic objects like baseballs?", options: ["Because they don't have energy", "Because their wavelength is infinitesimally small", "Because they are not made of atoms", "Because gravity cancels the wave"], answerIndex: 1 },
          { question: "The collapse of the wave function occurs upon what action?", options: ["Acceleration", "Measurement or observation", "Interference", "Superposition"], answerIndex: 1 }
        ]
      }
    },
    {
      id: "qc-m1-2",
      title: "2. Quantum States",
      desc: "Representing information in complex Hilbert spaces.",
      code: `import numpy as np

# A state vector must have a magnitude of 1
# Let's create a state |psi> = alpha|0> + beta|1>
# Example: alpha = 1/sqrt(2), beta = 1/sqrt(2)

alpha = 1 / np.sqrt(2)
beta = 1 / np.sqrt(2)

state_vector = np.array([alpha, beta])

# Check normalization: |alpha|^2 + |beta|^2 should equal 1
probability_0 = np.abs(alpha)**2
probability_1 = np.abs(beta)**2
total_probability = probability_0 + probability_1

print(f"State Vector: [{alpha:.3f}, {beta:.3f}]")
print(f"Probability of measuring |0>: {probability_0:.3f}")
print(f"Probability of measuring |1>: {probability_1:.3f}")
print(f"Total Probability: {total_probability:.3f} (Must be exactly 1.0)")`,
      content: {
        aim: {
          text: "To mathematically represent quantum systems using state vectors and understand the normalization condition.",
          bullets: []
        },
        theory: [
          {
            title: "State Vectors",
            body: [
              "In quantum mechanics, the state of a system is represented by a state vector (often denoted by the Greek letter psi, |ψ⟩) living in a complex vector space known as a Hilbert space.",
              "![State vector visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781507208/Quantum_superposition_animation___202606151234_vnxpzx.mp4)",
              "A single qubit state can be written as |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex numbers called probability amplitudes.",
              "The absolute square of these amplitudes (|α|² and |β|²) gives the probability of finding the system in state |0⟩ or |1⟩ upon measurement. For the system to be physically valid, the total probability must sum to 1 (|α|² + |β|² = 1). This is known as normalization."
            ]
          }
        ],
        pretest: [
          { question: "What mathematical object is used to represent a quantum state?", options: ["A scalar", "A state vector", "A boolean value", "An integer"], answerIndex: 1 },
          { question: "What does the symbol |ψ⟩ represent?", options: ["A bra vector", "A ket vector", "A classical bit", "A logic gate"], answerIndex: 1 },
          { question: "What must the sum of the absolute squares of all probability amplitudes equal?", options: ["0", "0.5", "1", "Infinity"], answerIndex: 2 },
          { question: "What are α and β in the state equation |ψ⟩ = α|0⟩ + β|1⟩?", options: ["Classical bits", "Probability amplitudes", "Energies", "Frequencies"], answerIndex: 1 },
          { question: "Can a probability amplitude be a complex number?", options: ["Yes", "No", "Only for |0⟩", "Only for |1⟩"], answerIndex: 0 }
        ],
        procedure: [
          "1. Run the Python simulator.",
          "2. Observe how the probability amplitudes α and β are defined.",
          "3. Notice that their squares sum to exactly 1.0, satisfying the normalization requirement."
        ],
        posttest: [
          { question: "If a qubit's state is |1⟩, what are the values of |α|² and |β|² respectively?", options: ["1 and 0", "0 and 1", "0.5 and 0.5", "0 and 0"], answerIndex: 1 },
          { question: "What type of mathematical space do quantum state vectors reside in?", options: ["Euclidean Space", "Minkowski Space", "Hilbert Space", "Cartesian Space"], answerIndex: 2 },
          { question: "If α = √(3)/2, what must β be (assuming real positive amplitudes) for the state to be valid?", options: ["1/2", "1/4", "√(3)/2", "1"], answerIndex: 0 },
          { question: "What is the result of applying the born rule to a quantum state?", options: ["It rotates the state", "It provides the probabilities of measurement outcomes", "It entangles two qubits", "It clones the state"], answerIndex: 1 },
          { question: "Why is normalization necessary in quantum mechanics?", options: ["To make calculations harder", "Because total probability must be 100% (or 1)", "To prevent hardware errors", "Because bits can only be 0 or 1"], answerIndex: 1 }
        ]
      }
    },
    {
      id: "qc-m1-3",
      title: "3. Superposition",
      desc: "Simulating states that exist in multiple configurations simultaneously.",
      code: `try:
    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import Aer
    
    # Create a Quantum Circuit with 1 qubit and 1 classical bit
    qc = QuantumCircuit(1, 1)
    
    # Apply a Hadamard gate to put the qubit in superposition
    qc.h(0)
    
    # Measure the qubit
    qc.measure(0, 0)
    
    # Simulate the circuit 1000 times
    simulator = Aer.get_backend('qasm_simulator')
    compiled_circuit = transpile(qc, simulator)
    job = simulator.run(compiled_circuit, shots=1000)
    result = job.result()
    counts = result.get_counts(qc)
    
    print("Measurement results after placing qubit in superposition:")
    print(f"|0> observed: {counts.get('0', 0)} times")
    print(f"|1> observed: {counts.get('1', 0)} times")
    print("Notice it's roughly a 50/50 split!")
except ImportError:
    print("Qiskit is not installed in this environment. ")
    print("Simulating superposition mathematically...")
    import random
    zero_count = sum(1 for _ in range(1000) if random.random() < 0.5)
    one_count = 1000 - zero_count
    print("Measurement results after placing qubit in superposition (Simulated):")
    print(f"|0> observed: {zero_count} times")
    print(f"|1> observed: {one_count} times")
    print("Notice it's roughly a 50/50 split!")`,
      content: {
        aim: {
          text: "To create and measure a quantum state in superposition using quantum gates.",
          bullets: []
        },
        theory: [
          {
            title: "Quantum Superposition",
            body: [
              "Superposition is a fundamental principle of quantum mechanics that states a physical system exists in a combination of all its possible configurations until it is measured.",
              "![Superposition animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781507210/Quantum_particle_in_scientific_lab_202606151226_ovqcsu.mp4)",
              "For a qubit, this means it can be in state |0⟩, state |1⟩, or any combination of the two simultaneously.",
              "When we apply a Hadamard gate (H-gate) to a qubit initially in state |0⟩, it enters a state of perfect superposition, represented as |+⟩. If measured, it has exactly a 50% chance of collapsing into |0⟩ and a 50% chance of collapsing into |1⟩."
            ]
          }
        ],
        pretest: [
          { question: "What is quantum superposition?", options: ["The ability of a qubit to be copied", "A state existing in a combination of basis states simultaneously", "The absolute zero energy state", "A classical computing loop"], answerIndex: 1 },
          { question: "Which quantum gate is most commonly used to create an equal superposition from a basis state?", options: ["Pauli-X Gate", "CNOT Gate", "Hadamard (H) Gate", "Toffoli Gate"], answerIndex: 2 },
          { question: "If a qubit in perfect 50/50 superposition is measured, what will the output be?", options: ["Always 0", "Always 1", "0.5", "Either 0 or 1, purely randomly"], answerIndex: 3 },
          { question: "Does measuring a superimposed qubit preserve its superposition?", options: ["Yes", "No, it collapses", "Only if measured twice", "Only at low temperatures"], answerIndex: 1 },
          { question: "What does Schrödinger's cat thought experiment illustrate?", options: ["Entanglement", "Superposition and measurement collapse", "Quantum teleportation", "Classical mechanics"], answerIndex: 1 }
        ],
        procedure: [
          "1. Run the quantum circuit code.",
          "2. The code applies an H-gate to a single qubit.",
          "3. The circuit is executed 1000 times (shots).",
          "4. Observe the counts for '0' and '1', noting the ~50% probability distribution."
        ],
        posttest: [
          { question: "If you run a superposition circuit 10,000 times, roughly how many times will you measure '0'?", options: ["10,000", "0", "5,000", "2,500"], answerIndex: 2 },
          { question: "The state created by applying a Hadamard gate to |0⟩ is known as:", options: ["The |1⟩ state", "The |+⟩ state", "The |-⟩ state", "The Bell state"], answerIndex: 1 },
          { question: "Can a classical bit be in superposition?", options: ["Yes", "No", "Only inside a CPU", "Only if it is turned off"], answerIndex: 1 },
          { question: "What limits our ability to predict the exact outcome of a single superposition measurement?", options: ["Poorly calibrated equipment", "The inherent probabilistic nature of quantum mechanics", "External noise", "The speed of light"], answerIndex: 1 },
          { question: "What happens if you apply two Hadamard gates in a row (H then H) to a qubit initially in |0⟩?", options: ["It stays in superposition forever", "It returns to the |0⟩ state", "It flips to the |1⟩ state", "It becomes entangled"], answerIndex: 1 }
        ]
      }
    },
    {
      id: "qc-m1-4",
      title: "4. Quantum Measurement",
      desc: "Investigate the collapse of the wave function upon observation.",
      code: `import numpy as np
import matplotlib.pyplot as plt

# We have a qubit in state: sqrt(0.8)|0> + sqrt(0.2)|1>
prob_0 = 0.8
prob_1 = 0.2

# We perform 100 sequential measurements on identically prepared qubits
measurements = np.random.choice([0, 1], size=100, p=[prob_0, prob_1])

count_0 = np.sum(measurements == 0)
count_1 = np.sum(measurements == 1)

print(f"Out of 100 measurements:")
print(f"Collapsed to 0: {count_0} times")
print(f"Collapsed to 1: {count_1} times")

# Plotting the collapse
plt.bar(['State |0>', 'State |1>'], [count_0, count_1], color=['blue', 'red'])
plt.title('Measurement Collapse Frequency')
plt.ylabel('Number of Occurrences')
plt.show()`,
      content: {
        aim: {
          text: "To understand the irreversible nature of quantum measurement and the Born rule for probability.",
          bullets: []
        },
        theory: [
          {
            title: "Measurement and Wave Function Collapse",
            body: [
              "Measurement in quantum mechanics is not a passive observation; it is an active physical process that alters the state of the system.",
              "![Measurement collapse animation](/videos/quantum_measurement.mp4)",
              "When a quantum system in superposition is measured, its wave function 'collapses' into one of the definite eigenstates of the observable being measured.",
              "The probability of collapsing into a specific state is given by the Born rule: the square of the absolute value of the state's probability amplitude.",
              "Once measured, the qubit is completely classical. If you measure it again immediately, it will return the exact same value 100% of the time. The pre-measurement superposition is permanently lost."
            ]
          }
        ],
        pretest: [
          { question: "What happens to a quantum state when it is measured?", options: ["It becomes more complex", "It collapses to a single definite state", "It entangles with the observer", "It duplicates itself"], answerIndex: 1 },
          { question: "Which rule calculates the probability of a measurement outcome?", options: ["Einstein's rule", "Born rule", "Heisenberg rule", "Dirac rule"], answerIndex: 1 },
          { question: "If you measure a qubit and get '1', what will you get if you measure it again immediately?", options: ["0", "1", "A random result", "It is impossible to measure twice"], answerIndex: 1 },
          { question: "Is quantum measurement a reversible process?", options: ["Yes, always", "Yes, with the right gates", "No, it is irreversible", "Only in a vacuum"], answerIndex: 2 },
          { question: "What information is lost during a quantum measurement?", options: ["The final state", "The phase and probability amplitudes of the original superposition", "The mass of the particle", "The energy of the particle"], answerIndex: 1 }
        ],
        procedure: [
          "1. Run the Python simulator defining a biased quantum state (80% |0⟩, 20% |1⟩).",
          "2. The code simulates measuring 100 identical states.",
          "3. Observe that the outcomes distribute according to the predefined probabilities, reflecting the Born rule."
        ],
        posttest: [
          { question: "If a state is |ψ⟩ = 0.6|0⟩ + 0.8|1⟩, what is the probability of measuring 0?", options: ["60%", "36%", "80%", "64%"], answerIndex: 1 },
          { question: "What is the probability of measuring 1 for the state |ψ⟩ = 0.6|0⟩ + 0.8|1⟩?", options: ["80%", "64%", "36%", "100%"], answerIndex: 1 },
          { question: "Why is copying unknown quantum states impossible?", options: ["Because computers are not fast enough", "Due to the No-Cloning Theorem, rooted in measurement collapse", "Because qubits are too small", "Because copying violates energy conservation"], answerIndex: 1 },
          { question: "In the Bloch sphere, measurement is equivalent to projecting the state vector onto which axis?", options: ["X-axis", "Y-axis", "Z-axis", "Time axis"], answerIndex: 2 },
          { question: "Does observing a quantum system change its state?", options: ["No, observation is passive", "Yes, observation causes collapse", "Only if light is shining on it", "Only if it is a photon"], answerIndex: 1 }
        ]
      }
    },
    {
      id: "qc-m1-5",
      title: "5. Uncertainty Principle",
      desc: "Explore Heisenberg's Uncertainty Principle interactively.",
      code: `import numpy as np
import matplotlib.pyplot as plt

# Simulate a wave packet (particle's position probability)
x = np.linspace(-10, 10, 1000)

def wave_packet(x, width):
    # Gaussian envelope (position certainty)
    return np.exp(-(x**2) / (2 * width**2))

# Narrow width = high certainty in position
width_narrow = 0.5
packet_narrow = wave_packet(x, width_narrow)

# Wide width = low certainty in position
width_wide = 3.0
packet_wide = wave_packet(x, width_wide)

plt.figure(figsize=(10, 4))
plt.plot(x, packet_narrow, label='Highly Localized (Certain Position)', color='blue')
plt.plot(x, packet_wide, label='Spread Out (Uncertain Position)', color='red')
plt.title('Position Probability Wave Packets')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print("Heisenberg's Uncertainty Principle: Δx * Δp >= h_bar / 2")
print("The blue curve has low Δx (certain position), meaning its momentum Δp MUST be highly uncertain.")
print("The red curve has high Δx (uncertain position), allowing for a more certain momentum Δp.")`,
      content: {
        aim: {
          text: "To visualize and understand the fundamental limits of precision defined by Heisenberg's Uncertainty Principle.",
          bullets: []
        },
        theory: [
          {
            title: "Heisenberg's Uncertainty Principle",
            body: [
              "Formulated by Werner Heisenberg, the Uncertainty Principle states that there is a fundamental limit to the precision with which certain pairs of physical properties, such as position (x) and momentum (p), can be known simultaneously.",
              "![Uncertainty visualization](/videos/quantum_uncertainty.mp4)",
              "The mathematical formulation is Δx * Δp ≥ ℏ/2.",
              "This is not a limitation of our measuring instruments, but an intrinsic property of nature stemming from wave-particle duality. If a particle's position is highly localized (a sharp wave pulse), it requires the superposition of many different wavelengths (high momentum uncertainty) to construct that shape."
            ]
          }
        ],
        pretest: [
          { question: "Which two properties are classically paired in Heisenberg's Uncertainty Principle?", options: ["Mass and Energy", "Position and Momentum", "Time and Temperature", "Charge and Spin"], answerIndex: 1 },
          { question: "If you know a particle's exact position with 100% certainty, what do you know about its momentum?", options: ["It is also 100% certain", "It is zero", "It is completely unknown (infinite uncertainty)", "It equals its mass"], answerIndex: 2 },
          { question: "Is the uncertainty principle caused by poorly calibrated measuring tools?", options: ["Yes", "No, it is a fundamental property of nature", "Only in older microscopes", "Yes, due to air resistance"], answerIndex: 1 },
          { question: "What is the symbol 'ℏ' (h-bar) in the uncertainty equation?", options: ["Speed of light", "Gravitational constant", "Reduced Planck constant", "Boltzmann constant"], answerIndex: 2 },
          { question: "Which property of waves creates the uncertainty principle?", options: ["Refraction", "Diffraction", "Wave packets requiring multiple frequencies to localize", "Doppler effect"], answerIndex: 2 }
        ],
        procedure: [
          "1. Run the Python visualization code.",
          "2. Compare the narrow wave packet (blue) with the wide wave packet (red).",
          "3. Understand that a narrower position graph mathematically demands a wider momentum graph due to Fourier transforms."
        ],
        posttest: [
          { question: "According to the simulator output, which wave packet has a highly uncertain momentum?", options: ["The spread-out red wave packet", "The highly localized blue wave packet", "Both have the same momentum uncertainty", "Neither"], answerIndex: 1 },
          { question: "Can we ever measure both position and momentum with zero error simultaneously?", options: ["Yes, with quantum computers", "Yes, at absolute zero temperature", "No, nature forbids it", "Only for photons"], answerIndex: 2 },
          { question: "Besides position and momentum, which other pair of variables obeys an uncertainty relation?", options: ["Energy and Time", "Mass and Charge", "Temperature and Volume", "Speed and Color"], answerIndex: 0 },
          { question: "If the uncertainty in momentum (Δp) decreases, what must happen to the uncertainty in position (Δx)?", options: ["It decreases", "It stays the same", "It increases", "It becomes zero"], answerIndex: 2 },
          { question: "Why don't cars and baseballs seem to obey the uncertainty principle?", options: ["Because they don't have momentum", "Because Planck's constant is so small that the uncertainty is imperceptible for massive objects", "Because classical physics is a hoax", "Because they are not moving fast enough"], answerIndex: 1 }
        ]
      }
    }
  ]
};
