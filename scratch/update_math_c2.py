import re
import sys

raw_data = """EXPERIMENT 1: Newton's Laws and Basic Mechanics

Newton's First Law is also called the law of:
A) Momentum B) Inertia C) Gravitation D) Action-Reaction
Ans: B
F = ma is Newton's:
A) First Law B) Second Law C) Third Law D) Zeroth Law
Ans: B
SI unit of force is:
A) Joule B) Newton C) Watt D) Pascal
Ans: B
Every action has an equal and opposite:
A) Force B) Reaction C) Mass D) Velocity
Ans: B
Mass measures an object's resistance to change in motion, called:
A) Weight B) Inertia C) Density D) Volume
Ans: B
Weight is the force due to:
A) Friction B) Gravity C) Tension D) Air resistance
Ans: B
SI unit of mass is:
A) Newton B) Kilogram C) Pound D) Gram-force
Ans: B
Momentum equals:
A) mass ÷ velocity B) mass × velocity C) force × mass D) velocity ÷ time
Ans: B
On a body at constant velocity, the net force is:
A) Maximum B) Zero C) Increasing D) Negative always
Ans: B
Friction acts:
A) In the direction of motion B) Opposite to relative motion C) Perpendicular to motion always D) Randomly
Ans: B
Approximate value of g on Earth:
A) 6.8 m/s² B) 9.8 m/s² C) 12.2 m/s² D) 15.0 m/s²
Ans: B
A free body diagram shows:
A) Only weight B) All forces acting on an object C) Only applied forces D) Only friction
Ans: B
Passengers lurch forward when a car brakes suddenly due to:
A) Newton's Third Law B) Newton's First Law (inertia) C) Gravity increase D) Friction loss
Ans: B
Impulse is defined as:
A) Force × time B) Force ÷ time C) Mass × distance D) Mass ÷ time
Ans: A
If mass doubles at constant force, acceleration:
A) Doubles B) Halves C) Stays same D) Triples
Ans: B
Centripetal force points:
A) Away from center B) Toward the center C) Tangent to the path D) Opposite to velocity always
Ans: B
Static friction is usually _____ kinetic friction:
A) less than B) greater than or equal to C) equal to D) unrelated to
Ans: B
Normal force acts:
A) Parallel to the surface B) Perpendicular to the surface C) Along gravity always D) In direction of motion
Ans: B
A scalar quantity has:
A) Magnitude and direction B) Only magnitude C) Only direction D) Neither
Ans: B
Which of these is a vector quantity?
A) Mass B) Time C) Force D) Speed
Ans: C
Total momentum of an isolated system is:
A) Always zero B) Conserved C) Always increasing D) Undefined
Ans: B
Which is NOT a Newton's Law?
A) Law of Inertia B) Law of Acceleration C) Law of Conservation of Energy D) Law of Action-Reaction
Ans: C
Force required to stop a moving object depends on its:
A) Color B) Momentum C) Volume D) Temperature
Ans: B
A rocket moves forward because gas is pushed:
A) Forward B) Backward C) Sideways D) Nowhere
Ans: B
An object in equilibrium has net force equal to:
A) Maximum B) Zero C) Mass × g D) Infinite
Ans: B


EXPERIMENT 2: Lagrangian Mechanics — The Energy Approach

The Lagrangian L is defined as:
A) T + V B) T − V C) V − T D) T × V
Ans: B
In the Lagrangian, T stands for:
A) Total energy B) Kinetic energy C) Potential energy D) Torque
Ans: B
In the Lagrangian, V stands for:
A) Velocity B) Potential energy C) Volume D) Vector force
Ans: B
Generalized coordinates are useful because they:
A) Only apply to straight lines B) Simplify systems with constraints C) Remove the need for energy D) Always equal time
Ans: B
The Euler-Lagrange equation is:
A) d/dt(∂L/∂q̇) − ∂L/∂q = 0 B) L = T × V C) ∂L/∂t = constant D) F = ma
Ans: A
A pendulum is best described using the generalized coordinate:
A) x and y separately B) The swing angle θ C) Mass D) Time only
Ans: B
The main advantage of Lagrangian mechanics over Newtonian is:
A) It needs vector force analysis B) It uses scalar energy, simplifying constrained systems C) It cannot handle oscillators D) It ignores potential energy
Ans: B
The principle of least action states a system follows the path that:
A) Maximizes force B) Extremizes (minimizes) the action integral C) Maximizes speed D) Has constant velocity always
Ans: B
The action S is the integral of the Lagrangian over:
A) Space B) Time C) Mass D) Momentum
Ans: B
Which of these is a generalized coordinate example?
A) Cartesian x only B) An angle θ C) Only mass D) Only velocity
Ans: B
Lagrangian mechanics is especially powerful for systems with:
A) No constraints B) Constraints (like beads on a wire, pendulums) C) No motion D) Infinite mass
Ans: B
If a coordinate does not appear explicitly in L (only its derivative does), it is called:
A) A dependent coordinate B) A cyclic (ignorable) coordinate C) A vector coordinate D) A constrained coordinate
Ans: B
A cyclic coordinate leads to conservation of its corresponding:
A) Mass B) Generalized momentum C) Force D) Time
Ans: B
Kinetic energy in Cartesian coordinates for a single particle is:
A) ½mv² B) mv C) mgh D) F·d
Ans: A
Potential energy near Earth's surface is commonly:
A) ½mv² B) mgh C) mv D) F/t
Ans: B
The Lagrangian approach naturally handles constraint forces (like tension in a rod) by:
A) Ignoring them entirely, incorporating them via coordinate choice B) Calculating them directly as vectors C) Adding extra mass D) Removing potential energy
Ans: A
Degrees of freedom refers to:
A) Temperature settings B) The number of independent coordinates needed to describe a system C) The number of forces D) The system's mass
Ans: B
For a simple pendulum, the number of degrees of freedom is:
A) 0 B) 1 C) 2 D) 3
Ans: B
The Lagrangian formulation is derived from which broader principle?
A) Conservation of mass B) Hamilton's principle (least action) C) Ohm's Law D) Bernoulli's principle
Ans: B
Which quantity does NOT directly appear in the Lagrangian formulation?
A) Kinetic energy B) Potential energy C) Force vectors directly D) Generalized coordinates
Ans: C
For a free particle (no potential energy), the Lagrangian equals:
A) Zero B) Kinetic energy only C) Potential energy only D) Mass only
Ans: B
The Lagrangian method is especially useful in robotics and engineering for:
A) Painting robots B) Modeling complex multi-body systems with constraints C) Measuring temperature D) Designing circuits only
Ans: B
If a system's Lagrangian doesn't depend explicitly on time, then _____ is conserved.
A) Momentum only B) Energy C) Mass D) Angle
Ans: B
Generalized velocity refers to:
A) The time derivative of a generalized coordinate B) The speed of light C) Angular mass D) A constant value
Ans: A
Lagrangian mechanics is equivalent to Newtonian mechanics because:
A) They use identical variables B) Both yield the same physical predictions of motion C) They ignore energy D) They only work for rigid bodies
Ans: B


EXPERIMENT 3: Hamiltonian Mechanics — Phase Space and Hamilton's Equations

The Hamiltonian H is generally defined as:
A) T − V B) T + V C) V − T D) T × V
Ans: B
Hamiltonian mechanics reformulates motion using position and:
A) Acceleration B) Generalized momentum C) Force D) Mass
Ans: B
Hamilton's equations are:
A) q̇ = ∂H/∂p, ṗ = −∂H/∂q B) ṗ = ∂H/∂p, q̇ = −∂H/∂q C) H = pq̇ D) q̇ = ṗ
Ans: A
"Phase space" is a plot of:
A) Time vs Temperature B) Position vs Momentum C) Mass vs Color D) Force vs Time
Ans: B
A single point in phase space represents:
A) Only velocity B) The complete state of a system (position + momentum) C) Only potential energy D) Only mass
Ans: B
The Hamiltonian is obtained from the Lagrangian via:
A) Direct substitution B) A Legendre transformation C) Integration over time D) Differentiation by mass
Ans: B
Generalized momentum p is defined as:
A) ∂L/∂q̇ B) ∂L/∂q C) L × q D) L/t
Ans: A
Canonical transformations are used to:
A) Delete momentum B) Simplify the Hamiltonian while preserving Hamilton's equations C) Add extra mass D) Remove energy
Ans: B
Liouville's theorem states that phase space volume is:
A) Always increasing B) Always decreasing C) Conserved over time D) Undefined
Ans: C
If H does not depend explicitly on time, then H represents:
A) Momentum B) A conserved quantity (often total energy) C) Mass D) Force
Ans: B
Poisson brackets are used to express:
A) Time evolution of dynamical quantities B) Only spatial coordinates C) Mass distribution D) Color of a system
Ans: A
The number of dimensions in phase space for a system with n generalized coordinates is:
A) n B) 2n C) n² D) n/2
Ans: B
Hamilton's equations are first-order differential equations, unlike Lagrange's equations which are:
A) Also first-order B) Second-order C) Zero-order D) Algebraic only
Ans: B
A trajectory in phase space that never crosses itself reflects:
A) Randomness B) Deterministic evolution of the system C) Energy loss D) System failure
Ans: B
For a simple harmonic oscillator, the phase space trajectory is typically:
A) A straight line B) An ellipse (or circle) C) A random scatter D) A single point
Ans: B
In Hamiltonian mechanics, "conjugate variables" refer to pairs like:
A) Mass and time B) Position and its corresponding momentum C) Force and velocity D) Energy and color
Ans: B
The Hamiltonian formalism is particularly suited for:
A) Only single-particle straight-line motion B) Statistical mechanics and advanced theoretical physics C) Elementary arithmetic D) Basic geometry
Ans: B
If a coordinate is cyclic (absent from H), its conjugate momentum is:
A) Zero always B) Conserved C) Undefined D) Infinite
Ans: B
Hamilton's equations describe evolution as flow in:
A) Real space only B) Phase space C) Time only D) Frequency space
Ans: B
The Hamiltonian is numerically equal to total mechanical energy when:
A) The system has friction B) The potential is time-independent and coordinates aren't explicitly time-dependent C) The system is at rest D) Mass is zero
Ans: B
Symplectic structure in Hamiltonian mechanics preserves:
A) Mass B) Phase space area/volume under time evolution C) Color D) Temperature
Ans: B
Which of these is an advantage of Hamiltonian mechanics over Lagrangian mechanics?
A) It cannot be generalized B) It provides a natural bridge to quantum mechanics and statistical mechanics C) It avoids energy entirely D) It only works for one particle
Ans: B
The equation ṗ = −∂H/∂q resembles which Newtonian concept?
A) Conservation of mass B) Force as negative gradient of potential energy C) Speed of light constancy D) Zero net momentum
Ans: B
A fixed point in phase space where q̇ = 0 and ṗ = 0 represents:
A) An equilibrium point B) Infinite energy C) A collision D) Maximum velocity
Ans: A
The dimensionality "2n" in phase space accounts for:
A) n positions and n momenta B) n masses and n forces C) n energies and n times D) 2 particles only
Ans: A


EXPERIMENT 4: Applications of Hamiltonian Mechanics to Quantum Systems

In quantum mechanics, the classical Hamiltonian becomes a(n):
A) Scalar constant B) Operator acting on wavefunctions C) Vector force D) Color function
Ans: B
The process of turning classical position/momentum into quantum operators is called:
A) Lagrangian duality B) Canonical quantization C) Phase inversion D) Newtonian limit
Ans: B
Poisson brackets in classical mechanics correspond to which quantum concept?
A) Wavefunction collapse B) Commutators of operators C) Spin D) Photon emission
Ans: B
The time-dependent Schrödinger equation involves the Hamiltonian operator acting on the:
A) Force vector B) Wavefunction C) Mass D) Position only
Ans: B
In quantum mechanics, the position and momentum operators satisfy:
A) They always commute B) A non-zero commutation relation (uncertainty) C) No relationship D) Equal to zero always
Ans: B
The Heisenberg Uncertainty Principle is deeply connected to the fact that position and momentum:
A) Are independent and freely measurable B) Cannot be simultaneously measured with arbitrary precision C) Are always equal D) Don't exist in quantum theory
Ans: B
The classical Hamiltonian H = p²/2m + V(x) becomes, in quantum mechanics:
A) A classical trajectory equation B) The quantum Hamiltonian operator with p → −iℏ∂/∂x C) Irrelevant D) A scalar mass term
Ans: B
Energy eigenvalues in quantum mechanics come from solving:
A) F = ma B) The time-independent Schrödinger equation (Ĥψ = Eψ) C) Newton's Third Law D) Ohm's Law
Ans: B
The correspondence principle states that quantum mechanics should reduce to classical mechanics:
A) Never B) In the limit of large quantum numbers / macroscopic scales C) Only at absolute zero D) Only for photons
Ans: B
Ehrenfest's theorem shows that expectation values of quantum operators follow equations resembling:
A) Random walks only B) Classical Hamiltonian equations of motion C) Thermodynamic laws only D) Maxwell's equations
Ans: B
In quantum mechanics, "observables" (like energy, momentum) are represented by:
A) Numbers only B) Hermitian operators C) Colors D) Random variables with no structure
Ans: B
The quantum harmonic oscillator Hamiltonian is derived directly by quantizing the classical:
A) Free particle Hamiltonian B) Harmonic oscillator Hamiltonian (H = p²/2m + ½kx²) C) Gravitational potential D) Electric field equation
Ans: B
Phase space in quantum mechanics is replaced/constrained by which principle?
A) Newton's Third Law B) The Uncertainty Principle (no exact simultaneous p, q) C) Conservation of mass D) Ohm's Law
Ans: B
The Wigner function is a quantum analog of:
A) Classical phase space distribution B) Newtonian force C) Lagrangian energy D) Electric charge
Ans: A
In quantum mechanics, energy levels of systems like the hydrogen atom are found using:
A) Newton's Second Law directly B) The Hamiltonian operator in the Schrödinger equation C) Simple algebra only D) Classical circular orbits only
Ans: B
The momentum operator in position representation is:
A) x B) −iℏ ∂/∂x C) mv D) F·t
Ans: B
Canonical quantization replaces classical Poisson brackets {q,p} = 1 with the quantum commutator:
A) [q,p] = 0 B) [q,p] = iℏ C) [q,p] = ℏ² D) [q,p] = −1
Ans: B
In the path integral formulation (an extension of the least action principle), quantum amplitudes are computed by summing over:
A) One classical path only B) All possible paths, weighted by e^(iS/ℏ) C) Zero paths D) Random noise
Ans: B
Which classical mechanics framework most directly inspired the path integral formulation of quantum mechanics?
A) Newtonian force analysis B) The Lagrangian action principle C) Static equilibrium analysis D) Rigid body dynamics
Ans: B
Stationary states in quantum mechanics correspond to solutions where:
A) The wavefunction changes randomly B) The probability density is time-independent C) Energy is undefined D) Momentum is infinite
Ans: B
The quantum Hamiltonian for a free particle (no potential) is:
A) H = p²/2m B) H = mgh C) H = ½kx² D) H = qE
Ans: A
Applying Hamiltonian mechanics to quantum systems is foundational for which modern field?
A) Classical thermodynamics only B) Quantum computing and quantum field theory C) Basic mechanics only D) Structural engineering
Ans: B
In quantum mechanics, "eigenstates" of the Hamiltonian represent:
A) States with definite, well-defined energy B) Random unstable states C) States with zero energy always D) Only ground-state configurations
Ans: A
The transition from classical to quantum Hamiltonian mechanics preserves the underlying mathematical structure of:
A) Random probability only B) Phase space and canonical variables (position/momentum) C) Only gravitational forces D) Only electromagnetic fields
Ans: B
A major reason Hamiltonian mechanics (rather than Newtonian) underlies quantum theory is that it:
A) Uses only force vectors B) Provides the energy-based framework and phase space structure quantum theory needs C) Ignores energy entirely D) Cannot describe oscillators
Ans: B"""

import re
import json

experiments = re.split(r'EXPERIMENT \d+:.*?\n', raw_data)[1:]
exp_ids = ['cm-m1-1', 'cm-m1-2', 'cm-m2-1', 'cm-m2-2']

with open(r'c:\Users\Likhith Kumar\Downloads\VLMS-\src\lib\math-c2-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for exp_id, exp_text in zip(exp_ids, experiments):
    blocks = exp_text.strip().split('\nAns: ')
    questions_ts = []
    
    for i in range(len(blocks) - 1): # Last block is just the final answer
        question_part = blocks[i].strip()
        if i == 0:
            q_lines = question_part.split('\n')
        else:
            # The previous answer is the first line of this block, we skip it
            q_lines = question_part.split('\n')[1:]
            
        q_lines = [l.strip() for l in q_lines if l.strip()]
        
        # Options are on the last line
        options_line = q_lines[-1]
        question = ' '.join(q_lines[:-1]).replace('"', '\\"')
        
        # Parse options line "A) ... B) ... C) ... D) ..."
        # Use regex to find A) B) C) D)
        opts = []
        for match in re.finditer(r'[A-D]\)\s+(.*?)(?=(?:[A-D]\)\s+)|$)', options_line):
            opts.append(match.group(1).strip().replace('"', '\\"'))
            
        ans = blocks[i+1].strip().split('\n')[0].strip()
        ans_idx = ord(ans) - ord('A')
        
        questions_ts.append(f'            {{ question: "{question}", options: ["{opts[0]}", "{opts[1]}", "{opts[2]}", "{opts[3]}"], answerIndex: {ans_idx} }}')

    posttest_str = '            posttest: [\n' + ',\n'.join(questions_ts) + '\n            ],'
    
    # We find the id: "exp_id", then find the next posttest: [],
    pattern = r'(id:\s*"' + exp_id + r'".*?)posttest:\s*\[\s*\],'
    content = re.sub(pattern, r'\1' + posttest_str.replace('\\', '\\\\'), content, flags=re.DOTALL | re.MULTILINE)

with open(r'c:\Users\Likhith Kumar\Downloads\VLMS-\src\lib\math-c2-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
