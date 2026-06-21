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
                text: "To implement a subword tokenization pipeline using the Byte-Pair Encoding (BPE) algorithm from first principles, and evaluate its token compression efficiency across diverse text corpora.",
                bullets: []
              },
              theory: [
                {
                  title: "The Tokenization Bottleneck",
                  body: [
                    "In early Natural Language Processing, text was often processed at the word level. This required massive vocabulary tables and completely failed when encountering Out-Of-Vocabulary (OOV) words like novel names or misspellings.",
                    "Conversely, character-level processing avoided OOV errors but caused sequences to become too long, destroying the neural network's ability to retain long-term context and exponentially increasing compute costs."
                  ]
                },
                {
                  title: "Byte-Pair Encoding (BPE)",
                  body: [
                    "Byte-Pair Encoding solves this bottleneck by treating text as a sequence of subwords. Originally a data compression technique, BPE iteratively finds the most frequent pair of adjacent symbols and merges them into a single new symbol.",
                    "This creates a vocabulary where highly common words (like 'the' or 'and') become single tokens, while rare words are broken down into logical semantic chunks (like 'un', 'predict', 'able').",
                    "Modern models like GPT-4 use a byte-level variation of BPE. Instead of starting with raw Unicode characters, they start with the 256 basic bytes, ensuring absolute structural robustness."
                  ]
                }
              ],
              pretest: [],
              procedure: [
                "Corpus Preparation: Ingest a raw text corpus and append distinct end-of-word tokens (like </w>) to distinguish between word-internal boundaries and word-external boundaries.",
                "Atomic Splitting: Break down the entire text corpus into an initial sequence of raw characters (or bytes), establishing the foundational baseline vocabulary.",
                "Frequency Analysis Loop: Scan the entire sequence sequentially, calculating the co-occurrence frequency of every single adjacent pair of tokens.",
                "Merge Operation: Identify the specific token pair that appears most frequently. Merge them into a single, unified token, and append this new token to the vocabulary table.",
                "Sequence Update: Replace all instances of the identified pair in the original training corpus with the newly created merged token.",
                "Iterative Thresholding: Repeat the frequency analysis and merge operations in a loop until a strictly defined maximum vocabulary size (e.g., 50,000 tokens) is reached."
              ],
              posttest: []
            }
          },
          { 
            id: "llms-w1-3", 
            title: "Word Embeddings and Vector Representations", 
            desc: "Word Embeddings and Vector Representations", 
            code: `import numpy as np\n\ndef cosine_similarity(v1, v2):\n    dot_prod = np.dot(v1, v2)\n    norm_v1 = np.linalg.norm(v1)\n    norm_v2 = np.linalg.norm(v2)\n    return dot_prod / (norm_v1 * norm_v2)\n\n# Simulated low-dimensional dummy representations\nembeddings = {\n    "king":  np.array([0.90, 0.10, 0.05]),\n    "man":   np.array([0.85, 0.05, 0.02]),\n    "woman": np.array([0.15, 0.80, 0.01]),\n    "queen": np.array([0.20, 0.92, 0.04])\n}\n\n# Linear translation math\ntarget_vector = embeddings["king"] - embeddings["man"] + embeddings["woman"]\nscore = cosine_similarity(target_vector, embeddings["queen"])\n\nprint(f"Cosine Similarity to 'queen': {score:.4f}")`,
            content: {
              aim: {
                text: "To calculate, analyze, and map high-dimensional word representations, utilizing vector math metrics to quantify semantic similarity and capture structural language relationships.",
                bullets: []
              },
              theory: [
                {
                  title: "High-Dimensional Semantics",
                  body: [
                    "Word embeddings are a pivotal breakthrough in Deep Learning. Instead of representing text as discrete, unrelated IDs (one-hot encoding), embeddings map tokens into a continuous vector space.",
                    "In this high-dimensional coordinate system, semantic meaning is represented by spatial position. Words that appear in similar linguistic contexts are pushed closer together.",
                    "Formally, an embedding layer acts as a massive lookup table, matching a token ID to a dense tensor (e.g., $f: W \to \mathbb{R}^d$), where $d$ often ranges from 768 to 1536 dimensions depending on the architecture."
                  ]
                },
                {
                  title: "Mathematical Proximity",
                  body: [
                    "To determine how conceptually related two chunks of text are, systems rely on vector math, primarily calculating the Cosine Similarity.",
                    "Cosine Similarity measures the angle between two vectors rather than their spatial magnitude. A score of 1.0 means perfect alignment, 0.0 means orthogonal (unrelated), and -1.0 means diametrically opposed."
                  ]
                }
              ],
              simulation: "/vector_space_sim.html",
              pretest: [],
              procedure: [
                "Matrix Initialization: Load a pre-trained embedding model or instantiate a random NumPy matrix to simulate multi-dimensional vector weights.",
                "Vector Mapping: Convert an array of input tokens into their corresponding high-dimensional floating-point tensors.",
                "L2 Normalization: Execute mathematical matrix operations to normalize all vectors to a unit length of 1, standardizing downstream distance calculations.",
                "Dot Product Execution: Compute the geometric dot product of a specific target vector against the entire normalized dataset array.",
                "Similarity Ranking: Isolate the highest resulting scalar values to rank the top-K closest semantic neighbors.",
                "Visual Compression: Apply a dimensionality reduction algorithm like PCA or t-SNE to squash the 1536 dimensions down to a 2D plane for visual graph rendering."
              ],
              posttest: []
            }
          },
          { 
            id: "llms-w1-4", 
            title: "Exploring the Transformer Architecture", 
            desc: "Exploring the Transformer Architecture", 
            code: `import numpy as np\n\ndef get_positional_encoding(seq_len, d_model):\n    # Initialize the encoding matrix\n    pe = np.zeros((seq_len, d_model))\n    \n    # Compute the positional values\n    position = np.arange(seq_len)[:, np.newaxis]\n    div_term = np.exp(np.arange(0, d_model, 2) * -(np.log(10000.0) / d_model))\n    \n    # Assign alternating sine and cosine functions\n    pe[:, 0::2] = np.sin(position * div_term)\n    pe[:, 1::2] = np.cos(position * div_term)\n    \n    return pe\n\n# Run Verification\npe_matrix = get_positional_encoding(seq_len=10, d_model=64)\nprint(f"Generated Positional Matrix Shape: {pe_matrix.shape}")`,
            content: {
              aim: {
                text: "To analyze the structural composition of the original Transformer architecture (Encoder-Decoder framework) and implement its positional encoding layer from scratch to understand non-sequential sequence processing.",
                bullets: []
              },
              theory: [
                {
                  title: "The Recurrence Bottleneck",
                  body: [
                    "Before 2017, sequence tasks were dominated by Recurrent Neural Networks (RNNs) and LSTMs. These models processed text strictly sequentially (token by token).",
                    "This sequential nature prevented parallel processing on GPUs and caused models to physically 'forget' early context when dealing with long paragraphs."
                  ]
                },
                {
                  title: "The Transformer Revolution",
                  body: [
                    "The Transformer architecture abandoned recurrence entirely. Instead, it reads the entire text sequence simultaneously in a massive parallel burst, relying on Self-Attention to map context.",
                    "However, processing everything at once destroys the inherent order of language (e.g., 'Dog bites man' vs 'Man bites dog').",
                    "To fix this, the architecture injects Positional Encoding—a unique mathematical signature added directly into the input embeddings before they enter the network."
                  ]
                },
                {
                  title: "Positional Mathematics",
                  body: [
                    "The original paper 'Attention Is All You Need' utilizes alternating sine and cosine waves operating at different geometric frequencies to generate these positional signatures.",
                    "This approach allows the model to extrapolate relative positions for sequences longer than those encountered during training."
                  ]
                }
              ],
              pretest: [],
              procedure: [
                "Sequence Initialization: Define the maximum expected sequence length and the specific dimensionality of the embedding model ($d_{model}$).",
                "Matrix Allocation: Instantiate an empty, zero-filled NumPy array with the dimensions (sequence_length, d_model).",
                "Frequency Array Generation: Calculate a logarithmic div_term array that acts as the frequency denominator across the different vector dimensions.",
                "Even-Index Injection: Apply a geometric sine function (np.sin) to all even-indexed columns in the empty positional matrix.",
                "Odd-Index Injection: Apply an alternating geometric cosine function (np.cos) to all odd-indexed columns to complete the wave pattern.",
                "Embedding Addition: Execute an element-wise addition, fusing this generated positional matrix directly into the raw semantic word embeddings before passing them into the Encoder layer."
              ],
              posttest: []
            }
          },
          { 
            id: "llms-w1-5", 
            title: "Understanding Self-Attention", 
            desc: "Understanding Self-Attention", 
            code: `import numpy as np\n\ndef scaled_dot_product_attention(Q, K, V):\n    # Compute raw score alignments\n    matmul_qk = np.dot(Q, K.T)\n    \n    # Scale scores based on dimensionality\n    dk = Q.shape[-1]\n    scaled_attention_logits = matmul_qk / np.sqrt(dk)\n    \n    # Row-wise softmax normalization\n    exp_logits = np.exp(scaled_attention_logits - np.max(scaled_attention_logits, axis=-1, keepdims=True))\n    attention_weights = exp_logits / np.sum(exp_logits, axis=-1, keepdims=True)\n    \n    # Weighted calculation over Values\n    output = np.dot(attention_weights, V)\n    return output, attention_weights\n\n# Sample Execution Setup\nnp.random.seed(42)\nQ = np.random.randn(3, 4) # 3 tokens, dimension 4\nK = np.random.randn(3, 4)\nV = np.random.randn(3, 4)\n\noutput, weights = scaled_dot_product_attention(Q, K, V)\nprint("Attention Weights Matrix:\\n", np.round(weights, 4))`,
            content: {
              aim: {
                text: "To implement the mathematical operations of Scaled Dot-Product Attention from first principles, demonstrating how tokens dynamically weight and route contextual information from neighboring text elements.",
                bullets: []
              },
              theory: [
                {
                  title: "Scaled Dot-Product Attention",
                  body: [
                    "The backbone of the Transformer block is Scaled Dot-Product Attention. It allows a model to dynamically measure the relevance of every word in a sentence relative to all other words.",
                    "For every input token vector, the model projects three distinct vector representations via linear layers: Queries ($Q$), Keys ($K$), and Values ($V$)."
                  ]
                },
                {
                  title: "Mathematical Formulation",
                  body: [
                    "The target attention weight matrix is formulated using the matrix equation: $\\text{Attention}(Q, K, V) = \\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V$ where $d_k$ is the dimensionality of the key vectors.",
                    "Dividing by $\\sqrt{d_k}$ balances the dot-product variance at high dimensions, preventing the internal gradients of the $\\text{softmax}$ activation layer from flattening out during backpropagation."
                  ]
                }
              ],
              pretest: [],
              procedure: [
                "Score Calculation: Compute the raw similarity score matrix by running a dot product between the Query matrix (Q) and the transpose of the Key matrix (K^T).",
                "Scaling Phase: Divide every component inside the raw score matrix by the scaling metric \\sqrt{d_k}.",
                "Probability Distribution: Apply a row-wise softmax mathematical routing operation to ensure all relevance weights add up to exactly 1.0.",
                "Context Synthesis: Multiply the computed attention weights directly against the Value matrix (V) to construct the final context-aware output states."
              ],
              posttest: []
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
                text: "To evaluate the intrinsic knowledge, baseline classification capabilities, and instruction-following boundaries of an LLM without providing contextual examples.",
                bullets: []
              },
              theory: [
                {
                  title: "The Zero-Shot Paradigm",
                  body: [
                    "Zero-Shot Prompting is the baseline evaluation method for Large Language Models. It tests the model's ability to complete a task without any external examples, relying solely on its internal pre-trained weights.",
                    "Because modern LLMs are trained on vast swaths of the internet, they naturally develop a generalized understanding of grammar, sentiment, translation, and code logic.",
                    "Zero-Shot tasks measure this innate generalizability. When a user asks an LLM to 'Translate this to French', the model relies entirely on the structural patterns it learned during initial training."
                  ]
                },
                {
                  title: "System vs. User Constraints",
                  body: [
                    "To enforce behavior in a zero-shot environment, developers utilize the System Prompt. This is a higher-tier instruction layer that dictates the model's persona, constraints, and operational bounds.",
                    "If a model hallucinates or refuses to follow a specific structural output in a zero-shot scenario, it often indicates a failure in the underlying instruction-tuning phase of the model's development."
                  ]
                }
              ],
              pretest: [
                            { question: "What is Zero-Shot Prompting?", options: ["Asking an AI to write code without using any numbers","Providing a task to an AI model without giving it any examples of the expected output","Giving the model zero instructions and expecting it to guess","Shutting down the model after one input"], answerIndex: 1 },
                            { question: "The \"Zero\" in Zero-Shot means:", options: ["Zero words in the prompt","Zero examples provided in the prompt","Zero accuracy expected","Zero training time"], answerIndex: 1 },
                            { question: "Why are modern Large Language Models (LLMs) able to perform zero-shot tasks?", options: ["They look up answers on the web in real-time for every prompt","They have learned general language patterns and knowledge during massive pre-training","They are hard-coded with a list of simple answers","They ask other models for help"], answerIndex: 1 },
                            { question: "Which of these is a classic example of a Zero-Shot prompt?", options: ["Classify this text as Positive or Negative. Text: I love this! Sentiment:","Apple -> Fruit. Carrot -> Vegetable. Broccoli ->","Translate 'Hello' to Spanish like this: Hello -> Hola. Goodbye ->","Write a 5-step guide using the template provided below."], answerIndex: 0 },
                            { question: "Which type of learning does Zero-Shot prompting rely on?", options: ["Reinforcement learning during the chat","In-context learning without demonstrations","Manual hard-coded updates","Fine-tuning on user files"], answerIndex: 1 },
                            { question: "What is a major advantage of Zero-Shot Prompting?", options: ["It guarantees 100% accurate results every time","It is quick, easy, and uses fewer tokens since no examples are needed","It forces the model to use a specific font","It bypasses token limits completely"], answerIndex: 1 },
                            { question: "What is a potential disadvantage of Zero-Shot Prompting?", options: ["It costs more tokens than any other method","The model might not format the output exactly how you want because it has no examples to mimic","It requires a GPU to read","It deletes the context window"], answerIndex: 1 },
                            { question: "If you ask an AI: \"Extract all dates from this email: [Text]\", you are using:", options: ["Few-Shot prompting","Zero-Shot prompting","Chain-of-Thought prompting","Fine-tuning"], answerIndex: 1 },
                            { question: "Zero-shot prompting works best on tasks that are:", options: ["Highly complex and completely unique to your business","Common, clear, and easily understood through standard language instructions","Written only in programming languages","Done using spreadsheet math"], answerIndex: 1 },
                            { question: "To get the best results in a zero-shot prompt, your instruction should be:", options: ["Vague and broad","Clear, specific, and direct","Long and filled with random words","Written in code blocks only"], answerIndex: 1 },
                            { question: "Which prompt is a zero-shot request for text summarization?", options: ["Summarize this article in 3 bullet points: [Article]","Here is an example of a summary... Now summarize this: [Article]","Read this article and count the letters: [Article]","Write a story about an article."], answerIndex: 0 },
                            { question: "When an LLM answers a zero-shot prompt correctly, it is demonstrating its ____ capability.", options: ["Traditional database indexing","Generalization","Copy-pasting","Image rendering"], answerIndex: 1 },
                            { question: "What is the structural difference between a zero-shot prompt and a few-shot prompt?", options: ["Zero-shot uses no punctuation","Zero-shot has no example inputs/outputs; few-shot has one or more examples","Few-shot is always shorter","Zero-shot can only be used on GPT-3"], answerIndex: 1 },
                            { question: "Which task is LEAST likely to get a perfect format on the first try with zero-shot prompting?", options: ["Changing text to uppercase","Generating highly complex, custom nested JSON data with strict key constraints","Answering a simple history question","Translating a single word"], answerIndex: 1 },
                            { question: "If a zero-shot prompt fails to get the right output format, what is the easiest first fix?", options: ["Retraining the whole model","Making the instruction more explicit or switching to few-shot prompting","Deleting the prompt","Changing your internet browser"], answerIndex: 1 },
                            { question: "True or False: Instruction-tuned models (like chat models) are generally better at zero-shot prompting than raw base models.", options: ["True","False"], answerIndex: 0 },
                            { question: "What does \"zero-shot classification\" mean?", options: ["Categorizing data into classes that the model has never heard of","Categorizing text into predefined labels without providing sample pairs in the prompt","Deleting all target classes","Sorting words alphabetically"], answerIndex: 1 },
                            { question: "If you prompt: \"Is the following review positive or negative? 'The food was cold.'\", this is an example of:", options: ["Few-shot generation","Zero-shot sentiment analysis","Chain-of-thought logic","Database query translation"], answerIndex: 1 },
                            { question: "What role does context play in a zero-shot prompt?", options: ["Context is not allowed","It provides the background information or text the model needs to act upon","It must include at least three examples","It defines the model's parameters"], answerIndex: 1 },
                            { question: "Which of these fields benefits heavily from quick zero-shot prototyping?", options: ["Customer support routing (sorting incoming emails by topic)","Hardware chip design","Advanced quantum system control","Memory hardware storage optimization"], answerIndex: 0 },
                            { question: "Can you specify the desired output format in a zero-shot prompt?", options: ["No, formats require examples","Yes, you can explicitly ask for formats like 'Output as a bulleted list' or 'Return only HTML'","Only if you use markdown code blocks","Only for numbers"], answerIndex: 1 },
                            { question: "Which of the following prompts is zero-shot?", options: ["Fix the grammar in this sentence: 'He don't know nothing.'","Sentence: 'He don't know.' -> Fixed: 'He doesn't know.' Sentence: 'She walk.' -> Fixed:","Let's think step by step to fix this grammar.","Write a Python script to fix grammar."], answerIndex: 0 },
                            { question: "What happens if a zero-shot prompt is too ambiguous?", options: ["The model crashes with an error code","The model may generate a creative but irrelevant or incorrect response","The model automatically fixes the prompt text","The vocabulary size drops"], answerIndex: 1 },
                            { question: "If you say \"Tell me a joke about computers\" without any further text, this is a:", options: ["Few-shot generation prompt","Zero-shot generation prompt","Structured code query","System configuration flag"], answerIndex: 1 },
                            { question: "\"Zero-shot baseline\" refers to:", options: ["The maximum speed of a model","The performance score a model gets on a task using just zero-shot prompts, used to measure improvements later","The minimum memory required by a model","The bottom layer of an embedding matrix"], answerIndex: 1 }
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
                            { question: "Which model capability is heavily tested by zero-shot prompting?", options: ["Long-term state storage","Understanding and executing natural language instructions","Mathematical perfection","Internet speed optimization"], answerIndex: 1 },
                            { question: "If an AI successfully writes a poem about quantum physics in zero-shot, where did it get the knowledge of quantum physics?", options: ["It guessed randomly","From its internal pre-trained weights","From hidden text inside the prompt","From a local dictionary file"], answerIndex: 1 },
                            { question: "What is a common reason for zero-shot prompt failure?", options: ["The instruction is unclear or the task is too nuanced to explain without examples","The prompt is too short for the model to see","The model doesn't support English words","The temperature is set to zero"], answerIndex: 0 },
                            { question: "Which of these prompts uses zero-shot to perform code generation?", options: ["Write a Python function to calculate the factorial of a number.","Here is a function... copy it.","def factorial(n): # example code","Explain what Python means."], answerIndex: 0 },
                            { question: "If you ask an AI to extract keywords from a text without providing example keywords, this is called:", options: ["Few-shot extraction","Zero-shot extraction","CoT analysis","Pattern matching"], answerIndex: 1 },
                            { question: "When should you choose Zero-Shot over Few-Shot prompting?", options: ["When you have hundreds of example input-outputs ready","When you want to save tokens and the task is simple enough to explain with text instructions alone","When you need strict structured JSON validation guaranteed","When training an embedding matrix"], answerIndex: 1 },
                            { question: "Which of these prompts is a zero-shot translation request?", options: ["Translate 'Where is the library?' into French.","Hello -> Bonjour. Where is the library? ->","Let's translate words one by one.","Open a French dictionary."], answerIndex: 0 },
                            { question: "Does zero-shot prompting change the permanent weights of an LLM?", options: ["Yes, permanently","No, it only affects the current generation window","Only if the answer is correct","Only for open-source models"], answerIndex: 1 },
                            { question: "Which phrase is a zero-shot style formatting constraint?", options: ["Respond only with a valid JSON array.","Like the example below:","See how I did this?","Let's think step by step."], answerIndex: 0 },
                            { question: "What type of model tuning makes zero-shot prompting highly effective?", options: ["Word2Vec alignment","Instruction Fine-Tuning (IFT) / RLHF","One-hot scaling","Quantization"], answerIndex: 1 },
                            { question: "Which prompt is zero-shot entity recognition?", options: ["Identify all names of companies in this text: [Text]","Google (Company), Apple (Company), Now read this: [Text]","What is a company?","List 10 famous companies."], answerIndex: 0 },
                            { question: "If you prompt an LLM to \"Act as a professional copywriter and rewrite this paragraph: [Paragraph]\", this is:", options: ["Few-shot roleplay","Zero-shot persona prompting","Chain-of-thought logic","Matrix reduction"], answerIndex: 1 },
                            { question: "Zero-shot prompting can be described as:", options: ["Training a model from scratch","Programming via pure natural language instruction","Coding with binary steps","Compiling a text file"], answerIndex: 1 },
                            { question: "Which metric is directly reduced when you use zero-shot instead of few-shot prompting?", options: ["Input token count (and cost)","Vocabulary size","Context length capability","Model accuracy on every task"], answerIndex: 0 },
                            { question: "If a model hallucinates an answer to a zero-shot prompt, what does it mean?", options: ["It found the answer online","It generated confident-sounding but incorrect or fabricated information","It turned off its attention heads","It requested more examples"], answerIndex: 1 },
                            { question: "What is the outcome of a zero-shot prompt that says \"Answer in one word: Yes or No\"?", options: ["The model must output a paragraph","The model's output space is constrained by the textual instruction","The model throws a system error","The model creates a new token"], answerIndex: 1 },
                            { question: "Can a zero-shot prompt be long?", options: ["No, it must be under 10 words","Yes, it can contain long background data or documents, as long as it contains no input-output demonstrations","Only if it is written in Markdown","Only on desktop computers"], answerIndex: 1 },
                            { question: "Which of these is a zero-shot prompt for a creative task?", options: ["Write a sci-fi story about a robot learning to paint.","Story 1... Story 2... Now write Story 3.","Copy this text exactly.","What is the definition of sci-fi?"], answerIndex: 0 },
                            { question: "What is a great use-case for zero-shot text transformation?", options: ["Converting unstructured text into a clean Markdown table","Training a neural network layer","Building an embedding index","Running an arithmetic array sum"], answerIndex: 0 },
                            { question: "Which of these prompts is NOT zero-shot?", options: ["Correct the spelling in this text: [Text]","Convert this text to passive voice: [Text]","Example 1: active -> passive. Now convert this: [Text]","Summarize the following text: [Text]"], answerIndex: 2 },
                            { question: "Zero-shot prompting works by leveraging the model's:", options: ["Short-term memory files","Pre-trained semantic associations and instruction-following alignment","External plugin tools","Hard-coded regular expressions"], answerIndex: 1 },
                            { question: "If you give a model a prompt with an invalid instruction style, a zero-shot attempt will likely:", options: ["Succeed perfectly","Fail or degrade in output quality","Format the hard drive","Run faster"], answerIndex: 1 },
                            { question: "Which keyword is commonly found in zero-shot instructions to guide formatting?", options: ["Using the style of the pattern above","Strictly follow this constraint:","As shown in example 1","Repeat the template"], answerIndex: 1 },
                            { question: "In zero-shot prompting, the model's behavior is guided by:", options: ["Historical chat logs from other users","The semantic meaning and context of the instruction text itself","A list of hard-coded rules","Custom weights loaded by the user"], answerIndex: 1 },
                            { question: "What is the best way to test if a task can be done with zero-shot prompting?", options: ["Write a complex script immediately","Simply type a clear instruction into the model and evaluate the response quality","Review the source code of the tokenizer","Purchase more cloud storage"], answerIndex: 1 }
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
                text: "To implement In-Context Learning (ICL) by feeding a curated sequence of input-output exemplars to an LLM, guiding it to mimic specific stylistic, structural, or categorical distribution patterns.",
                bullets: []
              },
              theory: [
                {
                  title: "In-Context Learning (ICL)",
                  body: [
                    "When zero-shot constraints fail on highly specific formatting tasks, engineers turn to Few-Shot Prompting, also known as In-Context Learning.",
                    "By appending a series of perfect input-output examples directly into the prompt payload, the LLM temporarily 'learns' the desired pattern without actually changing its underlying neural weights.",
                    "This allows developers to rapidly prototype custom formatting behaviors (like proprietary JSON schemas or unique classification labels) without the immense cost of training a fine-tuned model."
                  ]
                },
                {
                  title: "Mitigating Exemplar Bias",
                  body: [
                    "Few-shot prompting carries risks. LLMs suffer from 'Majority Label Bias' and 'Recency Bias'. If you provide three 'Positive' examples and only one 'Negative' example, the model becomes statistically biased toward outputting 'Positive'.",
                    "To prevent this, engineers must carefully balance their exemplars and intentionally randomize their order to prevent the model from blindly mimicking the structure of the last provided example."
                  ]
                }
              ],
              pretest: [
                            { question: "What is Few-Shot Prompting?", options: ["Giving the AI model a few seconds to think","Providing a few input-output examples (demonstrations) within the prompt to show the model how to perform a task","Sending a few separate prompts at the same time","Training the model on a few mega-bytes of data"], answerIndex: 1 },
                            { question: "What does the \"Shot\" refer to in Few-Shot Prompting?", options: ["A program error","An example or demonstration pair (Input -> Output)","A token count metric","A network layer block"], answerIndex: 1 },
                            { question: "How many examples are typically provided in a few-shot prompt?", options: ["Zero","Between 1 and a small handful (e.g., 2 to 5)","Exactly 10,000","Millions"], answerIndex: 1 },
                            { question: "What is a \"One-Shot\" prompt?", options: ["A prompt containing exactly one example of the task","A prompt that works only one time","A prompt with one word","A prompt that clears the context window"], answerIndex: 0 },
                            { question: "Which of these represents a typical structural pattern for a few-shot prompt?", options: ["Instruction -> Text","Example 1 Input -> Example 1 Output -> Example 2 Input -> Example 2 Output -> New Input ->","Instruction -> Let's think step by step","Schema -> JSON Validator"], answerIndex: 1 },
                            { question: "Why do we use Few-Shot Prompting?", options: ["To make the prompt load faster","To teach the model a specific formatting pattern, style, or nuanced logic that is hard to explain in text alone","To update the core neural network weights","To clean up spelling errors automatically"], answerIndex: 1 },
                            { question: "Where are the examples in few-shot prompting stored?", options: ["On the AI server's hard drive","Directly inside the prompt text (in the context window)","In an external vector database","Inside the token lookup index"], answerIndex: 1 },
                            { question: "Few-shot prompting relies heavily on the model's ability to do:", options: ["Long-term deep learning weight adjustments","In-context learning","Hard-coded data lookups","Graphical pattern rendering"], answerIndex: 1 },
                            { question: "Which of the following prompts is a Few-Shot prompt?", options: ["Great movie! -> Positive. Terrible acting! -> Negative. The plot was okay. ->","Classify this review as positive or negative: 'The plot was okay.'","Let's find the sentiment step by step.","Write a movie review."], answerIndex: 0 },
                            { question: "What is a key difference between Few-Shot Prompting and Fine-Tuning?", options: ["Fine-tuning changes model weights; few-shot prompting only provides context within the prompt without changing weights","Few-shot is more expensive to train","Fine-tuning happens inside the context window","Few-shot is done using binary code files"], answerIndex: 0 },
                            { question: "In few-shot prompting, what happens if your examples have inconsistent formatting?", options: ["The model crashes","The model may become confused and output poorly formatted or unpredictable results","The model automatically corrects your examples","The vocabulary size doubles"], answerIndex: 1 },
                            { question: "If you want an LLM to output data in a very strange format, like [Word]||[Meaning], what should you do?", options: ["Ask nicely in zero-shot","Provide 2-3 few-shot examples showing exactly that format","Use a chain-of-thought phrase","Change the model temperature to 1.0"], answerIndex: 1 },
                            { question: "Which prompt is a few-shot example for text transformation?", options: ["In: cat -> Out: cats. In: dog -> Out: dogs. In: mouse -> Out:","Make these words plural: cat, dog, mouse.","Let's make words plural step by step.","What does plural mean?"], answerIndex: 0 },
                            { question: "What is a \"Label Bias\" risk in few-shot prompting?", options: ["The model forgets English labels","If your examples mostly show one specific answer (e.g., all examples are labeled Positive), the model might lean toward that answer regardless of the new input","The labels become too large to read","The model ignores the input labels completely"], answerIndex: 1 },
                            { question: "To avoid bias, the distribution of labels or answers in your few-shot examples should ideally be:", options: ["All identical","Balanced and representative of the real task distribution","Completely empty","Written in numerical codes only"], answerIndex: 1 },
                            { question: "What is the impact of few-shot prompting on your token usage?", options: ["It decreases tokens drastically","It increases token usage because every example adds text to the input context window","It has no effect on tokens","It sets tokens to zero"], answerIndex: 1 },
                            { question: "Which of these prompts shows a one-shot translation task?", options: ["Input: Boy -> Output: Garcon. Input: Girl -> Output:","Translate 'Girl' to French.","Input: Boy -> Output: Garcon. Input: Car -> Output: Voiture. Input: Girl ->","How do you say girl in French?"], answerIndex: 0 },
                            { question: "What happens if you provide incorrect answers in your few-shot examples?", options: ["The model ignores your mistakes and outputs the correct answer","The model mimics the task structure but may learn the wrong mapping or perform poorly","The system blocks the prompt automatically","The context window shortens"], answerIndex: 1 },
                            { question: "When building a few-shot prompt, the separator between examples (like ### or ---) helps the model:", options: ["Run faster on the GPU","Distinguish where one example ends and the next one begins","Delete old tokens","Format the output into code"], answerIndex: 1 },
                            { question: "Few-shot prompting can guide the model's:", options: ["Tone and style of writing","Task logic","Output formatting constraints","All of the above"], answerIndex: 3 },
                            { question: "What is \"Many-Shot Prompting\"?", options: ["Sending thousands of prompts in a loop","Scaling up the number of in-context examples to dozens or hundreds, enabled by modern large context windows","Deleting all examples","Using multiple AI models at once"], answerIndex: 1 },
                            { question: "Which strategy improves few-shot performance?", options: ["Choosing examples that are semantically similar or relevant to the actual test input","Using random characters between examples","Keeping all outputs blank","Using as few words as possible"], answerIndex: 0 },
                            { question: "If you provide 3 examples in a prompt, you are doing:", options: ["Zero-shot prompting","3-shot prompting (Few-shot)","CoT processing","Fine-tuning alignment"], answerIndex: 1 },
                            { question: "Which of these is a few-shot prompt for a classification task with three classes?", options: ["Text: Apple -> Class: Fruit. Text: Honda -> Class: Car. Text: Desk -> Class: Furniture. Text: Toyota -> Class:","Is Toyota a car, fruit, or furniture?","Let's sort things into categories.","Define fruit, car, and furniture."], answerIndex: 0 },
                            { question: "What role does the final open-ended line (like New Input -> ) play in a few-shot prompt?", options: ["It acts as a pattern completion trigger for the model to generate the final missing output","It resets the model's weights","It validates the JSON schema","It closes the text file connection"], answerIndex: 0 }
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
                            { question: "Few-shot prompting is incredibly effective for creating:", options: ["Highly customized, domain-specific text extractions that follow an exact structure","Brand-new foundation architectures","Fast web browsers","Database tables from scratch"], answerIndex: 0 },
                            { question: "Which task benefits more from few-shot prompting than basic zero-shot instructions?", options: ["Asking for the capital of France","Generating text using an extremely weird and specific acronym pattern matching a company profile","Reversing a short string of numbers","Checking a simple spelling error"], answerIndex: 1 },
                            { question: "If you show a model: \"Tweet: 'I hate traffic' -> Emotion: Angry. Tweet: 'Sunny day!' -> Emotion: Happy. Tweet: 'Oh look, rain again' -> \", you are demonstrating:", options: ["Zero-shot logic","Few-shot emotion classification","Multi-modal retrieval","Parameter search"], answerIndex: 1 },
                            { question: "Does the order of examples in a few-shot prompt matter?", options: ["No, never","Yes, models can sometimes show a recency bias, paying more attention to the final example closest to the new input","Only if you use numbers","Only in dark mode interfaces"], answerIndex: 1 },
                            { question: "If you have an option between using 5 clear examples or 50 messy examples in a standard prompt, it is usually better to choose:", options: ["The 50 messy ones to increase token size","The 5 clean, high-quality, perfectly formatted ones","Neither (use zero examples)","Randomly mixed sets"], answerIndex: 1 },
                            { question: "What is a bottleneck of few-shot prompting when using an API that charges per token?", options: ["It requires installing extra software","The cost scales up because you are paying for the example tokens over and over with every single request","It takes hours to return a single output","It lowers API connection limits"], answerIndex: 1 },
                            { question: "Which prompt structure shows a one-shot example of code generation?", options: ["# Task: Print Hello\nprint('Hello')\n\n# Task: Print Goodbye\n","Write a program to print Goodbye.","Let's code step by step.","What is the command to print a string?"], answerIndex: 0 },
                            { question: "In few-shot prompting, the examples act as a ____ for the model's output generation layer.", options: ["Firewall","Template or structural guide","Memory clear command","Hardware accelerator"], answerIndex: 1 },
                            { question: "If your few-shot prompt returns a repetitive loop of the examples themselves, what is likely wrong?", options: ["The prompt format didn't cleanly separate the demonstrations from the new question line, or stop tokens were missing","The model is out of storage","The input was too short","The learning rate was too high"], answerIndex: 0 },
                            { question: "Few-shot learning is an emergent property observed prominently as models get:", options: ["Smaller and faster","Larger in parameter size and pre-trained on diverse datasets","Restricted to single languages","Configured with low memory bounds"], answerIndex: 1 },
                            { question: "Which of the following prompts uses examples to specify style?", options: ["Review: Good -> Response: Thanks! Review: Bad -> Response: Sorry. Review: Great ->","Answer all customer reviews politely.","What should I say to a good review?","Write a template for reviews."], answerIndex: 0 },
                            { question: "If you notice a model is struggling to understand a complex logic rule via instructions alone, you should add:", options: ["More exclamation marks","A few step-by-step few-shot examples illustrating the rule in action","A blank line","A system restart command"], answerIndex: 1 },
                            { question: "What do we call the format pattern matching that happens in few-shot prompting?", options: ["Contextual Mimicry / Mimicking","Dynamic Fine-tuning","Compilation processing","Syntactic Encryption"], answerIndex: 0 },
                            { question: "Which prompt is a 2-shot extraction example?", options: ["Text: John from NY -> Name: John, Loc: NY. Text: Mary from LA -> Name: Mary, Loc: LA. Text: Bob from TX ->","Extract name and location from this text: Bob from TX.","Let's find the location information step by step.","Where is Bob from?"], answerIndex: 0 },
                            { question: "Few-shot examples should ideally contain:", options: ["Both the expected input and the exact corresponding correct output","Just a list of random inputs","Just a list of random outputs","Explanations of what a token is"], answerIndex: 0 },
                            { question: "What is a \"Shot Count\"?", options: ["The speed of text generation","The number of examples provided in a prompt context","The size of the embedding vector","The token processing limit"], answerIndex: 1 },
                            { question: "Which of these prompts uses few-shot prompting for math reasoning?", options: ["Q: 2+2 -> A: 4. Q: 3+3 -> A: 6. Q: 4+4 -> A:","What is 4+4?","Calculate the sum of four and four.","Let's add 4 and 4."], answerIndex: 0 },
                            { question: "Few-shot prompting helps standard models achieve higher accuracy on specialized tasks without requiring:", options: ["Any input text","Expensive weight training or specialized deployment pipelines","Tokenizers","An internet connection"], answerIndex: 1 },
                            { question: "If a few-shot prompt contains 5 examples of text classification, what should follow immediately after the 5th example output?", options: ["The 1st example again","The new, real input that you want the model to classify","A long closing summary","The entire system vocabulary list"], answerIndex: 1 },
                            { question: "In context learning means the model learns patterns during:", options: ["Inference time (just reading the prompt text)","The pre-training phase on web clusters","The chip manufacturing phase","The database configuration script"], answerIndex: 0 },
                            { question: "Which phrase describes a major feature of few-shot prompts?", options: ["No examples needed","Demonstration-driven context","Zero-token baseline","Direct hardware code execution"], answerIndex: 1 },
                            { question: "Can few-shot prompts be combined with roleplay personas?", options: ["No, they conflict","Yes (e.g., instructing the model to act as a bot, followed by examples of how that bot talks)","Only if you use JSON schemas","Only for arithmetic tasks"], answerIndex: 1 },
                            { question: "If your model's few-shot response stops halfway through, what is a likely cause?", options: ["You hit the max output token configuration limit","The examples were too short","You didn't use enough spaces","The model went into an infinite loop"], answerIndex: 0 },
                            { question: "Which component is NOT a necessary part of an individual few-shot example?", options: ["A sample input representation","A sample correct output representation","A direct link to a web search query URL","A consistent structural separator"], answerIndex: 2 },
                            { question: "Few-shot prompting is a foundational skill in:", options: ["Prompt Engineering","Database Administration","Computer Hardware repair","Network Router wiring"], answerIndex: 0 }
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
                text: "To unpack complex symbolic logic, mathematical deduction, and multi-step reasoning in an LLM by forcing the generation of an explicit intermediate rationale sequence before outputting the final answer.",
                bullets: []
              },
              theory: [
                {
                  title: "The Computational Bottleneck",
                  body: [
                    "Standard LLMs process text autoregressively, predicting the next token based entirely on the existing context. If a user asks a complex math question and demands an immediate final answer, the model is forced to compute the entire multi-step solution in a single mathematical prediction.",
                    "This frequently causes catastrophic hallucinations in logic, mathematics, and multi-hop reasoning tasks."
                  ]
                },
                {
                  title: "Unlocking Working Memory",
                  body: [
                    "Chain-of-Thought (CoT) Prompting solves this by forcing the model to 'think out loud'. By generating intermediate reasoning steps before outputting the final answer, the model is given extra computational space.",
                    "Every new token generated during the reasoning phase is fed back into the context window, effectively acting as an expanded working memory. This allows the model to break down complex logic sequentially.",
                    "Techniques like Zero-Shot CoT simply append the phrase 'Let's think step by step', while Few-Shot CoT provides explicit examples of correct reasoning pathways."
                  ]
                }
              ],
              pretest: [
                            { question: "What is the primary goal of Chain-of-Thought (CoT) Prompting?", options: ["To make the model generate random thoughts","To break down complex multi-step reasoning problems into a series of intermediate logical steps","To force the model to respond in a single word","To speed up token generation speeds"], answerIndex: 1 },
                            { question: "What iconic phrase triggers Zero-Shot Chain-of-Thought reasoning in an LLM?", options: ["Respond as fast as possible.","Let's think step by step.","Give me the final answer immediately.","Format this as a clean JSON file."], answerIndex: 1 },
                            { question: "Who introduced the Chain-of-Thought prompting approach in 2022?", options: ["Google researchers (Wei et al.)","OpenAI web designers","Meta database administrators","Linux core engineering team"], answerIndex: 0 },
                            { question: "Why does CoT prompting improve performance on reasoning tasks (like math or logic)?", options: ["It bypasses the tokenizer","It allows the model to allocate more computational steps (tokens) to process the reasoning path before arriving at a final answer","It makes the hidden layer vectors smaller","It queries a calculator API behind the scenes"], answerIndex: 1 },
                            { question: "Which task benefits the MOST from Chain-of-Thought prompting?", options: ["Translating 'Hello' into German","Solving a complex word problem involving math and logic constraints","Capitalizing a list of names","Extracting a phone number from a text block"], answerIndex: 1 },
                            { question: "What is a \"reasoning chain\"?", options: ["A network cables connection setup","The sequence of intermediate logical thoughts generated by the model to solve a problem","A list of vocabulary tokens","A system configuration parameter"], answerIndex: 1 },
                            { question: "In a standard Few-Shot CoT prompt, what do the examples contain?", options: ["Just questions and final answers","Questions, a step-by-step handwritten explanation of the solution logic, and the final answer","A list of dictionary definitions","Random equations"], answerIndex: 1 },
                            { question: "If an AI model answers a math word problem incorrectly using a zero-shot prompt, what should you try first to fix its logic?", options: ["Append 'Let's think step by step' to the prompt","Remove all punctuation from the text","Ask it to translate the problem to French first","Set the generation length limit to 5 tokens"], answerIndex: 0 },
                            { question: "What does the model do with its own intermediate steps during CoT generation?", options: ["It deletes them immediately","It reads them as part of its growing context to build up and inform the next step of the calculation","It encrypts them for privacy","It saves them to a separate database file"], answerIndex: 1 },
                            { question: "Chain-of-Thought prompting shifts the model from rapid intuitive matching to:", options: ["Hardware compilation code execution","Explicit, structured step-by-step reasoning paths","Direct search index queries","Random distribution paths"], answerIndex: 1 },
                            { question: "Which prompt is a clear example of Zero-Shot CoT?", options: ["John has 5 apples. He buys 2 more. How many does he have? Let's think step by step.","John has 5 apples. He buys 2 more. Answer: 7.","Q: 2+2=4. Now answer: John has 5 apples...","Write a recipe for apple pie."], answerIndex: 0 },
                            { question: "What is a drawback of using Chain-of-Thought prompting?", options: ["It makes the model stop responding completely","It increases output token consumption and takes longer to finish generating because the model writes out its thoughts","It decreases model accuracy on simple tasks","It forces the model to use dark mode"], answerIndex: 1 },
                            { question: "What is \"Self-Consistency\" in the context of CoT?", options: ["Checking if the user is logged in","Generating multiple diverse reasoning paths (paths of thought) and taking the most common/majority final answer","Keeping the temperature set at exactly 0","Erasing all attention heads"], answerIndex: 1 },
                            { question: "Which phrase represents an intermediate step in a reasoning chain for: \"If a shirt costs $20 and is 50% off, how much is it?\"", options: ["Answer: $10","First, find 50% of $20, which is $20 divided by 2, giving $10.","Shirt sale transaction","Price matrix list"], answerIndex: 1 },
                            { question: "Can CoT prompting be mixed with Few-Shot prompting?", options: ["No, they are completely separate paradigms","Yes, this is Few-Shot CoT (providing a few examples that show explicit step-by-step reasoning paths)","Only if the text is under 50 words","Only for programming code documentation"], answerIndex: 1 },
                            { question: "What is \"Automatic Chain-of-Thought\" (Auto-CoT)?", options: ["Having the system automatically generate reasoning examples for datasets without manual human writing","Deleting the reasoning chains automatically","Automatically running Python code loops","Bypassing the LLM entirely"], answerIndex: 0 },
                            { question: "If the reasoning chain generated by a model contains a mistake early on, what usually happens to the final answer?", options: ["The final answer is automatically corrected by the system layer","The error cascades down, leading to an incorrect final answer (garbage in, garbage out)","The model shuts down","The prompt resets"], answerIndex: 1 },
                            { question: "Which of these prompts uses CoT for a logic puzzle?", options: ["Who is taller if A is taller than B and B is taller than C? Explain your logic step by step before stating the answer.","A > B > C. Who is tallest?","List names of tall people.","Define what taller means."], answerIndex: 0 },
                            { question: "CoT prompting relies heavily on the autoregressive nature of LLMs, meaning each token generated is conditioned on:", options: ["Just the initial prompt instruction","All previously generated tokens in the reasoning chain","A template file index","A random distribution function"], answerIndex: 1 },
                            { question: "What type of tasks show almost NO improvement when using CoT prompting?", options: ["Math word problems","Commonsense symbolic reasoning puzzles","Simple, direct factual retrieval tasks (e.g., What is the capital of Germany?)","Complex multi-stage planning tasks"], answerIndex: 2 },
                            { question: "If you only want the final answer but you used CoT, how can you parse the output?", options: ["You cannot parse it","Instruct the model to conclude its thought process with a specific tag like 'Therefore, the final answer is: [answer]' and extract it via regex or code","Delete the reasoning chain steps manually during generation","Lower the model token window to 2"], answerIndex: 1 },
                            { question: "What does a model do during a reasoning chain when it says \"Wait, let me double check that\"?", options: ["It is calling an external verification tool","It is generating text tokens that track its own self-correction patterns learned during training","It is restarting its prompt reading step","It is throwing an internal validation exception"], answerIndex: 1 },
                            { question: "Which layout is ideal for a few-shot CoT example?", options: ["Question -> Final Answer","Question -> Thought Process Steps -> Final Answer","Thought Process Steps -> Question -> Final Answer","Just final answer blocks"], answerIndex: 1 },
                            { question: "Chain-of-Thought prompting works well because it mimics how humans:", options: ["Store files on a computer drive","Work through tough problems out loud or on scratch paper step by step","Search code on open repos","Scan text rapidly without reading details"], answerIndex: 1 },
                            { question: "If a model fails a math task using CoT, what is a great way to debug its prompt?", options: ["Review the generated thought chain to pinpoint exactly which step the logic or calculation broke down","Shorten the prompt text","Change all variable names to letters","Switch the user interface style"], answerIndex: 0 }
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
                            { question: "What is a \"Tree of Thoughts\" (ToT) prompting framework?", options: ["A way to sort words alphabetically in a tree diagram","An advanced extension of CoT where the model explores multiple alternative reasoning paths, branching out and evaluating steps along the way","A list of green theme templates","A simple single-token model setup"], answerIndex: 1 },
                            { question: "How does Tree of Thoughts differ from standard Chain of Thought?", options: ["ToT explores multiple branching choices and backtracks if a path fails; CoT follows a single linear chain of thoughts","ToT is faster to compute","CoT does not use token embeddings","ToT can only look at 2 words at a time"], answerIndex: 0 },
                            { question: "Which of the following is an example of symbolic reasoning where CoT shines?", options: ["Writing a marketing email","Tracking the positions of flipped cups in a puzzle sequence step by step","Translating text into Spanish","Counting vowels in a single short word"], answerIndex: 1 },
                            { question: "True or False: Chain-of-Thought reasoning can help an AI model explain why it made a specific decision.", options: ["True","False"], answerIndex: 0 },
                            { question: "What phrase can be placed at the end of a prompt to encourage clear logical deductions?", options: ["Skip all steps.","Provide a detailed justification for each step taken toward the solution.","Just guess quickly.","Output standard codes."], answerIndex: 1 },
                            { question: "What type of models show the most dramatic performance jumps when using CoT prompting?", options: ["Tiny models (under 1 Billion parameters)","Large, capable models (often 70B+ parameters or highly tuned frontier models)","Models with no embedding layers","Simple static regression networks"], answerIndex: 1 },
                            { question: "If a prompt says: \"Break this logic puzzle down step by step before choosing an option,\" this is a form of:", options: ["Hard-coded verification","Chain-of-Thought prompting","One-hot matrix extraction","Structured JSON mapping"], answerIndex: 1 },
                            { question: "What is a \"linear reasoning path\"?", options: ["A straight line drawn on a text graph","A consecutive series of thoughts where each step leads directly to the next without branching (standard CoT)","A database indexing table layout","A fast token parsing pipeline"], answerIndex: 1 },
                            { question: "Does CoT prompting require downloading a custom software package or library?", options: ["Yes, the CoT toolkit","No, it is accomplished purely by changing the text content of your prompt","Only for Python scripts","Only when using localized servers"], answerIndex: 1 },
                            { question: "Which of these prompts uses CoT for scheduling logic?", options: ["Can I attend a 2 PM meeting if I have a flight at 3 PM that takes 45 minutes to get to? Let's trace the timeline step by step.","List flight times.","Confirm meeting at 2 PM.","What does schedule mean?"], answerIndex: 0 },
                            { question: "In CoT, the intermediate steps are also known as:", options: ["Rationale / Rationales","Quantization layers","Tokens indices","Binary nodes"], answerIndex: 0 },
                            { question: "What happens to the confidence score of a user evaluating an AI when the AI uses CoT?", options: ["It drops because the text is too long","It often increases because the user can see the underlying transparent logic path instead of just a black-box answer","It stays zero","It causes an interface error"], answerIndex: 1 },
                            { question: "Which keyword implies a conclusion inside a reasoning chain?", options: ["Starting with...","Therefore,","Hypothetically,","Example pair:"], answerIndex: 1 },
                            { question: "CoT prompting is widely used in benchmarks evaluating an AI's:", options: ["Network packet response rate","Problem-solving and reasoning capabilities","Disk storage capacity","Image color depth"], answerIndex: 1 },
                            { question: "If you combine a persona prompt (\"Act as a senior mathematician\") with CoT (\"Think step by step\"), you are:", options: ["Causing a compilation conflict","Layering prompting techniques to optimize performance and reasoning depth","Resetting the model configuration","Running an offline benchmark test"], answerIndex: 1 },
                            { question: "Which prompt is NOT an example of CoT prompting?", options: ["Solve this puzzle by listing out the status of each clue one by one: [Puzzle]","What is 15 multiplied by 4? Give me only the final number.","Let's think step by step to find who owns the car.","Trace the steps of the process carefully before arriving at a final deduction."], answerIndex: 1 },
                            { question: "What does the phrase \"Let's reason about this\" trigger in an instruction-aligned model?", options: ["An immediate direct output skip","A step-by-step reasoning or thought sequence generation (CoT)","A text-to-speech module","A file saving window"], answerIndex: 1 },
                            { question: "CoT helps models deal with \"distractors\" in word problems by allowing the model to:", options: ["Delete random words from the input text block","Evaluate and filter out irrelevant details step by step during the text generation process","Ask the user to rephrase the question","Halt processing immediately"], answerIndex: 1 },
                            { question: "Which phrase best describes the nature of Chain of Thought?", options: ["Unconscious calculation","Explicit textual reasoning","Binary vector mapping","Offline database script execution"], answerIndex: 1 },
                            { question: "What is a \"Thought Token\"?", options: ["A physical coin used for cloud credit","A token generated as part of the model's reasoning process before the final conclusion tokens are reached","A specific punctuation mark like a comma","A system file tag"], answerIndex: 1 },
                            { question: "If you notice a model's CoT path starts repeating loops of the same logical sentence, what can you do to fix it?", options: ["Delete the prompt text entirely","Adjust the repetition penalty configuration parameter or make the prompt instruction more strict","Use larger font files","Type everything in uppercase letters"], answerIndex: 1 },
                            { question: "Can CoT be applied to coding tasks?", options: ["Yes, by prompting the model to write out the pseudo-code and program logic block by block before writing the actual final code function","No, code cannot contain logic chains","Only if writing HTML pages","Only for data structures"], answerIndex: 0 },
                            { question: "In complex math prompts, CoT reduces the likelihood of:", options: ["Token processing costs","Careless computational leaps or logical hallucinations","Fast generations","Clean text styling"], answerIndex: 1 },
                            { question: "Which component forms the core value of a Chain of Thought prompt?", options: ["The strict schema validation table","The deliberate breakdown of an overall problem into sub-problems","The removal of all nouns from the context","The translation of words to numbers manually"], answerIndex: 1 },
                            { question: "Chain-of-Thought prompting is vital for developers building complex workflows using:", options: ["Agentic AI / AI Agents","Simple database scripts","Static frontend web pages","Graphic illustration assets"], answerIndex: 0 }
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
                text: "To enforce strict structural and grammatical constraints on LLM responses, ensuring outputs conform to valid code execution structures (like JSON, YAML, or Pydantic schemas) for downstream application integration.",
                bullets: []
              },
              theory: [
                {
                  title: "The Parsing Problem",
                  body: [
                    "Large Language Models naturally output conversational prose. While excellent for chatbots, this is detrimental for enterprise architectures where an LLM's output must be ingested programmatically by external databases or Python functions.",
                    "If a model outputs 'Here is the JSON you requested: { ... }', the conversational prefix will instantly crash a standard JSON.parse() command."
                  ]
                },
                {
                  title: "Enforcing Structural Output",
                  body: [
                    "Structured Output Generation techniques force the LLM to adhere to a strict programmatic schema. The most basic approach is Prompt Constraints, explicitly telling the model to output *only* valid JSON with no markdown.",
                    "Advanced approaches involve Grammar-Level Constraints, where the API engine restricts the actual probability distribution of the next token. If the token violates the provided Pydantic schema, it is mathematically blocked from being generated.",
                    "This ensures 100% deterministic compliance when bridging the gap between non-deterministic AI generation and rigid traditional software."
                  ]
                }
              ],
              pretest: [
                            { question: "What is Structured Output Generation?", options: ["Making the text print out slowly word-by-word","Forcing an AI model to return its response in an exact, predictable machine-readable format (like JSON, XML, or YAML) matching a specific schema","Writing emails with clean headings","Converting a document into a text file"], answerIndex: 1 },
                            { question: "Which format is the most popular for structured data exchange with modern web APIs?", options: ["TXT","JSON (JavaScript Object Notation)","DOCX","MP4"], answerIndex: 1 },
                            { question: "What happens if an AI model outputs unstructured free-form conversational text when your backend system expects a strict JSON object?", options: ["The computer monitor turns off","Your application script will likely fail or throw a parsing error","The model automatically reformats the text code behind the scenes","The vocabulary size is recalculated"], answerIndex: 1 },
                            { question: "What tool or methodology is commonly used to enforce structural constraints on JSON generation at the API layer?", options: ["Pydantic schemas or JSON Schema definitions","Text style guidelines","Regular expression dictionaries","Standard text file readers"], answerIndex: 0 },
                            { question: "Which of these blocks is a valid structured JSON response for a person object?", options: ["The person is named John and is 25 years old.","{\"name\": \"John\", \"age\": 25}","[John, 25]","name=John&age=25"], answerIndex: 1 },
                            { question: "Why is structured output generation critical for developer workflows?", options: ["It makes the text colorful","It allows AI responses to be directly parsed and integrated seamlessly into programmatic app code and databases without complex regex parsing","It speeds up internet routing","It lowers data center power usage"], answerIndex: 1 },
                            { question: "What does a \"Schema\" define in structured generation?", options: ["The font size of the text output","The exact keys, data types (e.g., string, integer), and required fields that the output must contain","The background color of the web portal","The network bandwidth limits"], answerIndex: 1 },
                            { question: "Which of these prompts explicitly requests a structured output?", options: ["Tell me about a book.","Return the book title and author as a JSON object with keys 'title' and 'author'.","Write a review for a book.","What is your favorite book?"], answerIndex: 1 },
                            { question: "What is a \"JSON Schema\"?", options: ["A type of code editor","A declarative language format used to validate the structure, keys, and values of a JSON data payload","A design template for landing pages","A data storage hardware drive"], answerIndex: 1 },
                            { question: "If an AI output contains the text: <data><id>1</id><name>Bob</name></data>, it is structured using:", options: ["JSON","XML","Markdown headings","CSV rows"], answerIndex: 1 },
                            { question: "What modern capability do frontier AI provider APIs offer to guarantee valid JSON formatting?", options: ["JSON Mode or Structured Outputs with forced schema constraints via grammar-guided decoding","Automatic text spellcheckers","Inline code block syntax highlighting","Hard-coded regular expression templates"], answerIndex: 0 },
                            { question: "What is \"Grammar-Guided Decoding\"?", options: ["A system that fixes grammar errors in prompt text","A technique where the model's token selection choices are physically restricted at inference time to only allow tokens that fit a valid schema pattern","A list of dictionary rules","An automatic language translator"], answerIndex: 1 },
                            { question: "If you request a structured output using a schema requiring an array of integers, what can the model output next inside the array brackets?", options: ["A word string like 'hello'","Only numbers (integers) or a closing bracket","A paragraph of conversational text","A link URL"], answerIndex: 1 },
                            { question: "Which python library is heavily used with OpenAI or Google Gemini developer toolkits to define structured data schemas using python classes?", options: ["NumPy","Pydantic","Pygame","Matplotlib"], answerIndex: 1 },
                            { question: "If a field in your JSON schema is marked as required, what happens if the model misses it?", options: ["The backend validation system will catch the error and throw an invalid schema validation exception","The system fills it with a random name","The program skips the entire step silently","The text font is set to red"], answerIndex: 0 },
                            { question: "Which of the following is a key advantage of API-enforced structured outputs?", options: ["It eliminates the need for any prompt text instructions","It guarantees 100% syntactical compliance with your target data structure schema","It speeds up training workflows","It translates code into different programming languages automatically"], answerIndex: 1 },
                            { question: "What is a \"Key-Value Pair\"?", options: ["A type of secure access token string","A foundational data layout structure consisting of an identifier key mapped to a specific content value field","Two separate text files","A system encryption algorithm"], answerIndex: 1 },
                            { question: "Which prompt constraint specifies a structured date sequence?", options: ["Give me a date.","Output the date strictly in the ISO 8601 format: YYYY-MM-DD.","What day is it today?","Write down a list of months."], answerIndex: 1 },
                            { question: "Structured generation allows developers to easily transform unstructured web text into a:", options: ["Completely blank text layer","Clean, structured relational database row or object model","Fast data center hardware wire","Single character value"], answerIndex: 1 },
                            { question: "What type of data type rule inside a structured object handles yes/no values?", options: ["String","Boolean (True/False)","Integer","Float"], answerIndex: 1 },
                            { question: "If a model generated structured text but has a missing closing brace }, this JSON data is considered:", options: ["Valid","Malformed / Invalid","Compressed","Encrypted"], answerIndex: 1 },
                            { question: "What is a \"parser validation loop\"?", options: ["An error that loops forever in code","A program logic flow where you check the AI's output format, catch formatting bugs, and prompt the AI again with the error message to fix it","A type of memory array block","A chip layout design file"], answerIndex: 1 },
                            { question: "When forcing a model to generate JSON via schema enforcement, can the model still write conversational filler text before the bracket?", options: ["Yes, if standard JSON Mode is unconstrained or unguided","No, strict structured output constraints force the generation layer to start directly with the opening bracket { or [ token","Only if the text is in Spanish","Only on desktop applications"], answerIndex: 1 },
                            { question: "Which data structure represents a collection of similar structured objects stacked together?", options: ["A single integer value","A JSON Array or List of objects","A markdown header title","A plain text string file"], answerIndex: 1 },
                            { question: "What happens to model hallucinations inside a structured output?", options: ["They are completely prevented from happening","The format will be perfectly valid, but the data values inside the keys can still be hallucinated or incorrect facts","The model turns them into code blocks automatically","They cause validation systems to pass automatically"], answerIndex: 1 }
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
                            { question: "Structured output generation is highly useful for which automation pipeline step?", options: ["Named Entity Recognition (extracting entities straight into structured database arrays)","Cleaning up computer fan dust","Designing brand logo vector images","Reversing file directory arrays"], answerIndex: 0 },
                            { question: "If you need an AI tool to categorize user help tickets into [Billing, Technical, Feedback], you should define this list inside the schema as an:", options: ["Float variable","Enum (Enumerated list of allowed string values)","Integer token index","Empty text variable"], answerIndex: 1 },
                            { question: "Which character starts a structured JSON array list block?", options: ["{","[","<","("], answerIndex: 1 },
                            { question: "Which character starts a standard structured JSON object dictionary block?", options: ["[","{","(","&"], answerIndex: 1 },
                            { question: "When building a data scraping workflow using an LLM, structured outputs ensure the scraped metrics stay:", options: ["Randomly sorted","Consistently mapped to uniform data frames or records","Invisible to application backends","Encrypted using security algorithms"], answerIndex: 1 },
                            { question: "Which block represents a valid structured YAML configuration snippet for a simple service?", options: ["<service><name>api</name></service>","{\"service\": {\"name\": \"api\"}}","service:\n  name: api","service=api"], answerIndex: 2 },
                            { question: "What format constraint helps generate clean programmatic rows without using keys or objects?", options: ["Free-text paragraph","CSV (Comma-Separated Values) format","HTML body paragraphs","Markdown bullet points"], answerIndex: 1 },
                            { question: "If you define a Pydantic schema class User(BaseModel): name: str, age: int, passing this class to an LLM SDK client will force the AI output to be:", options: ["A python binary compile asset file","An object containing a string name field and an integer age field","A list of all active users online","An empty array structure"], answerIndex: 1 },
                            { question: "Can you request nested structures (objects inside objects) in structured generation?", options: ["No, structures must be completely flat","Yes, schemas support complex multi-level nesting configurations (e.g., a company object containing a list of employee objects)","Only for numeric values","Only when using specialized local models"], answerIndex: 1 },
                            { question: "What is a \"field description\" in a JSON schema template used for?", options: ["To change the color of the output field","To provide a natural language explanation to the model directly inside the schema context, instructing it on what exact content data to place inside that specific key value field","To set code execution paths","To index database files faster"], answerIndex: 1 },
                            { question: "When executing automated text sentiment analysis across thousands of production rows, you should use structured generation to output:", options: ["Long essays describing emotions","A standardized object with structured metrics like {sentiment: Positive, confidence_score: 0.95}","Random data arrays","A text string listing unrelated vocabulary words"], answerIndex: 1 },
                            { question: "Which phrase indicates a data type error in a structured output response?", options: ["An integer key receiving the string value 'twenty-five' instead of the digit value 25","A string value wrapped in valid quotes","A comma separating two dictionary attributes","An array starting with an open bracket token"], answerIndex: 0 },
                            { question: "Structured generation is foundational for building applications that leverage:", options: ["Function Calling / Tool Use (where models pass parameters to external tools programmatically)","Simple, unguided offline text document drafting","Manual typing practice software interfaces","Unformatted command line interfaces"], answerIndex: 0 },
                            { question: "What happens if your prompt context text instruction contradicts your explicitly provided structural output schema configuration?", options: ["The system automatically changes your schema layout configuration","The generation quality can degrade, or it might result in a schema validation crash depending on how strict the provider API pipeline is built","The system overrides the server memory bounds","The model stops using tokens entirely"], answerIndex: 1 },
                            { question: "Which structure is best for returning a set of geo-coordinates?", options: ["A paragraph listing landmarks near the area","A JSON object containing numeric float attributes for latitude and longitude keys","A list of country names written out in order","An empty dictionary container file"], answerIndex: 1 },
                            { question: "Using structured generation removes the need for highly complex, brittle custom code layers built to:", options: ["Route basic network packets across routers","Clean, strip, parse, and repair broken text string chunks using manual string splitting or regex matching patterns","Scale up compute operations across multi-gpu clouds","Manage basic computer login portals"], answerIndex: 1 }
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
                text: "To architect a real-time conversational interface by engineering a stateful memory management loop that preserves chat history across independent stateless API calls.",
                bullets: []
              },
              theory: [
                {
                  title: "The Stateless Architecture",
                  body: [
                    "By design, Large Language Model API endpoints are entirely stateless. They process an input, return an output, and immediately forget the transaction.",
                    "To build a continuous, real-time conversational interface, the 'memory' of the conversation must be engineered and maintained entirely on the client side."
                  ]
                },
                {
                  title: "Stateful Memory Loops",
                  body: [
                    "This is achieved by maintaining an append-only rolling history array. Every interaction is mapped to a specific role: 'system' (for rules), 'user' (for queries), and 'assistant' (for responses).",
                    "With every new message, the entire history array must be transmitted back to the API. As the conversation grows, this payload continuously expands.",
                    "To prevent exceeding the model's hard context window limit (and to manage token costs), engineers must implement truncation strategies like Sliding Windows (deleting the oldest messages) or Summary Buffers (using a smaller LLM to summarize the history)."
                  ]
                }
              ],
              pretest: [
                            { question: "?", options: ["To format computer hard drives","To simulate human conversation through text or voice interactions","To speed up internet hardware connections","To compress large image files into zip formats"], answerIndex: 1 },
                            { question: "Which of the following describes a \"rule-based\" chatbot?", options: ["It learns dynamically from the internet every second","It answers using pre-written, hard-coded rules and decision trees","It trains its own neural network weight layers on the fly","It requires a graphical GPU cluster card to run basic scripts"], answerIndex: 1 },
                            { question: "What makes an AI-powered chatbot different from a rule-based chatbot?", options: ["It only works when typed in capital letters","It uses Large Language Models (LLMs) and Natural Language Processing (NLP) to understand intent flexibly","It deletes user data files automatically after every line","It cannot process conversational English phrases"], answerIndex: 1 },
                            { question: "What does \"Session State\" mean in chatbot development?", options: ["The operating system version running the computer server","The mechanism that remembers past messages and user variables within the current active chat session","The network speed latency throughput measurement profile","The font style selection configurations matching web portals views"], answerIndex: 1 },
                            { question: "Why do Large Language Models need a conversation memory buffer?", options: ["To change their internal parameter weights permanently","Because base LLM API endpoints are naturally stateless and forget past turns unless historical messages are re-sent with every new prompt","To check text spelling layouts against dictionaries automatically","To route internet packets across hardware firewall switches"], answerIndex: 1 },
                            { question: "In chatbot architectures, what is the role of the \"User Role\"?", options: ["It represents the background instructions guiding model behavior","It marks the text string inputs submitted directly by the human operator","It contains the final validated code generation script answers","It acts as a system administrative file access privilege token"], answerIndex: 1 },
                            { question: "In chatbot architectures, what is the role of the \"Assistant Role\"?", options: ["It logs server errors to text documents paths automatically","It holds the conversational text responses generated by the AI model","It partitions hard drive storage allocation spaces systems","It updates computer graphics card microcode firmware arrays"], answerIndex: 1 },
                            { question: "In chatbot architectures, what is the role of the \"System Role\" (or System Prompt)?", options: ["It displays user login time durations records","It provides global foundational rules, behaviors, and behavioral boundaries that the chatbot must strictly follow","It counts characters lengths within input query variables fields","It compresses text histories into lightweight configuration files"], answerIndex: 1 },
                            { question: "What happens if a chatbot conversation history grows larger than the model's context window limit?", options: ["The model expands its memory footprint automatically","The system will fail or drop older chat turns to fit the prompt boundary constraints","The chatbot changes its text outputs into Spanish language variations","The database collection structures delete active profiles keys records"], answerIndex: 1 },
                            { question: "Which python library framework is commonly used to build rapid, beautiful web user interfaces for AI chatbots using pure Python code?", options: ["Streamlit (or Gradio)","NumPy","Matplotlib","Pygame\"Intent\" in conversational AI ecosystems?"], answerIndex: 0 },
                            { question: "", options: ["The processing time duration taken to return text chunks streams","The goal or purpose behind a user’s typed message (e.g., \"book_flight\" or \"check_balance\")","A regular expressions string extraction compiler routine block","A database socket connection configuration parameter mapping path"], answerIndex: 1 },
                            { question: "What is an \"Entity\" in chatbot parsing pipelines?", options: ["A critical piece of keyword data extracted from the user's message (like a date, city name, or product ID)","A background worker service task handling file copies routines","An empty string array container file model tracking checkpoint","A design theme choice applied inside mobile application layout grids"], answerIndex: 0 },
                            { question: "If a user types \"Book a room for tomorrow in Paris,\" what is the entity matching location?", options: ["\"Book\"","\"Paris\"","\"Tomorrow\"","\"Room\"What technique keeps a chatbot's text response moving along fluidly, printing out word-by-word in real-time rather than waiting for the entire essay to complete?"], answerIndex: 1 }
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
                            { question: "", options: ["Data batching compression algorithms","Token Streaming (via server-sent events)","Hard drive defragmentation loops tracking runs","One-hot encryption matrix inversions calculations"], answerIndex: 1 },
                            { question: "What is \"Fallback Logic\" inside a customer support chatbot framework?", options: ["Deleting system application files if internet access fails completely","A safe fallback script routine that triggers a standard response (or hands off to a human agent) when the AI doesn't understand the user's intent","Reversing the character alphabetical order string structures array","Quantizing float attention matrix weights into integer bounds values"], answerIndex: 1 },
                            { question: "True or False: Chatbots can be connected to external APIs to fetch real-world data like current weather metrics or live shipping order updates.", options: ["True","False"], answerIndex: 0 },
                            { question: "What is \"Human-in-the-Loop\" (HITL) handoff orchestration?", options: ["Forcing users to type code scripts variables paths models manually","Seamlessly transferring a complex or frustrated chatbot conversation over to a live human customer service agent","Running automated code parsing loops over background worker tasks","Changing website presentation display formatting style sheets targets"], answerIndex: 1 },
                            { question: "Which configuration parameter controls the random creativity variance score profile metrics inside generative chat API engines calls?", options: ["max_tokens","temperature","chunk_size","vector_dimensions"], answerIndex: 1 },
                            { question: "If you configure a chatbot API temperature parameter value to 0.0, the responses will be:", options: ["Completely wild, unpredictable, and highly creative text structures","Highly deterministic, consistent, and focused on the most likely tokens paths matches","Empty lists strings container files throwing compilation bugs codes","Deleted automatically by remote server authorization firewalls systems"], answerIndex: 1 },
                            { question: "What does \"Chat History Windowing\" mean when managing chatbot state limits?", options: ["Opening multiple browser dashboard tabs grids layouts metrics at once","Only preserving the most recent $N$ messages turns inside the prompt context memory buffer to save token costs and prevent crashes","Converting text strings characters data values directly to numbers rows","Encrypting database tables keys indices columns relations schemas configurations?"], answerIndex: 1 },
                            { question: "", options: ["A flat continuous unseparated plain paragraph document string","A list of dictionary objects tracking role and content fields keys pairs","A comma-separated values sequence line block array model tracking","A folder tree layout directory path matching system files logs"], answerIndex: 1 },
                            { question: "What is a \"Chatbot Persona\"?", options: ["The software engine compilation version number string variable name","The designated tone, style, attitude, and background identity constraints assigned to the chatbot via system instructions","The count of tokens consumed during an application API session runtime","A cloud vector search space indexing framework classification model"], answerIndex: 1 },
                            { question: "If a user says \"Cancel my order,\" and the chatbot asks \"What is your order ID?\", this is an illustration of:", options: ["Simple zero-shot factual retrieval baseline optimization queries runs","Multi-turn slot filling conversation flow logic pathways checks","Tree of thoughts coding architecture validation script compiler target","System diagnostic tracking loop garbage collection allocation parameters"], answerIndex: 1 },
                            { question: "What does a chatbot do during a \"System Prompt Override\" vulnerability issue?", options: ["It shuts down its web process container due to hardware thermal levels","The chatbot gets tricked by clever user text injection phrases into ignoring its global rules safety guidelines parameters boundaries","It updates its internal database records collection structure properties","It reformats markdown output presentations elements text automatically rows"], answerIndex: 1 },
                            { question: "To ensure your chatbot operates reliably without offending customers or spilling private system data logs, you should deploy:", options: ["Larger font files presentation theme configurations variables elements","Guardrails and safety moderation filtering models layers components (e.g., Llama Guard)","Empty dictionary structural object schemas trackers lists paths tools","Offline hardware calculation grid matrix transformations compiler scripts?"], answerIndex: 1 }
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
                text: "To implement and benchmark massive text summarization processing strategies (Stuffing, Map-Reduce, and Refine) to handle documents that exceed baseline model context boundaries.",
                bullets: []
              },
              theory: [
                {
                  title: "The Context Constraint",
                  body: [
                    "Summarizing massive documents (like legal contracts or textbooks) presents a unique challenge: the document often exceeds the maximum token limit of the LLM's context window.",
                    "The naive approach, known as 'Stuffing', simply forces the entire document into the prompt. When documents exceed the limit, stuffing fails completely."
                  ]
                },
                {
                  title: "Advanced Chunking Architectures",
                  body: [
                    "To overcome this, engineers use Chunking Pipelines. The Map-Reduce architecture splits a massive document into smaller, manageable chunks. The LLM summarizes each chunk individually (the Map phase), and then summarizes the combined summaries into a final document (the Reduce phase).",
                    "Alternatively, the Refine architecture generates a summary of the first chunk, then passes that summary alongside the second chunk to the LLM, asking it to update the ongoing summary. This process cascades sequentially through the entire document, preserving deep context but running slower due to its sequential nature."
                  ]
                }
              ],
              pretest: [
                            { question: "", options: ["Extractive and Abstractive summarization","Binary and Hexadecimal reductions models fields layouts","Linear alignment parsing code trees compilations modules","Vector space database partitioning coordinate indices calculations"], answerIndex: 0 },
                            { question: "How does \"Extractive Summarization\" work?", options: ["It writes completely new sentences from scratch using human intuition paths","It identifies and copies exact, verbatim sentences or key phrases directly from the source text to form the summary","It translates the entire document into another language variation first","It deletes all adjectives and punctuation markers lines strings targets"], answerIndex: 1 },
                            { question: "How does \"Abstractive Summarization\" work?", options: ["It counts the frequency of words using simple spreadsheet math variables","It processes the core meaning of the source text using an LLM and synthesizes completely new sentences to describe the main points concisely","It outputs data exclusively inside nested JSON data structures fields","It scrambles the sequence order profile rows lines columns templates"], answerIndex: 1 },
                            { question: "Which approach carries a higher risk of generating \"hallucinations\" (fabricated details missing from the source text)?", options: ["Extractive summarization","Abstractive summarization","Word frequency counting loop script","Character length index tracking check"], answerIndex: 1 },
                            { question: "If you need to condense a massive 200-page operational manual document text using an LLM with a small context window, what strategy helps?", options: ["Typing instructions in all uppercase capital letters blocks sheets templates","A \"Map-Reduce\" summarization strategy (summarizing small chunks individually first, then summarizing the summaries)","Deleting all nouns from the document text records tables paths loops","Increasing the model temperature parameters score thresholds limits arrays?"], answerIndex: 1 },
                            { question: "", options: ["\"Summarize the following text in exactly three bullet points: [Text]\"","\"Here is an example summary... Now copy it exactly for this: [Text]\"","\"Let's think step by step to solve this complex math logic puzzle row.\"","\"Format this user account table directly into a clean JSON structure model.\"What does \"TL;DR\" stand for inside prompting context engineering frameworks?"], answerIndex: 0 },
                            { question: "", options: ["Token Length Diagnostic Routine","Too Long; Didn't Read (a common trigger phrase commanding a quick summary)","Total Logic Data Record path profile parameters","Transformed Language Decoding Ratio tracker metrics"], answerIndex: 1 },
                            { question: "What is a \"Brevity Penalty\" in text generation scoring metrics context?", options: ["An error that drops network connectivity packet transfers files layers","A mathematical scoring correction step that penalizes models if their generated summary texts are inappropriately short or missing content details","A setting that changes output formatting style rules templates presentations","An administrative database function clearing old user tracking entries metrics"], answerIndex: 1 }
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
                            { question: "Which variant of the ROUGE evaluation metric class evaluates text summaries based on the Longest Common Subsequence (LCS) word alignments patterns?", options: ["ROUGE-1","ROUGE-2","ROUGE-L","ROUGE-3"], answerIndex: 2 },
                            { question: "What does the ROUGE metric suite primarily measure when appraising summaries?", options: ["The clock speed latency processing performance metrics of GPU worker units","The lexical n-gram word overlap coverage between a machine-generated summary and human-written reference ground-truth summaries","The data file size compression ratio footprint bytes space partitions","The security encryption standard strength parameters verified across files logs  True or False: A text summary can get a perfect ROUGE lexical match score while still being completely factually incorrect or grammatically nonsensical."], answerIndex: 1 },
                            { question: "", options: ["True","False"], answerIndex: 0 },
                            { question: "Which phrase describes a \"Stuffing\" summarization workflow layout design pattern pattern?", options: ["Splitting a file across multiple distinct local text directories rows blocks","Shoving the entire source document text directly into the prompt context window box in one shot, assuming the model window size can support it","Deleting space characters formatting elements strings lines targets variables","Converting alphabetical terms directly into binary notation matrix indexes"], answerIndex: 1 },
                            { question: "When customizing a summarization prompt pipeline block to focus strictly on corporate financial impact findings, you should use:", options: ["General unguided conversational text templates settings paths configurations","Domain-specific instruction constraints specifying: \"Extract and summarize only metrics regarding cost adjustments, revenue drops, and fiscal goals.\"","A blank instruction layout setup and let the generation model pick randomly","An offline compiler script block managing system network router drivers tasks"], answerIndex: 1 },
                            { question: "What does an \"Evaluation Benchmark Suite\" like FactCC or SummaC help developers assess inside text summarization pipelines?", options: ["User dashboard mouse click tracking speeds counts properties checks profiles","The level of factual consistency and contradiction filtering verification score metrics between a generated summary and its source document text","The file name string character path length constraints boundaries adjustments","The vocabulary token size parameters index capacity limits maps checkpoints"], answerIndex: 1 },
                            { question: "Summarization models fundamentally reduce data redundancy profiling indexes across text corpuses while preserving crucial:", options: ["Spacing characters counts layout properties grid options parameters definitions","Core informational value metrics context meaning themes facts semantic weight(Doc"], answerIndex: 1 }
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
                text: "To construct a foundational Document Question-Answering pipeline by implementing a linear semantic context search loop to inject relevant document passages into an LLM prompt.",
                bullets: []
              },
              theory: [
                {
                  title: "Grounding the Model",
                  body: [
                    "A Document Question Answering pipeline is the foundational precursor to enterprise RAG systems. It focuses on forcing an LLM to extract facts from a provided document rather than relying on its pre-trained memory.",
                    "When users ask questions about proprietary documents (like a company HR manual), standard LLMs hallucinate because the facts were not in their training data."
                  ]
                },
                {
                  title: "The Extraction Loop",
                  body: [
                    "By injecting the relevant document directly into the prompt context alongside the user's question, the LLM acts as an advanced reading comprehension engine.",
                    "The system prompt is heavily modified with strict constraints, commanding the model: 'Answer the question strictly using the provided context. If the answer is not present, reply with 'I don't know'.'",
                    "This orchestration dramatically reduces hallucination rates and creates a verifiable audit trail for generated answers."
                  ]
                }
              ],
              pretest: [
                            { question: "QA)?", options: ["Asking an AI to write a completely fictional novel story book from scratch","An NLP task that extracts or generates precise answers to natural language questions based strictly on the content of provided source files (like PDFs or scanned images)","Generating clean graphics layout presentation components code templates web assets","Setting up data network firewalls proxies routes parameters configurations checks  What does OCR stand for in document text preprocessing ingestion systems pipelines?"], answerIndex: 1 },
                            { question: "", options: ["Optimal Context Retrieval","Optical Character Recognition (converting text inside images/scans into machine-readable digital string text)","Output Code Reduction","Operational Coordinate Routing"], answerIndex: 1 },
                            { question: "Why is high-quality document parsing critical for DocQA system accuracy?", options: ["It makes the text font color pop cleanly inside frontend dashboards views","Errors introduced during parsing—like misread text letters, scrambled multi-column layouts, or broken tables structures—carry through and break later answer retrieval logic steps","It automatically reduces token usage counts to zero limits targets parameters","It converts programming files syntax structures directly into binary array rows"], answerIndex: 1 },
                            { question: "What type of DocQA approach locates a precise verbatim text segment span coordinate location inside a document text block to answer a user question?", options: ["Generative approach","Retrieval-Based / Extractive approach","Zero-shot baseline creation script loop execution branch","Random guess shuffle index profiling method check parameters"], answerIndex: 1 },
                            { question: "What type of DocQA approach synthesizes a fluent, natural language conversational response sentence by evaluating multiple pieces of evidence text found across a document?", options: ["Extractive approach","Generative approach","Text character length tracking matching regex script line","Systematic deletion framework tool process unit mapping"], answerIndex: 1 }
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
                            { question: "Which benchmark dataset is a classical baseline standard used to test single-span extractive reading comprehension performance across document text paragraphs?", options: ["SQuAD (Stanford Question Answering Dataset)","ImageNet 10k cluster","MNIST handwriting grid digits","Win"], answerIndex: 0 },
                            { question: "Zip compression ratio listWhat is a \"Multi-Hop Question Answering\" task puzzle setting?", options: ["A network packet hopping across 5 separate proxy server router nodes channels","A question that requires the AI to find, link, and reason across multiple distinct pieces of evidence spread across different sections or documents to construct an answer","Deleting alternative data tables entries columns paths logs files variables","Running automated user account verification handshake codes scripts boundaries"], answerIndex: 1 },
                            { question: "If you ask a DocQA system \"What was our total profit in Q3?\", but the document text provides quarterly charts numbers but never states total yearly addition metrics, a robust grounded model should respond:", options: ["By fabricating a highly confident guess estimation using general industry text logs","By stating clearly that the specific answer information is not present within the provided document data context bounds","By throwing a hard system syntax compile error crash log execution sequence frame","By wiping clean the current database collection workspace data indexes profiles"], answerIndex: 1 },
                            { question: "Which multimodal transformer architecture model family is built explicitly to process both document image visual layouts, text bounding-boxes coordinates, and raw character text tokens simultaneously for DocQA tasks?", options: ["Word2Vec static embedding text matrix","LayoutLM model family (e.g., LayoutLMv2, LayoutLMv3)","Standard linear regression activation block module line","Basic regular expressions string pattern lookups dictionary"], answerIndex: 1 },
                            { question: "DocQA architectures enable enterprise systems to query messy un-indexed business files text collections (like invoices, legal contracts, and lengthy technical documentation logs) using standard:", options: ["Font family manipulation presentation code parameters layers targets properties","Plain natural language inquiries phrases questions context search triggers"], answerIndex: 1 }
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
                text: "To implement a document ingestion chunking strategy and programmatically convert text blocks into dense vector representations using pre-trained embedding models.",
                bullets: []
              },
              theory: [
                {
                  title: "High-Dimensional Ingestion",
                  body: [
                    "To build a production-ready vector database, raw text must be systematically ingested, chunked, and converted into dense vector representations using Embedding Models.",
                    "While tokenization maps text strings to discrete integer IDs, Embedding Models translate those strings into continuous vectors in a dense, high-dimensional numerical space. This process captures deep semantic meaning rather than just exact word matches."
                  ]
                },
                {
                  title: "The Mechanics of Vector Spaces",
                  body: [
                    "Given a text chunk C, an embedding model outputs a vector $v = Embedding(C) \in R^d$, where $d$ represents the dimensional complexity of the model (e.g., $1536$ for OpenAI text-embedding-3-small).",
                    "To optimize downstream search operations, these floating-point arrays undergo L2 Vector Normalization, ensuring every vector has an exact magnitude of 1.0. This normalizes the space, allowing lightning-fast similarity comparisons."
                  ]
                }
              ],
              pretest: [
                            { question: "?", options: ["Deleting all numbers","Passing raw text or tokens to an embedding model","Writing a SQL database from scratch","Formatting a hard drive"], answerIndex: 1 },
                            { question: "Which of these is a widely used commercial API for creating text embeddings?", options: ["OpenAI Embedding API (e.g., text-embedding-3-small)","WinZip Compression Tool","Google Sheets Font Layer","Google Chrome URL Shortener"], answerIndex: 0 },
                            { question: "When you send a sentence to an embedding API, what does it return?", options: ["A long string of text in French","An array (list) of floating-point numbers representing the text's meaning","A true/false boolean flag","A zipped image file"], answerIndex: 1 },
                            { question: "The array of numbers returned by an embedding model is called a:", options: ["Database script row","Vector / Embedding","Token index integer","Markdown block"], answerIndex: 1 },
                            { question: "If you change a single word in a paragraph and recreate its embedding, the new vector will likely be:", options: ["Completely inverted","Semantically close to the original vector","All zeros","Randomly sized"], answerIndex: 1 },
                            { question: "Which library is commonly used in Python to generate embeddings locally using open-source models?", options: ["sentence-transformers","matplotlib","pygame","openpyxl"], answerIndex: 0 },
                            { question: "What happens to the vector size (dimensions) if you generate embeddings for a 5-word sentence versus a 50-word paragraph using the same model?", options: ["The paragraph vector is 10 times larger","The dimensions remain exactly the same (fixed length output)","The sentence vector has zero values","The model automatically splits them into separate files"], answerIndex: 1 },
                            { question: "What does the \"dimension\" of an embedding model mean?", options: ["The time it takes to process text","The total number of numbers in the output vector array (e.g., 1536 or 384)","The font size limit","The storage size of the text file in kilobytes"], answerIndex: 1 },
                            { question: "Which of these is an open-source hub where you can download embedding models to run locally?", options: ["Hugging Face","Amazon E-commerce","Netflix API","Wikipedia Main Page"], answerIndex: 0 },
                            { question: "To get high-quality text embeddings, input text should ideally be:", options: ["Translated into binary numbers manually","Cleaned of completely corrupted formatting characters while preserving meaningful words and context","Stripped of all vowels","Converted to uppercase letters only, you should use a:"], answerIndex: 1 },
                            { question: "", options: ["Text file (.txt)","Vector Database (e.g., Pinecone, Milvus, Chroma, pgvector)","Standard browser cache","CSV sheet file"], answerIndex: 1 },
                            { question: "What does \"Batching\" inputs mean when creating embeddings?", options: ["Sending text strings one-by-one with 1-minute delays","Grouping multiple sentences or documents into a single API request to save network overhead and process faster","Changing the model parameters between requests","Turning off the local computer server"], answerIndex: 1 },
                            { question: "If an embedding model has a token limit of 512 tokens and you pass a 2,000-word essay, what will happen?", options: ["The model expands its memory dynamically","The text will be truncated (cut off), losing the meaning of the later parts of the essay","The API returns an image file","The system vocabulary resets"], answerIndex: 1 },
                            { question: "Which python command initializes a standard local sentence transformer model?", options: ["model = SentenceTransformer('model_name')","model = open('model_name')","model = print('model_name')","model = format('model_name')"], answerIndex: 0 },
                            { question: "To convert text to an embedding vector using a local sentence-transformers object, you call the ____ function.", options: ["model.decode()","model.encode()","model.split()","model.delete()"], answerIndex: 1 },
                            { question: "True or False: Every unique embedding model generates vectors that can be safely mixed and compared directly with vectors from a completely different model.", options: ["True","False"], answerIndex: 1 },
                            { question: "If you generate an embedding for the word \"apple\" using an image embedding model instead of a text embedding model, the input must be:", options: ["A text string \"apple\"","An image file of an apple","An integer index value","A database script table row"], answerIndex: 1 },
                            { question: "What type of model handles creating vectors for both images and text in the same shared vector space?", options: ["Unimodal model","Multimodal model (e.g., CLIP)","One-hot tokenizer","Static frequency matrix"], answerIndex: 1 },
                            { question: "When scaling up an application that creates embeddings for billions of web pages, the primary resource bottleneck is:", options: ["Local monitor pixel count","Compute processing power (GPUs) and API rate limits","The size of individual punctuation marks","Font family compatibility layers"], answerIndex: 1 },
                            { question: "What is a \"Dimension Reduction\" tool like PCA used for after creating embeddings?", options: ["Deleting bad data rows permanently","Compressing high-dimensional vectors into lower dimensions for easier storage or 2D/3D visual graphing","Increasing the token string lengths","Changing the language structure rules?"], answerIndex: 1 },
                            { question: "", options: ["2","1536","100,000","Exactly 1 million"], answerIndex: 1 },
                            { question: "What happens to the values in an embedding vector if you normalize them to unit length?", options: ["They all become 1.0","They all become 0.0","Their total squared sum equals 1.0, making cosine similarity calculations much faster (equivalent to a simple dot product)","They turn into integers"], answerIndex: 2 },
                            { question: "If you create an embedding of an empty string \"\", the resulting vector will be:", options: ["Non-existent or semantically meaningless noise","A perfect representation of everything","A list of alphabetical strings","The system configuration table path"], answerIndex: 0 },
                            { question: "When writing code to interact with an embedding API, you should safely wrap requests to handle:", options: ["Font family mismatches","API rate limits and network timeout exceptions","Browser dark mode switches","Text file line breaks"], answerIndex: 1 },
                            { question: "Which metric measures the file size footprint of a collection of stored embedding vectors?", options: ["Token counts","Memory footprint in bytes (Dimensions $\\times$ float precision size $\\times$ number of vectors)","Lexical matching frequency score","Vocabulary array indices, what must you do to the text?"], answerIndex: 1 }
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
                            { question: "", options: ["Translate it to binary code","Chunk it into smaller, manageable pieces (e.g., paragraphs or overlapping sentences)","Capitalize all words","Delete all adjectives"], answerIndex: 1 },
                            { question: "What is \"Chunk Overlap\" used for when splitting text to generate embeddings?", options: ["Speeding up the server hardware clock","Preserving semantic context across the boundaries where a document is split apart","Removing duplicate letters","Encrypting database files"], answerIndex: 1 },
                            { question: "If chunk size is 200 tokens and overlap is 50 tokens, Chunk 2 will start:", options: ["50 tokens before Chunk 1 ends","200 tokens after Chunk 1 ends","At token index 0","Outside the text file bounds"], answerIndex: 0 },
                            { question: "Which chunking strategy splits text based on grammatical structural layout?", options: ["Random character chopping","Recursive character chunking (splitting on paragraphs, then sentences, then words)","Fixed byte-size stripping","Vocabulary extraction array indexing"], answerIndex: 1 },
                            { question: "When building an embedding pipeline, what does \"Metadata\" refer to?", options: ["The model's hidden layers configurations","Extra descriptive tags stored alongside the vector (like source URL, author, date, or raw text chunk) used for filtering search results","The payment subscription plan tier","The computer operating system version?"], answerIndex: 1 },
                            { question: "", options: ["No, it treats text like a random bag of words","Yes, modern transformer-based embedding models encode position and sequence structure to capture true contextual meaning","Only if words are separated by dashes","Only for programming scripts"], answerIndex: 1 },
                            { question: "If an embedding model is trained specifically on software code, its vectors will be excellent at representing:", options: ["Recipe books","Code syntax, logic structures, and programming functions","Historical timelines","Audio sound patterns"], answerIndex: 1 },
                            { question: "What is a \"Cross-Encoder\"?", options: ["An alternative model that scores the similarity of a sentence pair simultaneously instead of generating independent vectors first","A text formatting tool","A tool that converts JSON to XML","A secure data firewall"], answerIndex: 0 },
                            { question: "What is a \"Bi-Encoder\"?", options: ["A model that creates embeddings for two languages at once","A model architecture that processes texts independently into separate embedding vectors, allowing rapid vector comparison later","A model with only two neural network blocks","A system configuration asset"], answerIndex: 1 },
                            { question: "Which model type is faster for real-time similarity searching across millions of pre-computed documents?", options: ["Cross-Encoder","Bi-Encoder (Embedding model approach)","Manual character loop matching","Hard-coded pattern matching regex\"Embedding Matrix\" inside a neural network do?"], answerIndex: 1 },
                            { question: "", options: ["Erases old values randomly","Maps individual discrete token IDs to dense continuous vector positions","Routes data to external internet servers","Validates database logins"], answerIndex: 1 },
                            { question: "When picking an embedding model from an open leaderboard (like MTEB), you should check:", options: ["The model color style","Performance scores across tasks relevant to your needs (e.g., retrieval, classification, clustering) alongside speed and size","The list of programmers who wrote it","The developer's homepage layout"], answerIndex: 1 },
                            { question: "What does MTEB stand for?", options: ["Massively Text Embedding Benchmark","Massive Text Embedding Benchmark","Matrix Token Extraction Boundary","Multi-Threaded Embedding Block"], answerIndex: 1 },
                            { question: "If you generate an embedding for a document with a lot of typos, the vector quality will likely:", options: ["Stay 100% perfect automatically","Degrade slightly depending on how well the model handles sub-word patterns or unknown tokens","Turn completely negative","Delete the file containing the text"], answerIndex: 1 },
                            { question: "To host an embedding model locally on your own cloud infrastructure, you can wrap it inside an API layer using:", options: ["FastAPI or Flask","Google Sheets","Markdown syntax","Standard computer hardware drivers(e.g., 3072 dimensions) over a low-dimension one (e.g., 384 dimensions)?"], answerIndex: 0 },
                            { question: "", options: ["High dimensions use less storage memory","High dimensions typically capture finer semantic details but require significantly more storage space and slower processing times","High dimensions only work for numbers","Low dimensions are completely random"], answerIndex: 1 },
                            { question: "True or False: Some modern embedding models support \"Matryoshka embeddings,\" allowing you to safely truncate (shorten) the vector length to save space while retaining most of its accuracy.", options: ["True","False"], answerIndex: 0 },
                            { question: "If you pass text written in multiple languages to a multi-lingual embedding model, sentences with the same meaning in English and French will map to vectors that are:", options: ["Completely orthogonal (perpendicular)","Very close to each other in the shared multi-lingual vector space","Inverted numerical mirrors","Empty lists"], answerIndex: 1 },
                            { question: "What is the outcome of a text embedding pipeline block inside an Enterprise AI architecture?", options: ["Generating final chat text answers directly","Converting unstructured company knowledge logs into clean, structured numerical vector index maps for searching","Validating active user authentication certificates","Updating local GPU microcode firmware"], answerIndex: 1 },
                            { question: "Which python asset acts as the final output variable container after running embeddings = model.encode([\"Hello world\"])?", options: ["A plain string variable text","A NumPy array containing float values","A system file pointer resource","A dictionary schema definition map"], answerIndex: 1 },
                            { question: "When testing an embedding model, if \"cat\" and \"kitten\" have a high similarity score, the model demonstrates good:", options: ["Spelling structure validation","Semantic understanding","Character length balancing","Alphabetical sorting optimization"], answerIndex: 1 },
                            { question: "If you create an embedding using a model that has not been fine-tuned for instruction following, passing a prompt like \"Find data about dogs\" will generate a vector for:", options: ["The concept of dogs found inside the prompt text itself","A direct list of website search engine links matching dogs","An empty string array container","A script execution configuration command"], answerIndex: 0 },
                            { question: "Which framework handles combining text chunking and embedding creation steps automatically out-of-the-box?", options: ["LangChain or LlamaIndex","Matplotlib graphics layer","Standard markdown formatting tools","Text file stream readers"], answerIndex: 0 },
                            { question: "Creating embeddings allows machines to perform operations on concepts using standard:", options: ["Font family transformations","Linear algebra and vector mathematics","Regular expressions strings","Hard drive directory partitioning scripts"], answerIndex: 1 },
                            { question: "Embedding pipelines form the absolute foundation of which capability?", options: ["Code execution compilers","Semantic Search and Retrieval-Augmented Generation (RAG)","Hardware device drivers wiring","Network firewall proxies configuration?"], answerIndex: 1 }
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
                text: "To implement a vector similarity index using NumPy, calculating spatial angles to extract relevant source text chunks without relying on exact keyword matching.",
                bullets: []
              },
              theory: [
                {
                  title: "Beyond Traditional Keywords",
                  body: [
                    "Semantic Search completely bypasses the limitations of traditional keyword matching engines (like BM25 or Elasticsearch). Instead of looking for identical string matches, it compares numerical vectors.",
                    "When a user submits a question, it is translated into a vector. The search engine then calculates the spatial angle between the query vector and all stored document vectors."
                  ]
                },
                {
                  title: "Similarity Metrics and Indexing",
                  body: [
                    "Ranking is primarily calculated using Cosine Similarity. Chunks that achieve the highest similarity scores represent the most contextually relevant passages.",
                    "In massive production databases with millions of vectors, comparing the query against every single vector (Flat Index) is too slow.",
                    "To solve this, databases use Approximate Nearest Neighbor (ANN) architectures, such as Hierarchical Navigable Small World (HNSW) graphs, which trade a tiny fraction of accuracy for massive, scalable lookup speeds."
                  ]
                }
              ],
              pretest: [
                            { question: "", options: ["Searching documents based strictly on exact keyword character matches","Searching documents based on the conceptual meaning and intent of the query text","Searching text files alphabetically by the first letter of each row","Deleting duplicate words inside a database index"], answerIndex: 1 },
                            { question: "Traditional keyword search (like BM25 or TF-IDF) struggles with:", options: ["Matching exact product serial codes","Synonyms (e.g., searching for \"automobile\" but the document uses the word \"car\")","Processing short strings of text","Counting exact term occurrences"], answerIndex: 1 },
                            { question: "How does semantic search find matches for a query?", options: ["By scanning a dictionary file manually row by row","By converting the user query into an embedding vector and finding documents with vectors close to it in vector space","By checking the length of the string","By sorting filenames by modification date"], answerIndex: 1 },
                            { question: "If a user searches for \"canine care tips,\" a semantic search engine can retrieve a document titled \"How to look after your dog\" because:", options: ["\"Canine\" and \"dog\" share a close semantic relationship and map near each other in the vector space","The strings have the same number of vowels","The words start with the same letters","The page code uses a specific web layout style"], answerIndex: 0 },
                            { question: "Which metric is used to score relevance between query and document vectors in semantic search?", options: ["Matrix determinant size","Cosine Similarity / Dot Product / Euclidean Distance","String length difference count","Character edit distance step count"], answerIndex: 1 },
                            { question: "What is a \"Vector Database\"?", options: ["A database that only stores images","A specialized database designed to store, index, and rapidly query high-dimensional vector embeddings","A simple spreadsheet table","A system configuration text layout file"], answerIndex: 1 },
                            { question: "What does \"KNN\" stand for in vector search?", options: ["Keyboard Network Node","K-Nearest Neighbors","Key Numerical Notation","Kernel Null Network"], answerIndex: 1 },
                            { question: "What does a K-Nearest Neighbors search return?", options: ["All rows matching an exact alphabetical string index query","The top $K$ document vectors that are closest in distance to the target input query vector","A list of broken code files","A single boolean flag value"], answerIndex: 1 },
                            { question: "Why is a raw brute-force KNN search slow for databases with billions of documents?", options: ["It requires translating text to multiple languages","It has to mathematically compute the distance between the query vector and every single document vector in the database ($O(N)$ complexity)","It uses too many punctuation marks","It runs only on desktop monitors"], answerIndex: 1 },
                            { question: "What type of indexing solves the speed bottleneck of brute-force vector search?", options: ["Character length tracking","ANN (Approximate Nearest Neighbors) indexing","Alphabetical sorting arrays","Regular expression string matching templates?"], answerIndex: 1 },
                            { question: "", options: ["Artificial Neural Network","Approximate Nearest Neighbors","Automated Node Notation","Array Null Number"], answerIndex: 1 },
                            { question: "Approximate Nearest Neighbors (ANN) trade-offs mean you get:", options: ["Slower search times but 100% exact mathematical accuracy","Drastically faster search speeds at the cost of a tiny drop in absolute recall accuracy","Random data deletions","Smaller vocabulary indices"], answerIndex: 1 },
                            { question: "Which index algorithm organizes vectors into a multi-layered graph for rapid routing search exploration?", options: ["HNSW (Hierarchical Navigable Small World)","QuickSort list index","B-Tree file index","One-hot vector matrix block"], answerIndex: 0 },
                            { question: "What does HNSW stand for?", options: ["Hierarchical Navigable Small World","Hardware Network System Wiring","High Numerical Sorting Workflow","Hidden Node Search Window"], answerIndex: 0 },
                            { question: "Which technique compresses vector sizes by splitting them into sub-vectors and indexing them into quantized codes?", options: ["Linear Padding","Product Quantization (PQ)","Tokenization","Vector Inversion"], answerIndex: 1 },
                            { question: "What is a major benefit of Product Quantization (PQ) in vector search indices?", options: ["It makes vectors longer","It dramatically reduces the memory (RAM) footprint required to store vectors in the database index","It guarantees 100% exact keyword matching scores","It reformats text code blocks automatically"], answerIndex: 1 },
                            { question: "What is \"Hybrid Search\"?", options: ["Searching on two computers at the same time","Combining traditional keyword search (BM25) with semantic vector search to leverage both exact matches and contextual meaning","Searching across text data and video assets simultaneously","Sorting files by date and size parameters"], answerIndex: 1 },
                            { question: "When combining keyword search scores and vector search scores in a hybrid search system, what algorithm is commonly used to merge the rankings?", options: ["Binary Search Tree route","RRF (Reciprocal Rank Fusion)","Matrix Inversion multiplication","Random selection shuffle"], answerIndex: 1 },
                            { question: "What does RRF stand for in hybrid ranking systems?", options: ["Reciprocal Rank Fusion","Random Routing Framework","Regular Record Filtering","Rapid Retrieval Function"], answerIndex: 0 },
                            { question: "What is \"Metadata Filtering\"?", options: ["Deleting file extensions from a storage drive","Restricting search queries to a subset of data matching clear criteria (e.g., where category == 'electronics') before or after running the vector search step","Changing the font style of search result snippets","Compressing vector index records\"Pre-filtering\" in vector search?"], answerIndex: 1 },
                            { question: "", options: ["Checking the user's password before they search","Applying metadata filters before running the vector similarity search, ensuring only valid documents are evaluated","Formatting the text chunks into uppercase characters","Sorting search results alphabetically first"], answerIndex: 1 },
                            { question: "What is \"Post-filtering\" in vector search?", options: ["Running a vector similarity search across the entire database first, then filtering out results that don't match metadata criteria afterward","Formatting the final output text string into Markdown layout rows","Deleting search queries from history files","Turning off the database application container"], answerIndex: 0 },
                            { question: "Which filtering strategy can sometimes return fewer results than requested if the top vector matches get completely filtered out?", options: ["Pre-filtering","Post-filtering","Hybrid fusion","Dense routing"], answerIndex: 1 },
                            { question: "What does a \"Re-ranker\" model do in an advanced semantic search pipeline?", options: ["It deletes all low-scoring documents permanently","It takes the top 50–100 results retrieved by a fast vector search and applies a highly accurate, slower Cross-Encoder model to compute precise relevance scores","It sorts documents by file path name lengths","It randomizes the final output order"], answerIndex: 1 },
                            { question: "Why don't we use a Re-ranker (Cross-Encoder) across the entire database of millions of rows directly?", options: ["It is written in an unsupported programming language","It is too computationally expensive and slow to run in real-time for large datasets","It only works on short words","It requires a dark mode user interface style:"], answerIndex: 1 }
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
                            { question: "", options: ["Compiler diagnostic logs extensions","E-commerce product recommendation engines, question-answering pipelines, and document search portals","Network routing configuration firewalls","Local file compression zip drivers"], answerIndex: 1 },
                            { question: "If a user queries \"unhappy with customer support billing transaction issues,\" semantic search will easily surfaces documents discussing:", options: ["Just any page containing the word \"billing\"","Invoices, refunds, customer complaints, and payment friction logs","Standard website legal policy pages","HTML format style sheets"], answerIndex: 1 },
                            { question: "Which open-source vector database runs entirely embedded locally in-memory inside a lightweight Python script?", options: ["Chroma or LanceDB","Oracle Database Cloud Cluster","MySQL Server Enterprise edition","Apache Cassandra distributed cluster"], answerIndex: 0 },
                            { question: "What does a \"Similarity Score Threshold\" do in a production semantic search route?", options: ["Limits the context length size in characters","Filters out search results whose similarity vector score is below a minimum value, cutting out irrelevant noise chunks","Forces the output text formatting style","Resets model connection points"], answerIndex: 1 },
                            { question: "In a vector space layout, if Document A and Document B have a cosine similarity score of -1.0, they point in:", options: ["The exact same vector orientation path","Diametrically opposite directions (opposite context meaning profiles)","A perfect right angle layout","A random arrangement path\"Vector Drift\" issue?"], answerIndex: 1 },
                            { question: "", options: ["The server hard drive moving physically","A mismatch that happens over time when your production data profile shifts away from what the original embedding model was optimized to represent","A change in web browser layout options","Token sizes fluctuating randomly"], answerIndex: 1 },
                            { question: "If your semantic search pipeline keeps returning short fragments of text that lack meaningful context, what should you adjust?", options: ["Increase the model vocabulary size parameter","Increase the chunk size or append surrounding context metadata during the initial text processing pipeline step","Re-compile the Python code script","Convert text input data rows to integers"], answerIndex: 1 },
                            { question: "Which configuration parameter dictates how many top similar documents are pulled from a vector index query?", options: ["max_tokens","top_k (or limit)","temperature","learning_rate"], answerIndex: 1 },
                            { question: "If top_k is configured to 5, the vector database query code execution returns:", options: ["Exactly 5 vector coordinates integers arrays","The top 5 closest matching document record objects","5 alternative system user account logs","A list of 5 missing text characters strings"], answerIndex: 1 },
                            { question: "What is a challenge of running semantic search on extremely specialized medical jargon using a generic, web-trained embedding model?", options: ["The file path length grows too large","The model may lack fine-grained domain context awareness, mapping distinct specialized medical concepts inappropriately close together","The output returns formatting text tags like HTML","The model automatically translates terminology into French"], answerIndex: 1 },
                            { question: "How can you fix poor semantic search performance on niche corporate terminology?", options: ["Shorten the prompt text string window","Fine-tune the embedding model on domain-specific data profiles or leverage advanced hybrid search setups","Use larger font files inside the UI dashboard pages","Delete all numeric values from your corporate knowledge base records"], answerIndex: 1 },
                            { question: "Which index option inside vector databases trades memory footprint size for search speed processing metrics?", options: ["Flat index (no compression) versus Quantized graph index profiles","Regular markdown file directory indexing lines","Counting characters frequency scripts loops","Standard system user login indices tables"], answerIndex: 0 },
                            { question: "When verifying the accuracy of a semantic search engine pipeline, what metric tracks the proportion of relevant documents captured in the top results?", options: ["Token throughput per second","Recall @ K / Precision @ K","Quantization loss compression step metric","Model weight size parameters bytes"], answerIndex: 1 },
                            { question: "True or False: Modern enterprise vector cloud clusters support real-time data adjustments, automatically calculating embeddings for incoming new documents on the fly via background workers.", options: ["True","False"], answerIndex: 0 },
                            { question: "Semantic search bridges the conceptual gap between human intent phrases and:", options: ["Raw character-by-character text matching strings rules","Unstructured corporate document collections filed across vector spaces?"], answerIndex: 1 },
                            { question: "", options: ["A final text generation model block","An embedding vector calculation block matched against a similarity index search engine","A web page layout design template layer","A standard code compiler parsing tree block"], answerIndex: 1 },
                            { question: "When an AI application uses semantic search to fetch data before calling a generative chat model, it is executing a:", options: ["Code fine-tuning workflow script step","Retrieval stage inside a RAG pipeline","One-hot encryption matrix calculation step","System diagnostic memory flush"], answerIndex: 1 },
                            { question: "Which mathematical distance metric gets larger as two vectors grow less similar?", options: ["Cosine Similarity","Euclidean Distance / L2 Distance","Dot Product vector score","Reciprocal Rank Fusion ranking metric"], answerIndex: 1 },
                            { question: "If two vectors are identical in magnitude and direction, their dot product score equals:", options: ["0.0","The squared magnitude length of the vector","Negative infinity","A random fraction value"], answerIndex: 1 },
                            { question: "What does an index build time duration depend heavily on?", options: ["The selection of color schemes used in code documentation","The total number of vectors, dimension count, and the explicit choice of ANN graph complexity configuration parameters","The name string lengths assigned to database collections parameters","The system web browser application tier version"], answerIndex: 1 },
                            { question: "Which vector database engine option is implemented as an extension directly inside a standard PostgreSQL relational database engine deployment?", options: ["Pinecone Cloud service","pgvector extension","Chroma localized memory db container","Milvus cluster architecture setup"], answerIndex: 1 },
                            { question: "What is a \"dense retrieval\" model?", options: ["A traditional keyword matching framework like TF-IDF","An embedding model that creates dense continuous vector spaces for retrieval tasks","A text parser that deletes spacing characters rules","A file archiver tool layer"], answerIndex: 1 },
                            { question: "What is a \"sparse retrieval\" model?", options: ["A model that completely ignores vowels letters structures","A model that creates high-dimensional vectors where most values are zero (like traditional keyword index bags of terms or SPLADE)","An image tracking algorithm block","A secure network routing gateway"], answerIndex: 1 },
                            { question: "Combining dense retrieval and sparse retrieval in an architecture layout is an implementation of:", options: ["Simple zero-shot instruction execution","Hybrid semantic search pipeline systems","Tree of thoughts code frameworks compilation","Offline data storage compression algorithms formatting"], answerIndex: 1 },
                            { question: "Semantic search allows enterprise systems to search across text contexts without requiring:", options: ["Any embedding vectors configurations setups","Manual tagging, categorization, or exact vocabulary consistency checks across documents collection datasets"], answerIndex: 1 }
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
                text: "To integrate a semantic search component with an LLM text generation model, constructing a complete end-to-end Retrieval-Augmented Generation (RAG) pipeline that provides context-grounded answers.",
                bullets: []
              },
              theory: [
                {
                  title: "The RAG Orchestration Engine",
                  body: [
                    "Retrieval-Augmented Generation (RAG) is the enterprise gold standard for deploying LLMs. It fuses the rapid data retrieval of semantic search with the dynamic reasoning capabilities of generative models.",
                    "RAG directly solves the two most significant limitations of LLMs: hardcoded knowledge cut-off dates and the propensity for factual hallucinations."
                  ]
                },
                {
                  title: "The RAG Loop",
                  body: [
                    "The architecture operates on an orchestrator loop. When a user asks a question, the orchestrator intercepts it and executes a semantic search against an updated vector database.",
                    "It retrieves the most relevant facts, injects those facts into a structured prompt, and passes the entire package to the LLM.",
                    "This grounds the generation in verifiable reality. Advanced RAG pipelines improve upon this by utilizing Cross-Encoders (to logically rerank the retrieved chunks before injection) and Query Expansion (to rewrite poor user queries into optimized search strings)."
                  ]
                }
              ],
              pretest: [
                            { question: "What does RAG stand for in AI development?", options: ["Random Access Generation","Retrieval-Augmented Generation","Rapid Array Grouping","Real-time Authentication Gateway"], answerIndex: 1 },
                            { question: "What is the primary problem that a RAG pipeline solves for LLMs?", options: ["It makes the text font look sharper","It provides the model with up-to-date, external company-specific knowledge, reducing hallucinations and avoiding retraining costs","It increases internet connection speeds","It reduces python script indentation bugs"], answerIndex: 1 },
                            { question: "What are the three main conceptual stages of a basic RAG pipeline?", options: ["Ingestion (Chunk/Embed), Retrieval (Search), and Generation (LLM Answer)","Start, Middle, Delete","Tokenize, Compile, Execute","Encryption, Decryption, Validation"], answerIndex: 0 },
                            { question: "In a RAG pipeline, where does the background context text come from?", options: ["The pre-trained model weights directly","An external data source or vector database queried at runtime based on the user's question","A random text generator engine","The system operating system kernel data files"], answerIndex: 1 },
                            { question: "What role does the LLM (Large Language Model) play in a RAG pipeline?", options: ["It handles document storage partitioning mechanics","It reads the user question along with the fetched context documents and synthesizes a clean natural language answer","It creates database connection sockets strings","It calculates cosine similarity vectors values arrays"], answerIndex: 1 },
                            { question: "If you ask a standard pre-trained LLM about a confidential internal document written yesterday, it will fail unless you use RAG because:", options: ["It is written in a programming language code style","The document was not part of its static pre-training dataset and it doesn't have real-time memory access to it otherwise","The text size has too many pages formatting lines","The model temperature parameter is set to zero metrics"], answerIndex: 1 },
                            { question: "What is \"Prompt Injection of Context\" in RAG?", options: ["Hacking a remote server database table record asset","Automatically pasting the retrieved relevant text chunks straight into the system prompt window text box before passing it to the LLM","Changing the vocabulary definitions records list arrays","Running an automatic spellchecking script loop over data rows"], answerIndex: 1 },
                            { question: "Which of these blocks represents a typical developer prompt layout inside a RAG system?", options: ["\"Answer the question using only this context. Context: {retrieved_text} Question: {user_question} Answer:\"","\"Let's think step by step to design a brand new database schema layout from scratch.\"","\"Input pair example: Cat -> Animal. Now translate this code block into French language blocks.\"","\"Strictly respond using a valid schema JSON object payload matching these key variables parameters arrays.\""], answerIndex: 0 },
                            { question: "What framework asset orchestrates RAG pipeline components out-of-the-box for Python applications?", options: ["LlamaIndex or LangChain","Pygame game engine runtime layer","Matplotlib data graphing visuals tool","OpenPyXL spreadsheet configuration cell script"], answerIndex: 0 },
                            { question: "The quality of a RAG pipeline's final answer depends heavily on:", options: ["The background color configuration options profiles of web portals interfaces","Both the absolute relevance of the retrieved context documents and the synthesis instruction capabilities of the LLM execution block","The file name character path lengths parameters used to track code files on storage drives","The brand name tier of the physical monitor screen used to write software scripts code"], answerIndex: 1 },
                            { question: "When setting up a simple RAG ingestion pipeline pipeline code script, what is the first operational task?", options: ["Clearing the cloud vector index storage workspace partition tables records completely","Reading raw document files (like PDFs, markdown logs, or text sheets) and parsing them into clean plain text strings characters rows","Formatting python dictionary variables mappings models into JSON schemas structures definitions","Calling a generative chat API endpoint loop tool to test latency metrics responses throughput"], answerIndex: 1 },
                            { question: "What does a \"Document Loader\" utility component do in a RAG pipeline architecture layout?", options: ["Installs system device drivers for scanning papers","Connects to files sources (like Google Drive, local paths, or web scrapers) to extract raw text content assets","Compresses document files into zip formats archives blocks","Translates text rows into multiple languages dynamically layers"], answerIndex: 1 },
                            { question: "Why must we chunk text before adding it to a RAG pipeline vector database index?", options: ["Long documents exceed embedding model token constraints and dilute specific vector context profiles meaning across too many sentences boundaries","Chunking speeds up internet network routing packets transfers","Chunks convert text variables characters directly into integers values automatically maps","Untokenized plain paragraphs break markdown styling blocks rules options"], answerIndex: 0 },
                            { question: "If your RAG pipeline retrieval function is broken and returns completely irrelevant documents to the prompt injection layer, the LLM will likely:", options: ["Self-correct the database records text using internal AI logic paths","Generate an inaccurate answer or a hallucination based on the bad context instructions provided (Garbage In, Garbage Out)","Throw a hard system compilation syntax exception crash error code","Format the local computer storage drive workspace partition files"], answerIndex: 1 },
                            { question: "What configuration metric controls the exact text chunk length boundaries inside a text splitter helper asset function code call?", options: ["chunk_size","temperature","learning_rate","top_p"], answerIndex: 0 },
                            { question: "What does \"Grounding\" mean in a RAG context architecture?", options: ["Running electrical wires to protect computer hardware components racks units","Ensuring the LLM's final generated statements are strictly derived from and supported by verified facts present inside the retrieved reference context text","Setting the vocabulary size parameters matrix index values to zero limits","Erasing old chat history tracking collections records logs"], answerIndex: 1 },
                            { question: "If a user query states \"What is our company refund policy for damaged clothing items?\", a RAG system retrieves:", options: ["The entire handbook from page 1 to page 500 into context memory fields","The specific text chunk or paragraph block detailing terms for damaged returns from the policy knowledge base index","A list of all active employee profiles names records arrays","A blank template text dictionary structural object container"], answerIndex: 1 },
                            { question: "Which component acts as the connector link between a semantic search vector index match action and the prompt construction module?", options: ["A data tokenizer module script line","A context injection retriever class function object method call","A secure authentication firewall proxy gateway block","An offline hardware driver compiler pipeline thread"], answerIndex: 1 },
                            { question: "What is a \"Naive RAG\" pipeline setup?", options: ["An advanced multi-agent system executing self-correction loops trees of thought optimization workflows","A simple standard baseline RAG pipeline that directly indexes, embeds chunks, runs vector search, and pipes text into a prompt without advanced optimization layers","A pipeline that doesn't use any embedding models vectors calculations setups","An offline system configuration file reader script block"], answerIndex: 1 },
                            { question: "True or False: A RAG pipeline allows you to update your AI application's known knowledge base instantly by adding new text vectors to the vector index without retraining model parameter weights.", options: ["True","False"], answerIndex: 0 },
                            { question: "What is the \"Lost in the Middle\" phenomenon in RAG pipelines context loading?", options: ["High-dimension embedding models vectors converting values data to zero limits parameters","LLMs frequently paying high attention to the very beginning and end of long injected context texts while overlooking details buried deep inside the middle parts","System network routing nodes dropping packet payloads rows files channels halfway","Databases collection indices losing track of text characters chunks mappings pathways"], answerIndex: 1 },
                            { question: "If your RAG system suffers from \"Lost in the Middle\" errors during evaluation workflows, a viable design fix is to:", options: ["Shorten injected context lengths or use a Re-ranker to place the absolute highest relevance context chunks at the extreme top of the prompt field layout","Use a larger font profile style row sheet formatting template inside dashboards views","Turn off the model temperature parameter entirely to lock down generation patterns logic","Delete all punctuation characters tokens from user text arrays queries inputs completely"], answerIndex: 0 },
                            { question: "What does a \"Context Window Overflow\" error code imply during a RAG pipeline step code run execution?", options: ["The computer storage hardware workspace partitions have run out of free bytes limits","The combined length of the user prompt instruction, historical chat logs, and retrieved context texts tokens has exceeded the maximum sequence length limit the model is physically built to evaluate at once","The background web server process container has dropped its internet network socket channel pipeline","The data tokenizer index lookup map contains an unrecognized special characters structure code string"], answerIndex: 1 },
                            { question: "What is a \"hallucination\" inside a production RAG answer generation step response profile?", options: ["The AI system sending email notifications logs data to incorrect target addresses accounts fields","The model generating facts or assertions that are completely missing from or explicitly contradicted by both its pre-trained weight maps and the provided retrieved document context sheets rows","An automatic switch from dark mode interfaces styles into light background configurations layers templates","A drop in generated tokens per second execution speed throughput performance scores metrics"], answerIndex: 1 },
                            { question: "How can you explicitly instruct an LLM in a RAG prompt configuration block to handle situations where the retriever finds NO relevant context data chunks to answer the user query?", options: ["Tell it to write a creative story instead using general internet history knowledge bases paths","Add a strict instruction constraint stating: \"If the context does not contain the answer, say 'I do not have that information' and do not make up facts.\"","Leave the instruction blank and let it guess dynamically","Command the system layer pipeline to execute a remote data deletion routine across the vector database index space"], answerIndex: 1 }
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
                            { question: "What does \"Query Rewriting\" (or Query Transformation) do in an advanced RAG pipeline?", options: ["Erases user inputs completely if they contain syntax spelling grammar bugs errors strings","Uses a fast LLM step to rephrase a sloppy or ambiguous user query into an optimized, clear search query text profile before hitting the retrieval index step","Translates user questions into computer programming syntax blocks code scripts directly automatically","Changes the collection indexing properties schema models within database cloud workspaces configurations"], answerIndex: 1 },
                            { question: "What is \"Sentence Window Retrieval\"?", options: ["Scanning an entire webpage document word-by-word slowly row line text path","A strategy where small text chunks (e.g., a single sentence) are used for vector similarity search matching steps, but a larger surrounding window of context sentences is retrieved and fed to the LLM prompt layer to ensure complete meaning","A data processing tool that deletes spacing blocks templates formats styles elements","An alignment tuning script parameter block model checkpoint path target"], answerIndex: 1 },
                            { question: "What does \"Parent-Child Chunk Retrieval\" mean?", options: ["Multi-threaded processing tasks handling file copy loops routines operations maps files partitions","Matching small child chunks during the vector similarity index search phase, but pulling their larger parent document text block container into the prompt synthesis frame to give the generation layer clean holistic data context","Sorting text variables strings alphabetically inside multi-level nested dictionaries layouts indices matrices","Running user login profile validation scripts layers across distinct network access privilege boundaries"], answerIndex: 1 },
                            { question: "What is an \"Advanced RAG\" system component that evaluates retrieved chunks to filter out low-relevance blocks before prompt building steps take place?", options: ["A function calling tool agent proxy module route asset mapping table","A semantic context compressor or filter block module (e.g., LLMLingua or LongLLMLingua)","A regular expressions parsing template array lookup compiler script row line","An offline system hardware storage volume optimization routine script thread"], answerIndex: 1 },
                            { question: "To test if your RAG pipeline architecture works safely under heavy concurrency loads, you evaluate metrics like:", options: ["User interface dashboard theme color hex values profiles lines matches parameters","Data token generation latency metrics, search retrieval accuracy recall scores, and overall correctness answers benchmarks validation tests","The count of characters found inside raw unparsed source text directory directories strings paths names","Computer fan hardware rotation speed parameters limits checks routines controls loops"], answerIndex: 1 },
                            { question: "What framework tool specifically focuses on automated testing and evaluation of RAG pipeline components (like retrieval relevancy and faithfulness generation metrics)?", options: ["Ragas (or TruLens)","Pygame game rendering asset toolkit","Formatting markdown code extensions layers","System task manager utility applications processes"], answerIndex: 0 },
                            { question: "In a RAG metric suite, \"Faithfulness\" checks:", options: ["How fast the model completes processing token streams outputs items lines fields","Whether the generated answer is strictly grounded in the retrieved context documents text without adding outside unverified claims details facts","If the user query matches English spelling syntax layout rules templates conventions","The number of database records matching exact string names values indices"], answerIndex: 1 },
                            { question: "In a RAG metric suite, \"Answer Relevance\" checks:", options: ["The file size footprint bytes of the text storage system space partition container","Whether the generated final answer actually addresses the core intent and specific question puzzle details asked by the user query block","The selection profile color settings options chosen inside dashboard views layouts schemas","If the data strings characters are converted into integers arrays lists tables rows"], answerIndex: 1 },
                            { question: "What technique parses complex document data tables structures cleanly into text representations before RAG ingestion pipelines process them?", options: ["Markdown tables conversions, HTML layouts scraping wrappers, or multimodal parsing vision steps models (e.g., Unstructured, LlamaParse)","Random space stripping functions tools loops scripts strings variables","Code compilation tree extraction parsing logic routines frameworks targets","Vector coordinates matrix inversion processing calculations layers units arrays"], answerIndex: 0 },
                            { question: "True or False: A RAG pipeline architecture completely removes the need for checking data safety privacy access controls lines because the vector database filters are completely automated behind the scenes.", options: ["True","False"], answerIndex: 1 },
                            { question: "Which asset forms the final boundary bridge handling RAG pipeline generation workflow tracking internally for auditing?", options: ["A markdown text style layout sheet template block parameter configuration","An application observability tracer logging tool framework asset (e.g., LangSmith, Phoenix, or Langfuse)","An offline database backup zip compression file stream process runner","A standard system network router hardware interface proxy loop control"], answerIndex: 1 },
                            { question: "When building a multi-source RAG layout routing infrastructure, if a user query requires financial market information but the system routes the query to an employee HR policy index workspace, what component is failing or misconfigured?", options: ["The data output format validation serialization mapper block schema class model definitions","The query intent router classification routing layer component block of the RAG pipeline architecture","The system text tokenization vocabulary array lookups length indexing tables bounds","The frontend dashboard interface components layout CSS presentation layers templates rules"], answerIndex: 1 },
                            { question: "What does a \"Graph RAG\" architecture system layout leverage to optimize context retrieval paths mechanics over interconnected reference texts sets data logs files?", options: ["Linear single-dimension coordinate padding lines loops paths definitions records","Knowledge graphs combined with community text summaries extractions to surface holistic conceptual patterns structural linkages themes across massive records datasets collections","Simple static character matching patterns regular expressions scripts compilation frameworks strings","Automated memory management garbage collection loops configurations properties metrics rules parameters"], answerIndex: 1 },
                            { question: "Which component executes right after the Retriever block but right before the Prompt builder block in a highly tuned production RAG setup?", options: ["The text document chunking ingestion workers task runners threads loops profiles","The Context Re-ranking / Filtering module block engine pipeline stage component layer","The final system output markdown text formatting pipeline module class model interface","The user authentication session credential validator handshake system security proxy"], answerIndex: 1 },
                            { question: "RAG pipeline solutions fundamentally combine the reliable data correctness tracking qualities of corporate knowledge databases search engines with the fluent natural language communication expression capabilities of:", options: ["Unformatted assembly code execution script compiler blocks systems tools","Generative Large Language Models foundation context engines conversational checkpoints","Simple file extraction scripts utilities systems parameters tracks rules checks limits metrics properties boundaries configurations models frameworks loops controls operations validations fields strings vectors records objects methods targets logic options configurations parameters"], answerIndex: 1 },
                            { question: "Which python snippet abstract class workflow pattern matches a clean RAG generation route structure logic boundary design pattern step template?", options: ["context = retrieve(query); prompt = build(query, context); answer = generate(prompt)","delete_all_files(); restart_server(); update_gpu_firmware(); check_system_latency_metrics()","for char in text: if char == ' ': count += 1; print(count); return count; exit()","schema = {\"key\": \"value\"}; validate_json(schema); compile_code_tree(); print(\"Success\")"], answerIndex: 0 },
                            { question: "If your production RAG application is returning cut-off sentences at the extreme end of the chat box window response field, you should change your model configuration parameter:", options: ["learning_rate","max_tokens (or max_output_tokens)","chunk_overlap","vector_dimensions"], answerIndex: 1 },
                            { question: "What is an \"Inverted Index\" in a hybrid RAG pipeline context component block setting?", options: ["A vector graph structure that travels backward through hidden attention layers matrix calculations","A core traditional database indexing layout mechanism mapping exact keyword term strings to lists of matching document ID locations (used for the BM25 keyword search branch)","A list of unauthorized user accounts blocked from accessing local cloud server storage frameworks","A text string formatting algorithm converting markdown documents into raw unspaced characters lists"], answerIndex: 1 },
                            { question: "When configuring database access parameters configurations within cloud server files for a secure corporate RAG pipeline tool deployment layout, developers store secrets tokens strings using:", options: ["Plain open text documentation lines headers comments blocks code repositories strings variables","Secure environment variables configs parameters container vault managers values options tracks","Random numeric digits arrays written inside public application files paths configurations logs","Standard layout style definitions files sheets templates markdown blocks attributes keys"], answerIndex: 1 },
                            { question: "Which strategy passes summarized versions of historical chat conversation streams logs text along into new prompt context boxes boundaries to preserve multi-turn memory tracking profiles?", options: ["Static vector indexing quantization parameters transformations fields metrics structures","Chat history compression summarizes memory management pipeline component routines setups maps","Deleting older conversation rows entries arrays collections text completely parameters files tracks","Reversing the character order array sequence matching strings loops workflows codes compilers"], answerIndex: 1 },
                            { question: "What is a \"Data Pipeline Ingestion Worker\" in an enterprise production RAG workflow setup architecture?", options: ["A script component that runs on user devices dashboards pages checking dark mode themes choices","A background automation processing service task handling automated data scanning, document text parsing parsing, chunk partitioning, vector calculation embedding creation steps, and batch writing procedures straight into database collections systems indices","A secure browser proxy gateway firewall block checking network packet data encryption keys lines layers","An offline system hardware diagnostic thread tracker logging compute clock temperature performance metrics bounds"], answerIndex: 1 },
                            { question: "If your vector database retrieval step returns the exact same matching text block chunk multiple times inside the prompt building context variable string box field, you should check for:", options: ["Incorrect color format style rules templates variables applied inside interface views presentation layouts","Missing deduplication verification steps filters logic loops checks inside data ingestion pipelines retrieval functions components scripts","Model dimension coordinate count size differences variables configurations mismatch parameters parameters profiles","Language selection rules translation layers scripts parameters configurations boundaries adjustments codes models"], answerIndex: 1 },
                            { question: "Which component forms the absolute final processing layer right before output text stream arrays hit user interfaces presentation panels fields inside a RAG ecosystem tool app container app layer?", options: ["The document chunking splitting component worker service module class target script","The text stream generation decoding synthesis layer execution block engine endpoint API parameter method response channel","The data vector collection quantization parameter matrix recalculation utility step thread module","The network hardware routing packet encryption firewall proxy checker controller loop routine"], answerIndex: 1 },
                            { question: "When testing context relevancy scores using an automated appraisal benchmark metric pipeline frame tool script code run execution, a score value profile matching 0.0 means:", options: ["Perfect maximum absolute relevance matching precision performance metrics output profile","Complete lack of document alignment semantic mapping intersection correctness data context value criteria relevance profiling matching (none of the fetched chunks are useful)","An internal code compilation crash bug error sequence trace log output structure file line target boundary","Active database connections socket parameters settings channels pipelines routes configurations allocations setups"], answerIndex: 1 },
                            { question: "RAG configurations enable software developers to build incredibly robust, audit-verifiable data exploration solutions because every generated claim answer sentence can link back cleanly to a traceable:", options: ["Local system file layout directory name path text string pointer record tracking identifier source chunk asset context citation reference boundary","Model attention layer weight matrix calculation float index vector coordinate sequence variable identifier position key parameter"], answerIndex: 0 }
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
                text: "To systematically analyze the technical trade-offs, cost models, and performance boundaries of Prompt Engineering/RAG versus Parametric Fine-Tuning configurations.",
                bullets: []
              },
              theory: [
                {
                  title: "Choosing the Right Optimization Path",
                  body: [
                    "When optimizing an LLM for enterprise use, engineers must choose between altering the model's context or altering its neural weights.",
                    "Prompt Engineering & RAG (In-Context Learning) injects knowledge directly into the active prompt. It is highly effective for rapidly changing external facts, requires minimal upfront compute, but increases per-query API token costs."
                  ]
                },
                {
                  title: "Parametric Fine-Tuning",
                  body: [
                    "Fine-Tuning (Parametric Optimization) fundamentally alters the statistical weights of the neural network via supervised training on hundreds of input-output pairs.",
                    "While fine-tuning is terrible at learning new facts (which quickly become outdated), it excels at teaching the model complex structural formats, proprietary programming languages, and specific brand tones.",
                    "Modern parameter-efficient techniques like LoRA (Low-Rank Adaptation) have made fine-tuning accessible by freezing the massive base model and only training a tiny adapter layer, drastically reducing GPU requirements."
                  ]
                }
              ],
              pretest: [
                            { question: "What is the primary difference between Prompt Engineering and Fine-Tuning?", options: ["Prompt engineering uses code; fine-tuning only uses plain English text instructions","Prompt engineering guides model behavior through text input context instructions without changing weights; fine-tuning structurally modifies the internal parameter weights of the neural network by training on a dataset","Fine-tuning is faster and cheaper to prototype than prompt engineering workflows","Prompt engineering changes the model's vocabulary size tracking metrics"], answerIndex: 1 },
                            { question: "What does \"Fine-Tuning\" a model actually do?", options: ["It tweaks the screen resolution font sizes on user devices dashboards layouts","It runs an optimization training loop across specialized domain dataset rows, adjusting model checkpoint weights so it adapts to specific formats, styles, or patterns natively","It deletes old tokens from memory index arrays systems fields databases parameters","It sets up an external vector search engine index cluster routing cloud server script channel"], answerIndex: 1 },
                            { question: "What is \"Prompt Engineering\"?", options: ["The process of coding a new generative foundation architecture engine from scratch using hardware compilers","The art and science of design, structuring, and optimizing textual prompt instructions and context formats to get the best performance from a static pre-trained model","A network routing optimization protocol handling packet data transfer rate limits","An administrative database setup mapping schemas keys tables variables relations indexes"], answerIndex: 1 },
                            { question: "Which technique is best for rapid prototyping when you need to test a brand-new application concept idea within 5 minutes?", options: ["Fine-Tuning a 70-Billion parameter foundation checkpoint model on cloud clusters hardware worker pipelines","Prompt Engineering via clear text instructions inside an interactive playground workspace chat frame","Writing a brand new tokenization algorithm script compiled in C++ binaries modules code paths","Converting unstructured documents records text collections rows directly to matrix coordinates transformations layers"], answerIndex: 1 },
                            { question: "If you need an AI model to write text matching your company's extremely specific tone of voice, formatting guidelines, and brand persona perfectly across every response, which path is the most reliable for permanent structural formatting consistency?", options: ["Basic zero-shot unguided prompt questions execution routes lines variables scripts","Fine-Tuning the model on thousands of high-quality sample documents matching your brand communication style guide sheets rows datasets","Increasing the model generation context length parameter limits configuration tracking attributes values numbers","Changing the file directory storage paths assigned to system logs collections maps indices parameters"], answerIndex: 1 },
                            { question: "What is a \"Data Scaling Bottleneck\" of Fine-Tuning workflows?", options: ["It requires thousands of high-quality, labeled example prompt-response pairs to train effectively, whereas prompt engineering requires zero or only a few examples","It shortens the available context length window limit size metrics processing parameters options strings characters","It demands immediate translation of all corporate datasets text rows into French files modules scripts repositories","It breaks standard markdown code block presentation guidelines rendering presentation templates schemas variables"], answerIndex: 0 },
                            { question: "Which approach is fundamentally cheaper from an initial upfront computing infrastructure investment standpoint?", options: ["Fine-Tuning an open-source model checkpoint across a cluster of 8x H100 GPUs for three days continuous training loops runs","Prompt Engineering against a pre-deployed cloud API model using careful context design layout guidelines rules structures","Building a custom vector database indexing engine framework module binary compiler component line script from scratch","Quantizing neural network attention layers matrix calculations from float values to binary integer values targets tracking blocks"], answerIndex: 1 },
                            { question: "If a model needs to learn a massive set of brand-new, dynamically changing facts every single minute (like live real-time stock pricing swings values lines charts data metrics), which strategy is best?", options: ["Fine-Tuning the model weights on a continuous training loop every 10 seconds across cloud node workers clusters pipelines","Prompt Engineering combined with Retrieval-Augmented Generation (RAG) to inject fresh, live database search metrics directly into the context window at runtime","Typing long natural language instructions commanding the model to guess stock prices values paths accurately using math intuition code","Setting the model temperature parameter limit to the maximum value score boundaries configurations tracks properties adjustments"], answerIndex: 1 },
                            { question: "What does \"In-Context Learning\" refer to in this comparison ecosystem?", options: ["The permanent weight modifications that occur when running backpropagation training steps across dataset rows files text blocks frames","The model's temporary ability to understand tasks, mimic patterns, and execute logic instructions based entirely on the text data currently written inside its prompt frame context window during a single inference call","The hard-coded system parameters loaded by system boot files parameters keys schemas models configuration drivers scripts paths","The process of building a knowledge graph connection array between distinct network database tables clusters partitions records storage volumes"], answerIndex: 1 },
                            { question: "What is a major downside of over-relying on massive few-shot prompts (Prompt Engineering) instead of fine-tuning for high-throughput production scale systems workflows?", options: ["The prompt text consumes a massive chunk of the context window with every single request, increasing token processing costs and latency overhead drastically","The model completely loses its ability to generate text strings responses inside conversational frameworks routes interfaces layouts","The system requires hard system reboots routines loops controls sequences every time a new user logs into active dashboard views","The vocabulary tokenizer lookup index mapping limits parameters files grow completely unstable numerical values coordinates matrices arrays"], answerIndex: 0 },
                            { question: "What does LoRA stand for in fine-tuning methodologies architectures?", options: ["Localized Routing Allocation","Low-Rank Adaptation","Linear Optimization Rule Algorithm","Long Range Attention"], answerIndex: 1 },
                            { question: "Why is Low-Rank Adaptation (LoRA) popular for parameter-efficient fine-tuning (PEFT)?", options: ["It deletes the model's base layer weights completely to save space partitions storage volumes bytes records files","It freezes the original pre-trained model weights and inserts small, trainable rank decomposition matrices into the attention layers, drastically reducing compute costs and VRAM training footprint metrics requirements","It changes text words inputs directly into programming code files scripts parameters configurations targets lines checks loops","It bypasses data tokenization preprocessing workflows routines entirely automatically maps paths models blocks checkpoints fields"], answerIndex: 1 },
                            { question: "What is \"Catastrophic Forgetting\" in fine-tuning settings contexts?", options: ["The system clearing user credentials records history tables data due to a cloud network connection drop timeout failure error code exception","A risk where fine-tuning a model heavily on a narrow specialized dataset causes it to degrade or lose its general knowledge, reasoning capabilities, or instruction-following skills learned during pre-training","An automatic memory dump process running across GPU hardware setups components lines blocks units clusters frames layers","A formatting bug string translation error that switches text lines output patterns randomly into uppercase letters blocks formats rows"], answerIndex: 1 },
                            { question: "Which technique is explicitly a Parameter-Efficient Fine-Tuning (PEFT) methodology variant?", options: ["LoRA / QLoRA / Prefix Tuning","System Role Persona Prompting","Re-ranking Cross-Encoder Retrieval","Recursive Character Chunk Partitioning"], answerIndex: 0 },
                            { question: "What does QLoRA add to the standard LoRA fine-tuning approach optimization?", options: ["Massive automated question generation templates text data scripts datasets paths frameworks models","Quantization of the base model weights to 4-bit precision before applying low-rank matrices adapters, allowing fine-tuning of massive models on significantly cheaper consumer GPU hardware units setup profiles","High speed network packet routing encryption tools modules gateway protocols firewalls targets fields controls","Automated markdown documentation formatting script loops checkers validations bounds rows cells lines properties"], answerIndex: 1 },
                            { question: "If you use Prompt Engineering to guide an LLM, the model parameters are considered:", options: ["Continuously updating via gradient descent updates variables calculations steps runs trajectories loops","Static / Frozen (unmodified weights context tracking boundary)","Completely randomized values configurations transformations metrics layers units models","Hidden behind file access encryption proxy systems security policies settings"], answerIndex: 1 },
                            { question: "What fine-tuning stage aligns a raw pre-trained base model checkpoint to become a helpful, safe conversational chatbot assistant profile matching human preferences?", options: ["Linear regression matrix alignment calculation normalization processing steps runs loops","Instruction Fine-Tuning (IFT) combined with Reinforcement Learning from Human Feedback (RLHF) / Direct Preference Optimization (DPO)","Tokenizer vocabulary dictionary character extraction splitting rules scripts frameworks arrays paths","Offline hardware file volume defragmentation routines log optimization indices tracking tables setups"], answerIndex: 1 },
                            { question: "What does RLHF stand for in model tuning pipelines architectures alignment?", options: ["Random Layer High Frequency","Reinforcement Learning from Human Feedback","Recursive Logic Hardware Framework","Rapid Language Heterogeneous Function"], answerIndex: 1 },
                            { question: "What does DPO stand for in modern alignment fine-tuning recipes setups alternatives?", options: ["Direct Preference Optimization","Dynamic Prompt Organization","Dense Pattern Output","Distributed Parameter Operation"], answerIndex: 0 },
                            { question: "Which method should you choose if you need to alter how a model fundamentally parses language math logic structures or matches complex semantic syntax natively across all outputs without input overhead?", options: ["Light conversational prompt engineering roleplay descriptions modifications strings lines options","Deep domain weight architecture Fine-Tuning (Full parameter tuning or target PEFT adapter training loops models)","Shortening the context window tracking variable size metrics properties bounds indices records","Changing the presentation color themes properties used inside user dashboards analytics portals scripts"], answerIndex: 1 },
                            { question: "If your prompt engineering attempts are growing highly complex, requiring a 4,000-word prompt detailing 50 distinct edge-case classification rules to work, you should consider transitioning to:", options: ["Adding even more text instructions sentences guidelines notes exclamation marks blocks rows lines","Distilling those rules into a clean training dataset to Fine-Tune a dedicated model custom adapter checkpoint matching the task profile natively","Deleting all examples and letting the zero-shot baseline guess randomly without tracking rules data parameters","Switching the local backend python file extension format into alternative system configuration structural script options"], answerIndex: 1 },
                            { question: "What is an advantage of a Fine-Tuned model deployment when looking at real-time endpoint latency speeds under massive customer traffic loads?", options: ["Every API call finishes instantly with 0 tokens generated automatically profiles maps routes arrays","You save significant time and computation processing latency during the prompt processing (pre-fill) phase because you don't need to pass massive few-shot instruction strings into the context box for every single transaction request","The model automatically translates its internal architecture calculations code directly into low level assembly wiring scripts instructions","VRAM memory tracking blocks usage optimization dropped completely zero boundaries configurations targets variables levels metrics"], answerIndex: 1 },
                            { question: "True or False: A successfully fine-tuned model checkpoint entirely eliminates the risk of logical hallucinations or factual mistakes, ensuring absolute 100% deterministic code accuracy output metrics values profiles.", options: ["True","False"], answerIndex: 1 },
                            { question: "When compiling a fine-tuning dataset collection pipeline task, what format structural pattern is standard for instruction tuning rows pairs configurations mappings definitions templates?", options: ["Unstructured plain paragraphs sequences lines files containing generic text documentation blocks logs datasets webs","JSONL objects structuring clear keys boundaries like {\"messages\": [{\"role\": \"system\", \"content\": \"...\"}, {\"role\": \"user\", \"content\": \"...\"}, {\"role\": \"assistant\", \"content\": \"...\"}]}","Relational SQL table database file schema dump commands scripts strings creations modifications lines drops updates","Raw binary byte codes stream tracking coordinates files arrays directories partitions workspaces data components"], answerIndex: 1 },
                            { question: "What optimization danger arises if you train a fine-tuning adapter model loop for too many epochs across a tiny dataset sample size collection rows profile?", options: ["Underfitting parameters loss reduction calculation paths configurations metrics lines logs errors tracks","Overfitting (the model memorizes the exact dataset rows text perfectly but fails to generalize accurately to new unseen user inputs phrases questions)","The model dimensions coordinate values count changes size count values transformations models blocks grids boundaries","The tokenizer deletes standard language vocabulary token strings from system reference dictionary structures tables"], answerIndex: 1 }
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
                            { question: "Which asset forms the final deployment outcome of a successful prompt engineering design workflow?", options: ["A newly compiled binary foundation model weight architecture checkpoint file storage path disk target","An optimized system prompt string template file integrated into your application code layer configurations files assets parameters options","A new cloud cluster database schema layout design script creation table command lines mapping paths models","An offline system hardware driver optimization routine tracker logging microcode updates processing logs records"], answerIndex: 1 },
                            { question: "When evaluating project development costs timelines, Prompt Engineering is characterized as:", options: ["High initial development cost, requiring weeks of machine clusters cloud training infrastructure budget before testing lines queries fields","Low initial cost, high agility, enabling instant automation through text field string modifications inside code setup configs files parameters","Extremely slow deployment iteration validation lifecycles matching low speed networking pipelines routing metrics constraints bounds","Incompatible with standard generative LLM API infrastructure endpoints deployment services setups models channels"], answerIndex: 1 },
                            { question: "What does \"Full Parameter Fine-Tuning\" imply compared to PEFT techniques like LoRA?", options: ["Modifying only the final softmax activation output classifier layer block metrics properties parameters rules structures","Updating every single weight layer parameter throughout the entire deep neural network architecture during backpropagation training loops calculation steps execution runs runs (highly resource intensive)","Deleting all text token strings arrays list models dictionary collections indices components files partitions data","Running user session login validation loops routines processes across local device frameworks drivers scripts code boundaries"], answerIndex: 1 },
                            { question: "If you find a model's writing style is correct but its accuracy on domain knowledge dates, specific project references, and names is low, you should solve this by pairing your prompt design configuration with:", options: ["A larger model tokenizer vocabulary list expansion script array compiler mapping path lines codes variables","A Retrieval-Augmented Generation (RAG) pipeline to feed accurate search context documents text straight to the model prompt window at query execution time","Natural language instruction descriptions written completely in block capitals letters formats templates structures files records","A hardware server memory infrastructure reboot execution sequence checking cooling performance tracking bounds metrics parameters"], answerIndex: 1 },
                            { question: "Prompt engineering and fine-tuning form a complementary spectrum of AI optimization capabilities. A wise production engineering design pattern is to first freeze your model architecture selection and optimize workflows using ____, and then move to ____ if you need to scale up format consistency, save token costs, or lock down specialized behavioral performance benchmarks.", options: ["Brute force code rewrites / manual integer data matching algorithms transformations fields strings variables lines paths","Prompt Engineering and RAG pipelines architectures frameworks / dedicated targeted model Adapter Fine-Tuning recipes datasets systems tracks","File compression zip drivers utilities settings formats / hard-coded keyword indexing collection mappings models databases frameworks configurations","High precision dimension coordinates transformations matrix layers / zero-shot unguided conversational guess patterns testing loops boundaries checks"], answerIndex: 1 }
                          ]
            }
          }
        ]
      }
    ]
  },
  "c-programming": {
    id: "c-programming",
    title: "C Programming",
    objectives: [
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
    introduction: [
      "C is one of the most fundamental and widely-used programming languages in the history of computing. Developed by Dennis Ritchie at Bell Laboratories in 1972, C has stood the test of time as the foundation for operating systems, embedded systems, compilers, and system-level software. Almost every modern programming language — including Python, Java, and C++ — draws concepts from C.",
      "The Virtual C Programming Lab provides a hands-on, browser-based environment where students can write, compile, and execute C programs without requiring any local software installation.",
      "The lab covers structured experiments across key C Programming concepts — from basic I/O and arithmetic to pointers, data structures, recursion, and file handling. Each experiment includes a clear objective, problem statement, pre-loaded starter code, stdin support for interactive programs, and expected output for self-verification.",
      "Students can attempt all lab problems directly in the browser using a professional code editor powered by a real GCC compiler via the Wandbox execution engine."
    ],
    shortNotes: cShortNotes,
    targetAudience: {
      primary: "Students of engineering and computer science enrolled in introductory C programming courses.",
      prerequisites: [
        "No prior programming experience required",
        "Basic computer operation skills (typing, using a browser)",
        "Understanding of basic mathematics (algebra, arithmetic)"
      ],
      usefulFor: [
        "Diploma students transitioning to B.Tech who want to strengthen fundamentals",
        "Students preparing for competitive exams like GATE where C concepts are tested",
        "Faculty members looking for ready-made experiment references aligned to standard programming curricula",
        "Self-learners who want a structured, compiler-ready C programming environment"
      ]
    },
    alignment: {
      university: "Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV)",
      department: "Basic Sciences and Humanities (BS&HSS)",
      course: "C Programming Lab",
      credits: "L:0 T:0 P:3 C:1.5",
      yearSem: "First Year, First / Second Semester",
      branches: "All B.Tech branches (CSE, IT, ECE, EEE, ME, Civil)",
      totalExperiments: "47 problems across 14 weeks",
      compiler: "GCC (GNU Compiler Collection) via Wandbox — identical to the compiler used in JNTUGV physical labs",
      units: [
        { unit: "Unit I", topics: "Environment, Algorithms, Variables, Arithmetic", weeks: "Week 1–3" },
        { unit: "Unit II", topics: "Operators, Branching, Loops", weeks: "Week 4–6" },
        { unit: "Unit III", topics: "Arrays, Strings, Sorting, Matrices", weeks: "Week 7–8" },
        { unit: "Unit IV", topics: "Pointers, Structures, Unions, Linked Lists", weeks: "Week 9–10" },
        { unit: "Unit V", topics: "Functions, Recursion, File Handling", weeks: "Week 11–14" }
      ]
    },
    weeks: [
      {
        title: "WEEK 1",
        objective: "Getting familiar with programming environment and writing first program",
        tutorial: "Tutorial 1: Environment Setup",
        labTitle: "Lab 1: First steps in C",
        experiments: [
          {
            id: "c-w1-1",
            title: "Hello World",
            desc: "Write a C program to print 'Hello World' to the console.",
            expected: "Hello World",
            content: {
              aim: {
                text: "In this experiment, the student will be able to understand the basic structure of a C program and learn how to display output on the screen using the printf() function.",
                bullets: [
                  "Understand the structure of a C program — preprocessor directives, main function, and return statement",
                  "Learn the role of #include <stdio.h> header file",
                  "Use printf() to print text to the console",
                  "Successfully compile and run their first C program"
                ]
              },
              theory: [
                {
                  title: "🎉 Think of it like this!",
                  body: [
                    "Imagine you just got a brand new robot friend. Before the robot can do anything cool — dance, talk, or help you — it needs to wake up and say hello! That's exactly what this first program does. We're waking up the computer and telling it to say \"Hello, World!\"",
                    "Every time you write a C program, it's like giving your robot a set of instructions written on paper. The computer reads from top to bottom, does exactly what you wrote, and stops.",
                    "![Hello World](https://lmichelin.fr/content/images/2019/05/5c1bb7dd5e7cc9678fcdc39f_Hello-World-Header.webp)"
                  ]
                },
                {
                  title: "Structure of a C Program",
                  body: ["Every C program follows a fixed, well-defined structure. Understanding this structure is the very first step to writing correct C programs. A C program is made up of several distinct parts that must appear in a specific order for the compiler to understand and build the program.", "C was designed in the early 1970s by Dennis Ritchie at Bell Labs. It was built to be close to the hardware while still being human-readable. Because of this design philosophy, C requires you to explicitly declare everything — the libraries you use, the variables you create, and what type of data they hold.", "A basic C program consists of the following parts in order: Preprocessor Directives (lines starting with #), the main() function declaration, opening brace {, the body of statements, closing brace }, and a return statement."]
                },
                {
                  title: "1. Preprocessor Directive",
                  body: ["Lines starting with # are preprocessor directives. They are processed by the C preprocessor (a separate phase before actual compilation) before any code is compiled.", "#include <stdio.h> tells the compiler to include the Standard Input Output library header file. This header file contains function prototypes (declarations) for functions like printf() and scanf(). Without it, the compiler does not know what printf() is and will produce a compilation error.", "Think of #include as an 'import' statement. The angle brackets < > tell the compiler to look in the standard system directories. Double quotes \" \" would tell it to look in the current directory first."]
                },
                {
                  title: "2. main() Function",
                  body: ["Every C program must have exactly one main() function. This is the mandatory entry point — the operating system calls main() to start your program. Execution always begins from the very first statement inside main() and proceeds line by line.", "int main() means the function returns an integer value to the operating system when it finishes. The OS can use this return value to determine if the program succeeded or failed.", "Variations like void main() exist but are not standard C and may not be supported on all compilers. The standard form int main() or int main(int argc, char* argv[]) should always be preferred."]
                },
                {
                  title: "3. printf() Function",
                  body: ["printf() (print formatted) is used to print formatted output to the console (standard output). It is one of the most frequently used functions in C.", "Syntax: printf(\"text to print\"); or printf(\"format string\", variable1, variable2, ...);", "The text inside the double quotes is called the format string. It is printed exactly as-is, except for special escape sequences and format specifiers.", "Escape Sequences — Special character sequences beginning with a backslash \\\\ that represent control characters: \\\\n is newline (moves cursor to next line), \\\\t is horizontal tab, \\\\\\\\ prints a literal backslash, \\\\\" prints a literal double quote.", "printf() does NOT automatically add a newline at the end — you must explicitly include \\\\n if you want the output to move to the next line."]
                },
                {
                  title: "👶 Super simple version",
                  body: [
                    "printf(\"Hello!\") is just the computer's way of shouting something out loud. The \\n at the end is like pressing Enter on your keyboard — it moves to the next line."
                  ]
                },
                {
                  title: "4. return 0",
                  body: ["return 0; at the end of main() sends the value 0 back to the operating system. By convention, 0 signals that the program terminated successfully without any errors.", "Any non-zero return value (like return 1; or return -1;) signals that the program encountered an error. This is used in scripting and automation to chain programs together — a parent process can check the exit code of a child process.", "Modern compilers often generate implicit return 0; if you forget it in main(), but it is always best practice to write it explicitly for clarity and portability."]
                },
                {
                  title: "5. Curly Braces { }",
                  body: ["All statements inside a function body are enclosed within a pair of curly braces. The opening { marks the start of the function body and the closing } marks its end.", "Curly braces define a 'block' in C. Variables declared inside a block only exist within that block (this is called 'scope'). Everything between the braces is considered one logical unit.", "Proper indentation inside braces (typically 4 spaces or 1 tab) is a critical coding style practice. The compiler ignores whitespace, but consistent indentation makes code readable and maintainable — a skill you'll use throughout your programming career."]
                }
              ],
              pretest:[],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Preprocessor loads stdio library containing printf()", memory: [], output: "" },
                  { line: 3, annotation: "Program execution begins at main() function", memory: [], output: "" },
                  { line: 4, annotation: "printf() sends the string to standard output", memory: [], output: "Hello World\n" },
                  { line: 5, annotation: "Program sends exit code 0 to OS, ending successfully", memory: [], output: "Hello World\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan, B.W. and Ritchie, D.M., 'The C Programming Language', 2nd Edition, Prentice Hall",
                "Balagurusamy, E., 'Programming in ANSI C', 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          },
          {
            id: "c-w1-2",
            title: "Basic Input Output",
            desc: "Write a program that takes two variables (a string name and an integer age) and prints them.",
            expected: "Name: Likhith Age: 20",
            content: {
              aim: {
                text: "In this experiment, the student will learn how to take input from the user using scanf() and display it back using printf(). The student will understand format specifiers, variable declaration, and the relationship between input and output in C.",
                bullets: [
                  "Declare variables of type char array and int",
                  "Use scanf() to read a string and integer from the user",
                  "Use printf() with format specifiers %s and %d to display them",
                  "Understand the use of & (address-of operator) in scanf()"
                ]
              },
              theory: [
                {
                  title: "📬 Think of it like a mailbox!",
                  body: [
                    "When the computer wants to receive something from you (like your name), it opens a mailbox called scanf(). The & symbol is like writing the address on the mailbox so the letter (your input) lands in the right place. Without the address, the letter gets lost!",
                    "![Mailbox](https://tse1.mm.bing.net/th/id/OIP.NAVswaeh2Npnmt9mxDt4wwHaCp?pid=Api&P=0&h=180)"
                  ]
                },
                {
                  title: "scanf() — Reading Input",
                  body: [
                    "scanf() (scan formatted) reads formatted input from the keyboard (standard input, stdin). It is the input counterpart to printf().",
                    "Syntax: scanf(\"format_specifier\", &variable);",
                    "The & symbol is the 'address-of' operator. It gives scanf() the memory address of the variable so it can directly store the value the user types into that memory location. Without &, scanf() receives the value of the variable, not its location, and cannot write to it (this is undefined behavior and often causes crashes).",
                    "scanf() reads input until it encounters whitespace (space, tab, newline). For reading strings with spaces, special functions like fgets() are needed.",
                    "Common Pitfall: Always check that the number of format specifiers matches the number of address-of arguments. A mismatch leads to undefined behavior."
                  ]
                },
                {
                  title: "printf() with Format Specifiers",
                  body: [
                    "Format specifiers are placeholders in the format string that tell printf() how to display a variable's value. They always start with % and are followed by a letter indicating the data type.",
                    "Common Format Specifiers: %d for int (decimal integer), %f for float, %lf for double, %c for char, %s for char array (string).",
                    "Example: printf(\"Name: %s Age: %d\", name, age); → Replaces %s with the value of name and %d with the value of age, in the order they appear in the argument list.",
                    "Precision Modifier: %.2f displays a float with exactly 2 decimal places. The number between . and f specifies precision.",
                    "Width Modifier: %10d prints an integer in a field of width 10, right-aligned. These are useful for creating aligned table output."
                  ]
                },
                {
                  title: "char array for strings",
                  body: [
                    "C does not have a built-in string data type like Python or Java. Strings in C are stored as arrays of characters (char arrays), terminated by a special null character '\\0' (ASCII value 0).",
                    "Declaration: char name[50]; → declares a character array that can hold up to 49 printable characters plus the null terminator at position [49].",
                    "The null terminator is crucial — string functions like printf() with %s and strlen() use it to know where the string ends. If it's missing, these functions may read garbage memory.",
                    "Why no & for char arrays in scanf? — The array name (like name) in C is treated as a pointer to its first element (equivalent to &name[0]). Therefore, you don't need to prefix it with &. However, for individual characters or simple variables, & is required.",
                    "Declaring an array too small (e.g., char name[5] for a long name) causes a buffer overflow — one of the most dangerous security vulnerabilities in C programming."
                  ]
                },
                {
                  title: "🍱 A string is like a lunchbox with compartments!",
                  body: [
                    "char name[50] is a lunchbox with 50 little compartments. Each compartment holds one letter. The last compartment always holds a special invisible marker '\\0' that says \"this is the end!\" If you forget that marker, the computer keeps looking for more letters — even into other people's lunchboxes!"
                  ]
                }
              ],
              pretest: [],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    char name[50];\n    int age;\n    scanf(\"%s %d\", name, &age);\n    printf(\"Name: %s Age: %d\\n\", name, age);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Preprocessor loads stdio library", memory: [], output: "" },
                  { line: 3, annotation: "Program execution begins at main()", memory: [], output: "" },
                  { line: 4, annotation: "Memory allocated for char array 'name'", memory: [{ variable: "name", type: "char[50]", value: "garbage" }], output: "" },
                  { line: 5, annotation: "Memory allocated for integer 'age'", memory: [{ variable: "name", type: "char[50]", value: "garbage" }, { variable: "age", type: "int", value: "garbage" }], output: "" },
                  { line: 6, annotation: "scanf() reads 'Likhith 20' from standard input", memory: [{ variable: "name", type: "char[50]", value: "\"Likhith\"" }, { variable: "age", type: "int", value: "20" }], output: "" },
                  { line: 7, annotation: "printf() sends formatted string to standard output", memory: [{ variable: "name", type: "char[50]", value: "\"Likhith\"" }, { variable: "age", type: "int", value: "20" }], output: "Name: Likhith Age: 20\n" },
                  { line: 8, annotation: "Program ends successfully", memory: [{ variable: "name", type: "char[50]", value: "\"Likhith\"" }, { variable: "age", type: "int", value: "20" }], output: "Name: Likhith Age: 20\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan, B.W. and Ritchie, D.M., 'The C Programming Language', 2nd Edition, Prentice Hall",
                "Balagurusamy, E., 'Programming in ANSI C', 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
        ],
      },
      {
        title: "WEEK 2",
        objective: "Converting algorithms/flowcharts into C source code",
        tutorial: "Tutorial 2: Algorithms and Flowcharts",
        labTitle: "Lab 2: Basic Algorithms",
        experiments: [
          {
            id: "c-w2-1",
            title: "Sum & Average",
            desc: "Compute the sum and average of two integers.",
            expected: "Sum: 14 Average: 7.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept two integers from the user, compute their sum and average, and display the results. The student will:",
                bullets: [
                  "Declare and use multiple int and float variables",
                  "Perform arithmetic operations (addition, division)",
                  "Understand integer vs. float division and type casting",
                  "Use printf() with %d and %.2f format specifiers"
                ]
              },
              theory: [
                {
                  title: "➕ Story time!",
                  body: [
                    "Imagine you and your friend both have some candies. You want to know how many you have together (that's the sum!) and how many each of you would get if you shared equally (that's the average!).",
                    "sum = a + b → Put all candies together in one pile",
                    "average = sum / 2 → Split the pile evenly"
                  ]
                },
                {
                  title: "Arithmetic in C",
                  body: ["C supports +, -, *, / and % (modulus). When both operands are integers, division truncates: 7 / 2 = 3, not 3.5.", "To obtain a decimal result, cast one operand to float: (float)a / b."]
                },
                {
                  title: "⚠️ Watch out for this sneaky bug!",
                  body: [
                    "In C, 5 / 2 gives you 2, NOT 2.5. Why? Because the computer thinks you only want a whole number! It's like cutting a pizza into 2 and ignoring the leftover crumbs. To keep the decimal part, write (float)5 / 2 — that tells the computer \"I want the crumbs too!\"",
                    "![Pizza being split](https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400)"
                  ]
                },
                {
                  title: "Sum",
                  body: ["sum = a + b; stores the result in a new variable. Both a and b must be declared before use."]
                },
                {
                  title: "Average",
                  body: ["average = (float)sum / 2; The cast ensures float division. Alternatively declare average as float and divide directly."]
                },
                {
                  title: "%.2f",
                  body: ["%.2f prints a float with exactly 2 decimal places. Useful for displaying averages cleanly."]
                }
              ],
              pretest:[],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab below and step through the program trace.",
                "Observe how variables appear in memory and how integer vs. float division differ.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter two integers separated by a space — e.g. 10 4.",
                "Click Run Code. Verify output: Sum: 14 Average: 7.00",
                "Try different inputs (odd numbers to test rounding). Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int a, b, sum;\n    float avg;\n    scanf(\"%d %d\", &a, &b);\n    sum = a + b;\n    avg = (float)sum / 2;\n    printf(\"Sum: %d Average: %.2f\\n\", sum, avg);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library for I/O functions", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for integers a, b, sum", memory: [{variable: "a", type: "int", value: "?"}, {variable: "b", type: "int", value: "?"}, {variable: "sum", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "Allocate memory for float avg", memory: [{variable: "a", type: "int", value: "?"}, {variable: "b", type: "int", value: "?"}, {variable: "sum", type: "int", value: "?"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf() reads '10 4' from user", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "4"}, {variable: "sum", type: "int", value: "?"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 7, annotation: "Compute sum = a + b", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "4"}, {variable: "sum", type: "int", value: "14"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 8, annotation: "Compute avg using float casting", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "4"}, {variable: "sum", type: "int", value: "14"}, {variable: "avg", type: "float", value: "7.00"}], output: "" },
                  { line: 9, annotation: "printf() displays the result", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "4"}, {variable: "sum", type: "int", value: "14"}, {variable: "avg", type: "float", value: "7.00"}], output: "Sum: 14 Average: 7.00\n" },
                  { line: 10, annotation: "Program terminates successfully", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "4"}, {variable: "sum", type: "int", value: "14"}, {variable: "avg", type: "float", value: "7.00"}], output: "Sum: 14 Average: 7.00\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w2-2",
            title: "Fahrenheit to Celsius",
            desc: "Convert temperature from Fahrenheit to Celsius.",
            expected: "Celsius: 37.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a temperature in Fahrenheit from the user, convert it to Celsius using the standard formula, and display the result. The student will:",
                bullets: [
                  "Declare and use float variables for temperature values",
                  "Apply the conversion formula: C = (F - 32) * 5 / 9",
                  "Understand operator precedence and parenthesisation in C",
                  "Use printf() with %.2f to display the result to 2 decimal places"
                ]
              },
              theory: [
                {
                  title: "🌡️ Two countries, two thermometers!",
                  body: [
                    "In the USA, people say \"It's 98°F today!\" In India, we say \"It's 37°C today!\" They're talking about the exact same temperature — just in different languages! This program is a translator between those two languages.",
                    "![A thermometer closeup](https://media.whas11.com/assets/WHAS/images/59bf16b5-29d2-49f8-90ce-c7dad13475d5/59bf16b5-29d2-49f8-90ce-c7dad13475d5_1140x641.webp)"
                  ]
                },
                {
                  title: "Temperature Conversion Formula",
                  body: ["The relationship between Fahrenheit and Celsius is:", "C = (F - 32) * 5 / 9", "This formula subtracts 32 from the Fahrenheit value, then multiplies by 5 and divides by 9."]
                },
                {
                  title: "🧮 Why the parentheses matter:",
                  body: [
                    "C is like a strict math teacher — it always does × and ÷ before + and −. So if you write F - 32 * 5 / 9, the computer first does 32 × 5 = 160, then 160 ÷ 9 = 17.7, and then subtracts that from F — which is completely wrong! Parentheses ( ) are your way of telling the computer: \"Do THIS part first!\""
                  ]
                },
                {
                  title: "Operator Precedence",
                  body: ["In C, multiplication and division have higher precedence than subtraction.", "Without parentheses, F - 32 * 5 / 9 would be evaluated incorrectly. Always use parentheses: (F - 32) * 5 / 9."]
                },
                {
                  title: "Float Variables",
                  body: ["Declare both fahrenheit and celsius as float to avoid integer truncation.", "If declared as int, values like 98.6°F would lose their decimal part."]
                },
                {
                  title: "%.2f",
                  body: ["%.2f prints a floating-point result rounded to 2 decimal places, giving clean output like 37.00."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how the formula is applied and how float variables hold decimal values.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a Fahrenheit temperature — e.g. 98.6",
                "Click Run Code. Verify output: Celsius: 37.00",
                "Try inputs like 32 (freezing) and 212 (boiling) to verify. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    float f, c;\n    scanf(\"%f\", &f);\n    c = (f - 32) * 5 / 9;\n    printf(\"Celsius: %.2f\\n\", c);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for floats f, c", memory: [{variable: "f", type: "float", value: "?"}, {variable: "c", type: "float", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads 98.6 from user", memory: [{variable: "f", type: "float", value: "98.6"}, {variable: "c", type: "float", value: "?"}], output: "" },
                  { line: 6, annotation: "Compute conversion formula", memory: [{variable: "f", type: "float", value: "98.6"}, {variable: "c", type: "float", value: "37.00"}], output: "" },
                  { line: 7, annotation: "printf() displays formatted celsius", memory: [{variable: "f", type: "float", value: "98.6"}, {variable: "c", type: "float", value: "37.00"}], output: "Celsius: 37.00\n" },
                  { line: 8, annotation: "Program ends successfully", memory: [{variable: "f", type: "float", value: "98.6"}, {variable: "c", type: "float", value: "37.00"}], output: "Celsius: 37.00\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w2-3",
            title: "Simple Interest",
            desc: "Calculate Simple Interest given P, R, T.",
            expected: "Simple Interest: 100.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept principal, rate of interest, and time from the user, compute the simple interest, and display the result. The student will:",
                bullets: [
                  "Declare and use float variables for financial calculations",
                  "Apply the simple interest formula: SI = (P * R * T) / 100",
                  "Understand the importance of float division in financial computations",
                  "Use printf() with %.2f to display monetary results to 2 decimal places"
                ]
              },
              theory: [
                {
                  title: "🏦 Imagine a piggy bank that grows!",
                  body: [
                    "You put ₹1000 in a bank (that's your Principal P). The bank says \"we'll give you 5% extra every year\" (that's the Rate R). After 3 years (Time T), how much extra money do you earn? That extra money is called Simple Interest!",
                    "Formula: SI = (P × R × T) / 100",
                    "Example: P=1000, R=5, T=3 → SI = (1000×5×3)/100 = ₹150 earned!",
                    "![Piggy bank with coins](https://tse4.mm.bing.net/th/id/OIP.z19VFAmAL1ioO2-V-UUmIgHaDL?pid=Api&P=0&h=180)"
                  ]
                },
                {
                  title: "Simple Interest Formula",
                  body: ["Simple interest is calculated as:", "SI = (P * R * T) / 100", "Where: P = Principal amount, R = Rate of interest per annum, T = Time period"]
                },
                {
                  title: "Why Float?",
                  body: ["Financial values often involve decimals. Declaring P, R, T, and SI as float ensures that fractional values are preserved.", "If all variables were int, a rate like 8.5% would be truncated to 8."]
                },
                {
                  title: "Operator Precedence",
                  body: ["Multiplication is performed left to right before division. P * R * T is evaluated first, then divided by 100.", "No special parenthesisation is needed beyond the outer grouping."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how P, R, and T are read and how SI is computed step by step.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter three values: principal, rate, time — e.g. 1000 5 2",
                "Click Run Code. Verify output: Simple Interest: 100.00",
                "Try inputs with decimal rate like 1000 8.5 3 to test float handling. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    float p, r, t, si;\n    scanf(\"%f %f %f\", &p, &r, &t);\n    si = (p * r * t) / 100;\n    printf(\"Simple Interest: %.2f\\n\", si);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for floats p, r, t, si", memory: [{variable: "p", type: "float", value: "?"}, {variable: "r", type: "float", value: "?"}, {variable: "t", type: "float", value: "?"}, {variable: "si", type: "float", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '1000 5 2' from user", memory: [{variable: "p", type: "float", value: "1000"}, {variable: "r", type: "float", value: "5"}, {variable: "t", type: "float", value: "2"}, {variable: "si", type: "float", value: "?"}], output: "" },
                  { line: 6, annotation: "Compute SI formula", memory: [{variable: "p", type: "float", value: "1000"}, {variable: "r", type: "float", value: "5"}, {variable: "t", type: "float", value: "2"}, {variable: "si", type: "float", value: "100.00"}], output: "" },
                  { line: 7, annotation: "printf() displays formatted result", memory: [{variable: "p", type: "float", value: "1000"}, {variable: "r", type: "float", value: "5"}, {variable: "t", type: "float", value: "2"}, {variable: "si", type: "float", value: "100.00"}], output: "Simple Interest: 100.00\n" },
                  { line: 8, annotation: "Program ends successfully", memory: [{variable: "p", type: "float", value: "1000"}, {variable: "r", type: "float", value: "5"}, {variable: "t", type: "float", value: "2"}, {variable: "si", type: "float", value: "100.00"}], output: "Simple Interest: 100.00\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 3",
        objective: "Variables, data types, arithmetic operators",
        tutorial: "Tutorial 3: Variables and Arithmetic",
        labTitle: "Lab 3: Computational problems",
        experiments: [
          {
            id: "c-w3-1",
            title: "Square Root",
            desc: "Find square root of a given number using math.h.",
            expected: "Square Root: 5.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a non-negative number from the user and compute its square root using the sqrt() function from the math library. The student will:",
                bullets: [
                  "Declare and use float/double variables",
                  "Include and use the math.h library",
                  "Apply the sqrt() function",
                  "Use printf() with %.2f to display the result",
                  "Understand the importance of linking the math library with -lm during compilation"
                ]
              },
              theory: [
                {
                  title: "🌳 The \"un-squaring\" machine!",
                  body: [
                    "If you know that 5 × 5 = 25, then the square root of 25 is 5. It's like having a magic machine — you put in 25, and it gives you back the number that was multiplied by itself to make 25.",
                    "In C, this magic machine is called sqrt() and it lives in a toolbox called math.h.",
                    "![A calculator](https://media.geeksforgeeks.org/wp-content/uploads/20231231153207/Square-Root-Symbol.webp)"
                  ]
                },
                {
                  title: "Square Root",
                  body: ["The square root of a number n is a value x such that x * x = n.", "For example, sqrt(25) = 5.0 and sqrt(2) = 1.414..."]
                },
                {
                  title: "math.h Library",
                  body: ["C does not include mathematical functions by default. The header #include <math.h> must be included at the top of the program to access functions like sqrt(), pow(), fabs(), ceil(), floor(), etc."]
                },
                {
                  title: "sqrt() Function",
                  body: ["Syntax: double sqrt(double x);", "It accepts a double argument and returns the square root as a double. Passing a negative number results in a NaN (Not a Number) output; no crash occurs but the result is invalid."]
                },
                {
                  title: "Compilation and Types",
                  body: ["When using math.h functions, compile with: gcc program.c -o program -lm", "The -lm flag links the math library explicitly. Without it, a linker error occurs on some systems.", "sqrt() returns a double. If your variable is float, an implicit conversion occurs. It is safest to declare the variable as double when using math.h functions."]
                },
                {
                  title: "🛠️ What is -lm?",
                  body: [
                    "When you use math.h, you need to also tell the compiler: \"Hey, I'm borrowing the math toolbox!\" The -lm flag is that permission slip. Without it, the compiler says \"I don't know what sqrt() is!\" and refuses to build your program."
                  ]
                }
              ],
              pretest:[],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how the math.h library is included and how sqrt() is called.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a non-negative number — e.g. 25",
                "Click Run Code. Verify output: Square Root: 5.00",
                "Try inputs like 2 and 0 to observe decimal and zero results. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double n, root;\n    scanf(\"%lf\", &n);\n    root = sqrt(n);\n    printf(\"Square Root: %.2f\\n\", root);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library for I/O", memory: [], output: "" },
                  { line: 2, annotation: "Load math library for sqrt()", memory: [], output: "" },
                  { line: 5, annotation: "Allocate memory for doubles n, root", memory: [{variable: "n", type: "double", value: "?"}, {variable: "root", type: "double", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf() reads '25' from user", memory: [{variable: "n", type: "double", value: "25.00"}, {variable: "root", type: "double", value: "?"}], output: "" },
                  { line: 7, annotation: "Compute square root", memory: [{variable: "n", type: "double", value: "25.00"}, {variable: "root", type: "double", value: "5.00"}], output: "" },
                  { line: 8, annotation: "printf() displays result", memory: [{variable: "n", type: "double", value: "25.00"}, {variable: "root", type: "double", value: "5.00"}], output: "Square Root: 5.00\n" },
                  { line: 9, annotation: "Program terminates successfully", memory: [{variable: "n", type: "double", value: "25.00"}, {variable: "root", type: "double", value: "5.00"}], output: "Square Root: 5.00\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w3-2",
            title: "Compound Interest",
            desc: "Calculate Compound Interest given P, R, T.",
            expected: "Compound Interest: 210.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept principal, rate of interest, and number of years from the user, compute the compound interest, and display the result. The student will:",
                bullets: [
                  "Declare and use float/double variables",
                  "Apply the compound interest formula: CI = P * pow(1 + R/100, T) - P",
                  "Use the pow() function from math.h",
                  "Use printf() with %.2f to display the result to 2 decimal places",
                  "Distinguish between simple interest and compound interest computations"
                ]
              },
              theory: [
                {
                  title: "🌱 Interest on interest — like a snowball rolling downhill!",
                  body: [
                    "Simple interest always earns the same fixed amount every year. But compound interest earns interest on your ORIGINAL money AND on the interest you've already collected. So your money grows faster and faster — like a snowball picking up more snow as it rolls!",
                    "![Snowball rolling downhill](https://sqy7rm.media.zestyio.com/Compound-Interest-Formula-Desktop.webp)"
                  ]
                },
                {
                  title: "Compound Interest Formula",
                  body: ["Unlike simple interest, compound interest calculates interest on both the principal and the previously accumulated interest:", "A = P * pow(1 + R/100, T)", "CI = A - P", "Where: P = Principal, R = Annual rate, T = Time, A = Amount"]
                },
                {
                  title: "pow() Function",
                  body: ["Syntax: double pow(double base, double exp);", "Returns base raised to the power exp. Requires #include <math.h> and -lm at compilation."]
                },
                {
                  title: "🔢 Why not just multiply manually?",
                  body: [
                    "What if T = 10 years? Would you write × 1.05 × 1.05 × 1.05 × 1.05 × 1.05 ... ten times? That's messy! pow(1.05, 10) does all that multiplication for you in one clean step. pow(base, exponent) means \"multiply base by itself exponent times.\""
                  ]
                },
                {
                  title: "Why Not Use Simple Multiplication?",
                  body: ["Compound interest involves raising a value to a power (exponentiation), which cannot be done cleanly with * alone for arbitrary T.", "pow() handles this for any real value of T, including fractional years."]
                },
                {
                  title: "Float vs Double",
                  body: ["For financial calculations with many decimal places, double is more precise than float. Always prefer double when using pow() and similar functions."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how pow() is called and how CI is derived from Amount minus Principal.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter principal, rate, time — e.g. 1000 10 2",
                "Click Run Code. Verify output: Compound Interest: 210.00",
                "Try fractional rates like 1000 8.5 3 and compare with simple interest. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double p, r, t, a, ci;\n    scanf(\"%lf %lf %lf\", &p, &r, &t);\n    a = p * pow(1 + r/100, t);\n    ci = a - p;\n    printf(\"Compound Interest: %.2f\\n\", ci);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and math libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate memory for variables", memory: [{variable: "p", type: "double", value: "?"}, {variable: "r", type: "double", value: "?"}, {variable: "t", type: "double", value: "?"}, {variable: "a", type: "double", value: "?"}, {variable: "ci", type: "double", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf() reads '1000 10 2'", memory: [{variable: "p", type: "double", value: "1000"}, {variable: "r", type: "double", value: "10"}, {variable: "t", type: "double", value: "2"}, {variable: "a", type: "double", value: "?"}, {variable: "ci", type: "double", value: "?"}], output: "" },
                  { line: 7, annotation: "Compute Amount using pow()", memory: [{variable: "p", type: "double", value: "1000"}, {variable: "r", type: "double", value: "10"}, {variable: "t", type: "double", value: "2"}, {variable: "a", type: "double", value: "1210.00"}, {variable: "ci", type: "double", value: "?"}], output: "" },
                  { line: 8, annotation: "Compute Compound Interest", memory: [{variable: "p", type: "double", value: "1000"}, {variable: "r", type: "double", value: "10"}, {variable: "t", type: "double", value: "2"}, {variable: "a", type: "double", value: "1210.00"}, {variable: "ci", type: "double", value: "210.00"}], output: "" },
                  { line: 9, annotation: "printf() displays result", memory: [{variable: "p", type: "double", value: "1000"}, {variable: "r", type: "double", value: "10"}, {variable: "t", type: "double", value: "2"}, {variable: "a", type: "double", value: "1210.00"}, {variable: "ci", type: "double", value: "210.00"}], output: "Compound Interest: 210.00\n" },
                  { line: 10, annotation: "Program terminates successfully", memory: [{variable: "p", type: "double", value: "1000"}, {variable: "r", type: "double", value: "10"}, {variable: "t", type: "double", value: "2"}, {variable: "a", type: "double", value: "1210.00"}, {variable: "ci", type: "double", value: "210.00"}], output: "Compound Interest: 210.00\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w3-3",
            title: "Heron's Formula",
            desc: "Calculate the area of a triangle using sides a, b, c.",
            expected: "Area: 6.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept the three sides of a triangle from the user and compute its area using Heron's Formula. The student will:",
                bullets: [
                  "Declare and use float/double variables for side lengths and area",
                  "Compute the semi-perimeter of a triangle",
                  "Apply Heron's Formula using sqrt() from math.h",
                  "Validate that the three sides form a valid triangle",
                  "Use printf() with %.2f to display the computed area"
                ]
              },
              theory: [
                {
                  title: "📐 Finding area without a ruler for height!",
                  body: [
                    "Usually to find a triangle's area you need ½ × base × height. But what if you only know the lengths of all three sides and can't measure the height? Heron of Alexandria figured out a clever formula about 2000 years ago that lets you do exactly that!",
                    "It's like being a detective — you use the clues you have (the three sides) to figure out something you can't directly measure (the area).",
                    "![A triangle drawn on paper](https://androidcure.com/wp-content/uploads/2021/06/Heron-Formula.webp)"
                  ]
                },
                {
                  title: "Heron's Formula",
                  body: ["Given a triangle with sides a, b, and c, its area can be computed without knowing any angle:", "s = (a + b + c) / 2 (semi-perimeter)", "Area = sqrt(s * (s-a) * (s-b) * (s-c))", "This formula works for any triangle as long as the sides satisfy the triangle inequality."]
                },
                {
                  title: "Triangle Inequality",
                  body: ["For three sides to form a valid triangle, the sum of any two sides must be greater than the third side:", "a + b > c, b + c > a, a + c > b", "If this condition is not met, the expression inside sqrt() becomes negative or zero, yielding NaN or 0 as the area."]
                },
                {
                  title: "✅ The triangle test:",
                  body: [
                    "Can you make a triangle with sides 3, 4, and 10? Try it with sticks! The 10cm stick is too long — the other two (3+4=7) can't even reach each other to close the triangle. So the rule is: any two sides added together must be longer than the third side. If this fails, there's no triangle — and your code should handle that!"
                  ]
                },
                {
                  title: "Semi-perimeter",
                  body: ["s is half the perimeter. It simplifies the formula and is a required intermediate value. Always compute s before computing the area."]
                },
                {
                  title: "sqrt() and math.h",
                  body: ["Heron's Formula requires a square root. Include math.h and compile with -lm."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how s is computed first and how each factor (s-a), (s-b), (s-c) is evaluated.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter three side lengths — e.g. 3 4 5",
                "Click Run Code. Verify output: Area: 6.00",
                "Try an equilateral triangle like 5 5 5 and an invalid input like 1 2 10. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double a, b, c, s, area;\n    scanf(\"%lf %lf %lf\", &a, &b, &c);\n    s = (a + b + c) / 2;\n    area = sqrt(s * (s-a) * (s-b) * (s-c));\n    printf(\"Area: %.2f\\n\", area);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and math libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate memory for variables", memory: [{variable: "a", type: "double", value: "?"}, {variable: "b", type: "double", value: "?"}, {variable: "c", type: "double", value: "?"}, {variable: "s", type: "double", value: "?"}, {variable: "area", type: "double", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf() reads '3 4 5' from user", memory: [{variable: "a", type: "double", value: "3.00"}, {variable: "b", type: "double", value: "4.00"}, {variable: "c", type: "double", value: "5.00"}, {variable: "s", type: "double", value: "?"}, {variable: "area", type: "double", value: "?"}], output: "" },
                  { line: 7, annotation: "Compute semi-perimeter s", memory: [{variable: "a", type: "double", value: "3.00"}, {variable: "b", type: "double", value: "4.00"}, {variable: "c", type: "double", value: "5.00"}, {variable: "s", type: "double", value: "6.00"}, {variable: "area", type: "double", value: "?"}], output: "" },
                  { line: 8, annotation: "Compute Area using Heron's formula", memory: [{variable: "a", type: "double", value: "3.00"}, {variable: "b", type: "double", value: "4.00"}, {variable: "c", type: "double", value: "5.00"}, {variable: "s", type: "double", value: "6.00"}, {variable: "area", type: "double", value: "6.00"}], output: "" },
                  { line: 9, annotation: "printf() displays area", memory: [{variable: "a", type: "double", value: "3.00"}, {variable: "b", type: "double", value: "4.00"}, {variable: "c", type: "double", value: "5.00"}, {variable: "s", type: "double", value: "6.00"}, {variable: "area", type: "double", value: "6.00"}], output: "Area: 6.00\n" },
                  { line: 10, annotation: "Program terminates successfully", memory: [{variable: "a", type: "double", value: "3.00"}, {variable: "b", type: "double", value: "4.00"}, {variable: "c", type: "double", value: "5.00"}, {variable: "s", type: "double", value: "6.00"}, {variable: "area", type: "double", value: "6.00"}], output: "Area: 6.00\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w3-4",
            title: "Distance Traveled",
            desc: "Calculate distance using s = ut + 0.5*a*t^2.",
            expected: "Distance: 20.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept initial velocity, acceleration, and time from the user, compute the distance traveled using the equation of motion, and display the result. The student will:",
                bullets: [
                  "Declare and use float variables for physical quantities",
                  "Apply the kinematic equation: s = ut + (1/2) * a * t * t",
                  "Understand why (1/2) must be written as 0.5 or (float)1/2 to avoid integer truncation",
                  "Use printf() with %.2f to display the distance to 2 decimal places"
                ]
              },
              theory: [
                {
                  title: "🚀 Launching a rocket in code!",
                  body: [
                    "Imagine a car starts from rest (initial velocity = 0) and speeds up at 2 m/s every second (acceleration = 2 m/s²). After 5 seconds, how far has it gone? This formula from physics tells you exactly that! It's the same formula scientists use to calculate how far a rocket travels after launch.",
                    "s = u×t + ½×a×t²",
                    "u = starting speed, a = how fast it's speeding up, t = how many seconds passed",
                    "![A rocket launching](https://forums.flightsimulator.com/uploads/default/original/4X/b/6/3/b63f37de919e547414b9a4bc348618c5730d2b8e.webp)"
                  ]
                },
                {
                  title: "Equation of Motion",
                  body: ["The distance traveled by an object under uniform acceleration is:", "s = u*t + 0.5 * a * t * t", "Where: s = Distance (m), u = Initial velocity (m/s), a = Acceleration (m/s²), t = Time (s)", "This is the second equation of motion from classical kinematics."]
                },
                {
                  title: "Integer Division Pitfall",
                  body: ["Writing 1/2 in C evaluates to 0 because both operands are integer literals, truncating the result.", "Always write 0.5 or (float)1/2 to preserve the half factor."]
                },
                {
                  title: "⚠️ The sneaky 1/2 bug again!",
                  body: [
                    "Writing 1/2 in C gives 0 — not 0.5! Always write 0.5 directly in physics formulas. It's one of the most common beginner mistakes that causes completely wrong answers. The computer isn't wrong — it's just doing integer math because you gave it two whole numbers!"
                  ]
                },
                {
                  title: "Squaring t",
                  body: ["C has no ** operator. To compute t squared, write t * t or use pow(t, 2).", "For simple squaring, t * t is preferred as it avoids the overhead of calling pow()."]
                },
                {
                  title: "Units",
                  body: ["Ensure consistent units. If u is in m/s and a is in m/s², then t must be in seconds and s will be in metres."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the program trace.",
                "Observe how each term u*t and 0.5*a*t*t is computed and summed.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter initial velocity, acceleration, time — e.g. 0 10 2",
                "Click Run Code. Verify output: Distance: 20.00",
                "Try u = 5, a = 2, t = 3 and manually verify. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    float u, a, t, s;\n    scanf(\"%f %f %f\", &u, &a, &t);\n    s = u * t + 0.5 * a * t * t;\n    printf(\"Distance: %.2f\\n\", s);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for floats", memory: [{variable: "u", type: "float", value: "?"}, {variable: "a", type: "float", value: "?"}, {variable: "t", type: "float", value: "?"}, {variable: "s", type: "float", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '0 10 2'", memory: [{variable: "u", type: "float", value: "0.00"}, {variable: "a", type: "float", value: "10.00"}, {variable: "t", type: "float", value: "2.00"}, {variable: "s", type: "float", value: "?"}], output: "" },
                  { line: 6, annotation: "Compute Distance s", memory: [{variable: "u", type: "float", value: "0.00"}, {variable: "a", type: "float", value: "10.00"}, {variable: "t", type: "float", value: "2.00"}, {variable: "s", type: "float", value: "20.00"}], output: "" },
                  { line: 7, annotation: "printf() displays distance", memory: [{variable: "u", type: "float", value: "0.00"}, {variable: "a", type: "float", value: "10.00"}, {variable: "t", type: "float", value: "2.00"}, {variable: "s", type: "float", value: "20.00"}], output: "Distance: 20.00\n" },
                  { line: 8, annotation: "Program terminates", memory: [{variable: "u", type: "float", value: "0.00"}, {variable: "a", type: "float", value: "10.00"}, {variable: "t", type: "float", value: "2.00"}, {variable: "s", type: "float", value: "20.00"}], output: "Distance: 20.00\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 4",
        objective: "Expressions, operator precedence and associativity",
        tutorial: "Tutorial 4: Operators and Precedence",
        labTitle: "Lab 4: Expressions and Operators",
        experiments: [
          {
            id: "c-w4-1",
            title: "Expression Evaluation",
            desc: "Evaluate the expression A+B*C+(D*E)+F*G.",
            expected: "2 + 3 * 4 = 14",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to evaluate a complex arithmetic expression involving multiple operators and demonstrate the effect of operator precedence and associativity on the result. The student will:",
                bullets: [
                  "Understand operator precedence levels in C (*, /, % before +, -)",
                  "Understand left-to-right associativity for arithmetic operators",
                  "Use parentheses to control evaluation order",
                  "Declare and use int and float variables to observe truncation vs precision",
                  "Print intermediate and final results using printf()"
                ]
              },
              theory: [
                {
                  title: "🎯 Math has a queue, just like a canteen!",
                  body: [
                    "In a school canteen, students with lunch boxes go first, then others. In C math, × and ÷ always go before + and −. This ordering is called operator precedence — it's the queue system of mathematics!",
                    "So 2 + 3 × 4 = 2 + 12 = 14 (NOT 5 × 4 = 20)",
                    "Use ( ) parentheses whenever you want something to go first in the queue!",
                    "![Queue / lineup of people](https://image2.slideserve.com/4538776/expression-evaluation-l.webp)"
                  ]
                },
                {
                  title: "Operator Precedence",
                  body: ["When an expression contains multiple operators, C evaluates higher-precedence operators first. The standard precedence order for arithmetic:", "Level 1 (highest): *, /, %", "Level 2: +, -", "Level 3 (lowest): = (assignment)", "Example: 2 + 3 * 4 evaluates as 2 + (3 * 4) = 2 + 12 = 14, not 20."]
                },
                {
                  title: "Associativity",
                  body: ["When two operators have equal precedence, associativity determines evaluation order. All basic arithmetic operators are left-to-right associative:", "10 - 3 - 2 evaluates as (10 - 3) - 2 = 5, not 10 - (3 - 2) = 9."]
                },
                {
                  title: "↔️ Left to right — like reading a book!",
                  body: [
                    "When operators have the same precedence (like − and −), C reads them left to right, just like you read a sentence. So 10 - 3 - 2 becomes (10-3) - 2 = 5, not 10 - (3-2) = 9. Always read left to right when in doubt!"
                  ]
                },
                {
                  title: "Parentheses",
                  body: ["Parentheses override all precedence rules and force a sub-expression to be evaluated first:", "(2 + 3) * 4 = 20"]
                },
                {
                  title: "Modulus and Types",
                  body: ["Integer vs Float Division — 7 / 2 = 3 (integer truncation). 7.0 / 2 = 3.5 (float).", "Modulus Operator — % gives the remainder of integer division. 17 % 5 = 2 because 17 = 5*3 + 2. % is only valid for integer operands in C."]
                },
                {
                  title: "🧮 What is % — the remainder operator?",
                  body: [
                    "17 % 5 means: \"how many are left over after dividing 17 into groups of 5?\"",
                    "17 ÷ 5 = 3 groups of 5 (that's 15), with 2 left over.",
                    "So 17 % 5 = 2.",
                    "A super useful trick: number % 2 == 0 checks if a number is even. If the remainder when divided by 2 is zero, the number is even!"
                  ]
                },
                {
                  title: "Increment and Decrement",
                  body: ["++ and -- modify a variable by 1.", "Pre-increment ++x : increments first, then uses value.", "Post-increment x++ : uses value first, then increments."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the expression evaluation trace.",
                "Observe how each sub-expression is evaluated in order of precedence.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "The program evaluates a set of expressions and prints each result.",
                "Click Run Code. Verify each printed result matches the expected value.",
                "Modify the expressions using parentheses and observe how results change. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int res1 = 2 + 3 * 4;\n    int res2 = 10 - 3 - 2;\n    int res3 = 17 % 5;\n    printf(\"2 + 3 * 4 = %d\\n\", res1);\n    printf(\"10 - 3 - 2 = %d\\n\", res2);\n    printf(\"17 %% 5 = %d\\n\", res3);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Evaluate 3 * 4 first, then 2 + 12 = 14", memory: [{variable: "res1", type: "int", value: "14"}], output: "" },
                  { line: 5, annotation: "Left to right: 10 - 3 = 7, then 7 - 2 = 5", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}], output: "" },
                  { line: 6, annotation: "17 % 5 is remainder of 17 / 5, which is 2", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}, {variable: "res3", type: "int", value: "2"}], output: "" },
                  { line: 7, annotation: "Print first result", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}, {variable: "res3", type: "int", value: "2"}], output: "2 + 3 * 4 = 14\n" },
                  { line: 8, annotation: "Print second result", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}, {variable: "res3", type: "int", value: "2"}], output: "2 + 3 * 4 = 14\n10 - 3 - 2 = 5\n" },
                  { line: 9, annotation: "Print third result", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}, {variable: "res3", type: "int", value: "2"}], output: "2 + 3 * 4 = 14\n10 - 3 - 2 = 5\n17 % 5 = 2\n" },
                  { line: 10, annotation: "Program terminates", memory: [{variable: "res1", type: "int", value: "14"}, {variable: "res2", type: "int", value: "5"}, {variable: "res3", type: "int", value: "2"}], output: "2 + 3 * 4 = 14\n10 - 3 - 2 = 5\n17 % 5 = 2\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w4-2",
            title: "Max of Three",
            desc: "Find maximum among three numbers using conditional operator.",
            expected: "Maximum: 25",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept three integers from the user and determine the largest among them using the ternary operator and/or relational operators. The student will:",
                bullets: [
                  "Declare and use int variables",
                  "Apply relational operators (>, <, >=, <=, ==, !=)",
                  "Use the ternary (conditional) operator ?: to select the maximum value",
                  "Understand short-circuit evaluation in logical expressions",
                  "Use printf() to display the result"
                ]
              },
              theory: [
                {
                  title: "Relational Operators",
                  body: ["Used to compare two values and return 1 (true) or 0 (false):", "> greater than, < less than, >= greater than or equal to, <= less than or equal to", "== equal to (note: == not =, which is assignment)", "!= not equal to"]
                },
                {
                  title: "Ternary Operator",
                  body: ["The conditional (ternary) operator is the only C operator that takes three operands.", "Syntax: condition ? expression_if_true : expression_if_false", "Example: max = (a > b) ? a : b;", "If a > b is true, max gets a; otherwise max gets b."]
                },
                {
                  title: "Finding Max of Three",
                  body: ["Chain two ternary operations:", "max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);", "Alternatively, use two sequential comparisons with a temporary variable:", "max = a; if (b > max) max = b; if (c > max) max = c;"]
                },
                {
                  title: "Logical Operators and Precedence",
                  body: ["Logical Operators — && (AND), || (OR), ! (NOT) are used to combine conditions. (a > b && a > c) is true only when a is strictly greater than both b and c.", "Arithmetic operators have higher precedence than relational operators.", "Relational operators have higher precedence than logical operators.", "Ternary has lower precedence than arithmetic and relational but higher than assignment."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the ternary evaluation trace.",
                "Observe how conditions are evaluated and how the ternary operator selects a value.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter three integers — e.g. 10 25 7",
                "Click Run Code. Verify output: Maximum: 25",
                "Try equal values like 5 5 5 and negative values like -3 -1 -7. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int a, b, c, max;\n    scanf(\"%d %d %d\", &a, &b, &c);\n    max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);\n    printf(\"Maximum: %d\\n\", max);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for integers", memory: [{variable: "a", type: "int", value: "?"}, {variable: "b", type: "int", value: "?"}, {variable: "c", type: "int", value: "?"}, {variable: "max", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '10 25 7'", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "25"}, {variable: "c", type: "int", value: "7"}, {variable: "max", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "Evaluate ternary: (10 > 25) is false, so evaluate ((25 > 7) ? 25 : 7) -> 25", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "25"}, {variable: "c", type: "int", value: "7"}, {variable: "max", type: "int", value: "25"}], output: "" },
                  { line: 7, annotation: "printf() displays max", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "25"}, {variable: "c", type: "int", value: "7"}, {variable: "max", type: "int", value: "25"}], output: "Maximum: 25\n" },
                  { line: 8, annotation: "Program terminates", memory: [{variable: "a", type: "int", value: "10"}, {variable: "b", type: "int", value: "25"}, {variable: "c", type: "int", value: "7"}, {variable: "max", type: "int", value: "25"}], output: "Maximum: 25\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w4-3",
            title: "Marks Average",
            desc: "Calculate total and average of 5 subjects.",
            expected: "Total: 425 Average: 85.00 Grade: B",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept marks for multiple subjects from the user, compute the total and average marks, and display the results along with a grade determined using relational and logical operators. The student will:",
                bullets: [
                  "Declare and use int variables for marks and float for average",
                  "Apply compound assignment operators (+=) to accumulate a total",
                  "Use relational and logical operators to determine a grade band",
                  "Use the ternary operator or chained conditions for grade classification",
                  "Use printf() with %d and %.2f format specifiers"
                ]
              },
              theory: [
                {
                  title: "Compound Assignment Operators",
                  body: ["C provides shorthand operators that combine arithmetic with assignment:", "total += marks is equivalent to total = total + marks", "x *= 2 is equivalent to x = x * 2", "These make code concise and reduce repetition."]
                },
                {
                  title: "Average Calculation",
                  body: ["To compute an average:", "average = (float)total / n", "The cast to float ensures decimal precision. If total and n are both int, integer division truncates the result."]
                },
                {
                  title: "Relational and Logical Operators in Grading",
                  body: ["Grade bands are checked using >= and <= with && (AND):", "if (average >= 90 && average <= 100) → Grade A", "if (average >= 75 && average < 90) → Grade B", "if (average >= 60 && average < 75) → Grade C", "if (average >= 40 && average < 60) → Grade D", "if (average < 40) → Grade F"]
                },
                {
                  title: "Precedence and Associativity",
                  body: ["Arithmetic is evaluated first, then relational operators (>, >=, <, <=), then logical operators (&&, ||).", "Parentheses can be used to make complex conditions clearer.", "Both && and || are left-to-right associative. In (a && b && c), a is evaluated first; if a is false, the rest are short-circuited (not evaluated)."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the accumulation and grading trace.",
                "Observe how += builds the total and how the grade condition chain is evaluated.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter marks for 5 subjects — e.g. 85 90 78 92 80",
                "Click Run Code. Verify output shows Total, Average, and Grade correctly.",
                "Try borderline inputs like 40 40 40 40 40 and 39 39 39 39 39. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int m1, m2, m3, m4, m5;\n    int total = 0;\n    float avg;\n    scanf(\"%d %d %d %d %d\", &m1, &m2, &m3, &m4, &m5);\n    total += m1; total += m2; total += m3; total += m4; total += m5;\n    avg = (float)total / 5;\n    printf(\"Total: %d\\nAverage: %.2f\\n\", total, avg);\n    if (avg >= 90) printf(\"Grade: A\\n\");\n    else if (avg >= 75) printf(\"Grade: B\\n\");\n    else if (avg >= 60) printf(\"Grade: C\\n\");\n    else if (avg >= 40) printf(\"Grade: D\\n\");\n    else printf(\"Grade: F\\n\");\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate memory for marks", memory: [{variable: "total", type: "int", value: "0"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 7, annotation: "scanf() reads '85 90 78 92 80'", memory: [{variable: "total", type: "int", value: "0"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 8, annotation: "Accumulate total using +=", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "?"}], output: "" },
                  { line: 9, annotation: "Compute float average", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "85.00"}], output: "" },
                  { line: 10, annotation: "Print total and average", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "85.00"}], output: "Total: 425\nAverage: 85.00\n" },
                  { line: 11, annotation: "Check if avg >= 90 (False)", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "85.00"}], output: "Total: 425\nAverage: 85.00\n" },
                  { line: 12, annotation: "Check if avg >= 75 (True), print Grade: B", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "85.00"}], output: "Total: 425\nAverage: 85.00\nGrade: B\n" },
                  { line: 17, annotation: "Program terminates", memory: [{variable: "total", type: "int", value: "425"}, {variable: "avg", type: "float", value: "85.00"}], output: "Total: 425\nAverage: 85.00\nGrade: B\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 5",
        objective: "if-else, switch-case, nested-if, relational and logical operators",
        tutorial: "Tutorial 5: Branching",
        labTitle: "Lab 5: Conditional statements",
        experiments: [
          {
            id: "c-w5-1",
            title: "Max and Min of Four Numbers",
            desc: "Find the max and min of four numbers using if-else.",
            expected: "Maximum: 45 Minimum: 7",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept four integers from the user and determine the largest and smallest among them using nested if-else statements and relational operators. The student will:",
                bullets: [
                  "Declare and use int variables for four input numbers",
                  "Apply nested if-else to compare multiple values systematically",
                  "Use relational operators (>, <) to drive conditional logic",
                  "Track both maximum and minimum in a single program pass",
                  "Use printf() to display the results clearly"
                ]
              },
              theory: [
                {
                  title: "🏆 The sports tournament analogy!",
                  body: [
                    "Imagine 4 students running a race. How do you find the fastest? Simple — you watch who crosses the finish line first! In code, we do the same thing: start by assuming the first person is the fastest, then check each remaining person. If someone is faster, they become the new \"champion.\" Keep going until you've checked everyone — the last champion is your winner (maximum)!",
                    "Finding the minimum is the same game, but you're looking for the slowest instead.",
                    "![Kids racing on a track](https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400)"
                  ]
                },
                {
                  title: "Nested if-else",
                  body: ["An if-else construct placed inside another if or else block is called a nested if-else. It allows multi-way decisions based on a sequence of conditions.", "if (condition1) {\n    if (condition2) { ... }\n    else { ... }\n} else { ... }"]
                },
                {
                  title: "🪆 Nested if-else = boxes inside boxes!",
                  body: [
                    "Think of Russian nesting dolls (Matryoshka). The outer doll checks one condition. If you open it, there's another doll inside checking another condition. That's exactly what nested if-else does — decisions inside decisions. The computer opens each layer one by one until it finds the answer!",
                    "![Russian nesting dolls](https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400)"
                  ]
                },
                {
                  title: "Finding Maximum and Minimum",
                  body: ["Assume the first variable is the maximum, then compare it against each remaining variable, updating the maximum whenever a larger value is found:", "max = a; if (b > max) max = b; if (c > max) max = c; if (d > max) max = d;", "Same strategy in reverse for minimum:", "min = a; if (b < min) min = b; if (c < min) min = c; if (d < min) min = d;"]
                },
                {
                  title: "Relational and Logical Operators",
                  body: ["> greater than, < less than, >= greater or equal, <= less or equal, == equality check, != not equal.", "Logical AND (&&) can combine conditions to check max in one step: if (a >= b && a >= c && a >= d) max = a;"]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the comparison trace.",
                "Observe how max and min are updated as each number is compared.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter four integers — e.g. 12 45 7 30",
                "Click Run Code. Verify output: Maximum: 45  Minimum: 7",
                "Try all equal values like 5 5 5 5 and negative values like -3 -8 -1 -5. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int a, b, c, d, max, min;\n    scanf(\"%d %d %d %d\", &a, &b, &c, &d);\n    max = a; min = a;\n    if (b > max) max = b;\n    if (c > max) max = c;\n    if (d > max) max = d;\n    if (b < min) min = b;\n    if (c < min) min = c;\n    if (d < min) min = d;\n    printf(\"Maximum: %d\\nMinimum: %d\\n\", max, min);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "a", type: "int", value: "?"}, {variable: "b", type: "int", value: "?"}, {variable: "c", type: "int", value: "?"}, {variable: "d", type: "int", value: "?"}, {variable: "max", type: "int", value: "?"}, {variable: "min", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '12 45 7 30'", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "?"}, {variable: "min", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "Assume first is max and min", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "12"}, {variable: "min", type: "int", value: "12"}], output: "" },
                  { line: 7, annotation: "45 > 12 is true, update max to 45", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "12"}], output: "" },
                  { line: 8, annotation: "7 > 45 is false, max stays 45", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "12"}], output: "" },
                  { line: 9, annotation: "30 > 45 is false, max stays 45", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "12"}], output: "" },
                  { line: 10, annotation: "45 < 12 is false, min stays 12", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "12"}], output: "" },
                  { line: 11, annotation: "7 < 12 is true, update min to 7", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "7"}], output: "" },
                  { line: 12, annotation: "30 < 7 is false, min stays 7", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "7"}], output: "" },
                  { line: 13, annotation: "Print result", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "7"}], output: "Maximum: 45\nMinimum: 7\n" },
                  { line: 14, annotation: "Program terminates", memory: [{variable: "a", type: "int", value: "12"}, {variable: "b", type: "int", value: "45"}, {variable: "c", type: "int", value: "7"}, {variable: "d", type: "int", value: "30"}, {variable: "max", type: "int", value: "45"}, {variable: "min", type: "int", value: "7"}], output: "Maximum: 45\nMinimum: 7\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w5-2",
            title: "Electricity Bill Generator",
            desc: "Generate electricity bill based on units consumed.",
            expected: "Electricity Bill: Rs. 650.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept the number of units of electricity consumed by a customer and compute the electricity bill using a slab-based tariff structure implemented with if-else if-else statements. The student will:",
                bullets: [
                  "Declare and use int and float variables for units and bill amount",
                  "Apply if-else if-else chains to implement multi-slab billing logic",
                  "Perform cumulative arithmetic across multiple slabs",
                  "Use printf() with %.2f to display the bill to 2 decimal places",
                  "Understand real-world applications of conditional branching"
                ]
              },
              theory: [
                {
                  title: "💡 Why does your bill go up so fast?!",
                  body: [
                    "Have you ever noticed that when your family uses a LOT of electricity, the bill suddenly jumps up way more than expected? That's because electricity boards use a slab system — the more you use, the higher the price per unit. It's like a video game where the first 100 units are \"easy mode\" (cheap), the next 100 are \"medium mode\" (costlier), and anything beyond that is \"hard mode\" (expensive)!",
                    "This teaches the computer to calculate exactly how much to charge based on which \"level\" of usage you're in.",
                    "![Electric meter or electricity bill](https://staticimg.amarujala.com/assets/images/2024/04/15/electric-bill-electricity-bill-new_2a609bc128bc3196169a37a0f9399406.webp)"
                  ]
                },
                {
                  title: "Slab-Based Tariff",
                  body: ["Electricity boards charge different rates per unit for different consumption ranges. A common slab structure:", "Units 1–100 : Rs. 1.50 per unit", "Units 101–200 : Rs. 2.50 per unit (for units above 100)", "Units 201–300 : Rs. 4.00 per unit (for units above 200)", "Units above 300: Rs. 6.00 per unit (for units above 300)"]
                },
                {
                  title: "🎮 The slab game — an example:",
                  body: [
                    "You used 250 units this month. Here's how the bill works:",
                    "First 100 units → cheapest price (easy mode)",
                    "Next 100 units → medium price",
                    "Last 50 units → higher price (only 50 units, not 100!)",
                    "You pay for each slab separately and add them all up. The computer uses if-else if to figure out which slabs you've crossed!"
                  ]
                },
                {
                  title: "Cumulative Billing",
                  body: ["A consumer using 250 units pays:", "First 100 units: 100 * 1.50 = 150.00", "Next 100 units: 100 * 2.50 = 250.00", "Last 50 units: 50 * 4.00 = 200.00", "Total: Rs. 600.00"]
                },
                {
                  title: "if-else if-else Chain",
                  body: ["Used when exactly one of several mutually exclusive conditions must be selected:", "if (units <= 100) { ... } else if (units <= 200) { ... } else if (units <= 300) { ... } else { ... }", "Once a condition is true, the rest of the chain is skipped. A fixed service charge (e.g. Rs. 50) is often added to the computed amount."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the slab selection and bill computation.",
                "Observe how the if-else if chain selects exactly one slab block to execute.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter number of units consumed — e.g. 250",
                "Click Run Code. Verify output: Electricity Bill: Rs. 650.00 (including Rs. 50 service charge)",
                "Try 50, 150, 350 units to exercise all slab branches. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int units;\n    float bill = 0;\n    scanf(\"%d\", &units);\n    if (units <= 100) {\n        bill = units * 1.50;\n    } else if (units <= 200) {\n        bill = (100 * 1.50) + ((units - 100) * 2.50);\n    } else if (units <= 300) {\n        bill = (100 * 1.50) + (100 * 2.50) + ((units - 200) * 4.00);\n    } else {\n        bill = (100 * 1.50) + (100 * 2.50) + (100 * 4.00) + ((units - 300) * 6.00);\n    }\n    bill += 50.00;\n    printf(\"Electricity Bill: Rs. %.2f\\n\", bill);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "units", type: "int", value: "?"}, {variable: "bill", type: "float", value: "0.00"}], output: "" },
                  { line: 5, annotation: "scanf() reads '250'", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "0.00"}], output: "" },
                  { line: 6, annotation: "units <= 100 is false", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "0.00"}], output: "" },
                  { line: 8, annotation: "units <= 200 is false", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "0.00"}], output: "" },
                  { line: 10, annotation: "units <= 300 is true, executing this block", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "0.00"}], output: "" },
                  { line: 11, annotation: "Calculate 150 + 250 + (50 * 4.00) = 600.00", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "600.00"}], output: "" },
                  { line: 15, annotation: "Add fixed service charge of Rs. 50", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "650.00"}], output: "" },
                  { line: 16, annotation: "printf() displays total bill", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "650.00"}], output: "Electricity Bill: Rs. 650.00\n" },
                  { line: 17, annotation: "Program terminates", memory: [{variable: "units", type: "int", value: "250"}, {variable: "bill", type: "float", value: "650.00"}], output: "Electricity Bill: Rs. 650.00\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w5-3",
            title: "Quadratic Roots",
            desc: "Find roots of the quadratic equation ax2+bx+c=0.",
            expected: "Roots: 3.00, 2.00 or Complex",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept coefficients a, b, and c of a quadratic equation ax² + bx + c = 0 and compute and classify its roots using the discriminant. The student will:",
                bullets: [
                  "Declare and use float/double variables for coefficients and roots",
                  "Compute the discriminant: D = b*b - 4*a*c",
                  "Use nested if-else to classify roots as real & distinct, real & equal, or complex",
                  "Apply sqrt() from math.h to compute real roots",
                  "Handle edge cases including a = 0 (not a quadratic)"
                ]
              },
              theory: [
                {
                  title: "🎯 Finding where a curve touches the ground!",
                  body: [
                    "Imagine you throw a ball in the air. It goes up, reaches a peak, then comes back down. If you draw this path, it makes a U-shaped curve (called a parabola). A quadratic equation describes this curve. The \"roots\" are the two points where the ball hits the ground (touches the x-axis)!",
                    "The formula ax² + bx + c = 0 is the math that describes that ball's path. Solving it tells you WHEN it lands.",
                    "![A ball arc / parabola](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400)"
                  ]
                },
                {
                  title: "Quadratic Formula",
                  body: ["A second-degree polynomial equation of the form: ax² + bx + c = 0 where a ≠ 0", "Formula: x = (-b ± sqrt(b² - 4ac)) / (2a)"]
                },
                {
                  title: "Discriminant",
                  body: ["D = b² - 4ac determines the nature of the roots:", "D > 0 : Two distinct real roots. x1 = (-b + sqrt(D)) / (2a), x2 = (-b - sqrt(D)) / (2a)", "D == 0 : Two equal (repeated) real roots. x1 = x2 = -b / (2a)", "D < 0 : Two complex conjugate roots (no real roots). Real part = -b / (2a), Imaginary part = sqrt(-D) / (2a)"]
                },
                {
                  title: "🔍 The discriminant is a fortune teller!",
                  body: [
                    "Before solving the equation, we calculate D = b² - 4ac. This single number tells us the FUTURE of our solutions:",
                    "D > 0 → 🎉 Two different real answers (ball lands in two spots)",
                    "D = 0 → 🤔 One repeated answer (ball just barely grazes the ground)",
                    "D < 0 → 😶 No real answers (ball never touches the ground — it went into imaginary space!)",
                    "That's why we always check D first before doing any square root. sqrt() of a negative number breaks the math!"
                  ]
                },
                {
                  title: "Edge Case",
                  body: ["If a = 0, the equation becomes linear: bx + c = 0, solved as x = -c/b.", "This must be checked before applying the quadratic formula to avoid division by zero."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the discriminant computation and branching.",
                "Observe how D > 0, D == 0, and D < 0 lead to three different output paths.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a, b, c — e.g. 1 -5 6",
                "Click Run Code. Verify output: Root1: 3.00  Root2: 2.00",
                "Try 1 2 1 (equal roots) and 1 1 1 (complex roots). Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double a, b, c, d, r1, r2;\n    scanf(\"%lf %lf %lf\", &a, &b, &c);\n    if (a == 0) {\n        printf(\"Not a quadratic equation.\\n\");\n    } else {\n        d = b * b - 4 * a * c;\n        if (d > 0) {\n            r1 = (-b + sqrt(d)) / (2 * a);\n            r2 = (-b - sqrt(d)) / (2 * a);\n            printf(\"Root1: %.2f  Root2: %.2f\\n\", r1, r2);\n        } else if (d == 0) {\n            r1 = -b / (2 * a);\n            printf(\"Equal roots: %.2f\\n\", r1);\n        } else {\n            printf(\"Complex roots\\n\");\n        }\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and math libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate variables", memory: [{variable: "a", type: "double", value: "?"}, {variable: "b", type: "double", value: "?"}, {variable: "c", type: "double", value: "?"}, {variable: "d", type: "double", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf() reads '1 -5 6'", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "?"}], output: "" },
                  { line: 7, annotation: "Check if a == 0 (False)", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "?"}], output: "" },
                  { line: 10, annotation: "Compute discriminant D = 25 - 24 = 1", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "" },
                  { line: 11, annotation: "Check if D > 0 (True)", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "" },
                  { line: 12, annotation: "Compute Root1 = (5 + 1)/2 = 3.0", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "" },
                  { line: 13, annotation: "Compute Root2 = (5 - 1)/2 = 2.0", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "" },
                  { line: 14, annotation: "printf() displays both distinct roots", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "Root1: 3.00  Root2: 2.00\n" },
                  { line: 22, annotation: "Program terminates", memory: [{variable: "a", type: "double", value: "1.0"}, {variable: "b", type: "double", value: "-5.0"}, {variable: "c", type: "double", value: "6.0"}, {variable: "d", type: "double", value: "1.0"}], output: "Root1: 3.00  Root2: 2.00\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w5-4",
            title: "Calculator Using Switch",
            desc: "Simulate a basic calculator for +, -, *, /.",
            expected: "Result: 13.00",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to implement a simple arithmetic calculator that accepts two numbers and an operator from the user and performs the corresponding operation using a switch-case statement. The student will:",
                bullets: [
                  "Declare and use float variables for operands and result",
                  "Accept a char input for the operator (+, -, *, /)",
                  "Use switch-case to dispatch to the correct operation",
                  "Handle division by zero as a special case within the division branch",
                  "Use the default case to handle invalid operators",
                  "Use printf() with %.2f to display the result"
                ]
              },
              theory: [
                {
                  title: "🔢 Building your own pocket calculator!",
                  body: [
                    "Every calculator has buttons: +, -, ×, ÷. When you press a button, the calculator looks at WHICH button you pressed and does that specific operation. That's exactly what switch-case does in C! Instead of writing a long chain of if-else if-else if, you list all the cases neatly — like the buttons on a calculator.",
                    "![Classic calculator](https://wikihow.com/images/1/10/Find-the-Minimum-and-Maximum-Points-Using-a-Graphing-Calculator-Step-7.webp)"
                  ]
                },
                {
                  title: "switch-case Statement",
                  body: ["An alternative to long if-else if chains when branching on the value of a single integer or character expression.", "switch (expression) {\n    case value1: statements; break;\n    case value2: statements; break;\n    default: statements;\n}"]
                },
                {
                  title: "break Statement and Fall-Through",
                  body: ["Each case must end with break to prevent fall-through. Without break, execution continues into the next case regardless of its label.", "Intentional fall-through (omitting break) can group cases: case '+': case 'p': result = a + b; break;"]
                },
                {
                  title: "🚪 break is like a door stopper!",
                  body: [
                    "Imagine you walk into a hotel. Room 1 is addition, Room 2 is subtraction, Room 3 is multiplication. Without break, once you enter Room 1 and finish, you'd accidentally walk into Room 2, then Room 3 as well! The break statement is a door stopper — it keeps you in the right room and stops you from falling through into the next one."
                  ]
                },
                {
                  title: "default Case and Char Input",
                  body: ["default case is executed when no case value matches the expression. Used to handle invalid or unexpected input gracefully.", "Operators are characters. Read with scanf(\" %c\", &op). The leading space in \" %c\" skips any leftover whitespace or newline in the input buffer."]
                },
                {
                  title: "Division by Zero",
                  body: ["Always check if the divisor is zero before performing division:\ncase '/':\n    if (b == 0) printf(\"Error\");\n    else result = a / b;\n    break;"]
                },
                {
                  title: "⛔ Why you can never divide by zero:",
                  body: [
                    "Try asking your calculator 5 ÷ 0. It shows ERROR! Why? Because 5 ÷ 0 means \"how many times does 0 fit into 5?\" — and the answer is infinite, which a computer can't store. It's like asking \"how many empty bags do you need to hold 5 apples?\" — you'd need endless empty bags! Always check if (b == 0) before dividing."
                  ]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the switch dispatch for different operators.",
                "Observe how break stops execution after each case and how default catches bad input.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter two numbers and an operator — e.g. 10 3 +",
                "Click Run Code. Verify output: Result: 13.00",
                "Test all four operators and try 10 0 / for division by zero. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    float a, b, res;\n    char op;\n    scanf(\"%f %f %c\", &a, &b, &op);\n    switch(op) {\n        case '+': res = a + b; printf(\"Result: %.2f\\n\", res); break;\n        case '-': res = a - b; printf(\"Result: %.2f\\n\", res); break;\n        case '*': res = a * b; printf(\"Result: %.2f\\n\", res); break;\n        case '/': \n            if (b == 0) printf(\"Error: Division by zero\\n\");\n            else printf(\"Result: %.2f\\n\", a / b);\n            break;\n        default: printf(\"Invalid operator\\n\");\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "a", type: "float", value: "?"}, {variable: "b", type: "float", value: "?"}, {variable: "op", type: "char", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '10 3 +'", memory: [{variable: "a", type: "float", value: "10.0"}, {variable: "b", type: "float", value: "3.0"}, {variable: "op", type: "char", value: "'+'"}], output: "" },
                  { line: 6, annotation: "switch evaluates op '+'", memory: [{variable: "a", type: "float", value: "10.0"}, {variable: "b", type: "float", value: "3.0"}, {variable: "op", type: "char", value: "'+'"}], output: "" },
                  { line: 7, annotation: "Case '+' matches. Compute res and print", memory: [{variable: "a", type: "float", value: "10.0"}, {variable: "b", type: "float", value: "3.0"}, {variable: "op", type: "char", value: "'+'"}], output: "Result: 13.00\n" },
                  { line: 7, annotation: "break statement exits switch block", memory: [{variable: "a", type: "float", value: "10.0"}, {variable: "b", type: "float", value: "3.0"}, {variable: "op", type: "char", value: "'+'"}], output: "Result: 13.00\n" },
                  { line: 16, annotation: "Program terminates", memory: [{variable: "a", type: "float", value: "10.0"}, {variable: "b", type: "float", value: "3.0"}, {variable: "op", type: "char", value: "'+'"}], output: "Result: 13.00\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w5-5",
            title: "Leap Year Check",
            desc: "Determine if a given year is a leap year.",
            expected: "Leap Year / Not Leap Year",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a year from the user and determine whether it is a leap year or not using nested if-else statements and logical operators. The student will:",
                bullets: [
                  "Declare and use an int variable for the year",
                  "Apply the standard leap year rule using % (modulus) and logical operators",
                  "Implement the three-condition leap year test using nested if-else",
                  "Use printf() to display whether the year is a leap year or not"
                ]
              },
              theory: [
                {
                  title: "📅 Why do we even need leap years?",
                  body: [
                    "The Earth takes 365 days AND about 6 hours to go around the Sun. But our calendar only counts 365 days. So every year, we ignore those extra 6 hours. After 4 years, those ignored hours add up to a whole extra day (6×4=24 hours)! We add that day as February 29 — that's a leap year. Without this fix, our calendar would slowly drift, and eventually July would be in winter!",
                    "![Earth orbiting the sun / calendar](https://dims.apnews.com/dims4/default/11ffb44/2147483647/strip/true/crop/4511x2537+0+235/resize/1440x810!/quality/90/?url=https:%2F%2Fassets.apnews.com%2Fd2%2F45%2F92bbfa6f4b44bee259b33411a5cb%2Ff7c5e5ee51eb4bffbf2ef57badc3f179)"
                  ]
                },
                {
                  title: "Leap Year Rules",
                  body: ["A year is a leap year if: Rule 1: It is divisible by 4 AND Rule 2: It is NOT divisible by 100 OR Rule 3: It is divisible by 400", "Condensed Rule: (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)"]
                },
                {
                  title: "Breakdown",
                  body: ["Divisible by 4 : Candidate for leap year (e.g. 2024)", "Divisible by 100 : Century year — NOT a leap year unless also divisible by 400", "Divisible by 400 : Always a leap year (e.g. 2000)"]
                },
                {
                  title: "Examples",
                  body: ["2024 : 2024 % 4 == 0, 2024 % 100 != 0 → Leap year", "1900 : 1900 % 4 == 0, 1900 % 100 == 0, 1900 % 400 != 0 → Not a leap year", "2000 : 2000 % 400 == 0 → Leap year", "2023 : 2023 % 4 != 0 → Not a leap year"]
                },
                {
                  title: "🧩 The 100-year exception — why?!",
                  body: [
                    "If we added a leap year every 4 years perfectly, we'd still be off by a tiny bit (the Earth takes slightly less than exactly 6 extra hours). Over 100 years, these tiny errors add up. So century years (1900, 2100) are NOT leap years — unless they're also divisible by 400 (like 2000). It's a correction inside a correction inside a correction — like fixing a slightly wrong clock!"
                  ]
                },
                {
                  title: "Operators",
                  body: ["Modulus Operator — year % 4 gives the remainder when year is divided by 4.", "Logical Operators: && (AND) both conditions must be true, || (OR) at least one condition must be true, ! (NOT) inverts a boolean result"]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the three-level condition check.",
                "Observe how 2000, 1900, 2024, and 2023 each take different paths through the logic.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a year — e.g. 2024",
                "Click Run Code. Verify output: 2024 is a Leap Year",
                "Test 1900, 2000, 2023, and 1600 to cover all rule branches. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int year;\n    scanf(\"%d\", &year);\n    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {\n        printf(\"%d is a Leap Year\\n\", year);\n    } else {\n        printf(\"%d is not a Leap Year\\n\", year);\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate year variable", memory: [{variable: "year", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '2024'", memory: [{variable: "year", type: "int", value: "2024"}], output: "" },
                  { line: 6, annotation: "Check condition: (2024 % 4 == 0 && 2024 % 100 != 0) is true", memory: [{variable: "year", type: "int", value: "2024"}], output: "" },
                  { line: 7, annotation: "printf() prints leap year message", memory: [{variable: "year", type: "int", value: "2024"}], output: "2024 is a Leap Year\n" },
                  { line: 11, annotation: "Program terminates", memory: [{variable: "year", type: "int", value: "2024"}], output: "2024 is a Leap Year\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 6",
        objective: "while, do-while, for loops, break and continue",
        tutorial: "Tutorial 6: Loops",
        labTitle: "Lab 6: Iterative problems",
        experiments: [
          {
            id: "c-w6-1",
            title: "Factorial",
            desc: "Calculate factorial of a given number.",
            expected: "Factorial: 120",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a non-negative integer from the user and compute its factorial using a loop. The student will:",
                bullets: [
                  "Declare and use int and long long variables to handle large factorial values",
                  "Implement factorial computation using for, while, or do-while loop",
                  "Understand the mathematical definition of factorial including 0! = 1",
                  "Handle invalid input (negative numbers) using a conditional check",
                  "Use printf() with %lld to display large integer results"
                ]
              },
              theory: [
                {
                  title: "🎂 How many ways can your friends sit at a birthday party?",
                  body: [
                    "If 3 friends — Aarav, Bhanu, and Chetan — sit in a row, how many different seating arrangements are possible?",
                    "Aarav first: 3 choices for seat 1, 2 remaining for seat 2, 1 left for seat 3 → 3 × 2 × 1 = 6 ways",
                    "That's 3! = 6. This is exactly what factorial computes — the number of ways to arrange things. Used everywhere in maths, probability, and even game development!",
                    "![Kids sitting at a party table](https://d14qv6cm1t62pm.cloudfront.net/ccbp-website/Blogs/home/factorial-program-in-c-image-2.webp)"
                  ]
                },
                {
                  title: "Factorial Definition",
                  body: ["The factorial of a non-negative integer n, written n!, is: n! = n × (n-1) × (n-2) × ... × 2 × 1", "0! = 1 (by definition), 1! = 1, 5! = 5 × 4 × 3 × 2 × 1 = 120"]
                },
                {
                  title: "Iterative Approach Using for Loop",
                  body: ["long long fact = 1;\nfor (int i = 1; i <= n; i++) {\n    fact = fact * i;\n}", "The loop multiplies fact by each integer from 1 to n sequentially."]
                },
                {
                  title: "Why long long?",
                  body: ["Factorials grow very rapidly: 10! = 3,628,800, 15! = 1,307,674,368,000, 20! = 2,432,902,008,176,640,000", "An int (typically 32-bit) overflows beyond 12!. Use long long (64-bit) to safely hold values up to 20!. Format specifier: %lld."]
                },
                {
                  title: "📈 Factorials grow INSANELY fast!",
                  body: [
                    "1! = 1 ... 5! = 120 ... 10! = 3,628,800 ... 20! = 2,432,902,008,176,640,000",
                    "By just 20, the number has 19 digits! A regular int in C can only hold numbers up to about 2 billion (10 digits). That's why we use long long — a bigger box that holds numbers up to about 9 quintillion. Even then, 21! overflows it. Factorials are like rabbits — they multiply way faster than you expect!"
                  ]
                },
                {
                  title: "Negative Input Handling",
                  body: ["Factorial is undefined for negative integers. Check with if (n < 0) and print an error message before attempting any computation."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and step through the loop trace for n = 5.",
                "Observe how the accumulator fact is updated at each iteration.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a non-negative integer — e.g. 5",
                "Click Run Code. Verify output: Factorial: 120",
                "Try n = 0, n = 1, n = 15, and n = -3 to test all branches. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    long long fact = 1;\n    int n, i;\n    scanf(\"%d\", &n);\n    if (n < 0) {\n        printf(\"Error: Factorial of negative number is undefined\\n\");\n    } else {\n        for (i = 1; i <= n; i++) {\n            fact = fact * i;\n        }\n        printf(\"Factorial: %lld\\n\", fact);\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "?"}, {variable: "i", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '5'", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "n < 0 is false", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "?"}], output: "" },
                  { line: 9, annotation: "Loop i = 1", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "fact = 1 * 1 = 1", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Loop i = 2", memory: [{variable: "fact", type: "long long", value: "1"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 10, annotation: "fact = 1 * 2 = 2", memory: [{variable: "fact", type: "long long", value: "2"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 9, annotation: "Loop i = 3", memory: [{variable: "fact", type: "long long", value: "2"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 10, annotation: "fact = 2 * 3 = 6", memory: [{variable: "fact", type: "long long", value: "6"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 9, annotation: "Loop i = 4", memory: [{variable: "fact", type: "long long", value: "6"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "4"}], output: "" },
                  { line: 10, annotation: "fact = 6 * 4 = 24", memory: [{variable: "fact", type: "long long", value: "24"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "4"}], output: "" },
                  { line: 9, annotation: "Loop i = 5", memory: [{variable: "fact", type: "long long", value: "24"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "5"}], output: "" },
                  { line: 10, annotation: "fact = 24 * 5 = 120", memory: [{variable: "fact", type: "long long", value: "120"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "5"}], output: "" },
                  { line: 12, annotation: "printf() prints factorial", memory: [{variable: "fact", type: "long long", value: "120"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "6"}], output: "Factorial: 120\n" },
                  { line: 15, annotation: "Program terminates", memory: [{variable: "fact", type: "long long", value: "120"}, {variable: "n", type: "int", value: "5"}, {variable: "i", type: "int", value: "6"}], output: "Factorial: 120\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w6-2",
            title: "Prime Number Check",
            desc: "Check if a number is prime.",
            expected: "17 is a Prime Number",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a positive integer from the user and determine whether it is a prime number using a loop with break and a flag variable. The student will:",
                bullets: [
                  "Declare and use int variables for the number, loop counter, and flag",
                  "Implement a trial division loop from 2 to sqrt(n) for efficiency",
                  "Use break to exit the loop early when a factor is found",
                  "Use a flag variable to record whether any factor was found",
                  "Use printf() to display whether the number is prime or not"
                ]
              },
              theory: [
                {
                  title: "🔐 Primes are the atoms of mathematics!",
                  body: [
                    "Every number can be broken into smaller pieces by multiplication — except prime numbers. A prime number is a number that can ONLY be divided by 1 and itself. No other number divides it cleanly.",
                    "Here's the wild part: primes are used to protect your passwords and bank details right now! When you type your password on a website, it gets locked using a mathematical trick based on huge prime numbers. Hackers can't break it because multiplying two giant primes is easy — but finding the two primes from the product is nearly impossible!",
                    "![A padlock / security concept](https://i.ytimg.com/vi/_kh9uX5MCOo/maxresdefault.webp)"
                  ]
                },
                {
                  title: "Prime Number Definition",
                  body: ["A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.", "Primes: 2, 3, 5, 7, 11... Not prime (composite): 4, 6, 8, 9... 1 is neither prime nor composite."]
                },
                {
                  title: "Trial Division",
                  body: ["To check if n is prime, test divisibility for each i from 2 to n-1. If n % i == 0 for any i, n is not prime."]
                },
                {
                  title: "Optimised Loop",
                  body: ["It is sufficient to check divisors only up to sqrt(n). If n has a factor greater than sqrt(n), it must have a corresponding factor smaller than sqrt(n).", "for (i = 2; i * i <= n; i++) reduces iterations significantly."]
                },
                {
                  title: "⚡ The square root trick — why does it work?",
                  body: [
                    "If 36 has a factor of 4, it MUST also have a factor of 9 (because 4×9=36). One factor will always be ≤ √36 = 6, and the other ≥ 6. So if we check all numbers up to √n and find no factor, there can't be any factor above √n either. This cuts our work from checking 35 numbers (for n=36) down to just 6. For large numbers like 1,000,000, we check 1000 instead of 999,999. That's 1000× faster!"
                  ]
                },
                {
                  title: "break Statement and Flag",
                  body: ["When a factor is found, there is no need to continue checking. break exits the loop immediately.", "A flag (isPrime) is initialised to 1. If any factor is found, it is set to 0. After the loop, the flag determines the result."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace through the loop for n = 7 and n = 12.",
                "Observe how break fires immediately at i = 2 for n = 12 and never fires for n = 7.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a positive integer — e.g. 17",
                "Click Run Code. Verify output: 17 is a Prime Number",
                "Try 1, 2, 4, 97, and 100 to exercise all branches. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int n, i, isPrime = 1;\n    scanf(\"%d\", &n);\n    if (n <= 1) {\n        isPrime = 0;\n    } else {\n        for (i = 2; i * i <= n; i++) {\n            if (n % i == 0) {\n                isPrime = 0;\n                break;\n            }\n        }\n    }\n    if (isPrime) printf(\"%d is a Prime Number\\n\", n);\n    else printf(\"%d is not a Prime Number\\n\", n);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "i", type: "int", value: "?"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 5, annotation: "scanf() reads '17'", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "?"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 6, annotation: "n <= 1 is false", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "?"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Loop i = 2 (2*2 <= 17)", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "2"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "17 % 2 != 0", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "2"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Loop i = 3 (3*3 <= 17)", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "3"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "17 % 3 != 0", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "3"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Loop i = 4 (4*4 <= 17)", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "4"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "17 % 4 != 0", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "4"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Loop exits, i = 5 (5*5 > 17)", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "5"}, {variable: "isPrime", type: "int", value: "1"}], output: "" },
                  { line: 16, annotation: "isPrime is 1, print Prime", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "5"}, {variable: "isPrime", type: "int", value: "1"}], output: "17 is a Prime Number\n" },
                  { line: 18, annotation: "Program terminates", memory: [{variable: "n", type: "int", value: "17"}, {variable: "i", type: "int", value: "5"}, {variable: "isPrime", type: "int", value: "1"}], output: "17 is a Prime Number\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w6-3",
            title: "Sine Series",
            desc: "Calculate sin(x) using Taylor series expansion.",
            expected: "sin(30) ≈ 0.500000",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to compute the value of sin(x) using its Taylor/Maclaurin series expansion up to a specified number of terms. The student will:",
                bullets: [
                  "Declare and use double variables for x, the term, and the running sum",
                  "Accept x in degrees and convert to radians before computation",
                  "Apply the sine series formula iteratively using a for loop",
                  "Understand how term sign alternates and how each term is built from the previous",
                  "Compare the computed result with the library sin() function from math.h",
                  "Use printf() with %.6f to display results to sufficient decimal precision"
                ]
              },
              theory: [
                {
                  title: "🌊 How does your phone calculate sin(30°)?",
                  body: [
                    "Your calculator doesn't have a \"sin button\" hardwired with a table of answers. It uses a clever mathematical trick discovered by a mathematician named Maclaurin — it approximates sin using an infinite series of additions and multiplications. Each extra term makes the answer more accurate. After 10-15 terms, the result matches the exact answer to many decimal places!",
                    "This is how computers calculate ALL trigonometric functions — no magic, just clever repeated arithmetic.",
                    "![Sine wave graph](https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400)"
                  ]
                },
                {
                  title: "Sine Series (Maclaurin Expansion)",
                  body: ["sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + x⁹/9! - ...", "General term (n starting from 0): term_n = (-1)^n * x^(2n+1) / (2n+1)!"]
                },
                {
                  title: "Degree to Radian Conversion",
                  body: ["Trigonometric series require x in radians: x_rad = x_deg * (M_PI / 180.0)", "M_PI is defined in math.h. Alternatively use 3.14159265358979."]
                },
                {
                  title: "📐 Why radians, not degrees?",
                  body: [
                    "Degrees (0°–360°) are human-invented. Radians are what the universe actually uses in mathematics. The formula sin(x) = x - x³/6 + ... only works when x is in radians. Think of degrees as a nickname (like calling someone \"Raju\") and radians as their official name on the birth certificate (like \"Rajeshwar\"). Math functions only understand the official name!",
                    "Conversion: multiply degrees by π/180 to get radians."
                  ]
                },
                {
                  title: "Iterative Term Building",
                  body: ["Rather than computing pow() and factorial from scratch each iteration (expensive), build each term from the previous one:", "term = term * (-1) * x * x / ((2*n) * (2*n + 1))", "This avoids repeated factorial and power calculations."]
                },
                {
                  title: "Convergence and Accuracy",
                  body: ["More terms give higher accuracy. For most angles, 10–15 terms are sufficient for double precision.", "Comparing your series result against math.h's sin() validates the implementation."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the series computation term by term for x = 30°.",
                "Observe how the running sum converges toward 0.500000 as terms are added.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter an angle in degrees and number of terms — e.g. 30 10",
                "Click Run Code. Verify output: sin(30) ≈ 0.500000",
                "Try 90, 0, 180, and 45 degrees. Compare series result with math.h sin(). Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#define PI 3.14159265358979\n\nint main() {\n    double deg, x, term, sum = 0;\n    int n, i;\n    scanf(\"%lf %d\", &deg, &n);\n    x = deg * (PI / 180.0);\n    term = x;\n    for (i = 0; i < n; i++) {\n        sum += term;\n        term = term * (-1) * x * x / ((2 * i + 2) * (2 * i + 3));\n    }\n    printf(\"sin(%.0f) ≈ %.6f\\n\", deg, sum);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library and define PI", memory: [], output: "" },
                  { line: 5, annotation: "Allocate variables", memory: [{variable: "sum", type: "double", value: "0.0"}], output: "" },
                  { line: 7, annotation: "scanf() reads '30 10'", memory: [{variable: "deg", type: "double", value: "30.0"}, {variable: "n", type: "int", value: "10"}, {variable: "sum", type: "double", value: "0.0"}], output: "" },
                  { line: 8, annotation: "Convert 30 degrees to radians", memory: [{variable: "deg", type: "double", value: "30.0"}, {variable: "x", type: "double", value: "0.523599"}, {variable: "n", type: "int", value: "10"}], output: "" },
                  { line: 9, annotation: "Set initial term to x", memory: [{variable: "x", type: "double", value: "0.523599"}, {variable: "term", type: "double", value: "0.523599"}, {variable: "sum", type: "double", value: "0.0"}], output: "" },
                  { line: 10, annotation: "Loop i = 0", memory: [{variable: "term", type: "double", value: "0.523599"}, {variable: "sum", type: "double", value: "0.0"}], output: "" },
                  { line: 11, annotation: "Add term to sum", memory: [{variable: "term", type: "double", value: "0.523599"}, {variable: "sum", type: "double", value: "0.523599"}], output: "" },
                  { line: 12, annotation: "Compute next term (negative x^3 / 3!)", memory: [{variable: "term", type: "double", value: "-0.023925"}, {variable: "sum", type: "double", value: "0.523599"}], output: "" },
                  { line: 10, annotation: "Loop i = 1", memory: [{variable: "term", type: "double", value: "-0.023925"}, {variable: "sum", type: "double", value: "0.523599"}], output: "" },
                  { line: 11, annotation: "Add term to sum", memory: [{variable: "term", type: "double", value: "-0.023925"}, {variable: "sum", type: "double", value: "0.499674"}], output: "" },
                  { line: 12, annotation: "Compute next term (positive x^5 / 5!)", memory: [{variable: "term", type: "double", value: "0.000328"}, {variable: "sum", type: "double", value: "0.499674"}], output: "" },
                  { line: 14, annotation: "Loop continues... printf() displays final sum", memory: [{variable: "sum", type: "double", value: "0.500000"}], output: "sin(30) ≈ 0.500000\n" },
                  { line: 16, annotation: "Program terminates", memory: [{variable: "sum", type: "double", value: "0.500000"}], output: "sin(30) ≈ 0.500000\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w6-4",
            title: "Palindrome Check",
            desc: "Check if a number is a palindrome.",
            expected: "121 is a Palindrome",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a positive integer from the user and determine whether it is a palindrome by reversing its digits using a while loop. The student will:",
                bullets: [
                  "Declare and use int variables for the number, reversed number, and remainder",
                  "Extract digits one by one using the modulus and division operators",
                  "Build the reversed number digit by digit inside a while loop",
                  "Compare the original and reversed numbers to determine if it is a palindrome",
                  "Use printf() to display the result"
                ]
              },
              theory: [
                {
                  title: "🪞 A number that looks the same in a mirror!",
                  body: [
                    "A palindrome reads the same forwards and backwards. Like the word \"MADAM\" — spell it backwards, still MADAM! Or the number 121 — flip it, still 121. Or 12321 — still 12321.",
                    "To check this in code, we reverse the number and compare it to the original. If they match, it's a palindrome — like checking if someone looks the same from the front and back in a mirror!",
                    "![Mirror reflection concept](https://ica.edu.np/uploads/blog_image/original/78811.webp)"
                  ]
                },
                {
                  title: "Palindrome Number",
                  body: ["A number is a palindrome if it reads the same forwards and backwards.", "Examples: 121 → 121 (Palindrome), 123 → 321 (Not a Palindrome), 5 → 5 (Palindrome)."]
                },
                {
                  title: "Digit Extraction",
                  body: ["remainder = n % 10 extracts the last digit of n.", "n = n / 10 removes the last digit from n (integer division)."]
                },
                {
                  title: "🔢 How do we reverse a number step by step?",
                  body: [
                    "Let's reverse 123:",
                    "Step 1: Last digit = 123 % 10 = 3. Remaining = 123 / 10 = 12. Reversed = 0 × 10 + 3 = 3",
                    "Step 2: Last digit = 12 % 10 = 2. Remaining = 12 / 10 = 1. Reversed = 3 × 10 + 2 = 32",
                    "Step 3: Last digit = 1 % 10 = 1. Remaining = 1 / 10 = 0. Reversed = 32 × 10 + 1 = 321",
                    "Now compare: 123 ≠ 321 → NOT a palindrome. Try it with 121 and see it work!"
                  ]
                },
                {
                  title: "Building the Reversed Number",
                  body: ["reversed = reversed * 10 + remainder", "Each iteration shifts the existing reversed digits left by one place and appends the newly extracted digit."]
                },
                {
                  title: "Preserving the Original",
                  body: ["Before entering the loop, save the original value: original = n;", "After reversal, compare original == reversed to decide palindrome status. Negative numbers are not palindromes."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the digit extraction loop for n = 121.",
                "Observe how remainder, reversed, and n change at each iteration.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a positive integer — e.g. 121",
                "Click Run Code. Verify output: 121 is a Palindrome",
                "Try 1331, 123, 5, and 10. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int n, original, reversed = 0, remainder;\n    scanf(\"%d\", &n);\n    original = n;\n    while (n > 0) {\n        remainder = n % 10;\n        reversed = reversed * 10 + remainder;\n        n /= 10;\n    }\n    if (original == reversed) printf(\"%d is a Palindrome\\n\", original);\n    else printf(\"%d is not a Palindrome\\n\", original);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "original", type: "int", value: "?"}, {variable: "reversed", type: "int", value: "0"}, {variable: "remainder", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '121'", memory: [{variable: "n", type: "int", value: "121"}], output: "" },
                  { line: 6, annotation: "Save original value", memory: [{variable: "original", type: "int", value: "121"}], output: "" },
                  { line: 7, annotation: "while n > 0 (121 > 0)", memory: [{variable: "n", type: "int", value: "121"}], output: "" },
                  { line: 8, annotation: "remainder = 121 % 10 = 1", memory: [{variable: "remainder", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "reversed = 0 * 10 + 1 = 1", memory: [{variable: "reversed", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "n = 121 / 10 = 12", memory: [{variable: "n", type: "int", value: "12"}], output: "" },
                  { line: 7, annotation: "while n > 0 (12 > 0)", memory: [{variable: "n", type: "int", value: "12"}], output: "" },
                  { line: 8, annotation: "remainder = 12 % 10 = 2", memory: [{variable: "remainder", type: "int", value: "2"}], output: "" },
                  { line: 9, annotation: "reversed = 1 * 10 + 2 = 12", memory: [{variable: "reversed", type: "int", value: "12"}], output: "" },
                  { line: 10, annotation: "n = 12 / 10 = 1", memory: [{variable: "n", type: "int", value: "1"}], output: "" },
                  { line: 7, annotation: "while n > 0 (1 > 0)", memory: [{variable: "n", type: "int", value: "1"}], output: "" },
                  { line: 8, annotation: "remainder = 1 % 10 = 1", memory: [{variable: "remainder", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "reversed = 12 * 10 + 1 = 121", memory: [{variable: "reversed", type: "int", value: "121"}], output: "" },
                  { line: 10, annotation: "n = 1 / 10 = 0", memory: [{variable: "n", type: "int", value: "0"}], output: "" },
                  { line: 7, annotation: "while n > 0 (0 > 0) -> Exit loop", memory: [{variable: "n", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Check if original == reversed (121 == 121)", memory: [{variable: "original", type: "int", value: "121"}, {variable: "reversed", type: "int", value: "121"}], output: "" },
                  { line: 12, annotation: "printf() displays Palindrome", memory: [], output: "121 is a Palindrome\n" },
                  { line: 14, annotation: "Program terminates", memory: [], output: "121 is a Palindrome\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w6-5",
            title: "Number Pyramid",
            desc: "Print a number pyramid pattern.",
            expected: "Pyramid pattern output",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept the number of rows from the user and print a number pyramid pattern using nested for loops. The student will:",
                bullets: [
                  "Declare and use int variables for row count, loop counters, and spacing",
                  "Use an outer for loop to iterate over rows",
                  "Use inner for loops to print leading spaces and numbers for each row",
                  "Understand how nested loop variables interact to produce 2D patterns",
                  "Use printf() with space and number formatting to align output correctly"
                ]
              },
              theory: [
                {
                  title: "🔺 Building patterns with loops — like stacking bricks!",
                  body: [
                    "Look at a pyramid from the front. Row 1 has 1 brick, row 2 has 2 bricks, row 3 has 3 bricks. Each row is wider than the last, and everything is centered. To draw this with code, we use loops inside loops — the outer loop builds each row, the inner loops place the spaces and numbers perfectly.",
                    "It's like a construction worker who, for each floor of the building, carefully counts how many bricks to place and where to start!",
                    "![A pyramid or triangle pattern](https://static.scientificamerican.com/dam/m/5a010cba8055f33f/original/oddPyramid_graphic_d1_TEXT.webp?m=1721669879.477&w=900)"
                  ]
                },
                {
                  title: "Nested Loops",
                  body: ["A loop placed inside another loop is called a nested loop. The outer loop controls the row number and the inner loop(s) control what is printed on each row.", "for (i = 1; i <= n; i++) {\n    for (j = 1; j <= ...; j++) { printf(...); }\n    printf(\"\\n\");\n}"]
                },
                {
                  title: "🧅 Nested loops = onion layers!",
                  body: [
                    "Peel an onion — there's a layer, inside it another layer, inside it another. A nested loop is the same. The outer loop says \"do this for each ROW.\" The inner loop says \"for this row, do this for each COLUMN.\" Every time the outer loop ticks once, the entire inner loop runs completely. So for a 5-row pyramid, the inner loops run a total of 1+2+3+4+5 = 15 times!"
                  ]
                },
                {
                  title: "Number Pyramid Pattern",
                  body: ["Row i contains: (n - i) leading spaces (to centre the pyramid) and numbers 1 through i (with spaces between).", "Example for n=3:\n  1\n 1 2\n1 2 3"]
                },
                {
                  title: "Counting Iterations",
                  body: ["Outer loop: runs n times (i = 1 to n).", "Space loop: runs (n - i) times per row.", "Number loop: runs i times per row."]
                },
                {
                  title: "break vs continue",
                  body: ["break: exits the loop entirely.", "continue: skips only the current iteration, loop continues."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the nested loops row by row for n = 4.",
                "Observe how the space count decreases and the number count increases per row.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter the number of rows — e.g. 5",
                "Click Run Code. Verify the pyramid is centred and numbers increase left to right.",
                "Try n = 1, n = 3, and n = 7 to observe how the pyramid scales. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int n, i, j;\n    scanf(\"%d\", &n);\n    for (i = 1; i <= n; i++) {\n        for (j = 1; j <= n - i; j++) {\n            printf(\" \");\n        }\n        for (j = 1; j <= i; j++) {\n            printf(\"%d \", j);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "i", type: "int", value: "?"}, {variable: "j", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf() reads '3' for 3 rows", memory: [{variable: "n", type: "int", value: "3"}], output: "" },
                  { line: 6, annotation: "Row i=1", memory: [{variable: "n", type: "int", value: "3"}, {variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 7, annotation: "Print spaces: 3-1 = 2 spaces", memory: [{variable: "j", type: "int", value: "1"}], output: "  " },
                  { line: 10, annotation: "Print numbers up to i=1", memory: [{variable: "j", type: "int", value: "1"}], output: "  1 " },
                  { line: 13, annotation: "Newline", memory: [], output: "  1 \n" },
                  { line: 6, annotation: "Row i=2", memory: [{variable: "n", type: "int", value: "3"}, {variable: "i", type: "int", value: "2"}], output: "  1 \n" },
                  { line: 7, annotation: "Print spaces: 3-2 = 1 space", memory: [{variable: "j", type: "int", value: "1"}], output: "  1 \n " },
                  { line: 10, annotation: "Print numbers up to i=2", memory: [{variable: "j", type: "int", value: "1"}], output: "  1 \n 1 2 " },
                  { line: 13, annotation: "Newline", memory: [], output: "  1 \n 1 2 \n" },
                  { line: 6, annotation: "Row i=3", memory: [{variable: "n", type: "int", value: "3"}, {variable: "i", type: "int", value: "3"}], output: "  1 \n 1 2 \n" },
                  { line: 7, annotation: "Print spaces: 3-3 = 0 spaces", memory: [{variable: "j", type: "int", value: "1"}], output: "  1 \n 1 2 \n" },
                  { line: 10, annotation: "Print numbers up to i=3", memory: [{variable: "j", type: "int", value: "1"}], output: "  1 \n 1 2 \n1 2 3 " },
                  { line: 13, annotation: "Newline", memory: [], output: "  1 \n 1 2 \n1 2 3 \n" },
                  { line: 6, annotation: "Loop finishes (i=4 > 3)", memory: [], output: "  1 \n 1 2 \n1 2 3 \n" },
                  { line: 15, annotation: "Program terminates", memory: [], output: "  1 \n 1 2 \n1 2 3 \n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 7",
        objective: "1D array definition, initialization, linear search",
        tutorial: "Tutorial 7: 1D Arrays",
        labTitle: "Lab 7: Array manipulation",
        experiments: [
          {
            id: "c-w7-1",
            title: "Min and Max of Array",
            desc: "Find minimum and maximum in 1D array.",
            expected: "Min: 1  Max: 9",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept n integers into a 1D array and find the minimum and maximum elements using a single traversal loop. The student will:",
                bullets: [
                  "Declare and initialise a 1D integer array of fixed maximum size",
                  "Accept n elements from the user into the array using a for loop",
                  "Initialise min and max to the first element of the array",
                  "Traverse the array comparing each element to update min and max",
                  "Use printf() to display the minimum and maximum values found"
                ]
              },
              theory: [
                {
                  title: "Kid-Friendly Addition",
                  body: [`### 📏 The Tallest Student in Line!
Imagine a gym teacher trying to find the tallest student in a lineup. The teacher starts by pointing at the very first student and saying, \"You are the tallest so far!\" Then, the teacher walks down the line, comparing everyone to that student. Anytime the teacher finds someone even taller, they point to the new student instead. By the end of the line, the person being pointed to is guaranteed to be the tallest in the class (the Maximum)!

![Line of students](https://labviewwiki.org/w/images/2/28/Array_Max_and_Min_-_Terminals.webp)`]
                },
                {
                  title: "1D Array",
                  body: ["A one-dimensional array is a contiguous block of memory storing elements of the same data type, accessed via an index starting at 0:", "int arr[100]; declares an array of 100 integers", "arr[0] = 10; assigns 10 to the first element", "arr[n-1] is the last valid element for an array of size n"]
                },
                {
                  title: "Array Initialisation and Input",
                  body: ["for (i = 0; i < n; i++) scanf(\"%d\", &arr[i]);", "Each element is read from standard input using its address &arr[i]."]
                },
                {
                  title: "Finding Min and Max",
                  body: ["Initialise both min and max to the first element arr[0], then iterate from index 1 to n-1, updating as needed:", "min = arr[0]; max = arr[0];\nfor (i = 1; i < n; i++) {\n    if (arr[i] < min) min = arr[i];\n    if (arr[i] > max) max = arr[i];\n}", "This requires exactly one pass through the array — O(n) time complexity."]
                },
                {
                  title: "Why Not Initialise to 0?",
                  body: ["If all elements are negative, initialising min = 0 would incorrectly leave min as 0. Always initialise to arr[0] to handle all input ranges.", "Index Bounds: Valid indices are 0 to n-1. Accessing arr[n] is undefined behaviour."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace how min and max are updated element by element.",
                "Observe that both are initialised to arr[0] and updated only when a new extreme is found.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n followed by n integers — e.g. 5  3 9 1 7 5",
                "Click Run Code. Verify output: Min: 1  Max: 9",
                "Try all-equal arrays like 4 4 4 4 and all-negative arrays like -3 -7 -1 -9. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, min, max;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    min = arr[0];\n    max = arr[0];\n    for (i = 1; i < n; i++) {\n        if (arr[i] < min) min = arr[i];\n        if (arr[i] > max) max = arr[i];\n    }\n    printf(\"Min: %d  Max: %d\\n\", min, max);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "?"}, {variable: "min", type: "int", value: "?"}, {variable: "max", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf reads n=5", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 7, annotation: "Read array elements: 3 9 1 7 5", memory: [{variable: "arr", type: "int[]", value: "{3, 9, 1, 7, 5}"}, {variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 10, annotation: "Initialise min = arr[0]", memory: [{variable: "arr", type: "int[]", value: "{3, 9, 1, 7, 5}"}, {variable: "min", type: "int", value: "3"}], output: "" },
                  { line: 11, annotation: "Initialise max = arr[0]", memory: [{variable: "arr", type: "int[]", value: "{3, 9, 1, 7, 5}"}, {variable: "min", type: "int", value: "3"}, {variable: "max", type: "int", value: "3"}], output: "" },
                  { line: 12, annotation: "Loop i=1 to 4", memory: [{variable: "i", type: "int", value: "1"}, {variable: "min", type: "int", value: "3"}, {variable: "max", type: "int", value: "3"}], output: "" },
                  { line: 13, annotation: "i=1, arr[1]=9, 9<3 false", memory: [{variable: "i", type: "int", value: "1"}, {variable: "min", type: "int", value: "3"}, {variable: "max", type: "int", value: "3"}], output: "" },
                  { line: 14, annotation: "i=1, 9>3 true -> max = 9", memory: [{variable: "i", type: "int", value: "1"}, {variable: "min", type: "int", value: "3"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 13, annotation: "i=2, arr[2]=1, 1<3 true -> min = 1", memory: [{variable: "i", type: "int", value: "2"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 14, annotation: "i=2, 1>9 false", memory: [{variable: "i", type: "int", value: "2"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 13, annotation: "i=3, arr[3]=7, 7<1 false", memory: [{variable: "i", type: "int", value: "3"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 14, annotation: "i=3, 7>9 false", memory: [{variable: "i", type: "int", value: "3"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 13, annotation: "i=4, arr[4]=5, 5<1 false", memory: [{variable: "i", type: "int", value: "4"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 14, annotation: "i=4, 5>9 false", memory: [{variable: "i", type: "int", value: "4"}, {variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "" },
                  { line: 16, annotation: "printf output", memory: [{variable: "min", type: "int", value: "1"}, {variable: "max", type: "int", value: "9"}], output: "Min: 1  Max: 9\n" },
                  { line: 18, annotation: "Program terminates", memory: [], output: "Min: 1  Max: 9\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w7-2",
            title: "Linear Search",
            desc: "Search for an element in a 1D array.",
            expected: "Element found / Not found",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept n integers into a 1D array and search for a target element using the linear search algorithm. The student will:",
                bullets: [
                  "Declare and use a 1D integer array to store input elements",
                  "Accept a target value from the user to search for",
                  "Implement linear search by traversing the array from index 0 to n-1",
                  "Use a flag variable or break to record the first occurrence index",
                  "Display whether the element was found and at which index (1-based or 0-based)",
                  "Analyse the best-case, worst-case, and average-case complexity of linear search"
                ]
              },
              theory: [
                {
                  title: "Kid-Friendly Addition",
                  body: [`### 🔑 The Lost Locker Key!
Oh no, you dropped your house key inside one of the school lockers, but you don't remember which one! Since you don't know where it is, you have to open Locker 1 and check. Not there? Open Locker 2 and check. Not there? Open Locker 3... You keep doing this one-by-one until you either find the key, or run out of lockers! This step-by-step checking is called a \"Linear Search\".

![Row of lockers](https://dsavisualizer.in/og/searching/linearSearch.webp)`]
                },
                {
                  title: "Linear Search Algorithm",
                  body: ["Sequentially checks each element of the array from the first to the last until the target is found or the array is exhausted.", "for (i = 0; i < n; i++) { if (arr[i] == key) { found = 1; pos = i; break; } }"]
                },
                {
                  title: "Complexity Analysis",
                  body: ["Best Case: Target is the first element: O(1) — one comparison.", "Worst Case: Target is the last element or not present: O(n) — n comparisons.", "Average Case: Target is somewhere in the middle on average: O(n/2) = O(n)."]
                },
                {
                  title: "Flag and Position Variables",
                  body: ["found = 0; initialised to 'not found' before the loop.", "pos = -1; -1 conventionally means 'not found' for an index.", "After the loop, if found == 1, pos holds the index of the first occurrence."]
                },
                {
                  title: "break Statement and Array State",
                  body: ["Exits the loop immediately when the target is found, avoiding unnecessary further comparisons.", "Linear search works on both sorted and unsorted arrays, unlike binary search (which requires a sorted array)."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the search for a target in a sample array.",
                "Observe how the loop advances index by index and stops at the first match.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n, then n integers, then the key — e.g. 5  10 30 20 50 40  20",
                "Click Run Code. Verify output: Element 20 found at index 2 (0-based)",
                "Try a key that is not in the array and a key that appears multiple times. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, key, found = 0, pos = -1;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    scanf(\"%d\", &key);\n    for (i = 0; i < n; i++) {\n        if (arr[i] == key) {\n            found = 1;\n            pos = i;\n            break;\n        }\n    }\n    if (found) printf(\"Element %d found at index %d (0-based)\\n\", key, pos);\n    else printf(\"Element not found\\n\");\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "?"}, {variable: "key", type: "int", value: "?"}, {variable: "found", type: "int", value: "0"}, {variable: "pos", type: "int", value: "-1"}], output: "" },
                  { line: 6, annotation: "scanf reads n=5", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 7, annotation: "Read array elements: 10 30 20 50 40", memory: [{variable: "arr", type: "int[]", value: "{10, 30, 20, 50, 40}"}], output: "" },
                  { line: 10, annotation: "scanf reads key=20", memory: [{variable: "arr", type: "int[]", value: "{10, 30, 20, 50, 40}"}, {variable: "key", type: "int", value: "20"}], output: "" },
                  { line: 11, annotation: "Loop i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "i=0, arr[0]=10, 10==20 false", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "Loop i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 12, annotation: "i=1, arr[1]=30, 30==20 false", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 11, annotation: "Loop i=2", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 12, annotation: "i=2, arr[2]=20, 20==20 true", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 13, annotation: "found = 1", memory: [{variable: "found", type: "int", value: "1"}], output: "" },
                  { line: 14, annotation: "pos = 2", memory: [{variable: "pos", type: "int", value: "2"}], output: "" },
                  { line: 15, annotation: "break exits loop", memory: [], output: "" },
                  { line: 18, annotation: "if(found) is true, printf output", memory: [], output: "Element 20 found at index 2 (0-based)\n" },
                  { line: 21, annotation: "Program terminates", memory: [], output: "Element 20 found at index 2 (0-based)\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w7-3",
            title: "Reverse Array",
            desc: "Reverse the elements of a 1D array.",
            expected: "Reversed array",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept n integers into a 1D array and reverse the array in-place using a two-pointer swapping technique. The student will:",
                bullets: [
                  "Declare and use a 1D integer array and a temporary swap variable",
                  "Accept n elements from the user into the array",
                  "Implement in-place reversal by swapping arr[left] and arr[right] while advancing left forward and right backward until they meet",
                  "Print both the original and reversed array using a for loop",
                  "Understand the difference between in-place reversal and copying to a second array"
                ]
              },
              theory: [
                {
                  title: "Kid-Friendly Addition",
                  body: [`### 🥞 Flipping the Pancake Stack!
Reversing an array is like flipping a whole stack of pancakes upside down! The pancake at the very top swaps places with the pancake at the very bottom. Then, the second pancake from the top swaps with the second from the bottom. You keep swapping the opposite ends until you meet right in the middle!

![Pancakes flipping](https://www.tutorialspoint.com/python/images/reverse_array_operation_python.webp)`]
                },
                {
                  title: "Array Reversal",
                  body: ["Reversing an array means placing its elements in the opposite order: Original : {1, 2, 3, 4, 5} -> Reversed : {5, 4, 3, 2, 1}"]
                },
                {
                  title: "Two-Pointer In-Place Technique",
                  body: ["Use two index variables, left starting at 0 and right starting at n-1. Swap the elements at these positions, then move left forward and right backward.", "Repeat until left >= right:\nwhile (left < right) {\n    temp = arr[left];\n    arr[left] = arr[right];\n    arr[right] = temp;\n    left++; right--;\n}"]
                },
                {
                  title: "Number of Swaps and Temporary Variable",
                  body: ["For n elements, exactly floor(n/2) swaps are performed. n = 5 : 2 swaps.", "A temp variable is required for swapping to avoid overwriting a value before it can be saved."]
                },
                {
                  title: "In-Place vs Second Array",
                  body: ["In-place reversal uses O(1) extra space (only temp). Copying to a second array uses O(n) extra space — wasteful for large arrays.", "Time Complexity: O(n): each element is moved at most once."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the swap steps for array {1, 2, 3, 4, 5}.",
                "Observe how left and right converge toward the centre with each swap.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 5  1 2 3 4 5",
                "Click Run Code. Verify output: Reversed: 5 4 3 2 1",
                "Try even-sized arrays, single-element arrays, and already-reversed arrays. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, left, right, temp;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    left = 0;\n    right = n - 1;\n    while (left < right) {\n        temp = arr[left];\n        arr[left] = arr[right];\n        arr[right] = temp;\n        left++;\n        right--;\n    }\n    printf(\"Reversed: \");\n    for (i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf reads n=5", memory: [{variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 7, annotation: "Read array elements: 1 2 3 4 5", memory: [{variable: "arr", type: "int[]", value: "{1, 2, 3, 4, 5}"}], output: "" },
                  { line: 10, annotation: "left = 0", memory: [{variable: "left", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "right = 4", memory: [{variable: "right", type: "int", value: "4"}], output: "" },
                  { line: 12, annotation: "while left < right (0 < 4)", memory: [], output: "" },
                  { line: 13, annotation: "Swap arr[0] and arr[4]", memory: [{variable: "temp", type: "int", value: "1"}], output: "" },
                  { line: 14, annotation: "arr[0] = 5", memory: [{variable: "arr", type: "int[]", value: "{5, 2, 3, 4, 5}"}], output: "" },
                  { line: 15, annotation: "arr[4] = 1", memory: [{variable: "arr", type: "int[]", value: "{5, 2, 3, 4, 1}"}], output: "" },
                  { line: 16, annotation: "left++", memory: [{variable: "left", type: "int", value: "1"}], output: "" },
                  { line: 17, annotation: "right--", memory: [{variable: "right", type: "int", value: "3"}], output: "" },
                  { line: 12, annotation: "while left < right (1 < 3)", memory: [], output: "" },
                  { line: 13, annotation: "Swap arr[1] and arr[3]", memory: [{variable: "temp", type: "int", value: "2"}], output: "" },
                  { line: 14, annotation: "arr[1] = 4", memory: [{variable: "arr", type: "int[]", value: "{5, 4, 3, 4, 1}"}], output: "" },
                  { line: 15, annotation: "arr[3] = 2", memory: [{variable: "arr", type: "int[]", value: "{5, 4, 3, 2, 1}"}], output: "" },
                  { line: 16, annotation: "left++", memory: [{variable: "left", type: "int", value: "2"}], output: "" },
                  { line: 17, annotation: "right--", memory: [{variable: "right", type: "int", value: "2"}], output: "" },
                  { line: 12, annotation: "while left < right (2 < 2) false -> Exit loop", memory: [], output: "" },
                  { line: 19, annotation: "Print reversed array", memory: [], output: "Reversed: 5 4 3 2 1 \n" },
                  { line: 24, annotation: "Program terminates", memory: [], output: "Reversed: 5 4 3 2 1 \n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w7-4",
            title: "Remove Duplicates",
            desc: "Remove duplicate elements from an array.",
            expected: "Unique: 1 3 2 5  New size: 4",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept n integers into a 1D array and remove all duplicate elements, retaining only the first occurrence of each value, then display the resulting array and its new size. The student will:",
                bullets: [
                  "Declare and use 1D integer arrays for input and output",
                  "Use nested loops to compare each element against all previously accepted elements",
                  "Use a flag variable to decide whether to include the current element",
                  "Build a result array containing only unique elements",
                  "Print the deduplicated array and its size using printf()"
                ]
              },
              theory: [
                {
                  title: "Kid-Friendly Addition",
                  body: [`### 🃏 Sorting a Trading Card Collection!
Imagine you buy a pack of Pokémon cards and get three Pikachus. When you put them in your special display binder, you only want to show *one* Pikachu card to keep your collection unique. You keep the first one, and throw the duplicates away! In an array, removing duplicates means shifting all the unique items to the front, and ignoring the repeats.

![Trading cards](https://www.devscall.com/_next/image?url=https:%2F%2Fcdn.sanity.io%2Fimages%2Fq5upm53j%2Fproduction%2F22798cd73f702208d7e73fe633f246852bcdbc9b-1381x407.webp%3Ffit%3Dmax%26auto%3Dformat&w=1920&q=75)`]
                },
                {
                  title: "Duplicate Element",
                  body: ["An element is a duplicate if the same value has already appeared at an earlier index in the array."]
                },
                {
                  title: "Nested Loop Approach",
                  body: ["For each element arr[i], check whether it has already appeared in arr[0..i-1]. If not, include it in the result.", "j = 0;\nfor (i = 0; i < n; i++) {\n    isDuplicate = 0;\n    for (k = 0; k < i; k++) { if (arr[k] == arr[i]) { isDuplicate = 1; break; } }\n    if (!isDuplicate) result[j++] = arr[i];\n}"]
                },
                {
                  title: "Flag Variable and Result Size",
                  body: ["isDuplicate is initialised to 0 before the inner loop. If any earlier element matches arr[i], isDuplicate is set to 1 and the inner loop breaks early. Only elements with isDuplicate == 0 are copied to result.", "j counts the number of unique elements added. After the loop, j holds the new size of the deduplicated array."]
                },
                {
                  title: "Complexity",
                  body: ["Time Complexity: O(n²): for each of the n elements, up to n-1 earlier elements are checked.", "Space Complexity: O(n): the result array uses at most n slots."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the nested loop for array {1, 3, 2, 3, 1, 5}.",
                "Observe how each element is checked against all previous elements before being added.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 6  1 3 2 3 1 5",
                "Click Run Code. Verify output: Unique: 1 3 2 5  New size: 4",
                "Try all-unique arrays, all-duplicate arrays, and single-element arrays. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int arr[100], result[100];\n    int n, i, k, j = 0, isDuplicate;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    for (i = 0; i < n; i++) {\n        isDuplicate = 0;\n        for (k = 0; k < i; k++) {\n            if (arr[k] == arr[i]) {\n                isDuplicate = 1;\n                break;\n            }\n        }\n        if (!isDuplicate) {\n            result[j++] = arr[i];\n        }\n    }\n    printf(\"Unique: \");\n    for (i = 0; i < j; i++) {\n        printf(\"%d \", result[i]);\n    }\n    printf(\" New size: %d\\n\", j);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "j", type: "int", value: "0"}, {variable: "n", type: "int", value: "?"}], output: "" },
                  { line: 6, annotation: "scanf reads n=6", memory: [{variable: "n", type: "int", value: "6"}], output: "" },
                  { line: 7, annotation: "Read array elements: 1 3 2 3 1 5", memory: [{variable: "arr", type: "int[]", value: "{1, 3, 2, 3, 1, 5}"}], output: "" },
                  { line: 10, annotation: "Loop i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop k=0 < 0 (false)", memory: [], output: "" },
                  { line: 18, annotation: "Add arr[0] to result", memory: [{variable: "result", type: "int[]", value: "{1, ...}"}, {variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "Loop i=1 (val 3)", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop k=0 (arr[0]=1 != 3)", memory: [], output: "" },
                  { line: 18, annotation: "Add arr[1] to result", memory: [{variable: "result", type: "int[]", value: "{1, 3, ...}"}, {variable: "j", type: "int", value: "2"}], output: "" },
                  { line: 10, annotation: "Loop i=2 (val 2)", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop k=0,1 (no match)", memory: [], output: "" },
                  { line: 18, annotation: "Add arr[2] to result", memory: [{variable: "result", type: "int[]", value: "{1, 3, 2, ...}"}, {variable: "j", type: "int", value: "3"}], output: "" },
                  { line: 10, annotation: "Loop i=3 (val 3)", memory: [{variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop matches at k=1 (arr[1]=3)", memory: [], output: "" },
                  { line: 14, annotation: "isDuplicate = 1, break", memory: [{variable: "isDuplicate", type: "int", value: "1"}], output: "" },
                  { line: 17, annotation: "Skip adding to result", memory: [], output: "" },
                  { line: 10, annotation: "Loop i=4 (val 1)", memory: [{variable: "i", type: "int", value: "4"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop matches at k=0 (arr[0]=1)", memory: [], output: "" },
                  { line: 14, annotation: "isDuplicate = 1, break", memory: [{variable: "isDuplicate", type: "int", value: "1"}], output: "" },
                  { line: 17, annotation: "Skip adding to result", memory: [], output: "" },
                  { line: 10, annotation: "Loop i=5 (val 5)", memory: [{variable: "i", type: "int", value: "5"}], output: "" },
                  { line: 11, annotation: "isDuplicate = 0", memory: [{variable: "isDuplicate", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "Inner loop k=0..4 (no match)", memory: [], output: "" },
                  { line: 18, annotation: "Add arr[5] to result", memory: [{variable: "result", type: "int[]", value: "{1, 3, 2, 5, ...}"}, {variable: "j", type: "int", value: "4"}], output: "" },
                  { line: 22, annotation: "Print result", memory: [], output: "Unique: 1 3 2 5  New size: 4\n" },
                  { line: 28, annotation: "Program terminates", memory: [], output: "Unique: 1 3 2 5  New size: 4\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 8",
        objective: "2D arrays, string operations, bubble sort",
        tutorial: "Tutorial 8: Matrices, Strings, Sorting",
        labTitle: "Lab 8: 2D Arrays and Strings",
        experiments: [
          {
            id: "c-w8-1",
            title: "Matrix Addition",
            desc: "Add two matrices.",
            expected: "Result matrix",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept two matrices of the same dimensions from the user, compute their sum element-wise, and display the result matrix. The student will:",
                bullets: [
                  "Declare and initialise 2D integer arrays for two input matrices and one result matrix",
                  "Accept matrix dimensions (rows and columns) from the user",
                  "Use nested for loops to read elements into both matrices",
                  "Compute the sum matrix by adding corresponding elements",
                  "Use nested for loops with printf() to display the result in matrix format"
                ]
              },
              theory: [
                {
                  title: "Kid-Friendly Addition",
                  body: [`### 🍕 The Double-Decker Pizza Grid!
Imagine you have two square pizza boxes (Matrix A and Matrix B), and both are sliced into a perfect 3x3 grid. To add these matrices together, you don't do anything crazy—you just stack them! The slice in the top-left corner of Box A gets added to the slice in the top-left corner of Box B. You just add the matching spots together. It's that simple!

![Pizza grid](https://media.geeksforgeeks.org/wp-content/uploads/20250621093907095324/addition_of_matrices.webp)`]
                },
                {
                  title: "2D Array Declaration",
                  body: ["A two-dimensional array in C is declared as: int A[10][10];", "It stores elements in row-major order. Element at row i, column j is accessed as A[i][j]. Row indices run from 0 to rows-1; column indices from 0 to cols-1."]
                },
                {
                  title: "Matrix Addition",
                  body: ["Two matrices A and B of the same dimensions (m × n) can be added. The result matrix C is computed element-wise: C[i][j] = A[i][j] + B[i][j]", "Matrices of different dimensions cannot be added."]
                },
                {
                  title: "Nested Loop Structure",
                  body: ["Two nested loops traverse all elements:\nfor (i = 0; i < rows; i++) {\n    for (j = 0; j < cols; j++) {\n        C[i][j] = A[i][j] + B[i][j];\n    }\n}", "The outer loop iterates over rows; the inner loop iterates over columns."]
                },
                {
                  title: "Printing a Matrix",
                  body: ["Use nested loops and \\n after each row. %4d right-aligns numbers in a 4-character wide field for neat output.", "Time Complexity: O(m × n). Space Complexity: O(m × n)."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace element-wise addition for two 2×2 matrices.",
                "Observe how C[i][j] = A[i][j] + B[i][j] is computed for each position.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter rows, cols, then matrix A row by row, then matrix B row by row (e.g. 2 2  1 2 3 4  5 6 7 8).",
                "Click Run Code. Verify result matrix.",
                "Try non-square matrices (2×3) and matrices containing negative values. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int A[10][10], B[10][10], C[10][10];\n    int rows, cols, i, j;\n    scanf(\"%d %d\", &rows, &cols);\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            scanf(\"%d\", &A[i][j]);\n        }\n    }\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            scanf(\"%d\", &B[i][j]);\n        }\n    }\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            C[i][j] = A[i][j] + B[i][j];\n        }\n    }\n    printf(\"Result:\\n\");\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            printf(\"%4d\", C[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate matrix variables A, B, C", memory: [{variable: "rows", type: "int", value: "?"}, {variable: "cols", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf reads dimensions (e.g., 2 2)", memory: [{variable: "rows", type: "int", value: "2"}, {variable: "cols", type: "int", value: "2"}], output: "" },
                  { line: 9, annotation: "Read Matrix A elements (1 2 3 4)", memory: [{variable: "A", type: "int[][]", value: "{{1, 2}, {3, 4}}"}], output: "" },
                  { line: 14, annotation: "Read Matrix B elements (5 6 7 8)", memory: [{variable: "B", type: "int[][]", value: "{{5, 6}, {7, 8}}"}], output: "" },
                  { line: 17, annotation: "Start Addition outer loop i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 18, annotation: "Inner loop j=0", memory: [{variable: "i", type: "int", value: "0"}, {variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "C[0][0] = A[0][0] + B[0][0] = 1 + 5 = 6", memory: [{variable: "C[0][0]", type: "int", value: "6"}], output: "" },
                  { line: 18, annotation: "Inner loop j=1", memory: [{variable: "i", type: "int", value: "0"}, {variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 19, annotation: "C[0][1] = A[0][1] + B[0][1] = 2 + 6 = 8", memory: [{variable: "C[0][1]", type: "int", value: "8"}], output: "" },
                  { line: 17, annotation: "Outer loop i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 18, annotation: "Inner loop j=0", memory: [{variable: "i", type: "int", value: "1"}, {variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "C[1][0] = A[1][0] + B[1][0] = 3 + 7 = 10", memory: [{variable: "C[1][0]", type: "int", value: "10"}], output: "" },
                  { line: 18, annotation: "Inner loop j=1", memory: [{variable: "i", type: "int", value: "1"}, {variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 19, annotation: "C[1][1] = A[1][1] + B[1][1] = 4 + 8 = 12", memory: [{variable: "C[1][1]", type: "int", value: "12"}], output: "" },
                  { line: 22, annotation: "Start printing", memory: [], output: "Result:\n" },
                  { line: 25, annotation: "Print row 0", memory: [], output: "Result:\n   6   8" },
                  { line: 27, annotation: "Newline after row 0", memory: [], output: "Result:\n   6   8\n" },
                  { line: 25, annotation: "Print row 1", memory: [], output: "Result:\n   6   8\n  10  12" },
                  { line: 27, annotation: "Newline after row 1", memory: [], output: "Result:\n   6   8\n  10  12\n" },
                  { line: 29, annotation: "Program terminates", memory: [], output: "Result:\n   6   8\n  10  12\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w8-2",
            title: "Matrix Multiplication",
            desc: "Multiply two matrices.",
            expected: "Product matrix",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept two matrices from the user and compute their product using three nested loops. The student will:",
                bullets: [
                  "Declare and initialise 2D integer arrays for two input matrices and the result matrix",
                  "Validate that the number of columns of A equals the number of rows of B",
                  "Implement the three-loop matrix multiplication algorithm",
                  "Initialise each C[i][j] to 0 before accumulating the dot product",
                  "Display the result matrix using nested loops and printf()"
                ]
              },
              theory: [
                {
                  title: "Kid-Friendly Addition",
                  body: [`### 🏭 The Factory Assembly Line!
Matrix multiplication is NOT like addition. It's a complex, choreographed dance! Instead of just matching spots, the workers on the conveyor belt (a Row in Matrix A) have to high-five every single worker going up the elevator (a Column in Matrix B). You multiply them one-by-one and add up all the high-fives to get a single number for the new matrix. It's a Row-by-Column collision!

![Assembly line](https://i.ytimg.com/vi/2spTnAiQg4M/maxresdefault.webp)`]
                },
                {
                  title: "Matrix Multiplication Condition",
                  body: ["A matrix A of size m × p can be multiplied by a matrix B of size p × n only if the number of columns of A equals the number of rows of B (both equal p). The result C is of size m × n."]
                },
                {
                  title: "Formula",
                  body: ["Each element C[i][j] is the dot product of row i of A and column j of B:", "C[i][j] = Σ A[i][k] * B[k][j]   for k = 0 to p-1"]
                },
                {
                  title: "Three-Loop Algorithm",
                  body: ["for (i = 0; i < m; i++)\n    for (j = 0; j < n; j++) {\n        C[i][j] = 0;\n        for (k = 0; k < p; k++)\n            C[i][j] += A[i][k] * B[k][j];\n    }"]
                },
                {
                  title: "Initialisation of C",
                  body: ["Each C[i][j] must be set to 0 before the innermost loop adds to it. Failing to initialise causes garbage values to corrupt the result.", "Time Complexity: O(m × p × n). Space Complexity: O(m × n)."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the dot product computation for C[0][0] and C[0][1].",
                "Observe how the k loop accumulates A[i][k] * B[k][j] into C[i][j].",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "Enter m, p, n, then matrix A (m×p), then matrix B (p×n).",
                "Click Run Code. Verify result: C = {{19,22},{43,50}}",
                "Try a 2×3 multiplied by 3×2 and attempt an invalid multiplication to test the check. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int A[10][10], B[10][10], C[10][10];\n    int m, p, n, i, j, k;\n    scanf(\"%d %d %d\", &m, &p, &n);\n    for (i = 0; i < m; i++) {\n        for (j = 0; j < p; j++) {\n            scanf(\"%d\", &A[i][j]);\n        }\n    }\n    for (i = 0; i < p; i++) {\n        for (j = 0; j < n; j++) {\n            scanf(\"%d\", &B[i][j]);\n        }\n    }\n    for (i = 0; i < m; i++) {\n        for (j = 0; j < n; j++) {\n            C[i][j] = 0;\n            for (k = 0; k < p; k++) {\n                C[i][j] += A[i][k] * B[k][j];\n            }\n        }\n    }\n    printf(\"Result:\\n\");\n    for (i = 0; i < m; i++) {\n        for (j = 0; j < n; j++) {\n            printf(\"%4d\", C[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate matrices and variables", memory: [{variable: "m", type: "int", value: "?"}, {variable: "p", type: "int", value: "?"}, {variable: "n", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf reads dimensions (2 2 2)", memory: [{variable: "m", type: "int", value: "2"}, {variable: "p", type: "int", value: "2"}, {variable: "n", type: "int", value: "2"}], output: "" },
                  { line: 9, annotation: "Read Matrix A (1 2 3 4)", memory: [{variable: "A", type: "int[][]", value: "{{1, 2}, {3, 4}}"}], output: "" },
                  { line: 14, annotation: "Read Matrix B (5 6 7 8)", memory: [{variable: "B", type: "int[][]", value: "{{5, 6}, {7, 8}}"}], output: "" },
                  { line: 17, annotation: "Outer loop i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 18, annotation: "Mid loop j=0", memory: [{variable: "i", type: "int", value: "0"}, {variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "C[0][0] = 0", memory: [{variable: "C[0][0]", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "Inner loop k=0, k=1", memory: [{variable: "C[0][0]", type: "int", value: "19"}], output: "" },
                  { line: 18, annotation: "Mid loop j=1", memory: [{variable: "i", type: "int", value: "0"}, {variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 19, annotation: "C[0][1] = 0", memory: [{variable: "C[0][1]", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "Inner loop k=0, k=1", memory: [{variable: "C[0][1]", type: "int", value: "22"}], output: "" },
                  { line: 17, annotation: "Outer loop i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 18, annotation: "Mid loop j=0", memory: [{variable: "i", type: "int", value: "1"}, {variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "C[1][0] = 0", memory: [{variable: "C[1][0]", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "Inner loop k=0, k=1", memory: [{variable: "C[1][0]", type: "int", value: "43"}], output: "" },
                  { line: 18, annotation: "Mid loop j=1", memory: [{variable: "i", type: "int", value: "1"}, {variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 19, annotation: "C[1][1] = 0", memory: [{variable: "C[1][1]", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "Inner loop k=0, k=1", memory: [{variable: "C[1][1]", type: "int", value: "50"}], output: "" },
                  { line: 25, annotation: "Print Result", memory: [], output: "Result:\n" },
                  { line: 28, annotation: "Print row 0", memory: [], output: "Result:\n  19  22" },
                  { line: 30, annotation: "Newline after row 0", memory: [], output: "Result:\n  19  22\n" },
                  { line: 28, annotation: "Print row 1", memory: [], output: "Result:\n  19  22\n  43  50" },
                  { line: 30, annotation: "Newline after row 1", memory: [], output: "Result:\n  19  22\n  43  50\n" },
                  { line: 32, annotation: "Program terminates", memory: [], output: "Result:\n  19  22\n  43  50\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w8-3",
            title: "Bubble Sort",
            desc: "Sort an array using bubble sort.",
            expected: "Sorted array",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept n integers into a 1D array and sort them in ascending order using the Bubble Sort algorithm. The student will:",
                bullets: [
                  "Declare and use a 1D integer array and a temporary swap variable",
                  "Implement the standard two-loop Bubble Sort",
                  "Apply an early-termination optimisation using a swapped flag",
                  "Print the array before and after sorting using a for loop",
                  "Analyse best-case, worst-case, and average-case time complexity of Bubble Sort"
                ]
              },
              theory: [
                {
                  title: "Kid-Friendly Addition",
                  body: [`### 🫧 Bubbles Rising in a Soda!
When you pour a glass of soda, the biggest, heaviest bubbles always float to the top first. That's exactly how Bubble Sort works! We compare two numbers side-by-side. If the left one is heavier (larger), they swap places. The heavy numbers slowly \"bubble\" their way to the far right end of the array, one by one, until everyone is standing in the perfect order!

![Bubble sort visualization](https://favtutor.com/resources/images/uploads/mceu_61632030011682402256084.webp)`]
                },
                {
                  title: "Bubble Sort Algorithm",
                  body: ["Repeatedly steps through the array comparing adjacent elements and swapping them if they are in the wrong order. Larger elements \"bubble\" toward the end with each pass."]
                },
                {
                  title: "Standard Two-Loop Implementation",
                  body: ["for (i = 0; i < n-1; i++) {\n    for (j = 0; j < n-1-i; j++) {\n        if (arr[j] > arr[j+1]) {\n            temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;\n        }\n    }\n}", "After pass i, the largest i+1 elements are in their final positions at the end."]
                },
                {
                  title: "Early Termination Optimisation",
                  body: ["Add a swapped flag. If no swap occurred in a full pass, the array is already sorted and the outer loop exits early:", "swapped = 0;\nfor (j = 0; j < n-1-i; j++) {\n    if (arr[j] > arr[j+1]) { swap; swapped = 1; }\n}\nif (!swapped) break;"]
                },
                {
                  title: "Complexity and Stability",
                  body: ["Worst/Average case: O(n²). Best case (already sorted): O(n) with early termination.", "Space Complexity: O(1). Stability: Bubble Sort is stable (equal elements retain order)."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace each pass of Bubble Sort on array {5, 3, 1, 4, 2}.",
                "Observe how the largest unsorted element reaches its final position after each pass.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 5  5 3 1 4 2",
                "Click Run Code. Verify output: Sorted: 1 2 3 4 5",
                "Try an already-sorted array to verify early termination, and a reverse-sorted array. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    int arr[100];\n    int n, i, j, temp, swapped;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    for (i = 0; i < n - 1; i++) {\n        swapped = 0;\n        for (j = 0; j < n - 1 - i; j++) {\n            if (arr[j] > arr[j+1]) {\n                temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n                swapped = 1;\n            }\n        }\n        if (!swapped) break;\n    }\n    printf(\"Sorted: \");\n    for (i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio library", memory: [], output: "" },
                  { line: 4, annotation: "Allocate variables", memory: [{variable: "arr", type: "int[]", value: "size 100"}, {variable: "n", type: "int", value: "?"}], output: "" },
                  { line: 5, annotation: "scanf reads n=5", memory: [{variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 7, annotation: "Read elements: 5 3 1 4 2", memory: [{variable: "arr", type: "int[]", value: "{5, 3, 1, 4, 2}"}], output: "" },
                  { line: 9, annotation: "Pass i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 10, annotation: "swapped = 0", memory: [{variable: "swapped", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "Inner loop j=0 to 3", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "arr[0]>arr[1] (5>3) -> Swap", memory: [{variable: "arr", type: "int[]", value: "{3, 5, 1, 4, 2}"}, {variable: "swapped", type: "int", value: "1"}], output: "" },
                  { line: 12, annotation: "arr[1]>arr[2] (5>1) -> Swap", memory: [{variable: "j", type: "int", value: "1"}, {variable: "arr", type: "int[]", value: "{3, 1, 5, 4, 2}"}], output: "" },
                  { line: 12, annotation: "arr[2]>arr[3] (5>4) -> Swap", memory: [{variable: "j", type: "int", value: "2"}, {variable: "arr", type: "int[]", value: "{3, 1, 4, 5, 2}"}], output: "" },
                  { line: 12, annotation: "arr[3]>arr[4] (5>2) -> Swap", memory: [{variable: "j", type: "int", value: "3"}, {variable: "arr", type: "int[]", value: "{3, 1, 4, 2, 5}"}], output: "" },
                  { line: 19, annotation: "Pass 0 ends. swapped=1", memory: [], output: "" },
                  { line: 9, annotation: "Pass i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "swapped = 0", memory: [{variable: "swapped", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "Inner loop j=0 to 2", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "arr[0]>arr[1] (3>1) -> Swap", memory: [{variable: "arr", type: "int[]", value: "{1, 3, 4, 2, 5}"}, {variable: "swapped", type: "int", value: "1"}], output: "" },
                  { line: 12, annotation: "arr[1]>arr[2] (3>4) -> No swap", memory: [{variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 12, annotation: "arr[2]>arr[3] (4>2) -> Swap", memory: [{variable: "j", type: "int", value: "2"}, {variable: "arr", type: "int[]", value: "{1, 3, 2, 4, 5}"}], output: "" },
                  { line: 9, annotation: "Pass i=2", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 10, annotation: "swapped = 0", memory: [{variable: "swapped", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "Inner loop j=0 to 1", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "arr[0]>arr[1] (1>3) -> No swap", memory: [], output: "" },
                  { line: 12, annotation: "arr[1]>arr[2] (3>2) -> Swap", memory: [{variable: "j", type: "int", value: "1"}, {variable: "arr", type: "int[]", value: "{1, 2, 3, 4, 5}"}, {variable: "swapped", type: "int", value: "1"}], output: "" },
                  { line: 9, annotation: "Pass i=3", memory: [{variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 10, annotation: "swapped = 0", memory: [{variable: "swapped", type: "int", value: "0"}], output: "" },
                  { line: 11, annotation: "Inner loop j=0 to 0", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 12, annotation: "arr[0]>arr[1] (1>2) -> No swap", memory: [], output: "" },
                  { line: 19, annotation: "swapped=0 -> break (Early exit)", memory: [], output: "" },
                  { line: 21, annotation: "Print Sorted array", memory: [], output: "Sorted: 1 2 3 4 5 \n" },
                  { line: 26, annotation: "Program terminates", memory: [], output: "Sorted: 1 2 3 4 5 \n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w8-4",
            title: "String Concatenation",
            desc: "Concatenate two strings without using strcat().",
            expected: "Concatenated string",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept two strings from the user and concatenate the second string to the end of the first without using the library function strcat(), implementing the operation manually with loops. The student will:",
                bullets: [
                  "Declare character arrays (strings) of sufficient size to hold both strings",
                  "Use strlen() to find the lengths of both strings",
                  "Traverse the second string character by character, appending to the first",
                  "Append the null terminator '\\0' after the last copied character",
                  "Display the concatenated result using printf() with %s"
                ]
              },
              theory: [
                {
                  title: "Kid-Friendly Addition",
                  body: [`### 🚂 Connecting the Train Cars!
In C, a word (String) is just a train made out of individual letter boxcars. The very last car is always a special marker called the Null Terminator ('\0'). When we \"concatenate\" two strings, it's like unhooking the caboose of the first train, and hooking the entire second train onto the back to create one giant mega-train!

![String concatenation](https://media.geeksforgeeks.org/wp-content/uploads/20230915112055/StringConcatenation-(1)-(1).webp)`]
                },
                {
                  title: "Strings in C",
                  body: ["A string is a character array terminated by the null character '\\0'.", "char str[50] = \"Hello\"; // stored as: H e l l o \\0", "strlen(\"Hello\") = 5 (the null terminator is not counted)."]
                },
                {
                  title: "Manual Concatenation Algorithm",
                  body: ["len1 = strlen(s1);\nfor (i = 0; s2[i] != '\\0'; i++)\n    s1[len1 + i] = s2[i];\ns1[len1 + i] = '\\0';", "You must explicitly append '\\0' at the end. Without it, printf(\"%s\") will read into undefined memory."]
                },
                {
                  title: "Buffer Size",
                  body: ["s1 must be declared large enough to hold both strings plus '\\0'. Exceeding the buffer causes undefined behaviour (buffer overflow)."]
                },
                {
                  title: "Library Alternative",
                  body: ["strcat(s1, s2); appends s2 to s1, including null terminator automatically.", "strncat(s1, s2, n); safer version that copies at most n characters."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace character-by-character appending of s2 onto s1.",
                "Observe how len1 is used as the starting index and how '\\0' terminates the result.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter two strings on separate lines — e.g. Hello (enter) World",
                "Click Run Code. Verify output: Concatenated: HelloWorld",
                "Try empty strings and longer strings. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[200], s2[100];\n    int len1, i;\n    scanf(\"%s %s\", s1, s2);\n    len1 = strlen(s1);\n    for (i = 0; s2[i] != '\\0'; i++) {\n        s1[len1 + i] = s2[i];\n    }\n    s1[len1 + i] = '\\0';\n    printf(\"Concatenated: %s\\n\", s1);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and string libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate string buffers", memory: [{variable: "s1", type: "char[]", value: "size 200"}, {variable: "s2", type: "char[]", value: "size 100"}], output: "" },
                  { line: 7, annotation: "scanf reads 'Hello' and 'World'", memory: [{variable: "s1", type: "char[]", value: "\"Hello\""}, {variable: "s2", type: "char[]", value: "\"World\""}], output: "" },
                  { line: 8, annotation: "strlen(s1) = 5", memory: [{variable: "s1", type: "char[]", value: "\"Hello\""}, {variable: "len1", type: "int", value: "5"}], output: "" },
                  { line: 9, annotation: "Loop starts (i=0, s2[0]='W')", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 10, annotation: "s1[5] = 'W'", memory: [{variable: "s1", type: "char[]", value: "\"HelloW\""}], output: "" },
                  { line: 9, annotation: "Loop i=1, s2[1]='o'", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 10, annotation: "s1[6] = 'o'", memory: [{variable: "s1", type: "char[]", value: "\"HelloWo\""}], output: "" },
                  { line: 9, annotation: "Loop i=2, s2[2]='r'", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 10, annotation: "s1[7] = 'r'", memory: [{variable: "s1", type: "char[]", value: "\"HelloWor\""}], output: "" },
                  { line: 9, annotation: "Loop i=3, s2[3]='l'", memory: [{variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 10, annotation: "s1[8] = 'l'", memory: [{variable: "s1", type: "char[]", value: "\"HelloWorl\""}], output: "" },
                  { line: 9, annotation: "Loop i=4, s2[4]='d'", memory: [{variable: "i", type: "int", value: "4"}], output: "" },
                  { line: 10, annotation: "s1[9] = 'd'", memory: [{variable: "s1", type: "char[]", value: "\"HelloWorld\""}], output: "" },
                  { line: 9, annotation: "Loop i=5, s2[5]='\\0' -> Exit loop", memory: [{variable: "i", type: "int", value: "5"}], output: "" },
                  { line: 12, annotation: "Append '\\0' to s1", memory: [{variable: "s1", type: "char[]", value: "\"HelloWorld\\0\""}], output: "" },
                  { line: 13, annotation: "printf output", memory: [], output: "Concatenated: HelloWorld\n" },
                  { line: 15, annotation: "Program terminates", memory: [], output: "Concatenated: HelloWorld\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w8-5",
            title: "Reverse String",
            desc: "Reverse a string.",
            expected: "Reversed string",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a string from the user and reverse it in-place using a two-pointer swapping technique, without using any library reversal function. The student will:",
                bullets: [
                  "Declare a character array of sufficient size",
                  "Use strlen() to find the string length and set the two pointer positions",
                  "Swap characters from both ends moving toward the centre using a while loop",
                  "Preserve the null terminator at the end after reversal",
                  "Display the reversed string using printf() with %s"
                ]
              },
              theory: [
                {
                  title: "Kid-Friendly Addition",
                  body: [`### 🪟 Reading Backwards through Glass!
Reversing a string is exactly like reversing an array of numbers. You swap the first letter with the very last letter, the second letter with the second-to-last, and keep squeezing inwards until you meet in the middle. The only trick? You have to make sure you don't accidentally move the '\0' end-of-train marker, otherwise the computer won't know where the word stops!

![Reverse string](https://storage.googleapis.com/algodailyrandomassets/curriculum/easy-strings/reverse-a-string.webp)`]
                },
                {
                  title: "String as Character Array",
                  body: ["A C string is stored as a char array: char str[] = \"Hello\";", "Indices 0 to len-1 hold the characters; index len holds '\\0'."]
                },
                {
                  title: "Two-Pointer Reversal",
                  body: ["Identical to the array reversal technique:", "left = 0; right = strlen(str) - 1;\nwhile (left < right) {\n    temp = str[left]; str[left] = str[right]; str[right] = temp;\n    left++; right--;\n}", "The null terminator at index len is never touched — it stays in place."]
                },
                {
                  title: "Number of Swaps and Null Terminator Safety",
                  body: ["Swaps: floor(len / 2). \"Hello\" (len=5) : 2 swaps.", "strlen() counts only characters before '\\0'. Setting right = strlen(str) - 1 ensures '\\0' is never swapped, preserving string validity."]
                },
                {
                  title: "Palindrome Detection",
                  body: ["Reversing a string and comparing with the original is one method to check if a string is a palindrome. \"madam\" reversed = \"madam\" -> Palindrome.", "Library Alternative: strrev(str) reverses a string in-place (available in some compilers; not in standard C99/C11)."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the swap steps for str = \"Hello\".",
                "Observe how left and right converge and the null terminator remains untouched.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a string — e.g. Hello",
                "Click Run Code. Verify output: Reversed: olleH",
                "Try palindromes like \"madam\" and \"racecar\". Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[100];\n    int left, right;\n    char temp;\n    scanf(\"%s\", str);\n    left = 0;\n    right = strlen(str) - 1;\n    while (left < right) {\n        temp = str[left];\n        str[left] = str[right];\n        str[right] = temp;\n        left++;\n        right--;\n    }\n    printf(\"Reversed: %s\\n\", str);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and string libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate variables", memory: [{variable: "str", type: "char[]", value: "size 100"}], output: "" },
                  { line: 8, annotation: "scanf reads 'Hello'", memory: [{variable: "str", type: "char[]", value: "\"Hello\""}], output: "" },
                  { line: 9, annotation: "left = 0", memory: [{variable: "left", type: "int", value: "0"}], output: "" },
                  { line: 10, annotation: "right = strlen(\"Hello\") - 1 = 4", memory: [{variable: "right", type: "int", value: "4"}], output: "" },
                  { line: 11, annotation: "while left < right (0 < 4)", memory: [], output: "" },
                  { line: 12, annotation: "temp = str[0] ('H')", memory: [{variable: "temp", type: "char", value: "'H'"}], output: "" },
                  { line: 13, annotation: "str[0] = str[4] ('o')", memory: [{variable: "str", type: "char[]", value: "\"oello\""}], output: "" },
                  { line: 14, annotation: "str[4] = temp ('H')", memory: [{variable: "str", type: "char[]", value: "\"oellH\""}], output: "" },
                  { line: 15, annotation: "left++", memory: [{variable: "left", type: "int", value: "1"}], output: "" },
                  { line: 16, annotation: "right--", memory: [{variable: "right", type: "int", value: "3"}], output: "" },
                  { line: 11, annotation: "while left < right (1 < 3)", memory: [], output: "" },
                  { line: 12, annotation: "temp = str[1] ('e')", memory: [{variable: "temp", type: "char", value: "'e'"}], output: "" },
                  { line: 13, annotation: "str[1] = str[3] ('l')", memory: [{variable: "str", type: "char[]", value: "\"olllo\""}], output: "" },
                  { line: 14, annotation: "str[3] = temp ('e')", memory: [{variable: "str", type: "char[]", value: "\"olleH\""}], output: "" },
                  { line: 15, annotation: "left++", memory: [{variable: "left", type: "int", value: "2"}], output: "" },
                  { line: 16, annotation: "right--", memory: [{variable: "right", type: "int", value: "2"}], output: "" },
                  { line: 11, annotation: "while left < right (2 < 2) false -> Exit loop", memory: [], output: "" },
                  { line: 18, annotation: "Print reversed string", memory: [], output: "Reversed: olleH\n" },
                  { line: 20, annotation: "Program terminates", memory: [], output: "Reversed: olleH\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 9",
        objective: "malloc, calloc, realloc, free, command-line args",
        tutorial: "Tutorial 9: Pointers and Dynamic Memory",
        labTitle: "Lab 9: Dynamic Allocation",
        experiments: [
          {
            id: "c-w9-1",
            title: "Array Sum using malloc",
            desc: "Calculate the sum of elements allocated via malloc().",
            expected: "Sum=X",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to dynamically allocate memory for an integer array of size n using malloc(), accept n integers from the user, compute their sum and average, and free the allocated memory before exiting. The student will:",
                bullets: [
                  "Include stdlib.h for malloc() and free()",
                  "Dynamically allocate an integer array using malloc()",
                  "Check the return value of malloc() for NULL (allocation failure)",
                  "Traverse the allocated array with a pointer or index to compute sum",
                  "Free the allocated memory using free() after use",
                  "Use printf() with %d and %.2f to display sum and average"
                ]
              },
              theory: [
                {
                  title: "Static vs Dynamic Allocation",
                  body: ["Static  : int arr[100]; — size fixed at compile time, stored on the stack.", "Dynamic : int *arr = malloc(n * sizeof(int)); — size decided at runtime, stored on the heap. Allows flexible, user-determined array sizes."]
                },
                {
                  title: "malloc()",
                  body: ["Memory ALLOCation. Syntax:\n  void *malloc(size_t size);\nAllocates a contiguous block of size bytes on the heap. Returns a void* pointer to the first byte, or NULL if allocation fails. The memory is uninitialised (contains garbage values). Must be cast to the required type:\n  int *arr = (int *) malloc(n * sizeof(int));"]
                },
                {
                  title: "sizeof(int)",
                  body: ["Always use sizeof to compute the correct byte count per element. sizeof(int) is typically 4 bytes on 32/64-bit systems. Hardcoding 4 is non-portable."]
                },
                {
                  title: "NULL Check",
                  body: ["malloc() returns NULL when the system cannot allocate the requested memory (e.g. out of heap space). Always check:\n  if (arr == NULL) { printf(\"Allocation failed\\n\"); exit(1); }\nDereferencing a NULL pointer causes a segmentation fault."]
                },
                {
                  title: "free()",
                  body: ["Releases the heap memory back to the OS:\n  free(arr);\nAfter free(), the pointer is a dangling pointer. Set it to NULL immediately:\n  arr = NULL;\nFailure to free memory causes a memory leak — the allocated block remains reserved until the program exits."]
                },
                {
                  title: "Pointer Arithmetic",
                  body: ["arr[i] is equivalent to *(arr + i). Both access the element i positions ahead of the base address."]
                },
                {
                  title: "Sum and Average",
                  body: ["sum = 0;\nfor (i = 0; i < n; i++) sum += arr[i];\naverage = (float) sum / n;"]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace malloc, array fill, sum computation, and free.",
                "Observe the heap address assigned to arr and how it is released after free().",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n integers — e.g. 5  10 20 30 40 50",
                "Click Run Code. Verify output: Sum: 150  Average: 30.00",
                "Try n = 1 and a large n like 1000 to observe dynamic sizing. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, i, sum = 0;\n    float average;\n    int *arr;\n    scanf(\"%d\", &n);\n    arr = (int *) malloc(n * sizeof(int));\n    if (arr == NULL) {\n        printf(\"Allocation failed\\n\");\n        return 1;\n    }\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n        sum += arr[i];\n    }\n    average = (float) sum / n;\n    printf(\"Sum: %d  Average: %.2f\\n\", sum, average);\n    free(arr);\n    arr = NULL;\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and stdlib libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "sum", type: "int", value: "0"}, {variable: "arr", type: "int*", value: "NULL"}], output: "" },
                  { line: 8, annotation: "scanf reads n=5", memory: [{variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 9, annotation: "malloc(5 * 4 = 20 bytes)", memory: [{variable: "arr", type: "int*", value: "0xHeapAddr1"}], output: "" },
                  { line: 10, annotation: "arr != NULL, proceed", memory: [], output: "" },
                  { line: 14, annotation: "Loop starts i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 15, annotation: "scanf arr[0]=10", memory: [{variable: "arr[0]", type: "int", value: "10"}], output: "" },
                  { line: 16, annotation: "sum = sum + 10 = 10", memory: [{variable: "sum", type: "int", value: "10"}], output: "" },
                  { line: 14, annotation: "Loop i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 15, annotation: "scanf arr[1]=20", memory: [{variable: "arr[1]", type: "int", value: "20"}], output: "" },
                  { line: 16, annotation: "sum = 10 + 20 = 30", memory: [{variable: "sum", type: "int", value: "30"}], output: "" },
                  { line: 14, annotation: "Loop i=2", memory: [{variable: "i", type: "int", value: "2"}], output: "" },
                  { line: 15, annotation: "scanf arr[2]=30", memory: [{variable: "arr[2]", type: "int", value: "30"}], output: "" },
                  { line: 16, annotation: "sum = 30 + 30 = 60", memory: [{variable: "sum", type: "int", value: "60"}], output: "" },
                  { line: 14, annotation: "Loop i=3", memory: [{variable: "i", type: "int", value: "3"}], output: "" },
                  { line: 15, annotation: "scanf arr[3]=40", memory: [{variable: "arr[3]", type: "int", value: "40"}], output: "" },
                  { line: 16, annotation: "sum = 60 + 40 = 100", memory: [{variable: "sum", type: "int", value: "100"}], output: "" },
                  { line: 14, annotation: "Loop i=4", memory: [{variable: "i", type: "int", value: "4"}], output: "" },
                  { line: 15, annotation: "scanf arr[4]=50", memory: [{variable: "arr[4]", type: "int", value: "50"}], output: "" },
                  { line: 16, annotation: "sum = 100 + 50 = 150", memory: [{variable: "sum", type: "int", value: "150"}], output: "" },
                  { line: 14, annotation: "Loop ends", memory: [], output: "" },
                  { line: 18, annotation: "average = 150.0 / 5 = 30.00", memory: [{variable: "average", type: "float", value: "30.00"}], output: "" },
                  { line: 19, annotation: "Print sum and average", memory: [], output: "Sum: 150  Average: 30.00\n" },
                  { line: 20, annotation: "free(arr) - Memory released", memory: [{variable: "arr", type: "int*", value: "0xHeapAddr1 (Freed)"}], output: "" },
                  { line: 21, annotation: "Set arr to NULL to avoid dangling pointer", memory: [{variable: "arr", type: "int*", value: "NULL"}], output: "" },
                  { line: 22, annotation: "Program terminates", memory: [], output: "Sum: 150  Average: 30.00\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w9-2",
            title: "Student Average using Structures",
            desc: "Array of structures dynamically allocated with malloc().",
            expected: "Average=X.XX",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to dynamically allocate an array of structures representing students, accept each student's name and marks, compute the average marks for each student, and display the results. The student will:",
                bullets: [
                  "Define a struct to hold a student's name and marks array",
                  "Dynamically allocate an array of n student structures using malloc()",
                  "Use a nested loop to accept marks for multiple subjects per student",
                  "Compute and store the average for each student within the struct",
                  "Traverse and print all student records using printf()",
                  "Free all dynamically allocated memory before program exit"
                ]
              },
              theory: [
                {
                  title: "Structures in C",
                  body: ["A struct groups related variables of different types under one name:\n  struct Student {\n      char name[50];\n      int  marks[5];\n      float average;\n  };\nEach field is accessed using the dot operator: s.name, s.marks[0], s.average."]
                },
                {
                  title: "Array of Structures",
                  body: ["Declares multiple student records:\n  struct Student students[100];   // static\nDynamically:\n  struct Student *students = (struct Student *) malloc(n * sizeof(struct Student));"]
                },
                {
                  title: "sizeof(struct Student)",
                  body: ["Returns the total bytes for one struct instance, including all fields and any padding added by the compiler for alignment. Always use sizeof rather than adding field sizes manually."]
                },
                {
                  title: "Dot vs Arrow Operator",
                  body: ["s.name           accesses field name of a struct variable s", "ptr->name        accesses field name through a pointer ptr", "(*ptr).name      is equivalent to ptr->name"]
                },
                {
                  title: "Average per Student",
                  body: ["sum = 0;\nfor (j = 0; j < subjects; j++) sum += students[i].marks[j];\nstudents[i].average = (float) sum / subjects;"]
                },
                {
                  title: "Nested Dynamic Allocation",
                  body: ["For a variable number of subjects per student, marks can itself be a dynamically allocated int*:\n  students[i].marks = (int *) malloc(subjects * sizeof(int));\nEach inner allocation must also be freed individually before freeing the outer array."]
                },
                {
                  title: "Memory Freeing Order",
                  body: ["Free inner allocations before the outer array to avoid losing the inner pointers:\n  for (i = 0; i < n; i++) free(students[i].marks);\n  free(students);"]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace struct allocation, field assignment, and average computation for two students.",
                "Observe how students[i].marks[j] is filled and how students[i].average is computed.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter number of students and subjects, then for each student enter name followed by marks — e.g.:\n2 3\nAlice 80 90 85\nBob 70 60 75",
                "Click Run Code. Verify average for Alice: 85.00 and Bob: 68.33",
                "Try a single student and a student with all-zero marks. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Student {\n    char name[50];\n    int *marks;\n    float average;\n};\n\nint main() {\n    int n, subjects, i, j, sum;\n    struct Student *students;\n    scanf(\"%d %d\", &n, &subjects);\n    students = (struct Student *) malloc(n * sizeof(struct Student));\n    for (i = 0; i < n; i++) {\n        scanf(\"%s\", students[i].name);\n        students[i].marks = (int *) malloc(subjects * sizeof(int));\n        sum = 0;\n        for (j = 0; j < subjects; j++) {\n            scanf(\"%d\", &students[i].marks[j]);\n            sum += students[i].marks[j];\n        }\n        students[i].average = (float) sum / subjects;\n    }\n    for (i = 0; i < n; i++) {\n        printf(\"%s - Average: %.2f\\n\", students[i].name, students[i].average);\n    }\n    for (i = 0; i < n; i++) {\n        free(students[i].marks);\n    }\n    free(students);\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load libraries", memory: [], output: "" },
                  { line: 12, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "subjects", type: "int", value: "?"}], output: "" },
                  { line: 13, annotation: "scanf reads n=2, subjects=3", memory: [{variable: "n", type: "int", value: "2"}, {variable: "subjects", type: "int", value: "3"}], output: "" },
                  { line: 14, annotation: "malloc students array", memory: [{variable: "students", type: "struct Student*", value: "size 2"}], output: "" },
                  { line: 15, annotation: "Student 1 loop starts (i=0)", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 16, annotation: "scanf name 'Alice'", memory: [{variable: "students[0].name", type: "char[]", value: "\"Alice\""}], output: "" },
                  { line: 17, annotation: "malloc marks array for Alice", memory: [{variable: "students[0].marks", type: "int*", value: "size 3"}], output: "" },
                  { line: 18, annotation: "sum = 0", memory: [{variable: "sum", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "Marks loop for Alice starts", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "scanf mark 80", memory: [{variable: "students[0].marks[0]", type: "int", value: "80"}], output: "" },
                  { line: 21, annotation: "sum += 80", memory: [{variable: "sum", type: "int", value: "80"}], output: "" },
                  { line: 19, annotation: "j=1", memory: [{variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 20, annotation: "scanf mark 90", memory: [{variable: "students[0].marks[1]", type: "int", value: "90"}], output: "" },
                  { line: 21, annotation: "sum += 90 (170)", memory: [{variable: "sum", type: "int", value: "170"}], output: "" },
                  { line: 19, annotation: "j=2", memory: [{variable: "j", type: "int", value: "2"}], output: "" },
                  { line: 20, annotation: "scanf mark 85", memory: [{variable: "students[0].marks[2]", type: "int", value: "85"}], output: "" },
                  { line: 21, annotation: "sum += 85 (255)", memory: [{variable: "sum", type: "int", value: "255"}], output: "" },
                  { line: 23, annotation: "average = 255 / 3 = 85.00", memory: [{variable: "students[0].average", type: "float", value: "85.00"}], output: "" },
                  { line: 15, annotation: "Student 2 loop starts (i=1)", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 16, annotation: "scanf name 'Bob'", memory: [{variable: "students[1].name", type: "char[]", value: "\"Bob\""}], output: "" },
                  { line: 17, annotation: "malloc marks array for Bob", memory: [{variable: "students[1].marks", type: "int*", value: "size 3"}], output: "" },
                  { line: 18, annotation: "sum = 0", memory: [{variable: "sum", type: "int", value: "0"}], output: "" },
                  { line: 19, annotation: "Marks loop for Bob starts", memory: [{variable: "j", type: "int", value: "0"}], output: "" },
                  { line: 20, annotation: "scanf mark 70", memory: [{variable: "students[1].marks[0]", type: "int", value: "70"}], output: "" },
                  { line: 21, annotation: "sum += 70", memory: [{variable: "sum", type: "int", value: "70"}], output: "" },
                  { line: 19, annotation: "j=1", memory: [{variable: "j", type: "int", value: "1"}], output: "" },
                  { line: 20, annotation: "scanf mark 60", memory: [{variable: "students[1].marks[1]", type: "int", value: "60"}], output: "" },
                  { line: 21, annotation: "sum += 60 (130)", memory: [{variable: "sum", type: "int", value: "130"}], output: "" },
                  { line: 19, annotation: "j=2", memory: [{variable: "j", type: "int", value: "2"}], output: "" },
                  { line: 20, annotation: "scanf mark 75", memory: [{variable: "students[1].marks[2]", type: "int", value: "75"}], output: "" },
                  { line: 21, annotation: "sum += 75 (205)", memory: [{variable: "sum", type: "int", value: "205"}], output: "" },
                  { line: 23, annotation: "average = 205 / 3 = 68.33", memory: [{variable: "students[1].average", type: "float", value: "68.33"}], output: "" },
                  { line: 25, annotation: "Print Loop i=0", memory: [{variable: "i", type: "int", value: "0"}], output: "" },
                  { line: 26, annotation: "Print Alice", memory: [], output: "Alice - Average: 85.00\n" },
                  { line: 25, annotation: "Print Loop i=1", memory: [{variable: "i", type: "int", value: "1"}], output: "" },
                  { line: 26, annotation: "Print Bob", memory: [], output: "Alice - Average: 85.00\nBob - Average: 68.33\n" },
                  { line: 28, annotation: "Free Loop starts", memory: [], output: "" },
                  { line: 29, annotation: "Free Alice's marks", memory: [], output: "" },
                  { line: 29, annotation: "Free Bob's marks", memory: [], output: "" },
                  { line: 31, annotation: "Free students array", memory: [], output: "" },
                  { line: 32, annotation: "Program terminates", memory: [], output: "Alice - Average: 85.00\nBob - Average: 68.33\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w9-3",
            title: "Failed Students using calloc",
            desc: "Filter and print failed students from an array allocated with calloc().",
            expected: "List of failed students",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to dynamically allocate memory for n student marks using calloc(), accept marks from the user, identify and count students who have failed (marks below a passing threshold), and display their roll numbers and marks. The student will:",
                bullets: [
                  "Include stdlib.h for calloc() and free()",
                  "Allocate a zero-initialised integer array using calloc()",
                  "Accept n marks and store them in the allocated array",
                  "Traverse the array to identify elements below the pass mark (e.g. 40)",
                  "Count and display the number of failed students with their roll numbers",
                  "Free the allocated memory and set the pointer to NULL"
                ]
              },
              theory: [
                {
                  title: "calloc()",
                  body: ["Contiguous ALLOCation. Syntax:\n  void *calloc(size_t num, size_t size);\nAllocates memory for num elements each of size bytes and zero-initialises every byte. Returns a void* pointer, or NULL on failure.\n  int *marks = (int *) calloc(n, sizeof(int));"]
                },
                {
                  title: "malloc() vs calloc()",
                  body: ["malloc(n * sizeof(int))   : allocates n*sizeof(int) bytes; content uninitialised\ncalloc(n, sizeof(int))    : allocates n*sizeof(int) bytes; all bytes set to 0", "calloc is preferred when zero-initialisation is needed (e.g. counters, flags, marks arrays where un-entered values should default to 0)."]
                },
                {
                  title: "realloc()",
                  body: ["REALLOCation. Resizes a previously allocated block:\n  ptr = realloc(ptr, new_size);\nIf new_size is larger, extra bytes are uninitialised. If the block cannot be expanded in place, realloc allocates a new block, copies the old data, frees the old block, and returns the new address. Returns NULL on failure — always assign to a temporary pointer to avoid losing the original:\n  int *temp = realloc(marks, new_n * sizeof(int));\n  if (temp != NULL) marks = temp;"]
                },
                {
                  title: "Identifying Failed Students",
                  body: ["failCount = 0;\nfor (i = 0; i < n; i++) {\n    if (marks[i] < PASS_MARK) {\n        printf(\"Roll %d: %d\\n\", i+1, marks[i]);\n        failCount++;\n    }\n}"]
                },
                {
                  title: "Zero Initialisation Advantage",
                  body: ["Because calloc zero-initialises, any unread entry defaults to 0 (which would be below pass mark). This makes calloc particularly appropriate when partial data entry is a concern."]
                },
                {
                  title: "free() and NULL Assignment",
                  body: ["free(marks);\nmarks = NULL;"]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace calloc allocation, marks entry, and the fail check loop.",
                "Observe that unmodified calloc slots hold 0 and how marks below 40 are flagged.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n then n marks — e.g. 5  55 32 48 27 61",
                "Click Run Code. Verify output:\nFailed Students:\nRoll 2: 32\nRoll 4: 27\nTotal failed: 2",
                "Try all passing marks, all failing marks, and n = 1. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, i, failCount = 0;\n    int *marks;\n    scanf(\"%d\", &n);\n    marks = (int *) calloc(n, sizeof(int));\n    if (marks == NULL) {\n        printf(\"Allocation failed\\n\");\n        return 1;\n    }\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &marks[i]);\n    }\n    printf(\"Failed Students:\\n\");\n    for (i = 0; i < n; i++) {\n        if (marks[i] < 40) {\n            printf(\"Roll %d: %d\\n\", i + 1, marks[i]);\n            failCount++;\n        }\n    }\n    printf(\"Total failed: %d\\n\", failCount);\n    free(marks);\n    marks = NULL;\n    return 0;\n}",
                steps: [
                  { line: 1, annotation: "Load stdio and stdlib libraries", memory: [], output: "" },
                  { line: 5, annotation: "Allocate variables", memory: [{variable: "n", type: "int", value: "?"}, {variable: "failCount", type: "int", value: "0"}], output: "" },
                  { line: 7, annotation: "scanf reads n=5", memory: [{variable: "n", type: "int", value: "5"}], output: "" },
                  { line: 8, annotation: "calloc(5, 4) zeroes memory", memory: [{variable: "marks", type: "int*", value: "{0, 0, 0, 0, 0}"}], output: "" },
                  { line: 9, annotation: "marks != NULL, proceed", memory: [], output: "" },
                  { line: 13, annotation: "Read loop starts", memory: [], output: "" },
                  { line: 14, annotation: "scanf marks[0]=55", memory: [{variable: "marks", type: "int*", value: "{55, 0, 0, 0, 0}"}], output: "" },
                  { line: 14, annotation: "scanf marks[1]=32", memory: [{variable: "marks", type: "int*", value: "{55, 32, 0, 0, 0}"}], output: "" },
                  { line: 14, annotation: "scanf marks[2]=48", memory: [{variable: "marks", type: "int*", value: "{55, 32, 48, 0, 0}"}], output: "" },
                  { line: 14, annotation: "scanf marks[3]=27", memory: [{variable: "marks", type: "int*", value: "{55, 32, 48, 27, 0}"}], output: "" },
                  { line: 14, annotation: "scanf marks[4]=61", memory: [{variable: "marks", type: "int*", value: "{55, 32, 48, 27, 61}"}], output: "" },
                  { line: 16, annotation: "Print header", memory: [], output: "Failed Students:\n" },
                  { line: 17, annotation: "Check loop starts", memory: [], output: "" },
                  { line: 18, annotation: "marks[0]=55 >= 40 (Pass)", memory: [], output: "" },
                  { line: 18, annotation: "marks[1]=32 < 40 (Fail)", memory: [], output: "" },
                  { line: 19, annotation: "Print Roll 2", memory: [], output: "Failed Students:\nRoll 2: 32\n" },
                  { line: 20, annotation: "failCount++", memory: [{variable: "failCount", type: "int", value: "1"}], output: "" },
                  { line: 18, annotation: "marks[2]=48 >= 40 (Pass)", memory: [], output: "" },
                  { line: 18, annotation: "marks[3]=27 < 40 (Fail)", memory: [], output: "" },
                  { line: 19, annotation: "Print Roll 4", memory: [], output: "Failed Students:\nRoll 2: 32\nRoll 4: 27\n" },
                  { line: 20, annotation: "failCount++", memory: [{variable: "failCount", type: "int", value: "2"}], output: "" },
                  { line: 18, annotation: "marks[4]=61 >= 40 (Pass)", memory: [], output: "" },
                  { line: 23, annotation: "Print total failed", memory: [], output: "Failed Students:\nRoll 2: 32\nRoll 4: 27\nTotal failed: 2\n" },
                  { line: 24, annotation: "free(marks)", memory: [{variable: "marks", type: "int*", value: "0xHeapAddr (Freed)"}], output: "" },
                  { line: 25, annotation: "marks = NULL", memory: [{variable: "marks", type: "int*", value: "NULL"}], output: "" },
                  { line: 26, annotation: "Program terminates", memory: [], output: "Failed Students:\nRoll 2: 32\nRoll 4: 27\nTotal failed: 2\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 10",
        objective: "Structures, Unions, bit fields, singly linked list",
        tutorial: "Tutorial 10: Structures and Unions",
        labTitle: "Lab 10: Advanced Data Structures",
        experiments: [
          {
            id: "c-w10-1",
            title: "Singly Linked List",
            desc: "Create and display a singly linked list.",
            expected: "X->X->NULL",
            content: {
              aim: {
                text: "In this experiment, the student will understand the concept of dynamic memory allocation using self-referential structures in C. The student will create a singly linked list by dynamically allocating nodes using malloc() and traverse the list to display all elements. The student will:",
                bullets: [
                  "Understand what a self-referential structure is in C",
                  "Learn how nodes are created and linked using pointers",
                  "Implement insertion at the end of a linked list",
                  "Traverse and display the linked list from head to NULL",
                  "Understand how dynamic memory differs from static arrays"
                ]
              },
              theory: [
                {
                  title: "What is a Linked List?",
                  body: ["A linked list is a linear data structure where elements called nodes are stored in memory non-contiguously. Unlike arrays, linked list elements are not stored in adjacent memory locations. Each node holds data and a pointer to the next node."]
                },
                {
                  title: "Self-Referential Structure",
                  body: ["A structure that contains a pointer to itself is called a self-referential structure. This is the foundation of linked lists in C.\nStructure of a Node:", "data field — stores the actual integer value\nnext field — stores the address of the next node (pointer to same struct type)"]
                },
                {
                  title: "Head Pointer",
                  body: ["The head pointer always points to the first node of the list. If head is NULL the list is empty."]
                },
                {
                  title: "Tail Pointer",
                  body: ["The tail pointer tracks the last node. The last node always has its next pointer set to NULL indicating end of list."]
                },
                {
                  title: "Node Creation using malloc()",
                  body: ["malloc() allocates memory dynamically at runtime on the heap. sizeof(struct Node) gives the exact bytes needed for one node. The returned void pointer is cast to struct Node pointer."]
                },
                {
                  title: "Insertion at End",
                  body: ["For the first node — head and tail both point to it. For every subsequent node — tail's next points to new node, then tail moves to new node."]
                },
                {
                  title: "Traversal",
                  body: ["Start from head, print data, move to next node using cur = cur->next, repeat until cur becomes NULL."]
                },
                {
                  title: "🚂 A linked list is like a treasure hunt chain!",
                  body: [
                    "Imagine a treasure hunt where the first clue tells you where to find the second clue, the second clue tells you where to find the third, and so on. Each clue (node) has two things: the actual treasure hint (data) and the location of the next clue (pointer). The last clue says \"THE END\" (NULL). That's exactly a linked list!",
                    "Unlike an array where all items sit in a neat row, linked list nodes can be anywhere in memory — they just hold each other's hand (via pointers) to stay connected.",
                    "![Treasure map with connected dots](https://images.unsplash.com/photo-1577495508326-19a1b3cf65b9?w=400)"
                  ]
                },
                {
                  title: "Visual Structure for input 3 nodes: 10 20 30",
                  body: ["10 -> 20 -> 30 -> NULL", "Each arrow represents the next pointer storing the address of the following node."]
                },
                {
                  title: "Why Linked List over Array?",
                  body: ["Arrays have fixed size decided at compile time. Linked lists grow and shrink dynamically at runtime. Insertion and deletion are efficient in linked lists without shifting elements."]
                },
                {
                  title: "📏 The key difference — flexibility!",
                  body: [
                    "Arrays are like a fixed-size parking lot — built for exactly 100 cars, even if only 3 show up today. Linked lists are like a valet service — you add a parking spot whenever a new car arrives, and remove one when a car leaves. No wasted space, no size limits declared upfront. The trade-off: finding a specific car takes longer (you must walk the chain), while arrays let you jump directly to any spot."
                  ]
                }
              ],
              pretest: [],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint main() {\n    int n, i, val;\n    struct Node *head = NULL, *tail = NULL, *newNode, *cur;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%d\", &val);\n        newNode = (struct Node*)malloc(sizeof(struct Node));\n        newNode->data = val;\n        newNode->next = NULL;\n        if (head == NULL) {\n            head = newNode;\n            tail = newNode;\n        } else {\n            tail->next = newNode;\n            tail = newNode;\n        }\n    }\n    cur = head;\n    while (cur != NULL) {\n        printf(\"%d->\", cur->data);\n        cur = cur->next;\n    }\n    printf(\"NULL\\n\");\n    return 0;\n}",
                steps: [
                  { line: 8, annotation: "Declare head and tail", memory: [{ variable: "head", type: "Node*", value: "NULL" }, { variable: "tail", type: "Node*", value: "NULL" }], output: "" },
                  { line: 9, annotation: "Read n=3", memory: [{ variable: "n", type: "int", value: "3" }], output: "" },
                  { line: 10, annotation: "Loop i=0", memory: [{ variable: "i", type: "int", value: "0" }], output: "" },
                  { line: 11, annotation: "scanf val=10", memory: [{ variable: "val", type: "int", value: "10" }], output: "" },
                  { line: 12, annotation: "malloc Node 1 (addr 1001)", memory: [{ variable: "newNode", type: "Node*", value: "1001" }], output: "" },
                  { line: 13, annotation: "newNode->data = 10", memory: [{ variable: "newNode->data", type: "int", value: "10" }], output: "" },
                  { line: 14, annotation: "newNode->next = NULL", memory: [{ variable: "newNode->next", type: "Node*", value: "NULL" }], output: "" },
                  { line: 15, annotation: "head is NULL (first node)", memory: [], output: "" },
                  { line: 16, annotation: "head = 1001", memory: [{ variable: "head", type: "Node*", value: "1001" }], output: "" },
                  { line: 17, annotation: "tail = 1001", memory: [{ variable: "tail", type: "Node*", value: "1001" }], output: "" },
                  { line: 10, annotation: "Loop i=1", memory: [{ variable: "i", type: "int", value: "1" }], output: "" },
                  { line: 11, annotation: "scanf val=20", memory: [{ variable: "val", type: "int", value: "20" }], output: "" },
                  { line: 12, annotation: "malloc Node 2 (addr 2001)", memory: [{ variable: "newNode", type: "Node*", value: "2001" }], output: "" },
                  { line: 13, annotation: "newNode->data = 20", memory: [{ variable: "newNode->data", type: "int", value: "20" }], output: "" },
                  { line: 14, annotation: "newNode->next = NULL", memory: [{ variable: "newNode->next", type: "Node*", value: "NULL" }], output: "" },
                  { line: 19, annotation: "tail->next = 2001", memory: [{ variable: "tail->next", type: "Node*", value: "2001" }], output: "" },
                  { line: 20, annotation: "tail = 2001", memory: [{ variable: "tail", type: "Node*", value: "2001" }], output: "" },
                  { line: 10, annotation: "Loop i=2", memory: [{ variable: "i", type: "int", value: "2" }], output: "" },
                  { line: 11, annotation: "scanf val=30", memory: [{ variable: "val", type: "int", value: "30" }], output: "" },
                  { line: 12, annotation: "malloc Node 3 (addr 3001)", memory: [{ variable: "newNode", type: "Node*", value: "3001" }], output: "" },
                  { line: 13, annotation: "newNode->data = 30", memory: [{ variable: "newNode->data", type: "int", value: "30" }], output: "" },
                  { line: 14, annotation: "newNode->next = NULL", memory: [{ variable: "newNode->next", type: "Node*", value: "NULL" }], output: "" },
                  { line: 19, annotation: "tail->next = 3001", memory: [{ variable: "tail->next", type: "Node*", value: "3001" }], output: "" },
                  { line: 20, annotation: "tail = 3001", memory: [{ variable: "tail", type: "Node*", value: "3001" }], output: "" },
                  { line: 23, annotation: "Traversal starts, cur = head", memory: [{ variable: "cur", type: "Node*", value: "1001" }], output: "" },
                  { line: 25, annotation: "print 10->", memory: [], output: "10->" },
                  { line: 26, annotation: "cur = cur->next (2001)", memory: [{ variable: "cur", type: "Node*", value: "2001" }], output: "10->" },
                  { line: 25, annotation: "print 20->", memory: [], output: "10->20->" },
                  { line: 26, "annotation": "cur = cur->next (3001)", memory: [{ variable: "cur", type: "Node*", value: "3001" }], output: "10->20->" },
                  { line: 25, "annotation": "print 30->", memory: [], output: "10->20->30->" },
                  { line: 26, "annotation": "cur = cur->next (NULL)", memory: [{ variable: "cur", type: "Node*", value: "NULL" }], output: "10->20->30->" },
                  { line: 28, annotation: "print NULL", memory: [], output: "10->20->30->NULL\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "Reema Thareja, Data Structures Using C, 2nd Edition, Oxford University Press",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 10",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w10-2",
            title: "Structure vs Union Demo",
            desc: "Compare sizes of struct and union.",
            expected: "Different sizes shown",
            content: {
              aim: {
                text: "In this experiment the student will understand the fundamental difference between structures and unions in C by comparing their memory sizes and observing how data is stored in each. The student will use sizeof() operator to measure and compare how memory is allocated differently for struct and union with identical fields. The student will:",
                bullets: [
                  "Define a structure and a union with identical fields",
                  "Use sizeof() to measure memory consumed by each",
                  "Understand why struct size is sum of all fields but union size is largest field only",
                  "Observe how writing to one union member affects other members",
                  "Understand real-world use cases for each"
                ]
              },
              theory: [
                {
                  title: "🏠 Structure = a house with separate rooms. Union = one room that changes purpose!",
                  body: [
                    "A struct is like a house with a bedroom, kitchen, and living room — all existing at the same time, each with its own space. You can use all rooms simultaneously.",
                    "A union is like a studio apartment with ONE room. Sometimes it's a bedroom, sometimes it's a gym, sometimes it's an office — but it can only be ONE thing at a time. The room is always the same size (the biggest version needed), but only the last use matters.",
                    "![House floor plan / apartment studio](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400)"
                  ]
                },
                {
                  title: "What is a Structure?",
                  body: ["A structure is a user-defined data type that groups multiple variables of different data types under one name. Each member gets its own separate memory location. Total size of a struct equals the sum of sizes of all its members (plus possible padding bytes added by compiler for alignment).", "Example with int i (4 bytes) + float f (4 bytes) + char c (1 byte) = minimum 9 bytes, compiler may pad to 12 bytes for alignment."]
                },
                {
                  title: "What is a Union?",
                  body: ["A union is also a user-defined data type that groups multiple variables under one name. But all members share the same memory location. The size of a union equals the size of its largest member only. Only one member can hold a valid value at any given time.", "Example with int i (4 bytes) + float f (4 bytes) + char c (1 byte) = 4 bytes total (largest member size)."]
                },
                {
                  title: "Key Difference Table",
                  body: [
                    "Feature | Structure | Union",
                    "Memory | Separate for each member | Shared single location",
                    "Size | Sum of all members | Size of largest member",
                    "Access | All members valid simultaneously | Only last written member valid",
                    "Use case | Store multiple data together | Save memory, store one of many types"
                  ]
                },
                {
                  title: "Padding in Structures",
                  body: ["Compilers add padding bytes between members to align data on word boundaries for faster CPU access. This is why struct size may be larger than the raw sum of members."]
                },
                {
                  title: "When to use Union?",
                  body: ["Unions are used in embedded systems, network packet parsing, and anywhere memory is extremely limited and only one field is needed at a time."]
                }
              ],
              pretest:[],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nstruct S {\n    int i;\n    float f;\n    char c;\n};\n\nunion U {\n    int i;\n    float f;\n    char c;\n};\n\nint main() {\n    printf(\"Size of Struct=%lu\\n\", sizeof(struct S));\n    printf(\"Size of Union=%lu\\n\", sizeof(union U));\n    return 0;\n}",
                steps: [
                  { line: 3, annotation: "struct S defined (int, float, char)", memory: [], output: "" },
                  { line: 9, annotation: "union U defined (int, float, char)", memory: [], output: "" },
                  { line: 16, annotation: "sizeof(struct S) evaluated (12 bytes)", memory: [], output: "Size of Struct=12\n" },
                  { line: 17, annotation: "sizeof(union U) evaluated (4 bytes)", memory: [], output: "Size of Struct=12\nSize of Union=4\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 10",
                "GCC Documentation on Structures and Unions: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          },
        ],
      },
      {
        title: "WEEK 11",
        objective: "Functions, call by value, scope, Euler's method",
        tutorial: "Tutorial 11: Functions",
        labTitle: "Lab 11: Modular Programming",
        experiments: [
          {
            id: "c-w11-1",
            title: "NCR Value",
            desc: "Calculate nCr using functions.",
            expected: "NCR=X",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to compute the binomial coefficient nCr (n choose r) using a dedicated factorial function, demonstrating modular programming through function definition, declaration, and call by value. The student will:",
                bullets: [
                  "Write a long long factorial(int n) function and call it from main()",
                  "Understand call by value — changes to parameters inside a function do not affect the caller's variables",
                  "Understand function scope — local variables declared inside a function are not visible outside it",
                  "Apply the formula: nCr = n! / (r! * (n-r)!)",
                  "Validate inputs (r <= n, both non-negative) before computing",
                  "Use printf() with %lld to display the result"
                ]
              },
              theory: [
                {
                  title: "Modular Programming",
                  body: ["Breaking a program into independent, reusable functions. Each function has a single responsibility. main() orchestrates calls; helper functions perform specific computations. Benefits include readability, reusability, and easier debugging."]
                },
                {
                  title: "Function Definition",
                  body: ["Syntax:\n  return_type function_name(parameter_list) {\n      // body\n      return value;\n  }\nExample:\n  long long factorial(int n) {\n      long long fact = 1;\n      for (int i = 1; i <= n; i++) fact *= i;\n      return fact;\n  }"]
                },
                {
                  title: "Function Declaration (Prototype)",
                  body: ["Placed before main() so the compiler knows the function's signature before it is called:\n  long long factorial(int n);"]
                },
                {
                  title: "Call by Value",
                  body: ["C passes arguments by copying their values into the function's local parameters. Modifying the parameter inside the function has no effect on the original variable in the caller:\n  void modify(int x) { x = 100; }   // caller's variable unchanged\n  int a = 5; modify(a);             // a is still 5 after the call"]
                },
                {
                  title: "Scope",
                  body: ["A variable declared inside a function is local to that function. It is created when the function is called and destroyed when it returns. Variables in main() are not accessible inside factorial() and vice versa."]
                },
                {
                  title: "nCr Formula",
                  body: ["nCr = n! / (r! × (n-r)!)\nFor n = 5, r = 2:\n  5C2 = 120 / (2 × 6) = 120 / 12 = 10"]
                },
                {
                  title: "Input Validation",
                  body: ["if (r > n || n < 0 || r < 0) → invalid input\nnC0 = nCn = 1 (edge cases, naturally handled by factorial formula)"]
                },
                {
                  title: "Overflow Consideration",
                  body: ["Factorials grow rapidly. Use long long and limit n to reasonable values (n ≤ 20 for long long). For larger n, use the multiplicative formula to avoid intermediate overflow."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the three factorial calls for n, r, and (n-r).",
                "Observe how call by value preserves the caller's n and r across all three calls.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter n and r — e.g. 5 2",
                "Click Run Code. Verify output: 5C2 = 10",
                "Try edge cases: n = r (answer = 1), r = 0 (answer = 1), and r > n (invalid). Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nlong long factorial(int n) {\n    long long fact = 1;\n    int i;\n    for (i = 1; i <= n; i++) {\n        fact *= i;\n    }\n    return fact;\n}\n\nint main() {\n    int n, r;\n    long long nCr;\n    scanf(\"%d %d\", &n, &r);\n    if (r > n || n < 0 || r < 0) {\n        printf(\"Invalid input\\n\");\n        return 1;\n    }\n    nCr = factorial(n) / (factorial(r) * factorial(n - r));\n    printf(\"%dC%d = %lld\\n\", n, r, nCr);\n    return 0;\n}",
                steps: [
                  { line: 12, annotation: "Declare variables", memory: [{ variable: "n", type: "int", value: "?" }, { variable: "r", type: "int", value: "?" }, { variable: "nCr", type: "long long", value: "?" }], output: "" },
                  { line: 14, annotation: "Read n=5, r=2", memory: [{ variable: "n", type: "int", value: "5" }, { variable: "r", type: "int", value: "2" }], output: "" },
                  { line: 15, annotation: "Check input validity", memory: [], output: "" },
                  { line: 19, annotation: "Call factorial(n) where n=5", memory: [], output: "" },
                  { line: 3, annotation: "factorial(5) starts", memory: [{ variable: "fact", type: "long long", value: "1" }], output: "" },
                  { line: 5, annotation: "Loop i=1 to 5", memory: [], output: "" },
                  { line: 6, annotation: "fact = 120", memory: [{ variable: "fact", type: "long long", value: "120" }], output: "" },
                  { line: 8, annotation: "Return 120", memory: [], output: "" },
                  { line: 19, annotation: "Call factorial(r) where r=2", memory: [], output: "" },
                  { line: 3, annotation: "factorial(2) starts", memory: [{ variable: "fact", type: "long long", value: "1" }], output: "" },
                  { line: 5, annotation: "Loop i=1 to 2", memory: [], output: "" },
                  { line: 6, annotation: "fact = 2", memory: [{ variable: "fact", type: "long long", value: "2" }], output: "" },
                  { line: 8, annotation: "Return 2", memory: [], output: "" },
                  { line: 19, annotation: "Call factorial(n-r) where n-r=3", memory: [], output: "" },
                  { line: 3, annotation: "factorial(3) starts", memory: [{ variable: "fact", type: "long long", value: "1" }], output: "" },
                  { line: 5, annotation: "Loop i=1 to 3", memory: [], output: "" },
                  { line: 6, annotation: "fact = 6", memory: [{ variable: "fact", type: "long long", value: "6" }], output: "" },
                  { line: 8, annotation: "Return 6", memory: [], output: "" },
                  { line: 19, annotation: "Calculate nCr = 120 / (2 * 6) = 10", memory: [{ variable: "nCr", type: "long long", value: "10" }], output: "" },
                  { line: 20, annotation: "Print result", memory: [], output: "5C2 = 10\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w11-2",
            title: "String Length without strlen",
            desc: "Calculate the length of a string using a custom function.",
            expected: "Length=X",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to compute the length of a string without using the standard library strlen() function, implementing the count in a separate user-defined function to demonstrate modular programming and pointer-based string traversal. The student will:",
                bullets: [
                  "Write an int stringLength(char *str) function that traverses the string manually",
                  "Understand how the null terminator '\\0' marks the end of a string",
                  "Demonstrate call by value for the pointer — the address is copied but the original pointer in the caller is unaffected",
                  "Understand the scope of the loop counter inside the function",
                  "Compare the manual result with strlen() for verification",
                  "Use printf() with %d to display the computed length"
                ]
              },
              theory: [
                {
                  title: "String Length",
                  body: ["The length of a C string is the number of characters before the null terminator '\\0'. strlen(\"Hello\") = 5. The null terminator itself is not counted."]
                },
                {
                  title: "Manual Length Function",
                  body: ["Traverse using a counter until '\\0' is reached:\n  int stringLength(char *str) {\n      int count = 0;\n      while (str[count] != '\\0')\n          count++;\n      return count;\n  }\nAlternatively using pointer arithmetic:\n  int stringLength(char *str) {\n      char *p = str;\n      while (*p != '\\0') p++;\n      return (int)(p - str);\n  }\nBoth approaches are equivalent."]
                },
                {
                  title: "Call by Value for Pointers",
                  body: ["When a char* pointer is passed to a function, the address value is copied into the parameter. The function can read and traverse the string through this copy, but reassigning the parameter (str = something_else) does not affect the caller's pointer. Note: the string contents themselves can be modified through the pointer (this is call by value of the address, not call by value of the data)."]
                },
                {
                  title: "Pointer Arithmetic",
                  body: ["p - str gives the number of elements between the two pointers. For a char array, this equals the number of characters traversed."]
                },
                {
                  title: "Null Terminator Detection",
                  body: ["str[i] != '\\0' and *p != '\\0' are equivalent checks. '\\0' has integer value 0, so while (str[i]) also works as a compact loop condition."]
                },
                {
                  title: "Scope of count",
                  body: ["The variable count is local to stringLength(). It exists only during the function call and is destroyed on return. The caller receives the return value, not direct access to count."]
                },
                {
                  title: "Edge Cases",
                  body: ["Empty string \"\"   : length = 0 (loop body never executes)\nSingle char \"a\"   : length = 1\nString with spaces: spaces are counted as regular characters"]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace the while loop for str = \"Hello\".",
                "Observe how count increments from 0 to 5 and the loop exits when str[5] == '\\0'.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter a string — e.g. Hello",
                "Click Run Code. Verify output: Length: 5",
                "Try an empty string, a string with spaces (use fgets), and a long string. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n\nint stringLength(char *str) {\n    int count = 0;\n    while (str[count] != '\\0') {\n        count++;\n    }\n    return count;\n}\n\nint main() {\n    char str[100];\n    int len;\n    scanf(\"%s\", str);\n    len = stringLength(str);\n    printf(\"Length: %d\\n\", len);\n    return 0;\n}",
                steps: [
                  { line: 12, annotation: "Declare variables", memory: [{ variable: "str", type: "char[]", value: "?" }, { variable: "len", type: "int", value: "?" }], output: "" },
                  { line: 14, annotation: "Read str=\"Hello\"", memory: [{ variable: "str", type: "char[]", value: "\"Hello\"" }], output: "" },
                  { line: 15, annotation: "Call stringLength(str)", memory: [], output: "" },
                  { line: 3, annotation: "stringLength starts, str points to \"Hello\"", memory: [], output: "" },
                  { line: 4, annotation: "Initialize count = 0", memory: [{ variable: "count", type: "int", value: "0" }], output: "" },
                  { line: 5, annotation: "str[0] is 'H', != '\\0'", memory: [], output: "" },
                  { line: 6, annotation: "count++", memory: [{ variable: "count", type: "int", value: "1" }], output: "" },
                  { line: 5, annotation: "str[1] is 'e', != '\\0'", memory: [], output: "" },
                  { line: 6, annotation: "count++", memory: [{ variable: "count", type: "int", value: "2" }], output: "" },
                  { line: 5, annotation: "str[2] is 'l', != '\\0'", memory: [], output: "" },
                  { line: 6, annotation: "count++", memory: [{ variable: "count", type: "int", value: "3" }], output: "" },
                  { line: 5, annotation: "str[3] is 'l', != '\\0'", memory: [], output: "" },
                  { line: 6, annotation: "count++", memory: [{ variable: "count", type: "int", value: "4" }], output: "" },
                  { line: 5, annotation: "str[4] is 'o', != '\\0'", memory: [], output: "" },
                  { line: 6, annotation: "count++", memory: [{ variable: "count", type: "int", value: "5" }], output: "" },
                  { line: 5, annotation: "str[5] is '\\0'", memory: [], output: "" },
                  { line: 8, annotation: "Return count (5)", memory: [], output: "" },
                  { line: 15, annotation: "len = 5", memory: [{ variable: "len", type: "int", value: "5" }], output: "" },
                  { line: 16, annotation: "Print Length", memory: [], output: "Length: 5\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w11-3",
            title: "Matrix Transpose",
            desc: "Transpose a matrix via a function.",
            expected: "Transposed matrix",
            content: {
              aim: {
                text: "In this experiment, the student will write a C program to accept a matrix from the user, compute its transpose using a dedicated function, and display both the original and transposed matrices. The student will:",
                bullets: [
                  "Define a void transpose(int A[][MAX], int B[][MAX], int rows, int cols) function",
                  "Pass 2D arrays to a function and understand how array addresses are passed",
                  "Compute the transpose by assigning B[j][i] = A[i][j] for all valid i, j",
                  "Understand the scope of loop counters and matrix elements inside the function",
                  "Demonstrate that 2D array contents are modifiable through a passed pointer (call by reference of array data, call by value of dimension parameters)",
                  "Display original and transposed matrices with formatted printf() output"
                ]
              },
              theory: [
                {
                  title: "Matrix Transpose",
                  body: ["The transpose of an m × n matrix A is an n × m matrix B where:\n  B[j][i] = A[i][j]   for all i in [0, m-1] and j in [0, n-1]\nRow i of A becomes column i of B. The dimensions swap: an m × n matrix transposes to an n × m matrix."]
                },
                {
                  title: "Example",
                  body: ["A (2×3):            Transpose B (3×2):\n  1  2  3             1  4\n  4  5  6             2  5\n                      3  6"]
                },
                {
                  title: "Passing 2D Arrays to Functions",
                  body: ["In C, a 2D array passed to a function decays to a pointer to its first row. The column dimension must be specified in the parameter:\n  void transpose(int A[][MAX], int B[][MAX], int rows, int cols)\nMAX is a compile-time constant (e.g. #define MAX 10). The row count is passed as a runtime parameter."]
                },
                {
                  title: "Why Array Data Is Modified",
                  body: ["Arrays are not copied when passed to functions; the function receives the base address. Modifications to B[j][i] inside the function are directly reflected in the caller's array — this is effectively call by reference for array contents. The dimension variables rows and cols are passed by value."]
                },
                {
                  title: "In-Place Transpose (Square Matrices Only)",
                  body: ["For a square n × n matrix, the transpose can be done in-place by swapping A[i][j] and A[j][i] for i < j only (not both, to avoid double-swapping):\n  for (i = 0; i < n; i++)\n      for (j = i+1; j < n; j++) {\n          temp = A[i][j]; A[i][j] = A[j][i]; A[j][i] = temp;\n      }\nFor non-square matrices, a second matrix B is required."]
                },
                {
                  title: "Scope of Loop Variables",
                  body: ["Loop counters i and j declared inside the function are local to that function and do not conflict with any same-named variables in main()."]
                },
                {
                  title: "Time and Space Complexity",
                  body: ["Time Complexity — O(m × n): every element is copied exactly once.\nSpace Complexity — O(m × n) for the result matrix B (O(1) extra for in-place)."]
                }
              ],
              pretest: [],
              procedure: [
                "Read the Aim and Theory sections carefully.",
                "Open the Simulation tab and trace B[j][i] = A[i][j] assignments for a 2×3 matrix.",
                "Observe how the function modifies the caller's B array through the base address.",
                "Open the Code Test tab. Starter code is pre-loaded.",
                "In the Stdin box enter rows, cols, then the matrix row by row. e.g. 2 3  1 2 3 4 5 6",
                "Click Run Code. Verify: Original (2×3):  1 2 3 / 4 5 6 | Transpose (3×2): 1 4 / 2 5 / 3 6",
                "Try a square 3×3 matrix and a 1×5 row matrix. Proceed to Posttest."
              ],
              simulation: {
                code: "#include <stdio.h>\n#define MAX 10\n\nvoid transpose(int A[][MAX], int B[][MAX], int rows, int cols) {\n    int i, j;\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            B[j][i] = A[i][j];\n        }\n    }\n}\n\nint main() {\n    int A[MAX][MAX], B[MAX][MAX];\n    int rows, cols, i, j;\n    scanf(\"%d %d\", &rows, &cols);\n    for (i = 0; i < rows; i++) {\n        for (j = 0; j < cols; j++) {\n            scanf(\"%d\", &A[i][j]);\n        }\n    }\n    transpose(A, B, rows, cols);\n    printf(\"Transpose:\\n\");\n    for (i = 0; i < cols; i++) {\n        for (j = 0; j < rows; j++) {\n            printf(\"%d \", B[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                steps: [
                  { line: 15, annotation: "Declare variables", memory: [{ variable: "rows", type: "int", value: "?" }, { variable: "cols", type: "int", value: "?" }], output: "" },
                  { line: 16, annotation: "Read rows=2, cols=3", memory: [{ variable: "rows", type: "int", value: "2" }, { variable: "cols", type: "int", value: "3" }], output: "" },
                  { line: 17, annotation: "Read matrix A elements", memory: [], output: "" },
                  { line: 22, annotation: "Call transpose(A, B, 2, 3)", memory: [], output: "" },
                  { line: 4, annotation: "transpose starts", memory: [], output: "" },
                  { line: 6, annotation: "Nested loop to assign B[j][i] = A[i][j]", memory: [], output: "" },
                  { line: 8, annotation: "B[0][0]=A[0][0], B[1][0]=A[0][1], ...", memory: [], output: "" },
                  { line: 11, annotation: "transpose complete, returns", memory: [], output: "" },
                  { line: 23, annotation: "Print Transpose:", memory: [], output: "Transpose:\n" },
                  { line: 24, annotation: "Print matrix B", memory: [], output: "" },
                  { line: 26, "annotation": "Print row 1", "memory": [], "output": "Transpose:\n1 4 \n" },
                  { line: 26, "annotation": "Print row 2", "memory": [], "output": "Transpose:\n1 4 \n2 5 \n" },
                  { line: 26, "annotation": "Print row 3", "memory": [], "output": "Transpose:\n1 4 \n2 5 \n3 6 \n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan & Ritchie, \"The C Programming Language\", 2nd Ed., Prentice Hall",
                "Balagurusamy, \"Programming in ANSI C\", 8th Ed., McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Dept.",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 12",
        objective: "Recursive functions for naturally recursive problems",
        tutorial: "Tutorial 12: Recursion",
        labTitle: "Lab 12: Recursive techniques",
        experiments: [
          {
            id: "c-w12-1",
            title: "Fibonacci Series",
            desc: "Generate the Fibonacci series using recursion.",
            expected: "Fibonacci sequence",
            content: {
              aim: {
                text: "In this experiment the student will understand how recursion works in C by implementing the Fibonacci series. The student will learn how a function calls itself repeatedly with smaller inputs until it reaches a base case and how the call stack builds and unwinds during recursive execution. The student will:",
                bullets: [
                  "Understand the concept of recursion and base case",
                  "Implement a recursive function fib(n) that returns the nth Fibonacci number",
                  "Understand how recursive calls stack up in memory",
                  "Trace the recursive call tree for small inputs",
                  "Observe how fib(n) = fib(n-1) + fib(n-2) breaks down to fib(0) and fib(1)"
                ]
              },
              theory: [
                {
                  title: "What is Recursion?",
                  body: ["Recursion is a programming technique where a function calls itself to solve a smaller version of the same problem. Every recursive solution has two parts — a base case that stops the recursion and a recursive case that breaks the problem down further."]
                },
                {
                  title: "Fibonacci Series",
                  body: ["The Fibonacci series is a sequence where each number is the sum of the two preceding numbers.\nSeries: 0 1 1 2 3 5 8 13 21 34 ...\nMathematical definition:\nfib(0) = 0 — base case\nfib(1) = 1 — base case\nfib(n) = fib(n-1) + fib(n-2) — recursive case for n greater than 1"]
                },
                {
                  title: "Recursive Call Tree for fib(4)",
                  body: ["fib(4) calls fib(3) and fib(2)\nfib(3) calls fib(2) and fib(1)\nfib(2) calls fib(1) and fib(0)\nEach call adds a new frame to the call stack. When base case is hit the function returns and the stack unwinds back up."]
                },
                {
                  title: "Call Stack Concept",
                  body: ["Every function call occupies a stack frame in memory containing its local variables and return address. For fib(5) the maximum stack depth is 5 frames deep. This is why deep recursion on large n causes stack overflow."]
                },
                {
                  title: "Time Complexity Warning",
                  body: ["Naive recursive Fibonacci recalculates the same subproblems multiple times. fib(30) makes over a million function calls. This is inefficient but perfectly illustrates recursion for learning purposes."]
                },
                {
                  title: "Base Case Importance",
                  body: ["Without base cases fib(0)=0 and fib(1)=1 the function would recurse infinitely and crash with a stack overflow error."]
                }
              ],
              pretest: [],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nint fib(int n) {\n    if (n <= 1) {\n        return n;\n    }\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    int n = 5, i;\n    for (i = 0; i < n; i++) {\n        printf(\"%d \", fib(i));\n    }\n    printf(\"\\n\");\n    return 0;\n}",
                steps: [
                  { line: 3, annotation: "fib(n) defined with base cases", memory: [], output: "" },
                  { line: 11, annotation: "main() calls fib(0)", memory: [{ variable: "i", type: "int", value: "0" }], output: "" },
                  { line: 4, annotation: "fib(0) hits base case immediately", memory: [], output: "" },
                  { line: 5, annotation: "Returns 0", memory: [], output: "" },
                  { line: 13, annotation: "Output panel: 0", memory: [], output: "0 " },
                  { line: 11, annotation: "main() calls fib(1)", memory: [{ variable: "i", type: "int", value: "1" }], output: "" },
                  { line: 4, annotation: "fib(1) hits base case immediately", memory: [], output: "" },
                  { line: 5, annotation: "Returns 1", memory: [], output: "" },
                  { line: 13, annotation: "Output panel: 0 1", memory: [], output: "0 1 " },
                  { line: 11, annotation: "main() calls fib(2)", memory: [{ variable: "i", type: "int", value: "2" }], output: "" },
                  { line: 7, annotation: "fib(2) = fib(1) + fib(0) = 1 + 0 = 1", memory: [], output: "" },
                  { line: 13, annotation: "Output panel: 0 1 1", memory: [], output: "0 1 1 " },
                  { line: 11, annotation: "main() calls fib(3)", memory: [{ variable: "i", type: "int", value: "3" }], output: "" },
                  { line: 7, annotation: "fib(3) = fib(2) + fib(1) = 1 + 1 = 2", memory: [], output: "" },
                  { line: 13, annotation: "Output panel: 0 1 1 2", memory: [], output: "0 1 1 2 " },
                  { line: 11, annotation: "main() calls fib(4)", memory: [{ variable: "i", type: "int", value: "4" }], output: "" },
                  { line: 7, annotation: "fib(4) = fib(3) + fib(2) = 2 + 1 = 3", memory: [], output: "" },
                  { line: 13, annotation: "Output panel: 0 1 1 2 3", memory: [], output: "0 1 1 2 3 " }
                ]
              },
              posttest: [],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 12",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w12-2",
            title: "Factorial Recursive",
            desc: "Calculate factorial recursively.",
            expected: "Factorial=X",
            content: {
              aim: {
                text: "In this experiment the student will implement the factorial function recursively in C and understand how each recursive call reduces the problem size by one until the base case n=0 is reached. The student will observe how the call stack builds and unwinds cleanly for factorial compared to Fibonacci. The student will:",
                bullets: [
                  "Understand factorial as a naturally recursive mathematical definition",
                  "Implement fact(n) = n multiplied by fact(n-1) with base case fact(0) = 1",
                  "Trace the call stack frame by frame for small n values",
                  "Observe how return values multiply back up during stack unwinding",
                  "Compare recursive factorial with iterative factorial mentally"
                ]
              },
              theory: [
                {
                  title: "Factorial Definition",
                  body: ["Factorial of n written as n! is the product of all positive integers from 1 to n.\nMathematical definition:\nfact(0) = 1 — base case\nfact(n) = n multiplied by fact(n-1) — recursive case for n greater than 0\nExamples:\n0! = 1\n3! = 3 × 2 × 1 = 6\n5! = 5 × 4 × 3 × 2 × 1 = 120"]
                },
                {
                  title: "Why Factorial is Naturally Recursive",
                  body: ["fact(5) depends on fact(4), which depends on fact(3), all the way down to fact(0). Each call solves a slightly smaller version of the same problem — this is the essence of recursion."]
                },
                {
                  title: "Call Stack Trace for fact(4)",
                  body: ["fact(4) calls fact(3)\nfact(3) calls fact(2)\nfact(2) calls fact(1)\nfact(1) calls fact(0)\nfact(0) returns 1 — base case hit\nfact(1) returns 1 × 1 = 1\nfact(2) returns 2 × 1 = 2\nfact(3) returns 3 × 2 = 6\nfact(4) returns 4 × 6 = 24"]
                },
                {
                  title: "Linear Recursion",
                  body: ["Factorial is linear recursion — each call makes exactly one recursive call unlike Fibonacci which makes two. This means the call stack depth equals n and the time complexity is O(n)."]
                },
                {
                  title: "Integer Overflow Warning",
                  body: ["Factorial grows very fast. fact(13) exceeds the range of int (2,147,483,647). For large n use long or unsigned long long to avoid overflow."]
                }
              ],
              pretest:[],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nlong long fact(int n) {\n    if (n == 0) {\n        return 1;\n    }\n    return n * fact(n - 1);\n}\n\nint main() {\n    int n = 4;\n    printf(\"Factorial=%lld\\n\", fact(n));\n    return 0;\n}",
                steps: [
                  { line: 11, annotation: "main() reads n=4, calls fact(4)", memory: [{ variable: "n", type: "int", value: "4" }], output: "" },
                  { line: 7, annotation: "fact(4) calls fact(3)", memory: [], output: "" },
                  { line: 7, annotation: "fact(3) calls fact(2)", memory: [], output: "" },
                  { line: 7, annotation: "fact(2) calls fact(1)", memory: [], output: "" },
                  { line: 7, annotation: "fact(1) calls fact(0)", memory: [], output: "" },
                  { line: 4, annotation: "fact(0) returns 1 (Base Case)", memory: [], output: "" },
                  { line: 7, annotation: "fact(1) returns 1 * 1 = 1", memory: [], output: "" },
                  { line: 7, annotation: "fact(2) returns 2 * 1 = 2", memory: [], output: "" },
                  { line: 7, annotation: "fact(3) returns 3 * 2 = 6", memory: [], output: "" },
                  { line: 7, annotation: "fact(4) returns 4 * 6 = 24", memory: [], output: "" },
                  { line: 12, annotation: "main() receives 24", memory: [], output: "Factorial=24\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 12",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w12-3",
            title: "Ackermann Function",
            desc: "Compute the Ackermann function recursively.",
            expected: "Ackermann=X",
            content: {
              aim: {
                text: "In this experiment the student will implement the Ackermann function — one of the most famous examples of a function that is computable but not primitive recursive. The student will understand deep nested recursion, double recursion, and why even small inputs like ack(3,3) produce extremely large outputs and massive call stacks. The student will:",
                bullets: [
                  "Understand the three-case definition of the Ackermann function",
                  "Implement ack(m,n) using nested recursion in C",
                  "Trace the call stack for small inputs like ack(1,1) and ack(2,1)",
                  "Understand why ack(4,1) is computationally impractical",
                  "Appreciate the theoretical importance of Ackermann function in computer science"
                ]
              },
              theory: [
                {
                  title: "What is the Ackermann Function?",
                  body: ["The Ackermann function is a classic example from theoretical computer science defined by Wilhelm Ackermann in 1928. It grows faster than any primitive recursive function making it important in computability theory."]
                },
                {
                  title: "Three-Case Definition:",
                  body: ["Case 1: If m=0, return n+1\nCase 2: If m > 0 and n=0, return ack(m-1, 1)\nCase 3: If m > 0 and n > 0, return ack(m-1, ack(m, n-1))"]
                },
                {
                  title: "Why It Grows So Fast",
                  body: ["ack(3,3) = 61. ack(4,1) = 65533. ack(4,2) is a number with 19,728 digits. This explosive growth comes from the double recursion in Case 3 — ack calls itself inside its own argument."]
                },
                {
                  title: "Double Recursion",
                  body: ["Case 3 is ack(m-1, ack(m, n-1)). The inner ack(m, n-1) must fully resolve before the outer ack(m-1, ...) can begin. This creates an enormous call tree even for small inputs."]
                },
                {
                  title: "Practical Limits",
                  body: ["Only test with m ≤ 3 and n ≤ 4 in your program. Larger values will crash the program due to stack overflow or take years to compute."]
                },
                {
                  title: "Theoretical Importance",
                  body: ["The Ackermann function proved that not all computable functions are primitive recursive — a landmark result in mathematical logic and the theory of computation."]
                }
              ],
              pretest: [],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nint ack(int m, int n) {\n    if (m == 0) return n + 1;\n    if (m > 0 && n == 0) return ack(m - 1, 1);\n    return ack(m - 1, ack(m, n - 1));\n}\n\nint main() {\n    printf(\"Ackermann=%d\\n\", ack(1, 1));\n    return 0;\n}",
                steps: [
                  { line: 10, annotation: "main() calls ack(1,1)", memory: [], output: "" },
                  { line: 6, annotation: "ack(1,1): Case 3 applies -> ack(0, ack(1,0))", memory: [], output: "" },
                  { line: 5, annotation: "Resolve ack(1,0): Case 2 applies -> ack(0,1)", memory: [], output: "" },
                  { line: 4, annotation: "Resolve ack(0,1): Case 1 applies -> returns 2", memory: [], output: "" },
                  { line: 6, annotation: "Inner argument resolved. Now resolve ack(0,2)", memory: [], output: "" },
                  { line: 4, annotation: "Resolve ack(0,2): Case 1 applies -> returns 3", memory: [], output: "" },
                  { line: 10, annotation: "printf executes", memory: [], output: "Ackermann=3\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "Ackermann W., Zum Hilbertschen Aufbau der reellen Zahlen, Mathematische Annalen, 1928",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 12",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 13",
        objective: "Pointers, call by reference, dangling pointers",
        tutorial: "Tutorial 13: Call by Reference and Pointers",
        labTitle: "Lab 13: Pointer manipulations",
        experiments: [
          {
            id: "c-w13-1",
            title: "Swap using Call by Reference",
            desc: "Swap two numbers using pointers.",
            expected: "Swapped values",
            content: {
              aim: {
                text: "In this experiment the student will understand the difference between call by value and call by reference in C. The student will implement a swap function using pointers to modify the original variables in the caller function and observe how passing addresses instead of values allows functions to change data outside their own scope. The student will:",
                bullets: [
                  "Understand why call by value fails for swapping",
                  "Learn how pointers carry memory addresses to functions",
                  "Implement swap using pointer parameters",
                  "Observe how dereferencing a pointer modifies the original variable",
                  "Understand the role of & and * operators in call by reference"
                ]
              },
              theory: [
                {
                  title: "Call by Value vs Call by Reference",
                  body: ["In call by value a copy of the variable is passed to the function. Changes inside the function do not affect the original variable in main. This is the default in C.\nIn call by reference the address of the variable is passed using the & operator. The function receives a pointer and uses the * operator to access and modify the original variable directly."]
                },
                {
                  title: "Why Swap Fails with Call by Value",
                  body: ["If you pass a and b directly to swap(a, b) the function gets copies x and y. Swapping x and y does nothing to the original a and b in main. After the function returns a and b are unchanged."]
                },
                {
                  title: "Why Swap Works with Call by Reference",
                  body: ["When you pass &a and &b the function receives pointers to the actual memory locations of a and b. Using *ptr you read or write the value at that address directly. Any change through the pointer changes the original variable."]
                },
                {
                  title: "The & Operator",
                  body: ["& gives the memory address of a variable. &a means the address where a is stored in memory. Example: if a is at address 2000 then &a = 2000."]
                },
                {
                  title: "The * Operator in Pointer Context",
                  body: ["* before a pointer variable dereferences it — meaning go to that address and read or write the value there. If ptr = &a then *ptr = 10 sets a to 10."]
                },
                {
                  title: "Swap Logic using Pointers",
                  body: ["temp = *a stores the value at address a into temp\n*a = *b copies the value at address b into address a\n*b = temp copies temp into address b\nResult: original variables in main are swapped."]
                },
                {
                  title: "Dangling Pointer Brief",
                  body: ["A dangling pointer is a pointer that points to a memory location that has been freed or gone out of scope. Accessing a dangling pointer causes undefined behavior. This is covered as a warning in this week's tutorial."]
                }
              ],
              pretest: [],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 10;\n    int b = 20;\n    swap(&a, &b);\n    printf(\"a=%d b=%d\\n\", a, b);\n    return 0;\n}",
                steps: [
                  { line: 10, annotation: "main() declares a=10 and b=20", memory: [{ variable: "a", type: "int", value: "10", address: "2000" }, { variable: "b", type: "int", value: "20", address: "3000" }], output: "" },
                  { line: 12, annotation: "swap(&a, &b) called", memory: [{ variable: "x", type: "int*", value: "2000" }, { variable: "y", type: "int*", value: "3000" }], output: "" },
                  { line: 4, annotation: "temp = *x", memory: [{ variable: "temp", type: "int", value: "10" }], output: "" },
                  { line: 5, annotation: "*x = *y", memory: [{ variable: "a", type: "int", value: "20", address: "2000" }], output: "" },
                  { line: 6, annotation: "*y = temp", memory: [{ variable: "b", type: "int", value: "10", address: "3000" }], output: "" },
                  { line: 7, annotation: "swap() returns, back in main()", memory: [], output: "" },
                  { line: 13, annotation: "printf executes", memory: [], output: "a=20 b=10\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 13",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w13-2",
            title: "String Copy using Pointer",
            desc: "Copy a string using pointers.",
            expected: "Copied string",
            content: {
              aim: {
                text: "In this experiment the student will implement a custom string copy function using pointer arithmetic in C without using the built-in strcpy() function. The student will understand how pointers traverse character arrays one byte at a time and how the null terminator signals the end of a string. The student will:",
                bullets: [
                  "Understand how strings are stored as character arrays ending with null character",
                  "Use pointer arithmetic to traverse source string character by character",
                  "Copy each character to the destination array using pointer dereferencing",
                  "Append null terminator to complete the destination string",
                  "Understand why array names are already pointers in C"
                ]
              },
              theory: [
                {
                  title: "Strings in C",
                  body: ["C does not have a built-in string type. Strings are stored as arrays of characters terminated by a null character written as backslash zero. Example: \"Hello\" is stored as H e l l o \\0 in memory occupying 6 bytes."]
                },
                {
                  title: "Pointer to a Character Array",
                  body: ["When you declare char s[100] the name s is already a pointer to the first character. You can assign a char pointer to it: char *p = s makes p point to s[0]."]
                },
                {
                  title: "Pointer Arithmetic",
                  body: ["Incrementing a char pointer with p++ moves it forward by one byte to the next character. This is how you traverse a string character by character without using an index."]
                },
                {
                  title: "Dereferencing to Read and Write",
                  body: ["*src reads the character at current position of src pointer.\n*dest = *src copies the character from src position to dest position."]
                },
                {
                  title: "Null Terminator Check",
                  body: ["The while loop condition while(*src) continues as long as the current character is not null. When src reaches the null terminator the loop ends."]
                },
                {
                  title: "Appending Null Terminator",
                  body: ["After the loop ends *dest = '\\0' must be explicitly added to terminate the destination string. Without this the destination array is not a valid C string."]
                },
                {
                  title: "Why No & for Arrays",
                  body: ["Array names decay to pointers automatically in C. char s[100] — s is already the address of s[0]. So strCopy(dest, src) passes the addresses directly without needing &."]
                }
              ],
              pretest: [],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nvoid strCopy(char *dest, char *src) {\n    while (*src != '\\0') {\n        *dest = *src;\n        dest++;\n        src++;\n    }\n    *dest = '\\0';\n}\n\nint main() {\n    char src[] = \"JNTU\";\n    char dest[10];\n    strCopy(dest, src);\n    printf(\"Copied: %s\\n\", dest);\n    return 0;\n}",
                steps: [
                  { line: 14, annotation: "Arrays declared, pointers initialized", memory: [{ variable: "src", type: "char[]", value: "\"JNTU\"", address: "1000" }, { variable: "dest", type: "char[]", value: "empty", address: "2000" }], output: "" },
                  { line: 15, annotation: "strCopy(dest, src) called", memory: [], output: "" },
                  { line: 4, annotation: "Loop iteration 1: *src = 'J'", memory: [], output: "" },
                  { line: 5, annotation: "*dest = *src copies 'J'", memory: [{ variable: "dest[0]", type: "char", value: "'J'", address: "2000" }], output: "" },
                  { line: 6, annotation: "dest++, src++", memory: [], output: "" },
                  { line: 4, annotation: "Loop iteration 2: *src = 'N'", memory: [], output: "" },
                  { line: 5, annotation: "*dest = *src copies 'N'", memory: [{ variable: "dest[1]", type: "char", value: "'N'", address: "2001" }], output: "" },
                  { line: 6, annotation: "dest++, src++", memory: [], output: "" },
                  { line: 4, annotation: "Loop iteration 3: *src = 'T'", memory: [], output: "" },
                  { line: 5, annotation: "*dest = *src copies 'T'", memory: [{ variable: "dest[2]", type: "char", value: "'T'", address: "2002" }], output: "" },
                  { line: 6, annotation: "dest++, src++", memory: [], output: "" },
                  { line: 4, annotation: "Loop iteration 4: *src = 'U'", memory: [], output: "" },
                  { line: 5, annotation: "*dest = *src copies 'U'", memory: [{ variable: "dest[3]", type: "char", value: "'U'", address: "2003" }], output: "" },
                  { line: 6, annotation: "dest++, src++", memory: [], output: "" },
                  { line: 4, annotation: "while(*src) fails — \\0 is falsy", memory: [], output: "" },
                  { line: 9, annotation: "*dest = \\0 adds null terminator", memory: [{ variable: "dest[4]", type: "char", value: "'\\0'", address: "2004" }], output: "" },
                  { line: 16, annotation: "printf executes", memory: [], output: "Copied: JNTU\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 13",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w13-3",
            title: "Count Characters using Pointer",
            desc: "Count uppercase, lowercase, digits, and special characters using pointers.",
            expected: "Character counts",
            content: {
              aim: {
                text: "In this experiment the student will traverse a string using a pointer and classify each character into one of four categories — uppercase letters, lowercase letters, digits, and other characters — using ASCII value comparisons. The student will understand how pointer traversal replaces array indexing and how character classification works in C. The student will:",
                bullets: [
                  "Traverse a character array using a pointer instead of index",
                  "Use ASCII range comparisons to classify each character",
                  "Count occurrences of each character category",
                  "Understand how pointer increment replaces array index increment",
                  "Display the four category counts as formatted output"
                ]
              },
              theory: [
                {
                  title: "ASCII Character Ranges",
                  body: ["Every character in C is stored as an integer using ASCII encoding. The classification ranges are:\nUppercase letters: A to Z → ASCII 65 to 90\nLowercase letters: a to z → ASCII 97 to 122\nDigits: 0 to 9 → ASCII 48 to 57\nOther characters: anything outside the above ranges including spaces, punctuation, symbols"]
                },
                {
                  title: "Pointer Traversal of a String",
                  body: ["Declaring char *p = s makes p point to the first character of string s. Using *p you read the current character. Using p++ you move to the next character. The loop continues while *p is not \\0."]
                },
                {
                  title: "Character Comparison in C",
                  body: ["You can directly compare characters using relational operators. *p >= 'A' && *p <= 'Z' checks if the current character is an uppercase letter. C compares the ASCII values behind the scenes."]
                },
                {
                  title: "Why Pointer Instead of Index",
                  body: ["Using an index variable i and s[i] is equivalent but pointer traversal is more idiomatic C. It demonstrates that strings are just memory sequences and pointers are the natural way to navigate them."]
                },
                {
                  title: "Counting Logic",
                  body: ["Four integer counters upper lower digit other are initialized to zero. In each loop iteration exactly one counter is incremented based on which range the current character falls into. After the loop all four are printed."]
                }
              ],
              pretest: [],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    char str[] = \"Hi9!\";\n    char *p = str;\n    int upper = 0, lower = 0, digit = 0, other = 0;\n    while (*p != '\\0') {\n        if (*p >= 'A' && *p <= 'Z') upper++;\n        else if (*p >= 'a' && *p <= 'z') lower++;\n        else if (*p >= '0' && *p <= '9') digit++;\n        else other++;\n        p++;\n    }\n    printf(\"Upper=%d Lower=%d Digit=%d Other=%d\\n\", upper, lower, digit, other);\n    return 0;\n}",
                steps: [
                  { line: 4, annotation: "p initialized, counters all zero", memory: [{ variable: "upper", type: "int", value: "0" }, { variable: "lower", type: "int", value: "0" }, { variable: "digit", type: "int", value: "0" }, { variable: "other", type: "int", value: "0" }], output: "" },
                  { line: 7, annotation: "*p = H, ASCII 72 (uppercase)", memory: [], output: "" },
                  { line: 8, annotation: "upper++", memory: [{ variable: "upper", type: "int", value: "1" }], output: "" },
                  { line: 12, annotation: "p++ moves to i", memory: [], output: "" },
                  { line: 7, annotation: "*p = i, ASCII 105 (lowercase)", memory: [], output: "" },
                  { line: 9, annotation: "lower++", memory: [{ variable: "lower", type: "int", value: "1" }], output: "" },
                  { line: 12, annotation: "p++ moves to 9", memory: [], output: "" },
                  { line: 7, annotation: "*p = 9, ASCII 57 (digit)", memory: [], output: "" },
                  { line: 10, annotation: "digit++", memory: [{ variable: "digit", type: "int", value: "1" }], output: "" },
                  { line: 12, annotation: "p++ moves to !", memory: [], output: "" },
                  { line: 7, annotation: "*p = !, ASCII 33 (other)", memory: [], output: "" },
                  { line: 11, annotation: "other++", memory: [{ variable: "other", type: "int", value: "1" }], output: "" },
                  { line: 12, annotation: "p++ moves to \\0", memory: [], output: "" },
                  { line: 7, annotation: "*p = \\0, loop exits", memory: [], output: "" },
                  { line: 14, annotation: "printf executes", memory: [], output: "Upper=1 Lower=1 Digit=1 Other=1\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 13",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          }
        ],
      },
      {
        title: "WEEK 14",
        objective: "File I/O, text and binary files, command-line args",
        tutorial: "Tutorial 14: File Handling",
        labTitle: "Lab 14: File operations",
        experiments: [
          {
            id: "c-w14-1",
            title: "Write and Read Text File",
            desc: "Simulate writing to and reading from a text file.",
            expected: "Read: [input text]",
            content: {
              aim: {
                text: "In this experiment the student will learn how to perform basic file operations in C using the FILE pointer, fopen(), fprintf(), fgets(), and fclose() functions. The student will write user input into a text file and then read it back and display it on screen. The student will:",
                bullets: [
                  "Understand the FILE structure and file pointer in C",
                  "Open a file in write mode using fopen()",
                  "Write text to the file using fprintf()",
                  "Close and reopen the file in read mode",
                  "Read content back using fgets() and display it"
                ]
              },
              theory: [
                {
                  title: "What is a File in C?",
                  body: ["A file is a named storage location on disk. Unlike variables which live in RAM and disappear when the program ends, files persist data permanently. C provides standard library functions for file operations through the stdio.h header."]
                },
                {
                  title: "FILE Pointer",
                  body: ["FILE is a structure defined in stdio.h that holds all information about an open file. You always use a pointer to FILE: FILE *f. This pointer is returned by fopen() and used in all subsequent file operations."]
                },
                {
                  title: "fopen() — Opening a File",
                  body: ["fopen(filename, mode) opens a file and returns a FILE pointer.\nCommon modes:\n\"w\" : Write — creates file or overwrites existing\n\"r\" : Read — opens existing file for reading\n\"a\" : Append — adds to end of existing file\n\"rb\" : Read binary\n\"wb\" : Write binary\nAlways check if fopen returned NULL — NULL means the file could not be opened."]
                },
                {
                  title: "fprintf() — Writing to File",
                  body: ["Works exactly like printf() but writes to a file instead of screen. First argument is the FILE pointer."]
                },
                {
                  title: "fgets() — Reading from File",
                  body: ["fgets(buffer, size, filepointer) reads one line from the file into buffer. Stops at newline or size-1 characters. Returns NULL at end of file."]
                },
                {
                  title: "fclose() — Closing a File",
                  body: ["Always close files after use with fclose(). This flushes the write buffer to disk and releases the file handle. Not closing a file can cause data loss or corruption."]
                },
                {
                  title: "Text File vs Binary File",
                  body: ["Text files store data as human-readable ASCII characters. Binary files store raw bytes. For this experiment we use text mode."]
                }
              ],
              pretest:[],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    FILE *f;\n    char text[100] = \"Hello JNTUGV\";\n    f = fopen(\"test.txt\", \"w\");\n    fprintf(f, \"%s\", text);\n    fclose(f);\n    \n    f = fopen(\"test.txt\", \"r\");\n    fgets(text, 100, f);\n    fclose(f);\n    printf(\"Read: %s\\n\", text);\n    return 0;\n}",
                steps: [
                  { line: 5, annotation: "Input stored in memory", memory: [{ variable: "text", type: "char[]", value: "\"Hello JNTUGV\"" }], output: "" },
                  { line: 6, annotation: "fopen(\"test.txt\", \"w\") called", memory: [{ variable: "f", type: "FILE*", value: "file pointer" }], output: "" },
                  { line: 7, annotation: "fprintf writes to test.txt", memory: [], output: "" },
                  { line: 8, annotation: "fclose(f) called. Buffer flushed", memory: [], output: "" },
                  { line: 10, annotation: "fopen(\"test.txt\", \"r\") called", memory: [{ variable: "f", type: "FILE*", value: "file pointer" }], output: "" },
                  { line: 11, annotation: "fgets reads content into text[]", memory: [], output: "" },
                  { line: 12, annotation: "fclose(f) called", memory: [], output: "" },
                  { line: 13, annotation: "printf executes", memory: [], output: "Read: Hello JNTUGV\n" }
                ]
              },
              posttest: [],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 14",
                "GCC Documentation: https://gcc.gnu.org/onlinedocs/"
              ]
            }
          },
          {
            id: "c-w14-2",
            title: "Count Lines Words Characters",
            desc: "Read a file and output the count of lines, words, and characters.",
            expected: "Lines=X Words=X Chars=X",
            content: {
              aim: {
                text: "In this experiment the student will write text to a file and then read it back character by character using fgetc() to count the total number of lines, words, and characters. The student will understand how to detect word boundaries using space and newline characters and how fgetc() returns EOF at end of file. The student will:",
                bullets: [
                  "Write multi-line text to a file using fprintf()",
                  "Read the file character by character using fgetc()",
                  "Count lines by detecting newline characters",
                  "Count words by detecting transitions from whitespace to non-whitespace",
                  "Count total characters read",
                  "Display all three counts as formatted output"
                ]
              },
              theory: [
                {
                  title: "fgetc() — Reading One Character at a Time",
                  body: ["fgetc(filepointer) reads one character from the file and advances the file position. Returns the character as an int. Returns EOF (End Of File) which is -1 when there are no more characters to read. This is why the return type is int not char — to accommodate EOF which is outside the char range."]
                },
                {
                  title: "EOF Detection",
                  body: ["The while loop condition while((c = fgetc(f)) != EOF) reads one character into c and continues as long as c is not EOF. This is the standard idiomatic pattern for reading files character by character in C."]
                },
                {
                  title: "Counting Lines",
                  body: ["Every time a newline character \\n is encountered increment the lines counter. If the file has content after the last newline an additional count may be needed. For simplicity we add 1 to lines if the file is non-empty to count the last line."]
                },
                {
                  title: "Counting Words",
                  body: ["A word starts when a non-whitespace character follows a whitespace character or the beginning of file. Track the previous character as prev. When current character is not space or newline AND previous character was space or newline increment word counter."]
                },
                {
                  title: "Counting Characters",
                  body: ["Increment character counter for every character read including spaces and newlines. This gives total raw character count."]
                },
                {
                  title: "Difference from wc Command",
                  body: ["This program mirrors the behavior of the Unix wc command which is used to count lines words and characters in files."]
                }
              ],
              pretest: [],
              procedure: [
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
              simulation: {
                code: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"Hi Bye\");\n    fclose(f);\n    \n    f = fopen(\"temp.txt\", \"r\");\n    int c, chars = 0, words = 0, lines = 0, prev = ' ';\n    while ((c = fgetc(f)) != EOF) {\n        chars++;\n        if (c == '\\n') lines++;\n        if (c != ' ' && c != '\\n' && (prev == ' ' || prev == '\\n')) words++;\n        prev = c;\n    }\n    if (chars > 0 && prev != '\\n') lines++;\n    fclose(f);\n    printf(\"Lines=%d Words=%d Chars=%d\\n\", lines, words, chars);\n    return 0;\n}",
                steps: [
                  { line: 5, annotation: "File written and closed", memory: [], output: "" },
                  { line: 8, annotation: "File opened in read mode", memory: [], output: "" },
                  { line: 9, annotation: "Ready to read", memory: [{ variable: "chars", type: "int", value: "0" }, { variable: "words", type: "int", value: "0" }, { variable: "lines", type: "int", value: "0" }], output: "" },
                  { line: 10, annotation: "Read 'H'", memory: [{ variable: "chars", type: "int", value: "1" }, { variable: "words", type: "int", value: "1" }], output: "" },
                  { line: 10, annotation: "Read 'i'", memory: [{ variable: "chars", type: "int", value: "2" }, { variable: "words", type: "int", value: "1" }], output: "" },
                  { line: 10, annotation: "Read space", memory: [{ variable: "chars", type: "int", value: "3" }, { variable: "words", type: "int", value: "1" }], output: "" },
                  { line: 10, annotation: "Read 'B'", memory: [{ variable: "chars", type: "int", value: "4" }, { variable: "words", type: "int", value: "2" }], output: "" },
                  { line: 10, annotation: "Read 'y' and 'e'", memory: [{ variable: "chars", type: "int", value: "6" }, { variable: "words", type: "int", value: "2" }], output: "" },
                  { line: 16, annotation: "fgetc returns EOF, loop exits", memory: [{ variable: "lines", type: "int", value: "1" }], output: "" },
                  { line: 18, annotation: "printf executes", memory: [], output: "Lines=1 Words=2 Chars=6\n" }
                ]
              },
              posttest:[],
              references: [
                "Kernighan B.W. and Ritchie D.M., The C Programming Language, 2nd Edition, Prentice Hall",
                "Balagurusamy E., Programming in ANSI C, 8th Edition, McGraw Hill",
                "JNTUGV C Programming Lab Syllabus, BS&HSS Department, Week 14",
                "GCC Documentation on File I/O: https://gcc.gnu.org/onlinedocs/",
                "Wandbox Online Compiler: https://wandbox.org"
              ]
            }
          }
        ],
      },
    ],
  },
  "python": pythonCourse,
  "dbms": dbmsCourse,
  "advanced-data-structures": adsCourse,
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