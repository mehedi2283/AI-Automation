import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Shimmer Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 mb-8 animate-fade-in-up cursor-default">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             <span>Accepting New Enterprise Clients for 2025</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tighter mb-8 leading-[0.95] drop-shadow-sm max-w-5xl">
            We Build <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-blue-900 to-blue-600">
              Autonomous Systems.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-tight">
             Replacing manual workflows with bespoke intelligence. We engineer the backend infrastructure that powers the next generation of business.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => document.getElementById('work')?.scrollIntoView({behavior: 'smooth'})}
              className="group w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-0.5"
            >
              See our Technology
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}
              className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-900 rounded-full font-semibold hover:bg-white transition-all flex items-center justify-center gap-2 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};