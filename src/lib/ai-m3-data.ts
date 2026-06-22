import { Experiment } from "./course-data";

export const aiM3Experiments: Experiment[] = [
  {
    id: "ai-m3-1",
    title: "Claude Code Mini-Project",
    desc: "Build a functional mini-project using Claude Code with natural language instructions.",
    expected: "A multi-file project with a main CLI script or API, data file, comprehensive error handling, and a README — all functional and testable.",
    content: {
      aim: {
        text: "To use Claude as an AI software architect by providing high-level project briefs and iteratively decomposing them into working code \u2014 covering file structure planning, function-by-function implementation, and debugging cycles \u2014 demonstrating end-to-end AI-assisted software development from specification to running output.",
        bullets: [
          "Understand the architectural difference between agentic coding assistants like Claude Code and autocomplete tools like GitHub Copilot",
          "Use natural language to specify functional requirements and watch Claude Code translate them into working code",
          "Observe how Claude Code handles multi-file project scaffolding, dependency management, and iterative debugging",
          "Evaluate the quality, readability, and correctness of Claude Code generated output against software engineering standards",
          "Intentionally introduce a bug or requirement change mid-session and observe how Claude Code responds to correction instructions",
          "Understand the appropriate boundaries of AI-generated code in production contexts including security review and testing obligations",
          "Apply Claude Code to a practical CSE mini-project such as a CLI tool, REST API, or data processing script"
        ]
      },
      theory: [
            {
                  "title": "Claude as a Software Architect",
                  "body": [
                        "Unlike autocomplete tools, Claude understands the full context of your project. You describe what you want to build in plain English and Claude plans the structure, writes each part, and explains every decision.",
                        "Describe the project in plain English  \u2192  Claude plans file structure  \u2192  Claude writes each function  \u2192  You test it & report bugs  \u2192  Claude fixes & explains"
                  ]
            },
            {
                  "title": "Effective Project Prompting",
                  "body": [
                        "Using structural prompt components to direct the code generation behavior.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Prompt Element</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Example</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Goal</td><td class=\"p-3 text-muted-foreground\">'Build a Python script that reads a CSV and outputs a summary'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Constraints</td><td class=\"p-3 text-muted-foreground\">'Use only standard libraries, no pip installs'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Output form</td><td class=\"p-3 text-muted-foreground\">'Show me the file structure first, then write each file'</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Debug style</td><td class=\"p-3 text-muted-foreground\">'Here is the error message \u2014 explain what went wrong'</td></tr></tbody></table>",
                        "![Claude Code Mini-Project](/aitools_exp9.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Read the Theory section and understand the distinction between agentic and autocomplete AI.",
        "Choose a mini-project (e.g., A command-line task manager in Python persisting tasks to a JSON file).",
        "Open the Solve tab and navigate to the Claude Code workspace.",
        "Begin with a complete natural language requirements statement. Be specific about the programming language, framework, data persistence, specific features, and output format.",
        "Submit the requirements and observe Claude Code's plan. Read the plan carefully before approving.",
        "After generation is complete, read every generated file and test the application manually with normal and edge cases.",
        "Identify one bug or missing feature and issue a correction instruction in plain natural language.",
        "Issue a requirement extension (e.g., 'Add a priority field to each task') and review the changes.",
        "Document the full session, bugs found, correction exchanges, and your code quality assessment for the Feedback Report."
      ],
      posttest: [],
      references: [
        "Anthropic Claude Code Documentation",
        "JNTUGV AI Tools Lab Syllabus, Module 3 — Coding Lab"
      ]
    }
  },
  {
    id: "ai-m3-2",
    title: "Cursor AI Refactoring",
    desc: "Refactor and debug an existing codebase using Cursor AI's inline editing and chat.",
    expected: "Refactored code that is measurably cleaner against clean code principles, with a planted bug identified and fixed.",
    content: {
      aim: {
        text: "To use Cursor AI's editor-integrated AI to refactor existing codebases by applying targeted AI instructions for improving code readability, reducing duplication, enforcing naming conventions, and splitting monolithic functions \u2014 measuring before-and-after code quality improvements.",
        bullets: [
          "Understand Cursor AI's architecture as an AI-native editor and how it differs from VS Code with Copilot",
          "Use Cursor's Cmd+K inline edit feature to perform targeted refactoring of specific functions",
          "Use the Chat sidebar with codebase context to ask architectural and debugging questions",
          "Apply AI-assisted debugging to identify and fix a planted bug in a provided codebase",
          "Perform a meaningful refactoring task and evaluate the before/after quality against clean code principles"
        ]
      },
      theory: [
            {
                  "title": "What Is Refactoring?",
                  "body": [
                        "Refactoring means improving the structure of existing code without changing what it does. Think of it like reorganising a messy room \u2014 everything still works, but it's now clean and easy to navigate.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Refactoring Task</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Before</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">After</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Rename variables</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">'x', 'temp', 'data2'</td><td class=\"p-3 text-muted-foreground\">Descriptive names: 'user_age', 'invoice_total'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Split long function</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">One 200-line function</td><td class=\"p-3 text-muted-foreground\">10 focused 20-line functions</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Remove duplication</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Same logic copy-pasted 5 times</td><td class=\"p-3 text-muted-foreground\">One reusable function called 5 times</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Add comments</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">No explanations in code</td><td class=\"p-3 text-muted-foreground\">Every function has a clear docstring</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "Cursor AI Refactoring Flow",
                  "body": [
                        "Open messy code in Cursor  \u2192  Select a section & press Cmd+K  \u2192  'Refactor this: make it cleaner'  \u2192  AI rewrites in-place  \u2192  Review & accept changes",
                        "![Cursor AI Refactoring](/aitools_exp10.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Read the Theory section and understand Cursor's interaction modes.",
        "Open the Solve tab and navigate to the Cursor AI workspace (pre-loaded with a buggy Python project).",
        "Read through the codebase without making changes and write down three code quality issues and one potentially buggy section.",
        "Use Chat sidebar (Cmd+L) to ask Cursor to review the overall structure and identify code quality issues.",
        "Select a complex function and use Cmd+K to issue a refactoring instruction (e.g., 'Refactor this function to follow the single responsibility principle').",
        "Review the diff, evaluate it against clean code principles, and accept if it is an improvement.",
        "Use Chat sidebar to investigate the planted bug, ask for hypotheses, and use Cmd+K to apply the fix.",
        "Perform one more refactoring task to improve variable naming.",
        "Document before and after code, Cursor's responses, and your evaluation decisions for the Feedback Report."
      ],
      posttest: [],
      references: [
        "Cursor AI Documentation",
        "Martin R.C., Clean Code",
        "JNTUGV AI Tools Lab Syllabus, Module 3 — Coding Lab"
      ]
    }
  },
  {
    id: "ai-m3-3",
    title: "GitHub Copilot Productivity",
    desc: "Measure and maximize developer productivity using GitHub Copilot for code and test generation.",
    expected: "Working implementations of function stubs, a Copilot-generated test file with gaps manually filled, and a productivity comparison table.",
    content: {
      aim: {
        text: "To measure the productivity impact of GitHub Copilot's inline code completion by completing a set of timed coding tasks with and without Copilot enabled \u2014 documenting keystrokes saved, time reduction, and accuracy of suggestions across different programming languages and task types.",
        bullets: [
          "Understand how GitHub Copilot uses the Codex and GPT-4 models to generate context-aware code completions",
          "Use Copilot inline suggestions to accelerate implementation of standard algorithmic tasks",
          "Use Copilot's test generation feature to produce unit tests",
          "Measure productivity impact by timing AI-assisted versus unassisted completion",
          "Critically evaluate the quality of Copilot suggestions",
          "Understand the tab-to-accept risk and the importance of reading every suggestion"
        ]
      },
      theory: [
            {
                  "title": "How GitHub Copilot Works",
                  "body": [
                        "Copilot watches what you type in real time. As you write a function name or a comment describing what you need, it predicts the entire code block and shows it in grey text. Press Tab to accept.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Trigger Type</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What You Type</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What Copilot Generates</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Comment trigger</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\"># sort this list in descending order</td><td class=\"p-3 text-muted-foreground\">Full sort function with return</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Function name</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">def calculate_tax(</td><td class=\"p-3 text-muted-foreground\">Parameters, logic, docstring</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Pattern repeat</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">First item in a list pattern</td><td class=\"p-3 text-muted-foreground\">All remaining items automatically</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Test generation</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\"># write unit tests for this function</td><td class=\"p-3 text-muted-foreground\">Full pytest test file</td></tr></tbody></table>",
                        "![GitHub Copilot Productivity](/aitools_exp11.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Read the Theory section.",
        "Open the Solve tab and navigate to the GitHub Copilot workspace containing a starter Python file with function stubs.",
        "Complete Task Set A manually (without AI) and record your completion time.",
        "Enable Copilot suggestions and complete Task Set B (equivalent tasks) using Copilot. Record your time.",
        "For each Copilot suggestion, read it completely, verify logic and edge cases, and note if you accepted as-is, modified, or rejected it.",
        "Use comment-driven development for at least one function.",
        "Use Copilot Chat to generate unit tests for your functions, review them, and write at least two missing edge cases manually.",
        "Compare your Task Set A and B times, calculate net productivity gain accounting for correction time.",
        "Document the comparison, suggestion acceptance rate, and caught issues for the Feedback Report."
      ],
      posttest: [],
      references: [
        "Anthropic Claude Code Documentation",
        "JNTUGV AI Tools Lab Syllabus, Module 3 — Coding Lab"
      ]
    }
  },
  {
    id: "ai-m3-4",
    title: "Replit Agent Prototyping",
    desc: "Prototype and deploy a full-stack web application using the Replit Agent.",
    expected: "A live deployed web application with database connectivity, functional UI components, and a documented prompt iteration log.",
    content: {
      aim: {
        text: "To use Replit Agent to build, run, and iterate on a full-stack web application prototype entirely in the browser \u2014 from natural language specification through to a live deployed URL \u2014 without any local environment setup, demonstrating AI-powered zero-configuration rapid prototyping.",
        bullets: [
          "Understand the concept of autonomous coding agents and end-to-end AI software generation",
          "Formulate comprehensive project briefs that explicitly define frontend, backend, and database requirements",
          "Observe and guide an AI agent as it iterates on a full-stack codebase",
          "Deploy a functional web application to the cloud directly from a chat interface",
          "Evaluate the architectural decisions made by an autonomous agent"
        ]
      },
      theory: [
            {
                  "title": "Why Replit Agent Is Different",
                  "body": [
                        "Most coding tools just write code \u2014 you still need to install software, set up a server, and figure out deployment yourself. Replit Agent handles everything: it writes the code, runs it, fixes errors, and gives you a live URL \u2014 all in one place.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Step</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Traditional Dev</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Replit Agent</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Environment setup</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Install Node, Python, DB \u2014 hours</td><td class=\"p-3 text-muted-foreground\">Zero setup \u2014 runs in browser</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Write code</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">You write everything manually</td><td class=\"p-3 text-muted-foreground\">Agent writes from your description</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Fix errors</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">You debug line by line</td><td class=\"p-3 text-muted-foreground\">Agent detects and fixes automatically</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Deploy to web</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Configure servers, DNS, hosting</td><td class=\"p-3 text-muted-foreground\">One click \u2014 instant live URL</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "Replit Agent Workflow",
                  "body": [
                        "Describe your app in English  \u2192  Agent writes all the code  \u2192  Runs it automatically  \u2192  Fixes any errors itself  \u2192  Live URL in minutes",
                        "![Replit Agent Prototyping](/aitools_exp12.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Review the theory behind autonomous coding agents and full-stack AI scaffolding.",
        "Draft a comprehensive 'App Brief' for a simple web application (e.g., 'A personal habit tracker where users can add daily habits, check them off, and see a progress bar for the week. Store data in a database.').",
        "Open the Solve tab and navigate to the Replit Agent workspace.",
        "Paste your App Brief into the chat interface and instruct the agent to begin building.",
        "Observe the agent's execution process: note how it creates files, installs packages, and tests the server.",
        "Once the initial prototype is running, test the application's functionality.",
        "Issue at least two iterative refinement prompts to add features or fix bugs (e.g., 'Add a dark mode toggle' or 'The habit counter isn't updating correctly; please fix the state management').",
        "Instruct the agent to deploy the application so it is accessible via a public URL.",
        "Document your App Brief, the iterative prompts you used, and the final deployed URL for your Feedback Report."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 3 — Coding Lab"
      ]
    }
  }
];

// Trigger HMR