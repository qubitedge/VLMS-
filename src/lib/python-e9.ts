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
            { question: "What is the basic workflow of file handling in Python?", options: ["Read \u2192 Open \u2192 Close", "Open \u2192 Read/Write \u2192 Close", "Close \u2192 Open \u2192 Read", "Open \u2192 Close \u2192 Read"], answerIndex: 1 },
            { question: "Which function is used to open a file in Python?", options: ["file()", "open()", "fopen()", "create()"], answerIndex: 1 },
            { question: "What does the open() function return?", options: ["String", "Integer", "File object", "List"], answerIndex: 2 },
            { question: "Which mode is the default mode for open()?", options: ["'w'", "'a'", "'r'", "'r+'"], answerIndex: 2 },
            { question: "What does 'r' mode do?", options: ["Writes data", "Appends data", "Reads data", "Deletes data"], answerIndex: 2 },
            { question: "What happens if a file does not exist and is opened in 'r' mode?", options: ["Empty file is created", "FileNotFoundError occurs", "Program stops silently", "File is appended"], answerIndex: 1 },
            { question: "Which mode creates a file if it does not exist and overwrites existing content?", options: ["'r'", "'a'", "'w'", "'r+'"], answerIndex: 2 },
            { question: "Which mode adds data to the end of a file?", options: ["'w'", "'r'", "'r+'", "'a'"], answerIndex: 3 },
            { question: "Which mode allows both reading and writing?", options: ["'a'", "'r+'", "'w'", "'readwrite'"], answerIndex: 1 },
            { question: "Why is it important to close a file?", options: ["To speed up the CPU", "To avoid memory leaks and locked files", "To delete file contents", "To create backups"], answerIndex: 1 },
            { question: "Which method is used to close a file?", options: ["stop()", "end()", "close()", "shutdown()"], answerIndex: 2 },
            { question: "What is the recommended way to handle files in Python?", options: ["open() only", "close() only", "with statement", "delete() statement"], answerIndex: 2 },
            { question: "What is the advantage of using the with statement?", options: ["File remains open forever", "File closes automatically", "File becomes read-only", "File is encrypted"], answerIndex: 1 },
            { question: "Which keyword is used in a context manager?", options: ["using", "with", "manage", "open"], answerIndex: 1 },
            { question: "What is the output type of f.readlines()?", options: ["String", "Integer", "Dictionary", "List"], answerIndex: 3 },
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
            { question: "Which method reads the entire file?", options: ["read()", "readline()", "readall()", "lines()"], answerIndex: 0 },
            { question: "Which method reads one line at a time?", options: ["read()", "readline()", "readlines()", "getline()"], answerIndex: 1 },
            { question: "Which method returns all lines as a list?", options: ["readline()", "read()", "readlines()", "getlines()"], answerIndex: 2 },
            { question: "What does f.read(5) do?", options: ["Reads 5 lines", "Reads 5 bytes/characters", "Reads entire file", "Reads 5 files"], answerIndex: 1 },
            { question: "What is the output type of f.read()?", options: ["String", "List", "Tuple", "Dictionary"], answerIndex: 0 },
            { question: "What happens when opening a file in append mode ('a')?", options: ["Existing content is erased", "New data is added at the end", "File becomes read-only", "File is deleted"], answerIndex: 1 },
            { question: "Which statement correctly opens a file for reading?", options: ["open(\"data.txt\",\"r\")", "open(\"data.txt\",\"read\")", "file(\"data.txt\")", "read(\"data.txt\")"], answerIndex: 0 },
            { question: "Which statement correctly opens a file for writing?", options: ["open(\"data.txt\",\"append\")", "open(\"data.txt\",\"w\")", "open(\"data.txt\",\"write\")", "open(\"data.txt\",\"r\")"], answerIndex: 1 },
            { question: "What is the output?", options: ["File automatically closes after block execution", "File remains open forever", "Syntax Error", "File gets deleted"], answerIndex: 0 },
            { question: "Which mode does NOT overwrite existing content?", options: ["'w'", "'r+'", "'a'", "'r'"], answerIndex: 2 },
            { question: "What kind of files can Python handle?", options: ["Text files only", "Binary files only", "Both text and binary files", "Database files only"], answerIndex: 2 },
            { question: "Which of the following is a context manager example?", options: ["", "", "", ""], answerIndex: 1 },
            { question: "What is a potential issue if close() is not called?", options: ["Faster execution", "Memory leaks", "More storage space", "Better security"], answerIndex: 1 },
            { question: "Which statement about readlines() is TRUE?", options: ["Returns a string", "Returns a tuple", "Returns a list of lines", "Returns a dictionary"], answerIndex: 2 },
            { question: "Which file handling practice is considered best?", options: ["Never close files", "Always use global variables", "Use the with statement whenever possible", "Open the same file repeatedly without closing"], answerIndex: 2 },
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
