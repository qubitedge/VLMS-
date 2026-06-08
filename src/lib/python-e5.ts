import type { Week } from "./course-data";

export const pythonExercise5: Week = {
  title: "EXERCISE 5",
  objective: "Understanding looping constructs (for, while), using range(), and loop control statements (break, continue, pass) in Python.",
  tutorial: "Tutorial 5: Loops and Iteration",
  labTitle: "Lab 5: Loops and Iteration",
  experiments: [
    {
      id: "py-e5-1",
      title: "Iterative execution using Loops",
      desc: "Write a Python program to calculate the sum of the first N natural numbers using a while loop, and print even numbers using a for loop with range().",
      expected: "Sum of first 5 numbers: 15\nEven numbers: 2, 4, 6, 8",
      content: {
        aim: {
          text: "In this experiment the student will learn to use iterative control structures (for loop, while loop) to execute a block of code multiple times, control iteration using break and continue, and generate ranges of numbers using range().",
          bullets: [
            "Implement while loops for condition-controlled iteration",
            "Implement for loops for sequence-controlled iteration (iterating over lists, strings, and ranges)",
            "Generate sequences of integers using the range() function with start, stop, and step arguments",
            "Alter flow inside loops using break (premature exit) and continue (skipping current iteration)",
            "Understand loop-else structures which execute if a loop completes without encountering a break"
          ]
        },
        theory: [
          {
            title: "The while Loop",
            body: [
              "A while loop repeatedly executes a target statement or block of code as long as a given condition remains True.",
              "Syntax:",
              "while condition:",
              "    # code block",
              "It is essential to modify the loop control variable inside the block, otherwise the condition remains True indefinitely, causing an infinite loop."
            ]
          },
          {
            title: "The for Loop and range() Function",
            body: [
              "In Python, the for loop is used to iterate over a sequence (such as a list, tuple, dictionary, set, or string) or a range of numbers.",
              "The range() function returns a sequence of numbers, starting from 0 by default, increments by 1 by default, and stops before a specified number.",
              "Syntax of range(): range(start, stop[, step])",
              "range(5) generates: 0, 1, 2, 3, 4",
              "range(1, 10, 2) generates odd numbers: 1, 3, 5, 7, 9"
            ]
          },
          {
            title: "Loop Control: break and continue",
            body: [
              "break: Terminates the loop statement and transfers execution to the statement immediately following the loop.",
              "continue: Causes the loop to skip the remainder of its body and immediately retest its condition prior to reiterating.",
              "pass: Used when a statement is required syntactically but you do not want any command or code to execute."
            ]
          },
          {
            title: "Loops with else Block",
            body: [
              "Python loops can have an optional else clause. The else block is executed when the loop terminates naturally (i.e. the loop condition becomes False for while, or the sequence is exhausted for for).",
              "If the loop is terminated prematurely by a break statement, the else block is skipped."
            ]
          }
        ],
        pretest: [
          { question: "What is the output of range(1, 5) in a loop?", options: ["1, 2, 3, 4, 5", "1, 2, 3, 4", "0, 1, 2, 3, 4", "1, 3, 5"], answerIndex: 1, hint: "The stop value is exclusive, so the range stops one value before." },
          { question: "Which statement immediately terminates the entire loop execution?", options: ["continue", "break", "pass", "exit"], answerIndex: 1, hint: "This control statement breaks out of the loop immediately." },
          { question: "What is the output of range(5, 0, -1)?", options: ["5, 4, 3, 2, 1, 0", "5, 4, 3, 2, 1", "0, 1, 2, 3, 4, 5", "Error"], answerIndex: 1, hint: "It counts down from 5 to 1. 0 is excluded." },
          { question: "When does the else block of a loop execute?", options: ["When the loop condition is initially False", "When the loop completes all iterations without encountering a break", "Always after the loop executes", "Only when an error occurs"], answerIndex: 1, hint: "The else block runs only if the loop terminates normally, not via break." },
          { question: "What happens in an infinite loop?", options: ["The program crashes immediately", "The program executes the loop code forever unless stopped externally", "The interpreter detects it and skips the loop", "The loop runs exactly 1000 times"], answerIndex: 1, hint: "A loop whose condition never becomes False keeps running." }
        ],
        procedure: [
          "Read the Aim and Theory to understand looping structures and control statements",
          "Note the start, stop, and step arguments of the range() function",
          "Observe how loop variables are initialized, updated, and compared in conditions",
          "Go to Simulation tab and click Start",
          "Step through the loop execution using Next",
          "Observe how the loop control variable changes value in the Memory State panel on each iteration",
          "Watch the stdout buffer grow as print statements execute in the loop",
          "Go to Code Test tab and review the default code",
          "Click Run Code to execute and verify the sum and even numbers output",
          "Modify the script to count and print the number of vowels in a string using a for loop",
          "Write a program to check if a number is prime using a for-else loop: break the loop if a factor is found; print 'Prime' in the else block",
          "Use a continue statement to print numbers from 1 to 10 except for 5",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Loop Simulation\nn = 5\nsum_val = 0\ni = 1\n\nwhile i <= n:\n    sum_val += i\n    i += 1\n\nprint('Sum:', sum_val)",
          steps: [
            { line: 2, annotation: "n = 5 — sets upper limit", memory: [{ variable: "n", type: "int", value: "5" }], output: "" },
            { line: 3, annotation: "sum_val = 0 — initializes sum variable", memory: [{ variable: "n", type: "int", value: "5" }, { variable: "sum_val", type: "int", value: "0" }], output: "" },
            { line: 4, annotation: "i = 1 — loop counter starting value", memory: [{ variable: "n", type: "int", value: "5" }, { variable: "sum_val", type: "int", value: "0" }, { variable: "i", type: "int", value: "1" }], output: "" },
            { line: 6, annotation: "while i <= n: checks if 1 <= 5 (True). Enters loop.", memory: [], output: "" },
            { line: 7, annotation: "sum_val += i: sum_val becomes 0 + 1 = 1", memory: [{ variable: "sum_val", type: "int", value: "1" }], output: "" },
            { line: 8, annotation: "i += 1: i becomes 2", memory: [{ variable: "i", type: "int", value: "2" }], output: "" },
            { line: 6, annotation: "while i <= n: checks if 2 <= 5 (True). Re-enters loop.", memory: [], output: "" },
            { line: 7, annotation: "sum_val += i: sum_val becomes 1 + 2 = 3", memory: [{ variable: "sum_val", type: "int", value: "3" }], output: "" },
            { line: 8, annotation: "i += 1: i becomes 3", memory: [{ variable: "i", type: "int", value: "3" }], output: "" },
            { line: 6, annotation: "while i <= n: checks if 3 <= 5 (True). Loop continues.", memory: [], output: "" },
            { line: 7, annotation: "sum_val += i: sum_val becomes 3 + 3 = 6", memory: [{ variable: "sum_val", type: "int", value: "6" }], output: "" },
            { line: 8, annotation: "i += 1: i becomes 4", memory: [{ variable: "i", type: "int", value: "4" }], output: "" },
            { line: 6, annotation: "while i <= n: checks if 4 <= 5 (True). Loop continues.", memory: [], output: "" },
            { line: 7, annotation: "sum_val += i: sum_val becomes 6 + 4 = 10", memory: [{ variable: "sum_val", type: "int", value: "10" }], output: "" },
            { line: 8, annotation: "i += 1: i becomes 5", memory: [{ variable: "i", type: "int", value: "5" }], output: "" },
            { line: 6, annotation: "while i <= n: checks if 5 <= 5 (True). Final iteration.", memory: [], output: "" },
            { line: 7, annotation: "sum_val += i: sum_val becomes 10 + 5 = 15", memory: [{ variable: "sum_val", type: "int", value: "15" }], output: "" },
            { line: 8, annotation: "i += 1: i becomes 6", memory: [{ variable: "i", type: "int", value: "6" }], output: "" },
            { line: 6, annotation: "while i <= n: checks if 6 <= 5 (False). Exits loop.", memory: [], output: "" },
            { line: 10, annotation: "print('Sum:', sum_val) displays the final sum", memory: [], output: "Sum: 15\n" }
          ]
        },
        posttest: [
          { question: "What is the output of the following code? for i in range(1, 5): if i == 3: continue; print(i, end='')", options: ["1245", "1234", "124", "12"], answerIndex: 2, hint: "The continue statement skips the rest of the loop block for i = 3, and continues with i = 4. 5 is excluded from range." },
          { question: "What is the output of: x = [1, 2]; for v in x: pass; print(v)", options: ["1", "2", "Error", "None"], answerIndex: 1, hint: "The loop variable retains its last bound value even after the loop completes." },
          { question: "Which loop runs a block of code at least once before evaluating its condition in Python?", options: ["do-while loop", "repeat-until loop", "while loop", "None — Python does not have a do-while loop"], answerIndex: 3, hint: "Python only has while and for loops." },
          { question: "What is the value of i after this code? for i in range(3): break", options: ["0", "1", "2", "3"], answerIndex: 0, hint: "The loop is broken during the very first iteration, when i is 0." },
          { question: "What is the output of range(0, 10, 3)?", options: ["0, 3, 6, 9", "3, 6, 9", "0, 3, 6, 9, 10", "Error"], answerIndex: 0, hint: "It starts at 0 and increments by 3 on each step, stopping before 10." }
        ],
        references: [
          "Python Tutorial — More Control Flow Tools: https://docs.python.org/3/tutorial/controlflow.html",
          "W3Schools Python Loops: https://www.w3schools.com/python/python_for_loops.asp",
          "Matthes E., Python Crash Course, 2nd Edition"
        ]
      }
    }
  ]
};
