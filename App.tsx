import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { TechStack } from './components/TechStack';
import { ChatBot } from './components/ChatBot';
import { Footer } from './components/Footer';
import { ConsultationBar } from './components/ConsultationBar';
import { BookingModal } from './components/BookingModal';
import { ProjectGallery } from './components/ProjectGallery';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { ClientMeetings } from './components/ClientMeetings';
import { AboutUs } from './components/AboutUs';
import { Team } from './components/Team';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/DashboardStats';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Login } from './components/Login';
import { ContentManager } from './components/ContentManager';
import { BookingsManager } from './components/BookingsManager';
import { ChatManager } from './components/ChatManager';
import { Project, AppView, TeamMember, ClientImage, TechTool, AboutInfo } from './types';
import { api } from './services/api';
import { Loader2, Menu, ArrowUp } from 'lucide-react';

type ViewState = 'HOME' | 'PROJECTS' | 'PROJECT_DETAIL' | 'ADMIN' | 'PRIVACY' | 'TERMS';

const App: React.FC = () => {
  // Main Site State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [lastView, setLastView] = useState<ViewState>('HOME');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [clients, setClients] = useState<ClientImage[]>([]);
  const [techTools, setTechTools] = useState<TechTool[]>([]);
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Admin Dashboard State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); 
  const [adminView, setAdminView] = useState<AppView>(AppView.DASHBOARD);
  const [cmsSection, setCmsSection] = useState<string>('PROJECTS');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Scroll State
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track Visitor on Mount
  useEffect(() => {
    const trackVisitor = async () => {
      let visitorId = localStorage.getItem('odl_visitor_id');
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('odl_visitor_id', visitorId);
      }
      await api.stats.recordVisit(visitorId);
    };
    trackVisitor();
  }, []);

  // Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        const [projectsData, teamData, clientsData, techData, aboutData] = await Promise.all([
          api.projects.getAll(),
          api.team.getAll(),
          api.clients.getAll(),
          api.techStack.getAll(),
          api.about.get()
        ]);
        setProjects(projectsData);
        setTeamMembers(teamData);
        setClients(clientsData);
        setTechTools(techData);
        setAboutInfo(aboutData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  // Scroll to Top Listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation Handlers
  const handleOpenProject = (project: Project) => {
    setSelectedProjectId(project.id);
    setLastView(currentView);
    setCurrentView('PROJECT_DETAIL');
    window.scrollTo(0, 0);
  };

  const handleBackToProjectList = () => {
    setCurrentView(lastView);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setCurrentView('ADMIN');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: ViewState) => {
    setLastView(currentView);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleAdminNav = (view: AppView, section?: string) => {
    setAdminView(view);
    if (section) {
        setCmsSection(section);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId) || null;

  // Render Admin Dashboard
  if (currentView === 'ADMIN') {
    if (!isAdminAuthenticated) {
        return <Login onLogin={() => setIsAdminAuthenticated(true)} />;
    }

    return (
      <div className="min-h-screen bg-slate-950 text-white flex font-sans relative">
        <Sidebar 
          currentView={adminView} 
          cmsSection={cmsSection}
          onChangeView={handleAdminNav}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={() => setCurrentView('HOME')}
        />

        {/* Mobile Header for Admin */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950 border-b border-slate-800 z-30 flex items-center justify-between px-4">
            <span className="font-bold text-lg">Dashboard</span>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
        </div>
        
        <main className="flex-1 w-full md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto min-h-screen">
          {adminView === AppView.DASHBOARD && (
            <div className="animate-fade-in space-y-8 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
              </div>
              <DashboardStats projectsCount={projects.length} />
            </div>
          )}

          {adminView === AppView.BOOKINGS && (
             <BookingsManager />
          )}

          {adminView === AppView.CHATS && (
             <ChatManager />
          )}

          {adminView === AppView.CMS && (
             <ContentManager 
               activeTab={cmsSection}
               projects={projects} setProjects={setProjects}
               teamMembers={teamMembers} setTeamMembers={setTeamMembers}
               clients={clients} setClients={setClients}
               techTools={techTools} setTechTools={setTechTools}
               aboutInfo={aboutInfo} setAboutInfo={setAboutInfo}
             />
          )}
        </main>
      </div>
    );
  }

  // Render Public Website
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden font-sans">
      {/* Loading Screen */}
      {isLoadingData && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium animate-pulse">Connecting to server...</p>
        </div>
      )}

      {/* Modern Tech Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent"></div>
      </div>

      <main className="relative z-10">
        {/* Header Removed */}
        
        {currentView === 'HOME' && (
          <>
            <Hero />
            <ClientMeetings clients={clients} />
            <Services />
            <TechStack tools={techTools} />
            <CaseStudies 
              projects={projects}
              onViewAll={() => {
                setCurrentView('PROJECTS');
                window.scrollTo(0,0);
              }}
              onProjectClick={handleOpenProject}
            />
            <AboutUs info={aboutInfo} />
            <Team members={teamMembers} />
          </>
        )}

        {currentView === 'PROJECTS' && (
          <ProjectGallery 
            projects={projects}
            onBack={() => {
              setCurrentView('HOME');
              window.scrollTo(0,0);
            }} 
            onProjectClick={handleOpenProject}
          />
        )}

        {currentView === 'PROJECT_DETAIL' && selectedProject && (
          <ProjectDetailPage 
            project={selectedProject} 
            onBack={handleBackToProjectList}
          />
        )}

        {currentView === 'PRIVACY' && (
          <PrivacyPolicy onBack={() => handleNavigate('HOME')} />
        )}

        {currentView === 'TERMS' && (
          <TermsOfService onBack={() => handleNavigate('HOME')} />
        )}
      </main>
      
      {currentView !== 'PROJECT_DETAIL' && (
        <Footer onNavigate={handleNavigate} onLogin={handleLogin} agencyName={aboutInfo?.agencyName} />
      )}

      <ChatBot />
      <ConsultationBar onBook={() => setIsBookingOpen(true)} />
      
      {/* Scroll To Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-40 p-3 bg-white text-slate-900 rounded-full shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible translate-y-4'}`}
      >
         <ArrowUp className="w-5 h-5" />
      </button>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default App;
