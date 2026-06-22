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
            { question: "Python is a ______ programming language.", options: ["low-level only", "high-level, interpreted, general-purpose", "hardware-specific", "markup"], answerIndex: 1 },
            { question: "Who created Python?", options: ["Dennis Ritchie", "James Gosling", "Guido van Rossum", "Bjarne Stroustrup"], answerIndex: 2 },
            { question: "Python was first released in:", options: ["1985", "1991", "2000", "1998"], answerIndex: 1 },
            { question: "Python emphasizes:", options: ["hardware design", "code readability", "manual memory allocation only", "use of semicolons"], answerIndex: 1 },
            { question: "Python uses ______ to define code blocks.", options: ["curly braces", "semicolons", "indentation", "keywords only"], answerIndex: 2 },
            { question: "Python supports which programming paradigms?", options: ["only procedural", "only object-oriented", "only functional", "procedural, object-oriented, and functional"], answerIndex: 3 },
            { question: "Python has a large ecosystem of third-party packages available via:", options: ["JVM", "PyPI", "HTML", "BIOS"], answerIndex: 1 },
            { question: "Python does not require a separate ______ step like C or Java.", options: ["execution", "interpretation", "compilation", "storage"], answerIndex: 2 },
            { question: "The Python interpreter converts source code internally into:", options: ["machine BIOS", "bytecode", "HTML", "assembly comments"], answerIndex: 1 },
            { question: "Python can be tested quickly because:", options: ["it has no syntax", "it runs only online", "code can be written and executed immediately", "it uses only binaries"], answerIndex: 2 },
            { question: "Typing commands directly into the Python shell is called:", options: ["script mode", "module mode", "interactive mode", "package mode"], answerIndex: 2 },
            { question: "Writing code in a .py file and running it is called:", options: ["interactive mode", "script mode", "shell mode", "compiler mode"], answerIndex: 1 },
            { question: "The most basic output function in Python is:", options: ["scanf()", "println()", "print()", "echo()"], answerIndex: 2 },
            { question: "The print() function writes output to:", options: ["BIOS", "standard output", "compiler memory", "header file"], answerIndex: 1 },
            { question: "By default, print() separates multiple values using:", options: ["comma", "colon", "space", "tab"], answerIndex: 2 },
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
            { question: "By default, print() ends output with:", options: ["a space", "newline", "comma", "colon"], answerIndex: 1 },
            { question: "Which argument of print() changes the separator between values?", options: ["stop", "next", "sep", "line"], answerIndex: 2 },
            { question: "Which argument of print() changes the ending character?", options: ["sep", "end", "final", "close"], answerIndex: 1 },
            { question: "In C, output is commonly printed using:", options: ["print()", "write()", "printf()", "putsln()"], answerIndex: 2 },
            { question: "In Python, a main() function is:", options: ["always mandatory", "not required for simple execution", "required in every file", "compiled automatically"], answerIndex: 1 },
            { question: "Python uses dynamic typing, which means:", options: ["types must be declared manually", "variable types are fixed forever", "type is determined at runtime", "types are not allowed"], answerIndex: 2 },
            { question: "Python uses automatic memory management through:", options: ["manual free()", "garbage collection", "BIOS cleanup", "pointer deletion only"], answerIndex: 1 },
            { question: "Which language commonly uses #include <stdio.h>?", options: ["Python", "SQL", "C", "HTML"], answerIndex: 2 },
            { question: "Which of the following prints Hello World in Python?", options: ["printf(\"Hello World\");", "print('Hello World')", "echo Hello World", "Console.WriteLine(\"Hello World\")"], answerIndex: 1 },
            { question: "Python block structure is based on:", options: ["brackets", "semicolons", "indentation", "labels"], answerIndex: 2 },
            { question: "Which of the following is true about Python?", options: ["It is only for web design", "It is interpreted", "It cannot use packages", "It requires header files"], answerIndex: 1 },
            { question: "Python standard library is:", options: ["very limited", "unavailable", "comprehensive", "only for mathematics"], answerIndex: 2 },
            { question: "Which mode gives immediate results after each command?", options: ["script mode", "compile mode", "interactive mode", "debug mode only"], answerIndex: 2 },
            { question: "Compared to C, Python generally allows development to be:", options: ["slower", "impossible", "faster for testing and iteration", "dependent on header files"], answerIndex: 2 },
            { question: "Which statement is correct?", options: ["Python requires curly braces for blocks", "Python requires type declarations for every variable", "Python is a high-level interpreted language", "Python cannot be used for general-purpose programming"], answerIndex: 2 },
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
