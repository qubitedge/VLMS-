import type { Week } from "./course-data";

export const pythonExercise1: Week = {
  title: "EXERCISE 1",
  objective: "Introduction to Python programming, understanding the Python interpreter, writing and executing the first Python program, and exploring the interactive mode.",
  tutorial: "Tutorial 1: Getting Started with Python",
  labTitle: "Lab 1: Introduction to Python",
  experiments: [
    {
      id: "py-e1-1",
      title: "Hello World — Your First Python Program",
      desc: "Write a Python program to print 'Hello World' and understand the basic structure of a Python script.",
      expected: "Hello World",
      content: {
        aim: {
          text: "In this experiment the student will write and execute their first Python program using the print() function. The student will understand how Python scripts are structured, how the Python interpreter processes source code line by line, and how the print() function sends output to the standard output stream.",
          bullets: [
            "Understand the structure of a basic Python program",
            "Use the print() function to display output on the console",
            "Differentiate between Python interactive mode and script mode",
            "Understand that Python is an interpreted language — no compilation step is needed",
            "Recognize that Python uses indentation instead of curly braces for code blocks"
          ]
        },
        theory: [
          {
            title: "What is Python?",
            body: [
              "Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum and first released in 1991. Python emphasizes code readability and uses significant whitespace (indentation) to define code blocks instead of curly braces or keywords.",
              "Python supports multiple programming paradigms including procedural, object-oriented, and functional programming. It has a comprehensive standard library and a massive ecosystem of third-party packages available via the Python Package Index (PyPI)."
            ]
          },
          {
            title: "Python Interpreter",
            body: [
              "Unlike C or Java, Python does not require a separate compilation step. The Python interpreter reads the source code, converts it to bytecode internally, and executes it immediately. This makes development faster because you can write and test code instantly.",
              "Python can be used in two modes: Interactive Mode (typing commands directly into the Python shell and getting immediate results) and Script Mode (writing code in a .py file and running the entire file at once)."
            ]
          },
          {
            title: "The print() Function",
            body: [
              "The print() function is the most basic output function in Python. It takes one or more arguments, converts them to strings, and writes them to the standard output (console).",
              "Syntax: print(value1, value2, ..., sep=' ', end='\\n')",
              "By default, multiple values are separated by a space (sep=' ') and the output ends with a newline character (end='\\n'). Both separators can be customized."
            ]
          },
          {
            title: "Python vs C — Key Differences",
            body: [
              "In C you write #include <stdio.h>, define main(), use printf(), and compile before running. In Python you simply write print('Hello World') — no includes, no main function, no compilation.",
              "Python uses dynamic typing (no need to declare variable types), automatic memory management (garbage collection), and indentation-based block structure instead of semicolons and braces."
            ]
          }
        ],
        pretest: [
          { question: "Who created the Python programming language?", options: ["Dennis Ritchie", "James Gosling", "Guido van Rossum", "Bjarne Stroustrup"], answerIndex: 2, hint: "Python was created at Centrum Wiskunde & Informatica (CWI) in the Netherlands." },
          { question: "Which of the following is the correct way to print output in Python 3?", options: ["printf('Hello')", "System.out.println('Hello')", "print('Hello')", "echo 'Hello'"], answerIndex: 2, hint: "Python 3 uses print() as a built-in function, not a statement." },
          { question: "What type of language is Python?", options: ["Compiled only", "Interpreted", "Assembly", "Machine language"], answerIndex: 1, hint: "Python code is executed line by line by the interpreter without a separate compilation step." },
          { question: "What does Python use to define code blocks instead of curly braces?", options: ["Semicolons", "Parentheses", "Indentation (whitespace)", "Square brackets"], answerIndex: 2, hint: "Python's most distinctive feature is its use of whitespace for structure." },
          { question: "What is the file extension for Python source files?", options: [".python", ".pt", ".py", ".pn"], answerIndex: 2, hint: "Python scripts are saved with a two-character extension." }
        ],
        procedure: [
          "Read the Aim and Theory sections carefully to understand what Python is and how the print() function works",
          "Note the key differences between Python and C: no #include, no main(), no semicolons, no compilation",
          "Mentally trace what happens when print('Hello World') is executed: the interpreter reads the line, calls the built-in print function, which converts the string argument to output and writes it to stdout followed by a newline",
          "Go to Simulation tab and click Start",
          "Press Next step by step and observe the interpreter processing the print statement",
          "Watch the output 'Hello World' appear in the Console Output panel",
          "Observe the memory state — note that no variables are created for a simple print statement",
          "Go to Code Test tab — starter code is pre-loaded with a basic print statement",
          "Click Run Code to execute the program",
          "Verify the output reads: Hello World",
          "Modify the code to print your own name: print('My name is <your_name>')",
          "Try printing multiple values: print('Hello', 'World', 'Python') and observe the space separator",
          "Try changing the separator: print('Hello', 'World', sep='-') and observe the output 'Hello-World'",
          "Try printing without a newline: print('Hello', end=' ') followed by print('World') on the next line",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# My first Python program\n\nprint('Hello World')\n\n# Print multiple values\nprint('Python', 'is', 'fun')\n\n# Print with custom separator\nprint('2025', '06', '07', sep='-')",
          steps: [
            { line: 1, annotation: "Comment line — interpreter skips this", memory: [], output: "" },
            { line: 3, annotation: "print('Hello World') — calls the built-in print function with string argument 'Hello World'", memory: [], output: "Hello World\n" },
            { line: 6, annotation: "print('Python', 'is', 'fun') — prints three strings separated by default space separator", memory: [], output: "Hello World\nPython is fun\n" },
            { line: 9, annotation: "print('2025', '06', '07', sep='-') — prints three strings separated by hyphen", memory: [], output: "Hello World\nPython is fun\n2025-06-07\n" }
          ]
        },
        posttest: [
          { question: "What is the output of print('Hello', 'World', sep='*')?", options: ["Hello World", "Hello*World", "HelloWorld", "Hello, World"], answerIndex: 1, hint: "The sep parameter controls what character is placed between multiple arguments." },
          { question: "What is the default value of the end parameter in print()?", options: ["A space ' '", "Nothing ''", "A newline '\\n'", "A tab '\\t'"], answerIndex: 2, hint: "By default, each print() call ends with a newline, causing the next output to appear on a new line." },
          { question: "What happens if you run a Python file with a syntax error?", options: ["The program compiles but gives wrong output", "The interpreter stops and displays a SyntaxError with the line number", "The error is silently ignored", "The program runs but skips the erroneous line"], answerIndex: 1, hint: "Python's interpreter checks syntax before execution and halts immediately on errors." },
          { question: "How many arguments can the print() function accept?", options: ["Exactly one", "Exactly two", "Up to ten", "Any number of arguments"], answerIndex: 3, hint: "print() uses *args to accept a variable number of positional arguments." },
          { question: "Which of the following is NOT a valid Python comment?", options: ["# This is a comment", "// This is a comment", "# TODO: fix this", "# End of program"], answerIndex: 1, hint: "Python uses the # symbol for single-line comments. // is used in C and Java." }
        ],
        references: [
          "Python Official Documentation: https://docs.python.org/3/tutorial/",
          "Lutz M., Learning Python, 5th Edition, O'Reilly Media, 2013",
          "Downey A., Think Python: How to Think Like a Computer Scientist, 2nd Edition, O'Reilly Media",
          "JNTUGV Python Programming Lab Syllabus",
          "Python Software Foundation: https://www.python.org/"
        ]
      }
    }
  ]
};
