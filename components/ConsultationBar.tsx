import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface ConsultationBarProps {
  onBook: () => void;
}

export const ConsultationBar: React.FC<ConsultationBarProps> = ({ onBook }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1) ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
      }`}
    >
      <button 
        onClick={onBook}
        className="
          group
          pointer-events-auto
          relative
          bg-white/90 backdrop-blur-2xl
          border border-white/60
          shadow-[0_4px_24px_-2px_rgba(0,0,0,0.08)]
          rounded-full
          pl-5 pr-1.5 py-1.5
          flex items-center gap-4
          transition-all duration-300 ease-out
          hover:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.15)]
          hover:-translate-y-0.5
          hover:bg-white
          hover:border-white
        "
      >
        <div className="flex items-center gap-3 text-slate-700 group-hover:text-slate-900 transition-colors">
          <Calendar className="w-5 h-5 text-blue-600" />
          <p className="font-medium text-sm tracking-wide">
            Book a 
            <span className="mx-2 px-2.5 py-0.5 bg-yellow-300/20 text-yellow-700 rounded-md text-xs font-bold uppercase tracking-wider border border-yellow-400/30 group-hover:bg-yellow-300/40 transition-colors">
              Free 30 Min
            </span>
            consultation
          </p>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-900/10 group-hover:shadow-blue-600/20">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
        </div>
      </button>
    </div>
  );
};