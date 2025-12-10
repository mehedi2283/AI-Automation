import React, { useState } from 'react';
import { Terminal, Play, Settings2, RefreshCw, Bot, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PlaygroundConfig } from '../types';

export const AiPlayground: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [config, setConfig] = useState<PlaygroundConfig>({
    model: 'gemini-2.5-flash',
    temperature: 0.7,
    systemInstruction: 'You are a sarcastic robot from the year 3000. Keep responses short.'
  });
  const [showConfig, setShowConfig] = useState(false);

  const handleRun = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: config.model,
        contents: input,
        config: {
          systemInstruction: config.systemInstruction,
          temperature: config.temperature,
        },
      });
      setResponse(result.text || 'No response generated.');
    } catch (error) {
      setResponse('Error: Could not connect to AI service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="playground" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Playground</h2>
                <p className="text-slate-600 max-w-xl text-lg font-light">
                    Test your backend logic in a live environment.
                </p>
            </div>
            <button 
                onClick={() => setShowConfig(!showConfig)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-medium text-sm
                  ${showConfig 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                    : 'bg-white/50 backdrop-blur-md border-white/60 text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-md'
                  }
                `}
            >
                <Settings2 className="w-4 h-4" />
                {showConfig ? 'Hide Config' : 'Configure Agent'}
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration Panel (Glass) */}
            <div className={`lg:col-span-1 transition-all duration-500 ${showConfig ? 'opacity-100 translate-x-0' : 'hidden lg:block lg:opacity-50 lg:pointer-events-none'}`}>
                <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[32px] p-6 h-full shadow-xl">
                    <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold text-sm uppercase tracking-widest">
                        <Terminal className="w-4 h-4" />
                        Backend Logic
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">System Instruction</label>
                            <textarea 
                                value={config.systemInstruction}
                                onChange={(e) => setConfig({...config, systemInstruction: e.target.value})}
                                className="w-full bg-white/50 border border-white/60 rounded-2xl p-4 text-slate-800 text-sm font-medium h-48 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition-all shadow-inner"
                                placeholder="Define the AI behavior..."
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Temperature: {config.temperature}</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="1.5" 
                                step="0.1"
                                value={config.temperature}
                                onChange={(e) => setConfig({...config, temperature: parseFloat(e.target.value)})}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Terminal Window */}
            <div className={`${showConfig ? 'lg:col-span-2' : 'lg:col-span-3'} transition-all duration-500`}>
                <div className="bg-[#1c1c1e]/95 backdrop-blur-md border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col min-h-[600px] ring-1 ring-black/5">
                    {/* Toolbar */}
                    <div className="bg-[#2c2c2e]/50 px-6 py-4 flex items-center gap-4 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-black/20 rounded-lg text-[10px] text-slate-400 font-mono tracking-wider">
                            <span>API LIVE</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        </div>
                    </div>

                    {/* Output */}
                    <div className="flex-1 p-8 font-mono text-sm overflow-y-auto text-slate-300 bg-gradient-to-b from-transparent to-black/20">
                        {!response && !loading && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-6 opacity-40">
                                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/5">
                                    <Bot className="w-10 h-10" />
                                </div>
                                <p className="font-medium tracking-wide">Awaiting Signal...</p>
                            </div>
                        )}
                        
                        {loading && (
                            <div className="flex items-center gap-3 text-blue-400">
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                <span className="tracking-wide">Generating response...</span>
                            </div>
                        )}

                        {response && (
                            <div className="animate-fade-in group">
                                <div className="text-xs text-slate-500 mb-3 uppercase tracking-widest font-bold">Response Object</div>
                                <div className="text-slate-100 whitespace-pre-wrap leading-loose p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    {response}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-6 bg-[#2c2c2e]/30 border-t border-white/5">
                        <div className="relative group">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleRun()}
                                placeholder="Send a command..."
                                className="w-full bg-black/20 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-slate-200 focus:bg-black/40 focus:border-blue-500/50 outline-none font-mono text-sm transition-all placeholder:text-slate-600"
                            />
                            <button 
                                onClick={handleRun}
                                disabled={loading || !input}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl disabled:opacity-0 disabled:scale-75 transition-all shadow-lg shadow-blue-900/20"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
