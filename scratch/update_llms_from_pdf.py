import json

filepath = 'src/lib/course-data.ts'

# Structured data to inject
updates = {
    # Module 1
    "llms-w1-2": {
        "aim": "To implement a Byte-Pair Encoding tokenization pipeline from first principles by iteratively merging the most frequent character pairs in a corpus, building a subword vocabulary that efficiently balances coverage and compression across diverse text inputs.",
        "theory": [
            {
                "title": "The Two Old Problems",
                "body": [
                    "Computers used to read text in two ways — both had big problems:",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Approach</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What It Does</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">The Problem</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Whole-Word</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Looks up each word in a giant dictionary</td><td class="p-3 text-muted-foreground">New words / typos = total failure (OOV error)</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Letter-by-Letter</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Reads one character at a time</td><td class="p-3 text-muted-foreground">Sentences become too long — computer forgets the start by the end</td></tr></tbody></table>'
                ]
            },
            {
                "title": "BPE — The Goldilocks Fix",
                "body": [
                    "BPE starts with letters, then keeps merging the most popular pairs into new symbols — like inventing shorthand for common combinations.",
                    "Start: u n p r e d i c t a b l e  →  Find most frequent pair  →  Merge it into one new symbol  →  Repeat thousands of times  →  Result: un + predict + able",
                    "Why BPE wins:",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">BPE Behaviour</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Common words</td><td class="p-3 text-muted-foreground">Single token — \'the\' = 1 piece</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Rare / new words</td><td class="p-3 text-muted-foreground">Split into chunks — \'un\' + \'predict\' + \'able\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Unknown words</td><td class="p-3 text-muted-foreground">Never crashes — always finds pieces</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">GPT-4 upgrade</td><td class="p-3 text-muted-foreground">Starts from 256 bytes — works for ALL languages</td></tr></tbody></table>',
                    "![BPE Tokenization](/llmexp1.webp)"
                ]
            }
        ]
    },
    "llms-w1-3": {
        "aim": "To generate dense vector representations of words and sentences using pre-trained embedding models, visualize their positions in high-dimensional semantic space, and quantify the conceptual similarity between text pairs using Cosine Similarity as the core distance metric.",
        "theory": [
            {
                "title": "From IDs to a Map",
                "body": [
                    "Old method gave every word a unique number — but Cat=1 and Dog=2 tells the computer nothing about their relationship. Embeddings fix this by placing every word on a giant invisible map. Words used in similar sentences end up near each other.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Method</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Knows Cat ≈ Dog?</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Can do King − Man + Woman = Queen?</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">One-Hot ID</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">No</td><td class="p-3 text-muted-foreground">No</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Word Embeddings</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Yes — they are close on the map</td><td class="p-3 text-muted-foreground">Yes — directions carry meaning</td></tr></tbody></table>'
                ]
            },
            {
                "title": "Cosine Similarity — the Angle Trick",
                "body": [
                    "We measure closeness by the angle between two word-arrows, not their length.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Angle</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Score</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Meaning</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">0°</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">1.0</td><td class="p-3 text-muted-foreground">Same meaning</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">90°</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">0.0</td><td class="p-3 text-muted-foreground">Unrelated</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">180°</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">-1.0</td><td class="p-3 text-muted-foreground">Opposite meaning</td></tr></tbody></table>',
                    "![Word Embeddings](/vector_space_sim.webp)"
                ]
            }
        ]
    },
    "llms-w1-4": {
        "aim": "To dissect and map the full structural anatomy of the original Encoder-Decoder Transformer architecture, and implement its Positional Encoding layer from scratch using alternating sine and cosine wave functions to understand how sequence order is preserved without recurrence.",
        "theory": [
            {
                "title": "The Old Way (RNN) vs The New Way (Transformer)",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">RNN / LSTM</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Transformer</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Reads text</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">One word at a time</td><td class="p-3 text-muted-foreground">All words simultaneously</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Speed</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Slow — sequential</td><td class="p-3 text-muted-foreground">Fast — fully parallel</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Memory</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Forgets early words in long text</td><td class="p-3 text-muted-foreground">Every word can see every other word</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">GPU friendly?</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">No</td><td class="p-3 text-muted-foreground">Yes</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Ordering Problem & Positional Encoding",
                "body": [
                    "Reading everything at once loses word order — 'Dog bites man' and 'Man bites dog' look identical. Fix: stamp each word with a unique wave signature before processing.",
                    "Tokens in  →  Add wave stamp (PE)  →  Now each word has a seat number  →  Encoder reads all at once  →  Meaning preserved ✓"
                ]
            },
            {
                "title": "Encoder vs Decoder — Quick Map",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Part</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Job</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Example</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Encoder</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Reads & understands input</td><td class="p-3 text-muted-foreground">Reading English</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Decoder</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Generates output word by word</td><td class="p-3 text-muted-foreground">Writing French</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Both together</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Full translation / summarisation</td><td class="p-3 text-muted-foreground">GPT, T5, BERT</td></tr></tbody></table>',
                    "![Transformer Architecture](/llmexp3.webp)"
                ]
            }
        ]
    },
    "llms-w1-5": {
        "aim": "To manually implement the complete Scaled Dot-Product Attention mechanism from first principles — computing Query, Key, and Value projections, applying scaled dot-product scoring, and using softmax normalization — to observe how each token dynamically routes and weights contextual information from every other token in the sequence.",
        "theory": [
            {
                "title": "The Library Analogy — Q, K, V",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Vector</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Role</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Library Analogy</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Q — Query</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">What am I looking for?</td><td class="p-3 text-muted-foreground">Your search question</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">K — Key</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">What do I offer to others?</td><td class="p-3 text-muted-foreground">A book\'s title / label</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">V — Value</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">What is my actual content?</td><td class="p-3 text-muted-foreground">The book\'s inner knowledge</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Formula — Step by Step",
                "body": [
                    "Attention(Q, K, V) = softmax( QK^T / sqrt(d_k) ) x V",
                    "Q × K Score every word pair  →  ÷ √d_k Turn down the volume  →  softmax() Convert to percentages  →  × V Blend values by score  →  Context-rich output token"
                ]
            },
            {
                "title": "Why the Scaling ÷ √d_k Matters",
                "body": [
                    "Without it, scores explode at high dimensions → softmax outputs near-zero gradients → the model stops learning. Dividing by √d_k keeps scores in a healthy range.",
                    "![Self-Attention](/llmexp4.webp)"
                ]
            }
        ]
    },
    # Module 2
    "llms-w2-1": {
        "aim": "To evaluate the baseline generalization capabilities of a Large Language Model by designing and testing structured task prompts that contain no examples, measuring how accurately the model leverages its pre-trained knowledge to perform classification, translation, and instruction-following tasks under strict system-level behavioral constraints.",
        "theory": [
            {
                "title": "What Is Zero-Shot?",
                "body": [
                    "You give the AI a task with zero examples. The AI uses only what it already learned from reading billions of internet pages during training.",
                    "You write a clear task  →  No examples given  →  AI uses its pre-trained brain  →  Outputs the answer"
                ]
            },
            {
                "title": "System Prompt vs User Prompt",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Layer</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Who Sets It</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What It Does</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">System Prompt</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Developer</td><td class="p-3 text-muted-foreground">Sets the rulebook — persona, format, constraints</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">User Prompt</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">User</td><td class="p-3 text-muted-foreground">The actual question or task being asked</td></tr></tbody></table>'
                ]
            },
            {
                "title": "When Zero-Shot Works vs Fails",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Task</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Zero-Shot?</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Translate to French</td><td class="p-3 text-muted-foreground">Works</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Sentiment analysis</td><td class="p-3 text-muted-foreground">Works</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Custom JSON schema</td><td class="p-3 text-muted-foreground">Often fails</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Niche domain labels</td><td class="p-3 text-muted-foreground">Often fails</td></tr></tbody></table>',
                    "![Zero-Shot Prompting](/zero_shot_illustration.webp)"
                ]
            }
        ]
    },
    "llms-w2-2": {
        "aim": "To implement In-Context Learning by engineering a curated set of balanced input-output exemplars directly inside the prompt payload, guiding the model to replicate specific output patterns and classification schemas without modifying its underlying weights, while actively mitigating Majority Label Bias and Recency Bias through deliberate exemplar ordering.",
        "theory": [
            {
                "title": "The Idea — Show, Don't Just Tell",
                "body": [
                    "Instead of explaining the rules, you paste a few perfect examples directly into the prompt. The AI copies the pattern — instantly, no retraining needed.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Step</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Detail</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Example 1</td><td class="p-3 text-muted-foreground">\'Cat\' → Animal</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Example 2</td><td class="p-3 text-muted-foreground">\'Rose\' → Plant</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Example 3</td><td class="p-3 text-muted-foreground">\'Eagle\' → Animal</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">New question</td><td class="p-3 text-muted-foreground">\'Oak\' → ?</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">AI sees the pattern</td><td class="p-3 text-muted-foreground">Outputs: Plant ✓</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Hidden Dangers — Bias",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Bias Type</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What Happens</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">The Fix</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Majority Label Bias</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">3 Positive examples, 1 Negative → AI always says Positive</td><td class="p-3 text-muted-foreground">Balance labels equally</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Recency Bias</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">AI blindly copies the pattern of the last example</td><td class="p-3 text-muted-foreground">Shuffle example order randomly</td></tr></tbody></table>',
                    "![Few-Shot Prompting](/few_shot_illustration.webp)"
                ]
            }
        ]
    },
    "llms-w2-3": {
        "aim": "To improve LLM accuracy on complex multi-step reasoning, mathematical deduction, and logical inference tasks by prompting the model to generate explicit intermediate reasoning steps before producing a final answer, effectively expanding its working memory and reducing catastrophic hallucination rates.",
        "theory": [
            {
                "title": "The Problem — No Scratch Paper",
                "body": [
                    "When you demand an instant final answer to a complex problem, the AI must compress 10 steps into 1 prediction — and usually gets it wrong. CoT gives it scratch paper to think on.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Without CoT</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">With CoT</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">How AI answers</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Guesses final answer in one shot</td><td class="p-3 text-muted-foreground">Writes every step, then answers</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Accuracy on maths</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Often wrong</td><td class="p-3 text-muted-foreground">Dramatically better</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Hallucination risk</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">High</td><td class="p-3 text-muted-foreground">Low</td></tr></tbody></table>'
                ]
            },
            {
                "title": "How Each Step Feeds the Next",
                "body": [
                    "User asks hard question  →  AI writes Step 1  →  Step 1 added to context  →  AI writes Step 2…  →  Final answer is grounded ✓"
                ]
            },
            {
                "title": "Two Ways to Trigger CoT",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Method</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">How</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Effort</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Zero-Shot CoT</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Append \'Let us think step by step\'</td><td class="p-3 text-muted-foreground">One line — easy</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Few-Shot CoT</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Provide full worked examples with steps shown</td><td class="p-3 text-muted-foreground">More effort — more reliable</td></tr></tbody></table>',
                    "![Chain-of-Thought Prompting](/cot_illustration.webp)"
                ]
            }
        ]
    },
    "llms-w2-4": {
        "aim": "To enforce strict, machine-parseable output formatting from an LLM by applying both prompt-level schema constraints and grammar-level token filtering techniques, ensuring every response conforms to a valid JSON or Pydantic schema structure suitable for direct programmatic ingestion by downstream APIs and databases.",
        "theory": [
            {
                "title": "The Problem — AIs Love to Chat",
                "body": [
                    "By default the AI says: 'Sure! Here is the JSON: { ... } Hope this helps!' The word 'Sure' instantly crashes any program trying to parse that as JSON.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Default AI Output</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Structured Output</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Format</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Conversational prose + data</td><td class="p-3 text-muted-foreground">Pure valid JSON only</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">JSON.parse() result</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">CRASH</td><td class="p-3 text-muted-foreground">Works perfectly</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Use in production?</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">No</td><td class="p-3 text-muted-foreground">Yes</td></tr></tbody></table>'
                ]
            },
            {
                "title": "Two Enforcement Levels",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Method</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">How It Works</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Reliability</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Prompt Constraints</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Tell the AI: output ONLY valid JSON, no markdown</td><td class="p-3 text-muted-foreground">~90% — AI can still slip</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Grammar-Level Constraints</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">API engine blocks any token that violates the schema mathematically</td><td class="p-3 text-muted-foreground">100% guaranteed — physically impossible to fail</td></tr></tbody></table>',
                    "![Structured Output Generation](/structured_output_illustration.webp)"
                ]
            }
        ]
    },
    # Module 3
    "llms-w3-1": {
        "aim": "To architect a fully stateful conversational interface by engineering a client-side rolling message history loop that appends every user and assistant turn with its role label, transmits the full history on every API call, and implements a truncation strategy — either Sliding Window or Summary Buffer — to sustain coherent long-term dialogue within the model's hard context window limit.",
        "theory": [
            {
                "title": "Shocking Fact — The AI Has No Memory!",
                "body": [
                    "Every API call starts completely fresh. The AI instantly forgets everything after replying. ChatGPT only seems to remember because the app secretly sends the entire conversation history with every message.",
                    "Message 1 sent  →  Reply 1 received  →  Message 2 sent + full history  →  Reply 2 received  →  History grows every turn"
                ]
            },
            {
                "title": "The Three Roles in the History Array",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Role</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Who</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Example</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">system</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Developer</td><td class="p-3 text-muted-foreground">\'You are a helpful assistant. Reply concisely.\'</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">user</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Human</td><td class="p-3 text-muted-foreground">\'What is the capital of France?\'</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">assistant</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">AI</td><td class="p-3 text-muted-foreground">\'The capital of France is Paris.\'</td></tr></tbody></table>'
                ]
            },
            {
                "title": "When History Gets Too Big — Truncation Strategies",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Strategy</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What It Does</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Keeps Old Context?</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Cost</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Sliding Window</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Delete the oldest messages when limit is near</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">No — gone forever</td><td class="p-3 text-muted-foreground">Low</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Summary Buffer</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Summarise old messages into one compact block</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Yes — compressed</td><td class="p-3 text-muted-foreground">Medium</td></tr></tbody></table>',
                    "![Building a Chatbot](/llms_w3_1_stateful_memory.png)"
                ]
            }
        ]
    },
    "llms-w3-2": {
        "aim": "To design and benchmark three document summarization architectures — Stuffing, Map-Reduce, and Refine — against documents of varying sizes that exceed model context limits, comparing each strategy's output quality, context preservation depth, and total API call efficiency to determine the optimal approach for different document types.",
        "theory": [
            {
                "title": "The Challenge — Document Won't Fit!",
                "body": [
                    "AI models can only read a limited number of words at once (context window). A 500-page legal contract is way too big. We need smart chunking strategies.",
                    "Strategy 1 — Stuffing: Entire doc into one prompt  →  Summary",
                    "Strategy 2 — Map-Reduce: Split into chunks  →  Summarise each (MAP)  →  Combine summaries  →  Final summary (REDUCE)",
                    "Strategy 3 — Refine: Chunk 1 → Summary 1  →  Chunk 2 + Summary 1 → Summary 2  →  Chunk 3 + Summary 2 → Summary 3  →  Final Summary ✓"
                ]
            },
            {
                "title": "Strategy Comparison",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Strategy</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Speed</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Context Quality</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Best For</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Stuffing</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Instant</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Perfect</td><td class="p-3 text-muted-foreground">Short docs only</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Map-Reduce</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Fast</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Some loss</td><td class="p-3 text-muted-foreground">Large docs, speed matters</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Refine</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Slow</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Excellent</td><td class="p-3 text-muted-foreground">Legal / technical docs</td></tr></tbody></table>',
                    "![AI-Based Text Summarization](/llms_w3_2_summarization.png)"
                ]
            }
        ]
    },
    "llms-w3-3": {
        "aim": "To build a context-grounded question answering pipeline that retrieves the most relevant passages from a provided document, injects them directly into a strictly constrained system prompt, and forces the LLM to extract verifiable answers exclusively from the supplied context — explicitly instructing the model to respond with 'I don't know' when the answer is absent — eliminating hallucination and creating a full audit trail from answer back to source.",
        "theory": [
            {
                "title": "The Problem — AI Guesses From Memory",
                "body": [
                    "Ask an AI about your company's private HR policy and it invents a confident answer that sounds right but is completely made up — it was never trained on your document.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Standard AI</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Document QA</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Knowledge source</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Pre-trained memory</td><td class="p-3 text-muted-foreground">The document you provide</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Hallucination risk</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Very High</td><td class="p-3 text-muted-foreground">Very Low</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Can be audited?</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">No</td><td class="p-3 text-muted-foreground">Yes — answer traces back to source</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Unknown answer?</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Invents one</td><td class="p-3 text-muted-foreground">Says \'I don\'t know\'</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Extraction Flow",
                "body": [
                    "User question  →  Find relevant passages  →  Inject into prompt + rule: use only this  →  AI reads & extracts answer  →  Auditable result ✓",
                    "![Document Question Answering](/llms_w3_3_document_qa.png)"
                ]
            }
        ]
    },
    # Module 4
    "llms-w4-1": {
        "aim": "To build a document ingestion pipeline that systematically chunks raw text into semantically coherent blocks, converts each chunk into a dense high-dimensional vector using a pre-trained embedding model, applies L2 normalization to standardize all vector magnitudes to 1.0, and stores the resulting vectors in a structured format ready for similarity-based retrieval.",
        "theory": [
            {
                "title": "From Words to Numbers to Meaning",
                "body": [
                    "A computer cannot read meaning — it only works with numbers. Embedding models translate every paragraph into a unique list of numbers that captures its meaning as a location on a giant invisible map.",
                    "Raw document (PDF / text)  →  Chunking 200–500 words each  →  Embedding model chunk → vector  →  L2 Normalise magnitude = 1.0  →  Store in vector database"
                ]
            },
            {
                "title": "Why These Steps Matter",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Step</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Why It Is Needed</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Chunking</td><td class="p-3 text-muted-foreground">One big blob = one blurry average of everything. Chunks keep ideas separate and findable.</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Embedding</td><td class="p-3 text-muted-foreground">Converts meaning into numbers the computer can compare mathematically.</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">L2 Normalisation</td><td class="p-3 text-muted-foreground">Makes all vectors the same length so comparisons are fair and fast.</td></tr></tbody></table>\',',
                    "![Creating Embeddings](/chunking_embedding_illustration.webp)"
                ]
            }
        ]
    },
    "llms-w4-2": {
        "aim": "To implement a vector similarity search engine using cosine similarity as the ranking metric, enabling natural language queries to retrieve the most contextually relevant document chunks from a vector index — bypassing keyword matching entirely — and compare the performance trade-offs between brute-force Flat Index search and Approximate Nearest Neighbor indexing using HNSW graphs.",
        "theory": [
            {
                "title": "Keyword Search vs Semantic Search",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Keyword Search</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Semantic Search</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Matches on</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Exact same words</td><td class="p-3 text-muted-foreground">Meaning and concept</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">\'car\' finds</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Only \'car\'</td><td class="p-3 text-muted-foreground">\'vehicle\', \'automobile\', \'sedan\' too</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Fails when</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Different words, same idea</td><td class="p-3 text-muted-foreground">Almost never</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Method</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">String comparison</td><td class="p-3 text-muted-foreground">Cosine similarity of vectors</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The Search Flow",
                "body": [
                    "User question  →  Embed the question → vector  →  Compare against all stored vectors  →  Rank by cosine similarity score  →  Return top matching chunks"
                ]
            },
            {
                "title": "Flat Index vs HNSW — Speed Trade-off",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Index Type</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Method</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Speed</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Accuracy</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Use When</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Flat Index</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Check every single vector one by one</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Slow (millions = minutes)</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">100%</td><td class="p-3 text-muted-foreground">Small datasets</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">HNSW Graph</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Navigate a smart graph, skip irrelevant zones</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Fast (millions = milliseconds)</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">~99%</td><td class="p-3 text-muted-foreground">Production systems</td></tr></tbody></table>',
                    "![Semantic Search](/semantic_search_illustration.webp)"
                ]
            }
        ]
    },
    "llms-w4-3": {
        "aim": "To construct a complete end-to-end Retrieval-Augmented Generation system that intercepts user queries, executes semantic search against a live vector database, injects the top retrieved chunks as grounded context into a structured LLM prompt, and produces factually verifiable answers — directly solving the twin limitations of knowledge cutoff dates and hallucination in standalone language models.",
        "theory": [
            {
                "title": "The Two Problems RAG Fixes",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">LLM Problem</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What Happens</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">RAG Fix</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Knowledge cutoff</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">AI trained in 2023 has no idea about 2025 events</td><td class="p-3 text-muted-foreground">Vector DB is updated; AI reads fresh facts before answering</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Hallucination</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">AI confidently invents facts it doesn\'t know</td><td class="p-3 text-muted-foreground">AI is forced to answer only from retrieved real documents</td></tr></tbody></table>'
                ]
            },
            {
                "title": "The RAG Orchestration Loop",
                "body": [
                    "User asks a question  →  Semantic search on vector DB  →  Retrieve top 3–5 chunks  →  Inject chunks into prompt  →  LLM reads & answers ✓"
                ]
            },
            {
                "title": "Advanced RAG Upgrades",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Upgrade</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">What It Does</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Cross-Encoder Reranking</td><td class="p-3 text-muted-foreground">Double-checks retrieved chunks and reorders by true relevance before injection</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Query Expansion</td><td class="p-3 text-muted-foreground">Rewrites a vague user question into a better optimised search query first</td></tr></tbody></table>',
                    "![RAG Pipeline](/rag_pipeline_illustration.webp)"
                ]
            }
        ]
    },
    "llms-w4-4": {
        "aim": "To systematically analyze and compare the technical trade-offs, deployment costs, use case boundaries, and performance characteristics of context-based optimization via Prompt Engineering and RAG against parametric optimization via supervised Fine-Tuning — including parameter-efficient LoRA adaptation — producing a clear decision framework for selecting the correct strategy given a specific enterprise requirement.",
        "theory": [
            {
                "title": "Two Ways to Make an AI Better",
                "body": [
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Feature</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">RAG / Prompt Engineering</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Fine-Tuning</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">What changes</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">The context (what AI reads)</td><td class="p-3 text-muted-foreground">The neural weights (AI\'s brain)</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Best for</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Changing facts, live data</td><td class="p-3 text-muted-foreground">Fixed style, format, custom tone</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Speed to deploy</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Hours</td><td class="p-3 text-muted-foreground">Days to weeks</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Cost</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Per-query token cost</td><td class="p-3 text-muted-foreground">Large upfront GPU cost</td></tr><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Learns new facts?</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Yes — update the DB</td><td class="p-3 text-muted-foreground">No — facts go stale fast</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Learns new style?</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">Inconsistent</td><td class="p-3 text-muted-foreground">Deeply and reliably</td></tr></tbody></table>'
                ]
            },
            {
                "title": "LoRA — Fine-Tuning on a Budget",
                "body": [
                    "Full fine-tuning retrains billions of weights — extremely expensive. LoRA freezes the entire base model and trains only a tiny adapter layer on top. Like pinning a sticky note onto a textbook instead of reprinting the whole book.",
                    '[TABLE]:<table class="w-full border border-slate-700/50 rounded-xl my-4 text-sm"><thead class="bg-slate-800/50"><tr><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Method</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">Weights Trained</th><th class="p-3 text-left border-b border-slate-700/50 font-semibold text-foreground">GPU Cost</th></tr></thead><tbody><tr class="border-b border-slate-800/30"><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">Full Fine-Tuning</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">7,000,000,000+</td><td class="p-3 text-muted-foreground">Extremely high</td></tr><tr><td class="p-3 border-r border-slate-800/30 font-medium text-foreground">LoRA Adapter</td><td class="p-3 border-r border-slate-800/30 text-muted-foreground">~1,000,000</td><td class="p-3 text-muted-foreground">Accessible on a single GPU</td></tr></tbody></table>'
                ]
            },
            {
                "title": "Decision Flow — Which to Choose?",
                "body": [
                    "Do facts change often?  →  YES: Use RAG update the DB  →  NO: Need a custom style?  →  YES: Fine-Tune (LoRA)  →  Need both?: Fine-Tune style + RAG for facts",
                    "![Fine-Tuning vs Prompt Engineering](/rag_vs_finetuning_illustration.webp)"
                ]
            }
        ]
    }
}

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

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

for exp_id, data in updates.items():
    print(f"Updating {exp_id}...")
    
    idx = content.find(f'id: "{exp_id}"')
    if idx == -1:
        print(f"  ERROR: Could not find {exp_id}")
        continue
        
    # 1. Update Aim
    aim_lbl_idx = content.find('aim:', idx)
    if aim_lbl_idx != -1:
        open_idx, close_idx = find_matching_bracket(content, aim_lbl_idx, '{', '}')
        if open_idx != -1:
            aim_formatted = f'{{\n                text: {json.dumps(data["aim"])},\n                bullets: []\n              }}'
            content = content[:open_idx] + aim_formatted + content[close_idx:]
            # Re-find the exp index since length changed
            idx = content.find(f'id: "{exp_id}"')

    # 2. Update Theory
    theory_lbl_idx = content.find('theory:', idx)
    if theory_lbl_idx != -1:
        open_idx, close_idx = find_matching_bracket(content, theory_lbl_idx, '[', ']')
        if open_idx != -1:
            # Format theory array
            theory_formatted = json.dumps(data["theory"], indent=14)
            # Remove redundant formatting or fix indentation
            # Adjust indentation for TypeScript formatting
            theory_formatted_ts = theory_formatted.replace('\n', '\n            ')
            
            # Since JSON prints double quotes, we keep it as is since it's valid JS/TS
            content = content[:open_idx] + theory_formatted_ts + content[close_idx:]
            # Re-find the exp index
            idx = content.find(f'id: "{exp_id}"')

# Also append dummy edit to force HMR if needed
content = content.replace("// Trigger HMR", "") + "\n// Trigger HMR"

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("[OK] Done updating course-data.ts!")
