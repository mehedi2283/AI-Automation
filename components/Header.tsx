import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  onLoginClick?: () => void;
  agencyName?: string;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, agencyName = "AgencyAI" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
        isScrolled ? 'bg-white/70 backdrop-blur-xl border-b border-white/40 py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <Bot className="w-6 h-6 text-blue-600" />
          <span>{agencyName}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button 
             onClick={onLoginClick}
             className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
             <LayoutDashboard className="w-4 h-4" />
             Client Login
          </button>
          <a 
            href="#contact"
            className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden flex flex-col gap-4 shadow-xl animate-fade-in">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-lg font-medium text-slate-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
           <button 
             onClick={() => {
                setIsMobileMenuOpen(false);
                if (onLoginClick) onLoginClick();
             }}
             className="text-lg font-medium text-slate-900 text-left flex items-center gap-2"
          >
             <LayoutDashboard className="w-5 h-5" /> Client Login
          </button>
        </div>
      )}
    </header>
  );
};