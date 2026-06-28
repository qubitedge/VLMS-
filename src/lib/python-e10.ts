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
            { question: "What is an exception in Python?", options: ["A comment in code", "An error detected during execution", "A loop statement", "A function call"], answerIndex: 1 },
            { question: "Which exception occurs when dividing by zero?", options: ["ValueError", "TypeError", "ZeroDivisionError", "FileNotFoundError"], answerIndex: 2 },
            { question: "What exception is raised by int(\"hello\")?", options: ["TypeError", "ValueError", "NameError", "IndexError"], answerIndex: 1 },
            { question: "Which exception occurs when an operation is applied to an inappropriate type?", options: ["FileNotFoundError", "TypeError", "ValueError", "KeyError"], answerIndex: 1 },
            { question: "What exception is raised when a file cannot be found?", options: ["FileNotFoundError", "IOError", "ValueError", "TypeError"], answerIndex: 0 },
            { question: "Which block contains code that may raise an exception?", options: ["except", "finally", "try", "else"], answerIndex: 2 },
            { question: "Which keyword is used to handle exceptions?", options: ["catch", "except", "handle", "error"], answerIndex: 1 },
            { question: "What happens when an exception occurs inside a try block?", options: ["Program immediately stops", "Execution moves to a matching except block", "finally block is skipped", "The exception is ignored"], answerIndex: 1 },
            { question: "What is the correct structure?", options: ["try-catch", "try-except", "catch-finally", "try-handle"], answerIndex: 1 },
            { question: "Which block handles a ZeroDivisionError?", options: ["ValueError", "TypeError", "ZeroDivisionError", "NameError"], answerIndex: 2 },
            { question: "What is printed?", options: ["Error", "5.0", "10", "Nothing"], answerIndex: 1 },
            { question: "Which keyword allows access to the exception object?", options: ["as", "in", "with", "from"], answerIndex: 0 },
            { question: "What does except ValueError as e: do?", options: ["Creates a variable", "Stores the exception object in e", "Ignores exceptions", "Raises an exception"], answerIndex: 1 },
            { question: "Which block executes if no exception occurs?", options: ["except", "finally", "else", "raise"], answerIndex: 2 },
            { question: "Which block always executes?", options: ["try", "else", "except", "finally"], answerIndex: 3 },
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
            { question: "What is the primary use of the finally block?", options: ["Creating variables", "Releasing resources", "Importing modules", "Declaring functions"], answerIndex: 1 },
            { question: "Which statement about finally is TRUE?", options: ["Runs only if an exception occurs", "Runs only if no exception occurs", "Always executes", "Is optional but never used"], answerIndex: 2 },
            { question: "What is printed?", options: ["Hello", "Done", "Hello Done", "Error"], answerIndex: 2 },
            { question: "What is printed?", options: ["10", "Division Error", "Error", "Nothing"], answerIndex: 1 },
            { question: "Which keyword is used to deliberately generate an exception?", options: ["except", "try", "raise", "finally"], answerIndex: 2 },
            { question: "What is the purpose of the raise statement?", options: ["Ignore errors", "Create loops", "Force an exception to occur", "Close files"], answerIndex: 2 },
            { question: "Which statement raises a ValueError?", options: ["throw ValueError()", "raise ValueError(\"Invalid input\")", "error ValueError()", "exception ValueError()"], answerIndex: 1 },
            { question: "What happens if no matching except block exists?", options: ["The exception is ignored", "Program terminates with an error", "else block handles it", "finally block fixes it"], answerIndex: 1 },
            { question: "Which exception is likely from this code?", options: ["ValueError", "ZeroDivisionError", "TypeError", "NameError"], answerIndex: 2 },
            { question: "What exception is raised?", options: ["TypeError", "ValueError", "KeyError", "IndexError"], answerIndex: 1 },
            { question: "What is printed?", options: ["A", "B", "A B", "Error"], answerIndex: 2 },
            { question: "Which exception is associated with missing files?", options: ["FileNotFoundError", "ImportError", "ValueError", "TypeError"], answerIndex: 0 },
            { question: "What is the output?", options: ["5", "Success", "5 Success", "Error"], answerIndex: 2 },
            { question: "Why is exception handling important?", options: ["Makes code longer", "Prevents program crashes and handles errors gracefully", "Removes variables", "Speeds up loops"], answerIndex: 1 },
            { question: "Which order is correct?", options: ["try \u2192 finally \u2192 except", "try \u2192 except \u2192 else \u2192 finally", "except \u2192 try \u2192 finally", "try \u2192 else \u2192 except"], answerIndex: 1 },
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
