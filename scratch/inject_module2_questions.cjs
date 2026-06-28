// inject_module2_questions.cjs
// Injects Module 2 pretest and posttest questions into course-data.ts
// Uses ts-morph for AST-safe manipulation

const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "..", "src", "lib", "course-data.ts");

// ─── PART 1: Zero-Shot Prompting ────────────────────────────────────────────

const zeroShotPretest = [
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
  { question: "\"Zero-shot baseline\" refers to:", options: ["The maximum speed of a model","The performance score a model gets on a task using just zero-shot prompts, used to measure improvements later","The minimum memory required by a model","The bottom layer of an embedding matrix"], answerIndex: 1 },
];

const zeroShotPosttest = [
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
  { question: "What is the best way to test if a task can be done with zero-shot prompting?", options: ["Write a complex script immediately","Simply type a clear instruction into the model and evaluate the response quality","Review the source code of the tokenizer","Purchase more cloud storage"], answerIndex: 1 },
];

// ─── PART 2: Few-Shot Prompting ─────────────────────────────────────────────

const fewShotPretest = [
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
  { question: "What role does the final open-ended line (like New Input -> ) play in a few-shot prompt?", options: ["It acts as a pattern completion trigger for the model to generate the final missing output","It resets the model's weights","It validates the JSON schema","It closes the text file connection"], answerIndex: 0 },
];

const fewShotPosttest = [
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
  { question: "Few-shot prompting is a foundational skill in:", options: ["Prompt Engineering","Database Administration","Computer Hardware repair","Network Router wiring"], answerIndex: 0 },
];

// ─── PART 3: Chain-of-Thought (CoT) Prompting ──────────────────────────────

const cotPretest = [
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
  { question: "If a model fails a math task using CoT, what is a great way to debug its prompt?", options: ["Review the generated thought chain to pinpoint exactly which step the logic or calculation broke down","Shorten the prompt text","Change all variable names to letters","Switch the user interface style"], answerIndex: 0 },
];

const cotPosttest = [
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
  { question: "Chain-of-Thought prompting is vital for developers building complex workflows using:", options: ["Agentic AI / AI Agents","Simple database scripts","Static frontend web pages","Graphic illustration assets"], answerIndex: 0 },
];

// ─── PART 4: Structured Output Generation ───────────────────────────────────

const structuredPretest = [
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
  { question: "What happens to model hallucinations inside a structured output?", options: ["They are completely prevented from happening","The format will be perfectly valid, but the data values inside the keys can still be hallucinated or incorrect facts","The model turns them into code blocks automatically","They cause validation systems to pass automatically"], answerIndex: 1 },
];

const structuredPosttest = [
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
  { question: "Using structured generation removes the need for highly complex, brittle custom code layers built to:", options: ["Route basic network packets across routers","Clean, strip, parse, and repair broken text string chunks using manual string splitting or regex matching patterns","Scale up compute operations across multi-gpu clouds","Manage basic computer login portals"], answerIndex: 1 },
];

// ─── Injection Logic ────────────────────────────────────────────────────────

function formatQuestion(q) {
  // Use JSON.stringify to safely format the strings and handle escaping
  return `{ question: ${JSON.stringify(q.question)}, options: ${JSON.stringify(q.options)}, answerIndex: ${q.answerIndex} }`;
}

function buildArrayContent(questions) {
  const lines = questions.map((q, i) => {
    const comma = i < questions.length - 1 ? "," : "";
    return `                            ${formatQuestion(q)}${comma}`;
  });
  return `[\n${lines.join("\n")}\n                          ]`;
}

// Map of experiment ID to pretest/posttest question sets
const experiments = [
  { id: "llms-w2-1", pretest: zeroShotPretest, posttest: zeroShotPosttest },
  { id: "llms-w2-2", pretest: fewShotPretest, posttest: fewShotPosttest },
  { id: "llms-w2-3", pretest: cotPretest, posttest: cotPosttest },
  { id: "llms-w2-4", pretest: structuredPretest, posttest: structuredPosttest },
];

// Read file
let content = fs.readFileSync(filePath, "utf-8");

for (const exp of experiments) {
  console.log(`\nInjecting questions for ${exp.id}...`);
  console.log(`  Pretest: ${exp.pretest.length} questions`);
  console.log(`  Posttest: ${exp.posttest.length} questions`);

  // Find the experiment block by looking for its id
  const idPattern = `id: "${exp.id}"`;
  const idIndex = content.indexOf(idPattern);
  if (idIndex === -1) {
    console.error(`  ERROR: Could not find experiment ${exp.id}`);
    continue;
  }

  // Find the pretest: [] within this experiment block (search forward from idIndex)
  const searchStart = idIndex;
  const searchEnd = Math.min(idIndex + 10000, content.length);
  const block = content.substring(searchStart, searchEnd);

  // Replace pretest: []
  const pretestEmpty = "pretest: []";
  const pretestIdx = block.indexOf(pretestEmpty);
  if (pretestIdx === -1) {
    console.log(`  Pretest already populated or not found for ${exp.id}, skipping.`);
  } else {
    const pretestContent = buildArrayContent(exp.pretest);
    const globalPretestIdx = searchStart + pretestIdx;
    content = content.substring(0, globalPretestIdx) +
      `pretest: ${pretestContent}` +
      content.substring(globalPretestIdx + pretestEmpty.length);
    console.log(`  ✅ Pretest injected.`);
  }

  // Re-find the experiment block after potential content shift
  const idIndex2 = content.indexOf(idPattern);
  const searchStart2 = idIndex2;
  const searchEnd2 = Math.min(idIndex2 + 50000, content.length);
  const block2 = content.substring(searchStart2, searchEnd2);

  // Replace posttest: []
  const posttestEmpty = "posttest: []";
  const posttestIdx = block2.indexOf(posttestEmpty);
  if (posttestIdx === -1) {
    console.log(`  Posttest already populated or not found for ${exp.id}, skipping.`);
  } else {
    const posttestContent = buildArrayContent(exp.posttest);
    const globalPosttestIdx = searchStart2 + posttestIdx;
    content = content.substring(0, globalPosttestIdx) +
      `posttest: ${posttestContent}` +
      content.substring(globalPosttestIdx + posttestEmpty.length);
    console.log(`  ✅ Posttest injected.`);
  }
}

// Write the modified content back
fs.writeFileSync(filePath, content, "utf-8");

// Count totals
const totalQuestions = experiments.reduce((sum, e) => sum + e.pretest.length + e.posttest.length, 0);
console.log(`\n✅ Done! Injected ${totalQuestions} questions across ${experiments.length} experiments.`);
console.log(`   - llms-w2-1 (Zero-Shot): ${zeroShotPretest.length} pre + ${zeroShotPosttest.length} post`);
console.log(`   - llms-w2-2 (Few-Shot): ${fewShotPretest.length} pre + ${fewShotPosttest.length} post`);
console.log(`   - llms-w2-3 (CoT): ${cotPretest.length} pre + ${cotPosttest.length} post`);
console.log(`   - llms-w2-4 (Structured): ${structuredPretest.length} pre + ${structuredPosttest.length} post`);
