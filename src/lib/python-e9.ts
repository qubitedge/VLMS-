import type { Week } from "./course-data";

export const pythonExercise9: Week = {
  title: "EXERCISE 9",
  objective: "Understanding Python file input/output operations, using different access modes (r, w, a), and managing file resources using the 'with' statement.",
  tutorial: "Tutorial 9: File Handling",
  labTitle: "Lab 9: File Handling",
  experiments: [
    {
      id: "py-e9-1",
      title: "File Operations",
      desc: "Write a Python program to create and write data to a file, read its content line by line, and append new text to it.",
      expected: "Line 1: Hello from Python File I/O!\nLine 2: Working with files is easy.\nLine 3: Appended content.",
      content: {
        aim: {
          text: "In this experiment the student will learn to interact with the filesystem. They will perform basic file operations: opening a file, reading data from a file, writing data to a file, appending content to an existing file, and ensuring proper closure of file handlers using context managers.",
          bullets: [
            "Open files using the open() function and differentiate between modes: 'r' (read), 'w' (write), and 'a' (append)",
            "Read file contents using read(), readline(), and readlines() methods",
            "Write text to a file using write() and writelines()",
            "Use the 'with' statement (context manager) to automatically close files and prevent resource leaks",
            "Handle file paths and check file existence"
          ]
        },
        theory: [
          {
            title: "File Input/Output Basics",
            body: [
              "File handling is an important part of any application. Python provides built-in functions and methods to create, read, write, and manipulate text or binary files.",
              "The basic workflow is: Open file -> Perform operations (Read/Write) -> Close file.",
              "Syntax to open: file_object = open(filename, mode)",
              "If the close() method is not called, a file might stay open, leading to memory leaks or locked files."
            ]
          },
          {
            title: "File Access Modes",
            body: [
              "'r' (Read): Default mode. Opens file for reading. Raises FileNotFoundError if file doesn't exist.",
              "'w' (Write): Opens file for writing. Creates file if it doesn't exist. Overwrites existing contents.",
              "'a' (Append): Opens file for writing at the end of the file. Creates file if it doesn't exist. Does not overwrite existing content.",
              "'r+' (Read and Write): Opens the file for both reading and writing."
            ]
          },
          {
            title: "The 'with' Statement (Context Managers)",
            body: [
              "The recommended best practice for file handling is using the with statement. It acts as a context manager and guarantees that the file will be closed automatically once the nested block of code is exited, even if an exception is raised.",
              "Syntax:",
              "with open('test.txt', 'r') as f:",
              "    content = f.read()",
              "No explicit f.close() is needed."
            ]
          },
          {
            title: "Reading Methods",
            body: [
              "f.read(n): Reads n bytes/characters, or the entire file if n is omitted.",
              "f.readline(): Reads a single line from the file.",
              "f.readlines(): Reads all lines and returns them as a list of strings."
            ]
          }
        ],
        pretest: [
          { question: "Which built-in function is used to open files in Python?", options: ["file.open()", "open()", "fopen()", "read_file()"], answerIndex: 1, hint: "It is a standard global function that returns a file object." },
          { question: "What happens if you open an existing file in 'w' mode?", options: ["An error is raised", "The file is opened and text is appended", "The existing contents are deleted (overwritten)", "The file opens in read-only mode"], answerIndex: 2, hint: "Write mode truncates the file before writing." },
          { question: "Which mode is used to add text to the end of an existing file without deleting its contents?", options: ["'r'", "'w'", "'a'", "'r+'"], answerIndex: 2, hint: "It stands for append." },
          { question: "Why is the 'with' statement preferred for opening files?", options: ["It runs faster", "It automatically closes the file, even if errors occur", "It allows multiple files to be opened in parallel", "It encrypts the file contents"], answerIndex: 1, hint: "It handles cleanup/closing automatically." },
          { question: "What exception is raised if you try to open a non-existent file in 'r' mode?", options: ["ValueError", "FileNotFoundError", "IOError", "TypeError"], answerIndex: 1, hint: "Python raises an error indicating the file was not found." }
        ],
        procedure: [
          "Read the Aim and Theory to understand file operations, access modes, and context managers",
          "Understand the differences between read(), readline(), and readlines()",
          "Note how open('file.txt', 'w') truncates the file if it already exists",
          "Go to Simulation tab and click Start",
          "Step through the file operations using Next",
          "Observe the simulated file creation and updates in the output buffer",
          "Go to Code Test tab and run the script",
          "Verify the outputs match the written file lines",
          "Modify the script to read a file and count the total number of lines inside it",
          "Write a program that copies the contents of one file to another, capitalizing all letters in the process",
          "Try writing a list of strings to a file using writelines()",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# File Operations Simulation\n# Writing to a file\nwith open('demo.txt', 'w') as f:\n    f.write('Line 1: Hello from Python File I/O!\\n')\n    f.write('Line 2: Working with files is easy.\\n')\n\n# Appending to the file\nwith open('demo.txt', 'a') as f:\n    f.write('Line 3: Appended content.\\n')\n\n# Reading the file\nwith open('demo.txt', 'r') as f:\n    content = f.read()\n\nprint(content)",
          steps: [
            { line: 3, annotation: "with open('demo.txt', 'w') as f: opens demo.txt for writing. File is created.", memory: [{ variable: "f", type: "file", value: "<open file 'demo.txt' in mode 'w'>" }], output: "" },
            { line: 4, annotation: "f.write(...) writes the first line to the buffer", memory: [], output: "" },
            { line: 5, annotation: "f.write(...) writes the second line. Exiting block closes f.", memory: [], output: "" },
            { line: 8, annotation: "with open('demo.txt', 'a') as f: opens demo.txt in append mode.", memory: [{ variable: "f", type: "file", value: "<open file 'demo.txt' in mode 'a'>" }], output: "" },
            { line: 9, annotation: "f.write(...) appends line 3. Exiting block closes f.", memory: [], output: "" },
            { line: 12, annotation: "with open('demo.txt', 'r') as f: opens demo.txt in read-only mode.", memory: [{ variable: "f", type: "file", value: "<open file 'demo.txt' in mode 'r'>" }], output: "" },
            { line: 13, annotation: "content = f.read() reads all contents of the file as a single string", memory: [{ variable: "content", type: "str", value: "'Line 1: Hello...\\nLine 2...\\nLine 3...\\n'" }], output: "" },
            { line: 15, annotation: "print(content) displays the file contents", memory: [], output: "Line 1: Hello from Python File I/O!\nLine 2: Working with files is easy.\nLine 3: Appended content.\n" }
          ]
        },
        posttest: [
          { question: "What does f.readlines() return?", options: ["A single string containing the entire file content", "A list of strings, where each element is a line from the file", "A generator object", "The first line of the file only"], answerIndex: 1, hint: "It gathers all lines and wraps them in a sequence." },
          { question: "Which mode is used to open a file for binary reading?", options: ["'r'", "'rb'", "'w'", "'wb'"], answerIndex: 1, hint: "Adding 'b' to the mode string opens it in binary format." },
          { question: "What is the return value of f.write('hello')?", options: ["None", "True", "5 (number of characters written)", "Error"], answerIndex: 2, hint: "In Python 3, write() returns the number of characters/bytes written to the file." },
          { question: "Which method resets the file cursor's current position to a specific location?", options: ["seek(offset)", "tell()", "reset()", "locate()"], answerIndex: 0, hint: "It sets the file's current position. tell() reports the current position." },
          { question: "What happens if you open a file with open('out.txt', 'w+')?", options: ["Opens for writing only", "Opens for reading and writing, creating the file if needed and truncating it", "Raises FileNotFoundError", "Opens in read-only mode"], answerIndex: 1, hint: "The '+' modifier adds the complementary operation (read or write), while 'w' overrides." }
        ],
        references: [
          "Python Tutorial — Reading and Writing Files: https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files",
          "W3Schools Python File Handling: https://www.w3schools.com/python/python_file_handling.asp",
          "Sweigart A., Automate the Boring Stuff with Python"
        ]
      }
    }
  ]
};
