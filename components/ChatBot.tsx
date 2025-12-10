import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, ArrowUp, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
     { role: 'model', text: "Hi! 👋 I'm the Octopi AI. Ask me anything about our automation services." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Create a persistent session ID for the user's visit
  const sessionId = useRef(`session_${Math.random().toString(36).substr(2, 9)}`);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://n8n.srv915514.hstgr.cloud/webhook/automation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              message: userMsg,
              sessionId: sessionId.current
          })
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const textResponse = await response.text();
      let botText = "";

      try {
          // Try parsing JSON response
          const data = JSON.parse(textResponse);
          
          if (typeof data === 'string') {
              botText = data;
          } else if (data.output) {
              botText = data.output;
          } else if (data.text) {
              botText = data.text;
          } else if (data.message) {
              botText = data.message;
          } else if (data.content) {
              botText = data.content;
          } else if (Array.isArray(data) && data[0]?.output) {
              botText = data[0].output;
          } else {
              // Fallback for unknown JSON structure but valid JSON
              botText = JSON.stringify(data);
          }
      } catch (e) {
          // If not JSON, use raw text if available
          if (textResponse && textResponse.trim().length > 0) {
              botText = textResponse;
          } else {
              botText = "I processed your request.";
          }
      }

      setMessages(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to the server. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans flex flex-col items-end pointer-events-none">
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-enter {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Chat Window */}
      <div 
        className={`
            pointer-events-auto
            mb-4 w-[350px] sm:w-[380px] bg-white rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden
            transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right
            ${isOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 translate-y-8 scale-95 invisible'}
        `}
        style={{ 
            height: '600px', 
            maxHeight: 'calc(100vh - 120px)',
            boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 10px 30px -15px rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md p-5 flex items-center justify-between sticky top-0 z-10 border-b border-slate-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-blue-200 shadow-lg">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-sm">Octopi Assistant</h3>
                    <p className="text-xs text-slate-500 font-medium">Ask us anything</p>
                </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 h-[calc(100%-140px)] bg-white">
            <div className="flex justify-center">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Today</span>
            </div>
            
            {messages.map((msg, idx) => (
                <div 
                    key={idx} 
                    className={`flex gap-3 animate-enter ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                >
                    {msg.role === 'model' && (
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                           <Bot className="w-4 h-4 text-slate-600" />
                        </div>
                    )}
                    
                    <div className={`
                        max-w-[80%] px-4 py-3 text-sm leading-relaxed shadow-sm
                        ${msg.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                            : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-2xl rounded-tl-sm'
                        }
                    `}>
                        {msg.text}
                    </div>
                </div>
            ))}

            {isLoading && (
                 <div className="flex gap-3 animate-enter">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-50">
            <div className="relative flex items-center shadow-sm rounded-full">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="w-full bg-slate-50 text-slate-900 text-sm rounded-full pl-5 pr-12 py-3.5 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm"
                >
                    <ArrowUp className="w-4 h-4" />
                </button>
            </div>
            <div className="text-center mt-3">
                <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1 font-medium">
                    Powered by <span className="text-slate-600">Octopi AI</span>
                </span>
            </div>
        </div>
      </div>

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
            pointer-events-auto
            group relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300
            ${isOpen ? 'bg-white text-slate-900 rotate-90 scale-90' : 'bg-slate-900 text-white hover:bg-blue-600 hover:scale-105 hover:shadow-blue-500/30'}
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};