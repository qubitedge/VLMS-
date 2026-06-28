import type { Week } from "./course-data";

export const pythonExercise6: Week = {
  title: "EXERCISE 6",
  objective: "Defining functions, understanding return values, parameter passing mechanisms (default, keyword, variable-length arguments), and variable scope.",
  tutorial: "Tutorial 6: Functions",
  labTitle: "Lab 6: Functions",
  experiments: [
    {
      id: "py-e6-1",
      title: "Functions and Parameter Passing",
      desc: "Write a Python program to define functions with default parameters, keyword parameters, and variable-length arguments, and demonstrate local vs global scope.",
      expected: "Interest (Default Rate): 100.0\nInterest (Custom Rate): 150.0\nSum of args: 15\nGlobal value inside: 20\nGlobal value outside: 20",
      content: {
        aim: {
          text: "In this experiment the student will learn how to design modular programs using functions, handle inputs through parameters, customize function behaviors with default and keyword arguments, accept dynamic numbers of arguments using *args and **kwargs, and manage variable scopes.",
          bullets: [
            "Define functions using the def keyword, docstrings, and return statements",
            "Pass parameters by position, keyword, and specify default values for optional parameters",
            "Use arbitrary positional arguments (*args) and arbitrary keyword arguments (**kwargs)",
            "Differentiate between local scope (inside functions) and global scope (outside functions)",
            "Modify global variables inside local scope using the global keyword"
          ]
        },
        theory: [
          {
            title: "Function Definitions",
            body: [
              "Functions are reusable blocks of code designed to perform a specific task. They prevent repetition and make programs easier to maintain.",
              "Syntax:",
              "def function_name(parameter1, parameter2):",
              "    '''Docstring describing function'''",
              "    # code block",
              "    return value",
              "If a function doesn't explicitly return a value, it implicitly returns None."
            ]
          },
          {
            title: "Default and Keyword Arguments",
            body: [
              "Default Arguments: You can specify default values for parameters. If the caller does not provide that argument, the default value is used. Note: Default parameters must follow non-default parameters.",
              "Keyword Arguments: Callers can pass arguments by specifying the parameter name. This allows passing arguments in any order. Example: calculate_interest(time=2, principal=1000)"
            ]
          },
          {
            title: "Variable-length Arguments (*args and **kwargs)",
            body: [
              "*args: Allows a function to accept any number of positional arguments. Inside the function, args is a tuple containing all passed arguments.",
              "**kwargs: Allows a function to accept any number of keyword arguments. Inside the function, kwargs is a dictionary containing all passed name-value pairs."
            ]
          },
          {
            title: "Variable Scope",
            body: [
              "Local Scope: Variables created inside a function belong to that function's local scope and cannot be accessed outside.",
              "Global Scope: Variables created in the main body of the script are global and can be read inside functions.",
              "The global Keyword: If you want to modify a global variable inside a function, you must declare it using the global keyword inside that function first. Otherwise, Python creates a new local variable with the same name."
            ]
          }
        ],
        pretest: [
            { question: "What is a function in Python?", options: ["A loop", "A reusable block of code", "A variable", "A module"], answerIndex: 1 },
            { question: "Which keyword is used to define a function?", options: ["function", "define", "def", "func"], answerIndex: 2 },
            { question: "What is the correct syntax for defining a function?", options: ["function myFunc()", "def myFunc():", "define myFunc():", "func myFunc():"], answerIndex: 1 },
            { question: "What is the purpose of a function?", options: ["Increase code repetition", "Reduce readability", "Reuse code and improve maintainability", "Create loops only"], answerIndex: 2 },
            { question: "What does a function return if no return statement is specified?", options: ["0", "False", "Empty String", "None"], answerIndex: 3 },
            { question: "What is the name of the text that describes a function?", options: ["Comment", "Annotation", "Docstring", "Metadata"], answerIndex: 2 },
            { question: "Which statement is used to send a value back from a function?", options: ["send", "yield", "return", "output"], answerIndex: 2 },
            { question: "What are parameters?", options: ["Values returned by a function", "Variables listed in function definition", "Variables outside the function", "Modules used by the function"], answerIndex: 1 },
            { question: "What are arguments?", options: ["Values passed to a function", "Function names", "Return values", "Global variables"], answerIndex: 0 },
            { question: "What is the output?", options: ["greet", "Hello", "Error", "None"], answerIndex: 1 },
            { question: "What are default arguments?", options: ["Required arguments", "Arguments with predefined values", "Global arguments", "Hidden arguments"], answerIndex: 1 },
            { question: "Which function definition uses a default argument?", options: ["def add(a,b):", "def add(a=5,b):", "def add(a,b=5):", "def add(=5,b):"], answerIndex: 2 },
            { question: "Which rule applies to default parameters?", options: ["Must come before non-default parameters", "Must follow non-default parameters", "Can appear anywhere", "Are not allowed in Python"], answerIndex: 1 },
            { question: "What are keyword arguments?", options: ["Arguments passed by parameter name", "Reserved words", "Function names", "Global variables"], answerIndex: 0 },
            { question: "Which is a valid keyword argument call?", options: ["add(5,10)", "add(a=5,b=10)", "add(=5,=10)", "add(a,b)"], answerIndex: 1 },
          ],
        procedure: [
          "Read the Aim and Theory to understand function definitions, parameters, and variable scopes",
          "Note the syntax for defining functions, returning values, and using *args / **kwargs",
          "Differentiate between passing by value/reference and how Python variables bind to objects",
          "Go to Simulation tab and click Start",
          "Step through the code execution using Next",
          "Observe how the execution jumps from call site to the function definition and back",
          "Check how local variables appear and disappear from scope in the Memory State panel",
          "Go to Code Test tab to see the preloaded function exercises",
          "Click Run Code to see output",
          "Modify the script to define a function that calculates the factorial of a number recursively",
          "Implement a function that accepts any number of numeric arguments and returns their average using *args",
          "Experiment with modifying a global counter variable inside a function using the global keyword",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Function Simulation\nglobal_val = 10\n\ndef calc_interest(principal, rate=5.0):\n    interest = (principal * rate) / 100\n    return interest\n\ndef update_global():\n    global global_val\n    global_val = 20\n\ni1 = calc_interest(1000)\ni2 = calc_interest(1000, 7.5)\nupdate_global()",
          steps: [
            { line: 2, annotation: "global_val = 10 — defines a global variable", memory: [{ variable: "global_val", type: "int", value: "10" }], output: "" },
            { line: 4, annotation: "def calc_interest(...) — interpreter registers function in memory (does not run yet)", memory: [{ variable: "global_val", type: "int", value: "10" }], output: "" },
            { line: 8, annotation: "def update_global() — interpreter registers second function in memory", memory: [], output: "" },
            { line: 11, annotation: "i1 = calc_interest(1000) — calls function. principal = 1000, rate defaults to 5.0", memory: [{ variable: "principal", type: "int", value: "1000" }, { variable: "rate", type: "float", value: "5.0" }], output: "" },
            { line: 5, annotation: "interest = (1000 * 5.0) / 100 = 50.0", memory: [{ variable: "interest", type: "float", value: "50.0" }], output: "" },
            { line: 6, annotation: "return 50.0 — returns value to caller. Local scope is destroyed.", memory: [{ variable: "global_val", type: "int", value: "10" }, { variable: "i1", type: "float", value: "50.0" }], output: "" },
            { line: 12, annotation: "i2 = calc_interest(1000, 7.5) — calls function with custom rate", memory: [{ variable: "principal", type: "int", value: "1000" }, { variable: "rate", type: "float", value: "7.5" }], output: "" },
            { line: 5, annotation: "interest = (1000 * 7.5) / 100 = 75.0", memory: [{ variable: "interest", type: "float", value: "75.0" }], output: "" },
            { line: 6, annotation: "return 75.0 — returns value. Local scope is destroyed.", memory: [{ variable: "global_val", type: "int", value: "10" }, { variable: "i1", type: "float", value: "50.0" }, { variable: "i2", type: "float", value: "75.0" }], output: "" },
            { line: 13, annotation: "update_global() — calls function to modify global variable", memory: [], output: "" },
            { line: 9, annotation: "global global_val — references the global scope variable", memory: [], output: "" },
            { line: 10, annotation: "global_val = 20 — modifies global variable to 20", memory: [{ variable: "global_val", type: "int", value: "20" }], output: "" }
          ]
        },
        posttest: [
            { question: "What is the benefit of keyword arguments?", options: ["Faster execution", "Less memory usage", "Arguments can be passed in any order", "Prevent function calls"], answerIndex: 2 },
            { question: "What does *args allow?", options: ["Multiple keyword arguments", "Multiple return values", "Any number of positional arguments", "Only integer arguments"], answerIndex: 2 },
            { question: "Inside a function, *args is stored as a:", options: ["List", "Tuple", "Dictionary", "Set"], answerIndex: 1 },
            { question: "What does **kwargs allow?", options: ["Positional arguments only", "Any number of keyword arguments", "Multiple loops", "Multiple returns"], answerIndex: 1 },
            { question: "Inside a function, **kwargs is stored as a:", options: ["Tuple", "List", "Dictionary", "String"], answerIndex: 2 },
            { question: "What is local scope?", options: ["Variables available everywhere", "Variables created inside a function", "Variables inside modules only", "Class variables"], answerIndex: 1 },
            { question: "Can a local variable be accessed outside its function?", options: ["Always", "Sometimes", "No", "Only with return"], answerIndex: 2 },
            { question: "What is global scope?", options: ["Variables defined in the main body of a script", "Variables inside loops", "Variables inside classes only", "Variables inside functions only"], answerIndex: 0 },
            { question: "Which keyword is used to modify a global variable inside a function?", options: ["public", "extern", "global", "static"], answerIndex: 2 },
            { question: "What is the output?", options: ["5", "23", "add", "Error"], answerIndex: 0 },
            { question: "What is the output?", options: ["0", "False", "None", "Error"], answerIndex: 2 },
            { question: "What is printed?", options: ["10", "Error", "None", "test"], answerIndex: 0 },
            { question: "Which statement about global variables is true?", options: ["They can be read inside functions", "They cannot be accessed inside functions", "They are local variables", "They must use return"], answerIndex: 0 },
            { question: "What will happen without the global keyword when modifying a global variable inside a function?", options: ["Global variable is updated", "Python creates a new local variable", "Program crashes", "Function is ignored"], answerIndex: 1 },
            { question: "Which feature makes functions useful in large programs?", options: ["Reusability", "Increased repetition", "More syntax errors", "Less organization"], answerIndex: 0 },
          ],
        references: [
          "Python Tutorial — Defining Functions: https://docs.python.org/3/tutorial/controlflow.html#defining-functions",
          "W3Schools Python Functions: https://www.w3schools.com/python/python_functions.asp",
          "Sweigart A., Automate the Boring Stuff with Python"
        ]
      }
    }
  ]
};
