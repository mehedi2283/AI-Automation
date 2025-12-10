import React, { useEffect, useState } from 'react';
import { MessageSquare, User, Bot, Clock, Search, ChevronRight, Loader2, Calendar, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import { ChatSession } from '../types';

export const ChatManager: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await api.chats.getAll();
        setSessions(data);
        // Do not auto-select on mobile to show list first
        if (data.length > 0 && !selectedSessionId && window.innerWidth >= 768) {
            setSelectedSessionId(data[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch chats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  const filteredSessions = sessions.filter(s => 
      s.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.messages.some(m => {
          const content = typeof m.data === 'string' ? m.data : JSON.stringify(m.data);
          return content.toLowerCase().includes(searchTerm.toLowerCase());
      })
  );

  const selectedSession = sessions.find(s => s._id === selectedSessionId);

  // Helper to extract text content safely from the dynamic `data` field
  const getMessageContent = (msg: any) => {
    if (!msg.data) return '';
    let data = msg.data;

    // If data is a JSON string, try to parse it first
    if (typeof data === 'string') {
        try {
            const parsed = JSON.parse(data);
            data = parsed;
        } catch (e) {
            // It's just a regular string
            return data;
        }
    }

    // Now handle object structure
    if (typeof data === 'object' && data !== null) {
        if (data.content) return data.content;
        if (data.message) return data.message;
        if (data.text) return data.text;
        if (data.output) return data.output;
        // If it's an object but no known text field, return formatted JSON
        return JSON.stringify(data, null, 2);
    }
    
    return String(data);
  };

  const getLastMessage = (session: ChatSession) => {
      if (!session.messages || session.messages.length === 0) return 'No messages';
      const last = session.messages[session.messages.length - 1];
      const text = getMessageContent(last);
      return text.length > 50 ? text.substring(0, 50) + '...' : text;
  };

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-blue-500 gap-4">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="text-slate-400 font-medium">Loading conversation history...</p>
          </div>
      );
  }

  return (
    <div className="flex h-[calc(100vh-140px)] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in relative">
        
        {/* Sidebar List */}
        <div className={`
            w-full md:w-80 border-r border-slate-800 flex flex-col bg-slate-950 absolute md:relative inset-0 z-10 transition-transform duration-300
            ${selectedSessionId ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
        `}>
            <div className="p-4 border-b border-slate-800">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    Live Chats <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full">{filteredSessions.length}</span>
                </h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search sessions..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-600 transition-colors"
                    />
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredSessions.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">
                        No chats found.
                    </div>
                ) : (
                    filteredSessions.map((session, index) => (
                        <div 
                            key={session._id}
                            onClick={() => setSelectedSessionId(session._id)}
                            className={`p-4 border-b border-slate-800/50 cursor-pointer transition-colors hover:bg-slate-900 ${selectedSessionId === session._id ? 'bg-slate-900 border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-bold text-slate-200 truncate max-w-[140px]" title={session.sessionId}>
                                    Visitor #{filteredSessions.length - index}
                                </span>
                                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(session.updatedAt || new Date()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-2">
                                {getLastMessage(session)}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>

        {/* Chat Detail View */}
        <div className="flex-1 flex flex-col bg-slate-900 w-full h-full relative z-0">
            {selectedSession ? (
                <>
                    {/* Header */}
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setSelectedSessionId(null)}
                                className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h2 className="text-white font-bold flex items-center gap-2">
                                    <User className="w-4 h-4 text-slate-400" />
                                    Visitor #{sessions.findIndex(s => s._id === selectedSession._id) !== -1 ? sessions.length - sessions.findIndex(s => s._id === selectedSession._id) : 'Unknown'}
                                </h2>
                                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 truncate max-w-[200px]" title={selectedSession.sessionId}>
                                    <span className="opacity-50">ID: {selectedSession.sessionId}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                                Active
                            </div>
                            <span className="text-[10px] text-slate-500 mt-1">
                                {new Date(selectedSession.createdAt || new Date()).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-900">
                        {selectedSession.messages.map((msg, idx) => {
                            const isAi = msg.type === 'ai';
                            const content = getMessageContent(msg);
                            
                            return (
                                <div key={idx} className={`flex gap-4 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isAi ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-700 text-slate-300'}`}>
                                        {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </div>
                                    <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${isAi ? 'items-start' : 'items-end'}`}>
                                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${isAi ? 'bg-slate-800 text-slate-200 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                                            {content}
                                        </div>
                                        <span className="text-[10px] text-slate-600 mt-1 px-1">
                                            {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="hidden md:flex flex-1 flex-col items-center justify-center text-slate-500">
                    <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                    <p>Select a conversation to view details</p>
                </div>
            )}
        </div>
    </div>
  );
};