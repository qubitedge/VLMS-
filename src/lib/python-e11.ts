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
          { question: "Which keyword is used to bring an external module into a Python script?", options: ["include", "require", "import", "using"], answerIndex: 2, hint: "It is a standard 6-letter keyword." },
          { question: "How do you import only the sqrt function from the math module?", options: ["import math.sqrt", "from math import sqrt", "import sqrt from math", "from math import *"], answerIndex: 1, hint: "Use the from-import syntax to selectively pull names." },
          { question: "What is the purpose of the 'as' keyword in an import statement?", options: ["To import all functions", "To create a module alias (rename)", "To define a function", "To test if a module exists"], answerIndex: 1, hint: "It provides a short namespace alias." },
          { question: "Which function in the random module returns a random integer between a and b (inclusive)?", options: ["random()", "randint(a, b)", "randrange(a, b)", "choice(a, b)"], answerIndex: 1, hint: "It stands for random integer." },
          { question: "What file must be present in a directory to mark it as a Python package?", options: ["main.py", "package.json", "__init__.py", "setup.py"], answerIndex: 2, hint: "It is a double-underscore initialization file." }
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
          { question: "What is the output of: print(math.ceil(3.2))?", options: ["3", "4", "3.0", "4.0"], answerIndex: 1, hint: "The ceil() function rounds a number UP to the nearest integer." },
          { question: "How do you view all functions and variables defined in an imported module?", options: ["dir(module)", "help(module)", "list(module)", "vars(module)"], answerIndex: 0, hint: "The dir() function returns a sorted list of names in the module namespace." },
          { question: "What is the output of: print(math.floor(-3.2))?", options: ["-3", "-4", "-3.0", "-4.0"], answerIndex: 1, hint: "The floor() function rounds DOWN towards negative infinity." },
          { question: "Which standard library module contains functions for working with date and time?", options: ["time", "datetime", "calendar", "All of these"], answerIndex: 3, hint: "Python has several built-in modules for calendar, time, and datetime manipulations." },
          { question: "If you write: from math import sqrt; def sqrt(x): return x; which sqrt executes when you call sqrt(9)?", options: ["math.sqrt", "The local custom sqrt", "Both execute", "It raises a name conflict error"], answerIndex: 1, hint: "Python uses the last defined or bound name in the namespace. The local definition overrides the imported one." }
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
