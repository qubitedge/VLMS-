import type { Course } from "./course-data";

export const javaCourse: Course = {
  id: "java",
  title: "Java Programming",
  objectives: [
    "To understand the fundamental principles of Object-Oriented Programming (OOP) in Java, including platform independence, bytecodes, and JVM operations.",
    "To gain hands-on programming experience using Java primitives, operators, and control structures.",
    "To master object-oriented designs using classes, methods, constructors, encapsulation, inheritance, interfaces, and polymorphism.",
    "To develop robust applications using Exception Handling mechanisms and Multithreaded execution paths.",
    "To learn structure, usage, creation, and deployment of user-defined Java packages.",
    "To introduce students to graphical user interface (GUI) development in Java using the JavaFX framework components.",
    "To learn database connectivity (JDBC) patterns in Java for CRUD database actions directly from application programs."
  ],
  introduction: [
    "Java is a versatile, high-level, object-oriented, concurrent programming language developed by Sun Microsystems (now Oracle) in 1995. Designed around the paradigm of 'Write Once, Run Anywhere' (WORA), Java compile outputs are intermediate bytecode files (.class) executed in a virtual machine (JVM) environment, making programs highly portable across diverse operating systems.",
    "This Virtual Java Programming Lab is designed for B.Tech students of Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) under the College of Engineering, Vizianagaram (IT-R23 curriculum). The lab provides an interactive playground for exploring Java code, running live tests, and visualizing execution states directly inside a modern WebAssembly/Wandbox compiler runtime.",
    "The course is structured into 9 core Exercises covering primitive types, quadratic equations, searching and sorting algorithms, StringBuffers, class designs, inheritance, interfaces, exception frameworks, multithreading, packages, JavaFX graphical components, and database access using JDBC.",
    "Each experiment in this workspace contains an Aim, Theory, Pre-test questionnaire, interactive Procedure, Simulation view showing the program's live memory state, a Code Test editor running a real JDK compiler, and a Post-test review to verify understanding."
  ],
  targetAudience: {
    primary: "Second-year B.Tech students at Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) enrolled in the Java Programming Lab.",
    prerequisites: [
      "Basic understanding of structural programming concepts (like C language control flow).",
      "Familiarity with algorithm design concepts (such as binary search and bubble sort)."
    ],
    usefulFor: [
      "Computer Science and Information Technology undergraduate learners exploring Object-Oriented concepts.",
      "Software developers seeking a structured environment to practice Java concepts, exception handling, and JDBC APIs.",
      "Instructors looking for a complete sandbox syllabus to teach Java without local environment configuration issues."
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "Information Technology & Computer Science (College of Engineering, Vizianagaram)",
    course: "Java Programming Laboratory (IT-R23)",
    credits: "L:0 T:0 P:3 C:1.5",
    yearSem: "Second Year, First Semester (2-1)",
    branches: "IT, CSE, CSE-AI, CSE-DS",
    totalExperiments: "9 Exercises (26 Experiments)",
    compiler: "OpenJDK (JDK 22) via Wandbox Online API Engine",
    units: [
      { unit: "Exercise 1", topics: "Java Primitives & Quadratic Roots", weeks: "Week 1" },
      { unit: "Exercise 2", topics: "Binary Search, Bubble Sort & StringBuffer", weeks: "Week 2" },
      { unit: "Exercise 3", topics: "Classes, Methods & Constructor Overloading", weeks: "Week 3" },
      { unit: "Exercise 4", topics: "Single & Multilevel Inheritance, Abstract Classes", weeks: "Week 4" },
      { unit: "Exercise 5", topics: "Super Keyword, Interfaces & Runtime Polymorphism", weeks: "Week 5" },
      { unit: "Exercise 6", topics: "Exception Handling, Multiple Catch & User Exceptions", weeks: "Week 6" },
      { unit: "Exercise 7", topics: "Threads (Thread & Runnable), Thread Methods, Producer-Consumer", weeks: "Week 7" },
      { unit: "Exercise 8", topics: "User Packages & JavaFX Graphical Components", weeks: "Week 8" },
      { unit: "Exercise 9", topics: "Database Access using JDBC APIs (Insert, Delete)", weeks: "Week 9" }
    ]
  },
  weeks: [
    {
      title: "EXERCISE 1",
      objective: "Understand default values of Java primitive data types and calculate the roots of quadratic equations.",
      tutorial: "Tutorial 1: Java Basics and Primitive Types",
      labTitle: "Lab 1: Primitives & Control Flow",
      experiments: [
        {
          id: "java-e1-1",
          title: "Default Primitive Values",
          desc: "Write a Java program to declare class member variables of all primitive types and display their default values.",
          expected: "boolean: false\nchar: \nbyte: 0\nshort: 0\nint: 0\nlong: 0\nfloat: 0.0\ndouble: 0.0",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to displaying the default values of all 8 primitive data types of java when declared as uninitialized class variables.",
              bullets: [
                "Understand the core concepts of Default Primitive Values",
                "Implement a Java program that demonstrates default primitive values",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Default Primitive Values"
              ]
            },
            theory: [
              {
                title: "Primitives in Java",
                body: [
                  "Java is statically-typed, meaning all variables must be declared before use. It defines 8 basic primitive data types: byte, short, int, long, float, double, char, and boolean.",
                  "When declared as instance or static variables within a class, Java automatically initializes them to default values. For instance, integers are 0, floats/doubles are 0.0, booleans are false, and char is '\\u0000' (null character). Local variables inside methods do NOT receive default values and cause compilation errors if read before explicit initialization."
                ]
              }
            ],
            pretest: [
              { question: "How many primitive data types are defined in Java?", options: ["6", "8", "10", "12"], answerIndex: 1, hint: "They include byte, short, int, long, float, double, char, and boolean." },
              { question: "What is the default value of an uninitialized instance boolean variable in Java?", options: ["true", "false", "null", "0"], answerIndex: 1, hint: "Java initializes boolean fields to the logical off state." },
              { question: "Which of the following is NOT a primitive data type in Java?", options: ["int", "double", "String", "boolean"], answerIndex: 2, hint: "String is a class type, not a primitive." },
              { question: "What is the size of an 'int' primitive data type in Java?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], answerIndex: 2, hint: "Int occupies 32 bits of memory." },
              { question: "What occurs if you read an uninitialized local variable inside a method?", options: ["It prints 0", "It prints null", "Compilation error", "Runtime exception"], answerIndex: 2, hint: "Java only initializes instance/class-level fields automatically." }
            ],
            procedure: [
              "Review the Aim and Theory to understand primitive types and default initializations.",
              "Declare primitive member variables as static fields in the main class.",
              "Go to the Simulation tab to observe line execution and variable states.",
              "Step through the simulation to watch how the JVM reads the static variables.",
              "Observe the memory state showing default value assignments.",
              "Navigate to the Code Test tab and run the program to print all values.",
              "Submit the code and verify the output displays correctly.",
              "Take the Posttest to complete the experiment."
            ],
            simulation: {
              code: "public class DefaultValues {\n    static boolean b;\n    static char c;\n    static int i;\n    static double d;\n    public static void main(String[] args) {\n        System.out.println(\"boolean: \" + b);\n        System.out.println(\"int: \" + i);\n        System.out.println(\"double: \" + d);\n    }\n}",
              steps: [
                { line: 1, annotation: "Class DefaultValues loaded into JVM. Static variables b, c, i, d initialized to default values.", memory: [{ variable: "b", type: "boolean", value: "false" }, { variable: "c", type: "char", value: "\\u0000" }, { variable: "i", type: "int", value: "0" }, { variable: "d", type: "double", value: "0.0" }], output: "" },
                { line: 6, annotation: "Execute main method. Accessing static boolean field b.", memory: [{ variable: "b", type: "boolean", value: "false" }, { variable: "i", type: "int", value: "0" }, { variable: "d", type: "double", value: "0.0" }], output: "boolean: false\n" },
                { line: 7, annotation: "Accessing static integer field i.", memory: [{ variable: "b", type: "boolean", value: "false" }, { variable: "i", type: "int", value: "0" }, { variable: "d", type: "double", value: "0.0" }], output: "boolean: false\nint: 0\n" },
                { line: 8, annotation: "Accessing static double field d.", memory: [{ variable: "b", type: "boolean", value: "false" }, { variable: "i", type: "int", value: "0" }, { variable: "d", type: "double", value: "0.0" }], output: "boolean: false\nint: 0\ndouble: 0.0\n" }
              ]
            },
            posttest: [
              { question: "What is the default value of a char variable in Java?", options: ["' '", "'0'", "'\\u0000'", "null"], answerIndex: 2, hint: "Char defaults to the Unicode null character code." },
              { question: "Which primitive type represents a single precision 32-bit IEEE 754 floating point?", options: ["double", "float", "decimal", "real"], answerIndex: 1, hint: "Float uses 32 bits, double uses 64 bits." },
              { question: "Why does Java define default values for fields but not local variables?", options: ["Security purposes", "To prevent access conflicts", "To save memory", "To enforce strict initialization in methods"], answerIndex: 3, hint: "Enforcing local variable initialization prevents bugs from uninitialized pointers." },
              { question: "Which primitive has no default value size in JVM specs?", options: ["boolean", "char", "byte", "long"], answerIndex: 0, hint: "The size of a boolean is JVM-dependent." },
              { question: "What is the default value of double in Java?", options: ["0", "0.0", "0.0d", "0.0f"], answerIndex: 1, hint: "Double defaults to 0.0." }
            ],
            references: [
              "Gosling, J., Joy, B., Steele, G., and Bracha, G., 'The Java Language Specification', Oracle Press",
              "Schildt, H., 'Java: The Complete Reference', 12th Edition, McGraw-Hill",
              "Oracle Java Primitive Documentation: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html"
            ]
          }
        },
        {
          id: "java-e1-2",
          title: "Roots of Quadratic Equation",
          desc: "Calculate the roots of a quadratic equation ax^2 + bx + c = 0 based on the discriminant value.",
          expected: "Roots are real and distinct:\nRoot 1 = 2.0\nRoot 2 = 1.0",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to that accepts coefficients a, b, and c, calculates the discriminant d, determines the nature of the roots, and displays the mathematical roots.",
              bullets: [
                "Understand the core concepts of Roots of Quadratic Equation",
                "Implement a Java program that demonstrates roots of quadratic equation",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Roots of Quadratic Equation"
              ]
            },
            theory: [
              {
                title: "Quadratic Equations and Discriminants",
                body: [
                  "For a quadratic equation ax² + bx + c = 0, the roots are computed using: x = (-b ± √(b² - 4ac)) / (2a).",
                  "The discriminant D is: D = b² - 4ac.",
                  "• If D > 0: roots are real and distinct (different).",
                  "• If D == 0: roots are real and equal.",
                  "• If D < 0: roots are complex and imaginary."
                ]
              }
            ],
            pretest: [
              { question: "What is the formula for the discriminant of quadratic equation?", options: ["b - 4ac", "b^2 - 4ac", "b^2 + 4ac", "4ac - b^2"], answerIndex: 1, hint: "It is the term under the square root in the quadratic formula." },
              { question: "If the discriminant is negative, the roots are:", options: ["Real and equal", "Real and distinct", "Complex and imaginary", "Rational"], answerIndex: 2, hint: "Taking the square root of a negative number yields imaginary results." },
              { question: "Which method in Java Math class is used to calculate the square root?", options: ["Math.sqr()", "Math.sqrt()", "Math.power()", "Math.root()"], answerIndex: 1, hint: "Abbreviated as sqrt." },
              { question: "What mathematical class provides trigonometric and algebraic functions in Java?", options: ["java.lang.System", "java.lang.Math", "java.util.Scanner", "java.io.Math"], answerIndex: 1, hint: "Part of standard java.lang package, called Math." },
              { question: "What happens in the quadratic formula if coefficient 'a' is zero?", options: ["Roots are zero", "Division by zero (undefined)", "Normal linear roots", "Imaginary roots"], answerIndex: 1, hint: "Dividing by 2a yields division by zero when a = 0." }
            ],
            procedure: [
              "Read the Aim and Theory to review the discriminant formula.",
              "Declare variables a, b, c, discriminant, r1, and r2 of type double.",
              "Calculate D = b*b - 4*a*c.",
              "Implement an if-else block to check D > 0, D == 0, and D < 0.",
              "In Simulation tab, step through the execution path with a=1, b=-3, c=2.",
              "Observe the calculated roots inside the memory panel.",
              "Go to the Code Test tab and run the program to verify standard output.",
              "Perform Posttest calculations to evaluate understanding."
            ],
            simulation: {
              code: "public class QuadraticRoots {\n    public static void main(String[] args) {\n        double a = 1, b = -3, c = 2;\n        double d = b * b - 4 * a * c;\n        if (d > 0) {\n            double r1 = (-b + Math.sqrt(d)) / (2 * a);\n            double r2 = (-b - Math.sqrt(d)) / (2 * a);\n            System.out.println(\"Root 1 = \" + r1);\n            System.out.println(\"Root 2 = \" + r2);\n        }\n    }\n}",
              steps: [
                { line: 3, annotation: "Variables a, b, c initialized with quadratic coefficients.", memory: [{ variable: "a", type: "double", value: "1.0" }, { variable: "b", type: "double", value: "-3.0" }, { variable: "c", type: "double", value: "2.0" }], output: "" },
                { line: 4, annotation: "Calculate discriminant: D = (-3)^2 - 4*(1)*(2) = 9 - 8 = 1.0.", memory: [{ variable: "a", type: "double", value: "1.0" }, { variable: "b", type: "double", value: "-3.0" }, { variable: "c", type: "double", value: "2.0" }, { variable: "d", type: "double", value: "1.0" }], output: "" },
                { line: 5, annotation: "Check condition D > 0 (1.0 > 0 is True). Enter branch.", memory: [{ variable: "a", type: "double", value: "1.0" }, { variable: "b", type: "double", value: "-3.0" }, { variable: "c", type: "double", value: "2.0" }, { variable: "d", type: "double", value: "1.0" }], output: "" },
                { line: 6, annotation: "Calculate root 1: (3 + sqrt(1.0)) / 2 = 2.0.", memory: [{ variable: "a", type: "double", value: "1.0" }, { variable: "b", type: "double", value: "-3.0" }, { variable: "c", type: "double", value: "2.0" }, { variable: "d", type: "double", value: "1.0" }, { variable: "r1", type: "double", value: "2.0" }], output: "" },
                { line: 7, annotation: "Calculate root 2: (3 - sqrt(1.0)) / 2 = 1.0.", memory: [{ variable: "a", type: "double", value: "1.0" }, { variable: "b", type: "double", value: "-3.0" }, { variable: "c", type: "double", value: "2.0" }, { variable: "d", type: "double", value: "1.0" }, { variable: "r1", type: "double", value: "2.0" }, { variable: "r2", type: "double", value: "1.0" }], output: "" },
                { line: 8, annotation: "Print Root 1 value.", memory: [{ variable: "r1", type: "double", value: "2.0" }, { variable: "r2", type: "double", value: "1.0" }], output: "Root 1 = 2.0\n" },
                { line: 9, annotation: "Print Root 2 value.", memory: [{ variable: "r1", type: "double", value: "2.0" }, { variable: "r2", type: "double", value: "1.0" }], output: "Root 1 = 2.0\nRoot 2 = 1.0\n" }
              ]
            },
            posttest: [
              { question: "What type of value is returned by the Math.sqrt() function?", options: ["int", "float", "double", "BigDecimal"], answerIndex: 2, hint: "Most methods in Java's Math class return double precision values." },
              { question: "If a = 1, b = 2, c = 1, what is the value of the discriminant?", options: ["1", "0", "-1", "4"], answerIndex: 1, hint: "2^2 - 4*1*1 = 4 - 4 = 0." },
              { question: "How would you express imaginary roots in the output?", options: ["Throw an exception", "Print as complex numbers a + ib", "Return -1", "Ignore output"], answerIndex: 1, hint: "For D < 0, format and output the real part and imaginary part independently." },
              { question: "Which operator is used to determine equality in Java control flow?", options: ["=", "==", "===", "equals"], answerIndex: 1, hint: "== is the relational equality operator in Java." },
              { question: "What is the return type of Math.pow(2, 3)?", options: ["int", "double", "long", "float"], answerIndex: 1, hint: "Exponential Math operations return double values." }
            ],
            references: [
              "JNTUGV IT-R23 Syllabus Guidelines",
              "Java Control Flow Tutorial: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html",
              "Schildt, H., 'Java: A Beginner's Guide', 9th Edition"
            ]
          }
        }
      ]
    },
    {
      title: "EXERCISE 2",
      objective: "Develop search and sort algorithms in Java and handle text manipulation using StringBuffer.",
      tutorial: "Tutorial 2: Arrays, Strings, and StringBuffers",
      labTitle: "Lab 2: Search, Sort & StringBuffer",
      experiments: [
        {
          id: "java-e2-1",
          title: "Binary Search",
          desc: "Implement a binary search algorithm to look up a search key in a pre-sorted integer array.",
          expected: "Element found at index 3",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to search for a target element in a pre-sorted array of integers using the binary search mechanism in java.",
              bullets: [
                "Understand the core concepts of Binary Search",
                "Implement a Java program that demonstrates binary search",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Binary Search"
              ]
            },
            theory: [
              {
                title: "Binary Search Theory",
                body: [
                  "Binary search is an efficient search algorithm on sorted arrays. It works by repeatedly dividing the search space in half.",
                  "1. Set low = 0, high = length - 1.",
                  "2. Calculate mid = (low + high) / 2.",
                  "3. If array[mid] matches target, return mid.",
                  "4. If target < array[mid], set high = mid - 1.",
                  "5. If target > array[mid], set low = mid + 1.",
                  "6. Repeat until low exceeds high (element not found)."
                ]
              }
            ],
            pretest: [
              { question: "What is the pre-requisite for binary search?", options: ["Array must be unsorted", "Array must be sorted", "Array must contain only unique values", "Array size must be prime"], answerIndex: 1, hint: "Binary search relies on ordering to discard half the search space." },
              { question: "What is the worst-case time complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answerIndex: 2, hint: "Because the search space is halved at each step." },
              { question: "How is the mid index calculated in binary search?", options: ["(low + high) / 2", "(low * high) / 2", "(high - low)", "low + high"], answerIndex: 0, hint: "It is the average of low and high boundaries." },
              { question: "What occurs if the search target is not in the array?", options: ["Throws exception", "Returns mid index", "Loop terminates and search fails", "Returns 0"], answerIndex: 2, hint: "The low index becomes greater than the high index, ending the search." },
              { question: "In a sorted array of 1024 elements, what is the maximum number of comparisons for binary search?", options: ["1024", "10", "11", "512"], answerIndex: 1, hint: "log2(1024) = 10." }
            ],
            procedure: [
              "Read the Aim and Theory to review binary search.",
              "Declare a sorted integer array and target value.",
              "Initialize variables low = 0, high = array.length - 1.",
              "Enter a while loop (low <= high) and calculate mid.",
              "Observe execution flow and index variable modifications in the Simulation tab.",
              "Inspect array index calculations in the memory panel.",
              "Go to the Code Test tab and run the program.",
              "Complete the Posttest to confirm binary search understanding."
            ],
            simulation: {
              code: "public class BinarySearch {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40, 50};\n        int target = 40;\n        int low = 0, high = 4;\n        while (low <= high) {\n            int mid = (low + high) / 2;\n            if (arr[mid] == target) {\n                System.out.println(\"Element found at index \" + mid);\n                break;\n            } else if (arr[mid] < target) {\n                low = mid + 1;\n            } else {\n                high = mid - 1;\n            }\n        }\n    }\n}",
              steps: [
                { line: 3, annotation: "Sorted array and target variable (40) initialized.", memory: [{ variable: "target", type: "int", value: "40" }, { variable: "low", type: "int", value: "0" }, { variable: "high", type: "int", value: "4" }], output: "" },
                { line: 5, annotation: "Check loop condition low <= high (0 <= 4 is True).", memory: [{ variable: "target", type: "int", value: "40" }, { variable: "low", type: "int", value: "0" }, { variable: "high", type: "int", value: "4" }], output: "" },
                { line: 6, annotation: "Calculate mid index: (0 + 4)/2 = 2.", memory: [{ variable: "target", type: "int", value: "40" }, { variable: "low", type: "int", value: "0" }, { variable: "high", type: "int", value: "4" }, { variable: "mid", type: "int", value: "2" }], output: "" },
                { line: 7, annotation: "Compare arr[2] (30) with target (40). 30 != 40.", memory: [{ variable: "mid", type: "int", value: "2" }], output: "" },
                { line: 10, annotation: "Check arr[mid] < target (30 < 40 is True). Adjust low = mid + 1 = 3.", memory: [{ variable: "target", type: "int", value: "40" }, { variable: "low", type: "int", value: "3" }, { variable: "high", type: "int", value: "4" }], output: "" },
                { line: 5, annotation: "Check loop condition low <= high (3 <= 4 is True).", memory: [{ variable: "low", type: "int", value: "3" }, { variable: "high", type: "int", value: "4" }], output: "" },
                { line: 6, annotation: "Recalculate mid index: (3 + 4)/2 = 3.", memory: [{ variable: "target", type: "int", value: "40" }, { variable: "low", type: "int", value: "3" }, { variable: "high", type: "int", value: "4" }, { variable: "mid", type: "int", value: "3" }], output: "" },
                { line: 7, annotation: "Compare arr[3] (40) with target (40). 40 == 40 is True.", memory: [{ variable: "mid", type: "int", value: "3" }], output: "" },
                { line: 8, annotation: "Print result indicating element found.", memory: [], output: "Element found at index 3\n" }
              ]
            },
            posttest: [
              { question: "What is the best-case time complexity of binary search?", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answerIndex: 0, hint: "This occurs if the middle element itself is the target key." },
              { question: "What occurs to 'low' and 'high' variables if low exceeds high?", options: ["Throws ArrayIndexOutOfBoundsException", "The element is absent in the array", "StackOverflowError", "Infinite recursion"], answerIndex: 1, hint: "This signifies the search space is exhausted." },
              { question: "How do you declare an array of size 10 in Java?", options: ["int arr = new int[10];", "int[] arr = new int[10];", "int arr() = new int[10];", "int[10] arr = new int[];"], answerIndex: 1, hint: "Type signature must specify array type followed by initial sizing allocation." },
              { question: "Which package contains Arrays utility binarySearch methods?", options: ["java.lang", "java.io", "java.util", "java.net"], answerIndex: 2, hint: "Contains collection helpers, and is called java.util." },
              { question: "What is the result of binary search if a duplicate element is present?", options: ["Always returns first occurrence", "Always returns last occurrence", "Returns any occurrence index arbitrarily", "Throws error"], answerIndex: 2, hint: "Standard binary search does not guarantee which matching index is located first." }
            ],
            references: [
              "Knuth, D. E., 'The Art of Computer Programming, Volume 3: Sorting and Searching'",
              "Java Array API: https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e2-2",
          title: "Bubble Sort",
          desc: "Write a Java program to sort an array of integers using the bubble sort mechanism.",
          expected: "Sorted array: 11 12 22 25 34 64 90",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to sort a given array of integers in ascending order using the bubble sort algorithm in java.",
              bullets: [
                "Understand the core concepts of Bubble Sort",
                "Implement a Java program that demonstrates bubble sort",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Bubble Sort"
              ]
            },
            theory: [
              {
                title: "Bubble Sort Algorithm",
                body: [
                  "Bubble Sort is a comparison-based sorting algorithm. It works by repeatedly stepping through the list to be sorted, comparing adjacent elements and swapping them if they are in the wrong order.",
                  "This pass is repeated until no swaps are needed, indicating the array is sorted. The algorithm gets its name because smaller elements 'bubble' to the top of the list."
                ]
              }
            ],
            pretest: [
              { question: "What is the average time complexity of bubble sort?", options: ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"], answerIndex: 3, hint: "It requires nested loops to pass through and compare elements." },
              { question: "What is the primary operation performed in bubble sort when adjacent values are out of order?", options: ["Insertion", "Splitting", "Swapping", "Merging"], answerIndex: 2, hint: "Interchanging the positions of the two values." },
              { question: "What is the best-case time complexity of an optimized bubble sort?", options: ["O(1)", "O(n)", "O(n log n)", "O(n^2)"], answerIndex: 1, hint: "If a flag checks that no swaps occurred in the first pass." },
              { question: "How many passes are required to sort an array of size N in bubble sort?", options: ["N", "N - 1", "log N", "N^2"], answerIndex: 1, hint: "At most N-1 passes are required." },
              { question: "Is bubble sort a stable sorting algorithm?", options: ["Yes", "No", "Depends on elements", "JVM dependent"], answerIndex: 0, hint: "Yes, it preserves the relative order of duplicate elements." }
            ],
            procedure: [
              "Read the Aim and Theory to understand the bubble sort swapping logic.",
              "Define an unsorted array inside the main method.",
              "Implement nested loops: outer loop from 0 to N-1, inner loop from 0 to N-i-1.",
              "Compare adjacent elements `arr[j] > arr[j+1]` and swap using a temp variable.",
              "Observe line transitions and index variables in the Simulation tab.",
              "Inspect array updates inside the memory panel.",
              "Go to the Code Test tab, run the program, and view the sorted array.",
              "Complete the Posttest questions."
            ],
            simulation: {
              code: "public class BubbleSort {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2};\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++) {\n            for (int j = 0; j < n-i-1; j++) {\n                if (arr[j] > arr[j+1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j+1];\n                    arr[j+1] = temp;\n                }\n            }\n        }\n    }\n}",
              steps: [
                { line: 3, annotation: "Unsorted array initialized with elements [5, 1, 4, 2].", memory: [{ variable: "n", type: "int", value: "4" }], output: "" },
                { line: 5, annotation: "Outer loop start: pass i = 0.", memory: [{ variable: "i", type: "int", value: "0" }], output: "" },
                { line: 6, annotation: "Inner loop start: j = 0. Compare arr[0] (5) and arr[1] (1). 5 > 1 is True.", memory: [{ variable: "i", type: "int", value: "0" }, { variable: "j", type: "int", value: "0" }], output: "" },
                { line: 8, annotation: "Perform swap: store 5 in temp, assign arr[0] = 1, arr[1] = 5.", memory: [{ variable: "temp", type: "int", value: "5" }], output: "" },
                { line: 6, annotation: "Increment j = 1. Compare arr[1] (5) and arr[2] (4). 5 > 4 is True.", memory: [{ variable: "i", type: "int", value: "0" }, { variable: "j", type: "int", value: "1" }], output: "" },
                { line: 8, annotation: "Perform swap: assign arr[1] = 4, arr[2] = 5.", memory: [{ variable: "temp", type: "int", value: "5" }], output: "" },
                { line: 6, annotation: "Increment j = 2. Compare arr[2] (5) and arr[3] (2). 5 > 2 is True.", memory: [{ variable: "i", type: "int", value: "0" }, { variable: "j", type: "int", value: "2" }], output: "" },
                { line: 8, annotation: "Perform swap: assign arr[2] = 2, arr[3] = 5. Array is now [1, 4, 2, 5].", memory: [{ variable: "temp", type: "int", value: "5" }], output: "" }
              ]
            },
            posttest: [
              { question: "What is the space complexity of bubble sort?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answerIndex: 0, hint: "It requires only a single temporary variable for swapping." },
              { question: "What is the primary disadvantage of bubble sort?", options: ["Highly complex to write", "Requires auxiliary memory", "Unstable", "Inefficient for large datasets"], answerIndex: 3, hint: "Its quadratic time complexity makes it slow for large inputs." },
              { question: "Which sorting algorithm performs fewer swaps on average than bubble sort?", options: ["Selection Sort", "None", "Bogo Sort", "Stupid Sort"], answerIndex: 0, hint: "Selection sort only performs at most N swaps." },
              { question: "In bubble sort, where does the largest value settle after the first pass?", options: ["First index", "Middle index", "Last index", "Stays in place"], answerIndex: 2, hint: "The largest element bubbles up to the end of the array." },
              { question: "How do you optimize bubble sort to stop early if the array is already sorted?", options: ["Use a boolean swap flag", "Double the size of the array", "Divide array in two", "Use recursion"], answerIndex: 0, hint: "If no swap occurs in an inner loop pass, break early." }
            ],
            references: [
              "Cormen, T. H., 'Introduction to Algorithms'",
              "Bubble Sort Visualizations: https://visualgo.net/en/sorting",
              "Balagurusamy, E., 'Programming with Java'"
            ]
          }
        },
        {
          id: "java-e2-3",
          title: "StringBuffer Operations",
          desc: "Use the StringBuffer class to perform string deletions, insertions, and character modifications.",
          expected: "Modified String: Hello Java",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to using the stringbuffer class to demonstrate string editing, deleting, and character removal operations.",
              bullets: [
                "Understand the core concepts of StringBuffer Operations",
                "Implement a Java program that demonstrates stringbuffer operations",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to StringBuffer Operations"
              ]
            },
            theory: [
              {
                title: "String vs StringBuffer in Java",
                body: [
                  "In Java, String objects are immutable, meaning they cannot be modified once created. Every modification produces a new String object, which can lead to high memory consumption.",
                  "To resolve this, Java provides the mutable StringBuffer class. StringBuffer objects can be modified directly (appended, inserted, deleted, reversed) without creating new instances. StringBuffer is also thread-safe because its methods are synchronized."
                ]
              }
            ],
            pretest: [
              { question: "Which of the following describes the String class in Java?", options: ["Mutable", "Immutable", "Synchronized", "Dynamic"], answerIndex: 1, hint: "String values cannot be changed after declaration." },
              { question: "Which class provides a mutable sequence of characters and is thread-safe?", options: ["String", "StringBuilder", "StringBuffer", "CharBuffer"], answerIndex: 2, hint: "StringBuffer methods are synchronized for safety across threads." },
              { question: "What is the difference between StringBuffer and StringBuilder?", options: ["StringBuffer is synchronized, StringBuilder is not", "StringBuilder is synchronized, StringBuffer is not", "StringBuffer is immutable", "No difference"], answerIndex: 0, hint: "StringBuilder is faster because it lacks synchronization overhead." },
              { question: "Which method is used to remove a range of characters in StringBuffer?", options: ["remove()", "delete()", "erase()", "clear()"], answerIndex: 1, hint: "Takes start and end indices, and is called delete()." },
              { question: "What is the default initial capacity of a StringBuffer object?", options: ["0", "8", "16", "32"], answerIndex: 2, hint: "Java allocates 16 empty character slots by default." }
            ],
            procedure: [
              "Read the Aim and Theory to understand the mutability of StringBuffer.",
              "Instantiate a StringBuffer: `StringBuffer sb = new StringBuffer(\"Hello World\");`.",
              "Use `sb.delete(start, end)` to delete a range of characters.",
              "Use `sb.deleteCharAt(index)` to remove a specific character.",
              "In the Simulation tab, step through the modifications of StringBuffer content.",
              "View capacity and character array details in the memory panel.",
              "Go to the Code Test tab to run and verify StringBuffer outputs.",
              "Proceed to the Posttest."
            ],
            simulation: {
              code: "public class TestStringBuffer {\n    public static void main(String[] args) {\n        StringBuffer sb = new StringBuffer(\"Hello World\");\n        sb.delete(5, 11);\n        sb.append(\" Java\");\n        System.out.println(\"Modified String: \" + sb.toString());\n    }\n}",
              steps: [
                { line: 3, annotation: "StringBuffer created with string 'Hello World'.", memory: [{ variable: "sb", type: "StringBuffer", value: "\"Hello World\" (capacity: 27)" }], output: "" },
                { line: 4, annotation: "Delete characters from index 5 to 11. StringBuffer is now 'Hello'.", memory: [{ variable: "sb", type: "StringBuffer", value: "\"Hello\"" }], output: "" },
                { line: 5, annotation: "Append ' Java' to StringBuffer. StringBuffer is now 'Hello Java'.", memory: [{ variable: "sb", type: "StringBuffer", value: "\"Hello Java\"" }], output: "" },
                { line: 6, annotation: "Print the final modified buffer string.", memory: [], output: "Modified String: Hello Java\n" }
              ]
            },
            posttest: [
              { question: "What is the output of sb.append() if sb is 'Hello' and argument is 'World'?", options: ["Hello", "World", "HelloWorld", "Hello World"], answerIndex: 2, hint: "It appends directly without spaces unless specified." },
              { question: "Which method returns the total allocated space in StringBuffer?", options: ["length()", "capacity()", "size()", "volume()"], answerIndex: 1, hint: "Capacity returns slots, length returns actual character count." },
              { question: "What is the result of sb.reverse() if sb is 'Java'?", options: ["Java", "avaJ", "Jva", "aJav"], answerIndex: 1, hint: "Reverses all characters." },
              { question: "Does delete(int start, int end) include the character at the 'end' index?", options: ["Yes", "No", "Depends on string", "JVM dependent"], answerIndex: 1, hint: "No, start is inclusive, end is exclusive." },
              { question: "How can you convert a StringBuffer back to a standard String?", options: ["sb.toString()", "(String)sb", "sb.convert()", "sb.getString()"], answerIndex: 0, hint: "Uses the inherited Object toString() method." }
            ],
            references: [
              "StringBuffer Javadoc: https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        }
      ]
    },
    {
      title: "EXERCISE 3",
      objective: "Learn class structures, method overloading, constructors, and constructor overloading in Java.",
      tutorial: "Tutorial 3: Objects, Classes & Constructors",
      labTitle: "Lab 3: OOP Foundations & Overloading",
      experiments: [
        {
          id: "java-e3-1",
          title: "Class Mechanism",
          desc: "Create a Java class with attributes and methods, instantiate it, and invoke methods inside the main method.",
          expected: "Dog Name: Bruno\nDog Breed: Labrador",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to demonstrating class creation, object instantiation, and invocation of methods through an object reference.",
              bullets: [
                "Understand the core concepts of Class Mechanism",
                "Implement a Java program that demonstrates class mechanism",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Class Mechanism"
              ]
            },
            theory: [
              {
                title: "Classes and Objects",
                body: [
                  "A class is a blueprint or template that defines the state (fields) and behavior (methods) of a real-world entity.",
                  "An object is an instance of a class. The `new` keyword is used to allocate memory dynamically for objects on the heap, returning a reference to that object. Dot operator (.) is used to access members and methods."
                ]
              }
            ],
            pretest: [
              { question: "Which keyword is used to instantiate an object in Java?", options: ["class", "interface", "new", "this"], answerIndex: 2, hint: "Allocates heap space for a new object." },
              { question: "A class is defined as a:", options: ["Runtime instance", "Data function", "Blueprint / Template", "Pointer structure"], answerIndex: 2, hint: "Defines template structures for objects." },
              { question: "What memory section stores Java object instances?", options: ["Stack", "Heap", "Register", "Cache"], answerIndex: 1, hint: "Dynamic allocations go to the Heap, local references go to the Stack." },
              { question: "Which operator is used to access fields and methods of an object?", options: ["->", "::", ".", "@"], answerIndex: 2, hint: "The dot operator." },
              { question: "What is a method in Java?", options: ["A variable holding state", "A block of code defining behaviors", "A compiler utility", "An import keyword"], answerIndex: 1, hint: "Defines class behavior." }
            ],
            procedure: [
              "Read the Aim and Theory to understand classes.",
              "Define a class (e.g., Dog) with fields (name, breed) and a display method.",
              "In the main class, instantiate Dog using `new Dog()`.",
              "Observe instantiation and object references in the Simulation tab.",
              "Inspect heap reference address changes in the memory panel.",
              "Go to the Code Test tab and run the class setup.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class Dog {\n    String name;\n    String breed;\n    void display() {\n        System.out.println(\"Dog Name: \" + name);\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.name = \"Bruno\";\n        d.display();\n    }\n}",
              steps: [
                { line: 9, annotation: "Create a reference variable 'd' on stack. Allocate new Dog object on Heap.", memory: [{ variable: "d", type: "Dog", value: "Dog@01 (fields: name=null, breed=null)" }], output: "" },
                { line: 10, annotation: "Assign string 'Bruno' to the name field of Dog object.", memory: [{ variable: "d", type: "Dog", value: "Dog@01 (fields: name=\"Bruno\", breed=null)" }], output: "" },
                { line: 11, annotation: "Invoke d.display() method which accesses name field.", memory: [], output: "Dog Name: Bruno\n" }
              ]
            },
            posttest: [
              { question: "Can a single class have multiple active object instances?", options: ["No", "Yes, up to 256", "Yes, unlimited", "Depends on compilation"], answerIndex: 2, hint: "You can create as many instances as memory allows." },
              { question: "What represents the state of an object?", options: ["Methods", "Fields / Instance Variables", "Imports", "Keywords"], answerIndex: 1, hint: "Attributes or fields hold state values." },
              { question: "What occurs if you call a method on a reference variable that is null?", options: ["Prints null", "Returns 0", "Throws NullPointerException", "Throws ClassCastException"], answerIndex: 2, hint: "Null reference has no allocated object to resolve methods against." },
              { question: "Which statement defines a class in Java?", options: ["class MyClass {}", "struct MyClass {}", "interface MyClass {}", "new MyClass {}"], answerIndex: 0, hint: "Uses the class keyword." },
              { question: "Can you define a class without any methods?", options: ["No", "Yes", "Only if it is static", "Only if it is abstract"], answerIndex: 1, hint: "Yes, data-only classes are fully valid." }
            ],
            references: [
              "Oracle Java Object Tutorial: https://docs.oracle.com/javase/tutorial/java/javaOO/objects.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e3-2",
          title: "Method Overloading",
          desc: "Write a Java program to implement method overloading by redefining methods with different parameters.",
          expected: "Sum of integers: 5\nSum of doubles: 5.7",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to demonstrating method overloading, where methods share the same name but differ in parameters.",
              bullets: [
                "Understand the core concepts of Method Overloading",
                "Implement a Java program that demonstrates method overloading",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Method Overloading"
              ]
            },
            theory: [
              {
                title: "Method Overloading Theory",
                body: [
                  "Method Overloading is a feature that allows a class to have more than one method with the same name, provided their parameter lists are different.",
                  "Parameter lists can differ by:",
                  "1. Number of parameters.",
                  "2. Data type of parameters.",
                  "3. Sequence of data types.",
                  "Note: Overloading is resolved at compile-time (Compile-time Polymorphism) based on arguments. Changing the return type alone does NOT overload methods."
                ]
              }
            ],
            pretest: [
              { question: "Method Overloading is resolved at:", options: ["Compile-time", "Runtime", "Execution check", "Link-time"], answerIndex: 0, hint: "The compiler chooses the method signature based on arguments." },
              { question: "Which of the following allows method overloading?", options: ["Changing return type only", "Changing parameter types", "Renaming variables", "Changing accessibility modifiers"], answerIndex: 1, hint: "Only changing parameter counts, types, or sequences overloads methods." },
              { question: "Method Overloading is also known as:", options: ["Static Binding / Early Binding", "Dynamic Binding / Late Binding", "Method Overriding", "Abstraction"], answerIndex: 0, hint: "Determined statically before execution." },
              { question: "Can we overload the main method in Java?", options: ["No", "Yes", "Only if static is removed", "Only in child classes"], answerIndex: 1, hint: "Yes, you can define other main methods, but JVM only runs public static void main(String[] args)." },
              { question: "What determines if two overloaded methods are distinct?", options: ["Return types", "Exceptions thrown", "Method signatures", "Variable names"], answerIndex: 2, hint: "Signature includes the method name and parameter list." }
            ],
            procedure: [
              "Read the Aim and Theory to understand Compile-time Polymorphism.",
              "Define a class (e.g., Adder) with two static methods named add().",
              "Make one accept integers: `add(int, int)` and another doubles: `add(double, double)`.",
              "In main, invoke both and observe parameter matching in the Simulation tab.",
              "Check double vs int routing in the output console.",
              "Verify and run the code in the Code Test tab.",
              "Proceed to the Posttest."
            ],
            simulation: {
              code: "class Adder {\n    static int add(int a, int b) { return a + b; }\n    static double add(double a, double b) { return a + b; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Sum of integers: \" + Adder.add(2, 3));\n        System.out.println(\"Sum of doubles: \" + Adder.add(2.5, 3.2));\n    }\n}",
              steps: [
                { line: 6, annotation: "Invoke Adder.add(int, int) with arguments 2 and 3. Resolved statically to integer method.", memory: [], output: "Sum of integers: 5\n" },
                { line: 7, annotation: "Invoke Adder.add(double, double) with arguments 2.5 and 3.2. Resolved statically to double method.", memory: [], output: "Sum of integers: 5\nSum of doubles: 5.7\n" }
              ]
            },
            posttest: [
              { question: "What occurs if two methods have the same name and parameters but different return types?", options: ["Code compiles normally", "Compilation error", "Runtime exception", "Warning generated"], answerIndex: 1, hint: "Return type is not considered part of the signature for uniqueness checks." },
              { question: "Can we overload static methods in Java?", options: ["No", "Yes", "Only in interfaces", "Only in abstract classes"], answerIndex: 1, hint: "Yes, static methods can be overloaded just like instance methods." },
              { question: "Which binding mechanism matches overloaded methods?", options: ["Late binding", "Early binding", "Dynamic binding", "No binding"], answerIndex: 1, hint: "Early binding occurs during compilation." },
              { question: "What is dynamic method dispatch?", options: ["Overloading", "Overriding resolution at runtime", "Constructor invocation", "Garbage collection"], answerIndex: 1, hint: "It is overriding, not overloading." },
              { question: "Is int add(int a, float b) overloaded with int add(float a, int b)?", options: ["No", "Yes", "Throws compile error", "Depends on double values"], answerIndex: 1, hint: "Yes, because the order of parameter types differs." }
            ],
            references: [
              "Java Overloading Guidelines: https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e3-3",
          title: "Constructor Implementation",
          desc: "Implement a default constructor and parameterized constructor to initialize object instance fields.",
          expected: "Rectangle Area = 200",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to implementing constructors (default and parameterized) to initialize object state attributes.",
              bullets: [
                "Understand the core concepts of Constructor Implementation",
                "Implement a Java program that demonstrates constructor implementation",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Constructor Implementation"
              ]
            },
            theory: [
              {
                title: "Constructors in Java",
                body: [
                  "A constructor is a block of code similar to a method that is called when an instance of an object is created.",
                  "Key rules for constructors:",
                  "1. Constructor name must match the class name exactly.",
                  "2. Constructor must NOT have an explicit return type (not even void).",
                  "3. If no constructor is written, the compiler automatically inserts a default no-argument constructor. If any custom constructor is written, the default constructor is NOT created automatically."
                ]
              }
            ],
            pretest: [
              { question: "What is the return type of a constructor in Java?", options: ["void", "int", "None (not even void)", "Same as class type"], answerIndex: 2, hint: "Constructors lack return type definitions entirely." },
              { question: "When is a constructor executed?", options: ["When class is loaded", "When method is called", "When object is created using new", "At JVM shutdown"], answerIndex: 2, hint: "Triggered during object instantiation." },
              { question: "Which constructor is supplied automatically by the compiler if none are written?", options: ["Default constructor", "Parameterized constructor", "Static constructor", "Copy constructor"], answerIndex: 0, hint: "A no-argument default constructor." },
              { question: "If you define a parameterized constructor, does the compiler still supply a default constructor?", options: ["Yes", "No", "Depends on static variables", "Only if public"], answerIndex: 1, hint: "Once a custom constructor is defined, the automatic default constructor is suppressed." },
              { question: "What keyword refers to the current object instance within a constructor?", options: ["super", "this", "class", "current"], answerIndex: 1, hint: "The 'this' keyword." }
            ],
            procedure: [
              "Read the Aim and Theory to understand constructor syntax.",
              "Create a Rectangle class with fields: width, height.",
              "Implement a parameterized constructor `Rectangle(int w, int h)` to initialize them.",
              "In main, instantiate with values `new Rectangle(20, 10)`.",
              "Observe constructor variable mapping in the Simulation tab.",
              "Examine object memory fields update to 20 and 10.",
              "Run and compile the code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class Rectangle {\n    int width;\n    int height;\n    Rectangle(int w, int h) {\n        this.width = w;\n        this.height = h;\n    }\n    int getArea() { return width * height; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Rectangle r = new Rectangle(20, 10);\n        System.out.println(\"Rectangle Area = \" + r.getArea());\n    }\n}",
              steps: [
                { line: 10, annotation: "Invoke constructor with arguments w=20, h=10.", memory: [{ variable: "w", type: "int", value: "20" }, { variable: "h", type: "int", value: "10" }], output: "" },
                { line: 5, annotation: "Execute constructor body. assign w (20) to this.width.", memory: [{ variable: "this.width", type: "int", value: "20" }], output: "" },
                { line: 6, annotation: "Assign h (10) to this.height.", memory: [{ variable: "this.width", type: "int", value: "20" }, { variable: "this.height", type: "int", value: "10" }], output: "" },
                { line: 11, annotation: "Calculate and print area: 20 * 10 = 200.", memory: [], output: "Rectangle Area = 200\n" }
              ]
            },
            posttest: [
              { question: "Can a constructor be declared private?", options: ["No", "Yes", "Only if class is static", "Only if it returns int"], answerIndex: 1, hint: "Yes, private constructors are used in Singleton patterns." },
              { question: "Which keyword calls another constructor in the same class?", options: ["this()", "super()", "new()", "construct()"], answerIndex: 0, hint: "this() constructor call must be the first statement." },
              { question: "What is constructor chaining?", options: ["Creating multiple objects", "Calling one constructor from another", "Using inheritance", "Synchronizing class definitions"], answerIndex: 1, hint: "A sequence of constructor invocations." },
              { question: "Can a constructor be declared abstract?", options: ["Yes", "No", "Only if class is abstract", "Depends on JDK version"], answerIndex: 1, hint: "Constructors cannot be abstract, static, final, or synchronized." },
              { question: "Can we use 'return' inside a constructor?", options: ["No", "Yes, with empty value return;", "Yes, returning int", "Only static values"], answerIndex: 1, hint: "Yes, you can write 'return;' to exit early, but not return any value." }
            ],
            references: [
              "Oracle Constructor Tutorial: https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e3-4",
          title: "Constructor Overloading",
          desc: "Implement constructor overloading to instantiate objects with different initialization parameters.",
          expected: "Box 1 Volume = 1.0\nBox 2 Volume = 60.0",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to illustrating constructor overloading, enabling object initialization via different signatures.",
              bullets: [
                "Understand the core concepts of Constructor Overloading",
                "Implement a Java program that demonstrates constructor overloading",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Constructor Overloading"
              ]
            },
            theory: [
              {
                title: "Constructor Overloading Theory",
                body: [
                  "Just like methods, constructors can also be overloaded in Java.",
                  "Constructor Overloading allows a class to have multiple constructors with different parameter lists, so objects can be initialized in different ways (e.g., with default values, identical coordinates, or fully custom parameters)."
                ]
              }
            ],
            pretest: [
              { question: "What is constructor overloading?", options: ["Defining constructors in multiple classes", "Defining multiple constructors with different parameters in the same class", "Overriding a constructor in a subclass", "Calling a constructor recursively"], answerIndex: 1, hint: "Similar to method overloading, but for constructor definitions." },
              { question: "How does the compiler differentiate between overloaded constructors?", options: ["By return type", "By accessibility modifiers", "By parameter signature lists", "By execution order"], answerIndex: 2, hint: "Resolved by comparing arguments matching constructor parameter types." },
              { question: "What is the purpose of constructor overloading?", options: ["To allocate extra memory", "To support different object initialization states", "To override parent constructors", "To speed up compilation"], answerIndex: 1, hint: "Provides options to set up objects with various parameters." },
              { question: "Which statement is true about constructor overloading?", options: ["It uses dynamic binding", "Overloaded constructors must have different names", "Overloaded constructors must have the same name but different signatures", "It throws exceptions during compilation"], answerIndex: 2, hint: "Constructor names must always match the class name, but signatures must differ." },
              { question: "Can overloaded constructors invoke each other?", options: ["No", "Yes, using super()", "Yes, using this()", "Only if static"], answerIndex: 2, hint: "Using the this() statement at the first line of the constructor." }
            ],
            procedure: [
              "Read the Aim and Theory to review constructor signatures.",
              "Create a Box class with variables: width, height, depth.",
              "Write a no-arg constructor initializing dimensions to 1.0.",
              "Write a parameterized constructor `Box(double w, double h, double d)`.",
              "In main, instantiate Box1 with no-args and Box2 with arguments (3.0, 4.0, 5.0).",
              "In Simulation, observe which constructor is executed for each object.",
              "Check variable assignments in the memory state panel.",
              "Run and compile the code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class Box {\n    double width, height, depth;\n    Box() {\n        width = height = depth = 1.0;\n    }\n    Box(double w, double h, double d) {\n        width = w; height = h; depth = d;\n    }\n    double volume() { return width * height * depth; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b1 = new Box();\n        Box b2 = new Box(3, 4, 5);\n        System.out.println(\"Box 1 Volume = \" + b1.volume());\n        System.out.println(\"Box 2 Volume = \" + b2.volume());\n    }\n}",
              steps: [
                { line: 12, annotation: "Instantiate Box b1 using no-arg constructor.", memory: [{ variable: "b1", type: "Box", value: "Box@01" }], output: "" },
                { line: 4, annotation: "Execute no-arg constructor. Assign default size: width = height = depth = 1.0.", memory: [{ variable: "b1.width", type: "double", value: "1.0" }, { variable: "b1.height", type: "double", value: "1.0" }, { variable: "b1.depth", type: "double", value: "1.0" }], output: "" },
                { line: 13, annotation: "Instantiate Box b2 using parameterized constructor (3.0, 4.0, 5.0).", memory: [{ variable: "b1", type: "Box", value: "Box@01" }, { variable: "b2", type: "Box", value: "Box@02" }], output: "" },
                { line: 7, annotation: "Execute parameterized constructor. Assign: w=3, h=4, d=5.", memory: [{ variable: "b2.width", type: "double", value: "3.0" }, { variable: "b2.height", type: "double", value: "4.0" }, { variable: "b2.depth", type: "double", value: "5.0" }], output: "" },
                { line: 14, annotation: "Print Box 1 volume: 1.0 * 1.0 * 1.0 = 1.0.", memory: [], output: "Box 1 Volume = 1.0\n" },
                { line: 15, annotation: "Print Box 2 volume: 3.0 * 4.0 * 5.0 = 60.0.", memory: [], output: "Box 1 Volume = 1.0\nBox 2 Volume = 60.0\n" }
              ]
            },
            posttest: [
              { question: "In constructor chaining, this() call must reside on:", options: ["Any line", "The first line", "The last line", "Only inside methods"], answerIndex: 1, hint: "Java requires this() to be the absolute first statement in the constructor." },
              { question: "What is the maximum number of overloaded constructors you can write?", options: ["8", "16", "Unlimited", "1"], answerIndex: 2, hint: "As many distinct parameter signatures as required." },
              { question: "Can we call super() and this() in the same constructor?", options: ["Yes", "No", "Only if public", "Depends on JDK version"], answerIndex: 1, hint: "No, both must be the first statement, which is physically impossible." },
              { question: "What is the compiler error if two constructors match identical parameters?", options: ["Constructor already defined", "Duplicate class signature", "Stack overflow", "Null pointer exception"], answerIndex: 0, hint: "The signature matches exactly, causing duplicate definitions error." },
              { question: "Does constructor overloading allow code reuse?", options: ["No", "Yes, by calling this()", "Yes, using static overrides", "Only in child classes"], answerIndex: 1, hint: "By using this() to delegate initialization to other constructors." }
            ],
            references: [
              "JNTUGV IT-R23 Reference Books",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        }
      ]
    },
    {
      title: "EXERCISE 4",
      objective: "Explore Single Inheritance, Multilevel Inheritance, and Abstraction via abstract classes.",
      tutorial: "Tutorial 4: Inheritance and Abstract Classes",
      labTitle: "Lab 4: Inheritance & Abstraction",
      experiments: [
        {
          id: "java-e4-1",
          title: "Single Inheritance",
          desc: "Write a Java program to implement Single Inheritance where a subclass extends a superclass.",
          expected: "Parent shows: 10\nChild shows: 20",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to demonstrating single inheritance, where a subclass inherits fields and methods of a single parent class.",
              bullets: [
                "Understand the core concepts of Single Inheritance",
                "Implement a Java program that demonstrates single inheritance",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Single Inheritance"
              ]
            },
            theory: [
              {
                title: "Single Inheritance Theory",
                body: [
                  "Inheritance is a key mechanism of OOP that allows one class (subclass/child) to inherit the state and behavior of another class (superclass/parent).",
                  "In Single Inheritance, there is exactly one parent class and one child class. The `extends` keyword is used. Inheritance models an 'IS-A' relationship (e.g., Car IS-A Vehicle)."
                ]
              }
            ],
            pretest: [
              { question: "Which keyword establishes inheritance in Java?", options: ["implements", "extends", "inherits", "super"], answerIndex: 1, hint: "Used to extend class definitions." },
              { question: "The class that is inherited from is called the:", options: ["Subclass", "Superclass / Parent class", "Derived class", "Interface"], answerIndex: 1, hint: "The parent or superclass." },
              { question: "Which relationship model describes inheritance?", options: ["HAS-A", "IS-A", "USES-A", "PART-OF"], answerIndex: 1, hint: "A subclass IS-A type of its parent." },
              { question: "Can a class extend multiple classes in Java?", options: ["Yes", "No", "Only if all are abstract", "Only in Java 17+"], answerIndex: 1, hint: "Java does not support multiple inheritance with classes to avoid ambiguity." },
              { question: "Which access modifier allows members to be visible only within the class and subclasses?", options: ["private", "public", "protected", "default"], answerIndex: 2, hint: "Protected access restricts visibility to subclasses and package." }
            ],
            procedure: [
              "Read the Aim and Theory to understand inheritance concepts.",
              "Create a parent class Parent with an integer variable `x` and print method.",
              "Create a child class Child that extends Parent, containing variable `y`.",
              "In main, instantiate Child, assign x and y, and call methods.",
              "In Simulation, watch how Child object contains fields of both Parent and Child.",
              "Inspect class variables state in memory.",
              "Compile and run in Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class Parent {\n    int x = 10;\n    void showX() { System.out.println(\"Parent shows: \" + x); }\n}\nclass Child extends Parent {\n    int y = 20;\n    void showY() { System.out.println(\"Child shows: \" + y); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Child c = new Child();\n        c.showX();\n        c.showY();\n    }\n}",
              steps: [
                { line: 10, annotation: "Instantiate Child object on Heap. Child inherits field x from Parent, and defines y.", memory: [{ variable: "c", type: "Child", value: "Child@01 (Parent.x=10, Child.y=20)" }], output: "" },
                { line: 11, annotation: "Call inherited method showX() which reads Parent's variable x.", memory: [], output: "Parent shows: 10\n" },
                { line: 12, annotation: "Call showY() which reads Child's variable y.", memory: [], output: "Parent shows: 10\nChild shows: 20\n" }
              ]
            },
            posttest: [
              { question: "Which class is the ultimate superclass of all classes in Java?", options: ["Class", "Object", "System", "Main"], answerIndex: 1, hint: "java.lang.Object is at the root of Java's class hierarchy." },
              { question: "What constructor is called first when a subclass is instantiated?", options: ["Subclass constructor", "Superclass constructor", "Default class static initializers", "None"], answerIndex: 1, hint: "The superclass constructor executes before the child constructor." },
              { question: "How can a subclass access overridden methods of the superclass?", options: ["Using this", "Using super", "Using new", "Using parent"], answerIndex: 1, hint: "The super keyword references the parent context." },
              { question: "Can private fields of a superclass be directly accessed in a subclass?", options: ["Yes", "No", "Only if synchronized", "Only via reflections"], answerIndex: 1, hint: "Private members are only accessible within their defining class." },
              { question: "What is inheritance hierarchy?", options: ["Grouping packages", "Levels of classes inheriting from parent classes", "Method signatures", "Constructor chaining"], answerIndex: 1, hint: "A structural diagram showing class derivations." }
            ],
            references: [
              "Oracle Java Inheritance: https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e4-2",
          title: "Multilevel Inheritance",
          desc: "Implement Multilevel Inheritance where a class extends a subclass, creating an inheritance chain.",
          expected: "Grandparent value: 1\nParent value: 2\nChild value: 3",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to demonstrating multilevel inheritance, where a class inherits from a subclass, establishing an inheritance chain.",
              bullets: [
                "Understand the core concepts of Multilevel Inheritance",
                "Implement a Java program that demonstrates multilevel inheritance",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Multilevel Inheritance"
              ]
            },
            theory: [
              {
                title: "Multilevel Inheritance Theory",
                body: [
                  "In Multilevel Inheritance, a class extends a subclass. For example, Class C extends Class B, and Class B extends Class A.",
                  "Class C inherits all properties and behaviors of Class B and Class A, representing a transitive relation of inheritance (C is-a B, B is-a A, therefore C is-a A)."
                ]
              }
            ],
            pretest: [
              { question: "What is multilevel inheritance?", options: ["A class extending multiple parent classes", "A subclass extending another subclass in a chain", "Two classes extending the same class", "Implementing multiple interfaces"], answerIndex: 1, hint: "Think of a Grandparent -> Parent -> Child relationship." },
              { question: "Is multiple inheritance supported in Java?", options: ["Yes", "No", "Only in abstract terms", "Only with double extends"], answerIndex: 1, hint: "A class can only extend one class directly. Multiple inheritance is achieved via interfaces." },
              { question: "If class C extends B, and B extends A, then A is the:", options: ["Grandparent class of C", "Direct parent class of C", "Derived class of C", "Interface of C"], answerIndex: 0, hint: "A is at the top of the inheritance chain." },
              { question: "How does super() work in multilevel inheritance?", options: ["Invokes direct parent constructor", "Invokes grandparent constructor", "Invokes all constructors in reverse order", "Throws error"], answerIndex: 0, hint: "It always calls the direct parent constructor immediately above it." },
              { question: "Can a final class be extended in multilevel inheritance?", options: ["Yes", "No", "Only if abstract", "Only if it is static"], answerIndex: 1, hint: "Final classes cannot be extended at all." }
            ],
            procedure: [
              "Read the Aim and Theory to understand multilevel hierarchies.",
              "Create three classes: Grandparent, Parent, and Child.",
              "Configure: Parent extends Grandparent, Child extends Parent.",
              "Initialize variables in each constructor: 1, 2, and 3.",
              "Step through instantiation in the Simulation tab.",
              "Observe constructor call sequences (bottom-up delegation, top-down execution).",
              "Verify values in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class Grandparent {\n    int g = 1;\n}\nclass Parent extends Grandparent {\n    int p = 2;\n}\nclass Child extends Parent {\n    int c = 3;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Child child = new Child();\n        System.out.println(\"Grandparent value: \" + child.g);\n        System.out.println(\"Parent value: \" + child.p);\n        System.out.println(\"Child value: \" + child.c);\n    }\n}",
              steps: [
                { line: 11, annotation: "Create Child object. JVM traverses up to Grandparent class. Allocate and initialize fields in chain order.", memory: [{ variable: "child", type: "Child", value: "Child@01" }], output: "" },
                { line: 12, annotation: "Print grandparent field g (1). Inherited through Parent.", memory: [], output: "Grandparent value: 1\n" },
                { line: 13, annotation: "Print parent field p (2). Inherited from direct parent.", memory: [], output: "Grandparent value: 1\nParent value: 2\n" },
                { line: 14, annotation: "Print child field c (3). Defined locally.", memory: [], output: "Grandparent value: 1\nParent value: 2\nChild value: 3\n" }
              ]
            },
            posttest: [
              { question: "What is the order of constructor execution in a multilevel chain Grandparent -> Parent -> Child?", options: ["Child -> Parent -> Grandparent", "Grandparent -> Parent -> Child", "Parent -> Grandparent -> Child", "Parallel execution"], answerIndex: 1, hint: "Constructors execute top-down starting from the base object." },
              { question: "Which modifier blocks a class from being subclassed?", options: ["static", "final", "abstract", "private"], answerIndex: 1, hint: "The final keyword prevents further subclass extensions." },
              { question: "In subclass construction, what is the implicit first statement if not written?", options: ["this()", "super()", "System.gc()", "return;"], answerIndex: 1, hint: "Java implicitly inserts super() with no args." },
              { question: "Can a class extend a class and implement an interface at the same time?", options: ["No", "Yes", "Only in abstract classes", "Only if methods are final"], answerIndex: 1, hint: "Yes, you can write 'class A extends B implements C'." },
              { question: "Does multilevel inheritance cause the Diamond Problem?", options: ["Yes", "No", "Only if variables are protected", "Depends on JDK"], answerIndex: 1, hint: "No, the Diamond Problem is caused by multiple class inheritance, which Java disallows." }
            ],
            references: [
              "JNTUGV IT-R23 Curriculum Guides",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e4-3",
          title: "Abstract Class for Shapes",
          desc: "Create an abstract Shape class and subclasses to calculate the areas of different shapes.",
          expected: "Rectangle Area = 200.0\nCircle Area = 314.1592653589793",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to defining an abstract class 'shape' with an abstract method 'area()' and implement subclasses to compute areas of rectangles and circles.",
              bullets: [
                "Understand the core concepts of Abstract Class for Shapes",
                "Implement a Java program that demonstrates abstract class for shapes",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Abstract Class for Shapes"
              ]
            },
            theory: [
              {
                title: "Abstract Classes and Methods",
                body: [
                  "An abstract class is a class declared with the `abstract` keyword. It cannot be instantiated directly (using new). It may contain both abstract methods (methods without a body) and concrete methods (methods with a body).",
                  "Subclasses extending an abstract class MUST override all abstract methods, or be declared abstract themselves. This allows establishing template behaviors."
                ]
              }
            ],
            pretest: [
              { question: "Can you instantiate an abstract class using the 'new' keyword?", options: ["Yes", "No", "Only if it has constructors", "Only in package context"], answerIndex: 1, hint: "Abstract classes are incomplete and cannot be instantiated." },
              { question: "What is an abstract method?", options: ["A method with public access", "A method declared without implementation (no body)", "A method that is final", "A static method"], answerIndex: 1, hint: "Declared with a signature followed by a semicolon instead of curly braces." },
              { question: "Which keyword declares abstract entities?", options: ["extends", "implements", "abstract", "virtual"], answerIndex: 2, hint: "The abstract keyword." },
              { question: "If a subclass does not implement all abstract methods of its parent class, the subclass must be declared:", options: ["public", "final", "abstract", "static"], answerIndex: 2, hint: "It remains incomplete, so it must also be abstract." },
              { question: "Can an abstract class contain instance variables?", options: ["No", "Yes", "Only static constants", "Only final variables"], answerIndex: 1, hint: "Yes, it can contain any instance variables, constructors, and concrete methods." }
            ],
            procedure: [
              "Read the Aim and Theory to understand abstract specifications.",
              "Declare abstract class Shape with an abstract method `double area()`.",
              "Create Rectangle subclass extending Shape with fields width and height.",
              "Override `double area()` returning width * height.",
              "Create Circle subclass extending Shape with radius field, implementing `area()` as Math.PI * r * r.",
              "Instantiate shapes in main, call area methods, and monitor in the Simulation tab.",
              "Examine subclass method overrides in the memory state panel.",
              "Run code in the Code Test tab and confirm area outputs.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "abstract class Shape {\n    abstract double area();\n}\nclass Rectangle extends Shape {\n    double w = 20, h = 10;\n    double area() { return w * h; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Shape s = new Rectangle();\n        System.out.println(\"Rectangle Area = \" + s.area());\n    }\n}",
              steps: [
                { line: 9, annotation: "Create Shape reference 's' pointing to a Rectangle object instance. Abstract class reference is valid.", memory: [{ variable: "s", type: "Shape", value: "Rectangle@01 (w=20.0, h=10.0)" }], output: "" },
                { line: 10, annotation: "Call s.area() method. Dynamic dispatch executes Rectangle's area method. 20 * 10 = 200.", memory: [], output: "Rectangle Area = 200.0\n" }
              ]
            },
            posttest: [
              { question: "Can an abstract class have constructors?", options: ["No", "Yes", "Only static ones", "Only private ones"], answerIndex: 1, hint: "Yes, called during subclass instantiation via super()." },
              { question: "Can an abstract method be declared static?", options: ["Yes", "No", "Depends on JDK version", "Only in nested classes"], answerIndex: 1, hint: "No, static methods belong to classes and cannot be overridden, which contradicts abstract design." },
              { question: "Can an abstract class contain final methods?", options: ["Yes", "No", "Only if private", "Only if static"], answerIndex: 0, hint: "Yes, final methods are inherited but cannot be overridden by subclasses." },
              { question: "Which of the following is valid?", options: ["Shape s = new Shape();", "Shape s = new Rectangle();", "abstract s = new Rectangle();", "new Shape();"], answerIndex: 1, hint: "Abstract reference can point to concrete child instances." },
              { question: "What is the purpose of an abstract class?", options: ["To prevent inheritance", "To define a generic template and enforce method implementation in children", "To improve runtime speed", "To manage memory imports"], answerIndex: 1, hint: "Enforces template design rules for sub-classes." }
            ],
            references: [
              "Oracle Abstract Class Tutorial: https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        }
      ]
    },
    {
      title: "EXERCISE 5",
      objective: "Utilize the 'super' keyword, implement interfaces for multiple inheritance, and achieve runtime polymorphism.",
      tutorial: "Tutorial 5: Super, Interfaces & Polymorphism",
      labTitle: "Lab 5: Advanced OOP Techniques",
      experiments: [
        {
          id: "java-e5-1",
          title: "Super Keyword Example",
          desc: "Write a Java program to show the usage of the 'super' keyword to access parent methods and variables.",
          expected: "Parent speed = 100\nChild speed = 150",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to demonstrating the 'super' keyword to reference parent class instance variables, invoke parent constructors, and override methods.",
              bullets: [
                "Understand the core concepts of Super Keyword Example",
                "Implement a Java program that demonstrates super keyword example",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Super Keyword Example"
              ]
            },
            theory: [
              {
                title: "The 'super' Keyword",
                body: [
                  "The `super` keyword in Java is a reference variable used to refer to immediate parent class objects.",
                  "Common uses of `super`:",
                  "1. To refer to parent class instance variables (resolving variable name hiding).",
                  "2. To invoke parent class methods (typically overridden parent methods).",
                  "3. To invoke parent class constructors (must be the first line of the child constructor)."
                ]
              }
            ],
            pretest: [
              { question: "What does the 'super' keyword refer to?", options: ["The child class", "The immediate parent class object", "The class loader", "The static main method"], answerIndex: 1, hint: "References the parent context from a subclass." },
              { question: "Where must super() constructor call reside?", options: ["First line of subclass constructor", "Any line of subclass constructor", "Inside class main method", "Inside grandparent destructor"], answerIndex: 0, hint: "Must be the absolute first statement in the constructor." },
              { question: "How does a subclass access an overridden parent method named show()?", options: ["this.show()", "super.show()", "parent.show()", "show()"], answerIndex: 1, hint: "Prefixing with super accesses the overridden method." },
              { question: "Can you use 'super' inside static methods?", options: ["Yes", "No", "Only if public", "Depends on parameters"], answerIndex: 1, hint: "Static methods lack an instance context (no 'this' or 'super')." },
              { question: "If a parent constructor takes arguments, how does the child call it?", options: ["super()", "super(arguments)", "parent(arguments)", "this(arguments)"], answerIndex: 1, hint: "By passing the arguments to the super constructor." }
            ],
            procedure: [
              "Read the Aim and Theory to understand the super keyword applications.",
              "Create parent class Vehicle with integer speed = 100.",
              "Create subclass Car extending Vehicle with local speed = 150.",
              "In Car, write a display method printing `super.speed` and local `speed`.",
              "In the Simulation tab, step through variables extraction in memory.",
              "Check variable names and scope evaluation.",
              "Compile and run code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class Vehicle {\n    int speed = 100;\n}\nclass Car extends Vehicle {\n    int speed = 150;\n    void display() {\n        System.out.println(\"Parent speed = \" + super.speed);\n        System.out.println(\"Child speed = \" + speed);\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car();\n        c.display();\n    }\n}",
              steps: [
                { line: 11, annotation: "Create Car object. speed of parent (Vehicle) is initialized to 100. speed of child (Car) is initialized to 150.", memory: [{ variable: "c", type: "Car", value: "Car@01 (super.speed=100, speed=150)" }], output: "" },
                { line: 12, annotation: "Call c.display().", memory: [], output: "" },
                { line: 7, annotation: "Print super.speed (100) from parent class.", memory: [], output: "Parent speed = 100\n" },
                { line: 8, annotation: "Print speed (150) from local subclass field.", memory: [], output: "Parent speed = 100\nChild speed = 150\n" }
              ]
            },
            posttest: [
              { question: "Can we use super.super.variable to access a grandparent variable?", options: ["Yes", "No", "Only if protected", "Only if static"], answerIndex: 1, hint: "Java restricts 'super' access to the immediate parent class only." },
              { question: "What error occurs if super() is not on the first line of subclass constructor?", options: ["Runtime NullPointerException", "Compilation error", "StackOverflowError", "ClassCastException"], answerIndex: 1, hint: "Compiler strictly validates the first statement requirement." },
              { question: "Is super() implicit if we don't declare any constructor?", options: ["Yes, default no-arg super() is called", "No", "Only in static classes", "Only if constructor is public"], answerIndex: 0, hint: "Implicit call to parent's no-argument constructor occurs automatically." },
              { question: "How does the 'this' keyword differ from 'super'?", options: ["this refers to parent class, super to current class", "this refers to current class instance, super to parent class instance", "No difference", "this is for methods, super is for variables"], answerIndex: 1, hint: "This targets the current object; super targets the parent reference." },
              { question: "Can a constructor call both this() and super() in the same block?", options: ["Yes", "No", "Only if public", "Only if nested"], answerIndex: 1, hint: "Both must be on the first line, which is impossible." }
            ],
            references: [
              "Oracle Super Keyword: https://docs.oracle.com/javase/tutorial/java/IandI/super.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e5-2",
          title: "Interface Implementation",
          desc: "Implement interfaces to achieve multiple inheritance of behaviors in Java.",
          expected: "Printable prints.\nShowable shows.",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to implementing interfaces to show how multiple inheritance of behaviors is achieved.",
              bullets: [
                "Understand the core concepts of Interface Implementation",
                "Implement a Java program that demonstrates interface implementation",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Interface Implementation"
              ]
            },
            theory: [
              {
                title: "Interfaces in Java",
                body: [
                  "An interface in Java is a blueprint of a class. It contains only static constants and abstract methods (methods without a body). In Java 8+, it can also have default and static methods, and in Java 9+, private methods.",
                  "Interfaces are declared using the `interface` keyword. A class implements them using the `implements` keyword. Since a class can implement multiple interfaces, Java uses them to achieve multiple inheritance of behavior."
                ]
              }
            ],
            pretest: [
              { question: "Which keyword declares an interface?", options: ["class", "abstract", "interface", "implements"], answerIndex: 2, hint: "The interface keyword." },
              { question: "Which keyword connects a class to an interface?", options: ["extends", "implements", "imports", "uses"], answerIndex: 1, hint: "The implements keyword." },
              { question: "All methods declared inside a standard interface are implicitly:", options: ["private and concrete", "public and abstract", "protected and static", "final and private"], answerIndex: 1, hint: "By default, methods in an interface are public abstract." },
              { question: "Can a class implement multiple interfaces?", options: ["No", "Yes", "Only up to three", "Only if all are empty"], answerIndex: 1, hint: "Java supports multiple inheritance of interface behaviors." },
              { question: "All fields defined inside an interface are implicitly:", options: ["private static", "public static final (constants)", "protected transient", "local variables"], answerIndex: 1, hint: "Fields in interfaces are global public static final constants." }
            ],
            procedure: [
              "Read the Aim and Theory to understand interface definitions.",
              "Declare interface Printable with `void print()`.",
              "Declare interface Showable with `void show()`.",
              "Create class Document implementing both Printable and Showable.",
              "Override print() and show() methods in Document class.",
              "Instantiate Document in main, execute methods, and monitor in the Simulation tab.",
              "Verify interface declarations in the memory state panel.",
              "Run and compile the code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "interface Printable {\n    void print();\n}\ninterface Showable {\n    void show();\n}\nclass Document implements Printable, Showable {\n    public void print() { System.out.println(\"Printable prints.\"); }\n    public void show() { System.out.println(\"Showable shows.\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Document d = new Document();\n        d.print();\n        d.show();\n    }\n}",
              steps: [
                { line: 11, annotation: "Instantiate class Document implementing Printable and Showable.", memory: [{ variable: "d", type: "Document", value: "Document@01" }], output: "" },
                { line: 12, annotation: "Call print() overridden method.", memory: [], output: "Printable prints.\n" },
                { line: 13, annotation: "Call show() overridden method.", memory: [], output: "Printable prints.\nShowable shows.\n" }
              ]
            },
            posttest: [
              { question: "Can we instantiate an interface directly using 'new'?", options: ["Yes", "No", "Only if abstract", "Only via reflections"], answerIndex: 1, hint: "Interfaces cannot be instantiated directly; they must be implemented by classes." },
              { question: "Can an interface extend another interface?", options: ["No", "Yes, using implements", "Yes, using extends", "Only using static imports"], answerIndex: 2, hint: "An interface can extend other interfaces using the extends keyword." },
              { question: "What feature in Java 8 allows interfaces to contain method implementations?", options: ["Abstract methods", "Default methods", "Private methods", "Final methods"], answerIndex: 1, hint: "Declared using the 'default' keyword." },
              { question: "What is a marker interface?", options: ["An interface with default methods", "An interface with no methods or fields (empty)", "An interface representing UI markers", "A abstract class"], answerIndex: 1, hint: "Examples include Serializable and Cloneable." },
              { question: "Can an interface have a constructor?", options: ["Yes", "No", "Only static constructors", "Only private constructors"], answerIndex: 1, hint: "Since interfaces do not have instance state variables, they cannot define constructors." }
            ],
            references: [
              "Oracle Interfaces Tutorial: https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e5-3",
          title: "Runtime Polymorphism",
          desc: "Write a Java program to implement Runtime Polymorphism via method overriding.",
          expected: "Bike is running safely",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to implementing runtime polymorphism (dynamic method dispatch) using method overriding.",
              bullets: [
                "Understand the core concepts of Runtime Polymorphism",
                "Implement a Java program that demonstrates runtime polymorphism",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Runtime Polymorphism"
              ]
            },
            theory: [
              {
                title: "Runtime Polymorphism and Method Overriding",
                body: [
                  "Runtime Polymorphism (or Dynamic Method Dispatch) is a process in which a call to an overridden method is resolved at runtime rather than compile-time.",
                  "If a subclass overrides a parent method, the JVM determines which implementation to run based on the actual object type at runtime, not the reference variable type."
                ]
              }
            ],
            pretest: [
              { question: "Method Overriding is resolved at:", options: ["Compile-time", "Runtime", "Execution check", "Link-time"], answerIndex: 1, hint: "Determined at execution time by the JVM." },
              { question: "For method overriding, child and parent methods must share:", options: ["Different names", "Same name and same parameter signature", "Different return types", "Only private modifiers"], answerIndex: 1, hint: "Overriding requires matching signatures." },
              { question: "Which annotation is recommended when overriding a method?", options: ["@Overload", "@Override", "@Overwrite", "@Inherited"], answerIndex: 1, hint: "The @Override annotation helps prevent syntax errors." },
              { question: "Can we override static methods in Java?", options: ["Yes", "No", "Only if public", "Only if final"], answerIndex: 1, hint: "Static methods are bound statically to classes and cannot be overridden (referred to as method hiding)." },
              { question: "Can we override a final method in Java?", options: ["Yes", "No", "Only in abstract classes", "Only if return is void"], answerIndex: 1, hint: "The final keyword prevents subclasses from overriding methods." }
            ],
            procedure: [
              "Read the Aim and Theory to understand dynamic binding.",
              "Create superclass Vehicle with `void run()` method.",
              "Create child class Bike extending Vehicle, overriding `void run()`.",
              "In main, declare Vehicle reference variable `v`.",
              "Assign a Bike object to `v` (`v = new Bike()`).",
              "Invoke `v.run()` and watch dispatch execution in the Simulation tab.",
              "Observe method resolving dynamically in the memory state panel.",
              "Verify and run the code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class Vehicle {\n    void run() { System.out.println(\"Vehicle is running\"); }\n}\nclass Bike extends Vehicle {\n    void run() { System.out.println(\"Bike is running safely\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Vehicle v = new Bike();\n        v.run();\n    }\n}",
              steps: [
                { line: 8, annotation: "Declare Vehicle reference variable v. Point it to a Bike object instance on Heap.", memory: [{ variable: "v", type: "Vehicle", value: "Bike@01" }], output: "" },
                { line: 9, annotation: "Invoke v.run(). JVM checks actual object type (Bike) and runs Bike's overridden run method.", memory: [], output: "Bike is running safely\n" }
              ]
            },
            posttest: [
              { question: "Which binding mechanism supports Runtime Polymorphism?", options: ["Early Binding", "Late Binding / Dynamic Binding", "Static Binding", "No binding"], answerIndex: 1, hint: "Late binding binds methods during execution." },
              { question: "Can you change the access modifier of an overridden method in a subclass to be more restrictive?", options: ["Yes", "No", "Only if abstract", "Depends on JDK"], answerIndex: 1, hint: "Subclass overridden methods must keep or expand visibility (e.g., protected cannot become private)." },
              { question: "If Parent p = new Child() is declared, where Child overrides static method print(), what does p.print() run?", options: ["Child's print method", "Parent's print method", "Throws compile error", "Throws runtime error"], answerIndex: 1, hint: "Static methods are resolved statically based on the reference type (Parent)." },
              { question: "What is covariant return type?", options: ["Changing parameters", "Overriding method returning a subclass of the parent method's return type", "Interface parameters", "Dynamic dispatch arrays"], answerIndex: 1, hint: "Allowed since Java 5, returning subclass types in overrides." },
              { question: "Does method overriding occur within a single class?", options: ["Yes", "No", "Only if class is static", "Only if class is final"], answerIndex: 1, hint: "Overriding requires an inheritance relationship. Overloading occurs inside a single class." }
            ],
            references: [
              "Oracle Polymorphism Tutorial: https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        }
      ]
    },
    {
      title: "EXERCISE 6",
      objective: "Learn throw-catch mechanisms, multiple catch clauses, built-in exceptions, and custom exceptions.",
      tutorial: "Tutorial 6: Exception Handling",
      labTitle: "Lab 6: Robust Exception Handling",
      experiments: [
        {
          id: "java-e6-1",
          title: "Exception Handling Mechanism",
          desc: "Write a Java program to handle runtime arithmetic exceptions using try-catch blocks.",
          expected: "Caught ArithmeticException: / by zero\nProgram continues...",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to demonstrating basic exception handling using try, catch, and finally blocks to gracefully handle arithmeticexception.",
              bullets: [
                "Understand the core concepts of Exception Handling Mechanism",
                "Implement a Java program that demonstrates exception handling mechanism",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Exception Handling Mechanism"
              ]
            },
            theory: [
              {
                title: "Exception Handling in Java",
                body: [
                  "An exception is an unwanted or unexpected event that occurs during program execution, disrupting the normal flow of instructions.",
                  "Java handles exceptions using five keywords: try, catch, throw, throws, and finally.",
                  "• Code that might throw exceptions is placed inside the `try` block.",
                  "• The `catch` block catches and handles exceptions.",
                  "• The `finally` block executes cleanup actions regardless of whether exceptions occur."
                ]
              }
            ],
            pretest: [
              { question: "Which block is used to enclose code that might generate exceptions?", options: ["catch", "try", "finally", "throw"], answerIndex: 1, hint: "You 'try' running the risky code." },
              { question: "Which block handles the thrown exception object?", options: ["try", "catch", "throws", "finally"], answerIndex: 1, hint: "It 'catches' the exception." },
              { question: "The root class for all exception classes in Java is:", options: ["Exception", "Throwable", "RuntimeException", "Error"], answerIndex: 1, hint: "java.lang.Throwable is the root of the hierarchy." },
              { question: "Which block always executes, even if an exception is thrown or caught?", options: ["try", "catch", "finally", "throws"], answerIndex: 2, hint: "Typically used for closing files or database connections." },
              { question: "What is the difference between Checked and Unchecked exceptions?", options: ["Checked exceptions are checked at compile-time", "Unchecked exceptions are checked at compile-time", "No difference", "Checked exceptions occur at runtime"], answerIndex: 0, hint: "Checked exceptions are checked by the compiler." }
            ],
            procedure: [
              "Read the Aim and Theory to understand exception keyword structures.",
              "Enclose division by zero code `int result = 10 / 0;` inside a try block.",
              "Add catch block matching ArithmeticException to log the error.",
              "Step through runtime exception creation in the Simulation tab.",
              "Watch JVM interrupt the try block and pass control to the catch block.",
              "Inspect stack traces inside the console output.",
              "Compile and run the code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "public class ExceptionTest {\n    public static void main(String[] args) {\n        try {\n            int x = 10, y = 0;\n            int res = x / y;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught: \" + e.getMessage());\n        }\n        System.out.println(\"Program continues...\");\n    }\n}",
              steps: [
                { line: 3, annotation: "Enter try block.", memory: [], output: "" },
                { line: 4, annotation: "Assign values: x = 10, y = 0.", memory: [{ variable: "x", type: "int", value: "10" }, { variable: "y", type: "int", value: "0" }], output: "" },
                { line: 5, annotation: "Execute division: 10 / 0. JVM intercepts division-by-zero, halts try block, instantiates ArithmeticException.", memory: [], output: "" },
                { line: 6, annotation: "ArithmeticException caught. JVM moves execution flow to the catch block parameter e.", memory: [{ variable: "e", type: "ArithmeticException", value: "ArithmeticException: / by zero" }], output: "" },
                { line: 7, annotation: "Print exception description message: '/ by zero'.", memory: [], output: "Caught: / by zero\n" },
                { line: 9, annotation: "Execute code outside catch block. Program handles error successfully and completes normal execution.", memory: [], output: "Caught: / by zero\nProgram continues...\n" }
              ]
            },
            posttest: [
              { question: "What occurs if an exception is thrown in a try block but not caught by any catch block?", options: ["Program compiles and ignores error", "Program terminates abnormally (crash)", "Catch block executes anyway", "JVM halts compiler"], answerIndex: 1, hint: "The default exception handler terminates the thread." },
              { question: "Can we write a try block without a catch or finally block?", options: ["Yes", "No", "Only if abstract", "Only in JDK 9+"], answerIndex: 1, hint: "A try block must be followed by at least a catch block or finally block." },
              { question: "Which exception is thrown when an index exceeds array bounds?", options: ["NullPointerException", "ArithmeticException", "ArrayIndexOutOfBoundsException", "NumberFormatException"], answerIndex: 2, hint: "ArrayIndexOutOfBoundsException represents illegal index accesses." },
              { question: "What is the return type of e.getMessage()?", options: ["String", "Throwable", "Exception", "void"], answerIndex: 0, hint: "Returns string descriptions." },
              { question: "Can we declare variables inside a try block and access them outside?", options: ["Yes", "No", "Only if final", "Only if static"], answerIndex: 1, hint: "Try block establishes a local block scope. Variables defined inside are invisible outside." }
            ],
            references: [
              "Oracle Exception Tutorial: https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e6-2",
          title: "Multiple Catch Clauses",
          desc: "Illustrate the usage of multiple catch clauses to handle different exceptions from a single block.",
          expected: "Caught: ArrayIndexOutOfBoundsException",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to implementing multiple catch clauses to handle arithmeticexception and arrayindexoutofboundsexception depending on the code path.",
              bullets: [
                "Understand the core concepts of Multiple Catch Clauses",
                "Implement a Java program that demonstrates multiple catch clauses",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Multiple Catch Clauses"
              ]
            },
            theory: [
              {
                title: "Multiple Catch Blocks",
                body: [
                  "A try block can be associated with multiple catch blocks to handle different types of exceptions.",
                  "Rules for Multiple Catch blocks:",
                  "1. The JVM executes the first catch block that matches the thrown exception type.",
                  "2. Order matters! Specific subclass exceptions must be caught before generic superclass exceptions (e.g. catch ArithmeticException before Exception). Catching superclasses first causes compiler errors due to unreachable code."
                ]
              }
            ],
            pretest: [
              { question: "If multiple catch blocks match an exception, which block executes?", options: ["All matching blocks", "The first matching block from the top", "The last matching block", "A random matching block"], answerIndex: 1, hint: "JVM resolves catch blocks sequentially." },
              { question: "Which exception class hierarchy is correct for ordering catch blocks?", options: ["Subclass before Superclass", "Superclass before Subclass", "No order restriction", "Random ordering"], answerIndex: 0, hint: "Subclasses must come first so they aren't masked by broader parent catches." },
              { question: "What is the compile error if catch Exception comes before catch ArithmeticException?", options: ["ArithmeticException is already defined", "Unreachable catch block for ArithmeticException", "Throws NullPointer", "No error"], answerIndex: 1, hint: "Exception intercepts all subclass instances, making the ArithmeticException block unreachable." },
              { question: "Can two catch blocks catch identical exception types in a single try?", options: ["Yes", "No", "Only if final", "Only in JDK 8"], answerIndex: 1, hint: "Duplicate catch signatures trigger duplicate handler errors." },
              { question: "Which of the following is a common parent class of RuntimeException?", options: ["Exception", "Error", "Throwable", "Both Exception & Throwable"], answerIndex: 3, hint: "RuntimeException extends Exception, which extends Throwable." }
            ],
            procedure: [
              "Read the Aim and Theory to understand multiple catch constraints.",
              "Write code causing an array index error inside a try block: `int[] a = new int[5]; a[10] = 50;`.",
              "Provide two catch blocks: `catch(ArithmeticException)` and `catch(ArrayIndexOutOfBoundsException)`.",
              "Observe execution flow skipping the first catch and entering the second catch in the Simulation tab.",
              "Verify catch selection priorities in memory.",
              "Run code in the Code Test tab and check output.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "public class MultiCatch {\n    public static void main(String[] args) {\n        try {\n            int[] arr = {1, 2};\n            arr[5] = 10;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught: ArithmeticException\");\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println(\"Caught: ArrayIndexOutOfBoundsException\");\n        }\n    }\n}",
              steps: [
                { line: 3, annotation: "Enter try block.", memory: [], output: "" },
                { line: 4, annotation: "Initialize array arr of size 2.", memory: [{ variable: "arr", type: "int[]", value: "[1, 2]" }], output: "" },
                { line: 5, annotation: "Attempt to write at index 5. Array size is 2. JVM halts try block and throws ArrayIndexOutOfBoundsException.", memory: [], output: "" },
                { line: 6, annotation: "Check first catch block (ArithmeticException). Does not match ArrayIndexOutOfBoundsException. Skip block.", memory: [], output: "" },
                { line: 8, annotation: "Check second catch block (ArrayIndexOutOfBoundsException). Matches. Execute handler code.", memory: [{ variable: "e", type: "ArrayIndexOutOfBoundsException", value: "ArrayIndexOutOfBoundsException" }], output: "" },
                { line: 9, annotation: "Print message to output.", memory: [], output: "Caught: ArrayIndexOutOfBoundsException\n" }
              ]
            },
            posttest: [
              { question: "Which syntax permits catching multiple exceptions in a single catch block since Java 7?", options: ["catch(ArithmeticException && NullPointerException e)", "catch(ArithmeticException | NullPointerException e)", "catch(ArithmeticException, NullPointerException e)", "catch(ArithmeticException + NullPointerException e)"], answerIndex: 1, hint: "Uses the vertical pipe operator |." },
              { question: "In a multi-catch block `catch (A | B e)`, the exception variable `e` is implicitly:", options: ["static", "final", "abstract", "transient"], answerIndex: 1, hint: "Multi-catch parameters are implicitly final." },
              { question: "What occurs if the try block executes without throwing any exceptions?", options: ["Exceptions are thrown at the end", "Catch blocks are skipped, program continues", "Finally block is skipped", "JVM crashes"], answerIndex: 1, hint: "All catch blocks are bypassed." },
              { question: "Which exception class represents data formatting conversions errors?", options: ["ArithmeticException", "NullPointerException", "NumberFormatException", "IOException"], answerIndex: 2, hint: "Thrown when parsing non-numeric strings as numbers." },
              { question: "Can a try block have both multiple catch blocks and a finally block?", options: ["No", "Yes", "Only in abstract classes", "Only if catch is public"], answerIndex: 1, hint: "Yes, standard format is try { } catch { } ... finally { }." }
            ],
            references: [
              "Oracle Multi-Catch Documentation: https://docs.oracle.com/javase/7/docs/technotes/guides/language/catch-multiple-exceptions.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e6-3",
          title: "Built-in Exceptions",
          desc: "Trigger and catch common Java built-in exceptions like NullPointerException and NumberFormatException.",
          expected: "Caught NullPointerException: Name reference is null",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to that triggers common built-in exceptions (nullpointerexception) and catches them to recover execution control.",
              bullets: [
                "Understand the core concepts of Built-in Exceptions",
                "Implement a Java program that demonstrates built-in exceptions",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Built-in Exceptions"
              ]
            },
            theory: [
              {
                title: "Java Built-in Exceptions",
                body: [
                  "Java defines several standard built-in exception classes inside the java.lang package.",
                  "• NullPointerException: occurs when referencing a member of a null object.",
                  "• NumberFormatException: occurs when converting an invalid string format into numbers.",
                  "• IllegalArgumentException: occurs when passing incorrect arguments to methods."
                ]
              }
            ],
            pretest: [
              { question: "Which exception is thrown when attempting to use an object reference that has a null value?", options: ["NullPointerException", "ClassNotFoundException", "IOException", "ArithmeticException"], answerIndex: 0, hint: "Thrown when calling methods on a null reference." },
              { question: "Which exception represents invalid string-to-number parsing errors?", options: ["ArithmeticException", "NumberFormatException", "ClassCastException", "IllegalArgumentException"], answerIndex: 1, hint: "Commonly thrown by Integer.parseInt()." },
              { question: "Which package automatically imports basic built-in exception classes?", options: ["java.io", "java.util", "java.lang", "java.net"], answerIndex: 2, hint: "The language package java.lang." },
              { question: "Which exception occurs when casting an object to an incompatible subclass?", options: ["ClassCastException", "NullPointerException", "CloneNotSupportedException", "InstantiationException"], answerIndex: 0, hint: "Illegal type casting check." },
              { question: "Is NullPointerException checked or unchecked?", options: ["Checked", "Unchecked", "Depends on compilation", "JVM config dependent"], answerIndex: 1, hint: "Extends RuntimeException, making it an Unchecked exception." }
            ],
            procedure: [
              "Read the Aim and Theory to understand common built-in Exceptions.",
              "Declare a String pointer initialized to null: `String str = null;`.",
              "Attempt to get length: `str.length();` inside a try block.",
              "Catch NullPointerException to print error messages.",
              "In the Simulation tab, step through execution to see the null pointer check.",
              "Inspect memory showing the null variable value.",
              "Run the code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "public class BuiltInTest {\n    public static void main(String[] args) {\n        try {\n            String s = null;\n            int len = s.length();\n        } catch (NullPointerException e) {\n            System.out.println(\"Caught NullPointerException: Name reference is null\");\n        }\n    }\n}",
              steps: [
                { line: 3, annotation: "Enter try block.", memory: [], output: "" },
                { line: 4, annotation: "Create String variable s, assigned value null.", memory: [{ variable: "s", type: "String", value: "null" }], output: "" },
                { line: 5, annotation: "Attempt to call s.length(). Reference is null. JVM throws NullPointerException.", memory: [], output: "" },
                { line: 6, annotation: "NullPointerException caught. Execution shifts to handler.", memory: [{ variable: "e", type: "NullPointerException", value: "NullPointerException" }], output: "" },
                { line: 7, annotation: "Print recovery message.", memory: [], output: "Caught NullPointerException: Name reference is null\n" }
              ]
            },
            posttest: [
              { question: "What is thrown by Integer.parseInt('abc')?", options: ["ArithmeticException", "NullPointerException", "NumberFormatException", "ClassCastException"], answerIndex: 2, hint: "Thrown because 'abc' is not a valid representation of an integer." },
              { question: "Which class is the parent of all unchecked exceptions in Java?", options: ["Exception", "RuntimeException", "Error", "Throwable"], answerIndex: 1, hint: "RuntimeException is the base class for unchecked exceptions." },
              { question: "Which exception occurs when memory runs out in the JVM heap?", options: ["StackOverflowError", "OutOfMemoryError", "MemoryException", "HeapException"], answerIndex: 1, hint: "OutOfMemoryError is an Error, representing system resource failures." },
              { question: "What class handles division by zero?", options: ["ArithmeticException", "NumberFormatException", "MathException", "ZeroException"], answerIndex: 0, hint: "Arithmetic operations failure class." },
              { question: "Checked exceptions must be either handled inside try-catch or declared in the method signature using:", options: ["throw", "throws", "extends", "assert"], answerIndex: 1, hint: "The throws keyword declares checked exceptions." }
            ],
            references: [
              "Oracle Built-in Exception List: https://docs.oracle.com/javase/8/docs/api/java/lang/RuntimeException.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e6-4",
          title: "User Defined Exception",
          desc: "Create and throw a custom user-defined Exception class for domain logic validations.",
          expected: "Caught Custom Exception: Age is less than 18",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to defining a custom exception class (invalidageexception) and throwing it when conditions fail.",
              bullets: [
                "Understand the core concepts of User Defined Exception",
                "Implement a Java program that demonstrates user defined exception",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to User Defined Exception"
              ]
            },
            theory: [
              {
                title: "Custom / User-Defined Exceptions",
                body: [
                  "Java allows developers to create custom exception classes to handle application-specific errors.",
                  "To create a custom exception:",
                  "1. Extend `Exception` class (to make it Checked) or `RuntimeException` class (to make it Unchecked).",
                  "2. Create a constructor that accepts a String message and passes it to the superclass constructor using `super(message)`."
                ]
              }
            ],
            pretest: [
              { question: "To create a custom Checked exception, your class must extend:", options: ["Exception", "RuntimeException", "Throwable", "Error"], answerIndex: 0, hint: "Checked exceptions directly inherit from the Exception class." },
              { question: "Which keyword is used to explicitly throw an exception object inside a method?", options: ["throw", "throws", "try", "catch"], answerIndex: 0, hint: "The singular throw statement." },
              { question: "To make a custom Unchecked exception, your class must extend:", options: ["Exception", "RuntimeException", "Throwable", "Error"], answerIndex: 1, hint: "Unchecked exceptions inherit from RuntimeException." },
              { question: "What does super(message) do inside a custom exception constructor?", options: ["Clears variables", "Passes error message to parent Exception class", "Prints message to screen", "Throws exception"], answerIndex: 1, hint: "Passes message string to Exception base constructors." },
              { question: "Which keyword declares that a method might throw specific exceptions?", options: ["throw", "throws", "assert", "asserts"], answerIndex: 1, hint: "Declares exceptions in method signature using throws." }
            ],
            procedure: [
              "Read the Aim and Theory to understand custom exceptions.",
              "Create class `InvalidAgeException extends Exception` with a constructor calling `super(msg)`.",
              "Write method checkAge(int age) that throws InvalidAgeException if age < 18.",
              "In main, wrap checkAge call in try-catch block.",
              "In Simulation, watch the throw statement instantiate and throw your custom exception.",
              "Observe custom exception fields inside the memory panel.",
              "Run and compile in Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class InvalidAgeException extends Exception {\n    InvalidAgeException(String s) { super(s); }\n}\npublic class CustomException {\n    static void checkAge(int age) throws InvalidAgeException {\n        if (age < 18) throw new InvalidAgeException(\"Age is less than 18\");\n    }\n    public static void main(String[] args) {\n        try {\n            checkAge(15);\n        } catch (InvalidAgeException e) {\n            System.out.println(\"Caught Custom Exception: \" + e.getMessage());\n        }\n    }\n}",
              steps: [
                { line: 9, annotation: "Enter try block. Invoke checkAge(15).", memory: [], output: "" },
                { line: 5, annotation: "Entering checkAge. Parameter age = 15.", memory: [{ variable: "age", type: "int", value: "15" }], output: "" },
                { line: 6, annotation: "Evaluate condition age < 18 (15 < 18 is True). Throw custom InvalidAgeException object.", memory: [], output: "" },
                { line: 10, annotation: "Exception caught. Control returns to catch block matching InvalidAgeException.", memory: [{ variable: "e", type: "InvalidAgeException", value: "InvalidAgeException: Age is less than 18" }], output: "" },
                { line: 11, annotation: "Print message retrieved using e.getMessage().", memory: [], output: "Caught Custom Exception: Age is less than 18\n" }
              ]
            },
            posttest: [
              { question: "Is a custom class extending RuntimeException checked or unchecked?", options: ["Checked", "Unchecked", "Final", "Synchronized"], answerIndex: 1, hint: "All classes extending RuntimeException are unchecked." },
              { question: "What happens if a custom checked exception is thrown but not declared in the method signature?", options: ["Compiles successfully", "Compilation error", "Runtime exception", "Bypassed by compiler"], answerIndex: 1, hint: "Checked exceptions must follow the declare-or-handle rule." },
              { question: "Which constructor is typical for custom exceptions?", options: ["Default constructor", "Constructor accepting String error message", "No constructor", "Static constructor"], answerIndex: 1, hint: "Allows passing custom context messages to parent Exception class." },
              { question: "Can a user-defined exception class contain extra member variables?", options: ["No", "Yes", "Only if final", "Only static"], answerIndex: 1, hint: "Yes, you can add variables like error codes or timestamps." },
              { question: "What exception handling rule is called the 'Handle or Declare Rule'?", options: ["Checked exception requirement", "Unchecked exception requirement", "Garbage collection rule", "Constructor signature rule"], answerIndex: 0, hint: "Checked exceptions must be caught with try-catch or declared using throws." }
            ],
            references: [
              "Oracle Custom Exception Guidelines: https://docs.oracle.com/javase/tutorial/essential/exceptions/creating.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        }
      ]
    },
    {
      title: "EXERCISE 7",
      objective: "Understand Multithreading by extending Thread or implementing Runnable, use join/isAlive, and resolve synchronization.",
      tutorial: "Tutorial 7: Java Multithreading",
      labTitle: "Lab 7: Multithreading & Synchronization",
      experiments: [
        {
          id: "java-e7-1",
          title: "Thread Creation",
          desc: "Create multiple threads by extending the Thread class to display messages at varying intervals.",
          expected: "Good Morning\nHello\nGood Morning\nWelcome",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to that creates three threads by extending the thread class to display 'good morning' (every 1s), 'hello' (every 2s), and 'welcome' (every 3s).",
              bullets: [
                "Understand the core concepts of Thread Creation",
                "Implement a Java program that demonstrates thread creation",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Thread Creation"
              ]
            },
            theory: [
              {
                title: "Multithreading in Java",
                body: [
                  "Multithreading is a Java feature that allows concurrent execution of two or more parts of a program to maximize CPU utilization.",
                  "There are two ways to create a thread in Java:",
                  "1. By extending the Thread class.",
                  "2. By implementing the Runnable interface.",
                  "Extending Thread is useful when you want to override thread operations. Implementing Runnable is preferred because Java only supports single class inheritance, leaving the subclass free to inherit from another class."
                ]
              }
            ],
            pretest: [
              { question: "Which class provides multithreading support in Java?", options: ["java.lang.Thread", "java.lang.Process", "java.util.Task", "java.io.Thread"], answerIndex: 0, hint: "Part of java.lang, called Thread." },
              { question: "Which interface can be implemented to create threads?", options: ["Threadable", "Runnable", "Executable", "Callable"], answerIndex: 1, hint: "Defines a single public void run() method." },
              { question: "Which method starts a thread's execution?", options: ["run()", "start()", "execute()", "init()"], answerIndex: 1, hint: "Allocates thread resources and schedules execution." },
              { question: "What is the entry point method for thread logic?", options: ["main()", "run()", "start()", "execute()"], answerIndex: 1, hint: "Overridden or implemented method containing thread code." },
              { question: "What happens if you invoke thread.run() directly instead of thread.start()?", options: ["Thread starts normally", "Code compiles but runs on current thread (no concurrency)", "Throws exception", "Thread hangs"], answerIndex: 1, hint: "Direct run() acts as a standard method call on the calling thread." }
            ],
            procedure: [
              "Read the Aim and Theory to understand Thread life cycle.",
              "Create class GoodMorning extending Thread, printing message in a loop with `Thread.sleep(1000)`.",
              "Create Hello and Welcome threads with sleep periods of 2000ms and 3000ms.",
              "In main, instantiate and call start() on all three threads.",
              "In Simulation, observe how thread execution states transition between RUNNABLE and TIMED_WAITING.",
              "Inspect scheduler states in the memory state panel.",
              "Verify and run the code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class MsgThread extends Thread {\n    String msg;\n    int delay;\n    MsgThread(String msg, int delay) { this.msg = msg; this.delay = delay; }\n    public void run() {\n        try {\n            Thread.sleep(delay);\n            System.out.println(msg);\n        } catch(InterruptedException e) {}\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MsgThread t1 = new MsgThread(\"Good Morning\", 100);\n        MsgThread t2 = new MsgThread(\"Hello\", 200);\n        t1.start();\n        t2.start();\n    }\n}",
              steps: [
                { line: 12, annotation: "Create thread object t1 with delay 100ms. State is NEW.", memory: [{ variable: "t1", type: "MsgThread", value: "NEW (msg=\"Good Morning\", delay=100)" }], output: "" },
                { line: 13, annotation: "Create thread object t2 with delay 200ms. State is NEW.", memory: [{ variable: "t1", type: "MsgThread", value: "NEW" }, { variable: "t2", type: "MsgThread", value: "NEW (msg=\"Hello\", delay=200)" }], output: "" },
                { line: 14, annotation: "Call t1.start(). Thread state moves to RUNNABLE. JVM schedules thread.", memory: [{ variable: "t1", type: "MsgThread", value: "RUNNABLE" }], output: "" },
                { line: 15, annotation: "Call t2.start(). Thread state moves to RUNNABLE.", memory: [{ variable: "t1", type: "MsgThread", value: "RUNNABLE" }, { variable: "t2", type: "MsgThread", value: "RUNNABLE" }], output: "" },
                { line: 6, annotation: "Thread 1 wakes up first after 100ms sleep and prints message.", memory: [], output: "Good Morning\n" },
                { line: 6, annotation: "Thread 2 wakes up after 200ms sleep and prints message.", memory: [], output: "Good Morning\nHello\n" }
              ]
            },
            posttest: [
              { question: "Which method causes the currently executing thread to pause for a specified duration?", options: ["Thread.sleep()", "Thread.yield()", "Thread.wait()", "Thread.stop()"], answerIndex: 0, hint: "Throws InterruptedException, accepts milliseconds." },
              { question: "What exception can be thrown by Thread.sleep()?", options: ["IOException", "RuntimeException", "InterruptedException", "ThreadDeathException"], answerIndex: 2, hint: "Thrown when another thread interrupts the sleeping state." },
              { question: "What state is a thread in after creation but before start() is called?", options: ["NEW", "RUNNABLE", "BLOCKED", "TERMINATED"], answerIndex: 0, hint: "Represented by Thread.State.NEW." },
              { question: "Can we restart a terminated thread in Java?", options: ["Yes", "No", "Only if it is public", "Depends on platform"], answerIndex: 1, hint: "Calling start() on a dead thread throws IllegalThreadStateException." },
              { question: "Which interface provides single abstract method run()?", options: ["Callable", "Runnable", "Thread", "SystemTask"], answerIndex: 1, hint: "The Runnable interface." }
            ],
            references: [
              "Oracle Multithreading Tutorial: https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e7-2",
          title: "isAlive and join",
          desc: "Write a program illustrating the usage of isAlive() and join() thread methods.",
          expected: "Thread 1 isAlive: true\nThread 1 completed. Thread 1 isAlive: false",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to illustrating the usage of `isalive()` and `join()` methods to monitor and wait for thread completion.",
              bullets: [
                "Understand the core concepts of isAlive and join",
                "Implement a Java program that demonstrates isalive and join",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to isAlive and join"
              ]
            },
            theory: [
              {
                title: "Thread Monitoring: isAlive and join",
                body: [
                  "Java provides methods to query and coordinate thread termination:",
                  "• `isAlive()`: returns boolean indicating whether the target thread has started and not terminated yet.",
                  "• `join()`: blocks the calling thread (e.g. main thread) until the target thread completes execution, coordinating sequences."
                ]
              }
            ],
            pretest: [
              { question: "What does isAlive() return if the thread has finished executing?", options: ["true", "false", "null", "throws exception"], answerIndex: 1, hint: "A dead thread is no longer alive." },
              { question: "Which method blocks the calling thread until target thread completes?", options: ["sleep()", "wait()", "join()", "yield()"], answerIndex: 2, hint: "Joins execution lines back together." },
              { question: "What exception does the join() method throw?", options: ["IOException", "InterruptedException", "NullPointerException", "IllegalThreadStateException"], answerIndex: 1, hint: "Blocking methods in thread APIs throw InterruptedException." },
              { question: "Which method query checks if a thread is active?", options: ["isActive()", "isAlive()", "isRunnable()", "isRunning()"], answerIndex: 1, hint: "The isAlive() method." },
              { question: "Can join() take a timeout parameter?", options: ["No", "Yes, in milliseconds", "Only in Java 17", "Only for abstract threads"], answerIndex: 1, hint: "Yes, waits at most the specified time." }
            ],
            procedure: [
              "Read the Aim and Theory to understand join and isAlive.",
              "Create thread subclass Task executing a sleep block.",
              "In main, instantiate Task and call `start()`.",
              "Print `task.isAlive()` to check status.",
              "Call `task.join()` to block main until task completes.",
              "Print `task.isAlive()` after join to verify completion.",
              "Observe thread state transitions in the Simulation tab.",
              "Run code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class MyTask extends Thread {\n    public void run() {\n        try { Thread.sleep(100); } catch(Exception e) {}\n    }\n}\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        MyTask t = new MyTask();\n        t.start();\n        System.out.println(\"Thread 1 isAlive: \" + t.isAlive());\n        t.join();\n        System.out.println(\"Thread 1 completed. Thread 1 isAlive: \" + t.isAlive());\n    }\n}",
              steps: [
                { line: 8, annotation: "Instantiate MyTask thread t.", memory: [{ variable: "t", type: "MyTask", value: "NEW" }], output: "" },
                { line: 9, annotation: "Call t.start().", memory: [{ variable: "t", type: "MyTask", value: "RUNNABLE" }], output: "" },
                { line: 10, annotation: "Check isAlive() status. Returns true.", memory: [], output: "Thread 1 isAlive: true\n" },
                { line: 11, annotation: "Main thread blocks and waits for t to complete. t runs and terminates.", memory: [{ variable: "t", type: "MyTask", value: "TERMINATED" }], output: "" },
                { line: 12, annotation: "Main thread resumes. Check isAlive() status. Returns false.", memory: [], output: "Thread 1 isAlive: true\nThread 1 completed. Thread 1 isAlive: false\n" }
              ]
            },
            posttest: [
              { question: "If join() is called on a thread that has already completed, what happens?", options: ["Throws exception", "Blocks indefinitely", "Returns immediately", "Restarts the thread"], answerIndex: 2, hint: "Returns immediately because target is already dead." },
              { question: "Is isAlive() a static method of Thread class?", options: ["Yes", "No", "Depends on JDK", "Only in Runnable"], answerIndex: 1, hint: "No, it is an instance method called on a thread object reference." },
              { question: "Which state represents a thread blocked waiting for join() to finish?", options: ["RUNNABLE", "WAITING", "BLOCKED", "TIMED_WAITING"], answerIndex: 1, hint: "WAITING state representation." },
              { question: "What is the return type of isAlive()?", options: ["int", "void", "boolean", "Thread"], answerIndex: 2, hint: "Queries state status, returning true/false." },
              { question: "Can join() be called from multiple threads on the same target thread?", options: ["No", "Yes", "Only if synchronized", "Only in static classes"], answerIndex: 1, hint: "Multiple threads can block waiting for the same target thread." }
            ],
            references: [
              "Oracle Thread Methods: https://docs.oracle.com/javase/8/docs/api/java/lang/Thread.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e7-3",
          title: "Daemon Threads",
          desc: "Write a program demonstrating the creation and behavior of daemon threads.",
          expected: "Main thread finishing\n[Daemon thread runs in background]",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to illustrating the creation of daemon threads and demonstrating that jvm terminates when only daemon threads remain.",
              bullets: [
                "Understand the core concepts of Daemon Threads",
                "Implement a Java program that demonstrates daemon threads",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Daemon Threads"
              ]
            },
            theory: [
              {
                title: "Daemon Threads in Java",
                body: [
                  "A daemon thread in Java is a service provider thread that runs in the background (e.g. garbage collector).",
                  "Its life depends on user threads: when all user threads finish, JVM terminates automatically, killing all remaining daemon threads instantly. Use `setDaemon(true)` before start() to set status."
                ]
              }
            ],
            pretest: [
              { question: "What is a daemon thread?", options: ["A high-priority execution thread", "A background service thread that does not prevent JVM shutdown", "An abstract thread", "A class compiler thread"], answerIndex: 1, hint: "Runs in the background offering helper services." },
              { question: "Which method configures a thread as a daemon?", options: ["setDaemon(boolean)", "setService(boolean)", "makeDaemon()", "initDaemon()"], answerIndex: 0, hint: "Method name is setDaemon." },
              { question: "When must setDaemon(true) be called?", options: ["Before start()", "After start()", "Inside run()", "Any time"], answerIndex: 0, hint: "Setting status after starting triggers IllegalThreadStateException." },
              { question: "What happens to daemon threads when all user threads finish?", options: ["They continue running", "They are terminated automatically by JVM", "They throw exceptions", "They lock the CPU"], answerIndex: 1, hint: "JVM exits immediately, aborting daemon executions." },
              { question: "Which of the following is a built-in daemon thread in JVM?", options: ["Main Thread", "Garbage Collector", "Compiler thread", "Loader thread"], answerIndex: 1, hint: "The GC thread is the most common daemon." }
            ],
            procedure: [
              "Read the Aim and Theory to understand daemon configurations.",
              "Create a background thread containing an infinite loop.",
              "Configure `thread.setDaemon(true)` in the main method.",
              "Call `thread.start()`.",
              "Print 'Main thread finishing' and exit main.",
              "In Simulation, observe that the background loop terminates instantly when main exit completes.",
              "Verify thread status in the memory state panel.",
              "Run code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class DaemonTask extends Thread {\n    public void run() {\n        while (true) {\n            System.out.println(\"[Daemon thread runs in background]\");\n            try { Thread.sleep(500); } catch(Exception e) { break; }\n        }\n    }\n}\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        DaemonTask t = new DaemonTask();\n        t.setDaemon(true);\n        t.start();\n        Thread.sleep(100);\n        System.out.println(\"Main thread finishing\");\n    }\n}",
              steps: [
                { line: 10, annotation: "Instantiate DaemonTask t.", memory: [{ variable: "t", type: "DaemonTask", value: "NEW" }], output: "" },
                { line: 11, annotation: "Configure t as a Daemon thread.", memory: [{ variable: "t", type: "DaemonTask", value: "NEW (daemon=true)" }], output: "" },
                { line: 12, annotation: "Start thread t. Thread enters loop.", memory: [{ variable: "t", type: "DaemonTask", value: "RUNNABLE" }], output: "" },
                { line: 4, annotation: "Daemon print statement triggers first time.", memory: [], output: "[Daemon thread runs in background]\n" },
                { line: 14, annotation: "Main thread finishes sleep and prints completion message. JVM exits. Daemon is killed immediately.", memory: [], output: "[Daemon thread runs in background]\nMain thread finishing\n" }
              ]
            },
            posttest: [
              { question: "If you call setDaemon(true) after calling start(), what is thrown?", options: ["NullPointerException", "IllegalThreadStateException", "IOException", "ArithmeticException"], answerIndex: 1, hint: "API state verification error class." },
              { question: "Is the Main thread a daemon thread?", options: ["Yes", "No", "Only if overridden", "JVM config dependent"], answerIndex: 1, hint: "The main thread is a standard user thread." },
              { question: "How can you check if a thread is a daemon thread?", options: ["t.isDaemon()", "t.checkDaemon()", "t.getDaemon()", "t.daemonStatus()"], answerIndex: 0, hint: "Returns boolean indicator, named isDaemon()." },
              { question: "Do daemon threads inherit priority from their parent threads?", options: ["Yes", "No", "Only if final", "Only in JDK 11"], answerIndex: 0, hint: "Yes, they inherit configuration values from the spawning thread." },
              { question: "Why are daemon threads unsafe for executing transactional File I/O?", options: ["JVM ignores their files", "They can be killed abruptly at any point during JVM exit, causing corruption", "They lack write access", "They are slower"], answerIndex: 1, hint: "Abort actions occur instantly without running finally blocks." }
            ],
            references: [
              "Oracle Concurrency Guides: SetDaemon: https://docs.oracle.com/javase/8/docs/api/java/lang/Thread.html#setDaemon-boolean-",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e7-4",
          title: "Producer Consumer Problem",
          desc: "Implement a thread-safe solution to the classic Producer-Consumer problem using synchronized blocks.",
          expected: "Produced: 1\nConsumed: 1",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to solving the classic producer-consumer problem using thread synchronization, wait(), and notify() methods.",
              bullets: [
                "Understand the core concepts of Producer Consumer Problem",
                "Implement a Java program that demonstrates producer consumer problem",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Producer Consumer Problem"
              ]
            },
            theory: [
              {
                title: "Producer-Consumer Problem & Synchronization",
                body: [
                  "The Producer-Consumer problem is a classic multi-process synchronization problem. The producer creates data items and places them in a shared buffer, while the consumer retrieves them.",
                  "To resolve resource races, shared buffers must be synchronized. Java uses:",
                  "• `synchronized`: locks object monitors to prevent concurrent access.",
                  "• `wait()`: releases the monitor lock and waits for notification signals.",
                  "• `notify()`: wakes up a waiting thread on the object monitor."
                ]
              }
            ],
            pretest: [
              { question: "Which keyword enforces mutual exclusion on code sections in Java?", options: ["volatile", "synchronized", "transient", "final"], answerIndex: 1, hint: "Synchronized blocks acquire object monitors." },
              { question: "The methods wait(), notify(), and notifyAll() are defined in which class?", options: ["Thread", "Object", "Runnable", "System"], answerIndex: 1, hint: "Inherited by all classes from java.lang.Object." },
              { question: "From where must wait() and notify() be invoked?", options: ["Any method", "Synchronized context (method or block)", "Static blocks", "Constructors only"], answerIndex: 1, hint: "Requires ownership of the object monitor, else throws IllegalMonitorStateException." },
              { question: "What does wait() do to the thread's monitor lock?", options: ["Retains it", "Releases it and waits", "Acquires extra locks", "Destroys lock"], answerIndex: 1, hint: "Allows other threads to enter the synchronized code by releasing the lock." },
              { question: "Which method wakes up a single thread waiting on an object's monitor?", options: ["notify()", "notifyAll()", "resume()", "start()"], answerIndex: 0, hint: "Pings a single waiter." }
            ],
            procedure: [
              "Read the Aim and Theory to understand producer-consumer synchronization.",
              "Create a Buffer class with synchronized methods `put(int val)` and `get()`.",
              "Use wait() inside a loop checking buffer status.",
              "Execute notify() after state changes.",
              "In Simulation, observe lock acquisitions and notify triggers.",
              "Watch thread queues update inside memory.",
              "Compile and run in Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "class Utility {\n    int data;\n    boolean empty = true;\n    synchronized void put(int val) {\n        while (!empty) try { wait(); } catch(Exception e) {}\n        data = val;\n        empty = false;\n        notify();\n    }\n    synchronized int get() {\n        while (empty) try { wait(); } catch(Exception e) {}\n        empty = true;\n        notify();\n        return data;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Utility u = new Utility();\n        u.put(1);\n        System.out.println(\"Produced: 1\");\n        System.out.println(\"Consumed: \" + u.get());\n    }\n}",
              steps: [
                { line: 18, annotation: "Create Utility buffer object u.", memory: [{ variable: "u", type: "Utility", value: "Utility@01 (data=0, empty=true)" }], output: "" },
                { line: 19, annotation: "Call put(1). empty is true. Write data = 1. Set empty = false. Notify waiters.", memory: [{ variable: "u.data", type: "int", value: "1" }, { variable: "u.empty", type: "boolean", value: "false" }], output: "Produced: 1\n" },
                { line: 21, annotation: "Call get() which returns data and resets empty = true.", memory: [{ variable: "u.empty", type: "boolean", value: "true" }], output: "Produced: 1\nConsumed: 1\n" }
              ]
            },
            posttest: [
              { question: "What is thrown if wait() is called outside a synchronized block?", options: ["NullPointerException", "IllegalMonitorStateException", "InterruptedException", "IllegalThreadStateException"], answerIndex: 1, hint: "Thrown because monitor ownership was not acquired." },
              { question: "What occurs to a thread in the wait pool after notify() is called?", options: ["Terminates", "Moves to blocked/ready queue to re-acquire monitor lock", "Starts immediately", "Resets variables"], answerIndex: 1, hint: "Must wait to re-acquire the lock before executing." },
              { question: "Why is wait() usually called inside a loop rather than an if statement?", options: ["To speed up execution", "To check conditions again upon waking up (prevents spurious wakeups)", "To avoid compilation warnings", "Required by Java specifications"], answerIndex: 1, hint: "Spurious wakeups can cause logic bugs if conditions aren't re-verified." },
              { question: "Which method wakes up all threads waiting on an object monitor?", options: ["notify()", "notifyAll()", "wakeAll()", "resumeAll()"], answerIndex: 1, hint: "The notifyAll() method." },
              { question: "Which keyword prevents caching of variables across threads?", options: ["volatile", "synchronized", "transient", "native"], answerIndex: 0, hint: "Volatile forces reads/writes directly from main memory." }
            ],
            references: [
              "Oracle Synchronization Tutorial: https://docs.oracle.com/javase/tutorial/essential/concurrency/sync.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        }
      ]
    },
    {
      title: "EXERCISE 8",
      objective: "Learn to import user defined packages and build graphical interfaces using JavaFX components.",
      tutorial: "Tutorial 8: Packages & JavaFX GUIs",
      labTitle: "Lab 8: Packages & Graphical Interfaces",
      experiments: [
        {
          id: "java-e8-1",
          title: "User Defined Packages",
          desc: "Write a program illustrating creation, compilation, and usage of user-defined Java packages.",
          expected: "Accessing Package: Hello from package!",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to split across packages, declaring classes inside a user package and importing it in the main executable program.",
              bullets: [
                "Understand the core concepts of User Defined Packages",
                "Implement a Java program that demonstrates user defined packages",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to User Defined Packages"
              ]
            },
            theory: [
              {
                title: "Packages in Java",
                body: [
                  "A package in Java is used to group related classes, interfaces, and sub-packages together, acting like folders in a directory.",
                  "Key characteristics of packages:",
                  "1. Prevent naming conflicts (namespacing).",
                  "2. Facilitate search/lookup and usage of classes.",
                  "3. Control access protection (e.g. package-private classes).",
                  "Use `package packagename;` at the top of files to place classes inside that package. Import them using `import packagename.ClassName;`."
                ]
              }
            ],
            pretest: [
              { question: "Which keyword assigns a class to a package?", options: ["import", "package", "namespace", "folder"], answerIndex: 1, hint: "The package statement." },
              { question: "Which keyword loads external classes or packages into a program?", options: ["export", "package", "import", "include"], answerIndex: 2, hint: "The import statement." },
              { question: "What directory layout represents class MyClass in package mypack?", options: ["mypack/MyClass.class", "MyClass/mypack.class", "mypack.MyClass", "system/mypack/MyClass.class"], answerIndex: 0, hint: "Directories match package names." },
              { question: "Which statement imports all classes from java.util package?", options: ["import java.util;", "import java.util.*;", "import java.util.all;", "include java.util.*"], answerIndex: 1, hint: "Uses the wildcard asterisk symbol *." },
              { question: "What is the default package in Java?", options: ["java.lang", "Un-named package (current folder)", "java.util", "default"], answerIndex: 1, hint: "If no package statement is declared, it belongs to the default package." }
            ],
            procedure: [
              "Read the Aim and Theory to understand Java namespaces.",
              "Declare a class inside package mypack: `package mypack; public class Message { ... }`.",
              "Create main class, import class: `import mypack.Message;`.",
              "Step through import statements in the Simulation tab.",
              "Observe package directory search simulations in memory.",
              "Run and compile in Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "// File 1: mypack/Message.java\npackage mypack;\npublic class Message {\n    public static void display() { System.out.println(\"Hello from package!\"); }\n}\n// File 2: Main.java\nimport mypack.Message;\npublic class Main {\n    public static void main(String[] args) {\n        Message.display();\n    }\n}",
              steps: [
                { line: 7, annotation: "JVM loads class Message from package mypack. Import statement checked.", memory: [], output: "" },
                { line: 10, annotation: "Invoke static display method from imported class.", memory: [], output: "Hello from package!\n" }
              ]
            },
            posttest: [
              { question: "Which package is imported automatically in every Java file?", options: ["java.io", "java.util", "java.lang", "java.net"], answerIndex: 2, hint: "Includes basic Object, Math, String and System classes." },
              { question: "Can a package statement reside after import statements in a file?", options: ["Yes", "No", "Only if static", "Only if protected"], answerIndex: 1, hint: "The package statement must be the absolute first line of code." },
              { question: "What modifier is applied to variables that are accessible only inside their defining package?", options: ["private", "public", "protected", "default (no modifier)"], answerIndex: 3, hint: "Also known as package-private access." },
              { question: "Which command compiles a Java file and automatically creates package directory structures?", options: ["javac file.java", "javac -d . file.java", "javac -p file.java", "java file.java"], answerIndex: 1, hint: "The -d destination flag." },
              { question: "Can we declare subpackages in Java?", options: ["No", "Yes, using dot notation package parent.child;", "Yes, using subpackage keyword", "Depends on OS filesystem"], answerIndex: 1, hint: "Yes, like java.util.concurrent." }
            ],
            references: [
              "Oracle Package Tutorial: https://docs.oracle.com/javase/tutorial/java/package/index.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e8-2",
          title: "JavaFX Label and ImageView",
          desc: "Describe the structural JavaFX GUI component hierarchy for labels and image views.",
          expected: "Label text: 'Welcome to JavaFX!'\nImageView displays: 'logo.png'",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to build a gui application structure in javafx containing a label and an imageview to render text and graphical assets.",
              bullets: [
                "Understand the core concepts of JavaFX Label and ImageView",
                "Implement a Java program that demonstrates javafx label and imageview",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to JavaFX Label and ImageView"
              ]
            },
            theory: [
              {
                title: "JavaFX Graphic Architecture",
                body: [
                  "JavaFX is a software platform for creating desktop applications. The UI is built as a Stage (window) containing a Scene (content area) constructed of a hierarchical Scene Graph.",
                  "• Stage: represents the window container.",
                  "• Scene: holds visual node content layouts.",
                  "• Nodes: individual UI components like Buttons, Labels, ImageViews."
                ]
              }
            ],
            pretest: [
              { question: "Which class is the base entry class for all JavaFX applications?", options: ["javafx.application.Application", "javafx.stage.Stage", "javafx.scene.Scene", "javafx.gui.Window"], answerIndex: 0, hint: "Provides the launch() entry method." },
              { question: "Which method is the main entry hook overridden in JavaFX subclasses?", options: ["main()", "init()", "start(Stage)", "execute()"], answerIndex: 2, hint: "start() receives the primary Stage container." },
              { question: "What is a Stage in JavaFX?", options: ["A button component", "The primary window container", "A thread manager", "A database connector"], answerIndex: 1, hint: "Acts as the window frame." },
              { question: "Which component displays static text inside a JavaFX GUI?", options: ["Button", "Label", "TextField", "ImageView"], answerIndex: 1, hint: "Label nodes print text." },
              { question: "Which component renders image assets in JavaFX?", options: ["Image", "ImageView", "Canvas", "Label"], answerIndex: 1, hint: "ImageView is the UI Node, Image holds the pixel data." }
            ],
            procedure: [
              "Read the Aim and Theory to review JavaFX Scene Graph logic.",
              "Extend Application class and override `start(Stage primary)`.",
              "Instantiate Label: `Label lbl = new Label(\"Welcome to JavaFX!\");`.",
              "Instantiate ImageView pointing to an image resource.",
              "Create layout (VBox), add nodes, set Scene, show Stage.",
              "Step through UI initialization threads in the Simulation tab.",
              "Observe layout variables and Scene states in the memory panel.",
              "Compile and review class structures in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "import javafx.application.Application;\nimport javafx.scene.Scene;\nimport javafx.scene.control.Label;\nimport javafx.scene.layout.VBox;\nimport javafx.stage.Stage;\npublic class App extends Application {\n    public void start(Stage stage) {\n        Label label = new Label(\"Welcome to JavaFX!\");\n        VBox vbox = new VBox(label);\n        Scene scene = new Scene(vbox, 300, 200);\n        stage.setScene(scene);\n        stage.show();\n    }\n}",
              steps: [
                { line: 7, annotation: "start(Stage) method triggered. Initialize Stage object.", memory: [{ variable: "stage", type: "Stage", value: "Stage@01" }], output: "" },
                { line: 8, annotation: "Create Label node displaying text 'Welcome to JavaFX!'.", memory: [{ variable: "label", type: "Label", value: "Label@02 (text=\"Welcome to JavaFX!\")" }], output: "Label text: 'Welcome to JavaFX!'\n" },
                { line: 9, annotation: "Add label to a layout container (VBox).", memory: [{ variable: "vbox", type: "VBox", value: "VBox@03 (children=[Label])" }], output: "" },
                { line: 10, annotation: "Establish Scene containing layout with width=300, height=200.", memory: [{ variable: "scene", type: "Scene", value: "Scene@04" }], output: "" },
                { line: 11, annotation: "Bind Scene to stage container.", memory: [], output: "" },
                { line: 12, annotation: "Show window stage. GUI renders in desktop environment.", memory: [], output: "ImageView displays: 'logo.png'\n" }
              ]
            },
            posttest: [
              { question: "Which layout pane organizes nodes vertically in a single column?", options: ["HBox", "VBox", "GridPane", "StackPane"], answerIndex: 1, hint: "VBox stacks children vertically." },
              { question: "Which method launches the JavaFX lifecycle?", options: ["start()", "init()", "launch()", "run()"], answerIndex: 2, hint: "A static utility method called Application.launch(args)." },
              { question: "Can a Scene Graph contain multiple Root layout nodes?", options: ["Yes", "No", "Depends on layout", "Only in JavaFX 11"], answerIndex: 1, hint: "No, a Scene has exactly one root layout node containing all sub-nodes." },
              { question: "Which package contains basic JavaFX controls like Button and Label?", options: ["javafx.scene.layout", "javafx.scene.control", "javafx.stage", "javafx.scene.shape"], answerIndex: 1, hint: "The controls package." },
              { question: "What is the equivalent of Stage in standard swing GUI?", options: ["JFrame", "JPanel", "JButton", "JWindow"], answerIndex: 0, hint: "JFrame is the window frame in Swing." }
            ],
            references: [
              "JavaFX Getting Started: https://openjfx.io/",
              "Oracle JavaFX Developer Guide: https://docs.oracle.com/javase/8/javafx/get-started-tutorial/jfx-overview.htm",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e8-3",
          title: "Tip Calculator App",
          desc: "Describe the event-driven JavaFX components to implement a Tip Calculator interface.",
          expected: "Tip calculated: 15.0\nTotal calculated: 115.0",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to design an event-driven tip calculator application using javafx components like textfield, slider, and button.",
              bullets: [
                "Understand the core concepts of Tip Calculator App",
                "Implement a Java program that demonstrates tip calculator app",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to Tip Calculator App"
              ]
            },
            theory: [
              {
                title: "Event-Driven Programming",
                body: [
                  "Modern GUI programming is event-driven: the program waits for events (button clicks, keypresses, slider movements) and executes handler routines.",
                  "JavaFX registers event listeners using functional interfaces like `EventHandler<ActionEvent>` or lambda expressions: `button.setOnAction(e -> calculate());`."
                ]
              }
            ],
            pretest: [
              { question: "Which listener property responds to button clicks in JavaFX?", options: ["setOnAction", "setOnClick", "setListener", "addActionListener"], answerIndex: 0, hint: "Method name is setOnAction." },
              { question: "Which control allows single-line text input in JavaFX?", options: ["Label", "TextField", "TextArea", "Slider"], answerIndex: 1, hint: "The TextField component." },
              { question: "Which class represents the event object passed to button handler lambdas?", options: ["Event", "ActionEvent", "MouseEvent", "ClickEvent"], answerIndex: 1, hint: "ActionEvent handles general button activations." },
              { question: "Which slider property tracks slider value changes?", options: ["valueProperty()", "sliderProperty()", "positionProperty()", "numberProperty()"], answerIndex: 0, hint: "valueProperty() allows registeringChangeListener on the thumb value." },
              { question: "How do you extract text value from a TextField named txt?", options: ["txt.text", "txt.getText()", "txt.value()", "txt.getString()"], answerIndex: 1, hint: "Using the getter method, called getText()." }
            ],
            procedure: [
              "Read the Aim and Theory to understand GUI event actions.",
              "Create text input fields for Bill Amount.",
              "Add a Slider component representing tip percentage (0% to 30%).",
              "Add button setOnAction lambda to calculate: `Tip = bill * percentage`.",
              "Observe event binding loop triggers in the Simulation tab.",
              "View action event properties in memory.",
              "Run structural layout code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "import javafx.scene.control.Button;\nimport javafx.scene.control.TextField;\npublic class TipCalc {\n    public static void main(String[] args) {\n        TextField billInput = new TextField(\"100\");\n        Button calculate = new Button();\n        calculate.setOnAction(e -> {\n            double bill = Double.parseDouble(billInput.getText());\n            double tip = bill * 0.15;\n            System.out.println(\"Tip calculated: \" + tip);\n            System.out.println(\"Total calculated: \" + (bill + tip));\n        });\n        calculate.fire(); // Simulate button press\n    }\n}",
              steps: [
                { line: 4, annotation: "Create bill input field with value '100'.", memory: [{ variable: "billInput", type: "TextField", value: "TextField(text=\"100\")" }], output: "" },
                { line: 5, annotation: "Instantiate Calculate Button.", memory: [{ variable: "calculate", type: "Button", value: "Button@02" }], output: "" },
                { line: 6, annotation: "Bind Event Listener lambda to the button click action.", memory: [], output: "" },
                { line: 12, annotation: "Trigger simulate action event. Event loop executes calculate block.", memory: [], output: "" },
                { line: 7, annotation: "Extract text bill string '100' and parse to double 100.0.", memory: [{ variable: "bill", type: "double", value: "100.0" }], output: "" },
                { line: 8, annotation: "Calculate 15% tip amount: 100.0 * 0.15 = 15.0.", memory: [{ variable: "bill", type: "double", value: "100.0" }, { variable: "tip", type: "double", value: "15.0" }], output: "" },
                { line: 9, annotation: "Print calculated tip.", memory: [], output: "Tip calculated: 15.0\n" },
                { line: 10, annotation: "Print calculated total: 100 + 15 = 115.0.", memory: [], output: "Tip calculated: 15.0\nTotal calculated: 115.0\n" }
              ]
            },
            posttest: [
              { question: "Which class represents floating-point UI selectors in JavaFX?", options: ["ProgressIndicator", "Slider", "ProgressBar", "Spinner"], answerIndex: 1, hint: "A track with a thumb selector, called Slider." },
              { question: "How do you parse String text '12.50' to double value in Java?", options: ["Double.parseDouble()", "Double.valueOf()", "Integer.parseInt()", "Both Double.parseDouble() & Double.valueOf()"], answerIndex: 3, hint: "Double parseDouble returns double primitive; valueOf returns Double wrapper." },
              { question: "Which control lets users check boolean states in a UI?", options: ["RadioButton", "CheckBox", "Button", "Label"], answerIndex: 1, hint: "CheckBox represents toggled checkbox items." },
              { question: "What is the purpose of Scene Builder in JavaFX?", options: ["To compile source code", "To design layouts graphically and save as FXML", "To run databases", "To write loops"], answerIndex: 1, hint: "A drag-and-drop tool generating FXML layout markup." },
              { question: "How do you apply styles to JavaFX layouts?", options: ["Using CSS files", "Only using java code", "Using HTML code", "Using database links"], answerIndex: 0, hint: "JavaFX layout shapes accept CSS stylesheet properties." }
            ],
            references: [
              "JavaFX Event Handlers: https://docs.oracle.com/javase/8/javafx/api/javafx/event/EventHandler.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        }
      ]
    },
    {
      title: "EXERCISE 9",
      objective: "Connect to databases using JDBC API and execute SQL insert and delete statements.",
      tutorial: "Tutorial 9: JDBC Database Access",
      labTitle: "Lab 9: JDBC & Database Operations",
      experiments: [
        {
          id: "java-e9-1",
          title: "JDBC Connection",
          desc: "Write a java program to establish a secure database connection using the JDBC Driver Manager.",
          expected: "Connecting to database...\nDatabase connected successfully!",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to establishing a database connection using the jdbc api and drivermanager class.",
              bullets: [
                "Understand the core concepts of JDBC Connection",
                "Implement a Java program that demonstrates jdbc connection",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to JDBC Connection"
              ]
            },
            theory: [
              {
                title: "Java Database Connectivity (JDBC)",
                body: [
                  "JDBC (Java Database Connectivity) is a Java API that manages database connections, query executions, and transactional SQL data transfers.",
                  "Key JDBC classes/interfaces in the java.sql package:",
                  "• `DriverManager`: loads drivers and establishes database connections.",
                  "• `Connection`: represents the physical connection session to the database.",
                  "• `Statement`: runs standard static SQL queries.",
                  "• `ResultSet`: holds query result data rows."
                ]
              }
            ],
            pretest: [
              { question: "Which package contains primary JDBC classes?", options: ["java.sql", "java.db", "java.io", "java.util"], answerIndex: 0, hint: "Import java.sql.* is needed." },
              { question: "Which class resolves DB driver configurations and gets connections?", options: ["DriverManager", "ConnectionManager", "DatabaseManager", "SQLManager"], answerIndex: 0, hint: "The DriverManager class." },
              { question: "What is the return type of DriverManager.getConnection()?", options: ["Session", "Statement", "Connection", "Driver"], answerIndex: 2, hint: "Returns a Connection object representing a session." },
              { question: "Which interface represents an active session with a database?", options: ["Statement", "Connection", "ResultSet", "Driver"], answerIndex: 1, hint: "The Connection interface." },
              { question: "Which method loads a database driver class dynamically at runtime?", options: ["Class.forName()", "Driver.load()", "System.load()", "DriverManager.register()"], answerIndex: 0, hint: "Loads the driver bytecodes into JVM memory." }
            ],
            procedure: [
              "Read the Aim and Theory to understand JDBC architecture.",
              "Load the database driver: `Class.forName(\"com.mysql.cj.jdbc.Driver\")`.",
              "Invoke `DriverManager.getConnection(url, user, pass)` inside a try block.",
              "Catch SQLException to handle connection failures.",
              "In Simulation, trace how connection configurations are processed.",
              "Monitor active connection references in memory.",
              "Run structural template code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "import java.sql.Connection;\nimport java.sql.DriverManager;\npublic class JDBCConnect {\n    public static void main(String[] args) {\n        try {\n            System.out.println(\"Connecting to database...\");\n            Connection conn = DriverManager.getConnection(\n                \"jdbc:mysql://localhost:3306/lab\", \"user\", \"pass\"\n            );\n            if (conn != null) {\n                System.out.println(\"Database connected successfully!\");\n                conn.close();\n            }\n        } catch (Exception e) {\n            System.out.println(\"Connection failed: \" + e.getMessage());\n        }\n    }\n}",
              steps: [
                { line: 5, annotation: "Print connection initialization message.", memory: [], output: "Connecting to database...\n" },
                { line: 6, annotation: "Attempt to establish physical JDBC connection to MySQL database via DriverManager.", memory: [{ variable: "conn", type: "Connection", value: "Connection@01" }], output: "" },
                { line: 9, annotation: "Check connection state. conn is not null (True).", memory: [], output: "" },
                { line: 10, annotation: "Print success message.", memory: [], output: "Connecting to database...\nDatabase connected successfully!\n" },
                { line: 11, annotation: "Close the database session to release socket resources.", memory: [{ variable: "conn", type: "Connection", value: "Closed" }], output: "" }
              ]
            },
            posttest: [
              { question: "Which exception must be caught when dealing with JDBC APIs?", options: ["IOException", "SQLException", "DatabaseException", "RuntimeException"], answerIndex: 1, hint: "Most methods in java.sql throw SQLException." },
              { question: "What represents the URL schema prefix for JDBC database connections?", options: ["http://", "jdbc:<subprotocol>:", "sql://", "db://"], answerIndex: 1, hint: "Begins with jdbc: prefix." },
              { question: "Why should database connections be explicitly closed?", options: ["To re-compile classes", "To free up database connection pools and system sockets", "To flush memory to disk", "Required by Java garbage collector"], answerIndex: 1, hint: "Connections are limited system resources." },
              { question: "What is the role of a JDBC Driver?", options: ["To format prints", "To translate JDBC API calls into native database socket protocol commands", "To secure memory", "To write tables"], answerIndex: 1, hint: "Acts as a bridge translating commands between Java and database engines." },
              { question: "Which method creates Statement objects for query executions?", options: ["conn.createStatement()", "new Statement()", "DriverManager.getStatement()", "stmt.init()"], answerIndex: 0, hint: "An instance method called on Connection reference." }
            ],
            references: [
              "Oracle JDBC Documentation: https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e9-2",
          title: "JDBC Insert",
          desc: "Connect to a database using JDBC and execute a SQL INSERT statement.",
          expected: "Inserting record...\nRow inserted successfully! count = 1",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to connecting to a database via jdbc and inserting new rows into a database table using statement.executeupdate().",
              bullets: [
                "Understand the core concepts of JDBC Insert",
                "Implement a Java program that demonstrates jdbc insert",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to JDBC Insert"
              ]
            },
            theory: [
              {
                title: "DML Operations in JDBC",
                body: [
                  "Data Modification Language (DML) statements (INSERT, UPDATE, DELETE) change database table rows.",
                  "In JDBC, DML queries are executed using `executeUpdate(String sql)` on Statement or PreparedStatement objects. This method returns an integer representing the number of rows affected by the query (e.g. 1 means one row was inserted)."
                ]
              }
            ],
            pretest: [
              { question: "Which method is used to execute DML queries (INSERT, UPDATE, DELETE)?", options: ["executeQuery()", "executeUpdate()", "executeSelect()", "executeDML()"], answerIndex: 1, hint: "Returns the count of rows modified." },
              { question: "What is the return type of Statement.executeUpdate()?", options: ["ResultSet", "int", "boolean", "void"], answerIndex: 1, hint: "Returns an integer representing affected rows." },
              { question: "Which SQL command appends new records to a table?", options: ["UPDATE", "ADD", "INSERT INTO", "CREATE"], answerIndex: 2, hint: "The INSERT statement." },
              { question: "What represents a parameterized statement in JDBC to prevent SQL injection?", options: ["Statement", "PreparedStatement", "CallableStatement", "ParameterizedStatement"], answerIndex: 1, hint: "Precompiled and secure, named PreparedStatement." },
              { question: "Can a standard Statement object execute parameterized query values directly?", options: ["Yes", "No", "Only for ints", "Only in MySQL"], answerIndex: 1, hint: "Standard Statement relies on static string concatenations, which are vulnerable to injection." }
            ],
            procedure: [
              "Read the Aim and Theory to understand JDBC updates.",
              "Establish a Connection and create a Statement.",
              "Write SQL INSERT statement string.",
              "Invoke `stmt.executeUpdate(sql)`.",
              "Observe row count variables update inside the Simulation tab.",
              "Confirm memory assignments.",
              "Run standard template code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "import java.sql.Connection;\nimport java.sql.Statement;\npublic class JDBCInsert {\n    public static void main(String[] args) {\n        try (Connection conn = null; Statement stmt = null) {\n            System.out.println(\"Inserting record...\");\n            String query = \"INSERT INTO student VALUES(101, 'Raj')\";\n            int count = 1; // Simulated executeUpdate response\n            if (count > 0) {\n                System.out.println(\"Row inserted successfully! count = \" + count);\n            }\n        } catch(Exception e) {}\n    }\n}",
              steps: [
                { line: 5, annotation: "Print insert start message.", memory: [], output: "Inserting record...\n" },
                { line: 6, annotation: "Create SQL query string to insert ID 101 and Name Raj.", memory: [{ variable: "query", type: "String", value: "\"INSERT INTO student VALUES(101, 'Raj')\"" }], output: "" },
                { line: 7, annotation: "Execute update query. Database engine processes query and returns affected rows count (1).", memory: [{ variable: "count", type: "int", value: "1" }], output: "" },
                { line: 9, annotation: "Verify row update status. 1 > 0 is True.", memory: [], output: "Inserting record...\nRow inserted successfully! count = 1\n" }
              ]
            },
            posttest: [
              { question: "Which interface precompiles SQL statements on the database server?", options: ["Statement", "PreparedStatement", "CallableStatement", "SQLStatement"], answerIndex: 1, hint: "Used for high efficiency and parameter binding." },
              { question: "How do you define placeholders inside a PreparedStatement query?", options: ["Using %s", "Using ?", "Using :value", "Using $"], answerIndex: 1, hint: "Uses the question mark character ?" },
              { question: "What is thrown if the INSERT violates table unique constraints?", options: ["NullPointerException", "SQLException", "ConstraintException", "IOException"], answerIndex: 1, hint: "All database validation errors yield SQLException." },
              { question: "Which method is used to bind an integer value to the first parameter placeholder of a PreparedStatement ps?", options: ["ps.setInt(1, value)", "ps.setInteger(0, value)", "ps.bindInt(1, value)", "ps.setInt(value)"], answerIndex: 0, hint: "Indices are 1-based, called setInt()." },
              { question: "Which try statement structure automatically closes database resources since Java 7?", options: ["try-catch", "try-with-resources", "try-finally", "finally-close"], answerIndex: 1, hint: "Uses parentheses in try declaration: try (Connection conn = ...) {}." }
            ],
            references: [
              "Oracle JDBC executeUpdate Javadoc: https://docs.oracle.com/javase/8/docs/api/java/sql/Statement.html#executeUpdate-java.lang.String-",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        },
        {
          id: "java-e9-3",
          title: "JDBC Delete",
          desc: "Connect to a database using JDBC and execute a SQL DELETE statement.",
          expected: "Deleting record...\nRow deleted successfully! count = 1",
          content: {
            aim: {
              text: "In this experiment the student will implement a Java program to connecting to a database via jdbc and deleting specific rows using statement.executeupdate().",
              bullets: [
                "Understand the core concepts of JDBC Delete",
                "Implement a Java program that demonstrates jdbc delete",
                "Trace the execution flow and observe the state in the simulation memory panel",
                "Analyze the compilation and execution results in the Wandbox code tester",
                "Identify edge cases and best practices related to JDBC Delete"
              ]
            },
            theory: [
              {
                title: "Deletions in JDBC",
                body: [
                  "Similar to INSERT, SQL DELETE queries are executed using `executeUpdate(String sql)`.",
                  "This returns the number of rows matched and deleted by the query condition (e.g. DELETE FROM student WHERE id=101 returns 1 if student 101 exists)."
                ]
              }
            ],
            pretest: [
              { question: "Which SQL statement deletes records from a database table?", options: ["REMOVE", "DELETE FROM", "DROP", "TRUNCATE"], answerIndex: 1, hint: "DELETE FROM removes rows matched by conditions." },
              { question: "What occurs if you execute DELETE FROM table without a WHERE clause?", options: ["Throws compile error", "Deletes all rows in the table", "Throws SQLException", "Deletes only the first row"], answerIndex: 1, hint: "Destructive query that clears the entire table." },
              { question: "How does executeUpdate() communicate query outcomes?", options: ["By returning the matches ResultSet", "By returning the integer count of modified rows", "By returning boolean success flag", "By printing status"], answerIndex: 1, hint: "Returns integer counts." },
              { question: "Which JDBC Statement subclass invokes database stored procedures?", options: ["PreparedStatement", "CallableStatement", "Statement", "ProcedureStatement"], answerIndex: 1, hint: "The CallableStatement interface." },
              { question: "Does Statement.close() close the associated Connection?", options: ["Yes", "No", "Depends on driver", "Only in MySQL"], answerIndex: 1, hint: "No, closing a statement only frees the statement resource. You must close the Connection independently." }
            ],
            procedure: [
              "Read the Aim and Theory to understand deletion queries.",
              "Establish a Connection and create a Statement.",
              "Write SQL DELETE statement: `DELETE FROM student WHERE id = 101`.",
              "Invoke `stmt.executeUpdate(sql)`.",
              "In Simulation, trace how condition parameters match rows.",
              "Watch variables list and updates in memory.",
              "Run code in the Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: {
              code: "import java.sql.Connection;\nimport java.sql.Statement;\npublic class JDBCDelete {\n    public static void main(String[] args) {\n        try (Connection conn = null; Statement stmt = null) {\n            System.out.println(\"Deleting record...\");\n            String query = \"DELETE FROM student WHERE id = 101\";\n            int count = 1; // Simulated executeUpdate response\n            if (count > 0) {\n                System.out.println(\"Row deleted successfully! count = \" + count);\n            }\n        } catch(Exception e) {}\n    }\n}",
              steps: [
                { line: 5, annotation: "Print deletion start message.", memory: [], output: "Deleting record...\n" },
                { line: 6, annotation: "Write DELETE SQL statement matching student with id 101.", memory: [{ variable: "query", type: "String", value: "\"DELETE FROM student WHERE id = 101\"" }], output: "" },
                { line: 7, annotation: "Execute delete query. Database updates tables and returns 1 row affected.", memory: [{ variable: "count", type: "int", value: "1" }], output: "" },
                { line: 9, annotation: "Verify row delete status. 1 > 0 is True.", memory: [], output: "Deleting record...\nRow deleted successfully! count = 1\n" }
              ]
            },
            posttest: [
              { question: "What is the return value of executeUpdate() if no rows matched the delete condition?", options: ["0", "-1", "throws SQLException", "null"], answerIndex: 0, hint: "0 rows were affected by the operation." },
              { question: "Which statement is true about SQL injection vulnerability in deletion?", options: ["Only INSERT is vulnerable", "Concatenating user inputs directly into static DELETE strings is fully vulnerable", "SQL injection is impossible in DELETE", "PreparedStatement is vulnerable"], answerIndex: 1, hint: "Static string concatenation is vulnerable for all DML queries." },
              { question: "Can a transaction be rolled back in JDBC after executing DML if auto-commit is disabled?", options: ["No", "Yes, using conn.rollback()", "Only if table is dropped", "Only via reflections"], answerIndex: 1, hint: "Calling conn.rollback() cancels uncommitted statements." },
              { question: "How do you disable auto-commit in JDBC?", options: ["conn.setAutoCommit(false)", "conn.commit(false)", "DriverManager.setAutoCommit(false)", "stmt.disableCommit()"], answerIndex: 0, hint: "Called on the Connection object with false parameter." },
              { question: "What method commits a transaction in JDBC?", options: ["conn.commit()", "conn.save()", "stmt.commit()", "DriverManager.commit()"], answerIndex: 0, hint: "The Connection.commit() method." }
            ],
            references: [
              "Oracle JDBC Transaction Tutorial: https://docs.oracle.com/javase/tutorial/jdbc/basics/transactions.html",
              "Schildt, H., 'Java: The Complete Reference'"
            ]
          }
        }
      ]
    }
  ]
};
