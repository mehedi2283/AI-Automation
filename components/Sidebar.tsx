import React from 'react';
import { LayoutDashboard, Briefcase, Image as ImageIcon, Layers, Info, Users, X, LogOut, Calendar, MessageSquare } from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  cmsSection: string;
  onChangeView: (view: AppView, section?: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, cmsSection, onChangeView, isOpen, onClose, onLogout }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-full
        transition-transform duration-300 ease-in-out md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <Layers className="w-8 h-8 text-blue-500" />
            <span>Admin</span>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-6 space-y-8">
          <div>
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main</p>
            <div className="space-y-1">
                <button
                onClick={() => { onChangeView(AppView.DASHBOARD); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentView === AppView.DASHBOARD
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                >
                <LayoutDashboard className="w-4 h-4" />
                Overview
                </button>
                <button
                onClick={() => { onChangeView(AppView.BOOKINGS); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentView === AppView.BOOKINGS
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                >
                <Calendar className="w-4 h-4" />
                Appointments
                </button>
                <button
                onClick={() => { onChangeView(AppView.CHATS); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentView === AppView.CHATS
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                >
                <MessageSquare className="w-4 h-4" />
                Live Chats
                </button>
            </div>
          </div>

          <div>
             <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Website Content</p>
             <div className="space-y-1">
                {[
                  { id: 'PROJECTS', label: 'All Projects', icon: Briefcase },
                  { id: 'CLIENTS', label: 'Client Images', icon: ImageIcon },
                  { id: 'TECH', label: 'Tech Stack', icon: Layers },
                  { id: 'ABOUT', label: 'About Us', icon: Info },
                  { id: 'TEAM', label: 'Team', icon: Users },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onChangeView(AppView.CMS, item.id); onClose(); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      currentView === AppView.CMS && cmsSection === item.id
                        ? 'bg-slate-800 text-blue-400 border-l-2 border-blue-500'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
             </div>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
              OD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">Super Admin</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors"
          >
            <LogOut className="w-3 h-3" /> Exit Dashboard
          </button>
        </div>
      </div>
    </>
  );
};
