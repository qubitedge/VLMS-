export const llmsShortNotes = `LARGE LANGUAGE MODELS - SHORT NOTES

INTRODUCTION TO LARGE LANGUAGE MODELS
Large Language Models (LLMs) are advanced Artificial Intelligence systems designed to understand, generate, and interact with human language. They represent a massive leap in natural language processing (NLP) capabilities. Trained on terabytes of internet text data using deep neural networks, LLMs possess billions or even trillions of parameters. These models do not merely copy text; they learn the statistical representations and underlying structures of human language, enabling them to reason, summarize, translate, write code, and act as autonomous agents. Examples include OpenAI's GPT-4, Google's Gemini, Anthropic's Claude, and Meta's open-source LLaMA.

![Introduction to Large Language Models](/unit%201%20llm.webp)

Why Learn LLMs?
* Paradigm Shift: They are fundamentally changing how software is built—moving from deterministic programming to probabilistic generation.
* Automation: They revolutionize industries by automating complex text generation, programming, language translation, and large-scale data analysis.
* Human-Computer Interaction: Understanding how to interact with them (Prompt Engineering) is becoming a critical skill for knowledge workers in every sector.
* Intelligent Applications: Building applications with LLMs allows developers to create deeply intelligent chatbots, context-aware search systems, and autonomous virtual assistants that can take actions on behalf of the user.

UNIT I — FOUNDATIONS OF LLMS
Tokenization and Text Encoding:
Before an LLM can process human language, the text must be translated into a mathematical format. Tokenization is the crucial first step where text is broken down into smaller, digestible pieces called tokens. A token can be a whole word, a syllable, a single character, or a subword.
* Byte-Pair Encoding (BPE): The most popular subword tokenization algorithm used in modern LLMs (like GPT). It works by iteratively merging the most frequent pairs of characters or bytes in the training corpus to build a fixed-size vocabulary.
* Why Subwords?: BPE strikes a perfect balance. It keeps the vocabulary size manageable while handling rare or unknown words gracefully by breaking them down into known subword components (e.g., "unhappiness" -> "un" + "happi" + "ness").

Word Embeddings and Vector Representations:
Once the text is tokenized into integers, each token is mapped to a continuous, dense sequence of numbers called a vector or an embedding.
* High-Dimensional Space: Embeddings project words into a high-dimensional mathematical space (often hundreds or thousands of dimensions).
* Semantic Meaning: The incredible power of embeddings is that they capture the semantic meaning of words. Words with similar meanings or contexts will have vectors that are physically close together in this mathematical space (e.g., the vector for "king" is close to "queen").
* Famous Models: Historical models include Word2Vec and GloVe, but modern LLMs generate contextual embeddings dynamically on the fly.

The Transformer Architecture:
Introduced by Google researchers in the seminal 2017 paper "Attention Is All You Need", the Transformer architecture is the engine powering all modern LLMs. It completely replaced older recurrent models (like RNNs and LSTMs) due to its massive efficiency gains.
* Parallelization: Unlike RNNs that must process text word-by-word sequentially, Transformers process all words in a sequence simultaneously. This parallel processing allows models to be trained on GPUs much faster, enabling the massive scaling we see today.
* Encoder-Decoder Structure: The original Transformer featured an Encoder (to process and understand the input text) and a Decoder (to generate the output text). Modern models often specialize: BERT uses only the Encoder for text analysis, while GPT uses only the Decoder for text generation.

Self-Attention Mechanism:
This is the core mathematical innovation of the Transformer. Self-attention allows the model to look at all other words in a sentence simultaneously when processing a specific word, dynamically determining context.
* Context is King: It solves the problem of ambiguity. For example, in the sentence "The bank of the river," self-attention ensures the word "bank" heavily attends to "river", understanding it as a landmass rather than a financial institution.
* Q, K, V Vectors: It calculates attention scores using Query, Key, and Value vectors to determine mathematically how much "focus" or weight one word should place on every other word in the sequence.

UNIT II — PROMPT ENGINEERING
![Unit II - Prompt Engineering](/unit%202%20llm.webp)

Interacting with LLMs:
Prompt engineering is the art and science of structuring text inputs (prompts) to maximize the quality, accuracy, and relevance of an LLM's output. Since LLMs operate fundamentally as complex "next-token predictors", the precise phrasing, context, and constraints provided in the prompt drastically alter the generated response.

Zero-Shot Prompting:
Asking the model to perform a task immediately without providing any examples of the desired output. The model relies entirely on its pre-trained, internalized knowledge.
* Best for: General knowledge retrieval, simple translations, and standard summarization.
* Example: "Translate the phrase 'Good morning' into French." -> "Bonjour."

Few-Shot Prompting:
Providing the model with a few examples (shots) of the specific input-output format within the prompt before asking the actual question. This acts as "in-context learning," teaching the model the exact pattern or schema you expect without retraining it.
* Best for: Formatting data, classification tasks, and teaching the model custom syntax.
* Example: 
  "Text: The service was terrible. -> Sentiment: Negative
   Text: I loved the food! -> Sentiment: Positive
   Text: The wait time was too long. -> Sentiment: " (Model reliably outputs: Negative)

Chain-of-Thought (CoT) Prompting:
A highly effective technique that explicitly forces the model to explain its reasoning step-by-step before arriving at the final answer. This forces the model to allocate more computational "tokens" to the thinking process, drastically reducing hallucinations on complex tasks.
* Best for: Mathematical word problems, logic puzzles, and complex multi-step reasoning.
* Example: "Q: If John has 5 apples, eats 2, and buys 3 more, how many does he have?
  A: Let's think step by step. John starts with 5 apples. He eats 2, leaving him with 5 - 2 = 3 apples. He then buys 3 more, so he has 3 + 3 = 6 apples. The final answer is 6."

Structured Output Generation:
In software engineering, natural language is difficult to parse. We instruct the model to format its output strictly in a machine-readable format, such as JSON, XML, or Markdown. Modern APIs even allow enforcing JSON schemas.
* Example: "Extract the names, ages, and cities from the text. Output strictly as a JSON array of objects with keys 'name', 'age', and 'city'. Do not include any conversational text."

UNIT III — BUILDING AI APPLICATIONS
![Unit III - Building AI Applications](/unit%203%20llm.webp)

LLM API Integration:
While web interfaces like ChatGPT are popular for consumers, developers build AI applications by accessing models programmatically via HTTP APIs. Developers send requests containing the prompt payload, and the API returns the generated text.
* Key Parameters:
  - Temperature: Controls the randomness of the output. 0.0 makes the model highly deterministic and focused (good for coding/math), while 1.0 makes it creative and diverse (good for storytelling).
  - Max Tokens: Places a hard limit on the length of the generated response to control costs and formatting.
  - System Prompt / Instructions: A special hidden prompt that defines the overarching persona, rules, and boundaries of the AI (e.g., "You are a helpful, concise assistant who only speaks in pirate slang.").
  - Top-P / Top-K: Alternative methods to temperature for controlling the probability distribution of token selection.

Building a Chatbot:
A standard API call is stateless—it has no memory of past requests. To build a conversational chatbot, the developer must manage "state" or "memory".
* Message History: Every time the user sends a new message, the application must bundle all previous user questions and AI responses together into a massive array and send the entire history back to the API. This gives the model the illusion of "remembering" the conversation.

AI-Based Text Summarization:
A highly valuable enterprise use case. LLMs excel at condensing incredibly long articles, meeting transcripts, or legal documents into concise summaries. 
* Developers can use prompts to strictly specify the desired length, reading level, tone, or specific focus (e.g., "Read this 20-page legal contract and summarize only the clauses related to early termination penalties in 3 bullet points.").

Document Question Answering:
Building systems that allow users to "chat with their documents." Because LLMs have a hard limit on how much text they can read at once (the context window), you cannot simply paste a 1000-page textbook into the prompt. Advanced architectural patterns are required to fetch only the relevant pages before asking the question.

UNIT IV — ADVANCED LLM SYSTEMS
![Unit IV - Advanced LLM Systems](/unit%204%20llm.webp)

Retrieval-Augmented Generation (RAG):
RAG is the industry-standard architecture for grounding LLMs in external, private, or up-to-date knowledge. Instead of relying solely on the LLM's pre-trained memory (which may be years out of date and prone to hallucinations), a RAG system first retrieves relevant factual data from an external database and injects it directly into the prompt as context. The LLM is then instructed to answer the question *only* using the provided context.

Creating Embeddings and Semantic Search:
* The Ingestion Phase: Large documents are split into smaller, manageable "chunks" (e.g., paragraphs). An Embedding API converts each text chunk into a high-dimensional vector embedding. These vectors are saved in a specialized Vector Database (like Pinecone or pgvector).
* Semantic Search: Traditional search engines use keyword matching (BM25). Semantic search uses embeddings. When a user asks a question, the question is also converted into an embedding. The database performs a mathematical "nearest neighbor" search (like cosine similarity) to find document chunks whose vectors are closest to the question's vector. This retrieves documents that share the same *meaning* and *intent*, even if they don't share exact keywords.

Building a Complete RAG Pipeline:
1. Ingest: Chunk documents, embed them via an API, and store them in a vector database.
2. Retrieve: When a user asks a question, embed the query, and search the vector database for the top 5 most semantically similar chunks.
3. Augment & Generate: Combine the user query with the retrieved text chunks into a single, massive prompt. (e.g., "Given this context: [Retrieved Chunks], answer the user's question: [Query]"). Send this to the LLM to generate an accurate, fully cited final answer.

Fine-Tuning vs Prompt Engineering:
When a model isn't performing well, developers must choose an optimization strategy.
* Prompt Engineering / RAG: Tweaking the input text or adding context. It is extremely fast, highly cost-effective, and requires no model retraining. It is the absolute best approach for teaching a model *how* to answer a question or giving it new factual knowledge.
* Fine-Tuning: The process of further training a pre-trained open-source model on thousands of custom input-output examples to permanently update its internal neural weights. It is slow, complex, and requires expensive GPUs. It is best used *not* for adding new facts, but for teaching the model a highly specific tone, structured format, or specialized domain "feel" (like writing in the style of Shakespeare or outputting complex proprietary code structures).
`;
