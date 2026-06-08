import type { Week } from "./course-data";

export const pythonExercise10: Week = {
  title: "EXERCISE 10",
  objective: "Handling runtime errors in Python programs using try, except, else, and finally blocks, and raising custom exceptions.",
  tutorial: "Tutorial 10: Exception Handling",
  labTitle: "Lab 10: Exception Handling",
  experiments: [
    {
      id: "py-e10-1",
      title: "Exception Handling",
      desc: "Write a Python program to demonstrate division of two numbers with exception handling for ZeroDivisionError and ValueError.",
      expected: "Result: 5.0\nDivision successful!\nExecution completed.\nError: Cannot divide by zero!\nExecution completed.",
      content: {
        aim: {
          text: "In this experiment the student will learn how to make programs robust by handling runtime errors (exceptions) gracefully. The student will use try, except, else, and finally blocks to catch built-in errors and execute cleanup routines.",
          bullets: [
            "Differentiate between syntax errors and exceptions (runtime errors)",
            "Use try-except blocks to intercept and handle specific exceptions like ZeroDivisionError and ValueError",
            "Handle multiple exceptions separately or in a single block",
            "Use the else block to execute code only if no exceptions occurred in the try block",
            "Use the finally block to execute cleanup code regardless of whether an exception occurred",
            "Raise exceptions manually using the raise keyword"
          ]
        },
        theory: [
          {
            title: "Exceptions in Python",
            body: [
              "Even if a statement is syntactically correct, it may cause an error when executed. Errors detected during execution are called exceptions.",
              "Common built-in exceptions include:",
              "ZeroDivisionError: Raised when the second operand of division or modulus is zero.",
              "ValueError: Raised when a function receives an argument of the correct type but inappropriate value (e.g. int('hello')).",
              "TypeError: Raised when an operation is applied to an object of inappropriate type.",
              "FileNotFoundError: Raised when an input file cannot be found."
            ]
          },
          {
            title: "The try-except Structure",
            body: [
              "We wrap code that might raise exceptions in a try block. If an exception occurs, execution of the try block halts, and the interpreter searches for a matching except block.",
              "Syntax:",
              "try:",
              "    # code that might raise exceptions",
              "except ZeroDivisionError:",
              "    # handle division by zero",
              "except ValueError as e:",
              "    # handle invalid value, binding the error to variable e"
            ]
          },
          {
            title: "The else and finally Blocks",
            body: [
              "else block: Runs if the code inside the try block executes successfully without raising any exceptions.",
              "finally block: Always executes before leaving the try-except statement, whether an exception occurred or not. It is typically used for releasing external resources (like closing files or network sockets)."
            ]
          },
          {
            title: "Raising Exceptions",
            body: [
              "The raise statement allows the programmer to force a specific exception to occur.",
              "Syntax: raise ValueError('Invalid input value')"
            ]
          }
        ],
        pretest: [
          { question: "What is the difference between a Syntax Error and an Exception?", options: ["Syntax errors happen at runtime; exceptions happen at compile time", "Syntax errors are code structural mistakes; exceptions are runtime errors", "They are the same thing", "Exceptions only happen in loops"], answerIndex: 1, hint: "Syntax errors are caught by the parser before running; exceptions happen while the code is running." },
          { question: "Which block contains code that might raise an exception?", options: ["try", "except", "else", "finally"], answerIndex: 0, hint: "You 'try' running this code, hoping it doesn't fail." },
          { question: "Which block always executes, regardless of whether an exception occurred?", options: ["try", "except", "else", "finally"], answerIndex: 3, hint: "It provides the final cleanup phase." },
          { question: "What error is raised by: 10 / 0?", options: ["ValueError", "ZeroDivisionError", "ArithmeticError", "TypeError"], answerIndex: 1, hint: "Dividing by zero is mathematically undefined." },
          { question: "What statement is used to trigger an exception manually?", options: ["throw", "raise", "trigger", "except"], answerIndex: 1, hint: "In Python, we 'raise' exceptions rather than 'throwing' them." }
        ],
        procedure: [
          "Read the Aim and Theory to understand exceptions, built-in exception types, and try-except control flow",
          "Note the functions of the else and finally blocks",
          "Observe how the interpreter routes control from the error line to the corresponding except block",
          "Go to Simulation tab and click Start",
          "Step through the simulation using Next",
          "Observe two runs: one with valid inputs showing try -> else -> finally, and one with division by zero showing try -> except -> finally",
          "Go to Code Test tab and run the preloaded program",
          "Verify the division outputs and the execution of finally blocks",
          "Modify the script to accept an age input and raise a ValueError if age is negative",
          "Implement a function that attempts to open a file and uses try-except-finally to handle FileNotFoundError and print a closing message",
          "Practice catching multiple exceptions in a single except block: except (ValueError, TypeError):",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Exception Handling Simulation\n# Run 1: Successful Division\ntry:\n    a = 10\n    b = 2\n    ans = a / b\nexcept ZeroDivisionError:\n    ans = None\n    print('Zero division error!')\nelse:\n    print('Result:', ans)\nfinally:\n    print('Execution completed.')",
          steps: [
            { line: 3, annotation: "try block starts", memory: [], output: "" },
            { line: 4, annotation: "a = 10 — assigns integer 10", memory: [{ variable: "a", type: "int", value: "10" }], output: "" },
            { line: 5, annotation: "b = 2 — assigns integer 2", memory: [{ variable: "a", type: "int", value: "10" }, { variable: "b", type: "int", value: "2" }], output: "" },
            { line: 6, annotation: "ans = a / b = 10 / 2 = 5.0 (No exception is raised)", memory: [{ variable: "ans", type: "float", value: "5.0" }], output: "" },
            { line: 7, annotation: "except ZeroDivisionError is skipped because no exception occurred", memory: [], output: "" },
            { line: 10, annotation: "else block runs because try completed successfully", memory: [], output: "Result: 5.0\n" },
            { line: 12, annotation: "finally block executes always", memory: [], output: "Result: 5.0\nExecution completed.\n" }
          ]
        },
        posttest: [
          { question: "What is the output of: try: print(1); except: print(2); else: print(3); finally: print(4)", options: ["1 2 4", "1 3 4", "1 4", "1 2 3 4"], answerIndex: 1, hint: "Since no error occurred in try, it prints 1, then the else block prints 3, and finally prints 4." },
          { question: "Can a single try block have multiple except blocks?", options: ["No, only one is allowed", "Yes, to handle different types of exceptions separately", "Only if they are nested", "Yes, but only if they handle the same exception"], answerIndex: 1, hint: "You can match different exceptions with separate except statements." },
          { question: "What happens if an exception occurs but is not caught by any except block?", options: ["The program continues silently", "The program terminates and displays a traceback of the error", "The finally block is skipped", "The interpreter ignores the line and moves forward"], answerIndex: 1, hint: "Uncaught exceptions crash the program with an error message." },
          { question: "Which exception is raised when you try to access a dictionary key that does not exist?", options: ["IndexError", "KeyError", "LookupError", "ValueError"], answerIndex: 1, hint: "It indicates a missing dictionary key." },
          { question: "What is the base class for all built-in exceptions in Python?", options: ["BaseException", "Exception", "Error", "StandardError"], answerIndex: 0, hint: "BaseException is the root, though most user exceptions inherit from Exception." }
        ],
        references: [
          "Python Tutorial — Errors and Exceptions: https://docs.python.org/3/tutorial/errors.html",
          "W3Schools Python Try Except: https://www.w3schools.com/python/python_try_except.asp",
          "Lutz M., Learning Python, 5th Edition"
        ]
      }
    }
  ]
};
