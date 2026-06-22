import { Experiment } from "./course-data";

export const aiM5Experiments: Experiment[] = [
  {
    id: "ai-m5-1",
    title: "NotebookLM Document Chat",
    desc: "Extract knowledge and synthesize audio using NotebookLM on technical documents.",
    expected: "An organized knowledge notebook with a clean document reference panel, cited answers mapping structural systems, and a fully processed conversational audio synthesis file.",
    content: {
      aim: {
        text: "To use Google NotebookLM to ingest multiple source documents and conduct an interactive question-answering session that extracts, cross-references, and synthesises information across sources \u2014 evaluating the accuracy of grounded citations and the tool's ability to surface non-obvious connections between documents.",
        bullets: [
          "Understand the concept of a source-grounded language model workspace and how it eliminates hallucination",
          "Upload, organize, and query multiple heterogeneous documents (PDFs, Markdown text, website URLs)",
          "Critically evaluate AI-generated inline citations against primary source documents to verify accuracy",
          "Generate a multi-speaker synthetic audio overview (deep dive) and analyze its effectiveness in summarizing technical content"
        ]
      },
      theory: [
            {
                  "title": "NotebookLM \u2014 Your Personal Research Assistant",
                  "body": [
                        "NotebookLM serves as a stateful agent operating exclusively on your private documentation boundaries.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What It Does</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Grounded answers</td><td class=\"p-3 text-muted-foreground\">Every answer cites the exact document and passage it came from</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Cross-referencing</td><td class=\"p-3 text-muted-foreground\">Finds connections between multiple documents automatically</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">No hallucination</td><td class=\"p-3 text-muted-foreground\">Will not answer from outside your uploaded sources</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Audio overview</td><td class=\"p-3 text-muted-foreground\">Generates a podcast-style summary of your documents</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "The NotebookLM Question-Answering Flow",
                  "body": [
                        "Upload PDFs & notes  \u2192  NotebookLM indexes them  \u2192  Ask a question in chat  \u2192  Grounded answer with citation  \u2192  Follow-up and explore",
                        "![NotebookLM Document Chat](/aitools_exp17.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Review the theory behind source grounding and retrieval-focused context structures.",
        "Gather technical documents (e.g., system architecture specs, project proposals).",
        "Open the Solve tab and access the NotebookLM workspace interface.",
        "Click Create Notebook and upload your files (paste text blocks, link URLs, or upload PDFs).",
        "Review the automatically generated Notebook Guide.",
        "Issue an exploratory research prompt (e.g., 'Based strictly on the uploaded system documentation, outline the exact data flow...').",
        "Inspect the answer and click on the inline citation chips to verify that the pop-up pane matches your primary sources.",
        "Navigate to the Studio/Audio Generation options panel and click Generate Audio Overview (Deep Dive Podcast).",
        "Listen to the generated conversation and note how dense structural ideas are translated into conversational analogies.",
        "Document your workspace setup, verification steps, and audio accuracy evaluation for your report."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 5 — Research & Productivity Lab"
      ]
    }
  },
  {
    id: "ai-m5-2",
    title: "Gamma Presentation Deck",
    desc: "Transform a text outline into a professional presentation using Gamma App.",
    expected: "A dynamic, multi-card responsive presentation deck featuring grid columns, high-impact data callout modules, and cohesive branding accents.",
    content: {
      aim: {
        text: "To use Gamma to transform a structured content outline into a visually polished presentation deck in under five minutes \u2014 evaluating the AI's slide structuring logic, visual theme selection, and content distribution \u2014 and iterating on specific slides through natural language editing instructions.",
        bullets: [
          "Understand the transition from a markdown outline to a responsive, container-based slide layout",
          "Generate a complete multi-card presentation deck from a project brief",
          "Use AI design commands to reformat layouts, swap visual assets, and adjust column groupings",
          "Evaluate a presentation deck for clear visual communication, text-to-image ratios, and scannability"
        ]
      },
      theory: [
            {
                  "title": "What Gamma Does Differently",
                  "body": [
                        "Gamma replaces template-based design with generative canvas workflows.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Traditional (PowerPoint)</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">AI-Powered (Gamma)</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Starting point</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Blank slide</td><td class=\"p-3 text-muted-foreground\">AI-generated full deck from outline</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Design time</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Hours choosing fonts and layouts</td><td class=\"p-3 text-muted-foreground\">Seconds \u2014 AI picks everything</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Content</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">You write every word</td><td class=\"p-3 text-muted-foreground\">AI drafts, you refine</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Editing</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Manual drag and drop</td><td class=\"p-3 text-muted-foreground\">Natural language: 'make slide 3 shorter'</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "The Presentation Design Flow",
                  "body": [
                        "Enter topic or paste outline  \u2192  Gamma generates all slides  \u2192  AI picks theme & layout  \u2192  'Make slide 2 more visual'  \u2192  Export or share link",
                        "![Gamma Presentation Deck](/aitools_exp18.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Review presentation layout theories focusing on visual scannability and card component distribution.",
        "Select a presentation topic (e.g., 'Real-Time Sales Analytics System Performance Review').",
        "Open the Solve interface panel and access the Gamma generation workspace.",
        "Select the Text-to-Deck generation option and paste your presentation outline brief.",
        "Let the AI engine build the initial slide cards and review the layout structures.",
        "Use the inline AI Design Chat Partner sidebar to run real-time structural adjustments (e.g., 'Change the bulleted text list into an asymmetric 2-column layout').",
        "Extract a main data statistic and turn it into a massive, centralized callout card.",
        "Manually replace any generic icon blocks with context-specific items.",
        "Preview the final fluid deck in fullscreen presentation mode and record your prompts and results."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 5 — Research & Productivity Lab"
      ]
    }
  },
  {
    id: "ai-m5-3",
    title: "Napkin AI Diagrams",
    desc: "Generate contextual visual diagrams automatically from technical text using Napkin AI.",
    expected: "An illustrated document showing clear text paragraphs paired with vector diagrams, containing stylized custom nodes, relational arrows, and clear visual summaries.",
    content: {
      aim: {
        text: "To use Napkin AI to automatically convert written explanations and structured text into clear visual diagrams \u2014 including flowcharts, comparison frameworks, and process maps \u2014 evaluating the semantic accuracy of AI-generated visuals and iterating on diagram type and layout through natural language instructions.",
        bullets: [
          "Understand the semantic mapping engine that connects abstract technical text to concrete visual diagrams",
          "Paste long-form technical explanations and trigger contextual diagram identification tracks",
          "Customize diagram nodes, labels, styles, and flows using interactive canvas editing toolbars",
          "Evaluate how adding specific visual diagrams impacts the readability and scannability of documentation"
        ]
      },
      theory: [
            {
                  "title": "Why Diagrams Matter",
                  "body": [
                        "Visual layouts increase learning and retention rates compared to dense paragraphs.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Diagram Type</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Best For</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Example Text Input</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Flowchart</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Processes and decisions</td><td class=\"p-3 text-muted-foreground\">'User logs in \u2192 check password \u2192 success or retry'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Comparison</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Side-by-side evaluation</td><td class=\"p-3 text-muted-foreground\">'RAG vs Fine-tuning: cost, speed, accuracy'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Timeline</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Sequential events</td><td class=\"p-3 text-muted-foreground\">'Phase 1: Research, Phase 2: Build, Phase 3: Test'</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Mind Map</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Brainstorming relationships</td><td class=\"p-3 text-muted-foreground\">'AI Tools: Writing, Coding, Design, Research'</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "The Diagram Generation Flow",
                  "body": [
                        "Paste or write your explanation  \u2192  Napkin reads the structure  \u2192  Selects best diagram type  \u2192  Generates visual  \u2192  Export as SVG / PNG",
                        "![Napkin AI Diagrams](/aitools_exp19.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Study the relationships between technical prose structures and their corresponding diagram topologies.",
        "Select a text block to analyze (e.g., 'Water Guard Project Implementation Protocol').",
        "Open the Solve workspace link to enter the Napkin AI drafting document canvas.",
        "Paste your technical explanation block directly into the center text pane.",
        "Hover your cursor along the left margin next to your main operational paragraphs and click the Auto-Diagram Trigger.",
        "Examine the generated visual diagram variations and choose a layout.",
        "Click directly inside the generated diagram nodes to run custom canvas style refinements (Labeling, Visual Color Shift, Flow Adjustment).",
        "Click Export to download your final clean diagram asset as an SVG or high-resolution PNG file for your lab document."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 5 — Research & Productivity Lab"
      ]
    }
  },
  {
    id: "ai-m5-4",
    title: "Elicit Literature Review",
    desc: "Automate literature mapping, matrix extraction, and source synthesis using Elicit.",
    expected: "A comprehensive, multi-row research extraction matrix displaying paper titles, automated summaries, custom parameter columns, and verified source citations.",
    content: {
      aim: {
        text: "To use Elicit as an AI research assistant for conducting a structured literature review by submitting targeted research questions, evaluating the relevance ranking of returned papers, extracting key findings across multiple studies using Elicit's column-based extraction system, and synthesising a coherent evidence summary from the results.",
        bullets: [
          "Understand the difference between semantic research engines and simple keyword index systems",
          "Execute a formal scientific query to discover peer-reviewed journal papers and conference materials",
          "Construct an extraction matrix to systematically track methodologies, datasets, and limitations across papers",
          "Analyze AI-generated paper summaries while verifying source fidelity against the primary text"
        ]
      },
      theory: [
            {
                  "title": "What Is a Literature Review?",
                  "body": [
                        "Elicit automates database searching and key fact extraction across thousands of studies.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Step</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Traditional Literature Review</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Elicit AI Review</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Search</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Manual Google Scholar, keyword hunting</td><td class=\"p-3 text-muted-foreground\">One research question \u2192 Elicit finds papers</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Screening</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Read abstract of every paper manually</td><td class=\"p-3 text-muted-foreground\">AI ranks by relevance automatically</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Extraction</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Copy key facts from each paper manually</td><td class=\"p-3 text-muted-foreground\">AI fills columns: methods, results, sample size</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Synthesis</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Write summary from notes</td><td class=\"p-3 text-muted-foreground\">AI drafts synthesis across all papers</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "The Literature Review Flow",
                  "body": [
                        "Enter research question  \u2192  Elicit finds relevant papers  \u2192  AI ranks by relevance  \u2192  Extract findings across papers  \u2192  Synthesise evidence summary",
                        "![Elicit Literature Review](/aitools_exp20.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Study the mechanics of semantic mapping and the structured taxonomy of a scientific research paper.",
        "Formulate an academic query relevant to your advanced curriculum (e.g., 'Quantum Random Number Generation algorithms applied to Blockchain security frameworks').",
        "Open the Solve interface panel and launch the Elicit research assistant environment.",
        "Input your research question into the central discovery bar and click Search.",
        "Review the initial Summary of Top Papers panel.",
        "Use the Add Columns button to configure custom parameter extractions: Methodology Used, Dataset parameters, Stated Limitations.",
        "Examine the extraction matrix table. Hover over summary cells to see direct source text excerpts.",
        "Filter your search results (e.g., restrict publication years to 2022–2026).",
        "Export your synthesized extraction table matrix as a CSV spreadsheet file and save the top three paper abstracts."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 5 — Research & Productivity Lab"
      ]
    }
  }
];

// Trigger HMR