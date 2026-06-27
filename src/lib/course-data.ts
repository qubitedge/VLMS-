import { dbmsCourse } from './dbms-data';
import { adsCourse } from './ads-data';
import { dsCourse } from './ds-data';
import { aiCourse } from './ai-data';
import { pythonCourse } from './python-data';
import { javaCourse } from './java-data';
import { iotCourse } from './iot-data';
import { cShortNotes } from './c-short-notes';
import { mlShortNotes } from './ml-short-notes';
import { llmsShortNotes } from './llms-short-notes';
import { quantumCourse } from './quantum-data';
import { mathCourse } from './math-data';
export type MCQ = {
  question: string;
  options: string[];
  answerIndex: number; // 0-indexed
  hint?: string;
};

export type SimulationStep = {
  line: number;
  annotation: string;
  memory: { variable: string; type: string; value: string; address?: string }[];
  output: string;
};

export type SimulationData = {
  code: string;
  steps: SimulationStep[];
};

export type ExperimentContent = {
  aim?: { text: string; bullets?: string[] };
  theory?: { title: string; body: string[] }[];
  pretest?: MCQ[];
  procedure?: string[];
  simulation?: SimulationData | string;
  posttest?: MCQ[];
  references?: string[];
};

export type Experiment = {
  id: string;
  title: string;
  desc: string;
  expected?: string;
  code?: string;
  content?: ExperimentContent;
};


export type Week = {
  title: string;
  objective: string;
  tutorial: string;
  labTitle: string;
  experiments: Experiment[];
};

export type Course = {
  id: string;
  title: string;
  objectives: string | string[];
  introduction?: string[];
  shortNotes?: string;
  targetAudience?: {
    primary: string;
    prerequisites: string[];
    usefulFor: string[];
  };
  alignment?: {
    university: string;
    department: string;
    course: string;
    credits: string;
    yearSem: string;
    branches: string;
    totalExperiments: string;
    compiler: string;
    units: { unit: string; topics: string; weeks: string }[];
  };
  weeks: Week[];
};

export const courses: Record<string, Course> = {
  "quantum-computing": quantumCourse,
  "ai-tools": aiCourse,
  "data-structures-using-c-programming": dsCourse,
  "java": javaCourse,
  "iot": iotCourse,
  "llms": {
    id: "llms",
    title: "Large Language Models",
    objectives: [
      "To introduce students to the fundamentals of Large Language Models and Generative AI.",
      "To understand the Transformer architecture, tokenization, and embeddings.",
      "To develop effective prompt engineering skills for interacting with AI systems.",
      "To build practical applications using modern LLM APIs and frameworks.",
      "To explore Retrieval-Augmented Generation (RAG) and semantic search.",
      "To strengthen problem-solving and critical thinking using AI-assisted workflows.",
      "To prepare students for advanced studies in Artificial Intelligence, Data Science, and Agentic AI."
    ],
    introduction: [
      "Large Language Models (LLMs) have transformed the field of Artificial Intelligence by enabling machines to understand, generate, summarize, and reason over human language. Built upon the Transformer architecture, these foundation models power modern AI systems such as intelligent chatbots, virtual assistants, code generators, document analyzers, and autonomous AI agents.",
      "The LLM Laboratory is designed to provide students with practical exposure to the concepts and applications of Generative AI. Through a series of hands-on experiments, learners explore tokenization, embeddings, prompt engineering, API integration, Retrieval-Augmented Generation (RAG), and the development of AI-powered applications.",
      "Rather than focusing solely on theory, this course emphasizes experiential learning, allowing students to interact with state-of-the-art models and build intelligent systems that solve real-world problems. The laboratory serves as a gateway to advanced domains such as Agentic AI, Multimodal AI, AI Assistants, and Enterprise AI Solutions."
    ],
    shortNotes: llmsShortNotes,
    targetAudience: {
      primary: "Undergraduate and postgraduate engineering students, Computer Science, Artificial Intelligence, and Data Science learners.",
      prerequisites: [
        "Basic knowledge of Python programming",
        "Fundamental machine learning concepts"
      ],
      usefulFor: [
        "Researchers and faculty interested in Generative AI",
        "Software developers and technology enthusiasts seeking practical exposure to LLMs",
        "Anyone interested in building AI-powered applications without extensive prior experience"
      ]
    },
    alignment: {
      university: "Virtual Lab",
      department: "Artificial Intelligence & Generative AI",
      course: "Large Language Models Laboratory",
      credits: "L:0 T:0 P:2 C:1",
      yearSem: "Elective",
      branches: "Computer Science, AI & DS",
      totalExperiments: "15",
      compiler: "Python, Google Colab, Jupyter Notebook",
      units: [
        { unit: "Module 1", topics: "Foundations of LLMs", weeks: "Week 1" },
        { unit: "Module 2", topics: "Prompt Engineering", weeks: "Week 2" },
        { unit: "Module 3", topics: "Building AI Applications", weeks: "Week 3" },
        { unit: "Module 4", topics: "Advanced LLM Systems", weeks: "Week 4" }
      ]
    },
    weeks: [
      {
        title: "Module 1",
        objective: "Foundations of LLMs",
        tutorial: "Lab 1: Understanding Language Models",
        labTitle: "Lab 1: Understanding Language Models",
        experiments: [
          { 
            id: "llms-w1-2", 
            title: "Tokenization and Text Encoding (Byte-Pair Encoding)", 
            desc: "Tokenization and Text Encoding (Byte-Pair Encoding)", 
            code: `import re\nfrom collections import defaultdict\n\ndef get_stats(vocab):\n    pairs = defaultdict(int)\n    for word, freq in vocab.items():\n        symbols = word.split()\n        for i in range(len(symbols)-1):\n            pairs[symbols[i], symbols[i+1]] += freq\n    return pairs\n\ndef merge_vocab(pair, v_in):\n    v_out = {}\n    bigram = re.escape(' '.join(pair))\n    p = re.compile(r'(?<!\\S)' + bigram + r'(?!\\S)')\n    for word in v_in:\n        w_out = p.sub(''.join(pair), word)\n        v_out[w_out] = v_in[word]\n    return v_out\n\n# Example Run\ninitial_vocab = {'l o w </w>': 5, 'l o w e r </w>': 2, 'n e w e s t </w>': 6}\npairs = get_stats(initial_vocab)\nbest_pair = max(pairs, key=pairs.get)\nprint(f"Most frequent pair to merge: {best_pair}")`,
            content: {
              aim: {
                text: "To implement a Byte-Pair Encoding tokenization pipeline from first principles by iteratively merging the most frequent character pairs in a corpus, building a subword vocabulary that efficiently balances coverage and compression across diverse text inputs.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "The Two Old Problems",
                                        "body": [
                                                      "Computers used to read text in two ways \u2014 both had big problems:",
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Approach</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What It Does</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">The Problem</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Whole-Word</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Looks up each word in a giant dictionary</td><td class=\"p-3 text-muted-foreground\">New words / typos = total failure (OOV error)</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Letter-by-Letter</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Reads one character at a time</td><td class=\"p-3 text-muted-foreground\">Sentences become too long \u2014 computer forgets the start by the end</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "BPE \u2014 The Goldilocks Fix",
                                        "body": [
                                                      "BPE starts with letters, then keeps merging the most popular pairs into new symbols \u2014 like inventing shorthand for common combinations.",
                                                      "Start: u n p r e d i c t a b l e  \u2192  Find most frequent pair  \u2192  Merge it into one new symbol  \u2192  Repeat thousands of times  \u2192  Result: un + predict + able",
                                                      "Why BPE wins:",
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">BPE Behaviour</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Common words</td><td class=\"p-3 text-muted-foreground\">Single token \u2014 'the' = 1 piece</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Rare / new words</td><td class=\"p-3 text-muted-foreground\">Split into chunks \u2014 'un' + 'predict' + 'able'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Unknown words</td><td class=\"p-3 text-muted-foreground\">Never crashes \u2014 always finds pieces</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">GPT-4 upgrade</td><td class=\"p-3 text-muted-foreground\">Starts from 256 bytes \u2014 works for ALL languages</td></tr></tbody></table>",
                                                      "![BPE Tokenization](/llmexp1.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is tokenization in NLP?", options: ["Encrypting text", "Breaking text into smaller units", "Translating text", "Compressing files"], answerIndex: 1 },
                            { question: "BPE stands for:", options: ["Binary Pair Encoding", "Byte-Pair Encoding", "Basic Phrase Extraction", "Block Processing Engine"], answerIndex: 1 },
                            { question: "What is the smallest unit produced by tokenization called?", options: ["Sentence", "Paragraph", "Token", "Document"], answerIndex: 2 },
                            { question: "Which of these is an example of a token?", options: ["An entire book", "A word or subword unit", "A whole paragraph", "A file extension"], answerIndex: 1 },
                            { question: "Why do we tokenize text before feeding it to a model?", options: ["Models can only process numerical/structured input, not raw text", "To make the text longer", "To translate the text", "To delete unwanted words"], answerIndex: 0 },
                            { question: "What does \"encoding\" mean in the context of text processing?", options: ["Converting tokens into numerical representations", "Deleting tokens", "Compressing images", "Encrypting passwords"], answerIndex: 0 },
                            { question: "Which is a common tokenization approach?", options: ["Word-level tokenization", "Pixel-level tokenization", "Audio-level tokenization", "File-level tokenization"], answerIndex: 0 },
                            { question: "What problem can word-level tokenization face with rare words?", options: ["Out-of-vocabulary (OOV) issues", "Too much memory savings", "Faster training", "No issues at all"], answerIndex: 0 },
                            { question: "What is a \"vocabulary\" in tokenization?", options: ["The set of all unique tokens a model recognizes", "A dictionary of synonyms", "A grammar rulebook", "A type of neural network"], answerIndex: 0 },
                            { question: "Character-level tokenization breaks text into:", options: ["Individual characters", "Whole sentences", "Whole documents", "Random chunks"], answerIndex: 0 },
                            { question: "What is a key advantage of subword tokenization over word-level tokenization?", options: ["It can represent rare or unseen words using known subword units", "It removes all punctuation", "It only works for numbers", "It eliminates the need for a vocabulary"], answerIndex: 0 },
                            { question: "In BPE, what does the algorithm initially treat as the base units?", options: ["Individual characters", "Whole words only", "Sentences", "Paragraphs"], answerIndex: 0 },
                            { question: "BPE was originally developed for:", options: ["Data compression", "Image processing", "Audio encoding", "Video streaming"], answerIndex: 0 },
                            { question: "What does BPE do iteratively during training?", options: ["Merges the most frequent pair of adjacent symbols", "Deletes the least frequent words", "Randomly shuffles characters", "Translates text to another language"], answerIndex: 0 },
                            { question: "Which of the following models commonly uses BPE or similar subword tokenization?", options: ["GPT", "A spreadsheet calculator", "A database engine", "An image viewer"], answerIndex: 0 },
                            { question: "What happens to tokenization vocabulary size as more BPE merges are performed?", options: ["It generally increases up to a set limit", "It decreases to zero", "It stays exactly the same", "It becomes infinite"], answerIndex: 0 },
                            { question: "Why is tokenization considered a crucial preprocessing step for LLMs?", options: ["It directly affects how well the model understands input text", "It has no effect on model performance", "It only matters for image models", "It removes the need for training"], answerIndex: 0 },
                            { question: "What type of text encoding converts tokens to unique integer IDs?", options: ["Numerical/integer encoding", "Audio encoding", "Color encoding", "Binary image encoding"], answerIndex: 0 },
                            { question: "Which statement about tokenization is true?", options: ["Different tokenizers can split the same text differently", "All tokenizers always produce identical results", "Tokenization is unnecessary for LLMs", "Tokenization only works on numbers"], answerIndex: 0 },
                            { question: "What does \"detokenization\" mean?", options: ["Converting tokens back into readable text", "Deleting all tokens", "Compressing tokens into images", "Encrypting tokens"], answerIndex: 0 },
                          ],
              procedure: [
                "Corpus Preparation: Ingest a raw text corpus and append distinct end-of-word tokens (like </w>) to distinguish between word-internal boundaries and word-external boundaries.",
                "Atomic Splitting: Break down the entire text corpus into an initial sequence of raw characters (or bytes), establishing the foundational baseline vocabulary.",
                "Frequency Analysis Loop: Scan the entire sequence sequentially, calculating the co-occurrence frequency of every single adjacent pair of tokens.",
                "Merge Operation: Identify the specific token pair that appears most frequently. Merge them into a single, unified token, and append this new token to the vocabulary table.",
                "Sequence Update: Replace all instances of the identified pair in the original training corpus with the newly created merged token.",
                "Iterative Thresholding: Repeat the frequency analysis and merge operations in a loop until a strictly defined maximum vocabulary size (e.g., 50,000 tokens) is reached."
              ],
              posttest: [
                            { question: "In Byte-Pair Encoding, merge decisions are based on:", options: ["Frequency of adjacent symbol pairs in the training corpus", "Random selection", "Alphabetical order", "Length of the word"], answerIndex: 0 },
                            { question: "What is the main problem BPE solves regarding vocabulary?", options: ["Balancing vocabulary size with the ability to handle rare/unseen words", "Eliminating the need for any vocabulary", "Making vocabulary infinite", "Removing punctuation entirely"], answerIndex: 0 },
                            { question: "In BPE, a word that doesn't exist in the trained vocabulary is typically handled by:", options: ["Breaking it into known subword units or characters", "Discarding it entirely", "Replacing it with a random word", "Crashing the tokenizer"], answerIndex: 0 },
                            { question: "Which of the following is a known limitation of word-level tokenization that BPE addresses?", options: ["Large vocabulary size and inability to handle unseen words", "Too few tokens generated", "Inability to handle short words", "Excessive use of subwords"], answerIndex: 0 },
                            { question: "How does BPE typically initialize its vocabulary before merging begins?", options: ["As individual characters plus an end-of-word marker", "As complete sentences", "As randomly generated symbols", "As whole paragraphs"], answerIndex: 0 },
                            { question: "If \"low\", \"lower\", and \"lowest\" share a common subword after BPE, this demonstrates:", options: ["BPE's ability to capture morphological similarity between related words", "A tokenization error", "Random merging with no pattern", "Complete failure of the algorithm"], answerIndex: 0 },
                            { question: "What is a trade-off when choosing a very large vocabulary size in BPE?", options: ["Larger embedding tables and increased memory/computation cost", "Always faster training with no downsides", "Smaller model size", "No effect on the model at all"], answerIndex: 0 },
                            { question: "What is a trade-off when choosing a very small vocabulary size in BPE?", options: ["Longer token sequences since words get split into more pieces", "Always better semantic understanding", "Reduced memory usage with no downsides", "Elimination of the need for embeddings"], answerIndex: 0 },
                            { question: "Which tokenization-related algorithm is closely related to BPE and used in models like BERT?", options: ["WordPiece", "JPEG compression", "RSA encryption", "FFT (Fast Fourier Transform)"], answerIndex: 0 },
                            { question: "Why might two different LLMs produce different token counts for the same sentence?", options: ["They may use different tokenizers/vocabularies trained on different data", "All LLMs use identical tokenizers", "Token count is unrelated to the tokenizer used", "Sentences always have a fixed token count"], answerIndex: 0 },
                            { question: "In practice, why does tokenization affect the cost of using an LLM API?", options: ["Many APIs charge based on the number of tokens processed/generated", "Tokenization has no relation to API cost", "APIs charge per character only, never per token", "Tokenization determines the model's accuracy only, not cost"], answerIndex: 0 },
                            { question: "What does it mean if a BPE tokenizer has a \"merge rule\" like (\"e\", \"s\") \u2192 \"es\"?", options: ["Whenever \"e\" and \"s\" appear adjacently as the most frequent pair, they are combined into \"es\"", "The letters \"e\" and \"s\" are deleted from the vocabulary", "All words containing \"es\" are removed", "\"es\" becomes a stop word"], answerIndex: 0 },
                            { question: "Which scenario best illustrates an out-of-vocabulary (OOV) problem that subword tokenization helps mitigate?", options: ["A newly coined word not seen during training can still be encoded using known subwords", "A common word appearing thousands of times in training", "A single-character token", "A blank input string"], answerIndex: 0 },
                            { question: "Why is tokenization considered language-dependent in its effectiveness?", options: ["Different languages have different morphological structures, affecting how well subword tokenization performs", "Tokenization works identically for every language with no variation", "Tokenization only applies to English", "Language has no impact on tokenization"], answerIndex: 0 },
                            { question: "What is the relationship between tokenization and context window/sequence length limits in LLMs?", options: ["Context limits are measured in tokens, so tokenization directly determines how much text fits", "Context limits are measured in characters only", "Tokenization has no relation to context limits", "Context limits are unrelated to text length"], answerIndex: 0 },
                            { question: "Which of these would likely produce the MOST tokens for the same input text?", options: ["A character-level tokenizer", "A well-trained BPE tokenizer with a large vocabulary", "A whole-word tokenizer with no splitting", "A sentence-level tokenizer"], answerIndex: 0 },
                            { question: "In SentencePiece (a tokenization library), what is a notable feature compared to traditional BPE?", options: ["It can operate directly on raw text without requiring pre-tokenization into words", "It only works on images", "It removes the need for any vocabulary", "It cannot handle subwords"], answerIndex: 0 },
                            { question: "Why might special tokens (like <|endoftext|> or [PAD]) be added to a tokenizer's vocabulary?", options: ["To mark sequence boundaries, padding, or special model functions", "To increase random noise in training", "They serve no functional purpose", "To replace all punctuation"], answerIndex: 0 },
                            { question: "What is the effect of using a pretrained tokenizer on a domain very different from its training data (e.g., medical text vs. general text)?", options: ["It may produce inefficient or excessive subword splits for domain-specific terms", "It will always perform perfectly regardless of domain", "It cannot process the text at all", "It automatically retrains itself"], answerIndex: 0 },
                            { question: "Which best describes the overall goal of Byte-Pair Encoding in modern LLMs?", options: ["To create an efficient, fixed-size vocabulary that balances handling rare words with manageable sequence lengths", "To eliminate all numerical representations of text", "To make every word a single unique token regardless of frequency", "To remove the need for a vocabulary entirely"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w1-3", 
            title: "Word Embeddings and Vector Representations", 
            desc: "Word Embeddings and Vector Representations", 
            code: `import numpy as np\n\ndef cosine_similarity(v1, v2):\n    dot_prod = np.dot(v1, v2)\n    norm_v1 = np.linalg.norm(v1)\n    norm_v2 = np.linalg.norm(v2)\n    return dot_prod / (norm_v1 * norm_v2)\n\n# Simulated low-dimensional dummy representations\nembeddings = {\n    "king":  np.array([0.90, 0.10, 0.05]),\n    "man":   np.array([0.85, 0.05, 0.02]),\n    "woman": np.array([0.15, 0.80, 0.01]),\n    "queen": np.array([0.20, 0.92, 0.04])\n}\n\n# Linear translation math\ntarget_vector = embeddings["king"] - embeddings["man"] + embeddings["woman"]\nscore = cosine_similarity(target_vector, embeddings["queen"])\n\nprint(f"Cosine Similarity to 'queen': {score:.4f}")`,
            content: {
              aim: {
                text: "To generate dense vector representations of words and sentences using pre-trained embedding models, visualize their positions in high-dimensional semantic space, and quantify the conceptual similarity between text pairs using Cosine Similarity as the core distance metric.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "From IDs to a Map",
                                        "body": [
                                                      "Old method gave every word a unique number \u2014 but Cat=1 and Dog=2 tells the computer nothing about their relationship. Embeddings fix this by placing every word on a giant invisible map. Words used in similar sentences end up near each other.",
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Method</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Knows Cat \u2248 Dog?</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Can do King \u2212 Man + Woman = Queen?</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">One-Hot ID</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">No</td><td class=\"p-3 text-muted-foreground\">No</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Word Embeddings</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Yes \u2014 they are close on the map</td><td class=\"p-3 text-muted-foreground\">Yes \u2014 directions carry meaning</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "Cosine Similarity \u2014 the Angle Trick",
                                        "body": [
                                                      "We measure closeness by the angle between two word-arrows, not their length.",
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Angle</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Score</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Meaning</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">0\u00b0</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">1.0</td><td class=\"p-3 text-muted-foreground\">Same meaning</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">90\u00b0</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">0.0</td><td class=\"p-3 text-muted-foreground\">Unrelated</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">180\u00b0</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">-1.0</td><td class=\"p-3 text-muted-foreground\">Opposite meaning</td></tr></tbody></table>",
                                                      "![Word Embeddings](/vector_space_sim.webp)"
                                        ]
                          }
            ],
              simulation: "/vector_space_sim.html",
              pretest: [
                            { question: "What is a word embedding?", options: ["A numerical vector representation of a word", "An image of a word", "A type of font", "A grammar rule"], answerIndex: 0 },
                            { question: "Why are word embeddings used in NLP?", options: ["To represent words in a way machines can process mathematically", "To make text look colorful", "To delete unnecessary words", "To translate text instantly"], answerIndex: 0 },
                            { question: "Which of these is a popular word embedding technique?", options: ["Word2Vec", "JPEG", "HTML", "SQL"], answerIndex: 0 },
                            { question: "In vector space, similar words are typically:", options: ["Far apart", "Close together", "Always identical", "Represented by zero"], answerIndex: 1 },
                            { question: "What does \"dimension\" mean in a word embedding vector?", options: ["One of the numerical values that make up the vector", "The font size of the word", "The number of letters in the word", "The color of the word"], answerIndex: 0 },
                            { question: "Which of the following best describes \"semantic similarity\"?", options: ["Words with similar meanings having similar vector representations", "Words with the same number of letters", "Words that rhyme", "Words starting with the same letter"], answerIndex: 0 },
                            { question: "What type of learning is typically used to train word embeddings like Word2Vec?", options: ["Unsupervised/self-supervised learning from text data", "Manual labeling of every word", "Random number generation", "Image classification"], answerIndex: 0 },
                            { question: "Which of these is NOT a word embedding technique?", options: ["GloVe", "Word2Vec", "FastText", "Photoshop"], answerIndex: 3 },
                            { question: "A one-hot encoding represents a word as:", options: ["A vector with a single 1 and the rest 0s", "A sentence", "An image", "A sound wave"], answerIndex: 0 },
                            { question: "What is a major limitation of one-hot encoding compared to embeddings?", options: ["It does not capture semantic relationships between words", "It uses very little memory", "It always captures meaning perfectly", "It compresses text automatically"], answerIndex: 0 },
                            { question: "Word embeddings are typically represented in how many dimensions?", options: ["Tens to hundreds of dimensions", "Exactly 1 dimension", "Exactly 2 dimensions", "Infinite dimensions"], answerIndex: 0 },
                            { question: "What does it mean if two word vectors have a high cosine similarity?", options: ["The words are semantically similar", "The words are spelled the same", "The words are antonyms", "The words have no relationship"], answerIndex: 0 },
                            { question: "Which famous example shows vector arithmetic capturing relationships?", options: ["king - man + woman \u2248 queen", "cat + dog = bird", "red + blue = green", "sun - moon = star"], answerIndex: 0 },
                            { question: "What kind of data is typically used to train word embeddings?", options: ["Large text corpora", "Image datasets", "Audio recordings", "Spreadsheets"], answerIndex: 0 },
                            { question: "Pretrained embeddings (like GloVe) are useful because:", options: ["They save time by providing ready-made vector representations", "They eliminate the need for any model", "They only work for one specific sentence", "They require no training data at all"], answerIndex: 0 },
                            { question: "What does \"context window\" mean in word embedding training (e.g., Word2Vec)?", options: ["The set of neighboring words considered when learning a word's representation", "The size of the screen display", "The number of total documents", "The font window in a text editor"], answerIndex: 0 },
                            { question: "Which Word2Vec architecture predicts a target word from its surrounding context?", options: ["CBOW (Continuous Bag of Words)", "Skip-gram", "Decision Tree", "Random Forest"], answerIndex: 0 },
                            { question: "Which Word2Vec architecture predicts surrounding context words from a target word?", options: ["Skip-gram", "CBOW", "Linear Regression", "K-Means"], answerIndex: 0 },
                            { question: "Why might embeddings be visualized using techniques like t-SNE or PCA?", options: ["To reduce dimensions and visualize word relationships in 2D/3D", "To increase the number of dimensions", "To delete unwanted words", "To compress images"], answerIndex: 0 },
                            { question: "What is a \"vector space model\" in NLP?", options: ["A mathematical model representing words/text as vectors in a multi-dimensional space", "A model for compressing audio", "A grammar correction tool", "A type of image filter"], answerIndex: 0 },
                          ],
              procedure: [
                "Matrix Initialization: Load a pre-trained embedding model or instantiate a random NumPy matrix to simulate multi-dimensional vector weights.",
                "Vector Mapping: Convert an array of input tokens into their corresponding high-dimensional floating-point tensors.",
                "L2 Normalization: Execute mathematical matrix operations to normalize all vectors to a unit length of 1, standardizing downstream distance calculations.",
                "Dot Product Execution: Compute the geometric dot product of a specific target vector against the entire normalized dataset array.",
                "Similarity Ranking: Isolate the highest resulting scalar values to rank the top-K closest semantic neighbors.",
                "Visual Compression: Apply a dimensionality reduction algorithm like PCA or t-SNE to squash the 1536 dimensions down to a 2D plane for visual graph rendering."
              ],
              posttest: [
                            { question: "Why do embeddings generally outperform one-hot encoding in capturing word meaning?", options: ["Embeddings encode semantic relationships in a dense, lower-dimensional space, unlike sparse one-hot vectors", "One-hot encoding always uses fewer dimensions", "Embeddings cannot represent any relationships", "One-hot encoding captures more semantic detail"], answerIndex: 0 },
                            { question: "In Word2Vec's Skip-gram model, the training objective is to:", options: ["Predict context words given a center word", "Predict the entire sentence given one word", "Classify images based on text", "Predict the next image frame"], answerIndex: 0 },
                            { question: "Which factor most directly affects the quality of learned word embeddings?", options: ["The size and quality of the training corpus", "The color scheme of the text editor", "The font used in training documents", "The number of vowels in each word"], answerIndex: 0 },
                            { question: "What does the analogy \"Paris - France + Italy \u2248 Rome\" demonstrate about embeddings?", options: ["Embeddings can capture relational/analogical structure between concepts", "Embeddings only work for capital cities", "This is a coincidence with no underlying pattern", "Embeddings cannot represent geography"], answerIndex: 0 },
                            { question: "Why might static word embeddings (like Word2Vec) struggle with polysemy (words with multiple meanings)?", options: ["They assign a single fixed vector per word regardless of context", "They generate infinite vectors per word", "They only work with one meaning by design intentionally and accurately", "Polysemy does not exist in real language"], answerIndex: 0 },
                            { question: "How do contextual embeddings (e.g., from BERT) differ from static embeddings (e.g., Word2Vec)?", options: ["Contextual embeddings generate different vectors for the same word depending on surrounding context", "Contextual embeddings always produce identical vectors regardless of context", "Static embeddings change vectors based on sentence meaning", "There is no difference between them"], answerIndex: 0 },
                            { question: "What does negative sampling in Word2Vec training help achieve?", options: ["Efficient training by updating only a small number of \"negative\" word pairs instead of the full vocabulary", "Increasing vocabulary size infinitely", "Removing the need for any training data", "Deleting frequent words from the corpus"], answerIndex: 0 },
                            { question: "In GloVe (Global Vectors), embeddings are learned based primarily on:", options: ["Global word co-occurrence statistics across the entire corpus", "Random initialization with no training", "Only the first sentence of a document", "Manual human labeling"], answerIndex: 0 },
                            { question: "What is a common evaluation method for word embedding quality?", options: ["Word analogy and similarity benchmark tasks", "Counting the number of letters in each word", "Measuring font size consistency", "Checking spelling accuracy only"], answerIndex: 0 },
                            { question: "Why is dimensionality reduction (e.g., PCA, t-SNE) often applied to embeddings before visualization?", options: ["Embeddings typically have too many dimensions to plot directly, so reduction maps them to 2D/3D", "It increases the number of dimensions for better plotting", "It removes all numerical values from the vectors", "It is required to train the embeddings initially"], answerIndex: 0 },
                            { question: "What potential issue can arise if word embeddings are trained on biased text data?", options: ["The embeddings can encode and reflect societal biases present in the data", "Embeddings automatically remove all bias", "Bias only affects image models, not text", "Embeddings are immune to training data characteristics"], answerIndex: 0 },
                            { question: "Subword-based embeddings (like FastText) offer an advantage over Word2Vec because they:", options: ["Can generate embeddings for out-of-vocabulary words using subword information", "Cannot handle misspelled words at all", "Require significantly more labeled data", "Eliminate the concept of vectors entirely"], answerIndex: 0 },
                            { question: "In the context of embeddings, what does \"cosine similarity\" actually measure?", options: ["The cosine of the angle between two vectors, indicating directional similarity", "The literal length difference between two vectors", "The number of shared letters between two words", "The frequency of a word in a document"], answerIndex: 0 },
                            { question: "Why might embedding dimensionality (e.g., 100 vs. 300) be treated as a hyperparameter to tune?", options: ["Higher dimensions can capture more nuance but increase computation and risk of overfitting", "Dimensionality has no effect on model performance", "All embeddings must use exactly 50 dimensions", "Dimensionality only affects training speed, never quality"], answerIndex: 0 },
                            { question: "How are word embeddings typically integrated into a downstream LLM or neural network?", options: ["As an initial embedding layer that converts token IDs into dense vectors", "As the final output layer only", "They are not used in neural networks at all", "Only as a visualization tool, never as model input"], answerIndex: 0 },
                            { question: "What does it mean if two unrelated words accidentally have high cosine similarity in a trained embedding space?", options: ["It may indicate noise, insufficient training data, or co-occurrence patterns not reflecting true semantic similarity", "The embedding model has failed completely and is unusable", "This always indicates a bug in the code", "This is expected and desired behavior for all word pairs"], answerIndex: 0 },
                            { question: "Why can embeddings trained on one domain (e.g., news articles) underperform when applied to another domain (e.g., medical text)?", options: ["Word usage and context differ across domains, so learned relationships may not transfer well", "Embeddings are universal and domain-independent by design", "Domain has no effect on embedding quality", "Medical text contains no words"], answerIndex: 0 },
                            { question: "What role does the \"context window size\" hyperparameter play in Word2Vec training?", options: ["It determines how many neighboring words are considered when learning relationships, affecting captured semantic vs. syntactic patterns", "It sets the total vocabulary size", "It has no impact on the resulting embeddings", "It only affects training speed, not quality"], answerIndex: 0 },
                            { question: "Why might embeddings of antonyms (e.g., \"hot\" and \"cold\") sometimes be close together in vector space?", options: ["They often appear in similar contexts despite opposite meanings, since co-occurrence-based training captures contextual similarity, not strict meaning", "Antonyms are mathematically identical", "This never happens in practice", "Embeddings always separate antonyms perfectly"], answerIndex: 0 },
                            { question: "Which statement best summarizes the core purpose of word embeddings in modern NLP/LLM pipelines?", options: ["To convert discrete text tokens into continuous numerical vectors that capture semantic and syntactic relationships for downstream processing", "To compress images for faster loading", "To replace the need for any tokenization", "To generate audio from text"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w1-4", 
            title: "Exploring the Transformer Architecture", 
            desc: "Exploring the Transformer Architecture", 
            code: `import numpy as np\n\ndef get_positional_encoding(seq_len, d_model):\n    # Initialize the encoding matrix\n    pe = np.zeros((seq_len, d_model))\n    \n    # Compute the positional values\n    position = np.arange(seq_len)[:, np.newaxis]\n    div_term = np.exp(np.arange(0, d_model, 2) * -(np.log(10000.0) / d_model))\n    \n    # Assign alternating sine and cosine functions\n    pe[:, 0::2] = np.sin(position * div_term)\n    pe[:, 1::2] = np.cos(position * div_term)\n    \n    return pe\n\n# Run Verification\npe_matrix = get_positional_encoding(seq_len=10, d_model=64)\nprint(f"Generated Positional Matrix Shape: {pe_matrix.shape}")`,
            content: {
              aim: {
                text: "To dissect and map the full structural anatomy of the original Encoder-Decoder Transformer architecture, and implement its Positional Encoding layer from scratch using alternating sine and cosine wave functions to understand how sequence order is preserved without recurrence.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "The Old Way (RNN) vs The New Way (Transformer)",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">RNN / LSTM</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Transformer</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Reads text</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">One word at a time</td><td class=\"p-3 text-muted-foreground\">All words simultaneously</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Speed</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Slow \u2014 sequential</td><td class=\"p-3 text-muted-foreground\">Fast \u2014 fully parallel</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Memory</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Forgets early words in long text</td><td class=\"p-3 text-muted-foreground\">Every word can see every other word</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">GPU friendly?</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">No</td><td class=\"p-3 text-muted-foreground\">Yes</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "The Ordering Problem & Positional Encoding",
                                        "body": [
                                                      "Reading everything at once loses word order \u2014 'Dog bites man' and 'Man bites dog' look identical. Fix: stamp each word with a unique wave signature before processing.",
                                                      "Tokens in  \u2192  Add wave stamp (PE)  \u2192  Now each word has a seat number  \u2192  Encoder reads all at once  \u2192  Meaning preserved \u2713"
                                        ]
                          },
                          {
                                        "title": "Encoder vs Decoder \u2014 Quick Map",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Part</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Job</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Example</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Encoder</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Reads & understands input</td><td class=\"p-3 text-muted-foreground\">Reading English</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Decoder</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Generates output word by word</td><td class=\"p-3 text-muted-foreground\">Writing French</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Both together</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Full translation / summarisation</td><td class=\"p-3 text-muted-foreground\">GPT, T5, BERT</td></tr></tbody></table>",
                                                      "![Transformer Architecture](/llmexp3.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is the Transformer architecture primarily used for?", options: ["Processing sequential data like text", "Editing images", "Compressing audio files", "Managing databases"], answerIndex: 0 },
                            { question: "The Transformer was introduced in which research paper?", options: ["\"Attention Is All You Need\"", "\"Deep Learning Basics\"", "\"Word2Vec Explained\"", "\"Neural Networks 101\""], answerIndex: 0 },
                            { question: "What is the main building block of the Transformer model?", options: ["Self-Attention mechanism", "Convolution layer", "Decision tree", "Recurrent loop only"], answerIndex: 0 },
                            { question: "A Transformer model typically consists of which two main components?", options: ["Encoder and Decoder", "Compressor and Decompressor", "Sender and Receiver", "Reader and Writer"], answerIndex: 0 },
                            { question: "What is the role of the encoder in a Transformer?", options: ["To process and represent the input sequence", "To generate random numbers", "To delete tokens", "To compress images"], answerIndex: 0 },
                            { question: "What is the role of the decoder in a Transformer?", options: ["To generate the output sequence", "To tokenize input only", "To train word embeddings", "To remove attention layers"], answerIndex: 0 },
                            { question: "Why was the Transformer architecture considered a major advancement over RNNs?", options: ["It allows parallel processing of sequences", "It is slower than RNNs", "It cannot handle long sentences", "It removes the need for any training"], answerIndex: 0 },
                            { question: "What does \"positional encoding\" provide to a Transformer model?", options: ["Information about the order/position of tokens in a sequence", "The color of each token", "The frequency of each token in the corpus", "The font style of the text"], answerIndex: 0 },
                            { question: "Why is positional encoding necessary in Transformers?", options: ["Because Transformers process tokens in parallel and have no inherent sense of order", "Because Transformers process tokens one at a time like RNNs", "Because positional encoding improves image quality", "Because it removes the need for embeddings"], answerIndex: 0 },
                            { question: "What is a \"feed-forward network\" in the context of a Transformer layer?", options: ["A fully connected neural network applied after the attention mechanism", "A network used only for image processing", "A type of database query", "A network with no learnable parameters"], answerIndex: 0 },
                            { question: "Which famous LLM architectures are based on the Transformer?", options: ["GPT and BERT", "Excel and Word", "MySQL and PostgreSQL", "Photoshop and Illustrator"], answerIndex: 0 },
                            { question: "What does \"layer normalization\" help with in Transformers?", options: ["Stabilizing and speeding up training", "Compressing the vocabulary", "Translating text between languages", "Generating images"], answerIndex: 0 },
                            { question: "What is a \"residual connection\" (skip connection) in a Transformer?", options: ["A shortcut that adds the input of a layer to its output to help gradient flow", "A connection that deletes layers", "A type of tokenization method", "A way to compress text files"], answerIndex: 0 },
                            { question: "How many encoder/decoder layers does the original Transformer paper typically stack?", options: ["Multiple identical layers stacked on top of each other (e.g., 6)", "Exactly one layer", "Zero layers", "An unlimited, undefined number always"], answerIndex: 0 },
                            { question: "What type of model is BERT, based on the Transformer?", options: ["An encoder-only model", "A decoder-only model", "An image generation model", "A database model"], answerIndex: 0 },
                            { question: "What type of model is GPT, based on the Transformer?", options: ["A decoder-only model", "An encoder-only model", "A convolutional model", "A spreadsheet model"], answerIndex: 0 },
                            { question: "What does \"scalability\" mean in the context of Transformer models?", options: ["The ability to improve performance as model size and data increase", "The ability to shrink infinitely", "The ability to work without any data", "The ability to run only on one specific device"], answerIndex: 0 },
                            { question: "Why are Transformers well-suited for transfer learning?", options: ["Pretrained Transformer models can be fine-tuned on new tasks with relatively little data", "They cannot be reused for any other task", "They require retraining from scratch every time", "They only work for one specific language"], answerIndex: 0 },
                            { question: "What is the purpose of \"masking\" in the Transformer decoder during training?", options: ["To prevent the model from seeing future tokens when predicting the next one", "To hide all training data permanently", "To remove punctuation", "To compress the vocabulary"], answerIndex: 0 },
                            { question: "Which of the following best describes a Transformer block/layer?", options: ["A combination of self-attention and feed-forward sub-layers", "A single neuron with no connections", "A purely random function", "A database table"], answerIndex: 0 },
                          ],
              procedure: [
                "Sequence Initialization: Define the maximum expected sequence length and the specific dimensionality of the embedding model ($d_{model}$).",
                "Matrix Allocation: Instantiate an empty, zero-filled NumPy array with the dimensions (sequence_length, d_model).",
                "Frequency Array Generation: Calculate a logarithmic div_term array that acts as the frequency denominator across the different vector dimensions.",
                "Even-Index Injection: Apply a geometric sine function (np.sin) to all even-indexed columns in the empty positional matrix.",
                "Odd-Index Injection: Apply an alternating geometric cosine function (np.cos) to all odd-indexed columns to complete the wave pattern.",
                "Embedding Addition: Execute an element-wise addition, fusing this generated positional matrix directly into the raw semantic word embeddings before passing them into the Encoder layer."
              ],
              posttest: [
                            { question: "Why is positional encoding typically added (rather than concatenated) to input embeddings in Transformers?", options: ["To preserve the embedding dimensionality while injecting position information", "To double the size of every vector unnecessarily", "Addition has no effect on the resulting representation", "Concatenation is mathematically impossible with embeddings"], answerIndex: 0 },
                            { question: "What mathematical functions does the original Transformer paper use for positional encoding?", options: ["Sine and cosine functions at varying frequencies", "Only random numbers", "Logarithmic functions exclusively", "Polynomial regression"], answerIndex: 0 },
                            { question: "In a Transformer encoder layer, in what order are sub-layers typically applied?", options: ["Self-attention followed by a feed-forward network, each with residual connections and normalization", "Feed-forward network only, with no attention", "Normalization only, with no attention or feed-forward layers", "Attention is applied after the entire model finishes training"], answerIndex: 0 },
                            { question: "Why do Transformers use multiple stacked layers instead of just one?", options: ["Stacking layers allows the model to learn increasingly abstract and complex representations", "A single layer always performs better than multiple layers", "Stacking layers removes the need for attention", "Multiple layers are used only to slow down inference"], answerIndex: 0 },
                            { question: "What is the computational complexity of self-attention with respect to sequence length (n)?", options: ["O(n\u00b2), since each token attends to every other token", "O(1), constant regardless of sequence length", "O(log n)", "It decreases as sequence length increases"], answerIndex: 0 },
                            { question: "Why can long sequences be computationally expensive for standard Transformer models?", options: ["Self-attention's quadratic complexity with sequence length increases compute and memory needs", "Long sequences always reduce computation needs", "Transformers cannot process sequences longer than 10 tokens", "Sequence length has no effect on computation"], answerIndex: 0 },
                            { question: "What is the purpose of \"cross-attention\" in an encoder-decoder Transformer?", options: ["Allowing the decoder to attend to relevant parts of the encoder's output", "Allowing the encoder to attend to itself only", "Removing attention between encoder and decoder entirely", "Compressing the vocabulary during inference"], answerIndex: 0 },
                            { question: "In decoder-only models like GPT, what type of attention is primarily used?", options: ["Masked (causal) self-attention, restricting attention to previous tokens only", "Bidirectional attention with no restrictions", "No attention mechanism at all", "Attention only on the final token"], answerIndex: 0 },
                            { question: "Why does BERT use bidirectional attention while GPT uses unidirectional (causal) attention?", options: ["BERT is designed for understanding tasks using full context, while GPT is designed for autoregressive text generation", "BERT cannot process any context at all", "GPT is incapable of understanding context", "There is no architectural difference between BERT and GPT"], answerIndex: 0 },
                            { question: "What does \"layer normalization\" specifically normalize within a Transformer?", options: ["The activations across the feature dimension for each individual training example", "The entire dataset across all examples simultaneously", "Only the input text characters", "The vocabulary size"], answerIndex: 0 },
                            { question: "Why are residual (skip) connections particularly important in deep Transformer stacks?", options: ["They help mitigate the vanishing gradient problem, enabling effective training of deep networks", "They eliminate the need for any backpropagation", "They double the model's vocabulary size", "They have no effect on training stability"], answerIndex: 0 },
                            { question: "What advantage does parallelization during training give Transformers over RNNs?", options: ["All tokens in a sequence can be processed simultaneously rather than sequentially, speeding up training", "Parallelization is only possible with RNNs, not Transformers", "Transformers must process one token at a time like RNNs", "Parallelization has no effect on training speed"], answerIndex: 0 },
                            { question: "What is a known limitation of fixed-length positional encodings used in the original Transformer?", options: ["They may not generalize well to sequence lengths longer than those seen during training", "They work perfectly for any sequence length without limitation", "They eliminate the need for any attention mechanism", "They only function with image data"], answerIndex: 0 },
                            { question: "How does multi-head attention differ from single-head attention?", options: ["Multi-head attention runs several attention computations in parallel, each potentially capturing different relationships, then combines results", "Multi-head attention uses only one attention computation, just repeated", "Multi-head attention removes the need for Query, Key, and Value vectors", "Multi-head attention is identical to single-head attention in every way"], answerIndex: 0 },
                            { question: "Why might an encoder-decoder Transformer (like the original translation model) be more suitable for tasks like machine translation than a decoder-only model?", options: ["The encoder can fully process the entire source sentence with bidirectional context before generation begins", "Decoder-only models cannot generate any text", "Encoder-decoder models cannot process sequences at all", "There is no meaningful difference for translation tasks"], answerIndex: 0 },
                            { question: "What does \"model depth\" (number of stacked layers) generally trade off against in Transformer design?", options: ["Increased representational power versus higher computational cost and training difficulty", "Depth has no effect on either performance or cost", "Increasing depth always reduces computational cost", "Depth only affects vocabulary size"], answerIndex: 0 },
                            { question: "In the Transformer's feed-forward sub-layer, what is typically applied between the two linear transformations?", options: ["A non-linear activation function (e.g., ReLU or GELU)", "Another full attention mechanism", "A second tokenizer", "An image convolution"], answerIndex: 0 },
                            { question: "Why is the Transformer often described as more \"interpretable\" in some respects than RNNs, due to attention weights?", options: ["Attention weights can show which tokens the model focused on, offering some insight into its decisions", "Attention weights are always random and meaningless", "Transformers provide no information about internal decision-making", "RNNs are inherently more interpretable in every case"], answerIndex: 0 },
                            { question: "What is a key reason Transformers scale well with large datasets and model sizes (as seen in modern LLMs)?", options: ["Their parallelizable architecture and attention mechanism allow efficient training on massive data with increasing model capacity", "Transformers cannot be scaled beyond a fixed size", "Larger datasets always degrade Transformer performance", "Scaling has no relationship to architecture design"], answerIndex: 0 },
                            { question: "Which statement best captures why the Transformer replaced RNN/LSTM-based architectures as the dominant approach for LLMs?", options: ["Transformers combine effective long-range dependency modeling with efficient parallel training, leading to better scalability and performance", "Transformers cannot model long-range dependencies at all", "RNNs are always faster to train than Transformers", "There is no meaningful performance difference between RNNs and Transformers"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w1-5", 
            title: "Understanding Self-Attention", 
            desc: "Understanding Self-Attention", 
            code: `import numpy as np\n\ndef scaled_dot_product_attention(Q, K, V):\n    # Compute raw score alignments\n    matmul_qk = np.dot(Q, K.T)\n    \n    # Scale scores based on dimensionality\n    dk = Q.shape[-1]\n    scaled_attention_logits = matmul_qk / np.sqrt(dk)\n    \n    # Row-wise softmax normalization\n    exp_logits = np.exp(scaled_attention_logits - np.max(scaled_attention_logits, axis=-1, keepdims=True))\n    attention_weights = exp_logits / np.sum(exp_logits, axis=-1, keepdims=True)\n    \n    # Weighted calculation over Values\n    output = np.dot(attention_weights, V)\n    return output, attention_weights\n\n# Sample Execution Setup\nnp.random.seed(42)\nQ = np.random.randn(3, 4) # 3 tokens, dimension 4\nK = np.random.randn(3, 4)\nV = np.random.randn(3, 4)\n\noutput, weights = scaled_dot_product_attention(Q, K, V)\nprint("Attention Weights Matrix:\\n", np.round(weights, 4))`,
            content: {
              aim: {
                text: "To manually implement the complete Scaled Dot-Product Attention mechanism from first principles \u2014 computing Query, Key, and Value projections, applying scaled dot-product scoring, and using softmax normalization \u2014 to observe how each token dynamically routes and weights contextual information from every other token in the sequence.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "The Library Analogy \u2014 Q, K, V",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Vector</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Role</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Library Analogy</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Q \u2014 Query</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">What am I looking for?</td><td class=\"p-3 text-muted-foreground\">Your search question</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">K \u2014 Key</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">What do I offer to others?</td><td class=\"p-3 text-muted-foreground\">A book's title / label</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">V \u2014 Value</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">What is my actual content?</td><td class=\"p-3 text-muted-foreground\">The book's inner knowledge</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "The Formula \u2014 Step by Step",
                                        "body": [
                                                      "Attention(Q, K, V) = softmax( QK^T / sqrt(d_k) ) x V",
                                                      "Q \u00d7 K Score every word pair  \u2192  \u00f7 \u221ad_k Turn down the volume  \u2192  softmax() Convert to percentages  \u2192  \u00d7 V Blend values by score  \u2192  Context-rich output token"
                                        ]
                          },
                          {
                                        "title": "Why the Scaling \u00f7 \u221ad_k Matters",
                                        "body": [
                                                      "Without it, scores explode at high dimensions \u2192 softmax outputs near-zero gradients \u2192 the model stops learning. Dividing by \u221ad_k keeps scores in a healthy range.",
                                                      "![Self-Attention](/llmexp4.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is self-attention in the context of Transformers?", options: ["A mechanism that allows a model to focus on relationships between words in a sequence", "A method to compress images", "A way to delete unimportant words", "A type of database query"], answerIndex: 0 },
                            { question: "Self-attention computes relevance using which three vectors?", options: ["Query, Key, Value", "Input, Output, Hidden", "Encoder, Decoder, Token", "Weight, Bias, Gradient"], answerIndex: 0 },
                            { question: "What does the \"Query\" vector represent in self-attention?", options: ["What the current token is looking for in other tokens", "The final output of the model", "The total vocabulary size", "The position of a token in the sentence"], answerIndex: 0 },
                            { question: "What does the \"Key\" vector represent in self-attention?", options: ["A representation used to match against queries", "The final answer of the model", "A random number", "The length of the sentence"], answerIndex: 0 },
                            { question: "What does the \"Value\" vector represent in self-attention?", options: ["The actual information/content carried by a token", "The position index of a token", "The vocabulary size", "A type of tokenizer"], answerIndex: 0 },
                            { question: "What is the purpose of attention scores in self-attention?", options: ["To determine how much focus to give to each token relative to others", "To delete unimportant tokens permanently", "To compress the vocabulary", "To generate images"], answerIndex: 0 },
                            { question: "What mathematical function is commonly used to convert attention scores into probabilities?", options: ["Softmax", "Square root", "Logarithm", "Factorial"], answerIndex: 0 },
                            { question: "Why is self-attention called \"self\" attention?", options: ["Because each token attends to other tokens within the same sequence", "Because it only attends to itself and no other tokens", "Because it requires no input", "Because it is unrelated to the input sequence"], answerIndex: 0 },
                            { question: "What is \"multi-head attention\"?", options: ["Running multiple attention mechanisms in parallel to capture different relationships", "Running attention only once per sentence", "A method to delete attention layers", "A way to compress text files"], answerIndex: 0 },
                            { question: "In self-attention, what happens after attention scores are calculated?", options: ["They are used to create a weighted sum of value vectors", "They are immediately deleted", "They are converted into images", "They replace the original input text"], answerIndex: 0 },
                            { question: "Why is self-attention useful for understanding long-range dependencies in text?", options: ["It allows any token to directly relate to any other token, regardless of distance", "It only allows tokens to relate to their immediate neighbors", "It removes the need to consider word order", "It only works on short sentences"], answerIndex: 0 },
                            { question: "What does it mean if a word receives a high attention score from another word in a sentence?", options: ["The model considers that word highly relevant to understanding the other word", "The word is irrelevant", "The word will be deleted", "The word is a duplicate"], answerIndex: 0 },
                            { question: "In the sentence \"The cat sat because it was tired,\" what might self-attention help the model determine?", options: ["That \"it\" refers to \"the cat\"", "The total number of letters in the sentence", "The font size of each word", "The color of \"cat\""], answerIndex: 0 },
                            { question: "What is the benefit of self-attention over traditional recurrent (step-by-step) processing?", options: ["It enables parallel computation and easier modeling of long-range relationships", "It only works for very short sentences", "It removes the need for any training", "It eliminates the need for any input text"], answerIndex: 0 },
                            { question: "What does \"scaling\" refer to in scaled dot-product attention?", options: ["Dividing attention scores by the square root of the key vector's dimension for stability", "Increasing the size of the dataset", "Resizing input images", "Compressing the vocabulary"], answerIndex: 0 },
                            { question: "Why might attention weights be visualized as a heatmap?", options: ["To show which tokens the model focuses on relative to others", "To display the model's training time", "To show the file size of the model", "To represent audio frequencies"], answerIndex: 0 },
                            { question: "What is \"causal\" or \"masked\" self-attention typically used for?", options: ["Preventing a model from attending to future tokens during generation", "Allowing access to all future tokens", "Deleting past tokens from memory", "Compressing the vocabulary size"], answerIndex: 0 },
                            { question: "In self-attention, are Query, Key, and Value vectors typically the same or different from each other?", options: ["They are different learned projections of the same input embedding", "They are always identical vectors", "They are unrelated to the input at all", "They are randomly generated and never learned"], answerIndex: 0 },
                            { question: "What advantage does self-attention provide for handling ambiguous pronouns (like \"it\" or \"they\")?", options: ["It helps the model link pronouns to the correct earlier reference based on context", "It removes all pronouns from text", "It always assumes pronouns refer to the first word in a sentence", "It has no effect on pronoun resolution"], answerIndex: 0 },
                            { question: "Why is self-attention considered a foundational mechanism in modern LLMs?", options: ["It enables models to weigh and combine contextual information from across a sequence effectively", "It was only used in early rule-based systems", "It eliminates the need for any neural network", "It only applies to image classification tasks"], answerIndex: 0 },
                          ],
              procedure: [
                "Score Calculation: Compute the raw similarity score matrix by running a dot product between the Query matrix (Q) and the transpose of the Key matrix (K^T).",
                "Scaling Phase: Divide every component inside the raw score matrix by the scaling metric \\sqrt{d_k}.",
                "Probability Distribution: Apply a row-wise softmax mathematical routing operation to ensure all relevance weights add up to exactly 1.0.",
                "Context Synthesis: Multiply the computed attention weights directly against the Value matrix (V) to construct the final context-aware output states."
              ],
              posttest: [
                            { question: "In scaled dot-product attention, why is the dot product of Query and Key vectors divided by \u221ad_k?", options: ["To prevent excessively large values that could destabilize softmax gradients, especially with high-dimensional vectors", "To make the computation slower intentionally", "To eliminate the need for a Value vector", "To increase the vocabulary size"], answerIndex: 0 },
                            { question: "What does each \"head\" in multi-head attention learn to potentially capture?", options: ["Different types of relationships or patterns between tokens (e.g., syntactic vs. semantic)", "The exact same information as every other head", "Nothing meaningful; heads are purely decorative", "Only positional information, never semantic information"], answerIndex: 0 },
                            { question: "After computing outputs from multiple attention heads, how are they typically combined?", options: ["Concatenated and passed through a linear transformation", "Averaged with no further processing", "Discarded except for the first head", "Converted directly into the final output text"], answerIndex: 0 },
                            { question: "Why is masked self-attention essential in autoregressive language models like GPT during training?", options: ["It ensures the model only uses past and current tokens, preventing \"cheating\" by seeing future tokens", "It allows the model to see the entire sequence at once including future tokens", "It removes the need for any Query or Key vectors", "It has no impact on how the model learns to predict next tokens"], answerIndex: 0 },
                            { question: "What is a key computational drawback of self-attention as sequence length grows?", options: ["Its quadratic time and memory complexity (O(n\u00b2)) with respect to sequence length", "It becomes linear and increasingly efficient with longer sequences", "It requires no additional computation regardless of length", "Self-attention complexity is unrelated to sequence length"], answerIndex: 0 },
                            { question: "How does cross-attention differ from self-attention in an encoder-decoder model?", options: ["Cross-attention computes Queries from the decoder and Keys/Values from the encoder output, rather than all from the same sequence", "Cross-attention and self-attention are mathematically identical with no differences", "Cross-attention never uses Key or Value vectors", "Cross-attention only operates on a single token at a time"], answerIndex: 0 },
                            { question: "Why might certain attention heads specialize in capturing syntactic relationships (e.g., subject-verb agreement) while others capture semantic relationships?", options: ["Different heads can learn to focus on different aspects of token relationships during training, given the model has freedom to specialize", "All heads are forced to learn identical patterns by design", "Attention heads cannot specialize; they are mathematically constrained to be the same", "Specialization is impossible in neural networks"], answerIndex: 0 },
                            { question: "What does it mean if the attention distribution (after softmax) for a token is very \"peaked\" (concentrated on one other token)?", options: ["The model is assigning most of its focus to that one specific token when forming the representation", "The model is ignoring all tokens equally", "The attention mechanism has failed", "The token has no relationship with any other token"], answerIndex: 0 },
                            { question: "In self-attention, why are Query, Key, and Value derived from learned weight matrices rather than being fixed/static?", options: ["Learnable projections allow the model to adapt what aspects of a token's representation are emphasized for queries, keys, and values during training", "Fixed values would always produce better results", "Learnable weights have no impact on the resulting attention patterns", "Query, Key, and Value vectors are never actually learned; they are predefined constants"], answerIndex: 0 },
                            { question: "How does the use of attention allow Transformers to model dependencies that span very long distances in a sequence, unlike vanilla RNNs?", options: ["Every token can directly attend to every other token in a single layer, avoiding the gradual information decay seen in sequential RNN processing", "Attention only allows tokens to look at their immediate neighbor, just like RNNs", "Long-range dependencies are impossible to model with attention", "RNNs handle long-range dependencies better than attention by design"], answerIndex: 0 },
                            { question: "What role does positional information play in self-attention, given that the raw attention mechanism itself is permutation-invariant?", options: ["Positional encodings must be added to embeddings beforehand since attention alone has no inherent sense of token order", "Self-attention inherently understands word order without any additional input", "Position has no relevance to language understanding tasks", "Positional encoding is only used in image-based attention models"], answerIndex: 0 },
                            { question: "Why can interpreting attention weights as a complete explanation of model behavior be misleading?", options: ["High attention weight doesn't necessarily mean that token was the sole or primary cause of the model's output decision; other components also contribute", "Attention weights perfectly and completely explain all model decisions, with no caveats", "Attention weights are always equal to the gradient of the loss function", "Models never use any information other than attention weights"], answerIndex: 0 },
                            { question: "What is the purpose of an attention \"mask\" beyond causal masking, such as padding masks?", options: ["To prevent the model from attending to padding tokens added to make sequences uniform length in a batch", "To make all padding tokens have maximum attention weight", "Padding masks serve no functional purpose in batched training", "To force the model to attend only to padding tokens"], answerIndex: 0 },
                            { question: "Why might increasing the number of attention heads not always improve model performance indefinitely?", options: ["Beyond a certain point, additional heads may not capture meaningfully distinct patterns and increase computational cost without proportional benefit", "More heads always linearly improve performance with no diminishing returns", "The number of heads has no effect on computational cost", "Attention heads are unrelated to model capacity"], answerIndex: 0 },
                            { question: "In practice, how is the dimensionality of Query, Key, and Value vectors typically related to the model's overall hidden dimension when using multi-head attention?", options: ["The model's hidden dimension is typically split across multiple heads, so each head operates on a smaller sub-dimension", "Each head always uses the full hidden dimension with no splitting", "Query, Key, and Value dimensions are unrelated to the model's hidden dimension", "Multi-head attention uses only a single shared dimension of size 1"], answerIndex: 0 },
                            { question: "Why does self-attention's ability to weigh all tokens simultaneously make it particularly effective for tasks like coreference resolution (e.g., linking \"it\" to its referent)?", options: ["The model can directly compute relevance scores between the pronoun and all candidate referents in the sequence, regardless of their distance", "Self-attention can only consider the immediately preceding word", "Coreference resolution is impossible with attention-based models", "Self-attention ignores pronouns entirely during processing"], answerIndex: 0 },
                            { question: "What is a key difference between \"global\" self-attention (as in the original Transformer) and more efficient attention variants (e.g., sparse or local attention)?", options: ["Efficient variants restrict which tokens can attend to each other to reduce the O(n\u00b2) computational cost, trading some flexibility for efficiency", "Global and local attention are mathematically identical in every respect", "Sparse attention always increases computational cost compared to global attention", "Local attention allows every token to attend to every other token without restriction"], answerIndex: 0 },
                            { question: "How does the concept of \"attention as a weighted average of Value vectors\" help explain what the output of self-attention represents?", options: ["The output for each token is a context-aware blend of information from relevant tokens, weighted by their computed attention scores", "The output is simply a copy of the original input token with no transformation", "The output ignores all Value vectors and uses only Query vectors", "Attention output is always identical across all tokens regardless of weighting"], answerIndex: 0 },
                            { question: "Why might gradient-based attribution methods be used alongside raw attention weights when analyzing model decisions?", options: ["They can provide a complementary or more accurate view of which inputs causally influenced the output, since attention weights alone may not fully reflect importance", "Gradient methods are identical to attention weights in every case", "Attention weights alone are always sufficient and need no supplementary analysis", "Gradients have no relevance to understanding model behavior"], answerIndex: 0 },
                            { question: "Which statement best summarizes why self-attention is considered a flexible and powerful mechanism compared to fixed-window approaches (e.g., convolution) for sequence modeling?", options: ["Self-attention dynamically determines which tokens are relevant to each other regardless of their position, rather than relying on a fixed local window", "Self-attention can only consider a fixed number of nearby tokens, similar to convolution", "Fixed-window approaches always outperform self-attention on all tasks", "Self-attention and convolution are mathematically identical operations"], answerIndex: 0 },
                          ]
            }
          }
        ]
      },
      {
        title: "Module 2",
        objective: "Prompt Engineering",
        tutorial: "Lab 2: Interacting with LLMs",
        labTitle: "Lab 2: Interacting with LLMs",
        experiments: [
          { 
            id: "llms-w2-1", 
            title: "Zero-Shot Prompting", 
            desc: "Zero-Shot Prompting", 
            code: `import os\n\n# Assuming standard API pattern wrapper\ndef generate_zero_shot_sentiment(review_text):\n    system_instruction = "You are a precise classification engine. Output exactly one word: POSITIVE or NEGATIVE."\n    user_prompt = f"Analyze the sentiment of this text: '{review_text}'"\n    \n    # Structural simulation of API payload construction\n    payload = f"{system_instruction}\\nUser: {user_prompt}\\nAssistant:"\n    \n    # Simulated execution response\n    if "dies" in review_text or "broken" in review_text:\n        return "NEGATIVE"\n    return "POSITIVE"\n\n# Test Case\nreview = "The device build quality is robust, but the charging cable was missing from the box."\nresult = generate_zero_shot_sentiment(review)\nprint(f"Zero-Shot Evaluation Result: {result}")`,
            content: {
              aim: {
                text: "To evaluate the baseline generalization capabilities of a Large Language Model by designing and testing structured task prompts that contain no examples, measuring how accurately the model leverages its pre-trained knowledge to perform classification, translation, and instruction-following tasks under strict system-level behavioral constraints.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "What Is Zero-Shot?",
                                        "body": [
                                                      "You give the AI a task with zero examples. The AI uses only what it already learned from reading billions of internet pages during training.",
                                                      "You write a clear task  \u2192  No examples given  \u2192  AI uses its pre-trained brain  \u2192  Outputs the answer"
                                        ]
                          },
                          {
                                        "title": "System Prompt vs User Prompt",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Layer</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Who Sets It</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What It Does</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">System Prompt</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Developer</td><td class=\"p-3 text-muted-foreground\">Sets the rulebook \u2014 persona, format, constraints</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">User Prompt</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">User</td><td class=\"p-3 text-muted-foreground\">The actual question or task being asked</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "When Zero-Shot Works vs Fails",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Task</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Zero-Shot?</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Translate to French</td><td class=\"p-3 text-muted-foreground\">Works</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Sentiment analysis</td><td class=\"p-3 text-muted-foreground\">Works</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Custom JSON schema</td><td class=\"p-3 text-muted-foreground\">Often fails</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Niche domain labels</td><td class=\"p-3 text-muted-foreground\">Often fails</td></tr></tbody></table>",
                                                      "![Zero-Shot Prompting](/zero_shot_illustration.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is a prompt in the context of LLMs?", options: ["The input given to the model", "A type of error", "The model's training data", "A programming language"], answerIndex: 0 },
                            { question: "What does \"zero-shot prompting\" mean?", options: ["Giving the model no examples, only instructions", "Giving the model many examples", "Training the model from scratch", "Using zero tokens"], answerIndex: 0 },
                            { question: "Why is zero-shot prompting called \"zero-shot\"?", options: ["Because zero examples are provided in the prompt", "Because it uses zero tokens", "Because it requires zero training data ever", "Because it always fails"], answerIndex: 0 },
                            { question: "Which of the following is an example of a zero-shot prompt?", options: ["\"Translate this sentence to French: 'Hello, how are you?'\"", "Providing 5 translation examples before asking for a new one", "Training a new model from scratch", "Fine-tuning the model on translation data"], answerIndex: 0 },
                            { question: "What type of tasks can zero-shot prompting be used for?", options: ["Classification, translation, summarization, and more", "Only mathematical calculations", "Only image generation", "Only audio processing"], answerIndex: 0 },
                            { question: "What is a key advantage of zero-shot prompting?", options: ["It requires no example demonstrations, saving prompt space", "It always produces perfect results", "It eliminates the need for any instructions", "It only works with very large prompts"], answerIndex: 0 },
                            { question: "What is a potential limitation of zero-shot prompting?", options: ["It may perform worse than few-shot prompting on complex or unfamiliar tasks", "It always outperforms every other prompting method", "It cannot be used with any LLM", "It requires labeled training data"], answerIndex: 0 },
                            { question: "Why does zero-shot prompting rely heavily on the model's pretrained knowledge?", options: ["Because no task-specific examples are given to guide the model", "Because the model is retrained for each prompt", "Because zero-shot prompts always include examples", "Because zero-shot prompting uses a different model architecture"], answerIndex: 0 },
                            { question: "Which of these is a zero-shot instruction-style prompt?", options: ["\"Summarize this article in two sentences.\"", "\"Here is an example summary, now summarize this article.\"", "\"Here are three examples of summaries, now do the same.\"", "\"Train on these summaries and generate output.\""], answerIndex: 0 },
                            { question: "What is \"instruction tuning\" related to zero-shot performance?", options: ["Training a model to follow natural language instructions, improving its zero-shot capabilities", "A method to delete instructions from prompts", "A way to compress vocabulary size", "A type of image processing technique"], answerIndex: 0 },
                            { question: "Why might zero-shot prompting be preferred for quick, simple tasks?", options: ["It requires less prompt engineering effort and shorter prompts", "It always requires more tokens than few-shot prompting", "It cannot be used for simple tasks at all", "It requires extensive example curation"], answerIndex: 0 },
                            { question: "Which factor most influences zero-shot prompting success?", options: ["The quality and clarity of the instruction given", "The color of the text used in the prompt", "The time of day the prompt is submitted", "The length of the model's name"], answerIndex: 0 },
                            { question: "In zero-shot sentiment classification, which prompt is an example?", options: ["\"Classify the sentiment of this review as positive or negative: [review text]\"", "\"Here are 5 labeled reviews, now classify a new one.\"", "\"Fine-tune the model on sentiment data.\"", "\"Translate this review into French.\""], answerIndex: 0 },
                            { question: "What does \"task generalization\" mean in the context of zero-shot prompting?", options: ["The model's ability to perform a new task without specific training examples", "The model's inability to perform any task", "The model needing retraining for every new task", "The model ignoring all instructions given"], answerIndex: 0 },
                            { question: "Why might zero-shot prompting fail on a highly specialized or niche task?", options: ["The model may lack sufficient relevant knowledge from pretraining for that specific task", "Zero-shot prompting always succeeds regardless of task difficulty", "Niche tasks are impossible for any LLM to attempt", "Zero-shot prompting requires labeled data for niche tasks"], answerIndex: 0 },
                            { question: "What is the relationship between model size and zero-shot performance generally?", options: ["Larger, more capable models often show better zero-shot performance due to broader pretrained knowledge", "Model size has no relationship to zero-shot performance", "Smaller models always outperform larger models in zero-shot tasks", "Zero-shot prompting only works with the smallest possible models"], answerIndex: 0 },
                            { question: "Which of the following best describes the structure of a typical zero-shot prompt?", options: ["A clear instruction or question without any accompanying examples", "A set of five examples followed by a question", "A blank prompt with no text", "A list of unrelated random words"], answerIndex: 0 },
                            { question: "Why might adding clear formatting instructions improve zero-shot prompting results?", options: ["It helps guide the model toward producing output in the desired structure, even without examples", "Formatting instructions have no effect on zero-shot output", "Adding instructions always confuses the model", "Formatting can only be used in few-shot prompting"], answerIndex: 0 },
                            { question: "What is a common use case where zero-shot prompting performs reasonably well?", options: ["General knowledge question answering", "Highly specific proprietary business logic untrained in any model", "Tasks requiring access to private real-time data", "Tasks the model has never been exposed to in any form"], answerIndex: 0 },
                            { question: "Which statement correctly contrasts zero-shot prompting with traditional supervised learning?", options: ["Zero-shot prompting requires no task-specific labeled training examples at inference time, unlike supervised learning models trained on labeled datasets", "Zero-shot prompting and supervised learning are identical processes", "Zero-shot prompting always requires more labeled data than supervised learning", "Supervised learning requires no training data at all"], answerIndex: 0 },
                          ],
              procedure: [
                "Establish Persona: Draft a restrictive system prompt defining the explicit persona and output constraints for the zero-shot task.",
                "Draft Core Instruction: Write a clear, unambiguous task directive without providing any input-output examples.",
                "Isolate Variables: Separate the user's raw input data from the instruction logic using clear markdown delimiters (like triple quotes or XML tags) to prevent prompt injection.",
                "Submit API Request: Execute the payload to the LLM generation endpoint with a relatively low temperature parameter to enforce deterministic compliance.",
                "Evaluate Output: Parse the generated response and evaluate it against zero-shot benchmarking standards to determine baseline intelligence.",
                "Iterate Constraints: If the model fails structurally, adjust the explicit constraints in the system prompt rather than providing examples."
              ],
              posttest: [
                            { question: "Why might zero-shot prompting underperform on tasks requiring a very specific or unconventional output format?", options: ["Without examples, the model must infer the desired format purely from instructions, which can be ambiguous", "Zero-shot prompting always perfectly infers any output format", "Output format has no relevance to zero-shot performance", "Zero-shot prompting cannot produce any formatted output ever"], answerIndex: 0 },
                            { question: "How does instruction tuning during model pretraining/fine-tuning specifically improve zero-shot task performance?", options: ["It exposes the model to a wide variety of instruction-response pairs, improving its ability to generalize to new, unseen instructions", "Instruction tuning has no measurable effect on zero-shot capability", "Instruction tuning removes the model's ability to follow any instructions", "Instruction tuning only works for image-based tasks"], answerIndex: 0 },
                            { question: "What is a notable trade-off when relying solely on zero-shot prompting for production applications?", options: ["Faster/simpler prompts but potentially less reliable or consistent outputs compared to few-shot or fine-tuned approaches", "Zero-shot prompting always guarantees perfectly consistent outputs", "There is no trade-off; zero-shot is strictly superior in all cases", "Zero-shot prompting requires more engineering effort than fine-tuning"], answerIndex: 0 },
                            { question: "Why can ambiguous zero-shot instructions lead to inconsistent outputs across multiple runs?", options: ["Without concrete examples to anchor expected behavior, the model may interpret vague instructions differently depending on sampling randomness", "Zero-shot outputs are always perfectly deterministic and consistent", "Ambiguity in instructions never affects model output", "Inconsistency only occurs in few-shot prompting, never zero-shot"], answerIndex: 0 },
                            { question: "How might task framing (e.g., phrasing a classification task as a question vs. a direct command) affect zero-shot performance?", options: ["Different framings can activate different patterns learned during pretraining, sometimes significantly changing output quality", "Task framing has zero effect on any model's output", "Only command-style framing works in zero-shot settings", "Question-style framing is always strictly worse than commands"], answerIndex: 0 },
                            { question: "Why might chain-of-thought style instructions (e.g., \"think step by step\") sometimes be combined with zero-shot prompting?", options: ["To encourage more deliberate reasoning even without explicit examples, often improving performance on complex reasoning tasks", "This combination is mathematically impossible", "Chain-of-thought instructions only work with few-shot prompting", "Adding such instructions always decreases output quality"], answerIndex: 0 },
                            { question: "What does research on \"zero-shot CoT\" (e.g., adding \"let's think step by step\" with no examples) generally suggest?", options: ["Such simple prompting additions can substantially improve reasoning performance compared to plain zero-shot prompting", "Adding any reasoning instruction always degrades performance", "Zero-shot CoT is identical in every way to standard zero-shot prompting", "Zero-shot CoT requires the same number of examples as few-shot prompting"], answerIndex: 0 },
                            { question: "In which scenario would a practitioner most likely choose few-shot over zero-shot prompting despite the added prompt length?", options: ["When the task has a specific format, style, or domain-specific nuance that's hard to convey through instructions alone", "When the task is extremely simple and well understood by any model", "When token/context budget is the primary constraint with no flexibility", "Few-shot is never preferable to zero-shot under any circumstance"], answerIndex: 0 },
                            { question: "Why might larger, more capable models show diminishing additional benefit from few-shot examples on certain tasks compared to smaller models?", options: ["Larger models often have stronger zero-shot capabilities already from broader pretraining, narrowing the relative gain from added examples", "Larger models cannot process few-shot examples at all", "Model size has no bearing on the relative benefit of examples", "Smaller models always benefit less from examples than larger models"], answerIndex: 0 },
                            { question: "How can prompt phrasing sensitivity be considered a limitation specific to zero-shot prompting?", options: ["Small wording changes in the instruction can lead to meaningfully different outputs since there are no examples to anchor expected behavior", "Zero-shot prompts are completely immune to wording changes", "Phrasing sensitivity only affects few-shot prompts, never zero-shot", "Zero-shot prompting eliminates any need for careful wording"], answerIndex: 0 },
                            { question: "What is a practical strategy to improve zero-shot prompting reliability without adding full examples?", options: ["Adding explicit constraints, output format specifications, or role/persona framing within the instruction", "Removing all context and instructions from the prompt", "Reducing the clarity of the instruction intentionally", "Always switching to a completely different task"], answerIndex: 0 },
                            { question: "Why might zero-shot prompting be considered more \"scalable\" for deploying across many different tasks compared to few-shot prompting?", options: ["It avoids the overhead of curating task-specific examples for each new use case", "Zero-shot prompting requires more curation effort per task than few-shot", "Scalability is unrelated to example curation effort", "Few-shot prompting requires no per-task customization at all"], answerIndex: 0 },
                            { question: "How does the concept of \"in-context learning\" relate to zero-shot prompting, given zero-shot provides no examples?", options: ["Zero-shot represents the extreme case of in-context learning where the model relies entirely on the instruction and pretrained knowledge, without demonstration examples", "In-context learning is only possible with few-shot or many-shot prompting, never zero-shot", "Zero-shot prompting and in-context learning are entirely unrelated concepts", "In-context learning requires fine-tuning the model weights"], answerIndex: 0 },
                            { question: "Why might role-based framing (e.g., \"You are an expert mathematician\") improve zero-shot prompting outcomes on certain tasks?", options: ["It can prime the model to draw on relevant pretrained patterns and adopt a more appropriate tone/approach, even without explicit examples", "Role framing has no measurable effect on any model output", "Role framing is only effective when combined with fine-tuning", "Adding a role always confuses the model and degrades performance"], answerIndex: 0 },
                            { question: "What is a key reason zero-shot prompting performance can vary significantly across different LLM providers/models for the same prompt?", options: ["Differences in pretraining data, instruction-tuning methodology, and model architecture lead to different generalization capabilities", "All LLMs are trained identically and should produce identical zero-shot results", "Zero-shot performance is solely determined by prompt length", "Provider differences have no impact on zero-shot results"], answerIndex: 0 },
                            { question: "How might evaluating zero-shot prompting on a benchmark dataset reveal model weaknesses that few-shot evaluation might mask?", options: ["Zero-shot evaluation tests the model's raw generalization without the \"crutch\" of examples, more directly exposing knowledge or formatting gaps", "Zero-shot evaluation always produces better scores than few-shot evaluation", "Benchmark evaluation type has no bearing on revealed weaknesses", "Few-shot evaluation always exposes more weaknesses than zero-shot"], answerIndex: 0 },
                            { question: "Why is it important to consider \"negative\" or edge-case instructions (e.g., \"do not include explanations\") in zero-shot prompts?", options: ["Without examples to implicitly demonstrate constraints, explicit negative instructions help clarify boundaries the model might otherwise overstep", "Negative instructions are never necessary in any prompting scenario", "Edge cases are automatically handled without any explicit instruction", "Including negative instructions always confuses zero-shot models"], answerIndex: 0 },
                            { question: "In what way can zero-shot prompting be seen as a useful diagnostic tool when developing a new LLM application?", options: ["It reveals baseline model capability on a task before investing effort in example curation or fine-tuning", "Zero-shot prompting cannot be used for any diagnostic purpose", "It always represents the final, optimal solution with no further iteration needed", "Diagnostic testing requires fine-tuning, not prompting"], answerIndex: 0 },
                            { question: "Why might combining zero-shot prompting with structured output instructions (e.g., \"respond only in valid JSON\") be particularly useful in automated pipelines?", options: ["It increases the likelihood of machine-parseable, consistent output without needing curated examples for every task variant", "Structured output instructions are incompatible with zero-shot prompting", "JSON formatting requires few-shot examples to work at all", "Automated pipelines cannot use any LLM-generated output"], answerIndex: 0 },
                            { question: "Which statement best reflects current best practices regarding the choice between zero-shot and few-shot prompting?", options: ["The choice should be guided by task complexity, need for output consistency, and available context budget, with zero-shot favored for simpler/well-known tasks", "Zero-shot should never be used under any circumstances", "Few-shot should always be used regardless of task or budget", "The choice between them has no practical impact on results"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w2-2", 
            title: "Few-Shot Prompting", 
            desc: "Few-Shot Prompting", 
            code: `def compile_few_shot_prompt(target_input):\n    # Defining explicit structured exemplars\n    exemplars = [\n        {"input": "Text: The movie was a cinematic masterpiece. Sentiment: Highly Positive"},\n        {"input": "Text: Total waste of time and money. Sentiment: Highly Negative"},\n        {"input": "Text: Visually stunning but the plot was average. Sentiment: Mixed"}\n    ]\n    \n    # Constructing context loop\n    prompt_context = ""\n    for ex in exemplars:\n        prompt_context += f"{ex['input']}\\n###\\n"\n        \n    # Appending the evaluation target\n    final_prompt = f"{prompt_context}Text: {target_input}\\nSentiment:"\n    return final_prompt\n\n# Run Execution Preview\ntarget = "The acting was phenomenal but the sound tracking was terrible."\nfull_payload = compile_few_shot_prompt(target)\nprint(full_payload)`,
            content: {
              aim: {
                text: "To implement In-Context Learning by engineering a curated set of balanced input-output exemplars directly inside the prompt payload, guiding the model to replicate specific output patterns and classification schemas without modifying its underlying weights, while actively mitigating Majority Label Bias and Recency Bias through deliberate exemplar ordering.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "The Idea \u2014 Show, Don't Just Tell",
                                        "body": [
                                                      "Instead of explaining the rules, you paste a few perfect examples directly into the prompt. The AI copies the pattern \u2014 instantly, no retraining needed.",
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Step</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Detail</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Example 1</td><td class=\"p-3 text-muted-foreground\">'Cat' \u2192 Animal</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Example 2</td><td class=\"p-3 text-muted-foreground\">'Rose' \u2192 Plant</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Example 3</td><td class=\"p-3 text-muted-foreground\">'Eagle' \u2192 Animal</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">New question</td><td class=\"p-3 text-muted-foreground\">'Oak' \u2192 ?</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">AI sees the pattern</td><td class=\"p-3 text-muted-foreground\">Outputs: Plant \u2713</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "The Hidden Dangers \u2014 Bias",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Bias Type</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What Happens</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">The Fix</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Majority Label Bias</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">3 Positive examples, 1 Negative \u2192 AI always says Positive</td><td class=\"p-3 text-muted-foreground\">Balance labels equally</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Recency Bias</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">AI blindly copies the pattern of the last example</td><td class=\"p-3 text-muted-foreground\">Shuffle example order randomly</td></tr></tbody></table>",
                                                      "![Few-Shot Prompting](/few_shot_illustration.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What does \"few-shot prompting\" mean?", options: ["Providing a few examples before the actual task", "Removing all examples", "Using only one-word prompts", "Disabling the model"], answerIndex: 0 },
                            { question: "In few-shot prompting, what is included in the prompt besides the actual question?", options: ["A small number of example input-output pairs", "An entire training dataset", "No additional content at all", "Only random text"], answerIndex: 0 },
                            { question: "Why might few-shot prompting improve performance over zero-shot prompting?", options: ["Examples help the model understand the desired task format and style", "It removes the need for any instructions", "It always uses fewer tokens", "It requires no understanding of the task"], answerIndex: 0 },
                            { question: "Which of the following is an example of few-shot prompting?", options: ["Providing 3 example translations, then asking for a new translation", "Asking for a translation with no examples", "Fine-tuning a model on a large dataset", "Training a new model from scratch"], answerIndex: 0 },
                            { question: "What is a \"shot\" in the term \"few-shot prompting\"?", options: ["An example provided in the prompt", "A type of error message", "A camera function", "A unit of computation time"], answerIndex: 0 },
                            { question: "Why might few-shot prompting be useful for tasks with a specific, unusual output format?", options: ["Examples can demonstrate the exact format expected, which instructions alone might not fully convey", "Few-shot prompting cannot demonstrate any format", "Format has no relevance to few-shot prompting", "Few-shot prompting always ignores formatting"], answerIndex: 0 },
                            { question: "What is a potential drawback of few-shot prompting?", options: ["It increases prompt length and token usage", "It always reduces accuracy", "It cannot be used with any text-based task", "It eliminates context entirely"], answerIndex: 0 },
                            { question: "In few-shot prompting, how many examples are typically provided?", options: ["A small number, often between 1 and 10", "Exactly 1,000 examples", "Zero examples", "An entire dataset of millions of examples"], answerIndex: 0 },
                            { question: "Which of the following best describes \"one-shot prompting\"?", options: ["A special case of few-shot prompting using exactly one example", "A method requiring zero examples", "A method requiring a thousand examples", "A training method, not a prompting method"], answerIndex: 0 },
                            { question: "Why might few-shot prompting help with classification tasks?", options: ["Examples can illustrate the categories and expected labeling style", "Few-shot prompting cannot illustrate categories", "Classification tasks cannot use any examples", "Few-shot prompting always misclassifies examples intentionally"], answerIndex: 0 },
                            { question: "What is an important consideration when selecting examples for a few-shot prompt?", options: ["Examples should be relevant and representative of the target task", "Examples should be completely unrelated to the task", "Examples should always be as long as possible", "Examples should never match the desired output format"], answerIndex: 0 },
                            { question: "Why might the order of examples in a few-shot prompt matter?", options: ["Models can sometimes be sensitive to example ordering, affecting output quality", "Order never has any effect on any model", "Examples must always be in alphabetical order", "Order only matters for image-based tasks"], answerIndex: 0 },
                            { question: "What does \"in-context learning\" refer to in relation to few-shot prompting?", options: ["The model learning to perform a task from examples given directly in the prompt, without updating its weights", "Permanently updating the model's weights with each prompt", "Training a brand-new model for every prompt", "Removing all context before generating a response"], answerIndex: 0 },
                            { question: "Which scenario is a good candidate for few-shot prompting?", options: ["A task with a very specific, non-standard output style not easily described in words", "A trivial task universally well understood by any model", "A task requiring zero understanding of context", "A task where examples would actively confuse the model"], answerIndex: 0 },
                            { question: "What is a key cost consideration when using many examples in a few-shot prompt?", options: ["More examples consume more tokens, which can increase API costs and approach context limits", "Examples are always free regardless of count", "Token cost has no relationship to prompt length", "Few-shot prompting eliminates the need for any context window"], answerIndex: 0 },
                            { question: "Why might few-shot prompting be combined with clear task instructions?", options: ["Instructions clarify the goal, while examples demonstrate the specific expected format/style", "Combining instructions with examples is never useful", "Instructions and examples always contradict each other", "Few-shot prompting requires removing all instructions"], answerIndex: 0 },
                            { question: "What might happen if few-shot examples are inconsistent or contain errors?", options: ["The model may learn and replicate those same patterns or errors in its output", "The model will always ignore poor examples completely", "Inconsistent examples have no effect on output", "The model will automatically correct any errors in the examples"], answerIndex: 0 },
                            { question: "Which of these tasks could benefit from few-shot prompting?", options: ["Generating text in a very specific tone or style consistent with provided samples", "A task with no specific requirements at all", "A task where any output is acceptable", "A task that explicitly prohibits any examples"], answerIndex: 0 },
                            { question: "Why is few-shot prompting sometimes preferred over fine-tuning a model?", options: ["It avoids the time and computational cost of retraining the model while still adapting behavior to a task", "Few-shot prompting always requires more resources than fine-tuning", "Fine-tuning requires no data while few-shot prompting requires extensive data", "Few-shot prompting and fine-tuning are identical processes"], answerIndex: 0 },
                            { question: "What is the main difference between zero-shot and few-shot prompting?", options: ["Few-shot includes example demonstrations in the prompt; zero-shot does not", "Zero-shot includes more examples than few-shot", "Few-shot requires retraining the model; zero-shot does not", "There is no meaningful difference between them"], answerIndex: 0 },
                          ],
              procedure: [
                "Identify Failure Modes: Run a zero-shot baseline to identify exactly where the model struggles with formatting or domain logic.",
                "Select Exemplars: Curate a balanced dataset of 3 to 5 perfect input-output examples that cover the edge cases the zero-shot model failed on.",
                "Format Examples: Structure the examples using a strict, repeatable template (e.g., User: [Input] Assistant: [Output]).",
                "Construct Payload: Prepend the formatted examples directly below the system instructions, ensuring visual separation from the actual user query.",
                "Execute Task: Submit the final query. The LLM will statistically mimic the pattern established by the prepended examples.",
                "Analyze Token Overhead: Calculate the API token cost incurred by injecting the examples, as few-shot prompting linearly increases cost per query."
              ],
              posttest: [
                            { question: "Why can the selection and ordering of few-shot examples significantly influence model output, even when the examples themselves are correct?", options: ["Models can exhibit sensitivity to example order and composition, sometimes leading to varying performance (\"recency\" or \"majority label\" biases)", "Example order and selection never have any measurable effect", "Models always treat every possible example ordering identically", "Only the number of examples matters, never their content or order"], answerIndex: 0 },
                            { question: "What does research suggest about the relationship between the number of few-shot examples and performance gains?", options: ["Performance often improves with more examples up to a point, but gains can plateau or even degrade beyond a certain number depending on the task", "More examples always linearly improve performance with no limit", "Adding any additional example always degrades performance", "The number of examples has no relationship to performance whatsoever"], answerIndex: 0 },
                            { question: "Why might few-shot prompting be particularly effective for tasks involving domain-specific jargon or unconventional formatting?", options: ["Examples can implicitly teach the model patterns that are difficult to fully specify through natural language instructions alone", "Domain-specific tasks are impossible for any LLM regardless of examples", "Few-shot prompting cannot convey any formatting information", "Instructions alone always outperform examples for specialized tasks"], answerIndex: 0 },
                            { question: "How does few-shot prompting relate to the broader concept of \"in-context learning\" without parameter updates?", options: ["The model temporarily adapts its behavior based on patterns in the provided examples within the same forward pass, without any gradient-based weight updates", "Few-shot prompting always permanently updates the model's weights", "In-context learning requires retraining the entire model for each new prompt", "Few-shot prompting and in-context learning are unrelated concepts"], answerIndex: 0 },
                            { question: "What is a potential risk of using few-shot examples that are too similar to each other (lacking diversity)?", options: ["The model may overfit to narrow patterns in the examples and fail to generalize to slightly different inputs", "Example diversity has no impact on the model's generalization ability", "Similar examples always improve generalization more than diverse ones", "Lack of diversity guarantees better performance on all inputs"], answerIndex: 0 },
                            { question: "Why might few-shot prompting sometimes underperform zero-shot prompting on certain tasks, counterintuitively?", options: ["Poorly chosen or unrepresentative examples can mislead the model or introduce unintended biases not present in a clear zero-shot instruction", "Few-shot prompting always strictly outperforms zero-shot prompting with no exceptions", "This scenario is mathematically impossible", "Examples can never negatively influence model output"], answerIndex: 0 },
                            { question: "How does \"label bias\" potentially manifest in few-shot classification prompting?", options: ["If examples disproportionately represent one class, the model may be biased toward predicting that class more often, regardless of the actual input", "Label bias is impossible when using few-shot examples", "Few-shot prompting automatically balances all class representations", "Label distribution in examples has no effect on model predictions"], answerIndex: 0 },
                            { question: "What is the significance of \"example-label mapping consistency\" in few-shot prompts for classification tasks?", options: ["Even when labels in examples are somewhat randomized, models can sometimes still learn the task format, though correct mappings generally aid performance more reliably", "Label mapping has zero relevance to model behavior under any circumstance", "Randomized labels always improve performance over correct ones", "Models cannot process any classification task using few-shot examples"], answerIndex: 0 },
                            { question: "Why might context window limitations pose a practical constraint when designing few-shot prompts for complex tasks?", options: ["Each example consumes tokens, and combined with lengthy task descriptions, this can approach or exceed the model's maximum context length", "Context window size has no relationship to the number of examples used", "Few-shot prompts can include unlimited examples regardless of context limits", "Token consumption is identical regardless of example count"], answerIndex: 0 },
                            { question: "How can few-shot prompting be used as an alternative to fine-tuning when adapting a general-purpose LLM to a narrow task?", options: ["By providing task-specific examples at inference time, the model can mimic desired behavior without the cost and complexity of retraining", "Few-shot prompting requires the same computational resources as full fine-tuning", "Few-shot prompting permanently changes the model's underlying parameters", "Few-shot prompting and fine-tuning produce identical underlying model changes"], answerIndex: 0 },
                            { question: "What is a key reason few-shot prompting might be combined with retrieval-augmented techniques (selecting the most relevant examples dynamically)?", options: ["Dynamically selecting the most contextually relevant examples per query can improve performance compared to a fixed, static example set", "Retrieval-based example selection always performs worse than static examples", "Dynamic example selection is computationally impossible in practice", "Relevance of examples has no bearing on prompting effectiveness"], answerIndex: 0 },
                            { question: "Why might few-shot prompting be less effective for tasks requiring genuinely novel reasoning not represented in any plausible example set?", options: ["The model may simply pattern-match surface features of the examples rather than perform the underlying novel reasoning required", "Few-shot prompting guarantees correct reasoning on any conceivable task", "Novel reasoning tasks are always easier with few-shot prompting than zero-shot", "Pattern matching is identical to genuine reasoning in every case"], answerIndex: 0 },
                            { question: "How might the format/structure of few-shot examples (e.g., consistent delimiters, clear input/output markers) impact model performance?", options: ["Consistent formatting helps the model reliably identify where each example's input ends and output begins, reducing ambiguity", "Formatting consistency has no impact on how models parse few-shot examples", "Inconsistent formatting always improves model performance", "Models ignore all formatting and delimiters in few-shot prompts"], answerIndex: 0 },
                            { question: "Why is few-shot prompting sometimes described as providing a \"task specification via demonstration\" rather than \"via description\"?", options: ["The examples implicitly define the task through concrete input-output pairs rather than relying solely on explicit natural language description", "Few-shot prompting never involves any form of task specification", "Demonstration-based specification is identical to providing no specification at all", "Few-shot examples cannot convey any information about the task"], answerIndex: 0 },
                            { question: "What consideration arises when few-shot examples contain sensitive or proprietary information for tasks like internal document classification?", options: ["Care must be taken regarding data privacy and exposure, since prompt content may be processed by external systems or logged", "Sensitive information in prompts poses no privacy or security considerations whatsoever", "Few-shot prompting automatically anonymizes all example content", "Proprietary information cannot be used in any prompting scenario"], answerIndex: 0 },
                            { question: "How might few-shot prompting performance differ between a model heavily instruction-tuned versus one that is not, when given identical examples?", options: ["Instruction-tuned models may better leverage both the instructions and examples together, potentially yielding more reliable results", "Instruction tuning has no effect on how a model utilizes few-shot examples", "Non-instruction-tuned models always outperform instruction-tuned ones with few-shot prompts", "Few-shot prompting only works with instruction-tuned models and fails entirely otherwise"], answerIndex: 0 },
                            { question: "Why might practitioners experiment with different numbers of few-shot examples (e.g., 2 vs. 5 vs. 10) during prompt development?", options: ["The optimal number of examples can vary by task and model, so empirical testing helps identify the best trade-off between performance and token cost", "The number of examples never affects either performance or cost", "Exactly 5 examples is universally optimal for every task and model", "More examples always strictly guarantee proportionally better results with no exceptions"], answerIndex: 0 },
                            { question: "What is a potential issue when few-shot examples inadvertently reveal a pattern unrelated to the actual task (e.g., output length correlating with example position)?", options: ["The model might latch onto spurious correlations (like length or position) instead of the intended task logic, leading to poor generalization", "Spurious correlations in examples can never influence model behavior", "Few-shot prompting is immune to learning unintended patterns", "Output length is always irrelevant to any model's learned behavior"], answerIndex: 0 },
                            { question: "Why might combining few-shot prompting with explicit reasoning steps (a hybrid of few-shot and chain-of-thought) be particularly powerful for complex tasks?", options: ["The examples can demonstrate not just the correct final answer but also a desired reasoning process, guiding the model toward similar step-by-step thinking", "Combining these techniques is mathematically incompatible", "Reasoning steps in examples always confuse models and degrade performance", "Few-shot prompting cannot include any reasoning demonstrations"], answerIndex: 0 },
                            { question: "Which statement best captures a nuanced, evidence-based view of few-shot prompting's role in modern LLM usage?", options: ["Few-shot prompting is a powerful but imperfect tool whose effectiveness depends on example quality, diversity, ordering, and the specific task/model combination", "Few-shot prompting always guarantees optimal results regardless of example quality", "Few-shot prompting has been completely replaced by zero-shot prompting in all use cases", "The quality and selection of examples have no bearing on outcomes"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w2-3", 
            title: "Chain-of-Thought (CoT) Prompting", 
            desc: "Chain-of-Thought Prompting", 
            code: `def solve_logic_with_cot(problem_text, enable_cot=True):\n    if enable_cot:\n        prompt = f"Problem: {problem_text}\\nReasoning: Let's think step by step."\n        # Simulated multi-token computation steps\n        steps = [\n            "1. Start with 3 boxes of 4 apples: 3 * 4 = 12 total apples.",\n            "2. Subtract the 2 apples given to his sister: 12 - 2 = 10.",\n            "Final Answer: 10"\n        ]\n        return "\\n".join(steps)\n    else:\n        prompt = f"Problem: {problem_text}\\nAnswer:"\n        return "Answer: 14" # Simulated immediate guessing failure\n\n# Test Call\npuzzle = "John has 3 boxes of apples. Each box contains 4 apples. He gives 2 apples to his sister. How many does he have left?"\nprint(solve_logic_with_cot(puzzle, enable_cot=True))`,
            content: {
              aim: {
                text: "To improve LLM accuracy on complex multi-step reasoning, mathematical deduction, and logical inference tasks by prompting the model to generate explicit intermediate reasoning steps before producing a final answer, effectively expanding its working memory and reducing catastrophic hallucination rates.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "The Problem \u2014 No Scratch Paper",
                                        "body": [
                                                      "When you demand an instant final answer to a complex problem, the AI must compress 10 steps into 1 prediction \u2014 and usually gets it wrong. CoT gives it scratch paper to think on.",
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Without CoT</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">With CoT</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">How AI answers</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Guesses final answer in one shot</td><td class=\"p-3 text-muted-foreground\">Writes every step, then answers</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Accuracy on maths</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Often wrong</td><td class=\"p-3 text-muted-foreground\">Dramatically better</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Hallucination risk</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">High</td><td class=\"p-3 text-muted-foreground\">Low</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "How Each Step Feeds the Next",
                                        "body": [
                                                      "User asks hard question  \u2192  AI writes Step 1  \u2192  Step 1 added to context  \u2192  AI writes Step 2\u2026  \u2192  Final answer is grounded \u2713"
                                        ]
                          },
                          {
                                        "title": "Two Ways to Trigger CoT",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Method</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">How</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Effort</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Zero-Shot CoT</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Append 'Let us think step by step'</td><td class=\"p-3 text-muted-foreground\">One line \u2014 easy</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Few-Shot CoT</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Provide full worked examples with steps shown</td><td class=\"p-3 text-muted-foreground\">More effort \u2014 more reliable</td></tr></tbody></table>",
                                                      "![Chain-of-Thought Prompting](/cot_illustration.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What does Chain-of-Thought (CoT) prompting help a model do?", options: ["Reason step-by-step before producing a final answer", "Generate images", "Skip difficult questions", "Reduce vocabulary size"], answerIndex: 0 },
                            { question: "Which type of task is CoT prompting especially effective for?", options: ["Multi-step reasoning and arithmetic problems", "Simple yes/no questions", "Single-word answers", "Image classification"], answerIndex: 0 },
                            { question: "What is a common phrase used to trigger CoT reasoning in a prompt?", options: ["\"Let's think step by step\"", "\"Ignore previous instructions\"", "\"Generate an image\"", "\"Use Byte-Pair Encoding\""], answerIndex: 0 },
                            { question: "Why might CoT prompting increase the length of a model's output?", options: ["Because it includes intermediate reasoning steps before the final answer", "Because it removes tokens", "Because it compresses vectors", "Because it disables attention"], answerIndex: 0 },
                            { question: "CoT prompting can be combined with which other prompting technique?", options: ["Few-shot prompting (showing example reasoning chains)", "Image generation only", "Token deletion", "Vocabulary compression"], answerIndex: 0 },
                            { question: "What is the main goal of CoT prompting?", options: ["To improve accuracy on tasks requiring logical or mathematical reasoning", "To make responses shorter", "To remove all context from a prompt", "To eliminate the need for any instructions"], answerIndex: 0 },
                            { question: "Which of the following is an example of a CoT-style answer?", options: ["\"First, calculate the total. Then, subtract the discount. The final answer is 45.\"", "\"45.\"", "An image of the number 45", "A blank response"], answerIndex: 0 },
                            { question: "Why might CoT prompting help reduce errors in multi-step math problems?", options: ["Breaking the problem into smaller steps reduces the chance of skipping a necessary calculation", "It always guarantees a correct answer regardless of the problem", "It removes the need to perform any calculation", "It shortens the problem instead of solving it"], answerIndex: 0 },
                            { question: "What does \"reasoning chain\" refer to in CoT prompting?", options: ["The sequence of intermediate steps leading to a final answer", "A blockchain-based ledger", "A chain of unrelated random words", "A type of tokenizer"], answerIndex: 0 },
                            { question: "Which task type is LEAST likely to benefit significantly from CoT prompting?", options: ["A simple factual lookup question with a single direct answer", "A multi-step word problem", "A logical puzzle requiring several reasoning steps", "A complex math problem"], answerIndex: 0 },
                            { question: "What is \"zero-shot CoT\"?", options: ["Using a CoT trigger phrase without providing example reasoning chains", "Using CoT with a thousand examples", "A method requiring no instructions at all", "A completely different architecture from CoT"], answerIndex: 0 },
                            { question: "What is \"few-shot CoT\"?", options: ["Providing example reasoning chains as demonstrations before the actual question", "Providing no examples at all", "Removing all reasoning steps from examples", "A method exclusive to image models"], answerIndex: 0 },
                            { question: "Why might CoT prompting be useful for word problems in mathematics?", options: ["It encourages the model to break down the problem logically before answering", "It makes the problem shorter automatically", "It removes numbers from the problem", "It eliminates the need to read the problem"], answerIndex: 0 },
                            { question: "What might happen if a model is asked a complex reasoning question WITHOUT CoT prompting?", options: ["It may jump directly to a final answer, potentially skipping necessary reasoning steps and making errors", "It will always reason perfectly regardless of prompting style", "It will refuse to answer entirely", "It will automatically apply CoT reasoning anyway"], answerIndex: 0 },
                            { question: "Which of these best describes the purpose of intermediate reasoning steps in CoT?", options: ["To make the model's thought process more explicit and structured", "To make the output more confusing for the user", "To slow down the model's training process", "To compress the vocabulary size"], answerIndex: 0 },
                            { question: "Why might CoT prompting be combined with self-consistency techniques (generating multiple reasoning paths and selecting the most common answer)?", options: ["To improve reliability by reducing the impact of a single flawed reasoning chain", "To make the model generate only one single fixed answer always", "To eliminate the need for any reasoning altogether", "To remove randomness from the model entirely"], answerIndex: 0 },
                            { question: "What kind of problems are commonly used to demonstrate the benefits of CoT prompting in research?", options: ["Arithmetic and logical reasoning benchmark problems", "Image classification benchmarks only", "Audio transcription benchmarks", "Spreadsheet formatting tasks"], answerIndex: 0 },
                            { question: "Why might explicitly asking a model to \"explain your reasoning\" be considered a form of CoT prompting?", options: ["It encourages the model to articulate intermediate steps rather than only giving a final answer", "It has no relation to CoT prompting at all", "It removes the need for any final answer", "It always shortens the response significantly"], answerIndex: 0 },
                            { question: "What is a potential downside of using CoT prompting for very simple tasks?", options: ["It may unnecessarily increase response length and token usage without meaningful accuracy benefit", "It always decreases accuracy on simple tasks", "It eliminates the model's ability to answer simple questions", "It requires retraining the model from scratch"], answerIndex: 0 },
                            { question: "Which best summarizes why CoT prompting is considered valuable for complex reasoning tasks?", options: ["It guides the model toward a more structured, step-by-step approach that often improves accuracy on multi-step problems", "It removes the need for the model to process any input", "It only works on tasks involving images", "It guarantees a 100% correct answer on every problem"], answerIndex: 0 },
                          ],
              procedure: [
                "Establish Task Boundaries: Define a multi-step logic, math, or complex reasoning problem that standard generation pipelines consistently fail.",
                "Draft Intermediate Steps: Write out the explicit, step-by-step logical pathway required to solve the problem accurately.",
                "Inject Magic Phrase: For a zero-shot approach, append the phrase 'Let's think step by step' to the end of the user instruction.",
                "Construct Few-Shot CoT: For advanced reliability, structure a few-shot prompt where the Assistant's example output contains the full reasoning chain before the final answer.",
                "Execute and Trace: Run the generation pipeline and extract the intermediate reasoning tokens to verify the model's logical deduction process.",
                "Extract Final Answer: Use regex or structured tags (e.g., <Final_Answer>) to isolate the actionable result from the verbose reasoning text."
              ],
              posttest: [
                            { question: "Why does explicit step-by-step reasoning in CoT prompting tend to improve performance on multi-step arithmetic problems specifically?", options: ["It mirrors how such problems are naturally solved, allowing the model to maintain and build on intermediate results rather than attempting a direct leap to the answer", "It always guarantees a correct answer regardless of the problem's actual difficulty", "Step-by-step reasoning has no bearing on arithmetic accuracy in language models", "CoT prompting eliminates the model's need to perform any computation at all"], answerIndex: 0 },
                            { question: "How does \"self-consistency\" decoding complement CoT prompting?", options: ["By sampling multiple independent reasoning chains for the same problem and selecting the most frequently occurring final answer, reducing the impact of any single faulty chain", "By forcing the model to produce only one deterministic reasoning chain every time", "By removing all randomness and reasoning from the generation process", "By requiring the model to be retrained for every new question"], answerIndex: 0 },
                            { question: "What is a key empirical finding regarding CoT prompting's interaction with model scale (model size)?", options: ["CoT prompting tends to yield more significant benefits in sufficiently large/capable models, with smaller models sometimes showing little to no improvement or even degraded performance", "CoT prompting provides identical benefits regardless of model size", "Smaller models always benefit more from CoT prompting than larger models", "Model scale has no documented relationship with CoT effectiveness"], answerIndex: 0 },
                            { question: "Why might \"few-shot CoT\" (providing example reasoning chains) often outperform \"zero-shot CoT\" (just adding a trigger phrase) on certain complex tasks?", options: ["Demonstrated reasoning chains can more precisely guide the model toward the specific reasoning style and depth needed for that task", "Few-shot CoT and zero-shot CoT always produce identical results", "Adding examples to a CoT prompt always decreases reasoning quality", "Zero-shot CoT always outperforms few-shot CoT regardless of task complexity"], answerIndex: 0 },
                            { question: "What risk does CoT prompting NOT fully eliminate, even when a plausible-looking reasoning chain is generated?", options: ["The model can still produce a logically coherent-looking chain that contains a factual or logical error, leading to an incorrect final answer", "CoT prompting guarantees zero errors in every single output", "Reasoning chains are always factually accurate by definition", "Once a model generates a reasoning chain, the answer cannot be wrong"], answerIndex: 0 },
                            { question: "How might CoT prompting be particularly useful for debugging or understanding model failures?", options: ["Examining the intermediate reasoning steps can reveal exactly where the model's logic diverged or went wrong, unlike a single opaque final answer", "CoT prompting provides no additional insight into a model's decision process compared to a direct answer", "Reasoning chains are entirely random and provide no diagnostic value", "Debugging model failures is impossible regardless of prompting technique"], answerIndex: 0 },
                            { question: "Why might combining CoT prompting with structured output formatting (e.g., \"show your reasoning, then give the final answer as JSON\") be useful in automated systems?", options: ["It allows both human-readable reasoning for verification and machine-parseable output for downstream processing", "Structured output and CoT reasoning are fundamentally incompatible with one another", "JSON formatting eliminates the possibility of including any reasoning steps", "Automated systems cannot process any reasoning text whatsoever"], answerIndex: 0 },
                            { question: "What does the phenomenon of \"unfaithful\" or \"post-hoc\" reasoning in CoT outputs refer to?", options: ["Cases where the generated reasoning chain doesn't accurately reflect the actual computational process that led to the model's answer, even if the final answer happens to be correct", "Cases where reasoning chains are always perfectly faithful representations of internal computation", "A situation that never occurs in any language model", "A method to guarantee transparent and accurate reasoning every time"], answerIndex: 0 },
                            { question: "Why might increasing the complexity of a reasoning task increase the relative benefit of CoT prompting compared to direct prompting?", options: ["More complex tasks require tracking more intermediate state/sub-results, which direct (non-CoT) prompting is more likely to mishandle without explicit decomposition", "Task complexity has no bearing on the relative benefit of CoT prompting", "Simple tasks always benefit more from CoT prompting than complex ones", "CoT prompting provides identical absolute benefit regardless of task complexity"], answerIndex: 0 },
                            { question: "How does \"least-to-most\" prompting relate to and potentially extend the basic idea of CoT prompting?", options: ["It explicitly decomposes a problem into a sequence of progressively more complex subproblems, each building on the previous one's solution, extending CoT's step-by-step philosophy", "It is entirely unrelated to chain-of-thought reasoning", "It requires solving the hardest subproblem first before any easier ones", "It eliminates the need for any intermediate reasoning steps"], answerIndex: 0 },
                            { question: "Why might CoT prompting sometimes lead to longer but not necessarily more accurate responses on certain ambiguous or open-ended questions?", options: ["If the underlying question lacks a clear step-by-step logical structure, forcing a reasoning chain may produce verbose but ultimately unhelpful or speculative content", "CoT prompting always shortens responses regardless of question type", "Ambiguous questions are guaranteed to be resolved correctly by any reasoning chain", "Length and accuracy are always perfectly correlated in CoT outputs"], answerIndex: 0 },
                            { question: "What consideration arises regarding token/computation cost when deploying CoT prompting at scale in production systems?", options: ["Generating longer reasoning chains increases token usage and latency, which must be weighed against the accuracy benefits for the specific use case", "CoT prompting always reduces token usage compared to direct answering", "Token cost is completely unrelated to response length", "Production systems cannot use CoT prompting under any circumstances"], answerIndex: 0 },
                            { question: "How might a practitioner empirically decide whether CoT prompting is worth the added cost for a specific application?", options: ["By comparing accuracy/quality metrics with and without CoT on a representative validation set, weighed against the increased latency/token cost", "CoT prompting should always be used regardless of any measured impact", "Empirical testing is unnecessary since CoT prompting always helps equally on every task", "Cost considerations are irrelevant to the decision of whether to use CoT"], answerIndex: 0 },
                            { question: "Why might providing a \"bad\" or flawed example reasoning chain in a few-shot CoT prompt potentially harm performance?", options: ["The model may learn to replicate the same flawed reasoning pattern shown in the example, propagating the error to new problems", "Flawed examples have no influence on subsequent model reasoning", "The model will always automatically correct any flawed example shown to it", "Few-shot CoT prompting is immune to the quality of provided examples"], answerIndex: 0 },
                            { question: "What is the relationship between CoT prompting and the broader concept of \"scratchpad\" reasoning explored in language model research?", options: ["Both involve using intermediate generated text as a form of working memory to help the model arrive at a more accurate final answer", "Scratchpad reasoning and CoT prompting are entirely unrelated concepts", "Scratchpads eliminate any need for a final answer", "CoT prompting and scratchpad reasoning always produce identical outputs"], answerIndex: 0 },
                            { question: "Why might explicitly instructing a model to verify or double-check its reasoning at the end of a CoT chain sometimes catch additional errors?", options: ["An explicit verification step can prompt the model to re-examine the chain for inconsistencies, potentially catching mistakes the initial pass missed", "Verification steps never have any effect on a model's final output", "Models cannot be prompted to review their own previous reasoning", "Adding a verification step always introduces new errors rather than catching them"], answerIndex: 0 },
                            { question: "How does the interpretability benefit of CoT prompting (seeing the steps) differ from a guarantee of correctness?", options: ["Visible reasoning steps help users understand and potentially audit the model's approach, but a plausible-sounding chain does not guarantee the conclusion is factually correct", "Interpretability and correctness are always identical in CoT outputs", "If reasoning is visible, the final answer is guaranteed to be correct", "CoT prompting removes the need to evaluate output correctness at all"], answerIndex: 0 },
                            { question: "Why might task-specific prompt engineering (e.g., tailoring the CoT trigger phrase or example structure) yield better results than a single generic CoT approach across all tasks?", options: ["Different task types may benefit from differently structured reasoning guidance, so a one-size-fits-all approach may underperform compared to tailored prompting", "All tasks respond identically to any CoT phrasing with no variation", "Generic CoT prompts always outperform task-specific tailored prompts", "Task-specific tailoring has no measurable effect on performance"], answerIndex: 0 },
                            { question: "What broader implication does CoT prompting's success have for understanding how LLMs approach complex problem-solving?", options: ["It suggests that guiding generation through intermediate steps can help models better leverage their learned knowledge, even without changing the underlying model weights", "It proves that LLMs cannot perform any reasoning under any circumstances", "It indicates that all reasoning chains are mathematically equivalent regardless of structure", "It shows that model weights must always be retrained to achieve any reasoning improvement"], answerIndex: 0 },
                            { question: "Which statement best synthesizes the nuanced, research-informed view of CoT prompting's role in improving LLM reasoning?", options: ["CoT prompting is a generally effective but not infallible technique whose benefits depend on task complexity, model scale, and prompt design, and it does not guarantee correctness", "CoT prompting guarantees perfectly correct answers on all reasoning tasks regardless of model or task", "CoT prompting provides no measurable benefit over standard direct prompting in any documented research", "CoT prompting is only theoretically useful and has no practical empirical support"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w2-4", 
            title: "Structured Output Generation", 
            desc: "Structured Output Generation", 
            code: `import json\nfrom pydantic import BaseModel, Field\n\n# 1. Define the target structural schema requirements\nclass UserProfile(BaseModel):\n    name: str = Field(description="The user's full name")\n    age: int = Field(description="Age in years, must be positive")\n    skills: list[str] = Field(description="List of technical competencies")\n\n# 2. Simulate API response payload with strict JSON constraint enforcement\ndef parse_llm_response(raw_json_str):\n    try:\n        # Validate data directly against the Pydantic structural schema\n        data = json.loads(raw_json_str)\n        validated_profile = UserProfile(**data)\n        return "Success", validated_profile\n    except Exception as e:\n        return "Parsing/Validation Failure", str(e)\n\n# Run Validation Verification\nmock_output = '{"name": "Likhith Kumar", "age": 25, "skills": ["Python", "React", "FastAPI"]}'\nstatus, obj = parse_llm_response(mock_output)\nprint(f"Validation Status: {status}\\nObject: {obj}")`,
            content: {
              aim: {
                text: "To enforce strict, machine-parseable output formatting from an LLM by applying both prompt-level schema constraints and grammar-level token filtering techniques, ensuring every response conforms to a valid JSON or Pydantic schema structure suitable for direct programmatic ingestion by downstream APIs and databases.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "The Problem \u2014 AIs Love to Chat",
                                        "body": [
                                                      "By default the AI says: 'Sure! Here is the JSON: { ... } Hope this helps!' The word 'Sure' instantly crashes any program trying to parse that as JSON.",
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Default AI Output</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Structured Output</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Format</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Conversational prose + data</td><td class=\"p-3 text-muted-foreground\">Pure valid JSON only</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">JSON.parse() result</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">CRASH</td><td class=\"p-3 text-muted-foreground\">Works perfectly</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Use in production?</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">No</td><td class=\"p-3 text-muted-foreground\">Yes</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "Two Enforcement Levels",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Method</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">How It Works</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Reliability</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Prompt Constraints</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Tell the AI: output ONLY valid JSON, no markdown</td><td class=\"p-3 text-muted-foreground\">~90% \u2014 AI can still slip</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Grammar-Level Constraints</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">API engine blocks any token that violates the schema mathematically</td><td class=\"p-3 text-muted-foreground\">100% guaranteed \u2014 physically impossible to fail</td></tr></tbody></table>",
                                                      "![Structured Output Generation](/structured_output_illustration.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is \"structured output generation\" in the context of LLMs?", options: ["Generating output in a specific, predictable format (e.g., JSON, XML, tables)", "Generating completely random text", "Deleting all output", "Generating only images"], answerIndex: 0 },
                            { question: "Which of these is a common structured output format?", options: ["JSON", "A blurry image", "A musical note", "An unstructured paragraph with no format"], answerIndex: 0 },
                            { question: "Why might structured output be useful in software applications?", options: ["It allows easier integration with downstream programs/APIs that expect a specific format", "It always makes output longer and harder to read", "It eliminates the need for any data parsing", "It is only useful for generating images"], answerIndex: 0 },
                            { question: "Which technique can be used to encourage an LLM to produce structured output?", options: ["Providing a schema or format instructions in the prompt", "Removing all instructions", "Disabling the model's attention mechanism", "Using only zero-shot prompting with no format guidance"], answerIndex: 0 },
                            { question: "What is JSON commonly used for in structured output?", options: ["Representing data as key-value pairs in a structured, machine-readable format", "Compressing audio files", "Editing images", "Encrypting passwords"], answerIndex: 0 },
                            { question: "Why might a prompt explicitly specify field names and data types for structured output?", options: ["To clearly communicate the exact format and content expected from the model", "To confuse the model intentionally", "To eliminate the need for any prompt at all", "Field names and data types have no effect on output format"], answerIndex: 0 },
                            { question: "Which of the following is an example of a structured output request?", options: ["\"Return the result as a JSON object with fields 'name' and 'age'.\"", "\"Tell me a random story.\"", "\"Write a poem about the ocean.\"", "\"Generate an image of a cat.\""], answerIndex: 0 },
                            { question: "Why is structured output particularly useful for automated pipelines?", options: ["It enables reliable, consistent parsing of model output by other software components", "Automated pipelines cannot process any output from LLMs", "Structured output always requires manual review before use", "Automated pipelines only work with unstructured text"], answerIndex: 0 },
                            { question: "What might happen if an LLM is asked for structured output without clear formatting instructions?", options: ["It may produce inconsistent or improperly formatted output", "It will always produce perfectly formatted output regardless of instructions", "It will refuse to respond at all", "It will automatically generate an image instead"], answerIndex: 0 },
                            { question: "Which of these formats is commonly used for tabular structured output?", options: ["CSV (Comma-Separated Values)", "JPEG", "MP3", "WAV"], answerIndex: 0 },
                            { question: "What is a \"schema\" in the context of structured output generation?", options: ["A definition of the expected structure, fields, and data types of the output", "A type of image filter", "A method for compressing text", "A musical composition format"], answerIndex: 0 },
                            { question: "Why might providing an example output format (few-shot) help with structured output generation?", options: ["It demonstrates the exact format expected, reducing ambiguity", "It always confuses the model about the desired format", "Examples have no relevance to formatting tasks", "It eliminates the need for the model to generate any output"], answerIndex: 0 },
                            { question: "Which of the following is a benefit of generating output as XML or JSON instead of free-form text for a data extraction task?", options: ["Easier and more reliable programmatic parsing of the extracted information", "Free-form text is always easier for software to parse than structured formats", "XML and JSON cannot represent any data relationships", "Structured formats always produce longer and less readable output"], answerIndex: 0 },
                            { question: "What is a common real-world use case for structured output generation?", options: ["Extracting specific data fields (e.g., name, date, amount) from an unstructured document into JSON", "Writing a free-form creative essay", "Generating background music", "Translating a poem into another language"], answerIndex: 0 },
                            { question: "Why might strict formatting instructions reduce the variability of an LLM's output?", options: ["Clear constraints narrow the range of acceptable responses, leading to more consistent results", "Formatting instructions always increase variability", "Strict instructions eliminate the need for any output at all", "Variability is unrelated to the clarity of instructions"], answerIndex: 0 },
                            { question: "Which of the following best describes a \"key-value pair\" as used in structured formats like JSON?", options: ["A field name paired with its corresponding value", "Two unrelated random numbers", "A type of image compression", "A musical chord"], answerIndex: 0 },
                            { question: "Why might a developer want an LLM to output data in a table format?", options: ["To easily organize and display multiple rows/columns of related data", "To compress the data file size dramatically", "To make data parsing impossible", "Tables have no use in any practical applications"], answerIndex: 0 },
                            { question: "What does \"format compliance\" mean in the context of structured output?", options: ["How well the model's actual output matches the requested format/schema", "The total number of words generated", "The color scheme used in the response", "The model's training dataset size"], answerIndex: 0 },
                            { question: "Why might validation be necessary even after requesting structured output from an LLM?", options: ["The model might occasionally produce output that doesn't perfectly match the requested format, requiring a check before use", "Structured output from LLMs is always 100% guaranteed to be valid", "Validation is only necessary for unstructured text", "Validation has no role in structured output workflows"], answerIndex: 0 },
                            { question: "Which of these best summarizes the purpose of structured output generation?", options: ["To produce model output in a predictable, machine-readable format suitable for further processing", "To make output completely unpredictable and unstructured", "To eliminate the need for any further data processing", "To generate purely artistic, free-form content with no format constraints"], answerIndex: 0 },
                          ],
              procedure: [
                "Define Data Schema: Create a strict structural contract using JSON Schema or a Python Pydantic class, explicitly defining expected keys, data types, and required fields.",
                "Inject Schema Constraints: Inject this schema directly into the System Prompt, instructing the model to map its knowledge explicitly to the provided keys.",
                "Enable API Mode: Configure the API request parameters to enable explicit JSON Mode or Structured Output mode (if supported by the provider).",
                "Disable Markdown: explicitly instruct the model to avoid wrapping the output in markdown code blocks.",
                "Execute Generation: Transmit the payload with a low temperature to ensure formatting stability.",
                "Validation Pipeline: Catch the text output and run it through a programmatic validation script (like json.loads) to verify structural integrity before routing the data."
              ],
              posttest: [
                            { question: "Why might explicitly providing a JSON schema (with field names, types, and required fields) in a prompt improve format compliance compared to a vague format request?", options: ["A detailed schema reduces ambiguity about exactly which fields and types are expected, narrowing the model's response space", "Providing a schema always confuses the model more than a vague request", "Schemas have no measurable effect on output format consistency", "Vague requests always produce more reliable structured output than detailed schemas"], answerIndex: 0 },
                            { question: "What is a key advantage of using function calling/tool-use features (where supported) over plain prompt-based formatting instructions for structured output?", options: ["Function calling mechanisms can enforce stricter schema validation at the API level, reducing the chance of malformed output reaching the application", "Function calling always produces less reliable output than plain text prompting", "Function calling eliminates the need for any schema definition", "Plain prompt-based instructions always guarantee perfect compliance, making function calling unnecessary"], answerIndex: 0 },
                            { question: "Why might nested or deeply hierarchical JSON structures be more challenging for an LLM to generate reliably compared to flat structures?", options: ["More complex nesting increases the chances of structural errors like mismatched brackets or incorrect field placement", "Nested structures are always easier for models to generate than flat ones", "JSON nesting has no impact on generation reliability", "LLMs cannot generate any JSON output regardless of structure"], answerIndex: 0 },
                            { question: "How can few-shot examples specifically aid structured output generation beyond just stating format rules?", options: ["They demonstrate the exact format with concrete instances, which can clarify edge cases and conventions not explicitly covered by abstract rules", "Few-shot examples for structured tasks always reduce output quality", "Format rules alone always outperform example-based demonstration", "Structured output tasks cannot benefit from any example-based guidance"], answerIndex: 0 },
                            { question: "Why is post-generation validation (e.g., using a JSON schema validator) considered a best practice even when prompting for structured output?", options: ["LLM outputs can occasionally deviate from the requested format, so automated validation helps catch and handle such cases reliably before downstream use", "Validation is unnecessary since LLM-generated structured output is always perfectly correct", "Schema validators cannot be used with LLM-generated content", "Post-generation validation only applies to unstructured text outputs"], answerIndex: 0 },
                            { question: "What trade-off might arise when imposing very strict structured output constraints on a creative or open-ended generation task?", options: ["Strict structure may constrain the model's ability to express nuanced or creative content freely, potentially at the cost of richness or naturalness", "Strict constraints always improve creative quality with no downsides", "Structure and creativity are entirely unrelated dimensions of output", "Open-ended tasks always benefit equally from strict formatting as data-extraction tasks"], answerIndex: 0 },
                            { question: "Why might retry/repair strategies (e.g., re-prompting with the invalid output and an error message) be used in structured output pipelines?", options: ["If initial output fails validation, providing feedback and requesting a correction can often resolve formatting errors without restarting from scratch", "Retry strategies are never effective for correcting structured output errors", "Invalid output cannot be corrected through any subsequent prompting", "Pipelines should always discard the entire conversation after one formatting failure"], answerIndex: 0 },
                            { question: "How does specifying explicit enumerated values (e.g., \"status must be one of: 'active', 'inactive', 'pending'\") in a structured output prompt typically improve reliability?", options: ["It constrains the model's possible outputs for that field to a known, valid set, reducing unexpected or invalid values", "Enumerated values always increase the chance of invalid output", "Specifying allowed values has no effect on output consistency", "Enumeration is only relevant for unstructured free-text fields"], answerIndex: 0 },
                            { question: "Why might combining structured output generation with Chain-of-Thought reasoning (reasoning first, then formatted answer) be useful for complex extraction or analysis tasks?", options: ["It allows the model to reason through the problem before committing to a final structured answer, potentially improving accuracy while still enabling machine-readable output", "Reasoning and structured output formatting are fundamentally incompatible with each other", "This combination always produces invalid JSON or formatting errors", "Structured output tasks never require any underlying reasoning"], answerIndex: 0 },
                            { question: "What is a potential downside of overly verbose schema instructions in a structured output prompt?", options: ["Excessively long or complex instructions can consume significant context budget and potentially overwhelm or confuse the model", "Schema instructions never consume any meaningful context space", "More verbose instructions always strictly improve output reliability with no downside", "Verbosity in instructions has no relationship to context window usage"], answerIndex: 0 },
                            { question: "Why might different LLMs vary in their reliability at producing strictly valid JSON, even with identical prompts?", options: ["Differences in training data, instruction tuning, and built-in formatting capabilities can lead to varying levels of format compliance across models", "All LLMs are guaranteed to produce identical, perfectly valid JSON given the same prompt", "JSON validity is entirely independent of the underlying model used", "Model differences only affect creative tasks, never structured output tasks"], answerIndex: 0 },
                            { question: "How can \"type coercion\" issues arise in LLM-generated structured output (e.g., a numeric field returned as a string like \"42\" instead of 42)?", options: ["The model may not strictly distinguish data types as rigorously as a programming language would, leading to subtly mismatched types that still require careful downstream handling", "Type coercion issues never occur in practice with LLM-generated output", "LLMs always produce perfectly typed values matching the exact schema with no exceptions", "Data type mismatches have no impact on downstream application logic"], answerIndex: 0 },
                            { question: "Why might a developer choose XML over JSON for structured output in certain legacy or enterprise systems?", options: ["Some existing systems or industry standards are built around XML, making it the more compatible/practical choice for integration despite JSON's broader modern popularity", "XML is always strictly superior to JSON in every technical respect", "JSON cannot represent hierarchical or nested data structures at all", "The choice between XML and JSON has no relevance to system compatibility"], answerIndex: 0 },
                            { question: "What role does \"temperature\" (a sampling parameter) potentially play in the consistency of structured output generation?", options: ["Lower temperature settings tend to produce more deterministic, consistent output, which can improve reliability for structured formatting tasks compared to high-temperature sampling", "Temperature settings have no effect on output format consistency", "Higher temperature always produces more reliable structured output", "Temperature only affects image generation, not text-based structured output"], answerIndex: 0 },
                            { question: "Why might it be important to explicitly instruct a model to avoid including extra commentary or explanation when strict structured output (e.g., pure JSON) is required by an automated system?", options: ["Without such instruction, the model may add explanatory text before/after the structured data, breaking automated parsing that expects only the structured content", "Automated parsers are always designed to ignore any extra commentary automatically", "Models never include any extra text beyond the requested structure", "Explanatory text has no effect on whether automated parsing succeeds"], answerIndex: 0 },
                            { question: "How might structured output generation be evaluated for quality beyond simple format validity (e.g., does it parse as JSON)?", options: ["Additional evaluation can assess whether the extracted/generated content within the structure is semantically accurate and complete, not just syntactically valid", "Format validity alone is always sufficient to guarantee correct and complete content", "Semantic accuracy is irrelevant once a structure is syntactically valid", "There is no meaningful way to evaluate structured output beyond checking if it parses"], answerIndex: 0 },
                            { question: "Why might combining structured output with explicit \"null\" or \"not found\" handling instructions be important for real-world data extraction tasks?", options: ["Source documents may not always contain every expected field, so instructing the model on how to handle missing information helps prevent inconsistent or fabricated values", "Missing data scenarios never occur in real-world extraction tasks", "Models should always be left to guess freely when information is missing, without any guidance", "Null handling has no relevance to structured output reliability"], answerIndex: 0 },
                            { question: "What is a key reason API providers have introduced dedicated \"JSON mode\" or schema-constrained generation features rather than relying solely on prompt instructions?", options: ["Dedicated mechanisms can enforce structural constraints more reliably at the generation level, reducing the formatting failures sometimes seen with prompt-only approaches", "Dedicated JSON modes always perform worse than plain prompt instructions", "Such features have no impact on output reliability compared to prompting alone", "JSON mode features are purely cosmetic and provide no functional benefit"], answerIndex: 0 },
                            { question: "Why might a pipeline implement a maximum retry limit when using repair/retry strategies for invalid structured output?", options: ["To prevent infinite loops or excessive cost/latency in cases where the model repeatedly fails to produce valid output, requiring a fallback or error-handling path", "Retry limits are never necessary since models always succeed eventually given infinite retries", "Maximum retry limits have no practical purpose in production systems", "Each retry attempt is guaranteed to be free and instantaneous regardless of limit"], answerIndex: 0 },
                            { question: "Which statement best reflects a holistic, best-practice approach to reliable structured output generation with LLMs?", options: ["Combining clear schema instructions, illustrative examples, appropriate sampling settings, and post-generation validation/repair mechanisms generally yields the most robust results", "Simply asking for \"JSON format\" with no further guidance is always sufficient for production-grade reliability", "Structured output generation requires no validation since LLMs are inherently perfect at following format instructions", "Post-generation validation is unnecessary busywork that adds no practical value"], answerIndex: 0 },
                          ]
            }
          }
        ]
      },
      {
        title: "Module 3",
        objective: "Building AI Applications",
        tutorial: "Lab 3: LLM API Integration",
        labTitle: "Lab 3: LLM API Integration",
        experiments: [
          { 
            id: "llms-w3-1", 
            title: "Building a Chatbot", 
            desc: "Building a Chatbot", 
            code: `class ConversationalBot:\n    def __init__(self, system_instruction):\n        # Establish the foundational system state\n        self.memory = [{"role": "system", "content": system_instruction}]\n\n    def chat_turn(self, user_message):\n        # 1. Append the new user input turn to history\n        self.memory.append({"role": "user", "content": user_message})\n        \n        # Simulated API processing over the complete state array\n        # In a production app, you would pass self.memory to the client SDK\n        simulated_response = f"Acknowledging request: '{user_message}' based on history of {len(self.memory)} turns."\n        \n        # 2. Append the assistant's generation block to preserve context\n        self.memory.append({"role": "assistant", "content": simulated_response})\n        return simulated_response\n\n# Verification Run\nbot = ConversationalBot("You are a helpful programming assistant.")\nprint(bot.chat_turn("Hello, I am setting up a Python project."))\nprint(bot.chat_turn("What folder layout do you recommend for it?"))`,
            content: {
              aim: {
                text: "To architect a fully stateful conversational interface by engineering a client-side rolling message history loop that appends every user and assistant turn with its role label, transmits the full history on every API call, and implements a truncation strategy \u2014 either Sliding Window or Summary Buffer \u2014 to sustain coherent long-term dialogue within the model's hard context window limit.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "Shocking Fact \u2014 The AI Has No Memory!",
                                        "body": [
                                                      "Every API call starts completely fresh. The AI instantly forgets everything after replying. ChatGPT only seems to remember because the app secretly sends the entire conversation history with every message.",
                                                      "Message 1 sent  \u2192  Reply 1 received  \u2192  Message 2 sent + full history  \u2192  Reply 2 received  \u2192  History grows every turn"
                                        ]
                          },
                          {
                                        "title": "The Three Roles in the History Array",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Role</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Who</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Example</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">system</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Developer</td><td class=\"p-3 text-muted-foreground\">'You are a helpful assistant. Reply concisely.'</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">user</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Human</td><td class=\"p-3 text-muted-foreground\">'What is the capital of France?'</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">assistant</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">AI</td><td class=\"p-3 text-muted-foreground\">'The capital of France is Paris.'</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "When History Gets Too Big \u2014 Truncation Strategies",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Strategy</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What It Does</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Keeps Old Context?</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Cost</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Sliding Window</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Delete the oldest messages when limit is near</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">No \u2014 gone forever</td><td class=\"p-3 text-muted-foreground\">Low</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Summary Buffer</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Summarise old messages into one compact block</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Yes \u2014 compressed</td><td class=\"p-3 text-muted-foreground\">Medium</td></tr></tbody></table>",
                                                      "![Building a Chatbot](/llms_w3_1_stateful_memory.png)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is a chatbot?", options: ["A program designed to simulate conversation with users", "A type of database", "A hardware device", "An image editing tool"], answerIndex: 0 },
                            { question: "What is typically required to build a chatbot using an LLM?", options: ["Access to an LLM API and a way to send/receive messages", "A physical microphone only", "A spreadsheet application", "An image generation tool"], answerIndex: 0 },
                            { question: "What does \"API\" stand for?", options: ["Application Programming Interface", "Automated Program Instruction", "Artificial Processing Index", "Application Process Integration"], answerIndex: 0 },
                            { question: "Why is an API key typically required to use an LLM service?", options: ["To authenticate and authorize requests to the service", "To compress the input text", "To translate the input automatically", "To generate images"], answerIndex: 0 },
                            { question: "What is \"conversation history\" in a chatbot context?", options: ["The record of previous messages exchanged between user and bot", "A type of error log", "The chatbot's source code", "A database of unrelated topics"], answerIndex: 0 },
                            { question: "Why might a chatbot need to maintain conversation history?", options: ["To provide contextually relevant responses based on prior messages", "To slow down response time intentionally", "To delete previous messages permanently", "History has no impact on chatbot behavior"], answerIndex: 0 },
                            { question: "What is a \"system prompt\" in chatbot design?", options: ["An initial instruction that sets the chatbot's behavior, tone, or role", "An error message shown to the user", "A type of hardware component", "The chatbot's final response"], answerIndex: 0 },
                            { question: "Which of the following is a common way to send user input to an LLM API?", options: ["Including it in the request payload as a message", "Printing it on paper", "Saving it as an image file", "Compiling it into machine code"], answerIndex: 0 },
                            { question: "What does the term \"endpoint\" refer to in API usage?", options: ["A specific URL where requests are sent to interact with a service", "The final response generated by a chatbot", "A type of hardware port", "The last word in a sentence"], answerIndex: 0 },
                            { question: "Why might a developer test a chatbot with multiple different inputs?", options: ["To ensure it responds appropriately across varied scenarios", "To make the chatbot crash intentionally", "Testing has no value once a chatbot is built", "To remove all conversation logic"], answerIndex: 0 },
                            { question: "What role does the \"user\" role typically play in a chat-based API request structure?", options: ["It represents messages sent by the human interacting with the chatbot", "It represents the chatbot's own internal code", "It has no defined meaning in chat APIs", "It represents a system error"], answerIndex: 0 },
                            { question: "What role does the \"assistant\" role typically represent in a chat-based API request structure?", options: ["The chatbot's own generated responses", "The end user's input", "A type of database query", "An unrelated background process"], answerIndex: 0 },
                            { question: "Why might rate limits be relevant when building a chatbot using an LLM API?", options: ["APIs often restrict the number of requests allowed in a given time period", "Rate limits only apply to image generation", "Rate limits have no effect on chatbot development", "Rate limits guarantee unlimited free usage"], answerIndex: 0 },
                            { question: "What is a common method to test a chatbot's responses during development?", options: ["Sending sample messages and reviewing the generated output", "Disconnecting from the internet entirely", "Deleting the chatbot's code", "Avoiding any interaction with the API"], answerIndex: 0 },
                            { question: "Why might error handling be important when building a chatbot application?", options: ["To gracefully manage failed API calls or unexpected responses", "Error handling has no role in chatbot reliability", "To intentionally crash the application on any input", "To remove all functionality from the chatbot"], answerIndex: 0 },
                            { question: "What is the purpose of a \"temperature\" parameter often available in chatbot API calls?", options: ["To control the randomness/creativity of the generated response", "To control the literal temperature of the server hardware", "To set the chatbot's response language", "To determine the chatbot's name"], answerIndex: 0 },
                            { question: "Why might a chatbot use a \"max tokens\" parameter?", options: ["To limit the length of the generated response", "To limit the number of users who can chat", "To determine the chatbot's color scheme", "To set the chatbot's training data size"], answerIndex: 0 },
                            { question: "What is a key benefit of using an LLM API rather than building a language model from scratch for a chatbot?", options: ["It saves significant time and resources by leveraging a pretrained model", "Building from scratch is always faster and cheaper", "APIs cannot generate any natural language responses", "LLM APIs require no setup or integration work at all"], answerIndex: 0 },
                            { question: "Why might a chatbot interface include a text input box and a \"send\" button?", options: ["To allow users to type and submit messages for the chatbot to respond to", "To display unrelated images", "To compress the chatbot's source code", "Input boxes have no functional purpose in chatbot UIs"], answerIndex: 0 },
                            { question: "Which of these best describes the basic flow of a simple LLM-based chatbot?", options: ["User sends a message \u2192 message is sent to the LLM API \u2192 API returns a response \u2192 response is displayed to the user", "The chatbot generates random text with no connection to user input", "The user must manually write the chatbot's response themselves", "The chatbot only works without any user input at all"], answerIndex: 0 },
                          ],
              procedure: [
                "Initialize Array: Instantiate an empty memory array and insert a permanent 'system' role dictionary at index 0 to define the chatbot's core personality.",
                "Capture User Input: Extract the text string from the client interface and append it to the memory array under the 'user' role.",
                "Transmit Payload: Serialize the entire rolling history array and transmit it to the LLM API endpoint.",
                "Capture Response: Extract the generated text from the API response object and immediately append it to the memory array under the 'assistant' role.",
                "Render UI: Push the new assistant message to the frontend display layer.",
                "Manage Context Window: Run a token-counting utility. If the array exceeds the maximum threshold, execute a sliding-window truncation to delete the oldest user-assistant pair before the next query."
              ],
              posttest: [
                            { question: "Why is maintaining a full conversation history array (not just the latest message) important when calling an LLM API for a multi-turn chatbot?", options: ["LLMs are typically stateless between API calls, so the full history must be resent each time to preserve context across turns", "LLMs automatically remember all previous conversations without needing any history sent", "Sending conversation history has no effect on response relevance", "Only the system prompt needs to be sent; user history is irrelevant"], answerIndex: 0 },
                            { question: "What is a key challenge when conversation history grows very long in a chatbot application?", options: ["It can approach or exceed the model's context window limit, requiring truncation or summarization strategies", "Conversation history has no limit and can grow infinitely without consequence", "Longer history always improves response quality with no downsides", "Context window limits only apply to image-based models"], answerIndex: 0 },
                            { question: "Why might a developer implement a sliding window or summarization approach for chatbot conversation history?", options: ["To manage context length efficiently while still preserving relevant recent context as conversations grow long", "To delete all context immediately after each message", "Summarization always increases token usage without benefit", "Sliding windows are only relevant for image processing"], answerIndex: 0 },
                            { question: "How does a well-crafted system prompt influence chatbot behavior differently from the user's individual messages?", options: ["The system prompt sets persistent behavioral guidelines or persona that apply throughout the conversation, while user messages provide turn-specific input", "System prompts and user messages are functionally identical with no behavioral difference", "System prompts are only used for system error logging, not behavior control", "The system prompt is discarded after the first user message"], answerIndex: 0 },
                            { question: "Why might streaming responses (token-by-token output) be preferred over waiting for the full response in a chatbot UI?", options: ["It improves perceived responsiveness, letting users see output as it's generated rather than waiting for the entire response", "Streaming always increases total response generation time significantly", "Streaming has no effect on user experience", "Non-streaming responses always feel faster to users"], answerIndex: 0 },
                            { question: "What is a potential consequence of setting an LLM's temperature parameter very high (e.g., close to 1) in a customer-support chatbot?", options: ["Responses may become more varied or creative but potentially less predictable or consistent, which could be undesirable for support contexts requiring reliability", "High temperature always guarantees more accurate factual responses", "Temperature has no effect on response variability", "Lower temperature always produces more creative responses than high temperature"], answerIndex: 0 },
                            { question: "Why is rate limiting and exponential backoff a relevant consideration when integrating a chatbot with an LLM API at scale?", options: ["Handling rate limit errors gracefully (e.g., retrying with increasing delays) helps maintain reliability without overwhelming the API or causing repeated failures", "Rate limits never apply to production-scale applications", "Exponential backoff always increases the chance of request failures", "Retrying immediately without delay is always the best strategy for rate-limited requests"], answerIndex: 0 },
                            { question: "How might a chatbot architecture differentiate between \"system,\" \"user,\" and \"assistant\" messages when constructing the API request payload?", options: ["Each role is typically labeled explicitly in the message structure so the model can correctly interpret instructions versus user input versus its own prior responses", "All messages are sent as a single undifferentiated block of text with no role labeling", "Role labeling has no impact on how the model interprets conversation structure", "Only the \"user\" role is ever used in any chat-based API"], answerIndex: 0 },
                            { question: "Why might prompt injection be a security consideration in chatbot applications that incorporate user input directly into prompts?", options: ["Malicious user input could attempt to override system instructions or manipulate the chatbot into unintended behavior", "Prompt injection is purely a theoretical concern with no real-world relevance", "User input can never influence chatbot behavior regardless of content", "System prompts are always immune to any user-provided text"], answerIndex: 0 },
                            { question: "What is a key reason for implementing logging and monitoring in a production chatbot system?", options: ["To track usage patterns, diagnose errors, and identify problematic or low-quality responses over time", "Logging serves no practical purpose once a chatbot is deployed", "Monitoring is only relevant during the initial development phase, never in production", "Logged data cannot be used to improve chatbot performance"], answerIndex: 0 },
                            { question: "Why might a chatbot designer choose to inject retrieved external information (e.g., from a knowledge base) into the prompt rather than relying solely on the LLM's pretrained knowledge?", options: ["It allows the chatbot to provide more accurate, up-to-date, or domain-specific information not captured in the model's training data", "External information injection always degrades chatbot response quality", "Pretrained knowledge alone is always sufficient for any specialized or time-sensitive query", "Retrieval-based augmentation has no practical application in chatbot design"], answerIndex: 0 },
                            { question: "How can asynchronous handling of API requests benefit a chatbot's user interface responsiveness?", options: ["It allows the UI to remain responsive (e.g., showing a loading indicator) while waiting for the API response, rather than freezing", "Asynchronous handling always makes the application slower overall", "Synchronous blocking calls always provide a better user experience", "Asynchronous handling has no effect on perceived UI responsiveness"], answerIndex: 0 },
                            { question: "Why might cost management be an important consideration when scaling a chatbot built on a paid LLM API?", options: ["API usage is often billed per token, so high traffic or long conversations can lead to significant costs that need monitoring and optimization", "LLM APIs are always free regardless of usage volume", "Cost has no relationship to the number of tokens processed", "Token usage and billing are entirely unrelated concepts"], answerIndex: 0 },
                            { question: "What is a potential benefit of allowing users to provide feedback (e.g., thumbs up/down) on chatbot responses?", options: ["It can help identify low-quality responses and inform future improvements to prompting or system design", "User feedback has no value in improving chatbot systems", "Feedback mechanisms always degrade chatbot performance", "Feedback can only be used to change the chatbot's name"], answerIndex: 0 },
                            { question: "Why might a developer implement input validation or sanitization before sending user messages to an LLM API?", options: ["To handle potentially malformed input, excessively long messages, or harmful content before it reaches the model", "Input validation is unnecessary since LLMs can process any input flawlessly", "Sanitization always corrupts legitimate user messages", "Validation has no role in chatbot reliability or safety"], answerIndex: 0 },
                            { question: "How might a chatbot's \"persona\" defined in the system prompt affect user trust and engagement?", options: ["A well-defined, consistent persona/tone can make interactions feel more coherent and appropriate for the application's context", "Persona definitions have no measurable effect on user perception", "A chatbot's tone is determined solely by the user's input, never the system prompt", "Defining a persona always confuses users and reduces engagement"], answerIndex: 0 },
                            { question: "What is the significance of session management (tracking distinct user conversations) in a multi-user chatbot deployment?", options: ["It ensures each user's conversation history remains separate and contextually accurate, preventing cross-contamination between different users' contexts", "Session management has no relevance when multiple users access a chatbot simultaneously", "All users should always share a single combined conversation history", "Session tracking only matters for single-user applications"], answerIndex: 0 },
                            { question: "Why might a fallback response strategy (e.g., a default message when the API fails) be important in chatbot design?", options: ["It ensures users receive some form of feedback even when the underlying API call fails, improving perceived reliability", "Fallback strategies are unnecessary since API calls never fail", "Users should always see a blank screen when errors occur", "Fallback responses always increase the chance of application crashes"], answerIndex: 0 },
                            { question: "How might A/B testing different system prompts help improve a chatbot's effectiveness over time?", options: ["By comparing user engagement or satisfaction metrics across prompt variations, developers can identify which framing produces better outcomes", "A/B testing has no practical application in chatbot or prompt development", "System prompts cannot be meaningfully compared or evaluated", "Only one system prompt variation can ever be tested, with no comparison possible"], answerIndex: 0 },
                            { question: "Which statement best captures a holistic view of building a robust, production-ready LLM-based chatbot?", options: ["It requires careful attention to context/history management, error handling, cost, security, and user experience, beyond just calling the API", "Simply calling the LLM API with the user's message is sufficient for any production deployment", "Production readiness has no relationship to error handling or security considerations", "Cost and scalability are irrelevant once a chatbot works correctly for one user"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w3-2", 
            title: "AI-Based Text Summarization", 
            desc: "AI-Based Text Summarization", 
            code: `def map_reduce_summarizer_mock(document_chunks):\n    # 1. Map Phase: Summarize each chunk independently\n    intermediate_summaries = []\n    for chunk in document_chunks:\n        # Simulated individual API call per chunk block\n        map_summary = f"Summary of [{chunk[:20]}...]"\n        intermediate_summaries.append(map_summary)\n        \n    print(f"Map Phase Complete. Generated {len(intermediate_summaries)} chunk summaries.")\n    \n    # 2. Reduce Phase: Combine intermediate results into a final summary\n    combined_context = " ".join(intermediate_summaries)\n    final_summary = f"Final Executive Synthesis: {combined_context}"\n    return final_summary\n\n# Test Verification Data\nchunks = [\n    "Paragraph one discussing initial system specifications and project scopes.",\n    "Paragraph two detailing algorithmic development parameters and performance metrics.",\n    "Paragraph three listing project deployment strategies and continuous maintenance schemas."\n]\nprint(map_reduce_summarizer_mock(chunks))`,
            content: {
              aim: {
                text: "To design and benchmark three document summarization architectures \u2014 Stuffing, Map-Reduce, and Refine \u2014 against documents of varying sizes that exceed model context limits, comparing each strategy's output quality, context preservation depth, and total API call efficiency to determine the optimal approach for different document types.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "The Challenge \u2014 Document Won't Fit!",
                                        "body": [
                                                      "AI models can only read a limited number of words at once (context window). A 500-page legal contract is way too big. We need smart chunking strategies.",
                                                      "Strategy 1 \u2014 Stuffing: Entire doc into one prompt  \u2192  Summary",
                                                      "Strategy 2 \u2014 Map-Reduce: Split into chunks  \u2192  Summarise each (MAP)  \u2192  Combine summaries  \u2192  Final summary (REDUCE)",
                                                      "Strategy 3 \u2014 Refine: Chunk 1 \u2192 Summary 1  \u2192  Chunk 2 + Summary 1 \u2192 Summary 2  \u2192  Chunk 3 + Summary 2 \u2192 Summary 3  \u2192  Final Summary \u2713"
                                        ]
                          },
                          {
                                        "title": "Strategy Comparison",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Strategy</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Speed</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Context Quality</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Best For</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Stuffing</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Instant</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Perfect</td><td class=\"p-3 text-muted-foreground\">Short docs only</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Map-Reduce</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Fast</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Some loss</td><td class=\"p-3 text-muted-foreground\">Large docs, speed matters</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Refine</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Slow</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Excellent</td><td class=\"p-3 text-muted-foreground\">Legal / technical docs</td></tr></tbody></table>",
                                                      "![AI-Based Text Summarization](/llms_w3_2_summarization.png)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is text summarization?", options: ["Condensing a longer text into a shorter version while retaining key information", "Translating text into another language", "Deleting all text content", "Converting text into an image"], answerIndex: 0 },
                            { question: "What are the two main types of text summarization?", options: ["Extractive and Abstractive", "Visual and Audio", "Manual and Automated only", "Binary and Decimal"], answerIndex: 0 },
                            { question: "What does \"extractive summarization\" mean?", options: ["Selecting key existing sentences or phrases directly from the original text", "Generating entirely new sentences not present in the original text", "Deleting the entire original text", "Translating the text into a different language"], answerIndex: 0 },
                            { question: "What does \"abstractive summarization\" mean?", options: ["Generating new sentences that capture the meaning, not necessarily copied from the original", "Only copying exact sentences from the source text", "Removing all content from the original text", "Converting text into a table format only"], answerIndex: 0 },
                            { question: "Why might LLMs be well-suited for abstractive summarization?", options: ["They can generate coherent, novel sentences while capturing the main ideas of a text", "They can only copy text verbatim with no rephrasing ability", "They cannot understand the meaning of any text", "They are only capable of translation, not summarization"], answerIndex: 0 },
                            { question: "Which of the following is a common use case for text summarization?", options: ["Condensing news articles for quick reading", "Generating random images", "Compressing audio files", "Encrypting sensitive data"], answerIndex: 0 },
                            { question: "What might a prompt for summarization typically include?", options: ["An instruction to summarize, along with the text to be summarized", "Only a single random word", "An image file", "A blank prompt with no instructions"], answerIndex: 0 },
                            { question: "Why might a user specify a desired summary length (e.g., \"in two sentences\")?", options: ["To control how concise or detailed the resulting summary should be", "Length specifications have no effect on summarization output", "To make the summarization process slower", "To prevent the model from generating any output"], answerIndex: 0 },
                            { question: "What is a potential challenge in summarizing very long documents with LLMs?", options: ["The document length may exceed the model's context window limit", "Long documents are always summarized perfectly with no issues", "Context window limits do not apply to summarization tasks", "LLMs cannot process any text longer than one sentence"], answerIndex: 0 },
                            { question: "Why might summarization be useful for business applications?", options: ["It helps quickly digest large volumes of text, such as reports or emails", "It eliminates the need for any written communication", "It always produces inaccurate information", "It has no practical business application"], answerIndex: 0 },
                            { question: "What is a \"summary ratio\" in the context of summarization?", options: ["The proportion of the summary's length relative to the original text's length", "The number of grammatical errors in a summary", "The font size used in the summary", "The color scheme of the output"], answerIndex: 0 },
                            { question: "Which of these texts would likely benefit most from summarization?", options: ["A lengthy research article", "A single short sentence", "A single word", "An empty document"], answerIndex: 0 },
                            { question: "What role does the prompt's instruction clarity play in summarization quality?", options: ["Clear instructions help the model understand exactly what kind of summary is expected", "Instruction clarity has no effect on summarization quality", "Vague instructions always produce better summaries", "Summarization works the same regardless of instructions given"], answerIndex: 0 },
                            { question: "Why might a user request a \"bullet-point summary\" instead of a paragraph summary?", options: ["To get key points organized in an easy-to-scan list format", "Bullet points always make text harder to read", "Bullet-point format is identical to paragraph format", "Bullet points eliminate the need for any content"], answerIndex: 0 },
                            { question: "What might happen if a summarization prompt does not specify a target length?", options: ["The model may produce a summary of varying or unpredictable length", "The model will always refuse to generate any summary", "The output will always be exactly one sentence", "Length specification has no impact on output variability"], answerIndex: 0 },
                            { question: "Which of the following is an important quality criterion for a good summary?", options: ["It should accurately retain the main ideas of the original text", "It should add unrelated, fabricated information", "It should always be longer than the original text", "It should remove all meaningful content"], answerIndex: 0 },
                            { question: "Why might summarization tools be used in customer service settings?", options: ["To quickly summarize long customer interaction histories or support tickets", "Summarization has no application in customer service", "To replace all human customer service agents instantly", "To make customer complaints longer and more detailed"], answerIndex: 0 },
                            { question: "What is a common evaluation method for assessing summary quality?", options: ["Comparing the summary to a human-written reference summary", "Counting the number of vowels in the summary", "Measuring the file size of the summary", "Checking the font used in the summary"], answerIndex: 0 },
                            { question: "Why might a summarization prompt specify the target audience (e.g., \"summarize for a 10-year-old\")?", options: ["To adjust the vocabulary, complexity, and tone of the summary appropriately", "Audience specification has no effect on summary style", "It always makes the summary more technical and complex", "It eliminates the need for any summarization at all"], answerIndex: 0 },
                            { question: "Which best describes the overall goal of AI-based text summarization?", options: ["To efficiently condense information while preserving its essential meaning", "To expand text into a much longer version", "To translate text into multiple unrelated languages simultaneously", "To remove all factual content from a document"], answerIndex: 0 },
                          ],
              procedure: [
                "Load Document: Import the massive target document and run a pre-flight token estimation to verify it exceeds the standard context window.",
                "Execute Chunking: Split the document into an array of sequential text blocks, utilizing an overlap parameter to ensure sentences split across boundaries are not lost.",
                "Map Phase Execution: Loop through the array, sending each individual chunk to the LLM with an isolated prompt asking for a localized summary.",
                "Collect Intermediate Summaries: Store the generated localized summaries into a new list.",
                "Reduce Phase Execution: Concatenate the localized summaries into a single master string and submit it to the LLM for a final, cohesive global summary.",
                "Verify Context Constraints: Ensure that neither the individual chunks nor the concatenated intermediate summaries exceed the API's token limits at any step in the pipeline."
              ],
              posttest: [
                            { question: "Why might abstractive summarization be more prone to \"hallucination\" (introducing inaccurate information) than extractive summarization?", options: ["Since abstractive methods generate novel phrasing rather than copying source sentences directly, there's a higher risk of introducing details not actually present in the original text", "Abstractive summarization always copies text verbatim, eliminating any risk of inaccuracy", "Extractive summarization is more prone to hallucination than abstractive summarization", "Hallucination risk is identical and unrelated to the summarization method used"], answerIndex: 0 },
                            { question: "How does the \"context window\" limitation impact summarizing a document significantly longer than the model's maximum input length?", options: ["The document may need to be chunked into smaller segments, summarized individually, and then potentially combined or further summarized", "Context window limits have no impact on documents of any length", "Longer documents are always processed without any need for chunking", "The model will always automatically expand its own context window as needed"], answerIndex: 0 },
                            { question: "What is a \"hierarchical\" or \"map-reduce\" style summarization approach used for very long documents?", options: ["Summarizing individual chunks first (map), then summarizing those summaries together (reduce) to produce a final condensed result", "Deleting random sections of the document without reading them", "Summarizing only the very first sentence of the document", "A method exclusive to image-based content, not text"], answerIndex: 0 },
                            { question: "Why might evaluating summarization quality using metrics like ROUGE have limitations despite being widely used?", options: ["ROUGE primarily measures n-gram/lexical overlap with reference summaries and may not fully capture semantic accuracy, coherence, or faithfulness", "ROUGE perfectly captures all aspects of summary quality with no limitations", "ROUGE is exclusively used for image quality evaluation, not text", "Lexical overlap metrics always correlate perfectly with human judgment of quality"], answerIndex: 0 },
                            { question: "How might faithfulness/factual consistency evaluation differ from traditional overlap-based summarization metrics?", options: ["Faithfulness evaluation specifically checks whether claims in the summary are actually supported by the source text, rather than just measuring textual similarity", "Faithfulness and overlap-based metrics measure exactly the same thing", "Factual consistency is irrelevant to summarization quality assessment", "Overlap-based metrics always guarantee factual accuracy"], answerIndex: 0 },
                            { question: "Why might prompt instructions specifying \"only include information explicitly stated in the text\" help reduce hallucination in LLM-based summarization?", options: ["Such constraints can guide the model to avoid introducing speculative or external information not grounded in the source document", "This type of instruction has no effect on hallucination rates", "Models always ignore explicit grounding instructions", "Hallucination is impossible to influence through prompt design"], answerIndex: 0 },
                            { question: "What trade-off exists between extractive and abstractive summarization in terms of fluency versus faithfulness?", options: ["Extractive summaries tend to be more faithful (since text is copied) but potentially less fluent/coherent, while abstractive summaries can be more fluent but carry higher hallucination risk", "There is no meaningful trade-off between these two approaches", "Extractive summarization always produces more fluent text than abstractive summarization", "Abstractive summarization always guarantees perfect faithfulness to the source"], answerIndex: 0 },
                            { question: "Why might domain-specific summarization (e.g., legal or medical documents) require additional care compared to general news summarization?", options: ["Specialized terminology and the high stakes of inaccuracies in these domains demand greater precision and possibly domain-adapted prompting or models", "Domain has no bearing on summarization difficulty or risk", "Legal and medical summarization is always easier than general news summarization", "Specialized domains never require any additional consideration"], answerIndex: 0 },
                            { question: "How can multi-document summarization differ in complexity from single-document summarization?", options: ["It requires synthesizing and potentially reconciling information across multiple sources, which may contain overlapping, complementary, or conflicting information", "Multi-document summarization is identical in complexity to single-document summarization", "Multiple documents always contain perfectly consistent, non-overlapping information", "Synthesizing multiple sources has no additional complexity compared to one source"], answerIndex: 0 },
                            { question: "Why might query-focused summarization (summarizing with respect to a specific question or aspect) be more challenging than generic summarization?", options: ["It requires identifying and prioritizing only the information relevant to the specific query, rather than capturing all generally important content", "Query-focused summarization is always simpler than generic summarization", "Specific queries have no impact on which content should be included in a summary", "Generic and query-focused summarization always produce identical results"], answerIndex: 0 },
                            { question: "What is a key consideration when summarizing user-generated content (e.g., reviews, social media posts) compared to formal documents?", options: ["Informal language, slang, sarcasm, or inconsistent quality may require different handling than well-structured formal text", "User-generated and formal content always require identical summarization approaches", "Informal language has no impact on summarization difficulty", "User-generated content can never be effectively summarized by LLMs"], answerIndex: 0 },
                            { question: "Why might iterative refinement (asking the model to revise its own summary based on feedback) improve summarization quality?", options: ["It allows correction of identified issues like missing key points, inaccuracies, or excessive length in a subsequent pass", "Iterative refinement always degrades summary quality with each pass", "Models cannot revise or improve upon their own previous output", "A single-pass summary is always guaranteed to be optimal with no room for improvement"], answerIndex: 0 },
                            { question: "How might providing explicit constraints (e.g., \"summarize in exactly 3 bullet points, each under 15 words\") improve consistency in automated summarization pipelines?", options: ["Precise structural and length constraints reduce variability and make output easier to validate and integrate into downstream systems", "Such constraints always increase output variability and inconsistency", "Structural constraints have no measurable effect on automated processing", "Precise constraints make automated validation impossible"], answerIndex: 0 },
                            { question: "Why is \"coverage\" (capturing all essential points) often in tension with \"conciseness\" (brevity) in summarization?", options: ["Including more essential information typically requires more length, so achieving both maximal coverage and high conciseness simultaneously involves trade-offs", "Coverage and conciseness are always perfectly aligned with no tension whatsoever", "Longer summaries are always considered worse regardless of coverage", "Conciseness has no relationship to the amount of content included"], answerIndex: 0 },
                            { question: "What risk does summarizing sensitive or confidential documents using a third-party LLM API potentially introduce?", options: ["Document content sent to an external API may raise data privacy or confidentiality concerns depending on the provider's data handling policies", "Sensitive document summarization carries no additional privacy considerations", "Third-party APIs are always guaranteed to handle data with complete privacy regardless of policy", "Confidentiality concerns only apply to image data, not text"], answerIndex: 0 },
                            { question: "Why might a \"summary of summaries\" (recursive summarization) potentially lose important nuance present in the original document?", options: ["Each summarization pass risks dropping detail, so repeated condensation can compound information loss", "Recursive summarization always perfectly preserves all original nuance", "Multiple summarization passes never affect information retention", "A summary of summaries always contains more detail than the original document"], answerIndex: 0 },
                            { question: "How can specifying the intended \"purpose\" of a summary (e.g., decision-making vs. casual reading) influence what content the model should prioritize?", options: ["Different purposes may require emphasizing different types of information (e.g., actionable insights vs. general overview), guiding the model's content selection", "The intended purpose of a summary has no influence on what content should be included", "All summaries should always contain identical content regardless of purpose", "Purpose specification only affects formatting, never content selection"], answerIndex: 0 },
                            { question: "Why might benchmarking an LLM summarizer against multiple reference summaries (rather than just one) provide a more robust quality assessment?", options: ["Multiple references can account for the fact that there are often several valid ways to summarize the same content, reducing bias toward one specific phrasing", "Using multiple references always produces less reliable evaluation results", "There is only ever one valid way to summarize any given text", "Reference-based evaluation requires exactly one reference, never more"], answerIndex: 0 },
                            { question: "What is a potential pitfall of relying solely on automated metrics (like ROUGE) without human evaluation for summarization quality?", options: ["Automated metrics may miss issues like factual errors, awkward phrasing, or missing critical context that human judgment would catch", "Automated metrics always perfectly align with human judgment in every case", "Human evaluation provides no additional insight beyond automated metrics", "There is no value in combining automated and human evaluation approaches"], answerIndex: 0 },
                            { question: "Which statement best reflects best practices for building a reliable AI-based text summarization system?", options: ["Combining clear prompt instructions, appropriate chunking for long documents, hallucination mitigation strategies, and a mix of automated and human evaluation tends to produce the most reliable results", "Simply asking the model to \"summarize this\" with no further guidance is always sufficient for reliable production use", "Evaluation is unnecessary since LLM-generated summaries are always factually accurate", "Chunking strategies are irrelevant regardless of document length"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w3-3", 
            title: "Document Question Answering", 
            desc: "Document Question Answering", 
            code: `def execute_grounded_qa(document_source, question):\n    # Simulating a basic search component to isolate relevant context lines\n    relevant_context = ""\n    for line in document_source.split("\\n"):\n        # Match keywords from the question to extract relevant lines\n        keyword = question.split()[-1].strip("?")\n        if keyword.lower() in line.lower():\n            relevant_context += line + " "\n\n    # Check if context was successfully extracted\n    if not relevant_context:\n        relevant_context = "No specific reference passage found in source document."\n\n    # Formulate the grounded prompt template\n    prompt_template = (\n        f"Context: {relevant_context}\\n"\n        f"Question: {question}\\n"\n        f"Answer the question using only the context provided above. If unknown, state 'Not Found':"\n    )\n    \n    return prompt_template\n\n# Verification Run\ndocument = (\n    "Section 1: Account setup requires a verified email address.\\n"\n    "Section 2: The standard refund window is 14 days from initial purchase.\\n"\n    "Section 3: Subscription cancellations take effect at the end of the billing cycle."\n)\nquery = "What is the timeline for a refund?"\nprint(execute_grounded_qa(document, query))`,
            content: {
              aim: {
                text: "To build a context-grounded question answering pipeline that retrieves the most relevant passages from a provided document, injects them directly into a strictly constrained system prompt, and forces the LLM to extract verifiable answers exclusively from the supplied context \u2014 explicitly instructing the model to respond with 'I don't know' when the answer is absent \u2014 eliminating hallucination and creating a full audit trail from answer back to source.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "The Problem \u2014 AI Guesses From Memory",
                                        "body": [
                                                      "Ask an AI about your company's private HR policy and it invents a confident answer that sounds right but is completely made up \u2014 it was never trained on your document.",
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Standard AI</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Document QA</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Knowledge source</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Pre-trained memory</td><td class=\"p-3 text-muted-foreground\">The document you provide</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Hallucination risk</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Very High</td><td class=\"p-3 text-muted-foreground\">Very Low</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Can be audited?</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">No</td><td class=\"p-3 text-muted-foreground\">Yes \u2014 answer traces back to source</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Unknown answer?</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Invents one</td><td class=\"p-3 text-muted-foreground\">Says 'I don't know'</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "The Extraction Flow",
                                        "body": [
                                                      "User question  \u2192  Find relevant passages  \u2192  Inject into prompt + rule: use only this  \u2192  AI reads & extracts answer  \u2192  Auditable result \u2713",
                                                      "![Document Question Answering](/llms_w3_3_document_qa.png)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is \"document question answering\" (Document QA)?", options: ["Using a model to answer questions based on the content of a given document", "Translating a document into another language", "Deleting irrelevant parts of a document", "Converting a document into an image"], answerIndex: 0 },
                            { question: "Why is Document QA useful?", options: ["It allows users to quickly find specific information within long documents", "It eliminates the need to read any document ever", "It only works with image files", "It always generates random unrelated answers"], answerIndex: 0 },
                            { question: "What is typically provided as input for a Document QA task?", options: ["A document (or relevant excerpt) and a question", "Only a question with no document", "Only an image with no text", "A blank input with no content"], answerIndex: 0 },
                            { question: "What does \"context\" refer to in Document QA?", options: ["The relevant portion of text from which the answer should be derived", "The model's training history", "The font style of the document", "The number of words in the question"], answerIndex: 0 },
                            { question: "Why might long documents pose a challenge for Document QA systems?", options: ["They may exceed the model's context window limit", "Long documents are always processed instantly with no limitations", "Context window limits do not apply to QA tasks", "Longer documents always produce more accurate answers automatically"], answerIndex: 0 },
                            { question: "What is \"Retrieval-Augmented Generation\" (RAG) in the context of Document QA?", options: ["A technique that retrieves relevant document sections before generating an answer", "A method to generate random documents", "A way to compress images", "A type of audio processing technique"], answerIndex: 0 },
                            { question: "Why might RAG be used instead of feeding an entire large document into the model at once?", options: ["To efficiently retrieve only the most relevant sections, avoiding context window limitations", "RAG always requires more context than the full document", "RAG eliminates the need for any document content", "RAG is only used for image-based tasks"], answerIndex: 0 },
                            { question: "What is a \"vector database\" commonly used for in Document QA systems?", options: ["Storing and efficiently searching document embeddings for relevant content retrieval", "Storing video files only", "Compressing audio recordings", "Generating random text with no relation to documents"], answerIndex: 0 },
                            { question: "Why might document chunking be necessary before indexing for QA systems?", options: ["Breaking documents into smaller pieces makes retrieval and processing more manageable", "Chunking always destroys all useful information in a document", "Chunking is only relevant for image files", "Whole documents are always more efficient than chunks regardless of size"], answerIndex: 0 },
                            { question: "What does it mean if a Document QA system \"grounds\" its answer in the source document?", options: ["The answer is based on and traceable to specific content within the provided document", "The answer is generated with no connection to the document", "The system deletes the document after generating an answer", "The answer is always identical to the entire document"], answerIndex: 0 },
                            { question: "Why is grounding important in Document QA?", options: ["It helps ensure answers are accurate and verifiable against the source material", "Grounding has no effect on answer accuracy", "Grounding always makes answers less reliable", "Grounding eliminates the need for any source document"], answerIndex: 0 },
                            { question: "What might happen if a Document QA system answers a question using information NOT present in the provided document?", options: ["This could be considered a hallucination, reducing the reliability of the answer", "This is always considered an ideal and desired outcome", "This never happens with Document QA systems", "This always improves answer accuracy"], answerIndex: 0 },
                            { question: "Which of the following is an example of a Document QA prompt structure?", options: ["\"Based on the following document, answer this question: [question]. Document: [text]\"", "\"Generate a random image unrelated to any document.\"", "\"Delete all content from this document.\"", "\"Translate this document into another language.\""], answerIndex: 0 },
                            { question: "Why might a developer want to display the specific source text used to answer a question (citation)?", options: ["To allow users to verify the answer against the original document content", "Citations have no value in Document QA systems", "To make the answer less trustworthy", "To hide the source of information intentionally"], answerIndex: 0 },
                            { question: "What is \"semantic search\" in the context of retrieving relevant document content?", options: ["Searching based on meaning/similarity rather than exact keyword matching", "Searching only by exact character matches", "A method that ignores the meaning of the query entirely", "A way to compress search results into images"], answerIndex: 0 },
                            { question: "Why might embeddings be used to find relevant document sections for a given question?", options: ["Embeddings allow comparison of semantic similarity between the question and document sections", "Embeddings are only useful for generating images", "Embeddings eliminate the need for any document content", "Embeddings cannot represent any textual meaning"], answerIndex: 0 },
                            { question: "What type of documents can Document QA systems typically work with?", options: ["Text-based documents such as PDFs, articles, or reports", "Only audio recordings", "Only video files", "Only handwritten notes with no digital text"], answerIndex: 0 },
                            { question: "Why might a Document QA system fail to answer a question correctly if the relevant information isn't included in the retrieved context?", options: ["The model can only answer based on the information it's given, not its absence", "The model will always know the correct answer regardless of context", "Missing context has no effect on Document QA accuracy", "The system will automatically search the entire internet instead"], answerIndex: 0 },
                            { question: "What is a key benefit of Document QA systems for businesses with large knowledge bases?", options: ["They allow employees or customers to quickly find specific answers without manually searching through documents", "They eliminate the need for any documentation at all", "They always provide incorrect information", "They have no practical application in business settings"], answerIndex: 0 },
                            { question: "Which best describes the overall goal of a Document QA system?", options: ["To accurately answer user questions based on the content of provided documents", "To randomly generate unrelated text", "To delete all document content", "To translate documents without answering any questions"], answerIndex: 0 },
                          ],
              procedure: [
                "Prepare Context Block: Extract the textual content from the target reference document and format it cleanly.",
                "Draft Grounded System Prompt: Write explicit instructions commanding the model to act solely as a text extractor and to refuse questions that lack supporting context.",
                "Assemble Injection Template: Create a prompt template containing discrete sections for the 'System Rules', the 'Document Context', and the 'User Query'.",
                "Execute Payload: Pass the fully assembled string to the LLM API endpoint.",
                "Test Verification: Ask a query whose answer explicitly exists in the text, ensuring accurate extraction.",
                "Test Refusal: Ask a query whose answer is entirely missing from the text, verifying that the strict system prompt prevents the model from hallucinating."
              ],
              posttest: [
                            { question: "Why is chunk size selection (how documents are split before embedding) an important design decision in a RAG-based Document QA system?", options: ["Chunks that are too small may lack sufficient context, while chunks too large may dilute relevance or exceed processing limits, affecting retrieval quality", "Chunk size has no impact on retrieval quality or accuracy", "Smaller chunks always guarantee better retrieval regardless of context loss", "Larger chunks always improve performance with no downsides"], answerIndex: 0 },
                            { question: "How does \"chunk overlap\" (allowing adjacent chunks to share some text) help mitigate context loss in document chunking strategies?", options: ["It helps preserve continuity for information that might span chunk boundaries, reducing the risk of splitting important context awkwardly", "Chunk overlap always duplicates irrelevant information with no benefit", "Overlap has no effect on retrieval quality at chunk boundaries", "Chunk overlap eliminates the need for embeddings entirely"], answerIndex: 0 },
                            { question: "Why might a Document QA system use a \"retrieve-then-read\" pipeline instead of feeding the entire document corpus into the model directly?", options: ["Retrieval narrows down to the most relevant sections first, making it feasible to work within context window limits and improving focus", "Retrieve-then-read pipelines always require more context than feeding the entire corpus directly", "This approach eliminates the need for any embedding or search mechanism", "Feeding the entire corpus directly always produces better results with no downsides"], answerIndex: 0 },
                            { question: "What is a potential failure mode in RAG-based Document QA when the retrieval step returns irrelevant or insufficient context?", options: ["The model may generate an inaccurate, incomplete, or hallucinated answer since it can only reason over what was retrieved", "The model will always automatically know the correct answer regardless of retrieved context", "Irrelevant retrieval never impacts final answer quality", "The system will always refuse to answer if retrieval is imperfect"], answerIndex: 0 },
                            { question: "Why might re-ranking retrieved document chunks (using a secondary, often more precise model) improve Document QA accuracy compared to relying solely on initial vector similarity search?", options: ["Initial retrieval (often based on approximate similarity) may include marginally relevant results, and re-ranking can refine and prioritize the most truly relevant chunks before final answer generation", "Re-ranking always degrades the quality of retrieved results", "Initial vector similarity search always perfectly identifies the most relevant chunks with no need for refinement", "Re-ranking is only applicable to image retrieval tasks, not text"], answerIndex: 0 },
                            { question: "How does the choice of embedding model used for document indexing impact the overall effectiveness of a Document QA system?", options: ["The embedding model's ability to capture semantic similarity directly affects how well relevant document sections are retrieved for a given query", "Embedding model choice has no measurable effect on retrieval or answer quality", "All embedding models produce mathematically identical results regardless of training", "Embeddings are irrelevant once a document has been chunked"], answerIndex: 0 },
                            { question: "Why might citation/source attribution (showing which part of a document supports an answer) be particularly valuable in high-stakes domains like legal or medical Document QA?", options: ["It allows users to independently verify the answer's accuracy and traceability to the original source, which is critical when errors carry significant consequences", "Citations are irrelevant in any domain regardless of stakes involved", "High-stakes domains require less verification than casual use cases", "Source attribution always reduces trust in the system's answers"], answerIndex: 0 },
                            { question: "What is a key difference between \"open-domain\" and \"closed-domain\" (document-grounded) question answering?", options: ["Closed-domain QA restricts answers to information within a specific provided document/corpus, while open-domain QA may draw on broader general knowledge", "Open-domain and closed-domain QA are functionally identical with no meaningful distinction", "Closed-domain QA always ignores the provided document entirely", "Open-domain QA is restricted exclusively to a single specific document"], answerIndex: 0 },
                            { question: "Why might hybrid search (combining keyword-based and semantic/vector search) sometimes outperform pure semantic search alone in document retrieval?", options: ["Keyword matching can catch exact terms or rare entities that semantic similarity might overlook, complementing the broader contextual matching of vector search", "Hybrid search always performs worse than pure semantic search in every scenario", "Keyword-based search and semantic search always produce identical results", "Combining search methods has no practical benefit in retrieval systems"], answerIndex: 0 },
                            { question: "How can ambiguous or multi-part questions pose a challenge for a Document QA system relying on a single retrieval step?", options: ["A single retrieval pass might fail to gather all necessary context if different parts of the question require information from different, possibly non-adjacent, sections of the document", "Multi-part questions are always trivially answered through a single retrieval step", "Question complexity has no relationship to retrieval effectiveness", "Ambiguous questions are always rejected automatically by Document QA systems"], answerIndex: 0 },
                            { question: "Why might evaluating a Document QA system require checking for both \"answer correctness\" and \"groundedness\" (whether the answer is actually supported by retrieved context) separately?", options: ["An answer could coincidentally be factually correct (from pretrained knowledge) while not actually being supported by the provided document, which matters for trustworthiness and consistency", "Correctness and groundedness always measure exactly the same thing", "Groundedness is irrelevant if the final answer happens to be correct", "Document QA systems can only ever produce grounded answers, never ungrounded ones"], answerIndex: 0 },
                            { question: "What role does query expansion or reformulation play in improving retrieval for Document QA?", options: ["Rephrasing or expanding the user's original query can help surface relevant document sections that might be missed by the original literal phrasing", "Query expansion always reduces the relevance of retrieved results", "The original query phrasing is always optimal and should never be modified", "Query reformulation has no impact on retrieval effectiveness"], answerIndex: 0 },
                            { question: "Why might maintaining metadata (e.g., page numbers, section titles, document source) alongside chunked text be valuable in a Document QA pipeline?", options: ["Metadata enables more precise citation, filtering, and context for users verifying or navigating to the original source location", "Metadata serves no practical purpose once chunks are embedded", "Metadata always confuses retrieval algorithms and degrades performance", "Document QA systems function identically with or without any metadata"], answerIndex: 0 },
                            { question: "How might a Document QA system handle a question whose answer requires synthesizing information from multiple, separately retrieved chunks?", options: ["The system would need to combine and reason across the retrieved chunks collectively, rather than relying on a single isolated piece of context", "Such questions are always impossible for any Document QA system to address", "Multiple chunks are always automatically merged into a single answer with no reasoning required", "Synthesis across chunks has no bearing on Document QA system design"], answerIndex: 0 },
                            { question: "Why is \"context window budget management\" (deciding how many retrieved chunks to include) an important trade-off in RAG-based Document QA?", options: ["Including more chunks may improve coverage of relevant information but increases token cost and risk of exceeding context limits or diluting focus", "Including unlimited chunks always improves accuracy with no downsides", "Context window budget is irrelevant since retrieval systems have no limits", "Fewer chunks always guarantee better answers regardless of relevance"], answerIndex: 0 },
                            { question: "What is a potential issue when document content changes frequently (e.g., a constantly updated knowledge base) for a RAG-based QA system?", options: ["The vector index/embeddings need to be kept up to date, or the system risks retrieving and answering based on stale or outdated information", "Document updates never require any changes to the underlying retrieval index", "RAG systems automatically and instantly reflect any document changes with no additional processing", "Frequently changing content has no impact on Document QA system maintenance"], answerIndex: 0 },
                            { question: "Why might a confidence or uncertainty indicator be valuable when a Document QA system cannot find sufficiently relevant context for a question?", options: ["It allows the system to communicate to the user that it lacks sufficient grounding, rather than potentially fabricating a plausible-sounding but unsupported answer", "Confidence indicators have no practical value in Document QA applications", "Systems should always provide a confident-sounding answer regardless of available context", "Lack of relevant context never affects answer reliability"], answerIndex: 0 },
                            { question: "How might fine-tuning an embedding model on domain-specific document pairs (rather than using a generic pretrained embedding model) improve Document QA retrieval performance?", options: ["Domain-specific fine-tuning can better capture the particular terminology, relationships, and relevance patterns specific to that field, improving retrieval precision", "Fine-tuning embeddings always degrades retrieval performance compared to generic models", "Generic pretrained embeddings always outperform any domain-specific fine-tuning", "Embedding model choice has no relationship to domain-specific retrieval quality"], answerIndex: 0 },
                            { question: "Why might a Document QA system implement a \"no answer found\" or \"insufficient information\" response option rather than always forcing an answer?", options: ["It promotes honesty and reduces hallucination risk when the available document content genuinely doesn't address the user's question", "Systems should always generate a confident answer regardless of whether supporting information exists", "\"No answer found\" responses always indicate a system failure with no legitimate use case", "Forcing an answer in every case always improves user trust and system reliability"], answerIndex: 0 },
                            { question: "Which statement best summarizes a holistic approach to building a reliable, production-grade Document QA system?", options: ["Effective chunking, high-quality retrieval (potentially hybrid/re-ranked), careful context budget management, grounded answer generation, and honest handling of insufficient information together produce the most trustworthy results", "Simply embedding an entire document and asking any question is sufficient for production-grade reliability", "Retrieval quality has no bearing on the trustworthiness of the final generated answer", "Citation and groundedness checks are unnecessary extras with no practical value"], answerIndex: 0 },
                          ]
            }
          }
        ]
      },
      {
        title: "Module 4",
        objective: "Advanced LLM Systems",
        tutorial: "Lab 4: Retrieval-Augmented Generation",
        labTitle: "Lab 4: Retrieval-Augmented Generation",
        experiments: [
          { 
            id: "llms-w4-1", 
            title: "Creating Embeddings", 
            desc: "Creating Embeddings", 
            code: `import numpy as np\n\ndef generate_mock_embedding(text, dimension=4):\n    # Simulated mapping logic using character weight scores\n    np.random.seed(sum(ord(c) for c in text) % 100)\n    raw_vector = np.random.randn(dimension)\n    \n    # L2 Vector Normalization calculation\n    norm = np.linalg.norm(raw_vector)\n    normalized_vector = raw_vector / norm if norm > 0 else raw_vector\n    return normalized_vector.tolist()\n\n# Verification Pass\ntext_chunk = "Retrieval systems require fast data validation pipelines."\nvector = generate_mock_embedding(text_chunk)\nprint(f"Generated Vector Representation:\\n{np.round(vector, 4)}")`,
            content: {
              aim: {
                text: "To build a document ingestion pipeline that systematically chunks raw text into semantically coherent blocks, converts each chunk into a dense high-dimensional vector using a pre-trained embedding model, applies L2 normalization to standardize all vector magnitudes to 1.0, and stores the resulting vectors in a structured format ready for similarity-based retrieval.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "From Words to Numbers to Meaning",
                                        "body": [
                                                      "A computer cannot read meaning \u2014 it only works with numbers. Embedding models translate every paragraph into a unique list of numbers that captures its meaning as a location on a giant invisible map.",
                                                      "Raw document (PDF / text)  \u2192  Chunking 200\u2013500 words each  \u2192  Embedding model chunk \u2192 vector  \u2192  L2 Normalise magnitude = 1.0  \u2192  Store in vector database"
                                        ]
                          },
                          {
                                        "title": "Why These Steps Matter",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Step</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Why It Is Needed</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Chunking</td><td class=\"p-3 text-muted-foreground\">One big blob = one blurry average of everything. Chunks keep ideas separate and findable.</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Embedding</td><td class=\"p-3 text-muted-foreground\">Converts meaning into numbers the computer can compare mathematically.</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">L2 Normalisation</td><td class=\"p-3 text-muted-foreground\">Makes all vectors the same length so comparisons are fair and fast.</td></tr></tbody></table>',",
                                                      "![Creating Embeddings](/chunking_embedding_illustration.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is an embedding?", options: ["A numerical vector representing text", "An image file", "A type of font", "A grammar rule"], answerIndex: 0 },
                            { question: "Embeddings convert text into:", options: ["Numbers", "Sounds", "Colors", "Images"], answerIndex: 0 },
                            { question: "Why are embeddings used in AI systems?", options: ["To let machines compare meaning mathematically", "To delete text", "To compress audio", "To translate languages"], answerIndex: 0 },
                            { question: "Which is a common embedding model type?", options: ["Sentence-transformer models", "JPEG encoder", "SQL database", "PDF reader"], answerIndex: 0 },
                            { question: "Similar meaning texts have embeddings that are:", options: ["Close together in vector space", "Always identical", "Far apart", "Always zero"], answerIndex: 0 },
                            { question: "What is \"vector dimension\" in an embedding?", options: ["One value in the numerical array", "The font size", "The word count", "The file size"], answerIndex: 0 },
                            { question: "Which tool is commonly used to generate embeddings via API?", options: ["An embedding endpoint (e.g., OpenAI/Anthropic embeddings API)", "An image generator", "A spreadsheet macro", "A video editor"], answerIndex: 0 },
                            { question: "What does \"cosine similarity\" measure between two embeddings?", options: ["How similar their direction/meaning is", "Their file size", "Their character count", "Their color value"], answerIndex: 0 },
                            { question: "Why convert a sentence into an embedding before search?", options: ["To compare it numerically to other text", "To delete the sentence", "To translate it", "To compress it as an image"], answerIndex: 0 },
                            { question: "What is a \"vector store\" or \"vector database\"?", options: ["A system for storing and searching embeddings", "A music player", "A spreadsheet app", "An image gallery"], answerIndex: 0 },
                            { question: "Which of these is an example use of embeddings?", options: ["Finding similar documents", "Editing photos", "Compiling code", "Playing audio"], answerIndex: 0 },
                            { question: "Are embeddings human-readable text?", options: ["No, they are numeric vectors", "Yes, always plain English", "Yes, always images", "Yes, always HTML"], answerIndex: 0 },
                            { question: "What happens when you embed two unrelated sentences?", options: ["Their vectors are typically far apart", "Their vectors are always identical", "They merge into one sentence", "They are deleted"], answerIndex: 0 },
                            { question: "Why might embedding dimension size matter (e.g., 384 vs 1536)?", options: ["It affects detail captured and storage/compute cost", "It changes the text's spelling", "It has no effect on anything", "It only affects font size"], answerIndex: 0 },
                            { question: "What is needed to generate an embedding via an API?", options: ["Input text and an API call to an embedding model", "An image file only", "A microphone", "A printed document"], answerIndex: 0 },
                            { question: "Which best describes \"semantic meaning\" captured by embeddings?", options: ["The underlying meaning, not just exact words", "Only exact spelling", "Only font formatting", "Only the number of characters"], answerIndex: 0 },
                            { question: "Why are embeddings useful for search instead of plain keyword matching?", options: ["They can match meaning even with different wording", "They only match exact words", "They cannot compare any two texts", "They work only on images"], answerIndex: 0 },
                            { question: "What is a typical first step in a RAG pipeline involving embeddings?", options: ["Convert documents into embeddings", "Delete all documents", "Print documents on paper", "Translate documents"], answerIndex: 0 },
                            { question: "Can the same text produce different embeddings from different models?", options: ["Yes, different models produce different vectors", "No, all models produce identical vectors", "Only images can be embedded", "Embeddings never vary"], answerIndex: 0 },
                            { question: "Which best summarizes the purpose of embeddings?", options: ["Represent meaning as numbers for comparison", "Replace all human writing", "Generate images from text", "Compress files for storage only"], answerIndex: 0 },
                          ],
              procedure: [
                "Data Extraction: Programmatically load target documents, stripping out irrelevant HTML, markdown formatting, or raw image bytes.",
                "Intelligent Chunking: Apply a recursive text splitter to break the documents into chunks of ~500 tokens, maintaining an overlap of ~50 tokens to preserve transitional context.",
                "Batch Embedding API Call: Transmit the array of text chunks to a cloud-based or local embedding endpoint to minimize network latency via batching.",
                "Extract Floating-Point Tensors: Receive the generated high-dimensional arrays from the API response.",
                "L2 Normalization: Verify or apply mathematical normalization so all vectors align to a unit sphere geometry.",
                "Database Insertion: Package the normalized vectors alongside their original source text and metadata attributes, writing them to persistent storage."
              ],
              posttest: [
                            { question: "Why do embedding models map similar-meaning sentences to nearby vectors?", options: ["They're trained so semantically related text ends up close in vector space", "It's random chance with no training involved", "Only identical sentences can be close", "Vectors are assigned alphabetically"], answerIndex: 0 },
                            { question: "What's a key trade-off of higher-dimensional embeddings?", options: ["More nuance captured, but higher storage/compute cost", "Always faster with no cost increase", "Always lower accuracy", "No trade-off exists"], answerIndex: 0 },
                            { question: "Why might domain-specific fine-tuned embeddings outperform general-purpose ones?", options: ["They better capture domain terminology and relationships", "Fine-tuning always reduces accuracy", "General embeddings are always superior", "Domain has no effect on embedding quality"], answerIndex: 0 },
                            { question: "What does normalizing embedding vectors (to unit length) typically simplify?", options: ["Cosine similarity calculations", "Font rendering", "File compression", "Text translation"], answerIndex: 0 },
                            { question: "Why can two paraphrased sentences have very similar embeddings despite different wording?", options: ["Embeddings capture meaning, not just surface text", "Embeddings only match exact characters", "Paraphrasing always produces opposite vectors", "This never actually happens"], answerIndex: 0 },
                            { question: "What issue can arise from embedding overly long documents as a single vector?", options: ["Important details may get diluted or lost", "The vector becomes an image", "It always improves accuracy", "No issue arises ever"], answerIndex: 0 },
                            { question: "Why is consistent embedding model use important between indexing and querying?", options: ["Different models produce incompatible vector spaces", "It has no impact on search results", "Models always produce identical spaces", "Only the query model matters, not indexing"], answerIndex: 0 },
                            { question: "What is \"embedding drift\" a concern for in long-running systems?", options: ["Switching embedding model versions can invalidate prior vector comparisons", "Vectors physically move over time", "Drift only affects images", "It's not a real concern"], answerIndex: 0 },
                            { question: "Why might batch embedding generation be preferred over one-by-one calls at scale?", options: ["It improves efficiency and reduces API overhead", "It always produces worse embeddings", "Batching is impossible for text", "It has no effect on performance"], answerIndex: 0 },
                            { question: "How does embedding quality typically affect downstream RAG retrieval accuracy?", options: ["Poor embeddings lead to less relevant retrieved results", "Embedding quality has no link to retrieval", "Retrieval is unrelated to embeddings", "Better embeddings always worsen retrieval"], answerIndex: 0 },
                            { question: "Why might embeddings fail to capture exact keyword/entity matches well (e.g., product codes)?", options: ["Semantic models prioritize meaning over exact tokens", "Embeddings always match exact strings perfectly", "This is never an issue", "Embeddings only work on numbers"], answerIndex: 0 },
                            { question: "What's a benefit of combining embeddings with metadata filters (e.g., date, category)?", options: ["More precise, filtered semantic search", "It removes the need for embeddings", "It always slows down search with no benefit", "Metadata cannot be combined with vectors"], answerIndex: 0 },
                            { question: "Why might dimensionality reduction (PCA) be applied to embeddings before visualization?", options: ["To project high dimensions into 2D/3D for plotting", "To increase dimensions", "To delete the embeddings", "To translate the text"], answerIndex: 0 },
                            { question: "What's a risk of using outdated/stale embeddings in a frequently updated knowledge base?", options: ["Search results may reflect old, inaccurate content", "Stale embeddings always improve accuracy", "This has no effect on results", "Embeddings never go stale"], answerIndex: 0 },
                            { question: "Why might embedding cost matter at scale (millions of documents)?", options: ["API/embedding costs scale with volume of text processed", "Embeddings are always free regardless of volume", "Cost has no relation to text volume", "Embeddings cannot be generated at scale"], answerIndex: 0 },
                            { question: "What is a common method to evaluate embedding quality?", options: ["Similarity/retrieval benchmark tasks", "Counting letters in each word", "Checking font consistency", "Measuring file size only"], answerIndex: 0 },
                            { question: "Why might multilingual embedding models be valuable for global applications?", options: ["They can map similar meanings across different languages to nearby vectors", "They only work for English", "Multilingual models cannot compare any text", "Language has no effect on embeddings"], answerIndex: 0 },
                            { question: "What's a potential downside of using a very small embedding dimension (e.g., 8)?", options: ["Limited capacity to capture nuanced meaning", "Always perfect accuracy", "No downside exists", "It only affects image quality"], answerIndex: 0 },
                            { question: "Why might embeddings of sentences with negation (e.g., \"not good\") sometimes be close to their positive counterpart (\"good\")?", options: ["Embedding models can struggle to fully capture negation nuance", "Negation is always perfectly captured", "This never happens", "Negation only affects images"], answerIndex: 0 },
                            { question: "Which best summarizes a key best practice when deploying embeddings in production?", options: ["Use a consistent, well-evaluated model and keep the index updated", "Mix random embedding models freely", "Never re-evaluate embedding quality", "Avoid using any vector store"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w4-2", 
            title: "Semantic Search", 
            desc: "Semantic Search", 
            code: `import numpy as np\n\ndef rank_semantic_chunks(query_vector, document_embeddings, top_k=2):\n    q = np.array(query_vector)\n    d_matrix = np.array(document_embeddings)\n    \n    # Calculate row-wise dot product similarity over normalized structures\n    scores = np.dot(d_matrix, q) / (np.linalg.norm(d_matrix, axis=1) * np.linalg.norm(q))\n    \n    # Isolate indices in descending order\n    top_indices = np.argsort(scores)[::-1][:top_k]\n    return [(idx, scores[idx]) for idx in top_indices]\n\n# Test Data Mocking\nmock_query = [0.1, 0.9, 0.0, 0.2]\nmock_docs = [\n    [0.12, 0.88, 0.01, 0.18], # High match\n    [0.85, 0.05, 0.10, 0.02], # Low match\n    [0.15, 0.82, 0.05, 0.22]  # Moderate match\n]\nprint("Top matched indices and scores:", rank_semantic_chunks(mock_query, mock_docs))`,
            content: {
              aim: {
                text: "To implement a vector similarity search engine using cosine similarity as the ranking metric, enabling natural language queries to retrieve the most contextually relevant document chunks from a vector index \u2014 bypassing keyword matching entirely \u2014 and compare the performance trade-offs between brute-force Flat Index search and Approximate Nearest Neighbor indexing using HNSW graphs.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "Keyword Search vs Semantic Search",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Keyword Search</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Semantic Search</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Matches on</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Exact same words</td><td class=\"p-3 text-muted-foreground\">Meaning and concept</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">'car' finds</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Only 'car'</td><td class=\"p-3 text-muted-foreground\">'vehicle', 'automobile', 'sedan' too</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Fails when</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Different words, same idea</td><td class=\"p-3 text-muted-foreground\">Almost never</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Method</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">String comparison</td><td class=\"p-3 text-muted-foreground\">Cosine similarity of vectors</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "The Search Flow",
                                        "body": [
                                                      "User question  \u2192  Embed the question \u2192 vector  \u2192  Compare against all stored vectors  \u2192  Rank by cosine similarity score  \u2192  Return top matching chunks"
                                        ]
                          },
                          {
                                        "title": "Flat Index vs HNSW \u2014 Speed Trade-off",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Index Type</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Method</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Speed</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Accuracy</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Use When</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Flat Index</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Check every single vector one by one</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Slow (millions = minutes)</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">100%</td><td class=\"p-3 text-muted-foreground\">Small datasets</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">HNSW Graph</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Navigate a smart graph, skip irrelevant zones</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Fast (millions = milliseconds)</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">~99%</td><td class=\"p-3 text-muted-foreground\">Production systems</td></tr></tbody></table>",
                                                      "![Semantic Search](/semantic_search_illustration.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is semantic search?", options: ["Searching based on meaning, not just exact words", "Searching by file size", "Searching by color", "Searching by font"], answerIndex: 0 },
                            { question: "Semantic search relies on:", options: ["Embeddings/vector similarity", "Exact keyword matches only", "Random selection", "Image recognition only"], answerIndex: 0 },
                            { question: "Why might semantic search return relevant results even without exact keyword matches?", options: ["It compares meaning via vectors", "It guesses randomly", "It only matches spelling", "It ignores the query entirely"], answerIndex: 0 },
                            { question: "What is typically computed to rank semantic search results?", options: ["Similarity score (e.g., cosine similarity)", "File size", "Alphabetical order", "Random number"], answerIndex: 0 },
                            { question: "What is \"keyword search\" in contrast to semantic search?", options: ["Matching exact words/terms", "Matching meaning", "Matching images", "Matching colors"], answerIndex: 0 },
                            { question: "Why might semantic search outperform keyword search for natural language queries?", options: ["It understands intent/meaning beyond literal words", "It only works with numbers", "It ignores the query", "It always returns zero results"], answerIndex: 0 },
                            { question: "What does \"top-k retrieval\" mean in semantic search?", options: ["Returning the k most similar results", "Returning all possible results", "Returning zero results", "Returning only images"], answerIndex: 0 },
                            { question: "Which is a common use case for semantic search?", options: ["Finding relevant documents in a knowledge base", "Editing photos", "Compiling code", "Playing music"], answerIndex: 0 },
                            { question: "What is a \"vector index\" used for in semantic search?", options: ["Efficiently searching through many embeddings", "Storing images only", "Compressing audio", "Formatting fonts"], answerIndex: 0 },
                            { question: "Why convert a search query into an embedding?", options: ["To compare it against document embeddings", "To delete the query", "To translate it", "To compress it"], answerIndex: 0 },
                            { question: "What might \"hybrid search\" combine?", options: ["Keyword search and semantic search", "Two unrelated images", "Two video files", "Two spreadsheets"], answerIndex: 0 },
                            { question: "Why might semantic search struggle with exact codes or IDs (e.g., \"SKU-12345\")?", options: ["It prioritizes meaning over exact string matching", "It always matches exact codes perfectly", "Codes are always ignored entirely", "This never causes any issue"], answerIndex: 0 },
                            { question: "What is the role of a similarity threshold in semantic search?", options: ["Filtering out results below a certain relevance score", "Setting the font size", "Compressing files", "Translating text"], answerIndex: 0 },
                            { question: "Which best describes \"relevance ranking\"?", options: ["Ordering results by how closely they match the query's meaning", "Ordering results alphabetically only", "Ordering results randomly", "Ordering results by file size only"], answerIndex: 0 },
                            { question: "Why might a chatbot use semantic search before answering a question?", options: ["To find relevant context/documents to base its answer on", "To delete the user's question", "To generate a random image", "To compress the conversation"], answerIndex: 0 },
                            { question: "What does \"nearest neighbor search\" refer to in this context?", options: ["Finding the closest matching vectors to a query vector", "Finding the farthest vectors", "Finding random vectors", "Finding identical text strings only"], answerIndex: 0 },
                            { question: "Why might semantic search be considered \"fuzzy\" compared to exact match search?", options: ["It can find related but not identically worded content", "It only matches identical text", "It always returns nothing", "It only works with images"], answerIndex: 0 },
                            { question: "What kind of database is typically used to power large-scale semantic search?", options: ["A vector database", "A spreadsheet file", "An image gallery", "A music library"], answerIndex: 0 },
                            { question: "Why might filtering by metadata (e.g., date) be combined with semantic search?", options: ["To narrow results to relevant subsets in addition to meaning-based matching", "Metadata cannot be combined with search", "It always removes all results", "It has no practical use"], answerIndex: 0 },
                            { question: "Which best summarizes the goal of semantic search?", options: ["Retrieve the most meaningfully relevant content for a query", "Retrieve content randomly", "Retrieve only exact keyword matches", "Retrieve only images"], answerIndex: 0 },
                          ],
              procedure: [
                "Query Vectorization: Pass the incoming user search string through the exact same embedding model used to index the database.",
                "Matrix Operations: Calculate the dot product between the query vector and the massive matrix of stored document vectors.",
                "Distance Ranking: Sort the resulting scalar values in descending order to identify vectors with the highest geometric similarity.",
                "Top-K Extraction: Isolate the top $K$ scoring vectors (typically the top 3 to 5 results).",
                "Metadata Filtering: Apply pre-filtering rules (e.g., matching a specific date range or author ID) to dramatically reduce the vector search space before mathematical calculation.",
                "Context Retrieval: Query the database using the top-K vector indices to retrieve the original, human-readable text chunks."
              ],
              posttest: [
                            { question: "Why can semantic search return results with no shared keywords with the query?", options: ["It matches based on vector similarity/meaning, not literal terms", "It always requires exact word overlap", "This scenario is impossible", "It only matches identical strings"], answerIndex: 0 },
                            { question: "What is \"Approximate Nearest Neighbor\" (ANN) search used for in large-scale semantic search?", options: ["Quickly finding close-enough matches without exhaustive comparison, trading some accuracy for speed", "Guaranteeing 100% exact results always", "Searching only images", "Replacing all embeddings with keywords"], answerIndex: 0 },
                            { question: "Why might hybrid search (keyword + semantic) outperform pure semantic search for queries containing specific identifiers?", options: ["Keyword matching can catch exact terms that semantic similarity might miss", "Hybrid search always performs worse than pure semantic search", "Keywords and semantics always conflict and cancel out", "Specific identifiers are irrelevant to retrieval"], answerIndex: 0 },
                            { question: "What's a key trade-off when choosing a higher \"k\" value in top-k retrieval?", options: ["More potential coverage but possibly more irrelevant results and higher cost", "Higher k always guarantees perfect relevance with no downside", "k has no effect on result quality or cost", "Lower k always retrieves more relevant results than higher k"], answerIndex: 0 },
                            { question: "Why might re-ranking retrieved semantic search results with a secondary model improve final quality?", options: ["Initial vector retrieval can include marginally relevant results that a more precise re-ranker can refine", "Re-ranking always degrades result quality", "Initial retrieval is always perfectly ranked", "Re-ranking is only useful for image search"], answerIndex: 0 },
                            { question: "How does the choice of similarity metric (cosine vs. dot product vs. Euclidean) potentially affect search results?", options: ["Different metrics can produce different rankings depending on vector properties like normalization", "All similarity metrics always produce identical rankings", "Similarity metric choice has no effect on search results", "Only Euclidean distance is ever valid for semantic search"], answerIndex: 0 },
                            { question: "Why might semantic search underperform on queries requiring exact numerical or factual lookups (e.g., \"What is the value in cell B7?\")?", options: ["Semantic embeddings prioritize general meaning over precise symbolic/structured data", "Semantic search always excels at exact numerical lookups", "This scenario never causes any retrieval difficulty", "Numerical queries are identical to semantic queries in every way"], answerIndex: 0 },
                            { question: "What is a \"false positive\" in the context of semantic search retrieval?", options: ["A result with high similarity score that isn't actually relevant to the user's intent", "A result that is always correct", "A result with zero similarity score", "A keyword-only match"], answerIndex: 0 },
                            { question: "Why might query reformulation/expansion improve semantic search recall for ambiguous queries?", options: ["Rephrasing can surface relevant results that the original phrasing's embedding might miss", "Reformulation always reduces the number of relevant results", "Original phrasing is always optimal with no room for improvement", "Query expansion has no effect on retrieval coverage"], answerIndex: 0 },
                            { question: "How can indexing strategy (e.g., chunk size for documents) impact semantic search effectiveness?", options: ["Chunks too large or too small can dilute relevance or lose context, affecting match quality", "Chunk size has no bearing on search results", "Larger chunks always improve relevance with no downside", "Indexing strategy is irrelevant to semantic search"], answerIndex: 0 },
                            { question: "Why might evaluating semantic search require metrics like precision and recall rather than just \"looks relevant\"?", options: ["Quantitative metrics provide objective, comparable measures of retrieval quality across systems/configurations", "Precision and recall are irrelevant to search evaluation", "Subjective impressions always provide more reliable evaluation", "Semantic search cannot be meaningfully evaluated"], answerIndex: 0 },
                            { question: "What role does embedding model choice play in semantic search quality?", options: ["It directly determines how well meaning/similarity is captured for matching", "Embedding model has no effect on search results", "All embedding models produce identical search outcomes", "Embedding choice only affects font rendering"], answerIndex: 0 },
                            { question: "Why might combining metadata filters with vector similarity scores create more precise search results than vectors alone?", options: ["Filters can narrow the candidate pool to relevant subsets before/after ranking by semantic similarity", "Metadata filters always degrade search precision", "Filters and vector similarity cannot be combined technically", "Metadata has no relevance to search precision"], answerIndex: 0 },
                            { question: "How might semantic search results differ across different embedding model versions for the identical query and documents?", options: ["Different models/versions can produce different vector spaces, leading to different similarity rankings", "All embedding versions always produce identical results", "Model version has no impact on search ranking", "Search results are independent of the embedding model entirely"], answerIndex: 0 },
                            { question: "Why is maintaining index freshness (re-embedding updated content) important for semantic search systems on dynamic data?", options: ["Outdated embeddings may not reflect current document content, leading to stale or inaccurate retrieval", "Index freshness has no impact on retrieval accuracy", "Embeddings never need updating once created", "Dynamic data has no relationship to semantic search quality"], answerIndex: 0 },
                            { question: "What is a potential downside of over-relying on a single similarity score threshold to filter results?", options: ["It may incorrectly exclude relevant results or include irrelevant ones depending on query/document variability", "Thresholds always perfectly separate relevant from irrelevant results", "Thresholds have no effect on result filtering", "A single threshold works perfectly across all possible queries"], answerIndex: 0 },
                            { question: "Why might latency be a significant consideration when deploying semantic search at scale (millions of vectors)?", options: ["Searching large vector spaces can be computationally intensive, requiring efficient indexing (e.g., ANN methods) for acceptable speed", "Latency is irrelevant regardless of dataset size", "Vector search is always instantaneous regardless of scale", "Scale has no bearing on search performance"], answerIndex: 0 },
                            { question: "How can \"cold start\" issues affect semantic search systems with little to no existing indexed data?", options: ["Limited indexed content can result in poor or sparse retrieval results until sufficient data is embedded", "Cold start issues never occur in semantic search", "Index size has no bearing on retrieval quality", "Semantic search works identically regardless of index size"], answerIndex: 0 },
                            { question: "Why might A/B testing different embedding models or retrieval configurations be valuable before production deployment?", options: ["It allows empirical comparison of retrieval quality and relevance across configurations on real or representative queries", "A/B testing has no practical value in search system development", "All configurations always perform identically", "Production deployment requires no prior testing or comparison"], answerIndex: 0 },
                            { question: "Which statement best reflects a robust approach to building an effective semantic search system?", options: ["Combining a well-evaluated embedding model, smart chunking, metadata filtering, and possibly hybrid/re-ranking strategies tends to yield the best results", "Any embedding model and default settings are always sufficient for production use", "Evaluation and tuning provide no measurable benefit to search quality", "Keyword search alone is always superior to any semantic approach"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w4-3", 
            title: "Building a Simple RAG Pipeline", 
            desc: "Building a Simple RAG Pipeline", 
            code: `def compile_rag_execution_payload(query, document_source_dict, match_idx_list):\n    # 1. Harvest matching context snippets from database records\n    retrieved_context_blocks = []\n    for idx in match_idx_list:\n        if idx in document_source_dict:\n            retrieved_context_blocks.append(document_source_dict[idx])\n            \n    context_str = " ".join(retrieved_context_blocks)\n    \n    # 2. Formulate the explicit system constraints and append variables\n    augmented_prompt = (\n        f"System: Answer the question using only the provided context. If unsure, say 'Not Found'.\\n"\n        f"Context: {context_str}\\n"\n        f"Question: {query}\\n"\n        f"Answer:"\n    )\n    return augmented_prompt\n\n# Run Pipeline Compilation Preview\ndb_records = {\n    0: "Version 4.2 framework updates deprecate historical encryption keys.",\n    1: "Session validation cookies expire automatically after 30 minutes."\n}\ntarget_matches = [0]\nprint(compile_rag_execution_payload("What happens to encryption keys in v4.2?", db_records, target_matches))`,
            content: {
              aim: {
                text: "To construct a complete end-to-end Retrieval-Augmented Generation system that intercepts user queries, executes semantic search against a live vector database, injects the top retrieved chunks as grounded context into a structured LLM prompt, and produces factually verifiable answers \u2014 directly solving the twin limitations of knowledge cutoff dates and hallucination in standalone language models.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "The Two Problems RAG Fixes",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">LLM Problem</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What Happens</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">RAG Fix</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Knowledge cutoff</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">AI trained in 2023 has no idea about 2025 events</td><td class=\"p-3 text-muted-foreground\">Vector DB is updated; AI reads fresh facts before answering</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Hallucination</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">AI confidently invents facts it doesn't know</td><td class=\"p-3 text-muted-foreground\">AI is forced to answer only from retrieved real documents</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "The RAG Orchestration Loop",
                                        "body": [
                                                      "User asks a question  \u2192  Semantic search on vector DB  \u2192  Retrieve top 3\u20135 chunks  \u2192  Inject chunks into prompt  \u2192  LLM reads & answers \u2713"
                                        ]
                          },
                          {
                                        "title": "Advanced RAG Upgrades",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Upgrade</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">What It Does</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Cross-Encoder Reranking</td><td class=\"p-3 text-muted-foreground\">Double-checks retrieved chunks and reorders by true relevance before injection</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Query Expansion</td><td class=\"p-3 text-muted-foreground\">Rewrites a vague user question into a better optimised search query first</td></tr></tbody></table>",
                                                      "![RAG Pipeline](/rag_pipeline_illustration.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What does RAG stand for?", options: ["Retrieval-Augmented Generation", "Random Access Generation", "Rapid AI Grouping", "Recursive Answer Generation"], answerIndex: 0 },
                            { question: "What is the main idea behind RAG?", options: ["Retrieve relevant info, then use it to generate an answer", "Generate answers with no external information", "Delete irrelevant documents permanently", "Translate documents into other languages"], answerIndex: 0 },
                            { question: "What are the typical main steps in a RAG pipeline?", options: ["Retrieve relevant chunks, then generate a response using them", "Compress, then encrypt", "Translate, then delete", "Train, then discard the model"], answerIndex: 0 },
                            { question: "Why is retrieval performed before generation in RAG?", options: ["To provide the model with relevant context for a more accurate answer", "To slow down the response intentionally", "Retrieval has no purpose in RAG", "To remove the need for any question"], answerIndex: 0 },
                            { question: "What is typically stored in a vector database in a RAG system?", options: ["Document embeddings", "Raw audio files", "Compressed images", "Spreadsheet formulas"], answerIndex: 0 },
                            { question: "Why might RAG reduce hallucination compared to relying purely on a model's pretrained knowledge?", options: ["Answers are grounded in retrieved, relevant source content", "RAG always increases hallucination", "RAG removes the need for any source content", "Hallucination is unrelated to grounding"], answerIndex: 0 },
                            { question: "What is the first step in setting up a basic RAG pipeline?", options: ["Splitting documents into chunks and creating embeddings", "Deleting all documents immediately", "Generating a final answer with no context", "Translating the question into another language"], answerIndex: 0 },
                            { question: "In a RAG pipeline, what does the LLM use to generate its final answer?", options: ["The user's question plus retrieved relevant context", "Only random text", "Only the model's name", "An unrelated image"], answerIndex: 0 },
                            { question: "Why might a RAG pipeline be useful for a company's internal knowledge base chatbot?", options: ["It allows answers grounded in the company's specific documents", "It requires no documents at all", "It only works with public internet data", "It eliminates the need for any chatbot"], answerIndex: 0 },
                            { question: "What is a common format for storing chunked document data with embeddings?", options: ["A vector database/index", "A printed paper file", "An image gallery", "A music playlist"], answerIndex: 0 },
                            { question: "Why split documents into smaller chunks before embedding them in RAG?", options: ["Smaller chunks improve retrieval precision and fit context limits", "Chunking always destroys all information", "Whole documents are always better than chunks", "Chunking is only relevant for images"], answerIndex: 0 },
                            { question: "What does \"top-k retrieval\" mean in a RAG pipeline?", options: ["Selecting the k most relevant chunks to use as context", "Selecting zero chunks", "Selecting all chunks always", "Selecting random images"], answerIndex: 0 },
                            { question: "Why might a RAG prompt include an instruction like \"answer only using the provided context\"?", options: ["To reduce the chance of the model adding unsupported information", "To make the model ignore the context entirely", "This instruction has no effect on output", "To force the model to generate images"], answerIndex: 0 },
                            { question: "What happens if retrieval in a RAG pipeline returns irrelevant chunks?", options: ["The final answer quality may suffer since it's based on poor context", "The final answer is always still perfectly accurate", "Irrelevant chunks always improve the answer", "Retrieval quality has no effect on output"], answerIndex: 0 },
                            { question: "Why is RAG often preferred over fine-tuning when knowledge changes frequently?", options: ["Updating a retrieval index is generally easier than retraining a model", "Fine-tuning is always instant and free", "RAG cannot be updated at all", "RAG and fine-tuning are identical processes"], answerIndex: 0 },
                            { question: "What role does the embedding model play in a RAG pipeline?", options: ["Converting text into vectors for similarity-based retrieval", "Generating the final answer text", "Formatting the user interface", "Compressing audio files"], answerIndex: 0 },
                            { question: "Why might a RAG system cite sources alongside its generated answer?", options: ["To let users verify the answer against the original document", "Citations have no value in RAG systems", "To hide where the information came from", "To make the answer less trustworthy"], answerIndex: 0 },
                            { question: "What is a basic test to verify a RAG pipeline is working correctly?", options: ["Asking a question with a known answer in the indexed documents and checking the response", "Deleting the vector database before testing", "Asking questions unrelated to any indexed content", "Disconnecting from the embedding API entirely"], answerIndex: 0 },
                            { question: "Why might a RAG pipeline fail to answer a question correctly if the answer isn't in the indexed documents?", options: ["The system can only generate answers grounded in retrieved content", "The system always knows answers regardless of indexed content", "Missing content has no effect on RAG accuracy", "RAG pipelines always search the entire internet automatically"], answerIndex: 0 },
                            { question: "Which best summarizes the purpose of a RAG pipeline?", options: ["Combine retrieval of relevant information with generation for grounded answers", "Generate answers purely at random", "Replace all documents with images", "Eliminate the need for any embedding model"], answerIndex: 0 },
                          ],
              procedure: [
                "Intercept Query: Capture the user's incoming plain-text question within the orchestration layer.",
                "Semantic Retrieval: Execute a vector search against the external database to retrieve the top 5 most semantically relevant context chunks.",
                "Context Concatenation: Join the retrieved text chunks into a single, cohesive reference string, annotating the source citations.",
                "Prompt Compilation: Inject the context string and the original user query into a rigid system template that mandates strict adherence to the provided facts.",
                "Generation Execution: Transmit the compiled RAG payload to the LLM generation endpoint.",
                "Response Routing: Extract the final grounded answer and stream it back to the user interface, alongside the database citations used to generate it."
              ],
              posttest: [
                            { question: "Why is the order of operations (retrieve, then generate) fundamental to how RAG mitigates hallucination?", options: ["Providing relevant retrieved context constrains the model toward grounded, source-supported answers rather than relying solely on parametric memory", "Order has no effect on hallucination risk", "Generation always happens before retrieval in RAG", "RAG eliminates the need for any generation step"], answerIndex: 0 },
                            { question: "What is a key reason chunk size and overlap settings significantly affect RAG pipeline performance?", options: ["They influence how much relevant context is preserved per chunk and how well information spanning chunk boundaries is retained", "Chunk size and overlap have no measurable effect on RAG quality", "Larger chunks always guarantee better performance with no downside", "Overlap always duplicates and degrades retrieval quality"], answerIndex: 0 },
                            { question: "Why might a \"retrieve-then-read\" RAG architecture struggle with multi-hop questions requiring reasoning across several documents?", options: ["A single retrieval pass might not surface all necessary pieces of information needed across different sources", "Multi-hop questions are always trivially solved by any RAG system", "RAG systems never need more than one retrieved chunk for any question", "Multi-hop reasoning has no relationship to retrieval coverage"], answerIndex: 0 },
                            { question: "How does prompt construction (combining retrieved context with the user query) typically influence RAG output quality?", options: ["Clear formatting that distinguishes context from the question helps the model use retrieved information appropriately", "Prompt construction has no impact on how the model uses retrieved context", "Context and query should always be merged into one indistinguishable block for best results", "The model ignores prompt structure entirely in RAG pipelines"], answerIndex: 0 },
                            { question: "Why might re-ranking retrieved chunks before passing them to the generation step improve a RAG pipeline's final answer quality?", options: ["It can prioritize the most genuinely relevant chunks over those that scored well on coarse similarity but are less useful", "Re-ranking always reduces the relevance of selected chunks", "Initial similarity ranking is always perfectly optimal", "Re-ranking has no role in RAG pipeline design"], answerIndex: 0 },
                            { question: "What is a potential downside of including too many retrieved chunks as context in a RAG prompt?", options: ["It can dilute focus, increase token cost, and risk exceeding context window limits", "More chunks always strictly improve answer quality with no downside", "Context window limits never apply to RAG prompts", "Token cost is unrelated to the number of included chunks"], answerIndex: 0 },
                            { question: "Why might a RAG system implement a fallback (\"I don't have enough information\") response rather than always generating an answer?", options: ["It promotes honesty when retrieved context doesn't sufficiently address the question, reducing hallucination risk", "Systems should always force a confident-sounding answer regardless of context sufficiency", "Fallback responses always indicate a broken system with no legitimate use", "Insufficient context never affects answer reliability"], answerIndex: 0 },
                            { question: "How can maintaining metadata (e.g., source, page number) alongside chunks improve a RAG pipeline's usefulness?", options: ["It enables precise citation and traceability back to the original source for verification", "Metadata serves no purpose once chunks are embedded", "Metadata always confuses the generation step", "RAG pipelines function identically with or without metadata"], answerIndex: 0 },
                            { question: "Why does keeping the vector index updated matter for a RAG pipeline built on frequently changing source documents?", options: ["Outdated embeddings can cause the system to retrieve and generate answers based on stale information", "Vector indexes never need updating once built", "Frequently changing documents have no effect on RAG accuracy", "RAG pipelines automatically reflect document changes instantly with no reprocessing"], answerIndex: 0 },
                            { question: "What is a key reason for evaluating both \"retrieval quality\" and \"generation quality\" separately when debugging a RAG pipeline?", options: ["Poor final answers could stem from either irrelevant retrieval or poor use of good retrieved context, so isolating the cause helps target fixes", "Retrieval and generation quality are always identical and cannot be separated", "Generation quality is irrelevant if retrieval succeeded", "Debugging RAG pipelines never requires examining intermediate steps"], answerIndex: 0 },
                            { question: "Why might hybrid retrieval (combining keyword and semantic search) be incorporated into a more robust RAG pipeline?", options: ["It can catch both exact-term matches and semantically related content, improving overall recall", "Hybrid retrieval always performs worse than semantic search alone", "Keyword and semantic search cannot be combined technically", "Hybrid retrieval has no practical benefit in RAG systems"], answerIndex: 0 },
                            { question: "How might query rewriting/expansion before retrieval improve a RAG pipeline's effectiveness for ambiguous user questions?", options: ["Reformulating the query can help surface more relevant chunks that the original phrasing's embedding might have missed", "Query rewriting always reduces retrieval relevance", "The original user phrasing is always optimal for retrieval", "Query expansion has no effect on retrieval coverage"], answerIndex: 0 },
                            { question: "Why is cost management an important consideration when scaling a RAG pipeline (embeddings + retrieval + generation) in production?", options: ["Each stage\u2014embedding generation, vector search, and LLM generation\u2014consumes resources that scale with usage volume", "RAG pipelines incur no costs regardless of scale", "Only the generation step has any associated cost", "Cost considerations are irrelevant until the system fails"], answerIndex: 0 },
                            { question: "What role does prompt engineering still play in a RAG pipeline, even though relevant context is retrieved automatically?", options: ["Clear instructions on how to use the context (e.g., \"cite sources,\" \"say if unsure\") still shape how the model utilizes that context", "Prompt engineering becomes entirely unnecessary once retrieval is added", "The model always uses retrieved context optimally regardless of prompt wording", "Retrieved context replaces the need for any instructions"], answerIndex: 0 },
                            { question: "Why might a RAG pipeline underperform if the embedding model and the generation model have very different training distributions for understanding text?", options: ["Mismatched semantic representations from retrieval can lead to context that, while embedded as \"similar,\" isn't actually useful for the generation model's reasoning", "Embedding and generation models always perfectly align regardless of training differences", "Retrieval quality has no relationship to generation effectiveness", "Training distribution differences never affect RAG output"], answerIndex: 0 },
                            { question: "How might a developer test whether a RAG pipeline is actually using retrieved context versus ignoring it and relying on pretrained knowledge?", options: ["By testing with questions whose correct answer differs from general pretrained knowledge but matches specific indexed content, then checking if the system reflects the indexed answer", "This distinction is impossible to test for in practice", "RAG systems always exclusively use retrieved context with no exceptions", "Pretrained knowledge is never a factor once retrieval is added"], answerIndex: 0 },
                            { question: "Why might iterative refinement of chunking strategy be necessary after initially deploying a RAG pipeline?", options: ["Real usage patterns and failure cases may reveal that initial chunk sizes/boundaries don't capture context as effectively as intended", "Chunking strategy never needs revisiting after initial deployment", "The first chunking approach is always provably optimal", "Chunking has no measurable effect on real-world pipeline performance"], answerIndex: 0 },
                            { question: "What is a potential consequence of not handling document updates/deletions properly in a RAG pipeline's vector index?", options: ["The system might retrieve and reference content that no longer exists or has been superseded, leading to outdated answers", "Vector indexes automatically self-correct for any document changes", "Document deletions never affect retrieval results", "Updates and deletions have no bearing on RAG output accuracy"], answerIndex: 0 },
                            { question: "Why might combining RAG with Chain-of-Thought style prompting be beneficial for complex questions requiring synthesis across retrieved chunks?", options: ["It can help the model reason through how different retrieved pieces of information relate before forming a final, synthesized answer", "CoT and RAG are fundamentally incompatible techniques", "This combination always produces invalid or unusable output", "Synthesis across chunks never benefits from explicit reasoning steps"], answerIndex: 0 },
                            { question: "Which statement best reflects a mature understanding of building and maintaining a production-quality RAG pipeline?", options: ["It requires ongoing attention to chunking strategy, retrieval quality, index freshness, prompt design, and evaluation\u2014not just an initial one-time setup", "Once built, a RAG pipeline requires no further maintenance or evaluation", "Retrieval quality and generation quality can never be meaningfully evaluated separately", "A RAG pipeline's effectiveness is entirely independent of its underlying retrieval mechanism"], answerIndex: 0 },
                          ]
            }
          },
          { 
            id: "llms-w4-4", 
            title: "Fine-Tuning vs Prompt Engineering", 
            desc: "Fine-Tuning vs Prompt Engineering", 
            code: `def determine_optimization_strategy(recency_critical, structural_customization):\n    # 0.0 = Low requirement, 1.0 = High requirement\n    if recency_critical > 0.7 and structural_customization <= 0.5:\n        return "DEPLOYMENT RECOMMENDATION: Use Prompt Engineering combined with an external RAG Pipeline."\n    elif structural_customization > 0.7 and recency_critical <= 0.4:\n        return "DEPLOYMENT RECOMMENDATION: Supervised Weight Parameter Fine-Tuning via LoRA/PEFT layers."\n    else:\n        return "DEPLOYMENT RECOMMENDATION: Deploy a Hybrid System (FT base model for tone, RAG for data retrieval)."\n\n# Run Scenario Simulation Test\nprint(determine_optimization_strategy(recency_critical=0.9, structural_customization=0.2))`,
            content: {
              aim: {
                text: "To systematically analyze and compare the technical trade-offs, deployment costs, use case boundaries, and performance characteristics of context-based optimization via Prompt Engineering and RAG against parametric optimization via supervised Fine-Tuning \u2014 including parameter-efficient LoRA adaptation \u2014 producing a clear decision framework for selecting the correct strategy given a specific enterprise requirement.",
                bullets: []
              },
              theory: [
                          {
                                        "title": "Two Ways to Make an AI Better",
                                        "body": [
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Feature</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">RAG / Prompt Engineering</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Fine-Tuning</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">What changes</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">The context (what AI reads)</td><td class=\"p-3 text-muted-foreground\">The neural weights (AI's brain)</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Best for</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Changing facts, live data</td><td class=\"p-3 text-muted-foreground\">Fixed style, format, custom tone</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Speed to deploy</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Hours</td><td class=\"p-3 text-muted-foreground\">Days to weeks</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Cost</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Per-query token cost</td><td class=\"p-3 text-muted-foreground\">Large upfront GPU cost</td></tr><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Learns new facts?</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Yes \u2014 update the DB</td><td class=\"p-3 text-muted-foreground\">No \u2014 facts go stale fast</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Learns new style?</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">Inconsistent</td><td class=\"p-3 text-muted-foreground\">Deeply and reliably</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "LoRA \u2014 Fine-Tuning on a Budget",
                                        "body": [
                                                      "Full fine-tuning retrains billions of weights \u2014 extremely expensive. LoRA freezes the entire base model and trains only a tiny adapter layer on top. Like pinning a sticky note onto a textbook instead of reprinting the whole book.",
                                                      "[TABLE]:<table class=\"w-full border border-slate-700/50 rounded-xl my-4 text-sm\"><thead class=\"bg-slate-800/50\"><tr><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Method</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">Weights Trained</th><th class=\"p-3 text-left border-b border-slate-700/50 font-semibold text-foreground\">GPU Cost</th></tr></thead><tbody><tr class=\"border-b border-slate-800/30\"><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">Full Fine-Tuning</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">7,000,000,000+</td><td class=\"p-3 text-muted-foreground\">Extremely high</td></tr><tr><td class=\"p-3 border-r border-slate-800/30 font-medium text-foreground\">LoRA Adapter</td><td class=\"p-3 border-r border-slate-800/30 text-muted-foreground\">~1,000,000</td><td class=\"p-3 text-muted-foreground\">Accessible on a single GPU</td></tr></tbody></table>"
                                        ]
                          },
                          {
                                        "title": "Decision Flow \u2014 Which to Choose?",
                                        "body": [
                                                      "Do facts change often?  \u2192  YES: Use RAG update the DB  \u2192  NO: Need a custom style?  \u2192  YES: Fine-Tune (LoRA)  \u2192  Need both?: Fine-Tune style + RAG for facts",
                                                      "![Fine-Tuning vs Prompt Engineering](/rag_vs_finetuning_illustration.webp)"
                                        ]
                          }
            ],
              pretest: [
                            { question: "What is fine-tuning?", options: ["Further training a pretrained model on specific data", "Writing a better prompt", "Deleting model weights", "Compressing a model's size"], answerIndex: 0 },
                            { question: "What is prompt engineering?", options: ["Crafting effective inputs to guide model output", "Retraining the model's weights", "Deleting the model", "Compressing audio files"], answerIndex: 0 },
                            { question: "Which approach changes the model's internal weights?", options: ["Fine-tuning", "Prompt engineering", "Neither", "Both equally"], answerIndex: 0 },
                            { question: "Which approach requires no retraining of the model?", options: ["Prompt engineering", "Fine-tuning", "Neither", "Both require retraining"], answerIndex: 0 },
                            { question: "Why might fine-tuning require more resources than prompt engineering?", options: ["It involves training computation on a dataset", "Fine-tuning requires no data at all", "Prompt engineering always requires more compute", "Resources are identical for both"], answerIndex: 0 },
                            { question: "What kind of data is typically needed for fine-tuning?", options: ["A labeled dataset relevant to the target task", "No data at all", "Only images", "Only audio recordings"], answerIndex: 0 },
                            { question: "Which approach is generally faster to implement for a new task?", options: ["Prompt engineering", "Fine-tuning", "Neither is faster", "Both take identical time always"], answerIndex: 0 },
                            { question: "Why might a company choose fine-tuning for a highly specialized, repetitive task?", options: ["To bake in specific behavior reliably without needing detailed prompts every time", "Fine-tuning always makes a model worse", "Fine-tuning eliminates the need for any data", "Fine-tuning is always cheaper than prompting"], answerIndex: 0 },
                            { question: "Why might a company choose prompt engineering over fine-tuning for a quick prototype?", options: ["It avoids the time and cost of training a custom model", "Prompt engineering always requires a labeled dataset", "Prompting is always slower than fine-tuning", "Prompting requires retraining the entire model"], answerIndex: 0 },
                            { question: "What is \"few-shot prompting\" an example of?", options: ["A prompt engineering technique", "A fine-tuning technique", "A type of model architecture", "A hardware optimization"], answerIndex: 0 },
                            { question: "What does it mean to \"fine-tune\" a model on customer support data?", options: ["Train it further specifically on customer support examples", "Delete all support-related data", "Translate support tickets into another language", "Compress support data into images"], answerIndex: 0 },
                            { question: "Which approach is more flexible for quickly switching between different tasks?", options: ["Prompt engineering", "Fine-tuning", "Neither is flexible", "Both are equally inflexible"], answerIndex: 0 },
                            { question: "What is a common risk associated with fine-tuning on a small dataset?", options: ["Overfitting to the limited examples", "The model becomes impossible to use", "Overfitting never occurs in fine-tuning", "Fine-tuning always improves with less data"], answerIndex: 0 },
                            { question: "Why might prompt engineering be considered more accessible to non-technical users?", options: ["It doesn't require training infrastructure or ML expertise", "It always requires a GPU cluster", "It requires writing custom training code", "It is identical in complexity to fine-tuning"], answerIndex: 0 },
                            { question: "What is one advantage of fine-tuning for consistent behavior across many requests?", options: ["The desired behavior is embedded in the model itself, reducing reliance on prompt wording", "Fine-tuning always produces inconsistent behavior", "Fine-tuning eliminates the need for any input", "Consistency is irrelevant to fine-tuning"], answerIndex: 0 },
                            { question: "Why might combining prompt engineering and fine-tuning sometimes be used together?", options: ["To leverage the strengths of both for improved task-specific performance", "Combining them is technically impossible", "Fine-tuning always replaces all need for prompting entirely", "They serve no complementary purpose"], answerIndex: 0 },
                            { question: "Which approach typically incurs ongoing per-request token costs related to prompt length?", options: ["Prompt engineering (especially with few-shot examples)", "Fine-tuning has no ongoing token-related cost difference", "Neither approach has any cost", "Both have identical cost structures always"], answerIndex: 0 },
                            { question: "What is a potential downside of relying solely on prompt engineering for a very complex, specialized task?", options: ["It may require very long, complex prompts that are still less reliable than a fine-tuned model", "Prompt engineering always solves any task perfectly with short prompts", "Prompting eliminates the need for any task understanding", "There is no downside to relying solely on prompting"], answerIndex: 0 },
                            { question: "Why might fine-tuning be less practical for tasks where requirements change frequently?", options: ["Retraining the model each time requirements change is time-consuming and costly", "Fine-tuned models always adapt instantly to new requirements with no retraining", "Frequent changes have no impact on fine-tuning practicality", "Fine-tuning is always faster to update than prompting"], answerIndex: 0 },
                            { question: "Which best summarizes the core difference between fine-tuning and prompt engineering?", options: ["Fine-tuning modifies the model itself; prompt engineering shapes input to guide existing model behavior", "They are identical processes with different names", "Fine-tuning never involves any data while prompting always does", "Prompt engineering always changes the model's weights permanently"], answerIndex: 0 },
                          ],
              procedure: [
                "Evaluate Bottleneck: Analyze whether the model is failing due to missing factual context (Action: RAG) or a failure to adhere to structural formatting and tone (Action: Fine-Tuning).",
                "Data Preparation (RAG): Clean and vectorize raw text documents for insertion into an external vector index.",
                "Data Preparation (Fine-Tuning): Curate a high-quality, structured dataset of hundreds of perfect JSON instruction-response pairs.",
                "Cost Architecture Calculation: Benchmark the lifetime token inference costs of running a massive context-window RAG pipeline versus the upfront GPU training costs of fine-tuning a smaller, faster model.",
                "LoRA Initialization: If fine-tuning is selected, configure a PEFT (Parameter-Efficient Fine-Tuning) environment, isolating the attention weight matrices for updates.",
                "Hybrid Deployment: For complex enterprise solutions, deploy a Hybrid Architecture: a lightly fine-tuned model optimized for specific formatting syntax, placed at the end of a robust RAG data-retrieval pipeline."
              ],
              posttest: [
                            { question: "Why might fine-tuning be preferred over prompt engineering when a task requires consistent behavior across thousands of varied inputs without lengthy instructions each time?", options: ["Fine-tuning embeds the desired behavior into the model weights, reducing dependence on crafting and resending detailed prompts for every request", "Fine-tuning always requires longer prompts than prompt engineering", "Prompt engineering guarantees more consistent behavior than fine-tuning in every case", "Consistency is unrelated to whether behavior is embedded in weights or instructions"], answerIndex: 0 },
                            { question: "What is a key cost trade-off between fine-tuning and prompt engineering (e.g., few-shot prompting) at high request volumes?", options: ["Fine-tuning has an upfront training cost but potentially lower per-request cost (shorter prompts), while prompt engineering avoids training cost but may incur higher per-request token costs from repeated examples", "Fine-tuning always has zero cost regardless of volume", "Prompt engineering always costs more in total than fine-tuning regardless of scale", "There is no meaningful cost difference between the two approaches at any scale"], answerIndex: 0 },
                            { question: "Why might prompt engineering be preferred when the underlying task or requirements are expected to evolve frequently?", options: ["Adjusting a prompt is typically much faster and cheaper than retraining a fine-tuned model each time requirements change", "Fine-tuned models always adapt automatically to new requirements with no retraining", "Prompt adjustments are always slower than full model retraining", "Frequent requirement changes have no bearing on which approach is more practical"], answerIndex: 0 },
                            { question: "What risk does fine-tuning on a narrow, non-representative dataset introduce that prompt engineering with a general-purpose model typically avoids?", options: ["Overfitting to the specific patterns in the fine-tuning data, potentially reducing generalization to broader or slightly different inputs", "Fine-tuning never risks overfitting regardless of dataset size or diversity", "Prompt engineering always overfits more than fine-tuning", "Generalization is unrelated to dataset representativeness in fine-tuning"], answerIndex: 0 },
                            { question: "Why might \"parameter-efficient fine-tuning\" methods (e.g., LoRA) be considered a middle ground between full fine-tuning and pure prompt engineering?", options: ["They adapt only a small subset of parameters, reducing training cost/resources compared to full fine-tuning while still modifying model behavior more durably than prompting alone", "Parameter-efficient methods are identical to prompt engineering in every technical respect", "These methods always require more resources than full fine-tuning", "They have no practical advantage over either full fine-tuning or prompting"], answerIndex: 0 },
                            { question: "How might catastrophic forgetting be a concern when fine-tuning a pretrained model on a narrow new task?", options: ["The model may lose some of its broader general capabilities while becoming specialized for the new task", "Catastrophic forgetting never occurs during fine-tuning", "Fine-tuning always improves general capabilities alongside task-specific ones", "This concept is unrelated to fine-tuning and only applies to prompting"], answerIndex: 0 },
                            { question: "Why might prompt engineering be a better starting point than fine-tuning when first exploring whether an LLM can adequately perform a new task?", options: ["It allows rapid experimentation and validation of feasibility without the upfront cost and time commitment of data collection and training", "Prompt engineering always takes longer to set up than fine-tuning", "Feasibility testing requires fine-tuning in all cases", "There is no practical benefit to starting with prompting before considering fine-tuning"], answerIndex: 0 },
                            { question: "What is a key reason data quality and quantity requirements differ significantly between fine-tuning and few-shot prompt engineering?", options: ["Fine-tuning typically requires a larger, well-curated dataset for stable training, while few-shot prompting can sometimes work with just a handful of well-chosen examples", "Fine-tuning and few-shot prompting always require identical amounts of data", "Few-shot prompting always requires more data than fine-tuning", "Data quality is irrelevant to either approach"], answerIndex: 0 },
                            { question: "Why might fine-tuning be more appropriate than prompt engineering for embedding proprietary stylistic or tonal consistency across an organization's outputs?", options: ["Fine-tuning can durably encode stylistic patterns into the model itself, reducing reliance on consistently crafting and maintaining detailed style instructions in every prompt", "Prompt engineering always guarantees more durable style consistency than fine-tuning", "Stylistic consistency cannot be achieved through either method", "Fine-tuning has no relationship to encoding stylistic patterns"], answerIndex: 0 },
                            { question: "How might combining RAG (retrieval) with prompt engineering sometimes reduce the perceived need for fine-tuning on factual/knowledge-based tasks?", options: ["Retrieval can supply up-to-date or specific factual context dynamically, addressing knowledge gaps without needing to retrain the model's weights", "RAG and prompt engineering can never substitute for any fine-tuning use case", "Fine-tuning is always required for any factual knowledge task regardless of retrieval availability", "Retrieval has no relationship to reducing fine-tuning needs"], answerIndex: 0 },
                            { question: "Why might evaluating fine-tuned model performance require a held-out validation set distinct from the fine-tuning training data?", options: ["To assess whether the model generalizes beyond the exact examples it was trained on, rather than just memorizing them", "Validation sets are unnecessary since fine-tuned models always generalize perfectly", "Training and validation data should always be identical for accurate evaluation", "Held-out validation has no role in assessing fine-tuning quality"], answerIndex: 0 },
                            { question: "What is a practical reason organizations might prefer prompt engineering for tasks involving rapidly changing external information (e.g., current events)?", options: ["Prompting (often combined with retrieval) can incorporate current information dynamically, whereas a fine-tuned model's knowledge is frozen at training time", "Fine-tuned models always automatically update their knowledge in real time", "Prompt engineering cannot incorporate any external or current information", "Rapidly changing information has no bearing on the choice between these approaches"], answerIndex: 0 },
                            { question: "Why might the choice between fine-tuning and prompt engineering depend significantly on available engineering/ML expertise within a team?", options: ["Fine-tuning typically requires more specialized ML infrastructure and expertise to execute and maintain properly compared to crafting prompts", "Both approaches require identical levels of technical expertise", "Prompt engineering always requires more ML expertise than fine-tuning", "Team expertise has no bearing on which approach is more practical to adopt"], answerIndex: 0 },
                            { question: "How might \"instruction-following\" capabilities baked into a base model (via the provider's own instruction tuning) reduce the relative need for a company to do its own custom fine-tuning?", options: ["Strong built-in instruction-following can make well-crafted prompts sufficient for many tasks that might otherwise have required custom fine-tuning", "Built-in instruction tuning always eliminates any benefit from prompt engineering", "Instruction-following capability has no relationship to fine-tuning necessity", "Companies must always fine-tune regardless of a base model's existing capabilities"], answerIndex: 0 },
                            { question: "Why might a hybrid approach\u2014lightly fine-tuning a model and then still applying careful prompt engineering\u2014sometimes outperform either approach alone?", options: ["Fine-tuning can establish a stronger task-specific baseline, while prompting can further refine behavior for specific edge cases or formatting needs", "Combining these approaches is technically impossible", "Hybrid approaches always perform worse than either method used alone", "Fine-tuning and prompting cannot meaningfully complement each other"], answerIndex: 0 },
                            { question: "What is a key reason version control and reproducibility can be more complex for fine-tuned models compared to prompt-based approaches?", options: ["Tracking which dataset, hyperparameters, and training run produced a specific fine-tuned model version adds complexity beyond simply versioning text prompts", "Fine-tuned models require no version tracking since they never change", "Prompt-based approaches are always more complex to version than fine-tuned models", "Reproducibility concerns apply equally and identically to both approaches"], answerIndex: 0 },
                            { question: "Why might regulatory or compliance considerations sometimes favor prompt engineering with a well-understood base model over fine-tuning with custom/sensitive data?", options: ["Fine-tuning on sensitive data introduces additional considerations around data handling, storage, and potential leakage that prompting with non-persistent context may partially avoid", "Compliance considerations are identical regardless of which approach is used", "Fine-tuning never involves any data handling considerations", "Prompt engineering always introduces more compliance risk than fine-tuning"], answerIndex: 0 },
                            { question: "How might the size and capability of the base model influence the relative benefit of fine-tuning versus relying on prompt engineering?", options: ["Larger, more capable base models often achieve strong performance via prompting alone, narrowing the relative gain from fine-tuning compared to smaller or less capable models", "Base model size and capability have no bearing on the relative benefit of either approach", "Smaller models always benefit less from fine-tuning than larger models", "Fine-tuning provides identical relative benefit regardless of base model capability"], answerIndex: 0 },
                            { question: "Why might a team choose to prototype with prompt engineering first, then later invest in fine-tuning only if a clear, recurring need and sufficient data are confirmed?", options: ["This staged approach reduces upfront risk and cost by validating task feasibility before committing resources to the more involved fine-tuning process", "This staged approach is never used in real-world ML/LLM development practice", "Fine-tuning should always be attempted first regardless of available data or validated need", "There is no practical benefit to validating feasibility before committing to fine-tuning"], answerIndex: 0 },
                            { question: "Which statement best reflects a nuanced, practice-informed view of choosing between fine-tuning and prompt engineering?", options: ["The right choice depends on factors like task stability, data availability, cost constraints, required consistency, and team expertise, and the two approaches can also be combined", "Fine-tuning is always strictly superior to prompt engineering in every situation", "Prompt engineering is always strictly superior to fine-tuning in every situation", "The choice between these approaches has no meaningful impact on a project's outcome"], answerIndex: 0 },
                          ]
            }
          }
        ]
      }
    ]
  },
  "c-programming":{
    "id": "c-programming",
    "title": "C Programming",
    "objectives": [
      "To introduce students to the C programming language and its role in modern computing",
      "To provide a structured, week-by-week hands-on programming experience aligned with JNTUGV syllabus",
      "To help students understand fundamental programming concepts such as variables, data types, operators, and expressions",
      "To train students in writing decision-making programs using if-else, switch-case, and nested conditionals",
      "To develop proficiency in iterative constructs — for, while, and do-while loops",
      "To understand and implement array operations including searching and sorting",
      "To learn string manipulation using both built-in and user-defined functions",
      "To explore pointer arithmetic, dynamic memory allocation using malloc, calloc, realloc, and free",
      "To understand structures, unions, bit fields, and self-referential structures including singly linked lists",
      "To design and implement modular programs using functions, call by value, and call by reference",
      "To develop recursive thinking by programming naturally recursive problems",
      "To perform file I/O operations including reading, writing, copying, and merging files",
      "To build problem-solving skills by converting real-world problems into algorithmic solutions"
    ],
    "introduction": [
      "C is one of the most fundamental and widely-used programming languages in the history of computing. Developed by Dennis Ritchie at Bell Laboratories in 1972, C has stood the test of time as the foundation for operating systems, embedded systems, compilers, and system-level software. Almost every modern programming language — including Python, Java, and C++ — draws concepts from C.",
      "The Virtual C Programming Lab provides a hands-on, browser-based environment where students can write, compile, and execute C programs without requiring any local software installation.",
      "The lab covers structured experiments across key C Programming concepts — from basic I/O and arithmetic to pointers, data structures, recursion, and file handling. Each experiment includes a clear objective, problem statement, pre-loaded starter code, stdin support for interactive programs, and expected output for self-verification.",
      "Students can attempt all lab problems directly in the browser using a professional code editor powered by a real GCC compiler via the Wandbox execution engine."
    ],
    "shortNotes": "cShortNotes",
    "targetAudience": {
      "primary": "Students of engineering and computer science enrolled in introductory C programming courses.",
      "prerequisites": [
        "No prior programming experience required",
        "Basic computer operation skills (typing, using a browser)",
        "Understanding of basic mathematics (algebra, arithmetic)"
      ],
      "usefulFor": [
        "Diploma students transitioning to B.Tech who want to strengthen fundamentals",
        "Students preparing for competitive exams like GATE where C concepts are tested",
        "Faculty members looking for ready-made experiment references aligned to standard programming curricula",
        "Self-learners who want a structured, compiler-ready C programming environment"
      ]
    },
    "alignment": {
      "university": "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
      "department": "Basic Sciences and Humanities (BS&HSS)",
      "course": "C Programming Lab",
      "credits": "L:0 T:0 P:3 C:1.5",
      "yearSem": "First Year, First / Second Semester",
      "branches": "All B.Tech branches (CSE, IT, ECE, EEE, ME, Civil)",
      "totalExperiments": "47 problems across 14 weeks",
      "compiler": "GCC (GNU Compiler Collection) via Wandbox — identical to the compiler used in JNTUGV physical labs",
      "units": [
        { "unit": "Unit I", "topics": "Environment, Algorithms, Variables, Arithmetic", "weeks": "Week 1–3" },
        { "unit": "Unit II", "topics": "Operators, Branching, Loops", "weeks": "Week 4–6" },
        { "unit": "Unit III", "topics": "Arrays, Strings, Sorting, Matrices", "weeks": "Week 7–8" },
        { "unit": "Unit IV", "topics": "Pointers, Structures, Unions, Linked Lists", "weeks": "Week 9–10" },
        { "unit": "Unit V", "topics": "Functions, Recursion, File Handling", "weeks": "Week 11–14" }
      ]
    },
    "weeks": [
      {
        "title": "WEEK 1",
        "objective": "Getting familiar with programming environment and writing first program",
        "tutorial": "Tutorial 1: Environment Setup",
        "labTitle": "Lab 1: First steps in C",
        "experiments": [
          {
            "id": "c-w1-1",
            "title": "Hello World",
            "desc": "Write a C program to print 'Hello World' to the console.",
            "expected": "Hello World",
            "content": {
              "aim": {
                "text": "This experiment introduces students to the most fundamental C program — printing a line of text to the screen. Students will examine the mandatory structural components of every C program: the preprocessor directive (#include <stdio.h>), the entry point function (int main()), the output function (printf()), and the return statement. By compiling and running the Hello World program, students gain hands-on familiarity with the GCC compiler workflow and confirm that their programming environment is fully operational before moving on to more complex experiments.",
                "bullets": [
                  "Understand the structure of a C program — preprocessor directives, main function, and return statement",
                  "Learn the role of #include <stdio.h> header file",
                  "Use printf() to print text to the console",
                  "Successfully compile and run their first C program"
                ]
              },
              "theory": [
                {
                  "title": "🎉 Think of it like this!",
                  "body": [
                    "Imagine you just got a brand new robot friend. Before the robot can do anything cool — dance, talk, or help you — it needs to wake up and say hello! That's exactly what this first program does. We're waking up the computer and telling it to say \"Hello, World!\"",
                    "Every time you write a C program, it's like giving your robot a set of instructions written on paper. The computer reads from top to bottom, does exactly what you wrote, and stops.",
                  ]
                },
                {
                  "title": "Structure of a C Program",
                  "body": ["Every C program follows a fixed, well-defined structure. Understanding this structure is the very first step to writing correct C programs. A C program is made up of several distinct parts that must appear in a specific order for the compiler to understand and build the program.", "C was designed in the early 1970s by Dennis Ritchie at Bell Labs. It was built to be close to the hardware while still being human-readable. Because of this design philosophy, C requires you to explicitly declare everything — the libraries you use, the variables you create, and what type of data they hold.", "![Hello World concept](hello_world.webp)","A basic C program consists of the following parts in order: Preprocessor Directives (lines starting with #), the main() function declaration, opening brace {, the body of statements, closing brace }, and a return statement."]
                  
                },
                {
                  "title": "1. Preprocessor Directive",
                  "body": ["Lines starting with # are preprocessor directives. They are processed by the C preprocessor (a separate phase before actual compilation) before any code is compiled.", "#include <stdio.h> tells the compiler to include the Standard Input Output library header file. This header file contains function prototypes (declarations) for functions like printf() and scanf(). Without it, the compiler does not know what printf() is and will produce a compilation error.", "Think of #include as an 'import' statement. The angle brackets < > tell the compiler to look in the standard system directories. Double quotes \" \" would tell it to look in the current directory first."]
                },
                {
                  "title": "2. main() Function",
                  "body": ["Every C program must have exactly one main() function. This is the mandatory entry point — the operating system calls main() to start your program. Execution always begins from the very first statement inside main() and proceeds line by line.", "int main() means the function returns an integer value to the operating system when it finishes. The OS can use this return value to determine if the program succeeded or failed.", "Variations like void main() exist but are not standard C and may not be supported on all compilers. The standard form int main() or int main(int argc, char* argv[]) should always be preferred."]
                },
                {
                  "title": "3. printf() Function",
                  "body": ["printf() (print formatted) is used to print formatted output to the console (standard output). It is one of the most frequently used functions in C.", "Syntax: printf(\"text to print\"); or printf(\"format string\", variable1, variable2, ...);", "The text inside the double quotes is called the format string. It is printed exactly as-is, except for special escape sequences and format specifiers.", "Escape Sequences — Special character sequences beginning with a backslash \\\\ that represent control characters: \\\\n is newline (moves cursor to next line), \\\\t is horizontal tab, \\\\\\\\ prints a literal backslash, \\\\\" prints a literal double quote.", "printf() does NOT automatically add a newline at the end — you must explicitly include \\\\n if you want the output to move to the next line."]
                },
                {
                  "title": "👶 Super simple version",
                  "body": [
                    "printf(\"Hello!\") is just the computer's way of shouting something out loud. The \\n at the end is like pressing Enter on your keyboard — it moves to the next line."
                  ]
                },
                {
                  "title": "4. return 0",
                  "body": ["return 0; at the end of main() sends the value 0 back to the operating system. By convention, 0 signals that the program terminated successfully without any errors.", "Any non-zero return value (like return 1; or return -1;) signals that the program encountered an error. This is used in scripting and automation to chain programs together — a parent process can check the exit code of a child process.", "Modern compilers often generate implicit return 0; if you forget it in main(), but it is always best practice to write it explicitly for clarity and portability."]
                },
                {
                  "title": "5. Curly Braces { }",
                  "body": ["All statements inside a function body are enclosed within a pair of curly braces. The opening { marks the start of the function body and the closing } marks its end.", "Curly braces define a 'block' in C. Variables declared inside a block only exist within that block (this is called 'scope'). Everything between the braces is considered one logical unit.", "Proper indentation inside braces (typically 4 spaces or 1 tab) is a critical coding style practice. The compiler ignores whitespace, but consistent indentation makes code readable and maintainable — a skill you'll use throughout your programming career."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections completely before starting",
                "Go to the Simulation tab and observe the step-by-step execution of the Hello World program",
                "Note how each line of the program executes in order — preprocessor → main() → printf() → return",
                "Observe the output panel on the right side showing 'Hello World'",
                "Go to the Code Test tab (code editor)",
                "The starter code is pre-loaded in the editor",
                "Read the code carefully — do not change anything yet",
                "Click the 'Run Code' button",
                "Verify your output matches the expected output: Hello World",
                "Try modifying the text inside printf() to print your own name",
                "Run again and verify your custom output appears correctly",
                "Once satisfied, proceed to the Posttest tab to test your understanding"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Preprocessor loads stdio library containing printf()", "memory": [], "output": "" },
                  { "line": 3, "annotation": "Program execution begins at main() function", "memory": [], "output": "" },
                  { "line": 4, "annotation": "printf() sends the string to standard output", "memory": [], "output": "Hello World\n" },
                  { "line": 5, "annotation": "Program sends exit code 0 to OS, ending successfully", "memory": [], "output": "Hello World\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan, B.W. and Ritchie, D.M., 'The C Programming Language', 2nd Edition, Prentice Hall",
                "Balagurusamy, E., 'Programming in ANSI C', 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          },
          {
            "id": "c-w1-2",
            "title": "Basic Input Output",
            "desc": "Write a program that takes two variables (a string name and an integer age) and prints them.",
            "expected": "Name: Likhith Age: 20",
            "content": {
              "aim": {
                "text": "This experiment teaches students how a C program communicates interactively with the user by reading input from the keyboard and displaying formatted output on the screen. Students will declare variables of different types (a character array for a name and an integer for age), use the scanf() function with the address-of operator (&) to store user-typed values in those variables, and use printf() with format specifiers (%s, %d) to display them in a structured sentence. This experiment lays the groundwork for every subsequent program that processes user-supplied data.",
                "bullets": [
                  "Declare variables of type char array and int",
                  "Use scanf() to read a string and integer from the user",
                  "Use printf() with format specifiers %s and %d to display them",
                  "Understand the use of & (address-of operator) in scanf()"
                ]
              },
              "theory": [
                {
                  "title": "📬 Think of it like a mailbox!",
                  "body": [
                    "When the computer wants to receive something from you (like your name), it opens a mailbox called scanf(). The & symbol is like writing the address on the mailbox so the letter (your input) lands in the right place. Without the address, the letter gets lost!",
                  ]
                },
                {
                  "title": "scanf() — Reading Input",
                  "body": [
                    "scanf() (scan formatted) reads formatted input from the keyboard (standard input, stdin). It is the input counterpart to printf().",
                    "![Scanf() Visualization](scanf.webp)",
                    "Syntax: scanf(\"format_specifier\", &variable);",
                    "The & symbol is the 'address-of' operator. It gives scanf() the memory address of the variable so it can directly store the value the user types into that memory location. Without &, scanf() receives the value of the variable, not its location, and cannot write to it (this is undefined behavior and often causes crashes).",
                    "scanf() reads input until it encounters whitespace (space, tab, newline). For reading strings with spaces, special functions like fgets() are needed.",
                    "Common Pitfall: Always check that the number of format specifiers matches the number of address-of arguments. A mismatch leads to undefined behavior."
                  ]
                },
                {
                  "title": "printf() with Format Specifiers",
                  "body": [
                    "Format specifiers are placeholders in the format string that tell printf() how to display a variable's value. They always start with % and are followed by a letter indicating the data type.",
                    "![Printf() Visualization](printf.webp)",
                    "Common Format Specifiers: %d for int (decimal integer), %f for float, %lf for double, %c for char, %s for char array (string).",
                    "Example: printf(\"Name: %s Age: %d\", name, age); → Replaces %s with the value of name and %d with the value of age, in the order they appear in the argument list.",
                    "Precision Modifier: %.2f displays a float with exactly 2 decimal places. The number between . and f specifies precision.",
                    "Width Modifier: %10d prints an integer in a field of width 10, right-aligned. These are useful for creating aligned table output."
                  ]
                },
                {
                  "title": "char array for strings",
                  "body": [
                    "C does not have a built-in string data type like Python or Java. Strings in C are stored as arrays of characters (char arrays), terminated by a special null character '\\0' (ASCII value 0).",
                    "Declaration: char name[50]; → declares a character array that can hold up to 49 printable characters plus the null terminator at position [49].",
                    "The null terminator is crucial — string functions like printf() with %s and strlen() use it to know where the string ends. If it's missing, these functions may read garbage memory.",
                    "Why no & for char arrays in scanf? — The array name (like name) in C is treated as a pointer to its first element (equivalent to &name[0]). Therefore, you don't need to prefix it with &. However, for individual characters or simple variables, & is required.",
                    "Declaring an array too small (e.g., char name[5] for a long name) causes a buffer overflow — one of the most dangerous security vulnerabilities in C programming."
                  ]
                },
                {
                  "title": "🍱 A string is like a lunchbox with compartments!",
                  "body": [
                    "char name[50] is a lunchbox with 50 little compartments. Each compartment holds one letter. The last compartment always holds a special invisible marker '\\0' that says \"this is the end!\" If you forget that marker, the computer keeps looking for more letters — even into other people's lunchboxes!"
                  ]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully",
                "Go to the Simulation tab to see how scanf() reads values and printf() displays them",
                "Observe what happens in memory when variables are assigned values from user input",
                "Go to the Code Test tab — starter code is pre-loaded",
                "Look at the Stdin input box — type your name and age separated by a space",
                "Example input: Likhith 20",
                "Click Run Code",
                "Verify output matches: Name: Likhith Age: 20",
                "Try changing the input values and run again",
                "Observe how output changes based on input",
                "Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    char name[50];\n    int age;\n    scanf(\"%s %d\", name, &age);\n    printf(\"Name: %s Age: %d\\n\", name, age);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Preprocessor loads stdio library", "memory": [], "output": "" },
                  { "line": 3, "annotation": "Program execution begins at main()", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Memory allocated for char array 'name'", "memory": [{ "variable": "name", "type": "char[50]", "value": "garbage" }], "output": "" },
                  { "line": 5, "annotation": "Memory allocated for integer 'age'", "memory": [{ "variable": "name", "type": "char[50]", "value": "garbage" }, { "variable": "age", "type": "int", "value": "garbage" }], "output": "" },
                  { "line": 6, "annotation": "scanf() reads 'Likhith 20' from standard input", "memory": [{ "variable": "name", "type": "char[50]", "value": "\"Likhith\"" }, { "variable": "age", "type": "int", "value": "20" }], "output": "" },
                  { "line": 7, "annotation": "printf() sends formatted string to standard output", "memory": [{ "variable": "name", "type": "char[50]", "value": "\"Likhith\"" }, { "variable": "age", "type": "int", "value": "20" }], "output": "Name: Likhith Age: 20\n" },
                  { "line": 8, "annotation": "Program ends successfully", "memory": [{ "variable": "name", "type": "char[50]", "value": "\"Likhith\"" }, { "variable": "age", "type": "int", "value": "20" }], "output": "Name: Likhith Age: 20\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan, B.W. and Ritchie, D.M., 'The C Programming Language', 2nd Edition, Prentice Hall",
                "Balagurusamy, E., 'Programming in ANSI C', 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 2",
        "objective": "Converting algorithms/flowcharts into C source code",
        "tutorial": "Tutorial 2: Algorithms and Flowcharts",
        "labTitle": "Lab 2: Basic Algorithms",
        "experiments": [
          {
            "id": "c-w2-1",
            "title": "Sum & Average",
            "desc": "Compute the sum and average of two integers.",
            "expected": "Sum: 14 Average: 7.00",
            "content": {
              "aim": {
                "text": "This experiment demonstrates how C handles arithmetic on integer data and how type casting is used to obtain correct decimal results during division. Students will accept two integers from the user, compute their sum using the addition operator, and calculate their average by casting the integer sum to a float before dividing by 2. The experiment highlights the critical difference between integer division (which truncates) and floating-point division (which preserves the decimal portion), and introduces the %.2f format specifier for displaying results to exactly two decimal places.",
                "bullets": [
                  "Declare and use multiple int and float variables",
                  "Perform arithmetic operations (addition, division)",
                  "Understand integer vs. float division and type casting",
                  "Use printf() with %d and %.2f format specifiers"
                ]
              },
              "theory": [
                {
                  "title": "➕ Story time!",
                  "body": [
                    "Imagine you and your friend both have some candies. You want to know how many you have together (that's the sum!) and how many each of you would get if you shared equally (that's the average!).",
                    "sum = a + b → Put all candies together in one pile",
                    "average = sum / 2 → Split the pile evenly"
                  ]
                },
                {
                  "title": "Arithmetic in C",
                  "body": ["C supports +, -, *, / and % (modulus). When both operands are integers, division truncates: 7 / 2 = 3, not 3.5.", "To obtain a decimal result, cast one operand to float: (float)a / b."]
                },
                {
                  "title": "⚠️ Watch out for this sneaky bug!",
                  "body": [
                    "In C, 5 / 2 gives you 2, NOT 2.5. Why? Because the computer thinks you only want a whole number! It's like cutting a pizza into 2 and ignoring the leftover crumbs. To keep the decimal part, write (float)5 / 2 — that tells the computer \"I want the crumbs too!\"",
                    "![Integer division illustration](pizza_analogy.webp)"
                  ]
                },
                {
                  "title": "Sum",
                  "body": ["sum = a + b; stores the result in a new variable. Both a and b must be declared before use."]
                },
                {
                  "title": "Average",
                  "body": ["average = (float)sum / 2; The cast ensures float division. Alternatively declare average as float and divide directly."]
                },
                {
                  "title": "%.2f",
                  "body": ["%.2f prints a float with exactly 2 decimal places. Useful for displaying averages cleanly."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab below and step through the program trace.",
                "Observe how variables appear in memory and how integer vs. float division differ.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter two integers separated by a space — e.g. 10 4.",
                "Click Run Code. Verify output: Sum: 14 Average: 7.00",
                "Try different inputs (odd numbers to test rounding). Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int a, b, sum;\n    float avg;\n    scanf(\"%d %d\", &a, &b);\n    sum = a + b;\n    avg = (float)sum / 2;\n    printf(\"Sum: %d Average: %.2f\\n\", sum, avg);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library for I/O functions", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate memory for integers a, b, sum", "memory": [{ "variable": "a", "type": "int", "value": "?" }, { "variable": "b", "type": "int", "value": "?" }, { "variable": "sum", "type": "int", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "Allocate memory for float avg", "memory": [{ "variable": "a", "type": "int", "value": "?" }, { "variable": "b", "type": "int", "value": "?" }, { "variable": "sum", "type": "int", "value": "?" }, { "variable": "avg", "type": "float", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "scanf() reads '10 4' from user", "memory": [{ "variable": "a", "type": "int", "value": "10" }, { "variable": "b", "type": "int", "value": "4" }, { "variable": "sum", "type": "int", "value": "?" }, { "variable": "avg", "type": "float", "value": "?" }], "output": "" },
                  { "line": 7, "annotation": "Compute sum = a + b", "memory": [{ "variable": "a", "type": "int", "value": "10" }, { "variable": "b", "type": "int", "value": "4" }, { "variable": "sum", "type": "int", "value": "14" }, { "variable": "avg", "type": "float", "value": "?" }], "output": "" },
                  { "line": 8, "annotation": "Compute avg using float casting", "memory": [{ "variable": "a", "type": "int", "value": "10" }, { "variable": "b", "type": "int", "value": "4" }, { "variable": "sum", "type": "int", "value": "14" }, { "variable": "avg", "type": "float", "value": "7.00" }], "output": "" },
                  { "line": 9, "annotation": "printf() displays the result", "memory": [{ "variable": "a", "type": "int", "value": "10" }, { "variable": "b", "type": "int", "value": "4" }, { "variable": "sum", "type": "int", "value": "14" }, { "variable": "avg", "type": "float", "value": "7.00" }], "output": "Sum: 14 Average: 7.00\n" },
                  { "line": 10, "annotation": "Program terminates successfully", "memory": [{ "variable": "a", "type": "int", "value": "10" }, { "variable": "b", "type": "int", "value": "4" }, { "variable": "sum", "type": "int", "value": "14" }, { "variable": "avg", "type": "float", "value": "7.00" }], "output": "Sum: 14 Average: 7.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w2-2",
            "title": "Fahrenheit to Celsius",
            "desc": "Convert temperature from Fahrenheit to Celsius.",
            "expected": "Celsius: 37.00",
            "content": {
              "aim": {
                "text": "This experiment applies arithmetic expressions and operator precedence in C to solve a real-world unit-conversion problem. Students will accept a temperature value in Fahrenheit as a floating-point input, apply the standard conversion formula C = (F − 32) × 5 / 9 with explicit parentheses to enforce correct evaluation order, and display the Celsius result rounded to two decimal places. The experiment emphasises why operator precedence matters in arithmetic expressions and why parentheses must be used whenever the intended calculation order differs from C's default precedence rules.",
                "bullets": [
                  "Declare and use float variables for temperature values",
                  "Apply the conversion formula: C = (F - 32) * 5 / 9",
                  "Understand operator precedence and parenthesisation in C",
                  "Use printf() with %.2f to display the result to 2 decimal places"
                ]
              },
              "theory": [
                {
                  "title": "🌡️ Two countries, two thermometers!",
                  "body": [
                    "In the USA, people say \"It's 98°F today!\" In India, we say \"It's 37°C today!\" They're talking about the exact same temperature — just in different languages! This program is a translator between those two languages.",
                    "![Thermometer Fahrenheit Celsius](celsius-farenheit.webp)"
                  ]
                },
                {
                  "title": "Temperature Conversion Formula",
                  "body": ["The relationship between Fahrenheit and Celsius is:", "C = (F - 32) * 5 / 9", "This formula subtracts 32 from the Fahrenheit value, then multiplies by 5 and divides by 9."]
                },
                {
                  "title": "🧮 Why the parentheses matter:",
                  "body": [
                    "C is like a strict math teacher — it always does × and ÷ before + and −. So if you write F - 32 * 5 / 9, the computer first does 32 × 5 = 160, then 160 ÷ 9 = 17.7, and then subtracts that from F — which is completely wrong! Parentheses ( ) are your way of telling the computer: \"Do THIS part first!\""
                  ]
                },
                {
                  "title": "Operator Precedence",
                  "body": ["In C, multiplication and division have higher precedence than subtraction.", "Without parentheses, F - 32 * 5 / 9 would be evaluated incorrectly. Always use parentheses: (F - 32) * 5 / 9."]
                },
                {
                  "title": "Float Variables",
                  "body": ["Declare both fahrenheit and celsius as float to avoid integer truncation.", "If declared as int, values like 98.6°F would lose their decimal part."]
                },
                {
                  "title": "%.2f",
                  "body": ["%.2f prints a floating-point result rounded to 2 decimal places, giving clean output like 37.00."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how the formula is applied and how float variables hold decimal values.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a Fahrenheit temperature — e.g. 98.6",
                "Click Run Code. Verify output: Celsius: 37.00",
                "Try inputs like 32 (freezing) and 212 (boiling) to verify. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    float f, c;\n    scanf(\"%f\", &f);\n    c = (f - 32) * 5 / 9;\n    printf(\"Celsius: %.2f\\n\", c);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate memory for floats f, c", "memory": [{ "variable": "f", "type": "float", "value": "?" }, { "variable": "c", "type": "float", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads 98.6 from user", "memory": [{ "variable": "f", "type": "float", "value": "98.6" }, { "variable": "c", "type": "float", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "Compute conversion formula", "memory": [{ "variable": "f", "type": "float", "value": "98.6" }, { "variable": "c", "type": "float", "value": "37.00" }], "output": "" },
                  { "line": 7, "annotation": "printf() displays formatted celsius", "memory": [{ "variable": "f", "type": "float", "value": "98.6" }, { "variable": "c", "type": "float", "value": "37.00" }], "output": "Celsius: 37.00\n" },
                  { "line": 8, "annotation": "Program ends successfully", "memory": [{ "variable": "f", "type": "float", "value": "98.6" }, { "variable": "c", "type": "float", "value": "37.00" }], "output": "Celsius: 37.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w2-3",
            "title": "Simple Interest",
            "desc": "Calculate Simple Interest given P, R, T.",
            "expected": "Simple Interest: 100.00",
            "content": {
              "aim": {
                "text": "This experiment introduces financial computation in C by implementing the simple interest formula (SI = P × R × T / 100). Students will accept three floating-point values representing principal, annual interest rate, and time period in years, compute the simple interest, and display the result formatted to two decimal places. The experiment reinforces the use of float variables for quantities that may contain decimal parts, demonstrates multi-variable arithmetic expressions, and shows how real-world financial formulas are translated directly into C code.",
                "bullets": [
                  "Declare and use float variables for financial calculations",
                  "Apply the simple interest formula: SI = (P * R * T) / 100",
                  "Understand the importance of float division in financial computations",
                  "Use printf() with %.2f to display monetary results to 2 decimal places"
                ]
              },
              "theory": [
                {
                  "title": "🏦 Imagine a piggy bank that grows!",
                  "body": [
                    "You put ₹1000 in a bank (that's your Principal P). The bank says \"we'll give you 5% extra every year\" (that's the Rate R). After 3 years (Time T), how much extra money do you earn? That extra money is called Simple Interest!",
                    "Formula: SI = (P × R × T) / 100",
                    "Example: P=1000, R=5, T=3 → SI = (1000×5×3)/100 = ₹150 earned!",
                  ]
                },
                {
                  "title": "Simple Interest Formula",
                  "body": ["Simple interest is calculated as:", "SI = (P * R * T) / 100", "Where: P = Principal amount, R = Rate of interest per annum, T = Time period"]
                },
                {
                  "title": "Why Float?",
                  "body": ["Financial values often involve decimals. Declaring P, R, T, and SI as float ensures that fractional values are preserved.", "If all variables were int, a rate like 8.5% would be truncated to 8."]
                },
                {
                  "title": "Operator Precedence",
                  "body": ["Multiplication is performed left to right before division. P * R * T is evaluated first, then divided by 100.", "No special parenthesisation is needed beyond the outer grouping."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how P, R, and T are read and how SI is computed step by step.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter three values: principal, rate, time — e.g. 1000 5 2",
                "Click Run Code. Verify output: Simple Interest: 100.00",
                "Try inputs with decimal rate like 1000 8.5 3 to test float handling. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    float p, r, t, si;\n    scanf(\"%f %f %f\", &p, &r, &t);\n    si = (p * r * t) / 100;\n    printf(\"Simple Interest: %.2f\\n\", si);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate memory for floats p, r, t, si", "memory": [{ "variable": "p", "type": "float", "value": "?" }, { "variable": "r", "type": "float", "value": "?" }, { "variable": "t", "type": "float", "value": "?" }, { "variable": "si", "type": "float", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '1000 5 2' from user", "memory": [{ "variable": "p", "type": "float", "value": "1000" }, { "variable": "r", "type": "float", "value": "5" }, { "variable": "t", "type": "float", "value": "2" }, { "variable": "si", "type": "float", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "Compute SI formula", "memory": [{ "variable": "p", "type": "float", "value": "1000" }, { "variable": "r", "type": "float", "value": "5" }, { "variable": "t", "type": "float", "value": "2" }, { "variable": "si", "type": "float", "value": "100.00" }], "output": "" },
                  { "line": 7, "annotation": "printf() displays formatted result", "memory": [{ "variable": "p", "type": "float", "value": "1000" }, { "variable": "r", "type": "float", "value": "5" }, { "variable": "t", "type": "float", "value": "2" }, { "variable": "si", "type": "float", "value": "100.00" }], "output": "Simple Interest: 100.00\n" },
                  { "line": 8, "annotation": "Program ends successfully", "memory": [{ "variable": "p", "type": "float", "value": "1000" }, { "variable": "r", "type": "float", "value": "5" }, { "variable": "t", "type": "float", "value": "2" }, { "variable": "si", "type": "float", "value": "100.00" }], "output": "Simple Interest: 100.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 3",
        "objective": "Variables, data types, arithmetic operators",
        "tutorial": "Tutorial 3: Variables and Arithmetic",
        "labTitle": "Lab 3: Computational problems",
        "experiments": [
          {
            "id": "c-w3-1",
            "title": "Square Root",
            "desc": "Find square root of a given number using math.h.",
            "expected": "Square Root: 5.00",
            "content": {
              "aim": {
                "text": "This experiment introduces the C standard math library (math.h) and demonstrates how to use built-in mathematical functions in a program. Students will accept a non-negative number from the user, compute its square root using the sqrt() function, and display the result to two decimal places. Beyond the computation itself, the experiment covers three important practical points: the need to include the math.h header, the use of the double data type for precision, and the requirement to link the math library with the -lm compiler flag — a step that catches many beginners off guard.",
                "bullets": [
                  "Declare and use float/double variables",
                  "Include and use the math.h library",
                  "Apply the sqrt() function",
                  "Use printf() with %.2f to display the result",
                  "Understand the importance of linking the math library with -lm during compilation"
                ]
              },
              "theory": [
                {
                  "title": "🌳 The \"un-squaring\" machine!",
                  "body": [
                    "If you know that 5 × 5 = 25, then the square root of 25 is 5. It's like having a magic machine — you put in 25, and it gives you back the number that was multiplied by itself to make 25.",
                    "In C, this magic machine is called sqrt() and it lives in a toolbox called math.h.",
                    "![Square root symbol mathematics](sqrt_c.webp)"
                  ]
                },
                {
                  "title": "Square Root",
                  "body": ["The square root of a number n is a value x such that x * x = n.", "For example, sqrt(25) = 5.0 and sqrt(2) = 1.414..."]
                },
                {
                  "title": "math.h Library",
                  "body": ["C does not include mathematical functions by default. The header #include <math.h> must be included at the top of the program to access functions like sqrt(), pow(), fabs(), ceil(), floor(), etc."]
                },
                {
                  "title": "sqrt() Function",
                  "body": ["Syntax: double sqrt(double x);", "It accepts a double argument and returns the square root as a double. Passing a negative number results in a NaN (Not a Number) output; no crash occurs but the result is invalid."]
                },
                {
                  "title": "Compilation and Types",
                  "body": ["When using math.h functions, compile with: gcc program.c -o program -lm", "The -lm flag links the math library explicitly. Without it, a linker error occurs on some systems.", "sqrt() returns a double. If your variable is float, an implicit conversion occurs. It is safest to declare the variable as double when using math.h functions."]
                },
                {
                  "title": "🛠️ What is -lm?",
                  "body": [
                    "When you use math.h, you need to also tell the compiler: \"Hey, I'm borrowing the math toolbox!\" The -lm flag is that permission slip. Without it, the compiler says \"I don't know what sqrt() is!\" and refuses to build your program."
                  ]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how the math.h library is included and how sqrt() is called.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a non-negative number — e.g. 25",
                "Click Run Code. Verify output: Square Root: 5.00",
                "Try inputs like 2 and 0 to observe decimal and zero results. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double n, root;\n    scanf(\"%lf\", &n);\n    root = sqrt(n);\n    printf(\"Square Root: %.2f\\n\", root);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library for I/O", "memory": [], "output": "" },
                  { "line": 2, "annotation": "Load math library for sqrt()", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Allocate memory for doubles n, root", "memory": [{ "variable": "n", "type": "double", "value": "?" }, { "variable": "root", "type": "double", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "scanf() reads '25' from user", "memory": [{ "variable": "n", "type": "double", "value": "25.00" }, { "variable": "root", "type": "double", "value": "?" }], "output": "" },
                  { "line": 7, "annotation": "Compute square root", "memory": [{ "variable": "n", "type": "double", "value": "25.00" }, { "variable": "root", "type": "double", "value": "5.00" }], "output": "" },
                  { "line": 8, "annotation": "printf() displays result", "memory": [{ "variable": "n", "type": "double", "value": "25.00" }, { "variable": "root", "type": "double", "value": "5.00" }], "output": "Square Root: 5.00\n" },
                  { "line": 9, "annotation": "Program terminates successfully", "memory": [{ "variable": "n", "type": "double", "value": "25.00" }, { "variable": "root", "type": "double", "value": "5.00" }], "output": "Square Root: 5.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w3-2",
            "title": "Compound Interest",
            "desc": "Calculate Compound Interest given P, R, T.",
            "expected": "Compound Interest: 210.00",
            "content": {
              "aim": {
                "text": "This experiment builds on the simple interest concept by implementing compound interest, where interest accumulates on both the original principal and previously earned interest. Students will accept principal, annual rate, and time as double-precision inputs, compute the final amount using the pow() function from math.h (A = P × (1 + R/100)^T), subtract the principal to obtain compound interest, and display the result to two decimal places. The experiment compares the growing effect of compound interest against simple interest and demonstrates why the pow() function is necessary for exponentiation in C.",
                "bullets": [
                  "Declare and use float/double variables",
                  "Apply the compound interest formula: CI = P * pow(1 + R/100, T) - P",
                  "Use the pow() function from math.h",
                  "Use printf() with %.2f to display the result to 2 decimal places",
                  "Distinguish between simple interest and compound interest computations"
                ]
              },
              "theory": [
                {
                  "title": "🌱 Interest on interest — like a snowball rolling downhill!",
                  "body": [
                    "Simple interest always earns the same fixed amount every year. But compound interest earns interest on your ORIGINAL money AND on the interest you've already collected. So your money grows faster and faster — like a snowball picking up more snow as it rolls!",
                  ]
                },
                {
                  "title": "Compound Interest Formula",
                  "body": ["Unlike simple interest, compound interest calculates interest on both the principal and the previously accumulated interest:", "A = P * pow(1 + R/100, T)", "CI = A - P", "Where: P = Principal, R = Annual rate, T = Time, A = Amount"]
                },
                {
                  "title": "pow() Function",
                  "body": ["Syntax: double pow(double base, double exp);", "Returns base raised to the power exp. Requires #include <math.h> and -lm at compilation."]
                },
                {
                  "title": "🔢 Why not just multiply manually?",
                  "body": [
                    "What if T = 10 years? Would you write × 1.05 × 1.05 × 1.05 × 1.05 × 1.05 ... ten times? That's messy! pow(1.05, 10) does all that multiplication for you in one clean step. pow(base, exponent) means \"multiply base by itself exponent times.\""
                  ]
                },
                {
                  "title": "Why Not Use Simple Multiplication?",
                  "body": ["Compound interest involves raising a value to a power (exponentiation), which cannot be done cleanly with * alone for arbitrary T.", "pow() handles this for any real value of T, including fractional years."]
                },
                {
                  "title": "Float vs Double",
                  "body": ["For financial calculations with many decimal places, double is more precise than float. Always prefer double when using pow() and similar functions."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how pow() is called and how CI is derived from Amount minus Principal.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter principal, rate, time — e.g. 1000 10 2",
                "Click Run Code. Verify output: Compound Interest: 210.00",
                "Try fractional rates like 1000 8.5 3 and compare with simple interest. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double p, r, t, a, ci;\n    scanf(\"%lf %lf %lf\", &p, &r, &t);\n    a = p * pow(1 + r/100, t);\n    ci = a - p;\n    printf(\"Compound Interest: %.2f\\n\", ci);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio and math libraries", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Allocate memory for variables", "memory": [{ "variable": "p", "type": "double", "value": "?" }, { "variable": "r", "type": "double", "value": "?" }, { "variable": "t", "type": "double", "value": "?" }, { "variable": "a", "type": "double", "value": "?" }, { "variable": "ci", "type": "double", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "scanf() reads '1000 10 2'", "memory": [{ "variable": "p", "type": "double", "value": "1000" }, { "variable": "r", "type": "double", "value": "10" }, { "variable": "t", "type": "double", "value": "2" }, { "variable": "a", "type": "double", "value": "?" }, { "variable": "ci", "type": "double", "value": "?" }], "output": "" },
                  { "line": 7, "annotation": "Compute Amount using pow()", "memory": [{ "variable": "p", "type": "double", "value": "1000" }, { "variable": "r", "type": "double", "value": "10" }, { "variable": "t", "type": "double", "value": "2" }, { "variable": "a", "type": "double", "value": "1210.00" }, { "variable": "ci", "type": "double", "value": "?" }], "output": "" },
                  { "line": 8, "annotation": "Compute Compound Interest", "memory": [{ "variable": "p", "type": "double", "value": "1000" }, { "variable": "r", "type": "double", "value": "10" }, { "variable": "t", "type": "double", "value": "2" }, { "variable": "a", "type": "double", "value": "1210.00" }, { "variable": "ci", "type": "double", "value": "210.00" }], "output": "" },
                  { "line": 9, "annotation": "printf() displays result", "memory": [{ "variable": "p", "type": "double", "value": "1000" }, { "variable": "r", "type": "double", "value": "10" }, { "variable": "t", "type": "double", "value": "2" }, { "variable": "a", "type": "double", "value": "1210.00" }, { "variable": "ci", "type": "double", "value": "210.00" }], "output": "Compound Interest: 210.00\n" },
                  { "line": 10, "annotation": "Program terminates successfully", "memory": [{ "variable": "p", "type": "double", "value": "1000" }, { "variable": "r", "type": "double", "value": "10" }, { "variable": "t", "type": "double", "value": "2" }, { "variable": "a", "type": "double", "value": "1210.00" }, { "variable": "ci", "type": "double", "value": "210.00" }], "output": "Compound Interest: 210.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w3-3",
            "title": "Heron's Formula",
            "desc": "Calculate the area of a triangle using sides a, b, c.",
            "expected": "Area: 6.00",
            "content": {
              "aim": {
                "text": "This experiment demonstrates how to compute the area of a triangle when only its three side lengths are known — without needing height or any angle — using Heron's Formula (Area = √(s·(s-a)·(s-b)·(s-c)), where s is the semi-perimeter). Students will accept three side lengths as double inputs, verify the triangle inequality (a+b > c and variants), compute the semi-perimeter, apply the formula using sqrt() from math.h, and display the computed area. The experiment reinforces the use of intermediate variables, multi-step formula translation, and defensive input validation in C programs.",
                "bullets": [
                  "Declare and use float/double variables for side lengths and area",
                  "Compute the semi-perimeter of a triangle",
                  "Apply Heron's Formula using sqrt() from math.h",
                  "Validate that the three sides form a valid triangle",
                  "Use printf() with %.2f to display the computed area"
                ]
              },
              "theory": [
                {
                  "title": "📐 Finding area without a ruler for height!",
                  "body": [
                    "Usually to find a triangle's area you need ½ × base × height. But what if you only know the lengths of all three sides and can't measure the height? Heron of Alexandria figured out a clever formula about 2000 years ago that lets you do exactly that!",
                    "It's like being a detective — you use the clues you have (the three sides) to figure out something you can't directly measure (the area).",
                    "![Triangle with sides labeled a b c](herons-formula.webp)"
                  ]
                },
                {
                  "title": "Heron's Formula",
                  "body": ["Given a triangle with sides a, b, and c, its area can be computed without knowing any angle:", "s = (a + b + c) / 2 (semi-perimeter)", "Area = sqrt(s * (s-a) * (s-b) * (s-c))", "This formula works for any triangle as long as the sides satisfy the triangle inequality."]
                },
                {
                  "title": "Triangle Inequality",
                  "body": ["For three sides to form a valid triangle, the sum of any two sides must be greater than the third side:", "a + b > c, b + c > a, a + c > b", "If this condition is not met, the expression inside sqrt() becomes negative or zero, yielding NaN or 0 as the area."]
                },
                {
                  "title": "✅ The triangle test:",
                  "body": [
                    "Can you make a triangle with sides 3, 4, and 10? Try it with sticks! The 10cm stick is too long — the other two (3+4=7) can't even reach each other to close the triangle. So the rule is: any two sides added together must be longer than the third side. If this fails, there's no triangle — and your code should handle that!"
                  ]
                },
                {
                  "title": "Semi-perimeter",
                  "body": ["s is half the perimeter. It simplifies the formula and is a required intermediate value. Always compute s before computing the area."]
                },
                {
                  "title": "sqrt() and math.h",
                  "body": ["Heron's Formula requires a square root. Include math.h and compile with -lm."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how s is computed first and how each factor (s-a), (s-b), (s-c) is evaluated.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter three side lengths — e.g. 3 4 5",
                "Click Run Code. Verify output: Area: 6.00",
                "Try an equilateral triangle like 5 5 5 and an invalid input like 1 2 10. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double a, b, c, s, area;\n    scanf(\"%lf %lf %lf\", &a, &b, &c);\n    s = (a + b + c) / 2;\n    area = sqrt(s * (s-a) * (s-b) * (s-c));\n    printf(\"Area: %.2f\\n\", area);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio and math libraries", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Allocate memory for variables", "memory": [{ "variable": "a", "type": "double", "value": "?" }, { "variable": "b", "type": "double", "value": "?" }, { "variable": "c", "type": "double", "value": "?" }, { "variable": "s", "type": "double", "value": "?" }, { "variable": "area", "type": "double", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "scanf() reads '3 4 5' from user", "memory": [{ "variable": "a", "type": "double", "value": "3.00" }, { "variable": "b", "type": "double", "value": "4.00" }, { "variable": "c", "type": "double", "value": "5.00" }, { "variable": "s", "type": "double", "value": "?" }, { "variable": "area", "type": "double", "value": "?" }], "output": "" },
                  { "line": 7, "annotation": "Compute semi-perimeter s", "memory": [{ "variable": "a", "type": "double", "value": "3.00" }, { "variable": "b", "type": "double", "value": "4.00" }, { "variable": "c", "type": "double", "value": "5.00" }, { "variable": "s", "type": "double", "value": "6.00" }, { "variable": "area", "type": "double", "value": "?" }], "output": "" },
                  { "line": 8, "annotation": "Compute Area using Heron's formula", "memory": [{ "variable": "a", "type": "double", "value": "3.00" }, { "variable": "b", "type": "double", "value": "4.00" }, { "variable": "c", "type": "double", "value": "5.00" }, { "variable": "s", "type": "double", "value": "6.00" }, { "variable": "area", "type": "double", "value": "6.00" }], "output": "" },
                  { "line": 9, "annotation": "printf() displays area", "memory": [{ "variable": "a", "type": "double", "value": "3.00" }, { "variable": "b", "type": "double", "value": "4.00" }, { "variable": "c", "type": "double", "value": "5.00" }, { "variable": "s", "type": "double", "value": "6.00" }, { "variable": "area", "type": "double", "value": "6.00" }], "output": "Area: 6.00\n" },
                  { "line": 10, "annotation": "Program terminates successfully", "memory": [{ "variable": "a", "type": "double", "value": "3.00" }, { "variable": "b", "type": "double", "value": "4.00" }, { "variable": "c", "type": "double", "value": "5.00" }, { "variable": "s", "type": "double", "value": "6.00" }, { "variable": "area", "type": "double", "value": "6.00" }], "output": "Area: 6.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w3-4",
            "title": "Distance Traveled",
            "desc": "Calculate distance using s = ut + 0.5*a*t^2.",
            "expected": "Distance: 20.00",
            "content": {
              "aim": {
                "text": "This experiment applies C arithmetic to classical kinematics by implementing the second equation of motion (s = ut + ½at²). Students will accept initial velocity, acceleration, and time as floating-point inputs, compute the distance traveled using the kinematic formula, and display the result to two decimal places. A central learning point is the integer-division trap: writing 1/2 in C yields 0, so the constant ½ must be written as 0.5. The experiment connects physics equations to programming and reinforces careful handling of constants and operators in C arithmetic expressions.",
                "bullets": [
                  "Declare and use float variables for physical quantities",
                  "Apply the kinematic equation: s = ut + (1/2) * a * t * t",
                  "Understand why (1/2) must be written as 0.5 or (float)1/2 to avoid integer truncation",
                  "Use printf() with %.2f to display the distance to 2 decimal places"
                ]
              },
              "theory": [
                {
                  "title": "🚀 Launching a rocket in code!",
                  "body": [
                    "Imagine a car starts from rest (initial velocity = 0) and speeds up at 2 m/s every second (acceleration = 2 m/s²). After 5 seconds, how far has it gone? This formula from physics tells you exactly that! It's the same formula scientists use to calculate how far a rocket travels after launch.",
                    "s = u×t + ½×a×t²",
                    "u = starting speed, a = how fast it's speeding up, t = how many seconds passed",
                    "![Projectile motion parabolic](projectile-motion.webp)"
                  ]
                },
                {
                  "title": "Equation of Motion",
                  "body": ["The distance traveled by an object under uniform acceleration is:", "s = u*t + 0.5 * a * t * t", "Where: s = Distance (m), u = Initial velocity (m/s), a = Acceleration (m/s²), t = Time (s)", "This is the second equation of motion from classical kinematics."]
                },
                {
                  "title": "Integer Division Pitfall",
                  "body": ["Writing 1/2 in C evaluates to 0 because both operands are integer literals, truncating the result.", "Always write 0.5 or (float)1/2 to preserve the half factor."]
                },
                {
                  "title": "⚠️ The sneaky 1/2 bug again!",
                  "body": [
                    "Writing 1/2 in C gives 0 — not 0.5! Always write 0.5 directly in physics formulas. It's one of the most common beginner mistakes that causes completely wrong answers. The computer isn't wrong — it's just doing integer math because you gave it two whole numbers!"
                  ]
                },
                {
                  "title": "Squaring t",
                  "body": ["C has no ** operator. To compute t squared, write t * t or use pow(t, 2).", "For simple squaring, t * t is preferred as it avoids the overhead of calling pow()."]
                },
                {
                  "title": "Units",
                  "body": ["Ensure consistent units. If u is in m/s and a is in m/s², then t must be in seconds and s will be in metres."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how each term u*t and 0.5*a*t*t is computed and summed.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter initial velocity, acceleration, time — e.g. 0 10 2",
                "Click Run Code. Verify output: Distance: 20.00",
                "Try u = 5, a = 2, t = 3 and manually verify. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    float u, a, t, s;\n    scanf(\"%f %f %f\", &u, &a, &t);\n    s = u * t + 0.5 * a * t * t;\n    printf(\"Distance: %.2f\\n\", s);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate memory for floats", "memory": [{ "variable": "u", "type": "float", "value": "?" }, { "variable": "a", "type": "float", "value": "?" }, { "variable": "t", "type": "float", "value": "?" }, { "variable": "s", "type": "float", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '0 10 2'", "memory": [{ "variable": "u", "type": "float", "value": "0.00" }, { "variable": "a", "type": "float", "value": "10.00" }, { "variable": "t", "type": "float", "value": "2.00" }, { "variable": "s", "type": "float", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "Compute Distance s", "memory": [{ "variable": "u", "type": "float", "value": "0.00" }, { "variable": "a", "type": "float", "value": "10.00" }, { "variable": "t", "type": "float", "value": "2.00" }, { "variable": "s", "type": "float", "value": "20.00" }], "output": "" },
                  { "line": 7, "annotation": "printf() displays distance", "memory": [{ "variable": "u", "type": "float", "value": "0.00" }, { "variable": "a", "type": "float", "value": "10.00" }, { "variable": "t", "type": "float", "value": "2.00" }, { "variable": "s", "type": "float", "value": "20.00" }], "output": "Distance: 20.00\n" },
                  { "line": 8, "annotation": "Program terminates", "memory": [{ "variable": "u", "type": "float", "value": "0.00" }, { "variable": "a", "type": "float", "value": "10.00" }, { "variable": "t", "type": "float", "value": "2.00" }, { "variable": "s", "type": "float", "value": "20.00" }], "output": "Distance: 20.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 4",
        "objective": "Expressions, operator precedence and associativity",
        "tutorial": "Tutorial 4: Operators and Precedence",
        "labTitle": "Lab 4: Expressions and Operators",
        "experiments": [
          {
            "id": "c-w4-1",
            "title": "Expression Evaluation",
            "desc": "Evaluate the expression A+B*C+(D*E)+F*G.",
            "expected": "2 + 3 * 4 = 14",
            "content": {
              "aim": {
                "text": "This experiment develops a precise understanding of how C evaluates arithmetic expressions containing multiple operators. Students will write a program that evaluates a set of expressions — including expressions mixing +, *, %, and unary operators — and prints each result. The core learning objective is understanding operator precedence (multiplication and division before addition and subtraction), left-to-right associativity for same-precedence operators, and how parentheses override default evaluation order. Students will also distinguish between integer and floating-point division, and explore the modulus operator for remainder computation.",
                "bullets": [
                  "Understand operator precedence levels in C (*, /, % before +, -)",
                  "Understand left-to-right associativity for arithmetic operators",
                  "Use parentheses to control evaluation order",
                  "Declare and use int and float variables to observe truncation vs precision",
                  "Print intermediate and final results using printf()"
                ]
              },
              "theory": [
                {
                  "title": "🎯 Math has a queue, just like a canteen!",
                  "body": [
                    "In a school canteen, students with lunch boxes go first, then others. In C math, × and ÷ always go before + and −. This ordering is called operator precedence — it's the queue system of mathematics!",
                    "So 2 + 3 × 4 = 2 + 12 = 14 (NOT 5 × 4 = 20)",
                    "Use ( ) parentheses whenever you want something to go first in the queue!",
                    "![Operator precedence table](Operator-Precedence-and-Associativity-in-C.webp)"
                  ]
                },
                {
                  "title": "Operator Precedence",
                  "body": ["When an expression contains multiple operators, C evaluates higher-precedence operators first. The standard precedence order for arithmetic:", "Level 1 (highest): *, /, %", "Level 2: +, -", "Level 3 (lowest): = (assignment)", "Example: 2 + 3 * 4 evaluates as 2 + (3 * 4) = 2 + 12 = 14, not 20."]
                },
                {
                  "title": "Associativity",
                  "body": ["When two operators have equal precedence, associativity determines evaluation order. All basic arithmetic operators are left-to-right associative:", "10 - 3 - 2 evaluates as (10 - 3) - 2 = 5, not 10 - (3 - 2) = 9."]
                },
                {
                  "title": "↔️ Left to right — like reading a book!",
                  "body": [
                    "When operators have the same precedence (like − and −), C reads them left to right, just like you read a sentence. So 10 - 3 - 2 becomes (10-3) - 2 = 5, not 10 - (3-2) = 9. Always read left to right when in doubt!"
                  ]
                },
                {
                  "title": "Parentheses",
                  "body": ["Parentheses override all precedence rules and force a sub-expression to be evaluated first:", "(2 + 3) * 4 = 20"]
                },
                {
                  "title": "Modulus and Types",
                  "body": ["Integer vs Float Division — 7 / 2 = 3 (integer truncation). 7.0 / 2 = 3.5 (float).", "Modulus Operator — % gives the remainder of integer division. 17 % 5 = 2 because 17 = 5*3 + 2. % is only valid for integer operands in C."]
                },
                {
                  "title": "🧮 What is % — the remainder operator?",
                  "body": [
                    "17 % 5 means: \"how many are left over after dividing 17 into groups of 5?\"",
                    "17 ÷ 5 = 3 groups of 5 (that's 15), with 2 left over.",
                    "So 17 % 5 = 2.",
                    "A super useful trick: number % 2 == 0 checks if a number is even. If the remainder when divided by 2 is zero, the number is even!"
                  ]
                },
                {
                  "title": "Increment and Decrement",
                  "body": ["++ and -- modify a variable by 1.", "Pre-increment ++x : increments first, then uses value.", "Post-increment x++ : uses value first, then increments."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the expression evaluation trace.",
                "Observe how each sub-expression is evaluated in order of precedence.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "The program evaluates a set of expressions and prints each result.",
                "Click Run Code. Verify each printed result matches the expected value.",
                "Modify the expressions using parentheses and observe how results change. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int res1 = 2 + 3 * 4;\n    int res2 = 10 - 3 - 2;\n    int res3 = 17 % 5;\n    printf(\"2 + 3 * 4 = %d\\n\", res1);\n    printf(\"10 - 3 - 2 = %d\\n\", res2);\n    printf(\"17 %% 5 = %d\\n\", res3);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Evaluate 3 * 4 first, then 2 + 12 = 14", "memory": [{ "variable": "res1", "type": "int", "value": "14" }], "output": "" },
                  { "line": 5, "annotation": "Left to right: 10 - 3 = 7, then 7 - 2 = 5", "memory": [{ "variable": "res1", "type": "int", "value": "14" }, { "variable": "res2", "type": "int", "value": "5" }], "output": "" },
                  { "line": 6, "annotation": "17 % 5 is remainder of 17 / 5, which is 2", "memory": [{ "variable": "res1", "type": "int", "value": "14" }, { "variable": "res2", "type": "int", "value": "5" }, { "variable": "res3", "type": "int", "value": "2" }], "output": "" },
                  { "line": 7, "annotation": "Print first result", "memory": [{ "variable": "res1", "type": "int", "value": "14" }, { "variable": "res2", "type": "int", "value": "5" }, { "variable": "res3", "type": "int", "value": "2" }], "output": "2 + 3 * 4 = 14\n" },
                  { "line": 8, "annotation": "Print second result", "memory": [{ "variable": "res1", "type": "int", "value": "14" }, { "variable": "res2", "type": "int", "value": "5" }, { "variable": "res3", "type": "int", "value": "2" }], "output": "2 + 3 * 4 = 14\n10 - 3 - 2 = 5\n" },
                  { "line": 9, "annotation": "Print third result", "memory": [{ "variable": "res1", "type": "int", "value": "14" }, { "variable": "res2", "type": "int", "value": "5" }, { "variable": "res3", "type": "int", "value": "2" }], "output": "2 + 3 * 4 = 14\n10 - 3 - 2 = 5\n17 % 5 = 2\n" },
                  { "line": 10, "annotation": "Program terminates", "memory": [{ "variable": "res1", "type": "int", "value": "14" }, { "variable": "res2", "type": "int", "value": "5" }, { "variable": "res3", "type": "int", "value": "2" }], "output": "2 + 3 * 4 = 14\n10 - 3 - 2 = 5\n17 % 5 = 2\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w4-2",
            "title": "Max of Three",
            "desc": "Find maximum among three numbers using conditional operator.",
            "expected": "Maximum: 25",
            "content": {
              "aim": {
                "text": "This experiment introduces the ternary (conditional) operator and relational operators in C by solving the practical problem of finding the largest of three integers. Students will accept three integers from the user and determine the maximum using a nested ternary expression ((a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c)). The experiment teaches how relational operators produce boolean (0/1) results, how the ternary operator acts as a compact inline decision maker, and how logical operators can combine multiple conditions — providing a foundation for all decision-making constructs in subsequent experiments.",
                "bullets": [
                  "Declare and use int variables",
                  "Apply relational operators (>, <, >=, <=, ==, !=)",
                  "Use the ternary (conditional) operator ?: to select the maximum value",
                  "Understand short-circuit evaluation in logical expressions",
                  "Use printf() to display the result"
                ]
              },
              "theory": [
                {
                  "title": "Relational Operators",
                  "body": ["Used to compare two values and return 1 (true) or 0 (false):", "> greater than, < less than, >= greater than or equal to, <= less than or equal to", "== equal to (note: == not =, which is assignment)", "!= not equal to"]
                },
                {
                  "title": "Ternary Operator",
                  "body": ["The conditional (ternary) operator is the only C operator that takes three operands.", "Syntax: condition ? expression_if_true : expression_if_false", "Example: max = (a > b) ? a : b;", "If a > b is true, max gets a; otherwise max gets b."]
                },
                {
                  "title": "Finding Max of Three",
                  "body": ["Chain two ternary operations:", "max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);", "Alternatively, use two sequential comparisons with a temporary variable:", "![Flow of finding max of three numbers](largest-among-three-numbers.webp)","max = a; if (b > max) max = b; if (c > max) max = c;"]
                },
                {
                  "title": "Logical Operators and Precedence",
                  "body": ["Logical Operators — && (AND), || (OR), ! (NOT) are used to combine conditions. (a > b && a > c) is true only when a is strictly greater than both b and c.", "Arithmetic operators have higher precedence than relational operators.", "Relational operators have higher precedence than logical operators.", "Ternary has lower precedence than arithmetic and relational but higher than assignment."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the ternary evaluation trace.",
                "Observe how conditions are evaluated and how the ternary operator selects a value.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter three integers — e.g. 10 25 7",
                "Click Run Code. Verify output: Maximum: 25",
                "Try equal values like 5 5 5 and negative values like -3 -1 -7. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int a, b, c, max;\n    scanf(\"%d %d %d\", &a, &b, &c);\n    max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);\n    printf(\"Maximum: %d\\n\", max);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate memory for integers", "memory": [{ "variable": "a", "type": "int", "value": "?" }, { "variable": "b", "type": "int", "value": "?" }, { "variable": "c", "type": "int", "value": "?" }, { "variable": "max", "type": "int", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '10 25 7'", "memory": [{ "variable": "a", "type": "int", "value": "10" }, { "variable": "b", "type": "int", "value": "25" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "max", "type": "int", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "Evaluate ternary: (10 > 25) is false, so evaluate ((25 > 7) ? 25 : 7) -> 25", "memory": [{ "variable": "a", "type": "int", "value": "10" }, { "variable": "b", "type": "int", "value": "25" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "max", "type": "int", "value": "25" }], "output": "" },
                  { "line": 7, "annotation": "printf() displays max", "memory": [{ "variable": "a", "type": "int", "value": "10" }, { "variable": "b", "type": "int", "value": "25" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "max", "type": "int", "value": "25" }], "output": "Maximum: 25\n" },
                  { "line": 8, "annotation": "Program terminates", "memory": [{ "variable": "a", "type": "int", "value": "10" }, { "variable": "b", "type": "int", "value": "25" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "max", "type": "int", "value": "25" }], "output": "Maximum: 25\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w4-3",
            "title": "Marks Average",
            "desc": "Calculate total and average of 5 subjects.",
            "expected": "Total: 425 Average: 85.00 Grade: B",
            "content": {
              "aim": {
                "text": "This experiment integrates multiple operator concepts to solve a realistic grading problem. Students will accept marks for five subjects, accumulate the total using compound assignment operators (+=), compute the float average with a type cast, and determine the student's grade using a chain of relational and logical comparisons (>=, &&). By the end, students will understand how compound assignment shortens repetitive code, how operator precedence affects multi-condition boolean expressions, and how a sequence of if-else if branches selects exactly one outcome from a set of mutually exclusive grade bands.",
                "bullets": [
                  "Declare and use int variables for marks and float for average",
                  "Apply compound assignment operators (+=) to accumulate a total",
                  "Use relational and logical operators to determine a grade band",
                  "Use the ternary operator or chained conditions for grade classification",
                  "Use printf() with %d and %.2f format specifiers"
                ]
              },
              "theory": [
                {
                  "title": "Compound Assignment Operators",
                  "body": ["C provides shorthand operators that combine arithmetic with assignment:", "total += marks is equivalent to total = total + marks", "x *= 2 is equivalent to x = x * 2", "These make code concise and reduce repetition."]
                },
                {
                  "title": "Average Calculation",
                  "body": ["To compute an average:", "average = (float)total / n", "The cast to float ensures decimal precision. If total and n are both int, integer division truncates the result."]
                },
                {
                  "title": "Relational and Logical Operators in Grading",
                  "body": ["Grade bands are checked using >= and <= with && (AND):", "if (average >= 90 && average <= 100) → Grade A", "if (average >= 75 && average < 90) → Grade B", "if (average >= 60 && average < 75) → Grade C", "if (average >= 40 && average < 60) → Grade D", "if (average < 40) → Grade F"]
                },
                {
                  "title": "Precedence and Associativity",
                  "body": ["Arithmetic is evaluated first, then relational operators (>, >=, <, <=), then logical operators (&&, ||).", "Parentheses can be used to make complex conditions clearer.", "Both && and || are left-to-right associative. In (a && b && c), a is evaluated first; if a is false, the rest are short-circuited (not evaluated)."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the accumulation and grading trace.",
                "Observe how += builds the total and how the grade condition chain is evaluated.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter marks for 5 subjects — e.g. 85 90 78 92 80",
                "Click Run Code. Verify output shows Total, Average, and Grade correctly.",
                "Try borderline inputs like 40 40 40 40 40 and 39 39 39 39 39. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int m1, m2, m3, m4, m5;\n    int total = 0;\n    float avg;\n    scanf(\"%d %d %d %d %d\", &m1, &m2, &m3, &m4, &m5);\n    total += m1; total += m2; total += m3; total += m4; total += m5;\n    avg = (float)total / 5;\n    printf(\"Total: %d\\nAverage: %.2f\\n\", total, avg);\n    if (avg >= 90) printf(\"Grade: A\\n\");\n    else if (avg >= 75) printf(\"Grade: B\\n\");\n    else if (avg >= 60) printf(\"Grade: C\\n\");\n    else if (avg >= 40) printf(\"Grade: D\\n\");\n    else printf(\"Grade: F\\n\");\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate memory for marks", "memory": [{ "variable": "total", "type": "int", "value": "0" }, { "variable": "avg", "type": "float", "value": "?" }], "output": "" },
                  { "line": 7, "annotation": "scanf() reads '85 90 78 92 80'", "memory": [{ "variable": "total", "type": "int", "value": "0" }, { "variable": "avg", "type": "float", "value": "?" }], "output": "" },
                  { "line": 8, "annotation": "Accumulate total using +=", "memory": [{ "variable": "total", "type": "int", "value": "425" }, { "variable": "avg", "type": "float", "value": "?" }], "output": "" },
                  { "line": 9, "annotation": "Compute float average", "memory": [{ "variable": "total", "type": "int", "value": "425" }, { "variable": "avg", "type": "float", "value": "85.00" }], "output": "" },
                  { "line": 10, "annotation": "Print total and average", "memory": [{ "variable": "total", "type": "int", "value": "425" }, { "variable": "avg", "type": "float", "value": "85.00" }], "output": "Total: 425\nAverage: 85.00\n" },
                  { "line": 11, "annotation": "Check if avg >= 90 (False)", "memory": [{ "variable": "total", "type": "int", "value": "425" }, { "variable": "avg", "type": "float", "value": "85.00" }], "output": "Total: 425\nAverage: 85.00\n" },
                  { "line": 12, "annotation": "Check if avg >= 75 (True), print Grade: B", "memory": [{ "variable": "total", "type": "int", "value": "425" }, { "variable": "avg", "type": "float", "value": "85.00" }], "output": "Total: 425\nAverage: 85.00\nGrade: B\n" },
                  { "line": 17, "annotation": "Program terminates", "memory": [{ "variable": "total", "type": "int", "value": "425" }, { "variable": "avg", "type": "float", "value": "85.00" }], "output": "Total: 425\nAverage: 85.00\nGrade: B\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 5",
        "objective": "if-else, switch-case, nested-if, relational and logical operators",
        "tutorial": "Tutorial 5: Branching",
        "labTitle": "Lab 5: Conditional statements",
        "experiments": [
          {
            "id": "c-w5-1",
            "title": "Max and Min of Four Numbers",
            "desc": "Find the max and min of four numbers using if-else.",
            "expected": "Maximum: 45 Minimum: 7",
            "content": {
              "aim": {
                "text": "This experiment develops systematic multi-value comparison skills using nested if-else and sequential if statements in C. Students will accept four integers from the user, initialise both a maximum and a minimum tracker to the first element, and then compare each remaining element against the current maximum and minimum, updating them whenever a larger or smaller value is found. A single pass through all four values is sufficient to determine both extremes simultaneously. The experiment reinforces the initialisation-to-first-element strategy, avoidance of arbitrary initial values (such as 0) that fail for all-negative inputs, and clean display of both results.",
                "bullets": [
                  "Declare and use int variables for four input numbers",
                  "Apply nested if-else to compare multiple values systematically",
                  "Use relational operators (>, <) to drive conditional logic",
                  "Track both maximum and minimum in a single program pass",
                  "Use printf() to display the results clearly"
                ]
              },
              "theory": [
                {
                  "title": "🏆 The sports tournament analogy!",
                  "body": [
                    "Imagine 4 students running a race. How do you find the fastest? Simple — you watch who crosses the finish line first! In code, we do the same thing: start by assuming the first person is the fastest, then check each remaining person. If someone is faster, they become the new \"champion.\" Keep going until you've checked everyone — the last champion is your winner (maximum)!",
                    "Finding the minimum is the same game, but you're looking for the slowest instead.",
                    "![Race track finish line](max-min.webp)"
                  ]
                },
                {
                  "title": "Nested if-else",
                  "body": ["An if-else construct placed inside another if or else block is called a nested if-else. It allows multi-way decisions based on a sequence of conditions.", "if (condition1) {\n    if (condition2) { ... }\n    else { ... }\n} else { ... }"]
                },
                {
                  "title": "🪆 Nested if-else = boxes inside boxes!",
                  "body": [
                    "Think of Russian nesting dolls (Matryoshka). The outer doll checks one condition. If you open it, there's another doll inside checking another condition. That's exactly what nested if-else does — decisions inside decisions. The computer opens each layer one by one until it finds the answer!",
                    "![Russian matryoshka nesting dolls](doll-analogy.webp)"
                  ]
                },
                {
                  "title": "Finding Maximum and Minimum",
                  "body": ["Assume the first variable is the maximum, then compare it against each remaining variable, updating the maximum whenever a larger value is found:", "max = a; if (b > max) max = b; if (c > max) max = c; if (d > max) max = d;", "Same strategy in reverse for minimum:", "min = a; if (b < min) min = b; if (c < min) min = c; if (d < min) min = d;"]
                },
                {
                  "title": "Relational and Logical Operators",
                  "body": ["> greater than, < less than, >= greater or equal, <= less or equal, == equality check, != not equal.", "Logical AND (&&) can combine conditions to check max in one step: if (a >= b && a >= c && a >= d) max = a;"]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the comparison trace.",
                "Observe how max and min are updated as each number is compared.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter four integers — e.g. 12 45 7 30",
                "Click Run Code. Verify output: Maximum: 45  Minimum: 7",
                "Try all equal values like 5 5 5 5 and negative values like -3 -8 -1 -5. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int a, b, c, d, max, min;\n    scanf(\"%d %d %d %d\", &a, &b, &c, &d);\n    max = a; min = a;\n    if (b > max) max = b;\n    if (c > max) max = c;\n    if (d > max) max = d;\n    if (b < min) min = b;\n    if (c < min) min = c;\n    if (d < min) min = d;\n    printf(\"Maximum: %d\\nMinimum: %d\\n\", max, min);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "a", "type": "int", "value": "?" }, { "variable": "b", "type": "int", "value": "?" }, { "variable": "c", "type": "int", "value": "?" }, { "variable": "d", "type": "int", "value": "?" }, { "variable": "max", "type": "int", "value": "?" }, { "variable": "min", "type": "int", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '12 45 7 30'", "memory": [{ "variable": "a", "type": "int", "value": "12" }, { "variable": "b", "type": "int", "value": "45" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "d", "type": "int", "value": "30" }, { "variable": "max", "type": "int", "value": "?" }, { "variable": "min", "type": "int", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "Assume first is max and min", "memory": [{ "variable": "a", "type": "int", "value": "12" }, { "variable": "b", "type": "int", "value": "45" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "d", "type": "int", "value": "30" }, { "variable": "max", "type": "int", "value": "12" }, { "variable": "min", "type": "int", "value": "12" }], "output": "" },
                  { "line": 7, "annotation": "45 > 12 is true, update max to 45", "memory": [{ "variable": "a", "type": "int", "value": "12" }, { "variable": "b", "type": "int", "value": "45" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "d", "type": "int", "value": "30" }, { "variable": "max", "type": "int", "value": "45" }, { "variable": "min", "type": "int", "value": "12" }], "output": "" },
                  { "line": 8, "annotation": "7 > 45 is false, max stays 45", "memory": [{ "variable": "a", "type": "int", "value": "12" }, { "variable": "b", "type": "int", "value": "45" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "d", "type": "int", "value": "30" }, { "variable": "max", "type": "int", "value": "45" }, { "variable": "min", "type": "int", "value": "12" }], "output": "" },
                  { "line": 9, "annotation": "30 > 45 is false, max stays 45", "memory": [{ "variable": "a", "type": "int", "value": "12" }, { "variable": "b", "type": "int", "value": "45" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "d", "type": "int", "value": "30" }, { "variable": "max", "type": "int", "value": "45" }, { "variable": "min", "type": "int", "value": "12" }], "output": "" },
                  { "line": 10, "annotation": "45 < 12 is false, min stays 12", "memory": [{ "variable": "a", "type": "int", "value": "12" }, { "variable": "b", "type": "int", "value": "45" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "d", "type": "int", "value": "30" }, { "variable": "max", "type": "int", "value": "45" }, { "variable": "min", "type": "int", "value": "12" }], "output": "" },
                  { "line": 11, "annotation": "7 < 12 is true, update min to 7", "memory": [{ "variable": "a", "type": "int", "value": "12" }, { "variable": "b", "type": "int", "value": "45" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "d", "type": "int", "value": "30" }, { "variable": "max", "type": "int", "value": "45" }, { "variable": "min", "type": "int", "value": "7" }], "output": "" },
                  { "line": 12, "annotation": "30 < 7 is false, min stays 7", "memory": [{ "variable": "a", "type": "int", "value": "12" }, { "variable": "b", "type": "int", "value": "45" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "d", "type": "int", "value": "30" }, { "variable": "max", "type": "int", "value": "45" }, { "variable": "min", "type": "int", "value": "7" }], "output": "" },
                  { "line": 13, "annotation": "Print result", "memory": [{ "variable": "a", "type": "int", "value": "12" }, { "variable": "b", "type": "int", "value": "45" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "d", "type": "int", "value": "30" }, { "variable": "max", "type": "int", "value": "45" }, { "variable": "min", "type": "int", "value": "7" }], "output": "Maximum: 45\nMinimum: 7\n" },
                  { "line": 14, "annotation": "Program terminates", "memory": [{ "variable": "a", "type": "int", "value": "12" }, { "variable": "b", "type": "int", "value": "45" }, { "variable": "c", "type": "int", "value": "7" }, { "variable": "d", "type": "int", "value": "30" }, { "variable": "max", "type": "int", "value": "45" }, { "variable": "min", "type": "int", "value": "7" }], "output": "Maximum: 45\nMinimum: 7\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w5-2",
            "title": "Electricity Bill Generator",
            "desc": "Generate electricity bill based on units consumed.",
            "expected": "Electricity Bill: Rs. 650.00",
            "content": {
              "aim": {
                "text": "This experiment applies if-else if-else chains to implement a real-world multi-slab electricity billing system. Students will accept the number of units consumed, identify which consumption slabs apply, compute the cumulative cost for each slab at its respective per-unit rate, add a fixed service charge, and display the total bill to two decimal places. The experiment demonstrates how branching constructs model real regulatory tariff structures, why cumulative (not flat) billing requires careful arithmetic across slab boundaries, and how a single correct branch in an if-else if chain executes to the exclusion of all others.",
                "bullets": [
                  "Declare and use int and float variables for units and bill amount",
                  "Apply if-else if-else chains to implement multi-slab billing logic",
                  "Perform cumulative arithmetic across multiple slabs",
                  "Use printf() with %.2f to display the bill to 2 decimal places",
                  "Understand real-world applications of conditional branching"
                ]
              },
              "theory": [
                {
                  "title": "💡 Why does your bill go up so fast?!",
                  "body": [
                    "Have you ever noticed that when your family uses a LOT of electricity, the bill suddenly jumps up way more than expected? That's because electricity boards use a slab system — the more you use, the higher the price per unit. It's like a video game where the first 100 units are \"easy mode\" (cheap), the next 100 are \"medium mode\" (costlier), and anything beyond that is \"hard mode\" (expensive)!",
                    "This teaches the computer to calculate exactly how much to charge based on which \"level\" of usage you're in.",
                  ]
                },
                {
                  "title": "Slab-Based Tariff",
                  "body": ["Electricity boards charge different rates per unit for different consumption ranges. A common slab structure:", "Units 1–100 : Rs. 1.50 per unit", "Units 101–200 : Rs. 2.50 per unit (for units above 100)", "Units 201–300 : Rs. 4.00 per unit (for units above 200)", "Units above 300: Rs. 6.00 per unit (for units above 300)"]
                },
                {
                  "title": "🎮 The slab game — an example:",
                  "body": [
                    "You used 250 units this month. Here's how the bill works:",
                    "First 100 units → cheapest price (easy mode)",
                    "Next 100 units → medium price",
                    "Last 50 units → higher price (only 50 units, not 100!)",
                    "You pay for each slab separately and add them all up. The computer uses if-else if to figure out which slabs you've crossed!"
                  ]
                },
                {
                  "title": "Cumulative Billing",
                  "body": ["A consumer using 250 units pays:", "First 100 units: 100 * 1.50 = 150.00", "Next 100 units: 100 * 2.50 = 250.00", "Last 50 units: 50 * 4.00 = 200.00", "Total: Rs. 600.00"]
                },
                {
                  "title": "if-else if-else Chain",
                  "body": ["Used when exactly one of several mutually exclusive conditions must be selected:", "if (units <= 100) { ... } else if (units <= 200) { ... } else if (units <= 300) { ... } else { ... }", "Once a condition is true, the rest of the chain is skipped. A fixed service charge (e.g. Rs. 50) is often added to the computed amount."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the slab selection and bill computation.",
                "Observe how the if-else if chain selects exactly one slab block to execute.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter number of units consumed — e.g. 250",
                "Click Run Code. Verify output: Electricity Bill: Rs. 650.00 (including Rs. 50 service charge)",
                "Try 50, 150, 350 units to exercise all slab branches. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int units;\n    float bill = 0;\n    scanf(\"%d\", &units);\n    if (units <= 100) {\n        bill = units * 1.50;\n    } else if (units <= 200) {\n        bill = (100 * 1.50) + ((units - 100) * 2.50);\n    } else if (units <= 300) {\n        bill = (100 * 1.50) + (100 * 2.50) + ((units - 200) * 4.00);\n    } else {\n        bill = (100 * 1.50) + (100 * 2.50) + (100 * 4.00) + ((units - 300) * 6.00);\n    }\n    bill += 50.00;\n    printf(\"Electricity Bill: Rs. %.2f\\n\", bill);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "units", "type": "int", "value": "?" }, { "variable": "bill", "type": "float", "value": "0.00" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '250'", "memory": [{ "variable": "units", "type": "int", "value": "250" }, { "variable": "bill", "type": "float", "value": "0.00" }], "output": "" },
                  { "line": 6, "annotation": "units <= 100 is false", "memory": [{ "variable": "units", "type": "int", "value": "250" }, { "variable": "bill", "type": "float", "value": "0.00" }], "output": "" },
                  { "line": 8, "annotation": "units <= 200 is false", "memory": [{ "variable": "units", "type": "int", "value": "250" }, { "variable": "bill", "type": "float", "value": "0.00" }], "output": "" },
                  { "line": 10, "annotation": "units <= 300 is true, executing this block", "memory": [{ "variable": "units", "type": "int", "value": "250" }, { "variable": "bill", "type": "float", "value": "0.00" }], "output": "" },
                  { "line": 11, "annotation": "Calculate 150 + 250 + (50 * 4.00) = 600.00", "memory": [{ "variable": "units", "type": "int", "value": "250" }, { "variable": "bill", "type": "float", "value": "600.00" }], "output": "" },
                  { "line": 15, "annotation": "Add fixed service charge of Rs. 50", "memory": [{ "variable": "units", "type": "int", "value": "250" }, { "variable": "bill", "type": "float", "value": "650.00" }], "output": "" },
                  { "line": 16, "annotation": "printf() displays total bill", "memory": [{ "variable": "units", "type": "int", "value": "250" }, { "variable": "bill", "type": "float", "value": "650.00" }], "output": "Electricity Bill: Rs. 650.00\n" },
                  { "line": 17, "annotation": "Program terminates", "memory": [{ "variable": "units", "type": "int", "value": "250" }, { "variable": "bill", "type": "float", "value": "650.00" }], "output": "Electricity Bill: Rs. 650.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w5-3",
            "title": "Quadratic Roots",
            "desc": "Find roots of the quadratic equation ax2+bx+c=0.",
            "expected": "Roots: 3.00, 2.00 or Complex",
            "content": {
              "aim": {
                "text": "This experiment uses nested if-else branching to classify and compute the roots of a quadratic equation ax² + bx + c = 0 based on the discriminant (D = b² − 4ac). Students will accept the three coefficients, handle the special case a = 0 (linear equation), compute D, and branch into three paths: two distinct real roots (D > 0), two equal real roots (D = 0), or complex conjugate roots (D < 0). The experiment reinforces the use of sqrt() from math.h, demonstrates how a single computed discriminant value drives three completely different code paths, and builds defensive programming habits through edge-case checking before applying formulas.",
                "bullets": [
                  "Declare and use float/double variables for coefficients and roots",
                  "Compute the discriminant: D = b*b - 4*a*c",
                  "Use nested if-else to classify roots as real & distinct, real & equal, or complex",
                  "Apply sqrt() from math.h to compute real roots",
                  "Handle edge cases including a = 0 (not a quadratic)"
                ]
              },
              "theory": [
                {
                  "title": "🎯 Finding where a curve touches the ground!",
                  "body": [
                    "Imagine you throw a ball in the air. It goes up, reaches a peak, then comes back down. If you draw this path, it makes a U-shaped curve (called a parabola). A quadratic equation describes this curve. The \"roots\" are the two points where the ball hits the ground (touches the x-axis)!",
                    "The formula ax² + bx + c = 0 is the math that describes that ball's path. Solving it tells you WHEN it lands.",
                    "![Parabola touching x-axis graph](parabola.webp)"
                  ]
                },
                {
                  "title": "Quadratic Formula",
                  "body": ["A second-degree polynomial equation of the form: ax² + bx + c = 0 where a ≠ 0", "Formula: x = (-b ± sqrt(b² - 4ac)) / (2a)"]
                },
                {
                  "title": "Discriminant",
                  "body": ["D = b² - 4ac determines the nature of the roots:", "D > 0 : Two distinct real roots. x1 = (-b + sqrt(D)) / (2a), x2 = (-b - sqrt(D)) / (2a)", "D == 0 : Two equal (repeated) real roots. x1 = x2 = -b / (2a)", "D < 0 : Two complex conjugate roots (no real roots). Real part = -b / (2a), Imaginary part = sqrt(-D) / (2a)"]
                },
                {
                  "title": "🔍 The discriminant is a fortune teller!",
                  "body": [
                    "Before solving the equation, we calculate D = b² - 4ac. This single number tells us the FUTURE of our solutions:",
                    "D > 0 → 🎉 Two different real answers (ball lands in two spots)",
                    "D = 0 → 🤔 One repeated answer (ball just barely grazes the ground)",
                    "D < 0 → 😶 No real answers (ball never touches the ground — it went into imaginary space!)",
                    "That's why we always check D first before doing any square root. sqrt() of a negative number breaks the math!"
                  ]
                },
                {
                  "title": "Edge Case",
                  "body": ["If a = 0, the equation becomes linear: bx + c = 0, solved as x = -c/b.", "This must be checked before applying the quadratic formula to avoid division by zero."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the discriminant computation and branching.",
                "Observe how D > 0, D == 0, and D < 0 lead to three different output paths.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a, b, c — e.g. 1 -5 6",
                "Click Run Code. Verify output: Root1: 3.00  Root2: 2.00",
                "Try 1 2 1 (equal roots) and 1 1 1 (complex roots). Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double a, b, c, d, r1, r2;\n    scanf(\"%lf %lf %lf\", &a, &b, &c);\n    if (a == 0) {\n        printf(\"Not a quadratic equation.\\n\");\n    } else {\n        d = b * b - 4 * a * c;\n        if (d > 0) {\n            r1 = (-b + sqrt(d)) / (2 * a);\n            r2 = (-b - sqrt(d)) / (2 * a);\n            printf(\"Root1: %.2f  Root2: %.2f\\n\", r1, r2);\n        } else if (d == 0) {\n            r1 = -b / (2 * a);\n            printf(\"Equal roots: %.2f\\n\", r1);\n        } else {\n            printf(\"Complex roots\\n\");\n        }\n    }\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio and math libraries", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Allocate variables", "memory": [{ "variable": "a", "type": "double", "value": "?" }, { "variable": "b", "type": "double", "value": "?" }, { "variable": "c", "type": "double", "value": "?" }, { "variable": "d", "type": "double", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "scanf() reads '1 -5 6'", "memory": [{ "variable": "a", "type": "double", "value": "1.0" }, { "variable": "b", "type": "double", "value": "-5.0" }, { "variable": "c", "type": "double", "value": "6.0" }, { "variable": "d", "type": "double", "value": "?" }], "output": "" },
                  { "line": 7, "annotation": "Check if a == 0 (False)", "memory": [{ "variable": "a", "type": "double", "value": "1.0" }, { "variable": "b", "type": "double", "value": "-5.0" }, { "variable": "c", "type": "double", "value": "6.0" }, { "variable": "d", "type": "double", "value": "?" }], "output": "" },
                  { "line": 10, "annotation": "Compute discriminant D = 25 - 24 = 1", "memory": [{ "variable": "a", "type": "double", "value": "1.0" }, { "variable": "b", "type": "double", "value": "-5.0" }, { "variable": "c", "type": "double", "value": "6.0" }, { "variable": "d", "type": "double", "value": "1.0" }], "output": "" },
                  { "line": 11, "annotation": "Check if D > 0 (True)", "memory": [{ "variable": "a", "type": "double", "value": "1.0" }, { "variable": "b", "type": "double", "value": "-5.0" }, { "variable": "c", "type": "double", "value": "6.0" }, { "variable": "d", "type": "double", "value": "1.0" }], "output": "" },
                  { "line": 12, "annotation": "Compute Root1 = (5 + 1)/2 = 3.0", "memory": [{ "variable": "a", "type": "double", "value": "1.0" }, { "variable": "b", "type": "double", "value": "-5.0" }, { "variable": "c", "type": "double", "value": "6.0" }, { "variable": "d", "type": "double", "value": "1.0" }], "output": "" },
                  { "line": 13, "annotation": "Compute Root2 = (5 - 1)/2 = 2.0", "memory": [{ "variable": "a", "type": "double", "value": "1.0" }, { "variable": "b", "type": "double", "value": "-5.0" }, { "variable": "c", "type": "double", "value": "6.0" }, { "variable": "d", "type": "double", "value": "1.0" }], "output": "" },
                  { "line": 14, "annotation": "printf() displays both distinct roots", "memory": [{ "variable": "a", "type": "double", "value": "1.0" }, { "variable": "b", "type": "double", "value": "-5.0" }, { "variable": "c", "type": "double", "value": "6.0" }, { "variable": "d", "type": "double", "value": "1.0" }], "output": "Root1: 3.00  Root2: 2.00\n" },
                  { "line": 22, "annotation": "Program terminates", "memory": [{ "variable": "a", "type": "double", "value": "1.0" }, { "variable": "b", "type": "double", "value": "-5.0" }, { "variable": "c", "type": "double", "value": "6.0" }, { "variable": "d", "type": "double", "value": "1.0" }], "output": "Root1: 3.00  Root2: 2.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w5-4",
            "title": "Calculator Using Switch",
            "desc": "Simulate a basic calculator for +, -, *, /.",
            "expected": "Result: 13.00",
            "content": {
              "aim": {
                "text": "This experiment builds a four-function arithmetic calculator using the switch-case statement to dispatch operations based on a user-supplied operator character. Students will accept two float operands and an operator (+, -, *, /), use switch to route execution to the correct arithmetic branch, handle division by zero within the '/' case, and use the default case to report invalid operators. The experiment demonstrates when switch-case is preferred over if-else if chains, how the break statement prevents fall-through between cases, and how operator characters are processed as char values in C.",
                "bullets": [
                  "Declare and use float variables for operands and result",
                  "Accept a char input for the operator (+, -, *, /)",
                  "Use switch-case to dispatch to the correct operation",
                  "Handle division by zero as a special case within the division branch",
                  "Use the default case to handle invalid operators",
                  "Use printf() with %.2f to display the result"
                ]
              },
              "theory": [
                {
                  "title": "🔢 Building your own pocket calculator!",
                  "body": [
                    "Every calculator has buttons: +, -, ×, ÷. When you press a button, the calculator looks at WHICH button you pressed and does that specific operation. That's exactly what switch-case does in C! Instead of writing a long chain of if-else if-else if, you list all the cases neatly — like the buttons on a calculator."
                  ]
                },
                {
                  "title": "switch-case Statement",
                  "body": ["An alternative to long if-else if chains when branching on the value of a single integer or character expression.",                     "![Simple calculator device](switch-case.webp)","switch (expression) {\n    case value1: statements; break;\n    case value2: statements; break;\n    default: statements;\n}"]
                },
                {
                  "title": "break Statement and Fall-Through",
                  "body": ["Each case must end with break to prevent fall-through. Without break, execution continues into the next case regardless of its label.", "Intentional fall-through (omitting break) can group cases: case '+': case 'p': result = a + b; break;"]
                },
                {
                  "title": "🚪 break is like a door stopper!",
                  "body": [
                    "Imagine you walk into a hotel. Room 1 is addition, Room 2 is subtraction, Room 3 is multiplication. Without break, once you enter Room 1 and finish, you'd accidentally walk into Room 2, then Room 3 as well! The break statement is a door stopper — it keeps you in the right room and stops you from falling through into the next one."
                  ]
                },
                {
                  "title": "default Case and Char Input",
                  "body": ["default case is executed when no case value matches the expression. Used to handle invalid or unexpected input gracefully.", "Operators are characters. Read with scanf(\" %c\", &op). The leading space in \" %c\" skips any leftover whitespace or newline in the input buffer."]
                },
                {
                  "title": "Division by Zero",
                  "body": ["Always check if the divisor is zero before performing division:\ncase '/':\n    if (b == 0) printf(\"Error\");\n    else result = a / b;\n    break;"]
                },
                {
                  "title": "⛔ Why you can never divide by zero:",
                  "body": [
                    "Try asking your calculator 5 ÷ 0. It shows ERROR! Why? Because 5 ÷ 0 means \"how many times does 0 fit into 5?\" — and the answer is infinite, which a computer can't store. It's like asking \"how many empty bags do you need to hold 5 apples?\" — you'd need endless empty bags! Always check if (b == 0) before dividing."
                  ]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the switch dispatch for different operators.",
                "Observe how break stops execution after each case and how default catches bad input.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter two numbers and an operator — e.g. 10 3 +",
                "Click Run Code. Verify output: Result: 13.00",
                "Test all four operators and try 10 0 / for division by zero. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    float a, b, res;\n    char op;\n    scanf(\"%f %f %c\", &a, &b, &op);\n    switch(op) {\n        case '+': res = a + b; printf(\"Result: %.2f\\n\", res); break;\n        case '-': res = a - b; printf(\"Result: %.2f\\n\", res); break;\n        case '*': res = a * b; printf(\"Result: %.2f\\n\", res); break;\n        case '/': \n            if (b == 0) printf(\"Error: Division by zero\\n\");\n            else printf(\"Result: %.2f\\n\", a / b);\n            break;\n        default: printf(\"Invalid operator\\n\");\n    }\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "a", "type": "float", "value": "?" }, { "variable": "b", "type": "float", "value": "?" }, { "variable": "op", "type": "char", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '10 3 +'", "memory": [{ "variable": "a", "type": "float", "value": "10.0" }, { "variable": "b", "type": "float", "value": "3.0" }, { "variable": "op", "type": "char", "value": "'+'" }], "output": "" },
                  { "line": 6, "annotation": "switch evaluates op '+'", "memory": [{ "variable": "a", "type": "float", "value": "10.0" }, { "variable": "b", "type": "float", "value": "3.0" }, { "variable": "op", "type": "char", "value": "'+'" }], "output": "" },
                  { "line": 7, "annotation": "Case '+' matches. Compute res and print", "memory": [{ "variable": "a", "type": "float", "value": "10.0" }, { "variable": "b", "type": "float", "value": "3.0" }, { "variable": "op", "type": "char", "value": "'+'" }], "output": "Result: 13.00\n" },
                  { "line": 7, "annotation": "break statement exits switch block", "memory": [{ "variable": "a", "type": "float", "value": "10.0" }, { "variable": "b", "type": "float", "value": "3.0" }, { "variable": "op", "type": "char", "value": "'+'" }], "output": "Result: 13.00\n" },
                  { "line": 16, "annotation": "Program terminates", "memory": [{ "variable": "a", "type": "float", "value": "10.0" }, { "variable": "b", "type": "float", "value": "3.0" }, { "variable": "op", "type": "char", "value": "'+'" }], "output": "Result: 13.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w5-5",
            "title": "Leap Year Check",
            "desc": "Determine if a given year is a leap year.",
            "expected": "Leap Year / Not Leap Year",
            "content": {
              "aim": {
                "text": "This experiment implements the three-tier leap year rule using the modulus operator and logical operators in C. Students will accept a year from the user and determine whether it is a leap year by evaluating the compound condition: divisible by 4 AND (not divisible by 100 OR divisible by 400). The experiment solidifies understanding of the modulus operator (%) for divisibility testing, boolean short-circuit evaluation in &&/|| expressions, and the historical reason for the century-year exception — providing a realistic example of how precise logical conditions are encoded in programming.",
                "bullets": [
                  "Declare and use an int variable for the year",
                  "Apply the standard leap year rule using % (modulus) and logical operators",
                  "Implement the three-condition leap year test using nested if-else",
                  "Use printf() to display whether the year is a leap year or not"
                ]
              },
              "theory": [
                {
                  "title": "📅 Why do we even need leap years?",
                  "body": [
                    "The Earth takes 365 days AND about 6 hours to go around the Sun. But our calendar only counts 365 days. So every year, we ignore those extra 6 hours. After 4 years, those ignored hours add up to a whole extra day (6×4=24 hours)! We add that day as February 29 — that's a leap year. Without this fix, our calendar would slowly drift, and eventually July would be in winter!",
                    "![Earth orbit around the Sun diagram](leap-year.webp)"
                  ]
                },
                {
                  "title": "Leap Year Rules",
                  "body": ["A year is a leap year if: Rule 1: It is divisible by 4 AND Rule 2: It is NOT divisible by 100 OR Rule 3: It is divisible by 400", "Condensed Rule: (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)"]
                },
                {
                  "title": "Breakdown",
                  "body": ["Divisible by 4 : Candidate for leap year (e.g. 2024)", "Divisible by 100 : Century year — NOT a leap year unless also divisible by 400", "Divisible by 400 : Always a leap year (e.g. 2000)"]
                },
                {
                  "title": "Examples",
                  "body": ["2024 : 2024 % 4 == 0, 2024 % 100 != 0 → Leap year", "1900 : 1900 % 4 == 0, 1900 % 100 == 0, 1900 % 400 != 0 → Not a leap year", "2000 : 2000 % 400 == 0 → Leap year", "2023 : 2023 % 4 != 0 → Not a leap year"]
                },
                {
                  "title": "🧩 The 100-year exception — why?!",
                  "body": [
                    "If we added a leap year every 4 years perfectly, we'd still be off by a tiny bit (the Earth takes slightly less than exactly 6 extra hours). Over 100 years, these tiny errors add up. So century years (1900, 2100) are NOT leap years — unless they're also divisible by 400 (like 2000). It's a correction inside a correction inside a correction — like fixing a slightly wrong clock!"
                  ]
                },
                {
                  "title": "Operators",
                  "body": ["Modulus Operator — year % 4 gives the remainder when year is divided by 4.", "Logical Operators: && (AND) both conditions must be true, || (OR) at least one condition must be true, ! (NOT) inverts a boolean result"]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the three-level condition check.",
                "Observe how 2000, 1900, 2024, and 2023 each take different paths through the logic.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a year — e.g. 2024",
                "Click Run Code. Verify output: 2024 is a Leap Year",
                "Test 1900, 2000, 2023, and 1600 to cover all rule branches. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int year;\n    scanf(\"%d\", &year);\n    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {\n        printf(\"%d is a Leap Year\\n\", year);\n    } else {\n        printf(\"%d is not a Leap Year\\n\", year);\n    }\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate year variable", "memory": [{ "variable": "year", "type": "int", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '2024'", "memory": [{ "variable": "year", "type": "int", "value": "2024" }], "output": "" },
                  { "line": 6, "annotation": "Check condition: (2024 % 4 == 0 && 2024 % 100 != 0) is true", "memory": [{ "variable": "year", "type": "int", "value": "2024" }], "output": "" },
                  { "line": 7, "annotation": "printf() prints leap year message", "memory": [{ "variable": "year", "type": "int", "value": "2024" }], "output": "2024 is a Leap Year\n" },
                  { "line": 11, "annotation": "Program terminates", "memory": [{ "variable": "year", "type": "int", "value": "2024" }], "output": "2024 is a Leap Year\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 6",
        "objective": "while, do-while, for loops, break and continue",
        "tutorial": "Tutorial 6: Loops",
        "labTitle": "Lab 6: Iterative problems",
        "experiments": [
          {
            "id": "c-w6-1",
            "title": "Factorial",
            "desc": "Calculate factorial of a given number.",
            "expected": "Factorial: 120",
            "content": {
              "aim": {
                "text": "This experiment introduces iterative computation using a for loop to compute the factorial of a non-negative integer. Students will accept n from the user, handle the negative-input edge case, and accumulate the product n × (n-1) × … × 1 in a long long variable to accommodate the rapid growth of factorial values. The experiment teaches loop structure (initialisation, condition, increment), the choice of long long over int to prevent overflow, the %lld format specifier, and the special mathematical definition of 0! = 1. It serves as a foundation for understanding both iterative and (in Week 12) recursive computation of the same problem.",
                "bullets": [
                  "Declare and use int and long long variables to handle large factorial values",
                  "Implement factorial computation using for, while, or do-while loop",
                  "Understand the mathematical definition of factorial including 0! = 1",
                  "Handle invalid input (negative numbers) using a conditional check",
                  "Use printf() with %lld to display large integer results"
                ]
              },
              "theory": [
                {
                  "title": "🎂 How many ways can your friends sit at a birthday party?",
                  "body": [
                    "If 3 friends — Aarav, Bhanu, and Chetan — sit in a row, how many different seating arrangements are possible?",
                    "Aarav first: 3 choices for seat 1, 2 remaining for seat 2, 1 left for seat 3 → 3 × 2 × 1 = 6 ways",
                    "That's 3! = 6. This is exactly what factorial computes — the number of ways to arrange things. Used everywhere in maths, probability, and even game development!",
                    "![Permutation arrangement diagram](permutation.webp)"
                  ]
                },
                {
                  "title": "Factorial Definition",
                  "body": ["The factorial of a non-negative integer n, written n!, is: n! = n × (n-1) × (n-2) × ... × 2 × 1", "0! = 1 (by definition), 1! = 1, 5! = 5 × 4 × 3 × 2 × 1 = 120"]
                },
                {
                  "title": "Iterative Approach Using for Loop",
                  "body": ["long long fact = 1;\nfor (int i = 1; i <= n; i++) {\n    fact = fact * i;\n}", "The loop multiplies fact by each integer from 1 to n sequentially."]
                },
                {
                  "title": "Why long long?",
                  "body": ["Factorials grow very rapidly: 10! = 3,628,800, 15! = 1,307,674,368,000, 20! = 2,432,902,008,176,640,000", "An int (typically 32-bit) overflows beyond 12!. Use long long (64-bit) to safely hold values up to 20!. Format specifier: %lld."]
                },
                {
                  "title": "📈 Factorials grow INSANELY fast!",
                  "body": [
                    "1! = 1 ... 5! = 120 ... 10! = 3,628,800 ... 20! = 2,432,902,008,176,640,000",
                    "By just 20, the number has 19 digits! A regular int in C can only hold numbers up to about 2 billion (10 digits). That's why we use long long — a bigger box that holds numbers up to about 9 quintillion. Even then, 21! overflows it. Factorials are like rabbits — they multiply way faster than you expect!"
                  ]
                },
                {
                  "title": "Negative Input Handling",
                  "body": ["Factorial is undefined for negative integers. Check with if (n < 0) and print an error message before attempting any computation."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the loop trace for n = 5.",
                "Observe how the accumulator fact is updated at each iteration.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a non-negative integer — e.g. 5",
                "Click Run Code. Verify output: Factorial: 120",
                "Try n = 0, n = 1, n = 15, and n = -3 to test all branches. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    long long fact = 1;\n    int n, i;\n    scanf(\"%d\", &n);\n    if (n < 0) {\n        printf(\"Error: Factorial of negative number is undefined\\n\");\n    } else {\n        for (i = 1; i <= n; i++) {\n            fact = fact * i;\n        }\n        printf(\"Factorial: %lld\\n\", fact);\n    }\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "fact", "type": "long long", "value": "1" }, { "variable": "n", "type": "int", "value": "?" }, { "variable": "i", "type": "int", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '5'", "memory": [{ "variable": "fact", "type": "long long", "value": "1" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "n < 0 is false", "memory": [{ "variable": "fact", "type": "long long", "value": "1" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "?" }], "output": "" },
                  { "line": 9, "annotation": "Loop i = 1", "memory": [{ "variable": "fact", "type": "long long", "value": "1" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "fact = 1 * 1 = 1", "memory": [{ "variable": "fact", "type": "long long", "value": "1" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 9, "annotation": "Loop i = 2", "memory": [{ "variable": "fact", "type": "long long", "value": "1" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "2" }], "output": "" },
                  { "line": 10, "annotation": "fact = 1 * 2 = 2", "memory": [{ "variable": "fact", "type": "long long", "value": "2" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "2" }], "output": "" },
                  { "line": 9, "annotation": "Loop i = 3", "memory": [{ "variable": "fact", "type": "long long", "value": "2" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "3" }], "output": "" },
                  { "line": 10, "annotation": "fact = 2 * 3 = 6", "memory": [{ "variable": "fact", "type": "long long", "value": "6" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "3" }], "output": "" },
                  { "line": 9, "annotation": "Loop i = 4", "memory": [{ "variable": "fact", "type": "long long", "value": "6" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "4" }], "output": "" },
                  { "line": 10, "annotation": "fact = 6 * 4 = 24", "memory": [{ "variable": "fact", "type": "long long", "value": "24" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "4" }], "output": "" },
                  { "line": 9, "annotation": "Loop i = 5", "memory": [{ "variable": "fact", "type": "long long", "value": "24" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "5" }], "output": "" },
                  { "line": 10, "annotation": "fact = 24 * 5 = 120", "memory": [{ "variable": "fact", "type": "long long", "value": "120" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "5" }], "output": "" },
                  { "line": 12, "annotation": "printf() prints factorial", "memory": [{ "variable": "fact", "type": "long long", "value": "120" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "6" }], "output": "Factorial: 120\n" },
                  { "line": 15, "annotation": "Program terminates", "memory": [{ "variable": "fact", "type": "long long", "value": "120" }, { "variable": "n", "type": "int", "value": "5" }, { "variable": "i", "type": "int", "value": "6" }], "output": "Factorial: 120\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w6-2",
            "title": "Prime Number Check",
            "desc": "Check if a number is prime.",
            "expected": "17 is a Prime Number",
            "content": {
              "aim": {
                "text": "This experiment implements the trial-division algorithm to determine whether a given positive integer is prime. Students will use a for loop that tests divisibility from 2 up to the square root of the number (i * i <= n), breaking out immediately upon finding any factor and using a flag variable to record the result. The experiment teaches the efficiency advantage of the square-root optimisation over checking all values up to n-1, the use of the break statement to exit a loop early, and the flag pattern for recording a condition discovered mid-loop — concepts applicable to a broad class of search and verification problems.",
                "bullets": [
                  "Declare and use int variables for the number, loop counter, and flag",
                  "Implement a trial division loop from 2 to sqrt(n) for efficiency",
                  "Use break to exit the loop early when a factor is found",
                  "Use a flag variable to record whether any factor was found",
                  "Use printf() to display whether the number is prime or not"
                ]
              },
              "theory": [
                {
                  "title": "🔐 Primes are the atoms of mathematics!",
                  "body": [
                    "Every number can be broken into smaller pieces by multiplication — except prime numbers. A prime number is a number that can ONLY be divided by 1 and itself. No other number divides it cleanly.",
                    "Here's the wild part: primes are used to protect your passwords and bank details right now! When you type your password on a website, it gets locked using a mathematical trick based on huge prime numbers. Hackers can't break it because multiplying two giant primes is easy — but finding the two primes from the product is nearly impossible!",
                  ]
                },
                {
                  "title": "Prime Number Definition",
                  "body": ["A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.", "Primes: 2, 3, 5, 7, 11... Not prime (composite): 4, 6, 8, 9... 1 is neither prime nor composite."]
                },
                {
                  "title": "Trial Division",
                  "body": ["To check if n is prime, test divisibility for each i from 2 to n-1. If n % i == 0 for any i, n is not prime."]
                },
                {
                  "title": "Optimised Loop",
                  "body": ["It is sufficient to check divisors only up to sqrt(n). If n has a factor greater than sqrt(n), it must have a corresponding factor smaller than sqrt(n).", "for (i = 2; i * i <= n; i++) reduces iterations significantly."]
                },
                {
                  "title": "⚡ The square root trick — why does it work?",
                  "body": [
                    "If 36 has a factor of 4, it MUST also have a factor of 9 (because 4×9=36). One factor will always be ≤ √36 = 6, and the other ≥ 6. So if we check all numbers up to √n and find no factor, there can't be any factor above √n either. This cuts our work from checking 35 numbers (for n=36) down to just 6. For large numbers like 1,000,000, we check 1000 instead of 999,999. That's 1000× faster!"
                  ]
                },
                {
                  "title": "break Statement and Flag",
                  "body": ["When a factor is found, there is no need to continue checking. break exits the loop immediately.", "A flag (isPrime) is initialised to 1. If any factor is found, it is set to 0. After the loop, the flag determines the result."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the loop for n = 7 and n = 12.",
                "Observe how break fires immediately at i = 2 for n = 12 and never fires for n = 7.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a positive integer — e.g. 17",
                "Click Run Code. Verify output: 17 is a Prime Number",
                "Try 1, 2, 4, 97, and 100 to exercise all branches. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int n, i, isPrime = 1;\n    scanf(\"%d\", &n);\n    if (n <= 1) {\n        isPrime = 0;\n    } else {\n        for (i = 2; i * i <= n; i++) {\n            if (n % i == 0) {\n                isPrime = 0;\n                break;\n            }\n        }\n    }\n    if (isPrime) printf(\"%d is a Prime Number\\n\", n);\n    else printf(\"%d is not a Prime Number\\n\", n);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "n", "type": "int", "value": "?" }, { "variable": "i", "type": "int", "value": "?" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '17'", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "?" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "" },
                  { "line": 6, "annotation": "n <= 1 is false", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "?" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "" },
                  { "line": 9, "annotation": "Loop i = 2 (2*2 <= 17)", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "2" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "17 % 2 != 0", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "2" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "" },
                  { "line": 9, "annotation": "Loop i = 3 (3*3 <= 17)", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "3" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "17 % 3 != 0", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "3" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "" },
                  { "line": 9, "annotation": "Loop i = 4 (4*4 <= 17)", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "4" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "17 % 4 != 0", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "4" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "" },
                  { "line": 9, "annotation": "Loop exits, i = 5 (5*5 > 17)", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "5" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "" },
                  { "line": 16, "annotation": "isPrime is 1, print Prime", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "5" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "17 is a Prime Number\n" },
                  { "line": 18, "annotation": "Program terminates", "memory": [{ "variable": "n", "type": "int", "value": "17" }, { "variable": "i", "type": "int", "value": "5" }, { "variable": "isPrime", "type": "int", "value": "1" }], "output": "17 is a Prime Number\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w6-3",
            "title": "Sine Series",
            "desc": "Calculate sin(x) using Taylor series expansion.",
            "expected": "sin(30) ≈ 0.500000",
            "content": {
              "aim": {
                "text": "This experiment demonstrates how transcendental functions like sin(x) are computed numerically using the Taylor–Maclaurin series expansion: sin(x) = x − x³/3! + x⁵/5! − x⁷/7! + …. Students will accept an angle in degrees, convert it to radians (x_rad = degrees × π/180), and accumulate the series over a user-specified number of terms using an iterative term-building technique that avoids repeated factorial and power calculations. The experiment shows how successive approximations converge to the true value, introduces the degree-to-radian conversion essential for all trigonometric computation in C, and allows comparison of the series result against the math.h library sin() function.",
                "bullets": [
                  "Declare and use double variables for x, the term, and the running sum",
                  "Accept x in degrees and convert to radians before computation",
                  "Apply the sine series formula iteratively using a for loop",
                  "Understand how term sign alternates and how each term is built from the previous",
                  "Compare the computed result with the library sin() function from math.h",
                  "Use printf() with %.6f to display results to sufficient decimal precision"
                ]
              },
              "theory": [
                {
                  "title": "🌊 How does your phone calculate sin(30°)?",
                  "body": [
                    "Your calculator doesn't have a \"sin button\" hardwired with a table of answers. It uses a clever mathematical trick discovered by a mathematician named Maclaurin — it approximates sin using an infinite series of additions and multiplications. Each extra term makes the answer more accurate. After 10-15 terms, the result matches the exact answer to many decimal places!",
                    "This is how computers calculate ALL trigonometric functions — no magic, just clever repeated arithmetic.",
                    "![Sine wave unit circle diagram](sine-wave.webp)"
                  ]
                },
                {
                  "title": "Sine Series (Maclaurin Expansion)",
                  "body": ["sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + x⁹/9! - ...", "General term (n starting from 0): term_n = (-1)^n * x^(2n+1) / (2n+1)!"]
                },
                {
                  "title": "Degree to Radian Conversion",
                  "body": ["Trigonometric series require x in radians: x_rad = x_deg * (M_PI / 180.0)", "M_PI is defined in math.h. Alternatively use 3.14159265358979."]
                },
                {
                  "title": "📐 Why radians, not degrees?",
                  "body": [
                    "Degrees (0°–360°) are human-invented. Radians are what the universe actually uses in mathematics. The formula sin(x) = x - x³/6 + ... only works when x is in radians. Think of degrees as a nickname (like calling someone \"Raju\") and radians as their official name on the birth certificate (like \"Rajeshwar\"). Math functions only understand the official name!",
                    "Conversion: multiply degrees by π/180 to get radians."
                  ]
                },
                {
                  "title": "Iterative Term Building",
                  "body": ["Rather than computing pow() and factorial from scratch each iteration (expensive), build each term from the previous one:", "term = term * (-1) * x * x / ((2*n) * (2*n + 1))", "This avoids repeated factorial and power calculations."]
                },
                {
                  "title": "Convergence and Accuracy",
                  "body": ["More terms give higher accuracy. For most angles, 10–15 terms are sufficient for double precision.", "Comparing your series result against math.h's sin() validates the implementation."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the series computation term by term for x = 30°.",
                "Observe how the running sum converges toward 0.500000 as terms are added.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter an angle in degrees and number of terms — e.g. 30 10",
                "Click Run Code. Verify output: sin(30) ≈ 0.500000",
                "Try 90, 0, 180, and 45 degrees. Compare series result with math.h sin(). Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#define PI 3.14159265358979\n\nint main() {\n    double deg, x, term, sum = 0;\n    int n, i;\n    scanf(\"%lf %d\", &deg, &n);\n    x = deg * (PI / 180.0);\n    term = x;\n    for (i = 0; i < n; i++) {\n        sum += term;\n        term = term * (-1) * x * x / ((2 * i + 2) * (2 * i + 3));\n    }\n    printf(\"sin(%.0f) ≈ %.6f\\n\", deg, sum);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library and define PI", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Allocate variables", "memory": [{ "variable": "sum", "type": "double", "value": "0.0" }], "output": "" },
                  { "line": 7, "annotation": "scanf() reads '30 10'", "memory": [{ "variable": "deg", "type": "double", "value": "30.0" }, { "variable": "n", "type": "int", "value": "10" }, { "variable": "sum", "type": "double", "value": "0.0" }], "output": "" },
                  { "line": 8, "annotation": "Convert 30 degrees to radians", "memory": [{ "variable": "deg", "type": "double", "value": "30.0" }, { "variable": "x", "type": "double", "value": "0.523599" }, { "variable": "n", "type": "int", "value": "10" }], "output": "" },
                  { "line": 9, "annotation": "Set initial term to x", "memory": [{ "variable": "x", "type": "double", "value": "0.523599" }, { "variable": "term", "type": "double", "value": "0.523599" }, { "variable": "sum", "type": "double", "value": "0.0" }], "output": "" },
                  { "line": 10, "annotation": "Loop i = 0", "memory": [{ "variable": "term", "type": "double", "value": "0.523599" }, { "variable": "sum", "type": "double", "value": "0.0" }], "output": "" },
                  { "line": 11, "annotation": "Add term to sum", "memory": [{ "variable": "term", "type": "double", "value": "0.523599" }, { "variable": "sum", "type": "double", "value": "0.523599" }], "output": "" },
                  { "line": 12, "annotation": "Compute next term (negative x^3 / 3!)", "memory": [{ "variable": "term", "type": "double", "value": "-0.023925" }, { "variable": "sum", "type": "double", "value": "0.523599" }], "output": "" },
                  { "line": 10, "annotation": "Loop i = 1", "memory": [{ "variable": "term", "type": "double", "value": "-0.023925" }, { "variable": "sum", "type": "double", "value": "0.523599" }], "output": "" },
                  { "line": 11, "annotation": "Add term to sum", "memory": [{ "variable": "term", "type": "double", "value": "-0.023925" }, { "variable": "sum", "type": "double", "value": "0.499674" }], "output": "" },
                  { "line": 12, "annotation": "Compute next term (positive x^5 / 5!)", "memory": [{ "variable": "term", "type": "double", "value": "0.000328" }, { "variable": "sum", "type": "double", "value": "0.499674" }], "output": "" },
                  { "line": 14, "annotation": "Loop continues... printf() displays final sum", "memory": [{ "variable": "sum", "type": "double", "value": "0.500000" }], "output": "sin(30) ≈ 0.500000\n" },
                  { "line": 16, "annotation": "Program terminates", "memory": [{ "variable": "sum", "type": "double", "value": "0.500000" }], "output": "sin(30) ≈ 0.500000\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w6-4",
            "title": "Palindrome Check",
            "desc": "Check if a number is a palindrome.",
            "expected": "121 is a Palindrome",
            "content": {
              "aim": {
                "text": "This experiment implements palindrome detection for integers using digit extraction and reversal inside a while loop. Students will save the original number, then iteratively extract the last digit using the modulus operator (n % 10), build the reversed number by accumulating digits (reversed = reversed * 10 + remainder), and remove the processed digit from n using integer division (n /= 10). After the loop exhausts all digits, comparing the reversed number to the original determines whether the number reads the same forwards and backwards. The experiment solidifies understanding of the modulus-and-division pattern for digit manipulation — a technique reused in many number-theory problems.",
                "bullets": [
                  "Declare and use int variables for the number, reversed number, and remainder",
                  "Extract digits one by one using the modulus and division operators",
                  "Build the reversed number digit by digit inside a while loop",
                  "Compare the original and reversed numbers to determine if it is a palindrome",
                  "Use printf() to display the result"
                ]
              },
              "theory": [
                {
                  "title": "🪞 A number that looks the same in a mirror!",
                  "body": [
                    "A palindrome reads the same forwards and backwards. Like the word \"MADAM\" — spell it backwards, still MADAM! Or the number 121 — flip it, still 121. Or 12321 — still 12321.",
                    "To check this in code, we reverse the number and compare it to the original. If they match, it's a palindrome — like checking if someone looks the same from the front and back in a mirror!",
                    "![Mirror symmetry reflection concept](mirror-symmetry.webp)"
                  ]
                },
                {
                  "title": "Palindrome Number",
                  "body": ["A number is a palindrome if it reads the same forwards and backwards.", "Examples: 121 → 121 (Palindrome), 123 → 321 (Not a Palindrome), 5 → 5 (Palindrome)."]
                },
                {
                  "title": "Digit Extraction",
                  "body": ["remainder = n % 10 extracts the last digit of n.", "n = n / 10 removes the last digit from n (integer division)."]
                },
                {
                  "title": "🔢 How do we reverse a number step by step?",
                  "body": [
                    "Let's reverse 123:",
                    "Step 1: Last digit = 123 % 10 = 3. Remaining = 123 / 10 = 12. Reversed = 0 × 10 + 3 = 3",
                    "Step 2: Last digit = 12 % 10 = 2. Remaining = 12 / 10 = 1. Reversed = 3 × 10 + 2 = 32",
                    "Step 3: Last digit = 1 % 10 = 1. Remaining = 1 / 10 = 0. Reversed = 32 × 10 + 1 = 321",
                    "Now compare: 123 ≠ 321 → NOT a palindrome. Try it with 121 and see it work!"
                  ]
                },
                {
                  "title": "Building the Reversed Number",
                  "body": ["reversed = reversed * 10 + remainder", "Each iteration shifts the existing reversed digits left by one place and appends the newly extracted digit."]
                },
                {
                  "title": "Preserving the Original",
                  "body": ["Before entering the loop, save the original value: original = n;", "After reversal, compare original == reversed to decide palindrome status. Negative numbers are not palindromes."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the digit extraction loop for n = 121.",
                "Observe how remainder, reversed, and n change at each iteration.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a positive integer — e.g. 121",
                "Click Run Code. Verify output: 121 is a Palindrome",
                "Try 1331, 123, 5, and 10. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int n, original, reversed = 0, remainder;\n    scanf(\"%d\", &n);\n    original = n;\n    while (n > 0) {\n        remainder = n % 10;\n        reversed = reversed * 10 + remainder;\n        n /= 10;\n    }\n    if (original == reversed) printf(\"%d is a Palindrome\\n\", original);\n    else printf(\"%d is not a Palindrome\\n\", original);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "n", "type": "int", "value": "?" }, { "variable": "original", "type": "int", "value": "?" }, { "variable": "reversed", "type": "int", "value": "0" }, { "variable": "remainder", "type": "int", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '121'", "memory": [{ "variable": "n", "type": "int", "value": "121" }], "output": "" },
                  { "line": 6, "annotation": "Save original value", "memory": [{ "variable": "original", "type": "int", "value": "121" }], "output": "" },
                  { "line": 7, "annotation": "while n > 0 (121 > 0)", "memory": [{ "variable": "n", "type": "int", "value": "121" }], "output": "" },
                  { "line": 8, "annotation": "remainder = 121 % 10 = 1", "memory": [{ "variable": "remainder", "type": "int", "value": "1" }], "output": "" },
                  { "line": 9, "annotation": "reversed = 0 * 10 + 1 = 1", "memory": [{ "variable": "reversed", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "n = 121 / 10 = 12", "memory": [{ "variable": "n", "type": "int", "value": "12" }], "output": "" },
                  { "line": 7, "annotation": "while n > 0 (12 > 0)", "memory": [{ "variable": "n", "type": "int", "value": "12" }], "output": "" },
                  { "line": 8, "annotation": "remainder = 12 % 10 = 2", "memory": [{ "variable": "remainder", "type": "int", "value": "2" }], "output": "" },
                  { "line": 9, "annotation": "reversed = 1 * 10 + 2 = 12", "memory": [{ "variable": "reversed", "type": "int", "value": "12" }], "output": "" },
                  { "line": 10, "annotation": "n = 12 / 10 = 1", "memory": [{ "variable": "n", "type": "int", "value": "1" }], "output": "" },
                  { "line": 7, "annotation": "while n > 0 (1 > 0)", "memory": [{ "variable": "n", "type": "int", "value": "1" }], "output": "" },
                  { "line": 8, "annotation": "remainder = 1 % 10 = 1", "memory": [{ "variable": "remainder", "type": "int", "value": "1" }], "output": "" },
                  { "line": 9, "annotation": "reversed = 12 * 10 + 1 = 121", "memory": [{ "variable": "reversed", "type": "int", "value": "121" }], "output": "" },
                  { "line": 10, "annotation": "n = 1 / 10 = 0", "memory": [{ "variable": "n", "type": "int", "value": "0" }], "output": "" },
                  { "line": 7, "annotation": "while n > 0 (0 > 0) -> Exit loop", "memory": [{ "variable": "n", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "Check if original == reversed (121 == 121)", "memory": [{ "variable": "original", "type": "int", "value": "121" }, { "variable": "reversed", "type": "int", "value": "121" }], "output": "" },
                  { "line": 12, "annotation": "printf() displays Palindrome", "memory": [], "output": "121 is a Palindrome\n" },
                  { "line": 14, "annotation": "Program terminates", "memory": [], "output": "121 is a Palindrome\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w6-5",
            "title": "Number Pyramid",
            "desc": "Print a number pyramid pattern.",
            "expected": "Pyramid pattern output",
            "content": {
              "aim": {
                "text": "This experiment demonstrates the construction of 2D console patterns using nested for loops. Students will accept the number of rows and use an outer loop to process each row, a first inner loop to print (n − i) leading spaces that centre the pyramid, and a second inner loop to print the integers 1 through i for that row. Each row ends with a newline. The experiment develops spatial reasoning about how loop counter values translate to visual structure, reinforces nested loop mechanics (the outer loop controls rows; inner loops control what appears on each row), and introduces the interplay between loop variables and output formatting.",
                "bullets": [
                  "Declare and use int variables for row count, loop counters, and spacing",
                  "Use an outer for loop to iterate over rows",
                  "Use inner for loops to print leading spaces and numbers for each row",
                  "Understand how nested loop variables interact to produce 2D patterns",
                  "Use printf() with space and number formatting to align output correctly"
                ]
              },
              "theory": [
                {
                  "title": "🔺 Building patterns with loops — like stacking bricks!",
                  "body": [
                    "Look at a pyramid from the front. Row 1 has 1 brick, row 2 has 2 bricks, row 3 has 3 bricks. Each row is wider than the last, and everything is centered. To draw this with code, we use loops inside loops — the outer loop builds each row, the inner loops place the spaces and numbers perfectly.",
                    "It's like a construction worker who, for each floor of the building, carefully counts how many bricks to place and where to start!",
                    "![Number pyramid pattern triangle](number-pyramid.webp)"
                  ]
                },
                {
                  "title": "Nested Loops",
                  "body": ["A loop placed inside another loop is called a nested loop. The outer loop controls the row number and the inner loop(s) control what is printed on each row.", "for (i = 1; i <= n; i++) {\n    for (j = 1; j <= ...; j++) { printf(...); }\n    printf(\"\\n\");\n}"]
                },
                {
                  "title": "🧅 Nested loops = onion layers!",
                  "body": [
                    "Peel an onion — there's a layer, inside it another layer, inside it another. A nested loop is the same. The outer loop says \"do this for each ROW.\" The inner loop says \"for this row, do this for each COLUMN.\" Every time the outer loop ticks once, the entire inner loop runs completely. So for a 5-row pyramid, the inner loops run a total of 1+2+3+4+5 = 15 times!"
                  ]
                },
                {
                  "title": "Number Pyramid Pattern",
                  "body": ["Row i contains: (n - i) leading spaces (to centre the pyramid) and numbers 1 through i (with spaces between).", "Example for n=3:\n  1\n 1 2\n1 2 3"]
                },
                {
                  "title": "Counting Iterations",
                  "body": ["Outer loop: runs n times (i = 1 to n).", "Space loop: runs (n - i) times per row.", "Number loop: runs i times per row."]
                },
                {
                  "title": "break vs continue",
                  "body": ["break: exits the loop entirely.", "continue: skips only the current iteration, loop continues."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the nested loops row by row for n = 4.",
                "Observe how the space count decreases and the number count increases per row.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter the number of rows — e.g. 5",
                "Click Run Code. Verify the pyramid is centred and numbers increase left to right.",
                "Try n = 1, n = 3, and n = 7 to observe how the pyramid scales. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int n, i, j;\n    scanf(\"%d\", &n);\n    for (i = 1; i <= n; i++) {\n        for (j = 1; j <= n - i; j++) {\n            printf(\" \");\n        }\n        for (j = 1; j <= i; j++) {\n            printf(\"%d \", j);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "n", "type": "int", "value": "?" }, { "variable": "i", "type": "int", "value": "?" }, { "variable": "j", "type": "int", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf() reads '3' for 3 rows", "memory": [{ "variable": "n", "type": "int", "value": "3" }], "output": "" },
                  { "line": 6, "annotation": "Row i=1", "memory": [{ "variable": "n", "type": "int", "value": "3" }, { "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 7, "annotation": "Print spaces: 3-1 = 2 spaces", "memory": [{ "variable": "j", "type": "int", "value": "1" }], "output": "  " },
                  { "line": 10, "annotation": "Print numbers up to i=1", "memory": [{ "variable": "j", "type": "int", "value": "1" }], "output": "  1 " },
                  { "line": 13, "annotation": "Newline", "memory": [], "output": "  1 \n" },
                  { "line": 6, "annotation": "Row i=2", "memory": [{ "variable": "n", "type": "int", "value": "3" }, { "variable": "i", "type": "int", "value": "2" }], "output": "  1 \n" },
                  { "line": 7, "annotation": "Print spaces: 3-2 = 1 space", "memory": [{ "variable": "j", "type": "int", "value": "1" }], "output": "  1 \n " },
                  { "line": 10, "annotation": "Print numbers up to i=2", "memory": [{ "variable": "j", "type": "int", "value": "1" }], "output": "  1 \n 1 2 " },
                  { "line": 13, "annotation": "Newline", "memory": [], "output": "  1 \n 1 2 \n" },
                  { "line": 6, "annotation": "Row i=3", "memory": [{ "variable": "n", "type": "int", "value": "3" }, { "variable": "i", "type": "int", "value": "3" }], "output": "  1 \n 1 2 \n" },
                  { "line": 7, "annotation": "Print spaces: 3-3 = 0 spaces", "memory": [{ "variable": "j", "type": "int", "value": "1" }], "output": "  1 \n 1 2 \n" },
                  { "line": 10, "annotation": "Print numbers up to i=3", "memory": [{ "variable": "j", "type": "int", "value": "1" }], "output": "  1 \n 1 2 \n1 2 3 " },
                  { "line": 13, "annotation": "Newline", "memory": [], "output": "  1 \n 1 2 \n1 2 3 \n" },
                  { "line": 6, "annotation": "Loop finishes (i=4 > 3)", "memory": [], "output": "  1 \n 1 2 \n1 2 3 \n" },
                  { "line": 15, "annotation": "Program terminates", "memory": [], "output": "  1 \n 1 2 \n1 2 3 \n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 7",
        "objective": "1D array definition, initialization, linear search",
        "tutorial": "Tutorial 7: 1D Arrays",
        "labTitle": "Lab 7: Array manipulation",
        "experiments": [
          {
            "id": "c-w7-1",
            "title": "Min and Max of Array",
            "desc": "Find minimum and maximum in 1D array.",
            "expected": "Min: 1  Max: 9",
            "content": {
              "aim": {
                "text": "This experiment introduces 1D arrays in C and demonstrates how to find the smallest and largest elements in a single traversal. Students will declare a fixed-size integer array, read n elements into it from the user, initialise both a minimum and a maximum tracker to the first element (arr[0]), and update each tracker whenever a smaller or larger element is encountered in the remaining positions. By completing this experiment, students understand array declaration, index-based element access, the initialise-to-first-element strategy for min/max algorithms, and the O(n) single-pass efficiency of the approach.",
                "bullets": [
                  "Declare and initialise a 1D integer array of fixed maximum size",
                  "Accept n elements from the user into the array using a for loop",
                  "Initialise min and max to the first element of the array",
                  "Traverse the array comparing each element to update min and max",
                  "Use printf() to display the minimum and maximum values found"
                ]
              },
              "theory": [
                {
                  "title": "📏 The Tallest Student in Line!",
                  "body": [
                    "Imagine a gym teacher trying to find the tallest student in a lineup. The teacher starts by pointing at the very first student and saying, \"You are the tallest so far!\" Then, the teacher walks down the line, comparing everyone to that student. Anytime the teacher finds someone even taller, they point to the new student instead. By the end of the line, the person being pointed to is guaranteed to be the tallest in the class (the Maximum)!",
                    "![Array max min diagram](max-min-array.webp)"
                  ]
                },
                {
                  "title": "1D Array",
                  "body": ["A one-dimensional array is a contiguous block of memory storing elements of the same data type, accessed via an index starting at 0:", "int arr[100]; declares an array of 100 integers", "arr[0] = 10; assigns 10 to the first element", "arr[n-1] is the last valid element for an array of size n"]
                },
                {
                  "title": "Array Initialisation and Input",
                  "body": ["for (i = 0; i < n; i++) scanf(\"%d\", &arr[i]);", "Each element is read from standard input using its address &arr[i]."]
                },
                {
                  "title": "Finding Min and Max",
                  "body": ["Initialise both min and max to the first element arr[0], then iterate from index 1 to n-1, updating as needed:", "min = arr[0]; max = arr[0];\nfor (i = 1; i < n; i++) {\n    if (arr[i] < min) min = arr[i];\n    if (arr[i] > max) max = arr[i];\n}", "This requires exactly one pass through the array — O(n) time complexity."]
                },
                {
                  "title": "Why Not Initialise to 0?",
                  "body": ["If all elements are negative, initialising min = 0 would incorrectly leave min as 0. Always initialise to arr[0] to handle all input ranges.", "Index Bounds: Valid indices are 0 to n-1. Accessing arr[n] is undefined behaviour."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace how min and max are updated element by element.",
                "Observe that both are initialised to arr[0] and updated only when a new extreme is found.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n followed by n integers — e.g. 5  3 9 1 7 5",
                "Click Run Code. Verify output: Min: 1  Max: 9",
                "Try all-equal arrays like 4 4 4 4 and all-negative arrays like -3 -7 -1 -9. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, min, max;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    min = arr[0];\n    max = arr[0];\n    for (i = 1; i < n; i++) {\n        if (arr[i] < min) min = arr[i];\n        if (arr[i] > max) max = arr[i];\n    }\n    printf(\"Min: %d  Max: %d\\n\", min, max);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "arr", "type": "int[]", "value": "size 100" }, { "variable": "n", "type": "int", "value": "?" }, { "variable": "min", "type": "int", "value": "?" }, { "variable": "max", "type": "int", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "scanf reads n=5", "memory": [{ "variable": "arr", "type": "int[]", "value": "size 100" }, { "variable": "n", "type": "int", "value": "5" }], "output": "" },
                  { "line": 7, "annotation": "Read array elements: 3 9 1 7 5", "memory": [{ "variable": "arr", "type": "int[]", "value": "{3, 9, 1, 7, 5}" }, { "variable": "n", "type": "int", "value": "5" }], "output": "" },
                  { "line": 10, "annotation": "Initialise min = arr[0]", "memory": [{ "variable": "arr", "type": "int[]", "value": "{3, 9, 1, 7, 5}" }, { "variable": "min", "type": "int", "value": "3" }], "output": "" },
                  { "line": 11, "annotation": "Initialise max = arr[0]", "memory": [{ "variable": "arr", "type": "int[]", "value": "{3, 9, 1, 7, 5}" }, { "variable": "min", "type": "int", "value": "3" }, { "variable": "max", "type": "int", "value": "3" }], "output": "" },
                  { "line": 12, "annotation": "Loop i=1 to 4", "memory": [{ "variable": "i", "type": "int", "value": "1" }, { "variable": "min", "type": "int", "value": "3" }, { "variable": "max", "type": "int", "value": "3" }], "output": "" },
                  { "line": 13, "annotation": "i=1, arr[1]=9, 9<3 false", "memory": [{ "variable": "i", "type": "int", "value": "1" }, { "variable": "min", "type": "int", "value": "3" }, { "variable": "max", "type": "int", "value": "3" }], "output": "" },
                  { "line": 14, "annotation": "i=1, 9>3 true -> max = 9", "memory": [{ "variable": "i", "type": "int", "value": "1" }, { "variable": "min", "type": "int", "value": "3" }, { "variable": "max", "type": "int", "value": "9" }], "output": "" },
                  { "line": 13, "annotation": "i=2, arr[2]=1, 1<3 true -> min = 1", "memory": [{ "variable": "i", "type": "int", "value": "2" }, { "variable": "min", "type": "int", "value": "1" }, { "variable": "max", "type": "int", "value": "9" }], "output": "" },
                  { "line": 14, "annotation": "i=2, 1>9 false", "memory": [{ "variable": "i", "type": "int", "value": "2" }, { "variable": "min", "type": "int", "value": "1" }, { "variable": "max", "type": "int", "value": "9" }], "output": "" },
                  { "line": 13, "annotation": "i=3, arr[3]=7, 7<1 false", "memory": [{ "variable": "i", "type": "int", "value": "3" }, { "variable": "min", "type": "int", "value": "1" }, { "variable": "max", "type": "int", "value": "9" }], "output": "" },
                  { "line": 14, "annotation": "i=3, 7>9 false", "memory": [{ "variable": "i", "type": "int", "value": "3" }, { "variable": "min", "type": "int", "value": "1" }, { "variable": "max", "type": "int", "value": "9" }], "output": "" },
                  { "line": 13, "annotation": "i=4, arr[4]=5, 5<1 false", "memory": [{ "variable": "i", "type": "int", "value": "4" }, { "variable": "min", "type": "int", "value": "1" }, { "variable": "max", "type": "int", "value": "9" }], "output": "" },
                  { "line": 14, "annotation": "i=4, 5>9 false", "memory": [{ "variable": "i", "type": "int", "value": "4" }, { "variable": "min", "type": "int", "value": "1" }, { "variable": "max", "type": "int", "value": "9" }], "output": "" },
                  { "line": 16, "annotation": "printf output", "memory": [{ "variable": "min", "type": "int", "value": "1" }, { "variable": "max", "type": "int", "value": "9" }], "output": "Min: 1  Max: 9\n" },
                  { "line": 18, "annotation": "Program terminates", "memory": [], "output": "Min: 1  Max: 9\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w7-2",
            "title": "Linear Search",
            "desc": "Search for an element in a 1D array.",
            "expected": "Element found / Not found",
            "content": {
              "aim": {
                "text": "This experiment implements the linear (sequential) search algorithm to locate a target value in an unsorted 1D array. Students will load n integers into an array, accept a search key from the user, and scan from index 0 to n-1, comparing each element to the key. Upon finding a match the loop exits early via break, and a flag variable records success along with the position. The experiment analyses best-case (O(1) — found at index 0), worst-case (O(n) — found at last position or not present), and average-case complexity, and contrasts linear search with binary search to motivate the need for sorted data.",
                "bullets": [
                  "Declare and use a 1D integer array to store input elements",
                  "Accept a target value from the user to search for",
                  "Implement linear search by traversing the array from index 0 to n-1",
                  "Use a flag variable or break to record the first occurrence index",
                  "Display whether the element was found and at which index (1-based or 0-based)",
                  "Analyse the best-case, worst-case, and average-case complexity of linear search"
                ]
              },
              "theory": [
                {
                  "title": "🔑 The Lost Locker Key!",
                  "body": [
                    "Oh no, you dropped your house key inside one of the school lockers, but you don't remember which one! Since you don't know where it is, you have to open Locker 1 and check. Not there? Open Locker 2 and check. Not there? Open Locker 3... You keep doing this one-by-one until you either find the key, or run out of lockers! This step-by-step checking is called a \"Linear Search\".",
                    "![Linear search through array visualisation](Linear-Search.webp)"
                  ]
                },
                {
                  "title": "Linear Search Algorithm",
                  "body": ["Sequentially checks each element of the array from the first to the last until the target is found or the array is exhausted.", "for (i = 0; i < n; i++) { if (arr[i] == key) { found = 1; pos = i; break; } }"]
                },
                {
                  "title": "Complexity Analysis",
                  "body": ["Best Case: Target is the first element: O(1) — one comparison.", "Worst Case: Target is the last element or not present: O(n) — n comparisons.", "Average Case: Target is somewhere in the middle on average: O(n/2) = O(n)."]
                },
                {
                  "title": "Flag and Position Variables",
                  "body": ["found = 0; initialised to 'not found' before the loop.", "pos = -1; -1 conventionally means 'not found' for an index.", "After the loop, if found == 1, pos holds the index of the first occurrence."]
                },
                {
                  "title": "break Statement and Array State",
                  "body": ["Exits the loop immediately when the target is found, avoiding unnecessary further comparisons.", "Linear search works on both sorted and unsorted arrays, unlike binary search (which requires a sorted array)."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the search for a target in a sample array.",
                "Observe how the loop advances index by index and stops at the first match.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n, then n integers, then the key — e.g. 5  10 30 20 50 40  20",
                "Click Run Code. Verify output: Element 20 found at index 2 (0-based)",
                "Try a key that is not in the array and a key that appears multiple times. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, key, found = 0, pos = -1;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    scanf(\"%d\", &key);\n    for (i = 0; i < n; i++) {\n        if (arr[i] == key) {\n            found = 1;\n            pos = i;\n            break;\n        }\n    }\n    if (found) printf(\"Element %d found at index %d (0-based)\\n\", key, pos);\n    else printf(\"Element not found\\n\");\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "arr", "type": "int[]", "value": "size 100" }, { "variable": "n", "type": "int", "value": "?" }, { "variable": "key", "type": "int", "value": "?" }, { "variable": "found", "type": "int", "value": "0" }, { "variable": "pos", "type": "int", "value": "-1" }], "output": "" },
                  { "line": 6, "annotation": "scanf reads n=5", "memory": [{ "variable": "arr", "type": "int[]", "value": "size 100" }, { "variable": "n", "type": "int", "value": "5" }], "output": "" },
                  { "line": 7, "annotation": "Read array elements: 10 30 20 50 40", "memory": [{ "variable": "arr", "type": "int[]", "value": "{10, 30, 20, 50, 40}" }], "output": "" },
                  { "line": 10, "annotation": "scanf reads key=20", "memory": [{ "variable": "arr", "type": "int[]", "value": "{10, 30, 20, 50, 40}" }, { "variable": "key", "type": "int", "value": "20" }], "output": "" },
                  { "line": 11, "annotation": "Loop i=0", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "i=0, arr[0]=10, 10==20 false", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 11, "annotation": "Loop i=1", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 12, "annotation": "i=1, arr[1]=30, 30==20 false", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 11, "annotation": "Loop i=2", "memory": [{ "variable": "i", "type": "int", "value": "2" }], "output": "" },
                  { "line": 12, "annotation": "i=2, arr[2]=20, 20==20 true", "memory": [{ "variable": "i", "type": "int", "value": "2" }], "output": "" },
                  { "line": 13, "annotation": "found = 1", "memory": [{ "variable": "found", "type": "int", "value": "1" }], "output": "" },
                  { "line": 14, "annotation": "pos = 2", "memory": [{ "variable": "pos", "type": "int", "value": "2" }], "output": "" },
                  { "line": 15, "annotation": "break exits loop", "memory": [], "output": "" },
                  { "line": 18, "annotation": "if(found) is true, printf output", "memory": [], "output": "Element 20 found at index 2 (0-based)\n" },
                  { "line": 21, "annotation": "Program terminates", "memory": [], "output": "Element 20 found at index 2 (0-based)\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w7-3",
            "title": "Reverse Array",
            "desc": "Reverse the elements of a 1D array.",
            "expected": "Reversed array",
            "content": {
              "aim": {
                "text": "This experiment implements in-place array reversal using the two-pointer technique. Students will initialise a left index at 0 and a right index at n-1, swap the elements at those positions using a temporary variable, advance left forward and right backward, and repeat until the two pointers meet. The experiment teaches the XOR-less swap with a temp variable, why in-place reversal needs only O(1) extra memory compared to copying to a second array, and how exactly ⌊n/2⌋ swaps are sufficient to fully reverse an array of n elements.",
                "bullets": [
                  "Declare and use a 1D integer array and a temporary swap variable",
                  "Accept n elements from the user into the array",
                  "Implement in-place reversal by swapping arr[left] and arr[right] while advancing left forward and right backward until they meet",
                  "Print both the original and reversed array using a for loop",
                  "Understand the difference between in-place reversal and copying to a second array"
                ]
              },
              "theory": [
                {
                  "title": "🥞 Flipping the Pancake Stack!",
                  "body": [
                    "Reversing an array is like flipping a whole stack of pancakes upside down! The pancake at the very top swaps places with the pancake at the very bottom. Then, the second pancake from the top swaps with the second from the bottom. You keep swapping the opposite ends until you meet right in the middle!",
                    "![Array reversal two-pointer diagram](array-reverse.webp)"
                  ]
                },
                {
                  "title": "Array Reversal",
                  "body": ["Reversing an array means placing its elements in the opposite order: Original : {1, 2, 3, 4, 5} -> Reversed : {5, 4, 3, 2, 1}"]
                },
                {
                  "title": "Two-Pointer In-Place Technique",
                  "body": ["Use two index variables, left starting at 0 and right starting at n-1. Swap the elements at these positions, then move left forward and right backward.", "Repeat until left >= right:\nwhile (left < right) {\n    temp = arr[left];\n    arr[left] = arr[right];\n    arr[right] = temp;\n    left++; right--;\n}"]
                },
                {
                  "title": "Number of Swaps and Temporary Variable",
                  "body": ["For n elements, exactly floor(n/2) swaps are performed. n = 5 : 2 swaps.", "A temp variable is required for swapping to avoid overwriting a value before it can be saved."]
                },
                {
                  "title": "In-Place vs Second Array",
                  "body": ["In-place reversal uses O(1) extra space (only temp). Copying to a second array uses O(n) extra space — wasteful for large arrays.", "Time Complexity: O(n): each element is moved at most once."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the swap steps for array {1, 2, 3, 4, 5}.",
                "Observe how left and right converge toward the centre with each swap.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 5  1 2 3 4 5",
                "Click Run Code. Verify output: Reversed: 5 4 3 2 1",
                "Try even-sized arrays, single-element arrays, and already-reversed arrays. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, left, right, temp;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    left = 0;\n    right = n - 1;\n    while (left < right) {\n        temp = arr[left];\n        arr[left] = arr[right];\n        arr[right] = temp;\n        left++;\n        right--;\n    }\n    printf(\"Reversed: \");\n    for (i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "arr", "type": "int[]", "value": "size 100" }, { "variable": "n", "type": "int", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "scanf reads n=5", "memory": [{ "variable": "n", "type": "int", "value": "5" }], "output": "" },
                  { "line": 7, "annotation": "Read array elements: 1 2 3 4 5", "memory": [{ "variable": "arr", "type": "int[]", "value": "{1, 2, 3, 4, 5}" }], "output": "" },
                  { "line": 10, "annotation": "left = 0", "memory": [{ "variable": "left", "type": "int", "value": "0" }], "output": "" },
                  { "line": 11, "annotation": "right = 4", "memory": [{ "variable": "right", "type": "int", "value": "4" }], "output": "" },
                  { "line": 12, "annotation": "while left < right (0 < 4)", "memory": [], "output": "" },
                  { "line": 13, "annotation": "Swap arr[0] and arr[4]", "memory": [{ "variable": "temp", "type": "int", "value": "1" }], "output": "" },
                  { "line": 14, "annotation": "arr[0] = 5", "memory": [{ "variable": "arr", "type": "int[]", "value": "{5, 2, 3, 4, 5}" }], "output": "" },
                  { "line": 15, "annotation": "arr[4] = 1", "memory": [{ "variable": "arr", "type": "int[]", "value": "{5, 2, 3, 4, 1}" }], "output": "" },
                  { "line": 16, "annotation": "left++", "memory": [{ "variable": "left", "type": "int", "value": "1" }], "output": "" },
                  { "line": 17, "annotation": "right--", "memory": [{ "variable": "right", "type": "int", "value": "3" }], "output": "" },
                  { "line": 12, "annotation": "while left < right (1 < 3)", "memory": [], "output": "" },
                  { "line": 13, "annotation": "Swap arr[1] and arr[3]", "memory": [{ "variable": "temp", "type": "int", "value": "2" }], "output": "" },
                  { "line": 14, "annotation": "arr[1] = 4", "memory": [{ "variable": "arr", "type": "int[]", "value": "{5, 4, 3, 4, 1}" }], "output": "" },
                  { "line": 15, "annotation": "arr[3] = 2", "memory": [{ "variable": "arr", "type": "int[]", "value": "{5, 4, 3, 2, 1}" }], "output": "" },
                  { "line": 16, "annotation": "left++", "memory": [{ "variable": "left", "type": "int", "value": "2" }], "output": "" },
                  { "line": 17, "annotation": "right--", "memory": [{ "variable": "right", "type": "int", "value": "2" }], "output": "" },
                  { "line": 12, "annotation": "while left < right (2 < 2) false -> Exit loop", "memory": [], "output": "" },
                  { "line": 19, "annotation": "Print reversed array", "memory": [], "output": "Reversed: 5 4 3 2 1 \n" },
                  { "line": 24, "annotation": "Program terminates", "memory": [], "output": "Reversed: 5 4 3 2 1 \n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w7-4",
            "title": "Remove Duplicates",
            "desc": "Remove duplicate elements from an array.",
            "expected": "Unique: 1 3 2 5  New size: 4",
            "content": {
              "aim": {
                "text": "This experiment implements a duplicate-removal algorithm using nested loops to retain only the first occurrence of each value in a 1D array. For each element at position i, an inner loop checks all preceding elements (positions 0 to i-1); if a match is found, a flag marks the element as a duplicate and the inner loop exits early. Only elements not flagged as duplicates are copied to a result array, whose final length gives the count of unique values. The experiment introduces the O(n²) nested-loop approach to deduplication, the flag pattern for recording a loop-discovered condition, and the use of a separate output array with an independent size counter.",
                "bullets": [
                  "Declare and use 1D integer arrays for input and output",
                  "Use nested loops to compare each element against all previously accepted elements",
                  "Use a flag variable to decide whether to include the current element",
                  "Build a result array containing only unique elements",
                  "Print the deduplicated array and its size using printf()"
                ]
              },
              "theory": [
                {
                  "title": "🃏 Sorting a Trading Card Collection!",
                  "body": [
                    "Imagine you buy a pack of Pokémon cards and get three Pikachus. When you put them in your special display binder, you only want to show *one* Pikachu card to keep your collection unique. You keep the first one, and throw the duplicates away! In an array, removing duplicates means shifting all the unique items to the front, and ignoring the repeats.",
                    "![Set of unique items deduplication concept](deduplication-process.webp)"
                  ]
                },
                {
                  "title": "Duplicate Element",
                  "body": ["An element is a duplicate if the same value has already appeared at an earlier index in the array."]
                },
                {
                  "title": "Nested Loop Approach",
                  "body": ["For each element arr[i], check whether it has already appeared in arr[0..i-1]. If not, include it in the result.", "j = 0;\nfor (i = 0; i < n; i++) {\n    isDuplicate = 0;\n    for (k = 0; k < i; k++) { if (arr[k] == arr[i]) { isDuplicate = 1; break; } }\n    if (!isDuplicate) result[j++] = arr[i];\n}"]
                },
                {
                  "title": "Flag Variable and Result Size",
                  "body": ["isDuplicate is initialised to 0 before the inner loop. If any earlier element matches arr[i], isDuplicate is set to 1 and the inner loop breaks early. Only elements with isDuplicate == 0 are copied to result.", "j counts the number of unique elements added. After the loop, j holds the new size of the deduplicated array."]
                },
                {
                  "title": "Complexity",
                  "body": ["Time Complexity: O(n²): for each of the n elements, up to n-1 earlier elements are checked.", "Space Complexity: O(n): the result array uses at most n slots."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the nested loop for array {1, 3, 2, 3, 1, 5}.",
                "Observe how each element is checked against all previous elements before being added.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 6  1 3 2 3 1 5",
                "Click Run Code. Verify output: Unique: 1 3 2 5  New size: 4",
                "Try all-unique arrays, all-duplicate arrays, and single-element arrays. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int arr[100], result[100];\n    int n, i, k, j = 0, isDuplicate;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    for (i = 0; i < n; i++) {\n        isDuplicate = 0;\n        for (k = 0; k < i; k++) {\n            if (arr[k] == arr[i]) {\n                isDuplicate = 1;\n                break;\n            }\n        }\n        if (!isDuplicate) {\n            result[j++] = arr[i];\n        }\n    }\n    printf(\"Unique: \");\n    for (i = 0; i < j; i++) {\n        printf(\"%d \", result[i]);\n    }\n    printf(\" New size: %d\\n\", j);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "j", "type": "int", "value": "0" }, { "variable": "n", "type": "int", "value": "?" }], "output": "" },
                  { "line": 6, "annotation": "scanf reads n=6", "memory": [{ "variable": "n", "type": "int", "value": "6" }], "output": "" },
                  { "line": 7, "annotation": "Read array elements: 1 3 2 3 1 5", "memory": [{ "variable": "arr", "type": "int[]", "value": "{1, 3, 2, 3, 1, 5}" }], "output": "" },
                  { "line": 10, "annotation": "Loop i=0", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 11, "annotation": "isDuplicate = 0", "memory": [{ "variable": "isDuplicate", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "Inner loop k=0 < 0 (false)", "memory": [], "output": "" },
                  { "line": 18, "annotation": "Add arr[0] to result", "memory": [{ "variable": "result", "type": "int[]", "value": "{1, ...}" }, { "variable": "j", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "Loop i=1 (val 3)", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 11, "annotation": "isDuplicate = 0", "memory": [{ "variable": "isDuplicate", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "Inner loop k=0 (arr[0]=1 != 3)", "memory": [], "output": "" },
                  { "line": 18, "annotation": "Add arr[1] to result", "memory": [{ "variable": "result", "type": "int[]", "value": "{1, 3, ...}" }, { "variable": "j", "type": "int", "value": "2" }], "output": "" },
                  { "line": 10, "annotation": "Loop i=2 (val 2)", "memory": [{ "variable": "i", "type": "int", "value": "2" }], "output": "" },
                  { "line": 11, "annotation": "isDuplicate = 0", "memory": [{ "variable": "isDuplicate", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "Inner loop k=0,1 (no match)", "memory": [], "output": "" },
                  { "line": 18, "annotation": "Add arr[2] to result", "memory": [{ "variable": "result", "type": "int[]", "value": "{1, 3, 2, ...}" }, { "variable": "j", "type": "int", "value": "3" }], "output": "" },
                  { "line": 10, "annotation": "Loop i=3 (val 3)", "memory": [{ "variable": "i", "type": "int", "value": "3" }], "output": "" },
                  { "line": 11, "annotation": "isDuplicate = 0", "memory": [{ "variable": "isDuplicate", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "Inner loop matches at k=1 (arr[1]=3)", "memory": [], "output": "" },
                  { "line": 14, "annotation": "isDuplicate = 1, break", "memory": [{ "variable": "isDuplicate", "type": "int", "value": "1" }], "output": "" },
                  { "line": 17, "annotation": "Skip adding to result", "memory": [], "output": "" },
                  { "line": 10, "annotation": "Loop i=4 (val 1)", "memory": [{ "variable": "i", "type": "int", "value": "4" }], "output": "" },
                  { "line": 11, "annotation": "isDuplicate = 0", "memory": [{ "variable": "isDuplicate", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "Inner loop matches at k=0 (arr[0]=1)", "memory": [], "output": "" },
                  { "line": 14, "annotation": "isDuplicate = 1, break", "memory": [{ "variable": "isDuplicate", "type": "int", "value": "1" }], "output": "" },
                  { "line": 17, "annotation": "Skip adding to result", "memory": [], "output": "" },
                  { "line": 10, "annotation": "Loop i=5 (val 5)", "memory": [{ "variable": "i", "type": "int", "value": "5" }], "output": "" },
                  { "line": 11, "annotation": "isDuplicate = 0", "memory": [{ "variable": "isDuplicate", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "Inner loop k=0..4 (no match)", "memory": [], "output": "" },
                  { "line": 18, "annotation": "Add arr[5] to result", "memory": [{ "variable": "result", "type": "int[]", "value": "{1, 3, 2, 5, ...}" }, { "variable": "j", "type": "int", "value": "4" }], "output": "" },
                  { "line": 22, "annotation": "Print result", "memory": [], "output": "Unique: 1 3 2 5  New size: 4\n" },
                  { "line": 28, "annotation": "Program terminates", "memory": [], "output": "Unique: 1 3 2 5  New size: 4\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 8",
        "objective": "2D arrays, string operations, bubble sort",
        "tutorial": "Tutorial 8: Matrices, Strings, Sorting",
        "labTitle": "Lab 8: 2D Arrays and Strings",
        "experiments": [
          {
            "id": "c-w8-1",
            "title": "Matrix Addition",
            "desc": "Add two matrices.",
            "expected": "Result matrix",
            "content": {
              "aim": {
                "text": "This experiment introduces 2D arrays and matrix arithmetic in C. Students will accept two m × n matrices row by row, compute their element-wise sum (C[i][j] = A[i][j] + B[i][j]) using nested for loops, and display the result matrix with aligned formatting. The experiment teaches 2D array declaration in C, row-major memory layout, nested loop traversal patterns for matrix operations, and the constraint that matrix addition is only defined when both matrices share identical dimensions. It forms the foundation for more complex matrix operations such as multiplication.",
                "bullets": [
                  "Declare and initialise 2D integer arrays for two input matrices and one result matrix",
                  "Accept matrix dimensions (rows and columns) from the user",
                  "Use nested for loops to read elements into both matrices",
                  "Compute the sum matrix by adding corresponding elements",
                  "Use nested for loops with printf() to display the result in matrix format"
                ]
              },
              "theory": [
                {
                  "title": "🍕 The Double-Decker Pizza Grid!",
                  "body": [
                    "Imagine you have two square pizza boxes (Matrix A and Matrix B), and both are sliced into a perfect 3x3 grid. To add these matrices together, you don't do anything crazy—you just stack them! The slice in the top-left corner of Box A gets added to the slice in the top-left corner of Box B. You just add the matching spots together. It's that simple!",
                    "![Matrix addition element-wise diagram](matrix-addition.webp)"
                  ]
                },
                {
                  "title": "2D Array Declaration",
                  "body": ["A two-dimensional array in C is declared as: int A[10][10];", "It stores elements in row-major order. Element at row i, column j is accessed as A[i][j]. Row indices run from 0 to rows-1; column indices from 0 to cols-1."]
                },
                {
                  "title": "Matrix Addition",
                  "body": ["Two matrices A and B of the same dimensions (m × n) can be added. The result matrix C is computed element-wise: C[i][j] = A[i][j] + B[i][j]", "Matrices of different dimensions cannot be added."]
                },
                {
                  "title": "Nested Loop Structure",
                  "body": ["Two nested loops traverse all elements:\nfor (i = 0; i < rows; i++) {\n    for (j = 0; j < cols; j++) {\n        C[i][j] = A[i][j] + B[i][j];\n    }\n}", "The outer loop iterates over rows; the inner loop iterates over columns."]
                },
                {
                  "title": "Printing a Matrix",
                  "body": ["Use nested loops and \\n after each row. %4d right-aligns numbers in a 4-character wide field for neat output.", "Time Complexity: O(m × n). Space Complexity: O(m × n)."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace element-wise addition for two 2×2 matrices.",
                "Observe how C[i][j] = A[i][j] + B[i][j] is computed for each position.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter rows, cols, then matrix A row by row, then matrix B row by row (e.g. 2 2  1 2 3 4  5 6 7 8).",
                "Click Run Code. Verify result matrix.",
                "Try non-square matrices (2×3) and matrices containing negative values. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int A[10][10], B[10][10], C[10][10];\n    int rows, cols, i, j;\n    scanf(\"%d %d\", &rows, &cols);\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            scanf(\"%d\", &A[i][j]);\n        }\n    }\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            scanf(\"%d\", &B[i][j]);\n        }\n    }\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            C[i][j] = A[i][j] + B[i][j];\n        }\n    }\n    printf(\"Result:\\n\");\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            printf(\"%4d\", C[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate matrix variables A, B, C", "memory": [{ "variable": "rows", "type": "int", "value": "?" }, { "variable": "cols", "type": "int", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf reads dimensions (e.g., 2 2)", "memory": [{ "variable": "rows", "type": "int", "value": "2" }, { "variable": "cols", "type": "int", "value": "2" }], "output": "" },
                  { "line": 9, "annotation": "Read Matrix A elements (1 2 3 4)", "memory": [{ "variable": "A", "type": "int[][]", "value": "{{1, 2}, {3, 4}}" }], "output": "" },
                  { "line": 14, "annotation": "Read Matrix B elements (5 6 7 8)", "memory": [{ "variable": "B", "type": "int[][]", "value": "{{5, 6}, {7, 8}}" }], "output": "" },
                  { "line": 17, "annotation": "Start Addition outer loop i=0", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 18, "annotation": "Inner loop j=0", "memory": [{ "variable": "i", "type": "int", "value": "0" }, { "variable": "j", "type": "int", "value": "0" }], "output": "" },
                  { "line": 19, "annotation": "C[0][0] = A[0][0] + B[0][0] = 1 + 5 = 6", "memory": [{ "variable": "C[0][0]", "type": "int", "value": "6" }], "output": "" },
                  { "line": 18, "annotation": "Inner loop j=1", "memory": [{ "variable": "i", "type": "int", "value": "0" }, { "variable": "j", "type": "int", "value": "1" }], "output": "" },
                  { "line": 19, "annotation": "C[0][1] = A[0][1] + B[0][1] = 2 + 6 = 8", "memory": [{ "variable": "C[0][1]", "type": "int", "value": "8" }], "output": "" },
                  { "line": 17, "annotation": "Outer loop i=1", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 18, "annotation": "Inner loop j=0", "memory": [{ "variable": "i", "type": "int", "value": "1" }, { "variable": "j", "type": "int", "value": "0" }], "output": "" },
                  { "line": 19, "annotation": "C[1][0] = A[1][0] + B[1][0] = 3 + 7 = 10", "memory": [{ "variable": "C[1][0]", "type": "int", "value": "10" }], "output": "" },
                  { "line": 18, "annotation": "Inner loop j=1", "memory": [{ "variable": "i", "type": "int", "value": "1" }, { "variable": "j", "type": "int", "value": "1" }], "output": "" },
                  { "line": 19, "annotation": "C[1][1] = A[1][1] + B[1][1] = 4 + 8 = 12", "memory": [{ "variable": "C[1][1]", "type": "int", "value": "12" }], "output": "" },
                  { "line": 22, "annotation": "Start printing", "memory": [], "output": "Result:\n" },
                  { "line": 25, "annotation": "Print row 0", "memory": [], "output": "Result:\n   6   8" },
                  { "line": 27, "annotation": "Newline after row 0", "memory": [], "output": "Result:\n   6   8\n" },
                  { "line": 25, "annotation": "Print row 1", "memory": [], "output": "Result:\n   6   8\n  10  12" },
                  { "line": 27, "annotation": "Newline after row 1", "memory": [], "output": "Result:\n   6   8\n  10  12\n" },
                  { "line": 29, "annotation": "Program terminates", "memory": [], "output": "Result:\n   6   8\n  10  12\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w8-2",
            "title": "Matrix Multiplication",
            "desc": "Multiply two matrices.",
            "expected": "Product matrix",
            "content": {
              "aim": {
                "text": "This experiment implements the three-loop matrix multiplication algorithm to compute the product of an m × p matrix A and a p × n matrix B, yielding an m × n result matrix C where each element C[i][j] is the dot product of row i of A and column j of B. Students will validate the compatibility condition (A's column count must equal B's row count), initialise each C[i][j] to zero before the innermost accumulation loop, and display the product matrix with aligned formatting. The experiment demonstrates the O(m × p × n) time complexity, the critical importance of zero-initialisation before accumulation, and the geometric interpretation of matrix multiplication as row-column dot products.",
                "bullets": [
                  "Declare and initialise 2D integer arrays for two input matrices and the result matrix",
                  "Validate that the number of columns of A equals the number of rows of B",
                  "Implement the three-loop matrix multiplication algorithm",
                  "Initialise each C[i][j] to 0 before accumulating the dot product",
                  "Display the result matrix using nested loops and printf()"
                ]
              },
              "theory": [
                {
                  "title": "🏭 The Factory Assembly Line!",
                  "body": [
                    "Matrix multiplication is NOT like addition. It's a complex, choreographed dance! Instead of just matching spots, the workers on the conveyor belt (a Row in Matrix A) have to high-five every single worker going up the elevator (a Column in Matrix B). You multiply them one-by-one and add up all the high-fives to get a single number for the new matrix. It's a Row-by-Column collision!",
                    "![Matrix multiplication dot product diagram](matrix-multiplication.webp)"
                  ]
                },
                {
                  "title": "Matrix Multiplication Condition",
                  "body": ["A matrix A of size m × p can be multiplied by a matrix B of size p × n only if the number of columns of A equals the number of rows of B (both equal p). The result C is of size m × n."]
                },
                {
                  "title": "Formula",
                  "body": ["Each element C[i][j] is the dot product of row i of A and column j of B:", "C[i][j] = Σ A[i][k] * B[k][j]   for k = 0 to p-1"]
                },
                {
                  "title": "Three-Loop Algorithm",
                  "body": ["for (i = 0; i < m; i++)\n    for (j = 0; j < n; j++) {\n        C[i][j] = 0;\n        for (k = 0; k < p; k++)\n            C[i][j] += A[i][k] * B[k][j];\n    }"]
                },
                {
                  "title": "Initialisation of C",
                  "body": ["Each C[i][j] must be set to 0 before the innermost loop adds to it. Failing to initialise causes garbage values to corrupt the result.", "Time Complexity: O(m × p × n). Space Complexity: O(m × n)."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the dot product computation for C[0][0] and C[0][1].",
                "Observe how the k loop accumulates A[i][k] * B[k][j] into C[i][j].",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "Enter m, p, n, then matrix A (m×p), then matrix B (p×n).",
                "Click Run Code. Verify result: C = {{19,22},{43,50}}",
                "Try a 2×3 multiplied by 3×2 and attempt an invalid multiplication to test the check. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int A[10][10], B[10][10], C[10][10];\n    int m, p, n, i, j, k;\n    scanf(\"%d %d %d\", &m, &p, &n);\n    for (i = 0; i < m; i++) {\n        for (j = 0; j < p; j++) {\n            scanf(\"%d\", &A[i][j]);\n        }\n    }\n    for (i = 0; i < p; i++) {\n        for (j = 0; j < n; j++) {\n            scanf(\"%d\", &B[i][j]);\n        }\n    }\n    for (i = 0; i < m; i++) {\n        for (j = 0; j < n; j++) {\n            C[i][j] = 0;\n            for (k = 0; k < p; k++) {\n                C[i][j] += A[i][k] * B[k][j];\n            }\n        }\n    }\n    printf(\"Result:\\n\");\n    for (i = 0; i < m; i++) {\n        for (j = 0; j < n; j++) {\n            printf(\"%4d\", C[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate matrices and variables", "memory": [{ "variable": "m", "type": "int", "value": "?" }, { "variable": "p", "type": "int", "value": "?" }, { "variable": "n", "type": "int", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf reads dimensions (2 2 2)", "memory": [{ "variable": "m", "type": "int", "value": "2" }, { "variable": "p", "type": "int", "value": "2" }, { "variable": "n", "type": "int", "value": "2" }], "output": "" },
                  { "line": 9, "annotation": "Read Matrix A (1 2 3 4)", "memory": [{ "variable": "A", "type": "int[][]", "value": "{{1, 2}, {3, 4}}" }], "output": "" },
                  { "line": 14, "annotation": "Read Matrix B (5 6 7 8)", "memory": [{ "variable": "B", "type": "int[][]", "value": "{{5, 6}, {7, 8}}" }], "output": "" },
                  { "line": 17, "annotation": "Outer loop i=0", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 18, "annotation": "Mid loop j=0", "memory": [{ "variable": "i", "type": "int", "value": "0" }, { "variable": "j", "type": "int", "value": "0" }], "output": "" },
                  { "line": 19, "annotation": "C[0][0] = 0", "memory": [{ "variable": "C[0][0]", "type": "int", "value": "0" }], "output": "" },
                  { "line": 20, "annotation": "Inner loop k=0, k=1", "memory": [{ "variable": "C[0][0]", "type": "int", "value": "19" }], "output": "" },
                  { "line": 18, "annotation": "Mid loop j=1", "memory": [{ "variable": "i", "type": "int", "value": "0" }, { "variable": "j", "type": "int", "value": "1" }], "output": "" },
                  { "line": 19, "annotation": "C[0][1] = 0", "memory": [{ "variable": "C[0][1]", "type": "int", "value": "0" }], "output": "" },
                  { "line": 20, "annotation": "Inner loop k=0, k=1", "memory": [{ "variable": "C[0][1]", "type": "int", "value": "22" }], "output": "" },
                  { "line": 17, "annotation": "Outer loop i=1", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 18, "annotation": "Mid loop j=0", "memory": [{ "variable": "i", "type": "int", "value": "1" }, { "variable": "j", "type": "int", "value": "0" }], "output": "" },
                  { "line": 19, "annotation": "C[1][0] = 0", "memory": [{ "variable": "C[1][0]", "type": "int", "value": "0" }], "output": "" },
                  { "line": 20, "annotation": "Inner loop k=0, k=1", "memory": [{ "variable": "C[1][0]", "type": "int", "value": "43" }], "output": "" },
                  { "line": 18, "annotation": "Mid loop j=1", "memory": [{ "variable": "i", "type": "int", "value": "1" }, { "variable": "j", "type": "int", "value": "1" }], "output": "" },
                  { "line": 19, "annotation": "C[1][1] = 0", "memory": [{ "variable": "C[1][1]", "type": "int", "value": "0" }], "output": "" },
                  { "line": 20, "annotation": "Inner loop k=0, k=1", "memory": [{ "variable": "C[1][1]", "type": "int", "value": "50" }], "output": "" },
                  { "line": 25, "annotation": "Print Result", "memory": [], "output": "Result:\n" },
                  { "line": 28, "annotation": "Print row 0", "memory": [], "output": "Result:\n  19  22" },
                  { "line": 30, "annotation": "Newline after row 0", "memory": [], "output": "Result:\n  19  22\n" },
                  { "line": 28, "annotation": "Print row 1", "memory": [], "output": "Result:\n  19  22\n  43  50" },
                  { "line": 30, "annotation": "Newline after row 1", "memory": [], "output": "Result:\n  19  22\n  43  50\n" },
                  { "line": 32, "annotation": "Program terminates", "memory": [], "output": "Result:\n  19  22\n  43  50\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w8-3",
            "title": "Bubble Sort",
            "desc": "Sort an array using bubble sort.",
            "expected": "Sorted array",
            "content": {
              "aim": {
                "text": "This experiment implements the Bubble Sort algorithm to sort a 1D integer array in ascending order. Students will use an outer loop to perform n-1 passes and an inner loop to compare adjacent element pairs, swapping them when out of order so that the largest unsorted element rises to its final position after each pass. An early-termination optimisation using a swapped flag detects an already-sorted array and exits the outer loop prematurely, yielding O(n) best-case performance. The experiment covers the algorithm's stability property, its O(n²) worst- and average-case complexity, and the role of the three-step swap (temp → a → b → temp) in rearranging elements without data loss.",
                "bullets": [
                  "Declare and use a 1D integer array and a temporary swap variable",
                  "Implement the standard two-loop Bubble Sort",
                  "Apply an early-termination optimisation using a swapped flag",
                  "Print the array before and after sorting using a for loop",
                  "Analyse best-case, worst-case, and average-case time complexity of Bubble Sort"
                ]
              },
              "theory": [
                {
                  "title": "🫧 Bubbles Rising in a Soda!",
                  "body": [
                    "When you pour a glass of soda, the biggest, heaviest bubbles always float to the top first. That's exactly how Bubble Sort works! We compare two numbers side-by-side. If the left one is heavier (larger), they swap places. The heavy numbers slowly \"bubble\" their way to the far right end of the array, one by one, until everyone is standing in the perfect order!",
                    "![Bubble sort passes visualisation](bubblesort-animation.gif)"
                  ]
                },
                {
                  "title": "Bubble Sort Algorithm",
                  "body": ["Repeatedly steps through the array comparing adjacent elements and swapping them if they are in the wrong order. Larger elements \"bubble\" toward the end with each pass."]
                },
                {
                  "title": "Standard Two-Loop Implementation",
                  "body": ["for (i = 0; i < n-1; i++) {\n    for (j = 0; j < n-1-i; j++) {\n        if (arr[j] > arr[j+1]) {\n            temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;\n        }\n    }\n}", "After pass i, the largest i+1 elements are in their final positions at the end."]
                },
                {
                  "title": "Early Termination Optimisation",
                  "body": ["Add a swapped flag. If no swap occurred in a full pass, the array is already sorted and the outer loop exits early:", "swapped = 0;\nfor (j = 0; j < n-1-i; j++) {\n    if (arr[j] > arr[j+1]) { swap; swapped = 1; }\n}\nif (!swapped) break;"]
                },
                {
                  "title": "Complexity and Stability",
                  "body": ["Worst/Average case: O(n²). Best case (already sorted): O(n) with early termination.", "Space Complexity: O(1). Stability: Bubble Sort is stable (equal elements retain order)."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace each pass of Bubble Sort on array {5, 3, 1, 4, 2}.",
                "Observe how the largest unsorted element reaches its final position after each pass.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 5  5 3 1 4 2",
                "Click Run Code. Verify output: Sorted: 1 2 3 4 5",
                "Try an already-sorted array to verify early termination, and a reverse-sorted array. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, j, temp, swapped;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    for (i = 0; i < n - 1; i++) {\n        swapped = 0;\n        for (j = 0; j < n - 1 - i; j++) {\n            if (arr[j] > arr[j+1]) {\n                temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n                swapped = 1;\n            }\n        }\n        if (!swapped) break;\n    }\n    printf(\"Sorted: \");\n    for (i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio library", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Allocate variables", "memory": [{ "variable": "arr", "type": "int[]", "value": "size 100" }, { "variable": "n", "type": "int", "value": "?" }], "output": "" },
                  { "line": 5, "annotation": "scanf reads n=5", "memory": [{ "variable": "n", "type": "int", "value": "5" }], "output": "" },
                  { "line": 7, "annotation": "Read elements: 5 3 1 4 2", "memory": [{ "variable": "arr", "type": "int[]", "value": "{5, 3, 1, 4, 2}" }], "output": "" },
                  { "line": 9, "annotation": "Pass i=0", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 10, "annotation": "swapped = 0", "memory": [{ "variable": "swapped", "type": "int", "value": "0" }], "output": "" },
                  { "line": 11, "annotation": "Inner loop j=0 to 3", "memory": [{ "variable": "j", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "arr[0]>arr[1] (5>3) -> Swap", "memory": [{ "variable": "arr", "type": "int[]", "value": "{3, 5, 1, 4, 2}" }, { "variable": "swapped", "type": "int", "value": "1" }], "output": "" },
                  { "line": 12, "annotation": "arr[1]>arr[2] (5>1) -> Swap", "memory": [{ "variable": "j", "type": "int", "value": "1" }, { "variable": "arr", "type": "int[]", "value": "{3, 1, 5, 4, 2}" }], "output": "" },
                  { "line": 12, "annotation": "arr[2]>arr[3] (5>4) -> Swap", "memory": [{ "variable": "j", "type": "int", "value": "2" }, { "variable": "arr", "type": "int[]", "value": "{3, 1, 4, 5, 2}" }], "output": "" },
                  { "line": 12, "annotation": "arr[3]>arr[4] (5>2) -> Swap", "memory": [{ "variable": "j", "type": "int", "value": "3" }, { "variable": "arr", "type": "int[]", "value": "{3, 1, 4, 2, 5}" }], "output": "" },
                  { "line": 19, "annotation": "Pass 0 ends. swapped=1", "memory": [], "output": "" },
                  { "line": 9, "annotation": "Pass i=1", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "swapped = 0", "memory": [{ "variable": "swapped", "type": "int", "value": "0" }], "output": "" },
                  { "line": 11, "annotation": "Inner loop j=0 to 2", "memory": [{ "variable": "j", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "arr[0]>arr[1] (3>1) -> Swap", "memory": [{ "variable": "arr", "type": "int[]", "value": "{1, 3, 4, 2, 5}" }, { "variable": "swapped", "type": "int", "value": "1" }], "output": "" },
                  { "line": 12, "annotation": "arr[1]>arr[2] (3>4) -> No swap", "memory": [{ "variable": "j", "type": "int", "value": "1" }], "output": "" },
                  { "line": 12, "annotation": "arr[2]>arr[3] (4>2) -> Swap", "memory": [{ "variable": "j", "type": "int", "value": "2" }, { "variable": "arr", "type": "int[]", "value": "{1, 3, 2, 4, 5}" }], "output": "" },
                  { "line": 9, "annotation": "Pass i=2", "memory": [{ "variable": "i", "type": "int", "value": "2" }], "output": "" },
                  { "line": 10, "annotation": "swapped = 0", "memory": [{ "variable": "swapped", "type": "int", "value": "0" }], "output": "" },
                  { "line": 11, "annotation": "Inner loop j=0 to 1", "memory": [{ "variable": "j", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "arr[0]>arr[1] (1>3) -> No swap", "memory": [], "output": "" },
                  { "line": 12, "annotation": "arr[1]>arr[2] (3>2) -> Swap", "memory": [{ "variable": "j", "type": "int", "value": "1" }, { "variable": "arr", "type": "int[]", "value": "{1, 2, 3, 4, 5}" }, { "variable": "swapped", "type": "int", "value": "1" }], "output": "" },
                  { "line": 9, "annotation": "Pass i=3", "memory": [{ "variable": "i", "type": "int", "value": "3" }], "output": "" },
                  { "line": 10, "annotation": "swapped = 0", "memory": [{ "variable": "swapped", "type": "int", "value": "0" }], "output": "" },
                  { "line": 11, "annotation": "Inner loop j=0 to 0", "memory": [{ "variable": "j", "type": "int", "value": "0" }], "output": "" },
                  { "line": 12, "annotation": "arr[0]>arr[1] (1>2) -> No swap", "memory": [], "output": "" },
                  { "line": 19, "annotation": "swapped=0 -> break (Early exit)", "memory": [], "output": "" },
                  { "line": 21, "annotation": "Print Sorted array", "memory": [], "output": "Sorted: 1 2 3 4 5 \n" },
                  { "line": 26, "annotation": "Program terminates", "memory": [], "output": "Sorted: 1 2 3 4 5 \n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w8-4",
            "title": "String Concatenation",
            "desc": "Concatenate two strings without using strcat().",
            "expected": "Concatenated string",
            "content": {
              "aim": {
                "text": "This experiment implements string concatenation manually without using the strcat() library function, giving students direct experience with how C strings are structured and manipulated at the character level. Students will accept two strings, find the length of the first string using strlen(), then append each character of the second string to the end of the first by writing into positions starting at index len1, and finally place a null terminator at the end of the combined string. The experiment underlines why the null terminator is critical to string validity, why the destination buffer must be large enough to hold both strings, and how manual character-by-character operations mirror what library functions do internally.",
                "bullets": [
                  "Declare character arrays (strings) of sufficient size to hold both strings",
                  "Use strlen() to find the lengths of both strings",
                  "Traverse the second string character by character, appending to the first",
                  "Append the null terminator '\\0' after the last copied character",
                  "Display the concatenated result using printf() with %s"
                ]
              },
              "theory": [
                {
                  "title": "🚂 Connecting the Train Cars!",
                  "body": [
                    "In C, a word (String) is just a train made out of individual letter boxcars. The very last car is always a special marker called the Null Terminator ('\0'). When we \"concatenate\" two strings, it's like unhooking the caboose of the first train, and hooking the entire second train onto the back to create one giant mega-train!",
                    "![String concatenation null terminator diagram](string-concat.webp)"
                  ]
                },
                {
                  "title": "Strings in C",
                  "body": ["A string is a character array terminated by the null character '\\0'.", "char str[50] = \"Hello\"; // stored as: H e l l o \\0", "strlen(\"Hello\") = 5 (the null terminator is not counted)."]
                },
                {
                  "title": "Manual Concatenation Algorithm",
                  "body": ["len1 = strlen(s1);\nfor (i = 0; s2[i] != '\\0'; i++)\n    s1[len1 + i] = s2[i];\ns1[len1 + i] = '\\0';", "You must explicitly append '\\0' at the end. Without it, printf(\"%s\") will read into undefined memory."]
                },
                {
                  "title": "Buffer Size",
                  "body": ["s1 must be declared large enough to hold both strings plus '\\0'. Exceeding the buffer causes undefined behaviour (buffer overflow)."]
                },
                {
                  "title": "Library Alternative",
                  "body": ["strcat(s1, s2); appends s2 to s1, including null terminator automatically.", "strncat(s1, s2, n); safer version that copies at most n characters."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace character-by-character appending of s2 onto s1.",
                "Observe how len1 is used as the starting index and how '\\0' terminates the result.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter two strings on separate lines — e.g. Hello (enter) World",
                "Click Run Code. Verify output: Concatenated: HelloWorld",
                "Try empty strings and longer strings. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[200], s2[100];\n    int len1, i;\n    scanf(\"%s %s\", s1, s2);\n    len1 = strlen(s1);\n    for (i = 0; s2[i] != '\\0'; i++) {\n        s1[len1 + i] = s2[i];\n    }\n    s1[len1 + i] = '\\0';\n    printf(\"Concatenated: %s\\n\", s1);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio and string libraries", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Allocate string buffers", "memory": [{ "variable": "s1", "type": "char[]", "value": "size 200" }, { "variable": "s2", "type": "char[]", "value": "size 100" }], "output": "" },
                  { "line": 7, "annotation": "scanf reads 'Hello' and 'World'", "memory": [{ "variable": "s1", "type": "char[]", "value": "\"Hello\"" }, { "variable": "s2", "type": "char[]", "value": "\"World\"" }], "output": "" },
                  { "line": 8, "annotation": "strlen(s1) = 5", "memory": [{ "variable": "s1", "type": "char[]", "value": "\"Hello\"" }, { "variable": "len1", "type": "int", "value": "5" }], "output": "" },
                  { "line": 9, "annotation": "Loop starts (i=0, s2[0]='W')", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 10, "annotation": "s1[5] = 'W'", "memory": [{ "variable": "s1", "type": "char[]", "value": "\"HelloW\"" }], "output": "" },
                  { "line": 9, "annotation": "Loop i=1, s2[1]='o'", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "s1[6] = 'o'", "memory": [{ "variable": "s1", "type": "char[]", "value": "\"HelloWo\"" }], "output": "" },
                  { "line": 9, "annotation": "Loop i=2, s2[2]='r'", "memory": [{ "variable": "i", "type": "int", "value": "2" }], "output": "" },
                  { "line": 10, "annotation": "s1[7] = 'r'", "memory": [{ "variable": "s1", "type": "char[]", "value": "\"HelloWor\"" }], "output": "" },
                  { "line": 9, "annotation": "Loop i=3, s2[3]='l'", "memory": [{ "variable": "i", "type": "int", "value": "3" }], "output": "" },
                  { "line": 10, "annotation": "s1[8] = 'l'", "memory": [{ "variable": "s1", "type": "char[]", "value": "\"HelloWorl\"" }], "output": "" },
                  { "line": 9, "annotation": "Loop i=4, s2[4]='d'", "memory": [{ "variable": "i", "type": "int", "value": "4" }], "output": "" },
                  { "line": 10, "annotation": "s1[9] = 'd'", "memory": [{ "variable": "s1", "type": "char[]", "value": "\"HelloWorld\"" }], "output": "" },
                  { "line": 9, "annotation": "Loop i=5, s2[5]='\\0' -> Exit loop", "memory": [{ "variable": "i", "type": "int", "value": "5" }], "output": "" },
                  { "line": 12, "annotation": "Append '\\0' to s1", "memory": [{ "variable": "s1", "type": "char[]", "value": "\"HelloWorld\\0\"" }], "output": "" },
                  { "line": 13, "annotation": "printf output", "memory": [], "output": "Concatenated: HelloWorld\n" },
                  { "line": 15, "annotation": "Program terminates", "memory": [], "output": "Concatenated: HelloWorld\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w8-5",
            "title": "Reverse String",
            "desc": "Reverse a string.",
            "expected": "Reversed string",
            "content": {
              "aim": {
                "text": "This experiment applies the two-pointer swapping technique (used for array reversal in Week 7) to reverse a C string in-place without using any standard library reversal function. Students will accept a string, compute its length using strlen() to position the right pointer at the last character (index len-1), and iteratively swap characters from both ends toward the centre while ensuring the null terminator at index len is never touched. The experiment also serves as a natural lead-in to palindrome detection — if the reversed string is identical to the original, the string is a palindrome.",
                "bullets": [
                  "Declare a character array of sufficient size",
                  "Use strlen() to find the string length and set the two pointer positions",
                  "Swap characters from both ends moving toward the centre using a while loop",
                  "Preserve the null terminator at the end after reversal",
                  "Display the reversed string using printf() with %s"
                ]
              },
              "theory": [
                {
                  "title": "🪟 Reading Backwards through Glass!",
                  "body": [
                    "Reversing a string is exactly like reversing an array of numbers. You swap the first letter with the very last letter, the second letter with the second-to-last, and keep squeezing inwards until you meet in the middle. The only trick? You have to make sure you don't accidentally move the '\0' end-of-train marker, otherwise the computer won't know where the word stops!",
                    "![String reversal two pointer diagram](Reverse-String.webp)"
                  ]
                },
                {
                  "title": "String as Character Array",
                  "body": ["A C string is stored as a char array: char str[] = \"Hello\";", "Indices 0 to len-1 hold the characters; index len holds '\\0'."]
                },
                {
                  "title": "Two-Pointer Reversal",
                  "body": ["Identical to the array reversal technique:", "left = 0; right = strlen(str) - 1;\nwhile (left < right) {\n    temp = str[left]; str[left] = str[right]; str[right] = temp;\n    left++; right--;\n}", "The null terminator at index len is never touched — it stays in place."]
                },
                {
                  "title": "Number of Swaps and Null Terminator Safety",
                  "body": ["Swaps: floor(len / 2). \"Hello\" (len=5) : 2 swaps.", "strlen() counts only characters before '\\0'. Setting right = strlen(str) - 1 ensures '\\0' is never swapped, preserving string validity."]
                },
                {
                  "title": "Palindrome Detection",
                  "body": ["Reversing a string and comparing with the original is one method to check if a string is a palindrome. \"madam\" reversed = \"madam\" -> Palindrome.", "Library Alternative: strrev(str) reverses a string in-place (available in some compilers; not in standard C99/C11)."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the swap steps for str = \"Hello\".",
                "Observe how left and right converge and the null terminator remains untouched.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a string — e.g. Hello",
                "Click Run Code. Verify output: Reversed: olleH",
                "Try palindromes like \"madam\" and \"racecar\". Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[100];\n    int left, right;\n    char temp;\n    scanf(\"%s\", str);\n    left = 0;\n    right = strlen(str) - 1;\n    while (left < right) {\n        temp = str[left];\n        str[left] = str[right];\n        str[right] = temp;\n        left++;\n        right--;\n    }\n    printf(\"Reversed: %s\\n\", str);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio and string libraries", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Allocate variables", "memory": [{ "variable": "str", "type": "char[]", "value": "size 100" }], "output": "" },
                  { "line": 8, "annotation": "scanf reads 'Hello'", "memory": [{ "variable": "str", "type": "char[]", "value": "\"Hello\"" }], "output": "" },
                  { "line": 9, "annotation": "left = 0", "memory": [{ "variable": "left", "type": "int", "value": "0" }], "output": "" },
                  { "line": 10, "annotation": "right = strlen(\"Hello\") - 1 = 4", "memory": [{ "variable": "right", "type": "int", "value": "4" }], "output": "" },
                  { "line": 11, "annotation": "while left < right (0 < 4)", "memory": [], "output": "" },
                  { "line": 12, "annotation": "temp = str[0] ('H')", "memory": [{ "variable": "temp", "type": "char", "value": "'H'" }], "output": "" },
                  { "line": 13, "annotation": "str[0] = str[4] ('o')", "memory": [{ "variable": "str", "type": "char[]", "value": "\"oello\"" }], "output": "" },
                  { "line": 14, "annotation": "str[4] = temp ('H')", "memory": [{ "variable": "str", "type": "char[]", "value": "\"oellH\"" }], "output": "" },
                  { "line": 15, "annotation": "left++", "memory": [{ "variable": "left", "type": "int", "value": "1" }], "output": "" },
                  { "line": 16, "annotation": "right--", "memory": [{ "variable": "right", "type": "int", "value": "3" }], "output": "" },
                  { "line": 11, "annotation": "while left < right (1 < 3)", "memory": [], "output": "" },
                  { "line": 12, "annotation": "temp = str[1] ('e')", "memory": [{ "variable": "temp", "type": "char", "value": "'e'" }], "output": "" },
                  { "line": 13, "annotation": "str[1] = str[3] ('l')", "memory": [{ "variable": "str", "type": "char[]", "value": "\"olllo\"" }], "output": "" },
                  { "line": 14, "annotation": "str[3] = temp ('e')", "memory": [{ "variable": "str", "type": "char[]", "value": "\"olleH\"" }], "output": "" },
                  { "line": 15, "annotation": "left++", "memory": [{ "variable": "left", "type": "int", "value": "2" }], "output": "" },
                  { "line": 16, "annotation": "right--", "memory": [{ "variable": "right", "type": "int", "value": "2" }], "output": "" },
                  { "line": 11, "annotation": "while left < right (2 < 2) false -> Exit loop", "memory": [], "output": "" },
                  { "line": 18, "annotation": "Print reversed string", "memory": [], "output": "Reversed: olleH\n" },
                  { "line": 20, "annotation": "Program terminates", "memory": [], "output": "Reversed: olleH\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 9",
        "objective": "malloc, calloc, realloc, free, command-line args",
        "tutorial": "Tutorial 9: Pointers and Dynamic Memory",
        "labTitle": "Lab 9: Dynamic Allocation",
        "experiments": [
          {
            "id": "c-w9-1",
            "title": "Array Sum using malloc",
            "desc": "Calculate the sum of elements allocated via malloc().",
            "expected": "Sum=X",
            "content": {
              "aim": {
                "text": "This experiment introduces dynamic memory allocation in C using malloc() from the stdlib.h library. Unlike static arrays whose size is fixed at compile time, malloc() allocates a requested number of bytes on the heap at runtime, enabling programs to handle arrays of user-determined size. Students will read n from the user, allocate an integer array of exactly that size, verify the returned pointer is not NULL (allocation failure), read elements into the array, compute their sum and average, and release the memory with free() before exiting. The experiment establishes the complete dynamic allocation lifecycle — allocate, use, check, free — and explains why memory leaks occur when free() is omitted.",
                "bullets": [
                  "Include stdlib.h for malloc() and free()",
                  "Dynamically allocate an integer array using malloc()",
                  "Check the return value of malloc() for NULL (allocation failure)",
                  "Traverse the allocated array with a pointer or index to compute sum",
                  "Free the allocated memory using free() after use",
                  "Use printf() with %d and %.2f to display sum and average"
                ]
              },
              "theory": [
                {
                  "title": "Static vs Dynamic Allocation",
                  "body": ["Static  : int arr[100]; — size fixed at compile time, stored on the stack.", "Dynamic : int *arr = malloc(n * sizeof(int)); — size decided at runtime, stored on the heap. Allows flexible, user-determined array sizes."]
                },
                {
                  "title": "malloc()",
                  "body": [ "![Malloc memory allocation](malloc.webp)","Memory ALLOCation. Syntax:\n  void *malloc(size_t size);\nAllocates a contiguous block of size bytes on the heap. Returns a void* pointer to the first byte, or NULL if allocation fails. The memory is uninitialised (contains garbage values). Must be cast to the required type:\n  int *arr = (int *) malloc(n * sizeof(int));"]
                },
                {
                  "title": "sizeof(int)",
                  "body": ["Always use sizeof to compute the correct byte count per element. sizeof(int) is typically 4 bytes on 32/64-bit systems. Hardcoding 4 is non-portable."]
                },
                {
                  "title": "NULL Check",
                  "body": ["malloc() returns NULL when the system cannot allocate the requested memory (e.g. out of heap space). Always check:\n  if (arr == NULL) { printf(\"Allocation failed\\n\"); exit(1); }\nDereferencing a NULL pointer causes a segmentation fault."]
                },
                {
                  "title": "free()",
                  "body": ["Releases the heap memory back to the OS:\n  free(arr);\nAfter free(), the pointer is a dangling pointer. Set it to NULL immediately:\n  arr = NULL;\nFailure to free memory causes a memory leak — the allocated block remains reserved until the program exits."]
                },
                {
                  "title": "Pointer Arithmetic",
                  "body": ["arr[i] is equivalent to *(arr + i). Both access the element i positions ahead of the base address."]
                },
                {
                  "title": "Sum and Average",
                  "body": ["sum = 0;\nfor (i = 0; i < n; i++) sum += arr[i];\naverage = (float) sum / n;"]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace malloc, array fill, sum computation, and free.",
                "Observe the heap address assigned to arr and how it is released after free().",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 5  10 20 30 40 50",
                "Click Run Code. Verify output: Sum: 150  Average: 30.00",
                "Try n = 1 and a large n like 1000 to observe dynamic sizing. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, i, sum = 0;\n    float average;\n    int *arr;\n    scanf(\"%d\", &n);\n    arr = (int *) malloc(n * sizeof(int));\n    if (arr == NULL) {\n        printf(\"Allocation failed\\n\");\n        return 1;\n    }\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n        sum += arr[i];\n    }\n    average = (float) sum / n;\n    printf(\"Sum: %d  Average: %.2f\\n\", sum, average);\n    free(arr);\n    arr = NULL;\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio and stdlib libraries", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Allocate variables", "memory": [{ "variable": "n", "type": "int", "value": "?" }, { "variable": "sum", "type": "int", "value": "0" }, { "variable": "arr", "type": "int*", "value": "NULL" }], "output": "" },
                  { "line": 8, "annotation": "scanf reads n=5", "memory": [{ "variable": "n", "type": "int", "value": "5" }], "output": "" },
                  { "line": 9, "annotation": "malloc(5 * 4 = 20 bytes)", "memory": [{ "variable": "arr", "type": "int*", "value": "0xHeapAddr1" }], "output": "" },
                  { "line": 10, "annotation": "arr != NULL, proceed", "memory": [], "output": "" },
                  { "line": 14, "annotation": "Loop starts i=0", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 15, "annotation": "scanf arr[0]=10", "memory": [{ "variable": "arr[0]", "type": "int", "value": "10" }], "output": "" },
                  { "line": 16, "annotation": "sum = sum + 10 = 10", "memory": [{ "variable": "sum", "type": "int", "value": "10" }], "output": "" },
                  { "line": 14, "annotation": "Loop i=1", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 15, "annotation": "scanf arr[1]=20", "memory": [{ "variable": "arr[1]", "type": "int", "value": "20" }], "output": "" },
                  { "line": 16, "annotation": "sum = 10 + 20 = 30", "memory": [{ "variable": "sum", "type": "int", "value": "30" }], "output": "" },
                  { "line": 14, "annotation": "Loop i=2", "memory": [{ "variable": "i", "type": "int", "value": "2" }], "output": "" },
                  { "line": 15, "annotation": "scanf arr[2]=30", "memory": [{ "variable": "arr[2]", "type": "int", "value": "30" }], "output": "" },
                  { "line": 16, "annotation": "sum = 30 + 30 = 60", "memory": [{ "variable": "sum", "type": "int", "value": "60" }], "output": "" },
                  { "line": 14, "annotation": "Loop i=3", "memory": [{ "variable": "i", "type": "int", "value": "3" }], "output": "" },
                  { "line": 15, "annotation": "scanf arr[3]=40", "memory": [{ "variable": "arr[3]", "type": "int", "value": "40" }], "output": "" },
                  { "line": 16, "annotation": "sum = 60 + 40 = 100", "memory": [{ "variable": "sum", "type": "int", "value": "100" }], "output": "" },
                  { "line": 14, "annotation": "Loop i=4", "memory": [{ "variable": "i", "type": "int", "value": "4" }], "output": "" },
                  { "line": 15, "annotation": "scanf arr[4]=50", "memory": [{ "variable": "arr[4]", "type": "int", "value": "50" }], "output": "" },
                  { "line": 16, "annotation": "sum = 100 + 50 = 150", "memory": [{ "variable": "sum", "type": "int", "value": "150" }], "output": "" },
                  { "line": 14, "annotation": "Loop ends", "memory": [], "output": "" },
                  { "line": 18, "annotation": "average = 150.0 / 5 = 30.00", "memory": [{ "variable": "average", "type": "float", "value": "30.00" }], "output": "" },
                  { "line": 19, "annotation": "Print sum and average", "memory": [], "output": "Sum: 150  Average: 30.00\n" },
                  { "line": 20, "annotation": "free(arr) - Memory released", "memory": [{ "variable": "arr", "type": "int*", "value": "0xHeapAddr1 (Freed)" }], "output": "" },
                  { "line": 21, "annotation": "Set arr to NULL to avoid dangling pointer", "memory": [{ "variable": "arr", "type": "int*", "value": "NULL" }], "output": "" },
                  { "line": 22, "annotation": "Program terminates", "memory": [], "output": "Sum: 150  Average: 30.00\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w9-2",
            "title": "Student Average using Structures",
            "desc": "Array of structures dynamically allocated with malloc().",
            "expected": "Average=X.XX",
            "content": {
              "aim": {
                "text": "This experiment combines structures and dynamic memory allocation to manage a collection of student records. Students will define a struct containing a name, a dynamically allocated marks array, and an average field; allocate an array of n such structures using malloc(); for each student, allocate a separate marks array with malloc(), read marks for multiple subjects, compute the average, and store it in the struct field; print all student names and averages; and finally free every inner marks array before freeing the outer students array. The experiment demonstrates nested dynamic allocation, the difference between dot (.) and arrow (->) operators, and the importance of freeing memory in the correct reverse order to avoid losing inner pointers.",
                "bullets": [
                  "Define a struct to hold a student's name and marks array",
                  "Dynamically allocate an array of n student structures using malloc()",
                  "Use a nested loop to accept marks for multiple subjects per student",
                  "Compute and store the average for each student within the struct",
                  "Traverse and print all student records using printf()",
                  "Free all dynamically allocated memory before program exit"
                ]
              },
              "theory": [
                {
                  "title": "Structures in C",
                  "body": ["A struct groups related variables of different types under one name:\n  struct Student {\n      char name[50];\n      int  marks[5];\n      float average;\n  };\nEach field is accessed using the dot operator: s.name, s.marks[0], s.average."]
                },
                {
                  "title": "Array of Structures",
                  "body": ["Declares multiple student records:\n  struct Student students[100];   // static\nDynamically:\n  struct Student *students = (struct Student *) malloc(n * sizeof(struct Student));"]
                },
                {
                  "title": "sizeof(struct Student)",
                  "body": ["Returns the total bytes for one struct instance, including all fields and any padding added by the compiler for alignment. Always use sizeof rather than adding field sizes manually."]
                },
                {
                  "title": "Dot vs Arrow Operator",
                  "body": ["s.name           accesses field name of a struct variable s", "ptr->name        accesses field name through a pointer ptr", "(*ptr).name      is equivalent to ptr->name"]
                },
                {
                  "title": "Average per Student",
                  "body": ["sum = 0;\nfor (j = 0; j < subjects; j++) sum += students[i].marks[j];\nstudents[i].average = (float) sum / subjects;"]
                },
                {
                  "title": "Nested Dynamic Allocation",
                  "body": ["For a variable number of subjects per student, marks can itself be a dynamically allocated int*:\n  students[i].marks = (int *) malloc(subjects * sizeof(int));\nEach inner allocation must also be freed individually before freeing the outer array."]
                },
                {
                  "title": "Memory Freeing Order",
                  "body": ["Free inner allocations before the outer array to avoid losing the inner pointers:\n  for (i = 0; i < n; i++) free(students[i].marks);\n  free(students);"]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace struct allocation, field assignment, and average computation for two students.",
                "Observe how students[i].marks[j] is filled and how students[i].average is computed.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter number of students and subjects, then for each student enter name followed by marks — e.g.:\n2 3\nAlice 80 90 85\nBob 70 60 75",
                "Click Run Code. Verify average for Alice: 85.00 and Bob: 68.33",
                "Try a single student and a student with all-zero marks. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Student {\n    char name[50];\n    int *marks;\n    float average;\n};\n\nint main() {\n    int n, subjects, i, j, sum;\n    struct Student *students;\n    scanf(\"%d %d\", &n, &subjects);\n    students = (struct Student *) malloc(n * sizeof(struct Student));\n    for (i = 0; i < n; i++) {\n        scanf(\"%s\", students[i].name);\n        students[i].marks = (int *) malloc(subjects * sizeof(int));\n        sum = 0;\n        for (j = 0; j < subjects; j++) {\n            scanf(\"%d\", &students[i].marks[j]);\n            sum += students[i].marks[j];\n        }\n        students[i].average = (float) sum / subjects;\n    }\n    for (i = 0; i < n; i++) {\n        printf(\"%s - Average: %.2f\\n\", students[i].name, students[i].average);\n    }\n    for (i = 0; i < n; i++) {\n        free(students[i].marks);\n    }\n    free(students);\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load libraries", "memory": [], "output": "" },
                  { "line": 12, "annotation": "Allocate variables", "memory": [{ "variable": "n", "type": "int", "value": "?" }, { "variable": "subjects", "type": "int", "value": "?" }], "output": "" },
                  { "line": 13, "annotation": "scanf reads n=2, subjects=3", "memory": [{ "variable": "n", "type": "int", "value": "2" }, { "variable": "subjects", "type": "int", "value": "3" }], "output": "" },
                  { "line": 14, "annotation": "malloc students array", "memory": [{ "variable": "students", "type": "struct Student*", "value": "size 2" }], "output": "" },
                  { "line": 15, "annotation": "Student 1 loop starts (i=0)", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 16, "annotation": "scanf name 'Alice'", "memory": [{ "variable": "students[0].name", "type": "char[]", "value": "\"Alice\"" }], "output": "" },
                  { "line": 17, "annotation": "malloc marks array for Alice", "memory": [{ "variable": "students[0].marks", "type": "int*", "value": "size 3" }], "output": "" },
                  { "line": 18, "annotation": "sum = 0", "memory": [{ "variable": "sum", "type": "int", "value": "0" }], "output": "" },
                  { "line": 19, "annotation": "Marks loop for Alice starts", "memory": [{ "variable": "j", "type": "int", "value": "0" }], "output": "" },
                  { "line": 20, "annotation": "scanf mark 80", "memory": [{ "variable": "students[0].marks[0]", "type": "int", "value": "80" }], "output": "" },
                  { "line": 21, "annotation": "sum += 80", "memory": [{ "variable": "sum", "type": "int", "value": "80" }], "output": "" },
                  { "line": 19, "annotation": "j=1", "memory": [{ "variable": "j", "type": "int", "value": "1" }], "output": "" },
                  { "line": 20, "annotation": "scanf mark 90", "memory": [{ "variable": "students[0].marks[1]", "type": "int", "value": "90" }], "output": "" },
                  { "line": 21, "annotation": "sum += 90 (170)", "memory": [{ "variable": "sum", "type": "int", "value": "170" }], "output": "" },
                  { "line": 19, "annotation": "j=2", "memory": [{ "variable": "j", "type": "int", "value": "2" }], "output": "" },
                  { "line": 20, "annotation": "scanf mark 85", "memory": [{ "variable": "students[0].marks[2]", "type": "int", "value": "85" }], "output": "" },
                  { "line": 21, "annotation": "sum += 85 (255)", "memory": [{ "variable": "sum", "type": "int", "value": "255" }], "output": "" },
                  { "line": 23, "annotation": "average = 255 / 3 = 85.00", "memory": [{ "variable": "students[0].average", "type": "float", "value": "85.00" }], "output": "" },
                  { "line": 15, "annotation": "Student 2 loop starts (i=1)", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 16, "annotation": "scanf name 'Bob'", "memory": [{ "variable": "students[1].name", "type": "char[]", "value": "\"Bob\"" }], "output": "" },
                  { "line": 17, "annotation": "malloc marks array for Bob", "memory": [{ "variable": "students[1].marks", "type": "int*", "value": "size 3" }], "output": "" },
                  { "line": 18, "annotation": "sum = 0", "memory": [{ "variable": "sum", "type": "int", "value": "0" }], "output": "" },
                  { "line": 19, "annotation": "Marks loop for Bob starts", "memory": [{ "variable": "j", "type": "int", "value": "0" }], "output": "" },
                  { "line": 20, "annotation": "scanf mark 70", "memory": [{ "variable": "students[1].marks[0]", "type": "int", "value": "70" }], "output": "" },
                  { "line": 21, "annotation": "sum += 70", "memory": [{ "variable": "sum", "type": "int", "value": "70" }], "output": "" },
                  { "line": 19, "annotation": "j=1", "memory": [{ "variable": "j", "type": "int", "value": "1" }], "output": "" },
                  { "line": 20, "annotation": "scanf mark 60", "memory": [{ "variable": "students[1].marks[1]", "type": "int", "value": "60" }], "output": "" },
                  { "line": 21, "annotation": "sum += 60 (130)", "memory": [{ "variable": "sum", "type": "int", "value": "130" }], "output": "" },
                  { "line": 19, "annotation": "j=2", "memory": [{ "variable": "j", "type": "int", "value": "2" }], "output": "" },
                  { "line": 20, "annotation": "scanf mark 75", "memory": [{ "variable": "students[1].marks[2]", "type": "int", "value": "75" }], "output": "" },
                  { "line": 21, "annotation": "sum += 75 (205)", "memory": [{ "variable": "sum", "type": "int", "value": "205" }], "output": "" },
                  { "line": 23, "annotation": "average = 205 / 3 = 68.33", "memory": [{ "variable": "students[1].average", "type": "float", "value": "68.33" }], "output": "" },
                  { "line": 25, "annotation": "Print Loop i=0", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 26, "annotation": "Print Alice", "memory": [], "output": "Alice - Average: 85.00\n" },
                  { "line": 25, "annotation": "Print Loop i=1", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 26, "annotation": "Print Bob", "memory": [], "output": "Alice - Average: 85.00\nBob - Average: 68.33\n" },
                  { "line": 28, "annotation": "Free Loop starts", "memory": [], "output": "" },
                  { "line": 29, "annotation": "Free Alice's marks", "memory": [], "output": "" },
                  { "line": 29, "annotation": "Free Bob's marks", "memory": [], "output": "" },
                  { "line": 31, "annotation": "Free students array", "memory": [], "output": "" },
                  { "line": 32, "annotation": "Program terminates", "memory": [], "output": "Alice - Average: 85.00\nBob - Average: 68.33\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w9-3",
            "title": "Failed Students using calloc",
            "desc": "Filter and print failed students from an array allocated with calloc().",
            "expected": "List of failed students",
            "content": {
              "aim": {
                "text": "This experiment introduces calloc() as an alternative to malloc() that zero-initialises every allocated byte. Students will allocate n integer slots for student marks using calloc(), read marks into the array, iterate through the values to identify those below the passing threshold (40), print each failing student's roll number and mark, count the total failures, and release memory. The experiment contrasts calloc (zero-initialised, two-argument) with malloc (uninitialised, one-argument), explains when zero-initialisation is beneficial, and introduces realloc() conceptually as a tool for resizing previously allocated blocks when data size is not known upfront.",
                "bullets": [
                  "Include stdlib.h for calloc() and free()",
                  "Allocate a zero-initialised integer array using calloc()",
                  "Accept n marks and store them in the allocated array",
                  "Traverse the array to identify elements below the pass mark (e.g. 40)",
                  "Count and display the number of failed students with their roll numbers",
                  "Free the allocated memory and set the pointer to NULL"
                ]
              },
              "theory": [
                {
                  "title": "calloc()",
                  "body": [ "![Calloc memory Allcocation](calloc.webp)","Contiguous ALLOCation. Syntax:\n  void *calloc(size_t num, size_t size);\nAllocates memory for num elements each of size bytes and zero-initialises every byte. Returns a void* pointer, or NULL on failure.\n  int *marks = (int *) calloc(n, sizeof(int));"]
                },
                {
                  "title": "malloc() vs calloc()",
                  "body": ["malloc(n * sizeof(int))   : allocates n*sizeof(int) bytes; content uninitialised\ncalloc(n, sizeof(int))    : allocates n*sizeof(int) bytes; all bytes set to 0", "calloc is preferred when zero-initialisation is needed (e.g. counters, flags, marks arrays where un-entered values should default to 0)."]
                },
                {
                  "title": "realloc()",
                  "body": ["REALLOCation. Resizes a previously allocated block:\n  ptr = realloc(ptr, new_size);\nIf new_size is larger, extra bytes are uninitialised. If the block cannot be expanded in place, realloc allocates a new block, copies the old data, frees the old block, and returns the new address. Returns NULL on failure — always assign to a temporary pointer to avoid losing the original:\n  int *temp = realloc(marks, new_n * sizeof(int));\n  if (temp != NULL) marks = temp;"]
                },
                {
                  "title": "Identifying Failed Students",
                  "body": ["failCount = 0;\nfor (i = 0; i < n; i++) {\n    if (marks[i] < PASS_MARK) {\n        printf(\"Roll %d: %d\\n\", i+1, marks[i]);\n        failCount++;\n    }\n}"]
                },
                {
                  "title": "Zero Initialisation Advantage",
                  "body": ["Because calloc zero-initialises, any unread entry defaults to 0 (which would be below pass mark). This makes calloc particularly appropriate when partial data entry is a concern."]
                },
                {
                  "title": "free() and NULL Assignment",
                  "body": ["free(marks);\nmarks = NULL;"]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace calloc allocation, marks entry, and the fail check loop.",
                "Observe that unmodified calloc slots hold 0 and how marks below 40 are flagged.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n marks — e.g. 5  55 32 48 27 61",
                "Click Run Code. Verify output:\nFailed Students:\nRoll 2: 32\nRoll 4: 27\nTotal failed: 2",
                "Try all passing marks, all failing marks, and n = 1. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, i, failCount = 0;\n    int *marks;\n    scanf(\"%d\", &n);\n    marks = (int *) calloc(n, sizeof(int));\n    if (marks == NULL) {\n        printf(\"Allocation failed\\n\");\n        return 1;\n    }\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &marks[i]);\n    }\n    printf(\"Failed Students:\\n\");\n    for (i = 0; i < n; i++) {\n        if (marks[i] < 40) {\n            printf(\"Roll %d: %d\\n\", i + 1, marks[i]);\n            failCount++;\n        }\n    }\n    printf(\"Total failed: %d\\n\", failCount);\n    free(marks);\n    marks = NULL;\n    return 0;\n}",
                "steps": [
                  { "line": 1, "annotation": "Load stdio and stdlib libraries", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Allocate variables", "memory": [{ "variable": "n", "type": "int", "value": "?" }, { "variable": "failCount", "type": "int", "value": "0" }], "output": "" },
                  { "line": 7, "annotation": "scanf reads n=5", "memory": [{ "variable": "n", "type": "int", "value": "5" }], "output": "" },
                  { "line": 8, "annotation": "calloc(5, 4) zeroes memory", "memory": [{ "variable": "marks", "type": "int*", "value": "{0, 0, 0, 0, 0}" }], "output": "" },
                  { "line": 9, "annotation": "marks != NULL, proceed", "memory": [], "output": "" },
                  { "line": 13, "annotation": "Read loop starts", "memory": [], "output": "" },
                  { "line": 14, "annotation": "scanf marks[0]=55", "memory": [{ "variable": "marks", "type": "int*", "value": "{55, 0, 0, 0, 0}" }], "output": "" },
                  { "line": 14, "annotation": "scanf marks[1]=32", "memory": [{ "variable": "marks", "type": "int*", "value": "{55, 32, 0, 0, 0}" }], "output": "" },
                  { "line": 14, "annotation": "scanf marks[2]=48", "memory": [{ "variable": "marks", "type": "int*", "value": "{55, 32, 48, 0, 0}" }], "output": "" },
                  { "line": 14, "annotation": "scanf marks[3]=27", "memory": [{ "variable": "marks", "type": "int*", "value": "{55, 32, 48, 27, 0}" }], "output": "" },
                  { "line": 14, "annotation": "scanf marks[4]=61", "memory": [{ "variable": "marks", "type": "int*", "value": "{55, 32, 48, 27, 61}" }], "output": "" },
                  { "line": 16, "annotation": "Print header", "memory": [], "output": "Failed Students:\n" },
                  { "line": 17, "annotation": "Check loop starts", "memory": [], "output": "" },
                  { "line": 18, "annotation": "marks[0]=55 >= 40 (Pass)", "memory": [], "output": "" },
                  { "line": 18, "annotation": "marks[1]=32 < 40 (Fail)", "memory": [], "output": "" },
                  { "line": 19, "annotation": "Print Roll 2", "memory": [], "output": "Failed Students:\nRoll 2: 32\n" },
                  { "line": 20, "annotation": "failCount++", "memory": [{ "variable": "failCount", "type": "int", "value": "1" }], "output": "" },
                  { "line": 18, "annotation": "marks[2]=48 >= 40 (Pass)", "memory": [], "output": "" },
                  { "line": 18, "annotation": "marks[3]=27 < 40 (Fail)", "memory": [], "output": "" },
                  { "line": 19, "annotation": "Print Roll 4", "memory": [], "output": "Failed Students:\nRoll 2: 32\nRoll 4: 27\n" },
                  { "line": 20, "annotation": "failCount++", "memory": [{ "variable": "failCount", "type": "int", "value": "2" }], "output": "" },
                  { "line": 18, "annotation": "marks[4]=61 >= 40 (Pass)", "memory": [], "output": "" },
                  { "line": 23, "annotation": "Print total failed", "memory": [], "output": "Failed Students:\nRoll 2: 32\nRoll 4: 27\nTotal failed: 2\n" },
                  { "line": 24, "annotation": "free(marks)", "memory": [{ "variable": "marks", "type": "int*", "value": "0xHeapAddr (Freed)" }], "output": "" },
                  { "line": 25, "annotation": "marks = NULL", "memory": [{ "variable": "marks", "type": "int*", "value": "NULL" }], "output": "" },
                  { "line": 26, "annotation": "Program terminates", "memory": [], "output": "Failed Students:\nRoll 2: 32\nRoll 4: 27\nTotal failed: 2\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 10",
        "objective": "Structures, Unions, bit fields, singly linked list",
        "tutorial": "Tutorial 10: Structures and Unions",
        "labTitle": "Lab 10: Advanced Data Structures",
        "experiments": [
          {
            "id": "c-w10-1",
            "title": "Singly Linked List",
            "desc": "Create and display a singly linked list.",
            "expected": "X->X->NULL",
            "content": {
              "aim": {
                "text": "This experiment introduces the singly linked list — a fundamental dynamic data structure where elements (nodes) are stored non-contiguously in heap memory and connected through pointers. Each node contains a data field and a next pointer to the following node, with the last node's next set to NULL. Students will define a self-referential struct for the node, allocate each node dynamically using malloc(), link nodes into a chain by updating a tail pointer, and traverse the complete list from head to NULL printing each element. The experiment demonstrates why linked lists offer flexible runtime resizing that fixed arrays cannot, and introduces the head and tail pointer management patterns used in all subsequent linked list operations.",
                "bullets": [
                  "Understand what a self-referential structure is in C",
                  "Learn how nodes are created and linked using pointers",
                  "Implement insertion at the end of a linked list",
                  "Traverse and display the linked list from head to NULL",
                  "Understand how dynamic memory differs from static arrays"
                ]
              },
              "theory": [
                {
                  "title": "What is a Linked List?",
                  "body": ["A linked list is a linear data structure where elements called nodes are stored in memory non-contiguously. Unlike arrays, linked list elements are not stored in adjacent memory locations. Each node holds data and a pointer to the next node."]
                },
                {
                  "title": "Self-Referential Structure",
                  "body": ["A structure that contains a pointer to itself is called a self-referential structure. This is the foundation of linked lists in C.\nStructure of a Node:", "data field — stores the actual integer value\nnext field — stores the address of the next node (pointer to same struct type)"]
                },
                {
                  "title": "Head Pointer",
                  "body": ["The head pointer always points to the first node of the list. If head is NULL the list is empty."]
                },
                {
                  "title": "Tail Pointer",
                  "body": ["The tail pointer tracks the last node. The last node always has its next pointer set to NULL indicating end of list."]
                },
                {
                  "title": "Node Creation using malloc()",
                  "body": ["malloc() allocates memory dynamically at runtime on the heap. sizeof(struct Node) gives the exact bytes needed for one node. The returned void pointer is cast to struct Node pointer."]
                },
                {
                  "title": "Insertion at End",
                  "body": ["For the first node — head and tail both point to it. For every subsequent node — tail's next points to new node, then tail moves to new node."]
                },
                {
                  "title": "Traversal",
                  "body": ["Start from head, print data, move to next node using cur = cur->next, repeat until cur becomes NULL."]
                },
                {
                  "title": "🚂 A linked list is like a treasure hunt chain!",
                  "body": [
                    "Imagine a treasure hunt where the first clue tells you where to find the second clue, the second clue tells you where to find the third, and so on. Each clue (node) has two things: the actual treasure hint (data) and the location of the next clue (pointer). The last clue says \"THE END\" (NULL). That's exactly a linked list!",
                    "Unlike an array where all items sit in a neat row, linked list nodes can be anywhere in memory — they just hold each other's hand (via pointers) to stay connected.",
                    "![Singly linked list nodes diagram](singly-linkedlist.webp)"
                  ]
                },
                {
                  "title": "Visual Structure for input 3 nodes: 10 20 30",
                  "body": ["10 -> 20 -> 30 -> NULL", "Each arrow represents the next pointer storing the address of the following node."]
                },
                {
                  "title": "Why Linked List over Array?",
                  "body": ["Arrays have fixed size decided at compile time. Linked lists grow and shrink dynamically at runtime. Insertion and deletion are efficient in linked lists without shifting elements."]
                },
                {
                  "title": "📏 The key difference — flexibility!",
                  "body": [
                    "Arrays are like a fixed-size parking lot — built for exactly 100 cars, even if only 3 show up today. Linked lists are like a valet service — you add a parking spot whenever a new car arrives, and remove one when a car leaves. No wasted space, no size limits declared upfront. The trade-off: finding a specific car takes longer (you must walk the chain), while arrays let you jump directly to any spot."
                  ]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim carefully and understand what singly linked list means",
                "Go to Theory and study self-referential structures and how malloc() creates nodes",
                "Observe the Visual Structure diagram showing how 10 -> 20 -> 30 -> NULL looks in memory",
                "Go to Simulation tab and click Start",
                "Press Next step by step and observe how each node is created in memory",
                "Watch the head and tail pointers update as new nodes are added",
                "Observe the traversal phase where cur moves from head to NULL printing each value",
                "Note how the output panel fills with 10 -> 20 -> 30 -> NULL",
                "Go to Code Test tab",
                "The starter code is pre-loaded in the Monaco editor",
                "In the Stdin input box type the number of nodes first then the values",
                "Example input: 3 followed by 10 20 30",
                "Click Run Code",
                "Verify output matches: 10->20->30->NULL",
                "Try with different inputs — 5 nodes, different values",
                "Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint main() {\n    int n, i, val;\n    struct Node *head = NULL, *tail = NULL, *newNode, *cur;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &val);\n        newNode = (struct Node*)malloc(sizeof(struct Node));\n        newNode->data = val;\n        newNode->next = NULL;\n        if (head == NULL) {\n            head = newNode;\n            tail = newNode;\n        } else {\n            tail->next = newNode;\n            tail = newNode;\n        }\n    }\n    cur = head;\n    while (cur != NULL) {\n        printf(\"%d->\", cur->data);\n        cur = cur->next;\n    }\n    printf(\"NULL\\n\");\n    return 0;\n}",
                "steps": [
                  { "line": 8, "annotation": "Declare head and tail", "memory": [{ "variable": "head", "type": "Node*", "value": "NULL" }, { "variable": "tail", "type": "Node*", "value": "NULL" }], "output": "" },
                  { "line": 9, "annotation": "Read n=3", "memory": [{ "variable": "n", "type": "int", "value": "3" }], "output": "" },
                  { "line": 10, "annotation": "Loop i=0", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 11, "annotation": "scanf val=10", "memory": [{ "variable": "val", "type": "int", "value": "10" }], "output": "" },
                  { "line": 12, "annotation": "malloc Node 1 (addr 1001)", "memory": [{ "variable": "newNode", "type": "Node*", "value": "1001" }], "output": "" },
                  { "line": 13, "annotation": "newNode->data = 10", "memory": [{ "variable": "newNode->data", "type": "int", "value": "10" }], "output": "" },
                  { "line": 14, "annotation": "newNode->next = NULL", "memory": [{ "variable": "newNode->next", "type": "Node*", "value": "NULL" }], "output": "" },
                  { "line": 15, "annotation": "head is NULL (first node)", "memory": [], "output": "" },
                  { "line": 16, "annotation": "head = 1001", "memory": [{ "variable": "head", "type": "Node*", "value": "1001" }], "output": "" },
                  { "line": 17, "annotation": "tail = 1001", "memory": [{ "variable": "tail", "type": "Node*", "value": "1001" }], "output": "" },
                  { "line": 10, "annotation": "Loop i=1", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 11, "annotation": "scanf val=20", "memory": [{ "variable": "val", "type": "int", "value": "20" }], "output": "" },
                  { "line": 12, "annotation": "malloc Node 2 (addr 2001)", "memory": [{ "variable": "newNode", "type": "Node*", "value": "2001" }], "output": "" },
                  { "line": 13, "annotation": "newNode->data = 20", "memory": [{ "variable": "newNode->data", "type": "int", "value": "20" }], "output": "" },
                  { "line": 14, "annotation": "newNode->next = NULL", "memory": [{ "variable": "newNode->next", "type": "Node*", "value": "NULL" }], "output": "" },
                  { "line": 19, "annotation": "tail->next = 2001", "memory": [{ "variable": "tail->next", "type": "Node*", "value": "2001" }], "output": "" },
                  { "line": 20, "annotation": "tail = 2001", "memory": [{ "variable": "tail", "type": "Node*", "value": "2001" }], "output": "" },
                  { "line": 10, "annotation": "Loop i=2", "memory": [{ "variable": "i", "type": "int", "value": "2" }], "output": "" },
                  { "line": 11, "annotation": "scanf val=30", "memory": [{ "variable": "val", "type": "int", "value": "30" }], "output": "" },
                  { "line": 12, "annotation": "malloc Node 3 (addr 3001)", "memory": [{ "variable": "newNode", "type": "Node*", "value": "3001" }], "output": "" },
                  { "line": 13, "annotation": "newNode->data = 30", "memory": [{ "variable": "newNode->data", "type": "int", "value": "30" }], "output": "" },
                  { "line": 14, "annotation": "newNode->next = NULL", "memory": [{ "variable": "newNode->next", "type": "Node*", "value": "NULL" }], "output": "" },
                  { "line": 19, "annotation": "tail->next = 3001", "memory": [{ "variable": "tail->next", "type": "Node*", "value": "3001" }], "output": "" },
                  { "line": 20, "annotation": "tail = 3001", "memory": [{ "variable": "tail", "type": "Node*", "value": "3001" }], "output": "" },
                  { "line": 23, "annotation": "Traversal starts, cur = head", "memory": [{ "variable": "cur", "type": "Node*", "value": "1001" }], "output": "" },
                  { "line": 25, "annotation": "print 10->", "memory": [], "output": "10->" },
                  { "line": 26, "annotation": "cur = cur->next (2001)", "memory": [{ "variable": "cur", "type": "Node*", "value": "2001" }], "output": "10->" },
                  { "line": 25, "annotation": "print 20->", "memory": [], "output": "10->20->" },
                  { "line": 26, "annotation": "cur = cur->next (3001)", "memory": [{ "variable": "cur", "type": "Node*", "value": "3001" }], "output": "10->20->" },
                  { "line": 25, "annotation": "print 30->", "memory": [], "output": "10->20->30->" },
                  { "line": 26, "annotation": "cur = cur->next (NULL)", "memory": [{ "variable": "cur", "type": "Node*", "value": "NULL" }], "output": "10->20->30->" },
                  { "line": 28, "annotation": "print NULL", "memory": [], "output": "10->20->30->NULL\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "Reema Thareja, Data Structures Using C, 2nd Edition, Oxford University Press",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 10",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w10-2",
            "title": "Structure vs Union Demo",
            "desc": "Compare sizes of struct and union.",
            "expected": "Different sizes shown",
            "content": {
              "aim": {
                "text": "This experiment contrasts the two composite data types in C — struct and union — by defining both with identical fields (int, float, char) and using the sizeof() operator to measure and compare the memory each consumes. Students will observe that a struct allocates separate memory for every member (total size equals the sum of all members plus compiler padding for alignment), while a union allocates only enough memory for its largest member (all fields share the same physical bytes). The experiment also demonstrates that writing to one union member corrupts the value stored by another, explaining when unions are appropriate (memory-constrained embedded systems, variant record types) and when structs are required (holding multiple independent values simultaneously).",
                "bullets": [
                  "Define a structure and a union with identical fields",
                  "Use sizeof() to measure memory consumed by each",
                  "Understand why struct size is sum of all fields but union size is largest field only",
                  "Observe how writing to one union member affects other members",
                  "Understand real-world use cases for each"
                ]
              },
              "theory": [
                {
                  "title": "🏠 Structure = a house with separate rooms. Union = one room that changes purpose!",
                  "body": [
                    "A struct is like a house with a bedroom, kitchen, and living room — all existing at the same time, each with its own space. You can use all rooms simultaneously.",
                    "A union is like a studio apartment with ONE room. Sometimes it's a bedroom, sometimes it's a gym, sometimes it's an office — but it can only be ONE thing at a time. The room is always the same size (the biggest version needed), but only the last use matters.",
                    "![Struct vs union memory layout diagram](struct-union.webp)"
                  ]
                },
                {
                  "title": "What is a Structure?",
                  "body": ["A structure is a user-defined data type that groups multiple variables of different data types under one name. Each member gets its own separate memory location. Total size of a struct equals the sum of sizes of all its members (plus possible padding bytes added by compiler for alignment).", "Example with int i (4 bytes) + float f (4 bytes) + char c (1 byte) = minimum 9 bytes, compiler may pad to 12 bytes for alignment."]
                },
                {
                  "title": "What is a Union?",
                  "body": ["A union is also a user-defined data type that groups multiple variables under one name. But all members share the same memory location. The size of a union equals the size of its largest member only. Only one member can hold a valid value at any given time.", "Example with int i (4 bytes) + float f (4 bytes) + char c (1 byte) = 4 bytes total (largest member size)."]
                },
                {
                  "title": "Key Difference Table",
                  "body": [
                    "Feature | Structure | Union",
                    "Memory | Separate for each member | Shared single location",
                    "Size | Sum of all members | Size of largest member",
                    "Access | All members valid simultaneously | Only last written member valid",
                    "Use case | Store multiple data together | Save memory, store one of many types"
                  ]
                },
                {
                  "title": "Padding in Structures",
                  "body": ["Compilers add padding bytes between members to align data on word boundaries for faster CPU access. This is why struct size may be larger than the raw sum of members."]
                },
                {
                  "title": "When to use Union?",
                  "body": ["Unions are used in embedded systems, network packet parsing, and anywhere memory is extremely limited and only one field is needed at a time."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read Theory carefully focusing on the difference table between struct and union",
                "Go to Simulation tab and observe how memory is allocated differently for each",
                "Watch how struct gives separate boxes for each member and union gives one shared box",
                "Observe the sizeof() output for both in the simulation output panel",
                "Go to Code Test tab — starter code is pre-loaded",
                "No stdin input needed for this program",
                "Click Run Code",
                "Note the two lines of output showing sizes of struct and union",
                "Observe that struct size is larger than union size even with same fields",
                "Try adding more members to both in the editor and re-run to see size change",
                "Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nstruct S {\n    int i;\n    float f;\n    char c;\n};\n\nunion U {\n    int i;\n    float f;\n    char c;\n};\n\nint main() {\n    printf(\"Size of Struct=%lu\\n\", sizeof(struct S));\n    printf(\"Size of Union=%lu\\n\", sizeof(union U));\n    return 0;\n}",
                "steps": [
                  { "line": 3, "annotation": "struct S defined (int, float, char)", "memory": [], "output": "" },
                  { "line": 9, "annotation": "union U defined (int, float, char)", "memory": [], "output": "" },
                  { "line": 16, "annotation": "sizeof(struct S) evaluated (12 bytes)", "memory": [], "output": "Size of Struct=12\n" },
                  { "line": 17, "annotation": "sizeof(union U) evaluated (4 bytes)", "memory": [], "output": "Size of Struct=12\nSize of Union=4\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 10",
                "GCC Documentation on Structures and Unions: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 11",
        "objective": "Functions, call by value, scope, Euler's method",
        "tutorial": "Tutorial 11: Functions",
        "labTitle": "Lab 11: Modular Programming",
        "experiments": [
          {
            "id": "c-w11-1",
            "title": "NCR Value",
            "desc": "Calculate nCr using functions.",
            "expected": "NCR=X",
            "content": {
              "aim": {
                "text": "This experiment introduces modular programming in C by decomposing the computation of the binomial coefficient nCr into a reusable factorial() function called three times from main(). Students will write the function prototype, implement the iterative factorial body using a for loop with a long long accumulator, validate that r ≤ n and both are non-negative before computing, and display the result. The experiment establishes three core function concepts: call by value (local parameters are copies and changes inside the function do not affect the caller), function scope (local variables in factorial() are invisible to main() and vice versa), and code reuse (a single function definition replaces three repeated loops).",
                "bullets": [
                  "Write a long long factorial(int n) function and call it from main()",
                  "Understand call by value — changes to parameters inside a function do not affect the caller's variables",
                  "Understand function scope — local variables declared inside a function are not visible outside it",
                  "Apply the formula: nCr = n! / (r! * (n-r)!)",
                  "Validate inputs (r <= n, both non-negative) before computing",
                  "Use printf() with %lld to display the result"
                ]
              },
              "theory": [
                {
                  "title": "Modular Programming",
                  "body": ["Breaking a program into independent, reusable functions. Each function has a single responsibility. main() orchestrates calls; helper functions perform specific computations. Benefits include readability, reusability, and easier debugging."]
                },
                {
                  "title": "Function Definition",
                  "body": ["Syntax:\n  return_type function_name(parameter_list) {\n      // body\n      return value;\n  }\nExample:\n  long long factorial(int n) {\n      long long fact = 1;\n      for (int i = 1; i <= n; i++) fact *= i;\n      return fact;\n  }"]
                },
                {
                  "title": "Function Declaration (Prototype)",
                  "body": ["Placed before main() so the compiler knows the function's signature before it is called:\n  long long factorial(int n);","![Function Prototype](Function-Prototype.webp)"]
                },
                {
                  "title": "Call by Value",
                  "body": ["C passes arguments by copying their values into the function's local parameters. Modifying the parameter inside the function has no effect on the original variable in the caller:\n  void modify(int x) { x = 100; }   // caller's variable unchanged\n  int a = 5; modify(a);             // a is still 5 after the call"]
                },
                {
                  "title": "Scope",
                  "body": ["A variable declared inside a function is local to that function. It is created when the function is called and destroyed when it returns. Variables in main() are not accessible inside factorial() and vice versa."]
                },
                {
                  "title": "nCr Formula",
                  "body": ["nCr = n! / (r! × (n-r)!)\nFor n = 5, r = 2:\n  5C2 = 120 / (2 × 6) = 120 / 12 = 10"]
                },
                {
                  "title": "Input Validation",
                  "body": ["if (r > n || n < 0 || r < 0) → invalid input\nnC0 = nCn = 1 (edge cases, naturally handled by factorial formula)"]
                },
                {
                  "title": "Overflow Consideration",
                  "body": ["Factorials grow rapidly. Use long long and limit n to reasonable values (n ≤ 20 for long long). For larger n, use the multiplicative formula to avoid intermediate overflow."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the three factorial calls for n, r, and (n-r).",
                "Observe how call by value preserves the caller's n and r across all three calls.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n and r — e.g. 5 2",
                "Click Run Code. Verify output: 5C2 = 10",
                "Try edge cases: n = r (answer = 1), r = 0 (answer = 1), and r > n (invalid). Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nlong long factorial(int n) {\n    long long fact = 1;\n    int i;\n    for (i = 1; i <= n; i++) {\n        fact *= i;\n    }\n    return fact;\n}\n\nint main() {\n    int n, r;\n    long long nCr;\n    scanf(\"%d %d\", &n, &r);\n    if (r > n || n < 0 || r < 0) {\n        printf(\"Invalid input\\n\");\n        return 1;\n    }\n    nCr = factorial(n) / (factorial(r) * factorial(n - r));\n    printf(\"%dC%d = %lld\\n\", n, r, nCr);\n    return 0;\n}",
                "steps": [
                  { "line": 12, "annotation": "Declare variables", "memory": [{ "variable": "n", "type": "int", "value": "?" }, { "variable": "r", "type": "int", "value": "?" }, { "variable": "nCr", "type": "long long", "value": "?" }], "output": "" },
                  { "line": 14, "annotation": "Read n=5, r=2", "memory": [{ "variable": "n", "type": "int", "value": "5" }, { "variable": "r", "type": "int", "value": "2" }], "output": "" },
                  { "line": 15, "annotation": "Check input validity", "memory": [], "output": "" },
                  { "line": 19, "annotation": "Call factorial(n) where n=5", "memory": [], "output": "" },
                  { "line": 3, "annotation": "factorial(5) starts", "memory": [{ "variable": "fact", "type": "long long", "value": "1" }], "output": "" },
                  { "line": 5, "annotation": "Loop i=1 to 5", "memory": [], "output": "" },
                  { "line": 6, "annotation": "fact = 120", "memory": [{ "variable": "fact", "type": "long long", "value": "120" }], "output": "" },
                  { "line": 8, "annotation": "Return 120", "memory": [], "output": "" },
                  { "line": 19, "annotation": "Call factorial(r) where r=2", "memory": [], "output": "" },
                  { "line": 3, "annotation": "factorial(2) starts", "memory": [{ "variable": "fact", "type": "long long", "value": "1" }], "output": "" },
                  { "line": 5, "annotation": "Loop i=1 to 2", "memory": [], "output": "" },
                  { "line": 6, "annotation": "fact = 2", "memory": [{ "variable": "fact", "type": "long long", "value": "2" }], "output": "" },
                  { "line": 8, "annotation": "Return 2", "memory": [], "output": "" },
                  { "line": 19, "annotation": "Call factorial(n-r) where n-r=3", "memory": [], "output": "" },
                  { "line": 3, "annotation": "factorial(3) starts", "memory": [{ "variable": "fact", "type": "long long", "value": "1" }], "output": "" },
                  { "line": 5, "annotation": "Loop i=1 to 3", "memory": [], "output": "" },
                  { "line": 6, "annotation": "fact = 6", "memory": [{ "variable": "fact", "type": "long long", "value": "6" }], "output": "" },
                  { "line": 8, "annotation": "Return 6", "memory": [], "output": "" },
                  { "line": 19, "annotation": "Calculate nCr = 120 / (2 * 6) = 10", "memory": [{ "variable": "nCr", "type": "long long", "value": "10" }], "output": "" },
                  { "line": 20, "annotation": "Print result", "memory": [], "output": "5C2 = 10\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w11-2",
            "title": "String Length without strlen",
            "desc": "Calculate the length of a string using a custom function.",
            "expected": "Length=X",
            "content": {
              "aim": {
                "text": "This experiment implements a custom string-length function that replicates the behaviour of the standard strlen() without calling it, deepening students' understanding of how strings are stored and traversed in C. The function advances a counter while the current character at str[count] is not the null terminator '\\0', then returns the count. Students will call this function from main(), compare its output with the library strlen() result for verification, and experiment with edge cases (empty string, single character). The experiment reinforces function decomposition, demonstrates an alternative pointer-arithmetic approach, and consolidates the null-terminator model of C strings.",
                "bullets": [
                  "Write an int stringLength(char *str) function that traverses the string manually",
                  "Understand how the null terminator '\\0' marks the end of a string",
                  "Demonstrate call by value for the pointer — the address is copied but the original pointer in the caller is unaffected",
                  "Understand the scope of the loop counter inside the function",
                  "Compare the manual result with strlen() for verification",
                  "Use printf() with %d to display the computed length"
                ]
              },
              "theory": [
                {
                  "title": "String Length",
                  "body": ["The length of a C string is the number of characters before the null terminator '\\0'. strlen(\"Hello\") = 5. The null terminator itself is not counted."]
                },
                {
                  "title": "Manual Length Function",
                  "body": ["Traverse using a counter until '\\0' is reached:\n  int stringLength(char *str) {\n      int count = 0;\n      while (str[count] != '\\0')\n          count++;\n      return count;\n  }\nAlternatively using pointer arithmetic:\n  int stringLength(char *str) {\n      char *p = str;\n      while (*p != '\\0') p++;\n      return (int)(p - str);\n  }\nBoth approaches are equivalent."]
                },
                {
                  "title": "Call by Value for Pointers",
                  "body": ["When a char* pointer is passed to a function, the address value is copied into the parameter. The function can read and traverse the string through this copy, but reassigning the parameter (str = something_else) does not affect the caller's pointer. Note: the string contents themselves can be modified through the pointer (this is call by value of the address, not call by value of the data)."]
                },
                {
                  "title": "Pointer Arithmetic",
                  "body": ["p - str gives the number of elements between the two pointers. For a char array, this equals the number of characters traversed."]
                },
                {
                  "title": "Null Terminator Detection",
                  "body": ["![String Length Visualization](string-length.webp)","str[i] != '\\0' and *p != '\\0' are equivalent checks. '\\0' has integer value 0, so while (str[i]) also works as a compact loop condition."]
                },
                {
                  "title": "Scope of count",
                  "body": ["The variable count is local to stringLength(). It exists only during the function call and is destroyed on return. The caller receives the return value, not direct access to count."]
                },
                {
                  "title": "Edge Cases",
                  "body": ["Empty string \"\"   : length = 0 (loop body never executes)\nSingle char \"a\"   : length = 1\nString with spaces: spaces are counted as regular characters"]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the while loop for str = \"Hello\".",
                "Observe how count increments from 0 to 5 and the loop exits when str[5] == '\\0'.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a string — e.g. Hello",
                "Click Run Code. Verify output: Length: 5",
                "Try an empty string, a string with spaces (use fgets), and a long string. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint stringLength(char *str) {\n    int count = 0;\n    while (str[count] != '\\0') {\n        count++;\n    }\n    return count;\n}\n\nint main() {\n    char str[100];\n    int len;\n    scanf(\"%s\", str);\n    len = stringLength(str);\n    printf(\"Length: %d\\n\", len);\n    return 0;\n}",
                "steps": [
                  { "line": 12, "annotation": "Declare variables", "memory": [{ "variable": "str", "type": "char[]", "value": "?" }, { "variable": "len", "type": "int", "value": "?" }], "output": "" },
                  { "line": 14, "annotation": "Read str=\"Hello\"", "memory": [{ "variable": "str", "type": "char[]", "value": "\"Hello\"" }], "output": "" },
                  { "line": 15, "annotation": "Call stringLength(str)", "memory": [], "output": "" },
                  { "line": 3, "annotation": "stringLength starts, str points to \"Hello\"", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Initialize count = 0", "memory": [{ "variable": "count", "type": "int", "value": "0" }], "output": "" },
                  { "line": 5, "annotation": "str[0] is 'H', != '\\0'", "memory": [], "output": "" },
                  { "line": 6, "annotation": "count++", "memory": [{ "variable": "count", "type": "int", "value": "1" }], "output": "" },
                  { "line": 5, "annotation": "str[1] is 'e', != '\\0'", "memory": [], "output": "" },
                  { "line": 6, "annotation": "count++", "memory": [{ "variable": "count", "type": "int", "value": "2" }], "output": "" },
                  { "line": 5, "annotation": "str[2] is 'l', != '\\0'", "memory": [], "output": "" },
                  { "line": 6, "annotation": "count++", "memory": [{ "variable": "count", "type": "int", "value": "3" }], "output": "" },
                  { "line": 5, "annotation": "str[3] is 'l', != '\\0'", "memory": [], "output": "" },
                  { "line": 6, "annotation": "count++", "memory": [{ "variable": "count", "type": "int", "value": "4" }], "output": "" },
                  { "line": 5, "annotation": "str[4] is 'o', != '\\0'", "memory": [], "output": "" },
                  { "line": 6, "annotation": "count++", "memory": [{ "variable": "count", "type": "int", "value": "5" }], "output": "" },
                  { "line": 5, "annotation": "str[5] is '\\0'", "memory": [], "output": "" },
                  { "line": 8, "annotation": "Return count (5)", "memory": [], "output": "" },
                  { "line": 15, "annotation": "len = 5", "memory": [{ "variable": "len", "type": "int", "value": "5" }], "output": "" },
                  { "line": 16, "annotation": "Print Length", "memory": [], "output": "Length: 5\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w11-3",
            "title": "Matrix Transpose",
            "desc": "Transpose a matrix via a function.",
            "expected": "Transposed matrix",
            "content": {
              "aim": {
                "text": "This experiment implements matrix transposition through a dedicated function to demonstrate how 2D arrays are passed to and modified by functions in C. Students will define a transpose() function that accepts two 2D arrays and the row/column dimensions, compute B[j][i] = A[i][j] for all positions using nested loops, and call it from main(). Because array names decay to base-address pointers in C, the function directly modifies the caller's B array — effectively call by reference for the matrix contents, while the dimension integers are passed by value. The experiment also introduces the in-place transposition technique for square matrices as an extension.",
                "bullets": [
                  "Define a void transpose(int A[][MAX], int B[][MAX], int rows, int cols) function",
                  "Pass 2D arrays to a function and understand how array addresses are passed",
                  "Compute the transpose by assigning B[j][i] = A[i][j] for all valid i, j",
                  "Understand the scope of loop counters and matrix elements inside the function",
                  "Demonstrate that 2D array contents are modifiable through a passed pointer (call by reference of array data, call by value of dimension parameters)",
                  "Display original and transposed matrices with formatted printf() output"
                ]
              },
              "theory": [
                {
                  "title": "Matrix Transpose",
                  "body": ["![Matrix Transpose](matrix-transpose.webp)","The transpose of an m × n matrix A is an n × m matrix B where:\n  B[j][i] = A[i][j]   for all i in [0, m-1] and j in [0, n-1]\nRow i of A becomes column i of B. The dimensions swap: an m × n matrix transposes to an n × m matrix."]
                },
                {
                  "title": "Example",
                  "body": ["A (2×3):            Transpose B (3×2):\n  1  2  3             1  4\n  4  5  6             2  5\n                      3  6"]
                },
                {
                  "title": "Passing 2D Arrays to Functions",
                  "body": ["In C, a 2D array passed to a function decays to a pointer to its first row. The column dimension must be specified in the parameter:\n  void transpose(int A[][MAX], int B[][MAX], int rows, int cols)\nMAX is a compile-time constant (e.g. #define MAX 10). The row count is passed as a runtime parameter."]
                },
                {
                  "title": "Why Array Data Is Modified",
                  "body": ["Arrays are not copied when passed to functions; the function receives the base address. Modifications to B[j][i] inside the function are directly reflected in the caller's array — this is effectively call by reference for array contents. The dimension variables rows and cols are passed by value."]
                },
                {
                  "title": "In-Place Transpose (Square Matrices Only)",
                  "body": ["For a square n × n matrix, the transpose can be done in-place by swapping A[i][j] and A[j][i] for i < j only (not both, to avoid double-swapping):\n  for (i = 0; i < n; i++)\n      for (j = i+1; j < n; j++) {\n          temp = A[i][j]; A[i][j] = A[j][i]; A[j][i] = temp;\n      }\nFor non-square matrices, a second matrix B is required."]
                },
                {
                  "title": "Scope of Loop Variables",
                  "body": ["Loop counters i and j declared inside the function are local to that function and do not conflict with any same-named variables in main()."]
                },
                {
                  "title": "Time and Space Complexity",
                  "body": ["Time Complexity — O(m × n): every element is copied exactly once.\nSpace Complexity — O(m × n) for the result matrix B (O(1) extra for in-place)."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace B[j][i] = A[i][j] assignments for a 2×3 matrix.",
                "Observe how the function modifies the caller's B array through the base address.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter rows, cols, then the matrix row by row. e.g. 2 3  1 2 3 4 5 6",
                "Click Run Code. Verify: Original (2×3):  1 2 3 / 4 5 6 | Transpose (3×2): 1 4 / 2 5 / 3 6",
                "Try a square 3×3 matrix and a 1×5 row matrix. Proceed to Posttest."
              ],
              "simulation": {
                "code": "#include <stdio.h>\n#define MAX 10\n\nvoid transpose(int A[][MAX], int B[][MAX], int rows, int cols) {\n    int i, j;\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            B[j][i] = A[i][j];\n        }\n    }\n}\n\nint main() {\n    int A[MAX][MAX], B[MAX][MAX];\n    int rows, cols, i, j;\n    scanf(\"%d %d\", &rows, &cols);\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            scanf(\"%d\", &A[i][j]);\n        }\n    }\n    transpose(A, B, rows, cols);\n    printf(\"Transpose:\\n\");\n    for (i = 0; i < cols; i++) {\n        for (j = 0; j < rows; j++) {\n            printf(\"%d \", B[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                "steps": [
                  { "line": 15, "annotation": "Declare variables", "memory": [{ "variable": "rows", "type": "int", "value": "?" }, { "variable": "cols", "type": "int", "value": "?" }], "output": "" },
                  { "line": 16, "annotation": "Read rows=2, cols=3", "memory": [{ "variable": "rows", "type": "int", "value": "2" }, { "variable": "cols", "type": "int", "value": "3" }], "output": "" },
                  { "line": 17, "annotation": "Read matrix A elements", "memory": [], "output": "" },
                  { "line": 22, "annotation": "Call transpose(A, B, 2, 3)", "memory": [], "output": "" },
                  { "line": 4, "annotation": "transpose starts", "memory": [], "output": "" },
                  { "line": 6, "annotation": "Nested loop to assign B[j][i] = A[i][j]", "memory": [], "output": "" },
                  { "line": 8, "annotation": "B[0][0]=A[0][0], B[1][0]=A[0][1], ...", "memory": [], "output": "" },
                  { "line": 11, "annotation": "transpose complete, returns", "memory": [], "output": "" },
                  { "line": 23, "annotation": "Print Transpose:", "memory": [], "output": "Transpose:\n" },
                  { "line": 24, "annotation": "Print matrix B", "memory": [], "output": "" },
                  { "line": 26, "annotation": "Print row 1", "memory": [], "output": "Transpose:\n1 4 \n" },
                  { "line": 26, "annotation": "Print row 2", "memory": [], "output": "Transpose:\n1 4 \n2 5 \n" },
                  { "line": 26, "annotation": "Print row 3", "memory": [], "output": "Transpose:\n1 4 \n2 5 \n3 6 \n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 12",
        "objective": "Recursive functions for naturally recursive problems",
        "tutorial": "Tutorial 12: Recursion",
        "labTitle": "Lab 12: Recursive techniques",
        "experiments": [
          {
            "id": "c-w12-1",
            "title": "Fibonacci Series",
            "desc": "Generate the Fibonacci series using recursion.",
            "expected": "Fibonacci sequence",
            "content": {
              "aim": {
                "text": "This experiment implements the Fibonacci series using a recursive function to provide students with their first hands-on experience of recursion in C. The fib(n) function directly encodes the mathematical definition — fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2) — so that each call immediately maps to the formula. Students will call fib(i) inside a loop to print the first n terms and trace the recursive call tree to understand how calls stack up and unwind. The experiment also highlights the exponential growth of call count with naive recursion (an important motivation for memoisation covered in advanced courses), and makes clear how missing base cases would cause infinite recursion and a stack overflow crash.",
                "bullets": [
                  "Understand the concept of recursion and base case",
                  "Implement a recursive function fib(n) that returns the nth Fibonacci number",
                  "Understand how recursive calls stack up in memory",
                  "Trace the recursive call tree for small inputs",
                  "Observe how fib(n) = fib(n-1) + fib(n-2) breaks down to fib(0) and fib(1)"
                ]
              },
              "theory": [
                {
                  "title": "What is Recursion?",
                  "body": ["Recursion is a programming technique where a function calls itself to solve a smaller version of the same problem. Every recursive solution has two parts — a base case that stops the recursion and a recursive case that breaks the problem down further.","![Recursive Function in C](recursion.webp)"]
                },
                {
                  "title": "Fibonacci Series",
                  "body": ["![Fibaonacci series](fibonacci-series.webp)","The Fibonacci series is a sequence where each number is the sum of the two preceding numbers.\nSeries: 0 1 1 2 3 5 8 13 21 34 ...\nMathematical definition:\nfib(0) = 0 — base case\nfib(1) = 1 — base case\nfib(n) = fib(n-1) + fib(n-2) — recursive case for n greater than 1"]
                },
                {
                  "title": "Recursive Call Tree for fib(4)",
                  "body": ["fib(4) calls fib(3) and fib(2)\nfib(3) calls fib(2) and fib(1)\nfib(2) calls fib(1) and fib(0)\nEach call adds a new frame to the call stack. When base case is hit the function returns and the stack unwinds back up."]
                },
                {
                  "title": "Call Stack Concept",
                  "body": ["Every function call occupies a stack frame in memory containing its local variables and return address. For fib(5) the maximum stack depth is 5 frames deep. This is why deep recursion on large n causes stack overflow."]
                },
                {
                  "title": "Time Complexity Warning",
                  "body": ["Naive recursive Fibonacci recalculates the same subproblems multiple times. fib(30) makes over a million function calls. This is inefficient but perfectly illustrates recursion for learning purposes."]
                },
                {
                  "title": "Base Case Importance",
                  "body": ["Without base cases fib(0)=0 and fib(1)=1 the function would recurse infinitely and crash with a stack overflow error."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read Aim and understand what Fibonacci series means mathematically",
                "Go to Theory and study the recursive definition fib(n) = fib(n-1) + fib(n-2)",
                "Trace fib(4) manually on paper using the call tree before running the simulation",
                "Go to Simulation tab and click Start",
                "Press Next step by step and observe how the call stack builds up frame by frame",
                "Watch how each fib() call splits into two more calls until base case is reached",
                "Observe the stack unwinding phase where return values bubble back up",
                "Note the final output showing the complete Fibonacci series",
                "Go to Code Test tab — starter code pre-loaded",
                "In Stdin input box enter how many terms you want — example: 7",
                "Click Run Code",
                "Verify output: 0 1 1 2 3 5 8",
                "Try n=10 and verify: 0 1 1 2 3 5 8 13 21 34. Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint fib(int n) {\n    if (n <= 1) {\n        return n;\n    }\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    int n = 5, i;\n    for (i = 0; i < n; i++) {\n        printf(\"%d \", fib(i));\n    }\n    printf(\"\\n\");\n    return 0;\n}",
                "steps": [
                  { "line": 3, "annotation": "fib(n) defined with base cases", "memory": [], "output": "" },
                  { "line": 11, "annotation": "main() calls fib(0)", "memory": [{ "variable": "i", "type": "int", "value": "0" }], "output": "" },
                  { "line": 4, "annotation": "fib(0) hits base case immediately", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Returns 0", "memory": [], "output": "" },
                  { "line": 13, "annotation": "Output panel: 0", "memory": [], "output": "0 " },
                  { "line": 11, "annotation": "main() calls fib(1)", "memory": [{ "variable": "i", "type": "int", "value": "1" }], "output": "" },
                  { "line": 4, "annotation": "fib(1) hits base case immediately", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Returns 1", "memory": [], "output": "" },
                  { "line": 13, "annotation": "Output panel: 0 1", "memory": [], "output": "0 1 " },
                  { "line": 11, "annotation": "main() calls fib(2)", "memory": [{ "variable": "i", "type": "int", "value": "2" }], "output": "" },
                  { "line": 7, "annotation": "fib(2) = fib(1) + fib(0) = 1 + 0 = 1", "memory": [], "output": "" },
                  { "line": 13, "annotation": "Output panel: 0 1 1", "memory": [], "output": "0 1 1 " },
                  { "line": 11, "annotation": "main() calls fib(3)", "memory": [{ "variable": "i", "type": "int", "value": "3" }], "output": "" },
                  { "line": 7, "annotation": "fib(3) = fib(2) + fib(1) = 1 + 1 = 2", "memory": [], "output": "" },
                  { "line": 13, "annotation": "Output panel: 0 1 1 2", "memory": [], "output": "0 1 1 2 " },
                  { "line": 11, "annotation": "main() calls fib(4)", "memory": [{ "variable": "i", "type": "int", "value": "4" }], "output": "" },
                  { "line": 7, "annotation": "fib(4) = fib(3) + fib(2) = 2 + 1 = 3", "memory": [], "output": "" },
                  { "line": 13, "annotation": "Output panel: 0 1 1 2 3", "memory": [], "output": "0 1 1 2 3 " }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 12",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w12-2",
            "title": "Factorial Recursive",
            "desc": "Calculate factorial recursively.",
            "expected": "Factorial=X",
            "content": {
              "aim": {
                "text": "This experiment implements the factorial function recursively to contrast with the iterative approach studied in Week 6. The recursive definition — fact(0) = 1, fact(n) = n × fact(n-1) — maps directly to the mathematical recurrence, illustrating how recursion elegantly expresses naturally self-similar problems. Students will trace the call stack frame by frame (fact(4) → fact(3) → … → fact(0) → returns upward multiplying at each level) and compare the recursive solution's clarity against the iterative loop. The experiment also warns about integer overflow for large n and demonstrates linear O(n) recursion depth, distinguishing it from the branching (O(2^n)) recursion of Fibonacci.",
                "bullets": [
                  "Understand factorial as a naturally recursive mathematical definition",
                  "Implement fact(n) = n multiplied by fact(n-1) with base case fact(0) = 1",
                  "Trace the call stack frame by frame for small n values",
                  "Observe how return values multiply back up during stack unwinding",
                  "Compare recursive factorial with iterative factorial mentally"
                ]
              },
              "theory": [
                {
                  "title": "Factorial Definition",
                  "body": ["Factorial of n written as n! is the product of all positive integers from 1 to n.\nMathematical definition:\nfact(0) = 1 — base case\nfact(n) = n multiplied by fact(n-1) — recursive case for n greater than 0\nExamples:\n0! = 1\n3! = 3 × 2 × 1 = 6\n5! = 5 × 4 × 3 × 2 × 1 = 120"]
                },
                {
                  "title": "Why Factorial is Naturally Recursive",
                  "body": ["fact(5) depends on fact(4), which depends on fact(3), all the way down to fact(0). Each call solves a slightly smaller version of the same problem — this is the essence of recursion."]
                },
                {
                  "title": "Call Stack Trace for fact(4)",
                  "body": ["fact(4) calls fact(3)\nfact(3) calls fact(2)\nfact(2) calls fact(1)\nfact(1) calls fact(0)\nfact(0) returns 1 — base case hit\nfact(1) returns 1 × 1 = 1\nfact(2) returns 2 × 1 = 2\nfact(3) returns 3 × 2 = 6\nfact(4) returns 4 × 6 = 24"]
                },
                {
                  "title": "Linear Recursion",
                  "body": ["Factorial is linear recursion — each call makes exactly one recursive call unlike Fibonacci which makes two. This means the call stack depth equals n and the time complexity is O(n).","![Factorial Recursion](factorial-recursion.webp)"]
                },
                {
                  "title": "Integer Overflow Warning",
                  "body": ["Factorial grows very fast. fact(13) exceeds the range of int (2,147,483,647). For large n use long or unsigned long long to avoid overflow."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read Aim and recall the mathematical definition of factorial",
                "Go to Theory and trace fact(4) manually on paper before simulation",
                "Write each call stack frame on paper: fact(4) → fact(3) → fact(2) → fact(1) → fact(0)",
                "Then trace the unwinding: 1 → 1 → 2 → 6 → 24",
                "Go to Simulation tab and click Start",
                "Press Next and observe the call stack building downward to base case",
                "Watch the unwinding phase where multiplication happens at each return",
                "Observe how final answer 24 emerges at the top of the unwinding",
                "Go to Code Test tab — starter code pre-loaded",
                "Enter a number in Stdin — example: 5",
                "Click Run Code",
                "Verify output: Factorial=120",
                "Try n=0 and verify output: Factorial=1. Try n=12 and check if result is correct: 479001600. Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nlong long fact(int n) {\n    if (n == 0) {\n        return 1;\n    }\n    return n * fact(n - 1);\n}\n\nint main() {\n    int n = 4;\n    printf(\"Factorial=%lld\\n\", fact(n));\n    return 0;\n}",
                "steps": [
                  { "line": 11, "annotation": "main() reads n=4, calls fact(4)", "memory": [{ "variable": "n", "type": "int", "value": "4" }], "output": "" },
                  { "line": 7, "annotation": "fact(4) calls fact(3)", "memory": [], "output": "" },
                  { "line": 7, "annotation": "fact(3) calls fact(2)", "memory": [], "output": "" },
                  { "line": 7, "annotation": "fact(2) calls fact(1)", "memory": [], "output": "" },
                  { "line": 7, "annotation": "fact(1) calls fact(0)", "memory": [], "output": "" },
                  { "line": 4, "annotation": "fact(0) returns 1 (Base Case)", "memory": [], "output": "" },
                  { "line": 7, "annotation": "fact(1) returns 1 * 1 = 1", "memory": [], "output": "" },
                  { "line": 7, "annotation": "fact(2) returns 2 * 1 = 2", "memory": [], "output": "" },
                  { "line": 7, "annotation": "fact(3) returns 3 * 2 = 6", "memory": [], "output": "" },
                  { "line": 7, "annotation": "fact(4) returns 4 * 6 = 24", "memory": [], "output": "" },
                  { "line": 12, "annotation": "main() receives 24", "memory": [], "output": "Factorial=24\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 12",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w12-3",
            "title": "Ackermann Function",
            "desc": "Compute the Ackermann function recursively.",
            "expected": "Ackermann=X",
            "content": {
              "aim": {
                "text": "This experiment implements the Ackermann function — a landmark example from theoretical computer science that is computable yet grows faster than any primitive recursive function. Students will implement the three-case recursive definition (ack(0,n) = n+1; ack(m,0) = ack(m-1,1); ack(m,n) = ack(m-1, ack(m, n-1))) and observe through small test cases such as ack(1,1) = 3 and ack(3,3) = 61 how the double recursion in Case 3 generates an enormous number of nested calls even for tiny inputs. The experiment develops awareness of stack-depth limits, stack overflow risks for large arguments, and the theoretical distinction between computable and primitive-recursive functions.",
                "bullets": [
                  "Understand the three-case definition of the Ackermann function",
                  "Implement ack(m,n) using nested recursion in C",
                  "Trace the call stack for small inputs like ack(1,1) and ack(2,1)",
                  "Understand why ack(4,1) is computationally impractical",
                  "Appreciate the theoretical importance of Ackermann function in computer science"
                ]
              },
              "theory": [
                {
                  "title": "What is the Ackermann Function?",
                  "body": ["The Ackermann function is a classic example from theoretical computer science defined by Wilhelm Ackermann in 1928. It grows faster than any primitive recursive function making it important in computability theory."]
                },
                {
                  "title": "Three-Case Definition:",
                  "body": ["Case 1: If m=0, return n+1\nCase 2: If m > 0 and n=0, return ack(m-1, 1)\nCase 3: If m > 0 and n > 0, return ack(m-1, ack(m, n-1))"]
                },
                {
                  "title": "Why It Grows So Fast",
                  "body": ["ack(3,3) = 61. ack(4,1) = 65533. ack(4,2) is a number with 19,728 digits. This explosive growth comes from the double recursion in Case 3 — ack calls itself inside its own argument."]
                },
                {
                  "title": "Double Recursion",
                  "body": ["Case 3 is ack(m-1, ack(m, n-1)). The inner ack(m, n-1) must fully resolve before the outer ack(m-1, ...) can begin. This creates an enormous call tree even for small inputs."]
                },
                {
                  "title": "Practical Limits",
                  "body": ["Only test with m ≤ 3 and n ≤ 4 in your program. Larger values will crash the program due to stack overflow or take years to compute."]
                },
                {
                  "title": "Theoretical Importance",
                  "body": ["The Ackermann function proved that not all computable functions are primitive recursive — a landmark result in mathematical logic and the theory of computation."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read Aim and Theory carefully — Ackermann is more complex than Fibonacci or Factorial",
                "Study all three cases of the definition and memorize which case applies when",
                "Manually trace ack(1,1) on paper step by step using the three cases",
                "Verify: ack(1,1) → ack(0, ack(1,0)) → ack(0, ack(0,1)) → ack(0,2) → 3",
                "Go to Simulation tab and observe ack(2,1) traced step by step",
                "Count how many total function calls are made — observe the explosion",
                "Go to Code Test tab — starter code pre-loaded",
                "In Stdin enter m and n as two space separated integers",
                "Start with small safe values: 0 1 or 1 1 or 2 2 or 3 3",
                "Click Run Code and verify against the values table in Theory",
                "Do NOT try m=4 with n greater than 1 — it will timeout or crash. Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint ack(int m, int n) {\n    if (m == 0) return n + 1;\n    if (m > 0 && n == 0) return ack(m - 1, 1);\n    return ack(m - 1, ack(m, n - 1));\n}\n\nint main() {\n    printf(\"Ackermann=%d\\n\", ack(1, 1));\n    return 0;\n}",
                "steps": [
                  { "line": 10, "annotation": "main() calls ack(1,1)", "memory": [], "output": "" },
                  { "line": 6, "annotation": "ack(1,1): Case 3 applies -> ack(0, ack(1,0))", "memory": [], "output": "" },
                  { "line": 5, "annotation": "Resolve ack(1,0): Case 2 applies -> ack(0,1)", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Resolve ack(0,1): Case 1 applies -> returns 2", "memory": [], "output": "" },
                  { "line": 6, "annotation": "Inner argument resolved. Now resolve ack(0,2)", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Resolve ack(0,2): Case 1 applies -> returns 3", "memory": [], "output": "" },
                  { "line": 10, "annotation": "printf executes", "memory": [], "output": "Ackermann=3\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "Ackermann W., Zum Hilbertschen Aufbau der reellen Zahlen, Mathematische Annalen, 1928",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 12",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 13",
        "objective": "Pointers, call by reference, dangling pointers",
        "tutorial": "Tutorial 13: Call by Reference and Pointers",
        "labTitle": "Lab 13: Pointer manipulations",
        "experiments": [
          {
            "id": "c-w13-1",
            "title": "Swap using Call by Reference",
            "desc": "Swap two numbers using pointers.",
            "expected": "Swapped values",
            "content": {
              "aim": {
                "text": "This experiment demonstrates the critical difference between call by value (which cannot modify the caller's variables) and call by reference via pointers (which can). Students will first understand why a naive swap(int x, int y) function fails — it operates on copies — and then implement a correct swap(int *x, int *y) that receives memory addresses via the & operator and modifies the original variables through pointer dereferencing (*). By tracing how the addresses of a and b are passed, how temp = *x saves the value at the address, and how *x = *y writes to the original memory location, students build a precise mental model of pointers and indirection that underpins dynamic data structures, output parameters, and array passing in C.",
                "bullets": [
                  "Understand why call by value fails for swapping",
                  "Learn how pointers carry memory addresses to functions",
                  "Implement swap using pointer parameters",
                  "Observe how dereferencing a pointer modifies the original variable",
                  "Understand the role of & and * operators in call by reference"
                ]
              },
              "theory": [
                {
                  "title": "Call by Value vs Call by Reference",
                  "body": ["In call by value a copy of the variable is passed to the function. Changes inside the function do not affect the original variable in main. This is the default in C.\nIn call by reference the address of the variable is passed using the & operator. The function receives a pointer and uses the * operator to access and modify the original variable directly."]
                },
                {
                  "title": "Why Swap Fails with Call by Value",
                  "body": ["If you pass a and b directly to swap(a, b) the function gets copies x and y. Swapping x and y does nothing to the original a and b in main. After the function returns a and b are unchanged."]
                },
                {
                  "title": "Why Swap Works with Call by Reference",
                  "body": ["When you pass &a and &b the function receives pointers to the actual memory locations of a and b. Using *ptr you read or write the value at that address directly. Any change through the pointer changes the original variable."]
                },
                {
                  "title": "The & Operator",
                  "body": ["& gives the memory address of a variable. &a means the address where a is stored in memory. Example: if a is at address 2000 then &a = 2000."]
                },
                {
                  "title": "The * Operator in Pointer Context",
                  "body": ["* before a pointer variable dereferences it — meaning go to that address and read or write the value there. If ptr = &a then *ptr = 10 sets a to 10."]
                },
                {
                  "title": "Swap Logic using Pointers",
                  "body": ["temp = *a stores the value at address a into temp\n*a = *b copies the value at address b into address a\n*b = temp copies temp into address b\nResult: original variables in main are swapped."]
                },
                {
                  "title": "Dangling Pointer Brief",
                  "body": ["A dangling pointer is a pointer that points to a memory location that has been freed or gone out of scope. Accessing a dangling pointer causes undefined behavior. This is covered as a warning in this week's tutorial."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read Theory and clearly understand why call by value fails for swap",
                "Draw on paper: two boxes labeled a=10 and b=20 with addresses 2000 and 3000",
                "Trace what happens when you pass &a and &b to swap()",
                "Show on paper how *a = *b changes value at address 2000 to 20",
                "Go to Simulation tab and click Start",
                "Press Next and watch memory addresses appear for a and b",
                "Observe pointer parameters receiving those addresses",
                "Watch values at addresses change step by step during swap",
                "Go to Code Test tab — starter code pre-loaded",
                "Enter two integers in Stdin — example: 10 20",
                "Click Run Code",
                "Verify output: a=20 b=10",
                "Try with negative numbers: -5 100 and verify swap works. Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 10;\n    int b = 20;\n    swap(&a, &b);\n    printf(\"a=%d b=%d\\n\", a, b);\n    return 0;\n}",
                "steps": [
                  { "line": 10, "annotation": "main() declares a=10 and b=20", "memory": [{ "variable": "a", "type": "int", "value": "10", "address": "2000" }, { "variable": "b", "type": "int", "value": "20", "address": "3000" }], "output": "" },
                  { "line": 12, "annotation": "swap(&a, &b) called", "memory": [{ "variable": "x", "type": "int*", "value": "2000" }, { "variable": "y", "type": "int*", "value": "3000" }], "output": "" },
                  { "line": 4, "annotation": "temp = *x", "memory": [{ "variable": "temp", "type": "int", "value": "10" }], "output": "" },
                  { "line": 5, "annotation": "*x = *y", "memory": [{ "variable": "a", "type": "int", "value": "20", "address": "2000" }], "output": "" },
                  { "line": 6, "annotation": "*y = temp", "memory": [{ "variable": "b", "type": "int", "value": "10", "address": "3000" }], "output": "" },
                  { "line": 7, "annotation": "swap() returns, back in main()", "memory": [], "output": "" },
                  { "line": 13, "annotation": "printf executes", "memory": [], "output": "a=20 b=10\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 13",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w13-2",
            "title": "String Copy using Pointer",
            "desc": "Copy a string using pointers.",
            "expected": "Copied string",
            "content": {
              "aim": {
                "text": "This experiment implements a character-by-character string copy function using pointer arithmetic, replicating the behaviour of strcpy() without calling it. Students will advance a source pointer through every character of the source string, copy each character to the corresponding position through a destination pointer, halt when the source pointer reaches the null terminator, and explicitly append '\\0' to terminate the destination string. The experiment reinforces how array names decay to pointers in C, how pointer increment replaces array index increment, why the null terminator must be manually added after the loop, and what happens if the destination buffer is too small — providing a concrete introduction to buffer overflow risk.",
                "bullets": [
                  "Understand how strings are stored as character arrays ending with null character",
                  "Use pointer arithmetic to traverse source string character by character",
                  "Copy each character to the destination array using pointer dereferencing",
                  "Append null terminator to complete the destination string",
                  "Understand why array names are already pointers in C"
                ]
              },
              "theory": [
                {
                  "title": "Strings in C",
                  "body": ["C does not have a built-in string type. Strings are stored as arrays of characters terminated by a null character written as backslash zero. Example: \"Hello\" is stored as H e l l o \\0 in memory occupying 6 bytes."]
                },
                {
                  "title": "Pointer to a Character Array",
                  "body": ["When you declare char s[100] the name s is already a pointer to the first character. You can assign a char pointer to it: char *p = s makes p point to s[0]."]
                },
                {
                  "title": "Pointer Arithmetic",
                  "body": ["Incrementing a char pointer with p++ moves it forward by one byte to the next character. This is how you traverse a string character by character without using an index."]
                },
                {
                  "title": "Dereferencing to Read and Write",
                  "body": ["*src reads the character at current position of src pointer.\n*dest = *src copies the character from src position to dest position."]
                },
                {
                  "title": "Null Terminator Check",
                  "body": ["The while loop condition while(*src) continues as long as the current character is not null. When src reaches the null terminator the loop ends."]
                },
                {
                  "title": "Appending Null Terminator",
                  "body": ["After the loop ends *dest = '\\0' must be explicitly added to terminate the destination string. Without this the destination array is not a valid C string."]
                },
                {
                  "title": "Why No & for Arrays",
                  "body": ["Array names decay to pointers automatically in C. char s[100] — s is already the address of s[0]. So strCopy(dest, src) passes the addresses directly without needing &."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read Theory and draw the memory layout of \"Hello\\0\" as boxes labeled H e l l o \\0",
                "Draw two arrays src and dest side by side with pointer arrows",
                "Trace on paper how src pointer moves and copies each character to dest",
                "Note when the loop stops at \\0 and where \\0 is manually added to dest",
                "Go to Simulation tab and click Start",
                "Press Next and watch the src pointer advance one character at a time",
                "Observe dest filling character by character in the memory panel",
                "Watch \\0 being added to dest at the end",
                "Go to Code Test tab — starter code pre-loaded",
                "Enter a word in Stdin — example: JNTUGV",
                "Click Run Code",
                "Verify output: Copied: JNTUGV",
                "Try with spaces in input using a different scanf format. Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nvoid strCopy(char *dest, char *src) {\n    while (*src != '\\0') {\n        *dest = *src;\n        dest++;\n        src++;\n    }\n    *dest = '\\0';\n}\n\nint main() {\n    char src[] = \"JNTU\";\n    char dest[10];\n    strCopy(dest, src);\n    printf(\"Copied: %s\\n\", dest);\n    return 0;\n}",
                "steps": [
                  { "line": 14, "annotation": "Arrays declared, pointers initialized", "memory": [{ "variable": "src", "type": "char[]", "value": "\"JNTU\"", "address": "1000" }, { "variable": "dest", "type": "char[]", "value": "empty", "address": "2000" }], "output": "" },
                  { "line": 15, "annotation": "strCopy(dest, src) called", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Loop iteration 1: *src = 'J'", "memory": [], "output": "" },
                  { "line": 5, "annotation": "*dest = *src copies 'J'", "memory": [{ "variable": "dest[0]", "type": "char", "value": "'J'", "address": "2000" }], "output": "" },
                  { "line": 6, "annotation": "dest++, src++", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Loop iteration 2: *src = 'N'", "memory": [], "output": "" },
                  { "line": 5, "annotation": "*dest = *src copies 'N'", "memory": [{ "variable": "dest[1]", "type": "char", "value": "'N'", "address": "2001" }], "output": "" },
                  { "line": 6, "annotation": "dest++, src++", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Loop iteration 3: *src = 'T'", "memory": [], "output": "" },
                  { "line": 5, "annotation": "*dest = *src copies 'T'", "memory": [{ "variable": "dest[2]", "type": "char", "value": "'T'", "address": "2002" }], "output": "" },
                  { "line": 6, "annotation": "dest++, src++", "memory": [], "output": "" },
                  { "line": 4, "annotation": "Loop iteration 4: *src = 'U'", "memory": [], "output": "" },
                  { "line": 5, "annotation": "*dest = *src copies 'U'", "memory": [{ "variable": "dest[3]", "type": "char", "value": "'U'", "address": "2003" }], "output": "" },
                  { "line": 6, "annotation": "dest++, src++", "memory": [], "output": "" },
                  { "line": 4, "annotation": "while(*src) fails — \\0 is falsy", "memory": [], "output": "" },
                  { "line": 9, "annotation": "*dest = \\0 adds null terminator", "memory": [{ "variable": "dest[4]", "type": "char", "value": "'\\0'", "address": "2004" }], "output": "" },
                  { "line": 16, "annotation": "printf executes", "memory": [], "output": "Copied: JNTU\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 13",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w13-3",
            "title": "Count Characters using Pointer",
            "desc": "Count uppercase, lowercase, digits, and special characters using pointers.",
            "expected": "Character counts",
            "content": {
              "aim": {
                "text": "This experiment uses pointer traversal to scan a string character by character and classify each character into one of four categories — uppercase letters (A–Z, ASCII 65–90), lowercase letters (a–z, ASCII 97–122), decimal digits (0–9, ASCII 48–57), and other characters — incrementing the corresponding counter for each. Students will initialise a char pointer to the start of the string, loop until the pointer reaches the null terminator, apply ASCII range comparisons at each position, advance the pointer with p++, and print all four counts. The experiment demonstrates that pointer traversal and index-based traversal are functionally equivalent, and introduces character classification using ASCII arithmetic — a foundation for input validation and text processing programs.",
                "bullets": [
                  "Traverse a character array using a pointer instead of index",
                  "Use ASCII range comparisons to classify each character",
                  "Count occurrences of each character category",
                  "Understand how pointer increment replaces array index increment",
                  "Display the four category counts as formatted output"
                ]
              },
              "theory": [
                {
                  "title": "ASCII Character Ranges",
                  "body": ["Every character in C is stored as an integer using ASCII encoding. The classification ranges are:\nUppercase letters: A to Z → ASCII 65 to 90\nLowercase letters: a to z → ASCII 97 to 122\nDigits: 0 to 9 → ASCII 48 to 57\nOther characters: anything outside the above ranges including spaces, punctuation, symbols"]
                },
                {
                  "title": "Pointer Traversal of a String",
                  "body": ["![Pointer visualization](pointer-string.webp)","Declaring char *p = s makes p point to the first character of string s. Using *p you read the current character. Using p++ you move to the next character. The loop continues while *p is not \\0."]
                },
                {
                  "title": "Character Comparison in C",
                  "body": ["You can directly compare characters using relational operators. *p >= 'A' && *p <= 'Z' checks if the current character is an uppercase letter. C compares the ASCII values behind the scenes."]
                },
                {
                  "title": "Why Pointer Instead of Index",
                  "body": ["Using an index variable i and s[i] is equivalent but pointer traversal is more idiomatic C. It demonstrates that strings are just memory sequences and pointers are the natural way to navigate them."]
                },
                {
                  "title": "Counting Logic",
                  "body": ["Four integer counters upper lower digit other are initialized to zero. In each loop iteration exactly one counter is incremented based on which range the current character falls into. After the loop all four are printed."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read Theory and memorize the four ASCII ranges for classification",
                "Write the input \"Hello123!\" on paper and manually classify each character",
                "Count: Upper=1, Lower=4, Digit=3, Other=1 — verify your manual count",
                "Go to Simulation tab and click Start",
                "Press Next and watch the pointer p move across each character",
                "Observe which counter increments at each step",
                "Note the final counter values in the memory panel",
                "Go to Code Test tab — starter code pre-loaded",
                "Enter a mixed string in Stdin — example: Hello123!",
                "Click Run Code",
                "Verify output: Upper=1 Lower=4 Digit=3 Other=1",
                "Try with all digits: 9876 and verify Upper=0 Lower=0 Digit=4 Other=0. Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    char str[] = \"Hi9!\";\n    char *p = str;\n    int upper = 0, lower = 0, digit = 0, other = 0;\n    while (*p != '\\0') {\n        if (*p >= 'A' && *p <= 'Z') upper++;\n        else if (*p >= 'a' && *p <= 'z') lower++;\n        else if (*p >= '0' && *p <= '9') digit++;\n        else other++;\n        p++;\n    }\n    printf(\"Upper=%d Lower=%d Digit=%d Other=%d\\n\", upper, lower, digit, other);\n    return 0;\n}",
                "steps": [
                  { "line": 4, "annotation": "p initialized, counters all zero", "memory": [{ "variable": "upper", "type": "int", "value": "0" }, { "variable": "lower", "type": "int", "value": "0" }, { "variable": "digit", "type": "int", "value": "0" }, { "variable": "other", "type": "int", "value": "0" }], "output": "" },
                  { "line": 7, "annotation": "*p = H, ASCII 72 (uppercase)", "memory": [], "output": "" },
                  { "line": 8, "annotation": "upper++", "memory": [{ "variable": "upper", "type": "int", "value": "1" }], "output": "" },
                  { "line": 12, "annotation": "p++ moves to i", "memory": [], "output": "" },
                  { "line": 7, "annotation": "*p = i, ASCII 105 (lowercase)", "memory": [], "output": "" },
                  { "line": 9, "annotation": "lower++", "memory": [{ "variable": "lower", "type": "int", "value": "1" }], "output": "" },
                  { "line": 12, "annotation": "p++ moves to 9", "memory": [], "output": "" },
                  { "line": 7, "annotation": "*p = 9, ASCII 57 (digit)", "memory": [], "output": "" },
                  { "line": 10, "annotation": "digit++", "memory": [{ "variable": "digit", "type": "int", "value": "1" }], "output": "" },
                  { "line": 12, "annotation": "p++ moves to !", "memory": [], "output": "" },
                  { "line": 7, "annotation": "*p = !, ASCII 33 (other)", "memory": [], "output": "" },
                  { "line": 11, "annotation": "other++", "memory": [{ "variable": "other", "type": "int", "value": "1" }], "output": "" },
                  { "line": 12, "annotation": "p++ moves to \\0", "memory": [], "output": "" },
                  { "line": 7, "annotation": "*p = \\0, loop exits", "memory": [], "output": "" },
                  { "line": 14, "annotation": "printf executes", "memory": [], "output": "Upper=1 Lower=1 Digit=1 Other=1\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 13",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ]
      },
      {
        "title": "WEEK 14",
        "objective": "File I/O, text and binary files, command-line args",
        "tutorial": "Tutorial 14: File Handling",
        "labTitle": "Lab 14: File operations",
        "experiments": [
          {
            "id": "c-w14-1",
            "title": "Write and Read Text File",
            "desc": "Simulate writing to and reading from a text file.",
            "expected": "Read: [input text]",
            "content": {
              "aim": {
                "text": "This experiment introduces file I/O in C using the FILE pointer and the fopen/fprintf/fgets/fclose functions. Students will open a file in write mode (\"w\") using fopen(), write a user-supplied string to it with fprintf(), close the file with fclose() to flush the buffer and release the file handle, reopen the same file in read mode (\"r\"), read the content back using fgets(), close it again, and display the retrieved text on screen. The experiment establishes the complete open–write–close–open–read–close lifecycle that underpins all persistent data storage in C, and explains the consequences of skipping fclose() (data loss through unflushed buffers) and forgetting to check for NULL return from fopen() (crash on invalid path).",
                "bullets": [
                  "Understand the FILE structure and file pointer in C",
                  "Open a file in write mode using fopen()",
                  "Write text to the file using fprintf()",
                  "Close and reopen the file in read mode",
                  "Read content back using fgets() and display it"
                ]
              },
              "theory": [
                {
                  "title": "What is a File in C?",
                  "body": ["A file is a named storage location on disk. Unlike variables which live in RAM and disappear when the program ends, files persist data permanently. C provides standard library functions for file operations through the stdio.h header."]
                },
                {
                  "title": "FILE Pointer",
                  "body": ["FILE is a structure defined in stdio.h that holds all information about an open file. You always use a pointer to FILE: FILE *f. This pointer is returned by fopen() and used in all subsequent file operations."]
                },
                {
                  "title": "fopen() — Opening a File",
                  "body": ["fopen(filename, mode) opens a file and returns a FILE pointer.\nCommon modes:\n\"w\" : Write — creates file or overwrites existing\n\"r\" : Read — opens existing file for reading\n\"a\" : Append — adds to end of existing file\n\"rb\" : Read binary\n\"wb\" : Write binary\nAlways check if fopen returned NULL — NULL means the file could not be opened."]
                },
                {
                  "title": "fprintf() — Writing to File",
                  "body": ["Works exactly like printf() but writes to a file instead of screen. First argument is the FILE pointer."]
                },
                {
                  "title": "fgets() — Reading from File",
                  "body": ["fgets(buffer, size, filepointer) reads one line from the file into buffer. Stops at newline or size-1 characters. Returns NULL at end of file."]
                },
                {
                  "title": "fclose() — Closing a File",
                  "body": ["Always close files after use with fclose(). This flushes the write buffer to disk and releases the file handle. Not closing a file can cause data loss or corruption."]
                },
                {
                  "title": "Text File vs Binary File",
                  "body": ["Text files store data as human-readable ASCII characters. Binary files store raw bytes. For this experiment we use text mode."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read Theory and understand the file operation sequence — open write close open read close",
                "Note that you must close the file before reopening it in a different mode",
                "Go to Simulation tab and observe the file being created on disk step by step",
                "Watch the FILE pointer being assigned and how fprintf writes bytes to disk",
                "Watch the file being reopened in read mode and fgets reading back the content",
                "Go to Code Test tab — starter code pre-loaded",
                "In Stdin enter a line of text — example: Hello JNTUGV",
                "Click Run Code",
                "Verify output: Read: Hello JNTUGV",
                "Try with longer sentences and verify they are written and read back correctly. Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    FILE *f;\n    char text[100] = \"Hello JNTUGV\";\n    f = fopen(\"test.txt\", \"w\");\n    fprintf(f, \"%s\", text);\n    fclose(f);\n    \n    f = fopen(\"test.txt\", \"r\");\n    fgets(text, 100, f);\n    fclose(f);\n    printf(\"Read: %s\\n\", text);\n    return 0;\n}",
                "steps": [
                  { "line": 5, "annotation": "Input stored in memory", "memory": [{ "variable": "text", "type": "char[]", "value": "\"Hello JNTUGV\"" }], "output": "" },
                  { "line": 6, "annotation": "fopen(\"test.txt\", \"w\") called", "memory": [{ "variable": "f", "type": "FILE*", "value": "file pointer" }], "output": "" },
                  { "line": 7, "annotation": "fprintf writes to test.txt", "memory": [], "output": "" },
                  { "line": 8, "annotation": "fclose(f) called. Buffer flushed", "memory": [], "output": "" },
                  { "line": 10, "annotation": "fopen(\"test.txt\", \"r\") called", "memory": [{ "variable": "f", "type": "FILE*", "value": "file pointer" }], "output": "" },
                  { "line": 11, "annotation": "fgets reads content into text[]", "memory": [], "output": "" },
                  { "line": 12, "annotation": "fclose(f) called", "memory": [], "output": "" },
                  { "line": 13, "annotation": "printf executes", "memory": [], "output": "Read: Hello JNTUGV\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 14",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            "id": "c-w14-2",
            "title": "Count Lines Words Characters",
            "desc": "Read a file and output the count of lines, words, and characters.",
            "expected": "Lines=X Words=X Chars=X",
            "content": {
              "aim": {
                "text": "This experiment implements a file analysis tool that mirrors the behaviour of the Unix wc command by counting the number of lines, words, and characters in a text file. Students will write sample text to a file, then read it back one character at a time using fgetc(), detecting EOF as the loop termination condition. Lines are counted by detecting '\\n' characters; words are counted by tracking transitions from whitespace to non-whitespace using a previous-character variable; characters are counted for every byte read. The experiment deepens understanding of fgetc()'s int return type (required to represent EOF = -1), the character-by-character file traversal pattern, and how simple state tracking with a single previous-character variable is sufficient to detect word boundaries.",
                "bullets": [
                  "Write multi-line text to a file using fprintf()",
                  "Read the file character by character using fgetc()",
                  "Count lines by detecting newline characters",
                  "Count words by detecting transitions from whitespace to non-whitespace",
                  "Count total characters read",
                  "Display all three counts as formatted output"
                ]
              },
              "theory": [
                {
                  "title": "fgetc() — Reading One Character at a Time",
                  "body": ["fgetc(filepointer) reads one character from the file and advances the file position. Returns the character as an int. Returns EOF (End Of File) which is -1 when there are no more characters to read. This is why the return type is int not char — to accommodate EOF which is outside the char range."]
                },
                {
                  "title": "EOF Detection",
                  "body": ["The while loop condition while((c = fgetc(f)) != EOF) reads one character into c and continues as long as c is not EOF. This is the standard idiomatic pattern for reading files character by character in C."]
                },
                {
                  "title": "Counting Lines",
                  "body": ["Every time a newline character \\n is encountered increment the lines counter. If the file has content after the last newline an additional count may be needed. For simplicity we add 1 to lines if the file is non-empty to count the last line."]
                },
                {
                  "title": "Counting Words",
                  "body": ["A word starts when a non-whitespace character follows a whitespace character or the beginning of file. Track the previous character as prev. When current character is not space or newline AND previous character was space or newline increment word counter."]
                },
                {
                  "title": "Counting Characters",
                  "body": ["Increment character counter for every character read including spaces and newlines. This gives total raw character count."]
                },
                {
                  "title": "Difference from wc Command",
                  "body": ["This program mirrors the behavior of the Unix wc command which is used to count lines words and characters in files."]
                }
              ],
              "pretest": [],
              "procedure": [
                "Read Theory and understand how word detection works using the prev character technique",
                "Write on paper: \"Hi JNTU\\nBye\\n\" and manually count lines=2, words=3, chars=13",
                "Trace the loop character by character and verify your counts",
                "Go to Simulation tab and click Start",
                "Press Next and watch fgetc() read one character at a time",
                "Observe how lines counter increments at each \\n",
                "Observe how words counter increments at the start of each new word",
                "Watch the chars counter increment at every step",
                "Go to Code Test tab — starter code pre-loaded",
                "Enter text in Stdin — example: Hello World",
                "Click Run Code",
                "Verify output shows correct Lines Words Chars counts",
                "Try multi-word input and recount manually to verify. Proceed to Posttest"
              ],
              "simulation": {
                "code": "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"Hi Bye\");\n    fclose(f);\n    \n    f = fopen(\"temp.txt\", \"r\");\n    int c, chars = 0, words = 0, lines = 0, prev = ' ';\n    while ((c = fgetc(f)) != EOF) {\n        chars++;\n        if (c == '\\n') lines++;\n        if (c != ' ' && c != '\\n' && (prev == ' ' || prev == '\\n')) words++;\n        prev = c;\n    }\n    if (chars > 0 && prev != '\\n') lines++;\n    fclose(f);\n    printf(\"Lines=%d Words=%d Chars=%d\\n\", lines, words, chars);\n    return 0;\n}",
                "steps": [
                  { "line": 5, "annotation": "File written and closed", "memory": [], "output": "" },
                  { "line": 8, "annotation": "File opened in read mode", "memory": [], "output": "" },
                  { "line": 9, "annotation": "Ready to read", "memory": [{ "variable": "chars", "type": "int", "value": "0" }, { "variable": "words", "type": "int", "value": "0" }, { "variable": "lines", "type": "int", "value": "0" }], "output": "" },
                  { "line": 10, "annotation": "Read 'H'", "memory": [{ "variable": "chars", "type": "int", "value": "1" }, { "variable": "words", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "Read 'i'", "memory": [{ "variable": "chars", "type": "int", "value": "2" }, { "variable": "words", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "Read space", "memory": [{ "variable": "chars", "type": "int", "value": "3" }, { "variable": "words", "type": "int", "value": "1" }], "output": "" },
                  { "line": 10, "annotation": "Read 'B'", "memory": [{ "variable": "chars", "type": "int", "value": "4" }, { "variable": "words", "type": "int", "value": "2" }], "output": "" },
                  { "line": 10, "annotation": "Read 'y' and 'e'", "memory": [{ "variable": "chars", "type": "int", "value": "6" }, { "variable": "words", "type": "int", "value": "2" }], "output": "" },
                  { "line": 16, "annotation": "fgetc returns EOF, loop exits", "memory": [{ "variable": "lines", "type": "int", "value": "1" }], "output": "" },
                  { "line": 18, "annotation": "printf executes", "memory": [], "output": "Lines=1 Words=2 Chars=6\n" }
                ]
              },
              "posttest": [],
              "references": [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 14",
                "GCC Documentation on File I/O: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          }
        ]
      }
    ]
  },
  "python": pythonCourse,
  "dbms": dbmsCourse,
  "advanced-data-structures": adsCourse,
  "mathematics-for-emerging-technologies": mathCourse,
  "machine-learning": {
    id: "machine-learning",
    title: "Machine Learning Lab",
    shortNotes: mlShortNotes,
    objectives: [
      "To provide students with a practical understanding of core machine learning algorithms and their applications.",
      "To enable students to preprocess, clean, and prepare real-world datasets for machine learning tasks.",
      "To help students implement and evaluate supervised learning algorithms including classification and regression techniques.",
      "To familiarize students with unsupervised learning techniques such as clustering and expectation maximization.",
      "To develop the ability to tune algorithm parameters and evaluate model performance using appropriate metrics.",
      "To expose students to tools and libraries commonly used in the machine learning ecosystem such as Python (scikit-learn, NumPy, pandas), R, and Weka.",
      "To strengthen analytical and problem-solving skills by applying machine learning models to diverse datasets.",
      "To prepare students for advanced topics in deep learning, data science, and AI-driven applications."
    ],
    introduction: [
      "Machine Learning is a branch of Artificial Intelligence that enables systems to learn from data, identify patterns, and make decisions with minimal human intervention. It has become one of the most transformative technologies in fields such as healthcare, finance, e-commerce, computer vision, and natural language processing.",
      "This virtual laboratory provides a hands-on learning environment for students to explore and experiment with core machine learning algorithms and techniques using Python, R, or Weka. The lab is designed to bridge the gap between theoretical concepts taught in classrooms and their practical implementation on real-world datasets.",
      "Through a series of guided experiments, students will gain experience in data preprocessing, supervised learning, unsupervised learning, classification, regression, and clustering techniques. The experiments are structured progressively, starting from fundamental statistical measures and advancing to complex neural network and clustering algorithms.",
      "This lab is developed to support undergraduate and postgraduate students pursuing courses in Machine Learning, Data Science, Artificial Intelligence, and related disciplines."
    ],
    targetAudience: {
      primary: "Undergraduate students (B.Tech / B.E. / B.Sc.) pursuing courses in Computer Science, Information Technology, Electronics, or related engineering disciplines.",
      prerequisites: [
        "Programming fundamentals (preferably Python or R)",
        "Mathematics including statistics, probability, and linear algebra",
        "Basic concepts of data structures and algorithms"
      ],
      usefulFor: [
        "Postgraduate students (M.Tech / M.E. / M.Sc. / MCA) specializing in Artificial Intelligence, Machine Learning, Data Science, or Computer Applications.",
        "Research scholars and academicians who wish to explore and demonstrate machine learning concepts in a simulated environment.",
        "Faculty members who want to use the lab as a supplementary teaching tool to reinforce classroom learning.",
        "Professionals and self-learners who seek structured, experiment-based exposure to machine learning algorithms."
      ]
    },
    alignment: {
      university: "Various Universities Globally",
      department: "Computer Science and Engineering / IT",
      course: "Machine Learning Lab",
      credits: "L:0 T:0 P:3 C:1.5",
      yearSem: "Third / Fourth Year",
      branches: "CSE, IT, AI&DS, ECE",
      totalExperiments: "14 Guided Experiments",
      compiler: "Python 3 Runtime Environment",
      units: [
        { unit: "Unit I", topics: "Statistical Foundations, Data Preprocessing", weeks: "Week 1–2" },
        { unit: "Unit II", topics: "Instance-Based Learning, Tree-Based Models, Ensemble Methods", weeks: "Week 3–6" },
        { unit: "Unit III", topics: "Probabilistic Learning, Kernel Methods, Linear Models", weeks: "Week 7–10" },
        { unit: "Unit IV", topics: "Neural Networks", weeks: "Week 11" },
        { unit: "Unit V", topics: "Clustering Algorithms", weeks: "Week 12–14" }
      ]
    },
    weeks: [
      {
        title: "WEEK 1",
        objective: "Understand and compute essential statistical metrics that summarize datasets.",
        tutorial: "Tutorial 1: Statistical Foundations",
        labTitle: "Lab 1: Descriptive Statistics",
        experiments: [
          {
            id: "ml-w1-1",
            title: "Compute Central Tendency and Dispersion",
            desc: "Compute Central Tendency Measures: Mean, Median, Mode. Measure of Dispersion: Variance, Standard Deviation.",
            expected: "Successfully computed Mean, Median, Mode, Variance, and Standard Deviation for the given dataset.",
            content: {
              aim: {
                text: "To compute the measures of central tendency namely Mean, Median, and Mode, and measures of dispersion namely Variance and Standard Deviation for a given dataset using Python / R / Weka, and to interpret the statistical significance of each measure in understanding the distribution of data."
              },
              theory: [
                {
                  title: "1. Descriptive Statistics",
                  body: [
                    "Descriptive statistics summarize and describe the main features of a dataset. They provide simple summaries about the sample and the measures, forming the basis of quantitative analysis.",
                    "Descriptive statistics are broadly divided into two categories:",
                    "• Measures of Central Tendency — describe the center or typical value of a dataset",
                    "• Measures of Dispersion — describe the spread or variability of a dataset"
                  ]
                },
                {
                  title: "2. Measures of Central Tendency",
                  body: [
                    "2.1 Mean (Arithmetic Mean)",
                    "The mean is the sum of all values in the dataset divided by the total number of values. It is the most commonly used measure of central tendency.",
                    "Formula: Mean (μ) = (x₁ + x₂ + x₃ + ... + xₙ) / n",
                    "Properties: Sensitive to extreme values (outliers), Uses all data points in its calculation, Best used for normally distributed data.",
                    "2.2 Median",
                    "The median is the middle value of a dataset when the values are arranged in ascending or descending order. If the number of observations is even, the median is the average of the two middle values.",
                    "Formula: If n is odd: Median = value at position (n+1)/2. If n is even: Median = average of values at positions n/2 and (n/2)+1.",
                    "Properties: Not affected by outliers, Best used for skewed distributions, Divides the dataset into two equal halves.",
                    "2.3 Mode",
                    "The mode is the value that appears most frequently in a dataset. A dataset can have no mode, one mode (unimodal), two modes (bimodal), or more than two modes (multimodal).",
                    "Properties: Can be used for both numerical and categorical data, Not affected by extreme values, May not exist or may not be unique."
                  ]
                },
                {
                  title: "3. Measures of Dispersion",
                  body: [
                    "3.1 Variance",
                    "Variance measures how far each data point in the dataset is from the mean. It is the average of the squared differences from the mean.",
                    "Formula: Population Variance (σ²) = Σ(xᵢ - μ)² / n, Sample Variance (s²) = Σ(xᵢ - x̄)² / (n - 1)",
                    "Properties: Always non-negative, A variance of 0 means all values are identical, Higher variance indicates greater spread.",
                    "3.2 Standard Deviation",
                    "Standard deviation is the square root of variance. It expresses the spread of data in the same units as the original data, making it more interpretable than variance.",
                    "Formula: Population Standard Deviation (σ) = √(σ²), Sample Standard Deviation (s) = √(s²)",
                    "Properties: Expressed in the same unit as the data, A low standard deviation means values are close to the mean, A high standard deviation means values are spread out widely."
                  ]
                },
                {
                  title: "4. Relationship Between Measures",
                  body: [
                    "Mean - Central Tendency - Sensitive to Outliers - Best Used When Data is symmetric",
                    "Median - Central Tendency - Not Sensitive to Outliers - Best Used When Data is skewed",
                    "Mode - Central Tendency - Not Sensitive to Outliers - Best Used When Categorical / Frequency data",
                    "Variance - Dispersion - Sensitive to Outliers - Best Used When Comparing spread across datasets",
                    "Standard Deviation - Dispersion - Sensitive to Outliers - Best Used When Interpreting spread in original units"
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment from the available options: Python (using NumPy, pandas, SciPy), R (using base functions), Weka (using the Explorer interface).",
                "Step 2: Load or Enter the Dataset. You may either enter a custom dataset manually using the input field provided, or Select a sample dataset from the dropdown list available in the simulation panel.",
                "Step 3: Inspect the Dataset. View the raw data values displayed in the table. Note the number of observations (n), the minimum value, and the maximum value.",
                "Step 4: Compute Measures of Central Tendency. Click the Compute Mean button to calculate and display the arithmetic mean. Click the Compute Median button to sort the data and identify the middle value. Click the Compute Mode button to identify the most frequently occurring value(s).",
                "Step 5: Compute Measures of Dispersion. Click the Compute Variance button to calculate variance using both population and sample formulas. Click the Compute Standard Deviation button to derive the standard deviation.",
                "Step 6: Visualize the Results. Observe the histogram or frequency distribution chart generated from the dataset. The mean, median, and mode values will be highlighted on the chart with distinct markers.",
                "Step 7: Interpret the Output. Compare the mean, median, and mode values. Analyze whether the distribution is symmetric, positively skewed, or negatively skewed based on the relationship between these values. Note the spread of the data from the variance and standard deviation values.",
                "Step 8: Change the Dataset. Modify the input data or select a different sample dataset to observe how the statistics change. Repeat Steps 3 to 7.",
                "Step 9: Record Observations. Note your computed values in the observation table provided. Answer the post-test questions based on your understanding."
              ],
              simulation: {
                code: "import numpy as np\nfrom scipy import stats\n\n# Dataset: 4, 7, 13, 2, 7, 9, 7, 3, 5, 11\ndata = [4, 7, 13, 2, 7, 9, 7, 3, 5, 11]\n\nmean = np.mean(data)\nmedian = np.median(data)\nmode = stats.mode(data, keepdims=False)[0]\n\nvar_pop = np.var(data)\nvar_sample = np.var(data, ddof=1)\n\nstd_pop = np.std(data)\nstd_sample = np.std(data, ddof=1)\n\nprint(f'Mean: {mean}')\nprint(f'Median: {median}')\nprint(f'Mode: {mode}')\nprint(f'Variance (Pop): {var_pop}')\nprint(f'Variance (Sample): {var_sample}')\nprint(f'Std Dev (Pop): {std_pop}')\nprint(f'Std Dev (Sample): {std_sample}')\n",
                steps: [
                  { line: 1, annotation: "Import numpy and scipy.stats", memory: [], output: "" },
                  { line: 5, annotation: "Load the dataset", memory: [{variable: "data", type: "list", value: "[4, 7, 13, 2, 7, 9, 7, 3, 5, 11]"}], output: "" },
                  { line: 7, annotation: "Compute Mean", memory: [{variable: "mean", type: "float", value: "6.8"}], output: "" },
                  { line: 8, annotation: "Compute Median", memory: [{variable: "median", type: "float", value: "7.0"}], output: "" },
                  { line: 9, annotation: "Compute Mode", memory: [{variable: "mode", type: "float", value: "7.0"}], output: "" },
                  { line: 11, annotation: "Compute Population Variance", memory: [{variable: "var_pop", type: "float", value: "10.16"}], output: "" },
                  { line: 12, annotation: "Compute Sample Variance", memory: [{variable: "var_sample", type: "float", value: "11.288"}], output: "" },
                  { line: 14, annotation: "Compute Population Std Dev", memory: [{variable: "std_pop", type: "float", value: "3.187"}], output: "" },
                  { line: 15, annotation: "Compute Sample Std Dev", memory: [{variable: "std_sample", type: "float", value: "3.360"}], output: "" },
                  { line: 17, annotation: "Print outputs", memory: [], output: "Mean: 6.8\nMedian: 7.0\nMode: 7.0\nVariance (Pop): 10.16\nVariance (Sample): 11.288888888888888\nStd Dev (Pop): 3.1874754901019623\nStd Dev (Sample): 3.3598941782267675" }
                ]
              },
              pretest: [],
              posttest:[]
            }
          }
        ]
      },
      {
        title: "WEEK 2",
        objective: "Learn to clean and prepare raw data for machine learning models.",
        tutorial: "Tutorial 2: Data Preprocessing",
        labTitle: "Lab 2: Data Cleaning & Feature Selection",
        experiments: [
          {
            id: "ml-w2-1",
            title: "Data Pre-processing Techniques",
            desc: "Apply the following Pre-processing techniques for a given dataset: a. Attribute Selection b. Handling Missing Values c. Discretization d. Elimination of Outliers.",
            expected: "Dataset successfully cleaned, missing values handled, continuous variables discretized, and outliers eliminated.",
            content: {
              aim: {
                text: "To apply various data preprocessing techniques on a given raw dataset, including Attribute Selection, Handling Missing Values, Discretization, and Elimination of Outliers, using Python / R / Weka, and to understand the importance of clean and well-prepared data in building effective machine learning models."
              },
              theory: [
                {
                  title: "1. Introduction to Data Preprocessing",
                  body: [
                    "Real-world data is often incomplete, inconsistent, noisy, and unstructured. Feeding such raw data directly into a machine learning model leads to poor performance, inaccurate predictions, and unreliable results. Data preprocessing is the step that transforms raw data into a format that is suitable for machine learning.",
                    "The key goals of data preprocessing are:",
                    "• To improve the quality of data",
                    "• To reduce redundancy and irrelevant information",
                    "• To make the data consistent and complete",
                    "• To improve the accuracy and efficiency of the machine learning model"
                  ]
                },
                {
                  title: "2. Attribute Selection (Feature Selection)",
                  body: [
                    "Attribute selection, also known as Feature Selection, is the process of identifying and selecting the most relevant attributes (features) from the dataset and removing irrelevant or redundant ones.",
                    "Why Attribute Selection is Important:",
                    "• Reduces the dimensionality of the dataset",
                    "• Decreases model training time",
                    "• Reduces the risk of overfitting",
                    "• Improves model accuracy and interpretability",
                    "Common Methods of Attribute Selection:",
                    "• Filter Method: Selects features based on statistical scores independent of any machine learning algorithm (e.g., Correlation, Chi-Square test).",
                    "• Wrapper Method: Uses a machine learning algorithm to evaluate feature subsets and selects the best performing combination (e.g., Recursive Feature Elimination).",
                    "• Embedded Method: Feature selection is performed as part of the model training process (e.g., LASSO Regression, Decision Trees).",
                    "Correlation-Based Selection:",
                    "• If two features have high correlation with each other but low correlation with the target variable, one can be removed.",
                    "• Features with near-zero variance carry little information and can be dropped."
                  ]
                },
                {
                  title: "3. Handling Missing Values",
                  body: [
                    "Missing values occur when no data value is stored for a variable in an observation. This can happen due to data entry errors, equipment malfunctions, or survey non-responses.",
                    "Types of Missing Data:",
                    "• Missing Completely at Random (MCAR): Missingness has no relationship with any variable.",
                    "• Missing at Random (MAR): Missingness is related to observed data but not to the missing value itself.",
                    "• Missing Not at Random (MNAR): Missingness is related to the unobserved (missing) value itself.",
                    "Techniques to Handle Missing Values:",
                    "• Deletion (Listwise): Remove rows with missing values. Best Used When: Very few rows have missing values.",
                    "• Mean Imputation: Replace missing value with column mean. Best Used When: Data is numerical and normally distributed.",
                    "• Median Imputation: Replace missing value with column median. Best Used When: Data is numerical and skewed.",
                    "• Mode Imputation: Replace missing value with column mode. Best Used When: Data is categorical.",
                    "• Forward/Backward Fill: Fill with the previous or next observed value. Best Used When: Time-series data.",
                    "• Predictive Imputation: Use a regression or KNN model to predict the missing value. Best Used When: Complex datasets with patterns."
                  ]
                },
                {
                  title: "4. Discretization",
                  body: [
                    "Discretization is the process of converting continuous numerical attributes into discrete categorical intervals or bins. This is also called binning.",
                    "Why Discretization is Used:",
                    "• Some machine learning algorithms work better with categorical data.",
                    "• Reduces the effect of minor observation errors.",
                    "• Simplifies the model and makes it more interpretable.",
                    "• Helps in handling outliers indirectly.",
                    "Types of Discretization:",
                    "• Equal Width Binning: Divides the range of data into equal-sized intervals (e.g., Age: 0–20, 21–40).",
                    "• Equal Frequency Binning: Each bin contains approximately the same number of data points (e.g., Quartile-based binning).",
                    "• Custom / Domain-Based Binning: Intervals defined based on domain knowledge (e.g., Income: Low, Medium, High)."
                  ]
                },
                {
                  title: "5. Elimination of Outliers",
                  body: [
                    "An outlier is a data point that differs significantly from other observations in the dataset. Outliers can distort statistical measures and negatively impact model performance.",
                    "Sources of Outliers: Data entry errors, Measurement errors, Natural variability in the data, Experimental errors.",
                    "Methods to Detect Outliers:",
                    "• Z-Score Method: A data point is an outlier if its Z-Score is beyond ±3 standard deviations from the mean.",
                    "• IQR Method: Values below Q1 − 1.5×IQR or above Q3 + 1.5×IQR are considered outliers.",
                    "• Box Plot: Visual method; data points plotted beyond the whiskers are outliers.",
                    "• Scatter Plot: Visual inspection of data distribution to identify extreme values.",
                    "IQR Method Formula:",
                    "• Q1 = 25th Percentile, Q3 = 75th Percentile, IQR = Q3 − Q1",
                    "• Lower Bound = Q1 − 1.5 × IQR, Upper Bound = Q3 + 1.5 × IQR",
                    "Handling Outliers:",
                    "• Remove the outlier record entirely.",
                    "• Cap the value at the lower or upper bound (Winsorization).",
                    "• Replace with mean or median.",
                    "• Keep the outlier if it represents genuine data."
                  ]
                },
                {
                  title: "6. Summary of Data Preprocessing Pipeline",
                  body: [
                    "Raw Data → Attribute Selection → Handle Missing Values → Discretization → Outlier Elimination → Preprocessed Clean Data → Machine Learning Model"
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment from the available options (Python, R, Weka).",
                "Step 2: Load the Dataset. Select a sample dataset from the dropdown list provided in the simulation panel. View the raw dataset in the data preview table.",
                "Step 3: Attribute Selection. View all available attributes (columns). Select the attributes to KEEP. Deselect irrelevant attributes.",
                "Step 4: Handle Missing Values. The simulation highlights cells with missing values in red. Choose a strategy (Remove rows, Replace with Mean/Median/Mode).",
                "Step 5: Discretization. Select a continuous numerical attribute. Choose the type of binning and number of bins.",
                "Step 6: Eliminate Outliers. Select a numerical attribute. Choose detection method (Z-Score or IQR). Choose handling strategy (Remove, Cap, Replace).",
                "Step 7: View Preprocessed Dataset. View the final cleaned dataset in the output table. Compare Before and After statistics.",
                "Step 8: Download / Export Results. Save the cleaned data as a CSV file.",
                "Step 9: Record Observations and Attempt Post-Test."
              ],
              simulation: {
                code: "import pandas as pd\nimport numpy as np\n\n# Load Data\ndata = pd.DataFrame({'Age': [25, np.nan, 22, 120, 28], 'Salary': [50000, 60000, 55000, 200000, np.nan]})\n\n# Handle Missing Values\nmean_age = data['Age'].mean()\ndata['Age'].fillna(mean_age, inplace=True)\n\nmedian_salary = data['Salary'].median()\ndata['Salary'].fillna(median_salary, inplace=True)\n\n# Outlier Elimination (Age < 100)\ndata = data[data['Age'] < 100]\n\nprint(\"Preprocessing Complete\")\nprint(data)",
                steps: [
                  { line: 1, annotation: "Import pandas and numpy", memory: [], output: "" },
                  { line: 5, annotation: "Load the raw dataset with missing values and outliers", memory: [{variable: "data", type: "DataFrame", value: "5 rows, 2 cols"}], output: "" },
                  { line: 8, annotation: "Calculate Mean Age", memory: [{variable: "mean_age", type: "float", value: "48.75"}], output: "" },
                  { line: 9, annotation: "Fill missing Age with Mean", memory: [{variable: "data['Age']", type: "Series", value: "Updated"}], output: "" },
                  { line: 11, annotation: "Calculate Median Salary", memory: [{variable: "median_salary", type: "float", value: "57500.0"}], output: "" },
                  { line: 12, annotation: "Fill missing Salary with Median", memory: [{variable: "data['Salary']", type: "Series", value: "Updated"}], output: "" },
                  { line: 15, annotation: "Filter out Age outliers (>100)", memory: [{variable: "data", type: "DataFrame", value: "4 rows, 2 cols"}], output: "" },
                  { line: 18, annotation: "Print final preprocessed dataset", memory: [], output: "Preprocessing Complete\n    Age   Salary\n0  25.0  50000.0\n1  48.7  60000.0\n2  22.0  55000.0\n4  28.0  57500.0" }
                ]
              },
              pretest:[],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 3",
        objective: "Understand and implement Instance-Based Learning techniques.",
        tutorial: "Tutorial 3: Instance-Based Learning",
        labTitle: "Lab 3: K-Nearest Neighbors",
        experiments: [
          {
            id: "ml-w3-1",
            title: "KNN for Classification and Regression",
            desc: "Apply KNN algorithm for classification and regression on a standard dataset.",
            expected: "Successfully trained and evaluated KNN models for both classification and regression tasks.",
            content: {
              aim: {
                text: "To apply the K-Nearest Neighbors (KNN) algorithm for both Classification and Regression tasks on a given dataset using Python / R / Weka, to evaluate the model performance using appropriate metrics, and to understand the effect of varying the value of K on the model's accuracy and prediction quality."
              },
              theory: [
                {
                  title: "1. Introduction to Instance-Based Learning",
                  body: [
                    "Instance-Based Learning (IBL) is a family of machine learning algorithms that do not build an explicit model during the training phase. Instead, they store all training instances and make predictions by comparing new instances to the stored ones at the time of prediction.",
                    "Key Characteristics of Instance-Based Learning:",
                    "• No training phase — the algorithm is called a Lazy Learner",
                    "• Predictions are made at query time by comparing to stored examples",
                    "• Very sensitive to the local structure of the data",
                    "• Computationally expensive at prediction time",
                    "The most widely used Instance-Based Learning algorithm is K-Nearest Neighbors (KNN)."
                  ]
                },
                {
                  title: "2. K-Nearest Neighbors (KNN) Algorithm",
                  body: [
                    "KNN is a simple, non-parametric, supervised machine learning algorithm that can be used for both classification and regression tasks. The core idea is that similar data points exist close to each other in the feature space.",
                    "Core Assumption: Data points that are close to each other in the feature space are likely to belong to the same class or have similar output values."
                  ]
                },
                {
                  title: "3. Distance Metrics",
                  body: [
                    "The concept of 'nearness' in KNN is measured using distance metrics. The most commonly used are:",
                    "• Euclidean Distance: The straight-line distance between two points in n-dimensional space.",
                    "• Manhattan Distance: The sum of the absolute differences between coordinates of two points.",
                    "• Minkowski Distance: A generalized distance metric that unifies Euclidean and Manhattan distances."
                  ]
                },
                {
                  title: "4. KNN for Classification",
                  body: [
                    "In classification, KNN predicts the class label of a new data point based on the majority class among its K nearest neighbors.",
                    "Steps:",
                    "1. Choose the value of K",
                    "2. Calculate the distance between the new data point and all training data points",
                    "3. Sort the distances in ascending order",
                    "4. Select the top K nearest neighbors",
                    "5. Perform majority voting among the K neighbors",
                    "6. Assign the most frequent class label as the predicted class",
                    "Evaluation Metrics for Classification:",
                    "• Accuracy, Precision, Recall, F1-Score, Confusion Matrix."
                  ]
                },
                {
                  title: "5. KNN for Regression",
                  body: [
                    "In regression, KNN predicts a continuous numerical output for a new data point based on the average (or weighted average) of the output values of its K nearest neighbors.",
                    "Steps:",
                    "1. Choose the value of K",
                    "2. Calculate the distance between the new data point and all training data points",
                    "3. Sort the distances in ascending order",
                    "4. Select the top K nearest neighbors",
                    "5. Compute the average of the output values of the K neighbors",
                    "6. Assign the computed average as the predicted output value",
                    "Evaluation Metrics for Regression:",
                    "• Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), R² Score."
                  ]
                },
                {
                  title: "6. Choosing the Right Value of K",
                  body: [
                    "The value of K is the most critical hyperparameter in KNN. It controls the bias-variance tradeoff:",
                    "• Very Small (K = 1): Low bias, high variance — model overfits, sensitive to noise",
                    "• Very Large (K = n): High bias, low variance — model underfits, ignores local patterns",
                    "• Optimal K: Balanced bias and variance — determined by cross-validation",
                    "General Guidelines:",
                    "• Use odd values of K for binary classification to avoid ties.",
                    "• Use cross-validation or elbow method to find the optimal K."
                  ]
                },
                {
                  title: "7. Feature Scaling in KNN",
                  body: [
                    "Since KNN relies on distance calculations, features with larger scales dominate the distance computation. Therefore, feature scaling is mandatory before applying KNN.",
                    "Common Scaling Techniques:",
                    "• Min-Max Normalization: Scales values to range [0, 1]",
                    "• Z-Score Standardization: Scales to mean 0 and standard deviation 1"
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment.",
                "Step 2: Select Task Type. Choose Classification or Regression.",
                "Step 3: Load the Dataset. Select a dataset from the dropdown list.",
                "Step 4: Explore the Dataset. Review the dataset summary and identify required preprocessing.",
                "Step 5: Preprocess the Data. Apply Min-Max Normalization or Z-Score Standardization. Split the dataset.",
                "Step 6: Set the Value of K. Use the K-value slider (1 to 20). Select the distance metric.",
                "Step 7: Train and Predict. Click the Run KNN button to train the model.",
                "Step 8: Evaluate Performance. View the relevant metrics (Accuracy/F1 for Classification, RMSE/MAE for Regression).",
                "Step 9: Tune the Value of K. Use the K vs Accuracy / K vs RMSE plot to find the optimal K.",
                "Step 10: Visualize Decision Boundary (Classification Only). View the 2D decision boundary plot.",
                "Step 11: Record Observations and Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\nimport numpy as np\n\n# Load Dataset\nX = np.array([[1, 2], [1, 4], [1, 0], [10, 2], [10, 4], [10, 0]])\ny = np.array([0, 0, 0, 1, 1, 1])\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)\n\n# KNN Initialization\nknn = KNeighborsClassifier(n_neighbors=3)\n\n# Train Model\nknn.fit(X_train, y_train)\n\n# Predict\ny_pred = knn.predict(X_test)\n\n# Evaluate\naccuracy = accuracy_score(y_test, y_pred)\nprint(f\"Accuracy: {accuracy * 100}%\")",
                steps: [
                  { line: 1, annotation: "Import sklearn libraries", memory: [], output: "" },
                  { line: 7, annotation: "Load Features (X)", memory: [{variable: "X", type: "ndarray", value: "shape (6, 2)"}], output: "" },
                  { line: 8, annotation: "Load Labels (y)", memory: [{variable: "y", type: "ndarray", value: "shape (6,)"}], output: "" },
                  { line: 11, annotation: "Split data into training and test sets", memory: [{variable: "X_train", type: "ndarray", value: "shape (4, 2)"}, {variable: "X_test", type: "ndarray", value: "shape (2, 2)"}], output: "" },
                  { line: 14, annotation: "Initialize KNN Classifier with K=3", memory: [{variable: "knn", type: "KNeighborsClassifier", value: "n_neighbors=3"}], output: "" },
                  { line: 17, annotation: "Train the model", memory: [{variable: "knn", type: "KNeighborsClassifier", value: "Fitted"}], output: "" },
                  { line: 20, annotation: "Make predictions on test set", memory: [{variable: "y_pred", type: "ndarray", value: "[0, 1]"}], output: "" },
                  { line: 23, annotation: "Calculate accuracy", memory: [{variable: "accuracy", type: "float", value: "1.0"}], output: "" },
                  { line: 24, annotation: "Print final evaluation", memory: [], output: "Accuracy: 100.0%" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 4",
        objective: "Construct and tune Decision Trees for classification tasks.",
        tutorial: "Tutorial 4: Tree-Based Classification",
        labTitle: "Lab 4: Decision Tree Classifier",
        experiments: [
          {
            id: "ml-w4-1",
            title: "Decision Tree Classification and Tuning",
            desc: "Demonstrate Decision Tree algorithm for a classification problem and perform parameter tuning for better results.",
            expected: "Decision Tree classifier trained, visualized, and optimized using hyperparameter tuning (e.g., max_depth, min_samples_split).",
            content: {
              aim: {
                text: "To implement the Decision Tree algorithm for a classification problem using Python / R / Weka, to visualize the constructed tree, to evaluate the model performance using standard classification metrics, and to perform parameter tuning techniques such as controlling tree depth, minimum samples per split, and pruning to achieve better generalization results."
              },
              theory: [
                {
                  title: "1. Introduction to Decision Trees",
                  body: [
                    "A Decision Tree is a supervised machine learning algorithm that uses a tree-like model of decisions and their possible consequences to perform classification and regression tasks. It mimics human decision-making by splitting data into subsets based on the most significant features at each step.",
                    "Decision Trees are one of the most interpretable and widely used machine learning models. They form the foundation for more powerful ensemble methods such as Random Forest, Gradient Boosting, and XGBoost.",
                    "Key Terminology:",
                    "• Root Node: The topmost node representing the entire dataset and the first split",
                    "• Internal Node: A node that represents a feature test and splits into child nodes",
                    "• Branch: A connection between nodes representing the outcome of a test",
                    "• Leaf Node: A terminal node that holds the final predicted class label",
                    "• Depth: The length of the longest path from the root node to a leaf node",
                    "• Splitting: The process of dividing a node into two or more sub-nodes",
                    "• Pruning: The process of removing branches that provide little predictive power"
                  ]
                },
                {
                  title: "2. How a Decision Tree Works",
                  body: [
                    "The algorithm recursively splits the dataset into subsets based on feature values. At each node, it selects the feature and threshold that best separates the data according to a chosen splitting criterion.",
                    "General Steps:",
                    "1. Start with the entire dataset at the Root Node",
                    "2. Select the best feature to split the data using a splitting criterion",
                    "3. Split the dataset into subsets based on the selected feature and threshold",
                    "4. Repeat the process recursively for each subset",
                    "5. Stop splitting when one of the stopping conditions is met: All instances in a node belong to the same class, Maximum tree depth is reached, Minimum number of samples per node is reached, or No further information gain is possible",
                    "6. Assign the majority class of each leaf node as the prediction"
                  ]
                },
                {
                  title: "3. Splitting Criteria",
                  body: [
                    "The splitting criterion determines which feature and threshold to use at each node to divide the data most effectively.",
                    "3.1 Entropy and Information Gain (ID3 Algorithm)",
                    "Entropy measures the impurity or disorder in a dataset. A pure node (all instances of one class) has entropy = 0.",
                    "Entropy Formula: H(S) = − Σ pᵢ × log₂(pᵢ)",
                    "Information Gain Formula: IG(S, A) = H(S) − Σ (|Sᵥ| / |S|) × H(Sᵥ)",
                    "3.2 Gini Impurity (CART Algorithm)",
                    "Gini Impurity measures the probability of incorrectly classifying a randomly chosen instance if it were randomly labelled according to the class distribution in the node.",
                    "Gini Impurity Formula: Gini(S) = 1 − Σ pᵢ²",
                    "Gini Gain Formula: Gini Gain(S, A) = Gini(S) − Σ (|Sᵥ| / |S|) × Gini(Sᵥ)",
                    "The feature with the lowest Gini Impurity (highest Gini Gain) is selected for splitting."
                  ]
                },
                {
                  title: "4. Popular Decision Tree Algorithms",
                  body: [
                    "• ID3: Information Gain (Entropy), Multi-way split, no handling of missing values",
                    "• C4.5: Gain Ratio, Multi-way split, handles missing values",
                    "• CART: Gini Impurity, Binary split, handles missing values",
                    "• CHAID: Chi-Square Test, Multi-way split, handles missing values"
                  ]
                },
                {
                  title: "5. Overfitting in Decision Trees",
                  body: [
                    "A fully grown Decision Tree tends to overfit the training data by creating very specific rules that do not generalize to unseen data. This happens when the tree is too deep, leaf nodes contain very few samples, or the tree memorizes noise in the training data.",
                    "Signs of Overfitting: Very high training accuracy but low testing accuracy, a very deep and complex tree structure, leaf nodes with only one or two training instances."
                  ]
                },
                {
                  title: "6. Parameter Tuning Techniques",
                  body: [
                    "Parameter tuning (also called Hyperparameter Tuning) is the process of adjusting the model's parameters to reduce overfitting and improve generalization.",
                    "6.1 Pre-Pruning (Early Stopping)",
                    "Pre-Pruning stops the tree from growing by imposing constraints during tree construction.",
                    "• max_depth: Maximum depth of the tree (reduces overfitting)",
                    "• min_samples_split: Minimum samples required to split a node (reduces overfitting)",
                    "• min_samples_leaf: Minimum samples required at a leaf node (reduces overfitting)",
                    "• max_features: Number of features to consider for each split (controls randomness)",
                    "• max_leaf_nodes: Maximum number of leaf nodes allowed (limits tree complexity)",
                    "6.2 Post-Pruning (Cost Complexity Pruning)",
                    "Post-Pruning first grows the full tree and then removes branches that do not improve generalization on the validation set.",
                    "Cost Complexity Pruning (CCP) uses a parameter alpha (α). Higher alpha → more aggressive pruning → simpler tree.",
                    "Pruning Formula: Cost Complexity = Error Rate + α × Number of Leaf Nodes"
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment.",
                "Step 2: Load the Dataset. Select a dataset from the dropdown list.",
                "Step 3: Explore and Preprocess the Dataset. Review the class distribution bar chart and handle any missing values.",
                "Step 4: Set the Train-Test Split. Adjust the slider (default: 80% train, 20% test).",
                "Step 5: Select the Splitting Criterion. Choose Gini Impurity or Entropy.",
                "Step 6: Set Initial Parameters. Leave max_depth: None, min_samples_split: 2, min_samples_leaf: 1.",
                "Step 7: Train the Decision Tree. Click the Train Decision Tree button and observe the fully grown tree visualization.",
                "Step 8: Evaluate the Initial Model. View the Confusion Matrix, Accuracy, Precision, Recall, and F1-Score.",
                "Step 9: Perform Parameter Tuning. Adjust max_depth, min_samples_split, min_samples_leaf, and ccp_alpha.",
                "Step 10: View the Parameter Tuning Plots. Observe the Depth vs Accuracy plot and Alpha vs Accuracy plot.",
                "Step 11: Compare Before and After Tuning. View the side-by-side comparison of tree structure and metrics.",
                "Step 12: Visualize Feature Importance. View the Feature Importance bar chart.",
                "Step 13: Record Observations.",
                "Step 14: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\nimport pandas as pd\n\n# Load Dataset\ndf = pd.DataFrame({'Feature1': [1,2,3,4,5], 'Target': [0,0,1,1,1]})\nX = df[['Feature1']]\ny = df['Target']\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Decision Tree Initialization\ndt = DecisionTreeClassifier(criterion='gini', max_depth=2)\n\n# Train Model\ndt.fit(X_train, y_train)\n\n# Predict\ny_pred = dt.predict(X_test)\n\n# Evaluate\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred) * 100}%\")",
                steps: [
                  { line: 1, annotation: "Import sklearn libraries", memory: [], output: "" },
                  { line: 8, annotation: "Load Features (X)", memory: [{variable: "X", type: "DataFrame", value: "shape (5, 1)"}], output: "" },
                  { line: 9, annotation: "Load Labels (y)", memory: [{variable: "y", type: "Series", value: "shape (5,)"}], output: "" },
                  { line: 12, annotation: "Split data into training and test sets", memory: [{variable: "X_train", type: "DataFrame", value: "shape (4, 1)"}], output: "" },
                  { line: 15, annotation: "Initialize Decision Tree Classifier", memory: [{variable: "dt", type: "DecisionTreeClassifier", value: "max_depth=2"}], output: "" },
                  { line: 18, annotation: "Train the model", memory: [{variable: "dt", type: "DecisionTreeClassifier", value: "Fitted"}], output: "" },
                  { line: 21, annotation: "Make predictions on test set", memory: [{variable: "y_pred", type: "ndarray", value: "[0]"}], output: "" },
                  { line: 24, annotation: "Calculate and print accuracy", memory: [], output: "Accuracy: 100.0%" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 5",
        objective: "Apply Tree-Based Models to predict continuous numerical values.",
        tutorial: "Tutorial 5: Tree-Based Regression",
        labTitle: "Lab 5: Decision Tree Regressor",
        experiments: [
          {
            id: "ml-w5-1",
            title: "Decision Tree for Regression",
            desc: "Demonstrate Decision Tree algorithm for a regression problem.",
            expected: "Decision Tree regressor trained and evaluated using metrics such as Mean Squared Error (MSE).",
            content: {
              aim: {
                text: "To implement the Decision Tree Regressor algorithm for a regression problem using Python / R / Weka, to visualize the constructed regression tree, to evaluate model performance using standard regression metrics such as MAE, MSE, RMSE, and R² Score, and to understand how the tree structure captures non-linear relationships between input features and a continuous target variable."
              },
              theory: [
                {
                  title: "1. Introduction to Decision Tree Regression",
                  body: [
                    "A Decision Tree Regressor is a supervised machine learning model that predicts a continuous numerical output by recursively partitioning the input feature space into rectangular regions and assigning a constant predicted value (the mean of training instances) to each region.",
                    "Unlike linear regression which assumes a linear relationship between features and output, a Decision Tree Regressor can naturally capture non-linear and complex relationships without requiring any transformation of the data.",
                    "Decision Tree Regression forms the backbone of powerful ensemble regression methods such as Random Forest Regressor, Gradient Boosted Trees, and XGBoost."
                  ]
                },
                {
                  title: "2. How Decision Tree Regression Works",
                  body: [
                    "Core Idea: The algorithm divides the feature space into a set of non-overlapping rectangular regions. For a new input data point, the tree traverses from the root to a leaf node based on feature conditions, and the predicted output is the mean of all training instances that fall in that leaf node's region.",
                    "Step-by-Step Process:",
                    "1. Start with all training instances at the Root Node",
                    "2. Select the feature and threshold that minimizes the splitting criterion (MSE or MAE)",
                    "3. Split the dataset into two subsets",
                    "4. Repeat the splitting process recursively for each child node",
                    "5. Stop splitting when a stopping condition is met (maximum depth, minimum samples, etc.)",
                    "6. At each leaf node, assign the mean of the target values of all training instances in that node as the predicted output"
                  ]
                },
                {
                  title: "3. Splitting Criterion for Regression",
                  body: [
                    "Unlike classification trees that use Gini Impurity or Entropy, regression trees use variance-based metrics to select the best split.",
                    "3.1 Mean Squared Error (MSE) — Primary Criterion",
                    "The algorithm selects the split that minimizes the weighted sum of MSE across the two child nodes.",
                    "MSE at a Node Formula: MSE(node) = (1 / n) × Σ (yᵢ − ȳ)²",
                    "Best Split = argmin [ (nₗ / n) × MSE(left) + (nᵣ / n) × MSE(right) ]",
                    "3.2 Mean Absolute Error (MAE) — Alternative Criterion",
                    "MAE is more robust to outliers than MSE and uses the median instead of the mean as the predicted value at each leaf."
                  ]
                },
                {
                  title: "4. Evaluation Metrics for Regression",
                  body: [
                    "• Mean Absolute Error (MAE): Measures the average absolute difference between actual and predicted values. Less sensitive to outliers.",
                    "• Mean Squared Error (MSE): Measures the average squared difference between actual and predicted values. Penalizes large errors more heavily.",
                    "• Root Mean Squared Error (RMSE): The square root of MSE. Expressed in the same units as the target variable making it more interpretable than MSE.",
                    "• R² Score (Coefficient of Determination): Measures the proportion of variance in the target variable that is explained by the model."
                  ]
                },
                {
                  title: "5. Overfitting in Decision Tree Regression",
                  body: [
                    "A fully grown Decision Tree Regressor tends to memorize the training data by creating very specific leaf regions for individual instances, leading to poor generalization.",
                    "Signs of Overfitting in Regression: Very low training MSE / RMSE but high testing MSE / RMSE, Very high training R² but significantly lower testing R², A very deep tree with leaf nodes containing very few instances, Extremely jagged and irregular predicted output curve.",
                    "Controlling Overfitting involves parameters like max_depth, min_samples_split, min_samples_leaf, max_leaf_nodes, and ccp_alpha."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment.",
                "Step 2: Load the Dataset. Select a dataset from the dropdown list.",
                "Step 3: Explore the Dataset. Review the dataset summary and identify required preprocessing.",
                "Step 4: Preprocess the Dataset. Handle any missing values or categorical encodings.",
                "Step 5: Set the Train-Test Split. Adjust the Train-Test Split slider.",
                "Step 6: Select the Splitting Criterion. Choose MSE, MAE, or Friedman MSE.",
                "Step 7: Set Initial Parameters. Leave parameters at default values for the initial run.",
                "Step 8: Train the Decision Tree Regressor. Click the Train Decision Tree Regressor button.",
                "Step 9: Evaluate the Initial Model. View performance metrics (MAE, MSE, RMSE, R²).",
                "Step 10: Observe the Predicted Output Curve. View the Step Function plot.",
                "Step 11: Perform Parameter Tuning. Adjust max_depth, min_samples_split, min_samples_leaf, ccp_alpha.",
                "Step 12: View the Tuning Plots. Observe Depth vs RMSE and Alpha vs R².",
                "Step 13: Compare Before and After Tuning. View the side-by-side comparisons.",
                "Step 14: Visualize Feature Importance.",
                "Step 15: Record Observations.",
                "Step 16: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.tree import DecisionTreeRegressor\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import mean_squared_error\nimport pandas as pd\n\n# Load Dataset\ndf = pd.DataFrame({'Feature1': [1,2,3,4,5], 'Target': [10.5, 20.1, 30.5, 40.2, 50.8]})\nX = df[['Feature1']]\ny = df['Target']\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Decision Tree Initialization\ndt = DecisionTreeRegressor(criterion='squared_error', max_depth=3)\n\n# Train Model\ndt.fit(X_train, y_train)\n\n# Predict\ny_pred = dt.predict(X_test)\n\n# Evaluate\nmse = mean_squared_error(y_test, y_pred)\nprint(f\"MSE: {mse}\")",
                steps: [
                  { line: 1, annotation: "Import sklearn libraries", memory: [], output: "" },
                  { line: 8, annotation: "Load Features (X)", memory: [{variable: "X", type: "DataFrame", value: "shape (5, 1)"}], output: "" },
                  { line: 9, annotation: "Load Labels (y)", memory: [{variable: "y", type: "Series", value: "shape (5,)"}], output: "" },
                  { line: 12, annotation: "Split data into training and test sets", memory: [{variable: "X_train", type: "DataFrame", value: "shape (4, 1)"}], output: "" },
                  { line: 15, annotation: "Initialize Decision Tree Regressor", memory: [{variable: "dt", type: "DecisionTreeRegressor", value: "max_depth=3"}], output: "" },
                  { line: 18, annotation: "Train the model", memory: [{variable: "dt", type: "DecisionTreeRegressor", value: "Fitted"}], output: "" },
                  { line: 21, annotation: "Make predictions on test set", memory: [{variable: "y_pred", type: "ndarray", value: "[20.1]"}], output: "" },
                  { line: 24, annotation: "Calculate and print MSE", memory: [], output: "MSE: 0.0" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 6",
        objective: "Improve model accuracy and robustness using Ensemble Learning.",
        tutorial: "Tutorial 6: Ensemble Methods",
        labTitle: "Lab 6: Random Forests",
        experiments: [
          {
            id: "ml-w6-1",
            title: "Random Forest Algorithm",
            desc: "Apply Random Forest algorithm for classification and regression.",
            expected: "Random Forest models successfully applied to both classification and regression tasks, demonstrating improved performance over single trees.",
            content: {
              aim: {
                text: "To implement the Random Forest algorithm for both Classification and Regression tasks on a given dataset using Python / R / Weka, to evaluate model performance using appropriate metrics, to analyze the effect of key hyperparameters such as the number of trees and maximum features on model performance, and to understand how ensemble learning improves accuracy and reduces overfitting compared to a single Decision Tree."
              },
              theory: [
                {
                  title: "1. Introduction to Ensemble Learning",
                  body: [
                    "Ensemble Learning is a machine learning paradigm where multiple individual models (called base learners or weak learners) are trained and their predictions are combined to produce a final output that is more accurate and robust than any single model alone.",
                    "The core motivation behind ensemble learning is the principle that a group of diverse, moderately accurate models collectively outperforms any individual model.",
                    "Three Main Ensemble Strategies:",
                    "• Bagging: Train multiple models in parallel on different bootstrap samples and aggregate predictions (e.g. Random Forest).",
                    "• Boosting: Train models sequentially where each model corrects the errors of the previous one (e.g. AdaBoost, XGBoost).",
                    "• Stacking: Train multiple models and use another model (meta-learner) to combine their predictions."
                  ]
                },
                {
                  title: "2. Bagging (Bootstrap Aggregating)",
                  body: [
                    "Bagging is the foundational technique behind Random Forest. It works by:",
                    "1. Creating multiple bootstrap samples from the original training dataset",
                    "2. Training an independent base learner (Decision Tree) on each bootstrap sample",
                    "3. Aggregating the predictions of all base learners into a final prediction",
                    "Bootstrap Sampling: A bootstrap sample is created by randomly drawing n instances from the training dataset with replacement. On average, each bootstrap sample contains approximately 63.2% of unique training instances. The remaining 36.8% are Out-Of-Bag (OOB) instances.",
                    "Effect of Bagging: Reduces variance without significantly increasing bias, stabilizes predictions, and naturally resists overfitting."
                  ]
                },
                {
                  title: "3. Random Forest Algorithm",
                  body: [
                    "Random Forest builds a large collection of decorrelated Decision Trees using two key sources of randomness:",
                    "1. Bootstrap Sampling — Each tree is trained on a different random bootstrap sample.",
                    "2. Random Feature Selection — At each node split, only a random subset of features is considered.",
                    "These sources of randomness ensure individual trees are diverse and decorrelated, making the ensemble powerful."
                  ]
                },
                {
                  title: "4. Random Feature Selection",
                  body: [
                    "Instead of selecting the best split from all available features, Random Forest selects from a random subset (max_features).",
                    "Default Values:",
                    "• Classification: √p (square root of total features)",
                    "• Regression: p/3 (one-third of total features)",
                    "Why it works: By limiting features at each split, trees are forced to use different features, creating diversity. Diverse trees make different errors, which cancel out when aggregated."
                  ]
                },
                {
                  title: "5. Evaluation and Features",
                  body: [
                    "Classification Final Prediction: Majority voting across all trees. Metrics: Accuracy, Precision, Recall, F1-Score, ROC-AUC.",
                    "Regression Final Prediction: Average of all individual tree predictions. Metrics: MAE, MSE, RMSE, R².",
                    "Out-Of-Bag (OOB) Evaluation: Uses OOB instances to evaluate the tree's performance without a separate validation set.",
                    "Feature Importance: Measures how much each feature contributes to reducing impurity across all trees."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool (Python, R, or Weka).",
                "Step 2: Select Task Type (Classification or Regression).",
                "Step 3: Load the Dataset (e.g., Heart Disease, House Price).",
                "Step 4: Explore the Dataset.",
                "Step 5: Preprocess the Dataset.",
                "Step 6: Set the Train-Test Split.",
                "Step 7: Configure Initial Parameters.",
                "Step 8: Train the Random Forest.",
                "Step 9: Evaluate the Initial Model.",
                "Step 10: Analyze OOB Score.",
                "Step 11: Visualize Feature Importance.",
                "Step 12: Perform Hyperparameter Tuning.",
                "Step 13: View the Tuning Plots.",
                "Step 14: Compare Random Forest vs Single Decision Tree.",
                "Step 15: Visualize Individual Trees.",
                "Step 16: Record Observations.",
                "Step 17: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\nimport pandas as pd\n\n# Load Data\ndf = pd.read_csv('heart_disease.csv')\nX = df.drop('target', axis=1)\ny = df['target']\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train Random Forest\nrf = RandomForestClassifier(n_estimators=100, max_features='sqrt', oob_score=True)\nrf.fit(X_train, y_train)\n\n# Predict & Evaluate\ny_pred = rf.predict(X_test)\nacc = accuracy_score(y_test, y_pred)\n\nprint(f\"Test Accuracy: {acc*100:.2f}%\")\nprint(f\"OOB Score: {rf.oob_score_*100:.2f}%\")",
                steps: [
                  { line: 1, annotation: "Import RandomForestClassifier", memory: [], output: "" },
                  { line: 8, annotation: "Split features and target", memory: [], output: "" },
                  { line: 11, annotation: "Train-test split", memory: [], output: "" },
                  { line: 14, annotation: "Initialize Random Forest", memory: [], output: "" },
                  { line: 15, annotation: "Fit the model", memory: [], output: "" },
                  { line: 18, annotation: "Predict on test set", memory: [], output: "" },
                  { line: 21, annotation: "Print scores", memory: [], output: "Test Accuracy: 88.50%\nOOB Score: 85.90%" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 7",
        objective: "Implement probabilistic classifiers based on Bayes' theorem.",
        tutorial: "Tutorial 7: Probabilistic Learning",
        labTitle: "Lab 7: Naïve Bayes",
        experiments: [
          {
            id: "ml-w7-1",
            title: "Naïve Bayes Classification",
            desc: "Demonstrate Naïve Bayes Classification algorithm.",
            expected: "Naïve Bayes classifier successfully trained and evaluated on a classification dataset.",
            content: {
              aim: {
                text: "To implement the Naïve Bayes Classification algorithm on a given dataset using Python / R / Weka, to understand the probabilistic foundation of the algorithm based on Bayes' Theorem, to apply Gaussian, Multinomial, and Bernoulli variants of Naïve Bayes to appropriate datasets, to evaluate model performance using standard classification metrics, and to appreciate the role of the conditional independence assumption in enabling efficient probabilistic classification."
              },
              theory: [
                {
                  title: "1. Introduction to Probabilistic Learning & Bayes' Theorem",
                  body: [
                    "Probabilistic Learning approaches model uncertainty in predictions using probability theory, estimating the probability that an instance belongs to each class.",
                    "Bayes' Theorem provides a framework for updating the probability of a hypothesis (class label) based on observed evidence (feature values).",
                    "Formula: P(C | X) = [P(X | C) × P(C)] / P(X)",
                    "P(C | X): Posterior Probability, P(X | C): Likelihood, P(C): Prior Probability, P(X): Marginal Probability."
                  ]
                },
                {
                  title: "2. The Naïve Conditional Independence Assumption",
                  body: [
                    "Computing P(X | C) is intractable for large feature spaces.",
                    "Naïve Bayes assumes that each feature x_i is conditionally independent of every other feature given the class label C.",
                    "This simplifies the likelihood to: P(X | C) = Π P(x_i | C).",
                    "Classification Rule: ŷ = argmax P(C) × Π P(x_i | C)."
                  ]
                },
                {
                  title: "3. Variants of Naïve Bayes",
                  body: [
                    "Gaussian Naïve Bayes: Used when features are continuous. Assumes normal distribution.",
                    "Multinomial Naïve Bayes: Used when features represent discrete counts (e.g., word counts in text classification).",
                    "Bernoulli Naïve Bayes: Used when features are binary (presence or absence of a feature)."
                  ]
                },
                {
                  title: "4. Laplace Smoothing",
                  body: [
                    "The Zero Probability Problem occurs if a feature value never appears with a class in training; the product of likelihoods becomes zero.",
                    "Laplace Smoothing solves this by adding a small constant α (typically 1) to feature counts.",
                    "Effect: Prevents zero probabilities and slightly adjusts all estimates while preserving order."
                  ]
                },
                {
                  title: "5. Log Probabilities",
                  body: [
                    "Multiplying many small probabilities can cause numerical underflow.",
                    "To avoid this, we work in log space: log P(C | X) ∝ log P(C) + Σ log P(x_i | C).",
                    "Maximizing the log probability is equivalent to maximizing the original probability."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool (Python, R, or Weka).",
                "Step 2: Select the Naïve Bayes Variant (Gaussian, Multinomial, or Bernoulli).",
                "Step 3: Load the Dataset.",
                "Step 4: Explore the Dataset (Review summaries and distributions).",
                "Step 5: Preprocess the Dataset (Handle missing values, text vectorization).",
                "Step 6: Set the Train-Test Split.",
                "Step 7: Configure Laplace Smoothing (Set Alpha).",
                "Step 8: Train the Naïve Bayes Classifier.",
                "Step 9: View the Probability Tables.",
                "Step 10: Test with a New Instance.",
                "Step 11: Evaluate Model Performance.",
                "Step 12: Compare Naïve Bayes Variants.",
                "Step 13: Tune the Smoothing Parameter.",
                "Step 14: Visualize Decision Boundaries.",
                "Step 15: Record Observations.",
                "Step 16: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.naive_bayes import GaussianNB\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\nimport pandas as pd\n\n# Load Data\ndf = pd.read_csv('diabetes.csv')\nX = df.drop('Outcome', axis=1)\ny = df['Outcome']\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Initialize and Train Gaussian Naive Bayes\ngnb = GaussianNB()\ngnb.fit(X_train, y_train)\n\n# Predict & Evaluate\ny_pred = gnb.predict(X_test)\nacc = accuracy_score(y_test, y_pred)\n\nprint(f\"Test Accuracy: {acc*100:.2f}%\")",
                steps: [
                  { line: 1, annotation: "Import GaussianNB", memory: [], output: "" },
                  { line: 8, annotation: "Split features and target", memory: [], output: "" },
                  { line: 11, annotation: "Train-test split", memory: [], output: "" },
                  { line: 14, annotation: "Initialize GaussianNB", memory: [], output: "" },
                  { line: 15, annotation: "Fit the model", memory: [], output: "" },
                  { line: 18, annotation: "Predict on test set", memory: [], output: "" },
                  { line: 21, annotation: "Print scores", memory: [], output: "Test Accuracy: 76.60%" }
                ]
              },
              pretest: [],
              posttest:[]
            }
          }
        ]
      },
      {
        title: "WEEK 8",
        objective: "Use maximum-margin classifiers and kernel tricks for complex decision boundaries.",
        tutorial: "Tutorial 8: Kernel Methods",
        labTitle: "Lab 8: Support Vector Machines",
        experiments: [
          {
            id: "ml-w8-1",
            title: "SVM Classification",
            desc: "Apply Support Vector Machine (SVM) algorithm for classification.",
            expected: "SVM classifier successfully trained with different kernels (linear, RBF) and evaluated.",
            content: {
              aim: {
                text: "To implement the Support Vector Machine (SVM) algorithm for classification tasks on a given dataset using Python / R / Weka, to understand the concept of maximum margin hyperplane and support vectors, to apply and compare different kernel functions including Linear, Polynomial, and RBF kernels, to tune the regularization parameter C and kernel-specific parameters such as gamma and degree, to visualize the decision boundary and margin, and to evaluate model performance using standard classification metrics."
              },
              theory: [
                {
                  title: "1. Introduction to Support Vector Machines",
                  body: [
                    "Support Vector Machine (SVM) is a powerful supervised machine learning algorithm primarily used for classification tasks.",
                    "The core idea is to find the optimal decision boundary (hyperplane) that separates data points of different classes with the maximum possible margin.",
                    "Key Strengths: Works well with high-dimensional data, memory efficient as only support vectors are stored, versatile through different kernel functions, robust to overfitting."
                  ]
                },
                {
                  title: "2. Linear SVM — Hard Margin Classification",
                  body: [
                    "A hyperplane in n-dimensional space is defined as: w · x + b = 0.",
                    "Decision Rule: If w · x + b ≥ +1 → Predict Class +1. If w · x + b ≤ −1 → Predict Class −1."
                  ]
                },
                {
                  title: "3. Margin and Support Vectors",
                  body: [
                    "Margin Width Formula: Margin = 2 / ||w||.",
                    "SVM maximizes the margin by minimizing ||w||².",
                    "Support Vectors: The training instances that lie exactly on the margin boundaries. They are the only data points that influence the position and orientation of the decision hyperplane."
                  ]
                },
                {
                  title: "4. Soft Margin SVM & The Regularization Parameter C",
                  body: [
                    "Soft Margin SVM introduces slack variables ξ_i that allow some data points to violate the margin or even be misclassified.",
                    "Parameter C controls the balance between maximizing the margin and minimizing training errors.",
                    "Small C: Wider margin, more misclassifications allowed (underfitting / generalized).",
                    "Large C: Narrow margin, very few misclassifications (overfitting)."
                  ]
                },
                {
                  title: "5. The Kernel Trick & Kernel Functions",
                  body: [
                    "The Kernel Trick explicitly maps data into a higher-dimensional space where it becomes linearly separable, without computing the coordinates explicitly.",
                    "Linear Kernel: K(x, z) = x · z (Best for linearly separable data).",
                    "Polynomial Kernel: K(x, z) = (γ × x · z + r)^d (Creates polynomial boundaries).",
                    "RBF (Gaussian) Kernel: K(x, z) = exp(−γ × ||x − z||²) (Most widely used, creates complex non-linear boundaries. Gamma controls the influence radius of each support vector)."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool.",
                "Step 2: Load the Dataset.",
                "Step 3: Explore the Dataset.",
                "Step 4: Preprocess the Dataset (Mandatory Feature Scaling).",
                "Step 5: Set the Train-Test Split.",
                "Step 6: Select the Kernel Function.",
                "Step 7: Configure Hyperparameters (C, gamma, degree).",
                "Step 8: Train the SVM Classifier.",
                "Step 9: Visualize the Decision Boundary.",
                "Step 10: Evaluate Model Performance.",
                "Step 11: Perform Hyperparameter Tuning.",
                "Step 12: Compare Kernel Functions.",
                "Step 13: Observe Support Vectors.",
                "Step 14: Perform Grid Search (Optional).",
                "Step 15: Record Observations.",
                "Step 16: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.svm import SVC\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import accuracy_score\nimport pandas as pd\n\n# Load Data\ndf = pd.read_csv('make_moons.csv')\nX = df[['Feature1', 'Feature2']]\ny = df['Target']\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Feature Scaling\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\n\n# Initialize and Train SVM with RBF Kernel\nsvm = SVC(kernel='rbf', C=10.0, gamma=0.5)\nsvm.fit(X_train_scaled, y_train)\n\n# Predict & Evaluate\ny_pred = svm.predict(X_test_scaled)\nacc = accuracy_score(y_test, y_pred)\n\nprint(f\"Test Accuracy: {acc*100:.2f}%\")",
                steps: [
                  { line: 1, annotation: "Import SVC and utilities", memory: [], output: "" },
                  { line: 9, annotation: "Load and split data", memory: [], output: "" },
                  { line: 14, annotation: "Scale features (Standardization)", memory: [], output: "" },
                  { line: 19, annotation: "Initialize SVC with RBF kernel", memory: [], output: "" },
                  { line: 20, annotation: "Fit the model", memory: [], output: "" },
                  { line: 23, annotation: "Predict on test set", memory: [], output: "" },
                  { line: 26, annotation: "Print score", memory: [], output: "Test Accuracy: 98.50%" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 9",
        objective: "Model the linear relationship between independent and dependent variables.",
        tutorial: "Tutorial 9: Linear Regression",
        labTitle: "Lab 9: Simple Linear Regression",
        experiments: [
          {
            id: "ml-w9-1",
            title: "Simple Linear Regression",
            desc: "Demonstrate Simple Linear Regression algorithm for a regression problem.",
            expected: "Linear Regression model trained, best-fit line plotted, and performance evaluated using R-squared.",
            content: {
              aim: {
                text: "To implement Simple Linear Regression on a given dataset using Python / R / Weka, to estimate the regression coefficients β₀ (intercept) and β₁ (slope) using the Ordinary Least Squares method, to visualize the regression line fitted to the data, to evaluate the model using standard regression metrics such as MAE, MSE, RMSE, and R² Score, to analyze residuals to validate regression assumptions, and to understand the linear relationship between a single independent variable and a continuous dependent variable."
              },
              theory: [
                {
                  title: "1. Introduction to Linear Regression",
                  body: [
                    "Linear Regression models the relationship between one or more independent variables (predictors) and a continuous dependent variable (target) by fitting a linear equation to the observed data.",
                    "Simple Linear Regression involves one independent variable predicting one dependent variable."
                  ]
                },
                {
                  title: "2. Simple Linear Regression Model",
                  body: [
                    "The Regression Equation: ŷ = β₀ + β₁x",
                    "Where: ŷ = predicted value of the dependent variable, x = independent variable, β₀ = intercept, β₁ = slope.",
                    "Intercept β₀: The predicted value of y when x = 0.",
                    "Slope β₁: For every one-unit increase in x, y changes by β₁ units."
                  ]
                },
                {
                  title: "3. Ordinary Least Squares (OLS) Estimation",
                  body: [
                    "OLS minimizes the Sum of Squared Residuals (SSR) — the sum of the squared differences between actual and predicted values.",
                    "Residual: e_i = y_i − ŷ_i",
                    "Closed-Form OLS Solution: β₁ = Σ (x_i − x̄)(y_i − ȳ) / Σ (x_i − x̄)² and β₀ = ȳ − β₁ × x̄."
                  ]
                },
                {
                  title: "4. Decomposition of Variance",
                  body: [
                    "Total Sum of Squares (SST): Total variation in the observed y values.",
                    "Regression Sum of Squares (SSReg): Variation in y explained by the regression model.",
                    "Residual Sum of Squares (SSRes): Variation in y NOT explained by the model.",
                    "SST = SSReg + SSRes."
                  ]
                },
                {
                  title: "5. Evaluation Metrics & Assumptions",
                  body: [
                    "Metrics: MAE, MSE, RMSE, R² Score, Pearson Correlation Coefficient (r).",
                    "Assumptions: Linearity, Independence (residuals), Homoscedasticity (constant variance of residuals), Normality of Residuals, No Outliers.",
                    "Residual analysis involves viewing Residuals vs Fitted Values, Q-Q Plot, Histogram, and Residuals vs Index."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool.",
                "Step 2: Load the Dataset.",
                "Step 3: Explore the Dataset.",
                "Step 4: Check the Linearity Assumption.",
                "Step 5: Set the Train-Test Split.",
                "Step 6: Compute OLS Coefficients Manually.",
                "Step 7: Train the Simple Linear Regression Model.",
                "Step 8: Visualize the Regression Line.",
                "Step 9: Make Predictions.",
                "Step 10: Evaluate Model Performance.",
                "Step 11: Perform Residual Analysis.",
                "Step 12: View the Variance Decomposition.",
                "Step 13: Experiment with Different Datasets.",
                "Step 14: Observe the Effect of Outliers.",
                "Step 15: Record Observations.",
                "Step 16: Attempt Post-Test."
              ],
              simulation: {
                code: "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, r2_score\n\n# Load Data\ndf = pd.DataFrame({'YearsExperience': [1,2,3,4,5], 'Salary': [40000, 45000, 50000, 60000, 65000]})\nX = df[['YearsExperience']]\ny = df['Salary']\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Train Linear Regression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Predict & Evaluate\ny_pred = model.predict(X_test)\nrmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\n\nprint(f\"Intercept: {model.intercept_:.2f}\")\nprint(f\"Slope: {model.coef_[0]:.2f}\")\nprint(f\"RMSE: {rmse:.2f}\")\nprint(f\"R2 Score: {r2:.2f}\")",
                steps: [
                  { line: 1, annotation: "Import libraries", memory: [], output: "" },
                  { line: 8, annotation: "Load dataset", memory: [], output: "" },
                  { line: 12, annotation: "Train-test split", memory: [], output: "" },
                  { line: 15, annotation: "Initialize LinearRegression", memory: [], output: "" },
                  { line: 16, annotation: "Fit the model", memory: [], output: "" },
                  { line: 19, annotation: "Make predictions", memory: [], output: "" },
                  { line: 20, annotation: "Calculate metrics", memory: [], output: "" },
                  { line: 24, annotation: "Print coefficients and metrics", memory: [], output: "Intercept: 33500.00\nSlope: 6500.00\nRMSE: 2500.00\nR2 Score: 0.90" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 10",
        objective: "Apply generalized linear models for binary classification tasks.",
        tutorial: "Tutorial 10: Linear Classification",
        labTitle: "Lab 10: Logistic Regression",
        experiments: [
          {
            id: "ml-w10-1",
            title: "Logistic Regression Classification",
            desc: "Apply Logistic Regression algorithm for a classification problem.",
            expected: "Logistic Regression model successfully trained, decision boundary evaluated, and accuracy reported.",
            content: {
              aim: {
                text: "To implement the Logistic Regression algorithm for a binary classification task on a given dataset using Python / R / Weka, to understand the mathematical foundation of the Sigmoid function and the concept of log-odds, to train the model using gradient descent optimization, to evaluate model performance using standard classification metrics including the Confusion Matrix, Accuracy, Precision, Recall, F1-Score, ROC-AUC, and Log Loss, to interpret the model coefficients, to tune the decision threshold, and to apply regularization techniques to improve model generalization."
              },
              theory: [
                {
                  title: "1. Introduction to Logistic Regression",
                  body: [
                    "Logistic Regression is a supervised machine learning algorithm used for binary classification tasks.",
                    "It extends the idea of Simple Linear Regression by applying a non-linear transformation (the Sigmoid function) to the linear combination of features, squashing the output into the range [0, 1], which can be interpreted as a class probability."
                  ]
                },
                {
                  title: "2. The Logistic Regression Model",
                  body: [
                    "Linear Combination: z = β₀ + β₁x₁ + ... + βₙxₙ",
                    "Apply Sigmoid Function: σ(z) = 1 / (1 + e⁻ᶻ)",
                    "Interpret as Probability: P(y = 1 | x) = σ(z)",
                    "Apply Decision Threshold: ŷ = 1 if P(y = 1 | x) ≥ 0.5, else 0"
                  ]
                },
                {
                  title: "3. Log-Odds and the Logit Function",
                  body: [
                    "Logistic Regression models the log-odds (logit) of the probability of the positive class as a linear function of the features.",
                    "Log-Odds (Logit): log[P(y = 1) / (1 − P(y = 1))] = z = β₀ + β₁x₁ + ... + βₙxₙ",
                    "Odds Ratio: exp(βⱼ) gives the multiplicative change in the odds of Class 1 for a one-unit increase in feature xⱼ."
                  ]
                },
                {
                  title: "4. Cost Function — Binary Cross-Entropy Loss",
                  body: [
                    "Binary Cross-Entropy Loss (Log Loss) Formula: J(β) = −(1/n) × Σ [yᵢ × log(ŷᵢ) + (1 − yᵢ) × log(1 − ŷᵢ)]",
                    "It heavily penalizes confident wrong predictions, encouraging well-calibrated probabilities."
                  ]
                },
                {
                  title: "5. Regularization in Logistic Regression",
                  body: [
                    "L2 Regularization (Ridge): Adds the sum of squared coefficients as a penalty. Shrinks coefficients toward zero.",
                    "L1 Regularization (Lasso): Adds the sum of absolute values of coefficients. Performs automatic feature selection by shrinking some to zero.",
                    "C Parameter: Inverse of regularization strength (smaller C means stronger regularization)."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool.",
                "Step 2: Load the Dataset.",
                "Step 3: Explore the Dataset.",
                "Step 4: Preprocess the Dataset (Handle missing values, Scale features).",
                "Step 5: Set the Train-Test Split.",
                "Step 6: Configure Regularization (L1/L2 and C parameter).",
                "Step 7: Configure Solver and Iterations.",
                "Step 8: Train the Logistic Regression Model.",
                "Step 9: View Model Coefficients.",
                "Step 10: Evaluate Model Performance.",
                "Step 11: Visualize the Decision Boundary.",
                "Step 12: Tune the Decision Threshold.",
                "Step 13: View the Sigmoid Function Plot.",
                "Step 14: Compare Regularization Settings.",
                "Step 15: View the Learning Curve.",
                "Step 16: Record Observations.",
                "Step 17: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import accuracy_score, log_loss\nimport pandas as pd\n\n# Load Data\ndf = pd.read_csv('diabetes.csv')\nX = df.drop('Outcome', axis=1)\ny = df['Outcome']\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Feature Scaling\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\n\n# Initialize and Train Logistic Regression\nlog_reg = LogisticRegression(C=1.0, penalty='l2')\nlog_reg.fit(X_train_scaled, y_train)\n\n# Predict & Evaluate\ny_pred = log_reg.predict(X_test_scaled)\ny_prob = log_reg.predict_proba(X_test_scaled)[:, 1]\nacc = accuracy_score(y_test, y_pred)\nloss = log_loss(y_test, y_prob)\n\nprint(f\"Test Accuracy: {acc*100:.2f}%\")\nprint(f\"Log Loss: {loss:.4f}\")",
                steps: [
                  { line: 1, annotation: "Import LogisticRegression", memory: [], output: "" },
                  { line: 9, annotation: "Load and split features and target", memory: [], output: "" },
                  { line: 14, annotation: "Standardize features", memory: [], output: "" },
                  { line: 19, annotation: "Initialize Logistic Regression", memory: [], output: "" },
                  { line: 20, annotation: "Fit the model", memory: [], output: "" },
                  { line: 23, annotation: "Predict classes and probabilities", memory: [], output: "" },
                  { line: 28, annotation: "Print metrics", memory: [], output: "Test Accuracy: 77.92%\nLog Loss: 0.4983" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 11",
        objective: "Understand artificial neural networks and backpropagation.",
        tutorial: "Tutorial 11: Neural Networks",
        labTitle: "Lab 11: Multi-layer Perceptron",
        experiments: [
          {
            id: "ml-w11-1",
            title: "MLP Classifier",
            desc: "Demonstrate Multi-layer Perceptron (MLP) algorithm for a classification problem.",
            expected: "MLP neural network trained, loss curve plotted, and classification metrics evaluated.",
            content: {
              aim: {
                text: "To implement the Multi-layer Perceptron (MLP) algorithm for a classification task on a given dataset using Python / R / Weka, to understand the architecture of a feedforward neural network including input layers, hidden layers, and output layers, to study the role of activation functions, to understand the forward propagation and backpropagation mechanisms, to train the MLP using gradient descent optimization, to evaluate model performance using standard classification metrics, and to analyze the effect of key hyperparameters such as the number of hidden layers, number of neurons, learning rate, and activation function on model performance."
              },
              theory: [
                {
                  title: "1. Introduction to Artificial Neural Networks",
                  body: [
                    "Artificial Neural Networks (ANNs) are computational models inspired by biological neural networks.",
                    "They consist of artificial neurons (nodes) organized in layers that process input data to produce an output.",
                    "ANNs can model highly complex non-linear decision boundaries and form the foundation of deep learning architectures."
                  ]
                },
                {
                  title: "2. Multi-layer Perceptron (MLP) Architecture",
                  body: [
                    "Input Layer: Receives raw input features. Number of neurons = Number of input features.",
                    "Hidden Layer(s): Intermediate layers. Each neuron receives inputs from all neurons in the previous layer (fully connected). Applies a weighted sum followed by a non-linear activation function.",
                    "Output Layer: Produces final prediction. 1 neuron with Sigmoid for binary classification, or k neurons with Softmax for multi-class classification."
                  ]
                },
                {
                  title: "3. Activation Functions",
                  body: [
                    "Sigmoid: Smooth, squashes output between 0 and 1. Suffers from vanishing gradient. Best for output layer in binary classification.",
                    "ReLU (Rectified Linear Unit): max(0, z). Computationally efficient, prevents vanishing gradient for positive values. Most widely used for hidden layers.",
                    "Softmax: Converts raw output scores into a probability distribution over all classes. Used in the output layer for multi-class classification."
                  ]
                },
                {
                  title: "4. Forward Propagation & Backpropagation",
                  body: [
                    "Forward Propagation: Passing input data through the network layer by layer to compute predicted output and loss.",
                    "Backpropagation (Backward Propagation of Errors): Computes the gradient of the loss function with respect to every weight in the network using the Chain Rule, propagating gradients backward from output to input.",
                    "Optimization: Weights are updated iteratively using optimizers like Stochastic Gradient Descent (SGD) or Adam (Adaptive Moment Estimation)."
                  ]
                },
                {
                  title: "5. Key Hyperparameters & Regularization",
                  body: [
                    "Number of Hidden Layers / Neurons: Controls network depth and width (capacity).",
                    "Learning Rate (α): Step size of weight updates.",
                    "Dropout: Randomly deactivates a fraction of neurons during training to prevent overfitting.",
                    "Early Stopping: Stops training when validation loss begins to increase, preventing overfitting."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool (Python, R, Weka).",
                "Step 2: Load the Dataset.",
                "Step 3: Explore the Dataset.",
                "Step 4: Preprocess the Dataset (Mandatory Feature Scaling).",
                "Step 5: Set the Train-Validation-Test Split.",
                "Step 6: Design the MLP Architecture (Set number of hidden layers and neurons per layer).",
                "Step 7: Configure Hyperparameters (Activation function, Optimizer, Learning Rate).",
                "Step 8: Set Regularization (Dropout rate, Early Stopping).",
                "Step 9: Train the MLP Classifier.",
                "Step 10: View the Learning Curve (Training vs Validation Loss).",
                "Step 11: Evaluate Model Performance (Accuracy, Precision, Recall, F1-Score).",
                "Step 12: Visualize the Decision Boundary (for 2D data).",
                "Step 13: Compare Different Architectures.",
                "Step 14: Record Observations.",
                "Step 15: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.neural_network import MLPClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import accuracy_score\nimport pandas as pd\n\n# Load Data\ndf = pd.read_csv('data.csv')\nX = df.drop('Target', axis=1)\ny = df['Target']\n\n# Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Feature Scaling\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\n\n# Initialize and Train MLP\nmlp = MLPClassifier(hidden_layer_sizes=(64, 32), activation='relu', solver='adam', max_iter=500)\nmlp.fit(X_train_scaled, y_train)\n\n# Predict & Evaluate\ny_pred = mlp.predict(X_test_scaled)\nacc = accuracy_score(y_test, y_pred)\n\nprint(f\"Test Accuracy: {acc*100:.2f}%\")",
                steps: [
                  { line: 1, annotation: "Import MLPClassifier", memory: [], output: "" },
                  { line: 9, annotation: "Load and split data", memory: [], output: "" },
                  { line: 14, annotation: "Standardize features (Crucial for MLP)", memory: [], output: "" },
                  { line: 19, annotation: "Initialize MLP with 2 hidden layers (64, 32 neurons)", memory: [], output: "" },
                  { line: 20, annotation: "Fit the model (Backpropagation)", memory: [], output: "" },
                  { line: 23, annotation: "Predict on test set", memory: [], output: "" },
                  { line: 26, annotation: "Print accuracy", memory: [], output: "Test Accuracy: 92.50%" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 12",
        objective: "Perform unsupervised learning by partitioning data into K distinct clusters.",
        tutorial: "Tutorial 12: Partition-Based Clustering",
        labTitle: "Lab 12: K-Means Clustering",
        experiments: [
          {
            id: "ml-w12-1",
            title: "K-Means and K-Parameter Tuning",
            desc: "Implement the K-Means algorithm and apply it to the selected dataset. Evaluate performance by measuring the sum of the Euclidean distance of each example from its class center. Test the performance of the algorithm as a function of the parameter K.",
            expected: "K-Means clustering applied, Elbow method used to determine optimal K, and clusters visualized.",
            content: {
              aim: {
                text: "To implement the K-Means Clustering algorithm for an unsupervised learning task on a given dataset using Python, to understand the iterative centroid update process of K-Means, to visualize cluster formation and convergence step by step, to study the effect of the K parameter on clustering quality using the Elbow Method and Silhouette Score, to evaluate clustering performance using internal validation metrics, to understand the sensitivity of K-Means to initialization and explore K-Means++ initialization as a remedy, and to analyze the practical limitations of K-Means including sensitivity to outliers, assumption of spherical clusters, and the impact of feature scaling on clustering results."
              },
              theory: [
                {
                  title: "1. Introduction to Clustering",
                  body: [
                    "Clustering is a fundamental unsupervised learning technique that groups a set of data points into subsets called clusters such that points within the same cluster are more similar to each other than to points in other clusters. Unlike supervised learning, clustering operates without class labels — the algorithm discovers structure purely from the distribution of data.",
                    "Clustering is used across a wide range of real-world applications including customer segmentation in retail, document grouping in natural language processing, image compression, anomaly detection in cybersecurity, gene expression analysis in bioinformatics, and city planning.",
                    "Key Characteristics of Clustering:",
                    "• No labeled training data required — purely data-driven structure discovery",
                    "• Results depend heavily on the choice of distance metric and algorithm",
                    "• Evaluation is inherently more difficult than supervised learning due to absence of ground truth",
                    "• Multiple valid clusterings of the same data may exist depending on the objective"
                  ]
                },
                {
                  title: "2. Types of Clustering Algorithms",
                  body: [
                    "• Partition-Based (e.g. K-Means, K-Medoids): Divide data into K non-overlapping clusters",
                    "• Hierarchical (e.g. Agglomerative, Divisive): Build a tree of nested clusters (dendrogram)",
                    "• Density-Based (e.g. DBSCAN, OPTICS): Group points in dense regions, mark sparse points as noise",
                    "• Model-Based (e.g. Gaussian Mixture Models): Assume data generated from mixture of probability distributions",
                    "• Grid-Based (e.g. STING, CLIQUE): Partition feature space into grid cells"
                  ]
                },
                {
                  title: "3. K-Means Clustering Algorithm",
                  body: [
                    "K-Means partitions n data points into K non-overlapping clusters by iteratively assigning each point to its nearest centroid and updating centroids based on the mean of assigned points.",
                    "3.1 Formal Objective Function",
                    "K-Means minimizes the Within-Cluster Sum of Squares (WCSS) also called Inertia: WCSS = Σₖ Σ_{x ∈ Cₖ} ||x − μₖ||²",
                    "3.2 Step-by-Step Algorithm",
                    "Step 1 — Initialization: Choose K initial centroids.",
                    "Step 2 — Assignment Step: Assign each data point to the nearest centroid based on Euclidean distance.",
                    "Step 3 — Update Step: Recompute each centroid as the mean of all points assigned to that cluster.",
                    "Step 4 — Convergence Check: Repeat Steps 2 and 3 until centroids do not change, max iterations reached, or WCSS change falls below threshold.",
                    "3.3 Convergence Guarantee",
                    "K-Means is guaranteed to converge because WCSS strictly decreases or stays the same, but it may converge to a local minimum depending on initialization."
                  ]
                },
                {
                  title: "4. Distance Metrics in K-Means",
                  body: [
                    "• Euclidean: √(Σ(xᵢ − yᵢ)²) - Best for continuous numerical features, isotropic clusters",
                    "• Manhattan: Σ|xᵢ − yᵢ| - Best when features have outliers, city-block geometry",
                    "• Cosine: 1 − (x·y / ||x||·||y||) - Best for text data, high-dimensional sparse data",
                    "Standard K-Means uses Euclidean distance exclusively. K-Medoids (PAM) generalizes to other metrics."
                  ]
                },
                {
                  title: "5. K-Means++ Initialization",
                  body: [
                    "Standard random initialization can place multiple initial centroids in the same dense region causing poor convergence. K-Means++ addresses this by spreading initial centroids far apart.",
                    "Effect of K-Means++:",
                    "Produces better initial centroids that are spread across the data",
                    "Converges faster and to better solutions on average",
                    "Reduces the number of iterations required for convergence",
                    "Default initialization in scikit-learn's KMeans (init='k-means++')"
                  ]
                },
                {
                  title: "6. Determining the Optimal K",
                  body: [
                    "6.1 Elbow Method",
                    "Run K-Means for K = 1, 2, ..., 10 and compute WCSS. Plot WCSS against K. The optimal K is at the elbow point where the curve bends sharply.",
                    "6.2 Silhouette Score",
                    "Measures how well each point fits its assigned cluster compared to neighboring clusters. Range is −1 to +1. The optimal K maximizes the average Silhouette Score.",
                    "6.3 Gap Statistic",
                    "Compares WCSS to expected WCSS under a null reference distribution.",
                    "6.4 Davies-Bouldin Index",
                    "Measures the average similarity between each cluster and its most similar cluster. Lower is better."
                  ]
                },
                {
                  title: "7. Feature Scaling in K-Means",
                  body: [
                    "K-Means uses Euclidean distance which is extremely sensitive to the scale of features. A feature with large numeric range will dominate distance calculations.",
                    "Mandatory preprocessing before K-Means:",
                    "• Standardization (Z-Score Normalization)",
                    "• Min-Max Normalization",
                    "Rule: Always apply feature scaling before K-Means."
                  ]
                },
                {
                  title: "8. Limitations of K-Means",
                  body: [
                    "• Must Specify K in Advance: Wrong K produces meaningless clusters.",
                    "• Sensitive to Initialization: Different random initializations can produce different final clusters.",
                    "• Assumes Spherical Equal-Sized Clusters: Performs poorly on elongated clusters, ring-shaped clusters, or clusters of very different sizes and densities.",
                    "• Sensitive to Outliers: Centroids are computed as means. A single extreme outlier can significantly shift a centroid.",
                    "• Converges to Local Minimum: Not guaranteed to find the global minimum of WCSS."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool. Choose your preferred programming environment.",
                "Step 2: Load the Dataset.",
                "Step 3: Explore the Dataset.",
                "Step 4: Preprocess the Dataset (Apply Feature Scaling).",
                "Step 5: Select K-Means Parameters (Set K, Initialization method, n_init, max_iter).",
                "Step 6: Run K-Means Clustering.",
                "Step 7: Perform K-Parameter Tuning using Elbow Method.",
                "Step 8: Perform K-Parameter Tuning using Silhouette Score.",
                "Step 9: Compare Elbow and Silhouette Recommendations.",
                "Step 10: Visualize Clusters.",
                "Step 11: Step Through K-Means Iterations.",
                "Step 12: Evaluate Clustering Quality.",
                "Step 13: Analyze Sensitivity to Initialization.",
                "Step 14: Demonstrate K-Means Limitations (e.g. Generated Moons dataset).",
                "Step 15: Experiment with Different K Values.",
                "Step 16: Record Observations.",
                "Step 17: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.cluster import KMeans\nfrom sklearn.metrics import silhouette_score\nimport pandas as pd\nimport numpy as np\n\n# Load Dataset\ndf = pd.DataFrame({'X': [1.2, 1.3, 5.1, 5.3, 9.1, 9.2], 'Y': [1.1, 1.2, 5.0, 5.2, 9.0, 9.3]})\n\n# Initialize and Train K-Means\nkmeans = KMeans(n_clusters=3, init='k-means++', n_init=10, random_state=42)\nkmeans.fit(df)\n\n# Evaluate\nlabels = kmeans.labels_\nsil_score = silhouette_score(df, labels)\nprint(f\"Silhouette Score: {sil_score:.3f}\")",
                steps: [
                  { line: 1, annotation: "Import KMeans and metrics", memory: [], output: "" },
                  { line: 7, annotation: "Load Features", memory: [{variable: "df", type: "DataFrame", value: "shape (6, 2)"}], output: "" },
                  { line: 10, annotation: "Initialize K-Means Classifier", memory: [{variable: "kmeans", type: "KMeans", value: "n_clusters=3"}], output: "" },
                  { line: 11, annotation: "Train the model", memory: [{variable: "kmeans", type: "KMeans", value: "Fitted"}], output: "" },
                  { line: 14, annotation: "Get cluster labels", memory: [{variable: "labels", type: "ndarray", value: "[1, 1, 0, 0, 2, 2]"}], output: "" },
                  { line: 15, annotation: "Calculate Silhouette Score", memory: [], output: "" },
                  { line: 16, annotation: "Print final evaluation", memory: [], output: "Silhouette Score: 0.966" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 13",
        objective: "Implement soft clustering where data points can belong to multiple clusters with varying degrees of membership.",
        tutorial: "Tutorial 13: Fuzzy Clustering",
        labTitle: "Lab 13: Fuzzy C-Means",
        experiments: [
          {
            id: "ml-w13-1",
            title: "Fuzzy C-Means Clustering",
            desc: "Demonstrate the use of Fuzzy C-Means Clustering.",
            expected: "Fuzzy C-Means applied, membership matrix analyzed, and soft clusters visualized.",
            content: {
              aim: {
                text: "To implement the Fuzzy C-Means (FCM) clustering algorithm for a soft unsupervised learning task on a given dataset using Python, to understand how FCM generalizes K-Means by assigning partial membership degrees to each data point across all clusters simultaneously, to study the role of the fuzziness parameter m on membership softness and cluster overlap, to visualize membership degree distributions and fuzzy cluster boundaries, to evaluate soft clustering quality using the Partition Coefficient and Partition Entropy metrics, to perform C-parameter tuning using adapted Elbow and Silhouette methods, to compare FCM results with hard K-Means clustering on the same dataset, and to understand the practical advantages of soft clustering for ambiguous and overlapping real-world data distributions."
              },
              theory: [
                {
                  title: "1. Introduction to Fuzzy Logic and Soft Clustering",
                  body: [
                    "Classical set theory assigns each element a binary membership — it either belongs to a set (1) or it does not (0). Fuzzy Set Theory introduced by Lotfi Zadeh in 1965 generalizes this by allowing partial membership — an element can belong to a set with any degree between 0 and 1. This mirrors the inherent ambiguity in real-world categories where boundaries are rarely sharp.",
                    "In the context of clustering, hard clustering algorithms like K-Means enforce crisp exclusive assignments — every data point belongs to exactly one cluster. This is problematic when: Data points lie near cluster boundaries and could reasonably belong to multiple clusters, Clusters naturally overlap in feature space, The underlying data generating process is genuinely fuzzy or probabilistic, Forcing binary assignments discards important information about ambiguity.",
                    "Soft clustering addresses these limitations by allowing each data point to simultaneously belong to multiple clusters with varying degrees of membership. Fuzzy C-Means is the most widely used soft clustering algorithm."
                  ]
                },
                {
                  title: "2. Fuzzy Set Theory Foundations",
                  body: [
                    "A fuzzy set A in universe U is characterized by a membership function: μ_A: U → [0, 1]. Where μ_A(x) represents the degree of membership of element x in set A.",
                    "μ_A(x) = 1.0 : x fully belongs to A",
                    "μ_A(x) = 0.5 : x has equal partial membership in A",
                    "μ_A(x) = 0.0 : x does not belong to A",
                    "0 < μ_A(x) < 1 : x partially belongs to A",
                    "In Fuzzy C-Means each cluster is a fuzzy set and each data point has a membership degree to every cluster."
                  ]
                },
                {
                  title: "3. Fuzzy C-Means Algorithm",
                  body: [
                    "Fuzzy C-Means (FCM) was developed by Dunn (1973) and improved by Bezdek (1981). It generalizes K-Means by replacing binary cluster assignments with continuous membership degrees.",
                    "3.1 Formal Objective Function",
                    "FCM minimizes the weighted within-cluster sum of squared distances: J_m = Σᵢ₌₁ⁿ Σₖ₌₁ᶜ (uᵢₖ)ᵐ × ||xᵢ − vₖ||²",
                    "Subject to the constraint: Σₖ₌₁ᶜ uᵢₖ = 1 for all i (memberships sum to 1 for each point).",
                    "3.2 The Fuzziness Parameter m",
                    "The parameter m controls how fuzzy the clustering is:",
                    "• m = 1: Hard clustering — memberships become binary (0 or 1), equivalent to K-Means",
                    "• m = 2: Standard fuzzy clustering — default and most commonly used value",
                    "• m → ∞: Maximum fuzziness — all memberships converge to 1/C for every point",
                    "Higher m causes the membership values to be more equal across clusters.",
                    "3.3 Step-by-Step FCM Algorithm",
                    "Step 1 — Initialize Membership Matrix U: Create an n × C membership matrix U where uᵢₖ is the membership of point i in cluster k.",
                    "Step 2 — Compute Cluster Centroids: For each cluster k compute the fuzzy weighted centroid.",
                    "Step 3 — Update Membership Matrix: Recompute memberships based on distance ratios.",
                    "Step 4 — Check Convergence: Compute maximum change in membership matrix ΔU. If ΔU < ε stop. Otherwise go to Step 2.",
                    "Step 5 — Defuzzification: Assign each point to the cluster with highest membership."
                  ]
                },
                {
                  title: "4. Membership Degree Interpretation",
                  body: [
                    "The membership matrix U provides rich information about data structure:",
                    "• u = [0.95, 0.03, 0.02]: Point strongly belongs to Cluster 1 — unambiguous assignment",
                    "• u = [0.51, 0.47, 0.02]: Point lies on the boundary between Clusters 1 and 2 — genuinely ambiguous",
                    "• u = [0.34, 0.33, 0.33]: Point is equidistant from all centroids — maximum uncertainty",
                    "Points with high maximum membership are core cluster members. Points with distributed membership are boundary or overlapping points."
                  ]
                },
                {
                  title: "5. FCM vs K-Means",
                  body: [
                    "• Assignment Type: K-Means uses crisp assignment, FCM uses fuzzy partial membership.",
                    "• Objective Function: K-Means minimizes WCSS, FCM minimizes weighted distances J_m.",
                    "• Membership Values: K-Means uses binary 0 or 1, FCM uses continuous [0, 1].",
                    "• Overlapping Clusters: K-Means cannot represent overlap, FCM naturally handles overlap.",
                    "• Parameters: K-Means needs K, FCM needs C, m, ε.",
                    "• Computational Cost: FCM is O(n × C² × d × i), which is more expensive than K-Means."
                  ]
                },
                {
                  title: "6. Evaluation Metrics for Fuzzy Clustering",
                  body: [
                    "6.1 Partition Coefficient (PC)",
                    "PC = (1/n) × Σᵢ Σₖ (uᵢₖ)². Range is 1/C to 1. Higher PC indicates crisper more well-defined clusters.",
                    "6.2 Partition Entropy (PE)",
                    "PE = −(1/n) × Σᵢ Σₖ uᵢₖ × log(uᵢₖ). Range is 0 to log(C). Lower PE indicates crisper clusters.",
                    "6.3 Modified Partition Coefficient (MPC)",
                    "MPC corrects for the monotonic bias of PC making it more reliable for comparing solutions with different C values.",
                    "6.4 Xie-Beni Index (XB)",
                    "XB = J_m / (n × min_{k≠j} ||vₖ−vⱼ||²). Lower XB indicates better clustering — compact clusters well separated from each other."
                  ]
                },
                {
                  title: "7. Choosing Optimal C in FCM",
                  body: [
                    "• Adapted Elbow Method: Plot J_m against C. Find elbow point.",
                    "• PC and PE: Optimal C maximizes PC and minimizes PE.",
                    "• MPC: Optimal C maximizes MPC.",
                    "• Xie-Beni Index: Optimal C minimizes XB."
                  ]
                },
                {
                  title: "8. Effect of Fuzziness Parameter m",
                  body: [
                    "• m = 1.0: Hard clustering — identical to K-Means.",
                    "• m = 2.0: Standard FCM — balanced fuzziness, recommended starting point.",
                    "• m = 3.0: High fuzziness — memberships spread across clusters, for highly overlapping data.",
                    "Practical recommendation: Start with m = 2.0. Increase m if data has significant cluster overlap."
                  ]
                },
                {
                  title: "9. Visualization of FCM Results",
                  body: [
                    "• Membership Heatmap: Matrix showing uᵢₖ for all n points across all C clusters.",
                    "• Fuzzy Cluster Boundary Plot: Point color is blended from C cluster colors proportional to membership values.",
                    "• Ternary Plot (C=3): Each point plotted at barycentric coordinates (u₁, u₂, u₃)."
                  ]
                },
                {
                  title: "10. Practical FCM in Python",
                  body: [
                    "FCM is available in the scikit-fuzzy library: skfuzzy.cluster.cmeans",
                    "Key parameters: data (transposed), c (number of clusters), m (fuzzifier), error (tolerance), maxiter.",
                    "Key outputs: cntr (centroids), u (membership matrix), jm (objective function history)."
                  ]
                },
                {
                  title: "11. Advantages and Disadvantages of FCM",
                  body: [
                    "Advantages:",
                    "• Naturally handles overlapping clusters.",
                    "• Provides richer output (full membership matrix).",
                    "• Better suited for data with gradual transitions.",
                    "Disadvantages:",
                    "• Computationally more expensive than K-Means.",
                    "• Requires specifying C and m in advance.",
                    "• Sensitive to initialization and outliers.",
                    "• Assumes clusters are roughly spherical like K-Means."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool (Python with scikit-fuzzy).",
                "Step 2: Load the Dataset (e.g., Iris or Overlapping Blobs).",
                "Step 3: Explore the Dataset.",
                "Step 4: Preprocess the Dataset (Apply Feature Scaling).",
                "Step 5: Set FCM Parameters (C, m, error, maxiter).",
                "Step 6: Run Fuzzy C-Means and observe iteration animation.",
                "Step 7: Explore the Membership Matrix Heatmap.",
                "Step 8: Visualize Fuzzy Cluster Boundaries with blended colors.",
                "Step 9: Tune the C Parameter using PC, PE, MPC, and XB.",
                "Step 10: Explore Effect of Fuzziness Parameter m.",
                "Step 11: Compare FCM with K-Means (soft vs hard assignments).",
                "Step 12: View Ternary Plot (for C=3).",
                "Step 13: Evaluate Clustering Quality metrics.",
                "Step 14: Experiment with Overlapping Data.",
                "Step 15: Record Observations.",
                "Step 16: Attempt Post-Test."
              ],
              simulation: {
                code: "import skfuzzy as fuzz\nimport numpy as np\nimport pandas as pd\n\n# Load Data\ndata = pd.DataFrame({'X': [1.0, 1.2, 5.0, 5.2], 'Y': [1.1, 1.3, 5.1, 5.4]}).T.values\n\n# Run Fuzzy C-Means\ncntr, u, u0, d, jm, p, fpc = fuzz.cluster.cmeans(data, c=2, m=2.0, error=0.005, maxiter=1000, init=None)\n\nprint(f\"Partition Coefficient: {fpc:.3f}\")\nprint(\"Membership Matrix:\\n\", u)",
                steps: [
                  { line: 1, annotation: "Import skfuzzy library", memory: [], output: "" },
                  { line: 6, annotation: "Prepare data (transpose needed for skfuzzy)", memory: [], output: "" },
                  { line: 9, annotation: "Run Fuzzy C-Means", memory: [{variable: "cntr", type: "ndarray", value: "centroids"}], output: "" },
                  { line: 11, annotation: "Print Partition Coefficient", memory: [], output: "Partition Coefficient: 0.985" },
                  { line: 12, annotation: "Print Membership Matrix", memory: [], output: "Membership Matrix:\n[[0.99 0.99 0.01 0.01]\n [0.01 0.01 0.99 0.99]]" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      },
      {
        title: "WEEK 14",
        objective: "Use probabilistic models for clustering based on Gaussian distributions.",
        tutorial: "Tutorial 14: Distribution-Based Clustering",
        labTitle: "Lab 14: Expectation Maximization",
        experiments: [
          {
            id: "ml-w14-1",
            title: "Expectation Maximization (EM) Clustering",
            desc: "Demonstrate the use of Expectation Maximization (EM) based clustering algorithm.",
            expected: "Gaussian Mixture Model (GMM) fit using EM algorithm, covariances analyzed, and probabilistic clusters visualized.",
            content: {
              aim: {
                text: "To implement Expectation Maximization (EM) clustering using Gaussian Mixture Models (GMM) for a probabilistic unsupervised learning task on a given dataset using Python, to understand the two-step iterative EM procedure of computing responsibilities in the E-Step and updating model parameters in the M-Step, to study how GMM generalizes both K-Means and Fuzzy C-Means by modeling full covariance structure and mixing coefficients, to visualize Gaussian component ellipses and responsibility distributions, to perform model selection using the Bayesian Information Criterion (BIC) and Akaike Information Criterion (AIC) for choosing the optimal number of components K, to compare GMM-EM with K-Means and FCM on the same dataset, to understand the role of covariance type constraints on model complexity and cluster shape, and to analyze practical limitations including singularity, overfitting, and sensitivity to initialization in EM clustering."
              },
              theory: [
                {
                  title: "1. Introduction to Probabilistic Clustering",
                  body: [
                    "Both K-Means and Fuzzy C-Means are geometric clustering algorithms — they operate by minimizing distance-based objective functions without any underlying probabilistic model. While powerful and efficient they have fundamental limitations: K-Means assumes clusters are spherical and equal-sized, FCM softens assignments but still uses the same distance-based geometry, neither provides a principled statistical framework for model comparison, neither naturally handles clusters of different shapes, sizes, and orientations.",
                    "Probabilistic clustering addresses all these limitations by modeling the data as arising from a generative statistical process. The most powerful and widely used probabilistic clustering framework is the Gaussian Mixture Model optimized using the Expectation Maximization algorithm."
                  ]
                },
                {
                  title: "2. The Generative Model Perspective",
                  body: [
                    "In the generative modeling framework we assume the observed data X was generated by the following probabilistic process:",
                    "Step 1: For each data point, randomly select a component k from K components with probability πₖ (the mixing coefficient).",
                    "Step 2: Generate the data point xᵢ by drawing from the Gaussian distribution of the selected component k: xᵢ ~ N(μₖ, Σₖ)",
                    "The clustering task is to reverse-engineer this process — given observed data X, estimate the parameters for each component k and determine which component most likely generated each data point."
                  ]
                },
                {
                  title: "3. Gaussian Distribution Review",
                  body: [
                    "3.1 Univariate Gaussian",
                    "A single-variable Gaussian distribution with mean μ and variance σ². Symmetric bell-shaped curve centered at μ. 68% of data falls within μ ± σ, 95% within μ ± 2σ, 99.7% within μ ± 3σ.",
                    "3.2 Multivariate Gaussian",
                    "For d-dimensional data, the multivariate Gaussian with mean vector μ (d×1) and covariance matrix Σ (d×d).",
                    "3.3 Role of the Covariance Matrix",
                    "The covariance matrix Σ determines the geometric shape of the Gaussian component:",
                    "• Spherical: Same variance in all directions (Circle / Sphere)",
                    "• Diagonal: Different variance per feature, no correlation (Axis-aligned Ellipse)",
                    "• Full Σ: Captures correlations and arbitrary orientation (Arbitrary Ellipse)"
                  ]
                },
                {
                  title: "4. Gaussian Mixture Model (GMM)",
                  body: [
                    "A Gaussian Mixture Model with K components models the data distribution as a weighted sum of K Gaussian distributions: p(x) = Σₖ₌₁ᴷ πₖ × N(x; μₖ, Σₖ).",
                    "4.1 GMM Parameters",
                    "Total parameters for full covariance GMM: Mixing coefficients (K−1), Means (K×d), Covariance matrices (K×d(d+1)/2).",
                    "4.2 Complete Data Log-Likelihood",
                    "The log-likelihood of observed data X under the GMM: log L(θ; X) = Σᵢ₌₁ⁿ log[Σₖ₌₁ᴷ πₖ × N(xᵢ; μₖ, Σₖ)]. Direct maximization is intractable. EM algorithm provides an iterative solution."
                  ]
                },
                {
                  title: "5. The Expectation Maximization Algorithm",
                  body: [
                    "EM is a general algorithm for maximum likelihood estimation in models with latent (hidden) variables.",
                    "5.1 Latent Variable Formulation: Introduce latent variable zᵢ for each point i where zᵢ = k if point i was generated by component k.",
                    "5.2 E-Step (Compute Responsibilities): For each data point i and component k compute responsibility rᵢₖ — the posterior probability that component k generated point i.",
                    "5.3 M-Step (Update Parameters): Using computed responsibilities update all GMM parameters to maximize the expected complete-data log-likelihood.",
                    "5.4 Convergence Check: EM is guaranteed to increase or maintain the log-likelihood. Stop when log-likelihood change is below threshold ε.",
                    "5.6 Convergence Properties: EM may converge to a local maximum rather than global. Multiple random restarts are essential."
                  ]
                },
                {
                  title: "6. GMM vs K-Means vs FCM",
                  body: [
                    "• Assignment: K-Means (Hard binary), FCM (Soft continuous), GMM-EM (Soft probabilistic responsibilities)",
                    "• Cluster Shape: K-Means/FCM (Spherical), GMM (Arbitrary elliptical with full covariance)",
                    "• Model Selection: K-Means (Elbow), FCM (PC/XB), GMM (BIC, AIC)",
                    "• Density Estimation & Outlier Detection: GMM provides full density p(x) and can detect outliers."
                  ]
                },
                {
                  title: "7. Covariance Type Constraints",
                  body: [
                    "7.1 Full Covariance: Arbitrary ellipse with any orientation. Best for data with different shapes/orientations.",
                    "7.2 Tied Covariance: All components share the same covariance matrix. Same elliptical shape but positioned differently.",
                    "7.3 Diagonal Covariance: Axis-aligned ellipse. Best for high-dimensional data.",
                    "7.4 Spherical Covariance: Circle/Sphere. Converges to K-Means as responsibilities become binary."
                  ]
                },
                {
                  title: "8. Model Selection — Choosing Optimal K",
                  body: [
                    "Unlike K-Means, GMM provides principled statistical model selection criteria.",
                    "8.1 Bayesian Information Criterion (BIC): BIC = −2 × log L + p × log(n). Lower is better. Log(n) penalty is stronger for large n making BIC prefer simpler models.",
                    "8.2 Akaike Information Criterion (AIC): AIC = −2 × log L + 2p. Weaker complexity penalty.",
                    "When BIC and AIC disagree, BIC is generally preferred for clustering."
                  ]
                },
                {
                  title: "9. Responsibilities vs FCM Memberships",
                  body: [
                    "FCM memberships are derived from geometric distance ratios without statistical interpretation. GMM responsibilities are derived from Bayes theorem applied to the Gaussian model and have a direct probabilistic interpretation."
                  ]
                },
                {
                  title: "10. Singularity Problem in EM",
                  body: [
                    "If a Gaussian component collapses onto a single data point its covariance matrix becomes singular and likelihood → ∞.",
                    "Solutions: reg_covar parameter adds a small regularization constant to the diagonal, multiple restarts (n_init), initialization with K-Means."
                  ]
                },
                {
                  title: "11. Advantages and Disadvantages of EM-GMM",
                  body: [
                    "Advantages: Models clusters of arbitrary elliptical shape and orientation, handles clusters of different sizes, provides probabilistic responsibilities, uses BIC/AIC for principled selection, can detect outliers.",
                    "Disadvantages: Computationally expensive (O(d³)), susceptible to singularity, sensitive to initialization, may overfit with full covariance on small datasets."
                  ]
                }
              ],
              procedure: [
                "Step 1: Select the Tool (Python with sklearn.mixture.GaussianMixture).",
                "Step 2: Load the Dataset.",
                "Step 3: Explore the Dataset.",
                "Step 4: Preprocess the Dataset (Feature Scaling).",
                "Step 5: Select GMM Parameters (K, covariance_type, n_init, max_iter).",
                "Step 6: Run EM Algorithm and observe iteration animation.",
                "Step 7: Analyze the Fitted GMM.",
                "Step 8: Perform K Selection using BIC and AIC.",
                "Step 9: Compare Covariance Types.",
                "Step 10: Step Through EM Iterations.",
                "Step 11: Compare with K-Means and FCM.",
                "Step 12: Evaluate Model Performance.",
                "Step 13: Outlier Detection using GMM.",
                "Step 14: Record Observations.",
                "Step 15: Attempt Post-Test."
              ],
              simulation: {
                code: "from sklearn.mixture import GaussianMixture\nimport pandas as pd\nimport numpy as np\n\n# Load Data\ndf = pd.DataFrame({'X': [1.2, 1.3, 5.1, 5.3], 'Y': [1.1, 1.2, 5.0, 5.2]})\n\n# Train GMM\ngmm = GaussianMixture(n_components=2, covariance_type='full', random_state=42)\ngmm.fit(df)\n\n# Predict\nlabels = gmm.predict(df)\nprobs = gmm.predict_proba(df)\n\nprint(f\"BIC: {gmm.bic(df):.2f}\")\nprint(f\"Converged: {gmm.converged_}\")",
                steps: [
                  { line: 1, annotation: "Import GaussianMixture", memory: [], output: "" },
                  { line: 6, annotation: "Load Features", memory: [{variable: "df", type: "DataFrame", value: "shape (4, 2)"}], output: "" },
                  { line: 9, annotation: "Initialize GMM", memory: [{variable: "gmm", type: "GaussianMixture", value: "n_components=2"}], output: "" },
                  { line: 10, annotation: "Fit the model using EM", memory: [{variable: "gmm", type: "GaussianMixture", value: "Fitted"}], output: "" },
                  { line: 13, annotation: "Get hard assignments", memory: [{variable: "labels", type: "ndarray", value: "[1, 1, 0, 0]"}], output: "" },
                  { line: 14, annotation: "Get soft responsibilities", memory: [{variable: "probs", type: "ndarray", value: "shape (4, 2)"}], output: "" },
                  { line: 16, annotation: "Print BIC and Convergence status", memory: [], output: "BIC: -55.85\nConverged: True" }
                ]
              },
              pretest: [],
              posttest: []
            }
          }
        ]
      }
    ]
  }
};





// Trigger HMR