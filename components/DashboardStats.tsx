import React, { useEffect, useState, useMemo } from 'react';
import { MessageSquare, Calendar, Activity, FolderGit2, Users } from 'lucide-react';
import { api } from '../services/api';
import { Booking } from '../types';

interface DashboardStatsProps {
    projectsCount: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ projectsCount }) => {
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [feedItems, setFeedItems] = useState<any[]>([]);

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return Math.floor(seconds) + " seconds ago";
  };

  const getMessageContent = (msgData: any) => {
    if (!msgData) return '';
    let data = msgData;

    if (typeof data === 'string') {
        try {
            const parsed = JSON.parse(data);
            data = parsed;
        } catch (e) {
            return data;
        }
    }

    if (typeof data === 'object' && data !== null) {
        if (data.content) return data.content;
        if (data.message) return data.message;
        if (data.text) return data.text;
        if (data.output) return data.output;
        return JSON.stringify(data);
    }
    return String(data);
  };

  const fetchStats = async () => {
      try {
          const [statsData, bookingsList, chatsList] = await Promise.all([
              api.stats.get(),
              api.bookings.getAll().catch(err => {
                  console.warn("Bookings endpoint unavailable", err);
                  return [] as Booking[];
              }),
              api.chats.getAll().catch(err => {
                  console.warn("Chats endpoint unavailable", err);
                  return [];
              })
          ]);

          setUniqueVisitors(statsData.uniqueVisitors);
          setTotalVisits(statsData.totalVisits);
          setBookingsCount(statsData.bookingsCount || bookingsList.length);

          const bookingFeedItems = bookingsList.map(b => ({
              id: b.bookingId,
              user: b.clientName || 'Unknown Client',
              text: `New appointment scheduled via ${b.source === 'webhook' ? 'GHL/Webhook' : 'Website Widget'}`,
              time: formatTimeAgo(new Date(b.createdAt)),
              timestamp: new Date(b.createdAt).getTime(),
              type: 'booking'
          }));

          // Calculate stable Visitor Numbers for stats feed
          const chatSortedByCreation = [...chatsList].sort((a, b) => 
            new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
          );
          const visitorMap = new Map();
          chatSortedByCreation.forEach((c, i) => visitorMap.set(c._id, i + 1));

          const chatFeedItems = chatsList.map((chat) => {
             const lastHumanMsg = [...chat.messages].reverse().find(m => m.type === 'human');
             const content = lastHumanMsg ? getMessageContent(lastHumanMsg.data) : 'Started a conversation';
             const visitorNumber = visitorMap.get(chat._id) || '?';

             return {
                 id: chat._id,
                 user: `Visitor #${visitorNumber}`,
                 text: content.length > 80 ? content.slice(0, 80) + '...' : content,
                 time: formatTimeAgo(new Date(chat.updatedAt || chat.createdAt || new Date())),
                 timestamp: new Date(chat.updatedAt || chat.createdAt || new Date()).getTime(),
                 type: 'chat'
             };
          });

          const combinedFeed = [...bookingFeedItems, ...chatFeedItems]
              .sort((a, b) => b.timestamp - a.timestamp)
              .slice(0, 15);

          setFeedItems(combinedFeed);

      } catch (e) {
          console.error("Failed to fetch stats", e);
      }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-colors shadow-lg">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Unique Visitors</p>
            <h3 className="text-4xl font-bold text-white tracking-tight">{uniqueVisitors.toLocaleString()}</h3>
            <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-slate-500 font-medium">Total Visits:</span>
                <span className="text-xs text-blue-400 font-bold">{totalVisits.toLocaleString()}</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
            <Users className="w-7 h-7 text-blue-500" />
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-colors shadow-lg">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Appointments Booked</p>
            <h3 className="text-4xl font-bold text-white tracking-tight">{bookingsCount}</h3>
          </div>
          <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
            <Calendar className="w-7 h-7 text-purple-500" />
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-colors shadow-lg">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Projects</p>
            <h3 className="text-4xl font-bold text-white tracking-tight">{projectsCount}</h3>
          </div>
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
            <FolderGit2 className="w-7 h-7 text-emerald-500" />
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-900/80">
          <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
             <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="font-bold text-white text-lg">Live Activity Feed</h3>
        </div>
        
        <div className="divide-y divide-slate-800">
          {feedItems.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No recent activity</div>
          ) : (
            feedItems.map((msg) => (
                <div key={msg.id} className="p-6 hover:bg-slate-800/40 transition-colors group cursor-default">
                <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/5 ${msg.type === 'booking' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {msg.type === 'booking' ? (
                        <Calendar className="w-5 h-5" />
                    ) : (
                        <MessageSquare className="w-5 h-5" />
                    )}
                    </div>
                    <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-slate-200 text-sm group-hover:text-white transition-colors">{msg.user}</h4>
                        <span className="text-xs text-slate-500 font-mono">{msg.time}</span>
                    </div>
                    <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap break-words">
                        {msg.text}
                    </div>
                    </div>
                </div>
                </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};