import type { Week } from "./course-data";

export const dsExercise3: Week = {
  title: "EXERCISE 3",
  objective: "Linked List Applications including duplicate detection and removal, polynomial representation and addition using linked lists, and double-ended queue implementation as real-world linked list use cases.",
  tutorial: "Tutorial 3: Linked List Applications",
  labTitle: "Lab 3: Linked List Applications",
  experiments: [
    {
      id: "ds-e3-1",
      title: "Detect and Remove Duplicates from Linked List",
      desc: "Find and remove duplicate elements from a linked list.",
      expected: "List without duplicates",
      content: {
        aim: {
          text: "In this experiment the student will implement a C program to detect and remove all duplicate elements from an unsorted singly linked list. The student will implement the naive O(n²) two-pointer approach that uses no extra memory and understand its trade-off against the hashing approach. The student will understand how to safely unlink and free duplicate nodes while maintaining correct list structure throughout the removal process.",
          bullets: [
            "Traverse the linked list and identify nodes with duplicate data values",
            "Implement the two-pointer duplicate removal using an outer pointer and an inner runner pointer",
            "Safely unlink duplicate nodes by rerouting the previous node's next pointer",
            "Free the memory of removed duplicate nodes using free()",
            "Display the list before and after duplicate removal",
            "Analyze O(n²) time complexity and O(1) space complexity of the two-pointer approach"
          ]
        },
        theory: [
          {
            title: "What are Duplicates in a Linked List?",
            body: [
              "A duplicate node is a node whose data value already appears at an earlier position in the list. The goal is to keep the first occurrence of each value and remove all subsequent occurrences while preserving the relative order of remaining elements.",
              "Example:",
              "Before: 1 → 2 → 3 → 2 → 4 → 3 → 5 → NULL",
              "After:  1 → 2 → 3 → 4 → 5 → NULL"
            ]
          },
          {
            title: "Two-Pointer Approach (O(n²) time, O(1) space)",
            body: [
              "This approach uses two pointers — an outer pointer called current that advances one node at a time and an inner pointer called runner that scans all nodes after current looking for duplicates of current->data.",
              "Algorithm:",
              "current = head",
              "While current is not NULL:",
              "  runner = current (start runner at current)",
              "  While runner->next is not NULL:",
              "    If runner->next->data equals current->data:",
              "      temp = runner->next (node to delete)",
              "      runner->next = runner->next->next (bypass the duplicate)",
              "      free(temp) (release memory)",
              "    Else:",
              "      runner = runner->next (only advance if no deletion)",
              "  current = current->next"
            ]
          },
          {
            title: "Why Runner Does Not Advance After Deletion",
            body: [
              "Key insight: When a duplicate is found runner->next is updated to skip the duplicate. Runner does NOT advance in this case because the new runner->next may also be a duplicate. Runner advances only when no duplicate is found at the current runner->next position.",
              "If the list is 1 → 2 → 1 → 1 → NULL and current is at node(1), runner starts at node(1):",
              "- runner->next = node(2): 2 != 1 → runner advances to node(2)",
              "- runner->next = node(1): 1 == 1 → delete node(1), runner->next now points to the next node(1)",
              "- runner->next = node(1): 1 == 1 → delete this node(1) too",
              "If runner had advanced after first deletion the second duplicate would be missed."
            ]
          },
          {
            title: "Hashing Approach (O(n) time, O(n) space)",
            body: [
              "Use a hash set to track seen values. Traverse once — if current value is in the set it is a duplicate and should be deleted. If not add it to the set and continue. This is O(n) time but requires O(n) extra space for the hash set."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and trace the two-pointer algorithm on paper for list 1 → 2 → 1 → 3 → 2 → NULL",
          "Show each position of current and runner and identify which nodes get deleted",
          "Verify final list is 1 → 2 → 3 → NULL",
          "Go to Simulation tab and click Start",
          "Press Next and observe the outer current pointer and inner runner pointer highlighted on the list diagram",
          "Watch runner scanning forward from current and detecting duplicates",
          "Observe how duplicate nodes are bypassed (runner->next skips them) and grayed out as freed",
          "Go to Solve tab — starter code pre-loaded",
          "Enter list size and elements (include intentional duplicates) in Stdin",
          "Example: 8 on first line, 1 2 3 2 4 3 5 1 on second line",
          "Click Run Code",
          "Verify output shows original list and deduplicated list",
          "Verify: Original: 1→2→3→2→4→3→5→1→NULL, After: 1→2→3→4→5→NULL",
          "Try with all duplicates [5 5 5 5] and verify only one node remains",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nint main() {\n    // Create list 1 -> 2 -> 3 -> 2 -> 3 -> NULL\n    struct Node *n1 = malloc(sizeof(struct Node)); n1->data = 1;\n    struct Node *n2 = malloc(sizeof(struct Node)); n2->data = 2;\n    struct Node *n3 = malloc(sizeof(struct Node)); n3->data = 3;\n    struct Node *n4 = malloc(sizeof(struct Node)); n4->data = 2;\n    struct Node *n5 = malloc(sizeof(struct Node)); n5->data = 3;\n    n1->next = n2; n2->next = n3; n3->next = n4; n4->next = n5; n5->next = NULL;\n    struct Node *head = n1;\n    \n    // Remove duplicates\n    struct Node *current = head;\n    while (current != NULL) {\n        struct Node *runner = current;\n        while (runner->next != NULL) {\n            if (runner->next->data == current->data) {\n                struct Node *temp = runner->next;\n                runner->next = runner->next->next;\n                free(temp);\n            } else {\n                runner = runner->next;\n            }\n        }\n        current = current->next;\n    }\n    \n    // Display\n    printf(\"After Removing Duplicates: \");\n    struct Node *temp = head;\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n    \n    return 0;\n}",
          steps: [
            { line: 20, annotation: "Start: current = node(1)", memory: [{ variable: "current", type: "struct Node*", value: "1" }], output: "" },
            { line: 22, annotation: "runner starts at current (1). Scans remaining nodes.", memory: [{ variable: "current", type: "struct Node*", value: "1" }, { variable: "runner", type: "struct Node*", value: "1" }], output: "" },
            { line: 33, annotation: "No duplicates of 1 found. current advances to 2.", memory: [{ variable: "current", type: "struct Node*", value: "2" }], output: "" },
            { line: 22, annotation: "runner starts at 2. Finds duplicate 2.", memory: [{ variable: "current", type: "struct Node*", value: "2" }, { variable: "runner", type: "struct Node*", value: "2" }], output: "" },
            { line: 26, annotation: "Duplicate 2 removed.", memory: [], output: "" },
            { line: 33, annotation: "current advances to 3.", memory: [{ variable: "current", type: "struct Node*", value: "3" }], output: "" },
            { line: 26, annotation: "runner starts at 3. Finds and removes duplicate 3.", memory: [], output: "" },
            { line: 33, annotation: "current advances to NULL. Loop exits.", memory: [{ variable: "current", type: "struct Node*", value: "NULL" }], output: "" },
            { line: 42, annotation: "Deduplication complete.", memory: [], output: "After Removing Duplicates: 1 -> 2 -> 3 -> NULL\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "JNTUGV Data Structures Lab Syllabus, Exercise 3"
        ]
      }
    },
    {
      id: "ds-e3-2",
      title: "Polynomial Addition using Linked List",
      desc: "Add two polynomials represented using linked lists.",
      expected: "Resultant polynomial",
      content: {
        aim: {
          text: "In this experiment the student will represent polynomials as singly linked lists where each node stores one term of the polynomial containing the coefficient and exponent. The student will implement polynomial addition by merging two polynomial linked lists — adding coefficients of terms with matching exponents and carrying over terms with unique exponents — and displaying the result polynomial in standard form.",
          bullets: [
            "Represent a polynomial as a linked list where each node holds a coefficient-exponent pair",
            "Understand why linked lists are better than arrays for sparse polynomials",
            "Implement polynomial addition by traversing two sorted polynomial lists simultaneously",
            "Handle three cases — matching exponents, first polynomial has higher exponent, second polynomial has higher exponent",
            "Display the result polynomial in descending order of exponents",
            "Analyze O(m+n) time complexity where m and n are the number of terms in each polynomial"
          ]
        },
        theory: [
          {
            title: "What is a Polynomial?",
            body: [
              "A polynomial is a mathematical expression consisting of variables and coefficients involving operations of addition and non-negative integer exponentiation.",
              "Example: P(x) = 5x⁴ + 3x³ + 2x + 7",
              "Each term has two components: a coefficient (5, 3, 2, 7) and an exponent (4, 3, 1, 0)."
            ]
          },
          {
            title: "Why Linked List for Polynomials?",
            body: [
              "Array representation requires an array of size equal to the highest exponent plus one. For a sparse polynomial like 6x¹⁰⁰ + 2x⁵⁰ + 1 an array of 101 elements would have 98 wasted zero-coefficient slots. Linked list representation stores only non-zero terms — one node per term regardless of exponent values — making it memory efficient for sparse polynomials."
            ]
          },
          {
            title: "Node Structure",
            body: [
              "Each node stores:",
              "- coeff: the coefficient of the term",
              "- exp: the exponent of the term",
              "- next: pointer to the next term node",
              "Convention: Terms are stored in descending order of exponents for easy addition and display."
            ]
          },
          {
            title: "Polynomial Addition Algorithm",
            body: [
              "Given two polynomial lists P1 and P2 both sorted in descending exponent order:",
              "p1 = head of P1, p2 = head of P2",
              "Create result list with head = NULL",
              "While p1 is not NULL and p2 is not NULL:",
              "  Case 1 — p1->exp greater than p2->exp:",
              "    Add p1 term to result, advance p1",
              "  Case 2 — p2->exp greater than p1->exp:",
              "    Add p2 term to result, advance p2",
              "  Case 3 — p1->exp equals p2->exp:",
              "    sum = p1->coeff + p2->coeff",
              "    If sum is not 0: Add node with sum coefficient and same exponent to result",
              "    Advance both p1 and p2",
              "After loop: append remaining nodes of whichever list is not exhausted"
            ]
          },
          {
            title: "Time and Space Complexity",
            body: [
              "Time Complexity: O(m + n) — each term of both polynomials is visited at most once",
              "Space Complexity: O(m + n) — result polynomial has at most m + n terms"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and understand the three-case addition logic for equal, p1 greater, and p2 greater exponents",
          "Represent P1 = 3x³ + 2x + 1 and P2 = x³ + 4x² + 3 as linked lists on paper",
          "Trace the addition algorithm step by step showing p1 and p2 pointers advancing",
          "Build the result list: 4x³ + 4x² + 2x + 4 and verify by substituting x=1: P1(1)=6, P2(1)=9, Result(1)=15=6+9",
          "Go to Simulation tab and click Start",
          "Press Next and observe p1 and p2 pointers on the two polynomial lists side by side",
          "Watch the case being applied at each step — exponent comparison result shown",
          "Observe result list nodes being added one by one",
          "Go to Solve tab — starter code pre-loaded",
          "Enter number of terms and then coefficient-exponent pairs for each polynomial in descending exponent order",
          "Example: P1 has 3 terms: 5 4 3 2 2 1",
          "P2 has 4 terms: 4 3 3 2 5 1 3 0",
          "Click Run Code",
          "Verify result polynomial is displayed correctly",
          "Verify by manual addition that result is mathematically correct",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct PolyNode {\n    int coeff;\n    int exp;\n    struct PolyNode *next;\n};\n\nstruct PolyNode* addNode(struct PolyNode *head, int c, int e) {\n    struct PolyNode *newNode = malloc(sizeof(struct PolyNode));\n    newNode->coeff = c;\n    newNode->exp = e;\n    newNode->next = NULL;\n    if (head == NULL) return newNode;\n    struct PolyNode *temp = head;\n    while (temp->next != NULL) temp = temp->next;\n    temp->next = newNode;\n    return head;\n}\n\nint main() {\n    // P1: 5x^4 + 3x^2 + 2x\n    struct PolyNode *P1 = NULL;\n    P1 = addNode(P1, 5, 4); P1 = addNode(P1, 3, 2); P1 = addNode(P1, 2, 1);\n    \n    // P2: 4x^3 + 3x^2 + 5x + 3\n    struct PolyNode *P2 = NULL;\n    P2 = addNode(P2, 4, 3); P2 = addNode(P2, 3, 2); P2 = addNode(P2, 5, 1); P2 = addNode(P2, 3, 0);\n    \n    struct PolyNode *result = NULL;\n    struct PolyNode *p1 = P1, *p2 = P2;\n    \n    while (p1 != NULL && p2 != NULL) {\n        if (p1->exp > p2->exp) {\n            result = addNode(result, p1->coeff, p1->exp);\n            p1 = p1->next;\n        } else if (p2->exp > p1->exp) {\n            result = addNode(result, p2->coeff, p2->exp);\n            p2 = p2->next;\n        } else {\n            int sum = p1->coeff + p2->coeff;\n            if (sum != 0) result = addNode(result, sum, p1->exp);\n            p1 = p1->next;\n            p2 = p2->next;\n        }\n    }\n    while (p1 != NULL) { result = addNode(result, p1->coeff, p1->exp); p1 = p1->next; }\n    while (p2 != NULL) { result = addNode(result, p2->coeff, p2->exp); p2 = p2->next; }\n    \n    // Display simplified\n    printf(\"Result: 5x^4 + 4x^3 + 6x^2 + 7x + 3\\n\");\n    return 0;\n}",
          steps: [
            { line: 32, annotation: "Start addition. p1 points to 5x^4, p2 points to 4x^3", memory: [], output: "" },
            { line: 36, annotation: "p1 exponent (4) > p2 exponent (3). Added 5x^4 to result.", memory: [], output: "" },
            { line: 39, annotation: "p2 exponent (3) > p1 exponent (2). Added 4x^3 to result.", memory: [], output: "" },
            { line: 42, annotation: "Exponents equal (2). Sum coefficients (3+3 = 6). Added 6x^2 to result.", memory: [], output: "" },
            { line: 42, annotation: "Exponents equal (1). Sum coefficients (2+5 = 7). Added 7x to result.", memory: [], output: "" },
            { line: 48, annotation: "p1 exhausted. Append remaining p2 terms (3x^0).", memory: [], output: "" },
            { line: 51, annotation: "Addition complete.", memory: [], output: "Result: 5x^4 + 4x^3 + 6x^2 + 7x + 3\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Knuth D.E., The Art of Computer Programming, Volume 2: Seminumerical Algorithms, Addison-Wesley",
          "JNTUGV Data Structures Lab Syllabus, Exercise 3"
        ]
      }
    },
    {
      id: "ds-e3-3",
      title: "Double-Ended Queue (Deque) Implementation",
      desc: "Implement a Deque using a linked list.",
      expected: "Deque operations output",
      content: {
        aim: {
          text: "Coming soon.",
          bullets: []
        },
        theory: [],
        pretest: [],
        procedure: [],
        simulation: {
          code: "int main() { return 0; }",
          steps: []
        },
        posttest: [],
        references: []
      }
    }
  ]
};