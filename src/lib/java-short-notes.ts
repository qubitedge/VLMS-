export const javaShortNotes = `JAVA PROGRAMMING — SHORT NOTES
(As per JNTUGV / CEV IT R23 Syllabus)

INTRODUCTION TO JAVA
![Introduction](/in%20java.png)
Java is a high-level, object-oriented, platform-independent programming language developed by James Gosling at Sun Microsystems in 1995. Java follows the principle "Write Once, Run Anywhere" (WORA) — compiled Java code runs on any platform that has a Java Virtual Machine (JVM).
Why Java?

Platform independent — bytecode runs on any OS via JVM.
Strongly object-oriented — everything is modeled as objects.
Robust — strong type checking, exception handling, garbage collection.
Secure — no pointers, sandbox execution model.
Multithreaded — built-in support for concurrent programming.
Widely used in web backends, Android apps, enterprise systems, and IoT.


UNIT I — OOP, DATA TYPES, AND CONTROL STATEMENTS
![Unit 1](/unit%201%20java.png)
Object Oriented Programming (OOP) — Basic Concepts:
OOP is a programming paradigm that organizes software around objects — entities that combine data (attributes) and behavior (methods).

Class: A blueprint or template that defines the structure and behavior of objects. Example: class Car { String color; void drive() {} }
Object: An instance of a class — a real entity created from the blueprint. Example: Car myCar = new Car();
Encapsulation: Wrapping data (variables) and methods together inside a class, and restricting direct access to data using access modifiers (private, public). Data is accessed through getters and setters.
Inheritance: A class (child/subclass) acquiring the properties and methods of another class (parent/superclass). Promotes code reuse. Example: class Dog extends Animal {}
Polymorphism: One interface, many implementations. The same method name behaves differently based on the object. Two types: compile-time (method overloading) and runtime (method overriding).
Abstraction: Hiding internal implementation details and showing only the essential features to the user. Achieved through abstract classes and interfaces.

Principles of OOP:
These four principles (Encapsulation, Inheritance, Polymorphism, Abstraction) are the pillars that make OOP powerful for building modular, reusable, and maintainable software.
Program Structure in Java:
Every Java program must have at least one class. Execution starts from the main() method. The class name must match the filename.
public class Hello {
public static void main(String[] args) {
System.out.println("Hello, World!");
}
}
Elements / Tokens in Java Programs:

Keywords: Reserved words with fixed meaning. Examples: class, int, if, while, return, new, static, void.
Identifiers: Names for classes, variables, methods. Rules: start with letter or _ or $, case-sensitive, no spaces, cannot be a keyword.
Literals: Constant values written directly — 10, 3.14, 'A', "Hello", true.
Operators: +, -, *, /, %, ==, &&, etc.
Separators: ; (end of statement), {} (block), () (method call), , (separator).
Comments: // single-line, /* multi-line /, /* javadoc */

Java Statements:
A statement is a complete instruction. Types: declaration (int x = 5;), expression (x = x + 1;), control flow (if, for, while), method call (System.out.println();).
Command Line Arguments:
Values passed to the program when run from the terminal.
public static void main(String[] args)
args[0] is the first argument, args[1] is the second. args.length gives the count.
Run: java Hello Ravi 25 → args[0]="Ravi", args[1]="25"
User Input to Programs:
Using Scanner class from java.util:
Scanner sc = new Scanner(System.in);
int n = sc.nextInt();
String s = sc.next(); or sc.nextLine() for full line.
double d = sc.nextDouble();
Escape Sequences:
\\n = newline, \\t = tab, \\ = backslash, " = double quote, ' = single quote, \\r = carriage return.
Programming Style:

Class names: PascalCase (MyClass).
Variable/method names: camelCase (myVariable).
Constants: UPPER_CASE (MAX_SIZE).
One statement per line. Proper indentation (4 spaces per level).


Data Types in Java:
Java has two categories:

Primitive Data Types — directly store values.

TypeSizeRange / Descriptionbyte1 byte-128 to 127short2 bytes-32,768 to 32,767int4 bytes-2^31 to 2^31-1long8 bytes-2^63 to 2^63-1 (use L suffix: 100L)float4 bytes~6-7 decimal digits (use F: 3.14F)double8 bytes~15-16 decimal digitschar2 bytesSingle Unicode character 'A'boolean1 bittrue or false only

Reference Data Types — store memory addresses (references) to objects. Examples: String, arrays, class objects.

Declaration of Variables:
int age = 25;
double price = 99.99;
String name = "Ravi";
Variables must be declared before use. Java is strongly typed — type cannot change.
Type Casting:
Converting one data type to another.

Implicit (Widening): Automatic — no data loss. int → long → float → double.
int i = 5; double d = i; (automatic)
Explicit (Narrowing): Manual — may lose data. double → int.
double d = 9.7; int i = (int) d; (i = 9, decimal part lost)

Scope of Variable:

Local variable: Declared inside a method. Accessible only within that method.
Instance variable: Declared inside class but outside methods. Each object has its own copy.
Class/Static variable: Declared with static keyword. Shared by all objects of the class.

Literal Constants: Direct values like 42, 3.14, 'X', "Hello", true.
Symbolic Constants: Using final keyword: final double PI = 3.14159;
Values cannot be changed once assigned.
Formatted Output with printf():
System.out.printf("Name: %s, Age: %d, GPA: %.2f%n", name, age, gpa);
Format specifiers: %d (int), %f (float/double), %s (String), %c (char), %.2f (2 decimal places), %n (newline).
Static Variables and Methods:
static variables belong to the class, not any specific object. Shared across all instances.
static methods can be called without creating an object: ClassName.methodName();
Example: Math.sqrt(16), Integer.parseInt("42")
Cannot use this keyword inside static methods.
Attribute final:
final variable = constant (value cannot change).
final method = cannot be overridden.
final class = cannot be inherited (e.g., String class is final).

Operators in Java:
Precedence (highest to lowest, simplified):
() [] . → Postfix ++ -- → Unary + - ! ~ → * / % → + - → < > <= >= → == != → & → ^ → | → && → || → ?: → =
Assignment Operator: = assigns value. Compound: +=, -=, *=, /=, %=.
Arithmetic Operators: + (add), - (subtract), * (multiply), / (divide — integer division for int operands), % (modulus/remainder).
Increment/Decrement:
++x (prefix) — increments before using the value.
x++ (postfix) — uses the value then increments.
Example: int x=5; int y = ++x; → y=6, x=6. int y = x++; → y=5, x=6.
Ternary Operator: condition ? value_if_true : value_if_false
Example: int max = (a > b) ? a : b;
Relational Operators: == (equal), != (not equal), < , > , <= , >= → return boolean (true/false).
Boolean Logical Operators:
&& (AND — both must be true), || (OR — at least one true), ! (NOT — reverses).
Short-circuit evaluation: && stops at first false, || stops at first true.
Bitwise Operators: & (AND), | (OR), ^ (XOR), ~ (NOT/complement), << (left shift), >> (right shift), >>> (unsigned right shift).

Control Statements:
if Expression:
if (condition) { // executes if true }
if-else:
if (condition) { // true block } else { // false block }
Nested if and if-else-if ladder:
if (c1) { } else if (c2) { } else if (c3) { } else { }
Ternary Operator (?:): Shorthand for simple if-else. result = (x > 0) ? "Positive" : "Non-positive";
Switch Statement:
switch (variable) {
case 1: // code; break;
case 2: // code; break;
default: // code;
}
Works with int, char, String, enum. break exits each case. Without break, fall-through occurs.
Java 14+ enhanced switch: result = switch(day) { case "MON" -> "Monday"; ... };
Iteration Statements:
while loop — entry-controlled:
while (condition) { // body }
do-while loop — exit-controlled, executes at least once:
do { // body } while (condition);
for loop — when iteration count is known:
for (int i = 0; i < n; i++) { // body }
Nested for loop: A for loop inside another. Inner loop completes all iterations for each outer loop iteration.
For-Each (Enhanced for) loop — for arrays/collections:
for (int element : array) { System.out.println(element); }
Cannot modify elements, no index access, but cleaner syntax.
Break Statement: Exits the nearest enclosing loop or switch immediately.
Continue Statement: Skips the rest of the current iteration, moves to next iteration.

UNIT II — CLASSES, OBJECTS, AND METHODS
![Unit 2](/unit%202%20java.png)
Class Declaration:
A class is the blueprint. Syntax:
[modifier] class ClassName {
// instance variables (fields)
// constructors
// methods
}
Modifiers: public (accessible everywhere), default (same package only), abstract, final.
Class Members: Fields (variables) and Methods (functions) that define the state and behavior of objects.
Declaration of Class Objects:
ClassName ref = new ClassName();
new keyword allocates memory on heap. ref is a reference variable stored on the stack.
Assigning One Object to Another:
Car c1 = new Car();
Car c2 = c1; // c2 and c1 point to the SAME object
Changing c2's fields will also affect c1 — they share the same memory location (shallow copy).
Access Control for Class Members:
ModifierSame ClassSame PackageSubclassEverywhereprivateYesNoNoNodefaultYesYesNoNoprotectedYesYesYesNopublicYesYesYesYes
Accessing Private Members: Through public getter and setter methods.
private int age;
public int getAge() { return age; }
public void setAge(int a) { age = a; }
This is encapsulation — controlled access to private data.
Constructor Methods:
Special method called automatically when an object is created using new. Same name as class, no return type.
class Student {
String name;
Student(String n) { name = n; } // parameterized constructor
}
Student s = new Student("Ravi");
Default constructor (no-arg) is provided by Java if no constructor is written. Once you define any constructor, the default is no longer provided automatically.
Overloaded Constructors:
Multiple constructors with different parameter lists. Java picks the correct one based on arguments passed.
Student() { name = "Unknown"; }
Student(String n) { name = n; }
Student(String n, int age) { name = n; this.age = age; }
Nested Classes:
A class defined inside another class.

Static nested class: Declared static. Can be instantiated without outer class object.
Inner (non-static) class: Tied to outer class instance. Can access outer class members.
Local class: Defined inside a method.
Anonymous class: Unnamed class defined and instantiated at the same time (used for interfaces/abstract classes).

final Class and Methods:
final class cannot be extended (inherited). Example: String class.
final method cannot be overridden in a subclass.
Passing Arguments:

By Value (primitive types): A copy of the value is passed. Changes inside method do not affect the original.
By Reference (objects): The reference (address) is passed. Changes to object's fields inside the method affect the original object.

Keyword this:
Refers to the current object instance.

this.variableName — disambiguates instance variable from local variable with same name.
this() — calls another constructor of the same class (constructor chaining).
return this — returns the current object (for method chaining).


Methods:
Defining Methods:
[modifier] returnType methodName(parameterList) {
// body
return value; // if non-void
}
void methods return nothing. A return statement exits the method immediately.
Overloaded Methods:
Multiple methods with the same name but different parameter lists (different number, type, or order of parameters). Return type alone cannot distinguish overloaded methods.
int add(int a, int b) { return a+b; }
double add(double a, double b) { return a+b; }
int add(int a, int b, int c) { return a+b+c; }
Class Objects as Parameters:
void compare(Student s1, Student s2) { ... }
Called as: compare(obj1, obj2);
The method receives the reference — can access and modify the object's fields.
Recursive Methods:
A method that calls itself. Must have a base case to stop recursion.
int factorial(int n) {
if (n == 0) return 1; // base case
return n * factorial(n-1); // recursive case
}
Use: factorial(5) = 5×4×3×2×1 = 120.
Nesting of Methods:
A method calling another method of the same class. Allowed in Java (unlike some languages that restrict this).
Overriding Methods:
A subclass provides a different implementation of a method that is already defined in its parent class. Same method name, same parameters, same return type.
@Override annotation is recommended — helps compiler catch errors.
Rules: Cannot override final or static methods. Access modifier can be same or wider (cannot be more restrictive).
Dynamic Method Dispatch:
Java resolves which overridden method to call at runtime based on the actual object type, not the reference type. This is runtime polymorphism.
Animal a = new Dog(); // reference is Animal, object is Dog
a.sound(); // calls Dog's sound() method — decided at runtime
Static methods are resolved at compile time (no dynamic dispatch).

UNIT III — ARRAYS AND INHERITANCE
![Unit 3](/unit%203%20java.png)
Arrays:
Declaration and Initialization:
int[] arr = new int[5]; // creates array of 5 zeros
int[] arr = {10, 20, 30, 40, 50}; // declare and initialize
arr.length gives the size of the array.
Storage in Memory: Arrays are stored in contiguous heap memory. The array variable holds a reference to the first element.
Accessing Elements: arr[0], arr[1], ..., arr[n-1]. Index starts from 0. IndexOutOfBoundsException if index >= length.
Operations on Arrays:
Traversal using for or for-each. Sort using Arrays.sort(arr). Search using Arrays.binarySearch(arr, key) (array must be sorted first).
Assigning Array to Another:
int[] b = a; — b and a point to the same array (not a copy).
To copy: int[] b = Arrays.copyOf(a, a.length); or use System.arraycopy().
Dynamic Change of Size:
Arrays have fixed size once created. To "resize": create a new larger array and copy old elements using Arrays.copyOf(arr, newSize).
Sorting: Arrays.sort(arr) — sorts in ascending order using dual-pivot quicksort for primitives.
Searching: Arrays.binarySearch(arr, value) — returns index if found, negative value if not. Array must be sorted first.
Class Arrays (java.util.Arrays):
Utility class with static methods: sort(), binarySearch(), copyOf(), copyOfRange(), fill(), equals(), toString().
Two-Dimensional Arrays:
int[][] matrix = new int[3][4]; // 3 rows, 4 columns
int[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};
Access: matrix[row][col]. Traverse with nested for loops.
Arrays of Varying Lengths (Jagged Arrays):
int[][] jagged = new int[3][];
jagged[0] = new int[2];
jagged[1] = new int[4];
jagged[2] = new int[3];
Rows can have different lengths.
Three-Dimensional Arrays:
int[][][] cube = new int[2][3][4];
Access: cube[i][j][k].
Arrays as Vectors:
An array of numeric values can be treated as a mathematical vector. Operations like dot product, addition, magnitude can be implemented by iterating over elements.

Inheritance:
Process of Inheritance:
A child class (subclass) inherits fields and methods of a parent class (superclass) using the extends keyword.
class Animal { void eat() { } }
class Dog extends Animal { void bark() { } }
Dog inherits eat() from Animal and adds its own bark() method.
Types of Inheritance in Java:
Single: One class extends one class (A → B).
Multilevel: Chain of inheritance (A → B → C).
Hierarchical: Multiple classes extend one class (A → B, A → C).
Multiple: Not supported directly in Java for classes (to avoid Diamond Problem) — achieved through interfaces.
Hybrid: Combination of the above — supported through interfaces.
Universal Super Class — Object Class:
Every class in Java implicitly extends java.lang.Object if no other superclass is specified. Object class provides methods like toString(), equals(), hashCode(), getClass(), clone(), finalize().
Inhibiting Inheritance — final class:
final class MyClass { } — no class can extend MyClass.
Example: String, Integer, Math are all final classes in Java.
Access Control and Inheritance:
public and protected members are inherited. private members are NOT inherited (not accessible directly in subclass). Default members are inherited only if subclass is in the same package.
Multilevel Inheritance:
class A { }
class B extends A { }
class C extends B { } — C inherits from both A and B through the chain.
Keyword super:
super.variableName — accesses parent class field.
super.methodName() — calls parent class method.
super() — calls parent class constructor. Must be the first statement in child constructor.
Constructor and Inheritance:
Parent class constructor is not inherited. Child must call parent constructor explicitly using super(). If super() is not written, Java inserts super() (no-arg) automatically. If parent has no no-arg constructor, child must explicitly call the correct super() constructor.
Method Overriding:
Child class redefines a method from the parent class. Same name, same parameters, same return type. @Override annotation recommended. Access level cannot be reduced. final methods cannot be overridden.
Dynamic Method Dispatch:
The method to be called is resolved at runtime based on the actual object type:
Animal a = new Dog();
a.speak(); // calls Dog's speak(), not Animal's speak()
This is the core mechanism of runtime polymorphism in Java.
Abstract Classes:
A class that cannot be instantiated directly. Declared with abstract keyword. Can have abstract methods (no body — subclass must implement) and concrete methods (with body).
abstract class Shape {
abstract double area(); // no body
void display() { System.out.println("I am a shape"); }
}
class Circle extends Shape {
double area() { return Math.PI * r * r; }
}

Interfaces:
Declaration of Interface:
An interface is a 100% abstract contract — defines what a class must do, not how.
interface Drawable {
void draw(); // implicitly public and abstract
}
Implementation of Interface:
class Circle implements Drawable {
public void draw() { System.out.println("Drawing circle"); }
}
A class must implement ALL methods of the interface (or be declared abstract). Keyword implements.
Multiple Interfaces:
Java classes can implement multiple interfaces (solves the no-multiple-inheritance limitation):
class MyClass implements Interface1, Interface2 { }
Nested Interfaces: An interface declared inside a class or another interface.
Inheritance of Interfaces: An interface can extend another interface (or multiple interfaces):
interface C extends A, B { }
Default Methods in Interfaces (Java 8+):
Interfaces can have methods with a default implementation using the default keyword:
default void log() { System.out.println("Default log"); }
Implementing classes can use or override this method. Resolves backward compatibility — new methods added to interfaces don't break existing implementations.
Static Methods in Interface (Java 8+):
Interfaces can have static methods: static void helper() { }
Called as: InterfaceName.helper(). Not inherited by implementing classes.
Functional Interfaces (Java 8+):
An interface with exactly one abstract method. Used with lambda expressions.
Example: Runnable, Comparator, Callable.
@FunctionalInterface annotation enforces this constraint.
Example: Runnable r = () -> System.out.println("Running");
Annotations:
Metadata tags attached to code elements. Do not change code behavior directly.
Built-in: @Override (check overriding), @Deprecated (marks old API), @SuppressWarnings (silence compiler warnings).
Custom annotations can be defined using @interface.

UNIT IV — PACKAGES, EXCEPTION HANDLING, AND I/O
![Unit 4](/unit%204%20java.png)
Packages:
Defining a Package:
package com.mycompany.myapp;
Must be the first statement in the file. Package name follows directory structure.
Importing Packages:
import java.util.Scanner; — imports one class.
import java.util.*; — imports all classes in the package.
java.lang package is automatically imported (no import needed).
Path and Class Path:
CLASSPATH environment variable tells Java where to look for compiled .class files and JAR libraries.
Access Control with Packages:
public: Accessible from anywhere.
protected: Accessible within same package and subclasses.
default (no modifier): Accessible only within the same package.
private: Accessible only within the same class.

Java.lang Package (auto-imported):
Class Object: Root of all Java classes. Key methods: toString() (string representation), equals() (compare objects), hashCode() (hash code for use in HashMap), getClass() (returns Class object), clone() (creates a copy).
Enumeration (enum):
enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }
Day today = Day.WED;
Enums are type-safe constants. Can have fields, methods, and constructors. ordinal() returns position, name() returns name as String, values() returns all enum constants as array.
Class Math: Provides mathematical functions as static methods.
Math.abs(x), Math.sqrt(x), Math.pow(x,y), Math.max(a,b), Math.min(a,b), Math.floor(x), Math.ceil(x), Math.round(x), Math.random() (0.0 to 1.0), Math.PI (constant).
Wrapper Classes:
Object representations of primitive types. Each primitive has a corresponding wrapper:
int → Integer, double → Double, char → Character, boolean → Boolean, etc.
Used where objects are required (collections, generics). Provide utility methods: Integer.parseInt("42"), Double.parseDouble("3.14"), Integer.MAX_VALUE, Integer.toBinaryString(n).
Auto-boxing and Auto-unboxing:
Auto-boxing: Automatic conversion from primitive to wrapper.
Integer x = 42; (42 is auto-boxed to Integer)
Auto-unboxing: Automatic conversion from wrapper to primitive.
int y = x; (x is auto-unboxed to int)

Java.util Classes:
Formatter Class:
Used for formatted string output. Formatter fmt = new Formatter();
fmt.format("Name: %s, Age: %d", name, age);
System.out.println(fmt);
Random Class:
Random rand = new Random();
rand.nextInt(100) — random int 0–99.
rand.nextDouble() — random double 0.0–1.0.
rand.nextBoolean() — random true/false.
Time Package (java.time — Java 8+):
LocalDate, LocalTime, LocalDateTime — immutable date/time objects.
LocalDate today = LocalDate.now();
LocalDate date = LocalDate.of(2024, 1, 15);
today.getYear(), today.getMonth(), today.getDayOfMonth().
Duration and Period for measuring time intervals.
Class Instant (java.time.Instant):
Represents a point on the timeline in UTC. Instant.now() gives current timestamp. Used for precise timestamps and measuring elapsed time.
Formatting Date/Time:
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
String formatted = LocalDateTime.now().format(fmt);
Temporal Adjusters:
Utility methods for date manipulation.
LocalDate.now().with(TemporalAdjusters.firstDayOfMonth()) → first day of current month.
LocalDate.now().with(TemporalAdjusters.next(DayOfWeek.MONDAY)) → next Monday.

Exception Handling:
What is an Exception?
An exception is an unexpected event during program execution that disrupts the normal flow. Java handles exceptions using try-catch-finally blocks.
Hierarchy of Standard Exception Classes:
Throwable (root)
├── Error — serious JVM problems, not catchable (OutOfMemoryError, StackOverflowError)
└── Exception
├── RuntimeException (Unchecked)
│   ├── NullPointerException
│   ├── ArrayIndexOutOfBoundsException
│   ├── ClassCastException
│   ├── NumberFormatException
│   └── ArithmeticException (e.g., divide by zero)
└── Checked Exceptions (must handle)
├── IOException
├── FileNotFoundException
├── SQLException
└── ClassNotFoundException
Checked vs Unchecked Exceptions:
Checked: Must be handled using try-catch or declared with throws. Checked at compile time.
Unchecked (RuntimeException): Not required to be caught. Result of programming errors (null access, bad index).
Keywords throws and throw:
throws: Declares that a method may throw an exception. In method signature.
void readFile() throws IOException { }
throw: Explicitly throws an exception object.
throw new IllegalArgumentException("Invalid input");
try, catch, finally:
try {
// code that may throw exception
} catch (ExceptionType e) {
// handle exception
System.out.println(e.getMessage());
} finally {
// always executes — cleanup code (close files, connections)
}
Multiple Catch Clauses:
try {
// risky code
} catch (IOException e) {
// handle IO error
} catch (NumberFormatException e) {
// handle number format error
} catch (Exception e) {
// catch-all (most general — must be last)
}
Multi-catch (Java 7+): catch (IOException | SQLException e) { }
Class Throwable:
Root class for all errors and exceptions. Key methods: getMessage() (error description), toString() (class name + message), printStackTrace() (full stack trace), getCause() (underlying cause).

Java I/O and Files:
Java I/O API:
Java uses streams for I/O — a sequence of data flowing from a source to a destination.
Standard I/O Streams:
System.in — InputStream (keyboard input).
System.out — PrintStream (screen output).
System.err — PrintStream (error output).
Types of Streams:
Byte Streams: Handle raw 8-bit bytes. Classes: InputStream, OutputStream and subclasses. Example: FileInputStream, FileOutputStream. Used for binary files (images, audio).
Character Streams: Handle 16-bit Unicode characters. Classes: Reader, Writer and subclasses. Example: FileReader, FileWriter, BufferedReader, BufferedWriter. Used for text files.
Scanner Class:
High-level input class. Can read from System.in, files, or strings.
Scanner sc = new Scanner(System.in);
Scanner sc = new Scanner(new File("data.txt"));
Methods: next(), nextLine(), nextInt(), nextDouble(), nextBoolean(), hasNext().
Files in Java:
File class (java.io): Represents a file or directory path. f.exists(), f.getName(), f.length(), f.isDirectory(), f.createNewFile(), f.delete().
Reading text file:
BufferedReader br = new BufferedReader(new FileReader("file.txt"));
String line;
while ((line = br.readLine()) != null) { System.out.println(line); }
br.close();
Writing text file:
BufferedWriter bw = new BufferedWriter(new FileWriter("file.txt"));
bw.write("Hello World");
bw.newLine();
bw.close();
Java NIO (java.nio.file — modern approach):
Path path = Paths.get("file.txt");
List<String> lines = Files.readAllLines(path);
Files.write(path, content.getBytes());

UNIT V — STRINGS, MULTITHREADING, AND JAVAFX
![Unit 5](/unit%205%20java.png)
String Handling in Java:
Interface CharSequence:
An interface implemented by String, StringBuilder, and StringBuffer. Defines methods: charAt(index), length(), subSequence(start,end), toString().
Class String:
Strings in Java are immutable — once created, their value cannot be changed. Any modification creates a new String object. Stored in the String Pool (part of heap) for memory efficiency.
String s = "Hello";
String s = new String("Hello"); // creates a new object, not in pool
Methods for Extracting Characters:
charAt(index) — character at position.
substring(start) or substring(start, end) — extract portion.
toCharArray() — converts to char[].
indexOf('c') or indexOf("str") — first occurrence position.
lastIndexOf('c') — last occurrence.
Comparison:
equals(str) — compares content (case-sensitive). Always use this, not ==.
equalsIgnoreCase(str) — case-insensitive comparison.
compareTo(str) — lexicographic comparison (returns negative, 0, or positive).
== compares references (memory addresses), not content.
Modifying (returns new String — original unchanged):
toUpperCase(), toLowerCase() — change case.
trim() — removes leading and trailing whitespace.
replace(old, new) — replaces characters or substrings.
concat(str) or + operator — joins strings.
replaceAll(regex, replacement) — regex-based replacement.
Searching:
contains("str") — returns true/false.
startsWith("prefix"), endsWith("suffix").
matches(regex) — full regex match.
split(delimiter) — splits into String array.

Class StringBuffer:
Mutable sequence of characters — can be modified without creating new objects. Thread-safe (synchronized). Use when string is modified frequently in a multithreaded environment.
StringBuffer sb = new StringBuffer("Hello");
sb.append(" World"); // modifies in place
sb.insert(5, ","); // insert at position
sb.delete(0, 5); // delete range
sb.reverse(); // reverses content
sb.toString(); // convert back to String
StringBuilder vs StringBuffer:
StringBuilder is similar to StringBuffer but NOT thread-safe — faster in single-threaded use. Preferred when thread safety is not a concern.

Multithreaded Programming:
Introduction:
A thread is the smallest unit of execution within a process. Multithreading allows a program to perform multiple tasks concurrently, improving performance — especially on multi-core processors.
Need for Multiple Threads:

Perform background tasks while main program runs (e.g., auto-save, data download).
Utilize multiple CPU cores for parallel computation.
Improve responsiveness (GUI stays active while processing).
Handle multiple client requests simultaneously in servers.

Thread Class (java.lang.Thread):
Two ways to create threads:

Extending Thread class:
class MyThread extends Thread {
public void run() { /* task code */ }
}
MyThread t = new MyThread();
t.start(); // starts a new thread that calls run()
Implementing Runnable interface (preferred):
class MyTask implements Runnable {
public void run() { /* task code */ }
}
Thread t = new Thread(new MyTask());
t.start();

Main Thread:
Every Java program starts with one thread — the main thread. It runs the main() method. All other threads are created from it.
Thread States:
New → Runnable → Running → Blocked/Waiting/Timed-Waiting → Terminated
New: Thread object created but start() not called.
Runnable: start() called — ready to run (waiting for CPU).
Running: Actively executing.
Blocked/Waiting: Waiting for a lock, I/O, or another thread's notification.
Terminated (Dead): run() completed.
Thread Priority:
Every thread has a priority (1–10). Thread.MIN_PRIORITY=1, Thread.NORM_PRIORITY=5, Thread.MAX_PRIORITY=10.
t.setPriority(Thread.MAX_PRIORITY);
Higher priority threads get more CPU time (but not guaranteed — JVM and OS dependent).
Synchronization:
When multiple threads access shared data, race conditions can occur — final result depends on thread execution order. synchronized keyword ensures only one thread at a time can execute a synchronized method or block.
synchronized void increment() { count++; }
Synchronized block: synchronized(this) { count++; }
Deadlock:
Two or more threads each waiting for the other to release a lock — both blocked forever. Neither can proceed.
Thread A holds Lock 1, waits for Lock 2.
Thread B holds Lock 2, waits for Lock 1.
Prevention: Always acquire locks in the same fixed order across all threads.
Race Condition:
When the result of computation depends on the unpredictable order of thread execution. Prevented using synchronization.
Inter-Thread Communication:
Threads can coordinate using: wait() — releases lock and waits for notification. notify() — wakes one waiting thread. notifyAll() — wakes all waiting threads. Must be called inside synchronized block/method.
Suspending, Resuming, and Stopping Threads:
Deprecated methods: suspend(), resume(), stop() — unsafe, can cause deadlocks.
Modern approach: Use a boolean flag variable to control thread execution:
volatile boolean running = true;
// In run(): while (running) { ... }
// To stop: running = false;
volatile keyword ensures the variable's latest value is always read from main memory (not thread's local cache).

JavaFX GUI:
JavaFX Scene Builder:
A visual design tool for creating JavaFX UI layouts using drag-and-drop. Generates FXML files (XML-based UI description). The FXML is loaded at runtime and connected to a Java controller class using @FXML annotations.
JavaFX App Window Structure:
Stage: The top-level window (like a frame). Represents the OS window.
Scene: The container for all UI content inside a Stage. Has a root node.
Node: Any visual element in the scene graph (Button, Label, TextField, ImageView, etc.).
Hierarchy: Stage → Scene → Root Node → Child Nodes
Example:
public class MyApp extends Application {
public void start(Stage stage) {
Label lbl = new Label("Hello JavaFX");
Scene scene = new Scene(lbl, 300, 200);
stage.setTitle("My App");
stage.setScene(scene);
stage.show();
}
}
Displaying Text and Image:
Label lbl = new Label("Welcome to JavaFX");
ImageView img = new ImageView(new Image("file:photo.png"));
img.setFitWidth(200); img.setFitHeight(150);
Event Handling:
JavaFX uses an event-driven model. UI actions (button click, key press) generate events. Handler methods are registered to respond.
Button btn = new Button("Click Me");
btn.setOnAction(e -> System.out.println("Button clicked!"));
Or use EventHandler<ActionEvent> interface.
Laying Out Nodes in Scene Graph:
Layout panes arrange nodes visually:

HBox: Places nodes in a horizontal row. new HBox(10, btn1, btn2) — 10px spacing.
VBox: Places nodes in a vertical column.
GridPane: Table-like grid layout. grid.add(node, col, row).
BorderPane: Five regions — TOP, BOTTOM, LEFT, RIGHT, CENTER.
StackPane: Stacks nodes on top of each other.
FlowPane: Wraps nodes like flowing text.
AnchorPane: Positions nodes by anchoring to edges.

Mouse Events:
node.setOnMouseClicked(e -> { /* handle click */ });
node.setOnMouseEntered(e -> { /* handle hover */ });
node.setOnMouseExited(e -> { /* handle exit */ });
MouseEvent provides: e.getX(), e.getY() (position), e.getClickCount(), e.getButton() (which mouse button).
Key Event Handling:
scene.setOnKeyPressed(e -> {
if (e.getCode() == KeyCode.ENTER) { /* handle enter key */ }
});
FXML and Controller:
UI defined in .fxml file. Java controller class linked via fx:controller attribute.
@FXML private Button myBtn; — injects FXML element into Java.
@FXML private void handleClick() { } — wired to button's onAction in FXML.
`;
