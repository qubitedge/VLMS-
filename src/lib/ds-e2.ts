import type { Week } from "./course-data";

export const dsExercise2: Week = {
  title: "EXERCISE 2",
  objective: "Singly Linked List Implementation including insertion, deletion, iterative reversal, recursive reversal, traversal, and manipulation forming the foundation of dynamic memory-based data structures.",
  tutorial: "Tutorial 2: Singly Linked Lists",
  labTitle: "Lab 2: Linked List Implementation",
  experiments: [
    {
      id: "ds-e2-1",
      title: "Singly Linked List Insertion and Deletion",
      desc: "Implement a singly linked list with insertion and deletion operations.",
      expected: "List: 10 -> 20 -> 30 -> NULL",
      content: {
        aim: {
          text: "In this experiment the student will implement a singly linked list in C using self-referential structures and dynamic memory allocation. The student will perform all four fundamental insertion operations — at the beginning, at the end, at a given position, and after a given node — and all three fundamental deletion operations — from the beginning, from the end, and at a given position — and traverse the list to display its contents after each operation.",
          bullets: [
            "Understand the structure of a singly linked list node using self-referential structures",
            "Implement dynamic node creation using malloc() and node removal using free()",
            "Perform insertion at beginning, end, and a specified position",
            "Perform deletion from beginning, end, and a specified position",
            "Traverse and display the linked list after each operation",
            "Understand how pointer manipulation links and unlinks nodes"
          ]
        },
        theory: [
          {
            title: "Limitations of Arrays that Motivated Linked Lists",
            body: [
              "Arrays allocate a fixed contiguous block of memory at compile time. This creates several problems in practice. The size must be known in advance and cannot change at runtime. Inserting or deleting an element in the middle requires shifting all subsequent elements — O(n) time. Memory is wasted if the array is declared too large and insufficient if declared too small.",
              "Linked lists solve all of these problems through dynamic memory allocation and pointer-based node linking."
            ]
          },
          {
            title: "Singly Linked List Structure",
            body: [
              "A singly linked list is a chain of nodes where each node contains two fields:",
              "- Data field: stores the actual value (integer, character, structure, etc.)",
              "- Next pointer: stores the memory address of the next node in the sequence",
              "The last node's next pointer is set to NULL indicating the end of the list.",
              "A head pointer variable always stores the address of the first node. If head is NULL the list is empty.",
              "Self-referential structure in C:",
              "struct Node {",
              "  int data;",
              "  struct Node *next;",
              "};"
            ]
          },
          {
            title: "Memory Representation",
            body: [
              "For a list containing 10 → 20 → 30 → NULL:",
              "Node 1 at address 1000: data=10, next=2000",
              "Node 2 at address 2000: data=20, next=3000",
              "Node 3 at address 3000: data=30, next=NULL",
              "head = 1000"
            ]
          },
          {
            title: "Dynamic Node Creation",
            body: [
              "Every new node is created using malloc:",
              "struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));",
              "newNode->data = value;",
              "newNode->next = NULL;"
            ]
          },
          {
            title: "Insertion Operations",
            body: [
              "Insert at Beginning:",
              "The new node's next is set to the current head. Then head is updated to point to the new node. Time complexity O(1).",
              "Insert at End:",
              "If the list is empty set head to the new node. Otherwise traverse to the last node (whose next is NULL) and set that node's next to the new node. Time complexity O(n).",
              "Insert at Position:",
              "Traverse to the node at position-1. Set new node's next to that node's next. Set that node's next to the new node. Time complexity O(n)."
            ]
          },
          {
            title: "Deletion Operations",
            body: [
              "Delete from Beginning:",
              "Save head in a temp pointer. Move head to head->next. Free temp. Time complexity O(1).",
              "Delete from End:",
              "Traverse to the second-to-last node. Set its next to NULL. Free the last node. Time complexity O(n).",
              "Delete at Position:",
              "Traverse to the node at position-1. Save position-1->next in temp. Set position-1->next to temp->next. Free temp. Time complexity O(n)."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Aim and Theory focusing on the self-referential structure definition and pointer manipulation",
          "Draw on paper a linked list 10 → 20 → 30 → NULL with node addresses labeled",
          "Trace insert at beginning with value 5 — show how head changes",
          "Trace delete from end — show how the second-to-last node's next becomes NULL",
          "Go to Simulation tab and click Start",
          "Use the operation dropdown to select Insert at Beginning, Insert at End, Insert at Position",
          "Enter the value and position as prompted and click Next to observe node creation and pointer updates step by step",
          "Observe the linked list diagram updating visually after each operation",
          "Select Delete operations and observe how pointers are rerouted and nodes are freed",
          "Go to Solve tab — starter code is pre-loaded",
          "The program menu asks for operation choice — use Stdin to enter a sequence of operations",
          "Example stdin: First line 1 (insert at beginning), second line 10, then 2 (insert at end), then 20, then 5 (display), then 0 (exit)",
          "Click Run Code and verify the list state matches your manual trace",
          "Try all six operations — insert at beginning, end, position, delete at beginning, end, position",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nint main() {\n    struct Node *head = NULL;\n    struct Node *newNode, *temp;\n    \n    // Insert 10 at End\n    newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = 10;\n    newNode->next = NULL;\n    head = newNode;\n    \n    // Insert 20 at End\n    newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = 20;\n    newNode->next = NULL;\n    head->next = newNode;\n    \n    // Insert 5 at Beginning\n    newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = 5;\n    newNode->next = head;\n    head = newNode;\n    \n    // Delete from Beginning\n    temp = head;\n    head = head->next;\n    free(temp);\n    \n    // Display\n    temp = head;\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n    \n    return 0;\n}",
          steps: [
            { line: 17, annotation: "Step 1: Insert 10 at End. New node created, head points to it.", memory: [{ variable: "head", type: "struct Node*", value: "[10|NULL]" }], output: "" },
            { line: 23, annotation: "Step 2: Insert 20 at End. New node created, attached to end of list.", memory: [{ variable: "head", type: "struct Node*", value: "[10|2000] -> [20|NULL]" }], output: "" },
            { line: 29, annotation: "Step 3: Insert 5 at Beginning. New node created, attached to head, head updated.", memory: [{ variable: "head", type: "struct Node*", value: "[5|1000] -> [10|2000] -> [20|NULL]" }], output: "" },
            { line: 34, annotation: "Step 4: Delete from Beginning. Temp points to head, head moved forward, temp freed.", memory: [{ variable: "head", type: "struct Node*", value: "[10|2000] -> [20|NULL]" }], output: "" },
            { line: 41, annotation: "Step 5: Display List. Traverse and print.", memory: [], output: "10 -> 20 -> NULL\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "Cormen T.H. et al., Introduction to Algorithms, 3rd Edition, MIT Press, Chapter 10",
          "JNTUGV Data Structures Lab Syllabus, Exercise 2"
        ]
      }
    },
    {
      id: "ds-e2-2",
      title: "Reverse a Linked List Iteratively",
      desc: "Reverse a singly linked list iteratively.",
      expected: "Reversed List: 5 -> 4 -> 3 -> 2 -> 1 -> NULL",
      content: {
        aim: {
          text: "In this experiment the student will implement an iterative algorithm to reverse a singly linked list in-place using three pointer variables — prev, cur, and next. The student will understand how redirecting the next pointer of each node during a single traversal reverses all links without using any auxiliary data structure and how head is updated to point to the new first node.",
          bullets: [
            "Understand why naive reversal approaches fail and why three pointers are needed",
            "Implement in-place reversal using prev, cur, and next pointer variables",
            "Trace the pointer redirections step by step for a given list",
            "Analyze O(n) time complexity and O(1) space complexity of iterative reversal",
            "Verify the reversed list by traversal and display"
          ]
        },
        theory: [
          {
            title: "Why Reverse a Linked List?",
            body: [
              "Linked list reversal is a fundamental operation tested extensively in technical interviews and used in real algorithms including palindrome detection in linked lists, reversing segments of a list, and implementing undo operations. It tests deep understanding of pointer manipulation."
            ]
          },
          {
            title: "Why Three Pointers are Needed",
            body: [
              "When reversing the next pointer of the current node to point backward, the link to the next node is lost. Three pointers are needed to preserve all connections during reversal:",
              "- prev: tracks the previous node (starts as NULL — the new last node points to NULL)",
              "- cur: tracks the current node being processed",
              "- next: temporarily stores cur->next before it is overwritten"
            ]
          },
          {
            title: "Iterative Algorithm",
            body: [
              "prev = NULL",
              "cur = head",
              "While cur is not NULL:",
              "  next = cur->next (save next before overwriting)",
              "  cur->next = prev (reverse the link)",
              "  prev = cur (move prev forward)",
              "  cur = next (move cur forward)",
              "head = prev (prev is now pointing to the last node which is the new first node)"
            ]
          },
          {
            title: "Trace for List: 1 → 2 → 3 → 4 → NULL",
            body: [
              "Initial: prev=NULL, cur=1, head=1",
              "Iteration 1: next = 2, cur(1)->next = NULL, prev = 1, cur = 2 | State: NULL <- 1  2 -> 3 -> 4 -> NULL",
              "Iteration 2: next = 3, cur(2)->next = 1, prev = 2, cur = 3 | State: NULL <- 1 <- 2  3 -> 4 -> NULL",
              "Iteration 3: next = 4, cur(3)->next = 2, prev = 3, cur = 4 | State: NULL <- 1 <- 2 <- 3  4 -> NULL",
              "Iteration 4: next = NULL, cur(4)->next = 3, prev = 4, cur = NULL | State: NULL <- 1 <- 2 <- 3 <- 4",
              "cur is NULL — loop exits",
              "head = prev = 4",
              "Reversed list: 4 -> 3 -> 2 -> 1 -> NULL"
            ]
          },
          {
            title: "Time and Space Complexity",
            body: [
              "Time Complexity: O(n) — single pass through all n nodes",
              "Space Complexity: O(1) — only three pointer variables used regardless of list size",
              "Why Not Use an Auxiliary Array?",
              "You could copy all values into an array, reverse the array, and copy back — O(n) time but O(n) space. The in-place three-pointer method achieves O(1) space which is always preferred for linked list problems."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and draw the three-pointer diagram for list 1 → 2 → 3 → NULL on paper",
          "Trace each iteration showing the state of prev, cur, next, and the direction of all next pointers",
          "Verify that after the loop prev points to node 3 and head should be updated to prev",
          "Draw the reversed list 3 → 2 → 1 → NULL and verify pointer directions",
          "Go to Simulation tab and click Start",
          "Press Next and observe prev, cur, and next pointer labels on the animated list diagram",
          "Watch the cur->next arrow flip direction at each step",
          "Observe the old broken links graying out and new reversed links appearing in color",
          "Watch head update to prev after the loop completes",
          "Go to Solve tab — starter code pre-loaded",
          "Enter list size and elements in Stdin",
          "Example input: 5 on first line, 1 2 3 4 5 on second line",
          "Click Run Code",
          "Verify output shows original list then reversed list",
          "Try with single element list and two element list to verify edge cases",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nint main() {\n    // Create list 10 -> 20 -> 30 -> NULL\n    struct Node *n1 = malloc(sizeof(struct Node)); n1->data = 10;\n    struct Node *n2 = malloc(sizeof(struct Node)); n2->data = 20;\n    struct Node *n3 = malloc(sizeof(struct Node)); n3->data = 30;\n    n1->next = n2; n2->next = n3; n3->next = NULL;\n    struct Node *head = n1;\n    \n    // Reversal logic\n    struct Node *prev = NULL;\n    struct Node *cur = head;\n    struct Node *next = NULL;\n    \n    while (cur != NULL) {\n        next = cur->next;\n        cur->next = prev;\n        prev = cur;\n        cur = next;\n    }\n    head = prev;\n    \n    // Display\n    struct Node *temp = head;\n    printf(\"Reversed List: \");\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n    \n    return 0;\n}",
          steps: [
            { line: 20, annotation: "Initial State: prev = NULL, cur = 10, next = NULL", memory: [{ variable: "prev", type: "struct Node*", value: "NULL" }, { variable: "cur", type: "struct Node*", value: "10" }], output: "" },
            { line: 27, annotation: "Iteration 1: Node 10 reversed. next=20, 10->next=NULL, prev=10, cur=20", memory: [{ variable: "prev", type: "struct Node*", value: "10" }, { variable: "cur", type: "struct Node*", value: "20" }], output: "" },
            { line: 27, annotation: "Iteration 2: Node 20 reversed. next=30, 20->next=10, prev=20, cur=30", memory: [{ variable: "prev", type: "struct Node*", value: "20" }, { variable: "cur", type: "struct Node*", value: "30" }], output: "" },
            { line: 27, annotation: "Iteration 3: Node 30 reversed. next=NULL, 30->next=20, prev=30, cur=NULL", memory: [{ variable: "prev", type: "struct Node*", value: "30" }, { variable: "cur", type: "struct Node*", value: "NULL" }], output: "" },
            { line: 28, annotation: "Loop exits. head = prev (30)", memory: [{ variable: "head", type: "struct Node*", value: "30" }], output: "" },
            { line: 36, annotation: "Reversal complete", memory: [], output: "Reversed List: 30 -> 20 -> 10 -> NULL\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "JNTUGV Data Structures Lab Syllabus, Exercise 2"
        ]
      }
    },
    {
      id: "ds-e2-3",
      title: "Reverse a Linked List Recursively",
      desc: "Reverse a singly linked list recursively.",
      expected: "Reversed List: 4 -> 3 -> 2 -> 1 -> NULL",
      content: {
        aim: {
          text: "In this experiment the student will implement a recursive algorithm to reverse a singly linked list in C. The student will understand how the recursive call stack reaches the last node first and then during the unwinding phase reverses each link as the call returns, and will compare recursive reversal with iterative reversal in terms of call stack usage and elegance of implementation.",
          bullets: [
            "Understand how recursion reaches the last node through the call stack",
            "Implement recursive reversal that reverses links during the unwinding phase",
            "Trace the recursive call tree and unwinding process step by step",
            "Analyze O(n) time complexity and O(n) space complexity due to call stack",
            "Compare and contrast recursive vs iterative reversal and know when to prefer each"
          ]
        },
        theory: [
          {
            title: "Recursive Reversal Concept",
            body: [
              "The recursive approach breaks the reversal problem into: reverse the rest of the list from head->next onward and then make head->next->next point back to head and set head->next to NULL."
            ]
          },
          {
            title: "Recursive Algorithm",
            body: [
              "struct Node* reverseRecursive(struct Node *head):",
              "  if head is NULL or head->next is NULL:",
              "    return head (base case — empty list or single node)",
              "  newHead = reverseRecursive(head->next) (recurse on rest of list)",
              "  head->next->next = head (make next node point back to current)",
              "  head->next = NULL (disconnect current from its old next)",
              "  return newHead (return the new head — the original last node)"
            ]
          },
          {
            title: "Base Case",
            body: [
              "When the recursive call reaches the last node (head->next == NULL) it returns that last node as the new head. This new head propagates back up through all recursive returns unchanged — it is always the original last node becoming the new first node."
            ]
          },
          {
            title: "Trace for List: 1 → 2 → 3 → NULL",
            body: [
              "Call Stack Building:",
              "rev(1) -> rev(2) -> rev(3) [Base case, returns 3]",
              "Unwinding Phase:",
              "Back in rev(2): newHead = 3, 2->next->next = 2 means 3->next = 2, 2->next = NULL. Returns 3.",
              "Back in rev(1): newHead = 3, 1->next->next = 1 means 2->next = 1, 1->next = NULL. Returns 3."
            ]
          },
          {
            title: "Time and Space Complexity",
            body: [
              "Time Complexity: O(n) — visits each node exactly once",
              "Space Complexity: O(n) — call stack holds n frames one per node",
              "This is the key difference from iterative reversal which is O(1) space. For very large lists (millions of nodes) recursive reversal risks stack overflow. Iterative is preferred for production code on large lists."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and draw the call stack diagram for reversing 1 → 2 → 3 → 4 on paper",
          "Show all four recursive calls stacking up and the base case triggering at node 4",
          "Trace the unwinding phase showing which link is reversed at each return",
          "Verify that after full unwinding the list is 4 → 3 → 2 → 1 → NULL and head = node(4)",
          "Go to Simulation tab and click Start",
          "Press Next and observe recursive calls stacking up in the Call Stack panel",
          "Watch the base case trigger and newHead = node(last) established",
          "Press Next through the unwinding phase and watch each link reverse as frames pop",
          "Observe head updating to newHead after the final return",
          "Go to Solve tab — starter code pre-loaded",
          "Enter list size and elements in Stdin",
          "Example input: 4 on first line, 1 2 3 4 on second line",
          "Click Run Code",
          "Verify output shows original and reversed list",
          "Compare with iterative output for same input",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nstruct Node* reverseRecursive(struct Node *head) {\n    if (head == NULL || head->next == NULL) {\n        return head;\n    }\n    struct Node *newHead = reverseRecursive(head->next);\n    head->next->next = head;\n    head->next = NULL;\n    return newHead;\n}\n\nint main() {\n    struct Node *n1 = malloc(sizeof(struct Node)); n1->data = 1;\n    struct Node *n2 = malloc(sizeof(struct Node)); n2->data = 2;\n    struct Node *n3 = malloc(sizeof(struct Node)); n3->data = 3;\n    n1->next = n2; n2->next = n3; n3->next = NULL;\n    \n    struct Node *head = reverseRecursive(n1);\n    \n    printf(\"Reversed List: \");\n    struct Node *temp = head;\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n    \n    return 0;\n}",
          steps: [
            { line: 13, annotation: "reverseRecursive(1) calls reverseRecursive(2)", memory: [], output: "" },
            { line: 13, annotation: "reverseRecursive(2) calls reverseRecursive(3)", memory: [], output: "" },
            { line: 11, annotation: "reverseRecursive(3): Base case reached. Returns node(3).", memory: [], output: "" },
            { line: 16, annotation: "Unwinding rev(2): 3->next = 2, 2->next = NULL. Returns 3.", memory: [], output: "" },
            { line: 16, annotation: "Unwinding rev(1): 2->next = 1, 1->next = NULL. Returns 3.", memory: [], output: "" },
            { line: 33, annotation: "Reversal complete", memory: [], output: "Reversed List: 3 -> 2 -> 1 -> NULL\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "Cormen T.H. et al., Introduction to Algorithms, 3rd Edition, MIT Press",
          "JNTUGV Data Structures Lab Syllabus, Exercise 2"
        ]
      }
    },
    {
      id: "ds-e2-4",
      title: "Linked List Traversal and Manipulation",
      desc: "Implement essential linked list traversal and manipulation operations including finding the middle node.",
      expected: "Count, Max, Min, Sum, Avg, Search, and Middle Output",
      content: {
        aim: {
          text: "In this experiment the student will implement essential linked list traversal and manipulation operations in C including counting the number of nodes, finding the maximum and minimum values, computing the sum and average of all node data, searching for a specific value, and finding the middle node using the slow and fast pointer (Floyd's) technique. These operations consolidate traversal skills and introduce the two-pointer paradigm on linked lists.",
          bullets: [
            "Traverse a linked list to count nodes, compute sum, find max and min",
            "Search for a given value and report its position in the list",
            "Implement the slow and fast pointer technique to find the middle node in O(n) time and O(1) space",
            "Understand why the two-pointer approach finds the middle without computing length first",
            "Apply traversal logic to solve practical linked list problems efficiently"
          ]
        },
        theory: [
          {
            title: "Linked List Traversal",
            body: [
              "Traversal is the process of visiting every node in a linked list exactly once from head to NULL. It is the foundation of all linked list operations.",
              "struct Node *cur = head;",
              "While cur is not NULL:",
              "  process cur->data",
              "  cur = cur->next"
            ]
          },
          {
            title: "Common Traversal Operations",
            body: [
              "Counting Nodes: Initialize count = 0. Traverse and increment count at each node.",
              "Finding Maximum and Minimum: Initialize max and min to head->data. Update by comparing with cur->data.",
              "Sum and Average: Traverse and add cur->data to sum. Average = sum / count.",
              "Searching: Traverse and compare cur->data with key. Return position if matched."
            ]
          },
          {
            title: "Finding the Middle Node — Slow and Fast Pointer",
            body: [
              "Naive approach: count nodes (one traversal), divide by 2, traverse again to that position. Two traversals required.",
              "Floyd's Two-Pointer (Tortoise and Hare) approach: Use two pointers — slow moves one step at a time, fast moves two steps at a time. When fast reaches the end (NULL or NULL->next) slow is exactly at the middle.",
              "Algorithm:",
              "slow = head, fast = head",
              "While fast is not NULL and fast->next is not NULL:",
              "  slow = slow->next (one step)",
              "  fast = fast->next->next (two steps)",
              "Middle node = slow"
            ]
          },
          {
            title: "Trace for 1 → 2 → 3 → 4 → 5 → NULL",
            body: [
              "Start: slow=1, fast=1",
              "Step 1: slow=2, fast=3",
              "Step 2: slow=3, fast=5",
              "Step 3: fast->next=NULL — loop exits",
              "Middle = slow = node(3) ✅"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and manually trace slow-fast pointers on list 1 → 2 → 3 → 4 → 5 showing each step",
          "Verify slow stops at node(3) — the middle",
          "Also trace for even list 1 → 2 → 3 → 4 and verify slow stops at node(2) — first middle",
          "Go to Simulation tab and click Start",
          "For traversal operations press Next and observe the cur pointer moving node by node",
          "For slow-fast pointer press Next and watch both pointers moving — slow one step, fast two steps",
          "Observe fast reaching the end while slow is at the middle position",
          "Go to Solve tab — starter code pre-loaded",
          "The program performs all operations: count, max, min, sum, average, search, and middle",
          "Enter list size, elements, and search key in Stdin",
          "Example: 5 on first line, 3 7 1 9 5 on second line, 9 on third line (search key)",
          "Click Run Code",
          "Verify all outputs: Count=5, Max=9, Min=1, Sum=25, Avg=5.00, 9 found at position 4, Middle=1",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nint main() {\n    // Create list 3 -> 7 -> 1 -> 9 -> 5 -> NULL\n    struct Node *n1 = malloc(sizeof(struct Node)); n1->data = 3;\n    struct Node *n2 = malloc(sizeof(struct Node)); n2->data = 7;\n    struct Node *n3 = malloc(sizeof(struct Node)); n3->data = 1;\n    struct Node *n4 = malloc(sizeof(struct Node)); n4->data = 9;\n    struct Node *n5 = malloc(sizeof(struct Node)); n5->data = 5;\n    n1->next = n2; n2->next = n3; n3->next = n4; n4->next = n5; n5->next = NULL;\n    struct Node *head = n1;\n    \n    // Middle Node via slow-fast pointer\n    struct Node *slow = head, *fast = head;\n    while (fast != NULL && fast->next != NULL) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    \n    printf(\"Middle Node = %d\\n\", slow->data);\n    return 0;\n}",
          steps: [
            { line: 20, annotation: "Start: slow=3, fast=3", memory: [{ variable: "slow", type: "struct Node*", value: "3" }, { variable: "fast", type: "struct Node*", value: "3" }], output: "" },
            { line: 24, annotation: "Iteration 1: slow=7, fast=1", memory: [{ variable: "slow", type: "struct Node*", value: "7" }, { variable: "fast", type: "struct Node*", value: "1" }], output: "" },
            { line: 24, annotation: "Iteration 2: slow=1, fast=5", memory: [{ variable: "slow", type: "struct Node*", value: "1" }, { variable: "fast", type: "struct Node*", value: "5" }], output: "" },
            { line: 24, annotation: "Iteration 3: fast->next = NULL — loop exits", memory: [], output: "" },
            { line: 27, annotation: "Middle Node output", memory: [], output: "Middle Node = 1\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Floyd R.W., Algorithm 97: Shortest Path, Communications of the ACM, 1962",
          "JNTUGV Data Structures Lab Syllabus, Exercise 2"
        ]
      }
    }
  ]
};