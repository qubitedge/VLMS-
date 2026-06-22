import type { Week } from "./course-data";

export const pythonExercise2: Week = {
  title: "EXERCISE 2",
  objective: "Understanding Python variables, data types (int, float, str, bool), type conversion, and arithmetic, relational, logical, and assignment operators.",
  tutorial: "Tutorial 2: Variables, Data Types, and Operators",
  labTitle: "Lab 2: Variables, Data Types, and Operators",
  experiments: [
    {
      id: "py-e2-1",
      title: "Working with Variables, Data Types, and Operators",
      desc: "Write a Python program to declare variables of different data types, perform arithmetic operations, and demonstrate type conversion.",
      expected: "Sum: 15\nDifference: 5\nProduct: 50\nQuotient: 2.0\nFloor Division: 2\nModulus: 0\nPower: 100000\nType of x: <class 'int'>",
      content: {
        aim: {
          text: "In this experiment the student will explore Python variables, understand dynamic typing, work with fundamental data types (int, float, str, bool), perform arithmetic and logical operations, and apply type conversion functions to transform data between types.",
          bullets: [
            "Understand that Python variables do not require explicit type declaration — types are inferred at runtime",
            "Identify and use the four fundamental data types: int, float, str, and bool",
            "Perform arithmetic operations using +, -, *, /, //, %, and ** operators",
            "Use comparison operators (==, !=, <, >, <=, >=) and logical operators (and, or, not)",
            "Apply type conversion functions: int(), float(), str(), bool()"
          ]
        },
        theory: [
          {
            title: "Variables in Python",
            body: [
              "A variable in Python is a name that refers to a value stored in memory. Unlike C or Java, Python does not require you to declare the type of a variable — the type is automatically determined based on the value assigned.",
              "Variable naming rules: must start with a letter or underscore, can contain letters, digits, and underscores, cannot be a Python keyword, and are case-sensitive (age and Age are different variables)."
            ]
          },
          {
            title: "Fundamental Data Types",
            body: [
              "int — Integer numbers (whole numbers) with no size limit: x = 42, y = -7, z = 0",
              "float — Floating-point numbers (decimal numbers): pi = 3.14159, rate = 0.05",
              "str — Strings (sequences of characters) enclosed in single or double quotes: name = 'Python', greeting = \"Hello\"",
              "bool — Boolean values representing True or False: is_active = True, has_error = False",
              "You can check the type of any variable using the type() function: type(42) returns <class 'int'>."
            ]
          },
          {
            title: "Arithmetic Operators",
            body: [
              "Python provides seven arithmetic operators:",
              "Addition (+): 10 + 5 = 15",
              "Subtraction (-): 10 - 5 = 5",
              "Multiplication (*): 10 * 5 = 50",
              "Division (/): 10 / 5 = 2.0 (always returns float)",
              "Floor Division (//): 10 // 3 = 3 (returns integer part only)",
              "Modulus (%): 10 % 3 = 1 (returns remainder)",
              "Exponentiation (**): 10 ** 5 = 100000 (power operator)"
            ]
          },
          {
            title: "Type Conversion",
            body: [
              "Python provides built-in functions to convert between data types:",
              "int('42') converts string '42' to integer 42",
              "float(42) converts integer 42 to float 42.0",
              "str(42) converts integer 42 to string '42'",
              "bool(0) returns False, bool(1) returns True, bool('') returns False, bool('hello') returns True",
              "Important: int('hello') raises a ValueError because 'hello' cannot be converted to an integer."
            ]
          },
          {
            title: "Dynamic Typing",
            body: [
              "Python is dynamically typed — a variable can change its type during execution. For example: x = 10 (int), then x = 'hello' (now str). The same variable name now refers to a string object. This is different from C where int x = 10; permanently binds x to the int type."
            ]
          }
        ],
        pretest: [
            { question: "A variable in Python is:", options: ["a fixed hardware unit", "a name that refers to a value", "always an integer", "a keyword only"], answerIndex: 1 },
            { question: "Python variable types are:", options: ["manually declared before assignment", "determined automatically from assigned values", "always string", "always integer"], answerIndex: 1 },
            { question: "A Python variable name must start with:", options: ["a digit only", "a special symbol only", "a letter or underscore", "a space"], answerIndex: 2 },
            { question: "Which is a valid variable name?", options: ["2name", "my-var", "_count", "class"], answerIndex: 2 },
            { question: "Variable names in Python are:", options: ["not case-sensitive", "case-sensitive", "always uppercase", "always lowercase"], answerIndex: 1 },
            { question: "age and Age are:", options: ["syntax errors", "same variables", "different variables", "keywords"], answerIndex: 2 },
            { question: "Which data type represents whole numbers?", options: ["float", "str", "int", "bool"], answerIndex: 2 },
            { question: "Which data type represents decimal numbers?", options: ["str", "float", "bool", "tuple"], answerIndex: 1 },
            { question: "Which data type represents text?", options: ["int", "float", "str", "bool"], answerIndex: 2 },
            { question: "Which data type represents True or False values?", options: ["bool", "str", "list", "set"], answerIndex: 0 },
            { question: "The type of 42 is:", options: ["float", "str", "int", "bool"], answerIndex: 2 },
            { question: "The type() function is used to:", options: ["delete variables", "check the type of a value", "print only strings", "rename variables"], answerIndex: 1 },
            { question: "Which operator performs addition?", options: ["-", "*", "+", "//"], answerIndex: 2 },
            { question: "Which operator performs floor division?", options: ["/", "//", "%", "**"], answerIndex: 1 },
            { question: "What is the result of 10 / 5 in Python?", options: ["2", "2.0", "3", "5.0"], answerIndex: 1 },
          ],
        procedure: [
          "Read the Aim and Theory sections carefully to understand Python's dynamic typing and data types",
          "Manually work through the following expressions on paper: 17 // 5, 17 % 5, 2 ** 10, type(3.14)",
          "Verify: 17 // 5 = 3 (floor division), 17 % 5 = 2 (remainder), 2 ** 10 = 1024, type(3.14) = <class 'float'>",
          "Go to Simulation tab and click Start",
          "Press Next step by step and observe variables being created in the Memory State panel",
          "Watch how the type of each variable is displayed alongside its value",
          "Observe how arithmetic operations produce results and how division always returns a float",
          "Go to Code Test tab — starter code is pre-loaded",
          "Click Run Code to execute the program",
          "Verify the arithmetic outputs match the expected results",
          "Try adding type conversion: print(int(3.7)) — verify it outputs 3 (truncation, not rounding)",
          "Try string concatenation: print('Age: ' + str(25)) — verify it outputs 'Age: 25'",
          "Experiment with boolean operations: print(True and False), print(not True), print(10 > 5 and 3 < 1)",
          "Try an invalid conversion: int('hello') — observe the ValueError message",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Variables and Data Types\nx = 10\ny = 5\n\n# Arithmetic Operations\nsum_val = x + y\ndiff = x - y\nproduct = x * y\nquotient = x / y\nfloor_div = x // y\nmod = x % y\npower = x ** y\n\nprint('Sum:', sum_val)\nprint('Type of x:', type(x))",
          steps: [
            { line: 2, annotation: "x = 10 — creates variable x with integer value 10", memory: [{ variable: "x", type: "int", value: "10" }], output: "" },
            { line: 3, annotation: "y = 5 — creates variable y with integer value 5", memory: [{ variable: "x", type: "int", value: "10" }, { variable: "y", type: "int", value: "5" }], output: "" },
            { line: 6, annotation: "sum_val = x + y = 10 + 5 = 15", memory: [{ variable: "x", type: "int", value: "10" }, { variable: "y", type: "int", value: "5" }, { variable: "sum_val", type: "int", value: "15" }], output: "" },
            { line: 7, annotation: "diff = x - y = 10 - 5 = 5", memory: [{ variable: "x", type: "int", value: "10" }, { variable: "y", type: "int", value: "5" }, { variable: "sum_val", type: "int", value: "15" }, { variable: "diff", type: "int", value: "5" }], output: "" },
            { line: 8, annotation: "product = x * y = 10 * 5 = 50", memory: [{ variable: "product", type: "int", value: "50" }], output: "" },
            { line: 9, annotation: "quotient = x / y = 10 / 5 = 2.0 (division always returns float)", memory: [{ variable: "quotient", type: "float", value: "2.0" }], output: "" },
            { line: 10, annotation: "floor_div = x // y = 10 // 5 = 2 (integer division)", memory: [{ variable: "floor_div", type: "int", value: "2" }], output: "" },
            { line: 11, annotation: "mod = x % y = 10 % 5 = 0 (no remainder)", memory: [{ variable: "mod", type: "int", value: "0" }], output: "" },
            { line: 12, annotation: "power = x ** y = 10 ** 5 = 100000", memory: [{ variable: "power", type: "int", value: "100000" }], output: "" },
            { line: 14, annotation: "print('Sum:', sum_val) displays Sum: 15", memory: [], output: "Sum: 15\n" },
            { line: 15, annotation: "print('Type of x:', type(x)) displays the type of x", memory: [], output: "Sum: 15\nType of x: <class 'int'>\n" }
          ]
        },
        posttest: [
            { question: "What is the result of 10 // 3?", options: ["3", "3.33", "1", "4"], answerIndex: 0 },
            { question: "What does the modulus operator % return?", options: ["quotient", "remainder", "product", "power"], answerIndex: 1 },
            { question: "Which operator is used for exponentiation?", options: ["^", "**", "//", "%%"], answerIndex: 1 },
            { question: "int('42') returns:", options: ["'42'", "42.0", "42", "True"], answerIndex: 2 },
            { question: "float(42) returns:", options: ["'42'", "42", "42.0", "False"], answerIndex: 2 },
            { question: "str(42) returns:", options: ["42", "'42'", "42.0", "True"], answerIndex: 1 },
            { question: "bool(0) returns:", options: ["True", "False", "0", "None"], answerIndex: 1 },
            { question: "bool('hello') returns:", options: ["False", "0", "True", "error"], answerIndex: 2 },
            { question: "int('hello') raises:", options: ["TypeError", "NameError", "ValueError", "ZeroDivisionError"], answerIndex: 2 },
            { question: "Python is dynamically typed, meaning:", options: ["a variable cannot change type", "types are fixed at compile time", "a variable can refer to values of different types during execution", "only strings are allowed"], answerIndex: 2 },
            { question: "After x = 10 and then x = 'hello', x becomes:", options: ["still int", "str", "bool", "invalid"], answerIndex: 1 },
            { question: "Which is NOT a valid fundamental data type from the lesson?", options: ["int", "float", "str", "header"], answerIndex: 3 },
            { question: "Which operator gives the remainder of division?", options: ["/", "*", "%", "+"], answerIndex: 2 },
            { question: "Which statement is correct?", options: ["Python variables require explicit type declaration", "Python variable names can be keywords", "Python variables are case-sensitive", "Variables must start with numbers"], answerIndex: 2 },
            { question: "Which conversion returns a string?", options: ["str(42)", "int('42')", "float(42)", "bool(1)"], answerIndex: 0 },
          ],
        references: [
          "Python Official Documentation — Built-in Types: https://docs.python.org/3/library/stdtypes.html",
          "Lutz M., Learning Python, 5th Edition, O'Reilly Media, 2013",
          "Downey A., Think Python, 2nd Edition, O'Reilly Media",
          "JNTUGV Python Programming Lab Syllabus",
          "Python Software Foundation: https://www.python.org/"
        ]
      }
    }
  ]
};
