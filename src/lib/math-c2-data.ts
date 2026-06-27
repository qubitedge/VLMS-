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
            posttest: [],
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
            posttest: [],
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
            posttest: [],
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
            posttest: [],
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
            pretest: [],
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
            pretest: [],
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
            pretest: [],
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
            pretest: [],
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