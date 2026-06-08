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
          { question: "Which keyword is used to define a function in Python?", options: ["function", "def", "func", "define"], answerIndex: 1, hint: "It is a three-letter keyword short for definition." },
          { question: "What does a function return by default if there is no return statement?", options: ["0", "False", "None", "Error"], answerIndex: 2, hint: "Python uses a special constant to represent the absence of a value." },
          { question: "In a function definition, where must default parameters be placed?", options: ["Before non-default parameters", "After non-default parameters", "Anywhere", "Default parameters are not allowed in Python"], answerIndex: 1, hint: "Non-default parameters must be listed first, otherwise Python returns a syntax error." },
          { question: "What is the type of *args inside a function?", options: ["list", "dict", "tuple", "set"], answerIndex: 2, hint: "Positional arguments are packed into an immutable sequence." },
          { question: "What keyword allows you to modify a variable outside the function's scope?", options: ["external", "outer", "global", "public"], answerIndex: 2, hint: "It declares that a variable refers to the module-level namespace." }
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
          { question: "What is the type of **kwargs inside a function?", options: ["list", "tuple", "set", "dict"], answerIndex: 3, hint: "Keyword arguments are gathered into a mapping of key-value pairs." },
          { question: "What is the output of the following code? def add(a, b=2): return a + b; print(add(b=4, a=1))", options: ["3", "5", "6", "Error"], answerIndex: 1, hint: "The function is called using keyword arguments in reversed order: a = 1, b = 4. 1 + 4 = 5." },
          { question: "If a function modifies a list passed as an argument, are the changes visible outside the function?", options: ["Yes, because lists are mutable", "No, because Python passes variables by value", "Only if the return statement is used", "Only if list is declared global"], answerIndex: 0, hint: "Python uses 'pass-by-object-reference'. Changes to mutable objects are reflected outside." },
          { question: "Can a function return multiple values in Python?", options: ["No, only one value can be returned", "Yes, by returning them separated by commas (which packs them into a tuple)", "Yes, but only if they are of the same type", "Yes, using multiple return statements consecutively"], answerIndex: 1, hint: "For example, 'return a, b' returns a single tuple containing both variables." },
          { question: "Which of the following describes a lambda function?", options: ["A function defined with def", "An anonymous, single-expression function", "A function that has no arguments", "A function that cannot return values"], answerIndex: 1, hint: "Lambda functions are small, anonymous functions defined with the lambda keyword." }
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
