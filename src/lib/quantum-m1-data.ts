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
            title: "What Does It Mean to Be Both a Wave and a Particle?",
            body: [
              "Imagine throwing a tennis ball at a wall with two holes in it. The ball goes through one hole and leaves a single mark behind it. Simple, right? Now do the same thing with a tiny particle like an electron, and something weird happens:",
              "![Double-slit animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781507208/Wave-particle_duality_animation___202606151224_bnn1ey.mp4)",
              "• Instead of one mark, the electron leaves a striped pattern on the wall — exactly like overlapping water ripples that boost each other in some places and cancel out in others",
              "• This striped pattern is called an interference pattern, and it's the signature of wave-like behavior",
              "In our `code` cell, this is exactly what `wave1` and `wave2` represent — two cosine waves spreading out from each slit. When we add them together and square the result (`intensity = (wave1 + wave2)**2`), we get the same striped pattern nature gives us. The peaks in that plot are the bright stripes — spots where a particle is most likely to land."
            ]
          },
          {
            title: "The Observer Effect — Watching Changes the Outcome",
            body: [
              "Here's where it gets stranger. What if we place a tiny detector at the slits to see which one the electron actually goes through?",
              "• The moment we 'spy' on the electron, the stripes vanish",
              "• Instead, we get two plain clumps — exactly what a normal ball would do",
              "This is the Observer Effect: simply observing a quantum particle changes how it behaves. The takeaway is wave-particle duality — every tiny particle has a split personality, behaving like a wave when unobserved and like a particle the instant we look."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the Python simulator to visualize the mathematical interference of two waves.",
          "2. Observe the resulting intensity pattern.",
          "3. Notice the peaks (constructive interference) and troughs (destructive interference)."
        ],
        posttest: []
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
            title: "Describing a Particle With a Recipe Card",
            body: [
              "In everyday life, describing something is easy — 'the ball is on the table.' In the quantum world, things are far less certain, so physicists use a state vector, written |ψ⟩ ('psi'), to describe a particle:",
              "• Think of |ψ⟩ as a recipe card listing every possible outcome and how likely each one is",
              "![State vector visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781507208/Quantum_superposition_animation___202606151234_vnxpzx.mp4)",
              "• The simplest quantum object — a qubit — has a state written as |ψ⟩ = α|0⟩ + β|1⟩",
              "In the `code` cell, `alpha` and `beta` are exactly these two numbers. `state_vector = np.array([alpha, beta])` is the actual |ψ⟩ written in code — a list holding how much the qubit 'leans' toward 0 versus 1."
            ]
          },
          {
            title: "Turning Amplitudes Into Real Probabilities",
            body: [
              "α and β aren't probabilities themselves — they're probability amplitudes. To get an actual chance of an outcome, you square them:",
              "• `probability_0 = np.abs(alpha)**2` is literally |α|², the chance of measuring |0⟩",
              "• `probability_1 = np.abs(beta)**2` is |β|², the chance of measuring |1⟩",
              "There's one unbreakable rule: every probability must add up to exactly 100% (1.0 in math). This is normalization — checked in code by `total_probability = probability_0 + probability_1`, which must always print as 1.000. It makes sense: when you finally measure the qubit, it has to be something."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the Python simulator.",
          "2. Observe how the probability amplitudes α and β are defined.",
          "3. Notice that their squares sum to exactly 1.0, satisfying the normalization requirement."
        ],
        posttest: []
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
            title: "A Coin That's Both Heads and Tails Mid-Air",
            body: [
              "Picture a coin spinning in the air. While it spins, it isn't really 'heads' or 'tails' — it's kind of both at once. The instant it lands, it becomes one or the other. Quantum superposition works the same way, except it's not just our ignorance — the particle truly exists in multiple states simultaneously until measured.",
              "![Superposition animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781507210/Quantum_particle_in_scientific_lab_202606151226_ovqcsu.mp4)",
              "A qubit can sit in state |0⟩, state |1⟩, or a magical mix of both — that mix is superposition."
            ]
          },
          {
            title: "The Hadamard Gate — Our Quantum Coin Flipper",
            body: [
              "To actually create superposition, we use a Hadamard gate, written in code as `qc.h(0)`:",
              "• Before the gate: the qubit starts as a definite |0⟩",
              "• After `qc.h(0)`: the qubit enters a perfect 50/50 superposition called |+⟩",
              "The line `qc.measure(0, 0)` then collapses that superposition — forcing the qubit to 'pick a side.' Running the circuit `1000` times (`shots=1000`) and tallying `counts.get('0', 0)` versus `counts.get('1', 0)` shows the result: roughly a 50/50 split, with no way to predict any single outcome in advance."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the quantum circuit code.",
          "2. The code applies an H-gate to a single qubit.",
          "3. The circuit is executed 1000 times (shots).",
          "4. Observe the counts for '0' and '1', noting the ~50% probability distribution."
        ],
        posttest: []
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
            title: "Measurement Isn't Gentle — It's Permanent",
            body: [
              "Checking a room's temperature doesn't change the room. But in the quantum world, measurement is violent — it permanently changes the thing being measured:",
              "![Measurement collapse animation](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781508332/Quantum_measurement_qubit_collapse_202606151244_g4ea6x.mp4)",
              "• Before measuring, a particle exists in superposition — a ghostly mix of states",
              "• The instant you measure it, the superposition 'pops' and the particle is forced into one definite state",
              "This sudden change is wave function collapse — like asking a spinning coin 'heads or tails?' and forcing it to stop and answer."
            ]
          },
          {
            title: "The Born Rule — Predicting Which Way It Collapses",
            body: [
              "How do we know the odds of each outcome? The Born Rule: square the probability amplitude to get the percentage chance.",
              "• In our `code` cell, `prob_0 = 0.8` and `prob_1 = 0.2` are these exact probabilities, already squared and ready to use",
              "• `measurements = np.random.choice([0, 1], size=100, p=[prob_0, prob_1])` simulates 100 separate quantum measurements, each one obeying the Born Rule",
              "The bar chart built from `count_0` and `count_1` shows the result settling in close to 80 and 20 — and once a qubit collapses to a result, measuring it again immediately gives the same answer every time. There's no going back."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the Python simulator defining a biased quantum state (80% |0⟩, 20% |1⟩).",
          "2. The code simulates measuring 100 identical states.",
          "3. Observe that the outcomes distribute according to the predefined probabilities, reflecting the Born rule."
        ],
        posttest: []
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
            title: "The Camera Shutter Problem",
            body: [
              "Imagine photographing a speeding car at night. A fast shutter gives a sharp picture of where the car is — but tells you nothing about how fast it's moving. A slow shutter captures motion as a blur — but now you can't pin down its exact position. You can never get both perfectly at once.",
              "![Uncertainty visualization](https://res.cloudinary.com/den4nmmwx/video/upload/q_auto/f_auto/v1781508331/Heisenberg_Uncertainty_Principle__202606151255_mwpalx.mp4)",
              "Heisenberg discovered nature has this exact trade-off built in for quantum particles — not because our tools are imperfect, but as a fundamental law of the universe."
            ]
          },
          {
            title: "Reading the Uncertainty Formula in Code",
            body: [
              "The Heisenberg Uncertainty Principle is written as Δx × Δp ≥ ℏ/2 — the more precisely you know position, the less precisely you can know momentum, and vice versa.",
              "• In our `code` cell, `width_narrow = 0.5` builds a tightly squeezed wave packet — small Δx, certain position",
              "• `width_wide = 3.0` builds a spread-out wave packet — large Δx, uncertain position",
              "The function `wave_packet(x, width)` literally encodes this trade-off: shrink the width to pin down position, and (by the math of waves) the corresponding momentum spread must grow. It's not a flaw in measurement — it's how waves work, traced straight back to wave-particle duality."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "1. Run the Python visualization code.",
          "2. Compare the narrow wave packet (blue) with the wide wave packet (red).",
          "3. Understand that a narrower position graph mathematically demands a wider momentum graph due to Fourier transforms."
        ],
        posttest: []
      }
    }
  ]
};
