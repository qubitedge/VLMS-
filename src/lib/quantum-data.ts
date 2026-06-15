import type { Course } from "./course-data";
import { quantumShortNotes } from "./quantum-short-notes";

import { quantumModule1 } from "./quantum-m1-data";
import { quantumModule2 } from "./quantum-m2-data";
import { quantumModule3 } from "./quantum-m3-data";
import { quantumModule4 } from "./quantum-m4-data";
import { quantumModule5 } from "./quantum-m5-data";

export const quantumCourse: Course = {
  id: "quantum-computing",
  title: "Quantum Computing",
  shortNotes: quantumShortNotes,
  objectives: [
    "To introduce students to the foundational principles of quantum physics and their application to computation.",
    "To mathematically represent and manipulate quantum states using Dirac notation and the Bloch sphere.",
    "To understand and apply single-qubit and multi-qubit logic gates to design quantum circuits.",
    "To explore the phenomena of quantum entanglement and teleportation for secure communication.",
    "To implement and analyze foundational quantum algorithms, including Deutsch-Jozsa, Grover's search, and the concepts of Shor's factorization.",
    "To survey the integration of quantum computing into machine learning (QML) and real-world industry applications."
  ],
  introduction: [
    "Quantum Computing represents a paradigm shift in information processing. By leveraging the bizarre and powerful laws of quantum mechanics—such as superposition and entanglement—quantum computers have the potential to solve specific, highly complex problems exponentially faster than any classical supercomputer.",
    "This Virtual Quantum Computing Lab provides an interactive, accessible environment for students to dive into quantum mechanics without requiring access to a physical quantum processor. Through theoretical modules, embedded visual animations, and interactive Python/Qiskit-based simulations, learners can experiment with quantum states and algorithms directly in the browser.",
    "The course is structured into five comprehensive modules. It begins with the fundamental physics of wave-particle duality and uncertainty, transitions into the mathematics of qubits and quantum gates, explores the 'spooky' nature of entanglement, and culminates in advanced quantum algorithms and machine learning applications.",
    "Whether you are interested in breaking classical encryption, discovering new pharmaceutical drugs through molecular simulation, or pushing the boundaries of artificial intelligence, this lab lays the necessary mathematical and conceptual foundation."
  ],
  targetAudience: {
    primary: "Undergraduate and postgraduate engineering students, Physics majors, and Computer Science learners.",
    prerequisites: [
      "Basic understanding of linear algebra (matrices and vectors)",
      "Familiarity with complex numbers",
      "Basic Python programming skills"
    ],
    usefulFor: [
      "Software engineers looking to transition into the quantum computing industry",
      "Researchers interested in Quantum Machine Learning (QML)",
      "Anyone curious about the next frontier of computational technology"
    ]
  },
  alignment: {
    university: "Virtual Lab",
    department: "Advanced Computing & Physics",
    course: "Quantum Computing Laboratory",
    credits: "L:0 T:0 P:3 C:1.5",
    yearSem: "Elective / Advanced",
    branches: "Computer Science, Physics, Electronics, Mathematics",
    totalExperiments: "25 Topics",
    compiler: "Pyodide (Python / Qiskit support) running directly in the browser",
    units: [
      { unit: "Module 1", topics: "Foundations of Quantum Physics", weeks: "Week 1" },
      { unit: "Module 2", topics: "Qubits and Quantum Information", weeks: "Week 2" },
      { unit: "Module 3", topics: "Quantum Gates and Circuits", weeks: "Week 3" },
      { unit: "Module 4", topics: "Entanglement and Quantum Communication", weeks: "Week 4" },
      { unit: "Module 5", topics: "Quantum Algorithms and Applications", weeks: "Week 5" }
    ]
  },
  weeks: [
    quantumModule1,
    quantumModule2,
    quantumModule3,
    quantumModule4,
    quantumModule5
  ]
};
