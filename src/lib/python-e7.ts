import type { Week } from "./course-data";

export const pythonExercise7: Week = {
  title: "EXERCISE 7",
  objective: "Understanding Python strings, character indexing, negative indexing, string slicing, immutability, and built-in string methods.",
  tutorial: "Tutorial 7: Strings and String Operations",
  labTitle: "Lab 7: Strings and String Operations",
  experiments: [
    {
      id: "py-e7-1",
      title: "String Slicing and Methods",
      desc: "Write a Python program to slice strings using positive and negative indexes, and apply common string methods like upper(), split(), replace(), and strip().",
      expected: "Slicing [0:5]: Hello\nSlicing [-6:]: Python\nReversed: nohtyP olleH\nModified: HELLO, PYTHON\nSplit list: ['Hello', 'Python']",
      content: {
        aim: {
          text: "In this experiment the student will explore Python's text processing capabilities by studying string indexes (both forward and backward), slicing substrings, understanding string immutability, and utilizing built-in string methods.",
          bullets: [
            "Access individual characters in a string using positive (0-based) and negative (from the end) indexes",
            "Extract substrings using slice notation: [start:stop:step]",
            "Understand that strings are immutable and any modifications return a new string object",
            "Apply string methods: upper(), lower(), strip(), split(), join(), replace(), and find()",
            "Format and concatenate strings safely"
          ]
        },
        theory: [
          {
            title: "String Indexing and Slicing",
            body: [
              "A string is a sequence of characters. Python supports both positive indexing (starting at 0 from left to right) and negative indexing (starting at -1 from right to left).",
              "Slicing allows you to extract a substring by specifying a range of indices.",
              "Syntax: string[start:stop:step]",
              "start: Index where the slice begins (inclusive). Defaults to 0.",
              "stop: Index where the slice ends (exclusive). Defaults to end of string.",
              "step: The increment between characters. Defaults to 1.",
              "A step of -1 can be used to reverse a string: string[::-1]."
            ]
          },
          {
            title: "String Immutability",
            body: [
              "Python strings are immutable. This means once a string object is created in memory, its characters cannot be modified in place.",
              "Attempting to do: s = 'Hello'; s[0] = 'J' will raise a TypeError.",
              "To change a string, you must create a new string containing the modifications."
            ]
          },
          {
            title: "Common String Methods",
            body: [
              "upper() / lower(): Converts all characters to uppercase/lowercase.",
              "strip(): Removes leading and trailing whitespace.",
              "replace(old, new): Replaces occurrences of a substring with a new one.",
              "split(separator): Splits the string on a separator and returns a list of substrings.",
              "join(iterable): Joins elements of an iterable (e.g., a list of strings) into a single string, using the string as a separator."
            ]
          }
        ],
        pretest: [
            { question: "What is a string in Python?", options: ["A collection of numbers only", "A sequence of characters", "A type of loop", "A function"], answerIndex: 1 },
            { question: "Which indexing starts from 0 in Python strings?", options: ["Negative indexing", "Reverse indexing", "Positive indexing", "Step indexing"], answerIndex: 2 },
            { question: "What is the index of the first character in a string?", options: ["1", "-1", "0", "2"], answerIndex: 2 },
            { question: "Which index represents the last character of a string?", options: ["0", "-1", "1", "-2"], answerIndex: 1 },
            { question: "What does slicing allow you to do?", options: ["Delete a string", "Extract a substring", "Convert a string to a list", "Reverse a list"], answerIndex: 1 },
            { question: "What is the general syntax for string slicing?", options: ["string(start,stop,step)", "string[start:stop:step]", "string[start-stop-step]", "slice(string)"], answerIndex: 1 },
            { question: "In slicing, the start index is:", options: ["Exclusive", "Inclusive", "Ignored", "Optional only"], answerIndex: 1 },
            { question: "In slicing, the stop index is:", options: ["Inclusive", "Mandatory", "Exclusive", "Negative only"], answerIndex: 2 },
            { question: "What is the default value of step in slicing?", options: ["0", "2", "-1", "1"], answerIndex: 3 },
            { question: "Which slice reverses a string?", options: ["s[:1]", "s[::-1]", "s[1:]", "s[::2]"], answerIndex: 1 },
            { question: "What is the output?", options: ["P", "y", "n", "Error"], answerIndex: 0 },
            { question: "What is the output?", options: ["P", "y", "n", "h"], answerIndex: 2 },
            { question: "What is the output?", options: ["Pyt", "yth", "ytho", "tho"], answerIndex: 1 },
            { question: "What is the output?", options: ["Pyt", "yth", "Python", "tho"], answerIndex: 0 },
            { question: "What is the output?", options: ["Pyt", "hon", "tho", "yth"], answerIndex: 1 },
          ],
        procedure: [
          "Read the Aim and Theory to understand string indexing, slicing syntax, and immutability",
          "Note the differences between positive indices (0 to len-1) and negative indices (-1 to -len)",
          "Practice slicing on paper: s = 'Hello World', s[:5], s[6:], s[::2]",
          "Go to Simulation tab and click Start",
          "Step through the execution using Next",
          "Observe how slicing expressions retrieve substrings and create new string objects in memory",
          "Check the values inside the Memory State panel",
          "Go to Code Test tab and run the starter program",
          "Verify that outputs match the expected slices and string operations",
          "Modify the code to write a function that checks if a string is a palindrome (reads the same forward and backward)",
          "Write a program to count the occurrences of a word inside a sentence using the count() method",
          "Experiment with strip() and split() to clean up user input containing excess whitespace",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# String Slicing and Methods\ns = 'Hello, Python'\n\ns_part1 = s[0:5]\ns_part2 = s[-6:]\ns_rev = s[::-1]\n\ns_upper = s.upper()\ns_split = s.split(', ')\n\nprint('Part 1:', s_part1)\nprint('Reversed:', s_rev)",
          steps: [
            { line: 2, annotation: "s = 'Hello, Python' — defines a string variable", memory: [{ variable: "s", type: "str", value: "'Hello, Python'" }], output: "" },
            { line: 4, annotation: "s_part1 = s[0:5] — gets characters from index 0 up to 5 ('Hello')", memory: [{ variable: "s", type: "str", value: "'Hello, Python'" }, { variable: "s_part1", type: "str", value: "'Hello'" }], output: "" },
            { line: 5, annotation: "s_part2 = s[-6:] — gets characters from index -6 to end ('Python')", memory: [{ variable: "s_part2", type: "str", value: "'Python'" }], output: "" },
            { line: 6, annotation: "s_rev = s[::-1] — reverses the string", memory: [{ variable: "s_rev", type: "str", value: "'nohtyP ,olleH'" }], output: "" },
            { line: 8, annotation: "s_upper = s.upper() — returns a new uppercase string", memory: [{ variable: "s_upper", type: "str", value: "'HELLO, PYTHON'" }], output: "" },
            { line: 9, annotation: "s_split = s.split(', ') — splits string on ', ' into a list of strings", memory: [{ variable: "s_split", type: "list", value: "['Hello', 'Python']" }], output: "" },
            { line: 11, annotation: "print('Part 1:', s_part1) displays Part 1: Hello", memory: [], output: "Part 1: Hello\n" },
            { line: 12, annotation: "print('Reversed:', s_rev) displays Reversed: nohtyP ,olleH", memory: [], output: "Part 1: Hello\nReversed: nohtyP ,olleH\n" }
          ]
        },
        posttest: [
            { question: "What does string immutability mean?", options: ["Strings can be resized", "Strings can be modified directly", "Strings cannot be changed after creation", "Strings are always uppercase"], answerIndex: 2 },
            { question: "What happens when executing?", options: ["Output: Jello", "TypeError", "ValueError", "SyntaxError"], answerIndex: 1 },
            { question: "To modify a string, you must:", options: ["Use append()", "Create a new string", "Use replace() on characters directly", "Convert it to an integer"], answerIndex: 1 },
            { question: "Which method converts a string to uppercase?", options: ["capitalize()", "upper()", "large()", "case()"], answerIndex: 1 },
            { question: "Which method converts a string to lowercase?", options: ["lower()", "down()", "small()", "case()"], answerIndex: 0 },
            { question: "What does strip() do?", options: ["Removes all spaces in a string", "Removes leading and trailing whitespace", "Deletes the string", "Splits the string"], answerIndex: 1 },
            { question: "Which method replaces occurrences of a substring?", options: ["remove()", "replace()", "change()", "modify()"], answerIndex: 1 },
            { question: "What is the output?", options: ["hello world", "Python world", "hello Python", "world hello"], answerIndex: 2 },
            { question: "Which method splits a string into a list?", options: ["join()", "divide()", "break()", "split()"], answerIndex: 3 },
            { question: "What is the output?", options: ["['a','b','c']", "abc", "a,b,c", "Error"], answerIndex: 0 },
            { question: "Which method joins elements of an iterable into a string?", options: ["merge()", "connect()", "join()", "append()"], answerIndex: 2 },
            { question: "What is the output?", options: ["ILovePython", "I Love Python", "['I','Love','Python']", "Error"], answerIndex: 1 },
            { question: "What is the result of:", options: ["python", "PYTHON", "Python", "pYTHON"], answerIndex: 1 },
            { question: "What is the output?", options: ["\" Python \"", "Python", "\"Python \"", "\" Python\""], answerIndex: 1 },
            { question: "Which statement about strings is TRUE?", options: ["Strings are mutable", "Strings cannot be indexed", "Strings support slicing and indexing", "Strings only store numbers"], answerIndex: 2 },
          ],
        references: [
          "Python String Documentation: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str",
          "W3Schools Python Strings: https://www.w3schools.com/python/python_strings.asp",
          "Lutz M., Learning Python, 5th Edition"
        ]
      }
    }
  ]
};
