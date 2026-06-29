
export const mathShortNotes = `MATHEMATICS FOR EMERGING TECHNOLOGIES - SHORT NOTES

INTRODUCTION: THE MATHEMATICAL FOUNDATION OF MODERN TECHNOLOGY

Mathematics is the language of the universe, and linear algebra and probability form the bedrock of modern emerging technologies. From the quantum states in a quantum computer to the probability distributions that power machine learning algorithms, these mathematical tools are everywhere.

This course bridges the gap between abstract mathematics and practical applications. Starting with vectors and matrices, we build up to complex inner product spaces and Hilbert spaces—the mathematical language of quantum mechanics. The second half covers probability and statistics, essential for understanding uncertainty in data, making predictions, and building AI systems.

Course Outcomes:
1. Understand vectors, vector spaces, and linear transformations as fundamental mathematical tools
2. Master eigenvalues, eigenvectors, and diagonalization with applications to quantum computing
3. Develop a strong foundation in probability theory and random variables
4. Understand the central limit theorem and its importance in statistics
5. Apply linear algebra and probability concepts to emerging technologies like quantum computing & AI

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Module</th><th class="p-3 border border-cyan/20">Topics</th><th class="p-3 border border-cyan/20">Key Applications</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Module 1</td><td class="p-3 border border-cyan/20">Vectors, Vector Spaces, Linear Transformations, Complex Vectors & Matrices</td><td class="p-3 border border-cyan/20">Quantum state representation, feature vectors in ML</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Module 2</td><td class="p-3 border border-cyan/20">Eigenvalues, Eigenvectors, Inner Products, Hilbert Spaces, Diagonalization</td><td class="p-3 border border-cyan/20">Quantum measurements, energy states, Google PageRank</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Module 3</td><td class="p-3 border border-cyan/20">Statistics, Probability, Random Variables</td><td class="p-3 border border-cyan/20">Data analysis, prediction under uncertainty</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Module 4</td><td class="p-3 border border-cyan/20">Probability Distributions, Central Limit Theorem</td><td class="p-3 border border-cyan/20">Confidence intervals, quantum measurement statistics</td></tr></tbody></table>


UNIT I: LINEAR ALGEBRA - VECTORS, SPACES & TRANSFORMATIONS

1.1 VECTORS AND VECTOR SPACES

WHAT IS A VECTOR? BEYOND ARROWS

When you hear 'vector', what comes to mind? An arrow pointing from one place to another? That's a good start—but vectors are so much more.

In the world of mathematics, a vector is any object that obeys two simple rules: you can add two vectors together, and you can multiply a vector by a number (scalar). That's it!

![Vector Visualization](/vector_space_basics.webp)

Think of a shopping cart: you have a list of items and each item has a price and a quantity. The total cost is a linear combination of (price × quantity). Each item is like a 'basis vector' and the quantity is the scalar multiplier.

In machine learning, a patient's medical record might be a vector: [age, blood_pressure, cholesterol, heart_rate]. Adding two patients' vectors just adds their measurements—that might not make sense, but it shows how vectors are just organized lists of numbers.

In quantum computing, a particle's state is a vector—a list of complex numbers where each number is the probability amplitude of finding the particle in a particular state.

VECTOR ADDITION AND SCALAR MULTIPLICATION

Imagine you have two vectors in 2D space: v = (2, 3) and w = (1, 4).

Vector Addition: v + w = (2+1, 3+4) = (3, 7). Simple—add component by component.

Scalar Multiplication: 3 × v = (3×2, 3×3) = (6, 9). Each component gets multiplied by the scalar.

These two operations—addition and scalar multiplication—are the only rules that define a vector. If a set of objects follows these rules, it's a vector space.

Why are these operations important? Because they're the foundation of linear algebra. Every matrix multiplication, every transformation, every quantum operation is built from these two simple operations.

THE VECTOR SPACE—RULES OF THE GAME

A vector space is a set of vectors that plays by ten specific rules. Think of them as the 'constitution' of the vector world:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Property</th><th class="p-3 border border-cyan/20">Rule</th><th class="p-3 border border-cyan/20">Meaning</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">1. Closure under addition</td><td class="p-3 border border-cyan/20">v + w is in the space</td><td class="p-3 border border-cyan/20">Adding two vectors keeps you in the space</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">2. Commutativity</td><td class="p-3 border border-cyan/20">v + w = w + v</td><td class="p-3 border border-cyan/20">Order doesn't matter for addition</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">3. Associativity</td><td class="p-3 border border-cyan/20">(u+v)+w = u+(v+w)</td><td class="p-3 border border-cyan/20">Grouping doesn't matter</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">4. Additive Identity</td><td class="p-3 border border-cyan/20">v + 0 = v</td><td class="p-3 border border-cyan/20">Zero vector exists</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">5. Additive Inverse</td><td class="p-3 border border-cyan/20">v + (-v) = 0</td><td class="p-3 border border-cyan/20">Every vector has a negative</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">6. Closure under scalar multiplication</td><td class="p-3 border border-cyan/20">c × v is in the space</td><td class="p-3 border border-cyan/20">Scaling keeps you in the space</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">7. Distributivity (vector addition)</td><td class="p-3 border border-cyan/20">c×(u+v) = c×u + c×v</td><td class="p-3 border border-cyan/20">Scaling distributes over addition</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">8. Distributivity (scalar addition)</td><td class="p-3 border border-cyan/20">(c+d)×v = c×v + d×v</td><td class="p-3 border border-cyan/20">Scalar addition distributes</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">9. Associativity of scalar multiplication</td><td class="p-3 border border-cyan/20">c×(d×v) = (cd)×v</td><td class="p-3 border border-cyan/20">Scalar multiplication associates</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">10. Identity for scalar multiplication</td><td class="p-3 border border-cyan/20">1 × v = v</td><td class="p-3 border border-cyan/20">Multiplying by 1 does nothing</td></tr></tbody></table>

These rules might seem dry, but they're what make linear algebra so powerful—every vector space, from 2D arrows to infinite-dimensional quantum spaces, follows the same rules.

LINEAR COMBINATIONS AND SPAN

A linear combination of vectors is just adding them up after scaling each one. For vectors v₁, v₂, ..., vₙ, any expression c₁v₁ + c₂v₂ + ... + cₙvₙ is a linear combination.

Example: If v₁ = (1, 0) and v₂ = (0, 1), then 3v₁ + 4v₂ = (3, 4). We just built any point in 2D!

![Linear Combination](/linear_combination.webp)

The 'span' of a set of vectors is all the points you can reach with linear combinations. If you have v₁ = (1, 0) and v₂ = (0, 1), their span is the entire 2D plane.

If you have v₁ = (1, 0) and v₂ = (2, 0), their span is only the x-axis—a line, not a plane.

A set of vectors 'spans' a space if you can reach any point in that space with some linear combination. If two vectors don't point in the same direction (they're linearly independent), they span a 2D space.

In quantum computing, the state of a qubit is a linear combination of two basis states: |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex numbers. The span of |0⟩ and |1⟩ is the entire 2D complex vector space—the Bloch sphere.

LINEAR INDEPENDENCE—NO REDUNDANCY ALLOWED

A set of vectors is linearly independent if no vector can be written as a linear combination of the others. In other words, each vector brings something new to the table.

Example: v₁ = (1, 0) and v₂ = (0, 1) are independent—you can't make one from the other.

Example: v₁ = (1, 2) and v₂ = (2, 4) are dependent—v₂ = 2×v₁. They're redundant.

How to test? Set up c₁v₁ + c₂v₂ + ... = 0 and see if all c's must be zero. If yes, independent. If there's a non-zero solution, dependent.

Why does independence matter? In quantum computing, the basis states |0⟩ and |1⟩ must be independent—otherwise, we couldn't represent all possible qubit states uniquely. In machine learning, we want features (vectors) to be independent so each one adds new information.

BASIS AND DIMENSION

A basis is a set of linearly independent vectors that spans the entire space. It's like a 'coordinate system' for that space.

In 2D, {(1,0), (0,1)} is the standard basis—also called î and ĵ.

In n-dimensional space, you need exactly n basis vectors. The number of basis vectors is the dimension.



Fun fact: A vector space can have many different bases! (1,0), (0,1) is a basis, but so is (1,1), (1,-1). They all work.

In quantum computing, {|0⟩, |1⟩} is one basis—the computational basis. But we could also use {|+⟩, |-⟩} where |+⟩ = (|0⟩+|1⟩)/√2 and |-⟩ = (|0⟩-|1⟩)/√2. Both are perfectly valid bases.

The dimension of a quantum system is the number of basis states. A qubit has dimension 2, a qutrit has dimension 3. As we add more qubits, the dimension grows exponentially—2^n for n qubits!

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Concept</th><th class="p-3 border border-cyan/20">Definition</th><th class="p-3 border border-cyan/20">Quantum Analogy</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Vector</td><td class="p-3 border border-cyan/20">Object with magnitude and direction</td><td class="p-3 border border-cyan/20">Quantum state |ψ⟩</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Linear Combination</td><td class="p-3 border border-cyan/20">c₁v₁ + c₂v₂ + ... + cₙvₙ</td><td class="p-3 border border-cyan/20">α|0⟩ + β|1⟩ (superposition)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Span</td><td class="p-3 border border-cyan/20">All possible linear combinations</td><td class="p-3 border border-cyan/20">All possible quantum states</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Linear Independence</td><td class="p-3 border border-cyan/20">No vector is combination of others</td><td class="p-3 border border-cyan/20">Distinguishable states</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Basis</td><td class="p-3 border border-cyan/20">Independent spanning set</td><td class="p-3 border border-cyan/20">Measurement basis (computational, Hadamard)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Dimension</td><td class="p-3 border border-cyan/20">Number of basis vectors</td><td class="p-3 border border-cyan/20">2^n for n qubits</td></tr></tbody></table>

1.2 LINEAR TRANSFORMATIONS AND MATRICES

WHAT IS A LINEAR TRANSFORMATION?

Imagine you have a rubber sheet with a grid drawn on it. A linear transformation is any way you can stretch, rotate, or shear that sheet—but with two strict rules:
1. Straight lines must stay straight (no curving).
2. The origin (0,0) must stay at the origin.

![Linear Transformation](/linear_transformation.webp)

More formally, a transformation T is linear if it follows two rules:
- T(u + v) = T(u) + T(v) — adding then transforming is the same as transforming then adding.
- T(c × v) = c × T(v) — scaling then transforming is the same as transforming then scaling.

This is exactly the same two rules that define a vector! A linear transformation is a function that 'respects' the vector space structure.

MATRICES AS TRANSFORMATIONS

Here's the key insight: every linear transformation on an n-dimensional space can be represented as an m×n matrix.

The matrix tells you where each basis vector goes. If we know where î and ĵ go, we know where every vector goes!

Example: Rotation by 90° counterclockwise in 2D:
- î = (1,0) → (0,1), ĵ = (0,1) → (-1,0)
- Matrix: [[0, -1], [1, 0]]


Apply to vector v = (x, y): [0×x + (-1)×y, 1×x + 0×y] = (-y, x)—that's a 90° rotation!

Every matrix multiplication Ax is a linear transformation: Ax = b.

COMMON LINEAR TRANSFORMATIONS

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Transformation</th><th class="p-3 border border-cyan/20">2D Matrix</th><th class="p-3 border border-cyan/20">Effect</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Identity</td><td class="p-3 border border-cyan/20">[[1, 0], [0, 1]]</td><td class="p-3 border border-cyan/20">Does nothing</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Scaling</td><td class="p-3 border border-cyan/20">[[s, 0], [0, s]]</td><td class="p-3 border border-cyan/20">Stretches by factor s</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Rotation by θ</td><td class="p-3 border border-cyan/20">[[cos θ, -sin θ], [sin θ, cos θ]]</td><td class="p-3 border border-cyan/20">Rotates by angle θ</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Reflection (x-axis)</td><td class="p-3 border border-cyan/20">[[1, 0], [0, -1]]</td><td class="p-3 border border-cyan/20">Flips across x-axis</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Shear (x-axis)</td><td class="p-3 border border-cyan/20">[[1, k], [0, 1]]</td><td class="p-3 border border-cyan/20">Slides horizontally</td></tr></tbody></table>



In quantum computing, the Pauli matrices are important linear transformations on qubit states:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Pauli Gate</th><th class="p-3 border border-cyan/20">Matrix</th><th class="p-3 border border-cyan/20">Operation</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">X (NOT)</td><td class="p-3 border border-cyan/20">[[0, 1], [1, 0]]</td><td class="p-3 border border-cyan/20">Flips |0⟩ ↔ |1⟩</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Y (Phase-flip)</td><td class="p-3 border border-cyan/20">[[0, -i], [i, 0]]</td><td class="p-3 border border-cyan/20">Flips and rotates phase</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Z (Phase-flip)</td><td class="p-3 border border-cyan/20">[[1, 0], [0, -1]]</td><td class="p-3 border border-cyan/20">Flips phase of |1⟩</td></tr></tbody></table>

COMPOSING TRANSFORMATIONS

If you apply transformation A and then transformation B, what happens?
- B(A(v)) = (B×A)×v
- Matrix multiplication is composition!

Important: Matrix multiplication is not commutative—B×A ≠ A×B usually.

Example: Rotate 90° then reflect across x-axis ≠ Reflect then rotate.

This non-commutativity is crucial in quantum mechanics—applying operations in different orders gives different results. In quantum computing, the order of gates matters! X then Z vs Z then X gives different results, which is why we write quantum circuits from left to right as the order of operations.

COMPLEX VECTORS AND MATRICES

So far we've worked with real numbers. But in quantum computing, we need complex numbers.

- Complex Vector: A vector where each component is a complex number (a + bi).
- Complex Matrix: A matrix with complex entries.

Why complex numbers? In quantum mechanics, probability amplitudes are complex—they have both magnitude and phase. The phase allows quantum interference: two probability amplitudes can add or cancel depending on their relative phase.

![Complex Vectors](/complex_vectors.webp)

Operations work the same way: complex vector addition, scalar multiplication (with complex scalars), and matrix multiplication—just with complex arithmetic.

The conjugate transpose (or Hermitian conjugate) of a complex matrix is key: take transpose, then replace each entry with its complex conjugate. Denoted as A†.

A matrix U is unitary if U†U = I. Unitary matrices preserve inner products and represent quantum gates (they're reversible and preserve probability).

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Matrix Type</th><th class="p-3 border border-cyan/20">Definition</th><th class="p-3 border border-cyan/20">Property</th><th class="p-3 border border-cyan/20">Quantum Role</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Hermitian</td><td class="p-3 border border-cyan/20">A† = A</td><td class="p-3 border border-cyan/20">Real eigenvalues</td><td class="p-3 border border-cyan/20">Observables (measurements)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Unitary</td><td class="p-3 border border-cyan/20">U†U = I</td><td class="p-3 border border-cyan/20">Preserves norm</td><td class="p-3 border border-cyan/20">Quantum gates (evolution)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Positive</td><td class="p-3 border border-cyan/20">All eigenvalues ≥ 0</td><td class="p-3 border border-cyan/20">Non-negative</td><td class="p-3 border border-cyan/20">Density matrices</td></tr></tbody></table>


UNIT II: EIGENVALUES, INNER PRODUCTS & HILBERT SPACES

2.1 EIGENVALUES AND EIGENVECTORS

WHAT'S AN EIGENVALUE? THE VECTOR THAT DOESN'T MOVE

Imagine you're a king standing in a hall of mirrors. Most mirrors reflect your image at a new angle. But some mirrors reflect your image straight back at you—the image only gets bigger or smaller, but the direction stays the same.

Eigenvectors are like those special mirrors. When a linear transformation A acts on an eigenvector v, the result is a scaled version of v: Av = λv, where λ is the eigenvalue.


The word 'eigen' comes from German, meaning 'own' or 'characteristic'—these vectors are the transformation's own characteristic directions.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Eigenvalue λ</th><th class="p-3 border border-cyan/20">Effect on Vector</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">λ > 1</td><td class="p-3 border border-cyan/20">Vector stretches (magnifies)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">0 < λ < 1</td><td class="p-3 border border-cyan/20">Vector shrinks (attenuates)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">λ = 0</td><td class="p-3 border border-cyan/20">Vector maps to zero</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">λ < 0</td><td class="p-3 border border-cyan/20">Vector flips direction</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">λ = complex</td><td class="p-3 border border-cyan/20">Vector rotates (no real eigenvector)</td></tr></tbody></table>

In quantum mechanics, the Schrödinger equation is an eigenvalue equation: H|ψ⟩ = E|ψ⟩. The eigenvalues E are the energy levels, and the eigenvectors |ψ⟩ are the energy states!

FINDING EIGENVALUES—THE CHARACTERISTIC EQUATION

How do we find these special vectors? We solve Av = λv. Rearranging: (A - λI)v = 0.

For this equation to have a non-zero solution (v ≠ 0), the matrix (A - λI) must be singular (not invertible). That means its determinant must be zero.

det(A - λI) = 0 is called the characteristic equation.



Example: A = [[2, 1], [1, 2]]

A - λI = [[2-λ, 1], [1, 2-λ]]

det = (2-λ)(2-λ) - 1 = λ² - 4λ + 3 = (λ-3)(λ-1) = 0

So eigenvalues are λ = 3 and λ = 1.

For λ = 3: (A - 3I)v = [[-1, 1], [1, -1]]v = 0 → v = (1, 1).

For λ = 1: (A - I)v = [[1, 1], [1, 1]]v = 0 → v = (1, -1).

So eigenvectors are (1, 1) and (1, -1). The matrix stretches vectors along these two directions.

GEOMETRIC INTERPRETATION OF EIGENVECTORS

In 2D, a matrix with two distinct eigenvectors acts like a stretching machine:
- It stretches space along one direction by λ₁ and along another direction by λ₂.

![Eigenvector Geometric](/eigenvectors_geometric.webp)

- If λ₁ and λ₂ are both positive: the transformation stretches along both axes.
- If one is negative: the transformation flips along that axis and stretches.
- If λ₁ = λ₂: all vectors are eigenvectors (like uniform scaling).
- If eigenvalues are complex: the transformation rotates! No real vectors keep direction.

In quantum computing, measuring a qubit is like finding which eigenstate of the measurement operator the qubit is in. The probabilities are the squares of the amplitudes.

EIGENVALUES IN QUANTUM MECHANICS

Quantum mechanics is built on eigenvalues and eigenvectors! Here's why:

- Every observable quantity (energy, position, spin) is represented by a Hermitian matrix (an 'operator').
- The eigenvalues of this operator are the possible results of measurement.
- The eigenvectors are the states in which you get that result with probability 1.


Example: The Pauli-Z matrix for qubit spin: Z = [[1, 0], [0, -1]]

- Eigenvalues: +1 (spin up) and -1 (spin down).
- Eigenvectors: |0⟩ = (1, 0) for spin up, |1⟩ = (0, 1) for spin down.

Any qubit state |ψ⟩ = α|0⟩ + β|1⟩, when measured in the Z basis, gives |0⟩ with probability |α|² and |1⟩ with probability |β|².

The measurement collapses the state to the eigenvector corresponding to the observed eigenvalue.

DIAGONALIZATION—THE POWER OF EIGENVECTORS

If a matrix has enough linearly independent eigenvectors, we can diagonalize it.

Diagonalization means: A = PDP⁻¹, where D is diagonal and contains the eigenvalues, and P contains the eigenvectors as columns.


Why diagonalize?

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Operation</th><th class="p-3 border border-cyan/20">Without Diagonalization</th><th class="p-3 border border-cyan/20">With Diagonalization</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Matrix Powers</td><td class="p-3 border border-cyan/20">Computationally expensive</td><td class="p-3 border border-cyan/20">Aⁿ = PDⁿP⁻¹ (easy!)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Matrix Exponential</td><td class="p-3 border border-cyan/20">Series expansion</td><td class="p-3 border border-cyan/20">eᴬ = P eᴰ P⁻¹</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Time Evolution</td><td class="p-3 border border-cyan/20">Complex integration</td><td class="p-3 border border-cyan/20">U(t) = e^{-iHt/ℏ}</td></tr></tbody></table>

In quantum mechanics, the time evolution operator U(t) = e^{-iHt/ℏ} is computed using diagonalization of the Hamiltonian H.

Only diagonalizable matrices have a full set of eigenvectors. Not all matrices are diagonalizable—those are called defective.

But in quantum mechanics, Hermitian matrices (which represent observables) are always diagonalizable with orthonormal eigenvectors.

2.2 INNER PRODUCT SPACES AND HILBERT SPACES

THE INNER PRODUCT—MEASURING ANGLES IN VECTOR SPACE

So far we've had vectors and we know how to add and scale them. But we can't yet measure how similar two vectors are, or how long a vector is.

The inner product gives us that ability. For real vectors, the dot product is the inner product: v·w = v₁w₁ + v₂w₂ + ... + vₙwₙ.

For complex vectors, the inner product is: ⟨v|w⟩ = v₁* w₁ + v₂* w₂ + ... + vₙ* wₙ, where * means complex conjugate.



The inner product has three key properties:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Property</th><th class="p-3 border border-cyan/20">Mathematical Expression</th><th class="p-3 border border-cyan/20">Meaning</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Conjugate Symmetry</td><td class="p-3 border border-cyan/20">⟨v|w⟩ = ⟨w|v⟩*</td><td class="p-3 border border-cyan/20">Order matters for complex vectors</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Linearity (second argument)</td><td class="p-3 border border-cyan/20">⟨v|(aw+bz)⟩ = a⟨v|w⟩ + b⟨v|z⟩</td><td class="p-3 border border-cyan/20">Inner product is linear in second argument</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Positive Definiteness</td><td class="p-3 border border-cyan/20">⟨v|v⟩ ≥ 0, equals 0 iff v = 0</td><td class="p-3 border border-cyan/20">Vectors have non-negative length</td></tr></tbody></table>

In quantum mechanics, the inner product ⟨ψ|φ⟩ is called the 'overlap'—it tells us how much two quantum states have in common.

NORM—THE LENGTH OF A VECTOR

The norm (or length) of a vector v is ||v|| = √⟨v|v⟩.

For a real vector v = (v₁, v₂, ..., vₙ), ||v|| = √(v₁² + v₂² + ... + vₙ²).

![Vector Norm](/vector_norm.webp)

A unit vector has norm 1. We can normalize any non-zero vector: v̂ = v / ||v||.

In quantum mechanics, state vectors are always normalized: ⟨ψ|ψ⟩ = 1.

Why? The squared norm gives the total probability—it must be 1.

The norm also defines a distance between vectors: d(v, w) = ||v - w||.
This distance is the Euclidean distance if we're in ordinary 3D space.

ORTHOGONALITY—WHEN VECTORS ARE PERPENDICULAR

Two vectors are orthogonal (perpendicular) if their inner product is zero: ⟨v|w⟩ = 0.

An orthonormal basis is a set of vectors that are all mutually orthogonal and each has norm 1.

The standard basis {(1,0,0), (0,1,0), (0,0,1)} is orthonormal.
![Orthogonal and Orthonormal Vectors](/orthogonal-versus-orthonormal.webp)

In quantum computing, {|0⟩, |1⟩} is an orthonormal basis.

If we have an orthonormal basis {e₁, e₂, ..., eₙ}, any vector v can be written as:
v = ⟨e₁|v⟩e₁ + ⟨e₂|v⟩e₂ + ... + ⟨eₙ|v⟩eₙ.

The coefficients ⟨eᵢ|v⟩ are the coordinates—they're the projections of v onto each basis vector.

This is how we represent any quantum state in a chosen basis!

HILBERT SPACES—THE QUANTUM STAGE

A Hilbert space is an inner product space that's 'complete'—meaning every Cauchy sequence converges. Don't worry about the technical definition—just know it's the space where quantum mechanics lives.

![Hilbert Space](/hilbert_space.webp)

Key features of Hilbert spaces:
- They have an inner product (so we can measure overlap).
- They're complete (no 'holes'—limits always exist).
- They can be finite-dimensional (like qubits) or infinite-dimensional (like a particle in a box).

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">System</th><th class="p-3 border border-cyan/20">Hilbert Space Dimension</th><th class="p-3 border border-cyan/20">Example</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Qubit</td><td class="p-3 border border-cyan/20">2</td><td class="p-3 border border-cyan/20">|ψ⟩ = α|0⟩ + β|1⟩</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Two Qubits</td><td class="p-3 border border-cyan/20">4</td><td class="p-3 border border-cyan/20">Tensor product of two 2D spaces</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">n Qubits</td><td class="p-3 border border-cyan/20">2ⁿ</td><td class="p-3 border border-cyan/20">Exponential growth!</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Particle in a Box</td><td class="p-3 border border-cyan/20">∞</td><td class="p-3 border border-cyan/20">Square-integrable functions L²</td></tr></tbody></table>

QUANTUM STATES AS VECTORS IN HILBERT SPACE

A quantum state |ψ⟩ is just a unit vector in a Hilbert space.

- The basis vectors represent distinct measurement outcomes.
- The coefficients (amplitudes) tell us the probability of each outcome.

Example: A qubit state |ψ⟩ = α|0⟩ + β|1⟩, with |α|² + |β|² = 1.

We measure in the {|0⟩, |1⟩} basis and find |0⟩ with probability |α|², |1⟩ with probability |β|².

The inner product between two states tells us how similar they are:
|⟨φ|ψ⟩|² is the probability that state |ψ⟩ is found in state |φ⟩.

If ⟨φ|ψ⟩ = 0, the states are orthogonal—measuring one gives 0 probability of finding the other.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Quantum Concept</th><th class="p-3 border border-cyan/20">Mathematical Representation</th><th class="p-3 border border-cyan/20">Interpretation</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Quantum State</td><td class="p-3 border border-cyan/20">|ψ⟩ (unit vector)</td><td class="p-3 border border-cyan/20">Complete description of system</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Superposition</td><td class="p-3 border border-cyan/20">|ψ⟩ = α|0⟩ + β|1⟩</td><td class="p-3 border border-cyan/20">System in multiple states simultaneously</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Inner Product</td><td class="p-3 border border-cyan/20">⟨φ|ψ⟩</td><td class="p-3 border border-cyan/20">Overlap/Similarity of states</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Probability</td><td class="p-3 border border-cyan/20">|⟨φ|ψ⟩|²</td><td class="p-3 border border-cyan/20">Probability of finding |ψ⟩ in |φ⟩</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Measurement</td><td class="p-3 border border-cyan/20">Collapse to eigenstate</td><td class="p-3 border border-cyan/20">Projective measurement</td></tr></tbody></table>


UNIT III: STATISTICS, PROBABILITY & RANDOM VARIABLES

3.1 DESCRIPTIVE STATISTICS

MEASURES OF CENTRAL TENDENCY—WHERE'S THE MIDDLE?
Imagine five students with heights: 155, 155, 158, 164, 168 cm.

Which value best represents the "center" of the data? There are three common measures:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Measure</th><th class="p-3 border border-cyan/20">Definition</th><th class="p-3 border border-cyan/20">Calculation</th><th class="p-3 border border-cyan/20">Value</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Mean</td><td class="p-3 border border-cyan/20">Average of all values</td><td class="p-3 border border-cyan/20">(155 + 155 + 158 + 164 + 168) / 5 = 800 / 5</td><td class="p-3 border border-cyan/20"><strong>160 cm</strong></td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Median</td><td class="p-3 border border-cyan/20">Middle value after sorting</td><td class="p-3 border border-cyan/20">155, 155, <strong>158</strong>, 164, 168</td><td class="p-3 border border-cyan/20"><strong>158 cm</strong></td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan/20 font-bold">Mode</td><td class="p-3 border border-cyan/20">Most frequently occurring value</td><td class="p-3 border border-cyan/20">155 appears twice; all others appear once</td><td class="p-3 border border-cyan/20"><strong>155 cm</strong></td></tr></tbody></table>

![Mean Median Mode](/mean_median_mode.webp)

MEASURES OF DISPERSION—HOW SPREAD OUT IS IT?

Two datasets can have the same mean but be very different:
- Dataset A: 50, 50, 50, 50, 50 (mean = 50, no spread)
- Dataset B: 0, 25, 50, 75, 100 (mean = 50, huge spread)

We need measures of dispersion to capture this difference:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Measure</th><th class="p-3 border border-cyan/20">Definition</th><th class="p-3 border border-cyan/20">Formula</th><th class="p-3 border border-cyan/20">Dataset A</th><th class="p-3 border border-cyan/20">Dataset B</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Range</td><td class="p-3 border border-cyan/20">Max - Min</td><td class="p-3 border border-cyan/20">max - min</td><td class="p-3 border border-cyan/20">0</td><td class="p-3 border border-cyan/20">100</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Variance (Population)</td><td class="p-3 border border-cyan/20">Average squared deviation</td><td class="p-3 border border-cyan/20">σ² = (1/n)Σ(xᵢ - μ)²</td><td class="p-3 border border-cyan/20">0</td><td class="p-3 border border-cyan/20">1250</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Variance (Sample)</td><td class="p-3 border border-cyan/20">Unbiased estimate</td><td class="p-3 border border-cyan/20">s² = (1/(n-1))Σ(xᵢ - x̄)²</td><td class="p-3 border border-cyan/20">0</td><td class="p-3 border border-cyan/20">1562.5</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Standard Deviation</td><td class="p-3 border border-cyan/20">√Variance</td><td class="p-3 border border-cyan/20">σ = √σ²</td><td class="p-3 border border-cyan/20">0</td><td class="p-3 border border-cyan/20">35.36</td></tr></tbody></table>


The standard deviation tells us: about 68% of data lies within 1σ of the mean, 95% within 2σ (for normal distributions).

POPULATION VS SAMPLE STATISTICS

This is a common source of confusion. The difference is subtle but important:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Concept</th><th class="p-3 border border-cyan/20">Population</th><th class="p-3 border border-cyan/20">Sample</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Definition</td><td class="p-3 border border-cyan/20">ALL members of a group</td><td class="p-3 border border-cyan/20">A subset of the population</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Example</td><td class="p-3 border border-cyan/20">All voters in India</td><td class="p-3 border border-cyan/20">1000 voters in a poll</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Mean</td><td class="p-3 border border-cyan/20">μ = (1/N)Σxᵢ</td><td class="p-3 border border-cyan/20">x̄ = (1/n)Σxᵢ</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Variance</td><td class="p-3 border border-cyan/20">σ² = (1/N)Σ(xᵢ - μ)²</td><td class="p-3 border border-cyan/20">s² = (1/(n-1))Σ(xᵢ - x̄)²</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Standard Deviation</td><td class="p-3 border border-cyan/20">σ = √σ²</td><td class="p-3 border border-cyan/20">s = √s²</td></tr></tbody></table>

Why n-1 for sample variance? Because x̄ is estimated from the same data, which reduces the degrees of freedom by 1. Using n-1 makes s² an unbiased estimate of σ².

![Population vs Sample](/population_vs_sample.webp)

In practice: Use population statistics when you have all the data. Use sample statistics when you're inferring about a larger group from a smaller sample.

QUARTILES AND BOX PLOTS

Beyond the mean and standard deviation, we often use quartiles:

- Q1 (First Quartile): The 25th percentile—25% of data is below this.
- Q2 (Second Quartile): The median—50% of data is below this.
- Q3 (Third Quartile): The 75th percentile—75% of data is below this.
- IQR (Interquartile Range): Q3 - Q1. This is the spread of the middle 50% of data.

![Box Plot](/box_plot.webp)

A box plot visualizes these statistics:
- Box from Q1 to Q3 (the middle 50%).
- Line in the box = median.
- Whiskers extend to the min and max (or to 1.5×IQR from the box).
- Points beyond the whiskers are outliers.

Box plots are great for comparing distributions across categories.

3.2 PROBABILITY AND RANDOM VARIABLES

PROBABILITY—THE MATHEMATICS OF UNCERTAINTY

Imagine you're flipping a coin. Before it lands, you don't know the outcome. Probability is the mathematical language we use to describe this uncertainty.

- The sample space (S) is all possible outcomes. For a coin: S = {Heads, Tails}.
- An event (E) is a set of outcomes we're interested in. Example: E = {Heads}.
- The probability of event E is written as P(E). It's a number between 0 and 1.

Three axioms of probability:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Axiom</th><th class="p-3 border border-cyan/20">Statement</th><th class="p-3 border border-cyan/20">Example (Coin)</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">1. Non-negativity</td><td class="p-3 border border-cyan/20">P(E) ≥ 0</td><td class="p-3 border border-cyan/20">P(Heads) = 0.5 ≥ 0</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">2. Unit Measure</td><td class="p-3 border border-cyan/20">P(S) = 1</td><td class="p-3 border border-cyan/20">P({Heads, Tails}) = 1</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">3. Additivity</td><td class="p-3 border border-cyan/20">For disjoint events, P(∪Eᵢ) = ΣP(Eᵢ)</td><td class="p-3 border border-cyan/20">P(Heads) + P(Tails) = 1</td></tr></tbody></table>

From these three simple rules, we can derive all of probability theory!

CONDITIONAL PROBABILITY AND INDEPENDENCE

Conditional probability: The probability of A given B has happened.
P(A|B) = P(A∩B) / P(B) — the probability of both A and B, divided by the probability of B.

Example: In a deck of cards, what's the probability of drawing a heart given you've drawn a red card?
P(Heart|Red) = P(Heart∩Red) / P(Red) = (13/52) / (26/52) = 13/26 = 1/2.


Independence: Events A and B are independent if P(A|B) = P(A). Knowing B gives no information about A.
P(A∩B) = P(A)×P(B) for independent events.

Example: Flipping two coins. P(Head on first) = 1/2, P(Head on second) = 1/2, and they're independent.
P(Both heads) = 1/2 × 1/2 = 1/4.

In quantum mechanics, measurements can be correlated even when not independent—this is entanglement!

RANDOM VARIABLES—FROM OUTCOMES TO NUMBERS

A random variable (X) is a function that maps outcomes to numbers. It's not a variable in the usual sense—it's a function!

Example: Toss two coins. Let X = number of heads.
Outcomes: HH→X=2, HT→X=1, TH→X=1, TT→X=0.

![Random Variable](/random_variable.webp)

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Type</th><th class="p-3 border border-cyan/20">Definition</th><th class="p-3 border border-cyan/20">Examples</th><th class="p-3 border border-cyan/20">Distribution</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Discrete</td><td class="p-3 border border-cyan/20">Countable values</td><td class="p-3 border border-cyan/20"># of heads, # of cars</td><td class="p-3 border border-cyan/20">Probability Mass Function (PMF)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Continuous</td><td class="p-3 border border-cyan/20">Uncountable values</td><td class="p-3 border border-cyan/20">Height, temperature</td><td class="p-3 border border-cyan/20">Probability Density Function (PDF)</td></tr></tbody></table>

For two coins: P(X=0) = 1/4, P(X=1) = 1/2, P(X=2) = 1/4.

The distribution function F(x) = P(X ≤ x) is useful for both discrete and continuous RVs.

EXPECTED VALUE AND VARIANCE OF RANDOM VARIABLES

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Concept</th><th class="p-3 border border-cyan/20">Definition</th><th class="p-3 border border-cyan/20">Discrete Formula</th><th class="p-3 border border-cyan/20">Continuous Formula</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Expected Value (Mean)</td><td class="p-3 border border-cyan/20">Average value over many trials</td><td class="p-3 border border-cyan/20">E[X] = Σx×P(X=x)</td><td class="p-3 border border-cyan/20">E[X] = ∫x×f(x)dx</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Variance</td><td class="p-3 border border-cyan/20">Expected squared deviation from mean</td><td class="p-3 border border-cyan/20">Var[X] = E[(X-μ)²]</td><td class="p-3 border border-cyan/20">Var[X] = E[(X-μ)²]</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Standard Deviation</td><td class="p-3 border border-cyan/20">√Variance</td><td class="p-3 border border-cyan/20">σ = √Var[X]</td><td class="p-3 border border-cyan/20">σ = √Var[X]</td></tr></tbody></table>

Example: Two coins.
- E[X] = 0×(1/4) + 1×(1/2) + 2×(1/4) = 1.
- E[X²] = 0×(1/4) + 1×(1/2) + 4×(1/4) = 1.5.
- Var[X] = 1.5 - 1² = 0.5.

In quantum mechanics, the expected value of an observable is ⟨ψ|A|ψ⟩, and the uncertainty is ΔA = √(⟨A²⟩ - ⟨A⟩²). This is exactly the same concept—the standard deviation of the measurement outcomes!

THE LAW OF LARGE NUMBERS

The Law of Large Numbers (LLN) is the reason statistics works:
As the number of trials n grows, the sample average x̄_n converges to the true mean μ.


If you flip a coin 10 times, you might get 70% heads. Flip it 1000 times, you'll be very close to 50%.

This is why polls work: with a large enough sample, the sample average approximates the population average.

In quantum computing, we need to run many shots (measurements) to estimate probabilities—the Law of Large Numbers tells us that with enough shots, our estimates converge to the true probabilities.

The Central Limit Theorem (next module) tells us how fast we converge and how the errors are distributed.


UNIT IV: PROBABILITY DISTRIBUTIONS & CENTRAL LIMIT THEOREM

4.1 COMMON PROBABILITY DISTRIBUTIONS

THE BINOMIAL DISTRIBUTION—COUNTING SUCCESSES

The Binomial distribution models the number of successes in n independent trials, each with probability p of success.

Example: Flip a coin 10 times. How many heads? X ~ Binomial(n=10, p=0.5).

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Property</th><th class="p-3 border border-cyan/20">Formula</th><th class="p-3 border border-cyan/20">Coin Example (n=10, p=0.5)</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">PMF</td><td class="p-3 border border-cyan/20">P(X=k) = C(n,k) × pᵏ × (1-p)ⁿ⁻ᵏ</td><td class="p-3 border border-cyan/20">P(X=5) = C(10,5) × 0.5¹⁰ = 0.246</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Mean (Expected Value)</td><td class="p-3 border border-cyan/20">E[X] = np</td><td class="p-3 border border-cyan/20">E[X] = 5</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Variance</td><td class="p-3 border border-cyan/20">Var[X] = np(1-p)</td><td class="p-3 border border-cyan/20">Var[X] = 2.5</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Standard Deviation</td><td class="p-3 border border-cyan/20">σ = √[np(1-p)]</td><td class="p-3 border border-cyan/20">σ = 1.58</td></tr></tbody></table>

When is it used? When you have a fixed number of independent trials, each with the same success probability.

Examples: Number of defective items in a batch, number of heads in n coin flips, number of patients who respond to a treatment.

THE POISSON DISTRIBUTION—COUNTING EVENTS IN TIME

The Poisson distribution models the number of events occurring in a fixed interval of time or space, when events happen independently at a constant average rate.


Example: Average 2 cars pass a point per minute. How many cars in a minute? X ~ Poisson(λ=2).

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Property</th><th class="p-3 border border-cyan/20">Formula</th><th class="p-3 border border-cyan/20">Car Example (λ=2)</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">PMF</td><td class="p-3 border border-cyan/20">P(X=k) = e⁻ᵏ × λᵏ / k!</td><td class="p-3 border border-cyan/20">P(X=2) = e⁻² × 2² / 2! = 0.271</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Mean</td><td class="p-3 border border-cyan/20">E[X] = λ</td><td class="p-3 border border-cyan/20">E[X] = 2</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Variance</td><td class="p-3 border border-cyan/20">Var[X] = λ</td><td class="p-3 border border-cyan/20">Var[X] = 2</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Standard Deviation</td><td class="p-3 border border-cyan/20">σ = √λ</td><td class="p-3 border border-cyan/20">σ = 1.41</td></tr></tbody></table>

When is it used? Counting rare events: radioactive decay, calls to a call center, website visitors, defects per product unit.

The Poisson is the limit of the Binomial when n → ∞, p → 0, and np → λ. It's a good approximation when n is large and p is small.

THE NORMAL DISTRIBUTION—THE BELL CURVE

The Normal (or Gaussian) distribution is the most important distribution in statistics. It's the bell curve that appears everywhere.

![Distributions](/probability_distributions.webp)

Probability density function: f(x) = (1/(σ√2π)) × e^(-(x-μ)²/(2σ²))

Parameters: μ (mean, where the peak is) and σ (standard deviation, how spread out it is).

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Property</th><th class="p-3 border border-cyan/20">Formula</th><th class="p-3 border border-cyan/20">Interpretation</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Mean</td><td class="p-3 border border-cyan/20">μ</td><td class="p-3 border border-cyan/20">Center of the distribution</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Variance</td><td class="p-3 border border-cyan/20">σ²</td><td class="p-3 border border-cyan/20">Spread of the distribution</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">PDF</td><td class="p-3 border border-cyan/20">(1/(σ√2π)) × e^(-(x-μ)²/(2σ²))</td><td class="p-3 border border-cyan/20">Height at point x</td></tr></tbody></table>

The 68-95-99.7 Rule:
- 68% of data lies within μ ± σ
- 95% of data lies within μ ± 2σ
- 99.7% of data lies within μ ± 3σ

Why is it so important? The Central Limit Theorem (next topic) says that averages of many independent random variables are normally distributed, regardless of the original distribution!

In quantum computing, measurement outcomes from many shots follow a normal distribution, allowing us to estimate expectation values and uncertainties.

STANDARD NORMAL DISTRIBUTION AND Z-SCORES

The standard normal distribution has μ = 0 and σ = 1. We denote it as Z ~ N(0,1).

Any normal variable X ~ N(μ, σ) can be standardized: Z = (X - μ)/σ.

![Standard Normal](/standard_normal.webp)

The Z-score tells you how many standard deviations a value is from the mean.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Z-score</th><th class="p-3 border border-cyan/20">Meaning</th><th class="p-3 border border-cyan/20">Percentile</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Z = 0</td><td class="p-3 border border-cyan/20">At the mean</td><td class="p-3 border border-cyan/20">50th percentile</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Z = 1</td><td class="p-3 border border-cyan/20">1 σ above mean</td><td class="p-3 border border-cyan/20">84.1st percentile</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Z = 1.96</td><td class="p-3 border border-cyan/20">1.96 σ above mean</td><td class="p-3 border border-cyan/20">97.5th percentile (95% CI)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Z = 2</td><td class="p-3 border border-cyan/20">2 σ above mean</td><td class="p-3 border border-cyan/20">97.7th percentile</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Z = 3</td><td class="p-3 border border-cyan/20">3 σ above mean</td><td class="p-3 border border-cyan/20">99.9th percentile</td></tr></tbody></table>

Example: A student scores 85 on a test with mean 75 and σ=5. Z = (85-75)/5 = 2. This is in the top 2.3% of scores!

In quantum computing, we use Z-scores to determine confidence intervals for measurement results.

CONNECTIONS BETWEEN DISTRIBUTIONS

These distributions aren't isolated—they're connected:

![Distribution Relationships](/distribution_relationships.webp)

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Connection</th><th class="p-3 border border-cyan/20">Condition</th><th class="p-3 border border-cyan/20">Approximation</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Binomial → Normal</td><td class="p-3 border border-cyan/20">n is large (np > 5 and n(1-p) > 5)</td><td class="p-3 border border-cyan/20">Binomial(n,p) ≈ Normal(np, √[np(1-p)])</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Binomial → Poisson</td><td class="p-3 border border-cyan/20">n large, p small (λ = np)</td><td class="p-3 border border-cyan/20">Binomial(n,p) ≈ Poisson(np)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Poisson → Normal</td><td class="p-3 border border-cyan/20">λ is large (λ > 20)</td><td class="p-3 border border-cyan/20">Poisson(λ) ≈ Normal(λ, √λ)</td></tr></tbody></table>

These relationships are important for:
- Estimating measurement probabilities from a finite number of shots.
- Determining confidence intervals for quantum algorithm results.
- Modeling decoherence and noise processes.

4.2 THE CENTRAL LIMIT THEOREM

THE CENTRAL LIMIT THEOREM—THE MAGIC OF AVERAGES

Imagine you're sampling 100 voters to estimate the proportion who support a candidate. The proportion you observe is the average of 100 individual Bernoulli random variables (1 for support, 0 for oppose).

The CLT says: No matter how skewed the original distribution is (and a Bernoulli is very skewed!), the average of a large number of samples is normally distributed!

![Central Limit Theorem](/central_limit_theorem.webp)

Formal statement: Let X₁, X₂, ..., Xₙ be independent, identically distributed random variables with mean μ and standard deviation σ. Then:
(X̄ - μ) / (σ/√n) → N(0, 1) as n → ∞.

In words: The standardized sample mean converges in distribution to the standard normal distribution.

This is true regardless of the original distribution (as long as it has finite mean and variance). This is why the CLT is so powerful!

WHY THE CLT MATTERS

The CLT is the reason statistics works in practice:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Application</th><th class="p-3 border border-cyan/20">How CLT Helps</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Confidence Intervals</td><td class="p-3 border border-cyan/20">Tells us the sampling distribution of the mean is normal</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Hypothesis Testing</td><td class="p-3 border border-cyan/20">Justifies using normal-based tests even when data isn't normal</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Opinion Polls</td><td class="p-3 border border-cyan/20">Sample proportion is approximately normal</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Quality Control</td><td class="p-3 border border-cyan/20">Average diameter of parts is approximately normal</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Finance</td><td class="p-3 border border-cyan/20">Average return of a portfolio is approximately normal</td></tr></tbody></table>


In quantum computing, the CLT tells us that after many shots, the estimated probabilities are approximately normal, allowing us to compute confidence intervals and compare results.

CONFIDENCE INTERVALS USING THE CLT

The CLT allows us to construct confidence intervals for unknown population parameters.

A 95% confidence interval for the mean μ is: x̄ ± 1.96 × (σ/√n)
where 1.96 is the z-score for 95% confidence (Φ(1.96) ≈ 0.975).

![Confidence Interval](/confidence_interval.webp)

Interpretation: If we repeated the sampling process many times, 95% of the resulting confidence intervals would contain the true μ.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Confidence Level</th><th class="p-3 border border-cyan/20">Z-score</th><th class="p-3 border border-cyan/20">Margin of Error</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">90%</td><td class="p-3 border border-cyan/20">1.645</td><td class="p-3 border border-cyan/20">1.645 × σ/√n</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">95%</td><td class="p-3 border border-cyan/20">1.96</td><td class="p-3 border border-cyan/20">1.96 × σ/√n</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">99%</td><td class="p-3 border border-cyan/20">2.576</td><td class="p-3 border border-cyan/20">2.576 × σ/√n</td></tr></tbody></table>

Example: Sample n=100, x̄=75, σ=10. 95% CI = 75 ± 1.96 × (10/√100) = 75 ± 1.96 = (73.04, 76.96).

The margin of error = 1.96 × (σ/√n). It decreases as √n, so to halve the margin of error, quadruple the sample size!

THE CLT IN QUANTUM COMPUTING

In quantum computing, the CLT appears in several important contexts:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Context</th><th class="p-3 border border-cyan/20">Application of CLT</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Estimating Expectation Values</td><td class="p-3 border border-cyan/20">Average of measurement outcomes is approximately normal</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Confidence Intervals</td><td class="p-3 border border-cyan/20">Compute error bars for estimates based on standard error</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Phase Estimation</td><td class="p-3 border border-cyan/20">Precision scales as O(1/√n) due to CLT (or O(1/n) with better algorithms)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Quantum Machine Learning</td><td class="p-3 border border-cyan/20">Averages used in optimization are approximately normal</td></tr></tbody></table>

![Quantum CLT](/quantum_clt.webp)

The CLT also appears in the theory of quantum measurement: the distribution of measurement outcomes from multiple identical experiments approaches a normal distribution, which is why we can confidently estimate quantum state parameters from finite samples.

LIMITATIONS AND ASSUMPTIONS OF THE CLT

The CLT has important assumptions and limitations:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Assumption/Limitation</th><th class="p-3 border border-cyan/20">Description</th><th class="p-3 border border-cyan/20">Implication</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Independence</td><td class="p-3 border border-cyan/20">Samples must be independent (or weakly dependent)</td><td class="p-3 border border-cyan/20">Correlated data may violate CLT</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Identically Distributed</td><td class="p-3 border border-cyan/20">Samples must come from same distribution</td><td class="p-3 border border-cyan/20">Mix of different distributions may not work</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Finite Variance</td><td class="p-3 border border-cyan/20">Distribution must have finite variance</td><td class="p-3 border border-cyan/20">Heavy-tailed distributions (Cauchy) break CLT</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Large n</td><td class="p-3 border border-cyan/20">CLT is asymptotic</td><td class="p-3 border border-cyan/20">Highly skewed distributions need larger n</td></tr></tbody></table>

For strongly skewed distributions, n might need to be quite large (e.g., n > 50) for the CLT to hold.

For heavy-tailed distributions (like Cauchy), the CLT doesn't apply at all.

In quantum computing, shot noise (the variance of the Bernoulli distribution from measurements) is finite, so the CLT applies—and it tells us exactly how the error decreases with more shots.



KEY FORMULAS REFERENCE

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Category</th><th class="p-3 border border-cyan/20">Formula</th><th class="p-3 border border-cyan/20">Description</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Linear Algebra</td><td class="p-3 border border-cyan/20">Av = λv</td><td class="p-3 border border-cyan/20">Eigenvalue equation</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Linear Algebra</td><td class="p-3 border border-cyan/20">det(A - λI) = 0</td><td class="p-3 border border-cyan/20">Characteristic equation</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Linear Algebra</td><td class="p-3 border border-cyan/20">A = PDP⁻¹</td><td class="p-3 border border-cyan/20">Diagonalization</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Linear Algebra</td><td class="p-3 border border-cyan/20">⟨v|w⟩ = v₁*w₁ + ... + vₙ*wₙ</td><td class="p-3 border border-cyan/20">Inner product (complex)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Linear Algebra</td><td class="p-3 border border-cyan/20">||v|| = √⟨v|v⟩</td><td class="p-3 border border-cyan/20">Norm</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Probability</td><td class="p-3 border border-cyan/20">P(A|B) = P(A∩B)/P(B)</td><td class="p-3 border border-cyan/20">Conditional probability</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Probability</td><td class="p-3 border border-cyan/20">P(A∩B) = P(A)×P(B)</td><td class="p-3 border border-cyan/20">Independence</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Statistics</td><td class="p-3 border border-cyan/20">μ = (1/n)Σxᵢ</td><td class="p-3 border border-cyan/20">Mean</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Statistics</td><td class="p-3 border border-cyan/20">σ² = (1/n)Σ(xᵢ - μ)²</td><td class="p-3 border border-cyan/20">Population variance</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Statistics</td><td class="p-3 border border-cyan/20">s² = (1/(n-1))Σ(xᵢ - x̄)²</td><td class="p-3 border border-cyan/20">Sample variance</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Distributions</td><td class="p-3 border border-cyan/20">P(X=k) = C(n,k)pᵏ(1-p)ⁿ⁻ᵏ</td><td class="p-3 border border-cyan/20">Binomial PMF</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Distributions</td><td class="p-3 border border-cyan/20">P(X=k) = e⁻ᵏλᵏ/k!</td><td class="p-3 border border-cyan/20">Poisson PMF</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Distributions</td><td class="p-3 border border-cyan/20">f(x) = (1/(σ√2π))e^(-(x-μ)²/(2σ²))</td><td class="p-3 border border-cyan/20">Normal PDF</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">CLT</td><td class="p-3 border border-cyan/20">Z = (X̄ - μ)/(σ/√n)</td><td class="p-3 border border-cyan/20">Standardized sample mean</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">CLT</td><td class="p-3 border border-cyan/20">x̄ ± z×(σ/√n)</td><td class="p-3 border border-cyan/20">Confidence interval</td></tr></tbody></table>
`;