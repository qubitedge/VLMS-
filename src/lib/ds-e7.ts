import type { Week } from "./course-data";

export const dsExercise7: Week = {
  title: "EXERCISE 7",
  objective: "Stack and Queue Applications including infix to postfix conversion using stack, palindrome checking, and symmetry checking demonstrating combined stack and queue usage.",
  tutorial: "Tutorial 7: Applications of Stacks and Queues",
  labTitle: "Lab 7: Stack and Queue Applications",
  experiments: [
    {
      id: "ds-e7-1",
      title: "Infix to Postfix Conversion",
      desc: "Convert an infix expression to a postfix expression.",
      expected: "Postfix expression",
      content: {
        aim: {
          text: "In this experiment the student will implement a C program that takes an infix arithmetic expression as input, converts it to its equivalent postfix expression using the Shunting Yard algorithm with an operator stack, and then evaluates the resulting postfix expression using an operand stack. The student will understand operator precedence, associativity rules, and how parentheses are handled during conversion, and verify that the evaluated result of the postfix expression matches the mathematical value of the original infix expression.",
          bullets: [
            "Understand operator precedence and left-to-right associativity rules used during conversion",
            "Implement the Shunting Yard algorithm using an operator stack for infix to postfix conversion",
            "Handle parentheses correctly — push open parenthesis, pop until matching open on close parenthesis",
            "Implement postfix evaluation using an operand stack on the converted expression",
            "Trace the full conversion and evaluation process token by token",
            "Verify correctness by comparing evaluated result with manual infix calculation",
            "Analyze O(n) time complexity for both conversion and evaluation"
          ]
        },
        theory: [
          {
            title: "Why Convert Infix to Postfix?",
            body: [
              "Infix expressions are natural for humans but difficult for computers to evaluate directly because:",
              "Operator precedence (* and / before + and -) must be tracked",
              "Parentheses must be parsed and matched",
              "Lookahead may be needed to determine evaluation order",
              "Postfix expressions are ideal for computers because:",
              "No parentheses needed",
              "No precedence rules during evaluation",
              "Single left-to-right scan with a stack — O(n) time",
              "Naturally used by stack-based virtual machines and calculators"
            ]
          },
          {
            title: "Operator Precedence and Associativity",
            body: [
              "| Operator | Precedence | Associativity |",
              "| ( | 0 (lowest when on stack) | — |",
              "| + - | 1 | Left to right |",
              "| * / | 2 | Left to right |",
              "| ^ | 3 (highest) | Right to left |",
              "Higher precedence operators bind more tightly. Left associativity means equal-precedence operators are evaluated left to right: 6-3-1 = (6-3)-1 = 2, not 6-(3-1) = 4."
            ]
          },
          {
            title: "Shunting Yard Algorithm — Infix to Postfix",
            body: [
              "Initialize an empty operator stack and an empty postfix output string.",
              "Scan the infix expression left to right token by token:",
              "If token is an operand (number or variable): Append it directly to postfix output.",
              "If token is an opening parenthesis (: Push it onto the operator stack.",
              "If token is a closing parenthesis ): Pop operators from stack and append to postfix output until an opening parenthesis ( is found on top. Discard both parentheses — do not add them to postfix output.",
              "If token is an operator op: While the operator stack is not empty AND the top of stack is not ( AND the precedence of stack top is greater than or equal to precedence of op (for left associative): Pop top operator and append to postfix output. Push op onto the operator stack.",
              "After scanning all tokens: Pop all remaining operators from stack and append to postfix output."
            ]
          },
          {
            title: "Trace for Infix: 3 + 4 * 2 - 1",
            body: [
              "Token 3: operand → postfix = \"3\"",
              "Token +: stack empty → push + → stack: [+]",
              "Token 4: operand → postfix = \"3 4\"",
              "Token *: precedence()=2 > precedence(+)=1 → push * → stack: [+, *]",
              "Token 2: operand → postfix = \"3 4 2\"",
              "Token -: precedence(-)=1 <= precedence(*)=2 → pop * append → postfix = \"3 4 2 *\". precedence(-)=1 <= precedence(+)=1 → pop + append → postfix = \"3 4 2 * +\". stack empty → push - → stack: [-]",
              "Token 1: operand → postfix = \"3 4 2 * + 1\"",
              "End: pop remaining - → postfix = \"3 4 2 * + 1 -\"",
              "Postfix result: 3 4 2 * + 1 -",
              "Evaluate postfix 3 4 2 * + 1 -:",
              "Push 3, Push 4, Push 2",
              "Token *: pop 2 and 4, compute 4*2=8, push 8 → Stack: [3, 8]",
              "Token +: pop 8 and 3, compute 3+8=11, push 11 → Stack: [11]",
              "Push 1",
              "Token -: pop 1 and 11, compute 11-1=10, push 10 → Stack: [10]",
              "Result = 10"
            ]
          },
          {
            title: "Trace for Infix with Parentheses: (3 + 4) * 2",
            body: [
              "Token (: push ( → stack: [(]",
              "Token 3: postfix = \"3\"",
              "Token +: top is ( → push + → stack: [(, +]",
              "Token 4: postfix = \"3 4\"",
              "Token ): pop + append → postfix = \"3 4 +\". top is ( → discard ( → stack: []",
              "Token *: stack empty → push * → stack: [*]",
              "Token 2: postfix = \"3 4 + 2\"",
              "End: pop * → postfix = \"3 4 + 2 *\"",
              "Result: (3+4)*2 = 7*2 = 14",
              "Evaluate postfix 3 4 + 2 *:",
              "Push 3, Push 4",
              "Token +: 3+4=7, push 7",
              "Push 2",
              "Token *: 7*2=14, push 14",
              "Result = 14"
            ]
          },
          {
            title: "Complete Algorithm Summary",
            body: [
              "Conversion uses one operator stack and produces postfix string.",
              "Evaluation uses one operand stack and produces numeric result.",
              "Both phases are O(n) time and O(n) space.",
              "Handling Multi-digit Numbers: When scanning character by character consecutive digit characters belong to the same number. Collect digits until a non-digit is encountered then push the complete number as one token."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory carefully and memorize the precedence table: +- have precedence 1, */ have precedence 2",
          "Manually convert infix (5 + 3) * 2 - 4 / 2 to postfix using Shunting Yard on paper",
          "Show operator stack state and postfix output after each token",
          "Evaluate the resulting postfix manually using operand stack",
          "Verify result equals (5+3)*2 - 4/2 = 16 - 2 = 14",
          "Go to Simulation tab and click Start",
          "Observe two panels — left shows operator stack and postfix output during conversion, right shows operand stack during evaluation",
          "Press Next token by token through conversion phase",
          "Watch operators being pushed held and popped based on precedence comparison",
          "After conversion completes watch the evaluation phase process the postfix token by token",
          "Go to Solve tab — starter code pre-loaded",
          "Enter infix expression in Stdin as space separated tokens",
          "Example stdin: ( 3 + 4 ) * 2",
          "Click Run Code",
          "Verify output shows postfix expression and evaluated result",
          "Try 6 + 2 * 3 - 1 and verify postfix is 6 2 3 * + 1 - and result is 11",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "int main() { /* Simulation code for infix to postfix conversion and evaluation */ return 0; }",
          steps: [
            { line: 0, annotation: "Phase 1 — Infix to Postfix Conversion for: ( 4 + 5 ) * 2 - 3", memory: [], output: "" },
            { line: 0, annotation: "Step 1 — Token: (. Push (. Operator Stack: [(], Postfix: \"\"", memory: [], output: "" },
            { line: 0, annotation: "Step 2 — Token: 4. Append. Operator Stack: [(], Postfix: \"4\"", memory: [], output: "" },
            { line: 0, annotation: "Step 3 — Token: +. Push +. Operator Stack: [(, +], Postfix: \"4\"", memory: [], output: "" },
            { line: 0, annotation: "Step 4 — Token: 5. Append. Operator Stack: [(, +], Postfix: \"4 5\"", memory: [], output: "" },
            { line: 0, annotation: "Step 5 — Token: ). Pop +, discard (. Operator Stack: [], Postfix: \"4 5 +\"", memory: [], output: "" },
            { line: 0, annotation: "Step 6 — Token: *. Push *. Operator Stack: [*], Postfix: \"4 5 +\"", memory: [], output: "" },
            { line: 0, annotation: "Step 7 — Token: 2. Append. Operator Stack: [*], Postfix: \"4 5 + 2\"", memory: [], output: "" },
            { line: 0, annotation: "Step 8 — Token: -. Pop *, push -. Operator Stack: [-], Postfix: \"4 5 + 2 *\"", memory: [], output: "" },
            { line: 0, annotation: "Step 9 — Token: 3. Append. Operator Stack: [-], Postfix: \"4 5 + 2 * 3\"", memory: [], output: "" },
            { line: 0, annotation: "Step 10 — End. Pop -. Operator Stack: [], Postfix: \"4 5 + 2 * 3 -\"", memory: [], output: "Postfix Expression: 4 5 + 2 * 3 -\n" },
            { line: 0, annotation: "Phase 2 — Postfix Evaluation: 4 5 + 2 * 3 -", memory: [], output: "Evaluated Result: 15\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "Dijkstra E.W., Shunting Yard Algorithm, Mathematisch Centrum, Amsterdam, 1961",
          "Cormen T.H. et al., Introduction to Algorithms, 3rd Edition, MIT Press",
          "JNTUGV Data Structures Lab Syllabus, Exercise 7",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
        ]
      }
    },
    {
      id: "ds-e7-2",
      title: "Palindrome Check using Stack or Queue",
      desc: "Check if a string is a palindrome using a stack or queue.",
      expected: "Is a palindrome / Not a palindrome",
      content: {
        aim: {
          text: "In this experiment the student will implement a C program to determine whether a given string is a palindrome using two approaches — a stack-based approach that reverses the string using LIFO and compares with the original, and a queue-based approach that reads the string in FIFO order for simultaneous front-to-back comparison. The student will understand how the complementary nature of LIFO and FIFO makes using both a stack and queue together an elegant solution for palindrome detection.",
          bullets: [
            "Understand the definition of a palindrome and its character-level symmetry property",
            "Implement the stack-based palindrome check by reversing via LIFO and comparing character by character",
            "Implement the queue-based approach by simultaneously dequeuing from front and comparing with original",
            "Implement the combined stack-plus-queue approach for simultaneous forward and backward comparison",
            "Handle case-insensitive comparison and ignore non-alphabetic characters for real-word palindromes",
            "Analyze O(n) time complexity and O(n) space complexity for all approaches"
          ]
        },
        theory: [
          {
            title: "What is a Palindrome?",
            body: [
              "A palindrome is a string that reads the same forward and backward. The characters at position i and position n-1-i are always equal for all valid i.",
              "Simple palindromes: \"racecar\", \"madam\", \"level\", \"civic\", \"kayak\"",
              "Phrase palindromes (ignoring spaces and case): \"A man a plan a canal Panama\", \"Was it a car or a cat I saw\"",
              "Numeric palindromes: 121, 1331, 12321"
            ]
          },
          {
            title: "Palindrome Property",
            body: [
              "For a string S of length n: S is a palindrome if and only if S[i] == S[n-1-i] for all i from 0 to n/2 - 1",
              "Equivalently: S equals reverse(S)"
            ]
          },
          {
            title: "Approach 1 — Stack-Based Reversal",
            body: [
              "Push all characters of the string onto a stack one by one. The stack reverses the string due to LIFO. Then pop characters one by one and compare with original string left to right. If any character mismatches the string is not a palindrome. If all characters match it is a palindrome.",
              "Algorithm:",
              "For i from 0 to n-1: Push S[i]",
              "For i from 0 to n-1:",
              "  ch = Pop()",
              "  If ch != S[i]: return NOT PALINDROME",
              "Return PALINDROME",
              "Why it works: stack pops in reverse order of push giving S[n-1], S[n-2], ..., S[0] which is compared against S[0], S[1], ..., S[n-1]. Mismatch at any position means not a palindrome."
            ]
          },
          {
            title: "Approach 2 — Queue-Based Approach",
            body: [
              "Enqueue all characters into a queue (FIFO). Then simultaneously:",
              "Dequeue from front of queue (gives characters in original order)",
              "Compare with characters from the original string accessed from the end using an index going backward",
              "Algorithm:",
              "For i from 0 to n-1: Enqueue S[i]",
              "j = n-1",
              "While queue is not empty:",
              "  ch = Dequeue() (gives S[0], S[1], ..., S[n-1] in order)",
              "  If ch != S[j]: return NOT PALINDROME",
              "  j--",
              "Return PALINDROME"
            ]
          },
          {
            title: "Approach 3 — Combined Stack and Queue (Optimal for Learning)",
            body: [
              "Push all characters onto stack AND enqueue all characters into queue.",
              "Pop from stack (gives reversed order) and dequeue from queue (gives original order) simultaneously.",
              "Compare each pair — if all pairs match it is a palindrome.",
              "This approach visually demonstrates both LIFO and FIFO working together and is the most instructive for understanding data structure properties.",
              "Pop gives: S[n-1], S[n-2], ..., S[0]",
              "Dequeue gives: S[0], S[1], ..., S[n-1]",
              "Comparing position by position checks S[n-1]==S[0], S[n-2]==S[1], ... which is exactly the palindrome condition.",
              "Optimization: Only n/2 comparisons are needed since the second half mirrors the first."
            ]
          },
          {
            title: "Case-Insensitive Real-Word Palindrome Check",
            body: [
              "Convert all characters to lowercase. Remove all non-alphabetic characters (spaces, punctuation). Then apply the palindrome check on the cleaned string.",
              "\"A man a plan a canal Panama\" → \"amanaplanacanalpanama\" → palindrome ✅"
            ]
          },
          {
            title: "Trace for \"racecar\"",
            body: [
              "Stack after pushing all: top → r-a-c-e-c-a-r (r at top, r at bottom)",
              "Pop sequence: r, a, c, e, c, a, r",
              "Original sequence: r, a, c, e, c, a, r",
              "All match → PALINDROME ✅"
            ]
          },
          {
            title: "Trace for \"hello\"",
            body: [
              "Stack: top → o-l-l-e-h",
              "Pop sequence: o, l, l, e, h",
              "Original: h, e, l, l, o",
              "Position 0: o != h → NOT PALINDROME ✅"
            ]
          },
          {
            title: "Time and Space Complexity",
            body: [
              "Time Complexity: O(n) — one pass to push/enqueue, one pass to compare",
              "Space Complexity: O(n) — stack or queue stores all n characters"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and trace palindrome check for \"madam\" using stack approach on paper",
          "Push m-a-d-a-m, then pop and compare: m==m, a==a, d==d, a==a, m==m — all match — palindrome",
          "Repeat trace for \"hello\" — push h-e-l-l-o, pop o and compare with h — mismatch at position 0 — not palindrome",
          "Trace combined stack-queue approach for \"racecar\" showing both pop and dequeue sequences",
          "Go to Simulation tab and click Start",
          "Observe the string being pushed onto the stack (left panel) and enqueued into the queue (right panel) simultaneously",
          "Press Next through the comparison phase — watch pairs being compared with match shown in green and mismatch in red",
          "Go to Solve tab — starter code pre-loaded",
          "Enter string in Stdin",
          "Example stdin: racecar",
          "Click Run Code",
          "Verify output: \"racecar\" is a Palindrome",
          "Test \"hello\" and verify: \"hello\" is NOT a Palindrome",
          "Test \"A man a plan a canal Panama\" with case-insensitive mode and verify: Palindrome",
          "Test \"Madam\" and verify case-insensitive palindrome check works correctly",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "int main() { /* Simulation code for palindrome check */ return 0; }",
          steps: [
            { line: 0, annotation: "Step 1 — Push all characters onto Stack and Enqueue all into Queue for \"racecar\"", memory: [], output: "" },
            { line: 0, annotation: "Step 2 — Comparison Phase (n/2 = 3 comparisons needed)", memory: [], output: "" },
            { line: 0, annotation: "Comparison 1: Pop: r, Dequeue: r. Compare: r == r", memory: [], output: "" },
            { line: 0, annotation: "Comparison 2: Pop: a, Dequeue: a. Compare: a == a", memory: [], output: "" },
            { line: 0, annotation: "Comparison 3: Pop: c, Dequeue: c. Compare: c == c", memory: [], output: "" },
            { line: 0, annotation: "Middle character e (position 3) — no comparison needed", memory: [], output: "Result: \"racecar\" IS a Palindrome\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "JNTUGV Data Structures Lab Syllabus, Exercise 7",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
        ]
      }
    },
    {
      id: "ds-e7-3",
      title: "Symmetry Check",
      desc: "Perform a symmetry check.",
      expected: "Symmetry output",
      content: {
        aim: {
          text: "In this experiment the student will implement a C program to check whether a given string or sequence is symmetric about its center using both a stack and a queue simultaneously. The student will understand the distinction between palindrome checking (character-by-character equality) and structural symmetry checking (first half mirrors second half) and implement a two-phase approach where the first half is pushed onto a stack and enqueued into a queue, and the second half is compared against both to verify mirror symmetry.",
          bullets: [
            "Understand the definition of symmetry in strings and sequences and how it differs from palindrome",
            "Implement the two-phase symmetry check — process first half then compare second half",
            "Use the stack to verify the second half mirrors the first half in reverse order",
            "Use the queue to verify the second half matches the first half in forward order",
            "Handle both even-length and odd-length strings correctly",
            "Apply the symmetry check concept to bracket sequences and numeric sequences",
            "Analyze O(n) time and O(n/2) space complexity"
          ]
        },
        theory: [
          {
            title: "What is Symmetry in a String?",
            body: [
              "A string is symmetric if its first half is a mirror image of its second half. For even-length strings every character in the first half has a corresponding mirror character in the second half. For odd-length strings the middle character is the axis of symmetry and is ignored during comparison.",
              "Symmetry is equivalent to palindrome for simple strings. However the concept generalizes to structural symmetry in sequences, trees, and expressions where the comparison involves structure rather than simple character equality."
            ]
          },
          {
            title: "Symmetry vs Palindrome — The Distinction",
            body: [
              "For simple character strings symmetry and palindrome are identical conditions — a string is symmetric if and only if it is a palindrome.",
              "The pedagogical distinction in this experiment is the method:",
              "Palindrome check: push all n characters then pop-and-compare n characters.",
              "Symmetry check: push only the first n/2 characters then compare the second n/2 characters against the stack — more memory efficient using only O(n/2) space."
            ]
          },
          {
            title: "Symmetry Check Algorithm",
            body: [
              "Phase 1 — Load First Half onto Stack AND Queue:",
              "n = length of string",
              "For i from 0 to n/2 - 1:",
              "  Push S[i] onto stack",
              "  Enqueue S[i] into queue",
              "If n is odd: skip the middle character S[n/2] (axis of symmetry)",
              "Phase 2 — Compare Second Half:",
              "For i from n/2 + (1 if odd else 0) to n-1:",
              "  ch = S[i] (current character from second half)",
              "  Stack check: Pop from stack and compare with ch",
              "  If popped character != ch: NOT SYMMETRIC (second half reversed != first half)",
              "  Queue check: Dequeue from queue and compare with ch",
              "  If dequeued character != ch: NOT SYMMETRIC (second half != first half forward)",
              "If all comparisons pass AND stack is empty AND queue is empty: SYMMETRIC"
            ]
          },
          {
            title: "What Each Structure Verifies",
            body: [
              "Stack comparison: verifies that the second half equals the reverse of the first half — this is the mirror symmetry condition (S[i] == S[n-1-i]).",
              "Queue comparison: verifies that the second half equals the first half in forward order — this checks a different type of symmetry where both halves are identical (not mirrored).",
              "For a palindrome string the stack comparison passes and the queue comparison fails (unless all characters are the same).",
              "For a string like \"abcabc\" the queue comparison passes and the stack comparison fails."
            ]
          },
          {
            title: "Trace for \"abcba\" (Symmetric / Palindrome)",
            body: [
              "n=5, n/2=2, middle index=2 (skip S[2]='c')",
              "Phase 1: Push and enqueue S[0]='a' and S[1]='b'",
              "Stack (bottom to top): a → b (b on top)",
              "Queue (front to rear): a → b (a at front)",
              "Phase 2: Process S[3]='b' and S[4]='a'",
              "i=3: S[3]='b'. Pop from stack: b == b ✅ (mirror). Dequeue from queue: a != b ❌ (forward)",
              "i=4: S[4]='a'. Pop from stack: a == a ✅ (mirror). Dequeue from queue: b != a ❌ (forward)",
              "Output: \"abcba\" IS Mirror Symmetric ✅, NOT Forward Symmetric ❌"
            ]
          },
          {
            title: "Trace for \"abcabc\" (Not Mirror Symmetric)",
            body: [
              "n=6, n/2=3",
              "Phase 1: Push and enqueue a, b, c",
              "Phase 2: Process a, b, c",
              "i=3: S[3]='a'. Pop from stack: c != a ❌ → NOT Mirror Symmetric",
              "Queue comparison: Dequeue a == a ✅, b == b ✅, c == c ✅ → Forward Symmetric",
              "Output: \"abcabc\" is NOT Mirror Symmetric but IS Forward Symmetric ✅"
            ]
          },
          {
            title: "Time and Space Complexity",
            body: [
              "Time Complexity: O(n) — one pass to load first half, one pass to compare second half",
              "Space Complexity: O(n/2) — only first half stored in stack and queue, more efficient than full palindrome check"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and understand the two-phase approach — load first half, compare second half",
          "Trace symmetry check for \"abcba\" on paper showing Phase 1 stack and queue contents and Phase 2 comparisons",
          "Separately trace \"abcabc\" and identify which check passes (queue — forward symmetric) and which fails (stack — not mirror symmetric)",
          "Trace bracket symmetry for \"{[()]}\" — push { [ ( — compare ) ] } against stack: pop ( matches ), pop [ matches ], pop { matches } — symmetric",
          "Go to Simulation tab and click Start",
          "Observe two-panel display: left shows stack and queue being loaded during Phase 1 with first half characters",
          "The middle character is highlighted and skipped for odd-length strings",
          "Press Next through Phase 2 — observe pop-and-compare for stack and dequeue-and-compare for queue",
          "Watch green highlights for matches and red for mismatches",
          "Go to Solve tab — starter code pre-loaded",
          "Enter string in Stdin",
          "Example stdin: abcba",
          "Click Run Code",
          "Verify output: \"abcba\" IS Mirror Symmetric",
          "Test \"abcabc\" and verify: NOT Mirror Symmetric, IS Forward Symmetric",
          "Test \"{[()]}\" and verify symmetry in bracket sequence",
          "Test \"abcde\" and verify: NOT Symmetric",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "int main() { /* Simulation code for symmetry check */ return 0; }",
          steps: [
            { line: 0, annotation: "Phase 1 — Load First Half for \"abcba\"", memory: [], output: "" },
            { line: 0, annotation: "Push/Enqueue 'a', Push/Enqueue 'b'", memory: [], output: "" },
            { line: 0, annotation: "Skip middle 'c'", memory: [], output: "" },
            { line: 0, annotation: "Phase 2 — Compare Second Half", memory: [], output: "" },
            { line: 0, annotation: "Comparison 1: i=3 ('b'). Stack Pop: 'b' == 'b' (Match). Queue Dequeue: 'a' != 'b' (Mismatch)", memory: [], output: "" },
            { line: 0, annotation: "Comparison 2: i=4 ('a'). Stack Pop: 'a' == 'a' (Match). Queue Dequeue: 'b' != 'a' (Mismatch)", memory: [], output: "Result: \"abcba\" IS Mirror Symmetric (Palindrome)\nResult: \"abcba\" is NOT Forward Symmetric\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "Cormen T.H. et al., Introduction to Algorithms, 3rd Edition, MIT Press, Chapter 10",
          "Sedgewick R., Algorithms in C Parts 1-5, Addison-Wesley",
          "JNTUGV Data Structures Lab Syllabus, Exercise 7",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/",
          "Wandbox Online Compiler: https://wandbox.org"
        ]
      }
    }
  ]
};
