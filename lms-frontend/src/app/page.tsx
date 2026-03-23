'use client';

import Link from 'next/link';
import { ArrowRight, Star, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

export default function Home() {
  const [featuredSubjects, setFeaturedSubjects] = useState<any[]>([]);

  useEffect(() => {
    // Fetch just a few subjects to feature on the homepage
    const fetchFeatured = async () => {
      try {
        const res = await axios.get('/subjects');
        setFeaturedSubjects(res.data.slice(0, 3)); // Grab first 3
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Massive Hero Landing Section */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-white">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/10 via-purple-500/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-transparent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-4 py-2 mb-8 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[12px] font-bold text-gray-600 tracking-wide">Next-Generation Learning Platform</span>
          </div>

          <h1 className="text-[52px] md:text-[84px] font-black text-gray-900 mb-8 tracking-tighter leading-[1.05] max-w-5xl">
            Master the skills of tomorrow, <br />
            <span className="text-primary">today.</span>
          </h1>

          <p className="text-[18px] md:text-[22px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            Join thousands of professionals upgrading their careers through our expertly curated masterclasses, interactive curriculums, and vibrant student community.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/library" className="w-full sm:w-auto px-10 py-5 bg-gray-900 text-white font-bold text-[16px] rounded-2xl hover:bg-black hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
              Explore Course Library <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/register" className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-gray-100 text-gray-700 hover:border-primary hover:text-primary font-bold text-[16px] rounded-2xl flex items-center justify-center transition-all shadow-sm">
              Create Free Account
            </Link>
          </div>
          
          <div className="mt-16 pt-10 border-t border-gray-100 w-full max-w-3xl mx-auto flex justify-center gap-12 sm:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock "Trusted By" logos using text for now */}
             <div className="text-[20px] font-black tracking-tighter">ACME Corp</div>
             <div className="text-[20px] font-black tracking-tighter">Globex</div>
             <div className="text-[20px] font-black tracking-tighter">Soylent</div>
             <div className="text-[20px] font-black tracking-tighter">Initech</div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="bg-gray-50 py-32 border-y border-gray-100">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
               <div className="max-w-2xl">
                  <h2 className="text-[36px] font-black tracking-tight text-gray-900 mb-4">Trending Masterclasses</h2>
                  <p className="text-[18px] text-gray-500 font-medium">Dive into our most popular subjects, freshly updated for this year's industry standards.</p>
               </div>
               <Link href="/library" className="flex items-center gap-2 text-primary font-bold hover:text-purple-600 transition-colors whitespace-nowrap">
                  View full catalog <ArrowRight className="w-4 h-4" />
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {featuredSubjects.map((sub, idx) => {
                 const gradients = ['from-blue-500 to-indigo-600', 'from-emerald-400 to-teal-600', 'from-orange-400 to-rose-500'];
                 const grad = gradients[idx % gradients.length];
                 return (
                   <div key={sub.id} className="bg-white rounded-3xl p-3 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group">
                      <div className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${grad} mb-6 overflow-hidden relative flex items-center justify-center shadow-inner`}>
                         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                         <h3 className="text-white text-3xl font-black mix-blend-overlay opacity-90 rotate-2 scale-110 group-hover:scale-125 transition-transform duration-500">
                           {String(sub.title).split(' ')[0]}
                         </h3>
                      </div>
                      <div className="px-5 pb-5">
                        <h4 className="text-[20px] font-bold text-gray-900 mb-2 line-clamp-1">{sub.title}</h4>
                        <p className="text-[14px] text-gray-500 line-clamp-2 font-medium mb-6">{sub.description}</p>
                        <Link href={`/subject/${sub.slug}`} className="w-full py-3.5 bg-gray-50 text-gray-700 group-hover:bg-gray-900 group-hover:text-white rounded-xl font-bold flex items-center justify-center transition-colors">
                           View Syllabus
                        </Link>
                      </div>
                   </div>
                 )
               })}
            </div>
         </div>
      </section>

      {/* Value Props Section */}
      <section className="bg-white py-32">
         <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-[36px] font-black tracking-tight text-gray-900 mb-16">Why learn with Scholar?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm shadow-blue-100">
                     <Star className="w-8 h-8" />
                  </div>
                  <h3 className="text-[22px] font-bold text-gray-900">Expert Instruction</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed max-w-xs mx-auto">Learn directly from industry leaders who have built products used by millions.</p>
               </div>
               <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-sm shadow-purple-100">
                     <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-[22px] font-bold text-gray-900">Interactive Learning</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed max-w-xs mx-auto">Stop passively watching. Our platform tracks progress and enforces active participation.</p>
               </div>
               <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm shadow-emerald-100">
                     <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-[22px] font-bold text-gray-900">Verified Certificates</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed max-w-xs mx-auto">Earn cryptographic certificates of completion that you can embed directly on your LinkedIn.</p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/40 opacity-50 mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center bg-white/10 backdrop-blur-3xl rounded-[40px] p-12 md:p-20 border border-white/20 shadow-2xl">
           <h2 className="text-[36px] md:text-[52px] font-black text-white tracking-tight leading-tight mb-6">
              Ready to transform your career?
           </h2>
           <p className="text-[18px] text-white/80 font-medium mb-10 max-w-xl mx-auto">
              Join over 50,000 students advancing their skills with our premium masterclasses.
           </p>
           <Link href="/register" className="inline-block px-12 py-5 bg-white text-gray-900 hover:bg-gray-50 font-black text-[18px] rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">
              Start Learning Now
           </Link>
        </div>
      </section>
    </div>
  );
}
