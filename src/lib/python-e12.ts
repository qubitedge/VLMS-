import type { Week } from "./course-data";

export const pythonExercise12: Week = {
  title: "EXERCISE 12",
  objective: "Understanding Object-Oriented Programming (OOP) principles, defining classes, initializing attributes using __init__, and creating/manipulating objects.",
  tutorial: "Tutorial 12: Classes and Objects",
  labTitle: "Lab 12: Classes and Objects",
  experiments: [
    {
      id: "py-e12-1",
      title: "Classes and Objects",
      desc: "Write a Python program to define a class 'Student' with attributes (name, age, grade), a constructor, and methods to display details and check eligibility.",
      expected: "Student: Alice, Age: 20, Grade: A\nEligible for exam: True",
      content: {
        aim: {
          text: "In this experiment the student will study the Object-Oriented Programming (OOP) paradigm. They will define classes as blueprints, instantiate objects from those classes, write constructor methods using __init__ to set instance properties, define instance methods, and manipulate object attributes.",
          bullets: [
            "Explain OOP concepts: classes, objects, attributes, methods, encapsulation",
            "Define classes using the class keyword",
            "Initialize object instances using the constructor method __init__()",
            "Understand the self parameter, representing the current instance of the object",
            "Differentiate between instance variables (unique to each instance) and class variables (shared among all instances)"
          ]
        },
        theory: [
          {
            title: "Introduction to OOP",
            body: [
              "Object-Oriented Programming is a programming paradigm that uses 'objects' to represent data and methods. It aims to implement real-world entities like inheritance, polymorphism, encapsulation, and abstraction in programming.",
              "A Class is a user-defined blueprint or prototype from which objects are created. It groups data and behaviors together.",
              "An Object is an instance of a class. It has state (attributes) and behavior (methods)."
            ]
          },
          {
            title: "Constructors and self",
            body: [
              "The __init__ method is a special method (constructor) that Python automatically calls when a new instance of a class is created. It is used to initialize the object's attributes.",
              "Syntax: def __init__(self, arg1, arg2):",
              "The self parameter is a reference to the current instance of the class and is used to access variables that belong to the class. It must be the first parameter of any instance method, although it is not passed explicitly when calling the method."
            ]
          },
          {
            title: "Instance vs Class Attributes",
            body: [
              "Instance variables: Variables defined inside methods (usually the constructor) using self. They are specific to each object instance (e.g., student name).",
              "Class variables: Variables defined directly inside the class body but outside any methods. They are shared by all instances of the class (e.g., school name)."
            ]
          }
        ],
        pretest: [
            { question: "What does OOP stand for?", options: ["Object-Oriented Programming", "Object Operating Program", "Operating Object Process", "Object Output Programming"], answerIndex: 0 },
            { question: "What is OOP primarily based on?", options: ["Functions", "Objects and Classes", "Loops", "Modules"], answerIndex: 1 },
            { question: "What is a class in Python?", options: ["An instance of an object", "A blueprint for creating objects", "A variable type", "A loop structure"], answerIndex: 1 },
            { question: "What is an object?", options: ["A package", "A module", "An instance of a class", "A function"], answerIndex: 2 },
            { question: "Which of the following is a key concept of OOP?", options: ["Encapsulation", "Inheritance", "Polymorphism", "All of the above"], answerIndex: 3 },
            { question: "Which method acts as a constructor in Python?", options: ["main()", "start()", "init()", "create()"], answerIndex: 2 },
            { question: "When is the init() method called?", options: ["When the program starts", "When a class is defined", "When an object is created", "When a function is called"], answerIndex: 2 },
            { question: "What is the purpose of a constructor?", options: ["Delete objects", "Initialize object attributes", "Import modules", "Create loops"], answerIndex: 1 },
            { question: "Which parameter must be the first parameter of an instance method?", options: ["this", "obj", "self", "cls"], answerIndex: 2 },
            { question: "What does self represent?", options: ["The class itself", "The current instance of the class", "A global variable", "A package"], answerIndex: 1 },
            { question: "Which keyword is used to create a class?", options: ["object", "define", "class", "new"], answerIndex: 2 },
            { question: "What is the correct syntax to define a class?", options: ["Correct", "Syntax Error", "Runtime Error", "Logical Error"], answerIndex: 0 },
            { question: "Which statement creates an object of class Student?", options: ["Student = obj()", "obj.Student()", "obj = Student()", "create Student()"], answerIndex: 2 },
            { question: "What are attributes in OOP?", options: ["Methods of a class", "Data associated with an object", "Loops inside a class", "Imported modules"], answerIndex: 1 },
            { question: "What are methods in OOP?", options: ["Variables", "Data types", "Functions defined inside a class", "Packages"], answerIndex: 2 },
          ],
        procedure: [
          "Read the Aim and Theory to understand OOP concepts, class declarations, constructors, and instance methods",
          "Differentiate between class variables and instance variables",
          "Observe how methods access instance attributes using self.attribute",
          "Go to Simulation tab and click Start",
          "Step through the object instantiation and method calls using Next",
          "Observe how the object is allocated in memory and how self binds to it in the Memory State panel",
          "Go to Code Test tab and run the starter program",
          "Verify the outputs of the Student attributes and eligibility checker",
          "Modify the script to add an attribute marks (list) and write a method to calculate the average mark",
          "Write a program that uses a class variable to track the total number of Student objects created",
          "Implement a method that updates a student's grade based on their marks",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Classes and Objects Simulation\nclass Student:\n    school = 'Virtual Lab High'\n    \n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n        \n    def get_details(self):\n        return f'{self.name} is {self.age} years old.'\n\ns1 = Student('Alice', 20)\ndetails = s1.get_details()",
          steps: [
            { line: 2, annotation: "class Student: defines class Student in global namespace", memory: [{ variable: "Student", type: "class", value: "<class '__main__.Student'>" }], output: "" },
            { line: 3, annotation: "school = 'Virtual Lab High' — defines class-level variable", memory: [], output: "" },
            { line: 5, annotation: "def __init__(...): registers constructor method in class namespace", memory: [], output: "" },
            { line: 9, annotation: "def get_details(...): registers instance method in class namespace", memory: [], output: "" },
            { line: 12, annotation: "s1 = Student('Alice', 20) — triggers __init__. self binds to new object.", memory: [{ variable: "s1", type: "Student", value: "<Student object at 0x7f8>" }], output: "" },
            { line: 6, annotation: "self.name = 'Alice' — sets instance attribute 'name'", memory: [{ variable: "s1.name", type: "str", value: "'Alice'" }], output: "" },
            { line: 7, annotation: "self.age = 20 — sets instance attribute 'age'", memory: [{ variable: "s1.name", type: "str", value: "'Alice'" }, { variable: "s1.age", type: "int", value: "20" }], output: "" },
            { line: 13, annotation: "details = s1.get_details() — calls method. self refers to s1.", memory: [{ variable: "details", type: "str", value: "'Alice is 20 years old.'" }], output: "" }
          ]
        },
        posttest: [
            { question: "Which code correctly defines an instance variable?", options: ["self.name = name", "name.self = name", "name = self.name", "self = name"], answerIndex: 0 },
            { question: "Instance variables are:", options: ["Shared among all objects", "Specific to each object", "Global variables", "Constants"], answerIndex: 1 },
            { question: "Where are instance variables usually defined?", options: ["Outside the class", "In the constructor (init)", "In a package", "In a loop"], answerIndex: 1 },
            { question: "What is a class variable?", options: ["Variable shared by all instances", "Variable inside a function", "Variable inside a loop", "Local variable"], answerIndex: 0 },
            { question: "Where is a class variable defined?", options: ["Inside init()", "Inside a method", "Directly inside the class body", "Inside a package"], answerIndex: 2 },
            { question: "What is the output?", options: ["ABC School", "school", "Error", "None"], answerIndex: 0 },
            { question: "Which statement about class variables is TRUE?", options: ["Each object gets a separate copy", "Shared among all objects", "Cannot store strings", "Must use self"], answerIndex: 1 },
            { question: "What is the output?", options: ["Student", "name", "John", "Error"], answerIndex: 2 },
            { question: "Which statement accesses an instance variable?", options: ["self.name", "Student.name", "class.name", "instance.self"], answerIndex: 0 },
            { question: "What is encapsulation?", options: ["Wrapping data and methods together in a class", "Creating loops", "Importing packages", "Handling exceptions"], answerIndex: 0 },
            { question: "Which OOP feature allows code reuse through parent-child relationships?", options: ["Abstraction", "Encapsulation", "Inheritance", "Iteration"], answerIndex: 2 },
            { question: "Which OOP feature means \"many forms\"?", options: ["Encapsulation", "Abstraction", "Polymorphism", "Inheritance"], answerIndex: 2 },
            { question: "Which OOP feature hides implementation details?", options: ["Inheritance", "Abstraction", "Looping", "Slicing"], answerIndex: 1 },
            { question: "What is the state of an object?", options: ["Its imported modules", "Its attributes/data", "Its loops", "Its package structure"], answerIndex: 1 },
            { question: "What is the behavior of an object?", options: ["Its methods/functions", "Its variables", "Its modules", "Its files"], answerIndex: 0 },
          ],
        references: [
          "Python Tutorial — Classes: https://docs.python.org/3/tutorial/classes.html",
          "W3Schools Python Classes: https://www.w3schools.com/python/python_classes.asp",
          "Lutz M., Learning Python, 5th Edition"
        ]
      }
    }
  ]
};
