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
    primary: "Undergraduate students of Computer Science and Engineering studying Advanced Data Structures and Algorithms.",
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
              text: "This experiment focuses on building an AVL Tree — a self-balancing Binary Search Tree that automatically keeps itself height-balanced after every insertion. You will start by setting up the node structure with a height field, then build the four rotation routines (LL, RR, LR, RL) that restore balance whenever a node becomes lopsided. Finally, you will wire those rotations into the insert function so that the tree stays at O(log n) height at all times. By the end of the experiment you should be able to: trace which rotation fires for any given insertion sequence, verify that every node's balance factor stays within {–1, 0, +1}, and explain why maintaining that invariant guarantees logarithmic search time.",
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
                  "Imagine you have a pile of numbered books and you keep stacking them on a shelf in the order you receive them. If you always get books with bigger numbers, the shelf tilts completely to one side — finding book #1 means checking every single book. That's a terrible library!",
                  "An AVL tree is like a magic librarian who instantly re-organises the shelf every time you add a book, making sure the left side and right side never differ in height by more than one book. This guarantee means you can always find any book in at most log₂(n) steps — even with a million books, that's only about 20 steps.",
                  "AVL trees were the very first self-balancing trees ever invented (by Adelson-Velsky and Landis in 1962). They are stricter about balance than Red-Black trees, which makes lookups a tiny bit faster at the cost of doing a few more re-arrangements on insert and delete."
                ]
              },
              {
                title: "Balance Factor and Height",
                body: [
                  "![AVL Tree Balance Factors](/avl_balance_factors.webp)",
                  "Think of the balance factor (BF) as asking: 'Is my left arm heavier than my right arm?' Specifically, BF = height(left subtree) − height(right subtree).",
                  "A healthy AVL node always answers −1, 0, or +1. If the answer is −2 or +2, the tree is off-balance and needs a rotation to fix itself — just like a seesaw that has slid too far to one side.",
                  "Height here means the number of edges on the longest path down to a leaf. A single-node tree has height 0; a null pointer has height −1 (or 0 depending on convention — in code we use 0 for null to simplify arithmetic).",
                  "Fun fact: Even in the worst case, an AVL tree with n nodes is at most 1.44 × log₂(n) levels tall. For 1,000,000 nodes that is about 29 levels — search is blazing fast."
                ]
              },
              {
                title: "AVL Rotations — Detailed Explanation",
                body: [
                  "![AVL Tree Rotations Visualization](/avl_rotations.webp)",
                  "A rotation is like picking up a subtree and tilting it so the tall side becomes the new root. Only the local shape changes — the left-to-right ordering of keys is always preserved.",
                  "There are four situations that can arise, each with its own fix:",
                  "1. LL (Left-Left) — the tree grew too tall on the left-of-left side. Fix: rotate the whole subtree to the right (think of tipping a left-leaning tower clockwise).",
                  "2. RR (Right-Right) — the tree grew too tall on the right-of-right side. Fix: rotate the subtree to the left (tip a right-leaning tower counter-clockwise).",
                  "3. LR (Left-Right) — the growth is in the right child of the left child — a zigzag. Fix: first rotate the left child left (straightening the zigzag), then rotate the whole subtree right.",
                  "4. RL (Right-Left) — the mirror zigzag. Fix: first rotate the right child right, then rotate the whole subtree left.",
                  "Each rotation touches only 2–3 nodes and runs in O(1) time, so rebalancing is essentially free compared to the cost of finding the insertion point."
                ]
              },
              {
                title: "AVL Insertion Algorithm",
                body: [
                  "Inserting into an AVL tree is like adding a book to a sorted shelf while the magic librarian watches:",
                  "Step 1 — Drop the book in the right spot using normal BST rules (smaller keys go left, bigger go right).",
                  "Step 2 — Walk back up to the root, updating each ancestor's height as you go.",
                  "Step 3 — At each ancestor, check the balance factor.",
                  "Step 4 — The moment you find a node with BF = +2 or −2, perform the matching rotation. The tree is balanced again after at most one rotation (or one double rotation for LR/RL).",
                  "Step 5 — Continue up to the root to finish updating heights.",
                  "Because at most one single or double rotation is ever needed per insertion, the total cost is O(log n) — dominated by the time spent searching for the insertion spot."
                ]
              },
              {
                title: "Time and Space Complexity",
                body: [
                  "Think of complexity as answering: 'How much harder does the job get as the library grows?'",
                  "Search: O(log n) — because the height is capped at ~1.44 log₂(n), you never check more than that many nodes.",
                  "Insertion: O(log n) — you spend O(log n) finding the spot, then O(1) rotating. Total: O(log n).",
                  "Deletion: O(log n) — finding and removing the node is O(log n); rebalancing while walking back up is also O(log n).",
                  "Space: O(n) — one node per stored key, plus a small height field.",
                  "AVL vs Red-Black: AVL trees are more rigidly balanced, so lookups are slightly faster. Red-Black trees allow a bit more imbalance, so insertions and deletions do fewer rotations. The rule of thumb — use AVL when you read far more than you write, and Red-Black when writes are frequent."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment extends the AVL tree from the previous lab by adding the delete operation. Deletion is trickier than insertion because removing a node can trigger a chain of rebalancing steps that propagates all the way back up to the root. You will implement the three standard BST deletion cases (leaf node, one-child node, two-child node using the inorder successor), then add height updates and rotation checks at every level on the return path. By the end you should be able to: correctly remove any key while keeping every node's balance factor in {–1, 0, +1}, handle cascading rotations that span multiple levels, and understand why deletion may require O(log n) rotations while insertion needs at most one.",
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
                  "![AVL Tree Deletion](/avl_deletion.webp)",
                  "Imagine our magic librarian now has to remove a book from the perfectly balanced shelf. Removing a book from the edge is easy. Removing one from the middle might leave a gap that causes one side to topple. The librarian then has to rearrange several shelves — not just the one where the book was removed.",
                  "The delete algorithm works in two phases. Phase 1 is the normal BST removal:",
                  "Case 1 (Leaf node) — The node has no children. Simply unlink it from its parent. Easy!",
                  "Case 2 (One child) — Bypass the node by connecting its parent directly to its only child. Like removing a link from a chain.",
                  "Case 3 (Two children) — You can't just remove this node without leaving a hole. Instead, find the inorder successor (the next largest key — the leftmost node in the right subtree), copy its value into the current node, then delete the successor (which is always Case 1 or 2 — simpler!).",
                  "Phase 2 — Walk back up the tree, updating heights and performing rotations wherever the balance factor has gone to +2 or −2. Unlike insertion, multiple rotations may be needed as the imbalance propagates upward."
                ]
              },
              {
                title: "Deletion Rebalancing Cases",
                body: [
                  "After a deletion the balance check is the same four cases as in insertion (LL, RR, LR, RL), but there is one subtle difference:",
                  "When the uncle/sibling subtree has BF = 0 (called R0 or L0 case), a single rotation fixes the local imbalance but the height of the rotated subtree decreases by one. That height decrease ripples upward, potentially creating new imbalances higher in the tree — so the algorithm must keep checking all the way to the root.",
                  "In the R1 and L1 cases (sibling BF = ±1), the rotation restores both balance and the original height, so no further rotations are needed above. This is the 'lucky' case.",
                  "In the R−1 (RL) and L−1 (LR) cases, a double rotation is needed, similar to insertion.",
                  "Bottom line: insertion always terminates after at most one rotation; deletion may need up to O(log n) rotations."
                ]
              },
              {
                title: "Inorder Successor and Predecessor",
                body: [
                  "When deleting a node with two children we need a stand-in — someone who can fill that spot in sorted order without breaking anything.",
                  "The Inorder Successor is the smallest key that is still larger than the deleted key. You find it by going one step right, then as far left as possible. It always has at most one child (it can't have a left child, because if it did, that left child would be the actual successor).",
                  "The Inorder Predecessor is the mirror: the largest key smaller than the deleted key. Go one step left, then as far right as possible.",
                  "Either works. We copy the successor's key into the node we're 'deleting', then delete the successor itself — which is now a simple Case 1 or 2 deletion."
                ]
              },
              {
                title: "Example Deletion Scenarios",
                body: [
                  "Example 1 — Delete a leaf: Tree has {20 (root), 10 (left), 30 (right)}. Delete 30. Simply unlink it. Balance factor at root goes from 0 to +1 — still within range, no rotation needed.",
                  "Example 2 — Delete with one child: Tree has {30 (root), 20 (left)}. Delete 30. Replace root with 20. Done.",
                  "Example 3 — Delete with two children: Tree has {20, 10, 30, 25, 35}. Delete 20. Find inorder successor: 25. Copy 25 into the root, delete 25 from the right subtree. Rebalance if needed.",
                  "Example 4 — Cascading rotations: In a deep, perfectly balanced tree, deleting a leaf at the bottom can cause a height decrease that triggers rotations at every level up to the root. This is why deletion rebalancing can take O(log n) rotations in the worst case."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment introduces the Red-Black Tree — a self-balancing BST that uses a two-colour labelling scheme (RED / BLACK) to enforce a 'soft' balance guarantee. Unlike AVL trees that measure exact heights, Red-Black trees work with colour rules that are easier to maintain during insertions and deletions. You will build a complete Red-Black Tree from scratch: define the node structure with a parent pointer and colour field, implement left and right rotations that correctly update parent links, and code the insertFixup routine that handles all six uncle-colour cases (three for each mirror side). After completing this experiment you should be able to: state all five Red-Black properties from memory, trace the fixup path for any insertion, and explain why the tree's height is bounded by 2 log₂(n+1).",
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
                  "Imagine a company that uses two badge colours — red and black. The company has five strict HR rules about who can sit next to whom. As long as nobody breaks these five rules, the org-chart (the tree) can never get too deep — the CEO is guaranteed to reach any employee in at most 2 × log₂(n+1) steps.",
                  "The five rules are:",
                  "Rule 1 — Every employee wears either a red or black badge. (Every node is RED or BLACK.)",
                  "Rule 2 — The CEO always wears black. (The root is always BLACK.)",
                  "Rule 3 — Every 'ghost' seat at the bottom of the chart (NIL leaves) is black. (All null leaves are BLACK.)",
                  "Rule 4 — No two red-badge employees can sit directly above and below each other. (No consecutive RED nodes on any root-to-leaf path.)",
                  "Rule 5 — Every path from any employee down to a ghost seat passes through exactly the same number of black-badge people. (All paths have equal black-height.)",
                  "An example of red black tree is:",
                  "![Red-Black Tree Example](/red_black_tree.webp)",
                  "These five rules together make it impossible for the tree to become lopsided enough to degrade search performance."
                ]
              },
              {
                title: "Black-Height and Tree Height Guarantee",
                body: [
                  "Black-height (bh) is the count of BLACK nodes on any path from a given node down to a leaf — not counting the node itself if it's black.",
                  "Here is the key insight in plain English: because Rule 4 bans consecutive red nodes, at most half the nodes on any root-to-leaf path can be red. That means the longest path (alternating red and black) is at most twice the shortest path (all black). So the tree height h satisfies h ≤ 2 × log₂(n+1).",
                  "This height bound is a little looser than AVL (which promises h ≤ 1.44 × log₂n), but it is still O(log n) — and the looser bound means Red-Black trees need fewer rotations during insertions and deletions."
                ]
              },
              {
                title: "Red-Black Tree Rotations",
                body: [
                  "Rotations in a Red-Black tree do the same job as in an AVL tree — they restructure a small part of the tree without breaking the BST ordering. The one extra responsibility here is updating parent pointers, because Red-Black tree nodes know who their parent is.",
                  "Left Rotation on node x (x has a right child y):",
                  "• y becomes the new local root.",
                  "• x becomes y's left child.",
                  "• y's old left subtree becomes x's right subtree.",
                  "• Three parent-pointer updates: y's parent ← x's old parent, x's parent ← y, y's left subtree's parent ← x.",
                  "Right Rotation is exactly the mirror image.",
                  "Both operations are O(1). They preserve black-height — colours change during fixup, not during rotation."
                ]
              },
              {
                title: "Insertion Fixup Cases — Detailed Analysis",
                body: [
                  "When we insert a new node we colour it RED (this keeps black-height unchanged — Rule 5 is safe). But if the parent is also RED, we break Rule 4. The fixup procedure repairs this.",
                  "Think of it as a bubble that floats upward: the 'bad red-red pair' is the bubble and we pop it as high as it needs to go.",
                  "Case 1 — Uncle is RED: Recolour parent and uncle to BLACK, grandparent to RED. The bubble moves up to the grandparent. No rotation needed here — just marker swaps.",
                  "Case 2 — Uncle is BLACK, and the new node is an 'inner' grandchild (zigzag shape): Rotate the parent to straighten the zigzag, converting into Case 3.",
                  "Case 3 — Uncle is BLACK, and the new node is an 'outer' grandchild (straight line): Recolour parent to BLACK, grandparent to RED, then rotate the grandparent away. The bubble is popped — done.",
                  "Each case has a mirror image for when the parent is a right child. Regardless of the path, the fixup terminates after at most two rotations and O(log n) colour changes."
                ]
              },
              {
                title: "Comparison with AVL Trees",
                body: [
                  "Think of AVL and Red-Black trees as two different types of traffic cops on a road:",
                  "AVL cop is very strict — cars (nodes) must be perfectly spaced. Any imbalance by even 1 unit triggers an immediate re-arrangement. Great if traffic (lookups) is heavy because the road stays smooth. More work for the cop when cars arrive (insertions).",
                  "Red-Black cop is more relaxed — allows a bit more gap between cars, but still prevents total gridlock. Fewer re-arrangements per insertion/deletion. Slightly bumpier road for lookups, but still fast.",
                  "Lookup speed: AVL slightly faster due to smaller height.",
                  "Insert/Delete speed: Red-Black faster — at most 2 rotations for insert, 3 for delete; AVL may need O(log n).",
                  "Real-world use: Java's TreeMap, C++ std::map, Linux kernel process scheduler all use Red-Black trees because they handle frequent insertions and deletions well."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment builds a B-Tree — a multi-way balanced search tree designed for systems where reading or writing a chunk of data at once (a disk block) is far cheaper than doing many small reads. You will implement a B-Tree with minimum degree t = 2 (order 4, also called a 2-3-4 tree), covering: the node structure that holds multiple keys and child pointers, the splitChild routine that splits a full node before descending into it, and the top-down insertNonFull approach that guarantees we never get stuck without room to insert. By the end you should be able to: insert any sequence of keys into a B-Tree, correctly split nodes at every level including the root, and explain why B-Trees are the go-to index structure in databases and file systems.",
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
                  "![B-Tree Example](/b-tree.webp)",
                  "Imagine you run a massive library warehouse. The books are stored in physical filing cabinets (disk), and each time you open a cabinet it takes 10 seconds (disk I/O). You want a catalogue system that requires opening as few cabinets as possible per lookup.",
                  "A regular binary tree would need up to 30 cabinet-opens to find one book out of a million. A B-Tree with 100 keys per node needs at most 3 opens — because each cabinet holds a hundred index entries instead of just one.",
                  "This is the core idea of B-Trees: pack as many keys as possible into each node so the tree becomes very short (few levels), and each level corresponds to one disk read."
                ]
              },
              {
                title: "B-Tree Properties and Definitions",
                body: [
                  "A B-Tree with minimum degree t (t ≥ 2) follows these rules — think of each node as a filing cabinet with a minimum and maximum capacity:",
                  "• Every cabinet except the front desk (root) must hold at least t−1 index cards (keys).",
                  "• Every cabinet can hold at most 2t−1 cards.",
                  "• A cabinet with k cards has exactly k+1 drawer compartments (children) unless it's a leaf.",
                  "• All leaf cabinets are at the exact same depth — the warehouse floor is perfectly level.",
                  "For t = 2 (2-3-4 tree): each cabinet holds 1 to 3 cards and has 2 to 4 drawers.",
                  "For t = 50: each cabinet holds 49 to 99 cards and has 50 to 100 drawers — a tree of height 3 can index over a million records!"
                ]
              },
              {
                title: "B-Tree Insertion Algorithm",
                body: [
                  "Inserting into a B-Tree uses a clever top-down strategy: split any full cabinet you encounter on the way down, so you are never blocked at the bottom.",
                  "Step 1 — Is the front desk (root) full? If yes, split it first. This is the only way the tree grows taller.",
                  "Step 2 — Descend from the root toward the correct leaf, splitting any full child before entering it.",
                  "Step 3 — At the leaf, there is guaranteed space (because we pre-split on the way down), so insert the key in sorted order.",
                  "Step 4 — The split operation takes a full node (2t−1 keys), promotes its median key up to the parent, and splits the remaining keys into two equal halves.",
                  "This proactive splitting means we never need to walk back up after an insertion — one downward pass is enough."
                ]
              },
              {
                title: "Node Split Operation — Detailed Example",
                body: [
                  "Let's watch a split happen with t = 2 (max 3 keys per node).",
                  "Before split: a node is full with keys [10, 20, 30].",
                  "Split steps:",
                  "1. The median key is 20 (the middle of three keys).",
                  "2. 20 is promoted (moved up) to the parent node.",
                  "3. A new right node is created with [30] (keys after the median).",
                  "4. The original node is left with [10] (keys before the median).",
                  "5. The child pointers are divided accordingly — left node keeps the first t children, right node keeps the remaining t children.",
                  "After the split the parent has one more key and one more child pointer. If the parent was also full, it would have been split before we descended into the full child — that's why we split proactively on the way down."
                ]
              },
              {
                title: "Complexity Analysis",
                body: [
                  "Height of a B-Tree: For n keys and minimum degree t, the height h satisfies h ≤ log_t((n+1)/2).",
                  "In plain terms: with t = 100 and one million keys, height ≤ log₁₀₀(500,000) ≈ 3. Three disk reads to find anything in a million-record database!",
                  "Number of disk accesses per operation:",
                  "• Search: O(log_t n) — one read per level descended.",
                  "• Insert: O(log_t n) — one write per level on the way down (for splits).",
                  "• Delete: O(log_t n) — similar to insert.",
                  "Each 'disk access' here reads or writes a whole node (one disk block). The key metric for real databases is the number of disk I/Os, not raw comparisons — and B-Trees minimise this perfectly."
                ]
              },
              {
                title: "B-Tree vs Binary Search Trees",
                body: [
                  "Why not just use an AVL or Red-Black tree for a database index?",
                  "In memory, AVL/RB trees are great — each node access is a nanosecond. But on disk, each node access costs milliseconds. A Red-Black tree of a million nodes has height ~20, meaning up to 20 disk reads per lookup. That's 20 × 10ms = 200ms just to find one record.",
                  "A B-Tree of the same million nodes with t=100 has height 3 — just 3 disk reads, or 30ms.",
                  "Rule of thumb: Use AVL/Red-Black when data fits in RAM. Use B-Trees when data lives on disk or SSD and is accessed in large blocks.",
                  "Real-world users: MySQL InnoDB, PostgreSQL, SQLite, MongoDB all use B-Trees (or B+ Trees) as their primary index structure."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment builds a B+ Tree — the dominant index structure in real-world database engines. A B+ Tree differs from a B-Tree in one crucial way: all actual data lives in the leaf nodes, while internal nodes store only routing keys. Leaf nodes are chained together in a linked list, enabling fast range scans. You will implement two types of nodes (leaf and internal), the copy-up rule for leaf splits (the promoted key stays in the leaf), the push-up rule for internal-node splits (the promoted key is removed from the internal node), and a range query that exploits the leaf chain. By the end you should be able to: describe why databases prefer B+ Trees over B-Trees for both point queries and range queries, trace any insertion through the tree, and perform a range query using the leaf linked list.",
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
                  "![B+ Tree Structure Detailed](/bplus_tree_detailed.webp)",
                  "Think of a B-Tree like a store where every shelf — from top to bottom — holds actual products. To browse products in a price range you have to zigzag up and down through all the shelves.",
                  "A B+ Tree is like a store redesigned by a clever manager: the upper shelves hold only price-range signs (routing keys), while all actual products sit on the ground floor (leaves). The ground floor is also one long corridor — you can walk from the cheapest to the most expensive product without ever going upstairs.",
                  "The four key differences from a B-Tree:",
                  "1. Data is only in leaves. Internal nodes hold routing keys that guide the search, but no data records.",
                  "2. Leaf nodes are linked. Each leaf points to the next leaf in sorted order — a linked list at the bottom.",
                  "3. Keys may be duplicated. The smallest key of a right subtree appears both in the internal node (as a router) and in the leaf (as actual data).",
                  "4. Higher fanout. Because internal nodes carry no data, they can hold more keys — making the tree even shorter and reducing disk I/O further."
                ]
              },
              {
                title: "B+ Tree Node Structure",
                body: [
                  "Leaf Node — the ground floor:",
                  "• Holds keys in sorted order alongside data pointers (or actual records).",
                  "• Has a 'next' pointer pointing to the next leaf — forming the corridor.",
                  "• A leaf with k keys holds k key-pointer pairs.",
                  "Internal Node — the signpost floor:",
                  "• Holds only routing keys — no data.",
                  "• Has k+1 child pointers for k keys (each key is a divider between two children).",
                  "• A key value v in an internal node means: 'everything to the left is ≤ v; everything to the right is > v'.",
                  "This clean separation is why B+ Trees are so efficient: internal nodes can be cached in memory permanently (they're small), while leaf nodes are read from disk only when needed."
                ]
              },
              {
                title: "B+ Tree Insertion Algorithm",
                body: [
                  "Step 1 — Find the right leaf: Descend from root using routing keys, like following directional signs in the store.",
                  "Step 2 — Insert into the leaf: Add the key in sorted order.",
                  "Step 3 — Leaf overflow? If the leaf now has too many keys (exceeds order − 1):",
                  "• Split the leaf in half: left half stays, right half becomes a new leaf.",
                  "• Copy (do not remove) the first key of the right leaf up to the parent as a new routing key.",
                  "• Link the new right leaf into the corridor (update 'next' pointers).",
                  "Step 4 — Internal node overflow? If the parent received a new routing key and is now too full:",
                  "• Split the internal node in half.",
                  "• This time, Push (move and remove) the median key up to the grandparent. Unlike leaves, internal nodes do not need to keep the median.",
                  "Step 5 — Root overflow? Create a new root. This is the only way the tree grows taller."
                ]
              },
              {
                title: "Copy-Up vs Push-Up",
                body: [
                  "This is the most important concept unique to B+ Trees — and the most common exam question!",
                  "Copy-Up (when a leaf splits): The median key is copied to the parent AND kept in the right leaf. Why? Because all data must remain accessible via the leaves. If we removed the key from the leaf, we'd lose the data record.",
                  "Push-Up (when an internal node splits): The median key is moved (not copied) to the parent. Why? Internal nodes are only signposts — they don't hold data. Keeping a copy would just waste space and confuse the routing.",
                  "Simple memory trick: Leaves are possessive — they keep a copy of what they give. Internal nodes are generous — they give away the key entirely.",
                  "This asymmetry ensures: (1) every key is always findable at a leaf, and (2) internal nodes remain as compact as possible."
                ]
              },
              {
                title: "B+ Tree Range Query Optimization",
                body: [
                  "Range queries are where B+ Trees absolutely shine — this is the main reason databases choose them over B-Trees.",
                  "How to answer 'give me all records where price is between 50 and 100':",
                  "1. Search for 50 using routing keys — arrive at the leaf containing 50 in O(log_t n) steps.",
                  "2. Walk the corridor (follow 'next' pointers from leaf to leaf) collecting all keys ≤ 100.",
                  "3. Stop when a key exceeds 100.",
                  "Total time: O(log_t n + k) where k is the number of matching records.",
                  "With a B-Tree, you'd need to backtrack up and back down for every key in the range — much more traversal.",
                  "With a B+ Tree, after the initial search you literally just walk in a straight line through the corridor. For a query returning 10,000 records, this difference is dramatic."
                ]
              },
              {
                title: "Applications and Real-World Use",
                body: [
                  "B+ Trees are everywhere in the software world, even if you've never seen the source code:",
                  "• MySQL (InnoDB): Every table has a clustered B+ Tree index on its primary key. The actual row data lives in the leaves.",
                  "• PostgreSQL: Default index type for most queries.",
                  "• SQLite: The core storage format is a B+ Tree.",
                  "• MongoDB: Uses B+ Trees for secondary indexes.",
                  "• File systems (NTFS, ext4): Directory trees are B+ Trees.",
                  "Why such universal adoption? Three reasons: (1) point lookups are O(log_t n), (2) range scans are optimal O(log_t n + k), and (3) sequential access via leaf links matches how disk read-ahead works — the OS can prefetch the next leaf into cache while you're reading the current one."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment constructs a Segment Tree — a binary tree that pre-computes aggregate values (here: sum and minimum) over all possible contiguous subarrays of a given array. The core challenge is answering 'what is the sum of elements from index i to j?' in O(log n) time, even as individual elements change. You will build the tree bottom-up from the input array, implement a recursive range-sum query that intelligently skips irrelevant subtrees, and implement a point-update that propagates changes from the modified leaf back up to the root. You will also adapt the same structure for Range Minimum Query. By the end you should be able to: explain how a segment tree decomposes any range query into at most O(log n) precomputed segments, implement both sum and min variants, and compare segment trees against Fenwick trees and sparse tables for different use cases.",
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
                  "Imagine you manage a chain of 8 stores and you frequently need to know the total sales for any group of consecutive stores (e.g. stores 3 through 7). You could add them up each time — but if you answer a thousand such questions a day, that's slow.",
                  "A smarter idea: precompute the sales total for every possible contiguous group and store them in a tree. A Segment Tree does exactly this for any array.",
                  "The magic property: any range [L, R] can be decomposed into at most O(log n) precomputed segments from the tree, so you never need to add more than log₂(n) numbers to answer a query — regardless of how wide the range is."
                ]
              },
              {
                title: "Segment Tree Structure and Representation",
                body: [
                  "The tree is a complete binary tree built on top of the array:",
                  "• The root covers the entire array [0, n−1].",
                  "• Each internal node covering [L, R] has a left child covering [L, mid] and a right child covering [mid+1, R].",
                  "• Each leaf covers a single element [i, i].",
                  "• Each node stores the aggregate (sum, min, max, etc.) for its segment.",
                  "![Segment Tree](/segment-tree.webp)",
                  "We store the whole tree in a 1D array of size 4n (safe upper bound). For node at index i: left child is at 2i+1 and right child is at 2i+2. No pointers needed — it's all array math, just like a binary heap.",
                  "Building the tree takes O(n) time because each of the O(n) nodes is computed exactly once from its two children."
                ]
              },
              {
                title: "Segment Tree Operations — Detailed",
                body: [
                  "Build — O(n): Recursively split the array in half until reaching single elements (leaves). On the way back up, each parent stores sum = left.value + right.value.",
                  "Range Query — O(log n): Starting at the root with query [qL, qR], there are three situations:",
                  "• Node's segment is completely outside [qL, qR]: return 0 (identity for sum). Don't recurse.",
                  "• Node's segment is completely inside [qL, qR]: return the precomputed value. Don't recurse.",
                  "• Node's segment partially overlaps [qL, qR]: recurse into both children and combine their answers.",
                  "The key insight is that at most two nodes at each tree level can be partial overlaps — all others are either fully inside or fully outside. So total nodes visited ≤ 4 × log₂(n).",
                  "Point Update — O(log n): Change a leaf value, then update every ancestor on the path back to the root. Each ancestor is recomputed as the sum of its two children. At most log₂(n) nodes are updated."
                ]
              },
              {
                title: "Range Minimum Query (RMQ) Implementation",
                body: [
                  "The exact same tree structure works for minimum queries — just change the combine operation from '+' to 'Math.min()'.",
                  "• Each leaf stores arr[i].",
                  "• Each internal node stores min(left.min, right.min).",
                  "• Query: when both children overlap the query range, return the smaller of the two results.",
                  "• Update: after changing a leaf, walk up recomputing min from children.",
                  "This flexibility is what makes Segment Trees powerful — you can plug in any associative operation: sum, min, max, GCD, XOR, product modulo M, bitwise AND/OR, etc. The tree structure and query/update logic remain identical."
                ]
              },
              {
                title: "Segment Tree vs Fenwick Tree vs Sparse Table",
                body: [
                  "Think of these as three different tools in your toolbox — each best for a specific job:",
                  "Segment Tree — the Swiss Army knife:",
                  "• Works for any associative operation (sum, min, max, GCD, …).",
                  "• Supports both queries and updates in O(log n).",
                  "• With lazy propagation, even range updates (add 5 to all elements from index 3 to 7) are O(log n).",
                  "• Uses 4n memory. Slightly complex to implement.",
                  "Fenwick Tree (next experiment) — the minimalist:",
                  "• Only works for invertible operations (sum, XOR — not min/max).",
                  "• O(log n) query and update, just n+1 memory, very simple code.",
                  "• Great when you only need prefix sums.",
                  "Sparse Table — the speedster:",
                  "• Builds in O(n log n), answers queries in O(1).",
                  "• But static — no updates allowed. Best for fixed arrays with many queries.",
                  "• Works for idempotent operations (min, max, GCD) where combining a segment with itself doesn't change the answer."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment implements the Fenwick Tree (also called Binary Indexed Tree or BIT) — a beautifully compact data structure that answers prefix-sum queries and handles point updates, both in O(log n) time, using only a single array of size n+1. The trick is exploiting the binary representation of array indices to decide exactly which range each BIT cell is 'responsible for'. You will implement the LSB-based update (walk up by adding the lowest set bit) and the LSB-based query (walk down by removing the lowest set bit), then derive range sums as query(r) − query(l−1). By the end you should be able to: explain why the LSB trick works, implement both the O(n log n) and the O(n) build methods, and identify which problems are better solved by a Fenwick tree versus a Segment tree.",
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
                  "![Fenwick Tree Structure](/fenwick-tree.webp)",
                  "Imagine you have 8 piggy banks labelled 1 through 8. Instead of each piggy bank holding just its own coins, each one secretly holds the coins for a range of days:",
                  "• Piggy bank 1 (binary 001) holds only day 1's coins.",
                  "• Piggy bank 2 (binary 010) holds days 1–2.",
                  "• Piggy bank 3 (binary 011) holds only day 3.",
                  "• Piggy bank 4 (binary 100) holds days 1–4.",
                  "• Piggy bank 6 (binary 110) holds days 5–6.",
                  "• Piggy bank 8 (binary 1000) holds days 1–8.",
                  "The pattern: each bank's responsibility length equals its lowest set bit (LSB). Bank 6 is binary 110, LSB = 2, so it covers 2 days. Bank 4 is binary 100, LSB = 4, so it covers 4 days.",
                  "Now to find the total for days 1 through 6: open bank 6 (days 5–6) + bank 4 (days 1–4) = total. Just two piggy banks! This is O(log n) in general."
                ]
              },
              {
                title: "Understanding the BIT Structure",
                body: [
                  "More formally, the BIT array bit[1..n] is defined so that:",
                  "bit[i] = sum of the original array from index (i − LSB(i) + 1) to index i.",
                  "Where LSB(i) = i & (−i) in binary — the value of i's lowest set bit.",
                  "![Fenwick tree array structure](/fenwick_tree_2.webp)",
                  "Let's verify with a concrete example for i = 6 (binary 110):",
                  "LSB(6) = 6 & (−6) = 2, so bit[6] stores arr[5] + arr[6] — a range of length 2, starting 2 positions back.",
                  "For i = 4 (binary 100): LSB = 4, so bit[4] stores arr[1] + arr[2] + arr[3] + arr[4] — a range of length 4.",
                  "This clever assignment ensures any prefix sum can be assembled by adding at most log₂(n) BIT entries."
                ]
              },
              {
                title: "Prefix Sum Query Algorithm",
                body: [
                  "To compute the prefix sum from index 1 to i, keep stripping the lowest set bit from i and collect the BIT values:",
                  "sum = 0",
                  "while i > 0: sum += bit[i]; i = i − LSB(i)",
                  "Example — prefix sum up to index 7 (binary 111):",
                  "• bit[7] covers arr[7] (LSB=1). Remove LSB: i = 7−1 = 6.",
                  "• bit[6] covers arr[5]+arr[6] (LSB=2). Remove LSB: i = 6−2 = 4.",
                  "• bit[4] covers arr[1]+arr[2]+arr[3]+arr[4] (LSB=4). Remove LSB: i = 4−4 = 0. Stop.",
                  "Total = arr[7] + arr[5]+arr[6] + arr[1]+arr[2]+arr[3]+arr[4] = sum of arr[1..7]. Three steps, not seven!"
                ]
              },
              {
                title: "Point Update Algorithm",
                body: [
                  "When arr[i] changes by +delta, all BIT cells whose coverage range includes index i must be updated. Those cells are found by walking up: keep adding the LSB.",
                  "while i ≤ n: bit[i] += delta; i = i + LSB(i)",
                  "Example — update arr[3] by +5 (n = 8):",
                  "• i = 3 (binary 011): update bit[3]. Add LSB(3) = 1 → i = 4.",
                  "• i = 4 (binary 100): update bit[4]. Add LSB(4) = 4 → i = 8.",
                  "• i = 8 (binary 1000): update bit[8]. Add LSB(8) = 8 → i = 16 > 8. Stop.",
                  "Only three updates needed to propagate a change to all responsible cells — O(log n)."
                ]
              },
              {
                title: "Building a Fenwick Tree",
                body: [
                  "Method 1 — Simple but O(n log n): Start with all zeros in the BIT, then call update(i, arr[i]) for each i from 1 to n. Each update is O(log n), so total is O(n log n).",
                  "Method 2 — Clever O(n) construction:",
                  "Copy arr into bit (1-indexed). Then for i from 1 to n, let j = i + LSB(i); if j ≤ n, do bit[j] += bit[i].",
                  "This works because it propagates each cell's contribution to exactly the next cell in the 'responsibility chain' — like filling the piggy banks from the smallest to the largest.",
                  "For most competitive-programming problems, Method 1 is fast enough and easier to remember. For very large n where build time matters, use Method 2."
                ]
              },
              {
                title: "Fenwick Tree Applications",
                body: [
                  "Fenwick trees are often the right tool when:",
                  "• You only need sum (or XOR) queries — not min/max.",
                  "• Code simplicity and memory efficiency matter more than flexibility.",
                  "• The operation is invertible (so range sum = prefix(r) − prefix(l−1) works).",
                  "Common use cases:",
                  "• Counting inversions in an array (classic interview/competitive problem).",
                  "• Frequency tables with rank queries (find the kth smallest element after updates).",
                  "• 2D Fenwick trees for 2D range sum queries.",
                  "Limitations: Cannot do range minimum/maximum queries (min is not invertible — you cannot recover min(1..r) − min(1..l−1) = min(l..r)). For those, use a Segment Tree."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment constructs a Min-Heap — the classic array-based implementation of a Priority Queue. A Min-Heap is a complete binary tree stored compactly in an array where every parent is smaller than or equal to its children, placing the globally minimum element at index 0 at all times. You will implement: the array-index formulas for navigating parent/child relationships without pointers, bubbleUp (used after insertion to restore the heap property from the bottom), bubbleDown / heapify (used after extraction to restore from the top), and the O(n) buildHeap algorithm that converts an unsorted array into a valid heap using only bubbleDown calls. By the end you should be able to: implement a full priority queue, trace the heap state after each insert and extract, implement Heap Sort, and explain why buildHeap is O(n) even though it appears to be O(n log n) at first glance.",
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
                  "![Binary Heap Structure](/binary_priority.webp)",
                  "Imagine a hospital emergency room that must always treat the most critical patient next. Patients keep arriving and doctors keep finishing — so the 'who's next' list must update in real time.",
                  "A Min-Heap is the perfect data structure for this. It's like a tournament bracket where: (1) the winner (smallest priority number = most critical) is always at the top, (2) adding a new patient takes O(log n) time, and (3) discharging the top patient also takes O(log n) time.",
                  "The key insight is that a heap is a complete binary tree (perfectly filled except possibly the last row, filled left-to-right), which means it can be stored in a plain array without any pointers."
                ]
              },
              {
                title: "Array Representation of Binary Heap",
                body: [
                  "For a 0-indexed array, the parent-child relationships are pure arithmetic:",
                  "• Parent of node at index i: Math.floor((i − 1) / 2)",
                  "• Left child of node at index i: 2i + 1",
                  "• Right child of node at index i: 2i + 2",
                  "So the root is always at index 0, its children are at 1 and 2, their children are at 3, 4, 5, 6, and so on. No pointer chasing — just arithmetic. This is what makes heaps cache-friendly and memory-efficient.",
                  "For a 1-indexed array (common in competitive programming): parent = i/2, left = 2i, right = 2i+1. Both conventions work; 0-indexed matches JavaScript/Python arrays naturally."
                ]
              },
              {
                title: "Heap Property",
                body: [
                  "Min-Heap Rule: Every node must be smaller than or equal to both its children. This means the root is the global minimum.",
                  "Max-Heap Rule: Every node must be greater than or equal to both its children. The root is the global maximum.",
                  "The rule applies locally at every parent-child pair — not globally across siblings. Two siblings can be in any relative order. This 'local only' rule is why heaps are much faster to maintain than fully sorted arrays."
                ]
              },
              {
                title: "Core Operations — Detailed",
                body: [
                  "Insert — O(log n): Add the new element at the end of the array (next available leaf position). Then bubble it up: repeatedly swap with parent while the new element is smaller than its parent. At most log₂(n) swaps — one per level.",
                  "Extract-Min — O(log n): The minimum is at index 0 — grab it. To fill the gap: move the last element in the array to index 0 (the root). Now bubble it down: repeatedly swap with the smaller of its two children while it is larger than either child. At most log₂(n) swaps.",
                  "Peek — O(1): Just return heap[0]. No modification needed.",
                  "Build-Heap — O(n): Given an unsorted array, call bubbleDown on every non-leaf node starting from the last one (index n/2 − 1) and going up to the root. This is O(n) — not O(n log n) — because most nodes are near the bottom where bubbleDown travels only a short distance. The math shows total work = O(n)."
                ]
              },
              {
                title: "Heap Sort Algorithm",
                body: [
                  "A max-heap can sort an array in-place using O(n log n) time and O(1) extra space:",
                  "Phase 1 — Build a Max-Heap: Call buildHeap on the array. O(n).",
                  "Phase 2 — Extract max n−1 times: Swap the root (max) with the last element. The last position is now 'locked in' as sorted. Reduce the heap size by 1 and bubbleDown the new root. Repeat.",
                  "After n−1 extractions, the array is sorted in ascending order.",
                  "Why not just use extractMin repeatedly and write to a new array? That uses O(n) extra space. In-place heap sort avoids that by using a max-heap and sorting backward.",
                  "Heap Sort is not as cache-friendly as QuickSort in practice (because bubbleDown jumps around memory), so QuickSort is usually faster in practice despite the same O(n log n) worst-case guarantee."
                ]
              },
              {
                title: "Priority Queue Applications",
                body: [
                  "Heaps are everywhere because priority queues are everywhere:",
                  "• Dijkstra's Algorithm: 'Which unvisited city has the shortest known distance?' Extract-min from a heap.",
                  "• Prim's MST: 'Which edge has the smallest weight that connects the tree to a non-tree vertex?' Extract-min.",
                  "• Huffman Coding: 'Which two characters appear least frequently?' Merge them using a min-heap.",
                  "• A* Pathfinding: 'Which node has the best f = g + h score?' Extract-min.",
                  "• OS Process Scheduling: 'Which process has the highest priority?' Extract-max.",
                  "In all these cases the heap lets you efficiently find and remove the best option while new options keep arriving — exactly the hospital emergency room scenario.",
                  "Language built-ins: C++ priority_queue (max-heap by default), Java PriorityQueue (min-heap), Python heapq module (min-heap)."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment implements the Disjoint Set Union (DSU) — also called Union-Find — a specialised data structure that tracks which elements belong to the same group and merges groups together, both operations in near-constant amortised time. You will implement the parent array (each element initially points to itself), the find operation with path compression (which flattens the tree so all nodes point directly to the root), and the union operation with union-by-rank (which attaches the shallower tree under the deeper one, keeping trees flat). Combining both optimisations yields an amortised time of O(α(n)) per operation, where α is the inverse Ackermann function — effectively constant for all practical inputs. By the end you should be able to: implement DSU from scratch, explain why path compression is correct, count connected components, and apply DSU to detect cycles in Kruskal's MST algorithm.",
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
                  "![DSU](/union_find.webp)",
                  "Imagine a city where people belong to different friend groups. Two strangers can be introduced by a mutual friend (union), and you can quickly check whether two people are in the same social circle (find).",
                  "DSU manages exactly this: a collection of non-overlapping groups (disjoint sets). Each group has one representative (the root). To check if two people are in the same group, check if they share a representative. To merge two groups, make one group's representative point to the other.",
                  "The naive approach — just tracking who's in which group — makes one operation O(n). DSU's genius is doing both find and union in nearly O(1) using two simple tricks."
                ]
              },
              {
                title: "Basic Implementation — Parent Array",
                body: [
                  "Store a parent[] array where parent[i] is element i's parent in the group tree. Initially every element is its own parent (its own group):",
                  "parent[i] = i for all i.",
                  "Find(x) without optimisation: keep following parent pointers until you reach the root (where parent[x] == x). This is like climbing a tree to find the boss — slow for a deep tree.",
                  "Union(x, y) without optimisation: find both roots, then make one root point to the other. Now both groups share the same root.",
                  "Problem: repeated unions can create a tall, skinny tree. Finding the root of the deepest element takes O(n) — no better than a linked list."
                ]
              },
              {
                title: "Union by Rank Optimization",
                body: [
                  "The fix: always attach the shorter tree under the taller tree — never the other way around.",
                  "Keep a rank[] array (approximate height). Initially rank[i] = 0.",
                  "Union rule: if rank[rootX] < rank[rootY], attach X's tree under Y (Y stays root). If rank[rootX] > rank[rootY], attach Y under X. If equal, pick either and increment the winner's rank.",
                  "Why does this help? After n unions with this rule, the maximum tree height is at most log₂(n). So find is O(log n) — already much better than O(n).",
                  "Think of it like a company merger: the smaller company joins the larger company's org chart, not the other way around. This keeps the org chart shallow."
                ]
              },
              {
                title: "Path Compression Optimization",
                body: [
                  "Union by rank gives O(log n). Path compression gives the extra speedup to near-O(1).",
                  "The idea: while climbing to the root during find(x), why not rewire every node we visit to point directly to the root? The next time anyone calls find on those nodes, it'll be instant.",
                  "Recursive implementation: if parent[x] != x, then recursively find the root, and before returning, set parent[x] = root. On the way back from the recursion, every node on the path gets updated.",
                  "Example: if find(5) has to climb 5 → 3 → 1 → root, after path compression: parent[5] = root, parent[3] = root, parent[1] = root. Next call to find(5) is one hop.",
                  "The path doesn't get compressed on the first call — but after a few calls, the tree becomes nearly flat. This amortized benefit is what makes DSU so fast over many operations."
                ]
              },
              {
                title: "Time Complexity — The Inverse Ackermann Function",
                body: [
                  "With both optimisations together (union by rank + path compression), the amortised cost per operation is O(α(n)), where α is the inverse Ackermann function.",
                  "What is α(n)? The Ackermann function A(k) grows absurdly fast: A(1)=2, A(2)=4, A(3)=16, A(4)=65536, A(5) = a number with 19,728 digits. Its inverse α(n) is effectively the number of times you'd need to apply 'log' to get n down to 1. For any n ≤ 10^80 (more atoms than in the observable universe), α(n) ≤ 4.",
                  "In practice: α(n) = 4 always. So DSU operations are essentially O(1) — faster than O(log n) structures for all real-world data sizes."
                ]
              },
              {
                title: "Applications of Union-Find",
                body: [
                  "DSU solves any problem that boils down to: 'are these two things connected, and merge these two groups'.",
                  "• Kruskal's MST: Sort edges by weight, add each edge if its endpoints are in different components (union them). Skip if already connected (would create a cycle). DSU makes this O(E log E) total.",
                  "• Connected Components: Run DSU on all edges. Count how many distinct roots remain.",
                  "• Dynamic Connectivity: Handle a stream of 'connect A and B' and 'are A and B connected?' queries efficiently.",
                  "• Image Processing: Label connected pixels in a binary image (flood-fill alternative).",
                  "• Percolation Simulation: Does water flow from top to bottom through a random grid?",
                  "Limitation: DSU supports only union (merge) — it cannot split a group back into two. For that, you'd need a different (much harder) data structure."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment implements a hash table using open addressing with linear probing — a collision-resolution strategy that stores all entries directly in the array without any linked lists. When two keys hash to the same slot, linear probing scans forward one slot at a time until it finds an empty position. You will implement: a modulo-based hash function, insertion with linear probing, search that follows the probe sequence until finding the key or an empty slot, deletion using tombstone markers (a deleted-but-not-empty sentinel that keeps the probe chain intact), and dynamic resizing that doubles capacity and rehashes when the load factor exceeds 0.7. By the end you should be able to: explain why tombstones are necessary, trace the probe sequence for any insertion or search, identify when clustering degrades performance, and compare linear probing with quadratic probing and double hashing.",
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
                  "Imagine a hotel with 100 rooms. When a guest arrives, the receptionist computes their room number from their name: 'Smith' → room 42. But what if another guest's name also maps to room 42? That's a collision.",
                  "There are two ways to handle this:",
                  "Chaining — put a fold-out bed in room 42. Every guest whose name maps to 42 shares that room. Simple, but wastes memory on empty rooms and pointer overhead.",
                  "Open Addressing — walk down the corridor and take the next available room. All guests are in the main hotel (array) — no extra beds needed. More cache-friendly because data is contiguous, but the hotel can never be 100% full."
                ]
              },
              {
                title: "Linear Probing — Mechanism and Analysis",
                body: [
                  "Linear probing is the simplest 'walk down the corridor' strategy. If room h(k) is taken, try h(k)+1, then h(k)+2, and so on, wrapping around at the end.",
                  "Probe sequence: slot = (h(k) + i) mod M, for i = 0, 1, 2, …",
                  "An Example includes: ",
                  "Let us assume the hash funtion is key%7 i.e, h(k)=(k mod7)",
                  "![Linear Probing Example](/linear_probing.webp)",
                  "The big problem: primary clustering. Once a run of occupied slots forms, new keys that hash anywhere in that run extend it further. A run of 10 occupied slots is 10× more likely to grow than a single occupied slot.",
                  "Performance (load factor α = n/M):",
                  "• Successful search: roughly (1 + 1/(1−α)) / 2 probes on average.",
                  "• At α = 0.5: ~1.5 probes. At α = 0.9: ~5.5 probes. At α = 0.99: ~50 probes!",
                  "Rule of thumb: keep α < 0.7 for acceptable performance. Resize when this is exceeded."
                ]
              },
              {
                title: "Quadratic Probing and Double Hashing",
                body: [
                  "Linear probing's clustering problem can be reduced with smarter probe sequences:",
                  "Quadratic Probing: probe slot = (h(k) + c₁i + c₂i²) mod M. Jumps spread out quadratically, reducing primary clustering. But 'secondary clustering' can still occur when two keys have the same initial hash.",
                  "![Quadratic Probing](/quadratic_probing.webp)",
                  "Double Hashing: probe slot = (h₁(k) + i × h₂(k)) mod M. Each key gets its own unique probe sequence (determined by h₂). Eliminates both primary and secondary clustering. This is the best-performing open addressing strategy.",
                  "Typical double hash: h₁(k) = k mod M, h₂(k) = 1 + (k mod (M−1)), where M is prime. The '1 +' ensures h₂ is never 0 (which would cause infinite looping at the same slot).",
                  "Trade-off: double hashing gives the best distribution but computes two hash functions; linear probing is simpler and has better CPU cache performance despite clustering."
                ]
              },
              {
                title: "Deletion in Open Addressing — Tombstones",
                body: [
                  "Deletion is the trickiest part of open addressing. You cannot simply mark a slot as empty — that would break search!",
                  "Example: Insert A at slot 3, then B collides and goes to slot 4. Now delete A (slot 3 → empty). Search for B: hash to 3, see 'empty', stop. B is 'lost' even though it's at slot 4!",
                  "Solution: Tombstones (lazy deletion). Instead of marking slot 3 as 'empty', mark it as 'deleted'. The difference:",
                  "• During search: treat tombstone as occupied (keep probing past it).",
                  "• During insertion: treat tombstone as empty (you can insert here).",
                  "This preserves the probe chain for existing keys while freeing the slot for future insertions.",
                  "Downside: tombstones accumulate over many deletions, making probe chains longer. Periodic full rehashing (rebuild the table from scratch, skipping tombstones) cleans them up."
                ]
              },
              {
                title: "Dynamic Resizing",
                body: [
                  "When the load factor (α = number of entries / table size) exceeds 0.7, performance degrades rapidly. The fix: resize.",
                  "Resize algorithm:",
                  "1. Allocate a new array of size ≈ 2 × current size (choose a prime near 2× for best distribution).",
                  "2. Rehash every existing key (skip tombstones — they are no longer needed in the new table).",
                  "3. Replace the old array with the new one.",
                  "Cost: O(n) to rehash all n entries. But resizing is rare — you only need to do it when size doubles. Amortised over all insertions, the cost per insert is O(1).",
                  "Why prime sizes? Many hash functions use modulo. If the table size shares factors with the keys, some slots never get used. A prime size ensures keys are spread evenly.",
                  "Similarly, when the table becomes very empty (e.g. after many deletions, α < 0.1), you can shrink to save memory using the same rehash process."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment implements Cuckoo Hashing — an open-addressing scheme that achieves O(1) worst-case lookup by guaranteeing that every key lives in exactly one of two possible positions across two hash tables. When a new key needs to go to a position that's already taken, it 'kicks out' the occupant, who then must move to its own alternative position — and this may cascade. You will implement: two independent hash functions, a lookup that checks only two positions, an insertion that performs the kicking loop (terminating when a free slot is found or a cycle is detected), and a rehash triggered on cycle detection. By the end you should be able to: trace any cuckoo insertion including cycles, explain why lookup is always O(1) regardless of load, and contrast cuckoo hashing with linear probing and chaining.",
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
                  "![Cuckoo Hashing](/cuckoo_hashing.webp)",
                  "The cuckoo bird is famous for laying its egg in another bird's nest, pushing out the existing egg. Cuckoo hashing works the same way.",
                  "Every key has exactly two possible homes — one in table T1 (at position h1(key)) and one in table T2 (at position h2(key)). The key must be in one of these two spots. This is why lookup is O(1) worst-case: you check exactly two positions, done.",
                  "When inserting a new key and both homes are occupied, the key evicts the current occupant from T1, who then must move to their T2 home, possibly evicting someone else, and so on — like a chain of nesting birds kicking each other out."
                ]
              },
              {
                title: "Cuckoo Hashing Operations",
                body: [
                  "Lookup — O(1) worst-case (the star feature!):",
                  "  Check T1[h1(key)]. If it matches, found. Otherwise check T2[h2(key)]. If it matches, found. Otherwise, not present.",
                  "  Always exactly 2 comparisons — no probing, no chain-following.",
                  "Insertion — amortised O(1):",
                  "  Place the new key into T1[h1(key)]. If that slot was empty, done. Otherwise:",
                  "  • Evict the occupant y from T1[h1(key)].",
                  "  • Try to place y at T2[h2(y)]. If empty, done. Otherwise evict again.",
                  "  • Keep alternating between T1 and T2 until a free slot is found.",
                  "  • If after ~log(n) steps no free slot is found, a cycle has formed — rehash.",
                  "Deletion — O(1): Look up the key (two checks), set that slot to empty."
                ]
              },
              {
                title: "Cycle Detection and Rehashing",
                body: [
                  "A cycle occurs when the kicking loop visits the same slot twice without finding an empty position. Think of musical chairs where there are no empty chairs — the music never stops.",
                  "In practice: if the insertion loop runs more than a threshold number of steps (typically ~log(n) or a small constant like 100), we declare a cycle.",
                  "When a cycle is detected, the entire table must be rehashed:",
                  "1. Pick new hash functions (or increase table size).",
                  "2. Reinsertion of all existing keys into the new table.",
                  "3. Try the failed insertion again.",
                  "Probability of a cycle: With load factor α < 0.5, the probability that a random insertion causes a cycle is O(1/n). So amortized over n insertions, rehashing happens O(1/n) × n = O(1) times — negligible cost."
                ]
              },
              {
                title: "Analysis of Cuckoo Hashing",
                body: [
                  "Load factor constraint: Standard cuckoo hashing with two tables requires α < 0.5 (each table less than 50% full). This is less space-efficient than chaining or linear probing, which can operate at α ≈ 0.7–0.9.",
                  "Time complexity:",
                  "• Lookup: O(1) worst-case — always two checks.",
                  "• Insertion: O(1) amortized expected — average kicking chain is short.",
                  "• Deletion: O(1) — just two checks and a slot clear.",
                  "Space: 2n slots for n keys (twice the array, but no pointer overhead like chaining).",
                  "Variants to improve space efficiency:",
                  "• d-ary cuckoo hashing: use d > 2 hash functions. With d = 3, load factor can reach 91%!",
                  "• Cuckoo filter: a space-efficient probabilistic version for membership queries (like Bloom filter but supports deletions)."
                ]
              },
              {
                title: "Comparison with Other Hashing Techniques",
                body: [
                  "Think of these as three security checkpoints:",
                  "Chaining checkpoint: Each lane has its own waiting line. Fast average time, works up to high occupancy, but lines (linked lists) use extra memory and are cache-unfriendly.",
                  "Linear probing checkpoint: One line, you just shift forward until you find a free scanner. Cache-friendly (sequential memory access) but lines bunch up at busy scanners (clustering).",
                  "Cuckoo hashing checkpoint: You have exactly two possible scanners. The guard checks both immediately — O(1) guaranteed. But the airport can never be more than 50% full (two-table constraint).",
                  "Use cuckoo hashing when: guaranteed O(1) lookup is required (hardware implementations like network routers, IP lookup tables), or when deletions are frequent (no tombstone issues).",
                  "Use linear probing when: cache performance matters most, memory is tight, and the dataset is dense.",
                  "Use chaining when: simplicity and high load factors are priorities."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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
              text: "This experiment implements a Trie (Prefix Tree) — a tree where each path from root to a marked node spells out a stored word, character by character. Unlike hash tables or BSTs that compare whole keys, a Trie decomposes each string into its individual characters and shares common prefixes among all words that begin with them. You will build: a TrieNode with a children array of 26 slots (one per lowercase letter) and an isEndOfWord boolean, insert that creates nodes on-demand for each character, search that traverses the path and checks the end-of-word marker, startsWith that returns true if any stored word begins with a given prefix, and delete that cleans up unused nodes after removal. By the end you should be able to: trace any insert/search/delete through the node structure, explain the space advantage of shared prefixes, and describe how autocomplete and spell-check systems use Tries.",
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
                  "Imagine a physical dictionary where each page has 26 tabs — one for each letter. Flip to tab 'C', and that page has 26 more tabs for the second letter, and so on. To look up 'cat', you flip: C → A → T → (end marker = valid word). Finding 'car' follows the same C → A path but ends at R instead of T.",
                  "This is exactly how a Trie works. Words that share a prefix share tree nodes for that prefix. 'cat', 'car', and 'card' all share the path C → A.",
                  "The name 'Trie' comes from 'retrieval', emphasising its purpose. Unlike a hash table (which can tell you 'cat' exists) or a BST (which can sort 'cat' among other words), a Trie can also tell you 'give me all words starting with ca' — an autocomplete query."
                ]
              },
              {
                title: "Trie Node Structure",
                body: [
                  "![Trie Structure](/trie_structure.webp)",
                  "Each Trie node is very simple:",
                  "• children[26]: An array of 26 pointers, one for each letter a–z. children[0] = pointer for 'a', children[1] = 'b', …, children[25] = 'z'. Most are null — only the letters that actually appear as the next character in some word get a node.",
                  "• isEndOfWord: A boolean flag. True means 'a valid word ends at this node'. False means this node is only part of a prefix.",
                  "The root node has no letter — it just holds 26 possible first letters.",
                  "For alphabets beyond a–z (e.g. Unicode), replace the array with a hash map: children = Map<char, TrieNode>. Same logic, more flexible."
                ]
              },
              {
                title: "Trie Operations — Detailed",
                body: [
                  "Insert(word): Walk from the root, one character at a time. If the next node doesn't exist, create it. After all characters, set isEndOfWord = true on the final node.",
                  "Search(word): Walk from the root, one character at a time. If any node is missing, the word is not in the trie — return false. If you reach the end of the word, return the isEndOfWord flag (true only if a complete word was inserted, not just a prefix).",
                  "StartsWith(prefix): Same as search, but don't check isEndOfWord at the end. If you reach the end of the prefix without a missing node, return true.",
                  "Example is as follows:",
                  "![Trie example](/trie.webp)",
                  "Delete(word): Recursively traverse to the word's end, set isEndOfWord = false. On the way back up, delete nodes that are now unused — a node is deletable if it has no children and is not an end-of-word for any other word. This keeps the trie compact after deletions."
                ]
              },
              {
                title: "Time and Space Complexity",
                body: [
                  "Time: All operations (insert, search, startsWith, delete) are O(m) where m is the length of the string. This is independent of n, the number of stored strings — adding a million words to the trie doesn't slow down searching for 'cat' at all.",
                  "For comparison: BST search is O(m × log n) (comparing whole strings, each comparison costs O(m)); hash table is O(m) on average but can't do prefix queries.",
                  "Space: In the worst case (all words share no prefixes), O(total_characters × 26) nodes. In practice, shared prefixes mean much less. For a dictionary of 100,000 English words averaging 7 characters, a Trie typically uses far fewer nodes than 700,000 because most words share prefixes like 'pre-', 'un-', '-ing', etc.",
                  "Memory trick: Use a hash map instead of children[26] to save memory when the alphabet is large or the trie is sparse. The time complexity stays the same."
                ]
              },
              {
                title: "Trie Applications",
                body: [
                  "• Autocomplete: When you type 'sta' into a search bar and see 'stack', 'start', 'star' — the search engine is doing a Trie prefix traversal, collecting all words under the 's' → 't' → 'a' node.",
                  "• Spell Checking: Check if a typed word exists in the Trie. If not, find the closest existing words by exploring nearby branches.",
                  "• IP Routing (Longest Prefix Match): IP addresses are like strings of bits. Routers find the most specific route by doing a longest prefix match on a Trie of IP routes.",
                  "• Word Games: Boggle and Scrabble solvers store the dictionary in a Trie and explore board paths, pruning any path that doesn't match a Trie prefix.",
                  "• DNA Sequence Databases: Gene sequences are stored in Tries for fast pattern matching.",
                  "Variants: Compressed Trie (Radix Tree) merges nodes that have only one child, saving memory. Suffix Tree stores all suffixes of a string for O(m) substring search — used by Unix grep and text editors."
                ]
              },
              {
                title: "Trie vs Hash Table vs BST",
                body: [
                  "The three contenders for string storage each have their sweet spot:",
                  "Hash Table wins when: you only need exact-match lookups ('does this word exist?'), and keys are uniformly distributed. O(m) average per lookup, no ordering, no prefix queries.",
                  "BST wins when: you need sorted order or range queries on whole strings, and string lengths are long (so O(m) per comparison is expensive). O(m log n) per lookup.",
                  "Trie wins when: you need prefix queries (autocomplete, spell-check), the alphabet is small and fixed (26 letters, DNA bases), strings share many common prefixes, or you need O(m) guaranteed lookup independent of dictionary size.",
                  "Simple decision rule: If someone asks 'what do all words starting with X have in common?' — use a Trie. If they just ask 'does X exist?' — a hash table is simpler."
                ]
              }
            ],
            pretest: [],
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
            posttest: [],
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