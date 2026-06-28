import type { Course } from "./course-data";
import { dsExercise1 } from "./ds-e1";
import { dsExercise2 } from "./ds-e2";
import { dsExercise3 } from "./ds-e3";
import { dsExercise4 } from "./ds-e4";
import { dsExercise5 } from "./ds-e5";
import { dsExercise6 } from "./ds-e6";
import { dsExercise7 } from "./ds-e7";
import { dsExercise8 } from "./ds-e8";
import { dsExercise9 } from "./ds-e9";

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
    "To bridge the gap between theoretical understanding and practical implementation by writing, compiling, and running complete C programs for each core data structure concept."
  ],
  introduction: [
    "Data structures form the backbone of efficient software engineering. Every algorithm that powers modern technology — from search engines and social networks to operating systems and databases — depends fundamentally on how data is organized, stored, and accessed in memory. A strong understanding of data structures is not merely an academic requirement but an essential skill for every practicing software engineer and computer scientist.",
    "The Virtual Data Structures Lab provides a structured, browser-based programming environment where students can implement, visualize, and experiment with fundamental data structures in C without requiring any local software installation or setup.",
    "The lab covers structured exercises spanning linear and non-linear data structures — from array manipulation and searching techniques to linked lists, stacks, queues, binary search trees, and hashing. Each exercise includes a clearly stated objective, theoretical background, step-by-step procedure, an interactive simulation showing data structure state changes visually, a live C code editor powered by a real GCC compiler, and pre-test and post-test assessments for self-evaluation.",
    "Data structures are not just programming constructs — they are problem-solving tools. This lab trains students to think algorithmically, analyze time and space complexity, choose the right data structure for a given problem, and implement clean, efficient C programs that work correctly on real inputs."
  ],
  targetAudience: {
    primary: "Students of Computer Science, Information Technology, and allied engineering disciplines enrolled in Data Structures and Algorithms courses.",
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
      "Faculty members looking for ready-made experiment references aligned to standard data structures curricula.",
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
    dsExercise3,
    dsExercise4,
    dsExercise5,
    dsExercise6,
    dsExercise7,
    dsExercise8,
    dsExercise9
  ],
  shortNotes: `DATA STRUCTURES - SHORT NOTES
(Standard Curriculum)

INTRODUCTION TO DATA STRUCTURES
Data Structures is the study of organizing, managing, and storing data in a computer so that it can be accessed and modified efficiently. Just like we arrange books in a library systematically to find them quickly, data structures help arrange data in memory for fast processing.
Why Data Structures?

Every program deals with data. Without proper organization, even simple operations become slow and complex.
They help in writing efficient algorithms, saving time (time complexity) and memory (space complexity).
Real-world applications like Google Search, social media feeds, GPS navigation, databases — all rely heavily on data structures.

Types of Data Structures:

Linear Data Structures — elements are arranged in a sequential order.
Examples: Arrays, Linked Lists, Stacks, Queues
Non-Linear Data Structures — elements are arranged in a hierarchical or networked manner.
Examples: Trees, Graphs

Abstract Data Type (ADT):
An ADT is a mathematical model of a data structure that defines the data and the operations on that data, without specifying implementation details. For example, a Stack ADT defines push, pop, and peek — but doesn't say whether it's built using an array or a linked list.
Time and Space Complexity:

Time Complexity: How the time taken by an algorithm grows as the input size increases. Expressed using Big O notation — O(1), O(n), O(n²), O(log n), etc.
Space Complexity: How much extra memory an algorithm uses.
Goal is always to write algorithms with lower time and space complexity.


UNIT I — LINEAR DATA STRUCTURES, SEARCHING & SORTING
Searching Techniques:

Linear Search


Searches each element one by one from the beginning.
Works on both sorted and unsorted arrays.
Time Complexity: O(n) in worst case.
Simple but slow for large datasets.


Binary Search


Works only on sorted arrays.
Divides the array in half each time and eliminates one half.
Time Complexity: O(log n) — much faster than linear search.
Steps: Find the middle element. If target = middle, found. If target < middle, search left half. If target > middle, search right half. Repeat.

Sorting Techniques:

Bubble Sort


Repeatedly compares adjacent elements and swaps them if they are in the wrong order.
Largest element "bubbles" to the end in each pass.
Time Complexity: O(n²) — slow for large data.
Simple to understand and implement.


Selection Sort


Finds the minimum element from the unsorted part and places it at the beginning.
Repeat for the remaining unsorted part.
Time Complexity: O(n²).
Performs fewer swaps than bubble sort.


Insertion Sort


Picks each element and inserts it into its correct position in the already sorted part.
Works like sorting playing cards in hand.
Time Complexity: O(n²) worst case, O(n) best case (already sorted).
Efficient for small or nearly sorted datasets.


UNIT II — LINKED LISTS
Introduction:
A Linked List is a linear data structure where elements (called nodes) are not stored in contiguous memory locations. Each node contains Data and a Pointer/Link to the next node.
Types of Linked Lists:

Singly Linked List


Each node has data and a pointer to the next node.
Traversal is only in one direction (forward).
Operations: Insert (at beginning, end, or middle), Delete, Search, Traverse.
Last node points to NULL.


Doubly Linked List


Each node has data, a pointer to the next node, and a pointer to the previous node.
Traversal is possible in both forward and backward directions.
More memory per node, but more flexible operations.


Circular Linked List


Last node points back to the first node instead of NULL.
Can be singly or doubly circular.
Useful for circular/round-robin applications.

Arrays vs Linked Lists:
FeatureArrayLinked ListMemoryContiguousNon-contiguousSizeFixed at creationDynamic (grows/shrinks)AccessO(1) — direct indexingO(n) — must traverseInsert/DeleteSlow — shifting neededFast — just change linksMemory WastePossible (fixed size)Extra memory for pointers
Applications of Linked Lists:

Implementation of Stacks and Queues
Dynamic memory allocation
Polynomial representation
Undo functionality in editors
Browser history (doubly linked list)
Music playlist management


UNIT III — STACKS
Introduction:
A Stack is a linear data structure that follows the LIFO principle — Last In, First Out. Like a stack of plates: you add and remove from the top only.
Properties:

Only the top element is accessible at any time.
Two primary operations: Push (insert) and Pop (remove).

Operations:

Push: Add an element to the top of the stack.
Pop: Remove the top element from the stack.
Peek/Top: View the top element without removing it.
isEmpty: Check if the stack is empty.
isFull: Check if the stack is full (for array implementation).

Implementing Stacks:

Using Arrays — simple, fixed size, fast access.
Using Linked Lists — dynamic size, no overflow issue (until memory is exhausted).

Applications of Stacks:

Expression Evaluation


Infix expressions (A+B) are converted to Postfix (AB+) or Prefix (+AB) using stacks.
Postfix expressions are then evaluated using a stack.


Backtracking


Used in maze solving, game trees, and recursion.
When a path fails, the stack helps go back to the previous state.


Reversing a List


Push all elements onto the stack, then pop them — they come out in reverse order.


Function Call Stack


Every function call is pushed onto the call stack; when a function returns, it's popped off.


Balancing Parentheses


Used by compilers to check if brackets are properly matched.


UNIT IV — QUEUES & DEQUES
Introduction to Queues:
A Queue is a linear data structure that follows the FIFO principle — First In, First Out. Like a line at a ticket counter: first person to join is first to be served.
Properties:

Elements are added from the rear (Enqueue) and removed from the front (Dequeue).
Two ends: Front (removal) and Rear (insertion).

Operations:

Enqueue: Add an element to the rear.
Dequeue: Remove an element from the front.
Peek/Front: View the front element.
isEmpty / isFull: Check queue status.

Implementing Queues:

Using Arrays — simple, but size is fixed; can have the "false full" problem (solved by circular queue).
Using Linked Lists — dynamic, no size restrictions.

Applications of Queues:

Breadth-First Search (BFS) in graphs
CPU Scheduling (round-robin scheduling)
Printer spooling — jobs are printed in the order they arrive
Network packet management
Simulation of real-world waiting lines


Deques (Double-Ended Queues):
Introduction:
A Deque (pronounced "deck") is a linear data structure where insertion and deletion can happen at BOTH ends — front and rear. It is a generalization of both stack and queue.
Types of Deques:

Input Restricted Deque: Insertion only at rear, deletion at both ends.
Output Restricted Deque: Deletion only at front, insertion at both ends.

Operations on Deques:

insertFront: Add element at the front.
insertRear: Add element at the rear.
deleteFront: Remove element from the front.
deleteRear: Remove element from the rear.
getFront / getRear: View front or rear element.
isEmpty / isFull: Check status.

Applications of Deques:

Undo/Redo operations in text editors
Sliding window maximum/minimum problems in algorithms
Palindrome checking
Storing browser forward/backward navigation history
Task scheduling where priority can come from either end


UNIT V — TREES & HASHING
Introduction to Trees:
A Tree is a non-linear, hierarchical data structure consisting of nodes connected by edges. Unlike linear structures, a tree branches out — like a real tree.
Key Terms:

Root: The topmost node (no parent).
Node: Each element in the tree.
Edge: Connection between two nodes.
Parent/Child: A node with branches is a parent; the branches are its children.
Leaf: A node with no children.
Height of Tree: Number of edges on the longest path from root to a leaf.
Depth of a Node: Number of edges from root to that node.

Binary Search Tree (BST):
A Binary Search Tree is a binary tree where:

Each node has at most 2 children (left and right).
Left child < Parent node.
Right child > Parent node.
This property applies to every node in the tree.

BST Operations:

Insertion:


Start at root. If the value to insert < current node, go left; if greater, go right.
Insert at the first NULL position found.
Time Complexity: O(log n) average, O(n) worst case (skewed tree).


Deletion:
Three cases exist:


Node is a leaf: Simply remove it.
Node has one child: Replace the node with its child.
Node has two children: Replace the node with its inorder successor (smallest node in right subtree), then delete the successor.


Traversals:


Inorder (Left → Root → Right): Gives elements in sorted/ascending order.
Preorder (Root → Left → Right): Used to copy a tree.
Postorder (Left → Right → Root): Used to delete a tree.


Hashing:
Introduction:
Hashing is a technique to convert a key (like a name or number) into an index of an array (called a hash table) using a hash function. It enables very fast data retrieval — ideally O(1) time.
Hash Function:
A hash function takes a key and returns an index. A simple example: h(key) = key % table_size.
A good hash function distributes keys uniformly, minimizes collisions, and is fast to compute.
Hash Table:
An array where data is stored at positions computed by the hash function. Each position is called a bucket or slot.
Collision:
When two different keys produce the same hash value (same index), it is called a collision. Collisions are unavoidable and must be handled properly.
Collision Resolution Techniques:

Chaining (Separate Chaining):


Each index in the hash table holds a linked list.
All keys that map to the same index are stored in that list.
Simple and handles unlimited collisions, but requires extra memory for pointers.


Open Addressing:


All elements are stored inside the hash table itself.
When a collision occurs, a different empty slot is found using a probing strategy.

Linear Probing: Check the next slot (index+1, index+2, ...) until an empty slot is found.
Quadratic Probing: Check slots at quadratic intervals (index+1², index+2², ...).
Double Hashing: Use a second hash function to determine the step size.



Applications of Hashing:

Unique Identifier Generation (e.g., user IDs, transaction IDs)
Caching — web browsers, databases cache data using hash tables for fast lookup
Database Indexing — fast record retrieval
Password storage — passwords are stored as hashed values
Compiler Symbol Tables — variable names are stored and looked up using hashing
Sets and Dictionaries in programming languages (Python dict, Java HashMap)`
};
