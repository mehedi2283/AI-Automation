import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, MonitorPlay } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack }) => {
  // Combine images for slider
  const images = [
    project.mainImage,
    project.clientMeetingImage,
    project.extraImage
  ].filter(Boolean);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Helper to extract YouTube ID
  const getYoutubeId = (url: string | undefined) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(project.videoLink);
  const hasVideo = !!videoId;

  // Format Date
  const formattedDate = project.publishDate 
    ? new Date(project.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Sep 26, 2025';

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT COLUMN: Data & Content */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col order-2 lg:order-1 border-r border-slate-100">
          {/* Back Button */}
          <div className="mb-12">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Projects</span>
            </button>
          </div>

          <div className="space-y-12 max-w-xl">
            {/* Header */}
            <div>
               <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-2">
                 {project.title}
               </h1>
            </div>

            {/* Project Description */}
            <div>
                <h3 className="text-lg text-slate-500 mb-4 font-normal">Project description.</h3>
                <div className="text-slate-900 text-lg leading-relaxed space-y-6 font-light">
                    <p>{project.description}</p>
                    <p>{project.challenge}</p>
                    <p>{project.solution}</p>
                </div>
            </div>

            {/* Skills and deliverables */}
            <div>
                <h3 className="text-lg text-slate-500 mb-4 font-normal">Skills and deliverables</h3>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-slate-100 rounded-full text-sm text-slate-700 font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            
            {/* Footer Metadata */}
             <div className="pt-8 space-y-4">
                <div className="text-slate-400 text-sm">
                    Published on {formattedDate}
                </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Slider & Video */}
        <div className="w-full lg:w-1/2 bg-slate-50 p-8 lg:p-12 xl:p-16 flex flex-col gap-8 order-1 lg:order-2 lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto custom-scrollbar">
            
            {/* Image Slider */}
            <div>
                <div className="relative aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-200 group">
                    {/* Sliding Track */}
                    <div 
                        className="flex h-full transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {images.map((img, idx) => (
                            <div key={idx} className="min-w-full h-full">
                                <img 
                                    src={img} 
                                    alt={`Project preview ${idx + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    
                    {/* Controls */}
                    {images.length > 1 && (
                        <>
                            <button 
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-slate-900 transition-all shadow-md opacity-0 group-hover:opacity-100 z-10"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-slate-900 transition-all shadow-md opacity-0 group-hover:opacity-100 z-10"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                            {/* Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/80'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Video Section */}
            <div>
                {hasVideo ? (
                    isPlaying ? (
                        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-slate-200 animate-fade-in">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                                title="Project Video"
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        </div>
                    ) : (
                        <div 
                            onClick={() => setIsPlaying(true)}
                            className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-lg group cursor-pointer border border-slate-200 transition-transform duration-300 hover:scale-[1.01]"
                        >
                             <img 
                                src={project.videoPoster || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                                alt="Video thumbnail" 
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300 shadow-xl">
                                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="aspect-video bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                            <MonitorPlay className="w-6 h-6 opacity-40" />
                        </div>
                        <div className="text-center">
                            <p className="font-medium text-sm text-slate-500">No video uploaded</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};