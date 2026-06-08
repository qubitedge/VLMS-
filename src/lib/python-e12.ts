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
          { question: "What is a class in Python?", options: ["A function that returns multiple values", "A blueprint or template for creating objects", "An instance of an object", "A built-in data type"], answerIndex: 1, hint: "Classes define structural layouts and behaviors." },
          { question: "Which method acts as the constructor in Python classes?", options: ["__init__()", "__new__()", "constructor()", "init()"], answerIndex: 0, hint: "It begins and ends with double underscores (dunder)." },
          { question: "What does the 'self' parameter represent in a class method?", options: ["The parent class", "The current class definition", "The current object instance", "A global variable module"], answerIndex: 2, hint: "It refers to the object on which the method is called." },
          { question: "How do you instantiate an object of class Student in Python?", options: ["Student s = new Student()", "s = Student()", "s = new Student", "s = create(Student)"], answerIndex: 1, hint: "Python does not use the 'new' keyword; it calls the class like a function." },
          { question: "Which variables are shared among all instances of a class?", options: ["Instance variables", "Class variables", "Local variables", "Global variables"], answerIndex: 1, hint: "These are declared directly in the class body, outside methods." }
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
          { question: "What is the output of: s1 = Student('A', 10); print(hasattr(s1, 'name'))?", options: ["True", "False", "Error", "None"], answerIndex: 0, hint: "The hasattr() function checks if an object has a given attribute name." },
          { question: "How can you delete an attribute from an object in Python?", options: ["delete s1.name", "del s1.name", "s1.name = None", "remove(s1.name)"], answerIndex: 1, hint: "Python uses the del statement to remove bindings." },
          { question: "What does the __str__() method do in a class?", options: ["Converts the class to a string representation for printing", "Destroys the class string", "Checks if string variables exist", "None of these"], answerIndex: 0, hint: "It controls how print(object) behaves." },
          { question: "Which of the following functions can be used to check if an object is an instance of a specific class?", options: ["type()", "isinstance()", "issubclass()", "hasclass()"], answerIndex: 1, hint: "It checks instance-to-class relationship." },
          { question: "What does calling a class name like Student() directly do?", options: ["Runs the class definition again", "Calls the constructor (__init__) and returns a new object", "Raises TypeError", "Deletes all objects of that class"], answerIndex: 1, hint: "It initiates instantiation, invoking the constructor." }
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
