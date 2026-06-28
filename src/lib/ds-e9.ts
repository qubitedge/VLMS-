import type { Week } from "./course-data";

export const dsExercise9: Week = {
  title: "EXERCISE 9",
  objective: "Hashing including hash table implementation with collision resolution techniques and a simple cache implementation using hashing for fast data retrieval.",
  tutorial: "Tutorial 9: Hashing",
  labTitle: "Lab 9: Hashing",
  experiments: [
    {
      id: "ds-e9-1",
      title: "Hash Table with Collision Resolution Techniques",
      desc: "Implement a hash table with collision resolution (chaining, linear/quadratic probing).",
      expected: "Hash table contents",
      content: {
        aim: {
          text: "In this experiment, the student will implement a Hash Table and demonstrate three collision resolution techniques: Chaining, Linear Probing, and Quadratic Probing. The student will:",
          bullets: [
            "Understand hashing and hash functions",
            "Implement insert(), search(), and delete() operations",
            "Handle collisions using chaining (linked list) and open addressing (linear and quadratic probing)",
            "Analyse load factor and its effect on performance"
          ]
        },
        theory: [
          {
            title: "Hashing",
            body: [
              "A technique to map keys to array indices using a hash function. Enables average O(1) time for insert, search, and delete operations."
            ]
          },
          {
            title: "Hash function",
            body: [
              "A function h(k) = k % TABLE_SIZE maps a key k to an index in the hash table. A good hash function distributes keys uniformly."
            ]
          },
          {
            title: "Collision",
            body: [
              "When two different keys map to the same index: h(k1) == h(k2). Collisions are inevitable due to the pigeonhole principle."
            ]
          },
          {
            title: "Collision Resolution Technique 1 — Chaining",
            body: [
              "Each table slot holds a linked list. All keys that hash to the same index are stored in the list at that index. No overflow; handles any number of collisions. Search time degrades to O(n) in the worst case."
            ]
          },
          {
            title: "Collision Resolution Technique 2 — Linear Probing",
            body: [
              "Open addressing method. If slot h(k) is occupied, try h(k)+1, h(k)+2, ... until an empty slot is found, wrapping around with modulo. Simple but suffers from primary clustering."
            ]
          },
          {
            title: "Collision Resolution Technique 3 — Quadratic Probing",
            body: [
              "Open addressing method. If slot h(k) is occupied, try h(k)+1², h(k)+2², h(k)+3², ... Reduces primary clustering but may cause secondary clustering."
            ]
          },
          {
            title: "Load factor",
            body: [
              "α = n / TABLE_SIZE where n is the number of elements. Performance degrades as α approaches 1 in open addressing. Chaining handles α > 1."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Aim and Theory. Understand what a collision is and why it occurs.",
          "Step through the Simulation — observe how the same index is reached by two different keys.",
          "Open the Solve workspace. Three separate programs are provided as starter code.",
          "For chaining: insert keys 10, 20, 30 (all hash to same index with TABLE_SIZE=10). Verify all three are in the chain at index 0.",
          "For linear probing: insert 10, 20, 30. Observe that 20 and 30 probe to the next free slots.",
          "Test search() and delete() for all three approaches.",
          "Observe what happens when load factor exceeds 0.7 in open addressing.",
          "Proceed to Posttest."
        ],
        simulation: {
          code: "int main() { /* Simulation code for hash table */ return 0; }",
          steps: [
            { line: 0, annotation: "Step 1 — Initialisation: All 10 slots point to NULL.", memory: [], output: "" },
            { line: 0, annotation: "Step 2 — insert(10): index = 10 % 10 = 0.", memory: [], output: "Inserted 10 at index 0\n" },
            { line: 0, annotation: "Step 3 — insert(20): index = 20 % 10 = 0. Collision! Prepend to chain.", memory: [], output: "Inserted 20 at index 0 (chained)\n" },
            { line: 0, annotation: "Step 4 — insert(30): index = 30 % 10 = 0. Collision! Prepend to chain.", memory: [], output: "Inserted 30 at index 0 (chained)\n" },
            { line: 0, annotation: "Step 5 — search(20): index = 20 % 10 = 0; traverse chain: 30 -> 20 (found!)", memory: [], output: "20 found at index 0\n" },
            { line: 0, annotation: "Step 6 — display()", memory: [], output: "Table[0]: 30 -> 20 -> 10 -> NULL\nTable[1] to Table[9]: empty\n" }
          ]
        },
        posttest: [],
        references: [
          "Cormen, Leiserson, Rivest, Stein — \"Introduction to Algorithms\", 3rd Ed., MIT Press",
          "Balagurusamy — \"Data Structures Using C\", McGraw Hill",
          "Sedgewick, Wayne — \"Algorithms\", 4th Ed., Addison-Wesley",
          "JNTUGV Data Structures Lab Syllabus, CS&IT Dept."
        ]
      }
    },
    {
      id: "ds-e9-2",
      title: "Simple Cache Using Hashing",
      desc: "Implement a simple cache mechanism using hashing.",
      expected: "Cache hit/miss output",
      content: {
        aim: {
          text: "In this experiment, the student will implement a simple key-value cache using a hash table. The student will:",
          bullets: [
            "Understand what a cache is and why hashing suits cache implementation",
            "Store and retrieve key-value pairs using a hash table",
            "Implement a cache miss and cache hit mechanism",
            "Implement an eviction strategy using LRU (Least Recently Used) order tracking"
          ]
        },
        theory: [
          {
            title: "Cache",
            body: [
              "A high-speed storage layer that saves results of expensive operations (database queries, computations, API calls) so future requests for the same data are served faster."
            ]
          },
          {
            title: "Why hashing for cache?",
            body: [
              "Cache requires O(1) average lookup by key. Hash tables provide exactly this. The key is hashed to find the slot; the associated value is returned directly."
            ]
          },
          {
            title: "Cache hit",
            body: [
              "The requested key exists in the cache. Value is returned immediately without recomputation."
            ]
          },
          {
            title: "Cache miss",
            body: [
              "The requested key is not in the cache. The value must be fetched from the original source and then stored in the cache for future use."
            ]
          },
          {
            title: "Key-value pair",
            body: [
              "The cache stores pairs: struct Cache { int key; int value; int valid; }. The valid flag distinguishes an occupied slot from an empty one."
            ]
          },
          {
            title: "Eviction",
            body: [
              "When the cache is full and a new item must be stored, an old item is removed. Simple strategy: overwrite the slot (direct-mapped cache). Advanced strategy: LRU removes the least recently used item."
            ]
          },
          {
            title: "Real-world use",
            body: [
              "CPU L1/L2/L3 caches, browser caches, DNS caches, Redis, Memcached all operate on this principle."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Aim and Theory. Understand cache hit, cache miss, and eviction.",
          "Step through the Simulation — observe how a lookup first checks the cache before computing.",
          "Open the Solve workspace. Starter code provides the struct and hash function.",
          "Run the program. Call get(5) — observe cache miss, value computed as 5*5=25, stored in cache.",
          "Call get(5) again — observe cache hit, value returned directly.",
          "Fill the cache. Call get() for a new key — observe eviction of an existing entry.",
          "Verify that after eviction the new key is stored and old one is gone.",
          "Proceed to Posttest."
        ],
        simulation: {
          code: "int main() { /* Simulation code for simple cache */ return 0; }",
          steps: [
            { line: 0, annotation: "Step 1 — Initialisation: All slots invalid (empty).", memory: [], output: "" },
            { line: 0, annotation: "Step 2 — get(5) called: index = 5 % 8 = 5. table[5].valid is FALSE.", memory: [], output: "CACHE MISS for key 5\n" },
            { line: 0, annotation: "Step 3 — Compute value and store: 5*5=25.", memory: [], output: "Computed value = 25. Stored in cache at index 5.\n" },
            { line: 0, annotation: "Step 4 — get(5) called again: table[5].valid == 1 && table[5].key == 5 → TRUE.", memory: [], output: "CACHE HIT for key 5 -> value = 25\n" },
            { line: 0, annotation: "Step 5 — get(13) called (eviction scenario): index = 13 % 8 = 5. Evict key 5.", memory: [], output: "CACHE MISS for key 13. Evicted key 5. Stored key 13 at index 5.\n" }
          ]
        },
        posttest: [],
        references: [
          "Cormen, Leiserson, Rivest, Stein — \"Introduction to Algorithms\", 3rd Ed., MIT Press",
          "Balagurusamy — \"Data Structures Using C\", McGraw Hill",
          "Tanenbaum — \"Modern Operating Systems\", 4th Ed., Pearson",
          "JNTUGV Data Structures Lab Syllabus, CS&IT Dept."
        ]
      }
    }
  ]
};
