import type { Course } from "./course-data";
import { javaShortNotes } from "./java-short-notes";

export const javaCourse: Course = {
  id: "java",
  title: "Java Programming",
  shortNotes: javaShortNotes,
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
    "The Virtual Java Programming Lab provides an interactive playground for exploring Java code, running live tests, and visualizing execution states directly inside a modern WebAssembly/Wandbox compiler runtime.",
    "The course is structured into 9 core Exercises covering primitive types, quadratic equations, searching and sorting algorithms, StringBuffers, class designs, inheritance, interfaces, exception frameworks, multithreading, packages, JavaFX graphical components, and database access using JDBC.",
    "Each experiment in this workspace contains an Aim, Theory, Pre-test questionnaire, interactive Procedure, Simulation view showing the program's live memory state, a Code Test editor running a real JDK compiler, and a Post-test review to verify understanding."
  ],
  targetAudience: {
    primary: "Students learning Java programming, object-oriented concepts, and application development.",
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
            { question: "Which of the following is a primitive data type in Java?", options: ["String", "int", "Array", "Object"], answerIndex: 1 },
            { question: "How many primitive data types are defined in Java?", options: ["6", "7", "8", "9"], answerIndex: 2 },
            { question: "Which primitive type is used to store a single character?", options: ["String", "char", "byte", "boolean"], answerIndex: 1 },
            { question: "Which primitive data type stores true or false values?", options: ["int", "char", "float", "boolean"], answerIndex: 3 },
            { question: "What is the default value of an instance variable of type int?", options: ["0", "1", "null", "undefined"], answerIndex: 0 },
            { question: "Which primitive data type can store decimal numbers?", options: ["boolean", "char", "float", "byte"], answerIndex: 2 },
            { question: "What is the default value of a boolean instance variable?", options: ["true", "false", "null", "0"], answerIndex: 1 },
            { question: "Which primitive data type is used for large integer values?", options: ["byte", "short", "long", "char"], answerIndex: 2 },
            { question: "What is the default value of a double instance variable?", options: ["0", "null", "false", "0.0"], answerIndex: 3 },
            { question: "Java is called statically typed because variables must be:", options: ["Initialized automatically", "Declared before use", "Global", "Constant"], answerIndex: 1 },
            { question: "Which primitive type occupies the least memory?", options: ["byte", "short", "int", "long"], answerIndex: 0 },
            { question: "What is the default value of a char instance variable?", options: ["'0'", "null", "'\\u0000'", "' '"], answerIndex: 2 },
            { question: "Which of the following is NOT a primitive data type?", options: ["int", "String", "double", "boolean"], answerIndex: 1 },
            { question: "What happens if a local variable is used before initialization?", options: ["Runtime Error", "Compilation Error", "Warning Only", "No Error"], answerIndex: 1 },
            { question: "Which primitive type is suitable for storing whole numbers?", options: ["boolean", "char", "int", "float"], answerIndex: 2 },
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
            simulation: "java-e1-1",
            posttest: [
            { question: "Which statement about local variables is correct?", options: ["They receive default values automatically", "They are always initialized to 0", "They must be explicitly initialized before use", "They are stored in heap memory only"], answerIndex: 2 },
            { question: "Which primitive type stores a 64-bit floating-point number?", options: ["float", "byte", "short", "double"], answerIndex: 3 },
            { question: "Which keyword declares a variable capable of storing true or false?", options: ["bool", "bit", "boolean", "logical"], answerIndex: 2 },
            { question: "What is printed by the following code? int x = 10; System.out.println(x);", options: ["x", "10", "Error", "null"], answerIndex: 1 },
            { question: "Which primitive type is most appropriate for storing grades such as 'A' or 'B'?", options: ["char", "int", "float", "boolean"], answerIndex: 0 },
            { question: "What happens when an uninitialized local variable is used in System.out.println()?", options: ["Runtime Error", "No Error", "Compilation Error due to uninitialized local variable", "Null Pointer Exception"], answerIndex: 2 },
            { question: "What is the default value of a static variable of type boolean?", options: ["true", "false", "null", "undefined"], answerIndex: 1 },
            { question: "Which primitive data type would you choose to store the Unicode value of a character?", options: ["char", "float", "boolean", "double"], answerIndex: 0 },
            { question: "Which declaration is valid in Java?", options: ["integer num;", "Int num;", "int num;", "Number num;"], answerIndex: 2 },
            { question: "What is the output? char ch = 'A'; System.out.println(ch);", options: ["65", "A", "Error", "null"], answerIndex: 1 },
            { question: "Which primitive data type is initialized to '\\u0000' by default when declared as an instance variable?", options: ["boolean", "int", "char", "float"], answerIndex: 2 },
            { question: "Why is 'f' used in float price = 10.5f?", options: ["To indicate float literal", "To indicate final variable", "To convert to int", "To indicate formatting"], answerIndex: 0 },
            { question: "Which scenario causes a compilation error in Java?", options: ["Declaring int x = 5", "Declaring boolean flag = true", "Declaring char ch = 'A'", "Using an uninitialized local variable in println"], answerIndex: 3 },
            { question: "What value does an uninitialized instance variable of type int hold?", options: ["undefined", "null", "1", "0"], answerIndex: 3 },
            { question: "Which statement is TRUE regarding primitive data types in Java?", options: ["Primitive types are objects.", "Local variables always receive default values.", "Primitive types store actual values directly.", "String is a primitive type."], answerIndex: 2 },
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
            { question: "What is the general form of a quadratic equation?", options: ["ax + b = 0", "ax\u00b2 + bx + c = 0", "ax\u00b3 + bx\u00b2 + c = 0", "ax\u00b2 + c = 0"], answerIndex: 1 },
            { question: "In the equation ax\u00b2 + bx + c = 0, what is the coefficient of x\u00b2?", options: ["a", "b", "c", "0"], answerIndex: 0 },
            { question: "What is the discriminant of a quadratic equation?", options: ["a\u00b2 + b\u00b2", "b\u00b2 + 4ac", "b\u00b2 \u2212 4ac", "a\u00b2 \u2212 c\u00b2"], answerIndex: 2 },
            { question: "Which symbol is used to represent the discriminant?", options: ["R", "D", "X", "Q"], answerIndex: 1 },
            { question: "If D > 0, the roots are:", options: ["Real and distinct", "Real and equal", "Imaginary", "Undefined"], answerIndex: 0 },
            { question: "If D = 0, the roots are:", options: ["Distinct", "Complex", "Real and equal", "Undefined"], answerIndex: 2 },
            { question: "If D < 0, the roots are:", options: ["Real and distinct", "Real and equal", "Rational", "Complex and imaginary"], answerIndex: 3 },
            { question: "Which mathematical operation is required in the quadratic formula?", options: ["Logarithm", "Square root", "Factorial", "Modulus"], answerIndex: 1 },
            { question: "What is the value of D for x\u00b2 + 4x + 4 = 0?", options: ["0", "4", "8", "16"], answerIndex: 0 },
            { question: "The roots of a quadratic equation are calculated using:", options: ["Distance formula", "Midpoint formula", "Quadratic formula", "Area formula"], answerIndex: 2 },
            { question: "Find the discriminant of x\u00b2 + 5x + 6 = 0.", options: ["25", "24", "1", "36"], answerIndex: 2 },
            { question: "What is the discriminant of 2x\u00b2 + 4x + 2 = 0?", options: ["4", "8", "16", "0"], answerIndex: 3 },
            { question: "For x\u00b2 + 2x + 5 = 0, the roots are:", options: ["Real and equal", "Real and distinct", "Complex", "Integers"], answerIndex: 2 },
            { question: "Which Java class provides the sqrt() method?", options: ["Scanner", "Math", "String", "System"], answerIndex: 1 },
            { question: "What is D for x\u00b2 \u2212 6x + 9 = 0?", options: ["0", "9", "18", "36"], answerIndex: 0 },
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
            simulation: "java-e1-2",
            posttest: [
            { question: "For a = 1, b = 3, c = 2, the discriminant is:", options: ["1", "5", "9", "13"], answerIndex: 0 },
            { question: "If D = 49, then the square root of D equals:", options: ["5", "6", "7", "8"], answerIndex: 2 },
            { question: "What is the value of D for 3x\u00b2 + 2x + 1 = 0?", options: ["8", "-8", "4", "-4"], answerIndex: 1 },
            { question: "Which condition indicates repeated roots?", options: ["D > 0", "D < 0", "D = 1", "D = 0"], answerIndex: 3 },
            { question: "For D > 0, how many distinct real roots exist?", options: ["0", "1", "2", "Infinite"], answerIndex: 2 },
            { question: "Calculate D for x\u00b2 \u2212 8x + 12 = 0.", options: ["16", "8", "4", "0"], answerIndex: 0 },
            { question: "If a = 2, b = 5, c = 2, what is D?", options: ["25", "9", "16", "1"], answerIndex: 1 },
            { question: "The roots of x\u00b2 \u2212 5x + 6 = 0 are:", options: ["2 and 3", "-2 and -3", "1 and 6", "-1 and -6"], answerIndex: 0 },
            { question: "What is the value of D for x\u00b2 + x + 1 = 0?", options: ["1", "-3", "3", "-1"], answerIndex: 1 },
            { question: "For x\u00b2 \u2212 2x + 1 = 0, the roots are:", options: ["1 and 1", "1 and -1", "2 and 2", "-2 and -2"], answerIndex: 0 },
            { question: "Which expression correctly represents one root of a quadratic equation?", options: ["(-b + \u221aD)/(2a)", "(-a + \u221aD)/(2b)", "(b + \u221aD)/(2a)", "(a + \u221aD)/(2b)"], answerIndex: 0 },
            { question: "A quadratic equation has imaginary roots when:", options: ["a = 0", "b = 0", "D < 0", "D > 0"], answerIndex: 2 },
            { question: "For a = 1, b = -4, c = 4, the roots are:", options: ["4 and 4", "2 and 2", "-2 and -2", "1 and 1"], answerIndex: 1 },
            { question: "If D = 64, the roots are guaranteed to be:", options: ["Complex", "Equal", "Real and distinct", "Undefined"], answerIndex: 2 },
            { question: "Which statement is true regarding the discriminant?", options: ["It determines the nature of roots.", "It gives the sum of roots.", "It gives the product of roots.", "It is always positive."], answerIndex: 0 },
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
            { question: "What is the primary requirement for applying Binary Search?", options: ["Array must be unsorted", "Array must contain duplicates", "Array must be sorted", "Array size must be even"], answerIndex: 2 },
            { question: "Binary Search works by:", options: ["Searching sequentially", "Dividing the search space into halves", "Sorting the array first", "Comparing all elements"], answerIndex: 1 },
            { question: "What is the initial value of low in Binary Search?", options: ["1", "length", "length - 1", "0"], answerIndex: 3 },
            { question: "What is the initial value of high in Binary Search?", options: ["length - 1", "length", "0", "1"], answerIndex: 0 },
            { question: "How is mid calculated?", options: ["low + high", "(low + high) / 2", "high - low", "low * high"], answerIndex: 1 },
            { question: "What happens if array[mid] equals the target?", options: ["Search continues", "Return mid", "Return high", "Return low"], answerIndex: 1 },
            { question: "If target is smaller than array[mid], which variable changes?", options: ["low = mid + 1", "mid = low", "high = mid - 1", "high = mid + 1"], answerIndex: 2 },
            { question: "If target is greater than array[mid], which variable changes?", options: ["low = mid + 1", "high = mid - 1", "high = low", "mid = high"], answerIndex: 0 },
            { question: "Binary Search is most efficient for:", options: ["Sorted arrays", "Random arrays only", "Linked lists only", "Trees only"], answerIndex: 0 },
            { question: "Binary Search stops when:", options: ["low = 0", "high = 0", "low exceeds high", "mid = 0"], answerIndex: 2 },
            { question: "What is the time complexity of Binary Search?", options: ["O(n\u00b2)", "O(n)", "O(log n)", "O(1)"], answerIndex: 2 },
            { question: "Which search method generally requires fewer comparisons on large sorted arrays?", options: ["Linear Search", "Sequential Search", "Binary Search", "Bubble Search"], answerIndex: 2 },
            { question: "In Binary Search, how much of the search space is eliminated in each step?", options: ["One element", "Half", "One-fourth", "Entire array"], answerIndex: 1 },
            { question: "What is the mid index for low = 0 and high = 8?", options: ["3", "5", "4", "6"], answerIndex: 2 },
            { question: "Which condition indicates that the element is not present?", options: ["low == high", "low > high", "mid == 0", "high == length"], answerIndex: 1 },
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
            simulation: "java-e2-1",
            posttest: [
            { question: "For array [10,20,30,40,50], what is the first mid index?", options: ["1", "2", "3", "4"], answerIndex: 1 },
            { question: "Binary Search belongs to which strategy?", options: ["Greedy Method", "Dynamic Programming", "Divide and Conquer", "Backtracking"], answerIndex: 2 },
            { question: "What is searched first in Binary Search?", options: ["First element", "Last element", "Middle element", "Random element"], answerIndex: 2 },
            { question: "Which Java operator is commonly used to compare values?", options: ["=", "==", "!=", "&&"], answerIndex: 1 },
            { question: "Binary Search can be performed recursively or:", options: ["Sequentially", "Iteratively", "Randomly", "Parallelly"], answerIndex: 1 },
            { question: "Consider array [2,4,6,8,10,12,14]. Search target = 10. First mid element is:", options: ["6", "8", "10", "12"], answerIndex: 1 },
            { question: "For array [5,10,15,20,25], target = 25. After first comparison, low becomes:", options: ["0", "1", "2", "3"], answerIndex: 3 },
            { question: "What is the worst-case number of comparisons for Binary Search on 16 elements?", options: ["16", "8", "4", "2"], answerIndex: 2 },
            { question: "Which statement about Binary Search is true?", options: ["It works only on unsorted arrays", "It always checks every element", "It requires sorted data", "It has O(n) complexity"], answerIndex: 2 },
            { question: "If low = 5 and high = 9, mid equals:", options: ["6", "7", "8", "9"], answerIndex: 1 },
            { question: "Searching 1000 sorted elements with Binary Search is faster because:", options: ["It checks every element", "It eliminates half the search space repeatedly", "It sorts the array during search", "It uses extra memory"], answerIndex: 1 },
            { question: "Which value is returned when the target is found?", options: ["Array value", "Index position", "Array length", "Mid value only"], answerIndex: 1 },
            { question: "In Binary Search, if target < array[mid], the search continues in the:", options: ["Right half", "Entire array", "Left half", "Random half"], answerIndex: 2 },
            { question: "What is the first comparison when searching in Binary Search?", options: ["Target with first element", "Target with last element", "Target with middle element", "Target with all elements"], answerIndex: 2 },
            { question: "Why is Binary Search more efficient than Linear Search for large sorted arrays?", options: ["It compares all elements simultaneously", "It divides the search space by half in each iteration", "It uses sorting during search", "It requires no comparisons"], answerIndex: 1 },
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
            { question: "What type of sorting algorithm is Bubble Sort?", options: ["Comparison-based sorting", "Hashing algorithm", "Searching algorithm", "Divide and Conquer algorithm"], answerIndex: 0 },
            { question: "Bubble Sort works by comparing:", options: ["First and last elements", "Random elements", "Adjacent elements", "Middle elements"], answerIndex: 2 },
            { question: "When are two elements swapped in Bubble Sort?", options: ["When they are equal", "When they are in the wrong order", "When they are adjacent", "When they are both odd"], answerIndex: 1 },
            { question: "Bubble Sort continues passes until:", options: ["The first element is sorted", "Half the array is sorted", "No swaps are needed", "The last element is reached once"], answerIndex: 2 },
            { question: "Why is it called Bubble Sort?", options: ["Elements are grouped in bubbles", "Smaller elements bubble to the top", "It uses bubble memory", "It sorts circular arrays"], answerIndex: 1 },
            { question: "Which operation is most important in Bubble Sort?", options: ["Division", "Recursion", "Comparison", "Hashing"], answerIndex: 2 },
            { question: "Bubble Sort is mainly used for:", options: ["Sorting data", "Searching data", "Encrypting data", "Compressing data"], answerIndex: 0 },
            { question: "What happens if adjacent elements are already in the correct order?", options: ["They are deleted", "They are swapped", "No swap occurs", "The algorithm stops immediately"], answerIndex: 2 },
            { question: "Which of the following can be sorted using Bubble Sort?", options: ["Arrays", "Lists", "Collections of comparable items", "All of the above"], answerIndex: 3 },
            { question: "Bubble Sort arranges data in:", options: ["Random order", "Sorted order", "Reverse memory order", "Binary order only"], answerIndex: 1 },
            { question: "In ascending Bubble Sort, when should a swap occur?", options: ["Left element > Right element", "Left element < Right element", "Both elements equal", "Left element = 0"], answerIndex: 0 },
            { question: "What is the best indication that the array is completely sorted?", options: ["Last element is largest", "First element is smallest", "No swaps occur in a pass", "Array length is even"], answerIndex: 2 },
            { question: "How many elements are compared at a time in Bubble Sort?", options: ["One", "Two", "Three", "Four"], answerIndex: 1 },
            { question: "Which element reaches its correct position after the first pass in ascending Bubble Sort?", options: ["Smallest element", "Middle element", "Largest element", "Random element"], answerIndex: 2 },
            { question: "Bubble Sort repeatedly scans the array from:", options: ["End to start only", "Beginning to end", "Middle to end", "Random positions"], answerIndex: 1 },
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
            simulation: "java-e2-2",
            posttest: [
            { question: "Which statement about Bubble Sort is true?", options: ["It does not compare elements", "It uses adjacent comparisons", "It requires recursion", "It works only for strings"], answerIndex: 1 },
            { question: "What is the time complexity of Bubble Sort in the worst case?", options: ["O(log n)", "O(n)", "O(n\u00b2)", "O(1)"], answerIndex: 2 },
            { question: "What is the time complexity of Bubble Sort in the best case (optimized)?", options: ["O(1)", "O(log n)", "O(n)", "O(n\u00b2)"], answerIndex: 2 },
            { question: "Which sorting algorithm repeatedly swaps adjacent elements?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Binary Sort"], answerIndex: 2 },
            { question: "What is the first comparison in the array [5, 2, 8, 1]?", options: ["5 and 2", "2 and 8", "8 and 1", "5 and 8"], answerIndex: 0 },
            { question: "After the first pass of Bubble Sort on [4, 3, 2, 1], which element will be in its final position?", options: ["1", "2", "3", "4"], answerIndex: 3 },
            { question: "How many comparisons are needed in the first pass of a 5-element array?", options: ["3", "4", "5", "6"], answerIndex: 1 },
            { question: "What is the sorted output of [3, 1, 2] using ascending Bubble Sort?", options: ["[3, 2, 1]", "[1, 2, 3]", "[2, 3, 1]", "[1, 3, 2]"], answerIndex: 1 },
            { question: "Bubble Sort is considered inefficient for:", options: ["Very small datasets", "Large datasets", "Arrays with two elements", "Already sorted arrays"], answerIndex: 1 },
            { question: "Which condition reduces unnecessary passes in optimized Bubble Sort?", options: ["Tracking swaps", "Increasing array size", "Using recursion", "Using hashing"], answerIndex: 0 },
            { question: "If no swaps occur during a pass, Bubble Sort:", options: ["Restarts sorting", "Reverses the array", "Terminates early", "Doubles the array size"], answerIndex: 2 },
            { question: "In ascending order Bubble Sort, the largest element moves toward the:", options: ["Beginning", "Middle", "End", "Random position"], answerIndex: 2 },
            { question: "Which of the following arrays is already sorted?", options: ["[4, 3, 2, 1]", "[1, 2, 3, 4]", "[2, 1, 4, 3]", "[3, 1, 2, 4]"], answerIndex: 1 },
            { question: "What is the primary advantage of Bubble Sort?", options: ["Easy to understand and implement", "Fastest sorting algorithm", "Requires no comparisons", "Uses Divide and Conquer"], answerIndex: 0 },
            { question: "Why does Bubble Sort require multiple passes?", options: ["Only one element may reach its correct position per pass", "It sorts two arrays simultaneously", "It uses recursion internally", "It performs binary searching"], answerIndex: 0 },
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
            { question: "What is the main characteristic of a String object in Java?", options: ["Mutable", "Dynamic", "Immutable", "Synchronized"], answerIndex: 2 },
            { question: "What does immutable mean in Java Strings?", options: ["Strings can be modified directly", "Strings cannot be modified after creation", "Strings are always empty", "Strings are synchronized"], answerIndex: 1 },
            { question: "Which class provides mutable character sequences in Java?", options: ["String", "Character", "Object", "StringBuffer"], answerIndex: 3 },
            { question: "What happens when a String is modified?", options: ["Original String changes", "New String object is created", "String is deleted", "Program stops"], answerIndex: 1 },
            { question: "Which class is thread-safe in Java?", options: ["String", "StringBuilder", "StringBuffer", "Character"], answerIndex: 2 },
            { question: "Why can excessive String modifications increase memory usage?", options: ["Strings are mutable", "New String objects are created repeatedly", "Strings use no memory", "Strings are synchronized"], answerIndex: 1 },
            { question: "Which method is commonly used to add text to a StringBuffer?", options: ["append()", "add()", "push()", "put()"], answerIndex: 0 },
            { question: "StringBuffer methods are thread-safe because they are:", options: ["Static", "Final", "Private", "Synchronized"], answerIndex: 3 },
            { question: "Which class is best suited for frequent string modifications?", options: ["String", "Integer", "StringBuffer", "Character"], answerIndex: 2 },
            { question: "Which operation can be performed using StringBuffer?", options: ["append()", "insert()", "delete()", "All of the above"], answerIndex: 3 },
            { question: "Which statement is true about String?", options: ["It is mutable", "It is immutable", "It cannot store text", "It is not a class"], answerIndex: 1 },
            { question: "Which class avoids creating new objects during modifications?", options: ["String", "Object", "StringBuffer", "Scanner"], answerIndex: 2 },
            { question: "What is the output? String s = \"Java\"; s.concat(\" Programming\"); System.out.println(s);", options: ["Java Programming", "Programming", "Java", "Error"], answerIndex: 2 },
            { question: "What is the output? StringBuffer sb = new StringBuffer(\"Java\"); sb.append(\" Programming\"); System.out.println(sb);", options: ["Java", "Programming", "Java Programming", "Error"], answerIndex: 2 },
            { question: "Which method inserts text at a specified position in StringBuffer?", options: ["append()", "insert()", "delete()", "reverse()"], answerIndex: 1 },
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
            simulation: "java-e2-3",
            posttest: [
            { question: "Which method removes characters from a StringBuffer?", options: ["append()", "insert()", "delete()", "replace()"], answerIndex: 2 },
            { question: "Which method reverses the contents of a StringBuffer?", options: ["invert()", "reverse()", "rotate()", "flip()"], answerIndex: 1 },
            { question: "What is a major advantage of StringBuffer over String?", options: ["Less memory consumption during modifications", "Simpler syntax", "Smaller size always", "No methods available"], answerIndex: 0 },
            { question: "Which class creates a new object whenever content changes?", options: ["StringBuffer", "String", "Scanner", "Math"], answerIndex: 1 },
            { question: "StringBuffer is particularly useful when:", options: ["Data never changes", "Frequent modifications are required", "Only numbers are stored", "No text processing is needed"], answerIndex: 1 },
            { question: "What is the output? StringBuffer sb = new StringBuffer(\"ABC\"); sb.reverse(); System.out.println(sb);", options: ["ABC", "CBA", "BAC", "Error"], answerIndex: 1 },
            { question: "Which of the following methods belongs to StringBuffer?", options: ["append()", "insert()", "delete()", "All of the above"], answerIndex: 3 },
            { question: "What is the result? StringBuffer sb = new StringBuffer(\"Java\"); sb.insert(4, \" SE\"); System.out.println(sb);", options: ["JavaSE", "Java SE", "SEJava", "Error"], answerIndex: 1 },
            { question: "Which feature makes StringBuffer suitable for multithreaded environments?", options: ["Immutability", "Synchronization", "Inheritance", "Compilation"], answerIndex: 1 },
            { question: "What is the output? StringBuffer sb = new StringBuffer(\"Java\"); sb.delete(1,3); System.out.println(sb);", options: ["Ja", "Jva", "Java", "Ja"], answerIndex: 0 },
            { question: "Which class would you choose for repeated concatenation inside a loop?", options: ["String", "StringBuffer", "Character", "Scanner"], answerIndex: 1 },
            { question: "What happens to the original String after calling concat()?", options: ["It changes permanently", "It is deleted", "It remains unchanged unless reassigned", "It becomes mutable"], answerIndex: 2 },
            { question: "Which statement is correct?", options: ["StringBuffer is immutable", "String is mutable", "StringBuffer can be modified without creating new objects", "StringBuffer has no methods"], answerIndex: 2 },
            { question: "What is the output? StringBuffer sb = new StringBuffer(\"Code\"); sb.append(\" Lab\"); System.out.println(sb);", options: ["CodeLab", "LabCode", "Code Lab", "Error"], answerIndex: 2 },
            { question: "Which statement best describes StringBuffer?", options: ["Immutable and non-synchronized", "Mutable and synchronized", "Mutable and unsynchronized", "Immutable and synchronized"], answerIndex: 1 },
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
            { question: "What is a class in Java?", options: ["A variable", "A blueprint for creating objects", "A method", "A package"], answerIndex: 1 },
            { question: "An object is:", options: ["A keyword", "A package", "An instance of a class", "A constructor"], answerIndex: 2 },
            { question: "Which keyword is used to create an object in Java?", options: ["class", "create", "object", "new"], answerIndex: 3 },
            { question: "What does a class define?", options: ["Only methods", "Only variables", "State and behavior", "Only constructors"], answerIndex: 2 },
            { question: "Memory for objects is allocated using:", options: ["malloc", "alloc", "new", "memory"], answerIndex: 2 },
            { question: "Objects are stored in which memory area?", options: ["Stack", "Heap", "Cache", "Register"], answerIndex: 1 },
            { question: "Which operator is used to access object members?", options: [":", "->", ".", "#"], answerIndex: 2 },
            { question: "A real-world entity in Java is represented using:", options: ["Class and Object", "Loop", "Array", "Package"], answerIndex: 0 },
            { question: "Which of the following is an example of a class?", options: ["Student", "student1", "100", "main()"], answerIndex: 0 },
            { question: "Which of the following is an object?", options: ["Car", "Student", "student1", "Class"], answerIndex: 2 },
            { question: "What is the state of an object represented by?", options: ["Fields/Variables", "Methods", "Constructors", "Packages"], answerIndex: 0 },
            { question: "What is the behavior of an object represented by?", options: ["Fields", "Methods", "Packages", "Arrays"], answerIndex: 1 },
            { question: "Which statement creates an object of class Student?", options: ["Student;", "Student s;", "Student s = new Student();", "new Student;"], answerIndex: 2 },
            { question: "What is returned by the new keyword?", options: ["Method", "Constructor", "Reference to object", "Variable"], answerIndex: 2 },
            { question: "Which is correct for accessing a method?", options: ["obj:method()", "obj.method()", "obj->method()", "method.obj()"], answerIndex: 1 },
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
            simulation: "java-e3-1",
            posttest: [
            { question: "Which is correct for accessing a field?", options: ["obj.field", "obj:field", "field.obj", "obj->field"], answerIndex: 0 },
            { question: "What is the output type of object creation?", options: ["Integer value", "Reference value", "Boolean value", "Character value"], answerIndex: 1 },
            { question: "How many objects can be created from one class?", options: ["One", "Two", "Limited", "Multiple"], answerIndex: 3 },
            { question: "Which component contains both data and methods?", options: ["Class", "Loop", "Array", "Package"], answerIndex: 0 },
            { question: "What is the relationship between a class and an object?", options: ["Object is a blueprint of class", "Class is an instance of object", "Object is an instance of class", "Both are identical"], answerIndex: 2 },
            { question: "What will be created by the statement new Employee()?", options: ["Method", "Package", "Object", "Variable"], answerIndex: 2 },
            { question: "Which of the following best describes a class?", options: ["Template", "Memory Location", "Operator", "Function Call"], answerIndex: 0 },
            { question: "Which memory area stores local variables?", options: ["Heap", "Stack", "ROM", "Cache"], answerIndex: 1 },
            { question: "Which memory area stores objects?", options: ["Stack", "Cache", "Heap", "Register"], answerIndex: 2 },
            { question: "What is the output of the following? Student s = new Student();", options: ["Creates a class", "Creates an object reference and object", "Creates only a variable", "Compilation Error"], answerIndex: 1 },
            { question: "Which operator accesses object data members?", options: ["*", "&", ".", "%"], answerIndex: 2 },
            { question: "What is an instance of a class called?", options: ["Method", "Object", "Package", "Constructor"], answerIndex: 1 },
            { question: "A class can contain:", options: ["Fields only", "Methods only", "Fields and Methods", "Packages only"], answerIndex: 2 },
            { question: "Which statement is true?", options: ["Objects define classes", "Classes are instances of objects", "Classes define objects", "Objects define methods"], answerIndex: 2 },
            { question: "Which concept is demonstrated by classes and objects?", options: ["Encapsulation of state and behavior", "Sorting", "Searching", "Threading"], answerIndex: 0 },
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
            { question: "What is Method Overloading?", options: ["Defining multiple methods with different names", "Defining multiple methods with the same name but different parameters", "Defining methods in different classes", "Defining static methods only"], answerIndex: 1 },
            { question: "Method Overloading is an example of:", options: ["Runtime Polymorphism", "Dynamic Binding", "Compile-time Polymorphism", "Inheritance"], answerIndex: 2 },
            { question: "Overloaded methods must differ in:", options: ["Method name", "Return type only", "Parameter list", "Access modifier only"], answerIndex: 2 },
            { question: "Which of the following can overload a method?", options: ["Different number of parameters", "Different parameter types", "Different sequence of parameter types", "All of the above"], answerIndex: 3 },
            { question: "Is changing only the return type sufficient for overloading?", options: ["Yes", "No", "Sometimes", "Only for static methods"], answerIndex: 1 },
            { question: "Overloading is resolved at:", options: ["Runtime", "Execution Time", "Compile Time", "Linking Time"], answerIndex: 2 },
            { question: "Which is a valid overloaded pair?", options: ["add(int a) and add(double a)", "add(int a) and subtract(int a)", "add(int a) and add(int a)", "None"], answerIndex: 0 },
            { question: "What determines which overloaded method is called?", options: ["Return type", "Arguments passed", "Variable name", "Package name"], answerIndex: 1 },
            { question: "Which feature improves code readability using the same method name?", options: ["Inheritance", "Encapsulation", "Overloading", "Abstraction"], answerIndex: 2 },
            { question: "Which parameter list is different?", options: ["add(int) and add(int,int)", "add(int) and add(int)", "add() and add()", "None"], answerIndex: 0 },
            { question: "Can methods with different data types be overloaded?", options: ["Yes", "No", "Only in constructors", "Only in interfaces"], answerIndex: 0 },
            { question: "Which pair demonstrates overloading?", options: ["show(int) and show(double)", "show(int) and display(int)", "show() and show()", "None"], answerIndex: 0 },
            { question: "Method Overloading occurs within:", options: ["Same class", "Different package only", "Database", "JVM memory"], answerIndex: 0 },
            { question: "Which parameter list overloads sum(int a, double b)?", options: ["sum(int a, double b)", "sum(double a, int b)", "sum(int a, double b) only", "None"], answerIndex: 1 },
            { question: "Which is NOT a valid overloading technique?", options: ["Changing parameter count", "Changing parameter types", "Changing parameter sequence", "Changing return type only"], answerIndex: 3 },
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
            simulation: "java-e3-2",
            posttest: [
            { question: "What is the output? void show(int a){} void show(double a){} show(10);", options: ["show(double)", "show(int)", "Error", "Both"], answerIndex: 1 },
            { question: "What is the output? void display(int a){} void display(int a,int b){} display(5,10);", options: ["First method", "Second method", "Error", "None"], answerIndex: 1 },
            { question: "Which concept allows multiple methods with the same name?", options: ["Overriding", "Overloading", "Inheritance", "Encapsulation"], answerIndex: 1 },
            { question: "How many methods named print can exist in a class?", options: ["One", "Two only", "Unlimited if parameter lists differ", "Three only"], answerIndex: 2 },
            { question: "Which is checked by the compiler during overload resolution?", options: ["Return type", "Parameter list", "Package", "Memory location"], answerIndex: 1 },
            { question: "What will happen if two methods differ only in return type?", options: ["Valid overloading", "Runtime error", "Compilation error", "Successful execution"], answerIndex: 2 },
            { question: "Which overloaded method is selected for show(5.5)?", options: ["show(int)", "show(double)", "show(String)", "Error"], answerIndex: 1 },
            { question: "Method Overloading supports:", options: ["Polymorphism", "Searching", "Sorting", "Threading"], answerIndex: 0 },
            { question: "Which statement is true?", options: ["Overloading occurs at runtime", "Overloading occurs at compile time", "Overloading requires inheritance", "Overloading requires interfaces"], answerIndex: 1 },
            { question: "Can constructors be overloaded?", options: ["Yes", "No", "Only once", "Only static constructors"], answerIndex: 0 },
            { question: "Which method call selects sum(int,int)?", options: ["sum(10)", "sum(10,20)", "sum(10.5)", "sum()"], answerIndex: 1 },
            { question: "Overloading improves:", options: ["Code reusability and readability", "Memory consumption", "Execution delay", "Compilation errors"], answerIndex: 0 },
            { question: "Which is resolved by matching argument types?", options: ["Inheritance", "Overloading", "Encapsulation", "Package Import"], answerIndex: 1 },
            { question: "Which pair is overloaded correctly?", options: ["test(int) and test(String)", "test(int) and test(int)", "test() and test()", "None"], answerIndex: 0 },
            { question: "Method Overloading is also known as:", options: ["Dynamic Polymorphism", "Runtime Binding", "Static Polymorphism", "Method Hiding"], answerIndex: 2 },
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
            { question: "What is a constructor in Java?", options: ["A variable", "A special block of code called when an object is created", "A package", "An operator"], answerIndex: 1 },
            { question: "When is a constructor executed?", options: ["During compilation", "When a method is called", "When an object is created", "When a class is imported"], answerIndex: 2 },
            { question: "The name of a constructor must:", options: ["Be different from the class name", "Match the class name exactly", "Start with a capital letter only", "End with Constructor"], answerIndex: 1 },
            { question: "Can a constructor have a return type?", options: ["Yes, int", "Yes, void", "No", "Yes, String"], answerIndex: 2 },
            { question: "Which keyword is commonly used to invoke a constructor?", options: ["create", "class", "object", "new"], answerIndex: 3 },
            { question: "If no constructor is written, Java provides:", options: ["Parameterized constructor", "Abstract constructor", "Default no-argument constructor", "Copy constructor"], answerIndex: 2 },
            { question: "What happens when a custom constructor is defined?", options: ["Default constructor is still generated", "Default constructor is not generated automatically", "Program stops", "Constructors are ignored"], answerIndex: 1 },
            { question: "Which of the following is a valid constructor declaration for class Student?", options: ["void Student()", "int Student()", "Student()", "constructor Student()"], answerIndex: 2 },
            { question: "Constructors are mainly used for:", options: ["Sorting arrays", "Object initialization", "Searching data", "Exception handling"], answerIndex: 1 },
            { question: "How many times is a constructor called for an object?", options: ["Once during creation", "Twice", "Every method call", "Never"], answerIndex: 0 },
            { question: "Which statement creates an object and calls a constructor?", options: ["Student s;", "Student();", "Student s = new Student();", "new;"], answerIndex: 2 },
            { question: "What type of constructor takes no parameters?", options: ["Default constructor", "Parameterized constructor", "Copy constructor", "Static constructor"], answerIndex: 0 },
            { question: "Which of the following is NOT true about constructors?", options: ["Constructor name equals class name", "Constructor has no return type", "Constructor can return int", "Constructor initializes objects"], answerIndex: 2 },
            { question: "What is the purpose of the default constructor?", options: ["Initialize object with default values", "Delete objects", "Create packages", "Handle exceptions"], answerIndex: 0 },
            { question: "Which of the following causes a compilation error?", options: ["Student(){}", "void Student(){}", "Student(int x){}", "Student(String n){}"], answerIndex: 1 },
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
            simulation: "java-e3-3",
            posttest: [
            { question: "Constructors belong to:", options: ["Objects", "Classes", "Packages", "Arrays"], answerIndex: 1 },
            { question: "Can constructors be inherited?", options: ["Yes", "No", "Sometimes", "Only static constructors"], answerIndex: 1 },
            { question: "Which statement is true?", options: ["Constructors are methods with return types", "Constructors initialize objects", "Constructors can be abstract", "Constructors are optional methods"], answerIndex: 1 },
            { question: "What is the output of object creation?", options: ["Method call only", "Constructor invocation and object creation", "Variable declaration only", "Package creation"], answerIndex: 1 },
            { question: "Which memory area stores newly created objects?", options: ["Stack", "Heap", "ROM", "Cache"], answerIndex: 1 },
            { question: "What will happen if a class contains no constructor?", options: ["Compilation error", "Java inserts a default constructor", "Runtime error", "Object creation is impossible"], answerIndex: 1 },
            { question: "Which constructor is automatically generated by the compiler?", options: ["Parameterized constructor", "Copy constructor", "Default constructor", "Static constructor"], answerIndex: 2 },
            { question: "Which keyword allocates memory for an object?", options: ["this", "class", "new", "import"], answerIndex: 2 },
            { question: "What is incorrect in the following code? class Test{ void Test(){} }", options: ["Constructor has return type", "Class name mismatch", "Missing braces", "No error"], answerIndex: 0 },
            { question: "Which of the following is a valid constructor? class Car{ _____ }", options: ["void Car(){}", "int Car(){}", "Car(){}", "return Car(){}"], answerIndex: 2 },
            { question: "Constructors are used to initialize:", options: ["Classes", "Packages", "Objects", "Interfaces"], answerIndex: 2 },
            { question: "A constructor can be called:", options: ["Directly like a method", "Through object creation", "Using import statement", "Using package name"], answerIndex: 1 },
            { question: "Which is not a constructor rule?", options: ["Name must match class name", "No return type allowed", "Can return void", "Called during object creation"], answerIndex: 2 },
            { question: "The compiler-generated constructor is called:", options: ["Static constructor", "Default constructor", "Final constructor", "Copy constructor"], answerIndex: 1 },
            { question: "Which concept is primarily associated with constructors?", options: ["Object Initialization", "Inheritance", "Sorting", "Searching"], answerIndex: 0 },
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
            { question: "What is Constructor Overloading?", options: ["Multiple classes with same name", "Multiple constructors with different parameter lists", "Multiple objects with same values", "Multiple packages"], answerIndex: 1 },
            { question: "Constructor Overloading allows:", options: ["Different ways to initialize objects", "Multiple class names", "Multiple packages", "Multiple return types"], answerIndex: 0 },
            { question: "Overloaded constructors must differ in:", options: ["Class name", "Return type", "Parameter list", "Access modifier only"], answerIndex: 2 },
            { question: "Can constructors have different numbers of parameters?", options: ["Yes", "No", "Only two parameters allowed", "Only one parameter allowed"], answerIndex: 0 },
            { question: "Which of the following demonstrates constructor overloading?", options: ["Point() and Point(int x)", "Point() and Display()", "Point() and Point()", "None"], answerIndex: 0 },
            { question: "Constructor Overloading supports:", options: ["Compile-time polymorphism", "Runtime polymorphism", "Inheritance only", "Abstraction only"], answerIndex: 0 },
            { question: "Which constructor is called? Student s = new Student();", options: ["Parameterized constructor", "No-argument constructor", "Copy constructor", "Static constructor"], answerIndex: 1 },
            { question: "Which constructor is called? Student s = new Student(10);", options: ["No-argument constructor", "Parameterized constructor", "Copy constructor", "Default constructor only"], answerIndex: 1 },
            { question: "Constructors can be overloaded based on:", options: ["Number of parameters", "Type of parameters", "Sequence of parameters", "All of the above"], answerIndex: 3 },
            { question: "What is the main benefit of constructor overloading?", options: ["Different object initialization options", "Faster compilation", "Reduced memory", "Package creation"], answerIndex: 0 },
            { question: "Which pair is correctly overloaded?", options: ["Box() and Box(int l)", "Box() and Box()", "Box(int) and Box(int)", "None"], answerIndex: 0 },
            { question: "Can overloaded constructors have different parameter types?", options: ["Yes", "No", "Only int type", "Only String type"], answerIndex: 0 },
            { question: "Which constructor initializes an object with custom values?", options: ["Default constructor", "Parameterized constructor", "Static constructor", "Final constructor"], answerIndex: 1 },
            { question: "Constructor overloading improves:", options: ["Flexibility", "Memory leaks", "Runtime errors", "Compilation failures"], answerIndex: 0 },
            { question: "Which statement is true?", options: ["Constructors cannot be overloaded", "Constructors can be overloaded like methods", "Constructors require return types", "Constructors must have same parameters"], answerIndex: 1 },
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
            simulation: "java-e3-4",
            posttest: [
            { question: "Which pair is overloaded?", options: ["Demo() and Demo(int a)", "Demo() and Demo()", "Demo(int) and Demo(int)", "None"], answerIndex: 0 },
            { question: "How is constructor overloading resolved?", options: ["Runtime", "Compile time", "Link time", "Execution time only"], answerIndex: 1 },
            { question: "Which constructor is selected depends on:", options: ["Class name", "Arguments supplied", "Package name", "Access modifier"], answerIndex: 1 },
            { question: "A class may have:", options: ["One constructor only", "Two constructors only", "Multiple overloaded constructors", "No constructors ever"], answerIndex: 2 },
            { question: "Constructor overloading supports initialization with:", options: ["Default values", "Custom values", "Different combinations of values", "All of the above"], answerIndex: 3 },
            { question: "Which constructor call matches Point(int x, int y)?", options: ["new Point()", "new Point(5)", "new Point(5,10)", "new Point(\"5\",\"10\")"], answerIndex: 2 },
            { question: "Which constructor call matches Employee(String name)?", options: ["new Employee()", "new Employee(\"John\")", "new Employee(10)", "new Employee(true)"], answerIndex: 1 },
            { question: "Constructor overloading is similar to:", options: ["Method overloading", "Method overriding", "Encapsulation", "Inheritance"], answerIndex: 0 },
            { question: "Which is NOT required for overloading?", options: ["Different parameter count", "Different parameter type", "Different parameter sequence", "Different return type"], answerIndex: 3 },
            { question: "Which constructor is called? Box b = new Box(5.5);", options: ["Box()", "Box(double)", "Box(int)", "Error"], answerIndex: 1 },
            { question: "Constructor overloading allows objects to be:", options: ["Initialized in different ways", "Stored differently", "Deleted automatically", "Compiled faster"], answerIndex: 0 },
            { question: "Which is a valid overloaded constructor set?", options: ["Car() , Car(String name)", "Car() , Car()", "Car(int) , Car(int)", "None"], answerIndex: 0 },
            { question: "Which constructor provides default initialization?", options: ["No-argument constructor", "Parameterized constructor", "Abstract constructor", "Final constructor"], answerIndex: 0 },
            { question: "Constructor overloading increases:", options: ["Object initialization flexibility", "Errors only", "Package size only", "Compilation time only"], answerIndex: 0 },
            { question: "Constructor overloading is an example of:", options: ["Compile-time Polymorphism", "Runtime Polymorphism", "Dynamic Binding", "Inheritance"], answerIndex: 0 },
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
            { question: "What is Inheritance in Java?", options: ["Process of creating objects", "Mechanism to acquire properties and behaviors of another class", "Method of sorting data", "Memory allocation technique"], answerIndex: 1 },
            { question: "Inheritance is a feature of:", options: ["Procedural Programming", "Functional Programming", "Object-Oriented Programming", "Assembly Language"], answerIndex: 2 },
            { question: "Which class inherits properties from another class?", options: ["Parent Class", "Superclass", "Child Class", "Package"], answerIndex: 2 },
            { question: "The class whose properties are inherited is called:", options: ["Child Class", "Subclass", "Derived Class", "Parent Class"], answerIndex: 3 },
            { question: "Which keyword is used for inheritance in Java?", options: ["implements", "inherit", "extends", "super"], answerIndex: 2 },
            { question: "Single Inheritance involves:", options: ["One parent and one child class", "One child and many parents", "Many children and many parents", "Multiple levels of inheritance"], answerIndex: 0 },
            { question: "Inheritance establishes which relationship?", options: ["HAS-A", "USES-A", "IS-A", "PART-OF"], answerIndex: 2 },
            { question: "In the statement class Car extends Vehicle, Vehicle is the:", options: ["Child Class", "Subclass", "Object", "Parent Class"], answerIndex: 3 },
            { question: "In the statement class Car extends Vehicle, Car is the:", options: ["Parent Class", "Superclass", "Child Class", "Interface"], answerIndex: 2 },
            { question: "Which OOP feature promotes code reusability?", options: ["Encapsulation", "Inheritance", "Abstraction", "Polymorphism"], answerIndex: 1 },
            { question: "What is another name for a child class?", options: ["Base Class", "Parent Class", "Superclass", "Subclass"], answerIndex: 3 },
            { question: "What is another name for a parent class?", options: ["Derived Class", "Subclass", "Superclass", "Object Class"], answerIndex: 2 },
            { question: "Which relationship is represented by \"Car IS-A Vehicle\"?", options: ["Aggregation", "Composition", "Inheritance", "Association"], answerIndex: 2 },
            { question: "Which member can be inherited by a child class?", options: ["Fields", "Methods", "State and Behavior", "Packages"], answerIndex: 2 },
            { question: "What is the primary benefit of inheritance?", options: ["Reduces code duplication", "Increases memory usage", "Prevents object creation", "Eliminates methods"], answerIndex: 0 },
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
            simulation: "java-e4-1",
            posttest: [
            { question: "Which class can access inherited public members?", options: ["Child Class", "Package Only", "Interface Only", "Main Method Only"], answerIndex: 0 },
            { question: "Which statement correctly defines inheritance?", options: ["class B inherit A", "class B extends A", "class B implements A", "class B uses A"], answerIndex: 1 },
            { question: "In Single Inheritance, a child class inherits from:", options: ["One parent class", "Two parent classes", "Three parent classes", "Unlimited parent classes"], answerIndex: 0 },
            { question: "What does inheritance help achieve?", options: ["Code Reusability", "Data Duplication", "Memory Leaks", "Compilation Errors"], answerIndex: 0 },
            { question: "Which OOP concept models real-world hierarchical relationships?", options: ["Inheritance", "Looping", "Exception Handling", "Arrays"], answerIndex: 0 },
            { question: "Consider the code: class Animal { } class Dog extends Animal { } Dog is a:", options: ["Superclass", "Parent Class", "Subclass", "Interface"], answerIndex: 2 },
            { question: "Consider the code: class Vehicle { } class Car extends Vehicle { } Vehicle is a:", options: ["Child Class", "Parent Class", "Object", "Method"], answerIndex: 1 },
            { question: "Which of the following is a valid IS-A relationship?", options: ["Engine IS-A Car", "Car IS-A Vehicle", "Student HAS-A Name", "Book HAS-A Author"], answerIndex: 1 },
            { question: "What is inherited from a superclass?", options: ["Data members and methods", "Packages only", "Constructors only", "Import statements"], answerIndex: 0 },
            { question: "Single Inheritance forms a hierarchy with:", options: ["One level of parent-child relationship", "Multiple parents", "Multiple interfaces only", "No relationship"], answerIndex: 0 },
            { question: "Which keyword refers to inheritance in Java syntax?", options: ["this", "super", "extends", "import"], answerIndex: 2 },
            { question: "Inheritance mainly supports:", options: ["Code Reusability", "Database Connectivity", "File Handling", "Multithreading"], answerIndex: 0 },
            { question: "Which class receives inherited members?", options: ["Parent Class", "Child Class", "Package", "Interface"], answerIndex: 1 },
            { question: "What type of inheritance is represented by one parent and one child?", options: ["Multiple Inheritance", "Hierarchical Inheritance", "Multilevel Inheritance", "Single Inheritance"], answerIndex: 3 },
            { question: "Which statement is true regarding Single Inheritance?", options: ["One class inherits from exactly one parent class", "One class inherits from multiple parent classes", "Multiple classes inherit from multiple parents", "No inheritance relationship exists"], answerIndex: 0 },
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
            { question: "What is Multilevel Inheritance?", options: ["One class inherits from multiple classes", "A class extends a subclass", "Multiple classes inherit from one class", "No inheritance relationship exists"], answerIndex: 1 },
            { question: "In Multilevel Inheritance, Class C extends Class B and Class B extends:", options: ["Class D", "Interface A", "Class A", "Object Only"], answerIndex: 2 },
            { question: "Which inheritance chain represents Multilevel Inheritance?", options: ["A \u2192 B, A \u2192 C", "A \u2192 B \u2192 C", "A, B \u2192 C", "A \u2194 B"], answerIndex: 1 },
            { question: "In Multilevel Inheritance, Class C inherits from:", options: ["Class B only", "Class A only", "Both Class A and Class B", "Neither A nor B"], answerIndex: 2 },
            { question: "Which keyword is used for Multilevel Inheritance in Java?", options: ["inherit", "implements", "extends", "super"], answerIndex: 2 },
            { question: "Multilevel Inheritance represents a:", options: ["Circular relation", "Transitive relation", "Parallel relation", "Independent relation"], answerIndex: 1 },
            { question: "If C extends B and B extends A, then C is-a:", options: ["A only", "B only", "A and B", "Neither A nor B"], answerIndex: 2 },
            { question: "What is the topmost class in the chain A \u2192 B \u2192 C?", options: ["B", "C", "A", "Object"], answerIndex: 2 },
            { question: "Which OOP feature is demonstrated by Multilevel Inheritance?", options: ["Code Reusability", "Searching", "Sorting", "Threading"], answerIndex: 0 },
            { question: "Multilevel Inheritance creates:", options: ["A hierarchy of classes", "Multiple objects", "Multiple interfaces", "Packages"], answerIndex: 0 },
            { question: "Consider: class A {} class B extends A {} class C extends B {} Which class directly inherits from A?", options: ["C", "B", "Object", "None"], answerIndex: 1 },
            { question: "Which class indirectly inherits from A?", options: ["B", "C", "Both A and B", "None"], answerIndex: 1 },
            { question: "Multilevel Inheritance allows:", options: ["Reusing inherited members through multiple levels", "Preventing inheritance", "Removing methods", "Avoiding classes"], answerIndex: 0 },
            { question: "In the hierarchy A \u2192 B \u2192 C, methods of A can be accessed by:", options: ["B only", "C only", "Both B and C", "Neither B nor C"], answerIndex: 2 },
            { question: "Which relationship is valid?", options: ["C is-a B", "B is-a A", "C is-a A", "All of the above"], answerIndex: 3 },
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
            simulation: "java-e4-2",
            posttest: [
            { question: "Multilevel Inheritance is achieved by using:", options: ["Multiple extends clauses in one class", "Successive inheritance levels", "Multiple interfaces only", "Packages"], answerIndex: 1 },
            { question: "What is inherited by Class C?", options: ["Members of B", "Members of A", "Members of A and B", "Constructors only"], answerIndex: 2 },
            { question: "Which statement is true?", options: ["C cannot access inherited methods of A", "C indirectly inherits members from A", "B cannot inherit from A", "Multilevel Inheritance is not supported in Java"], answerIndex: 1 },
            { question: "Which inheritance level is represented by Class B?", options: ["Parent and Child", "Root only", "Leaf only", "Interface"], answerIndex: 0 },
            { question: "Multilevel Inheritance mainly improves:", options: ["Code Reusability", "Compilation Time", "Memory Usage", "File Handling"], answerIndex: 0 },
            { question: "If Class A has method show(), which classes can use it?", options: ["A only", "B only", "C only", "A, B, and C"], answerIndex: 3 },
            { question: "Which class is called the grandchild class in A \u2192 B \u2192 C?", options: ["A", "B", "C", "Object"], answerIndex: 2 },
            { question: "In Multilevel Inheritance, inheritance flows:", options: ["Upward only", "Downward through the hierarchy", "Sideways", "Randomly"], answerIndex: 1 },
            { question: "Which statement best describes transitive inheritance?", options: ["Child inherits from parent, and indirectly from ancestor classes", "Child inherits only from direct parent", "Parent inherits from child", "No inheritance exists"], answerIndex: 0 },
            { question: "In A \u2192 B \u2192 C, C inherits data members of:", options: ["A only", "B only", "A and B", "None"], answerIndex: 2 },
            { question: "Which type of inheritance chain is valid in Java?", options: ["A \u2192 B \u2192 C", "A, B \u2192 C", "A \u2194 B", "Multiple class inheritance"], answerIndex: 0 },
            { question: "Which class is the immediate parent of C?", options: ["A", "B", "Object", "Interface"], answerIndex: 1 },
            { question: "Which concept is demonstrated by A \u2192 B \u2192 C?", options: ["Single Inheritance", "Hierarchical Inheritance", "Multilevel Inheritance", "Multiple Inheritance"], answerIndex: 2 },
            { question: "Multilevel Inheritance allows a class to acquire features from:", options: ["One level only", "Multiple ancestor levels", "Interfaces only", "Packages only"], answerIndex: 1 },
            { question: "What is the main advantage of Multilevel Inheritance?", options: ["Reusability across several inheritance levels", "Reduced number of objects", "Faster execution always", "No need for methods"], answerIndex: 0 },
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
            { question: "Which keyword is used to declare an abstract class?", options: ["final", "static", "abstract", "public"], answerIndex: 2 },
            { question: "Can an abstract class be instantiated directly?", options: ["Yes", "No", "Only once", "Only with constructors"], answerIndex: 1 },
            { question: "An abstract method is a method:", options: ["With a body", "Without a body", "With private access", "With static keyword"], answerIndex: 1 },
            { question: "Which class can contain both abstract and concrete methods?", options: ["Interface", "Abstract Class", "Package", "Array"], answerIndex: 1 },
            { question: "What is a concrete method?", options: ["Method without body", "Method with implementation", "Static method only", "Final method only"], answerIndex: 1 },
            { question: "Which statement is true about abstract classes?", options: ["They can be instantiated directly", "They cannot contain methods", "They can contain abstract and concrete methods", "They are interfaces"], answerIndex: 2 },
            { question: "A subclass extending an abstract class must:", options: ["Ignore abstract methods", "Override all abstract methods", "Delete abstract methods", "Use static methods only"], answerIndex: 1 },
            { question: "If a subclass does not override all abstract methods, it must be declared:", options: ["static", "final", "public", "abstract"], answerIndex: 3 },
            { question: "What is the purpose of an abstract class?", options: ["Template for subclasses", "Database connection", "Sorting arrays", "Thread creation"], answerIndex: 0 },
            { question: "Which of the following is valid?", options: ["abstract class Shape", "new Shape()", "abstract variable x", "abstract package"], answerIndex: 0 },
            { question: "Can abstract classes have constructors?", options: ["Yes", "No", "Only private constructors", "Only static constructors"], answerIndex: 0 },
            { question: "Abstract methods must end with:", options: ["{}", ";", "(){}", "return"], answerIndex: 1 },
            { question: "Which class provides partial implementation?", options: ["Interface", "Abstract Class", "Package", "Array"], answerIndex: 1 },
            { question: "What happens if an abstract class contains only concrete methods?", options: ["Invalid class", "Still a valid abstract class", "Compilation error", "Runtime error"], answerIndex: 1 },
            { question: "Which keyword prevents object creation of a class?", options: ["static", "final", "abstract", "private"], answerIndex: 2 },
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
            simulation: "java-e4-3",
            posttest: [
            { question: "What is the output? abstract class A {} A obj = new A();", options: ["Object created", "Compilation Error", "Runtime Error", "No Output"], answerIndex: 1 },
            { question: "Which method declaration is abstract?", options: ["void show(){}", "abstract void show();", "static void show();", "final void show();"], answerIndex: 1 },
            { question: "Which concept is supported by abstract classes?", options: ["Abstraction", "Sorting", "Searching", "File Handling"], answerIndex: 0 },
            { question: "An abstract class may contain:", options: ["Abstract methods only", "Concrete methods only", "Both abstract and concrete methods", "Constructors only"], answerIndex: 2 },
            { question: "Which class can inherit an abstract class?", options: ["Subclass", "Package", "Interface only", "Array"], answerIndex: 0 },
            { question: "What is required before creating objects related to an abstract class?", options: ["Extend it with a concrete subclass", "Import it", "Make it static", "Make it final"], answerIndex: 0 },
            { question: "Which statement about abstract methods is true?", options: ["They have implementations", "They must be overridden by subclasses", "They are always private", "They cannot be inherited"], answerIndex: 1 },
            { question: "Which keyword is mandatory for an abstract method?", options: ["final", "private", "abstract", "static"], answerIndex: 2 },
            { question: "What is the main purpose of abstract methods?", options: ["Provide method templates", "Create objects", "Allocate memory", "Sort data"], answerIndex: 0 },
            { question: "Which class is valid?", options: ["class Test { abstract void show(); }", "abstract class Test { abstract void show(); }", "class Test extends abstract {}", "None"], answerIndex: 1 },
            { question: "Abstract classes are mainly used to:", options: ["Define common behavior templates", "Store arrays", "Improve sorting", "Manage files"], answerIndex: 0 },
            { question: "Which method must be implemented in a concrete subclass?", options: ["Static methods", "Final methods", "Abstract methods", "Private methods"], answerIndex: 2 },
            { question: "Which statement is FALSE?", options: ["Abstract classes can have constructors", "Abstract classes can contain concrete methods", "Abstract classes can be instantiated directly", "Abstract classes support abstraction"], answerIndex: 2 },
            { question: "What happens if all abstract methods are overridden?", options: ["Subclass can become concrete", "Compilation fails", "Object creation is impossible", "Abstract keyword is mandatory"], answerIndex: 0 },
            { question: "Abstract classes help establish:", options: ["Template behaviors for subclasses", "Database tables", "Package hierarchies", "Sorting mechanisms"], answerIndex: 0 },
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
            { question: "What is the super keyword in Java?", options: ["A class", "A method", "A reference variable to the immediate parent class", "A package"], answerIndex: 2 },
            { question: "The super keyword is used to refer to:", options: ["Current class object", "Parent class object", "Interface object", "Package object"], answerIndex: 1 },
            { question: "Which keyword refers to the immediate parent class?", options: ["this", "extends", "super", "parent"], answerIndex: 2 },
            { question: "One use of super is to access:", options: ["Child class variables", "Parent class variables", "Local variables only", "Static blocks only"], answerIndex: 1 },
            { question: "The super keyword helps resolve:", options: ["Compilation errors", "Variable name hiding", "Memory leaks", "Package conflicts"], answerIndex: 1 },
            { question: "Which statement accesses a parent class variable?", options: ["this.x", "super.x", "parent.x", "x.super"], answerIndex: 1 },
            { question: "Which keyword invokes a parent class method?", options: ["this", "super", "static", "final"], answerIndex: 1 },
            { question: "The super keyword can be used inside:", options: ["Child class", "Package only", "Interface only", "Array only"], answerIndex: 0 },
            { question: "Which of the following is a use of super?", options: ["Access parent variables", "Call parent methods", "Call parent constructors", "All of the above"], answerIndex: 3 },
            { question: "Which keyword refers to the current object?", options: ["super", "this", "extends", "final"], answerIndex: 1 },
            { question: "What does super.methodName() do?", options: ["Calls child method", "Calls parent method", "Creates an object", "Calls constructor"], answerIndex: 1 },
            { question: "What does super.variableName access?", options: ["Local variable", "Static variable", "Parent class variable", "Global variable"], answerIndex: 2 },
            { question: "Parent class constructors can be invoked using:", options: ["this()", "constructor()", "super()", "parent()"], answerIndex: 2 },
            { question: "Where must super() appear in a constructor?", options: ["Last line", "Middle line", "Anywhere", "First line"], answerIndex: 3 },
            { question: "Which statement is valid?", options: ["super();", "parent();", "extends();", "base();"], answerIndex: 0 },
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
            simulation: "java-e5-1",
            posttest: [
            { question: "Consider: class A{ int x = 10; } class B extends A{ int x = 20; } Which expression accesses the parent variable x inside class B?", options: ["this.x", "x", "super.x", "parent.x"], answerIndex: 2 },
            { question: "What is the purpose of using super with variables?", options: ["Access child variables", "Resolve variable hiding", "Create objects", "Delete variables"], answerIndex: 1 },
            { question: "Which method is called? super.display();", options: ["Current class display()", "Parent class display()", "Static display()", "Interface display()"], answerIndex: 1 },
            { question: "Which class member can be accessed using super?", options: ["Parent variables", "Parent methods", "Parent constructors", "All of the above"], answerIndex: 3 },
            { question: "The super keyword is associated with:", options: ["Inheritance", "Arrays", "Loops", "Packages"], answerIndex: 0 },
            { question: "What happens if super() is not explicitly written and the parent has a no-argument constructor?", options: ["Compilation error", "Java inserts it automatically", "Constructor is skipped", "Runtime error"], answerIndex: 1 },
            { question: "Which constructor is called by super()?", options: ["Child constructor", "Default constructor of child", "Immediate parent constructor", "Static constructor"], answerIndex: 2 },
            { question: "Which keyword is opposite in purpose to this?", options: ["static", "final", "super", "import"], answerIndex: 2 },
            { question: "Which statement is TRUE?", options: ["super refers to current class", "super refers to immediate parent class", "super refers to all parent classes directly", "super creates objects"], answerIndex: 1 },
            { question: "What is the output? class A{ void show(){ System.out.println(\"Parent\"); } } class B extends A{ void show(){ System.out.println(\"Child\"); } void display(){ super.show(); } }", options: ["Child", "Parent", "Error", "No Output"], answerIndex: 1 },
            { question: "Which statement invokes the parent constructor?", options: ["this();", "constructor();", "super();", "parent();"], answerIndex: 2 },
            { question: "Why is super useful in method overriding?", options: ["Calls overridden parent methods", "Deletes methods", "Creates methods", "Hides methods"], answerIndex: 0 },
            { question: "What happens if super() is not the first statement in a constructor?", options: ["No issue", "Runtime error", "Compilation error", "Warning only"], answerIndex: 2 },
            { question: "Which concept is demonstrated when using super.show() to call a parent method?", options: ["Inheritance", "Encapsulation", "Sorting", "Searching"], answerIndex: 0 },
            { question: "The super keyword can access members of:", options: ["Current class only", "Immediate parent class only", "Any unrelated class", "Interface only"], answerIndex: 1 },
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
            { question: "What is an interface in Java?", options: ["A package", "A blueprint of a class", "An object", "A constructor"], answerIndex: 1 },
            { question: "Which keyword is used to declare an interface?", options: ["class", "abstract", "interface", "implements"], answerIndex: 2 },
            { question: "A class uses which keyword to implement an interface?", options: ["extends", "inherits", "implements", "super"], answerIndex: 2 },
            { question: "Interfaces primarily contain:", options: ["Instance variables only", "Static constants and abstract methods", "Constructors only", "Packages only"], answerIndex: 1 },
            { question: "Which Java version introduced default methods in interfaces?", options: ["Java 5", "Java 6", "Java 7", "Java 8"], answerIndex: 3 },
            { question: "Which Java version introduced private methods in interfaces?", options: ["Java 7", "Java 8", "Java 9", "Java 10"], answerIndex: 2 },
            { question: "Why are interfaces used in Java?", options: ["To achieve multiple inheritance of behavior", "To create arrays", "To perform sorting", "To manage memory"], answerIndex: 0 },
            { question: "Can a class implement multiple interfaces?", options: ["Yes", "No", "Only two", "Only one"], answerIndex: 0 },
            { question: "Which of the following is a valid interface declaration?", options: ["class Demo {}", "interface Demo {}", "abstract Demo {}", "implements Demo {}"], answerIndex: 1 },
            { question: "Which method type can exist in interfaces from Java 8 onward?", options: ["Default methods", "Static methods", "Abstract methods", "All of the above"], answerIndex: 3 },
            { question: "Interface methods without implementation are called:", options: ["Concrete methods", "Abstract methods", "Static methods", "Final methods"], answerIndex: 1 },
            { question: "Which keyword provides implementation inside an interface?", options: ["default", "final", "extends", "this"], answerIndex: 0 },
            { question: "A class implementing an interface must:", options: ["Override interface methods", "Ignore interface methods", "Delete interface methods", "Make all methods static"], answerIndex: 0 },
            { question: "Which statement is true?", options: ["Interfaces can be instantiated directly", "Interfaces contain constructors", "Interfaces support abstraction", "Interfaces cannot have methods"], answerIndex: 2 },
            { question: "What happens if a class does not implement all interface methods?", options: ["Compilation error unless class is abstract", "Runtime error", "Program executes normally", "Methods become optional"], answerIndex: 0 },
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
            simulation: "java-e5-2",
            posttest: [
            { question: "Which keyword is used between a class and interface?", options: ["extends", "implements", "inherit", "super"], answerIndex: 1 },
            { question: "Can interfaces contain static methods?", options: ["Yes", "No", "Only private methods", "Only abstract methods"], answerIndex: 0 },
            { question: "Interfaces help achieve:", options: ["Multiple inheritance of behavior", "Multiple inheritance of classes", "Memory allocation", "Thread synchronization only"], answerIndex: 0 },
            { question: "Which is valid?", options: ["interface A {}", "new A();", "constructor A(){}", "interface methods with bodies only"], answerIndex: 0 },
            { question: "What type of variables exist in interfaces?", options: ["Local variables", "Static constants", "Instance variables", "Dynamic variables"], answerIndex: 1 },
            { question: "Which statement is correct?", options: ["Interfaces can have private methods in Java 9+", "Interfaces cannot have methods", "Interfaces have constructors", "Interfaces can be instantiated"], answerIndex: 0 },
            { question: "Which feature is mainly supported by interfaces?", options: ["Abstraction", "Sorting", "Searching", "File Handling"], answerIndex: 0 },
            { question: "How many interfaces can a class implement?", options: ["One", "Two", "Three", "Multiple"], answerIndex: 3 },
            { question: "Which keyword is associated with interfaces?", options: ["interface", "implements", "Both A and B", "abstract only"], answerIndex: 2 },
            { question: "Interfaces are used to define:", options: ["Contracts for classes", "Memory locations", "Packages", "Variables only"], answerIndex: 0 },
            { question: "What is the purpose of default methods?", options: ["Provide implementation inside interfaces", "Create objects", "Allocate memory", "Delete methods"], answerIndex: 0 },
            { question: "Which statement about interfaces is FALSE?", options: ["Interfaces support abstraction", "Interfaces can achieve multiple inheritance of behavior", "Interfaces can be instantiated directly", "Interfaces contain abstract methods"], answerIndex: 2 },
            { question: "What does a class gain by implementing an interface?", options: ["Method contract to follow", "Memory allocation", "Package inheritance", "Constructor inheritance"], answerIndex: 0 },
            { question: "Interfaces primarily define:", options: ["What a class should do", "How memory is allocated", "How JVM works", "Database tables"], answerIndex: 0 },
            { question: "Which OOP concept is most closely related to interfaces?", options: ["Abstraction", "Sorting", "Searching", "Threading"], answerIndex: 0 },
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
            { question: "What is Runtime Polymorphism also known as?", options: ["Static Binding", "Dynamic Method Dispatch", "Constructor Chaining", "Method Hiding"], answerIndex: 1 },
            { question: "Runtime Polymorphism is resolved at:", options: ["Compile Time", "Design Time", "Runtime", "Link Time"], answerIndex: 2 },
            { question: "Runtime Polymorphism is achieved through:", options: ["Method Overloading", "Method Overriding", "Constructors", "Interfaces only"], answerIndex: 1 },
            { question: "What is Method Overriding?", options: ["Same method in parent and child class with same signature", "Different method names", "Different parameter counts only", "Constructor replacement"], answerIndex: 0 },
            { question: "Which method executes during runtime polymorphism?", options: ["Parent method always", "Child method based on actual object type", "Reference type method", "Static method"], answerIndex: 1 },
            { question: "Runtime Polymorphism depends on:", options: ["Reference variable type only", "Actual object type", "Package name", "Constructor type"], answerIndex: 1 },
            { question: "Which OOP feature allows one interface, multiple forms?", options: ["Encapsulation", "Abstraction", "Polymorphism", "Inheritance only"], answerIndex: 2 },
            { question: "Overridden methods are selected by the JVM at:", options: ["Compile Time", "Runtime", "Editing Time", "Loading Time"], answerIndex: 1 },
            { question: "Method Overriding requires:", options: ["Inheritance", "Arrays", "Packages", "Interfaces only"], answerIndex: 0 },
            { question: "Which method is called? Animal a = new Dog(); a.sound();", options: ["Animal's sound()", "Dog's sound()", "Both methods", "Error"], answerIndex: 1 },
            { question: "Runtime Polymorphism is an example of:", options: ["Dynamic Binding", "Static Binding", "Encapsulation", "Aggregation"], answerIndex: 0 },
            { question: "Which class method overrides another?", options: ["Child Class Method", "Parent Class Method", "Interface Method", "Static Method"], answerIndex: 0 },
            { question: "The reference variable determines:", options: ["Accessible methods", "Actual execution method", "JVM memory", "Constructor type"], answerIndex: 0 },
            { question: "Actual object type determines:", options: ["Method execution at runtime", "Compilation only", "Package structure", "Constructor count"], answerIndex: 0 },
            { question: "Runtime Polymorphism increases:", options: ["Flexibility and extensibility", "Memory usage only", "Compilation errors", "Package dependencies"], answerIndex: 0 },
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
            simulation: "java-e5-3",
            posttest: [
            { question: "Which keyword is commonly used in overriding examples?", options: ["extends", "package", "import", "final only"], answerIndex: 0 },
            { question: "What happens when a child overrides a parent method?", options: ["Parent method is hidden for that object", "Parent class is deleted", "Compilation fails", "JVM crashes"], answerIndex: 0 },
            { question: "Which type of binding occurs in runtime polymorphism?", options: ["Early Binding", "Static Binding", "Dynamic Binding", "Manual Binding"], answerIndex: 2 },
            { question: "Which is true?", options: ["Runtime polymorphism uses overriding", "Runtime polymorphism uses overloading", "Runtime polymorphism uses constructors only", "Runtime polymorphism ignores inheritance"], answerIndex: 0 },
            { question: "What is required for overriding?", options: ["Same method signature", "Different method names", "Different class names", "Multiple constructors"], answerIndex: 0 },
            { question: "Which method executes? Vehicle v = new Car(); v.start();", options: ["Vehicle method based on reference", "Car method based on object", "Both methods", "Error"], answerIndex: 1 },
            { question: "Runtime polymorphism is decided by:", options: ["Compiler", "JVM during execution", "Editor", "User input only"], answerIndex: 1 },
            { question: "Which concept allows different implementations of the same method?", options: ["Polymorphism", "Encapsulation", "Sorting", "Searching"], answerIndex: 0 },
            { question: "Method overriding supports:", options: ["Runtime Polymorphism", "Compile-Time Polymorphism", "Exception Handling", "File Handling"], answerIndex: 0 },
            { question: "Which class method gets priority?", options: ["Parent Method", "Child Overridden Method", "Interface Method", "Static Method"], answerIndex: 1 },
            { question: "Runtime polymorphism requires:", options: ["Inheritance relationship", "Arrays", "Packages", "Threads"], answerIndex: 0 },
            { question: "Which statement is FALSE?", options: ["Runtime polymorphism uses overriding", "Actual object type matters", "Reference type decides execution method", "JVM resolves calls at runtime"], answerIndex: 2 },
            { question: "Dynamic Method Dispatch refers to:", options: ["Runtime method selection", "Constructor invocation", "Package import", "Variable declaration"], answerIndex: 0 },
            { question: "Overridden methods are selected based on:", options: ["Object type", "Variable name", "Package name", "Constructor name"], answerIndex: 0 },
            { question: "Runtime Polymorphism provides:", options: ["Flexibility through dynamic behavior", "Static execution only", "Faster compilation only", "No inheritance support"], answerIndex: 0 },
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
            pretest: [],
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
            simulation: "java-e6-1",
            posttest: [],
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
            pretest: [],
            procedure: [
              "Read the Aim and Theory to understand multiple catch constraints.",
              "Write code causing an array index error inside a try block: `int[] a = new int[5]; a[10] = 50;`.",
              "Provide two catch blocks: `catch(ArithmeticException)` and `catch(ArrayIndexOutOfBoundsException)`.",
              "Observe execution flow skipping the first catch and entering the second catch in the Simulation tab.",
              "Verify catch selection priorities in memory.",
              "Run code in the Code Test tab and check output.",
              "Complete the Posttest."
            ],
            simulation: "java-e6-2",
            posttest: [],
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
            pretest: [],
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
            simulation: "java-e6-3",
            posttest: [],
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
            pretest: [],
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
            simulation: "java-e6-4",
            posttest: [],
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
            pretest: [],
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
            simulation: "java-e7-1",
            posttest: [],
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
            pretest: [],
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
            simulation: "java-e7-2",
            posttest: [],
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
            pretest: [],
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
            simulation: "java-e7-3",
            posttest: [],
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
            pretest: [],
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
            simulation: "java-e7-4",
            posttest: [],
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
            pretest: [],
            procedure: [
              "Read the Aim and Theory to understand Java namespaces.",
              "Declare a class inside package mypack: `package mypack; public class Message { ... }`.",
              "Create main class, import class: `import mypack.Message;`.",
              "Step through import statements in the Simulation tab.",
              "Observe package directory search simulations in memory.",
              "Run and compile in Code Test tab.",
              "Complete the Posttest."
            ],
            simulation: "java-e8-1",
            posttest: [],
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
          expected: "Label text: 'Welcome to JavaFX!'\nImageView displays: 'logo.webp'",
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
            pretest: [],
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
            simulation: "java-e8-2",
            posttest: [],
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
            pretest: [],
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
            simulation: "java-e8-3",
            posttest: [],
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
            pretest: [],
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
            simulation: "java-e9-1",
            posttest: [],
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
            pretest: [],
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
            simulation: "java-e9-2",
            posttest: [],
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
            pretest: [],
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
            simulation: "java-e9-3",
            posttest: [],
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
