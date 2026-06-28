import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Define the 290 questions (29 experiments * 5 pretest + 5 posttest)
const questionBank: Record<string, { pretest: any[], posttest: any[] }> = {
  "java-e1-1": {
    pretest: [
      { question: "How many primitive data types are defined in Java?", options: ["6", "8", "10", "12"], answerIndex: 1 },
      { question: "Which of these is NOT a primitive data type in Java?", options: ["boolean", "int", "char", "String"], answerIndex: 3 },
      { question: "What is the default value of an uninitialized boolean instance variable in Java?", options: ["true", "false", "null", "0"], answerIndex: 1 },
      { question: "What is the default value of an uninitialized char instance variable in Java?", options: ["' '", "'\\u0000' (null character)", "'0'", "null"], answerIndex: 1 },
      { question: "What is the default value of an uninitialized float instance variable?", options: ["0.0f", "0f", "0.0", "NaN"], answerIndex: 0 }
    ],
    posttest: [
      { question: "What happens if you try to read an uninitialized local variable inside a method in Java?", options: ["It returns default value", "It returns null", "It causes a compilation error", "It causes a runtime exception"], answerIndex: 2 },
      { question: "Which primitive type is used to represent single 16-bit Unicode characters?", options: ["byte", "short", "char", "int"], answerIndex: 2 },
      { question: "What is the default value of double instance variables?", options: ["0.0", "0.0d", "0", "null"], answerIndex: 0 },
      { question: "How much memory does a byte data type occupy?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], answerIndex: 0 },
      { question: "Static fields declared without initialization are given default values by:", options: ["The compiler", "The JVM", "The linker", "The loader"], answerIndex: 1 }
    ]
  },
  "java-e1-2": {
    pretest: [
      { question: "For a quadratic equation ax² + bx + c = 0, what does the discriminant formula calculate?", options: ["b*b + 4*a*c", "b*b - 4*a*c", "2*a", "Math.sqrt(a)"], answerIndex: 1 },
      { question: "If the discriminant D is greater than zero, the roots are:", options: ["Real and distinct", "Real and equal", "Complex and imaginary", "Negative and equal"], answerIndex: 0 },
      { question: "Which Java Math class method is used to calculate the square root?", options: ["Math.sqr", "Math.sqrt", "Math.pow", "Math.root"], answerIndex: 1 },
      { question: "If the discriminant D is equal to zero, the roots are:", options: ["Real and distinct", "Real and equal", "Complex and imaginary", "Zero"], answerIndex: 1 },
      { question: "If D < 0, what is the nature of the roots?", options: ["Real and distinct", "Real and equal", "Complex and imaginary", "No roots exist"], answerIndex: 2 }
    ],
    posttest: [
      { question: "Which data type should be used for precise discriminant values in a quadratic equation solver?", options: ["int", "float", "double", "short"], answerIndex: 2 },
      { question: "What is returned by Math.sqrt(-9) in Java?", options: ["-3.0", "NaN (Not a Number)", "ArithmeticException", "NullPointerException"], answerIndex: 1 },
      { question: "Which conditional statement is best suited to check the discriminant's three states (D>0, D==0, D<0)?", options: ["switch case", "if-else-if ladder", "while loop", "for loop"], answerIndex: 1 },
      { question: "The coefficients a, b, and c in a quadratic equation ax² + bx + c = 0 are typically declared as:", options: ["int", "boolean", "String", "double"], answerIndex: 3 },
      { question: "To find roots using the quadratic formula, the division is by:", options: ["a", "2 * a", "4 * a", "b * b"], answerIndex: 1 }
    ]
  },
  "java-e2-1": {
    pretest: [
      { question: "Binary search requires the target array to be:", options: ["Unsorted", "Sorted", "Empty", "Multi-dimensional"], answerIndex: 1 },
      { question: "What is the average time complexity of Binary Search?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answerIndex: 2 },
      { question: "If low = 0 and high = 9, what is the initial mid index?", options: ["4", "5", "4.5", "9"], answerIndex: 0 },
      { question: "If the target element is smaller than the middle element, the next search space is:", options: ["low = mid + 1", "high = mid - 1", "low = mid", "high = mid"], answerIndex: 1 },
      { question: "If the target element is larger than the middle element, the next search space is:", options: ["low = mid + 1", "high = mid - 1", "low = mid", "high = mid"], answerIndex: 0 }
    ],
    posttest: [
      { question: "What is the worst-case space complexity of iterative binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answerIndex: 0 },
      { question: "What happens in binary search if the target is not in the array?", options: ["ArrayOutOfBoundsException", "Infinite loop", "low exceeds high and loop terminates", "Returns 0"], answerIndex: 2 },
      { question: "Which index calculation prevents integer overflow in large arrays?", options: ["(low + high) / 2", "low + (high - low) / 2", "(low * high) / 2", "high - low / 2"], answerIndex: 1 },
      { question: "What is the maximum number of comparisons to find a key in an array of size 1024?", options: ["10", "11", "512", "1024"], answerIndex: 1 },
      { question: "If Binary Search is run on an unsorted array:", options: ["It automatically sorts the array", "It throws a compiler error", "It may fail to find the element or return incorrect index", "It runs in O(n)"], answerIndex: 2 }
    ]
  },
  "java-e2-2": {
    pretest: [
      { question: "Bubble sort sorts by repeatedly swapping:", options: ["First and last elements", "Random elements", "Adjacent elements", "Odd and even indices"], answerIndex: 2 },
      { question: "What is the worst-case time complexity of Bubble Sort?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answerIndex: 3 },
      { question: "What is the best-case time complexity of optimized Bubble Sort on a sorted array?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answerIndex: 1 },
      { question: "Which helper variable is needed to swap two elements in an array?", options: ["String message", "A temp variable of same type", "counter", "pointer"], answerIndex: 1 },
      { question: "Why is it called Bubble Sort?", options: ["It uses bubble layouts", "Smaller elements bubble up to the top of the list", "It pops like a bubble", "Created by a programmer named Bubble"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Is Bubble Sort a stable sorting algorithm?", options: ["Yes, it preserves relative order of equal keys", "No, it shuffles equal keys", "Only for integers", "Only for strings"], answerIndex: 0 },
      { question: "What is the space complexity of Bubble Sort?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answerIndex: 0 },
      { question: "In a Bubble Sort pass of an array of size N, the inner loop goes up to:", options: ["N", "N - 1", "N - i - 1", "N - i"], answerIndex: 2 },
      { question: "How do you optimize Bubble Sort to stop if the array becomes sorted early?", options: ["Use a timer", "Use a boolean flag to detect swaps", "Use exceptions", "It is already optimized by default"], answerIndex: 1 },
      { question: "After the first outer loop pass of Bubble Sort:", options: ["The array is sorted", "The smallest element is at index 0", "The largest element is placed at the final index", "The array is reversed"], answerIndex: 2 }
    ]
  },
  "java-e2-3": {
    pretest: [
      { question: "Unlike String, StringBuffer objects are:", options: ["Immutable", "Mutable", "Primitives", "Static"], answerIndex: 1 },
      { question: "Which method is used to remove characters in a StringBuffer?", options: ["remove", "delete", "clear", "erase"], answerIndex: 1 },
      { question: "Which package contains the StringBuffer class?", options: ["java.io", "java.util", "java.lang", "java.sql"], answerIndex: 2 },
      { question: "StringBuffer is thread-safe because its methods are:", options: ["static", "synchronized", "private", "final"], answerIndex: 1 },
      { question: "Which method adds text to the end of a StringBuffer?", options: ["add", "append", "insert", "concat"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What is the default initial capacity of a StringBuffer?", options: ["0", "10", "16", "32"], answerIndex: 2 },
      { question: "How do you remove a single character at a specific index in a StringBuffer?", options: ["removeCharAt", "deleteCharAt", "deleteIndex", "eraseChar"], answerIndex: 1 },
      { question: "Which method inserts text at a specific index?", options: ["insert", "append", "addAtIndex", "put"], answerIndex: 0 },
      { question: "What is the difference between StringBuffer and StringBuilder?", options: ["StringBuffer is synchronized/thread-safe; StringBuilder is not", "StringBuilder is synchronized; StringBuffer is not", "StringBuffer can handle emojis; StringBuilder cannot", "There is no difference"], answerIndex: 0 },
      { question: "What does the length() method of StringBuffer return?", options: ["The character capacity allocated", "The number of characters currently in the object", "The memory size in bytes", "The string font size"], answerIndex: 1 }
    ]
  },
  "java-e3-1": {
    pretest: [
      { question: "What is a class in Java?", options: ["An object instance", "A primitive type", "A blueprint or template for objects", "A compile method"], answerIndex: 2 },
      { question: "Which operator is used to create an instance of a class?", options: ["new", "dot (.)", "instanceof", "create"], answerIndex: 0 },
      { question: "What is an instance of a class called?", options: ["Reference", "Object", "Method", "Constructor"], answerIndex: 1 },
      { question: "Where is object memory allocated in Java?", options: ["Stack", "Heap", "Class Loader", "Registers"], answerIndex: 1 },
      { question: "Which operator is used to access members and methods of an object?", options: ["->", "dot (.)", "colon (:)", "comma (,)"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What is stored in a reference variable?", options: ["The actual object data", "The memory address of the object on the heap", "A static count", "The class bytecode"], answerIndex: 1 },
      { question: "Can a single class have multiple objects?", options: ["No, only one object per class", "Yes, multiple objects can be instantiated", "Only if it is abstract", "Only inside static methods"], answerIndex: 1 },
      { question: "What keyword refers to the current object instance?", options: ["super", "this", "current", "self"], answerIndex: 1 },
      { question: "If a class member is declared static, it belongs to:", options: ["The object instances", "The class itself, not any object instance", "The garbage collector", "The heap memory"], answerIndex: 1 },
      { question: "What is the lifecycle of an object with no references?", options: ["It stays in memory forever", "It is automatically backed up", "It becomes eligible for garbage collection", "It triggers NullPointerException immediately"], answerIndex: 2 }
    ]
  },
  "java-e3-2": {
    pretest: [
      { question: "Method overloading is an example of:", options: ["Compile-time Polymorphism", "Runtime Polymorphism", "Inheritance", "Abstraction"], answerIndex: 0 },
      { question: "Method overloading allows multiple methods to share the same name if:", options: ["Their return types are different", "Their parameter lists differ", "They are declared in different classes", "They have different access modifiers"], answerIndex: 1 },
      { question: "Which of the following does NOT overload a method?", options: ["Changing parameter types", "Changing number of parameters", "Changing the return type only", "Changing parameter ordering"], answerIndex: 2 },
      { question: "How does the compiler resolve overloaded methods?", options: ["By checking argument types and counts at compile-time", "By executing them sequentially at runtime", "By sorting them alphabetically", "By choosing the one with the smallest return type"], answerIndex: 0 },
      { question: "Can static methods be overloaded?", options: ["No, only instance methods", "Yes, they can be overloaded", "Only inside abstract classes", "Only if they have no return type"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Which method signature is overloaded compared to void print(int x)?", options: ["int print(int y)", "void print(double x)", "private void print(int a)", "static void print(int x)"], answerIndex: 1 },
      { question: "If overloaded methods differ only by parameter names (e.g. print(int a) vs print(int b)):", options: ["They compile fine", "Compilation error is raised due to duplicate method declaration", "They resolve at runtime", "They are treated as one method"], answerIndex: 1 },
      { question: "Can overloaded methods have different access modifiers?", options: ["No, must be same", "Yes, they can have different modifiers", "Only if return type is same", "Only if public"], answerIndex: 1 },
      { question: "Does Java support overloading of the main method?", options: ["No, main cannot be overloaded", "Yes, but JVM only runs public static void main(String[] args)", "Only if they are private", "Only on JavaFX platforms"], answerIndex: 1 },
      { question: "Overloading is also known as:", options: ["Late Binding", "Static Binding", "Dynamic dispatch", "Method hiding"], answerIndex: 1 }
    ]
  },
  "java-e3-3": {
    pretest: [
      { question: "What is the main purpose of a constructor?", options: ["To delete objects", "To execute methods", "To initialize object state", "To load packages"], answerIndex: 2 },
      { question: "A constructor name must match:", options: ["The class name exactly", "The method name", "Main method name", "package name"], answerIndex: 0 },
      { question: "What is the return type of a constructor?", options: ["void", "int", "It has no return type, not even void", "ClassName"], answerIndex: 2 },
      { question: "When is a constructor invoked?", options: ["When class is imported", "When an object is instantiated using 'new'", "When garbage collector runs", "When method is called"], answerIndex: 1 },
      { question: "What is a default constructor?", options: ["Constructor that prints messages", "A no-argument constructor inserted by the compiler if no constructors are written", "The first constructor in class", "Constructor returning null"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What happens if you write a parameterized constructor but no default constructor, then call new ClassName()?", options: ["It runs successfully using empty state", "Compilation error occurs", "It returns null", "It creates static instance"], answerIndex: 1 },
      { question: "Can a constructor be declared private?", options: ["No, constructors must be public", "Yes, to prevent instantiation from outside the class", "Only inside abstract classes", "Only if static"], answerIndex: 1 },
      { question: "A constructor can access instance fields using:", options: ["super keyword", "the 'this' keyword", "package identifier", "loader reference"], answerIndex: 1 },
      { question: "What is the primary difference between a constructor and a method?", options: ["A constructor lacks a return type and initializes state, whereas a method has a return type and performs actions", "A method has no parameters", "A constructor is always static", "A constructor runs only on stack memory"], answerIndex: 0 },
      { question: "Can a constructor be final or abstract?", options: ["Yes, to prevent override", "No, constructors cannot be final, static, or abstract", "Only inside interface definitions", "Only in JavaFX"], answerIndex: 1 }
    ]
  },
  "java-e3-4": {
    pretest: [
      { question: "What is constructor overloading?", options: ["Defining constructors with same signature", "Having multiple constructors in a class with different parameter lists", "Making constructor final", "Inheriting constructors from parent class"], answerIndex: 1 },
      { question: "Which constructor is called for Box b = new Box()?", options: ["The parameterized constructor", "The default/no-argument constructor", "Both constructors", "No constructor is called"], answerIndex: 1 },
      { question: "How does the compiler differentiate between overloaded constructors?", options: ["By check variable names", "By the number, type, and order of their parameters", "By their return types", "By access modifiers"], answerIndex: 1 },
      { question: "Can one constructor call another constructor in the same class?", options: ["No, not allowed", "Yes, using this()", "Yes, using super()", "Yes, calling constructor name"], answerIndex: 1 },
      { question: "Where must the this() call be located inside a constructor?", options: ["Anywhere inside body", "As the very first statement", "At the very end of body", "Only in catch block"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What is the advantage of constructor overloading?", options: ["Increases execution speed", "Allows initializing objects in multiple ways", "Saves stack memory", "Enables multithreading"], answerIndex: 1 },
      { question: "What happens if two overloaded constructors have identical parameter lists?", options: ["They compile fine", "Compilation error", "Resolved at runtime", "They run concurrently"], answerIndex: 1 },
      { question: "In Box(double w, double h, double d), variables w, h, and d are:", options: ["Global fields", "Local parameters", "Instance fields", "Static references"], answerIndex: 1 },
      { question: "Can a constructor call super() and this() in the same constructor?", options: ["Yes, in any order", "No, because both must be the first statement", "Only if super() is parameterized", "Only in interfaces"], answerIndex: 1 },
      { question: "If constructor A calls constructor B via this(), and constructor B calls A:", options: ["It creates recursive object", "Compilation error due to recursive constructor invocation", "Resolved at runtime", "Runs successfully"], answerIndex: 1 }
    ]
  },
  "java-e4-1": {
    pretest: [
      { question: "Which keyword is used to implement inheritance in Java?", options: ["implements", "extends", "inherits", "super"], answerIndex: 1 },
      { question: "In single inheritance, how many superclasses can a subclass have?", options: ["0", "Exactly one", "Multiple", "Unlimited"], answerIndex: 1 },
      { question: "Inheritance represents which type of relationship?", options: ["HAS-A relationship", "IS-A relationship", "uses-a relationship", "part-of relationship"], answerIndex: 1 },
      { question: "What is the class being inherited from called?", options: ["Subclass", "Superclass or Parent class", "Derived class", "Interface"], answerIndex: 1 },
      { question: "Which class members are NOT inherited by subclasses?", options: ["Public methods", "Protected variables", "Private members and constructors", "All fields are inherited"], answerIndex: 2 }
    ],
    posttest: [
      { question: "How does a child class access public methods of a parent class?", options: ["Cannot access", "Directly or using 'super' keyword", "Only via reflections", "Using this.parent()"], answerIndex: 1 },
      { question: "Does Java support multiple inheritance of classes?", options: ["Yes, using commas", "No, to prevent diamond problem conflicts", "Only for abstract classes", "Only inside final classes"], answerIndex: 1 },
      { question: "Which access modifier allows members to be visible only within the package and to subclasses?", options: ["private", "public", "protected", "default"], answerIndex: 2 },
      { question: "If a class is declared 'final':", options: ["It has no methods", "It cannot be inherited by any subclass", "All its methods are abstract", "It is stored on stack"], answerIndex: 1 },
      { question: "All classes in Java implicitly inherit from:", options: ["java.lang.String", "java.lang.Object", "java.lang.System", "java.util.Collection"], answerIndex: 1 }
    ]
  },
  "java-e4-2": {
    pretest: [
      { question: "What is multilevel inheritance?", options: ["A class extending multiple interfaces", "A class inherits from a subclass, forming an inheritance chain", "Multiple classes extending a single class", "Multiple classes with same package"], answerIndex: 1 },
      { question: "If Class C extends B, and B extends A, then:", options: ["C is subclass, A and B are parent classes", "C inherits B, B inherits A, C transitively inherits A", "A inherits B and C", "Compilation error occurs"], answerIndex: 1 },
      { question: "In multilevel inheritance, what is the order of constructor execution when instantiating the bottom-most subclass?", options: ["Subclass runs first", "Parent constructors execute first, from top of the chain down to the child subclass", "Random order", "Constructors run concurrently"], answerIndex: 1 },
      { question: "Which keyword refers to the immediate parent class?", options: ["this", "super", "parent", "class"], answerIndex: 1 },
      { question: "Can a class in a multilevel chain be declared final?", options: ["No, never", "Only if it is the bottom-most subclass", "Only if it is the grandparent", "Yes, any class can be final"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What is the order of constructor delegation when subclass C is instantiated?", options: ["C delegates to B, B delegates to A; then A's constructor runs, followed by B's, and then C's", "A delegates to B, B to C; C runs, B runs, A runs", "C runs immediately without delegation", "Delegation occurs at runtime randomly"], answerIndex: 0 },
      { question: "If class B overrides a method of class A, and class C inherits from B, which method does C call by default?", options: ["A's method", "B's overridden method", "C's own method", "It causes compiler ambiguity"], answerIndex: 1 },
      { question: "How many levels of inheritance are supported in a multilevel chain in Java?", options: ["Maximum 3", "Maximum 5", "There is no syntax limit, but excessive levels reduce readability", "Exactly 2"], answerIndex: 2 },
      { question: "Can a class in the chain hide parent fields?", options: ["No, not allowed", "Yes, by declaring fields with the same name, which can be accessed using 'super'", "Only if fields are private", "Only if static"], answerIndex: 1 },
      { question: "If C extends B and B extends A, B is the:", options: ["Grandparent class", "Subclass of A and Superclass of C", "Interface root", "Local variable"], answerIndex: 1 }
    ]
  },
  "java-e4-3": {
    pretest: [
      { question: "Which keyword is used to declare an abstract class?", options: ["interface", "abstract", "virtual", "implements"], answerIndex: 1 },
      { question: "Can you instantiate an abstract class directly using the 'new' keyword?", options: ["Yes, anytime", "No, it cannot be instantiated", "Only if it has no abstract methods", "Only inside same package"], answerIndex: 1 },
      { question: "What is an abstract method?", options: ["A method with private access", "A method declared without a body/implementation", "A method that is static", "A method returning null"], answerIndex: 1 },
      { question: "If a class contains at least one abstract method, the class must:", options: ["Be declared final", "Be declared abstract", "Be declared public", "Implement an interface"], answerIndex: 1 },
      { question: "Concrete subclasses extending an abstract class must:", options: ["Implement all abstract methods, or be declared abstract themselves", "Delete abstract methods", "Be declared private", "Have no constructors"], answerIndex: 0 }
    ],
    posttest: [
      { question: "Can an abstract class contain concrete (fully implemented) methods?", options: ["No, only abstract methods", "Yes, it can contain both abstract and concrete methods", "Only if static", "Only if private"], answerIndex: 1 },
      { question: "Can an abstract class have constructors?", options: ["No, constructors are not allowed", "Yes, to initialize fields for subclasses", "Only if package-private", "Only default constructors"], answerIndex: 1 },
      { question: "What is the primary purpose of an abstract class?", options: ["To speed up execution", "To serve as a template or common interface for subclasses", "To create anonymous types", "To replace interfaces"], answerIndex: 1 },
      { question: "Can abstract methods be declared private?", options: ["Yes, to protect them", "No, because subclasses must override them", "Only in final classes", "Only if static"], answerIndex: 1 },
      { question: "Can abstract methods be static?", options: ["Yes, to invoke without objects", "No, because they rely on dynamic subclass resolution", "Only in interfaces", "Only if public"], answerIndex: 1 }
    ]
  },
  "java-e5-1": {
    pretest: [
      { question: "What does the 'super' keyword reference?", options: ["The subclass object", "The immediate parent class object", "The JVM instance", "The main thread"], answerIndex: 1 },
      { question: "If a child class and parent class have variables with the same name, how does the child refer to the parent variable?", options: ["this.variableName", "super.variableName", "parent.variableName", "ClassName.variableName"], answerIndex: 1 },
      { question: "How does a subclass invoke a parent constructor?", options: ["parent()", "super()", "this()", "constructor()"], answerIndex: 1 },
      { question: "Where must the super() constructor call be located?", options: ["Anywhere in child constructor", "First line of the subclass constructor", "At the end of child constructor", "Only in display methods"], answerIndex: 1 },
      { question: "How does a subclass invoke an overridden parent method?", options: ["parent.methodName()", "super.methodName()", "this.methodName()", "methodName()"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What happens if a subclass constructor does not call super() or this()?", options: ["Compiler flags error", "The compiler automatically inserts super() to call the parent's default constructor", "Object remains uninitialized", "It crashes at runtime"], answerIndex: 1 },
      { question: "Can super be used inside a static method?", options: ["Yes, if public", "No, super cannot be used in static contexts", "Only in package classes", "Only to reference static fields"], answerIndex: 1 },
      { question: "If a parent class lacks a default constructor, the subclass constructor:", options: ["Cannot compile under any circumstances", "Must explicitly call super(...) passing arguments", "Defaults all variables to null", "Can skip parent initialization"], answerIndex: 1 },
      { question: "How many levels up the hierarchy does 'super' resolve?", options: ["All levels up to Object", "Directly to the immediate parent class", "Only 2 levels", "It is dynamic"], answerIndex: 1 },
      { question: "The super() call is used to:", options: ["Create a new parent object", "Pass initialization arguments to the parent class constructor", "Destroy parent fields", "Access static methods"], answerIndex: 1 }
    ]
  },
  "java-e5-2": {
    pretest: [
      { question: "Which keyword is used to declare an interface?", options: ["class", "interface", "implements", "package"], answerIndex: 1 },
      { question: "Which keyword does a class use to implement an interface?", options: ["extends", "implements", "uses", "import"], answerIndex: 1 },
      { question: "Can a class implement multiple interfaces?", options: ["No, only one", "Yes, separated by commas", "Only if it is abstract", "Only if interfaces have no methods"], answerIndex: 1 },
      { question: "By default, all variables in an interface are:", options: ["private static final", "public static final", "protected float", "public volatile"], answerIndex: 1 },
      { question: "By default, all methods in an interface (before Java 8) are implicitly:", options: ["private static", "public abstract", "protected final", "package-private"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Can an interface be instantiated?", options: ["Yes, using 'new'", "No, it can only be implemented by classes", "Only if it has default methods", "Only inside main method"], answerIndex: 1 },
      { question: "Java 8 introduced which type of interface methods with bodies?", options: ["abstract and native", "default and static methods", "private and final", "volatile and transient"], answerIndex: 1 },
      { question: "How does an interface help achieve multiple inheritance in Java?", options: ["By letting a class inherit specifications and default behaviors from multiple interfaces", "By merging multiple classes into one", "By bypassing JVM checks", "It does not help"], answerIndex: 0 },
      { question: "Interface methods overridden in a class must be declared:", options: ["protected", "public", "private", "default"], answerIndex: 1 },
      { question: "Marker interfaces are:", options: ["Interfaces with abstract static methods", "Interfaces with no fields or methods, used to tag classes", "Interfaces containing warnings", "Used to print screens"], answerIndex: 1 }
    ]
  },
  "java-e5-3": {
    pretest: [
      { question: "What is runtime polymorphism?", options: ["Overloading methods at compile time", "Overridden method calls resolved at runtime based on object type", "Hiding methods inside packages", "Declaring classes abstract"], answerIndex: 1 },
      { question: "What is method overriding?", options: ["Defining method with same name but different parameters", "Subclass defining a method with the same name and parameters as in parent class", "Calling parent method using super", "Overloading constructors"], answerIndex: 1 },
      { question: "Dynamic method dispatch resolves overridden methods using:", options: ["The type of reference variable", "The type of the actual object, not the reference variable", "Alphabetical sorting", "Access modifiers"], answerIndex: 1 },
      { question: "For method overriding, the overriding method in subclass:", options: ["Must be static", "Must have the same name, parameters, and compatible return type", "Must have private visibility", "Must throw unchecked exceptions only"], answerIndex: 1 },
      { question: "Which reference type allows runtime polymorphism?", options: ["Interface references only", "Parent class reference holding subclass objects", "Subclass reference holding parent objects", "Primitive types"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Can static methods be overridden?", options: ["Yes, dynamically", "No, they are hidden, not overridden", "Only if public", "Only inside interfaces"], answerIndex: 1 },
      { question: "What happens if subclass overrides print() and we execute: Parent p = new Child(); p.print()?", options: ["Parent's print() executes", "Child's print() executes", "NullPointerException is thrown", "It causes compiler error"], answerIndex: 1 },
      { question: "Can private or final methods be overridden?", options: ["Yes, anytime", "No, private and final methods cannot be overridden", "Only inside package classes", "Only in static classes"], answerIndex: 1 },
      { question: "Overriding is also known as:", options: ["Early Binding", "Late or Dynamic Binding", "Static dispatch", "Interface loading"], answerIndex: 1 },
      { question: "The overriding method access level must be:", options: ["More restrictive", "The same or broader than the parent method", "Always private", "Always public"], answerIndex: 1 }
    ]
  },
  "java-e6-1": {
    pretest: [
      { question: "What is an exception in Java?", options: ["A syntax error caught at compile time", "An unexpected event that disrupts normal execution flow", "A comment ignored by compiler", "A system reload"], answerIndex: 1 },
      { question: "Which keyword introduces a block of code to monitor for exceptions?", options: ["catch", "try", "throw", "finally"], answerIndex: 1 },
      { question: "Which block catches and handles exceptions thrown in try?", options: ["try", "catch", "throws", "finally"], answerIndex: 1 },
      { question: "What happens to subsequent try block code after an exception is thrown?", options: ["It continues to execute", "It is skipped", "It is compiled again", "It returns default value"], answerIndex: 1 },
      { question: "Which block executes cleanup code regardless of whether an exception occurred?", options: ["catch", "finally", "throws", "try"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What is the base class for all exceptions in Java?", options: ["java.lang.Exception", "java.lang.Throwable", "java.lang.Error", "java.lang.RuntimeException"], answerIndex: 1 },
      { question: "What exception is thrown by division by zero in integer arithmetic?", options: ["NullPointerException", "ArithmeticException", "NumberFormatException", "IOException"], answerIndex: 1 },
      { question: "Can a finally block execute if JVM exits via System.exit(0)?", options: ["Yes, always", "No, it terminates immediately", "Only if inside thread", "Only on Windows OS"], answerIndex: 1 },
      { question: "Can a try block exist without a catch or finally block?", options: ["Yes, standard try", "No, it must have at least one catch or finally", "Only inside main", "Only in static classes"], answerIndex: 1 },
      { question: "If an exception is not caught:", options: ["It is silently ignored", "Program terminates abnormally with stack trace", "It executes finally twice", "It retries the operation"], answerIndex: 1 }
    ]
  },
  "java-e6-2": {
    pretest: [
      { question: "Can a single try block be associated with multiple catch blocks?", options: ["No, only one catch block per try", "Yes, to handle different exceptions", "Only if finally is missing", "Only in abstract classes"], answerIndex: 1 },
      { question: "In what order must catch blocks be declared?", options: ["Generic exception classes first", "Subclass exception classes before superclass exception classes", "Random order", "Alphabetical order"], answerIndex: 1 },
      { question: "What happens if a superclass exception catch block is written before a subclass exception catch block?", options: ["It runs successfully", "Compilation error due to unreachable code", "It matches dynamically at runtime", "It throws ExceptionException"], answerIndex: 1 },
      { question: "When an exception occurs, how many catch blocks are executed?", options: ["All catches", "At most one", "Exactly two", "None"], answerIndex: 1 },
      { question: "What is multi-catch introduced in Java 7?", options: ["Running multiple catch blocks concurrently", "Catching multiple exceptions in a single catch block using '|'", "Defining multiple try blocks", "Generating multiple exceptions"], answerIndex: 1 }
    ],
    posttest: [
      { question: "If code throws NullPointerException, which catch matches: catch(Exception e) or catch(NullPointerException e) if both are valid?", options: ["catch(Exception e)", "The first one matched, which must be NullPointerException if ordered correctly", "Both run", "None match"], answerIndex: 1 },
      { question: "If an exception is caught by a catch block, does execution flow continue below the try-catch hierarchy?", options: ["No, it terminates", "Yes, normally", "It restarts try block", "It enters finally in loop"], answerIndex: 1 },
      { question: "If catch(ArithmeticException) and catch(ArrayIndexOutOfBoundsException) are defined, and code throws NullPointerException:", options: ["It enters ArithmeticException", "NullPointerException bypasses both and propagates up", "It enters both catches", "It throws compilation error"], answerIndex: 1 },
      { question: "What is the syntax of Java 7 multi-catch?", options: ["catch (ArithmeticException && NullPointerException e)", "catch (ArithmeticException | NullPointerException e)", "catch (ArithmeticException, NullPointerException e)", "catch (ArithmeticException or NullPointerException e)"], answerIndex: 1 },
      { question: "Order catches from specific to generic because:", options: ["It makes code run faster", "JVM checks matches sequentially from top to bottom", "Compiler requires specific formatting", "Unchecked exceptions are ignored"], answerIndex: 1 }
    ]
  },
  "java-e6-3": {
    pretest: [
      { question: "In which package are standard built-in exceptions like NullPointerException located?", options: ["java.io", "java.lang", "java.util", "java.sql"], answerIndex: 1 },
      { question: "What triggers a NullPointerException?", options: ["Dividing by zero", "Referencing members or invoking methods of a null object reference", "Accessing invalid array index", "Parsing bad string format"], answerIndex: 1 },
      { question: "What triggers a NumberFormatException?", options: ["Converting text to graphics", "Attempting to parse an invalid string format into a number", "Arithmetic overflow", "Empty reference accesses"], answerIndex: 1 },
      { question: "Which exception is thrown when an array is accessed with an invalid index?", options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "ArithmeticException", "IndexOutOfBoundsException"], answerIndex: 1 },
      { question: "Checked exceptions are checked at:", options: ["Runtime", "Compile-time", "Linking time", "Loader startup"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Unchecked exceptions extend which class?", options: ["Exception", "RuntimeException", "Error", "Throwable"], answerIndex: 1 },
      { question: "What exception is thrown by Integer.parseInt(\"abc\")?", options: ["NullPointerException", "NumberFormatException", "ArithmeticException", "IOException"], answerIndex: 1 },
      { question: "What is StringIndexOutOfBoundsException a subclass of?", options: ["RuntimeException", "IndexOutOfBoundsException", "Exception", "Error"], answerIndex: 1 },
      { question: "Checked exceptions must be:", options: ["Ignored", "Caught in try-catch or declared using throws", "Converted to unchecked", "Defined as static"], answerIndex: 1 },
      { question: "Which of these is an unchecked exception?", options: ["IOException", "NullPointerException", "SQLException", "ClassNotFoundException"], answerIndex: 1 }
    ]
  },
  "java-e6-4": {
    pretest: [
      { question: "How do you create a custom checked exception in Java?", options: ["Extend java.lang.Error class", "Extend java.lang.Exception class", "Extend java.lang.RuntimeException class", "Extend java.lang.Thread class"], answerIndex: 1 },
      { question: "How do you trigger an exception manually in code?", options: ["Use the throws keyword", "Use the throw keyword", "Use try catch blocks", "Call exception.trigger()"], answerIndex: 1 },
      { question: "Which keyword is used in a method signature to declare exceptions it might throw?", options: ["throw", "throws", "try", "catch"], answerIndex: 1 },
      { question: "How do you create a custom unchecked exception?", options: ["Extend Exception class", "Extend RuntimeException class", "Extend Throwable class", "Extend Error class"], answerIndex: 1 },
      { question: "How does a custom exception constructor pass its error message to the parent?", options: ["this(message)", "super(message)", "parent(message)", "Exception(message)"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What is the difference between throw and throws?", options: ["No difference", "throw is used to manually raise an exception, throws declares exceptions in method signatures", "throws is used inside methods", "throw must have class return types"], answerIndex: 1 },
      { question: "Can a custom exception class contain additional fields and methods?", options: ["No, exceptions must be empty", "Yes, it is a standard Java class", "Only if it is static", "Only if it is unchecked"], answerIndex: 1 },
      { question: "If a method throws a checked custom exception:", options: ["The code crashes", "The caller must catch it or declare it in its own throws clause", "It will run unchecked", "It requires final keywords"], answerIndex: 1 },
      { question: "What does throw new CustomException(\"Error\") do?", options: ["Declares exception parameters", "Instantiates CustomException and raises it immediately", "Catches matching errors", "Checks compiler rules"], answerIndex: 1 },
      { question: "What is the signature of a custom exception constructor passing message?", options: ["public MyException()", "public MyException(String message) { super(message); }", "void MyException(String m)", "static MyException(String m)"], answerIndex: 1 }
    ]
  },
  "java-e7-1": {
    pretest: [
      { question: "What is a thread in Java?", options: ["A file pointer", "A lightweight subprocess, a path of execution", "A memory address", "A layout pane"], answerIndex: 1 },
      { question: "What are the two ways to create a thread?", options: ["Extend Thread class or implement Runnable interface", "Extend Process class or implement Runnable interface", "Extend Runnable class or implement Thread interface", "Use JVM static threads"], answerIndex: 0 },
      { question: "Which method is overridden to define thread execution body?", options: ["start()", "run()", "execute()", "main()"], answerIndex: 1 },
      { question: "Which method is invoked to start thread execution concurrently?", options: ["run()", "start()", "init()", "execute()"], answerIndex: 1 },
      { question: "What happens if you call run() directly instead of start() on a Thread?", options: ["It starts a new thread", "The run method executes in the caller thread sequentially, no new thread is started", "It causes compiler parse error", "It halts JVM"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Which method suspends thread execution for a specified duration in milliseconds?", options: ["Thread.wait()", "Thread.sleep()", "Thread.suspend()", "Thread.stop()"], answerIndex: 1 },
      { question: "Thread.sleep() throws which checked exception?", options: ["NullPointerException", "InterruptedException", "IOException", "ThreadDeath"], answerIndex: 1 },
      { question: "Why is implementing Runnable preferred over extending Thread?", options: ["Allows running thread faster", "Leaves the subclass free to extend another class, promoting modularity", "Does not throw exceptions", "It is automatically static"], answerIndex: 1 },
      { question: "What thread executes the main method?", options: ["Daemon thread", "The main thread", "Garbage Collector thread", "UI Thread"], answerIndex: 1 },
      { question: "What is the state of a thread after start() is called but before scheduler runs it?", options: ["NEW", "RUNNABLE", "BLOCKED", "WAITING"], answerIndex: 1 }
    ]
  },
  "java-e7-2": {
    pretest: [
      { question: "What does the isAlive() method of the Thread class return?", options: ["Thread ID", "boolean indicating if thread has started and not terminated yet", "Thread name", "CPU usage percentage"], answerIndex: 1 },
      { question: "Which method blocks the current thread until the target thread terminates?", options: ["wait()", "join()", "sleep()", "yield()"], answerIndex: 1 },
      { question: "What exception can join() throw?", options: ["IOException", "InterruptedException", "SQLException", "IllegalThreadStateException"], answerIndex: 1 },
      { question: "If a thread has terminated, isAlive() returns:", options: ["true", "false", "NullPointerException", "0"], answerIndex: 1 },
      { question: "Calling join() is useful for:", options: ["Making threads run faster", "Coordinating sequence, waiting for worker thread output", "Creating background threads", "Locking variables"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Can you pass a timeout value to the join() method?", options: ["No, must wait forever", "Yes, to wait at most a specified number of milliseconds", "Only in JavaFX applications", "Only if it is daemon thread"], answerIndex: 1 },
      { question: "If join() is called on thread B from the main thread:", options: ["Thread B blocks until main completes", "Main thread blocks until B completes", "Both threads terminate", "It causes deadlock"], answerIndex: 1 },
      { question: "If thread B has already terminated and you call B.join():", options: ["It throws exception", "join returns immediately and doesn't block", "It blocks forever", "It restarts thread B"], answerIndex: 1 },
      { question: "Which state is a thread in while waiting inside join()?", options: ["RUNNABLE", "WAITING", "NEW", "BLOCKED"], answerIndex: 1 },
      { question: "What happens if you interrupt a thread waiting inside join()?", options: ["It continues waiting silently", "It throws InterruptedException", "It terminates JVM", "It returns default value"], answerIndex: 1 }
    ]
  },
  "java-e7-3": {
    pretest: [
      { question: "What is a daemon thread?", options: ["A high priority thread", "A background service provider thread", "A thread that cannot be stopped", "An interface specification"], answerIndex: 1 },
      { question: "Which method configures a thread as a daemon thread?", options: ["isDaemon()", "setDaemon(true)", "setDaemonThread()", "startDaemon()"], answerIndex: 1 },
      { question: "When must setDaemon(true) be called?", options: ["Anytime", "Before the thread is started with start()", "Inside run() method body", "After join() completes"], answerIndex: 1 },
      { question: "If you call setDaemon(true) after calling start():", options: ["It updates successfully", "IllegalThreadStateException is thrown", "The thread terminates", "It is ignored"], answerIndex: 1 },
      { question: "What happens to daemon threads when all user (non-daemon) threads complete?", options: ["They continue running", "JVM terminates them instantly and exits", "They turn into user threads", "They throw exceptions"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Which is a standard example of a daemon thread in Java?", options: ["Main thread", "Garbage Collector", "JavaFX Application thread", "JDBC Thread"], answerIndex: 1 },
      { question: "How do you check if a thread is a daemon thread?", options: ["thread.getDaemon()", "thread.isDaemon()", "thread.status()", "thread.checkDaemon()"], answerIndex: 1 },
      { question: "If a JVM has only daemon threads running:", options: ["It blocks", "It terminates immediately", "It enters infinite loops", "It throws Errors"], answerIndex: 1 },
      { question: "Do daemon threads prevent JVM from exiting?", options: ["Yes, always", "No, only user threads prevent exit", "Only on Windows platforms", "Only if sleep is called"], answerIndex: 1 },
      { question: "Daemon threads are generally used for:", options: ["Main business logic", "Background tasks like metrics collection, cleanup, or services", "Fast mathematical computations", "Rendering UI stages"], answerIndex: 1 }
    ]
  },
  "java-e7-4": {
    pretest: [
      { question: "What is the Producer-Consumer problem?", options: ["A compiler error", "Classic multi-process synchronization problem over a shared buffer", "An inheritance issue", "A JDBC connectivity issue"], answerIndex: 1 },
      { question: "Which keyword is used to lock object monitors and achieve thread-safe access?", options: ["volatile", "synchronized", "transient", "locked"], answerIndex: 1 },
      { question: "Which class methods are used for inter-thread communication?", options: ["sleep(), join()", "wait(), notify(), and notifyAll()", "start(), run()", "suspend(), resume()"], answerIndex: 1 },
      { question: "In which block or method can wait() and notify() be called?", options: ["Any method", "Inside synchronized blocks or methods only", "Inside run() method only", "Only inside constructor blocks"], answerIndex: 1 },
      { question: "What happens if wait() is called outside a synchronized context?", options: ["It works fine", "IllegalMonitorStateException is thrown", "It blocks the thread", "It causes compiler error"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What does wait() do to the invoking thread?", options: ["Suspends it for 1s", "Releases the lock monitor and enters the WAITING state", "Restarts the thread", "Terminates execution"], answerIndex: 1 },
      { question: "What does notify() do?", options: ["Wakes all threads", "Wakes up a single thread waiting on the object's monitor lock", "Deletes locks", "Sends console logs"], answerIndex: 1 },
      { question: "Why should wait() be called inside a loop checking conditions?", options: ["To make code look clean", "To protect against spurious wakeups", "To increase priority", "To save memory"], answerIndex: 1 },
      { question: "What is the difference between notify() and notifyAll()?", options: ["No difference", "notify wakes one waiting thread; notifyAll wakes all waiting threads", "notify is static; notifyAll is instance", "notifyAll runs in background"], answerIndex: 1 },
      { question: "Synchronization resolves:", options: ["Syntax errors", "Resource race conditions and thread interference", "Linker references", "Null pointers"], answerIndex: 1 }
    ]
  },
  "java-e8-1": {
    pretest: [
      { question: "What is a package in Java?", options: ["A compressed zip archive", "A folder-like container grouping related classes and interfaces", "A compilation command", "A GUI stage Layout"], answerIndex: 1 },
      { question: "Which keyword is used to place a class inside a package?", options: ["import", "package", "class", "namespace"], answerIndex: 1 },
      { question: "Where must the package statement be located in a source file?", options: ["Anywhere", "At the very top of the file, before imports", "After import statements", "Inside the class declaration"], answerIndex: 1 },
      { question: "Which keyword is used to access classes in other packages?", options: ["extends", "import", "package", "use"], answerIndex: 1 },
      { question: "If a class member has no access modifier (default), it is visible:", options: ["Everywhere", "Only within its own package", "Only inside the class", "To subclasses only"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What folder structure matches package mypack.subpack?", options: ["mypack_subpack/", "mypack/subpack/", "subpack/mypack/", "mypack.subpack/"], answerIndex: 1 },
      { question: "To import all classes in a package, use:", options: ["import packagename.?", "import packagename.*", "import packagename.all", "import packagename.classes"], answerIndex: 1 },
      { question: "What is package-private access?", options: ["private visibility", "Default access, visible only within the package", "protected visibility", "public visibility"], answerIndex: 1 },
      { question: "Can package names contain uppercase letters?", options: ["No, forbidden", "Yes, but convention is all lowercase to avoid conflicts with class names", "Only for JavaFX packages", "Only if it matches main class name"], answerIndex: 1 },
      { question: "How do packages prevent naming collisions?", options: ["By encrypting filenames", "By establishing distinct namespaces", "By restricting compilations", "By clearing references"], answerIndex: 1 }
    ]
  },
  "java-e8-2": {
    pretest: [
      { question: "What is the window container in JavaFX?", options: ["Scene", "Stage", "Node", "VBox"], answerIndex: 1 },
      { question: "What object represents UI content inside a Stage?", options: ["Stage", "Scene", "Node", "ImageView"], answerIndex: 1 },
      { question: "What is the graphical hierarchy of nodes in a Scene called?", options: ["Tree Map", "Scene Graph", "Visual layout", "Stack Pane"], answerIndex: 1 },
      { question: "Which class represents static text displays in JavaFX?", options: ["TextField", "Label", "Button", "TextLayout"], answerIndex: 1 },
      { question: "Which node is used to display graphics or images?", options: ["Label", "ImageView", "Canvas", "SceneGraph"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Which class must JavaFX main classes extend?", options: ["java.lang.Thread", "javafx.application.Application", "javafx.stage.Stage", "javafx.scene.Scene"], answerIndex: 1 },
      { question: "Which method is overridden to initialize the primary stage?", options: ["main()", "start(Stage primaryStage)", "init()", "show()"], answerIndex: 1 },
      { question: "What layout pane organizes child nodes vertically in a single column?", options: ["HBox", "VBox", "GridPane", "StackPane"], answerIndex: 1 },
      { question: "How do you display a Stage window?", options: ["stage.display()", "stage.show()", "stage.open()", "stage.setVisible(true)"], answerIndex: 1 },
      { question: "Every node in a Scene Graph has:", options: ["Multiple parent nodes", "Exactly one parent, except the root node", "No parent nodes", "At least one child node"], answerIndex: 1 }
    ]
  },
  "java-e8-3": {
    pretest: [
      { question: "GUI interactions wait for events in a model called:", options: ["Sequential programming", "Event-Driven Programming", "Concurrent loops", "Functional logic"], answerIndex: 1 },
      { question: "Which component allows text input in JavaFX?", options: ["Label", "TextField", "Slider", "Button"], answerIndex: 1 },
      { question: "Which component allows selecting values along a range?", options: ["TextField", "Slider", "ComboBox", "Label"], answerIndex: 1 },
      { question: "Which interface represents event listeners in JavaFX?", options: ["ActionListener", "EventHandler", "EventListener", "ActionHandler"], answerIndex: 1 },
      { question: "Which method registers action event listeners on a Button?", options: ["addListener()", "setOnAction()", "registerListener()", "click()"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Event listeners can be written compactly using:", options: ["Indentation", "Java 8 Lambda expressions", "Nested classes", "String builders"], answerIndex: 1 },
      { question: "What event parameter is passed to button action handlers?", options: ["EventObject", "ActionEvent", "MouseEvent", "WindowEvent"], answerIndex: 1 },
      { question: "How do you read text from a TextField?", options: ["textField.read()", "textField.getText()", "textField.value()", "textField.toString()"], answerIndex: 1 },
      { question: "How do you convert TextField input text into a double?", options: ["Double.valueOf(text)", "Double.parseDouble(text)", "(double)text", "Double.convert(text)"], answerIndex: 1 },
      { question: "Event handlers are executed on which thread?", options: ["Main Thread", "JavaFX Application Thread", "Background Worker Thread", "Compiler Thread"], answerIndex: 1 }
    ]
  },
  "java-e9-1": {
    pretest: [
      { question: "What does JDBC stand for?", options: ["Java Data Block Controller", "Java Database Connectivity", "Java Database Connection Class", "Joint Database Connector"], answerIndex: 1 },
      { question: "Which class is used to load drivers and open connection sessions?", options: ["Connection", "DriverManager", "Statement", "SQLClient"], answerIndex: 1 },
      { question: "Which interface represents an active database session?", options: ["DriverManager", "Connection", "Statement", "ResultSet"], answerIndex: 1 },
      { question: "Which exception must be caught when dealing with JDBC APIs?", options: ["IOException", "SQLException", "DatabaseException", "RuntimeException"], answerIndex: 1 },
      { question: "What is the standard driver class name for MySQL?", options: ["mysql.Driver", "com.mysql.cj.jdbc.Driver", "jdbc.mysql.Driver", "com.mysql.Driver"], answerIndex: 1 }
    ],
    posttest: [
      { question: "Which method establishes a connection using a URL, username, and password?", options: ["DriverManager.connect()", "DriverManager.getConnection()", "Connection.open()", "Class.forName()"], answerIndex: 1 },
      { question: "What is Class.forName() used for in JDBC?", options: ["To compile SQL queries", "To dynamically load and register the JDBC driver class", "To check connection states", "To import packages"], answerIndex: 1 },
      { question: "In JDBC URL jdbc:mysql://localhost:3306/db, 3306 is the:", options: ["IP address", "Database port number", "Driver version", "User count limit"], answerIndex: 1 },
      { question: "JDBC classes and interfaces are located in which package?", options: ["java.io", "java.sql", "java.util", "java.net"], answerIndex: 1 },
      { question: "Closing connection objects is important to:", options: ["Compile code faster", "Free database resource connections", "Format variables", "Reset passwords"], answerIndex: 1 }
    ]
  },
  "java-e9-2": {
    pretest: [
      { question: "Which interface is used to run static SQL statements in JDBC?", options: ["Connection", "Statement", "ResultSet", "PreparedStatement"], answerIndex: 1 },
      { question: "Which SQL command category includes INSERT?", options: ["DDL", "DML - Data Manipulation Language", "DCL", "TCL"], answerIndex: 1 },
      { question: "Which Statement method is executed for SQL INSERT statements?", options: ["executeQuery()", "executeUpdate()", "executeSelect()", "executeDML()"], answerIndex: 1 },
      { question: "What does executeUpdate() return for an INSERT query?", options: ["A boolean", "An integer representing the number of rows affected", "ResultSet", "null"], answerIndex: 1 },
      { question: "Which interface is pre-compiled and safer against SQL Injection?", options: ["Statement", "PreparedStatement", "ResultSet", "Connection"], answerIndex: 1 }
    ],
    posttest: [
      { question: "If executeUpdate() returns 0 for an INSERT query:", options: ["The database crashed", "No rows were inserted", "1 row was inserted", "It compiled with errors"], answerIndex: 1 },
      { question: "How do you execute an insert statement?", options: ["stmt.executeQuery(\"INSERT INTO...\")", "stmt.executeUpdate(\"INSERT INTO...\")", "stmt.executeInsert(\"INSERT INTO...\")", "stmt.run(\"INSERT INTO...\")"], answerIndex: 1 },
      { question: "How do you set query parameters in PreparedStatement?", options: ["Using raw strings", "Using setInt, setString, etc.", "Using placeholders %s", "Using indexes of array"], answerIndex: 1 },
      { question: "What exception is raised if an insert violates a primary key constraint?", options: ["NullPointerException", "SQLException", "ArithmeticException", "PrimaryConstraintError"], answerIndex: 1 },
      { question: "The executeUpdate() method is used for:", options: ["SELECT statements only", "INSERT, UPDATE, and DELETE statements", "Creating databases only", "Establishing connections"], answerIndex: 2 }
    ]
  },
  "java-e9-3": {
    pretest: [
      { question: "Which Statement method is executed for SQL DELETE statements?", options: ["executeQuery()", "executeUpdate()", "executeDelete()", "stmtDelete()"], answerIndex: 1 },
      { question: "What does executeUpdate() return for a DELETE query?", options: ["Always 0", "The number of rows matched and deleted", "ResultSet", "true"], answerIndex: 1 },
      { question: "If you run DELETE FROM student without a WHERE clause:", options: ["It throws exception", "All rows in the table are deleted", "No rows are deleted", "It deletes first row"], answerIndex: 1 },
      { question: "Which SQL statement is used to remove database rows?", options: ["REMOVE", "DELETE", "DROP", "TRUNCATE"], answerIndex: 1 },
      { question: "Statement objects are created using which method?", options: ["new Statement()", "connection.createStatement()", "DriverManager.createStatement()", "Class.createStatement()"], answerIndex: 1 }
    ],
    posttest: [
      { question: "What happens if you run a DELETE statement where the WHERE clause matches no rows?", options: ["SQLException is thrown", "executeUpdate returns 0, no rows are deleted", "The program crashes", "It deletes all rows"], answerIndex: 1 },
      { question: "How do you close a Statement object?", options: ["statement.delete()", "statement.close()", "statement.exit()", "statement.disconnect()"], answerIndex: 1 },
      { question: "Can you execute a DELETE statement using a PreparedStatement?", options: ["No, only Statement", "Yes, using executeUpdate()", "Only if it is dynamic", "Only inside packages"], answerIndex: 1 },
      { question: "In JDBC, executing SQL statements can throw which checked exception?", options: ["IOException", "SQLException", "IllegalAccessException", "ClassCastException"], answerIndex: 1 },
      { question: "Which method executes queries that return tables of data (like SELECT)?", options: ["executeUpdate()", "executeQuery()", "executeDML()", "executeTable()"], answerIndex: 1 }
    ]
  }
};

// 1. Modify src/lib/java-data.ts locally
function injectQuestionsLocally() {
  const javaDataPath = path.resolve('src/lib/java-data.ts');
  console.log("Reading java-data.ts...");
  let content = fs.readFileSync(javaDataPath, 'utf8');

  for (const [expId, questions] of Object.entries(questionBank)) {
    console.log(`Injecting local questions for ${expId}...`);
    
    // Find the index of the experiment
    const expIdIndex = content.indexOf(`id: "${expId}"`);
    if (expIdIndex === -1) {
      console.warn(`Warning: Experiment ${expId} not found in java-data.ts!`);
      continue;
    }
    
    // Find the next experiment index to bound our search
    let nextExpIndex = content.indexOf('id: "java-e', expIdIndex + 20);
    if (nextExpIndex === -1) {
      nextExpIndex = content.length;
    }
    
    // Search for pretest: [], within the bounds of this experiment block
    const block = content.substring(expIdIndex, nextExpIndex);
    const pretestRelativeIndex = block.indexOf('pretest: [],');
    if (pretestRelativeIndex === -1) {
      console.warn(`Warning: pretest: [], not found for ${expId}`);
      continue;
    }
    const pretestIndex = expIdIndex + pretestRelativeIndex;
    
    // Format pretest questions
    const formattedPretest = 'pretest: [\n' + questions.pretest.map(q => 
      `              { question: ${JSON.stringify(q.question)}, options: ${JSON.stringify(q.options)}, answerIndex: ${q.answerIndex} }`
    ).join(',\n') + '\n            ],';
    
    // Replace pretest: [],
    content = content.slice(0, pretestIndex) + formattedPretest + content.slice(pretestIndex + 'pretest: [],'.length);
    
    // Find posttest again in the newly updated content
    // Recompute bounds since content length changed
    const newExpIdIndex = content.indexOf(`id: "${expId}"`);
    let newNextExpIndex = content.indexOf('id: "java-e', newExpIdIndex + 20);
    if (newNextExpIndex === -1) {
      newNextExpIndex = content.length;
    }
    
    const newBlock = content.substring(newExpIdIndex, newNextExpIndex);
    const posttestRelativeIndex = newBlock.indexOf('posttest: [],');
    if (posttestRelativeIndex === -1) {
      console.warn(`Warning: posttest: [], not found for ${expId}`);
      continue;
    }
    const posttestIndex = newExpIdIndex + posttestRelativeIndex;
    
    const formattedPosttest = 'posttest: [\n' + questions.posttest.map(q => 
      `              { question: ${JSON.stringify(q.question)}, options: ${JSON.stringify(q.options)}, answerIndex: ${q.answerIndex} }`
    ).join(',\n') + '\n            ],';
    
    content = content.slice(0, posttestIndex) + formattedPosttest + content.slice(posttestIndex + 'posttest: [],'.length);
  }

  fs.writeFileSync(javaDataPath, content, 'utf8');
  console.log("java-data.ts updated successfully with real Java questions.");
}

// 2. Synchronize to Supabase
async function syncToSupabase() {
  // Parse .env manually
  const envText = fs.readFileSync('.env', 'utf8');
  const env: Record<string, string> = {};
  envText.split(/\r?\n/).forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });

  const supabaseUrl = env['VITE_SUPABASE_URL'];
  const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase env variables!");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  console.log("Deleting existing java questions in Supabase...");
  const { error: deleteError } = await supabase
    .from('questions')
    .delete()
    .eq('course_id', 'java');

  if (deleteError) {
    console.error("Error deleting old java questions:", deleteError.message);
    process.exit(1);
  }
  console.log("Successfully deleted old java questions.");

  const rows: any[] = [];
  for (const [expId, questions] of Object.entries(questionBank)) {
    questions.pretest.forEach(q => {
      rows.push({
        course_id: 'java',
        experiment_id: expId,
        type: 'pretest',
        question: q.question,
        options: q.options,
        answer_index: q.answerIndex
      });
    });
    
    questions.posttest.forEach(q => {
      rows.push({
        course_id: 'java',
        experiment_id: expId,
        type: 'posttest',
        question: q.question,
        options: q.options,
        answer_index: q.answerIndex
      });
    });
  }

  console.log(`Inserting ${rows.length} java questions into Supabase...`);
  
  // Insert in batches of 100
  const batchSize = 100;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error: insertError } = await supabase
      .from('questions')
      .insert(batch);

    if (insertError) {
      console.error(`Error inserting batch starting at index ${i}:`, insertError.message);
      process.exit(1);
    }
    console.log(`Inserted batch ${i} to ${Math.min(i + batchSize, rows.length)}`);
  }

  console.log("Successfully synchronized all java questions to Supabase!");
}

async function run() {
  injectQuestionsLocally();
  await syncToSupabase();
}

run();
