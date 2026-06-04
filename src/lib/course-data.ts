export type MCQ = {
  question: string;
  options: string[];
  answerIndex: number; // 0-indexed
};

export type SimulationStep = {
  line: number;
  annotation: string;
  memory: { variable: string; type: string; value: string }[];
  output: string;
};

export type SimulationData = {
  code: string;
  steps: SimulationStep[];
};

export type ExperimentContent = {
  aim?: { text: string; bullets?: string[] };
  theory?: { title: string; body: string[] }[];
  pretest?: MCQ[];
  procedure?: string[];
  simulation?: SimulationData;
  posttest?: MCQ[];
  references?: string[];
};

export type Experiment = {
  id: string;
  title: string;
  desc: string;
  expected: string;
  content?: ExperimentContent;
};

export type Week = {
  title: string;
  objective: string;
  tutorial: string;
  labTitle: string;
  experiments: Experiment[];
};

export type Course = {
  id: string;
  title: string;
  objectives: string | string[];
  introduction?: string[];
  targetAudience?: {
    primary: string;
    prerequisites: string[];
    usefulFor: string[];
  };
  alignment?: {
    university: string;
    department: string;
    course: string;
    credits: string;
    yearSem: string;
    branches: string;
    totalExperiments: string;
    compiler: string;
    units: { unit: string; topics: string; weeks: string }[];
  };
  weeks: Week[];
};

export const courses: Record<string, Course> = {
  "c-programming": {
    id: "c-programming",
    title: "C Programming",
    objectives: [
      "To introduce students to the C programming language and its role in modern computing",
      "To provide a structured, week-by-week hands-on programming experience aligned with JNTUGV syllabus",
      "To help students understand fundamental programming concepts such as variables, data types, operators, and expressions",
      "To train students in writing decision-making programs using if-else, switch-case, and nested conditionals",
      "To develop proficiency in iterative constructs — for, while, and do-while loops",
      "To understand and implement array operations including searching and sorting",
      "To learn string manipulation using both built-in and user-defined functions",
      "To explore pointer arithmetic, dynamic memory allocation using malloc, calloc, realloc, and free",
      "To understand structures, unions, bit fields, and self-referential structures including singly linked lists",
      "To design and implement modular programs using functions, call by value, and call by reference",
      "To develop recursive thinking by programming naturally recursive problems",
      "To perform file I/O operations including reading, writing, copying, and merging files",
      "To build problem-solving skills by converting real-world problems into algorithmic solutions"
    ],
    introduction: [
      "C is one of the most fundamental and widely-used programming languages in the history of computing. Developed at Bell Labs in the early 1970s, C has stood the test of time as the foundation for operating systems, embedded systems, compilers, and system-level software. Almost every modern programming language — including Python, Java, and C++ — draws concepts from C.",
      "This Virtual C Programming Lab is developed for first-year B.Tech students of Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) under the BS&HSS department. The lab provides a hands-on, browser-based environment where students can write, compile, and execute C programs without requiring any local software installation.",
      "The lab covers 14 weeks of structured experiments aligned with the JNTUGV C Programming syllabus — from basic I/O and arithmetic to pointers, data structures, recursion, and file handling. Each experiment includes a clear objective, problem statement, pre-loaded starter code, stdin support for interactive programs, and expected output for self-verification.",
      "Students can attempt all 47 lab problems directly in the browser using a professional code editor powered by a real GCC compiler via the Wandbox execution engine."
    ],
    targetAudience: {
      primary: "First-year B.Tech students of all branches at Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) enrolled in the C Programming Lab course under the BS&HSS department (Course Code: refer JNTUGV curriculum).",
      prerequisites: [
        "No prior programming experience required",
        "Basic computer operation skills (typing, using a browser)",
        "Understanding of basic mathematics (algebra, arithmetic)"
      ],
      usefulFor: [
        "Diploma students transitioning to B.Tech who want to strengthen fundamentals",
        "Students preparing for competitive exams like GATE where C concepts are tested",
        "Faculty members looking for ready-made experiment references aligned to JNTUGV syllabus",
        "Self-learners who want a structured, compiler-ready C programming environment"
      ]
    },
    alignment: {
      university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
      department: "Basic Sciences and Humanities (BS&HSS)",
      course: "C Programming Lab",
      credits: "L:0 T:0 P:3 C:1.5",
      yearSem: "First Year, First / Second Semester",
      branches: "All B.Tech branches (CSE, IT, ECE, EEE, ME, Civil)",
      totalExperiments: "47 problems across 14 weeks",
      compiler: "GCC (GNU Compiler Collection) via Wandbox — identical to the compiler used in JNTUGV physical labs",
      units: [
        { unit: "Unit I", topics: "Environment, Algorithms, Variables, Arithmetic", weeks: "Week 1–3" },
        { unit: "Unit II", topics: "Operators, Branching, Loops", weeks: "Week 4–6" },
        { unit: "Unit III", topics: "Arrays, Strings, Sorting, Matrices", weeks: "Week 7–8" },
        { unit: "Unit IV", topics: "Pointers, Structures, Unions, Linked Lists", weeks: "Week 9–10" },
        { unit: "Unit V", topics: "Functions, Recursion, File Handling", weeks: "Week 11–14" }
      ]
    },
    weeks: [
      {
        title: "WEEK 1",
        objective: "Getting familiar with programming environment and writing first program",
        tutorial: "Tutorial 1: Environment Setup",
        labTitle: "Lab 1: First steps in C",
        experiments: [
          {
            id: "c-w1-1",
            title: "Hello World",
            desc: "Write a C program to print 'Hello World' to the console.",
            expected: "Hello World",
            content: {
              aim: {
                text: "In this experiment, the student will be able to understand the basic structure of a C program and learn how to display output on the screen using the printf() function.",
                bullets: [
                  "Understand the structure of a C program — preprocessor directives, main function, and return statement",
                  "Learn the role of #include <stdio.h> header file",
                  "Use printf() to print text to the console",
                  "Successfully compile and run their first C program"
                ]
              },
              theory: [
                {
                  title: "Structure of a C Program",
                  body: ["Every C program follows a fixed structure. Understanding this structure is the first step to writing C programs.", "A basic C program has these parts:"]
                },
                {
                  title: "1. Preprocessor Directive",
                  body: ["Lines starting with # are preprocessor directives. They are processed before compilation begins.", "#include <stdio.h> tells the compiler to include the Standard Input Output library, which contains functions like printf() and scanf()."]
                },
                {
                  title: "2. main() Function",
                  body: ["Every C program must have exactly one main() function. Execution of the program always begins from main().", "int main() means the function returns an integer value to the operating system."]
                },
                {
                  title: "3. printf() Function",
                  body: ["printf() is used to print formatted output to the console.", "Syntax: printf(\"text to print\");", "The text must be enclosed in double quotes.", "Special character \\n moves the cursor to the next line (newline)."]
                },
                {
                  title: "4. return 0",
                  body: ["return 0; at the end of main() tells the OS that the program ended successfully. Any non-zero value means the program ended with an error."]
                },
                {
                  title: "5. Curly Braces { }",
                  body: ["All statements inside main() are enclosed within curly braces. The opening { marks the beginning and closing } marks the end of the function body."]
                }
              ],
              pretest: [
                { question: "Which of the following is the correct extension for a C source file?", options: [".cp", ".c", ".cpp", ".cv"], answerIndex: 1 },
                { question: "Which header file is required to use printf() in C?", options: ["math.h", "string.h", "stdio.h", "stdlib.h"], answerIndex: 2 },
                { question: "What is the entry point of every C program?", options: ["start()", "begin()", "main()", "run()"], answerIndex: 2 },
                { question: "What does \\n do inside printf()?", options: ["Prints the letter n", "Adds a tab space", "Moves to the next line", "Ends the program"], answerIndex: 2 },
                { question: "What value should main() return to indicate successful execution?", options: ["1", "-1", "0", "NULL"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections completely before starting",
                "Go to the Simulation tab and observe the step-by-step execution of the Hello World program",
                "Note how each line of the program executes in order — preprocessor → main() → printf() → return",
                "Observe the output panel on the right side showing 'Hello World'",
                "Go to the Code Test tab (code editor)",
                "The starter code is pre-loaded in the editor",
                "Read the code carefully — do not change anything yet",
                "Click the 'Run Code' button",
                "Verify your output matches the expected output: Hello World",
                "Try modifying the text inside printf() to print your own name",
                "Run again and verify your custom output appears correctly",
                "Once satisfied, proceed to the Posttest tab to test your understanding"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Preprocessor loads stdio library containing printf()", memory: [], output: "" },
                  { line: 3, annotation: "Program execution begins at main() function", memory: [], output: "" },
                  { line: 4, annotation: "printf() sends the string to standard output", memory: [], output: "Hello World\n" },
                  { line: 5, annotation: "Program sends exit code 0 to OS, ending successfully", memory: [], output: "Hello World\n" }
                ]
              },
              posttest: [
                { question: "What is the output of printf(\"Hello\\nWorld\");?", options: ["Hello World", "Hello\\nWorld (on two lines)", "HelloWorld", "Error"], answerIndex: 1 },
                { question: "Which of the following correctly prints \"JNTUGV\" in C?", options: ["print(\"JNTUGV\")", "printf[JNTUGV]", "printf(\"JNTUGV\");", "Printf(\"JNTUGV\");"], answerIndex: 2 },
                { question: "What happens if you remove #include<stdio.h> from the Hello World program?", options: ["Program still runs normally", "printf() will not be recognized, compiler error", "Program prints nothing", "Program crashes at runtime"], answerIndex: 1 },
                { question: "What does int before main() indicate?", options: ["main() takes integer arguments", "main() returns an integer value", "main() is an integer variable", "Nothing, it is optional"], answerIndex: 1 },
                { question: "Which of the following will print Hello World with a newline at the end?", options: ["printf(\"Hello World\")", "printf(\"Hello World\\n\")", "printf(\\nHello World)", "printf(\"Hello World\\t\")"], answerIndex: 1 }
              ],
              references: [
                "Kernighan, B.W. and Ritchie, D.M., 'The C Programming Language', 2nd Edition, Prentice Hall",
                "Balagurusamy, E., 'Programming in ANSI C', 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          },
          {
            id: "c-w1-2",
            title: "Basic Input Output",
            desc: "Write a program that takes two variables (a string name and an integer age) and prints them.",
            expected: "Name: Likhith Age: 20",
            content: {
              aim: {
                text: "In this experiment, the student will learn how to take input from the user using scanf() and display it back using printf(). The student will understand format specifiers, variable declaration, and the relationship between input and output in C.",
                bullets: [
                  "Declare variables of type char array and int",
                  "Use scanf() to read a string and integer from the user",
                  "Use printf() with format specifiers %s and %d to display them",
                  "Understand the use of & (address-of operator) in scanf()"
                ]
              },
              theory: [
                {
                  title: "scanf() — Reading Input",
                  body: [
                    "scanf() reads formatted input from the keyboard (standard input).",
                    "Syntax: scanf(\"format_specifier\", &variable);",
                    "The & symbol gives the memory address of the variable so scanf() can store the value there."
                  ]
                },
                {
                  title: "printf() with Format Specifiers",
                  body: [
                    "printf() uses the same specifiers to print variables.",
                    "printf(\"Name: %s Age: %d\", name, age);",
                    "→ Replaces %s with the value of name, %d with the value of age"
                  ]
                },
                {
                  title: "char array for strings",
                  body: [
                    "C does not have a built-in string type. Strings are stored as character arrays.",
                    "char name[50]; → declares a character array that can hold up to 49 characters + null terminator",
                    "Why no & for char arrays in scanf?",
                    "The array name itself is already a memory address in C, so & is not needed."
                  ]
                }
              ],
              pretest: [
                { question: "Which function is used to take input from the user in C?", options: ["input()", "cin()", "scanf()", "read()"], answerIndex: 2 },
                { question: "What is the format specifier for an integer in C?", options: ["%i", "%d", "%int", "%n"], answerIndex: 1 },
                { question: "What does the & symbol do in scanf(\"%d\", &age)?", options: ["It is the AND operator", "It passes the address of the variable", "It multiplies the value", "It is not required"], answerIndex: 1 },
                { question: "To store a person's name in C, which data type is used?", options: ["string name", "char name[]", "text name[]", "varchar name"], answerIndex: 1 },
                { question: "What is the format specifier for a string in printf()?", options: ["%c", "%str", "%s", "%ch"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully",
                "Go to the Simulation tab to see how scanf() reads values and printf() displays them",
                "Observe what happens in memory when variables are assigned values from user input",
                "Go to the Code Test tab — starter code is pre-loaded",
                "Look at the Stdin input box — type your name and age separated by a space",
                "Example input: Likhith 20",
                "Click Run Code",
                "Verify output matches: Name: Likhith Age: 20",
                "Try changing the input values and run again",
                "Observe how output changes based on input",
                "Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    char name[50];\n    int age;\n    scanf(\"%s %d\", name, &age);\n    printf(\"Name: %s Age: %d\\n\", name, age);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Preprocessor loads stdio library", memory: [], output: "" },
                  { line: 3, annotation: "Program execution begins at main()", memory: [], output: "" },
                  { line: 4, annotation: "Memory allocated for char array 'name'", memory: [{ variable: "name", type: "char[50]", value: "garbage" }], output: "" },
                  { line: 5, annotation: "Memory allocated for integer 'age'", memory: [{ variable: "name", type: "char[50]", value: "garbage" }, { variable: "age", type: "int", value: "garbage" }], output: "" },
                  { line: 6, annotation: "scanf() reads 'Likhith 20' from standard input", memory: [{ variable: "name", type: "char[50]", value: "\"Likhith\"" }, { variable: "age", type: "int", value: "20" }], output: "" },
                  { line: 7, annotation: "printf() sends formatted string to standard output", memory: [{ variable: "name", type: "char[50]", value: "\"Likhith\"" }, { variable: "age", type: "int", value: "20" }], output: "Name: Likhith Age: 20\n" },
                  { line: 8, annotation: "Program ends successfully", memory: [{ variable: "name", type: "char[50]", value: "\"Likhith\"" }, { variable: "age", type: "int", value: "20" }], output: "Name: Likhith Age: 20\n" }
                ]
              },
              posttest: [
                { question: "What will be the output of the program if input is Ram 25?", options: ["Name: Ram Age: 25", "Ram 25", "Name=Ram Age=25", "Error"], answerIndex: 0 },
                { question: "Why is & not used with char arrays in scanf()?", options: ["It is a syntax error", "char arrays already represent memory addresses", "scanf() does not support strings", "& is only for float variables"], answerIndex: 1 },
                { question: "What is the size of char name[50]?", options: ["50 integers", "50 characters including null terminator", "50 bytes of float", "50 bits"], answerIndex: 1 },
                { question: "Which format specifier is used to print a float value?", options: ["%d", "%s", "%f", "%fl"], answerIndex: 2 },
                { question: "What happens if you forget & before an int variable in scanf()?", options: ["Program prints 0", "Program compiles but may crash at runtime (undefined behavior)", "Program prints garbage value", "Compiler gives a warning but runs fine"], answerIndex: 1 }
              ],
              references: [
                "Kernighan, B.W. and Ritchie, D.M., 'The C Programming Language', 2nd Edition, Prentice Hall",
                "Balagurusamy, E., 'Programming in ANSI C', 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
        ],
      },
      {
        title: "WEEK 2",
        objective: "Converting algorithms/flowcharts into C source code",
        tutorial: "Tutorial 2: Algorithms and Flowcharts",
        labTitle: "Lab 2: Basic Algorithms",
        experiments: [
          {
            id: "c-w2-1",
            title: "Sum & Average",
            desc: "Compute the sum and average of two integers.",
            expected: "Sum: 14 Average: 7.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept two integers from the user, compute their sum and average, and display the results. The student will:",
                bullets: [
                  "Declare and use multiple int and float variables",
                  "Perform arithmetic operations (addition, division)",
                  "Understand integer vs. float division and type casting",
                  "Use printf() with %d and %.2f format specifiers"
                ]
              },
              theory: [
                {
                  title: "Arithmetic in C",
                  body: ["C supports +, -, *, / and % (modulus). When both operands are integers, division truncates: 7 / 2 = 3, not 3.5.", "To obtain a decimal result, cast one operand to float: (float)a / b."]
                },
                {
                  title: "Sum",
                  body: ["sum = a + b; stores the result in a new variable. Both a and b must be declared before use."]
                },
                {
                  title: "Average",
                  body: ["average = (float)sum / 2; The cast ensures float division. Alternatively declare average as float and divide directly."]
                },
                {
                  title: "%.2f",
                  body: ["%.2f prints a float with exactly 2 decimal places. Useful for displaying averages cleanly."]
                }
              ],
              pretest: [
                { question: "What is the result of 7 / 2 in C when both are int?", options: ["3.5", "3", "4", "Error"], answerIndex: 1 },
                { question: "Which format specifier prints a float to 2 decimal places?", options: ["%d", "%f", "%.2f", "%2d"], answerIndex: 2 },
                { question: "To get float division from two int variables a and b, you write:", options: ["a / b", "(float)a / b", "float(a / b)", "a % b"], answerIndex: 1 },
                { question: "What operator computes the remainder of division?", options: ["/", "//", "%", "**"], answerIndex: 2 },
                { question: "If a = 10 and b = 4, what is (float)(a + b) / 2?", options: ["7", "7.00", "7.5", "3.0"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab below and step through the program trace.",
                "Observe how variables appear in memory and how integer vs. float division differ.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter two integers separated by a space — e.g. 10 4.",
                "Click Run Code. Verify output: Sum: 14 Average: 7.00",
                "Try different inputs (odd numbers to test rounding). Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int a, b, sum;\n    float avg;\n    scanf(\"%d %d\", &a, &b);\n    sum = a + b;\n    avg = (float)sum / 2;\n    printf(\"Sum: %d Average: %.2f\\n\", sum, avg);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library for I/O functions", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for integers a, b, sum", memory: [{variable: "a", type: "int", value: "?"}, {variable: "b", type: "int", value: "?"}, {variable: "sum", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "Allocate memory for float avg", memory: [{variable: "a", type: "int", value: "?"}, {variable: "b", type: "int", value: "?"}, {variable: "sum", type: "int", value: "?"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf() reads '10 4' from user", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "4"}, {variable: "sum", type: "int", value: "?"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 7, annotation: "Compute sum = a + b", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "4"}, {variable: "sum", type: "int", value: "14"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 8, annotation: "Compute avg using float casting", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "4"}, {variable: "sum", type: "int", value: "14"}, {variable: "avg", type: "float", value: "7.00"}], output: "" },
                  { line: 9, annotation: "printf() displays the result", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "4"}, {variable: "sum", type: "int", value: "14"}, {variable: "avg", type: "float", value: "7.00"}], output: "Sum: 14 Average: 7.00\n" },
                  { line: 10, annotation: "Program terminates successfully", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "4"}, {variable: "sum", type: "int", value: "14"}, {variable: "avg", type: "float", value: "7.00"}], output: "Sum: 14 Average: 7.00\n" }
                ]
              },
              posttest: [
                { question: "What will printf(\"Sum: %d\", 10+4); print?", options: ["Sum: 14", "Sum: 10+4", "14", "Error"], answerIndex: 0 },
                { question: "Which variable type is best for storing the average of two integers?", options: ["int", "float", "char", "double"], answerIndex: 1 },
                { question: "For inputs 7 and 3, what is the average printed with %.2f?", options: ["5.00", "5", "5.5", "4.00"], answerIndex: 0 },
                { question: "What is the purpose of type casting in (float)sum / 2?", options: ["Changes sum permanently to float", "Temporarily treats sum as float for division", "Rounds sum to nearest float", "No effect"], answerIndex: 1 },
                { question: "What is 13 % 4?", options: ["3.25", "1", "3", "4"], answerIndex: 1 }
              ],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w2-2",
            title: "Fahrenheit to Celsius",
            desc: "Convert temperature from Fahrenheit to Celsius.",
            expected: "Celsius: 37.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a temperature in Fahrenheit from the user, convert it to Celsius using the standard formula, and display the result. The student will:",
                bullets: [
                  "Declare and use float variables for temperature values",
                  "Apply the conversion formula: C = (F - 32) * 5 / 9",
                  "Understand operator precedence and parenthesisation in C",
                  "Use printf() with %.2f to display the result to 2 decimal places"
                ]
              },
              theory: [
                {
                  title: "Temperature Conversion Formula",
                  body: ["The relationship between Fahrenheit and Celsius is:", "C = (F - 32) * 5 / 9", "This formula subtracts 32 from the Fahrenheit value, then multiplies by 5 and divides by 9."]
                },
                {
                  title: "Operator Precedence",
                  body: ["In C, multiplication and division have higher precedence than subtraction.", "Without parentheses, F - 32 * 5 / 9 would be evaluated incorrectly. Always use parentheses: (F - 32) * 5 / 9."]
                },
                {
                  title: "Float Variables",
                  body: ["Declare both fahrenheit and celsius as float to avoid integer truncation.", "If declared as int, values like 98.6°F would lose their decimal part."]
                },
                {
                  title: "%.2f",
                  body: ["%.2f prints a floating-point result rounded to 2 decimal places, giving clean output like 37.00."]
                }
              ],
              pretest: [
                { question: "What is the correct formula to convert Fahrenheit to Celsius?", options: ["C = (F + 32) * 5 / 9", "C = (F - 32) * 9 / 5", "C = (F - 32) * 5 / 9", "C = F - 32 / 5 * 9"], answerIndex: 2 },
                { question: "What data type should be used to store a temperature like 98.6?", options: ["int", "char", "float", "long"], answerIndex: 2 },
                { question: "What is 98.6°F converted to Celsius (approx)?", options: ["32.00", "37.00", "66.60", "45.30"], answerIndex: 1 },
                { question: "Why are parentheses needed in (F - 32) * 5 / 9?", options: ["They are not needed", "To ensure subtraction happens before multiplication", "To convert F to an integer", "To print the result"], answerIndex: 1 },
                { question: "What will %.2f do when printing 37.0?", options: ["Print 37", "Print 37.0", "Print 37.00", "Print 37.000"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how the formula is applied and how float variables hold decimal values.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a Fahrenheit temperature — e.g. 98.6",
                "Click Run Code. Verify output: Celsius: 37.00",
                "Try inputs like 32 (freezing) and 212 (boiling) to verify. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    float f, c;\n    scanf(\"%f\", &f);\n    c = (f - 32) * 5 / 9;\n    printf(\"Celsius: %.2f\\n\", c);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for floats f, c", memory: [{variable: "f", type: "float", value: "?"}, {variable: "c", type: "float", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads 98.6 from user", memory: [{variable: "f", type: "float", value: "98.6"}, {variable: "c", type: "float", value: "?"}], output: "" },
                  { line: 6, annotation: "Compute conversion formula", memory: [{variable: "f", type: "float", value: "98.6"}, {variable: "c", type: "float", value: "37.00"}], output: "" },
                  { line: 7, annotation: "printf() displays formatted celsius", memory: [{variable: "f", type: "float", value: "98.6"}, {variable: "c", type: "float", value: "37.00"}], output: "Celsius: 37.00\n" },
                  { line: 8, annotation: "Program ends successfully", memory: [{variable: "f", type: "float", value: "98.6"}, {variable: "c", type: "float", value: "37.00"}], output: "Celsius: 37.00\n" }
                ]
              },
              posttest: [
                { question: "What is 0°C in Fahrenheit?", options: ["0", "32", "100", "212"], answerIndex: 1 },
                { question: "What output does the program print for input 32?", options: ["Celsius: 0.00", "Celsius: 32.00", "Celsius: 1.00", "Celsius: -1.00"], answerIndex: 0 },
                { question: "What happens if fahrenheit is declared as int instead of float?", options: ["No difference", "Decimal part of input is lost", "Program crashes", "Output doubles"], answerIndex: 1 },
                { question: "Which of the following correctly computes Celsius in C?", options: ["celsius = F - 32 * 5 / 9;", "celsius = (F - 32) * 5 / 9;", "celsius = F * 5 / 9 - 32;", "celsius = (F / 9) * 5 - 32;"], answerIndex: 1 },
                { question: "For input 212°F, what is the expected Celsius output?", options: ["180.00", "100.00", "37.00", "0.00"], answerIndex: 1 }
              ],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w2-3",
            title: "Simple Interest",
            desc: "Calculate Simple Interest given P, R, T.",
            expected: "Simple Interest: 100.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept principal, rate of interest, and time from the user, compute the simple interest, and display the result. The student will:",
                bullets: [
                  "Declare and use float variables for financial calculations",
                  "Apply the simple interest formula: SI = (P * R * T) / 100",
                  "Understand the importance of float division in financial computations",
                  "Use printf() with %.2f to display monetary results to 2 decimal places"
                ]
              },
              theory: [
                {
                  title: "Simple Interest Formula",
                  body: ["Simple interest is calculated as:", "SI = (P * R * T) / 100", "Where: P = Principal amount, R = Rate of interest per annum, T = Time period"]
                },
                {
                  title: "Why Float?",
                  body: ["Financial values often involve decimals. Declaring P, R, T, and SI as float ensures that fractional values are preserved.", "If all variables were int, a rate like 8.5% would be truncated to 8."]
                },
                {
                  title: "Operator Precedence",
                  body: ["Multiplication is performed left to right before division. P * R * T is evaluated first, then divided by 100.", "No special parenthesisation is needed beyond the outer grouping."]
                }
              ],
              pretest: [
                { question: "What is the formula for Simple Interest?", options: ["SI = P + R + T", "SI = (P * R * T) / 100", "SI = (P + R) * T / 100", "SI = P / (R * T)"], answerIndex: 1 },
                { question: "What data type is most appropriate for storing principal and rate?", options: ["int", "char", "float", "void"], answerIndex: 2 },
                { question: "If P = 1000, R = 5, T = 2, what is SI?", options: ["10.00", "100.00", "1000.00", "50.00"], answerIndex: 1 },
                { question: "Why is dividing by 100 necessary in the SI formula?", options: ["To convert years to months", "Because rate is given as a percentage", "To round the result", "It is not necessary"], answerIndex: 1 },
                { question: "Which printf format specifier prints a float to 2 decimal places?", options: ["%d", "%f", "%.2f", "%s"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how P, R, and T are read and how SI is computed step by step.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter three values: principal, rate, time — e.g. 1000 5 2",
                "Click Run Code. Verify output: Simple Interest: 100.00",
                "Try inputs with decimal rate like 1000 8.5 3 to test float handling. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    float p, r, t, si;\n    scanf(\"%f %f %f\", &p, &r, &t);\n    si = (p * r * t) / 100;\n    printf(\"Simple Interest: %.2f\\n\", si);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for floats p, r, t, si", memory: [{variable: "p", type: "float", value: "?"}, {variable: "r", type: "float", value: "?"}, {variable: "t", type: "float", value: "?"}, {variable: "si", type: "float", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '1000 5 2' from user", memory: [{variable: "p", type: "float", value: "1000"}, {variable: "r", type: "float", value: "5"}, {variable: "t", type: "float", value: "2"}, {variable: "si", type: "float", value: "?"}], output: "" },
                  { line: 6, annotation: "Compute SI formula", memory: [{variable: "p", type: "float", value: "1000"}, {variable: "r", type: "float", value: "5"}, {variable: "t", type: "float", value: "2"}, {variable: "si", type: "float", value: "100.00"}], output: "" },
                  { line: 7, annotation: "printf() displays formatted result", memory: [{variable: "p", type: "float", value: "1000"}, {variable: "r", type: "float", value: "5"}, {variable: "t", type: "float", value: "2"}, {variable: "si", type: "float", value: "100.00"}], output: "Simple Interest: 100.00\n" },
                  { line: 8, annotation: "Program ends successfully", memory: [{variable: "p", type: "float", value: "1000"}, {variable: "r", type: "float", value: "5"}, {variable: "t", type: "float", value: "2"}, {variable: "si", type: "float", value: "100.00"}], output: "Simple Interest: 100.00\n" }
                ]
              },
              posttest: [
                { question: "For P = 500, R = 10, T = 3, what is SI?", options: ["15.00", "150.00", "1500.00", "50.00"], answerIndex: 1 },
                { question: "What happens if T is declared as int and the user enters 1.5?", options: ["SI is computed correctly", "T stores 1, losing the 0.5", "Program crashes", "T becomes 2"], answerIndex: 1 },
                { question: "Which line correctly computes simple interest in C?", options: ["si = P + R + T / 100;", "si = (P * R * T) / 100;", "si = P * R / T * 100;", "si = (P / 100) * R + T;"], answerIndex: 1 },
                { question: "What is the output for P = 2000, R = 3.5, T = 4?", options: ["28.00", "280.00", "2800.00", "700.00"], answerIndex: 1 },
                { question: "Why should SI be declared as float rather than int?", options: ["int cannot store numbers above 100", "SI may have a decimal part", "float is faster to compute", "printf requires float for all output"], answerIndex: 1 }
              ],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 3",
        objective: "Variables, data types, arithmetic operators",
        tutorial: "Tutorial 3: Variables and Arithmetic",
        labTitle: "Lab 3: Computational problems",
        experiments: [
          {
            id: "c-w3-1",
            title: "Square Root",
            desc: "Find square root of a given number using math.h.",
            expected: "Square Root: 5.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a non-negative number from the user and compute its square root using the sqrt() function from the math library. The student will:",
                bullets: [
                  "Declare and use float/double variables",
                  "Include and use the math.h library",
                  "Apply the sqrt() function",
                  "Use printf() with %.2f to display the result",
                  "Understand the importance of linking the math library with -lm during compilation"
                ]
              },
              theory: [
                {
                  title: "Square Root",
                  body: ["The square root of a number n is a value x such that x * x = n.", "For example, sqrt(25) = 5.0 and sqrt(2) = 1.414..."]
                },
                {
                  title: "math.h Library",
                  body: ["C does not include mathematical functions by default. The header #include <math.h> must be included at the top of the program to access functions like sqrt(), pow(), fabs(), ceil(), floor(), etc."]
                },
                {
                  title: "sqrt() Function",
                  body: ["Syntax: double sqrt(double x);", "It accepts a double argument and returns the square root as a double. Passing a negative number results in a NaN (Not a Number) output; no crash occurs but the result is invalid."]
                },
                {
                  title: "Compilation and Types",
                  body: ["When using math.h functions, compile with: gcc program.c -o program -lm", "The -lm flag links the math library explicitly. Without it, a linker error occurs on some systems.", "sqrt() returns a double. If your variable is float, an implicit conversion occurs. It is safest to declare the variable as double when using math.h functions."]
                }
              ],
              pretest: [
                { question: "Which header file must be included to use sqrt() in C?", options: ["stdio.h", "stdlib.h", "math.h", "string.h"], answerIndex: 2 },
                { question: "What does sqrt(144) return?", options: ["14.00", "12.00", "72.00", "1.44"], answerIndex: 1 },
                { question: "What is the return type of the sqrt() function?", options: ["int", "float", "double", "char"], answerIndex: 2 },
                { question: "What happens if you pass a negative value to sqrt()?", options: ["Program crashes", "Returns 0", "Returns NaN", "Returns the absolute value"], answerIndex: 2 },
                { question: "Which compilation command correctly links the math library?", options: ["gcc program.c -o program", "gcc program.c -o program -lm", "gcc program.c -math -o program", "gcc -sqrt program.c -o program"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how the math.h library is included and how sqrt() is called.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a non-negative number — e.g. 25",
                "Click Run Code. Verify output: Square Root: 5.00",
                "Try inputs like 2 and 0 to observe decimal and zero results. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double n, root;\n    scanf(\"%lf\", &n);\n    root = sqrt(n);\n    printf(\"Square Root: %.2f\\n\", root);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library for I/O", memory: [], output: "" },
                  { line: 2, annotation: "Load math library for sqrt()", memory: [], output: "" },
                  { line: 5, annotation: "Allocate memory for doubles n, root", memory: [{variable: "n", type: "double", value: "?"}, {variable: "root", type: "double", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf() reads '25' from user", memory: [{variable: "n", type: "double", value: "25.00"}, {variable: "root", type: "double", value: "?"}], output: "" },
                  { line: 7, annotation: "Compute square root", memory: [{variable: "n", type: "double", value: "25.00"}, {variable: "root", type: "double", value: "5.00"}], output: "" },
                  { line: 8, annotation: "printf() displays result", memory: [{variable: "n", type: "double", value: "25.00"}, {variable: "root", type: "double", value: "5.00"}], output: "Square Root: 5.00\n" },
                  { line: 9, annotation: "Program terminates successfully", memory: [{variable: "n", type: "double", value: "25.00"}, {variable: "root", type: "double", value: "5.00"}], output: "Square Root: 5.00\n" }
                ]
              },
              posttest: [
                { question: "What is the output for input 2?", options: ["1.00", "1.41", "4.00", "2.00"], answerIndex: 1 },
                { question: "What is sqrt(0)?", options: ["1.00", "Undefined", "0.00", "NaN"], answerIndex: 2 },
                { question: "Which of the following correctly calls the square root function in C?", options: ["squareroot(n)", "sqrt[n]", "sqrt(n)", "Math.sqrt(n)"], answerIndex: 2 },
                { question: "What error occurs if you forget -lm during compilation?", options: ["Syntax error", "Runtime crash", "Linker error", "Logical error"], answerIndex: 2 },
                { question: "If the user enters 50, what is the approximate output?", options: ["25.00", "10.00", "5.00", "7.07"], answerIndex: 3 }
              ],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w3-2",
            title: "Compound Interest",
            desc: "Calculate Compound Interest given P, R, T.",
            expected: "Compound Interest: 210.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept principal, rate of interest, and number of years from the user, compute the compound interest, and display the result. The student will:",
                bullets: [
                  "Declare and use float/double variables",
                  "Apply the compound interest formula: CI = P * pow(1 + R/100, T) - P",
                  "Use the pow() function from math.h",
                  "Use printf() with %.2f to display the result to 2 decimal places",
                  "Distinguish between simple interest and compound interest computations"
                ]
              },
              theory: [
                {
                  title: "Compound Interest Formula",
                  body: ["Unlike simple interest, compound interest calculates interest on both the principal and the previously accumulated interest:", "A = P * pow(1 + R/100, T)", "CI = A - P", "Where: P = Principal, R = Annual rate, T = Time, A = Amount"]
                },
                {
                  title: "pow() Function",
                  body: ["Syntax: double pow(double base, double exp);", "Returns base raised to the power exp. Requires #include <math.h> and -lm at compilation."]
                },
                {
                  title: "Why Not Use Simple Multiplication?",
                  body: ["Compound interest involves raising a value to a power (exponentiation), which cannot be done cleanly with * alone for arbitrary T.", "pow() handles this for any real value of T, including fractional years."]
                },
                {
                  title: "Float vs Double",
                  body: ["For financial calculations with many decimal places, double is more precise than float. Always prefer double when using pow() and similar functions."]
                }
              ],
              pretest: [
                { question: "What is the formula for the Amount in compound interest?", options: ["A = P + R * T / 100", "A = P * pow(1 + R/100, T)", "A = P * R * T / 100", "A = P / pow(R, T)"], answerIndex: 1 },
                { question: "Which function is used to raise a number to a power in C?", options: ["sqrt()", "exp()", "pow()", "log()"], answerIndex: 2 },
                { question: "What is the Compound Interest itself (not the Amount)?", options: ["CI = P * pow(1 + R/100, T)", "CI = A + P", "CI = A - P", "CI = P - A"], answerIndex: 2 },
                { question: "For P = 1000, R = 10, T = 1, what is the compound interest?", options: ["110.00", "10.00", "100.00", "1100.00"], answerIndex: 2 },
                { question: "Why is pow() preferred over repeated multiplication for compound interest?", options: ["It is faster for small T", "It correctly handles any value of T including non-integers", "It avoids the need for float variables", "It rounds the result automatically"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how pow() is called and how CI is derived from Amount minus Principal.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter principal, rate, time — e.g. 1000 10 2",
                "Click Run Code. Verify output: Compound Interest: 210.00",
                "Try fractional rates like 1000 8.5 3 and compare with simple interest. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double p, r, t, a, ci;\n    scanf(\"%lf %lf %lf\", &p, &r, &t);\n    a = p * pow(1 + r/100, t);\n    ci = a - p;\n    printf(\"Compound Interest: %.2f\\n\", ci);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and math libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate memory for variables", memory: [{variable: "p", type: "double", value: "?"}, {variable: "r", type: "double", value: "?"}, {variable: "t", type: "double", value: "?"}, {variable: "a", type: "double", value: "?"}, {variable: "ci", type: "double", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf() reads '1000 10 2'", memory: [{variable: "p", type: "double", value: "1000"}, {variable: "r", type: "double", value: "10"}, {variable: "t", type: "double", value: "2"}, {variable: "a", type: "double", value: "?"}, {variable: "ci", type: "double", value: "?"}], output: "" },
                  { line: 7, annotation: "Compute Amount using pow()", memory: [{variable: "p", type: "double", value: "1000"}, {variable: "r", type: "double", value: "10"}, {variable: "t", type: "double", value: "2"}, {variable: "a", type: "double", value: "1210.00"}, {variable: "ci", type: "double", value: "?"}], output: "" },
                  { line: 8, annotation: "Compute Compound Interest", memory: [{variable: "p", type: "double", value: "1000"}, {variable: "r", type: "double", value: "10"}, {variable: "t", type: "double", value: "2"}, {variable: "a", type: "double", value: "1210.00"}, {variable: "ci", type: "double", value: "210.00"}], output: "" },
                  { line: 9, annotation: "printf() displays result", memory: [{variable: "p", type: "double", value: "1000"}, {variable: "r", type: "double", value: "10"}, {variable: "t", type: "double", value: "2"}, {variable: "a", type: "double", value: "1210.00"}, {variable: "ci", type: "double", value: "210.00"}], output: "Compound Interest: 210.00\n" },
                  { line: 10, annotation: "Program terminates successfully", memory: [{variable: "p", type: "double", value: "1000"}, {variable: "r", type: "double", value: "10"}, {variable: "t", type: "double", value: "2"}, {variable: "a", type: "double", value: "1210.00"}, {variable: "ci", type: "double", value: "210.00"}], output: "Compound Interest: 210.00\n" }
                ]
              },
              posttest: [
                { question: "For P = 1000, R = 10, T = 2, what is the Amount?", options: ["1100.00", "1200.00", "1210.00", "1020.00"], answerIndex: 2 },
                { question: "What is the Compound Interest for P = 1000, R = 10, T = 2?", options: ["200.00", "210.00", "100.00", "220.00"], answerIndex: 1 },
                { question: "How does compound interest differ from simple interest for the same inputs?", options: ["They are always equal", "Simple interest is always greater", "Compound interest grows faster because interest is earned on interest", "Compound interest only applies to integers"], answerIndex: 2 },
                { question: "What header and flag are required to use pow() in C?", options: ["stdlib.h, no flag needed", "math.h, -lm", "stdio.h, -lm", "math.h, -lmath"], answerIndex: 1 },
                { question: "For P = 500, R = 5, T = 3, what is CI approximately?", options: ["75.00", "78.81", "57.88", "100.00"], answerIndex: 1 }
              ],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w3-3",
            title: "Heron's Formula",
            desc: "Calculate the area of a triangle using sides a, b, c.",
            expected: "Area: 6.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept the three sides of a triangle from the user and compute its area using Heron's Formula. The student will:",
                bullets: [
                  "Declare and use float/double variables for side lengths and area",
                  "Compute the semi-perimeter of a triangle",
                  "Apply Heron's Formula using sqrt() from math.h",
                  "Validate that the three sides form a valid triangle",
                  "Use printf() with %.2f to display the computed area"
                ]
              },
              theory: [
                {
                  title: "Heron's Formula",
                  body: ["Given a triangle with sides a, b, and c, its area can be computed without knowing any angle:", "s = (a + b + c) / 2 (semi-perimeter)", "Area = sqrt(s * (s-a) * (s-b) * (s-c))", "This formula works for any triangle as long as the sides satisfy the triangle inequality."]
                },
                {
                  title: "Triangle Inequality",
                  body: ["For three sides to form a valid triangle, the sum of any two sides must be greater than the third side:", "a + b > c, b + c > a, a + c > b", "If this condition is not met, the expression inside sqrt() becomes negative or zero, yielding NaN or 0 as the area."]
                },
                {
                  title: "Semi-perimeter",
                  body: ["s is half the perimeter. It simplifies the formula and is a required intermediate value. Always compute s before computing the area."]
                },
                {
                  title: "sqrt() and math.h",
                  body: ["Heron's Formula requires a square root. Include math.h and compile with -lm."]
                }
              ],
              pretest: [
                { question: "What is the semi-perimeter s of a triangle with sides 3, 4, 5?", options: ["12", "7", "6", "5"], answerIndex: 2 },
                { question: "Using Heron's Formula, what is the area of a triangle with sides 3, 4, 5?", options: ["7.50", "5.00", "6.00", "12.00"], answerIndex: 2 },
                { question: "Which function computes the square root needed in Heron's Formula?", options: ["pow()", "sqrt()", "abs()", "ceil()"], answerIndex: 1 },
                { question: "What does the triangle inequality state?", options: ["All sides must be equal", "The sum of any two sides must be greater than the third", "One side must be the square root of another", "The sides must be integers"], answerIndex: 1 },
                { question: "What is the result inside sqrt() if the sides do not form a valid triangle?", options: ["A large positive number", "Zero or a negative number", "Always 1", "An integer"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how s is computed first and how each factor (s-a), (s-b), (s-c) is evaluated.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter three side lengths — e.g. 3 4 5",
                "Click Run Code. Verify output: Area: 6.00",
                "Try an equilateral triangle like 5 5 5 and an invalid input like 1 2 10. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double a, b, c, s, area;\n    scanf(\"%lf %lf %lf\", &a, &b, &c);\n    s = (a + b + c) / 2;\n    area = sqrt(s * (s-a) * (s-b) * (s-c));\n    printf(\"Area: %.2f\\n\", area);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and math libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate memory for variables", memory: [{variable: "a", type: "double", value: "?"}, {variable: "b", type: "double", value: "?"}, {variable: "c", type: "double", value: "?"}, {variable: "s", type: "double", value: "?"}, {variable: "area", type: "double", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf() reads '3 4 5' from user", memory: [{variable: "a", type: "double", value: "3.00"}, {variable: "b", type: "double", value: "4.00"}, {variable: "c", type: "double", value: "5.00"}, {variable: "s", type: "double", value: "?"}, {variable: "area", type: "double", value: "?"}], output: "" },
                  { line: 7, annotation: "Compute semi-perimeter s", memory: [{variable: "a", type: "double", value: "3.00"}, {variable: "b", type: "double", value: "4.00"}, {variable: "c", type: "double", value: "5.00"}, {variable: "s", type: "double", value: "6.00"}, {variable: "area", type: "double", value: "?"}], output: "" },
                  { line: 8, annotation: "Compute Area using Heron's formula", memory: [{variable: "a", type: "double", value: "3.00"}, {variable: "b", type: "double", value: "4.00"}, {variable: "c", type: "double", value: "5.00"}, {variable: "s", type: "double", value: "6.00"}, {variable: "area", type: "double", value: "6.00"}], output: "" },
                  { line: 9, annotation: "printf() displays area", memory: [{variable: "a", type: "double", value: "3.00"}, {variable: "b", type: "double", value: "4.00"}, {variable: "c", type: "double", value: "5.00"}, {variable: "s", type: "double", value: "6.00"}, {variable: "area", type: "double", value: "6.00"}], output: "Area: 6.00\n" },
                  { line: 10, annotation: "Program terminates successfully", memory: [{variable: "a", type: "double", value: "3.00"}, {variable: "b", type: "double", value: "4.00"}, {variable: "c", type: "double", value: "5.00"}, {variable: "s", type: "double", value: "6.00"}, {variable: "area", type: "double", value: "6.00"}], output: "Area: 6.00\n" }
                ]
              },
              posttest: [
                { question: "For sides 5, 5, 5, what is the semi-perimeter?", options: ["5.00", "15.00", "7.50", "10.00"], answerIndex: 2 },
                { question: "What is the area of an equilateral triangle with side 6?", options: ["36.00", "18.00", "15.59", "12.00"], answerIndex: 2 },
                { question: "For sides 1, 2, 10, what does the program output?", options: ["Area: 0.00", "Area: NaN or invalid result", "Area: 5.00", "Compilation error"], answerIndex: 1 },
                { question: "Which intermediate value must be computed before the area in Heron's Formula?", options: ["The height of the triangle", "The perimeter only", "The semi-perimeter s", "The largest angle"], answerIndex: 2 },
                { question: "For sides 6, 8, 10, what is the area?", options: ["48.00", "20.00", "30.00", "24.00"], answerIndex: 2 }
              ],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w3-4",
            title: "Distance Traveled",
            desc: "Calculate distance using s = ut + 0.5*a*t^2.",
            expected: "Distance: 20.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept initial velocity, acceleration, and time from the user, compute the distance traveled using the equation of motion, and display the result. The student will:",
                bullets: [
                  "Declare and use float variables for physical quantities",
                  "Apply the kinematic equation: s = ut + (1/2) * a * t * t",
                  "Understand why (1/2) must be written as 0.5 or (float)1/2 to avoid integer truncation",
                  "Use printf() with %.2f to display the distance to 2 decimal places"
                ]
              },
              theory: [
                {
                  title: "Equation of Motion",
                  body: ["The distance traveled by an object under uniform acceleration is:", "s = u*t + 0.5 * a * t * t", "Where: s = Distance (m), u = Initial velocity (m/s), a = Acceleration (m/s²), t = Time (s)", "This is the second equation of motion from classical kinematics."]
                },
                {
                  title: "Integer Division Pitfall",
                  body: ["Writing 1/2 in C evaluates to 0 because both operands are integer literals, truncating the result.", "Always write 0.5 or (float)1/2 to preserve the half factor."]
                },
                {
                  title: "Squaring t",
                  body: ["C has no ** operator. To compute t squared, write t * t or use pow(t, 2).", "For simple squaring, t * t is preferred as it avoids the overhead of calling pow()."]
                },
                {
                  title: "Units",
                  body: ["Ensure consistent units. If u is in m/s and a is in m/s², then t must be in seconds and s will be in metres."]
                }
              ],
              pretest: [
                { question: "What is the kinematic formula for distance traveled under uniform acceleration?", options: ["s = u + a * t", "s = u*t + 0.5 * a * t * t", "s = 0.5 * u * t * t + a", "s = (u + a) * t / 2"], answerIndex: 1 },
                { question: "What does 1/2 evaluate to in C when both are integer literals?", options: ["0.5", "1", "0", "2"], answerIndex: 2 },
                { question: "How should the half factor be correctly written in C?", options: ["1/2", "1//2", "0.5", "half"], answerIndex: 2 },
                { question: "If u = 0, a = 10, t = 2, what is the distance?", options: ["40.00", "10.00", "20.00", "5.00"], answerIndex: 2 },
                { question: "Which operator computes t squared in C?", options: ["t^2", "t**2", "pow(t,2) or t*t", "sq(t)"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how each term u*t and 0.5*a*t*t is computed and summed.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter initial velocity, acceleration, time — e.g. 0 10 2",
                "Click Run Code. Verify output: Distance: 20.00",
                "Try u = 5, a = 2, t = 3 and manually verify. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    float u, a, t, s;\n    scanf(\"%f %f %f\", &u, &a, &t);\n    s = u * t + 0.5 * a * t * t;\n    printf(\"Distance: %.2f\\n\", s);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for floats", memory: [{variable: "u", type: "float", value: "?"}, {variable: "a", type: "float", value: "?"}, {variable: "t", type: "float", value: "?"}, {variable: "s", type: "float", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '0 10 2'", memory: [{variable: "u", type: "float", value: "0.00"}, {variable: "a", type: "float", value: "10.00"}, {variable: "t", type: "float", value: "2.00"}, {variable: "s", type: "float", value: "?"}], output: "" },
                  { line: 6, annotation: "Compute Distance s", memory: [{variable: "u", type: "float", value: "0.00"}, {variable: "a", type: "float", value: "10.00"}, {variable: "t", type: "float", value: "2.00"}, {variable: "s", type: "float", value: "20.00"}], output: "" },
                  { line: 7, annotation: "printf() displays distance", memory: [{variable: "u", type: "float", value: "0.00"}, {variable: "a", type: "float", value: "10.00"}, {variable: "t", type: "float", value: "2.00"}, {variable: "s", type: "float", value: "20.00"}], output: "Distance: 20.00\n" },
                  { line: 8, annotation: "Program terminates", memory: [{variable: "u", type: "float", value: "0.00"}, {variable: "a", type: "float", value: "10.00"}, {variable: "t", type: "float", value: "2.00"}, {variable: "s", type: "float", value: "20.00"}], output: "Distance: 20.00\n" }
                ]
              },
              posttest: [
                { question: "For u = 5, a = 2, t = 3, what is the distance?", options: ["20.00", "21.00", "24.00", "30.00"], answerIndex: 2 },
                { question: "What is the distance when u = 10, a = 0, t = 5?", options: ["0.00", "25.00", "50.00", "100.00"], answerIndex: 2 },
                { question: "Why is t*t preferred over pow(t,2) for squaring in simple programs?", options: ["pow() gives wrong results for integers", "t*t avoids including math.h and is simpler", "pow() only works for doubles", "t*t is always more accurate"], answerIndex: 1 },
                { question: "What is the output for u = 0, a = 0, t = 10?", options: ["10.00", "100.00", "0.00", "50.00"], answerIndex: 2 },
                { question: "For u = 20, a = -5, t = 4, what is the distance?", options: ["80.00", "40.00", "60.00", "20.00"], answerIndex: 1 }
              ],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 4",
        objective: "Expressions, operator precedence and associativity",
        tutorial: "Tutorial 4: Operators and Precedence",
        labTitle: "Lab 4: Expressions and Operators",
        experiments: [
          {
            id: "c-w4-1",
            title: "Expression Evaluation",
            desc: "Evaluate the expression A+B*C+(D*E)+F*G.",
            expected: "Result=X",
          },
          {
            id: "c-w4-2",
            title: "Max of Three",
            desc: "Find maximum among three numbers using conditional operator.",
            expected: "Max=X",
          },
          {
            id: "c-w4-3",
            title: "Marks Average",
            desc: "Calculate total and average of 5 subjects.",
            expected: "Total=X Avg=X.XX",
          },
        ],
      },
      {
        title: "WEEK 5",
        objective: "if-else, switch-case, nested-if, relational and logical operators",
        tutorial: "Tutorial 5: Branching",
        labTitle: "Lab 5: Conditional statements",
        experiments: [
          {
            id: "c-w5-1",
            title: "Max and Min of Four Numbers",
            desc: "Find the max and min of four numbers using if-else.",
            expected: "Max=X Min=X",
          },
          {
            id: "c-w5-2",
            title: "Electricity Bill Generator",
            desc: "Generate electricity bill based on units consumed.",
            expected: "Bill=X.XX",
          },
          {
            id: "c-w5-3",
            title: "Quadratic Roots",
            desc: "Find roots of the quadratic equation ax2+bx+c=0.",
            expected: "Roots or Complex",
          },
          {
            id: "c-w5-4",
            title: "Calculator using Switch",
            desc: "Simulate a basic calculator for +, -, *, /.",
            expected: "Result of operation",
          },
          {
            id: "c-w5-5",
            title: "Leap Year Check",
            desc: "Determine if a given year is a leap year.",
            expected: "Leap Year / Not Leap Year",
          },
        ],
      },
      {
        title: "WEEK 6",
        objective: "while, do-while, for loops, break and continue",
        tutorial: "Tutorial 6: Loops",
        labTitle: "Lab 6: Iterative problems",
        experiments: [
          {
            id: "c-w6-1",
            title: "Factorial",
            desc: "Calculate factorial of a given number.",
            expected: "Factorial=X",
          },
          {
            id: "c-w6-2",
            title: "Prime Number Check",
            desc: "Check if a number is prime.",
            expected: "Prime / Not Prime",
          },
          {
            id: "c-w6-3",
            title: "Sine Series",
            desc: "Calculate sin(x) using Taylor series expansion.",
            expected: "Sin=X.XXXX",
          },
          {
            id: "c-w6-4",
            title: "Palindrome Check",
            desc: "Check if a number is a palindrome.",
            expected: "Palindrome / Not Palindrome",
          },
          {
            id: "c-w6-5",
            title: "Number Pyramid",
            desc: "Print a number pyramid pattern.",
            expected: "Pyramid pattern",
          },
        ],
      },
      {
        title: "WEEK 7",
        objective: "1D array definition, initialization, linear search",
        tutorial: "Tutorial 7: 1D Arrays",
        labTitle: "Lab 7: Array manipulation",
        experiments: [
          {
            id: "c-w7-1",
            title: "Min and Max of Array",
            desc: "Find minimum and maximum in 1D array.",
            expected: "Min=X Max=X",
          },
          {
            id: "c-w7-2",
            title: "Linear Search",
            desc: "Search for an element in a 1D array.",
            expected: "Found at index X / Not Found",
          },
          {
            id: "c-w7-3",
            title: "Reverse Array",
            desc: "Reverse the elements of a 1D array.",
            expected: "Reversed array",
          },
          {
            id: "c-w7-4",
            title: "Remove Duplicates",
            desc: "Remove duplicate elements from an array.",
            expected: "Array without duplicates",
          },
        ],
      },
      {
        title: "WEEK 8",
        objective: "2D arrays, string operations, bubble sort",
        tutorial: "Tutorial 8: Matrices, Strings, Sorting",
        labTitle: "Lab 8: 2D Arrays and Strings",
        experiments: [
          {
            id: "c-w8-1",
            title: "Matrix Addition",
            desc: "Add two matrices.",
            expected: "Result matrix",
          },
          {
            id: "c-w8-2",
            title: "Matrix Multiplication",
            desc: "Multiply two matrices.",
            expected: "Product matrix",
          },
          {
            id: "c-w8-3",
            title: "Bubble Sort",
            desc: "Sort an array using bubble sort.",
            expected: "Sorted array",
          },
          {
            id: "c-w8-4",
            title: "String Concatenation",
            desc: "Concatenate two strings without using strcat().",
            expected: "Concatenated string",
          },
          {
            id: "c-w8-5",
            title: "Reverse String",
            desc: "Reverse a string.",
            expected: "Reversed string",
          },
        ],
      },
      {
        title: "WEEK 9",
        objective: "malloc, calloc, realloc, free, command-line args",
        tutorial: "Tutorial 9: Pointers and Dynamic Memory",
        labTitle: "Lab 9: Dynamic Allocation",
        experiments: [
          {
            id: "c-w9-1",
            title: "Array Sum using malloc",
            desc: "Calculate the sum of elements allocated via malloc().",
            expected: "Sum=X",
          },
          {
            id: "c-w9-2",
            title: "Student Average using Structures",
            desc: "Array of structures dynamically allocated with malloc().",
            expected: "Average=X.XX",
          },
          {
            id: "c-w9-3",
            title: "Failed Students using calloc",
            desc: "Filter and print failed students from an array allocated with calloc().",
            expected: "List of failed students",
          },
        ],
      },
      {
        title: "WEEK 10",
        objective: "Structures, Unions, bit fields, singly linked list",
        tutorial: "Tutorial 10: Structures and Unions",
        labTitle: "Lab 10: Advanced Data Structures",
        experiments: [
          {
            id: "c-w10-1",
            title: "Singly Linked List",
            desc: "Create and display a singly linked list.",
            expected: "X->X->NULL",
          },
          {
            id: "c-w10-2",
            title: "Structure vs Union Demo",
            desc: "Compare sizes of struct and union.",
            expected: "Different sizes shown",
          },
        ],
      },
      {
        title: "WEEK 11",
        objective: "Functions, call by value, scope, Euler's method",
        tutorial: "Tutorial 11: Functions",
        labTitle: "Lab 11: Modular Programming",
        experiments: [
          {
            id: "c-w11-1",
            title: "NCR Value",
            desc: "Calculate nCr using functions.",
            expected: "NCR=X",
          },
          {
            id: "c-w11-2",
            title: "String Length without strlen",
            desc: "Calculate the length of a string using a custom function.",
            expected: "Length=X",
          },
          {
            id: "c-w11-3",
            title: "Matrix Transpose",
            desc: "Transpose a matrix via a function.",
            expected: "Transposed matrix",
          },
        ],
      },
      {
        title: "WEEK 12",
        objective: "Recursive functions for naturally recursive problems",
        tutorial: "Tutorial 12: Recursion",
        labTitle: "Lab 12: Recursive techniques",
        experiments: [
          {
            id: "c-w12-1",
            title: "Fibonacci Series",
            desc: "Generate the Fibonacci series using recursion.",
            expected: "Fibonacci sequence",
          },
          {
            id: "c-w12-2",
            title: "Factorial Recursive",
            desc: "Calculate factorial recursively.",
            expected: "Factorial=X",
          },
          {
            id: "c-w12-3",
            title: "Ackermann Function",
            desc: "Compute the Ackermann function recursively.",
            expected: "Ackermann=X",
          },
        ],
      },
      {
        title: "WEEK 13",
        objective: "Pointers, call by reference, dangling pointers",
        tutorial: "Tutorial 13: Call by Reference and Pointers",
        labTitle: "Lab 13: Pointer manipulations",
        experiments: [
          {
            id: "c-w13-1",
            title: "Swap using Call by Reference",
            desc: "Swap two numbers using pointers.",
            expected: "Swapped values",
          },
          {
            id: "c-w13-2",
            title: "String Copy using Pointer",
            desc: "Copy a string using pointers.",
            expected: "Copied string",
          },
          {
            id: "c-w13-3",
            title: "Count Characters using Pointer",
            desc: "Count uppercase, lowercase, digits, and special characters using pointers.",
            expected: "Character counts",
          },
        ],
      },
      {
        title: "WEEK 14",
        objective: "File I/O, text and binary files, command-line args",
        tutorial: "Tutorial 14: File Handling",
        labTitle: "Lab 14: File operations",
        experiments: [
          {
            id: "c-w14-1",
            title: "Write and Read Text File",
            desc: "Simulate writing to and reading from a text file.",
            expected: "Read: [input text]",
          },
          {
            id: "c-w14-2",
            title: "Count Lines Words Characters",
            desc: "Read a file and output the count of lines, words, and characters.",
            expected: "Lines=X Words=X Chars=X",
          },
        ],
      },
    ],
  },
  "dbms": {
    id: "dbms",
    title: "Database Management Systems Lab",
    objectives: "To introduce basic SQL as a universal language, demonstrate relational algebra configurations, system design using normalization principles, and transaction workflows.",
    weeks: [
      {
        title: "WEEK 1",
        objective: "Understand database characteristics, centralized vs client-server systems and schema environments.",
        tutorial: "Tutorial 1: Database System Concepts & Architectures",
        labTitle: "Lab 1: Baseline Environments",
        experiments: [
          {
            id: "dbms-w1-1",
            title: "Database Architecture Identification",
            desc: "Write an structural script modeling a three-schema architecture layout showing clear boundaries between External, Conceptual, and Internal storage mappings.",
            expected: "Schema environment verified successfully.",
          }
        ]
      },
      {
        title: "WEEK 2",
        objective: "Conceptualization of business logics into Entity Relationship Diagrams including attributes and inheritance structures.",
        tutorial: "Tutorial 2: Conceptual Design via ER Diagrams",
        labTitle: "Lab 2: Conceptual Mapping Structures",
        experiments: [
          {
            id: "dbms-w2-1",
            title: "ER Schema Definitions",
            desc: "Map an e-commerce platform using specialization, generalization, and structural cardinality annotations.",
            expected: "ER model translation constraints validated.",
          }
        ]
      },
      {
        title: "WEEK 3",
        objective: "Learn the foundational constructs of Data Definition Language (DDL), table mappings, data types, and domains.",
        tutorial: "Tutorial 3: Relational Model Foundations & Core DDL",
        labTitle: "Lab 3: Tables and Domain Schema Designs",
        experiments: [
          {
            id: "dbms-w3-1",
            title: "Table Structures",
            desc: "Construct the standard University Database schema schema including custom primary domains using CREATE TABLE instructions.",
            expected: "Table created matching system domain restrictions.",
          }
        ]
      },
      {
        title: "WEEK 4",
        objective: "Implementation of column constraints such as Key Restrictions, integrity validations, and column variations.",
        tutorial: "Tutorial 4: Key Assertions & Structural Mutators",
        labTitle: "Lab 4: Column Modifications & Integrity Configurations",
        experiments: [
          {
            id: "dbms-w4-1",
            title: "Enforcing Key Constraints",
            desc: "Alter existing table properties to inject multi-column Composite Primary Keys and customized operational constraints via ALTER TABLE queries.",
            expected: "Query OK, 0 rows affected. Integrity rules applied.",
          }
        ]
      },
      {
        title: "WEEK 5",
        objective: "Executing core Data Manipulation Language (DML) primitives: records injections, targeted evaluations, and data deletions.",
        tutorial: "Tutorial 5: Mutation Engines (INSERT, UPDATE, DELETE)",
        labTitle: "Lab 5: Data Modifications",
        experiments: [
          {
            id: "dbms-w5-1",
            title: "DML Transaction Population",
            desc: "Populate relational records into tables using INSERT INTO statements, and update fields dynamically utilizing standard WHERE condition checks.",
            expected: "Rows injected: 5, Row fields altered: 2.",
          }
        ]
      },
      {
        title: "WEEK 6",
        objective: "Formulate simple relational projections and arithmetic logical operations via where filters.",
        tutorial: "Tutorial 6: Projections, Selections & Filters",
        labTitle: "Lab 6: Selection Filters & Operations",
        experiments: [
          {
            id: "dbms-w6-1",
            title: "Targeted Row Extraction",
            desc: "Write a SQL query utilizing select, mathematical operations, and explicit string-matching wildcards to surface targeted data values.",
            expected: "Displaying rows matching target pattern configurations.",
          }
        ]
      },
      {
        title: "WEEK 7",
        objective: "Leverage standard SQL analytical operations: temporal mutations, string conversions, and scalar transformations.",
        tutorial: "Tutorial 7: Core Date, Time & Built-in System Functions",
        labTitle: "Lab 7: Scalar and Date Manipulations",
        experiments: [
          {
            id: "dbms-w7-1",
            title: "Temporal & String Transformations",
            desc: "Extract age patterns using structural system Date functions, and format descriptive string text using built-in system keywords.",
            expected: "Tabular conversion outputs mapping strict formats.",
          }
        ]
      },
      {
        title: "WEEK 8",
        objective: "Build grouping metrics, multi-level mathematical aggregates, and ordered conditional selections.",
        tutorial: "Tutorial 8: Data Aggregation & Sequence Control",
        labTitle: "Lab 8: GROUP BY, HAVING, and ORDER BY Operations",
        experiments: [
          {
            id: "dbms-w8-1",
            title: "Hierarchical Aggregate Compilations",
            desc: "Calculate dynamic totals grouped across matching conditions, keeping rows filtered down using HAVING logic structures.",
            expected: "Aggregated sum rows compiled under explicit matching groupings.",
          }
        ]
      },
      {
        title: "WEEK 9",
        objective: "Master core relational joins: Cross, Inner, Left Outer, Right Outer, and Full Multi-Table linkages.",
        tutorial: "Tutorial 9: Cross-Table Relational Join Engines",
        labTitle: "Lab 9: Multi-Table Joins & Operations",
        experiments: [
          {
            id: "dbms-w9-1",
            title: "Relational Set Combinations",
            desc: "Combine related database collections together across shared indexing targets using implicit INNER and OUTER JOIN expressions.",
            expected: "Multi-column projection compiled cleanly without Cartesian generation errors.",
          }
        ]
      },
      {
        title: "WEEK 10",
        objective: "Implement compound nested queries, existential checks, and updatable subview structures.",
        tutorial: "Tutorial 10: Advanced Subqueries & Security Views",
        labTitle: "Lab 10: Subqueries and Virtual Relational Views",
        experiments: [
          {
            id: "dbms-w10-1",
            title: "Correlated Nested Query Configurations",
            desc: "Write complex sub-queries leveraging IN, EXISTS, and ANY directives, and save the code execution pipeline inside a logical CREATE VIEW definition.",
            expected: "Virtual compilation succeeded. View reference established.",
          }
        ]
      },
      {
        title: "WEEK 11",
        objective: "Deconstruct anomalies using functional dependency refinement and core normalization standards (1NF, 2NF, 3NF, BCNF).",
        tutorial: "Tutorial 11: Schema Refinement and Normal Forms",
        labTitle: "Lab 11: Normalization Decomposition Paths",
        experiments: [
          {
            id: "dbms-w11-1",
            title: "Lossless Join Decompositions",
            desc: "Deconstruct anomalous schemas mapping surrogate keys to clear 3NF parameters to guarantee dependency preservation.",
            expected: "Normalization matrix split confirmed matching minimal dependency properties.",
          }
        ]
      },
      {
        title: "WEEK 12",
        objective: "Verify ACID properties, time-stamp isolation behaviors, and rollback configurations under concurrent lock schedules.",
        tutorial: "Tutorial 12: ACID Processing, Recovery & Index Mappings",
        labTitle: "Lab 12: Transactions & Index Controls",
        experiments: [
          {
            id: "dbms-w12-1",
            title: "Transactional Command Blocks",
            desc: "Simulate banking operations by enforcing block safety limits using BEGIN TRANSACTION, SAVEPOINT offsets, and final COMMIT instructions.",
            expected: "Commit successfully completed. Ledger transaction state persistent.",
          }
        ]
      }
    ]
  },
  "machine-learning": {
    id: "machine-learning",
    title: "Machine Learning Lab",
    objectives: [
      "To provide students with a practical understanding of core machine learning algorithms and their applications.",
      "To enable students to preprocess, clean, and prepare real-world datasets for machine learning tasks.",
      "To help students implement and evaluate supervised learning algorithms including classification and regression techniques.",
      "To familiarize students with unsupervised learning techniques such as clustering and expectation maximization.",
      "To develop the ability to tune algorithm parameters and evaluate model performance using appropriate metrics.",
      "To expose students to tools and libraries commonly used in the machine learning ecosystem such as Python (scikit-learn, NumPy, pandas), R, and Weka.",
      "To strengthen analytical and problem-solving skills by applying machine learning models to diverse datasets.",
      "To prepare students for advanced topics in deep learning, data science, and AI-driven applications."
    ],
    introduction: [
      "Machine Learning is a branch of Artificial Intelligence that enables systems to learn from data, identify patterns, and make decisions with minimal human intervention. It has become one of the most transformative technologies in fields such as healthcare, finance, e-commerce, computer vision, and natural language processing.",
      "This virtual laboratory provides a hands-on learning environment for students to explore and experiment with core machine learning algorithms and techniques using Python, R, or Weka. The lab is designed to bridge the gap between theoretical concepts taught in classrooms and their practical implementation on real-world datasets.",
      "Through a series of guided experiments, students will gain experience in data preprocessing, supervised learning, unsupervised learning, classification, regression, and clustering techniques. The experiments are structured progressively, starting from fundamental statistical measures and advancing to complex neural network and clustering algorithms.",
      "This lab is developed to support undergraduate and postgraduate students pursuing courses in Machine Learning, Data Science, Artificial Intelligence, and related disciplines."
    ],
    targetAudience: {
      primary: "Undergraduate students (B.Tech / B.E. / B.Sc.) pursuing courses in Computer Science, Information Technology, Electronics, or related engineering disciplines.",
      prerequisites: [
        "Programming fundamentals (preferably Python or R)",
        "Mathematics including statistics, probability, and linear algebra",
        "Basic concepts of data structures and algorithms"
      ],
      usefulFor: [
        "Postgraduate students (M.Tech / M.E. / M.Sc. / MCA) specializing in Artificial Intelligence, Machine Learning, Data Science, or Computer Applications.",
        "Research scholars and academicians who wish to explore and demonstrate machine learning concepts in a simulated environment.",
        "Faculty members who want to use the lab as a supplementary teaching tool to reinforce classroom learning.",
        "Professionals and self-learners who seek structured, experiment-based exposure to machine learning algorithms."
      ]
    },
    alignment: {
      university: "Various Universities Globally",
      department: "Computer Science and Engineering / IT",
      course: "Machine Learning Lab",
      credits: "L:0 T:0 P:3 C:1.5",
      yearSem: "Third / Fourth Year",
      branches: "CSE, IT, AI&DS, ECE",
      totalExperiments: "14 Guided Experiments",
      compiler: "Python 3 Runtime Environment",
      units: [
        { unit: "Unit I", topics: "Statistical Foundations, Data Preprocessing", weeks: "Week 1–2" },
        { unit: "Unit II", topics: "Instance-Based Learning, Tree-Based Models, Ensemble Methods", weeks: "Week 3–6" },
        { unit: "Unit III", topics: "Probabilistic Learning, Kernel Methods, Linear Models", weeks: "Week 7–10" },
        { unit: "Unit IV", topics: "Neural Networks", weeks: "Week 11" },
        { unit: "Unit V", topics: "Clustering Algorithms", weeks: "Week 12–14" }
      ]
    },
    weeks: [
      {
        title: "WEEK 1",
        objective: "Understand and compute essential statistical metrics that summarize datasets.",
        tutorial: "Tutorial 1: Statistical Foundations",
        labTitle: "Lab 1: Descriptive Statistics",
        experiments: [
          {
            id: "ml-w1-1",
            title: "Compute Central Tendency and Dispersion",
            desc: "Compute Central Tendency Measures: Mean, Median, Mode. Measure of Dispersion: Variance, Standard Deviation.",
            expected: "Successfully computed Mean, Median, Mode, Variance, and Standard Deviation for the given dataset.",
            content: {
              aim: {
                text: "To compute the measures of central tendency namely Mean, Median, and Mode, and measures of dispersion namely Variance and Standard Deviation for a given dataset using Python / R / Weka, and to interpret the statistical significance of each measure in understanding the distribution of data."
              },
              theory: [
                {
                  title: "1. Descriptive Statistics",
                  body: [
                    "Descriptive statistics summarize and describe the main features of a dataset. They provide simple summaries about the sample and the measures, forming the basis of quantitative analysis.",
                    "Descriptive statistics are broadly divided into two categories:",
                    "• Measures of Central Tendency — describe the center or typical value of a dataset",
                    "• Measures of Dispersion — describe the spread or variability of a dataset"
                  ]
                },
                {
                  title: "2. Measures of Central Tendency",
                  body: [
                    "2.1 Mean (Arithmetic Mean)",
                    "The mean is the sum of all values in the dataset divided by the total number of values. It is the most commonly used measure of central tendency.",
                    "Formula: Mean (μ) = (x₁ + x₂ + x₃ + ... + xₙ) / n",
                    "Properties: Sensitive to extreme values (outliers), Uses all data points in its calculation, Best used for normally distributed data.",
                    "2.2 Median",
                    "The median is the middle value of a dataset when the values are arranged in ascending or descending order. If the number of observations is even, the median is the average of the two middle values.",
                    "Formula: If n is odd: Median = value at position (n+1)/2. If n is even: Median = average of values at positions n/2 and (n/2)+1.",
                    "Properties: Not affected by outliers, Best used for skewed distributions, Divides the dataset into two equal halves.",
                    "2.3 Mode",
                    "The mode is the value that appears most frequently in a dataset. A dataset can have no mode, one mode (unimodal), two modes (bimodal), or more than two modes (multimodal).",
                    "Properties: Can be used for both numerical and categorical data, Not affected by extreme values, May not exist or may not be unique."
                  ]
                },
                {
                  title: "3. Measures of Dispersion",
                  body: [
                    "3.1 Variance",
                    "Variance measures how far each data point in the dataset is from the mean. It is the average of the squared differences from the mean.",
                    "Formula: Population Variance (σ²) = Σ(xᵢ - μ)² / n, Sample Variance (s²) = Σ(xᵢ - x̄)² / (n - 1)",
                    "Properties: Always non-negative, A variance of 0 means all values are identical, Higher variance indicates greater spread.",
                    "3.2 Standard Deviation",
                    "Standard deviation is the square root of variance. It expresses the spread of data in the same units as the original data, making it more interpretable than variance.",
                    "Formula: Population Standard Deviation (σ) = √(σ²), Sample Standard Deviation (s) = √(s²)",
                    "Properties: Expressed in the same unit as the data, A low standard deviation means values are close to the mean, A high standard deviation means values are spread out widely."
                  ]
                },
                {
                  title: "4. Relationship Between Measures",
                  body: [
                    "Mean - Central Tendency - Sensitive to Outliers - Best Used When Data is symmetric",
                    "Median - Central Tendency - Not Sensitive to Outliers - Best Used When Data is skewed",
                    "Mode - Central Tendency - Not Sensitive to Outliers - Best Used When Categorical / Frequency data",
                    "Variance - Dispersion - Sensitive to Outliers - Best Used When Comparing spread across datasets",
                    "Standard Deviation - Dispersion - Sensitive to Outliers - Best Used When Interpreting spread in original units"
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment from the available options: Python (using NumPy, pandas, SciPy), R (using base functions), Weka (using the Explorer interface).",
                "Step 2: Load or Enter the Dataset. You may either enter a custom dataset manually using the input field provided, or Select a sample dataset from the dropdown list available in the simulation panel.",
                "Step 3: Inspect the Dataset. View the raw data values displayed in the table. Note the number of observations (n), the minimum value, and the maximum value.",
                "Step 4: Compute Measures of Central Tendency. Click the Compute Mean button to calculate and display the arithmetic mean. Click the Compute Median button to sort the data and identify the middle value. Click the Compute Mode button to identify the most frequently occurring value(s).",
                "Step 5: Compute Measures of Dispersion. Click the Compute Variance button to calculate variance using both population and sample formulas. Click the Compute Standard Deviation button to derive the standard deviation.",
                "Step 6: Visualize the Results. Observe the histogram or frequency distribution chart generated from the dataset. The mean, median, and mode values will be highlighted on the chart with distinct markers.",
                "Step 7: Interpret the Output. Compare the mean, median, and mode values. Analyze whether the distribution is symmetric, positively skewed, or negatively skewed based on the relationship between these values. Note the spread of the data from the variance and standard deviation values.",
                "Step 8: Change the Dataset. Modify the input data or select a different sample dataset to observe how the statistics change. Repeat Steps 3 to 7.",
                "Step 9: Record Observations. Note your computed values in the observation table provided. Answer the post-test questions based on your understanding."
              ],
              simulation: {
                code: "import numpy as np\nfrom scipy import stats\n\n# Dataset: 4, 7, 13, 2, 7, 9, 7, 3, 5, 11\ndata = [4, 7, 13, 2, 7, 9, 7, 3, 5, 11]\n\nmean = np.mean(data)\nmedian = np.median(data)\nmode = stats.mode(data, keepdims=False)[0]\n\nvar_pop = np.var(data)\nvar_sample = np.var(data, ddof=1)\n\nstd_pop = np.std(data)\nstd_sample = np.std(data, ddof=1)\n\nprint(f'Mean: {mean}')\nprint(f'Median: {median}')\nprint(f'Mode: {mode}')\nprint(f'Variance (Pop): {var_pop}')\nprint(f'Variance (Sample): {var_sample}')\nprint(f'Std Dev (Pop): {std_pop}')\nprint(f'Std Dev (Sample): {std_sample}')\n",
                steps: [
                  { line: 1, annotation: "Import numpy and scipy.stats", memory: [], output: "" },
                  { line: 5, annotation: "Load the dataset", memory: [{variable: "data", type: "list", value: "[4, 7, 13, 2, 7, 9, 7, 3, 5, 11]"}], output: "" },
                  { line: 7, annotation: "Compute Mean", memory: [{variable: "mean", type: "float", value: "6.8"}], output: "" },
                  { line: 8, annotation: "Compute Median", memory: [{variable: "median", type: "float", value: "7.0"}], output: "" },
                  { line: 9, annotation: "Compute Mode", memory: [{variable: "mode", type: "float", value: "7.0"}], output: "" },
                  { line: 11, annotation: "Compute Population Variance", memory: [{variable: "var_pop", type: "float", value: "10.16"}], output: "" },
                  { line: 12, annotation: "Compute Sample Variance", memory: [{variable: "var_sample", type: "float", value: "11.288"}], output: "" },
                  { line: 14, annotation: "Compute Population Std Dev", memory: [{variable: "std_pop", type: "float", value: "3.187"}], output: "" },
                  { line: 15, annotation: "Compute Sample Std Dev", memory: [{variable: "std_sample", type: "float", value: "3.360"}], output: "" },
                  { line: 17, annotation: "Print outputs", memory: [], output: "Mean: 6.8\nMedian: 7.0\nMode: 7.0\nVariance (Pop): 10.16\nVariance (Sample): 11.288888888888888\nStd Dev (Pop): 3.1874754901019623\nStd Dev (Sample): 3.3598941782267675" }
                ]
              },
              pretest: [
                {
                  question: "Which of the following is NOT a measure of central tendency?",
                  options: ["Mean", "Median", "Variance", "Mode"],
                  answerIndex: 2
                },
                {
                  question: "The arithmetic mean of 5 values: 10, 20, 30, 40, 50 is:",
                  options: ["25", "35", "30", "40"],
                  answerIndex: 2
                },
                {
                  question: "Standard Deviation is defined as:",
                  options: ["Square of Variance", "Square Root of Variance", "Sum of all deviations from Mean", "Average of all squared values"],
                  answerIndex: 1
                },
                {
                  question: "For the dataset: 5, 3, 8, 3, 7, 3, 9 — what is the Mode?",
                  options: ["5", "7", "3", "8"],
                  answerIndex: 2
                },
                {
                  question: "When the number of observations in a dataset is even, the Median is calculated as:",
                  options: ["The largest value in the dataset", "The value at position (n+1)/2", "The average of the two middle values", "The most frequently occurring value"],
                  answerIndex: 2
                }
              ],
              posttest: [
                {
                  question: "For the dataset: 3, 5, 7, 7, 9, 11, 13 — what is the Median?",
                  options: ["7", "7.86", "9", "8"],
                  answerIndex: 0
                },
                {
                  question: "Which measure of central tendency is most affected by the presence of outliers in a dataset?",
                  options: ["Mode", "Median", "Mean", "All are equally affected"],
                  answerIndex: 2
                },
                {
                  question: "If the Mean of a dataset is 50 and the Standard Deviation is 0, what can you conclude?",
                  options: ["All values are different", "All values are equal to 50", "The data is highly skewed", "The variance is 50"],
                  answerIndex: 1
                },
                {
                  question: "For the dataset: 2, 4, 4, 4, 5, 5, 7, 9 — the Sample Variance is:",
                  options: ["3.57", "4.0", "2.0", "3.14"],
                  answerIndex: 0
                },
                {
                  question: "In a distribution where Mean > Median > Mode, the distribution is said to be:",
                  options: ["Symmetric", "Negatively skewed (left-skewed)", "Positively skewed (right-skewed)", "Bimodal"],
                  answerIndex: 2
                }
              ]
            }
          }
        ]
      },
      {
        title: "WEEK 2",
        objective: "Learn to clean and prepare raw data for machine learning models.",
        tutorial: "Tutorial 2: Data Preprocessing",
        labTitle: "Lab 2: Data Cleaning & Feature Selection",
        experiments: [
          {
            id: "ml-w2-1",
            title: "Data Pre-processing Techniques",
            desc: "Apply the following Pre-processing techniques for a given dataset: a. Attribute Selection b. Handling Missing Values c. Discretization d. Elimination of Outliers.",
            expected: "Dataset successfully cleaned, missing values handled, continuous variables discretized, and outliers eliminated.",
            content: {
              aim: {
                text: "To apply various data preprocessing techniques on a given raw dataset, including Attribute Selection, Handling Missing Values, Discretization, and Elimination of Outliers, using Python / R / Weka, and to understand the importance of clean and well-prepared data in building effective machine learning models."
              },
              theory: [
                {
                  title: "1. Introduction to Data Preprocessing",
                  body: [
                    "Real-world data is often incomplete, inconsistent, noisy, and unstructured. Feeding such raw data directly into a machine learning model leads to poor performance, inaccurate predictions, and unreliable results. Data preprocessing is the step that transforms raw data into a format that is suitable for machine learning.",
                    "The key goals of data preprocessing are:",
                    "• To improve the quality of data",
                    "• To reduce redundancy and irrelevant information",
                    "• To make the data consistent and complete",
                    "• To improve the accuracy and efficiency of the machine learning model"
                  ]
                },
                {
                  title: "2. Attribute Selection (Feature Selection)",
                  body: [
                    "Attribute selection, also known as Feature Selection, is the process of identifying and selecting the most relevant attributes (features) from the dataset and removing irrelevant or redundant ones.",
                    "Why Attribute Selection is Important:",
                    "• Reduces the dimensionality of the dataset",
                    "• Decreases model training time",
                    "• Reduces the risk of overfitting",
                    "• Improves model accuracy and interpretability",
                    "Common Methods of Attribute Selection:",
                    "• Filter Method: Selects features based on statistical scores independent of any machine learning algorithm (e.g., Correlation, Chi-Square test).",
                    "• Wrapper Method: Uses a machine learning algorithm to evaluate feature subsets and selects the best performing combination (e.g., Recursive Feature Elimination).",
                    "• Embedded Method: Feature selection is performed as part of the model training process (e.g., LASSO Regression, Decision Trees).",
                    "Correlation-Based Selection:",
                    "• If two features have high correlation with each other but low correlation with the target variable, one can be removed.",
                    "• Features with near-zero variance carry little information and can be dropped."
                  ]
                },
                {
                  title: "3. Handling Missing Values",
                  body: [
                    "Missing values occur when no data value is stored for a variable in an observation. This can happen due to data entry errors, equipment malfunctions, or survey non-responses.",
                    "Types of Missing Data:",
                    "• Missing Completely at Random (MCAR): Missingness has no relationship with any variable.",
                    "• Missing at Random (MAR): Missingness is related to observed data but not to the missing value itself.",
                    "• Missing Not at Random (MNAR): Missingness is related to the unobserved (missing) value itself.",
                    "Techniques to Handle Missing Values:",
                    "• Deletion (Listwise): Remove rows with missing values. Best Used When: Very few rows have missing values.",
                    "• Mean Imputation: Replace missing value with column mean. Best Used When: Data is numerical and normally distributed.",
                    "• Median Imputation: Replace missing value with column median. Best Used When: Data is numerical and skewed.",
                    "• Mode Imputation: Replace missing value with column mode. Best Used When: Data is categorical.",
                    "• Forward/Backward Fill: Fill with the previous or next observed value. Best Used When: Time-series data.",
                    "• Predictive Imputation: Use a regression or KNN model to predict the missing value. Best Used When: Complex datasets with patterns."
                  ]
                },
                {
                  title: "4. Discretization",
                  body: [
                    "Discretization is the process of converting continuous numerical attributes into discrete categorical intervals or bins. This is also called binning.",
                    "Why Discretization is Used:",
                    "• Some machine learning algorithms work better with categorical data.",
                    "• Reduces the effect of minor observation errors.",
                    "• Simplifies the model and makes it more interpretable.",
                    "• Helps in handling outliers indirectly.",
                    "Types of Discretization:",
                    "• Equal Width Binning: Divides the range of data into equal-sized intervals (e.g., Age: 0–20, 21–40).",
                    "• Equal Frequency Binning: Each bin contains approximately the same number of data points (e.g., Quartile-based binning).",
                    "• Custom / Domain-Based Binning: Intervals defined based on domain knowledge (e.g., Income: Low, Medium, High)."
                  ]
                },
                {
                  title: "5. Elimination of Outliers",
                  body: [
                    "An outlier is a data point that differs significantly from other observations in the dataset. Outliers can distort statistical measures and negatively impact model performance.",
                    "Sources of Outliers: Data entry errors, Measurement errors, Natural variability in the data, Experimental errors.",
                    "Methods to Detect Outliers:",
                    "• Z-Score Method: A data point is an outlier if its Z-Score is beyond ±3 standard deviations from the mean.",
                    "• IQR Method: Values below Q1 − 1.5×IQR or above Q3 + 1.5×IQR are considered outliers.",
                    "• Box Plot: Visual method; data points plotted beyond the whiskers are outliers.",
                    "• Scatter Plot: Visual inspection of data distribution to identify extreme values.",
                    "IQR Method Formula:",
                    "• Q1 = 25th Percentile, Q3 = 75th Percentile, IQR = Q3 − Q1",
                    "• Lower Bound = Q1 − 1.5 × IQR, Upper Bound = Q3 + 1.5 × IQR",
                    "Handling Outliers:",
                    "• Remove the outlier record entirely.",
                    "• Cap the value at the lower or upper bound (Winsorization).",
                    "• Replace with mean or median.",
                    "• Keep the outlier if it represents genuine data."
                  ]
                },
                {
                  title: "6. Summary of Data Preprocessing Pipeline",
                  body: [
                    "Raw Data → Attribute Selection → Handle Missing Values → Discretization → Outlier Elimination → Preprocessed Clean Data → Machine Learning Model"
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment from the available options (Python, R, Weka).",
                "Step 2: Load the Dataset. Select a sample dataset from the dropdown list provided in the simulation panel. View the raw dataset in the data preview table.",
                "Step 3: Attribute Selection. View all available attributes (columns). Select the attributes to KEEP. Deselect irrelevant attributes.",
                "Step 4: Handle Missing Values. The simulation highlights cells with missing values in red. Choose a strategy (Remove rows, Replace with Mean/Median/Mode).",
                "Step 5: Discretization. Select a continuous numerical attribute. Choose the type of binning and number of bins.",
                "Step 6: Eliminate Outliers. Select a numerical attribute. Choose detection method (Z-Score or IQR). Choose handling strategy (Remove, Cap, Replace).",
                "Step 7: View Preprocessed Dataset. View the final cleaned dataset in the output table. Compare Before and After statistics.",
                "Step 8: Download / Export Results. Save the cleaned data as a CSV file.",
                "Step 9: Record Observations and Attempt Post-Test."
              ],
              simulation: {
                code: "import pandas as pd\nimport numpy as np\n\n# Load Data\ndata = pd.DataFrame({'Age': [25, np.nan, 22, 120, 28], 'Salary': [50000, 60000, 55000, 200000, np.nan]})\n\n# Handle Missing Values\nmean_age = data['Age'].mean()\ndata['Age'].fillna(mean_age, inplace=True)\n\nmedian_salary = data['Salary'].median()\ndata['Salary'].fillna(median_salary, inplace=True)\n\n# Outlier Elimination (Age < 100)\ndata = data[data['Age'] < 100]\n\nprint(\"Preprocessing Complete\")\nprint(data)",
                steps: [
                  { line: 1, annotation: "Import pandas and numpy", memory: [], output: "" },
                  { line: 5, annotation: "Load the raw dataset with missing values and outliers", memory: [{variable: "data", type: "DataFrame", value: "5 rows, 2 cols"}], output: "" },
                  { line: 8, annotation: "Calculate Mean Age", memory: [{variable: "mean_age", type: "float", value: "48.75"}], output: "" },
                  { line: 9, annotation: "Fill missing Age with Mean", memory: [{variable: "data['Age']", type: "Series", value: "Updated"}], output: "" },
                  { line: 11, annotation: "Calculate Median Salary", memory: [{variable: "median_salary", type: "float", value: "57500.0"}], output: "" },
                  { line: 12, annotation: "Fill missing Salary with Median", memory: [{variable: "data['Salary']", type: "Series", value: "Updated"}], output: "" },
                  { line: 15, annotation: "Filter out Age outliers (>100)", memory: [{variable: "data", type: "DataFrame", value: "4 rows, 2 cols"}], output: "" },
                  { line: 18, annotation: "Print final preprocessed dataset", memory: [], output: "Preprocessing Complete\n    Age   Salary\n0  25.0  50000.0\n1  48.7  60000.0\n2  22.0  55000.0\n4  28.0  57500.0" }
                ]
              },
              pretest: [
                {
                  question: "Which of the following is the correct definition of Data Preprocessing?",
                  options: [
                    "The process of training a machine learning model on raw data",
                    "The process of transforming raw data into a clean and usable format for machine learning",
                    "The process of visualizing data using charts and graphs",
                    "The process of storing data in a database"
                  ],
                  answerIndex: 1
                },
                {
                  question: "Which of the following is a technique used to handle missing values in a dataset?",
                  options: [
                    "Normalization",
                    "Imputation with Mean or Median",
                    "Feature Extraction",
                    "Cross Validation"
                  ],
                  answerIndex: 1
                },
                {
                  question: "Discretization in data preprocessing refers to:",
                  options: [
                    "Removing duplicate records from the dataset",
                    "Converting continuous numerical values into discrete categorical intervals",
                    "Selecting the most relevant features from the dataset",
                    "Splitting the dataset into training and testing sets"
                  ],
                  answerIndex: 1
                },
                {
                  question: "An outlier in a dataset is best described as:",
                  options: [
                    "A value that appears most frequently",
                    "A value that lies far outside the overall pattern of the data",
                    "A value that is equal to the mean",
                    "A missing value in the dataset"
                  ],
                  answerIndex: 1
                },
                {
                  question: "Which of the following methods is commonly used to detect outliers in a dataset?",
                  options: [
                    "K-Means Clustering",
                    "Decision Tree",
                    "Interquartile Range (IQR) Method",
                    "Logistic Regression"
                  ],
                  answerIndex: 2
                }
              ],
              posttest: [
                {
                  question: "In the IQR method, a value is considered an outlier if it falls:",
                  options: [
                    "Below Q1 − 2 × IQR or above Q3 + 2 × IQR",
                    "Below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR",
                    "Below the mean − standard deviation",
                    "Below Q1 or above Q3"
                  ],
                  answerIndex: 1
                },
                {
                  question: "Which attribute selection method uses the machine learning algorithm itself to evaluate feature subsets?",
                  options: [
                    "Filter Method",
                    "Embedded Method",
                    "Wrapper Method",
                    "Statistical Method"
                  ],
                  answerIndex: 2
                },
                {
                  question: "Equal Frequency Binning ensures that:",
                  options: [
                    "Each bin has the same width or range",
                    "Each bin contains the same number of data points",
                    "Each bin is defined based on domain knowledge",
                    "All values in the dataset are normalized"
                  ],
                  answerIndex: 1
                },
                {
                  question: "Which type of missing data is the most difficult to handle because the missingness is related to the unobserved value itself?",
                  options: [
                    "Missing Completely at Random (MCAR)",
                    "Missing at Random (MAR)",
                    "Missing Not at Random (MNAR)",
                    "Structurally Missing Data"
                  ],
                  answerIndex: 2
                },
                {
                  question: "After applying all preprocessing steps on a dataset with 500 records and 12 attributes, 25 records were removed due to outliers and 2 attributes were dropped during feature selection. What are the dimensions of the final preprocessed dataset?",
                  options: [
                    "500 rows × 12 columns",
                    "475 rows × 10 columns",
                    "475 rows × 12 columns",
                    "500 rows × 10 columns"
                  ],
                  answerIndex: 1
                }
              ]
            }
          }
        ]
      },
      {
        title: "WEEK 3",
        objective: "Understand and implement Instance-Based Learning techniques.",
        tutorial: "Tutorial 3: Instance-Based Learning",
        labTitle: "Lab 3: K-Nearest Neighbors",
        experiments: [
          {
            id: "ml-w3-1",
            title: "KNN for Classification and Regression",
            desc: "Apply KNN algorithm for classification and regression on a standard dataset.",
            expected: "Successfully trained and evaluated KNN models for both classification and regression tasks.",
            content: {
              aim: {
                text: "To apply the K-Nearest Neighbors (KNN) algorithm for both Classification and Regression tasks on a given dataset using Python / R / Weka, to evaluate the model performance using appropriate metrics, and to understand the effect of varying the value of K on the model's accuracy and prediction quality."
              },
              theory: [
                {
                  title: "1. Introduction to Instance-Based Learning",
                  body: [
                    "Instance-Based Learning (IBL) is a family of machine learning algorithms that do not build an explicit model during the training phase. Instead, they store all training instances and make predictions by comparing new instances to the stored ones at the time of prediction.",
                    "Key Characteristics of Instance-Based Learning:",
                    "• No training phase — the algorithm is called a Lazy Learner",
                    "• Predictions are made at query time by comparing to stored examples",
                    "• Very sensitive to the local structure of the data",
                    "• Computationally expensive at prediction time",
                    "The most widely used Instance-Based Learning algorithm is K-Nearest Neighbors (KNN)."
                  ]
                },
                {
                  title: "2. K-Nearest Neighbors (KNN) Algorithm",
                  body: [
                    "KNN is a simple, non-parametric, supervised machine learning algorithm that can be used for both classification and regression tasks. The core idea is that similar data points exist close to each other in the feature space.",
                    "Core Assumption: Data points that are close to each other in the feature space are likely to belong to the same class or have similar output values."
                  ]
                },
                {
                  title: "3. Distance Metrics",
                  body: [
                    "The concept of 'nearness' in KNN is measured using distance metrics. The most commonly used are:",
                    "• Euclidean Distance: The straight-line distance between two points in n-dimensional space.",
                    "• Manhattan Distance: The sum of the absolute differences between coordinates of two points.",
                    "• Minkowski Distance: A generalized distance metric that unifies Euclidean and Manhattan distances."
                  ]
                },
                {
                  title: "4. KNN for Classification",
                  body: [
                    "In classification, KNN predicts the class label of a new data point based on the majority class among its K nearest neighbors.",
                    "Steps:",
                    "1. Choose the value of K",
                    "2. Calculate the distance between the new data point and all training data points",
                    "3. Sort the distances in ascending order",
                    "4. Select the top K nearest neighbors",
                    "5. Perform majority voting among the K neighbors",
                    "6. Assign the most frequent class label as the predicted class",
                    "Evaluation Metrics for Classification:",
                    "• Accuracy, Precision, Recall, F1-Score, Confusion Matrix."
                  ]
                },
                {
                  title: "5. KNN for Regression",
                  body: [
                    "In regression, KNN predicts a continuous numerical output for a new data point based on the average (or weighted average) of the output values of its K nearest neighbors.",
                    "Steps:",
                    "1. Choose the value of K",
                    "2. Calculate the distance between the new data point and all training data points",
                    "3. Sort the distances in ascending order",
                    "4. Select the top K nearest neighbors",
                    "5. Compute the average of the output values of the K neighbors",
                    "6. Assign the computed average as the predicted output value",
                    "Evaluation Metrics for Regression:",
                    "• Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), R² Score."
                  ]
                },
                {
                  title: "6. Choosing the Right Value of K",
                  body: [
                    "The value of K is the most critical hyperparameter in KNN. It controls the bias-variance tradeoff:",
                    "• Very Small (K = 1): Low bias, high variance — model overfits, sensitive to noise",
                    "• Very Large (K = n): High bias, low variance — model underfits, ignores local patterns",
                    "• Optimal K: Balanced bias and variance — determined by cross-validation",
                    "General Guidelines:",
                    "• Use odd values of K for binary classification to avoid ties.",
                    "• Use cross-validation or elbow method to find the optimal K."
                  ]
                },
                {
                  title: "7. Feature Scaling in KNN",
                  body: [
                    "Since KNN relies on distance calculations, features with larger scales dominate the distance computation. Therefore, feature scaling is mandatory before applying KNN.",
                    "Common Scaling Techniques:",
                    "• Min-Max Normalization: Scales values to range [0, 1]",
                    "• Z-Score Standardization: Scales to mean 0 and standard deviation 1"
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment.",
                "Step 2: Select Task Type. Choose Classification or Regression.",
                "Step 3: Load the Dataset. Select a dataset from the dropdown list.",
                "Step 4: Explore the Dataset. Review the dataset summary and identify required preprocessing.",
                "Step 5: Preprocess the Data. Apply Min-Max Normalization or Z-Score Standardization. Split the dataset.",
                "Step 6: Set the Value of K. Use the K-value slider (1 to 20). Select the distance metric.",
                "Step 7: Train and Predict. Click the Run KNN button to train the model.",
                "Step 8: Evaluate Performance. View the relevant metrics (Accuracy/F1 for Classification, RMSE/MAE for Regression).",
                "Step 9: Tune the Value of K. Use the K vs Accuracy / K vs RMSE plot to find the optimal K.",
                "Step 10: Visualize Decision Boundary (Classification Only). View the 2D decision boundary plot.",
                "Step 11: Record Observations and Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\nimport numpy as np\n\n# Load Dataset\nX = np.array([[1, 2], [1, 4], [1, 0], [10, 2], [10, 4], [10, 0]])\ny = np.array([0, 0, 0, 1, 1, 1])\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)\n\n# KNN Initialization\nknn = KNeighborsClassifier(n_neighbors=3)\n\n# Train Model\nknn.fit(X_train, y_train)\n\n# Predict\ny_pred = knn.predict(X_test)\n\n# Evaluate\naccuracy = accuracy_score(y_test, y_pred)\nprint(f\"Accuracy: {accuracy * 100}%\")",
                steps: [
                  { line: 1, annotation: "Import sklearn libraries", memory: [], output: "" },
                  { line: 7, annotation: "Load Features (X)", memory: [{variable: "X", type: "ndarray", value: "shape (6, 2)"}], output: "" },
                  { line: 8, annotation: "Load Labels (y)", memory: [{variable: "y", type: "ndarray", value: "shape (6,)"}], output: "" },
                  { line: 11, annotation: "Split data into training and test sets", memory: [{variable: "X_train", type: "ndarray", value: "shape (4, 2)"}, {variable: "X_test", type: "ndarray", value: "shape (2, 2)"}], output: "" },
                  { line: 14, annotation: "Initialize KNN Classifier with K=3", memory: [{variable: "knn", type: "KNeighborsClassifier", value: "n_neighbors=3"}], output: "" },
                  { line: 17, annotation: "Train the model", memory: [{variable: "knn", type: "KNeighborsClassifier", value: "Fitted"}], output: "" },
                  { line: 20, annotation: "Make predictions on test set", memory: [{variable: "y_pred", type: "ndarray", value: "[0, 1]"}], output: "" },
                  { line: 23, annotation: "Calculate accuracy", memory: [{variable: "accuracy", type: "float", value: "1.0"}], output: "" },
                  { line: 24, annotation: "Print final evaluation", memory: [], output: "Accuracy: 100.0%" }
                ]
              },
              pretest: [
                {
                  question: "KNN stands for:",
                  options: ["K-Node Nearest Network", "K-Nearest Neighbors", "K-Node Neural Network", "K-Nearest Node"],
                  answerIndex: 1
                },
                {
                  question: "KNN is categorized as which type of learning algorithm?",
                  options: ["Supervised Learning — Generative Model", "Unsupervised Learning — Clustering", "Supervised Learning — Lazy Learner", "Reinforcement Learning"],
                  answerIndex: 2
                },
                {
                  question: "Which of the following distance metrics is most commonly used in KNN?",
                  options: ["Hamming Distance", "Manhattan Distance", "Euclidean Distance", "Cosine Similarity"],
                  answerIndex: 2
                },
                {
                  question: "In KNN for Classification, the predicted class of a new data point is determined by:",
                  options: ["The average of K nearest neighbors' output values", "The majority vote among the K nearest neighbors", "The distance to the farthest neighbor", "The class of the single nearest neighbor always"],
                  answerIndex: 1
                },
                {
                  question: "What happens when the value of K is set too low (e.g., K=1) in KNN?",
                  options: ["The model underfits the data", "The model becomes computationally faster", "The model overfits the data and becomes sensitive to noise", "The model ignores all training data"],
                  answerIndex: 2
                }
              ],
              posttest: [
                {
                  question: "In KNN Regression with K = 3, if the three nearest neighbors have output values of 120, 150, and 90, what is the predicted value for the new data point?",
                  options: ["150", "90", "120", "110"],
                  answerIndex: 2
                },
                {
                  question: "Which of the following statements about the Curse of Dimensionality in KNN is correct?",
                  options: ["KNN performs better as the number of features increases", "As dimensionality increases, distances between points become increasingly similar, making KNN less effective", "Adding more features always improves KNN accuracy", "The Curse of Dimensionality only affects regression tasks in KNN"],
                  answerIndex: 1
                },
                {
                  question: "Why is feature scaling essential before applying the KNN algorithm?",
                  options: ["To reduce the number of features in the dataset", "To ensure features with larger scales do not dominate the distance calculation", "To convert categorical features into numerical ones", "To increase the training speed of the algorithm"],
                  answerIndex: 1
                },
                {
                  question: "In the K vs Accuracy plot, if the accuracy is highest at K = 5 and then gradually decreases, which of the following best explains this behavior?",
                  options: ["At K = 5 the model underfits the data; higher K values improve it", "At K = 5 the model achieves the best bias-variance balance; beyond this the model begins to underfit", "The training data is too small to support higher values of K", "Distance metric selection causes accuracy to drop after K = 5"],
                  answerIndex: 1
                },
                {
                  question: "For a binary classification problem with the following confusion matrix: TP = 40, TN = 35, FP = 5, FN = 10 — what is the Recall of the model?",
                  options: ["88.9%", "80.0%", "87.5%", "75.0%"],
                  answerIndex: 1
                }
              ]
            }
          }
        ]
      },
      {
        title: "WEEK 4",
        objective: "Construct and tune Decision Trees for classification tasks.",
        tutorial: "Tutorial 4: Tree-Based Classification",
        labTitle: "Lab 4: Decision Tree Classifier",
        experiments: [
          {
            id: "ml-w4-1",
            title: "Decision Tree Classification and Tuning",
            desc: "Demonstrate Decision Tree algorithm for a classification problem and perform parameter tuning for better results.",
            expected: "Decision Tree classifier trained, visualized, and optimized using hyperparameter tuning (e.g., max_depth, min_samples_split).",
            content: {
              aim: {
                text: "To implement the Decision Tree algorithm for a classification problem using Python / R / Weka, to visualize the constructed tree, to evaluate the model performance using standard classification metrics, and to perform parameter tuning techniques such as controlling tree depth, minimum samples per split, and pruning to achieve better generalization results."
              },
              theory: [
                {
                  title: "1. Introduction to Decision Trees",
                  body: [
                    "A Decision Tree is a supervised machine learning algorithm that uses a tree-like model of decisions and their possible consequences to perform classification and regression tasks. It mimics human decision-making by splitting data into subsets based on the most significant features at each step.",
                    "Decision Trees are one of the most interpretable and widely used machine learning models. They form the foundation for more powerful ensemble methods such as Random Forest, Gradient Boosting, and XGBoost.",
                    "Key Terminology:",
                    "• Root Node: The topmost node representing the entire dataset and the first split",
                    "• Internal Node: A node that represents a feature test and splits into child nodes",
                    "• Branch: A connection between nodes representing the outcome of a test",
                    "• Leaf Node: A terminal node that holds the final predicted class label",
                    "• Depth: The length of the longest path from the root node to a leaf node",
                    "• Splitting: The process of dividing a node into two or more sub-nodes",
                    "• Pruning: The process of removing branches that provide little predictive power"
                  ]
                },
                {
                  title: "2. How a Decision Tree Works",
                  body: [
                    "The algorithm recursively splits the dataset into subsets based on feature values. At each node, it selects the feature and threshold that best separates the data according to a chosen splitting criterion.",
                    "General Steps:",
                    "1. Start with the entire dataset at the Root Node",
                    "2. Select the best feature to split the data using a splitting criterion",
                    "3. Split the dataset into subsets based on the selected feature and threshold",
                    "4. Repeat the process recursively for each subset",
                    "5. Stop splitting when one of the stopping conditions is met: All instances in a node belong to the same class, Maximum tree depth is reached, Minimum number of samples per node is reached, or No further information gain is possible",
                    "6. Assign the majority class of each leaf node as the prediction"
                  ]
                },
                {
                  title: "3. Splitting Criteria",
                  body: [
                    "The splitting criterion determines which feature and threshold to use at each node to divide the data most effectively.",
                    "3.1 Entropy and Information Gain (ID3 Algorithm)",
                    "Entropy measures the impurity or disorder in a dataset. A pure node (all instances of one class) has entropy = 0.",
                    "Entropy Formula: H(S) = − Σ pᵢ × log₂(pᵢ)",
                    "Information Gain Formula: IG(S, A) = H(S) − Σ (|Sᵥ| / |S|) × H(Sᵥ)",
                    "3.2 Gini Impurity (CART Algorithm)",
                    "Gini Impurity measures the probability of incorrectly classifying a randomly chosen instance if it were randomly labelled according to the class distribution in the node.",
                    "Gini Impurity Formula: Gini(S) = 1 − Σ pᵢ²",
                    "Gini Gain Formula: Gini Gain(S, A) = Gini(S) − Σ (|Sᵥ| / |S|) × Gini(Sᵥ)",
                    "The feature with the lowest Gini Impurity (highest Gini Gain) is selected for splitting."
                  ]
                },
                {
                  title: "4. Popular Decision Tree Algorithms",
                  body: [
                    "• ID3: Information Gain (Entropy), Multi-way split, no handling of missing values",
                    "• C4.5: Gain Ratio, Multi-way split, handles missing values",
                    "• CART: Gini Impurity, Binary split, handles missing values",
                    "• CHAID: Chi-Square Test, Multi-way split, handles missing values"
                  ]
                },
                {
                  title: "5. Overfitting in Decision Trees",
                  body: [
                    "A fully grown Decision Tree tends to overfit the training data by creating very specific rules that do not generalize to unseen data. This happens when the tree is too deep, leaf nodes contain very few samples, or the tree memorizes noise in the training data.",
                    "Signs of Overfitting: Very high training accuracy but low testing accuracy, a very deep and complex tree structure, leaf nodes with only one or two training instances."
                  ]
                },
                {
                  title: "6. Parameter Tuning Techniques",
                  body: [
                    "Parameter tuning (also called Hyperparameter Tuning) is the process of adjusting the model's parameters to reduce overfitting and improve generalization.",
                    "6.1 Pre-Pruning (Early Stopping)",
                    "Pre-Pruning stops the tree from growing by imposing constraints during tree construction.",
                    "• max_depth: Maximum depth of the tree (reduces overfitting)",
                    "• min_samples_split: Minimum samples required to split a node (reduces overfitting)",
                    "• min_samples_leaf: Minimum samples required at a leaf node (reduces overfitting)",
                    "• max_features: Number of features to consider for each split (controls randomness)",
                    "• max_leaf_nodes: Maximum number of leaf nodes allowed (limits tree complexity)",
                    "6.2 Post-Pruning (Cost Complexity Pruning)",
                    "Post-Pruning first grows the full tree and then removes branches that do not improve generalization on the validation set.",
                    "Cost Complexity Pruning (CCP) uses a parameter alpha (α). Higher alpha → more aggressive pruning → simpler tree.",
                    "Pruning Formula: Cost Complexity = Error Rate + α × Number of Leaf Nodes"
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment.",
                "Step 2: Load the Dataset. Select a dataset from the dropdown list.",
                "Step 3: Explore and Preprocess the Dataset. Review the class distribution bar chart and handle any missing values.",
                "Step 4: Set the Train-Test Split. Adjust the slider (default: 80% train, 20% test).",
                "Step 5: Select the Splitting Criterion. Choose Gini Impurity or Entropy.",
                "Step 6: Set Initial Parameters. Leave max_depth: None, min_samples_split: 2, min_samples_leaf: 1.",
                "Step 7: Train the Decision Tree. Click the Train Decision Tree button and observe the fully grown tree visualization.",
                "Step 8: Evaluate the Initial Model. View the Confusion Matrix, Accuracy, Precision, Recall, and F1-Score.",
                "Step 9: Perform Parameter Tuning. Adjust max_depth, min_samples_split, min_samples_leaf, and ccp_alpha.",
                "Step 10: View the Parameter Tuning Plots. Observe the Depth vs Accuracy plot and Alpha vs Accuracy plot.",
                "Step 11: Compare Before and After Tuning. View the side-by-side comparison of tree structure and metrics.",
                "Step 12: Visualize Feature Importance. View the Feature Importance bar chart.",
                "Step 13: Record Observations.",
                "Step 14: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\nimport pandas as pd\n\n# Load Dataset\ndf = pd.DataFrame({'Feature1': [1,2,3,4,5], 'Target': [0,0,1,1,1]})\nX = df[['Feature1']]\ny = df['Target']\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Decision Tree Initialization\ndt = DecisionTreeClassifier(criterion='gini', max_depth=2)\n\n# Train Model\ndt.fit(X_train, y_train)\n\n# Predict\ny_pred = dt.predict(X_test)\n\n# Evaluate\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred) * 100}%\")",
                steps: [
                  { line: 1, annotation: "Import sklearn libraries", memory: [], output: "" },
                  { line: 8, annotation: "Load Features (X)", memory: [{variable: "X", type: "DataFrame", value: "shape (5, 1)"}], output: "" },
                  { line: 9, annotation: "Load Labels (y)", memory: [{variable: "y", type: "Series", value: "shape (5,)"}], output: "" },
                  { line: 12, annotation: "Split data into training and test sets", memory: [{variable: "X_train", type: "DataFrame", value: "shape (4, 1)"}], output: "" },
                  { line: 15, annotation: "Initialize Decision Tree Classifier", memory: [{variable: "dt", type: "DecisionTreeClassifier", value: "max_depth=2"}], output: "" },
                  { line: 18, annotation: "Train the model", memory: [{variable: "dt", type: "DecisionTreeClassifier", value: "Fitted"}], output: "" },
                  { line: 21, annotation: "Make predictions on test set", memory: [{variable: "y_pred", type: "ndarray", value: "[0]"}], output: "" },
                  { line: 24, annotation: "Calculate and print accuracy", memory: [], output: "Accuracy: 100.0%" }
                ]
              },
              pretest: [
                {
                  question: "A Decision Tree is which type of machine learning model?",
                  options: ["Unsupervised — Clustering Model", "Supervised — Lazy Learner", "Supervised — Eager Learner", "Reinforcement Learning Model"],
                  answerIndex: 2
                },
                {
                  question: "Which of the following is used as a splitting criterion in Decision Trees?",
                  options: ["Euclidean Distance", "Gini Impurity", "Pearson Correlation", "Z-Score"],
                  answerIndex: 1
                },
                {
                  question: "In a Decision Tree, a node that does not split further and holds the final predicted class is called:",
                  options: ["Root Node", "Decision Node", "Internal Node", "Leaf Node"],
                  answerIndex: 3
                },
                {
                  question: "What does Information Gain measure in a Decision Tree?",
                  options: ["The number of nodes in the tree", "The reduction in impurity achieved by splitting on a particular feature", "The depth of the tree after splitting", "The distance between data points"],
                  answerIndex: 1
                },
                {
                  question: "Which of the following problems is associated with a Decision Tree that is too deep and complex?",
                  options: ["Underfitting", "High Bias", "Overfitting", "High Variance only in Regression"],
                  answerIndex: 2
                }
              ],
              posttest: [
                {
                  question: "For a node with 40 instances of Class A and 60 instances of Class B, what is the Gini Impurity?",
                  options: ["0.50", "0.48", "0.24", "0.36"],
                  answerIndex: 1
                },
                {
                  question: "In the Depth vs Accuracy plot, if training accuracy keeps increasing with depth but testing accuracy peaks at depth 4 and then decreases, what is the best action?",
                  options: ["Set max_depth to the maximum available value", "Set max_depth to 4 as it gives the best generalization", "Remove all depth constraints and grow the full tree", "Switch to a different algorithm entirely"],
                  answerIndex: 1
                },
                {
                  question: "Which of the following correctly describes Post-Pruning in a Decision Tree?",
                  options: ["The tree is stopped from growing beyond a set depth during training", "The full tree is grown first and then branches are removed based on a complexity parameter", "Features are removed before training the Decision Tree", "The training data is reduced to simplify the tree structure"],
                  answerIndex: 1
                },
                {
                  question: "A Decision Tree model shows 99% training accuracy and 72% testing accuracy. Which of the following is the most appropriate solution?",
                  options: ["Increase the max_depth parameter", "Decrease the min_samples_leaf parameter", "Apply pruning and reduce max_depth to control overfitting", "Use Entropy instead of Gini as the splitting criterion"],
                  answerIndex: 2
                },
                {
                  question: "In Feature Importance from a Decision Tree, a feature with a high importance score means:",
                  options: ["The feature has the highest number of unique values", "The feature appears only at the leaf nodes of the tree", "The feature contributes the most to reducing impurity across all splits in the tree", "The feature has the highest correlation with all other features"],
                  answerIndex: 2
                }
              ]
            }
          }
        ]
      },
      {
        title: "WEEK 5",
        objective: "Apply Tree-Based Models to predict continuous numerical values.",
        tutorial: "Tutorial 5: Tree-Based Regression",
        labTitle: "Lab 5: Decision Tree Regressor",
        experiments: [
          {
            id: "ml-w5-1",
            title: "Decision Tree for Regression",
            desc: "Demonstrate Decision Tree algorithm for a regression problem.",
            expected: "Decision Tree regressor trained and evaluated using metrics such as Mean Squared Error (MSE).",
            content: {
              aim: {
                text: "To implement the Decision Tree Regressor algorithm for a regression problem using Python / R / Weka, to visualize the constructed regression tree, to evaluate model performance using standard regression metrics such as MAE, MSE, RMSE, and R² Score, and to understand how the tree structure captures non-linear relationships between input features and a continuous target variable."
              },
              theory: [
                {
                  title: "1. Introduction to Decision Tree Regression",
                  body: [
                    "A Decision Tree Regressor is a supervised machine learning model that predicts a continuous numerical output by recursively partitioning the input feature space into rectangular regions and assigning a constant predicted value (the mean of training instances) to each region.",
                    "Unlike linear regression which assumes a linear relationship between features and output, a Decision Tree Regressor can naturally capture non-linear and complex relationships without requiring any transformation of the data.",
                    "Decision Tree Regression forms the backbone of powerful ensemble regression methods such as Random Forest Regressor, Gradient Boosted Trees, and XGBoost."
                  ]
                },
                {
                  title: "2. How Decision Tree Regression Works",
                  body: [
                    "Core Idea: The algorithm divides the feature space into a set of non-overlapping rectangular regions. For a new input data point, the tree traverses from the root to a leaf node based on feature conditions, and the predicted output is the mean of all training instances that fall in that leaf node's region.",
                    "Step-by-Step Process:",
                    "1. Start with all training instances at the Root Node",
                    "2. Select the feature and threshold that minimizes the splitting criterion (MSE or MAE)",
                    "3. Split the dataset into two subsets",
                    "4. Repeat the splitting process recursively for each child node",
                    "5. Stop splitting when a stopping condition is met (maximum depth, minimum samples, etc.)",
                    "6. At each leaf node, assign the mean of the target values of all training instances in that node as the predicted output"
                  ]
                },
                {
                  title: "3. Splitting Criterion for Regression",
                  body: [
                    "Unlike classification trees that use Gini Impurity or Entropy, regression trees use variance-based metrics to select the best split.",
                    "3.1 Mean Squared Error (MSE) — Primary Criterion",
                    "The algorithm selects the split that minimizes the weighted sum of MSE across the two child nodes.",
                    "MSE at a Node Formula: MSE(node) = (1 / n) × Σ (yᵢ − ȳ)²",
                    "Best Split = argmin [ (nₗ / n) × MSE(left) + (nᵣ / n) × MSE(right) ]",
                    "3.2 Mean Absolute Error (MAE) — Alternative Criterion",
                    "MAE is more robust to outliers than MSE and uses the median instead of the mean as the predicted value at each leaf."
                  ]
                },
                {
                  title: "4. Evaluation Metrics for Regression",
                  body: [
                    "• Mean Absolute Error (MAE): Measures the average absolute difference between actual and predicted values. Less sensitive to outliers.",
                    "• Mean Squared Error (MSE): Measures the average squared difference between actual and predicted values. Penalizes large errors more heavily.",
                    "• Root Mean Squared Error (RMSE): The square root of MSE. Expressed in the same units as the target variable making it more interpretable than MSE.",
                    "• R² Score (Coefficient of Determination): Measures the proportion of variance in the target variable that is explained by the model."
                  ]
                },
                {
                  title: "5. Overfitting in Decision Tree Regression",
                  body: [
                    "A fully grown Decision Tree Regressor tends to memorize the training data by creating very specific leaf regions for individual instances, leading to poor generalization.",
                    "Signs of Overfitting in Regression: Very low training MSE / RMSE but high testing MSE / RMSE, Very high training R² but significantly lower testing R², A very deep tree with leaf nodes containing very few instances, Extremely jagged and irregular predicted output curve.",
                    "Controlling Overfitting involves parameters like max_depth, min_samples_split, min_samples_leaf, max_leaf_nodes, and ccp_alpha."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment.",
                "Step 2: Load the Dataset. Select a dataset from the dropdown list.",
                "Step 3: Explore the Dataset. Review the dataset summary and identify required preprocessing.",
                "Step 4: Preprocess the Dataset. Handle any missing values or categorical encodings.",
                "Step 5: Set the Train-Test Split. Adjust the Train-Test Split slider.",
                "Step 6: Select the Splitting Criterion. Choose MSE, MAE, or Friedman MSE.",
                "Step 7: Set Initial Parameters. Leave parameters at default values for the initial run.",
                "Step 8: Train the Decision Tree Regressor. Click the Train Decision Tree Regressor button.",
                "Step 9: Evaluate the Initial Model. View performance metrics (MAE, MSE, RMSE, R²).",
                "Step 10: Observe the Predicted Output Curve. View the Step Function plot.",
                "Step 11: Perform Parameter Tuning. Adjust max_depth, min_samples_split, min_samples_leaf, ccp_alpha.",
                "Step 12: View the Tuning Plots. Observe Depth vs RMSE and Alpha vs R².",
                "Step 13: Compare Before and After Tuning. View the side-by-side comparisons.",
                "Step 14: Visualize Feature Importance.",
                "Step 15: Record Observations.",
                "Step 16: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.tree import DecisionTreeRegressor\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import mean_squared_error\nimport pandas as pd\n\n# Load Dataset\ndf = pd.DataFrame({'Feature1': [1,2,3,4,5], 'Target': [10.5, 20.1, 30.5, 40.2, 50.8]})\nX = df[['Feature1']]\ny = df['Target']\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Decision Tree Initialization\ndt = DecisionTreeRegressor(criterion='squared_error', max_depth=3)\n\n# Train Model\ndt.fit(X_train, y_train)\n\n# Predict\ny_pred = dt.predict(X_test)\n\n# Evaluate\nmse = mean_squared_error(y_test, y_pred)\nprint(f\"MSE: {mse}\")",
                steps: [
                  { line: 1, annotation: "Import sklearn libraries", memory: [], output: "" },
                  { line: 8, annotation: "Load Features (X)", memory: [{variable: "X", type: "DataFrame", value: "shape (5, 1)"}], output: "" },
                  { line: 9, annotation: "Load Labels (y)", memory: [{variable: "y", type: "Series", value: "shape (5,)"}], output: "" },
                  { line: 12, annotation: "Split data into training and test sets", memory: [{variable: "X_train", type: "DataFrame", value: "shape (4, 1)"}], output: "" },
                  { line: 15, annotation: "Initialize Decision Tree Regressor", memory: [{variable: "dt", type: "DecisionTreeRegressor", value: "max_depth=3"}], output: "" },
                  { line: 18, annotation: "Train the model", memory: [{variable: "dt", type: "DecisionTreeRegressor", value: "Fitted"}], output: "" },
                  { line: 21, annotation: "Make predictions on test set", memory: [{variable: "y_pred", type: "ndarray", value: "[20.1]"}], output: "" },
                  { line: 24, annotation: "Calculate and print MSE", memory: [], output: "MSE: 0.0" }
                ]
              },
              pretest: [
                {
                  question: "Which of the following tasks is a Decision Tree Regressor designed to perform?",
                  options: ["Predict a discrete class label for a given input", "Cluster data points into groups based on similarity", "Predict a continuous numerical output value for a given input", "Reduce the dimensionality of a dataset"],
                  answerIndex: 2
                },
                {
                  question: "In a Decision Tree Regressor, the predicted output value at each leaf node is:",
                  options: ["The majority class of all training instances in that node", "The median of the target values of all training instances in that node", "The mean of the target values of all training instances in that node", "The maximum target value of all training instances in that node"],
                  answerIndex: 2
                },
                {
                  question: "Which of the following is the most commonly used splitting criterion for a Decision Tree Regressor?",
                  options: ["Gini Impurity", "Entropy", "Mean Squared Error (MSE)", "Euclidean Distance"],
                  answerIndex: 2
                },
                {
                  question: "Which metric measures the proportion of variance in the target variable explained by the regression model?",
                  options: ["Mean Absolute Error (MAE)", "Root Mean Squared Error (RMSE)", "R² Score (Coefficient of Determination)", "F1-Score"],
                  answerIndex: 2
                },
                {
                  question: "What is the primary difference between a Decision Tree Classifier and a Decision Tree Regressor?",
                  options: ["Classifiers use Euclidean distance for splitting while Regressors use Gini Impurity", "Classifiers predict continuous values while Regressors predict class labels", "Classifiers predict class labels using majority voting while Regressors predict continuous values using mean output", "There is no difference — both use the same splitting criterion and output method"],
                  answerIndex: 2
                }
              ],
              posttest: [
                {
                  question: "A Decision Tree Regressor with max_depth = 1 splits the data into exactly how many leaf regions?",
                  options: ["1", "3", "2", "4"],
                  answerIndex: 2
                },
                {
                  question: "For a leaf node containing training instances with target values: 120, 130, 110, 140, 150 — what will be the predicted output for any new instance that falls into this leaf?",
                  options: ["130", "120", "150", "110"],
                  answerIndex: 0
                },
                {
                  question: "In the Residual Plot of a Decision Tree Regressor, if residuals show a clear funnel-shaped pattern (increasing spread with increasing predicted values), this indicates:",
                  options: ["The model is perfectly fitted", "The model has heteroscedasticity — variance of errors is not constant", "The model is underfitting the data", "The splitting criterion should be changed to MAE"],
                  answerIndex: 1
                },
                {
                  question: "A Decision Tree Regressor is trained on house prices ranging from ₹20 Lakhs to ₹150 Lakhs. When asked to predict the price of a house valued at ₹200 Lakhs (beyond the training range), the model will:",
                  options: ["Extrapolate and predict a value near ₹200 Lakhs", "Return an error as the value is out of range", "Predict the mean of the entire training set", "Predict a constant value equal to the mean of the nearest leaf node — it cannot extrapolate beyond training range"],
                  answerIndex: 3
                },
                {
                  question: "A Decision Tree Regressor gives the following results: Training R² = 0.98, Testing R² = 0.65. Which combination of parameter changes is most appropriate to improve the model?",
                  options: ["Increase max_depth and decrease min_samples_leaf", "Decrease max_depth and increase min_samples_leaf", "Increase max_depth and increase min_samples_split", "Decrease min_samples_split and set ccp_alpha to 0"],
                  answerIndex: 1
                }
              ]
            }
          }
        ]
      },
      {
        title: "WEEK 6",
        objective: "Improve model accuracy and robustness using Ensemble Learning.",
        tutorial: "Tutorial 6: Ensemble Methods",
        labTitle: "Lab 6: Random Forests",
        experiments: [
          {
            id: "ml-w6-1",
            title: "Random Forest Algorithm",
            desc: "Apply Random Forest algorithm for classification and regression.",
            expected: "Random Forest models successfully applied to both classification and regression tasks, demonstrating improved performance over single trees."
          }
        ]
      },
      {
        title: "WEEK 7",
        objective: "Implement probabilistic classifiers based on Bayes' theorem.",
        tutorial: "Tutorial 7: Probabilistic Learning",
        labTitle: "Lab 7: Naïve Bayes",
        experiments: [
          {
            id: "ml-w7-1",
            title: "Naïve Bayes Classification",
            desc: "Demonstrate Naïve Bayes Classification algorithm.",
            expected: "Naïve Bayes classifier successfully trained and evaluated on a classification dataset."
          }
        ]
      },
      {
        title: "WEEK 8",
        objective: "Use maximum-margin classifiers and kernel tricks for complex decision boundaries.",
        tutorial: "Tutorial 8: Kernel Methods",
        labTitle: "Lab 8: Support Vector Machines",
        experiments: [
          {
            id: "ml-w8-1",
            title: "SVM Classification",
            desc: "Apply Support Vector Machine (SVM) algorithm for classification.",
            expected: "SVM classifier successfully trained with different kernels (linear, RBF) and evaluated."
          }
        ]
      },
      {
        title: "WEEK 9",
        objective: "Model the linear relationship between independent and dependent variables.",
        tutorial: "Tutorial 9: Linear Regression",
        labTitle: "Lab 9: Simple Linear Regression",
        experiments: [
          {
            id: "ml-w9-1",
            title: "Simple Linear Regression",
            desc: "Demonstrate Simple Linear Regression algorithm for a regression problem.",
            expected: "Linear Regression model trained, best-fit line plotted, and performance evaluated using R-squared."
          }
        ]
      },
      {
        title: "WEEK 10",
        objective: "Apply generalized linear models for binary classification tasks.",
        tutorial: "Tutorial 10: Linear Classification",
        labTitle: "Lab 10: Logistic Regression",
        experiments: [
          {
            id: "ml-w10-1",
            title: "Logistic Regression Classification",
            desc: "Apply Logistic Regression algorithm for a classification problem.",
            expected: "Logistic Regression model successfully trained, decision boundary evaluated, and accuracy reported."
          }
        ]
      },
      {
        title: "WEEK 11",
        objective: "Understand artificial neural networks and backpropagation.",
        tutorial: "Tutorial 11: Neural Networks",
        labTitle: "Lab 11: Multi-layer Perceptron",
        experiments: [
          {
            id: "ml-w11-1",
            title: "MLP Classifier",
            desc: "Demonstrate Multi-layer Perceptron (MLP) algorithm for a classification problem.",
            expected: "MLP neural network trained, loss curve plotted, and classification metrics evaluated."
          }
        ]
      },
      {
        title: "WEEK 12",
        objective: "Perform unsupervised learning by partitioning data into K distinct clusters.",
        tutorial: "Tutorial 12: Partition-Based Clustering",
        labTitle: "Lab 12: K-Means Clustering",
        experiments: [
          {
            id: "ml-w12-1",
            title: "K-Means and K-Parameter Tuning",
            desc: "Implement the K-Means algorithm and apply it to the selected dataset. Evaluate performance by measuring the sum of the Euclidean distance of each example from its class center. Test the performance of the algorithm as a function of the parameter K.",
            expected: "K-Means clustering applied, Elbow method used to determine optimal K, and clusters visualized."
          }
        ]
      },
      {
        title: "WEEK 13",
        objective: "Implement soft clustering where data points can belong to multiple clusters with varying degrees of membership.",
        tutorial: "Tutorial 13: Fuzzy Clustering",
        labTitle: "Lab 13: Fuzzy C-Means",
        experiments: [
          {
            id: "ml-w13-1",
            title: "Fuzzy C-Means Clustering",
            desc: "Demonstrate the use of Fuzzy C-Means Clustering.",
            expected: "Fuzzy C-Means applied, membership matrix analyzed, and soft clusters visualized."
          }
        ]
      },
      {
        title: "WEEK 14",
        objective: "Use probabilistic models for clustering based on Gaussian distributions.",
        tutorial: "Tutorial 14: Distribution-Based Clustering",
        labTitle: "Lab 14: Expectation Maximization",
        experiments: [
          {
            id: "ml-w14-1",
            title: "Expectation Maximization (EM) Clustering",
            desc: "Demonstrate the use of Expectation Maximization (EM) based clustering algorithm.",
            expected: "Gaussian Mixture Model (GMM) fit using EM algorithm, covariances analyzed, and probabilistic clusters visualized."
          }
        ]
      }
    ]
  }
};