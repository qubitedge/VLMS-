import type { Week } from "./course-data";

export const pythonExercise4: Week = {
  title: "EXERCISE 4",
  objective: "Mastering conditional statements (if, elif, else) and comparison operators to implement decision-making logic in Python programs.",
  tutorial: "Tutorial 4: Conditional Statements",
  labTitle: "Lab 4: Conditional Statements",
  experiments: [
    {
      id: "py-e4-1",
      title: "Decision-making using Conditional Statements",
      desc: "Write a Python program that takes a number and checks if it is positive, negative, or zero using if-elif-else statements.",
      expected: "Enter a number: 10\n10 is a Positive number.",
      content: {
        aim: {
          text: "In this experiment the student will learn how to write programs that make decisions and execute different blocks of code based on logical conditions using if, elif, and else statements.",
          bullets: [
            "Understand the syntax of the if statement, the role of colons (:), and mandatory block indentation",
            "Differentiate between simple if, if-else, and multi-way if-elif-else branches",
            "Combine multiple conditions using comparison operators and logical operators (and, or, not)",
            "Implement nested conditional statements to handle hierarchical decision processes"
          ]
        },
        theory: [
          {
            title: "Conditional Statements in Python",
            body: [
              "Decision-making is required when we want to execute a set of statements only if a specific condition is met. Python uses if, elif, and else keywords for decision-making.",
              "Syntax of if-elif-else:",
              "if condition1:",
              "    # code block 1",
              "elif condition2:",
              "    # code block 2",
              "else:",
              "    # code block 3",
              "Python relies on indentation (usually 4 spaces) to define the scope of the code block. Semicolons or curly braces are not used."
            ]
          },
          {
            title: "The elif Keyword",
            body: [
              "The elif keyword is short for 'else if'. It is used to check multiple conditions sequentially. If the condition for 'if' is False, it checks the next 'elif' condition, and so on. If all conditions are False, the 'else' block is executed.",
              "Only the code block corresponding to the first True condition will run. Once a condition is matched, the rest of the chain is skipped."
            ]
          },
          {
            title: "Logical Operators in Conditions",
            body: [
              "We can combine multiple boolean expressions in a condition using logical operators:",
              "and: Returns True if both conditions are True. (e.g., age >= 18 and has_license)",
              "or: Returns True if at least one condition is True. (e.g., is_weekend or is_holiday)",
              "not: Reverses the boolean value. (e.g., not is_expired)"
            ]
          },
          {
            title: "Nested Conditionals",
            body: [
              "We can write conditional statements inside other conditional statements. This is called nesting. It is useful for making multi-layered decisions.",
              "Example: checking if a number is positive, and if so, whether it is even or odd."
            ]
          }
        ],
        pretest: [
            { question: "Which keyword is used to test a condition in Python?", options: ["for", "if", "while", "switch"], answerIndex: 1 },
            { question: "What happens if the condition in an if statement is True?", options: ["The program stops", "The code block under if executes", "The else block executes", "An error occurs"], answerIndex: 1 },
            { question: "Which keyword is used to check an additional condition after if?", options: ["repeat", "elif", "next", "case"], answerIndex: 1 },
            { question: "Which keyword executes when all previous conditions are False?", options: ["otherwise", "default", "else", "finally"], answerIndex: 2 },
            { question: "Python uses ______ to define code blocks.", options: ["Curly braces", "Semicolons", "Parentheses", "Indentation"], answerIndex: 3 },
            { question: "What is the correct syntax?", options: ["if x > 5 {}", "if (x > 5)", "if x > 5:", "if x > 5 then"], answerIndex: 2 },
            { question: "Which operator returns True only when both conditions are True?", options: ["or", "not", "and", "xor"], answerIndex: 2 },
            { question: "Which operator returns True when at least one condition is True?", options: ["and", "or", "not", "=="], answerIndex: 1 },
            { question: "What does the not operator do?", options: ["Adds values", "Compares values", "Reverses a Boolean value", "Multiplies values"], answerIndex: 2 },
            { question: "Which statement about elif is correct?", options: ["It means \"else if\"", "It ends the program", "It creates a loop", "It imports a module"], answerIndex: 0 },
            { question: "In an if-elif-else chain, how many blocks execute?", options: ["All True blocks", "First True block only", "Last block only", "None"], answerIndex: 1 },
            { question: "What will be printed?", options: ["No", "Error", "Yes", "Nothing"], answerIndex: 2 },
            { question: "Which condition checks whether age is at least 18?", options: ["age > 18", "age >= 18", "age <= 18", "age != 18"], answerIndex: 1 },
            { question: "Which logical operator would you use to check two conditions together?", options: ["+", "*", "and", "%"], answerIndex: 2 },
            { question: "What is nesting in Python?", options: ["Loop inside loop", "Function inside function", "Conditional inside conditional", "Module inside package"], answerIndex: 2 },
          ],
        procedure: [
          "Read the Aim and Theory to understand conditional statement structure and indentation requirements",
          "Note how comparison operators (==, !=, <, >, <=, >=) return booleans",
          "Observe how elif chain exits immediately upon the first matching condition",
          "Go to Simulation tab and click Start",
          "Step through the execution using Next",
          "Observe how the interpreter skips code blocks whose conditions evaluate to False",
          "Check variable values in the Memory State panel",
          "Go to Code Test tab and review the preloaded script",
          "Click Run Code to execute and view output",
          "Modify the script to accept a score (0 to 100) and output grades (A for >=90, B for >=80, C for >=70, else F)",
          "Test with edge case values like 90, 80, 70, 0, and invalid scores",
          "Experiment with logical operators to check if a number is between 10 and 20: 10 <= num <= 20",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Decision Making Simulation\nnum = 10\n\nif num > 0:\n    result = 'Positive'\nelif num < 0:\n    result = 'Negative'\nelse:\n    result = 'Zero'\n\nprint(num, 'is', result)",
          steps: [
            { line: 2, annotation: "num = 10 — assigns integer 10 to variable num", memory: [{ variable: "num", type: "int", value: "10" }], output: "" },
            { line: 4, annotation: "if num > 0: checks if 10 > 0, which is True. Interpreter enters this block.", memory: [{ variable: "num", type: "int", value: "10" }], output: "" },
            { line: 5, annotation: "result = 'Positive' — executes inside the if block", memory: [{ variable: "num", type: "int", value: "10" }, { variable: "result", type: "str", value: "'Positive'" }], output: "" },
            { line: 6, annotation: "elif num < 0: condition check is skipped because a previous condition in the chain was already matched.", memory: [], output: "" },
            { line: 8, annotation: "else block is skipped", memory: [], output: "" },
            { line: 11, annotation: "print(num, 'is', result) displays: 10 is Positive", memory: [], output: "10 is Positive\n" }
          ]
        },
        posttest: [
            { question: "What is the output?", options: ["A", "B", "Error", "Nothing"], answerIndex: 1 },
            { question: "Which of the following is a Boolean value?", options: ["10", "\"True\"", "True", "\"10\""], answerIndex: 2 },
            { question: "Which symbol checks equality?", options: ["=", "==", "===", "!="], answerIndex: 1 },
            { question: "What is the output?", options: ["Correct", "Wrong", "Error", "None"], answerIndex: 0 },
            { question: "What happens when all if and elif conditions are False?", options: ["Program crashes", "else block executes", "First block executes", "Loop starts"], answerIndex: 1 },
            { question: "Which statement is valid?", options: ["else x > 5:", "elif x > 5:", "if x > 5 then", "else if x > 5"], answerIndex: 1 },
            { question: "What is the result of:", options: ["True", "False", "None", "Error"], answerIndex: 1 },
            { question: "Which operator would check if a student passed both Math and Science?", options: ["or", "not", "and", "="], answerIndex: 2 },
            { question: "What is printed?", options: ["A", "B", "Error", "Nothing"], answerIndex: 1 },
            { question: "Which condition is evaluated first?", options: ["else", "elif", "if", "random"], answerIndex: 2 },
            { question: "What is the purpose of conditional statements?", options: ["Repetition", "Decision making", "File handling", "Importing modules"], answerIndex: 1 },
            { question: "What will be printed?", options: ["Positive", "Negative", "Not Positive", "Error"], answerIndex: 2 },
            { question: "Which is an example of nested conditional?", options: ["if inside if", "loop inside loop", "function inside class", "module inside package"], answerIndex: 0 },
            { question: "Which of these is NOT a logical operator?", options: ["and", "or", "not", "elif"], answerIndex: 3 },
            { question: "Why is indentation important in Python conditionals?", options: ["For comments", "To define code blocks", "To create variables", "To import modules"], answerIndex: 1 },
          ],
        references: [
          "Python Control Flow Documentation: https://docs.python.org/3/tutorial/controlflow.html",
          "W3Schools Python Conditions: https://www.w3schools.com/python/python_conditions.asp",
          "Sweigart A., Automate the Boring Stuff with Python, 2nd Edition"
        ]
      }
    }
  ]
};
