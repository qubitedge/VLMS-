export const llmsShortNotes = `LARGE LANGUAGE MODELS - SHORT NOTES

INTRODUCTION TO LARGE LANGUAGE MODELS
Large Language Models (LLMs) are advanced Artificial Intelligence systems designed to understand, generate, and interact with human language. They are built on the Transformer architecture and trained on massive amounts of text data using deep learning. Examples include OpenAI's GPT-4, Google's Gemini, and Meta's LLaMA.

![Introduction to Large Language Models](/unit%201%20llm.png)

Why Learn LLMs?
* They are revolutionizing industries by automating text generation, coding, translation, and analysis.
* Understanding how to interact with them (Prompt Engineering) is becoming a critical skill.
* Building applications with LLMs allows for creating intelligent chatbots, search systems, and virtual assistants.

UNIT I — FOUNDATIONS OF LLMS
Tokenization and Text Encoding:
Before an LLM can process text, the text must be converted into numbers. Tokenization is the process of breaking down text into smaller pieces called tokens (words, subwords, or characters).
* Byte-Pair Encoding (BPE): A popular subword tokenization algorithm used in modern models. It iteratively merges the most frequent pairs of characters or bytes to build a vocabulary. This handles unknown words well and keeps the vocabulary size manageable.

Word Embeddings and Vector Representations:
Once text is tokenized, each token is mapped to a continuous sequence of numbers called a vector or an embedding. 
* Embeddings capture the semantic meaning of words. Words with similar meanings will have vectors that are close together in the high-dimensional vector space.
* Examples of embedding models include Word2Vec, GloVe, and modern contextual embeddings.

The Transformer Architecture:
Introduced in 2017 in the paper "Attention Is All You Need", the Transformer is the backbone of all modern LLMs. It replaced older sequential models (like RNNs and LSTMs) because it allows for parallel processing of data, making it highly efficient.
* Encoder-Decoder: The original Transformer had an Encoder (to understand input) and a Decoder (to generate output). Models like BERT use only the Encoder, while models like GPT use only the Decoder.

Self-Attention Mechanism:
The core innovation of the Transformer. Self-attention allows the model to look at all other words in a sentence when processing a specific word, understanding the context and relationships between words regardless of how far apart they are.
* It calculates attention scores (Query, Key, Value vectors) to determine how much "focus" one word should place on every other word in the sequence.

UNIT II — PROMPT ENGINEERING
![Unit II - Prompt Engineering](/unit%202%20llm.png)

Interacting with LLMs:
Prompt engineering is the art and science of structuring text inputs (prompts) to get the best possible output from an LLM. Since LLMs are next-token predictors, the way a question is framed drastically changes the response.

Zero-Shot Prompting:
Asking the model to perform a task without providing any examples. The model relies entirely on its pre-trained knowledge.
* Example: "Translate 'Hello' to French." -> "Bonjour."

Few-Shot Prompting:
Providing the model with a few examples (shots) of the desired input-output format within the prompt before asking the actual question. This helps the model understand the specific format or pattern you want.
* Example: 
  "Apple -> Fruit
   Carrot -> Vegetable
   Banana -> Fruit
   Broccoli -> " (Model outputs: Vegetable)

Chain-of-Thought (CoT) Prompting:
Encouraging the model to explain its reasoning step-by-step before giving the final answer. This significantly improves performance on complex reasoning, math, and logic tasks.
* Example: "Q: If John has 5 apples and eats 2, then buys 3 more, how many does he have?
  A: Let's think step by step. John starts with 5. He eats 2, leaving 3. He buys 3 more, so 3 + 3 = 6. The answer is 6."

Structured Output Generation:
Instructing the model to format its output in a specific machine-readable format, such as JSON, XML, or CSV. This is crucial when integrating LLMs into software applications.
* Example: "Extract the names and ages from the text and output as a JSON array of objects with keys 'name' and 'age'."

UNIT III — BUILDING AI APPLICATIONS
![Unit III - Building AI Applications](/unit%203%20llm.png)

LLM API Integration:
Modern LLMs are primarily accessed via APIs (Application Programming Interfaces). Developers send HTTP requests containing the prompt, and the API returns the generated response.
* Key parameters include:
  - Temperature: Controls randomness (0 = deterministic, 1 = creative).
  - Max Tokens: Limits the length of the generated output.
  - System Prompt: Instructions that define the persona or behavior of the AI.

Building a Chatbot:
A conversational AI application. Unlike a single API call, a chatbot must maintain conversational history (memory). The previous user messages and AI responses must be appended to the prompt in every new API call so the model "remembers" the context.

AI-Based Text Summarization:
Using LLMs to condense long articles, documents, or transcripts into concise summaries. Prompts can specify the desired length, tone, or focus (e.g., "Summarize this article in 3 bullet points focusing on the financial impact").

Document Question Answering:
Building systems that can answer questions based on a provided document. Since LLMs have context windows (a limit on how much text they can read at once), very large documents require advanced techniques like RAG to fetch only the relevant parts of the document before asking the question.

UNIT IV — ADVANCED LLM SYSTEMS
![Unit IV - Advanced LLM Systems](/unit%204%20llm.png)

Retrieval-Augmented Generation (RAG):
RAG is an architecture that connects an LLM to external knowledge bases. Instead of relying solely on the LLM's internal pre-trained memory (which might be outdated or hallucinate), RAG retrieves relevant facts from a database and provides them to the LLM as context to answer the question accurately.

Creating Embeddings and Semantic Search:
* Creating Embeddings: Text documents are broken into chunks, and an Embedding API converts these chunks into vector embeddings. These vectors are stored in a Vector Database.
* Semantic Search: When a user asks a question, the question is also converted into an embedding. The system searches the Vector Database for document chunks that have the most similar vectors (closest mathematical distance). This finds documents that have the same *meaning*, not just the same keywords.

Building a Simple RAG Pipeline:
1. Ingest: Chunk documents, embed them, store in vector database.
2. Retrieve: Embed user query, search vector database for top matching chunks.
3. Generate: Combine the user query with the retrieved chunks into a single prompt. Send to LLM to generate the final answer.

Fine-Tuning vs Prompt Engineering:
* Prompt Engineering: Tweaking the input text to guide the model. Fast, cheap, and requires no retraining. Best for teaching the model *how* to answer or giving it context.
* Fine-Tuning: Further training a pre-trained model on a custom dataset of examples to update its internal weights. Slower and more expensive. Best for teaching the model a specific tone, style, or highly specialized domain knowledge that doesn't fit in a prompt.
`;
