import React from 'react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { Project } from '../types';

interface CaseStudiesProps {
  projects: Project[];
  onViewAll: () => void;
  onProjectClick: (project: Project) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ projects, onViewAll, onProjectClick }) => {
  // Show only the first 3 projects on the home page
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="work" className="py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4 block">Selected Works</span>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[0.95]">
                Proven Results.
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-lg leading-relaxed text-right hidden md:block">
              We don't just build software.<br/> We engineer business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer perspective-1000"
                onClick={() => onProjectClick(project)}
              >
                <div className="relative rounded-[24px] overflow-hidden bg-slate-100 aspect-[4/5] shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-900/20 group-hover:-translate-y-2">
                  
                  {/* Image/Video Container */}
                  <img 
                    src={project.mainImage} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    
                    {/* Floating Action Button */}
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

          <div className="mt-16 text-center">
             <button 
                onClick={onViewAll}
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-all duration-300 hover:-translate-y-0.5"
             >
                View All Projects <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
    </section>
  );
};