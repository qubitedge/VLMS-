import type { Week } from "./course-data";

export const dsExercise8: Week = {
  title: "EXERCISE 8",
  objective: "Binary Search Tree including linked list-based BST implementation with insertion and deletion and all three standard traversals — inorder, preorder, and postorder.",
  tutorial: "Tutorial 8: Trees",
  labTitle: "Lab 8: Binary Search Tree",
  experiments: [
    {
      id: "ds-e8-1",
      title: "BST Implementation and Traversal using Linked List",
      desc: "Implement a Binary Search Tree with insertion and traversals.",
      expected: "Tree structure and traversal outputs",
      content: {
        aim: {
          text: "In this experiment the student will implement a C program to build a Binary Search Tree (BST) using a linked list representation and perform all standard traversals on it. The student will understand how BST insertion maintains the ordering property, how recursive traversal algorithms visit nodes in different orders, and how the linked structure enables dynamic growth without pre-allocated arrays.",
          bullets: [
            "Understand the BST property — left subtree contains smaller values, right subtree contains larger values",
            "Implement a linked node structure with data, left pointer, and right pointer",
            "Implement BST insertion that places each new key in the correct position",
            "Implement Inorder traversal (Left → Root → Right) which produces sorted output",
            "Implement Preorder traversal (Root → Left → Right) which captures tree structure",
            "Implement Postorder traversal (Left → Right → Root) which is used for deletion and expression evaluation",
            "Handle duplicate keys appropriately (ignore or insert right)",
            "Analyze O(log n) average and O(n) worst-case time complexity for insertion and search"
          ]
        },
        theory: [
          {
            title: "What is a Binary Search Tree?",
            body: [
              "A Binary Search Tree is a rooted binary tree data structure where each node stores a key and satisfies the BST property: for every node N, all keys in the left subtree of N are strictly less than the key of N, and all keys in the right subtree of N are strictly greater than the key of N. This ordering property makes search, insertion, and deletion efficient on average."
            ]
          },
          {
            title: "Linked List Representation of BST",
            body: [
              "Unlike array-based representations, a linked BST uses dynamically allocated nodes. Each node contains three fields: the integer data field storing the key value, the left pointer pointing to the root of the left subtree, and the right pointer pointing to the root of the right subtree.",
              "The tree is accessed via a single root pointer. When the tree is empty the root pointer is NULL.",
              "struct Node { int data; struct Node* left; struct Node* right; };"
            ]
          },
          {
            title: "BST Insertion Algorithm",
            body: [
              "To insert a key K into a BST:",
              "If the tree is empty, create a new node with K and make it the root",
              "If K is less than the current node's key, recurse into the left subtree",
              "If K is greater than the current node's key, recurse into the right subtree",
              "If K equals the current node's key, the key already exists — ignore (no duplicates)",
              "A new node is always inserted as a leaf"
            ]
          },
          {
            title: "BST Traversals",
            body: [
              "Three standard depth-first traversals exist for binary trees, each visiting nodes in a different order.",
              "Inorder traversal visits the left subtree first, then the root, then the right subtree. For a BST this always produces keys in ascending sorted order. This property is unique to BSTs and is used for sorted output and verification.",
              "Preorder traversal visits the root first, then the left subtree, then the right subtree. This order captures the structural shape of the tree and is used for tree copying and serialization.",
              "Postorder traversal visits the left subtree first, then the right subtree, then the root. This order ensures a node is processed only after all its descendants — useful for memory deallocation and postfix expression evaluation."
            ]
          },
          {
            title: "Time and Space Complexity",
            body: [
              "For a balanced BST insertion takes O(log n) time as each comparison halves the search space. Traversal always takes O(n) time as every node is visited exactly once.",
              "In the worst case — when keys are inserted in sorted order — the BST degenerates into a linked list and insertion takes O(n) time.",
              "Space complexity for the tree itself is O(n) for n nodes. Recursive traversal uses O(h) stack space where h is the height of the tree."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and understand the BST node structure — data, left pointer, right pointer",
          "Trace insertion of keys 50, 30, 70, 20, 40, 60, 80 on paper and draw the resulting tree",
          "Manually perform Inorder, Preorder, and Postorder traversals on the traced tree and write down the output sequences",
          "Verify that Inorder output matches the sorted sequence: 20 30 40 50 60 70 80",
          "Trace a degenerate case by inserting keys 10, 20, 30, 40 in sorted order and observe the resulting skewed tree resembling a linked list",
          "Go to Simulation tab and click Start",
          "Observe the animated node insertion — watch each new node travel down the tree following BST comparisons at each level",
          "Use the traversal buttons to switch between Inorder, Preorder, and Postorder — observe the highlighted node visit order",
          "Note how Inorder always visits nodes left-to-right regardless of insertion order",
          "Go to Solve tab — starter code with struct definition and main skeleton pre-loaded",
          "Enter space-separated integers in Stdin representing keys to insert",
          "Example stdin: 50 30 70 20 40 60 80",
          "Click Run Code",
          "Verify all three traversal outputs match the expected sequences",
          "Test a skewed tree by entering: 10 20 30 40 50",
          "Observe that Inorder still produces sorted output: 10 20 30 40 50",
          "Test with duplicate: 50 30 50 70 — verify duplicate 50 is ignored",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "int main() { /* Simulation code for BST insertion and traversal */ return 0; }",
          steps: [
            { line: 0, annotation: "Insert 50: Tree is empty → create node(50) → root = 50", memory: [], output: "" },
            { line: 0, annotation: "Insert 30: 30 < 50 → go left → create node(30) → root->left = 30", memory: [], output: "" },
            { line: 0, annotation: "Insert 70: 70 > 50 → go right → create node(70) → root->right = 70", memory: [], output: "" },
            { line: 0, annotation: "Insert 20: 20 < 50 → left, 20 < 30 → left → create node(20)", memory: [], output: "" },
            { line: 0, annotation: "Insert 40: 40 < 50 → left, 40 > 30 → right → create node(40)", memory: [], output: "" },
            { line: 0, annotation: "Inorder Traversal: 20 30 40 50 70", memory: [], output: "Inorder Traversal   : 20 30 40 50 70\n" },
            { line: 0, annotation: "Preorder Traversal: 50 30 20 40 70", memory: [], output: "Preorder Traversal  : 50 30 20 40 70\n" },
            { line: 0, annotation: "Postorder Traversal: 20 40 30 70 50", memory: [], output: "Postorder Traversal : 20 40 30 70 50\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson — Chapter 4: Trees",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008 — Chapter 5",
          "Cormen T.H. et al., Introduction to Algorithms, 3rd Edition, MIT Press — Chapter 12: Binary Search Trees",
          "Sedgewick R., Algorithms in C Parts 1-5, Addison-Wesley — Chapter on Search Trees",
          "JNTUGV Data Structures Lab Syllabus, Exercise 8",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
        ]
      }
    }
  ]
};
