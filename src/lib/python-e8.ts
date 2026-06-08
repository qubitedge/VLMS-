import type { Week } from "./course-data";

export const pythonExercise8: Week = {
  title: "EXERCISE 8",
  objective: "Exploring Python built-in collections: Lists (mutable, ordered), Tuples (immutable, ordered), Sets (mutable, unordered, unique), and Dictionaries (key-value pairs).",
  tutorial: "Tutorial 8: Collections and Data Structures",
  labTitle: "Lab 8: Collections and Data Structures",
  experiments: [
    {
      id: "py-e8-1",
      title: "Built-in Collections",
      desc: "Write a Python program to perform basic operations on lists, tuples, sets, and dictionaries, and demonstrate their characteristics.",
      expected: "List: [1, 2, 3, 4]\nTuple: (10, 20)\nSet: {1, 2, 3}\nDict: {'name': 'Alice', 'role': 'Admin'}",
      content: {
        aim: {
          text: "In this experiment the student will learn to use the four built-in data collections of Python: lists, tuples, sets, and dictionaries. The student will understand the characteristics of each (ordering, mutability, uniqueness) and write programs utilizing their operations.",
          bullets: [
            "Create, access, slice, and modify Lists (including methods like append, insert, pop, and remove)",
            "Create and access Tuples, and understand why they are immutable",
            "Perform Set operations such as add, discard, union, and intersection",
            "Create and manipulate Dictionaries, access items by key, add/update key-value pairs, and iterate over items"
          ]
        },
        theory: [
          {
            title: "Lists",
            body: [
              "A list is an ordered, mutable sequence of items. It allows duplicate elements and elements of different types.",
              "Syntax: my_list = [1, 'apple', 3.14]",
              "Lists can be modified after creation (add, remove, change items). Common methods include list.append(val), list.pop(), and list.insert(index, val)."
            ]
          },
          {
            title: "Tuples",
            body: [
              "A tuple is an ordered, immutable sequence of items. Like lists, they allow duplicates and multiple types.",
              "Syntax: my_tuple = (1, 'apple', 3.14)",
              "Immutability makes tuples faster than lists and safe from accidental changes. They can also be used as dictionary keys."
            ]
          },
          {
            title: "Sets",
            body: [
              "A set is an unordered collection of unique, mutable items. It does not allow duplicate values.",
              "Syntax: my_set = {1, 2, 3}",
              "Sets are useful for membership testing and removing duplicates from a sequence. Common operations include union (|), intersection (&), and difference (-)."
            ]
          },
          {
            title: "Dictionaries",
            body: [
              "A dictionary is a collection of key-value pairs. Keys must be unique and immutable (like strings, numbers, or tuples), while values can be of any type.",
              "Syntax: my_dict = {'key1': 'value1', 'key2': 42}",
              "From Python 3.7 onwards, dictionaries preserve insertion order. Common methods include dict.keys(), dict.values(), and dict.items()."
            ]
          }
        ],
        pretest: [
          { question: "Which of the following data structures is immutable?", options: ["List", "Tuple", "Set", "Dictionary"], answerIndex: 1, hint: "Once created, the elements of this sequence cannot be modified." },
          { question: "How do you add an element to the end of a list?", options: ["list.add(item)", "list.append(item)", "list.push(item)", "list.insert(item)"], answerIndex: 1, hint: "This built-in method appends a single value to the end of the list." },
          { question: "What is the output of: len({1, 2, 2, 3, 3, 3})?", options: ["6", "3", "2", "Error"], answerIndex: 1, hint: "Sets automatically filter out duplicate values, so only unique items are counted." },
          { question: "Which collection contains key-value pairs?", options: ["List", "Tuple", "Set", "Dictionary"], answerIndex: 3, hint: "It uses braces with keys mapped to values using colons." },
          { question: "Can a list be used as a key in a dictionary?", options: ["Yes", "No", "Only if it contains integers", "Only if it is sorted"], answerIndex: 1, hint: "Dictionary keys must be hashable/immutable. Lists are mutable, so they cannot be keys." }
        ],
        procedure: [
          "Read the Aim and Theory to understand the differences between Lists, Tuples, Sets, and Dictionaries",
          "Note which collections are ordered, mutable, and allow duplicates",
          "Observe the brackets: [] for list, () for tuple, {} for set/dict",
          "Go to Simulation tab and click Start",
          "Step through the code execution using Next",
          "Watch the collections grow and update in the Memory State panel",
          "Check how dictionary keys map to values in memory",
          "Go to Code Test tab and run the starter program",
          "Verify the outputs match the printed collections",
          "Modify the code to iterate over a dictionary and print keys and values using dict.items()",
          "Write a function that accepts a list, removes duplicates using set(), and returns a sorted list",
          "Write a program to demonstrate set operations: union, intersection, and difference between two groups",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "# Collections Operations\nmy_list = [1, 2, 3]\nmy_list.append(4)\n\nmy_tuple = (10, 20)\n\nmy_set = {1, 2, 2, 3}\n\nmy_dict = {'name': 'Alice'}\nmy_dict['role'] = 'Admin'\n\nprint('List:', my_list)\nprint('Tuple:', my_tuple)\nprint('Set:', my_set)\nprint('Dict:', my_dict)",
          steps: [
            { line: 2, annotation: "my_list = [1, 2, 3] — creates a mutable list", memory: [{ variable: "my_list", type: "list", value: "[1, 2, 3]" }], output: "" },
            { line: 3, annotation: "my_list.append(4) — appends 4 to the end of list", memory: [{ variable: "my_list", type: "list", value: "[1, 2, 3, 4]" }], output: "" },
            { line: 5, annotation: "my_tuple = (10, 20) — creates an immutable tuple", memory: [{ variable: "my_list", type: "list", value: "[1, 2, 3, 4]" }, { variable: "my_tuple", type: "tuple", value: "(10, 20)" }], output: "" },
            { line: 7, annotation: "my_set = {1, 2, 2, 3} — creates a set, removing duplicates", memory: [{ variable: "my_set", type: "set", value: "{1, 2, 3}" }], output: "" },
            { line: 9, annotation: "my_dict = {'name': 'Alice'} — creates a dictionary with one key-value pair", memory: [{ variable: "my_dict", type: "dict", value: "{'name': 'Alice'}" }], output: "" },
            { line: 10, annotation: "my_dict['role'] = 'Admin' — adds a new key-value pair", memory: [{ variable: "my_dict", type: "dict", value: "{'name': 'Alice', 'role': 'Admin'}" }], output: "" },
            { line: 12, annotation: "print('List:', my_list) displays list elements", memory: [], output: "List: [1, 2, 3, 4]\n" },
            { line: 13, annotation: "print('Tuple:', my_tuple) displays tuple elements", memory: [], output: "List: [1, 2, 3, 4]\nTuple: (10, 20)\n" },
            { line: 14, annotation: "print('Set:', my_set) displays set elements", memory: [], output: "List: [1, 2, 3, 4]\nTuple: (10, 20)\nSet: {1, 2, 3}\n" },
            { line: 15, annotation: "print('Dict:', my_dict) displays dictionary key-value pairs", memory: [], output: "List: [1, 2, 3, 4]\nTuple: (10, 20)\nSet: {1, 2, 3}\nDict: {'name': 'Alice', 'role': 'Admin'}\n" }
          ]
        },
        posttest: [
          { question: "What is the output of: d = {'a': 1, 'b': 2}; print(d.get('c', 3))?", options: ["None", "3", "Error", "1"], answerIndex: 1, hint: "The get() method returns the default value (second argument) if the key is not found." },
          { question: "Which method is used to remove and return an element at a given index from a list?", options: ["remove()", "discard()", "pop()", "delete()"], answerIndex: 2, hint: "It pops an element off the list. If no index is specified, it returns the last element." },
          { question: "Which list operation is equivalent to list.append(x)?", options: ["list.insert(0, x)", "list.insert(len(list), x)", "list.extend(x)", "list[len(list)] = x"], answerIndex: 1, hint: "Inserting at the index equal to the list's length adds the element to the end." },
          { question: "What is the result of: {1, 2} & {2, 3}?", options: ["{1, 2, 3}", "{2}", "{1, 3}", "Error"], answerIndex: 1, hint: "The & operator performs a set intersection, returning elements common to both sets." },
          { question: "How do you create an empty dictionary in Python?", options: ["d = {}", "d = dict()", "Both d = {} and d = dict()", "d = []"], answerIndex: 2, hint: "Both empty braces and the dict constructor create empty dictionaries." }
        ],
        references: [
          "Python Tutorial — Data Structures: https://docs.python.org/3/tutorial/datastructures.html",
          "W3Schools Python Collections: https://www.w3schools.com/python/python_lists.asp",
          "Matthes E., Python Crash Course, 2nd Edition"
        ]
      }
    }
  ]
};
