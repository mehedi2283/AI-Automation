import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectGalleryProps {
  projects: Project[];
  onBack: () => void;
  onProjectClick: (project: Project) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects, onBack, onProjectClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="py-32 min-h-screen bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
            <div>
              <button 
                onClick={onBack}
                className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </button>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
                All Projects
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-lg text-right hidden md:block">
              A complete archive of our engineering outcomes and automation success stories.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentProjects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer perspective-1000 animate-fade-in-up"
                style={{ animationFillMode: 'both' }}
                onClick={() => onProjectClick(project)}
              >
                <div className="relative rounded-[24px] overflow-hidden bg-slate-100 aspect-[4/5] shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-900/20 group-hover:-translate-y-2">
                  
                  {/* Image */}
                  <img 
                    src={project.mainImage} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    
                    {/* Floating Icon */}
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 border border-white/30">
                        <Maximize2 className="w-5 h-5 text-white" />
                    </div>

                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
                                {project.industry}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
                        <p className="text-slate-300 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {project.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white text-sm font-semibold group-hover:text-blue-400 transition-colors">
                                View Case Study <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <span className="text-slate-500 font-medium font-mono text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
    </section>
  );
};