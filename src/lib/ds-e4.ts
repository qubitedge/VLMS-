import type { Week } from "./course-data";

export const dsExercise4: Week = {
  title: "EXERCISE 4",
  objective: "Double Linked List Implementation including doubly linked list operations with forward and backward traversal and circular linked list implementation with insertion, deletion, and traversal.",
  tutorial: "Tutorial 4: Doubly and Circular Linked Lists",
  labTitle: "Lab 4: Double Linked List Implementation",
  experiments: [
    {
      id: "ds-e4-1",
      title: "Doubly Linked List Operations",
      desc: "Implement a doubly linked list with various operations.",
      expected: "List elements forward and backward",
      content: {
        aim: {
          text: "In this experiment the student will implement a complete doubly linked list in C where each node contains a data field and two pointer fields — next pointing forward and prev pointing backward. The student will perform all fundamental operations including insertion at beginning, end, and a given position, deletion from beginning, end, and a given position, forward traversal, and backward traversal, and understand how the bidirectional linking enables O(1) predecessor access which is impossible in a singly linked list.",
          bullets: [
            "Understand the doubly linked list node structure with prev and next pointers",
            "Implement dynamic node creation with both forward and backward links maintained correctly",
            "Perform insertion at beginning, end, and specified position updating both prev and next pointers",
            "Perform deletion from beginning, end, and specified position with correct pointer updates",
            "Traverse the list in both forward and backward directions",
            "Compare doubly linked list with singly linked list highlighting the advantages of bidirectional linking"
          ]
        },
        theory: [
          {
            title: "Limitations of Singly Linked List",
            body: [
              "A singly linked list can only be traversed in one direction — from head to tail. To find the predecessor of a given node you must start from head and traverse until you find the node whose next equals the given node — O(n). This makes backward traversal, deletion of a given node pointer, and rear operations inefficient without a tail pointer."
            ]
          },
          {
            title: "Doubly Linked List Structure",
            body: [
              "A doubly linked list addresses these limitations by giving each node two pointers:",
              "prev pointer: stores the address of the previous node in the sequence",
              "next pointer: stores the address of the next node in the sequence",
              "The first node's prev is NULL (no predecessor). The last node's next is NULL (no successor). Two external pointers head and tail track both ends.",
              "Self-referential structure:",
              "struct DNode {",
              "int data;",
              "struct DNode *prev;",
              "struct DNode *next;",
              "};"
            ]
          },
          {
            title: "Memory Representation",
            body: [
              "For list 10 ↔ 20 ↔ 30:",
              "Node at 1000: prev=NULL, data=10, next=2000",
              "Node at 2000: prev=1000, data=20, next=3000",
              "Node at 3000: prev=2000, data=30, next=NULL",
              "head = 1000, tail = 3000"
            ]
          },
          {
            title: "Insertion Operations",
            body: [
              "Insert at Beginning: Create newNode. Set newNode→prev = NULL. Set newNode→next = head. If head is not NULL set head→prev = newNode. Set head = newNode. If list was empty set tail = newNode also. Time O(1).",
              "Insert at End: Create newNode. Set newNode→next = NULL. Set newNode→prev = tail. If tail is not NULL set tail→next = newNode. Set tail = newNode. If list was empty set head = newNode also. Time O(1).",
              "Insert at Position: Traverse to node at position-1 (call it cur). Create newNode. Set newNode→next = cur→next. Set newNode→prev = cur. If cur→next is not NULL set cur→next→prev = newNode. Set cur→next = newNode. If newNode→next is NULL update tail = newNode. Time O(n)."
            ]
          },
          {
            title: "Deletion Operations",
            body: [
              "Delete from Beginning: Save head in temp. Move head = head→next. If head is not NULL set head→prev = NULL. Else set tail = NULL. Free temp. Time O(1).",
              "Delete from End: Save tail in temp. Move tail = tail→prev. If tail is not NULL set tail→next = NULL. Else set head = NULL. Free temp. Time O(1).",
              "Delete at Position: Traverse to node at position (call it cur). If cur→prev is not NULL set cur→prev→next = cur→next. Else head = cur→next (deleting head). If cur→next is not NULL set cur→next→prev = cur→prev. Else tail = cur→prev (deleting tail). Free cur. Time O(n)."
            ]
          },
          {
            title: "Forward and Backward Traversal",
            body: [
              "Forward (head to tail): cur = head, while cur != NULL print cur→data, cur = cur→next.",
              "Backward (tail to head): cur = tail, while cur != NULL print cur→data, cur = cur→prev."
            ]
          },
          {
            title: "Doubly vs Singly Linked List",
            body: [
              "| Operation | Singly Linked List | Doubly Linked List |",
              "| Memory per node | 1 pointer | 2 pointers |",
              "| Delete given node pointer | O(n) — must find predecessor | O(1) — use node→prev |",
              "| Delete from rear | O(n) — must traverse | O(1) — use tail→prev |",
              "| Backward traversal | Not possible | O(n) — use prev pointers |",
              "| Insert before given node | O(n) | O(1) |",
              "| Implementation complexity | Simple | More complex |"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and draw a doubly linked list [10 ↔ 20 ↔ 30] on paper showing both prev and next arrows at each node",
          "Trace insert at beginning with value 5 — show all four pointer assignments: newNode→prev=NULL, newNode→next=head, head→prev=newNode, head=newNode",
          "Trace delete from end — show tail moving to tail→prev and tail→next being set to NULL",
          "Trace forward traversal and backward traversal on the resulting list",
          "Go to Simulation tab and click Start",
          "Select operations from the dropdown and observe both prev arrows (going left) and next arrows (going right) shown simultaneously in the list diagram",
          "After each operation verify both head and tail pointers are correctly positioned",
          "Go to Solve tab — starter code pre-loaded",
          "Enter operation sequence in Stdin using operation codes Operations: 1=Insert Begin, 2=Insert End, 3=Insert Position, 4=Delete Begin, 5=Delete End, 6=Delete Position, 7=Forward Display, 8=Backward Display, 0=Exit",
          "Test sequence: insert end 10, insert end 20, insert end 30, insert begin 5, forward display, backward display, delete end, forward display",
          "Click Run Code and verify forward and backward traversals are correct mirror images",
          "Verify that backward traversal of [5 ↔ 10 ↔ 20 ↔ 30] gives 30 20 10 5",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "int main() { /* Simulation code for doubly linked list operations */ return 0; }",
          steps: [
            { line: 0, annotation: "Step 1 — Insert End: value=10. List: head → [NULL|10|NULL] ← tail", memory: [], output: "" },
            { line: 0, annotation: "Step 2 — Insert Begin: value=5. List: head → [NULL|5|1000] ↔ [2000|10|NULL] ← tail", memory: [], output: "" },
            { line: 0, annotation: "Step 3 — Insert End: value=20. List: head → [NULL|5|1000] ↔ [2000|10|3000] ↔ [1000|20|NULL] ← tail", memory: [], output: "" },
            { line: 0, annotation: "Step 4 — Delete from Beginning. Node 5 deleted. List: head → [NULL|10|3000] ↔ [1000|20|NULL] ← tail", memory: [], output: "" },
            { line: 0, annotation: "Step 5 — Forward Traversal", memory: [], output: "Forward: 10 ↔ 20 ↔ NULL\n" },
            { line: 0, annotation: "Step 6 — Backward Traversal", memory: [], output: "Backward: 20 ↔ 10 ↔ NULL\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "Cormen T.H. et al., Introduction to Algorithms, 3rd Edition, MIT Press, Chapter 10",
          "JNTUGV Data Structures Lab Syllabus, Exercise 4",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
        ]
      }
    },
    {
      id: "ds-e4-2",
      title: "Circular Linked List Operations",
      desc: "Implement a circular linked list with various operations.",
      expected: "List elements",
      content: {
        aim: {
          text: "In this experiment the student will implement a circular singly linked list in C where the last node's next pointer does not point to NULL but instead points back to the first node forming a continuous circle. The student will perform insertion at beginning, insertion at end, deletion from beginning, deletion from end, and complete circular traversal, and understand how a single tail pointer is sufficient to access both ends of a circular linked list in O(1) time.",
          bullets: [
            "Understand the circular structure where last→next = head always",
            "Implement a circular linked list using only a tail pointer to access both ends efficiently",
            "Perform insertion at beginning and end maintaining the circular property",
            "Perform deletion from beginning and end updating the circular link correctly",
            "Traverse the complete circular list starting and stopping at the same node",
            "Identify real-world applications of circular linked lists including round-robin scheduling and circular buffers"
          ]
        },
        theory: [
          {
            title: "What is a Circular Linked List?",
            body: [
              "A circular linked list is a variation of a linked list where the last node's next pointer connects back to the first node instead of being NULL. This creates a ring structure with no natural beginning or end — every node has a valid successor."
            ]
          },
          {
            title: "Singly Circular Linked List Structure",
            body: [
              "Each node has the same structure as a singly linked list node:",
              "struct CNode {",
              "int data;",
              "struct CNode *next;",
              "};",
              "The key invariant that must always be maintained: last→next = head (where last is the last node and head is the first node)"
            ]
          },
          {
            title: "Why Use Tail Pointer Instead of Head",
            body: [
              "If we maintain only a head pointer: Insert at beginning: O(1), Insert at end: O(n) — must traverse to last node to update last→next.",
              "If we maintain only a tail pointer: tail always points to the last node, tail→next always equals head (the first node).",
              "Insert at end: O(1) — just update tail. Insert at beginning: O(1) — new node becomes head and tail→next = new head. Access head: tail→next — O(1).",
              "A single tail pointer gives O(1) access to both ends. This is the recommended implementation."
            ]
          },
          {
            title: "Insertion Operations",
            body: [
              "Insert at End: Create newNode. Set newNode→next = tail→next (which is head — make new last node point to head). Set tail→next = newNode (old last node points to new last node). Set tail = newNode (update tail to new last node). Special case — empty list: newNode→next = newNode (points to itself). tail = newNode.",
              "Insert at Beginning: Create newNode. Set newNode→next = tail→next (which is current head). Set tail→next = newNode (last node now points to new head). New head is newNode — no need to store head separately since head = tail→next always. Special case — empty list: same as insert at end since head = tail = newNode."
            ]
          },
          {
            title: "Deletion Operations",
            body: [
              "Delete from Beginning: head = tail→next (current first node). tail→next = head→next (skip current head to second node, which becomes new head). free(head). Special case — only one node: tail→next = tail — this is the node to delete. Set tail = NULL after freeing.",
              "Delete from End: Traverse to the second-to-last node (call it cur). cur→next = tail→next (cur now points to head — skipping old tail). free(tail). tail = cur. Special case — only one node: same as delete from beginning."
            ]
          },
          {
            title: "Traversal",
            body: [
              "Start at tail→next (head). Visit each node and advance using cur = cur→next. Stop when cur returns to tail→next (head).",
              "Do-while pattern is natural for circular traversal:",
              "cur = tail→next (head)",
              "do {",
              "  print cur→data;",
              "  cur = cur→next;",
              "} while (cur != tail->next);"
            ]
          },
          {
            title: "Circular vs Linear Singly Linked List",
            body: [
              "| Property | Singly Linked List | Circular Singly Linked List |",
              "| Last node next | NULL | Points to head |",
              "| Natural endpoint | NULL | Revisiting start |",
              "| Traversal pattern | while(cur != NULL) | do-while(cur != head) |",
              "| Access both ends | O(1) front, O(n) rear | O(1) both with tail pointer |",
              "| Memory overhead | Same | Same |",
              "| Risk | NULL dereference | Infinite loop if traversal not bounded |"
            ]
          },
          {
            title: "Real World Applications",
            body: [
              "Round-robin CPU scheduling: each process gets a time slice, after last process the scheduler circles back to first — circular list models this naturally.",
              "Circular buffer (ring buffer): fixed-size buffer used in audio streaming, network packet buffers, and producer-consumer queues.",
              "Multiplayer board games: player turns cycle continuously — circular list represents the turn order.",
              "Media player playlist repeat: when last song ends playback circles back to first."
            ]
          },
          {
            title: "Important Invariant to Maintain",
            body: [
              "At all times the circular invariant last→next = head must be preserved. Every insertion and deletion must verify this invariant is maintained. If this ever becomes false — pointing to NULL or a freed node — the circular structure is broken and traversal will crash or loop infinitely."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and draw a circular linked list [10 → 20 → 30] on paper showing that node(30)→next = node(10) and tail = node(30)",
          "Trace insert at end with value 40 — show newNode→next = tail→next = node(10), tail→next = node(40), tail = node(40)",
          "Trace delete from beginning — show tail→next skipping old head to node(20)",
          "Trace circular traversal — start at tail→next, visit each node, stop when returning to tail→next",
          "Go to Simulation tab and click Start",
          "Observe the list rendered as a circle or ring shape with arrows showing the circular connection",
          "After each insert operation verify the new node connects back into the ring correctly",
          "After each delete operation verify the ring closes correctly without a NULL gap",
          "Go to Solve tab — starter code pre-loaded",
          "Enter operation sequence in Stdin Operations: 1=Insert Begin, 2=Insert End, 3=Delete Begin, 4=Delete End, 5=Display, 0=Exit",
          "Test sequence: insert end 10, insert end 20, insert end 30, insert begin 5, display, delete begin, display, delete end, display",
          "Click Run Code and verify circular traversal output matches expected values",
          "Try single element insertion then deletion and verify tail becomes NULL correctly",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "int main() { /* Simulation code for circular linked list operations */ return 0; }",
          steps: [
            { line: 0, annotation: "Step 1 — Insert End: value=10. tail = 1000. Circular structure: [10] → [10] (self loop)", memory: [], output: "" },
            { line: 0, annotation: "Step 2 — Insert End: value=20. tail = 2000. Circular structure: node(10)→next = node(20), node(20)→next = node(10)", memory: [], output: "" },
            { line: 0, annotation: "Step 3 — Insert Begin: value=5. tail = 2000, head = 3000. Circle: 5 → 10 → 20 → 5", memory: [], output: "" },
            { line: 0, annotation: "Step 4 — Delete from Beginning. tail = 2000, head = 1000. Circle: 10 → 20 → 10", memory: [], output: "" },
            { line: 0, annotation: "Step 5 — Circular Traversal (Display)", memory: [], output: "Circular List: 10 → 20 → (back to 10)\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "Cormen T.H. et al., Introduction to Algorithms, 3rd Edition, MIT Press, Chapter 10",
          "Sedgewick R., Algorithms in C Parts 1-5, Addison-Wesley",
          "JNTUGV Data Structures Lab Syllabus, Exercise 4",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/",
          "Wandbox Online Compiler: https://wandbox.org"
        ]
      }
    }
  ]
};
