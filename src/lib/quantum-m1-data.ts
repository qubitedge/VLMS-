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
          text: "To understand how tiny particles like electrons and light can behave both like a ball (a particle) and like a ripple in water (a wave) — and to see this strange behavior through the famous double-slit experiment.",
          bullets: []
        },
        theory: [
          {
            title: "Wave-Particle Duality",
            body: [
              "Imagine throwing a tennis ball at a wall with two holes in it. The ball goes through one hole and leaves one mark on the wall behind it. Simple, right? Now imagine doing the same thing with a tiny particle like an electron. Something weird happens — instead of leaving just one mark, it creates a striped pattern on the wall, just like waves in water would when they overlap and either boost or cancel each other out. This is called an interference pattern, and it shows that the electron was behaving like a wave, not a ball.",
              "![Double-slit animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781507208/Wave-particle_duality_animation___202606151224_bnn1ey.mp4)",
              "But here's where it gets even stranger: what if we place a tiny camera or detector at the two holes to watch which hole the electron goes through? The moment we try to \"spy\" on the electron, the stripe pattern completely disappears! Instead, we get just two plain clumps — exactly what you'd expect from a normal ball. The act of watching changed the result.",
              "This is called the Observer Effect — in the quantum world, simply observing a particle changes how it behaves. This mind-bending behavior is called wave-particle duality, meaning every tiny particle has a split personality: it can act like a wave or like a particle depending on whether we're watching it or not."
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
          text: "To learn how scientists use simple math to describe what a quantum particle is \"doing\" at any given moment, and to understand why probabilities are so important in the quantum world.",
          bullets: []
        },
        theory: [
          {
            title: "Quantum States",
            body: [
              "In everyday life, if you want to describe where something is or what it's doing, you just say it — \"the ball is on the table\" or \"the switch is OFF.\" But in the quantum world, things are far more uncertain. Scientists use something called a state vector, written as |ψ⟩ (pronounced \"psi\"), to describe a quantum particle. Think of it like a recipe card that tells you all the possible things a particle could be doing and how likely each one is.",
              "The simplest quantum object is called a qubit (like a quantum version of a computer's 0 or 1 bit). A qubit's state is written as: |ψ⟩ = α|0⟩ + β|1⟩",
              "![State vector visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781507208/Quantum_superposition_animation___202606151234_vnxpzx.mp4)",
              "Don't be scared by the symbols! Here's what it simply means: |0⟩ and |1⟩ are the two possible results you can get when you measure the qubit (like heads or tails on a coin). α and β are just numbers that tell you \"how much\" the qubit leans toward being a 0 or a 1. When you square those numbers (|α|² and |β|²), you get the actual probability — the chance — of getting each result.",
              "There's one golden rule though: the probabilities must always add up to 100% (or 1 in math terms). This makes sense — when you measure the qubit, it has to be something! This rule is called normalization, and it keeps our math connected to reality."
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
          text: "To understand how a quantum particle can be in multiple states at the same time, and to see how a simple quantum tool (the Hadamard gate) puts a particle into this \"both at once\" condition.",
          bullets: []
        },
        theory: [
          {
            title: "Quantum Superposition",
            body: [
              "Imagine a coin spinning in the air. While it's spinning, it's not really \"heads\" or \"tails\" — it's kind of both at the same time. The moment it lands and you look at it, it becomes one or the other. Quantum superposition works in exactly the same way, but it's not just a trick of not knowing — the particle genuinely exists in multiple states at once until you look at it.",
              "![Superposition animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781507210/Quantum_particle_in_scientific_lab_202606151226_ovqcsu.mp4)",
              "A qubit (a quantum particle used like a computer bit) can be in state |0⟩, state |1⟩, or a magical mix of both at the same time. This mixed state is superposition.",
              "To actually put a qubit into superposition, scientists use something called a Hadamard gate (or H-gate). Think of it like a \"quantum coin flipper.\" When you apply the H-gate to a qubit that starts as a definite |0⟩, it instantly enters a perfect 50/50 superposition called |+⟩. This means: if you measure it, there's exactly a 50% chance you'll get |0⟩ and exactly a 50% chance you'll get |1⟩.",
              "Nobody — not even the laws of physics — can tell you in advance which one you'll get. It's truly random. But the moment you measure it, the superposition instantly vanishes and the qubit \"picks a side.\""
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
          text: "To understand how measuring a quantum system permanently changes it, and to learn the simple rule (the Born Rule) that tells us the probability of each possible outcome.",
          bullets: []
        },
        theory: [
          {
            title: "Measurement and Wave Function Collapse",
            body: [
              "In everyday life, measuring something is harmless. You can check the temperature of a room without changing the temperature. But in the quantum world, measurement is violent — it completely and permanently changes the thing you're measuring.",
              "![Measurement collapse animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781508332/Quantum_measurement_qubit_collapse_202606151244_g4ea6x.mp4)",
              "Here's why: before you measure a quantum particle, it exists in superposition — a ghostly mix of multiple possible states all at once. The moment you measure it, this superposition instantly \"pops\" and the particle is forced to choose one definite state. This sudden change is called wave function collapse. It's like asking a spinning coin \"heads or tails?\" — the very act of asking forces it to pick one and stop spinning.",
              "How do we know which state it will collapse to? We use the Born Rule, named after physicist Max Born. It's simple: The probability of getting a particular result = the square of that state's probability amplitude. In plain English: take the number (α or β) attached to each possible state, square it, and you get the percentage chance of getting that result when you measure.",
              "The really important — and strange — thing is what happens after measurement. Once the particle has collapsed into a definite state, it stays there. Measure it again immediately and you'll get the exact same answer every time. The superposition is gone forever. There's no going back. This is what makes quantum measurement fundamentally different from anything in classical physics."
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
          text: "To understand why it is physically impossible — not just technically difficult, but impossible — to know both the exact position and exact speed of a particle at the same time.",
          bullets: []
        },
        theory: [
          {
            title: "Heisenberg's Uncertainty Principle",
            body: [
              "Imagine trying to take a photo of a fast-moving car at night. If you use a very fast shutter speed, you get a sharp, clear image of where the car is — but you can't tell how fast it was moving. If you use a slow shutter speed, the car appears as a blur — which actually tells you about its motion, but now you can't pin down exactly where it is. You can't get both perfectly at the same time.",
              "![Uncertainty visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781508331/Heisenberg_Uncertainty_Principle__202606151255_mwpalx.mp4)",
              "Werner Heisenberg discovered that nature has exactly this kind of built-in trade-off for tiny particles, and it's not because our cameras (or instruments) aren't good enough — it's a fundamental law of the universe. This is called the Heisenberg Uncertainty Principle, and it says: The more precisely you know a particle's position, the less precisely you can know its momentum (speed × mass) — and vice versa.",
              "The math behind it is: Δx × Δp ≥ ℏ/2, where Δx = the uncertainty in position (how fuzzy the location is), Δp = the uncertainty in momentum (how fuzzy the speed is), and ℏ = a tiny constant of nature (Planck's constant ÷ 2π).",
              "The reason this happens goes back to wave-particle duality. A particle behaves like a wave, and a wave that is very tightly squeezed into one location (so you know where it is) must be made up of many many different wavelengths mixed together — and each wavelength corresponds to a different speed. So the more you pin down the location, the more scrambled the speed becomes. It's not a flaw in our tools. It's how the universe is built."
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
