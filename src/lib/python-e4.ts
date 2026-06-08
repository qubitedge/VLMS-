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
          { question: "What is used to define a block of code in Python conditional statements?", options: ["Curly braces {}", "Indentation (whitespace)", "Parentheses ()", "Semicolons ;"], answerIndex: 1, hint: "Python uses indentation to group statements under control structures." },
          { question: "What is the correct keyword for 'else if' in Python?", options: ["elseif", "else if", "elif", "elf"], answerIndex: 2, hint: "It is a short 4-letter keyword." },
          { question: "What is the output of: x = 10; y = 20; print('A' if x > y else 'B')?", options: ["A", "B", "None", "Error"], answerIndex: 1, hint: "This is a ternary expression. Since 10 > 20 is False, it prints the 'else' part." },
          { question: "Which logical operator returns True if both conditions are True?", options: ["or", "and", "not", "xor"], answerIndex: 1, hint: "It requires both conditions to be satisfied." },
          { question: "What is the correct syntax for checking if x is equal to 5?", options: ["if x = 5:", "if x == 5:", "if x === 5:", "if x equals 5:"], answerIndex: 1, hint: "Comparison for equality uses the double equals sign." }
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
          { question: "What is the output of the following code? x = 5; if x > 2: print('One'); if x > 4: print('Two')", options: ["One", "Two", "One and Two on separate lines", "None"], answerIndex: 2, hint: "These are two independent 'if' statements, not an if-elif chain. Both conditions are True." },
          { question: "What is the result of not (5 > 3 or 10 < 2)?", options: ["True", "False", "None", "Error"], answerIndex: 1, hint: "5 > 3 is True, so the 'or' expression is True. The 'not' operator negates it." },
          { question: "Can an 'elif' statement be used without an 'if' statement?", options: ["Yes", "No", "Only inside a loop", "Yes, if an 'else' is present"], answerIndex: 1, hint: "An 'elif' must always follow an 'if' or another 'elif'." },
          { question: "Which statement is used as a placeholder in empty code blocks to avoid indentation errors?", options: ["break", "continue", "pass", "return"], answerIndex: 2, hint: "The pass statement is a null statement that does nothing but satisfies syntax." },
          { question: "What is the output of: print(bool(10) and bool(0))?", options: ["True", "False", "10", "0"], answerIndex: 1, hint: "bool(10) is True, but bool(0) is False. True and False is False." }
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
