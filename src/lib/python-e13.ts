import type { Week } from "./course-data";

export const pythonExercise13: Week = {
  title: "EXERCISE 13",
  objective: "Implementing inheritance (single and multiple) to reuse code, method overriding to achieve polymorphism, and using super() to access parent methods.",
  tutorial: "Tutorial 13: Inheritance and Polymorphism",
  labTitle: "Lab 13: Inheritance and Polymorphism",
  experiments: [
    {
      id: "py-e13-1",
      title: "Inheritance and Polymorphism",
      desc: "Write a Python program to define a base class 'Animal' and a subclass 'Dog' that overrides the 'speak' method, and demonstrate method calling via super().",
      expected: "Animal: Buddy\nDog speaks: Woof!\nAnimal sound from super(): Some generic sound",
      content: {
        aim: {
          text: "In this experiment the student will explore advanced Object-Oriented concepts: inheritance and polymorphism. They will create class hierarchies, override parent methods in subclasses to customize behaviors, and invoke parent implementations using the super() function.",
          bullets: [
            "Create derived subclasses from parent base classes to inheritance attributes and methods",
            "Implement method overriding where a subclass provides its own version of a parent method",
            "Call parent class methods from within subclass methods using the super() function",
            "Demonstrate polymorphism by writing code that processes different object types through a shared interface",
            "Differentiate between single, multiple, and multilevel inheritance"
          ]
        },
        theory: [
          {
            title: "Inheritance",
            body: [
              "Inheritance allows a new class (subclass/child class) to inherit attributes and methods from an existing class (superclass/parent class). It promotes code reusability.",
              "Syntax: class Subclass(ParentClass):",
              "Types of inheritance:",
              "Single Inheritance: A subclass inherits from a single parent class.",
              "Multilevel Inheritance: A subclass inherits from another subclass (e.g. Grandchild -> Child -> Parent).",
              "Multiple Inheritance: A subclass inherits from more than one parent class (e.g. Child(Parent1, Parent2))."
            ]
          },
          {
            title: "Method Overriding and Polymorphism",
            body: [
              "Method Overriding: Occurs when a subclass defines a method with the same name and signature as a method in its parent class. The subclass method overrides the parent's version during execution on subclass instances.",
              "Polymorphism: The word means 'many forms'. In OOP, it refers to the ability of different classes to respond to the same method call in their own unique way."
            ]
          },
          {
            title: "The super() Function",
            body: [
              "The super() function returns a temporary object of the parent class, allowing you to call its methods inside the child class.",
              "This is commonly used in subclass constructors to ensure the parent class constructor is executed: super().__init__(name)"
            ]
          }
        ],
        pretest: [
            { question: "What is inheritance in Python?", options: ["Creating variables inside functions", "A mechanism where a class acquires properties of another class", "A type of loop", "A file handling technique"], answerIndex: 1 },
            { question: "What is the class being inherited from called?", options: ["Child Class", "Subclass", "Parent Class", "Object Class"], answerIndex: 2 },
            { question: "What is the class that inherits called?", options: ["Parent Class", "Base Class", "Superclass", "Child Class"], answerIndex: 3 },
            { question: "Which syntax correctly represents inheritance?", options: ["Correct", "Syntax Error", "Runtime Error", "Logical Error"], answerIndex: 0 },
            { question: "What is the primary benefit of inheritance?", options: ["Faster execution", "Code reusability", "Less memory usage", "Automatic debugging"], answerIndex: 1 },
            { question: "How many parent classes are involved in Single Inheritance?", options: ["0", "1", "2", "Multiple"], answerIndex: 1 },
            { question: "Which inheritance type follows Parent \u2192 Child \u2192 Grandchild?", options: ["Multiple Inheritance", "Hybrid Inheritance", "Multilevel Inheritance", "Single Inheritance"], answerIndex: 2 },
            { question: "Which inheritance type allows a child class to inherit from more than one parent?", options: ["Single Inheritance", "Multilevel Inheritance", "Multiple Inheritance", "Hierarchical Inheritance"], answerIndex: 2 },
            { question: "What is a superclass?", options: ["Another name for parent class", "A module", "A package", "A variable"], answerIndex: 0 },
            { question: "What is a subclass?", options: ["A loop", "A child class", "A package", "A function"], answerIndex: 1 },
            { question: "What is method overriding?", options: ["Creating a new variable", "Redefining a parent class method in the child class", "Deleting a parent method", "Importing a module"], answerIndex: 1 },
            { question: "For method overriding to occur, the child method must have:", options: ["Same name and signature as parent method", "Different name", "No parameters", "Only one parameter"], answerIndex: 0 },
            { question: "Which method is executed when an overridden method is called on a child object?", options: ["Parent method always", "Child method", "Both methods automatically", "None"], answerIndex: 1 },
            { question: "What is polymorphism?", options: ["Multiple loops in a program", "Many variables in a class", "Ability of different classes to respond differently to the same method call", "Multiple inheritance only"], answerIndex: 2 },
            { question: "The word \"Polymorphism\" means:", options: ["Single Form", "Many Forms", "Multiple Variables", "Multiple Classes"], answerIndex: 1 },
          ],
        procedure: [
          "Read the Aim and Theory to understand inheritance structures, method overriding, polymorphism, and super()",
          "Note the syntax for defining subclass hierarchies: class Child(Parent):",
          "Understand how super().__init__(...) passes initialization arguments to the parent constructor",
          "Go to Simulation tab and click Start",
          "Step through the parent and subclass code using Next",
          "Observe how attributes from parent classes are set on subclass instances in the Memory State panel",
          "Trace how method overriding routes the call to the child's method",
          "Go to Code Test tab and run the script",
          "Verify the outputs match the animal and dog details",
          "Modify the script to define a class 'Cat' that also inherits from 'Animal' and overrides 'speak()' to print 'Meow'",
          "Create a function that takes an animal object and calls its speak method, passing both Dog and Cat instances to demonstrate polymorphism",
          "Implement multilevel inheritance: Animal -> Mammal -> Dog, verifying constructor chaining",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Inheritance Simulation\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return 'Some generic sound'\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\n    def speak(self):\n        return 'Woof!'\n\nd = Dog('Buddy', 'Labrador')\nsound = d.speak()",
          steps: [
            { line: 2, annotation: "class Animal: defines base class", memory: [{ variable: "Animal", type: "class", value: "<class '__main__.Animal'>" }], output: "" },
            { line: 7, annotation: "class Dog(Animal): defines subclass inheriting from Animal", memory: [{ variable: "Dog", type: "class", value: "<class '__main__.Dog'>" }], output: "" },
            { line: 13, annotation: "d = Dog('Buddy', 'Labrador') — instantiates Dog. Triggers Dog.__init__", memory: [{ variable: "d", type: "Dog", value: "<Dog object at 0x8a1>" }], output: "" },
            { line: 9, annotation: "super().__init__(name) — calls Animal.__init__ with 'Buddy'", memory: [], output: "" },
            { line: 4, annotation: "self.name = 'Buddy' — initializes parent attribute name", memory: [{ variable: "d.name", type: "str", value: "'Buddy'" }], output: "" },
            { line: 10, annotation: "self.breed = 'Labrador' — sets child attribute breed", memory: [{ variable: "d.name", type: "str", value: "'Buddy'" }, { variable: "d.breed", type: "str", value: "'Labrador'" }], output: "" },
            { line: 14, annotation: "sound = d.speak() — calls overridden Dog.speak() method", memory: [{ variable: "sound", type: "str", value: "'Woof!'" }], output: "" }
          ]
        },
        posttest: [
            { question: "Which OOP concept allows different objects to use the same method name?", options: ["Encapsulation", "Abstraction", "Polymorphism", "Slicing"], answerIndex: 2 },
            { question: "What is the purpose of the super() function?", options: ["Create an object", "Access parent class methods and constructors", "Import packages", "Create loops"], answerIndex: 1 },
            { question: "What does super() return?", options: ["A child object", "A temporary parent class object", "A module", "A package"], answerIndex: 1 },
            { question: "In which situation is super() commonly used?", options: ["File handling", "Loop control", "Calling parent constructor from child class", "Exception handling"], answerIndex: 2 },
            { question: "Which statement correctly calls a parent constructor?", options: ["Correct", "Syntax Error", "Runtime Error", "Logical Error"], answerIndex: 0 },
            { question: "What is the output?", options: ["Child", "Parent", "Error", "None"], answerIndex: 1 },
            { question: "What is the output?", options: ["Parent", "Child", "Parent Child", "Error"], answerIndex: 1 },
            { question: "Which concept is demonstrated in Q22?", options: ["Encapsulation", "Inheritance", "Method Overriding", "Abstraction"], answerIndex: 2 },
            { question: "What is the output?", options: ["Animal Sound", "Bark", "Error", "None"], answerIndex: 1 },
            { question: "The Dog and Animal example mainly demonstrates:", options: ["Polymorphism", "File Handling", "Slicing", "Dictionaries"], answerIndex: 0 },
            { question: "Which inheritance type involves only one parent and one child?", options: ["Single Inheritance", "Multiple Inheritance", "Multilevel Inheritance", "Hybrid Inheritance"], answerIndex: 0 },
            { question: "Which statement about inheritance is TRUE?", options: ["Child classes cannot access parent methods", "Parent classes inherit from child classes", "Child classes can reuse parent methods and attributes", "Inheritance is only for variables"], answerIndex: 2 },
            { question: "What happens if a child class does not override a parent method?", options: ["Error occurs", "Parent method is used", "Method is ignored", "Program terminates"], answerIndex: 1 },
            { question: "Which OOP principle reduces code duplication?", options: ["Looping", "Inheritance", "Slicing", "Indexing"], answerIndex: 1 },
            { question: "Which statement best describes inheritance and polymorphism?", options: ["They help create reusable and flexible object-oriented programs", "They are used only for mathematical calculations", "They replace functions entirely", "They are file management techniques"], answerIndex: 0 },
          ],
        references: [
          "Python Tutorial — Inheritance: https://docs.python.org/3/tutorial/classes.html#inheritance",
          "W3Schools Python Inheritance: https://www.w3schools.com/python/python_inheritance.asp",
          "Lutz M., Learning Python, 5th Edition"
        ]
      }
    }
  ]
};
