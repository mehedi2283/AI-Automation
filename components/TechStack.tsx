import React from 'react';
import { 
  Database, Zap, Code, Mail, Phone, Globe, Cpu, Workflow, Layers, MessageSquare, Link, Bot, Activity, Box, Mic
} from 'lucide-react';
import { TechTool } from '../types';

interface TechStackProps {
  tools: TechTool[];
}

const IconMap: Record<string, any> = {
  Database, Zap, Code, Mail, Phone, Globe, Cpu, Workflow, Layers, MessageSquare, Link, Bot, Activity, Box, Mic
};

export const TechStack: React.FC<TechStackProps> = ({ tools }) => {
  // Fallback data
  const fallbackTools = [
     { id: '1', name: "Go High Level", category: "CRM & Marketing Platforms", iconName: "Layers", colorClass: "text-blue-600" },
     { id: '2', name: "Airtable", category: "CRM & Marketing Platforms", iconName: "Database", colorClass: "text-amber-500" },
     { id: '3', name: "Zapier", category: "Third Party Integrations", iconName: "Zap", colorClass: "text-orange-600" },
     { id: '4', name: "Make.com", category: "Third Party Integrations", iconName: "Workflow", colorClass: "text-purple-600" },
     { id: '5', name: "Vapi.ai", category: "AI Voice Agent Setup", iconName: "Phone", colorClass: "text-emerald-500" },
     { id: '6', name: "Bland AI", category: "AI Voice Agent Setup", iconName: "Bot", colorClass: "text-cyan-500" },
  ];

  const displayTools = tools.length > 0 ? tools : fallbackTools;

  // Group by category
  const categories: Record<string, TechTool[]> = {};
  displayTools.forEach(tool => {
      if (!categories[tool.category]) categories[tool.category] = [];
      categories[tool.category].push(tool);
  });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll-reverse {
            animation: scroll-reverse 40s linear infinite;
          }
          .pause-on-hover:hover .animate-scroll,
          .pause-on-hover:hover .animate-scroll-reverse {
            animation-play-state: paused;
          }
        `}</style>
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] mix-blend-multiply opacity-60"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100 rounded-full blur-[100px] mix-blend-multiply opacity-60"></div>
        </div>

        <div className="max-w-full mx-auto px-0 relative z-10">
            <div className="text-center mb-16 px-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">Our Tech Stack</h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
                    We leverage best-in-class tools to build robust, scalable automation ecosystems for your business.
                </p>
            </div>

            <div className="space-y-12">
                {Object.keys(categories).map((catName, catIdx) => (
                    <div key={catName} className="w-full">
                        <h3 className="text-xl font-bold mb-6 text-center text-slate-900 opacity-80">
                            {catName}
                        </h3>
                        
                        {/* Marquee Container */}
                        <div className="relative w-full overflow-hidden pause-on-hover py-6">
                            
                            {/* Fading Edges */}
                            <div className="absolute top-0 left-0 z-10 h-full w-24 md:w-48 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                            <div className="absolute top-0 right-0 z-10 h-full w-24 md:w-48 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

                            {/* Scrolling Track */}
                            <div className={`flex w-max gap-6 ${catIdx % 2 === 0 ? 'animate-scroll' : 'animate-scroll-reverse'}`}>
                                {[...Array(4)].map((_, groupIdx) => (
                                    <React.Fragment key={groupIdx}>
                                        {categories[catName].map((tool, toolIdx) => {
                                            const isUrl = tool.iconName && (tool.iconName.startsWith('http') || tool.iconName.startsWith('/'));
                                            const Icon = !isUrl ? (IconMap[tool.iconName] || Box) : null;
                                            return (
                                                <div 
                                                    key={`${groupIdx}-${tool.id}`}
                                                    className="
                                                        group relative w-56 h-36 flex-shrink-0 
                                                        bg-slate-50 border border-slate-200 rounded-2xl 
                                                        flex flex-col items-center justify-center gap-3 
                                                        transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-slate-300 cursor-default
                                                    "
                                                >
                                                    <div className={`w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm ${tool.colorClass} overflow-hidden`}>
                                                        {isUrl ? (
                                                            <img src={tool.iconName} alt={tool.name} className="w-8 h-8 object-contain" />
                                                        ) : (
                                                            <Icon className="w-6 h-6" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 text-center transition-colors px-2">
                                                        {tool.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};