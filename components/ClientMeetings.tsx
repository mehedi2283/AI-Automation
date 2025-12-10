import React from 'react';
import { ClientImage } from '../types';

interface ClientMeetingsProps {
  clients: ClientImage[];
}

export const ClientMeetings: React.FC<ClientMeetingsProps> = ({ clients }) => {
  // Fallback images if no dynamic data exists
  const fallbackImages = [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop",
  ];

  const displayClients = clients.length > 0 ? clients.map(c => c.imageUrl) : fallbackImages;

  return (
    <section className="py-20 bg-white overflow-hidden border-y border-slate-100">
      <style>{`
        @keyframes scroll-meetings {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-meetings {
          animation: scroll-meetings 60s linear infinite;
        }
        .pause-on-hover:hover .animate-scroll-meetings {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
          Trusted by <span className="text-blue-600">Global Clients</span>
        </h2>
        <p className="text-slate-500">
          Snapshots from real client meetings, showcasing authentic collaborations and lasting partnerships.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative w-full overflow-hidden pause-on-hover">
        {/* Gradient Fades */}
        <div className="absolute top-0 left-0 z-10 h-full w-24 md:w-64 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 z-10 h-full w-24 md:w-64 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

        <div className="flex w-max gap-8 animate-scroll-meetings">
            {/* Double the array to create seamless loop */}
            {[...displayClients, ...displayClients, ...displayClients].map((img, idx) => (
                <div 
                    key={idx}
                    className="
                        relative w-[300px] md:w-[400px] aspect-video 
                        rounded-2xl overflow-hidden 
                        border border-slate-200 shadow-xl shadow-slate-200/50
                        group cursor-default
                        transform hover:scale-105 transition-transform duration-500
                    "
                >
                    <img 
                        src={img} 
                        alt={`Client meeting ${idx}`} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* UI Simulation Overlay */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-900/80 border border-slate-600 backdrop-blur flex items-center justify-center">
                            <div className="w-3 h-4 border-l-2 border-r-2 border-white/50"></div>
                        </div>
                         <div className="w-8 h-8 rounded-full bg-red-500/90 border border-red-400 backdrop-blur flex items-center justify-center">
                           <div className="w-3 h-3 bg-white rounded-sm"></div>
                        </div>
                    </div>
                    
                    {/* Name Tag */}
                    <div className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 rounded-md text-xs font-bold text-slate-900 border border-white/50 shadow-sm">
                        Client Call #{idx + 1}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};