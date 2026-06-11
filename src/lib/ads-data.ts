// lib/ads-data.ts

import { Course } from './course-data';
import { adsShortNotes } from './ads-short-notes';

export const adsCourse: Course = {
  id: "advanced-data-structures",
  title: "Advanced Data Structures Lab",
  shortNotes: adsShortNotes,
  objectives: [
    "To implement and analyze balanced binary search trees including AVL and Red-Black Trees",
    "To understand and implement B-Trees and B+ Trees for external memory indexing",
    "To design and implement tree-based data structures for range queries (Segment Trees, Fenwick Trees)",
    "To implement priority queue operations using Binary Heaps",
    "To implement efficient set operations using Union-Find with path compression",
    "To explore advanced hashing techniques including Open Addressing and Cuckoo Hashing",
    "To implement Trie and Suffix Trie structures for string processing applications",
    "To implement fundamental graph algorithms for shortest path and minimum spanning tree",
    "To perform graph traversal using BFS and DFS",
    "To integrate multiple data structures into a complete mini-project application"
  ],
  introduction: [
    "Advanced Data Structures form the backbone of efficient algorithms and high-performance software systems. Unlike basic data structures, these advanced structures are designed to handle specific challenges such as balanced tree maintenance, external memory operations, range queries, dynamic connectivity, and efficient string processing.",
    "This Virtual Advanced Data Structures Lab provides a browser-based environment where students can implement, visualize, and test sophisticated data structures. The lab features interactive code editors, visual representation of data structures, step-by-step execution tracing, and extensive test cases to validate implementations.",
    "The lab covers 14 weeks of structured experiments spanning balanced trees (AVL, Red-Black), external structures (B-Trees, B+ Trees), query structures (Segment Tree, Fenwick Tree), hashing, strings, and graph algorithms. Each experiment includes clear objectives, theoretical background, pre-loaded starter code, expected outputs, and self-assessment tests.",
    "Students can write algorithms in JavaScript/Python directly in the browser, visualize how data structures change with each operation, and debug step-by-step. The lab is designed for B.Tech Computer Science students to bridge the gap between theoretical data structure concepts and practical, efficient implementations."
  ],
  targetAudience: {
    primary: "Third-year B.Tech students of Computer Science and Engineering studying Advanced Data Structures and Algorithms.",
    prerequisites: [
      "Proficiency in a programming language (C/C++/Java/Python)",
      "Basic understanding of pointers, recursion, and dynamic memory allocation",
      "Familiarity with basic data structures (arrays, linked lists, stacks, queues, binary trees)"
    ],
    usefulFor: [
      "Students preparing for coding interviews (FAANG and product companies)",
      "Students preparing for competitive programming (ICPC, Codeforces, LeetCode)",
      "Students aiming for GATE CS, where DS & Algo is a core subject",
      "Developers building high-performance applications"
    ]
  },
  alignment: {
    university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
    department: "Computer Science and Engineering",
    course: "Advanced Data Structures Lab",
    credits: "L:0 T:0 P:3 C:1.5",
    yearSem: "Third Year, First Semester",
    branches: "CSE and IT",
    totalExperiments: "13 experiments + 1 project",
    compiler: "JavaScript with visualization support",
    units: [
      { unit: "Unit I", topics: "Balanced Trees — AVL, Red-Black Trees", weeks: "Week 1–2" },
      { unit: "Unit II", topics: "External Structures — B-Trees, B+ Trees", weeks: "Week 3–4" },
      { unit: "Unit III", topics: "Range Query Structures — Segment Tree, Fenwick Tree", weeks: "Week 5–6" },
      { unit: "Unit IV", topics: "Heaps, Union-Find, Advanced Hashing", weeks: "Week 7–9" },
      { unit: "Unit V", topics: "String Data Structures — Trie, Suffix Trie", weeks: "Week 10–11" },
      { unit: "Unit VI", topics: "Graph Algorithms — Shortest Paths, MST, Traversal", weeks: "Week 12–13" }
    ]
  },
  weeks: [
    {
      title: "WEEK 1",
      objective: "AVL Tree Implementation — Insertion and Deletion",
      tutorial: "Tutorial 1: AVL Tree Rotations and Balancing",
      labTitle: "Lab 1: AVL Tree",
      experiments: [
        {
          id: "ads-w1-1",
          title: "AVL Tree — Insertion with Rotations",
          desc: "Implement an AVL tree with insertion operation. Show LL, RR, LR, RL rotations and maintain balance factor.",
          expected: "Correct AVL tree after each insertion; balance factor of every node in {-1,0,1}",
          content: {
            aim: {
              text: "In this experiment, the student will implement an AVL tree with insertion and rebalancing. The student will:",
              bullets: [
                "Define a node structure with data, height, left and right pointers",
                "Implement utility functions: getHeight(), updateHeight(), getBalanceFactor()",
                "Implement left rotation (RR), right rotation (LL), left-right (LR), and right-left (RL) rotations",
                "Integrate rotations into the insert() method to maintain AVL property",
                "Test insertions that trigger each rotation type"
              ]
            },
            theory: [
              {
                title: "Introduction to AVL Trees",
                body: [
                  "An AVL tree (named after its inventors Adelson-Velsky and Landis) is a self-balancing Binary Search Tree where the heights of the left and right subtrees of every node differ by at most 1. This property ensures that the tree remains balanced, providing O(log n) time complexity for search, insertion, and deletion operations.",
                  "AVL trees were the first self-balancing BSTs to be invented. They maintain balance by performing rotations when the balance factor of any node becomes outside the range [-1, 1]. This strict balancing makes AVL trees more balanced than Red-Black trees but with potentially more rotations during insertions and deletions."
                ]
              },
              {
                title: "Balance Factor and Height",
                body: [
                  "The balance factor (BF) of a node is defined as: BF = height(left subtree) - height(right subtree).",
                  "In an AVL tree, BF must be -1, 0, or +1 for every node.",
                  "Height of a node is defined as the number of edges on the longest path from that node to a leaf. For a null node, height is -1 or 0 depending on convention (we use 0 for null in code).",
                  "The height of an AVL tree with n nodes is approximately 1.44 log₂(n), making it slightly shorter than a Red-Black tree."
                ]
              },
              {
                title: "AVL Rotations — Detailed Explanation",
                body: [
                  "When insertion or deletion causes a node's balance factor to become +2 or -2, rotations are performed to restore balance. There are four rotation cases:",
                  "",
                  "1. LL (Left-Left) Rotation: Occurs when the imbalance is in the left subtree of the left child. The balance factor of the node is +2 and its left child has balance factor +1 or 0. Solution: Perform a single right rotation.",
                  "",
                  "2. RR (Right-Right) Rotation: Occurs when the imbalance is in the right subtree of the right child. The balance factor is -2 and the right child has balance factor -1 or 0. Solution: Perform a single left rotation.",
                  "",
                  "3. LR (Left-Right) Rotation: Occurs when the imbalance is in the right subtree of the left child. The balance factor is +2 and the left child has balance factor -1. Solution: First left rotate the left child, then right rotate the node.",
                  "",
                  "4. RL (Right-Left) Rotation: Occurs when the imbalance is in the left subtree of the right child. The balance factor is -2 and the right child has balance factor +1. Solution: First right rotate the right child, then left rotate the node.",
                  "",
                  "Each rotation operation takes O(1) time, making the rebalancing step very efficient."
                ]
              },
              {
                title: "AVL Insertion Algorithm",
                body: [
                  "The insertion algorithm for AVL trees follows these steps:",
                  "Step 1: Perform standard BST insertion to add the new key at a leaf position.",
                  "Step 2: After insertion, recursively update heights of all ancestors of the new node.",
                  "Step 3: Starting from the inserted node and moving up, compute the balance factor for each ancestor.",
                  "Step 4: If any node has balance factor +2 or -2, perform the appropriate rotation to rebalance.",
                  "Step 5: After rotation, update heights of affected nodes.",
                  "Step 6: Continue checking ancestors until the root is reached.",
                  "The process ensures that the AVL property is maintained throughout the tree."
                ]
              },
              {
                title: "Time and Space Complexity",
                body: [
                  "Time Complexity:",
                  "• Search: O(log n) — Since the height is guaranteed to be O(log n)",
                  "• Insertion: O(log n) — O(log n) for search + O(1) for rotations",
                  "• Deletion: O(log n) — O(log n) for search + O(log n) for rebalancing up the path",
                  "",
                  "Space Complexity:",
                  "• O(n) for storing n nodes",
                  "• Each node stores key, height, left and right pointers",
                  "",
                  "Comparison with other balanced trees:",
                  "• AVL trees are more strictly balanced than Red-Black trees (height difference ≤ 1.44 log n vs ≤ 2 log n)",
                  "• AVL trees require more rotations during insertion/deletion but provide faster lookups",
                  "• Red-Black trees have faster insertion/deletion but slightly slower lookups",
                  "• For lookup-intensive applications, AVL trees are preferred; for insertion-intensive, Red-Black trees are better"
                ]
              }
            ],
            pretest: [
              { question: "What is the balance factor of a node in an AVL tree?", options: ["Left height + Right height", "Left height - Right height", "Right height - Left height", "Height of node"], answerIndex: 1, hint: "Balance factor is the difference between left and right subtree heights." },
              { question: "Which rotation is performed for LL imbalance?", options: ["Left rotation", "Right rotation", "Left-Right rotation", "Right-Left rotation"], answerIndex: 1, hint: "LL means left-left — a right rotation fixes it." },
              { question: "When does RL rotation occur?", options: ["Balance factor > 1 and key < left.key", "Balance factor < -1 and key > right.key", "Balance factor < -1 and key < right.key", "Balance factor > 1 and key > left.key"], answerIndex: 2, hint: "RL means right-left — the imbalance is on the right, but the insertion was on the left of that right child." },
              { question: "AVL tree insertion time complexity is:", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answerIndex: 2, hint: "AVL trees maintain logarithmic height, so insertion takes O(log n) time." },
              { question: "What must be true about every node's balance factor in a valid AVL tree?", options: ["Exactly 0", "Between -1 and 1 inclusive", "Between -2 and 2", "Absolute value of 1"], answerIndex: 1, hint: "The AVL property requires balance factor to be -1, 0, or 1." },
            ],
            procedure: [
              "Open the Code Test tab with the AVL tree starter code",
              "Implement getHeight() and updateHeight() functions",
              "Implement getBalanceFactor() to compute BF for a node",
              "Implement rightRotate() and leftRotate() functions",
              "Complete insert() with rebalancing logic for all four rotation cases",
              "Test insertions: 10, 20, 30 (triggers RR → left rotation)",
              "Test insertions: 30, 20, 10 (triggers LL → right rotation)",
              "Test LR case: 30, 10, 20",
              "Test RL case: 10, 30, 20",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class AVLNode {\n    constructor(key) {\n        this.key = key;\n        this.left = null;\n        this.right = null;\n        this.height = 1;\n    }\n}\n\nfunction getHeight(node) {\n    return node ? node.height : 0;\n}\n\nfunction updateHeight(node) {\n    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;\n}\n\nfunction getBalanceFactor(node) {\n    return node ? getHeight(node.left) - getHeight(node.right) : 0;\n}\n\nfunction rightRotate(y) {\n    const x = y.left;\n    const T2 = x.right;\n    x.right = y;\n    y.left = T2;\n    updateHeight(y);\n    updateHeight(x);\n    return x;\n}\n\nfunction leftRotate(x) {\n    const y = x.right;\n    const T2 = y.left;\n    y.left = x;\n    x.right = T2;\n    updateHeight(x);\n    updateHeight(y);\n    return y;\n}\n\nfunction insert(node, key) {\n    if (!node) return new AVLNode(key);\n    if (key < node.key) node.left = insert(node.left, key);\n    else if (key > node.key) node.right = insert(node.right, key);\n    else return node;\n\n    updateHeight(node);\n    const balance = getBalanceFactor(node);\n\n    // LL case\n    if (balance > 1 && key < node.left.key) return rightRotate(node);\n    // RR case\n    if (balance < -1 && key > node.right.key) return leftRotate(node);\n    // LR case\n    if (balance > 1 && key > node.left.key) {\n        node.left = leftRotate(node.left);\n        return rightRotate(node);\n    }\n    // RL case\n    if (balance < -1 && key < node.right.key) {\n        node.right = rightRotate(node.right);\n        return leftRotate(node);\n    }\n    return node;\n}\n\n// Test: Insert 10, 20, 30\nlet root = null;\nroot = insert(root, 10);\nroot = insert(root, 20);\nroot = insert(root, 30);\nconsole.log('Root:', root.key, 'Height:', root.height);",
              steps: [
                { line: 1, annotation: "Define AVLNode with key, left, right, and height", memory: [], output: "Node structure defined" },
                { line: 2, annotation: "getHeight returns node.height or 0 for null", memory: [], output: "Helper function ready" },
                { line: 3, annotation: "updateHeight sets node.height = 1 + max(child heights)", memory: [], output: "Height update utility" },
                { line: 4, annotation: "getBalanceFactor returns left.height - right.height", memory: [], output: "BF calculation" },
                { line: 5, annotation: "rightRotate fixes LL imbalance", memory: [], output: "Right rotation function" },
                { line: 6, annotation: "leftRotate fixes RR imbalance", memory: [], output: "Left rotation function" },
                { line: 7, annotation: "Insert 10, 20, 30 — triggers RR imbalance at root", memory: [], output: "After rotations: root=20, height=2" }
              ]
            },
            posttest: [
              { question: "What is the height of an AVL tree with 7 nodes in worst case?", options: ["2", "3", "4", "5"], answerIndex: 1, hint: "Minimum nodes in AVL tree of height h: N(h)=N(h-1)+N(h-2)+1. For h=2: 4 nodes; h=3: 7 nodes." },
              { question: "After inserting 50, 30, 20 into an empty AVL tree, what is the root?", options: ["50", "30", "20", "40"], answerIndex: 1, hint: "30 is the middle element — AVL tree will balance with 30 as root." },
              { question: "Which rotation sequence corrects LR imbalance?", options: ["Left then Right", "Right then Left", "Two Right rotations", "Two Left rotations"], answerIndex: 0, hint: "LR means first rotate left on left child, then right on the node." },
              { question: "For an AVL tree of n nodes, the maximum height is approximately:", options: ["1.44 log₂ n", "log₂ n", "n", "n log n"], answerIndex: 0, hint: "AVL trees are more strictly balanced than Red-Black trees. Height ≤ 1.44 log₂(n)." },
              { question: "What value must be updated after every rotation?", options: ["Key", "Parent pointer", "Height", "Balance factor directly"], answerIndex: 2, hint: "Heights need to be recomputed after structural changes because rotations change subtree heights." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 13 on AVL Trees",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Addison-Wesley, Section 3.3 on Balanced Search Trees",
              "Weiss, M.A. - 'Data Structures and Algorithm Analysis in C++', 4th Edition, Pearson, Chapter 4 on AVL Trees"
            ]
          }
        },
        {
          id: "ads-w1-2",
          title: "AVL Tree — Deletion",
          desc: "Extend the AVL tree implementation with delete operation. Handle deletion from BST followed by rebalancing up to the root.",
          expected: "AVL property maintained after deletions; tree remains balanced",
          content: {
            aim: {
              text: "In this experiment, the student will implement deletion in an AVL tree. The student will:",
              bullets: [
                "Implement BST deletion (node with 0, 1, or 2 children)",
                "After deletion, update heights from the deleted node's parent up to root",
                "Check balance factor at each ancestor and perform appropriate rotations",
                "Handle all four rotation cases during deletion rebalancing",
                "Test deletions that trigger rebalancing at multiple levels"
              ]
            },
            theory: [
              {
                title: "AVL Deletion — Detailed Algorithm",
                body: [
                  "Deletion in an AVL tree is more complex than insertion because the imbalance can propagate up multiple levels. The algorithm follows these steps:",
                  "",
                  "Step 1: Perform standard BST deletion for the target key.",
                  "  - Case 1: Node with no children — simply remove (set parent pointer to null).",
                  "  - Case 2: Node with one child — replace node with its child.",
                  "  - Case 3: Node with two children — find inorder successor (or predecessor), replace node's key with successor's key, then recursively delete the successor from the right subtree.",
                  "",
                  "Step 2: After deletion, update the height of the current node.",
                  "",
                  "Step 3: Compute the balance factor of the current node.",
                  "",
                  "Step 4: If balance factor is +2 or -2, perform rebalancing:",
                  "  - If BF = +2 and left child's BF >= 0: Right rotation (LL case)",
                  "  - If BF = +2 and left child's BF < 0: Left-Right rotation (LR case)",
                  "  - If BF = -2 and right child's BF <= 0: Left rotation (RR case)",
                  "  - If BF = -2 and right child's BF > 0: Right-Left rotation (RL case)",
                  "",
                  "Step 5: Recursively rebalance ancestors up to the root."
                ]
              },
              {
                title: "Deletion Rebalancing Cases",
                body: [
                  "The four rotation cases during deletion are similar to insertion but with important differences:",
                  "",
                  "1. R0 Case: BF = -2 and right child's BF = 0 — Perform single left rotation. The tree height decreases by 1, which may cause imbalance at parent.",
                  "",
                  "2. R1 Case: BF = -2 and right child's BF = -1 — Perform single left rotation. The tree height remains same, no propagation needed.",
                  "",
                  "3. R-1 Case: BF = -2 and right child's BF = +1 — Perform right-left double rotation (first right rotate right child, then left rotate node).",
                  "",
                  "4. L0, L1, L-1 Cases: Mirror images for left imbalances (BF = +2).",
                  "",
                  "The key difference from insertion is that deletions may require rebalancing at multiple ancestors, potentially up to the root."
                ]
              },
              {
                title: "Inorder Successor and Predecessor",
                body: [
                  "When deleting a node with two children, we need to find a replacement:",
                  "",
                  "Inorder Successor: The smallest node in the right subtree (leftmost node in right subtree).",
                  "  - Always has at most one child (no left child)",
                  "  - Found by traversing left from right child until null",
                  "",
                  "Inorder Predecessor: The largest node in the left subtree (rightmost node in left subtree).",
                  "  - Always has at most one child (no right child)",
                  "  - Found by traversing right from left child until null",
                  "",
                  "Either can be used; using successor is more common. After copying the successor's value, we delete the successor node recursively, which will be a simpler case (0 or 1 child)."
                ]
              },
              {
                title: "Example Deletion Scenarios",
                body: [
                  "Example 1: Delete leaf node 20 from AVL tree {20, 10, 30}",
                  "  - After deletion, check parent (root 20 removed, new root 10 or 30 based on BST)",
                  "  - No imbalance created",
                  "",
                  "Example 2: Delete node with one child 30 from {30, 20}",
                  "  - Replace 30 with 20, check balance",
                  "  - No rotation needed if balanced",
                  "",
                  "Example 3: Delete node with two children from balanced tree",
                  "  - Find successor, replace value, delete successor",
                  "  - Rebalance may propagate upward",
                  "",
                  "Example 4: Delete causing cascade rebalancing",
                  "  - Delete from a leaf at bottom of a tall tree",
                  "  - Rotations may be needed at multiple levels up to root"
                ]
              }
            ],
            pretest: [
              { question: "When deleting a node with two children, we replace it with:", options: ["Left child", "Right child", "Inorder predecessor or successor", "Parent node"], answerIndex: 2, hint: "The inorder successor is the smallest node in the right subtree, or we can use inorder predecessor." },
              { question: "After deletion, rebalancing may need to propagate:", options: ["Downwards only", "Upwards only", "Both directions", "No propagation needed"], answerIndex: 1, hint: "Only ancestors of the deleted node can become unbalanced, so we rebalance from bottom up." },
              { question: "What is the time complexity of deletion in AVL tree?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 1, hint: "AVL tree operations maintain logarithmic complexity even for deletion with rebalancing." },
              { question: "When a node has balance factor -2 and right child has balance factor 0, what rotation is performed?", options: ["Left rotation", "Right rotation", "Left-Right rotation", "Right-Left rotation"], answerIndex: 0, hint: "This is the R0 case — a single left rotation is sufficient." },
              { question: "What is the inorder successor of a node with value 15 in the tree {10, 15, 20, 25}?", options: ["10", "20", "25", "None"], answerIndex: 1, hint: "The inorder successor is the smallest value greater than the node, which is 20." }
            ],
            procedure: [
              "Open the Code Test tab with the AVL deletion starter code",
              "Implement findMin() to find the smallest node in a subtree",
              "Implement deleteNode() with BST deletion logic",
              "Add rebalancing after deletion in the recursive function",
              "Test deletion of leaf nodes, nodes with one child, and nodes with two children",
              "Test a sequence: insert 10,20,30,40,50, then delete 40,30 and verify balancing",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "function findMin(node) {\n    while (node.left) node = node.left;\n    return node;\n}\n\nfunction deleteNode(node, key) {\n    if (!node) return null;\n\n    if (key < node.key) {\n        node.left = deleteNode(node.left, key);\n    } else if (key > node.key) {\n        node.right = deleteNode(node.right, key);\n    } else {\n        // Node to delete found\n        if (!node.left || !node.right) {\n            // 0 or 1 child\n            node = node.left || node.right;\n        } else {\n            // 2 children\n            const temp = findMin(node.right);\n            node.key = temp.key;\n            node.right = deleteNode(node.right, temp.key);\n        }\n    }\n\n    if (!node) return null;\n\n    updateHeight(node);\n    const balance = getBalanceFactor(node);\n\n    // Rebalancing cases (similar to insert but with deleted node considerations)\n    if (balance > 1 && getBalanceFactor(node.left) >= 0)\n        return rightRotate(node);\n    if (balance > 1 && getBalanceFactor(node.left) < 0) {\n        node.left = leftRotate(node.left);\n        return rightRotate(node);\n    }\n    if (balance < -1 && getBalanceFactor(node.right) <= 0)\n        return leftRotate(node);\n    if (balance < -1 && getBalanceFactor(node.right) > 0) {\n        node.right = rightRotate(node.right);\n        return leftRotate(node);\n    }\n    return node;\n}",
              steps: [
                { line: 1, annotation: "findMin traverses left children to find smallest key", memory: [], output: "Helper for deletion with 2 children" },
                { line: 2, annotation: "deleteNode follows BST delete, then rebalances", memory: [], output: "Deletion with rebalancing implemented" },
                { line: 3, annotation: "Case 0/1 child: replace node with its non-null child", memory: [], output: "Simple deletion case" },
                { line: 4, annotation: "Case 2 children: replace with inorder successor from right subtree", memory: [], output: "Successor replacement" },
                { line: 5, annotation: "Rebalancing after deletion — similar to insertion", memory: [], output: "Four rebalancing cases for deletion" }
              ]
            },
            posttest: [
              { question: "When deleting a node with two children, the inorder successor is always:", options: ["The largest in left subtree", "The smallest in right subtree", "The parent of the node", "The leftmost leaf"], answerIndex: 1, hint: "Inorder successor is the next larger element — found in the right subtree by going left until no more." },
              { question: "Which case requires a double rotation after deletion?", options: ["Balance > 1 and left child BF >= 0", "Balance > 1 and left child BF < 0", "Balance < -1 and right child BF <= 0", "Balance < -1 and right child BF = 0"], answerIndex: 1, hint: "Left child BF < 0 indicates LR case — requires left then right rotation." },
              { question: "What happens if after deletion, a node has balance factor +2 and its left child has balance factor 0?", options: ["Single right rotation", "Double rotation", "No rotation needed", "Left rotation"], answerIndex: 0, hint: "This is the L0 case — a single right rotation is performed." },
              { question: "Why might deletion require rebalancing at multiple levels when insertion usually doesn't?", options: ["Deletion changes tree height more dramatically", "Insertion always adds at leaf", "Deletion can reduce height of subtrees, causing imbalance at ancestors", "All of the above"], answerIndex: 3, hint: "Deletion can shorten a subtree, which may cause imbalance at any ancestor level." },
              { question: "What is the worst-case number of rotations for a single deletion in an AVL tree?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 1, hint: "In the worst case, rebalancing may propagate up to the root, requiring O(log n) rotations." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 13 on AVL Deletion",
              "Weiss, M.A. - 'Data Structures and Algorithm Analysis in C++', 4th Edition, Pearson, Chapter 4 on AVL Deletion"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 2",
      objective: "Red-Black Tree Implementation",
      tutorial: "Tutorial 2: Red-Black Tree Properties and Operations",
      labTitle: "Lab 2: Red-Black Tree",
      experiments: [
        {
          id: "ads-w2-1",
          title: "Red-Black Tree — Insertion and Fixup",
          desc: "Implement a Red-Black Tree with insertion operation. Follow RB tree properties: coloring, rotations, and fixup after insertion.",
          expected: "Tree maintains all 5 Red-Black properties after each insertion",
          content: {
            aim: {
              text: "In this experiment, the student will implement a Red-Black tree with insertion and fixup. The student will:",
              bullets: [
                "Define RB node with color (RED/BLACK), key, left, right, parent pointers",
                "Implement BST insertion as a foundation",
                "Implement left and right rotations with parent pointer updates",
                "Implement fixup() to restore RB properties after insertion",
                "Handle 6 different uncle-colored cases during fixup"
              ]
            },
            theory: [
              {
                title: "Red-Black Tree Properties and Invariants",
                body: [
                  "A Red-Black Tree is a self-balancing Binary Search Tree that uses a color attribute (red or black) to maintain balance. It satisfies five properties:",
                  "",
                  "Property 1: Every node is either RED or BLACK.",
                  "",
                  "Property 2: The root is always BLACK.",
                  "",
                  "Property 3: Every leaf (NIL) is BLACK. In practice, we use a sentinel NIL node to represent all leaves.",
                  "",
                  "Property 4: If a node is RED, then both its children are BLACK. This means no two consecutive RED nodes on any path.",
                  "",
                  "Property 5: For each node, all paths from the node to descendant leaves contain the same number of BLACK nodes (black-height).",
                  "",
                  "These properties ensure that the tree is balanced. The most important consequence is that the longest path from root to leaf is at most twice the shortest path, giving O(log n) height guarantee."
                ]
              },
              {
                title: "Black-Height and Tree Height Guarantee",
                body: [
                  "Definition: Black-height bh(x) is the number of black nodes on any path from node x to a leaf (excluding x if x is black).",
                  "",
                  "Key theorem: A Red-Black tree with n internal nodes has height at most 2 log₂(n+1).",
                  "",
                  "Proof sketch: For any node x, the subtree rooted at x has at least 2^(bh(x)) - 1 internal nodes. Since bh(root) ≥ h/2 (because at most half the nodes on any path can be red due to property 4), we have n ≥ 2^(h/2) - 1, so h ≤ 2 log₂(n+1).",
                  "",
                  "This guarantee makes Red-Black trees suitable for applications requiring reliable performance bounds."
                ]
              },
              {
                title: "Red-Black Tree Rotations",
                body: [
                  "Rotations are fundamental operations that maintain the BST property while changing tree structure. In Red-Black trees, rotations also preserve the black-height property.",
                  "",
                  "Left Rotation:",
                  "  - Performed on a node x that has a right child y",
                  "  - Makes y the new root of the subtree",
                  "  - x becomes left child of y",
                  "  - The former left subtree of y becomes right subtree of x",
                  "  - Updates parent pointers accordingly",
                  "",
                  "Right Rotation:",
                  "  - Performed on a node y that has a left child x",
                  "  - Makes x the new root of the subtree",
                  "  - y becomes right child of x",
                  "  - The former right subtree of x becomes left subtree of y",
                  "",
                  "Both rotations take O(1) time and maintain the BST ordering property."
                ]
              },
              {
                title: "Insertion Fixup Cases — Detailed Analysis",
                body: [
                  "When inserting a new node, we initially color it RED. This may violate property 4 (no consecutive reds). The fixup algorithm handles three cases, with symmetric cases for when the parent is a left or right child:",
                  "",
                  "Case 1: Uncle is RED",
                  "  - Recolor: parent becomes BLACK, uncle becomes BLACK, grandparent becomes RED",
                  "  - Move violation up to grandparent",
                  "  - Continue checking from grandparent",
                  "",
                  "Case 2: Uncle is BLACK and node is an inner grandchild (node is opposite side of parent)",
                  "  - Perform rotation to convert to Case 3",
                  "  - For example, if parent is left child and node is right child: perform left rotation on parent",
                  "  - After rotation, we have Case 3 situation",
                  "",
                  "Case 3: Uncle is BLACK and node is an outer grandchild (node and parent on same side)",
                  "  - Recolor: parent becomes BLACK, grandparent becomes RED",
                  "  - Perform rotation on grandparent away from the node",
                  "  - This restores all properties and terminates",
                  "",
                  "After fixup completes, we ensure the root is BLACK (property 2)."
                ]
              },
              {
                title: "Comparison with AVL Trees",
                body: [
                  "Red-Black trees and AVL trees are both self-balancing BSTs, but have different trade-offs:",
                  "",
                  "Balance: AVL trees are more strictly balanced (height difference ≤ 1.44 log n vs ≤ 2 log n for RB trees)",
                  "",
                  "Lookup speed: AVL trees are slightly faster due to better balance",
                  "",
                  "Insertion/Deletion speed: RB trees require fewer rotations (at most 2 rotations for insertion, 3 for deletion vs potentially O(log n) for AVL)",
                  "",
                  "Implementation complexity: RB trees are more complex due to color management and multiple cases",
                  "",
                  "Use cases: AVL for lookup-intensive applications (databases), RB for insertion/deletion-intensive (operating system kernels, Java TreeMap, C++ STL map)",
                  "",
                  "Memory overhead: Both require O(n) space; RB needs 1 extra bit per node for color"
                ]
              }
            ],
            pretest: [
              { question: "What is the black-height of a Red-Black tree?", options: ["Number of black nodes from root to leaf", "Number of red nodes from root to leaf", "Total nodes in tree", "Height of tree"], answerIndex: 0, hint: "Property 5 defines black-height — all root-to-leaf paths have same number of black nodes." },
              { question: "When a red node has a black sibling, what operation is performed?", options: ["Recoloring only", "Rotation then recoloring", "Deletion", "No operation"], answerIndex: 1, hint: "Black uncle cases require rotation to maintain properties." },
              { question: "The root of a Red-Black tree must be:", options: ["RED", "BLACK", "Either color", "Determined by insertion"], answerIndex: 1, hint: "Property 2 explicitly states the root is BLACK." },
              { question: "What is the maximum height of a Red-Black tree with n nodes?", options: ["log₂ n", "2 log₂ n", "2 log₂(n+1)", "1.44 log₂ n"], answerIndex: 2, hint: "The height is at most 2 log₂(n+1) due to the black-height property." },
              { question: "What color is a newly inserted node in a Red-Black tree?", options: ["Always BLACK", "Always RED", "Either RED or BLACK", "Determined by parent"], answerIndex: 1, hint: "New nodes are inserted as RED to minimize property violations (only property 4 can be violated, not property 5)." }
            ],
            procedure: [
              "Open the Code Test tab with RB tree starter code",
              "Define RBNode class with color property (true=RED, false=BLACK)",
              "Implement standard BST insertion",
              "Implement leftRotate and rightRotate with parent updates",
              "Implement insertFixup() with all uncle cases",
              "Test insertion sequence: 10, 20, 30, 15, 25, 5",
              "Verify properties after each insertion using tree validation function",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class RBNode {\n    constructor(key, isRed = true) {\n        this.key = key;\n        this.isRed = isRed;\n        this.left = null;\n        this.right = null;\n        this.parent = null;\n    }\n}\n\nclass RedBlackTree {\n    constructor() {\n        this.NIL = new RBNode(null, false);\n        this.root = this.NIL;\n    }\n\n    leftRotate(x) {\n        const y = x.right;\n        x.right = y.left;\n        if (y.left !== this.NIL) y.left.parent = x;\n        y.parent = x.parent;\n        if (x.parent === this.NIL) this.root = y;\n        else if (x === x.parent.left) x.parent.left = y;\n        else x.parent.right = y;\n        y.left = x;\n        x.parent = y;\n    }\n\n    rightRotate(y) {\n        const x = y.left;\n        y.left = x.right;\n        if (x.right !== this.NIL) x.right.parent = y;\n        x.parent = y.parent;\n        if (y.parent === this.NIL) this.root = x;\n        else if (y === y.parent.right) y.parent.right = x;\n        else y.parent.left = x;\n        x.right = y;\n        y.parent = x;\n    }\n\n    insert(key) {\n        let node = new RBNode(key);\n        node.left = this.NIL;\n        node.right = this.NIL;\n        let y = this.NIL;\n        let x = this.root;\n        while (x !== this.NIL) {\n            y = x;\n            if (key < x.key) x = x.left;\n            else x = x.right;\n        }\n        node.parent = y;\n        if (y === this.NIL) this.root = node;\n        else if (key < y.key) y.left = node;\n        else y.right = node;\n        this.insertFixup(node);\n    }\n\n    insertFixup(z) {\n        while (z.parent.isRed) {\n            if (z.parent === z.parent.parent.left) {\n                const y = z.parent.parent.right;\n                if (y.isRed) { // Case 1: Uncle is RED\n                    z.parent.isRed = false;\n                    y.isRed = false;\n                    z.parent.parent.isRed = true;\n                    z = z.parent.parent;\n                } else {\n                    if (z === z.parent.right) { // Case 2: z is right child\n                        z = z.parent;\n                        this.leftRotate(z);\n                    }\n                    // Case 3: z is left child\n                    z.parent.isRed = false;\n                    z.parent.parent.isRed = true;\n                    this.rightRotate(z.parent.parent);\n                }\n            } else {\n                // Mirror cases for right side\n                const y = z.parent.parent.left;\n                if (y.isRed) { // Case 1 mirror\n                    z.parent.isRed = false;\n                    y.isRed = false;\n                    z.parent.parent.isRed = true;\n                    z = z.parent.parent;\n                } else {\n                    if (z === z.parent.left) { // Case 2 mirror\n                        z = z.parent;\n                        this.rightRotate(z);\n                    }\n                    // Case 3 mirror\n                    z.parent.isRed = false;\n                    z.parent.parent.isRed = true;\n                    this.leftRotate(z.parent.parent);\n                }\n            }\n        }\n        this.root.isRed = false;\n    }\n}",
              steps: [
                { line: 1, annotation: "RBNode with color (true=RED, false=BLACK)", memory: [], output: "Node class defined with parent pointer" },
                { line: 2, annotation: "NIL sentinel represents all leaves", memory: [], output: "All leaves are BLACK" },
                { line: 3, annotation: "leftRotate with parent pointer updates", memory: [], output: "Rotation function complete" },
                { line: 4, annotation: "BST insertion without coloring", memory: [], output: "Standard BST placement" },
                { line: 5, annotation: "insertFixup handles 6 uncle cases", memory: [], output: "Properties restored after insertion" }
              ]
            },
            posttest: [
              { question: "In a Red-Black tree, what is the maximum height in terms of black-height?", options: ["2 × black-height", "black-height", "log₂ n", "2 log₂ n"], answerIndex: 0, hint: "Red nodes can't be adjacent, so the longest path alternates red-black, making it at most 2bh." },
              { question: "What color is a newly inserted node in Red-Black tree?", options: ["Always BLACK", "Always RED", "Either RED or BLACK", "Determined by parent"], answerIndex: 1, hint: "New nodes are inserted as RED to minimize property violations." },
              { question: "Case 1 in insertion fixup involves:", options: ["Rotation only", "Recoloring only", "Rotation then recolor", "Recolor then rotation"], answerIndex: 1, hint: "When uncle is RED, only recoloring is needed without rotations." },
              { question: "After fixing a red-black tree insertion, how many rotations are performed in the worst case?", options: ["O(log n)", "O(1) — at most 2 rotations", "O(n)", "None"], answerIndex: 1, hint: "Red-black tree insertion requires at most 2 rotations total, regardless of tree size." },
              { question: "What is the primary advantage of Red-Black trees over AVL trees?", options: ["Faster lookups", "Fewer rotations during insertions/deletions", "Simpler implementation", "Better memory usage"], answerIndex: 1, hint: "RB trees require at most 2 rotations for insertion and 3 for deletion, while AVL may require O(log n) rotations." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 13 on Red-Black Trees",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Addison-Wesley, Section 3.3 on Red-Black BSTs"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 3",
      objective: "B-Tree Implementation",
      tutorial: "Tutorial 3: B-Tree for External Memory",
      labTitle: "Lab 3: B-Tree",
      experiments: [
        {
          id: "ads-w3-1",
          title: "B-Tree — Insertion and Split",
          desc: "Implement a B-Tree of order 3 (minimum degree t=2) with insertion operation. Handle node splits when nodes are full.",
          expected: "B-Tree maintains properties: all leaves at same depth, each node has between t-1 and 2t-1 keys",
          content: {
            aim: {
              text: "In this experiment, the student will implement a B-Tree with insertion. The student will:",
              bullets: [
                "Define a B-Tree node with an array of keys and child pointers",
                "Implement search to find the correct leaf for insertion",
                "Implement splitChild() to split a full node into two nodes",
                "Implement insertNonFull() to insert into a non-full node",
                "Handle root split when the root becomes full"
              ]
            },
            theory: [
              {
                title: "B-Tree Fundamentals and Motivation",
                body: [
                  "B-Trees are self-balancing tree data structures designed specifically for systems that read and write large blocks of data, such as databases and file systems. Unlike binary search trees that store one key per node, B-Trees store many keys in a single node, making them optimal for disk-based storage.",
                  "",
                  "The key motivation: When data is too large to fit in memory, it must be stored on disk. Disk I/O is extremely slow compared to memory access. By storing many keys in each node, B-Trees minimize the number of disk reads required to find a record.",
                  "",
                  "A typical disk block might be 4KB, and a B-Tree node is designed to fit exactly within one disk block. This allows each node to be read with a single disk operation."
                ]
              },
              {
                title: "B-Tree Properties and Definitions",
                body: [
                  "Let t be the minimum degree of a B-Tree (t ≥ 2). Then:",
                  "",
                  "• Every node except the root must have at least t-1 keys.",
                  "• Every node can have at most 2t-1 keys.",
                  "• If a node has k keys, it must have exactly k+1 children (unless it's a leaf).",
                  "• All leaves are at the same depth (perfectly balanced).",
                  "• The order of a B-Tree is 2t (maximum children per node).",
                  "",
                  "For example, with t=2 (order 3, also called 2-3-4 tree):",
                  "• Nodes can have 1-3 keys",
                  "• Internal nodes can have 2-4 children",
                  "• Root can have as few as 1 key",
                  "",
                  "With t=3 (order 5):",
                  "• Nodes can have 2-5 keys",
                  "• Internal nodes can have 3-6 children"
                ]
              },
              {
                title: "B-Tree Insertion Algorithm",
                body: [
                  "Insertion in a B-Tree is more complex than binary trees due to the node size constraints:",
                  "",
                  "Step 1 — Find insertion leaf: Start at root and traverse down to find the appropriate leaf node where the key should be inserted.",
                  "",
                  "Step 2 — Split full root: Before descending, if the root is full (has 2t-1 keys), split it and create a new root. This is the only way the tree height increases.",
                  "",
                  "Step 3 — Insert into leaf: Once at the leaf, insert the key in sorted order.",
                  "",
                  "Step 4 — Handle leaf overflow: If the leaf now has 2t keys (overfull), split it:",
                  "  - Keep the smallest t-1 keys in the left node",
                  "  - Move the median key up to the parent",
                  "  - Put the largest t-1 keys in a new right node",
                  "  - Adjust child pointers accordingly",
                  "",
                  "Step 5 — Propagate splits: If the parent becomes full after receiving the median key, split it similarly. Splits can propagate up to the root."
                ]
              },
              {
                title: "Node Split Operation — Detailed Example",
                body: [
                  "Consider a B-Tree with t=2 (max 3 keys per node). Inserting into a full node [10, 20, 30]:",
                  "",
                  "Before split: Node contains [10, 20, 30]",
                  "Inserting 25 would cause overflow",
                  "",
                  "Split process:",
                  "1. Create new right node",
                  "2. Keep [10, 20] in left node (t-1 = 1 keys? Wait, careful)",
                  "   For t=2, keep 1 key? Actually we keep t-1 = 1 or 2?",
                  "   Standard split: keep first t-1 keys, move median up, keep last t-1 keys",
                  "   t=2: t-1 = 1, so keep 1 key on each side",
                  "3. Median key (20) moves up to parent",
                  "4. Left node: [10], Right node: [30]",
                  "5. New key 25 would go into appropriate node",
                  "",
                  "If the parent was full, the median from the parent would move up further."
                ]
              },
              {
                title: "Complexity Analysis",
                body: [
                  "Height: For a B-Tree of minimum degree t containing n keys, height h satisfies:",
                  "  h ≤ log_t((n+1)/2) + 1",
                  "",
                  "This is much smaller than binary trees! For example, with t=100, a B-Tree of height 3 can store over 1 million keys.",
                  "",
                  "Operation complexities (number of disk accesses):",
                  "• Search: O(log_t n) node accesses",
                  "• Insertion: O(log_t n) node accesses",
                  "• Deletion: O(log_t n) node accesses",
                  "",
                  "Each node access corresponds to one disk read/write, making B-Trees extremely efficient for external storage."
                ]
              },
              {
                title: "B-Tree vs Binary Search Trees",
                body: [
                  "Advantages of B-Trees for disk-based storage:",
                  "• High branching factor → very low height → fewer disk accesses",
                  "• Nodes sized to match disk blocks → efficient I/O",
                  "• All leaves at same depth → predictable performance",
                  "",
                  "When to use B-Trees:",
                  "• Database indexing (MySQL, PostgreSQL, MongoDB use B-Trees)",
                  "• File systems (NTFS, ext4 use B-Trees)",
                  "• Any application where data is stored on disk",
                  "",
                  "When to use BST/AVL/RB Trees:",
                  "• In-memory data structures",
                  "• When frequent insertions/deletions are needed",
                  "• When simplicity is more important than I/O optimization"
                ]
              }
            ],
            pretest: [
              { question: "For a B-Tree of minimum degree t=2 (order 3), the maximum number of keys per node is:", options: ["2", "3", "4", "5"], answerIndex: 1, hint: "Max keys = 2t-1 = 3 for t=2." },
              { question: "When a leaf node splits, what happens to the median key?", options: ["It is discarded", "It moves up to the parent", "It stays in left leaf", "It stays in right leaf"], answerIndex: 1, hint: "The median key is promoted to the parent node to maintain the tree structure." },
              { question: "All leaves in a B-Tree are at:", options: ["Different depths", "Same depth", "Depends on insertion order", "Maximum depth possible"], answerIndex: 1, hint: "B-Trees are perfectly balanced — all leaves at same height." },
              { question: "What is the minimum number of keys a non-root node can have in a B-Tree with t=3?", options: ["1", "2", "3", "4"], answerIndex: 1, hint: "Minimum keys per node (except root) = t-1 = 2 for t=3." },
              { question: "When does a B-Tree increase in height?", options: ["Every insertion", "When a leaf splits", "When the root splits", "When any node splits"], answerIndex: 2, hint: "Only root split increases tree height by creating a new root above the old one." }
            ],
            procedure: [
              "Open the Code Test tab with B-Tree starter code",
              "Define BTreeNode class with keys[], children[], and leaf flag",
              "Implement splitChild() to split a full child of a node",
              "Implement insertNonFull() for recursive insertion",
              "Implement insert() that handles root split",
              "Insert keys: 10, 20, 5, 6, 12, 30, 7, 17",
              "Verify tree properties after each insertion",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class BTreeNode {\n    constructor(t, leaf) {\n        this.t = t; // minimum degree\n        this.keys = [];\n        this.children = [];\n        this.leaf = leaf;\n    }\n}\n\nclass BTree {\n    constructor(t) {\n        this.root = null;\n        this.t = t;\n    }\n\n    splitChild(parent, i, fullChild) {\n        const newNode = new BTreeNode(this.t, fullChild.leaf);\n        // Move the last (t-1) keys to newNode\n        newNode.keys = fullChild.keys.splice(this.t - 1, this.t - 1);\n        \n        if (!fullChild.leaf) {\n            newNode.children = fullChild.children.splice(this.t, this.t);\n        }\n        \n        const medianKey = fullChild.keys.pop();\n        parent.children.splice(i + 1, 0, newNode);\n        parent.keys.splice(i, 0, medianKey);\n    }\n\n    insertNonFull(node, key) {\n        let i = node.keys.length - 1;\n        \n        if (node.leaf) {\n            // Insert key into leaf\n            while (i >= 0 && key < node.keys[i]) {\n                node.keys[i + 1] = node.keys[i];\n                i--;\n            }\n            node.keys[i + 1] = key;\n        } else {\n            // Find child to traverse\n            while (i >= 0 && key < node.keys[i]) i--;\n            i++;\n            \n            if (node.children[i].keys.length === 2 * this.t - 1) {\n                this.splitChild(node, i, node.children[i]);\n                if (key > node.keys[i]) i++;\n            }\n            this.insertNonFull(node.children[i], key);\n        }\n    }\n\n    insert(key) {\n        if (!this.root) {\n            this.root = new BTreeNode(this.t, true);\n            this.root.keys.push(key);\n            return;\n        }\n        \n        if (this.root.keys.length === 2 * this.t - 1) {\n            const newRoot = new BTreeNode(this.t, false);\n            newRoot.children.push(this.root);\n            this.splitChild(newRoot, 0, this.root);\n            this.root = newRoot;\n        }\n        this.insertNonFull(this.root, key);\n    }\n}",
              steps: [
                { line: 1, annotation: "BTreeNode with keys array and children array", memory: [], output: "Node structure defined" },
                { line: 2, annotation: "splitChild moves median key up, splits node", memory: [], output: "Split function ready" },
                { line: 3, annotation: "insertNonFull inserts into leaf or traverses", memory: [], output: "Recursive insertion" },
                { line: 4, annotation: "Root split creates new root when full", memory: [], output: "Tree height increases" }
              ]
            },
            posttest: [
              { question: "A B-Tree of minimum degree t=2 has node capacity of:", options: ["Max 3 keys, min 1 key", "Max 4 keys, min 2 keys", "Max 2 keys, min 0 keys", "Max 5 keys, min 3 keys"], answerIndex: 0, hint: "t=2 → max = 3 keys, min = 1 key (except root)." },
              { question: "When does a B-Tree increase in height?", options: ["Every insertion", "When a leaf splits", "When the root splits", "When any node splits"], answerIndex: 2, hint: "Only root split increases tree height." },
              { question: "What is the maximum number of children for a node in a B-Tree of order 5?", options: ["3", "4", "5", "6"], answerIndex: 2, hint: "Order = maximum children, so order 5 means max 5 children." },
              { question: "Why are B-Trees preferred over binary search trees for database indexing?", options: ["They are easier to implement", "They require less memory", "They reduce disk I/O by storing multiple keys per node", "They support faster insertions"], answerIndex: 2, hint: "The high branching factor minimizes disk reads." },
              { question: "What is the minimum degree t if a node can have at most 7 keys?", options: ["t=3", "t=4", "t=5", "t=7"], answerIndex: 1, hint: "Max keys = 2t-1 = 7 → 2t = 8 → t = 4." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 18 on B-Trees",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Addison-Wesley, Section 6.2 on B-Trees"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 4",
      objective: "B+ Tree Implementation",
      tutorial: "Tutorial 4: B+ Tree Structure and Operations",
      labTitle: "Lab 4: B+ Tree",
      experiments: [
        {
          id: "ads-w4-1",
          title: "B+ Tree — Insertion and Leaf Split",
          desc: "Implement a B+ Tree of order 3. All data resides in leaves; internal nodes only contain keys for routing. Leaf nodes are linked for range queries.",
          expected: "All keys in leaf nodes; internal nodes contain only routing keys; leaf nodes form a linked list",
          content: {
            aim: {
              text: "In this experiment, the student will implement a B+ Tree with insertion. The student will:",
              bullets: [
                "Distinguish between internal nodes (keys only) and leaf nodes (keys + data pointers)",
                "Implement leaf node split: median key copied up to parent",
                "Implement internal node split: median key pushed up (not copied)",
                "Maintain leaf linked list for efficient range traversal",
                "Compare B+ Tree with B-Tree for range queries"
              ]
            },
            theory: [
              {
                title: "B+ Tree Architecture — Key Differences from B-Tree",
                body: [
                  "The B+ Tree is a variation of the B-Tree specifically optimized for database indexing and file systems. The key differences are:",
                  "",
                  "1. Data Storage: In B+ Trees, only leaf nodes contain actual data records or pointers to data. Internal nodes store only keys for routing.",
                  "",
                  "2. Leaf Links: Leaf nodes are connected in a linked list, enabling efficient range queries and sequential access.",
                  "",
                  "3. Key Duplication: Keys in internal nodes may also appear in leaf nodes (as the first key of the right subtree).",
                  "",
                  "4. Higher Fanout: Since internal nodes don't store data pointers, they can hold more keys, resulting in a shorter tree.",
                  "",
                  "5. Range Queries: B+ Trees can traverse all keys in order by following leaf links without needing to navigate back up the tree."
                ]
              },
              {
                title: "B+ Tree Node Structure",
                body: [
                  "Leaf Node:",
                  "• Contains keys in sorted order",
                  "• Contains data pointers or actual data records",
                  "• Has a pointer to the next leaf node for range scans",
                  "• For a leaf node with L keys, it contains L key-pointer pairs",
                  "",
                  "Internal Node:",
                  "• Contains only keys for routing (no data pointers)",
                  "• Contains child pointers (one more than number of keys)",
                  "• For an internal node with K keys, it has K+1 child pointers",
                  "• Keys act as separators between child subtrees",
                  "",
                  "This separation of data and routing information is what gives B+ Trees their efficiency for sequential access patterns."
                ]
              },
              {
                title: "B+ Tree Insertion Algorithm",
                body: [
                  "Insertion in B+ Trees differs from B-Trees in how keys are propagated upward:",
                  "",
                  "Step 1 — Find insertion leaf: Traverse from root to find the appropriate leaf node.",
                  "",
                  "Step 2 — Insert into leaf: Add the key in sorted order with its data pointer.",
                  "",
                  "Step 3 — Handle leaf overflow: If leaf exceeds capacity (has 2t keys):",
                  "  - Split leaf into two leaves (left and right)",
                  "  - Keep first t keys in left leaf",
                  "  - Keep remaining t keys in right leaf",
                  "  - COPY the median key (first key of right leaf) up to parent",
                  "  - Link the new right leaf to the original leaf's next pointer",
                  "  - Update the original leaf's next pointer to point to new leaf",
                  "",
                  "Step 4 — Handle internal node overflow: When a parent receives a promoted key and becomes full (has 2t keys):",
                  "  - Split internal node",
                  "  - Keep first t keys in left node",
                  "  - MOVE the median key up to parent (not copy)",
                  "  - Keep remaining t-1 keys in right node",
                  "  - Distribute child pointers appropriately",
                  "",
                  "Step 5 — Root split: If root splits, create new root with the median key and two children."
                ]
              },
              {
                title: "Copy-Up vs Push-Up",
                body: [
                  "A crucial distinction in B+ Tree operations:",
                  "",
                  "Copy-Up (Leaf Split):",
                  "• When a leaf splits, the median key is COPIED to the parent",
                  "• The median key remains in the right leaf as the smallest key",
                  "• This ensures that all keys exist in leaves for complete data access",
                  "",
                  "Push-Up (Internal Node Split):",
                  "• When an internal node splits, the median key is MOVED (pushed up) to the parent",
                  "• The median key is removed from the internal node",
                  "• This ensures no key duplication at multiple levels",
                  "",
                  "Why this asymmetry? Leaves must contain all keys for data access, while internal nodes only need routing keys."
                ]
              },
              {
                title: "B+ Tree Range Query Optimization",
                body: [
                  "Range queries are where B+ Trees excel:",
                  "",
                  "Algorithm for range query [L, R]:",
                  "1. Find the leaf containing L (by standard search)",
                  "2. Traverse leaf nodes via next pointers until exceeding R",
                  "3. Collect all keys in the range",
                  "",
                  "Time complexity: O(log_t n + k) where k is the number of results returned.",
                  "",
                  "This is optimal because:",
                  "• Finding the starting leaf takes O(log_t n) I/O operations",
                  "• Each result typically requires one I/O operation",
                  "• No need to backtrack up the tree",
                  "",
                  "In contrast, B-Trees would require traversing up and down for each key in the range, making range queries much slower."
                ]
              },
              {
                title: "Applications and Real-World Use",
                body: [
                  "B+ Trees are the most widely used indexing structure in database systems:",
                  "",
                  "• MySQL/InnoDB: Uses B+ Trees for primary and secondary indexes",
                  "• PostgreSQL: Uses B+ Trees as default index type",
                  "• SQLite: B+ Tree-based storage engine",
                  "• MongoDB: Uses B+ Trees for indexed fields",
                  "• File systems: Many file systems use B+ Trees for directory indexing",
                  "",
                  "Why B+ Trees for databases?",
                  "• Excellent for both equality and range queries",
                  "• Sequential access via leaf links",
                  "• High fanout reduces disk I/O",
                  "• Data locality improves cache performance"
                ]
              }
            ],
            pretest: [
              { question: "In a B+ Tree, where are the actual data records stored?", options: ["Internal nodes", "Root node", "Leaf nodes only", "All nodes"], answerIndex: 2, hint: "B+ tree stores data only in leaves." },
              { question: "When a leaf node splits, the median key is:", options: ["Removed from both leaves", "Copied up to parent", "Pushed up and removed from leaf", "Discarded"], answerIndex: 1, hint: "Leaf split copies median up; internal node split pushes up." },
              { question: "How are B+ Trees optimized for range queries?", options: ["Internal node array", "Leaf node linked list", "Recursive search", "Hash indexing"], answerIndex: 1, hint: "Leaves are linked for sequential access." },
              { question: "What is a key advantage of B+ Tree over B-Tree for database systems?", options: ["Faster single-key lookups", "Better range query performance", "Less memory usage", "Simpler implementation"], answerIndex: 1, hint: "Leaf node linking enables efficient range scans." },
              { question: "In a B+ Tree, internal nodes store:", options: ["Both keys and data", "Only keys for routing", "Only data pointers", "Child pointers only"], answerIndex: 1, hint: "Internal nodes contain only keys to guide searching, not actual data." }
            ],
            procedure: [
              "Open the Code Test tab with B+ Tree starter code",
              "Define LeafNode and InternalNode classes",
              "Implement leaf insertion and leaf split",
              "Implement internal node insertion and split",
              "Maintain next pointer between leaf nodes",
              "Test insertion of keys: 10, 20, 5, 6, 12, 30, 7, 17",
              "Perform a range query from 5 to 20 using leaf links",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class BPlusTreeNode {\n    constructor(isLeaf, order) {\n        this.isLeaf = isLeaf;\n        this.keys = [];\n        this.children = []; // for internal nodes\n        this.next = null;   // for leaf nodes\n    }\n}\n\nclass BPlusTree {\n    constructor(order) {\n        this.order = order;\n        this.root = new BPlusTreeNode(true, order);\n    }\n\n    insert(key) {\n        const result = this.insertRecursive(this.root, key);\n        if (result && result.split) {\n            // Root split\n            const newRoot = new BPlusTreeNode(false, this.order);\n            newRoot.keys.push(result.medianKey);\n            newRoot.children.push(result.left);\n            newRoot.children.push(result.right);\n            this.root = newRoot;\n        }\n    }\n\n    insertRecursive(node, key) {\n        if (node.isLeaf) {\n            // Insert into leaf\n            let pos = 0;\n            while (pos < node.keys.length && key > node.keys[pos]) pos++;\n            node.keys.splice(pos, 0, key);\n            \n            if (node.keys.length <= this.order - 1) return null;\n            \n            // Leaf split\n            const splitIndex = Math.floor(this.order / 2);\n            const medianKey = node.keys[splitIndex];\n            const rightNode = new BPlusTreeNode(true, this.order);\n            rightNode.keys = node.keys.splice(splitIndex);\n            // Update leaf linked list\n            rightNode.next = node.next;\n            node.next = rightNode;\n            \n            return { left: node, right: rightNode, medianKey: medianKey, split: true };\n        } else {\n            // Internal node: traverse to appropriate child\n            let pos = 0;\n            while (pos < node.keys.length && key > node.keys[pos]) pos++;\n            const result = this.insertRecursive(node.children[pos], key);\n            \n            if (!result || !result.split) return null;\n            \n            // Insert median key into internal node\n            node.keys.splice(pos, 0, result.medianKey);\n            node.children.splice(pos + 1, 0, result.right);\n            \n            if (node.keys.length <= this.order - 1) return null;\n            \n            // Internal node split (push median up)\n            const splitIndex = Math.floor(this.order / 2);\n            const medianKey = node.keys[splitIndex];\n            const rightNode = new BPlusTreeNode(false, this.order);\n            rightNode.keys = node.keys.splice(splitIndex + 1);\n            rightNode.children = node.children.splice(splitIndex + 1);\n            node.keys.pop(); // Remove median from left node\n            \n            return { left: node, right: rightNode, medianKey: medianKey, split: true };\n        }\n    }\n    \n    rangeQuery(start, end) {\n        let leaf = this.findLeaf(start);\n        const result = [];\n        while (leaf) {\n            for (const key of leaf.keys) {\n                if (key > end) return result;\n                if (key >= start) result.push(key);\n            }\n            leaf = leaf.next;\n        }\n        return result;\n    }\n}",
              steps: [
                { line: 1, annotation: "B+ Tree node with isLeaf flag, next pointer for leaves", memory: [], output: "Node structure defined" },
                { line: 2, annotation: "Leaf insertion — copy median up on split", memory: [], output: "Leaf split logic" },
                { line: 3, annotation: "Internal node insertion — push median up on split", memory: [], output: "Internal node split" },
                { line: 4, annotation: "rangeQuery traverses leaf linked list", memory: [], output: "Efficient range traversal" }
              ]
            },
            posttest: [
              { question: "What is the advantage of B+ Tree over B-Tree for database indexing?", options: ["Less memory", "Faster search", "Better range queries due to leaf linked list", "Simpler implementation"], answerIndex: 2, hint: "Leaf linkage enables efficient sequential access." },
              { question: "In a B+ Tree leaf split, what is the relationship between the median key in leaf and internal node?", options: ["Key removed from leaf", "Key copied to internal node", "Key moved and removed from leaf", "Key ignored"], answerIndex: 1, hint: "Leaf splits copy median up; internal node splits move median up." },
              { question: "What happens during an internal node split in a B+ Tree?", options: ["Median key is copied up", "Median key is pushed up and removed", "Node is not split", "All keys are redistributed"], answerIndex: 1, hint: "Internal node splits move the median key to the parent." },
              { question: "Why do B+ Trees have higher fanout than B-Trees?", options: ["Larger node size", "No data pointers in internal nodes", "Better compression", "Smaller keys"], answerIndex: 1, hint: "Internal nodes store only keys, not data pointers, so they can hold more keys." },
              { question: "What is the time complexity of a range query in a B+ Tree returning k results?", options: ["O(log n + k)", "O(k log n)", "O(n)", "O(log n * k)"], answerIndex: 0, hint: "Finding start leaf takes O(log n), then traversing k leaf nodes takes O(k)." }
            ],
            references: [
              "Silberschatz, A., Korth, H.F. and Sudarshan, S. - 'Database System Concepts', 5th Edition, TMH, Chapter 11 on B+ Trees",
              "Ramakrishnan, R. and Gehrke, J. - 'Database Management Systems', 3rd Edition, TMH, Chapter 10 on B+ Trees"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 5",
      objective: "Segment Tree and Fenwick Tree for Range Queries",
      tutorial: "Tutorial 5: Range Query Data Structures",
      labTitle: "Lab 5: Segment Tree & Fenwick Tree",
      experiments: [
        {
          id: "ads-w5-1",
          title: "Segment Tree — Range Sum and Update",
          desc: "Implement a Segment Tree that supports point updates and range sum queries on an array. Also implement range minimum query.",
          expected: "Segment tree built in O(n), query in O(log n), update in O(log n)",
          content: {
            aim: {
              text: "In this experiment, the student will implement a Segment Tree for range queries. The student will:",
              bullets: [
                "Build segment tree from an input array",
                "Implement range sum query using divide and conquer",
                "Implement point update (set a value) with tree propagation",
                "Extend to range minimum query (RMQ) with same structure",
                "Understand the trade-off between build time, query time, and update time"
              ]
            },
            theory: [
              {
                title: "Segment Tree Fundamentals",
                body: [
                  "A Segment Tree is a versatile binary tree data structure used for answering range queries and performing point updates on an array in O(log n) time. It can answer queries like 'what is the sum of elements from index i to j?' or 'what is the minimum value between indices i and j?' efficiently.",
                  "",
                  "The key idea is to precompute and store aggregate information (sum, min, max, gcd, etc.) for various segments of the array. The tree is built recursively, where each node represents a segment [L, R] of the original array."
                ]
              },
              {
                title: "Segment Tree Structure and Representation",
                body: [
                  "For an array of size n, we build a complete binary tree:",
                  "",
                  "• Root node represents the entire array segment [0, n-1]",
                  "• Each node's left child represents [L, mid]",
                  "• Each node's right child represents [mid+1, R]",
                  "• Leaf nodes represent single elements [i, i]",
                  "",
                  "Array Representation:",
                  "We can store the segment tree in a 1D array of size 4n (safe upper bound):",
                  "• tree[1] — root",
                  "• tree[2*i] — left child",
                  "• tree[2*i+1] — right child",
                  "",
                  "For node covering range [L, R]:",
                  "• mid = (L + R) / 2",
                  "• Left child covers [L, mid]",
                  "• Right child covers [mid+1, R]"
                ]
              },
              {
                title: "Segment Tree Operations — Detailed",
                body: [
                  "Build Operation (O(n)):",
                  "• Recursively build left and right subtrees",
                  "• For leaf nodes, store the array value",
                  "• For internal nodes, combine child values (sum = left.sum + right.sum)",
                  "",
                  "Range Query (O(log n)):",
                  "• Start at root with query range [qL, qR]",
                  "• If node's segment is completely inside [qL, qR], return node's value",
                  "• If node's segment has no overlap with query, return neutral element (0 for sum, INF for min)",
                  "• Otherwise, recursively query both children and combine results",
                  "",
                  "Point Update (O(log n)):",
                  "• Update the leaf node at position 'index' with new value",
                  "• Recursively update all ancestors up to the root",
                  "• Each node's value = left.value + right.value",
                  "",
                  "Lazy Propagation (for range updates):",
                  "• When updating a range of values (e.g., add 5 to all indices from 2 to 7), we can't update each leaf",
                  "• Lazy propagation stores pending updates at nodes",
                  "• When visiting a node, apply pending updates before recursing",
                  "• Enables O(log n) range updates"
                ]
              },
              {
                title: "Range Minimum Query (RMQ) Implementation",
                body: [
                  "The same segment tree can answer minimum queries:",
                  "",
                  "• Leaf nodes store the array value",
                  "• Internal nodes store min(left.min, right.min)",
                  "• Query: return minimum of all overlapping segments",
                  "• Update: update leaf, propagate new min up",
                  "",
                  "Other aggregates possible:",
                  "• Maximum (max)",
                  "• Sum (addition)",
                  "• GCD (greatest common divisor)",
                  "• XOR (bitwise XOR)",
                  "• Multiplication (mod M)",
                  "",
                  "The key is that the combine operation must be associative for correctness."
                ]
              },
              {
                title: "Segment Tree vs Fenwick Tree vs Sparse Table",
                body: [
                  "Comparison of range query data structures:",
                  "",
                  "Segment Tree:",
                  "• Build: O(n), Query: O(log n), Update: O(log n)",
                  "• Supports any associative operation",
                  "• More memory (4n)",
                  "• More flexible (range updates with lazy propagation)",
                  "",
                  "Fenwick Tree (Binary Indexed Tree):",
                  "• Build: O(n) or O(n log n), Query: O(log n), Update: O(log n)",
                  "• Only supports invertible operations (sum, XOR, but not min/max)",
                  "• Less memory (n+1)",
                  "• Simpler to implement",
                  "",
                  "Sparse Table:",
                  "• Build: O(n log n), Query: O(1), Update: Impossible (static)",
                  "• Supports idempotent operations (min, max, gcd)",
                  "• Memory: O(n log n)",
                  "• Best for static data with many queries"
                ]
              }
            ],
            pretest: [
              { question: "Segment tree query time complexity is:", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 1, hint: "The tree depth is O(log n)." },
              { question: "How many nodes does a segment tree on an array of size n require?", options: ["n", "2n", "4n", "n^2"], answerIndex: 2, hint: "4n is a safe upper bound for array implementation." },
              { question: "To update a single element, how many nodes need to be updated?", options: ["1", "log n", "n", "n/2"], answerIndex: 1, hint: "Path from leaf to root has O(log n) nodes." },
              { question: "What is the neutral element for range sum query in segment tree?", options: ["0", "1", "-1", "Infinity"], answerIndex: 0, hint: "Adding 0 to any value leaves it unchanged." },
              { question: "Which operation cannot be supported efficiently by a Fenwick tree but can by a segment tree?", options: ["Sum", "XOR", "Minimum", "Product"], answerIndex: 2, hint: "Min operation is not invertible, so Fenwick tree cannot support it." }
            ],
            procedure: [
              "Open the Code Test tab with segment tree starter code",
              "Build tree recursively from leaf nodes",
              "Implement rangeSum(node, segLeft, segRight, qLeft, qRight)",
              "Implement pointUpdate(node, segLeft, segRight, index, newValue)",
              "Test on array [1,3,5,7,9,11]",
              "Query sum of range [1,4] (should be 3+5+7+9=24)",
              "Update index 2 to 10, query again",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class SegmentTree {\n    constructor(arr) {\n        this.n = arr.length;\n        this.tree = new Array(4 * this.n);\n        this.build(arr, 0, 0, this.n - 1);\n    }\n\n    build(arr, node, left, right) {\n        if (left === right) {\n            this.tree[node] = arr[left];\n            return;\n        }\n        const mid = Math.floor((left + right) / 2);\n        this.build(arr, 2 * node + 1, left, mid);\n        this.build(arr, 2 * node + 2, mid + 1, right);\n        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];\n    }\n\n    rangeSum(node, left, right, qLeft, qRight) {\n        if (qLeft > right || qRight < left) return 0;\n        if (qLeft <= left && right <= qRight) return this.tree[node];\n        const mid = Math.floor((left + right) / 2);\n        return this.rangeSum(2 * node + 1, left, mid, qLeft, qRight) +\n               this.rangeSum(2 * node + 2, mid + 1, right, qLeft, qRight);\n    }\n\n    pointUpdate(node, left, right, index, newValue) {\n        if (left === right) {\n            this.tree[node] = newValue;\n            return;\n        }\n        const mid = Math.floor((left + right) / 2);\n        if (index <= mid) this.pointUpdate(2 * node + 1, left, mid, index, newValue);\n        else this.pointUpdate(2 * node + 2, mid + 1, right, index, newValue);\n        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];\n    }\n}\n\n// Test\nconst arr = [1, 3, 5, 7, 9, 11];\nconst segTree = new SegmentTree(arr);\nconsole.log(segTree.rangeSum(0, 0, 5, 1, 4)); // 24\nsegTree.pointUpdate(0, 0, 5, 2, 10); // update index 2 to 10\nconsole.log(segTree.rangeSum(0, 0, 5, 1, 4)); // 3+10+7+9=29",
              steps: [
                { line: 1, annotation: "Build segment tree recursively", memory: [], output: "Tree built in O(n)" },
                { line: 2, annotation: "Range sum query — O(log n)", memory: [], output: "Sum [1,4] = 24" },
                { line: 3, annotation: "Point update — O(log n)", memory: [], output: "Index 2 updated to 10" },
                { line: 4, annotation: "Query after update", memory: [], output: "New sum = 29" }
              ]
            },
            posttest: [
              { question: "What is the space complexity of a segment tree array representation?", options: ["O(n)", "O(2n)", "O(4n)", "O(n^2)"], answerIndex: 2, hint: "4n is standard to avoid index errors." },
              { question: "Segment tree is most useful for:", options: ["Static array queries", "Dynamic array with updates and range queries", "Sorted array operations", "Graph traversals"], answerIndex: 1, hint: "Segment tree excels at both queries and updates." },
              { question: "For a segment tree with range sum queries, what is the time complexity of building the tree?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 2, hint: "Building touches each element once, so O(n)." },
              { question: "What is the purpose of lazy propagation in segment trees?", options: ["Reduce memory usage", "Enable O(log n) range updates", "Faster point updates", "Simplify implementation"], answerIndex: 1, hint: "Lazy propagation defers updates to avoid updating all leaves in a range." },
              { question: "Which of the following can be computed using a segment tree?", options: ["Sum", "Minimum", "GCD", "All of the above"], answerIndex: 3, hint: "Segment tree supports any associative operation." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter on Range Queries",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section on Segment Trees"
            ]
          }
        },
        {
          id: "ads-w5-2",
          title: "Fenwick Tree (Binary Indexed Tree) — Prefix Sum",
          desc: "Implement a Fenwick Tree (Binary Indexed Tree) for prefix sum queries and point updates on an array.",
          expected: "BIT built in O(n log n) or O(n), query and update in O(log n)",
          content: {
            aim: {
              text: "In this experiment, the student will implement a Fenwick Tree (BIT). The student will:",
              bullets: [
                "Understand the binary indexed tree structure using LSB (least significant bit)",
                "Implement build from array",
                "Implement prefix sum query using BIT",
                "Implement point update",
                "Compute range sum as sum(r) - sum(l-1)"
              ]
            },
            theory: [
              {
                title: "Fenwick Tree (Binary Indexed Tree) — The Magic of LSB",
                body: [
                  "The Fenwick Tree, also known as Binary Indexed Tree (BIT), is an elegant data structure that provides efficient prefix sum queries and point updates. What makes it beautiful is how it cleverly uses the binary representation of indices to distribute responsibility for array elements.",
                  "",
                  "The key insight: Each index i in the BIT stores the sum of a range of the original array. The length of this range is determined by the least significant bit (LSB) of i, also written as i & (-i)."
                ]
              },
              {
                title: "Understanding the BIT Structure",
                body: [
                  "For an array arr[1..n] (1-indexed for convenience), the BIT array bit[1..n] is defined such that:",
                  "",
                  "bit[i] = sum of arr[i - LSB(i) + 1] through arr[i]",
                  "",
                  "This means each bit[i] is responsible for a range of size equal to the lowest set bit of i.",
                  "",
                  "Examples:",
                  "• i=1 (binary 1): LSB=1 → bit[1] = arr[1]",
                  "• i=2 (binary 10): LSB=2 → bit[2] = arr[1] + arr[2]",
                  "• i=3 (binary 11): LSB=1 → bit[3] = arr[3]",
                  "• i=4 (binary 100): LSB=4 → bit[4] = arr[1] + arr[2] + arr[3] + arr[4]",
                  "• i=5 (binary 101): LSB=1 → bit[5] = arr[5]",
                  "• i=6 (binary 110): LSB=2 → bit[6] = arr[5] + arr[6]",
                  "",
                  "This distribution ensures that every prefix sum can be computed by adding O(log n) BIT entries."
                ]
              },
              {
                title: "Prefix Sum Query Algorithm",
                body: [
                  "To compute prefix sum from 1 to i:",
                  "",
                  "Initialize sum = 0",
                  "While i > 0:",
                  "    sum += bit[i]",
                  "    i -= LSB(i)  // Remove the lowest set bit",
                  "",
                  "Example: prefix sum up to 7 (binary 111):",
                  "• Add bit[7], then i = 7-1 = 6",
                  "• Add bit[6], then i = 6-2 = 4",
                  "• Add bit[4], then i = 4-4 = 0",
                  "",
                  "So bit[7] + bit[6] + bit[4] = arr[7] + (arr[5]+arr[6]) + (arr[1]+arr[2]+arr[3]+arr[4]) = complete sum up to 7."
                ]
              },
              {
                title: "Point Update Algorithm",
                body: [
                  "To add delta to arr[i]:",
                  "",
                  "While i <= n:",
                  "    bit[i] += delta",
                  "    i += LSB(i)  // Add LSB to move to next responsible index",
                  "",
                  "Example: Update arr[3] by +5:",
                  "• Update bit[3], then i = 3+1 = 4",
                  "• Update bit[4], then i = 4+4 = 8 (if n ≥ 8)",
                  "",
                  "This works because any bit[j] that includes arr[3] will be found by repeatedly adding LSB starting from 3."
                ]
              },
              {
                title: "Building a Fenwick Tree",
                body: [
                  "Method 1 — O(n log n):",
                  "• Initialize bit with zeros",
                  "• For i from 1 to n, call update(i, arr[i])",
                  "",
                  "Method 2 — O(n):",
                  "• Initialize bit as a copy of arr (1-indexed)",
                  "• For i from 1 to n:",
                  "    j = i + LSB(i)",
                  "    if j ≤ n: bit[j] += bit[i]",
                  "",
                  "This works because each bit[i] is added to the BIT entries that contain it in their range."
                ]
              },
              {
                title: "Fenwick Tree Applications",
                body: [
                  "Besides prefix sums, Fenwick trees can support:",
                  "",
                  "• Range Sum Queries: sum(l, r) = prefix(r) - prefix(l-1)",
                  "• Frequency Tables: Count frequencies and find kth smallest element",
                  "• Inversion Count: Count inversions in an array (i < j and arr[i] > arr[j])",
                  "• Order Statistics: Find the smallest index with prefix sum ≥ k (binary search on BIT)",
                  "",
                  "Limitations:",
                  "• Only supports invertible operations (can compute prefix(r) - prefix(l-1))",
                  "• Cannot support range minimum queries or other non-invertible operations",
                  "• All operations are prefix-based"
                ]
              }
            ],
            pretest: [
              { question: "What does LSB stand for in Fenwick Tree?", options: ["Last Significant Byte", "Least Significant Bit", "Lowest Start Bit", "Left Shift Bit"], answerIndex: 1, hint: "LSB is the lowest set bit in binary representation." },
              { question: "Fenwick tree is used for:", options: ["Range minimum queries", "Range sum queries (prefix)", "Graph shortest paths", "String matching"], answerIndex: 1, hint: "BIT is optimized for prefix sum queries." },
              { question: "What is the time complexity of a Fenwick tree update operation?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 1, hint: "The update traverses O(log n) indices by adding LSB." },
              { question: "What is bit[6] responsible for if arr is 1-indexed?", options: ["arr[6] only", "arr[5]+arr[6]", "arr[1]+arr[2]+arr[3]+arr[4]+arr[5]+arr[6]", "arr[3]+arr[4]+arr[5]+arr[6]"], answerIndex: 1, hint: "LSB(6) = 2 (binary 110), so bit[6] = arr[5] + arr[6]." },
              { question: "Can a Fenwick tree support range minimum queries?", options: ["Yes", "No, only invertible operations", "Yes, with modifications", "Only for static data"], answerIndex: 1, hint: "Min operation is not invertible, so BIT cannot support it." }
            ],
            procedure: [
              "Open the Code Test tab with Fenwick tree starter code",
              "Implement build using point updates or O(n) construction",
              "Implement update with LSB addition",
              "Implement query with LSB subtraction",
              "Test on array [1,3,5,7,9,11]",
              "Compute prefix sums: query(3) = 1+3+5=9",
              "Compute range sum [2,5] = query(5)-query(1)",
              "Update index 3 to 10, recompute queries",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class FenwickTree {\n    constructor(arr) {\n        this.n = arr.length;\n        this.bit = new Array(this.n + 1).fill(0);\n        for (let i = 1; i <= this.n; i++) {\n            this.update(i, arr[i - 1]);\n        }\n    }\n\n    update(idx, delta) {\n        while (idx <= this.n) {\n            this.bit[idx] += delta;\n            idx += idx & -idx; // Add LSB\n        }\n    }\n\n    query(idx) {\n        let sum = 0;\n        while (idx > 0) {\n            sum += this.bit[idx];\n            idx -= idx & -idx; // Remove LSB\n        }\n        return sum;\n    }\n\n    rangeSum(l, r) {\n        return this.query(r) - this.query(l - 1);\n    }\n}\n\n// Test\nconst arr = [1, 3, 5, 7, 9, 11];\nconst bit = new FenwickTree(arr);\nconsole.log(bit.query(3)); // 1+3+5=9\nconsole.log(bit.rangeSum(2, 5)); // 3+5+7+9=24\nbit.update(3, 5); // add 5 to index 3 (original value 5 becomes 10)\nconsole.log(bit.rangeSum(2, 5)); // 3+10+7+9=29",
              steps: [
                { line: 1, annotation: "Build BIT using point updates", memory: [], output: "BIT built in O(n log n)" },
                { line: 2, annotation: "update adds delta and moves up by LSB", memory: [], output: "O(log n) update" },
                { line: 3, annotation: "query sums prefixes by removing LSB", memory: [], output: "O(log n) query" },
                { line: 4, annotation: "rangeSum uses difference of prefix sums", memory: [], output: "Range [2,5] = 24" }
              ]
            },
            posttest: [
              { question: "Fenwick tree vs Segment Tree: Fenwick tree is:", options: ["More memory", "Less memory and simpler for prefix sums", "Slower for point updates", "Supports only range min"], answerIndex: 1, hint: "BIT uses O(n) space and is simpler for prefix sums." },
              { question: "What is LSB(i) for i=6 (binary 110)?", options: ["1", "2", "3", "6"], answerIndex: 1, hint: "LSB of 110 is 2 (binary 10)." },
              { question: "What is the prefix sum query [1,7] using BIT if bit[4]=10, bit[6]=7, bit[7]=3?", options: ["3", "10", "17", "20"], answerIndex: 3, hint: "Sum = bit[7] + bit[6] + bit[4] = 3 + 7 + 10 = 20." },
              { question: "Which of the following problems CANNOT be solved efficiently with a Fenwick tree?", options: ["Counting inversions", "Finding median of running stream", "Range minimum queries", "Order statistics"], answerIndex: 2, hint: "RMQ requires non-invertible min operation." },
              { question: "What is the time complexity of building a Fenwick tree in O(n) using the efficient method?", options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], answerIndex: 0, hint: "The efficient build method fills parent nodes in O(n) time." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter on Fenwick Trees",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section on Binary Indexed Trees"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 6",
      objective: "Binary Heap and Priority Queue",
      tutorial: "Tutorial 6: Heaps and Priority Queues",
      labTitle: "Lab 6: Binary Heap",
      experiments: [
        {
          id: "ads-w6-1",
          title: "Binary Heap — Insert, Extract Min, Heapify",
          desc: "Implement a Min-Heap (Binary Heap) with insertion, extract-min, and heapify operations.",
          expected: "Heap property maintained: parent <= children for min-heap",
          content: {
            aim: {
              text: "In this experiment, the student will implement a Binary Heap. The student will:",
              bullets: [
                "Implement heap array representation",
                "Implement bubbleUp (percolate up) for insertion",
                "Implement bubbleDown (heapify) for extract-min",
                "Implement buildHeap from an unsorted array in O(n)",
                "Implement priority queue operations: insert, extractMin, peek"
              ]
            },
            theory: [
              {
                title: "Binary Heap — The Priority Queue Workhorse",
                body: [
                  "A binary heap is a complete binary tree that satisfies the heap property. It's the most common implementation of a priority queue, providing O(log n) insert and extract-min operations, with O(1) peek.",
                  "",
                  "Complete Binary Tree Property: All levels are completely filled except possibly the last level, which is filled from left to right. This allows efficient array representation without explicit pointers."
                ]
              },
              {
                title: "Array Representation of Binary Heap",
                body: [
                  "For a heap stored in array `heap` (0-indexed):",
                  "",
                  "• Parent of node at index i: floor((i-1)/2)",
                  "• Left child of node at index i: 2*i + 1",
                  "• Right child of node at index i: 2*i + 2",
                  "",
                  "This mapping is possible because the heap is a complete binary tree. There are no gaps in the array representation.",
                  "",
                  "For 1-indexed representation (common in some implementations):",
                  "• Parent: floor(i/2)",
                  "• Left child: 2*i",
                  "• Right child: 2*i + 1"
                ]
              },
              {
                title: "Heap Property",
                body: [
                  "Min-Heap Property: For every node i, heap[i] ≤ heap[left child] AND heap[i] ≤ heap[right child]",
                  "",
                  "Max-Heap Property: For every node i, heap[i] ≥ heap[left child] AND heap[i] ≥ heap[right child]",
                  "",
                  "This property ensures that the minimum (or maximum) element is always at the root, enabling O(1) access."
                ]
              },
              {
                title: "Core Operations — Detailed",
                body: [
                  "Insert Operation (O(log n)):",
                  "1. Add new element at the end of the array (as a new leaf)",
                  "2. While the new element is smaller than its parent (for min-heap), swap with parent",
                  "3. This process is called \"bubble up\" or \"percolate up\"",
                  "",
                  "Extract-Min Operation (O(log n)):",
                  "1. Store root value (the minimum) to return later",
                  "2. Replace root with the last element in the heap",
                  "3. Remove the last element",
                  "4. While the new root is larger than either child, swap with the smaller child",
                  "5. This process is called \"bubble down\" or \"heapify\"",
                  "",
                  "Build Heap from Array (O(n)):",
                  "1. Start with the unsorted array",
                  "2. For i from last non-leaf node down to 0:",
                  "   - Call bubbleDown(i)",
                  "3. The algorithm is O(n) because only O(n) nodes are at non-leaf levels, and each bubbleDown takes O(log n) but the tighter analysis shows O(n)"
                ]
              },
              {
                title: "Heap Sort Algorithm",
                body: [
                  "Heap Sort uses a max-heap to sort an array in O(n log n):",
                  "",
                  "Phase 1 — Build Max-Heap: O(n)",
                  "• Rearrange array to satisfy max-heap property",
                  "",
                  "Phase 2 — Extract Max Repeatedly: O(n log n)",
                  "• For i from n-1 down to 1:",
                  "   - Swap heap[0] (max) with heap[i]",
                  "   - Reduce heap size by 1",
                  "   - Bubble down from root to restore heap property",
                  "",
                  "The result is a sorted array in increasing order. Heap sort is in-place and has O(n log n) worst-case time complexity."
                ]
              },
              {
                title: "Priority Queue Applications",
                body: [
                  "Binary heaps are used extensively for priority queue implementations:",
                  "",
                  "• Dijkstra's Shortest Path Algorithm: Extract minimum distance vertex",
                  "• Prim's Minimum Spanning Tree: Extract minimum edge weight",
                  "• Huffman Coding: Always merge two smallest frequencies",
                  "• Event-Driven Simulation: Process events in chronological order",
                  "• Operating Systems: Process scheduling (highest priority first)",
                  "• A* Pathfinding: Extract node with minimum f(n) score",
                  "",
                  "C++: `priority_queue` uses max-heap by default",
                  "Java: `PriorityQueue` implements min-heap",
                  "Python: `heapq` provides heap operations on lists"
                ]
              }
            ],
            pretest: [
              { question: "In array representation of a binary heap, where is the right child of node at index i?", options: ["2i", "2i+1", "2i+2", "i/2"], answerIndex: 2, hint: "For 0-indexed array, left=2i+1, right=2i+2." },
              { question: "What is the time complexity of building a heap from an array?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 2, hint: "Floyd's algorithm builds heap in O(n) by heapifying from last parent." },
              { question: "In a min-heap, the smallest element is at:", options: ["Any leaf", "Root", "Last position", "Middle"], answerIndex: 1, hint: "Min-heap property ensures root is smallest." },
              { question: "What is the time complexity of inserting an element into a binary heap?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 1, hint: "Insertion requires bubbling up, which takes O(log n) time." },
              { question: "Which data structure uses a binary heap as its underlying implementation?", options: ["Stack", "Queue", "Priority Queue", "Deque"], answerIndex: 2, hint: "Priority queue is typically implemented using a binary heap." }
            ],
            procedure: [
              "Open the Code Test tab with heap starter code",
              "Implement getParent, getLeftChild, getRightChild helper functions",
              "Implement bubbleUp (while child < parent, swap)",
              "Implement bubbleDown (while min(child) < current, swap)",
              "Implement insert and extractMin",
              "Implement buildHeap using bubbleDown on non-leaves",
              "Test: insert 10,5,15,3,8 — then extractMin repeatedly",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class MinHeap {\n    constructor() {\n        this.heap = [];\n    }\n\n    getParentIndex(i) { return Math.floor((i - 1) / 2); }\n    getLeftIndex(i) { return 2 * i + 1; }\n    getRightIndex(i) { return 2 * i + 2; }\n\n    bubbleUp(index) {\n        while (index > 0) {\n            const parent = this.getParentIndex(index);\n            if (this.heap[parent] > this.heap[index]) {\n                [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];\n                index = parent;\n            } else break;\n        }\n    }\n\n    bubbleDown(index) {\n        const size = this.heap.length;\n        while (true) {\n            let smallest = index;\n            const left = this.getLeftIndex(index);\n            const right = this.getRightIndex(index);\n            \n            if (left < size && this.heap[left] < this.heap[smallest]) smallest = left;\n            if (right < size && this.heap[right] < this.heap[smallest]) smallest = right;\n            \n            if (smallest !== index) {\n                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];\n                index = smallest;\n            } else break;\n        }\n    }\n\n    insert(key) {\n        this.heap.push(key);\n        this.bubbleUp(this.heap.length - 1);\n    }\n\n    extractMin() {\n        if (this.heap.length === 0) return null;\n        const min = this.heap[0];\n        const last = this.heap.pop();\n        if (this.heap.length > 0) {\n            this.heap[0] = last;\n            this.bubbleDown(0);\n        }\n        return min;\n    }\n\n    buildHeap(arr) {\n        this.heap = arr;\n        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {\n            this.bubbleDown(i);\n        }\n    }\n}\n\n// Test\nconst heap = new MinHeap();\nheap.insert(10);\nheap.insert(5);\nheap.insert(15);\nheap.insert(3);\nheap.insert(8);\nconsole.log(heap.extractMin()); // 3\nconsole.log(heap.extractMin()); // 5\nconsole.log(heap.extractMin()); // 8\n\nconst heap2 = new MinHeap();\nheap2.buildHeap([10,5,15,3,8]);\nconsole.log(heap2.extractMin()); // 3",
              steps: [
                { line: 1, annotation: "bubbleUp moves node up to maintain heap property", memory: [], output: "Insert O(log n)" },
                { line: 2, annotation: "bubbleDown moves node down after root removal", memory: [], output: "ExtractMin O(log n)" },
                { line: 3, annotation: "buildHeap uses bubbleDown from last parent", memory: [], output: "Build O(n)" }
              ]
            },
            posttest: [
              { question: "What is the height of a binary heap with n nodes?", options: ["log₂ n", "n", "n/2", "2ⁿ"], answerIndex: 0, hint: "Complete binary tree height is floor(log₂ n)." },
              { question: "Which operation is O(1) in a binary heap?", options: ["Insert", "ExtractMin", "Peek (getMin)", "Delete any element"], answerIndex: 2, hint: "Minimum element is always at root." },
              { question: "What is the space complexity of a binary heap?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 2, hint: "The heap uses O(n) space to store n elements." },
              { question: "In Heap Sort, what is the time complexity of building the initial heap?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 2, hint: "Building heap from array using Floyd's algorithm is O(n)." },
              { question: "Which of the following is NOT a valid application of a priority queue?", options: ["Dijkstra's algorithm", "Huffman coding", "Binary search", "Event-driven simulation"], answerIndex: 2, hint: "Binary search does not require priority queue operations." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 6 on Heapsort",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 2.4 on Priority Queues"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 7",
      objective: "Union-Find (Disjoint Set) with Path Compression",
      tutorial: "Tutorial 7: Disjoint Set Union (DSU)",
      labTitle: "Lab 7: Union-Find",
      experiments: [
        {
          id: "ads-w7-1",
          title: "Union-Find — Find, Union, Path Compression",
          desc: "Implement Disjoint Set Union (Union-Find) data structure with union by rank and path compression.",
          expected: "Find operation with path compression achieves nearly O(1) amortized time",
          content: {
            aim: {
              text: "In this experiment, the student will implement Union-Find (Disjoint Set Union). The student will:",
              bullets: [
                "Implement makeSet for each element",
                "Implement find with path compression (recursive or iterative)",
                "Implement union by rank (or size) to keep tree shallow",
                "Test connectivity queries on a set of elements",
                "Count number of connected components"
              ]
            },
            theory: [
              {
                title: "Disjoint Set Union — The Connectivity Powerhouse",
                body: [
                  "The Disjoint Set Union (DSU), also known as Union-Find, is a data structure that keeps track of a partition of a set into disjoint (non-overlapping) subsets. It provides near-constant-time operations to merge sets and check whether elements are in the same set.",
                  "",
                  "The two main operations are:",
                  "• find(x): Returns the representative (root) of the set containing x",
                  "• union(x, y): Merges the sets containing x and y into one set"
                ]
              },
              {
                title: "Basic Implementation — Parent Array",
                body: [
                  "The simplest implementation uses an array parent[] where parent[i] stores the parent of element i.",
                  "",
                  "Initially, each element is its own parent (represents a set of size 1):",
                  "  parent[i] = i",
                  "",
                  "Find operation without optimization:",
                  "  while parent[x] != x: x = parent[x]",
                  "  return x",
                  "",
                  "Union operation without optimization:",
                  "  rootX = find(x), rootY = find(y)",
                  "  if rootX != rootY: parent[rootX] = rootY",
                  "",
                  "This basic implementation can lead to tall trees, making find O(n) in worst case."
                ]
              },
              {
                title: "Union by Rank Optimization",
                body: [
                  "Union by rank keeps trees shallow by always attaching the smaller tree under the larger tree.",
                  "",
                  "We maintain a rank array (approximate height) for each root:",
                  "• Initially, rank[i] = 0 for all elements",
                  "",
                  "Union algorithm:",
                  "  rootX = find(x), rootY = find(y)",
                  "  if rootX == rootY: return",
                  "  if rank[rootX] < rank[rootY]: parent[rootX] = rootY",
                  "  else if rank[rootX] > rank[rootY]: parent[rootY] = rootX",
                  "  else: parent[rootY] = rootX, rank[rootX]++",
                  "",
                  "With union by rank alone, the tree height is at most O(log n)."
                ]
              },
              {
                title: "Path Compression Optimization",
                body: [
                  "Path compression flattens the tree by making every node point directly to the root during find operations.",
                  "",
                  "Find with path compression (recursive):",
                  "  if parent[x] != x: parent[x] = find(parent[x])",
                  "  return parent[x]",
                  "",
                  "Find with path compression (iterative):",
                  "  root = x",
                  "  while parent[root] != root: root = parent[root]",
                  "  while x != root:",
                  "    next = parent[x]",
                  "    parent[x] = root",
                  "    x = next",
                  "  return root",
                  "",
                  "Path compression ensures that subsequent find operations on the same path are extremely fast."
                ]
              },
              {
                title: "Time Complexity — The Inverse Ackermann Function",
                body: [
                  "With both union by rank and path compression, the amortized time per operation is O(α(n)), where α(n) is the inverse Ackermann function.",
                  "",
                  "The Ackermann function grows extremely fast: A(4) is already 2^65536. Therefore, α(n) ≤ 4 for any practical input size (n ≤ 10^80).",
                  "",
                  "This means operations are effectively O(1) for all real-world applications.",
                  "",
                  "Why inverse Ackermann? The analysis involves the concept of \"iterated logarithm\" and Ackermann's function, showing that the number of times a node's parent can change is extremely small."
                ]
              },
              {
                title: "Applications of Union-Find",
                body: [
                  "DSU is used in numerous algorithms and problems:",
                  "",
                  "• Kruskal's Minimum Spanning Tree: Union edges and detect cycles",
                  "• Connected Components in Graphs: Find number of connected components",
                  "• Dynamic Connectivity: Maintain connectivity under edge additions",
                  "• Image Processing: Connected component labeling in images",
                  "• Network Connectivity: Check if two computers are connected",
                  "• Percolation Problem: Model flow through porous materials",
                  "• Maze Generation: Generate random mazes using randomized Kruskal's",
                  "",
                  "Limitations: DSU typically only supports union operations (adding connections), not splitting sets (removing connections)."
                ]
              }
            ],
            pretest: [
              { question: "What is path compression in DSU?", options: ["Making all nodes point to root during find", "Compressing the array size", "Union by size", "Deleting nodes"], answerIndex: 0, hint: "Path compression flattens the tree structure." },
              { question: "Union by rank optimizes by:", options: ["Attaching smaller depth tree under larger depth", "Always attaching to left", "Random attachment", "Attaching to smaller size"], answerIndex: 0, hint: "Rank approximation of tree height." },
              { question: "What is the amortized time complexity of find operation with both optimizations?", options: ["O(1)", "O(log n)", "O(α(n))", "O(n)"], answerIndex: 2, hint: "Inverse Ackermann function is nearly constant." },
              { question: "What does the parent array represent in DSU?", options: ["The child of each node", "The representative of the set", "The parent pointer for tree structure", "The size of the set"], answerIndex: 2, hint: "Parent array stores the parent relationship in the DSU tree." },
              { question: "In Kruskal's algorithm, DSU is used to:", options: ["Sort edges", "Find MST edges without cycles", "Compute shortest path", "Find negative cycles"], answerIndex: 1, hint: "DSU detects cycles by checking if two vertices are already connected." }
            ],
            procedure: [
              "Open the Code Test tab with DSU starter code",
              "Implement parent array and rank array",
              "Implement find with path compression",
              "Implement union with rank comparison",
              "Test with 5 elements: makeSet for 0-4",
              "Union(0,1), Union(2,3), Union(1,3)",
              "Check find(0) == find(3) (should be true)",
              "Check find(4) == find(0) (should be false)",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class DSU {\n    constructor(n) {\n        this.parent = new Array(n);\n        this.rank = new Array(n).fill(0);\n        for (let i = 0; i < n; i++) {\n            this.parent[i] = i;\n        }\n    }\n\n    find(x) {\n        if (this.parent[x] !== x) {\n            this.parent[x] = this.find(this.parent[x]); // Path compression\n        }\n        return this.parent[x];\n    }\n\n    union(x, y) {\n        const rootX = this.find(x);\n        const rootY = this.find(y);\n        if (rootX === rootY) return false;\n        \n        // Union by rank\n        if (this.rank[rootX] < this.rank[rootY]) {\n            this.parent[rootX] = rootY;\n        } else if (this.rank[rootX] > this.rank[rootY]) {\n            this.parent[rootY] = rootX;\n        } else {\n            this.parent[rootY] = rootX;\n            this.rank[rootX]++;\n        }\n        return true;\n    }\n\n    connected(x, y) {\n        return this.find(x) === this.find(y);\n    }\n}\n\n// Test\nconst dsu = new DSU(5);\ndsu.union(0, 1);\ndsu.union(2, 3);\ndsu.union(1, 3);\nconsole.log(dsu.connected(0, 3)); // true\nconsole.log(dsu.connected(0, 4)); // false\nconsole.log(dsu.find(4)); // 4 (its own root)",
              steps: [
                { line: 1, annotation: "Parent array initialized with self pointers", memory: [], output: "Each element in its own set" },
                { line: 2, annotation: "Find with path compression — recursive", memory: [], output: "O(α(n)) amortized" },
                { line: 3, annotation: "Union by rank — attach smaller rank to larger", memory: [], output: "Balanced tree maintained" },
                { line: 4, annotation: "Connected check", memory: [], output: "0 and 3 connected, 0 and 4 not connected" }
              ]
            },
            posttest: [
              { question: "What is the amortized time complexity of find with both optimizations?", options: ["O(1)", "O(log n)", "O(α(n))", "O(n)"], answerIndex: 2, hint: "Inverse Ackermann function is nearly constant." },
              { question: "Union by rank prevents:", options: ["Path compression", "Tall trees", "Cycles", "Duplicates"], answerIndex: 1, hint: "It keeps trees shallow." },
              { question: "What is the value of α(n) for n ≤ 10⁸⁰?", options: ["1", "2", "3", "4"], answerIndex: 3, hint: "Ackermann function grows so fast that α(n) ≤ 4 for any practical n." },
              { question: "Which of the following is NOT an application of DSU?", options: ["Kruskal's algorithm", "Connected components", "Shortest path in weighted graph", "Percolation problem"], answerIndex: 2, hint: "Dijkstra's or Bellman-Ford, not DSU, are used for shortest paths." },
              { question: "What happens during path compression?", options: ["Tree becomes taller", "Tree becomes flatter", "Rank increases", "Parent pointers become null"], answerIndex: 1, hint: "Path compression makes nodes point directly to root, flattening the tree." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 21 on Disjoint Sets",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 1.5 on Union-Find"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 8",
      objective: "Open Addressing and Cuckoo Hashing",
      tutorial: "Tutorial 8: Advanced Hashing Techniques",
      labTitle: "Lab 8: Hashing",
      experiments: [
        {
          id: "ads-w8-1",
          title: "Open Addressing — Linear Probing",
          desc: "Implement a hash table using open addressing with linear probing for collision resolution.",
          expected: "Hash table with dynamic resizing; insert, search, delete operations",
          content: {
            aim: {
              text: "In this experiment, the student will implement a hash table with open addressing. The student will:",
              bullets: [
                "Define a hash function h(k) = k mod tableSize",
                "Implement linear probing: probe = (h(k) + i) mod M",
                "Handle deletion using lazy deletion (tombstones)",
                "Implement dynamic resizing when load factor exceeds threshold",
                "Compare open addressing with chaining"
              ]
            },
            theory: [
              {
                title: "Hash Tables and Collision Resolution",
                body: [
                  "A hash table is a data structure that maps keys to values using a hash function. The hash function computes an index into an array where the key-value pair is stored.",
                  "",
                  "Collisions occur when two different keys hash to the same index. There are two main strategies to handle collisions:",
                  "",
                  "1. Chaining: Each array position contains a linked list (or other structure) of colliding keys",
                  "2. Open Addressing: All elements are stored in the array itself; collisions are resolved by probing (searching) for alternative slots",
                  "",
                  "Open addressing has the advantage of better cache performance and no memory overhead for pointers, but it requires careful handling of deletions and has a maximum load factor less than 1."
                ]
              },
              {
                title: "Linear Probing — Mechanism and Analysis",
                body: [
                  "Linear probing is the simplest open addressing strategy. When a collision occurs at index h(k), the algorithm checks h(k)+1, h(k)+2, etc. (wrapping around modulo table size).",
                  "",
                  "Probe sequence: h(k, i) = (h(k) + i) mod M, where i = 0, 1, 2, ...",
                  "",
                  "Characteristics:",
                  "• Simple to implement",
                  "• Good cache performance due to sequential probe locations",
                  "• Suffers from primary clustering: long runs of occupied slots form, causing longer probes",
                  "",
                  "Performance degrades significantly as load factor increases. With load factor α = n/M:",
                  "• Successful search: ~(1/2)(1 + 1/(1-α))",
                  "• Unsuccessful search: ~(1/2)(1 + 1/(1-α)²)",
                  "• When α > 0.7, performance drops rapidly",
                  "",
                  "For good performance, keep α < 0.7 and resize when exceeded."
                ]
              },
              {
                title: "Quadratic Probing and Double Hashing",
                body: [
                  "To reduce clustering, other probing strategies can be used:",
                  "",
                  "Quadratic Probing:",
                  "  h(k, i) = (h(k) + c₁i + c₂i²) mod M",
                  "  • Reduces primary clustering (secondary clustering still occurs)",
                  "  • May not probe all slots (M should be prime and c₁, c₂ chosen carefully)",
                  "",
                  "Double Hashing:",
                  "  h(k, i) = (h₁(k) + i·h₂(k)) mod M",
                  "  • Uses two independent hash functions",
                  "  • Eliminates clustering",
                  "  • Requires that h₂(k) and M be relatively prime",
                  "  • Typically M is prime and h₂(k) = 1 + (k mod (M-1))",
                  "",
                  "Double hashing provides the best distribution but is slightly more computationally expensive."
                ]
              },
              {
                title: "Deletion in Open Addressing — Tombstones",
                body: [
                  "Deleting an element from an open addressing hash table is not straightforward. Simply setting the slot to empty would break the probe sequence for subsequent elements that may have been placed after the deleted element.",
                  "",
                  "Solution: Lazy deletion using tombstones",
                  "",
                  "A tombstone is a special marker indicating that a slot was previously occupied but is now empty. During search and insertion, tombstones are treated as empty slots for insertion but as occupied for search continuation.",
                  "",
                  "Insertion algorithm:",
                  "  • Probe until finding an empty slot or tombstone",
                  "  • If tombstone, remember position",
                  "  • If key already exists, update value",
                  "  • Otherwise, insert at first tombstone or empty slot",
                  "",
                  "Search algorithm:",
                  "  • Probe until finding the key or an empty slot",
                  "  • Skip over tombstones (they indicate occupied during search)",
                  "",
                  "Tombstones accumulate over time, degrading performance. Periodic rehashing can clean them up."
                ]
              },
              {
                title: "Dynamic Resizing",
                body: [
                  "To maintain good performance, hash tables need to resize when the load factor exceeds a threshold (typically 0.7 for open addressing).",
                  "",
                  "Resizing process:",
                  "1. Create a new table with size approximately double (or a prime larger than 2×)",
                  "2. Rehash all keys from the old table into the new table (tombstones are skipped)",
                  "3. Replace the old table with the new table",
                  "",
                  "Time complexity: O(n) to rehash all elements. Amortized cost over many insertions is O(1) per insertion because resizing occurs infrequently (exponential growth).",
                  "",
                  "Choosing new table size: Often choose a prime number approximately 2× the current size to improve distribution with modulo hashing."
                ]
              }
            ],
            pretest: [
              { question: "What is linear probing?", options: ["Hash then linear search", "Probing slots sequentially from collision point", "Binary search in table", "Chaining"], answerIndex: 1, hint: "Linear probing checks i+1, i+2, etc." },
              { question: "How is deletion handled in linear probing?", options: ["Remove and shift", "Tombstone (special marker)", "Rehash all", "Compaction"], answerIndex: 1, hint: "Tombstones prevent search breakage." },
              { question: "What is primary clustering in linear probing?", options: ["Keys cluster near table start", "Long runs of occupied slots", "All keys in one bucket", "No collisions"], answerIndex: 1, hint: "Primary clustering causes consecutive occupied slots." },
              { question: "What is a typical load factor threshold for resizing an open addressing hash table?", options: ["0.5", "0.7", "0.9", "1.0"], answerIndex: 1, hint: "Performance degrades rapidly after α > 0.7." },
              { question: "Which probing method best eliminates clustering?", options: ["Linear probing", "Quadratic probing", "Double hashing", "Chaining"], answerIndex: 2, hint: "Double hashing uses two independent hash functions, virtually eliminating clustering." }
            ],
            procedure: [
              "Open the Code Test tab with open addressing starter code",
              "Implement hash function (k mod size)",
              "Implement insert with linear probing",
              "Implement search with probing until found or empty",
              "Implement delete using tombstone marker",
              "Implement resize when load factor > 0.7",
              "Test insert, search, delete, and rehash",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class OpenAddressingHashTable {\n    constructor(initialSize = 7) {\n        this.table = new Array(initialSize).fill(null);\n        this.size = 0;\n        this.capacity = initialSize;\n        this.DELETED = Symbol('deleted');\n        this.loadFactorThreshold = 0.7;\n    }\n\n    hash(key) {\n        return key % this.capacity;\n    }\n\n    insert(key) {\n        if (this.size / this.capacity >= this.loadFactorThreshold) {\n            this.resize();\n        }\n        \n        let index = this.hash(key);\n        let i = 0;\n        while (this.table[index] !== null && this.table[index] !== this.DELETED && this.table[index] !== key) {\n            i++;\n            index = (this.hash(key) + i) % this.capacity;\n        }\n        if (this.table[index] !== key) this.size++;\n        this.table[index] = key;\n    }\n\n    search(key) {\n        let index = this.hash(key);\n        let i = 0;\n        while (this.table[index] !== null) {\n            if (this.table[index] === key) return index;\n            i++;\n            index = (this.hash(key) + i) % this.capacity;\n        }\n        return -1;\n    }\n\n    delete(key) {\n        const index = this.search(key);\n        if (index !== -1) {\n            this.table[index] = this.DELETED;\n            this.size--;\n            return true;\n        }\n        return false;\n    }\n\n    resize() {\n        const oldTable = this.table;\n        this.capacity = this.capacity * 2;\n        this.table = new Array(this.capacity).fill(null);\n        this.size = 0;\n        for (const item of oldTable) {\n            if (item !== null && item !== this.DELETED) {\n                this.insert(item);\n            }\n        }\n    }\n}\n\n// Test\nconst ht = new OpenAddressingHashTable(5);\nht.insert(10);\nht.insert(20);\nht.insert(15);\nht.insert(25);\nht.insert(30); // triggers resize\nconsole.log(ht.search(25)); // found\nht.delete(25);\nconsole.log(ht.search(25)); // -1 (not found)",
              steps: [
                { line: 1, annotation: "Tombstone marker for lazy deletion", memory: [], output: "DELETED symbol defined" },
                { line: 2, annotation: "Insert with linear probing", memory: [], output: "Probing until empty or deleted slot" },
                { line: 3, annotation: "Resize when load factor > threshold", memory: [], output: "Double capacity and rehash" }
              ]
            },
            posttest: [
              { question: "What is a tombstone in open addressing?", options: ["Marker for deleted element", "Marker for empty slot", "Marker for end of table", "Marker for duplicate"], answerIndex: 0, hint: "Tombstone indicates a formerly occupied slot." },
              { question: "Linear probing can cause:", options: ["Secondary clustering", "Primary clustering", "No clustering", "Perfect hashing"], answerIndex: 1, hint: "Linear probing leads to long runs of occupied slots." },
              { question: "What is the primary disadvantage of using tombstones?", options: ["Cannot delete elements", "Tombstones accumulate and degrade performance", "Search becomes slower", "Insertion becomes impossible"], answerIndex: 1, hint: "Tombstones occupy space and require periodic rehashing to clean up." },
              { question: "For linear probing with load factor α, the expected number of probes for an unsuccessful search is approximately:", options: ["1/(1-α)", "1/2(1 + 1/(1-α)²)", "1/2(1 + 1/(1-α))", "1/α"], answerIndex: 1, hint: "Unsuccessful search requires more probes as load factor increases." },
              { question: "Why is it important to choose a prime table size for linear probing?", options: ["Easier to compute", "Reduces clustering", "Ensures all slots are probed when using certain strategies", "Faster modulo operation"], answerIndex: 2, hint: "Prime size helps ensure that the probe sequence covers all slots." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 11 on Hash Tables",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 3.4 on Hash Tables"
            ]
          }
        },
        {
          id: "ads-w8-2",
          title: "Cuckoo Hashing",
          desc: "Implement Cuckoo Hashing with two hash tables and two hash functions. Handle insertion with kicking until cycle or rehash.",
          expected: "O(1) worst-case lookup; O(1) amortized insertion",
          content: {
            aim: {
              text: "In this experiment, the student will implement Cuckoo Hashing. The student will:",
              bullets: [
                "Implement two hash functions h1 and h2",
                "Implement insert: place key in T1[h1(k)]; if occupied, kick out existing key",
                "Repeat kicking until position found or cycle detected",
                "Rehash with new hash functions if cycle occurs",
                "Achieve O(1) worst-case lookup"
              ]
            },
            theory: [
              {
                title: "Cuckoo Hashing — The Elegant Alternative",
                body: [
                  "Cuckoo hashing is a powerful open addressing technique that achieves O(1) worst-case lookup by using two (or more) hash tables and a \"kicking\" strategy during insertion.",
                  "",
                  "The name comes from the cuckoo bird, which pushes other eggs out of the nest — similarly, a new key may \"kick out\" an existing key to its alternative location.",
                  "",
                  "Standard cuckoo hashing uses two hash functions h1 and h2, and two tables T1 and T2 (or a single table with two hash functions mapping to different ranges)."
                ]
              },
              {
                title: "Cuckoo Hashing Operations",
                body: [
                  "Lookup (O(1) worst-case):",
                  "  • Check T1[h1(key)] — if match, return value",
                  "  • Check T2[h2(key)] — if match, return value",
                  "  • Otherwise, key not present",
                  "  • This is constant time regardless of load factor!",
                  "",
                  "Insertion (amortized O(1)):",
                  "  • Start with key x at position h1(x) in T1",
                  "  • For up to maxLoop iterations:",
                  "     - If T1[h1(x)] is empty, place x there and return",
                  "     - Otherwise, swap x with the key y currently at T1[h1(x)]",
                  "     - Move to T2 with key y at position h2(y)",
                  "     - Continue the same process",
                  "  • If maxLoop is reached, a cycle is detected → rehash",
                  "",
                  "Deletion: Similar to lookup, set the appropriate slot to empty."
                ]
              },
              {
                title: "Cycle Detection and Rehashing",
                body: [
                  "Cuckoo hashing insertions can sometimes enter an infinite loop where keys keep kicking each other in a cycle.",
                  "",
                  "Cycle detection: If the number of steps exceeds a threshold (e.g., log n or a constant like 100 times), we assume a cycle exists.",
                  "",
                  "When a cycle is detected, rehashing is necessary:",
                  "1. Choose new hash functions (or new table sizes)",
                  "2. Create new tables of larger size (typically 2×)",
                  "3. Reinsert all keys using the new hash functions",
                  "4. The probability of another cycle is extremely low",
                  "",
                  "Expected rehash frequency: O(1/n) per insertion, so amortized cost remains O(1)."
                ]
              },
              {
                title: "Analysis of Cuckoo Hashing",
                body: [
                  "Load factor: For successful operation, cuckoo hashing requires load factor α < 0.5 for two tables. Higher load factors increase the probability of cycles.",
                  "",
                  "Space: 2n cells for n elements (twice the space of chaining, but still O(n)).",
                  "",
                  "Time:",
                  "• Lookup: O(1) worst-case (only two checks)",
                  "• Insertion: O(1) amortized expected (average number of kicks is small)",
                  "• Deletion: O(1)",
                  "",
                  "Variants:",
                  "• d-ary cuckoo hashing: Use d > 2 hash functions for higher load factors",
                  "• Cuckoo filter: Space-efficient probabilistic data structure for set membership"
                ]
              },
              {
                title: "Comparison with Other Hashing Techniques",
                body: [
                  "Cuckoo hashing vs Chaining:",
                  "• Lookup: Cuckoo O(1) worst-case vs chaining O(1) average",
                  "• Memory: Cuckoo less efficient (need empty slots)",
                  "• Deletion: Cuckoo simple vs chaining requiring list deletion",
                  "",
                  "Cuckoo vs Linear Probing:",
                  "• Lookup: Cuckoo O(1) worst-case vs linear O(1) average",
                  "• Cache performance: Linear probing has better locality",
                  "• Implementation: Cuckoo more complex",
                  "",
                  "When to use Cuckoo hashing:",
                  "• Applications requiring guaranteed constant-time lookups",
                  "• Real-time systems where worst-case matters",
                  "• Hardware implementations (network routers, etc.)",
                  "• When memory is sufficient for lower load factors"
                ]
              }
            ],
            pretest: [
              { question: "Cuckoo hashing guarantees which complexity for lookup?", options: ["O(1) worst-case", "O(1) average", "O(log n)", "O(n)"], answerIndex: 0, hint: "Only two positions are checked, regardless of table size." },
              { question: "What happens if a kick cycle is detected?", options: ["Insert fails", "Rehash with new hash functions", "Use chaining", "Delete the key"], answerIndex: 1, hint: "Rehashing resolves cycles." },
              { question: "What is the maximum load factor for standard cuckoo hashing with two tables to work well?", options: ["0.3", "0.5", "0.7", "0.9"], answerIndex: 1, hint: "Load factor > 0.5 increases probability of cycles significantly." },
              { question: "How many positions are checked in a cuckoo hashing lookup?", options: ["1", "2", "log n", "n"], answerIndex: 1, hint: "Only T1[h1] and T2[h2] are checked." },
              { question: "Why is cuckoo hashing named after the cuckoo bird?", options: ["Fast like a bird", "Kicks out existing keys like the bird pushes eggs", "Migrates between tables", "Sings while hashing"], answerIndex: 1, hint: "The kicking behavior resembles the cuckoo bird's nesting habits." }
            ],
            procedure: [
              "Open the Code Test tab with cuckoo hashing starter code",
              "Define two hash functions h1, h2 (different moduli or using different bases)",
              "Implement lookup: check both tables",
              "Implement insert with kicking loop (max 100 iterations)",
              "If iteration limit reached, rehash with larger table and new hash functions",
              "Test inserts: 10, 20, 30, 25, 15, 5",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class CuckooHashTable {\n    constructor(size = 10) {\n        this.size = size;\n        this.table1 = new Array(size).fill(null);\n        this.table2 = new Array(size).fill(null);\n    }\n\n    hash1(key) {\n        return key % this.size;\n    }\n\n    hash2(key) {\n        return Math.floor(key / this.size) % this.size;\n    }\n\n    lookup(key) {\n        if (this.table1[this.hash1(key)] === key) return true;\n        if (this.table2[this.hash2(key)] === key) return true;\n        return false;\n    }\n\n    insert(key, maxIter = 100) {\n        let currentKey = key;\n        for (let i = 0; i < maxIter; i++) {\n            const pos1 = this.hash1(currentKey);\n            const temp = this.table1[pos1];\n            this.table1[pos1] = currentKey;\n            if (temp === null) return true;\n            \n            const pos2 = this.hash2(temp);\n            currentKey = temp;\n            const temp2 = this.table2[pos2];\n            this.table2[pos2] = currentKey;\n            if (temp2 === null) return true;\n            currentKey = temp2;\n        }\n        // Cycle detected — rehash\n        this.rehash();\n        this.insert(key);\n        return false;\n    }\n\n    rehash() {\n        const oldKeys = [...this.table1, ...this.table2].filter(k => k !== null);\n        this.size *= 2;\n        this.table1 = new Array(this.size).fill(null);\n        this.table2 = new Array(this.size).fill(null);\n        for (const key of oldKeys) {\n            this.insert(key);\n        }\n    }\n}\n\n// Test\nconst cuckoo = new CuckooHashTable(5);\ncuckoo.insert(10);\ncuckoo.insert(20);\ncuckoo.insert(15);\ncuckoo.insert(25);\ncuckoo.insert(30);\nconsole.log(cuckoo.lookup(15)); // true\nconsole.log(cuckoo.lookup(99)); // false",
              steps: [
                { line: 1, annotation: "Two hash functions for two tables", memory: [], output: "h1 and h2 defined" },
                { line: 2, annotation: "Insert with kicking loop", memory: [], output: "Keys bounce between tables" },
                { line: 3, annotation: "Rehash on cycle detection", memory: [], output: "Larger table, new hash functions" },
                { line: 4, annotation: "Lookup O(1)", memory: [], output: "Check two positions" }
              ]
            },
            posttest: [
              { question: "What is the worst-case lookup time in cuckoo hashing?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 0, hint: "Only two positions need to be checked." },
              { question: "When does a rehash occur in cuckoo hashing?", options: ["Every insert", "When load factor > 0.5", "When a kick cycle is detected", "Never"], answerIndex: 2, hint: "Cycles require rehashing." },
              { question: "How does d-ary cuckoo hashing (using d > 2 hash functions) improve performance?", options: ["Allows higher load factor", "Reduces memory usage", "Simplifies implementation", "Eliminates need for rehashing"], answerIndex: 0, hint: "More hash functions mean more possible positions, allowing higher load factors." },
              { question: "What is the amortized time complexity of insertion in cuckoo hashing?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 0, hint: "Despite occasional rehashes, amortized insertion is O(1)." },
              { question: "Which of the following is a disadvantage of cuckoo hashing compared to linear probing?", options: ["Worse worst-case lookup", "Better cache performance", "Worse memory efficiency (lower max load factor)", "Slower insertions"], answerIndex: 2, hint: "Cuckoo hashing requires α < 0.5 for good performance, wasting more space." }
            ],
            references: [
              "Pagh, R. and Rodler, F.F. - 'Cuckoo Hashing', Journal of Algorithms, 2004",
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, Chapter 11 on Hash Tables"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 9",
      objective: "Trie Implementation",
      tutorial: "Tutorial 9: Trie (Prefix Tree)",
      labTitle: "Lab 9: Trie",
      experiments: [
        {
          id: "ads-w9-1",
          title: "Trie — Insert, Search, Prefix Search",
          desc: "Implement a Trie (prefix tree) for storing strings. Support insert, search, startsWith (prefix search), and delete operations.",
          expected: "Trie with each node having children array; O(m) time for operations where m is string length",
          content: {
            aim: {
              text: "In this experiment, the student will implement a Trie data structure. The student will:",
              bullets: [
                "Define TrieNode with children array (26 for lowercase English) and isEndOfWord flag",
                "Implement insert: traverse each character, create new nodes as needed",
                "Implement search: traverse each character, check isEndOfWord at end",
                "Implement startsWith (prefix search): traverse prefix, return true if all characters exist",
                "Implement delete: recursive deletion with cleanup of unused nodes"
              ]
            },
            theory: [
              {
                title: "Trie — The Prefix Tree",
                body: [
                  "A Trie (also called digital tree or prefix tree) is a tree data structure used for efficient string storage and retrieval, especially when dealing with strings that share common prefixes.",
                  "",
                  "The name 'Trie' comes from the word 'retrieval', indicating its primary purpose. Unlike binary search trees that compare whole keys, tries compare character by character."
                ]
              },
              {
                title: "Trie Node Structure",
                body: [
                  "Each node in a Trie typically contains:",
                  "",
                  "• Children: An array (or map) of references to child nodes, one for each possible character",
                  "• isEndOfWord: A boolean flag indicating whether this node marks the end of a valid word",
                  "• (Optional) Value: For associative tries (like a dictionary)",
                  "• (Optional) Frequency: Count how many times a word was inserted",
                  "",
                  "For lowercase English letters, an array of size 26 is efficient. For Unicode or larger alphabets, a hash map is more appropriate."
                ]
              },
              {
                title: "Trie Operations — Detailed",
                body: [
                  "Insert(word):",
                  "  node = root",
                  "  for each character c in word:",
                  "    if node.children[c] doesn't exist: create it",
                  "    node = node.children[c]",
                  "  node.isEndOfWord = true",
                  "",
                  "Search(word):",
                  "  node = root",
                  "  for each character c in word:",
                  "    if node.children[c] doesn't exist: return false",
                  "    node = node.children[c]",
                  "  return node.isEndOfWord",
                  "",
                  "StartsWith(prefix):",
                  "  node = root",
                  "  for each character c in prefix:",
                  "    if node.children[c] doesn't exist: return false",
                  "    node = node.children[c]",
                  "  return true  // Prefix exists, not necessarily a word",
                  "",
                  "Delete(word) — Recursive:",
                  "  function delete(node, word, depth):",
                  "    if depth == word.length:",
                  "      if not node.isEndOfWord: return false",
                  "      node.isEndOfWord = false",
                  "      return node has no children",
                  "    c = word[depth]",
                  "    if node.children[c] doesn't exist: return false",
                  "    shouldDelete = delete(node.children[c], word, depth+1)",
                  "    if shouldDelete:",
                  "      delete node.children[c]",
                  "      return node.isEndOfWord == false and node has no children",
                  "    return false"
                ]
              },
              {
                title: "Time and Space Complexity",
                body: [
                  "Time Complexity (m = length of string, n = number of strings):",
                  "• Insert: O(m)",
                  "• Search: O(m)",
                  "• StartsWith: O(m)",
                  "• Delete: O(m)",
                  "",
                  "This is independent of the number of strings! Very efficient for prefix-based queries.",
                  "",
                  "Space Complexity:",
                  "• Worst case: O(total characters × alphabet size) if each character creates new nodes at each level",
                  "• In practice: O(total characters) with shared prefixes",
                  "",
                  "Example: Inserting 'cat', 'car', 'dog' uses:",
                  "• Root → c → a → t (end) and also a → r (end)",
                  "• Root → d → o → g (end)",
                  "• Total nodes = 7 (vs 12 characters if no sharing)"
                ]
              },
              {
                title: "Trie Applications",
                body: [
                  "Tries excel in string processing applications:",
                  "",
                  "• Autocomplete/Predictive Text: Given a prefix, find all words with that prefix",
                  "• Spell Checking: Check if a word is in dictionary, suggest corrections",
                  "• IP Routing (Longest Prefix Match): Find the most specific route for an IP address",
                  "• Word Games: Boggle, Scrabble word validation",
                  "• Text Search: Aho-Corasick algorithm uses a Trie variant",
                  "• DNA Sequence Matching: Storing genetic sequences",
                  "",
                  "Variants:",
                  "• Compressed Trie (Radix Tree): Merges single-child nodes",
                  "• Ternary Search Tree: Memory-efficient alternative",
                  "• Suffix Trie/Tree: Stores all suffixes for pattern matching",
                  "• Patricia Trie: Practical algorithm for radix tree"
                ]
              },
              {
                title: "Trie vs Hash Table vs BST",
                body: [
                  "Trie vs Hash Table:",
                  "• Trie can find all words with a prefix (hash table cannot)",
                  "• Trie has O(m) time vs hash table O(1) average",
                  "• Trie can be memory-intensive for sparse data",
                  "• Hash table has no ordering, Trie maintains lexicographic order",
                  "",
                  "Trie vs BST:",
                  "• BST has O(log n) time vs Trie O(m)",
                  "• BST is better when m is large (long strings)",
                  "• Trie is better for prefix queries",
                  "",
                  "When to use Trie:",
                  "• Many strings share common prefixes",
                  "• Need prefix search or autocomplete",
                  "• Alphabet size is small and fixed",
                  "• String lengths are short to moderate"
                ]
              }
            ],
            pretest: [
              { question: "What is the time complexity of searching for a word of length m in a Trie?", options: ["O(1)", "O(log n)", "O(m)", "O(n)"], answerIndex: 2, hint: "Trie traverses each character." },
              { question: "What does the isEndOfWord flag indicate?", options: ["Node has children", "A word ends at this node", "Node is leaf", "Node is root"], answerIndex: 1, hint: "Indicates complete word, not just prefix." },
              { question: "What is the space complexity of a Trie storing k words of average length m?", options: ["O(k)", "O(m)", "O(k×m)", "O(log k)"], answerIndex: 2, hint: "Total nodes = total characters across all words." },
              { question: "Which operation is supported by Trie but not by hash table?", options: ["Insert", "Search", "StartsWith (prefix query)", "Delete"], answerIndex: 2, hint: "Hash tables cannot efficiently find all keys with a given prefix." },
              { question: "Why is a Trie efficient for autocomplete systems?", options: ["Fast prefix-based lookups", "Compact storage", "Easy to implement", "Low memory usage"], answerIndex: 0, hint: "Tries can quickly find all words sharing a prefix." }
            ],
            procedure: [
              "Open the Code Test tab with Trie starter code",
              "Define TrieNode class with children[26] and isEndOfWord",
              "Implement insert(word) — iterate chars, go/create nodes",
              "Implement search(word) — traverse, check isEndOfWord",
              "Implement startsWith(prefix) — traverse, return true if all chars exist",
              "Implement delete(word) — recursive with node cleanup",
              "Test: insert 'cat', 'car', 'dog', 'cat' (duplicate)",
              "Search 'cat' → true, 'ca' → false (not a word), startsWith 'ca' → true",
              "Delete 'cat', search again → false",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class TrieNode {\n    constructor() {\n        this.children = new Array(26).fill(null);\n        this.isEndOfWord = false;\n    }\n}\n\nclass Trie {\n    constructor() {\n        this.root = new TrieNode();\n    }\n\n    charToIndex(ch) {\n        return ch.charCodeAt(0) - 'a'.charCodeAt(0);\n    }\n\n    insert(word) {\n        let node = this.root;\n        for (let i = 0; i < word.length; i++) {\n            const idx = this.charToIndex(word[i]);\n            if (!node.children[idx]) {\n                node.children[idx] = new TrieNode();\n            }\n            node = node.children[idx];\n        }\n        node.isEndOfWord = true;\n    }\n\n    search(word) {\n        let node = this.root;\n        for (let i = 0; i < word.length; i++) {\n            const idx = this.charToIndex(word[i]);\n            if (!node.children[idx]) return false;\n            node = node.children[idx];\n        }\n        return node.isEndOfWord;\n    }\n\n    startsWith(prefix) {\n        let node = this.root;\n        for (let i = 0; i < prefix.length; i++) {\n            const idx = this.charToIndex(prefix[i]);\n            if (!node.children[idx]) return false;\n            node = node.children[idx];\n        }\n        return true;\n    }\n\n    delete(word) {\n        return this.deleteRecursive(this.root, word, 0);\n    }\n\n    deleteRecursive(node, word, depth) {\n        if (depth === word.length) {\n            if (!node.isEndOfWord) return false;\n            node.isEndOfWord = false;\n            return Object.values(node.children).every(child => child === null);\n        }\n        const idx = this.charToIndex(word[depth]);\n        if (!node.children[idx]) return false;\n        const shouldDelete = this.deleteRecursive(node.children[idx], word, depth + 1);\n        if (shouldDelete) {\n            node.children[idx] = null;\n            return !node.isEndOfWord && Object.values(node.children).every(child => child === null);\n        }\n        return false;\n    }\n}\n\n// Test\nconst trie = new Trie();\ntrie.insert('cat');\ntrie.insert('car');\ntrie.insert('dog');\nconsole.log(trie.search('cat')); // true\nconsole.log(trie.search('ca')); // false\nconsole.log(trie.startsWith('ca')); // true\ntrie.delete('cat');\nconsole.log(trie.search('cat')); // false\nconsole.log(trie.search('car')); // true (still exists)",
              steps: [
                { line: 1, annotation: "TrieNode with children array and end marker", memory: [], output: "Node structure defined" },
                { line: 2, annotation: "Insert creates nodes for each character", memory: [], output: "Path created for 'cat', 'car', 'dog'" },
                { line: 3, annotation: "Search checks entire word and end marker", memory: [], output: "O(m) search" },
                { line: 4, annotation: "startsWith only checks path exists", memory: [], output: "Prefix 'ca' exists" },
                { line: 5, annotation: "Delete cleans up unused nodes recursively", memory: [], output: "'cat' removed, 'car' remains" }
              ]
            },
            posttest: [
              { question: "What is the space complexity of a Trie storing k words of average length m?", options: ["O(k)", "O(m)", "O(k×m)", "O(log k)"], answerIndex: 2, hint: "Total nodes = total characters across all words." },
              { question: "Which operation is not supported efficiently by Trie?", options: ["Insert", "Search", "Deletion of a word", "Finding all words with a prefix (requires traversal)"], answerIndex: 3, hint: "Prefix enumeration requires traversing subtree." },
              { question: "What is the primary advantage of a Trie over a binary search tree for string storage?", options: ["Faster insertions", "Better cache locality", "O(m) search independent of number of strings", "Lower memory usage"], answerIndex: 2, hint: "Trie search time depends on string length, not number of strings." },
              { question: "What is a compressed Trie or Radix Tree?", options: ["Trie with fewer nodes by merging single-child nodes", "Trie with compression algorithm", "Trie stored in compressed format", "Binary tree variation"], answerIndex: 0, hint: "Radix trees compress chains of single-child nodes." },
              { question: "What is a limitation of the array-based children representation (size 26) in a Trie?", options: ["Too slow", "Wastes memory for sparse alphabets", "Cannot handle uppercase letters", "Only works for numbers"], answerIndex: 1, hint: "For sparse data, most child pointers are null, wasting memory." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter on String Matching",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 5.2 on Tries"
            ]
          }
        }
      ]
    }
  ]
};