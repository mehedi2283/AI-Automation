import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Project, TeamMember, ClientImage, TechTool, AboutInfo } from '../types';
import { 
  Plus, Edit2, Trash2, Save, Loader2, GripVertical, Image as ImageIcon, 
  AlertTriangle, ChevronLeft, ChevronRight, Video, Star, Calendar, 
  Users, Layers, Info, ChevronDown, Lock, PenTool,
  // Tech Icons
  Database, Zap, Code, Mail, Phone, Globe, Cpu, Workflow, MessageSquare, Link, Bot, Activity, Box, Mic
} from 'lucide-react';
import { api } from '../services/api';

// --- Constants ---
const ROW_HEIGHT = 100; // Fixed height for list items to ensure perfect math for DnD
const GUTTER = 16;      // Gap between items

const TECH_CATEGORIES = [
  "CRM & Marketing Platforms",
  "Third Party Integrations",
  "AI Voice Agent Setup",
  "Backend Infrastructure",
  "Frontend Frameworks",
  "Data & Analytics",
  "General"
];

const IconMap: Record<string, any> = {
  Database, Zap, Code, Mail, Phone, Globe, Cpu, Workflow, Layers, MessageSquare, Link, Bot, Activity, Box, Mic
};

// --- Helper Components ---

const CustomSelect = ({ value, onChange, options, placeholder }: { value: string, onChange: (val: string) => void, options: string[], placeholder: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={containerRef}>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-slate-950 border rounded-lg px-3 py-3 text-white cursor-pointer flex items-center justify-between transition-colors ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-slate-700 hover:border-slate-600'}`}
            >
                <span className={value ? "text-white" : "text-slate-500"}>{value || placeholder}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map((opt) => (
                            <div 
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className={`px-4 py-3 text-sm cursor-pointer transition-colors ${value === opt ? 'bg-blue-600/20 text-blue-400 font-medium' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const CustomDatePicker = ({ value, onChange }: { value: string, onChange: (date: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const safeDate = value ? new Date(value) : new Date();
  const [viewDate, setViewDate] = useState(isNaN(safeDate.getTime()) ? new Date() : safeDate);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const handleDayClick = (day: number) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(d.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const displayValue = value ? new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  return (
    <div className="relative w-full" ref={containerRef}>
        <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full bg-slate-950 border rounded-lg px-3 py-3 text-white cursor-pointer flex items-center justify-between ${isOpen ? 'border-blue-500' : 'border-slate-700'}`}
        >
            <span className={displayValue ? "text-white" : "text-slate-500"}>{displayValue || "Select date..."}</span>
            <Calendar className={`w-4 h-4 ${isOpen ? 'text-blue-500' : 'text-slate-400'}`} />
        </div>
        {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-[300px] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-4">
                <div className="flex justify-between mb-4 text-white font-bold">
                    <button onClick={() => changeMonth(-1)}><ChevronLeft className="w-4 h-4"/></button>
                    <span>{months[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
                    <button onClick={() => changeMonth(1)}><ChevronRight className="w-4 h-4"/></button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-center text-xs text-slate-500">{d}</div>)}
                    {[...Array(firstDay)].map((_, i) => <div key={`e-${i}`} />)}
                    {[...Array(getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()))].map((_, i) => (
                        <button key={i} onClick={() => handleDayClick(i + 1)} className={`h-8 w-8 rounded text-sm ${value === new Date(viewDate.getFullYear(), viewDate.getMonth(), i+1).toISOString().split('T')[0] ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>{i + 1}</button>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

interface ContentManagerProps {
  activeTab: string;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  clients: ClientImage[];
  setClients: React.Dispatch<React.SetStateAction<ClientImage[]>>;
  techTools: TechTool[];
  setTechTools: React.Dispatch<React.SetStateAction<TechTool[]>>;
  aboutInfo: AboutInfo | null;
  setAboutInfo: React.Dispatch<React.SetStateAction<AboutInfo | null>>;
}

export const ContentManager: React.FC<ContentManagerProps> = ({ 
  activeTab, projects, setProjects, teamMembers, setTeamMembers, clients, setClients, techTools, setTechTools, aboutInfo, setAboutInfo
}) => {
  // --- View State ---
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- Form States ---
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingTool, setEditingTool] = useState<TechTool | null>(null);
  
  // --- Quick Add State (Clients) ---
  const [newClientName, setNewClientName] = useState('');
  const [newClientUrl, setNewClientUrl] = useState('');

  // --- About Info Local State ---
  const [localAbout, setLocalAbout] = useState<AboutInfo>({
      id: 'default',
      bio: '',
      totalProjects: '0',
      hoursLogged: '0',
      agencyName: 'AgencyAI',
      adminPassword: 'admin123',
      achievements: []
  });

  // Load About Info into local state
  useEffect(() => {
      if (aboutInfo) setLocalAbout(aboutInfo);
  }, [aboutInfo]);

  // --- Delete Modal State ---
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null; type: string | null; title: string; message: string }>({ 
    isOpen: false, id: null, type: null, title: '', message: '' 
  });

  // --- CUSTOM DRAG STATE ---
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isDropping, setIsDropping] = useState(false); // Controls the "drop" animation phase
  
  // Static drag data that doesn't trigger re-renders
  const dragOriginRef = useRef({
      originalTop: 0,
      originalLeft: 0,
      width: 0,
      height: 0,
      mouseOffsetY: 0
  });

  // Visual drag state (triggers re-render)
  const [dragState, setDragState] = useState({
      originalTop: 0,
      originalLeft: 0,
      width: 0,
      height: 0,
      mouseOffsetY: 0,
      currentMouseY: 0
  });

  // Refs
  const draggingIdRef = useRef<string | null>(null);
  const projectsRef = useRef<Project[]>(projects);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { projectsRef.current = projects; }, [projects]);
  useEffect(() => { 
      setCurrentPage(1); 
      setIsEditing(false); 
      setEditingMember(null);
      setEditingTool(null);
  }, [activeTab]);

  // --- DRAG HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
      if ((e.target as HTMLElement).closest('button')) return;
      if (isDropping) return;
      
      e.preventDefault(); 
      
      const el = (e.currentTarget as HTMLElement);
      const rect = el.getBoundingClientRect();
      const mouseOffsetY = e.clientY - rect.top;
      
      dragOriginRef.current = {
          originalTop: rect.top,
          originalLeft: rect.left,
          width: rect.width,
          height: rect.height,
          mouseOffsetY: mouseOffsetY
      };

      setDragState({
          originalTop: rect.top,
          originalLeft: rect.left,
          width: rect.width,
          height: rect.height,
          mouseOffsetY: mouseOffsetY,
          currentMouseY: e.clientY
      });
      
      setDraggingId(id);
      draggingIdRef.current = id;
      setIsDropping(false);

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
      const draggedId = draggingIdRef.current;
      if (!draggedId || !containerRef.current) return;

      setDragState(prev => ({ ...prev, currentMouseY: e.clientY }));

      const containerRect = containerRef.current.getBoundingClientRect();
      const { mouseOffsetY, height } = dragOriginRef.current;
      
      const ghostTop = e.clientY - mouseOffsetY;
      const ghostCenterY = ghostTop + (height / 2);
      const relativeCenterY = ghostCenterY - containerRect.top;
      
      let targetVisibleIndex = Math.floor(relativeCenterY / ROW_HEIGHT);
      
      const currentProjects = projectsRef.current;
      const pageStart = (currentPage - 1) * itemsPerPage;
      const pageEnd = Math.min(pageStart + itemsPerPage, currentProjects.length);
      const visibleCount = pageEnd - pageStart;

      if (targetVisibleIndex < 0) targetVisibleIndex = 0;
      if (targetVisibleIndex >= visibleCount) targetVisibleIndex = visibleCount - 1;

      const absoluteTargetIndex = pageStart + targetVisibleIndex;
      const currentIndex = currentProjects.findIndex(p => p.id === draggedId);

      if (currentIndex !== -1 && currentIndex !== absoluteTargetIndex) {
          const newOrder = [...currentProjects];
          const [movedItem] = newOrder.splice(currentIndex, 1);
          newOrder.splice(absoluteTargetIndex, 0, movedItem);
          
          setProjects(newOrder);
          projectsRef.current = newOrder;
      }
  }, [currentPage, itemsPerPage]);

  const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setIsDropping(true);
      setTimeout(() => {
          setIsDropping(false);
          setDraggingId(null);
          draggingIdRef.current = null;
          saveOrder(); 
      }, 300);
  };
  
  const saveOrder = async () => {
      try {
          const currentList = projectsRef.current;
          await api.projects.reorder(currentList.map((p, idx) => ({ id: p.id, order: idx })));
      } catch (e) { console.error("Failed to save order", e); }
  };

  const paginate = (items: any[]) => items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- CRUD ACTIONS ---
  
  // Projects
  const handleSaveProject = async () => {
     if(!editingProject) return;
     setIsSaving(true);
     try {
         const exists = projects.find(p => p.id === editingProject.id);
         const saved = exists ? await api.projects.update(editingProject.id, editingProject) : await api.projects.create(editingProject);
         setProjects(prev => exists ? prev.map(p => p.id === saved.id ? saved : p) : [saved, ...prev]);
         setIsEditing(false);
     } catch(e) { alert("Error saving"); } finally { setIsSaving(false); }
  };

  // Team
  const handleSaveMember = async () => {
      if(!editingMember) return;
      setIsSaving(true);
      try {
          const exists = teamMembers.find(t => t.id === editingMember.id);
          const saved = exists ? await api.team.update(editingMember.id, editingMember) : await api.team.create(editingMember);
          setTeamMembers(prev => exists ? prev.map(t => t.id === saved.id ? saved : t) : [...prev, saved]);
          setEditingMember(null);
      } catch(e) { alert("Error saving team member"); } finally { setIsSaving(false); }
  };

  // Tech
  const handleSaveTool = async () => {
      if(!editingTool) return;
      setIsSaving(true);
      try {
          const exists = techTools.find(t => t.id === editingTool.id);
          const saved = exists ? await api.techStack.update(editingTool.id, editingTool) : await api.techStack.create(editingTool);
          setTechTools(prev => exists ? prev.map(t => t.id === saved.id ? saved : t) : [...prev, saved]);
          setEditingTool(null);
      } catch(e) { alert("Error saving tool"); } finally { setIsSaving(false); }
  };

  // About
  const handleSaveAbout = async () => {
      setIsSaving(true);
      try {
          const saved = await api.about.update(localAbout);
          setAboutInfo(saved);
          alert("Updated successfully!");
      } catch(e) { alert("Error updating info"); } finally { setIsSaving(false); }
  };

  // Generic Delete
  const handleConfirmDelete = async () => {
      setIsSaving(true);
      try {
          if (deleteConfirm.type === 'PROJECT') {
              await api.projects.delete(deleteConfirm.id!);
              setProjects(prev => prev.filter(p => p.id !== deleteConfirm.id));
          } else if (deleteConfirm.type === 'TEAM') {
              await api.team.delete(deleteConfirm.id!);
              setTeamMembers(prev => prev.filter(t => t.id !== deleteConfirm.id));
          } else if (deleteConfirm.type === 'TECH') {
              await api.techStack.delete(deleteConfirm.id!);
              setTechTools(prev => prev.filter(t => t.id !== deleteConfirm.id));
          } else if (deleteConfirm.type === 'CLIENT') {
              await api.clients.delete(deleteConfirm.id!);
              setClients(prev => prev.filter(c => c.id !== deleteConfirm.id));
          }
          setDeleteConfirm({...deleteConfirm, isOpen: false});
      } catch(e) { alert("Failed to delete"); } finally { setIsSaving(false); }
  };


  // --- MAIN RENDER ---

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
        <style>{`
            @keyframes popUp {
                0% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
                100% { transform: scale(1.05); box-shadow: 0 20px 60px -15px rgba(59,130,246,0.5); }
            }
        `}</style>

        {/* --- Global Delete Modal --- */}
        {deleteConfirm.isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setDeleteConfirm({...deleteConfirm, isOpen: false})}/>
                <div className="relative bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-sm w-full animate-fade-in-up">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><AlertTriangle className="text-red-500"/> Confirm Delete</h3>
                    <p className="text-slate-400 mb-6">{deleteConfirm.message}</p>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setDeleteConfirm({...deleteConfirm, isOpen: false})} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">Cancel</button>
                        <button onClick={handleConfirmDelete} disabled={isSaving} className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin"/> : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* --- TAB: PROJECTS --- */}
        {activeTab === 'PROJECTS' && (
            <>
                {isEditing && editingProject ? (
                    // PROJECT EDITOR
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-fade-in">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Edit Project</h2>
                            <div className="flex gap-2">
                                <button onClick={() => setIsEditing(false)} className="px-4 text-slate-400">Cancel</button>
                                <button onClick={handleSaveProject} disabled={isSaving} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2">{isSaving && <Loader2 className="w-4 h-4 animate-spin"/>} Save</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
                                <span className="text-white font-bold flex gap-2"><Star className={`w-4 h-4 ${editingProject.isFeatured ? 'text-yellow-400 fill-yellow-400' : 'text-slate-400'}`}/> Featured Project</span>
                                <button onClick={() => setEditingProject({...editingProject, isFeatured: !editingProject.isFeatured})} className={`w-12 h-6 rounded-full relative transition-colors ${editingProject.isFeatured ? 'bg-blue-600' : 'bg-slate-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editingProject.isFeatured ? 'left-7' : 'left-1'}`}/>
                                </button>
                            </div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Title</label><input value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Industry</label><input value={editingProject.industry} onChange={e => setEditingProject({...editingProject, industry: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Client</label><input value={editingProject.client} onChange={e => setEditingProject({...editingProject, client: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Date</label><CustomDatePicker value={editingProject.publishDate || ''} onChange={d => setEditingProject({...editingProject, publishDate: d})}/></div>
                            <div className="col-span-2 space-y-2"><label className="text-slate-400 text-sm">Description</label><textarea value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white h-24"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Main Image</label><input value={editingProject.mainImage} onChange={e => setEditingProject({...editingProject, mainImage: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Meeting Image</label><input value={editingProject.clientMeetingImage} onChange={e => setEditingProject({...editingProject, clientMeetingImage: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Extra Image</label><input value={editingProject.extraImage || ''} onChange={e => setEditingProject({...editingProject, extraImage: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Video URL</label><input value={editingProject.videoLink || ''} onChange={e => setEditingProject({...editingProject, videoLink: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="col-span-2 space-y-2"><label className="text-slate-400 text-sm">Challenge</label><textarea value={editingProject.challenge} onChange={e => setEditingProject({...editingProject, challenge: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white h-24"/></div>
                            <div className="col-span-2 space-y-2"><label className="text-slate-400 text-sm">Solution</label><textarea value={editingProject.solution} onChange={e => setEditingProject({...editingProject, solution: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white h-24"/></div>
                        </div>
                    </div>
                ) : (
                    // PROJECT LIST (Draggable)
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Project List</h2>
                            <button onClick={() => { 
                                setEditingProject({ id: crypto.randomUUID(), title: "New Project", client: "", industry: "", description: "", challenge: "", solution: "", stats: [], tags: [], mainImage: "", clientMeetingImage: "", videoPoster: "", videoLink: "", extraImage: "", publishDate: new Date().toISOString().split('T')[0], isFeatured: false }); 
                                setIsEditing(true); 
                            }} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-blue-500"><Plus className="w-4 h-4"/> Add Project</button>
                        </div>
                        <div 
                            className="relative w-full"
                            ref={containerRef}
                            style={{ height: paginate(projects).length * ROW_HEIGHT }}
                        >
                            {paginate(projects).map((project, index) => {
                                const isBeingDragged = project.id === draggingId;
                                const pageIndex = (currentPage - 1) * itemsPerPage + index;
                                const topPos = index * ROW_HEIGHT;

                                return (
                                    <div 
                                        key={project.id}
                                        onMouseDown={(e) => handleMouseDown(e, project.id)}
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: 0, right: 0,
                                            height: ROW_HEIGHT - GUTTER,
                                            transform: `translate3d(0, ${topPos}px, 0)`,
                                            transition: 'transform 0.3s ease-out',
                                            zIndex: isBeingDragged ? 0 : 1,
                                            willChange: 'transform'
                                        }}
                                        className={`
                                            flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4
                                            cursor-grab active:cursor-grabbing select-none group
                                            ${isBeingDragged ? 'opacity-0' : 'hover:border-slate-700 shadow-sm'}
                                        `}
                                    >
                                        <div className="text-slate-600 group-hover:text-white transition-colors"><GripVertical className="w-5 h-5"/></div>
                                        <div className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm">{pageIndex + 1}</div>
                                        <img src={project.mainImage} className="w-16 h-12 object-cover rounded bg-slate-800 border border-slate-800" alt=""/>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-white font-bold truncate">{project.title}</h3>
                                                {project.isFeatured && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500"/>}
                                            </div>
                                            <p className="text-slate-400 text-xs truncate">{project.client}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setEditingProject(project); setIsEditing(true); }} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg"><Edit2 className="w-4 h-4"/></button>
                                            <button onClick={() => setDeleteConfirm({ isOpen: true, id: project.id, type: 'PROJECT', title: 'Delete Project', message: 'Delete this project?' })} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                                        </div>
                                    </div>
                                );
                            })}
                            
                             {/* Drag Ghost */}
                             {draggingId && projects.find(p => p.id === draggingId) && (
                                <div 
                                    className="fixed z-[9999] flex items-center gap-4 border border-blue-500/50 rounded-xl p-4 pointer-events-none cursor-grabbing"
                                    style={{ 
                                        top: isDropping ? (projects.findIndex(p => p.id === draggingId) % itemsPerPage) * ROW_HEIGHT + (containerRef.current?.getBoundingClientRect().top || 0) : dragState.currentMouseY - dragState.mouseOffsetY,
                                        left: dragState.originalLeft,
                                        width: dragState.width,
                                        height: dragState.height,
                                        backgroundColor: 'rgb(2, 6, 23)',
                                        animation: isDropping ? 'none' : 'popUp 0.2s cubic-bezier(0.2, 0, 0, 1) forwards',
                                        transform: isDropping ? 'scale(1)' : undefined, 
                                        transition: isDropping ? 'all 0.3s ease-out' : 'none', 
                                    }}
                                >
                                    <div className="text-blue-500"><GripVertical className="w-5 h-5"/></div>
                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white border border-blue-400 flex items-center justify-center font-bold text-sm scale-110">{projects.findIndex(p => p.id === draggingId) + 1}</div>
                                    <img src={projects.find(p => p.id === draggingId)?.mainImage} className="w-16 h-12 object-cover rounded bg-slate-800 border border-slate-800" alt=""/>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-white font-bold truncate">{projects.find(p => p.id === draggingId)?.title}</h3>
                                        </div>
                                    </div>
                                </div>
                             )}
                        </div>
                        {Math.ceil(projects.length / itemsPerPage) > 1 && (
                            <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-slate-800">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage===1} className="p-2 bg-slate-800 rounded hover:bg-slate-700 text-white disabled:opacity-50"><ChevronLeft className="w-5 h-5"/></button>
                                <span className="text-slate-400 py-2">Page <span className="text-white">{currentPage}</span></span>
                                <button onClick={() => setCurrentPage(p => Math.min(Math.ceil(projects.length/itemsPerPage), p+1))} disabled={currentPage===Math.ceil(projects.length/itemsPerPage)} className="p-2 bg-slate-800 rounded hover:bg-slate-700 text-white disabled:opacity-50"><ChevronRight className="w-5 h-5"/></button>
                            </div>
                        )}
                    </>
                )}
            </>
        )}

        {/* --- TAB: CLIENTS --- */}
        {activeTab === 'CLIENTS' && (
            <>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
                  <h3 className="text-white font-bold mb-4">Add Client</h3>
                  <div className="flex gap-4">
                      <input value={newClientName} onChange={e => setNewClientName(e.target.value)} placeholder="Client Name" className="bg-slate-950 border border-slate-700 rounded-lg p-3 text-white flex-1"/>
                      <input value={newClientUrl} onChange={e => setNewClientUrl(e.target.value)} placeholder="Logo URL" className="bg-slate-950 border border-slate-700 rounded-lg p-3 text-white flex-[2]"/>
                      <button onClick={async () => {
                          if(!newClientUrl) return;
                          setIsSaving(true);
                          try {
                              const saved = await api.clients.create({ id: crypto.randomUUID(), name: newClientName || "Client", imageUrl: newClientUrl });
                              setClients(prev => [saved, ...prev]);
                              setNewClientName(''); setNewClientUrl('');
                          } catch(e) { alert("Error"); } finally { setIsSaving(false); }
                      }} disabled={isSaving} className="px-6 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500">Add</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {clients.map(c => (
                      <div key={c.id} className="group relative aspect-video bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                          <img src={c.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt=""/>
                          <button onClick={() => {
                              setDeleteConfirm({
                                isOpen: true,
                                id: c.id,
                                type: 'CLIENT',
                                title: 'Delete Client Image',
                                message: `Are you sure you want to delete ${c.name || 'this image'}?`
                              });
                          }} className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4"/></button>
                          <div className="absolute bottom-2 left-2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">{c.name}</div>
                      </div>
                  ))}
                </div>
            </>
        )}

        {/* --- TAB: TEAM --- */}
        {activeTab === 'TEAM' && (
            <>
                {editingMember ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-fade-in">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Edit Team Member</h2>
                            <div className="flex gap-2">
                                <button onClick={() => setEditingMember(null)} className="px-4 text-slate-400">Cancel</button>
                                <button onClick={handleSaveMember} disabled={isSaving} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2">{isSaving && <Loader2 className="w-4 h-4 animate-spin"/>} Save</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Name</label><input value={editingMember.name} onChange={e => setEditingMember({...editingMember, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Role</label><input value={editingMember.role} onChange={e => setEditingMember({...editingMember, role: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="col-span-1 md:col-span-2 space-y-2"><label className="text-slate-400 text-sm">Image URL</label><input value={editingMember.image} onChange={e => setEditingMember({...editingMember, image: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="col-span-1 md:col-span-2 space-y-2"><label className="text-slate-400 text-sm">Bio</label><textarea value={editingMember.bio} onChange={e => setEditingMember({...editingMember, bio: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white h-24"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">LinkedIn URL</label><input value={editingMember.socials?.linkedin || ''} onChange={e => setEditingMember({...editingMember, socials: {...editingMember.socials, linkedin: e.target.value}})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Instagram URL</label><input value={editingMember.socials?.twitter || ''} onChange={e => setEditingMember({...editingMember, socials: {...editingMember.socials, twitter: e.target.value}})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Team Members</h2>
                            <button onClick={() => setEditingMember({ id: crypto.randomUUID(), name: '', role: '', image: '', bio: '', socials: {} })} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-blue-500"><Plus className="w-4 h-4"/> Add Member</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teamMembers.map(member => (
                                <div key={member.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4 group hover:border-slate-700">
                                    <div className="flex items-start justify-between">
                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover"/>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditingMember(member)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded"><Edit2 className="w-4 h-4"/></button>
                                            <button onClick={() => setDeleteConfirm({ isOpen: true, id: member.id, type: 'TEAM', title: 'Delete Member', message: `Remove ${member.name}?` })} className="p-2 text-red-500 hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4"/></button>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{member.name}</h3>
                                        <p className="text-blue-500 text-sm font-medium">{member.role}</p>
                                    </div>
                                    <p className="text-slate-400 text-sm line-clamp-2">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </>
        )}

        {/* --- TAB: TECH --- */}
        {activeTab === 'TECH' && (
            <>
                {editingTool ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-fade-in">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Edit Tech Tool</h2>
                            <div className="flex gap-2">
                                <button onClick={() => setEditingTool(null)} className="px-4 text-slate-400">Cancel</button>
                                <button onClick={handleSaveTool} disabled={isSaving} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2">{isSaving && <Loader2 className="w-4 h-4 animate-spin"/>} Save</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Tool Name</label><input value={editingTool.name} onChange={e => setEditingTool({...editingTool, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="space-y-2">
                                <label className="text-slate-400 text-sm">Category</label>
                                <CustomSelect 
                                    value={editingTool.category} 
                                    onChange={(val) => setEditingTool({...editingTool, category: val})}
                                    options={TECH_CATEGORIES}
                                    placeholder="Select Category"
                                />
                            </div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Icon Name (Lucide) or URL</label><input value={editingTool.iconName} onChange={e => setEditingTool({...editingTool, iconName: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"/></div>
                            <div className="space-y-2"><label className="text-slate-400 text-sm">Color Class (Tailwind)</label><input value={editingTool.colorClass} onChange={e => setEditingTool({...editingTool, colorClass: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white" placeholder="e.g. text-blue-600"/></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
                            <button onClick={() => setEditingTool({ id: crypto.randomUUID(), name: '', category: 'General', iconName: 'Box', colorClass: 'text-slate-500' })} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-blue-500"><Plus className="w-4 h-4"/> Add Tool</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {techTools.map(tool => {
                                const isUrl = tool.iconName && (tool.iconName.startsWith('http') || tool.iconName.startsWith('/'));
                                const Icon = !isUrl ? (IconMap[tool.iconName] || Box) : null;
                                return (
                                    <div key={tool.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center gap-3 group hover:border-slate-700 relative">
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                            <button onClick={() => setEditingTool(tool)} className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-500"><Edit2 className="w-3 h-3"/></button>
                                            <button onClick={() => setDeleteConfirm({ isOpen: true, id: tool.id, type: 'TECH', title: 'Delete Tool', message: `Remove ${tool.name}?` })} className="p-1.5 bg-red-600 text-white rounded hover:bg-red-500"><Trash2 className="w-3 h-3"/></button>
                                        </div>
                                        <div className={`w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center ${tool.colorClass} overflow-hidden`}>
                                            {isUrl ? (
                                                <img src={tool.iconName} alt={tool.name} className="w-6 h-6 object-contain" />
                                            ) : (
                                                <Icon className="w-5 h-5"/>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <div className="text-white font-bold text-sm">{tool.name}</div>
                                            <div className="text-slate-500 text-xs truncate max-w-[100px]">{tool.category}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </>
        )}

        {/* --- TAB: ABOUT --- */}
        {activeTab === 'ABOUT' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
                    <Info className="w-8 h-8 text-blue-500" />
                    <div>
                        <h2 className="text-2xl font-bold text-white">Company Info & Settings</h2>
                        <p className="text-slate-400 text-sm">Manage company details and admin credentials</p>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-slate-400 text-sm mb-2 font-bold flex items-center gap-2"><PenTool className="w-3 h-3"/> Agency Name</label>
                            <input 
                                value={localAbout.agencyName} 
                                onChange={e => setLocalAbout({...localAbout, agencyName: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-2 font-bold flex items-center gap-2"><Lock className="w-3 h-3"/> Admin Password</label>
                            <input 
                                value={localAbout.adminPassword} 
                                onChange={e => setLocalAbout({...localAbout, adminPassword: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono"
                                type="text"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-400 text-sm mb-2 font-bold">Company Bio</label>
                        <textarea 
                            value={localAbout.bio} 
                            onChange={e => setLocalAbout({...localAbout, bio: e.target.value})} 
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white h-40 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                            placeholder="Enter company biography..."
                        />
                        <p className="text-xs text-slate-500 mt-2">This text appears in the main About Us section.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-slate-400 text-sm mb-2 font-bold">Total Projects</label>
                            <input 
                                value={localAbout.totalProjects} 
                                onChange={e => setLocalAbout({...localAbout, totalProjects: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-2 font-bold">Hours Logged</label>
                            <input 
                                value={localAbout.hoursLogged} 
                                onChange={e => setLocalAbout({...localAbout, hoursLogged: e.target.value})} 
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800 flex justify-end">
                        <button 
                            onClick={handleSaveAbout} 
                            disabled={isSaving} 
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20"
                        >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5"/>}
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};