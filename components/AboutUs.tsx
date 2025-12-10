import React from 'react';
import { Award, Clock, Target, Heart, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { AboutInfo } from '../types';

interface AboutUsProps {
  info: AboutInfo | null;
}

export const AboutUs: React.FC<AboutUsProps> = ({ info }) => {
  // Default values
  const bio = info?.bio || "We are a dedicated team of engineers with extensive experience in Web Design, Development, and Automation. Known for delivering high-quality products on time, we are committed to exceeding client expectations.";
  const totalProjects = info?.totalProjects || "61+";
  const hoursLogged = info?.hoursLogged || "1,900+";

  return (
    <section id="about" className="bg-slate-50 py-32 relative overflow-hidden border-t border-slate-200">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            About <span className="text-blue-600 relative inline-block">
                Us
                <span className="absolute bottom-0 left-0 w-full h-1.5 bg-blue-100 rounded-full"></span>
            </span>
          </h2>
        </div>

        {/* Bio Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-slate-200/50 mb-16 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-8 font-normal whitespace-pre-line">
                {bio}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm md:text-base font-semibold text-slate-500">
                <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> {totalProjects} Total Projects
                </span>
                <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> {hoursLogged} Hours Logged
                </span>
            </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {/* Card 1 */}
            <div className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl p-8 text-center text-white shadow-xl shadow-blue-500/20 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                    <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg tracking-wide">TOP RATED!</h3>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-900 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg tracking-wide uppercase">{hoursLogged} Hours Logged</h3>
            </div>

            {/* Card 3 */}
            <div className="bg-blue-600 rounded-2xl p-8 text-center text-white shadow-xl shadow-blue-600/20 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                    <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg tracking-wide uppercase leading-tight">High-Quality<br/>Delivery</h3>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-900 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                    <Heart className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="font-bold text-lg tracking-wide uppercase leading-tight">Long-Term<br/>Relationships</h3>
            </div>
        </div>

        {/* Achievements Section */}
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                Our <span className="text-blue-600 relative inline-block">
                    Achievements
                    <span className="absolute bottom-0 left-0 w-full h-1.5 bg-blue-100 rounded-full"></span>
                </span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {/* Achievement 1 */}
            <div className="group relative bg-white border border-slate-200 rounded-3xl p-10 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Star className="w-8 h-8 text-blue-600 fill-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Exceptional Job Success</h3>
                <p className="text-slate-500 text-center text-sm leading-relaxed">
                    Consistently delivering outstanding results for clients across the globe.
                </p>
            </div>

            {/* Achievement 2 */}
            <div className="group relative bg-white border border-slate-200 rounded-3xl p-10 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Certified Expert</h3>
                <p className="text-slate-500 text-center text-sm leading-relaxed">
                    Sales Funnel & Web Development Specialists with verified credentials.
                </p>
            </div>

            {/* Achievement 3 */}
            <div className="group relative bg-white border border-slate-200 rounded-3xl p-10 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Platform Mastery</h3>
                <p className="text-slate-500 text-center text-sm leading-relaxed">
                    Experienced with GoHighLevel, Kajabi, React, and custom AI integrations.
                </p>
            </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-8">
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">
                Let's Work <span className="text-blue-600">Together</span>
            </h2>
        </div>
        
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[32px] p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/30 transition-all duration-500"></div>
            
            <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
                <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                    Click below to send us a message, and let's schedule a call to discuss your automation needs!
                </p>
                
                <button 
                    onClick={() => document.getElementById('work')?.scrollIntoView({behavior: 'smooth'})}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
                >
                    Partner with Us <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-slate-400 opacity-90">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {totalProjects} Total Projects
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {hoursLogged} Hours of Experience
                    </span>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};