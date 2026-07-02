export const classicalMechShortNotes = `CLASSICAL MECHANICS AND ELECTROMAGNETISM - SHORT NOTES

INTRODUCTION TO CLASSICAL MECHANICS AND ELECTROMAGNETISM
Classical mechanics and electromagnetism form the foundation of modern physics and engineering. This course bridges the gap from Newtonian force-based mechanics to energy-based Lagrangian and Hamiltonian formulations—which directly lay the groundwork for quantum mechanics. The second half extends into the unification of electricity and magnetism via Maxwell's equations and their real-world applications in wave propagation and guided fiber optics.

UNIT I — CLASSICAL MECHANICS: NEWTON, LAGRANGE, HAMILTON

NEWTON'S LAWS AND BASIC MECHANICS
Classical mechanics begins with three fundamental laws formulated by Isaac Newton that describe how objects move under the influence of forces.

Newton's First Law — An object at rest stays at rest, and an object in motion continues moving at constant velocity in a straight line, unless acted upon by a net external force. This law essentially defines what a force is: the agent that changes motion.
Inertia — The tendency of matter to resist changes in its state of motion, directly proportional to mass.
Newton's Second Law — The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. Mathematically, F = ma, or more precisely F = dp/dt (rate of change of momentum).
Newton's Third Law — For every action, there is an equal and opposite reaction. Forces always come in pairs acting on different objects.

Key concepts covered:
Reference frames — Distinguishing between inertial (non-accelerating) and non-inertial (accelerating) frames.
Free body diagrams — Visual tools used to map and sum all external forces acting on a system.
Momentum (p = mv) — The product of mass and velocity, conserved in any closed system.
Friction and gravity — Everyday forces representing resistive interactions and gravitational attraction.
Circular motion — The centripetal force (F = mv²/r) directed toward the center of curvature.

ELI5:
Think of a soccer ball sitting on grass. It won't move unless someone kicks it (1st law — no force, no motion change). Kick it harder, and it flies faster and farther (2nd law — more force = more acceleration). And when your foot kicks the ball, you actually feel the ball "kick back" against your foot too (3rd law — that's why kicking a wall hurts more than kicking a pillow).

![Newton's Laws Infographic](/newtons_laws_infographic.png)

LAGRANGIAN MECHANICS — THE ENERGY APPROACH
While Newtonian mechanics tracks forces directly, Lagrangian mechanics reformulates the same physics using energy as the central quantity, making it far easier to solve complex systems (like pendulums on moving carts, or planets orbiting stars).

The Lagrangian (L) — Defined as L = T − V, where T is kinetic energy and V is potential energy.
Principle of Least Action — Nature picks the path between two points that makes the action (integral of L over time) stationary (usually minimal).
Generalized coordinates — Coordinates (q) that conveniently describe a system, avoiding Cartesian constraints.
Euler-Lagrange Equation — The central equation d/dt(∂L/∂q̇) − ∂L/∂q = 0 derived from the calculus of variations.

Key concepts covered:
Energy formulations — Working with scalar kinetic and potential energies instead of vector forces.
Degrees of freedom — The number of independent coordinates needed to uniquely define a system's state.
Noether's Theorem — Symmetries in the Lagrangian correspond directly to physical conservation laws (e.g., time translation symmetry leads to energy conservation).

ELI5:
Imagine you're hiking from your house to a mountain top. Newtonian mechanics is like checking your compass and muscles every single step. Lagrangian mechanics is like looking at the whole mountain from a helicopter first and figuring out the smartest possible trail before you even take step one — because nature is lazy and always finds the path of least total effort.

![Lagrangian Mountain Path](/lagrangian_mountain_path.png)

HAMILTONIAN MECHANICS — PHASE SPACE AND HAMILTON'S EQUATIONS
Hamiltonian mechanics is another reformulation of classical mechanics, built on top of the Lagrangian framework, but shifting focus from velocity to momentum.

The Hamiltonian (H) — Defined as H = T + V (total energy), obtained from the Lagrangian via Legendre transformation.
Canonical variables — Position (q) and momentum (p) treated as independent variables.
Hamilton's Equations — Symmetric first-order differential equations: dq/dt = ∂H/∂p and dp/dt = −∂H/∂q.
Phase space — A conceptual space where each point captures the complete state (q, p) of a system.

Key concepts covered:
First-order systems — Hamilton's equations replace one second-order equation with two symmetric first-order equations.
Phase trajectories — Curves in phase space representing system evolution. Trajectories never cross in deterministic systems.
Liouville's Theorem — Phase space volume is conserved during the flow of a Hamiltonian system.

ELI5:
Imagine tracking a swinging pendulum. Instead of just plotting "where is it" over time, you plot "where is it" AND "how fast/hard is it swinging" together on one graph. That combined graph — phase space — is like a fingerprint that tells you everything about the pendulum's future without needing anything else.

![Hamiltonian Phase Space](/hamiltonian_phase_space.png)

APPLICATIONS OF HAMILTONIAN MECHANICS TO QUANTUM SYSTEMS
Hamiltonian mechanics isn't just a classical tool — it's the direct mathematical bridge into quantum mechanics.

Classical vs Quantum — In classical mechanics, the Hamiltonian is a function. In quantum mechanics, it becomes an operator (H-hat) acting on wavefunctions.
Schrödinger Equation — The time-independent quantum equation Hψ = Eψ, where H is the Hamiltonian operator and E is the energy eigenvalue.
Correspondence principle — The rule that quantum mechanics must reduce to classical mechanics in the limit of large quantum numbers.
Quantization recipe — Replacing classical variables with operators and Poisson brackets with commutators: [Q, P] = iħ.

Key concepts covered:
Wavefunctions (ψ) — Probability amplitude fields describing the state of a quantum system.
Operators — Mathematical actions representing physical observables (momentum, position, energy).
Dirac Quantization — Direct mapping of Poisson brackets to quantum commutators: {f, g} -> (1/iħ)[F, G].

ELI5:
In the classical world, the Hamiltonian tells you the total energy of a solid ball rolling around. In the quantum world, there's no solid ball anymore — just a fuzzy "cloud of probability" describing where a particle might be. The Hamiltonian becomes a special math machine that, when applied to that fuzzy cloud, tells you its energy.

![Quantum Classical Comparison](/quantum_classical_comparison.png)

UNIT II — ELECTROMAGNETISM: FIELD THEORY AND MAXWELL'S EQUATIONS

ELECTRIC AND MAGNETIC FIELDS — THE BASICS
Before diving into Maxwell's equations, it's essential to understand the two fundamental fields of electromagnetism.

Electric Field (E) — A vector field representing the force per unit charge experienced by a positive test charge.
Magnetic Field (B) — A vector field produced by moving electric charges (currents) or intrinsic magnetic moments (spin).
Coulomb's Law — The inverse-square relationship describing the force between static charges.
Lorentz Force — The electromagnetic force F = q(E + v × B) acting on a charge q moving with velocity v.

Key concepts covered:
Field lines — Visual guides showing field directions (E-lines start on + and end on -; B-lines always form closed loops).
Right-hand rule — Used to determine the circular direction of a magnetic field surrounding a current-carrying wire.
Magnetic monopoles — Non-existent in classical electromagnetism; cutting a magnet always creates a new North-South pair.

ELI5:
A charged object is like an invisible fan constantly blowing air (force) outward — that's the electric field, pushing or pulling other charges nearby. A magnet is like an invisible whirlpool swirling around it — that's the magnetic field, and it only "grabs" things that are already moving through it, like a compass needle or a moving electron.

![Electric and Magnetic Fields](/electric_magnetic_fields.png)

MAXWELL'S EQUATIONS IN FREE SPACE
James Clerk Maxwell unified electricity, magnetism, and optics into four elegant equations that describe all classical electromagnetic phenomena.

Gauss's Law for Electricity — ∇·E = ρ/ε₀, stating that electric charges are the sources of electric fields.
Gauss's Law for Magnetism — ∇·B = 0, stating that there are no magnetic monopoles; B-field lines form closed loops.
Faraday's Law of Induction — ∇×E = −∂B/∂t, showing a changing magnetic field creates a circulating electric field.
Ampère-Maxwell Law — ∇×B = μ₀J + μ₀ε₀∂E/∂t, showing currents and changing electric fields generate magnetic fields.
Displacement current — The term ∂E/∂t added by Maxwell to ensure mathematical and physical charge conservation.

Key concepts covered:
Free space equations — In vacuum (ρ=0, J=0), Maxwell's equations simplify and yield the wave equation.
Speed of light — EM waves in vacuum travel at a speed derived from fundamental constants: c = 1/√(μ₀ε₀).
Poynting Vector (S) — Represents the directional energy flux density (power per unit area) of an EM wave.

ELI5:
Think of the electric and magnetic fields as two dance partners holding hands. When one moves or changes, it forces the other to move too — and this "dance" keeps repeating and traveling outward through empty space forever, like a ripple that never dies out. That traveling ripple-dance is light.

![Maxwell Free Space Wave](/maxwell_free_space_wave.png)

UNIT III — ELECTROMAGNETISM IN CONDUCTING MEDIA AND FIBER OPTICS

MAXWELL'S EQUATIONS IN CONDUCTING MEDIA
When electromagnetic waves travel through conductors (metals) instead of free space, the presence of free-moving electrons alters their behavior dramatically.

Conduction current — In media, current density follows Ohm's law: J = σE, where σ is electrical conductivity.
Damping and attenuation — Free electrons respond to the wave's E-field, dissipating its energy as heat.
Skin Effect — The concentration of high-frequency EM waves and AC currents along the outer surface of a conductor.
Skin depth (δ) — The depth at which wave amplitude decays to 1/e (~37%). Formula: δ = √(2/ωμσ).
Complex wave number — k = k_r + i·k_i, where the imaginary component represents exponential signal decay.

Key concepts covered:
Ohmic loss — Energy dissipation as heat due to induced currents in resistive conducting media.
Shielding — The physical basis of Faraday cages, which block external radio signals and electrostatic forces.
Frequency dependence — Higher frequency waves decay much faster, leading to thinner skin depths.

ELI5:
Imagine throwing a light beam or radio wave into a conductor like a swimming pool full of thick mud instead of clear water. The "mud" (free electrons) grabs onto the wave's energy immediately and turns it into heat, so the wave can only travel a tiny distance before it's basically gone. That's why wrapping something in aluminum foil blocks WiFi signals.

![Maxwell Conducting Media](/maxwell_conducting_media.png)

OPTICAL FIBERS — GUIDED EM WAVES
Optical fibers are one of the most important real-world applications of electromagnetic wave theory, forming the backbone of modern internet and telecommunications infrastructure.

Core and Cladding — The inner glass core has index n₁; the outer cladding has a lower index n₂ (n₁ > n₂).
Total Internal Reflection — Light bouncing off the core-cladding boundary at angles greater than the critical angle (θ_c).
Critical angle — The boundary angle sin(θ_c) = n₂/n₁ above which light cannot refract out and is entirely reflected.
Numerical Aperture (NA) — A measure of light-gathering ability: NA = √(n₁² − n₂²).
Single-mode vs Multi-mode — Single-mode has a thin core (~9μm) preventing modal dispersion; multi-mode has a wider core.

Key concepts covered:
Snell's Law — n₁ sin θ₁ = n₂ sin θ₂, governing refraction at media interfaces.
Modal dispersion — The spreading of light pulses over time in multi-mode fibers due to different path lengths.
Signal attenuation — Scattering and absorption loss, optimized at telecom wavelengths (e.g., 1550 nm).

ELI5:
Picture a long hallway completely lined with mirrors on the walls. If you shine a flashlight down that hallway at just the right angle, the light beam keeps bouncing off the mirrored walls over and over, traveling all the way to the far end without ever escaping through the walls. That's exactly what an optical fiber does — it traps light inside a thin glass tube using reflection, letting it carry data (like your internet signal) across huge distances at incredible speed.

![Optical Fiber Reflection](/optical_fiber_reflection.png)
`;
