import type { Week } from "./course-data";

export const pythonExercise11: Week = {
  title: "EXERCISE 11",
  objective: "Understanding Python modules and packages, importing standard library modules (math, random), and creating custom modules.",
  tutorial: "Tutorial 11: Modules and Packages",
  labTitle: "Lab 11: Modules and Packages",
  experiments: [
    {
      id: "py-e11-1",
      title: "Working with Modules",
      desc: "Write a Python program to perform math operations using the math module, generate random numbers using the random module, and explore custom module creation.",
      expected: "Square root: 5.0\nFactorial: 120\nRandom Int: 42\nRandom choice: Apple",
      content: {
        aim: {
          text: "In this experiment the student will learn about code organization and reusability through Python modules. The student will import standard libraries (math, random), use specific functions and module aliases, and understand how packages are structured in Python.",
          bullets: [
            "Understand that a module is a file containing Python code, variables, and functions",
            "Import whole modules using import, and import specific attributes using from ... import",
            "Use namespaces and alias modules/functions using the as keyword",
            "Utilize standard libraries: math (sqrt, factorial, pi) and random (randint, choice, random)",
            "Explain the role of __init__.py in package directories"
          ]
        },
        theory: [
          {
            title: "What is a Module?",
            body: [
              "A module is a file containing Python definitions and statements. The file name is the module name with the suffix .py appended.",
              "Modules help break down large programs into smaller, manageable, and organized files. They also facilitate code sharing and reusability.",
              "To use definitions from a module in another script, we use the import statement."
            ]
          },
          {
            title: "Import Options",
            body: [
              "1. import module_name: Imports the entire module. Access contents using dot notation: module_name.func()",
              "2. from module_name import func: Imports a specific function directly into the current namespace. Access without module prefix.",
              "3. import module_name as alias: Creates an alias for the module, useful for shortening names (e.g., import numpy as np).",
              "4. from module_name import *: Imports all public names from a module. Highly discouraged as it can lead to namespace pollution and name clashes."
            ]
          },
          {
            title: "Standard Libraries: math and random",
            body: [
              "math module: Provides mathematical constants and functions (math.pi, math.sqrt(), math.factorial(), math.sin()).",
              "random module: Provides tools for generating pseudo-random numbers (random.random() for float in [0.0, 1.0), random.randint(a, b) for integer, random.choice(sequence) to choose a random item)."
            ]
          },
          {
            title: "Packages",
            body: [
              "A package is a collection of modules organized in directories. A directory must contain a file named __init__.py (which can be empty) for Python to treat it as a package.",
              "Packages allow hierarchically structuring module namespaces using dot notation: import package.subpackage.module"
            ]
          }
        ],
        pretest: [
            { question: "What is a module in Python?", options: ["A loop structure", "A file containing Python definitions and statements", "A database table", "A package manager"], answerIndex: 1 },
            { question: "What is the extension of a Python module file?", options: [".txt", ".java", ".py", ".exe"], answerIndex: 2 },
            { question: "Why are modules used in Python?", options: ["To increase code duplication", "To organize and reuse code", "To replace functions", "To create loops"], answerIndex: 1 },
            { question: "Which statement is used to use a module in another script?", options: ["include", "require", "import", "using"], answerIndex: 2 },
            { question: "Which statement imports an entire module?", options: ["include math", "import math", "using math", "load math"], answerIndex: 1 },
            { question: "After executing import math, how is the square root function accessed?", options: ["sqrt()", "math.sqrt()", "math->sqrt()", "sqrt.math()"], answerIndex: 1 },
            { question: "Which statement imports only a specific function?", options: ["import module.function", "include function", "from module import function", "using function"], answerIndex: 2 },
            { question: "What is the advantage of from module import func?", options: ["No need to use module prefix", "Faster internet connection", "Creates a package", "Makes code immutable"], answerIndex: 0 },
            { question: "Which statement creates an alias for a module?", options: ["import math rename m", "import math as m", "alias math m", "from math as m"], answerIndex: 1 },
            { question: "Why are aliases useful?", options: ["They shorten long module names", "They increase memory usage", "They create packages", "They prevent imports"], answerIndex: 0 },
            { question: "What does the statement import numpy as np do?", options: ["Imports NumPy with alias np", "Creates a new package", "Renames Python", "Deletes NumPy"], answerIndex: 0 },
            { question: "Which import style is discouraged?", options: ["import math", "import math as m", "from math import sqrt", "from math import *"], answerIndex: 3 },
            { question: "Why is from module import * discouraged?", options: ["It causes namespace pollution", "It makes code faster", "It prevents function usage", "It deletes variables"], answerIndex: 0 },
            { question: "What is namespace pollution?", options: ["Creating files in wrong folders", "Too many names imported into current namespace", "Deleting modules accidentally", "Importing syntax errors"], answerIndex: 1 },
            { question: "Which standard library module provides mathematical functions?", options: ["random", "string", "math", "os"], answerIndex: 2 },
          ],
        procedure: [
          "Read the Aim and Theory to understand module imports, namespaces, aliases, and packages",
          "Note the functions in the math and random standard libraries",
          "Understand the risk of namespace pollution when using from module import *",
          "Go to Simulation tab and click Start",
          "Step through the simulation using Next",
          "Observe how the interpreter imports functions and updates variable bindings in the Memory State panel",
          "Go to Code Test tab and run the default program",
          "Verify the outputs of square root, factorial, and random choices",
          "Modify the script to calculate the area of a circle with radius 7 using math.pi",
          "Write a program that uses random.randint(1, 100) to simulate a number guessing game",
          "Experiment with creating a mock local module and importing it in your main code",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Modules Simulation\nimport math as m\nfrom random import choice\n\nval_sqrt = m.sqrt(25)\nval_fact = m.factorial(5)\n\nitems = ['Apple', 'Banana', 'Cherry']\nchosen = 'Apple'  # Simulates choice(items)\n\nprint('Sqrt:', val_sqrt)\nprint('Factorial:', val_fact)\nprint('Chosen:', chosen)",
          steps: [
            { line: 2, annotation: "import math as m — imports math module and aliases it as m", memory: [{ variable: "m", type: "module", value: "<module 'math'>" }], output: "" },
            { line: 3, annotation: "from random import choice — imports choice function directly into namespace", memory: [{ variable: "choice", type: "function", value: "<function choice>" }], output: "" },
            { line: 5, annotation: "val_sqrt = m.sqrt(25) = 5.0", memory: [{ variable: "val_sqrt", type: "float", value: "5.0" }], output: "" },
            { line: 6, annotation: "val_fact = m.factorial(5) = 120", memory: [{ variable: "val_fact", type: "int", value: "120" }], output: "" },
            { line: 8, annotation: "items = ['Apple', 'Banana', 'Cherry'] — defines choices", memory: [{ variable: "items", type: "list", value: "['Apple', 'Banana', 'Cherry']" }], output: "" },
            { line: 9, annotation: "chosen = 'Apple' — simulates picking random item", memory: [{ variable: "chosen", type: "str", value: "'Apple'" }], output: "" },
            { line: 11, annotation: "print('Sqrt:', val_sqrt) displays Sqrt: 5.0", memory: [], output: "Sqrt: 5.0\n" },
            { line: 12, annotation: "print('Factorial:', val_fact) displays Factorial: 120", memory: [], output: "Sqrt: 5.0\nFactorial: 120\n" },
            { line: 13, annotation: "print('Chosen:', chosen) displays Chosen: Apple", memory: [], output: "Sqrt: 5.0\nFactorial: 120\nChosen: Apple\n" }
          ]
        },
        posttest: [
            { question: "Which constant belongs to the math module?", options: ["math.rand", "math.pi", "math.float", "math.value"], answerIndex: 1 },
            { question: "Which function calculates a square root?", options: ["math.square()", "math.root()", "math.sqrt()", "math.power()"], answerIndex: 2 },
            { question: "Which function calculates factorials?", options: ["math.fact()", "math.factorial()", "math.multiply()", "math.product()"], answerIndex: 1 },
            { question: "Which module is used to generate pseudo-random numbers?", options: ["math", "random", "statistics", "string"], answerIndex: 1 },
            { question: "What does random.random() return?", options: ["Integer between 1 and 100", "Random string", "Float between 0.0 and 1.0", "Boolean value"], answerIndex: 2 },
            { question: "What does random.randint(1,10) return?", options: ["Float from 0 to 1", "Integer between 1 and 10", "List of numbers", "String value"], answerIndex: 1 },
            { question: "Which function selects a random item from a sequence?", options: ["random.pick()", "random.select()", "random.choice()", "random.choose()"], answerIndex: 2 },
            { question: "What is a package in Python?", options: ["A collection of modules organized in directories", "A loop structure", "A single function", "A database file"], answerIndex: 0 },
            { question: "Which file is traditionally required for Python to recognize a directory as a package?", options: ["package.py", "main.py", "init.py", "start.py"], answerIndex: 2 },
            { question: "What is the purpose of packages?", options: ["Increase code complexity", "Organize modules hierarchically", "Remove functions", "Replace classes"], answerIndex: 1 },
            { question: "Which statement correctly imports a module inside a package?", options: ["import package.module", "package.import module", "import module.package", "package.module.import"], answerIndex: 0 },
            { question: "What is the output?", options: ["Error", "Mathematical constant \u03c0", "0", "Random value"], answerIndex: 1 },
            { question: "What is the output?", options: ["25", "125", "5.0", "Error"], answerIndex: 2 },
            { question: "What is the output?", options: ["int", "float", "str", "list"], answerIndex: 1 },
            { question: "Which statement best describes modules and packages?", options: ["They help organize, reuse, and manage code efficiently", "They replace loops and conditions", "They are used only for mathematics", "They prevent function creation"], answerIndex: 0 },
          ],
        references: [
          "Python Standard Library — Modules: https://docs.python.org/3/tutorial/modules.html",
          "W3Schools Python Modules: https://www.w3schools.com/python/python_modules.asp",
          "Lutz M., Learning Python, 5th Edition"
        ]
      }
    }
  ]
};
