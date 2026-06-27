import type { Course } from "./course-data";
import { qiskitShortNotes } from "./qiskit-short-notes";

import { qiskitModule1 } from "./qiskit-m1-data";
import { qiskitModule2 } from "./qiskit-m2-data";
import { qiskitModule3 } from "./qiskit-m3-data";
import { qiskitModule4 } from "./qiskit-m4-data";

export const qiskitCourse: Course = {
  id: "quantum-computing-using-qiskit-lab",
  title: "Quantum Computing using Qiskit Lab",
  shortNotes: qiskitShortNotes,
  objectives: [
    "To familiarize students with major quantum computing platforms including IBM Quantum Composer, Qiskit, PennyLane, and QSim.",
    "To understand quantum states, superposition, entanglement, and mixed states as foundational quantum concepts.",
    "To master single-qubit and multi-qubit quantum gates and design quantum circuits from scratch.",
    "To explore advanced quantum operations including phase manipulation, measurement theory, and quantum communication protocols.",
    "To implement quantum teleportation, understand Quantum Key Distribution (QKD), and explore quantum networking fundamentals.",
    "To build parameterized variational quantum circuits for Quantum Machine Learning (QML) and Variational Quantum Algorithms (VQAs).",
    "To learn circuit optimization techniques including transpilation, gate cancellation, and barrier-based execution flow control."
  ],
  introduction: [
    "Quantum computing is rapidly transitioning from theoretical research to practical applications. This hands-on laboratory course introduces students to quantum computing through the lens of Qiskit — IBM's open-source quantum computing SDK — enabling direct interaction with quantum circuits, gates, and algorithms.",
    "The course follows a carefully structured 2–2–3–3 module progression. Starting with fundamental quantum computing platforms and quantum state representations, students advance through quantum gate operations, circuit design, and advanced topics including quantum communication protocols and variational quantum algorithms.",
    "Each project combines theoretical foundations with practical Qiskit programming, allowing students to build, simulate, and analyze quantum circuits directly. The curriculum emphasizes both the mathematical rigor needed to understand quantum mechanics and the engineering skills required to implement quantum algorithms.",
    "Upon completion, students will be prepared for advanced topics in Quantum Machine Learning, Quantum Error Correction, and real-world quantum application development using industry-standard tools."
  ],
  targetAudience: {
    primary: "Undergraduate and postgraduate students in Computer Science, Physics, Electronics, and Mathematics.",
    prerequisites: [
      "Basic understanding of linear algebra (matrices, vectors, eigenvalues)",
      "Familiarity with complex numbers and basic probability",
      "Basic Python programming skills"
    ],
    usefulFor: [
      "Software engineers transitioning to quantum computing",
      "Researchers exploring Quantum Machine Learning and quantum algorithms",
      "Students preparing for quantum computing certifications",
      "Anyone interested in hands-on quantum programming with Qiskit"
    ]
  },
  alignment: {
    university: "Virtual Lab",
    department: "Advanced Computing & Quantum Technologies",
    course: "Quantum Computing using Qiskit Laboratory",
    credits: "L:0 T:0 P:3 C:1.5",
    yearSem: "Elective / Advanced",
    branches: "Computer Science, Physics, Electronics, Mathematics",
    totalExperiments: "10 Projects",
    compiler: "Pyodide (Python / Qiskit support) running directly in the browser",
    units: [
      { unit: "Module 1", topics: "Quantum Computing Foundations", weeks: "Week 1" },
      { unit: "Module 2", topics: "Quantum Gates and Circuit Design", weeks: "Week 2" },
      { unit: "Module 3", topics: "Advanced Quantum Operations", weeks: "Week 3" },
      { unit: "Module 4", topics: "Quantum Algorithms and Advanced Circuit Design", weeks: "Week 4" }
    ]
  },
  weeks: [
    qiskitModule1,
    qiskitModule2,
    qiskitModule3,
    qiskitModule4
  ]
};
