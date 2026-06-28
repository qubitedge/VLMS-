import { Experiment } from "./course-data";

export const aiM4Experiments: Experiment[] = [
  {
    id: "ai-m4-1",
    title: "Lovable Landing Page",
    desc: "Design and deploy a landing page using Lovable with a single prompt.",
    expected: "A live, dynamic, responsive React-based landing page with consistent dark-mode styling, working animations, hover states, and clear component segmentation.",
    content: {
      aim: {
        text: "To use Lovable to generate a complete, styled landing page from a single product brief prompt \u2014 iterating on layout, copy, colour scheme, and section structure through natural language instructions \u2014 and publish it to a live URL without writing any code.",
        bullets: [
          "Understand how AI design agents interpret product copy to generate contextual UI sections",
          "Learn to use conversational micro-prompts to change layouts, typography, color themes, and assets",
          "Evaluate the generated interface for user experience (UI/UX) practices like visual hierarchy, CTA placement, and responsiveness",
          "Deploy a live landing page directly from an AI prompting environment"
        ]
      },
      theory: [
            {
                  "title": "Anatomy of a Landing Page",
                  "body": [
                        "Landing pages are optimized to hook and convert visitors rapidly.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Section</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Purpose</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What to Tell Lovable</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Hero</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">First impression \u2014 hook the visitor</td><td class=\"p-3 text-muted-foreground\">'Bold headline + subheading + CTA button'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Features</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Show what it does</td><td class=\"p-3 text-muted-foreground\">'3 feature cards with icons'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Social Proof</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Build trust</td><td class=\"p-3 text-muted-foreground\">'Testimonials section with 3 quotes'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Pricing</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Convert visitors</td><td class=\"p-3 text-muted-foreground\">'3-tier pricing table'</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Footer</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Links and legal</td><td class=\"p-3 text-muted-foreground\">'Links, social icons, copyright'</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "The Lovable Design Flow",
                  "body": [
                        "Write product brief in chat  \u2192  Lovable generates full page  \u2192  Ask: 'change colour to blue'  \u2192  Ask: 'add testimonials'  \u2192  Publish to live URL",
                        "![Lovable Landing Page](/aitools_exp13.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Review the theory behind high-converting landing page layouts and component anatomy.",
        "Choose a project concept. Recommended option: 'Climate Chain — A decentralized platform for trading carbon credits using verifiable quantum random identifiers.'",
        "Open the Solve tab and access the Lovable workspace link.",
        "Input your initial structural prompt: 'Create a highly modern, sleek landing page for a Web3 tech startup called Climate Chain. Use a dark-mode tech aesthetic with emerald green neon accents. Include a clean navigation bar, high-impact hero section, 3-card feature showcase, testimonial section, and footer.'",
        "Examine the generated preview. Identify three design elements that need adjustment.",
        "Execute a series of single-intent refinement turns.",
        "Turn 2 (Theme): 'Make the hero background look like a moving dark-gradient mesh network. Use glassmorphism blurs behind the text containers.'",
        "Turn 3 (Component): 'Change the 3-card feature grid. Add a smooth hover scaling effect to the cards and replace the generic icons with neon green abstract geometric shapes using Lucide icons.'",
        "Turn 4 (UX optimization): 'Make the main CTA button in the hero section pulse gently with an accent shadow to increase clickability.'",
        "Test the layout responsiveness using the viewport switching tools (Desktop, Tablet, Mobile) provided in the interface.",
        "Click Deploy to generate a public URL for your landing page, and document your prompts, iterations, and final live link in your report."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 4 — Web Design Lab"
      ]
    }
  },
  {
    id: "ai-m4-2",
    title: "Bolt.new Web App",
    desc: "Build a multi-section web app using Bolt.new and evaluate component quality.",
    expected: "A working, multi-component application with interactive tabular data rows, live calculating stat bars, and functional modal dialog views.",
    content: {
      aim: {
        text: "To use Bolt.new to build a complete full-stack web application from a natural language specification \u2014 including frontend UI, backend logic, and data persistence \u2014 deployed live in the browser, demonstrating AI-driven full-stack development without any local environment configuration.",
        bullets: [
          "Understand the concept of full-stack AI development environments running in browser sandboxes",
          "Initialize a web app project requiring dynamic client-side state management",
          "Debug runtime execution issues and UI compilation errors through continuous automated error logs and prompt intervention",
          "Connect user interaction forms to visual dashboard elements that re-render instantly"
        ]
      },
      theory: [
            {
                  "title": "Full-Stack vs Landing Page",
                  "body": [
                        "Static pages vs. dynamic, database-backed applications.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Landing Page (Lovable)</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Full-Stack App (Bolt.new)</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Stores data?</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">No</td><td class=\"p-3 text-muted-foreground\">Yes \u2014 database included</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">User accounts?</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">No</td><td class=\"p-3 text-muted-foreground\">Yes \u2014 auth supported</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Dynamic?</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Static content only</td><td class=\"p-3 text-muted-foreground\">Changes based on user actions</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Examples</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Marketing site, portfolio</td><td class=\"p-3 text-muted-foreground\">Todo app, booking system, dashboard</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "The Bolt.new App Building Flow",
                  "body": [
                        "Describe the app & features  \u2192  Bolt builds frontend  \u2192  Bolt adds backend & DB  \u2192  Test in browser  \u2192  Deploy & share link",
                        "![Bolt.new Web App](/aitools_exp14.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Study the concept of reactive state handling and full-stack runtime compilation inside browser sandboxes.",
        "Select a technical app concept to build: 'VoiceLeave Management System Dashboard' (A dashboard managing university leave permissions, featuring analytics tracking, student data cards, status toggles, and mock filter controls).",
        "Access the Bolt.new environment via the Solve tab.",
        "Input the application core generation brief: 'Build a comprehensive VoiceLeave Management Dashboard for a university environment. Use React, Tailwind CSS, and Lucide icons. Include top stats ribbon, interactive data list, approve/reject action buttons, and a modal pop-up form to add a new request.'",
        "Let the environment execute package installations (e.g., initializing Vite, Tailwind, installing icon sets). Watch the terminal output pane.",
        "Open the active preview tab. Interact with the application: add a row, filter items, and click status buttons to confirm the data updates properly.",
        "If the preview window throws an error block or fails to render a feature, copy the snippet or type: 'The Add Leave modal form button crashes when clicked. Check the state handler mapping and rewrite the form state initialization to fix it.'",
        "Once fully functional, save your project and note the structural flow of files generated in the file tree view."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 4 — Web Design Lab"
      ]
    }
  },
  {
    id: "ai-m4-3",
    title: "v0 Component Library",
    desc: "Generate a responsive UI component library using v0 and integrate it into a project.",
    expected: "An accessible, flexible React sidebar component code framework featuring layout transitions, active link highlights, accordion tabs, and standardized CSS utility formatting.",
    content: {
      aim: {
        text: "To use Vercel's v0 to generate production-ready React UI components from natural language descriptions \u2014 including forms, navigation bars, cards, and modals \u2014 and evaluate the generated Tailwind CSS and shadcn/ui code for direct integration into existing React projects.",
        bullets: [
          "Learn the principles of atomic web design using modern component-driven developer platforms",
          "Generate highly stylized, standalone UI components using clear, explicit design constraints",
          "Utilize precise code-based version history tracks to step forward and backward through component design revisions",
          "Interpret and extract production-ready React / Tailwind code for deployment in clean external file structures"
        ]
      },
      theory: [
            {
                  "title": "What Is a UI Component?",
                  "body": [
                        "A UI component is a reusable building block of a website \u2014 like a button, a login form, or a navigation bar. v0 generates these as clean React code.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Component Type</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What You Describe</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What v0 Generates</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Form</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">'Sign-up form with name, email, password, submit button'</td><td class=\"p-3 text-muted-foreground\">Full React form with validation</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Nav bar</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">'Dark navbar with logo left, links centre, CTA right'</td><td class=\"p-3 text-muted-foreground\">Responsive navbar component</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Card</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">'Product card with image, title, price, add-to-cart button'</td><td class=\"p-3 text-muted-foreground\">Styled card component</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Modal</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">'Confirmation dialog with cancel and confirm buttons'</td><td class=\"p-3 text-muted-foreground\">Accessible modal with overlay</td></tr></tbody></table>",
                        "![v0 Component Library](/aitools_exp15.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Study the theory behind modular UI architecture and component-driven assembly lines.",
        "Select an advanced UI component to construct: 'Interactive Sidebar Navigation Panel with Framer-Motion Style Accordions'.",
        "Open the v0 environment through the Solve interface link.",
        "Issue a precise structural component brief: 'Generate a responsive, highly modern sticky navigation sidebar component using React, Tailwind CSS, and Lucide icons. The component must feature: a top logo container, a middle section with 5 navigation link items with hover state backgrounds, an expandable accordion drop-menu block under Projects, and a bottom user profile card snippet with an avatar badge. Ensure full keyboard focus accessibility indicators.'",
        "Review the resulting visual interface on version v1. Toggle the code interface view to inspect the generation output.",
        "Refine specific micro-interactions and layout choices. Turn 2 (Animation styling): 'Add a collapsible trigger toggle button at the top corner. When collapsed, the sidebar should shrink to show icons only, using clean transition classes.'",
        "Turn 3 (Theme polish): 'Change the border framing line to a transparent glass accent style and use an organic emerald-green color dot indicator next to the active page navigation item link.'",
        "Use the v0 historical slider to toggle back to v1, review the structural difference, and then return to your latest production version node.",
        "Copy the clean code output for usage in your modular UI document records."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 4 — Web Design Lab"
      ]
    }
  },
  {
    id: "ai-m4-4",
    title: "Figma AI Layouts",
    desc: "Use Figma AI to auto-generate UI layouts and annotate design decisions.",
    expected: "A cleanly organized, fully layered, vector-based mobile analytics screen layout inside your canvas workspace utilizing standard auto-layout parameters and generating accessible CSS translation files.",
    content: {
      aim: {
        text: "To use Figma's AI-powered design features to auto-generate layout variations, apply design system constraints, and produce responsive grid structures from content briefs \u2014 evaluating AI-generated designs against established UX heuristics for usability, visual hierarchy, and accessibility.",
        bullets: [
          "Understand the role of AI layout tools within professional design and prototyping software",
          "Use natural language canvas commands to output structured vector interface mockups directly onto design frames",
          "Apply Figma Auto Layout engineering concepts to make components flexible and scalable",
          "Utilize Developer Mode tools to convert vector component blocks into structured frontend code layouts"
        ]
      },
      theory: [
            {
                  "title": "What Figma AI Can Do",
                  "body": [
                        "Figma leverages AI tools to expedite design system compliance and mockup creation.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Figma AI Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What It Does</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Auto Layout AI</td><td class=\"p-3 text-muted-foreground\">Generates responsive frames that adapt to content size</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Design Suggestions</td><td class=\"p-3 text-muted-foreground\">Proposes layout variations based on your content</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Component Matching</td><td class=\"p-3 text-muted-foreground\">Finds the right component from your design system automatically</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Copy Generation</td><td class=\"p-3 text-muted-foreground\">Fills placeholder text with contextually relevant content</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "Evaluating AI Designs \u2014 UX Heuristics",
                  "body": [
                        "A critical interface design requires checking formatting against accessibility and user guidelines.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Heuristic</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What to Check</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Visual Hierarchy</td><td class=\"p-3 text-muted-foreground\">Is the most important element largest / most prominent?</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Whitespace</td><td class=\"p-3 text-muted-foreground\">Is there breathing room or is it too cluttered?</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Consistency</td><td class=\"p-3 text-muted-foreground\">Do fonts, colours and spacing match the design system?</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Accessibility</td><td class=\"p-3 text-muted-foreground\">Is contrast ratio above 4.5:1? Are tap targets large enough?</td></tr></tbody></table>",
                        "![Figma AI Layouts](/aitools_exp16.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Study the principles of design systems, spatial layout rules, and Figma Auto Layout constraints.",
        "Select an interface context to design: 'Real-Time Sales Analytics System Mobile App Interface Dashboard'.",
        "Open the Figma design workspace and launch the AI Layout Prompting Palette.",
        "Input your layout generation request: 'Generate a sleek, modern mobile application user interface layout for a Real-Time Sales Analytics System. Include a top greeting header bar, a large focal card showing total revenue with an analytics trend arrow, a 4-item horizontal sliding category scroll bar, and a vertical list item feed displaying recent transactions.'",
        "Let the canvas engine generate the vector elements. Inspect the layer panel to verify that items are sorted into clean grouped layers.",
        "Select the generated transaction list group and explore the Auto Layout properties panel on the right sidebar context area.",
        "Perform manual and prompted layout adjustments. Adjustment 1 (Spacing): Set the horizontal and vertical card edge padding spaces to exactly 16px, and change the item gap spacing distance variable to 12px.",
        "Adjustment 2 (Constraint Modification): Alter the revenue total card width setting from a Fixed specification to a Fill Container rule to test how it stretches when your main frame boundaries change.",
        "Toggle your workspace viewpoint over into Dev Mode using the workspace switch control.",
        "Click directly on your customized revenue card element, inspect the generated CSS / Tailwind utility string panel output on the right, and copy the grid properties layout for your records."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 4 — Web Design Lab"
      ]
    }
  }
];

// Trigger HMR