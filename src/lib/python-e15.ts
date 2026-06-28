import type { Week } from "./course-data";

export const pythonExercise15: Week = {
  title: "EXERCISE 15",
  objective: "Building an application-based mini-project integrating OOP, collections, file handling, input/output operations, and decision-making logic.",
  tutorial: "Tutorial 15: Mini-Project",
  labTitle: "Lab 15: Mini-Project",
  experiments: [
    {
      id: "py-e15-1",
      title: "Student Grade Management System",
      desc: "Develop a complete Python application using OOP, collections, and file handling to record students' scores, calculate averages, write grade reports to a file, and read/display reports.",
      expected: "Report written successfully.\n--- GRADE REPORT ---\nName: Alice, Average: 90.0, Grade: A\nName: Bob, Average: 78.3, Grade: B\n--------------------",
      content: {
        aim: {
          text: "In this consolidation experiment the student will integrate multiple Python concepts—including object-oriented design (classes and objects), container types (dictionaries and lists), exception handling, file I/O operations, and formatting—into a cohesive, fully functioning Student Grade Management System.",
          bullets: [
            "Decompose a problem into an object-oriented design using classes and objects",
            "Store and query student objects inside lists and dictionaries",
            "Read input scores dynamically and compute aggregate results like averages and grades",
            "Persist student records to a text file using write operations",
            "Read and parse data from a text file to reconstruct and display reports safely"
          ]
        },
        theory: [
          {
            title: "Application Architecture and System Integration",
            body: [
              "Developing real-world software involves integrating separate components: data models (objects), data processing (calculations), data storage (files), and interfaces (inputs/outputs).",
              "In this application:",
              "1. Model: The Student class represents an individual student's details (name, marks).",
              "2. Storage: A text file 'grades.txt' serves as a persistent flat-file database.",
              "3. Logic: Methods within a management controller calculate grade letter mappings and read/write files."
            ]
          },
          {
            title: "Data Serialization and De-serialization",
            body: [
              "Serialization is the process of converting complex objects (like Student instances) into a format that can be stored or transmitted (like a comma-separated string in a text file).",
              "De-serialization is the reverse process, parsing text lines (e.g. 'Alice,85,95,90') and reconstructing variables or objects in program memory."
            ]
          },
          {
            title: "Clean Coding Principles",
            body: [
              "When coding a mini-project, strive for readability, encapsulation, and modularity:",
              "Use descriptive variable and method names.",
              "Handle potential exceptions (e.g. file missing, zero division, bad casting) using try-except blocks.",
              "Document methods using docstrings."
            ]
          }
        ],
        pretest: [
            { question: "What does real-world software development typically involve?", options: ["Only user interfaces", "Only databases", "Integration of multiple components", "Only file handling"], answerIndex: 2 },
            { question: "Which component represents data entities in an application?", options: ["Interface", "Model", "Storage", "Controller"], answerIndex: 1 },
            { question: "In the Student Grade Management System, what does the Student class represent?", options: ["File storage", "User interface", "Individual student details", "Database connection"], answerIndex: 2 },
            { question: "Which component is responsible for storing data permanently?", options: ["Logic Layer", "Interface Layer", "Storage Layer", "Model Layer"], answerIndex: 2 },
            { question: "In this application, which file acts as a flat-file database?", options: ["students.py", "grades.txt", "database.db", "records.csv"], answerIndex: 1 },
            { question: "What is the purpose of the Logic component?", options: ["Store files", "Calculate grades and process data", "Display UI only", "Create packages"], answerIndex: 1 },
            { question: "Which component handles user inputs and outputs?", options: ["Interface", "Model", "Storage", "Package"], answerIndex: 0 },
            { question: "What is system integration?", options: ["Deleting duplicate files", "Combining separate software components into a working system", "Creating loops", "Installing Python packages"], answerIndex: 1 },
            { question: "Which of the following is NOT mentioned as an application component?", options: ["Model", "Storage", "Logic", "Compiler"], answerIndex: 3 },
            { question: "What is the primary role of a Student object?", options: ["Perform file operations", "Represent student information", "Create exceptions", "Manage packages"], answerIndex: 1 },
            { question: "What is serialization?", options: ["Converting stored data into objects", "Converting objects into storable/transmittable format", "Encrypting files", "Executing functions"], answerIndex: 1 },
            { question: "What is de-serialization?", options: ["Deleting stored data", "Parsing stored data and reconstructing objects/variables", "Compressing files", "Creating modules"], answerIndex: 1 },
            { question: "Which of the following is an example of serialized data?", options: ["Student(name=\"Alice\")", "Alice,85,95,90", "{\"name\":\"Alice\"}", "print(\"Alice\")"], answerIndex: 1 },
            { question: "Why is serialization important?", options: ["Makes code slower", "Allows storage and transmission of data", "Prevents file handling", "Removes objects from memory"], answerIndex: 1 },
            { question: "What is being reconstructed during de-serialization?", options: ["Loops", "Packages", "Variables or objects", "Modules"], answerIndex: 2 },
          ],
        procedure: [
          "Read the Aim and Theory to understand how class definitions, collection management, and file handling integrate to form a system",
          "Note the structure of student serialization: saving columns as name, average, and grade in text lines",
          "Trace how files are opened for writing reports, then reopened for reading and displaying reports",
          "Go to Simulation tab and click Start",
          "Step through the simulation using Next to follow the creation of student objects, average calculation, report writing, and reading",
          "Check how state changes in the Memory State panel",
          "Go to Code Test tab and run the complete program",
          "Verify that the grades report is written and displayed correctly",
          "Modify the script to accept a new student record dynamically using input()",
          "Add a try-except block to handle ValueError when parsing scores that aren't valid numbers",
          "Implement an search function that looks up a student by name in the grades file and displays only their details",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Mini-Project Simulation\nclass Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    \n    def get_avg(self):\n        return sum(self.marks) / len(self.marks) if self.marks else 0\n    \n    def get_grade(self):\n        avg = self.get_avg()\n        if avg >= 90: return 'A'\n        elif avg >= 80: return 'B'\n        else: return 'C'\n\n# Creating students\ns1 = Student('Alice', [90, 85, 95])\ns2 = Student('Bob', [75, 80, 80])\n\n# Serializing and writing reports\nwith open('reports.txt', 'w') as f:\n    f.write(f'{s1.name},{s1.get_avg():.1f},{s1.get_grade()}\\n')\n    f.write(f'{s2.name},{s2.get_avg():.1f},{s2.get_grade()}\\n')\n\n# Reading and displaying reports\nlines = []\nwith open('reports.txt', 'r') as f:\n    lines = f.readlines()",
          steps: [
            { line: 2, annotation: "class Student: registers Student class in memory", memory: [{ variable: "Student", type: "class", value: "<class '__main__.Student'>" }], output: "" },
            { line: 15, annotation: "s1 = Student('Alice', [90, 85, 95]) — creates instance s1", memory: [{ variable: "s1.name", type: "str", value: "'Alice'" }, { variable: "s1.marks", type: "list", value: "[90, 85, 95]" }], output: "" },
            { line: 16, annotation: "s2 = Student('Bob', [75, 80, 80]) — creates instance s2", memory: [{ variable: "s2.name", type: "str", value: "'Bob'" }, { variable: "s2.marks", type: "list", value: "[75, 80, 80]" }], output: "" },
            { line: 19, annotation: "with open('reports.txt', 'w') as f: opens file for writing", memory: [], output: "" },
            { line: 20, annotation: "f.write(s1 data) — calculates avg (90.0), grade ('A'), writes 'Alice,90.0,A'", memory: [], output: "" },
            { line: 21, annotation: "f.write(s2 data) — calculates avg (78.3), grade ('B'), writes 'Bob,78.3,B'", memory: [], output: "" },
            { line: 24, annotation: "lines = [] — initializes list", memory: [{ variable: "lines", type: "list", value: "[]" }], output: "" },
            { line: 25, annotation: "with open('reports.txt', 'r') as f: opens file for reading", memory: [], output: "" },
            { line: 26, annotation: "lines = f.readlines() — reads all lines as a list of strings", memory: [{ variable: "lines", type: "list", value: "['Alice,90.0,A\\n', 'Bob,78.3,B\\n']" }], output: "" }
          ]
        },
        posttest: [
            { question: "Which operation converts an object into a string format for storage?", options: ["Deserialization", "Serialization", "Compilation", "Iteration"], answerIndex: 1 },
            { question: "What does the line \"Alice,85,95,90\" typically represent?", options: ["A function definition", "Serialized student data", "Exception message", "Package structure"], answerIndex: 1 },
            { question: "What is a flat-file database?", options: ["A relational database server", "A text file used for data storage", "A Python package", "A NumPy array"], answerIndex: 1 },
            { question: "Which file format is used in the example application?", options: ["grades.txt", "grades.sql", "grades.json", "grades.xml"], answerIndex: 0 },
            { question: "Which process occurs when reading stored student records into memory?", options: ["Serialization", "Compilation", "De-serialization", "Encapsulation"], answerIndex: 2 },
            { question: "What is a clean coding principle?", options: ["Using random variable names", "Writing readable and maintainable code", "Avoiding comments", "Ignoring errors"], answerIndex: 1 },
            { question: "Which variable name is more descriptive?", options: ["x", "y1", "student_marks", "a"], answerIndex: 2 },
            { question: "Why should descriptive method names be used?", options: ["Increase code complexity", "Improve readability and maintenance", "Reduce storage space", "Prevent inheritance"], answerIndex: 1 },
            { question: "What is encapsulation in application design?", options: ["Wrapping related data and methods together", "Deleting variables", "Creating files", "Handling loops"], answerIndex: 0 },
            { question: "Why should exceptions be handled?", options: ["To make code longer", "To avoid program crashes and manage errors gracefully", "To reduce readability", "To prevent functions from running"], answerIndex: 1 },
            { question: "Which structure is commonly used for exception handling?", options: ["if-else", "for loop", "try-except", "while loop"], answerIndex: 2 },
            { question: "What is the purpose of a docstring?", options: ["Store database records", "Document methods and functions", "Create packages", "Execute code"], answerIndex: 1 },
            { question: "Which principle improves code organization by separating responsibilities?", options: ["Modularity", "Duplication", "Nesting", "Indexing"], answerIndex: 0 },
            { question: "Which statement best describes a well-designed application?", options: ["All code in one function", "Separate model, logic, storage, and interface components", "No exception handling", "No documentation"], answerIndex: 1 },
            { question: "What is the main goal of Application Architecture and System Integration?", options: ["Create larger files", "Combine components into a reliable, maintainable software system", "Avoid object-oriented programming", "Eliminate data storage"], answerIndex: 1 },
          ],
        references: [
          "Python Tutorial: https://docs.python.org/3/tutorial/",
          "W3Schools Python OOP and File Handling: https://www.w3schools.com/python/",
          "Sweigart A., Automate the Boring Stuff with Python"
        ]
      }
    }
  ]
};
