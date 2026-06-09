export const adsShortNotes = `ADVANCED DATA STRUCTURES - SHORT NOTES
(As per JNTUGV / CEV R23 Syllabus)

INTRODUCTION TO ALGORITHM ANALYSIS

Data Structures Overview:
A data structure is a specialized format for organizing, processing, retrieving, and storing data. Choosing the right data structure can make algorithms significantly faster and more memory-efficient.

Review of Basic Data Structures:

Arrays:
- Contiguous memory locations storing elements of same type
- O(1) random access by index
- Fixed size (static arrays) or dynamic resizing (ArrayList, Vector)
- Operations: Insert O(n), Delete O(n), Search O(n) or O(log n) if sorted

Stacks (LIFO - Last In First Out):
- Push (add to top), Pop (remove from top), Peek/Top (view top)
- Applications: Function call stack, undo/redo, expression evaluation
- Time Complexity: O(1) for all operations
- Implementation: Array or Linked List

Queues (FIFO - First In First Out):
- Enqueue (add to rear), Dequeue (remove from front)
- Applications: Task scheduling, BFS, print spooler
- Time Complexity: O(1) for all operations
- Variants: Circular Queue, Deque (Double-ended), Priority Queue

Linked Lists:
- Nodes containing data and pointer to next node
- Singly Linked: forward traversal only
- Doubly Linked: forward and backward traversal
- Circular Linked: last node points to first
- Insertion/Deletion O(1) at known position, Search O(n)

Trees (Basic):
- Hierarchical structure with root, nodes, edges, leaves
- Binary Tree: Each node has at most 2 children
- Binary Search Tree (BST): left < root < right
- BST operations: Search O(h), Insert O(h), Delete O(h) where h = height

TIME AND SPACE COMPLEXITY ANALYSIS

Asymptotic Notations:

Big-O (O) - Upper Bound (Worst Case):
- O(1): Constant time (array access, hash lookup)
- O(log n): Logarithmic (binary search, balanced tree operations)
- O(n): Linear (simple search, array traversal)
- O(n log n): Linearithmic (merge sort, heap sort, quick sort average case)
- O(n²): Quadratic (bubble sort, insertion sort, nested loops)
- O(2ⁿ): Exponential (recursive Fibonacci without memoization)
- O(n!): Factorial (traveling salesman brute force)

Omega (Ω) - Lower Bound (Best Case)
Theta (Θ) - Tight Bound (Average Case)

Space Complexity Analysis:
- Amount of memory an algorithm requires
- In-place algorithms: O(1) extra space (modify input directly)
- Examples: Quick sort O(log n) recursion stack, Merge sort O(n) auxiliary array

RECURRENCE RELATIONS AND MASTER THEOREM

Recurrence Relations:
A recurrence defines a function in terms of its smaller inputs.
General form: T(n) = a T(n/b) + f(n)

Common Recurrences:
- T(n) = T(n-1) + O(1) → O(n) (linear search, factorial)
- T(n) = T(n-1) + O(n) → O(n²) (bubble sort)
- T(n) = 2T(n/2) + O(n) → O(n log n) (merge sort)
- T(n) = 2T(n/2) + O(1) → O(n) (tree traversal)
- T(n) = T(n/2) + O(1) → O(log n) (binary search)

Master Theorem:
For recurrence T(n) = a T(n/b) + f(n) where a ≥ 1, b > 1, f(n) asymptotically positive

Case 1: f(n) = O(n^(log_b a - ε)) → T(n) = Θ(n^(log_b a))
Case 2: f(n) = Θ(n^(log_b a) * log^k n) → T(n) = Θ(n^(log_b a) * log^(k+1) n)
Case 3: f(n) = Ω(n^(log_b a + ε)) AND a f(n/b) ≤ c f(n) → T(n) = Θ(f(n))

Examples:
- T(n) = 2T(n/2) + n → a=2, b=2, log_b a = 1, f(n)=n → Case 2 → O(n log n)
- T(n) = T(2n/3) + 1 → a=1, b=3/2, log_b a = 0, f(n)=1 → Case 2 → O(log n)

AMORTIZED ANALYSIS

Amortized analysis gives the average time per operation over a sequence of operations (not average of inputs).

Three Methods:

1. Aggregate Method:
   - Total time for n operations / n
   - Example: Dynamic array resizing — n insertions cost O(n) total → O(1) amortized per insertion

2. Accounting Method (Banker's View):
   - Assign different "charges" to different operations
   - Overcharge cheap operations to save "credits" for expensive ones
   - Example: Stack with multipop — charge 2 for push (1 for push + 1 saved for pop)

3. Potential Method (Physicist's View):
   - Define potential function Φ(D_i) for data structure state
   - Amortized cost = Actual cost + Φ(D_i) - Φ(D_i-1)
   - Example: Splay trees, Fibonacci heaps

Applications of Amortized Analysis:
- Dynamic array resizing (vector/ArrayList)
- Splay tree operations (O(log n) amortized)
- Disjoint Set Union with path compression (Inverse Ackermann)
- Fibonacci heap operations (O(1) amortized for insert, merge, decrease-key)


UNIT II — BALANCED TREES AND INDEXING STRUCTURES

AVL TREES (Adelson-Velsky and Landis)

Properties:
- Self-balancing Binary Search Tree
- Balance Factor = height(left subtree) - height(right subtree) ∈ {-1, 0, 1}
- For every node, |BF| ≤ 1
- Height guaranteed O(log n) for all operations

Balance Factor Calculation:
- BF = height(left) - height(right)
- BF = 0: perfectly balanced
- BF = +1: left-heavy (still balanced)
- BF = -1: right-heavy (still balanced)

Rotation Operations (Restore balance after insertion/deletion):

Left Rotation (LL):
  - Used when right subtree is too heavy (BF = -2, right child BF ≤ 0)
  - x becomes left child of y, y's left child becomes x's right child
       y                x
      / \              / \
     x   T3    →      T1  y
    / \                  / \
   T1 T2                T2 T3

Right Rotation (RR):
  - Used when left subtree is too heavy (BF = +2, left child BF ≥ 0)

Left-Right Rotation (LR):
  - First left rotate left child, then right rotate current
  - Used when BF = +2 and left child BF = -1

Right-Left Rotation (RL):
  - First right rotate right child, then left rotate current
  - Used when BF = -2 and right child BF = +1

AVL Insertion Steps:
1. Standard BST insert
2. Update heights of ancestors
3. Check balance factor at each ancestor
4. Perform appropriate rotations to rebalance
5. Time Complexity: O(log n)

AVL Deletion Steps:
1. Standard BST delete
2. Update heights and rebalance from deleted node's parent upward
3. Multiple rotations may be needed
4. Time Complexity: O(log n)

RED-BLACK TREES

Properties (5 rules):
1. Every node is either RED or BLACK
2. Root is always BLACK
3. All leaves (NIL) are BLACK
4. RED nodes cannot have RED children (no two consecutive REDs)
5. Every path from root to leaf has same number of BLACK nodes (Black Height)

Black Height (bh): Number of black nodes from root to leaf (excluding root)
Property: Height ≤ 2 × Black Height (longest path = alternating red-black)

Why Red-Black Trees over AVL?
- Less strict balancing (more relaxed than AVL)
- Fewer rotations during insert/delete
- AVL: O(log n) but stricter, more rotations
- Red-Black: O(log n) amortized, faster inserts/deletes

Red-Black Tree Insertion:
1. Standard BST insert with new node as RED (preserves black height property)
2. Fix violations:
   - Case 1: Uncle is RED → Recolor (parent, uncle, grandparent)
   - Case 2: Uncle is BLACK (triangle case) → Rotate to make linear
   - Case 3: Uncle is BLACK (linear case) → Rotate and recolor
3. Time Complexity: O(log n) with O(1) rotations

Red-Black Tree Deletion:
- More complex, uses "double black" concept
- Cases involve sibling colors and nephew colors
- Time Complexity: O(log n)

Applications:
- C++ STL map, set (typically Red-Black Trees)
- Java TreeMap, TreeSet
- Linux kernel completely fair scheduler (CFS)
- Epoll event notification mechanism

SPLAY TREES

Properties:
- Self-adjusting BST with no explicit balance information
- Recently accessed elements move to root (amortized efficiency)
- Amortized time O(log n) for all operations

Splaying Operation (6 cases):
Move node x to root using sequence of rotations:

Zig (right rotation):
  - x is child of root
  - Single rotation at root

Zig-Zig:
  - x and parent both left children or both right children
  - Rotate parent then rotate x

Zig-Zag:
  - x is left child of right child OR right child of left child
  - Rotate x twice

Splay Tree Operations:
- Search(x): Splay node if found, else splay last accessed node
- Insert(x): BST insert, then splay new node
- Delete(x): Splay x to root, merge left and right subtrees
- Join(T1, T2): Splay max of T1, make T2 right child
- Split(T, x): Splay x, break into left and right subtrees

Advantages:
- Simple to implement
- Excellent locality of reference (cache-friendly)
- Adaptive: frequently accessed nodes become faster

Applications:
- Cache implementation (most recent used items)
- Network routers (frequently accessed routes)
- Garbage collection algorithms

B-TREES AND B+ TREES

B-Tree Properties:
- Balanced multi-way search tree used in databases and file systems
- Order m: Each node has at most m children, at least ⌈m/2⌉ children (except root)
- Each node contains ⌈m/2⌉ - 1 to m - 1 keys
- All leaves at same depth
- Searching O(log n) with high branching factor reduces disk I/O

B-Tree Node Structure:
[Key1, Key2, ..., Key_k]
[Ptr0, Ptr1, Ptr2, ..., Ptr_k] where k = number of keys

B-Tree Insertion:
1. Search for leaf position
2. Insert key in sorted order
3. If node has m keys (overflow): split into two nodes
   - Middle key promoted to parent
   - If parent overflows, continue splitting up
4. Time Complexity: O(log_m n)

B-Tree Deletion:
1. If key in leaf: remove directly
2. If key in internal node: replace with predecessor/successor
3. If underflow (keys < ⌈m/2⌉ - 1):
   - Borrow from sibling (redistribution)
   - Or merge with sibling
4. Time Complexity: O(log_m n)

B+ Tree (Most common in databases):
- All keys stored in leaves (internal nodes only store pointers)
- Leaves form a linked list for efficient range queries
- Better for range scans (common in SQL queries)

B-Tree vs B+ Tree:
| Feature | B-Tree | B+ Tree |
|---------|--------|---------|
| Keys in leaves | No | Yes |
| Leaf linkage | No | Yes (linked list) |
| Internal node data | Keys + data pointers | Only keys (pointers to leaves) |
| Range queries | Slower | Very fast |
| Applications | General purpose | Database indexes (MySQL, PostgreSQL) |

Segment Trees and Fenwick Trees

SEGMENT TREE:

Properties:
- Binary tree for range queries and point updates on arrays
- Each node represents a segment (range) of the array
- Leaf nodes represent single elements
- Build Time: O(n)
- Query Time: O(log n) for range sum/min/max/gcd
- Update Time: O(log n)

Operations on Segment Tree:

Building (Recursive):
build(node, start, end):
  if start == end: tree[node] = arr[start]
  else:
    mid = (start + end) / 2
    build(2*node, start, mid)
    build(2*node+1, mid+1, end)
    tree[node] = merge(tree[2*node], tree[2*node+1])

Range Query (l, r):
query(node, start, end, l, r):
  if r < start or l > end: return neutral_element
  if l <= start and end <= r: return tree[node]
  mid = (start + end) / 2
  return merge(query(2*node, start, mid, l, r),
               query(2*node+1, mid+1, end, l, r))

Point Update (index, value):
update(node, start, end, idx, val):
  if start == end: tree[node] = val
  else:
    mid = (start + end) / 2
    if idx <= mid: update(2*node, start, mid, idx, val)
    else: update(2*node+1, mid+1, end, idx, val)
    tree[node] = merge(tree[2*node], tree[2*node+1])

Applications:
- Range sum, min, max, GCD queries
- Finding number of zeros in range
- Lazy propagation for range updates (add value to all elements in range)
- Computational geometry (interval stabbing queries)

FENWICK TREE (Binary Indexed Tree - BIT):

Properties:
- More space-efficient than segment tree (uses n size instead of 4n)
- Simpler and faster for prefix sum queries
- Supports: point update, prefix sum, range sum (via two prefix queries)
- Not as versatile as segment tree (supports only invertible operations)

Core Concept:
- Each index i stores sum of range (i - LSB(i) + 1) to i
- LSB(i) = i & (-i) (lowest set bit)

Fenwick Tree Operations:

Building:
BIT[i] = sum of arr[i - LSB(i) + 1 ... i]
Initialize BIT as zeros, then call update for each element O(n log n)

Prefix Sum Query (1 to idx):
sum(idx):
  result = 0
  while idx > 0:
    result += BIT[idx]
    idx -= idx & (-idx)  # remove LSB
  return result

Range Sum (l to r):
range_sum(l, r) = sum(r) - sum(l-1)

Point Update (add value at idx):
update(idx, delta):
  while idx <= n:
    BIT[idx] += delta
    idx += idx & (-idx)  # add LSB

Time Complexities:
- Build: O(n log n) or O(n) if built optimally
- Prefix Query: O(log n)
- Point Update: O(log n)
- Range Update (add to range): O(log n) with difference array trick

BIT vs Segment Tree:
| Feature | BIT | Segment Tree |
|---------|-----|--------------|
| Space | O(n) | O(4n) |
| Implementation | Very simple | Moderate |
| Range queries | Prefix sum only (range via difference) | Any associative operation |
| Range updates | Complex (requires difference BIT) | Easy with lazy propagation |
| Invertible operations | Required (sum, xor) | Not required |

Applications:
- Inversion count in array
- Frequency array operations
- Order statistics (Kth smallest element)
- Dynamic cumulative frequency tables


UNIT III — PRIORITY QUEUES AND DISJOINT SETS

BINARY HEAPS

Properties:
- Complete binary tree (all levels filled except last, filled left to right)
- Min-Heap: Parent ≤ Children (smallest at root)
- Max-Heap: Parent ≥ Children (largest at root)
- Array representation: parent = floor(i/2), left_child = 2i, right_child = 2i+1

Heap Operations:

Heapify (Bubble Down / Sink):
- Restores heap property from index i downward
- Compare with children, swap with smaller (min-heap) or larger (max-heap)
- Time: O(log n)

Insert (Bubble Up / Swim):
- Add element at end
- Compare with parent, swap if heap property violated
- Time: O(log n)

Extract Min/Max:
- Remove root (min or max element)
- Move last element to root
- Heapify from root
- Time: O(log n)

Build Heap:
- Start from last non-leaf node (n/2) down to 1
- Heapify each node
- Time: O(n) (NOT O(n log n)!)

Peek: O(1) — return root without removing

Heap Sort Algorithm:
1. Build max-heap from array (O(n))
2. Repeatedly extract max (O(n log n))
3. Sorted array in place
Total: O(n log n) — in-place, not stable

Priority Queue Implementation:
- Binary heap is standard priority queue implementation
- C++: priority_queue (max-heap by default)
- Java: PriorityQueue (min-heap)
- Python: heapq (min-heap)

Applications:
- Dijkstra's shortest path (O((V+E) log V))
- Prim's MST (O((V+E) log V))
- Huffman coding
- OS process scheduling (priority-based)
- Median maintenance (two heaps: max-heap for lower half, min-heap for upper half)

BINOMIAL HEAPS

Properties:
- Collection of Binomial Trees (forest)
- Binomial Tree Bk: 2^k nodes, height k, root has children B0, B1, ..., B_{k-1}
- No two binomial trees of same order in heap (binary representation of node count)

Binomial Heap Operations:
- Insert: O(log n) amortized
- Union/Merge: O(log n) — combine two heaps (like binary addition)
- Extract Min: O(log n) — find min root, remove, merge children
- Decrease Key: O(log n)
- Delete: O(log n) (decrease key to -inf then extract min)

Applications:
- When many merge operations needed
- Used as building block for Fibonacci heaps

FIBONACCI HEAPS

Properties:
- Lazy merging structure with excellent amortized bounds
- Collection of heap-ordered trees
- Uses "mark" bits for lazy cascading cuts

Fibonacci Heap Complexity (Amortized):
| Operation | Amortized Time |
|-----------|----------------|
| Insert | O(1) |
| Find Min | O(1) |
| Union/Merge | O(1) |
| Extract Min | O(log n) |
| Decrease Key | O(1) |
| Delete | O(log n) |

How Decrease Key works:
- Cut node from parent, add as new tree root
- If parent was already marked, cut parent as well (cascading cut)
- Mark a node when it loses a child

Why Fibonacci Heaps are Important:
- Used in Dijkstra and Prim for theoretical O(E + V log V) complexity
- Not widely used in practice due to high constant factors
- Better than binary heap for dense graphs with many decrease-key operations

DISJOINT SET ADT (Union-Find)

Purpose:
- Maintains collection of disjoint (non-overlapping) sets
- Supports: Find (which set does element belong to) and Union (merge two sets)

Representation:
- Each set represented by a tree (root is representative)
- Array parent[]: parent[i] is parent of node i, parent[root] = root
- Array rank[] or size[] for optimization

Operations:

Find (with Path Compression):
find(x):
  if parent[x] != x:
    parent[x] = find(parent[x])  # path compression
  return parent[x]

Path Compression Effect: Flattens tree, makes all nodes point directly to root
Time Complexity: O(α(n)) amortized where α is inverse Ackermann (~O(1))

Union by Rank / Size:
union(x, y):
  rootX = find(x), rootY = find(y)
  if rootX == rootY: return
  if rank[rootX] < rank[rootY]: parent[rootX] = rootY
  else if rank[rootX] > rank[rootY]: parent[rootY] = rootX
  else: parent[rootY] = rootX, rank[rootX]++

Union by Size:
if size[rootX] < size[rootY]: parent[rootX] = rootY, size[rootY] += size[rootX]
else: parent[rootY] = rootX, size[rootX] += size[rootY]

Time Complexity with both optimizations:
- O(α(n)) per operation (almost constant)
- α(n) ≤ 4 for any practical n (n < 10^80)

Applications:
- Kruskal's algorithm for MST (most common)
- Dynamic connectivity in graphs
- Image segmentation (connected components)
- Percolation problem (Monte Carlo simulation)
- Network connectivity
- Union-Find in compilers (variable aliasing detection)
- Solving equivalence relations


UNIT IV — HASHING AND TRIES

HASHING BASICS

Hash Function: Maps key to array index (hash code)
Goals:
- Deterministic: Same key always gives same hash
- Uniform distribution: Keys spread evenly across buckets
- Fast computation: O(1) time

Properties of Good Hash Functions:
- Minimize collisions (different keys mapping to same index)
- Avalanche effect: Small input change → large output change

Simple Hash Functions:
- Division Method: h(k) = k mod m (m should be prime, avoid powers of 2)
- Multiplication Method: h(k) = floor(m * (k * A mod 1)), 0 < A < 1
- Universal Hashing: Randomly chosen from family of functions

COLLISION RESOLUTION

Separate Chaining:
- Each bucket contains linked list of key-value pairs
- Load factor α = n/m (n = keys, m = buckets)
- Expected search time: O(1 + α)
- Simple and handles many collisions well

Open Addressing:
- All elements stored in table itself (no linked lists)
- On collision, probe for next available slot

Probing Techniques:

1. Linear Probing:
   - h(k, i) = (h'(k) + i) mod m
   - Problem: Primary clustering — long runs of occupied slots
   - Deletion: "tombstone" markers needed

2. Quadratic Probing:
   - h(k, i) = (h'(k) + c1*i + c2*i²) mod m
   - Avoids primary clustering
   - Problem: Secondary clustering (same initial hash follow same probe sequence)

3. Double Hashing:
   - h(k, i) = (h1(k) + i × h2(k)) mod m
   - Best open addressing technique (uniform distribution)
   - h2(k) must be relatively prime to m

ROBIN HOOD HASHING:
- When inserting, if new element is farther from its ideal position than existing, swap
- Reduces variance in probe lengths
- Excellent performance in practice

CUCKOO HASHING

Properties:
- Uses two hash tables (or two hash functions in one table)
- Each key stored in one of two possible positions
- Lookup: O(1) worst-case (check both positions)
- Insert: May relocate existing keys (cuckoo behavior)

Cuckoo Insert Algorithm:
insert(key):
  for i in 1 to max_loops:
    pos1 = h1(key), pos2 = h2(key)
    if table[pos1] is empty: store, return
    else if table[pos2] is empty: store, return
    else:
      # kick out existing key at pos1
      old_key = table[pos1]
      table[pos1] = key
      key = old_key  # now insert old_key at its alternate position
  # if loop ends, rehash entire table

Cuckoo Hashing Performance:
- Lookup: O(1) worst-case (2 memory accesses)
- Delete: O(1)
- Insert: Amortized O(1) expected
- Load factor < 0.5 for 2 hash functions (can go higher with more functions)
- Space overhead: about 1.5× load factor max

Applications:
- High-performance hash tables (Facebook's F14, Google's Abseil flat_hash_map)
- Network routers (fast lookup)
- Databases (hash indexes)

BLOOM FILTERS

Properties:
- Space-efficient probabilistic data structure
- Tests membership: "possibly in set" or "definitely not in set"
- False positives possible, false negatives impossible
- Cannot delete elements (can use Counting Bloom Filter for deletions)

Structure:
- Bit array of size m
- k independent hash functions

Operations:
1. Insert(x):
   - For each hash i: set bit[h_i(x)] = 1

2. Query(x):
   - For each hash i: if bit[h_i(x)] == 0 → definitely NOT in set
   - All bits 1 → possibly in set (false positive possible)

False Positive Probability:
P = (1 - e^(-kn/m))^k
Optimal k = (m/n) × ln(2)

Applications:
- Web cache filtering (avoid caching one-hit wonders)
- Database query optimization (check if value exists before expensive lookup)
- Chromium browser uses it for malicious URL detection
- Bitcoin SPV nodes (verify transactions without full blockchain)
- Medium's recommendation system (avoid recommending seen articles)

TRIES AND COMPRESSED TRIES

TRIE (Prefix Tree):

Properties:
- Tree structure for storing strings
- Each node represents a character (not the whole string)
- Root = empty string
- End-of-word markers identify complete words

Trie Operations:
- Insert: O(L) where L = string length
- Search: O(L)
- Delete: O(L) (cleanup unused nodes)
- Prefix Search (autocomplete): O(L + output)
- Space: O(total characters × alphabet size) — can be large

Trie Node Structure (Array based):
class TrieNode:
  children: array[26] (for lowercase English)
  isEndOfWord: boolean

Trie Node Structure (Map based - memory efficient):
class TrieNode:
  children: Map<Character, TrieNode>
  isEndOfWord: boolean

Applications:
- Autocomplete and spell checkers
- IP routing (longest prefix matching)
- Word games (Boggle solver, Scrabble)
- Text search (prefix queries)
- Dictionary implementation

COMPRESSED TRIE (Radix Tree / Patricia Trie):

Properties:
- Space-optimized trie
- Compresses chains of single-child nodes
- Each node stores a string label (not single character)
- Also called: Radix Tree, Patricia Trie (Practical Algorithm To Retrieve Information Coded In Alphanumeric)

Example:
"bear", "bell", "bid", "bull", "sell", "stock", "stop"
Compressed trie merges common prefixes: "be", "b", "s" etc.

Advantages:
- Much less memory than standard trie
- Faster traversal (fewer nodes)
- Still O(L) operations but with better constants

SUFFIX TRIE AND SUFFIX ARRAY

Suffix Trie:
- Specialized trie containing all suffixes of a string
- Build: Insert every suffix of string S into trie
- Size: O(n²) space (too large for long strings)

Example: S = "banana"
Suffixes: "banana", "anana", "nana", "ana", "na", "a"

Suffix Trie Applications:
- Pattern matching: Check if substring P exists in O(|P|) time
- Longest repeated substring
- Longest common substring (two strings)
- Palindrome detection

Suffix Array (Space-efficient alternative):
- Array of starting indices of all suffixes, sorted lexicographically
- Space: O(n) (much smaller than suffix trie)
- Can be built in O(n) time using SA-IS algorithm

Example: S = "banana"
Suffixes: 0:banana, 1:anana, 2:nana, 3:ana, 4:na, 5:a
Sorted: 5:a, 3:ana, 1:anana, 0:banana, 4:na, 2:nana
Suffix Array: [5, 3, 1, 0, 4, 2]

LCP Array (Longest Common Prefix):
- LCP[i] = longest common prefix between suffix SA[i] and SA[i-1]
- Used with suffix array for full suffix tree functionality

Applications:
- Full-text search (faster than suffix trie)
- Bioinformatics (DNA sequence analysis)
- Data compression (Burrows-Wheeler Transform)
- Plagiarism detection

TERNARY SEARCH TREES (TST)

Properties:
- Hybrid of trie and binary search tree
- Each node has three children: lo (less), eq (equal), hi (greater)
- Stores characters in nodes (like trie but not fixed alphabet)

TST Node Structure:
class TSTNode:
  character: char
  isEnd: boolean
  left: TSTNode    # characters less than current char
  middle: TSTNode  # next character in word
  right: TSTNode   # characters greater than current char

TST Operations:
- Insert: O(L) with good constants
- Search: O(L) worst-case, O(log L) average
- Space: O(nodes) — more efficient than trie for sparse alphabets

TST vs Trie:
| Feature | Trie | Ternary Search Tree |
|---------|------|---------------------|
| Alphabet size impact | Large | Minimal |
| Space | O(total chars × alphabet) | O(total chars) |
| Cache friendly | No (pointer heavy) | Better |
| Performance | Very fast | Slightly slower |
| Use case | Fixed alphabet | Any character set |

Applications:
- Spell checkers (Unix spell command uses TST)
- Auto-complete in text editors
- Word games


UNIT V — GRAPH DATA STRUCTURES AND APPLICATIONS

GRAPH REPRESENTATIONS

Graph Components:
- Vertices/Nodes: points/entities
- Edges: connections between vertices
- Directed: edges have direction (one-way)
- Undirected: edges have no direction (two-way)
- Weighted: edges have numeric values (cost, distance)
- Unweighted: all edges equal

Adjacency Matrix:
- 2D array matrix[V][V]
- matrix[i][j] = 1 if edge i→j exists, else 0
- For weighted: matrix[i][j] = weight (infinity if no edge)
- Space: O(V²) (inefficient for sparse graphs)
- Edge lookup: O(1)
- Adding/removing edge: O(1)
- Iterating neighbors: O(V) (slow for sparse graphs)

Adjacency List (Most Common):
- Array of lists size V: adjList[i] contains all neighbors of vertex i
- For weighted: store (neighbor, weight) pairs
- Space: O(V + E) (efficient for sparse graphs)
- Edge lookup: O(degree) worst case
- Adding edge: O(1) amortized
- Iterating neighbors: O(degree) (fast)
- Implementation:
  - C++: vector<vector<int>> or vector<vector<pair<int,int>>>
  - Java: ArrayList<ArrayList<Integer>> or ArrayList<ArrayList<Edge>>
  - Python: defaultdict(list)

Edge List:
- Array of all edges (u, v, weight)
- Space: O(E)
- Used in algorithms that iterate all edges (Kruskal's MST)
- Not efficient for neighbor queries

Adjacency Matrix vs List:
| Property | Matrix | List |
|----------|--------|------|
| Space (sparse graph) | O(V²) wasted | O(V+E) optimal |
| Space (dense graph) | O(V²) efficient | O(V²) same |
| Check edge exists | O(1) | O(degree) |
| Iterate neighbors | O(V) | O(degree) |
| Add edge | O(1) | O(1) |
| Remove edge | O(1) | O(degree) |

GRAPH TRAVERSALS

BREADTH-FIRST SEARCH (BFS)

Properties:
- Explores vertices in layers (shortest path in unweighted graph)
- Uses Queue data structure
- Finds shortest path from source to all vertices (unweighted)
- Time: O(V + E)
- Space: O(V)

BFS Algorithm:
BFS(s):
  visited = array[V] false
  distance = array[V] infinity
  parent = array[V] -1
  queue = empty Queue
  
  visited[s] = true
  distance[s] = 0
  queue.enqueue(s)
  
  while queue not empty:
    u = queue.dequeue()
    for each v in adj[u]:
      if not visited[v]:
        visited[v] = true
        distance[v] = distance[u] + 1
        parent[v] = u
        queue.enqueue(v)

Applications of BFS:
- Shortest path in unweighted graph (Google Maps for unweighted)
- Web crawling (BFS ensures proximity to seed pages)
- Social networks (degrees of separation, friend suggestions)
- GPS navigation systems
- Minimum spanning tree (unweighted)
- Bipartite graph detection (check if graph is 2-colorable)
- Serialization/Deserialization of trees

DEPTH-FIRST SEARCH (DFS)

Properties:
- Explores as far as possible before backtracking
- Uses Stack (recursion or explicit stack)
- Time: O(V + E)
- Space: O(V) recursion stack

DFS Algorithm (Recursive):
DFS(u):
  visited[u] = true
  for each v in adj[u]:
    if not visited[v]:
      parent[v] = u
      DFS(v)

DFS Iterative (using stack):
DFS(s):
  stack = empty Stack
  stack.push(s)
  while stack not empty:
    u = stack.pop()
    if not visited[u]:
      visited[u] = true
      for each v in adj[u]:
        if not visited[v]:
          stack.push(v)

DFS Applications:
- Detecting cycles in directed graph
- Topological sorting (Kahn's algorithm or DFS with stack)
- Finding strongly connected components (Kosaraju's, Tarjan's)
- Solving mazes and puzzles
- Path existence between two vertices
- Tree traversals (preorder, inorder, postorder)
- Backtracking algorithms (N-Queens, Sudoku)

DFS vs BFS:
| Feature | BFS | DFS |
|---------|-----|-----|
| Data structure | Queue | Stack (recursion) |
| Shortest path (unweighted) | Yes | No |
| Space complexity | O(V) | O(V) (recursion depth) |
| Uses | Level-order, shortest path | Topological, cycle detection |
| Memory | More (stores entire level) | Less (path only) |

SHORTEST PATH ALGORITHMS

DIJKSTRA'S ALGORITHM

Properties:
- Finds shortest path from source to all vertices
- Works for weighted graphs with NON-NEGATIVE weights
- Greedy algorithm (always picks vertex with smallest distance)
- Time: O((V+E) log V) with binary heap priority queue

Dijkstra's Algorithm:
dijkstra(s):
  dist = array[V] infinity
  dist[s] = 0
  PQ = Min-Heap (priority queue)
  PQ.push((0, s))
  
  while PQ not empty:
    d, u = PQ.pop()
    if d > dist[u]: continue  # stale entry
    
    for (v, weight) in adj[u]:
      if dist[u] + weight < dist[v]:
        dist[v] = dist[u] + weight
        PQ.push((dist[v], v))
  
  return dist

Why Dijkstra fails with negative weights:
- Greedy assumption: once a node is processed (extracted from PQ), its distance is final
- Negative weights could allow a shorter path via an unprocessed node
- Solution for negative weights: Bellman-Ford algorithm

Applications:
- GPS navigation (Google Maps, Uber, Ola)
- Network routing protocols (OSPF - Open Shortest Path First)
- Social networks (shortest connection chains)
- Video games (pathfinding for AI characters)
- Robotics (motion planning)

BELLMAN-FORD ALGORITHM

Properties:
- Finds shortest path from source to all vertices
- Works with NEGATIVE edge weights (no negative cycles)
- Can detect negative weight cycles
- Time: O(V × E) (slower than Dijkstra for non-negative)

Bellman-Ford Algorithm:
bellmanFord(s):
  dist = array[V] infinity
  dist[s] = 0
  
  # Relax edges V-1 times
  for i in 1 to V-1:
    for each edge (u, v, weight):
      if dist[u] != infinity and dist[u] + weight < dist[v]:
        dist[v] = dist[u] + weight
  
  # Check for negative weight cycles
  for each edge (u, v, weight):
    if dist[u] != infinity and dist[u] + weight < dist[v]:
      return "Negative cycle detected"
  
  return dist

Relaxation:
- The process of improving distance estimate
- If dist[u] + w(u,v) < dist[v], update dist[v]

Applications:
- Currency arbitrage (negative cycle detection in exchange rates)
- Network routing with varying link costs
- Checking for negative cycles in graphs
- Differential constraint systems (solving inequalities)

Dijkstra vs Bellman-Ford:
| Feature | Dijkstra | Bellman-Ford |
|---------|----------|--------------|
| Time | O((V+E) log V) | O(V×E) |
| Negative weights | No | Yes |
| Negative cycles | Cannot detect | Can detect |
| Approach | Greedy | Dynamic Programming |
| Use case | GPS, fastest routes | Arbitrage, network with negative edges |

FLOYD-WARSHALL ALGORITHM
- All-pairs shortest path (shortest path between every pair)
- O(V³) time, O(V²) space
- Dynamic programming approach

MINIMUM SPANNING TREE (MST)

Definition:
- Spanning tree: Subgraph that includes all vertices and is a tree (V-1 edges, no cycles)
- Minimum Spanning Tree: Spanning tree with minimum total edge weight

Properties:
- For V vertices, MST has exactly V-1 edges
- If all weights are distinct, MST is unique
- Cut property: Minimum weight edge crossing a cut belongs to MST
- Cycle property: Maximum weight edge in a cycle is NOT in MST

PRIM'S ALGORITHM

Properties:
- Greedy algorithm builds MST by adding vertices one by one
- Similar to Dijkstra (uses priority queue)
- Best for dense graphs
- Time: O((V+E) log V) with binary heap, O(V²) with adjacency matrix

Prim's Algorithm:
prim(start):
  visited = array[V] false
  key = array[V] infinity  # minimum edge weight to connect
  parent = array[V] -1
  key[start] = 0
  
  PQ = Min-Heap (key, vertex)
  PQ.push((0, start))
  
  while PQ not empty:
    w, u = PQ.pop()
    if visited[u]: continue
    visited[u] = true
    
    for (v, weight) in adj[u]:
      if not visited[v] and weight < key[v]:
        key[v] = weight
        parent[v] = u
        PQ.push((weight, v))
  
  return parent  # edges (parent[i], i) form MST

KRUSKAL'S ALGORITHM

Properties:
- Greedy algorithm builds MST by adding smallest edges first
- Uses Union-Find (Disjoint Set) for cycle detection
- Best for sparse graphs
- Time: O(E log E) due to sorting edges

Kruskal's Algorithm:
kruskal():
  sort edges by weight ascending
  parent = array[V] initialized to -1 (or each as own set)
  mst_edges = []
  total_weight = 0
  
  for (u, v, weight) in sorted_edges:
    if find(u) != find(v):  # different components (no cycle)
      union(u, v)
      mst_edges.append((u, v, weight))
      total_weight += weight
      if len(mst_edges) == V-1: break
  
  return mst_edges, total_weight

Prim vs Kruskal:
| Feature | Prim | Kruskal |
|---------|------|---------|
| Approach | Vertex-based | Edge-based |
| Data structure | Priority Queue | Union-Find + Sort |
| Time complexity | O((V+E) log V) | O(E log E) |
| Best for | Dense graphs (E ≈ V²) | Sparse graphs (E ≈ V) |
| Cycle detection | visited array | Union-Find |

Applications of MST:
- Network design (LAN, cable TV, telephone networks)
- Power grid optimization
- Transportation planning (connect cities with minimum road length)
- Image segmentation (minimum cut)
- Cluster analysis (single-linkage clustering)
- Approximation algorithms (TSP)


LABORATORY SHORT NOTES

1. AVL TREE IMPLEMENTATION

Node Structure:
class Node:
  int key, height
  Node left, right

Functions:
int height(Node n): return n ? n.height : 0
int getBalance(Node n): return height(n.left) - height(n.right)
Node rightRotate(Node y) // LL rotation
Node leftRotate(Node x) // RR rotation
Node insert(Node root, int key):
  // BST insert, update height, check balance, apply rotation
Node delete(Node root, int key):
  // BST delete, update heights, rebalance
void inorder(Node root): traversal to display

2. RED-BLACK TREE IMPLEMENTATION

Properties (maintain during operations):
- Root is black
- Red nodes have black children
- All root-to-leaf paths have same black height

Insertion Cases:
1. New node at root → make black
2. Parent black → done
3. Parent and uncle red → recolor
4. Parent red, uncle black (triangle) → rotate, recolor
5. Parent red, uncle black (linear) → rotate grandparent, recolor

3. B-TREE / B+ TREE IMPLEMENTATION

B-Tree Node:
class BTreeNode:
  int[] keys
  BTreeNode[] children
  int degree (minimum children count = ceil(m/2))
  boolean isLeaf

Operations:
void splitChild(parent, childIndex)  # split full child
void insertNonFull(node, key)         # insert into non-full node
void insert(key): if root full, split, then insertNonFull
void delete(key): borrow/merge when underflow

4. SEGMENT TREE FOR RANGE QUERIES

class SegmentTree:
  int[] tree, arr
  int n

  build(node, start, end):
    if start == end: tree[node] = arr[start]
    else: mid = (start+end)/2; build children; tree[node] = combine

  query(node, start, end, l, r):
    if r < start or l > end: return neutral
    if l <= start and end <= r: return tree[node]
    return combine(query(left, l, r), query(right, l, r))

  update(node, start, end, idx, val):
    if start == end: tree[node] = val
    else: mid, recurse, tree[node] = combine

5. FENWICK TREE (BIT)

class FenwickTree:
  int[] BIT, n
  
  void update(idx, delta):
    while idx <= n: BIT[idx] += delta; idx += idx & -idx
  
  int sum(idx):
    int res = 0
    while idx > 0: res += BIT[idx]; idx -= idx & -idx
    return res
  
  int rangeSum(l, r): return sum(r) - sum(l-1)

6. UNION-FIND (DISJOINT SET)

class DisjointSet:
  int[] parent, rank
  
  find(x):
    if parent[x] != x: parent[x] = find(parent[x])
    return parent[x]
  
  union(x, y):
    x = find(x); y = find(y)
    if x == y: return
    if rank[x] < rank[y]: parent[x] = y
    else if rank[x] > rank[y]: parent[y] = x
    else: parent[y] = x; rank[x]++

7. HASHING (CUCKOO HASHING)

class CuckooHash:
  int[] table1, table2
  int size, capacity
  
  int hash1(key): return key % capacity
  int hash2(key): return (key / capacity) % capacity
  
  void insert(key):
    for (i = 0; i < MAX_LOOPS; i++):
      pos1 = hash1(key)
      if table1[pos1] is empty: store, return
      swap(key, table1[pos1])  # kick out
      # try alternate position for kicked key
      pos2 = hash2(key)
      if table2[pos2] is empty: store, return
      swap(key, table2[pos2])
    rehash()  # too many loops

8. TRIE IMPLEMENTATION

class TrieNode:
  TrieNode[] children = new TrieNode[26]
  boolean isEndOfWord

class Trie:
  TrieNode root
  
  void insert(String word):
    node = root
    for char c in word:
      idx = c - 'a'
      if node.children[idx] == null: node.children[idx] = new TrieNode()
      node = node.children[idx]
    node.isEndOfWord = true
  
  boolean search(String word):
    node = root
    for char c in word:
      idx = c - 'a'
      if node.children[idx] == null: return false
      node = node.children[idx]
    return node.isEndOfWord
  
  boolean startsWith(String prefix):
    node = root
    for char c in prefix:
      idx = c - 'a'
      if node.children[idx] == null: return false
      node = node.children[idx]
    return true

9. DIJKSTRA'S ALGORITHM (Using Min-Heap)

int[] dijkstra(List<Edge>[] adj, int src, int V):
  int[] dist = new int[V]
  Arrays.fill(dist, Integer.MAX_VALUE)
  dist[src] = 0
  PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[0]-b[0])
  pq.offer(new int[]{0, src})
  
  while (!pq.isEmpty()):
    int[] curr = pq.poll()
    int d = curr[0], u = curr[1]
    if (d > dist[u]) continue
    
    for (Edge e : adj[u]):
      int v = e.v, w = e.w
      if (dist[u] + w < dist[v]):
        dist[v] = dist[u] + w
        pq.offer(new int[]{dist[v], v})
  return dist

10. KRUSKAL'S ALGORITHM (Union-Find + Sort)

int kruskal(List<Edge> edges, int V):
  Collections.sort(edges, (a,b) -> a.w - b.w)
  DisjointSet ds = new DisjointSet(V)
  int totalWeight = 0, edgeCount = 0
  
  for (Edge e : edges):
    if (ds.find(e.u) != ds.find(e.v)):
      ds.union(e.u, e.v)
      totalWeight += e.w
      edgeCount++
      if (edgeCount == V-1) break
  return totalWeight

11. BFS AND DFS IMPLEMENTATIONS

BFS:
void bfs(List<Integer>[] adj, int s):
  boolean[] visited = new boolean[V]
  Queue<Integer> q = new LinkedList<>()
  visited[s] = true
  q.offer(s)
  
  while (!q.isEmpty()):
    int u = q.poll()
    System.out.print(u + " ")
    for (int v : adj[u]):
      if (!visited[v]):
        visited[v] = true
        q.offer(v)

DFS (Recursive):
void dfs(List<Integer>[] adj, boolean[] visited, int u):
  visited[u] = true
  System.out.print(u + " ")
  for (int v : adj[u]):
    if (!visited[v]):
      dfs(adj, visited, v)

12. MINI PROJECT IDEAS

Autocomplete Search Engine:
- Data Structure: Trie (prefix tree)
- Features: Insert words, search by prefix, display suggestions
- Extension: Frequency-based ranking (store count at each node)

Dynamic Connectivity Checker:
- Data Structure: Union-Find with Path Compression
- Features: Add connections, check if two nodes connected, find component size
- Extension: Support "undo" operation using persistent union-find

Shortest Path Visualizer:
- Data Structure: Graph (adjacency list) + Dijkstra/Prim
- Features: Display graph, find shortest path between cities, visualize MST
- Extension: Real-time visualization with Java Swing/JavaFX

Spell Checker:
- Data Structure: Ternary Search Tree or Bloom Filter
- Features: Dictionary load, word lookup, suggest corrections (Levenshtein distance)
- Extension: Auto-correct typing errors

Range Query Processor:
- Data Structure: Segment Tree or Fenwick Tree
- Features: Range sum/min/max queries, point updates
- Extension: Lazy propagation for range updates

Memory Allocator Simulator:
- Data Structure: Fibonacci Heap (for free blocks)
- Features: Allocate, free, merge adjacent free blocks
- Extension: Best-fit, worst-fit, first-fit allocation strategies
`;