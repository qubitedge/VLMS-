const fs = require('fs');

let content = fs.readFileSync('src/lib/course-data.ts', 'utf8');

const expansions = {
  "llms-w1-2": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Corpus Preparation: Ingest a raw text corpus and append distinct end-of-word tokens (like </w>) to distinguish between word-internal boundaries and word-external boundaries.",
                "Atomic Splitting: Break down the entire text corpus into an initial sequence of raw characters (or bytes), establishing the foundational baseline vocabulary.",
                "Frequency Analysis Loop: Scan the entire sequence sequentially, calculating the co-occurrence frequency of every single adjacent pair of tokens.",
                "Merge Operation: Identify the specific token pair that appears most frequently. Merge them into a single, unified token, and append this new token to the vocabulary table.",
                "Sequence Update: Replace all instances of the identified pair in the original training corpus with the newly created merged token.",
                "Iterative Thresholding: Repeat the frequency analysis and merge operations in a loop until a strictly defined maximum vocabulary size (e.g., 50,000 tokens) is reached."
              ]`
  },
  "llms-w1-3": {
    theory: `theory: [
                {
                  title: "High-Dimensional Semantics",
                  body: [
                    "Word embeddings are a pivotal breakthrough in Deep Learning. Instead of representing text as discrete, unrelated IDs (one-hot encoding), embeddings map tokens into a continuous vector space.",
                    "In this high-dimensional coordinate system, semantic meaning is represented by spatial position. Words that appear in similar linguistic contexts are pushed closer together.",
                    "Formally, an embedding layer acts as a massive lookup table, matching a token ID to a dense tensor (e.g., $f: W \\to \\mathbb{R}^d$), where $d$ often ranges from 768 to 1536 dimensions depending on the architecture."
                  ]
                },
                {
                  title: "Mathematical Proximity",
                  body: [
                    "To determine how conceptually related two chunks of text are, systems rely on vector math, primarily calculating the Cosine Similarity.",
                    "Cosine Similarity measures the angle between two vectors rather than their spatial magnitude. A score of 1.0 means perfect alignment, 0.0 means orthogonal (unrelated), and -1.0 means diametrically opposed."
                  ]
                }
              ]`,
    procedure: `procedure: [
                "Matrix Initialization: Load a pre-trained embedding model or instantiate a random NumPy matrix to simulate multi-dimensional vector weights.",
                "Vector Mapping: Convert an array of input tokens into their corresponding high-dimensional floating-point tensors.",
                "L2 Normalization: Execute mathematical matrix operations to normalize all vectors to a unit length of 1, standardizing downstream distance calculations.",
                "Dot Product Execution: Compute the geometric dot product of a specific target vector against the entire normalized dataset array.",
                "Similarity Ranking: Isolate the highest resulting scalar values to rank the top-K closest semantic neighbors.",
                "Visual Compression: Apply a dimensionality reduction algorithm like PCA or t-SNE to squash the 1536 dimensions down to a 2D plane for visual graph rendering."
              ]`
  },
  "llms-w1-4": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Sequence Initialization: Define the maximum expected sequence length and the specific dimensionality of the embedding model ($d_{model}$).",
                "Matrix Allocation: Instantiate an empty, zero-filled NumPy array with the dimensions (sequence_length, d_model).",
                "Frequency Array Generation: Calculate a logarithmic div_term array that acts as the frequency denominator across the different vector dimensions.",
                "Even-Index Injection: Apply a geometric sine function (np.sin) to all even-indexed columns in the empty positional matrix.",
                "Odd-Index Injection: Apply an alternating geometric cosine function (np.cos) to all odd-indexed columns to complete the wave pattern.",
                "Embedding Addition: Execute an element-wise addition, fusing this generated positional matrix directly into the raw semantic word embeddings before passing them into the Encoder layer."
              ]`
  },
  "llms-w2-1": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Establish Persona: Draft a restrictive system prompt defining the explicit persona and output constraints for the zero-shot task.",
                "Draft Core Instruction: Write a clear, unambiguous task directive without providing any input-output examples.",
                "Isolate Variables: Separate the user's raw input data from the instruction logic using clear markdown delimiters (like triple quotes or XML tags) to prevent prompt injection.",
                "Submit API Request: Execute the payload to the LLM generation endpoint with a relatively low temperature parameter to enforce deterministic compliance.",
                "Evaluate Output: Parse the generated response and evaluate it against zero-shot benchmarking standards to determine baseline intelligence.",
                "Iterate Constraints: If the model fails structurally, adjust the explicit constraints in the system prompt rather than providing examples."
              ]`
  },
  "llms-w2-2": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Identify Failure Modes: Run a zero-shot baseline to identify exactly where the model struggles with formatting or domain logic.",
                "Select Exemplars: Curate a balanced dataset of 3 to 5 perfect input-output examples that cover the edge cases the zero-shot model failed on.",
                "Format Examples: Structure the examples using a strict, repeatable template (e.g., User: [Input] Assistant: [Output]).",
                "Construct Payload: Prepend the formatted examples directly below the system instructions, ensuring visual separation from the actual user query.",
                "Execute Task: Submit the final query. The LLM will statistically mimic the pattern established by the prepended examples.",
                "Analyze Token Overhead: Calculate the API token cost incurred by injecting the examples, as few-shot prompting linearly increases cost per query."
              ]`
  },
  "llms-w2-3": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Establish Task Boundaries: Define a multi-step logic, math, or complex reasoning problem that standard generation pipelines consistently fail.",
                "Draft Intermediate Steps: Write out the explicit, step-by-step logical pathway required to solve the problem accurately.",
                "Inject Magic Phrase: For a zero-shot approach, append the phrase 'Let's think step by step' to the end of the user instruction.",
                "Construct Few-Shot CoT: For advanced reliability, structure a few-shot prompt where the Assistant's example output contains the full reasoning chain before the final answer.",
                "Execute and Trace: Run the generation pipeline and extract the intermediate reasoning tokens to verify the model's logical deduction process.",
                "Extract Final Answer: Use regex or structured tags (e.g., <Final_Answer>) to isolate the actionable result from the verbose reasoning text."
              ]`
  },
  "llms-w2-4": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Define Data Schema: Create a strict structural contract using JSON Schema or a Python Pydantic class, explicitly defining expected keys, data types, and required fields.",
                "Inject Schema Constraints: Inject this schema directly into the System Prompt, instructing the model to map its knowledge explicitly to the provided keys.",
                "Enable API Mode: Configure the API request parameters to enable explicit JSON Mode or Structured Output mode (if supported by the provider).",
                "Disable Markdown: explicitly instruct the model to avoid wrapping the output in markdown code blocks.",
                "Execute Generation: Transmit the payload with a low temperature to ensure formatting stability.",
                "Validation Pipeline: Catch the text output and run it through a programmatic validation script (like json.loads) to verify structural integrity before routing the data."
              ]`
  },
  "llms-w3-1": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Initialize Array: Instantiate an empty memory array and insert a permanent 'system' role dictionary at index 0 to define the chatbot's core personality.",
                "Capture User Input: Extract the text string from the client interface and append it to the memory array under the 'user' role.",
                "Transmit Payload: Serialize the entire rolling history array and transmit it to the LLM API endpoint.",
                "Capture Response: Extract the generated text from the API response object and immediately append it to the memory array under the 'assistant' role.",
                "Render UI: Push the new assistant message to the frontend display layer.",
                "Manage Context Window: Run a token-counting utility. If the array exceeds the maximum threshold, execute a sliding-window truncation to delete the oldest user-assistant pair before the next query."
              ]`
  },
  "llms-w3-2": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Load Document: Import the massive target document and run a pre-flight token estimation to verify it exceeds the standard context window.",
                "Execute Chunking: Split the document into an array of sequential text blocks, utilizing an overlap parameter to ensure sentences split across boundaries are not lost.",
                "Map Phase Execution: Loop through the array, sending each individual chunk to the LLM with an isolated prompt asking for a localized summary.",
                "Collect Intermediate Summaries: Store the generated localized summaries into a new list.",
                "Reduce Phase Execution: Concatenate the localized summaries into a single master string and submit it to the LLM for a final, cohesive global summary.",
                "Verify Context Constraints: Ensure that neither the individual chunks nor the concatenated intermediate summaries exceed the API's token limits at any step in the pipeline."
              ]`
  },
  "llms-w3-3": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Prepare Context Block: Extract the textual content from the target reference document and format it cleanly.",
                "Draft Grounded System Prompt: Write explicit instructions commanding the model to act solely as a text extractor and to refuse questions that lack supporting context.",
                "Assemble Injection Template: Create a prompt template containing discrete sections for the 'System Rules', the 'Document Context', and the 'User Query'.",
                "Execute Payload: Pass the fully assembled string to the LLM API endpoint.",
                "Test Verification: Ask a query whose answer explicitly exists in the text, ensuring accurate extraction.",
                "Test Refusal: Ask a query whose answer is entirely missing from the text, verifying that the strict system prompt prevents the model from hallucinating."
              ]`
  },
  "llms-w4-1": {
    theory: `theory: [
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
                    "Given a text chunk C, an embedding model outputs a vector $v = Embedding(C) \\in R^d$, where $d$ represents the dimensional complexity of the model (e.g., $1536$ for OpenAI text-embedding-3-small).",
                    "To optimize downstream search operations, these floating-point arrays undergo L2 Vector Normalization, ensuring every vector has an exact magnitude of 1.0. This normalizes the space, allowing lightning-fast similarity comparisons."
                  ]
                }
              ]`,
    procedure: `procedure: [
                "Data Extraction: Programmatically load target documents, stripping out irrelevant HTML, markdown formatting, or raw image bytes.",
                "Intelligent Chunking: Apply a recursive text splitter to break the documents into chunks of ~500 tokens, maintaining an overlap of ~50 tokens to preserve transitional context.",
                "Batch Embedding API Call: Transmit the array of text chunks to a cloud-based or local embedding endpoint to minimize network latency via batching.",
                "Extract Floating-Point Tensors: Receive the generated high-dimensional arrays from the API response.",
                "L2 Normalization: Verify or apply mathematical normalization so all vectors align to a unit sphere geometry.",
                "Database Insertion: Package the normalized vectors alongside their original source text and metadata attributes, writing them to persistent storage."
              ]`
  },
  "llms-w4-2": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Query Vectorization: Pass the incoming user search string through the exact same embedding model used to index the database.",
                "Matrix Operations: Calculate the dot product between the query vector and the massive matrix of stored document vectors.",
                "Distance Ranking: Sort the resulting scalar values in descending order to identify vectors with the highest geometric similarity.",
                "Top-K Extraction: Isolate the top $K$ scoring vectors (typically the top 3 to 5 results).",
                "Metadata Filtering: Apply pre-filtering rules (e.g., matching a specific date range or author ID) to dramatically reduce the vector search space before mathematical calculation.",
                "Context Retrieval: Query the database using the top-K vector indices to retrieve the original, human-readable text chunks."
              ]`
  },
  "llms-w4-3": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Intercept Query: Capture the user's incoming plain-text question within the orchestration layer.",
                "Semantic Retrieval: Execute a vector search against the external database to retrieve the top 5 most semantically relevant context chunks.",
                "Context Concatenation: Join the retrieved text chunks into a single, cohesive reference string, annotating the source citations.",
                "Prompt Compilation: Inject the context string and the original user query into a rigid system template that mandates strict adherence to the provided facts.",
                "Generation Execution: Transmit the compiled RAG payload to the LLM generation endpoint.",
                "Response Routing: Extract the final grounded answer and stream it back to the user interface, alongside the database citations used to generate it."
              ]`
  },
  "llms-w4-4": {
    theory: `theory: [
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
              ]`,
    procedure: `procedure: [
                "Evaluate Bottleneck: Analyze whether the model is failing due to missing factual context (Action: RAG) or a failure to adhere to structural formatting and tone (Action: Fine-Tuning).",
                "Data Preparation (RAG): Clean and vectorize raw text documents for insertion into an external vector index.",
                "Data Preparation (Fine-Tuning): Curate a high-quality, structured dataset of hundreds of perfect JSON instruction-response pairs.",
                "Cost Architecture Calculation: Benchmark the lifetime token inference costs of running a massive context-window RAG pipeline versus the upfront GPU training costs of fine-tuning a smaller, faster model.",
                "LoRA Initialization: If fine-tuning is selected, configure a PEFT (Parameter-Efficient Fine-Tuning) environment, isolating the attention weight matrices for updates.",
                "Hybrid Deployment: For complex enterprise solutions, deploy a Hybrid Architecture: a lightly fine-tuned model optimized for specific formatting syntax, placed at the end of a robust RAG data-retrieval pipeline."
              ]`
  }
};

let modifiedContent = content;

for (const [id, rep] of Object.entries(expansions)) {
  const startIdx = modifiedContent.indexOf('id: "' + id + '"');
  if (startIdx === -1) {
    console.log("Could not find id:", id);
    continue;
  }
  
  const contentIdx = modifiedContent.indexOf("content: {", startIdx);
  
  const theoryStart = modifiedContent.indexOf("theory: [", contentIdx);
  let theoryEnd = modifiedContent.indexOf("],", theoryStart);
  
  const procedureStart = modifiedContent.indexOf("procedure: [", theoryEnd);
  let procedureEnd = modifiedContent.indexOf("],", procedureStart);
  
  // Replace procedure
  const beforeProc = modifiedContent.substring(0, procedureStart);
  const afterProc = modifiedContent.substring(procedureEnd + 2);
  modifiedContent = beforeProc + rep.procedure + afterProc;
  
  // Re-find theory (since string length changed)
  const newTheoryStart = modifiedContent.indexOf("theory: [", contentIdx);
  const newTheoryEnd = modifiedContent.indexOf("],", newTheoryStart);
  
  const beforeTheory = modifiedContent.substring(0, newTheoryStart);
  const afterTheory = modifiedContent.substring(newTheoryEnd + 2);
  modifiedContent = beforeTheory + rep.theory + afterTheory;
  
  console.log("Updated", id);
}

fs.writeFileSync('src/lib/course-data.ts', modifiedContent, 'utf8');
console.log("Done.");
