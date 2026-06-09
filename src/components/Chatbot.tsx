import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import { Send, X, Bot, User, Loader2 } from "lucide-react";
import { botKnowledgeBase } from "@/lib/bot-knowledge";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm the VLMS Assistant. How can I help you with the Virtual Lab today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lottieData, setLottieData] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the lottie animation json
    fetch("/e58d83f8-1de3-11ef-aa83-63293f4ea9e5.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(err => console.error("Failed to load Lottie animation", err));
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey) {
        throw new Error("API key not configured");
      }

      // Build the prompt context
      const apiMessages = [
        { role: "system", content: botKnowledgeBase },
        ...newMessages.map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: apiMessages,
          temperature: 0.5,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch from Groq API");
      }

      const data = await response.json();
      const botReply = data.choices[0]?.message?.content || "I'm sorry, I encountered an error.";

      setMessages(prev => [...prev, { role: "assistant", content: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "assistant", content: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center hover:scale-110 transition-transform duration-300"
          aria-label="Open Chat"
        >
          {lottieData ? (
            <div className="w-48 h-48 drop-shadow-2xl">
              <Lottie animationData={lottieData} loop={true} />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-cyan text-cyan-foreground shadow-2xl flex items-center justify-center">
              <Bot className="size-8" />
            </div>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-background border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-secondary/80 border-b border-border backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-cyan/20 overflow-hidden flex items-center justify-center">
                {lottieData ? (
                  <div className="w-14 h-14 -mt-1">
                    <Lottie animationData={lottieData} loop={true} />
                  </div>
                ) : (
                  <Bot className="size-5 text-cyan" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm">VLMS Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2 bg-mint"></span>
                  </span>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-background/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`shrink-0 size-8 rounded-full flex items-center justify-center mt-1 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground border border-border'}`}>
                  {msg.role === 'user' ? <User className="size-4" /> : <Bot className="size-4" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-cyan text-cyan-foreground rounded-tr-sm' : 'bg-secondary text-foreground rounded-tl-sm border border-border'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="shrink-0 size-8 rounded-full bg-secondary text-foreground border border-border flex items-center justify-center mt-1">
                  <Bot className="size-4" />
                </div>
                <div className="p-4 rounded-2xl bg-secondary text-foreground rounded-tl-sm border border-border flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin text-cyan" />
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-background border-t border-border">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about VLMS..."
                className="w-full bg-secondary/50 border border-border rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-1.5 rounded-full bg-cyan text-cyan-foreground hover:bg-cyan/90 disabled:opacity-50 disabled:hover:bg-cyan transition-colors"
              >
                <Send className="size-4" />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-muted-foreground">Powered by Groq & LLaMA 3</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
