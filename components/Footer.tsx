import React from 'react';

interface FooterProps {
  onNavigate: (view: any) => void;
  onLogin: () => void;
  agencyName?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onLogin, agencyName = "AgencyAI" }) => {
  return (
    <footer className="bg-white border-t border-slate-100 py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left">
             <div className="font-bold text-slate-900 text-lg mb-2">{agencyName}</div>
             <div className="text-slate-500 text-sm font-medium">
                © {new Date().getFullYear()} {agencyName}. All rights reserved.
             </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <button 
                onClick={() => onNavigate('PRIVACY')} 
                className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
            >
                Privacy Policy
            </button>
            <button 
                onClick={() => onNavigate('TERMS')} 
                className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
            >
                Terms of Service
            </button>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">Twitter</a>
            <button 
                onClick={onLogin} 
                className="text-slate-400 hover:text-blue-600 transition-colors text-xs font-medium uppercase tracking-wider"
            >
                Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};