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
            { question: "Which function is used to read user input in Python?", options: ["read()", "get()", "input()", "scanf()"], answerIndex: 2 },
            { question: "The input() function reads data from:", options: ["RAM only", "standard input", "compiler cache", "output stream"], answerIndex: 1 },
            { question: "input() always returns data as:", options: ["int", "float", "bool", "str"], answerIndex: 3 },
            { question: "If a user enters 45 through input(), Python initially stores it as:", options: ["integer 45", "string '45'", "float 45.0", "boolean True"], answerIndex: 1 },
            { question: "To convert user age input into an integer, use:", options: ["str(input())", "bool(input())", "int(input())", "list(input())"], answerIndex: 2 },
            { question: "To convert height input into decimal form, use:", options: ["float(input())", "int(input())", "str(input())", "tuple(input())"], answerIndex: 0 },
            { question: "If int() receives non-numeric text like 'twenty', it raises:", options: ["NameError", "ValueError", "ZeroDivisionError", "SyntaxError"], answerIndex: 1 },
            { question: "The syntax of input is:", options: ["input[value]", "input{prompt}", "input(prompt)", "read(prompt)"], answerIndex: 2 },
            { question: "A prompt in input() is:", options: ["mandatory in all cases", "optional", "forbidden", "only numeric"], answerIndex: 1 },
            { question: "F-strings were introduced in Python:", options: ["2.7", "3.0", "3.6", "4.0"], answerIndex: 2 },
            { question: "To create an f-string, prefix the string with:", options: ["p", "x", "f", "s"], answerIndex: 2 },
            { question: "In an f-string, expressions are placed inside:", options: ["square brackets", "parentheses", "angle brackets", "curly braces"], answerIndex: 3 },
            { question: "Which is an example of an f-string?", options: ["'Hello, {}'.name", "f'Hello, {name}!'", "Hello(name)", "format('Hello')"], answerIndex: 1 },
            { question: "F-strings are evaluated:", options: ["before installation", "at runtime", "only by compiler", "never"], answerIndex: 1 },
            { question: "Compared to older formatting methods, f-strings are generally:", options: ["slower and harder to read", "faster and more readable", "invalid in Python 3", "only for integers"], answerIndex: 1 },
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
            { question: "Before f-strings, a common formatting method was:", options: ["split()", "append()", "format()", "replace()"], answerIndex: 2 },
            { question: "'Hello, {}!'.format('Bob') outputs:", options: ["Hello, format!", "Hello, Bob!", "{} Bob", "Error"], answerIndex: 1 },
            { question: "Placeholders in format() are written as:", options: ["[]", "()", "{}", "<>"], answerIndex: 2 },
            { question: "Which is valid named or numbered formatting?", options: ["'I like {0} and {1}'.format('apples', 'bananas')", "'I like []'.format('apples')", "'I like <>'.format('apples')", "'I like ()'.format('apples')"], answerIndex: 0 },
            { question: "To use user input in arithmetic, you usually need:", options: ["indentation", "type casting", "slicing", "inheritance"], answerIndex: 1 },
            { question: "What is the type of the result of input('Enter: ')?", options: ["always str", "always int", "always float", "always bool"], answerIndex: 0 },
            { question: "Which statement is correct?", options: ["input() automatically detects integers", "input() always returns string data", "input() returns bytes", "input() returns float by default"], answerIndex: 1 },
            { question: "Which code correctly reads an integer age?", options: ["age = input(int('Enter age'))", "age = int(input('Enter age: '))", "age = float('Enter age: ')", "age = str(input(int))"], answerIndex: 1 },
            { question: "Which code correctly reads a decimal number?", options: ["x = bool(input())", "x = str(input())", "x = float(input())", "x = list(input())"], answerIndex: 2 },
            { question: "Which formatting style directly embeds expressions inside the string?", options: ["comments", "f-strings", "readlines", "import"], answerIndex: 1 },
            { question: "In f'Hello, {name}!', name is:", options: ["a keyword", "a comment", "an embedded expression/variable", "a module"], answerIndex: 2 },
            { question: "Which statement about format() is true?", options: ["It cannot use placeholders", "It is older than f-strings", "It only works for numbers", "It is invalid in Python 3"], answerIndex: 1 },
            { question: "Which of the following is a possible problem with int(input())?", options: ["It always returns bool", "It may raise ValueError", "It deletes user input", "It creates a file"], answerIndex: 1 },
            { question: "The purpose of type casting input is to:", options: ["reverse strings", "convert string data into needed numeric types", "import modules", "close files"], answerIndex: 1 },
            { question: "Which output is correct for name = 'Bob'; print(f'Hello, {name}!')?", options: ["Hello, {name}!", "Hello, Bob!", "name = Bob", "{Bob}"], answerIndex: 1 },
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
