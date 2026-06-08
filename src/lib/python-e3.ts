import type { Week } from "./course-data";

export const pythonExercise3: Week = {
  title: "EXERCISE 3",
  objective: "Understanding Python input and output operations, reading user inputs with input(), type casting inputs, and formatting outputs using f-strings and format().",
  tutorial: "Tutorial 3: Input and Output Operations",
  labTitle: "Lab 3: Input and Output Operations",
  experiments: [
    {
      id: "py-e3-1",
      title: "Input and Output Operations",
      desc: "Write a Python program to read user inputs, perform type casting, and display formatted outputs using f-strings.",
      expected: "Name: Alice\nAge: 20\nIn 5 years, Alice will be 25 years old.",
      content: {
        aim: {
          text: "In this experiment the student will learn how to read data from the user using the input() function, convert the input to appropriate data types, and display formatted output using f-strings and other formatting methods.",
          bullets: [
            "Use the input() function to read string inputs from the console",
            "Understand that input() always returns a string and requires explicit type casting for numeric values",
            "Use int() and float() to cast user inputs",
            "Format console outputs dynamically using f-strings (formatted string literals)",
            "Use the format() method and escape characters for output customization"
          ]
        },
        theory: [
          {
            title: "Reading Input in Python",
            body: [
              "In Python, the input() function is used to read a line of text from the standard input (usually the keyboard). It displays an optional prompt string and waits for the user to type some text and press Enter.",
              "Syntax: user_input = input(prompt)",
              "CRITICAL POINT: The input() function always reads the input as a string (str). Even if the user types a number like 45, input() returns the string '45'. To use it in calculations, it must be explicitly cast to a numeric type."
            ]
          },
          {
            title: "Type Casting Input",
            body: [
              "To perform arithmetic operations on input data, we must convert the string to an integer or float using type casting functions:",
              "age = int(input('Enter your age: ')) # Converts input to an integer",
              "height = float(input('Enter height in meters: ')) # Converts input to a float",
              "If the user enters a value that cannot be converted (e.g., 'twenty' for int()), Python raises a ValueError."
            ]
          },
          {
            title: "Output Formatting using F-Strings",
            body: [
              "Formatted String Literals (also called f-strings) were introduced in Python 3.6. They let you embed expressions inside string literals by prefixing the string with 'f' or 'F' and writing expressions inside curly braces {}.",
              "Example: name = 'Bob'; print(f'Hello, {name}!') outputs 'Hello, Bob!'",
              "F-strings are evaluated at runtime and are faster and more readable than the older % formatting or the .format() method."
            ]
          },
          {
            title: "The format() Method",
            body: [
              "Before f-strings, the str.format() method was the standard way to format strings. It uses placeholders {} in the template string and passes arguments to fill them.",
              "Example: 'Hello, {}!'.format('Bob') outputs 'Hello, Bob!'",
              "Placeholders can also use numbers or names: 'I like {0} and {1}'.format('apples', 'bananas')"
            ]
          }
        ],
        pretest: [
          { question: "What is the return type of the input() function in Python 3?", options: ["int", "float", "str", "depends on what the user types"], answerIndex: 2, hint: "Regardless of the input content, input() always returns text." },
          { question: "Which of the following is the correct syntax for an f-string?", options: ["f'Hello {name}'", "'Hello {name}'f", "format('Hello {name}')", "f('Hello {name}')"], answerIndex: 0, hint: "The 'f' prefix must go immediately before the starting quote of the string." },
          { question: "How do you read a floating-point number from the user?", options: ["float(input())", "input(float)", "readFloat()", "floatInput()"], answerIndex: 0, hint: "Wrap the string returned by input() in the float() conversion function." },
          { question: "What error is raised if you try to cast 'abc' to an integer using int()?", options: ["TypeError", "ValueError", "SyntaxError", "NameError"], answerIndex: 1, hint: "The string contains invalid characters for base 10 conversion." },
          { question: "What is the output of print('A', 'B', sep='\\n')?", options: ["A B", "AB", "A on one line, B on the next", "Error"], answerIndex: 2, hint: "The separator is a newline character, so it inserts a line break between arguments." }
        ],
        procedure: [
          "Read the Aim and Theory sections to understand how input() works and how f-strings format output",
          "Note that input() always yields a string, so math calculations require casting first",
          "Observe the syntax of f-strings: prefix with f and enclose variables in {}",
          "Go to Simulation tab and click Start",
          "Press Next to step through the code execution",
          "Observe how variables are created and populated during the execution flow",
          "Check how memory updates in the Memory State panel",
          "Go to Code Test tab where the starter program is loaded",
          "Click Run Code to test reading static mock values or inputs",
          "Modify the code to ask for a first name and last name, and print them joined together",
          "Modify the program to calculate the area of a rectangle: read length and width as floats, then print the formatted area",
          "Experiment with f-string float formatting, e.g., print(f'{3.14159:.2f}') to print pi to 2 decimal places",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Input and Output Simulation\nname = 'Alice'\nage_str = '20'\nage = int(age_str)\nfuture_age = age + 5\n\nprint('Name:', name)\nprint('Age:', age)\nprint(f'In 5 years, {name} will be {future_age} years old.')",
          steps: [
            { line: 2, annotation: "name = 'Alice' — simulates reading string input 'Alice'", memory: [{ variable: "name", type: "str", value: "'Alice'" }], output: "" },
            { line: 3, annotation: "age_str = '20' — simulates reading input as a string first", memory: [{ variable: "name", type: "str", value: "'Alice'" }, { variable: "age_str", type: "str", value: "'20'" }], output: "" },
            { line: 4, annotation: "age = int(age_str) — casts the string '20' to integer 20", memory: [{ variable: "name", type: "str", value: "'Alice'" }, { variable: "age_str", type: "str", value: "'20'" }, { variable: "age", type: "int", value: "20" }], output: "" },
            { line: 5, annotation: "future_age = age + 5 = 20 + 5 = 25", memory: [{ variable: "name", type: "str", value: "'Alice'" }, { variable: "age", type: "int", value: "20" }, { variable: "future_age", type: "int", value: "25" }], output: "" },
            { line: 7, annotation: "print('Name:', name) displays the name", memory: [], output: "Name: Alice\n" },
            { line: 8, annotation: "print('Age:', age) displays the age", memory: [], output: "Name: Alice\nAge: 20\n" },
            { line: 9, annotation: "print(f'In 5 years, {name} will be {future_age} years old.') displays formatted message", memory: [], output: "Name: Alice\nAge: 20\nIn 5 years, Alice will be 25 years old.\n" }
          ]
        },
        posttest: [
          { question: "What is the output of print(f'{10/3:.2f}')?", options: ["3.333333", "3.3", "3.33", "10/3"], answerIndex: 2, hint: "The formatting specification :.2f formats a float to 2 decimal places." },
          { question: "If user enters 15, what is the type of variable x after: x = input()?", options: ["int", "str", "float", "bool"], answerIndex: 1, hint: "No casting was applied, so it remains a string." },
          { question: "Which method is the most modern and recommended for string formatting in Python?", options: ["% formatting", "str.format()", "f-strings", "string.Template"], answerIndex: 2, hint: "f-strings are preferred for their speed, brevity, and readability." },
          { question: "How can you read two space-separated words from the user into two variables?", options: ["x, y = input().split()", "x, y = input()", "x = input(); y = input()", "x, y = split(input())"], answerIndex: 0, hint: "The split() string method divides a string by default on whitespace and returns a list." },
          { question: "What is the output of print('Hello', 'World', end='!!!')?", options: ["Hello World!!!\\n", "Hello World!!!", "HelloWorld!!!", "Hello\\nWorld!!!"], answerIndex: 1, hint: "The end parameter replaces the default newline character with the specified string." }
        ],
        references: [
          "Python Standard Library — Input/Output: https://docs.python.org/3/tutorial/inputoutput.html",
          "Lutz M., Learning Python, 5th Edition, O'Reilly Media, 2013",
          "W3Schools Python Input: https://www.w3schools.com/python/ref_func_input.asp"
        ]
      }
    }
  ]
};
