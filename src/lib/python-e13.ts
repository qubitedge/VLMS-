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
          { question: "How do you specify inheritance in Python?", options: ["class Child extends Parent:", "class Child(Parent):", "class Child implements Parent:", "class Child: Parent"], answerIndex: 1, hint: "Parent classes are passed in parentheses in the class header." },
          { question: "What does the super() function do?", options: ["Deletes a class", "Calls a method from the parent class", "Creates a static variable", "Exits the class definition"], answerIndex: 1, hint: "It accesses the parent class namespace." },
          { question: "Can a subclass inherit from multiple parent classes in Python?", options: ["No, Python only supports single inheritance", "Yes, this is called multiple inheritance", "Yes, but only if they are interfaces", "Only using decorators"], answerIndex: 1, hint: "Python supports multiple inheritance by comma-separating parents in the parentheses." },
          { question: "What is method overriding?", options: ["Defining multiple methods with the same name but different parameters in the same class", "A child class redefining a method that is already defined in its parent class", "Creating two classes with the same name", "None of these"], answerIndex: 1, hint: "It allows a subclass to customize a behavior inherited from its parent." },
          { question: "Which function checks if a class is a subclass of another class?", options: ["isinstance()", "issubclass()", "hasattr()", "type()"], answerIndex: 1, hint: "It matches class-to-class inheritance relationships." }
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
          { question: "Which of the following is true about multiple inheritance in Python?", options: ["It is not supported", "It is supported, resolved via Method Resolution Order (MRO)", "It is supported but causes compile-time errors", "It requires the implements keyword"], answerIndex: 1, hint: "Python uses a linearization algorithm called C3 to resolve execution order." },
          { question: "What is Method Resolution Order (MRO)?", options: ["The order in which methods are written in a file", "The order in which Python searches for a method in a class hierarchy", "The order of argument parsing", "None of these"], answerIndex: 1, hint: "It determines which class method executes during inheritance calls." },
          { question: "How do you view the MRO of a class C?", options: ["C.__mro__ or C.mro()", "C.getOrder()", "dir(C)", "mro(C)"], answerIndex: 0, hint: "Every class has an __mro__ tuple attribute showing search order." },
          { question: "What is polymorphism?", options: ["Hiding internal details", "Reusing code through classes", "Providing a single interface to different underlying forms", "Defining variables inside class constructors"], answerIndex: 2, hint: "It allows treating different objects as if they were of a common type." },
          { question: "What is the output of: print(issubclass(Dog, Animal))?", options: ["True", "False", "Error", "None"], answerIndex: 0, hint: "Since Dog inherits from Animal, issubclass returns True." }
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
