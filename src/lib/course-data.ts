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
            expected: "2 + 3 * 4 = 14",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to evaluate a complex arithmetic expression involving multiple operators and demonstrate the effect of operator precedence and associativity on the result. The student will:",
                bullets: [
                  "Understand operator precedence levels in C (*, /, % before +, -)",
                  "Understand left-to-right associativity for arithmetic operators",
                  "Use parentheses to control evaluation order",
                  "Declare and use int and float variables to observe truncation vs precision",
                  "Print intermediate and final results using printf()"
                ]
              },
              theory: [
                {
                  title: "Operator Precedence",
                  body: ["When an expression contains multiple operators, C evaluates higher-precedence operators first. The standard precedence order for arithmetic:", "Level 1 (highest): *, /, %", "Level 2: +, -", "Level 3 (lowest): = (assignment)", "Example: 2 + 3 * 4 evaluates as 2 + (3 * 4) = 2 + 12 = 14, not 20."]
                },
                {
                  title: "Associativity",
                  body: ["When two operators have equal precedence, associativity determines evaluation order. All basic arithmetic operators are left-to-right associative:", "10 - 3 - 2 evaluates as (10 - 3) - 2 = 5, not 10 - (3 - 2) = 9."]
                },
                {
                  title: "Parentheses",
                  body: ["Parentheses override all precedence rules and force a sub-expression to be evaluated first:", "(2 + 3) * 4 = 20"]
                },
                {
                  title: "Modulus and Types",
                  body: ["Integer vs Float Division — 7 / 2 = 3 (integer truncation). 7.0 / 2 = 3.5 (float).", "Modulus Operator — % gives the remainder of integer division. 17 % 5 = 2 because 17 = 5*3 + 2. % is only valid for integer operands in C."]
                },
                {
                  title: "Increment and Decrement",
                  body: ["++ and -- modify a variable by 1.", "Pre-increment ++x : increments first, then uses value.", "Post-increment x++ : uses value first, then increments."]
                }
              ],
              pretest: [
                { question: "What is the result of 2 + 3 * 4 in C?", options: ["20", "14", "24", "9"], answerIndex: 1 },
                { question: "What is the result of 10 - 3 - 2 in C?", options: ["9", "5", "7", "3"], answerIndex: 1 },
                { question: "What is 17 % 5?", options: ["3", "2", "1", "0"], answerIndex: 1 },
                { question: "What is the value of x after: int x = 5; int y = x++;?", options: ["x = 6, y = 6", "x = 5, y = 5", "x = 6, y = 5", "x = 5, y = 6"], answerIndex: 2 },
                { question: "What is the result of (2 + 3) * (8 - 4) / 2?", options: ["14", "8", "10", "20"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the expression evaluation trace.",
                "Observe how each sub-expression is evaluated in order of precedence.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "The program evaluates a set of expressions and prints each result.",
                "Click Run Code. Verify each printed result matches the expected value.",
                "Modify the expressions using parentheses and observe how results change. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int res1 = 2 + 3 * 4;\n    int res2 = 10 - 3 - 2;\n    int res3 = 17 % 5;\n    printf(\"2 + 3 * 4 = %d\\n\", res1);\n    printf(\"10 - 3 - 2 = %d\\n\", res2);\n    printf(\"17 %% 5 = %d\\n\", res3);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Evaluate 3 * 4 first, then 2 + 12 = 14", memory: [{variable: "res1", type: "int", value: "14"}], output: "" },
                  { line: 5, annotation: "Left to right: 10 - 3 = 7, then 7 - 2 = 5", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}], output: "" },
                  { line: 6, annotation: "17 % 5 is remainder of 17 / 5, which is 2", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}, {variable: "res3", type: "int", value: "2"}], output: "" },
                  { line: 7, annotation: "Print first result", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}, {variable: "res3", type: "int", value: "2"}], output: "2 + 3 * 4 = 14\n" },
                  { line: 8, annotation: "Print second result", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}, {variable: "res3", type: "int", value: "2"}], output: "2 + 3 * 4 = 14\n10 - 3 - 2 = 5\n" },
                  { line: 9, annotation: "Print third result", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}, {variable: "res3", type: "int", value: "2"}], output: "2 + 3 * 4 = 14\n10 - 3 - 2 = 5\n17 % 5 = 2\n" },
                  { line: 10, annotation: "Program terminates", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}, {variable: "res3", type: "int", value: "2"}], output: "2 + 3 * 4 = 14\n10 - 3 - 2 = 5\n17 % 5 = 2\n" }
                ]
              },
              posttest: [
                { question: "What is the result of 100 / 4 * 5 in C?", options: ["5", "20", "125", "500"], answerIndex: 2 },
                { question: "What is the value of 5 + 3 * 2 - 8 / 4?", options: ["7", "9", "8", "4"], answerIndex: 1 },
                { question: "What does ++x do differently from x++?", options: ["No difference", "++x increments after use; x++ increments before use", "++x increments before use; x++ increments after use", "++x works only on float"], answerIndex: 2 },
                { question: "What is the result of 2 * 3 + 4 * 5 - 6 / 2?", options: ["20", "23", "18", "30"], answerIndex: 1 },
                { question: "Which expression evaluates to 1 in C?", options: ["5 / 2 * 2", "5 % 2", "5 - 2 * 2", "5 * 0 + 1 / 2"], answerIndex: 1 }
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
            id: "c-w4-2",
            title: "Max of Three",
            desc: "Find maximum among three numbers using conditional operator.",
            expected: "Maximum: 25",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept three integers from the user and determine the largest among them using the ternary operator and/or relational operators. The student will:",
                bullets: [
                  "Declare and use int variables",
                  "Apply relational operators (>, <, >=, <=, ==, !=)",
                  "Use the ternary (conditional) operator ?: to select the maximum value",
                  "Understand short-circuit evaluation in logical expressions",
                  "Use printf() to display the result"
                ]
              },
              theory: [
                {
                  title: "Relational Operators",
                  body: ["Used to compare two values and return 1 (true) or 0 (false):", "> greater than, < less than, >= greater than or equal to, <= less than or equal to", "== equal to (note: == not =, which is assignment)", "!= not equal to"]
                },
                {
                  title: "Ternary Operator",
                  body: ["The conditional (ternary) operator is the only C operator that takes three operands.", "Syntax: condition ? expression_if_true : expression_if_false", "Example: max = (a > b) ? a : b;", "If a > b is true, max gets a; otherwise max gets b."]
                },
                {
                  title: "Finding Max of Three",
                  body: ["Chain two ternary operations:", "max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);", "Alternatively, use two sequential comparisons with a temporary variable:", "max = a; if (b > max) max = b; if (c > max) max = c;"]
                },
                {
                  title: "Logical Operators and Precedence",
                  body: ["Logical Operators — && (AND), || (OR), ! (NOT) are used to combine conditions. (a > b && a > c) is true only when a is strictly greater than both b and c.", "Arithmetic operators have higher precedence than relational operators.", "Relational operators have higher precedence than logical operators.", "Ternary has lower precedence than arithmetic and relational but higher than assignment."]
                }
              ],
              pretest: [
                { question: "What does the relational operator > return when the condition is false?", options: ["-1", "0", "1", "NULL"], answerIndex: 1 },
                { question: "What is the result of (10 > 5) ? 10 : 5?", options: ["5", "0", "1", "10"], answerIndex: 3 },
                { question: "Which operator is the ternary operator in C?", options: ["::", "?:", "??", "->"], answerIndex: 1 },
                { question: "For a = 3, b = 7, c = 5, what does (a > b) ? a : b evaluate to?", options: ["3", "5", "7", "0"], answerIndex: 2 },
                { question: "What is the difference between = and == in C?", options: ["No difference", "= compares, == assigns", "= assigns a value; == tests equality", "== is only for floats"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the ternary evaluation trace.",
                "Observe how conditions are evaluated and how the ternary operator selects a value.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter three integers — e.g. 10 25 7",
                "Click Run Code. Verify output: Maximum: 25",
                "Try equal values like 5 5 5 and negative values like -3 -1 -7. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int a, b, c, max;\n    scanf(\"%d %d %d\", &a, &b, &c);\n    max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);\n    printf(\"Maximum: %d\\n\", max);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for integers", memory: [{variable: "a", type: "int", value: "?"}, {variable: "b", type: "int", value: "?"}, {variable: "c", type: "int", value: "?"}, {variable: "max", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '10 25 7'", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "25"}, {variable: "c", type: "int", value: "7"}, {variable: "max", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "Evaluate ternary: (10 > 25) is false, so evaluate ((25 > 7) ? 25 : 7) -> 25", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "25"}, {variable: "c", type: "int", value: "7"}, {variable: "max", type: "int", value: "25"}], output: "" },
                  { line: 7, annotation: "printf() displays max", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "25"}, {variable: "c", type: "int", value: "7"}, {variable: "max", type: "int", value: "25"}], output: "Maximum: 25\n" },
                  { line: 8, annotation: "Program terminates", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "25"}, {variable: "c", type: "int", value: "7"}, {variable: "max", type: "int", value: "25"}], output: "Maximum: 25\n" }
                ]
              },
              posttest: [
                { question: "For inputs 4, 4, 4, what is the output?", options: ["0", "Error", "4", "Undefined"], answerIndex: 2 },
                { question: "Which expression correctly finds the max of a and b?", options: ["max = a > b ? b : a", "max = (a > b) ? a : b", "max = a < b ? a : b", "max = a == b ? a : b"], answerIndex: 1 },
                { question: "For inputs -5, -1, -9, what is the maximum?", options: ["-9", "-5", "-1", "0"], answerIndex: 2 },
                { question: "What is the precedence order (highest to lowest) relevant here?", options: ["Ternary → Relational → Arithmetic", "Arithmetic → Ternary → Relational", "Arithmetic → Relational → Ternary", "Relational → Arithmetic → Ternary"], answerIndex: 2 },
                { question: "For a = 10, b = 20, c = 15, what does the following evaluate to? (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c)", options: ["10", "15", "20", "0"], answerIndex: 2 }
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
            id: "c-w4-3",
            title: "Marks Average",
            desc: "Calculate total and average of 5 subjects.",
            expected: "Total: 425 Average: 85.00 Grade: B",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept marks for multiple subjects from the user, compute the total and average marks, and display the results along with a grade determined using relational and logical operators. The student will:",
                bullets: [
                  "Declare and use int variables for marks and float for average",
                  "Apply compound assignment operators (+=) to accumulate a total",
                  "Use relational and logical operators to determine a grade band",
                  "Use the ternary operator or chained conditions for grade classification",
                  "Use printf() with %d and %.2f format specifiers"
                ]
              },
              theory: [
                {
                  title: "Compound Assignment Operators",
                  body: ["C provides shorthand operators that combine arithmetic with assignment:", "total += marks is equivalent to total = total + marks", "x *= 2 is equivalent to x = x * 2", "These make code concise and reduce repetition."]
                },
                {
                  title: "Average Calculation",
                  body: ["To compute an average:", "average = (float)total / n", "The cast to float ensures decimal precision. If total and n are both int, integer division truncates the result."]
                },
                {
                  title: "Relational and Logical Operators in Grading",
                  body: ["Grade bands are checked using >= and <= with && (AND):", "if (average >= 90 && average <= 100) → Grade A", "if (average >= 75 && average < 90) → Grade B", "if (average >= 60 && average < 75) → Grade C", "if (average >= 40 && average < 60) → Grade D", "if (average < 40) → Grade F"]
                },
                {
                  title: "Precedence and Associativity",
                  body: ["Arithmetic is evaluated first, then relational operators (>, >=, <, <=), then logical operators (&&, ||).", "Parentheses can be used to make complex conditions clearer.", "Both && and || are left-to-right associative. In (a && b && c), a is evaluated first; if a is false, the rest are short-circuited (not evaluated)."]
                }
              ],
              pretest: [
                { question: "What does the += operator do?", options: ["Compares two values", "Adds the right operand to the left and assigns the result", "Always increments by 1", "Performs modulus and assigns"], answerIndex: 1 },
                { question: "For 5 subject marks totalling 375, what is the average?", options: ["70.00", "75.00", "80.00", "65.00"], answerIndex: 1 },
                { question: "Which logical operator means AND in C?", options: ["&", "|", "&&", "||"], answerIndex: 2 },
                { question: "What is the correct way to check if average is between 60 and 75 (inclusive of 60)?", options: ["60 < average < 75", "average >= 60 || average < 75", "average >= 60 && average < 75", "average == 60 && 75"], answerIndex: 2 },
                { question: "Why cast total to float before dividing by number of subjects?", options: ["To make the code longer", "To avoid integer truncation and get a decimal average", "Because printf requires float", "Because += only works with float"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the accumulation and grading trace.",
                "Observe how += builds the total and how the grade condition chain is evaluated.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter marks for 5 subjects — e.g. 85 90 78 92 80",
                "Click Run Code. Verify output shows Total, Average, and Grade correctly.",
                "Try borderline inputs like 40 40 40 40 40 and 39 39 39 39 39. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int m1, m2, m3, m4, m5;\n    int total = 0;\n    float avg;\n    scanf(\"%d %d %d %d %d\", &m1, &m2, &m3, &m4, &m5);\n    total += m1; total += m2; total += m3; total += m4; total += m5;\n    avg = (float)total / 5;\n    printf(\"Total: %d\\nAverage: %.2f\\n\", total, avg);\n    if (avg >= 90) printf(\"Grade: A\\n\");\n    else if (avg >= 75) printf(\"Grade: B\\n\");\n    else if (avg >= 60) printf(\"Grade: C\\n\");\n    else if (avg >= 40) printf(\"Grade: D\\n\");\n    else printf(\"Grade: F\\n\");\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for marks", memory: [{variable: "total", type: "int", value: "0"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 7, annotation: "scanf() reads '85 90 78 92 80'", memory: [{variable: "total", type: "int", value: "0"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 8, annotation: "Accumulate total using +=", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 9, annotation: "Compute float average", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "85.00"}], output: "" },
                  { line: 10, annotation: "Print total and average", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "85.00"}], output: "Total: 425\nAverage: 85.00\n" },
                  { line: 11, annotation: "Check if avg >= 90 (False)", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "85.00"}], output: "Total: 425\nAverage: 85.00\n" },
                  { line: 12, annotation: "Check if avg >= 75 (True), print Grade: B", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "85.00"}], output: "Total: 425\nAverage: 85.00\nGrade: B\n" },
                  { line: 17, annotation: "Program terminates", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "85.00"}], output: "Total: 425\nAverage: 85.00\nGrade: B\n" }
                ]
              },
              posttest: [
                { question: "For marks 70 80 90 60 50, what is the total?", options: ["340", "360", "350", "370"], answerIndex: 2 },
                { question: "For the same marks above (total 350), what is the average?", options: ["75.00", "70.00", "65.00", "80.00"], answerIndex: 1 },
                { question: "With average 70.00, which grade is awarded?", options: ["A", "B", "C", "D"], answerIndex: 2 },
                { question: "Which compound operator correctly accumulates marks into total?", options: ["total == total + marks", "total = marks", "total += marks", "total =+ marks"], answerIndex: 2 },
                { question: "For marks 30 35 28 40 32, what is the grade?", options: ["D", "C", "F", "B"], answerIndex: 2 }
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
        title: "WEEK 5",
        objective: "if-else, switch-case, nested-if, relational and logical operators",
        tutorial: "Tutorial 5: Branching",
        labTitle: "Lab 5: Conditional statements",
        experiments: [
          {
            id: "c-w5-1",
            title: "Max and Min of Four Numbers",
            desc: "Find the max and min of four numbers using if-else.",
            expected: "Maximum: 45 Minimum: 7",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept four integers from the user and determine the largest and smallest among them using nested if-else statements and relational operators. The student will:",
                bullets: [
                  "Declare and use int variables for four input numbers",
                  "Apply nested if-else to compare multiple values systematically",
                  "Use relational operators (>, <) to drive conditional logic",
                  "Track both maximum and minimum in a single program pass",
                  "Use printf() to display the results clearly"
                ]
              },
              theory: [
                {
                  title: "Nested if-else",
                  body: ["An if-else construct placed inside another if or else block is called a nested if-else. It allows multi-way decisions based on a sequence of conditions.", "if (condition1) {\n    if (condition2) { ... }\n    else { ... }\n} else { ... }"]
                },
                {
                  title: "Finding Maximum and Minimum",
                  body: ["Assume the first variable is the maximum, then compare it against each remaining variable, updating the maximum whenever a larger value is found:", "max = a; if (b > max) max = b; if (c > max) max = c; if (d > max) max = d;", "Same strategy in reverse for minimum:", "min = a; if (b < min) min = b; if (c < min) min = c; if (d < min) min = d;"]
                },
                {
                  title: "Relational and Logical Operators",
                  body: ["> greater than, < less than, >= greater or equal, <= less or equal, == equality check, != not equal.", "Logical AND (&&) can combine conditions to check max in one step: if (a >= b && a >= c && a >= d) max = a;"]
                }
              ],
              pretest: [
                { question: "What is the correct initial assumption when finding the maximum of four numbers?", options: ["Assume max = 0", "Assume max = first number", "Assume max = last number", "Assume max = average"], answerIndex: 1 },
                { question: "For inputs 3, 9, 1, 7, what is the maximum?", options: ["3", "7", "1", "9"], answerIndex: 3 },
                { question: "For inputs 3, 9, 1, 7, what is the minimum?", options: ["3", "1", "7", "9"], answerIndex: 1 },
                { question: "What does the condition (b > max) check?", options: ["Whether b equals max", "Whether b is strictly greater than the current max", "Whether b is less than max", "Whether b is not zero"], answerIndex: 1 },
                { question: "What relational operator is used to find the smallest value?", options: [">", ">=", "<", "=="], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the comparison trace.",
                "Observe how max and min are updated as each number is compared.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter four integers — e.g. 12 45 7 30",
                "Click Run Code. Verify output: Maximum: 45  Minimum: 7",
                "Try all equal values like 5 5 5 5 and negative values like -3 -8 -1 -5. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int a, b, c, d, max, min;\n    scanf(\"%d %d %d %d\", &a, &b, &c, &d);\n    max = a; min = a;\n    if (b > max) max = b;\n    if (c > max) max = c;\n    if (d > max) max = d;\n    if (b < min) min = b;\n    if (c < min) min = c;\n    if (d < min) min = d;\n    printf(\"Maximum: %d\\nMinimum: %d\\n\", max, min);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "a", type: "int", value: "?"}, {variable: "b", type: "int", value: "?"}, {variable: "c", type: "int", value: "?"}, {variable: "d", type: "int", value: "?"}, {variable: "max", type: "int", value: "?"}, {variable: "min", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '12 45 7 30'", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "?"}, {variable: "min", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "Assume first is max and min", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "12"}, {variable: "min", type: "int", value: "12"}], output: "" },
                  { line: 7, annotation: "45 > 12 is true, update max to 45", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "12"}], output: "" },
                  { line: 8, annotation: "7 > 45 is false, max stays 45", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "12"}], output: "" },
                  { line: 9, annotation: "30 > 45 is false, max stays 45", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "12"}], output: "" },
                  { line: 10, annotation: "45 < 12 is false, min stays 12", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "12"}], output: "" },
                  { line: 11, annotation: "7 < 12 is true, update min to 7", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "7"}], output: "" },
                  { line: 12, annotation: "30 < 7 is false, min stays 7", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "7"}], output: "" },
                  { line: 13, annotation: "Print result", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "7"}], output: "Maximum: 45\nMinimum: 7\n" },
                  { line: 14, annotation: "Program terminates", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "7"}], output: "Maximum: 45\nMinimum: 7\n" }
                ]
              },
              posttest: [
                { question: "For inputs -3, -8, -1, -5, what is the maximum?", options: ["-8", "-5", "-3", "-1"], answerIndex: 3 },
                { question: "For inputs -3, -8, -1, -5, what is the minimum?", options: ["-1", "-3", "-8", "-5"], answerIndex: 2 },
                { question: "What is wrong with initialising max = 0 when all inputs are negative?", options: ["Nothing, it always works", "max would remain 0, which is larger than all inputs — giving a wrong result", "It causes a compilation error", "It only fails when inputs are floats"], answerIndex: 1 },
                { question: "How many comparisons are needed to find max from four numbers using the sequential update method?", options: ["2", "4", "3", "6"], answerIndex: 2 },
                { question: "For inputs 5, 5, 5, 5, what are max and min?", options: ["max = 0, min = 0", "max = 5, min = 0", "max = 5, min = 5", "Undefined"], answerIndex: 2 }
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
            id: "c-w5-2",
            title: "Electricity Bill Generator",
            desc: "Generate electricity bill based on units consumed.",
            expected: "Electricity Bill: Rs. 650.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept the number of units of electricity consumed by a customer and compute the electricity bill using a slab-based tariff structure implemented with if-else if-else statements. The student will:",
                bullets: [
                  "Declare and use int and float variables for units and bill amount",
                  "Apply if-else if-else chains to implement multi-slab billing logic",
                  "Perform cumulative arithmetic across multiple slabs",
                  "Use printf() with %.2f to display the bill to 2 decimal places",
                  "Understand real-world applications of conditional branching"
                ]
              },
              theory: [
                {
                  title: "Slab-Based Tariff",
                  body: ["Electricity boards charge different rates per unit for different consumption ranges. A common slab structure:", "Units 1–100 : Rs. 1.50 per unit", "Units 101–200 : Rs. 2.50 per unit (for units above 100)", "Units 201–300 : Rs. 4.00 per unit (for units above 200)", "Units above 300: Rs. 6.00 per unit (for units above 300)"]
                },
                {
                  title: "Cumulative Billing",
                  body: ["A consumer using 250 units pays:", "First 100 units: 100 * 1.50 = 150.00", "Next 100 units: 100 * 2.50 = 250.00", "Last 50 units: 50 * 4.00 = 200.00", "Total: Rs. 600.00"]
                },
                {
                  title: "if-else if-else Chain",
                  body: ["Used when exactly one of several mutually exclusive conditions must be selected:", "if (units <= 100) { ... } else if (units <= 200) { ... } else if (units <= 300) { ... } else { ... }", "Once a condition is true, the rest of the chain is skipped. A fixed service charge (e.g. Rs. 50) is often added to the computed amount."]
                }
              ],
              pretest: [
                { question: "What kind of conditional structure is best for multi-slab billing?", options: ["Nested ternary operators", "switch-case", "if-else if-else chain", "while loop"], answerIndex: 2 },
                { question: "A customer uses 150 units. How many units are billed at Rs. 2.50/unit?", options: ["150", "100", "50", "200"], answerIndex: 2 },
                { question: "What is the bill for 100 units at Rs. 1.50 per unit?", options: ["100.00", "200.00", "150.00", "50.00"], answerIndex: 2 },
                { question: "For 250 units using the slab above, what is the bill (excluding service charge)?", options: ["500.00", "625.00", "600.00", "550.00"], answerIndex: 2 },
                { question: "Once a true condition is found in an if-else if chain, what happens to the rest?", options: ["They are all evaluated", "They are skipped", "They cause an error", "They are evaluated only if the first is false"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the slab selection and bill computation.",
                "Observe how the if-else if chain selects exactly one slab block to execute.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter number of units consumed — e.g. 250",
                "Click Run Code. Verify output: Electricity Bill: Rs. 650.00 (including Rs. 50 service charge)",
                "Try 50, 150, 350 units to exercise all slab branches. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int units;\n    float bill = 0;\n    scanf(\"%d\", &units);\n    if (units <= 100) {\n        bill = units * 1.50;\n    } else if (units <= 200) {\n        bill = (100 * 1.50) + ((units - 100) * 2.50);\n    } else if (units <= 300) {\n        bill = (100 * 1.50) + (100 * 2.50) + ((units - 200) * 4.00);\n    } else {\n        bill = (100 * 1.50) + (100 * 2.50) + (100 * 4.00) + ((units - 300) * 6.00);\n    }\n    bill += 50.00;\n    printf(\"Electricity Bill: Rs. %.2f\\n\", bill);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "units", type: "int", value: "?"}, {variable: "bill", type: "float", value: "0.00"}], output: "" },
                  { line: 5, annotation: "scanf() reads '250'", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "0.00"}], output: "" },
                  { line: 6, annotation: "units <= 100 is false", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "0.00"}], output: "" },
                  { line: 8, annotation: "units <= 200 is false", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "0.00"}], output: "" },
                  { line: 10, annotation: "units <= 300 is true, executing this block", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "0.00"}], output: "" },
                  { line: 11, annotation: "Calculate 150 + 250 + (50 * 4.00) = 600.00", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "600.00"}], output: "" },
                  { line: 15, annotation: "Add fixed service charge of Rs. 50", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "650.00"}], output: "" },
                  { line: 16, annotation: "printf() displays total bill", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "650.00"}], output: "Electricity Bill: Rs. 650.00\n" },
                  { line: 17, annotation: "Program terminates", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "650.00"}], output: "Electricity Bill: Rs. 650.00\n" }
                ]
              },
              posttest: [
                { question: "For 100 units, what is the bill (excluding service charge)?", options: ["200.00", "100.00", "250.00", "150.00"], answerIndex: 3 },
                { question: "For 200 units, what is the bill (excluding service charge)?", options: ["300.00", "400.00", "500.00", "350.00"], answerIndex: 2 },
                { question: "For 350 units, what is the bill (excluding service charge)?", options: ["900.00", "1100.00", "1050.00", "1150.00"], answerIndex: 3 },
                { question: "What is the role of the else block in the slab billing program?", options: ["Handles units equal to 300", "Handles zero units", "Handles units greater than 300", "Is never executed"], answerIndex: 2 },
                { question: "Why is a service charge added separately rather than inside each slab?", options: ["It makes the program longer", "It is a fixed charge applied regardless of units consumed", "It only applies to high consumers", "It is required by the C standard"], answerIndex: 1 }
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
            id: "c-w5-3",
            title: "Quadratic Roots",
            desc: "Find roots of the quadratic equation ax2+bx+c=0.",
            expected: "Roots: 3.00, 2.00 or Complex",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept coefficients a, b, and c of a quadratic equation ax² + bx + c = 0 and compute and classify its roots using the discriminant. The student will:",
                bullets: [
                  "Declare and use float/double variables for coefficients and roots",
                  "Compute the discriminant: D = b*b - 4*a*c",
                  "Use nested if-else to classify roots as real & distinct, real & equal, or complex",
                  "Apply sqrt() from math.h to compute real roots",
                  "Handle edge cases including a = 0 (not a quadratic)"
                ]
              },
              theory: [
                {
                  title: "Quadratic Formula",
                  body: ["A second-degree polynomial equation of the form: ax² + bx + c = 0 where a ≠ 0", "Formula: x = (-b ± sqrt(b² - 4ac)) / (2a)"]
                },
                {
                  title: "Discriminant",
                  body: ["D = b² - 4ac determines the nature of the roots:", "D > 0 : Two distinct real roots. x1 = (-b + sqrt(D)) / (2a), x2 = (-b - sqrt(D)) / (2a)", "D == 0 : Two equal (repeated) real roots. x1 = x2 = -b / (2a)", "D < 0 : Two complex conjugate roots (no real roots). Real part = -b / (2a), Imaginary part = sqrt(-D) / (2a)"]
                },
                {
                  title: "Edge Case",
                  body: ["If a = 0, the equation becomes linear: bx + c = 0, solved as x = -c/b.", "This must be checked before applying the quadratic formula to avoid division by zero."]
                }
              ],
              pretest: [
                { question: "What is the discriminant of a quadratic equation?", options: ["b² + 4ac", "b² - 4ac", "2a - b", "-b / 2a"], answerIndex: 1 },
                { question: "If D > 0, the roots are:", options: ["Complex", "Equal", "Two distinct real roots", "Zero"], answerIndex: 2 },
                { question: "If D = 0, what can be said about the roots?", options: ["No real roots exist", "Two distinct real roots", "Two equal real roots", "One root is always zero"], answerIndex: 2 },
                { question: "For a = 1, b = -5, c = 6, what is the discriminant?", options: ["1", "49", "25", "1"], answerIndex: 3 },
                { question: "Why must a = 0 be handled separately before computing roots?", options: ["It causes a syntax error", "It makes D negative", "It results in division by zero in the quadratic formula", "sqrt() fails when a = 0"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the discriminant computation and branching.",
                "Observe how D > 0, D == 0, and D < 0 lead to three different output paths.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a, b, c — e.g. 1 -5 6",
                "Click Run Code. Verify output: Root1: 3.00  Root2: 2.00",
                "Try 1 2 1 (equal roots) and 1 1 1 (complex roots). Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double a, b, c, d, r1, r2;\n    scanf(\"%lf %lf %lf\", &a, &b, &c);\n    if (a == 0) {\n        printf(\"Not a quadratic equation.\\n\");\n    } else {\n        d = b * b - 4 * a * c;\n        if (d > 0) {\n            r1 = (-b + sqrt(d)) / (2 * a);\n            r2 = (-b - sqrt(d)) / (2 * a);\n            printf(\"Root1: %.2f  Root2: %.2f\\n\", r1, r2);\n        } else if (d == 0) {\n            r1 = -b / (2 * a);\n            printf(\"Equal roots: %.2f\\n\", r1);\n        } else {\n            printf(\"Complex roots\\n\");\n        }\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and math libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate variables", memory: [{variable: "a", type: "double", value: "?"}, {variable: "b", type: "double", value: "?"}, {variable: "c", type: "double", value: "?"}, {variable: "d", type: "double", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf() reads '1 -5 6'", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "?"}], output: "" },
                  { line: 7, annotation: "Check if a == 0 (False)", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "?"}], output: "" },
                  { line: 10, annotation: "Compute discriminant D = 25 - 24 = 1", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "" },
                  { line: 11, annotation: "Check if D > 0 (True)", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "" },
                  { line: 12, annotation: "Compute Root1 = (5 + 1)/2 = 3.0", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "" },
                  { line: 13, annotation: "Compute Root2 = (5 - 1)/2 = 2.0", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "" },
                  { line: 14, annotation: "printf() displays both distinct roots", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "Root1: 3.00  Root2: 2.00\n" },
                  { line: 22, annotation: "Program terminates", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "Root1: 3.00  Root2: 2.00\n" }
                ]
              },
              posttest: [
                { question: "For a=1, b=2, c=1, what is the discriminant and nature of roots?", options: ["D=8, distinct real", "D=0, equal real roots", "D=-4, complex", "D=4, distinct real"], answerIndex: 1 },
                { question: "For a=1, b=1, c=1, what is the nature of roots?", options: ["Distinct real", "Equal real", "Complex", "Zero"], answerIndex: 2 },
                { question: "For a=1, b=-5, c=6, what are the roots?", options: ["1 and 6", "2 and 3", "-2 and -3", "5 and 1"], answerIndex: 1 },
                { question: "What is the real part of complex roots when D < 0?", options: ["sqrt(-D) / (2a)", "b / (2a)", "-b / (2a)", "-b / a"], answerIndex: 2 },
                { question: "For a=0, b=2, c=4, what should the program output?", options: ["Roots: -2.00 and 2.00", "Not a quadratic — linear equation, x = -2.00", "Division by zero error", "Complex roots"], answerIndex: 1 }
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
            id: "c-w5-4",
            title: "Calculator Using Switch",
            desc: "Simulate a basic calculator for +, -, *, /.",
            expected: "Result: 13.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to implement a simple arithmetic calculator that accepts two numbers and an operator from the user and performs the corresponding operation using a switch-case statement. The student will:",
                bullets: [
                  "Declare and use float variables for operands and result",
                  "Accept a char input for the operator (+, -, *, /)",
                  "Use switch-case to dispatch to the correct operation",
                  "Handle division by zero as a special case within the division branch",
                  "Use the default case to handle invalid operators",
                  "Use printf() with %.2f to display the result"
                ]
              },
              theory: [
                {
                  title: "switch-case Statement",
                  body: ["An alternative to long if-else if chains when branching on the value of a single integer or character expression.", "switch (expression) {\n    case value1: statements; break;\n    case value2: statements; break;\n    default: statements;\n}"]
                },
                {
                  title: "break Statement and Fall-Through",
                  body: ["Each case must end with break to prevent fall-through. Without break, execution continues into the next case regardless of its label.", "Intentional fall-through (omitting break) can group cases: case '+': case 'p': result = a + b; break;"]
                },
                {
                  title: "default Case and Char Input",
                  body: ["default case is executed when no case value matches the expression. Used to handle invalid or unexpected input gracefully.", "Operators are characters. Read with scanf(\" %c\", &op). The leading space in \" %c\" skips any leftover whitespace or newline in the input buffer."]
                },
                {
                  title: "Division by Zero",
                  body: ["Always check if the divisor is zero before performing division:\ncase '/':\n    if (b == 0) printf(\"Error\");\n    else result = a / b;\n    break;"]
                }
              ],
              pretest: [
                { question: "Which statement prevents fall-through in a switch-case block?", options: ["continue", "exit", "return", "break"], answerIndex: 3 },
                { question: "What is executed when no case matches in a switch statement?", options: ["The first case", "Nothing — program exits", "The default case", "An error is thrown"], answerIndex: 2 },
                { question: "What format specifier reads a character in scanf?", options: ["%s", "%d", "%c", "%ch"], answerIndex: 2 },
                { question: "For inputs 10, 0, and operator /, what should the program output?", options: ["0.00", "Infinity", "Error: Division by zero", "10.00"], answerIndex: 2 },
                { question: "What happens if break is omitted from a case in switch?", options: ["Compilation error", "That case is skipped", "Execution falls through to the next case", "switch exits immediately"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the switch dispatch for different operators.",
                "Observe how break stops execution after each case and how default catches bad input.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter two numbers and an operator — e.g. 10 3 +",
                "Click Run Code. Verify output: Result: 13.00",
                "Test all four operators and try 10 0 / for division by zero. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    float a, b, res;\n    char op;\n    scanf(\"%f %f %c\", &a, &b, &op);\n    switch(op) {\n        case '+': res = a + b; printf(\"Result: %.2f\\n\", res); break;\n        case '-': res = a - b; printf(\"Result: %.2f\\n\", res); break;\n        case '*': res = a * b; printf(\"Result: %.2f\\n\", res); break;\n        case '/': \n            if (b == 0) printf(\"Error: Division by zero\\n\");\n            else printf(\"Result: %.2f\\n\", a / b);\n            break;\n        default: printf(\"Invalid operator\\n\");\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "a", type: "float", value: "?"}, {variable: "b", type: "float", value: "?"}, {variable: "op", type: "char", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '10 3 +'", memory: [{variable: "a", type: "float", value: "10.0"}, {variable: "b", type: "float", value: "3.0"}, {variable: "op", type: "char", value: "'+'"}], output: "" },
                  { line: 6, annotation: "switch evaluates op '+'", memory: [{variable: "a", type: "float", value: "10.0"}, {variable: "b", type: "float", value: "3.0"}, {variable: "op", type: "char", value: "'+'"}], output: "" },
                  { line: 7, annotation: "Case '+' matches. Compute res and print", memory: [{variable: "a", type: "float", value: "10.0"}, {variable: "b", type: "float", value: "3.0"}, {variable: "op", type: "char", value: "'+'"}], output: "Result: 13.00\n" },
                  { line: 7, annotation: "break statement exits switch block", memory: [{variable: "a", type: "float", value: "10.0"}, {variable: "b", type: "float", value: "3.0"}, {variable: "op", type: "char", value: "'+'"}], output: "Result: 13.00\n" },
                  { line: 16, annotation: "Program terminates", memory: [{variable: "a", type: "float", value: "10.0"}, {variable: "b", type: "float", value: "3.0"}, {variable: "op", type: "char", value: "'+'"}], output: "Result: 13.00\n" }
                ]
              },
              posttest: [
                { question: "For inputs 15, 4, and operator *, what is the output?", options: ["11.00", "3.75", "19.00", "60.00"], answerIndex: 3 },
                { question: "For inputs 9, 4, and operator -, what is the output?", options: ["13.00", "2.25", "5.00", "36.00"], answerIndex: 2 },
                { question: "For inputs 7, 2, and operator /, what is the output?", options: ["3.00", "3.50", "4.00", "14.00"], answerIndex: 1 },
                { question: "What does the default case in this calculator program do?", options: ["Performs addition as a fallback", "Exits the program silently", "Prints an invalid operator message", "Repeats the last valid operation"], answerIndex: 2 },
                { question: "Why is \" %c\" (with a leading space) used instead of \"%c\" for reading the operator?", options: ["%c cannot read symbols", "The leading space flushes the newline left in the input buffer", "Symbols require a space before them in scanf", "It makes the output prettier"], answerIndex: 1 }
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
            id: "c-w5-5",
            title: "Leap Year Check",
            desc: "Determine if a given year is a leap year.",
            expected: "Leap Year / Not Leap Year",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a year from the user and determine whether it is a leap year or not using nested if-else statements and logical operators. The student will:",
                bullets: [
                  "Declare and use an int variable for the year",
                  "Apply the standard leap year rule using % (modulus) and logical operators",
                  "Implement the three-condition leap year test using nested if-else",
                  "Use printf() to display whether the year is a leap year or not"
                ]
              },
              theory: [
                {
                  title: "Leap Year Rules",
                  body: ["A year is a leap year if: Rule 1: It is divisible by 4 AND Rule 2: It is NOT divisible by 100 OR Rule 3: It is divisible by 400", "Condensed Rule: (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)"]
                },
                {
                  title: "Breakdown",
                  body: ["Divisible by 4 : Candidate for leap year (e.g. 2024)", "Divisible by 100 : Century year — NOT a leap year unless also divisible by 400", "Divisible by 400 : Always a leap year (e.g. 2000)"]
                },
                {
                  title: "Examples",
                  body: ["2024 : 2024 % 4 == 0, 2024 % 100 != 0 → Leap year", "1900 : 1900 % 4 == 0, 1900 % 100 == 0, 1900 % 400 != 0 → Not a leap year", "2000 : 2000 % 400 == 0 → Leap year", "2023 : 2023 % 4 != 0 → Not a leap year"]
                },
                {
                  title: "Operators",
                  body: ["Modulus Operator — year % 4 gives the remainder when year is divided by 4.", "Logical Operators: && (AND) both conditions must be true, || (OR) at least one condition must be true, ! (NOT) inverts a boolean result"]
                }
              ],
              pretest: [
                { question: "Which of the following is the correct leap year condition in C?", options: ["year % 4 == 0", "(year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)", "year % 100 == 0 || year % 4 == 0", "year % 400 == 0 && year % 4 == 0"], answerIndex: 1 },
                { question: "Is 1900 a leap year?", options: ["Yes", "No", "Only in some calendars", "Depends on the compiler"], answerIndex: 1 },
                { question: "Is 2000 a leap year?", options: ["No", "Yes", "Only if divisible by 100", "Cannot be determined"], answerIndex: 1 },
                { question: "What does year % 4 == 0 check?", options: ["Whether year is greater than 4", "Whether year divided by 4 leaves no remainder", "Whether year is a multiple of 100", "Whether year is odd"], answerIndex: 1 },
                { question: "Why is the divisible-by-100 rule needed in addition to divisible-by-4?", options: ["To handle negative years", "Because century years are not leap years unless divisible by 400", "To speed up computation", "To handle float years"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the three-level condition check.",
                "Observe how 2000, 1900, 2024, and 2023 each take different paths through the logic.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a year — e.g. 2024",
                "Click Run Code. Verify output: 2024 is a Leap Year",
                "Test 1900, 2000, 2023, and 1600 to cover all rule branches. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int year;\n    scanf(\"%d\", &year);\n    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {\n        printf(\"%d is a Leap Year\\n\", year);\n    } else {\n        printf(\"%d is not a Leap Year\\n\", year);\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate year variable", memory: [{variable: "year", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '2024'", memory: [{variable: "year", type: "int", value: "2024"}], output: "" },
                  { line: 6, annotation: "Check condition: (2024 % 4 == 0 && 2024 % 100 != 0) is true", memory: [{variable: "year", type: "int", value: "2024"}], output: "" },
                  { line: 7, annotation: "printf() prints leap year message", memory: [{variable: "year", type: "int", value: "2024"}], output: "2024 is a Leap Year\n" },
                  { line: 11, annotation: "Program terminates", memory: [{variable: "year", type: "int", value: "2024"}], output: "2024 is a Leap Year\n" }
                ]
              },
              posttest: [
                { question: "Is 1600 a leap year?", options: ["No", "Yes", "Only if % 4 == 0", "Cannot be determined"], answerIndex: 1 },
                { question: "Is 2100 a leap year?", options: ["Yes, divisible by 4", "No — divisible by 100 but not 400", "Yes, divisible by 400", "Yes, all future years are leap years"], answerIndex: 1 },
                { question: "What is the output for year = 2023?", options: ["2023 is a Leap Year", "2023 is not a Leap Year", "Compilation error", "Undefined"], answerIndex: 1 },
                { question: "Which logical operator is used to combine the two main leap year conditions?", options: ["&&", "!", "||", "^"], answerIndex: 2 },
                { question: "How many leap years are there between 1900 and 2000 inclusive?", options: ["25", "24", "26", "23"], answerIndex: 1 }
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
        title: "WEEK 6",
        objective: "while, do-while, for loops, break and continue",
        tutorial: "Tutorial 6: Loops",
        labTitle: "Lab 6: Iterative problems",
        experiments: [
          {
            id: "c-w6-1",
            title: "Factorial",
            desc: "Calculate factorial of a given number.",
            expected: "Factorial: 120",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a non-negative integer from the user and compute its factorial using a loop. The student will:",
                bullets: [
                  "Declare and use int and long long variables to handle large factorial values",
                  "Implement factorial computation using for, while, or do-while loop",
                  "Understand the mathematical definition of factorial including 0! = 1",
                  "Handle invalid input (negative numbers) using a conditional check",
                  "Use printf() with %lld to display large integer results"
                ]
              },
              theory: [
                {
                  title: "Factorial Definition",
                  body: ["The factorial of a non-negative integer n, written n!, is: n! = n × (n-1) × (n-2) × ... × 2 × 1", "0! = 1 (by definition), 1! = 1, 5! = 5 × 4 × 3 × 2 × 1 = 120"]
                },
                {
                  title: "Iterative Approach Using for Loop",
                  body: ["long long fact = 1;\nfor (int i = 1; i <= n; i++) {\n    fact = fact * i;\n}", "The loop multiplies fact by each integer from 1 to n sequentially."]
                },
                {
                  title: "Why long long?",
                  body: ["Factorials grow very rapidly: 10! = 3,628,800, 15! = 1,307,674,368,000, 20! = 2,432,902,008,176,640,000", "An int (typically 32-bit) overflows beyond 12!. Use long long (64-bit) to safely hold values up to 20!. Format specifier: %lld."]
                },
                {
                  title: "Negative Input Handling",
                  body: ["Factorial is undefined for negative integers. Check with if (n < 0) and print an error message before attempting any computation."]
                }
              ],
              pretest: [
                { question: "What is 0! equal to?", options: ["0", "Undefined", "1", "-1"], answerIndex: 2 },
                { question: "What is 5!?", options: ["25", "60", "100", "120"], answerIndex: 3 },
                { question: "Why is long long preferred over int for storing factorial results?", options: ["int cannot store numbers above 100", "Factorials grow rapidly and overflow 32-bit int beyond 12!", "long long is faster to compute", "printf requires long long for all loops"], answerIndex: 1 },
                { question: "What format specifier is used to print a long long value?", options: ["%ld", "%lld", "%ll", "%Ld"], answerIndex: 1 },
                { question: "What is the correct initial value of the factorial accumulator before the loop?", options: ["0", "n", "1", "-1"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the loop trace for n = 5.",
                "Observe how the accumulator fact is updated at each iteration.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a non-negative integer — e.g. 5",
                "Click Run Code. Verify output: Factorial: 120",
                "Try n = 0, n = 1, n = 15, and n = -3 to test all branches. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    long long fact = 1;\n    int n, i;\n    scanf(\"%d\", &n);\n    if (n < 0) {\n        printf(\"Error: Factorial of negative number is undefined\\n\");\n    } else {\n        for (i = 1; i <= n; i++) {\n            fact = fact * i;\n        }\n        printf(\"Factorial: %lld\\n\", fact);\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "?"}, {variable: "i", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '5'", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "n < 0 is false", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "?"}], output: "" },
                  { line: 9, annotation: "Loop i = 1", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "fact = 1 * 1 = 1", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Loop i = 2", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 10, annotation: "fact = 1 * 2 = 2", memory: [{variable: "fact", type: "long long", value: "2"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 9, annotation: "Loop i = 3", memory: [{variable: "fact", type: "long long", value: "2"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 10, annotation: "fact = 2 * 3 = 6", memory: [{variable: "fact", type: "long long", value: "6"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 9, annotation: "Loop i = 4", memory: [{variable: "fact", type: "long long", value: "6"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "4"}], output: "" },
                  { line: 10, annotation: "fact = 6 * 4 = 24", memory: [{variable: "fact", type: "long long", value: "24"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "4"}], output: "" },
                  { line: 9, annotation: "Loop i = 5", memory: [{variable: "fact", type: "long long", value: "24"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "5"}], output: "" },
                  { line: 10, annotation: "fact = 24 * 5 = 120", memory: [{variable: "fact", type: "long long", value: "120"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "5"}], output: "" },
                  { line: 12, annotation: "printf() prints factorial", memory: [{variable: "fact", type: "long long", value: "120"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "6"}], output: "Factorial: 120\n" },
                  { line: 15, annotation: "Program terminates", memory: [{variable: "fact", type: "long long", value: "120"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "6"}], output: "Factorial: 120\n" }
                ]
              },
              posttest: [
                { question: "What is 10!?", options: ["100", "1000", "3628800", "362880"], answerIndex: 2 },
                { question: "What is the output of the program for n = 0?", options: ["0", "Undefined", "Error", "1"], answerIndex: 3 },
                { question: "How many iterations does the for loop execute for n = 6?", options: ["5", "7", "6", "0"], answerIndex: 2 },
                { question: "What happens to the accumulator if it is initialised to 0 instead of 1?", options: ["Output doubles", "Output is always 0", "Output is always 1", "No change"], answerIndex: 1 },
                { question: "What is the maximum n for which factorial fits in a long long (64-bit)?", options: ["15", "25", "20", "12"], answerIndex: 2 }
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
            id: "c-w6-2",
            title: "Prime Number Check",
            desc: "Check if a number is prime.",
            expected: "17 is a Prime Number",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a positive integer from the user and determine whether it is a prime number using a loop with break and a flag variable. The student will:",
                bullets: [
                  "Declare and use int variables for the number, loop counter, and flag",
                  "Implement a trial division loop from 2 to sqrt(n) for efficiency",
                  "Use break to exit the loop early when a factor is found",
                  "Use a flag variable to record whether any factor was found",
                  "Use printf() to display whether the number is prime or not"
                ]
              },
              theory: [
                {
                  title: "Prime Number Definition",
                  body: ["A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.", "Primes: 2, 3, 5, 7, 11... Not prime (composite): 4, 6, 8, 9... 1 is neither prime nor composite."]
                },
                {
                  title: "Trial Division",
                  body: ["To check if n is prime, test divisibility for each i from 2 to n-1. If n % i == 0 for any i, n is not prime."]
                },
                {
                  title: "Optimised Loop",
                  body: ["It is sufficient to check divisors only up to sqrt(n). If n has a factor greater than sqrt(n), it must have a corresponding factor smaller than sqrt(n).", "for (i = 2; i * i <= n; i++) reduces iterations significantly."]
                },
                {
                  title: "break Statement and Flag",
                  body: ["When a factor is found, there is no need to continue checking. break exits the loop immediately.", "A flag (isPrime) is initialised to 1. If any factor is found, it is set to 0. After the loop, the flag determines the result."]
                }
              ],
              pretest: [
                { question: "What is the definition of a prime number?", options: ["Divisible by 2", "Greater than 1 with no divisors other than 1 and itself", "An odd number", "Divisible only by itself"], answerIndex: 1 },
                { question: "Why is it sufficient to check divisors up to sqrt(n)?", options: ["To make the code shorter", "Any factor larger than sqrt(n) pairs with one smaller than sqrt(n)", "sqrt(n) is always prime", "Divisors above sqrt(n) are always even"], answerIndex: 1 },
                { question: "What is the loop condition using the sqrt optimisation?", options: ["i <= n", "i < n", "i * i <= n", "i <= n / 2"], answerIndex: 2 },
                { question: "What does the break statement do inside the prime-checking loop?", options: ["Skips the current iteration", "Exits the entire program", "Exits the loop immediately when a factor is found", "Restarts the loop from i = 2"], answerIndex: 2 },
                { question: "Is 1 a prime number?", options: ["Yes", "No", "Only in some definitions", "Depends on the compiler"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the loop for n = 7 and n = 12.",
                "Observe how break fires immediately at i = 2 for n = 12 and never fires for n = 7.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a positive integer — e.g. 17",
                "Click Run Code. Verify output: 17 is a Prime Number",
                "Try 1, 2, 4, 97, and 100 to exercise all branches. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int n, i, isPrime = 1;\n    scanf(\"%d\", &n);\n    if (n <= 1) {\n        isPrime = 0;\n    } else {\n        for (i = 2; i * i <= n; i++) {\n            if (n % i == 0) {\n                isPrime = 0;\n                break;\n            }\n        }\n    }\n    if (isPrime) printf(\"%d is a Prime Number\\n\", n);\n    else printf(\"%d is not a Prime Number\\n\", n);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "i", type: "int", value: "?"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 5, annotation: "scanf() reads '17'", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "?"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 6, annotation: "n <= 1 is false", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "?"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Loop i = 2 (2*2 <= 17)", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "2"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "17 % 2 != 0", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "2"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Loop i = 3 (3*3 <= 17)", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "3"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "17 % 3 != 0", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "3"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Loop i = 4 (4*4 <= 17)", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "4"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "17 % 4 != 0", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "4"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Loop exits, i = 5 (5*5 > 17)", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "5"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 16, annotation: "isPrime is 1, print Prime", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "5"}, {variable: "isPrime", type: "int", value: "1"}], output: "17 is a Prime Number\n" },
                  { line: 18, annotation: "Program terminates", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "5"}, {variable: "isPrime", type: "int", value: "1"}], output: "17 is a Prime Number\n" }
                ]
              },
              posttest: [
                { question: "How many iterations does the optimised loop perform for n = 36?", options: ["35", "18", "6", "4"], answerIndex: 2 },
                { question: "What is the output for n = 2?", options: ["2 is not a Prime Number", "2 is a Prime Number", "Undefined", "0"], answerIndex: 1 },
                { question: "What is the output for n = 1?", options: ["1 is a Prime Number", "1 is not a Prime Number", "Error", "0"], answerIndex: 1 },
                { question: "For n = 49, what factor is found first and at which iteration?", options: ["i = 7, n % 7 == 0", "i = 2, n % 2 == 0", "i = 3, n % 3 == 0", "i = 49, n % 49 == 0"], answerIndex: 0 },
                { question: "What is the purpose of initialising isPrime = 1 before the loop?", options: ["To set the default output to \"not prime\"", "To assume the number is prime unless a factor is found", "To avoid a compilation warning", "Required by C standard for flag variables"], answerIndex: 1 }
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
            id: "c-w6-3",
            title: "Sine Series",
            desc: "Calculate sin(x) using Taylor series expansion.",
            expected: "sin(30) ≈ 0.500000",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to compute the value of sin(x) using its Taylor/Maclaurin series expansion up to a specified number of terms. The student will:",
                bullets: [
                  "Declare and use double variables for x, the term, and the running sum",
                  "Accept x in degrees and convert to radians before computation",
                  "Apply the sine series formula iteratively using a for loop",
                  "Understand how term sign alternates and how each term is built from the previous",
                  "Compare the computed result with the library sin() function from math.h",
                  "Use printf() with %.6f to display results to sufficient decimal precision"
                ]
              },
              theory: [
                {
                  title: "Sine Series (Maclaurin Expansion)",
                  body: ["sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + x⁹/9! - ...", "General term (n starting from 0): term_n = (-1)^n * x^(2n+1) / (2n+1)!"]
                },
                {
                  title: "Degree to Radian Conversion",
                  body: ["Trigonometric series require x in radians: x_rad = x_deg * (M_PI / 180.0)", "M_PI is defined in math.h. Alternatively use 3.14159265358979."]
                },
                {
                  title: "Iterative Term Building",
                  body: ["Rather than computing pow() and factorial from scratch each iteration (expensive), build each term from the previous one:", "term = term * (-1) * x * x / ((2*n) * (2*n + 1))", "This avoids repeated factorial and power calculations."]
                },
                {
                  title: "Convergence and Accuracy",
                  body: ["More terms give higher accuracy. For most angles, 10–15 terms are sufficient for double precision.", "Comparing your series result against math.h's sin() validates the implementation."]
                }
              ],
              pretest: [
                { question: "What is the first term of the sine series?", options: ["x³/3!", "x²/2!", "x", "1"], answerIndex: 2 },
                { question: "What is the correct degree-to-radian conversion formula?", options: ["rad = deg / 180", "rad = deg * 180 / PI", "rad = deg * PI / 180", "rad = deg * PI"], answerIndex: 2 },
                { question: "What is the sign pattern of the sine series terms?", options: ["All positive", "All negative", "Alternating starting positive: +, -, +, -, ...", "Alternating starting negative: -, +, -, +, ..."], answerIndex: 2 },
                { question: "Why is the iterative term-building method preferred over computing pow() and factorial separately each iteration?", options: ["It gives a different result", "It avoids repeated expensive computations and is more efficient", "pow() does not work inside loops", "Factorial is undefined for large n"], answerIndex: 1 },
                { question: "For x = 0 degrees, what should sin(0) return?", options: ["1.000000", "Undefined", "3.141593", "0.000000"], answerIndex: 3 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the series computation term by term for x = 30°.",
                "Observe how the running sum converges toward 0.500000 as terms are added.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter an angle in degrees and number of terms — e.g. 30 10",
                "Click Run Code. Verify output: sin(30) ≈ 0.500000",
                "Try 90, 0, 180, and 45 degrees. Compare series result with math.h sin(). Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#define PI 3.14159265358979\n\nint main() {\n    double deg, x, term, sum = 0;\n    int n, i;\n    scanf(\"%lf %d\", &deg, &n);\n    x = deg * (PI / 180.0);\n    term = x;\n    for (i = 0; i < n; i++) {\n        sum += term;\n        term = term * (-1) * x * x / ((2 * i + 2) * (2 * i + 3));\n    }\n    printf(\"sin(%.0f) ≈ %.6f\\n\", deg, sum);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library and define PI", memory: [], output: "" },
                  { line: 5, annotation: "Allocate variables", memory: [{variable: "sum", type: "double", value: "0.0"}], output: "" },
                  { line: 7, annotation: "scanf() reads '30 10'", memory: [{variable: "deg", type: "double", value: "30.0"}, {variable: "n", type: "int", value: "10"}, {variable: "sum", type: "double", value: "0.0"}], output: "" },
                  { line: 8, annotation: "Convert 30 degrees to radians", memory: [{variable: "deg", type: "double", value: "30.0"}, {variable: "x", type: "double", value: "0.523599"}, {variable: "n", type: "int", value: "10"}], output: "" },
                  { line: 9, annotation: "Set initial term to x", memory: [{variable: "x", type: "double", value: "0.523599"}, {variable: "term", type: "double", value: "0.523599"}, {variable: "sum", type: "double", value: "0.0"}], output: "" },
                  { line: 10, annotation: "Loop i = 0", memory: [{variable: "term", type: "double", value: "0.523599"}, {variable: "sum", type: "double", value: "0.0"}], output: "" },
                  { line: 11, annotation: "Add term to sum", memory: [{variable: "term", type: "double", value: "0.523599"}, {variable: "sum", type: "double", value: "0.523599"}], output: "" },
                  { line: 12, annotation: "Compute next term (negative x^3 / 3!)", memory: [{variable: "term", type: "double", value: "-0.023925"}, {variable: "sum", type: "double", value: "0.523599"}], output: "" },
                  { line: 10, annotation: "Loop i = 1", memory: [{variable: "term", type: "double", value: "-0.023925"}, {variable: "sum", type: "double", value: "0.523599"}], output: "" },
                  { line: 11, annotation: "Add term to sum", memory: [{variable: "term", type: "double", value: "-0.023925"}, {variable: "sum", type: "double", value: "0.499674"}], output: "" },
                  { line: 12, annotation: "Compute next term (positive x^5 / 5!)", memory: [{variable: "term", type: "double", value: "0.000328"}, {variable: "sum", type: "double", value: "0.499674"}], output: "" },
                  { line: 14, annotation: "Loop continues... printf() displays final sum", memory: [{variable: "sum", type: "double", value: "0.500000"}], output: "sin(30) ≈ 0.500000\n" },
                  { line: 16, annotation: "Program terminates", memory: [{variable: "sum", type: "double", value: "0.500000"}], output: "sin(30) ≈ 0.500000\n" }
                ]
              },
              posttest: [
                { question: "What is sin(90°) expected to be?", options: ["0.000000", "0.500000", "1.000000", "3.141593"], answerIndex: 2 },
                { question: "What is sin(0°)?", options: ["1.000000", "0.000000", "-1.000000", "Undefined"], answerIndex: 1 },
                { question: "What happens to accuracy as the number of terms increases?", options: ["Accuracy decreases", "No change", "Accuracy increases toward the true value", "The program crashes"], answerIndex: 2 },
                { question: "In the iterative term update, what is multiplied to get the next term from the current term?", options: ["x / (2n+1)", "-x² / ((2n)(2n+1))", "x² * (2n+1)", "-1 / (2n * x)"], answerIndex: 1 },
                { question: "For x = 180°, what is sin(180°) approximately?", options: ["1.000000", "-1.000000", "0.000000", "3.141593"], answerIndex: 2 }
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
            id: "c-w6-4",
            title: "Palindrome Check",
            desc: "Check if a number is a palindrome.",
            expected: "121 is a Palindrome",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a positive integer from the user and determine whether it is a palindrome by reversing its digits using a while loop. The student will:",
                bullets: [
                  "Declare and use int variables for the number, reversed number, and remainder",
                  "Extract digits one by one using the modulus and division operators",
                  "Build the reversed number digit by digit inside a while loop",
                  "Compare the original and reversed numbers to determine if it is a palindrome",
                  "Use printf() to display the result"
                ]
              },
              theory: [
                {
                  title: "Palindrome Number",
                  body: ["A number is a palindrome if it reads the same forwards and backwards.", "Examples: 121 → 121 (Palindrome), 123 → 321 (Not a Palindrome), 5 → 5 (Palindrome)."]
                },
                {
                  title: "Digit Extraction",
                  body: ["remainder = n % 10 extracts the last digit of n.", "n = n / 10 removes the last digit from n (integer division)."]
                },
                {
                  title: "Building the Reversed Number",
                  body: ["reversed = reversed * 10 + remainder", "Each iteration shifts the existing reversed digits left by one place and appends the newly extracted digit."]
                },
                {
                  title: "Preserving the Original",
                  body: ["Before entering the loop, save the original value: original = n;", "After reversal, compare original == reversed to decide palindrome status. Negative numbers are not palindromes."]
                }
              ],
              pretest: [
                { question: "What does n % 10 return for n = 1234?", options: ["1", "12", "123", "4"], answerIndex: 3 },
                { question: "What does n / 10 (integer division) return for n = 1234?", options: ["123.4", "4", "123", "12"], answerIndex: 2 },
                { question: "Is 121 a palindrome?", options: ["No", "Yes", "Only if entered as a string", "Depends on the number of digits"], answerIndex: 1 },
                { question: "What is the initial value of reversed before the while loop?", options: ["n", "1", "-1", "0"], answerIndex: 3 },
                { question: "Why must the original value of n be saved before the loop?", options: ["Because printf requires it", "Because n is modified (divided by 10) during reversal and must be compared afterward", "Because reversed is also modified", "It does not need to be saved"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the digit extraction loop for n = 121.",
                "Observe how remainder, reversed, and n change at each iteration.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a positive integer — e.g. 121",
                "Click Run Code. Verify output: 121 is a Palindrome",
                "Try 1331, 123, 5, and 10. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int n, original, reversed = 0, remainder;\n    scanf(\"%d\", &n);\n    original = n;\n    while (n > 0) {\n        remainder = n % 10;\n        reversed = reversed * 10 + remainder;\n        n /= 10;\n    }\n    if (original == reversed) printf(\"%d is a Palindrome\\n\", original);\n    else printf(\"%d is not a Palindrome\\n\", original);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "original", type: "int", value: "?"}, {variable: "reversed", type: "int", value: "0"}, {variable: "remainder", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '121'", memory: [{variable: "n", type: "int", value: "121"}], output: "" },
                  { line: 6, annotation: "Save original value", memory: [{variable: "original", type: "int", value: "121"}], output: "" },
                  { line: 7, annotation: "while n > 0 (121 > 0)", memory: [{variable: "n", type: "int", value: "121"}], output: "" },
                  { line: 8, annotation: "remainder = 121 % 10 = 1", memory: [{variable: "remainder", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "reversed = 0 * 10 + 1 = 1", memory: [{variable: "reversed", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "n = 121 / 10 = 12", memory: [{variable: "n", type: "int", value: "12"}], output: "" },
                  { line: 7, annotation: "while n > 0 (12 > 0)", memory: [{variable: "n", type: "int", value: "12"}], output: "" },
                  { line: 8, annotation: "remainder = 12 % 10 = 2", memory: [{variable: "remainder", type: "int", value: "2"}], output: "" },
                  { line: 9, annotation: "reversed = 1 * 10 + 2 = 12", memory: [{variable: "reversed", type: "int", value: "12"}], output: "" },
                  { line: 10, annotation: "n = 12 / 10 = 1", memory: [{variable: "n", type: "int", value: "1"}], output: "" },
                  { line: 7, annotation: "while n > 0 (1 > 0)", memory: [{variable: "n", type: "int", value: "1"}], output: "" },
                  { line: 8, annotation: "remainder = 1 % 10 = 1", memory: [{variable: "remainder", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "reversed = 12 * 10 + 1 = 121", memory: [{variable: "reversed", type: "int", value: "121"}], output: "" },
                  { line: 10, annotation: "n = 1 / 10 = 0", memory: [{variable: "n", type: "int", value: "0"}], output: "" },
                  { line: 7, annotation: "while n > 0 (0 > 0) -> Exit loop", memory: [{variable: "n", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Check if original == reversed (121 == 121)", memory: [{variable: "original", type: "int", value: "121"}, {variable: "reversed", type: "int", value: "121"}], output: "" },
                  { line: 12, annotation: "printf() displays Palindrome", memory: [], output: "121 is a Palindrome\n" },
                  { line: 14, annotation: "Program terminates", memory: [], output: "121 is a Palindrome\n" }
                ]
              },
              posttest: [
                { question: "Is 1001 a palindrome?", options: ["No", "Yes", "Undefined", "Only for even digits"], answerIndex: 1 },
                { question: "What is the reversed number for n = 4567?", options: ["7564", "7654", "4567", "6754"], answerIndex: 1 },
                { question: "For n = 10, what is the reversed number and is it a palindrome?", options: ["reversed = 10, Yes", "reversed = 1, No", "reversed = 01, Yes", "reversed = 10, No"], answerIndex: 1 },
                { question: "How many iterations does the while loop execute for n = 1234?", options: ["3", "5", "2", "4"], answerIndex: 3 },
                { question: "What is the output for n = 7?", options: ["7 is not a Palindrome", "7 is a Palindrome", "0", "Undefined"], answerIndex: 1 }
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
            id: "c-w6-5",
            title: "Number Pyramid",
            desc: "Print a number pyramid pattern.",
            expected: "Pyramid pattern output",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept the number of rows from the user and print a number pyramid pattern using nested for loops. The student will:",
                bullets: [
                  "Declare and use int variables for row count, loop counters, and spacing",
                  "Use an outer for loop to iterate over rows",
                  "Use inner for loops to print leading spaces and numbers for each row",
                  "Understand how nested loop variables interact to produce 2D patterns",
                  "Use printf() with space and number formatting to align output correctly"
                ]
              },
              theory: [
                {
                  title: "Nested Loops",
                  body: ["A loop placed inside another loop is called a nested loop. The outer loop controls the row number and the inner loop(s) control what is printed on each row.", "for (i = 1; i <= n; i++) {\n    for (j = 1; j <= ...; j++) { printf(...); }\n    printf(\"\\n\");\n}"]
                },
                {
                  title: "Number Pyramid Pattern",
                  body: ["Row i contains: (n - i) leading spaces (to centre the pyramid) and numbers 1 through i (with spaces between).", "Example for n=3:\n  1\n 1 2\n1 2 3"]
                },
                {
                  title: "Counting Iterations",
                  body: ["Outer loop: runs n times (i = 1 to n).", "Space loop: runs (n - i) times per row.", "Number loop: runs i times per row."]
                },
                {
                  title: "break vs continue",
                  body: ["break: exits the loop entirely.", "continue: skips only the current iteration, loop continues."]
                }
              ],
              pretest: [
                { question: "How many inner loops are typically needed to print a centred number pyramid?", options: ["One — for numbers only", "Two — one for spaces, one for numbers", "Three — for spaces, numbers, and newlines", "None — printf handles it automatically"], answerIndex: 1 },
                { question: "For n = 5, how many leading spaces are printed on row 3?", options: ["3", "1", "2", "5"], answerIndex: 2 },
                { question: "For n = 5, how many numbers are printed on row 4?", options: ["5", "1", "3", "4"], answerIndex: 3 },
                { question: "What does the continue statement do inside a loop?", options: ["Exits the loop entirely", "Skips the rest of the current iteration and moves to the next", "Restarts the loop from the beginning", "Pauses execution"], answerIndex: 1 },
                { question: "What printf() call moves output to the next line after each row?", options: ["printf(\" \");", "printf(\"\\t\");", "printf(\"\\n\");", "printf(\"\\\\n\");"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the nested loops row by row for n = 4.",
                "Observe how the space count decreases and the number count increases per row.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter the number of rows — e.g. 5",
                "Click Run Code. Verify the pyramid is centred and numbers increase left to right.",
                "Try n = 1, n = 3, and n = 7 to observe how the pyramid scales. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int n, i, j;\n    scanf(\"%d\", &n);\n    for (i = 1; i <= n; i++) {\n        for (j = 1; j <= n - i; j++) {\n            printf(\" \");\n        }\n        for (j = 1; j <= i; j++) {\n            printf(\"%d \", j);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "i", type: "int", value: "?"}, {variable: "j", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '3' for 3 rows", memory: [{variable: "n", type: "int", value: "3"}], output: "" },
                  { line: 6, annotation: "Row i=1", memory: [{variable: "n", type: "int", value: "3"}, {variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 7, annotation: "Print spaces: 3-1 = 2 spaces", memory: [{variable: "j", type: "int", value: "1"}], output: "  " },
                  { line: 10, annotation: "Print numbers up to i=1", memory: [{variable: "j", type: "int", value: "1"}], output: "  1 " },
                  { line: 13, annotation: "Newline", memory: [], output: "  1 \n" },
                  { line: 6, annotation: "Row i=2", memory: [{variable: "n", type: "int", value: "3"}, {variable: "i", type: "int", value: "2"}], output: "  1 \n" },
                  { line: 7, annotation: "Print spaces: 3-2 = 1 space", memory: [{variable: "j", type: "int", value: "1"}], output: "  1 \n " },
                  { line: 10, annotation: "Print numbers up to i=2", memory: [{variable: "j", type: "int", value: "1"}], output: "  1 \n 1 2 " },
                  { line: 13, annotation: "Newline", memory: [], output: "  1 \n 1 2 \n" },
                  { line: 6, annotation: "Row i=3", memory: [{variable: "n", type: "int", value: "3"}, {variable: "i", type: "int", value: "3"}], output: "  1 \n 1 2 \n" },
                  { line: 7, annotation: "Print spaces: 3-3 = 0 spaces", memory: [{variable: "j", type: "int", value: "1"}], output: "  1 \n 1 2 \n" },
                  { line: 10, annotation: "Print numbers up to i=3", memory: [{variable: "j", type: "int", value: "1"}], output: "  1 \n 1 2 \n1 2 3 " },
                  { line: 13, annotation: "Newline", memory: [], output: "  1 \n 1 2 \n1 2 3 \n" },
                  { line: 6, annotation: "Loop finishes (i=4 > 3)", memory: [], output: "  1 \n 1 2 \n1 2 3 \n" },
                  { line: 15, annotation: "Program terminates", memory: [], output: "  1 \n 1 2 \n1 2 3 \n" }
                ]
              },
              posttest: [
                { question: "For n = 5, how many total numbers are printed across all rows?", options: ["10", "25", "5", "15"], answerIndex: 3 },
                { question: "For n = 4, how many leading spaces are on the first row?", options: ["1", "2", "4", "3"], answerIndex: 3 },
                { question: "What change to the number loop would print only odd numbers in each row?", options: ["Replace j++ with j += 2 and start at j = 1", "Replace j++ with j--", "Add break when j is even", "Use j % 2 inside printf"], answerIndex: 0 },
                { question: "What is the total number of iterations of the outer loop for n = 6?", options: ["36", "21", "6", "12"], answerIndex: 2 },
                { question: "Which loop variable directly determines the count of numbers on each row?", options: ["The space loop counter", "The outer loop variable i, which equals the count of numbers on row i", "A fixed constant", "The newline counter"], answerIndex: 1 }
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
        title: "WEEK 7",
        objective: "1D array definition, initialization, linear search",
        tutorial: "Tutorial 7: 1D Arrays",
        labTitle: "Lab 7: Array manipulation",
        experiments: [
          {
            id: "c-w7-1",
            title: "Min and Max of Array",
            desc: "Find minimum and maximum in 1D array.",
            expected: "Min: 1  Max: 9",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept n integers into a 1D array and find the minimum and maximum elements using a single traversal loop. The student will:",
                bullets: [
                  "Declare and initialise a 1D integer array of fixed maximum size",
                  "Accept n elements from the user into the array using a for loop",
                  "Initialise min and max to the first element of the array",
                  "Traverse the array comparing each element to update min and max",
                  "Use printf() to display the minimum and maximum values found"
                ]
              },
              theory: [
                {
                  title: "1D Array",
                  body: ["A one-dimensional array is a contiguous block of memory storing elements of the same data type, accessed via an index starting at 0:", "int arr[100]; declares an array of 100 integers", "arr[0] = 10; assigns 10 to the first element", "arr[n-1] is the last valid element for an array of size n"]
                },
                {
                  title: "Array Initialisation and Input",
                  body: ["for (i = 0; i < n; i++) scanf(\"%d\", &arr[i]);", "Each element is read from standard input using its address &arr[i]."]
                },
                {
                  title: "Finding Min and Max",
                  body: ["Initialise both min and max to the first element arr[0], then iterate from index 1 to n-1, updating as needed:", "min = arr[0]; max = arr[0];\nfor (i = 1; i < n; i++) {\n    if (arr[i] < min) min = arr[i];\n    if (arr[i] > max) max = arr[i];\n}", "This requires exactly one pass through the array — O(n) time complexity."]
                },
                {
                  title: "Why Not Initialise to 0?",
                  body: ["If all elements are negative, initialising min = 0 would incorrectly leave min as 0. Always initialise to arr[0] to handle all input ranges.", "Index Bounds: Valid indices are 0 to n-1. Accessing arr[n] is undefined behaviour."]
                }
              ],
              pretest: [
                { question: "What is the valid index range for an array declared as int arr[10]?", options: ["1 to 10", "0 to 10", "0 to 9", "1 to 9"], answerIndex: 2 },
                { question: "Why should min and max be initialised to arr[0] rather than 0?", options: ["0 causes a compilation error", "Initialising to 0 fails when all elements are negative", "arr[0] is always the minimum", "The loop starts at index 0"], answerIndex: 1 },
                { question: "For array {5, 3, 9, 1, 7}, what is the minimum?", options: ["5", "3", "7", "1"], answerIndex: 3 },
                { question: "For array {5, 3, 9, 1, 7}, what is the maximum?", options: ["7", "5", "9", "3"], answerIndex: 2 },
                { question: "What is the time complexity of finding min and max in a single traversal?", options: ["O(n²)", "O(log n)", "O(1)", "O(n)"], answerIndex: 3 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace how min and max are updated element by element.",
                "Observe that both are initialised to arr[0] and updated only when a new extreme is found.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n followed by n integers — e.g. 5  3 9 1 7 5",
                "Click Run Code. Verify output: Min: 1  Max: 9",
                "Try all-equal arrays like 4 4 4 4 and all-negative arrays like -3 -7 -1 -9. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, min, max;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    min = arr[0];\n    max = arr[0];\n    for (i = 1; i < n; i++) {\n        if (arr[i] < min) min = arr[i];\n        if (arr[i] > max) max = arr[i];\n    }\n    printf(\"Min: %d  Max: %d\\n\", min, max);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "?"}, {variable: "min", type: "int", value: "?"}, {variable: "max", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf reads n=5", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 7, annotation: "Read array elements: 3 9 1 7 5", memory: [{variable: "arr", type: "int[]", value: "{3, 9, 1, 7, 5}"}, {variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 10, annotation: "Initialise min = arr[0]", memory: [{variable: "arr", type: "int[]", value: "{3, 9, 1, 7, 5}"}, {variable: "min", type: "int", value: "3"}], output: "" },
                  { line: 11, annotation: "Initialise max = arr[0]", memory: [{variable: "arr", type: "int[]", value: "{3, 9, 1, 7, 5}"}, {variable: "min", type: "int", value: "3"}, {variable: "max", type: "int", value: "3"}], output: "" },
                  { line: 12, annotation: "Loop i=1 to 4", memory: [{variable: "i", type: "int", value: "1"}, {variable: "min", type: "int", value: "3"}, {variable: "max", type: "int", value: "3"}], output: "" },
                  { line: 13, annotation: "i=1, arr[1]=9, 9<3 false", memory: [{variable: "i", type: "int", value: "1"}, {variable: "min", type: "int", value: "3"}, {variable: "max", type: "int", value: "3"}], output: "" },
                  { line: 14, annotation: "i=1, 9>3 true -> max = 9", memory: [{variable: "i", type: "int", value: "1"}, {variable: "min", type: "int", value: "3"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 13, annotation: "i=2, arr[2]=1, 1<3 true -> min = 1", memory: [{variable: "i", type: "int", value: "2"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 14, annotation: "i=2, 1>9 false", memory: [{variable: "i", type: "int", value: "2"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 13, annotation: "i=3, arr[3]=7, 7<1 false", memory: [{variable: "i", type: "int", value: "3"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 14, annotation: "i=3, 7>9 false", memory: [{variable: "i", type: "int", value: "3"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 13, annotation: "i=4, arr[4]=5, 5<1 false", memory: [{variable: "i", type: "int", value: "4"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 14, annotation: "i=4, 5>9 false", memory: [{variable: "i", type: "int", value: "4"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 16, annotation: "printf output", memory: [{variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "Min: 1  Max: 9\n" },
                  { line: 18, annotation: "Program terminates", memory: [], output: "Min: 1  Max: 9\n" }
                ]
              },
              posttest: [
                { question: "For array {-4, -1, -8, -2}, what is the minimum?", options: ["-1", "-2", "-4", "-8"], answerIndex: 3 },
                { question: "For array {-4, -1, -8, -2}, what is the maximum?", options: ["-8", "-4", "-2", "-1"], answerIndex: 3 },
                { question: "For array {7, 7, 7, 7}, what are min and max?", options: ["min = 0, max = 7", "min = 7, max = 7", "min = 7, max = 0", "Undefined"], answerIndex: 1 },
                { question: "What is the result of accessing arr[n] for an array of size n?", options: ["Returns 0", "Returns the last valid element", "Undefined behaviour", "Compilation error"], answerIndex: 2 },
                { question: "How many comparisons are made in total to find both min and max for an array of 10 elements using the single-pass method?", options: ["10", "20", "18", "9"], answerIndex: 2 }
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
            id: "c-w7-2",
            title: "Linear Search",
            desc: "Search for an element in a 1D array.",
            expected: "Element found / Not found",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept n integers into a 1D array and search for a target element using the linear search algorithm. The student will:",
                bullets: [
                  "Declare and use a 1D integer array to store input elements",
                  "Accept a target value from the user to search for",
                  "Implement linear search by traversing the array from index 0 to n-1",
                  "Use a flag variable or break to record the first occurrence index",
                  "Display whether the element was found and at which index (1-based or 0-based)",
                  "Analyse the best-case, worst-case, and average-case complexity of linear search"
                ]
              },
              theory: [
                {
                  title: "Linear Search Algorithm",
                  body: ["Sequentially checks each element of the array from the first to the last until the target is found or the array is exhausted.", "for (i = 0; i < n; i++) { if (arr[i] == key) { found = 1; pos = i; break; } }"]
                },
                {
                  title: "Complexity Analysis",
                  body: ["Best Case: Target is the first element: O(1) — one comparison.", "Worst Case: Target is the last element or not present: O(n) — n comparisons.", "Average Case: Target is somewhere in the middle on average: O(n/2) = O(n)."]
                },
                {
                  title: "Flag and Position Variables",
                  body: ["found = 0; initialised to 'not found' before the loop.", "pos = -1; -1 conventionally means 'not found' for an index.", "After the loop, if found == 1, pos holds the index of the first occurrence."]
                },
                {
                  title: "break Statement and Array State",
                  body: ["Exits the loop immediately when the target is found, avoiding unnecessary further comparisons.", "Linear search works on both sorted and unsorted arrays, unlike binary search (which requires a sorted array)."]
                }
              ],
              pretest: [
                { question: "What is the worst-case time complexity of linear search?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answerIndex: 2 },
                { question: "What is the best-case scenario for linear search?", options: ["Target is at the last index", "Array is sorted", "Target is at the first index — one comparison", "Array has no duplicates"], answerIndex: 2 },
                { question: "What value is pos conventionally set to before searching, to indicate \"not found\"?", options: ["0", "n", "-1", "999"], answerIndex: 2 },
                { question: "What does break do when the target is found inside the search loop?", options: ["Skips the current element", "Exits the loop immediately to avoid further comparisons", "Restarts the search from index 0", "Sets found = 0"], answerIndex: 1 },
                { question: "Does linear search require the array to be sorted?", options: ["Yes, always", "Only for even-sized arrays", "No — it works on unsorted arrays", "Only for integer arrays"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the search for a target in a sample array.",
                "Observe how the loop advances index by index and stops at the first match.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n, then n integers, then the key — e.g. 5  10 30 20 50 40  20",
                "Click Run Code. Verify output: Element 20 found at index 2 (0-based)",
                "Try a key that is not in the array and a key that appears multiple times. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, key, found = 0, pos = -1;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    scanf(\"%d\", &key);\n    for (i = 0; i < n; i++) {\n        if (arr[i] == key) {\n            found = 1;\n            pos = i;\n            break;\n        }\n    }\n    if (found) printf(\"Element %d found at index %d (0-based)\\n\", key, pos);\n    else printf(\"Element not found\\n\");\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "?"}, {variable: "key", type: "int", value: "?"}, {variable: "found", type: "int", value: "0"}, {variable: "pos", type: "int", value: "-1"}], output: "" },
                  { line: 6, annotation: "scanf reads n=5", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 7, annotation: "Read array elements: 10 30 20 50 40", memory: [{variable: "arr", type: "int[]", value: "{10, 30, 20, 50, 40}"}], output: "" },
                  { line: 10, annotation: "scanf reads key=20", memory: [{variable: "arr", type: "int[]", value: "{10, 30, 20, 50, 40}"}, {variable: "key", type: "int", value: "20"}], output: "" },
                  { line: 11, annotation: "Loop i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "i=0, arr[0]=10, 10==20 false", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "Loop i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 12, annotation: "i=1, arr[1]=30, 30==20 false", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 11, annotation: "Loop i=2", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 12, annotation: "i=2, arr[2]=20, 20==20 true", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 13, annotation: "found = 1", memory: [{variable: "found", type: "int", value: "1"}], output: "" },
                  { line: 14, annotation: "pos = 2", memory: [{variable: "pos", type: "int", value: "2"}], output: "" },
                  { line: 15, annotation: "break exits loop", memory: [], output: "" },
                  { line: 18, annotation: "if(found) is true, printf output", memory: [], output: "Element 20 found at index 2 (0-based)\n" },
                  { line: 21, annotation: "Program terminates", memory: [], output: "Element 20 found at index 2 (0-based)\n" }
                ]
              },
              posttest: [
                { question: "For array {10, 30, 20, 50, 40} and key = 50, at which 0-based index is it found?", options: ["3", "4", "2", "1"], answerIndex: 0 },
                { question: "For array {10, 30, 20, 50, 40} and key = 99, what is the output?", options: ["Found at index 0", "Found at index -1", "Element not found", "Compilation error"], answerIndex: 2 },
                { question: "How many comparisons are made for key = 10 in array {10, 30, 20, 50, 40}?", options: ["5", "3", "2", "1"], answerIndex: 3 },
                { question: "How many comparisons are made for key = 99 in array {10, 30, 20, 50, 40}?", options: ["1", "3", "5", "0"], answerIndex: 2 },
                { question: "What modification allows linear search to find and print ALL occurrences of a key rather than just the first?", options: ["Replace == with !=", "Remove break so the loop continues after a match", "Sort the array first", "Use a while loop instead of for"], answerIndex: 1 }
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
            id: "c-w7-3",
            title: "Reverse Array",
            desc: "Reverse the elements of a 1D array.",
            expected: "Reversed array",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept n integers into a 1D array and reverse the array in-place using a two-pointer swapping technique. The student will:",
                bullets: [
                  "Declare and use a 1D integer array and a temporary swap variable",
                  "Accept n elements from the user into the array",
                  "Implement in-place reversal by swapping arr[left] and arr[right] while advancing left forward and right backward until they meet",
                  "Print both the original and reversed array using a for loop",
                  "Understand the difference between in-place reversal and copying to a second array"
                ]
              },
              theory: [
                {
                  title: "Array Reversal",
                  body: ["Reversing an array means placing its elements in the opposite order: Original : {1, 2, 3, 4, 5} -> Reversed : {5, 4, 3, 2, 1}"]
                },
                {
                  title: "Two-Pointer In-Place Technique",
                  body: ["Use two index variables, left starting at 0 and right starting at n-1. Swap the elements at these positions, then move left forward and right backward.", "Repeat until left >= right:\nwhile (left < right) {\n    temp = arr[left];\n    arr[left] = arr[right];\n    arr[right] = temp;\n    left++; right--;\n}"]
                },
                {
                  title: "Number of Swaps and Temporary Variable",
                  body: ["For n elements, exactly floor(n/2) swaps are performed. n = 5 : 2 swaps.", "A temp variable is required for swapping to avoid overwriting a value before it can be saved."]
                },
                {
                  title: "In-Place vs Second Array",
                  body: ["In-place reversal uses O(1) extra space (only temp). Copying to a second array uses O(n) extra space — wasteful for large arrays.", "Time Complexity: O(n): each element is moved at most once."]
                }
              ],
              pretest: [
                { question: "For array {1, 2, 3, 4, 5}, what is the reversed array?", options: ["{5, 4, 3, 2, 1}", "{1, 2, 3, 4, 5}", "{2, 4, 1, 3, 5}", "{5, 3, 1, 4, 2}"], answerIndex: 0 },
                { question: "How many swaps are needed to reverse an array of 7 elements?", options: ["7", "4", "6", "3"], answerIndex: 3 },
                { question: "What is the purpose of the temp variable during a swap?", options: ["To count the number of swaps", "To temporarily hold one value so it is not overwritten", "To store the reversed array", "To compare two elements"], answerIndex: 1 },
                { question: "What are the initial values of left and right for an array of size n?", options: ["left = 1, right = n", "left = 0, right = n", "left = 0, right = n - 1", "left = 1, right = n - 1"], answerIndex: 2 },
                { question: "What is the space complexity of the in-place two-pointer reversal?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answerIndex: 3 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the swap steps for array {1, 2, 3, 4, 5}.",
                "Observe how left and right converge toward the centre with each swap.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 5  1 2 3 4 5",
                "Click Run Code. Verify output: Reversed: 5 4 3 2 1",
                "Try even-sized arrays, single-element arrays, and already-reversed arrays. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, left, right, temp;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    left = 0;\n    right = n - 1;\n    while (left < right) {\n        temp = arr[left];\n        arr[left] = arr[right];\n        arr[right] = temp;\n        left++;\n        right--;\n    }\n    printf(\"Reversed: \");\n    for (i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf reads n=5", memory: [{variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 7, annotation: "Read array elements: 1 2 3 4 5", memory: [{variable: "arr", type: "int[]", value: "{1, 2, 3, 4, 5}"}], output: "" },
                  { line: 10, annotation: "left = 0", memory: [{variable: "left", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "right = 4", memory: [{variable: "right", type: "int", value: "4"}], output: "" },
                  { line: 12, annotation: "while left < right (0 < 4)", memory: [], output: "" },
                  { line: 13, annotation: "Swap arr[0] and arr[4]", memory: [{variable: "temp", type: "int", value: "1"}], output: "" },
                  { line: 14, annotation: "arr[0] = 5", memory: [{variable: "arr", type: "int[]", value: "{5, 2, 3, 4, 5}"}], output: "" },
                  { line: 15, annotation: "arr[4] = 1", memory: [{variable: "arr", type: "int[]", value: "{5, 2, 3, 4, 1}"}], output: "" },
                  { line: 16, annotation: "left++", memory: [{variable: "left", type: "int", value: "1"}], output: "" },
                  { line: 17, annotation: "right--", memory: [{variable: "right", type: "int", value: "3"}], output: "" },
                  { line: 12, annotation: "while left < right (1 < 3)", memory: [], output: "" },
                  { line: 13, annotation: "Swap arr[1] and arr[3]", memory: [{variable: "temp", type: "int", value: "2"}], output: "" },
                  { line: 14, annotation: "arr[1] = 4", memory: [{variable: "arr", type: "int[]", value: "{5, 4, 3, 4, 1}"}], output: "" },
                  { line: 15, annotation: "arr[3] = 2", memory: [{variable: "arr", type: "int[]", value: "{5, 4, 3, 2, 1}"}], output: "" },
                  { line: 16, annotation: "left++", memory: [{variable: "left", type: "int", value: "2"}], output: "" },
                  { line: 17, annotation: "right--", memory: [{variable: "right", type: "int", value: "2"}], output: "" },
                  { line: 12, annotation: "while left < right (2 < 2) false -> Exit loop", memory: [], output: "" },
                  { line: 19, annotation: "Print reversed array", memory: [], output: "Reversed: 5 4 3 2 1 \n" },
                  { line: 24, annotation: "Program terminates", memory: [], output: "Reversed: 5 4 3 2 1 \n" }
                ]
              },
              posttest: [
                { question: "For array {10, 20, 30, 40}, what is the reversed array?", options: ["{10, 30, 20, 40}", "{40, 20, 30, 10}", "{40, 30, 20, 10}", "{20, 10, 40, 30}"], answerIndex: 2 },
                { question: "For array {7}, what is the reversed array?", options: ["{}", "{0}", "{7}", "Undefined"], answerIndex: 2 },
                { question: "After how many swaps does the while loop terminate for n = 6?", options: ["6", "2", "4", "3"], answerIndex: 3 },
                { question: "At the start of swap 2 for array {1, 2, 3, 4, 5}, what are left and right?", options: ["left = 0, right = 4", "left = 2, right = 3", "left = 1, right = 3", "left = 2, right = 2"], answerIndex: 2 },
                { question: "What is the result of reversing an already-reversed array {5, 4, 3, 2, 1}?", options: ["{5, 4, 3, 2, 1}", "{1, 1, 1, 1, 1}", "{1, 2, 3, 4, 5}", "Undefined"], answerIndex: 2 }
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
            id: "c-w7-4",
            title: "Remove Duplicates",
            desc: "Remove duplicate elements from an array.",
            expected: "Unique: 1 3 2 5  New size: 4",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept n integers into a 1D array and remove all duplicate elements, retaining only the first occurrence of each value, then display the resulting array and its new size. The student will:",
                bullets: [
                  "Declare and use 1D integer arrays for input and output",
                  "Use nested loops to compare each element against all previously accepted elements",
                  "Use a flag variable to decide whether to include the current element",
                  "Build a result array containing only unique elements",
                  "Print the deduplicated array and its size using printf()"
                ]
              },
              theory: [
                {
                  title: "Duplicate Element",
                  body: ["An element is a duplicate if the same value has already appeared at an earlier index in the array."]
                },
                {
                  title: "Nested Loop Approach",
                  body: ["For each element arr[i], check whether it has already appeared in arr[0..i-1]. If not, include it in the result.", "j = 0;\nfor (i = 0; i < n; i++) {\n    isDuplicate = 0;\n    for (k = 0; k < i; k++) { if (arr[k] == arr[i]) { isDuplicate = 1; break; } }\n    if (!isDuplicate) result[j++] = arr[i];\n}"]
                },
                {
                  title: "Flag Variable and Result Size",
                  body: ["isDuplicate is initialised to 0 before the inner loop. If any earlier element matches arr[i], isDuplicate is set to 1 and the inner loop breaks early. Only elements with isDuplicate == 0 are copied to result.", "j counts the number of unique elements added. After the loop, j holds the new size of the deduplicated array."]
                },
                {
                  title: "Complexity",
                  body: ["Time Complexity: O(n²): for each of the n elements, up to n-1 earlier elements are checked.", "Space Complexity: O(n): the result array uses at most n slots."]
                }
              ],
              pretest: [
                { question: "For array {1, 3, 2, 3, 1, 5}, what is the deduplicated array?", options: ["{1, 2, 3, 5}", "{1, 3, 2, 5}", "{3, 1, 5, 2}", "{5, 3, 2, 1}"], answerIndex: 1 },
                { question: "What does the flag isDuplicate = 1 signal?", options: ["The element should be kept", "The element has already appeared earlier in the array", "The element is negative", "The inner loop should restart"], answerIndex: 1 },
                { question: "For array {5, 5, 5, 5}, what is the deduplicated array and new size?", options: ["{5, 5}, size 2", "{}, size 0", "{5}, size 1", "{5, 5, 5, 5}, size 4"], answerIndex: 2 },
                { question: "What is the time complexity of the nested loop duplicate removal?", options: ["O(1)", "O(n log n)", "O(n²)", "O(n)"], answerIndex: 2 },
                { question: "Which occurrence of a duplicate value is retained in this algorithm?", options: ["The last occurrence", "The middle occurrence", "A random occurrence", "The first occurrence"], answerIndex: 3 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the nested loop for array {1, 3, 2, 3, 1, 5}.",
                "Observe how each element is checked against all previous elements before being added.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 6  1 3 2 3 1 5",
                "Click Run Code. Verify output: Unique: 1 3 2 5  New size: 4",
                "Try all-unique arrays, all-duplicate arrays, and single-element arrays. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int arr[100], result[100];\n    int n, i, k, j = 0, isDuplicate;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    for (i = 0; i < n; i++) {\n        isDuplicate = 0;\n        for (k = 0; k < i; k++) {\n            if (arr[k] == arr[i]) {\n                isDuplicate = 1;\n                break;\n            }\n        }\n        if (!isDuplicate) {\n            result[j++] = arr[i];\n        }\n    }\n    printf(\"Unique: \");\n    for (i = 0; i < j; i++) {\n        printf(\"%d \", result[i]);\n    }\n    printf(\" New size: %d\\n\", j);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "j", type: "int", value: "0"}, {variable: "n", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf reads n=6", memory: [{variable: "n", type: "int", value: "6"}], output: "" },
                  { line: 7, annotation: "Read array elements: 1 3 2 3 1 5", memory: [{variable: "arr", type: "int[]", value: "{1, 3, 2, 3, 1, 5}"}], output: "" },
                  { line: 10, annotation: "Loop i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop k=0 < 0 (false)", memory: [], output: "" },
                  { line: 18, annotation: "Add arr[0] to result", memory: [{variable: "result", type: "int[]", value: "{1, ...}"}, {variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "Loop i=1 (val 3)", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop k=0 (arr[0]=1 != 3)", memory: [], output: "" },
                  { line: 18, annotation: "Add arr[1] to result", memory: [{variable: "result", type: "int[]", value: "{1, 3, ...}"}, {variable: "j", type: "int", value: "2"}], output: "" },
                  { line: 10, annotation: "Loop i=2 (val 2)", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop k=0,1 (no match)", memory: [], output: "" },
                  { line: 18, annotation: "Add arr[2] to result", memory: [{variable: "result", type: "int[]", value: "{1, 3, 2, ...}"}, {variable: "j", type: "int", value: "3"}], output: "" },
                  { line: 10, annotation: "Loop i=3 (val 3)", memory: [{variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop matches at k=1 (arr[1]=3)", memory: [], output: "" },
                  { line: 14, annotation: "isDuplicate = 1, break", memory: [{variable: "isDuplicate", type: "int", value: "1"}], output: "" },
                  { line: 17, annotation: "Skip adding to result", memory: [], output: "" },
                  { line: 10, annotation: "Loop i=4 (val 1)", memory: [{variable: "i", type: "int", value: "4"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop matches at k=0 (arr[0]=1)", memory: [], output: "" },
                  { line: 14, annotation: "isDuplicate = 1, break", memory: [{variable: "isDuplicate", type: "int", value: "1"}], output: "" },
                  { line: 17, annotation: "Skip adding to result", memory: [], output: "" },
                  { line: 10, annotation: "Loop i=5 (val 5)", memory: [{variable: "i", type: "int", value: "5"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop k=0..4 (no match)", memory: [], output: "" },
                  { line: 18, annotation: "Add arr[5] to result", memory: [{variable: "result", type: "int[]", value: "{1, 3, 2, 5, ...}"}, {variable: "j", type: "int", value: "4"}], output: "" },
                  { line: 22, annotation: "Print result", memory: [], output: "Unique: 1 3 2 5  New size: 4\n" },
                  { line: 28, annotation: "Program terminates", memory: [], output: "Unique: 1 3 2 5  New size: 4\n" }
                ]
              },
              posttest: [
                { question: "For array {4, 4, 4, 4, 4}, what is the output?", options: ["Unique: 4 4  New size: 2", "Unique: 4  New size: 1", "Unique:    New size: 0", "Unique: 4 4 4 4 4  New size: 5"], answerIndex: 1 },
                { question: "For array {1, 2, 3, 4, 5}, what is the output?", options: ["Unique: 1 2 3  New size: 3", "Unique: 5 4 3 2 1  New size: 5", "Unique: 1 2 3 4 5  New size: 5", "Unique: 1 3 5  New size: 3"], answerIndex: 2 },
                { question: "For array {7, 3, 7, 3, 7}, what is the deduplicated array?", options: ["{3, 7}", "{7}", "{7, 3}", "{3}"], answerIndex: 2 },
                { question: "At which step does the inner loop first break early for array {1, 3, 2, 3, 1, 5}?", options: ["i = 1 (checking 3)", "i = 2 (checking 2)", "i = 3 (checking second 3)", "i = 5 (checking 5)"], answerIndex: 2 },
                { question: "What modification would make the algorithm retain the LAST occurrence instead of the first?", options: ["Sort the array before processing", "Traverse the array from right to left (i from n-1 to 0)", "Use >= instead of ==", "Remove the break inside the inner loop"], answerIndex: 1 }
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
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept two matrices of the same dimensions from the user, compute their sum element-wise, and display the result matrix. The student will:",
                bullets: [
                  "Declare and initialise 2D integer arrays for two input matrices and one result matrix",
                  "Accept matrix dimensions (rows and columns) from the user",
                  "Use nested for loops to read elements into both matrices",
                  "Compute the sum matrix by adding corresponding elements",
                  "Use nested for loops with printf() to display the result in matrix format"
                ]
              },
              theory: [
                {
                  title: "2D Array Declaration",
                  body: ["A two-dimensional array in C is declared as: int A[10][10];", "It stores elements in row-major order. Element at row i, column j is accessed as A[i][j]. Row indices run from 0 to rows-1; column indices from 0 to cols-1."]
                },
                {
                  title: "Matrix Addition",
                  body: ["Two matrices A and B of the same dimensions (m × n) can be added. The result matrix C is computed element-wise: C[i][j] = A[i][j] + B[i][j]", "Matrices of different dimensions cannot be added."]
                },
                {
                  title: "Nested Loop Structure",
                  body: ["Two nested loops traverse all elements:\nfor (i = 0; i < rows; i++) {\n    for (j = 0; j < cols; j++) {\n        C[i][j] = A[i][j] + B[i][j];\n    }\n}", "The outer loop iterates over rows; the inner loop iterates over columns."]
                },
                {
                  title: "Printing a Matrix",
                  body: ["Use nested loops and \\n after each row. %4d right-aligns numbers in a 4-character wide field for neat output.", "Time Complexity: O(m × n). Space Complexity: O(m × n)."]
                }
              ],
              pretest: [
                { question: "How is element at row 2, column 3 of a 2D array A accessed in C?", options: ["A[3][2]", "A[2, 3]", "A[2][3]", "A(2)(3)"], answerIndex: 2 },
                { question: "What is the condition for two matrices to be added?", options: ["They must be square", "They must have the same number of rows only", "They must have identical dimensions (same rows and columns)", "They must contain only positive integers"], answerIndex: 2 },
                { question: "For A = {{1,2},{3,4}} and B = {{5,6},{7,8}}, what is C[1][0]?", options: ["8", "12", "10", "6"], answerIndex: 2 },
                { question: "In what order does C store elements of a 2D array in memory?", options: ["Column-major order", "Diagonal order", "Random order", "Row-major order"], answerIndex: 3 },
                { question: "What is the time complexity of adding two m × n matrices?", options: ["O(m + n)", "O(m²)", "O(m × n)", "O(n²)"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace element-wise addition for two 2×2 matrices.",
                "Observe how C[i][j] = A[i][j] + B[i][j] is computed for each position.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter rows, cols, then matrix A row by row, then matrix B row by row (e.g. 2 2  1 2 3 4  5 6 7 8).",
                "Click Run Code. Verify result matrix.",
                "Try non-square matrices (2×3) and matrices containing negative values. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int A[10][10], B[10][10], C[10][10];\n    int rows, cols, i, j;\n    scanf(\"%d %d\", &rows, &cols);\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            scanf(\"%d\", &A[i][j]);\n        }\n    }\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            scanf(\"%d\", &B[i][j]);\n        }\n    }\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            C[i][j] = A[i][j] + B[i][j];\n        }\n    }\n    printf(\"Result:\\n\");\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            printf(\"%4d\", C[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate matrix variables A, B, C", memory: [{variable: "rows", type: "int", value: "?"}, {variable: "cols", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf reads dimensions (e.g., 2 2)", memory: [{variable: "rows", type: "int", value: "2"}, {variable: "cols", type: "int", value: "2"}], output: "" },
                  { line: 9, annotation: "Read Matrix A elements (1 2 3 4)", memory: [{variable: "A", type: "int[][]", value: "{{1, 2}, {3, 4}}"}], output: "" },
                  { line: 14, annotation: "Read Matrix B elements (5 6 7 8)", memory: [{variable: "B", type: "int[][]", value: "{{5, 6}, {7, 8}}"}], output: "" },
                  { line: 17, annotation: "Start Addition outer loop i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 18, annotation: "Inner loop j=0", memory: [{variable: "i", type: "int", value: "0"}, {variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "C[0][0] = A[0][0] + B[0][0] = 1 + 5 = 6", memory: [{variable: "C[0][0]", type: "int", value: "6"}], output: "" },
                  { line: 18, annotation: "Inner loop j=1", memory: [{variable: "i", type: "int", value: "0"}, {variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 19, annotation: "C[0][1] = A[0][1] + B[0][1] = 2 + 6 = 8", memory: [{variable: "C[0][1]", type: "int", value: "8"}], output: "" },
                  { line: 17, annotation: "Outer loop i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 18, annotation: "Inner loop j=0", memory: [{variable: "i", type: "int", value: "1"}, {variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "C[1][0] = A[1][0] + B[1][0] = 3 + 7 = 10", memory: [{variable: "C[1][0]", type: "int", value: "10"}], output: "" },
                  { line: 18, annotation: "Inner loop j=1", memory: [{variable: "i", type: "int", value: "1"}, {variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 19, annotation: "C[1][1] = A[1][1] + B[1][1] = 4 + 8 = 12", memory: [{variable: "C[1][1]", type: "int", value: "12"}], output: "" },
                  { line: 22, annotation: "Start printing", memory: [], output: "Result:\n" },
                  { line: 25, annotation: "Print row 0", memory: [], output: "Result:\n   6   8" },
                  { line: 27, annotation: "Newline after row 0", memory: [], output: "Result:\n   6   8\n" },
                  { line: 25, annotation: "Print row 1", memory: [], output: "Result:\n   6   8\n  10  12" },
                  { line: 27, annotation: "Newline after row 1", memory: [], output: "Result:\n   6   8\n  10  12\n" },
                  { line: 29, annotation: "Program terminates", memory: [], output: "Result:\n   6   8\n  10  12\n" }
                ]
              },
              posttest: [
                { question: "For A = {{1,0},{0,1}} and B = {{4,5},{6,7}}, what is C?", options: ["{{5,5},{6,8}}", "{{4,0},{0,7}}", "{{5,6},{7,8}}", "{{5,5},{6,8}}"], answerIndex: 0 },
                { question: "Can you add a 2×3 matrix to a 3×2 matrix?", options: ["Yes, element-wise", "Yes, after transposing one", "No — dimensions do not match", "Yes, by padding with zeros"], answerIndex: 2 },
                { question: "What does %4d do in printf when printing a matrix?", options: ["Prints only 4-digit numbers", "Prints the number right-aligned in a 4-character wide field", "Limits the number to 4 bits", "Adds 4 to the number before printing"], answerIndex: 1 },
                { question: "For a 3×3 matrix, how many iterations does the nested loop execute in total?", options: ["6", "3", "27", "9"], answerIndex: 3 },
                { question: "What is the result of adding a matrix A to a zero matrix of the same size?", options: ["A zero matrix", "A doubled", "A itself", "Undefined"], answerIndex: 2 }
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
            id: "c-w8-2",
            title: "Matrix Multiplication",
            desc: "Multiply two matrices.",
            expected: "Product matrix",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept two matrices from the user and compute their product using three nested loops. The student will:",
                bullets: [
                  "Declare and initialise 2D integer arrays for two input matrices and the result matrix",
                  "Validate that the number of columns of A equals the number of rows of B",
                  "Implement the three-loop matrix multiplication algorithm",
                  "Initialise each C[i][j] to 0 before accumulating the dot product",
                  "Display the result matrix using nested loops and printf()"
                ]
              },
              theory: [
                {
                  title: "Matrix Multiplication Condition",
                  body: ["A matrix A of size m × p can be multiplied by a matrix B of size p × n only if the number of columns of A equals the number of rows of B (both equal p). The result C is of size m × n."]
                },
                {
                  title: "Formula",
                  body: ["Each element C[i][j] is the dot product of row i of A and column j of B:", "C[i][j] = Σ A[i][k] * B[k][j]   for k = 0 to p-1"]
                },
                {
                  title: "Three-Loop Algorithm",
                  body: ["for (i = 0; i < m; i++)\n    for (j = 0; j < n; j++) {\n        C[i][j] = 0;\n        for (k = 0; k < p; k++)\n            C[i][j] += A[i][k] * B[k][j];\n    }"]
                },
                {
                  title: "Initialisation of C",
                  body: ["Each C[i][j] must be set to 0 before the innermost loop adds to it. Failing to initialise causes garbage values to corrupt the result.", "Time Complexity: O(m × p × n). Space Complexity: O(m × n)."]
                }
              ],
              pretest: [
                { question: "What is the required condition for multiplying matrix A (m×p) by matrix B (r×n)?", options: ["m == n", "p == r", "m == r", "p == n"], answerIndex: 1 },
                { question: "For A of size 2×3 and B of size 3×4, what is the size of C = A × B?", options: ["3×3", "2×4", "4×2", "3×2"], answerIndex: 1 },
                { question: "Why must C[i][j] be initialised to 0 before the innermost loop?", options: ["To avoid a compilation warning", "To ensure accumulation starts from zero, not from garbage memory", "Because += only works when the variable is 0", "It does not need to be initialised"], answerIndex: 1 },
                { question: "What is the time complexity of multiplying two n × n matrices using the standard three-loop algorithm?", options: ["O(n)", "O(n²)", "O(n³)", "O(2ⁿ)"], answerIndex: 2 },
                { question: "For A = {{1,2},{3,4}} and B = {{5,6},{7,8}}, what is C[0][0]?", options: ["12", "17", "19", "22"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the dot product computation for C[0][0] and C[0][1].",
                "Observe how the k loop accumulates A[i][k] * B[k][j] into C[i][j].",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "Enter m, p, n, then matrix A (m×p), then matrix B (p×n).",
                "Click Run Code. Verify result: C = {{19,22},{43,50}}",
                "Try a 2×3 multiplied by 3×2 and attempt an invalid multiplication to test the check. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int A[10][10], B[10][10], C[10][10];\n    int m, p, n, i, j, k;\n    scanf(\"%d %d %d\", &m, &p, &n);\n    for (i = 0; i < m; i++) {\n        for (j = 0; j < p; j++) {\n            scanf(\"%d\", &A[i][j]);\n        }\n    }\n    for (i = 0; i < p; i++) {\n        for (j = 0; j < n; j++) {\n            scanf(\"%d\", &B[i][j]);\n        }\n    }\n    for (i = 0; i < m; i++) {\n        for (j = 0; j < n; j++) {\n            C[i][j] = 0;\n            for (k = 0; k < p; k++) {\n                C[i][j] += A[i][k] * B[k][j];\n            }\n        }\n    }\n    printf(\"Result:\\n\");\n    for (i = 0; i < m; i++) {\n        for (j = 0; j < n; j++) {\n            printf(\"%4d\", C[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate matrices and variables", memory: [{variable: "m", type: "int", value: "?"}, {variable: "p", type: "int", value: "?"}, {variable: "n", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf reads dimensions (2 2 2)", memory: [{variable: "m", type: "int", value: "2"}, {variable: "p", type: "int", value: "2"}, {variable: "n", type: "int", value: "2"}], output: "" },
                  { line: 9, annotation: "Read Matrix A (1 2 3 4)", memory: [{variable: "A", type: "int[][]", value: "{{1, 2}, {3, 4}}"}], output: "" },
                  { line: 14, annotation: "Read Matrix B (5 6 7 8)", memory: [{variable: "B", type: "int[][]", value: "{{5, 6}, {7, 8}}"}], output: "" },
                  { line: 17, annotation: "Outer loop i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 18, annotation: "Mid loop j=0", memory: [{variable: "i", type: "int", value: "0"}, {variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "C[0][0] = 0", memory: [{variable: "C[0][0]", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "Inner loop k=0, k=1", memory: [{variable: "C[0][0]", type: "int", value: "19"}], output: "" },
                  { line: 18, annotation: "Mid loop j=1", memory: [{variable: "i", type: "int", value: "0"}, {variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 19, annotation: "C[0][1] = 0", memory: [{variable: "C[0][1]", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "Inner loop k=0, k=1", memory: [{variable: "C[0][1]", type: "int", value: "22"}], output: "" },
                  { line: 17, annotation: "Outer loop i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 18, annotation: "Mid loop j=0", memory: [{variable: "i", type: "int", value: "1"}, {variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "C[1][0] = 0", memory: [{variable: "C[1][0]", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "Inner loop k=0, k=1", memory: [{variable: "C[1][0]", type: "int", value: "43"}], output: "" },
                  { line: 18, annotation: "Mid loop j=1", memory: [{variable: "i", type: "int", value: "1"}, {variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 19, annotation: "C[1][1] = 0", memory: [{variable: "C[1][1]", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "Inner loop k=0, k=1", memory: [{variable: "C[1][1]", type: "int", value: "50"}], output: "" },
                  { line: 25, annotation: "Print Result", memory: [], output: "Result:\n" },
                  { line: 28, annotation: "Print row 0", memory: [], output: "Result:\n  19  22" },
                  { line: 30, annotation: "Newline after row 0", memory: [], output: "Result:\n  19  22\n" },
                  { line: 28, annotation: "Print row 1", memory: [], output: "Result:\n  19  22\n  43  50" },
                  { line: 30, annotation: "Newline after row 1", memory: [], output: "Result:\n  19  22\n  43  50\n" },
                  { line: 32, annotation: "Program terminates", memory: [], output: "Result:\n  19  22\n  43  50\n" }
                ]
              },
              posttest: [
                { question: "For A = {{1,2},{3,4}} and B = {{5,6},{7,8}}, what is C[1][1]?", options: ["44", "46", "48", "50"], answerIndex: 3 },
                { question: "What is the result of multiplying any matrix A by the identity matrix I of compatible size?", options: ["A zero matrix", "The transpose of A", "A itself", "Undefined"], answerIndex: 2 },
                { question: "Is matrix multiplication commutative? (Does A×B always equal B×A?)", options: ["Yes always", "No — in general A×B ≠ B×A", "Yes for square matrices only", "Yes if all elements are positive"], answerIndex: 1 },
                { question: "For A of size 3×2 and B of size 2×4, how many multiplications does the innermost loop perform in total?", options: ["8", "24", "12", "6"], answerIndex: 1 },
                { question: "What is the size of the result when a 1×n matrix is multiplied by an n×1 matrix?", options: ["n×n", "1×n", "n×1", "1×1"], answerIndex: 3 }
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
            id: "c-w8-3",
            title: "Bubble Sort",
            desc: "Sort an array using bubble sort.",
            expected: "Sorted array",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept n integers into a 1D array and sort them in ascending order using the Bubble Sort algorithm. The student will:",
                bullets: [
                  "Declare and use a 1D integer array and a temporary swap variable",
                  "Implement the standard two-loop Bubble Sort",
                  "Apply an early-termination optimisation using a swapped flag",
                  "Print the array before and after sorting using a for loop",
                  "Analyse best-case, worst-case, and average-case time complexity of Bubble Sort"
                ]
              },
              theory: [
                {
                  title: "Bubble Sort Algorithm",
                  body: ["Repeatedly steps through the array comparing adjacent elements and swapping them if they are in the wrong order. Larger elements \"bubble\" toward the end with each pass."]
                },
                {
                  title: "Standard Two-Loop Implementation",
                  body: ["for (i = 0; i < n-1; i++) {\n    for (j = 0; j < n-1-i; j++) {\n        if (arr[j] > arr[j+1]) {\n            temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;\n        }\n    }\n}", "After pass i, the largest i+1 elements are in their final positions at the end."]
                },
                {
                  title: "Early Termination Optimisation",
                  body: ["Add a swapped flag. If no swap occurred in a full pass, the array is already sorted and the outer loop exits early:", "swapped = 0;\nfor (j = 0; j < n-1-i; j++) {\n    if (arr[j] > arr[j+1]) { swap; swapped = 1; }\n}\nif (!swapped) break;"]
                },
                {
                  title: "Complexity and Stability",
                  body: ["Worst/Average case: O(n²). Best case (already sorted): O(n) with early termination.", "Space Complexity: O(1). Stability: Bubble Sort is stable (equal elements retain order)."]
                }
              ],
              pretest: [
                { question: "What is the worst-case time complexity of Bubble Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"], answerIndex: 2 },
                { question: "After the first complete pass over array {5, 3, 1, 4, 2}, which element is guaranteed to be in its final position?", options: ["1", "3", "2", "5"], answerIndex: 3 },
                { question: "Why does the inner loop run up to n-1-i in pass i?", options: ["To avoid accessing negative indices", "Because the last i elements are already sorted and need not be re-checked", "Because the first i elements are unsorted", "To reduce the swap count"], answerIndex: 1 },
                { question: "What does the swapped flag enable?", options: ["Counting total swaps", "Printing swapped pairs", "Early termination when the array is already sorted", "Detecting duplicate elements"], answerIndex: 2 },
                { question: "Is Bubble Sort a stable sorting algorithm?", options: ["No — equal elements are always swapped", "Yes — equal elements retain their relative order because only > triggers a swap", "Only for integer arrays", "Only when the optimisation flag is used"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace each pass of Bubble Sort on array {5, 3, 1, 4, 2}.",
                "Observe how the largest unsorted element reaches its final position after each pass.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 5  5 3 1 4 2",
                "Click Run Code. Verify output: Sorted: 1 2 3 4 5",
                "Try an already-sorted array to verify early termination, and a reverse-sorted array. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, j, temp, swapped;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    for (i = 0; i < n - 1; i++) {\n        swapped = 0;\n        for (j = 0; j < n - 1 - i; j++) {\n            if (arr[j] > arr[j+1]) {\n                temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n                swapped = 1;\n            }\n        }\n        if (!swapped) break;\n    }\n    printf(\"Sorted: \");\n    for (i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf reads n=5", memory: [{variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 7, annotation: "Read elements: 5 3 1 4 2", memory: [{variable: "arr", type: "int[]", value: "{5, 3, 1, 4, 2}"}], output: "" },
                  { line: 9, annotation: "Pass i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 10, annotation: "swapped = 0", memory: [{variable: "swapped", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "Inner loop j=0 to 3", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "arr[0]>arr[1] (5>3) -> Swap", memory: [{variable: "arr", type: "int[]", value: "{3, 5, 1, 4, 2}"}, {variable: "swapped", type: "int", value: "1"}], output: "" },
                  { line: 12, annotation: "arr[1]>arr[2] (5>1) -> Swap", memory: [{variable: "j", type: "int", value: "1"}, {variable: "arr", type: "int[]", value: "{3, 1, 5, 4, 2}"}], output: "" },
                  { line: 12, annotation: "arr[2]>arr[3] (5>4) -> Swap", memory: [{variable: "j", type: "int", value: "2"}, {variable: "arr", type: "int[]", value: "{3, 1, 4, 5, 2}"}], output: "" },
                  { line: 12, annotation: "arr[3]>arr[4] (5>2) -> Swap", memory: [{variable: "j", type: "int", value: "3"}, {variable: "arr", type: "int[]", value: "{3, 1, 4, 2, 5}"}], output: "" },
                  { line: 19, annotation: "Pass 0 ends. swapped=1", memory: [], output: "" },
                  { line: 9, annotation: "Pass i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "swapped = 0", memory: [{variable: "swapped", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "Inner loop j=0 to 2", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "arr[0]>arr[1] (3>1) -> Swap", memory: [{variable: "arr", type: "int[]", value: "{1, 3, 4, 2, 5}"}, {variable: "swapped", type: "int", value: "1"}], output: "" },
                  { line: 12, annotation: "arr[1]>arr[2] (3>4) -> No swap", memory: [{variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 12, annotation: "arr[2]>arr[3] (4>2) -> Swap", memory: [{variable: "j", type: "int", value: "2"}, {variable: "arr", type: "int[]", value: "{1, 3, 2, 4, 5}"}], output: "" },
                  { line: 9, annotation: "Pass i=2", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 10, annotation: "swapped = 0", memory: [{variable: "swapped", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "Inner loop j=0 to 1", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "arr[0]>arr[1] (1>3) -> No swap", memory: [], output: "" },
                  { line: 12, annotation: "arr[1]>arr[2] (3>2) -> Swap", memory: [{variable: "j", type: "int", value: "1"}, {variable: "arr", type: "int[]", value: "{1, 2, 3, 4, 5}"}, {variable: "swapped", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Pass i=3", memory: [{variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 10, annotation: "swapped = 0", memory: [{variable: "swapped", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "Inner loop j=0 to 0", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "arr[0]>arr[1] (1>2) -> No swap", memory: [], output: "" },
                  { line: 19, annotation: "swapped=0 -> break (Early exit)", memory: [], output: "" },
                  { line: 21, annotation: "Print Sorted array", memory: [], output: "Sorted: 1 2 3 4 5 \n" },
                  { line: 26, annotation: "Program terminates", memory: [], output: "Sorted: 1 2 3 4 5 \n" }
                ]
              },
              posttest: [
                { question: "How many passes does Bubble Sort require in the worst case for n elements?", options: ["1", "n", "n-1", "n/2"], answerIndex: 2 },
                { question: "For array {1, 2, 3, 4, 5} (already sorted), how many passes does the optimised Bubble Sort perform?", options: ["4", "0", "1", "5"], answerIndex: 2 },
                { question: "For array {4, 3, 2, 1}, how many swaps occur in the first pass?", options: ["1", "2", "4", "3"], answerIndex: 3 },
                { question: "What is the space complexity of Bubble Sort?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answerIndex: 3 },
                { question: "After 2 complete passes over array {5, 3, 1, 4, 2}, which elements are guaranteed in their final positions?", options: ["5 and 4", "1 and 2", "3 and 5", "4 and 2"], answerIndex: 0 }
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
            id: "c-w8-4",
            title: "String Concatenation",
            desc: "Concatenate two strings without using strcat().",
            expected: "Concatenated string",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept two strings from the user and concatenate the second string to the end of the first without using the library function strcat(), implementing the operation manually with loops. The student will:",
                bullets: [
                  "Declare character arrays (strings) of sufficient size to hold both strings",
                  "Use strlen() to find the lengths of both strings",
                  "Traverse the second string character by character, appending to the first",
                  "Append the null terminator '\\0' after the last copied character",
                  "Display the concatenated result using printf() with %s"
                ]
              },
              theory: [
                {
                  title: "Strings in C",
                  body: ["A string is a character array terminated by the null character '\\0'.", "char str[50] = \"Hello\"; // stored as: H e l l o \\0", "strlen(\"Hello\") = 5 (the null terminator is not counted)."]
                },
                {
                  title: "Manual Concatenation Algorithm",
                  body: ["len1 = strlen(s1);\nfor (i = 0; s2[i] != '\\0'; i++)\n    s1[len1 + i] = s2[i];\ns1[len1 + i] = '\\0';", "You must explicitly append '\\0' at the end. Without it, printf(\"%s\") will read into undefined memory."]
                },
                {
                  title: "Buffer Size",
                  body: ["s1 must be declared large enough to hold both strings plus '\\0'. Exceeding the buffer causes undefined behaviour (buffer overflow)."]
                },
                {
                  title: "Library Alternative",
                  body: ["strcat(s1, s2); appends s2 to s1, including null terminator automatically.", "strncat(s1, s2, n); safer version that copies at most n characters."]
                }
              ],
              pretest: [
                { question: "How is a string terminated in C?", options: ["With a period '.'", "With a space ' '", "With a null character '\\0'", "With a newline '\\n'"], answerIndex: 2 },
                { question: "What does strlen(\"World\") return?", options: ["6", "4", "5", "0"], answerIndex: 2 },
                { question: "After manually concatenating \"Hello\" and \" World\", what is the result?", options: ["\"Hello World\"", "\"Hello\" + \" World\"", "\"World Hello\"", "\"Hello\\0 World\""], answerIndex: 0 },
                { question: "Why must '\\0' be appended after the last copied character in manual concatenation?", options: ["To satisfy the compiler", "To mark the end of the string so printf knows where to stop", "Because strlen requires it", "It is not necessary"], answerIndex: 1 },
                { question: "What is the minimum size s1 must be declared to safely concatenate \"Hello\" (5 chars) and \" World\" (6 chars)?", options: ["5", "11", "10", "12"], answerIndex: 3 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace character-by-character appending of s2 onto s1.",
                "Observe how len1 is used as the starting index and how '\\0' terminates the result.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter two strings on separate lines — e.g. Hello (enter) World",
                "Click Run Code. Verify output: Concatenated: HelloWorld",
                "Try empty strings and longer strings. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[200], s2[100];\n    int len1, i;\n    scanf(\"%s %s\", s1, s2);\n    len1 = strlen(s1);\n    for (i = 0; s2[i] != '\\0'; i++) {\n        s1[len1 + i] = s2[i];\n    }\n    s1[len1 + i] = '\\0';\n    printf(\"Concatenated: %s\\n\", s1);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and string libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate string buffers", memory: [{variable: "s1", type: "char[]", value: "size 200"}, {variable: "s2", type: "char[]", value: "size 100"}], output: "" },
                  { line: 7, annotation: "scanf reads 'Hello' and 'World'", memory: [{variable: "s1", type: "char[]", value: "\"Hello\""}, {variable: "s2", type: "char[]", value: "\"World\""}], output: "" },
                  { line: 8, annotation: "strlen(s1) = 5", memory: [{variable: "s1", type: "char[]", value: "\"Hello\""}, {variable: "len1", type: "int", value: "5"}], output: "" },
                  { line: 9, annotation: "Loop starts (i=0, s2[0]='W')", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 10, annotation: "s1[5] = 'W'", memory: [{variable: "s1", type: "char[]", value: "\"HelloW\""}], output: "" },
                  { line: 9, annotation: "Loop i=1, s2[1]='o'", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "s1[6] = 'o'", memory: [{variable: "s1", type: "char[]", value: "\"HelloWo\""}], output: "" },
                  { line: 9, annotation: "Loop i=2, s2[2]='r'", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 10, annotation: "s1[7] = 'r'", memory: [{variable: "s1", type: "char[]", value: "\"HelloWor\""}], output: "" },
                  { line: 9, annotation: "Loop i=3, s2[3]='l'", memory: [{variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 10, annotation: "s1[8] = 'l'", memory: [{variable: "s1", type: "char[]", value: "\"HelloWorl\""}], output: "" },
                  { line: 9, annotation: "Loop i=4, s2[4]='d'", memory: [{variable: "i", type: "int", value: "4"}], output: "" },
                  { line: 10, annotation: "s1[9] = 'd'", memory: [{variable: "s1", type: "char[]", value: "\"HelloWorld\""}], output: "" },
                  { line: 9, annotation: "Loop i=5, s2[5]='\\0' -> Exit loop", memory: [{variable: "i", type: "int", value: "5"}], output: "" },
                  { line: 12, annotation: "Append '\\0' to s1", memory: [{variable: "s1", type: "char[]", value: "\"HelloWorld\\0\""}], output: "" },
                  { line: 13, annotation: "printf output", memory: [], output: "Concatenated: HelloWorld\n" },
                  { line: 15, annotation: "Program terminates", memory: [], output: "Concatenated: HelloWorld\n" }
                ]
              },
              posttest: [
                { question: "For s1 = \"abc\" and s2 = \"def\", what is the result of concatenation?", options: ["\"abcdef\"", "\"defabc\"", "\"abc def\"", "\"abc\\0def\""], answerIndex: 0 },
                { question: "What index does appending s2 start at in s1?", options: ["0", "strlen(s2)", "strlen(s1)", "strlen(s1) + strlen(s2)"], answerIndex: 2 },
                { question: "What is the length of \"abcdef\" after concatenating \"abc\" and \"def\"?", options: ["3", "8", "7", "6"], answerIndex: 3 },
                { question: "What happens if s1 is not large enough to hold the concatenated result?", options: ["strcat automatically resizes the array", "The program prints an error", "Buffer overflow — undefined behaviour", "The extra characters are silently discarded"], answerIndex: 2 },
                { question: "Which standard library function performs string concatenation automatically?", options: ["strcpy()", "strcmp()", "strcat()", "strlen()"], answerIndex: 2 }
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
            id: "c-w8-5",
            title: "Reverse String",
            desc: "Reverse a string.",
            expected: "Reversed string",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a string from the user and reverse it in-place using a two-pointer swapping technique, without using any library reversal function. The student will:",
                bullets: [
                  "Declare a character array of sufficient size",
                  "Use strlen() to find the string length and set the two pointer positions",
                  "Swap characters from both ends moving toward the centre using a while loop",
                  "Preserve the null terminator at the end after reversal",
                  "Display the reversed string using printf() with %s"
                ]
              },
              theory: [
                {
                  title: "String as Character Array",
                  body: ["A C string is stored as a char array: char str[] = \"Hello\";", "Indices 0 to len-1 hold the characters; index len holds '\\0'."]
                },
                {
                  title: "Two-Pointer Reversal",
                  body: ["Identical to the array reversal technique:", "left = 0; right = strlen(str) - 1;\nwhile (left < right) {\n    temp = str[left]; str[left] = str[right]; str[right] = temp;\n    left++; right--;\n}", "The null terminator at index len is never touched — it stays in place."]
                },
                {
                  title: "Number of Swaps and Null Terminator Safety",
                  body: ["Swaps: floor(len / 2). \"Hello\" (len=5) : 2 swaps.", "strlen() counts only characters before '\\0'. Setting right = strlen(str) - 1 ensures '\\0' is never swapped, preserving string validity."]
                },
                {
                  title: "Palindrome Detection",
                  body: ["Reversing a string and comparing with the original is one method to check if a string is a palindrome. \"madam\" reversed = \"madam\" -> Palindrome.", "Library Alternative: strrev(str) reverses a string in-place (available in some compilers; not in standard C99/C11)."]
                }
              ],
              pretest: [
                { question: "What is the reverse of the string \"hello\"?", options: ["\"hello\"", "\"lelho\"", "\"olleh\"", "\"hlleo\""], answerIndex: 2 },
                { question: "For str = \"hello\" (length 5), what is the initial value of right in the two-pointer method?", options: ["5", "4", "3", "0"], answerIndex: 1 },
                { question: "Why is right set to strlen(str) - 1 rather than strlen(str)?", options: ["strlen counts from 1", "To avoid swapping the null terminator", "strlen includes the null terminator in its count", "right must always be even"], answerIndex: 1 },
                { question: "How many swaps are needed to reverse \"program\" (length 7)?", options: ["7", "4", "6", "3"], answerIndex: 3 },
                { question: "Is \"madam\" a palindrome?", options: ["No", "Yes", "Only when lowercase", "Depends on the compiler"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the swap steps for str = \"Hello\".",
                "Observe how left and right converge and the null terminator remains untouched.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a string — e.g. Hello",
                "Click Run Code. Verify output: Reversed: olleH",
                "Try palindromes like \"madam\" and \"racecar\". Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[100];\n    int left, right;\n    char temp;\n    scanf(\"%s\", str);\n    left = 0;\n    right = strlen(str) - 1;\n    while (left < right) {\n        temp = str[left];\n        str[left] = str[right];\n        str[right] = temp;\n        left++;\n        right--;\n    }\n    printf(\"Reversed: %s\\n\", str);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and string libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate variables", memory: [{variable: "str", type: "char[]", value: "size 100"}], output: "" },
                  { line: 8, annotation: "scanf reads 'Hello'", memory: [{variable: "str", type: "char[]", value: "\"Hello\""}], output: "" },
                  { line: 9, annotation: "left = 0", memory: [{variable: "left", type: "int", value: "0"}], output: "" },
                  { line: 10, annotation: "right = strlen(\"Hello\") - 1 = 4", memory: [{variable: "right", type: "int", value: "4"}], output: "" },
                  { line: 11, annotation: "while left < right (0 < 4)", memory: [], output: "" },
                  { line: 12, annotation: "temp = str[0] ('H')", memory: [{variable: "temp", type: "char", value: "'H'"}], output: "" },
                  { line: 13, annotation: "str[0] = str[4] ('o')", memory: [{variable: "str", type: "char[]", value: "\"oello\""}], output: "" },
                  { line: 14, annotation: "str[4] = temp ('H')", memory: [{variable: "str", type: "char[]", value: "\"oellH\""}], output: "" },
                  { line: 15, annotation: "left++", memory: [{variable: "left", type: "int", value: "1"}], output: "" },
                  { line: 16, annotation: "right--", memory: [{variable: "right", type: "int", value: "3"}], output: "" },
                  { line: 11, annotation: "while left < right (1 < 3)", memory: [], output: "" },
                  { line: 12, annotation: "temp = str[1] ('e')", memory: [{variable: "temp", type: "char", value: "'e'"}], output: "" },
                  { line: 13, annotation: "str[1] = str[3] ('l')", memory: [{variable: "str", type: "char[]", value: "\"olllo\""}], output: "" },
                  { line: 14, annotation: "str[3] = temp ('e')", memory: [{variable: "str", type: "char[]", value: "\"olleH\""}], output: "" },
                  { line: 15, annotation: "left++", memory: [{variable: "left", type: "int", value: "2"}], output: "" },
                  { line: 16, annotation: "right--", memory: [{variable: "right", type: "int", value: "2"}], output: "" },
                  { line: 11, annotation: "while left < right (2 < 2) false -> Exit loop", memory: [], output: "" },
                  { line: 18, annotation: "Print reversed string", memory: [], output: "Reversed: olleH\n" },
                  { line: 20, annotation: "Program terminates", memory: [], output: "Reversed: olleH\n" }
                ]
              },
              posttest: [
                { question: "What is the reverse of \"abcde\"?", options: ["\"abcde\"", "\"edabc\"", "\"edcba\"", "\"aedcb\""], answerIndex: 2 },
                { question: "What is the reverse of a single character \"z\"?", options: ["\"\"", "\"zz\"", "\"z\"", "Undefined"], answerIndex: 2 },
                { question: "For str = \"abcd\", what are the characters swapped in the second swap?", options: ["a and d", "b and c", "a and c", "b and d"], answerIndex: 1 },
                { question: "After reversing \"Hello\", is the null terminator still at the correct position?", options: ["No — it gets swapped to index 0", "No — it is lost", "Yes — strlen-1 ensures '\\0' at index len is never swapped", "Yes, but only if len is even"], answerIndex: 2 },
                { question: "Which modification to the reversal algorithm also checks if the result is a palindrome?", options: ["Print str before and after reversal and compare them visually", "Save a copy of str before reversal, reverse str in-place, then compare the copy with the reversed str using strcmp()", "Check if left == right after the loop", "Count the number of swaps; if 0, it is a palindrome"], answerIndex: 1 }
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
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to dynamically allocate memory for an integer array of size n using malloc(), accept n integers from the user, compute their sum and average, and free the allocated memory before exiting. The student will:",
                bullets: [
                  "Include stdlib.h for malloc() and free()",
                  "Dynamically allocate an integer array using malloc()",
                  "Check the return value of malloc() for NULL (allocation failure)",
                  "Traverse the allocated array with a pointer or index to compute sum",
                  "Free the allocated memory using free() after use",
                  "Use printf() with %d and %.2f to display sum and average"
                ]
              },
              theory: [
                {
                  title: "Static vs Dynamic Allocation",
                  body: ["Static  : int arr[100]; — size fixed at compile time, stored on the stack.", "Dynamic : int *arr = malloc(n * sizeof(int)); — size decided at runtime, stored on the heap. Allows flexible, user-determined array sizes."]
                },
                {
                  title: "malloc()",
                  body: ["Memory ALLOCation. Syntax:\n  void *malloc(size_t size);\nAllocates a contiguous block of size bytes on the heap. Returns a void* pointer to the first byte, or NULL if allocation fails. The memory is uninitialised (contains garbage values). Must be cast to the required type:\n  int *arr = (int *) malloc(n * sizeof(int));"]
                },
                {
                  title: "sizeof(int)",
                  body: ["Always use sizeof to compute the correct byte count per element. sizeof(int) is typically 4 bytes on 32/64-bit systems. Hardcoding 4 is non-portable."]
                },
                {
                  title: "NULL Check",
                  body: ["malloc() returns NULL when the system cannot allocate the requested memory (e.g. out of heap space). Always check:\n  if (arr == NULL) { printf(\"Allocation failed\\n\"); exit(1); }\nDereferencing a NULL pointer causes a segmentation fault."]
                },
                {
                  title: "free()",
                  body: ["Releases the heap memory back to the OS:\n  free(arr);\nAfter free(), the pointer is a dangling pointer. Set it to NULL immediately:\n  arr = NULL;\nFailure to free memory causes a memory leak — the allocated block remains reserved until the program exits."]
                },
                {
                  title: "Pointer Arithmetic",
                  body: ["arr[i] is equivalent to *(arr + i). Both access the element i positions ahead of the base address."]
                },
                {
                  title: "Sum and Average",
                  body: ["sum = 0;\nfor (i = 0; i < n; i++) sum += arr[i];\naverage = (float) sum / n;"]
                }
              ],
              pretest: [
                { question: "Which header file must be included to use malloc() and free()?", options: ["stdio.h", "string.h", "stdlib.h", "malloc.h"], answerIndex: 2 },
                { question: "What does malloc() return if memory allocation fails?", options: ["0", "-1", "NULL", "A garbage pointer"], answerIndex: 2 },
                { question: "How many bytes does malloc(n * sizeof(int)) allocate for n = 5 on a system where sizeof(int) = 4?", options: ["5", "4", "10", "20"], answerIndex: 3 },
                { question: "What is the content of memory allocated by malloc()?", options: ["All zeros", "All ones", "Uninitialised — contains garbage values", "The address of the next free block"], answerIndex: 2 },
                { question: "What happens if free() is never called after malloc()?", options: ["The program crashes immediately", "Memory is automatically freed when each variable goes out of scope", "The allocated block remains reserved until the program exits — memory leak", "The OS reclaims memory after each malloc() call"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace malloc, array fill, sum computation, and free.",
                "Observe the heap address assigned to arr and how it is released after free().",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 5  10 20 30 40 50",
                "Click Run Code. Verify output: Sum: 150  Average: 30.00",
                "Try n = 1 and a large n like 1000 to observe dynamic sizing. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, i, sum = 0;\n    float average;\n    int *arr;\n    scanf(\"%d\", &n);\n    arr = (int *) malloc(n * sizeof(int));\n    if (arr == NULL) {\n        printf(\"Allocation failed\\n\");\n        return 1;\n    }\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n        sum += arr[i];\n    }\n    average = (float) sum / n;\n    printf(\"Sum: %d  Average: %.2f\\n\", sum, average);\n    free(arr);\n    arr = NULL;\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and stdlib libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "sum", type: "int", value: "0"}, {variable: "arr", type: "int*", value: "NULL"}], output: "" },
                  { line: 8, annotation: "scanf reads n=5", memory: [{variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 9, annotation: "malloc(5 * 4 = 20 bytes)", memory: [{variable: "arr", type: "int*", value: "0xHeapAddr1"}], output: "" },
                  { line: 10, annotation: "arr != NULL, proceed", memory: [], output: "" },
                  { line: 14, annotation: "Loop starts i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 15, annotation: "scanf arr[0]=10", memory: [{variable: "arr[0]", type: "int", value: "10"}], output: "" },
                  { line: 16, annotation: "sum = sum + 10 = 10", memory: [{variable: "sum", type: "int", value: "10"}], output: "" },
                  { line: 14, annotation: "Loop i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 15, annotation: "scanf arr[1]=20", memory: [{variable: "arr[1]", type: "int", value: "20"}], output: "" },
                  { line: 16, annotation: "sum = 10 + 20 = 30", memory: [{variable: "sum", type: "int", value: "30"}], output: "" },
                  { line: 14, annotation: "Loop i=2", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 15, annotation: "scanf arr[2]=30", memory: [{variable: "arr[2]", type: "int", value: "30"}], output: "" },
                  { line: 16, annotation: "sum = 30 + 30 = 60", memory: [{variable: "sum", type: "int", value: "60"}], output: "" },
                  { line: 14, annotation: "Loop i=3", memory: [{variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 15, annotation: "scanf arr[3]=40", memory: [{variable: "arr[3]", type: "int", value: "40"}], output: "" },
                  { line: 16, annotation: "sum = 60 + 40 = 100", memory: [{variable: "sum", type: "int", value: "100"}], output: "" },
                  { line: 14, annotation: "Loop i=4", memory: [{variable: "i", type: "int", value: "4"}], output: "" },
                  { line: 15, annotation: "scanf arr[4]=50", memory: [{variable: "arr[4]", type: "int", value: "50"}], output: "" },
                  { line: 16, annotation: "sum = 100 + 50 = 150", memory: [{variable: "sum", type: "int", value: "150"}], output: "" },
                  { line: 14, annotation: "Loop ends", memory: [], output: "" },
                  { line: 18, annotation: "average = 150.0 / 5 = 30.00", memory: [{variable: "average", type: "float", value: "30.00"}], output: "" },
                  { line: 19, annotation: "Print sum and average", memory: [], output: "Sum: 150  Average: 30.00\n" },
                  { line: 20, annotation: "free(arr) - Memory released", memory: [{variable: "arr", type: "int*", value: "0xHeapAddr1 (Freed)"}], output: "" },
                  { line: 21, annotation: "Set arr to NULL to avoid dangling pointer", memory: [{variable: "arr", type: "int*", value: "NULL"}], output: "" },
                  { line: 22, annotation: "Program terminates", memory: [], output: "Sum: 150  Average: 30.00\n" }
                ]
              },
              posttest: [
                { question: "For input {5, 10, 20, 30, 40, 50}, what is the average?", options: ["25.00", "150.00", "30.00", "50.00"], answerIndex: 2 },
                { question: "What is a dangling pointer?", options: ["A pointer that has never been initialised", "A pointer that still holds the address of memory that has been freed", "A pointer to a NULL value", "A pointer declared inside a function"], answerIndex: 1 },
                { question: "Which of the following correctly allocates memory for 10 floats?", options: ["float *p = malloc(10);", "float *p = malloc(10 * sizeof(float));", "float *p = malloc(sizeof(10));", "float *p = calloc(sizeof(float));"], answerIndex: 1 },
                { question: "After calling free(arr), what should be done immediately to avoid a dangling pointer?", options: ["Reallocate arr with the same size", "Call malloc() again", "Set arr = NULL", "Decrement arr by 1"], answerIndex: 2 },
                { question: "What is the difference between arr[i] and *(arr + i)?", options: ["arr[i] is faster", "*(arr + i) only works for dynamic arrays", "They are exactly equivalent in C", "arr[i] only works for static arrays"], answerIndex: 2 }
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
            id: "c-w9-2",
            title: "Student Average using Structures",
            desc: "Array of structures dynamically allocated with malloc().",
            expected: "Average=X.XX",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to dynamically allocate an array of structures representing students, accept each student's name and marks, compute the average marks for each student, and display the results. The student will:",
                bullets: [
                  "Define a struct to hold a student's name and marks array",
                  "Dynamically allocate an array of n student structures using malloc()",
                  "Use a nested loop to accept marks for multiple subjects per student",
                  "Compute and store the average for each student within the struct",
                  "Traverse and print all student records using printf()",
                  "Free all dynamically allocated memory before program exit"
                ]
              },
              theory: [
                {
                  title: "Structures in C",
                  body: ["A struct groups related variables of different types under one name:\n  struct Student {\n      char name[50];\n      int  marks[5];\n      float average;\n  };\nEach field is accessed using the dot operator: s.name, s.marks[0], s.average."]
                },
                {
                  title: "Array of Structures",
                  body: ["Declares multiple student records:\n  struct Student students[100];   // static\nDynamically:\n  struct Student *students = (struct Student *) malloc(n * sizeof(struct Student));"]
                },
                {
                  title: "sizeof(struct Student)",
                  body: ["Returns the total bytes for one struct instance, including all fields and any padding added by the compiler for alignment. Always use sizeof rather than adding field sizes manually."]
                },
                {
                  title: "Dot vs Arrow Operator",
                  body: ["s.name           accesses field name of a struct variable s", "ptr->name        accesses field name through a pointer ptr", "(*ptr).name      is equivalent to ptr->name"]
                },
                {
                  title: "Average per Student",
                  body: ["sum = 0;\nfor (j = 0; j < subjects; j++) sum += students[i].marks[j];\nstudents[i].average = (float) sum / subjects;"]
                },
                {
                  title: "Nested Dynamic Allocation",
                  body: ["For a variable number of subjects per student, marks can itself be a dynamically allocated int*:\n  students[i].marks = (int *) malloc(subjects * sizeof(int));\nEach inner allocation must also be freed individually before freeing the outer array."]
                },
                {
                  title: "Memory Freeing Order",
                  body: ["Free inner allocations before the outer array to avoid losing the inner pointers:\n  for (i = 0; i < n; i++) free(students[i].marks);\n  free(students);"]
                }
              ],
              pretest: [
                { question: "How is a struct field accessed through a pointer ptr in C?", options: ["ptr.field", "*ptr.field", "ptr->field", "&ptr.field"], answerIndex: 2 },
                { question: "Which function allocates memory for an array of structures at runtime?", options: ["sizeof()", "calloc() or malloc()", "struct()", "alloc()"], answerIndex: 1 },
                { question: "For a struct of size 60 bytes, how many bytes does malloc(5 * sizeof(struct Student)) allocate?", options: ["5", "60", "65", "300"], answerIndex: 3 },
                { question: "What is the correct order to free nested dynamic memory (struct array with inner dynamic marks arrays)?", options: ["Free the outer array first, then inner arrays", "Free inner arrays first, then the outer array", "Free them simultaneously", "Only the outer array needs to be freed"], answerIndex: 1 },
                { question: "What is the difference between the dot (.) and arrow (->) operators?", options: [". is for pointers; -> is for variables", ". accesses fields of a struct variable; -> accesses fields through a pointer", "They are interchangeable in all contexts", "-> only works with malloc-allocated structs"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace struct allocation, field assignment, and average computation for two students.",
                "Observe how students[i].marks[j] is filled and how students[i].average is computed.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter number of students and subjects, then for each student enter name followed by marks — e.g.:\n2 3\nAlice 80 90 85\nBob 70 60 75",
                "Click Run Code. Verify average for Alice: 85.00 and Bob: 68.33",
                "Try a single student and a student with all-zero marks. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Student {\n    char name[50];\n    int *marks;\n    float average;\n};\n\nint main() {\n    int n, subjects, i, j, sum;\n    struct Student *students;\n    scanf(\"%d %d\", &n, &subjects);\n    students = (struct Student *) malloc(n * sizeof(struct Student));\n    for (i = 0; i < n; i++) {\n        scanf(\"%s\", students[i].name);\n        students[i].marks = (int *) malloc(subjects * sizeof(int));\n        sum = 0;\n        for (j = 0; j < subjects; j++) {\n            scanf(\"%d\", &students[i].marks[j]);\n            sum += students[i].marks[j];\n        }\n        students[i].average = (float) sum / subjects;\n    }\n    for (i = 0; i < n; i++) {\n        printf(\"%s - Average: %.2f\\n\", students[i].name, students[i].average);\n    }\n    for (i = 0; i < n; i++) {\n        free(students[i].marks);\n    }\n    free(students);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load libraries", memory: [], output: "" },
                  { line: 12, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "subjects", type: "int", value: "?"}], output: "" },
                  { line: 13, annotation: "scanf reads n=2, subjects=3", memory: [{variable: "n", type: "int", value: "2"}, {variable: "subjects", type: "int", value: "3"}], output: "" },
                  { line: 14, annotation: "malloc students array", memory: [{variable: "students", type: "struct Student*", value: "size 2"}], output: "" },
                  { line: 15, annotation: "Student 1 loop starts (i=0)", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 16, annotation: "scanf name 'Alice'", memory: [{variable: "students[0].name", type: "char[]", value: "\"Alice\""}], output: "" },
                  { line: 17, annotation: "malloc marks array for Alice", memory: [{variable: "students[0].marks", type: "int*", value: "size 3"}], output: "" },
                  { line: 18, annotation: "sum = 0", memory: [{variable: "sum", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "Marks loop for Alice starts", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "scanf mark 80", memory: [{variable: "students[0].marks[0]", type: "int", value: "80"}], output: "" },
                  { line: 21, annotation: "sum += 80", memory: [{variable: "sum", type: "int", value: "80"}], output: "" },
                  { line: 19, annotation: "j=1", memory: [{variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 20, annotation: "scanf mark 90", memory: [{variable: "students[0].marks[1]", type: "int", value: "90"}], output: "" },
                  { line: 21, annotation: "sum += 90 (170)", memory: [{variable: "sum", type: "int", value: "170"}], output: "" },
                  { line: 19, annotation: "j=2", memory: [{variable: "j", type: "int", value: "2"}], output: "" },
                  { line: 20, annotation: "scanf mark 85", memory: [{variable: "students[0].marks[2]", type: "int", value: "85"}], output: "" },
                  { line: 21, annotation: "sum += 85 (255)", memory: [{variable: "sum", type: "int", value: "255"}], output: "" },
                  { line: 23, annotation: "average = 255 / 3 = 85.00", memory: [{variable: "students[0].average", type: "float", value: "85.00"}], output: "" },
                  { line: 15, annotation: "Student 2 loop starts (i=1)", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 16, annotation: "scanf name 'Bob'", memory: [{variable: "students[1].name", type: "char[]", value: "\"Bob\""}], output: "" },
                  { line: 17, annotation: "malloc marks array for Bob", memory: [{variable: "students[1].marks", type: "int*", value: "size 3"}], output: "" },
                  { line: 18, annotation: "sum = 0", memory: [{variable: "sum", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "Marks loop for Bob starts", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "scanf mark 70", memory: [{variable: "students[1].marks[0]", type: "int", value: "70"}], output: "" },
                  { line: 21, annotation: "sum += 70", memory: [{variable: "sum", type: "int", value: "70"}], output: "" },
                  { line: 19, annotation: "j=1", memory: [{variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 20, annotation: "scanf mark 60", memory: [{variable: "students[1].marks[1]", type: "int", value: "60"}], output: "" },
                  { line: 21, annotation: "sum += 60 (130)", memory: [{variable: "sum", type: "int", value: "130"}], output: "" },
                  { line: 19, annotation: "j=2", memory: [{variable: "j", type: "int", value: "2"}], output: "" },
                  { line: 20, annotation: "scanf mark 75", memory: [{variable: "students[1].marks[2]", type: "int", value: "75"}], output: "" },
                  { line: 21, annotation: "sum += 75 (205)", memory: [{variable: "sum", type: "int", value: "205"}], output: "" },
                  { line: 23, annotation: "average = 205 / 3 = 68.33", memory: [{variable: "students[1].average", type: "float", value: "68.33"}], output: "" },
                  { line: 25, annotation: "Print Loop i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 26, annotation: "Print Alice", memory: [], output: "Alice - Average: 85.00\n" },
                  { line: 25, annotation: "Print Loop i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 26, annotation: "Print Bob", memory: [], output: "Alice - Average: 85.00\nBob - Average: 68.33\n" },
                  { line: 28, annotation: "Free Loop starts", memory: [], output: "" },
                  { line: 29, annotation: "Free Alice's marks", memory: [], output: "" },
                  { line: 29, annotation: "Free Bob's marks", memory: [], output: "" },
                  { line: 31, annotation: "Free students array", memory: [], output: "" },
                  { line: 32, annotation: "Program terminates", memory: [], output: "Alice - Average: 85.00\nBob - Average: 68.33\n" }
                ]
              },
              posttest: [
                { question: "For marks {80, 90, 85} across 3 subjects, what is the average?", options: ["80.00", "83.00", "85.00", "90.00"], answerIndex: 2 },
                { question: "For marks {70, 60, 75} across 3 subjects, what is the average?", options: ["70.00", "65.00", "68.33", "75.00"], answerIndex: 2 },
                { question: "What does sizeof(struct Student) return if the struct contains char name[50], int marks[5], and float average?", options: ["56", "70", "74", "60"], answerIndex: 2 },
                { question: "What happens if inner marks arrays are not freed before freeing the outer students array?", options: ["The program crashes immediately", "The inner pointers are lost, causing a memory leak", "The OS automatically frees them", "free() handles nested allocation automatically"], answerIndex: 1 },
                { question: "Which operator is used to access struct fields when iterating with a pointer students[i]?", options: ["->", ".", "*", "&"], answerIndex: 1 }
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
            id: "c-w9-3",
            title: "Failed Students using calloc",
            desc: "Filter and print failed students from an array allocated with calloc().",
            expected: "List of failed students",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to dynamically allocate memory for n student marks using calloc(), accept marks from the user, identify and count students who have failed (marks below a passing threshold), and display their roll numbers and marks. The student will:",
                bullets: [
                  "Include stdlib.h for calloc() and free()",
                  "Allocate a zero-initialised integer array using calloc()",
                  "Accept n marks and store them in the allocated array",
                  "Traverse the array to identify elements below the pass mark (e.g. 40)",
                  "Count and display the number of failed students with their roll numbers",
                  "Free the allocated memory and set the pointer to NULL"
                ]
              },
              theory: [
                {
                  title: "calloc()",
                  body: ["Contiguous ALLOCation. Syntax:\n  void *calloc(size_t num, size_t size);\nAllocates memory for num elements each of size bytes and zero-initialises every byte. Returns a void* pointer, or NULL on failure.\n  int *marks = (int *) calloc(n, sizeof(int));"]
                },
                {
                  title: "malloc() vs calloc()",
                  body: ["malloc(n * sizeof(int))   : allocates n*sizeof(int) bytes; content uninitialised\ncalloc(n, sizeof(int))    : allocates n*sizeof(int) bytes; all bytes set to 0", "calloc is preferred when zero-initialisation is needed (e.g. counters, flags, marks arrays where un-entered values should default to 0)."]
                },
                {
                  title: "realloc()",
                  body: ["REALLOCation. Resizes a previously allocated block:\n  ptr = realloc(ptr, new_size);\nIf new_size is larger, extra bytes are uninitialised. If the block cannot be expanded in place, realloc allocates a new block, copies the old data, frees the old block, and returns the new address. Returns NULL on failure — always assign to a temporary pointer to avoid losing the original:\n  int *temp = realloc(marks, new_n * sizeof(int));\n  if (temp != NULL) marks = temp;"]
                },
                {
                  title: "Identifying Failed Students",
                  body: ["failCount = 0;\nfor (i = 0; i < n; i++) {\n    if (marks[i] < PASS_MARK) {\n        printf(\"Roll %d: %d\\n\", i+1, marks[i]);\n        failCount++;\n    }\n}"]
                },
                {
                  title: "Zero Initialisation Advantage",
                  body: ["Because calloc zero-initialises, any unread entry defaults to 0 (which would be below pass mark). This makes calloc particularly appropriate when partial data entry is a concern."]
                },
                {
                  title: "free() and NULL Assignment",
                  body: ["free(marks);\nmarks = NULL;"]
                }
              ],
              pretest: [
                { question: "What is the key difference between malloc() and calloc()?", options: ["malloc() is faster and always preferred", "calloc() takes two arguments and zero-initialises memory; malloc() does not", "calloc() only works for structures", "malloc() zero-initialises; calloc() does not"], answerIndex: 1 },
                { question: "Which calloc() call correctly allocates memory for 8 integers?", options: ["calloc(8);", "calloc(sizeof(int), sizeof(int));", "calloc(8, sizeof(int));", "calloc(8 * sizeof(int));"], answerIndex: 2 },
                { question: "What does realloc(ptr, 0) do?", options: ["Doubles the allocation", "Allocates a fresh block of default size", "Has no effect", "Frees the memory pointed to by ptr"], answerIndex: 3 },
                { question: "For n = 5 students with marks {55, 32, 48, 27, 61} and pass mark 40, how many students failed?", options: ["1", "3", "2", "4"], answerIndex: 2 },
                { question: "Why should realloc's return value be assigned to a temporary pointer rather than directly back to the original?", options: ["realloc always returns a different address", "If realloc returns NULL, the original pointer is not lost", "The original pointer is automatically freed by realloc", "Temporary pointers are faster to dereference"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace calloc allocation, marks entry, and the fail check loop.",
                "Observe that unmodified calloc slots hold 0 and how marks below 40 are flagged.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n marks — e.g. 5  55 32 48 27 61",
                "Click Run Code. Verify output:\nFailed Students:\nRoll 2: 32\nRoll 4: 27\nTotal failed: 2",
                "Try all passing marks, all failing marks, and n = 1. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, i, failCount = 0;\n    int *marks;\n    scanf(\"%d\", &n);\n    marks = (int *) calloc(n, sizeof(int));\n    if (marks == NULL) {\n        printf(\"Allocation failed\\n\");\n        return 1;\n    }\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &marks[i]);\n    }\n    printf(\"Failed Students:\\n\");\n    for (i = 0; i < n; i++) {\n        if (marks[i] < 40) {\n            printf(\"Roll %d: %d\\n\", i + 1, marks[i]);\n            failCount++;\n        }\n    }\n    printf(\"Total failed: %d\\n\", failCount);\n    free(marks);\n    marks = NULL;\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and stdlib libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "failCount", type: "int", value: "0"}], output: "" },
                  { line: 7, annotation: "scanf reads n=5", memory: [{variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 8, annotation: "calloc(5, 4) zeroes memory", memory: [{variable: "marks", type: "int*", value: "{0, 0, 0, 0, 0}"}], output: "" },
                  { line: 9, annotation: "marks != NULL, proceed", memory: [], output: "" },
                  { line: 13, annotation: "Read loop starts", memory: [], output: "" },
                  { line: 14, annotation: "scanf marks[0]=55", memory: [{variable: "marks", type: "int*", value: "{55, 0, 0, 0, 0}"}], output: "" },
                  { line: 14, annotation: "scanf marks[1]=32", memory: [{variable: "marks", type: "int*", value: "{55, 32, 0, 0, 0}"}], output: "" },
                  { line: 14, annotation: "scanf marks[2]=48", memory: [{variable: "marks", type: "int*", value: "{55, 32, 48, 0, 0}"}], output: "" },
                  { line: 14, annotation: "scanf marks[3]=27", memory: [{variable: "marks", type: "int*", value: "{55, 32, 48, 27, 0}"}], output: "" },
                  { line: 14, annotation: "scanf marks[4]=61", memory: [{variable: "marks", type: "int*", value: "{55, 32, 48, 27, 61}"}], output: "" },
                  { line: 16, annotation: "Print header", memory: [], output: "Failed Students:\n" },
                  { line: 17, annotation: "Check loop starts", memory: [], output: "" },
                  { line: 18, annotation: "marks[0]=55 >= 40 (Pass)", memory: [], output: "" },
                  { line: 18, annotation: "marks[1]=32 < 40 (Fail)", memory: [], output: "" },
                  { line: 19, annotation: "Print Roll 2", memory: [], output: "Failed Students:\nRoll 2: 32\n" },
                  { line: 20, annotation: "failCount++", memory: [{variable: "failCount", type: "int", value: "1"}], output: "" },
                  { line: 18, annotation: "marks[2]=48 >= 40 (Pass)", memory: [], output: "" },
                  { line: 18, annotation: "marks[3]=27 < 40 (Fail)", memory: [], output: "" },
                  { line: 19, annotation: "Print Roll 4", memory: [], output: "Failed Students:\nRoll 2: 32\nRoll 4: 27\n" },
                  { line: 20, annotation: "failCount++", memory: [{variable: "failCount", type: "int", value: "2"}], output: "" },
                  { line: 18, annotation: "marks[4]=61 >= 40 (Pass)", memory: [], output: "" },
                  { line: 23, annotation: "Print total failed", memory: [], output: "Failed Students:\nRoll 2: 32\nRoll 4: 27\nTotal failed: 2\n" },
                  { line: 24, annotation: "free(marks)", memory: [{variable: "marks", type: "int*", value: "0xHeapAddr (Freed)"}], output: "" },
                  { line: 25, annotation: "marks = NULL", memory: [{variable: "marks", type: "int*", value: "NULL"}], output: "" },
                  { line: 26, annotation: "Program terminates", memory: [], output: "Failed Students:\nRoll 2: 32\nRoll 4: 27\nTotal failed: 2\n" }
                ]
              },
              posttest: [
                { question: "For marks {40, 39, 40, 41, 38} with pass mark 40, how many students failed?", options: ["1", "3", "4", "2"], answerIndex: 3 },
                { question: "What is the initial value of every element in a calloc-allocated array before any data is entered?", options: ["-1", "Garbage", "1", "0"], answerIndex: 3 },
                { question: "For marks {55, 32, 48, 27, 61}, which roll numbers failed (1-based index)?", options: ["Roll 1 and Roll 3", "Roll 2 and Roll 4", "Roll 3 and Roll 5", "Roll 1 and Roll 5"], answerIndex: 1 },
                { question: "Which sequence of operations correctly resizes a calloc array from n to 2n elements safely?", options: ["free(ptr); ptr = calloc(2*n, sizeof(int));", "ptr = realloc(ptr, 2*n * sizeof(int));", "int *tmp = realloc(ptr, 2*n * sizeof(int));\n   if (tmp != NULL) ptr = tmp;", "ptr = malloc(2*n * sizeof(int));"], answerIndex: 2 },
                { question: "What is printed for n = 3 with all marks above pass mark?", options: ["Failed Students: (none listed)  Total failed: 0", "Failed Students: all three  Total failed: 3", "Segmentation fault", "Total failed: -1"], answerIndex: 0 }
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
            content: {
              aim: {
                text: "In this experiment, the student will understand the concept of dynamic memory allocation using self-referential structures in C. The student will create a singly linked list by dynamically allocating nodes using malloc() and traverse the list to display all elements. The student will:",
                bullets: [
                  "Understand what a self-referential structure is in C",
                  "Learn how nodes are created and linked using pointers",
                  "Implement insertion at the end of a linked list",
                  "Traverse and display the linked list from head to NULL",
                  "Understand how dynamic memory differs from static arrays"
                ]
              },
              theory: [
                {
                  title: "What is a Linked List?",
                  body: ["A linked list is a linear data structure where elements called nodes are stored in memory non-contiguously. Unlike arrays, linked list elements are not stored in adjacent memory locations. Each node holds data and a pointer to the next node."]
                },
                {
                  title: "Self-Referential Structure",
                  body: ["A structure that contains a pointer to itself is called a self-referential structure. This is the foundation of linked lists in C.\nStructure of a Node:", "data field — stores the actual integer value\nnext field — stores the address of the next node (pointer to same struct type)"]
                },
                {
                  title: "Head Pointer",
                  body: ["The head pointer always points to the first node of the list. If head is NULL the list is empty."]
                },
                {
                  title: "Tail Pointer",
                  body: ["The tail pointer tracks the last node. The last node always has its next pointer set to NULL indicating end of list."]
                },
                {
                  title: "Node Creation using malloc()",
                  body: ["malloc() allocates memory dynamically at runtime on the heap. sizeof(struct Node) gives the exact bytes needed for one node. The returned void pointer is cast to struct Node pointer."]
                },
                {
                  title: "Insertion at End",
                  body: ["For the first node — head and tail both point to it. For every subsequent node — tail's next points to new node, then tail moves to new node."]
                },
                {
                  title: "Traversal",
                  body: ["Start from head, print data, move to next node using cur = cur->next, repeat until cur becomes NULL."]
                },
                {
                  title: "Visual Structure for input 3 nodes: 10 20 30",
                  body: ["10 -> 20 -> 30 -> NULL", "Each arrow represents the next pointer storing the address of the following node."]
                },
                {
                  title: "Why Linked List over Array?",
                  body: ["Arrays have fixed size decided at compile time. Linked lists grow and shrink dynamically at runtime. Insertion and deletion are efficient in linked lists without shifting elements."]
                }
              ],
              pretest: [
                { question: "What is a self-referential structure in C?", options: ["A structure that calls itself like a function", "A structure that contains a pointer to its own type", "A structure inside another structure", "A structure with recursive fields"], answerIndex: 1 },
                { question: "Which function is used to dynamically allocate memory for a node?", options: ["alloc()", "new()", "malloc()", "create()"], answerIndex: 2 },
                { question: "What does the next pointer of the last node in a singly linked list contain?", options: ["Address of the first node", "Garbage value", "-1", "NULL"], answerIndex: 3 },
                { question: "What does the head pointer represent in a linked list?", options: ["The middle node", "The last node", "The first node", "The size of the list"], answerIndex: 2 },
                { question: "What is the time complexity of traversing a singly linked list of n nodes?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim carefully and understand what singly linked list means",
                "Go to Theory and study self-referential structures and how malloc() creates nodes",
                "Observe the Visual Structure diagram showing how 10 -> 20 -> 30 -> NULL looks in memory",
                "Go to Simulation tab and click Start",
                "Press Next step by step and observe how each node is created in memory",
                "Watch the head and tail pointers update as new nodes are added",
                "Observe the traversal phase where cur moves from head to NULL printing each value",
                "Note how the output panel fills with 10 -> 20 -> 30 -> NULL",
                "Go to Code Test tab",
                "The starter code is pre-loaded in the Monaco editor",
                "In the Stdin input box type the number of nodes first then the values",
                "Example input: 3 followed by 10 20 30",
                "Click Run Code",
                "Verify output matches: 10->20->30->NULL",
                "Try with different inputs — 5 nodes, different values",
                "Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint main() {\n    int n, i, val;\n    struct Node *head = NULL, *tail = NULL, *newNode, *cur;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &val);\n        newNode = (struct Node*)malloc(sizeof(struct Node));\n        newNode->data = val;\n        newNode->next = NULL;\n        if (head == NULL) {\n            head = newNode;\n            tail = newNode;\n        } else {\n            tail->next = newNode;\n            tail = newNode;\n        }\n    }\n    cur = head;\n    while (cur != NULL) {\n        printf(\"%d->\", cur->data);\n        cur = cur->next;\n    }\n    printf(\"NULL\\n\");\n    return 0;\n}",
                steps: [
                  { line: 8, annotation: "Declare head and tail", memory: [{ variable: "head", type: "Node*", value: "NULL" }, { variable: "tail", type: "Node*", value: "NULL" }], output: "" },
                  { line: 9, annotation: "Read n=3", memory: [{ variable: "n", type: "int", value: "3" }], output: "" },
                  { line: 10, annotation: "Loop i=0", memory: [{ variable: "i", type: "int", value: "0" }], output: "" },
                  { line: 11, annotation: "scanf val=10", memory: [{ variable: "val", type: "int", value: "10" }], output: "" },
                  { line: 12, annotation: "malloc Node 1 (addr 1001)", memory: [{ variable: "newNode", type: "Node*", value: "1001" }], output: "" },
                  { line: 13, annotation: "newNode->data = 10", memory: [{ variable: "newNode->data", type: "int", value: "10" }], output: "" },
                  { line: 14, annotation: "newNode->next = NULL", memory: [{ variable: "newNode->next", type: "Node*", value: "NULL" }], output: "" },
                  { line: 15, annotation: "head is NULL (first node)", memory: [], output: "" },
                  { line: 16, annotation: "head = 1001", memory: [{ variable: "head", type: "Node*", value: "1001" }], output: "" },
                  { line: 17, annotation: "tail = 1001", memory: [{ variable: "tail", type: "Node*", value: "1001" }], output: "" },
                  { line: 10, annotation: "Loop i=1", memory: [{ variable: "i", type: "int", value: "1" }], output: "" },
                  { line: 11, annotation: "scanf val=20", memory: [{ variable: "val", type: "int", value: "20" }], output: "" },
                  { line: 12, annotation: "malloc Node 2 (addr 2001)", memory: [{ variable: "newNode", type: "Node*", value: "2001" }], output: "" },
                  { line: 13, annotation: "newNode->data = 20", memory: [{ variable: "newNode->data", type: "int", value: "20" }], output: "" },
                  { line: 14, annotation: "newNode->next = NULL", memory: [{ variable: "newNode->next", type: "Node*", value: "NULL" }], output: "" },
                  { line: 19, annotation: "tail->next = 2001", memory: [{ variable: "tail->next", type: "Node*", value: "2001" }], output: "" },
                  { line: 20, annotation: "tail = 2001", memory: [{ variable: "tail", type: "Node*", value: "2001" }], output: "" },
                  { line: 10, annotation: "Loop i=2", memory: [{ variable: "i", type: "int", value: "2" }], output: "" },
                  { line: 11, annotation: "scanf val=30", memory: [{ variable: "val", type: "int", value: "30" }], output: "" },
                  { line: 12, annotation: "malloc Node 3 (addr 3001)", memory: [{ variable: "newNode", type: "Node*", value: "3001" }], output: "" },
                  { line: 13, annotation: "newNode->data = 30", memory: [{ variable: "newNode->data", type: "int", value: "30" }], output: "" },
                  { line: 14, annotation: "newNode->next = NULL", memory: [{ variable: "newNode->next", type: "Node*", value: "NULL" }], output: "" },
                  { line: 19, annotation: "tail->next = 3001", memory: [{ variable: "tail->next", type: "Node*", value: "3001" }], output: "" },
                  { line: 20, annotation: "tail = 3001", memory: [{ variable: "tail", type: "Node*", value: "3001" }], output: "" },
                  { line: 23, annotation: "Traversal starts, cur = head", memory: [{ variable: "cur", type: "Node*", value: "1001" }], output: "" },
                  { line: 25, annotation: "print 10->", memory: [], output: "10->" },
                  { line: 26, annotation: "cur = cur->next (2001)", memory: [{ variable: "cur", type: "Node*", value: "2001" }], output: "10->" },
                  { line: 25, annotation: "print 20->", memory: [], output: "10->20->" },
                  { line: 26, "annotation": "cur = cur->next (3001)", memory: [{ variable: "cur", type: "Node*", value: "3001" }], output: "10->20->" },
                  { line: 25, "annotation": "print 30->", memory: [], output: "10->20->30->" },
                  { line: 26, "annotation": "cur = cur->next (NULL)", memory: [{ variable: "cur", type: "Node*", value: "NULL" }], output: "10->20->30->" },
                  { line: 28, annotation: "print NULL", memory: [], output: "10->20->30->NULL\n" }
                ]
              },
              posttest: [
                { question: "What will be the output if input is n=4 and values are 5 15 25 35?", options: ["5-15-25-35-NULL", "5->15->25->35->NULL", "35->25->15->5->NULL", "5 15 25 35"], answerIndex: 1 },
                { question: "What happens to the memory allocated by malloc() if free() is never called?", options: ["It is automatically returned to OS when program ends on all systems", "It causes a memory leak", "The compiler frees it during compilation", "It gets reused automatically"], answerIndex: 1 },
                { question: "In a singly linked list, which direction can you traverse?", options: ["Both forward and backward", "Only backward", "Only forward from head to NULL", "Random access like arrays"], answerIndex: 2 },
                { question: "What is the value of head after inserting the very first node?", options: ["NULL", "Address of the new node", "Address of tail", "0"], answerIndex: 1 },
                { question: "If you want to insert a node at the beginning instead of end, which pointer needs to change?", options: ["tail->next", "head", "cur", "NULL pointer"], answerIndex: 1 }
              ],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "Reema Thareja, Data Structures Using C, 2nd Edition, Oxford University Press",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 10",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w10-2",
            title: "Structure vs Union Demo",
            desc: "Compare sizes of struct and union.",
            expected: "Different sizes shown",
            content: {
              aim: {
                text: "In this experiment the student will understand the fundamental difference between structures and unions in C by comparing their memory sizes and observing how data is stored in each. The student will use sizeof() operator to measure and compare how memory is allocated differently for struct and union with identical fields. The student will:",
                bullets: [
                  "Define a structure and a union with identical fields",
                  "Use sizeof() to measure memory consumed by each",
                  "Understand why struct size is sum of all fields but union size is largest field only",
                  "Observe how writing to one union member affects other members",
                  "Understand real-world use cases for each"
                ]
              },
              theory: [
                {
                  title: "What is a Structure?",
                  body: ["A structure is a user-defined data type that groups multiple variables of different data types under one name. Each member gets its own separate memory location. Total size of a struct equals the sum of sizes of all its members (plus possible padding bytes added by compiler for alignment).", "Example with int i (4 bytes) + float f (4 bytes) + char c (1 byte) = minimum 9 bytes, compiler may pad to 12 bytes for alignment."]
                },
                {
                  title: "What is a Union?",
                  body: ["A union is also a user-defined data type that groups multiple variables under one name. But all members share the same memory location. The size of a union equals the size of its largest member only. Only one member can hold a valid value at any given time.", "Example with int i (4 bytes) + float f (4 bytes) + char c (1 byte) = 4 bytes total (largest member size)."]
                },
                {
                  title: "Key Difference Table",
                  body: [
                    "Feature | Structure | Union",
                    "Memory | Separate for each member | Shared single location",
                    "Size | Sum of all members | Size of largest member",
                    "Access | All members valid simultaneously | Only last written member valid",
                    "Use case | Store multiple data together | Save memory, store one of many types"
                  ]
                },
                {
                  title: "Padding in Structures",
                  body: ["Compilers add padding bytes between members to align data on word boundaries for faster CPU access. This is why struct size may be larger than the raw sum of members."]
                },
                {
                  title: "When to use Union?",
                  body: ["Unions are used in embedded systems, network packet parsing, and anywhere memory is extremely limited and only one field is needed at a time."]
                }
              ],
              pretest: [
                { question: "What is the size of a union containing int (4 bytes), float (4 bytes), and char (1 byte)?", options: ["9 bytes", "1 byte", "4 bytes", "12 bytes"], answerIndex: 2 },
                { question: "In a union, what happens when you write a value to one member and then read another member?", options: ["Both members hold correct values", "The other member gives undefined or overwritten value", "The program crashes", "Compiler gives error"], answerIndex: 1 },
                { question: "Which operator is used to find the memory size of a structure or union?", options: ["length()", "size()", "sizeof()", "memsize()"], answerIndex: 2 },
                { question: "Why does a structure sometimes have a larger size than the sum of its members?", options: ["Extra security bytes added", "Compiler adds padding for memory alignment", "Member names take extra space", "typedef adds overhead"], answerIndex: 1 },
                { question: "Which of the following is a correct use case for a union?", options: ["Storing student name, roll number, and marks together", "Storing either an int or float value at a time to save memory", "Creating a linked list node", "Storing multiple strings"], answerIndex: 1 }
              ],
              procedure: [
                "Read Theory carefully focusing on the difference table between struct and union",
                "Go to Simulation tab and observe how memory is allocated differently for each",
                "Watch how struct gives separate boxes for each member and union gives one shared box",
                "Observe the sizeof() output for both in the simulation output panel",
                "Go to Code Test tab — starter code is pre-loaded",
                "No stdin input needed for this program",
                "Click Run Code",
                "Note the two lines of output showing sizes of struct and union",
                "Observe that struct size is larger than union size even with same fields",
                "Try adding more members to both in the editor and re-run to see size change",
                "Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nstruct S {\n    int i;\n    float f;\n    char c;\n};\n\nunion U {\n    int i;\n    float f;\n    char c;\n};\n\nint main() {\n    printf(\"Size of Struct=%lu\\n\", sizeof(struct S));\n    printf(\"Size of Union=%lu\\n\", sizeof(union U));\n    return 0;\n}",
                steps: [
                  { line: 3, annotation: "struct S defined (int, float, char)", memory: [], output: "" },
                  { line: 9, annotation: "union U defined (int, float, char)", memory: [], output: "" },
                  { line: 16, annotation: "sizeof(struct S) evaluated (12 bytes)", memory: [], output: "Size of Struct=12\n" },
                  { line: 17, annotation: "sizeof(union U) evaluated (4 bytes)", memory: [], output: "Size of Struct=12\nSize of Union=4\n" }
                ]
              },
              posttest: [
                { question: "On a system where int=4, float=4, char=1, what is the minimum possible size of a union containing all three?", options: ["9 bytes", "1 byte", "4 bytes", "Depends on compiler"], answerIndex: 2 },
                { question: "If you assign 65 to the int member of a union and then read the char member, what do you most likely get?", options: ["0", "Compiler error", "'A' (ASCII 65)", "Garbage always"], answerIndex: 2 },
                { question: "What is padding in a structure?", options: ["Extra fields added by programmer", "Empty bytes added by compiler for alignment", "Security bits added by OS", "Null terminators between members"], answerIndex: 1 },
                { question: "Can a structure and union have the same member names?", options: ["No, names must be globally unique", "Yes, member names are scoped to their type", "Only if they are in different files", "Only for primitive types"], answerIndex: 1 },
                { question: "Which of the following statements is TRUE about unions?", options: ["All members can be used simultaneously", "Union size equals sum of all members", "Only the most recently written member holds a valid value", "Unions cannot contain float members"], answerIndex: 2 }
              ],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 10",
                "GCC Documentation on Structures and Unions: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
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
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to compute the binomial coefficient nCr (n choose r) using a dedicated factorial function, demonstrating modular programming through function definition, declaration, and call by value. The student will:",
                bullets: [
                  "Write a long long factorial(int n) function and call it from main()",
                  "Understand call by value — changes to parameters inside a function do not affect the caller's variables",
                  "Understand function scope — local variables declared inside a function are not visible outside it",
                  "Apply the formula: nCr = n! / (r! * (n-r)!)",
                  "Validate inputs (r <= n, both non-negative) before computing",
                  "Use printf() with %lld to display the result"
                ]
              },
              theory: [
                {
                  title: "Modular Programming",
                  body: ["Breaking a program into independent, reusable functions. Each function has a single responsibility. main() orchestrates calls; helper functions perform specific computations. Benefits include readability, reusability, and easier debugging."]
                },
                {
                  title: "Function Definition",
                  body: ["Syntax:\n  return_type function_name(parameter_list) {\n      // body\n      return value;\n  }\nExample:\n  long long factorial(int n) {\n      long long fact = 1;\n      for (int i = 1; i <= n; i++) fact *= i;\n      return fact;\n  }"]
                },
                {
                  title: "Function Declaration (Prototype)",
                  body: ["Placed before main() so the compiler knows the function's signature before it is called:\n  long long factorial(int n);"]
                },
                {
                  title: "Call by Value",
                  body: ["C passes arguments by copying their values into the function's local parameters. Modifying the parameter inside the function has no effect on the original variable in the caller:\n  void modify(int x) { x = 100; }   // caller's variable unchanged\n  int a = 5; modify(a);             // a is still 5 after the call"]
                },
                {
                  title: "Scope",
                  body: ["A variable declared inside a function is local to that function. It is created when the function is called and destroyed when it returns. Variables in main() are not accessible inside factorial() and vice versa."]
                },
                {
                  title: "nCr Formula",
                  body: ["nCr = n! / (r! × (n-r)!)\nFor n = 5, r = 2:\n  5C2 = 120 / (2 × 6) = 120 / 12 = 10"]
                },
                {
                  title: "Input Validation",
                  body: ["if (r > n || n < 0 || r < 0) → invalid input\nnC0 = nCn = 1 (edge cases, naturally handled by factorial formula)"]
                },
                {
                  title: "Overflow Consideration",
                  body: ["Factorials grow rapidly. Use long long and limit n to reasonable values (n ≤ 20 for long long). For larger n, use the multiplicative formula to avoid intermediate overflow."]
                }
              ],
              pretest: [
                { question: "What does call by value mean in C?", options: ["The function receives the address of the variable", "The function receives a copy of the variable's value", "The caller's variable is modified by the function", "Values are passed through global variables"], answerIndex: 1 },
                { question: "What is 5C2?", options: ["20", "10", "5", "120"], answerIndex: 1 },
                { question: "What is the formula for nCr?", options: ["n! / r!", "n! / (r! * (n+r)!)", "n! / (r! * (n-r)!)", "(n-r)! / (n! * r!)"], answerIndex: 2 },
                { question: "What is the scope of a variable declared inside a function?", options: ["Global — accessible everywhere in the program", "Local — accessible only within that function", "Accessible in all functions called after it", "Accessible in main() only"], answerIndex: 1 },
                { question: "What is 0!?", options: ["0", "Undefined", "-1", "1"], answerIndex: 3 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the three factorial calls for n, r, and (n-r).",
                "Observe how call by value preserves the caller's n and r across all three calls.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n and r — e.g. 5 2",
                "Click Run Code. Verify output: 5C2 = 10",
                "Try edge cases: n = r (answer = 1), r = 0 (answer = 1), and r > n (invalid). Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nlong long factorial(int n) {\n    long long fact = 1;\n    int i;\n    for (i = 1; i <= n; i++) {\n        fact *= i;\n    }\n    return fact;\n}\n\nint main() {\n    int n, r;\n    long long nCr;\n    scanf(\"%d %d\", &n, &r);\n    if (r > n || n < 0 || r < 0) {\n        printf(\"Invalid input\\n\");\n        return 1;\n    }\n    nCr = factorial(n) / (factorial(r) * factorial(n - r));\n    printf(\"%dC%d = %lld\\n\", n, r, nCr);\n    return 0;\n}",
                steps: [
                  { line: 12, annotation: "Declare variables", memory: [{ variable: "n", type: "int", value: "?" }, { variable: "r", type: "int", value: "?" }, { variable: "nCr", type: "long long", value: "?" }], output: "" },
                  { line: 14, annotation: "Read n=5, r=2", memory: [{ variable: "n", type: "int", value: "5" }, { variable: "r", type: "int", value: "2" }], output: "" },
                  { line: 15, annotation: "Check input validity", memory: [], output: "" },
                  { line: 19, annotation: "Call factorial(n) where n=5", memory: [], output: "" },
                  { line: 3, annotation: "factorial(5) starts", memory: [{ variable: "fact", type: "long long", value: "1" }], output: "" },
                  { line: 5, annotation: "Loop i=1 to 5", memory: [], output: "" },
                  { line: 6, annotation: "fact = 120", memory: [{ variable: "fact", type: "long long", value: "120" }], output: "" },
                  { line: 8, annotation: "Return 120", memory: [], output: "" },
                  { line: 19, annotation: "Call factorial(r) where r=2", memory: [], output: "" },
                  { line: 3, annotation: "factorial(2) starts", memory: [{ variable: "fact", type: "long long", value: "1" }], output: "" },
                  { line: 5, annotation: "Loop i=1 to 2", memory: [], output: "" },
                  { line: 6, annotation: "fact = 2", memory: [{ variable: "fact", type: "long long", value: "2" }], output: "" },
                  { line: 8, annotation: "Return 2", memory: [], output: "" },
                  { line: 19, annotation: "Call factorial(n-r) where n-r=3", memory: [], output: "" },
                  { line: 3, annotation: "factorial(3) starts", memory: [{ variable: "fact", type: "long long", value: "1" }], output: "" },
                  { line: 5, annotation: "Loop i=1 to 3", memory: [], output: "" },
                  { line: 6, annotation: "fact = 6", memory: [{ variable: "fact", type: "long long", value: "6" }], output: "" },
                  { line: 8, annotation: "Return 6", memory: [], output: "" },
                  { line: 19, annotation: "Calculate nCr = 120 / (2 * 6) = 10", memory: [{ variable: "nCr", type: "long long", value: "10" }], output: "" },
                  { line: 20, annotation: "Print result", memory: [], output: "5C2 = 10\n" }
                ]
              },
              posttest: [
                { question: "What is 10C3?", options: ["100", "720", "120", "210"], answerIndex: 2 },
                { question: "What is nC0 for any non-negative n?", options: ["n", "0", "n!", "1"], answerIndex: 3 },
                { question: "What is nCn for any non-negative n?", options: ["0", "n", "1", "n!"], answerIndex: 2 },
                { question: "If a function modifies its local copy of parameter x, what happens to the original variable passed by the caller?", options: ["It is also modified", "It is set to 0", "It is unchanged", "It is incremented by 1"], answerIndex: 2 },
                { question: "What is 6C4?", options: ["30", "20", "360", "15"], answerIndex: 3 }
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
            id: "c-w11-2",
            title: "String Length without strlen",
            desc: "Calculate the length of a string using a custom function.",
            expected: "Length=X",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to compute the length of a string without using the standard library strlen() function, implementing the count in a separate user-defined function to demonstrate modular programming and pointer-based string traversal. The student will:",
                bullets: [
                  "Write an int stringLength(char *str) function that traverses the string manually",
                  "Understand how the null terminator '\\0' marks the end of a string",
                  "Demonstrate call by value for the pointer — the address is copied but the original pointer in the caller is unaffected",
                  "Understand the scope of the loop counter inside the function",
                  "Compare the manual result with strlen() for verification",
                  "Use printf() with %d to display the computed length"
                ]
              },
              theory: [
                {
                  title: "String Length",
                  body: ["The length of a C string is the number of characters before the null terminator '\\0'. strlen(\"Hello\") = 5. The null terminator itself is not counted."]
                },
                {
                  title: "Manual Length Function",
                  body: ["Traverse using a counter until '\\0' is reached:\n  int stringLength(char *str) {\n      int count = 0;\n      while (str[count] != '\\0')\n          count++;\n      return count;\n  }\nAlternatively using pointer arithmetic:\n  int stringLength(char *str) {\n      char *p = str;\n      while (*p != '\\0') p++;\n      return (int)(p - str);\n  }\nBoth approaches are equivalent."]
                },
                {
                  title: "Call by Value for Pointers",
                  body": ["When a char* pointer is passed to a function, the address value is copied into the parameter. The function can read and traverse the string through this copy, but reassigning the parameter (str = something_else) does not affect the caller's pointer. Note: the string contents themselves can be modified through the pointer (this is call by value of the address, not call by value of the data)."]
                },
                {
                  title: "Pointer Arithmetic",
                  body: ["p - str gives the number of elements between the two pointers. For a char array, this equals the number of characters traversed."]
                },
                {
                  title: "Null Terminator Detection",
                  body: ["str[i] != '\\0' and *p != '\\0' are equivalent checks. '\\0' has integer value 0, so while (str[i]) also works as a compact loop condition."]
                },
                {
                  title: "Scope of count",
                  body: ["The variable count is local to stringLength(). It exists only during the function call and is destroyed on return. The caller receives the return value, not direct access to count."]
                },
                {
                  title: "Edge Cases",
                  body: ["Empty string \"\"   : length = 0 (loop body never executes)\nSingle char \"a\"   : length = 1\nString with spaces: spaces are counted as regular characters"]
                }
              ],
              pretest: [
                { question: "What is the length of the string \"Hello\"?", options: ["6", "4", "5", "0"], answerIndex: 2 },
                { question: "What character marks the end of a C string?", options: ["'.'", "' '", "'\\n'", "'\\0'"], answerIndex: 3 },
                { question: "What is the length of an empty string \"\"?", options: ["1", "-1", "0", "Undefined"], answerIndex: 2 },
                { question: "When a char* pointer is passed to a function by value, what is copied?", options: ["The entire string contents", "Only the first character", "The memory address stored in the pointer", "The null terminator"], answerIndex: 2 },
                { question: "What does the expression (p - str) return when p has advanced past n characters from str?", options: ["The address of p", "n — the number of characters traversed", "The value at *p", "sizeof(char*)"], answerIndex: 1 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the while loop for str = \"Hello\".",
                "Observe how count increments from 0 to 5 and the loop exits when str[5] == '\\0'.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a string — e.g. Hello",
                "Click Run Code. Verify output: Length: 5",
                "Try an empty string, a string with spaces (use fgets), and a long string. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint stringLength(char *str) {\n    int count = 0;\n    while (str[count] != '\\0') {\n        count++;\n    }\n    return count;\n}\n\nint main() {\n    char str[100];\n    int len;\n    scanf(\"%s\", str);\n    len = stringLength(str);\n    printf(\"Length: %d\\n\", len);\n    return 0;\n}",
                steps: [
                  { line: 12, annotation: "Declare variables", memory: [{ variable: "str", type: "char[]", value: "?" }, { variable: "len", type: "int", value: "?" }], output: "" },
                  { line: 14, annotation: "Read str=\"Hello\"", memory: [{ variable: "str", type: "char[]", value: "\"Hello\"" }], output: "" },
                  { line: 15, annotation: "Call stringLength(str)", memory: [], output: "" },
                  { line: 3, annotation: "stringLength starts, str points to \"Hello\"", memory: [], output: "" },
                  { line: 4, annotation: "Initialize count = 0", memory: [{ variable: "count", type: "int", value: "0" }], output: "" },
                  { line: 5, annotation: "str[0] is 'H', != '\\0'", memory: [], output: "" },
                  { line: 6, annotation: "count++", memory: [{ variable: "count", type: "int", value: "1" }], output: "" },
                  { line: 5, annotation: "str[1] is 'e', != '\\0'", memory: [], output: "" },
                  { line: 6, annotation: "count++", memory: [{ variable: "count", type: "int", value: "2" }], output: "" },
                  { line: 5, annotation: "str[2] is 'l', != '\\0'", memory: [], output: "" },
                  { line: 6, annotation: "count++", memory: [{ variable: "count", type: "int", value: "3" }], output: "" },
                  { line: 5, annotation: "str[3] is 'l', != '\\0'", memory: [], output: "" },
                  { line: 6, annotation: "count++", memory: [{ variable: "count", type: "int", value: "4" }], output: "" },
                  { line: 5, annotation: "str[4] is 'o', != '\\0'", memory: [], output: "" },
                  { line: 6, annotation: "count++", memory: [{ variable: "count", type: "int", value: "5" }], output: "" },
                  { line: 5, annotation: "str[5] is '\\0'", memory: [], output: "" },
                  { line: 8, annotation: "Return count (5)", memory: [], output: "" },
                  { line: 15, annotation: "len = 5", memory: [{ variable: "len", type: "int", value: "5" }], output: "" },
                  { line: 16, annotation: "Print Length", memory: [], output: "Length: 5\n" }
                ]
              },
              posttest: [
                { question: "What is the length of \"C Programming\"?", options: ["12", "14", "13", "15"], answerIndex: 2 },
                { question: "What is the length of \" \" (a single space)?", options: ["0", "2", "1", "Undefined"], answerIndex: 2 },
                { question: "What is the length of \"\\\\0\" (backslash followed by zero as characters)?", options: ["0", "1", "2", "Undefined"], answerIndex: 2 },
                { question: "What does the function return for input \"abcde\\0fg\" (where \\0 is an actual null byte in the middle)?", options: ["8", "7", "3", "5"], answerIndex: 3 },
                { question: "Why is strlen() not used in this experiment?", options: ["strlen() is incorrect for long strings", "To practice implementing string traversal manually using a user-defined function, demonstrating loop logic and null terminator detection", "strlen() requires math.h", "strlen() counts the null terminator"], answerIndex: 1 }
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
            id: "c-w11-3",
            title: "Matrix Transpose",
            desc: "Transpose a matrix via a function.",
            expected: "Transposed matrix",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a matrix from the user, compute its transpose using a dedicated function, and display both the original and transposed matrices. The student will:",
                bullets: [
                  "Define a void transpose(int A[][MAX], int B[][MAX], int rows, int cols) function",
                  "Pass 2D arrays to a function and understand how array addresses are passed",
                  "Compute the transpose by assigning B[j][i] = A[i][j] for all valid i, j",
                  "Understand the scope of loop counters and matrix elements inside the function",
                  "Demonstrate that 2D array contents are modifiable through a passed pointer (call by reference of array data, call by value of dimension parameters)",
                  "Display original and transposed matrices with formatted printf() output"
                ]
              },
              theory: [
                {
                  title: "Matrix Transpose",
                  body: ["The transpose of an m × n matrix A is an n × m matrix B where:\n  B[j][i] = A[i][j]   for all i in [0, m-1] and j in [0, n-1]\nRow i of A becomes column i of B. The dimensions swap: an m × n matrix transposes to an n × m matrix."]
                },
                {
                  title: "Example",
                  body: ["A (2×3):            Transpose B (3×2):\n  1  2  3             1  4\n  4  5  6             2  5\n                      3  6"]
                },
                {
                  title: "Passing 2D Arrays to Functions",
                  body: ["In C, a 2D array passed to a function decays to a pointer to its first row. The column dimension must be specified in the parameter:\n  void transpose(int A[][MAX], int B[][MAX], int rows, int cols)\nMAX is a compile-time constant (e.g. #define MAX 10). The row count is passed as a runtime parameter."]
                },
                {
                  title: "Why Array Data Is Modified",
                  body: ["Arrays are not copied when passed to functions; the function receives the base address. Modifications to B[j][i] inside the function are directly reflected in the caller's array — this is effectively call by reference for array contents. The dimension variables rows and cols are passed by value."]
                },
                {
                  title: "In-Place Transpose (Square Matrices Only)",
                  body: ["For a square n × n matrix, the transpose can be done in-place by swapping A[i][j] and A[j][i] for i < j only (not both, to avoid double-swapping):\n  for (i = 0; i < n; i++)\n      for (j = i+1; j < n; j++) {\n          temp = A[i][j]; A[i][j] = A[j][i]; A[j][i] = temp;\n      }\nFor non-square matrices, a second matrix B is required."]
                },
                {
                  title: "Scope of Loop Variables",
                  body: ["Loop counters i and j declared inside the function are local to that function and do not conflict with any same-named variables in main()."]
                },
                {
                  title: "Time and Space Complexity",
                  body: ["Time Complexity — O(m × n): every element is copied exactly once.\nSpace Complexity — O(m × n) for the result matrix B (O(1) extra for in-place)."]
                }
              ],
              pretest: [
                { question: "If A is a 3×4 matrix, what are the dimensions of its transpose?", options: ["3×4", "4×4", "3×3", "4×3"], answerIndex: 3 },
                { question: "What is the relationship between A[i][j] and its transpose B[j][i]?", options: ["B[j][i] = A[i][j] + 1", "B[j][i] = A[j][i]", "B[j][i] = A[i][j]", "B[i][j] = A[j][i] + A[i][j]"], answerIndex: 2 },
                { question: "For A = {{1,2,3},{4,5,6}}, what is B[2][0] (0-based)?", options: ["6", "4", "2", "3"], answerIndex: 3 },
                { question: "Why must the column dimension MAX be specified in the function parameter for a 2D array?", options: ["So the compiler can calculate the address of A[i][j] using row-major layout", "Because rows are stored separately", "To avoid stack overflow", "Because C does not support 2D arrays in functions"], answerIndex: 0 },
                { question: "Can the in-place transpose (swapping A[i][j] and A[j][i]) be applied to a non-square matrix?", options: ["Yes, always", "Yes, but only for even dimensions", "No — the dimensions change, so a second array is required", "Yes, by swapping with a temporary variable"], answerIndex: 2 }
              ],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace B[j][i] = A[i][j] assignments for a 2×3 matrix.",
                "Observe how the function modifies the caller's B array through the base address.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter rows, cols, then the matrix row by row. e.g. 2 3  1 2 3 4 5 6",
                "Click Run Code. Verify: Original (2×3):  1 2 3 / 4 5 6 | Transpose (3×2): 1 4 / 2 5 / 3 6",
                "Try a square 3×3 matrix and a 1×5 row matrix. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#define MAX 10\n\nvoid transpose(int A[][MAX], int B[][MAX], int rows, int cols) {\n    int i, j;\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            B[j][i] = A[i][j];\n        }\n    }\n}\n\nint main() {\n    int A[MAX][MAX], B[MAX][MAX];\n    int rows, cols, i, j;\n    scanf(\"%d %d\", &rows, &cols);\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            scanf(\"%d\", &A[i][j]);\n        }\n    }\n    transpose(A, B, rows, cols);\n    printf(\"Transpose:\\n\");\n    for (i = 0; i < cols; i++) {\n        for (j = 0; j < rows; j++) {\n            printf(\"%d \", B[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                steps: [
                  { line: 15, annotation: "Declare variables", memory: [{ variable: "rows", type: "int", value: "?" }, { variable: "cols", type: "int", value: "?" }], output: "" },
                  { line: 16, annotation: "Read rows=2, cols=3", memory: [{ variable: "rows", type: "int", value: "2" }, { variable: "cols", type: "int", value: "3" }], output: "" },
                  { line: 17, annotation: "Read matrix A elements", memory: [], output: "" },
                  { line: 22, annotation: "Call transpose(A, B, 2, 3)", memory: [], output: "" },
                  { line: 4, annotation: "transpose starts", memory: [], output: "" },
                  { line: 6, annotation: "Nested loop to assign B[j][i] = A[i][j]", memory: [], output: "" },
                  { line: 8, annotation: "B[0][0]=A[0][0], B[1][0]=A[0][1], ...", memory: [], output: "" },
                  { line: 11, annotation: "transpose complete, returns", memory: [], output: "" },
                  { line: 23, annotation: "Print Transpose:", memory: [], output: "Transpose:\n" },
                  { line: 24, annotation: "Print matrix B", memory: [], output: "" },
                  { line: 26, "annotation": "Print row 1", "memory": [], "output": "Transpose:\n1 4 \n" },
                  { line: 26, "annotation": "Print row 2", "memory": [], "output": "Transpose:\n1 4 \n2 5 \n" },
                  { line: 26, "annotation": "Print row 3", "memory": [], "output": "Transpose:\n1 4 \n2 5 \n3 6 \n" }
                ]
              },
              posttest: [
                { question: "For matrix A = {{1,2},{3,4},{5,6}} (3×2), what is the transpose?", options: ["{{1,3,5},{2,4,6}}", "{{1,2,3},{4,5,6}}", "{{6,5},{4,3},{2,1}}", "{{2,4,6},{1,3,5}}"], answerIndex: 0 },
                { question: "What is the transpose of an identity matrix?", options: ["A zero matrix", "The matrix doubled", "The identity matrix itself", "Undefined"], answerIndex: 2 },
                { question: "For a 1×5 matrix {10, 20, 30, 40, 50}, what is its transpose?", options: ["{50, 40, 30, 20, 10}", "A 5×1 column matrix with the same values", "A 5×5 matrix", "{10, 20, 30, 40, 50} unchanged"], answerIndex: 1 },
                { question: "In the in-place square matrix transpose, why does the inner loop start at j = i+1?", options: ["To skip the diagonal elements and avoid double-swapping", "Because row 0 never needs transposing", "To sort the elements", "Because j = i would cause division by zero"], answerIndex: 0 },
                { question: "What is the time complexity of transposing an m × n matrix into a second matrix B?", options: ["O(m + n)", "O(m²)", "O(m × n)", "O(n²)"], answerIndex: 2 }
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
            content: {
              aim: {
                text: "In this experiment the student will understand how recursion works in C by implementing the Fibonacci series. The student will learn how a function calls itself repeatedly with smaller inputs until it reaches a base case and how the call stack builds and unwinds during recursive execution. The student will:",
                bullets: [
                  "Understand the concept of recursion and base case",
                  "Implement a recursive function fib(n) that returns the nth Fibonacci number",
                  "Understand how recursive calls stack up in memory",
                  "Trace the recursive call tree for small inputs",
                  "Observe how fib(n) = fib(n-1) + fib(n-2) breaks down to fib(0) and fib(1)"
                ]
              },
              theory: [
                {
                  title: "What is Recursion?",
                  body: ["Recursion is a programming technique where a function calls itself to solve a smaller version of the same problem. Every recursive solution has two parts — a base case that stops the recursion and a recursive case that breaks the problem down further."]
                },
                {
                  title: "Fibonacci Series",
                  body: ["The Fibonacci series is a sequence where each number is the sum of the two preceding numbers.\nSeries: 0 1 1 2 3 5 8 13 21 34 ...\nMathematical definition:\nfib(0) = 0 — base case\nfib(1) = 1 — base case\nfib(n) = fib(n-1) + fib(n-2) — recursive case for n greater than 1"]
                },
                {
                  title: "Recursive Call Tree for fib(4)",
                  body: ["fib(4) calls fib(3) and fib(2)\nfib(3) calls fib(2) and fib(1)\nfib(2) calls fib(1) and fib(0)\nEach call adds a new frame to the call stack. When base case is hit the function returns and the stack unwinds back up."]
                },
                {
                  title: "Call Stack Concept",
                  body: ["Every function call occupies a stack frame in memory containing its local variables and return address. For fib(5) the maximum stack depth is 5 frames deep. This is why deep recursion on large n causes stack overflow."]
                },
                {
                  title: "Time Complexity Warning",
                  body: ["Naive recursive Fibonacci recalculates the same subproblems multiple times. fib(30) makes over a million function calls. This is inefficient but perfectly illustrates recursion for learning purposes."]
                },
                {
                  title: "Base Case Importance",
                  body: ["Without base cases fib(0)=0 and fib(1)=1 the function would recurse infinitely and crash with a stack overflow error."]
                }
              ],
              pretest: [
                { question: "What are the two base cases in the recursive Fibonacci function?", options: ["fib(0)=1 and fib(1)=1", "fib(0)=0 and fib(1)=1", "fib(1)=0 and fib(2)=1", "fib(0)=0 and fib(2)=1"], answerIndex: 1 },
                { question: "What is fib(6) in the Fibonacci series starting from fib(0)=0?", options: ["5", "13", "8", "21"], answerIndex: 2 },
                { question: "What happens if a recursive function has no base case?", options: ["It returns 0 automatically", "It runs once and stops", "It causes infinite recursion and stack overflow", "Compiler gives syntax error"], answerIndex: 2 },
                { question: "In recursion, what is a call stack?", options: ["A queue of function calls waiting to execute", "Memory that stores each active function call frame", "A list of return values", "The heap memory used by malloc"], answerIndex: 1 },
                { question: "For fib(5), what is the correct value?", options: ["3", "8", "5", "13"], answerIndex: 2 }
              ],
              procedure: [
                "Read Aim and understand what Fibonacci series means mathematically",
                "Go to Theory and study the recursive definition fib(n) = fib(n-1) + fib(n-2)",
                "Trace fib(4) manually on paper using the call tree before running the simulation",
                "Go to Simulation tab and click Start",
                "Press Next step by step and observe how the call stack builds up frame by frame",
                "Watch how each fib() call splits into two more calls until base case is reached",
                "Observe the stack unwinding phase where return values bubble back up",
                "Note the final output showing the complete Fibonacci series",
                "Go to Code Test tab — starter code pre-loaded",
                "In Stdin input box enter how many terms you want — example: 7",
                "Click Run Code",
                "Verify output: 0 1 1 2 3 5 8",
                "Try n=10 and verify: 0 1 1 2 3 5 8 13 21 34. Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint fib(int n) {\n    if (n <= 1) {\n        return n;\n    }\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    int n = 5, i;\n    for (i = 0; i < n; i++) {\n        printf(\"%d \", fib(i));\n    }\n    printf(\"\\n\");\n    return 0;\n}",
                steps: [
                  { line: 3, annotation: "fib(n) defined with base cases", memory: [], output: "" },
                  { line: 11, annotation: "main() calls fib(0)", memory: [{ variable: "i", type: "int", value: "0" }], output: "" },
                  { line: 4, annotation: "fib(0) hits base case immediately", memory: [], output: "" },
                  { line: 5, annotation: "Returns 0", memory: [], output: "" },
                  { line: 13, annotation: "Output panel: 0", memory: [], output: "0 " },
                  { line: 11, annotation: "main() calls fib(1)", memory: [{ variable: "i", type: "int", value: "1" }], output: "" },
                  { line: 4, annotation: "fib(1) hits base case immediately", memory: [], output: "" },
                  { line: 5, annotation: "Returns 1", memory: [], output: "" },
                  { line: 13, annotation: "Output panel: 0 1", memory: [], output: "0 1 " },
                  { line: 11, annotation: "main() calls fib(2)", memory: [{ variable: "i", type: "int", value: "2" }], output: "" },
                  { line: 7, annotation: "fib(2) = fib(1) + fib(0) = 1 + 0 = 1", memory: [], output: "" },
                  { line: 13, annotation: "Output panel: 0 1 1", memory: [], output: "0 1 1 " },
                  { line: 11, annotation: "main() calls fib(3)", memory: [{ variable: "i", type: "int", value: "3" }], output: "" },
                  { line: 7, annotation: "fib(3) = fib(2) + fib(1) = 1 + 1 = 2", memory: [], output: "" },
                  { line: 13, annotation: "Output panel: 0 1 1 2", memory: [], output: "0 1 1 2 " },
                  { line: 11, annotation: "main() calls fib(4)", memory: [{ variable: "i", type: "int", value: "4" }], output: "" },
                  { line: 7, annotation: "fib(4) = fib(3) + fib(2) = 2 + 1 = 3", memory: [], output: "" },
                  { line: 13, annotation: "Output panel: 0 1 1 2 3", memory: [], output: "0 1 1 2 3 " }
                ]
              },
              posttest: [
                { question: "What is the output of the program when n=1?", options: ["0 1", "1", "0", "Error"], answerIndex: 2 },
                { question: "How many times is fib(2) called when computing fib(5)?", options: ["1", "3", "2", "5"], answerIndex: 1 },
                { question: "What is the maximum call stack depth when computing fib(6)?", options: ["3", "4", "6", "12"], answerIndex: 2 },
                { question: "Which modification would make Fibonacci use iteration instead of recursion?", options: ["Add another base case", "Replace recursive calls with a for loop storing previous two values", "Use malloc to store values", "Call fib() from a different function"], answerIndex: 1 },
                { question: "What happens when you call fib(50) with naive recursion?", options: ["Returns answer instantly", "Takes extremely long due to repeated subproblem recalculation", "Causes compile error", "Returns wrong answer always"], answerIndex: 1 }
              ],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 12",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w12-2",
            title: "Factorial Recursive",
            desc: "Calculate factorial recursively.",
            expected: "Factorial=X",
            content: {
              aim: {
                text: "In this experiment the student will implement the factorial function recursively in C and understand how each recursive call reduces the problem size by one until the base case n=0 is reached. The student will observe how the call stack builds and unwinds cleanly for factorial compared to Fibonacci. The student will:",
                bullets: [
                  "Understand factorial as a naturally recursive mathematical definition",
                  "Implement fact(n) = n multiplied by fact(n-1) with base case fact(0) = 1",
                  "Trace the call stack frame by frame for small n values",
                  "Observe how return values multiply back up during stack unwinding",
                  "Compare recursive factorial with iterative factorial mentally"
                ]
              },
              theory: [
                {
                  title: "Factorial Definition",
                  body: ["Factorial of n written as n! is the product of all positive integers from 1 to n.\nMathematical definition:\nfact(0) = 1 — base case\nfact(n) = n multiplied by fact(n-1) — recursive case for n greater than 0\nExamples:\n0! = 1\n3! = 3 × 2 × 1 = 6\n5! = 5 × 4 × 3 × 2 × 1 = 120"]
                },
                {
                  title: "Why Factorial is Naturally Recursive",
                  body: ["fact(5) depends on fact(4), which depends on fact(3), all the way down to fact(0). Each call solves a slightly smaller version of the same problem — this is the essence of recursion."]
                },
                {
                  title: "Call Stack Trace for fact(4)",
                  body: ["fact(4) calls fact(3)\nfact(3) calls fact(2)\nfact(2) calls fact(1)\nfact(1) calls fact(0)\nfact(0) returns 1 — base case hit\nfact(1) returns 1 × 1 = 1\nfact(2) returns 2 × 1 = 2\nfact(3) returns 3 × 2 = 6\nfact(4) returns 4 × 6 = 24"]
                },
                {
                  title: "Linear Recursion",
                  body: ["Factorial is linear recursion — each call makes exactly one recursive call unlike Fibonacci which makes two. This means the call stack depth equals n and the time complexity is O(n)."]
                },
                {
                  title: "Integer Overflow Warning",
                  body: ["Factorial grows very fast. fact(13) exceeds the range of int (2,147,483,647). For large n use long or unsigned long long to avoid overflow."]
                }
              ],
              pretest: [
                { question: "What is the base case for the recursive factorial function?", options: ["fact(1) = 1", "fact(0) = 1", "fact(0) = 0", "fact(n) = 0"], answerIndex: 1 },
                { question: "What is the value of fact(5)?", options: ["60", "100", "120", "24"], answerIndex: 2 },
                { question: "How many recursive calls does fact(4) make before reaching the base case?", options: ["3", "4", "5", "2"], answerIndex: 1 },
                { question: "What is the return type of the factorial function for large inputs?", options: ["int is always sufficient", "long or long long to avoid overflow", "float", "char"], answerIndex: 1 },
                { question: "What is fact(0)?", options: ["0", "Undefined", "1", "Error"], answerIndex: 2 }
              ],
              procedure: [
                "Read Aim and recall the mathematical definition of factorial",
                "Go to Theory and trace fact(4) manually on paper before simulation",
                "Write each call stack frame on paper: fact(4) → fact(3) → fact(2) → fact(1) → fact(0)",
                "Then trace the unwinding: 1 → 1 → 2 → 6 → 24",
                "Go to Simulation tab and click Start",
                "Press Next and observe the call stack building downward to base case",
                "Watch the unwinding phase where multiplication happens at each return",
                "Observe how final answer 24 emerges at the top of the unwinding",
                "Go to Code Test tab — starter code pre-loaded",
                "Enter a number in Stdin — example: 5",
                "Click Run Code",
                "Verify output: Factorial=120",
                "Try n=0 and verify output: Factorial=1. Try n=12 and check if result is correct: 479001600. Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nlong long fact(int n) {\n    if (n == 0) {\n        return 1;\n    }\n    return n * fact(n - 1);\n}\n\nint main() {\n    int n = 4;\n    printf(\"Factorial=%lld\\n\", fact(n));\n    return 0;\n}",
                steps: [
                  { line: 11, annotation: "main() reads n=4, calls fact(4)", memory: [{ variable: "n", type: "int", value: "4" }], output: "" },
                  { line: 7, annotation: "fact(4) calls fact(3)", memory: [], output: "" },
                  { line: 7, annotation: "fact(3) calls fact(2)", memory: [], output: "" },
                  { line: 7, annotation: "fact(2) calls fact(1)", memory: [], output: "" },
                  { line: 7, annotation: "fact(1) calls fact(0)", memory: [], output: "" },
                  { line: 4, annotation: "fact(0) returns 1 (Base Case)", memory: [], output: "" },
                  { line: 7, annotation: "fact(1) returns 1 * 1 = 1", memory: [], output: "" },
                  { line: 7, annotation: "fact(2) returns 2 * 1 = 2", memory: [], output: "" },
                  { line: 7, annotation: "fact(3) returns 3 * 2 = 6", memory: [], output: "" },
                  { line: 7, annotation: "fact(4) returns 4 * 6 = 24", memory: [], output: "" },
                  { line: 12, annotation: "main() receives 24", memory: [], output: "Factorial=24\n" }
                ]
              },
              posttest: [
                { question: "What does fact(4) return?", options: ["12", "16", "24", "48"], answerIndex: 2 },
                { question: "What is the call stack depth when computing fact(6)?", options: ["5", "7", "6", "12"], answerIndex: 2 },
                { question: "What is the difference between linear recursion (factorial) and tree recursion (fibonacci)?", options: ["Linear makes one recursive call per step, tree recursion makes two", "Linear is always faster", "Tree recursion uses less memory", "There is no difference"], answerIndex: 0 },
                { question: "What will happen if you call fact(-1) without a guard condition?", options: ["Returns 1", "Returns 0", "Infinite recursion and stack overflow", "Compiler error"], answerIndex: 2 },
                { question: "Which data type should be used to correctly store fact(20)?", options: ["int", "float", "long long", "double"], answerIndex: 2 }
              ],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 12",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w12-3",
            title: "Ackermann Function",
            desc: "Compute the Ackermann function recursively.",
            expected: "Ackermann=X",
            content: {
              aim: {
                text: "In this experiment the student will implement the Ackermann function — one of the most famous examples of a function that is computable but not primitive recursive. The student will understand deep nested recursion, double recursion, and why even small inputs like ack(3,3) produce extremely large outputs and massive call stacks. The student will:",
                bullets: [
                  "Understand the three-case definition of the Ackermann function",
                  "Implement ack(m,n) using nested recursion in C",
                  "Trace the call stack for small inputs like ack(1,1) and ack(2,1)",
                  "Understand why ack(4,1) is computationally impractical",
                  "Appreciate the theoretical importance of Ackermann function in computer science"
                ]
              },
              theory: [
                {
                  title: "What is the Ackermann Function?",
                  body: ["The Ackermann function is a classic example from theoretical computer science defined by Wilhelm Ackermann in 1928. It grows faster than any primitive recursive function making it important in computability theory."]
                },
                {
                  title: "Three-Case Definition:",
                  body: ["Case 1: If m=0, return n+1\nCase 2: If m > 0 and n=0, return ack(m-1, 1)\nCase 3: If m > 0 and n > 0, return ack(m-1, ack(m, n-1))"]
                },
                {
                  title: "Why It Grows So Fast",
                  body: ["ack(3,3) = 61. ack(4,1) = 65533. ack(4,2) is a number with 19,728 digits. This explosive growth comes from the double recursion in Case 3 — ack calls itself inside its own argument."]
                },
                {
                  title: "Double Recursion",
                  body: ["Case 3 is ack(m-1, ack(m, n-1)). The inner ack(m, n-1) must fully resolve before the outer ack(m-1, ...) can begin. This creates an enormous call tree even for small inputs."]
                },
                {
                  title: "Practical Limits",
                  body: ["Only test with m ≤ 3 and n ≤ 4 in your program. Larger values will crash the program due to stack overflow or take years to compute."]
                },
                {
                  title: "Theoretical Importance",
                  body: ["The Ackermann function proved that not all computable functions are primitive recursive — a landmark result in mathematical logic and the theory of computation."]
                }
              ],
              pretest: [
                { question: "What does ack(0, n) return according to the Ackermann definition?", options: ["n", "n+1", "n-1", "0"], answerIndex: 1 },
                { question: "What is ack(1, 1)?", options: ["2", "4", "3", "1"], answerIndex: 2 },
                { question: "Why is the Ackermann function significant in computer science?", options: ["It is the fastest sorting algorithm", "It proves not all computable functions are primitive recursive", "It computes Fibonacci efficiently", "It is used in operating system scheduling"], answerIndex: 1 },
                { question: "What happens when you try to compute ack(5, 5)?", options: ["Returns a small number quickly", "Causes stack overflow due to extreme recursion depth", "Returns 0", "Compiler optimizes it automatically"], answerIndex: 1 },
                { question: "What is ack(2, 2)?", options: ["5", "9", "7", "4"], answerIndex: 2 }
              ],
              procedure: [
                "Read Aim and Theory carefully — Ackermann is more complex than Fibonacci or Factorial",
                "Study all three cases of the definition and memorize which case applies when",
                "Manually trace ack(1,1) on paper step by step using the three cases",
                "Verify: ack(1,1) → ack(0, ack(1,0)) → ack(0, ack(0,1)) → ack(0,2) → 3",
                "Go to Simulation tab and observe ack(2,1) traced step by step",
                "Count how many total function calls are made — observe the explosion",
                "Go to Code Test tab — starter code pre-loaded",
                "In Stdin enter m and n as two space separated integers",
                "Start with small safe values: 0 1 or 1 1 or 2 2 or 3 3",
                "Click Run Code and verify against the values table in Theory",
                "Do NOT try m=4 with n greater than 1 — it will timeout or crash. Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint ack(int m, int n) {\n    if (m == 0) return n + 1;\n    if (m > 0 && n == 0) return ack(m - 1, 1);\n    return ack(m - 1, ack(m, n - 1));\n}\n\nint main() {\n    printf(\"Ackermann=%d\\n\", ack(1, 1));\n    return 0;\n}",
                steps: [
                  { line: 10, annotation: "main() calls ack(1,1)", memory: [], output: "" },
                  { line: 6, annotation: "ack(1,1): Case 3 applies -> ack(0, ack(1,0))", memory: [], output: "" },
                  { line: 5, annotation: "Resolve ack(1,0): Case 2 applies -> ack(0,1)", memory: [], output: "" },
                  { line: 4, annotation: "Resolve ack(0,1): Case 1 applies -> returns 2", memory: [], output: "" },
                  { line: 6, annotation: "Inner argument resolved. Now resolve ack(0,2)", memory: [], output: "" },
                  { line: 4, annotation: "Resolve ack(0,2): Case 1 applies -> returns 3", memory: [], output: "" },
                  { line: 10, annotation: "printf executes", memory: [], output: "Ackermann=3\n" }
                ]
              },
              posttest: [
                { question: "How many total function calls does ack(1,1) make?", options: ["3", "4", "5", "7"], answerIndex: 2 },
                { question: "Which case of Ackermann handles when both m and n are greater than zero?", options: ["Case 1: return n+1", "Case 2: return ack(m-1, 1)", "Case 3: return ack(m-1, ack(m, n-1))", "Case 4: return ack(m, n-1)"], answerIndex: 2 },
                { question: "What is ack(3,2)?", options: ["9", "61", "29", "13"], answerIndex: 2 },
                { question: "Why should you never test ack(4,2) in a normal C program?", options: ["It returns a negative number", "The result has 19,728 digits and requires astronomically many recursive calls", "Compiler cannot parse the function", "It always returns 0"], answerIndex: 1 },
                { question: "What type of recursion does Case 3 of Ackermann represent?", options: ["Linear recursion like factorial", "Tail recursion", "Double or nested recursion where a recursive call is inside another recursive call's argument", "Mutual recursion between two functions"], answerIndex: 2 }
              ],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "Ackermann W., Zum Hilbertschen Aufbau der reellen Zahlen, Mathematische Annalen, 1928",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 12",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          }
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
            content: {
              aim: {
                text: "In this experiment the student will understand the difference between call by value and call by reference in C. The student will implement a swap function using pointers to modify the original variables in the caller function and observe how passing addresses instead of values allows functions to change data outside their own scope. The student will:",
                bullets: [
                  "Understand why call by value fails for swapping",
                  "Learn how pointers carry memory addresses to functions",
                  "Implement swap using pointer parameters",
                  "Observe how dereferencing a pointer modifies the original variable",
                  "Understand the role of & and * operators in call by reference"
                ]
              },
              theory: [
                {
                  title: "Call by Value vs Call by Reference",
                  body: ["In call by value a copy of the variable is passed to the function. Changes inside the function do not affect the original variable in main. This is the default in C.\nIn call by reference the address of the variable is passed using the & operator. The function receives a pointer and uses the * operator to access and modify the original variable directly."]
                },
                {
                  title: "Why Swap Fails with Call by Value",
                  body: ["If you pass a and b directly to swap(a, b) the function gets copies x and y. Swapping x and y does nothing to the original a and b in main. After the function returns a and b are unchanged."]
                },
                {
                  title: "Why Swap Works with Call by Reference",
                  body: ["When you pass &a and &b the function receives pointers to the actual memory locations of a and b. Using *ptr you read or write the value at that address directly. Any change through the pointer changes the original variable."]
                },
                {
                  title: "The & Operator",
                  body: ["& gives the memory address of a variable. &a means the address where a is stored in memory. Example: if a is at address 2000 then &a = 2000."]
                },
                {
                  title: "The * Operator in Pointer Context",
                  body: ["* before a pointer variable dereferences it — meaning go to that address and read or write the value there. If ptr = &a then *ptr = 10 sets a to 10."]
                },
                {
                  title: "Swap Logic using Pointers",
                  body: ["temp = *a stores the value at address a into temp\n*a = *b copies the value at address b into address a\n*b = temp copies temp into address b\nResult: original variables in main are swapped."]
                },
                {
                  title: "Dangling Pointer Brief",
                  body: ["A dangling pointer is a pointer that points to a memory location that has been freed or gone out of scope. Accessing a dangling pointer causes undefined behavior. This is covered as a warning in this week's tutorial."]
                }
              ],
              pretest: [
                { question: "What does the & operator do when used before a variable in C?", options: ["Performs bitwise AND", "Returns the memory address of the variable", "Dereferences a pointer", "Declares a reference variable"], answerIndex: 1 },
                { question: "What does *ptr do when ptr is a pointer variable?", options: ["Declares a new pointer", "Gives the address stored in ptr", "Accesses the value at the memory address stored in ptr", "Multiplies ptr by something"], answerIndex: 2 },
                { question: "Why does swap(a, b) using call by value not work?", options: ["C does not allow functions with two parameters", "The function gets copies so original variables are unchanged", "Swapping is not possible in C", "Variables cannot be passed to functions"], answerIndex: 1 },
                { question: "What should the parameter type be for a function that modifies an int using call by reference?", options: ["int", "int*", "int&", "&int"], answerIndex: 1 },
                { question: "What is a dangling pointer?", options: ["A pointer with value zero", "A pointer declared but never initialized", "A pointer pointing to memory that is freed or out of scope", "A pointer to a pointer"], answerIndex: 2 }
              ],
              procedure: [
                "Read Theory and clearly understand why call by value fails for swap",
                "Draw on paper: two boxes labeled a=10 and b=20 with addresses 2000 and 3000",
                "Trace what happens when you pass &a and &b to swap()",
                "Show on paper how *a = *b changes value at address 2000 to 20",
                "Go to Simulation tab and click Start",
                "Press Next and watch memory addresses appear for a and b",
                "Observe pointer parameters receiving those addresses",
                "Watch values at addresses change step by step during swap",
                "Go to Code Test tab — starter code pre-loaded",
                "Enter two integers in Stdin — example: 10 20",
                "Click Run Code",
                "Verify output: a=20 b=10",
                "Try with negative numbers: -5 100 and verify swap works. Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 10;\n    int b = 20;\n    swap(&a, &b);\n    printf(\"a=%d b=%d\\n\", a, b);\n    return 0;\n}",
                steps: [
                  { line: 10, annotation: "main() declares a=10 and b=20", memory: [{ variable: "a", type: "int", value: "10", address: "2000" }, { variable: "b", type: "int", value: "20", address: "3000" }], output: "" },
                  { line: 12, annotation: "swap(&a, &b) called", memory: [{ variable: "x", type: "int*", value: "2000" }, { variable: "y", type: "int*", value: "3000" }], output: "" },
                  { line: 4, annotation: "temp = *x", memory: [{ variable: "temp", type: "int", value: "10" }], output: "" },
                  { line: 5, annotation: "*x = *y", memory: [{ variable: "a", type: "int", value: "20", address: "2000" }], output: "" },
                  { line: 6, annotation: "*y = temp", memory: [{ variable: "b", type: "int", value: "10", address: "3000" }], output: "" },
                  { line: 7, annotation: "swap() returns, back in main()", memory: [], output: "" },
                  { line: 13, annotation: "printf executes", memory: [], output: "a=20 b=10\n" }
                ]
              },
              posttest: [
                { question: "After swap(&a, &b) with a=5 and b=9, what are the values of a and b?", options: ["a=5 b=9", "a=9 b=5", "a=0 b=0", "a=9 b=9"], answerIndex: 1 },
                { question: "What is the correct function signature for a swap function using pointers?", options: ["void swap(int a, int b)", "void swap(int *a, int *b)", "int swap(&a, &b)", "void swap(int &a, int &b)"], answerIndex: 1 },
                { question: "Inside the swap function, what does *a = *b do?", options: ["Copies the address of b into a", "Copies the value at address b into the location pointed by a", "Swaps the pointers themselves", "Nothing useful"], answerIndex: 1 },
                { question: "If ptr points to variable x, which statement correctly changes x to 50?", options: ["ptr = 50", "&ptr = 50", "*ptr = 50", "ptr* = 50"], answerIndex: 2 },
                { question: "What is the output if you pass the same variable twice: swap(&a, &a)?", options: ["a becomes 0", "a remains unchanged", "Program crashes", "Compiler error"], answerIndex: 1 }
              ],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 13",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w13-2",
            title: "String Copy using Pointer",
            desc: "Copy a string using pointers.",
            expected: "Copied string",
            content: {
              aim: {
                text: "In this experiment the student will implement a custom string copy function using pointer arithmetic in C without using the built-in strcpy() function. The student will understand how pointers traverse character arrays one byte at a time and how the null terminator signals the end of a string. The student will:",
                bullets: [
                  "Understand how strings are stored as character arrays ending with null character",
                  "Use pointer arithmetic to traverse source string character by character",
                  "Copy each character to the destination array using pointer dereferencing",
                  "Append null terminator to complete the destination string",
                  "Understand why array names are already pointers in C"
                ]
              },
              theory: [
                {
                  title: "Strings in C",
                  body: ["C does not have a built-in string type. Strings are stored as arrays of characters terminated by a null character written as backslash zero. Example: \"Hello\" is stored as H e l l o \\0 in memory occupying 6 bytes."]
                },
                {
                  title: "Pointer to a Character Array",
                  body: ["When you declare char s[100] the name s is already a pointer to the first character. You can assign a char pointer to it: char *p = s makes p point to s[0]."]
                },
                {
                  title: "Pointer Arithmetic",
                  body: ["Incrementing a char pointer with p++ moves it forward by one byte to the next character. This is how you traverse a string character by character without using an index."]
                },
                {
                  title: "Dereferencing to Read and Write",
                  body: ["*src reads the character at current position of src pointer.\n*dest = *src copies the character from src position to dest position."]
                },
                {
                  title: "Null Terminator Check",
                  body: ["The while loop condition while(*src) continues as long as the current character is not null. When src reaches the null terminator the loop ends."]
                },
                {
                  title: "Appending Null Terminator",
                  body: ["After the loop ends *dest = '\\0' must be explicitly added to terminate the destination string. Without this the destination array is not a valid C string."]
                },
                {
                  title: "Why No & for Arrays",
                  body: ["Array names decay to pointers automatically in C. char s[100] — s is already the address of s[0]. So strCopy(dest, src) passes the addresses directly without needing &."]
                }
              ],
              pretest: [
                { question: "How is a string terminated in C?", options: ["With a period character", "With a null character \\0", "With a newline \\n", "With a space character"], answerIndex: 1 },
                { question: "What does p++ do when p is a char pointer?", options: ["Increments the value at p by 1", "Moves p to point to the next character in memory", "Doubles the address in p", "Creates a new pointer"], answerIndex: 1 },
                { question: "What does *src return when src points to the letter 'A'?", options: ["The address of A", "The ASCII value 65 as an integer OR the character 'A'", "A pointer to the next character", "NULL"], answerIndex: 1 },
                { question: "Why must you add \\0 at the end of the destination string after copying?", options: ["To save memory", "To mark the valid end of the string for C string functions and printf", "It is added automatically", "To avoid dangling pointers"], answerIndex: 1 },
                { question: "If src = \"JNTU\" and you copy it to dest, what is the size of dest that is needed?", options: ["4 bytes", "5 bytes including null terminator", "3 bytes", "10 bytes always"], answerIndex: 1 }
              ],
              procedure: [
                "Read Theory and draw the memory layout of \"Hello\\0\" as boxes labeled H e l l o \\0",
                "Draw two arrays src and dest side by side with pointer arrows",
                "Trace on paper how src pointer moves and copies each character to dest",
                "Note when the loop stops at \\0 and where \\0 is manually added to dest",
                "Go to Simulation tab and click Start",
                "Press Next and watch the src pointer advance one character at a time",
                "Observe dest filling character by character in the memory panel",
                "Watch \\0 being added to dest at the end",
                "Go to Code Test tab — starter code pre-loaded",
                "Enter a word in Stdin — example: JNTUGV",
                "Click Run Code",
                "Verify output: Copied: JNTUGV",
                "Try with spaces in input using a different scanf format. Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nvoid strCopy(char *dest, char *src) {\n    while (*src != '\\0') {\n        *dest = *src;\n        dest++;\n        src++;\n    }\n    *dest = '\\0';\n}\n\nint main() {\n    char src[] = \"JNTU\";\n    char dest[10];\n    strCopy(dest, src);\n    printf(\"Copied: %s\\n\", dest);\n    return 0;\n}",
                steps: [
                  { line: 14, annotation: "Arrays declared, pointers initialized", memory: [{ variable: "src", type: "char[]", value: "\"JNTU\"", address: "1000" }, { variable: "dest", type: "char[]", value: "empty", address: "2000" }], output: "" },
                  { line: 15, annotation: "strCopy(dest, src) called", memory: [], output: "" },
                  { line: 4, annotation: "Loop iteration 1: *src = 'J'", memory: [], output: "" },
                  { line: 5, annotation: "*dest = *src copies 'J'", memory: [{ variable: "dest[0]", type: "char", value: "'J'", address: "2000" }], output: "" },
                  { line: 6, annotation: "dest++, src++", memory: [], output: "" },
                  { line: 4, annotation: "Loop iteration 2: *src = 'N'", memory: [], output: "" },
                  { line: 5, annotation: "*dest = *src copies 'N'", memory: [{ variable: "dest[1]", type: "char", value: "'N'", address: "2001" }], output: "" },
                  { line: 6, annotation: "dest++, src++", memory: [], output: "" },
                  { line: 4, annotation: "Loop iteration 3: *src = 'T'", memory: [], output: "" },
                  { line: 5, annotation: "*dest = *src copies 'T'", memory: [{ variable: "dest[2]", type: "char", value: "'T'", address: "2002" }], output: "" },
                  { line: 6, annotation: "dest++, src++", memory: [], output: "" },
                  { line: 4, annotation: "Loop iteration 4: *src = 'U'", memory: [], output: "" },
                  { line: 5, annotation: "*dest = *src copies 'U'", memory: [{ variable: "dest[3]", type: "char", value: "'U'", address: "2003" }], output: "" },
                  { line: 6, annotation: "dest++, src++", memory: [], output: "" },
                  { line: 4, annotation: "while(*src) fails — \\0 is falsy", memory: [], output: "" },
                  { line: 9, annotation: "*dest = \\0 adds null terminator", memory: [{ variable: "dest[4]", type: "char", value: "'\\0'", address: "2004" }], output: "" },
                  { line: 16, annotation: "printf executes", memory: [], output: "Copied: JNTU\n" }
                ]
              },
              posttest: [
                { question: "What is the output when input is \"Hello\"?", options: ["Copied: hello", "Copied: Hello", "Hello", "Error"], answerIndex: 1 },
                { question: "What happens if you forget to add \\0 after the copy loop?", options: ["Nothing changes", "printf may print garbage characters beyond the string", "Program gives compile error", "dest automatically gets \\0"], answerIndex: 1 },
                { question: "Which condition correctly checks for end of string in a pointer-based loop?", options: ["while(src != 0)", "while(*src != '\\0') or equivalently while(*src)", "while(src == NULL)", "while(*src > 0)"], answerIndex: 1 },
                { question: "What is the key difference between strcpy() and the custom strCopy() you implemented?", options: ["strcpy() is faster always", "They are functionally identical but strcpy() has error handling built in", "strCopy() cannot handle strings longer than 10 characters", "strcpy() does not add null terminator"], answerIndex: 1 },
                { question: "If char *p = s where s is a char array, what does p+3 point to?", options: ["The value s[3] directly", "The memory address of the 4th character s[3]", "s multiplied by 3", "Garbage address"], answerIndex: 1 }
              ],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 13",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w13-3",
            title: "Count Characters using Pointer",
            desc: "Count uppercase, lowercase, digits, and special characters using pointers.",
            expected: "Character counts",
            content: {
              aim: {
                text: "In this experiment the student will traverse a string using a pointer and classify each character into one of four categories — uppercase letters, lowercase letters, digits, and other characters — using ASCII value comparisons. The student will understand how pointer traversal replaces array indexing and how character classification works in C. The student will:",
                bullets: [
                  "Traverse a character array using a pointer instead of index",
                  "Use ASCII range comparisons to classify each character",
                  "Count occurrences of each character category",
                  "Understand how pointer increment replaces array index increment",
                  "Display the four category counts as formatted output"
                ]
              },
              theory: [
                {
                  title: "ASCII Character Ranges",
                  body: ["Every character in C is stored as an integer using ASCII encoding. The classification ranges are:\nUppercase letters: A to Z → ASCII 65 to 90\nLowercase letters: a to z → ASCII 97 to 122\nDigits: 0 to 9 → ASCII 48 to 57\nOther characters: anything outside the above ranges including spaces, punctuation, symbols"]
                },
                {
                  title: "Pointer Traversal of a String",
                  body: ["Declaring char *p = s makes p point to the first character of string s. Using *p you read the current character. Using p++ you move to the next character. The loop continues while *p is not \\0."]
                },
                {
                  title: "Character Comparison in C",
                  body: ["You can directly compare characters using relational operators. *p >= 'A' && *p <= 'Z' checks if the current character is an uppercase letter. C compares the ASCII values behind the scenes."]
                },
                {
                  title: "Why Pointer Instead of Index",
                  body: ["Using an index variable i and s[i] is equivalent but pointer traversal is more idiomatic C. It demonstrates that strings are just memory sequences and pointers are the natural way to navigate them."]
                },
                {
                  title: "Counting Logic",
                  body: ["Four integer counters upper lower digit other are initialized to zero. In each loop iteration exactly one counter is incremented based on which range the current character falls into. After the loop all four are printed."]
                }
              ],
              pretest: [
                { question: "What is the ASCII value of character 'A'?", options: ["97", "65", "48", "90"], answerIndex: 1 },
                { question: "Which condition correctly checks if a character pointed by p is a digit?", options: ["*p >= 0 && *p <= 9", "*p >= '0' && *p <= '9'", "*p >= 48 || *p <= 57", "isDigit(*p)"], answerIndex: 1 },
                { question: "What does p++ do inside a string traversal loop?", options: ["Increments the character value at p", "Moves the pointer to the next character", "Copies the character to a new location", "Resets p to the start of the string"], answerIndex: 1 },
                { question: "For input \"Hello123!\" how many uppercase letters are there?", options: ["0", "1", "5", "3"], answerIndex: 1 },
                { question: "What category does a space character fall into?", options: ["Lowercase", "Digit", "Uppercase", "Other"], answerIndex: 3 }
              ],
              procedure: [
                "Read Theory and memorize the four ASCII ranges for classification",
                "Write the input \"Hello123!\" on paper and manually classify each character",
                "Count: Upper=1, Lower=4, Digit=3, Other=1 — verify your manual count",
                "Go to Simulation tab and click Start",
                "Press Next and watch the pointer p move across each character",
                "Observe which counter increments at each step",
                "Note the final counter values in the memory panel",
                "Go to Code Test tab — starter code pre-loaded",
                "Enter a mixed string in Stdin — example: Hello123!",
                "Click Run Code",
                "Verify output: Upper=1 Lower=4 Digit=3 Other=1",
                "Try with all digits: 9876 and verify Upper=0 Lower=0 Digit=4 Other=0. Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    char str[] = \"Hi9!\";\n    char *p = str;\n    int upper = 0, lower = 0, digit = 0, other = 0;\n    while (*p != '\\0') {\n        if (*p >= 'A' && *p <= 'Z') upper++;\n        else if (*p >= 'a' && *p <= 'z') lower++;\n        else if (*p >= '0' && *p <= '9') digit++;\n        else other++;\n        p++;\n    }\n    printf(\"Upper=%d Lower=%d Digit=%d Other=%d\\n\", upper, lower, digit, other);\n    return 0;\n}",
                steps: [
                  { line: 4, annotation: "p initialized, counters all zero", memory: [{ variable: "upper", type: "int", value: "0" }, { variable: "lower", type: "int", value: "0" }, { variable: "digit", type: "int", value: "0" }, { variable: "other", type: "int", value: "0" }], output: "" },
                  { line: 7, annotation: "*p = H, ASCII 72 (uppercase)", memory: [], output: "" },
                  { line: 8, annotation: "upper++", memory: [{ variable: "upper", type: "int", value: "1" }], output: "" },
                  { line: 12, annotation: "p++ moves to i", memory: [], output: "" },
                  { line: 7, annotation: "*p = i, ASCII 105 (lowercase)", memory: [], output: "" },
                  { line: 9, annotation: "lower++", memory: [{ variable: "lower", type: "int", value: "1" }], output: "" },
                  { line: 12, annotation: "p++ moves to 9", memory: [], output: "" },
                  { line: 7, annotation: "*p = 9, ASCII 57 (digit)", memory: [], output: "" },
                  { line: 10, annotation: "digit++", memory: [{ variable: "digit", type: "int", value: "1" }], output: "" },
                  { line: 12, annotation: "p++ moves to !", memory: [], output: "" },
                  { line: 7, annotation: "*p = !, ASCII 33 (other)", memory: [], output: "" },
                  { line: 11, annotation: "other++", memory: [{ variable: "other", type: "int", value: "1" }], output: "" },
                  { line: 12, annotation: "p++ moves to \\0", memory: [], output: "" },
                  { line: 7, annotation: "*p = \\0, loop exits", memory: [], output: "" },
                  { line: 14, annotation: "printf executes", memory: [], output: "Upper=1 Lower=1 Digit=1 Other=1\n" }
                ]
              },
              posttest: [
                { question: "For input \"JNTUGV2026\" what is the digit count?", options: ["3", "4", "6", "2"], answerIndex: 1 },
                { question: "What is the lowercase count for input \"HELLO\"?", options: ["5", "0", "1", "3"], answerIndex: 1 },
                { question: "Which header file provides built-in character classification functions like isupper() and isdigit()?", options: ["stdio.h", "string.h", "ctype.h", "math.h"], answerIndex: 2 },
                { question: "What is the output for input \"aB3 \"?", options: ["Upper=1 Lower=1 Digit=1 Other=1", "Upper=1 Lower=1 Digit=1 Other=0", "Upper=0 Lower=2 Digit=1 Other=1", "Upper=1 Lower=2 Digit=0 Other=1"], answerIndex: 0 },
                { question: "Why is pointer traversal preferred over index traversal for strings in systems programming?", options: ["It is always faster on all machines", "It directly models memory layout and avoids redundant index arithmetic", "Indexes cause compilation errors in C", "Pointers use less RAM"], answerIndex: 1 }
              ],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 13",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
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
            content: {
              aim: {
                text: "In this experiment the student will learn how to perform basic file operations in C using the FILE pointer, fopen(), fprintf(), fgets(), and fclose() functions. The student will write user input into a text file and then read it back and display it on screen. The student will:",
                bullets: [
                  "Understand the FILE structure and file pointer in C",
                  "Open a file in write mode using fopen()",
                  "Write text to the file using fprintf()",
                  "Close and reopen the file in read mode",
                  "Read content back using fgets() and display it"
                ]
              },
              theory: [
                {
                  title: "What is a File in C?",
                  body: ["A file is a named storage location on disk. Unlike variables which live in RAM and disappear when the program ends, files persist data permanently. C provides standard library functions for file operations through the stdio.h header."]
                },
                {
                  title: "FILE Pointer",
                  body: ["FILE is a structure defined in stdio.h that holds all information about an open file. You always use a pointer to FILE: FILE *f. This pointer is returned by fopen() and used in all subsequent file operations."]
                },
                {
                  title: "fopen() — Opening a File",
                  body: ["fopen(filename, mode) opens a file and returns a FILE pointer.\nCommon modes:\n\"w\" : Write — creates file or overwrites existing\n\"r\" : Read — opens existing file for reading\n\"a\" : Append — adds to end of existing file\n\"rb\" : Read binary\n\"wb\" : Write binary\nAlways check if fopen returned NULL — NULL means the file could not be opened."]
                },
                {
                  title: "fprintf() — Writing to File",
                  body: ["Works exactly like printf() but writes to a file instead of screen. First argument is the FILE pointer."]
                },
                {
                  title: "fgets() — Reading from File",
                  body: ["fgets(buffer, size, filepointer) reads one line from the file into buffer. Stops at newline or size-1 characters. Returns NULL at end of file."]
                },
                {
                  title: "fclose() — Closing a File",
                  body: ["Always close files after use with fclose(). This flushes the write buffer to disk and releases the file handle. Not closing a file can cause data loss or corruption."]
                },
                {
                  title: "Text File vs Binary File",
                  body: ["Text files store data as human-readable ASCII characters. Binary files store raw bytes. For this experiment we use text mode."]
                }
              ],
              pretest: [
                { question: "Which function is used to open a file in C?", options: ["fileopen()", "open()", "fopen()", "openFile()"], answerIndex: 2 },
                { question: "What does fopen() return if the file cannot be opened?", options: ["0", "-1", "NULL", "Empty string"], answerIndex: 2 },
                { question: "Which mode opens a file for writing and creates it if it does not exist?", options: ["\"r\"", "\"a\"", "\"w\"", "\"rw\""], answerIndex: 2 },
                { question: "What is the purpose of fclose()?", options: ["Deletes the file from disk", "Flushes buffer and releases the file handle", "Reads the last line of the file", "Rewinds the file to beginning"], answerIndex: 1 },
                { question: "Which function reads a line from a file into a character array?", options: ["fscanf()", "fread()", "fgets()", "fgetchar()"], answerIndex: 2 }
              ],
              procedure: [
                "Read Theory and understand the file operation sequence — open write close open read close",
                "Note that you must close the file before reopening it in a different mode",
                "Go to Simulation tab and observe the file being created on disk step by step",
                "Watch the FILE pointer being assigned and how fprintf writes bytes to disk",
                "Watch the file being reopened in read mode and fgets reading back the content",
                "Go to Code Test tab — starter code pre-loaded",
                "In Stdin enter a line of text — example: Hello JNTUGV",
                "Click Run Code",
                "Verify output: Read: Hello JNTUGV",
                "Try with longer sentences and verify they are written and read back correctly. Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    FILE *f;\n    char text[100] = \"Hello JNTUGV\";\n    f = fopen(\"test.txt\", \"w\");\n    fprintf(f, \"%s\", text);\n    fclose(f);\n    \n    f = fopen(\"test.txt\", \"r\");\n    fgets(text, 100, f);\n    fclose(f);\n    printf(\"Read: %s\\n\", text);\n    return 0;\n}",
                steps: [
                  { line: 5, annotation: "Input stored in memory", memory: [{ variable: "text", type: "char[]", value: "\"Hello JNTUGV\"" }], output: "" },
                  { line: 6, annotation: "fopen(\"test.txt\", \"w\") called", memory: [{ variable: "f", type: "FILE*", value: "file pointer" }], output: "" },
                  { line: 7, annotation: "fprintf writes to test.txt", memory: [], output: "" },
                  { line: 8, annotation: "fclose(f) called. Buffer flushed", memory: [], output: "" },
                  { line: 10, annotation: "fopen(\"test.txt\", \"r\") called", memory: [{ variable: "f", type: "FILE*", value: "file pointer" }], output: "" },
                  { line: 11, annotation: "fgets reads content into text[]", memory: [], output: "" },
                  { line: 12, annotation: "fclose(f) called", memory: [], output: "" },
                  { line: 13, annotation: "printf executes", memory: [], output: "Read: Hello JNTUGV\n" }
                ]
              },
              posttest: [
                { question: "What is the correct sequence of file operations in C?", options: ["Read → Open → Write → Close", "Open → Write/Read → Close", "Write → Open → Read → Close", "Open → Close → Write → Read"], answerIndex: 1 },
                { question: "What happens if you open a file in \"w\" mode and the file already exists?", options: ["Error is returned", "Existing content is preserved and new content is appended", "Existing content is erased and file is overwritten", "Program crashes"], answerIndex: 2 },
                { question: "Why must you call fclose() before reopening a file in a different mode?", options: ["fopen() requires it as a parameter", "To flush write buffer to disk and release the file handle", "C only allows one file open at a time always", "fgets() only works on closed files"], answerIndex: 1 },
                { question: "Which function writes formatted text to a file in C?", options: ["printf()", "sprintf()", "fprintf()", "fwrite()"], answerIndex: 2 },
                { question: "What does fgets() return when it reaches the end of file?", options: ["0", "Empty string", "NULL", "-1"], answerIndex: 2 }
              ],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 14",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w14-2",
            title: "Count Lines Words Characters",
            desc: "Read a file and output the count of lines, words, and characters.",
            expected: "Lines=X Words=X Chars=X",
            content: {
              aim: {
                text: "In this experiment the student will write text to a file and then read it back character by character using fgetc() to count the total number of lines, words, and characters. The student will understand how to detect word boundaries using space and newline characters and how fgetc() returns EOF at end of file. The student will:",
                bullets: [
                  "Write multi-line text to a file using fprintf()",
                  "Read the file character by character using fgetc()",
                  "Count lines by detecting newline characters",
                  "Count words by detecting transitions from whitespace to non-whitespace",
                  "Count total characters read",
                  "Display all three counts as formatted output"
                ]
              },
              theory: [
                {
                  title: "fgetc() — Reading One Character at a Time",
                  body: ["fgetc(filepointer) reads one character from the file and advances the file position. Returns the character as an int. Returns EOF (End Of File) which is -1 when there are no more characters to read. This is why the return type is int not char — to accommodate EOF which is outside the char range."]
                },
                {
                  title: "EOF Detection",
                  body: ["The while loop condition while((c = fgetc(f)) != EOF) reads one character into c and continues as long as c is not EOF. This is the standard idiomatic pattern for reading files character by character in C."]
                },
                {
                  title: "Counting Lines",
                  body: ["Every time a newline character \\n is encountered increment the lines counter. If the file has content after the last newline an additional count may be needed. For simplicity we add 1 to lines if the file is non-empty to count the last line."]
                },
                {
                  title: "Counting Words",
                  body: ["A word starts when a non-whitespace character follows a whitespace character or the beginning of file. Track the previous character as prev. When current character is not space or newline AND previous character was space or newline increment word counter."]
                },
                {
                  title: "Counting Characters",
                  body: ["Increment character counter for every character read including spaces and newlines. This gives total raw character count."]
                },
                {
                  title: "Difference from wc Command",
                  body: ["This program mirrors the behavior of the Unix wc command which is used to count lines words and characters in files."]
                }
              ],
              pretest: [
                { question: "What does fgetc() return when the end of file is reached?", options: ["0", "NULL", "EOF which is -1", "\\0"], answerIndex: 2 },
                { question: "Why is the return type of fgetc() int and not char?", options: ["char cannot be stored in a variable", "To accommodate EOF value which is outside the char range", "int is the default type in C", "fgetc() returns line numbers"], answerIndex: 1 },
                { question: "How do you detect a new line while reading character by character?", options: ["Check if c == ' '", "Check if c == '\\n'", "Check if c == EOF", "Check if c == '\\0'"], answerIndex: 1 },
                { question: "What is a word boundary in the context of this counting program?", options: ["Any character that is a letter", "Transition from whitespace to non-whitespace character", "Every space character encountered", "Start and end of each line"], answerIndex: 1 },
                { question: "Which Unix command does this program replicate?", options: ["ls", "cat", "grep", "wc"], answerIndex: 3 }
              ],
              procedure: [
                "Read Theory and understand how word detection works using the prev character technique",
                "Write on paper: \"Hi JNTU\\nBye\\n\" and manually count lines=2, words=3, chars=13",
                "Trace the loop character by character and verify your counts",
                "Go to Simulation tab and click Start",
                "Press Next and watch fgetc() read one character at a time",
                "Observe how lines counter increments at each \\n",
                "Observe how words counter increments at the start of each new word",
                "Watch the chars counter increment at every step",
                "Go to Code Test tab — starter code pre-loaded",
                "Enter text in Stdin — example: Hello World",
                "Click Run Code",
                "Verify output shows correct Lines Words Chars counts",
                "Try multi-word input and recount manually to verify. Proceed to Posttest"
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"Hi Bye\");\n    fclose(f);\n    \n    f = fopen(\"temp.txt\", \"r\");\n    int c, chars = 0, words = 0, lines = 0, prev = ' ';\n    while ((c = fgetc(f)) != EOF) {\n        chars++;\n        if (c == '\\n') lines++;\n        if (c != ' ' && c != '\\n' && (prev == ' ' || prev == '\\n')) words++;\n        prev = c;\n    }\n    if (chars > 0 && prev != '\\n') lines++;\n    fclose(f);\n    printf(\"Lines=%d Words=%d Chars=%d\\n\", lines, words, chars);\n    return 0;\n}",
                steps: [
                  { line: 5, annotation: "File written and closed", memory: [], output: "" },
                  { line: 8, annotation: "File opened in read mode", memory: [], output: "" },
                  { line: 9, annotation: "Ready to read", memory: [{ variable: "chars", type: "int", value: "0" }, { variable: "words", type: "int", value: "0" }, { variable: "lines", type: "int", value: "0" }], output: "" },
                  { line: 10, annotation: "Read 'H'", memory: [{ variable: "chars", type: "int", value: "1" }, { variable: "words", type: "int", value: "1" }], output: "" },
                  { line: 10, annotation: "Read 'i'", memory: [{ variable: "chars", type: "int", value: "2" }, { variable: "words", type: "int", value: "1" }], output: "" },
                  { line: 10, annotation: "Read space", memory: [{ variable: "chars", type: "int", value: "3" }, { variable: "words", type: "int", value: "1" }], output: "" },
                  { line: 10, annotation: "Read 'B'", memory: [{ variable: "chars", type: "int", value: "4" }, { variable: "words", type: "int", value: "2" }], output: "" },
                  { line: 10, annotation: "Read 'y' and 'e'", memory: [{ variable: "chars", type: "int", value: "6" }, { variable: "words", type: "int", value: "2" }], output: "" },
                  { line: 16, annotation: "fgetc returns EOF, loop exits", memory: [{ variable: "lines", type: "int", value: "1" }], output: "" },
                  { line: 18, annotation: "printf executes", memory: [], output: "Lines=1 Words=2 Chars=6\n" }
                ]
              },
              posttest: [
                { question: "For input \"Good Morning\\nJNTUGV\\n\" what is the line count?", options: ["1", "3", "2", "0"], answerIndex: 2 },
                { question: "What is the word count for input \"The   quick brown\"?", options: ["2", "4", "3", "5"], answerIndex: 2 },
                { question: "What does the condition while((c = fgetc(f)) != EOF) do?", options: ["Reads the whole file at once", "Reads one character per iteration and stops at end of file", "Reads until a newline is found", "Reads only the first line"], answerIndex: 1 },
                { question: "Which of the following correctly detects a word boundary?", options: ["If current char is a letter", "If current is non-whitespace and previous was whitespace", "If current char is a space", "If line counter changes"], answerIndex: 1 },
                { question: "Why is fgetc() preferred over fgets() for counting individual characters?", options: ["fgets() is slower", "fgetc() gives one character at a time allowing precise counting of every byte", "fgets() cannot read from files", "fgetc() uses less memory"], answerIndex: 1 }
              ],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 14",
                "GCC Documentation on File I/O: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          }
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
  }
};