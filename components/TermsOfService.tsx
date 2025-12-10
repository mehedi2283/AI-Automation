import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="bg-slate-50 rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-xl">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Terms of Service</h1>
          </div>
          
          <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed">
            <p className="text-sm text-slate-400">Last updated: October 26, 2023</p>

            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the website operated by Octopi Digital ("us", "we", or "our").
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h3>
            <p>
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Services</h3>
            <p>
              We provide AI automation, web development, and digital consulting services. All deliverables are subject to the specific agreements signed between Octopi Digital and the Client.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Intellectual Property</h3>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Octopi Digital and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Octopi Digital.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. AI & Automation Disclaimer</h3>
            <p>
              Our services utilize Artificial Intelligence technologies. While we strive for accuracy, AI outputs can vary. We do not guarantee 100% accuracy, uptime, or specific business results from the use of our automated agents.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Limitation of Liability</h3>
            <p>
              In no event shall Octopi Digital, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Changes</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};