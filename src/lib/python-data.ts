import type { Course } from "./course-data";
import { pythonShortNotes } from "./python-short-notes";
import { pythonExercise1 } from "./python-e1";
import { pythonExercise2 } from "./python-e2";
import { pythonExercise3 } from "./python-e3";
import { pythonExercise4 } from "./python-e4";
import { pythonExercise5 } from "./python-e5";
import { pythonExercise6 } from "./python-e6";
import { pythonExercise7 } from "./python-e7";
import { pythonExercise8 } from "./python-e8";
import { pythonExercise9 } from "./python-e9";
import { pythonExercise10 } from "./python-e10";
import { pythonExercise11 } from "./python-e11";
import { pythonExercise12 } from "./python-e12";
import { pythonExercise13 } from "./python-e13";
import { pythonExercise14 } from "./python-e14";
import { pythonExercise15 } from "./python-e15";

export const pythonCourse: Course = {
  id: "python",
  title: "Python Programming",
  shortNotes: pythonShortNotes,
  objectives: [
    "To introduce students to Python programming syntax, standard coding practices, and interpreter modes.",
    "To master fundamental concepts like variables, dynamic data types, operators, and control flow structures (selection and iteration).",
    "To define and use functions, understand scope, parameter passing, and write modular, reusable code.",
    "To utilize built-in collection types: Lists, Tuples, Sets, and Dictionaries for organizing and processing data.",
    "To perform input/output operations, formatting, and file processing for data storage and persistence.",
    "To apply Object-Oriented Programming principles including classes, objects, inheritance, and polymorphism to model real-world entities.",
    "To build a solid foundation in Python standard libraries and introduce data science tools like NumPy and Pandas."
  ],
  introduction: [
    "Python is one of the most popular and versatile programming languages in the world. Known for its simplicity, readability, and extensive library support, Python is widely used in software development, web applications, automation, artificial intelligence, machine learning, data science, and scientific computing. Its beginner-friendly syntax makes it an ideal first programming language while its powerful features make it suitable for complex real-world applications.",
    "This Virtual Python Programming Lab is developed for first-year B.Tech students of Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) under the BS&HSS department. The lab provides a hands-on, browser-based environment where students can write, execute, and test Python programs without requiring any local software installation.",
    "The lab covers a comprehensive set of experiments aligned with the JNTUGV Python Programming syllabus. Students begin with Python fundamentals such as variables, data types, operators, control statements, and functions, and gradually progress to advanced topics including strings, lists, dictionaries, tuples, sets, file handling, object-oriented programming, and introductory data science concepts using NumPy and Pandas.",
    "Each experiment is designed with a clear objective, problem statement, executable code environment, input support for interactive programs, and expected output for self-assessment. The structured approach enables quality-level laboratory courses, skill development programs, and foundational coding modules."
  ],
  targetAudience: {
    primary: "First-year B.Tech students enrolled in the Python Programming Lab course at Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV).",
    prerequisites: [
      "Basic mathematical and logical thinking",
      "Familiarity with basic computer operations and file systems"
    ],
    usefulFor: [
      "Undergraduate engineering students who want to build a strong programming foundation.",
      "Learners starting their journey in data analysis, AI, machine learning, and automation.",
      "Instructors looking for a structured web-based sandbox tool to teach Python labs without setup overhead."
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "Basic Sciences & Humanities and Social Sciences (BS&HSS)",
    course: "Python Programming Lab",
    credits: "L:0 T:0 P:3 C:1.5",
    yearSem: "First Year, First/Second Semester",
    branches: "All branches of Engineering (CSE, ECE, EEE, ME, CE, IT)",
    totalExperiments: "15 Exercises",
    compiler: "Pyodide (Python compiled to WebAssembly) running directly in the browser",
    units: [
      { unit: "Exercise 1", topics: "Introduction to Python and first program", weeks: "Week 1" },
      { unit: "Exercise 2", topics: "Variables, data types, and operators", weeks: "Week 2" },
      { unit: "Exercise 3", topics: "Input and output operations", weeks: "Week 3" },
      { unit: "Exercise 4", topics: "Conditional statements and decision-making", weeks: "Week 4" },
      { unit: "Exercise 5", topics: "Looping constructs: for and while", weeks: "Week 5" },
      { unit: "Exercise 6", topics: "Functions and parameter passing", weeks: "Week 6" },
      { unit: "Exercise 7", topics: "Strings and string operations", weeks: "Week 7" },
      { unit: "Exercise 8", topics: "Lists, tuples, sets, and dictionaries", weeks: "Week 8" },
      { unit: "Exercise 9", topics: "File handling in Python", weeks: "Week 9" },
      { unit: "Exercise 10", topics: "Exception handling", weeks: "Week 10" },
      { unit: "Exercise 11", topics: "Modules and packages", weeks: "Week 11" },
      { unit: "Exercise 12", topics: "OOP using classes and objects", weeks: "Week 12" },
      { unit: "Exercise 13", topics: "Inheritance and polymorphism", weeks: "Week 13" },
      { unit: "Exercise 14", topics: "Working with Python libraries (NumPy & Pandas)", weeks: "Week 14" },
      { unit: "Exercise 15", topics: "Mini-project: Application-based exercise", weeks: "Week 15" }
    ]
  },
  weeks: [
    pythonExercise1,
    pythonExercise2,
    pythonExercise3,
    pythonExercise4,
    pythonExercise5,
    pythonExercise6,
    pythonExercise7,
    pythonExercise8,
    pythonExercise9,
    pythonExercise10,
    pythonExercise11,
    pythonExercise12,
    pythonExercise13,
    pythonExercise14,
    pythonExercise15
  ]
};
