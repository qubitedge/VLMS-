export const cShortNotes = `C PROGRAMMING - SHORT NOTES
(As per JNTUGV Syllabus)

INTRODUCTION
C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs in 1972. It is one of the most widely used programming languages even today, serving as the foundation for languages like C++, Java, and Python.
Why Learn C?

C is close to hardware — gives direct control over memory and system resources.
Fast and efficient — used in operating systems, embedded systems, and compilers.
Foundation language — understanding C makes learning any other language easier.
Portable — C programs can run on different machines with minimal changes.

UNIT I — COMPUTER PROBLEM SOLVING
Programs and Algorithms:
A Program is a set of instructions written in a programming language that a computer executes to perform a specific task. An Algorithm is a step-by-step procedure or set of rules to solve a problem, written in plain language before coding. Every program is based on an underlying algorithm.
Computer Problem-Solving Requirements:
To solve a problem using a computer, you need:

A clear understanding of the problem.
Identified input data and expected output.
A logical sequence of steps (algorithm).
Knowledge of the programming language to implement the solution.
Ability to test and verify the solution.

Phases of Problem Solving:

Problem Definition — understand exactly what needs to be solved.
Problem Analysis — identify inputs, outputs, and constraints.
Algorithm Design — write step-by-step logic.
Coding — translate the algorithm into a program.
Testing and Debugging — run the program, find and fix errors.
Documentation — write comments and user guides.
Maintenance — update the program as requirements change.

Problem-Solving Strategies:

Divide and Conquer: Break a large problem into smaller sub-problems, solve each, then combine results.
Backtracking: Try a solution; if it fails, go back and try another path.
Greedy Approach: At each step, choose the best available option.
Dynamic Programming: Solve complex problems by breaking them into overlapping sub-problems and storing results.
Brute Force: Try all possible solutions and pick the correct one.

Top-Down Approach:
Start with the main problem and break it into smaller sub-problems. Each sub-problem is further divided until the smallest solvable units are reached. This is also called Stepwise Refinement.
Example: To build a calculator, first define the overall structure, then design input, processing, and output modules separately.
Algorithm Designing:
An algorithm must be:

Finite — must terminate after a limited number of steps.
Definite — each step must be clear and unambiguous.
Input — has zero or more inputs.
Output — has one or more outputs.
Effective — each step must be simple enough to be carried out.

Algorithms are expressed using pseudocode or flowcharts before coding.
Program Verification:
Ensuring a program produces correct results. This involves:

Desk Checking: Manually tracing through the algorithm with sample data.
Testing: Running the program with various inputs (valid, invalid, boundary cases).
Debugging: Finding and fixing logical or runtime errors.

Improving Efficiency:

Choose the right data structure for the problem.
Use efficient algorithms (e.g., binary search instead of linear search).
Avoid unnecessary computations and redundant loops.
Use memory wisely — avoid unnecessary variables and data copies.

Algorithm Analysis and Notations:
The efficiency of an algorithm is measured in terms of time and space usage as input size grows.

Big O Notation O(): Worst-case time complexity. Most commonly used.
Big Omega Ω(): Best-case time complexity.
Big Theta Θ(): Average-case time complexity.

Common complexities from fastest to slowest:
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n)
O(1) = constant time (e.g., accessing an array element)
O(n) = linear time (e.g., linear search)
O(log n) = logarithmic time (e.g., binary search)
O(n²) = quadratic time (e.g., bubble sort)

UNIT II — INTRODUCTION TO C PROGRAMMING
Structure of a C Program:
#include <stdio.h>       // Preprocessor directive — includes standard I/O library
int main()               // Main function — execution always starts here
{
// Statements go here
printf("Hello");     // Output statement
return 0;            // Returns 0 to OS indicating successful execution
}
Every C program must have a main() function. Preprocessor directives begin with # and are processed before compilation.
Comments:
Comments are notes in the code that are ignored by the compiler. Used to explain logic and improve readability.

Single-line comment: // This is a comment
Multi-line comment: /* This spans multiple lines */

Keywords:
Reserved words with fixed, predefined meaning in C. Cannot be used as variable names or identifiers.
Examples: int, float, char, if, else, while, for, return, void, struct, switch, break, continue, do, etc.
C has 32 keywords in total.
Identifiers:
Names given to variables, functions, arrays, etc., by the programmer. Rules:

Can contain letters (a-z, A-Z), digits (0-9), and underscore (_).
Must start with a letter or underscore — not a digit.
Case-sensitive: age and Age are different identifiers.
Cannot be a keyword.
No spaces allowed.

Data Types:
Defines the type and size of data a variable can hold.
TypeSizeRange / Example Valuesint4 bytes-2,147,483,648 to 2,147,483,647float4 bytes3.14, -2.5 (6-7 decimal digits)double8 bytes3.14159265 (15-16 decimal digits)char1 byte'A', 'z', '5', '$'void—No value (used for functions)
Modifiers: short, long, signed, unsigned can be used with int and char.
Variables:
A variable is a named memory location that stores a value which can change during program execution.

Declaration: int age;
Initialization: int age = 20;
Multiple: int x = 5, y = 10;
A variable must be declared before use.

Constants:
Values that do not change during program execution.

Literal constant: 10, 3.14, 'A', "Hello"
Using #define (macro): #define PI 3.14
Using const keyword: const int MAX = 100;
Constants defined using #define have no type; const constants have a type and are safer.

Input/Output Statements:

printf(): Displays formatted output to the screen.
Example: printf("Value = %d", x);
scanf(): Reads formatted input from the keyboard.
Example: scanf("%d", &x);  — & is the address-of operator

Common format specifiers:
%d = int, %f = float, %lf = double, %c = char, %s = string, %u = unsigned int, %x = hexadecimal
Operators:

Arithmetic: + (add), - (subtract), * (multiply), / (divide), % (modulus/remainder)
Relational: == (equal), != (not equal), < (less than), > (greater than), <= , >=
Logical: && (AND — both true), || (OR — at least one true), ! (NOT — reverses)
Assignment: = (assign), += (add and assign), -= , *= , /= , %=
Increment/Decrement: ++ (add 1), -- (subtract 1); can be prefix (++x) or postfix (x++)
Bitwise: & (AND), | (OR), ^ (XOR), ~ (complement), << (left shift), >> (right shift)
Conditional/Ternary: condition ? value_if_true : value_if_false
sizeof: Returns size of a data type or variable in bytes. Example: sizeof(int) = 4

Type Conversion:
Converting a value from one data type to another.

Implicit (Automatic): Done automatically by the compiler when mixing types.
Example: int + float → result is automatically float.
Explicit (Type Casting): Done manually by the programmer.
Example: (float) 5 / 2 → gives 2.5 instead of 2.

Control Flow:
Control flow determines the order in which statements are executed. Without it, programs run line by line (sequential). Control flow enables decisions and repetition.
Conditional Branching Statements:

if statement — executes a block only if condition is true.
if (condition) {
// executes if condition is true
}
if-else statement — executes one block if true, another if false.
if (condition) {
// true block
} else {
// false block
}
if-else-if ladder — multiple conditions checked one by one.
if (condition1) {
// block 1
} else if (condition2) {
// block 2
} else {
// default block if none match
}
switch statement — efficient alternative to long if-else-if chains; compares one variable against multiple constant values.
switch (variable) {
case 1: // statements; break;
case 2: // statements; break;
default: // executes if no case matches
}
break exits the switch block. Without break, execution falls through to the next case.

Basic Loop Structures:

while loop — entry-controlled; checks condition before executing body.
while (condition) {
// body executes as long as condition is true
}
do-while loop — exit-controlled; body executes at least once, condition checked after.
do {
// body always executes at least once
} while (condition);
for loop — used when number of iterations is known in advance.
for (initialization; condition; update) {
// body
}
Example: for (int i = 0; i < 5; i++) { ... }
Nested loops — a loop inside another loop. The inner loop completes all its iterations for each single iteration of the outer loop. Used for patterns, matrices, tables.

Break and Continue Statements:

break: Immediately terminates and exits the nearest enclosing loop or switch. Execution continues after the loop.
continue: Skips the remaining statements in the current iteration and jumps to the next iteration of the loop.

goto Statement:
Transfers program control unconditionally to a labeled statement anywhere in the same function.
goto label_name;
...
label_name: // statement to jump to
Use of goto is generally discouraged as it makes code difficult to read, trace, and maintain (creates "spaghetti code").

UNIT III — ARRAYS AND POINTERS
Introduction to Arrays:
An array is a collection of elements of the same data type stored in contiguous (adjacent) memory locations, all under a single variable name. Elements are accessed using an index starting from 0.
Declaration: int arr[5];
Initialization: int arr[5] = {10, 20, 30, 40, 50};
Access: arr[0] = 10, arr[1] = 20, ..., arr[4] = 50
Size: Number of elements = size of array / size of one element.
Operations on Arrays:

Traversal: Visit and process each element one by one using a loop.
Insertion: Add an element at a specific position — requires shifting elements.
Deletion: Remove an element — requires shifting remaining elements to fill the gap.
Search: Find an element using linear search or binary search.
Sorting: Arrange elements in ascending or descending order.

Arrays as Function Arguments:
Arrays are passed to functions by reference — the address of the first element is passed. The function works on the original array, not a copy.
void display(int arr[], int n) { ... }
Function call: display(arr, 5);
Changes made inside the function affect the original array.
Two-Dimensional Arrays:
Arrays organized in rows and columns — like a matrix or table.
Declaration: int matrix[3][3];
Initialization: int matrix[2][3] = {{1,2,3},{4,5,6}};
Access: matrix[row][col] — matrix[0][1] = 2
Used for: Matrix operations, storing tabular data, game boards, image pixels.
Multidimensional Arrays:
Arrays with more than 2 dimensions. C supports any number of dimensions.
Example: int arr[2][3][4]; — a 3D array (2 blocks × 3 rows × 4 columns)
Access: arr[block][row][col]
Useful for scientific computations, 3D grids, video frame sequences.

Pointers:
Concept of a Pointer:
A pointer is a variable that stores the memory address of another variable. Every variable in C occupies some memory location — a pointer holds that location's address.

Pointers allow direct memory access and manipulation.
They enable dynamic memory allocation, efficient array handling, and passing variables by reference.

Declaring and Initializing Pointer Variables:
int x = 10;
int *p;        // p is a pointer to an integer
p = &x;        // p now holds the address of x
printf("%d", *p);  // prints 10 — dereferencing the pointer
& = Address-of operator: gives the address of a variable.

= Dereference operator: gives the value stored at the address the pointer holds.
*p = 20; changes the value of x to 20 through the pointer.

Pointer Expressions and Address Arithmetic:
Pointers can be incremented or decremented to move through memory.
p++ moves the pointer forward by sizeof(data_type) bytes.
For an int pointer (4 bytes): p+1 moves 4 bytes ahead in memory.
This forms the basis for traversing arrays using pointers efficiently.
Null Pointer:
A pointer that points to nothing — assigned the special value NULL (address 0).
int *p = NULL;
Always initialize pointers to NULL if not immediately assigned to a variable. Dereferencing a NULL pointer causes a runtime crash (segmentation fault). Check if(p != NULL) before dereferencing.
Generic Pointer (void pointer):
A pointer that can point to any data type without specifying the type.
void *p;
Must be cast to the correct type before dereferencing: *(int )p
Returned by dynamic memory allocation functions (malloc, calloc return void).
Pointers as Function Arguments:
Passing the address of a variable to a function allows the function to modify the original variable — this is call by reference.
void swap(int *a, int *b) {
int temp = *a;
*a = *b;
*b = temp;
}
Call: swap(&x, &y); — passes addresses of x and y.
Pointers and Arrays:
The name of an array is itself a pointer to its first element.
int arr[5] = {1,2,3,4,5};
int *p = arr;       // p points to arr[0]
*(p+0) = arr[0], *(p+1) = arr[1], and so on.
arr[i] and *(arr+i) are equivalent. Pointers provide an efficient way to traverse and manipulate arrays.
Pointer to Pointer:
A pointer that stores the address of another pointer. Used in dynamic 2D arrays and functions that need to modify pointer values.
int x = 10;
int *p = &x;
int **pp = &p;   // pp points to p, which points to x
**pp gives 10 (value of x). *pp gives the address stored in p.
Dynamic Memory Allocation:
Allocating memory at runtime from the heap (not the stack) using standard library functions in <stdlib.h>.

malloc(size): Allocates specified number of bytes. Memory content is uninitialized (garbage). Returns void*.
int p = (int) malloc(5 * sizeof(int));
calloc(n, size): Allocates memory for n elements of given size. Initializes all bytes to zero.
int p = (int) calloc(5, sizeof(int));
realloc(ptr, new_size): Resizes previously allocated memory block.
p = (int*) realloc(p, 10 * sizeof(int));
free(ptr): Releases allocated memory back to the system.
free(p);
Always free dynamically allocated memory to prevent memory leaks.

Dangling Pointer:
A pointer that still holds an address of memory that has already been freed or is no longer valid.
int p = (int) malloc(sizeof(int));
free(p);
// p is now a dangling pointer — using it causes undefined behavior
Fix: After freeing, set p = NULL to make it a null pointer and prevent accidental misuse.
Command Line Arguments:
Arguments passed to the program when it is launched from the terminal/command line.
int main(int argc, char *argv[]) { ... }

argc (argument count): Total number of arguments including the program name.
argv[] (argument vector): Array of strings — the actual argument values.
Example: Running ./program hello 42
argc = 3
argv[0] = "./program"
argv[1] = "hello"
argv[2] = "42"

UNIT IV — FUNCTIONS AND STRINGS
Introduction to Functions:
A function is a self-contained, named block of code that performs a specific task. It executes when called and optionally returns a result.
Benefits of Functions:

Code reusability — write once, call multiple times from anywhere.
Modularity — breaks program into logical, manageable pieces.
Easier debugging — isolate and fix issues in one function without affecting others.
Readability — cleaner, organized code structure.

Function Declaration (Prototype):
Informs the compiler about the function's name, return type, and parameter types before it is defined. Placed before main() or in a header file.
int add(int a, int b);
Function Definition:
The actual implementation of the function containing its logic.
int add(int a, int b) {
return a + b;
}
Function Call:
Invoking the function to execute its code. Program control jumps to the function and returns after execution.
int result = add(5, 3);   // result = 8
Categories of Functions:

No arguments, no return value: void greet() { printf("Hello"); }
With arguments, no return value: void display(int x) { printf("%d", x); }
No arguments, with return value: int getValue() { return 42; }
With arguments, with return value: int add(int a, int b) { return a + b; }

Passing Parameters to Functions:

Call by Value: A copy of the variable is passed to the function. Changes inside the function do not affect the original variable in the caller.
Call by Reference: The address of the variable is passed using a pointer. Changes inside the function directly affect the original variable.

Scope of Variables:

Local Variable: Declared inside a function or block. Accessible only within that function/block. Created when the function is called, destroyed when it returns.
Global Variable: Declared outside all functions. Accessible from any function in the entire program. Exists for the entire duration of the program.

Variable Storage Classes:
Defines the lifetime, visibility, and default initial value of a variable.

auto: Default storage class for local variables. Created when function starts, destroyed when it ends.
register: Suggests storing the variable in a CPU register for faster access. Used for loop counters or frequently accessed variables. Compiler may ignore this hint.
static: Retains its value between multiple function calls. Initialized only once. Remains in memory throughout program execution.
extern: Used to declare a global variable or function defined in another file. Tells the compiler the variable exists somewhere else.

Recursion:
A function that calls itself as part of its own definition. Every recursive function must have:

Base case: A condition where the function stops calling itself (termination condition).
Recursive case: The function calls itself with a smaller/simpler input.

Example — Factorial:
int factorial(int n) {
if (n == 0) return 1;           // base case
return n * factorial(n - 1);    // recursive case
}
factorial(4) = 4 * 3 * 2 * 1 = 24
Applications: Fibonacci sequence, Tower of Hanoi, tree traversal, merge sort, quicksort.
Note: Recursion uses the call stack. Very deep recursion can cause stack overflow.

Strings:
String Fundamentals:
A string in C is a sequence of characters stored in a character array, terminated by a null character '\\0'. C has no separate string data type — strings are char arrays.
char name[] = "Hello";
Stored in memory as: H  e  l  l  o  \\0
Index:               0  1  2  3  4   5
Each character is stored as its ASCII value. The null terminator '\\0' marks the end of the string.
String Processing with Library Functions (include string.h):

strlen(s): Returns the length of string s excluding '\\0'.
strcpy(dest, src): Copies string src into dest.
strncpy(dest, src, n): Copies at most n characters.
strcat(dest, src): Appends src to the end of dest.
strcmp(s1, s2): Compares s1 and s2. Returns 0 if equal, positive if s1 > s2, negative if s1 < s2.
strchr(s, ch): Returns pointer to first occurrence of ch in s.
strstr(s, sub): Returns pointer to first occurrence of sub in s.
strupr(s) / strlwr(s): Converts to uppercase or lowercase (non-standard but widely supported).

String Processing without Library Functions:
Writing custom logic using loops and character-by-character processing. For example:

Finding length: Loop until '\\0' is found, counting characters.
Copying: Copy each character one by one until '\\0', then add '\\0' to destination.
Reversing: Swap characters from both ends moving toward the center.
This helps understand how strings work internally at the memory level.

Pointers and Strings:
The name of a character array is a pointer to its first character.
char *str = "Hello";
str points to 'H'. str[0] or *str gives 'H'. str[1] or (str+1) gives 'e'.
Strings can be passed to functions as char pointers. When passed, the function receives the address of the first character and can traverse the entire string up to '\\0'.

UNIT V — STRUCTURES, UNIONS, AND FILES
Introduction to Structures:
A structure is a user-defined data type that groups variables of different data types under one name. Unlike arrays (same type only), structures allow mixing different types to represent a real-world entity.
struct Student {
int roll;
char name[50];
float marks;
};
struct Student s1;
s1.roll = 101;
strcpy(s1.name, "Ravi");
s1.marks = 89.5;
Use the dot (.) operator to access members of a structure variable.
Nested Structures:
A structure that contains another structure as one of its members.
struct Address {
char city[30];
int pincode;
};
struct Employee {
char name[50];
struct Address addr;  // nested structure
float salary;
};
Access: emp1.addr.city — use dot operator for each level.
Arrays of Structures:
An array where each element is a structure. Used to store and manage multiple records of the same type.
struct Student students[100];
students[0].roll = 1;
students[0].marks = 75.5;
Iterate using a loop to process all records.
Structures and Functions:
Structures can be passed to and returned from functions.

Pass by value: A copy of the structure is passed. Changes do not affect original.
void display(struct Student s) { printf("%d", s.roll); }
Pass by pointer: Address is passed. Changes affect the original.
void update(struct Student *s) { s->marks = 90.0; }
Use dot operator (.) for direct access and arrow operator (->) for pointer access.

Self-Referential Structures:
A structure that contains a pointer to its own type as one of its members. This is the foundation for building linked data structures.
struct Node {
int data;
struct Node *next;  // pointer to a Node of the same type
};
Used in: Linked lists, stacks, queues, trees, and graphs.
Unions:
A union is similar to a structure but all members share the same memory location. Only one member holds a valid value at any given time.
union Data {
int i;
float f;
char c;
};
Size of union = size of its largest member (unlike struct where size = sum of all members).
Useful in memory-constrained systems and when only one field is active at a time (e.g., network packet parsing, hardware registers).
Enumerated Data Type (enum):
A user-defined data type that assigns meaningful names to integer constants. Makes code more readable and less error-prone.
enum Day {MON, TUE, WED, THU, FRI, SAT, SUN};
enum Day today = WED;
By default: MON=0, TUE=1, WED=2, etc. Custom values can be assigned:
enum Status {FAIL=0, PASS=1, DISTINCTION=2};
typedef Keyword:
Creates an alias (alternate name) for an existing data type. Simplifies complex declarations and improves code readability.
typedef unsigned int uint;
uint count = 100;
typedef struct Student {
int roll;
char name[50];
} Student;
Student s1;   // no need to write "struct Student" every time
Bit Fields:
Allows allocating a specific number of bits (instead of full bytes) to structure members. Used for memory-efficient storage of small data values like flags and status bits.
struct Flags {
unsigned int read  : 1;   // 1 bit
unsigned int write : 1;   // 1 bit
unsigned int exec  : 1;   // 1 bit
};
Applications: Device driver programming, embedded systems, network protocol headers, hardware register mapping.

Data Files:
Introduction to Files:
A file is a collection of data stored permanently on a disk. When a program ends, all variables in memory (RAM) are lost. Files allow data to persist between program runs and store large amounts of data beyond memory capacity.
Types of Files in C:

Text Files: Data stored as human-readable ASCII characters. Can be opened and viewed in any text editor.
Binary Files: Data stored in binary format (raw bytes). Not human-readable but more compact and faster to read/write.

Using Files in C:
All file operations use a FILE pointer (a predefined structure in stdio.h).
FILE *fp;
fp = fopen("filename.txt", "mode");
Always check if fopen returned NULL (file not found or permission denied).
Always close the file after use: fclose(fp);
File opening modes:
ModeMeaning"r"Open for reading. File must already exist."w"Open for writing. Creates new file or overwrites existing."a"Open for appending. Creates file if it doesn't exist."r+"Open for both reading and writing. File must exist."w+"Open for read and write. Overwrites existing file."a+"Open for reading and appending.Add "b" for binary mode: "rb", "wb", "ab"
Reading from Text Files:

fscanf(fp, "%d", &x): Reads formatted data (like scanf but from file).
fgets(str, size, fp): Reads a line of text up to size-1 characters.
fgetc(fp): Reads one character at a time. Returns EOF when file ends.

Example:
FILE *fp = fopen("data.txt", "r");
if (fp != NULL) {
int x;
fscanf(fp, "%d", &x);
fclose(fp);
}
Writing to Text Files:

fprintf(fp, "%d %s", x, name): Writes formatted data (like printf but to file).
fputs(str, fp): Writes a string to file.
fputc(ch, fp): Writes one character to file.

Example:
FILE *fp = fopen("output.txt", "w");
if (fp != NULL) {
fprintf(fp, "Roll: %d Name: %s\\n", 101, "Ravi");
fclose(fp);
}
Random File Access:
Instead of reading a file only from beginning to end (sequential), random access lets you jump to any specific position.
Functions:

fseek(fp, offset, origin): Moves the file pointer by offset bytes from origin.
SEEK_SET = beginning of file
SEEK_CUR = current position
SEEK_END = end of file
Example: fseek(fp, 20, SEEK_SET); — moves to 20th byte from beginning.
ftell(fp): Returns the current byte position of the file pointer from the beginning.
long pos = ftell(fp);
rewind(fp): Moves the file pointer back to the very beginning of the file.
Equivalent to fseek(fp, 0, SEEK_SET).

Random access is particularly useful with binary files for direct record access. For example, to read the 5th student record directly:
fseek(fp, 4 * sizeof(struct Student), SEEK_SET);
fread(&s, sizeof(struct Student), 1, fp);
`;
