import type { Week } from "./course-data";

export const dsExercise1: Week = {
  title: "EXERCISE 1",
  objective: "Array Manipulation including reverse, linear search, binary search, bubble sort, selection sort, and insertion sort spanning the fundamental linear data structure and algorithm foundations.",
  tutorial: "Tutorial 1: Arrays and Basic Algorithms",
  labTitle: "Lab 1: Array Manipulation",
  experiments: [
    {
      id: "ds-e1-1",
      title: "Reverse an Array",
      desc: "Write a program to reverse an array.",
      expected: "Reversed Array: 50 40 30 20 10",
      content: {
        aim: {
          text: "In this experiment the student will implement a C program to reverse the elements of a one-dimensional integer array in-place using the two-pointer technique. The student will understand how array indexing works, how swapping operates using a temporary variable, and how in-place reversal avoids the need for an auxiliary array.",
          bullets: [
            "Understand the concept of in-place array reversal using two pointers",
            "Implement the swap operation using a temporary variable",
            "Trace the reversal process step by step for a given array",
            "Analyze the time complexity O(n/2) simplified to O(n) and space complexity O(1) of in-place reversal",
            "Distinguish between in-place reversal and reversal using an auxiliary array"
          ]
        },
        theory: [
          {
            title: "What is an Array?",
            body: [
              "An array is a linear data structure that stores a fixed-size collection of elements of the same data type in contiguous memory locations. Each element is accessed using an index starting from 0. Array elements are stored sequentially in memory making index-based access O(1) — constant time."
            ]
          },
          {
            title: "Array Reversal Problem",
            body: [
              "Given an array A of n elements the goal is to rearrange the elements so that the first element becomes the last, the second becomes the second-to-last, and so on.",
              "Original:  A = [10, 20, 30, 40, 50]",
              "Reversed: A = [50, 40, 30, 20, 10]"
            ]
          },
          {
            title: "Two-Pointer In-Place Reversal",
            body: [
              "The most efficient approach uses two pointers — one starting at the left end (index 0) and one at the right end (index n-1). At each step the elements at both pointers are swapped and the pointers move toward each other until they meet or cross.",
              "Algorithm:",
              "1. left = 0, right = n-1",
              "2. While left is less than right:",
              "     Swap A[left] and A[right]",
              "     Increment left",
              "     Decrement right",
              "3. Stop when left is greater than or equal to right"
            ]
          },
          {
            title: "Swap using Temporary Variable",
            body: [
              "To swap two elements A[left] and A[right]:",
              "temp = A[left]",
              "A[left] = A[right]",
              "A[right] = temp",
              "Direct assignment A[left] = A[right] without temp would overwrite and lose the original value of A[left] before it is saved."
            ]
          },
          {
            title: "Trace for A = [10, 20, 30, 40, 50]",
            body: [
              "Step 1: left=0, right=4 — swap A[0]=10 and A[4]=50 — Array: [50, 20, 30, 40, 10]",
              "Step 2: left=1, right=3 — swap A[1]=20 and A[3]=40 — Array: [50, 40, 30, 20, 10]",
              "Step 3: left=2, right=2 — left equals right — stop",
              "Final reversed array: [50, 40, 30, 20, 10]"
            ]
          },
          {
            title: "Time and Space Complexity",
            body: [
              "Time Complexity: O(n/2) = O(n) — each element is visited at most once",
              "Space Complexity: O(1) — only one temporary variable used, no auxiliary array needed",
              "Auxiliary Array Approach (Alternative — Less Efficient):",
              "Create a new array B of size n. Copy A[n-1] to B[0], A[n-2] to B[1], and so on. Space complexity is O(n) — uses extra memory. The in-place two-pointer approach is always preferred."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read the Aim and Theory sections carefully",
          "Trace the two-pointer reversal manually on paper for the array [5, 10, 15, 20, 25]",
          "Write down each step showing left pointer, right pointer, swap performed, and array state",
          "Verify your manual trace produces [25, 20, 15, 10, 5]",
          "Go to Simulation tab and click Start",
          "Press Next step by step and observe left and right pointers moving toward the center",
          "Watch each swap highlighted in the array visualization",
          "Observe the array state updating after each swap",
          "Go to Solve tab — starter code is pre-loaded",
          "In the Stdin input box enter the array size on the first line then the elements space separated",
          "Example input: 5 followed by 10 20 30 40 50",
          "Click Run Code",
          "Verify output: Reversed Array: 50 40 30 20 10",
          "Try with an even-sized array [1 2 3 4] and odd-sized [1 2 3] to verify both cases work",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    int A[] = {10, 20, 30, 40, 50};\n    int left = 0;\n    int right = n - 1;\n    int temp;\n    \n    while (left < right) {\n        temp = A[left];\n        A[left] = A[right];\n        A[right] = temp;\n        left++;\n        right--;\n    }\n    \n    printf(\"Reversed Array: \");\n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", A[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
          steps: [
            { line: 3, annotation: "Array initialized", memory: [], output: "" },
            { line: 8, annotation: "Iteration 1: left=0, right=4. Condition true — proceed.", memory: [{ variable: "left", type: "int", value: "0" }, { variable: "right", type: "int", value: "4" }], output: "" },
            { line: 11, annotation: "temp = A[0] = 10, A[0] = A[4] = 50, A[4] = temp = 10", memory: [{ variable: "A", type: "int[]", value: "[50, 20, 30, 40, 10]" }], output: "" },
            { line: 13, annotation: "left++ -> left=1, right-- -> right=3", memory: [{ variable: "left", type: "int", value: "1" }, { variable: "right", type: "int", value: "3" }], output: "" },
            { line: 8, annotation: "Iteration 2: left=1, right=3. Condition true — proceed.", memory: [], output: "" },
            { line: 11, annotation: "temp = A[1] = 20, A[1] = A[3] = 40, A[3] = temp = 20", memory: [{ variable: "A", type: "int[]", value: "[50, 40, 30, 20, 10]" }], output: "" },
            { line: 13, annotation: "left++ -> left=2, right-- -> right=2", memory: [{ variable: "left", type: "int", value: "2" }, { variable: "right", type: "int", value: "2" }], output: "" },
            { line: 8, annotation: "Iteration 3: left=2, right=2. Condition false — loop exits.", memory: [], output: "" },
            { line: 15, annotation: "printf executes", memory: [], output: "Reversed Array: 50 40 30 20 10\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "JNTUGV Data Structures Lab Syllabus, Exercise 1",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/",
          "Wandbox Online Compiler: https://wandbox.org"
        ]
      }
    },
    {
      id: "ds-e1-2",
      title: "Linear Search",
      desc: "Write a program to perform linear search on an array.",
      expected: "Element 22 found at index 3",
      content: {
        aim: {
          text: "In this experiment the student will implement the Linear Search algorithm in C to find the position of a target element in an unsorted integer array. The student will understand how sequential scanning works, analyze best-case and worst-case time complexities, and recognize when linear search is the appropriate choice over binary search.",
          bullets: [
            "Understand the sequential element-by-element scanning approach of linear search",
            "Implement linear search and return the index of the found element",
            "Handle the case where the element is not present in the array",
            "Analyze best case O(1), worst case O(n), and average case O(n/2) time complexities",
            "Understand that linear search works on both sorted and unsorted arrays"
          ]
        },
        theory: [
          {
            title: "What is Searching?",
            body: [
              "Searching is the process of finding whether a given element called the key or target exists in a collection of data and if so returning its position. Efficient searching is fundamental to data retrieval in databases, file systems, and algorithms."
            ]
          },
          {
            title: "Linear Search",
            body: [
              "Linear Search also called Sequential Search scans every element of the array from left to right (index 0 to n-1) comparing each element with the target key. If a match is found the index is returned. If the entire array is scanned without finding the key the search reports failure.",
              "Algorithm:",
              "1. For i from 0 to n-1:",
              "2.   If A[i] equals key: return i (found at index i)",
              "3. Return -1 (not found)"
            ]
          },
          {
            title: "Key Properties",
            body: [
              "Works on both sorted and unsorted arrays — no pre-condition on array order.",
              "Simple to implement — single loop with one comparison per iteration."
            ]
          },
          {
            title: "Time Complexity Analysis",
            body: [
              "Best Case O(1): The target key is found at the very first position A[0]. Only one comparison needed.",
              "Worst Case O(n): The target key is at the last position A[n-1] or not present at all. All n elements must be scanned.",
              "Average Case O(n/2) = O(n): On average the key is found at the middle of the array requiring n/2 comparisons.",
              "Space Complexity: O(1) — no extra memory used beyond the input array."
            ]
          },
          {
            title: "When to Use Linear Search",
            body: [
              "Linear search is appropriate when the array is small (n less than a few hundred), when the array is unsorted and sorting overhead is not justified, when the search is performed only once or rarely, or when simplicity of implementation is more important than speed."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Aim and Theory and understand the sequential scanning approach",
          "Trace linear search manually on paper for array [15, 3, 9, 22, 7] searching for key=22",
          "Count comparisons: compare 15 (no), compare 3 (no), compare 9 (no), compare 22 (yes) — found at index 3 in 4 comparisons",
          "Also trace for key=100 (not present) — verify all 5 elements are compared before returning not found",
          "Go to Simulation tab and click Start",
          "Press Next and observe the current element being highlighted in the array visualization",
          "Watch the comparison result (match or no match) displayed at each step",
          "Observe the pointer moving right until the key is found or the array ends",
          "Go to Solve tab — starter code is pre-loaded",
          "Enter array size, array elements, and the search key in Stdin",
          "Example input: 5 on first line, 15 3 9 22 7 on second line, 22 on third line",
          "Click Run Code",
          "Verify output: Element 22 found at index 3",
          "Try with a key not in the array and verify: Element not found",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    int A[] = {15, 3, 9, 22, 7};\n    int key = 22;\n    int found = -1;\n    \n    for (int i = 0; i < n; i++) {\n        if (A[i] == key) {\n            found = i;\n            break;\n        }\n    }\n    \n    if (found != -1) {\n        printf(\"Element %d found at index %d\\n\", key, found);\n    } else {\n        printf(\"Element not found\\n\");\n    }\n    return 0;\n}",
          steps: [
            { line: 4, annotation: "Array initialized, key=22, i=0", memory: [{ variable: "A", type: "int[]", value: "[15, 3, 9, 22, 7]" }, { variable: "key", type: "int", value: "22" }], output: "" },
            { line: 9, annotation: "Current element: A[0]=15. Comparison: 15 == 22? No. i++", memory: [{ variable: "i", type: "int", value: "0" }], output: "" },
            { line: 9, annotation: "Current element: A[1]=3. Comparison: 3 == 22? No. i++", memory: [{ variable: "i", type: "int", value: "1" }], output: "" },
            { line: 9, annotation: "Current element: A[2]=9. Comparison: 9 == 22? No. i++", memory: [{ variable: "i", type: "int", value: "2" }], output: "" },
            { line: 9, annotation: "Current element: A[3]=22. Comparison: 22 == 22? Yes — Match found", memory: [{ variable: "i", type: "int", value: "3" }, { variable: "found", type: "int", value: "3" }], output: "" },
            { line: 16, annotation: "Search successful", memory: [], output: "Element 22 found at index 3\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "JNTUGV Data Structures Lab Syllabus, Exercise 1",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
        ]
      }
    },
    {
      id: "ds-e1-3",
      title: "Binary Search",
      desc: "Write a program to perform binary search on a sorted array.",
      expected: "Element 23 found at index 5",
      content: {
        aim: {
          text: "In this experiment the student will implement the Binary Search algorithm in C to efficiently locate a target element in a sorted integer array by repeatedly halving the search space. The student will understand how the divide and conquer principle achieves O(log n) time complexity and why binary search requires a sorted array as a pre-condition.",
          bullets: [
            "Understand the divide and conquer strategy of binary search",
            "Implement binary search using low, mid, and high pointer variables",
            "Trace the search space halving process step by step",
            "Analyze and compare O(log n) binary search vs O(n) linear search time complexity",
            "Understand what happens when binary search is incorrectly applied to an unsorted array"
          ]
        },
        theory: [
          {
            title: "Binary Search Concept",
            body: [
              "Binary Search exploits the sorted order of an array to eliminate half the remaining search space at each step. Instead of checking every element sequentially it compares the target key with the middle element of the current search range:",
              "- If key equals middle element — found",
              "- If key is less than middle element — search the left half",
              "- If key is greater than middle element — search the right half",
              "This halving continues until the key is found or the search space becomes empty."
            ]
          },
          {
            title: "Algorithm",
            body: [
              "low = 0, high = n-1",
              "While low is less than or equal to high:",
              "  mid = (low + high) / 2",
              "  If A[mid] equals key: return mid (found)",
              "  If A[mid] is less than key: low = mid + 1 (search right half)",
              "  If A[mid] is greater than key: high = mid - 1 (search left half)",
              "Return -1 (not found)"
            ]
          },
          {
            title: "Trace for A=[2, 5, 8, 12, 16, 23, 38, 45], key=23",
            body: [
              "Iteration 1: low=0, high=7, mid=3 — A[3]=12 — 12 less than 23 — search right — low=4",
              "Iteration 2: low=4, high=7, mid=5 — A[5]=23 — 23 equals 23 — found at index 5",
              "Total comparisons: 2"
            ]
          },
          {
            title: "Time Complexity Analysis",
            body: [
              "Each iteration halves the search space. Starting with n elements:",
              "After 1 step: n/2 elements remain",
              "After k steps: n/2ᵏ elements remain",
              "The search ends when n/2ᵏ = 1 → k = log₂(n)",
              "Best Case O(1): Key found at the very first mid calculation",
              "Worst Case O(log n): Key at extreme ends or not present",
              "Average Case O(log n)"
            ]
          },
          {
            title: "Why Sorted Array is Required",
            body: [
              "Binary search relies on the assumption that if the key is greater than A[mid] it cannot be in the left half. This assumption only holds when the array is sorted. On an unsorted array binary search may miss the key entirely giving wrong results without any error."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Aim and Theory focusing on how log₂(n) comparisons achieves the search",
          "Trace binary search manually on paper for array [2, 4, 6, 8, 10, 12, 14] and key=10",
          "Write each iteration showing low, high, mid, A[mid], and which half is selected",
          "Verify: Iteration 1 mid=3 A[3]=8 search right, Iteration 2 mid=5 A[5]=12 search left, Iteration 3 mid=4 A[4]=10 found",
          "Go to Simulation tab and click Start",
          "Press Next and observe the search space shrinking visually with low and high markers",
          "Watch the mid element highlighted and the comparison result directing left or right",
          "Count the iterations and verify it matches ceil(log₂ n)",
          "Go to Solve tab — starter code is pre-loaded",
          "Enter sorted array size, sorted elements, and search key in Stdin",
          "Example input: 8 on first line, 2 5 8 12 16 23 38 45 on second line, 23 on third line",
          "Click Run Code",
          "Verify output: Element 23 found at index 5",
          "Try with an element not in the array and verify: Element not found",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n\nint main() {\n    int n = 8;\n    int A[] = {2, 5, 8, 12, 16, 23, 38, 45};\n    int key = 23;\n    int low = 0, high = n - 1, mid;\n    int found = -1;\n    \n    while (low <= high) {\n        mid = low + (high - low) / 2;\n        if (A[mid] == key) {\n            found = mid;\n            break;\n        } else if (A[mid] < key) {\n            low = mid + 1;\n        } else {\n            high = mid - 1;\n        }\n    }\n    \n    if (found != -1) {\n        printf(\"Element %d found at index %d\\n\", key, found);\n    } else {\n        printf(\"Element not found\\n\");\n    }\n    return 0;\n}",
          steps: [
            { line: 7, annotation: "Initialize low=0, high=7. Search space: entire array", memory: [{ variable: "low", type: "int", value: "0" }, { variable: "high", type: "int", value: "7" }], output: "" },
            { line: 11, annotation: "Iteration 1: mid = (0+7)/2 = 3. A[3]=12. 12 < 23? Yes, search right.", memory: [{ variable: "mid", type: "int", value: "3" }], output: "" },
            { line: 15, annotation: "low = mid+1 = 4. Remaining search space: [16, 23, 38, 45]", memory: [{ variable: "low", type: "int", value: "4" }], output: "" },
            { line: 11, annotation: "Iteration 2: low=4, high=7. mid = (4+7)/2 = 5. A[5]=23. 23 == 23? Yes — Match found.", memory: [{ variable: "mid", type: "int", value: "5" }], output: "" },
            { line: 22, annotation: "Search successful in 2 iterations", memory: [], output: "Element 23 found at index 5\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "Cormen T.H., Leiserson C.E., Rivest R.L., and Stein C., Introduction to Algorithms, 3rd Edition, MIT Press",
          "JNTUGV Data Structures Lab Syllabus, Exercise 1"
        ]
      }
    },
    {
      id: "ds-e1-4",
      title: "Bubble Sort",
      desc: "Write a program to sort an array using Bubble Sort.",
      expected: "Sorted Array: 12 22 25 34 64",
      content: {
        aim: {
          text: "In this experiment the student will implement the Bubble Sort algorithm in C to sort an integer array in ascending order. The student will understand how adjacent element comparisons and swaps cause larger elements to bubble toward the end of the array with each pass and analyze why Bubble Sort is O(n²) in the worst case but O(n) in the best case with the optimized early-exit version.",
          bullets: [
            "Understand the adjacent comparison and swap mechanism of Bubble Sort",
            "Implement both standard and optimized (early exit) Bubble Sort",
            "Trace the complete sorting process pass by pass",
            "Analyze best case O(n), worst case O(n²), and average case O(n²) time complexities",
            "Understand why Bubble Sort is rarely used in practice but important conceptually"
          ]
        },
        theory: [
          {
            title: "What is Sorting?",
            body: [
              "Sorting is the process of arranging elements of an array in a specified order — ascending or descending. Sorted data enables efficient searching (binary search), merging, and many other algorithmic operations."
            ]
          },
          {
            title: "Bubble Sort Concept",
            body: [
              "Bubble Sort repeatedly compares adjacent pairs of elements and swaps them if they are in the wrong order. After each complete pass through the array the largest unsorted element bubbles up to its correct position at the end. The algorithm requires n-1 passes to completely sort an array of n elements."
            ]
          },
          {
            title: "Algorithm (Standard)",
            body: [
              "For pass i from 0 to n-2:",
              "  For j from 0 to n-i-2:",
              "    If A[j] greater than A[j+1]:",
              "      Swap A[j] and A[j+1]",
              "After pass i, the last i+1 elements are in their correct sorted positions and do not need to be compared again."
            ]
          },
          {
            title: "Optimized Bubble Sort (Early Exit)",
            body: [
              "Add a boolean flag swapped. At the start of each pass set swapped = false. If any swap occurs set swapped = true. If an entire pass completes with no swap the array is already sorted — stop early.",
              "Best case: Array already sorted — only 1 pass needed — O(n)"
            ]
          },
          {
            title: "Trace for A=[64, 34, 25, 12, 22]",
            body: [
              "Pass 1 (i=0):",
              "Compare 64 and 34 — swap — [34, 64, 25, 12, 22]",
              "Compare 64 and 25 — swap — [34, 25, 64, 12, 22]",
              "Compare 64 and 12 — swap — [34, 25, 12, 64, 22]",
              "Compare 64 and 22 — swap — [34, 25, 12, 22, 64]",
              "After Pass 1: 64 is at its correct position (index 4)",
              "Pass 2 (i=1): [25, 12, 22, 34, 64]",
              "Pass 3 (i=2): [12, 22, 25, 34, 64]",
              "Pass 4 (i=3): Fully sorted [12, 22, 25, 34, 64]"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Aim and Theory and trace the given example [64, 34, 25, 12, 22] manually",
          "Write each pass showing all comparisons, swaps, and the array state after each pass",
          "Count total comparisons: Pass 1 has 4, Pass 2 has 3, Pass 3 has 2, Pass 4 has 1 — total 10 = n(n-1)/2",
          "Go to Simulation tab and click Start",
          "Press Next and observe the current pair being compared highlighted in the array visualization",
          "Watch swaps happening with animated element movement",
          "Observe how each pass places one more element in its final sorted position (marked in green)",
          "Go to Solve tab — starter code pre-loaded",
          "Enter array size then elements in Stdin",
          "Example input: 5 on first line, 64 34 25 12 22 on second line",
          "Click Run Code",
          "Verify output: Sorted Array: 12 22 25 34 64",
          "Try with already sorted array [1 2 3 4 5] to observe optimized early exit behavior",
          "Try with reverse sorted array [5 4 3 2 1] to observe worst case",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    int A[] = {64, 34, 25, 12, 22};\n    int temp;\n    \n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (A[j] > A[j+1]) {\n                temp = A[j];\n                A[j] = A[j+1];\n                A[j+1] = temp;\n            }\n        }\n    }\n    \n    printf(\"Sorted Array: \");\n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", A[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
          steps: [
            { line: 11, annotation: "Pass 1: Compare 64 and 34 — Swap. Array: [34, 64, 25, 12, 22]", memory: [], output: "" },
            { line: 11, annotation: "Pass 1: Compare 64 and 25 — Swap. Array: [34, 25, 64, 12, 22]", memory: [], output: "" },
            { line: 11, annotation: "Pass 1: Compare 64 and 12 — Swap. Array: [34, 25, 12, 64, 22]", memory: [], output: "" },
            { line: 11, annotation: "Pass 1: Compare 64 and 22 — Swap. Array: [34, 25, 12, 22, 64]", memory: [], output: "" },
            { line: 16, annotation: "End of Pass 1: 64 is in correct final position", memory: [], output: "" },
            { line: 16, annotation: "Pass 2 completes: 34 in correct final position. Array: [25, 12, 22, 34, 64]", memory: [], output: "" },
            { line: 16, annotation: "Pass 3 completes: 25 in correct final position. Array: [12, 22, 25, 34, 64]", memory: [], output: "" },
            { line: 16, annotation: "Pass 4 completes: Array fully sorted", memory: [], output: "" },
            { line: 18, annotation: "Sorting complete", memory: [], output: "Sorted Array: 12 22 25 34 64\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Sedgewick R., Algorithms in C Parts 1-5, Addison-Wesley",
          "JNTUGV Data Structures Lab Syllabus, Exercise 1"
        ]
      }
    },
    {
      id: "ds-e1-5",
      title: "Selection Sort",
      desc: "Write a program to sort an array using Selection Sort.",
      expected: "Sorted Array: 11 12 22 25 64",
      content: {
        aim: {
          text: "In this experiment the student will implement the Selection Sort algorithm in C to sort an integer array in ascending order. The student will understand how Selection Sort finds the minimum element in the unsorted portion and places it at the correct position with one swap per pass, making it more swap-efficient than Bubble Sort while maintaining the same O(n²) comparison complexity.",
          bullets: [
            "Understand the minimum element selection and single swap per pass approach",
            "Implement Selection Sort by finding the index of the minimum element in each pass",
            "Trace the sorting process pass by pass showing minimum element selection and placement",
            "Analyze O(n²) time complexity and O(n) swap complexity (at most n-1 swaps total)",
            "Compare Selection Sort with Bubble Sort in terms of number of swaps performed"
          ]
        },
        theory: [
          {
            title: "Selection Sort Concept",
            body: [
              "Selection Sort divides the array into two portions — a sorted portion on the left that grows with each pass and an unsorted portion on the right that shrinks. In each pass it finds the minimum element from the unsorted portion and swaps it with the first element of the unsorted portion, extending the sorted portion by one."
            ]
          },
          {
            title: "Algorithm",
            body: [
              "For pass i from 0 to n-2:",
              "  min_idx = i (assume current position holds the minimum)",
              "  For j from i+1 to n-1:",
              "    If A[j] less than A[min_idx]:",
              "      min_idx = j (update minimum index)",
              "  If min_idx not equal to i:",
              "    Swap A[i] and A[min_idx]"
            ]
          },
          {
            title: "Key Characteristic — Minimum Swaps",
            body: [
              "Selection Sort performs at most n-1 swaps regardless of the input. Bubble Sort can perform up to n(n-1)/2 swaps in the worst case. This makes Selection Sort much better than Bubble Sort when the cost of writing to memory (swap) is expensive."
            ]
          },
          {
            title: "Trace for A=[64, 25, 12, 22, 11]",
            body: [
              "Pass 1 (i=0): min=11 at index 4 — Swap A[0] and A[4]: [11, 25, 12, 22, 64]",
              "Pass 2 (i=1): min=12 at index 2 — Swap A[1] and A[2]: [11, 12, 25, 22, 64]",
              "Pass 3 (i=2): min=22 at index 3 — Swap A[2] and A[3]: [11, 12, 22, 25, 64]",
              "Pass 4 (i=3): min=25 at index 3 — No swap needed",
              "Final sorted array: [11, 12, 22, 25, 64]"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and trace Selection Sort manually on paper for [29, 10, 14, 37, 13]",
          "Show each pass: find minimum in unsorted portion, record its index, perform swap, show array state",
          "Count total swaps — verify it is at most n-1=4 swaps",
          "Go to Simulation tab and click Start",
          "Press Next and observe the unsorted portion being scanned to find the minimum element",
          "Watch the minimum element highlighted in yellow and swapped to its correct position in green",
          "Observe the sorted portion growing left to right with each pass",
          "Go to Solve tab — starter code pre-loaded",
          "Enter array size and elements in Stdin",
          "Example input: 5 on first line, 64 25 12 22 11 on second line",
          "Click Run Code",
          "Verify output: Sorted Array: 11 12 22 25 64",
          "Count the swaps printed and verify at most n-1=4 swaps occurred",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    int A[] = {64, 25, 12, 22, 11};\n    int min_idx, temp;\n    \n    for (int i = 0; i < n - 1; i++) {\n        min_idx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (A[j] < A[min_idx]) {\n                min_idx = j;\n            }\n        }\n        if (min_idx != i) {\n            temp = A[i];\n            A[i] = A[min_idx];\n            A[min_idx] = temp;\n        }\n    }\n    \n    printf(\"Sorted Array: \");\n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", A[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
          steps: [
            { line: 9, annotation: "Pass 1: Scan indices 0 to 4 for minimum. Minimum found: A[4]=11", memory: [{ variable: "min_idx", type: "int", value: "4" }], output: "" },
            { line: 16, annotation: "Swap A[0] and A[4]. Array: [11, 25, 12, 22, 64]", memory: [], output: "" },
            { line: 9, annotation: "Pass 2: Scan indices 1 to 4 for minimum. Minimum found: A[2]=12", memory: [{ variable: "min_idx", type: "int", value: "2" }], output: "" },
            { line: 16, annotation: "Swap A[1] and A[2]. Array: [11, 12, 25, 22, 64]", memory: [], output: "" },
            { line: 9, annotation: "Pass 3: Scan indices 2 to 4 for minimum. Minimum found: A[3]=22", memory: [{ variable: "min_idx", type: "int", value: "3" }], output: "" },
            { line: 16, annotation: "Swap A[2] and A[3]. Array: [11, 12, 22, 25, 64]", memory: [], output: "" },
            { line: 9, annotation: "Pass 4: Scan indices 3 to 4 for minimum. Minimum found: A[3]=25. No swap needed.", memory: [{ variable: "min_idx", type: "int", value: "3" }], output: "" },
            { line: 22, annotation: "Sorting complete", memory: [], output: "Sorted Array: 11 12 22 25 64\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Sedgewick R., Algorithms in C Parts 1-5, Addison-Wesley",
          "JNTUGV Data Structures Lab Syllabus, Exercise 1"
        ]
      }
    },
    {
      id: "ds-e1-6",
      title: "Insertion Sort",
      desc: "Write a program to sort an array using Insertion Sort.",
      expected: "Sorted Array: 5 6 11 12 13",
      content: {
        aim: {
          text: "In this experiment the student will implement the Insertion Sort algorithm in C to sort an integer array in ascending order. The student will understand how Insertion Sort builds a sorted portion one element at a time by inserting each new element into its correct position among the already-sorted elements, achieving O(n) best case performance on nearly sorted arrays and making it the preferred simple sort for small or nearly sorted datasets.",
          bullets: [
            "Understand the card-sorting analogy of Insertion Sort",
            "Implement Insertion Sort using the key element and shifting approach",
            "Trace the insertion process element by element",
            "Analyze best case O(n), worst case O(n²), and average case O(n²) complexities",
            "Identify scenarios where Insertion Sort outperforms Bubble and Selection Sort"
          ]
        },
        theory: [
          {
            title: "Insertion Sort Concept",
            body: [
              "Insertion Sort works the way a card player sorts playing cards in hand. Starting from the second element each element is picked as a key and compared with the elements before it in the sorted portion. Elements greater than the key are shifted one position right to make room and the key is inserted into its correct position."
            ]
          },
          {
            title: "Algorithm",
            body: [
              "For i from 1 to n-1:",
              "  key = A[i] (pick current element)",
              "  j = i - 1",
              "  While j is greater than or equal to 0 and A[j] is greater than key:",
              "    A[j+1] = A[j] (shift element right)",
              "    j = j - 1",
              "  A[j+1] = key (insert key at correct position)"
            ]
          },
          {
            title: "Trace for A=[12, 11, 13, 5, 6]",
            body: [
              "i=1: key=11 — 12 greater than 11 — shift 12 right — insert 11 — [11, 12, 13, 5, 6]",
              "i=2: key=13 — 12 not greater than 13 — insert 13 in place — [11, 12, 13, 5, 6]",
              "i=3: key=5 — 13 shift right, 12 shift right, 11 shift right — insert 5 at index 0 — [5, 11, 12, 13, 6]",
              "i=4: key=6 — 13 shift, 12 shift, 11 shift — insert 6 at index 1 — [5, 6, 11, 12, 13]",
              "Final sorted array: [5, 6, 11, 12, 13]"
            ]
          },
          {
            title: "Time and Space Complexity",
            body: [
              "Best Case O(n): Array already sorted — inner while loop never executes — only n-1 key comparisons made",
              "Worst Case O(n²): Reverse sorted array — each element must be shifted past all sorted elements",
              "Average Case O(n²)",
              "Space Complexity O(1): In-place using only the key variable"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and study the card sorting analogy carefully",
          "Trace Insertion Sort manually on paper for array [9, 3, 7, 1, 5]",
          "For each i from 1 to 4 show: the key picked, elements shifted right, and where key is inserted",
          "Verify final result is [1, 3, 5, 7, 9]",
          "Go to Simulation tab and click Start",
          "Press Next and observe the key element highlighted and being compared backward with sorted portion",
          "Watch elements shifting right to make room for the key",
          "Observe the key dropping into its correct slot",
          "Go to Solve tab — starter code pre-loaded",
          "Enter array size and elements in Stdin",
          "Example input: 5 on first line, 12 11 13 5 6 on second line",
          "Click Run Code",
          "Verify output: Sorted Array: 5 6 11 12 13",
          "Try with already sorted array [1 2 3 4 5] and verify the program runs in minimum comparisons",
          "Try with reverse sorted array [5 4 3 2 1] to observe worst case with maximum shifts",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    int A[] = {12, 11, 13, 5, 6};\n    int key, j;\n    \n    for (int i = 1; i < n; i++) {\n        key = A[i];\n        j = i - 1;\n        \n        while (j >= 0 && A[j] > key) {\n            A[j + 1] = A[j];\n            j = j - 1;\n        }\n        A[j + 1] = key;\n    }\n    \n    printf(\"Sorted Array: \");\n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", A[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
          steps: [
            { line: 9, annotation: "Step 1: i=1, key=11. A[0]=12 > 11. Shift 12 right. Insert 11. Array: [11, 12, 13, 5, 6]", memory: [{ variable: "key", type: "int", value: "11" }], output: "" },
            { line: 9, annotation: "Step 2: i=2, key=13. A[1]=12 not > 13. Insert in place. Array: [11, 12, 13, 5, 6]", memory: [{ variable: "key", type: "int", value: "13" }], output: "" },
            { line: 9, annotation: "Step 3: i=3, key=5. Shift 13, 12, 11 right. Insert 5 at index 0. Array: [5, 11, 12, 13, 6]", memory: [{ variable: "key", type: "int", value: "5" }], output: "" },
            { line: 9, annotation: "Step 4: i=4, key=6. Shift 13, 12, 11 right. Insert 6 at index 1. Array: [5, 6, 11, 12, 13]", memory: [{ variable: "key", type: "int", value: "6" }], output: "" },
            { line: 18, annotation: "Sorting complete", memory: [], output: "Sorted Array: 5 6 11 12 13\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Cormen T.H., Leiserson C.E., Rivest R.L., and Stein C., Introduction to Algorithms, 3rd Edition, MIT Press, Chapter 2",
          "JNTUGV Data Structures Lab Syllabus, Exercise 1"
        ]
      }
    }
  ]
};