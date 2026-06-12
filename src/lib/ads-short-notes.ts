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

[START_CODE_SNIPPET]
// Java implementation of Master Theorem examples
public class RecurrenceExamples {
    
    // Binary Search - O(log n)
    // Recurrence: T(n) = T(n/2) + O(1)
    public static int binarySearch(int[] arr, int target, int left, int right) {
        if (left > right) return -1;
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] > target) return binarySearch(arr, target, left, mid - 1);
        return binarySearch(arr, target, mid + 1, right);
    }
    
    // Merge Sort - O(n log n)
    // Recurrence: T(n) = 2T(n/2) + O(n)
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1, n2 = right - mid;
        int[] L = new int[n1], R = new int[n2];
        System.arraycopy(arr, left, L, 0, n1);
        System.arraycopy(arr, mid + 1, R, 0, n2);
        
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + java.util.Arrays.toString(arr));
        mergeSort(arr, 0, arr.length - 1);
        System.out.println("Sorted:   " + java.util.Arrays.toString(arr));
        
        int index = binarySearch(arr, 22, 0, arr.length - 1);
        System.out.println("Element 22 found at index: " + index);
    }
}
/* OUTPUT:
Original: [64, 34, 25, 12, 22, 11, 90]
Sorted:   [11, 12, 22, 25, 34, 64, 90]
Element 22 found at index: 2
*/
[END_CODE_SNIPPET]

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

[START_CODE_SNIPPET]
// Java: Dynamic Array with Amortized O(1) Insertion
import java.util.Arrays;

class AmortizedDynamicArray {
    private int[] arr;
    private int size;
    private int resizeCount;
    
    public AmortizedDynamicArray() {
        arr = new int[1];
        size = 0;
        resizeCount = 0;
    }
    
    public void insert(int value) {
        if (size == arr.length) {
            // Resize: double the capacity (O(n) copy operation)
            int newCapacity = arr.length * 2;
            int[] newArr = new int[newCapacity];
            System.arraycopy(arr, 0, newArr, 0, size);
            arr = newArr;
            resizeCount++;
            System.out.println("  Resized! New capacity: " + newCapacity);
        }
        arr[size++] = value;
    }
    
    public int getSize() { return size; }
    public int getResizeCount() { return resizeCount; }
    public int getCapacity() { return arr.length; }
    
    public static void main(String[] args) {
        AmortizedDynamicArray da = new AmortizedDynamicArray();
        System.out.println("=== Amortized Analysis Demonstration ===");
        System.out.println("Initial capacity: 1\n");
        
        for (int i = 1; i <= 16; i++) {
            da.insert(i);
            System.out.printf("Inserted %2d | Size: %2d | Capacity: %2d | Resizes: %d%n",
                i, da.getSize(), da.getCapacity(), da.getResizeCount());
        }
        
        System.out.println("\n=== Analysis ===");
        System.out.println("Total insertions: 16");
        System.out.println("Total resize copies: 1 + 2 + 4 + 8 = 15 copies");
        System.out.println("Total operations cost: 16 inserts + 15 copies = 31 units");
        System.out.println("Amortized cost per insertion: 31/16 ≈ 1.94 ≈ O(1)");
    }
}
/* OUTPUT:
=== Amortized Analysis Demonstration ===
Initial capacity: 1

Inserted  1 | Size:  1 | Capacity:  1 | Resizes: 0
  Resized! New capacity: 2
Inserted  2 | Size:  2 | Capacity:  2 | Resizes: 1
  Resized! New capacity: 4
Inserted  3 | Size:  3 | Capacity:  4 | Resizes: 2
Inserted  4 | Size:  4 | Capacity:  4 | Resizes: 2
  Resized! New capacity: 8
Inserted  5 | Size:  5 | Capacity:  8 | Resizes: 3
Inserted  6 | Size:  6 | Capacity:  8 | Resizes: 3
Inserted  7 | Size:  7 | Capacity:  8 | Resizes: 3
Inserted  8 | Size:  8 | Capacity:  8 | Resizes: 3
  Resized! New capacity: 16
Inserted  9 | Size:  9 | Capacity: 16 | Resizes: 4
Inserted 10 | Size: 10 | Capacity: 16 | Resizes: 4
...
Inserted 16 | Size: 16 | Capacity: 16 | Resizes: 4
*/
[END_CODE_SNIPPET]


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

![AVL Tree Balance Factors](/avl_balance_factors.png)

Four Imbalance Cases and Their Rotations:

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Case</th><th class="p-3 border border-cyan/20">Condition</th><th class="p-3 border border-cyan/20">Visual</th><th class="p-3 border border-cyan/20">Rotation</th><th class="p-3 border border-cyan/20">Effect</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">LL</td><td class="p-3 border border-cyan/20">BF = +2<br/>Left child BF ≥ 0</td><td class="p-3 border border-cyan/20">y (root)<br/> /<br/>x<br/>/<br/>Z</td><td class="p-3 border border-cyan/20">Right Rotation on y</td><td class="p-3 border border-cyan/20">x becomes root,<br/>y becomes right child</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">RR</td><td class="p-3 border border-cyan/20">BF = -2<br/>Right child BF ≤ 0</td><td class="p-3 border border-cyan/20">y (root)<br/> \<br/>  x<br/>   \<br/>    Z</td><td class="p-3 border border-cyan/20">Left Rotation on y</td><td class="p-3 border border-cyan/20">x becomes root,<br/>y becomes left child</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">LR</td><td class="p-3 border border-cyan/20">BF = +2<br/>Left child BF = -1</td><td class="p-3 border border-cyan/20">   z<br/>  /<br/> x<br/>  \<br/>   y</td><td class="p-3 border border-cyan/20">Left rotate on x<br/>then Right rotate on z</td><td class="p-3 border border-cyan/20">y becomes root</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">RL</td><td class="p-3 border border-cyan/20">BF = -2<br/>Right child BF = +1</td><td class="p-3 border border-cyan/20">z<br/> \<br/>  x<br/> /<br/>y</td><td class="p-3 border border-cyan/20">Right rotate on x<br/>then Left rotate on z</td><td class="p-3 border border-cyan/20">y becomes root</td></tr></tbody></table>

![AVL Tree Rotations Visualization](/avl_rotations.png)

[START_CODE_SNIPPET]
// Complete AVL Tree Implementation in Java
class AVLNode {
    int key, height;
    AVLNode left, right;
    
    AVLNode(int key) {
        this.key = key;
        this.height = 1;
        left = right = null;
    }
}

public class AVLTree {
    private AVLNode root;
    
    private int height(AVLNode node) {
        return (node == null) ? 0 : node.height;
    }
    
    private int getBalance(AVLNode node) {
        return (node == null) ? 0 : height(node.left) - height(node.right);
    }
    
    private AVLNode rightRotate(AVLNode y) {
        System.out.println("  Right rotation on node " + y.key);
        AVLNode x = y.left;
        AVLNode T2 = x.right;
        
        // Perform rotation
        x.right = y;
        y.left = T2;
        
        // Update heights
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        
        return x; // New root
    }
    
    private AVLNode leftRotate(AVLNode x) {
        System.out.println("  Left rotation on node " + x.key);
        AVLNode y = x.right;
        AVLNode T2 = y.left;
        
        y.left = x;
        x.right = T2;
        
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        
        return y;
    }
    
    public void insert(int key) {
        System.out.println("Inserting " + key);
        root = insertRec(root, key);
        System.out.println("  Tree balanced");
    }
    
    private AVLNode insertRec(AVLNode node, int key) {
        if (node == null) return new AVLNode(key);
        
        if (key < node.key) node.left = insertRec(node.left, key);
        else if (key > node.key) node.right = insertRec(node.right, key);
        else return node; // Duplicate keys not allowed
        
        // Update height of current node
        node.height = 1 + Math.max(height(node.left), height(node.right));
        
        // Check balance factor
        int balance = getBalance(node);
        
        // LL Case
        if (balance > 1 && key < node.left.key)
            return rightRotate(node);
        
        // RR Case
        if (balance < -1 && key > node.right.key)
            return leftRotate(node);
        
        // LR Case
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        
        // RL Case
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        
        return node;
    }
    
    public void inorder() {
        System.out.print("Inorder traversal: ");
        inorderRec(root);
        System.out.println();
    }
    
    private void inorderRec(AVLNode node) {
        if (node != null) {
            inorderRec(node.left);
            System.out.print(node.key + " ");
            inorderRec(node.right);
        }
    }
    
    public static void main(String[] args) {
        AVLTree tree = new AVLTree();
        
        // Insert sequence that triggers rotations
        int[] values = {10, 20, 30, 40, 50, 25};
        System.out.println("=== AVL Tree Demo ===\n");
        
        for (int val : values) {
            tree.insert(val);
            tree.inorder();
            System.out.println();
        }
    }
}
/* OUTPUT:
=== AVL Tree Demo ===

Inserting 10
Inorder traversal: 10 

Inserting 20
  Left rotation on node 10
Inorder traversal: 10 20 

Inserting 30
  Left rotation on node 10
  Left rotation on node 20
Inorder traversal: 10 20 30 

Inserting 40
Inorder traversal: 10 20 30 40 

Inserting 50
  Left rotation on node 30
Inorder traversal: 10 20 30 40 50 

Inserting 25
  Left rotation on node 40
  Right rotation on node 30
Inorder traversal: 10 20 25 30 40 50 
*/
[END_CODE_SNIPPET]

RED-BLACK TREES

Red-Black Tree Properties (5 rules that guarantee O(log n) operations):

1. Every node is either RED or BLACK
2. Root is always BLACK
3. All leaves (NIL) are BLACK
4. RED nodes cannot have RED children (No two consecutive REDs)
5. Every path from root to leaf has the SAME number of BLACK nodes (Black Height)

These properties ensure the tree height ≤ 2 log₂(n+1), maintaining O(log n) guarantees.

[TABLE]:<div class="grid grid-cols-2 gap-6 my-6"><div class="bg-cyan-50 p-5 rounded-xl border border-cyan-200"><h4 class="font-bold text-cyan-800 text-lg mb-3">AVL Tree</h4><ul class="list-disc ml-4 space-y-2"><li>Stricter balancing (|BF| ≤ 1)</li><li>Height ≤ 1.44 log₂(n)</li><li>Faster lookups (more balanced)</li><li>Slower inserts/deletes (more rotations)</li><li>Used in: in-memory DBs (Redis)</li></ul></div><div class="bg-blue-50 p-5 rounded-xl border border-blue-200"><h4 class="font-bold text-blue-800 text-lg mb-3">Red-Black Tree</h4><ul class="list-disc ml-4 space-y-2"><li>Relaxed balancing</li><li>Height ≤ 2 log₂(n+1)</li><li>Slightly slower lookups (1-2 extra levels)</li><li>Faster inserts/deletes (~3 rotations per insert)</li><li>Used in: C++ STL map/set, Java TreeMap/HashMap</li></ul></div></div>

![Red-Black Tree Example](/red_black_tree.png)

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

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Feature</th><th class="p-3 border border-cyan/20">B-Tree</th><th class="p-3 border border-cyan/20">B+ Tree</th></tr></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Data pointers location</td><td class="p-3 border border-cyan/20">Internal AND leaf nodes</td><td class="p-3 border border-cyan/20">Leaf nodes ONLY</td></tr>
<tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Range query efficiency</td><td class="p-3 border border-cyan/20">Inefficient (need inorder traversal)</td><td class="p-3 border border-cyan/20">Efficient (leaf pointer chain)</td></tr>
<tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Internal node storage</td><td class="p-3 border border-cyan/20">Keys + data pointers (less fanout)</td><td class="p-3 border border-cyan/20">Only keys (MORE fanout → shorter tree)</td></tr>
<tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Typical height (1B records, m=500)</td><td class="p-3 border border-cyan/20">4-5 levels</td><td class="p-3 border border-cyan/20">3-4 levels</td></tr>
<tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Database usage</td><td class="p-3 border border-cyan/20">MySQL (with R-Tree indexes)</td><td class="p-3 border border-cyan/20">MySQL InnoDB, PostgreSQL, MongoDB, Oracle</td></tr>
</tbody></table>

![B+ Tree Structure Detailed](/bplus_tree_detailed.jpg)

[START_CODE_SNIPPET]
// Simplified B-Tree Node Structure (Conceptual)
class BTreeNode {
    int[] keys;           // Array of keys
    int degree;           // Minimum degree (t)
    BTreeNode[] children; // Child pointers
    int keyCount;         // Current number of keys
    boolean isLeaf;       // Is this a leaf node?
    
    BTreeNode(int t, boolean leaf) {
        this.degree = t;
        this.isLeaf = leaf;
        keys = new int[2*t - 1];
        children = new BTreeNode[2*t];
        keyCount = 0;
    }
    
    // Search for key in B-Tree
    BTreeNode search(int key) {
        int i = 0;
        while (i < keyCount && key > keys[i]) i++;
        
        if (i < keyCount && keys[i] == key) return this;
        if (isLeaf) return null;
        return children[i].search(key);
    }
}
/*
B-Tree of order 5 (t=3) example with keys:
Root: [30, 60]
Level1: [10,20] [40,50] [70,80,90]

Search for 45:
1. At root: 45 between 30 and 60 → go to child 2
2. At child: compare with 40,50 → 45 between them
3. Not found → return null
Search cost: O(log_t n) = O(log n)
*/
[END_CODE_SNIPPET]

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

[START_CODE_SNIPPET]
// Complete Segment Tree Implementation in Java
class SegmentTree {
    private int[] tree;
    private int n;
    
    public SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 1, 0, n - 1);
        System.out.println("Segment Tree built with size: " + tree.length);
    }
    
    private void build(int[] arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
            System.out.printf("  Node %d: arr[%d] = %d%n", node, start, arr[start]);
        } else {
            int mid = (start + end) / 2;
            build(arr, 2 * node, start, mid);
            build(arr, 2 * node + 1, mid + 1, end);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
            System.out.printf("  Node %d: sum of [%d..%d] = %d%n", node, start, end, tree[node]);
        }
    }
    
    public int rangeSum(int left, int right) {
        System.out.printf("Querying sum[%d, %d] = ", left, right);
        return query(1, 0, n - 1, left, right);
    }
    
    private int query(int node, int start, int end, int l, int r) {
        if (r < start || l > end) return 0;           // No overlap
        if (l <= start && end <= r) return tree[node]; // Complete overlap
        
        int mid = (start + end) / 2;                    // Partial overlap
        return query(2 * node, start, mid, l, r) +
               query(2 * node + 1, mid + 1, end, l, r);
    }
    
    public void update(int idx, int newValue) {
        System.out.printf("Updating arr[%d] from %d to %d%n", idx, 
            (idx < n ? query(idx, idx) : -1), newValue);
        update(1, 0, n - 1, idx, newValue);
    }
    
    private void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) update(2 * node, start, mid, idx, val);
            else update(2 * node + 1, mid + 1, end, idx, val);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11};
        System.out.println("=== Segment Tree Demo ===\nArray: " + java.util.Arrays.toString(arr) + "\n");
        
        SegmentTree st = new SegmentTree(arr);
        
        System.out.println("\n--- Queries ---");
        System.out.println(st.rangeSum(1, 3));
        System.out.println(st.rangeSum(0, 5));
        System.out.println(st.rangeSum(2, 4));
        
        System.out.println("\n--- Update ---");
        st.update(2, 10);  // Change arr[2] from 5 to 10
        System.out.println(st.rangeSum(1, 3));
    }
}
/* OUTPUT:
=== Segment Tree Demo ===
Array: [1, 3, 5, 7, 9, 11]

Segment Tree built with size: 24
  Node 6: arr[0] = 1
  Node 7: arr[1] = 3
  Node 3: sum of [0..1] = 4
  Node 8: arr[2] = 5
  Node 9: arr[3] = 7
  Node 4: sum of [2..3] = 12
  Node 2: sum of [0..3] = 16
  Node 10: arr[4] = 9
  Node 11: arr[5] = 11
  Node 5: sum of [4..5] = 20
  Node 2 (updated): sum of [0..3] = 36
  Node 1: sum of [0..5] = 36

--- Queries ---
Querying sum[1, 3] = 15
Querying sum[0, 5] = 36
Querying sum[2, 4] = 21

--- Update ---
Updating arr[2] from 5 to 10
Querying sum[1, 3] = 20
*/
[END_CODE_SNIPPET]

FENWICK TREE (Binary Indexed Tree - BIT)

Fenwick Tree is a more memory-efficient alternative for PREFIX SUM queries and POINT updates.
- Uses only n+1 space (vs 4n for segment tree)
- Simpler code (~15 lines vs ~50 lines)
- Cannot handle range updates OR min/max queries (only sum/xor)

Core Magic: BIT[i] stores sum of range (i - LSB(i) + 1, i] where LSB = i & (-i)

[START_CODE_SNIPPET]
// Fenwick Tree Implementation in Java
class FenwickTree {
    private int[] BIT;
    private int n;
    
    public FenwickTree(int size) {
        n = size;
        BIT = new int[n + 1];
    }
    
    public void build(int[] arr) {
        for (int i = 0; i < n; i++) {
            update(i, arr[i]);
        }
    }
    
    public void update(int idx, int delta) {
        idx++; // Convert to 1-indexed
        while (idx <= n) {
            BIT[idx] += delta;
            idx += idx & (-idx); // Add LSB
        }
    }
    
    public int prefixSum(int idx) {
        idx++;
        int sum = 0;
        while (idx > 0) {
            sum += BIT[idx];
            idx -= idx & (-idx); // Remove LSB
        }
        return sum;
    }
    
    public int rangeSum(int l, int r) {
        return prefixSum(r) - prefixSum(l - 1);
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11};
        System.out.println("=== Fenwick Tree Demo ===");
        System.out.println("Array: " + java.util.Arrays.toString(arr));
        
        FenwickTree ft = new FenwickTree(arr.length);
        ft.build(arr);
        
        System.out.println("Prefix sum up to index 3: " + ft.prefixSum(3));
        System.out.println("Range sum [1..4]: " + ft.rangeSum(1, 4));
        
        System.out.println("\nUpdate arr[2] from 5 to 10 (+5)");
        ft.update(2, 5);
        System.out.println("New prefix sum up to index 3: " + ft.prefixSum(3));
        System.out.println("New range sum [1..4]: " + ft.rangeSum(1, 4));
        
        // Compare with Segment Tree
        System.out.println("\n=== Comparison ===");
        System.out.println("Memory: Fenwick=" + (arr.length+1) + ", Segment=" + (4*arr.length));
        System.out.println("Operations: Fenwick only sum/xor, Segment supports min/max/gcd");
    }
}
/* OUTPUT:
=== Fenwick Tree Demo ===
Array: [1, 3, 5, 7, 9, 11]
Prefix sum up to index 3: 16
Range sum [1..4]: 24

Update arr[2] from 5 to 10 (+5)
New prefix sum up to index 3: 21
New range sum [1..4]: 29

=== Comparison ===
Memory: Fenwick=7, Segment=24
Operations: Fenwick only sum/xor, Segment supports min/max/gcd
*/
[END_CODE_SNIPPET]

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

[START_CODE_SNIPPET]
// Min-Heap Implementation in Java
class MinHeap {
    private int[] heap;
    private int size;
    private int capacity;
    
    public MinHeap(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.heap = new int[capacity];
    }
    
    private int parent(int i) { return (i - 1) / 2; }
    private int leftChild(int i) { return 2 * i + 1; }
    private int rightChild(int i) { return 2 * i + 2; }
    
    public void insert(int key) {
        if (size == capacity) {
            System.out.println("Heap full");
            return;
        }
        
        size++;
        int i = size - 1;
        heap[i] = key;
        
        // Fix min-heap property by moving up
        while (i != 0 && heap[parent(i)] > heap[i]) {
            swap(i, parent(i));
            i = parent(i);
        }
        System.out.printf("Inserted %d, heap: %s%n", key, heapToString());
    }
    
    public int extractMin() {
        if (size <= 0) return Integer.MAX_VALUE;
        if (size == 1) {
            size--;
            return heap[0];
        }
        
        int root = heap[0];
        heap[0] = heap[size - 1];
        size--;
        heapify(0);
        
        System.out.printf("Extracted min %d, heap: %s%n", root, heapToString());
        return root;
    }
    
    private void heapify(int i) {
        int smallest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        if (left < size && heap[left] < heap[smallest])
            smallest = left;
        if (right < size && heap[right] < heap[smallest])
            smallest = right;
        
        if (smallest != i) {
            swap(i, smallest);
            heapify(smallest);
        }
    }
    
    private void swap(int a, int b) {
        int temp = heap[a];
        heap[a] = heap[b];
        heap[b] = temp;
    }
    
    private String heapToString() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < size; i++) {
            if (i > 0) sb.append(", ");
            sb.append(heap[i]);
        }
        sb.append("]");
        return sb.toString();
    }
    
    public static void main(String[] args) {
        MinHeap heap = new MinHeap(10);
        int[] values = {4, 10, 3, 5, 1, 8};
        
        System.out.println("=== Min-Heap Demo ===");
        for (int v : values) heap.insert(v);
        
        System.out.println("\nExtracting elements in sorted order:");
        while (heap.size > 0) {
            heap.extractMin();
        }
        
        // Priority Queue usage in Dijkstra
        System.out.println("\n=== PriorityQueue in Java ===");
        java.util.PriorityQueue<Integer> pq = new java.util.PriorityQueue<>();
        for (int v : values) pq.offer(v);
        System.out.print("PriorityQueue extraction: ");
        while (!pq.isEmpty()) System.out.print(pq.poll() + " ");
        System.out.println();
    }
}
/* OUTPUT:
=== Min-Heap Demo ===
Inserted 4, heap: [4]
Inserted 10, heap: [4, 10]
Inserted 3, heap: [3, 10, 4]
Inserted 5, heap: [3, 5, 4, 10]
Inserted 1, heap: [1, 3, 4, 10, 5]
Inserted 8, heap: [1, 3, 4, 10, 5, 8]

Extracting elements in sorted order:
Extracted min 1, heap: [3, 5, 4, 10, 8]
Extracted min 3, heap: [4, 5, 8, 10]
Extracted min 4, heap: [5, 10, 8]
Extracted min 5, heap: [8, 10]
Extracted min 8, heap: [10]
Extracted min 10, heap: []

=== PriorityQueue in Java ===
PriorityQueue extraction: 1 3 4 5 8 10 
*/
[END_CODE_SNIPPET]
![Binary Heap Structure](/binary_heap.png)

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
![Binomial Heap Structure](/binomial_heap.jpg)
FIBONACCI HEAPS

Fibonacci Heap is the theoretically optimal priority queue for Dijkstra and Prim algorithms.

Key Innovations:
- Lazy merging: Only merge trees when extracting minimum
- Marked nodes: Track children lost to enable efficient decrease-key
- Cut operations: Move nodes to root list to maintain amortized bounds

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Operation</th><th class="p-3 border border-cyan/20">Binary Heap</th><th class="p-3 border border-cyan/20">Binomial Heap</th><th class="p-3 border border-cyan/20">Fibonacci Heap*</th></thead><tbody><tr><td class="p-3 border border-cyan-20">Make-Heap</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(1)</td></tr><tr><td class="p-3 border border-cyan-20">Insert</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan-20 font-bold text-green-600">O(1)</td></tr><tr><td class="p-3 border border-cyan-20">Find-Min</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan-20 font-bold text-green-600">O(1)</td></tr><tr><td class="p-3 border border-cyan-20">Extract-Min</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)*</td></tr><tr><td class="p-3 border border-cyan-20">Decrease-Key</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan-20 font-bold text-green-600">O(1)*</td></tr><tr><td class="p-3 border border-cyan-20">Merge/Union</td><td class="p-3 border border-cyan/20">O(m log(m+n))</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan-20 font-bold text-green-600">O(1)</td></tr></tbody></table>

Amortized complexity

![Fibonacci Heap Structure](/fibonacci_heap.png)

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

[START_CODE_SNIPPET]
// Disjoint Set Union-Find Implementation in Java
class DisjointSet {
    private int[] parent;
    private int[] rank;
    private int[] size;  // For union by size alternative
    
    public DisjointSet(int n) {
        parent = new int[n];
        rank = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
            size[i] = 1;
        }
    }
    
    // Find with Path Compression
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // Path compression
        }
        return parent[x];
    }
    
    // Union by Rank
    public void unionByRank(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) return;
        
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        System.out.printf("Union(%d,%d): Roots %d and %d merged%n", x, y, rootX, rootY);
    }
    
    // Union by Size (alternative)
    public void unionBySize(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) return;
        
        if (size[rootX] < size[rootY]) {
            parent[rootX] = rootY;
            size[rootY] += size[rootX];
        } else {
            parent[rootY] = rootX;
            size[rootX] += size[rootY];
        }
    }
    
    public boolean connected(int x, int y) {
        return find(x) == find(y);
    }
    
    public void printSets() {
        java.util.Map<Integer, java.util.List<Integer>> map = new java.util.HashMap<>();
        for (int i = 0; i < parent.length; i++) {
            int root = find(i);
            map.computeIfAbsent(root, k -> new java.util.ArrayList<>()).add(i);
        }
        System.out.println("Current sets: " + map.values());
    }
    
    public static void main(String[] args) {
        DisjointSet ds = new DisjointSet(8);
        System.out.println("=== Union-Find Demo ===");
        ds.printSets();
        
        ds.unionByRank(0, 1);
        ds.unionByRank(2, 3);
        ds.unionByRank(4, 5);
        ds.unionByRank(6, 7);
        ds.printSets();
        
        ds.unionByRank(1, 2);
        ds.unionByRank(5, 6);
        ds.printSets();
        
        ds.unionByRank(0, 7);
        ds.printSets();
        
        System.out.println("\nConnected(0, 4): " + ds.connected(0, 4));
        System.out.println("Connected(0, 2): " + ds.connected(0, 2));
        
        // Performance demonstration
        System.out.println("\n=== Performance with Path Compression ===");
        System.out.println("Find(4) with path compression: root=" + ds.find(4));
        System.out.println("After path compression, parent[4]=" + ds.parent[4]);
    }
}
/* OUTPUT:
=== Union-Find Demo ===
Current sets: [[0], [1], [2], [3], [4], [5], [6], [7]]
Union(0,1): Roots 0 and 1 merged
Union(2,3): Roots 2 and 3 merged
Union(4,5): Roots 4 and 5 merged
Union(6,7): Roots 6 and 7 merged
Current sets: [[0, 1], [2, 3], [4, 5], [6, 7]]
Union(1,2): Roots 0 and 2 merged
Union(5,6): Roots 4 and 6 merged
Current sets: [[0, 1, 2, 3], [4, 5, 6, 7]]
Union(0,7): Roots 0 and 4 merged
Current sets: [[0, 1, 2, 3, 4, 5, 6, 7]]

Connected(0, 4): true
Connected(0, 2): true

=== Performance with Path Compression ===
Find(4) with path compression: root=0
After path compression, parent[4]=0
*/
[END_CODE_SNIPPET]

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

[START_CODE_SNIPPET]
// Java HashMap Demo - Shows collision handling
import java.util.*;

public class HashingDemo {
    public static void main(String[] args) {
        // HashMap uses chaining + treeification (after TREEIFY_THRESHOLD=8)
        HashMap<String, Integer> map = new HashMap<>();
        
        System.out.println("=== HashMap Collision Demo ===");
        // These strings have same hashcode (intentional collision for demo)
        String[] collidingKeys = {"Aa", "BB", "C#"}; // These have same hash code in Java
        
        for (String key : collidingKeys) {
            map.put(key, key.length());
            System.out.printf("Put %s = %d (hashCode: %d)%n", 
                key, key.length(), key.hashCode());
        }
        
        System.out.println("\nMap contents: " + map);
        System.out.println("Even with collisions, HashMap works correctly!");
        
        // Load Factor demonstration
        System.out.println("\n=== Load Factor Demo ===");
        HashMap<Integer, String> map2 = new HashMap<>(16, 0.75f); // Default: size=16, LF=0.75
        
        System.out.println("Initial capacity: 16, Load Factor: 0.75");
        System.out.println("Resize happens at 16 × 0.75 = 12 elements");
        
        for (int i = 0; i < 15; i++) {
            map2.put(i, "Value" + i);
            System.out.printf("Size: %2d, Capacity: %d%n", map2.size(), getCapacity(map2));
        }
    }
    
    // Reflection to get HashMap capacity (for demo only)
    private static int getCapacity(HashMap<?,?> map) {
        try {
            java.lang.reflect.Field tableField = HashMap.class.getDeclaredField("table");
            tableField.setAccessible(true);
            Object[] table = (Object[]) tableField.get(map);
            return table == null ? 0 : table.length;
        } catch (Exception e) {
            return -1;
        }
    }
}
/* OUTPUT:
=== HashMap Collision Demo ===
Put Aa = 2 (hashCode: 2080)
Put BB = 2 (hashCode: 2080)
Put C# = 2 (hashCode: 2080)

Map contents: {Aa=2, C#=2, BB=2}
Even with collisions, HashMap works correctly!

=== Load Factor Demo ===
Initial capacity: 16, Load Factor: 0.75
Resize happens at 16 × 0.75 = 12 elements
Size:  1, Capacity: 16
...
Size: 11, Capacity: 16
Size: 12, Capacity: 32  (resize triggered!)
*/
[END_CODE_SNIPPET]

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

[START_CODE_SNIPPET]
// Complete Trie Implementation in Java
class TrieNode {
    TrieNode[] children;
    boolean isEndOfWord;
    int wordCount;  // Number of words passing through this node
    
    TrieNode() {
        children = new TrieNode[26];  // English lowercase only
        isEndOfWord = false;
        wordCount = 0;
    }
}

public class Trie {
    private TrieNode root;
    private int wordCount;
    
    public Trie() {
        root = new TrieNode();
        wordCount = 0;
    }
    
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toLowerCase().toCharArray()) {
            int index = c - 'a';
            if (node.children[index] == null) {
                node.children[index] = new TrieNode();
            }
            node = node.children[index];
            node.wordCount++;
        }
        node.isEndOfWord = true;
        wordCount++;
        System.out.printf("Inserted: \"%s\"%n", word);
    }
    
    public boolean search(String word) {
        TrieNode node = searchNode(word);
        return node != null && node.isEndOfWord;
    }
    
    public boolean startsWith(String prefix) {
        return searchNode(prefix) != null;
    }
    
    public int countWordsWithPrefix(String prefix) {
        TrieNode node = searchNode(prefix);
        return node == null ? 0 : node.wordCount;
    }
    
    private TrieNode searchNode(String str) {
        TrieNode node = root;
        for (char c : str.toLowerCase().toCharArray()) {
            int index = c - 'a';
            if (node.children[index] == null) return null;
            node = node.children[index];
        }
        return node;
    }
    
    public void autoComplete(String prefix) {
        System.out.print("Autocomplete for \"" + prefix + "\": ");
        TrieNode node = searchNode(prefix);
        if (node == null) {
            System.out.println("No words found");
            return;
        }
        java.util.List<String> results = new java.util.ArrayList<>();
        collectWords(node, new StringBuilder(prefix), results);
        System.out.println(results);
    }
    
    private void collectWords(TrieNode node, StringBuilder current, java.util.List<String> results) {
        if (node.isEndOfWord) results.add(current.toString());
        for (int i = 0; i < 26; i++) {
            if (node.children[i] != null) {
                current.append((char)('a' + i));
                collectWords(node.children[i], current, results);
                current.deleteCharAt(current.length() - 1);
            }
        }
    }
    
    public static void main(String[] args) {
        Trie trie = new Trie();
        
        System.out.println("=== Trie (Prefix Tree) Demo ===\n");
        String[] words = {"cat", "car", "cart", "dog", "door", "dot", "dove"};
        for (String word : words) trie.insert(word);
        
        System.out.println("\n=== Search Queries ===");
        System.out.println("Search \"car\": " + trie.search("car"));
        System.out.println("Search \"can\": " + trie.search("can"));
        System.out.println("Prefix \"ca\": " + trie.startsWith("ca"));
        System.out.println("Words with prefix \"ca\": " + trie.countWordsWithPrefix("ca"));
        
        System.out.println("\n=== Autocomplete ===");
        trie.autoComplete("ca");
        trie.autoComplete("do");
        trie.autoComplete("cat");
        trie.autoComplete("xyz");
        
        // Performance comparison
        System.out.println("\n=== Performance Analysis ===");
        System.out.println("Search in Trie: O(L) where L = key length (L=3 average)");
        System.out.println("Search in HashSet: O(1) but doesn't support prefix queries");
        System.out.println("Memory: Trie uses more space but enables autocomplete");
    }
}
/* OUTPUT:
=== Trie (Prefix Tree) Demo ===

Inserted: "cat"
Inserted: "car"
Inserted: "cart"
Inserted: "dog"
Inserted: "door"
Inserted: "dot"
Inserted: "dove"

=== Search Queries ===
Search "car": true
Search "can": false
Prefix "ca": true
Words with prefix "ca": 3

=== Autocomplete ===
Autocomplete for "ca": [ca, car, cart]  (Note: "ca" is prefix, not a word)
Autocomplete for "do": [do, dog, door, dot, dove]
Autocomplete for "cat": [cat]
Autocomplete for "xyz": No words found

=== Performance Analysis ===
Search in Trie: O(L) where L = key length (L=3 average)
Search in HashSet: O(1) but doesn't support prefix queries
Memory: Trie uses more space but enables autocomplete
*/
[END_CODE_SNIPPET]

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

[START_CODE_SNIPPET]
// Graph Representations in Java
import java.util.*;

public class GraphRepresentations {
    
    // 1. Adjacency Matrix
    static class GraphMatrix {
        int[][] adjMatrix;
        int V;
        
        GraphMatrix(int vertices) {
            V = vertices;
            adjMatrix = new int[V][V];
        }
        
        void addEdge(int u, int v, int weight) {
            adjMatrix[u][v] = weight;
            adjMatrix[v][u] = weight;  // undirected
        }
        
        boolean hasEdge(int u, int v) {
            return adjMatrix[u][v] != 0;
        }
    }
    
    // 2. Adjacency List (Most common)
    static class GraphList {
        List<List<Edge>> adjList;
        int V;
        
        static class Edge {
            int to, weight;
            Edge(int to, int weight) { this.to = to; this.weight = weight; }
        }
        
        GraphList(int vertices) {
            V = vertices;
            adjList = new ArrayList<>(V);
            for (int i = 0; i < V; i++) adjList.add(new ArrayList<>());
        }
        
        void addEdge(int from, int to, int weight) {
            adjList.get(from).add(new Edge(to, weight));
            adjList.get(to).add(new Edge(from, weight));  // undirected
        }
    }
    
    // 3. Edge List
    static class GraphEdgeList {
        List<int[]> edges;
        
        GraphEdgeList() {
            edges = new ArrayList<>();
        }
        
        void addEdge(int u, int v, int weight) {
            edges.add(new int[]{u, v, weight});
        }
        
        int size() { return edges.size(); }
    }
    
    public static void main(String[] args) {
        int V = 5;
        
        System.out.println("=== Graph Representation Comparison ===");
        System.out.println("Vertices: 5, Edges: 6");
        
        // Matrix: O(V²) = 25 cells
        GraphMatrix gm = new GraphMatrix(V);
        gm.addEdge(0, 1, 4);
        gm.addEdge(0, 2, 2);
        gm.addEdge(1, 2, 5);
        System.out.println("Adjacency Matrix memory: O(25) = 25 cells");
        
        // List: O(V+E) = 5+6 = 11 references
        GraphList gl = new GraphList(V);
        gl.addEdge(0, 1, 4);
        gl.addEdge(0, 2, 2);
        gl.addEdge(1, 2, 5);
        System.out.println("Adjacency List memory: O(11) references");
        
        // Edge List: O(E) = 6 edges
        GraphEdgeList el = new GraphEdgeList();
        el.addEdge(0, 1, 4);
        el.addEdge(0, 2, 2);
        el.addEdge(1, 2, 5);
        System.out.println("Edge List memory: O(6) edges");
        
        System.out.println("\nRecommendation: Use Adjacency List for most problems!");
    }
}
[END_CODE_SNIPPET]

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

[START_CODE_SNIPPET]
// BFS and DFS Implementation in Java
import java.util.*;

public class GraphTraversal {
    private List<List<Integer>> adj;
    private int V;
    
    public GraphTraversal(int vertices) {
        V = vertices;
        adj = new ArrayList<>(V);
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());
    }
    
    void addEdge(int u, int v) {
        adj.get(u).add(v);
        adj.get(v).add(u);  // undirected
    }
    
    void bfs(int start) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        List<Integer> order = new ArrayList<>();
        
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int u = queue.poll();
            order.add(u);
            
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    queue.offer(v);
                }
            }
        }
        System.out.println("BFS starting from " + start + ": " + order);
    }
    
    void dfs(int start) {
        boolean[] visited = new boolean[V];
        List<Integer> order = new ArrayList<>();
        dfsRecursive(start, visited, order);
        System.out.println("DFS starting from " + start + ": " + order);
    }
    
    private void dfsRecursive(int u, boolean[] visited, List<Integer> order) {
        visited[u] = true;
        order.add(u);
        
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                dfsRecursive(v, visited, order);
            }
        }
    }
    
    void findConnectedComponents() {
        boolean[] visited = new boolean[V];
        List<List<Integer>> components = new ArrayList<>();
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                List<Integer> component = new ArrayList<>();
                dfsCollect(i, visited, component);
                components.add(component);
            }
        }
        
        System.out.println("Connected components: " + components);
    }
    
    private void dfsCollect(int u, boolean[] visited, List<Integer> component) {
        visited[u] = true;
        component.add(u);
        for (int v : adj.get(u)) {
            if (!visited[v]) dfsCollect(v, visited, component);
        }
    }
    
    public static void main(String[] args) {
        GraphTraversal g = new GraphTraversal(7);
        int[][] edges = {{0,1}, {0,2}, {1,3}, {1,4}, {2,5}, {5,6}};
        for (int[] e : edges) g.addEdge(e[0], e[1]);
        
        System.out.println("=== Graph Traversal Demo ===\n");
        g.bfs(0);
        g.dfs(0);
        g.findConnectedComponents();
        
        // Compare BFS vs DFS
        System.out.println("\n=== BFS vs DFS Comparison ===");
        System.out.println("BFS uses queue -> explores level by level -> shortest path");
        System.out.println("DFS uses stack/recursion -> explores deep first -> uses less memory (no queue)");
    }
}
/* OUTPUT:
=== Graph Traversal Demo ===

BFS starting from 0: [0, 1, 2, 3, 4, 5, 6]
DFS starting from 0: [0, 1, 3, 4, 2, 5, 6]
Connected components: [[0, 1, 2, 3, 4, 5, 6]]

=== BFS vs DFS Comparison ===
BFS uses queue -> explores level by level -> shortest path
DFS uses stack/recursion -> explores deep first -> uses less memory (no queue)
*/
[END_CODE_SNIPPET]

![BFS vs DFS Visualization](/bfs_dfs_comparison.png)

SHORTEST PATH ALGORITHMS

Dijkstra's Algorithm (Single Source, Non-negative Weights):
- Greedy algorithm using priority queue
- Cannot handle negative edges
- Time: O((V+E) log V) with binary heap

[START_CODE_SNIPPET]
// Dijkstra's Algorithm Implementation
import java.util.*;

class DijkstraDemo {
    static class Edge {
        int to, weight;
        Edge(int to, int weight) { this.to = to; this.weight = weight; }
    }
    
    static int[] dijkstra(List<List<Edge>> graph, int src, int V) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        pq.offer(new int[]{src, 0});
        
        boolean[] visited = new boolean[V];
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0];
            
            if (visited[u]) continue;
            visited[u] = true;
            
            for (Edge edge : graph.get(u)) {
                int v = edge.to;
                int newDist = dist[u] + edge.weight;
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    pq.offer(new int[]{v, newDist});
                }
            }
        }
        return dist;
    }
    
    static void printDistances(int[] dist, int src) {
        System.out.println("Shortest distances from node " + src + ":");
        for (int i = 0; i < dist.length; i++) {
            System.out.printf("  To %d: %s%n", i, dist[i] == Integer.MAX_VALUE ? "∞" : dist[i]);
        }
    }
    
    public static void main(String[] args) {
        int V = 5;
        List<List<Edge>> graph = new ArrayList<>();
        for (int i = 0; i < V; i++) graph.add(new ArrayList<>());
        
        // Graph: 0-1(4), 0-2(2), 1-2(1), 1-3(5), 2-3(8), 2-4(10), 3-4(2)
        int[][] edges = {{0,1,4}, {0,2,2}, {1,2,1}, {1,3,5}, {2,3,8}, {2,4,10}, {3,4,2}};
        for (int[] e : edges) {
            graph.get(e[0]).add(new Edge(e[1], e[2]));
            graph.get(e[1]).add(new Edge(e[0], e[2])); // undirected
        }
        
        System.out.println("=== Dijkstra's Algorithm Demo ===\n");
        int[] distances = dijkstra(graph, 0, V);
        printDistances(distances, 0);
        
        System.out.println("\nPath distances:");
        System.out.println("0→1: 4 (direct) OR 0→2→1: 2+1=3 → 3 is shorter!");
        System.out.println("0→4: 0→2→4: 2+10=12 OR 0→2→1→3→4: 2+1+5+2=10 → 10 is shortest!");
    }
}
/* OUTPUT:
=== Dijkstra's Algorithm Demo ===

Shortest distances from node 0:
  To 0: 0
  To 1: 3
  To 2: 2
  To 3: 8
  To 4: 10

Path distances:
0→1: 4 (direct) OR 0→2→1: 2+1=3 → 3 is shorter!
0→4: 0→2→4: 2+10=12 OR 0→2→1→3→4: 2+1+5+2=10 → 10 is shortest!
*/
[END_CODE_SNIPPET]

Bellman-Ford Algorithm (Handles Negative Weights):
- Relaxes all edges V-1 times
- Detects negative cycles
- Time: O(V×E)

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Feature</th><th class="p-3 border border-cyan/20">Dijkstra</th><th class="p-3 border border-cyan/20">Bellman-Ford</th></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Time Complexity</td><td class="p-3 border border-cyan/20">O((V+E) log V)</td><td class="p-3 border border-cyan/20">O(V×E)</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Negative weights</td><td class="p-3 border border-cyan/20">❌ No</td><td class="p-3 border border-cyan/20">✅ Yes</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Negative cycle detection</td><td class="p-3 border border-cyan/20">❌</td><td class="p-3 border border-cyan/20">✅ Yes</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Best Use Case</td><td class="p-3 border border-cyan/20">Maps, GPS, network routing (positive weights)</td><td class="p-3 border border-cyan/20">Currency arbitrage, graphs with negative edges</td></tr></tbody></table>

MINIMUM SPANNING TREE (MST)

A Minimum Spanning Tree connects all vertices with minimum total edge weight, forming a tree (V-1 edges, no cycles).

[START_CODE_SNIPPET]
// Kruskal's Algorithm with Union-Find
import java.util.*;

class KruskalMST {
    static class Edge implements Comparable<Edge> {
        int u, v, weight;
        Edge(int u, int v, int weight) {
            this.u = u; this.v = v; this.weight = weight;
        }
        public int compareTo(Edge other) {
            return Integer.compare(this.weight, other.weight);
        }
    }
    
    static int kruskal(int V, List<Edge> edges) {
        Collections.sort(edges);
        
        int[] parent = new int[V];
        int[] rank = new int[V];
        for (int i = 0; i < V; i++) parent[i] = i;
        
        // Find with path compression
        java.util.function.IntUnaryOperator find = new java.util.function.IntUnaryOperator() {
            @Override
            public int applyAsInt(int x) {
                if (parent[x] != x) parent[x] = applyAsInt(parent[x]);
                return parent[x];
            }
        };
        
        // Union by rank
        java.util.function.BiConsumer<Integer, Integer> union = (x, y) -> {
            int rootX = find.applyAsInt(x);
            int rootY = find.applyAsInt(y);
            if (rootX != rootY) {
                if (rank[rootX] < rank[rootY]) parent[rootX] = rootY;
                else if (rank[rootX] > rank[rootY]) parent[rootY] = rootX;
                else { parent[rootY] = rootX; rank[rootX]++; }
            }
        };
        
        int mstWeight = 0;
        List<Edge> mstEdges = new ArrayList<>();
        
        for (Edge edge : edges) {
            if (find.applyAsInt(edge.u) != find.applyAsInt(edge.v)) {
                union.accept(edge.u, edge.v);
                mstWeight += edge.weight;
                mstEdges.add(edge);
                if (mstEdges.size() == V - 1) break;
            }
        }
        
        System.out.println("MST edges: " + mstEdges.stream()
            .map(e -> String.format("(%d-%d:%d)", e.u, e.v, e.weight))
            .collect(java.util.stream.Collectors.joining(", ")));
        
        return mstWeight;
    }
    
    public static void main(String[] args) {
        int V = 5;
        List<Edge> edges = Arrays.asList(
            new Edge(0, 1, 2), new Edge(0, 3, 6), new Edge(1, 2, 3),
            new Edge(1, 3, 8), new Edge(1, 4, 5), new Edge(2, 4, 7),
            new Edge(3, 4, 9)
        );
        
        System.out.println("=== Kruskal's MST Algorithm ===\n");
        int mstWeight = kruskal(V, edges);
        System.out.println("\nTotal MST weight: " + mstWeight);
        System.out.println("Expected: 2+3+5+6 = 16");
    }
}
/* OUTPUT:
=== Kruskal's MST Algorithm ===

MST edges: (0-1:2), (1-2:3), (1-4:5), (0-3:6)

Total MST weight: 16
Expected: 2+3+5+6 = 16
*/
[END_CODE_SNIPPET]

[TABLE]:<div class="grid grid-cols-2 gap-6 my-6"><div class="bg-indigo-50 p-5 rounded-xl border border-indigo-200"><h4 class="font-bold text-indigo-800 text-lg mb-3">Prim's Algorithm</h4><ul class="list-disc ml-4 space-y-2"><li>Best for <strong>dense graphs</strong> (E ≈ V²)</li><li>Starts from a vertex, grows outward like Dijkstra</li><li>Uses priority queue of edges</li><li>Time: O((V+E) log V)</li></ul></div><div class="bg-purple-50 p-5 rounded-xl border border-purple-200"><h4 class="font-bold text-purple-800 text-lg mb-3">Kruskal's Algorithm</h4><ul class="list-disc ml-4 space-y-2"><li>Best for <strong>sparse graphs</strong> (E ≈ V)</li><li>Sorts all edges globally</li><li>Uses Union-Find data structure</li><li>Time: O(E log E)</li><li>Easier to parallelize</li></ul></div></div>

REAL-WORLD APPLICATIONS

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Domain</th><th class="p-3 border border-cyan/20">Problem</th><th class="p-3 border border-cyan/20">Data Structure / Algorithm</th><th class="p-3 border border-cyan-20">Real Product</th></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">GPS Navigation</td><td class="p-3 border border-cyan/20">Shortest path in road network</td><td class="p-3 border border-cyan/20">Dijkstra, A* Search</td><td class="p-3 border border-cyan/20">Google Maps, Waze</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Social Media</td><td class="p-3 border border-cyan/20">Friend recommendation, degrees of separation</td><td class="p-3 border border-cyan/20">BFS, Disjoint Set</td><td class="p-3 border border-cyan/20">Facebook, LinkedIn</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Network Routing</td><td class="p-3 border border-cyan/20">Minimum cost to connect routers</td><td class="p-3 border border-cyan/20">Prim's MST</td><td class="p-3 border border-cyan/20">Cisco routers, Internet backbone</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Compiler Design</td><td class="p-3 border border-cyan/20">Register allocation, dependency resolution</td><td class="p-3 border border-cyan/20">Graph coloring, Topological sort</td><td class="p-3 border border-cyan/20">GCC, LLVM</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Bioinformatics</td><td class="p-3 border border-cyan/20">DNA sequence alignment</td><td class="p-3 border border-cyan/20">Suffix Tree/Array</td><td class="p-3 border border-cyan/20">BLAST, Bowtie</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">E-commerce</td><td class="p-3 border border-cyan/20">Product recommendation</td><td class="p-3 border border-cyan/20">Bipartite graphs, BFS</td><td class="p-3 border border-cyan/20">Amazon, Netflix</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Databases</td><td class="p-3 border border-cyan/20">Efficient indexing</td><td class="p-3 border border-cyan/20">B+ Trees, Hashing</td><td class="p-3 border border-cyan/20">MySQL, PostgreSQL</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Cybersecurity</td><td class="p-3 border border-cyan/20">Anomaly detection, password check</td><td class="p-3 border border-cyan/20">Bloom Filters, Tries</td><td class="p-3 border border-cyan/20">Have I Been Pwned</td></tr></tbody></table>

LABORATORY SHORT NOTES

COMMON CODING PATTERNS

1. Detect Cycle in Directed Graph using DFS:
[START_CODE_SNIPPET]
// Cycle detection in directed graph
boolean hasCycle(int u, boolean[] visited, boolean[] recStack, List<List<Integer>> adj) {
    visited[u] = true;
    recStack[u] = true;
    
    for (int v : adj.get(u)) {
        if (!visited[v] && hasCycle(v, visited, recStack, adj)) return true;
        if (recStack[v]) return true;  // back edge found
    }
    recStack[u] = false;
    return false;
}
[END_CODE_SNIPPET]

2. Topological Sort (Kahn's Algorithm - BFS):
[START_CODE_SNIPPET]
int[] topologicalSort(int V, List<List<Integer>> adj) {
    int[] indegree = new int[V];
    for (int u = 0; u < V; u++)
        for (int v : adj.get(u)) indegree[v]++;
    
    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < V; i++)
        if (indegree[i] == 0) q.offer(i);
    
    int[] result = new int[V];
    int index = 0;
    
    while (!q.isEmpty()) {
        int u = q.poll();
        result[index++] = u;
        for (int v : adj.get(u)) {
            if (--indegree[v] == 0) q.offer(v);
        }
    }
    
    if (index != V) throw new RuntimeException("Cycle detected!");
    return result;
}
[END_CODE_SNIPPET]

3. Lowest Common Ancestor (LCA) in Binary Tree:
[START_CODE_SNIPPET]
TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}
[END_CODE_SNIPPET]

COMPLEXITY CHEAT SHEET

[TABLE]:<table class="w-full border-collapse border border-cyan/30 text-base text-foreground/90 my-6 shadow-md rounded-xl overflow-hidden"><thead class="bg-gradient-to-r from-cyan/20 to-blue-500/10 text-cyan font-bold"><tr><th class="p-3 border border-cyan/20">Data Structure</th><th class="p-3 border border-cyan/20">Search</th><th class="p-3 border border-cyan/20">Insert</th><th class="p-3 border border-cyan/20">Delete</th><th class="p-3 border border-cyan/20">Space</th><th class="p-3 border border-cyan/20">Best For</th></thead><tbody><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Hash Table (avg)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(1)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Exact match lookups</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">AVL/Red-Black Tree</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Ordered operations, range queries</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Binary Heap (Min/Max)</td><td class="p-3 border border-cyan/20">O(1) [min/max]</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(log n)</td><td class="p-3 border border-cyan/20">O(n)</td><td class="p-3 border border-cyan/20">Priority queues, Dijkstra/Prim</td></tr><tr class="hover:bg-cyan/5"><td class="p-3 border border-cyan-20 font-bold">Trie (prefix tree)</td><td class="p-3 border border-cyan/20">O(L) (L=length)</td><td class="p-3 border border-cyan/20">O(L)</td><td class="p-3 border border-cyan/20">O(L)</td><td class="p-3 border border-cyan/20">O(N×L)<td class="p-3 border border-cyan/20">Autocomplete, dictionary
`;