import { Course } from './course-data';
import { mathShortNotes } from './math-short-notes';

export const mathCourse: Course = {
  id: "mathematics-for-emerging-technologies",
  title: "Mathematical, Physical and Computing Foundations of Quantum Computing",
  shortNotes: mathShortNotes,
  objectives: [
    "To compute eigenvalues, eigenvectors, and perform diagonalization of matrices, and interpret these results in the context of quantum state representation",
    "To model random experiments using probability distributions and apply the Central Limit Theorem to analyze data relevant to quantum mechanical systems",
    "To apply Maxwell's equations to derive wave propagation characteristics in free space, conducting media, and optical fibers",
    "To trace the instruction execution cycle in a microprocessor, including fetch, decode, and execute phases, and explain the role of memory hierarchy in system performance",
    "To design optimized combinational circuits such as adders, multiplexers, and code converters using Boolean algebra and Karnaugh map simplification"
  ],
  introduction: [
    "Quantum computing represents a paradigm shift in computation, leveraging the principles of quantum mechanics to solve problems that are intractable for classical computers. The foundations of this revolutionary field rest on three pillars: the mathematical framework of linear algebra and Hilbert spaces, the statistical mechanics of quantum systems, and the classical computing architecture that will ultimately host quantum processors.",
    "This course bridges the gap between abstract quantum theory and practical computational implementation. Students will begin with the mathematical tools essential for quantum state representation—vectors, matrices, eigenvalues, and Hilbert spaces—then progress through probability and statistics that underpin quantum measurement and uncertainty. The journey continues through classical physics (Lagrangian and Hamiltonian mechanics, Maxwell's equations) that inform quantum theory, before grounding these concepts in the concrete reality of computer architecture, microprocessors, and digital logic.",
    "The curriculum is structured to build competence progressively: Unit I establishes the linear algebra foundation; Unit II introduces probability, classical mechanics, and electromagnetic theory; Unit III covers computer architecture and number representation; Unit IV explores microprocessors and memory hierarchy; and Unit V delves into digital logic and combinational circuit design. Each unit includes theory, visualizations, and assessment questions to reinforce learning.",
    "This course is designed for students aiming to understand both the theoretical underpinnings and the practical computing infrastructure that will enable the quantum revolution. Whether your interest lies in quantum algorithm development, quantum hardware design, or hybrid classical-quantum systems, the foundations covered here will be essential."
  ],
  targetAudience: {
    primary: "Undergraduate students of Computer Science, Electronics, and Physics studying the mathematical and computational foundations of quantum computing.",
    prerequisites: [
      "Basic calculus (differentiation and integration)",
      "Familiarity with high school algebra and trigonometry",
      "Basic understanding of classical physics (mechanics, electromagnetism)",
      "Introductory knowledge of digital electronics and number systems"
    ],
    usefulFor: [
      "Students pursuing quantum computing research and development",
      "Engineers working on quantum hardware and control systems",
      "Computer scientists developing quantum algorithms and compilers",
      "Students preparing for interdisciplinary careers at the intersection of physics, mathematics, and computing",
      "Researchers exploring quantum simulation and quantum chemistry applications"
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "Computer Science and Engineering",
    course: "Mathematical, Physical and Computing Foundations of Quantum Computing",
    credits: "L:4 T:0 P:0 C:4",
    yearSem: "Third Year, First Semester",
    branches: "CSE, IT, ECE, and EEE",
    totalExperiments: "10 experiments (2 per unit)",
    compiler: "Theory-based learning with visual aids and interactive assessments",
    units: [
      { unit: "Unit I", topics: "Linear Algebra — Vectors, Matrices, Eigenvalues, Hilbert Spaces", weeks: "Week 1" },
      { unit: "Unit II", topics: "Probability, Statistics, Classical Mechanics, Maxwell's Equations", weeks: "Week 2" },
      { unit: "Unit III", topics: "Computer Architecture — Number Systems, Instruction Cycle", weeks: "Week 3" },
      { unit: "Unit IV", topics: "Microprocessors and Memory Hierarchy", weeks: "Week 4" },
      { unit: "Unit V", topics: "Digital Logic, Boolean Algebra, Combinational Circuits", weeks: "Week 5" }
    ]
  },
  weeks: [
    {
      title: "WEEK 1",
      objective: "Linear Algebra — Vector Spaces, Eigenvalues, Eigenvectors, Diagonalization, and Hilbert Spaces",
      tutorial: "Tutorial 1: Mathematical Foundations of Quantum Computing",
      labTitle: "Lab 1: Linear Algebra for Quantum Systems",
      experiments: [
        {
          id: "math-w1-1",
          title: "Vectors, Vector Spaces, Linear Transformations, and Complex Matrices",
          desc: "Explore the mathematical foundations of quantum computing through vector spaces, linear transformations, and complex matrices that form the language of quantum mechanics.",
          expected: "Students will understand vector spaces, linear transformations, complex matrices, and their role in quantum state representation.",
          content: {
            aim: {
              text: "This experiment introduces the foundational mathematical structures that underpin quantum computing. Quantum states are represented as vectors in complex vector spaces, and quantum operations are linear transformations acting on these vectors. You will explore the properties of vector spaces, the algebra of linear transformations, and the special role of complex matrices in quantum mechanics. By the end of this experiment, you should be able to define a vector space, understand linear transformations, work with complex matrices, and explain why quantum mechanics requires complex numbers rather than just real numbers.",
              bullets: [
                "Define vector spaces and their properties (closure under addition and scalar multiplication)",
                "Understand linear transformations and their representation as matrices",
                "Work with complex vectors and complex matrices",
                "Compute matrix operations including addition, multiplication, and transpose",
                "Relate linear algebra concepts to quantum state representation"
              ]
            },
            theory: [
              {
                title: "Vector Spaces — The Mathematical Stage for Quantum States",
                body: [
                  "Imagine you're at a dance floor where everyone moves together. You can combine moves — do the spin and then the slide — and the result is still a valid dance move. You can also scale moves — do the spin twice as fast — and that's still a dance move. This dance floor, with all its combination rules, is exactly what mathematicians call a vector space. Every possible quantum state lives on this dance floor!",
                  "In math terms, a vector space V over a field F (like real or complex numbers) is a set of vectors where you can add any two vectors to get another vector, and you can multiply any vector by any number to get another vector. These operations follow nice rules — they're associative, commutative, and distribute nicely. The fancy word for this structure is a Hilbert space when we add an inner product (a way to measure angles between vectors).",
                  "For a single qubit — the quantum version of a bit — our dance floor has just two basic directions: |0⟩ and |1⟩. Any quantum state is a combination of these two directions, like doing a spin that's 70% slide and 30% spin. But here's the mind-blowing part: for n qubits, our dance floor has 2ⁿ dimensions! That means with just 50 qubits, you have more dimensions than there are atoms in the universe — and that's what gives quantum computing its incredible power.",
                  "![Vector Space Visualization](/vector_space_basics.webp)",
                  "The dimension of a vector space is just the number of independent directions you need to describe every possible vector. A single qubit needs 2 directions; two qubits need 4 directions; and n qubits need 2ⁿ directions. This exponential growth is the secret sauce of quantum computing — it's why a quantum computer can solve problems that would take a classical computer longer than the age of the universe!",
                  "So why does this matter? Every quantum algorithm you'll ever run is just moving vectors around on this dance floor. Understanding vector spaces is understanding the stage where all quantum magic happens — from teleportation to cryptography to simulating molecules."
                ]
              },
              {
                title: "Linear Transformations — The Operations on Quantum States",
                body: [
                  "Think of a linear transformation like a magical mirror that takes every dance move on one dance floor and maps it to a move on another dance floor. The magical part? It preserves the structure — if you combine two moves and then transform them, it's exactly the same as transforming them first and then combining. This consistency is what makes linear transformations so powerful.",
                  "In quantum computing, every operation you can do on a qubit is a linear transformation. For example, the Hadamard gate is like a beam splitter — it takes a qubit in state |0⟩ and puts it into a 50/50 superposition of |0⟩ and |1⟩. It's like telling a dancer to be equally likely to go left or right, but in a quantum way where they're actually doing both simultaneously!",
                  "The formal definition is: a linear transformation T: V → W satisfies T(v₁ + v₂) = T(v₁) + T(v₂) and T(cv) = cT(v) for all vectors v and all scalars c. This just means the transformation plays nice with addition and scaling. Once you choose a coordinate system (basis), every linear transformation becomes a matrix — that's why matrices are everywhere in quantum computing!",
                  "There's a special kind of linear transformation in quantum mechanics called unitary transformations. These are the transformations that preserve the 'length' of vectors — they never change the total probability. In math, unitary matrices satisfy U†U = I, where U† is the conjugate transpose. Think of them as the transformations that keep the dance moves valid and don't accidentally create or destroy dancers.",
                  "So why does this matter? Every quantum gate you'll ever use is just a linear transformation. Understanding them means you understand how to manipulate quantum states to perform computations."
                ]
              },
              {
                title: "Complex Vectors and Matrices — Why Quantum Needs Imaginary Numbers",
                body: [
                  "Why can't we just use regular numbers for quantum mechanics? Imagine you have two waves in the ocean — they can add together to make a bigger wave (constructive interference) or cancel each other out to make a smaller wave (destructive interference). To describe this wave behavior, you need phases — and phases are naturally described by complex numbers (numbers with an imaginary part).",
                  "A complex vector is just a list of numbers where each entry might have an imaginary part (like 2 + 3i, where i² = -1). The conjugate transpose of a matrix A (written A†) is found by flipping the matrix and then replacing each number with its complex conjugate (flip the sign of the imaginary part).",
                  "The inner product of two complex vectors ⟨φ|ψ⟩ = φ†ψ gives us a complex number whose squared magnitude tells us the probability of finding the system in state |φ⟩ when it's in state |ψ⟩. This is how we compute probabilities in quantum mechanics!",
                  "Here's a quick cheat sheet comparing the main types of matrices we use in quantum mechanics:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Concept</th><th class=\"p-3 border border-cyan/20\">Mathematical Formulation</th><th class=\"p-3 border border-cyan/20\">Quantum Computing Application</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">State</td><td class=\"p-3 border border-cyan/20\">Vector |ψ⟩ in Hilbert space</td><td class=\"p-3 border border-cyan/20\">Superposition: |ψ⟩ = α|0⟩ + β|1⟩</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Gate</td><td class=\"p-3 border border-cyan/20\">Unitary matrix U</td><td class=\"p-3 border border-cyan/20\">Hadamard: H = (1/√2)[[1,1],[1,-1]]</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Measurement</td><td class=\"p-3 border border-cyan/20\">Hermitian operator M</td><td class=\"p-3 border border-cyan/20\">Pauli Z: Z = [[1,0],[0,-1]]</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Probability</td><td class=\"p-3 border border-cyan/20\">Born rule: |⟨φ|ψ⟩|²</td><td class=\"p-3 border border-cyan/20\">P(|1⟩) = |β|²</td></tr></tbody></table>",
                  "So why does this matter? Without complex numbers, we couldn't describe interference — and interference is what makes quantum algorithms faster than classical ones. It's not optional; it's essential!"
                ]
              },
              {
                title: "Inner Product Spaces and Orthogonality",
                body: [
                  "Imagine you have two dancers on the floor — you want to know how much they're 'pointing in the same direction.' The inner product is just a fancy way of measuring this overlap. In quantum mechanics, this overlap tells us the probability of transitioning from one state to another.",
                  "For complex vectors, the inner product is defined as ⟨u|v⟩ = Σᵢ uᵢ* vᵢ, where uᵢ* is the complex conjugate of uᵢ. This guarantees that ⟨v|v⟩ ≥ 0 (a real non-negative number) and equals 0 only when v = 0. Think of it as the quantum version of 'how much of this vector is pointing in that direction.'",
                  "Two vectors are orthogonal if their inner product is zero: ⟨u|v⟩ = 0. In quantum mechanics, orthogonal states are perfectly distinguishable — if a system is in state |u⟩, you will never measure it in state |v⟩. They're like dancers facing completely opposite directions.",
                  "A set of vectors {|e₁⟩, |e₂⟩, ..., |eₙ⟩} is called an orthonormal basis if each vector has unit length and they're all mutually orthogonal. The standard basis {|0⟩, |1⟩} is one example. The Hadamard basis {|+⟩ = (|0⟩+|1⟩)/√2, |−⟩ = (|0⟩−|1⟩)/√2} is another — you can rotate between bases and the inner product structure stays intact.",
                  "So why does this matter? Orthogonality is what lets us perfectly distinguish quantum states. When we measure a qubit in the computational basis {|0⟩, |1⟩}, we can tell them apart with 100% certainty because they're orthogonal. This is the foundation of all quantum measurement!"
                ]
              },
              {
                title: "Applications to Quantum Computing — Putting It All Together",
                body: [
                  "Now let's connect all these dots to see how they power quantum computing:",
                  "• A quantum state is a unit vector in a complex Hilbert space. For n qubits, this space has dimension 2ⁿ — that exponential growth again!",
                  "• A quantum gate is a unitary matrix — it rotates the state without changing its length. Examples: Pauli matrices X, Y, Z; Hadamard gate H; controlled-NOT (CNOT) gate.",
                  "• A quantum measurement is a Hermitian operator. The possible outcomes are its eigenvalues (which are always real numbers!), and the probabilities are given by the Born rule: P(outcome = λ) = ⟨ψ|P_λ|ψ⟩ where P_λ projects onto the states with outcome λ.",
                  "• The evolution of a quantum system is described by the Schrödinger equation: iℏ d|ψ⟩/dt = H|ψ⟩, where H is the Hamiltonian — a Hermitian matrix that represents the energy of the system.",
                  "• Entanglement arises when we combine qubits using tensor products: the state space of two qubits is V₁ ⊗ V₂, which has dimension 4. This is what makes quantum computers so powerful — entangled states can't be described by classical physics!",
                  "So why does this matter? These mathematical tools are the language of quantum computing. Whether you're designing quantum algorithms, building quantum hardware, or just trying to understand how quantum computers work — this is where it all begins."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Read the theory section on vector spaces and their properties carefully",
              "Study the vector space visualization and understand the geometric interpretation",
              "Review the concept of linear transformations and their matrix representations",
              "Work through examples of complex matrix operations (addition, multiplication, conjugate transpose)",
              "Understand the inner product structure and orthogonality in complex spaces",
              "Attempt the pretest questions to check your understanding of foundational concepts",
              "Proceed to the next experiment on eigenvalues and eigenvectors"
            ],
            posttest: [],
            references: [
              "Bernard Kolman, David A Hill, 'Elementary Linear Algebra with Applications', Pearson New International Edition, 2013",
              "K. Hoffman and R. Kunze, 'Linear Algebra', Pearson Education, 2nd Edition, 2005",
              "Erwin Kreyszig, 'Advanced Engineering Mathematics', Wiley India, 10th Edition, 2015"
            ]
          }
        },
        {
          id: "math-w1-2",
          title: "Eigenvalues, Eigenvectors, Diagonalization, and Hilbert Spaces",
          desc: "Master the concepts of eigenvalues, eigenvectors, and diagonalization — the mathematical tools that reveal the fundamental properties of quantum systems and enable quantum state manipulation.",
          expected: "Students will compute eigenvalues and eigenvectors, perform matrix diagonalization, and understand the structure of Hilbert spaces for quantum state representation.",
          content: {
            aim: {
              text: "This experiment delves into the essential tools of linear algebra that form the core of quantum mechanics: eigenvalues, eigenvectors, and diagonalization. These concepts allow us to find the 'special directions' in a vector space that are invariant under a transformation (eigenvectors) and the corresponding 'scaling factors' (eigenvalues). In quantum mechanics, eigenvalues of an observable are the possible measurement outcomes, and eigenvectors are the states that yield definite measurement results. By the end of this experiment, you should be able to compute eigenvalues and eigenvectors for any matrix, perform diagonalization, understand the spectral theorem, and explain why Hilbert spaces are the natural setting for quantum mechanics.",
              bullets: [
                "Define eigenvalues and eigenvectors and compute them for 2×2 and 3×3 matrices",
                "Understand the characteristic equation and characteristic polynomial",
                "Perform matrix diagonalization using eigenvectors as a basis",
                "Recognize the spectral theorem and its implications for Hermitian matrices",
                "Understand Hilbert spaces as complete inner product spaces"
              ]
            },
            theory: [
              {
                title: "Eigenvalues and Eigenvectors — The Special Directions",
                body: [
                  "Imagine you're pulling a piece of stretchy taffy in different directions. Some directions just stretch the taffy without rotating it — you pull, and it gets longer, but it stays pointing the same way. Other directions make the taffy twist and turn. The directions that only stretch (without rotating) are eigenvectors, and the amount they stretch is the eigenvalue. Pretty neat, right?",
                  "In math terms, for a matrix A (representing a linear transformation), a non-zero vector v is an eigenvector with eigenvalue λ if Av = λv. The eigenvalue λ can be any scalar (real or complex). The fancy word for this is: eigenvectors are the 'special directions' that don't change their direction under the transformation.",
                  "Finding eigenvalues is like asking: which directions does this transformation NOT turn? To find them, we solve det(A − λI) = 0 — think of it as asking 'what scaling factor λ makes this matrix act like stretching instead of rotating?' The characteristic polynomial is p(λ) = det(A − λI), and its roots are the eigenvalues.",
                  "![Eigenvalue Transformation](/math_eigenvalue.webp)",
                  "In quantum mechanics, eigenvectors of an observable (like energy or spin) represent states that have a definite value of that observable. When you measure an observable, the system 'collapses' into one of its eigenvectors, and the measurement result is the corresponding eigenvalue.",
                  "So why does this matter? Eigenvalues tell us the possible outcomes of quantum measurements. If you want to measure the energy of a particle, you're looking for the eigenvalues of the energy operator. They're literally the numbers you'll see on your measurement device!"
                ]
              },
              {
                title: "Computing Eigenvalues and Eigenvectors — Step by Step",
                body: [
                  "Let's work through a concrete example to build intuition. We'll find eigenvalues and eigenvectors of A = [[2, 1], [1, 2]].",
                  "Step 1: Form A − λI = [[2−λ, 1], [1, 2−λ]].",
                  "Step 2: Compute the determinant: det(A − λI) = (2−λ)(2−λ) − 1 = λ² − 4λ + 3 = (λ−1)(λ−3).",
                  "Step 3: The eigenvalues are λ₁ = 1 and λ₂ = 3. These are the scaling factors — in one direction, the taffy stays the same length; in another direction, it triples in length!",
                  "Step 4: For λ₁ = 1: Solve (A − I)v = 0 → [[1, 1], [1, 1]][v₁, v₂]ᵀ = [0, 0]ᵀ → v₁ + v₂ = 0 → eigenvector v₁ = [1, −1]ᵀ (up to scaling).",
                  "Step 5: For λ₂ = 3: Solve (A − 3I)v = 0 → [[−1, 1], [1, −1]][v₁, v₂]ᵀ = [0, 0]ᵀ → −v₁ + v₂ = 0 → eigenvector v₂ = [1, 1]ᵀ.",
                  "Notice that v₁ and v₂ are orthogonal: [1, −1]·[1, 1] = 0. For symmetric matrices (and Hermitian matrices in the complex case), eigenvectors corresponding to distinct eigenvalues are always orthogonal. This is called the spectral theorem — it's like nature's guarantee that the special directions are always perpendicular.",
                  "So why does this matter? This step-by-step process is exactly what quantum computers do when they find the ground state energy of a molecule. It's the mathematical core of many quantum algorithms!"
                ]
              },
              {
                title: "Diagonalization — Simplifying Transformations",
                body: [
                  "Diagonalization is like finding a new coordinate system where a transformation becomes ridiculously simple — it just stretches each axis by a fixed amount. Imagine rotating your taffy so you're only pulling along the special directions; now the math is just multiplication!",
                  "A matrix A is diagonalizable if there exists an invertible matrix P and a diagonal matrix D such that A = PDP⁻¹. The columns of P are the eigenvectors of A, and the diagonal entries of D are the corresponding eigenvalues.",
                  "In quantum mechanics, diagonalization of a Hamiltonian (energy operator) reveals the energy levels and energy eigenstates. This is often the first step in solving any quantum problem — it's like finding the natural frequencies of a vibrating string.",
                  "Procedure for diagonalization:",
                  "1. Find all eigenvalues λ₁, λ₂, ..., λₙ.",
                  "2. For each eigenvalue, find a basis of eigenvectors.",
                  "3. Form the matrix P with the eigenvectors as columns.",
                  "4. Form the diagonal matrix D with the eigenvalues on the diagonal.",
                  "5. Verify A = PDP⁻¹.",
                  "Not all matrices are diagonalizable. A matrix is diagonalizable if and only if it has n linearly independent eigenvectors. But here's the good news: every Hermitian matrix (which includes all quantum observables) is diagonalizable! Even better, the eigenvectors can be chosen to form an orthonormal basis — perfectly perpendicular and all unit length.",
                  "So why does this matter? Diagonalization is how we find the energy levels of quantum systems. Without it, we couldn't predict atomic spectra, design lasers, or build quantum computers!"
                ]
              },
              {
                title: "Hilbert Spaces — The Complete Inner Product Space",
                body: [
                  "Imagine a big warehouse where you can store infinite vectors. The walls are sturdy enough to handle infinite sums — if you keep adding vectors and they get closer and closer together, the sum actually exists in the warehouse. This special warehouse is called a Hilbert space.",
                  "In math terms, a Hilbert space is a vector space with an inner product that is complete — meaning that any Cauchy sequence of vectors converges to a vector in the space. The fancy word for this property is 'complete,' and it's crucial for quantum mechanics because it ensures that infinite sums (like wavefunction expansions) make sense.",
                  "The Hilbert space of quantum mechanics is L² — the space of square-integrable functions on the real line. The inner product is ⟨ψ|φ⟩ = ∫ ψ*(x)φ(x) dx. This might look scary, but it's just a continuous version of the dot product you already know.",
                  "Key properties of Hilbert spaces:",
                  "• They have an orthonormal basis (the eigenvectors of any Hermitian operator).",
                  "• Any vector can be expanded as a (possibly infinite) linear combination of basis vectors.",
                  "• The inner product induces a norm: ||v|| = √⟨v|v⟩.",
                  "• The dimension can be finite (for a qubit, dimension 2; for n qubits, dimension 2ⁿ) or infinite (for a particle in continuous space).",
                  "In Dirac notation (the language of quantum mechanics):",
                  "• A state is written as a ket: |ψ⟩ (a column vector).",
                  "• The corresponding bra: ⟨ψ| is the conjugate transpose (a row vector).",
                  "• The inner product is written as ⟨φ|ψ⟩.",
                  "• Operators act on kets: Â|ψ⟩.",
                  "• The outer product |ψ⟩⟨φ| is an operator.",
                  "So why does this matter? Hilbert spaces are where quantum states live. Understanding them means understanding the mathematical universe of quantum mechanics."
                ]
              },
              {
                title: "Spectral Theorem and Its Significance",
                body: [
                  "The spectral theorem is like the ultimate cheat code for quantum mechanics. It says: every Hermitian matrix can be diagonalized, and the diagonal entries are real numbers. Simple, powerful, and absolutely essential.",
                  "Spectral Theorem for Hermitian Matrices: Every Hermitian matrix A can be diagonalized by a unitary matrix: A = UDU†, where D is a real diagonal matrix and U is unitary (U†U = I). The diagonal entries are the eigenvalues of A.",
                  "This means we can write A as a sum of projectors: A = Σᵢ λᵢ Pᵢ, where Pᵢ = |vᵢ⟩⟨vᵢ| is the projector onto the eigenspace corresponding to eigenvalue λᵢ.",
                  "In quantum mechanics:",
                  "• Any observable (measurement) corresponds to a Hermitian operator — these are the 'fair' matrices that only give real number answers.",
                  "• The eigenvalues are the possible measurement outcomes (they are always real).",
                  "• The eigenvectors are the states that give definite outcomes — measure a particle in its eigenstate, and you'll get the corresponding eigenvalue with 100% certainty.",
                  "• The projectors Pᵢ define the measurement operators: when you measure, you get outcome λᵢ with probability ⟨ψ|Pᵢ|ψ⟩.",
                  "Here's a quick cheat sheet comparing the main matrix types in quantum mechanics:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Matrix Type</th><th class=\"p-3 border border-cyan/20\">Property</th><th class=\"p-3 border border-cyan/20\">Eigenvalues</th><th class=\"p-3 border border-cyan/20\">Eigenvectors</th><th class=\"p-3 border border-cyan/20\">Quantum Role</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Hermitian</td><td class=\"p-3 border border-cyan/20\">A† = A</td><td class=\"p-3 border border-cyan/20\">Real</td><td class=\"p-3 border border-cyan/20\">Orthonormal</td><td class=\"p-3 border border-cyan/20\">Observables (energy, spin)</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Unitary</td><td class=\"p-3 border border-cyan/20\">U†U = I</td><td class=\"p-3 border border-cyan/20\">|λ| = 1 (unit circle)</td><td class=\"p-3 border border-cyan/20\">Orthonormal</td><td class=\"p-3 border border-cyan/20\">Quantum gates (evolution)</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Positive</td><td class=\"p-3 border border-cyan/20\">⟨v|A|v⟩ ≥ 0</td><td class=\"p-3 border border-cyan/20\">Non-negative</td><td class=\"p-3 border border-cyan/20\">Orthonormal</td><td class=\"p-3 border border-cyan/20\">Density matrices</td></tr></tbody></table>",
                  "So why does this matter? The spectral theorem is the mathematical foundation of quantum measurement. It tells us what outcomes we can get when we measure a quantum system. Every quantum experiment, from the simplest qubit measurement to the most complex quantum chemistry calculation, relies on this theorem!"
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Read the theory sections on eigenvalues, eigenvectors, and diagonalization thoroughly",
              "Work through the example computation of eigenvalues and eigenvectors step by step",
              "Study the diagonalization process and understand why it's important for quantum mechanics",
              "Review the properties of Hilbert spaces and Dirac notation",
              "Understand the spectral theorem and its implications for quantum measurement",
              "Attempt the pretest questions to check your understanding",
              "Proceed to the next unit on probability and statistics"
            ],
            posttest: [],
            references: [
              "Bernard Kolman, David A Hill, 'Elementary Linear Algebra with Applications', Pearson New International Edition, 2013",
              "K. Hoffman and R. Kunze, 'Linear Algebra', Pearson Education, 2nd Edition, 2005",
              "Erwin Kreyszig, 'Advanced Engineering Mathematics', Wiley India, 10th Edition, 2015"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 2",
      objective: "Probability, Statistics, Classical Mechanics, and Maxwell's Equations",
      tutorial: "Tutorial 2: Probability, Statistics, and Physics Foundations",
      labTitle: "Lab 2: Probability, Statistics, and Quantum Mechanics Basics",
      experiments: [
        {
          id: "math-w2-1",
          title: "Statistics, Probability Distributions, and the Central Limit Theorem",
          desc: "Master the statistical tools needed for quantum mechanics — probability distributions, random variables, and the Central Limit Theorem that underpins quantum measurement statistics.",
          expected: "Students will model random experiments using probability distributions and apply the Central Limit Theorem to analyze data relevant to quantum mechanical systems.",
          content: {
            aim: {
              text: "This experiment introduces the statistical framework that connects quantum theory to experimental observations. Quantum mechanics is inherently probabilistic — it can only predict the probabilities of different measurement outcomes, not deterministic results. Understanding probability distributions, random variables, and the Central Limit Theorem is essential for interpreting quantum measurement data and designing quantum experiments. You will learn to describe random experiments, work with discrete and continuous probability distributions, and understand why the Central Limit Theorem is the foundation of statistical inference in quantum physics.",
              bullets: [
                "Define random experiments, sample spaces, and events",
                "Understand probability axioms and conditional probability",
                "Work with discrete and continuous random variables",
                "Identify common probability distributions: binomial, Poisson, normal (Gaussian)",
                "Apply the Central Limit Theorem to quantum measurement statistics"
              ]
            },
            theory: [
              {
                title: "Probability — The Language of Quantum Uncertainty",
                body: [
                  "Imagine you have a gumball machine filled with red, blue, and green gumballs. You crank the handle, and out pops a random gumball. You can't know which color you'll get beforehand — but you can know the chances: maybe 50% red, 30% blue, and 20% green. Quantum mechanics is exactly like that, but instead of gumballs, we're measuring quantum states!",
                  "In math terms, a random experiment is any process with uncertain outcomes — like measuring a qubit in superposition. The sample space is the set of all possible outcomes (like the colors of gumballs). An event is a subset of the sample space (like 'getting a red gumball'). The fancy word for this whole framework is probability theory.",
                  "The probability of an event E, written P(E), satisfies three simple rules:",
                  "1. For any event E, 0 ≤ P(E) ≤ 1 — probabilities are always between 0 and 1.",
                  "2. P(S) = 1, where S is the sample space — something must happen.",
                  "3. For mutually exclusive events E₁, E₂, ..., P(E₁ ∪ E₂ ∪ ...) = P(E₁) + P(E₂) + ... — if events can't happen together, you add their probabilities.",
                  "Conditional probability P(A|B) = P(A∩B)/P(B) is the probability of A given that B has occurred. In quantum mechanics, this is exactly what happens when you measure a system — the state 'collapses' to a particular outcome, and the probabilities update based on what you just observed.",
                  "So why does this matter? Quantum mechanics is fundamentally probabilistic. If you want to predict what a quantum computer will output, you need to understand probability. It's not a bug — it's the core feature of quantum physics!"
                ]
              },
              {
                title: "Random Variables — Quantifying Uncertainty",
                body: [
                  "A random variable is like a label that turns each possible outcome into a number. For our gumball machine, we might assign red=1, blue=2, green=3. This turns events into numbers so we can do statistics on them.",
                  "Discrete random variables take a countable set of values (like the number of red gumballs in 10 pulls). Continuous random variables take values in a continuous range (like the exact position of a quantum particle).",
                  "For a discrete random variable X, the probability mass function (PMF) is P(X = x) — the probability that X equals a specific value x. For a continuous random variable, the probability density function (PDF) f(x) gives the probability density at point x.",
                  "The expected value (mean) of a random variable is the 'average' value you'd get if you repeated the experiment many times: E[X] = Σ x·P(X=x) for discrete, E[X] = ∫ x·f(x) dx for continuous.",
                  "The variance tells you how spread out the values are: Var(X) = E[(X−E[X])²] = E[X²] − (E[X])². The standard deviation σ = √Var(X) is the typical distance from the mean.",
                  "In quantum mechanics, the expectation value of an observable A in state |ψ⟩ is ⟨A⟩ = ⟨ψ|A|ψ⟩. This is the average of many measurements on identically prepared systems — the quantum version of the classical expected value.",
                  "So why does this matter? When you run a quantum algorithm 1000 times, you get a distribution of outcomes. Understanding random variables tells you how to interpret that distribution and what it tells you about your quantum system."
                ]
              },
              {
                title: "Common Probability Distributions",
                body: [
                  "Let's meet the most important probability distributions in quantum physics. Each one tells a different story about how randomness behaves.",
                  "Binomial Distribution: The number of successes in n independent trials, each with probability p. Think of it as flipping a biased coin n times and counting heads. Formula: P(X = k) = C(n,k) p^k (1−p)^(n−k). Mean = np, Variance = np(1−p). In quantum experiments, this describes the statistics of detecting k photons out of n trials.",
                  "Poisson Distribution: The number of events occurring in a fixed time when events happen randomly at a constant rate. Formula: P(X = k) = e^(−λ) λ^k / k!. Mean = Variance = λ. This is perfect for describing radioactive decay and photon counting — rare events that happen independently.",
                  "![Normal Distribution Curve](/math_normal_distribution.webp)",
                  "Normal (Gaussian) Distribution: The famous bell curve — the most important distribution in all of statistics. Formula: f(x) = (1/(σ√(2π))) exp(−(x−μ)²/(2σ²)). Mean = μ, Variance = σ². Many quantum measurement outcomes follow a Gaussian distribution, thanks to the Central Limit Theorem.",
                  "Here's a quick cheat sheet comparing these distributions:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Distribution</th><th class=\"p-3 border border-cyan/20\">Type</th><th class=\"p-3 border border-cyan/20\">Parameters</th><th class=\"p-3 border border-cyan/20\">Mean</th><th class=\"p-3 border border-cyan/20\">Variance</th><th class=\"p-3 border border-cyan/20\">Quantum Application</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Binomial</td><td class=\"p-3 border border-cyan/20\">Discrete</td><td class=\"p-3 border border-cyan/20\">n, p</td><td class=\"p-3 border border-cyan/20\">np</td><td class=\"p-3 border border-cyan/20\">np(1−p)</td><td class=\"p-3 border border-cyan/20\">Photon counting</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Poisson</td><td class=\"p-3 border border-cyan/20\">Discrete</td><td class=\"p-3 border border-cyan/20\">λ</td><td class=\"p-3 border border-cyan/20\">λ</td><td class=\"p-3 border border-cyan/20\">λ</td><td class=\"p-3 border border-cyan/20\">Quantum optics</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Normal</td><td class=\"p-3 border border-cyan/20\">Continuous</td><td class=\"p-3 border border-cyan/20\">μ, σ</td><td class=\"p-3 border border-cyan/20\">μ</td><td class=\"p-3 border border-cyan/20\">σ²</td><td class=\"p-3 border border-cyan/20\">Measurement noise</td></tr></tbody></table>",
                  "So why does this matter? These distributions describe everything from photon detection to measurement noise in quantum computers. Understanding them is essential for designing and interpreting quantum experiments."
                ]
              },
              {
                title: "The Central Limit Theorem — The Bridge to Statistical Inference",
                body: [
                  "The Central Limit Theorem (CLT) is one of the most mind-blowing results in mathematics. It says: no matter what distribution you start with, if you take many independent samples and average them, the distribution of the average approaches a normal (bell curve) distribution as the sample size grows. It's like magic — any shape turns into a bell curve!",
                  "Formally: Let X₁, X₂, ..., Xₙ be independent and identically distributed random variables with mean μ and variance σ². Then the sample mean X̄ = (1/n)Σᵢ Xᵢ is approximately normally distributed with mean μ and variance σ²/n as n → ∞.",
                  "In quantum physics, the CLT explains why measurement results often look like bell curves:",
                  "• When you measure a quantum system many times, the distribution of outcomes tends to a Gaussian.",
                  "• The width of the distribution decreases as 1/√n — you can improve measurement precision by taking more measurements.",
                  "• The CLT justifies using standard statistical methods in quantum experiments — it's why we can say 'after 1000 measurements, the probability is 0.75 ± 0.014.'",
                  "So why does this matter? Every time you see an error bar in a quantum experiment, you're looking at the Central Limit Theorem in action. It's the reason we can trust our measurements and know how confident we are in our results."
                ]
              },
              {
                title: "Applications to Quantum Mechanics",
                body: [
                  "Let's see how probability theory shows up in quantum computing:",
                  "The Born Rule: The probability of measuring a particular outcome is the squared magnitude of the amplitude. For a state |ψ⟩ = Σᵢ cᵢ|i⟩, P(outcome i) = |cᵢ|². This is the quantum version of the probability distribution — it tells us the chances of each outcome.",
                  "Projective Measurement: When you measure an observable A with eigenvalue λᵢ and eigenstate |i⟩, the state collapses to |i⟩. The probability of this outcome is ⟨ψ|Pᵢ|ψ⟩ where Pᵢ = |i⟩⟨i|. This is like picking a gumball and then discarding the rest — the outcome is determined probabilistically.",
                  "Quantum State Tomography: To determine the quantum state experimentally, you perform many measurements in different bases and use statistical inference to reconstruct the state. The CLT tells you how many measurements are needed for a given precision.",
                  "Shor's Algorithm: The probabilistic nature of quantum algorithms — Shor's algorithm succeeds with high probability (not certainty) and you can repeat it until success.",
                  "Quantum Error Correction: Uses repeated measurements (syndrome extraction) to detect and correct errors. The statistics of these measurements tell you which error occurred.",
                  "Here's a quick cheat sheet of quantum concepts and their probabilistic descriptions:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Quantum Concept</th><th class=\"p-3 border border-cyan/20\">Probabilistic Description</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">State superposition</td><td class=\"p-3 border border-cyan/20\">Distribution of amplitudes |cᵢ|²</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Measurement outcome</td><td class=\"p-3 border border-cyan/20\">Random variable with distribution from Born rule</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Repeated measurements</td><td class=\"p-3 border border-cyan/20\">Sample mean approximates expectation value (CLT)</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Quantum algorithm success</td><td class=\"p-3 border border-cyan/20\">Probability of success — repeat until success</td></tr></tbody></table>",
                  "So why does this matter? Probability isn't just a tool for quantum mechanics — it's the language in which quantum mechanics is written. If you want to understand quantum computing, you need to be comfortable with probability. And the good news is: it's all just counting and percentages, made beautiful with mathematics!"
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Read the probability theory section and understand the axioms of probability",
              "Study the definitions of discrete and continuous random variables",
              "Review the common probability distributions and their properties",
              "Understand the Central Limit Theorem and its significance for quantum experiments",
              "Work through examples of computing expectation values and variances",
              "Attempt the pretest questions to check your understanding",
              "Proceed to the next experiment on classical mechanics and Maxwell's equations"
            ],
            posttest: [],
            references: [
              "Ron Larson, 'Elementary Statistics: Picturing the World', 8th Edition, Pearson, 2023",
              "Erwin Kreyszig, 'Advanced Engineering Mathematics', Wiley India, 10th Edition, 2015"
            ]
          }
        },
        {
          id: "math-w2-2",
          title: "Classical Mechanics, Lagrangian, Hamiltonian, and Maxwell's Equations",
          desc: "Explore the classical physics foundations that led to quantum mechanics — Lagrangian and Hamiltonian mechanics, and Maxwell's equations of electromagnetism.",
          expected: "Students will apply Maxwell's equations to derive wave propagation characteristics and understand the connection between classical and quantum mechanics.",
          content: {
            aim: {
              text: "This experiment covers the classical physics that forms the background for quantum mechanics. Lagrangian and Hamiltonian mechanics provide the mathematical framework for describing physical systems in terms of generalized coordinates and momenta — a framework that naturally extends to quantum mechanics. Maxwell's equations describe the electromagnetic field and provide the basis for understanding light-matter interactions, which are central to quantum optics and quantum computing platforms. By the end of this experiment, you should be able to explain the Lagrangian and Hamiltonian formulations, derive the equations of motion from them, and apply Maxwell's equations to understand electromagnetic wave propagation.",
              bullets: [
                "Understand the Lagrangian formulation of classical mechanics",
                "Derive Euler-Lagrange equations from the principle of least action",
                "Understand the Hamiltonian formulation and Hamilton's equations",
                "State Maxwell's equations and their physical significance",
                "Derive wave propagation from Maxwell's equations in various media"
              ]
            },
            theory: [
              {
                title: "Lagrangian Mechanics — The Principle of Least Action",
                body: [
                  "Imagine rolling a ball down a curved slide. It could take many paths, but nature always picks one. The trick is: nature chooses the path that minimizes something called the 'action' — it's like the universe is a lazy slacker that wants to take the easiest route!",
                  "In math terms, the Lagrangian L is defined as L = T − V, where T is kinetic energy (energy of motion) and V is potential energy (stored energy). The action S = ∫ L dt is what the universe tries to minimize. The fancy word for this is the principle of least action.",
                  "The Euler-Lagrange equation is: d/dt(∂L/∂ẋ) − ∂L/∂x = 0. For L = ½mẋ² − V(x), this gives mẍ = −dV/dx — Newton's second law! So Lagrangian mechanics is just a fancy way of rewriting Newton's laws, but it's more powerful because it works in any coordinate system.",
                  "In quantum mechanics, Feynman's path integral uses the action to sum over all possible paths, with each path weighted by e^(iS/ℏ). This is the quantum version of the principle of least action — instead of just one path, quantum particles take all paths at once!",
                  "So why does this matter? Lagrangian mechanics is the bridge between classical and quantum physics. Understanding it helps you understand why quantum particles behave like waves and why the path integral is so powerful."
                ]
              },
              {
                title: "Hamiltonian Mechanics — The Energy Formulation",
                body: [
                  "Think of Hamiltonian mechanics as a different way of looking at the same physics. Instead of using positions and velocities (like the Lagrangian), it uses positions and momenta (mass × velocity). The Hamiltonian H is just the total energy of the system.",
                  "For a particle in a potential, H = p²/2m + V(q) — kinetic energy plus potential energy. Hamilton's equations are: q̇ = ∂H/∂p, ṗ = −∂H/∂q.",
                  "These equations are perfectly suited for quantum mechanics. In quantum physics, we promote p and q to operators (matrices) that satisfy the commutation relation [q, p] = iℏ. This is the foundation of quantum mechanics!",
                  "The Hamiltonian is the generator of time evolution in quantum mechanics — the Schrödinger equation iℏ∂|ψ⟩/∂t = H|ψ⟩ is the quantum version of Hamilton's equations.",
                  "So why does this matter? The Hamiltonian is the key to understanding how quantum systems evolve over time. If you can write down the Hamiltonian for a system, you can predict its quantum behavior. It's the starting point for solving any quantum problem."
                ]
              },
              {
                title: "Maxwell's Equations — The Foundation of Electromagnetism",
                body: [
                  "Imagine you have a battery, a wire, and a compass. When you connect the battery, current flows through the wire and the compass needle moves. This is electromagnetism in action! Maxwell's equations are the four fundamental laws that describe all of this electric and magnetic behavior.",
                  "The four equations are:",
                  "1. Gauss's Law: ∇·E = ρ/ε₀ — electric charge creates electric fields.",
                  "2. Gauss's Law for Magnetism: ∇·B = 0 — there are no magnetic monopoles (no 'north' without a 'south').",
                  "3. Faraday's Law: ∇×E = −∂B/∂t — changing magnetic fields create electric fields.",
                  "4. Ampère-Maxwell Law: ∇×B = μ₀J + μ₀ε₀∂E/∂t — currents and changing electric fields create magnetic fields.",
                  "The most amazing thing about these equations? They predict waves! Disturbances in the electric and magnetic fields travel at speed c = 1/√(μ₀ε₀) — the speed of light. This is how Maxwell discovered that light is an electromagnetic wave, unifying optics and electromagnetism forever.",
                  "So why does this matter? Maxwell's equations are the foundation of all modern technology — from radio to lasers to quantum computers. Understanding them helps you understand how photons (particles of light) work, and photons are the basis of many quantum computing platforms."
                ]
              },
              {
                title: "Electromagnetic Wave Propagation",
                body: [
                  "From Maxwell's equations, we can derive the wave equation for the electric field: ∇²E = μ₀ε₀ ∂²E/∂t². This is a wave equation with speed c — the speed of light.",
                  "A simple solution is a plane wave: E(r, t) = E₀ cos(k·r − ωt), where k is the wave vector and ω is the angular frequency. The dispersion relation is ω = ck — higher frequency means shorter wavelength.",
                  "![Electromagnetic Wave Propagation](/em_wave_propagation.webp)",
                  "In a medium with dielectric constant ε and permeability μ, the speed is v = 1/√(με) < c. The refractive index n = c/v tells us how much the medium slows light down.",
                  "In conducting media, the wave is attenuated — the amplitude decays exponentially with distance. This is why light doesn't pass through metal walls, but radio waves can (depending on frequency).",
                  "In optical fibers, electromagnetic waves are guided by total internal reflection — the light bounces along the fiber core without escaping. This is the basis of the internet and also the optical systems used in some quantum computing platforms (trapped ions, neutral atoms).",
                  "Quantum electrodynamics (QED) is the quantum version of electromagnetism. In QED, the electromagnetic field is quantized into photons — particles of light. Quantum computing with photons uses this quantization to perform computations.",
                  "So why does this matter? Understanding electromagnetic waves is essential for understanding how quantum computers interact with light. From lasers that trap ions to photons that carry quantum information — it's all electromagnetic waves!"
                ]
              },
              {
                title: "Classical to Quantum — The Transition",
                body: [
                  "So how does classical physics lead to quantum mechanics? Let's trace the path:",
                  "• Quantum mechanics uses the Hamiltonian formalism — states are vectors in Hilbert space, and the Hamiltonian is an operator acting on them.",
                  "• The Schrödinger equation iℏ∂|ψ⟩/∂t = H|ψ⟩ is the quantum version of Hamilton's equations.",
                  "• The electromagnetic field is quantized — photons are the quanta of the field, like packets of light energy.",
                  "• The path integral formulation sums over all classical paths, with quantum interference between them — this is how quantum mechanics recovers classical physics in the limit of large objects.",
                  "• Quantum computing with trapped ions uses lasers (electromagnetic waves) to manipulate qubits — the interaction is described by semiclassical theory where atoms are quantum but the field is classical.",
                  "Here's a quick cheat sheet of classical concepts and their quantum counterparts:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Classical Concept</th><th class=\"p-3 border border-cyan/20\">Quantum Counterpart</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Hamiltonian H</td><td class=\"p-3 border border-cyan/20\">Hamiltonian operator Ĥ</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Position q, momentum p</td><td class=\"p-3 border border-cyan/20\">Operators with [q̂, p̂] = iℏ</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Hamilton's equations</td><td class=\"p-3 border border-cyan/20\">Schrödinger equation</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Electromagnetic wave</td><td class=\"p-3 border border-cyan/20\">Photon</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Action S</td><td class=\"p-3 border border-cyan/20\">Phase e^(iS/ℏ)</td></tr></tbody></table>",
                  "So why does this matter? Understanding the classical-to-quantum transition helps you appreciate why quantum mechanics is the way it is. It's not magic — it's a natural extension of the physics we already know, just with a little bit of math added to handle the weirdness of the quantum world."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Read the Lagrangian mechanics section and understand the principle of least action",
              "Derive the Euler-Lagrange equations and verify they give Newton's laws",
              "Study the Hamiltonian formulation and Hamilton's equations",
              "Read Maxwell's equations and understand their physical meaning",
              "Derive the wave equation from Maxwell's equations and understand wave propagation",
              "Understand the transition from classical to quantum mechanics",
              "Attempt the pretest questions to check your understanding",
              "Proceed to the next unit on computer architecture"
            ],
            posttest: [],
            references: [
              "Herbert Goldstein, 'Classical Mechanics', 3rd Edition, Addison Wesley Publisher, 2001",
              "Griffiths D. J., 'Introduction to Electrodynamics', 4th Edition, Cambridge University Press, 2020",
              "David Morin, 'Introduction to Classical Mechanics', 1st Edition, Cambridge University, 2008",
              "William H. Hayt and John A. Buck, 'Engineering Electromagnetics', 8th Edition, McGraw-Hill Education, 2011"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 3",
      objective: "Computer Architecture — Number Systems, Binary Arithmetic, and Instruction Cycle",
      tutorial: "Tutorial 3: Computer Architecture and Digital Number Representation",
      labTitle: "Lab 3: Computer Architecture",
      experiments: [
        {
          id: "math-w3-1",
          title: "Number Systems, Binary Arithmetic, Signed Representation, and IEEE 754",
          desc: "Master the fundamental number systems and representations that form the basis of all digital computing — binary, octal, hexadecimal, signed representations, and floating-point arithmetic.",
          expected: "Students will convert between number systems, perform binary arithmetic, understand signed number representations, and grasp the basics of IEEE 754 floating-point representation.",
          content: {
            aim: {
              text: "This experiment covers the fundamental number systems and representations used in digital computers. Everything in a computer is represented as binary numbers — from the simplest integer to complex floating-point values. Understanding how numbers are represented, converted, and manipulated is essential for low-level programming, hardware design, and understanding computer architecture. You will learn to convert between binary, octal, decimal, and hexadecimal; perform binary arithmetic; understand signed number representations (sign-magnitude, 1's complement, 2's complement); and grasp the basics of IEEE 754 floating-point representation.",
              bullets: [
                "Convert between binary, octal, decimal, and hexadecimal number systems",
                "Perform binary addition, subtraction, multiplication, and division",
                "Understand signed number representations: sign-magnitude, 1's complement, 2's complement",
                "Represent negative numbers in 2's complement and perform arithmetic",
                "Understand the IEEE 754 floating-point standard for real number representation"
              ]
            },
            theory: [
              {
                title: "Number Systems — The Building Blocks of Digital Computers",
                body: [
                  "Imagine you're driving a car and the odometer clicks over from 999 to 1000. That 'clicking over' is the essence of different number systems — when you run out of digits, you add a new column. Computers use the simplest number system of all: binary, with just two digits (0 and 1).",
                  "The base (radix) of a number system determines how many digits are used. Binary uses 2 digits (0, 1). Octal uses 8 digits (0-7). Decimal uses 10 digits (0-9). Hexadecimal uses 16 digits (0-9, A-F). The fancy word for this is the base of the number system.",
                  "A number in base b is represented as: dₙ₋₁ dₙ₋₂ ... d₁ d₀ (d₀ is the least significant digit). Its value is Σᵢ dᵢ × bⁱ. This is just like decimal, but with a different base!",
                  "![Number Systems Conversion](/math_number_systems.webp)",
                  "Converting between bases:",
                  "• Binary to Decimal: Multiply each bit by 2ⁱ and sum.",
                  "• Decimal to Binary: Repeatedly divide by 2 and record remainders.",
                  "• Binary to Octal: Group bits in threes from right to left.",
                  "• Binary to Hexadecimal: Group bits in fours from right to left.",
                  "Here's a quick cheat sheet comparing the different number systems:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Base</th><th class=\"p-3 border border-cyan/20\">Digits</th><th class=\"p-3 border border-cyan/20\">Example</th><th class=\"p-3 border border-cyan/20\">Uses</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Binary (2)</td><td class=\"p-3 border border-cyan/20\">0,1</td><td class=\"p-3 border border-cyan/20\">1010₂ = 10₁₀</td><td class=\"p-3 border border-cyan/20\">Internal computer representation</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Octal (8)</td><td class=\"p-3 border border-cyan/20\">0-7</td><td class=\"p-3 border border-cyan/20\">12₈ = 10₁₀</td><td class=\"p-3 border border-cyan/20\">UNIX file permissions</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Decimal (10)</td><td class=\"p-3 border border-cyan/20\">0-9</td><td class=\"p-3 border border-cyan/20\">10₁₀</td><td class=\"p-3 border border-cyan/20\">Human-readable representation</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Hexadecimal (16)</td><td class=\"p-3 border border-cyan/20\">0-9, A-F</td><td class=\"p-3 border border-cyan/20\">A₂₁₆ = 10₁₀</td><td class=\"p-3 border border-cyan/20\">Memory addresses, color codes</td></tr></tbody></table>",
                  "So why does this matter? Everything in your computer is binary. Understanding number systems is like learning the alphabet of computing — without it, you can't read or write in the language of digital computers."
                ]
              },
              {
                title: "Binary Arithmetic — Adding and Subtracting in Binary",
                body: [
                  "Binary arithmetic follows the same principles as decimal arithmetic, but with only two digits. It's actually easier because there are fewer rules to memorize!",
                  "Binary Addition Rules:",
                  "0 + 0 = 0 (carry 0)",
                  "0 + 1 = 1 (carry 0)",
                  "1 + 0 = 1 (carry 0)",
                  "1 + 1 = 0 (carry 1)",
                  "1 + 1 + 1 = 1 (carry 1) (when there's a carry-in)",
                  "Example: 1010₂ (10) + 0111₂ (7) = 10001₂ (17). We add digit by digit, carrying when we get a sum of 2 or more.",
                  "Binary Subtraction: Use the borrow method, similar to decimal. But computers usually subtract by adding the 2's complement of the subtrahend — it's faster and simpler!",
                  "Binary Multiplication: Shift-and-add method. Multiply 1011₂ (11) by 1101₂ (13): repeatedly shift the multiplicand left and add to the result when the multiplier bit is 1.",
                  "Binary Division: Long division method, shifting the divisor and subtracting from the dividend.",
                  "So why does this matter? Binary arithmetic is the only arithmetic computers know. If you want to understand how a computer adds two numbers, you need to understand binary addition. It's the foundation of all digital computation."
                ]
              },
              {
                title: "Signed Number Representations — Handling Negative Numbers",
                body: [
                  "Computers need to handle negative numbers too. There are three common ways to do it, each with its own quirks.",
                  "Sign-Magnitude: The most significant bit tells the sign (0 for positive, 1 for negative), and the rest is the magnitude. For n bits, the range is −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1). Example: +5 = 0101, −5 = 1101. Problem: two zeros (+0 and −0) — which is confusing!",
                  "1's Complement: Flip all bits of the positive number. For n bits, range is −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1). Example: +5 = 0101, −5 = 1010. Still has two zeros.",
                  "2's Complement: The most common representation. Take the 1's complement and add 1. For n bits, range is −2ⁿ⁻¹ to +(2ⁿ⁻¹−1). Example: +5 = 0101, −5 = 1011 (4 bits: 0101 → 1010 + 1 = 1011). Only one zero! Addition and subtraction work naturally without special handling.",
                  "2's complement is used in virtually all modern computers. To compute the 2's complement: flip all bits and add 1.",
                  "Here's a quick cheat sheet comparing the three representations:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Representation</th><th class=\"p-3 border border-cyan/20\">+5 (4 bits)</th><th class=\"p-3 border border-cyan/20\">−5 (4 bits)</th><th class=\"p-3 border border-cyan/20\">Zeros</th><th class=\"p-3 border border-cyan/20\">Range (n bits)</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Sign-Magnitude</td><td class=\"p-3 border border-cyan/20\">0101</td><td class=\"p-3 border border-cyan/20\">1101</td><td class=\"p-3 border border-cyan/20\">+0, −0</td><td class=\"p-3 border border-cyan/20\">−(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1)</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">1's Complement</td><td class=\"p-3 border border-cyan/20\">0101</td><td class=\"p-3 border border-cyan/20\">1010</td><td class=\"p-3 border border-cyan/20\">+0, −0</td><td class=\"p-3 border border-cyan/20\">−(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1)</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">2's Complement</td><td class=\"p-3 border border-cyan/20\">0101</td><td class=\"p-3 border border-cyan/20\">1011</td><td class=\"p-3 border border-cyan/20\">One zero</td><td class=\"p-3 border border-cyan/20\">−2ⁿ⁻¹ to +(2ⁿ⁻¹−1)</td></tr></tbody></table>",
                  "So why does this matter? 2's complement is how your computer does subtraction. Understanding it helps you understand how computers handle negative numbers and why certain bugs happen (like integer overflow errors)."
                ]
              },
              {
                title: "IEEE 754 Floating-Point Representation",
                body: [
                  "Integers are easy to represent in binary, but what about real numbers like 3.14159? The IEEE 754 standard defines how floating-point numbers are represented in computers — it's the reason your calculator can display decimals!",
                  "A floating-point number is represented as: sign × mantissa × 2^(exponent − bias). This is like scientific notation (1.5 × 10²), but in binary and with a fixed number of bits.",
                  "Single Precision (32 bits): 1 bit sign, 8 bits exponent, 23 bits mantissa (fraction). Bias = 127. Range: ~10⁻³⁸ to ~10³⁸.",
                  "Double Precision (64 bits): 1 bit sign, 11 bits exponent, 52 bits mantissa. Bias = 1023. Range: ~10⁻³⁰⁸ to ~10³⁰⁸.",
                  "Representation steps:",
                  "1. Convert the number to binary scientific notation: m × 2^e.",
                  "2. Adjust e by adding the bias to get the exponent field.",
                  "3. The mantissa field stores the fractional part (the leading 1 is implicit).",
                  "Special values:",
                  "• 0: exponent = 0, mantissa = 0.",
                  "• Infinity: exponent = all 1s, mantissa = 0.",
                  "• NaN (Not a Number): exponent = all 1s, mantissa ≠ 0.",
                  "• Denormalized numbers: exponent = 0, mantissa ≠ 0 (very small numbers).",
                  "Example: Represent 13.625 in single precision IEEE 754.",
                  "Step 1: 13.625₁₀ = 1101.101₂ = 1.101101 × 2³.",
                  "Step 2: Exponent = 3 + 127 = 130 = 10000010₂.",
                  "Step 3: Mantissa = 10110100000000000000000₂ (implicit 1 dropped).",
                  "Result: 0x415A0000.",
                  "So why does this matter? Every time you use a decimal number in a program, it's being converted to IEEE 754 format. Understanding this helps you understand floating-point errors and why 0.1 + 0.2 ≠ 0.3 in most programming languages!"
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Read the theory on number systems and practice converting between bases",
              "Work through examples of binary addition, subtraction, multiplication, and division",
              "Study the three signed number representations and understand the advantages of 2's complement",
              "Read the IEEE 754 floating-point standard and understand how real numbers are represented",
              "Practice converting numbers to IEEE 754 representation",
              "Attempt the pretest questions to check your understanding",
              "Proceed to the next experiment on computer architecture basics"
            ],
            posttest: [],
            references: [
              "Thomas L. Floyd, 'Digital Fundamentals', 11th Edition, Pearson Publication, 2014",
              "David A. Patterson and John L. Hennessy, 'Computer Organization and Design: The Hardware/Software Interface', 5th Edition, Morgan Kaufmann, 2013"
            ]
          }
        },
        {
          id: "math-w3-2",
          title: "Computer Architecture Basics, Instruction Cycle, and Control Unit",
          desc: "Understand the fundamental architecture of computers — the functional units, datapath, control path, and the instruction cycle that powers all computation.",
          expected: "Students will trace the instruction execution cycle in a microprocessor, including fetch, decode, and execute phases.",
          content: {
            aim: {
              text: "This experiment introduces the fundamental architecture of a computer system. At the heart of every computer is the Central Processing Unit (CPU), which executes instructions fetched from memory. Understanding the instruction cycle — fetch, decode, execute — is essential for appreciating how software controls hardware. You will learn about the functional units of a computer, the datapath and control path, input-output organization, and the detailed steps of instruction execution. By the end of this experiment, you should be able to trace the instruction execution cycle for a simple program and understand the role of the control unit.",
              bullets: [
                "Identify the functional units of a computer system",
                "Understand the datapath and control path in a processor",
                "Trace the instruction cycle: fetch, decode, execute",
                "Understand the role of the control unit in instruction execution",
                "Explain input-output organization and addressing"
              ]
            },
            theory: [
              {
                title: "Computer Architecture — The Big Picture",
                body: [
                  "Imagine a chef following a recipe step by step. The chef is the CPU, the recipe is the program, and the ingredients are the data. The kitchen is the computer system, with different areas for storage (fridge), preparation (counter), and serving (output).",
                  "The von Neumann architecture is the blueprint for most modern computers. It has these key components:",
                  "• CPU (Central Processing Unit): The 'brain' that executes instructions.",
                  "• Memory: Stores data and instructions (the recipe and ingredients).",
                  "• Input/Output (I/O) Devices: Interface with the outside world (the serving area).",
                  "• System Bus: The communication pathway connecting all components.",
                  "The CPU itself consists of:",
                  "• ALU (Arithmetic Logic Unit): Performs math and logic operations.",
                  "• Control Unit: Decodes instructions and controls the flow of data.",
                  "• Registers: Fast, on-chip storage for temporary data.",
                  "• Cache Memory: Fast memory for frequently accessed data.",
                  "![CPU Architecture Diagram](/cpu_internal_architecture.webp)",
                  "The datapath is the collection of components that process data — registers, ALU, buses. The control path directs the datapath — it tells the ALU what operation to perform and controls the flow of data between registers.",
                  "So why does this matter? Understanding computer architecture helps you understand how your code actually runs. It's the bridge between high-level programming languages and the hardware that executes them."
                ]
              },
              {
                title: "The Instruction Cycle — Fetch, Decode, Execute",
                body: [
                  "The CPU repeatedly executes the instruction cycle, like a chef going through a recipe step by step. Each step is a tiny operation that builds up to the whole program.",
                  "1. FETCH: The CPU fetches the next instruction from memory. The Program Counter (PC) holds the address of the next instruction — it's like the chef's place marker in the recipe.",
                  "2. DECODE: The control unit decodes the instruction to figure out what to do. This involves:",
                  "   • Interpreting the opcode (operation code) — what operation to perform.",
                  "   • Determining the addressing mode — where the data is.",
                  "   • Fetching operands from registers or memory.",
                  "3. EXECUTE: The ALU performs the operation (addition, subtraction, comparison, etc.) and the result is stored.",
                  "4. STORE: The result is written back to memory or a register.",
                  "5. UPDATE PC: The Program Counter is incremented to point to the next instruction.",
                  "![Instruction Cycle](/math_instruction_cycle.webp)",
                  "This cycle repeats billions of times per second in modern CPUs. Each phase may take one or more clock cycles, depending on the processor design.",
                  "So why does this matter? The instruction cycle is the heartbeat of your computer. Understanding it helps you understand why programs run faster or slower, and why optimizing code can make a huge difference."
                ]
              },
              {
                title: "Addressing Modes — How Instructions Access Operands",
                body: [
                  "Instructions need to know where to find their data. Addressing modes are the different ways instructions specify where operands are located.",
                  "Immediate: The operand is in the instruction itself. Fastest — no memory access needed.",
                  "Register: The operand is in a register. Very fast — registers are on the CPU.",
                  "Direct: The operand is in memory at a specified address. Requires one memory access.",
                  "Indirect: The instruction gives a memory location that contains the address of the operand. Requires two memory accesses.",
                  "Indexed: The address is computed as base register + offset. Great for arrays.",
                  "Relative: The address is PC + offset. Used for jumps and branches.",
                  "Stack: The operand is on the stack. Used for function calls and local variables.",
                  "So why does this matter? Addressing modes affect how fast your program runs and how much memory it uses. Compilers choose addressing modes automatically, but understanding them helps you write more efficient code."
                ]
              },
              {
                title: "The Control Unit — Directing the Datapath",
                body: [
                  "The control unit is the 'traffic controller' of the CPU. It generates signals that tell the datapath what to do at each step of the instruction cycle.",
                  "Control signals include:",
                  "• ALU operation selection (ADD, SUB, AND, OR, etc.)",
                  "• Register read/write enables",
                  "• Memory read/write signals",
                  "• Bus enable signals",
                  "• PC increment or load signals",
                  "• Branch condition signals",
                  "The control unit can be implemented in two ways:",
                  "Hardwired Control: The control signals are generated by logic gates. Fast but inflexible — the instruction set is fixed.",
                  "Microprogrammed Control: The control signals are generated by a microprogram stored in ROM. Slower but flexible — the instruction set can be changed.",
                  "Modern CPUs use hardwired control for speed, with microcode for complex instructions (like floating-point operations).",
                  "So why does this matter? The control unit is what makes the CPU a CPU — without it, the hardware would just sit there doing nothing. Understanding the control unit helps you understand how instructions are executed at the hardware level."
                ]
              },
              {
                title: "Input-Output Organization and Interfaces",
                body: [
                  "Input-Output (I/O) devices allow the computer to interact with the outside world — keyboard, mouse, display, network, storage, etc.",
                  "I/O can be organized in several ways:",
                  "• Programmed I/O: The CPU executes instructions to transfer data. The CPU is busy while the I/O happens.",
                  "• Interrupt-Driven I/O: The I/O device interrupts the CPU when it's ready. The CPU can do other work while waiting for I/O.",
                  "• Direct Memory Access (DMA): The I/O device transfers data directly to/from memory without CPU involvement.",
                  "• Memory-Mapped I/O: I/O devices appear as memory locations.",
                  "• Port-Mapped I/O: I/O devices have separate address space.",
                  "Modern computers use a combination of these methods. Interrupts and DMA allow the CPU to focus on computation while I/O happens in the background.",
                  "Here's a quick cheat sheet of computer components and their functions:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Component</th><th class=\"p-3 border border-cyan/20\">Function</th><th class=\"p-3 border border-cyan/20\">Key Characteristic</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">ALU</td><td class=\"p-3 border border-cyan/20\">Performs arithmetic/logic operations</td><td class=\"p-3 border border-cyan/20\">Operates on register data</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Control Unit</td><td class=\"p-3 border border-cyan/20\">Generates control signals</td><td class=\"p-3 border border-cyan/20\">Hardwired or microprogrammed</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Registers</td><td class=\"p-3 border border-cyan/20\">Fast temporary storage</td><td class=\"p-3 border border-cyan/20\">General-purpose or special-purpose</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">PC</td><td class=\"p-3 border border-cyan/20\">Program Counter</td><td class=\"p-3 border border-cyan/20\">Points to next instruction</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">IR</td><td class=\"p-3 border border-cyan/20\">Instruction Register</td><td class=\"p-3 border border-cyan/20\">Holds current instruction</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Bus</td><td class=\"p-3 border border-cyan/20\">Communication pathway</td><td class=\"p-3 border border-cyan/20\">Address, data, control buses</td></tr></tbody></table>",
                  "So why does this matter? I/O is how computers interact with the world. Understanding I/O helps you understand how your computer communicates with all the devices connected to it."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Read the theory on computer architecture and the von Neumann model",
              "Study the functional units of a computer and their interconnections",
              "Understand the instruction cycle: fetch, decode, execute phases",
              "Review the different addressing modes and their use cases",
              "Study the role of the control unit in generating control signals",
              "Understand input-output organization and how I/O devices interact with the CPU",
              "Attempt the pretest questions to check your understanding",
              "Proceed to the next unit on microprocessors and memory"
            ],
            posttest: [],
            references: [
              "David A. Patterson and John L. Hennessy, 'Computer Organization and Design: The Hardware/Software Interface', 5th Edition, Morgan Kaufmann, 2013",
              "Thomas L. Floyd, 'Digital Fundamentals', 11th Edition, Pearson Publication, 2014"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 4",
      objective: "Microprocessors and Memory Hierarchy",
      tutorial: "Tutorial 4: Microprocessor Evolution and Memory Systems",
      labTitle: "Lab 4: Microprocessors and Memory",
      experiments: [
        {
          id: "math-w4-1",
          title: "Microprocessor Evolution, CPU Architecture, and Addressing Modes",
          desc: "Trace the evolution of microprocessors from 8085 to ARM, understand CPU internal architecture, and explore instruction formats and addressing modes.",
          expected: "Students will understand microprocessor evolution, CPU architecture, addressing modes, and interpret simple assembly programs.",
          content: {
            aim: {
              text: "This experiment explores the evolution and architecture of microprocessors — the central processing units that power modern computing. From the early 8085 to the ubiquitous ARM processors in smartphones, microprocessors have evolved dramatically in complexity and capability. You will learn about CPU internal architecture (ALU, registers, buses), addressing modes, instruction formats, and how instructions are executed. You will also interpret simple assembly programs to see how high-level code translates to machine instructions.",
              bullets: [
                "Trace the evolution of microprocessors from 8085 to modern ARM",
                "Understand CPU internal architecture: ALU, registers, buses",
                "Identify different addressing modes and instruction formats",
                "Explain instruction execution and timing",
                "Interpret simple assembly language programs"
              ]
            },
            theory: [
              {
                title: "Microprocessor Evolution — From 4-Bit to 64-Bit",
                body: [
                  "Imagine upgrading from a tricycle to a bicycle to a motorcycle to a sports car. That's the story of microprocessors! They started simple and have become incredibly powerful over the decades.",
                  "Intel 4004 (1971): The first commercial microprocessor. 4-bit, 2,300 transistors, 740 kHz. It was like a tricycle — it could only add and subtract 4-bit numbers. Used in calculators.",
                  "Intel 8085 (1976): 8-bit, 6,500 transistors, 3-5 MHz. 16-bit address bus (64 KB memory). It was like a bicycle — more capable than the 4004, but still simple.",
                  "Intel 8086 (1978): 16-bit, 29,000 transistors, 5-10 MHz. 20-bit address bus (1 MB memory). Introduced the x86 architecture that still dominates desktops and laptops today.",
                  "Intel 80386 (1985): 32-bit, 275,000 transistors, 16-33 MHz. 32-bit address bus (4 GB memory). Supported virtual memory and paging.",
                  "Pentium (1993): 32-bit, 3.1 million transistors, 60-200 MHz. Superscalar architecture (multiple instructions per cycle).",
                  "ARM (1985): 32-bit RISC processor. Low power consumption. Now dominates mobile and embedded markets (over 200 billion ARM chips sold!).",
                  "Modern processors (2020+): 64-bit, billions of transistors, 3-5 GHz, multiple cores (8-64 cores), advanced features like vector processing, hardware virtualization, AI acceleration.",
                  "So why does this matter? Understanding microprocessor evolution helps you appreciate why our computers are so powerful today — and where they might be going next."
                ]
              },
              {
                title: "CPU Internal Architecture — The Anatomy of a Processor",
                body: [
                  "Let's look inside a modern CPU to see what makes it tick.",
                  "ALU (Arithmetic Logic Unit): Performs arithmetic operations (addition, subtraction, multiplication, division) and logical operations (AND, OR, NOT, XOR). In modern CPUs, the ALU is pipelined and can handle multiple operations simultaneously.",
                  "Registers: Fast on-chip storage. General-purpose registers hold data for ALU operations. Special-purpose registers include:",
                  "   • PC (Program Counter): Address of next instruction.",
                  "   • IR (Instruction Register): Current instruction being executed.",
                  "   • SP (Stack Pointer): Points to top of stack.",
                  "   • Flags/Status Register: Stores condition flags (zero, carry, overflow, sign).",
                  "Buses: Internal communication pathways.",
                  "   • Data Bus: Transfers data between CPU and memory/I/O.",
                  "   • Address Bus: Carries memory addresses from CPU.",
                  "   • Control Bus: Carries control signals (read, write, interrupt, etc.).",
                  "Instruction Decoder: Translates machine instructions into control signals.",
                  "Pipeline: Allows multiple instructions to be in different stages simultaneously. A 5-stage pipeline includes: Fetch, Decode, Execute, Memory Access, Write Back.",
                  "Modern CPUs also include:",
                  "   • Cache memory (L1, L2, L3)",
                  "   • Branch prediction unit (predicts which way branches will go)",
                  "   • Out-of-order execution engine (executes instructions as operands become available)",
                  "   • Vector units (SIMD extensions like SSE, AVX)",
                  "So why does this matter? Understanding CPU architecture helps you understand why some programs run fast and others run slow. It's the foundation of performance optimization."
                ]
              },
              {
                title: "Addressing Modes and Instruction Formats",
                body: [
                  "An instruction tells the CPU what to do and where to find the data. The addressing mode specifies how the operands are found.",
                  "Common addressing modes:",
                  "• Immediate: The operand is in the instruction. Fastest.",
                  "• Register: The operand is in a register. Very fast.",
                  "• Direct: The operand is at a memory address specified in the instruction.",
                  "• Indirect: The instruction contains the address of the address where the operand is.",
                  "• Register Indirect: The operand is at the memory address contained in a register.",
                  "• Indexed/Base: The address is base register + offset.",
                  "• Relative: The address is PC + offset.",
                  "Instruction formats vary by architecture:",
                  "• CISC (Complex Instruction Set) processors like x86 have variable-length instructions (1-15 bytes) and many addressing modes.",
                  "• RISC (Reduced Instruction Set) processors like ARM have fixed-length instructions (4 bytes) and a limited set of addressing modes.",
                  "A typical instruction format includes:",
                  "• Opcode: What operation to perform.",
                  "• Operand field(s): Where the data is.",
                  "• Addressing mode field: How to interpret the operand fields.",
                  "So why does this matter? Addressing modes affect how your code is compiled and how fast it runs. Understanding them helps you write more efficient programs."
                ]
              },
              {
                title: "Assembly Language Programming",
                body: [
                  "Assembly language is human-readable machine code. Each assembly instruction corresponds to one machine instruction.",
                  "A simple x86 assembly program (for Intel 8086):",
                  "MOV AX, 5      ; Load 5 into AX register",
                  "MOV BX, 10     ; Load 10 into BX register",
                  "ADD AX, BX     ; AX = AX + BX = 15",
                  "MOV [1000], AX ; Store result at memory address 1000",
                  "A simple ARM assembly program:",
                  "MOV R0, #5     ; Load 5 into R0",
                  "MOV R1, #10    ; Load 10 into R1",
                  "ADD R0, R1     ; R0 = R0 + R1 = 15",
                  "STR R0, [R2]   ; Store R0 at address in R2",
                  "The assembly process:",
                  "1. Source code written in assembly language.",
                  "2. Assembler converts to machine code (binary instructions).",
                  "3. Linker combines object files into executable.",
                  "4. Loader loads executable into memory for execution.",
                  "Here's a quick cheat sheet comparing different architectures:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Architecture</th><th class=\"p-3 border border-cyan/20\">Instruction Set</th><th class=\"p-3 border border-cyan/20\">Register Count</th><th class=\"p-3 border border-cyan/20\">Typical Use</th><th class=\"p-3 border border-cyan/20\">Key Feature</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">8085</td><td class=\"p-3 border border-cyan/20\">CISC</td><td class=\"p-3 border border-cyan/20\">6 GPRs</td><td class=\"p-3 border border-cyan/20\">Early PCs</td><td class=\"p-3 border border-cyan/20\">8-bit, 16-bit address bus</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">8086</td><td class=\"p-3 border border-cyan/20\">CISC</td><td class=\"p-3 border border-cyan/20\">8 GPRs</td><td class=\"p-3 border border-cyan/20\">x86 family</td><td class=\"p-3 border border-cyan/20\">16-bit, 20-bit address bus</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Pentium</td><td class=\"p-3 border border-cyan/20\">CISC</td><td class=\"p-3 border border-cyan/20\">8 GPRs</td><td class=\"p-3 border border-cyan/20\">90s PCs</td><td class=\"p-3 border border-cyan/20\">Superscalar, pipeline</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">ARM</td><td class=\"p-3 border border-cyan/20\">RISC</td><td class=\"p-3 border border-cyan/20\">16-32 GPRs</td><td class=\"p-3 border border-cyan/20\">Mobile, embedded</td><td class=\"p-3 border border-cyan/20\">Low power, 32/64-bit</td></tr></tbody></table>",
                  "So why does this matter? Assembly language is the closest you can get to the hardware. Understanding it helps you understand what high-level code actually does when it runs."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Read the theory on microprocessor evolution and understand the key milestones",
              "Study the CPU internal architecture and the function of each component",
              "Review the different addressing modes and instruction formats",
              "Work through examples of assembly language programs and understand each instruction",
              "Trace the execution of a simple program through the instruction cycle",
              "Attempt the pretest questions to check your understanding",
              "Proceed to the next experiment on memory hierarchy"
            ],
            posttest: [],
            references: [
              "David A. Patterson and John L. Hennessy, 'Computer Organization and Design: The Hardware/Software Interface', 5th Edition, Morgan Kaufmann, 2013",
              "Thomas L. Floyd, 'Digital Fundamentals', 11th Edition, Pearson Publication, 2014"
            ]
          }
        },
        {
          id: "math-w4-2",
          title: "Memory Hierarchy, Cache, Virtual Memory, and Secondary Storage",
          desc: "Understand the memory hierarchy — from fast, expensive registers to slow, cheap secondary storage — and how it impacts system performance.",
          expected: "Students will explain the role of memory hierarchy in system performance, understand cache mapping and replacement policies, and grasp virtual memory concepts.",
          content: {
            aim: {
              text: "This experiment covers the memory hierarchy that powers modern computer systems. Memory is not monolithic — it consists of multiple levels, each with different speed, capacity, and cost characteristics. Understanding this hierarchy is essential for optimizing system performance. You will learn about cache memory (mapping techniques and replacement policies), main memory (RAM, ROM, DRAM, SRAM), virtual memory (paging and segmentation), and secondary storage. By the end of this experiment, you should be able to explain why memory hierarchy is necessary and how each level contributes to system performance.",
              bullets: [
                "Understand the need for memory hierarchy in computer systems",
                "Explain cache memory: mapping techniques and replacement policies",
                "Differentiate between main memory types: RAM, ROM, DRAM, SRAM",
                "Understand virtual memory: paging and segmentation",
                "Describe secondary storage and its role in the hierarchy"
              ]
            },
            theory: [
              {
                title: "Memory Hierarchy — Speed vs. Capacity vs. Cost",
                body: [
                  "Imagine a kitchen with different storage areas. You have a counter for things you're using right now (fast but limited space), a fridge for things you'll use soon (more space but slower), a pantry for bulk items (even more space, even slower), and a warehouse for long-term storage (huge but very slow). That's exactly how computer memory works!",
                  "![Memory Hierarchy Pyramid](/memory_hierarchy_pyramid.webp)",
                  "At the top of the hierarchy (fastest, smallest, most expensive):",
                  "• Registers: Inside the CPU, accessed in 0.3-0.5 ns. Holds data being actively processed.",
                  "• L1 Cache: 32-64 KB per core, accessed in 1-2 ns. Split into instruction and data caches.",
                  "• L2 Cache: 256-512 KB per core, accessed in 3-5 ns. Unified (both instructions and data).",
                  "• L3 Cache: 4-32 MB shared, accessed in 10-20 ns. Shared among all cores.",
                  "• Main Memory (RAM): 8-128 GB, accessed in 50-100 ns. DRAM technology.",
                  "• Secondary Storage: 256 GB - 2 TB, accessed in 5-10 ms (SSD) or 10-20 ms (HDD).",
                  "The hierarchy works because of locality: programs tend to access the same data repeatedly (temporal locality) and data that's nearby in memory (spatial locality).",
                  "So why does this matter? Without memory hierarchy, your computer would be either impossibly expensive or impossibly slow. Understanding it helps you understand why computers are designed the way they are."
                ]
              },
              {
                title: "Cache Memory — The Speed Booster",
                body: [
                  "Cache memory is like a small, fast counter right next to the chef. It stores the most frequently used ingredients so the chef doesn't have to go to the fridge all the time.",
                  "Cache Mapping Techniques: How to decide where a memory block goes in the cache.",
                  "• Direct Mapping: Each memory block maps to exactly one cache location. Simple but inflexible.",
                  "• Fully Associative Mapping: Any memory block can go anywhere in the cache. Flexible but expensive hardware.",
                  "• Set-Associative Mapping: Compromise between direct and fully associative. The cache is divided into sets, and each memory block maps to a specific set but can go anywhere within that set.",
                  "Cache Replacement Policies: When the cache is full and you need to bring in a new block, which block do you remove?",
                  "• LRU (Least Recently Used): Remove the block that hasn't been used for the longest time.",
                  "• FIFO (First In, First Out): Remove the oldest block.",
                  "• Random: Remove a random block (surprisingly effective!).",
                  "• LFU (Least Frequently Used): Remove the block with the fewest accesses.",
                  "So why does this matter? Cache memory is why your computer feels snappy. Without it, your CPU would spend most of its time waiting for memory — and everything would be painfully slow."
                ]
              },
              {
                title: "Main Memory — RAM and ROM",
                body: [
                  "Main memory holds the operating system, running programs, and data currently in use.",
                  "RAM (Random Access Memory): Read-write memory. Loses data when power is off (volatile).",
                  "   • SRAM (Static RAM): Uses flip-flops. Fast (10-20 ns), expensive, used for cache.",
                  "   • DRAM (Dynamic RAM): Uses capacitors. Slower (50-100 ns), cheap, used for main memory.",
                  "   • SDRAM (Synchronous DRAM): Synchronized with CPU clock. Faster than DRAM.",
                  "   • DDR SDRAM (Double Data Rate SDRAM): Transfers data on both clock edges.",
                  "ROM (Read-Only Memory): Non-volatile memory.",
                  "   • Mask ROM: Factory-programmed, cannot be changed.",
                  "   • PROM: Can be programmed once.",
                  "   • EPROM: Can be erased with UV light.",
                  "   • EEPROM: Can be erased and reprogrammed electrically.",
                  "   • Flash Memory: Type of EEPROM used in SSDs, USB drives.",
                  "So why does this matter? RAM is where your programs run. Understanding the different types helps you understand why your computer has so much RAM and why it's important for performance."
                ]
              },
              {
                title: "Virtual Memory — The Illusion of Infinite Memory",
                body: [
                  "Virtual memory makes each program think it has the entire computer's memory to itself. It's like a magician making an elephant disappear — the program sees a huge, continuous memory space, but behind the scenes, it's fragmented and shared.",
                  "Paging: The most common implementation.",
                  "• Physical memory is divided into fixed-size frames (e.g., 4 KB).",
                  "• Virtual memory is divided into pages of the same size.",
                  "• A page table maps virtual pages to physical frames.",
                  "• When a program accesses a virtual address, the MMU translates it to a physical address.",
                  "• If a page is not in physical memory, a page fault occurs — the OS brings it from secondary storage.",
                  "Segmentation: Divides memory into variable-sized segments (code, data, stack, heap).",
                  "   • Each segment has a base address and length.",
                  "   • A segment table maps segments to physical memory.",
                  "Translation Lookaside Buffer (TLB): A small, fast cache for page table entries.",
                  "So why does this matter? Virtual memory is why you can run multiple programs at once without them crashing into each other. It's the foundation of modern multitasking."
                ]
              },
              {
                title: "Secondary Storage and I/O Performance",
                body: [
                  "Secondary storage provides long-term, non-volatile storage for data and programs.",
                  "HDD (Hard Disk Drive): Magnetic storage with spinning disks and read/write heads.",
                  "   • Capacity: 1-20 TB.",
                  "   • Access time: 8-15 ms.",
                  "   • Sequential read: 100-200 MB/s.",
                  "SSD (Solid State Drive): Uses NAND flash memory. No moving parts.",
                  "   • Capacity: 256 GB - 8 TB.",
                  "   • Access time: 0.1-0.2 ms.",
                  "   • Sequential read: 500-7000 MB/s.",
                  "NVMe (Non-Volatile Memory Express): Very fast interface for SSDs.",
                  "The performance gap between memory levels is huge:",
                  "• CPU: 0.3 ns per instruction.",
                  "• Cache: 1-20 ns.",
                  "• Main memory: 50-100 ns.",
                  "• SSD: 0.1 ms (100,000 ns).",
                  "• HDD: 10 ms (10,000,000 ns).",
                  "Here's a quick cheat sheet comparing memory levels:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Level</th><th class=\"p-3 border border-cyan/20\">Speed</th><th class=\"p-3 border border-cyan/20\">Size</th><th class=\"p-3 border border-cyan/20\">Technology</th><th class=\"p-3 border border-cyan/20\">Volatile?</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Registers</td><td class=\"p-3 border border-cyan/20\">0.3 ns</td><td class=\"p-3 border border-cyan/20\">~100 B</td><td class=\"p-3 border border-cyan/20\">Flip-flops</td><td class=\"p-3 border border-cyan/20\">Yes</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">L1 Cache</td><td class=\"p-3 border border-cyan/20\">1-2 ns</td><td class=\"p-3 border border-cyan/20\">32-64 KB</td><td class=\"p-3 border border-cyan/20\">SRAM</td><td class=\"p-3 border border-cyan/20\">Yes</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">L2 Cache</td><td class=\"p-3 border border-cyan/20\">3-5 ns</td><td class=\"p-3 border border-cyan/20\">256-512 KB</td><td class=\"p-3 border border-cyan/20\">SRAM</td><td class=\"p-3 border border-cyan/20\">Yes</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">L3 Cache</td><td class=\"p-3 border border-cyan/20\">10-20 ns</td><td class=\"p-3 border border-cyan/20\">4-32 MB</td><td class=\"p-3 border border-cyan/20\">SRAM</td><td class=\"p-3 border border-cyan/20\">Yes</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Main Memory</td><td class=\"p-3 border border-cyan/20\">50-100 ns</td><td class=\"p-3 border border-cyan/20\">8-128 GB</td><td class=\"p-3 border border-cyan/20\">DRAM</td><td class=\"p-3 border border-cyan/20\">Yes</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">SSD</td><td class=\"p-3 border border-cyan/20\">0.1 ms</td><td class=\"p-3 border border-cyan/20\">256 GB-8 TB</td><td class=\"p-3 border border-cyan/20\">Flash</td><td class=\"p-3 border border-cyan/20\">No</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">HDD</td><td class=\"p-3 border border-cyan/20\">10-15 ms</td><td class=\"p-3 border border-cyan/20\">1-20 TB</td><td class=\"p-3 border border-cyan/20\">Magnetic</td><td class=\"p-3 border border-cyan/20\">No</td></tr></tbody></table>",
                  "So why does this matter? The memory hierarchy is why your computer can have huge storage but still run fast. Understanding it helps you appreciate the engineering that makes modern computers possible."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Read the theory on memory hierarchy and understand the trade-offs",
              "Study cache memory: mapping techniques and replacement policies",
              "Understand the different types of main memory (RAM, ROM, DRAM, SRAM)",
              "Read about virtual memory: paging, segmentation, and page tables",
              "Understand the role of secondary storage in the hierarchy",
              "Compare the performance characteristics of different memory levels",
              "Attempt the pretest questions to check your understanding",
              "Proceed to the next unit on digital logic and combinational circuits"
            ],
            posttest: [],
            references: [
              "David A. Patterson and John L. Hennessy, 'Computer Organization and Design: The Hardware/Software Interface', 5th Edition, Morgan Kaufmann, 2013",
              "Thomas L. Floyd, 'Digital Fundamentals', 11th Edition, Pearson Publication, 2014"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 5",
      objective: "Digital Logic, Boolean Algebra, and Combinational Circuits",
      tutorial: "Tutorial 5: Digital Logic and Combinational Circuit Design",
      labTitle: "Lab 5: Digital Logic and Combinational Circuits",
      experiments: [
        {
          id: "math-w5-1",
          title: "Logic Gates, Boolean Algebra, and Karnaugh Maps",
          desc: "Master the fundamentals of digital logic — logic gates, Boolean algebra, and Karnaugh map simplification — the building blocks of all digital circuits.",
          expected: "Students will design optimized combinational circuits using Boolean algebra and Karnaugh map simplification.",
          content: {
            aim: {
              text: "This experiment covers the foundations of digital logic — the mathematics and circuits that underpin all digital systems. You will learn about basic logic gates (AND, OR, NOT), universal gates (NAND, NOR), and special gates (XOR, XNOR). You will study Boolean algebra — the mathematical system for analyzing and simplifying logic circuits. Finally, you will learn Karnaugh maps — a visual method for simplifying Boolean expressions and designing efficient combinational circuits. By the end of this experiment, you should be able to simplify Boolean expressions using algebraic manipulation and Karnaugh maps, and implement logic functions using basic gates.",
              bullets: [
                "Understand basic logic gates: AND, OR, NOT, NAND, NOR, XOR, XNOR",
                "Apply Boolean algebra postulates and theorems for simplification",
                "Write Boolean expressions in canonical forms: SOP and POS",
                "Use Karnaugh maps for 2, 3, and 4 variable simplification",
                "Design combinational circuits using simplified Boolean expressions"
              ]
            },
            theory: [
              {
                title: "Logic Gates — The Building Blocks of Digital Circuits",
                body: [
                  "Imagine a set of light switches that control other light switches. You can connect switches so that the light turns on only if certain switches are on (AND), or if any switch is on (OR), or the opposite of what you'd expect (NOT). These are logic gates — the fundamental building blocks of all digital circuits!",
                  "Basic Gates:",
                  "• AND Gate: Output is 1 only if ALL inputs are 1. Like a series circuit — both switches must be on.",
                  "• OR Gate: Output is 1 if ANY input is 1. Like a parallel circuit — either switch turns on the light.",
                  "• NOT Gate (Inverter): Output is the opposite of input. Like a switch that's always opposite.",
                  "Universal Gates (can implement any Boolean function):",
                  "• NAND Gate: NOT AND. Output is 0 only if ALL inputs are 1.",
                  "• NOR Gate: NOT OR. Output is 1 only if ALL inputs are 0.",
                  "Special Gates:",
                  "• XOR Gate (Exclusive OR): Output is 1 if inputs are DIFFERENT.",
                  "• XNOR Gate (Exclusive NOR): Output is 1 if inputs are SAME.",
                  "![Logic Gates Truth Table](/logic_gates_symbols.webp)",
                  "Logic gates are implemented using transistors. CMOS (Complementary Metal-Oxide-Semiconductor) is the dominant technology.",
                  "So why does this matter? Logic gates are the atoms of digital circuits. Every computer, smartphone, and digital device is built from these basic building blocks."
                ]
              },
              {
                title: "Boolean Algebra — The Mathematics of Logic",
                body: [
                  "Boolean algebra is the math of true/false, on/off, 1/0. It provides the rules for simplifying logic circuits.",
                  "Fundamental Postulates:",
                  "• Identity: x + 0 = x, x · 1 = x",
                  "• Null: x + 1 = 1, x · 0 = 0",
                  "• Idempotent: x + x = x, x · x = x",
                  "• Involution: ¬(¬x) = x",
                  "• Complement: x + ¬x = 1, x · ¬x = 0",
                  "• Commutative: x + y = y + x, x · y = y · x",
                  "• Associative: (x+y)+z = x+(y+z), (x·y)·z = x·(y·z)",
                  "• Distributive: x·(y+z) = x·y + x·z, x + y·z = (x+y)·(x+z)",
                  "• De Morgan's Laws: ¬(x·y) = ¬x + ¬y, ¬(x+y) = ¬x · ¬y",
                  "• Absorption: x + x·y = x, x·(x+y) = x",
                  "Canonical Forms:",
                  "• SOP (Sum of Products): OR of AND terms (minterms).",
                  "• POS (Product of Sums): AND of OR terms (maxterms).",
                  "Minterm: A product term where every variable appears exactly once (complemented or uncomplemented).",
                  "Maxterm: A sum term where every variable appears exactly once.",
                  "So why does this matter? Boolean algebra is how we design and simplify digital circuits. Without it, we'd have to design circuits by trial and error!"
                ]
              },
              {
                title: "Karnaugh Maps — Visual Boolean Simplification",
                body: [
                  "Karnaugh maps (K-maps) are like a crossword puzzle for simplifying logic. They provide a visual way to find the simplest expression for a Boolean function.",
                  "![Karnaugh Map Example](/karnaugh_map_example.webp)",
                  "A K-map is a grid where:",
                  "• Each cell represents a minterm of the function.",
                  "• Adjacent cells differ in exactly one variable (Gray code order).",
                  "• Groups of 1s (powers of 2: 1, 2, 4, 8, 16) can be combined to eliminate variables.",
                  "2-Variable K-map: 2×2 grid. Adjacent cells differ in one variable.",
                  "3-Variable K-map: 2×4 grid.",
                  "4-Variable K-map: 4×4 grid.",
                  "Simplification Steps:",
                  "1. Draw the K-map and fill in 1s from the truth table.",
                  "2. Identify groups of 1s that are powers of 2.",
                  "3. Groups should be as large as possible.",
                  "4. Each group corresponds to a product term (AND).",
                  "5. The simplified expression is the OR (sum) of all product terms.",
                  "Example: Simplify F(A,B,C) = Σm(1,3,5,7).",
                  "K-map has 1s at positions 1,3,5,7. These form one group of 4 → term = C. Simplified: F = C.",
                  "So why does this matter? K-maps are a quick, visual way to simplify circuits. They're the designer's secret weapon for creating efficient, cost-effective digital circuits."
                ]
              },
              {
                title: "Design Example — Simplifying a 4-Variable Function",
                body: [
                  "Let's work through a complete example to see how K-maps work in practice.",
                  "Simplify F(A,B,C,D) = Σm(0,1,2,4,5,6,8,9,10,12,13,14).",
                  "Step 1: Draw a 4-variable K-map (16 cells with rows AB = 00,01,11,10 and columns CD = 00,01,11,10).",
                  "Step 2: Fill 1s at the specified minterm positions.",
                  "Step 3: Identify groups:",
                  "   • Group 1: Cells 0,1,4,5 (a 2×2 block) → term = ¬A·¬B",
                  "   • Group 2: Cells 0,2,8,10 (a 2×2 block) → term = ¬B·¬C",
                  "   • Group 3: Cells 4,6,12,14 (a 2×2 block) → term = B·¬C",
                  "Step 4: Simplified expression: F = ¬B + ¬C·D (after combining redundant terms).",
                  "The simplified expression uses fewer gates, reducing cost, power, and propagation delay.",
                  "So why does this matter? This is how real digital circuits are designed. Engineers use K-maps to create circuits that are small, fast, and inexpensive."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Read the theory on logic gates and understand the truth tables for each gate",
              "Study Boolean algebra postulates and theorems",
              "Practice simplifying Boolean expressions using algebraic manipulation",
              "Learn to draw and use Karnaugh maps for 2, 3, and 4 variables",
              "Work through examples of K-map simplification",
              "Understand canonical forms: SOP and POS",
              "Attempt the pretest questions to check your understanding",
              "Proceed to the next experiment on combinational circuits"
            ],
            posttest: [],
            references: [
              "Thomas L. Floyd, 'Digital Fundamentals', 11th Edition, Pearson Publication, 2014",
              "David A. Patterson and John L. Hennessy, 'Computer Organization and Design: The Hardware/Software Interface', 5th Edition, Morgan Kaufmann, 2013"
            ]
          }
        },
        {
          id: "math-w5-2",
          title: "Combinational Circuits — Adders, Multiplexers, Encoders, and Decoders",
          desc: "Design and analyze combinational circuits — adders, subtractors, multiplexers, demultiplexers, encoders, decoders — the workhorses of digital computing.",
          expected: "Students will design optimized combinational circuits such as adders, multiplexers, and code converters using Boolean algebra and Karnaugh map simplification.",
          content: {
            aim: {
              text: "This experiment applies Boolean algebra and Karnaugh map simplification to design practical combinational circuits. You will learn to design adders and subtractors (the core of arithmetic circuits), multiplexers and demultiplexers (data selectors), and encoders and decoders (for data conversion and addressing). These circuits are the building blocks of all digital systems — from simple calculators to complex microprocessors. By the end of this experiment, you should be able to design combinational circuits using logic gates, analyze their behavior, and optimize them for performance and cost.",
              bullets: [
                "Design half adders and full adders for binary addition",
                "Design half subtractors and full subtractors for binary subtraction",
                "Understand multiplexers and demultiplexers and their applications",
                "Design encoders and decoders for data conversion",
                "Apply Boolean algebra and K-maps to optimize combinational circuits"
              ]
            },
            theory: [
              {
                title: "Adders — The Core of Arithmetic Circuits",
                body: [
                  "Imagine a vending machine that combines your button presses to give the right snack. You press buttons for the row and column, and the machine figures out which snack to drop. Adders work the same way — they combine bits to produce sums!",
                  "Half Adder: Adds two 1-bit numbers A and B.",
                  "   • Sum (S) = A ⊕ B (XOR)",
                  "   • Carry (C) = A · B (AND)",
                  "   • Truth table: 0+0=00, 0+1=01, 1+0=01, 1+1=10.",
                  "Full Adder: Adds A, B, and a carry-in C_in.",
                  "   • Sum (S) = A ⊕ B ⊕ C_in",
                  "   • Carry-out (C_out) = A·B + C_in·(A ⊕ B)",
                  "   • Can be built from two half adders and an OR gate.",
                  "![Full Adder Circuit](/math_full_adder.webp)",
                  "Ripple Carry Adder: Cascaded full adders. The carry ripples from LSB to MSB. Simple but slow.",
                  "Look-Ahead Carry Adder: All carries computed in parallel. Faster but more complex.",
                  "So why does this matter? Addition is the foundation of all arithmetic in computers. Every time your computer does math, it's using adders like these!"
                ]
              },
              {
                title: "Subtractors — Binary Subtraction",
                body: [
                  "Subtraction is just addition with a twist: A − B = A + (−B). The −B is the 2's complement of B.",
                  "Half Subtractor: Subtracts B from A.",
                  "   • Difference (D) = A ⊕ B (XOR)",
                  "   • Borrow (B_out) = ¬A · B",
                  "Full Subtractor: Subtracts B from A with a borrow-in.",
                  "   • Difference (D) = A ⊕ B ⊕ B_in",
                  "   • Borrow-out (B_out) = ¬A·B + B_in·(A ⊕ B)",
                  "In practice, computers use an adder for subtraction by taking the 2's complement.",
                  "So why does this matter? Subtraction is essential for many operations, from comparing numbers to computing differences. Understanding how it works helps you understand computer arithmetic."
                ]
              },
              {
                title: "Multiplexers and Demultiplexers — Data Selectors and Distributors",
                body: [
                  "Multiplexer (MUX): A data selector. It chooses one of many inputs and routes it to the output.",
                  "• n selection lines select one of 2ⁿ inputs.",
                  "• 2:1 MUX: 2 inputs, 1 selection line.",
                  "• 4:1 MUX: 4 inputs, 2 selection lines.",
                  "• MUX can implement any Boolean function.",
                  "Demultiplexer (DEMUX): A data distributor. It routes one input to one of many outputs.",
                  "• 1:2 DEMUX: 1 input, 1 selection line.",
                  "• 1:4 DEMUX: 1 input, 2 selection lines.",
                  "Applications:",
                  "• Communication switching",
                  "• Data routing in processors",
                  "• Implementing Boolean functions",
                  "• Memory addressing",
                  "So why does this matter? MUXes and DEMUXes are everywhere in digital systems — from phone networks to the control unit of your CPU."
                ]
              },
              {
                title: "Encoders and Decoders — Code Converters",
                body: [
                  "Encoders: Convert multiple inputs into a coded output.",
                  "• Priority Encoder: Outputs the binary code of the highest-priority active input.",
                  "• 8:3 Encoder: 8 inputs, 3-bit output.",
                  "• Used in interrupt handling, keyboard encoding.",
                  "Decoders: Convert binary codes into one-hot outputs.",
                  "• 3:8 Decoder: 3-bit input, 8 outputs.",
                  "• 2:4 Decoder: 2-bit input, 4 outputs.",
                  "• Used in memory addressing, display drivers.",
                  "Binary to Gray Code Converter: Only one bit changes between consecutive values.",
                  "• Used in position encoders, Karnaugh maps.",
                  "Seven-Segment Display Decoder: Converts BCD to seven-segment signals.",
                  "• Used in digital clocks, calculators.",
                  "Here's a quick cheat sheet comparing combinational circuits:",
                  "[TABLE]:<table class=\"w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden\"><thead class=\"bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold\"><tr><th class=\"p-3 border border-cyan/20\">Circuit Type</th><th class=\"p-3 border border-cyan/20\">Function</th><th class=\"p-3 border border-cyan/20\">Inputs/Outputs</th><th class=\"p-3 border border-cyan/20\">Example</th><th class=\"p-3 border border-cyan/20\">Application</th></tr></thead><tbody><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Half Adder</td><td class=\"p-3 border border-cyan/20\">2-bit addition</td><td class=\"p-3 border border-cyan/20\">2 in, 2 out</td><td class=\"p-3 border border-cyan/20\">Sum = A⊕B, Carry = A·B</td><td class=\"p-3 border border-cyan/20\">LSB addition</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">Full Adder</td><td class=\"p-3 border border-cyan/20\">3-bit addition</td><td class=\"p-3 border border-cyan/20\">3 in, 2 out</td><td class=\"p-3 border border-cyan/20\">Sum = A⊕B⊕C_in</td><td class=\"p-3 border border-cyan/20\">Multi-bit addition</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">4:1 MUX</td><td class=\"p-3 border border-cyan/20\">Data selector</td><td class=\"p-3 border border-cyan/20\">4 in, 2 sel, 1 out</td><td class=\"p-3 border border-cyan/20\">Selects one of 4 inputs</td><td class=\"p-3 border border-cyan/20\">Data routing</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">1:4 DEMUX</td><td class=\"p-3 border border-cyan/20\">Data distributor</td><td class=\"p-3 border border-cyan/20\">1 in, 2 sel, 4 out</td><td class=\"p-3 border border-cyan/20\">Routes input to one of 4 outputs</td><td class=\"p-3 border border-cyan/20\">Data routing</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">3:8 Decoder</td><td class=\"p-3 border border-cyan/20\">Binary to one-hot</td><td class=\"p-3 border border-cyan/20\">3 in, 8 out</td><td class=\"p-3 border border-cyan/20\">Input 101 → output 5</td><td class=\"p-3 border border-cyan/20\">Memory addressing</td></tr><tr class=\"hover:bg-cyan/5\"><td class=\"p-3 border border-cyan/20 font-bold\">8:3 Encoder</td><td class=\"p-3 border border-cyan/20\">One-hot to binary</td><td class=\"p-3 border border-cyan/20\">8 in, 3 out</td><td class=\"p-3 border border-cyan/20\">Input 5 → output 101</td><td class=\"p-3 border border-cyan/20\">Priority encoding</td></tr></tbody></table>",
                  "So why does this matter? Combinational circuits are the workhorses of digital computing. Every time your computer does anything, it's using circuits like these. Understanding them helps you understand how computers really work."
                ]
              }
            ],
            pretest: [],
            procedure: [
              "Read the theory on adders and understand half adder and full adder designs",
              "Study subtractors and understand binary subtraction using 2's complement",
              "Learn about multiplexers and demultiplexers and their applications",
              "Understand encoders and decoders and their use in code conversion",
              "Work through examples of combinational circuit design using K-maps",
              "Attempt the pretest questions to check your understanding",
              "Complete the posttest to reinforce your learning"
            ],
            posttest: [],
            references: [
              "Thomas L. Floyd, 'Digital Fundamentals', 11th Edition, Pearson Publication, 2014",
              "David A. Patterson and John L. Hennessy, 'Computer Organization and Design: The Hardware/Software Interface', 5th Edition, Morgan Kaufmann, 2013"
            ]
          }
        }
      ]
    }
  ]
};