import { dbmsCourse } from './dbms-data';
import { adsCourse } from './ads-data';
import { dsCourse } from './ds-data';
import { aiCourse } from './ai-data';
import { pythonCourse } from './python-data';
import { javaCourse } from './java-data';
import { iotCourse } from './iot-data';
import { cShortNotes } from './c-short-notes';
import { mlShortNotes } from './ml-short-notes';

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
              pretest: [
                {
                  question: "Which tokenization artifact directly causes an LLM to encounter an 'Out-Of-Vocabulary' (OOV) error?",
                  options: ["Word-level tokenization", "Character-level tokenization", "Subword tokenization", "Byte-Pair Encoding"],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Word-level tokenization" },
                {
                  question: "If a corpus contains the word frequencies {'low': 5, 'lower': 2, 'newest': 6}, what is the initial character-level vocabulary (excluding special tokens)?",
                  options: ["{'l', 'o', 'w', 'e', 'r', 'n', 's', 't'}", "{'low', 'lower', 'newest'}", "{'l', 'o', 'w'}", "{'n', 'e', 'w', 's', 't'}"],
                  answerIndex: 0, hint: "Think about why the correct answer involves: {'l', 'o', 'w', 'e', 'r', 'n', 's', 't'}" },
                {
                  question: "Why does GPT-4 use byte-level BPE instead of raw character-level BPE?",
                  options: ["It guarantees that any string can be tokenized, including rare Unicode characters.", "It reduces the vocabulary size to just 256 tokens.", "It completely eliminates the need for merging tokens.", "It is faster to compute on GPUs."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It guarantees that any string can be tokenized, including rare Unicode characters." },
                {
                  question: "What is the primary advantage of subword tokenization over character-level tokenization?",
                  options: ["It balances vocabulary size with sequence length, capturing meaningful subwords.", "It requires no training data to construct the vocabulary.", "It treats every single character as a unique token, maximizing context.", "It ensures that every word gets exactly one token."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It balances vocabulary size with sequence length, capturing meaningful subwords." },
                {
                  question: "During the BPE algorithm, which pair of symbols is merged in each iteration?",
                  options: ["The pair with the highest frequency of adjacent occurrences.", "The longest pair of symbols.", "The pair containing the most vowels.", "A randomly selected pair of adjacent symbols."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The pair with the highest frequency of adjacent occurrences." }
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
                {
                  question: "Given a fixed token limit, how does an inadequate BPE vocabulary size affect an LLM's context window efficiency?",
                  options: ["It increases sequence lengths since words are split into too many small tokens.", "It reduces sequence lengths by merging too many unrelated characters.", "It has no effect on the context window.", "It causes the LLM to process data faster."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It increases sequence lengths since words are split into too many small tokens." },
                {
                  question: "Why can subword tokenizers cause vulnerabilities when handling structural formatting like code indentation or raw numerical data matrices?",
                  options: ["They inconsistently group spaces and digits depending on their surrounding context.", "They completely ignore all numbers and spaces during tokenization.", "They convert all numbers into text equivalents (e.g., '1' to 'one').", "They crash when encountering more than three spaces in a row."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: They inconsistently group spaces and digits depending on their surrounding context." },
                {
                  question: "What is the purpose of appending an end-of-word token (e.g., </w>) during BPE?",
                  options: ["To prevent merging characters across word boundaries.", "To signify the end of the entire document.", "To act as a punctuation mark in the final output.", "To reduce the overall vocabulary size."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: To prevent merging characters across word boundaries." },
                {
                  question: "How does BPE handle a completely novel word that was never seen during training?",
                  options: ["It splits the word into smaller known subword tokens or base characters.", "It throws an 'Out-Of-Vocabulary' error and halts execution.", "It ignores the word completely.", "It arbitrarily assigns it the token ID of a similar-sounding word."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It splits the word into smaller known subword tokens or base characters." },
                {
                  question: "Which of the following best describes the trade-off controlled by the number of BPE merge operations?",
                  options: ["More merges increase vocabulary size but decrease sequence length.", "More merges decrease vocabulary size and decrease sequence length.", "More merges increase both vocabulary size and sequence length.", "More merges have no impact on vocabulary size or sequence length."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: More merges increase vocabulary size but decrease sequence length." }
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
              pretest: [
                {
                  question: "What is the fundamental difference in geometric output between the Euclidean distance and Cosine Similarity of two vectors?",
                  options: ["Cosine similarity measures the angle between vectors, while Euclidean distance measures the straight-line magnitude difference.", "Cosine similarity is only for 2D planes, while Euclidean is for high dimensions.", "Euclidean distance is always bounded between 0 and 1, unlike Cosine similarity.", "There is no mathematical difference; they always yield the same relative rankings."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Cosine similarity measures the angle between vectors, while Euclidean distance measures the straight..." },
                {
                  question: "If two token vectors point in exactly opposite directions in an embedding space, what is their calculated cosine similarity?",
                  options: ["-1", "0", "1", "Infinity"],
                  answerIndex: 0, hint: "Think about why the correct answer involves: -1" },
                {
                  question: "Why can static embeddings (like Word2Vec) not adequately differentiate the semantic meaning of the token 'apple' in tech contexts vs. agricultural contexts?",
                  options: ["They assign exactly one fixed vector to each token regardless of its surrounding context.", "They are limited to very low dimensions (e.g., 3 or 4) which cannot capture dual meanings.", "They only train on agricultural datasets.", "They explicitly remove all homonyms from their vocabulary."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: They assign exactly one fixed vector to each token regardless of its surrounding context." },
                {
                  question: "What does the dimensionality $d$ of a word embedding vector represent?",
                  options: ["The number of continuous features or latent semantic attributes capturing the word's meaning.", "The total number of letters in the word.", "The frequency of the word in the training corpus.", "The vocabulary size of the entire model."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The number of continuous features or latent semantic attributes capturing the word's meaning." },
                {
                  question: "Which operation is typically used to normalize a vector to unit length?",
                  options: ["Dividing the vector by its L2 norm (magnitude).", "Adding 1 to every element in the vector.", "Taking the square root of the vector.", "Multiplying the vector by pi."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Dividing the vector by its L2 norm (magnitude)." }
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
                {
                  question: "When dealing with high-dimensional embedding spaces, why does the 'curse of dimensionality' render standard Euclidean distance ($L_2$ norm) less effective than Cosine Similarity?",
                  options: ["As dimensions increase, the distance between any two points converges, making angle-based metrics more robust for distinguishing vectors.", "High-dimensional spaces cause Euclidean distance to always calculate to zero.", "Euclidean distance calculation is computationally impossible beyond 100 dimensions.", "Cosine similarity automatically reduces the dimensionality of the vectors."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: As dimensions increase, the distance between any two points converges, making angle-based metrics mo..." },
                {
                  question: "How does the attention mechanism in transformer blocks modify static input representations into dynamic context-aware embeddings?",
                  options: ["By taking weighted sums of other token vectors in the sequence, allowing representations to shift based on context.", "By permanently overwriting the static embedding lookup table in memory.", "By randomly shuffling the dimensions of the vector.", "By converting the vectors back into raw text strings and re-tokenizing them."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: By taking weighted sums of other token vectors in the sequence, allowing representations to shift ba..." },
                {
                  question: "In the equation $\\vec{v}_{King} - \\vec{v}_{Man} + \\vec{v}_{Woman} \\approx \\vec{v}_{Queen}$, what linguistic property is captured by the vector space?",
                  options: ["Analogical reasoning and semantic relationships through linear offsets.", "Syntactic grammar rules and punctuation.", "Phonetic pronunciation patterns.", "Absolute frequency of word occurrence."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Analogical reasoning and semantic relationships through linear offsets." },
                {
                  question: "Why is t-SNE often used in conjunction with high-dimensional word embeddings?",
                  options: ["To reduce dimensions to 2D or 3D for human visualization and cluster analysis.", "To increase the dimensions of the vector for better machine learning performance.", "To calculate the exact cosine similarity between a million vectors simultaneously.", "To train the embedding model from scratch."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: To reduce dimensions to 2D or 3D for human visualization and cluster analysis." },
                {
                  question: "If two words are completely unrelated semantically, what cosine similarity score would you expect them to have (assuming mean-centered vectors)?",
                  options: ["Close to 0", "Close to 1", "Exactly 100", "Less than -1"],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Close to 0" }
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
              pretest: [
                {
                  question: "Why do Vanilla Transformer blocks require positional encodings, whereas Recurrent Neural Networks (RNNs) do not?",
                  options: ["Transformers process all tokens simultaneously without inherent sequential order, whereas RNNs process tokens sequentially step-by-step.", "Transformers only work with images, while RNNs only work with text.", "RNNs implicitly generate positional encodings through backpropagation through time.", "Transformers require positional encodings to reduce the dimensionality of the embeddings."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Transformers process all tokens simultaneously without inherent sequential order, whereas RNNs proce..." },
                {
                  question: "What fundamental problem within deep architectures does the addition of Layer Normalization ($LayerNorm$) and Residual Connections solve inside the Transformer block?",
                  options: ["They mitigate vanishing and exploding gradients, stabilizing training in very deep networks.", "They compress the model size to fit into GPU memory.", "They prevent the model from memorizing the vocabulary.", "They automatically translate words into multiple languages."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: They mitigate vanishing and exploding gradients, stabilizing training in very deep networks." },
                {
                  question: "What is the structural difference between an Encoder-only architecture (e.g., BERT) and a Decoder-only architecture (e.g., GPT)?",
                  options: ["Encoder-only has bidirectional attention, while Decoder-only uses masked (causal) attention to prevent looking into the future.", "Decoder-only models can only process numerical data.", "Encoder-only models are used for generation, while Decoder-only models are used for classification.", "There is no structural difference; they just use different training datasets."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Encoder-only has bidirectional attention, while Decoder-only uses masked (causal) attention to preve..." },
                {
                  question: "Which of the following best describes how the Transformer processes input sequences compared to LSTMs?",
                  options: ["In parallel, allowing for highly efficient hardware acceleration.", "Token-by-token, from left to right.", "Token-by-token, from right to left.", "It processes only the first and last tokens of a sequence."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: In parallel, allowing for highly efficient hardware acceleration." },
                {
                  question: "What is the denominator used to control the geometric frequency in the standard sinusoidal positional encoding formula?",
                  options: ["10000", "100", "10", "1000000"],
                  answerIndex: 0, hint: "Think about why the correct answer involves: 10000" }
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
                {
                  question: "Why is an additive positional wave layout preferred over simply appending an index integer (like 1, 2, 3...) to word vectors?",
                  options: ["Integers can grow arbitrarily large and distort the magnitude of the embedding space, whereas sine/cosine waves remain bounded between -1 and 1.", "Integers take up more memory space in the GPU.", "Sine/cosine waves are faster to compute than simple integers.", "Appending an integer requires a complex neural network to decode."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Integers can grow arbitrarily large and distort the magnitude of the embedding space, whereas sine/c..." },
                {
                  question: "How does the Feed-Forward Network (FFN) subsection inside each transformer layer process tokens differently than the preceding Attention layer?",
                  options: ["The FFN processes each token position independently and identically, whereas the Attention layer aggregates information across all tokens.", "The FFN averages all tokens together, while the Attention layer keeps them separate.", "The FFN is responsible for tokenization, while Attention does the embedding.", "There is no difference; they perform the exact same mathematical operations."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The FFN processes each token position independently and identically, whereas the Attention layer agg..." },
                {
                  question: "In the context of positional encodings, why are alternating sine and cosine functions used?",
                  options: ["They allow the model to easily learn to attend to relative positions through linear transformations.", "They reduce the memory footprint of the matrix by 50%.", "They are the only mathematical functions that can be computed on modern GPUs.", "They perfectly map to the frequency of human speech waves."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: They allow the model to easily learn to attend to relative positions through linear transformations...." },
                {
                  question: "Without positional encodings, how would a standard Self-Attention mechanism treat the sentence 'Dog bites man' versus 'Man bites dog'?",
                  options: ["It would compute the exact same representation for both sentences, treating them as unordered bags of words.", "It would throw an error and refuse to process the text.", "It would randomly assign meaning based on word length.", "It would inherently know the difference based on the word vectors."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It would compute the exact same representation for both sentences, treating them as unordered bags o..." },
                {
                  question: "What happens when the sequence length exceeds the maximum sequence length seen during training for standard sinusoidal positional encodings?",
                  options: ["The model can extrapolate to unseen lengths reasonably well due to the periodic nature of the trigonometric functions.", "The model will crash with an out-of-bounds index error.", "The model will loop back and re-use positional encodings starting from 0.", "The positional encodings become all zeros."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The model can extrapolate to unseen lengths reasonably well due to the periodic nature of the trigon..." }
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
              pretest: [
                {
                  question: "What specific operational role do the Queries ($Q$), Keys ($K$), and Values ($V$) vectors perform conceptually when looking up contextual definitions?",
                  options: ["Query is what you're looking for, Key is what a token has to offer, and Value is the actual content/meaning to be aggregated.", "Query is the input text, Key is the desired output, and Value is the loss function.", "They all contain the exact same identical embeddings with no functional difference.", "Query stores grammar rules, Key stores punctuation, and Value stores vocabulary definitions."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Query is what you're looking for, Key is what a token has to offer, and Value is the actual content/..." },
                {
                  question: "What happens to the gradients of the Softmax layer if the scaling factor $\\sqrt{d_k}$ is omitted when computing attention scores with massive embedding sizes?",
                  options: ["The dot products become extremely large, pushing the softmax function into regions where gradients are near zero.", "The gradients explode, causing immediate numerical overflow errors.", "The softmax function outputs negative probabilities.", "Nothing changes; the scaling factor is purely aesthetic."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The dot products become extremely large, pushing the softmax function into regions where gradients a..." },
                {
                  question: "What is the structural difference between standard Self-Attention and Causal (Masked) Attention?",
                  options: ["Causal Attention masks future tokens to prevent information leakage during autoregressive generation, whereas standard Self-Attention allows full bidirectional context.", "Causal Attention can only process numbers, while Self-Attention processes words.", "Standard Self-Attention uses addition instead of multiplication for weighting.", "Causal Attention entirely omits the Value matrix calculation."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Causal Attention masks future tokens to prevent information leakage during autoregressive generation..." },
                {
                  question: "In Scaled Dot-Product Attention, which matrices are multiplied to compute the raw similarity score before scaling?",
                  options: ["Query ($Q$) and Key Transpose ($K^T$)", "Query ($Q$) and Value ($V$)", "Key ($K$) and Value ($V$)", "Query ($Q$) and Query Transpose ($Q^T$)"],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Query ($Q$) and Key Transpose ($K^T$)" },
                {
                  question: "What is the purpose of applying the softmax function to the attention scores?",
                  options: ["To convert the raw similarity scores into a valid probability distribution where weights sum to 1.0.", "To convert all numbers to integers.", "To square the values and increase contrast.", "To randomly drop out connections for regularization."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: To convert the raw similarity scores into a valid probability distribution where weights sum to 1.0...." }
              ],
              procedure: [
                "Score Calculation: Compute the raw similarity score matrix by running a dot product between the Query matrix (Q) and the transpose of the Key matrix (K^T).",
                "Scaling Phase: Divide every component inside the raw score matrix by the scaling metric \\sqrt{d_k}.",
                "Probability Distribution: Apply a row-wise softmax mathematical routing operation to ensure all relevance weights add up to exactly 1.0.",
                "Context Synthesis: Multiply the computed attention weights directly against the Value matrix (V) to construct the final context-aware output states."
              ],
              posttest: [
                {
                  question: "How does Multi-Head Attention build upon Scaled Dot-Product Attention to capture diverse linguistic relationships simultaneously?",
                  options: ["It projects the input into multiple lower-dimensional subspaces, runs attention independently in parallel, and concatenates the results.", "It loops over the same attention mechanism hundreds of times sequentially.", "It applies attention to multiple entirely different languages at once.", "It replaces the dot-product operation with a massive fully-connected neural network."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It projects the input into multiple lower-dimensional subspaces, runs attention independently in par..." },
                {
                  question: "Given an input sequence length of $N$, explain why the computational complexity of the self-attention operation scales as $\\mathcal{O}(N^2)$.",
                  options: ["Because the mechanism computes the dot product of every token against every other token in the sequence to build an $N \\times N$ attention matrix.", "Because the vocabulary size is squared during the embedding lookup phase.", "Because there are two main matrices ($Q$ and $K$) being multiplied.", "It does not scale quadratically; it scales linearly as $\\mathcal{O}(N)$."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Because the mechanism computes the dot product of every token against every other token in the seque..." },
                {
                  question: "What does dividing by $\\sqrt{d_k}$ essentially achieve in Scaled Dot-Product Attention?",
                  options: ["It ensures the variance of the dot products remains near 1, stabilizing gradients.", "It guarantees that the resulting matrix will be perfectly symmetric.", "It increases the absolute magnitude of the scores to speed up convergence.", "It compresses the dimensionality back to $d_k$."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It ensures the variance of the dot products remains near 1, stabilizing gradients." },
                {
                  question: "If a token strongly attends to itself, what will be the dominant element in its corresponding attention weight vector?",
                  options: ["The diagonal element corresponding to its own position will be close to 1.0.", "All elements will be exactly 0.", "The elements will be a uniform distribution across the entire vector.", "The element corresponding to the first word in the sentence will be 1.0."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The diagonal element corresponding to its own position will be close to 1.0." },
                {
                  question: "Why are the $Q, K, V$ matrices projected via linear layers instead of using the raw token embeddings directly?",
                  options: ["To provide learnable parameters that allow the model to learn different projection spaces tailored for specific attention roles.", "To reduce the computational cost of the dot product by eliminating zero values.", "To satisfy a strict mathematical constraint required by the softmax function.", "To prevent the model from learning anything from the raw embeddings."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: To provide learnable parameters that allow the model to learn different projection spaces tailored f..." }
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
                {
                  question: "What architectural characteristic enables a modern LLM to perform zero-shot tasks that it was not explicitly fine-tuned to solve?",
                  options: ["Massive unsupervised pre-training across diverse text corpora allows the model to learn universal language structures and relationships.", "They are hardcoded with millions of if/else statements for every possible language task.", "They automatically download the correct answer from the internet during inference.", "They use a built-in recurrent loop to practice the task before responding."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Massive unsupervised pre-training across diverse text corpora allows the model to learn universal la..." },
                {
                  question: "If a zero-shot prompt returns highly fluctuating, unaligned responses across API calls, which runtime hyperparameter should you decrease to enforce structural consistency?",
                  options: ["Temperature", "Max Tokens", "Frequency Penalty", "Batch Size"],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Temperature" },
                {
                  question: "How do system prompts (system instructions) differ from user prompts in a zero-shot interaction setup?",
                  options: ["System prompts establish the overarching behavior and constraints of the assistant, while user prompts provide the specific task or input data.", "System prompts are only read by the API server, while user prompts are read by the model.", "System prompts are always shorter than user prompts.", "There is no functional difference; they are just concatenated together."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: System prompts establish the overarching behavior and constraints of the assistant, while user promp..." },
                {
                  question: "What is the fundamental difference between zero-shot prompting and few-shot prompting?",
                  options: ["Zero-shot provides no examples of the desired output within the context window, while few-shot includes explicit demonstrations.", "Zero-shot uses exactly zero tokens, while few-shot uses a few tokens.", "Zero-shot is used for images, while few-shot is used for text.", "Zero-shot requires fine-tuning, while few-shot does not."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Zero-shot provides no examples of the desired output within the context window, while few-shot inclu..." },
                {
                  question: "When evaluating a zero-shot text classification prompt, why is it important to use a deterministic temperature?",
                  options: ["To ensure the model returns the most likely classification label consistently, removing randomness from the benchmark.", "To make the model generate more creative and poetic responses.", "To increase the speed of the API call.", "To prevent the model from crashing on long inputs."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: To ensure the model returns the most likely classification label consistently, removing randomness f..." }
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
                {
                  question: "Under what technical conditions does zero-shot prompting completely break down, forcing a developer to switch to in-context learning regimes?",
                  options: ["When the task requires proprietary domain knowledge, highly specific formatting, or complex logic rules not present in the pre-training data.", "When the prompt is translated into a different language.", "When the temperature parameter is set to 0.0.", "When the model is running on a CPU instead of a GPU."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: When the task requires proprietary domain knowledge, highly specific formatting, or complex logic ru..." },
                {
                  question: "Explain how prompt injection vulnerabilities can alter the execution path of a zero-shot model configuration.",
                  options: ["Malicious input data can contain hidden instructions that override the original system prompt, forcing the model to perform unauthorized actions.", "It causes the model to delete its own internal weights.", "It forces the model to encrypt its output.", "It slows down the API response time dramatically."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Malicious input data can contain hidden instructions that override the original system prompt, forci..." },
                {
                  question: "How can you mitigate the risk of an LLM generating unwanted introductory filler (e.g., 'Here is the summary:') during a zero-shot API request?",
                  options: ["Explicitly command the model in the system prompt to output ONLY the final answer with no conversational filler.", "Increase the temperature parameter to maximum.", "Add more user prompts to the conversation history.", "There is no way to stop an LLM from being conversational."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Explicitly command the model in the system prompt to output ONLY the final answer with no conversati..." },
                {
                  question: "What role does the model's pre-training dataset scale play in its zero-shot capabilities?",
                  options: ["Larger and more diverse datasets directly correlate with stronger zero-shot generalization across a wider variety of tasks.", "Smaller datasets make zero-shot prompting more accurate due to less noise.", "Dataset scale has absolutely no effect on zero-shot performance.", "Larger datasets only help with few-shot prompting, not zero-shot."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Larger and more diverse datasets directly correlate with stronger zero-shot generalization across a" },
                {
                  question: "Why might a model succeed at zero-shot translation but fail at a zero-shot proprietary logic puzzle?",
                  options: ["Translation mappings are heavily represented in pre-training data, while proprietary logic puzzles are novel structural tasks requiring external context.", "The model has a built-in dictionary specifically for translation.", "Logic puzzles require a calculator module.", "Translation uses fewer tokens than logic puzzles."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Translation mappings are heavily represented in pre-training data, while proprietary logic puzzles a..." }
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
                {
                  question: "Does few-shot prompting update the structural network weights of an active LLM during inference? Explain your answer.",
                  options: ["No, it only leverages the dynamic attention mechanism within the context window; the underlying model weights remain entirely frozen.", "Yes, it performs a micro-gradient descent step called fine-tuning.", "Yes, it modifies the embedding layer permanently.", "No, it bypasses the LLM entirely and uses a secondary matching algorithm."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: No, it only leverages the dynamic attention mechanism within the context window; the underlying mode..." },
                {
                  question: "What is majority label bias, and how does providing an unequal distribution of positive/negative examples in a few-shot prompt affect execution?",
                  options: ["The model becomes statistically skewed toward predicting whichever label appeared most frequently in the exemplars.", "The model will completely ignore the majority label to balance the scales.", "It has no effect because LLMs are mathematically perfectly unbiased.", "It causes the model to output a continuous stream of the majority label infinitely."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The model becomes statistically skewed toward predicting whichever label appeared most frequently in..." },
                {
                  question: "How does increasing the sequence length of your few-shot context window directly affect API compute latency and token transaction costs?",
                  options: ["Compute latency and token costs increase linearly (or quadratically in some attention mechanisms) as the context window grows.", "Compute latency decreases because more examples make the model answer faster.", "Token costs remain identical regardless of context size.", "Latency increases but token costs are only based on the final generated output."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Compute latency and token costs increase linearly (or quadratically in some attention mechanisms) as..." },
                {
                  question: "Why is a consistent delimiter schema (like `###` or `---`) crucial when designing few-shot exemplars?",
                  options: ["It clearly defines structural boundaries for the attention mechanism, preventing the model from confusing the end of one example with the start of another.", "It acts as a secret password to unlock the model's full intelligence.", "It compresses the string so it uses fewer tokens.", "It stops the model from hallucinating HTML code."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It clearly defines structural boundaries for the attention mechanism, preventing the model from conf..." },
                {
                  question: "What happens if the test input at the end of a few-shot prompt is missing the final trigger word (e.g., 'Output:')?",
                  options: ["The model might fail to recognize that it is its turn to predict and instead generate another hypothetical input-output exemplar.", "The model will automatically add the trigger word and answer correctly.", "The API will return a 400 Bad Request error.", "The model will delete the entire context window."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The model might fail to recognize that it is its turn to predict and instead generate another hypoth..." }
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
                {
                  question: "If the few-shot exemplars contain factually incorrect input-output mappings, how does the model process the task logic versus the formatting styles?",
                  options: ["Research shows LLMs will often adopt the strict formatting style of the exemplars while largely ignoring the factual incorrectness of the mappings.", "The model immediately detects the factual errors and refuses to generate a response.", "The model corrects the factual errors in the exemplars before answering.", "The model copies the factual errors verbatim and ignores the formatting."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Research shows LLMs will often adopt the strict formatting style of the exemplars while largely igno..." },
                {
                  question: "What programmatic strategy would you use to dynamically select the most relevant few-shot examples from a massive vector database for a given user query?",
                  options: ["Calculate the cosine similarity between the user query embedding and the database exemplar embeddings, injecting the top-K closest matches into the prompt.", "Select examples randomly from the database to ensure maximum diversity.", "Inject the entire database into the context window.", "Manually hardcode different prompts for every possible user query."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Calculate the cosine similarity between the user query embedding and the database exemplar embedding..." },
                {
                  question: "How does the order of exemplars within the context window influence the model's final prediction?",
                  options: ["Recency bias causes models to disproportionately weight the structural and categorical patterns of the exemplars placed closest to the end of the prompt.", "The first exemplar is the only one the model actually reads.", "Order has absolutely no impact due to parallel self-attention processing.", "The model automatically sorts the exemplars alphabetically before processing them."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Recency bias causes models to disproportionately weight the structural and categorical patterns of t..." },
                {
                  question: "Why might an LLM start 'hallucinating' additional exemplars instead of answering the target question?",
                  options: ["If the final target input is not formatted identically to the previous exemplars, the model may assume the sequence is meant to continue generating more training data.", "Because the temperature is set to exactly 0.0.", "Because the model has exceeded its maximum token limit.", "This never happens; LLMs always know when to answer."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: If the final target input is not formatted identically to the previous exemplars, the model may assu..." },
                {
                  question: "What is the primary limitation of scaling up the number of few-shot exemplars indefinitely?",
                  options: ["Strict maximum token limits of the context window and the quadratic scaling cost of attention computation.", "The model becomes too smart and refuses to answer simple queries.", "The database runs out of vectors.", "The internet bandwidth connection bottlenecks the API response."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Strict maximum token limits of the context window and the quadratic scaling cost of attention comput..." }
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
                {
                  question: "Why does generating intermediate reasoning tokens help an LLM solve symbolic logic tasks that it would fail using standard prompting?",
                  options: ["It allocates more sequential computation cycles (forward passes) to the problem, using the generated text as an external scratchpad to maintain state.", "It accesses a hidden calculator module built into the transformer architecture.", "It forces the model to search the internet for the exact logic puzzle.", "It changes the model's internal weights to specialize in mathematics permanently."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It allocates more sequential computation cycles (forward passes) to the problem, using the generated..." },
                {
                  question: "What is the fundamental operational difference between Zero-Shot CoT and Few-Shot (Manual) CoT?",
                  options: ["Zero-Shot CoT uses a generic trigger phrase ('Let's think step by step'), while Few-Shot CoT provides explicit, human-written examples of reasoning chains.", "Zero-Shot CoT is used for text, while Few-Shot CoT is used for code generation.", "Zero-Shot CoT requires training data, while Few-Shot CoT relies entirely on pre-training.", "There is no difference; they are synonymous terms."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Zero-Shot CoT uses a generic trigger phrase ('Let's think step by step'), while Few-Shot CoT provide..." },
                {
                  question: "How does the choice of sampling parameters (like top-p and temperature) affect the stability of long reasoning paths in CoT?",
                  options: ["High temperature increases the chance of logical derailment or hallucination, collapsing the entire downstream chain of logic.", "High temperature ensures the model finds the single most optimal mathematical solution faster.", "Low temperature causes the model to generate infinitely repeating loops of the same number.", "Sampling parameters have absolutely zero effect on reasoning tasks."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: High temperature increases the chance of logical derailment or hallucination, collapsing the entire" },
                {
                  question: "Which famous phrase acts as the universal anchor for triggering Zero-Shot Chain-of-Thought reasoning?",
                  options: ["Let's think step by step.", "Please output the correct answer.", "Analyze this data block.", "Execute mathematical logic sequence."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Let's think step by step." },
                {
                  question: "How does the context window size restrict the effectiveness of Chain-of-Thought prompting for highly complex mathematical proofs?",
                  options: ["If the required reasoning chain requires more tokens than the context window limit, the model will cut off before generating the final answer.", "The context window forces the model to convert math proofs into binary code.", "A larger context window automatically makes the math calculations less accurate.", "It doesn't restrict it; CoT compresses the token count mathematically."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: If the required reasoning chain requires more tokens than the context window limit, the model will c..." }
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
                {
                  question: "Explain how the Self-Consistency paradigm extends standard Chain-of-Thought prompting to improve final answer accuracy.",
                  options: ["It samples multiple distinct reasoning paths at a high temperature and selects the most frequently reached final answer as the consensus.", "It forces the model to grade its own previous reasoning step before generating the next one.", "It runs the exact same prompt with zero temperature until it outputs a consistent length.", "It cross-references the reasoning steps with Wikipedia articles in real time."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It samples multiple distinct reasoning paths at a high temperature and selects the most frequently r..." },
                {
                  question: "At what point does the generation of extra reasoning tokens become a disadvantage for real-time production AI pipelines?",
                  options: ["When the task requires ultra-low latency responses, as generating long reasoning chains significantly increases time-to-first-byte and token costs.", "When the prompt contains less than 100 words.", "When the model is running on cloud architecture.", "It is never a disadvantage; more tokens always equal better software architecture."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: When the task requires ultra-low latency responses, as generating long reasoning chains significantl..." },
                {
                  question: "What happens if an LLM hallucinates an incorrect mathematical operation during the middle of a Chain-of-Thought sequence?",
                  options: ["The error acts as new context, poisoning all subsequent computations and guaranteeing an incorrect final answer.", "The attention mechanism automatically isolates the error and ignores it for the final calculation.", "The API immediately throws an arithmetic exception error.", "The model will output a disclaimer stating that it is bad at math."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The error acts as new context, poisoning all subsequent computations and guaranteeing an incorrect f..." },
                {
                  question: "Why might an LLM generate a perfectly logical chain of thought but still output the wrong final answer?",
                  options: ["Token limits or attention decay may cause it to fail at extracting the final result from the earlier steps, or a simple arithmetic token mismatch occurs.", "Because it intentionally attempts to deceive the user.", "Because the prompt was written in a non-English language.", "Because reasoning chains are fundamentally incompatible with numerical digits."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Token limits or attention decay may cause it to fail at extracting the final result from the earlier..." },
                {
                  question: "Can Chain-of-Thought prompting be effectively applied to simple binary classification tasks like sentiment analysis?",
                  options: ["Yes, generating a rationale (e.g., 'The word terrible implies...') before the label can improve accuracy, though it is often computationally overkill for simple tasks.", "No, CoT is strictly reserved for arithmetic math problems.", "No, it will cause the model to output 1s and 0s instead of text.", "Yes, but it requires a specialized 'Sentiment-CoT' API endpoint."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Yes, generating a rationale (e.g., 'The word terrible implies...') before the label can improve accu..." }
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
                {
                  question: "Why does parsing raw strings with regular expressions often fail when processing JSON responses generated by free-form LLMs?",
                  options: ["LLMs frequently inject conversational filler (e.g., 'Here is your JSON:'), use incorrect quote marks, or append trailing commas that break strict regex patterns.", "Regular expressions cannot parse strings containing numbers.", "LLMs encrypt their JSON outputs to prevent data scraping.", "Regex engines automatically crash when encountering nested arrays."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: LLMs frequently inject conversational filler (e.g., 'Here is your JSON:'), use incorrect quote marks..." },
                {
                  question: "Explain the mechanism of JSON Mode at the API level. Does it guarantee the output conforms to a specific custom schema, or just that it is valid JSON syntax?",
                  options: ["It guarantees valid JSON syntax but does not guarantee the presence or correct typing of specific required keys (unless combined with strict Structured Outputs).", "It completely guarantees that every custom schema will be perfectly fulfilled.", "It only works if the output is extremely short (under 50 tokens).", "It translates standard text into JSON formatting after the generation is fully complete."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It guarantees valid JSON syntax but does not guarantee the presence or correct typing of specific re..." },
                {
                  question: "How does Pydantic leverage Python type hinting to handle runtime validation of incoming LLM payloads?",
                  options: ["It enforces strict data type constraints (e.g., ensuring 'age' is an integer) and raises a validation error if the incoming JSON payload violates these rules.", "It automatically retrains the LLM to write better Python code.", "It converts all LLM output into securely hashed passwords.", "It limits the execution speed of the Python interpreter to match the API latency."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It enforces strict data type constraints (e.g., ensuring 'age' is an integer) and raises a validatio..." },
                {
                  question: "What is the primary difference between prompt-level constraints (asking for JSON in text) and grammar-level constraints (guided decoding)?",
                  options: ["Prompt constraints are requests the model might ignore, while guided decoding mathematically blocks the model from outputting invalid syntax tokens.", "Prompt constraints are used for XML, while grammar constraints are used for JSON.", "Grammar constraints require fine-tuning, while prompt constraints do not.", "There is no difference; they are executed at the exact same point in the pipeline."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Prompt constraints are requests the model might ignore, while guided decoding mathematically blocks" },
                {
                  question: "Why are trailing commas a common parsing issue when dealing with unstructured LLM JSON outputs?",
                  options: ["LLMs predicting list sequences may probabilistically append a comma after the final item, which is invalid syntax in standard JSON.", "Trailing commas trigger SQL injection attacks within the JSON parser.", "Trailing commas are completely valid in JSON, but Python's `json` module blocks them.", "LLMs use commas instead of quotation marks for string delimitation."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: LLMs predicting list sequences may probabilistically append a comma after the final item, which is i..." }
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
                {
                  question: "How do grammar constraints adjust logit probabilities during inference to prevent the model from generating malformed syntax?",
                  options: ["By applying a mask that forces the probability of any token that violates the formal grammar rule (e.g., a missing bracket) to zero.", "By randomly changing tokens until the syntax becomes valid.", "By sending the output to a secondary grammar-checking LLM.", "By reducing the temperature parameter to exactly 0.0."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: By applying a mask that forces the probability of any token that violates the formal grammar rule (e..." },
                {
                  question: "What strategy should your application use if a structural generation pipeline encounters a validation failure from a model output?",
                  options: ["Catch the validation error, construct a new prompt containing the error message and the malformed output, and ask the LLM to correct its mistake (retry logic).", "Crash the entire server to prevent corrupted data from entering the database.", "Silently ignore the error and pass an empty string down the pipeline.", "Manually email the API provider to fix their endpoint."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Catch the validation error, construct a new prompt containing the error message and the malformed ou..." },
                {
                  question: "Why is it dangerous to simply execute `eval()` or `json.loads()` on an unvalidated string returned by an LLM?",
                  options: ["LLMs are susceptible to prompt injection; executing untrusted output strings can lead to arbitrary code execution or catastrophic application crashes.", "It takes up too much RAM on the server.", "The `eval()` function is deprecated and removed from modern programming languages.", "LLMs always return binary data, which causes `eval()` to fail."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: LLMs are susceptible to prompt injection; executing untrusted output strings can lead to arbitrary c..." },
                {
                  question: "How do you instruct an LLM to reliably return nested JSON arrays using prompt engineering alone?",
                  options: ["Provide explicit one-shot or few-shot examples of the exact nested schema architecture directly inside the system prompt.", "Type the prompt in ALL CAPS to emphasize importance.", "Tell the model to 'Be careful with arrays.'", "It is impossible; LLMs cannot generate nested arrays without guided decoding."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Provide explicit one-shot or few-shot examples of the exact nested schema architecture directly insi..." },
                {
                  question: "What is the performance trade-off of running strict grammar-based Guided Decoding during token generation?",
                  options: ["It introduces significant computational overhead because the engine must compute and apply a dynamic token mask at every single generation step.", "It causes the API to charge double the cost per token.", "It completely eliminates the model's ability to understand natural language prompts.", "It speeds up generation dramatically by skipping the attention mechanism entirely."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It introduces significant computational overhead because the engine must compute and apply a dynamic..." }
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
                {
                  question: "Why must chat history strings be resubmitted to an LLM API endpoint with every new user message turn?",
                  options: ["Because LLM API endpoints are fundamentally stateless; they do not retain any memory of previous requests to ensure scalability and privacy.", "Because the API requires exactly 3 messages to function.", "To train the model permanently on the user's data.", "To bypass the authentication token limits."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Because LLM API endpoints are fundamentally stateless; they do not retain any memory of previous req..." },
                {
                  question: "Explain the structural difference in programmatic usage between a system message role and a user message role in a standard chat completions payload.",
                  options: ["System messages define the persistent persona and rules for the AI, while user messages represent the ongoing, dynamic input from the human.", "User messages are used for code execution, while system messages are used for translation.", "System messages are generated by the AI, and user messages are written by the developer.", "There is no difference; they are treated identically by the attention mechanism."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: System messages define the persistent persona and rules for the AI, while user messages represent th..." },
                {
                  question: "What happens to an ongoing chatbot conversation thread if the combined input history and incoming generation tokens exceed the model's max context limit?",
                  options: ["The API will reject the request and return a token limit error, crashing the conversation unless truncation logic is implemented.", "The API will automatically buy more cloud storage and continue.", "The model will permanently delete the earliest messages from the user's hard drive.", "The model will compress the text into a zip file."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The API will reject the request and return a token limit error, crashing the conversation unless tru..." },
                {
                  question: "Which of the following is an effective technique for managing a conversation that approaches the model's context window limit?",
                  options: ["Implementing a sliding window that evicts the oldest user-assistant message pairs from the payload array.", "Switching to a different programming language like C++.", "Increasing the temperature parameter to 1.0.", "Running the API request twice."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Implementing a sliding window that evicts the oldest user-assistant message pairs from the payload a..." },
                {
                  question: "How does a stateless API architecture affect the server-side infrastructure requirements for a conversational chatbot?",
                  options: ["It forces developers to implement external session state databases (like Redis) to store and retrieve chat histories for active users.", "It means no databases are needed because the LLM stores everything internally.", "It prevents the chatbot from ever being deployed to the cloud.", "It guarantees that the chatbot will use zero memory on the client device."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It forces developers to implement external session state databases (like Redis) to store and retriev..." }
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
                {
                  question: "How does Summarized Memory management optimize both long-term context retention and token costs compared to a simple Sliding Window strategy?",
                  options: ["It uses a background LLM call to compress older turns into a dense summary, preserving overarching context while aggressively reducing the token footprint.", "It deletes the entire conversation every 5 minutes.", "It refuses to answer any questions that require long-term memory.", "It encrypts the messages so they cost fewer tokens to process."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It uses a background LLM call to compress older turns into a dense summary, preserving overarching c..." },
                {
                  question: "What database patterns (e.g., Redis, DynamoDB) are ideal for managing chat session states at scale for millions of active concurrent users?",
                  options: ["Fast, low-latency in-memory key-value stores or document databases that can quickly retrieve the history array using a session ID.", "Slow, highly normalized relational databases requiring complex SQL joins.", "Storing text files locally on the user's mobile device.", "A blockchain ledger."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Fast, low-latency in-memory key-value stores or document databases that can quickly retrieve the his..." },
                {
                  question: "Why is it important to prevent users from dynamically overwriting the initial system prompt in a production chatbot?",
                  options: ["To prevent prompt injection attacks where a user maliciously overrides the bot's core rules and exploits it.", "To save server disk space.", "To make the UI look cleaner.", "Because system prompts are copyrighted."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: To prevent prompt injection attacks where a user maliciously overrides the bot's core rules and expl..." },
                {
                  question: "What happens to the generation cost of a single user turn as a chatbot conversation gets longer without any memory truncation?",
                  options: ["The cost increases linearly with every turn because the entire accumulated history is resubmitted and billed as input tokens.", "The cost goes down because the model gets used to the user.", "The cost remains exactly the same.", "The API stops charging money after 100 turns."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The cost increases linearly with every turn because the entire accumulated history is resubmitted an..." },
                {
                  question: "Which metric is most critical to monitor to avoid catastrophic failure in a naive append-only conversational buffer?",
                  options: ["The cumulative token count of the history array against the model's hard context limit.", "The number of typos the user makes.", "The grammatical correctness of the AI's responses.", "The geographic location of the API server."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The cumulative token count of the history array against the model's hard context limit." }
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
                {
                  question: "What are the core technical disadvantages of the Stuffing method when applied to a document near the context window limit?",
                  options: ["It suffers from high latency, massive token costs, and the 'lost in the middle' phenomenon where models forget information situated in the center of the prompt.", "It is too fast, causing rate limits.", "It automatically translates the document into machine code.", "It requires an internet connection to function properly."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It suffers from high latency, massive token costs, and the 'lost in the middle' phenomenon where mod..." },
                {
                  question: "Which summarization strategy (Map-Reduce or Refine) is highly parallelizable, and which one suffers from high sequential API latency?",
                  options: ["Map-Reduce is highly parallelizable; Refine suffers from high sequential latency because each chunk relies on the output of the previous chunk.", "Refine is parallelizable; Map-Reduce is strictly sequential.", "Both are equally parallelizable.", "Neither can be parallelized because LLMs are single-threaded."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Map-Reduce is highly parallelizable; Refine suffers from high sequential latency because each chunk" },
                {
                  question: "How does the choice of a text-splitting chunk size and chunk overlap affect the preservation of context between boundaries?",
                  options: ["Adequate chunk overlap ensures that sentences broken at chunk boundaries don't lose their meaning, preventing isolated fragments from confusing the model.", "Chunk overlap deletes words from the document to save space.", "Chunk size determines the font size of the output.", "Overlap forces the model to summarize the exact same text multiple times, wasting tokens."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Adequate chunk overlap ensures that sentences broken at chunk boundaries don't lose their meaning, p..." },
                {
                  question: "When splitting a large document, why is a recursive character splitter generally preferred over a strict word-count splitter?",
                  options: ["It respects natural paragraph and sentence boundaries before breaking strings, preserving structural readability.", "It uses less CPU power than word counting.", "It automatically translates the text into emojis.", "It completely ignores punctuation, making tokenization easier."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It respects natural paragraph and sentence boundaries before breaking strings, preserving structural..." },
                {
                  question: "In a Map-Reduce architecture, what happens during the 'Map' phase?",
                  options: ["Every chunk of the document is sent to the LLM independently to generate a localized, intermediate summary.", "The entire document is mapped to a vector database.", "The AI generates a geographical map of the document's origins.", "The document is translated into JSON format."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Every chunk of the document is sent to the LLM independently to generate a localized, intermediate s..." }
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
                {
                  question: "Why can the Map-Reduce strategy sometimes result in a loss of fine-grained contextual information compared to the Refine strategy?",
                  options: ["Because intermediate chunks are summarized entirely in isolation, losing overarching narratives that span multiple distant chunks.", "Because Map-Reduce randomly drops 50% of the text.", "Because Refine uses a much larger LLM architecture.", "Because Map-Reduce cannot handle English text properly."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Because intermediate chunks are summarized entirely in isolation, losing overarching narratives that..." },
                {
                  question: "When configuring a recursive character text splitter, why is it critical to set a non-zero value for the chunk overlap parameter?",
                  options: ["To prevent critical concepts from being sheared in half across chunk boundaries, ensuring the LLM understands the transitional context.", "To artificially inflate the token count for billing purposes.", "To fix spelling errors in the document.", "To create a backup copy of the document in memory."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: To prevent critical concepts from being sheared in half across chunk boundaries, ensuring the LLM un..." },
                {
                  question: "What is the primary drawback of the Refine summarization strategy?",
                  options: ["It scales terribly with document length; generating a summary for chunk N requires waiting for chunk N-1 to complete, creating a massive sequential latency bottleneck.", "It requires exactly three API calls regardless of document size.", "It can only summarize fictional text.", "It compresses the document so much that the output is just a single word."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It scales terribly with document length; generating a summary for chunk N requires waiting for chunk..." },
                {
                  question: "If an LLM struggles to accurately summarize highly technical medical documents in a Map-Reduce pipeline, what is the most likely cause?",
                  options: ["The chunks are too small and technical terminology gets split or isolated, breaking the context needed to understand the specialized concepts.", "The LLM was trained exclusively on children's books.", "The API server is out of RAM.", "The Refine pipeline was accidentally triggered."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The chunks are too small and technical terminology gets split or isolated, breaking the context need..." },
                {
                  question: "How does increasing the chunk size affect the total number of API calls required in a Map-Reduce summarization pipeline?",
                  options: ["It decreases the total number of Map-phase API calls, but risks hitting the context window limit per call.", "It increases the number of API calls exponentially.", "It has absolutely zero effect on the number of API calls.", "It forces the Reduce phase to execute first."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It decreases the total number of Map-phase API calls, but risks hitting the context window limit per..." }
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
                {
                  question: "How does extracting relevant text snippets to inject as context prevent an LLM from generating false statements (hallucinations)?",
                  options: ["It forces the attention mechanism to prioritize processing the injected facts in the prompt rather than guessing based on fuzzy pre-trained weights.", "It blocks the LLM from accessing the internet.", "It lowers the temperature parameter automatically.", "It deletes the LLM's entire pre-training memory."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It forces the attention mechanism to prioritize processing the injected facts in the prompt rather t..." },
                {
                  question: "What is the technical difference between an internal knowledge lookup (pre-trained weights) and an external source grounding injection (in-context data)?",
                  options: ["Internal knowledge is static and prone to hallucination, while external grounding injects specific, dynamic, and verifiable text directly into the prompt.", "Internal knowledge is faster, while external knowledge requires manual typing by the developer.", "There is no difference; the LLM treats them both as permanent memory.", "External grounding requires training a brand new model from scratch."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Internal knowledge is static and prone to hallucination, while external grounding injects specific," },
                {
                  question: "Why is it inefficient to pass an entire 500-page operational manual directly into a prompt context window for every single user question?",
                  options: ["It causes extreme API latency, exorbitant token costs, and forces the model to search through massive noise, reducing accuracy.", "It will cause the user's computer to overheat.", "The API will permanently ban the developer account.", "It forces the LLM to read the manual out loud."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It causes extreme API latency, exorbitant token costs, and forces the model to search through massiv..." },
                {
                  question: "What happens if the search component injects a completely irrelevant document passage into the LLM prompt?",
                  options: ["The LLM may hallucinate a false connection, or (if prompted correctly) correctly state that the context does not contain the answer.", "The LLM will rewrite the document to make it relevant.", "The API call will automatically fail with a 404 error.", "The LLM will ignore the context and search the web."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The LLM may hallucinate a false connection, or (if prompted correctly) correctly state that the cont..." },
                {
                  question: "In a basic grounded QA prompt template, what instruction is critical to enforce strict adherence to the provided document?",
                  options: ["'Answer the question using ONLY the context provided above. If the answer is not present, state 'I don't know'.'", "'Answer the question using your best judgment and external knowledge.'", "'Rewrite the context to be more interesting.'", "'Translate the context into Spanish before answering.'"],
                  answerIndex: 0, hint: "Think about why the correct answer involves: 'Answer the question using ONLY the context provided above. If the answer is not present, state 'I d..." }
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
                {
                  question: "If the extracted document context contains contradictory or factually incorrect statements, how does the LLM typically resolve the conflict when generating an answer?",
                  options: ["Unless instructed to evaluate accuracy, the LLM will usually generate an answer based purely on what is written in the injected context, regardless of factual validity.", "It will automatically correct the document using its pre-trained knowledge.", "It will crash and throw a LogicException.", "It will refuse to answer entirely."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Unless instructed to evaluate accuracy, the LLM will usually generate an answer based purely on what..." },
                {
                  question: "What are the key limitations of relying on basic keyword matching to find relevant context passages instead of using semantic vector embeddings?",
                  options: ["Keyword matching fails on synonyms and context (e.g., 'car' vs 'automobile'), missing conceptually relevant paragraphs that don't share exact words.", "Keyword matching is too slow for production systems.", "Keyword matching requires a massive GPU to calculate.", "Keyword matching only works on JSON files."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Keyword matching fails on synonyms and context (e.g., 'car' vs 'automobile'), missing conceptually r..." },
                {
                  question: "Why might a grounded QA pipeline successfully extract the right context but still fail to answer a multi-hop reasoning question?",
                  options: ["The LLM might struggle to logically synthesize disparate facts across multiple scattered sentences without explicit Chain-of-Thought prompting.", "Because the context window is too small.", "Because the user asked the question in lowercase.", "Because the LLM deleted the context before reading it."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The LLM might struggle to logically synthesize disparate facts across multiple scattered sentences w..." },
                {
                  question: "How can you programmatically verify that an LLM actually used the provided context rather than its internal knowledge?",
                  options: ["Instruct the LLM to append citations or verbatim sentence quotes from the context block justifying its answer.", "Check the API latency; if it's slow, it used the context.", "Ask the LLM 'Did you use the context?'", "It is mathematically impossible to verify this."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Instruct the LLM to append citations or verbatim sentence quotes from the context block justifying i..." },
                {
                  question: "What is the fundamental difference between grounded Document QA and fine-tuning a model on the target document?",
                  options: ["Grounded QA dynamically injects text at runtime without changing the model, while fine-tuning permanently updates the model's internal neural weights.", "Grounded QA is only for images, fine-tuning is for text.", "Grounded QA requires millions of examples, fine-tuning requires just one.", "There is no difference; they are just different names for the same process."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Grounded QA dynamically injects text at runtime without changing the model, while fine-tuning perman..." }
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
                {
                  question: "What is the fundamental difference between an LLM generation model (like GPT-4) and a text embedding model in terms of output data structures?",
                  options: ["A generation model outputs a sequence of discrete text tokens, while an embedding model outputs a continuous array of floating-point numbers representing semantic meaning.", "A generation model only outputs numbers, while an embedding model outputs text.", "There is no difference; they both output the exact same data structures.", "A generation model is stateless, but an embedding model stores all its output in a database automatically."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: A generation model outputs a sequence of discrete text tokens, while an embedding model outputs a co..." },
                {
                  question: "Why is it standard practice to normalize embedding vectors to unit length (||v|| = 1) before storing them?",
                  options: ["Normalization mathematically simplifies distance calculations downstream; it allows the dot product between two vectors to perfectly equal their cosine similarity.", "It prevents the database from running out of storage space.", "It ensures the vectors can only be read by the user who created them.", "It forces all words to have the exact same meaning."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Normalization mathematically simplifies distance calculations downstream; it allows the dot product" },
                {
                  question: "How do embedding models handle typos or synonymous phrases compared to classic keyword-matching engines?",
                  options: ["Embedding models map synonymous phrases (e.g., 'puppy' and 'young dog') to very similar coordinate locations in vector space, whereas keyword engines see them as completely unrelated strings.", "Embedding models instantly crash when they encounter a typo.", "Embedding models delete any words they don't understand before saving.", "They handle them exactly the same way."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Embedding models map synonymous phrases (e.g., 'puppy' and 'young dog') to very similar coordinate l..." },
                {
                  question: "What does the dimensionality $d$ of an embedding model signify?",
                  options: ["It defines the number of mathematical axes or features the model uses to represent the semantic complexity of the text.", "It represents the maximum number of characters allowed in the input chunk.", "It is the total number of words in the model's vocabulary.", "It dictates the monetary cost of the API call per megabyte."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It defines the number of mathematical axes or features the model uses to represent the semantic comp..." },
                {
                  question: "Why must the exact same embedding model be used for both the source documents and the user query?",
                  options: ["Different models map text to entirely different geometric coordinates and dimensional scales; comparing vectors from two different models produces mathematically meaningless noise.", "Because the API requires a continuous active connection.", "To keep billing costs consolidated under a single model invoice.", "You actually can mix and match models without any issue."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Different models map text to entirely different geometric coordinates and dimensional scales; compar..." }
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
                {
                  question: "Why does choice of chunk size (e.g., 200 tokens vs. 1000 tokens) during the embedding phase directly impact retrieval performance?",
                  options: ["Large chunks dilute specific facts across a massive vector, making precise retrieval hard, while small chunks lose overarching context and relationships.", "Chunk size determines the language of the output vector.", "Small chunks are more expensive to embed than large chunks.", "Chunk size has no measurable impact on retrieval."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Large chunks dilute specific facts across a massive vector, making precise retrieval hard, while sma..." },
                {
                  question: "What strategy addresses a loss of cross-chunk context when an active sentence is split right down the middle?",
                  options: ["Implementing a 'chunk overlap' parameter, ensuring the end of one chunk is duplicated at the start of the next to preserve the transitional meaning.", "Manually reading the document and adding commas.", "Increasing the embedding model's dimensionality.", "Using a translation API to fix the broken sentence."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Implementing a 'chunk overlap' parameter, ensuring the end of one chunk is duplicated at the start o..." },
                {
                  question: "How does the 'curse of dimensionality' affect search operations when using extremely large embedding vectors (e.g., d=4096)?",
                  options: ["In very high dimensions, the distance between all vectors begins to look functionally identical, making it harder to distinguish between 'relevant' and 'irrelevant' chunks, and exponentially increasing compute costs.", "It causes the vectors to become sentient and rewrite themselves.", "It makes the vectors too small to store in a standard database.", "It forces the user to buy a specialized AI-specific hard drive."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: In very high dimensions, the distance between all vectors begins to look functionally identical, mak..." },
                {
                  question: "Why might an embedding model fail to accurately capture the semantic meaning of domain-specific medical jargon?",
                  options: ["If the specific jargon was not present in the model's general pre-training data, the model will fail to map the words to the correct cluster of related medical concepts.", "Because medical words are too long for the tokenizer to process.", "Because embedding models are only trained on mathematics.", "Because the API has a built-in filter against medical advice."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: If the specific jargon was not present in the model's general pre-training data, the model will fail..." },
                {
                  question: "What happens mathematically to the vector representation of a chunk if it contains multiple conflicting topics?",
                  options: ["The final vector becomes a mathematical average (centroid) of the different concepts, often resulting in a muddy representation that matches poorly with specific, single-topic queries.", "The vector splits in half, creating two new vectors.", "The vector's magnitude increases beyond 1.0.", "The database rejects the chunk entirely."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The final vector becomes a mathematical average (centroid) of the different concepts, often resultin..." }
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
                {
                  question: "Why does a cosine similarity score of 1.0 indicate perfect semantic alignment between two text vectors?",
                  options: ["A score of 1.0 means the angle between the two vectors in high-dimensional space is exactly zero degrees, meaning they point in the exact same semantic direction.", "It means the text length of both chunks is identical.", "It indicates that the chunks contain the exact same number of nouns.", "It means the database successfully processed the query without errors."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: A score of 1.0 means the angle between the two vectors in high-dimensional space is exactly zero deg..." },
                {
                  question: "Explain the trade-off between conducting an Exact Nearest Neighbor (Flat Index) search versus an Approximate Nearest Neighbor (ANN) lookup in massive production vector databases.",
                  options: ["Exact search guarantees finding the absolute best match but is computationally slow (O(N) complexity); ANN trades a tiny bit of accuracy for massive speed improvements using clustering or graphs.", "Exact search is free, while ANN costs API tokens.", "Exact search only works on integers, while ANN works on floats.", "There is no trade-off; ANN is always slower and less accurate."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Exact search guarantees finding the absolute best match but is computationally slow (O(N) complexity..." },
                {
                  question: "How does a vector index like HNSW (Hierarchical Navigable Small World) accelerate large-scale semantic lookups?",
                  options: ["It builds a multi-layered graph architecture where searches 'zoom in' from broad semantic clusters down to highly specific neighborhoods without scanning the entire database.", "It compresses the text files into ZIP archives.", "It translates all queries into binary code.", "It requires the user to manually tag the documents with keywords beforehand."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It builds a multi-layered graph architecture where searches 'zoom in' from broad semantic clusters d..." },
                {
                  question: "Why might you use dot product instead of cosine similarity for ranking if all vectors in your database are strictly normalized to unit length?",
                  options: ["When vectors are normalized to unit length, the dot product mathematically equals cosine similarity but is significantly faster for CPUs/GPUs to compute.", "Dot product is the only operation supported by Python.", "Cosine similarity requires an internet connection.", "Dot product automatically translates the text into other languages."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: When vectors are normalized to unit length, the dot product mathematically equals cosine similarity" },
                {
                  question: "In semantic search, what does it mean if the cosine similarity between two vectors is -1.0?",
                  options: ["The vectors point in exactly opposite directions, meaning they represent diametrically opposed semantic concepts.", "It means the database is offline.", "It means the vectors are perfectly identical.", "It means the chunk contains a spelling error."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The vectors point in exactly opposite directions, meaning they represent diametrically opposed seman..." }
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
                {
                  question: "Why can short, single-word queries sometimes cause vector lookups to return low-quality matches compared to descriptive sentences?",
                  options: ["Single words lack surrounding context, resulting in a generic embedding vector that overlaps with too many broad concepts in the database.", "Because single words cost too few tokens to process properly.", "Because the database automatically ignores single-word queries.", "Because embedding models only understand full sentences."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Single words lack surrounding context, resulting in a generic embedding vector that overlaps with to..." },
                {
                  question: "What is Hybrid Search, and how does combining keyword search (BM25) with semantic search improve production systems?",
                  options: ["It combines the exact-matching capabilities of keywords (great for IDs, names, and exact quotes) with the conceptual understanding of semantic vectors (great for ideas and synonyms).", "It merges two different LLMs together to answer the question.", "It translates the search query into two different languages simultaneously.", "It requires the user to search using both their keyboard and voice."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It combines the exact-matching capabilities of keywords (great for IDs, names, and exact quotes) wit..." },
                {
                  question: "What is the primary limitation of standard semantic search when dealing with questions that require exact numerical matches (e.g., 'What was the revenue in 2021?')?",
                  options: ["Embedding models group similar concepts, but they often struggle to distinguish the absolute difference between precise numbers (e.g., 2021 vs 2022) unless combined with exact keyword filters.", "The database cannot store numbers, only text.", "Numerical searches require a special 'math embedding' model.", "The cosine similarity of any number is automatically zero."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Embedding models group similar concepts, but they often struggle to distinguish the absolute differe..." },
                {
                  question: "How does pre-filtering by metadata (like date or category) improve both the speed and accuracy of a semantic search operation?",
                  options: ["It dramatically reduces the search space before the vector math is even calculated, preventing the system from retrieving semantically similar but factually outdated or out-of-category chunks.", "It forces the LLM to rewrite the document.", "It increases the token cost to generate a better answer.", "It translates the metadata into a vector automatically."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It dramatically reduces the search space before the vector math is even calculated, preventing the s..." },
                {
                  question: "Why might a semantic search engine struggle to handle queries containing heavy negation, like 'documents NOT about machine learning'?",
                  options: ["Embedding models often capture the core topic ('machine learning') strongly, while the semantic concept of 'NOT' is poorly represented in geometric space, leading to exact opposite results.", "Because 'NOT' is a stop word and is deleted automatically.", "Because negation causes the vector to become imaginary.", "Because the database requires a negative temperature parameter."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Embedding models often capture the core topic ('machine learning') strongly, while the semantic conc..." }
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
                {
                  question: "Why does implementing a RAG framework reduce the frequency of factual hallucinations in LLM system deployments?",
                  options: ["It forces the model to base its generation on a provided, verified external context block rather than guessing based on fuzzy, pre-trained statistical weights.", "It automatically fine-tunes the model on the fly.", "It lowers the temperature of the model to absolute zero.", "It disconnects the model from the internet completely."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It forces the model to base its generation on a provided, verified external context block rather tha..." },
                {
                  question: "How does the context window scale restriction of an LLM affect the number of document chunks (K) you can inject into a prompt?",
                  options: ["You are strictly limited by the context window; retrieving too many chunks will overflow the prompt limit, causing the API to reject the request or truncate critical instructions.", "It has no effect; the model automatically expands its window.", "It forces the model to generate shorter answers.", "You must pay extra to inject more than one chunk."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: You are strictly limited by the context window; retrieving too many chunks will overflow the prompt" },
                {
                  question: "What security risk arises if user permissions are not integrated into the retrieval phase of a RAG pipeline?",
                  options: ["The semantic search might retrieve and inject highly classified or private documents into the prompt that the querying user does not have authorization to see.", "The LLM will automatically hack the database.", "The user will be able to delete the database vectors.", "The API key will be exposed in the prompt."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The semantic search might retrieve and inject highly classified or private documents into the prompt..." },
                {
                  question: "In a standard RAG workflow, what component is responsible for translating the user's plain-text question into a mathematical format?",
                  options: ["The Text Embedding Model.", "The Vector Database.", "The LLM Generation Engine.", "The Recursive Text Splitter."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The Text Embedding Model." },
                {
                  question: "Why is it generally recommended to retrieve slightly more chunks than strictly necessary, even if it uses more tokens?",
                  options: ["Because semantic search isn't perfect; retrieving a wider net of top-K results increases the probability that the truly relevant fact is included in the context window.", "To intentionally max out the context window so the LLM works harder.", "To force the LLM to write a longer response.", "Because vector databases require requests to be in batches of 10."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Because semantic search isn't perfect; retrieving a wider net of top-K results increases the probabi..." }
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
                {
                  question: "Explain the difference between Naive RAG (simple retrieve-then-read) and Advanced RAG pipelines that implement pre-retrieval query rewriting or post-retrieval reranking.",
                  options: ["Naive RAG trusts the user's raw query and raw search results; Advanced RAG uses smaller LLMs to fix the query before searching and cross-encoders to re-order the retrieved chunks for maximum relevance.", "Naive RAG uses open-source models, while Advanced RAG uses commercial APIs.", "Naive RAG is only for text, while Advanced RAG is for images.", "There is no functional difference in production."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Naive RAG trusts the user's raw query and raw search results; Advanced RAG uses smaller LLMs to fix" },
                {
                  question: "How do you evaluate a RAG pipeline's performance using metrics like Faithfulness (groundedness) and Answer Relevance?",
                  options: ["Faithfulness checks if the LLM's answer is strictly supported by the retrieved chunks; Answer Relevance checks if the LLM's answer actually addresses the user's original query.", "Faithfulness checks if the user is polite; Relevance checks if the database is online.", "Both metrics check if the code contains syntax errors.", "By manually reading every single prompt and response generated by the system."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Faithfulness checks if the LLM's answer is strictly supported by the retrieved chunks; Answer Releva..." },
                {
                  question: "What is the 'Lost in the Middle' phenomenon, and how does it affect RAG pipelines that inject a massive number of context chunks?",
                  options: ["LLMs have a known attention bias where they focus heavily on the beginning and end of a prompt context, frequently ignoring or forgetting critical facts buried in the middle chunks.", "It describes when an API request times out in the middle of generation.", "It occurs when the user forgets what they were asking halfway through.", "It means the vector database deleted the middle chunks to save space."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: LLMs have a known attention bias where they focus heavily on the beginning and end of a prompt conte..." },
                {
                  question: "How can a cross-encoder (reranker) improve the final prompt quality after the initial vector search retrieves the top 100 chunks?",
                  options: ["A cross-encoder evaluates the logical relationship between the query and each chunk simultaneously, re-ordering the top 100 results so only the absolute most relevant top 5 are injected into the LLM.", "It translates the chunks into machine code.", "It encrypts the chunks before sending them to the LLM.", "It compresses the 100 chunks into a single sentence."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: A cross-encoder evaluates the logical relationship between the query and each chunk simultaneously," },
                {
                  question: "Why might an LLM in a RAG pipeline completely ignore the retrieved context and hallucinate an answer anyway?",
                  options: ["If the system prompt is too weak, the LLM may suffer from 'knowledge conflict bias', defaulting to its pre-trained internal weights rather than trusting the injected context.", "Because the retrieved context was too long to read.", "Because the LLM realized the context was a lie.", "Because the API requires a special 'read_context=True' flag."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: If the system prompt is too weak, the LLM may suffer from 'knowledge conflict bias', defaulting to i..." }
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
                {
                  question: "Why does fine-tuning a model on static corporate manuals often fail to eliminate factual hallucinations when compared to a RAG pipeline?",
                  options: ["Fine-tuning bakes information into statistical weights which the model struggles to accurately recall verbatim; RAG forces the model to read the exact text dynamically.", "Fine-tuning automatically deletes all corporate manuals to save space.", "Corporate manuals are usually written in languages the model cannot learn.", "RAG pipelines are mathematically incapable of hallucinations."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Fine-tuning bakes information into statistical weights which the model struggles to accurately recal..." },
                {
                  question: "When implementing Parameter-Efficient Fine-Tuning (PEFT) methods like LoRA, what structural changes are made to the base model's internal weight matrices?",
                  options: ["The massive base matrices remain frozen, and small, low-rank adapter matrices are injected alongside them, dramatically reducing the GPU memory required for training.", "Every single parameter in the base model is deleted and replaced.", "The model is converted from a Transformer into a Convolutional Neural Network.", "The weight matrices are compressed into a standard ZIP file."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: The massive base matrices remain frozen, and small, low-rank adapter matrices are injected alongside..." },
                {
                  question: "If an application requires strict adherence to an uncommon, proprietary programming language syntax, should you prioritize RAG or fine-tuning?",
                  options: ["Fine-tuning. RAG struggles to teach an LLM a completely new syntax language purely through context, whereas fine-tuning alters the model's fundamental structural generation behavior.", "RAG. Just put the entire programming manual in the context window.", "Neither. It is impossible for an LLM to learn a new programming language.", "You should just use standard Prompt Engineering without RAG."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Fine-tuning. RAG struggles to teach an LLM a completely new syntax language purely through context," },
                {
                  question: "What is the primary difference in upfront infrastructure cost between deploying a RAG architecture versus performing full fine-tuning?",
                  options: ["RAG only requires a vector database and standard API access; full fine-tuning requires orchestrating massive, expensive GPU clusters for training loops.", "RAG requires buying a supercomputer, while fine-tuning is free.", "Fine-tuning uses less electricity than RAG.", "There is no difference; they cost exactly the same."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: RAG only requires a vector database and standard API access; full fine-tuning requires orchestrating..." },
                {
                  question: "Why is RAG generally preferred over fine-tuning when the underlying knowledge base is updated on a daily basis?",
                  options: ["RAG only requires uploading the new document to a vector database; fine-tuning would require initiating an expensive, hours-long retraining loop every single day.", "Fine-tuning models refuse to learn new data.", "RAG automatically deletes old data.", "RAG is the only architecture that supports timezones."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: RAG only requires uploading the new document to a vector database; fine-tuning would require initiat..." }
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
                {
                  question: "Why is a fine-tuned model less effective at handling real-time data updates (such as stock prices or live inventory levels) than a RAG pipeline?",
                  options: ["Parametric knowledge is static and frozen at the exact moment training completes; it cannot 'look up' dynamic changes without being entirely retrained.", "Fine-tuned models are too slow to connect to the internet.", "Fine-tuning causes the model to forget how numbers work.", "RAG pipelines are specifically hardcoded for the stock market."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Parametric knowledge is static and frozen at the exact moment training completes; it cannot 'look up..." },
                {
                  question: "Explain how fine-tuning an LLM to follow a specific output tone can accidentally degrade its general reasoning capabilities—a phenomenon known as alignment tax or catastrophic forgetting.",
                  options: ["Over-optimizing the model's weights toward a narrow style can overwrite or disrupt the broad, generalized pathways it uses for complex logic and math.", "It causes the model to delete its original training dataset from the internet.", "It forces the model to speak exclusively in that specific tone.", "It physically breaks the GPU hardware during training."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Over-optimizing the model's weights toward a narrow style can overwrite or disrupt the broad, genera..." },
                {
                  question: "What is a 'Hybrid Architecture' in the context of LLM optimization, and why is it often considered the enterprise gold standard?",
                  options: ["It combines a lightly Fine-Tuned base model (to ensure proper brand voice, safety, and formatting) with a robust RAG pipeline (to inject verifiable, up-to-date factual data).", "It means running the model on both a CPU and a GPU simultaneously.", "It uses two different LLMs to argue with each other.", "It requires the user to write half the answer themselves."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: It combines a lightly Fine-Tuned base model (to ensure proper brand voice, safety, and formatting) w..." },
                {
                  question: "How does the dataset required for fine-tuning differ structurally from the documents ingested into a RAG vector database?",
                  options: ["Fine-tuning requires heavily structured, high-quality Input/Output instruction pairs; RAG can ingest raw, unstructured text documents directly.", "Fine-tuning requires images, while RAG requires text.", "Fine-tuning uses less data than RAG.", "There is no difference; you can use the exact same file for both."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: Fine-tuning requires heavily structured, high-quality Input/Output instruction pairs; RAG can ingest..." },
                {
                  question: "Why might an engineering team choose to fine-tune an open-source model rather than using a commercial API with a RAG pipeline, despite the higher initial compute cost?",
                  options: ["To ensure total data privacy, absolute control over the generation pipeline, and to avoid continuous API token billing on massive production workloads.", "Because open-source models are always smarter than commercial APIs.", "Because RAG pipelines are illegal in most countries.", "Because open-source models do not require GPUs."],
                  answerIndex: 0, hint: "Think about why the correct answer involves: To ensure total data privacy, absolute control over the generation pipeline, and to avoid continuous..." }
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
      "C is one of the most fundamental and widely-used programming languages in the history of computing. Developed at Bell Labs in the early 1970s, C has stood the test of time as the foundation for operating systems, embedded systems, compilers, and system-level software. Almost every modern programming language — including Python, Java, and C++ — draws concepts from C.",
      "This Virtual C Programming Lab is developed for first-year B.Tech students of Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) under the BS&HSS department. The lab provides a hands-on, browser-based environment where students can write, compile, and execute C programs without requiring any local software installation.",
      "The lab covers 14 weeks of structured experiments aligned with the JNTUGV C Programming syllabus — from basic I/O and arithmetic to pointers, data structures, recursion, and file handling. Each experiment includes a clear objective, problem statement, pre-loaded starter code, stdin support for interactive programs, and expected output for self-verification.",
      "Students can attempt all 47 lab problems directly in the browser using a professional code editor powered by a real GCC compiler via the Wandbox execution engine."
    ],
    shortNotes: cShortNotes,
    targetAudience: {
      primary: "First-year B.Tech students of all branches at Jawaharlal Nehru Technological University Gurajada Vizianagaram (JNTUGV) enrolled in the C Programming Lab course under the BS&HSS department (Course Code: refer JNTUGV curriculum).",
      prerequisites: [
        "No prior programming experience required",
        "Basic computer operation skills (typing, using a browser)",
        "Understanding of basic mathematics (algebra, arithmetic)"
      ],
      usefulFor: [
        "Diploma students transitioning to B.Tech who want to strengthen fundamentals",
        "Students preparing for competitive exams like GATE where C concepts are tested",
        "Faculty members looking for ready-made experiment references aligned to JNTUGV syllabus",
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
                  title: "Structure of a C Program",
                  body: ["Every C program follows a fixed structure. Understanding this structure is the first step to writing C programs.", "A basic C program has these parts:"]
                },
                {
                  title: "1. Preprocessor Directive",
                  body: ["Lines starting with # are preprocessor directives. They are processed before compilation begins.", "#include <stdio.h> tells the compiler to include the Standard Input Output library, which contains functions like printf() and scanf()."]
                },
                {
                  title: "2. main() Function",
                  body: ["Every C program must have exactly one main() function. Execution of the program always begins from main().", "int main() means the function returns an integer value to the operating system."]
                },
                {
                  title: "3. printf() Function",
                  body: ["printf() is used to print formatted output to the console.", "Syntax: printf(\"text to print\");", "The text must be enclosed in double quotes.", "Special character \\n moves the cursor to the next line (newline)."]
                },
                {
                  title: "4. return 0",
                  body: ["return 0; at the end of main() tells the OS that the program ended successfully. Any non-zero value means the program ended with an error."]
                },
                {
                  title: "5. Curly Braces { }",
                  body: ["All statements inside main() are enclosed within curly braces. The opening { marks the beginning and closing } marks the end of the function body."]
                }
              ],
              pretest:[
                { question: "Which of the following is the correct extension for a C source file?", options: [".cp", ".c", ".cpp", ".cv"], answerIndex: 1, hint: "Most C compilers look for this specific file extension to recognize source code." },
                { question: "Which header file is required to use printf() in C?", options: ["math.h", "string.h", "stdio.h", "stdlib.h"], answerIndex: 2, hint: "This header provides standard functions for Input and Output operations." },
                { question: "What is the entry point of every C program?", options: ["start()", "begin()", "main()", "run()"], answerIndex: 2, hint: "The operating system looks for this specific function name to start executing the program." },
                { question: "What does \\n do inside printf()?", options: ["Prints the letter n", "Adds a tab space", "Moves to the next line", "Ends the program"], answerIndex: 2, hint: "It's an escape sequence for a control character that affects cursor positioning." },
                { question: "What value should main() return to indicate successful execution?", options: ["1", "-1", "0", "NULL"], answerIndex: 2, hint: "By convention, this return value tells the OS that the program ended without errors." }
              ],
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
              posttest: [
                { question: "What is the output of printf(\"Hello\\nWorld\");?", options: ["Hello World", "Hello\\nWorld (on two lines)", "HelloWorld", "Error"], answerIndex: 1, hint: "The escape sequence \\n is interpreted as a newline command, not literal characters." },
                { question: "Which of the following correctly prints \"JNTUGV\" in C?", options: ["print(\"JNTUGV\")", "printf[JNTUGV]", "printf(\"JNTUGV\");", "Printf(\"JNTUGV\");"], answerIndex: 2, hint: "C is case-sensitive. The correct function name and syntax are required." },
                { question: "What happens if you remove #include<stdio.h> from the Hello World program?", options: ["Program still runs normally", "printf() will not be recognized, compiler error", "Program prints nothing", "Program crashes at runtime"], answerIndex: 1, hint: "The compiler needs to know the declaration of printf() before it can be used." },
                { question: "What does int before main() indicate?", options: ["main() takes integer arguments", "main() returns an integer value", "main() is an integer variable", "Nothing, it is optional"], answerIndex: 1, hint: "It specifies the data type of the value the function sends back to the caller." },
                { question: "Which of the following will print Hello World with a newline at the end?", options: ["printf(\"Hello World\")", "printf(\"Hello World\\n\")", "printf(\\nHello World)", "printf(\"Hello World\\t\")"], answerIndex: 1, hint: "Escape sequences like \\n and \\t control output formatting. Which one moves the cursor to a new line?" }
              ],
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
                  title: "scanf() — Reading Input",
                  body: [
                    "scanf() reads formatted input from the keyboard (standard input).",
                    "Syntax: scanf(\"format_specifier\", &variable);",
                    "The & symbol gives the memory address of the variable so scanf() can store the value there."
                  ]
                },
                {
                  title: "printf() with Format Specifiers",
                  body: [
                    "printf() uses the same specifiers to print variables.",
                    "printf(\"Name: %s Age: %d\", name, age);",
                    "→ Replaces %s with the value of name, %d with the value of age"
                  ]
                },
                {
                  title: "char array for strings",
                  body: [
                    "C does not have a built-in string type. Strings are stored as character arrays.",
                    "char name[50]; → declares a character array that can hold up to 49 characters + null terminator",
                    "Why no & for char arrays in scanf?",
                    "The array name itself is already a memory address in C, so & is not needed."
                  ]
                }
              ],
              pretest: [
                { question: "Which function is used to take input from the user in C?", options: ["input()", "cin()", "scanf()", "read()"], answerIndex: 2, hint: "This function is the standard input counterpart to printf()." },
                { question: "What is the format specifier for an integer in C?", options: ["%i", "%d", "%int", "%n"], answerIndex: 1, hint: "It stands for 'decimal integer'." },
                { question: "What does the & symbol do in scanf(\"%d\", &age)?", options: ["It is the AND operator", "It passes the address of the variable", "It multiplies the value", "It is not required"], answerIndex: 1, hint: "It tells scanf() *where* in memory to store the input value." },
                { question: "To store a person's name in C, which data type is used?", options: ["string name", "char name[]", "text name[]", "varchar name"], answerIndex: 1, hint: "C doesn't have a built-in string type; it uses an array of characters." },
                { question: "What is the format specifier for a string in printf()?", options: ["%c", "%str", "%s", "%ch"], answerIndex: 2, hint: "It's a mnemonic for 'string'." }
              ],
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
              posttest:[
                { question: "What will be the output of the program if input is Ram 25?", options: ["Name: Ram Age: 25", "Ram 25", "Name=Ram Age=25", "Error"], answerIndex: 0, hint: "The format string of printf() dictates the exact output pattern, including words and spaces." },
                { question: "Why is & not used with char arrays in scanf()?", options: ["It is a syntax error", "char arrays already represent memory addresses", "scanf() does not support strings", "& is only for float variables"], answerIndex: 1, hint: "The name of an array on its own acts like a pointer to its first element." },
                { question: "What is the size of char name[50]?", options: ["50 integers", "50 characters including null terminator", "50 bytes of float", "50 bits"], answerIndex: 1, hint: "The number in the brackets specifies the number of elements of that type." },
                { question: "Which format specifier is used to print a float value?", options: ["%d", "%s", "%f", "%fl"], answerIndex: 2, hint: "This specifier is a mnemonic for 'floating-point'." },
                { question: "What happens if you forget & before an int variable in scanf()?", options: ["Program prints 0", "Program compiles but may crash at runtime (undefined behavior)", "Program prints garbage value", "Compiler gives a warning but runs fine"], answerIndex: 1, hint: "Without the address, scanf() gets the *value* of the variable and treats it as an invalid memory location." }
              ],
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
                  title: "Arithmetic in C",
                  body: ["C supports +, -, *, / and % (modulus). When both operands are integers, division truncates: 7 / 2 = 3, not 3.5.", "To obtain a decimal result, cast one operand to float: (float)a / b."]
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
              pretest:[
                { question: "What is the result of 7 / 2 in C when both are int?", options: ["3.5", "3", "4", "Error"], answerIndex: 1, hint: "Integer division truncates the fractional part." },
                { question: "Which format specifier prints a float to 2 decimal places?", options: ["%d", "%f", "%.2f", "%2d"], answerIndex: 2, hint: "It involves a precision modifier placed between the % and the f." },
                { question: "To get float division from two int variables a and b, you write:", options: ["a / b", "(float)a / b", "float(a / b)", "a % b"], answerIndex: 1, hint: "This is called 'type casting'. You temporarily convert one operand to a float." },
                { question: "What operator computes the remainder of division?", options: ["/", "//", "%", "**"], answerIndex: 2, hint: "It's called the modulus operator." },
                { question: "If a = 10 and b = 4, what is (float)(a + b) / 2?", options: ["7", "7.00", "7.5", "3.0"], answerIndex: 1, hint: "Calculate inside the parentheses first. The result is an integer, then cast to float, then divided." }
              ],
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
              posttest:[
                { question: "What will printf(\"Sum: %d\", 10+4); print?", options: ["Sum: 14", "Sum: 10+4", "14", "Error"], answerIndex: 0, hint: "The %d is a placeholder, and the expression 10+4 is calculated before being placed there." },
                { question: "Which variable type is best for storing the average of two integers?", options: ["int", "float", "char", "double"], answerIndex: 1, hint: "An average is often not a whole number." },
                { question: "For inputs 7 and 3, what is the average printed with %.2f?", options: ["5.00", "5", "5.5", "4.00"], answerIndex: 0, hint: "Remember integer division truncates. How would you get a decimal result for 10/2?" },
                { question: "What is the purpose of type casting in (float)sum / 2?", options: ["Changes sum permanently to float", "Temporarily treats sum as float for division", "Rounds sum to nearest float", "No effect"], answerIndex: 1, hint: "It's a temporary conversion for the purpose of the operation, not a permanent change to the variable." },
                { question: "What is 13 % 4?", options: ["3.25", "1", "3", "4"], answerIndex: 1, hint: "It's the remainder after division. 4 goes into 13 three times (12), with what left over?" }
              ],
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
                  title: "Temperature Conversion Formula",
                  body: ["The relationship between Fahrenheit and Celsius is:", "C = (F - 32) * 5 / 9", "This formula subtracts 32 from the Fahrenheit value, then multiplies by 5 and divides by 9."]
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
              pretest: [
                { question: "What is the correct formula to convert Fahrenheit to Celsius?", options: ["C = (F + 32) * 5 / 9", "C = (F - 32) * 9 / 5", "C = (F - 32) * 5 / 9", "C = F - 32 / 5 * 9"], answerIndex: 2, hint: "Think about the boiling and freezing points of water: 212°F and 32°F correspond to 100°C and 0°C." },
                { question: "What data type should be used to store a temperature like 98.6?", options: ["int", "char", "float", "long"], answerIndex: 2, hint: "This data type is designed to hold numbers with a decimal point." },
                { question: "What is 98.6°F converted to Celsius (approx)?", options: ["32.00", "37.00", "66.60", "45.30"], answerIndex: 1, hint: "This is the standard human body temperature." },
                { question: "Why are parentheses needed in (F - 32) * 5 / 9?", options: ["They are not needed", "To ensure subtraction happens before multiplication", "To convert F to an integer", "To print the result"], answerIndex: 1, hint: "In C, multiplication and division have a higher precedence than subtraction." },
                { question: "What will %.2f do when printing 37.0?", options: ["Print 37", "Print 37.0", "Print 37.00", "Print 37.000"], answerIndex: 2, hint: "The number after the decimal point in the format specifier controls the *precision*, or number of digits shown." }
              ],
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
              posttest: [
                { question: "What is 0°C in Fahrenheit?", options: ["0", "32", "100", "212"], answerIndex: 1, hint: "This is the freezing point of water on the Fahrenheit scale." },
                { question: "What output does the program print for input 32?", options: ["Celsius: 0.00", "Celsius: 32.00", "Celsius: 1.00", "Celsius: -1.00"], answerIndex: 0, hint: "Plug F=32 into the formula C = (F - 32) * 5 / 9. The first term becomes zero." },
                { question: "What happens if fahrenheit is declared as int instead of float?", options: ["No difference", "Decimal part of input is lost", "Program crashes", "Output doubles"], answerIndex: 1, hint: "An integer variable cannot store the fractional part of a number." },
                { question: "Which of the following correctly computes Celsius in C?", options: ["celsius = F - 32 * 5 / 9;", "celsius = (F - 32) * 5 / 9;", "celsius = F * 5 / 9 - 32;", "celsius = (F / 9) * 5 - 32;"], answerIndex: 1, hint: "Because of operator precedence, the subtraction must happen first." },
                { question: "For input 212°F, what is the expected Celsius output?", options: ["180.00", "100.00", "37.00", "0.00"], answerIndex: 1, hint: "This is the boiling point of water." }
              ],
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
              pretest: [
                { question: "What is the formula for Simple Interest?", options: ["SI = P + R + T", "SI = (P * R * T) / 100", "SI = (P + R) * T / 100", "SI = P / (R * T)"], answerIndex: 1, hint: "It's a product of Principal, Rate, and Time, divided by 100 because the rate is a percentage." },
                { question: "What data type is most appropriate for storing principal and rate?", options: ["int", "char", "float", "void"], answerIndex: 2, hint: "Monetary and percentage values often have decimal places." },
                { question: "If P = 1000, R = 5, T = 2, what is SI?", options: ["10.00", "100.00", "1000.00", "50.00"], answerIndex: 1, hint: "(1000 * 5 * 2) / 100 = (10000) / 100 = ?" },
                { question: "Why is dividing by 100 necessary in the SI formula?", options: ["To convert years to months", "Because rate is given as a percentage", "To round the result", "It is not necessary"], answerIndex: 1, hint: "If the rate is 5%, it means 5/100 = 0.05 in the formula." },
                { question: "Which printf format specifier prints a float to 2 decimal places?", options: ["%d", "%f", "%.2f", "%s"], answerIndex: 2, hint: "The .2 is a precision modifier that ensures exactly two digits after the decimal." }
              ],
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
              posttest: [
                { question: "For P = 500, R = 10, T = 3, what is SI?", options: ["15.00", "150.00", "1500.00", "50.00"], answerIndex: 1, hint: "(500 * 10 * 3) / 100 = (15000) / 100 = ?" },
                { question: "What happens if T is declared as int and the user enters 1.5?", options: ["SI is computed correctly", "T stores 1, losing the 0.5", "Program crashes", "T becomes 2"], answerIndex: 1, hint: "An integer variable truncates any fractional part of a number assigned to it." },
                { question: "Which line correctly computes simple interest in C?", options: ["si = P + R + T / 100;", "si = (P * R * T) / 100;", "si = P * R / T * 100;", "si = (P / 100) * R + T;"], answerIndex: 1, hint: "Following the formula, all operations are multiplication and division, which have equal precedence and are evaluated left-to-right." },
                { question: "What is the output for P = 2000, R = 3.5, T = 4?", options: ["28.00", "280.00", "2800.00", "700.00"], answerIndex: 1, hint: "(2000 * 3.5 * 4) / 100 = (28000) / 100 = ?" },
                { question: "Why should SI be declared as float rather than int?", options: ["int cannot store numbers above 100", "SI may have a decimal part", "float is faster to compute", "printf requires float for all output"], answerIndex: 1, hint: "The result of division (especially after dividing by 100) is often not a whole number." }
              ],
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
                }
              ],
              pretest:[
                { question: "Which header file must be included to use sqrt() in C?", options: ["stdio.h", "stdlib.h", "math.h", "string.h"], answerIndex: 2, hint: "This header contains declarations for various mathematical functions." },
                { question: "What does sqrt(144) return?", options: ["14.00", "12.00", "72.00", "1.44"], answerIndex: 1, hint: "Which number, when multiplied by itself, equals 144?" },
                { question: "What is the return type of the sqrt() function?", options: ["int", "float", "double", "char"], answerIndex: 2, hint: "Look at the function signature in documentation: double sqrt(double x);" },
                { question: "What happens if you pass a negative value to sqrt()?", options: ["Program crashes", "Returns 0", "Returns NaN", "Returns the absolute value"], answerIndex: 2, hint: "Mathematically, the square root of a negative number is not a real number." },
                { question: "Which compilation command correctly links the math library?", options: ["gcc program.c -o program", "gcc program.c -o program -lm", "gcc program.c -math -o program", "gcc -sqrt program.c -o program"], answerIndex: 1, hint: "The -lm flag tells the compiler to link the 'libm' (math) library." }
              ],
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
              posttest:[
                { question: "What is the output for input 2?", options: ["1.00", "1.41", "4.00", "2.00"], answerIndex: 1, hint: "The square root of 2 is an irrational number, approximately 1.4142." },
                { question: "What is sqrt(0)?", options: ["1.00", "Undefined", "0.00", "NaN"], answerIndex: 2, hint: "What number multiplied by itself equals 0?" },
                { question: "Which of the following correctly calls the square root function in C?", options: ["squareroot(n)", "sqrt[n]", "sqrt(n)", "Math.sqrt(n)"], answerIndex: 2, hint: "Function calls in C use parentheses ( ), not square brackets [ ]." },
                { question: "What error occurs if you forget -lm during compilation?", options: ["Syntax error", "Runtime crash", "Linker error", "Logical error"], answerIndex: 2, hint: "The compiler compiles your code fine, but the linker can't find the implementation of sqrt() in the standard libraries." },
                { question: "If the user enters 50, what is the approximate output?", options: ["25.00", "10.00", "5.00", "7.07"], answerIndex: 3, hint: "7*7=49, which is very close to 50." }
              ],
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
                  title: "Compound Interest Formula",
                  body: ["Unlike simple interest, compound interest calculates interest on both the principal and the previously accumulated interest:", "A = P * pow(1 + R/100, T)", "CI = A - P", "Where: P = Principal, R = Annual rate, T = Time, A = Amount"]
                },
                {
                  title: "pow() Function",
                  body: ["Syntax: double pow(double base, double exp);", "Returns base raised to the power exp. Requires #include <math.h> and -lm at compilation."]
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
              pretest: [
                { question: "What is the formula for the Amount in compound interest?", options: ["A = P + R * T / 100", "A = P * pow(1 + R/100, T)", "A = P * R * T / 100", "A = P / pow(R, T)"], answerIndex: 1, hint: "The amount grows exponentially with time, not linearly." },
                { question: "Which function is used to raise a number to a power in C?", options: ["sqrt()", "exp()", "pow()", "log()"], answerIndex: 2, hint: "It's short for 'power'." },
                { question: "What is the Compound Interest itself (not the Amount)?", options: ["CI = P * pow(1 + R/100, T)", "CI = A + P", "CI = A - P", "CI = P - A"], answerIndex: 2, hint: "Interest is the extra money earned, which is the final amount minus your original principal." },
                { question: "For P = 1000, R = 10, T = 1, what is the compound interest?", options: ["110.00", "10.00", "100.00", "1100.00"], answerIndex: 2, hint: "For T=1, the formula simplifies to P * R / 100, which is the same as simple interest." },
                { question: "Why is pow() preferred over repeated multiplication for compound interest?", options: ["It is faster for small T", "It correctly handles any value of T including non-integers", "It avoids the need for float variables", "It rounds the result automatically"], answerIndex: 1, hint: "What if the time period is 2.5 years? A loop for multiplication wouldn't work easily." }
              ],
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
              posttest:[
                { question: "For P = 1000, R = 10, T = 2, what is the Amount?", options: ["1100.00", "1200.00", "1210.00", "1020.00"], answerIndex: 2, hint: "A = 1000 * pow(1.10, 2) = 1000 * 1.21 = ?" },
                { question: "What is the Compound Interest for P = 1000, R = 10, T = 2?", options: ["200.00", "210.00", "100.00", "220.00"], answerIndex: 1, hint: "Interest = Amount - Principal. 1210 - 1000 = ?" },
                { question: "How does compound interest differ from simple interest for the same inputs?", options: ["They are always equal", "Simple interest is always greater", "Compound interest grows faster because interest is earned on interest", "Compound interest only applies to integers"], answerIndex: 2, hint: "Think about the 'snowball effect' on the interest you've already earned." },
                { question: "What header and flag are required to use pow() in C?", options: ["stdlib.h, no flag needed", "math.h, -lm", "stdio.h, -lm", "math.h, -lmath"], answerIndex: 1, hint: "One is a header file for the function declaration, the other is a linker flag for the function definition." },
                { question: "For P = 500, R = 5, T = 3, what is CI approximately?", options: ["75.00", "78.81", "57.88", "100.00"], answerIndex: 1, hint: "Calculate A = 500 * 1.05 * 1.05 * 1.05, then subtract the principal." }
              ],
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
                  title: "Heron's Formula",
                  body: ["Given a triangle with sides a, b, and c, its area can be computed without knowing any angle:", "s = (a + b + c) / 2 (semi-perimeter)", "Area = sqrt(s * (s-a) * (s-b) * (s-c))", "This formula works for any triangle as long as the sides satisfy the triangle inequality."]
                },
                {
                  title: "Triangle Inequality",
                  body: ["For three sides to form a valid triangle, the sum of any two sides must be greater than the third side:", "a + b > c, b + c > a, a + c > b", "If this condition is not met, the expression inside sqrt() becomes negative or zero, yielding NaN or 0 as the area."]
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
              pretest: [
                { question: "For P = 1000, R = 10, T = 2, what is the Amount?", options: ["1100.00", "1200.00", "1210.00", "1020.00"], answerIndex: 2, hint: "A = 1000 * pow(1.10, 2) = 1000 * 1.21 = ?" },
                { question: "What is the Compound Interest for P = 1000, R = 10, T = 2?", options: ["200.00", "210.00", "100.00", "220.00"], answerIndex: 1, hint: "Interest = Amount - Principal. 1210 - 1000 = ?" },
                { question: "How does compound interest differ from simple interest for the same inputs?", options: ["They are always equal", "Simple interest is always greater", "Compound interest grows faster because interest is earned on interest", "Compound interest only applies to integers"], answerIndex: 2, hint: "Think about the 'snowball effect' on the interest you've already earned." },
                { question: "What header and flag are required to use pow() in C?", options: ["stdlib.h, no flag needed", "math.h, -lm", "stdio.h, -lm", "math.h, -lmath"], answerIndex: 1, hint: "One is a header file for the function declaration, the other is a linker flag for the function definition." },
                { question: "For P = 500, R = 5, T = 3, what is CI approximately?", options: ["75.00", "78.81", "57.88", "100.00"], answerIndex: 1, hint: "Calculate A = 500 * 1.05 * 1.05 * 1.05, then subtract the principal." }
              ],
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
              posttest: [
                { question: "For sides 5, 5, 5, what is the semi-perimeter?", options: ["5.00", "15.00", "7.50", "10.00"], answerIndex: 2, hint: "Perimeter is 15, half of that is ?" },
                { question: "What is the area of an equilateral triangle with side 6?", options: ["36.00", "18.00", "15.59", "12.00"], answerIndex: 2, hint: "Use Heron's formula: s=9, then sqrt(9*3*3*3) = sqrt(243) ≈ 15.588." },
                { question: "For sides 1, 2, 10, what does the program output?", options: ["Area: 0.00", "Area: NaN or invalid result", "Area: 5.00", "Compilation error"], answerIndex: 1, hint: "The triangle inequality fails (1+2 is not > 10), causing the product under the square root to be negative." },
                { question: "Which intermediate value must be computed before the area in Heron's Formula?", options: ["The height of the triangle", "The perimeter only", "The semi-perimeter s", "The largest angle"], answerIndex: 2, hint: "Heron's formula is area = sqrt(s(s-a)(s-b)(s-c)). You can't proceed without calculating this first." },
                { question: "For sides 6, 8, 10, what is the area?", options: ["48.00", "20.00", "30.00", "24.00"], answerIndex: 2, hint: "This is a right triangle (double of 3-4-5). The area is (1/2)*6*8 = ?" }
              ],
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
                  title: "Equation of Motion",
                  body: ["The distance traveled by an object under uniform acceleration is:", "s = u*t + 0.5 * a * t * t", "Where: s = Distance (m), u = Initial velocity (m/s), a = Acceleration (m/s²), t = Time (s)", "This is the second equation of motion from classical kinematics."]
                },
                {
                  title: "Integer Division Pitfall",
                  body: ["Writing 1/2 in C evaluates to 0 because both operands are integer literals, truncating the result.", "Always write 0.5 or (float)1/2 to preserve the half factor."]
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
              pretest: [
                { question: "What is the kinematic formula for distance traveled under uniform acceleration?", options: ["s = u + a * t", "s = u*t + 0.5 * a * t * t", "s = 0.5 * u * t * t + a", "s = (u + a) * t / 2"], answerIndex: 1, hint: "It's the second equation of motion. It includes an initial velocity term and an acceleration term." },
                { question: "What does 1/2 evaluate to in C when both are integer literals?", options: ["0.5", "1", "0", "2"], answerIndex: 2, hint: "C performs integer arithmetic if both operands are integers. The decimal part is truncated." },
                { question: "How should the half factor be correctly written in C?", options: ["1/2", "1//2", "0.5", "half"], answerIndex: 2, hint: "Using a floating-point literal ensures the division is done as a floating-point operation." },
                { question: "If u = 0, a = 10, t = 2, what is the distance?", options: ["40.00", "10.00", "20.00", "5.00"], answerIndex: 2, hint: "s = 0*2 + 0.5*10*4 = 0.5 * 40 = ?" },
                { question: "Which operator computes t squared in C?", options: ["t^2", "t**2", "pow(t,2) or t*t", "sq(t)"], answerIndex: 2, hint: "C has no exponentiation operator, so you must multiply the variable by itself." }
              ],
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
              posttest: [
                { question: "For u = 5, a = 2, t = 3, what is the distance?", options: ["20.00", "21.00", "24.00", "30.00"], answerIndex: 2, hint: "s = (5*3) + (0.5*2*9) = 15 + 9 = ?" },
                { question: "What is the distance when u = 10, a = 0, t = 5?", options: ["0.00", "25.00", "50.00", "100.00"], answerIndex: 2, hint: "Without acceleration, the formula simplifies to s = u * t." },
                { question: "Why is t*t preferred over pow(t,2) for squaring in simple programs?", options: ["pow() gives wrong results for integers", "t*t avoids including math.h and is simpler", "pow() only works for doubles", "t*t is always more accurate"], answerIndex: 1, hint: "Multiplication is a basic operation, while pow() is a complex function that requires a library." },
                { question: "What is the output for u = 0, a = 0, t = 10?", options: ["10.00", "100.00", "0.00", "50.00"], answerIndex: 2, hint: "If you start at rest and have no acceleration, you never move." },
                { question: "For u = 20, a = -5, t = 4, what is the distance?", options: ["80.00", "40.00", "60.00", "20.00"], answerIndex: 1, hint: "s = (20*4) + (0.5 * -5 * 16) = 80 - 40 = ?" }
              ],
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
                  title: "Operator Precedence",
                  body: ["When an expression contains multiple operators, C evaluates higher-precedence operators first. The standard precedence order for arithmetic:", "Level 1 (highest): *, /, %", "Level 2: +, -", "Level 3 (lowest): = (assignment)", "Example: 2 + 3 * 4 evaluates as 2 + (3 * 4) = 2 + 12 = 14, not 20."]
                },
                {
                  title: "Associativity",
                  body: ["When two operators have equal precedence, associativity determines evaluation order. All basic arithmetic operators are left-to-right associative:", "10 - 3 - 2 evaluates as (10 - 3) - 2 = 5, not 10 - (3 - 2) = 9."]
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
                  title: "Increment and Decrement",
                  body: ["++ and -- modify a variable by 1.", "Pre-increment ++x : increments first, then uses value.", "Post-increment x++ : uses value first, then increments."]
                }
              ],
              pretest: [
                { question: "What is the result of 2 + 3 * 4 in C?", options: ["20", "14", "24", "9"], answerIndex: 1, hint: "Multiplication (*) has higher precedence than addition (+)." },
                { question: "What is the result of 10 - 3 - 2 in C?", options: ["9", "5", "7", "3"], answerIndex: 1, hint: "Subtraction has left-to-right associativity." },
                { question: "What is 17 % 5?", options: ["3", "2", "1", "0"], answerIndex: 1, hint: "The modulus operator gives the remainder after division." },
                { question: "What is the value of x after: int x = 5; int y = x++;?", options: ["x = 6, y = 6", "x = 5, y = 5", "x = 6, y = 5", "x = 5, y = 6"], answerIndex: 2, hint: "The post-increment operator uses the current value of x for the assignment, then increments x." },
                { question: "What is the result of (2 + 3) * (8 - 4) / 2?", options: ["14", "8", "10", "20"], answerIndex: 2, hint: "Parentheses force the operations inside to happen first. Then proceed with * and / from left to right." }
              ],
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
              posttest: [
                { question: "What is the result of 100 / 4 * 5 in C?", options: ["5", "20", "125", "500"], answerIndex: 2, hint: "/ and * have equal precedence and are evaluated left-to-right." },
                { question: "What is the value of 5 + 3 * 2 - 8 / 4?", options: ["7", "9", "8", "4"], answerIndex: 1, hint: "Do the * and / first: 3*2=6, 8/4=2. Then the expression is 5+6-2." },
                { question: "What does ++x do differently from x++?", options: ["No difference", "++x increments after use; x++ increments before use", "++x increments before use; x++ increments after use", "++x works only on float"], answerIndex: 2, hint: "The placement of the ++ determines if the increment happens before or after the variable's value is used in the expression." },
                { question: "What is the result of 2 * 3 + 4 * 5 - 6 / 2?", options: ["20", "23", "18", "30"], answerIndex: 1, hint: "Perform all multiplications/divisions first: 6 + 20 - 3. Then do the additions/subtractions left-to-right." },
                { question: "Which expression evaluates to 1 in C?", options: ["5 / 2 * 2", "5 % 2", "5 - 2 * 2", "5 * 0 + 1 / 2"], answerIndex: 1, hint: "Which operator gives you the remainder of a division? For 5 / 2, the quotient is 2, remainder is 1." }
              ],
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
              pretest: [
                { question: "What does the relational operator > return when the condition is false?", options: ["-1", "0", "1", "NULL"], answerIndex: 1, hint: "Relational operators in C yield an integer result, 1 for true or 0 for false." },
                { question: "What is the result of (10 > 5) ? 10 : 5?", options: ["5", "0", "1", "10"], answerIndex: 3, hint: "The ternary operator evaluates the condition. If true, the expression takes the value of the first part after the '?'." },
                { question: "Which operator is the ternary operator in C?", options: ["::", "?:", "??", "->"], answerIndex: 1, hint: "It's the only operator that takes three operands." },
                { question: "For a = 3, b = 7, c = 5, what does (a > b) ? a : b evaluate to?", options: ["3", "5", "7", "0"], answerIndex: 2, hint: "Check the condition first. Is a > b? If true, the result is a. If false, the result is b." },
                { question: "What is the difference between = and == in C?", options: ["No difference", "= compares, == assigns", "= assigns a value; == tests equality", "== is only for floats"], answerIndex: 2, hint: "One is for setting a variable to a value, the other is for comparing two values." }
              ],
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
              posttest: [
                { question: "For inputs 4, 4, 4, what is the output?", options: ["0", "Error", "4", "Undefined"], answerIndex: 2, hint: "All numbers are equal, so the maximum is that number." },
                { question: "Which expression correctly finds the max of a and b?", options: ["max = a > b ? b : a", "max = (a > b) ? a : b", "max = a < b ? a : b", "max = a == b ? a : b"], answerIndex: 1, hint: "If a is greater than b, the answer should be a. Otherwise, it should be b." },
                { question: "For inputs -5, -1, -9, what is the maximum?", options: ["-9", "-5", "-1", "0"], answerIndex: 2, hint: "-1 is the largest (closest to zero) among these negative numbers." },
                { question: "What is the precedence order (highest to lowest) relevant here?", options: ["Ternary → Relational → Arithmetic", "Arithmetic → Ternary → Relational", "Arithmetic → Relational → Ternary", "Relational → Arithmetic → Ternary"], answerIndex: 2, hint: "The condition in the ternary operator is a relational expression, which must be evaluated after any arithmetic it contains." },
                { question: "For a = 10, b = 20, c = 15, what does the following evaluate to? (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c)", options: ["10", "15", "20", "0"], answerIndex: 2, hint: "The outer condition is false, so the expression becomes ((b > c) ? b : c). Since b > c, the result is b." }
              ],
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
              pretest: [
                { question: "What does the += operator do?", options: ["Compares two values", "Adds the right operand to the left and assigns the result", "Always increments by 1", "Performs modulus and assigns"], answerIndex: 1, hint: "It's a shorthand for var = var + value." },
                { question: "For 5 subject marks totalling 375, what is the average?", options: ["70.00", "75.00", "80.00", "65.00"], answerIndex: 1, hint: "Average = Total sum / Number of items." },
                { question: "Which logical operator means AND in C?", options: ["&", "|", "&&", "||"], answerIndex: 2, hint: "It's a double ampersand, used to combine conditions that must both be true." },
                { question: "What is the correct way to check if average is between 60 and 75 (inclusive of 60)?", options: ["60 < average < 75", "average >= 60 || average < 75", "average >= 60 && average < 75", "average == 60 && 75"], answerIndex: 2, hint: "You need to check two separate relational conditions and combine them with the AND operator." },
                { question: "Why cast total to float before dividing by number of subjects?", options: ["To make the code longer", "To avoid integer truncation and get a decimal average", "Because printf requires float", "Because += only works with float"], answerIndex: 1, hint: "If both total and 5 are integers, the division will be integer division, chopping off any decimal part." }
              ],
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
              posttest: [
                { question: "For marks 70 80 90 60 50, what is the total?", options: ["340", "360", "350", "370"], answerIndex: 2, hint: "Sum of the five numbers." },
                { question: "For the same marks above (total 350), what is the average?", options: ["75.00", "70.00", "65.00", "80.00"], answerIndex: 1, hint: "350 / 5 = 70.00" },
                { question: "With average 70.00, which grade is awarded?", options: ["A", "B", "C", "D"], answerIndex: 2, hint: "The condition for a 'C' is average >= 60 and average < 75." },
                { question: "Which compound operator correctly accumulates marks into total?", options: ["total == total + marks", "total = marks", "total += marks", "total =+ marks"], answerIndex: 2, hint: "The correct shorthand for 'add marks to total' is total += marks." },
                { question: "For marks 30 35 28 40 32, what is the grade?", options: ["D", "C", "F", "B"], answerIndex: 2, hint: "The total is 165, average is 33, which is less than 40." }
              ],
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
                  title: "Nested if-else",
                  body: ["An if-else construct placed inside another if or else block is called a nested if-else. It allows multi-way decisions based on a sequence of conditions.", "if (condition1) {\n    if (condition2) { ... }\n    else { ... }\n} else { ... }"]
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
              pretest: [
                { question: "What is the correct initial assumption when finding the maximum of four numbers?", options: ["Assume max = 0", "Assume max = first number", "Assume max = last number", "Assume max = average"], answerIndex: 1, hint: "You must have a valid starting point to compare against. The first number in the list is a safe choice." },
                { question: "For inputs 3, 9, 1, 7, what is the maximum?", options: ["3", "7", "1", "9"], answerIndex: 3, hint: "Visually inspect the numbers; which one is the largest?" },
                { question: "For inputs 3, 9, 1, 7, what is the minimum?", options: ["3", "1", "7", "9"], answerIndex: 1, hint: "Which is the smallest number?" },
                { question: "What does the condition (b > max) check?", options: ["Whether b equals max", "Whether b is strictly greater than the current max", "Whether b is less than max", "Whether b is not zero"], answerIndex: 1, hint: "This is the core comparison to see if we've found a new, larger number." },
                { question: "What relational operator is used to find the smallest value?", options: [">", ">=", "<", "=="], answerIndex: 2, hint: "You need to check if a number is less than the current minimum." }
              ],
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
              posttest: [
                { question: "For inputs -3, -8, -1, -5, what is the maximum?", options: ["-8", "-5", "-3", "-1"], answerIndex: 3, hint: "-1 is the closest to zero, and therefore the largest, among these negative numbers." },
                { question: "For inputs -3, -8, -1, -5, what is the minimum?", options: ["-1", "-3", "-8", "-5"], answerIndex: 2, hint: "-8 is the farthest from zero, and therefore the smallest." },
                { question: "What is wrong with initialising max = 0 when all inputs are negative?", options: ["Nothing, it always works", "max would remain 0, which is larger than all inputs — giving a wrong result", "It causes a compilation error", "It only fails when inputs are floats"], answerIndex: 1, hint: "If all numbers are less than 0, the initial max (0) will never be replaced, as none of the inputs will be > 0." },
                { question: "How many comparisons are needed to find max from four numbers using the sequential update method?", options: ["2", "4", "3", "6"], answerIndex: 2, hint: "After initializing with the first number, you need to compare it against the remaining 3 numbers." },
                { question: "For inputs 5, 5, 5, 5, what are max and min?", options: ["max = 0, min = 0", "max = 5, min = 0", "max = 5, min = 5", "Undefined"], answerIndex: 2, hint: "If all numbers are equal, that number is both the maximum and the minimum." }
              ],
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
                  title: "Slab-Based Tariff",
                  body: ["Electricity boards charge different rates per unit for different consumption ranges. A common slab structure:", "Units 1–100 : Rs. 1.50 per unit", "Units 101–200 : Rs. 2.50 per unit (for units above 100)", "Units 201–300 : Rs. 4.00 per unit (for units above 200)", "Units above 300: Rs. 6.00 per unit (for units above 300)"]
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
              pretest: [
                { question: "What kind of conditional structure is best for multi-slab billing?", options: ["Nested ternary operators", "switch-case", "if-else if-else chain", "while loop"], answerIndex: 2, hint: "This structure is ideal for checking a value (units) against a series of mutually exclusive ranges." },
                { question: "A customer uses 150 units. How many units are billed at Rs. 2.50/unit?", options: ["150", "100", "50", "200"], answerIndex: 2, hint: "The first 100 units are billed at the first rate. The remaining 50 fall into the next slab." },
                { question: "What is the bill for 100 units at Rs. 1.50 per unit?", options: ["100.00", "200.00", "150.00", "50.00"], answerIndex: 2, hint: "100 units * 1.50 Rs/unit = ?" },
                { question: "For 250 units using the slab above, what is the bill (excluding service charge)?", options: ["500.00", "625.00", "600.00", "550.00"], answerIndex: 2, hint: "Calculate slab-wise: (100*1.5) + (100*2.5) + (50*4.0) = 150 + 250 + 200 = ?" },
                { question: "Once a true condition is found in an if-else if chain, what happens to the rest?", options: ["They are all evaluated", "They are skipped", "They cause an error", "They are evaluated only if the first is false"], answerIndex: 1, hint: "This is an efficiency feature. Once the correct slab is found, the program doesn't need to check the others." }
              ],
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
              posttest: [
                { question: "For 100 units, what is the bill (excluding service charge)?", options: ["200.00", "100.00", "250.00", "150.00"], answerIndex: 3, hint: "units <= 100, so bill = 100 * 1.50" },
                { question: "For 200 units, what is the bill (excluding service charge)?", options: ["300.00", "400.00", "500.00", "350.00"], answerIndex: 2, hint: "units <= 200, so bill = (100*1.5) + (100*2.5) = 150 + 250" },
                { question: "For 350 units, what is the bill (excluding service charge)?", options: ["900.00", "1100.00", "1050.00", "1150.00"], answerIndex: 3, hint: "units > 300, so bill = (100*1.5)+(100*2.5)+(100*4.0)+(50*6.0) = 150+250+400+300" },
                { question: "What is the role of the else block in the slab billing program?", options: ["Handles units equal to 300", "Handles zero units", "Handles units greater than 300", "Is never executed"], answerIndex: 2, hint: "It's the 'catch-all' for consumption that doesn't match any of the previous if or else if conditions." },
                { question: "Why is a service charge added separately rather than inside each slab?", options: ["It makes the program longer", "It is a fixed charge applied regardless of units consumed", "It only applies to high consumers", "It is required by the C standard"], answerIndex: 1, hint: "The service charge is a constant fee that is the same for everyone, so it's added after the consumption-based calculation is done." }
              ],
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
                  title: "Quadratic Formula",
                  body: ["A second-degree polynomial equation of the form: ax² + bx + c = 0 where a ≠ 0", "Formula: x = (-b ± sqrt(b² - 4ac)) / (2a)"]
                },
                {
                  title: "Discriminant",
                  body: ["D = b² - 4ac determines the nature of the roots:", "D > 0 : Two distinct real roots. x1 = (-b + sqrt(D)) / (2a), x2 = (-b - sqrt(D)) / (2a)", "D == 0 : Two equal (repeated) real roots. x1 = x2 = -b / (2a)", "D < 0 : Two complex conjugate roots (no real roots). Real part = -b / (2a), Imaginary part = sqrt(-D) / (2a)"]
                },
                {
                  title: "Edge Case",
                  body: ["If a = 0, the equation becomes linear: bx + c = 0, solved as x = -c/b.", "This must be checked before applying the quadratic formula to avoid division by zero."]
                }
              ],
              pretest: [
                { question: "What is the discriminant of a quadratic equation?", options: ["b² + 4ac", "b² - 4ac", "2a - b", "-b / 2a"], answerIndex: 1, hint: "It's the part under the square root in the quadratic formula: √(b² - 4ac)." },
                { question: "If D > 0, the roots are:", options: ["Complex", "Equal", "Two distinct real roots", "Zero"], answerIndex: 2, hint: "The √(D) term is a positive real number, leading to two different results when added and subtracted." },
                { question: "If D = 0, what can be said about the roots?", options: ["No real roots exist", "Two distinct real roots", "Two equal real roots", "One root is always zero"], answerIndex: 2, hint: "The ±√0 term vanishes, so (-b)/(2a) is the only result, occurring twice." },
                { question: "For a = 1, b = -5, c = 6, what is the discriminant?", options: ["1", "49", "25", "1"], answerIndex: 3, hint: "(-5)² - 4*1*6 = 25 - 24 = 1" },
                { question: "Why must a = 0 be handled separately before computing roots?", options: ["It causes a syntax error", "It makes D negative", "It results in division by zero in the quadratic formula", "sqrt() fails when a = 0"], answerIndex: 2, hint: "The quadratic formula, x = (-b ± √(b² - 4ac)) / (2a), has a division by 2a." }
              ],
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
              posttest: [
                { question: "For a=1, b=2, c=1, what is the discriminant and nature of roots?", options: ["D=8, distinct real", "D=0, equal real roots", "D=-4, complex", "D=4, distinct real"], answerIndex: 1, hint: "D = 2² - 4*1*1 = 4 - 4 = 0." },
                { question: "For a=1, b=1, c=1, what is the nature of roots?", options: ["Distinct real", "Equal real", "Complex", "Zero"], answerIndex: 2, hint: "D = 1² - 4*1*1 = 1 - 4 = -3, which is negative." },
                { question: "For a=1, b=-5, c=6, what are the roots?", options: ["1 and 6", "2 and 3", "-2 and -3", "5 and 1"], answerIndex: 1, hint: "(x-2)(x-3) = x² -5x + 6 = 0." },
                { question: "What is the real part of complex roots when D < 0?", options: ["sqrt(-D) / (2a)", "b / (2a)", "-b / (2a)", "-b / a"], answerIndex: 2, hint: "In the formula, it's the -b/(2a) part before the ± i√|D|/(2a)." },
                { question: "For a=0, b=2, c=4, what should the program output?", options: ["Roots: -2.00 and 2.00", "Not a quadratic — linear equation, x = -2.00", "Division by zero error", "Complex roots"], answerIndex: 1, hint: "The equation becomes 2x + 4 = 0, which solves to x = -2." }
              ],
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
                  title: "switch-case Statement",
                  body: ["An alternative to long if-else if chains when branching on the value of a single integer or character expression.", "switch (expression) {\n    case value1: statements; break;\n    case value2: statements; break;\n    default: statements;\n}"]
                },
                {
                  title: "break Statement and Fall-Through",
                  body: ["Each case must end with break to prevent fall-through. Without break, execution continues into the next case regardless of its label.", "Intentional fall-through (omitting break) can group cases: case '+': case 'p': result = a + b; break;"]
                },
                {
                  title: "default Case and Char Input",
                  body: ["default case is executed when no case value matches the expression. Used to handle invalid or unexpected input gracefully.", "Operators are characters. Read with scanf(\" %c\", &op). The leading space in \" %c\" skips any leftover whitespace or newline in the input buffer."]
                },
                {
                  title: "Division by Zero",
                  body: ["Always check if the divisor is zero before performing division:\ncase '/':\n    if (b == 0) printf(\"Error\");\n    else result = a / b;\n    break;"]
                }
              ],
              pretest: [
                { question: "Which statement prevents fall-through in a switch-case block?", options: ["continue", "exit", "return", "break"], answerIndex: 3, hint: "It exits the current block (loop or switch) and prevents execution from continuing to the next case." },
                { question: "What is executed when no case matches in a switch statement?", options: ["The first case", "Nothing — program exits", "The default case", "An error is thrown"], answerIndex: 2, hint: "This is a safety net case that's executed when all other case labels fail to match." },
                { question: "What format specifier reads a character in scanf?", options: ["%s", "%d", "%c", "%ch"], answerIndex: 2, hint: "It's a mnemonic for 'character'." },
                { question: "For inputs 10, 0, and operator /, what should the program output?", options: ["0.00", "Infinity", "Error: Division by zero", "10.00"], answerIndex: 2, hint: "Mathematically, division by zero is undefined. A good program will check for this and report an error instead of crashing." },
                { question: "What happens if break is omitted from a case in switch?", options: ["Compilation error", "That case is skipped", "Execution falls through to the next case", "switch exits immediately"], answerIndex: 2, hint: "This is called 'fall-through'. The program will continue executing the code for the following case(s)." }
              ],
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
              posttest: [
                { question: "For inputs 15, 4, and operator *, what is the output?", options: ["11.00", "3.75", "19.00", "60.00"], answerIndex: 3, hint: "15 * 4 = 60" },
                { question: "For inputs 9, 4, and operator -, what is the output?", options: ["13.00", "2.25", "5.00", "36.00"], answerIndex: 2, hint: "9 - 4 = 5" },
                { question: "For inputs 7, 2, and operator /, what is the output?", options: ["3.00", "3.50", "4.00", "14.00"], answerIndex: 1, hint: "7 / 2 = 3.5" },
                { question: "What does the default case in this calculator program do?", options: ["Performs addition as a fallback", "Exits the program silently", "Prints an invalid operator message", "Repeats the last valid operation"], answerIndex: 2, hint: "It handles cases where the user didn't enter a valid +, -, *, or / symbol." },
                { question: "Why is \" %c\" (with a leading space) used instead of \"%c\" for reading the operator?", options: ["%c cannot read symbols", "The leading space flushes the newline left in the input buffer", "Symbols require a space before them in scanf", "It makes the output prettier"], answerIndex: 1, hint: "After reading the two numbers, a newline character (\\n) is often left in the input buffer. The leading space tells scanf to skip any whitespace (like newlines) before reading the character." }
              ],
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
                  title: "Operators",
                  body: ["Modulus Operator — year % 4 gives the remainder when year is divided by 4.", "Logical Operators: && (AND) both conditions must be true, || (OR) at least one condition must be true, ! (NOT) inverts a boolean result"]
                }
              ],
              pretest: [
                { question: "Which of the following is the correct leap year condition in C?", options: ["year % 4 == 0", "(year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)", "year % 100 == 0 || year % 4 == 0", "year % 400 == 0 && year % 4 == 0"], answerIndex: 1, hint: "It's a two-part rule: divisible by 4, but not by 100, unless it's also divisible by 400." },
                { question: "Is 1900 a leap year?", options: ["Yes", "No", "Only in some calendars", "Depends on the compiler"], answerIndex: 1, hint: "It is divisible by 4 and by 100, but not by 400." },
                { question: "Is 2000 a leap year?", options: ["No", "Yes", "Only if divisible by 100", "Cannot be determined"], answerIndex: 1, hint: "It is divisible by 400, so it is a leap year." },
                { question: "What does year % 4 == 0 check?", options: ["Whether year is greater than 4", "Whether year divided by 4 leaves no remainder", "Whether year is a multiple of 100", "Whether year is odd"], answerIndex: 1, hint: "The % (modulus) operator gives the remainder. If the remainder is zero, it's evenly divisible." },
                { question: "Why is the divisible-by-100 rule needed in addition to divisible-by-4?", options: ["To handle negative years", "Because century years are not leap years unless divisible by 400", "To speed up computation", "To handle float years"], answerIndex: 1, hint: "This rule corrects an over-correction. Just being divisible by 4 is not enough for century years." }
              ],
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
              posttest: [
                { question: "Is 1600 a leap year?", options: ["No", "Yes", "Only if % 4 == 0", "Cannot be determined"], answerIndex: 1, hint: "It is divisible by 400, so it's a leap year." },
                { question: "Is 2100 a leap year?", options: ["Yes, divisible by 4", "No — divisible by 100 but not 400", "Yes, divisible by 400", "Yes, all future years are leap years"], answerIndex: 1, hint: "It is divisible by 100, but not by 400." },
                { question: "What is the output for year = 2023?", options: ["2023 is a Leap Year", "2023 is not a Leap Year", "Compilation error", "Undefined"], answerIndex: 1, hint: "2023 % 4 = 3, so it's not divisible by 4." },
                { question: "Which logical operator is used to combine the two main leap year conditions?", options: ["&&", "!", "||", "^"], answerIndex: 2, hint: "The year is a leap year if (condition A) is true OR (condition B) is true." },
                { question: "How many leap years are there between 1900 and 2000 inclusive?", options: ["25", "24", "26", "23"], answerIndex: 1, hint: "Leap years are every 4 years (1904, 1908...2000), but 1900 is not a leap year. How many are there? 2000 is a leap year, so you count it." }
              ],
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
                  title: "Negative Input Handling",
                  body: ["Factorial is undefined for negative integers. Check with if (n < 0) and print an error message before attempting any computation."]
                }
              ],
              pretest: [
                { question: "What is 0! equal to?", options: ["0", "Undefined", "1", "-1"], answerIndex: 2, hint: "It's a mathematical convention, defined as the multiplicative identity." },
                { question: "What is 5!?", options: ["25", "60", "100", "120"], answerIndex: 3, hint: "1 * 2 * 3 * 4 * 5 = 120" },
                { question: "Why is long long preferred over int for storing factorial results?", options: ["int cannot store numbers above 100", "Factorials grow rapidly and overflow 32-bit int beyond 12!", "long long is faster to compute", "printf requires long long for all loops"], answerIndex: 1, hint: "An int can only hold values up to about 2 billion. 13! is over 6 billion." },
                { question: "What format specifier is used to print a long long value?", options: ["%ld", "%lld", "%ll", "%Ld"], answerIndex: 1, hint: "It's a 'long long' integer, so the format is a double 'l'." },
                { question: "What is the correct initial value of the factorial accumulator before the loop?", options: ["0", "n", "1", "-1"], answerIndex: 2, hint: "The product of an empty set of numbers is 1." }
              ],
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
              posttest: [
                { question: "What is 10!?", options: ["100", "1000", "3628800", "362880"], answerIndex: 2, hint: "1*2*...*10 = 3,628,800." },
                { question: "What is the output of the program for n = 0?", options: ["0", "Undefined", "Error", "1"], answerIndex: 3, hint: "The loop condition (i <= n) will be false, so the loop body is skipped, and fact remains 1." },
                { question: "How many iterations does the for loop execute for n = 6?", options: ["5", "7", "6", "0"], answerIndex: 2, hint: "The loop runs from i=1 to i=6 inclusive." },
                { question: "What happens to the accumulator if it is initialised to 0 instead of 1?", options: ["Output doubles", "Output is always 0", "Output is always 1", "No change"], answerIndex: 1, hint: "0 * anything = 0. The factorial of any number would be incorrectly calculated as 0." },
                { question: "What is the maximum n for which factorial fits in a long long (64-bit)?", options: ["15", "25", "20", "12"], answerIndex: 2, hint: "20! is approximately 2.43 x 10^18, which is just under the maximum for a 64-bit unsigned integer (~1.8 x 10^19). 21! is too large." }
              ],
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
                  title: "break Statement and Flag",
                  body: ["When a factor is found, there is no need to continue checking. break exits the loop immediately.", "A flag (isPrime) is initialised to 1. If any factor is found, it is set to 0. After the loop, the flag determines the result."]
                }
              ],
              pretest: [
                { question: "What is the definition of a prime number?", options: ["Divisible by 2", "Greater than 1 with no divisors other than 1 and itself", "An odd number", "Divisible only by itself"], answerIndex: 1, hint: "It's a number that has exactly two distinct positive divisors." },
                { question: "Why is it sufficient to check divisors up to sqrt(n)?", options: ["To make the code shorter", "Any factor larger than sqrt(n) pairs with one smaller than sqrt(n)", "sqrt(n) is always prime", "Divisors above sqrt(n) are always even"], answerIndex: 1, hint: "If n = a * b, and a <= b, then a cannot be greater than the square root of n." },
                { question: "What is the loop condition using the sqrt optimisation?", options: ["i <= n", "i < n", "i * i <= n", "i <= n / 2"], answerIndex: 2, hint: "You compare the square of the divisor i with n to avoid using floating-point sqrt." },
                { question: "What does the break statement do inside the prime-checking loop?", options: ["Skips the current iteration", "Exits the entire program", "Exits the loop immediately when a factor is found", "Restarts the loop from i = 2"], answerIndex: 2, hint: "Once you find a factor, you know the number isn't prime, so there's no need to check further." },
                { question: "Is 1 a prime number?", options: ["Yes", "No", "Only in some definitions", "Depends on the compiler"], answerIndex: 1, hint: "The definition requires the number to have exactly two distinct positive divisors. 1 has only one." }
              ],
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
              posttest: [
                { question: "How many iterations does the optimised loop perform for n = 36?", options: ["35", "18", "6", "4"], answerIndex: 2, hint: "The loop runs as long as i*i <= 36. So i=2,3,4,5,6. That's 5 iterations." },
                { question: "What is the output for n = 2?", options: ["2 is not a Prime Number", "2 is a Prime Number", "Undefined", "0"], answerIndex: 1, hint: "It is the smallest and only even prime number." },
                { question: "What is the output for n = 1?", options: ["1 is a Prime Number", "1 is not a Prime Number", "Error", "0"], answerIndex: 1, hint: "1 is not greater than 1, so the condition n <= 1 sets isPrime = 0." },
                { question: "For n = 49, what factor is found first and at which iteration?", options: ["i = 7, n % 7 == 0", "i = 2, n % 2 == 0", "i = 3, n % 3 == 0", "i = 49, n % 49 == 0"], answerIndex: 0, hint: "The loop stops when i*i <= n, so i=2,3,4,5,6,7. It stops when i=7 because 49 % 7 == 0." },
                { question: "What is the purpose of initialising isPrime = 1 before the loop?", options: ["To set the default output to \"not prime\"", "To assume the number is prime unless a factor is found", "To avoid a compilation warning", "Required by C standard for flag variables"], answerIndex: 1, hint: "It's an optimistic assumption. We will only set it to 0 (false) if we find evidence that the number is composite." }
              ],
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
                  title: "Sine Series (Maclaurin Expansion)",
                  body: ["sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + x⁹/9! - ...", "General term (n starting from 0): term_n = (-1)^n * x^(2n+1) / (2n+1)!"]
                },
                {
                  title: "Degree to Radian Conversion",
                  body: ["Trigonometric series require x in radians: x_rad = x_deg * (M_PI / 180.0)", "M_PI is defined in math.h. Alternatively use 3.14159265358979."]
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
              pretest: [
                { question: "What is the first term of the sine series?", options: ["x³/3!", "x²/2!", "x", "1"], answerIndex: 2, hint: "sin(0) = 0, and the first term is x." },
                { question: "What is the correct degree-to-radian conversion formula?", options: ["rad = deg / 180", "rad = deg * 180 / PI", "rad = deg * PI / 180", "rad = deg * PI"], answerIndex: 2, hint: "There are 2π radians in 360 degrees." },
                { question: "What is the sign pattern of the sine series terms?", options: ["All positive", "All negative", "Alternating starting positive: +, -, +, -, ...", "Alternating starting negative: -, +, -, +, ..."], answerIndex: 2, hint: "The expansion is x - x³/3! + x⁵/5! - x⁷/7! + ..." },
                { question: "Why is the iterative term-building method preferred over computing pow() and factorial separately each iteration?", options: ["It gives a different result", "It avoids repeated expensive computations and is more efficient", "pow() does not work inside loops", "Factorial is undefined for large n"], answerIndex: 1, hint: "Calculating a large factorial and exponent from scratch at each step is computationally heavy." },
                { question: "For x = 0 degrees, what should sin(0) return?", options: ["1.000000", "Undefined", "3.141593", "0.000000"], answerIndex: 3, hint: "The sine of 0 is 0." }
              ],
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
              posttest: [
                { question: "What is sin(90°) expected to be?", options: ["0.000000", "0.500000", "1.000000", "3.141593"], answerIndex: 2, hint: "The sine of a right angle (π/2 radians) is 1." },
                { question: "What is sin(0°)?", options: ["1.000000", "0.000000", "-1.000000", "Undefined"], answerIndex: 1, hint: "Sine of 0 is 0." },
                { question: "What happens to accuracy as the number of terms increases?", options: ["Accuracy decreases", "No change", "Accuracy increases toward the true value", "The program crashes"], answerIndex: 2, hint: "More terms in the series approximate the true function more closely." },
                { question: "In the iterative term update, what is multiplied to get the next term from the current term?", options: ["x / (2n+1)", "-x² / ((2n)(2n+1))", "x² * (2n+1)", "-1 / (2n * x)"], answerIndex: 1, hint: "The term changes sign and gains a factor of x²/(k*(k+1))." },
                { question: "For x = 180°, what is sin(180°) approximately?", options: ["1.000000", "-1.000000", "0.000000", "3.141593"], answerIndex: 2, hint: "Sine of π (180°) is 0." }
              ],
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
                  title: "Palindrome Number",
                  body: ["A number is a palindrome if it reads the same forwards and backwards.", "Examples: 121 → 121 (Palindrome), 123 → 321 (Not a Palindrome), 5 → 5 (Palindrome)."]
                },
                {
                  title: "Digit Extraction",
                  body: ["remainder = n % 10 extracts the last digit of n.", "n = n / 10 removes the last digit from n (integer division)."]
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
              pretest: [
                { question: "What does n % 10 return for n = 1234?", options: ["1", "12", "123", "4"], answerIndex: 3, hint: "The modulus operator with 10 gives the remainder, which is the last digit." },
                { question: "What does n / 10 (integer division) return for n = 1234?", options: ["123.4", "4", "123", "12"], answerIndex: 2, hint: "Integer division discards the fractional part, which effectively chops off the last digit." },
                { question: "Is 121 a palindrome?", options: ["No", "Yes", "Only if entered as a string", "Depends on the number of digits"], answerIndex: 1, hint: "It reads the same forwards and backwards." },
                { question: "What is the initial value of reversed before the while loop?", options: ["n", "1", "-1", "0"], answerIndex: 3, hint: "The variable that will hold the reversed number must start at zero to build the number correctly." },
                { question: "Why must the original value of n be saved before the loop?", options: ["Because printf requires it", "Because n is modified (divided by 10) during reversal and must be compared afterward", "Because reversed is also modified", "It does not need to be saved"], answerIndex: 1, hint: "The loop destroys the original number by chopping off digits. You need a copy for the final comparison." }
              ],
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
              posttest: [
                { question: "Is 1001 a palindrome?", options: ["No", "Yes", "Undefined", "Only for even digits"], answerIndex: 1, hint: "1001 reversed is 1001." },
                { question: "What is the reversed number for n = 4567?", options: ["7564", "7654", "4567", "6754"], answerIndex: 1, hint: "Extract digits: 7, then 6, then 5, then 4. Build the number: ( ( (7*10+6)*10+5)*10+4 ) = 7654." },
                { question: "For n = 10, what is the reversed number and is it a palindrome?", options: ["reversed = 10, Yes", "reversed = 1, No", "reversed = 01, Yes", "reversed = 10, No"], answerIndex: 1, hint: "Reversed is 1 (since 01 is just 1). 10 is not the same as 1." },
                { question: "How many iterations does the while loop execute for n = 1234?", options: ["3", "5", "2", "4"], answerIndex: 3, hint: "It will run once for each digit: 4, 3, 2, 1." },
                { question: "What is the output for n = 7?", options: ["7 is not a Palindrome", "7 is a Palindrome", "0", "Undefined"], answerIndex: 1, hint: "A single-digit number is always a palindrome." }
              ],
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
                  title: "Nested Loops",
                  body: ["A loop placed inside another loop is called a nested loop. The outer loop controls the row number and the inner loop(s) control what is printed on each row.", "for (i = 1; i <= n; i++) {\n    for (j = 1; j <= ...; j++) { printf(...); }\n    printf(\"\\n\");\n}"]
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
              pretest: [
                { question: "How many inner loops are typically needed to print a centred number pyramid?", options: ["One — for numbers only", "Two — one for spaces, one for numbers", "Three — for spaces, numbers, and newlines", "None — printf handles it automatically"], answerIndex: 1, hint: "One loop is needed to print the leading spaces to align the pyramid, and another to print the numbers." },
                { question: "For n = 5, how many leading spaces are printed on row 3?", options: ["3", "1", "2", "5"], answerIndex: 2, hint: "The number of spaces decreases as you go down. Row 1 has 4 spaces, Row 2 has 3, Row 3 has 2." },
                { question: "For n = 5, how many numbers are printed on row 4?", options: ["5", "1", "3", "4"], answerIndex: 3, hint: "The first row has 1 number, the second row has 2, the third row has 3, the fourth row has 4." },
                { question: "What does the continue statement do inside a loop?", options: ["Exits the loop entirely", "Skips the rest of the current iteration and moves to the next", "Restarts the loop from the beginning", "Pauses execution"], answerIndex: 1, hint: "It's like a 'skip' button for the current pass." },
                { question: "What printf() call moves output to the next line after each row?", options: ["printf(\" \");", "printf(\"\\t\");", "printf(\"\\n\");", "printf(\"\\\\n\");"], answerIndex: 2, hint: "This prints the newline escape sequence, which moves the cursor to the beginning of the next line." }
              ],
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
              posttest: [
                { question: "For n = 5, how many total numbers are printed across all rows?", options: ["10", "25", "5", "15"], answerIndex: 3, hint: "1+2+3+4+5 = 15" },
                { question: "For n = 4, how many leading spaces are on the first row?", options: ["1", "2", "4", "3"], answerIndex: 3, hint: "It's n - i. For row 1 (i=1), it's 4-1 = 3." },
                { question: "What change to the number loop would print only odd numbers in each row?", options: ["Replace j++ with j += 2 and start at j = 1", "Replace j++ with j--", "Add break when j is even", "Use j % 2 inside printf"], answerIndex: 0, hint: "Using a step of 2 and starting from 1 will produce the sequence 1, 3, 5..." },
                { question: "What is the total number of iterations of the outer loop for n = 6?", options: ["36", "21", "6", "12"], answerIndex: 2, hint: "The outer loop runs once for each row, from i=1 to i=n." },
                { question: "Which loop variable directly determines the count of numbers on each row?", options: ["The space loop counter", "The outer loop variable i, which equals the count of numbers on row i", "A fixed constant", "The newline counter"], answerIndex: 1, hint: "On row i, you need to print i numbers." }
              ],
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
              pretest: [
                { question: "What is the valid index range for an array declared as int arr[10]?", options: ["1 to 10", "0 to 10", "0 to 9", "1 to 9"], answerIndex: 2, hint: "Array indices in C always start at 0." },
                { question: "Why should min and max be initialised to arr[0] rather than 0?", options: ["0 causes a compilation error", "Initialising to 0 fails when all elements are negative", "arr[0] is always the minimum", "The loop starts at index 0"], answerIndex: 1, hint: "If all numbers are negative, 0 would be larger than all of them, making the algorithm fail to find the correct max." },
                { question: "For array {5, 3, 9, 1, 7}, what is the minimum?", options: ["5", "3", "7", "1"], answerIndex: 3, hint: "The smallest number in the list is 1." },
                { question: "For array {5, 3, 9, 1, 7}, what is the maximum?", options: ["7", "5", "9", "3"], answerIndex: 2, hint: "The largest number in the list is 9." },
                { question: "What is the time complexity of finding min and max in a single traversal?", options: ["O(n²)", "O(log n)", "O(1)", "O(n)"], answerIndex: 3, hint: "You need to look at each element in the array once." }
              ],
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
              posttest: [
                { question: "For array {-4, -1, -8, -2}, what is the minimum?", options: ["-1", "-2", "-4", "-8"], answerIndex: 3, hint: "-8 is the smallest (most negative) number." },
                { question: "For array {-4, -1, -8, -2}, what is the maximum?", options: ["-8", "-4", "-2", "-1"], answerIndex: 3, hint: "-1 is the largest (closest to zero) number." },
                { question: "For array {7, 7, 7, 7}, what are min and max?", options: ["min = 0, max = 7", "min = 7, max = 7", "min = 7, max = 0", "Undefined"], answerIndex: 1, hint: "If all numbers are the same, that number is both the minimum and the maximum." },
                { question: "What is the result of accessing arr[n] for an array of size n?", options: ["Returns 0", "Returns the last valid element", "Undefined behaviour", "Compilation error"], answerIndex: 2, hint: "The last valid element is at index n-1. Accessing index n is an out-of-bounds error." },
                { question: "How many comparisons are made in total to find both min and max for an array of 10 elements using the single-pass method?", options: ["10", "20", "18", "9"], answerIndex: 3, hint: "For each of the 9 elements after the first, you perform up to 2 comparisons (one for min, one for max)." }
              ],
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
              pretest: [
                { question: "What is the worst-case time complexity of linear search?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answerIndex: 2, hint: "Think of the worst-case scenario, like searching for an element that isn't there. You have to check every element." },
                { question: "What is the best-case scenario for linear search?", options: ["Target is at the last index", "Array is sorted", "Target is at the first index — one comparison", "Array has no duplicates"], answerIndex: 2, hint: "The best possible outcome is finding what you're looking for right away." },
                { question: "What value is pos conventionally set to before searching, to indicate \"not found\"?", options: ["0", "n", "-1", "999"], answerIndex: 2, hint: "-1 is an invalid index, so it's a perfect sentinel value for 'not found'." },
                { question: "What does break do when the target is found inside the search loop?", options: ["Skips the current element", "Exits the loop immediately to avoid further comparisons", "Restarts the search from index 0", "Sets found = 0"], answerIndex: 1, hint: "Once you've found the target, you don't need to waste time looking at the rest of the array." },
                { question: "Does linear search require the array to be sorted?", options: ["Yes, always", "Only for even-sized arrays", "No — it works on unsorted arrays", "Only for integer arrays"], answerIndex: 2, hint: "Linear search is based purely on checking each element sequentially; it doesn't depend on any pre-existing order." }
              ],
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
              posttest: [
                { question: "For array {10, 30, 20, 50, 40} and key = 50, at which 0-based index is it found?", options: ["3", "4", "2", "1"], answerIndex: 0, hint: "The search starts at index 0 (value 10), then index 1 (30), index 2 (20), index 3 (50)." },
                { question: "For array {10, 30, 20, 50, 40} and key = 99, what is the output?", options: ["Found at index 0", "Found at index -1", "Element not found", "Compilation error"], answerIndex: 2, hint: "The search will run through the entire array and, not finding 99, will output accordingly." },
                { question: "How many comparisons are made for key = 10 in array {10, 30, 20, 50, 40}?", options: ["5", "3", "2", "1"], answerIndex: 3, hint: "The key is found at the first index, so only one comparison is made." },
                { question: "How many comparisons are made for key = 99 in array {10, 30, 20, 50, 40}?", options: ["1", "3", "5", "0"], answerIndex: 2, hint: "The key is not found, so the search must check all 5 elements." },
                { question: "What modification allows linear search to find and print ALL occurrences of a key rather than just the first?", options: ["Replace == with !=", "Remove break so the loop continues after a match", "Sort the array first", "Use a while loop instead of for"], answerIndex: 1, hint: "The break statement exits the loop after the first match. To find more, you need to keep searching." }
              ],
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
              pretest: [
                { question: "For array {1, 2, 3, 4, 5}, what is the reversed array?", options: ["{5, 4, 3, 2, 1}", "{1, 2, 3, 4, 5}", "{2, 4, 1, 3, 5}", "{5, 3, 1, 4, 2}"], answerIndex: 0, hint: "The order of the elements is completely flipped." },
                { question: "How many swaps are needed to reverse an array of 7 elements?", options: ["7", "4", "6", "3"], answerIndex: 3, hint: "Each swap places two elements in their correct final positions. For 7 elements, you need floor(7/2) = 3 swaps." },
                { question: "What is the purpose of the temp variable during a swap?", options: ["To count the number of swaps", "To temporarily hold one value so it is not overwritten", "To store the reversed array", "To compare two elements"], answerIndex: 1, hint: "When you set arr[left] = arr[right], you lose the original value at arr[left]. `temp` saves it." },
                { question: "What are the initial values of left and right for an array of size n?", options: ["left = 1, right = n", "left = 0, right = n", "left = 0, right = n - 1", "left = 1, right = n - 1"], answerIndex: 2, hint: "Indices start at 0, so the last element is at index n-1." },
                { question: "What is the space complexity of the in-place two-pointer reversal?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answerIndex: 3, hint: "It uses a fixed number of extra variables (e.g., left, right, temp), regardless of the input size." }
              ],
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
              posttest: [
                { question: "For array {10, 20, 30, 40}, what is the reversed array?", options: ["{10, 30, 20, 40}", "{40, 20, 30, 10}", "{40, 30, 20, 10}", "{20, 10, 40, 30}"], answerIndex: 2, hint: "The process swaps (10,40) then (20,30)." },
                { question: "For array {7}, what is the reversed array?", options: ["{}", "{0}", "{7}", "Undefined"], answerIndex: 2, hint: "An array with a single element reversed is itself." },
                { question: "After how many swaps does the while loop terminate for n = 6?", options: ["6", "2", "4", "3"], answerIndex: 3, hint: "floor(6/2) = 3 swaps are needed." },
                { question: "At the start of swap 2 for array {1, 2, 3, 4, 5}, what are left and right?", options: ["left = 0, right = 4", "left = 2, right = 3", "left = 1, right = 3", "left = 2, right = 2"], answerIndex: 2, hint: "After the first swap (1,5), left is incremented to 1, and right is decremented to 3." },
                { question: "What is the result of reversing an already-reversed array {5, 4, 3, 2, 1}?", options: ["{5, 4, 3, 2, 1}", "{1, 1, 1, 1, 1}", "{1, 2, 3, 4, 5}", "Undefined"], answerIndex: 2, hint: "Reversing an array twice should return it to its original order." }
              ],
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
              pretest: [
                { question: "For array {1, 3, 2, 3, 1, 5}, what is the deduplicated array?", options: ["{1, 2, 3, 5}", "{1, 3, 2, 5}", "{3, 1, 5, 2}", "{5, 3, 2, 1}"], answerIndex: 1, hint: "Keep the first occurrence of each number. The order is 1, then 3, then 2, then 5." },
                { question: "What does the flag isDuplicate = 1 signal?", options: ["The element should be kept", "The element has already appeared earlier in the array", "The element is negative", "The inner loop should restart"], answerIndex: 1, hint: "It's a marker to indicate that the current element should be skipped." },
                { question: "For array {5, 5, 5, 5}, what is the deduplicated array and new size?", options: ["{5, 5}, size 2", "{}, size 0", "{5}, size 1", "{5, 5, 5, 5}, size 4"], answerIndex: 2, hint: "All elements are duplicates, so only the first one is kept." },
                { question: "What is the time complexity of the nested loop duplicate removal?", options: ["O(1)", "O(n log n)", "O(n²)", "O(n)"], answerIndex: 2, hint: "For each of the n elements, you may check up to all of the preceding n-1 elements." },
                { question: "Which occurrence of a duplicate value is retained in this algorithm?", options: ["The last occurrence", "The middle occurrence", "A random occurrence", "The first occurrence"], answerIndex: 3, hint: "The inner loop checks for a match with *earlier* elements. If it finds one, the current one is a duplicate." }
              ],
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
              posttest:[
                { question: "For array {4, 4, 4, 4, 4}, what is the output?", options: ["Unique: 4 4  New size: 2", "Unique: 4  New size: 1", "Unique:    New size: 0", "Unique: 4 4 4 4 4  New size: 5"], answerIndex: 1, hint: "Only the first 4 is unique; all others are duplicates." },
                { question: "For array {1, 2, 3, 4, 5}, what is the output?", options: ["Unique: 1 2 3  New size: 3", "Unique: 5 4 3 2 1  New size: 5", "Unique: 1 2 3 4 5  New size: 5", "Unique: 1 3 5  New size: 3"], answerIndex: 2, hint: "There are no duplicates, so the unique array is the same as the original." },
                { question: "For array {7, 3, 7, 3, 7}, what is the deduplicated array?", options: ["{3, 7}", "{7}", "{7, 3}", "{3}"], answerIndex: 2, hint: "The first occurrence is 7, then the next unique is 3." },
                { question: "At which step does the inner loop first break early for array {1, 3, 2, 3, 1, 5}?", options: ["i = 1 (checking 3)", "i = 2 (checking 2)", "i = 3 (checking second 3)", "i = 5 (checking 5)"], answerIndex: 2, hint: "When i=3 (value is 3), the inner loop compares with previous elements and finds a match at index 1, so it breaks." },
                { question: "What modification would make the algorithm retain the LAST occurrence instead of the first?", options: ["Sort the array before processing", "Traverse the array from right to left (i from n-1 to 0)", "Use >= instead of ==", "Remove the break inside the inner loop"], answerIndex: 1, hint: "If you process from the end, the 'first' occurrence you encounter will be the last one in the original array." }
              ],
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
              pretest: [
                { question: "How is element at row 2, column 3 of a 2D array A accessed in C?", options: ["A[3][2]", "A[2, 3]", "A[2][3]", "A(2)(3)"], answerIndex: 2, hint: "C uses two separate sets of square brackets: one for row, one for column." },
                { question: "What is the condition for two matrices to be added?", options: ["They must be square", "They must have the same number of rows only", "They must have identical dimensions (same rows and columns)", "They must contain only positive integers"], answerIndex: 2, hint: "Matrix addition is defined element-wise. For C[i][j] = A[i][j] + B[i][j], both A and B need to have a cell at [i][j]." },
                { question: "For A = {{1,2},{3,4}} and B = {{5,6},{7,8}}, what is C[1][0]?", options: ["8", "12", "10", "6"], answerIndex: 2, hint: "C[1][0] is the sum of the element at row 1, column 0: A[1][0] + B[1][0] = 3 + 7 = 10." },
                { question: "In what order does C store elements of a 2D array in memory?", options: ["Column-major order", "Diagonal order", "Random order", "Row-major order"], answerIndex: 3, hint: "All elements of the first row are stored consecutively, then the second row, and so on." },
                { question: "What is the time complexity of adding two m × n matrices?", options: ["O(m + n)", "O(m²)", "O(m × n)", "O(n²)"], answerIndex: 2, hint: "You need to perform one addition for each of the m*n elements." }
              ],
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
              posttest:[
                { question: "For A = {{1,0},{0,1}} and B = {{4,5},{6,7}}, what is C?", options: ["{{5,5},{6,8}}", "{{4,0},{0,7}}", "{{5,6},{7,8}}", "{{5,5},{6,8}}"], answerIndex: 0, hint: "C[0][0]=1+4=5, C[0][1]=0+5=5, C[1][0]=0+6=6, C[1][1]=1+7=8." },
                { question: "Can you add a 2×3 matrix to a 3×2 matrix?", options: ["Yes, element-wise", "Yes, after transposing one", "No — dimensions do not match", "Yes, by padding with zeros"], answerIndex: 2, hint: "For addition, the matrices must have the exact same dimensions (rows and columns)." },
                { question: "What does %4d do in printf when printing a matrix?", options: ["Prints only 4-digit numbers", "Prints the number right-aligned in a 4-character wide field", "Limits the number to 4 bits", "Adds 4 to the number before printing"], answerIndex: 1, hint: "This is a field width specifier. It helps format the output into neat columns." },
                { question: "For a 3×3 matrix, how many iterations does the nested loop execute in total?", options: ["6", "3", "27", "9"], answerIndex: 3, hint: "The outer loop runs 3 times, and for each of those, the inner loop runs 3 times. 3 * 3 = 9." },
                { question: "What is the result of adding a matrix A to a zero matrix of the same size?", options: ["A zero matrix", "A doubled", "A itself", "Undefined"], answerIndex: 2, hint: "Adding zero to any number gives the number itself." }
              ],
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
              pretest: [
                { question: "What is the required condition for multiplying matrix A (m×p) by matrix B (r×n)?", options: ["m == n", "p == r", "m == r", "p == n"], answerIndex: 1, hint: "The number of columns in the first matrix must equal the number of rows in the second matrix." },
                { question: "For A of size 2×3 and B of size 3×4, what is the size of C = A × B?", options: ["3×3", "2×4", "4×2", "3×2"], answerIndex: 1, hint: "The result's dimensions are taken from the rows of the first matrix (m) and the columns of the second (n)." },
                { question: "Why must C[i][j] be initialised to 0 before the innermost loop?", options: ["To avoid a compilation warning", "To ensure accumulation starts from zero, not from garbage memory", "Because += only works when the variable is 0", "It does not need to be initialised"], answerIndex: 1, hint: "The line C[i][j] += ... will add a product to whatever is already in C[i][j]. If it starts with garbage, the result will be garbage." },
                { question: "What is the time complexity of multiplying two n × n matrices using the standard three-loop algorithm?", options: ["O(n)", "O(n²)", "O(n³)", "O(2ⁿ)"], answerIndex: 2, hint: "There are three nested loops, each of which runs n times." },
                { question: "For A = {{1,2},{3,4}} and B = {{5,6},{7,8}}, what is C[0][0]?", options: ["12", "17", "19", "22"], answerIndex: 2, hint: "C[0][0] = (1*5) + (2*7) = 5 + 14 = 19." }
              ],
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
              posttest:[
                { question: "For A = {{1,2},{3,4}} and B = {{5,6},{7,8}}, what is C[1][1]?", options: ["44", "46", "48", "50"], answerIndex: 3, hint: "C[1][1] = (3*6) + (4*8) = 18 + 32 = 50." },
                { question: "What is the result of multiplying any matrix A by the identity matrix I of compatible size?", options: ["A zero matrix", "The transpose of A", "A itself", "Undefined"], answerIndex: 2, hint: "The identity matrix is the multiplicative identity, like 1 for numbers." },
                { question: "Is matrix multiplication commutative? (Does A×B always equal B×A?)", options: ["Yes always", "No — in general A×B ≠ B×A", "Yes for square matrices only", "Yes if all elements are positive"], answerIndex: 1, hint: "The order of multiplication matters greatly. The resulting dimensions can even be different." },
                { question: "For A of size 3×2 and B of size 2×4, how many multiplications does the innermost loop perform in total?", options: ["8", "24", "12", "6"], answerIndex: 1, hint: "The result is 3×4. For each of these 12 result elements, the inner loop performs 2 multiplications. 12 * 2 = 24." },
                { question: "What is the size of the result when a 1×n matrix is multiplied by an n×1 matrix?", options: ["n×n", "1×n", "n×1", "1×1"], answerIndex: 3, hint: "The result takes the outer dimensions: rows of first (1) and columns of second (1). This is a dot product." }
              ],
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
              pretest: [
                { question: "What is the worst-case time complexity of Bubble Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"], answerIndex: 2, hint: "This occurs when the array is in reverse order, requiring the maximum number of swaps and passes." },
                { question: "After the first complete pass over array {5, 3, 1, 4, 2}, which element is guaranteed to be in its final position?", options: ["1", "3", "2", "5"], answerIndex: 3, hint: "The largest element 'bubbles up' to the very end of the array after the first pass." },
                { question: "Why does the inner loop run up to n-1-i in pass i?", options: ["To avoid accessing negative indices", "Because the last i elements are already sorted and need not be re-checked", "Because the first i elements are unsorted", "To reduce the swap count"], answerIndex: 1, hint: "After each pass, the largest unsorted element is placed at the end. Those elements are already in their correct spots." },
                { question: "What does the swapped flag enable?", options: ["Counting total swaps", "Printing swapped pairs", "Early termination when the array is already sorted", "Detecting duplicate elements"], answerIndex: 2, hint: "If a pass occurs with no swaps, the array is sorted, and the algorithm can stop early." },
                { question: "Is Bubble Sort a stable sorting algorithm?", options: ["No — equal elements are always swapped", "Yes — equal elements retain their relative order because only > triggers a swap", "Only for integer arrays", "Only when the optimisation flag is used"], answerIndex: 1, hint: "A stable sort keeps items with equal keys in the same relative order as they originally appeared." }
              ],
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
              posttest: [
                { question: "How many passes does Bubble Sort require in the worst case for n elements?", options: ["1", "n", "n-1", "n/2"], answerIndex: 2, hint: "In the worst case (reverse sorted), you need to make one pass for each element except the last, which ends up in its place automatically." },
                { question: "For array {1, 2, 3, 4, 5} (already sorted), how many passes does the optimised Bubble Sort perform?", options: ["4", "0", "1", "5"], answerIndex: 2, hint: "The first pass will make no swaps, causing the swapped flag to remain false, and the algorithm will terminate." },
                { question: "For array {4, 3, 2, 1}, how many swaps occur in the first pass?", options: ["1", "2", "4", "3"], answerIndex: 3, hint: "The swaps are (4,3), (4,2), and (4,1). The largest element, 4, moves to the end." },
                { question: "What is the space complexity of Bubble Sort?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answerIndex: 3, hint: "It sorts the array in-place, using only a few extra variables (temp, swapped)." },
                { question: "After 2 complete passes over array {5, 3, 1, 4, 2}, which elements are guaranteed in their final positions?", options: ["5 and 4", "1 and 2", "3 and 5", "4 and 2"], answerIndex: 0, hint: "After pass 1: 5 is at the end. After pass 2: the next largest, 4, is in its correct spot just before 5." }
              ],
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
              pretest: [
                { question: "How many passes does Bubble Sort require in the worst case for n elements?", options: ["1", "n", "n-1", "n/2"], answerIndex: 2, hint: "In the worst case (reverse sorted), you need to make one pass for each element except the last, which ends up in its place automatically." },
                { question: "For array {1, 2, 3, 4, 5} (already sorted), how many passes does the optimised Bubble Sort perform?", options: ["4", "0", "1", "5"], answerIndex: 2, hint: "The first pass will make no swaps, causing the swapped flag to remain false, and the algorithm will terminate." },
                { question: "For array {4, 3, 2, 1}, how many swaps occur in the first pass?", options: ["1", "2", "4", "3"], answerIndex: 3, hint: "The swaps are (4,3), (4,2), and (4,1). The largest element, 4, moves to the end." },
                { question: "What is the space complexity of Bubble Sort?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answerIndex: 3, hint: "It sorts the array in-place, using only a few extra variables (temp, swapped)." },
                { question: "After 2 complete passes over array {5, 3, 1, 4, 2}, which elements are guaranteed in their final positions?", options: ["5 and 4", "1 and 2", "3 and 5", "4 and 2"], answerIndex: 0, hint: "After pass 1: 5 is at the end. After pass 2: the next largest, 4, is in its correct spot just before 5." }
              ],
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
              posttest: [
                { question: "For s1 = \"abc\" and s2 = \"def\", what is the result of concatenation?", options: ["\"abcdef\"", "\"defabc\"", "\"abc def\"", "\"abc\\0def\""], answerIndex: 0, hint: "The contents of s2 are placed directly after the contents of s1." },
                { question: "What index does appending s2 start at in s1?", options: ["0", "strlen(s2)", "strlen(s1)", "strlen(s1) + strlen(s2)"], answerIndex: 2, hint: "You need to find the position of the null terminator in s1." },
                { question: "What is the length of \"abcdef\" after concatenating \"abc\" and \"def\"?", options: ["3", "8", "7", "6"], answerIndex: 3, hint: "strlen('abc') is 3, strlen('def') is 3. 3+3 = 6." },
                { question: "What happens if s1 is not large enough to hold the concatenated result?", options: ["strcat automatically resizes the array", "The program prints an error", "Buffer overflow — undefined behaviour", "The extra characters are silently discarded"], answerIndex: 2, hint: "C does not check array boundaries. You will overwrite memory, potentially crashing the program." },
                { question: "Which standard library function performs string concatenation automatically?", options: ["strcpy()", "strcmp()", "strcat()", "strlen()"], answerIndex: 2, hint: "The name is a mnemonic for 'string concatenate'." }
              ],
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
              pretest: [
                { question: "What is the reverse of the string \"hello\"?", options: ["\"hello\"", "\"lelho\"", "\"olleh\"", "\"hlleo\""], answerIndex: 2, hint: "Write the string backwards: o, l, l, e, h." },
                { question: "For str = \"hello\" (length 5), what is the initial value of right in the two-pointer method?", options: ["5", "4", "3", "0"], answerIndex: 1, hint: "The last character is at index len-1." },
                { question: "Why is right set to strlen(str) - 1 rather than strlen(str)?", options: ["strlen counts from 1", "To avoid swapping the null terminator", "strlen includes the null terminator in its count", "right must always be even"], answerIndex: 1, hint: "The null terminator at index len must remain at the end of the reversed string." },
                { question: "How many swaps are needed to reverse \"program\" (length 7)?", options: ["7", "4", "6", "3"], answerIndex: 3, hint: "Each swap exchanges two characters. floor(len/2) = floor(7/2) = 3." },
                { question: "Is \"madam\" a palindrome?", options: ["No", "Yes", "Only when lowercase", "Depends on the compiler"], answerIndex: 1, hint: "It reads the same forwards and backwards." }
              ],
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
              posttest: [
                { question: "What is the reverse of \"abcde\"?", options: ["\"abcde\"", "\"edabc\"", "\"edcba\"", "\"aedcb\""], answerIndex: 2, hint: "Swap 'a' with 'e', then 'b' with 'd'." },
                { question: "What is the reverse of a single character \"z\"?", options: ["\"\"", "\"zz\"", "\"z\"", "Undefined"], answerIndex: 2, hint: "Reversing a single element leaves it unchanged." },
                { question: "For str = \"abcd\", what are the characters swapped in the second swap?", options: ["a and d", "b and c", "a and c", "b and d"], answerIndex: 1, hint: "First swap: left=0 ('a'), right=3 ('d') -> 'dbca'. Then left=1, right=2: swap 'b' and 'c'." },
                { question: "After reversing \"Hello\", is the null terminator still at the correct position?", options: ["No — it gets swapped to index 0", "No — it is lost", "Yes — strlen-1 ensures '\\0' at index len is never swapped", "Yes, but only if len is even"], answerIndex: 2, hint: "The null terminator is at index 5. The loop only runs while left < right, so when left=2, right=2, it stops, and index 5 is untouched." },
                { question: "Which modification to the reversal algorithm also checks if the result is a palindrome?", options: ["Print str before and after reversal and compare them visually", "Save a copy of str before reversal, reverse str in-place, then compare the copy with the reversed str using strcmp()", "Check if left == right after the loop", "Count the number of swaps; if 0, it is a palindrome"], answerIndex: 1, hint: "A palindrome is a string that is equal to its reverse." }
              ],
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
              pretest: [
                { question: "Which header file must be included to use malloc() and free()?", options: ["stdio.h", "string.h", "stdlib.h", "malloc.h"], answerIndex: 2, hint: "This header stands for 'Standard Library' and contains functions for memory management." },
                { question: "What does malloc() return if memory allocation fails?", options: ["0", "-1", "NULL", "A garbage pointer"], answerIndex: 2, hint: "It's a standard macro that represents a pointer that doesn't point to any valid memory." },
                { question: "How many bytes does malloc(n * sizeof(int)) allocate for n = 5 on a system where sizeof(int) = 4?", options: ["5", "4", "10", "20"], answerIndex: 3, hint: "sizeof(int) gives the number of bytes needed for one integer." },
                { question: "What is the content of memory allocated by malloc()?", options: ["All zeros", "All ones", "Uninitialised — contains garbage values", "The address of the next free block"], answerIndex: 2, hint: "malloc() gives you a raw block of memory. It does not clean or prepare it." },
                { question: "What happens if free() is never called after malloc()?", options: ["The program crashes immediately", "Memory is automatically freed when each variable goes out of scope", "The allocated block remains reserved until the program exits — memory leak", "The OS reclaims memory after each malloc() call"], answerIndex: 2, hint: "Your program will slowly consume more and more RAM until the system runs out." }
              ],
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
              posttest:[
                { question: "For input {5, 10, 20, 30, 40, 50}, what is the average?", options: ["25.00", "150.00", "30.00", "50.00"], answerIndex: 2, hint: "Average = Sum of elements / No.of elements " },
                { question: "What is a dangling pointer?", options: ["A pointer that has never been initialised", "A pointer that still holds the address of memory that has been freed", "A pointer to a NULL value", "A pointer declared inside a function"], answerIndex: 1, hint: "It's a pointer that points to memory that is no longer valid or safe to use." },
                { question: "Which of the following correctly allocates memory for 10 floats?", options: ["float *p = malloc(10);", "float *p = malloc(10 * sizeof(float));", "float *p = malloc(sizeof(10));", "float *p = calloc(sizeof(float));"], answerIndex: 1, hint: "You must request enough bytes for 10 elements, each of which is the size of a float." },
                { question: "After calling free(arr), what should be done immediately to avoid a dangling pointer?", options: ["Reallocate arr with the same size", "Call malloc() again", "Set arr = NULL", "Decrement arr by 1"], answerIndex: 2, hint: "This ensures the pointer is now explicitly pointing to a safe, known value (NULL)." },
                { question: "What is the difference between arr[i] and *(arr + i)?", options: ["arr[i] is faster", "*(arr + i) only works for dynamic arrays", "They are exactly equivalent in C", "arr[i] only works for static arrays"], answerIndex: 2, hint: "The [] operator is just syntactic sugar for pointer arithmetic." }
              ],
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
              pretest: [
                { question: "How is a struct field accessed through a pointer ptr in C?", options: ["ptr.field", "*ptr.field", "ptr->field", "&ptr.field"], answerIndex: 2, hint: "This operator is specifically designed for accessing members of a struct through a pointer." },
                { question: "Which function allocates memory for an array of structures at runtime?", options: ["sizeof()", "calloc() or malloc()", "struct()", "alloc()"], answerIndex: 1, hint: "These are the standard C library functions for dynamic memory allocation." },
                { question: "For a struct of size 60 bytes, how many bytes does malloc(5 * sizeof(struct Student)) allocate?", options: ["5", "60", "65", "300"], answerIndex: 3, hint: "You need space for 5 'Student' objects." },
                { question: "What is the correct order to free nested dynamic memory (struct array with inner dynamic marks arrays)?", options: ["Free the outer array first, then inner arrays", "Free inner arrays first, then the outer array", "Free them simultaneously", "Only the outer array needs to be freed"], answerIndex: 1, hint: "If you free the outer array first, you lose the pointers to the inner arrays and can no longer free them, causing a memory leak." },
                { question: "What is the difference between the dot (.) and arrow (->) operators?", options: [". is for pointers; -> is for variables", ". accesses fields of a struct variable; -> accesses fields through a pointer", "They are interchangeable in all contexts", "-> only works with malloc-allocated structs"], answerIndex: 1, hint: "They are two different syntaxes for the same fundamental operation: field access." }
              ],
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
              posttest: [
                { question: "For marks {80, 90, 85} across 3 subjects, what is the average?", options: ["80.00", "83.00", "85.00", "90.00"], answerIndex: 2, hint: "255 / 3 = 85" },
                { question: "For marks {70, 60, 75} across 3 subjects, what is the average?", options: ["70.00", "65.00", "68.33", "75.00"], answerIndex: 2, hint: "205 / 3 = 68.33" },
                { question: "What does sizeof(struct Student) return if the struct contains char name[50], int marks[5], and float average?", options: ["56", "70", "74", "60"], answerIndex: 2, hint: "50 bytes + (5 * 4 bytes) + 4 bytes = 74 bytes. The compiler might add padding for alignment, making it larger than the raw sum." },
                { question: "What happens if inner marks arrays are not freed before freeing the outer students array?", options: ["The program crashes immediately", "The inner pointers are lost, causing a memory leak", "The OS automatically frees them", "free() handles nested allocation automatically"], answerIndex: 1, hint: "free() only deallocates the memory block it is specifically pointed to. It does not recursively free other blocks." },
                { question: "Which operator is used to access struct fields when iterating with a pointer students[i]?", options: ["->", ".", "*", "&"], answerIndex: 1, hint: "students[i] is a struct variable, not a pointer to one." }
              ],
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
              pretest: [
                { question: "What is the key difference between malloc() and calloc()?", options: ["malloc() is faster and always preferred", "calloc() takes two arguments and zero-initialises memory; malloc() does not", "calloc() only works for structures", "malloc() zero-initialises; calloc() does not"], answerIndex: 1, hint: "calloc() not only allocates but also sets all bits in the allocated memory to 0." },
                { question: "Which calloc() call correctly allocates memory for 8 integers?", options: ["calloc(8);", "calloc(sizeof(int), sizeof(int));", "calloc(8, sizeof(int));", "calloc(8 * sizeof(int));"], answerIndex: 2, hint: "The first argument is the number of elements, the second is the size of each element." },
                { question: "What does realloc(ptr, 0) do?", options: ["Doubles the allocation", "Allocates a fresh block of default size", "Has no effect", "Frees the memory pointed to by ptr"], answerIndex: 3, hint: "This is a standard, portable way to free memory in C." },
                { question: "For n = 5 students with marks {55, 32, 48, 27, 61} and pass mark 40, how many students failed?", options: ["1", "3", "2", "4"], answerIndex: 2, hint: "The marks below 40 are 32 and 27." },
                { question: "Why should realloc's return value be assigned to a temporary pointer rather than directly back to the original?", options: ["realloc always returns a different address", "If realloc returns NULL, the original pointer is not lost", "The original pointer is automatically freed by realloc", "Temporary pointers are faster to dereference"], answerIndex: 1, hint: "If realloc fails, it returns NULL. If you assign this NULL to your original pointer, you lose access to the original block of memory." }
              ],
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
              posttest: [
                { question: "For marks {40, 39, 40, 41, 38} with pass mark 40, how many students failed?", options: ["1", "3", "4", "2"], answerIndex: 3, hint: "A student fails if they score *less* than the passing mark." },
                { question: "What is the initial value of every element in a calloc-allocated array before any data is entered?", options: ["-1", "Garbage", "1", "0"], answerIndex: 3, hint: "This is the primary feature of calloc()." },
                { question: "For marks {55, 32, 48, 27, 61}, which roll numbers failed (1-based index)?", options: ["Roll 1 and Roll 3", "Roll 2 and Roll 4", "Roll 3 and Roll 5", "Roll 1 and Roll 5"], answerIndex: 1, hint: "The marks at index 1 (2nd student) is 32, at index 3 (4th student) is 27." },
                { question: "Which sequence of operations correctly resizes a calloc array from n to 2n elements safely?", options: ["free(ptr); ptr = calloc(2*n, sizeof(int));", "ptr = realloc(ptr, 2*n * sizeof(int));", "int *tmp = realloc(ptr, 2*n * sizeof(int));\n   if (tmp != NULL) ptr = tmp;", "ptr = malloc(2*n * sizeof(int));"], answerIndex: 2, hint: "This pattern uses a temporary pointer to check for a realloc failure before giving up the original memory." },
                { question: "What is printed for n = 3 with all marks above pass mark?", options: ["Failed Students: (none listed)  Total failed: 0", "Failed Students: all three  Total failed: 3", "Segmentation fault", "Total failed: -1"], answerIndex: 0, hint: "The loop that prints failed students will have nothing to print, and failCount will remain 0." }
              ],
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
                  title: "Visual Structure for input 3 nodes: 10 20 30",
                  body: ["10 -> 20 -> 30 -> NULL", "Each arrow represents the next pointer storing the address of the following node."]
                },
                {
                  title: "Why Linked List over Array?",
                  body: ["Arrays have fixed size decided at compile time. Linked lists grow and shrink dynamically at runtime. Insertion and deletion are efficient in linked lists without shifting elements."]
                }
              ],
              pretest: [
                { question: "What is a self-referential structure in C?", options: ["A structure that calls itself like a function", "A structure that contains a pointer to its own type", "A structure inside another structure", "A structure with recursive fields"], answerIndex: 1, hint: "It's the fundamental building block of linked lists, where one node 'refers to' or 'points to' the next node of the same type." },
                { question: "Which function is used to dynamically allocate memory for a node?", options: ["alloc()", "new()", "malloc()", "create()"], answerIndex: 2, hint: "This standard C library function is used to request memory from the heap." },
                { question: "What does the next pointer of the last node in a singly linked list contain?", options: ["Address of the first node", "Garbage value", "-1", "NULL"], answerIndex: 3, hint: "This special pointer value indicates the end of the list." },
                { question: "What does the head pointer represent in a linked list?", options: ["The middle node", "The last node", "The first node", "The size of the list"], answerIndex: 2, hint: "It's the entry point; the variable you keep to know where the list starts." },
                { question: "What is the time complexity of traversing a singly linked list of n nodes?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answerIndex: 2, hint: "In the worst case, to reach the last node, you may have to start from the head and follow 'n' pointers." }
              ],
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
              posttest: [
                { question: "What will be the output if input is n=4 and values are 5 15 25 35?", options: ["5-15-25-35-NULL", "5->15->25->35->NULL", "35->25->15->5->NULL", "5 15 25 35"], answerIndex: 1, hint: "The format is data value, then '->', repeated, ending with 'NULL'." },
                { question: "What happens to the memory allocated by malloc() if free() is never called?", options: ["It is automatically returned to OS when program ends on all systems", "It causes a memory leak", "The compiler frees it during compilation", "It gets reused automatically"], answerIndex: 1, hint: "The OS may reclaim it when the program terminates, but for long-running programs, this is a serious problem." },
                { question: "In a singly linked list, which direction can you traverse?", options: ["Both forward and backward", "Only backward", "Only forward from head to NULL", "Random access like arrays"], answerIndex: 2, hint: "Each node only has a pointer to the next one, not the previous one." },
                { question: "What is the value of head after inserting the very first node?", options: ["NULL", "Address of the new node", "Address of tail", "0"], answerIndex: 1, hint: "The head pointer should now point to the first and only node in the list." },
                { question: "If you want to insert a node at the beginning instead of end, which pointer needs to change?", options: ["tail->next", "head", "cur", "NULL pointer"], answerIndex: 1, hint: "The new node becomes the first node, so 'head' must be updated to point to it." }
              ],
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
              pretest:[
                { question: "What is the size of a union containing int (4 bytes), float (4 bytes), and char (1 byte)?", options: ["9 bytes", "1 byte", "4 bytes", "12 bytes"], answerIndex: 2, hint: "The union's size is determined by its largest member." },
                { question: "In a union, what happens when you write a value to one member and then read another member?", options: ["Both members hold correct values", "The other member gives undefined or overwritten value", "The program crashes", "Compiler gives error"], answerIndex: 1, hint: "All members of a union occupy the same memory location. Writing to one overwrites the data of the others." },
                { question: "Which operator is used to find the memory size of a structure or union?", options: ["length()", "size()", "sizeof()", "memsize()"], answerIndex: 2, hint: "It's a compile-time unary operator." },
                { question: "Why does a structure sometimes have a larger size than the sum of its members?", options: ["Extra security bytes added", "Compiler adds padding for memory alignment", "Member names take extra space", "typedef adds overhead"], answerIndex: 1, hint: "The CPU can access data more efficiently when it's aligned to specific memory boundaries." },
                { question: "Which of the following is a correct use case for a union?", options: ["Storing student name, roll number, and marks together", "Storing either an int or float value at a time to save memory", "Creating a linked list node", "Storing multiple strings"], answerIndex: 1, hint: "Use a union when you need to represent a value that can be of different types, but only one at a time." }
              ],
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
              posttest:[
                { question: "On a system where int=4, float=4, char=1, what is the minimum possible size of a union containing all three?", options: ["9 bytes", "1 byte", "4 bytes", "Depends on compiler"], answerIndex: 2, hint: "The largest member's size dominates the union's size." },
                { question: "If you assign 65 to the int member of a union and then read the char member, what do you most likely get?", options: ["0", "Compiler error", "'A' (ASCII 65)", "Garbage always"], answerIndex: 2, hint: "The integer 65 is stored as the byte 0x41, which is the ASCII code for 'A'." },
                { question: "What is padding in a structure?", options: ["Extra fields added by programmer", "Empty bytes added by compiler for alignment", "Security bits added by OS", "Null terminators between members"], answerIndex: 1, hint: "It's an invisible overhead added by the compiler, not by the programmer." },
                { question: "Can a structure and union have the same member names?", options: ["No, names must be globally unique", "Yes, member names are scoped to their type", "Only if they are in different files", "Only for primitive types"], answerIndex: 1, hint: "The struct and union define their own separate namespaces for their members." },
                { question: "Which of the following statements is TRUE about unions?", options: ["All members can be used simultaneously", "Union size equals sum of all members", "Only the most recently written member holds a valid value", "Unions cannot contain float members"], answerIndex: 2, hint: "This is the defining characteristic of a union." }
              ],
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
              pretest: [
                { question: "What does call by value mean in C?", options: ["The function receives the address of the variable", "The function receives a copy of the variable's value", "The caller's variable is modified by the function", "Values are passed through global variables"], answerIndex: 1, hint: "The function works on a local copy, leaving the original data in the caller untouched." },
                { question: "What is 5C2?", options: ["20", "10", "5", "120"], answerIndex: 1, hint: "5C2 = 5! / (2! * 3!) = 120 / (2 * 6) = 10." },
                { question: "What is the formula for nCr?", options: ["n! / r!", "n! / (r! * (n+r)!)", "n! / (r! * (n-r)!)", "(n-r)! / (n! * r!)"], answerIndex: 2, hint: "It's the binomial coefficient formula." },
                { question: "What is the scope of a variable declared inside a function?", options: ["Global — accessible everywhere in the program", "Local — accessible only within that function", "Accessible in all functions called after it", "Accessible in main() only"], answerIndex: 1, hint: "Its lifetime begins when the function is called and ends when it returns." },
                { question: "What is 0!?", options: ["0", "Undefined", "-1", "1"], answerIndex: 3, hint: "It's a mathematical convention." }
              ],
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
              posttest: [
                { question: "What is 10C3?", options: ["100", "720", "120", "210"], answerIndex: 2, hint: "10! / (3! * 7!) = 3628800 / (6 * 5040) = 3628800 / 30240 = 120." },
                { question: "What is nC0 for any non-negative n?", options: ["n", "0", "n!", "1"], answerIndex: 3, hint: "There is exactly one way to choose zero items from a set of n items." },
                { question: "What is nCn for any non-negative n?", options: ["0", "n", "1", "n!"], answerIndex: 2, hint: "There is exactly one way to choose all n items from a set of n items." },
                { question: "If a function modifies its local copy of parameter x, what happens to the original variable passed by the caller?", options: ["It is also modified", "It is set to 0", "It is unchanged", "It is incremented by 1"], answerIndex: 2, hint: "This is the essence of 'call by value'." },
                { question: "What is 6C4?", options: ["30", "20", "360", "15"], answerIndex: 3, hint: "6C2 = 6C4 = 15." }
              ],
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
              pretest: [
                { question: "What is the length of the string \"Hello\"?", options: ["6", "4", "5", "0"], answerIndex: 2, hint: "Count the characters: H, e, l, l, o." },
                { question: "What character marks the end of a C string?", options: ["'.'", "' '", "'\\n'", "'\\0'"], answerIndex: 3, hint: "It's a null character." },
                { question: "What is the length of an empty string \"\"?", options: ["1", "-1", "0", "Undefined"], answerIndex: 2, hint: "It contains no characters before the terminator." },
                { question: "When a char* pointer is passed to a function by value, what is copied?", options: ["The entire string contents", "Only the first character", "The memory address stored in the pointer", "The null terminator"], answerIndex: 2, hint: "A pointer is just a variable that holds an address. Its value is the address." },
                { question: "What does the expression (p - str) return when p has advanced past n characters from str?", options: ["The address of p", "n — the number of characters traversed", "The value at *p", "sizeof(char*)"], answerIndex: 1, hint: "This is the fundamental principle of pointer arithmetic." }
              ],
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
              posttest: [
                { question: "What is the length of \"C Programming\"?", options: ["12", "14", "13", "15"], answerIndex: 2, hint: "Count letters and the space: C(1)- (2)-P(3)-r(4)-o(5)-g(6)-r(7)-a(8)-m(9)-m(10)-i(11)-n(12)-g(13)." },
                { question: "What is the length of \" \" (a single space)?", options: ["0", "2", "1", "Undefined"], answerIndex: 2, hint: "A space is a regular character." },
                { question: "What is the length of \"\\\\0\" (backslash followed by zero as characters)?", options: ["0", "1", "2", "Undefined"], answerIndex: 2, hint: "The characters are '\\' and '0'. The null terminator is a single character, not two separate characters." },
                { question: "What does the function return for input \"abcde\\0fg\" (where \\0 is an actual null byte in the middle)?", options: ["8", "7", "3", "5"], answerIndex: 3, hint: "The null terminator marks the end of the string, so characters after it are ignored by functions like strlen." },
                { question: "Why is strlen() not used in this experiment?", options: ["strlen() is incorrect for long strings", "To practice implementing string traversal manually using a user-defined function, demonstrating loop logic and null terminator detection", "strlen() requires math.h", "strlen() counts the null terminator"], answerIndex: 1, hint: "The purpose is to learn about the underlying process, not just get the answer." }
              ],
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
              pretest: [
                { question: "If A is a 3×4 matrix, what are the dimensions of its transpose?", options: ["3×4", "4×4", "3×3", "4×3"], answerIndex: 3, hint: "The number of rows and columns are swapped." },
                { question: "What is the relationship between A[i][j] and its transpose B[j][i]?", options: ["B[j][i] = A[i][j] + 1", "B[j][i] = A[j][i]", "B[j][i] = A[i][j]", "B[i][j] = A[j][i] + A[i][j]"], answerIndex: 2, hint: "The transpose 'flips' the matrix over its main diagonal." },
                { question: "For A = {{1,2,3},{4,5,6}}, what is B[2][0] (0-based)?", options: ["6", "4", "2", "3"], answerIndex: 3, hint: "B is a 3x2 matrix. B[2][0] should be A[0][2] which is 3." },
                { question: "Why must the column dimension MAX be specified in the function parameter for a 2D array?", options: ["So the compiler can calculate the address of A[i][j] using row-major layout", "Because rows are stored separately", "To avoid stack overflow", "Because C does not support 2D arrays in functions"], answerIndex: 0, hint: "The compiler needs to know how many columns are in each row to correctly jump from one row to the next in memory." },
                { question: "Can the in-place transpose (swapping A[i][j] and A[j][i]) be applied to a non-square matrix?", options: ["Yes, always", "Yes, but only for even dimensions", "No — the dimensions change, so a second array is required", "Yes, by swapping with a temporary variable"], answerIndex: 2, hint: "A 3x4 matrix transposes to a 4x3 matrix. They can't occupy the same memory because they have different shapes." }
              ],
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
              posttest: [
                { question: "For matrix A = {{1,2},{3,4},{5,6}} (3×2), what is the transpose?", options: ["{{1,3,5},{2,4,6}}", "{{1,2,3},{4,5,6}}", "{{6,5},{4,3},{2,1}}", "{{2,4,6},{1,3,5}}"], answerIndex: 0, hint: "The first column of A becomes the first row of the transpose." },
                { question: "What is the transpose of an identity matrix?", options: ["A zero matrix", "The matrix doubled", "The identity matrix itself", "Undefined"], answerIndex: 2, hint: "The identity matrix is symmetric about its main diagonal." },
                { question: "For a 1×5 matrix {10, 20, 30, 40, 50}, what is its transpose?", options: ["{50, 40, 30, 20, 10}", "A 5×1 column matrix with the same values", "A 5×5 matrix", "{10, 20, 30, 40, 50} unchanged"], answerIndex: 1, hint: "A row becomes a column." },
                { question: "In the in-place square matrix transpose, why does the inner loop start at j = i+1?", options: ["To skip the diagonal elements and avoid double-swapping", "Because row 0 never needs transposing", "To sort the elements", "Because j = i would cause division by zero"], answerIndex: 0, hint: "Swapping A[i][j] with A[j][i] fixes both positions. If you later swap A[j][i] with A[i][j], you would swap them back." },
                { question: "What is the time complexity of transposing an m × n matrix into a second matrix B?", options: ["O(m + n)", "O(m²)", "O(m × n)", "O(n²)"], answerIndex: 2, hint: "You need to visit each of the m*n elements exactly once." }
              ],
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
              pretest: [
                { question: "What are the two base cases in the recursive Fibonacci function?", options: ["fib(0)=1 and fib(1)=1", "fib(0)=0 and fib(1)=1", "fib(1)=0 and fib(2)=1", "fib(0)=0 and fib(2)=1"], answerIndex: 1, hint: "These are the smallest, non-decomposable problems." },
                { question: "What is fib(6) in the Fibonacci series starting from fib(0)=0?", options: ["5", "13", "8", "21"], answerIndex: 2, hint: "Series: 0,1,1,2,3,5,8." },
                { question: "What happens if a recursive function has no base case?", options: ["It returns 0 automatically", "It runs once and stops", "It causes infinite recursion and stack overflow", "Compiler gives syntax error"], answerIndex: 2, hint: "The function would call itself forever, consuming all available stack memory." },
                { question: "In recursion, what is a call stack?", options: ["A queue of function calls waiting to execute", "Memory that stores each active function call frame", "A list of return values", "The heap memory used by malloc"], answerIndex: 1, hint: "It's a LIFO (Last-In, First-Out) structure that keeps track of function calls." },
                { question: "For fib(5), what is the correct value?", options: ["3", "8", "5", "13"], answerIndex: 2, hint: "0,1,1,2,3,5." }
              ],
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
              posttest: [
                { question: "What is the output of the program when n=1?", options: ["0 1", "1", "0", "Error"], answerIndex: 2, hint: "The loop runs for i=0 only." },
                { question: "How many times is fib(2) called when computing fib(5)?", options: ["1", "3", "2", "5"], answerIndex: 2, hint: "Draw the call tree: fib(5) -> fib(4)+fib(3). fib(4) calls fib(3)+fib(2). fib(3) calls fib(2)+fib(1)." },
                { question: "What is the maximum call stack depth when computing fib(6)?", options: ["3", "4", "6", "12"], answerIndex: 2, hint: "The deepest path is fib(6)->fib(5)->fib(4)->fib(3)->fib(2)->fib(1)->fib(0)." },
                { question: "Which modification would make Fibonacci use iteration instead of recursion?", options: ["Add another base case", "Replace recursive calls with a for loop storing previous two values", "Use malloc to store values", "Call fib() from a different function"], answerIndex: 1, hint: "This is the classic iterative solution: `a, b = b, a+b`." },
                { question: "What happens when you call fib(50) with naive recursion?", options: ["Returns answer instantly", "Takes extremely long due to repeated subproblem recalculation", "Causes compile error", "Returns wrong answer always"], answerIndex: 1, hint: "The number of function calls grows exponentially (approx. φⁿ)." }
              ],
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
              pretest:[
                { question: "What is the base case for the recursive factorial function?", options: ["fact(1) = 1", "fact(0) = 1", "fact(0) = 0", "fact(n) = 0"], answerIndex: 1, hint: "This is the stopping condition that doesn't call itself." },
                { question: "What is the value of fact(5)?", options: ["60", "100", "120", "24"], answerIndex: 2, hint: "5 * 4 * 3 * 2 * 1 = 120" },
                { question: "How many recursive calls does fact(4) make before reaching the base case?", options: ["3", "4", "5", "2"], answerIndex: 1, hint: "fact(4) calls fact(3). fact(3) calls fact(2). fact(2) calls fact(1). fact(1) calls fact(0). That's 4 calls before the base case." },
                { question: "What is the return type of the factorial function for large inputs?", options: ["int is always sufficient", "long or long long to avoid overflow", "float", "char"], answerIndex: 1, hint: "Factorials grow very quickly and exceed the capacity of a standard int." },
                { question: "What is fact(0)?", options: ["0", "Undefined", "1", "Error"], answerIndex: 2, hint: "It's defined to be 1." }
              ],
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
              posttest: [
                { question: "What does fact(4) return?", options: ["12", "16", "24", "48"], answerIndex: 2, hint: "4! = 4*3*2*1 = 24" },
                { question: "What is the call stack depth when computing fact(6)?", options: ["5", "7", "6", "12"], answerIndex: 2, hint: "The depth is n+1 (for 0! as base case)." },
                { question: "What is the difference between linear recursion (factorial) and tree recursion (fibonacci)?", options: ["Linear makes one recursive call per step, tree recursion makes two", "Linear is always faster", "Tree recursion uses less memory", "There is no difference"], answerIndex: 0, hint: "Linear recursion follows a single, straight line of calls, while tree recursion branches out." },
                { question: "What will happen if you call fact(-1) without a guard condition?", options: ["Returns 1", "Returns 0", "Infinite recursion and stack overflow", "Compiler error"], answerIndex: 2, hint: "The recursion will never reach the base case (n==0)." },
                { question: "Which data type should be used to correctly store fact(20)?", options: ["int", "float", "long long", "double"], answerIndex: 2, hint: "20! is about 2.4 * 10^18, which fits in a 64-bit unsigned integer." }
              ],
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
              pretest: [
                { question: "What does ack(0, n) return according to the Ackermann definition?", options: ["n", "n+1", "n-1", "0"], answerIndex: 1, hint: "This is the first case of the definition." },
                { question: "What is ack(1, 1)?", options: ["2", "4", "3", "1"], answerIndex: 2, hint: "ack(1,1) = ack(0, ack(1,0)) = ack(0, ack(0,1)) = ack(0,2) = 3." },
                { question: "Why is the Ackermann function significant in computer science?", options: ["It is the fastest sorting algorithm", "It proves not all computable functions are primitive recursive", "It computes Fibonacci efficiently", "It is used in operating system scheduling"], answerIndex: 1, hint: "It's a classic example from computability theory." },
                { question: "What happens when you try to compute ack(5, 5)?", options: ["Returns a small number quickly", "Causes stack overflow due to extreme recursion depth", "Returns 0", "Compiler optimizes it automatically"], answerIndex: 1, hint: "The recursion depth and number of calls grow astronomically." },
                { question: "What is ack(2, 2)?", options: ["5", "9", "7", "4"], answerIndex: 2, hint: "ack(2,2) = ack(1, ack(2,1)) = ack(1, ack(1, ack(2,0))) = ack(1, ack(1, ack(1,1))) = ack(1, ack(1, 3)) = ack(1, ack(0, ack(1,2))) = 7." }
              ],
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
              posttest: [
                { question: "How many total function calls does ack(1,1) make?", options: ["3", "4", "5", "7"], answerIndex: 1, hint: "The sequence is ack(1,1) -> ack(0, ack(1,0)) -> ack(0, ack(0,1)) -> ack(0,2). That's 5 calls." },
                { question: "Which case of Ackermann handles when both m and n are greater than zero?", options: ["Case 1: return n+1", "Case 2: return ack(m-1, 1)", "Case 3: return ack(m-1, ack(m, n-1))", "Case 4: return ack(m, n-1)"], answerIndex: 2, hint: "This is the third and most complex case." },
                { question: "What is ack(3,2)?", options: ["9", "61", "29", "13"], answerIndex: 2, hint: "This is a known value, still relatively small but shows rapid growth." },
                { question: "Why should you never test ack(4,2) in a normal C program?", options: ["It returns a negative number", "The result has 19,728 digits and requires astronomically many recursive calls", "Compiler cannot parse the function", "It always returns 0"], answerIndex: 1, hint: "The recursive computation is so vast it's practically impossible to compute with naive recursion." },
                { question: "What type of recursion does Case 3 of Ackermann represent?", options: ["Linear recursion like factorial", "Tail recursion", "Double or nested recursion where a recursive call is inside another recursive call's argument", "Mutual recursion between two functions"], answerIndex: 2, hint: "The return statement contains a call to ack inside the argument of another call to ack." }
              ],
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
              pretest: [
                { question: "What does the & operator do when used before a variable in C?", options: ["Performs bitwise AND", "Returns the memory address of the variable", "Dereferences a pointer", "Declares a reference variable"], answerIndex: 1, hint: "It's the 'address-of' operator." },
                { question: "What does *ptr do when ptr is a pointer variable?", options: ["Declares a new pointer", "Gives the address stored in ptr", "Accesses the value at the memory address stored in ptr", "Multiplies ptr by something"], answerIndex: 2, hint: "It's the 'dereference' operator." },
                { question: "Why does swap(a, b) using call by value not work?", options: ["C does not allow functions with two parameters", "The function gets copies so original variables are unchanged", "Swapping is not possible in C", "Variables cannot be passed to functions"], answerIndex: 1, hint: "The function works on its own private copies, not on the original variables in main." },
                { question: "What should the parameter type be for a function that modifies an int using call by reference?", options: ["int", "int*", "int&", "&int"], answerIndex: 1, hint: "You need to pass the address of the int, so the parameter must be a pointer that can hold an address." },
                { question: "What is a dangling pointer?", options: ["A pointer with value zero", "A pointer declared but never initialized", "A pointer pointing to memory that is freed or out of scope", "A pointer to a pointer"], answerIndex: 2, hint: "It's a pointer that no longer points to valid memory." }
              ],
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
              posttest: [
                { question: "After swap(&a, &b) with a=5 and b=9, what are the values of a and b?", options: ["a=5 b=9", "a=9 b=5", "a=0 b=0", "a=9 b=9"], answerIndex: 1, hint: "The function exchanges the values stored at the memory locations of a and b." },
                { question: "What is the correct function signature for a swap function using pointers?", options: ["void swap(int a, int b)", "void swap(int *a, int *b)", "int swap(&a, &b)", "void swap(int &a, int &b)"], answerIndex: 1, hint: "The parameters are pointers to integers." },
                { question: "Inside the swap function, what does *a = *b do?", options: ["Copies the address of b into a", "Copies the value at address b into the location pointed by a", "Swaps the pointers themselves", "Nothing useful"], answerIndex: 1, hint: "It takes the value that `b` points to and puts it at the location that `a` points to." },
                { question: "If ptr points to variable x, which statement correctly changes x to 50?", options: ["ptr = 50", "&ptr = 50", "*ptr = 50", "ptr* = 50"], answerIndex: 2, hint: "You need to dereference the pointer to access the value of the variable it points to." },
                { question: "What is the output if you pass the same variable twice: swap(&a, &a)?", options: ["a becomes 0", "a remains unchanged", "Program crashes", "Compiler error"], answerIndex: 1, hint: "The logic of the function would copy a into temp, copy a into a, and then copy temp back into a. The net effect is no change." }
              ],
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
              pretest: [
                { question: "How is a string terminated in C?", options: ["With a period character", "With a null character \\0", "With a newline \\n", "With a space character"], answerIndex: 1, hint: "This is the sentinel value that marks the end of the useful data." },
                { question: "What does p++ do when p is a char pointer?", options: ["Increments the value at p by 1", "Moves p to point to the next character in memory", "Doubles the address in p", "Creates a new pointer"], answerIndex: 1, hint: "Pointer arithmetic is scaled by the size of the data type. For a char, it moves to the next byte." },
                { question: "What does *src return when src points to the letter 'A'?", options: ["The address of A", "The ASCII value 65 as an integer OR the character 'A'", "A pointer to the next character", "NULL"], answerIndex: 1, hint: "The dereference operator gets the value stored at the memory address." },
                { question: "Why must you add \\0 at the end of the destination string after copying?", options: ["To save memory", "To mark the valid end of the string for C string functions and printf", "It is added automatically", "To avoid dangling pointers"], answerIndex: 1, hint: "Without it, printf will continue reading from memory beyond the end of the string, leading to garbage output." },
                { question: "If src = \"JNTU\" and you copy it to dest, what is the size of dest that is needed?", options: ["4 bytes", "5 bytes including null terminator", "3 bytes", "10 bytes always"], answerIndex: 1, hint: "You need space for the 4 characters plus the null terminator." }
              ],
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
              posttest: [
                { question: "What is the output when input is \"Hello\"?", options: ["Copied: hello", "Copied: Hello", "Hello", "Error"], answerIndex: 1, hint: "The program prints the copied string." },
                { question: "What happens if you forget to add \\0 after the copy loop?", options: ["Nothing changes", "printf may print garbage characters beyond the string", "Program gives compile error", "dest automatically gets \\0"], answerIndex: 1, hint: "printf will keep reading memory until it eventually encounters a random null byte." },
                { question: "Which condition correctly checks for end of string in a pointer-based loop?", options: ["while(src != 0)", "while(*src != '\\0') or equivalently while(*src)", "while(src == NULL)", "while(*src > 0)"], answerIndex: 1, hint: "The null character is false in a boolean context." },
                { question: "What is the key difference between strcpy() and the custom strCopy() you implemented?", options: ["strcpy() is faster always", "They are functionally identical but strcpy() has error handling built in", "strCopy() cannot handle strings longer than 10 characters", "strcpy() does not add null terminator"], answerIndex: 1, hint: "They perform the same core task, but the library function is heavily optimized and well-tested." },
                { question: "If char *p = s where s is a char array, what does p+3 point to?", options: ["The value s[3] directly", "The memory address of the 4th character s[3]", "s multiplied by 3", "Garbage address"], answerIndex: 1, hint: "It points to the element 3 positions after the one p points to." }
              ],
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
              pretest: [
                { question: "What is the ASCII value of character 'A'?", options: ["97", "65", "48", "90"], answerIndex: 1, hint: "It's a standard code; 'a' is 97." },
                { question: "Which condition correctly checks if a character pointed by p is a digit?", options: ["*p >= 0 && *p <= 9", "*p >= '0' && *p <= '9'", "*p >= 48 || *p <= 57", "isDigit(*p)"], answerIndex: 1, hint: "You compare the character's ASCII code to those of the characters '0' and '9'." },
                { question: "What does p++ do inside a string traversal loop?", options: ["Increments the character value at p", "Moves the pointer to the next character", "Copies the character to a new location", "Resets p to the start of the string"], answerIndex: 1, hint: "It's the pointer equivalent of incrementing an array index." },
                { question: "For input \"Hello123!\" how many uppercase letters are there?", options: ["0", "1", "5", "3"], answerIndex: 1, hint: "Only 'H' is uppercase." },
                { question: "What category does a space character fall into?", options: ["Lowercase", "Digit", "Uppercase", "Other"], answerIndex: 3, hint: "It's not a letter or a digit." }
              ],
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
              posttest:[
                { question: "For input \"JNTUGV2026\" what is the digit count?", options: ["3", "4", "6", "2"], answerIndex: 1, hint: "The digits are 2, 0, 2, 6." },
                { question: "What is the lowercase count for input \"HELLO\"?", options: ["5", "0", "1", "3"], answerIndex: 1, hint: "All letters are uppercase." },
                { question: "Which header file provides built-in character classification functions like isupper() and isdigit()?", options: ["stdio.h", "string.h", "ctype.h", "math.h"], answerIndex: 2, hint: "This is the 'character types' header." },
                { question: "What is the output for input \"aB3 \"?", options: ["Upper=1 Lower=1 Digit=1 Other=1", "Upper=1 Lower=1 Digit=1 Other=0", "Upper=0 Lower=2 Digit=1 Other=1", "Upper=1 Lower=2 Digit=0 Other=1"], answerIndex: 0, hint: "Count them: 'a'(lower), 'B'(upper), '3'(digit), ' '(other)." },
                { question: "Why is pointer traversal preferred over index traversal for strings in systems programming?", options: ["It is always faster on all machines", "It directly models memory layout and avoids redundant index arithmetic", "Indexes cause compilation errors in C", "Pointers use less RAM"], answerIndex: 1, hint: "It can be more efficient as it avoids the multiplication and addition needed to calculate an address from an index." }
              ],
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
              pretest:[
                { question: "Which function is used to open a file in C?", options: ["fileopen()", "open()", "fopen()", "openFile()"], answerIndex: 2, hint: "It's part of the standard I/O library." },
                { question: "What does fopen() return if the file cannot be opened?", options: ["0", "-1", "NULL", "Empty string"], answerIndex: 2, hint: "It's a standard macro for a pointer that points to nothing." },
                { question: "Which mode opens a file for writing and creates it if it does not exist?", options: ["\"r\"", "\"a\"", "\"w\"", "\"rw\""], answerIndex: 2, hint: "This mode will also destroy any existing file with the same name." },
                { question: "What is the purpose of fclose()?", options: ["Deletes the file from disk", "Flushes buffer and releases the file handle", "Reads the last line of the file", "Rewinds the file to beginning"], answerIndex: 1, hint: "It's a crucial step to avoid data loss and resource leaks." },
                { question: "Which function reads a line from a file into a character array?", options: ["fscanf()", "fread()", "fgets()", "fgetchar()"], answerIndex: 2, hint: "It's the safe, standard way to read a line, avoiding buffer overflow." }
              ],
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
              posttest: [
                { question: "What is the correct sequence of file operations in C?", options: ["Read → Open → Write → Close", "Open → Write/Read → Close", "Write → Open → Read → Close", "Open → Close → Write → Read"], answerIndex: 1, hint: "You cannot perform any read or write operation without first opening the file." },
                { question: "What happens if you open a file in \"w\" mode and the file already exists?", options: ["Error is returned", "Existing content is preserved and new content is appended", "Existing content is erased and file is overwritten", "Program crashes"], answerIndex: 2, hint: "Be careful with this mode, as it's destructive." },
                { question: "Why must you call fclose() before reopening a file in a different mode?", options: ["fopen() requires it as a parameter", "To flush write buffer to disk and release the file handle", "C only allows one file open at a time always", "fgets() only works on closed files"], answerIndex: 1, hint: "Many operating systems may not let you reopen a file that is still open." },
                { question: "Which function writes formatted text to a file in C?", options: ["printf()", "sprintf()", "fprintf()", "fwrite()"], answerIndex: 2, hint: "It's the file-specific version of the print function." },
                { question: "What does fgets() return when it reaches the end of file?", options: ["0", "Empty string", "NULL", "-1"], answerIndex: 2, hint: "It returns a sentinel value, not an error code." }
              ],
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
              pretest: [
                { question: "What does fgetc() return when the end of file is reached?", options: ["0", "NULL", "EOF which is -1", "\\0"], answerIndex: 2, hint: "It's a special macro defined in stdio.h." },
                { question: "Why is the return type of fgetc() int and not char?", options: ["char cannot be stored in a variable", "To accommodate EOF value which is outside the char range", "int is the default type in C", "fgetc() returns line numbers"], answerIndex: 1, hint: "EOF is typically -1, which is not a valid character value." },
                { question: "How do you detect a new line while reading character by character?", options: ["Check if c == ' '", "Check if c == '\\n'", "Check if c == EOF", "Check if c == '\\0'"], answerIndex: 1, hint: "This is the escape sequence for a newline." },
                { question: "What is a word boundary in the context of this counting program?", options: ["Any character that is a letter", "Transition from whitespace to non-whitespace character", "Every space character encountered", "Start and end of each line"], answerIndex: 1, hint: "The transition from a space to a letter marks the start of a new word." },
                { question: "Which Unix command does this program replicate?", options: ["ls", "cat", "grep", "wc"], answerIndex: 3, hint: "This command stands for 'word count'." }
              ],
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
              posttest:[
                { question: "For input \"Good Morning\\nJNTUGV\\n\" what is the line count?", options: ["1", "3", "2", "0"], answerIndex: 2, hint: "Each newline character marks the end of a line." },
                { question: "What is the word count for input \"The   quick brown\"?", options: ["2", "4", "3", "5"], answerIndex: 2, hint: "Multiple consecutive spaces do not create extra words." },
                { question: "What does the condition while((c = fgetc(f)) != EOF) do?", options: ["Reads the whole file at once", "Reads one character per iteration and stops at end of file", "Reads until a newline is found", "Reads only the first line"], answerIndex: 1, hint: "It's a classic C idiom for reading a file one byte at a time." },
                { question: "Which of the following correctly detects a word boundary?", options: ["If current char is a letter", "If current is non-whitespace and previous was whitespace", "If current char is a space", "If line counter changes"], answerIndex: 1, hint: "This logic correctly identifies the start of a new token." },
                { question: "Why is fgetc() preferred over fgets() for counting individual characters?", options: ["fgets() is slower", "fgetc() gives one character at a time allowing precise counting of every byte", "fgets() cannot read from files", "fgetc() uses less memory"], answerIndex: 1, hint: "You need to see every single byte, including spaces and newlines, to count them all." }
              ],
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
              pretest: [
                { question: "Which of the following is NOT a measure of central tendency?", options: ["Mean", "Median", "Variance", "Mode"], answerIndex: 2, hint: "Central tendency measures describe the center of a dataset, while this measures the spread." },
                { question: "The arithmetic mean of 5 values: 10, 20, 30, 40, 50 is:", options: ["25", "35", "30", "40"], answerIndex: 2, hint: "Sum all the numbers and divide by the count of numbers." },
                { question: "Standard Deviation is defined as:", options: ["Square of Variance", "Square Root of Variance", "Sum of all deviations from Mean", "Average of all squared values"], answerIndex: 1, hint: "It is the square root of the average of the squared differences from the mean." },
                { question: "For the dataset: 5, 3, 8, 3, 7, 3, 9 — what is the Mode?", options: ["5", "7", "3", "8"], answerIndex: 2, hint: "The mode is the value that appears most frequently." },
                { question: "When the number of observations in a dataset is even, the Median is calculated as:", options: ["The largest value in the dataset", "The value at position (n+1)/2", "The average of the two middle values", "The most frequently occurring value"], answerIndex: 2, hint: "For an even count, there is no single middle value, so you average the two central ones." }
              ],
              posttest:[
                { question: "For the dataset: 3, 5, 7, 7, 9, 11, 13 — what is the Median?", options: ["7", "7.86", "9", "8"], answerIndex: 0, hint: "The median is the middle value of an odd-sized, sorted dataset." },
                { question: "Which measure of central tendency is most affected by the presence of outliers in a dataset?", options: ["Mode", "Median", "Mean", "All are equally affected"], answerIndex: 2, hint: "This measure uses every data point in its calculation, making it sensitive to extreme values." },
                { question: "If the Mean of a dataset is 50 and the Standard Deviation is 0, what can you conclude?", options: ["All values are different", "All values are equal to 50", "The data is highly skewed", "The variance is 50"], answerIndex: 1, hint: "A standard deviation of zero means there is no spread or variability in the data." },
                { question: "For the dataset: 2, 4, 4, 4, 5, 5, 7, 9 — the Sample Variance is:", options: ["3.57", "4.0", "2.0", "3.14"], answerIndex: 0, hint: "Sample variance uses (n-1) in the denominator. Calculate the mean, subtract from each point, square, sum, then divide by (n-1)." },
                { question: "In a distribution where Mean > Median > Mode, the distribution is said to be:", options: ["Symmetric", "Negatively skewed (left-skewed)", "Positively skewed (right-skewed)", "Bimodal"], answerIndex: 2, hint: "The 'tail' on the right side of the distribution pulls the mean to the right of the median." }
              ]
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
              pretest:[
                { question: "Which of the following is the correct definition of Data Preprocessing?", options: ["The process of training a machine learning model on raw data", "The process of transforming raw data into a clean and usable format for machine learning", "The process of visualizing data using charts and graphs", "The process of storing data in a database"], answerIndex: 1, hint: "It's the critical step *before* model training that handles imperfections in real-world data." },
                { question: "Which of the following is a technique used to handle missing values in a dataset?", options: ["Normalization", "Imputation with Mean or Median", "Feature Extraction", "Cross Validation"], answerIndex: 1, hint: "This involves replacing missing data with a calculated statistical value." },
                { question: "Discretization in data preprocessing refers to:", options: ["Removing duplicate records from the dataset", "Converting continuous numerical values into discrete categorical intervals", "Selecting the most relevant features from the dataset", "Splitting the dataset into training and testing sets"], answerIndex: 1, hint: "It's the process of 'binning' or grouping a range of numbers into a finite number of buckets." },
                { question: "An outlier in a dataset is best described as:", options: ["A value that appears most frequently", "A value that lies far outside the overall pattern of the data", "A value that is equal to the mean", "A missing value in the dataset"], answerIndex: 1, hint: "It's an observation that is abnormally distant from other observations." },
                { question: "Which of the following methods is commonly used to detect outliers in a dataset?", options: ["K-Means Clustering", "Decision Tree", "Interquartile Range (IQR) Method", "Logistic Regression"], answerIndex: 2, hint: "This method uses quartiles (Q1, Q3) and a multiplier (1.5) to define a 'fence' beyond which points are considered outliers." }
              ],
              posttest: [
                { question: "In the IQR method, a value is considered an outlier if it falls:", options: ["Below Q1 − 2 × IQR or above Q3 + 2 × IQR", "Below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR", "Below the mean − standard deviation", "Below Q1 or above Q3"], answerIndex: 1, hint: "The standard rule-of-thumb uses a multiplier of 1.5 for the IQR to define the whiskers of a box plot." },
                { question: "Which attribute selection method uses the machine learning algorithm itself to evaluate feature subsets?", options: ["Filter Method", "Embedded Method", "Wrapper Method", "Statistical Method"], answerIndex: 2, hint: "This method is like a 'search' that uses the model's performance as its feedback." },
                { question: "Equal Frequency Binning ensures that:", options: ["Each bin has the same width or range", "Each bin contains the same number of data points", "Each bin is defined based on domain knowledge", "All values in the dataset are normalized"], answerIndex: 1, hint: "Think of distributing items into buckets so each bucket has roughly the same number of items." },
                { question: "Which type of missing data is the most difficult to handle because the missingness is related to the unobserved value itself?", options: ["Missing Completely at Random (MCAR)", "Missing at Random (MAR)", "Missing Not at Random (MNAR)", "Structurally Missing Data"], answerIndex: 2, hint: "The cause of the missing data is directly linked to the missing value, making it impossible to predict from the available data." },
                { question: "After applying all preprocessing steps on a dataset with 500 records and 12 attributes, 25 records were removed due to outliers and 2 attributes were dropped during feature selection. What are the dimensions of the final preprocessed dataset?", options: ["500 rows × 12 columns", "475 rows × 10 columns", "475 rows × 12 columns", "500 rows × 10 columns"], answerIndex: 1, hint: "Removing rows reduces the row count, and dropping attributes reduces the column count." }
              ]
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
              pretest: [
                { question: "KNN stands for:", options: ["K-Node Nearest Network", "K-Nearest Neighbors", "K-Node Neural Network", "K-Nearest Node"], answerIndex: 1, hint: "The name describes its method: find the 'K' points that are most similar to the new point." },
                { question: "KNN is categorized as which type of learning algorithm?", options: ["Supervised Learning — Generative Model", "Unsupervised Learning — Clustering", "Supervised Learning — Lazy Learner", "Reinforcement Learning"], answerIndex: 2, hint: "It's called 'lazy' because it doesn't learn a model during training; it just stores the data." },
                { question: "Which of the following distance metrics is most commonly used in KNN?", options: ["Hamming Distance", "Manhattan Distance", "Euclidean Distance", "Cosine Similarity"], answerIndex: 2, hint: "This is the standard 'straight-line' distance between two points." },
                { question: "In KNN for Classification, the predicted class of a new data point is determined by:", options: ["The average of K nearest neighbors' output values", "The majority vote among the K nearest neighbors", "The distance to the farthest neighbor", "The class of the single nearest neighbor always"], answerIndex: 1, hint: "The algorithm takes a 'poll' of the closest K points, and the most common label wins." },
                { question: "What happens when the value of K is set too low (e.g., K=1) in KNN?", options: ["The model underfits the data", "The model becomes computationally faster", "The model overfits the data and becomes sensitive to noise", "The model ignores all training data"], answerIndex: 2, hint: "The decision boundary becomes very complex and can be swayed by a single, possibly noisy, point." }
              ],
              posttest: [
                { question: "In KNN Regression with K = 3, if the three nearest neighbors have output values of 120, 150, and 90, what is the predicted value for the new data point?", options: ["150", "90", "120", "110"], answerIndex: 2, hint: "For regression, KNN predicts by averaging the outputs of the K neighbors." },
                { question: "Which of the following statements about the Curse of Dimensionality in KNN is correct?", options: ["KNN performs better as the number of features increases", "As dimensionality increases, distances between points become increasingly similar, making KNN less effective", "Adding more features always improves KNN accuracy", "The Curse of Dimensionality only affects regression tasks in KNN"], answerIndex: 1, hint: "In very high-dimensional spaces, all points become far apart and appear nearly equidistant, making the concept of 'nearest neighbor' less meaningful." },
                { question: "Why is feature scaling essential before applying the KNN algorithm?", options: ["To reduce the number of features in the dataset", "To ensure features with larger scales do not dominate the distance calculation", "To convert categorical features into numerical ones", "To increase the training speed of the algorithm"], answerIndex: 1, hint: "Without scaling, a feature with a large range (e.g., salary) will have a much larger impact on the distance than a feature with a small range (e.g., age)." },
                { question: "In the K vs Accuracy plot, if the accuracy is highest at K = 5 and then gradually decreases, which of the following best explains this behavior?", options: ["At K = 5 the model underfits the data; higher K values improve it", "At K = 5 the model achieves the best bias-variance balance; beyond this the model begins to underfit", "The training data is too small to support higher values of K", "Distance metric selection causes accuracy to drop after K = 5"], answerIndex: 1, hint: "Increasing K smooths the decision boundary, which reduces variance but increases bias. An optimal K balances this trade-off." },
                { question: "For a binary classification problem with the following confusion matrix: TP = 40, TN = 35, FP = 5, FN = 10 — what is the Recall of the model?", options: ["88.9%", "80.0%", "87.5%", "75.0%"], answerIndex: 1, hint: "Recall = TP / (TP + FN). It measures the ability to find all positive samples." }
              ]
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
              pretest: [
                { question: "A Decision Tree is which type of machine learning model?", options: ["Unsupervised — Clustering Model", "Supervised — Lazy Learner", "Supervised — Eager Learner", "Reinforcement Learning Model"], answerIndex: 2, hint: "Unlike KNN, Decision Trees build an explicit model (the tree) during the training phase." },
                { question: "Which of the following is used as a splitting criterion in Decision Trees?", options: ["Euclidean Distance", "Gini Impurity", "Pearson Correlation", "Z-Score"], answerIndex: 1, hint: "This measures the probability of misclassifying a random element if it were labeled randomly." },
                { question: "In a Decision Tree, a node that does not split further and holds the final predicted class is called:", options: ["Root Node", "Decision Node", "Internal Node", "Leaf Node"], answerIndex: 3, hint: "It's the terminal node at the end of the branches." },
                { question: "What does Information Gain measure in a Decision Tree?", options: ["The number of nodes in the tree", "The reduction in impurity achieved by splitting on a particular feature", "The depth of the tree after splitting", "The distance between data points"], answerIndex: 1, hint: "It quantifies how much 'uncertainty' is removed by making a split." },
                { question: "Which of the following problems is associated with a Decision Tree that is too deep and complex?", options: ["Underfitting", "High Bias", "Overfitting", "High Variance only in Regression"], answerIndex: 2, hint: "A tree that perfectly memorizes the training data will perform poorly on unseen data." }
              ],
              posttest: [
                { question: "For a node with 40 instances of Class A and 60 instances of Class B, what is the Gini Impurity?", options: ["0.50", "0.48", "0.24", "0.36"], answerIndex: 1, hint: "Gini = 1 - (p_A^2 + p_B^2). p_A = 0.4, p_B = 0.6." },
                { question: "In the Depth vs Accuracy plot, if training accuracy keeps increasing with depth but testing accuracy peaks at depth 4 and then decreases, what is the best action?", options: ["Set max_depth to the maximum available value", "Set max_depth to 4 as it gives the best generalization", "Remove all depth constraints and grow the full tree", "Switch to a different algorithm entirely"], answerIndex: 1, hint: "This is a classic sign of overfitting. The optimal depth is where test accuracy is highest." },
                { question: "Which of the following correctly describes Post-Pruning in a Decision Tree?", options: ["The tree is stopped from growing beyond a set depth during training", "The full tree is grown first and then branches are removed based on a complexity parameter", "Features are removed before training the Decision Tree", "The training data is reduced to simplify the tree structure"], answerIndex: 1, hint: "The tree is first allowed to overfit, and then branches that provide little predictive power are trimmed back." },
                { question: "A Decision Tree model shows 99% training accuracy and 72% testing accuracy. Which of the following is the most appropriate solution?", options: ["Increase the max_depth parameter", "Decrease the min_samples_leaf parameter", "Apply pruning and reduce max_depth to control overfitting", "Use Entropy instead of Gini as the splitting criterion"], answerIndex: 2, hint: "The model is overfitting. You need to simplify the model by limiting its growth." },
                { question: "In Feature Importance from a Decision Tree, a feature with a high importance score means:", options: ["The feature has the highest number of unique values", "The feature appears only at the leaf nodes of the tree", "The feature contributes the most to reducing impurity across all splits in the tree", "The feature has the highest correlation with all other features"], answerIndex: 2, hint: "It is calculated by measuring the total reduction in impurity (e.g., Gini) that the feature provides." }
              ]
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
              pretest: [
                { question: "Which of the following tasks is a Decision Tree Regressor designed to perform?", options: ["Predict a discrete class label for a given input", "Cluster data points into groups based on similarity", "Predict a continuous numerical output value for a given input", "Reduce the dimensionality of a dataset"], answerIndex: 2, hint: "A 'Regressor' is for predicting a numerical quantity, not a category." },
                { question: "In a Decision Tree Regressor, the predicted output value at each leaf node is:", options: ["The majority class of all training instances in that node", "The median of the target values of all training instances in that node", "The mean of the target values of all training instances in that node", "The maximum target value of all training instances in that node"], answerIndex: 2, hint: "The prediction for a region is the average value of all the training points that fall there." },
                { question: "Which of the following is the most commonly used splitting criterion for a Decision Tree Regressor?", options: ["Gini Impurity", "Entropy", "Mean Squared Error (MSE)", "Euclidean Distance"], answerIndex: 2, hint: "The goal is to create child nodes that are 'purer' in terms of their target values, which means lower variance." },
                { question: "Which metric measures the proportion of variance in the target variable explained by the regression model?", options: ["Mean Absolute Error (MAE)", "Root Mean Squared Error (RMSE)", "R² Score (Coefficient of Determination)", "F1-Score"], answerIndex: 2, hint: "It's a scale-invariant score that indicates how well the model fits the data, often between 0 and 1." },
                { question: "What is the primary difference between a Decision Tree Classifier and a Decision Tree Regressor?", options: ["Classifiers use Euclidean distance for splitting while Regressors use Gini Impurity", "Classifiers predict continuous values while Regressors predict class labels", "Classifiers predict class labels using majority voting while Regressors predict continuous values using mean output", "There is no difference — both use the same splitting criterion and output method"], answerIndex: 2, hint: "The decision at a leaf node is different: a vote for classification, an average for regression." }
              ],
              posttest: [
                { question: "A Decision Tree Regressor with max_depth = 1 splits the data into exactly how many leaf regions?", options: ["1", "3", "2", "4"], answerIndex: 2, hint: "A single split (a stump) divides the data into two groups." },
                { question: "For a leaf node containing training instances with target values: 120, 130, 110, 140, 150 — what will be the predicted output for any new instance that falls into this leaf?", options: ["130", "120", "150", "110"], answerIndex: 0, hint: "The prediction is the mean of the values in that leaf." },
                { question: "In the Residual Plot of a Decision Tree Regressor, if residuals show a clear funnel-shaped pattern (increasing spread with increasing predicted values), this indicates:", options: ["The model is perfectly fitted", "The model has heteroscedasticity — variance of errors is not constant", "The model is underfitting the data", "The splitting criterion should be changed to MAE"], answerIndex: 1, hint: "The errors are not consistent across the range of predictions, violating a key assumption of many linear models." },
                { question: "A Decision Tree Regressor is trained on house prices ranging from ₹20 Lakhs to ₹150 Lakhs. When asked to predict the price of a house valued at ₹200 Lakhs (beyond the training range), the model will:", options: ["Extrapolate and predict a value near ₹200 Lakhs", "Return an error as the value is out of range", "Predict the mean of the entire training set", "Predict a constant value equal to the mean of the nearest leaf node — it cannot extrapolate beyond training range"], answerIndex: 3, hint: "Decision trees make predictions based on the training data's target values. They cannot 'trend' upward or downward beyond the range they were trained on." },
                { question: "A Decision Tree Regressor gives the following results: Training R² = 0.98, Testing R² = 0.65. Which combination of parameter changes is most appropriate to improve the model?", options: ["Increase max_depth and decrease min_samples_leaf", "Decrease max_depth and increase min_samples_leaf", "Increase max_depth and increase min_samples_split", "Decrease min_samples_split and set ccp_alpha to 0"], answerIndex: 1, hint: "The model is overfitting. You need to limit its complexity by making the tree shallower and requiring more samples at leaves." }
              ]
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
              pretest: [
                { question: "Ensemble Learning is a technique that:", options: ["Trains a single powerful model on the entire dataset", "Combines multiple individual models to produce a stronger overall prediction", "Reduces the number of features in the dataset before training", "Applies clustering algorithms to group similar data points"], answerIndex: 1, hint: "The 'wisdom of the crowd' principle applied to machine learning models." },
                { question: "Random Forest is built upon which base learner?", options: ["K-Nearest Neighbors", "Support Vector Machine", "Decision Tree", "Logistic Regression"], answerIndex: 2, hint: "It creates a 'forest' of this type of model." },
                { question: "The technique of training each base learner on a different random bootstrap sample of the training data is called:", options: ["Boosting", "Stacking", "Bagging (Bootstrap Aggregating)", "Blending"], answerIndex: 2, hint: "The name is a combination of Bootstrap + Aggregating." },
                { question: "In a Random Forest Classifier with 100 trees, if 60 trees predict Class A and 40 trees predict Class B for a new instance, the final prediction will be:", options: ["Class B", "An average of Class A and Class B", "Class A", "The prediction of the tree with the highest accuracy"], answerIndex: 2, hint: "The forest votes on the final class, and the class with the majority of votes wins." },
                { question: "Which of the following is a key advantage of Random Forest over a single Decision Tree?", options: ["Random Forest is faster to train than a single Decision Tree", "Random Forest requires less memory than a single Decision Tree", "Random Forest reduces overfitting by averaging predictions across multiple diverse trees", "Random Forest always achieves 100% accuracy on training data"], answerIndex: 2, hint: "By combining many trees, the model's overall variance is reduced, leading to better generalization." }
              ],
              posttest: [
                { question: "In a Random Forest with 200 trees performing binary classification, if 130 trees predict Class 1 and 70 trees predict Class 0 for a test instance, what is the predicted class and the prediction confidence?", options: ["Class 0 with 35% confidence", "Class 1 with 65% confidence", "Class 0 with 65% confidence", "Class 1 with 100% confidence"], answerIndex: 1, hint: "The majority class wins. The confidence is the percentage of trees that voted for that class." },
                { question: "In the n_estimators vs Accuracy plot, after a certain number of trees the accuracy stabilizes and no longer improves. What is the most appropriate conclusion from this observation?", options: ["The model has started to overfit and more trees must be avoided", "The dataset is too small to benefit from more trees", "The model has reached its optimal ensemble size and adding more trees gives diminishing returns with increased computational cost", "The max_features parameter must be increased to continue improving accuracy"], answerIndex: 2, hint: "Random Forest does not overfit with more trees, but the benefit eventually becomes negligible." },
                { question: "Which of the following correctly explains why Random Forest trees are deliberately kept diverse and decorrelated from each other?", options: ["Diverse trees reduce the training time of the overall ensemble", "When diverse trees make different types of errors, aggregating their predictions causes errors to cancel out, reducing overall variance", "Decorrelated trees individually have higher accuracy than correlated trees", "Diverse trees use fewer features and are therefore simpler and faster to train"], answerIndex: 1, hint: "The power of the ensemble comes from combining many 'weak' but *different* models." },
                { question: "A Random Forest model returns an OOB Score of 84% and a Test Set Accuracy of 86%. What does this result indicate?", options: ["The model is overfitting since OOB Score is lower than test accuracy", "The OOB Score and Test Accuracy are closely aligned, suggesting the model generalizes well and the OOB estimate is a reliable proxy for test performance", "The model is underfitting and more trees should be added to close the gap", "The bootstrap sampling has failed and the model should be retrained without OOB evaluation"], answerIndex: 1, hint: "The OOB score is an internal validation metric, so it should be close to the true test performance." },
                { question: "A Random Forest Classifier has 13 features in the dataset. By default, how many features are randomly considered at each split node?", options: ["13 (all features)", "4 (approximately √13 rounded to nearest integer)", "6 (approximately half of all features)", "1 (only one random feature at each split)"], answerIndex: 1, hint: "The default for classification is the square root of the total number of features." }
              ]
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
              pretest: [
                { question: "Bayes' Theorem is used to calculate which of the following?", options: ["The Euclidean distance between two data points", "The posterior probability of a class given observed evidence", "The variance of a feature in a dataset", "The optimal number of clusters in a dataset"], answerIndex: 1, hint: "It answers the question: 'Given what I've seen, what is the probability of my hypothesis being true?'" },
                { question: "In Naïve Bayes, the word 'Naïve' refers to which assumption?", options: ["The algorithm assumes all classes have equal prior probabilities", "The algorithm assumes all features are conditionally independent of each other given the class label", "The algorithm assumes the data follows a uniform distribution", "The algorithm assumes there are no missing values in the dataset"], answerIndex: 1, hint: "This is a strong, often unrealistic, assumption that simplifies the probability calculation." },
                { question: "In Bayes' Theorem, P(Class | Features) is called the:", options: ["Prior Probability", "Likelihood", "Marginal Probability", "Posterior Probability"], answerIndex: 3, hint: "It's the updated belief about the class *after* seeing the features." },
                { question: "Which variant of Naïve Bayes is most suitable for text classification tasks where features represent word counts?", options: ["Gaussian Naïve Bayes", "Bernoulli Naïve Bayes", "Multinomial Naïve Bayes", "Complement Naïve Bayes"], answerIndex: 2, hint: "This variant models the frequency of discrete events, like the count of a word in a document." },
                { question: "The problem of zero probability in Naïve Bayes is addressed by:", options: ["Removing the feature from the dataset", "Replacing zero probabilities with the class prior probability", "Laplace Smoothing (Additive Smoothing)", "Normalizing the feature values to a range of 0 to 1"], answerIndex: 2, hint: "This technique adds a small 'pseudocount' to every feature value to avoid zero probabilities." }
              ],
              posttest:[
                { question: "In a Naïve Bayes classifier, the training dataset has 200 instances. Class A has 80 instances and Class B has 120 instances. What are the prior probabilities P(Class A) and P(Class B)?", options: ["P(Class A) = 0.50, P(Class B) = 0.50", "P(Class A) = 0.40, P(Class B) = 0.60", "P(Class A) = 0.60, P(Class B) = 0.40", "P(Class A) = 0.80, P(Class B) = 0.20"], answerIndex: 1, hint: "Prior probability is simply the proportion of each class in the training set." },
                { question: "A Multinomial Naïve Bayes model without Laplace smoothing encounters the word 'lottery' which never appeared in the training data for the Ham class. What will happen to the posterior probability of Ham for a message containing 'lottery'?", options: ["The probability of Ham will slightly decrease", "The probability of Ham will remain unchanged", "The probability of Ham will become exactly zero regardless of all other words", "The probability of Ham will increase because 'lottery' is not a spam word"], answerIndex: 2, hint: "Multiplying probabilities for each word includes P('lottery'|Ham), which is zero. Anything times zero is zero." },
                { question: "In Gaussian Naïve Bayes, the parameters learned from the training data for each feature and class are:", options: ["The minimum and maximum values of each feature per class", "The mean and variance of each feature per class", "The median and interquartile range of each feature per class", "The mode and standard deviation of each feature per class"], answerIndex: 1, hint: "It assumes the continuous data for a given class follows a bell-shaped (normal) distribution." },
                { question: "A Naïve Bayes classifier computes the following unnormalized posterior scores for a new instance: Score(Class A) = 0.0042 and Score(Class B) = 0.0018. What is the normalized posterior probability P(Class A | X)?", options: ["42%", "18%", "70%", "30%"], answerIndex: 2, hint: "Divide the score for Class A by the sum of the scores for both classes." },
                { question: "Which of the following scenarios would cause Gaussian Naïve Bayes to perform poorly even if the conditional independence assumption holds?", options: ["The dataset has a large number of training instances", "The features follow strongly non-Gaussian distributions such as heavily skewed or multimodal distributions", "The dataset has equal prior probabilities for all classes", "The number of features is much smaller than the number of training instances"], answerIndex: 1, hint: "The 'Gaussian' variant relies on the assumption that the data is normally distributed." }
              ]
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
              pretest: [
                { question: "The primary objective of a Support Vector Machine (SVM) classifier is to:", options: ["Minimize the number of support vectors in the training data", "Find the hyperplane that maximizes the margin between two classes", "Minimize the training error on all data points", "Find the centroid of each class and draw a boundary midway between them"], answerIndex: 1, hint: "It searches for the decision boundary with the largest possible 'gap' or 'street' between the classes." },
                { question: "Support Vectors in an SVM are defined as:", options: ["All data points in the training dataset", "The data points farthest from the decision boundary", "The data points closest to the decision boundary that define the margin", "The data points that are incorrectly classified by the model"], answerIndex: 2, hint: "These are the 'critical' points that influence where the boundary is drawn." },
                { question: "The Kernel Trick in SVM is used to:", options: ["Reduce the number of support vectors required for classification", "Map data from a lower-dimensional space to a higher-dimensional space to make it linearly separable", "Normalize the feature values before training the SVM", "Select the most important features from the dataset automatically"], answerIndex: 1, hint: "It allows SVM to find a non-linear boundary in the original space by working in a transformed, higher-dimensional space." },
                { question: "The regularization parameter C in SVM controls:", options: ["The number of dimensions in the kernel feature space", "The width of the Gaussian RBF kernel", "The trade-off between maximizing the margin and minimizing classification errors", "The number of support vectors selected during training"], answerIndex: 2, hint: "A large C prioritizes correct classification over a wide margin, which can lead to overfitting." },
                { question: "Which of the following kernel functions is most suitable for non-linearly separable data where the decision boundary is circular or elliptical?", options: ["Linear Kernel", "Polynomial Kernel", "Radial Basis Function (RBF) Kernel", "Sigmoid Kernel"], answerIndex: 2, hint: "This is the default kernel for many SVM implementations because it is very flexible and can model complex boundaries." }
              ],
              posttest: [
                { question: "An SVM with a very large value of C (e.g. C = 10,000) is trained on a dataset. Which of the following best describes the expected behavior of this model?", options: ["The model will have a very wide margin with many misclassifications allowed", "The model will focus on maximizing the margin at the cost of some training errors", "The model will try to classify all training points correctly, resulting in a very narrow margin and risk of overfitting", "The model will reduce the number of support vectors to zero"], answerIndex: 2, hint: "A high C gives the error term a lot of weight, forcing the model to fit the training data as best as possible." },
                { question: "For an SVM with RBF kernel, if gamma is set to a very large value (e.g. gamma = 1000), what will be the effect on the decision boundary?", options: ["The decision boundary will become a straight line", "The decision boundary will become very smooth and generalized", "Each support vector will have a very small influence radius, causing the boundary to be extremely wiggly and overfit to individual training points", "The model will automatically switch to a Linear kernel"], answerIndex: 2, hint: "A high gamma means each support vector influences only a very small region around itself, leading to a highly complex, 'wiggly' boundary." },
                { question: "A dataset has 500 training instances. After training an SVM with RBF kernel (C=1, gamma=scale), 420 support vectors are identified. What does this large number of support vectors indicate?", options: ["The model is performing very well with high accuracy", "The model has found a wide margin that perfectly separates the data", "The model may be overfitting or the kernel/parameters are not well suited to the data — almost the entire training set is acting as support vectors", "The dataset is linearly separable and a Linear kernel should be used instead"], answerIndex: 2, hint: "Ideally, a model uses a small subset of the data as support vectors. Using most of the data suggests the model is not generalizing well." },
                { question: "In a 4-class classification problem using SVM with the One-vs-One strategy, how many binary SVM classifiers will be trained?", options: ["4", "8", "6", "12"], answerIndex: 2, hint: "One-vs-One trains a classifier for every possible pair of classes. The formula for k classes is k*(k-1)/2." },
                { question: "Feature scaling is applied before training SVM. After standardization, a feature that originally ranged from 0 to 10,000 now ranges approximately from −3 to +3. A second feature that originally ranged from 0 to 1 also now ranges from −3 to +3. Why is this transformation critical for SVM?", options: ["Scaling converts categorical features to numerical values required by SVM", "Without scaling, features with larger ranges dominate the distance calculations and margin computation, causing the SVM to be biased towards those features — scaling ensures all features contribute equally", "Scaling reduces the number of support vectors required by the model", "Scaling changes the kernel function from RBF to Linear, making the boundary more interpretable"], answerIndex: 1, hint: "SVM is based on distance, so all features should be on a similar scale to have equal importance." }
              ]
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
              pretest: [
                { question: "Simple Linear Regression models the relationship between:", options: ["Two or more independent variables and one dependent variable", "One independent variable and one dependent variable", "One independent variable and two dependent variables", "Two independent variables and two dependent variables"], answerIndex: 1, hint: "'Simple' here means there is only one predictor feature." },
                { question: "In the Simple Linear Regression equation ŷ = β₀ + β₁x, the term β₁ represents:", options: ["The intercept — the value of ŷ when x = 0", "The residual error of the model", "The slope — the change in ŷ for a one-unit increase in x", "The coefficient of determination"], answerIndex: 2, hint: "It defines the 'steepness' of the regression line." },
                { question: "The method used to estimate the coefficients β₀ and β₁ in Simple Linear Regression by minimizing the sum of squared residuals is called:", options: ["Maximum Likelihood Estimation", "Ordinary Least Squares (OLS)", "Gradient Boosting", "Lagrangian Optimization"], answerIndex: 1, hint: "It's a classical statistical method that finds the line that minimizes the vertical squared distances to the data points." },
                { question: "The R² Score (Coefficient of Determination) value of 1.0 indicates:", options: ["The model explains none of the variance in the dependent variable", "The model has a perfect linear fit — it explains all the variance in the dependent variable", "The model is overfitting the training data severely", "The independent and dependent variables have zero correlation"], answerIndex: 1, hint: "This means the model perfectly predicts the training data; all residuals are zero." },
                { question: "In Simple Linear Regression, a residual is defined as:", options: ["The predicted value of the dependent variable", "The slope of the regression line", "The difference between the actual observed value and the predicted value", "The correlation coefficient between two variables"], answerIndex: 2, hint: "It's the error of the model for a single prediction." }
              ],
              posttest: [
                { question: "Which residual plot pattern indicates a violation of the homoscedasticity assumption in Simple Linear Regression?", options: ["Random scatter of points around the zero line in the Residuals vs Fitted plot", "A funnel shape (spreading out) in the Residuals vs Fitted plot", "Points closely following the diagonal line in the Q-Q plot", "A bell-shaped symmetric histogram of residuals"], answerIndex: 1, hint: "Homoscedasticity means constant variance of errors. A 'funnel' shape means the variance is changing." },
                { question: "For a given Simple Linear Regression model predicting house price from area, the R² score is 0.85. What does this value mean?", options: ["The model accurately predicts the price of 85% of houses", "85% of the variance in house prices is explained by the area", "The predicted house price is 85% of the actual house price on average", "The regression line passes perfectly through 85% of the data points"], answerIndex: 1, hint: "It represents the proportion of the total variability in the target variable that is captured by the model." },
                { question: "Which of the following is true regarding the Ordinary Least Squares (OLS) regression line?", options: ["It always passes through the origin (0,0)", "It minimizes the sum of absolute errors", "It always passes through the point defined by the mean of x and the mean of y (x̄, ȳ)", "It is highly resistant to extreme outliers"], answerIndex: 2, hint: "This is a key property: the line passes through the 'center of gravity' of the data." },
                { question: "If the Pearson correlation coefficient (r) between independent variable x and dependent variable y is -0.90, what is the expected slope (β₁) of the regression line?", options: ["The slope will be positive", "The slope will be negative", "The slope will be zero", "The slope cannot be determined without knowing R²"], answerIndex: 1, hint: "A strong negative correlation implies that as x increases, y decreases, so the line slopes downwards." },
                { question: "The variance decomposition in ANOVA for regression states that SST = SSReg + SSRes. If a model fits the data very poorly, which of the following is true?", options: ["SSReg will be very large compared to SSRes", "SSRes will be close to zero", "SSRes will be very large, approaching the value of SST", "SST will be negative"], answerIndex: 2, hint: "A bad fit means the model explains very little of the variance, so most of it is left unexplained in the residuals." }
              ]
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
              pretest: [
                { question: "Logistic Regression is primarily used for which type of machine learning task?", options: ["Predicting a continuous numerical output value", "Clustering data points into groups based on similarity", "Classifying instances into discrete class categories", "Reducing the dimensionality of a dataset"], answerIndex: 2, hint: "It outputs a probability, which is then used to make a classification decision." },
                { question: "The Sigmoid function used in Logistic Regression maps any real-valued input to an output in the range:", options: ["−∞ to +∞", "0 to 1", "−1 to +1", "0 to ∞"], answerIndex: 1, hint: "This is ideal for representing a probability." },
                { question: "In Logistic Regression, the output of the Sigmoid function is interpreted as:", options: ["The predicted continuous value of the target variable", "The distance of the instance from the decision boundary", "The probability that the instance belongs to the positive class", "The weight assigned to each feature in the model"], answerIndex: 2, hint: "For binary classification, a value >0.5 typically means a prediction of the 'positive' class." },
                { question: "The default decision threshold in binary Logistic Regression is:", options: ["0.25", "0.75", "1.0", "0.5"], answerIndex: 3, hint: "This is the standard 'break-even' point, where the model is equally unsure." },
                { question: "The cost function minimized during Logistic Regression training is:", options: ["Mean Squared Error (MSE)", "Binary Cross-Entropy Loss (Log Loss)", "Gini Impurity", "Hinge Loss"], answerIndex: 1, hint: "This function heavily penalizes confident, wrong predictions." }
              ],
              posttest: [
                { question: "A Logistic Regression model outputs a predicted probability of P(y = 1 | x) = 0.73 for a test instance. With a decision threshold of 0.5, what is the predicted class? If the threshold is changed to 0.8, what is the predicted class?", options: ["Class 1 at threshold 0.5; Class 1 at threshold 0.8", "Class 1 at threshold 0.5; Class 0 at threshold 0.8", "Class 0 at threshold 0.5; Class 1 at threshold 0.8", "Class 0 at threshold 0.5; Class 0 at threshold 0.8"], answerIndex: 1, hint: "At a threshold of 0.5, 0.73 >= 0.5 → Class 1. At 0.8, 0.73 < 0.8 → Class 0." },
                { question: "In a Logistic Regression model trained on a medical dataset, the coefficient for the feature 'Blood Glucose Level' is β = +1.45. What does the odds ratio exp(1.45) ≈ 4.26 tell us about this feature?", options: ["A one-unit increase in Blood Glucose Level decreases the odds of the disease by 4.26 times", "A one-unit increase in Blood Glucose Level multiplies the odds of the disease by 4.26 — meaning the disease becomes 4.26 times more likely for each unit increase in glucose level", "Blood Glucose Level is 4.26 times less important than all other features combined", "The model predicts the disease with 4.26% probability when glucose is at its mean value"], answerIndex: 1, hint: "A positive coefficient means the odds of the event increase as the feature increases. The odds ratio quantifies this increase." },
                { question: "A Logistic Regression classifier trained on an imbalanced dataset (95% Class 0, 5% Class 1) achieves 95% accuracy. Why is this accuracy score misleading in this context?", options: ["Logistic Regression cannot handle imbalanced datasets and always achieves exactly the majority class proportion as accuracy", "The model could achieve 95% accuracy simply by predicting Class 0 for every instance, completely ignoring Class 1 — making accuracy a poor metric here; Recall, F1-Score, and ROC-AUC are more informative", "The accuracy of 95% is correct and indicates the model is performing excellently on both classes", "The model has overfit the training data because the accuracy equals the class proportion"], answerIndex: 1, hint: "A 'dummy' classifier that always picks the majority class would get the same score, so it's not a useful measurement of performance." },
                { question: "The Log Loss of Model A is 0.22 and the Log Loss of Model B is 0.58, both evaluated on the same test set. Which model is better and what does a lower Log Loss indicate?", options: ["Model B is better because a higher log loss indicates stronger confidence in predictions", "Both models are equally good as log loss only measures calibration not accuracy", "Model A is better because lower Log Loss indicates that the model's predicted probabilities are closer to the actual class labels — the model is both accurate and well-calibrated", "Model A is better only because it has a lower numerical value — Log Loss has no practical interpretation"], answerIndex: 2, hint: "Log Loss penalizes models that are confident and wrong. A lower score is always better." },
                { question: "A Logistic Regression model is trained with L1 regularization (Lasso) using a strong regularization setting (very small C). After training, several feature coefficients are exactly zero. What is the practical implication of this result?", options: ["The model has failed to converge and needs more training iterations", "The features with zero coefficients are the most important predictors and should be kept", "L1 regularization has performed automatic feature selection by driving irrelevant feature coefficients to exactly zero — the model uses only the features with non-zero coefficients for prediction", "Zero coefficients indicate that those features are perfectly correlated with the target variable"], answerIndex: 2, hint: "This is a key property of L1 regularization, leading to simpler, more interpretable models." }
              ]
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
              pretest: [
                { question: "A Multi-layer Perceptron (MLP) belongs to which category of machine learning models?", options: ["Instance-Based Learning", "Probabilistic Learning", "Artificial Neural Networks (ANN)", "Ensemble Learning"], answerIndex: 2, hint: "It's one of the most fundamental types of artificial neural networks." },
                { question: "In an MLP, the layer that receives the raw input features and passes them into the network is called the:", options: ["Output Layer", "Hidden Layer", "Activation Layer", "Input Layer"], answerIndex: 3, hint: "Its number of neurons equals the number of features in your data." },
                { question: "Which of the following activation functions is most commonly used in the hidden layers of a modern MLP?", options: ["Step Function", "Sigmoid Function", "ReLU (Rectified Linear Unit)", "Identity Function"], answerIndex: 2, hint: "It helps mitigate the vanishing gradient problem and is computationally efficient." },
                { question: "Backpropagation in an MLP is used to:", options: ["Initialize the weights of the network before training", "Compute the gradient of the loss function with respect to each weight using the chain rule and update weights accordingly", "Select the optimal number of hidden layers in the network", "Normalize the input features before feeding them into the network"], answerIndex: 1, hint: "It's the core learning algorithm that calculates how much each weight contributed to the error." },
                { question: "The Vanishing Gradient Problem in deep neural networks refers to:", options: ["The network weights becoming too large during training causing numerical overflow", "The gradients becoming extremely small as they are propagated backward through many layers causing early layers to learn very slowly or not at all", "The loss function failing to converge to a global minimum during training", "The output layer producing outputs close to zero for all inputs"], answerIndex: 1, hint: "It's like an echo getting quieter and quieter as it travels back through the network." }
              ],
              posttest: [
                { question: "If an MLP classifier is applied to a dataset without performing feature scaling (standardization or normalization), what is the most likely consequence?", options: ["The model will automatically scale the features internally", "Gradient descent will converge very slowly or may fail to converge entirely because features with larger magnitudes will dominate weight updates", "The network will perfectly classify the training data but fail on test data", "The model architecture will dynamically adjust to accommodate the unscaled features"], answerIndex: 1, hint: "Neural networks are very sensitive to the scale of input features, just like KNN and SVM." },
                { question: "What is the primary benefit of using the ReLU activation function over the Sigmoid activation function in deep hidden layers?", options: ["ReLU produces probabilities bounded between 0 and 1", "ReLU mitigates the vanishing gradient problem because its derivative is exactly 1 for all positive inputs", "ReLU ensures that no neuron ever outputs zero", "ReLU makes backpropagation unnecessary"], answerIndex: 1, hint: "Since the derivative of ReLU is 1 for positive inputs, the gradient doesn't shrink as it propagates backwards." },
                { question: "In the context of training an MLP, what does 'Dropout' do?", options: ["It randomly discards a portion of the training dataset at each epoch", "It removes features that have low correlation with the target variable", "It randomly deactivates a fraction of neurons during each training step to prevent co-adaptation and reduce overfitting", "It stops the training process early when the loss stops decreasing"], answerIndex: 2, hint: "It's a very effective regularization technique that forces the network to learn more robust features." },
                { question: "An MLP is being trained for a 5-class classification task. Which activation function should be used in the output layer and how many neurons should the output layer have?", options: ["Softmax activation, 5 neurons", "Sigmoid activation, 5 neurons", "ReLU activation, 1 neuron", "Softmax activation, 1 neuron"], answerIndex: 0, hint: "The Softmax function outputs a probability distribution over multiple classes." },
                { question: "During training, an MLP's training loss continues to decrease to near zero, but its validation loss starts to increase significantly after epoch 50. What does this indicate and what is a standard remedy?", options: ["Underfitting; increase the learning rate", "Overfitting; apply Early Stopping and halt training around epoch 50", "Vanishing gradients; switch to a Sigmoid activation function", "Perfect learning; let the network train until epoch 100"], answerIndex: 1, hint: "This is a classic sign of overfitting. Stopping training at the point where validation loss is lowest is a simple solution." }
              ]
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
              pretest: [
                { question: "K-Means Clustering belongs to which category of machine learning?", options: ["Supervised Learning", "Reinforcement Learning", "Unsupervised Learning", "Semi-Supervised Learning"], answerIndex: 2, hint: "It is used on data without labels to discover hidden structures or groupings." },
                { question: "In K-Means Clustering, what does the value of K represent?", options: ["The number of features in the dataset", "The number of iterations the algorithm runs", "The number of clusters to partition the data into", "The number of training instances"], answerIndex: 2, hint: "It's the primary hyperparameter you must choose before running the algorithm." },
                { question: "Which distance metric is most commonly used in standard K-Means Clustering to measure similarity between a data point and a centroid?", options: ["Manhattan Distance", "Cosine Similarity", "Euclidean Distance", "Hamming Distance"], answerIndex: 2, hint: "This is the standard 'straight-line' distance, corresponding to the L2 norm." },
                { question: "What is the primary objective function that K-Means Clustering minimizes during training?", options: ["Cross-Entropy Loss between predicted and actual class labels", "Within-Cluster Sum of Squares (WCSS) — the sum of squared distances from each point to its assigned cluster centroid", "The total number of iterations required for convergence", "The silhouette score across all clusters"], answerIndex: 1, hint: "The goal is to make the clusters as 'tight' and compact as possible." },
                { question: "Which of the following is a known limitation of the K-Means Clustering algorithm?", options: ["It cannot handle numerical features", "It requires class labels for all training instances", "The number of clusters K must be specified in advance and the algorithm is sensitive to the initial centroid positions", "It always converges to the global minimum of the objective function"], answerIndex: 2, hint: "Choosing the wrong K can give meaningless results, and a bad starting point can lead to a suboptimal local minimum." }
              ],
              posttest: [
                { question: "A K-Means run on a dataset with 300 points, K=3, and 2 features produces the following final centroids after convergence: C1 = (2.1, 3.4), C2 = (7.8, 1.2), C3 = (5.0, 8.9). A new point P = (5.2, 8.5) arrives. Which cluster will it be assigned to?", options: ["Cluster 1, because its x-coordinate is closest to C1", "Cluster 2, because it has the lowest y-coordinate centroid", "Cluster 3, because Euclidean distance from P to C3 is the smallest distance to any centroid", "Cluster 1, because WCSS is minimized by adding P to the largest cluster"], answerIndex: 2, hint: "K-Means assigns points to the nearest centroid based on Euclidean distance." },
                { question: "The Elbow Plot for a K-Means run shows the following WCSS values: K=1: 980, K=2: 520, K=3: 280, K=4: 240, K=5: 220, K=6: 205, K=7: 198. Which K does the Elbow Method recommend and why?", options: ["K=2, because it has the largest absolute drop in WCSS from K=1", "K=6, because WCSS is still decreasing at K=5 and K=6", "K=3, because the rate of WCSS decrease drops sharply after K=3", "K=7, because more clusters always gives better WCSS"], answerIndex: 2, hint: "You are looking for the 'bend in the curve,' where the decrease in WCSS starts to flatten out." },
                { question: "After running K-Means with K=4 on a standardized dataset, the average Silhouette Score is 0.68. A student re-runs the experiment on the same dataset without feature scaling and gets an average Silhouette Score of 0.22 with the same K=4. What is the most likely explanation?", options: ["K=4 is the wrong number of clusters for this dataset", "The unscaled dataset has a different number of data points", "Without feature scaling, features with larger numeric ranges dominate the Euclidean distance calculation, causing K-Means to cluster based on high-magnitude features alone", "Silhouette Score cannot be compared between scaled and unscaled runs"], answerIndex: 2, hint: "A feature with a large range will dominate the distance calculation, effectively ignoring other features." },
                { question: "A student runs K-Means with K=3 five times on the same dataset with different random seeds and gets the following WCSS values: 145.2, 145.2, 148.7, 145.2, 152.3. What should the student conclude and what is the best practice going forward?", options: ["The algorithm is broken because it gives different results each time", "The majority result of 145.2 is likely the global minimum or a good local minimum. Best practice is to use n_init=10 or higher and select the run with the lowest WCSS", "The average of all five WCSS values should be used as the final WCSS", "K=3 is the wrong K because the algorithm does not consistently converge"], answerIndex: 1, hint: "K-Means can converge to different local minima. Running it multiple times and picking the best result is standard." },
                { question: "A data scientist applies K-Means with K=2 to a dataset containing two interleaved crescent-shaped clusters. The Silhouette Score is 0.18 and the resulting clusters clearly cut across both crescents along a straight line. Which of the following best explains why DBSCAN is more appropriate here?", options: ["DBSCAN is faster than K-Means and therefore always preferred for large datasets", "K-Means assumes clusters are spherical and isotropic. Crescent-shaped clusters are non-convex and cannot be separated by straight boundaries. DBSCAN groups points based on local density connectivity without any shape assumption.", "DBSCAN does not require feature scaling unlike K-Means", "The Silhouette Score of 0.18 means K=2 is wrong"], answerIndex: 1, hint: "K-Means' use of a centroid and Euclidean distance inherently creates spherical (convex) clusters, which fails on non-spherical shapes." }
              ]
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
              pretest: [
                { question: "What is the fundamental difference between hard clustering and soft clustering?", options: ["Hard clustering uses Euclidean distance while soft clustering uses cosine similarity", "In hard clustering each data point belongs exclusively to one cluster, while in soft clustering each data point has a degree of membership to every cluster simultaneously", "Hard clustering requires labeled data while soft clustering does not", "Soft clustering always produces more clusters than hard clustering"], answerIndex: 1, hint: "Soft clustering allows for ambiguity, where a point can partially belong to multiple groups." },
                { question: "In Fuzzy C-Means clustering, what must be true about the membership values of a single data point across all C clusters?", options: ["Each membership value must be exactly 0 or 1", "The maximum membership value across all clusters must equal 1", "The sum of all membership values for a single data point across all clusters must equal 1", "All membership values must be equal to 1/C"], answerIndex: 2, hint: "The membership values for a point represent a distribution of its 'allegiance' to the clusters." },
                { question: "What is the role of the fuzziness parameter m (also called the fuzzifier) in Fuzzy C-Means?", options: ["It controls the number of clusters C", "It determines the maximum number of iterations", "It controls the degree of fuzziness — higher m produces softer more overlapping memberships while m approaching 1 makes FCM behave like hard K-Means", "It sets the convergence threshold for centroid movement"], answerIndex: 2, hint: "It's a weighting exponent that determines how 'shared out' the membership values are." },
                { question: "Which of the following best describes a data point that lies exactly on the boundary between two clusters in Fuzzy C-Means with C=2?", options: ["It is assigned entirely to the nearest cluster with membership 1.0", "It is discarded as an outlier", "It receives equal membership values of approximately 0.5 to each cluster reflecting genuine ambiguity in its cluster assignment", "It causes the algorithm to add a new cluster automatically"], answerIndex: 2, hint: "The point is equally 'between' the clusters, so it splits its membership evenly." },
                { question: "Fuzzy C-Means minimizes which objective function?", options: ["Within-Cluster Sum of Squares (WCSS) identical to K-Means", "The weighted sum of squared distances from each point to each centroid where the weights are the membership values raised to the power m", "The entropy of the membership distribution across all clusters", "The silhouette score averaged across all data points"], answerIndex: 1, hint: "It's a generalization of K-Means's objective, where the 'weight' of a point to a cluster is its membership degree." }
              ],
              posttest: [
                { question: "A Fuzzy C-Means run with C=3 produces the following membership values for three data points: A=[0.92, 0.05, 0.03], B=[0.48, 0.45, 0.07], C=[0.34, 0.33, 0.33]. Rank these points from most confidently assigned to most ambiguous.", options: ["A > B > C — Point A is a core member of Cluster 1, Point B lies on the boundary between Clusters 1 and 2, Point C is equidistant from all three centroids and maximally ambiguous", "C > B > A — Higher spread of membership indicates stronger cluster membership", "All three are equally confident since each sums to 1.0", "B > A > C — Points near two clusters are more informative than points near one cluster"], answerIndex: 0, hint: "High confidence is indicated by one membership value close to 1 and others near 0." },
                { question: "A student runs FCM with m=2 on a dataset and gets PC=0.412 with C=3. They run K-Means on the same data with K=3 and get Silhouette Score of 0.681. The student concludes K-Means is better. What is wrong?", options: ["Nothing — higher metric always means better clustering", "PC and Silhouette Score measure different properties and cannot be directly compared numerically. Also PC=0.412 indicates genuinely fuzzy overlapping clusters where soft assignment is more appropriate.", "The student should use the same metric for both algorithms before comparing", "FCM is always better than K-Means so the comparison is invalid"], answerIndex: 1, hint: "A low Partition Coefficient (close to 1/C) is a sign that the clusters overlap, which is precisely where FCM excels." },
                { question: "In FCM with C=2 and m=2, a data point x has distances to the two centroids of d1=2.0 and d2=6.0. Using the FCM membership update formula, which of the following is the correct membership u1 of point x in Cluster 1?", options: ["u1 = 0.500 — equal membership since both clusters exist", "u1 = 1.000 — closest centroid always gets full membership", "u1 = 0.900, u2 = 0.100 — point is 3 times closer to Cluster 1 so it receives high but not complete membership", "u1 = 0.750, u2 = 0.250 — membership proportional to inverse distance ratio"], answerIndex: 2, hint: "The membership is an inverse function of the distance. A point closer to Cluster 1 has a higher, but not absolute, membership in it." },
                { question: "A researcher is segmenting patients into disease risk clusters. Patient records near cluster boundaries are particularly important. Which justifies using FCM over K-Means?", options: ["FCM is computationally faster making it better for large medical databases", "K-Means cannot handle medical data with continuous numerical features", "FCM explicitly quantifies diagnostic uncertainty through membership degrees — a boundary patient with memberships [0.52, 0.48] is flagged for further clinical investigation rather than being silently force-assigned.", "FCM always produces higher Silhouette Scores than K-Means on medical datasets"], answerIndex: 2, hint: "The 'soft' output of FCM provides more information and can highlight ambiguous cases for a domain expert." },
                { question: "A FCM run with C=4 and m=2 produces MPC=0.698, XB=0.289, PE=0.387, Boundary Points=31 compared to C=3 (MPC=0.741, XB=0.241, PE=0.312, Boundary Points=18). Which C should be selected?", options: ["C=4 because more clusters always capture more data structure", "C=3 because it achieves higher MPC, lower XB, lower PE, and fewer boundary points, indicating more compact well-separated clusters.", "C=4 because lower boundary points indicate better clustering", "Neither — the metrics are too close to distinguish between C=3 and C=4"], answerIndex: 1, hint: "For FCM evaluation, you generally want a higher PC/MPC, and lower XB/PE." }
              ]
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
              pretest: [
                { question: "Expectation Maximization (EM) clustering is based on which probabilistic model?", options: ["K-Nearest Neighbor Density Estimation", "Gaussian Mixture Models (GMM) — assuming data is generated from a mixture of multiple Gaussian distributions", "Bernoulli Mixture Models assuming binary feature distributions", "Uniform Distribution Models assuming equal probability across all regions"], answerIndex: 1, hint: "It is the most common algorithm for fitting a GMM to data." },
                { question: "In the Expectation Step (E-Step) of the EM algorithm, what is computed?", options: ["The mean and covariance of each Gaussian component are updated using the current data assignments", "The posterior probability (responsibility) that each data point was generated by each Gaussian component given the current model parameters", "The number of Gaussian components K is selected by maximizing the likelihood function", "The covariance matrices are reset to identity matrices before the next iteration"], answerIndex: 1, hint: "It calculates the 'soft' assignment of points to clusters based on the current 'guess' for each Gaussian." },
                { question: "What is the key advantage of EM-based Gaussian Mixture Model clustering over K-Means clustering?", options: ["EM always converges faster than K-Means requiring fewer iterations", "EM does not require specifying the number of clusters in advance", "EM models cluster shape, size, and orientation through full covariance matrices allowing it to capture elliptical and arbitrarily oriented clusters unlike K-Means which assumes spherical equal-sized clusters", "EM is computationally less expensive than K-Means for large datasets"], answerIndex: 2, hint: "By learning a full covariance matrix, GMM can model elliptical clusters at any angle, not just circles." },
                { question: "What does the mixing coefficient πₖ represent in a Gaussian Mixture Model?", options: ["The variance of the kth Gaussian component", "The prior probability that a randomly selected data point was generated by the kth Gaussian component — essentially the relative weight or size of that component", "The distance from the kth centroid to the nearest data point", "The number of data points assigned to the kth cluster"], answerIndex: 1, hint: "It's the 'probability' of picking that component from the mixture." },
                { question: "EM clustering maximizes which quantity during the M-Step?", options: ["Within-Cluster Sum of Squares (WCSS) identical to K-Means", "The Partition Coefficient of the soft assignment matrix", "The Expected Complete-Data Log-Likelihood — the weighted sum of log-probabilities of each data point under each Gaussian component using responsibilities as weights", "The Silhouette Score averaged across all data points and components"], answerIndex: 2, hint: "It uses the 'responsibilities' calculated in the E-Step to update the model parameters to increase the likelihood of the data." }
              ],
              posttest: [
                { question: "A GMM with K=3 full covariance components is fitted on 2D data (d=2). Calculate the total number of free parameters in this model.", options: ["9", "11", "17", "23"], answerIndex: 2, hint: "Calculate: 2(K-1) mixing params + K*d means + K*d*(d+1)/2 covariance params." },
                { question: "During EM fitting of a GMM the log-likelihood values across 5 iterations are: −823.4, −791.2, −774.6, −774.5, −774.5. What can be concluded from this convergence pattern?", options: ["The log-likelihood decreasing from −823.4 to −774.5 indicates the algorithm is diverging and should be restarted", "The log-likelihood increasing from −823.4 to −774.5 (becoming less negative) is the expected behavior — EM is guaranteed to monotonically increase the log-likelihood.", "The log-likelihood should reach 0 for a well-fitted model", "The rapid convergence indicates the model is underfitting"], answerIndex: 1, hint: "EM is guaranteed to find a local maximum, so the log-likelihood should never decrease." },
                { question: "A GMM with K=3 full covariance is fitted on a dataset. The resulting mixing coefficients are π1=0.02, π2=0.49, π3=0.49. BIC for K=3 is 1243 and for K=2 is 1198. What does this suggest?", options: ["The model is correct — three components with unequal mixing coefficients is expected behavior", "The mixing coefficient π1=0.02 indicates Component 1 has collapsed. The lower BIC at K=2 confirms that K=2 is the statistically optimal number of components.", "Increase K to 4 because unequal mixing coefficients indicate the model needs more components", "The large difference in mixing coefficients is a sign of the singularity problem"], answerIndex: 1, hint: "A very small mixing coefficient suggests that component is not meaningful. The BIC, which penalizes model complexity, should be lower for the simpler, better model." },
                { question: "A student compares GMM-EM with full covariance versus K-Means on a dataset with two elongated clusters at 45 degrees. GMM-EM gets Silhouette 0.743, K-Means gets 0.521. Why?", options: ["Initialization differences explain the performance gap", "GMM-EM outperforms K-Means because it uses more iterations and complex mathematics", "K-Means assumes spherical clusters. GMM full covariance learns the actual covariance structure including orientation correctly separating elongated clusters.", "K-Means would match GMM-EM if the data were standardized before clustering"], answerIndex: 2, hint: "K-Means can only draw a straight line boundary perpendicular to the line connecting centroids, which fails for non-spherical shapes." },
                { question: "A data scientist must choose between K-Means (K=4), FCM (C=4, m=2), and GMM-EM (K=4, full covariance) for clustering a medical imaging dataset where clusters have different sizes and shapes, and boundary cases need uncertainty quantification with statistically justified model selection. Which is best?", options: ["K-Means first because it is fastest", "GMM-EM first because full covariance handles different shapes, responsibilities provide probabilistic uncertainty, and BIC gives statistically rigorous model selection.", "FCM first because its membership values are easier to interpret", "All three are equally appropriate since standardization eliminates shape differences"], answerIndex: 1, hint: "GMM is the most general and powerful model of the three, and BIC/AIC provide a mathematical way to choose K." }
              ]
            }
          }
        ]
      }
    ]
  }
};