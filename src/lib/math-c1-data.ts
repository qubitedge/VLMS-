// lib/math-data.ts

import { Course } from './course-data';

export const mathFoundationsCourse: Course = {
  id: "mathematics-for-emerging-technologies",
  title: "Mathematics for Emerging Technologies",
  objectives: [
    "To understand vectors, vector spaces, and linear transformations as fundamental mathematical tools",
    "To master eigenvalues, eigenvectors, and diagonalization with applications to quantum computing",
    "To develop a strong foundation in probability theory and random variables",
    "To understand the central limit theorem and its importance in statistics",
    "To apply linear algebra and probability concepts to emerging technologies like quantum computing and AI"
  ],
  introduction: [
    "Linear algebra and probability form the mathematical bedrock of modern emerging technologies. From the quantum states in a quantum computer to the probability distributions that power machine learning algorithms, these mathematical tools are everywhere.",
    "This course bridges the gap between abstract mathematics and practical applications. Starting with vectors and matrices, we build up to complex inner product spaces and Hilbert spaces—the mathematical language of quantum mechanics.",
    "The second half of the course covers probability and statistics, essential for understanding uncertainty in data, making predictions, and building AI systems.",
    "You'll learn how a simple vector in 3D space becomes a quantum state vector in infinite-dimensional Hilbert space, and how probability distributions describe everything from particle positions to stock market movements."
  ],
  targetAudience: {
    primary: "Undergraduate students in Computer Science, Physics, and Engineering studying the mathematical foundations of emerging technologies.",
    prerequisites: [
      "Basic algebra and trigonometry",
      "Familiarity with functions and graphs",
      "Some exposure to calculus (derivatives and integrals) is helpful but not required"
    ],
    usefulFor: [
      "Students interested in quantum computing and quantum information science",
      "Students pursuing machine learning and AI",
      "Students preparing for GATE and other competitive exams",
      "Anyone wanting to understand the mathematics behind modern technology"
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "Computer Science and Engineering",
    course: "Mathematics for Emerging Technologies",
    credits: "L:3 T:0 P:0 C:3",
    yearSem: "Second Year, First Semester",
    branches: "CSE, IT, and Allied Branches",
    totalExperiments: "4 Modules with 8 experiments",
    compiler: "Mathematical concepts with pen-and-paper and software tools",
    units: [
      { unit: "Unit I", topics: "Linear Algebra—Vectors, Matrices, Transformations", weeks: "Module 1" },
      { unit: "Unit II", topics: "Eigenvalues, Inner Products, Hilbert Spaces, Quantum Applications", weeks: "Module 2" },
      { unit: "Unit III", topics: "Statistics, Probability, Random Variables", weeks: "Module 3" },
      { unit: "Unit IV", topics: "Probability Distributions, Central Limit Theorem", weeks: "Module 4" }
    ]
  },
  weeks: [
    {
      title: "MODULE 1",
      objective: "Vectors, Linear Transformations, Complex Vectors & Matrices",
      tutorial: "Tutorial 1: Vector Spaces and Linear Transformations",
      labTitle: "Lab 1: Vectors and Matrices",
      experiments: [
        {
          id: "math-m1-1",
          title: "Vectors and Vector Spaces",
          desc: "Understand vectors, vector operations, and the properties that define a vector space. Explore linear combinations and span.",
          expected: "Able to perform vector operations, identify vector spaces, and determine if a set of vectors spans a space.",
          content: {
            aim: {
              text: "This experiment introduces the concept of vectors—not just as arrows in space but as abstract mathematical objects that can represent everything from quantum states to feature vectors in machine learning. You'll learn how to add vectors, multiply them by scalars, and understand the rules that make a collection of vectors a 'vector space'.",
              bullets: [
                "Define vectors as ordered n-tuples of numbers",
                "Perform vector addition and scalar multiplication",
                "Understand the properties of vector spaces (closure, associativity, identity, inverse, distributivity)",
                "Explore linear combinations and span",
                "Determine if a set of vectors is linearly independent"
              ]
            },
            theory: [
              {
                title: "What is a Vector? Beyond Arrows",
                body: [
                  "When you hear 'vector', what comes to mind? An arrow pointing from one place to another? That's a good start—but vectors are so much more.",
                  "In the world of mathematics, a vector is any object that obeys two simple rules: you can add two vectors together, and you can multiply a vector by a number (scalar). That's it!",
                  "![Vector Visualization](/vector_visualization.webp)",
                  "Think of a shopping cart: you have a list of items and each item has a price and a quantity. The total cost is a linear combination of (price × quantity). Each item is like a 'basis vector' and the quantity is the scalar multiplier.",
                  "In machine learning, a patient's medical record might be a vector: [age, blood_pressure, cholesterol, heart_rate]. Adding two patients' vectors just adds their measurements—that might not make sense, but it shows how vectors are just organized lists of numbers.",
                  "In quantum computing, a particle's state is a vector—a list of complex numbers where each number is the probability amplitude of finding the particle in a particular state."
                ]
              },
              {
                title: "Vector Addition and Scalar Multiplication",
                body: [
                  "Imagine you have two vectors in 2D space: v = (2, 3) and w = (1, 4).",
                  "Vector Addition: v + w = (2+1, 3+4) = (3, 7). Simple—add component by component.",
                  "![Vector Addition](/vector_addition.webp)",
                  "Scalar Multiplication: 3 × v = (3×2, 3×3) = (6, 9). Each component gets multiplied by the scalar.",
                  "These two operations—addition and scalar multiplication—are the only rules that define a vector. If a set of objects follows these rules, it's a vector space.",
                  "Why are these operations important? Because they're the foundation of linear algebra. Every matrix multiplication, every transformation, every quantum operation is built from these two simple operations."
                ]
              },
              {
                title: "The Vector Space—Rules of the Game",
                body: [
                  "A vector space is a set of vectors that plays by ten specific rules. Think of them as the 'constitution' of the vector world:",
                  "1. Closure under addition: v + w is in the space.",
                  "2. Commutativity: v + w = w + v.",
                  "3. Associativity: (u + v) + w = u + (v + w).",
                  "4. Additive identity: There's a zero vector such that v + 0 = v.",
                  "5. Additive inverse: For every v, there's -v such that v + (-v) = 0.",
                  "6. Closure under scalar multiplication: c × v is in the space.",
                  "7. Distributivity (vector addition): c × (u + v) = c×u + c×v.",
                  "8. Distributivity (scalar addition): (c + d) × v = c×v + d×v.",
                  "9. Associativity of scalar multiplication: c × (d × v) = (cd) × v.",
                  "10. Identity for scalar multiplication: 1 × v = v.",
                  "These rules might seem dry, but they're what make linear algebra so powerful—every vector space, from 2D arrows to infinite-dimensional quantum spaces, follows the same rules."
                ]
              },
              {
                title: "Linear Combinations and Span",
                body: [
                  "A linear combination of vectors is just adding them up after scaling each one. For vectors v₁, v₂, ..., vₙ, any expression c₁v₁ + c₂v₂ + ... + cₙvₙ is a linear combination.",
                  "Example: If v₁ = (1, 0) and v₂ = (0, 1), then 3v₁ + 4v₂ = (3, 4). We just built any point in 2D!",
                  "![Linear Combination](/linear_combination.webp)",
                  "The 'span' of a set of vectors is all the points you can reach with linear combinations. If you have v₁ = (1, 0) and v₂ = (0, 1), their span is the entire 2D plane.",
                  "If you have v₁ = (1, 0) and v₂ = (2, 0), their span is only the x-axis—a line, not a plane.",
                  "A set of vectors 'spans' a space if you can reach any point in that space with some linear combination. If two vectors don't point in the same direction (they're linearly independent), they span a 2D space.",
                  "In quantum computing, the state of a qubit is a linear combination of two basis states: |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex numbers. The span of |0⟩ and |1⟩ is the entire 2D complex vector space—the Bloch sphere."
                ]
              },
              {
                title: "Linear Independence—No Redundancy Allowed",
                body: [
                  "A set of vectors is linearly independent if no vector can be written as a linear combination of the others. In other words, each vector brings something new to the table.",
                  "Example: v₁ = (1, 0) and v₂ = (0, 1) are independent—you can't make one from the other.",
                  "Example: v₁ = (1, 2) and v₂ = (2, 4) are dependent—v₂ = 2×v₁. They're redundant.",
                  "How to test? Set up c₁v₁ + c₂v₂ + ... = 0 and see if all c's must be zero. If yes, independent. If there's a non-zero solution, dependent.",
                  "Why does independence matter? In quantum computing, the basis states |0⟩ and |1⟩ must be independent—otherwise, we couldn't represent all possible qubit states uniquely. In machine learning, we want features (vectors) to be independent so each one adds new information."
                ]
              },
              {
                title: "Basis and Dimension",
                body: [
                  "A basis is a set of linearly independent vectors that spans the entire space. It's like a 'coordinate system' for that space.",
                  "In 2D, {(1,0), (0,1)} is the standard basis—also called î and ĵ.",
                  "In n-dimensional space, you need exactly n basis vectors. The number of basis vectors is the dimension.",
                  "![Basis Vectors](/basis_vectors.webp)",
                  "Fun fact: A vector space can have many different bases! (1,0), (0,1) is a basis, but so is (1,1), (1,-1). They all work.",
                  "In quantum computing, {|0⟩, |1⟩} is one basis—the computational basis. But we could also use {|+⟩, |-⟩} where |+⟩ = (|0⟩+|1⟩)/√2 and |-⟩ = (|0⟩-|1⟩)/√2. Both are perfectly valid bases.",
                  "The dimension of a quantum system is the number of basis states. A qubit has dimension 2, a qutrit has dimension 3. As we add more qubits, the dimension grows exponentially—2^n for n qubits!"
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the mathematical workspace",
              "Review the vector space axioms and examples",
              "Practice vector addition and scalar multiplication",
              "Calculate linear combinations of given vectors",
              "Determine if a set of vectors is linearly independent",
              "Find the span of a set of vectors",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Strang, G. - 'Linear Algebra and Its Applications', 4th Edition, Chapter 1 on Vectors and Matrices",
              "Lay, D.C. - 'Linear Algebra and Its Applications', 3rd Edition, Chapter 1 on Linear Equations",
              "Nielsen, M.A. and Chuang, I.L. - 'Quantum Computation and Quantum Information', Chapter 2 on Linear Algebra"
            ]
          }
        },
        {
          id: "math-m1-2",
          title: "Linear Transformations and Matrices",
          desc: "Understand how matrices represent linear transformations—functions that preserve vector addition and scalar multiplication.",
          expected: "Able to represent linear transformations as matrices and apply them to vectors.",
          content: {
            aim: {
              text: "This experiment explores linear transformations—functions that map vectors to vectors while preserving the structure of vector spaces. You'll learn that every linear transformation can be represented as a matrix, and every matrix represents some linear transformation. This connection is the heart of linear algebra.",
              bullets: [
                "Define linear transformations and their properties",
                "Understand the matrix representation of linear transformations",
                "Apply matrices to vectors",
                "Compose linear transformations",
                "Explore transformations: rotation, reflection, scaling, shearing"
              ]
            },
            theory: [
              {
                title: "What is a Linear Transformation?",
                body: [
                  "Imagine you have a rubber sheet with a grid drawn on it. A linear transformation is any way you can stretch, rotate, or shear that sheet—but with two strict rules:",
                  "1. Straight lines must stay straight (no curving).",
                  "2. The origin (0,0) must stay at the origin.",
                  "![Linear Transformation](/linear_transformation.webp)",
                  "More formally, a transformation T is linear if it follows two rules:",
                  "T(u + v) = T(u) + T(v) — adding then transforming is the same as transforming then adding.",
                  "T(c × v) = c × T(v) — scaling then transforming is the same as transforming then scaling.",
                  "This is exactly the same two rules that define a vector! A linear transformation is a function that 'respects' the vector space structure."
                ]
              },
              {
                title: "Matrices as Transformations",
                body: [
                  "Here's the key insight: every linear transformation on an n-dimensional space can be represented as an m×n matrix.",
                  "The matrix tells you where each basis vector goes. If we know where î and ĵ go, we know where every vector goes!",
                  "Example: Rotation by 90° counterclockwise in 2D:",
                  "î = (1,0) → (0,1), ĵ = (0,1) → (-1,0)",
                  "Matrix: [[0, -1], [1, 0]]",
                  "![Rotation Matrix](/rotation_matrix.webp)",
                  "Apply to vector v = (x, y): [0×x + (-1)×y, 1×x + 0×y] = (-y, x)—that's a 90° rotation!",
                  "Every matrix multiplication Ax is a linear transformation: Ax = b."
                ]
              },
              {
                title: "Common Linear Transformations",
                body: [
                  "Let's explore some common 2D transformations and their matrices:",
                  "Identity (do nothing): [[1, 0], [0, 1]]",
                  "Scaling (stretch): [[s, 0], [0, s]] or [[sx, 0], [0, sy]]",
                  "Rotation by θ: [[cos θ, -sin θ], [sin θ, cos θ]]",
                  "Reflection across x-axis: [[1, 0], [0, -1]]",
                  "Shear (x-axis): [[1, k], [0, 1]]",
                  "![Shear Transformation](/shear_transformation.webp)",
                  "In quantum computing, the Pauli matrices are important linear transformations on qubit states:",
                  "X (NOT gate): [[0, 1], [1, 0]]",
                  "Y (phase-flip): [[0, -i], [i, 0]]",
                  "Z (phase-flip): [[1, 0], [0, -1]]",
                  "These are all linear transformations on the 2D complex vector space of a qubit."
                ]
              },
              {
                title: "Composing Transformations",
                body: [
                  "If you apply transformation A and then transformation B, what happens?",
                  "B(A(v)) = (B×A)×v",
                  "Matrix multiplication is composition!",
                  "Important: Matrix multiplication is not commutative—B×A ≠ A×B usually.",
                  "Example: Rotate 90° then reflect across x-axis ≠ Reflect then rotate.",
                  "This non-commutativity is crucial in quantum mechanics—applying operations in different orders gives different results.",
                  "In quantum computing, the order of gates matters! X then Z vs Z then X gives different results, which is why we write quantum circuits from left to right as the order of operations."
                ]
              },
              {
                title: "Complex Vectors and Matrices",
                body: [
                  "So far we've worked with real numbers. But in quantum computing, we need complex numbers.",
                  "Complex Vector: A vector where each component is a complex number (a + bi).",
                  "Complex Matrix: A matrix with complex entries.",
                  "Why complex numbers? In quantum mechanics, probability amplitudes are complex—they have both magnitude and phase.",
                  "The phase allows quantum interference: two probability amplitudes can add or cancel depending on their relative phase.",
                  "![Complex Vectors](/complex_vectors.webp)",
                  "Operations work the same way: complex vector addition, scalar multiplication (with complex scalars), and matrix multiplication—just with complex arithmetic.",
                  "The conjugate transpose (or Hermitian conjugate) of a complex matrix is key: take transpose, then replace each entry with its complex conjugate.",
                  "A matrix U is unitary if U†U = I. Unitary matrices preserve inner products and represent quantum gates (they're reversible and preserve probability)."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the mathematical workspace",
              "Review the definition of linear transformations",
              "Practice representing transformations as matrices",
              "Apply matrices to vectors to see the transformation",
              "Compose two transformations using matrix multiplication",
              "Work with complex vectors and matrices",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Strang, G. - 'Linear Algebra and Its Applications', 4th Edition, Chapter 2 on Matrix Operations",
              "Lay, D.C. - 'Linear Algebra and Its Applications', 3rd Edition, Chapter 2 on Matrix Algebra",
              "Nielsen, M.A. and Chuang, I.L. - 'Quantum Computation and Quantum Information', Chapter 2 on Linear Algebra"
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 2",
      objective: "Eigenvalues, Eigenvectors, Inner Products, Hilbert Spaces, Diagonalization, Quantum Applications",
      tutorial: "Tutorial 2: Spectral Theory and Quantum Applications",
      labTitle: "Lab 2: Eigenvalues and Quantum Mechanics",
      experiments: [
        {
          id: "math-m2-1",
          title: "Eigenvalues and Eigenvectors",
          desc: "Find eigenvalues and eigenvectors of matrices. Understand their geometric meaning and applications.",
          expected: "Able to compute eigenvalues and eigenvectors for 2×2 and 3×3 matrices.",
          content: {
            aim: {
              text: "This experiment tackles one of the most important concepts in linear algebra: eigenvalues and eigenvectors. When a transformation acts on a vector, most vectors change direction. But some special vectors only get scaled—they keep pointing in the same direction. These are eigenvectors, and the scaling factor is the eigenvalue. You'll learn to find them, understand their geometric meaning, and discover why they're everywhere—from quantum mechanics to Google's PageRank algorithm.",
              bullets: [
                "Understand the definition of eigenvalues and eigenvectors",
                "Compute eigenvalues using the characteristic equation",
                "Compute eigenvectors by solving (A - λI)v = 0",
                "Find eigenvectors for 2×2 and 3×3 matrices",
                "Understand the geometric meaning of eigenvalues and eigenvectors"
              ]
            },
            theory: [
              {
                title: "What's an Eigenvalue? The Vector That Doesn't Move",
                body: [
                  "Imagine you're a king standing in a hall of mirrors. Most mirrors reflect your image at a new angle. But some mirrors reflect your image straight back at you—the image only gets bigger or smaller, but the direction stays the same.",
                  "Eigenvectors are like those special mirrors. When a linear transformation A acts on an eigenvector v, the result is a scaled version of v: Av = λv, where λ is the eigenvalue.",
                  "![Eigenvector Visualization](/eigenvector_visualization.webp)",
                  "The word 'eigen' comes from German, meaning 'own' or 'characteristic'—these vectors are the transformation's own characteristic directions.",
                  "If λ > 1, the vector stretches. If 0 < λ < 1, it shrinks. If λ = 0, the vector gets mapped to zero. If λ is negative, the vector flips direction.",
                  "In quantum mechanics, the Schrdinger equation is an eigenvalue equation: H|ψ⟩ = E|ψ⟩. The eigenvalues E are the energy levels, and the eigenvectors |ψ⟩ are the energy states!"
                ]
              },
              {
                title: "Finding Eigenvalues—The Characteristic Equation",
                body: [
                  "How do we find these special vectors? We solve Av = λv. Rearranging: (A - λI)v = 0.",
                  "For this equation to have a non-zero solution (v ≠ 0), the matrix (A - λI) must be singular (not invertible). That means its determinant must be zero.",
                  "det(A - λI) = 0 is called the characteristic equation.",
                  "![Eigenvalue Calculation](/eigenvalue_calculation.webp)",
                  "Example: A = [[2, 1], [1, 2]]",
                  "A - λI = [[2-λ, 1], [1, 2-λ]]",
                  "det = (2-λ)(2-λ) - 1 = λ² - 4λ + 3 = (λ-3)(λ-1) = 0",
                  "So eigenvalues are λ = 3 and λ = 1.",
                  "For λ = 3: (A - 3I)v = [[-1, 1], [1, -1]]v = 0 → v = (1, 1).",
                  "For λ = 1: (A - I)v = [[1, 1], [1, 1]]v = 0 → v = (1, -1).",
                  "So eigenvectors are (1, 1) and (1, -1). The matrix stretches vectors along these two directions."
                ]
              },
              {
                title: "Geometric Interpretation of Eigenvectors",
                body: [
                  "In 2D, a matrix with two distinct eigenvectors acts like a stretching machine:",
                  "It stretches space along one direction by λ₁ and along another direction by λ₂.",
                  "![Eigenvector Geometric](/eigenvector_geometric.webp)",
                  "If λ₁ and λ₂ are both positive: the transformation stretches along both axes.",
                  "If one is negative: the transformation flips along that axis and stretches.",
                  "If λ₁ = λ₂: all vectors are eigenvectors (like uniform scaling).",
                  "If eigenvalues are complex: the transformation rotates! No real vectors keep direction.",
                  "In quantum computing, measuring a qubit is like finding which eigenstate of the measurement operator the qubit is in. The probabilities are the squares of the amplitudes."
                ]
              },
              {
                title: "Eigenvalues in Quantum Mechanics",
                body: [
                  "Quantum mechanics is built on eigenvalues and eigenvectors! Here's why:",
                  "Every observable quantity (energy, position, spin) is represented by a Hermitian matrix (an 'operator').",
                  "The eigenvalues of this operator are the possible results of measurement.",
                  "The eigenvectors are the states in which you get that result with probability 1.",
                  "![Quantum Eigenstates](/quantum_eigenstates.webp)",
                  "Example: The Pauli-Z matrix for qubit spin: Z = [[1, 0], [0, -1]]",
                  "Eigenvalues: +1 (spin up) and -1 (spin down).",
                  "Eigenvectors: |0⟩ = (1, 0) for spin up, |1⟩ = (0, 1) for spin down.",
                  "Any qubit state |ψ⟩ = α|0⟩ + β|1⟩, when measured in the Z basis, gives |0⟩ with probability |α|² and |1⟩ with probability |β|².",
                  "The measurement collapses the state to the eigenvector corresponding to the observed eigenvalue."
                ]
              },
              {
                title: "Diagonalization—The Power of Eigenvectors",
                body: [
                  "If a matrix has enough linearly independent eigenvectors, we can diagonalize it.",
                  "Diagonalization means: A = PDP⁻¹, where D is diagonal and contains the eigenvalues, and P contains the eigenvectors as columns.",
                  "![Diagonalization](/diagonalization.webp)",
                  "Why diagonalize? It makes powers of matrices easy: A^n = PD^nP⁻¹.",
                  "Computing e^A is also easy: e^A = P e^D P⁻¹, where e^D is just the exponential of each diagonal entry.",
                  "In quantum mechanics, the time evolution operator U(t) = e^{-iHt/ℏ} is computed using diagonalization of the Hamiltonian H.",
                  "Only diagonalizable matrices have a full set of eigenvectors. Not all matrices are diagonalizable—those are called defective.",
                  "But in quantum mechanics, Hermitian matrices (which represent observables) are always diagonalizable with orthonormal eigenvectors."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the mathematical workspace",
              "Review the characteristic equation method for eigenvalues",
              "Compute eigenvalues for given matrices",
              "Find eigenvectors by solving (A - λI)v = 0",
              "Understand the geometric meaning of each eigenvector",
              "Practice diagonalizing 2×2 and 3×3 matrices",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Strang, G. - 'Linear Algebra and Its Applications', 4th Edition, Chapter 5 on Eigenvalues and Eigenvectors",
              "Lay, D.C. - 'Linear Algebra and Its Applications', 3rd Edition, Chapter 5 on Eigenvalues",
              "Nielsen, M.A. and Chuang, I.L. - 'Quantum Computation and Quantum Information', Chapter 2 on Linear Algebra"
            ]
          }
        },
        {
          id: "math-m2-2",
          title: "Inner Product Spaces, Hilbert Spaces, and Quantum Applications",
          desc: "Understand inner products, norm, orthogonality, and the transition to Hilbert spaces—the mathematical foundation of quantum mechanics.",
          expected: "Understand inner product spaces and their role in quantum mechanics.",
          content: {
            aim: {
              text: "This experiment introduces inner product spaces—vector spaces with a notion of length and angle. The inner product lets us measure how 'close' two vectors are, and it's the foundation of Hilbert spaces, which are the mathematical home of quantum mechanics. You'll learn about orthogonality, orthonormal bases, and how these concepts underpin quantum state representation.",
              bullets: [
                "Define the inner product and its properties",
                "Understand norm (length) and distance in vector spaces",
                "Define orthogonality and orthonormal bases",
                "Introduce Hilbert spaces as complete inner product spaces",
                "Apply these concepts to quantum state vectors"
              ]
            },
            theory: [
              {
                title: "The Inner Product—Measuring Angles in Vector Space",
                body: [
                  "So far we've had vectors and we know how to add and scale them. But we can't yet measure how similar two vectors are, or how long a vector is.",
                  "The inner product gives us that ability. For real vectors, the dot product is the inner product: v·w = v₁w₁ + v₂w₂ + ... + vₙwₙ.",
                  "For complex vectors, the inner product is: ⟨v|w⟩ = v₁* w₁ + v₂* w₂ + ... + vₙ* wₙ, where * means complex conjugate.",
                  "![Inner Product](/inner_product.webp)",
                  "The inner product has three key properties:",
                  "1. Conjugate symmetry: ⟨v|w⟩ = ⟨w|v⟩*",
                  "2. Linearity in the second argument: ⟨v| (aw + bz)⟩ = a⟨v|w⟩ + b⟨v|z⟩",
                  "3. Positive definiteness: ⟨v|v⟩ ≥ 0, and equals 0 only if v = 0.",
                  "In quantum mechanics, the inner product ⟨ψ|φ⟩ is called the 'overlap'—it tells us how much two quantum states have in common."
                ]
              },
              {
                title: "Norm—The Length of a Vector",
                body: [
                  "The norm (or length) of a vector v is ||v|| = √⟨v|v⟩.",
                  "For a real vector v = (v₁, v₂, ..., vₙ), ||v|| = √(v₁² + v₂² + ... + vₙ²).",
                  "![Vector Norm](/vector_norm.webp)",
                  "A unit vector has norm 1. We can normalize any non-zero vector: v̂ = v / ||v||.",
                  "In quantum mechanics, state vectors are always normalized: ⟨ψ|ψ⟩ = 1.",
                  "Why? The squared norm gives the total probability—it must be 1.",
                  "The norm also defines a distance between vectors: d(v, w) = ||v - w||.",
                  "This distance is the Euclidean distance if we're in ordinary 3D space."
                ]
              },
              {
                title: "Orthogonality—When Vectors Are Perpendicular",
                body: [
                  "Two vectors are orthogonal (perpendicular) if their inner product is zero: ⟨v|w⟩ = 0.",
                  "![Orthogonal Vectors](/orthogonal_vectors.webp)",
                  "An orthonormal basis is a set of vectors that are all mutually orthogonal and each has norm 1.",
                  "The standard basis {(1,0,0), (0,1,0), (0,0,1)} is orthonormal.",
                  "In quantum computing, {|0⟩, |1⟩} is an orthonormal basis.",
                  "If we have an orthonormal basis {e₁, e₂, ..., eₙ}, any vector v can be written as:",
                  "v = ⟨e₁|v⟩e₁ + ⟨e₂|v⟩e₂ + ... + ⟨eₙ|v⟩eₙ.",
                  "The coefficients ⟨eᵢ|v⟩ are the coordinates—they're the projections of v onto each basis vector.",
                  "This is how we represent any quantum state in a chosen basis!"
                ]
              },
              {
                title: "Hilbert Spaces—The Quantum Stage",
                body: [
                  "A Hilbert space is an inner product space that's 'complete'—meaning every Cauchy sequence converges. Don't worry about the technical definition—just know it's the space where quantum mechanics lives.",
                  "![Hilbert Space](/hilbert_space.webp)",
                  "Key features of Hilbert spaces:",
                  "• They have an inner product (so we can measure overlap).",
                  "• They're complete (no 'holes'—limits always exist).",
                  "• They can be finite-dimensional (like qubits) or infinite-dimensional (like a particle in a box).",
                  "In quantum mechanics, every physical system is described by a Hilbert space:",
                  "• A qubit lives in a 2D Hilbert space.",
                  "• Two qubits live in a 4D Hilbert space (the tensor product of two 2D spaces).",
                  "• A particle's position lives in an infinite-dimensional Hilbert space (the space of all square-integrable functions)."
                ]
              },
              {
                title: "Quantum States as Vectors in Hilbert Space",
                body: [
                  "A quantum state |ψ⟩ is just a unit vector in a Hilbert space.",
                  "The basis vectors represent distinct measurement outcomes.",
                  "The coefficients (amplitudes) tell us the probability of each outcome.",
                  "![Quantum State Vector](/quantum_state_vector.webp)",
                  "Example: A qubit state |ψ⟩ = α|0⟩ + β|1⟩, with |α|² + |β|² = 1.",
                  "We measure in the {|0⟩, |1⟩} basis and find |0⟩ with probability |α|², |1⟩ with probability |β|².",
                  "The inner product between two states tells us how similar they are:",
                  "|⟨φ|ψ⟩|² is the probability that state |ψ⟩ is found in state |φ⟩.",
                  "If ⟨φ|ψ⟩ = 0, the states are orthogonal—measuring one gives 0 probability of finding the other."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the mathematical workspace",
              "Review the inner product definition and properties",
              "Practice calculating inner products and norms",
              "Determine if vectors are orthogonal",
              "Construct orthonormal bases from given vectors",
              "Understand the Hilbert space structure",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Strang, G. - 'Linear Algebra and Its Applications', 4th Edition, Chapter 3 on Orthogonality",
              "Nielsen, M.A. and Chuang, I.L. - 'Quantum Computation and Quantum Information', Chapter 2 on Hilbert Spaces",
              "Shankar, R. - 'Principles of Quantum Mechanics', 2nd Edition, Chapter 1 on Linear Algebra"
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 3",
      objective: "Statistics, Descriptive Statistics, Probability, Random Variables",
      tutorial: "Tutorial 3: Statistics and Probability Fundamentals",
      labTitle: "Lab 3: Descriptive Statistics and Probability",
      experiments: [
        {
          id: "math-m3-1",
          title: "Descriptive Statistics—Mean, Median, Mode, Variance, Standard Deviation",
          desc: "Calculate and interpret measures of central tendency and dispersion for a dataset.",
          expected: "Able to compute mean, median, mode, variance, and standard deviation for given datasets.",
          content: {
            aim: {
              text: "This experiment introduces descriptive statistics—the tools we use to summarize and understand data. You'll learn to calculate measures of central tendency (where the data 'centers') and measures of dispersion (how spread out the data is). These are the first steps in any data analysis, from business metrics to scientific measurements.",
              bullets: [
                "Define and calculate measures of central tendency: mean, median, mode",
                "Define and calculate measures of dispersion: range, variance, standard deviation",
                "Understand the difference between population and sample statistics",
                "Interpret these measures in context",
                "Identify the appropriate measure for different types of data"
              ]
            },
            theory: [
              {
                title: "Measures of Central Tendency—Where's the Middle?",
                body: [
                  "Imagine you have a class of 10 students with test scores: 75, 80, 85, 85, 90, 90, 95, 95, 100, 100.",
                  "What's the 'typical' score? There are three common answers:",
                  "Mean (average): Add all scores and divide by n. (75+80+85+85+90+90+95+95+100+100)/10 = 89.5.",
                  "Median (middle value): Sort the data and find the middle. With 10 scores, the median is the average of the 5th and 6th values: (90+90)/2 = 90.",
                  "Mode (most frequent): The value that appears most often. 85, 90, 95, and 100 each appear twice—tie! This dataset has no unique mode.",
                  "![Mean Median Mode](/mean_median_mode.webp)",
                  "When to use each:",
                  "• Mean: Best for symmetric data without outliers.",
                  "• Median: Best for skewed data (like income data—the mean gets pulled by billionaires!).",
                  "• Mode: Best for categorical data ('most common color' or 'most frequent error code')."
                ]
              },
              {
                title: "Measures of Dispersion—How Spread Out Is It?",
                body: [
                  "Two datasets can have the same mean but be very different. Example:",
                  "Dataset A: 50, 50, 50, 50, 50 (mean = 50, no spread)",
                  "Dataset B: 0, 25, 50, 75, 100 (mean = 50, huge spread)",
                  "We need measures of dispersion to capture this difference:",
                  "Range: max - min. Dataset A: 0, Dataset B: 100.",
                  "Variance: Average of squared deviations from the mean.",
                  "σ² = (1/n)Σ(xᵢ - μ)² for a population.",
                  "s² = (1/(n-1))Σ(xᵢ - x̄)² for a sample (uses n-1 to correct bias).",
                  "Standard Deviation: √variance. Same units as the data.",
                  "![Standard Deviation](/standard_deviation.webp)",
                  "Dataset A: variance = 0, σ = 0.",
                  "Dataset B: variance = (2500+625+0+625+2500)/5 = 1250, σ = 35.36.",
                  "The standard deviation tells us: about 68% of data lies within 1σ of the mean, 95% within 2σ (for normal distributions)."
                ]
              },
              {
                title: "Population vs Sample Statistics",
                body: [
                  "This is a common source of confusion. The difference is subtle but important:",
                  "Population: ALL members of a group (e.g., all voters in India).",
                  "Sample: A subset of the population (e.g., 1000 voters in a poll).",
                  "Population mean: μ = (1/N)Σxᵢ",
                  "Sample mean: x̄ = (1/n)Σxᵢ — same formula, but with sample size n.",
                  "Population variance: σ² = (1/N)Σ(xᵢ - μ)²",
                  "Sample variance: s² = (1/(n-1))Σ(xᵢ - x̄)² — note the n-1!",
                  "Why n-1? Because x̄ is estimated from the same data, which reduces the degrees of freedom by 1. Using n-1 makes s² an unbiased estimate of σ².",
                  "![Population vs Sample](/population_vs_sample.webp)",
                  "In practice: Use population statistics when you have all the data. Use sample statistics when you're inferring about a larger group from a smaller sample."
                ]
              },
              {
                title: "Quartiles and Box Plots",
                body: [
                  "Beyond the mean and standard deviation, we often use quartiles:",
                  "Q1 (First Quartile): The 25th percentile—25% of data is below this.",
                  "Q2 (Second Quartile): The median—50% of data is below this.",
                  "Q3 (Third Quartile): The 75th percentile—75% of data is below this.",
                  "IQR (Interquartile Range): Q3 - Q1. This is the spread of the middle 50% of data.",
                  "![Box Plot](/box_plot.webp)",
                  "A box plot visualizes these statistics:",
                  "• Box from Q1 to Q3 (the middle 50%).",
                  "• Line in the box = median.",
                  "• Whiskers extend to the min and max (or to 1.5×IQR from the box).",
                  "• Points beyond the whiskers are outliers.",
                  "Box plots are great for comparing distributions across categories."
                ]
              },
              {
                title: "Skewness and Kurtosis—The Shape of Data",
                body: [
                  "Skewness measures asymmetry:",
                  "• Symmetric: Mean = Median (bell curve).",
                  "• Right-skewed (positive skew): Tail on the right, Mean > Median (income data).",
                  "• Left-skewed (negative skew): Tail on the left, Mean < Median (exam scores when most students do well).",
                  "![Skewness](/skewness.webp)",
                  "Kurtosis measures how 'tailed' the distribution is:",
                  "• Normal kurtosis = 0.",
                  "• Positive kurtosis: Heavy tails, more outliers.",
                  "• Negative kurtosis: Light tails, fewer outliers.",
                  "Understanding skewness is important because many statistical tests assume normality—if your data is highly skewed, you might need to transform it."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the statistical workspace",
              "Calculate mean, median, and mode for given datasets",
              "Compute variance and standard deviation",
              "Distinguish between population and sample statistics",
              "Find quartiles and construct a box plot",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Devore, J.L. - 'Probability and Statistics for Engineering and the Sciences', 9th Edition, Chapter 1 on Descriptive Statistics",
              "Montgomery, D.C. and Runger, G.C. - 'Applied Statistics and Probability for Engineers', 6th Edition, Chapter 1 on Data Description"
            ]
          }
        },
        {
          id: "math-m3-2",
          title: "Probability and Random Variables",
          desc: "Understand the fundamentals of probability—sample spaces, events, probability axioms, and random variables.",
          expected: "Able to compute probabilities for simple events and work with random variables.",
          content: {
            aim: {
              text: "This experiment introduces probability—the mathematical framework for dealing with uncertainty. You'll learn to define sample spaces, assign probabilities to events, and work with random variables. These concepts are the foundation of statistics and are essential for understanding everything from quantum measurement to machine learning predictions.",
              bullets: [
                "Define sample space, events, and probability",
                "Apply the axioms of probability",
                "Calculate probabilities for simple events",
                "Define random variables and their distributions",
                "Understand the difference between discrete and continuous random variables"
              ]
            },
            theory: [
              {
                title: "Probability—The Mathematics of Uncertainty",
                body: [
                  "Imagine you're flipping a coin. Before it lands, you don't know the outcome. Probability is the mathematical language we use to describe this uncertainty.",
                  "The sample space (S) is all possible outcomes. For a coin: S = {Heads, Tails}.",
                  "An event (E) is a set of outcomes we're interested in. Example: E = {Heads}.",
                  "The probability of event E is written as P(E). It's a number between 0 and 1.",
                  "![Probability Space](/probability_space.webp)",
                  "Three axioms of probability:",
                  "1. P(E) ≥ 0 for any event E.",
                  "2. P(S) = 1 (something must happen).",
                  "3. If E₁, E₂, ... are mutually exclusive (can't happen together), then P(∪Eᵢ) = ΣP(Eᵢ).",
                  "From these three simple rules, we can derive all of probability theory!"
                ]
              },
              {
                title: "Conditional Probability and Independence",
                body: [
                  "Conditional probability: The probability of A given B has happened.",
                  "P(A|B) = P(A∩B) / P(B) — the probability of both A and B, divided by the probability of B.",
                  "Example: In a deck of cards, what's the probability of drawing a heart given you've drawn a red card?",
                  "P(Heart|Red) = P(Heart∩Red) / P(Red) = (13/52) / (26/52) = 13/26 = 1/2.",
                  "![Conditional Probability](/conditional_probability.webp)",
                  "Independence: Events A and B are independent if P(A|B) = P(A). Knowing B gives no information about A.",
                  "P(A∩B) = P(A)×P(B) for independent events.",
                  "Example: Flipping two coins. P(Head on first) = 1/2, P(Head on second) = 1/2, and they're independent.",
                  "P(Both heads) = 1/2 × 1/2 = 1/4.",
                  "In quantum mechanics, measurements can be correlated even when not independent—this is entanglement!"
                ]
              },
              {
                title: "Random Variables—From Outcomes to Numbers",
                body: [
                  "A random variable (X) is a function that maps outcomes to numbers. It's not a variable in the usual sense—it's a function!",
                  "Example: Toss two coins. Let X = number of heads.",
                  "Outcomes: HH→X=2, HT→X=1, TH→X=1, TT→X=0.",
                  "![Random Variable](/random_variable.webp)",
                  "Discrete random variables take countable values (0, 1, 2, ...).",
                  "Continuous random variables take any value in an interval (e.g., height, temperature).",
                  "Probability distribution of a discrete RV: a table or formula giving P(X = x) for each possible x.",
                  "For two coins: P(X=0) = 1/4, P(X=1) = 1/2, P(X=2) = 1/4.",
                  "The distribution function F(x) = P(X ≤ x) is useful for both discrete and continuous RVs."
                ]
              },
              {
                title: "Expected Value and Variance of Random Variables",
                body: [
                  "Expected value (mean): The average value you'd get if you repeated the experiment many times.",
                  "E[X] = Σx×P(X=x) for discrete RVs.",
                  "E[X] = ∫x×f(x)dx for continuous RVs (where f(x) is the probability density).",
                  "Example: Two coins. E[X] = 0×(1/4) + 1×(1/2) + 2×(1/4) = 1.",
                  "Variance: The expected squared deviation from the mean.",
                  "Var[X] = E[(X - μ)²] = E[X²] - μ².",
                  "For two coins: E[X²] = 0×(1/4) + 1×(1/2) + 4×(1/4) = 1.5.",
                  "Var[X] = 1.5 - 1² = 0.5.",
                  "Standard deviation: √Var[X].",
                  "In quantum mechanics, the expected value of an observable is ⟨ψ|A|ψ⟩, and the uncertainty is ΔA = √(⟨A²⟩ - ⟨A⟩²). This is exactly the same concept—the standard deviation of the measurement outcomes!"
                ]
              },
              {
                title: "The Law of Large Numbers and Its Importance",
                body: [
                  "The Law of Large Numbers (LLN) is the reason statistics works:",
                  "As the number of trials n grows, the sample average x̄_n converges to the true mean μ.",
                  "![Law of Large Numbers](/law_large_numbers.webp)",
                  "If you flip a coin 10 times, you might get 70% heads. Flip it 1000 times, you'll be very close to 50%.",
                  "This is why polls work: with a large enough sample, the sample average approximates the population average.",
                  "In quantum computing, we need to run many shots (measurements) to estimate probabilities—the Law of Large Numbers tells us that with enough shots, our estimates converge to the true probabilities.",
                  "The Central Limit Theorem (next module) tells us how fast we converge and how the errors are distributed."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the statistical workspace",
              "Define sample spaces and events for given scenarios",
              "Calculate basic probabilities using the axioms",
              "Compute conditional probabilities",
              "Define random variables for given experiments",
              "Calculate expected values and variances",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Devore, J.L. - 'Probability and Statistics for Engineering and the Sciences', 9th Edition, Chapter 2 on Probability",
              "Montgomery, D.C. and Runger, G.C. - 'Applied Statistics and Probability for Engineers', 6th Edition, Chapter 2 on Probability"
            ]
          }
        }
      ]
    },
    {
      title: "MODULE 4",
      objective: "Probability Distributions, Central Limit Theorem",
      tutorial: "Tutorial 4: Probability Distributions and the Central Limit Theorem",
      labTitle: "Lab 4: Distributions and CLT",
      experiments: [
        {
          id: "math-m4-1",
          title: "Common Probability Distributions—Normal, Binomial, Poisson",
          desc: "Explore and work with the most important probability distributions: Normal, Binomial, and Poisson.",
          expected: "Able to identify and compute probabilities using normal, binomial, and Poisson distributions.",
          content: {
            aim: {
              text: "This experiment introduces the workhorse distributions of probability theory. The Binomial distribution models the number of successes in repeated trials. The Poisson distribution models the number of events in a fixed interval. And the Normal distribution—the famous bell curve—is the most important distribution in all of statistics, modeling everything from measurement errors to IQ scores.",
              bullets: [
                "Define the Binomial distribution and its parameters (n, p)",
                "Define the Poisson distribution and its parameter (λ)",
                "Define the Normal distribution and its parameters (μ, σ)",
                "Compute probabilities using these distributions",
                "Understand the relationships between distributions"
              ]
            },
            theory: [
              {
                title: "The Binomial Distribution—Counting Successes",
                body: [
                  "The Binomial distribution models the number of successes in n independent trials, each with probability p of success.",
                  "![Binomial Distribution](/binomial_distribution.webp)",
                  "Example: Flip a coin 10 times. How many heads? X ~ Binomial(n=10, p=0.5).",
                  "The probability of exactly k successes: P(X=k) = C(n,k) × pᵏ × (1-p)ⁿ⁻ᵏ",
                  "where C(n,k) = n!/(k!(n-k)!) is the binomial coefficient.",
                  "Expected value: E[X] = np. Variance: Var[X] = np(1-p).",
                  "For the coin example: E[X] = 10×0.5 = 5. Var[X] = 10×0.5×0.5 = 2.5, σ = 1.58.",
                  "When is it used? When you have a fixed number of independent trials, each with the same success probability.",
                  "Examples: Number of defective items in a batch, number of heads in n coin flips, number of patients who respond to a treatment."
                ]
              },
              {
                title: "The Poisson Distribution—Counting Events in Time",
                body: [
                  "The Poisson distribution models the number of events occurring in a fixed interval of time or space, when events happen independently at a constant average rate.",
                  "![Poisson Distribution](/poisson_distribution.webp)",
                  "Example: Average 2 cars pass a point per minute. How many cars in a minute? X ~ Poisson(λ=2).",
                  "P(X=k) = e^(-λ) × λᵏ / k!",
                  "Expected value: E[X] = λ. Variance: Var[X] = λ.",
                  "For the car example: P(X=0) = e^(-2) ≈ 0.135, P(X=1) = e^(-2)×2 ≈ 0.271, P(X=2) = e^(-2)×4/2 ≈ 0.271.",
                  "When is it used? Counting rare events: radioactive decay, calls to a call center, website visitors, defects per product unit.",
                  "The Poisson is the limit of the Binomial when n → ∞, p → 0, and np → λ. It's a good approximation when n is large and p is small."
                ]
              },
              {
                title: "The Normal Distribution—The Bell Curve",
                body: [
                  "The Normal (or Gaussian) distribution is the most important distribution in statistics. It's the bell curve that appears everywhere.",
                  "![Normal Distribution](/normal_distribution.webp)",
                  "Probability density function: f(x) = (1/(σ√2π)) × e^(-(x-μ)²/(2σ²))",
                  "Parameters: μ (mean, where the peak is) and σ (standard deviation, how spread out it is).",
                  "The 68-95-99.7 Rule:",
                  "• 68% of data lies within μ ± σ",
                  "• 95% of data lies within μ ± 2σ",
                  "• 99.7% of data lies within μ ± 3σ",
                  "Why is it so important? The Central Limit Theorem (next topic) says that averages of many independent random variables are normally distributed, regardless of the original distribution!",
                  "In quantum computing, measurement outcomes from many shots follow a normal distribution, allowing us to estimate expectation values and uncertainties."
                ]
              },
              {
                title: "Standard Normal Distribution and Z-Scores",
                body: [
                  "The standard normal distribution has μ = 0 and σ = 1. We denote it as Z ~ N(0,1).",
                  "Any normal variable X ~ N(μ, σ) can be standardized: Z = (X - μ)/σ.",
                  "![Standard Normal](/standard_normal.webp)",
                  "The Z-score tells you how many standard deviations a value is from the mean.",
                  "Z = +1: one standard deviation above the mean.",
                  "Z = -1.5: one and a half standard deviations below the mean.",
                  "Z-scores let us compare values from different distributions.",
                  "Example: A student scores 85 on a test with mean 75 and σ=5. Z = (85-75)/5 = 2. This is in the top 2.3% of scores!",
                  "In quantum computing, we use Z-scores to determine confidence intervals for measurement results."
                ]
              },
              {
                title: "Connections Between Distributions",
                body: [
                  "These distributions aren't isolated—they're connected:",
                  "1. Binomial → Normal: When n is large, Binomial(n,p) ≈ Normal(np, √(np(1-p))).",
                  "This is useful because computing binomial probabilities for large n is computationally expensive.",
                  "2. Binomial → Poisson: When n is large and p is small, Binomial(n,p) ≈ Poisson(np).",
                  "Used when counting rare events.",
                  "3. Poisson → Normal: When λ is large, Poisson(λ) ≈ Normal(λ, √λ).",
                  "![Distribution Relationships](/distribution_relationships.webp)",
                  "In quantum computing, these relationships are important for:",
                  "• Estimating measurement probabilities from a finite number of shots.",
                  "• Determining confidence intervals for quantum algorithm results.",
                  "• Modeling decoherence and noise processes."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the statistical workspace",
              "Compute Binomial probabilities for given n and p",
              "Compute Poisson probabilities for given λ",
              "Calculate probabilities using the Normal distribution",
              "Standardize normal variables to find Z-scores",
              "Use the 68-95-99.7 rule for normal distributions",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Devore, J.L. - 'Probability and Statistics for Engineering and the Sciences', 9th Edition, Chapter 3 on Discrete Distributions, Chapter 4 on Continuous Distributions",
              "Montgomery, D.C. and Runger, G.C. - 'Applied Statistics and Probability for Engineers', 6th Edition, Chapter 3 on Random Variables and Probability Distributions"
            ]
          }
        },
        {
          id: "math-m4-2",
          title: "The Central Limit Theorem—The Cornerstone of Statistics",
          desc: "Understand the Central Limit Theorem and its profound implications for statistics and quantum computing.",
          expected: "Able to apply the CLT to estimate sampling distributions and confidence intervals.",
          content: {
            aim: {
              text: "This experiment covers the Central Limit Theorem (CLT)—perhaps the most important theorem in all of statistics. The CLT states that the sum (or average) of many independent random variables is approximately normal, regardless of the original distribution. This theorem is why the normal distribution appears everywhere, why polls work, and why we can do statistics at all.",
              bullets: [
                "State the Central Limit Theorem and its conditions",
                "Understand why the CLT is so important",
                "Apply the CLT to estimate sampling distributions",
                "Compute confidence intervals using the CLT",
                "Understand the CLT's role in quantum computing and machine learning"
              ]
            },
            theory: [
              {
                title: "The Central Limit Theorem—The Magic of Averages",
                body: [
                  "Imagine you're sampling 100 voters to estimate the proportion who support a candidate. The proportion you observe is the average of 100 individual Bernoulli random variables (1 for support, 0 for oppose).",
                  "The CLT says: No matter how skewed the original distribution is (and a Bernoulli is very skewed!), the average of a large number of samples is normally distributed!",
                  "![Central Limit Theorem](/central_limit_theorem.webp)",
                  "Formal statement: Let X₁, X₂, ..., Xₙ be independent, identically distributed random variables with mean μ and standard deviation σ. Then:",
                  "(X̄ - μ) / (σ/√n) → N(0, 1) as n → ∞.",
                  "In words: The standardized sample mean converges in distribution to the standard normal distribution.",
                  "This is true regardless of the original distribution (as long as it has finite mean and variance). This is why the CLT is so powerful!"
                ]
              },
              {
                title: "Why the CLT Matters",
                body: [
                  "The CLT is the reason statistics works in practice:",
                  "1. It tells us the sampling distribution of the mean is normal, so we can construct confidence intervals.",
                  "2. It justifies using normal-based tests even when the data isn't normal (as long as the sample size is large enough).",
                  "3. It explains why the normal distribution appears everywhere in nature.",
                  "![CLT Application](/clt_application.webp)",
                  "Examples:",
                  "• Opinion polls: Sample 1000 voters; the sample proportion is approximately normal.",
                  "• Quality control: Average diameter of 100 machine parts is approximately normal.",
                  "• Finance: The average return of a portfolio is approximately normal.",
                  "• Physics: Measurement errors are normally distributed (the sum of many small errors).",
                  "In quantum computing, the CLT tells us that after many shots, the estimated probabilities are approximately normal, allowing us to compute confidence intervals and compare results."
                ]
              },
              {
                title: "Confidence Intervals Using the CLT",
                body: [
                  "The CLT allows us to construct confidence intervals for unknown population parameters.",
                  "A 95% confidence interval for the mean μ is: x̄ ± 1.96 × (σ/√n)",
                  "where 1.96 is the z-score for 95% confidence (Φ(1.96) ≈ 0.975).",
                  "![Confidence Interval](/confidence_interval.webp)",
                  "Interpretation: If we repeated the sampling process many times, 95% of the resulting confidence intervals would contain the true μ.",
                  "Example: Sample n=100, x̄=75, σ=10. 95% CI = 75 ± 1.96 × (10/√100) = 75 ± 1.96 = (73.04, 76.96).",
                  "The margin of error = 1.96 × (σ/√n). It decreases as √n, so to halve the margin of error, quadruple the sample size!"
                ]
              },
              {
                title: "The CLT in Quantum Computing",
                body: [
                  "In quantum computing, the CLT appears in several important contexts:",
                  "1. Estimating expectation values: We run the circuit many times (shots) and average the measurement outcomes. The average is approximately normal.",
                  "2. Confidence intervals: We can compute error bars for our estimates based on the standard error.",
                  "3. Phase estimation: The precision of phase estimation scales as O(1/√n) due to the CLT (or O(1/n) with better algorithms).",
                  "4. Quantum machine learning: When training models on quantum data, the averages used in optimization are approximately normal.",
                  "![Quantum CLT](/quantum_clt.webp)",
                  "The CLT also appears in the theory of quantum measurement: the distribution of measurement outcomes from multiple identical experiments approaches a normal distribution, which is why we can confidently estimate quantum state parameters from finite samples."
                ]
              },
              {
                title: "Limitations and Assumptions of the CLT",
                body: [
                  "The CLT has important assumptions and limitations:",
                  "1. Independence: The samples must be independent (or at least weakly dependent).",
                  "2. Identically distributed: The samples must come from the same distribution.",
                  "3. Finite variance: The distribution must have finite variance (no heavy tails).",
                  "4. Large enough n: The CLT is asymptotic—it works better for larger n.",
                  "For strongly skewed distributions, n might need to be quite large (e.g., n > 50) for the CLT to hold.",
                  "For heavy-tailed distributions (like Cauchy), the CLT doesn't apply at all.",
                  "In quantum computing, shot noise (the variance of the Bernoulli distribution from measurements) is finite, so the CLT applies—and it tells us exactly how the error decreases with more shots."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Open the statistical workspace",
              "Simulate sampling from various distributions",
              "Observe how the sample mean distribution approaches normal",
              "Construct confidence intervals using the CLT",
              "Calculate margins of error for different sample sizes",
              "Understand the trade-off between sample size and precision",
              "Complete the quiz to test your understanding"
            ],
            posttest: [],
            references: [
              "Devore, J.L. - 'Probability and Statistics for Engineering and the Sciences', 9th Edition, Chapter 5 on Sampling Distributions",
              "Montgomery, D.C. and Runger, G.C. - 'Applied Statistics and Probability for Engineers', 6th Edition, Chapter 6 on Sampling Distributions"
            ]
          }
        }
      ]
    }
  ]
};