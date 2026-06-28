import { Experiment } from "./course-data";

export const aiM2Experiments: Experiment[] = [
  {
    id: "ai-m2-1",
    title: "ChatGPT Persuasive Essay",
    desc: "Draft, edit, and refine a persuasive essay using ChatGPT with multi-turn prompting.",
    expected: "A well-structured 600–800 word persuasive essay with a clear thesis, evidence-supported body paragraphs, counterargument acknowledgment, and a strong conclusion.",
    content: {
      aim: {
        text: "To use ChatGPT to draft, refine, and strengthen a persuasive essay by designing targeted prompts that specify audience, argument stance, tone, and structural requirements \u2014 demonstrating how iterative prompt refinement improves argument quality and rhetorical impact.",
        bullets: [
          "Understand how ChatGPT processes multi-turn conversational context to build and refine long-form writing",
          "Apply role prompting and persona assignment to control tone, audience targeting, and rhetorical style",
          "Use iterative refinement instructions to improve argument structure, evidence integration, and conclusion strength",
          "Identify and correct common weaknesses in AI-generated persuasive writing including vague claims, repetition, and lack of specific evidence",
          "Compare a one-shot generated essay against a multi-turn refined version and evaluate the quality difference",
          "Understand the ethical responsibilities around AI-assisted academic writing including disclosure and originality",
          "Apply ChatGPT to practical CSE writing tasks including technical blog posts, project proposals, and research abstracts"
        ]
      },
      theory: [
            {
                  "title": "What Makes Writing Persuasive?",
                  "body": [
                        "Rhetorical elements shape how written communication is structured to influence the reader.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Rhetorical Element</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What It Means</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Prompt Instruction</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Ethos</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Build credibility</td><td class=\"p-3 text-muted-foreground\">'Use expert evidence and statistics'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Pathos</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Appeal to emotion</td><td class=\"p-3 text-muted-foreground\">'Include a relatable human story'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Logos</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Use logic and reason</td><td class=\"p-3 text-muted-foreground\">'Structure argument with clear evidence'</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Kairos</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Right time / urgency</td><td class=\"p-3 text-muted-foreground\">'Highlight why this matters right now'</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "The Iterative Writing Flow",
                  "body": [
                        "Give topic + stance  \u2192  First draft generated  \u2192  Ask: 'strengthen the argument'  \u2192  Ask: 'add statistics'  \u2192  Final polished essay",
                        "![ChatGPT Persuasive Essay](/aitools_exp5.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Read the Theory section and understand the transformer architecture, RLHF training, and the multi-turn refinement workflow.",
        "Choose a CSE-relevant persuasive essay topic (e.g. 'AI should be mandatory in undergraduate engineering education').",
        "Open the Solve tab and navigate to the ChatGPT workspace.",
        "Begin with a role and context turn — do not generate the essay yet. Example: 'You are a senior technology policy researcher writing for an audience of undergraduate engineering students and faculty.'",
        "In the second turn issue the generation instruction with full structural requirements: length, thesis, body paragraphs, counterargument, conclusion.",
        "Read the output critically. Identify the three weakest elements (e.g. vague claims, missing examples).",
        "Issue three targeted refinement instructions in separate turns, one for each weakness.",
        "After refinements, ask ChatGPT to produce a final clean version incorporating all changes.",
        "Compare the first-draft output against the final refined output.",
        "Document the full conversation for the Feedback Report."
      ],
      posttest: [],
      references: [
        "OpenAI GPT-4 Technical Report, OpenAI, 2023",
        "Vaswani A. et al., Attention Is All You Need, NeurIPS 2017",
        "Ouyang L. et al., Training Language Models to Follow Instructions with Human Feedback (InstructGPT / RLHF paper), NeurIPS 2022",
        "JNTUGV AI Tools Lab Syllabus, Module 2 — Writing Lab"
      ]
    }
  },
  {
    id: "ai-m2-2",
    title: "Claude Paper Summary",
    desc: "Use Claude to summarize a complex research paper and critically assess accuracy.",
    expected: "A structured multi-section summary with clearly labeled components, calibrated language indicating uncertainty where appropriate, and a glossary and research questions section.",
    content: {
      aim: {
        text: "To use Claude to produce accurate, structured summaries of academic papers by constructing prompts that specify summary depth, target audience, and output format \u2014 evaluating Claude's ability to extract key findings, methodology, and implications without distortion or hallucination.",
        bullets: [
          "Understand Claude's constitutional AI training approach and how it shapes output quality and honesty",
          "Use Claude's long context window to process full or partial research papers and produce structured summaries",
          "Apply structured prompting to request summaries at specific levels — abstract-level, section-by-section, and critical analysis",
          "Critically compare Claude's summary against the original paper and identify omissions, distortions, and hallucinations",
          "Use Claude for follow-up analytical tasks including identifying research gaps, generating review questions, and explaining technical terminology",
          "Evaluate Claude's suitability for literature review assistance in CSE research contexts",
          "Understand the risks of over-reliance on AI summaries in academic research workflows"
        ]
      },
      theory: [
            {
                  "title": "Why Claude for Academic Summarisation?",
                  "body": [
                        "Claude is trained to be precise and faithful to source material. It is less likely to add information that wasn't in the paper, making it safer for academic use than more creative models.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Summary Type</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Prompt Instruction</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Output</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Executive</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">'Summarise in 3 bullet points for a manager'</td><td class=\"p-3 text-muted-foreground\">Quick top-level overview</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Technical</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">'Summarise the methodology and results for a researcher'</td><td class=\"p-3 text-muted-foreground\">Deep, precise, jargon-intact</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Plain English</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">'Explain this paper to a 16-year-old student'</td><td class=\"p-3 text-muted-foreground\">Simple, analogies, no jargon</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "The Summarisation Flow",
                  "body": [
                        "Paste the paper / abstract  \u2192  Specify audience & depth  \u2192  Claude extracts key findings  \u2192  Ask follow-up questions  \u2192  Structured summary done",
                        "![Claude Paper Summary](/aitools_exp6.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Read the Theory section and understand Constitutional AI, Claude's context window, and critical summary assessment.",
        "Select a research paper relevant to your CSE curriculum (at least 8 pages).",
        "Open the Solve tab and navigate to the Claude workspace.",
        "Upload the paper PDF or paste the text.",
        "Issue the structured summarization prompt requesting the abstract, section breakdown, contributions, glossary, and follow-up questions.",
        "Read the output carefully alongside the original paper.",
        "Conduct a critical assessment across the four dimensions — accuracy, completeness, fidelity, and hallucination risk.",
        "Issue a follow-up prompt targeting the weakest element of the summary.",
        "Ask Claude to explain the most technically complex term from the paper.",
        "Ask Claude to suggest a feasible final-year undergraduate project extending the paper's findings.",
        "Document the full session and your evaluation for the Feedback Report."
      ],
      posttest: [],
      references: [
        "Anthropic Claude Model Card and Constitutional AI Documentation",
        "Bai Y. et al., Constitutional AI: Harmlessness from AI Feedback, Anthropic, 2022",
        "JNTUGV AI Tools Lab Syllabus, Module 2 — Writing Lab"
      ]
    }
  },
  {
    id: "ai-m2-3",
    title: "Gemini Blog Post",
    desc: "Generate a structured blog post using Gemini and evaluate tone and coherence.",
    expected: "A well-structured 700–800 word blog post with consistent conversational tone, descriptive subheadings, accessible analogies for technical concepts, and a practical conclusion.",
    content: {
      aim: {
        text: "To use Google Gemini to generate a well-structured, SEO-aware blog post by providing prompts that define topic, target keyword, reader persona, tone, and desired word count \u2014 and to iteratively refine headings, introductions, and calls-to-action for maximum engagement.",
        bullets: [
          "Understand Gemini's architecture as a natively multimodal model and how this influences its text generation capabilities",
          "Use Gemini to generate a full blog post from a structured brief specifying topic, audience, tone, and length",
          "Evaluate the output on tone consistency, structural coherence, factual grounding, and engagement quality",
          "Use Gemini's Google Search grounding feature to produce factually current and reference-supported content",
          "Compare outputs across different tone instructions — technical, conversational, and journalistic",
          "Apply Gemini to practical CSE content creation tasks including technical tutorials and project documentation blogs",
          "Reflect on the role of AI in democratizing technical writing for students"
        ]
      },
      theory: [
            {
                  "title": "Anatomy of a Great Blog Post",
                  "body": [
                        "An engaging blog post requires specific sections optimized for readers and search engines.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Section</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Purpose</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Prompt Instruction</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Hook / Intro</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Grab attention immediately</td><td class=\"p-3 text-muted-foreground\">'Start with a surprising statistic or question'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">H2 Headings</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Structure for scanning readers</td><td class=\"p-3 text-muted-foreground\">'Use 4 H2 subheadings with keyword'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Body Paragraphs</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Deliver the value</td><td class=\"p-3 text-muted-foreground\">'Each section: explain, example, takeaway'</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Call to Action</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Tell reader what to do next</td><td class=\"p-3 text-muted-foreground\">'End with a clear CTA for the reader'</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "SEO-Aware Blog Writing Flow",
                  "body": [
                        "Define topic + keyword  \u2192  Set reader persona & tone  \u2192  Generate full draft  \u2192  Refine intro & headings  \u2192  SEO-ready blog post",
                        "![Gemini Blog Post](/aitools_exp7.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Read the Theory section and understand Gemini's multimodal architecture, Search grounding, and writing registers.",
        "Choose a CSE-relevant blog post topic (e.g., 'Why Every Developer Should Learn Docker').",
        "Open the Solve tab and navigate to the Gemini workspace.",
        "Craft a full blog post brief prompt specifying topic, target audience, tone and register, required sections, and length.",
        "Read the output and evaluate tone consistency throughout.",
        "Issue a targeted tone correction prompt for any section that drifts in register.",
        "Regenerate the same topic brief with a different tone instruction (e.g., technical register). Compare the two outputs side by side.",
        "If Search grounding is available, add a prompt instruction to include a current real-world example from 2024 or 2025.",
        "Document both tone variants, the refinement turn, and your evaluation for the Feedback Report."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 2 — Writing Lab"
      ]
    }
  },
  {
    id: "ai-m2-4",
    title: "Perplexity Research Query",
    desc: "Conduct a multi-source research query using Perplexity and assess citation quality.",
    expected: "A detailed research synthesis report including primary findings, citation quality assessment, and identification of any hallucinated or misattributed sources.",
    content: {
      aim: {
        text: "To use Perplexity AI as an AI-powered research engine by formulating precise research queries that leverage its live web search capability, evaluating source citation quality, assessing answer accuracy across factual and contested topics, and comparing its research output to traditional search engine results.",
        bullets: [
          "Understand how conversational search engines aggregate and synthesize real-time web data",
          "Formulate complex research queries that require synthesizing information from multiple domains",
          "Critically evaluate the quality and credibility of the sources selected by the AI",
          "Verify the fidelity of AI-generated claims by cross-referencing inline citations",
          "Understand the limitations of real-time web retrieval in AI systems"
        ]
      },
      theory: [
            {
                  "title": "Perplexity vs Google \u2014 What's Different?",
                  "body": [
                        "Comparing a search indexing model with a real-time conversational retrieval engine.",
                        "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Google Search</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Perplexity AI</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">What you get</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">List of links to click</td><td class=\"p-3 text-muted-foreground\">Synthesised answer with citations</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Time to insight</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">You read multiple articles</td><td class=\"p-3 text-muted-foreground\">Instant summary from multiple sources</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Citations</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Implicit (you check yourself)</td><td class=\"p-3 text-muted-foreground\">Explicit inline source links</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Best for</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Finding specific pages</td><td class=\"p-3 text-muted-foreground\">Research questions needing synthesis</td></tr></tbody></table>"
                  ]
            },
            {
                  "title": "Writing a Good Research Query",
                  "body": [
                        "Specific question  \u2192  Perplexity searches live web  \u2192  Synthesises multiple sources  \u2192  Answer with citations  \u2192  Follow-up questions",
                        "![Perplexity Research Query](/aitools_exp8.webp)"
                  ]
            }
      ],
      pretest: [],
      procedure: [
        "Review the theory behind conversational search and RAG architecture.",
        "Choose a complex, multi-faceted research question (e.g., 'What are the environmental impacts of training Large Language Models compared to traditional data center operations?').",
        "Open the Solve tab and navigate to the Perplexity AI workspace.",
        "Input your research query and observe the AI's synthesis process.",
        "Read the generated response critically. Select three distinct claims made in the text that have inline citations attached.",
        "Click on the citations to visit the original source websites.",
        "For each claim, evaluate Citation Fidelity: Does the source actually state what the AI claims it states? Evaluate Source Quality: Is the source credible, authoritative, and current?",
        "Issue a follow-up refinement prompt (e.g., 'Provide more detailed statistics on water usage specifically, and only cite peer-reviewed academic papers').",
        "Document your initial query, your verification findings for the three claims, and the results of your refinement prompt for your Feedback Report."
      ],
      posttest: [],
      references: [
        "JNTUGV AI Tools Lab Syllabus, Module 2 — Writing Lab"
      ]
    }
  }
];

// Trigger HMR