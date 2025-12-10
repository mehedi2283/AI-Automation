import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle Animation State
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Double RAF ensures the browser paints the initial state (opacity-0) before applying the active state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => setIsRendered(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Scripts and Body Lock
  useEffect(() => {
    if (isRendered) {
      const script = document.createElement('script');
      script.src = "https://api.leadconnectorhq.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);

      document.body.style.overflow = 'hidden';

      return () => {
        if (document.body.contains(script)) {
            document.body.removeChild(script);
        }
        document.body.style.overflow = 'unset';
      };
    }
  }, [isRendered]);

  // Listen for iframe messages (attempt to catch booking success)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
        // LeadConnector sometimes emits messages on form success.
        // We attempt to catch generic submission events or specific widget events.
        // NOTE: This depends on the widget configuration allowing cross-origin messages.
        if (event.data && (typeof event.data === 'string' || typeof event.data === 'object')) {
             const data = event.data;
             // Check for common GHL/LC success signals
             if (
                 (data.action && data.action === 'form_submission_successful') ||
                 (data.type && data.type === 'form-submit') ||
                 (data.event && data.event === 'submission')
             ) {
                 api.stats.recordBooking({ clientName: 'Online Visitor' });
             }
        }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? 'visible' : 'invisible'}`}>
      {/* Ultra Glass Backdrop */}
      <div 
        className={`
            absolute inset-0 bg-slate-900/20 backdrop-blur-md transition-opacity duration-500 ease-out
            ${isVisible ? 'opacity-100' : 'opacity-0'}
        `} 
        onClick={onClose}
      />
      
      {/* Glass Container */}
      <div 
        className={`
            relative w-full max-w-6xl bg-white/80 backdrop-blur-2xl rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] border border-white/50 overflow-hidden ring-1 ring-black/5
            transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
            ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
        `}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-black/5 bg-white/50 z-10 shrink-0">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Schedule Consultation</h3>
          <button 
            onClick={onClose}
            className="p-2.5 bg-black/5 hover:bg-black/10 rounded-full text-slate-600 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 bg-white/40">
          <iframe 
            src="https://api.leadconnectorhq.com/widget/booking/22V5uBkFqiE1rExkpuXY" 
            style={{ width: '100%', border: 'none', minHeight: '700px' }} 
            scrolling="yes" 
            id="22V5uBkFqiE1rExkpuXY_1765184659226"
            title="Booking Calendar"
          ></iframe>
        </div>
      </div>
    </div>
  );
};