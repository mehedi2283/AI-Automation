import React, { useState, useEffect } from 'react';
import { Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { TeamMember } from '../types';

interface TeamProps {
  members: TeamMember[];
}

export const Team: React.FC<TeamProps> = ({ members }) => {
  const [activeId, setActiveId] = useState<string | null>(members[0]?.id || null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation logic
  useEffect(() => {
    if (!members || members.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = members.findIndex(m => m.id === (currentId || members[0].id));
        const nextIndex = (currentIndex + 1) % members.length;
        return members[nextIndex].id;
      });
    }, 2000); // Rotates every 2 seconds

    return () => clearInterval(interval);
  }, [members, isPaused]);

  if (!members || members.length === 0) return null;

  const activeMember = members.find(m => m.id === activeId) || members[0];

  return (
    <section id="team" className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden relative">
      {/* Background Noise/Gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-24 md:mb-32">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Collective</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-lg md:text-xl font-light leading-relaxed">
                We are a multidisciplinary team of engineers, researchers, and strategists dedicated to the future of work.
            </p>
        </div>

        <div 
            className="flex flex-col lg:flex-row gap-12 lg:gap-24"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            
            {/* Sticky Image Area (Desktop) */}
            <div className="hidden lg:block w-5/12 relative">
                <div className="sticky top-32 w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-800 bg-slate-900">
                     {/* Image Transition */}
                     {members.map((member) => (
                         <img 
                            key={member.id}
                            src={member.image}
                            alt={member.name}
                            className={`
                                absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out
                                ${activeId === member.id ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}
                            `}
                         />
                     ))}

                     {/* Overlay Info on Image */}
                     <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <div className={`transform transition-all duration-500 ${activeMember ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            
                            {/* Glass Pill Role Badge - High Contrast */}
                            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/20">
                                {activeMember?.role}
                            </div>
                            
                            <p className="text-slate-200 text-sm line-clamp-3 leading-relaxed mb-6">{activeMember?.bio}</p>
                            
                            <div className="flex gap-4">
                                {activeMember?.socials?.linkedin && (
                                    <a href={activeMember.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md border border-white/10">
                                        <Linkedin className="w-5 h-5 text-white" />
                                    </a>
                                )}
                                {activeMember?.socials?.twitter && (
                                    <a href={activeMember.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md border border-white/10">
                                        <Instagram className="w-5 h-5 text-white" />
                                    </a>
                                )}
                            </div>
                        </div>
                     </div>
                </div>
            </div>

            {/* List Area */}
            <div className="w-full lg:w-7/12 flex flex-col">
                {members.map((member, idx) => (
                    <div 
                        key={member.id}
                        onMouseEnter={() => setActiveId(member.id)}
                        className={`
                            group relative py-8 md:py-12 border-b border-slate-800 cursor-pointer transition-all duration-500
                            ${activeId === member.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'}
                        `}
                    >
                        <div className="flex items-baseline justify-between gap-4 mb-2 md:mb-4">
                            <h3 className="text-3xl md:text-6xl font-bold text-white group-hover:translate-x-4 transition-transform duration-500">
                                {member.name}
                            </h3>
                            <span className="text-xs md:text-sm font-mono text-blue-500 shrink-0">
                                0{idx + 1}
                            </span>
                        </div>
                        
                        <div className="flex justify-between items-center md:items-end">
                             {/* Note: Role is displayed in the sticky image area on desktop, so we keep it subtle here or remove it if redundant. 
                                 Keeping it for list context but making it lighter. */}
                             <p className="text-base md:text-xl text-slate-400 font-light group-hover:text-blue-200 transition-colors group-hover:translate-x-4 duration-500 delay-75">
                                {member.role}
                            </p>
                            <ArrowUpRight className={`hidden md:block w-8 h-8 text-blue-500 transition-transform duration-500 ${activeId === member.id ? 'rotate-45 scale-110' : 'rotate-0 scale-0'}`} />
                        </div>

                        {/* Mobile Only Details Accordion */}
                        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${activeId === member.id ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                            <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                
                                {/* Mobile Glass Pill Role Badge - High Contrast */}
                                <div className="absolute bottom-4 left-4">
                                     <div className="inline-block px-3 py-1 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-black/20">
                                        {member.role}
                                     </div>
                                </div>
                            </div>
                            <p className="text-slate-300 text-sm mb-6 leading-relaxed">{member.bio}</p>
                            <div className="flex gap-4">
                                {member.socials?.linkedin && (
                                    <a href={member.socials.linkedin} className="p-2 bg-slate-800 rounded-lg text-white hover:bg-blue-600 transition-colors">
                                        <Linkedin className="w-5 h-5"/>
                                    </a>
                                )}
                                {member.socials?.twitter && (
                                    <a href={member.socials.twitter} className="p-2 bg-slate-800 rounded-lg text-white hover:bg-pink-600 transition-colors">
                                        <Instagram className="w-5 h-5"/>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
      </div>
    </section>
  );
};