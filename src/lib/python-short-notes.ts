export const pythonShortNotes = `PYTHON PROGRAMMING - SHORT NOTES
(As Per JNTUGV Syllabus)

INTRODUCTION
Python is a dynamically typed, interpreted, high-level programming language widely used for artificial intelligence, web development, data science, and automation. Its elegant syntax and readability make it an excellent language for both beginners and professionals.

UNIT I — INTRODUCTION TO PYTHON PROGRAMMING
History of Python Programming Language:
Created by Guido van Rossum in 1989 and released in 1991. Named after the comedy series Monty Python's Flying Circus. It is designed to be highly readable.
Thrust Areas of Python:
Web Development, Data Science, AI/ML, Automation, and Scientific Computing.
Installing Anaconda and Jupyter Notebook:
Anaconda is a distribution of Python and R for scientific computing. Jupyter Notebook is an open-source web application that allows creating and sharing documents that contain live code, equations, visualizations, and text.
Parts of Python Programming Language:
Identifiers: Names given to entities like class, functions, variables.
Keywords: Reserved words with special meanings (e.g., if, while, for).
Statements and Expressions: Statements perform actions; expressions evaluate to values.
Variables: Containers for storing data values. No need to declare type explicitly.
Operators, Precedence, and Associativity: Arithmetic, relational, logical, assignment, bitwise, membership, identity, and ternary operators. Evaluated based on precedence and associativity rules.
Data Types: Integers, floats, strings, booleans, lists, tuples, dictionaries.
Indentation and Comments: Indentation is mandatory to define blocks of code. Comments use # for single line.
Reading Input and Print Output: input() reads from user; print() outputs to console.
Type Conversions: Converting one data type to another using functions like int(), float().
type() Function and Is Operator: type() returns the type of object. 'is' checks object identity.
Dynamic and Strongly Typed: Variable types are checked during execution (dynamic) and type rules are strictly enforced (strongly typed).
Control Flow Statements:
if, if-else, if...elif...else, Nested if: Used for decision making.
while Loop, for Loop: Used for iteration.
continue and break: Modifies loop behavior.
Catching Exceptions: Using try and except statement to handle errors gracefully.

UNIT II — FUNCTIONS, STRINGS, AND LISTS
Functions:
Built-In Functions: Predefined functions like len(), max(), sum().
Commonly Used Modules: math, random, os.
Function Definition and Calling: Using 'def' keyword.
return Statement and void Function: return passes back a value. Functions without return implicitly return None.
Scope and Lifetime of Variables: Local variables inside functions, global variables outside.
Default Parameters and Keyword Arguments: Providing default values; passing arguments by name.
*args and **kwargs: Variable length arguments (*args for tuple, **kwargs for dictionary).
Command Line Arguments: Accessed using sys.argv.
Strings:
Creating and Storing Strings: Immutable sequences of characters.
Basic String Operations: Accessing characters by index, slicing (str[start:end]), joining.
String Methods: upper(), lower(), split(), replace().
Formatting Strings: Using f-strings (f"Hello {name}").
Lists:
Creating Lists: Mutable sequences of items, created using [].
Basic List Operations: Indexing, slicing, concatenation.
Built-In Functions and Methods: len(), append(), insert(), remove(), pop().
del Statement: Deletes an element by index or the entire list.

UNIT III — DICTIONARIES, TUPLES, AND SETS
Dictionaries:
Creating Dictionary: Key-value pairs enclosed in {}.
Accessing and Modifying key:value Pairs: dict[key] = value.
Built-In Functions and Methods: keys(), values(), items(), get().
del Statement: Used to remove a key-value pair.
Tuples:
Creating Tuples: Immutable sequences, created using ().
Basic Tuple Operations: Indexing and slicing.
tuple() Function: Converts an iterable to a tuple.
Relation between Tuples and Lists/Dictionaries: Tuples can be used as dictionary keys because they are immutable.
Using zip() Function: Combines iterables element-wise.
Sets:
Creating Sets: Unordered collections of unique elements.
Set Methods: add(), remove(), union(), intersection(), difference().
Frozenset: Immutable version of a set.

UNIT IV — FILES AND OBJECT-ORIENTED PROGRAMMING
Files:
Types of Files: Text files (human-readable) and Binary files (machine-readable).
Creating and Reading Text Data: open(), read(), readline(), readlines().
File Methods to Read and Write Data: write(), writelines().
Reading and Writing Binary Files: Using 'rb' and 'wb' modes.
Pickle Module: Serializing and de-serializing Python object structures.
Reading and Writing CSV Files: Using the csv module.
Python os and os.path Modules: Interacting with the operating system and handling file paths.
Object-Oriented Programming (OOP):
Classes and Objects: Blueprint for creating objects; instances of a class.
Creating Classes and Objects: Using the 'class' keyword.
Constructor Method: __init__ method initializes the object.
Class Attributes Vs Data Attributes: Attributes shared by all instances vs specific to an instance.
Encapsulation: Bundling data and methods; restricting direct access to data.
Inheritance: Deriving a new class from an existing class to promote code reuse.
Polymorphism: Different classes can have methods with the same name.

UNIT V — INTRODUCTION TO DATA SCIENCE
Functional Programming:
Concepts: map(), filter(), reduce(), and lambda functions.
JSON and XML in Python:
Parsing and generating JSON (json module) and XML structures.
NumPy with Python:
Array Creation: Using array() function.
Attributes: ndim, shape, size, dtype.
Indexing and Slicing: Basic slicing, integer indexing, and Boolean indexing.
Mathematical Operations: min, max, sum, cumulative sum.
Pandas:
DataFrames: Creating DataFrames from dictionaries or lists.
Data Exploration: Using head(), tail(), info(), describe().
Data Selection: Accessing specific rows and columns.
Matplotlib:
Data Visualization: Scatter plots, line plots, bar charts. Observing relationships between attributes.
`;
