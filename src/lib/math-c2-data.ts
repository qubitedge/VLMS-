// lib/classical-mech-data.ts

import { Course } from './course-data';

export const classicalMechCourse: Course = {
  id: "classical-mechanics-and-electromagnetism",
  title: "Classical Mechanics and Electromagnetism",
  objectives: [
    "To understand the fundamental principles of classical mechanics from Newton to Lagrange to Hamilton",
    "To appreciate the connection between classical mechanics and quantum mechanics",
    "To master Maxwell's equations and their applications in free space",
    "To understand electromagnetic wave propagation in conducting media and optical fibers",
    "To apply these concepts to emerging technologies"
  ],
  introduction: [
    "Classical mechanics and electromagnetism form the foundation of much of modern physics and technology. From the motion of planets to the propagation of light in optical fibers, these theories describe the world around us.",
    "This course starts with the classical mechanics of Newton and advances through the elegant formulations of Lagrange and Hamilton—reformulations that set the stage for quantum mechanics.",
    "The second half of the course covers electromagnetism, from Maxwell's elegant unification of electricity and magnetism to the practical applications of electromagnetic waves in optical fibers.",
    "You'll see how the Hamiltonian of classical mechanics becomes the energy operator in quantum mechanics, and how Maxwell's equations predict everything from radio waves to visible light."
  ],
  targetAudience: {
    primary: "Undergraduate students in Physics, Engineering, and Computer Science studying the foundations of classical physics.",
    prerequisites: [
      "Calculus (derivatives and integrals)",
      "Basic vector algebra and calculus",
      "Elementary mechanics from high school physics"
    ],
    usefulFor: [
      "Students interested in quantum mechanics and quantum computing",
      "Students pursuing electrical engineering and communications",
      "Students preparing for GATE and JEST physics exams",
      "Anyone wanting to understand classical physics from first principles"
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "Physics and Engineering",
    course: "Classical Mechanics and Electromagnetism",
    credits: "L:3 T:0 P:0 C:3",
    yearSem: "Second Year, First Semester",
    branches: "Physics, Engineering, and Allied Branches",
    totalExperiments: "4 Modules with 8 experiments",
    compiler: "Mathematical concepts with computational tools",
    units: [
      { unit: "Unit I", topics: "Classical Mechanics—Newton, Lagrange, Hamilton", weeks: "Module 1–2" },
      { unit: "Unit II", topics: "Electromagnetism—Maxwell's Equations in Free Space", weeks: "Module 3" },
      { unit: "Unit III", topics: "Electromagnetism in Matter and Optical Fibers", weeks: "Module 4" }
    ]
  },
  weeks: [
    {
      title: "MODULE 1",
      objective: "Classical Mechanics Overview, Lagrangian Formulation",
      tutorial: "Tutorial 1: Newtonian and Lagrangian Mechanics",
      labTitle: "Lab 1: Classical Mechanics",
      experiments: [
        {
          id: "cm-m1-1",
          title: "Newton's Laws and Basic Mechanics",
          desc: "Review Newton's laws of motion and their applications to simple systems.",
          expected: "Able to apply Newton's laws to solve basic mechanical problems.",
          content: {
            aim: {
              text: "This experiment reviews the foundations of classical mechanics: Newton's three laws of motion. You'll see how these seemingly simple laws predict everything from the trajectory of a thrown ball to the orbit of a planet.",
              bullets: [
                "State Newton's three laws of motion",
                "Apply Newton's second law (F = ma) to solve problems",
                "Understand concepts of force, mass, acceleration",
                "Explore simple harmonic motion",
                "Connect to more advanced formulations"
              ]
            },
            theory: [
              {
                title: "Newton's Laws—The Foundation of Classical Mechanics",
                body: [
                  "Newton's laws are three simple statements that describe all classical motion:",
                  "1. First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted upon by an external force.",
                  "![Newton's First Law](/newton_first_law.webp)",
                  "This law tells us that change requires force. Without force, nothing changes.",
                  "2. Second Law (F = ma): The net force on an object equals its mass times its acceleration. F = ma.",
                  "This is the most important equation in classical mechanics. It tells us how force causes motion to change.",
                  "3. Third Law (Action-Reaction): For every action, there is an equal and opposite reaction.",
                  "Forces always come in pairs. If object A pushes on object B, object B pushes back on A with equal force."
                ]
              },
              {
                title: "Simple Harmonic Motion—The Universal Oscillator",
                body: [
                  "Simple harmonic motion (SHM) occurs when the restoring force is proportional to displacement: F = -kx.",
                  "![Simple Harmonic Motion](/simple_harmonic_motion.webp)",
                  "The solution is x(t) = A cos(ωt + φ), where ω = √(k/m).",
                  "Examples of SHM:",
                  "• Mass on a spring",
                  "• Pendulum (small angles)",
                  "• Electrical LC circuits",
                  "• Molecular vibrations",
                  "SHM is everywhere because many systems near equilibrium behave like a spring.",
                  "In quantum mechanics, the quantum harmonic oscillator is one of the most important exactly-solvable problems—it describes everything from photons in a cavity to phonons in a crystal lattice."
                ]
              },
              {
                title: "Conservative Forces and Potential Energy",
                body: [
                  "A force is conservative if the work done depends only on endpoints, not on the path.",
                  "For conservative forces, we can define a potential energy U(x): F = -dU/dx.",
                  "![Potential Energy](/potential_energy.webp)",
                  "Total energy E = KE + PE = (1/2)mv² + U(x) is conserved.",
                  "Examples of conservative forces: gravity, springs, electrostatic forces.",
                  "The conservation of energy is one of the most powerful tools in physics. It often lets us solve problems without considering forces directly.",
                  "In quantum mechanics, the Hamiltonian operator is the quantum version of total energy: Ĥ = -ħ²/2m ∇² + V(x)."
                ]
              },
              {
                title: "Central Forces and Orbital Motion",
                body: [
                  "A central force is always directed toward or away from a fixed point.",
                  "Examples: gravitational force (1/r²) and electrostatic force (1/r²).",
                  "Kepler's laws describe planetary motion:",
                  "1. Planets move in elliptical orbits with the Sun at one focus.",
                  "2. A line from the Sun to a planet sweeps out equal areas in equal times (conservation of angular momentum).",
                  "3. The square of the orbital period is proportional to the cube of the semi-major axis.",
                  "![Kepler's Laws](/keplers_laws.webp)",
                  "These laws follow directly from Newton's law of gravitation and F = ma.",
                  "In quantum mechanics, the hydrogen atom is the quantum version of the central force problem—the solutions are the orbitals we learn about in chemistry."
                ]
              },
              {
                title: "Limitations of Newtonian Mechanics",
                body: [
                  "Newton's laws work beautifully for everyday motion, but fail in extreme regimes:",
                  "1. Very high speeds (near the speed of light): Requires special relativity.",
                  "2. Very small scales (atomic and subatomic): Requires quantum mechanics.",
                  "3. Very strong gravitational fields: Requires general relativity.",
                  "The transition from classical to quantum mechanics is a theme we'll explore in Module 2, where the Hamiltonian formulation of classical mechanics directly leads to the Schrödinger equation.",
                  "![Classical vs Quantum](/classical_vs_quantum.webp)",
                  "The key insight: the mathematical structure of classical mechanics (Hamiltonians, Poisson brackets, phase space) carries over to quantum mechanics (Hamiltonians, commutators, Hilbert space)."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the mechanics workspace",
              "Review Newton's laws and their applications",
              "Solve simple mechanical problems using F = ma",
              "Explore simple harmonic motion",
              "Understand conservative forces and energy conservation",
              "Complete the quiz to test your understanding"
            ],
                        posttest: [
            { question: "Newton's First Law is also called the law of:", options: ["Momentum", "Inertia", "Gravitation", "Action-Reaction"], answerIndex: 1 },
            { question: "F = ma is Newton's:", options: ["First Law", "Second Law", "Third Law", "Zeroth Law"], answerIndex: 1 },
            { question: "SI unit of force is:", options: ["Joule", "Newton", "Watt", "Pascal"], answerIndex: 1 },
            { question: "Every action has an equal and opposite:", options: ["Force", "Reaction", "Mass", "Velocity"], answerIndex: 1 },
            { question: "Mass measures an object's resistance to change in motion, called:", options: ["Weight", "Inertia", "Density", "Volume"], answerIndex: 1 },
            { question: "Weight is the force due to:", options: ["Friction", "Gravity", "Tension", "Air resistance"], answerIndex: 1 },
            { question: "SI unit of mass is:", options: ["Newton", "Kilogram", "Pound", "Gram-force"], answerIndex: 1 },
            { question: "Momentum equals:", options: ["mass ÷ velocity", "mass × velocity", "force × mass", "velocity ÷ time"], answerIndex: 1 },
            { question: "On a body at constant velocity, the net force is:", options: ["Maximum", "Zero", "Increasing", "Negative always"], answerIndex: 1 },
            { question: "Friction acts:", options: ["In the direction of motion", "Opposite to relative motion", "Perpendicular to motion always", "Randomly"], answerIndex: 1 },
            { question: "Approximate value of g on Earth:", options: ["6.8 m/s²", "9.8 m/s²", "12.2 m/s²", "15.0 m/s²"], answerIndex: 1 },
            { question: "A free body diagram shows:", options: ["Only weight", "All forces acting on an object", "Only applied forces", "Only friction"], answerIndex: 1 },
            { question: "Passengers lurch forward when a car brakes suddenly due to:", options: ["Newton's Third Law", "Newton's First Law (inertia)", "Gravity increase", "Friction loss"], answerIndex: 1 },
            { question: "Impulse is defined as:", options: ["Force × time", "Force ÷ time", "Mass × distance", "Mass ÷ time"], answerIndex: 0 },
            { question: "If mass doubles at constant force, acceleration:", options: ["Doubles", "Halves", "Stays same", "Triples"], answerIndex: 1 },
            { question: "Centripetal force points:", options: ["Away from center", "Toward the center", "Tangent to the path", "Opposite to velocity always"], answerIndex: 1 },
            { question: "Static friction is usually _____ kinetic friction:", options: ["less than", "greater than or equal to", "equal to", "unrelated to"], answerIndex: 1 },
            { question: "Normal force acts:", options: ["Parallel to the surface", "Perpendicular to the surface", "Along gravity always", "In direction of motion"], answerIndex: 1 },
            { question: "A scalar quantity has:", options: ["Magnitude and direction", "Only magnitude", "Only direction", "Neither"], answerIndex: 1 },
            { question: "Which of these is a vector quantity?", options: ["Mass", "Time", "Force", "Speed"], answerIndex: 2 },
            { question: "Total momentum of an isolated system is:", options: ["Always zero", "Conserved", "Always increasing", "Undefined"], answerIndex: 1 },
            { question: "Which is NOT a Newton's Law?", options: ["Law of Inertia", "Law of Acceleration", "Law of Conservation of Energy", "Law of Action-Reaction"], answerIndex: 2 },
            { question: "Force required to stop a moving object depends on its:", options: ["Color", "Momentum", "Volume", "Temperature"], answerIndex: 1 },
            { question: "A rocket moves forward because gas is pushed:", options: ["Forward", "Backward", "Sideways", "Nowhere"], answerIndex: 1 },
            { question: "An object in equilibrium has net force equal to:", options: ["Maximum", "Zero", "Mass × g", "Infinite"], answerIndex: 1 }
            ],
            references: [
              "Taylor, J.R. - 'Classical Mechanics', University Science Books, Chapter 1 on Newton's Laws",
              "Goldstein, H. - 'Classical Mechanics', 3rd Edition, Addison-Wesley, Chapter 1 on Mechanics",
              "Feynman, R.P. - 'The Feynman Lectures on Physics', Volume I, Chapters 9-12 on Mechanics"
            ]
          }
        },
        {
          id: "cm-m1-2",
          title: "Lagrangian Mechanics—The Energy Approach",
          desc: "Learn the Lagrangian formulation of mechanics using kinetic and potential energy.",
          expected: "Able to derive equations of motion using the Euler-Lagrange equation.",
          content: {
            aim: {
              text: "This experiment introduces the Lagrangian formulation of mechanics—a powerful alternative to Newton's laws. Instead of forces, we work with energy (kinetic minus potential). The principle of least action tells us that the path a system takes is the one that minimizes the action integral.",
              bullets: [
                "Define the Lagrangian L = T - V",
                "State the principle of least action",
                "Derive the Euler-Lagrange equation",
                "Apply to simple systems (pendulum, spring-mass)",
                "Understand the advantages of the Lagrangian approach"
              ]
            },
            theory: [
              {
                title: "The Principle of Least Action—Nature Takes the Shortest Path",
                body: [
                  "Imagine you're throwing a ball to a friend. You know the ball will follow a parabolic path. But why this specific path?",
                  "The principle of least action says: the path taken is the one that minimizes (or more generally, extremizes) the action S.",
                  "The action is defined as S = ∫L dt, where L = T - V is the Lagrangian (kinetic energy minus potential energy).",
                  "![Principle of Least Action](/principle_least_action.webp)",
                  "This principle is incredibly powerful—it tells us the entire dynamics of a system without ever mentioning forces!",
                  "Why does it work? It turns out that Newton's laws are equivalent to the principle of least action. The path that minimizes the action is exactly the path that satisfies F = ma."
                ]
              },
              {
                title: "The Euler-Lagrange Equation—The Equation of Motion",
                body: [
                  "From the principle of least action, we can derive the Euler-Lagrange equation:",
                  "d/dt(∂L/∂q̇) - ∂L/∂q = 0",
                  "![Euler-Lagrange](/euler_lagrange.webp)",
                  "Here, q is the generalized coordinate (position, angle, etc.) and q̇ is the generalized velocity.",
                  "This single equation replaces F = ma. For complicated systems with many degrees of freedom, it's often easier to work with.",
                  "Example: Simple pendulum. L = (1/2)ml²θ̇² - mgl(1-cosθ).",
                  "∂L/∂θ̇ = ml²θ̇, ∂L/∂θ = -mgl sinθ.",
                  "Euler-Lagrange: d/dt(ml²θ̇) + mgl sinθ = 0 → ml²θ̈ + mgl sinθ = 0 → θ̈ + (g/l)sinθ = 0.",
                  "This is exactly the equation of motion for a pendulum (small angle: θ̈ + (g/l)θ = 0)."
                ]
              },
              {
                title: "Generalized Coordinates—Freedom to Choose",
                body: [
                  "One of the great advantages of Lagrangian mechanics is the freedom to choose any coordinates that describe the system.",
                  "You can use Cartesian coordinates (x, y, z), polar coordinates (r, θ), or even more exotic coordinates.",
                  "This is called generalized coordinates—the q's in the Euler-Lagrange equation.",
                  "![Generalized Coordinates](/generalized_coordinates.webp)",
                  "Example: A bead on a circular wire. Instead of x and y, use θ (the angle around the circle).",
                  "This reduces a 2D problem to a 1D problem because the bead is constrained to move on the wire.",
                  "In quantum mechanics, choosing the right coordinates can make problems solvable—the hydrogen atom is separable in spherical coordinates, giving the familiar orbitals."
                ]
              },
              {
                title: "Symmetries and Conservation Laws (Noether's Theorem)",
                body: [
                  "One of the most beautiful results of Lagrangian mechanics is Noether's theorem:",
                  "For every continuous symmetry of the system, there is a corresponding conserved quantity.",
                  "![Noether's Theorem](/noethers_theorem.webp)",
                  "Examples:",
                  "• Time symmetry (laws don't change with time) → Energy conservation.",
                  "• Space translation symmetry (laws don't depend on position) → Momentum conservation.",
                  "• Rotation symmetry (laws don't depend on angle) → Angular momentum conservation.",
                  "This deep connection between symmetries and conservation laws carries over to quantum mechanics, where symmetries lead to conserved quantities via the commutator with the Hamiltonian."
                ]
              },
              {
                title: "Lagrangian to Hamiltonian—The Bridge to Quantum Mechanics",
                body: [
                  "The Lagrangian formulation is elegant, but the Hamiltonian formulation (next module) is even closer to quantum mechanics.",
                  "The transition from Lagrangian to Hamiltonian:",
                  "Define the conjugate momentum: p = ∂L/∂q̇",
                  "The Hamiltonian is the Legendre transform: H = p·q̇ - L",
                  "In most cases, H = T + V (total energy).",
                  "The Hamiltonian approach will be our bridge to quantum mechanics, where the Hamiltonian becomes the energy operator and Poisson brackets become commutators."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the mechanics workspace",
              "Review the Lagrangian formulation",
              "Derive the Euler-Lagrange equation from the principle of least action",
              "Apply the Euler-Lagrange equation to simple systems",
              "Understand generalized coordinates",
              "Explore Noether's theorem and conservation laws",
              "Complete the quiz to test your understanding"
            ],
                        posttest: [
            { question: "The Lagrangian L is defined as:", options: ["T + V", "T − V", "V − T", "T × V"], answerIndex: 1 },
            { question: "In the Lagrangian, T stands for:", options: ["Total energy", "Kinetic energy", "Potential energy", "Torque"], answerIndex: 1 },
            { question: "In the Lagrangian, V stands for:", options: ["Velocity", "Potential energy", "Volume", "Vector force"], answerIndex: 1 },
            { question: "Generalized coordinates are useful because they:", options: ["Only apply to straight lines", "Simplify systems with constraints", "Remove the need for energy", "Always equal time"], answerIndex: 1 },
            { question: "The Euler-Lagrange equation is:", options: ["d/dt(∂L/∂q̇) − ∂L/∂q = 0", "L = T × V", "∂L/∂t = constant", "F = ma"], answerIndex: 0 },
            { question: "A pendulum is best described using the generalized coordinate:", options: ["x and y separately", "The swing angle θ", "Mass", "Time only"], answerIndex: 1 },
            { question: "The main advantage of Lagrangian mechanics over Newtonian is:", options: ["It needs vector force analysis", "It uses scalar energy, simplifying constrained systems", "It cannot handle oscillators", "It ignores potential energy"], answerIndex: 1 },
            { question: "The principle of least action states a system follows the path that:", options: ["Maximizes force", "Extremizes (minimizes) the action integral", "Maximizes speed", "Has constant velocity always"], answerIndex: 1 },
            { question: "The action S is the integral of the Lagrangian over:", options: ["Space", "Time", "Mass", "Momentum"], answerIndex: 1 },
            { question: "Which of these is a generalized coordinate example?", options: ["Cartesian x only", "An angle θ", "Only mass", "Only velocity"], answerIndex: 1 },
            { question: "Lagrangian mechanics is especially powerful for systems with:", options: ["No constraints", "Constraints (like beads on a wire, pendulums)", "No motion", "Infinite mass"], answerIndex: 1 },
            { question: "If a coordinate does not appear explicitly in L (only its derivative does), it is called:", options: ["A dependent coordinate", "A cyclic (ignorable) coordinate", "A vector coordinate", "A constrained coordinate"], answerIndex: 1 },
            { question: "A cyclic coordinate leads to conservation of its corresponding:", options: ["Mass", "Generalized momentum", "Force", "Time"], answerIndex: 1 },
            { question: "Kinetic energy in Cartesian coordinates for a single particle is:", options: ["½mv²", "mv", "mgh", "F·d"], answerIndex: 0 },
            { question: "Potential energy near Earth's surface is commonly:", options: ["½mv²", "mgh", "mv", "F/t"], answerIndex: 1 },
            { question: "The Lagrangian approach naturally handles constraint forces (like tension in a rod) by:", options: ["Ignoring them entirely, incorporating them via coordinate choice", "Calculating them directly as vectors", "Adding extra mass", "Removing potential energy"], answerIndex: 0 },
            { question: "Degrees of freedom refers to:", options: ["Temperature settings", "The number of independent coordinates needed to describe a system", "The number of forces", "The system's mass"], answerIndex: 1 },
            { question: "For a simple pendulum, the number of degrees of freedom is:", options: ["0", "1", "2", "3"], answerIndex: 1 },
            { question: "The Lagrangian formulation is derived from which broader principle?", options: ["Conservation of mass", "Hamilton's principle (least action)", "Ohm's Law", "Bernoulli's principle"], answerIndex: 1 },
            { question: "Which quantity does NOT directly appear in the Lagrangian formulation?", options: ["Kinetic energy", "Potential energy", "Force vectors directly", "Generalized coordinates"], answerIndex: 2 },
            { question: "For a free particle (no potential energy), the Lagrangian equals:", options: ["Zero", "Kinetic energy only", "Potential energy only", "Mass only"], answerIndex: 1 },
            { question: "The Lagrangian method is especially useful in robotics and engineering for:", options: ["Painting robots", "Modeling complex multi-body systems with constraints", "Measuring temperature", "Designing circuits only"], answerIndex: 1 },
            { question: "If a system's Lagrangian doesn't depend explicitly on time, then _____ is conserved.", options: ["Momentum only", "Energy", "Mass", "Angle"], answerIndex: 1 },
            { question: "Generalized velocity refers to:", options: ["The time derivative of a generalized coordinate", "The speed of light", "Angular mass", "A constant value"], answerIndex: 0 },
            { question: "Lagrangian mechanics is equivalent to Newtonian mechanics because:", options: ["They use identical variables", "Both yield the same physical predictions of motion", "They ignore energy", "They only work for rigid bodies"], answerIndex: 1 }
            ],
            references: [
              "Taylor, J.R. - 'Classical Mechanics', University Science Books, Chapter 6 on Lagrangian Mechanics",
              "Goldstein, H. - 'Classical Mechanics', 3rd Edition, Addison-Wesley, Chapter 2 on Variational Principles",
              "Feynman, R.P. - 'The Feynman Lectures on Physics', Volume II, Chapter 19 on The Principle of Least Action"
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 2",
      objective: "Hamiltonian Mechanics, Applications to Quantum Mechanics",
      tutorial: "Tutorial 2: Hamiltonian Mechanics and Quantum Connections",
      labTitle: "Lab 2: Hamiltonian Mechanics",
      experiments: [
        {
          id: "cm-m2-1",
          title: "Hamiltonian Mechanics—Phase Space and Hamilton's Equations",
          desc: "Understand the Hamiltonian formulation of mechanics in terms of position and momentum.",
          expected: "Able to derive Hamilton's equations and understand phase space.",
          content: {
            aim: {
              text: "This experiment introduces Hamiltonian mechanics, the most elegant formulation of classical mechanics. Instead of working with positions and velocities (like Lagrange), we work with positions and momenta. The Hamiltonian H(q,p) is the total energy of the system, and Hamilton's equations give the time evolution.",
              bullets: [
                "Define the Hamiltonian H = p·q̇ - L",
                "Derive Hamilton's equations: q̇ = ∂H/∂p, ṗ = -∂H/∂q",
                "Understand phase space and phase portraits",
                "Apply Hamiltonian mechanics to simple systems",
                "Explore the connection to quantum mechanics"
              ]
            },
            theory: [
              {
                title: "Hamilton's Equations—The Symmetry of Mechanics",
                body: [
                  "Hamiltonian mechanics reformulates mechanics in a perfectly symmetric way:",
                  "q̇ = ∂H/∂p (how position changes with time)",
                  "ṗ = -∂H/∂q (how momentum changes with time)",
                  "![Hamilton's Equations](/hamiltons_equations.webp)",
                  "Here, q is position and p is momentum. The Hamiltonian H is the total energy.",
                  "For a simple mass-spring system: H = p²/2m + (1/2)kx².",
                  "q̇ = ∂H/∂p = p/m (velocity = momentum/mass).",
                  "ṗ = -∂H/∂q = -kx (force = -kx, Newton's law).",
                  "Hamilton's equations are first-order differential equations (only first derivatives), making them mathematically nicer than Newton's second-order equation."
                ]
              },
              {
                title: "Phase Space—The Complete State Space",
                body: [
                  "Phase space is a space where every point represents a complete state of the system:",
                  "• The coordinates are (q, p) (position and momentum).",
                  "• The trajectory of a system is a curve in phase space.",
                  "• For a system with N degrees of freedom, phase space has 2N dimensions.",
                  "![Phase Space](/phase_space.webp)",
                  "A simple harmonic oscillator in phase space:",
                  "• The trajectory is an ellipse.",
                  "• The energy determines the size of the ellipse.",
                  "• The point moves clockwise (for a standard oscillator).",
                  "Phase space is central to classical mechanics and even more important in quantum mechanics, where it becomes the phase space of the Wigner function (a quantum version of a probability distribution in phase space)."
                ]
              },
              {
                title: "Poisson Brackets—The Quantum Connection",
                body: [
                  "The Poisson bracket of two functions f(q,p) and g(q,p) is:",
                  "{f, g} = Σ(∂f/∂qᵢ · ∂g/∂pᵢ - ∂f/∂pᵢ · ∂g/∂qᵢ)",
                  "![Poisson Bracket](/poisson_bracket.webp)",
                  "Importance: The time evolution of any function f is df/dt = {f, H}.",
                  "This is exactly analogous to the Heisenberg equation in quantum mechanics:",
                  "dÂ/dt = (i/ħ)[Ĥ, Â]",
                  "where [ , ] is the commutator.",
                  "The correspondence principle: { , } ↔ (1/iħ)[ , ].",
                  "This is how classical mechanics connects to quantum mechanics: replace Poisson brackets with commutators, and you get quantum mechanics!"
                ]
              },
              {
                title: "Canonical Transformations and Hamilton-Jacobi Theory",
                body: [
                  "Hamiltonian mechanics has a remarkable property: the form of Hamilton's equations is preserved under a certain class of transformations (canonical transformations).",
                  "This freedom allows us to choose coordinates that make problems simpler.",
                  "The Hamilton-Jacobi equation is a deep connection between classical and quantum mechanics:",
                  "-∂S/∂t = H(q, ∂S/∂q, t)",
                  "where S is Hamilton's principal function.",
                  "This equation is a first-order partial differential equation that can be solved to find all trajectories in the system.",
                  "The Hamilton-Jacobi equation is the classical limit of the Schrödinger equation! In the limit ħ → 0, the Schrödinger equation reduces to the Hamilton-Jacobi equation."
                ]
              },
              {
                title: "From Hamiltonian to Quantum Mechanics—The Quantization Recipe",
                body: [
                  "The transition from classical to quantum mechanics follows a specific recipe:",
                  "1. Start with the classical Hamiltonian H(q, p).",
                  "2. Replace q and p with operators: q → Q̂, p → P̂.",
                  "3. Impose the canonical commutation relation: [Q̂, P̂] = iħ.",
                  "4. The quantum Hamiltonian is Ĥ = H(Q̂, P̂).",
                  "5. The Schrödinger equation is iħ ∂|ψ⟩/∂t = Ĥ|ψ⟩.",
                  "![Quantization](/quantization.webp)",
                  "This process is called canonical quantization. It works for many systems and is the standard way to go from classical to quantum.",
                  "Example: The quantum harmonic oscillator: Ĥ = P̂²/2m + (1/2)mω²Q̂².",
                  "The energy levels are Eₙ = ħω(n + 1/2)—the famous zero-point energy!"
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the mechanics workspace",
              "Review the Hamiltonian formulation",
              "Derive Hamilton's equations for simple systems",
              "Explore phase space trajectories",
              "Understand Poisson brackets and their quantum analogs",
              "Complete the quiz to test your understanding"
            ],
                        posttest: [
            { question: "The Hamiltonian H is generally defined as:", options: ["T − V", "T + V", "V − T", "T × V"], answerIndex: 1 },
            { question: "Hamiltonian mechanics reformulates motion using position and:", options: ["Acceleration", "Generalized momentum", "Force", "Mass"], answerIndex: 1 },
            { question: "Hamilton's equations are:", options: ["q̇ = ∂H/∂p, ṗ = −∂H/∂q", "ṗ = ∂H/∂p, q̇ = −∂H/∂q", "H = pq̇", "q̇ = ṗ"], answerIndex: 0 },
            { question: "\"Phase space\" is a plot of:", options: ["Time vs Temperature", "Position vs Momentum", "Mass vs Color", "Force vs Time"], answerIndex: 1 },
            { question: "A single point in phase space represents:", options: ["Only velocity", "The complete state of a system (position + momentum)", "Only potential energy", "Only mass"], answerIndex: 1 },
            { question: "The Hamiltonian is obtained from the Lagrangian via:", options: ["Direct substitution", "A Legendre transformation", "Integration over time", "Differentiation by mass"], answerIndex: 1 },
            { question: "Generalized momentum p is defined as:", options: ["∂L/∂q̇", "∂L/∂q", "L × q", "L/t"], answerIndex: 0 },
            { question: "Canonical transformations are used to:", options: ["Delete momentum", "Simplify the Hamiltonian while preserving Hamilton's equations", "Add extra mass", "Remove energy"], answerIndex: 1 },
            { question: "Liouville's theorem states that phase space volume is:", options: ["Always increasing", "Always decreasing", "Conserved over time", "Undefined"], answerIndex: 2 },
            { question: "If H does not depend explicitly on time, then H represents:", options: ["Momentum", "A conserved quantity (often total energy)", "Mass", "Force"], answerIndex: 1 },
            { question: "Poisson brackets are used to express:", options: ["Time evolution of dynamical quantities", "Only spatial coordinates", "Mass distribution", "Color of a system"], answerIndex: 0 },
            { question: "The number of dimensions in phase space for a system with n generalized coordinates is:", options: ["n", "2n", "n²", "n/2"], answerIndex: 1 },
            { question: "Hamilton's equations are first-order differential equations, unlike Lagrange's equations which are:", options: ["Also first-order", "Second-order", "Zero-order", "Algebraic only"], answerIndex: 1 },
            { question: "A trajectory in phase space that never crosses itself reflects:", options: ["Randomness", "Deterministic evolution of the system", "Energy loss", "System failure"], answerIndex: 1 },
            { question: "For a simple harmonic oscillator, the phase space trajectory is typically:", options: ["A straight line", "An ellipse (or circle)", "A random scatter", "A single point"], answerIndex: 1 },
            { question: "In Hamiltonian mechanics, \"conjugate variables\" refer to pairs like:", options: ["Mass and time", "Position and its corresponding momentum", "Force and velocity", "Energy and color"], answerIndex: 1 },
            { question: "The Hamiltonian formalism is particularly suited for:", options: ["Only single-particle straight-line motion", "Statistical mechanics and advanced theoretical physics", "Elementary arithmetic", "Basic geometry"], answerIndex: 1 },
            { question: "If a coordinate is cyclic (absent from H), its conjugate momentum is:", options: ["Zero always", "Conserved", "Undefined", "Infinite"], answerIndex: 1 },
            { question: "Hamilton's equations describe evolution as flow in:", options: ["Real space only", "Phase space", "Time only", "Frequency space"], answerIndex: 1 },
            { question: "The Hamiltonian is numerically equal to total mechanical energy when:", options: ["The system has friction", "The potential is time-independent and coordinates aren't explicitly time-dependent", "The system is at rest", "Mass is zero"], answerIndex: 1 },
            { question: "Symplectic structure in Hamiltonian mechanics preserves:", options: ["Mass", "Phase space area/volume under time evolution", "Color", "Temperature"], answerIndex: 1 },
            { question: "Which of these is an advantage of Hamiltonian mechanics over Lagrangian mechanics?", options: ["It cannot be generalized", "It provides a natural bridge to quantum mechanics and statistical mechanics", "It avoids energy entirely", "It only works for one particle"], answerIndex: 1 },
            { question: "The equation ṗ = −∂H/∂q resembles which Newtonian concept?", options: ["Conservation of mass", "Force as negative gradient of potential energy", "Speed of light constancy", "Zero net momentum"], answerIndex: 1 },
            { question: "A fixed point in phase space where q̇ = 0 and ṗ = 0 represents:", options: ["An equilibrium point", "Infinite energy", "A collision", "Maximum velocity"], answerIndex: 0 },
            { question: "The dimensionality \"2n\" in phase space accounts for:", options: ["n positions and n momenta", "n masses and n forces", "n energies and n times", "2 particles only"], answerIndex: 0 }
            ],
            references: [
              "Taylor, J.R. - 'Classical Mechanics', University Science Books, Chapter 7 on Hamiltonian Mechanics",
              "Goldstein, H. - 'Classical Mechanics', 3rd Edition, Addison-Wesley, Chapter 8 on Hamilton's Equations",
              "Sakurai, J.J. - 'Modern Quantum Mechanics', 2nd Edition, Chapter 1 on Canonical Quantization"
            ]
          }
        },
        {
          id: "cm-m2-2",
          title: "Applications of Hamiltonian Mechanics to Quantum Systems",
          desc: "Explore how Hamiltonian mechanics directly leads to quantum mechanical descriptions.",
          expected: "Understand the connection between classical Hamiltonians and quantum operators.",
          content: {
            aim: {
              text: "This experiment bridges classical and quantum mechanics. You'll see how the classical Hamiltonian—the total energy—becomes the quantum Hamiltonian operator. The energy levels of quantum systems are the eigenvalues of the Hamiltonian, and the wavefunctions are the eigenstates.",
              bullets: [
                "Understand the quantum Hamiltonian as the energy operator",
                "Solve the time-independent Schrödinger equation",
                "Find energy eigenvalues for simple potentials",
                "Understand the harmonic oscillator in quantum mechanics",
                "Connect classical to quantum through the correspondence principle"
              ]
            },
            theory: [
              {
                title: "The Quantum Hamiltonian—The Energy Operator",
                body: [
                  "In quantum mechanics, the Hamiltonian is an operator: Ĥ = -ħ²/2m ∇² + V(x).",
                  "The first term is the kinetic energy operator: -ħ²/2m ∇².",
                  "The second term is the potential energy operator: V(x).",
                  "The time-independent Schrödinger equation: Ĥψ = Eψ.",
                  "![Quantum Hamiltonian](/quantum_hamiltonian.webp)",
                  "This is the eigenvalue equation for the Hamiltonian. The solutions ψ are the energy eigenstates, and E are the energy eigenvalues.",
                  "The classical Hamiltonian H = p²/2m + V(x) becomes the quantum Hamiltonian by replacing p with -iħ∇.",
                  "This is the canonical quantization procedure in action!"
                ]
              },
              {
                title: "The Quantum Harmonic Oscillator—The Workhorse of Quantum Physics",
                body: [
                  "The quantum harmonic oscillator is one of the most important exactly-solvable problems in quantum mechanics.",
                  "Hamiltonian: Ĥ = P̂²/2m + (1/2)mω²X̂².",
                  "Energy eigenvalues: Eₙ = ħω(n + 1/2), n = 0, 1, 2, ...",
                  "![Quantum Harmonic Oscillator](/quantum_harmonic_oscillator.webp)",
                  "The energy levels are equally spaced! This is why it's called a 'harmonic' oscillator—the energy levels are in arithmetic progression.",
                  "The wavefunctions are products of Hermite polynomials and Gaussians.",
                  "The ground state energy E₀ = (1/2)ħω is the zero-point energy—even at absolute zero, the oscillator has energy.",
                  "Applications: Photons (quantized EM field), phonons (lattice vibrations), molecular vibrations, trapped ions."
                ]
              },
              {
                title: "The Correspondence Principle—Classical from Quantum",
                body: [
                  "The correspondence principle states that quantum mechanics reduces to classical mechanics in the limit of large quantum numbers (large n).",
                  "![Correspondence Principle](/correspondence_principle.webp)",
                  "For the harmonic oscillator:",
                  "As n becomes large, the probability distribution of the quantum state approaches the classical distribution.",
                  "The expectation value ⟨x⟩ follows the classical trajectory.",
                  "The uncertainty ΔxΔp approaches ℏ/2 (the minimum uncertainty state).",
                  "This principle is why classical mechanics works for macroscopic objects—their quantum numbers are enormous."
                ]
              },
              {
                title: "The Hydrogen Atom—Quantum Central Force",
                body: [
                  "The hydrogen atom is a quantum central force problem: V(r) = -e²/4πε₀r.",
                  "Hamiltonian: Ĥ = -ħ²/2m ∇² - e²/4πε₀r.",
                  "Energy eigenvalues: Eₙ = -13.6 eV / n², n = 1, 2, 3, ...",
                  "![Hydrogen Atom](/hydrogen_atom.webp)",
                  "The energy levels depend only on the principal quantum number n.",
                  "The wavefunctions are the atomic orbitals: 1s, 2s, 2p, 3s, 3p, 3d, ...",
                  "These orbitals explain the periodic table and chemical bonding.",
                  "The hydrogen atom was the first problem solved using quantum mechanics (Schrödinger, 1926) and confirmed the validity of the new theory."
                ]
              },
              {
                title: "Scattering States and the Quantum Tunneling",
                body: [
                  "In addition to bound states (like the harmonic oscillator and hydrogen atom), quantum mechanics predicts scattering states where particles can pass through barriers.",
                  "Quantum tunneling is a purely quantum effect: a particle can pass through a potential barrier even if it doesn't have enough energy classically.",
                  "![Quantum Tunneling](/quantum_tunneling.webp)",
                  "Applications of tunneling:",
                  "• Scanning tunneling microscope (STM)—images surfaces at the atomic level",
                  "• Alpha decay—alpha particles tunnel out of the nucleus",
                  "• Flash memory—electrons tunnel through an insulating layer",
                  "• Josephson junctions—used in superconducting quantum computing",
                  "The tunneling probability depends exponentially on the barrier height and width, which is why it's so sensitive to small changes—this is what makes the STM so powerful!"
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the mechanics workspace",
              "Review the quantum Hamiltonian and Schrödinger equation",
              "Solve the harmonic oscillator energy levels",
              "Explore the hydrogen atom energy levels",
              "Understand quantum tunneling",
              "Complete the quiz to test your understanding"
            ],
                        posttest: [
            { question: "In quantum mechanics, the classical Hamiltonian becomes a(n):", options: ["Scalar constant", "Operator acting on wavefunctions", "Vector force", "Color function"], answerIndex: 1 },
            { question: "The process of turning classical position/momentum into quantum operators is called:", options: ["Lagrangian duality", "Canonical quantization", "Phase inversion", "Newtonian limit"], answerIndex: 1 },
            { question: "Poisson brackets in classical mechanics correspond to which quantum concept?", options: ["Wavefunction collapse", "Commutators of operators", "Spin", "Photon emission"], answerIndex: 1 },
            { question: "The time-dependent Schrödinger equation involves the Hamiltonian operator acting on the:", options: ["Force vector", "Wavefunction", "Mass", "Position only"], answerIndex: 1 },
            { question: "In quantum mechanics, the position and momentum operators satisfy:", options: ["They always commute", "A non-zero commutation relation (uncertainty)", "No relationship", "Equal to zero always"], answerIndex: 1 },
            { question: "The Heisenberg Uncertainty Principle is deeply connected to the fact that position and momentum:", options: ["Are independent and freely measurable", "Cannot be simultaneously measured with arbitrary precision", "Are always equal", "Don't exist in quantum theory"], answerIndex: 1 },
            { question: "The classical Hamiltonian H = p²/2m + V(x) becomes, in quantum mechanics:", options: ["A classical trajectory equation", "The quantum Hamiltonian operator with p → −iℏ∂/∂x", "Irrelevant", "A scalar mass term"], answerIndex: 1 },
            { question: "Energy eigenvalues in quantum mechanics come from solving:", options: ["F = ma", "The time-independent Schrödinger equation (Ĥψ = Eψ)", "Newton's Third Law", "Ohm's Law"], answerIndex: 1 },
            { question: "The correspondence principle states that quantum mechanics should reduce to classical mechanics:", options: ["Never", "In the limit of large quantum numbers / macroscopic scales", "Only at absolute zero", "Only for photons"], answerIndex: 1 },
            { question: "Ehrenfest's theorem shows that expectation values of quantum operators follow equations resembling:", options: ["Random walks only", "Classical Hamiltonian equations of motion", "Thermodynamic laws only", "Maxwell's equations"], answerIndex: 1 },
            { question: "In quantum mechanics, \"observables\" (like energy, momentum) are represented by:", options: ["Numbers only", "Hermitian operators", "Colors", "Random variables with no structure"], answerIndex: 1 },
            { question: "The quantum harmonic oscillator Hamiltonian is derived directly by quantizing the classical:", options: ["Free particle Hamiltonian", "Harmonic oscillator Hamiltonian (H = p²/2m + ½kx²)", "Gravitational potential", "Electric field equation"], answerIndex: 1 },
            { question: "Phase space in quantum mechanics is replaced/constrained by which principle?", options: ["Newton's Third Law", "The Uncertainty Principle (no exact simultaneous p, q)", "Conservation of mass", "Ohm's Law"], answerIndex: 1 },
            { question: "The Wigner function is a quantum analog of:", options: ["Classical phase space distribution", "Newtonian force", "Lagrangian energy", "Electric charge"], answerIndex: 0 },
            { question: "In quantum mechanics, energy levels of systems like the hydrogen atom are found using:", options: ["Newton's Second Law directly", "The Hamiltonian operator in the Schrödinger equation", "Simple algebra only", "Classical circular orbits only"], answerIndex: 1 },
            { question: "The momentum operator in position representation is:", options: ["x", "−iℏ ∂/∂x", "mv", "F·t"], answerIndex: 1 },
            { question: "Canonical quantization replaces classical Poisson brackets {q,p} = 1 with the quantum commutator:", options: ["[q,p] = 0", "[q,p] = iℏ", "[q,p] = ℏ²", "[q,p] = −1"], answerIndex: 1 },
            { question: "In the path integral formulation (an extension of the least action principle), quantum amplitudes are computed by summing over:", options: ["One classical path only", "All possible paths, weighted by e^(iS/ℏ)", "Zero paths", "Random noise"], answerIndex: 1 },
            { question: "Which classical mechanics framework most directly inspired the path integral formulation of quantum mechanics?", options: ["Newtonian force analysis", "The Lagrangian action principle", "Static equilibrium analysis", "Rigid body dynamics"], answerIndex: 1 },
            { question: "Stationary states in quantum mechanics correspond to solutions where:", options: ["The wavefunction changes randomly", "The probability density is time-independent", "Energy is undefined", "Momentum is infinite"], answerIndex: 1 },
            { question: "The quantum Hamiltonian for a free particle (no potential) is:", options: ["H = p²/2m", "H = mgh", "H = ½kx²", "H = qE"], answerIndex: 0 },
            { question: "Applying Hamiltonian mechanics to quantum systems is foundational for which modern field?", options: ["Classical thermodynamics only", "Quantum computing and quantum field theory", "Basic mechanics only", "Structural engineering"], answerIndex: 1 },
            { question: "In quantum mechanics, \"eigenstates\" of the Hamiltonian represent:", options: ["States with definite, well-defined energy", "Random unstable states", "States with zero energy always", "Only ground-state configurations"], answerIndex: 0 },
            { question: "The transition from classical to quantum Hamiltonian mechanics preserves the underlying mathematical structure of:", options: ["Random probability only", "Phase space and canonical variables (position/momentum)", "Only gravitational forces", "Only electromagnetic fields"], answerIndex: 1 },
            { question: "A major reason Hamiltonian mechanics (rather than Newtonian) underlies quantum theory is that it:", options: ["Uses only force vectors", "Provides the energy-based framework and phase space structure quantum theory needs", "Ignores energy entirely", "Cannot describe oscillators"], answerIndex: 1 }
            ],
            references: [
              "Griffiths, D.J. - 'Introduction to Quantum Mechanics', 2nd Edition, Chapter 2 on the Schrödinger Equation",
              "Sakurai, J.J. - 'Modern Quantum Mechanics', 2nd Edition, Chapter 2 on Quantum Dynamics",
              "Feynman, R.P. - 'The Feynman Lectures on Physics', Volume III, Chapters 1-5 on Quantum Mechanics"
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 3",
      objective: "Introduction to EM Theory, Maxwell's Equations (free space)",
      tutorial: "Tutorial 3: Electromagnetic Theory",
      labTitle: "Lab 3: Maxwell's Equations",
      experiments: [
        {
          id: "cm-m3-1",
          title: "Electric and Magnetic Fields—The Basics",
          desc: "Review the fundamental concepts of electric and magnetic fields.",
          expected: "Able to calculate electric and magnetic fields for simple configurations.",
          content: {
            aim: {
              text: "This experiment introduces the fundamental concepts of electromagnetism: electric fields, magnetic fields, and their sources. You'll learn about Coulomb's law for electrostatics, Ampere's law for magnetostatics, and how these fields are generated by charges and currents.",
              bullets: [
                "Define electric fields and their sources (charges)",
                "Define magnetic fields and their sources (currents)",
                "Apply Coulomb's law and Gauss's law",
                "Apply Ampere's law",
                "Understand electric and magnetic fields in matter"
              ]
            },
            theory: [
              {
                title: "Electric Fields—Charges Create Force at a Distance",
                body: [
                  "An electric field is created by electric charges. It exerts forces on other charges.",
                  "Coulomb's law: F = k q₁q₂/r² (magnitude between two point charges).",
                  "The electric field is E = F/q (force per unit charge).",
                  "For a point charge q: E = kq/r² r̂ (radial, outward for positive, inward for negative).",
                  "![Electric Field](/electric_field.webp)",
                  "Gauss's law: The total electric flux through a closed surface equals the enclosed charge divided by ε₀.",
                  "∮E·dA = Q/ε₀.",
                  "This law is incredibly useful for calculating fields of symmetric charge distributions.",
                  "Example: A sphere of charge. By symmetry, E is radial. Gauss's law gives E(r) = q/(4πε₀r²) for r > R (as if all charge is at the center)."
                ]
              },
              {
                title: "Magnetic Fields—Moving Charges Create Circular Fields",
                body: [
                  "Magnetic fields are created by moving charges (currents). They exert forces on moving charges.",
                  "Ampère's law: The line integral of B around a closed loop equals μ₀ times the enclosed current.",
                  "∮B·dl = μ₀I (for steady currents).",
                  "For a long straight wire: B = μ₀I/2πr (tangential direction).",
                  "![Magnetic Field](/magnetic_field.webp)",
                  "The Biot-Savart law gives the magnetic field of an arbitrary current distribution: dB = (μ₀/4π) × (Idl × r̂)/r².",
                  "Magnetic field lines form closed loops (there are no magnetic monopoles—no isolated north or south poles).",
                  "This is the key difference from electric fields: electric field lines start and end on charges; magnetic field lines always form closed loops."
                ]
              },
              {
                title: "Lorentz Force and Electromagnetic Induction",
                body: [
                  "A charged particle in an electromagnetic field experiences the Lorentz force: F = q(E + v × B).",
                  "![Lorentz Force](/lorentz_force.webp)",
                  "The v × B term means the magnetic force is perpendicular to both velocity and magnetic field—it does no work (changes direction, not speed).",
                  "Electromagnetic induction: Changing magnetic fields create electric fields. This is Faraday's law:",
                  "∇ × E = -∂B/∂t.",
                  "This is the principle behind electric generators: rotating a coil in a magnetic field induces a current.",
                  "Faraday's law also implies Lenz's law: induced currents oppose the change that created them—this is the physics of induction cooking and magnetic braking."
                ]
              },
              {
                title: "Electric and Magnetic Fields in Matter",
                body: [
                  "In matter, fields interact with the medium:",
                  "Electric: The polarization P of the medium responds to E, leading to D = ε₀E + P = εE.",
                  "Magnetic: The magnetization M responds to B, leading to H = B/μ₀ - M = B/μ.",
                  "![Fields in Matter](/fields_in_matter.webp)",
                  "The permittivity ε = ε₀εᵣ and permeability μ = μ₀μᵣ depend on the material.",
                  "These parameters are why light travels slower in materials than in vacuum—the fields interact with the atoms in the medium.",
                  "In optical fibers, the refractive index n = √(εᵣμᵣ) determines the speed of light in the fiber."
                ]
              },
              {
                title: "Electromagnetic Waves—The Invisible Messengers",
                body: [
                  "Maxwell's equations predict the existence of electromagnetic waves—oscillating electric and magnetic fields that travel through space.",
                  "In free space, EM waves travel at the speed of light: c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m/s.",
                  "![Electromagnetic Wave](/electromagnetic_wave.webp)",
                  "The electric and magnetic fields are perpendicular to each other and to the direction of propagation.",
                  "The spectrum of EM waves includes:",
                  "• Radio waves (longest wavelength)",
                  "• Microwaves",
                  "• Infrared",
                  "• Visible light",
                  "• Ultraviolet",
                  "• X-rays",
                  "• Gamma rays (shortest wavelength)",
                  "These waves are the foundation of modern communication: radio, TV, cell phones, Wi-Fi, fiber optics, and quantum networks."
                ]
              }
            ],
                        pretest: [
            { question: "The SI unit of electric field is:", options: ["Volt", "Volt/meter", "Ampere", "Tesla"], answerIndex: 1 },
            { question: "Coulomb's Law describes the force between:", options: ["Two magnets", "Two point charges", "Two currents", "Two conductors"], answerIndex: 1 },
            { question: "The SI unit of magnetic field is:", options: ["Volt", "Weber", "Tesla", "Henry"], answerIndex: 2 },
            { question: "Electric field lines around a positive charge point:", options: ["Inward", "Outward", "Circularly", "Nowhere"], answerIndex: 1 },
            { question: "Electric field is defined as force per unit:", options: ["Mass", "Charge", "Area", "Volume"], answerIndex: 1 },
            { question: "Magnetic field lines around a straight current-carrying wire form:", options: ["Straight lines", "Concentric circles", "Parallel lines", "Random patterns"], answerIndex: 1 },
            { question: "The force on a moving charge in a magnetic field is called:", options: ["Coulomb force", "Lorentz force", "Gravitational force", "Normal force"], answerIndex: 1 },
            { question: "The Lorentz force equation is:", options: ["F = qE", "F = q(E + v×", "", "F = ma"], answerIndex: 1 },
            { question: "Electric flux is a measure of:", options: ["Electric field lines passing through a surface", "Magnetic field strength", "Current flow", "Charge density only"], answerIndex: 0 },
            { question: "Gauss's Law relates electric flux to:", options: ["Magnetic field", "Enclosed electric charge", "Current", "Resistance"], answerIndex: 1 },
            { question: "The direction of the magnetic field around a wire is found using:", options: ["Left-hand rule", "Right-hand rule", "Ohm's rule", "Faraday's rule"], answerIndex: 1 },
            { question: "A dipole consists of:", options: ["Two like charges", "Two equal and opposite charges separated by a distance", "A single charge", "A magnet only"], answerIndex: 1 },
            { question: "Electric potential is measured in:", options: ["Amperes", "Volts", "Ohms", "Tesla"], answerIndex: 1 },
            { question: "The relationship between electric field E and potential V is:", options: ["E = V × d", "E = −dV/dx", "E = V + d", "E = V/d²"], answerIndex: 1 },
            { question: "Magnetic monopoles (isolated N or S poles):", options: ["Are common", "Have never been observed", "Exist in all magnets", "Are found in wires"], answerIndex: 1 },
            { question: "Current is defined as the rate of flow of:", options: ["Voltage", "Charge", "Resistance", "Magnetic flux"], answerIndex: 1 },
            { question: "The permittivity of free space is denoted by:", options: ["μ₀", "ε₀", "σ", "ρ"], answerIndex: 1 },
            { question: "The permeability of free space is denoted by:", options: ["μ₀", "ε₀", "σ", "ρ"], answerIndex: 0 },
            { question: "A charged particle moving parallel to a magnetic field experiences:", options: ["Maximum force", "Zero force", "Force perpendicular to motion", "Force in a random direction"], answerIndex: 1 },
            { question: "Electric field due to a point charge decreases with distance as:", options: ["1/r", "1/r²", "1/r³", "r²"], answerIndex: 1 },
            { question: "A conductor placed in an external electric field has, at equilibrium, an internal field that is:", options: ["Maximum", "Zero", "Doubled", "Random"], answerIndex: 1 },
            { question: "The work done moving a charge along an equipotential surface is:", options: ["Maximum", "Zero", "Negative", "Infinite"], answerIndex: 1 },
            { question: "Magnetic field inside a long solenoid is:", options: ["Zero", "Uniform and strong", "Random", "Only at the ends"], answerIndex: 1 },
            { question: "The SI unit of electric charge is:", options: ["Ampere", "Coulomb", "Volt", "Farad"], answerIndex: 1 },
            { question: "Which of these materials is a good conductor?", options: ["Rubber", "Glass", "Copper", "Wood"], answerIndex: 2 }
            ],
            procedure: [
              "Open the EM workspace",
              "Review electric fields and Coulomb's law",
              "Review magnetic fields and Ampère's law",
              "Understand the Lorentz force",
              "Explore Faraday's law of induction",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Griffiths, D.J. - 'Introduction to Electrodynamics', 4th Edition, Chapters 1-5 on Electric and Magnetic Fields",
              "Feynman, R.P. - 'The Feynman Lectures on Physics', Volume II, Chapters 1-7 on Electromagnetism"
            ]
          }
        },
        {
          id: "cm-m3-2",
          title: "Maxwell's Equations in Free Space",
          desc: "Understand Maxwell's equations and their solutions in vacuum—electromagnetic waves.",
          expected: "Able to derive the wave equation from Maxwell's equations.",
          content: {
            aim: {
              text: "This experiment covers Maxwell's equations—the crowning achievement of classical physics. These four equations unify electricity and magnetism and predict the existence of electromagnetic waves. You'll learn the equations, their physical meaning, and how they lead to the wave equation for EM waves.",
              bullets: [
                "State Maxwell's four equations in differential form",
                "Understand the physical meaning of each equation",
                "Derive the wave equation for E and B in free space",
                "Find plane wave solutions",
                "Understand the speed of light from Maxwell's equations"
              ]
            },
            theory: [
              {
                title: "Maxwell's Equations—The Grand Unification",
                body: [
                  "Maxwell's four equations describe all of classical electromagnetism:",
                  "1. Gauss's law for E: ∇·E = ρ/ε₀ (electric charges source E).",
                  "2. Gauss's law for B: ∇·B = 0 (no magnetic monopoles).",
                  "3. Faraday's law: ∇×E = -∂B/∂t (changing B creates E).",
                  "4. Ampère-Maxwell law: ∇×B = μ₀J + μ₀ε₀∂E/∂t (currents and changing E create B).",
                  "![Maxwell's Equations](/maxwells_equations.webp)",
                  "These are the equations! They are elegant, complete, and breathtakingly beautiful.",
                  "In free space (no charges, no currents): ρ = 0, J = 0.",
                  "Then the equations simplify to: ∇·E = 0, ∇·B = 0, ∇×E = -∂B/∂t, ∇×B = μ₀ε₀∂E/∂t."
                ]
              },
              {
                title: "The Wave Equation—The Birth of Electromagnetic Waves",
                body: [
                  "Take the curl of Faraday's law: ∇×(∇×E) = -∂/∂t(∇×B).",
                  "Use the vector identity: ∇×(∇×E) = ∇(∇·E) - ∇²E = -∇²E (since ∇·E = 0 in free space).",
                  "Substitute from Ampère-Maxwell: ∇×B = μ₀ε₀∂E/∂t.",
                  "This gives: -∇²E = -μ₀ε₀∂²E/∂t² → ∇²E = μ₀ε₀∂²E/∂t².",
                  "This is the wave equation! And the wave speed is v = 1/√(μ₀ε₀) = c.",
                  "![Wave Equation](/wave_equation.webp)",
                  "Similarly, B satisfies the same wave equation.",
                  "Maxwell's equations predict that EM waves exist and travel at the speed of light—light is an electromagnetic wave!"
                ]
              },
              {
                title: "Plane Wave Solutions",
                body: [
                  "The simplest solutions to the wave equation are plane waves:",
                  "E = E₀ cos(k·x - ωt) and B = B₀ cos(k·x - ωt).",
                  "![Plane Wave](/plane_wave.webp)",
                  "Here:",
                  "• k is the wave vector (direction of propagation), |k| = 2π/λ.",
                  "• ω is the angular frequency, ω = 2πf = ck.",
                  "• E₀ and B₀ are the amplitudes.",
                  "The fields satisfy:",
                  "• E·k = 0 (transverse—E is perpendicular to propagation).",
                  "• B·k = 0 (B is perpendicular to propagation).",
                  "• B₀ = (1/c) × (k̂ × E₀) (B is perpendicular to E and k).",
                  "The energy carried by the wave is given by the Poynting vector S = (1/μ₀)E×B."
                ]
              },
              {
                title: "Energy and Momentum of EM Waves",
                body: [
                  "EM waves carry energy and momentum:",
                  "Energy density: u = ε₀E²/2 + B²/2μ₀.",
                  "For a wave, the average energy density is u_avg = ε₀E₀²/2 = B₀²/2μ₀.",
                  "The Poynting vector gives the energy flux: S = (1/μ₀)E×B.",
                  "Average intensity: I = S_avg = c × u_avg.",
                  "![Poynting Vector](/poynting_vector.webp)",
                  "Momentum density: p = S/c² (for a traveling wave).",
                  "This momentum is the principle behind solar sails and radiation pressure.",
                  "The quantum picture: photons carry energy E = ħω and momentum p = ħk."
                ]
              },
              {
                title: "Applications of EM Waves",
                body: [
                  "EM waves are the foundation of modern technology:",
                  "• Radio and TV: Long wavelengths, used for broadcasting.",
                  "• Microwaves: Used in microwave ovens and telecommunications.",
                  "• Infrared: Thermal imaging, remote controls, fiber optics.",
                  "• Visible light: The only part of the spectrum we can see with our eyes.",
                  "• Ultraviolet: Used in sterilization, tanning, and forensic analysis.",
                  "• X-rays: Medical imaging, crystallography, security scanners.",
                  "• Gamma rays: Cancer treatment, astrophysics.",
                  "In quantum computing, photons are excellent qubits—they're fast, have long coherence times, and can be entangled."
                ]
              }
            ],
                        pretest: [
            { question: "How many equations make up Maxwell's Equations?", options: ["2", "3", "4", "5"], answerIndex: 2 },
            { question: "Gauss's Law for electricity relates electric field to:", options: ["Current density", "Charge density", "Magnetic flux", "Resistance"], answerIndex: 1 },
            { question: "Gauss's Law for magnetism states that magnetic field lines:", options: ["Have starting and ending points", "Form closed loops (no monopoles)", "Are always straight", "Don't exist"], answerIndex: 1 },
            { question: "Faraday's Law of Induction states that a changing magnetic field induces:", options: ["A current only", "An electric field/EMF", "A gravitational field", "A charge"], answerIndex: 1 },
            { question: "The Ampère-Maxwell Law relates magnetic field to:", options: ["Electric charge only", "Current and changing electric field (displacement current)", "Gravitational force", "Magnetic monopoles"], answerIndex: 1 },
            { question: "Maxwell added which term to Ampère's original law?", options: ["Conduction current", "Displacement current", "Magnetic charge", "Gravitational term"], answerIndex: 1 },
            { question: "In free space (vacuum), Maxwell's equations simplify because:", options: ["There is no charge or current density", "Mass is infinite", "Fields are always zero", "Time doesn't exist"], answerIndex: 0 },
            { question: "Maxwell's equations predict that light is a form of:", options: ["Sound wave", "Electromagnetic wave", "Gravitational wave", "Mechanical wave"], answerIndex: 1 },
            { question: "The speed of light in vacuum is derived from:", options: ["√(μ₀ε₀)", "1/√(μ₀ε₀)", "μ₀ + ε₀", "μ₀ × ε₀"], answerIndex: 1 },
            { question: "In an EM wave, electric and magnetic fields oscillate:", options: ["Parallel to each other", "Perpendicular to each other and to propagation direction", "Randomly", "In the same direction as propagation"], answerIndex: 1 },
            { question: "Maxwell's equations in differential form use which mathematical operators?", options: ["Only addition", "Divergence and curl", "Only multiplication", "Factorials"], answerIndex: 1 },
            { question: "∇·E = ρ/ε₀ is the differential form of:", options: ["Faraday's Law", "Gauss's Law for electricity", "Gauss's Law for magnetism", "Ampère's Law"], answerIndex: 1 },
            { question: "∇·B = 0 represents:", options: ["No electric charges exist", "No magnetic monopoles exist", "No current flows", "No waves exist"], answerIndex: 1 },
            { question: "∇×E = −∂B/∂t is the differential form of:", options: ["Gauss's Law", "Faraday's Law", "Ampère's Law", "Coulomb's Law"], answerIndex: 1 },
            { question: "∇×B = μ₀J + μ₀ε₀(∂E/∂t) is the differential form of:", options: ["Faraday's Law", "Ampère-Maxwell Law", "Gauss's Law", "Lorentz Law"], answerIndex: 1 },
            { question: "EM waves in free space travel at:", options: ["Any arbitrary speed", "The speed of light, c", "Zero speed", "Infinite speed"], answerIndex: 1 },
            { question: "Displacement current arises due to:", options: ["Steady current flow", "A time-varying electric field", "A stationary charge", "Zero field"], answerIndex: 1 },
            { question: "Maxwell's equations unify which two phenomena?", options: ["Gravity and electricity", "Electricity and magnetism", "Sound and light", "Heat and motion"], answerIndex: 1 },
            { question: "In free space, EM waves are:", options: ["Longitudinal", "Transverse", "Stationary", "Circular only"], answerIndex: 1 },
            { question: "The energy carried by an EM wave is described by the:", options: ["Poynting vector", "Lorentz force", "Coulomb constant", "Faraday constant"], answerIndex: 0 },
            { question: "Maxwell's equations show that a changing electric field produces a:", options: ["Static charge", "Magnetic field", "Gravitational field", "Nothing"], answerIndex: 1 },
            { question: "Which scientist unified electricity, magnetism, and optics into one theory?", options: ["Newton", "Faraday", "Maxwell", "Einstein"], answerIndex: 2 },
            { question: "The wave equation derived from Maxwell's equations in free space applies to:", options: ["Only electric fields", "Both electric and magnetic field components", "Only magnetic monopoles", "Only static charges"], answerIndex: 1 },
            { question: "In vacuum, the ratio of the electric field magnitude to magnetic field magnitude in an EM wave equals:", options: ["μ₀", "ε₀", "The speed of light, c", "Zero"], answerIndex: 2 },
            { question: "Maxwell's equations form the theoretical foundation for:", options: ["Classical mechanics only", "Electromagnetism, optics, and EM wave propagation", "Thermodynamics only", "Quantum spin"], answerIndex: 1 }
            ],
            procedure: [
              "Open the EM workspace",
              "Review Maxwell's four equations",
              "Derive the wave equation from Maxwell's equations",
              "Find plane wave solutions",
              "Understand the energy and momentum carried by EM waves",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Griffiths, D.J. - 'Introduction to Electrodynamics', 4th Edition, Chapter 7 on Electromagnetic Waves",
              "Feynman, R.P. - 'The Feynman Lectures on Physics', Volume II, Chapter 20 on Maxwell's Equations"
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 4",
      objective: "Maxwell's Equations (conducting media, optical fibers)",
      tutorial: "Tutorial 4: Electromagnetic Waves in Media",
      labTitle: "Lab 4: EM Waves in Conductors and Optical Fibers",
      experiments: [
        {
          id: "cm-m4-1",
          title: "Maxwell's Equations in Conducting Media",
          desc: "Study how EM waves propagate in conductors—skin effect, attenuation, and dispersion.",
          expected: "Understand how conductors attenuate EM waves and the concept of skin depth.",
          content: {
            aim: {
              text: "This experiment explores electromagnetic wave propagation in conductors. Unlike dielectrics, conductors have free charges that can move in response to the electric field. This leads to attenuation of the wave—the skin effect—where the wave decays exponentially as it enters the conductor.",
              bullets: [
                "Understand the modified Maxwell's equations in conductors",
                "Derive the wave equation with damping",
                "Define skin depth and attenuation",
                "Explore the skin effect in practical applications",
                "Understand wave propagation in good conductors"
              ]
            },
            theory: [
              {
                title: "Maxwell's Equations in Conductors—Adding Ohmic Losses",
                body: [
                  "In a conductor, the current is related to the electric field by Ohm's law: J = σE.",
                  "Maxwell's equations become:",
                  "∇·E = 0 (no free charges in the bulk of a conductor)",
                  "∇·B = 0",
                  "∇×E = -∂B/∂t",
                  "∇×B = μσE + με∂E/∂t (Ampère's law with the conduction term).",
                  "![Conducting Media](/conducting_media.webp)",
                  "The conduction term μσE introduces damping.",
                  "Taking the curl of Faraday's law and substituting gives:",
                  "∇²E = μσ∂E/∂t + με∂²E/∂t².",
                  "The first term (μσ∂E/∂t) is the damping term—it's what causes attenuation."
                ]
              },
              {
                title: "The Skin Effect—Why EM Waves Can't Penetrate Conductors",
                body: [
                  "For a good conductor (σ >> ωε), the wave equation simplifies to:",
                  "∇²E = μσ∂E/∂t.",
                  "A plane wave solution is E(z,t) = E₀e^{-z/δ}cos(ωt - z/δ), where δ = √(2/ωμσ) is the skin depth.",
                  "![Skin Effect](/skin_effect.webp)",
                  "The skin depth is the distance the wave penetrates before its amplitude drops to 1/e (about 37%) of its surface value.",
                  "For copper at 60 Hz: δ ≈ 8.5 mm.",
                  "For copper at 1 GHz: δ ≈ 2.1 μm! This is why high-frequency signals are carried on the surface of conductors—they don't penetrate deep enough to use the whole wire cross-section.",
                  "Applications:",
                  "• Electromagnetic shielding (metal enclosures)",
                  "• Surface treatment of metals",
                  "• Microwave ovens (the metal screen has holes smaller than the wavelength)"
                ]
              },
              {
                title: "Propagation in Plasmas—When Electrons Oscillate",
                body: [
                  "A plasma is an ionized gas with free electrons. The dispersion relation for EM waves in a plasma is:",
                  "ω² = ω_p² + c²k²",
                  "where ω_p = √(nₑe²/mε₀) is the plasma frequency.",
                  "![Plasma Frequency](/plasma_frequency.webp)",
                  "If ω < ω_p, the wave cannot propagate—it's reflected. This is why radio waves are reflected by the ionosphere!",
                  "If ω > ω_p, the wave propagates with phase velocity v_p = ω/k = c/√(1 - ω_p²/ω²).",
                  "This dispersion is important in astrophysics and in understanding the propagation of radio waves in the Earth's ionosphere."
                ]
              },
              {
                title: "Dispersion and Phase Velocity",
                body: [
                  "In a medium, the phase velocity of an EM wave is v_p = ω/k.",
                  "Dispersion: v_p depends on frequency (i.e., ω is not linear in k).",
                  "In a conductor: k = (1 + i)/δ, so v_p = ωδ (the wave is highly dispersive).",
                  "![Dispersion](/dispersion.webp)",
                  "Group velocity: v_g = dω/dk (the speed of energy transport).",
                  "For a conductor: v_g = 2ωδ (faster than phase velocity, but the wave attenuates quickly).",
                  "In optical fibers, dispersion is carefully managed to prevent pulse spreading over long distances."
                ]
              },
              {
                title: "Applications of the Skin Effect",
                body: [
                  "The skin effect has many practical applications:",
                  "• Induction heating: High-frequency currents heat the surface of a metal part.",
                  "• Surface hardening: Heat only the surface of a metal component.",
                  "• Eddy current brakes: Used in trains and roller coasters.",
                  "• Radio-frequency shielding: Metal enclosures block RF signals.",
                  "• High-frequency transmission: Use hollow waveguides or coaxial cables.",
                  "• MRI: The RF coils are designed with the skin effect in mind.",
                  "In quantum computing, the skin effect influences how microwave signals (used to control qubits) couple to quantum devices—we need to carefully design the transmission lines to minimize losses."
                ]
              }
            ],
                        pretest: [
            { question: "In a conducting medium, an important additional term in Maxwell's equations accounts for:", options: ["Gravitational force", "Conduction current (via Ohm's Law, J = σE)", "Magnetic monopoles", "Zero field"], answerIndex: 1 },
            { question: "The conductivity of a material is denoted by:", options: ["ε", "μ", "σ", "ρ"], answerIndex: 2 },
            { question: "Ohm's Law in point form is:", options: ["J = σE", "E = σJ", "J = μE", "B = σE"], answerIndex: 0 },
            { question: "In a good conductor, EM waves are:", options: ["Not attenuated", "Rapidly attenuated (absorbed)", "Unaffected", "Amplified"], answerIndex: 1 },
            { question: "The \"skin depth\" refers to:", options: ["The thickness of a conductor's insulation", "The depth at which EM wave amplitude falls to 1/e of its surface value", "The total conductor length", "The wire's diameter"], answerIndex: 1 },
            { question: "Skin depth decreases with:", options: ["Decreasing frequency", "Increasing frequency and conductivity", "Zero conductivity", "Increasing wavelength only"], answerIndex: 1 },
            { question: "In a conductor, electric and magnetic fields in an EM wave become:", options: ["In phase", "Out of phase", "Always zero", "Infinite"], answerIndex: 1 },
            { question: "The \"skin effect\" causes high-frequency current to flow mainly:", options: ["Through the center of a conductor", "Near the surface of a conductor", "Uniformly throughout", "Nowhere"], answerIndex: 1 },
            { question: "A perfect conductor has conductivity σ approaching:", options: ["Zero", "Infinity", "A constant finite value", "Negative values"], answerIndex: 1 },
            { question: "In conducting media, the wave equation includes a damping term due to:", options: ["Displacement current only", "Conduction current losses", "Magnetic monopoles", "Zero resistance"], answerIndex: 1 },
            { question: "Good conductors are characterized by which condition relating conduction current to displacement current?", options: ["Conduction current negligible", "Conduction current much greater than displacement current", "Both are zero", "Only displacement current exists"], answerIndex: 1 },
            { question: "The complex propagation constant in a conducting medium has:", options: ["Only a real part", "Only an imaginary part", "Both real (attenuation) and imaginary (phase) parts", "No meaningful parts"], answerIndex: 2 },
            { question: "As frequency increases in a conductor, skin depth:", options: ["Increases", "Decreases", "Stays the same", "Becomes infinite"], answerIndex: 1 },
            { question: "Eddy currents are induced currents that arise due to:", options: ["Static electric fields", "Time-varying magnetic fields in conductors", "Zero current", "Gravitational effects"], answerIndex: 1 },
            { question: "In a lossy (conducting) medium, wave attenuation is characterized by the:", options: ["Attenuation constant α", "Refractive index only", "Permittivity only", "Charge density"], answerIndex: 0 },
            { question: "The intrinsic impedance of a good conductor is:", options: ["Purely real", "Complex, with equal magnitude real and imaginary parts", "Zero", "Infinite"], answerIndex: 1 },
            { question: "Applications relying on the skin effect include:", options: ["DC power transmission only", "High-frequency conductor/cable design and shielding", "Gravitational wave detection", "Static charge storage"], answerIndex: 1 },
            { question: "A material is classified as a \"good conductor\" versus \"good dielectric\" based on comparing:", options: ["Mass and volume", "The loss tangent (σ/ωε)", "Color", "Temperature only"], answerIndex: 1 },
            { question: "Electromagnetic shielding works because conductors:", options: ["Amplify external fields", "Attenuate/block EM waves via induced currents", "Are transparent to all fields", "Have zero conductivity"], answerIndex: 1 },
            { question: "In seawater (a conducting medium), radio wave penetration is:", options: ["Excellent at all frequencies", "Limited, especially at high frequencies", "Infinite", "Unaffected by conductivity"], answerIndex: 1 },
            { question: "The phase velocity of an EM wave in a conducting medium is generally:", options: ["Equal to c always", "Less than in free space and frequency-dependent", "Greater than c", "Undefined"], answerIndex: 1 },
            { question: "Induction heating and metal detectors rely on:", options: ["Static electric fields", "Eddy currents induced in conductors", "Gravitational sensing", "Nuclear reactions"], answerIndex: 1 },
            { question: "In a semiconductor, conductivity lies between:", options: ["Insulators and conductors", "Zero and negative values", "Only very high values", "Only magnetic materials"], answerIndex: 0 },
            { question: "The loss tangent is used to distinguish:", options: ["Conductors from dielectrics based on frequency behavior", "Colors of materials", "Mass differences", "Gravitational effects"], answerIndex: 0 },
            { question: "As conductivity σ approaches zero, the conducting medium equations reduce to those of:", options: ["A perfect conductor", "Free space (lossless dielectric)", "A magnet", "A vacuum tube"], answerIndex: 1 }
            ],
            procedure: [
              "Open the EM workspace",
              "Review Maxwell's equations in conducting media",
              "Derive the skin depth formula",
              "Calculate skin depths for different materials and frequencies",
              "Understand the applications of the skin effect",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Griffiths, D.J. - 'Introduction to Electrodynamics', 4th Edition, Chapter 9 on EM Waves in Conductors",
              "Jackson, J.D. - 'Classical Electrodynamics', 3rd Edition, Chapter 8 on Wave Propagation in Media"
            ]
          }
        },
        {
          id: "cm-m4-2",
          title: "Optical Fibers—Guided EM Waves",
          desc: "Understand how EM waves are guided in optical fibers through total internal reflection.",
          expected: "Able to explain the principle of total internal reflection and the structure of optical fibers.",
          content: {
            aim: {
              text: "This experiment explores optical fibers—the technology that powers the internet and modern telecommunications. You'll learn how light is guided through fibers using total internal reflection, how fiber is constructed, and the different types of fibers. You'll also understand why optical fibers are so important for quantum communication.",
              bullets: [
                "Understand the principle of total internal reflection",
                "Learn the structure of optical fibers (core, cladding, coating)",
                "Understand single-mode vs multi-mode fibers",
                "Explore dispersion in optical fibers",
                "Understand the applications in telecommunications and quantum communication"
              ]
            },
            theory: [
              {
                title: "Total Internal Reflection—The Key to Fiber Optics",
                body: [
                  "When light travels from a denser medium (higher n) to a less dense medium (lower n), it bends away from the normal. If the angle of incidence exceeds the critical angle, the light is completely reflected—this is total internal reflection.",
                  "![Total Internal Reflection](/total_internal_reflection.webp)",
                  "Snell's law: n₁ sin θ₁ = n₂ sin θ₂.",
                  "Critical angle: sin θ_c = n₂/n₁ (where n₁ > n₂).",
                  "In an optical fiber, the core has higher index (n₁) than the cladding (n₂). Light above the critical angle is trapped in the core and guided along the fiber.",
                  "This is why optical fibers can bend around corners—the light bounces off the walls, but since it's always above the critical angle, it stays trapped."
                ]
              },
              {
                title: "Optical Fiber Structure",
                body: [
                  "An optical fiber has three main parts:",
                  "• Core: The central light-carrying region. Made of high-purity silica glass or plastic.",
                  "• Cladding: Surrounds the core. Has lower refractive index than the core.",
                  "• Coating (jacket): Protective outer layer (plastic).",
                  "![Optical Fiber Structure](/optical_fiber_structure.webp)",
                  "The core diameter varies:",
                  "• Single-mode fiber: ~9 μm core—only one mode propagates.",
                  "• Multi-mode fiber: ~50-62.5 μm core—many modes propagate.",
                  "The difference in refractive index Δn = n_core - n_cladding is typically ~0.01-0.03."
                ]
              },
              {
                title: "Single-Mode vs Multi-Mode Fibers",
                body: [
                  "Single-mode fiber:",
                  "• Small core (~9 μm).",
                  "• Only the fundamental mode propagates.",
                  "• No modal dispersion—all light travels the same path.",
                  "• Used for long-distance communication (up to 100 km+).",
                  "![Single Mode Fiber](/single_mode_fiber.webp)",
                  "Multi-mode fiber:",
                  "• Larger core (~50 μm).",
                  "• Many modes propagate simultaneously.",
                  "• Modal dispersion occurs—different modes take different paths, spreading out the pulse.",
                  "• Used for short distances (up to a few km).",
                  "A simple rule: For distances less than 2 km, multi-mode is cheaper and easier to connect. For longer distances, single-mode is required."
                ]
              },
              {
                title: "Dispersion and Loss in Optical Fibers",
                body: [
                  "Even in single-mode fibers, light pulses spread out due to:",
                  "• Chromatic dispersion: Different wavelengths travel at different speeds.",
                  "• Material dispersion: Due to the wavelength-dependent index of refraction.",
                  "• Waveguide dispersion: Due to the geometry of the fiber.",
                  "![Fiber Dispersion](/fiber_dispersion.webp)",
                  "Loss in fibers:",
                  "• Intrinsic loss: Rayleigh scattering (1/λ⁴) and infrared absorption.",
                  "• Extrinsic loss: Bending, impurities, connector losses.",
                  "Minimum loss: ~0.2 dB/km at 1550 nm—this is why modern telecom uses this wavelength.",
                  "New fibers (such as hollow-core fibers) have even lower losses and are being developed for quantum communication."
                ]
              },
              {
                title: "Optical Fibers in Quantum Communication",
                body: [
                  "Optical fibers are the backbone of quantum communication networks:",
                  "• Quantum key distribution (QKD) uses single photons sent through optical fibers.",
                  "• Entanglement distribution requires maintaining entanglement over fiber distances.",
                  "• Challenges: Loss (a 100 km fiber attenuates a signal by a factor of ~1000).",
                  "• Solutions: Quantum repeaters, entanglement swapping, satellite quantum communication.",
                  "![Quantum Fiber Communication](/quantum_fiber_communication.webp)",
                  "The goal: A global quantum internet where quantum states are transmitted and processed over fiber networks.",
                  "The first quantum networks (in China, the US, and Europe) already use optical fibers to distribute entangled photons between nodes."
                ]
              }
            ],
                        pretest: [
            { question: "Optical fibers guide light waves using the principle of:", options: ["Reflection only", "Total internal reflection", "Refraction only", "Diffraction only"], answerIndex: 1 },
            { question: "An optical fiber consists mainly of:", options: ["A single conducting wire", "A core and cladding with different refractive indices", "A hollow tube", "A magnetic coil"], answerIndex: 1 },
            { question: "For total internal reflection to occur, light must travel from a medium of:", options: ["Lower to higher refractive index", "Higher to lower refractive index", "Equal refractive index", "Zero refractive index"], answerIndex: 1 },
            { question: "The refractive index of the core is _____ than that of the cladding.", options: ["Lower", "Higher", "Equal", "Unrelated"], answerIndex: 1 },
            { question: "The angle beyond which total internal reflection occurs is called the:", options: ["Angle of incidence", "Critical angle", "Refraction angle", "Brewster angle"], answerIndex: 1 },
            { question: "Numerical aperture (NA) of an optical fiber measures:", options: ["Its physical length", "Its light-gathering ability", "Its electrical resistance", "Its magnetic field strength"], answerIndex: 1 },
            { question: "Single-mode fibers have a _____ core compared to multi-mode fibers.", options: ["Larger", "Smaller", "Equal", "Hollow"], answerIndex: 1 },
            { question: "Multi-mode fibers allow multiple light paths, leading to:", options: ["No signal loss", "Modal dispersion", "Increased bandwidth only", "Zero attenuation"], answerIndex: 1 },
            { question: "Attenuation in optical fibers refers to:", options: ["Signal amplification", "Loss of signal strength over distance", "Increase in bandwidth", "Change in color"], answerIndex: 1 },
            { question: "The main causes of attenuation in optical fibers include:", options: ["Only reflection", "Absorption and scattering", "Only magnetic effects", "Gravitational pull"], answerIndex: 1 },
            { question: "Dispersion in optical fibers causes:", options: ["Signal amplification", "Pulse broadening, limiting bandwidth", "Zero data loss", "Increased speed"], answerIndex: 1 },
            { question: "Which type of fiber minimizes modal dispersion the most?", options: ["Multi-mode step-index", "Single-mode fiber", "Hollow-core only", "Copper wire"], answerIndex: 1 },
            { question: "Optical fibers are primarily made of:", options: ["Copper", "Silica glass or plastic", "Iron", "Aluminum"], answerIndex: 1 },
            { question: "The main advantage of optical fibers over copper cables is:", options: ["Lower bandwidth", "Higher bandwidth and immunity to electromagnetic interference", "Heavier weight", "Higher signal loss"], answerIndex: 1 },
            { question: "Graded-index fibers reduce modal dispersion by:", options: ["Using a uniform refractive index", "Gradually varying the refractive index across the core", "Removing the cladding", "Using a hollow core"], answerIndex: 1 },
            { question: "In optical fiber communication, light sources commonly used include:", options: ["Incandescent bulbs", "LEDs and laser diodes", "Fluorescent tubes", "Neon lights"], answerIndex: 1 },
            { question: "Optical fibers are widely used in which field?", options: ["Structural engineering", "Telecommunications and internet data transmission", "Nuclear physics only", "Mechanical engineering only"], answerIndex: 1 },
            { question: "The \"V-number\" (normalized frequency) of a fiber determines:", options: ["Its color", "Whether it supports single or multiple modes", "Its length", "Its resistance"], answerIndex: 1 },
            { question: "Bending an optical fiber too sharply can cause:", options: ["Increased signal strength", "Signal loss due to light escaping the core (bend loss)", "No effect", "Amplification"], answerIndex: 1 },
            { question: "Optical fiber cladding serves to:", options: ["Increase attenuation", "Confine light within the core via total internal reflection", "Conduct electricity", "Absorb all light"], answerIndex: 1 },
            { question: "Compared to copper cables, optical fibers are:", options: ["Susceptible to electromagnetic interference", "Immune to electromagnetic interference", "Heavier", "Lower bandwidth"], answerIndex: 1 },
            { question: "Optical fiber connectors and splices must be precisely aligned to minimize:", options: ["Bandwidth", "Insertion/coupling loss", "Weight", "Color change"], answerIndex: 1 },
            { question: "Chromatic dispersion occurs because:", options: ["All wavelengths travel at exactly the same speed", "Different wavelengths of light travel at slightly different speeds in the fiber", "The fiber has no core", "Light doesn't refract"], answerIndex: 1 },
            { question: "Erbium-doped fiber amplifiers (EDFAs) are used to:", options: ["Reduce signal strength", "Amplify optical signals directly without electrical conversion", "Convert light to heat", "Increase attenuation intentionally"], answerIndex: 1 },
            { question: "Wavelength Division Multiplexing (WDM) in optical fibers allows:", options: ["Only one signal at a time", "Multiple signals at different wavelengths to be sent simultaneously", "No data transmission", "Only electrical signals"], answerIndex: 1 }
            ],
            procedure: [
              "Open the EM workspace",
              "Review the principle of total internal reflection",
              "Understand the structure of optical fibers",
              "Distinguish between single-mode and multi-mode fibers",
              "Explore dispersion and loss in fibers",
              "Understand the applications in telecommunications and quantum communication",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Griffiths, D.J. - 'Introduction to Electrodynamics', 4th Edition, Chapter 9 on EM Waves in Dielectrics",
              "Keiser, G. - 'Optical Fiber Communications', 5th Edition, Chapters 1-3 on Fiber Optics",
              "Gisin, N. and Thew, R. - 'Quantum Communication and Quantum Networking', Nature Photonics 1, 165-171 (2007)"
            ]
          }
        }
      ]
    }
  ]
};