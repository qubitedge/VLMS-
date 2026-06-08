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
          { question: "What is the process of converting object state into a format that can be stored in a file called?", options: ["Serialization", "Deserialization", "Compilation", "Parsing"], answerIndex: 0, hint: "It turns live program objects into a stream of bytes or string characters." },
          { question: "Which collection is best suited to look up a student's record quickly by their unique Roll Number?", options: ["List", "Tuple", "Dictionary", "Set"], answerIndex: 2, hint: "A dictionary provides key-based lookup in constant O(1) time." },
          { question: "How do you split a comma-separated string s = 'Alice,90,80' into individual items?", options: ["s.split(',')", "split(s, ',')", "s.divide(',')", "s.strip(',')"], answerIndex: 0, hint: "Use the split() string method with a comma argument." },
          { question: "Why is the close() method called on files in final blocks?", options: ["To speed up compilation", "To free system resources and flush the output buffers", "To delete the file", "It is optional and does nothing"], answerIndex: 1, hint: "Closing files releases locks and ensures all written buffer content is written to disk." },
          { question: "Which OOP concept is demonstrated when class Student hides its private attributes from direct external modification?", options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"], answerIndex: 2, hint: "It wraps data and methods together and controls access to variables." }
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
          { question: "Which programming design pattern is best demonstrated by grouping data variables and computation methods inside a Student class?", options: ["Functional programming", "Encapsulation", "Polymorphism", "Dynamic binding"], answerIndex: 1, hint: "Encapsulation keeps data safe and self-contained within the object structure." },
          { question: "What will s1.get_avg() return if s1.marks is [80, 90]?", options: ["80", "85.0", "90", "170"], answerIndex: 1, hint: "Sum is 170. Length is 2. 170 / 2 = 85.0." },
          { question: "What error is handled when parsing a file if the file is deleted or renamed?", options: ["ZeroDivisionError", "FileNotFoundError", "IndexError", "AttributeError"], answerIndex: 1, hint: "It is a standard filesystem I/O exception." },
          { question: "How does csv parsing differ from standard space splitting in text lines?", options: ["It uses .split(',') instead of .split()", "It requires a special library", "It cannot be done in Python", "It is done automatically by print()"], answerIndex: 0, hint: "CSV files use commas as element delimiters, requiring comma splitting." },
          { question: "What is the primary benefit of Object-Oriented design in larger projects?", options: ["It runs faster than sequential scripts", "It makes the code more modular, maintainable, and easier to scale", "It eliminates syntax errors", "It automatically handles all exceptions"], answerIndex: 1, hint: "Decomposition into classes organizes logic logically, mirroring real-world domains." }
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
