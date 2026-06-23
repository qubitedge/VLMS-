import json
import os

# Helper to find matching brackets/brackets for JSON objects/arrays
def find_matching_bracket(text, start_idx, open_char='[', close_char=']'):
    open_idx = text.find(open_char, start_idx)
    if open_idx == -1:
        return -1, -1
    
    count = 1
    i = open_idx + 1
    while i < len(text) and count > 0:
        if text[i] == open_char:
            count += 1
        elif text[i] == close_char:
            count -= 1
        i += 1
    return open_idx, i

updates = {
    # Module 1: Image Generation Lab
    "ai-m1-1": {
        "file": "src/lib/ai-m1-data.ts",
        "aim": "To use Google's Imagen model via the Gemini platform to generate highly photorealistic images from detailed text prompts, exploring how prompt specificity, lighting descriptors, and subject detail directly influence output quality and realism.",
        "theory": [
            {
                "title": "What Makes Imagen Special?",
                "body": [
                    "Imagen is Google's text-to-image model built for photorealism — outputs that look like actual photographs rather than illustrations. It was trained on billions of image-text pairs, learning to connect words like 'golden hour lighting' or 'shallow depth of field' to real visual qualities.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Prompt Element</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What It Controls</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Example</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Subject</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">What is in the image</td><td class="p-3 text-muted-foreground">\'A golden retriever sitting on grass\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Lighting</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Mood and atmosphere</td><td class="p-3 text-muted-foreground">\'soft morning light\', \'studio lighting\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Camera style</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Depth and framing</td><td class="p-3 text-muted-foreground">\'shallow depth of field\', \'35mm lens\'</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Quality tag</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Forces high detail</td><td class="p-3 text-muted-foreground">\'ultra-realistic\', \'8K\', \'DSLR photo\'</td></tr></tbody></table>'
                ]
            },
            {
                "title": "Prompt Engineering for Images",
                "body": [
                    "Basic prompt 'a dog'  →  Add subject detail  →  Add lighting & style  →  Add quality tags  →  Photorealistic result",
                    "![Gemini Imagen Photorealism](/aitools_exp1.webp)"
                ]
            }
        ]
    },
    "ai-m1-2": {
        "file": "src/lib/ai-m1-data.ts",
        "aim": "To leverage OpenAI's DALL-E model to generate stylised concept art by experimenting with artistic style descriptors, medium references, and compositional framing instructions, understanding how abstract creative direction translates into visual output.",
        "theory": [
            {
                "title": "DALL-E and Artistic Styles",
                "body": [
                    "DALL-E excels at concept art and stylised illustration. You can tell it to paint like a specific era, medium, or artistic movement and it will blend those aesthetics into a single image.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Style Descriptor</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What You Get</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">\'watercolour illustration\'</td><td class="p-3 text-muted-foreground">Soft, blended painterly look</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">\'oil painting, baroque style\'</td><td class="p-3 text-muted-foreground">Rich, dramatic, classical art</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">\'flat vector art\'</td><td class="p-3 text-muted-foreground">Clean minimal graphic design</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">\'cyberpunk concept art\'</td><td class="p-3 text-muted-foreground">Neon, futuristic, gritty urban scenes</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">\'Studio Ghibli style\'</td><td class="p-3 text-muted-foreground">Warm, hand-drawn anime aesthetic</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Concept Art Workflow",
                "body": [
                    "Define the concept / idea  →  Choose an artistic style  →  Add mood & composition  →  Iterate with variations  →  Final concept art",
                    "![DALL-E Concept Art](/aitools_exp2.webp)"
                ]
            }
        ]
    },
    "ai-m1-3": {
        "file": "src/lib/ai-m1-data.ts",
        "aim": "To use Leonardo AI's fine-tuned models to design consistent, detailed characters by crafting structured character description prompts covering appearance, costume, emotion, and pose — and to explore how model selection affects stylistic consistency across multiple character renders.",
        "theory": [
            {
                "title": "Why Leonardo for Characters?",
                "body": [
                    "Leonardo AI offers specialised fine-tuned models — versions trained specifically on character art, game assets, or anime. This means you get much more consistent results for the same character across multiple images compared to general-purpose models.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Character Prompt Layer</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What to Describe</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Appearance</td><td class="p-3 text-muted-foreground">Hair colour, eye colour, skin tone, age, body type</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Costume</td><td class="p-3 text-muted-foreground">Clothing style, colours, materials, accessories</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Emotion</td><td class="p-3 text-muted-foreground">\'Determined expression\', \'joyful smile\', \'fierce gaze\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Pose</td><td class="p-3 text-muted-foreground">\'Standing heroically\', \'crouching\', \'arms crossed\'</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Background</td><td class="p-3 text-muted-foreground">\'Plain white\', \'fantasy forest\', \'studio backdrop\'</td></tr></tbody></table>'
                ]
            },
            {
                "title": "Consistency Across Renders",
                "body": [
                    "Write detailed character sheet  →  Select a consistent model  →  Lock style descriptors  →  Generate multiple poses  →  Same character every time",
                    "![Leonardo AI Character Design](/aitools_exp3.webp)"
                ]
            }
        ]
    },
    "ai-m1-4": {
        "file": "src/lib/ai-m1-data.ts",
        "aim": "To use Midjourney's advanced compositional controls — including aspect ratio flags, stylisation parameters, and negative prompts — to craft intentional artistic compositions that demonstrate mastery of visual balance, colour palette direction, and aesthetic coherence.",
        "theory": [
            {
                "title": "Midjourney's Unique Parameters",
                "body": [
                    "Midjourney uses special command flags alongside your prompt to control the technical and artistic properties of the output.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Parameter</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What It Does</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Example</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">--ar</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Sets aspect ratio</td><td class="p-3 text-muted-foreground">--ar 16:9 (widescreen), --ar 1:1 (square)</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">--stylize</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Controls artistic intensity</td><td class="p-3 text-muted-foreground">--stylize 100 (subtle) to 1000 (very painterly)</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">--no</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Negative prompt — excludes</td><td class="p-3 text-muted-foreground">--no text, --no people, --no blur</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">--v</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Model version</td><td class="p-3 text-muted-foreground">--v 6 (latest, most detailed)</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">--chaos</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Variation randomness</td><td class="p-3 text-muted-foreground">--chaos 0 (consistent) to 100 (wild)</td></tr></tbody></table>'
                ]
            },
            {
                "title": "Building a Composed Prompt",
                "body": [
                    "Subject + scene  →  Mood & colour palette  →  Art style descriptor  →  Add --ar --stylize --no  →  Coherent composition",
                    "![Midjourney Artistic Composition](/aitools_exp4.webp)"
                ]
            }
        ]
    },

    # Module 2: Writing Lab
    "ai-m2-1": {
        "file": "src/lib/ai-m2-data.ts",
        "aim": "To use ChatGPT to draft, refine, and strengthen a persuasive essay by designing targeted prompts that specify audience, argument stance, tone, and structural requirements — demonstrating how iterative prompt refinement improves argument quality and rhetorical impact.",
        "theory": [
            {
                "title": "What Makes Writing Persuasive?",
                "body": [
                    "Rhetorical elements shape how written communication is structured to influence the reader.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Rhetorical Element</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What It Means</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Prompt Instruction</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Ethos</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Build credibility</td><td class="p-3 text-muted-foreground">\'Use expert evidence and statistics\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Pathos</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Appeal to emotion</td><td class="p-3 text-muted-foreground">\'Include a relatable human story\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Logos</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Use logic and reason</td><td class="p-3 text-muted-foreground">\'Structure argument with clear evidence\'</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Kairos</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Right time / urgency</td><td class="p-3 text-muted-foreground">\'Highlight why this matters right now\'</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Iterative Writing Flow",
                "body": [
                    "Give topic + stance  →  First draft generated  →  Ask: 'strengthen the argument'  →  Ask: 'add statistics'  →  Final polished essay",
                    "![ChatGPT Persuasive Essay](/aitools_exp5.webp)"
                ]
            }
        ]
    },
    "ai-m2-2": {
        "file": "src/lib/ai-m2-data.ts",
        "aim": "To use Claude to produce accurate, structured summaries of academic papers by constructing prompts that specify summary depth, target audience, and output format — evaluating Claude's ability to extract key findings, methodology, and implications without distortion or hallucination.",
        "theory": [
            {
                "title": "Why Claude for Academic Summarisation?",
                "body": [
                    "Claude is trained to be precise and faithful to source material. It is less likely to add information that wasn't in the paper, making it safer for academic use than more creative models.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Summary Type</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Prompt Instruction</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Output</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Executive</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">\'Summarise in 3 bullet points for a manager\'</td><td class="p-3 text-muted-foreground">Quick top-level overview</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Technical</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">\'Summarise the methodology and results for a researcher\'</td><td class="p-3 text-muted-foreground">Deep, precise, jargon-intact</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Plain English</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">\'Explain this paper to a 16-year-old student\'</td><td class="p-3 text-muted-foreground">Simple, analogies, no jargon</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Summarisation Flow",
                "body": [
                    "Paste the paper / abstract  →  Specify audience & depth  →  Claude extracts key findings  →  Ask follow-up questions  →  Structured summary done",
                    "![Claude Paper Summary](/aitools_exp6.webp)"
                ]
            }
        ]
    },
    "ai-m2-3": {
        "file": "src/lib/ai-m2-data.ts",
        "aim": "To use Google Gemini to generate a well-structured, SEO-aware blog post by providing prompts that define topic, target keyword, reader persona, tone, and desired word count — and to iteratively refine headings, introductions, and calls-to-action for maximum engagement.",
        "theory": [
            {
                "title": "Anatomy of a Great Blog Post",
                "body": [
                    "An engaging blog post requires specific sections optimized for readers and search engines.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Section</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Purpose</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Prompt Instruction</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Hook / Intro</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Grab attention immediately</td><td class="p-3 text-muted-foreground">\'Start with a surprising statistic or question\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">H2 Headings</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Structure for scanning readers</td><td class="p-3 text-muted-foreground">\'Use 4 H2 subheadings with keyword\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Body Paragraphs</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Deliver the value</td><td class="p-3 text-muted-foreground">\'Each section: explain, example, takeaway\'</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Call to Action</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Tell reader what to do next</td><td class="p-3 text-muted-foreground">\'End with a clear CTA for the reader\'</td></tr></tbody></table>'
                ]
            },
            {
                "title": "SEO-Aware Blog Writing Flow",
                "body": [
                    "Define topic + keyword  →  Set reader persona & tone  →  Generate full draft  →  Refine intro & headings  →  SEO-ready blog post",
                    "![Gemini Blog Post](/aitools_exp7.webp)"
                ]
            }
        ]
    },
    "ai-m2-4": {
        "file": "src/lib/ai-m2-data.ts",
        "aim": "To use Perplexity AI as an AI-powered research engine by formulating precise research queries that leverage its live web search capability, evaluating source citation quality, assessing answer accuracy across factual and contested topics, and comparing its research output to traditional search engine results.",
        "theory": [
            {
                "title": "Perplexity vs Google — What's Different?",
                "body": [
                    "Comparing a search indexing model with a real-time conversational retrieval engine.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Google Search</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Perplexity AI</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">What you get</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">List of links to click</td><td class="p-3 text-muted-foreground">Synthesised answer with citations</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Time to insight</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">You read multiple articles</td><td class="p-3 text-muted-foreground">Instant summary from multiple sources</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Citations</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Implicit (you check yourself)</td><td class="p-3 text-muted-foreground">Explicit inline source links</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Best for</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Finding specific pages</td><td class="p-3 text-muted-foreground">Research questions needing synthesis</td></tr></tbody></table>'
                ]
            },
            {
                "title": "Writing a Good Research Query",
                "body": [
                    "Specific question  →  Perplexity searches live web  →  Synthesises multiple sources  →  Answer with citations  →  Follow-up questions",
                    "![Perplexity Research Query](/aitools_exp8.webp)"
                ]
            }
        ]
    },

    # Module 3: Coding Lab
    "ai-m3-1": {
        "file": "src/lib/ai-m3-data.ts",
        "aim": "To use Claude as an AI software architect by providing high-level project briefs and iteratively decomposing them into working code — covering file structure planning, function-by-function implementation, and debugging cycles — demonstrating end-to-end AI-assisted software development from specification to running output.",
        "theory": [
            {
                "title": "Claude as a Software Architect",
                "body": [
                    "Unlike autocomplete tools, Claude understands the full context of your project. You describe what you want to build in plain English and Claude plans the structure, writes each part, and explains every decision.",
                    "Describe the project in plain English  →  Claude plans file structure  →  Claude writes each function  →  You test it & report bugs  →  Claude fixes & explains"
                ]
            },
            {
                "title": "Effective Project Prompting",
                "body": [
                    "Using structural prompt components to direct the code generation behavior.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Prompt Element</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Example</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Goal</td><td class="p-3 text-muted-foreground">\'Build a Python script that reads a CSV and outputs a summary\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Constraints</td><td class="p-3 text-muted-foreground">\'Use only standard libraries, no pip installs\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Output form</td><td class="p-3 text-muted-foreground">\'Show me the file structure first, then write each file\'</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Debug style</td><td class="p-3 text-muted-foreground">\'Here is the error message — explain what went wrong\'</td></tr></tbody></table>',
                    "![Claude Code Mini-Project](/aitools_exp9.webp)"
                ]
            }
        ]
    },
    "ai-m3-2": {
        "file": "src/lib/ai-m3-data.ts",
        "aim": "To use Cursor AI's editor-integrated AI to refactor existing codebases by applying targeted AI instructions for improving code readability, reducing duplication, enforcing naming conventions, and splitting monolithic functions — measuring before-and-after code quality improvements.",
        "theory": [
            {
                "title": "What Is Refactoring?",
                "body": [
                    "Refactoring means improving the structure of existing code without changing what it does. Think of it like reorganising a messy room — everything still works, but it's now clean and easy to navigate.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Refactoring Task</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Before</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">After</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Rename variables</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">\'x\', \'temp\', \'data2\'</td><td class="p-3 text-muted-foreground">Descriptive names: \'user_age\', \'invoice_total\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Split long function</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">One 200-line function</td><td class="p-3 text-muted-foreground">10 focused 20-line functions</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Remove duplication</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Same logic copy-pasted 5 times</td><td class="p-3 text-muted-foreground">One reusable function called 5 times</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Add comments</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">No explanations in code</td><td class="p-3 text-muted-foreground">Every function has a clear docstring</td></tr></tbody></table>'
                ]
            },
            {
                "title": "Cursor AI Refactoring Flow",
                "body": [
                    "Open messy code in Cursor  →  Select a section & press Cmd+K  →  \'Refactor this: make it cleaner\'  →  AI rewrites in-place  →  Review & accept changes",
                    "![Cursor AI Refactoring](/aitools_exp10.webp)"
                ]
            }
        ]
    },
    "ai-m3-3": {
        "file": "src/lib/ai-m3-data.ts",
        "aim": "To measure the productivity impact of GitHub Copilot's inline code completion by completing a set of timed coding tasks with and without Copilot enabled — documenting keystrokes saved, time reduction, and accuracy of suggestions across different programming languages and task types.",
        "theory": [
            {
                "title": "How GitHub Copilot Works",
                "body": [
                    "Copilot watches what you type in real time. As you write a function name or a comment describing what you need, it predicts the entire code block and shows it in grey text. Press Tab to accept.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Trigger Type</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What You Type</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What Copilot Generates</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Comment trigger</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground"># sort this list in descending order</td><td class="p-3 text-muted-foreground">Full sort function with return</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Function name</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">def calculate_tax(</td><td class="p-3 text-muted-foreground">Parameters, logic, docstring</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Pattern repeat</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">First item in a list pattern</td><td class="p-3 text-muted-foreground">All remaining items automatically</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Test generation</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground"># write unit tests for this function</td><td class="p-3 text-muted-foreground">Full pytest test file</td></tr></tbody></table>',
                    "![GitHub Copilot Productivity](/aitools_exp11.webp)"
                ]
            }
        ]
    },
    "ai-m3-4": {
        "file": "src/lib/ai-m3-data.ts",
        "aim": "To use Replit Agent to build, run, and iterate on a full-stack web application prototype entirely in the browser — from natural language specification through to a live deployed URL — without any local environment setup, demonstrating AI-powered zero-configuration rapid prototyping.",
        "theory": [
            {
                "title": "Why Replit Agent Is Different",
                "body": [
                    "Most coding tools just write code — you still need to install software, set up a server, and figure out deployment yourself. Replit Agent handles everything: it writes the code, runs it, fixes errors, and gives you a live URL — all in one place.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Step</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Traditional Dev</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Replit Agent</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Environment setup</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Install Node, Python, DB — hours</td><td class="p-3 text-muted-foreground">Zero setup — runs in browser</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Write code</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">You write everything manually</td><td class="p-3 text-muted-foreground">Agent writes from your description</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Fix errors</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">You debug line by line</td><td class="p-3 text-muted-foreground">Agent detects and fixes automatically</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Deploy to web</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Configure servers, DNS, hosting</td><td class="p-3 text-muted-foreground">One click — instant live URL</td></tr></tbody></table>'
                ]
            },
            {
                "title": "Replit Agent Workflow",
                "body": [
                    "Describe your app in English  →  Agent writes all the code  →  Runs it automatically  →  Fixes any errors itself  →  Live URL in minutes",
                    "![Replit Agent Prototyping](/aitools_exp12.webp)"
                ]
            }
        ]
    },

    # Module 4: Web Design Lab
    "ai-m4-1": {
        "file": "src/lib/ai-m4-data.ts",
        "aim": "To use Lovable to generate a complete, styled landing page from a single product brief prompt — iterating on layout, copy, colour scheme, and section structure through natural language instructions — and publish it to a live URL without writing any code.",
        "theory": [
            {
                "title": "Anatomy of a Landing Page",
                "body": [
                    "Landing pages are optimized to hook and convert visitors rapidly.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Section</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Purpose</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What to Tell Lovable</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Hero</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">First impression — hook the visitor</td><td class="p-3 text-muted-foreground">\'Bold headline + subheading + CTA button\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Features</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Show what it does</td><td class="p-3 text-muted-foreground">\'3 feature cards with icons\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Social Proof</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Build trust</td><td class="p-3 text-muted-foreground">\'Testimonials section with 3 quotes\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Pricing</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Convert visitors</td><td class="p-3 text-muted-foreground">\'3-tier pricing table\'</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Footer</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Links and legal</td><td class="p-3 text-muted-foreground">\'Links, social icons, copyright\'</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Lovable Design Flow",
                "body": [
                    "Write product brief in chat  →  Lovable generates full page  →  Ask: \'change colour to blue\'  →  Ask: \'add testimonials\'  →  Publish to live URL",
                    "![Lovable Landing Page](/aitools_exp13.webp)"
                ]
            }
        ]
    },
    "ai-m4-2": {
        "file": "src/lib/ai-m4-data.ts",
        "aim": "To use Bolt.new to build a complete full-stack web application from a natural language specification — including frontend UI, backend logic, and data persistence — deployed live in the browser, demonstrating AI-driven full-stack development without any local environment configuration.",
        "theory": [
            {
                "title": "Full-Stack vs Landing Page",
                "body": [
                    "Static pages vs. dynamic, database-backed applications.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Landing Page (Lovable)</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Full-Stack App (Bolt.new)</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Stores data?</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">No</td><td class="p-3 text-muted-foreground">Yes — database included</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">User accounts?</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">No</td><td class="p-3 text-muted-foreground">Yes — auth supported</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Dynamic?</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Static content only</td><td class="p-3 text-muted-foreground">Changes based on user actions</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Examples</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Marketing site, portfolio</td><td class="p-3 text-muted-foreground">Todo app, booking system, dashboard</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Bolt.new App Building Flow",
                "body": [
                    "Describe the app & features  →  Bolt builds frontend  →  Bolt adds backend & DB  →  Test in browser  →  Deploy & share link",
                    "![Bolt.new Web App](/aitools_exp14.webp)"
                ]
            }
        ]
    },
    "ai-m4-3": {
        "file": "src/lib/ai-m4-data.ts",
        "aim": "To use Vercel's v0 to generate production-ready React UI components from natural language descriptions — including forms, navigation bars, cards, and modals — and evaluate the generated Tailwind CSS and shadcn/ui code for direct integration into existing React projects.",
        "theory": [
            {
                "title": "What Is a UI Component?",
                "body": [
                    "A UI component is a reusable building block of a website — like a button, a login form, or a navigation bar. v0 generates these as clean React code.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Component Type</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What You Describe</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What v0 Generates</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Form</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">\'Sign-up form with name, email, password, submit button\'</td><td class="p-3 text-muted-foreground">Full React form with validation</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Nav bar</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">\'Dark navbar with logo left, links centre, CTA right\'</td><td class="p-3 text-muted-foreground">Responsive navbar component</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Card</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">\'Product card with image, title, price, add-to-cart button\'</td><td class="p-3 text-muted-foreground">Styled card component</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Modal</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">\'Confirmation dialog with cancel and confirm buttons\'</td><td class="p-3 text-muted-foreground">Accessible modal with overlay</td></tr></tbody></table>',
                    "![v0 Component Library](/aitools_exp15.webp)"
                ]
            }
        ]
    },
    "ai-m4-4": {
        "file": "src/lib/ai-m4-data.ts",
        "aim": "To use Figma's AI-powered design features to auto-generate layout variations, apply design system constraints, and produce responsive grid structures from content briefs — evaluating AI-generated designs against established UX heuristics for usability, visual hierarchy, and accessibility.",
        "theory": [
            {
                "title": "What Figma AI Can Do",
                "body": [
                    "Figma leverages AI tools to expedite design system compliance and mockup creation.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Figma AI Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What It Does</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Auto Layout AI</td><td class="p-3 text-muted-foreground">Generates responsive frames that adapt to content size</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Design Suggestions</td><td class="p-3 text-muted-foreground">Proposes layout variations based on your content</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Component Matching</td><td class="p-3 text-muted-foreground">Finds the right component from your design system automatically</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Copy Generation</td><td class="p-3 text-muted-foreground">Fills placeholder text with contextually relevant content</td></tr></tbody></table>'
                ]
            },
            {
                "title": "Evaluating AI Designs — UX Heuristics",
                "body": [
                    "A critical interface design requires checking formatting against accessibility and user guidelines.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Heuristic</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What to Check</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Visual Hierarchy</td><td class="p-3 text-muted-foreground">Is the most important element largest / most prominent?</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Whitespace</td><td class="p-3 text-muted-foreground">Is there breathing room or is it too cluttered?</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Consistency</td><td class="p-3 text-muted-foreground">Do fonts, colours and spacing match the design system?</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Accessibility</td><td class="p-3 text-muted-foreground">Is contrast ratio above 4.5:1? Are tap targets large enough?</td></tr></tbody></table>',
                    "![Figma AI Layouts](/aitools_exp16.webp)"
                ]
            }
        ]
    },

    # Module 5: Research & Productivity Lab
    "ai-m5-1": {
        "file": "src/lib/ai-m5-data.ts",
        "aim": "To use Google NotebookLM to ingest multiple source documents and conduct an interactive question-answering session that extracts, cross-references, and synthesises information across sources — evaluating the accuracy of grounded citations and the tool's ability to surface non-obvious connections between documents.",
        "theory": [
            {
                "title": "NotebookLM — Your Personal Research Assistant",
                "body": [
                    "NotebookLM serves as a stateful agent operating exclusively on your private documentation boundaries.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What It Does</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Grounded answers</td><td class="p-3 text-muted-foreground">Every answer cites the exact document and passage it came from</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Cross-referencing</td><td class="p-3 text-muted-foreground">Finds connections between multiple documents automatically</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">No hallucination</td><td class="p-3 text-muted-foreground">Will not answer from outside your uploaded sources</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Audio overview</td><td class="p-3 text-muted-foreground">Generates a podcast-style summary of your documents</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The NotebookLM Question-Answering Flow",
                "body": [
                    "Upload PDFs & notes  →  NotebookLM indexes them  →  Ask a question in chat  →  Grounded answer with citation  →  Follow-up and explore",
                    "![NotebookLM Document Chat](/aitools_exp17.webp)"
                ]
            }
        ]
    },
    "ai-m5-2": {
        "file": "src/lib/ai-m5-data.ts",
        "aim": "To use Gamma to transform a structured content outline into a visually polished presentation deck in under five minutes — evaluating the AI's slide structuring logic, visual theme selection, and content distribution — and iterating on specific slides through natural language editing instructions.",
        "theory": [
            {
                "title": "What Gamma Does Differently",
                "body": [
                    "Gamma replaces template-based design with generative canvas workflows.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Traditional (PowerPoint)</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">AI-Powered (Gamma)</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Starting point</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Blank slide</td><td class="p-3 text-muted-foreground">AI-generated full deck from outline</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Design time</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Hours choosing fonts and layouts</td><td class="p-3 text-muted-foreground">Seconds — AI picks everything</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Content</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">You write every word</td><td class="p-3 text-muted-foreground">AI drafts, you refine</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Editing</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Manual drag and drop</td><td class="p-3 text-muted-foreground">Natural language: \'make slide 3 shorter\'</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Presentation Design Flow",
                "body": [
                    "Enter topic or paste outline  →  Gamma generates all slides  →  AI picks theme & layout  →  \'Make slide 2 more visual\'  →  Export or share link",
                    "![Gamma Presentation Deck](/aitools_exp18.webp)"
                ]
            }
        ]
    },
    "ai-m5-3": {
        "file": "src/lib/ai-m5-data.ts",
        "aim": "To use Napkin AI to automatically convert written explanations and structured text into clear visual diagrams — including flowcharts, comparison frameworks, and process maps — evaluating the semantic accuracy of AI-generated visuals and iterating on diagram type and layout through natural language instructions.",
        "theory": [
            {
                "title": "Why Diagrams Matter",
                "body": [
                    "Visual layouts increase learning and retention rates compared to dense paragraphs.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Diagram Type</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Best For</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Example Text Input</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Flowchart</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Processes and decisions</td><td class="p-3 text-muted-foreground">\'User logs in → check password → success or retry\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Comparison</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Side-by-side evaluation</td><td class="p-3 text-muted-foreground">\'RAG vs Fine-tuning: cost, speed, accuracy\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Timeline</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Sequential events</td><td class="p-3 text-muted-foreground">\'Phase 1: Research, Phase 2: Build, Phase 3: Test\'</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Mind Map</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Brainstorming relationships</td><td class="p-3 text-muted-foreground">\'AI Tools: Writing, Coding, Design, Research\'</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Diagram Generation Flow",
                "body": [
                    "Paste or write your explanation  →  Napkin reads the structure  →  Selects best diagram type  →  Generates visual  →  Export as SVG / PNG",
                    "![Napkin AI Diagrams](/aitools_exp19.webp)"
                ]
            }
        ]
    },
    "ai-m5-4": {
        "file": "src/lib/ai-m5-data.ts",
        "aim": "To use Elicit as an AI research assistant for conducting a structured literature review by submitting targeted research questions, evaluating the relevance ranking of returned papers, extracting key findings across multiple studies using Elicit's column-based extraction system, and synthesising a coherent evidence summary from the results.",
        "theory": [
            {
                "title": "What Is a Literature Review?",
                "body": [
                    "Elicit automates database searching and key fact extraction across thousands of studies.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Step</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Traditional Literature Review</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Elicit AI Review</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Search</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Manual Google Scholar, keyword hunting</td><td class="p-3 text-muted-foreground">One research question → Elicit finds papers</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Screening</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Read abstract of every paper manually</td><td class="p-3 text-muted-foreground">AI ranks by relevance automatically</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Extraction</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Copy key facts from each paper manually</td><td class="p-3 text-muted-foreground">AI fills columns: methods, results, sample size</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Synthesis</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Write summary from notes</td><td class="p-3 text-muted-foreground">AI drafts synthesis across all papers</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Literature Review Flow",
                "body": [
                    "Enter research question  →  Elicit finds relevant papers  →  AI ranks by relevance  →  Extract findings across papers  →  Synthesise evidence summary",
                    "![Elicit Literature Review](/aitools_exp20.webp)"
                ]
            }
        ]
    }
}

# Group updates by file to process them efficiently
files_to_update = {}
for exp_id, val in updates.items():
    f = val["file"]
    if f not in files_to_update:
        files_to_update[f] = []
    files_to_update[f].append((exp_id, val))

for filepath, exp_list in files_to_update.items():
    print(f"Reading {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for exp_id, data in exp_list:
        print(f"  Injecting {exp_id}...")
        idx = content.find(f'id: "{exp_id}"')
        if idx == -1:
            idx = content.find(f"id: '{exp_id}'")
            
        if idx == -1:
            print(f"    ERROR: Could not find experiment {exp_id} in {filepath}")
            continue
            
        # 1. Update Aim
        aim_lbl_idx = content.find('aim:', idx)
        if aim_lbl_idx != -1:
            open_idx, close_idx = find_matching_bracket(content, aim_lbl_idx, '{', '}')
            if open_idx != -1:
                # We need to preserve bullets if they exist or just overwrite the text
                # Let's extract the existing bullets block if possible to be completely safe
                aim_content_str = content[open_idx:close_idx]
                bullets_lbl_idx = aim_content_str.find('bullets:')
                bullets_str = "[]"
                if bullets_lbl_idx != -1:
                    b_open, b_close = find_matching_bracket(aim_content_str, bullets_lbl_idx, '[', ']')
                    if b_open != -1:
                        bullets_str = aim_content_str[b_open:b_close]
                
                aim_formatted = f'{{\n        text: {json.dumps(data["aim"])},\n        bullets: {bullets_str}\n      }}'
                content = content[:open_idx] + aim_formatted + content[close_idx:]
                # Re-find index since lengths changed
                idx = content.find(f'id: "{exp_id}"')
                if idx == -1:
                    idx = content.find(f"id: '{exp_id}'")

        # 2. Update Theory
        theory_lbl_idx = content.find('theory:', idx)
        if theory_lbl_idx != -1:
            open_idx, close_idx = find_matching_bracket(content, theory_lbl_idx, '[', ']')
            if open_idx != -1:
                theory_formatted = json.dumps(data["theory"], indent=6)
                # Align indentation
                theory_formatted_ts = theory_formatted.replace('\n', '\n      ')
                content = content[:open_idx] + theory_formatted_ts + content[close_idx:]
                
                # Re-find index
                idx = content.find(f'id: "{exp_id}"')
                if idx == -1:
                    idx = content.find(f"id: '{exp_id}'")

    # Add trigger comment for dev HMR
    content = content.replace("// Trigger HMR", "") + "\n// Trigger HMR"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("All files updated successfully!")
