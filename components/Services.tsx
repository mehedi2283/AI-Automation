import React from 'react';
import { Database, Zap, Bot, Phone, Megaphone, Settings, MessageSquare, Workflow } from 'lucide-react';
import { ServiceFeature } from '../types';

export const Services: React.FC = () => {
  const services: ServiceFeature[] = [
    {
      title: 'GoHighLevel Ecosystems',
      description: 'We architect complete GHL snapshots with custom sub-account logic, workflows, and white-label configurations.',
      icon: Database
    },
    {
      title: 'Voice AI Agents',
      description: 'Deploy human-parity voice assistants for inbound/outbound calls, integrated directly into your CRM.',
      icon: Phone
    },
    {
      title: 'Intelligent Chatbots',
      description: 'RAG-based support agents trained on your specific business knowledge base, available 24/7.',
      icon: MessageSquare
    },
    {
      title: 'Marketing Automation',
      description: 'Complex multi-channel sequences (Email, SMS, Voice) triggered by behavioral data points.',
      icon: Megaphone
    },
    {
      title: 'API Orchestration',
      description: 'We unify your disparate tech stack using Make.com, Zapier, and custom Python middleware.',
      icon: Workflow
    },
    {
      title: 'Data Architecture',
      description: 'Clean data structures, tagging strategies, and pipeline hygiene to ensure scalability.',
      icon: Settings
    }
  ];

  return (
    <section id="services" className="py-32 relative bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Technical Capabilities</h2>
          <p className="text-slate-500 max-w-2xl text-lg font-light">
            We don't just use tools; we build systems. Our engineering approach ensures your automation stack is robust, scalable, and secure.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-slate-200 gap-[1px] border border-slate-200 rounded-2xl overflow-hidden">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 md:p-10 group hover:bg-slate-50 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};