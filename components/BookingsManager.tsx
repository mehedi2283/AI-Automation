import React, { useEffect, useState, useRef } from 'react';
import { Calendar, Mail, Loader2, Globe, Webhook, Clock, AlertTriangle, RefreshCw, ChevronDown, Edit2, Save, X, Check } from 'lucide-react';
import { Booking } from '../types';
import { api } from '../services/api';

const STATUS_OPTIONS = [
    'new',
    'confirmed',
    'cancelled',
    'Showed',
    'No-show',
    'invalid'
];

// Added lowercase mappings to ensure consistency
const STATUS_STYLES: Record<string, string> = {
    'new': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'confirmed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'booked': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', // map booked to confirmed style
    'cancelled': 'bg-red-500/10 text-red-400 border-red-500/20',
    'canceled': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Showed': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'showed': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'No-show': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'no-show': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'noshow': 'bg-orange-500/10 text-orange-400 border-orange-500/20', // Handle noshow without hyphen
    'invalid': 'bg-slate-500/10 text-slate-400 border-slate-500/20'
};

export const BookingsManager: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for full record editing (Modal)
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Custom Dropdown State
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.bookings.getAll();
      setBookings(data);
    } catch (e: any) {
      console.error("Failed to fetch bookings", e);
      setError(e.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
            setIsStatusDropdownOpen(false);
        }
    };
    if (isStatusDropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isStatusDropdownOpen]);

  // Full Record Save from Modal
  const handleSaveEdit = async () => {
      if (!editingBooking) return;
      setIsSaving(true);
      try {
          // Use generic update method
          const updated = await api.bookings.update(editingBooking.bookingId, editingBooking);
          setBookings(prev => prev.map(b => b.bookingId === updated.bookingId ? updated : b));
          setEditingBooking(null);
          setIsStatusDropdownOpen(false);
      } catch (e: any) {
          alert("Failed to save booking details.");
          console.error(e);
      } finally {
          setIsSaving(false);
      }
  };

  // Helper to format date safely since it's now a string in DB
  const formatAppointmentDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    
    // If string already contains a comma (e.g. "Monday, December 22, 2025"), display as is.
    if (dateStr.includes(',')) return dateStr;

    // Otherwise try to parse ISO strings
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        return d.toLocaleString();
    }
    
    return dateStr;
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h2 className="text-3xl font-bold text-white mb-2">Appointments</h2>
            <p className="text-slate-400 text-sm md:text-base">Manage incoming booking requests from website and webhooks.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            {error && (
                <span className="text-red-400 text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> <span className="hidden sm:inline">Connection Error</span>
                </span>
            )}
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-slate-300 font-mono text-sm">
                Total: <span className="text-white font-bold">{bookings.length}</span>
            </div>
            <button 
                onClick={fetchBookings}
                disabled={loading}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 text-slate-200 font-medium uppercase tracking-wider text-xs border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Appointment Date</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Received At</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                 <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="flex justify-center items-center gap-2 text-blue-500">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Loading bookings...</span>
                        </div>
                    </td>
                 </tr>
              ) : error ? (
                <tr>
                   <td colSpan={7} className="px-6 py-12 text-center">
                       <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
                           <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                               <AlertTriangle className="w-6 h-6 text-red-500" />
                           </div>
                           <h3 className="text-white font-bold">Unable to Load Appointments</h3>
                           <p className="text-slate-500">{error}</p>
                           <button onClick={fetchBookings} className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold">
                               Retry
                           </button>
                       </div>
                   </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                   <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                       No bookings found yet.
                   </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.bookingId} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      {booking.clientName}
                    </td>
                    <td className="px-6 py-4">
                      {booking.clientEmail ? (
                        <div className="flex items-center gap-2">
                           <Mail className="w-3 h-3 text-slate-500" />
                           {booking.clientEmail}
                        </div>
                      ) : (
                        <span className="text-slate-600 italic">No email</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                           <Calendar className="w-3 h-3 text-blue-500" />
                           {formatAppointmentDate(booking.appointmentDate)}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       {(booking.source === 'webhook' || booking.source === 'website_widget') ? (
                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold border ${booking.source === 'webhook' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                {booking.source === 'webhook' ? <Webhook className="w-3 h-3" /> : <Globe className="w-3 h-3" />} 
                                {booking.source === 'website_widget' ? 'Widget' : 'Webhook'}
                            </span>
                       ) : (
                           <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 max-w-[240px]" title={booking.source}>
                               <Globe className="w-3 h-3 shrink-0" /> 
                               <span className="truncate">{booking.source}</span>
                           </span>
                       )}
                    </td>
                    <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${STATUS_STYLES[booking.status] || STATUS_STYLES[(booking.status || '').toLowerCase()] || 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                             {booking.status}
                        </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-slate-600" />
                            {new Date(booking.createdAt).toLocaleString()}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <button 
                            onClick={() => setEditingBooking(booking)}
                            className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-500 hover:text-white transition-colors"
                            title="Edit Details"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden space-y-4">
          {loading ? (
             <div className="py-12 text-center text-blue-500 flex flex-col items-center gap-2">
                 <Loader2 className="w-8 h-8 animate-spin" />
                 <span className="text-sm font-medium">Loading appointments...</span>
             </div>
          ) : error ? (
             <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                 <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                 <p className="text-white font-bold mb-1">Connection Failed</p>
                 <p className="text-slate-400 text-sm mb-4">{error}</p>
                 <button onClick={fetchBookings} className="px-4 py-2 bg-slate-800 rounded-lg text-white text-sm">Retry</button>
             </div>
          ) : bookings.length === 0 ? (
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                 <p className="text-slate-500">No appointments found.</p>
             </div>
          ) : (
            bookings.map((booking) => (
                <div key={booking.bookingId} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm active:border-blue-500/50 transition-colors">
                    {/* Header: Name + Edit */}
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="font-bold text-white text-lg leading-tight mb-1">{booking.clientName}</h3>
                            {booking.clientEmail && (
                                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                                    <Mail className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate max-w-[200px]">{booking.clientEmail}</span>
                                </div>
                            )}
                        </div>
                        <button 
                            onClick={() => setEditingBooking(booking)}
                            className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white hover:bg-slate-700 transition-colors"
                            aria-label="Edit booking"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Status & Source Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/50">
                            <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Status</span>
                            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold border ${STATUS_STYLES[booking.status] || STATUS_STYLES[(booking.status || '').toLowerCase()] || 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                                {booking.status}
                            </div>
                        </div>
                        <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/50 overflow-hidden">
                             <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Source</span>
                             {(booking.source === 'webhook' || booking.source === 'website_widget') ? (
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold border w-full truncate ${booking.source === 'webhook' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                    {booking.source === 'webhook' ? <Webhook className="w-3 h-3 shrink-0" /> : <Globe className="w-3 h-3 shrink-0" />} 
                                    <span className="truncate">{booking.source === 'website_widget' ? 'Widget' : 'Webhook'}</span>
                                </span>
                             ) : (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 w-full">
                                   <Globe className="w-3 h-3 shrink-0" /> 
                                   <span className="truncate">{booking.source}</span>
                                </span>
                             )}
                        </div>
                    </div>

                    {/* Footer: Date & Time */}
                    <div className="flex flex-col gap-2 pt-3 border-t border-slate-800/50">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                            <span className="font-medium">{formatAppointmentDate(booking.appointmentDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>Received: {new Date(booking.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            ))
          )}
      </div>

      {/* --- EDIT MODAL --- */}
      {editingBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
                onClick={() => setEditingBooking(null)}
              />
              <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl animate-fade-in-up">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <Edit2 className="w-5 h-5 text-blue-500"/> Edit Booking
                      </h3>
                      <button onClick={() => setEditingBooking(null)} className="text-slate-400 hover:text-white">
                          <X className="w-5 h-5" />
                      </button>
                  </div>
                  
                  <div className="space-y-4">
                      <div>
                          <label className="block text-slate-400 text-sm mb-1 font-bold">Client Name</label>
                          <input 
                              type="text" 
                              value={editingBooking.clientName} 
                              onChange={(e) => setEditingBooking({...editingBooking, clientName: e.target.value})}
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
                          />
                      </div>
                      
                      <div>
                          <label className="block text-slate-400 text-sm mb-1 font-bold">Client Email</label>
                          <input 
                              type="email" 
                              value={editingBooking.clientEmail || ''} 
                              onChange={(e) => setEditingBooking({...editingBooking, clientEmail: e.target.value})}
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
                          />
                      </div>

                      <div>
                          <label className="block text-slate-400 text-sm mb-1 font-bold">Appointment Date (Raw)</label>
                          <input 
                              type="text" 
                              value={editingBooking.appointmentDate || ''} 
                              onChange={(e) => setEditingBooking({...editingBooking, appointmentDate: e.target.value})}
                              placeholder="e.g. 2025-12-22T10:00:00.000Z"
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none font-mono text-sm"
                          />
                          <p className="text-xs text-slate-500 mt-1">Accepts ISO strings or generic text descriptions.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div className="relative" ref={statusDropdownRef}>
                              <label className="block text-slate-400 text-sm mb-1 font-bold">Status</label>
                              <div 
                                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer flex justify-between items-center"
                              >
                                  <span>{editingBooking.status}</span>
                                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                              </div>
                              
                              {isStatusDropdownOpen && (
                                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                                      {STATUS_OPTIONS.map(opt => (
                                          <div 
                                              key={opt} 
                                              onClick={() => {
                                                  setEditingBooking({...editingBooking, status: opt});
                                                  setIsStatusDropdownOpen(false);
                                              }}
                                              className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between ${editingBooking.status === opt ? 'bg-blue-600/20 text-blue-400 font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                                          >
                                              {opt}
                                              {editingBooking.status === opt && <Check className="w-3 h-3" />}
                                          </div>
                                      ))}
                                  </div>
                              )}
                          </div>
                          <div>
                              <label className="block text-slate-400 text-sm mb-1 font-bold">Source</label>
                              <input 
                                  type="text" 
                                  value={editingBooking.source} 
                                  onChange={(e) => setEditingBooking({...editingBooking, source: e.target.value})}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
                              />
                          </div>
                      </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-800">
                      <button 
                          onClick={() => setEditingBooking(null)}
                          className="px-4 py-2 text-slate-400 hover:text-white font-medium"
                      >
                          Cancel
                      </button>
                      <button 
                          onClick={handleSaveEdit}
                          disabled={isSaving}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20"
                      >
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          Save Changes
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};