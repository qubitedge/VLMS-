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
          { question: "Which of the following is a valid Python variable name?", options: ["2name", "my-var", "_count", "class"], answerIndex: 2, hint: "Variable names must start with a letter or underscore and cannot be Python keywords." },
          { question: "What is the result of 10 / 3 in Python 3?", options: ["3", "3.3333333333333335", "3.0", "Error"], answerIndex: 1, hint: "In Python 3, the / operator always returns a float, even for integer operands." },
          { question: "What does the type() function return for the value True?", options: ["<class 'int'>", "<class 'str'>", "<class 'bool'>", "<class 'float'>"], answerIndex: 2, hint: "True and False are the only two values of Python's boolean type." },
          { question: "Which operator is used for exponentiation (power) in Python?", options: ["^", "**", "pow", "//"], answerIndex: 1, hint: "The ^ operator in Python is bitwise XOR, not power. Python uses ** for exponentiation." },
          { question: "What happens when you assign x = 10 and then x = 'hello'?", options: ["Error — type mismatch", "x becomes 'hello' — Python allows dynamic typing", "x remains 10", "Both values are stored in x"], answerIndex: 1, hint: "Python is dynamically typed — variables can change their type at any time." }
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
          { question: "What is the output of print(17 // 5)?", options: ["3.4", "3", "4", "2"], answerIndex: 1, hint: "The // operator performs floor division — it discards the decimal part." },
          { question: "What does bool('') return?", options: ["True", "False", "Error", "None"], answerIndex: 1, hint: "An empty string is considered 'falsy' in Python — it converts to False." },
          { question: "What is the result of int(3.9)?", options: ["4", "3", "3.0", "Error"], answerIndex: 1, hint: "int() truncates the decimal part — it does NOT round. It always removes everything after the decimal point." },
          { question: "Which of the following expressions evaluates to True?", options: ["5 > 3 and 2 > 4", "not True", "5 == 5 or 3 > 10", "False and True"], answerIndex: 2, hint: "The 'or' operator returns True if at least one operand is True. 5 == 5 is True." },
          { question: "What error does int('hello') produce?", options: ["TypeError", "ValueError", "SyntaxError", "NameError"], answerIndex: 1, hint: "The value 'hello' is a valid string, but it cannot be interpreted as an integer — hence ValueError." }
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
