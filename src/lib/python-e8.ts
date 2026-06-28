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
            { question: "What is a list in Python?", options: ["An unordered collection of unique items", "An ordered, mutable sequence of items", "An immutable sequence", "A collection of key-value pairs"], answerIndex: 1 },
            { question: "Which syntax is used to create a list?", options: ["(1, 2, 3)", "{1, 2, 3}", "[1, 2, 3]", "<1, 2, 3>"], answerIndex: 2 },
            { question: "Which property of lists allows items to be changed after creation?", options: ["Ordered", "Mutable", "Immutable", "Unique"], answerIndex: 1 },
            { question: "Can a list contain elements of different data types?", options: ["No", "Only numbers", "Only strings", "Yes"], answerIndex: 3 },
            { question: "Which method adds an element to the end of a list?", options: ["add()", "append()", "insert()", "push()"], answerIndex: 1 },
            { question: "Which method removes and returns the last element by default?", options: ["remove()", "delete()", "pop()", "clear()"], answerIndex: 2 },
            { question: "Which method inserts an element at a specified position?", options: ["append()", "extend()", "add()", "insert()"], answerIndex: 3 },
            { question: "What is the output?", options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 1, 2, 3]", "Error"], answerIndex: 1 },
            { question: "What is the output?", options: ["10", "20", "30", "Error"], answerIndex: 1 },
            { question: "Lists allow:", options: ["Only unique elements", "Duplicate elements", "Only integers", "Only strings"], answerIndex: 1 },
            { question: "What is a tuple?", options: ["Ordered and mutable collection", "Unordered collection", "Ordered and immutable collection", "Key-value collection"], answerIndex: 2 },
            { question: "Which syntax creates a tuple?", options: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "<1, 2, 3>"], answerIndex: 2 },
            { question: "Why are tuples considered safer than lists?", options: ["They are smaller", "They are immutable", "They are faster to type", "They use loops"], answerIndex: 1 },
            { question: "Which statement about tuples is TRUE?", options: ["Tuples are mutable", "Tuples allow duplicates", "Tuples cannot store strings", "Tuples are unordered"], answerIndex: 1 },
            { question: "Which collection type can be used as a dictionary key?", options: ["List", "Set", "Tuple", "Dictionary"], answerIndex: 2 },
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
            { question: "What is the output?", options: ["0", "1", "2", "3"], answerIndex: 1 },
            { question: "What happens when you try to modify a tuple element?", options: ["It works normally", "ValueError", "TypeError", "IndexError"], answerIndex: 2 },
            { question: "Which collection does NOT allow duplicate values?", options: ["List", "Tuple", "Dictionary", "Set"], answerIndex: 3 },
            { question: "Which syntax creates a set?", options: ["[1, 2, 3]", "(1, 2, 3)", "{1, 2, 3}", "<1, 2, 3>"], answerIndex: 2 },
            { question: "What is a set?", options: ["Ordered collection", "Immutable collection", "Unordered collection of unique items", "Key-value collection"], answerIndex: 2 },
            { question: "Which set operation finds common elements?", options: ["Union (|)", "Difference (-)", "Intersection (&)", "Append (+)"], answerIndex: 2 },
            { question: "Which set operation combines all unique elements?", options: ["Union (|)", "Intersection (&)", "Difference (-)", "Join()"], answerIndex: 0 },
            { question: "What is the result of?", options: ["{1, 4}", "{2, 3}", "{1, 2, 3, 4}", "{}"], answerIndex: 1 },
            { question: "What is a dictionary?", options: ["Sequence of numbers", "Collection of key-value pairs", "Collection of unique values", "Immutable collection"], answerIndex: 1 },
            { question: "Which syntax creates a dictionary?", options: ["[ ]", "( )", "{key:value}", "< >"], answerIndex: 2 },
            { question: "In a dictionary, keys must be:", options: ["Mutable and unique", "Immutable and unique", "Strings only", "Integers only"], answerIndex: 1 },
            { question: "What is the output?", options: ["name", "Alice", "Error", "None"], answerIndex: 1 },
            { question: "Which method returns all dictionary keys?", options: ["values()", "items()", "keys()", "get()"], answerIndex: 2 },
            { question: "Which method returns all dictionary values?", options: ["values()", "keys()", "items()", "pop()"], answerIndex: 0 },
            { question: "From Python 3.7 onwards, dictionaries:", options: ["Are unordered", "Preserve insertion order", "Allow duplicate keys", "Are immutable"], answerIndex: 1 },
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
