import type { Week } from "./course-data";

export const dsExercise5: Week = {
  title: "EXERCISE 5",
  objective: "Stack Operations including array-based and linked list-based stack implementation, postfix expression evaluation, and balanced parenthesis checking as classical stack applications.",
  tutorial: "Tutorial 5: Stacks",
  labTitle: "Lab 5: Stack Operations",
  experiments: [
    {
      id: "ds-e5-1",
      title: "Stack using Array",
      desc: "Implement stack operations (push, pop, peek) using an array.",
      expected: "Stack elements",
      content: {
        aim: {
          text: "In this experiment the student will implement a stack data structure in C using a static array and a top variable that tracks the index of the topmost element. The student will implement all four fundamental stack operations — push, pop, peek, and isEmpty — enforce the stack overflow and underflow conditions, and understand the Last In First Out (LIFO) principle that governs all stack behavior.",
          bullets: [
            "Understand the LIFO principle and its role in programming and real-world systems",
            "Implement push operation with overflow check when top reaches MAX-1",
            "Implement pop operation with underflow check when top equals -1",
            "Implement peek to view top element without removing it",
            "Implement isEmpty and isFull helper functions",
            "Trace a sequence of push and pop operations showing the top variable and array state at each step",
            "Analyze O(1) time complexity for all stack operations"
          ]
        },
        theory: [
          {
            title: "What is a Stack?",
            body: [
              "A stack is a linear data structure that follows the Last In First Out (LIFO) principle — the element inserted most recently is the first one to be removed. Think of a stack of plates — you add plates to the top and remove plates from the top. The plate placed last is the first one picked up."
            ]
          },
          {
            title: "LIFO Principle Examples",
            body: [
              "Function call stack in programming: the most recently called function is the first to return.",
              "Browser back button: the most recently visited page is the first to be revisited when going back.",
              "Undo operation in text editors: the most recent edit is the first to be undone.",
              "Expression evaluation: operators are processed in reverse order of their depth."
            ]
          },
          {
            title: "Stack as Restricted Linear Structure",
            body: [
              "Unlike an array or linked list that allows access to any element, a stack restricts all operations to one end called the top. No insertion or deletion is permitted anywhere except the top."
            ]
          },
          {
            title: "Array-Based Stack Implementation",
            body: [
              "A fixed-size array A of capacity MAX stores the stack elements. An integer variable top tracks the index of the current topmost element.",
              "Initial state: top = -1 (empty stack convention)",
              "Array indices used: 0 (bottom) to top (topmost element)"
            ]
          },
          {
            title: "Four Fundamental Operations",
            body: [
              "Push(value): Check if top equals MAX-1 — if yes print Stack Overflow and return (cannot push to full stack). Increment top by 1. Set A[top] = value. Time complexity: O(1)",
              "Pop(): Check if top equals -1 — if yes print Stack Underflow and return (cannot pop from empty stack). Save A[top] in a variable. Decrement top by 1. Return saved value. Time complexity: O(1)",
              "Peek(): Check if top equals -1 — if yes print Stack is Empty. Return A[top] without modifying top. Time complexity: O(1)",
              "isEmpty(): Return true if top equals -1, false otherwise. Time complexity: O(1)",
              "isFull(): Return true if top equals MAX-1, false otherwise. Time complexity: O(1)"
            ]
          },
          {
            title: "Stack Trace for operations: Push 10, Push 20, Push 30, Pop, Peek, Pop",
            body: [
              "After Push 10: A=[10, _, _], top=0, Stack: [10]",
              "After Push 20: A=[10,20, _], top=1, Stack: [10,20]",
              "After Push 30: A=[10,20,30], top=2, Stack: [10,20,30]",
              "After Pop: returns 30, top=1, Stack: [10,20]",
              "After Peek: returns 20, top=1 unchanged, Stack: [10,20]",
              "After Pop: returns 20, top=0, Stack: [10]"
            ]
          },
          {
            title: "Advantages and Disadvantages of Array-Based Stack",
            body: [
              "Advantages: Simple implementation, O(1) all operations, good cache locality since elements stored contiguously, no pointer overhead per element.",
              "Disadvantages: Fixed size — MAX must be decided at compile time. Stack overflow when capacity exceeded. Memory wasted if stack rarely fills up."
            ]
          },
          {
            title: "Array vs Linked List Stack",
            body: [
              "| Property | Array Stack | Linked List Stack |",
              "| Size | Fixed at compile time | Dynamic grows as needed |",
              "| Overflow | Possible when full | Only when system memory exhausted |",
              "| Memory per element | Just the data | Data plus one pointer |",
              "| Cache performance | Better | Worse due to pointer chasing |",
              "| Implementation | Simpler | Slightly more complex |"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and draw the array stack diagram for MAX=5 showing the array cells and top variable",
          "Trace on paper: Push 5, Push 10, Push 15, Pop, Push 20, Peek showing top value and array state after each",
          "Verify Pop returns 15, Peek returns 10, and the array state is correct",
          "Go to Simulation tab and click Start",
          "Press Next and observe the array visualization with the top pointer highlighted at the current position",
          "Watch Push operations filling cells from bottom up and Pop operations retreating the top pointer",
          "Observe the Overflow message when pushing to a full stack and Underflow when popping an empty stack",
          "Go to Solve tab — starter code pre-loaded",
          "Enter operation sequence in Stdin",
          "Operations: 1=Push, 2=Pop, 3=Peek, 4=isEmpty, 5=isFull, 6=Display, 0=Exit",
          "Test sequence: push 10, push 20, push 30, display, pop, peek, display",
          "Click Run Code and verify output matches expected stack state",
          "Try pushing beyond MAX and verify overflow message appears",
          "Try popping from empty stack and verify underflow message appears",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "int main() { /* Simulation code for array-based stack operations */ return 0; }",
          steps: [
            { line: 0, annotation: "Initial State: top = -1, Array: [_, _, _, _, _], Stack is empty", memory: [], output: "" },
            { line: 0, annotation: "Step 1 — Push 10: top=0, A[0]=10", memory: [], output: "10 pushed to stack\n" },
            { line: 0, annotation: "Step 2 — Push 20: top=1, A[1]=20", memory: [], output: "20 pushed to stack\n" },
            { line: 0, annotation: "Step 3 — Push 30: top=2, A[2]=30", memory: [], output: "30 pushed to stack\n" },
            { line: 0, annotation: "Step 4 — Pop: top=1, returns 30", memory: [], output: "30 popped from stack\n" },
            { line: 0, annotation: "Step 5 — Peek: returns 20, top=1", memory: [], output: "Top element is 20 (stack unchanged)\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "Cormen T.H. et al., Introduction to Algorithms, 3rd Edition, MIT Press, Chapter 10",
          "JNTUGV Data Structures Lab Syllabus, Exercise 5",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
        ]
      }
    },
    {
      id: "ds-e5-2",
      title: "Stack using Linked List",
      desc: "Implement stack operations using a linked list.",
      expected: "Stack elements",
      content: {
        aim: {
          text: "In this experiment the student will implement a dynamic stack in C using a singly linked list where each push operation creates a new node at the front of the list and each pop operation removes the front node. The student will understand how this approach eliminates the fixed-size limitation of the array-based stack and allows the stack to grow and shrink dynamically limited only by available heap memory.",
          bullets: [
            "Implement push by creating a new node and inserting at the front of the linked list",
            "Implement pop by removing the front node and freeing its memory",
            "Implement peek to return the data of the front node without removal",
            "Understand why the front of the linked list serves as the top of the stack",
            "Verify O(1) time complexity for all operations without any overflow condition",
            "Compare memory usage and flexibility between array-based and linked list-based stacks"
          ]
        },
        theory: [
          {
            title: "Why Linked List for Stack",
            body: [
              "The array-based stack has a fundamental limitation — its capacity MAX must be fixed at compile time. If the actual number of pushes exceeds MAX the stack overflows. If the stack rarely fills up memory is wasted.",
              "A linked list-based stack allocates exactly one node per push and frees one node per pop. The stack grows and shrinks with the actual data — no wasted memory and no fixed capacity limit. Overflow only occurs when the entire system heap is exhausted which is extremely rare in practice."
            ]
          },
          {
            title: "Mapping Stack to Linked List",
            body: [
              "Top of stack = Front (head) of linked list",
              "Push = Insert new node at front (head insertion — O(1))",
              "Pop = Remove node from front (head deletion — O(1))",
              "Peek = Read head→data without modification (O(1))",
              "Using the front instead of the rear is critical. Insertion and deletion at the rear of a singly linked list require O(n) traversal. At the front both operations are O(1) matching the required stack complexity."
            ]
          },
          {
            title: "Node Structure",
            body: [
              "struct StackNode {",
              "int data;",
              "struct StackNode *next;",
              "};",
              "struct StackNode *top = NULL; (top pointer replaces top index)"
            ]
          },
          {
            title: "Push Operation",
            body: [
              "Create new node with given value.",
              "newNode→next = top (new node points to current top node).",
              "top = newNode (top pointer updated to new node).",
              "Top of stack is always top→data.",
              "Time: O(1). No overflow condition possible (except system memory exhaustion)."
            ]
          },
          {
            title: "Pop Operation",
            body: [
              "Check if top equals NULL — Stack Underflow if yes.",
              "Save top in temp.",
              "top = top→next (top pointer retreats to next node).",
              "Save temp→data as return value.",
              "free(temp) — release memory of popped node.",
              "Return saved value.",
              "Time: O(1)."
            ]
          },
          {
            title: "Peek Operation",
            body: [
              "Check if top equals NULL — Stack Empty if yes.",
              "Return top→data without any modification.",
              "Time: O(1)."
            ]
          },
          {
            title: "Stack Trace: Push 10, Push 20, Push 30, Pop, Peek",
            body: [
              "After Push 10: top → [10|NULL]",
              "After Push 20: top → [20|→10] → [10|NULL]",
              "After Push 30: top → [30|→20] → [20|→10] → [10|NULL]",
              "After Pop (returns 30): top → [20|→10] → [10|NULL]. Node 30 freed.",
              "After Peek (returns 20): top → [20|→10] → [10|NULL]. Stack unchanged."
            ]
          },
          {
            title: "Linked List Stack vs Array Stack",
            body: [
              "| Property | Array Stack | Linked List Stack |",
              "| Capacity | Fixed MAX at compile time | Dynamic — limited only by heap |",
              "| Overflow | Yes when top = MAX-1 | No (only system memory exhaustion) |",
              "| Memory efficiency | May waste unused slots | Allocates exactly what is needed |",
              "| Memory per element | Just the data | Data plus one pointer (overhead) |",
              "| Cache performance | Better (contiguous) | Worse (scattered heap nodes) |",
              "| Implementation | Simpler | Slightly more complex |",
              "| Best used when | Size is known in advance | Size is unpredictable |"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and draw the linked list diagram after each of: Push 5, Push 10, Push 15 showing top pointer and node connections",
          "Verify top→data = 15 (most recent push) and top→next→data = 10 and top→next→next→data = 5",
          "Trace Pop — draw diagram after popping, verify node(15) is freed and top moves to node(10)",
          "Go to Simulation tab and click Start",
          "Press Next and observe new nodes appearing at the front of the list visualization on each Push",
          "Watch the top pointer always pointing to the leftmost (newest) node",
          "Observe node disappearing and being freed on Pop with top retreating to the next node",
          "Go to Solve tab — starter code pre-loaded",
          "Enter operation sequence in Stdin using same codes as array stack program",
          "Test sequence: push 100, push 200, push 300, display, pop, pop, peek, display",
          "Click Run Code and verify output",
          "Try pushing 1000 elements and verify no overflow occurs",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "int main() { /* Simulation code for linked list stack */ return 0; }",
          steps: [
            { line: 0, annotation: "Step 1 — Push 10: Stack: top → [10|NULL]", memory: [], output: "10 pushed\n" },
            { line: 0, annotation: "Step 2 — Push 20: Stack: top → [20|→1000] → [10|NULL]", memory: [], output: "20 pushed\n" },
            { line: 0, annotation: "Step 3 — Push 30: Stack: top → [30|→2000] → [20|→1000] → [10|NULL]", memory: [], output: "30 pushed\n" },
            { line: 0, annotation: "Step 4 — Pop: free(temp), Stack: top → [20|→1000] → [10|NULL]", memory: [], output: "30 popped\n" },
            { line: 0, annotation: "Step 5 — Peek: return top→data = 20", memory: [], output: "Top element is 20\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "JNTUGV Data Structures Lab Syllabus, Exercise 5",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
        ]
      }
    },
    {
      id: "ds-e5-3",
      title: "Postfix Expression Evaluation",
      desc: "Evaluate a postfix expression using a stack.",
      expected: "Evaluated result",
      content: {
        aim: {
          text: "In this experiment the student will implement a C program to evaluate a postfix (Reverse Polish Notation) expression using a stack. The student will understand why postfix notation eliminates the need for parentheses and operator precedence rules during evaluation, and trace the operand-push and operator-pop-compute-push mechanism that processes any valid postfix expression in a single left-to-right scan in O(n) time.",
          bullets: [
            "Understand postfix notation and how it differs from infix notation",
            "Implement the postfix evaluation algorithm using an integer stack",
            "Process each token left to right — push operands, pop two operands on operator, compute, push result",
            "Handle all four arithmetic operators — addition, subtraction, multiplication, division",
            "Trace the complete stack state after each token is processed",
            "Analyze O(n) time complexity and O(n) space complexity"
          ]
        },
        theory: [
          {
            title: "Infix vs Postfix Notation",
            body: [
              "Infix notation places the operator between operands: 3 + 4, (2 + 3) * 5. Humans read infix naturally but computers must handle operator precedence and parentheses making parsing complex.",
              "Postfix notation (Reverse Polish Notation — RPN) places the operator after its operands: 3 4 +, 2 3 + 5 *. No parentheses are ever needed. Operator precedence is embedded in the position of operators. Computers evaluate postfix in a single left-to-right pass using a stack.",
              "| Infix | Postfix |",
              "| 3 + 4 | 3 4 + |",
              "| (2 + 3) * 5 | 2 3 + 5 * |",
              "| 6 + 2 * 3 | 6 2 3 * + |",
              "| (5 - 2) * (4 + 1) | 5 2 - 4 1 + * |"
            ]
          },
          {
            title: "Postfix Evaluation Algorithm",
            body: [
              "Scan the postfix expression left to right token by token.",
              "If token is an operand (number): Push it onto the stack.",
              "If token is an operator (+, -, *, /):",
              "Pop the top element as operand2 (right operand).",
              "Pop the next element as operand1 (left operand).",
              "Compute result = operand1 operator operand2.",
              "Push result onto the stack.",
              "After scanning all tokens the stack contains exactly one element — the final result.",
              "Note: The order of popping matters. The first pop gives the right operand and the second pop gives the left operand. For subtraction 8 3 - means 8-3=5 not 3-8=-5. Reversing the operands gives wrong results for non-commutative operators."
            ]
          },
          {
            title: "Trace for Postfix: 5 3 + 2 * 8 4 / -",
            body: [
              "Token 5: Push 5 → Stack: [5]",
              "Token 3: Push 3 → Stack: [5, 3]",
              "Token +: Pop 3 (op2), Pop 5 (op1), compute 5+3=8, Push 8 → Stack: [8]",
              "Token 2: Push 2 → Stack: [8, 2]",
              "Token *: Pop 2 (op2), Pop 8 (op1), compute 8*2=16, Push 16 → Stack: [16]",
              "Token 8: Push 8 → Stack: [16, 8]",
              "Token 4: Push 4 → Stack: [16, 8, 4]",
              "Token /: Pop 4 (op2), Pop 8 (op1), compute 8/4=2, Push 2 → Stack: [16, 2]",
              "Token -: Pop 2 (op2), Pop 16 (op1), compute 16-2=14, Push 14 → Stack: [14]",
              "Result: 14",
              "Verification using infix: (5+3)*2 - 8/4 = 8*2 - 2 = 16-2 = 14"
            ]
          },
          {
            title: "Why Postfix Needs No Parentheses",
            body: [
              "In postfix the position of operators encodes precedence implicitly. The operator acts on exactly the two most recently seen unevaluated operands. No look-ahead or precedence table is needed making evaluation straightforward and efficient."
            ]
          },
          {
            title: "Time and Space Complexity",
            body: [
              "Time Complexity: O(n) — each token is processed exactly once",
              "Space Complexity: O(n) — stack holds at most n/2 operands for a fully parenthesized expression"
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and manually convert infix (4 + 5) * 2 - 6 / 3 to postfix: 4 5 + 2 * 6 3 / -",
          "Trace the postfix evaluation on paper token by token showing stack state after each",
          "Verify result: (4+5)*2 - 6/3 = 18 - 2 = 16",
          "Go to Simulation tab and click Start",
          "Press Next for each token and observe whether it is pushed (operand) or triggers a pop-compute-push (operator)",
          "Watch the stack panel update after each token showing current stack contents",
          "Observe the final single element remaining as the result",
          "Go to Solve tab — starter code pre-loaded",
          "Enter the postfix expression in Stdin as space-separated tokens",
          "Example stdin: 5 3 + 2 * 8 4 / -",
          "Click Run Code",
          "Verify output: Result = 14",
          "Try postfix expression for (3+4)*(5-2): 3 4 + 5 2 - * and verify result = 21",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "int main() { /* Simulation code for postfix evaluation */ return 0; }",
          steps: [
            { line: 0, annotation: "Step 1 — Token: 6 (operand). Push 6. Stack: [6]", memory: [], output: "" },
            { line: 0, annotation: "Step 2 — Token: 2 (operand). Push 2. Stack: [6, 2]", memory: [], output: "" },
            { line: 0, annotation: "Step 3 — Token: 3 (operand). Push 3. Stack: [6, 2, 3]", memory: [], output: "" },
            { line: 0, annotation: "Step 4 — Token: + (operator). Pop 3, Pop 2. Compute 2+3=5. Push 5. Stack: [6, 5]", memory: [], output: "" },
            { line: 0, annotation: "Step 5 — Token: * (operator). Pop 5, Pop 6. Compute 6*5=30. Push 30. Stack: [30]", memory: [], output: "" },
            { line: 0, annotation: "Step 6 — Token: 4 (operand). Push 4. Stack: [30, 4]", memory: [], output: "" },
            { line: 0, annotation: "Step 7 — Token: - (operator). Pop 4, Pop 30. Compute 30-4=26. Push 26. Stack: [26]", memory: [], output: "Result = 26\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "Cormen T.H. et al., Introduction to Algorithms, 3rd Edition, MIT Press",
          "JNTUGV Data Structures Lab Syllabus, Exercise 5",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
        ]
      }
    },
    {
      id: "ds-e5-4",
      title: "Balanced Parenthesis Check",
      desc: "Check if parentheses in an expression are balanced.",
      expected: "Balanced / Not Balanced",
      content: {
        aim: {
          text: "In this experiment the student will implement a C program to check whether a given expression string has correctly balanced and properly nested parentheses, brackets, and braces using a stack. The student will understand how the LIFO property of a stack perfectly models the nesting requirement — the most recently opened delimiter must be the first one closed — and handle all three delimiter types simultaneously in a single left-to-right scan.",
          bullets: [
            "Understand the nesting requirement that makes stacks the natural solution for this problem",
            "Push every opening delimiter onto the stack when encountered",
            "On encountering a closing delimiter check if the top of the stack holds its matching opening delimiter",
            "Report unbalanced expression when a mismatch occurs or stack is not empty at end of string",
            "Handle all three delimiter pairs — () [] {} — simultaneously",
            "Analyze O(n) time complexity and O(n) space complexity"
          ]
        },
        theory: [
          {
            title: "What is a Balanced Expression?",
            body: [
              "An expression is balanced if every opening delimiter has a corresponding closing delimiter of the same type, they are properly nested (no interleaving), and there are no unmatched openers or closers.",
              "Balanced examples: (a + b) * (c - d) ✅, {[()]} ✅, [(a+b) * {c-(d+e)}] ✅",
              "Unbalanced examples: (a + b] — wrong closing type ❌, {[}] — interleaved delimiters ❌, (a + b — unclosed opener ❌, a + b) — unmatched closer ❌"
            ]
          },
          {
            title: "Why Stack is the Perfect Solution",
            body: [
              "The key insight is: a closing delimiter must match the most recently opened unmatched opening delimiter. This is exactly what a stack's LIFO property provides — the most recently pushed item is always at the top.",
              "When we see ( push it. When we see ) check if top is ( and pop. If top is [ or { it is a mismatch. If the stack is empty when we see ) there is no matching opener."
            ]
          },
          {
            title: "Algorithm",
            body: [
              "Initialize an empty stack.",
              "Scan the expression left to right character by character:",
              "If character is an opening delimiter ( or [ or {: Push it onto the stack.",
              "If character is a closing delimiter ) or ] or }:",
              "If stack is empty: return Unbalanced — unmatched closing delimiter.",
              "Pop top element.",
              "If popped element does not match the current closing delimiter: return Unbalanced — mismatched pair.",
              "If character is neither: skip it (regular character).",
              "After scanning all characters:",
              "If stack is empty: return Balanced.",
              "Else: return Unbalanced — unclosed opening delimiters remain.",
              "Matching Pairs: ( matches ), [ matches ], { matches }"
            ]
          },
          {
            title: "Trace for Expression: {[()]}",
            body: [
              "Token {: Push { → Stack: [{]",
              "Token [: Push [ → Stack: [{, []",
              "Token (: Push ( → Stack: [{, [, (]",
              "Token ): Pop ( → matches ) ✅ → Stack: [{, []",
              "Token ]: Pop [ → matches ] ✅ → Stack: [{]",
              "Token }: Pop { → matches } ✅ → Stack: []",
              "End of string: Stack empty → BALANCED ✅"
            ]
          },
          {
            title: "Trace for Expression: {[}]",
            body: [
              "Token {: Push { → Stack: [{]",
              "Token [: Push [ → Stack: [{, []",
              "Token }: Pop [ → [ does NOT match } ❌ → UNBALANCED"
            ]
          },
          {
            title: "Time and Space Complexity",
            body: [
              "Time Complexity: O(n) — each character processed exactly once",
              "Space Complexity: O(n) — stack holds at most n/2 opening delimiters in worst case (all openers then all closers like ((())))"
            ]
          },
          {
            title: "Real World Applications",
            body: [
              "Compiler syntax checking: every compiler checks balanced braces in source code.",
              "XML and HTML validation: every opening tag must have a matching closing tag.",
              "Mathematical expression validation before evaluation.",
              "IDE bracket matching highlighting."
            ]
          }
        ],
        pretest: [],
        procedure: [
          "Read Theory and manually trace {[(a+b)*(c-d)]} on paper token by token",
          "Only process { [ ( ) ] } — skip letters, digits, and operators",
          "Show stack state after each delimiter: push openers, pop and verify match for closers",
          "Verify stack is empty at end — expression is balanced",
          "Now trace {[}] and identify the mismatch point",
          "Go to Simulation tab and click Start",
          "Press Next for each character — observe openers being pushed (highlighted green) and closers triggering pop and match check",
          "Watch a mismatch trigger an immediate Unbalanced result highlighted in red",
          "Watch a balanced expression end with an empty stack highlighted in green",
          "Go to Solve tab — starter code pre-loaded",
          "Enter expression string in Stdin",
          "Example stdin: {[()]}",
          "Click Run Code",
          "Verify output: Expression is Balanced",
          "Test {[}] — verify output: Expression is Unbalanced (mismatched pair)",
          "Test ((( — verify output: Expression is Unbalanced (unclosed delimiters)",
          "Test )) — verify output: Expression is Unbalanced (unmatched closer)",
          "Proceed to Posttest"
        ],
        simulation: {
          code: "int main() { /* Simulation code for balanced parenthesis check */ return 0; }",
          steps: [
            { line: 0, annotation: "Step 1 — Token: [. Opening delimiter — Push [. Stack: [[]", memory: [], output: "" },
            { line: 0, annotation: "Step 2 — Token: (. Opening delimiter — Push (. Stack: [[, (]", memory: [], output: "" },
            { line: 0, annotation: "Step 3 — Token: ). Closing delimiter. Stack not empty — Pop (. Does ( match )? Yes. Stack: [[]", memory: [], output: "" },
            { line: 0, annotation: "Step 4 — Token: {. Opening delimiter — Push {. Stack: [[, {]", memory: [], output: "" },
            { line: 0, annotation: "Step 5 — Token: }. Closing delimiter. Stack not empty — Pop {. Does { match }? Yes. Stack: [[]", memory: [], output: "" },
            { line: 0, annotation: "Step 6 — Token: ]. Closing delimiter. Stack not empty — Pop [. Does [ match ]? Yes. Stack: []", memory: [], output: "Result: BALANCED\n" }
          ]
        },
        posttest: [],
        references: [
          "Weiss M.A., Data Structures and Algorithm Analysis in C, 2nd Edition, Pearson",
          "Horowitz E., Sahni S., and Anderson-Freed S., Fundamentals of Data Structures in C, Silicon Press, 2008",
          "Cormen T.H. et al., Introduction to Algorithms, 3rd Edition, MIT Press",
          "Sedgewick R., Algorithms in C Parts 1-5, Addison-Wesley",
          "JNTUGV Data Structures Lab Syllabus, Exercise 5",
          "GCC Documentation: https://gcc.gnu.org/onlinedocs/",
          "Wandbox Online Compiler: https://wandbox.org"
        ]
      }
    }
  ]
};
