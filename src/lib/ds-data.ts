import type { Course } from "./course-data";
import { dsExercise1 } from "./ds-e1";
import { dsExercise2 } from "./ds-e2";

export const dsCourse: Course = {
  id: "data-structures-using-c-programming",
  title: "Data Structures using C Programming",
  objectives: [
    "To understand the significance of linear data structures including arrays, linked lists, stacks, and queues in problem-solving and to perform basic time and space complexity analysis of operations on these structures.",
    "To create and manage singly linked lists, doubly linked lists, and circular linked lists to efficiently organize and manipulate data, emphasizing dynamic memory allocation and pointer-based implementation in C.",
    "To implement and apply stacks using both array-based and linked list-based approaches to manage program flow and solve classical problems involving postfix expression evaluation, infix to postfix conversion, palindrome checking, and balanced parenthesis validation.",
    "To utilize queues to model real-world scenarios such as printer queue simulation and process scheduling, understand circular queues for efficient memory utilization, and explore double-ended queues for versatile data management.",
    "To impart a foundational understanding of non-linear data structures particularly Binary Search Trees including insertion, deletion, and all standard traversal techniques — inorder, preorder, and postorder.",
    "To explore fundamental hashing concepts including hash functions, collision resolution techniques, and practical applications such as implementing a simple cache using hash tables for fast data retrieval.",
    "To develop the ability to analyze the advantages and trade-offs of different data structures and select the most appropriate structure for a given computational problem.",
    "To bridge the gap between theoretical understanding and practical implementation by writing, compiling, and running complete C programs for each data structure concept covered in the JNTUGV syllabus."
  ],
  introduction: [
    "Data structures form the backbone of efficient software engineering. Every algorithm that powers modern technology — from search engines and social networks to operating systems and databases — depends fundamentally on how data is organized, stored, and accessed in memory. A strong understanding of data structures is not merely an academic requirement but an essential skill for every practicing software engineer and computer scientist.",
    "This Virtual Data Structures Lab is developed for B.Tech students of Computer Science Engineering, Information Technology, and allied branches at Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV). The lab provides a structured, browser-based programming environment where students can implement, visualize, and experiment with fundamental data structures in C without requiring any local software installation or setup.",
    "The lab covers 9 exercises spanning the complete JNTUGV Data Structures Lab syllabus — from array manipulation and searching techniques to linked lists, stacks, queues, binary search trees, and hashing. Each exercise includes a clearly stated objective, theoretical background, step-by-step procedure, an interactive simulation showing data structure state changes visually, a live C code editor powered by a real GCC compiler, and pre-test and post-test assessments for self-evaluation.",
    "Data structures are not just programming constructs — they are problem-solving tools. This lab trains students to think algorithmically, analyze time and space complexity, choose the right data structure for a given problem, and implement clean, efficient C programs that work correctly on real inputs."
  ],
  targetAudience: {
    primary: "B.Tech students of Computer Science Engineering, Information Technology, and all allied branches of Engineering at Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) enrolled in the Data Structures Lab course (Course Code: refer JNTUGV curriculum, Credits: L:0 T:0 P:3 C:1.5).",
    prerequisites: [
      "Students should have completed the C Programming Lab or equivalent course before attempting this lab. Specifically students are expected to be comfortable with the following C concepts before starting:",
      "Pointers and pointer arithmetic",
      "Structures and self-referential structures",
      "Dynamic memory allocation using malloc and free",
      "Functions and recursion",
      "Arrays and strings",
      "Basic control flow constructs"
    ],
    usefulFor: [
      "Second-year students who want to strengthen their data structures foundation before advanced courses in algorithms, database systems, or operating systems.",
      "Students preparing for technical placements and competitive programming where data structures questions are extensively tested.",
      "Students preparing for GATE examinations where data structures carries significant weightage.",
      "Faculty members looking for ready-made experiment references aligned to the JNTUGV Data Structures Lab syllabus.",
      "Self-learners who want a structured compiler-ready environment to practice data structures in C."
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "Computer Science Engineering (CSE), Information Technology (IT), and all allied branches of Engineering",
    course: "Data Structures Lab",
    credits: "L:0 T:0 P:3 C:1.5",
    yearSem: "Second Year, First Semester (typically)",
    branches: "Computer Science Engineering (CSE), Information Technology (IT), and all allied branches of Engineering",
    totalExperiments: "9 Exercises, 25 Individual Programs",
    compiler: "GCC (GNU Compiler Collection) via Wandbox — identical to the compiler used in JNTUGV physical labs",
    units: [
      { unit: "Exercise 1", topics: "Array Manipulation (reverse, linear search, binary search, bubble sort, selection sort, and insertion sort)", weeks: "Week 1" },
      { unit: "Exercise 2", topics: "Singly Linked List Implementation (insertion, deletion, iterative reversal, recursive reversal, traversal, and manipulation)", weeks: "Week 2" },
      { unit: "Exercise 3", topics: "Linked List Applications (duplicate detection and removal, polynomial representation and addition, double-ended queue)", weeks: "Week 3" },
      { unit: "Exercise 4", topics: "Double Linked List Implementation (forward and backward traversal, circular linked list)", weeks: "Week 4" },
      { unit: "Exercise 5", topics: "Stack Operations (array-based, linked list-based, postfix expression evaluation, balanced parenthesis)", weeks: "Week 5" },
      { unit: "Exercise 6", topics: "Queue Operations (array-based, linked list-based, printer queue simulation, circular queue)", weeks: "Week 6" },
      { unit: "Exercise 7", topics: "Stack and Queue Applications (infix to postfix conversion, palindrome checking, symmetry checking)", weeks: "Week 7" },
      { unit: "Exercise 8", topics: "Binary Search Tree (linked list-based BST, traversals: inorder, preorder, postorder)", weeks: "Week 8" },
      { unit: "Exercise 9", topics: "Hashing (collision resolution techniques, simple cache using hash tables)", weeks: "Week 9" }
    ]
  },
  weeks: [
    dsExercise1,
    dsExercise2,
    {
      title: "EXERCISE 3",
      objective: "Linked List Applications including duplicate detection and removal, polynomial representation and addition using linked lists, and double-ended queue implementation as real-world linked list use cases.",
      tutorial: "Tutorial 3: Linked List Applications",
      labTitle: "Lab 3: Linked List Applications",
      experiments: [
        { id: "ds-e3-1", title: "Detect and Remove Duplicates from Linked List", desc: "Find and remove duplicate elements from a linked list.", expected: "List without duplicates" },
        { id: "ds-e3-2", title: "Polynomial Addition using Linked List", desc: "Add two polynomials represented using linked lists.", expected: "Resultant polynomial" },
        { id: "ds-e3-3", title: "Double-Ended Queue (Deque) Implementation", desc: "Implement a Deque using a linked list.", expected: "Deque operations output" }
      ]
    },
    {
      title: "EXERCISE 4",
      objective: "Double Linked List Implementation including doubly linked list operations with forward and backward traversal and circular linked list implementation with insertion, deletion, and traversal.",
      tutorial: "Tutorial 4: Doubly and Circular Linked Lists",
      labTitle: "Lab 4: Double Linked List Implementation",
      experiments: [
        { id: "ds-e4-1", title: "Doubly Linked List Operations", desc: "Implement a doubly linked list with various operations.", expected: "List elements forward and backward" },
        { id: "ds-e4-2", title: "Circular Linked List Operations", desc: "Implement a circular linked list with various operations.", expected: "List elements" }
      ]
    },
    {
      title: "EXERCISE 5",
      objective: "Stack Operations including array-based and linked list-based stack implementation, postfix expression evaluation, and balanced parenthesis checking as classical stack applications.",
      tutorial: "Tutorial 5: Stacks",
      labTitle: "Lab 5: Stack Operations",
      experiments: [
        { id: "ds-e5-1", title: "Stack using Array", desc: "Implement stack operations (push, pop, peek) using an array.", expected: "Stack elements" },
        { id: "ds-e5-2", title: "Stack using Linked List", desc: "Implement stack operations using a linked list.", expected: "Stack elements" },
        { id: "ds-e5-3", title: "Postfix Expression Evaluation", desc: "Evaluate a postfix expression using a stack.", expected: "Evaluated result" },
        { id: "ds-e5-4", title: "Balanced Parenthesis Check", desc: "Check if parentheses in an expression are balanced.", expected: "Balanced / Not Balanced" }
      ]
    },
    {
      title: "EXERCISE 6",
      objective: "Queue Operations including array-based and linked list-based queue implementation, printer queue simulation as a real-world application, and circular queue implementation for memory-efficient operation.",
      tutorial: "Tutorial 6: Queues",
      labTitle: "Lab 6: Queue Operations",
      experiments: [
        { id: "ds-e6-1", title: "Queue using Array", desc: "Implement queue operations (enqueue, dequeue) using an array.", expected: "Queue elements" },
        { id: "ds-e6-2", title: "Queue using Linked List", desc: "Implement queue operations using a linked list.", expected: "Queue elements" },
        { id: "ds-e6-3", title: "Printer Queue Simulation", desc: "Simulate a printer queue using a queue data structure.", expected: "Simulation output" },
        { id: "ds-e6-4", title: "Circular Queue", desc: "Implement a circular queue.", expected: "Queue elements" }
      ]
    },
    {
      title: "EXERCISE 7",
      objective: "Stack and Queue Applications including infix to postfix conversion using stack, palindrome checking, and symmetry checking demonstrating combined stack and queue usage.",
      tutorial: "Tutorial 7: Applications of Stacks and Queues",
      labTitle: "Lab 7: Stack and Queue Applications",
      experiments: [
        { id: "ds-e7-1", title: "Infix to Postfix Conversion", desc: "Convert an infix expression to a postfix expression.", expected: "Postfix expression" },
        { id: "ds-e7-2", title: "Palindrome Check using Stack or Queue", desc: "Check if a string is a palindrome using a stack or queue.", expected: "Is a palindrome / Not a palindrome" },
        { id: "ds-e7-3", title: "Symmetry Check", desc: "Perform a symmetry check.", expected: "Symmetry output" }
      ]
    },
    {
      title: "EXERCISE 8",
      objective: "Binary Search Tree including linked list-based BST implementation with insertion and deletion and all three standard traversals — inorder, preorder, and postorder.",
      tutorial: "Tutorial 8: Trees",
      labTitle: "Lab 8: Binary Search Tree",
      experiments: [
        { id: "ds-e8-1", title: "BST Implementation using Linked List", desc: "Implement a Binary Search Tree with insertion and deletion.", expected: "Tree structure" },
        { id: "ds-e8-2", title: "BST Traversals — Inorder Preorder Postorder", desc: "Implement inorder, preorder, and postorder traversals for a BST.", expected: "Traversal outputs" }
      ]
    },
    {
      title: "EXERCISE 9",
      objective: "Hashing including hash table implementation with collision resolution techniques and a simple cache implementation using hashing for fast data retrieval.",
      tutorial: "Tutorial 9: Hashing",
      labTitle: "Lab 9: Hashing",
      experiments: [
        { id: "ds-e9-1", title: "Hash Table with Collision Resolution", desc: "Implement a hash table with collision resolution (e.g., chaining or open addressing).", expected: "Hash table contents" },
        { id: "ds-e9-2", title: "Simple Cache using Hashing", desc: "Implement a simple cache mechanism using hashing.", expected: "Cache hit/miss output" }
      ]
    }
  ]
};
