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
                title: "AVL Tree Properties",
                body: [
                  "An AVL tree is a self-balancing Binary Search Tree where the heights of the left and right subtrees of every node differ by at most 1.",
                  "Balance factor = height(left subtree) - height(right subtree). Valid values: -1, 0, 1.",
                  "If balance factor becomes +2 or -2 after insertion, rotations are performed to restore balance."
                ]
              },
              {
                title: "Rotations",
                body: [
                  "LL Rotation (Right Rotation): Occurs when left-left grandchild causes imbalance. Used when BF > 1 and key < left.key.",
                  "RR Rotation (Left Rotation): Occurs when right-right grandchild causes imbalance. Used when BF < -1 and key > right.key.",
                  "LR Rotation (Left-Right): First left rotation on left child, then right rotation on node. Used when BF > 1 and key > left.key.",
                  "RL Rotation (Right-Left): First right rotation on right child, then left rotation on node. Used when BF < -1 and key < right.key."
                ]
              },
              {
                title: "Time Complexity",
                "body": [
                  "AVL tree guarantees O(log n) height, where n is the number of nodes.",
                  "Search: O(log n) — worst-case is tree height.",
                  "Insertion: O(log n) for search + O(1) for rotations.",
                  "Deletion: O(log n) for search + O(log n) for rebalancing up the tree."
                ]
              }
            ],
            pretest: [
              { question: "What is the balance factor of a node?", options: ["Left height + Right height", "Left height - Right height", "Right height - Left height", "Height of node"], answerIndex: 1, hint: "Balance factor is the difference between left and right subtree heights." },
              { question: "Which rotation is performed for LL imbalance?", options: ["Left rotation", "Right rotation", "Left-Right rotation", "Right-Left rotation"], answerIndex: 1, hint: "LL means left-left — a right rotation fixes it." },
              { question: "When does RL rotation occur?", options: ["Balance factor > 1 and key < left.key", "Balance factor < -1 and key > right.key", "Balance factor < -1 and key < right.key", "Balance factor > 1 and key > left.key"], answerIndex: 2, hint: "RL means right-left — the imbalance is on the right, but the insertion was on the left of that right child." },
              { question: "AVL tree insertion time complexity is:", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answerIndex: 2, hint: "AVL trees maintain logarithmic height." },
              { question: "What must be true about every node's balance factor in a valid AVL tree?", options: ["Exactly 0", "Between -1 and 1 inclusive", "Between -2 and 2", "Absolute value of 1"], answerIndex: 1, hint: "The AVL property requires balance factor to be -1, 0, or 1." }
            ],
            procedure: [
              "Open the Code Test tab with the AVL tree starter code",
              "Implement getHeight() and updateHeight() functions",
              "Implement getBalanceFactor() to compute BF for a node",
              "Implement rightRotate() and leftRotate() functions",
              "Complete insert() with rebalancing logic for all four rotation cases",
              "Test insertions: 10, 20, 30 (triggers LL → right rotation)",
              "Test insertions: 30, 20, 10 (triggers RR → left rotation)",
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
              { question: "For an AVL tree of n nodes, the maximum height is approximately:", options: ["1.44 log2 n", "log2 n", "n", "n log n"], answerIndex: 0, hint: "AVL trees are more strictly balanced than Red-Black trees. Height ≤ 1.44 log₂(n)." },
              { question: "What value must be updated after every rotation?", options: ["Key", "Parent pointer", "Height", "Balance factor directly"], answerIndex: 2, hint: "Heights need to be recomputed after structural changes." }
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
                title: "AVL Deletion Algorithm",
                body: [
                  "Step 1: Perform standard BST deletion for the target key.",
                  "Step 2: After deletion, update the height of the current node.",
                  "Step 3: Compute the balance factor of the current node.",
                  "Step 4: If balance factor is +2 or -2, perform the appropriate rotation.",
                  "Step 5: Recursively rebalance ancestors up to the root."
                ]
              },
              {
                title: "Deletion Cases",
                body: [
                  "Case 1: Node with no children — simply remove (set parent pointer to null).",
                  "Case 2: Node with one child — replace node with its child.",
                  "Case 3: Node with two children — find inorder successor, replace node's key with successor's key, then delete successor.",
                  "After deletion, the path to the deleted node may require rebalancing at multiple ancestors."
                ]
              }
            ],
            pretest: [
              { question: "When deleting a node with two children, we replace it with:", options: ["Left child", "Right child", "Inorder predecessor or successor", "Parent node"], answerIndex: 2, hint: "The inorder successor is the smallest node in the right subtree." },
              { question: "After deletion, rebalancing may need to propagate:", options: ["Downwards only", "Upwards only", "Both directions", "No propagation needed"], answerIndex: 1, hint: "Only ancestors of the deleted node can become unbalanced." },
              { question: "What is the time complexity of deletion in AVL tree?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 1, hint: "AVL tree operations maintain logarithmic complexity." }
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
              code: "function findMin(node) {\n    while (node.left) node = node.left;\n    return node;\n}\n\nfunction deleteNode(node, key) {\n    if (!node) return null;\n\n    if (key < node.key) {\n        node.left = deleteNode(node.left, key);\n    } else if (key > node.key) {\n        node.right = deleteNode(node.right, key);\n    } else {\n        // Node to delete found\n        if (!node.left || !node.right) {\n            // 0 or 1 child\n            node = node.left || node.right;\n        } else {\n            // 2 children\n            const temp = findMin(node.right);\n            node.key = temp.key;\n            node.right = deleteNode(node.right, temp.key);\n        }\n    }\n\n    if (!node) return null;\n\n    updateHeight(node);\n    const balance = getBalanceFactor(node);\n\n    // Rebalancing cases (same as insert)\n    if (balance > 1 && getBalanceFactor(node.left) >= 0)\n        return rightRotate(node);\n    if (balance > 1 && getBalanceFactor(node.left) < 0) {\n        node.left = leftRotate(node.left);\n        return rightRotate(node);\n    }\n    if (balance < -1 && getBalanceFactor(node.right) <= 0)\n        return leftRotate(node);\n    if (balance < -1 && getBalanceFactor(node.right) > 0) {\n        node.right = rightRotate(node.right);\n        return leftRotate(node);\n    }\n    return node;\n}",
              steps: [
                { line: 1, annotation: "findMin traverses left children to find smallest key", memory: [], output: "Helper for deletion with 2 children" },
                { line: 2, annotation: "deleteNode follows BST delete, then rebalances", memory: [], output: "Deletion with rebalancing implemented" },
                { line: 3, annotation: "Case 0/1 child: replace node with its non-null child", memory: [], output: "Simple deletion case" },
                { line: 4, annotation: "Case 2 children: replace with inorder successor from right subtree", memory: [], output: "Successor replacement" },
                { line: 5, annotation: "Rebalancing after deletion — similar to insertion", memory: [], output: "Four rebalancing cases for deletion" }
              ]
            },
            posttest: [
              { question: "When deleting a node with two children, the inorder successor is always:", options: ["The largest in left subtree", "The smallest in right subtree", "The parent of the node", "The leftmost leaf"], answerIndex: 1, hint: "Inorder successor is the next larger element — found in the right subtree." },
              { question: "Which case requires a double rotation after deletion?", options: ["Balance > 1 and left child BF >= 0", "Balance > 1 and left child BF < 0", "Balance < -1 and right child BF <= 0", "Balance < -1 and right child BF = 0"], answerIndex: 1, hint: "Left child BF < 0 indicates LR case — requires left then right rotation." }
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
                title: "Red-Black Tree Properties",
                body: [
                  "1. Every node is either RED or BLACK.",
                  "2. The root is always BLACK.",
                  "3. Every leaf (NIL) is BLACK.",
                  "4. If a node is RED, then both its children are BLACK (no two consecutive REDs).",
                  "5. For each node, all paths from the node to descendant leaves contain the same number of BLACK nodes (black-height)."
                ]
              },
              {
                title: "Insertion Fixup Cases",
                body: [
                  "Case 1: Uncle is RED — recolor parent, grandparent, and uncle.",
                  "Case 2: Uncle is BLACK and node is an inner grandchild — rotate towards uncle.",
                  "Case 3: Uncle is BLACK and node is an outer grandchild — rotate and recolor.",
                  "After fixup, ensure root remains BLACK."
                ]
              }
            ],
            pretest: [
              { question: "What is the black-height of a Red-Black tree?", options: ["Number of black nodes from root to leaf", "Number of red nodes from root to leaf", "Total nodes in tree", "Height of tree"], answerIndex: 0, hint: "Property 5 defines black-height — all root-to-leaf paths have same number of black nodes." },
              { question: "When a red node has a black sibling, what operation is performed?", options: ["Recoloring only", "Rotation then recoloring", "Deletion", "No operation"], answerIndex: 1, hint: "Black uncle cases require rotation to maintain properties." },
              { question: "The root of a Red-Black tree must be:", options: ["RED", "BLACK", "Either color", "Determined by insertion"], answerIndex: 1, hint: "Property 2 explicitly states the root is BLACK." }
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
              { question: "In a Red-Black tree, what is the maximum height in terms of black-height?", options: ["2 * black-height", "black-height", "log2 n", "2 log2 n"], answerIndex: 0, hint: "Red nodes can't be adjacent, so the longest path alternates red-black." },
              { question: "What color is a newly inserted node in Red-Black tree?", options: ["Always BLACK", "Always RED", "Either RED or BLACK", "Determined by parent"], answerIndex: 1, hint: "New nodes are inserted as RED to minimize property violations." },
              { question: "Case 1 in insertion fixup involves:", options: ["Rotation only", "Recoloring only", "Rotation then recolor", "Recolor then rotation"], answerIndex: 1, hint: "When uncle is RED, only recoloring is needed." }
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
                title: "B-Tree Properties",
                body: [
                  "A B-Tree of minimum degree t (order = 2t) satisfies:",
                  "1. Every node has at most 2t-1 keys and 2t children.",
                  "2. Every node except root has at least t-1 keys and t children.",
                  "3. Root has at least 1 key (unless empty).",
                  "4. All leaves are at the same depth.",
                  "5. A node with k keys has k+1 children."
                ]
              },
              {
                title: "Insertion Algorithm",
                body: [
                  "Step 1: Start at root; if root is full, split it first.",
                  "Step 2: Traverse down to find the appropriate leaf.",
                  "Step 3: If the leaf is not full, insert key in sorted order.",
                  "Step 4: If the leaf is full, split it: median key moves up to parent.",
                  "Step 5: Splits may propagate up if parent becomes full."
                ]
              }
            ],
            pretest: [
              { question: "For a B-Tree of minimum degree t=2 (order 3), the maximum number of keys per node is:", options: ["2", "3", "4", "5"], answerIndex: 1, hint: "Max keys = 2t-1 = 3." },
              { question: "When a leaf node splits, what happens to the median key?", options: ["It is discarded", "It moves up to the parent", "It stays in left leaf", "It stays in right leaf"], answerIndex: 1, hint: "The median key is promoted to the parent node." },
              { question: "All leaves in a B-Tree are at:", options: ["Different depths", "Same depth", "Depends on insertion order", "Maximum depth possible"], answerIndex: 1, hint: "B-Trees are perfectly balanced — all leaves at same height." }
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
              { question: "When does a B-Tree increase in height?", options: ["Every insertion", "When a leaf splits", "When the root splits", "When any node splits"], answerIndex: 2, hint: "Only root split increases tree height." }
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
                title: "B+ Tree vs B-Tree",
                body: [
                  "In B+ Tree, all data records are stored only at leaf nodes.",
                  "Internal nodes store only keys (and child pointers) — no data.",
                  "Leaf nodes contain keys and pointers to actual data records.",
                  "Leaf nodes are linked together in sorted order.",
                  "Advantage: More keys per internal node (no data pointers) → shorter tree, better range queries."
                ]
              },
              {
                title: "Insertion in B+ Tree",
                body: [
                  "Step 1: Find the correct leaf node for the key.",
                  "Step 2: Insert into leaf. If leaf has space, done.",
                  "Step 3: If leaf overflows, split leaf into two leaves. Copy median key up to parent.",
                  "Step 4: If parent (internal node) overflows, split internal node. Push median key up to its parent.",
                  "Step 5: If root splits, create new root with single key and two children."
                ]
              }
            ],
            pretest: [
              { question: "In a B+ Tree, where are the actual data records stored?", options: ["Internal nodes", "Root node", "Leaf nodes only", "All nodes"], answerIndex: 2, hint: "B+ tree stores data only in leaves." },
              { question: "When a leaf node splits, the median key is:", options: ["Removed from both leaves", "Copied up to parent", "Pushed up and removed from leaf", "Discarded"], answerIndex: 1, hint: "Leaf split copies median up; internal node split pushes up." },
              { question: "How are B+ Trees optimized for range queries?", options: ["Internal node array", "Leaf node linked list", "Recursive search", "Hash indexing"], answerIndex: 1, hint: "Leaves are linked for sequential access." }
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
              { question: "In a B+ Tree leaf split, what is the relationship between the median key in leaf and internal node?", options: ["Key removed from leaf", "Key copied to internal node", "Key moved and removed from leaf", "Key ignored"], answerIndex: 1, hint: "Leaf splits copy median up; internal node splits move median up." }
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
                title: "Segment Tree Structure",
                body: [
                  "A segment tree is a binary tree where each node represents a segment (range) of the array.",
                  "Root represents the entire array [0, n-1].",
                  "Leaf nodes represent single array elements.",
                  "Internal nodes store aggregate information (sum, min, max, etc.) of their segment.",
                  "Space: O(4n) for array representation."
                ]
              },
              {
                title: "Operations",
                body: [
                  "Build: Recursively build tree from leaves to root — O(n).",
                  "Query: Recursively traverse nodes that intersect the query range — O(log n).",
                  "Update: Update leaf value and propagate changes up to root — O(log n).",
                  "Lazy Propagation: For range updates (add value to range), use lazy propagation to achieve O(log n) updates."
                ]
              }
            ],
            pretest: [
              { question: "Segment tree query time complexity is:", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 1, hint: "The tree depth is O(log n)." },
              { question: "How many nodes does a segment tree on an array of size n require?", options: ["n", "2n", "4n", "n^2"], answerIndex: 2, hint: "4n is a safe upper bound for array implementation." },
              { question: "To update a single element, how many nodes need to be updated?", options: ["1", "log n", "n", "n/2"], answerIndex: 1, hint: "Path from leaf to root has O(log n) nodes." }
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
              { question: "Segment tree is most useful for:", options: ["Static array queries", "Dynamic array with updates and range queries", "Sorted array operations", "Graph traversals"], answerIndex: 1, hint: "Segment tree excels at both queries and updates." }
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
                title: "Fenwick Tree (Binary Indexed Tree)",
                body: [
                  "A Fenwick tree provides efficient prefix sum queries and point updates using O(n) space.",
                  "Each index i stores sum of a range based on i's least significant bit (LSB).",
                  "index i stores sum of (i - LSB(i) + 1) through i.",
                  "Space: O(n), Time for query/update: O(log n).",
                  "Fenwick tree is simpler and uses less memory than segment tree, but supports only prefix queries (not arbitrary range aggregates without inversion)."
                ]
              },
              {
                title: "Operations",
                body: [
                  "update(i, delta): Add delta to index i, then i += LSB(i) until i <= n.",
                  "query(i): Sum from 1 to i, subtract LSB until i == 0.",
                  "rangeSum(l, r): query(r) - query(l-1)."
                ]
              }
            ],
            pretest: [
              { question: "What does LSB stand for in Fenwick Tree?", options: ["Last Significant Byte", "Least Significant Bit", "Lowest Start Bit", "Left Shift Bit"], answerIndex: 1, hint: "LSB is the lowest set bit in binary representation." },
              { question: "Fenwick tree is used for:", options: ["Range minimum queries", "Range sum queries (prefix)", "Graph shortest paths", "String matching"], answerIndex: 1, hint: "BIT is optimized for prefix sum queries." }
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
              { question: "What is LSB(i) for i=6 (binary 110)?", options: ["1", "2", "3", "6"], answerIndex: 1, hint: "LSB of 110 is 2 (binary 10)." }
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
                title: "Binary Heap Properties",
                body: [
                  "A binary heap is a complete binary tree stored in an array.",
                  "For node at index i: left child at 2i+1, right child at 2i+2, parent at floor((i-1)/2).",
                  "Min-heap property: parent.key <= child.key (for all nodes).",
                  "Max-heap property: parent.key >= child.key."
                ]
              },
              {
                title: "Operations Complexity",
                body: [
                  "insert(key): Add at end, bubble up — O(log n).",
                  "extractMin(): Remove root, replace with last element, bubble down — O(log n).",
                  "buildHeap(arr): Heapify non-leaf nodes from last parent up — O(n).",
                  "peek(): Return root — O(1)."
                ]
              }
            ],
            pretest: [
              { question: "In array representation of a binary heap, where is the right child of node at index i?", options: ["2i", "2i+1", "2i+2", "i/2"], answerIndex: 2, hint: "For 0-indexed array, left=2i+1, right=2i+2." },
              { question: "What is the time complexity of building a heap from an array?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 2, hint: "Floyd's algorithm builds heap in O(n) by heapifying from last parent." },
              { question: "In a min-heap, the smallest element is at:", options: ["Any leaf", "Root", "Last position", "Middle"], answerIndex: 1, hint: "Min-heap property ensures root is smallest." }
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
              { question: "What is the height of a binary heap with n nodes?", options: ["log2 n", "n", "n/2", "2^n"], answerIndex: 0, hint: "Complete binary tree height is floor(log2 n)." },
              { question: "Which operation is O(1) in a binary heap?", options: ["Insert", "ExtractMin", "Peek (getMin)", "Delete any element"], answerIndex: 2, hint: "Minimum element is always at root." }
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
                title: "Disjoint Set Union (DSU)",
                body: [
                  "DSU maintains a collection of disjoint sets with operations:",
                  "find(x): Returns the representative (root) of the set containing x.",
                  "union(x, y): Merges the sets containing x and y into one set.",
                  "Path compression: During find, make every node on path point directly to root.",
                  "Union by rank: Attach smaller tree under larger tree by tracking tree height."
                ]
              },
              {
                title: "Time Complexity",
                body: [
                  "With both optimizations, amortized time per operation is nearly O(1) — inverse Ackermann function α(n).",
                  "For all practical n, α(n) ≤ 4.",
                  "Applications: Kruskal's MST, connected components in graph, dynamic connectivity."
                ]
              }
            ],
            pretest: [
              { question: "What is path compression in DSU?", options: ["Making all nodes point to root during find", "Compressing the array size", "Union by size", "Deleting nodes"], answerIndex: 0, hint: "Path compression flattens the tree structure." },
              { question: "Union by rank optimizes by:", options: ["Attaching smaller depth tree under larger depth", "Always attaching to left", "Random attachment", "Attaching to smaller size"], answerIndex: 0, hint: "Rank approximation of tree height." }
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
              { question: "Union by rank prevents:", options: ["Path compression", "Tall trees", "Cycles", "Duplicates"], answerIndex: 1, hint: "It keeps trees shallow." }
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
                title: "Open Addressing",
                body: [
                  "In open addressing, all elements are stored directly in the hash table array (no chaining).",
                  "When collision occurs, a probe sequence finds the next empty slot.",
                  "Linear Probing: probe(i) = (h(k) + i) mod M.",
                  "Quadratic Probing: probe(i) = (h(k) + c1*i + c2*i^2) mod M.",
                  "Double Hashing: probe(i) = (h1(k) + i*h2(k)) mod M."
                ]
              },
              {
                title: "Load Factor",
                body: [
                  "Load factor α = n/M (number of elements / table size).",
                  "For open addressing, α should be < 0.7 for good performance.",
                  "Dynamic resizing: When α exceeds threshold, create larger table and rehash all elements."
                ]
              }
            ],
            pretest: [
              { question: "What is linear probing?", options: ["Hash then linear search", "Probing slots sequentially from collision point", "Binary search in table", "Chaining"], answerIndex: 1, hint: "Linear probing checks i+1, i+2, etc." },
              { question: "How is deletion handled in linear probing?", options: ["Remove and shift", "Tombstone (special marker)", "Rehash all", "Compaction"], answerIndex: 1, hint: "Tombstones prevent search breakage." }
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
              { question: "Linear probing can cause:", options: ["Secondary clustering", "Primary clustering", "No clustering", "Perfect hashing"], answerIndex: 1, hint: "Linear probing leads to long runs of occupied slots." }
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
                title: "Cuckoo Hashing",
                body: [
                  "Uses two hash tables T1 and T2 (or single table with two hash functions).",
                  "Each key is stored at either T1[h1(k)] or T2[h2(k)], never both.",
                  "Lookup: check both positions — O(1).",
                  "Insert: Place at T1[h1(k)]. If occupied, kick the existing key to its alternate location.",
                  "Continue kicking until empty spot found or cycle detected (max iterations).",
                  "If cycle, rehash with new hash functions and larger table."
                ]
              }
            ],
            pretest: [
              { question: "Cuckoo hashing guarantees which complexity for lookup?", options: ["O(1) worst-case", "O(1) average", "O(log n)", "O(n)"], answerIndex: 0, hint: "Only two positions are checked." },
              { question: "What happens if a kick cycle is detected?", options: ["Insert fails", "Rehash with new hash functions", "Use chaining", "Delete the key"], answerIndex: 1, hint: "Rehashing resolves cycles." }
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
              { question: "When does a rehash occur in cuckoo hashing?", options: ["Every insert", "When load factor > 0.5", "When a kick cycle is detected", "Never"], answerIndex: 2, hint: "Cycles require rehashing." }
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
                title: "Trie Properties",
                body: [
                  "A Trie (prefix tree) is a tree data structure for storing strings.",
                  "Each node represents a character, and paths from root represent prefixes.",
                  "Root represents empty string.",
                  "Search time O(m) where m is the string length, independent of number of strings.",
                  "Space: O(total characters across all strings)."
                ]
              },
              {
                title: "Applications",
                body: [
                  "Autocomplete and predictive text",
                  "Spell checking and dictionary",
                  "IP routing (Longest prefix match)",
                  "String matching algorithms"
                ]
              }
            ],
            pretest: [
              { question: "What is the time complexity of searching for a word of length m in a Trie?", options: ["O(1)", "O(log n)", "O(m)", "O(n)"], answerIndex: 2, hint: "Trie traverses each character." },
              { question: "What does the isEndOfWord flag indicate?", options: ["Node has children", "A word ends at this node", "Node is leaf", "Node is root"], answerIndex: 1, hint: "Indicates complete word, not just prefix." }
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
              { question: "What is the space complexity of a Trie storing k words of average length m?", options: ["O(k)", "O(m)", "O(k*m)", "O(log k)"], answerIndex: 2, hint: "Total nodes = total characters across all words." },
              { question: "Which operation is not supported efficiently by Trie?", options: ["Insert", "Search", "Deletion of a word", "Finding all words with a prefix (requires traversal)"], answerIndex: 3, hint: "Prefix enumeration requires traversing subtree." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter on String Matching",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 5.2 on Tries"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 10",
      objective: "Dijkstra's and Bellman-Ford Shortest Path Algorithms",
      tutorial: "Tutorial 10: Shortest Path Algorithms",
      labTitle: "Lab 10: Shortest Path",
      experiments: [
        {
          id: "ads-w10-1",
          title: "Dijkstra's Algorithm using Priority Queue",
          desc: "Implement Dijkstra's shortest path algorithm using a min-heap as priority queue for weighted graphs with non-negative edges.",
          expected: "Correct shortest distances from source to all vertices; O((V+E) log V) complexity",
          content: {
            aim: {
              text: "In this experiment, the student will implement Dijkstra's algorithm. The student will:",
              bullets: [
                "Represent graph using adjacency list with (neighbor, weight)",
                "Use a min-heap (priority queue) for efficient extraction of min distance node",
                "Initialize distances to Infinity, distance[source] = 0",
                "Relax edges: if dist[u] + w < dist[v], update and push to heap",
                "Compute shortest paths from source to all vertices"
              ]
            },
            theory: [
              {
                title: "Dijkstra's Algorithm",
                body: [
                  "Finds shortest paths from source to all vertices in weighted graph with non-negative edge weights.",
                  "Greedy algorithm: always picks the unvisited vertex with smallest distance.",
                  "Uses priority queue to get min distance vertex in O(log V).",
                  "Time complexity: O((V+E) log V) with binary heap.",
                  "Cannot handle negative edge weights."
                ]
              }
            ],
            pretest: [
              { question: "Dijkstra's algorithm requires which property of edge weights?", options: ["Positive only", "Negative allowed", "Zero only", "Integer only"], answerIndex: 0, hint: "Negative edges can cause incorrect results." },
              { question: "What data structure is used to efficiently extract the minimum distance vertex?", options: ["Stack", "Queue", "Priority Queue (Min-Heap)", "Array"], answerIndex: 2, hint: "Need efficient extraction of min." }
            ],
            procedure: [
              "Open the Code Test tab with Dijkstra starter code",
              "Implement graph using adjacency list",
              "Implement min-heap for priority queue or use built-in",
              "Run Dijkstra from source vertex 0",
              "Print shortest distances to all vertices",
              "Test on graph with vertices 0-4 and edges with weights",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class MinHeap {\n    constructor() {\n        this.heap = [];\n    }\n    push(node) {\n        this.heap.push(node);\n        this.bubbleUp(this.heap.length - 1);\n    }\n    pop() {\n        const min = this.heap[0];\n        const last = this.heap.pop();\n        if (this.heap.length > 0) {\n            this.heap[0] = last;\n            this.bubbleDown(0);\n        }\n        return min;\n    }\n    bubbleUp(i) {\n        while (i > 0) {\n            const p = Math.floor((i - 1) / 2);\n            if (this.heap[p].dist > this.heap[i].dist) {\n                [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];\n                i = p;\n            } else break;\n        }\n    }\n    bubbleDown(i) {\n        const n = this.heap.length;\n        while (true) {\n            let smallest = i;\n            const l = 2*i+1, r = 2*i+2;\n            if (l < n && this.heap[l].dist < this.heap[smallest].dist) smallest = l;\n            if (r < n && this.heap[r].dist < this.heap[smallest].dist) smallest = r;\n            if (smallest !== i) {\n                [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];\n                i = smallest;\n            } else break;\n        }\n    }\n    isEmpty() { return this.heap.length === 0; }\n}\n\nfunction dijkstra(graph, src, V) {\n    const dist = new Array(V).fill(Infinity);\n    dist[src] = 0;\n    const pq = new MinHeap();\n    pq.push({ node: src, dist: 0 });\n    \n    while (!pq.isEmpty()) {\n        const { node: u, dist: d } = pq.pop();\n        if (d > dist[u]) continue;\n        \n        for (const [v, weight] of graph[u]) {\n            if (dist[u] + weight < dist[v]) {\n                dist[v] = dist[u] + weight;\n                pq.push({ node: v, dist: dist[v] });\n            }\n        }\n    }\n    return dist;\n}\n\n// Test\nconst V = 5;\nconst graph = [\n    [[1, 4], [2, 1]],   // 0 → 1(4), 2(1)\n    [[3, 1]],           // 1 → 3(1)\n    [[1, 2], [3, 5]],   // 2 → 1(2), 3(5)\n    [[4, 3]],           // 3 → 4(3)\n    []                  // 4\n];\nconst distances = dijkstra(graph, 0, V);\nconsole.log(distances); // [0, 3, 1, 4, 7]",
              steps: [
                { line: 1, annotation: "Min-heap for priority queue", memory: [], output: "Heap operations defined" },
                { line: 2, annotation: "Dijkstra: relax edges from min distance node", memory: [], output: "Distances computed" },
                { line: 3, annotation: "Test graph", memory: [], output: "[0,3,1,4,7]" }
              ]
            },
            posttest: [
              { question: "Dijkstra's algorithm on a graph with V vertices and E edges using binary heap has complexity:", options: ["O(V^2)", "O(E log V)", "O(V+E)", "O(V log V)"], answerIndex: 1, hint: "V extract-min operations O(log V), E decrease-key operations O(log V)." },
              { question: "What happens if Dijkstra's algorithm runs on a graph with negative edge weights?", options: ["Works correctly", "May produce incorrect results", "Runs faster", "Always fails"], answerIndex: 1, hint: "Negative edges violate greedy property." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 24 on Single-Source Shortest Paths",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 4.4 on Shortest Paths"
            ]
          }
        },
        {
          id: "ads-w10-2",
          title: "Bellman-Ford Algorithm",
          desc: "Implement Bellman-Ford algorithm for shortest path in graphs that may have negative edge weights. Detect negative weight cycles.",
          expected: "Correct shortest distances; detect and report negative cycles",
          content: {
            aim: {
              text: "In this experiment, the student will implement Bellman-Ford algorithm. The student will:",
              bullets: [
                "Represent edges as list of (u, v, weight)",
                "Run V-1 relaxation passes over all edges",
                "Perform an extra pass to detect negative cycles",
                "Output shortest distances or report negative cycle"
              ]
            },
            theory: [
              {
                title: "Bellman-Ford Algorithm",
                body: [
                  "Finds shortest paths from source in graphs with negative edge weights.",
                  "Performs relaxation of all edges V-1 times — each pass guarantees shortest paths with up to k edges.",
                  "Time complexity: O(V*E).",
                  "After V-1 passes, if any edge can still be relaxed, a negative cycle exists."
                ]
              }
            ],
            pretest: [
              { question: "How many relaxation passes does Bellman-Ford perform?", options: ["1", "V", "V-1", "E-1"], answerIndex: 2, hint: "Each pass propagates distances one more edge." },
              { question: "What does a successful relaxation in the V-th pass indicate?", options: ["Success", "Negative cycle detected", "Graph is disconnected", "All distances final"], answerIndex: 1, hint: "No more relaxations should be possible after V-1 passes." }
            ],
            procedure: [
              "Open the Code Test tab with Bellman-Ford starter code",
              "Store edges in array format (from, to, weight)",
              "Initialize distances array with Infinity, source = 0",
              "Run V-1 passes: for each edge, if dist[u] + w < dist[v], update dist[v]",
              "Run one more pass: if any edge can be relaxed, report negative cycle",
              "Test on graph with negative edge (no cycle) and graph with negative cycle",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "function bellmanFord(edges, V, src) {\n    const dist = new Array(V).fill(Infinity);\n    dist[src] = 0;\n\n    // Relax V-1 times\n    for (let i = 1; i <= V - 1; i++) {\n        let relaxed = false;\n        for (const [u, v, w] of edges) {\n            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                relaxed = true;\n            }\n        }\n        if (!relaxed) break;\n    }\n\n    // Check for negative cycle\n    for (const [u, v, w] of edges) {\n        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {\n            return { hasNegativeCycle: true, distances: null };\n        }\n    }\n    return { hasNegativeCycle: false, distances: dist };\n}\n\n// Test 1: No negative cycle\nconst edges1 = [\n    [0, 1, 4], [0, 2, 1],\n    [1, 3, 1], [2, 1, 2],\n    [2, 3, 5], [3, 4, 3]\n];\nconsole.log(bellmanFord(edges1, 5, 0)); // distances: [0,3,1,4,7]\n\n// Test 2: With negative cycle\nconst edges2 = [\n    [0, 1, 1], [1, 2, 1],\n    [2, 0, -3]  // cycle 0→1→2→0: total -1\n];\nconsole.log(bellmanFord(edges2, 3, 0)); // hasNegativeCycle: true",
              steps: [
                { line: 1, annotation: "V-1 relaxation passes", memory: [], output: "distances propagated" },
                { line: 2, annotation: "Extra pass for negative cycle detection", memory: [], output: "Cycle detected if any edge relaxes" },
                { line: 3, annotation: "Test with negative cycle", memory: [], output: "Cycle detected: true" }
              ]
            },
            posttest: [
              { question: "Bellman-Ford time complexity is:", options: ["O(V+E)", "O(V log V)", "O(V*E)", "O(E log V)"], answerIndex: 2, hint: "V-1 passes, each over E edges." },
              { question: "What does Bellman-Ford return for a graph with a negative cycle reachable from source?", options: ["Shortest path", "Error/negative cycle report", "Infinite loop", "Zero distances"], answerIndex: 1, hint: "Negative cycles mean no finite shortest path." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 24.1 on Bellman-Ford",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 4.4 on Bellman-Ford"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 11",
      objective: "Kruskal's and Prim's Minimum Spanning Tree Algorithms",
      tutorial: "Tutorial 11: Minimum Spanning Tree",
      labTitle: "Lab 11: MST",
      experiments: [
        {
          id: "ads-w11-1",
          title: "Kruskal's Algorithm using Union-Find",
          desc: "Implement Kruskal's algorithm to find Minimum Spanning Tree (MST) using Union-Find (DSU) for cycle detection.",
          expected: "MST with total minimum weight; edges sorted by weight",
          content: {
            aim: {
              text: "In this experiment, the student will implement Kruskal's algorithm. The student will:",
              bullets: [
                "Sort graph edges by weight in ascending order",
                "Initialize DSU with V vertices",
                "Iterate through edges: if find(u) != find(v), add edge to MST and union(u,v)",
                "Stop when V-1 edges are selected",
                "Compute total MST weight"
              ]
            },
            theory: [
              {
                title: "Kruskal's Algorithm",
                body: [
                  "Greedy algorithm for MST.",
                  "Sort all edges by weight.",
                  "Add edges in increasing weight order if they don't create a cycle.",
                  "Cycle detection using Union-Find (DSU).",
                  "Time complexity: O(E log E) for sorting + O(E α(V)) for DSU operations."
                ]
              }
            ],
            pretest: [
              { question: "How many edges are in a spanning tree of V vertices?", options: ["V", "V-1", "V+1", "2V-2"], answerIndex: 1, hint: "Tree has V-1 edges." },
              { question: "What data structure detects cycles in Kruskal's algorithm?", options: ["Stack", "Queue", "Union-Find (DSU)", "Heap"], answerIndex: 2, hint: "DSU checks connectivity efficiently." }
            ],
            procedure: [
              "Open the Code Test tab with Kruskal starter code",
              "Define edges list with (u, v, weight)",
              "Sort edges by weight",
              "Implement DSU (Union-Find) with path compression",
              "Iterate edges: if not connected, add to MST and union",
              "Stop when MST has V-1 edges",
              "Compute total MST weight",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class DSU {\n    constructor(n) {\n        this.parent = Array(n).fill().map((_, i) => i);\n        this.rank = Array(n).fill(0);\n    }\n    find(x) {\n        if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);\n        return this.parent[x];\n    }\n    union(x, y) {\n        const rx = this.find(x), ry = this.find(y);\n        if (rx === ry) return false;\n        if (this.rank[rx] < this.rank[ry]) this.parent[rx] = ry;\n        else if (this.rank[rx] > this.rank[ry]) this.parent[ry] = rx;\n        else { this.parent[ry] = rx; this.rank[rx]++; }\n        return true;\n    }\n}\n\nfunction kruskal(edges, V) {\n    edges.sort((a, b) => a[2] - b[2]);\n    const dsu = new DSU(V);\n    const mst = [];\n    let totalWeight = 0;\n    \n    for (const [u, v, w] of edges) {\n        if (dsu.union(u, v)) {\n            mst.push([u, v, w]);\n            totalWeight += w;\n            if (mst.length === V - 1) break;\n        }\n    }\n    return { mst, totalWeight };\n}\n\n// Test\nconst edges = [\n    [0, 1, 4], [0, 2, 1], [1, 2, 2],\n    [1, 3, 5], [2, 3, 8], [2, 4, 10],\n    [3, 4, 2], [3, 5, 6], [4, 5, 3]\n];\nconst result = kruskal(edges, 6);\nconsole.log('MST edges:', result.mst);\nconsole.log('Total weight:', result.totalWeight);",
              steps: [
                { line: 1, annotation: "DSU for cycle detection", memory: [], output: "Union-Find ready" },
                { line: 2, annotation: "Sort edges by weight", memory: [], output: "Edges sorted" },
                { line: 3, annotation: "Add edge if it connects different components", memory: [], output: "MST built" }
              ]
            },
            posttest: [
              { question: "Kruskal's algorithm time complexity dominated by:", options: ["DSU operations", "Sorting edges", "Traversing vertices", "Union operations"], answerIndex: 1, hint: "Sorting O(E log E) is dominant." },
              { question: "A graph has multiple MSTs when:", options: ["All edges unique", "Equal weight edges exist", "Graph is disconnected", "Graph is complete"], answerIndex: 1, hint: "Equal weights allow alternative choices." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 23 on MST",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 4.3 on Minimum Spanning Trees"
            ]
          }
        },
        {
          id: "ads-w11-2",
          title: "Prim's Algorithm using Priority Queue",
          desc: "Implement Prim's algorithm for MST using a min-heap (priority queue) for efficient extraction of minimum weight edge.",
          expected: "MST with total minimum weight; O((V+E) log V) complexity",
          content: {
            aim: {
              text: "In this experiment, the student will implement Prim's algorithm. The student will:",
              bullets: [
                "Initialize MST set and key[] array with Infinity, key[0]=0",
                "Use min-heap to extract vertex with minimum key",
                "Update neighbors: if weight < neighbor's key, update and push to heap",
                "Accumulate total MST weight"
              ]
            },
            theory: [
              {
                title: "Prim's Algorithm",
                body: [
                  "Greedy algorithm for MST that builds tree incrementally.",
                  "Start from an arbitrary root vertex.",
                  "At each step, add the smallest weight edge connecting the tree to a vertex not yet in the tree.",
                  "Using binary heap: O((V+E) log V) or O(V^2) with adjacency matrix for dense graphs."
                ]
              }
            ],
            pretest: [
              { question: "Prim's algorithm starts from:", options: ["Smallest weight edge", "Any vertex", "Highest degree vertex", "Random edge"], answerIndex: 1, hint: "MST independent of starting vertex." },
              { question: "Prim's algorithm is similar to:", options: ["Dijkstra's algorithm", "Bellman-Ford", "Kruskal's", "Floyd-Warshall"], answerIndex: 0, hint: "Both use priority queue and grow frontier." }
            ],
            procedure: [
              "Open the Code Test tab with Prim starter code",
              "Build adjacency list representation",
              "Initialize key array with Infinity, key[0]=0, parent array",
              "Use min-heap to extract min key vertex",
              "Relax neighbors: if weight < key[neighbor], update key and parent",
              "Add weight to MST total when vertex is extracted (except first)",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class MinHeap {\n    constructor() { this.heap = []; }\n    push(node) { this.heap.push(node); this._bubbleUp(this.heap.length-1); }\n    pop() { const min = this.heap[0]; const last = this.heap.pop(); if (this.heap.length) { this.heap[0] = last; this._bubbleDown(0); } return min; }\n    isEmpty() { return this.heap.length === 0; }\n    _bubbleUp(i) { while(i>0) { const p = Math.floor((i-1)/2); if(this.heap[p].key > this.heap[i].key) { [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]]; i=p; } else break; } }\n    _bubbleDown(i) { const n = this.heap.length; while(true) { let smallest = i; const l=2*i+1, r=2*i+2; if(l<n && this.heap[l].key<this.heap[smallest].key) smallest=l; if(r<n && this.heap[r].key<this.heap[smallest].key) smallest=r; if(smallest!==i) { [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]]; i=smallest; } else break; } }\n}\n\nfunction prim(graph, V) {\n    const key = new Array(V).fill(Infinity);\n    const inMST = new Array(V).fill(false);\n    const parent = new Array(V).fill(-1);\n    key[0] = 0;\n    const pq = new MinHeap();\n    pq.push({ vertex: 0, key: 0 });\n    let totalWeight = 0;\n\n    while (!pq.isEmpty()) {\n        const { vertex: u } = pq.pop();\n        if (inMST[u]) continue;\n        inMST[u] = true;\n        totalWeight += key[u];\n\n        for (const [v, weight] of graph[u]) {\n            if (!inMST[v] && weight < key[v]) {\n                key[v] = weight;\n                parent[v] = u;\n                pq.push({ vertex: v, key: weight });\n            }\n        }\n    }\n    return { totalWeight, parent };\n}\n\n// Test\nconst V = 5;\nconst graph = [\n    [[1, 2], [3, 6]],\n    [[0, 2], [2, 3], [3, 8], [4, 5]],\n    [[1, 3], [4, 7]],\n    [[0, 6], [1, 8], [4, 9]],\n    [[1, 5], [2, 7], [3, 9]]\n];\nconst result = prim(graph, V);\nconsole.log('MST total weight:', result.totalWeight);\nconsole.log('Parent array:', result.parent);",
              steps: [
                { line: 1, annotation: "Min-heap for extracting min key vertex", memory: [], output: "Heap ready" },
                { line: 2, annotation: "Prim: add min key vertex to MST", memory: [], output: "MST built" },
                { line: 3, annotation: "Update keys of adjacent vertices", memory: [], output: "Optimistic update" }
              ]
            },
            posttest: [
              { question: "Prim's algorithm with binary heap has complexity:", options: ["O(V^2)", "O(E log V)", "O(V log V)", "O(V+E)"], answerIndex: 1, hint: "Extract-min and decrease-key operations." },
              { question: "For dense graphs, which MST algorithm is better?", options: ["Kruskal's", "Prim's with adjacency matrix O(V^2)", "Both same", "Bellman-Ford"], answerIndex: 1, hint: "Adjacency matrix Prim is O(V^2), good for dense." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 23 on MST",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 4.3 on Prim's Algorithm"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 12",
      objective: "BFS and DFS Traversal of Graphs",
      tutorial: "Tutorial 12: Graph Traversals",
      labTitle: "Lab 12: BFS and DFS",
      experiments: [
        {
          id: "ads-w12-1",
          title: "BFS and DFS Implementation",
          desc: "Implement Breadth-First Search (BFS) and Depth-First Search (DFS) for graph traversal. For DFS, implement both recursive and iterative versions.",
          expected: "Correct order of visited vertices; detect connected components; compute shortest path in unweighted graph using BFS",
          content: {
            aim: {
              text: "In this experiment, the student will implement BFS and DFS traversals. The student will:",
              bullets: [
                "Build adjacency list representation of a graph",
                "Implement BFS using a queue",
                "Implement DFS recursive and iterative (using stack)",
                "Track visited nodes to avoid cycles",
                "Find number of connected components",
                "Use BFS to compute shortest path in unweighted graph"
              ]
            },
            theory: [
              {
                title: "Breadth-First Search (BFS)",
                body: [
                  "Traverses graph level by level.",
                  "Uses a queue to process vertices.",
                  "Finds shortest path in unweighted graphs.",
                  "Time complexity: O(V+E)."
                ]
              },
              {
                title: "Depth-First Search (DFS)",
                body: [
                  "Traverses as far as possible before backtracking.",
                  "Recursive implementation uses call stack; iterative uses explicit stack.",
                  "Used for topological sorting, cycle detection, strongly connected components.",
                  "Time complexity: O(V+E)."
                ]
              }
            ],
            pretest: [
              { question: "Which data structure is used for BFS?", options: ["Stack", "Queue", "Priority Queue", "Array"], answerIndex: 1, hint: "FIFO gives level order." },
              { question: "Which traversal guarantees shortest path in unweighted graph?", options: ["DFS", "BFS", "Both", "Neither"], answerIndex: 1, hint: "BFS explores level by level." }
            ],
            procedure: [
              "Open the Code Test tab with graph starter code",
              "Define graph as adjacency list",
              "Implement BFS using queue (visited array)",
              "Implement DFS recursive (function calls itself)",
              "Implement DFS iterative (explicit stack)",
              "Test on sample graph with 6 vertices",
              "Compute connected components count",
              "Use BFS to find shortest path from source to target",
              "Proceed to Posttest"
            ],
            simulation: {
              code: "class Graph {\n    constructor(V) {\n        this.V = V;\n        this.adj = new Array(V).fill().map(() => []);\n    }\n    addEdge(u, v) {\n        this.adj[u].push(v);\n        this.adj[v].push(u); // undirected\n    }\n    bfs(start) {\n        const visited = new Array(this.V).fill(false);\n        const queue = [];\n        const order = [];\n        visited[start] = true;\n        queue.push(start);\n        while (queue.length) {\n            const u = queue.shift();\n            order.push(u);\n            for (const v of this.adj[u]) {\n                if (!visited[v]) {\n                    visited[v] = true;\n                    queue.push(v);\n                }\n            }\n        }\n        return order;\n    }\n    dfsRecursive(start, visited = new Array(this.V).fill(false), order = []) {\n        visited[start] = true;\n        order.push(start);\n        for (const v of this.adj[start]) {\n            if (!visited[v]) this.dfsRecursive(v, visited, order);\n        }\n        return order;\n    }\n    dfsIterative(start) {\n        const visited = new Array(this.V).fill(false);\n        const stack = [];\n        const order = [];\n        stack.push(start);\n        while (stack.length) {\n            const u = stack.pop();\n            if (!visited[u]) {\n                visited[u] = true;\n                order.push(u);\n                for (const v of this.adj[u]) {\n                    if (!visited[v]) stack.push(v);\n                }\n            }\n        }\n        return order;\n    }\n    shortestPathBFS(start, target) {\n        const visited = new Array(this.V).fill(false);\n        const dist = new Array(this.V).fill(Infinity);\n        const parent = new Array(this.V).fill(-1);\n        const queue = [];\n        visited[start] = true;\n        dist[start] = 0;\n        queue.push(start);\n        while (queue.length) {\n            const u = queue.shift();\n            if (u === target) break;\n            for (const v of this.adj[u]) {\n                if (!visited[v]) {\n                    visited[v] = true;\n                    dist[v] = dist[u] + 1;\n                    parent[v] = u;\n                    queue.push(v);\n                }\n            }\n        }\n        return dist[target] !== Infinity ? dist[target] : -1;\n    }\n}\n\n// Test\nconst g = new Graph(6);\ng.addEdge(0, 1);\ng.addEdge(0, 2);\ng.addEdge(1, 3);\ng.addEdge(2, 4);\ng.addEdge(3, 4);\ng.addEdge(3, 5);\n\nconsole.log('BFS from 0:', g.bfs(0));\nconsole.log('DFS recursive from 0:', g.dfsRecursive(0));\nconsole.log('DFS iterative from 0:', g.dfsIterative(0));\nconsole.log('Shortest path 0→5:', g.shortestPathBFS(0, 5));",
              steps: [
                { line: 1, annotation: "BFS using queue — level order", memory: [], output: "[0,1,2,3,4,5]" },
                { line: 2, annotation: "DFS recursive — deep traversal", memory: [], output: "[0,1,3,4,2,5]" },
                { line: 3, annotation: "DFS iterative with stack", memory: [], output: "Different order but valid DFS" },
                { line: 4, annotation: "BFS for shortest path in unweighted graph", memory: [], output: "Distance 0→5 = 3" }
              ]
            },
            posttest: [
              { question: "BFS on a graph with V vertices and E edges has complexity:", options: ["O(V)", "O(E)", "O(V+E)", "O(V*E)"], answerIndex: 2, hint: "Each vertex and edge processed once." },
              { question: "Which traversal can be used to detect cycles in a graph?", options: ["BFS only", "DFS only", "Both BFS and DFS", "Neither"], answerIndex: 2, hint: "Back edges in DFS indicate cycles." }
            ],
            references: [
              "Cormen, T.H. et al. - 'Introduction to Algorithms', 3rd Edition, MIT Press, Chapter 22 on Graph Traversals",
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 4.1 on BFS and DFS"
            ]
          }
        }
      ]
    },
    {
      title: "WEEK 13-14",
      objective: "Mini-Project — Autocomplete Search System",
      tutorial: "Project: Integrated Application",
      labTitle: "Project: Autocomplete Search using Trie and Ranking",
      experiments: [
        {
          id: "ads-w13-1",
          title: "Project — Autocomplete Search with Trie and Frequency Ranking",
          desc: "Design and implement a mini-application for autocomplete search. Use Trie to store words and a priority system to rank suggestions by frequency or recency.",
          expected: "Working autocomplete system with O(m) prefix search and ranked suggestions",
          content: {
            aim: {
              text: "In this project, the student will integrate multiple data structures into a complete application. The student will:",
              bullets: [
                "Build a Trie of words from a corpus/dictionary",
                "Store frequency/weight at each node",
                "Implement autocomplete(prefix) returning top-k suggestions",
                "Implement ranking (by frequency, alphabetical, or custom)",
                "Create a simple UI (or console) for user interaction",
                "Load dictionary from a file (or predefined word list)"
              ]
            },
            theory: [
              {
                title: "Autocomplete System Design",
                body: [
                  "Trie provides O(m) prefix search.",
                  "Each node stores top k suggestions for that prefix (optimization).",
                  "Alternative: Store all words in node's subtree, then sort by weight.",
                  "Ranking factors: frequency, recency, alphabetical, user history."
                ]
              }
            ],
            pretest: [
              { question: "What data structure is best for prefix-based search?", options: ["Hash Table", "Trie", "Binary Search Tree", "Array"], answerIndex: 1, hint: "Trie excels at prefix operations." },
              { question: "How can we make autocomplete suggestions faster for frequent queries?", options: ["Store top K suggestions at each node", "Use more memory", "Compress the trie", "All of the above"], answerIndex: 3, hint: "Multiple optimizations possible." }
            ],
            procedure: [
              "Plan the project architecture: data loading, trie construction, query processing, ranking",
              "Implement TrieNode with children, isEnd, frequency, and topSuggestions array",
              "During insertion, update frequencies at each node",
              "Implement getSuggestions(prefix) that returns top-k ranked words",
              "Test with sample dictionary of 100+ words",
              "(Optional) Build a simple web UI using HTML/CSS/JS",
              "Demonstrate autocomplete as user types",
              "Proceed to Project Submission"
            ],
            simulation: {
              code: "class AutocompleteNode {\n    constructor() {\n        this.children = new Array(26).fill(null);\n        this.isEnd = false;\n        this.frequency = 0;\n        this.topSuggestions = []; // store top k suggestions at this node\n    }\n}\n\nclass AutocompleteSystem {\n    constructor(topK = 5) {\n        this.root = new AutocompleteNode();\n        this.topK = topK;\n    }\n\n    charToIndex(ch) {\n        return ch.charCodeAt(0) - 'a'.charCodeAt(0);\n    }\n\n    insert(word, freq = 1) {\n        let node = this.root;\n        for (let i = 0; i < word.length; i++) {\n            const idx = this.charToIndex(word[i]);\n            if (!node.children[idx]) node.children[idx] = new AutocompleteNode();\n            node = node.children[idx];\n            // Update top suggestions at each node\n            if (!node.topSuggestions.includes(word)) {\n                node.topSuggestions.push(word);\n                node.topSuggestions.sort((a, b) => this.getFrequency(b) - this.getFrequency(a));\n                if (node.topSuggestions.length > this.topK) node.topSuggestions.pop();\n            }\n        }\n        node.isEnd = true;\n        node.frequency += freq;\n        // Propagate frequency update for ranking\n        node = this.root;\n        for (let i = 0; i < word.length; i++) {\n            const idx = this.charToIndex(word[i]);\n            node = node.children[idx];\n            node.topSuggestions.sort((a, b) => this.getFrequency(b) - this.getFrequency(a));\n        }\n    }\n\n    getFrequency(word) {\n        let node = this.root;\n        for (let i = 0; i < word.length; i++) {\n            const idx = this.charToIndex(word[i]);\n            if (!node.children[idx]) return 0;\n            node = node.children[idx];\n        }\n        return node.isEnd ? node.frequency : 0;\n    }\n\n    autocomplete(prefix) {\n        let node = this.root;\n        for (let i = 0; i < prefix.length; i++) {\n            const idx = this.charToIndex(prefix[i]);\n            if (!node.children[idx]) return [];\n            node = node.children[idx];\n        }\n        return node.topSuggestions.slice();\n    }\n\n    // Bulk insert from corpus\n    buildFromCorpus(words) {\n        for (const word of words) {\n            this.insert(word);\n        }\n    }\n}\n\n// Test\nconst corpus = ['cat', 'car', 'cart', 'catalog', 'catapult', 'category', 'cater', 'cattle', 'ca', 'c'];\nconst autocomplete = new AutocompleteSystem(3);\nautocomplete.buildFromCorpus(corpus);\n\nconsole.log('Suggestions for \"ca\":', autocomplete.autocomplete('ca'));\nconsole.log('Suggestions for \"cat\":', autocomplete.autocomplete('cat'));\nconsole.log('Suggestions for \"cata\":', autocomplete.autocomplete('cata'));\n\n// Simulate user selecting a word — increase frequency\nautocomplete.insert('catapult', 1); // increase frequency of 'catapult'\nconsole.log('After boosting \"catapult\":', autocomplete.autocomplete('cat'));",
              steps: [
                { line: 1, annotation: "Trie node with topK suggestions cache", memory: [], output: "Node structure for autocomplete" },
                { line: 2, annotation: "Insert updates top suggestions at each prefix node", memory: [], output: "Ranked suggestions stored" },
                { line: 3, annotation: "autocomplete returns topK suggestions", memory: [], output: "O(m) prefix lookup" },
                { line: 4, annotation: "Frequency tracking for ranking", memory: [], output: "Dynamic ranking based on usage" }
              ]
            },
            posttest: [
              { question: "What is the space-time tradeoff in storing topK suggestions at each node?", options: ["More memory, faster queries", "Less memory, slower queries", "No tradeoff", "Only time affected"], answerIndex: 0, hint: "Cache precomputes results." },
              { question: "How can we handle non-English characters (Unicode) in Trie?", options: ["Use array of size 128/256", "Use Map instead of array", "Use Unicode normalization", "All of the above"], answerIndex: 3, hint: "Multiple approaches exist." }
            ],
            references: [
              "Sedgewick, R. and Wayne, K. - 'Algorithms', 4th Edition, Section 5.2 on Tries and String Algorithms",
              "Manning, C.D. et al. - 'Introduction to Information Retrieval', Cambridge UP, Chapter on Indexing"
            ]
          }
        }
      ]
    }
  ]
};