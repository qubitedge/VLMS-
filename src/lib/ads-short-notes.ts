// AdvancedDataStructureNotes.tsx
export const adsShortNotes = `ADVANCED DATA STRUCTURES - SHORT NOTES
(As per JNTUGV / CEV R23 Syllabus)


INTRODUCTION TO ADVANCED DATA STRUCTURES

Data Structures are specialized formats for organizing, processing, retrieving, and storing data. While basic structures (arrays, linked lists, stacks, queues) solve fundamental problems, ADVANCED DATA STRUCTURES are optimized for specific scenarios involving large datasets, real-time constraints, or complex query patterns.

Why Advanced Data Structures over Basic Ones?

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20 tracking-wide">Basic Structure Limitation</th><th class="p-3 border border-cyan/20 tracking-wide">Advanced Solution</th></tr></thead><tbody class="divide-y divide-cyan/10"><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Unbalanced BST becomes O(n) for search</td><td class="p-3 border border-cyan/20">AVL / Red-Black Trees guarantee O(log n)</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Array insertion/deletion is O(n)</td><td class="p-3 border border-cyan/20">Skip Lists provide O(log n) probabilistic operations</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Linear search in prefix matching is O(n×L)</td><td class="p-3 border border-cyan/20">Trie gives O(L) search for any prefix</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Range queries on array require O(n) scan</td><td class="p-3 border border-cyan/20">Segment Tree answers range queries in O(log n)</td></tr><tr class="hover:bg-cyan/5 transition-colors"><td class="p-3 border border-cyan/20 font-medium">Disk I/O for large databases is too slow</td><td class="p-3 border border-cyan/20">B-Trees minimize disk accesses with high fanout</td></tr></tbody></table>

Course Outcomes Covered:
1. Demonstrate proficiency in using linear and non-linear data structures for problem-solving
2. Analyze algorithm performance using complexity measures, recurrence relations, and amortized analysis
3. Implement balanced trees and advanced heaps in algorithm design
4. Design efficient indexing using tries, hashing, and suffix structures
5. Solve real-world problems using graph algorithms (MST, Shortest Path)

UNIT I: INTRODUCTION & ALGORITHM ANALYSIS

OVERVIEW OF BASIC DATA STRUCTURES (Required Foundation)

Before diving into advanced structures, master these fundamentals. Every advanced structure optimizes one or more of these basic operations.

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Structure</th><th class="p-3 border border-cyan/20">Core Principle</th><th class="p-3 border border-cyan/20">Time (Avg)</th><th class="p-3 border border-cyan/20">Memory</th><th class="p-3 border border-cyan/20">Key Use Case</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Array</td><td class="p-3 border border-cyan/20">Contiguous memory, direct indexing</td><td class="p-3 border border-cyan/20">Access: O(1)<br/>Search: O(n)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Matrix storage, lookup tables</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Stack (LIFO)</td><td class="p-3 border border-cyan/20">Push/Pop on single end (Top)</td><td class="p-3 border border-cyan/20">Push/Pop/Top: O(1)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Function calls, undo/redo, expression evaluation</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Queue (FIFO)</td><td class="p-3 border border-cyan/20">Enqueue at Rear, Dequeue from Front</td><td class="p-3 border border-cyan/20">Enqueue/Dequeue: O(1)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Task scheduling, BFS, printer spooling</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Singly Linked List</td><td class="p-3 border border-cyan/20">Nodes with data + next pointer</td><td class="p-3 border border-cyan/20">Insert/Delete at head: O(1)<br/>Search: O(n)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Dynamic memory, polynomial representation</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Doubly Linked List</td><td class="p-3 border border-cyan/20">Nodes with prev + next pointers</td><td class="p-3 border border-cyan/20">Delete given node: O(1)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Browser history, LRU cache</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Binary Tree</td><td class="p-3 border border-cyan/20">Hierarchical, ≤2 children per node</td><td class="p-3 border border-cyan/20">Search/Insert/Delete: O(n) worst, O(log n) avg</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Expression parsing, file system, Huffman coding</td></tr></tbody></table>


TIME & SPACE COMPLEXITY ANALYSIS

Big O Notation defines the UPPER BOUND of an algorithm's growth rate. It answers: "How does runtime scale as input size approaches infinity?"

Common Complexities from Best to Worst:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Complexity</th><th class="p-3 border border-cyan/20">Name</th><th class="p-3 border border-cyan/20">n=10</th><th class="p-3 border border-cyan/20">n=100</th><th class="p-3 border border-cyan/20">n=1,000,000</th><th class="p-3 border border-cyan/20">Example Algorithm</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(1)</td><td class="p-3 border border-cyan/20">Constant</td><td class="p-3 border border-cyan/20">1</td><td class="p-3 border border-cyan/20">1</td><td class="p-3 border border-cyan/20">1</td><td class="p-3 border border-cyan/20">Array access, hash table lookup</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(log n)</td><td class="p-3 border border-cyan/20">Logarithmic</td><td class="p-3 border border-cyan/20">3.3</td><td class="p-3 border border-cyan/20">6.6</td><td class="p-3 border border-cyan/20">20</td><td class="p-3 border border-cyan/20">Binary search, balanced BST operations</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(n)</td><td class="p-3 border border-cyan/20">Linear</td><td class="p-3 border border-cyan/20">10</td><td class="p-3 border border-cyan/20">100</td><td class="p-3 border border-cyan/20">1,000,000</td><td class="p-3 border border-cyan/20">Linear search, array traversal</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(n log n)</td><td class="p-3 border border-cyan/20">Linearithmic</td><td class="p-3 border border-cyan/20">33</td><td class="p-3 border border-cyan/20">664</td><td class="p-3 border border-cyan/20">20,000,000</td><td class="p-3 border border-cyan/20">Merge sort, heap sort, segment tree build</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(n²)</td><td class="p-3 border border-cyan/20">Quadratic</td><td class="p-3 border border-cyan/20">100</td><td class="p-3 border border-cyan/20">10,000</td><td class="p-3 border border-cyan/20">10¹²</td><td class="p-3 border border-cyan/20">Bubble sort, nested loops, naive LCS</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">O(2ⁿ)</td><td class="p-3 border border-cyan/20">Exponential</td><td class="p-3 border border-cyan/20">1,024</td><td class="p-3 border border-cyan/20">1.27×10³⁰</td><td class="p-3 border border-cyan/20">Impossible</td><td class="p-3 border border-cyan/20">Recursive Fibonacci (naive), subset sum</td></tr></tbody></table>

Space Complexity measures extra memory an algorithm needs beyond the input itself.

RECURRENCE RELATIONS & MASTER THEOREM

Recurrence relations mathematically define algorithm runtime using itself on smaller inputs: T(n) = aT(n/b) + f(n)

Components:
- a = number of subproblems (≥ 1)
- n/b = size of each subproblem (b > 1)
- f(n) = cost of dividing and combining

Master Theorem Formula:
If T(n) = aT(n/b) + O(nᵈ) where a ≥ 1, b > 1, d ≥ 0, then:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Case</th><th class="p-3 border border-cyan/20">Condition</th><th class="p-3 border border-cyan/20">Solution</th><th class="p-3 border border-cyan/20">Classic Example</th><th class="p-3 border border-cyan-20">Result</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">1</td><td class="p-3 border border-cyan/20">d < logₐb</td><td class="p-3 border border-cyan/20">T(n) = O(n^{logₐb})</td><td class="p-3 border border-cyan-20">Binary Search<br/>T(n) = T(n/2) + O(1)</td><td class="p-3 border border-cyan-20">a=1, b=2, d=0<br/>0 < log₂1? 0<0? FALSE → Wait! log₂1 = 0, so d = logₐb → Case 2</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">2</td><td class="p-3 border border-cyan/20">d = logₐb</td><td class="p-3 border border-cyan/20">T(n) = O(nᵈ log n)</td><td class="p-3 border border-cyan-20">Merge Sort<br/>T(n) = 2T(n/2) + O(n)</td><td class="p-3 border border-cyan-20">a=2, b=2, d=1<br/>log₂2 = 1 = d → O(n log n)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">2</td><td class="p-3 border border-cyan-20">d = logₐb</td><td class="p-3 border border-cyan/20">T(n) = O(nᵈ log n)</td><td class="p-3 border border-cyan-20">Binary Search<br/>T(n) = T(n/2) + O(1)</td><td class="p-3 border border-cyan-20">a=1, b=2, d=0<br/>log₂1 = 0 = d → O(log n)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">3</td><td class="p-3 border border-cyan/20">d > logₐb</td><td class="p-3 border border-cyan/20">T(n) = O(nᵈ)</td><td class="p-3 border border-cyan-20">T(n) = 2T(n/2) + O(n²)</td><td class="p-3 border border-cyan/20">a=2, b=2, d=2<br/>2 > log₂2=1 → O(n²)</td></tr></tbody></table>

AMORTIZED ANALYSIS

Amortized analysis gives the AVERAGE time per operation over a WORST-CASE sequence of operations. It proves that even if a single operation is expensive, the long-term average is low.

Three Methods of Amortized Analysis:

1. AGGREGATE METHOD:
   Calculate total cost of n operations, then divide by n.
   
   Example: Dynamic Array (ArrayList in Java, Vector in C++)
   - Most insertions cost O(1)
   - When array is full, we double capacity (cost O(n) for copying)
   - If we start with capacity 1 and insert n elements:
     
     Operations cost: 1 + 2 + 4 + 8 + ... + n/2 + n (only when resizing)
     Total cost ≈ 2n
     Amortized cost = 2n/n = O(1) per insertion

2. ACCOUNTING METHOD (Banker's View):
   Assign different "charges" to operations. Credit built up cheap operations pays for expensive ones.
   
   Example: Stack with MultiPop(k)
   - Push operation: charge $2 ($1 for actual push, $1 credit stored)
   - Pop operation: use stored credit
   - MultiPop(k): use k credits from storage
   - Result: All operations O(1) amortized

3. POTENTIAL METHOD (Physicist's View):
   Define potential function Φ(Dᵢ) = potential energy after i operations
   Amortized cost = actual cost + Φ(Dᵢ) - Φ(Dᵢ₋₁)
   Requires Φ(D₀) = 0 and Φ(Dᵢ) ≥ 0 for all i

Key Takeaways from Unit I:
- Big O describes UPPER BOUND growth rate
- Master Theorem solves common divide-and-conquer recurrences
- Amortized analysis proves average-case efficiency of data structures
- Dynamic arrays achieve O(1) amortized insert using geometric resizing


UNIT II: BALANCED TREES & INDEXING STRUCTURES

AVL TREES (Adelson-Velsky and Landis)

AVL trees are the first self-balancing BST invented (1962). They maintain that for EVERY node, the height difference between left and right subtrees (balance factor) is -1, 0, or +1.

Balance Factor = height(left subtree) - height(right subtree)

AVL Property: |BF| ≤ 1 for all nodes

When insertion or deletion violates this property, we perform ROTATIONS to rebalance.

Height of AVL tree with n nodes: ≈ 1.44 log₂(n) — slightly taller than perfect binary tree but still O(log n)

![AVL Tree Balance Factors](/avl_balance_factors.webp)

Four Imbalance Cases and Their Rotations:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Case</th><th class="p-3 border border-cyan/20">Condition</th><th class="p-3 border border-cyan/20">Visual</th><th class="p-3 border border-cyan/20">Rotation</th><th class="p-3 border border-cyan/20">Effect</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">LL</td><td class="p-3 border border-cyan/20">BF = +2<br/>Left child BF ≥ 0</td><td class="p-3 border border-cyan/20">y (root)<br/> /<br/>x<br/>/<br/>Z</td><td class="p-3 border border-cyan/20">Right Rotation on y</td><td class="p-3 border border-cyan/20">x becomes root,<br/>y becomes right child</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">RR</td><td class="p-3 border border-cyan/20">BF = -2<br/>Right child BF ≤ 0</td><td class="p-3 border border-cyan/20">y (root)<br/> \<br/>  x<br/>   \<br/>    Z</td><td class="p-3 border border-cyan/20">Left Rotation on y</td><td class="p-3 border border-cyan/20">x becomes root,<br/>y becomes left child</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">LR</td><td class="p-3 border border-cyan/20">BF = +2<br/>Left child BF = -1</td><td class="p-3 border border-cyan/20">   z<br/>  /<br/> x<br/>  \<br/>   y</td><td class="p-3 border border-cyan/20">Left rotate on x<br/>then Right rotate on z</td><td class="p-3 border border-cyan/20">y becomes root</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">RL</td><td class="p-3 border border-cyan/20">BF = -2<br/>Right child BF = +1</td><td class="p-3 border border-cyan/20">z<br/> \<br/>  x<br/> /<br/>y</td><td class="p-3 border border-cyan/20">Right rotate on x<br/>then Left rotate on z</td><td class="p-3 border border-cyan/20">y becomes root</td></tr></tbody></table>

![AVL Tree Rotations Visualization](/avl_rotations.webp)

RED-BLACK TREES

Red-Black Tree Properties (5 rules that guarantee O(log n) operations):

1. Every node is either RED or BLACK
2. Root is always BLACK
3. All leaves (NIL) are BLACK
4. RED nodes cannot have RED children (No two consecutive REDs)
5. Every path from root to leaf has the SAME number of BLACK nodes (Black Height)

These properties ensure the tree height ≤ 2 log₂(n+1), maintaining O(log n) guarantees.

[TABLE]:<div class="grid grid-cols-2 gap-6 my-6"><div class="bg-cyan-50 p-5 rounded-xl border border-cyan-200"><h4 class="font-bold text-cyan-800 text-lg mb-3">AVL Tree</h4><ul class="list-disc ml-4 space-y-2"><li>Stricter balancing (|BF| ≤ 1)</li><li>Height ≤ 1.44 log₂(n)</li><li>Faster lookups (more balanced)</li><li>Slower inserts/deletes (more rotations)</li><li>Used in: in-memory DBs (Redis)</li></ul></div><div class="bg-blue-50 p-5 rounded-xl border border-blue-200"><h4 class="font-bold text-blue-800 text-lg mb-3">Red-Black Tree</h4><ul class="list-disc ml-4 space-y-2"><li>Relaxed balancing</li><li>Height ≤ 2 log₂(n+1)</li><li>Slightly slower lookups (1-2 extra levels)</li><li>Faster inserts/deletes (~3 rotations per insert)</li><li>Used in: C++ STL map/set, Java TreeMap/HashMap</li></ul></div></div>

![Red-Black Tree Example](/red_black_tree.webp)

B-TREES & B+ TREES (Database Indexing Core)

The Problem B-Trees Solve:
- Disk I/O is SLOW (milliseconds) vs RAM (nanoseconds) — 1,000,000x slower!
- Traditional binary trees require ~30 disk accesses for 1 billion records
- B-Trees reduce this to 3-4 accesses using HIGH FANOUT

B-Tree of order m (m = maximum children per node):
- All leaves at same depth (perfectly balanced)
- Every node (except root) has at least ⌈m/2⌉ children
- Root has at least 2 children (if not leaf)
- Each node stores multiple keys (m-1 keys maximum)

Key Property: Height h ≤ log_{⌈m/2⌉} (n). For m=500, 1 billion records → height ≈ 4!

B+ Tree (Used in ALL modern databases: MySQL, PostgreSQL, MongoDB):
- Data pointers ONLY in leaves (internal nodes store only keys for routing)
- Leaf nodes form a linked list for efficient range queries (ORDER BY, BETWEEN)
- Higher fanout means shorter tree → fewer disk accesses

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Feature</th><th class="p-3 border border-cyan/20">B-Tree</th><th class="p-3 border border-cyan/20">B+ Tree</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Data pointers location</td><td class="p-3 border border-cyan/20">Internal AND leaf nodes</td><td class="p-3 border border-cyan/20">Leaf nodes ONLY</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Range query efficiency</td><td class="p-3 border border-cyan/20">Inefficient (need inorder traversal)</td><td class="p-3 border border-cyan/20">Efficient (leaf pointer chain)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Internal node storage</td><td class="p-3 border border-cyan/20">Keys + data pointers (less fanout)</td><td class="p-3 border border-cyan/20">Only keys (MORE fanout → shorter tree)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Typical height (1B records, m=500)</td><td class="p-3 border border-cyan/20">4-5 levels</td><td class="p-3 border border-cyan/20">3-4 levels</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Database usage</td><td class="p-3 border border-cyan/20">MySQL (with R-Tree indexes)</td><td class="p-3 border border-cyan/20">MySQL InnoDB, PostgreSQL, MongoDB, Oracle</td></tr></tbody></table>

![B+ Tree Structure Detailed](/bplus_tree_detailed.webp)

SEGMENT TREES

Segment Tree solves RANGE QUERY problems: Given array A[0...n-1], answer queries like:
- What is sum of elements between L and R?
- What is minimum value between L and R?
- What is greatest common divisor between L and R?

Key Insight: Precompute results for segments and combine them efficiently.

Structure:
- Leaf nodes store individual array elements
- Internal nodes store combined result of children (sum/min/max/GCD)
- Height: ⌈log₂n⌉
- Total nodes: ~4n

FENWICK TREE (Binary Indexed Tree - BIT)

Fenwick Tree is a more memory-efficient alternative for PREFIX SUM queries and POINT updates.
- Uses only n+1 space (vs 4n for segment tree)
- Simpler code (~15 lines vs ~50 lines)
- Cannot handle range updates OR min/max queries (only sum/xor)

Core Magic: BIT[i] stores sum of range (i - LSB(i) + 1, i] where LSB = i & (-i)

[TABLE]:<div class="grid grid-cols-2 gap-6 my-6"><div class="bg-green-50 p-5 rounded-xl border border-green-200"><h4 class="font-bold text-green-800 text-lg mb-3">Segment Tree</h4><ul class="list-disc ml-4 space-y-2"><li>More versatile (min, max, gcd, sum, product)</li><li>Code: ~50 lines</li><li>Memory: 4n</li><li>Supports lazy propagation for range updates</li><li>Time per query: O(log n)</li></ul></div><div class="bg-orange-50 p-5 rounded-xl border border-orange-200"><h4 class="font-bold text-orange-800 text-lg mb-3">Fenwick Tree (BIT)</h4><ul class="list-disc ml-4 space-y-2"><li>Only sum & xor operations</li><li>Code: ~15 lines</li><li>Memory: n+1</li><li>Faster constant factor (less overhead)</li><li>Cannot handle range updates easily</li></ul></div></div>

UNIT III: PRIORITY QUEUES & DISJOINT SETS

BINARY HEAPS

A Binary Heap is a COMPLETE binary tree stored in an array. Complete means all levels are filled except possibly last, which is filled left to right.

Parent-child relationships in array (1-indexed):
- Parent of i: floor(i/2)
- Left child of i: 2i
- Right child of i: 2i+1

Heap Property:
- Min-Heap: parent ≤ children (smallest at root)
- Max-Heap: parent ≥ children (largest at root)

![Binary Heap Structure](/binary_heap.webp)

BINOMIAL HEAPS

Binomial Heap is a collection of Binomial Trees. A Binomial Tree Bₖ:
- Has 2ᵏ nodes
- Height = k
- Root has k children which are B₀, B₁, ..., Bₖ₋₁

Visual: B₀ (single node), B₁ (root with 1 child), B₂ (root with children B₁, B₀), etc.

Properties:
- No two binomial trees of same order (like binary representation of n)
- Merge operation: O(log n): similar to binary addition
- Insert: O(1) amortized

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Property</th><th class="p-3 border border-cyan/20">Binary Heap</th><th class="p-3 border border-cyan/20">Binomial Heap</th></thead><tbody><tr><td class="p-3 border border-cyan-20 font-bold">Structure</td><td class="p-3 border border-cyan/20">Single complete binary tree</td><td class="p-3 border border-cyan/20">Collection of binomial trees</td></tr><tr><td class="p-3 border border-cyan-20 font-bold">Merge complexity</td><td class="p-3 border border-cyan/20">O(m log(m+n))</td><td class="p-3 border border-cyan/20">O(log n)</td></tr><tr><td class="p-3 border border-cyan-20 font-bold">Insert amortized</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(1)</td></tr><tr><td class="p-3 border border-cyan-20 font-bold">Extract-Min</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td></tr></tbody></table>

![Binomial Heap Structure](/binomial_heap.webp)

FIBONACCI HEAPS

Fibonacci Heap is the theoretically optimal priority queue for Dijkstra and Prim algorithms.

Key Innovations:
- Lazy merging: Only merge trees when extracting minimum
- Marked nodes: Track children lost to enable efficient decrease-key
- Cut operations: Move nodes to root list to maintain amortized bounds

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Operation</th><th class="p-3 border border-cyan/20">Binary Heap</th><th class="p-3 border border-cyan/20">Binomial Heap</th><th class="p-3 border border-cyan/20">Fibonacci Heap*</th></thead><tbody><tr><td class="p-3 border border-cyan-20">Make-Heap</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(1)</td></tr><tr><td class="p-3 border border-cyan-20">Insert</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan-20 font-bold text-green-600">O(1)</td></tr><tr><td class="p-3 border border-cyan-20">Find-Min</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan-20 font-bold text-green-600">O(1)</td></tr><tr><td class="p-3 border border-cyan-20">Extract-Min</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)*</td></tr><tr><td class="p-3 border border-cyan-20">Decrease-Key</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan-20 font-bold text-green-600">O(1)*</td></tr><tr><td class="p-3 border border-cyan-20">Merge/Union</td><td class="p-3 border border-cyan/20">O(m log(m+n))</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan-20 font-bold text-green-600">O(1)</td></tr></tbody></table>

Amortized complexity

![Fibonacci Heap Structure](/fibonacci_heap.webp)

DISJOINT SET ADT (Union-Find):
The Union-Find data structure tracks a partition of n elements into disjoint sets. 
It supports two operations
   - FIND(x): Return the representative (root) of x's set
   - UNION(x, y): Merge sets containing x and y

Two Critical Optimizations:

1. UNION BY RANK: 
     Attach smaller tree under larger tree
     Rank approximates height
     Keeps tree shallow (O(log n) height)

2. PATH COMPRESSION: 
     During FIND, make every node point directly to root
     Flattens the tree
     Nearly O(1) amortized time

Time Complexity of Union-Find with both optimizations: O(α(n)) where α(n) is the Inverse Ackermann function.
For any practical n (≤ 10¹⁰⁰⁰), α(n) ≤ 4. So effectively O(1) per operation!

Applications of Union-Find:
- Kruskal's MST algorithm
- Network connectivity (social networks, computer networks)
- Image segmentation (connected components)
- Percolation problems (physics simulations)


UNIT IV: HASHING & TRIES

ADVANCED HASHING TECHNIQUES

Hash Function Requirements:
1. Deterministic: Same input → same output
2. Uniform distribution: Spread keys evenly across buckets
3. Fast computation: O(1) time
4. Avalanche effect: Small input change → drastic output change (for cryptographic hashes)

Collision Resolution Methods:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Method</th><th class="p-3 border border-cyan/20">Description</th><th class="p-3 border border-cyan/20">Pros</th><th class="p-3 border border-cyan/20">Cons</th><th class="p-3 border border-cyan/20">Load Factor</th></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Chaining</td><td class="p-3 border border-cyan/20">Linked list per bucket</td><td class="p-3 border border-cyan/20">Simple, handles high load, no clustering</td><td class="p-3 border border-cyan/20">Extra memory for pointers, cache unfriendly</td><td class="p-3 border border-cyan-20">α can be >1</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Linear Probing</td><td class="p-3 border border-cyan/20">Slot = (hash + i) % m</td><td class="p-3 border border-cyan/20">Cache friendly, no pointers</td><td class="p-3 border border-cyan/20">Primary clustering (runs of occupied slots)</td><td class="p-3 border border-cyan-20">α < 0.5</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Quadratic Probing</td><td class="p-3 border border-cyan/20">Slot = (hash + i²) % m</td><td class="p-3 border border-cyan/20">Avoids primary clustering</td><td class="p-3 border border-cyan/20">Secondary clustering, may skip empty slots</td><td class="p-3 border border-cyan-20">α < 0.5</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Double Hashing</td><td class="p-3 border border-cyan/20">Slot = (h1 + i×h2) % m</td><td class="p-3 border border-cyan/20">Uniform distribution, no clustering</td><td class="p-3 border border-cyan-20">Slower (two hash functions)</td><td class="p-3 border border-cyan-20">α < 0.9</td></tr></tbody></table>

Cuckoo Hashing:
- Uses two hash tables (or two hash functions in one table)
- Insert: Place in Table 1; if occupied, EVICT existing key to Table 2; repeat
- Lookup: Check both tables → O(1) worst case
- May cause cycles (need rehash)

Bloom Filter: 
Space-Efficient Probabilistic Set Data Structure
A Bloom Filter is a space-efficient probabilistic data structure used to test whether an element is a member of a set. It trades off perfect accuracy for significant space savings.

How It Works:
- Bit array of size m (all 0 initially)
- k independent hash functions (each outputs 0 to m-1)
- Insert: For element x, set bits at h₁(x), h₂(x), ..., hₖ(x) to 1
- Query: If any of these bits is 0 → element definitely NOT in set. If all bits are 1 → element PROBABLY in set (could be false positive)

Example:
Initially: [0,0,0,0,0,0,0,0,0,0] (m=10)
Insert "apple" with k=3: hash functions produce positions 2,5,7 → [0,0,1,0,0,1,0,1,0,0]
Insert "banana": positions 1,5,8 → [0,1,1,0,0,1,0,1,1,0]
Query "apple": check positions 2,5,7 → all 1 → probably present
Query "grape": check positions 0,3,9 → any 0? yes (position 0 is 0) → definitely absent

Applications:
- Weak password detection (don't store actual passwords)
- Cache filtering (avoid cache stampedes)
- Web crawling (avoid revisiting URLs)
- Bitcoin SPV nodes (verify transactions exist)
- Database query optimization (avoid expensive disk lookups for missing keys)

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Property</th><th class="p-3 border border-cyan/20">Description</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">No False Negatives</td><td class="p-3 border border-cyan/20">If Bloom Filter says "not present", the element is definitely NOT in the set</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">May Have False Positives</td><td class="p-3 border border-cyan/20">If Bloom Filter says "present", the element might actually NOT be in the set (probability p)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Space Efficiency</td><td class="p-3 border border-cyan/20">Uses m bits regardless of element size (much smaller than storing actual elements)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Time Complexity</td><td class="p-3 border border-cyan/20">O(k) where k = number of hash functions (typically 5-10)</td></tr></tbody></table>

Optimal Parameters:
For desired false positive probability p and n expected elements:
m = -n × ln(p) / (ln(2))²  (bits)
k = (m / n) × ln(2)  (hash functions)

Example: For n = 1,000,000 elements and p = 0.01 (1% false positives):
m = -1,000,000 × ln(0.01) / (0.693)² ≈ 9,585,000 bits ≈ 1.2 MB
k = (9,585,000 / 1,000,000) × 0.693 ≈ 6.6 → use 7 hash functions

TRIES (Prefix Trees)

A Trie (from "reTRIEval") is a tree where each node stores a character, and paths from root to leaf form words.

Properties:
- Search time: O(L) where L = key length (independent of number of keys!)
- Space: O(ALPHABET_SIZE × total characters)
- Perfect for prefix matching (autocomplete)

Advanced Trie Variants:

1. COMPRESSED TRIE (Radix Tree):
   - Merges single-child nodes into one edge
   - Reduces space from O(n²) to O(n)
   - Used in: Linux kernel (IPv4 routing), Redis as "rax"

2. SUFFIX TRIE:
   - Stores all suffixes of a string
   - Build time: O(n²) naive, O(n) with Ukkonen's algorithm
   - Applications: Pattern matching, longest repeated substring

3. SUFFIX ARRAY:
   - Space-efficient alternative to suffix trie (O(n) vs O(n²))
   - All suffixes stored in sorted order
   - Search: O(L log n) with binary search

4. TERNARY SEARCH TREE (TST):
   - Each node has 3 children: left (less), equal (next char), right (greater)
   - Space efficient for sparse datasets (no 26-array overhead)
   - Supports Unicode naturally

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Structure</th><th class="p-3 border border-cyan/20">Lookup Time</th><th class="p-3 border border-cyan/20">Space</th><th class="p-3 border border-cyan/20">Best Use Case</th></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Standard Trie</td><td class="p-3 border border-cyan/20">O(L)</td><td class="p-3 border border-cyan/20">O(ALPHABET × N × L)</td><td class="p-3 border border-cyan/20">Autocomplete, dictionary with small alphabet</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Radix Tree (Compressed)</td><td class="p-3 border border-cyan/20">O(L)</td><td class="p-3 border border-cyan/20">O(N)</td><td class="p-3 border border-cyan/20">IP routing, memory-constrained systems</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Suffix Array</td><td class="p-3 border border-cyan/20">O(L log N)</td><td class="p-3 border border-cyan/20">O(N)</td><td class="p-3 border border-cyan/20">Bioinformatics (DNA pattern search)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Ternary Search Tree</td><td class="p-3 border border-cyan/20">O(L + log N)</td><td class="p-3 border border-cyan/20">O(N)</td><td class="p-3 border border-cyan/20">Large alphabets (Unicode, Chinese)</td></tr></tbody></table>


UNIT V: GRAPH DATA STRUCTURES & APPLICATIONS

GRAPH REPRESENTATIONS

Graph G = (V, E) where V = vertices (nodes), E = edges (connections)

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Representation</th><th class="p-3 border border-cyan/20">Memory</th><th class="p-3 border border-cyan/20">Edge Check</th><th class="p-3 border border-cyan/20">Neighbor Iteration</th><th class="p-3 border border-cyan/20">Add Edge</th><th class="p-3 border border-cyan/20">Best For</th></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Adjacency Matrix</td><td class="p-3 border border-cyan/20">O(V²)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(V)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">Dense graphs (E ≈ V²)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Adjacency List</td><td class="p-3 border border-cyan/20">O(V+E)</td><td class="p-3 border border-cyan/20">O(degree)</td><td class="p-3 border border-cyan/20">O(degree)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">Sparse graphs (E ≈ V)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Edge List</td><td class="p-3 border border-cyan/20">O(E)</td><td class="p-3 border border-cyan/20">O(E)</td><td class="p-3 border border-cyan/20">O(E)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">Kruskal's MST, storing edges</td></tr></tbody></table>

TRAVERSAL ALGORITHMS

BFS (Breadth-First Search):
- Queue-based
- Finds shortest path in unweighted graphs
- Time: O(V+E)
- Applications: Web crawling, GPS navigation, social degrees of separation

DFS (Depth-First Search):
- Stack/Recursion
- Discovers connectivity, cycles, topological sort
- Time: O(V+E)
- Applications: Maze solving, topological sorting, SCC detection

![BFS vs DFS Visualization](/bfs_dfs_comparison.webp)

SHORTEST PATH ALGORITHMS

Dijkstra's Algorithm (Single Source, Non-negative Weights):
- Greedy algorithm using priority queue
- Cannot handle negative edges
- Time: O((V+E) log V) with binary heap

Bellman-Ford Algorithm (Handles Negative Weights):
- Relaxes all edges V-1 times
- Detects negative cycles
- Time: O(V×E)

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Feature</th><th class="p-3 border border-cyan/20">Dijkstra</th><th class="p-3 border border-cyan/20">Bellman-Ford</th></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Time Complexity</td><td class="p-3 border border-cyan/20">O((V+E) log V)</td><td class="p-3 border border-cyan/20">O(V×E)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Negative weights</td><td class="p-3 border border-cyan/20">❌ No</td><td class="p-3 border border-cyan/20">✅ Yes</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Negative cycle detection</td><td class="p-3 border border-cyan/20">❌</td><td class="p-3 border border-cyan/20">✅ Yes</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Best Use Case</td><td class="p-3 border border-cyan/20">Maps, GPS, network routing (positive weights)</td><td class="p-3 border border-cyan/20">Currency arbitrage, graphs with negative edges</td></tr></tbody></table>

MINIMUM SPANNING TREE (MST)

A Minimum Spanning Tree connects all vertices with minimum total edge weight, forming a tree (V-1 edges, no cycles).

[TABLE]:<div class="grid grid-cols-2 gap-6 my-6"><div class="bg-indigo-50 p-5 rounded-xl border border-indigo-200"><h4 class="font-bold text-indigo-800 text-lg mb-3">Prim's Algorithm</h4><ul class="list-disc ml-4 space-y-2"><li>Best for <strong>dense graphs</strong> (E ≈ V²)</li><li>Starts from a vertex, grows outward like Dijkstra</li><li>Uses priority queue of edges</li><li>Time: O((V+E) log V)</li></ul></div><div class="bg-purple-50 p-5 rounded-xl border border-purple-200"><h4 class="font-bold text-purple-800 text-lg mb-3">Kruskal's Algorithm</h4><ul class="list-disc ml-4 space-y-2"><li>Best for <strong>sparse graphs</strong> (E ≈ V)</li><li>Sorts all edges globally</li><li>Uses Union-Find data structure</li><li>Time: O(E log E)</li><li>Easier to parallelize</li></ul></div></div>

REAL-WORLD APPLICATIONS

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Domain</th><th class="p-3 border border-cyan/20">Problem</th><th class="p-3 border border-cyan/20">Data Structure / Algorithm</th><th class="p-3 border border-cyan-20">Real Product</th></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">GPS Navigation</td><td class="p-3 border border-cyan/20">Shortest path in road network</td><td class="p-3 border border-cyan/20">Dijkstra, A* Search</td><td class="p-3 border border-cyan/20">Google Maps, Waze</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Social Media</td><td class="p-3 border border-cyan/20">Friend recommendation, degrees of separation</td><td class="p-3 border border-cyan/20">BFS, Disjoint Set</td><td class="p-3 border border-cyan/20">Facebook, LinkedIn</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Network Routing</td><td class="p-3 border border-cyan/20">Minimum cost to connect routers</td><td class="p-3 border border-cyan/20">Prim's MST</td><td class="p-3 border border-cyan/20">Cisco routers, Internet backbone</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Compiler Design</td><td class="p-3 border border-cyan/20">Register allocation, dependency resolution</td><td class="p-3 border border-cyan/20">Graph coloring, Topological sort</td><td class="p-3 border border-cyan/20">GCC, LLVM</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Bioinformatics</td><td class="p-3 border border-cyan/20">DNA sequence alignment</td><td class="p-3 border border-cyan/20">Suffix Tree/Array</td><td class="p-3 border border-cyan/20">BLAST, Bowtie</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">E-commerce</td><td class="p-3 border border-cyan/20">Product recommendation</td><td class="p-3 border border-cyan/20">Bipartite graphs, BFS</td><td class="p-3 border border-cyan/20">Amazon, Netflix</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Databases</td><td class="p-3 border border-cyan/20">Efficient indexing</td><td class="p-3 border border-cyan/20">B+ Trees, Hashing</td><td class="p-3 border border-cyan/20">MySQL, PostgreSQL</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Cybersecurity</td><td class="p-3 border border-cyan/20">Anomaly detection, password check</td><td class="p-3 border border-cyan/20">Bloom Filters, Tries</td><td class="p-3 border border-cyan/20">Have I Been Pwned</td></tr></tbody></table>

COMPLEXITY CHEAT SHEET

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Data Structure</th><th class="p-3 border border-cyan/20">Search</th><th class="p-3 border border-cyan/20">Insert</th><th class="p-3 border border-cyan/20">Delete</th><th class="p-3 border border-cyan/20">Space</th><th class="p-3 border border-cyan/20">Best For</th></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Hash Table (avg)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Exact match lookups</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">AVL/Red-Black Tree</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Ordered operations, range queries</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Binary Heap (Min/Max)</td><td class="p-3 border border-cyan/20">O(1) [min/max]</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Priority queues, Dijkstra/Prim</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Trie (prefix tree)</td><td class="p-3 border border-cyan/20">O(L) (L=length)</td><td class="p-3 border border-cyan/20">O(L)</td><td class="p-3 border border-cyan/20">O(L)</td><td class="p-3 border border-cyan/20">O(N×L)</td><td class="p-3 border border-cyan/20">Autocomplete, dictionary</td></tr></tbody></table>
`;