import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
            <div className="p-3 bg-blue-100 rounded-xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Privacy Policy</h1>
          </div>
          
          <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed">
            <p className="text-sm text-slate-400">Last updated: October 26, 2023</p>

            <p>
              At Octopi Digital ("we," "our," or "us"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our automation services.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Register for an account or book a consultation.</li>
              <li>Interact with our AI voice agents or chatbots.</li>
              <li>Subscribe to our newsletters or marketing communications.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h3>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our AI and automation services.</li>
              <li>Improve, personalize, and expand our website functionality.</li>
              <li>Understand and analyze how you use our website.</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Data Security</h3>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Third-Party Services</h3>
            <p>
              Our services may contain links to third-party websites or services (such as Vapi, OpenAI, or GoHighLevel) that are not owned or controlled by us. We are not responsible for the privacy practices of such third parties.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at legal@octopi-digital.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};