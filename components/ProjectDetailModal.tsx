import React, { useEffect, useState } from 'react';
import { X, ArrowRight, CheckCircle2, Users, Layers, Play } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen && project) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = 'unset';
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, project]);

  if (!isRendered || !project) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4 transition-all duration-500 ${isVisible ? 'visible' : 'invisible'}`}>
      
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div 
        className={`
          relative w-full max-w-5xl bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden
          transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
          ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}
        `}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white transition-colors border border-white/20 shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto overflow-x-hidden">
          
          {/* Hero Section */}
          <div className="relative h-[400px] sm:h-[500px] w-full group">
            <img 
              src={project.mainImage} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-widest border border-blue-500/50">
                {project.industry}
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold text-white mb-2 tracking-tight">{project.title}</h2>
              <p className="text-lg text-slate-300 max-w-2xl">{project.client}</p>
            </div>

            {/* Play Button Overlay (Simulated) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:divide-x divide-slate-100">
            
            {/* Left Column: Story */}
            <div className="lg:col-span-2 p-8 sm:p-12 space-y-12">
              
              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    The Challenge
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{project.challenge}</p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    The Solution
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{project.solution}</p>
                </div>
              </div>

              {/* Client Meeting Image Section */}
              <div className="rounded-2xl overflow-hidden relative group">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                    <Users className="w-3 h-3 text-blue-600" />
                    Partnership In Action
                </div>
                <img 
                    src={project.clientMeetingImage} 
                    alt="Team meeting with client" 
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white text-sm font-medium">Strategy Session: {project.client} HQ</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-6">
                    <Layers className="w-4 h-4 text-blue-600" />
                    Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-medium rounded-lg border border-slate-100">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>

            </div>

            {/* Right Column: Key Stats */}
            <div className="bg-slate-50/50 p-8 sm:p-12 lg:min-h-[600px] flex flex-col">
               <h4 className="font-bold text-slate-900 mb-8 text-lg">Impact Metrics</h4>
               
               <div className="space-y-6 mb-12">
                   {project.stats.map((stat, i) => (
                       <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                           <div className="text-4xl font-bold text-slate-900 mb-1 tracking-tight">{stat.value}</div>
                           <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                       </div>
                   ))}
               </div>

               <div className="mt-auto">
                    <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-xl shadow-blue-900/20">
                        <p className="font-medium text-lg mb-4">"Octopi Digital didn't just automate our process; they completely reinvented how we handle data."</p>
                        <div className="flex items-center gap-3 opacity-90">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                                CTO
                            </div>
                            <div className="text-sm font-bold">{project.client} Executive</div>
                        </div>
                    </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
