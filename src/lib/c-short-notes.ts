// CShortNotes.tsx
export const cShortNotes = `C PROGRAMMING - SHORT NOTES
(Standard Curriculum)
INTRODUCTION TO C

C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs in 1972. It is one of the most widely used languages even today, and it forms the foundation for languages like C++, Java, and Python. If you understand C well, picking up almost any other language later becomes much easier — most modern languages borrow C's syntax for loops, conditions, and functions.

Why Learn C? (Beginner's Perspective)

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide">Reason</th><th class="p-3 border border-cyan/20 tracking-wide">What It Means For You</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Close to hardware</td><td class="p-3 border border-cyan/20">You learn how memory and the CPU actually work, not just abstract syntax</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Fast and efficient</td><td class="p-3 border border-cyan/20">Used to build operating systems (Windows, Linux), embedded devices, and compilers</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Foundation language</td><td class="p-3 border border-cyan/20">Concepts like variables, loops, and pointers carry over directly into C++, Java, Python</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Portable</td><td class="p-3 border border-cyan/20">The same C code can run on different machines with little or no change</td></tr></tbody></table>


UNIT I — COMPUTER PROBLEM SOLVING

WHAT IS A PROGRAM AND AN ALGORITHM?

A Program is a set of instructions written in a programming language that a computer executes to perform a specific task.
An Algorithm is a step-by-step procedure or set of rules to solve a problem, written in plain language before any coding begins.

Think of an algorithm as a recipe, and the program as the dish you actually cook using that recipe. Every program is built on top of an underlying algorithm — you plan first, then code.

WHAT DO YOU NEED TO SOLVE A PROBLEM USING A COMPUTER?

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Requirement</th><th class="p-3 border border-cyan/20">Beginner Explanation</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Clear understanding</td><td class="p-3 border border-cyan/20">Know exactly what problem you are solving — vague problems lead to vague code</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Inputs and outputs</td><td class="p-3 border border-cyan/20">What data goes in, and what result should come out</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Logical steps</td><td class="p-3 border border-cyan/20">An algorithm — the ordered list of actions that gets you from input to output</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Language knowledge</td><td class="p-3 border border-cyan/20">Knowing C well enough to translate your algorithm into real code</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Testing ability</td><td class="p-3 border border-cyan/20">Being able to check your program actually gives correct results</td></tr></tbody></table>

PHASES OF PROBLEM SOLVING

1. Problem Definition — understand exactly what needs to be solved.
2. Problem Analysis — identify inputs, outputs, and constraints.
3. Algorithm Design — write step-by-step logic (pseudocode or flowchart).
4. Coding — translate the algorithm into a C program.
5. Testing and Debugging — run the program, find and fix errors.
6. Documentation — write comments and user guides so others (and future-you) understand the code.
7. Maintenance — update the program as requirements change over time.


PROBLEM-SOLVING STRATEGIES

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Strategy</th><th class="p-3 border border-cyan/20">Idea</th><th class="p-3 border border-cyan/20">Simple Example</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Divide and Conquer</td><td class="p-3 border border-cyan/20">Break a big problem into smaller sub-problems, solve each, combine results</td><td class="p-3 border border-cyan/20">Merge sort</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Backtracking</td><td class="p-3 border border-cyan/20">Try a solution; if it fails, go back and try another path</td><td class="p-3 border border-cyan/20">Solving a maze</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Greedy Approach</td><td class="p-3 border border-cyan/20">At each step, pick the best option available right now</td><td class="p-3 border border-cyan/20">Making change with fewest coins</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Dynamic Programming</td><td class="p-3 border border-cyan/20">Break into overlapping sub-problems and store results to avoid recomputation</td><td class="p-3 border border-cyan/20">Fibonacci with memoization</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Brute Force</td><td class="p-3 border border-cyan/20">Try every possible solution and pick the correct one</td><td class="p-3 border border-cyan/20">Trying every password combination</td></tr></tbody></table>

TOP-DOWN APPROACH (STEPWISE REFINEMENT)

Start with the main problem and break it into smaller sub-problems. Each sub-problem is divided further until you reach the smallest, easily solvable units.

Example: To build a calculator —
Step 1: Define the overall structure (take input, process, show output)
Step 2: Design the input module
Step 3: Design the processing module (add, subtract, multiply, divide)
Step 4: Design the output module

GOOD ALGORITHM CHARACTERISTICS

An algorithm must be:
Finite: it must terminate after a limited number of steps.
Definite: each step must be clear and unambiguous.
Input: it should accept zero or more inputs.
Output: it should produce one or more outputs.
Effective: each step must be simple enough to actually be carried out.

Algorithms are usually written first as pseudocode or flowcharts, and only converted into actual C code afterward.

PROGRAM VERIFICATION

Verification means making sure your program produces correct results. It involves:
Desk Checking: Manually tracing through the algorithm with sample data on paper, before even running the code.
Testing: Running the program with various inputs — valid, invalid, and boundary (edge) cases.
Debugging: Finding and fixing logical or runtime errors.

IMPROVING EFFICIENCY (Beginner Tips)

Choose the right data structure for the problem (e.g. array vs linked list).
Use efficient algorithms (e.g., binary search instead of linear search).
Avoid unnecessary computations and redundant loops.
Use memory wisely, avoid unnecessary variables and unnecessary copying of data.

ALGORITHM ANALYSIS AND NOTATIONS

As input size grows, how does your program's running time grow? That's what these notations measure:

Big O Notation O(): Worst-case time complexity. The most commonly used measure.
Big Omega Ω(): Best-case time complexity.
Big Theta Θ(): Average-case time complexity.

Common Complexities — Fastest to Slowest:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Notation</th><th class="p-3 border border-cyan/20">Name</th><th class="p-3 border border-cyan/20">Beginner Example</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(1)</td><td class="p-3 border border-cyan/20">Constant time</td><td class="p-3 border border-cyan/20">Accessing arr[3] directly</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(log n)</td><td class="p-3 border border-cyan/20">Logarithmic time</td><td class="p-3 border border-cyan/20">Binary search</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(n)</td><td class="p-3 border border-cyan/20">Linear time</td><td class="p-3 border border-cyan/20">Linear search through an array</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(n log n)</td><td class="p-3 border border-cyan/20">Linearithmic time</td><td class="p-3 border border-cyan/20">Merge sort</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(n²)</td><td class="p-3 border border-cyan/20">Quadratic time</td><td class="p-3 border border-cyan/20">Bubble sort (nested loops)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(2ⁿ)</td><td class="p-3 border border-cyan/20">Exponential time</td><td class="p-3 border border-cyan/20">Trying all subsets of a set</td></tr></tbody></table>


UNIT II — INTRODUCTION TO C PROGRAMMING

STRUCTURE OF A C PROGRAM
[START_CODE_SNIPPET]
#include <stdio.h>       // Preprocessor directive — includes standard I/O library
int main()               // Main function — execution always starts here
{
    // Statements go here
    printf("Hello");     // Output statement
    return 0;            // Returns 0 to OS indicating successful execution
}
[END_CODE_SNIPPET]

Every C program must have a main() function — this is where execution begins. Preprocessor directives begin with # and are processed before the actual compilation starts.

![Diagram showing the compilation pipeline: source code to preprocessor to compiler to executable](/c_compilation_pipeline.webp)

COMMENTS

Comments are notes in the code that the compiler ignores. They exist purely to help humans (you, your teammates, your future self) understand the logic.

- Single-line comment: // This is a comment
- Multi-line comment: /* This spans multiple lines */

KEYWORDS

Keywords are reserved words with a fixed, predefined meaning in C. You cannot use them as variable names.
Examples: int, float, char, if, else, while, for, return, void, struct, switch, break, continue, do, etc.
C has 32 keywords in total.

IDENTIFIERS

Identifiers are names you give to variables, functions, arrays, etc. Rules:
- Can contain letters (a-z, A-Z), digits (0-9), and underscore (_).
- Must start with a letter or underscore — never with a digit.
- Case-sensitive: age and Age are treated as different identifiers.
- Cannot be a keyword.
- No spaces allowed.

DATA TYPES

A data type defines the kind and size of data a variable can hold.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Type</th><th class="p-3 border border-cyan/20">Size</th><th class="p-3 border border-cyan/20">Range / Example Values</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">int</td><td class="p-3 border border-cyan/20">4 bytes</td><td class="p-3 border border-cyan/20">-2,147,483,648 to 2,147,483,647</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">float</td><td class="p-3 border border-cyan/20">4 bytes</td><td class="p-3 border border-cyan/20">3.14, -2.5 (6-7 decimal digits precision)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">double</td><td class="p-3 border border-cyan/20">8 bytes</td><td class="p-3 border border-cyan/20">3.14159265 (15-16 decimal digits precision)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">char</td><td class="p-3 border border-cyan/20">1 byte</td><td class="p-3 border border-cyan/20">'A', 'z', '5', '$'</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">void</td><td class="p-3 border border-cyan/20">—</td><td class="p-3 border border-cyan/20">No value (used for functions that return nothing)</td></tr></tbody></table>

Modifiers — short, long, signed, unsigned — can be used with int and char to adjust their size or range.

VARIABLES

A variable is a named memory location that stores a value which can change during program execution.

- Declaration: int age;
- Initialization: int age = 20;
- Multiple: int x = 5, y = 10;

A variable must always be declared before it is used.

CONSTANTS

Constants are values that do not change during program execution.

- Literal constant: 10, 3.14, 'A', "Hello"
- Using #define (macro): #define PI 3.14
- Using const keyword: const int MAX = 100;

Constants defined using #define have no type; const constants have a type and are generally safer to use.

INPUT/OUTPUT STATEMENTS

- printf(): Displays formatted output to the screen. Example: printf("Value = %d", x);
- scanf(): Reads formatted input from the keyboard. Example: scanf("%d", &x); — the & is the address-of operator.

Common Format Specifiers:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Specifier</th><th class="p-3 border border-cyan/20">Used For</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">%d</td><td class="p-3 border border-cyan/20">int</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">%f</td><td class="p-3 border border-cyan/20">float</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">%lf</td><td class="p-3 border border-cyan/20">double</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">%c</td><td class="p-3 border border-cyan/20">char</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">%s</td><td class="p-3 border border-cyan/20">string</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">%u</td><td class="p-3 border border-cyan/20">unsigned int</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">%x</td><td class="p-3 border border-cyan/20">hexadecimal</td></tr></tbody></table>

OPERATORS

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Category</th><th class="p-3 border border-cyan/20">Operators</th><th class="p-3 border border-cyan/20">Meaning</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Arithmetic</td><td class="p-3 border border-cyan/20">+  -  *  /  %</td><td class="p-3 border border-cyan/20">add, subtract, multiply, divide, modulus (remainder)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Relational</td><td class="p-3 border border-cyan/20">==  !=  <  >  <=  >=</td><td class="p-3 border border-cyan/20">equal, not equal, less than, greater than, etc.</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Logical</td><td class="p-3 border border-cyan/20">&&  ||  !</td><td class="p-3 border border-cyan/20">AND (both true), OR (at least one true), NOT (reverses)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Assignment</td><td class="p-3 border border-cyan/20">=  +=  -=  *=  /=  %=</td><td class="p-3 border border-cyan/20">assign, add-and-assign, etc.</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Increment/Decrement</td><td class="p-3 border border-cyan/20">++  --</td><td class="p-3 border border-cyan/20">add 1, subtract 1 — can be prefix (++x) or postfix (x++)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Bitwise</td><td class="p-3 border border-cyan/20">&  |  ^  ~  <<  >></td><td class="p-3 border border-cyan/20">AND, OR, XOR, complement, left shift, right shift</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Conditional (Ternary)</td><td class="p-3 border border-cyan/20">condition ? a : b</td><td class="p-3 border border-cyan/20">shorthand for a simple if-else</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">sizeof</td><td class="p-3 border border-cyan/20">sizeof(x)</td><td class="p-3 border border-cyan/20">returns size of a data type/variable in bytes, e.g. sizeof(int) = 4</td></tr></tbody></table>

TYPE CONVERSION

Converting a value from one data type to another.
- Implicit (Automatic): Done automatically by the compiler when mixing types. Example: int + float → result is automatically float.
- Explicit (Type Casting): Done manually by the programmer. Example: (float) 5 / 2 gives 2.5 instead of 2.

CONTROL FLOW

Control flow determines the order in which statements are executed. Without it, a program would just run line by line (sequential execution). Control flow lets your program make decisions and repeat actions.

Conditional Branching Statements:

if statement: runs a block only if condition is true
[START_CODE_SNIPPET]
if (condition) {
    // executes if condition is true
}
[END_CODE_SNIPPET]
if-else: one block if true, another if false
[START_CODE_SNIPPET]
if (condition) {
    // true block
} else {
    // false block
}
[END_CODE_SNIPPET]
if-else-if ladder: multiple conditions checked one by one
[START_CODE_SNIPPET]
if (condition1) {
    // block 1
} else if (condition2) {
    // block 2
} else {
    // default block if none match
}
[END_CODE_SNIPPET]
switch: efficient alternative to a long if-else-if chain
[START_CODE_SNIPPET]
switch (variable) {
    case 1: // statements; break;
    case 2: // statements; break;
    default: // executes if no case matches
}
[END_CODE_SNIPPET]
break exits the switch block. Without break, execution "falls through" into the next case — a very common beginner bug!


LOOP STRUCTURES

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Loop</th><th class="p-3 border border-cyan/20">When To Use</th><th class="p-3 border border-cyan/20">Key Trait</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">while</td><td class="p-3 border border-cyan/20">Unknown number of iterations</td><td class="p-3 border border-cyan/20">Entry-controlled — checks condition before running body</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">do-while</td><td class="p-3 border border-cyan/20">Body must run at least once (e.g. menus)</td><td class="p-3 border border-cyan/20">Exit-controlled — checks condition after running body</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">for</td><td class="p-3 border border-cyan/20">Number of iterations known in advance</td><td class="p-3 border border-cyan/20">Combines initialization, condition, and update in one line</td></tr></tbody></table>
[START_CODE_SNIPPET]
while (condition) {
    // body executes as long as condition is true
}

do {
    // body always executes at least once
} while (condition);

for (int i = 0; i < 5; i++) {
    // body runs 5 times: i = 0,1,2,3,4
}
[END_CODE_SNIPPET]
Nested loops — a loop inside another loop. The inner loop completes all its iterations for every single iteration of the outer loop. Commonly used for patterns, matrices, and tables.

![Visualization of a nested loop printing a triangle pattern, with the outer loop controlling rows and inner loop controlling columns](/nested_loop_pattern.webp)

BREAK, CONTINUE AND GOTO

break: Immediately exits the nearest enclosing loop or switch. Execution continues after the loop.
continue: Skips the rest of the current iteration and jumps straight to the next iteration of the loop.
goto: Transfers control unconditionally to a labeled statement anywhere in the same function.


Use of goto is generally discouraged because it makes code difficult to read, trace, and maintain — it tends to create "spaghetti code."


UNIT III — ARRAYS AND POINTERS

INTRODUCTION TO ARRAYS

An array is a collection of elements of the same data type stored in contiguous (adjacent) memory locations, all under a single variable name. Elements are accessed using an index that starts from 0.

int arr[5];                              // declaration
int arr[5] = {10, 20, 30, 40, 50};        // initialization
// arr[0] = 10, arr[1] = 20, ..., arr[4] = 50

Size: Number of elements = size of array / size of one element.

![Diagram showing an array stored as contiguous memory boxes, each labeled with its index starting from 0](/array_memory_layout.webp)

OPERATIONS ON ARRAYS

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Operation</th><th class="p-3 border border-cyan/20">What It Means</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Traversal</td><td class="p-3 border border-cyan/20">Visit and process each element one by one using a loop</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Insertion</td><td class="p-3 border border-cyan/20">Add an element at a specific position — requires shifting elements</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Deletion</td><td class="p-3 border border-cyan/20">Remove an element — requires shifting remaining elements to fill the gap</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Search</td><td class="p-3 border border-cyan/20">Find an element using linear search or binary search</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Sorting</td><td class="p-3 border border-cyan/20">Arrange elements in ascending or descending order</td></tr></tbody></table>

ARRAYS AS FUNCTION ARGUMENTS

Arrays are passed to functions by reference — only the address of the first element is passed, not a copy. So the function works on the original array directly, and any changes made inside affect the original.

void display(int arr[], int n) { ... }
display(arr, 5);   // function call

TWO-DIMENSIONAL ARRAYS

Arrays organized in rows and columns — like a matrix or table.

int matrix[3][3];                              // declaration
int matrix[2][3] = {{1,2,3},{4,5,6}};          // initialization
// access: matrix[row][col] → matrix[0][1] = 2

Used for: matrix operations, storing tabular data, game boards, image pixels.

![Grid diagram of a 2D array showing rows and columns with matrix[row][col] indexing](/2d_array_grid.webp)

MULTIDIMENSIONAL ARRAYS

Arrays with more than 2 dimensions. C supports any number of dimensions.

int arr[2][3][4];   // 3D array: 2 blocks × 3 rows × 4 columns
// access: arr[block][row][col]

Useful for scientific computations, 3D grids, and video frame sequences.

POINTERS

CONCEPT OF A POINTER

A pointer is a variable that stores the memory address of another variable. Every variable in C occupies some memory location — a pointer simply holds that location's address.

Pointers allow direct memory access and manipulation, and they enable dynamic memory allocation, efficient array handling, and passing variables by reference.

![Diagram of a pointer variable holding the memory address of another variable, with an arrow connecting pointer to the variable it points to](/pointer_concept_diagram.webp)

DECLARING AND USING POINTERS

int x = 10;
int *p;            // p is a pointer to an integer
p = &x;             // p now holds the address of x
printf("%d", *p);   // prints 10 — dereferencing the pointer

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Symbol</th><th class="p-3 border border-cyan/20">Name</th><th class="p-3 border border-cyan/20">Meaning</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">&</td><td class="p-3 border border-cyan/20">Address-of operator</td><td class="p-3 border border-cyan/20">Gives the address of a variable</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">*</td><td class="p-3 border border-cyan/20">Dereference operator</td><td class="p-3 border border-cyan/20">Gives the value stored at the address the pointer holds</td></tr></tbody></table>

*p = 20; changes the value of x to 20 through the pointer — this is the core idea that makes pointers powerful.

POINTER EXPRESSIONS AND ADDRESS ARITHMETIC

Pointers can be incremented or decremented to move through memory.
- p++ moves the pointer forward by sizeof(data_type) bytes.
- For an int pointer (4 bytes): p+1 moves 4 bytes ahead in memory.

This forms the basis for traversing arrays efficiently using pointers.

NULL POINTER

A pointer that points to nothing — assigned the special value NULL (address 0).

int *p = NULL;

Always initialize pointers to NULL if you're not immediately assigning them to a variable. Dereferencing a NULL pointer causes a runtime crash (segmentation fault) — always check if (p != NULL) before dereferencing.

GENERIC POINTER (VOID POINTER)

A pointer that can point to any data type without specifying the type.

void *p;
*(int *)p   // must be cast to the correct type before dereferencing

Returned by dynamic memory allocation functions like malloc and calloc.

POINTERS AS FUNCTION ARGUMENTS (CALL BY REFERENCE)

Passing the address of a variable to a function allows the function to modify the original variable.

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
swap(&x, &y);   // passes addresses of x and y

POINTERS AND ARRAYS

The name of an array is itself a pointer to its first element.

int arr[5] = {1,2,3,4,5};
int *p = arr;        // p points to arr[0]
// *(p+0) = arr[0], *(p+1) = arr[1], and so on

arr[i] and *(arr+i) are equivalent — pointers give you an efficient way to traverse and manipulate arrays.

POINTER TO POINTER

A pointer that stores the address of another pointer. Used in dynamic 2D arrays and functions that need to modify pointer values themselves.

int x = 10;
int *p = &x;
int **pp = &p;    // pp points to p, which points to x
// **pp gives 10 (value of x). *pp gives the address stored in p.

DYNAMIC MEMORY ALLOCATION

Allocating memory at runtime from the heap (not the stack) using functions from <stdlib.h>.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Function</th><th class="p-3 border border-cyan/20">What It Does</th><th class="p-3 border border-cyan/20">Example</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">malloc(size)</td><td class="p-3 border border-cyan/20">Allocates given bytes; content is uninitialized (garbage)</td><td class="p-3 border border-cyan/20">int *p = (int*) malloc(5 * sizeof(int));</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">calloc(n, size)</td><td class="p-3 border border-cyan/20">Allocates n elements; initializes all bytes to zero</td><td class="p-3 border border-cyan/20">int *p = (int*) calloc(5, sizeof(int));</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">realloc(ptr, size)</td><td class="p-3 border border-cyan/20">Resizes a previously allocated memory block</td><td class="p-3 border border-cyan/20">p = (int*) realloc(p, 10 * sizeof(int));</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">free(ptr)</td><td class="p-3 border border-cyan/20">Releases allocated memory back to the system</td><td class="p-3 border border-cyan/20">free(p);</td></tr></tbody></table>

Always free dynamically allocated memory — forgetting to do so causes memory leaks.

DANGLING POINTER

A pointer that still holds an address of memory that has already been freed or is no longer valid.

int *p = (int*) malloc(sizeof(int));
free(p);
// p is now a dangling pointer — using it causes undefined behavior

Fix: After freeing, set p = NULL; to turn it into a null pointer and prevent accidental misuse.

COMMAND LINE ARGUMENTS

Arguments passed to the program when it is launched from the terminal/command line.

int main(int argc, char *argv[]) { ... }

- argc (argument count): Total number of arguments, including the program name.
- argv[] (argument vector): Array of strings — the actual argument values.

Example — running ./program hello 42:
argc = 3, argv[0] = "./program", argv[1] = "hello", argv[2] = "42"


UNIT IV — FUNCTIONS AND STRINGS

INTRODUCTION TO FUNCTIONS

A function is a self-contained, named block of code that performs a specific task. It executes when called, and optionally returns a result.

Benefits of Functions:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Benefit</th><th class="p-3 border border-cyan/20">Why It Matters</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Code reusability</td><td class="p-3 border border-cyan/20">Write once, call it many times from anywhere in the program</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Modularity</td><td class="p-3 border border-cyan/20">Breaks the program into logical, manageable pieces</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Easier debugging</td><td class="p-3 border border-cyan/20">Isolate and fix issues in one function without affecting others</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Readability</td><td class="p-3 border border-cyan/20">Cleaner, organized code structure that is easier to follow</td></tr></tbody></table>

FUNCTION DECLARATION, DEFINITION AND CALL
[START_CODE_SNIPPET]
int add(int a, int b);          // Declaration (prototype) — tells compiler what's coming

int add(int a, int b) {         // Definition — the actual implementation
    return a + b;
}

int result = add(5, 3);         // Call — result = 8
[END_CODE_SNIPPET]
The declaration informs the compiler about the function's name, return type, and parameter types before it is actually defined — it's usually placed before main() or in a header file.


CATEGORIES OF FUNCTIONS

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Category</th><th class="p-3 border border-cyan/20">Example</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">No arguments, no return</td><td class="p-3 border border-cyan/20">void greet() { printf("Hello"); }</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">With arguments, no return</td><td class="p-3 border border-cyan/20">void display(int x) { printf("%d", x); }</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">No arguments, with return</td><td class="p-3 border border-cyan/20">int getValue() { return 42; }</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">With arguments, with return</td><td class="p-3 border border-cyan/20">int add(int a, int b) { return a + b; }</td></tr></tbody></table>

PASSING PARAMETERS: CALL BY VALUE VS CALL BY REFERENCE

[TABLE]:<div class="grid grid-cols-2 gap-6 my-6"><div class="bg-cyan-50 p-5 rounded-xl border border-cyan-200"><h4 class="font-bold text-cyan-800 text-lg mb-3">Call by Value</h4><ul class="list-disc ml-4 space-y-2"><li>A copy of the variable is passed</li><li>Changes inside the function do NOT affect the original</li><li>Safer — original data is protected</li><li>Used by default for normal variables</li></ul></div><div class="bg-blue-50 p-5 rounded-xl border border-blue-200"><h4 class="font-bold text-blue-800 text-lg mb-3">Call by Reference</h4><ul class="list-disc ml-4 space-y-2"><li>The address of the variable is passed (using a pointer)</li><li>Changes inside the function DO affect the original</li><li>Needed when the function must modify caller's data</li><li>Example: swap(&x, &y)</li></ul></div></div>

SCOPE OF VARIABLES

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Type</th><th class="p-3 border border-cyan/20">Where Declared</th><th class="p-3 border border-cyan/20">Lifetime</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Local Variable</td><td class="p-3 border border-cyan/20">Inside a function or block</td><td class="p-3 border border-cyan/20">Created when function is called, destroyed when it returns</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Global Variable</td><td class="p-3 border border-cyan/20">Outside all functions</td><td class="p-3 border border-cyan/20">Exists for the entire duration of the program</td></tr></tbody></table>

VARIABLE STORAGE CLASSES

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Storage Class</th><th class="p-3 border border-cyan/20">What It Does</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">auto</td><td class="p-3 border border-cyan/20">Default storage class for local variables — created and destroyed with the function</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">register</td><td class="p-3 border border-cyan/20">Suggests storing the variable in a CPU register for faster access (compiler may ignore this hint)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">static</td><td class="p-3 border border-cyan/20">Retains its value between multiple function calls; initialized only once</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">extern</td><td class="p-3 border border-cyan/20">Declares a global variable or function that is actually defined in another file</td></tr></tbody></table>

RECURSION

A function that calls itself as part of its own definition. Every recursive function must have:
Base case: A condition where the function stops calling itself (termination condition).
Recursive case: The function calls itself with a smaller/simpler input.
[START_CODE_SNIPPET]
int factorial(int n) {
    if (n == 0) return 1;            // base case
    return n * factorial(n - 1);     // recursive case
}
// factorial(4) = 4 * 3 * 2 * 1 = 24
[END_CODE_SNIPPET]
![Diagram showing the call stack growing for factorial(4) calling factorial(3) calling factorial(2)... down to the base case, then unwinding back up with results](/recursion_call_stack.webp)

Applications: Fibonacci sequence, Tower of Hanoi, tree traversal, merge sort, quicksort.
Note: Recursion uses the call stack. Very deep recursion can cause a stack overflow.

STRINGS

STRING FUNDAMENTALS

A string in C is a sequence of characters stored in a character array, terminated by a null character '\0'. C has no separate string data type — strings are just char arrays.

char name[] = "Hello";
// Stored in memory as: H  e  l  l  o  \0
// Index:                0  1  2  3  4   5

Each character is stored as its ASCII value, and the null terminator '\0' marks the end of the string.

![Diagram of a character array storing "Hello" with each letter in its own memory box, ending in a null terminator box](/string_null_terminator.webp)

STRING LIBRARY FUNCTIONS (string.h)

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Function</th><th class="p-3 border border-cyan/20">What It Does</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">strlen(s)</td><td class="p-3 border border-cyan/20">Returns the length of string s, excluding '\0'</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">strcpy(dest, src)</td><td class="p-3 border border-cyan/20">Copies string src into dest</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">strncpy(dest, src, n)</td><td class="p-3 border border-cyan/20">Copies at most n characters</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">strcat(dest, src)</td><td class="p-3 border border-cyan/20">Appends src to the end of dest</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">strcmp(s1, s2)</td><td class="p-3 border border-cyan/20">Returns 0 if equal, positive if s1 > s2, negative if s1 < s2</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">strchr(s, ch)</td><td class="p-3 border border-cyan/20">Returns pointer to first occurrence of ch in s</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">strstr(s, sub)</td><td class="p-3 border border-cyan/20">Returns pointer to first occurrence of sub in s</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">strupr(s) / strlwr(s)</td><td class="p-3 border border-cyan/20">Converts to uppercase / lowercase (non-standard but widely supported)</td></tr></tbody></table>

STRING PROCESSING WITHOUT LIBRARY FUNCTIONS

Writing custom logic using loops and character-by-character processing helps you understand how strings actually work in memory. For example:
- Finding length: Loop until '\0' is found, counting characters as you go.
- Copying: Copy each character one by one until '\0', then add '\0' to the destination.
- Reversing: Swap characters from both ends, moving toward the center.

POINTERS AND STRINGS

The name of a character array is a pointer to its first character.

char *str = "Hello";
// str points to 'H'. str[0] or *str gives 'H'. str[1] or *(str+1) gives 'e'.

Strings can be passed to functions as char pointers. The function then receives the address of the first character and can traverse the entire string up to '\0'.


UNIT V — STRUCTURES, UNIONS, AND FILES

INTRODUCTION TO STRUCTURES

A structure is a user-defined data type that groups variables of different data types under one name. Unlike arrays (same type only), structures allow mixing different types to represent a real-world entity.
[START_CODE_SNIPPET]
struct Student {
    int roll;
    char name[50];
    float marks;
};

struct Student s1;
s1.roll = 101;
strcpy(s1.name, "Ravi");
s1.marks = 89.5;
[END_CODE_SNIPPET]
Use the dot (.) operator to access members of a structure variable.


NESTED STRUCTURES

A structure that contains another structure as one of its members.
[START_CODE_SNIPPET]
struct Address {
    char city[30];
    int pincode;
};

struct Employee {
    char name[50];
    struct Address addr;   // nested structure
    float salary;
};
// access: emp1.addr.city — use dot operator for each level
[END_CODE_SNIPPET]
ARRAYS OF STRUCTURES

An array where each element is a structure. Used to store and manage multiple records of the same type.
[START_CODE_SNIPPET]
struct Student students[100];
students[0].roll = 1;
students[0].marks = 75.5;
// iterate using a loop to process all records
[END_CODE_SNIPPET]
STRUCTURES AND FUNCTIONS

Structures can be passed to and returned from functions.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Method</th><th class="p-3 border border-cyan/20">Example</th><th class="p-3 border border-cyan/20">Effect</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Pass by value</td><td class="p-3 border border-cyan/20">void display(struct Student s) { printf("%d", s.roll); }</td><td class="p-3 border border-cyan/20">A copy is passed — changes do NOT affect the original</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Pass by pointer</td><td class="p-3 border border-cyan/20">void update(struct Student *s) { s->marks = 90.0; }</td><td class="p-3 border border-cyan/20">Address is passed — changes DO affect the original</td></tr></tbody></table>

Use the dot operator (.) for direct access, and the arrow operator (->) for pointer access.

SELF-REFERENTIAL STRUCTURES

A structure that contains a pointer to its own type as one of its members. This is the foundation for building linked data structures.
[START_CODE_SNIPPET]
struct Node {
    int data;
    struct Node *next;   // pointer to a Node of the same type
};
[END_CODE_SNIPPET]
Used in: linked lists, stacks, queues, trees, and graphs.



UNIONS

A union is similar to a structure, but all members share the same memory location. Only one member holds a valid value at any given time.
[START_CODE_SNIPPET]
union Data {
    int i;
    float f;
    char c;
};
[END_CODE_SNIPPET]
Size of union = size of its largest member (unlike struct, where size = sum of all members).

[TABLE]:<div class="grid grid-cols-2 gap-6 my-6"><div class="bg-cyan-50 p-5 rounded-xl border border-cyan-200"><h4 class="font-bold text-cyan-800 text-lg mb-3">Struct</h4><ul class="list-disc ml-4 space-y-2"><li>Each member gets its own memory</li><li>Size = sum of all member sizes</li><li>All members can hold valid values at once</li><li>Used to represent records (Student, Employee)</li></ul></div><div class="bg-blue-50 p-5 rounded-xl border border-blue-200"><h4 class="font-bold text-blue-800 text-lg mb-3">Union</h4><ul class="list-disc ml-4 space-y-2"><li>All members share the same memory</li><li>Size = size of the largest member</li><li>Only one member valid at a time</li><li>Used in memory-constrained systems, hardware registers, network packet parsing</li></ul></div></div>

ENUMERATED DATA TYPE (enum)

A user-defined data type that assigns meaningful names to integer constants. Makes code more readable and less error-prone.
[START_CODE_SNIPPET]
enum Day {MON, TUE, WED, THU, FRI, SAT, SUN};
enum Day today = WED;
// By default: MON=0, TUE=1, WED=2, etc.

enum Status {FAIL=0, PASS=1, DISTINCTION=2};   // custom values can be assigned
[END_CODE_SNIPPET]
typedef KEYWORD

Creates an alias (alternate name) for an existing data type. Simplifies complex declarations and improves readability.
[START_CODE_SNIPPET]
typedef unsigned int uint;
uint count = 100;

typedef struct Student {
    int roll;
    char name[50];
} Student;

Student s1;   // no need to write "struct Student" every time
[END_CODE_SNIPPET]
BIT FIELDS

Allows allocating a specific number of bits (instead of full bytes) to structure members. Used for memory-efficient storage of small data values like flags and status bits.
[START_CODE_SNIPPET]
struct Flags {
    unsigned int read  : 1;   // 1 bit
    unsigned int write : 1;   // 1 bit
    unsigned int exec  : 1;   // 1 bit
};
[END_CODE_SNIPPET]
Applications: device driver programming, embedded systems, network protocol headers, hardware register mapping.

DATA FILES

INTRODUCTION TO FILES

A file is a collection of data stored permanently on a disk. When a program ends, all variables in memory (RAM) are lost — files allow data to persist between program runs and store large amounts of data beyond memory capacity.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">File Type</th><th class="p-3 border border-cyan/20">Description</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Text Files</td><td class="p-3 border border-cyan/20">Data stored as human-readable ASCII characters; can be opened in any text editor</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Binary Files</td><td class="p-3 border border-cyan/20">Data stored in raw binary format; not human-readable but more compact and faster to read/write</td></tr></tbody></table>

USING FILES IN C

All file operations use a FILE pointer (a predefined structure in stdio.h).

FILE *fp;
fp = fopen("filename.txt", "mode");

Always check if fopen returned NULL (file not found or permission denied), and always close the file after use with fclose(fp);

FILE OPENING MODES

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Mode</th><th class="p-3 border border-cyan/20">Meaning</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">"r"</td><td class="p-3 border border-cyan/20">Open for reading. File must already exist.</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">"w"</td><td class="p-3 border border-cyan/20">Open for writing. Creates new file or overwrites existing.</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">"a"</td><td class="p-3 border border-cyan/20">Open for appending. Creates file if it doesn't exist.</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">"r+"</td><td class="p-3 border border-cyan/20">Open for both reading and writing. File must exist.</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">"w+"</td><td class="p-3 border border-cyan/20">Open for read and write. Overwrites existing file.</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">"a+"</td><td class="p-3 border border-cyan/20">Open for reading and appending.</td></tr></tbody></table>

Add "b" for binary mode: "rb", "wb", "ab"

READING AND WRITING TEXT FILES

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Function</th><th class="p-3 border border-cyan/20">Purpose</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">fscanf(fp, "%d", &x)</td><td class="p-3 border border-cyan/20">Reads formatted data (like scanf but from a file)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">fgets(str, size, fp)</td><td class="p-3 border border-cyan/20">Reads a line of text up to size-1 characters</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">fgetc(fp)</td><td class="p-3 border border-cyan/20">Reads one character at a time; returns EOF when file ends</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">fprintf(fp, "%d %s", x, name)</td><td class="p-3 border border-cyan/20">Writes formatted data (like printf but to a file)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">fputs(str, fp)</td><td class="p-3 border border-cyan/20">Writes a string to a file</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">fputc(ch, fp)</td><td class="p-3 border border-cyan/20">Writes one character to a file</td></tr></tbody></table>
[START_CODE_SNIPPET]
// Reading
FILE *fp = fopen("data.txt", "r");
if (fp != NULL) {
    int x;
    fscanf(fp, "%d", &x);
    fclose(fp);
}

// Writing
FILE *fp = fopen("output.txt", "w");
if (fp != NULL) {
    fprintf(fp, "Roll: %d Name: %s\\n", 101, "Ravi");
    fclose(fp);
}
[END_CODE_SNIPPET]
![Diagram showing a FILE pointer connecting a C program to a text file on disk, with read and write arrows](/file_pointer_diagram.webp)

RANDOM FILE ACCESS

Instead of reading a file only from beginning to end (sequential), random access lets you jump directly to any specific position.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Function</th><th class="p-3 border border-cyan/20">Purpose</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">fseek(fp, offset, origin)</td><td class="p-3 border border-cyan/20">Moves file pointer by offset bytes from origin (SEEK_SET, SEEK_CUR, SEEK_END)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">ftell(fp)</td><td class="p-3 border border-cyan/20">Returns the current byte position of the file pointer from the beginning</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">rewind(fp)</td><td class="p-3 border border-cyan/20">Moves the file pointer back to the very beginning of the file</td></tr></tbody></table>

Random access is especially useful with binary files for direct record access. For example, to read the 5th student record directly:

fseek(fp, 4 * sizeof(struct Student), SEEK_SET);
fread(&s, sizeof(struct Student), 1, fp);
`;