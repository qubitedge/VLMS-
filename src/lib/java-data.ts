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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
            pretest: [],
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
            posttest: [],
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
