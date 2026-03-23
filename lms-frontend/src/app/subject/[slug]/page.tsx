'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PlayCircle, Clock, ChevronDown, Lock, FileText, BarChart2, Globe, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SubjectOverview() {
  const { slug } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [subject, setSubject] = useState<any>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await axios.get(`/subjects/${slug}`);
        setSubject(res.data);
        if (user) {
          const enrollRes = await axios.get(`/subjects/enrollment/${res.data.id}`);
          setEnrolled(enrollRes.data.enrolled);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubject();
  }, [slug, user]);

  const handleEnroll = async () => {
    if (!user) return router.push('/login');
    try {
      await axios.post('/subjects/enroll', { subjectId: subject.id });
      setEnrolled(true);
      router.push(`/learn/${subject.id}`);
    } catch (err: any) {
      alert('Enrollment failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-500 font-medium">Opening Guide...</div>;
  if (!subject) return <div className="py-20 text-center">Guide not found</div>;

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Top Section */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-gray-50 pt-16 pb-24 border-b border-gray-100 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div className="space-y-8 max-w-xl">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-gray-900 bg-gray-100 px-4 py-2 rounded-full ring-1 ring-gray-900/10 shadow-sm">
                Advanced Masterclass
              </span>
              
              <h1 className="text-[44px] md:text-[56px] leading-[1.1] font-extrabold text-gray-900 tracking-tight">
                {subject.title}
              </h1>
              
              <p className="text-[17px] text-gray-500 leading-relaxed">
                {subject.description || "Master the art of editorial layout for the web. Learn how to balance whitespace, hierarchy, and intentional asymmetry to create immersive digital reading experiences."}
              </p>
              
              <div className="flex items-center gap-5 pt-2">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white font-serif italic shadow-md border-2 border-white">
                    JV
                 </div>
                 <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Instructor</p>
                    <p className="text-[16px] font-extrabold text-gray-900">Dr. Julian Vossen</p>
                 </div>
              </div>
              
              <div className="pt-6">
                {!enrolled ? (
                  <button 
                    onClick={handleEnroll}
                    className="bg-gray-900 text-white font-medium text-[15px] px-8 py-3.5 rounded-lg hover:bg-black transition shadow-sm shadow-gray-900/20"
                  >
                    Enroll Now — $149
                  </button>
                ) : (
                  <Link 
                    href={`/learn/${subject.id}`}
                    className="inline-block bg-gray-900 text-white font-medium text-[15px] px-8 py-3.5 rounded-lg hover:bg-black transition shadow-sm shadow-gray-900/20"
                  >
                    Continue Learning
                  </Link>
                )}
              </div>
            </div>

            <div className="w-full aspect-[4/3] md:aspect-[16/10] bg-gradient-to-br from-primary via-purple-600 to-pink-500 rounded-[32px] overflow-hidden flex flex-col justify-center items-center shadow-2xl shadow-primary/20 transform lg:rotate-2 border-4 border-white">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
               <div className="text-white text-center font-black tracking-tighter mix-blend-overlay opacity-90 leading-[0.85] z-10">
                 <span className="text-[70px] md:text-[110px] block drop-shadow-xl">COURSE</span>
                 <span className="text-[70px] md:text-[110px] block text-yellow-300 drop-shadow-xl">HERO</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-20 items-start">
            
            <div className="space-y-16">
              <div className="space-y-8">
                <h2 className="text-[26px] font-medium text-gray-900 tracking-tight">Course Curriculum</h2>
                
                <div className="space-y-4">
                  {/* Actual Curriculum from DB */}
                  {subject.sections && subject.sections.length > 0 ? subject.sections.map((section: any, idx: number) => {
                    const isOpen = expandedSection === section.id;
                    return (
                    <div key={section.id} className="bg-white rounded-[16px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
                      <div 
                        onClick={() => setExpandedSection(isOpen ? null : section.id)}
                        className={`w-full px-6 py-5 flex justify-between items-center ${isOpen ? 'bg-white' : 'bg-white hover:bg-gray-50 cursor-pointer transition'} border-b ${isOpen ? 'border-gray-200' : 'border-transparent'}`}
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[13px] font-bold text-gray-500 font-mono">
                            0{idx + 1}
                          </div>
                          <span className={`font-medium text-gray-900 text-[16px]`}>{section.title}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 ${isOpen ? 'rotate-180' : ''} transition-transform`} />
                      </div>
                      
                      {isOpen && (
                        <div className="px-6 py-4 space-y-1">
                          {section.videos?.length > 0 ? section.videos.map((video: any, i: number) => (
                            <div key={i} className="flex justify-between items-center py-3 group cursor-pointer rounded-lg hover:bg-gray-50 px-4 -mx-4 transition">
                              <div className="flex items-center gap-4">
                                <PlayCircle className="w-[18px] h-[18px] text-gray-400 group-hover:text-primary transition-colors" />
                                <span className={`text-[15px] text-gray-500 group-hover:text-gray-900 transition-colors`}>{video.title}</span>
                              </div>
                              <span className="text-[12px] text-gray-400 font-mono tracking-wide">Video</span>
                            </div>
                          )) : (
                            <div className="text-sm text-gray-400 py-2">No content added yet.</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}) : (
                    <p className="text-gray-500">Curriculum is being prepared.</p>
                  )}
                </div>
              </div>

              <div className="space-y-6 max-w-[640px]">
                 <h2 className="text-[26px] font-medium text-gray-900 tracking-tight">About this course</h2>
                 <p className="text-[16px] text-gray-500 leading-[1.8]">
                    This course isn't about learning tools; it's about training your eye. We will strip away the distractions of modern web &quot;tricks&quot; and return to the principles of fine typography that have existed for centuries, adapted for the digital screen.
                    <br /><br />
                    By the end of this curriculum, you will understand how to orchestrate hierarchy so your readers never feel overwhelmed, but always engaged.
                 </p>
              </div>
            </div>

            <aside className="space-y-8 sticky top-28">
              <div className="bg-white rounded-[24px] p-8 space-y-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5">
                <h3 className="text-[18px] font-medium text-gray-900">Course Details</h3>
                
                <div className="space-y-6">
                   <div className="flex items-start gap-5">
                      <Clock className="w-[22px] h-[22px] text-primary" />
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Duration</p>
                         <p className="text-[14px] font-medium text-gray-900">React Mastery Level</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-5">
                      <FileText className="w-[22px] h-[22px] text-primary" />
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Content</p>
                         <p className="text-[14px] font-medium text-gray-900">{subject.sections?.length || 0} Modules</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-5">
                      <BarChart2 className="w-[22px] h-[22px] text-primary" />
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Level</p>
                         <p className="text-[14px] font-medium text-gray-900">Intermediate to Advanced</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-5">
                      <Globe className="w-[22px] h-[22px] text-primary" />
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Language</p>
                         <p className="text-[14px] font-medium text-gray-900">English (CC available)</p>
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-4">
                   <p className="text-center text-[11px] text-gray-400 mb-4">30-day money back guarantee</p>
                   {enrolled ? (
                     <button 
                      onClick={() => router.push(`/learn/${subject.id}`)}
                      className="w-full bg-gray-900 text-white font-medium text-[15px] py-3.5 rounded-lg hover:bg-black transition shadow-sm"
                     >
                       Resume Learning
                     </button>
                   ) : (
                     <div className="space-y-3">
                       <button onClick={handleEnroll} className="w-full bg-gray-900 text-white font-medium text-[15px] py-3.5 rounded-lg hover:bg-black transition shadow-sm">Enroll in Course</button>
                       <button onClick={() => alert('Trailer coming soon!')} className="w-full bg-white border border-gray-200 text-gray-900 font-medium text-[15px] py-3.5 rounded-lg hover:bg-gray-50 transition">Watch Trailer</button>
                     </div>
                   )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-[20px] p-8 space-y-5 border border-gray-100 shadow-inner">
                 <p className="text-[12px] font-bold text-gray-500">Included with Purchase</p>
                 <ul className="space-y-3.5">
                    {['Lifetime access to all updates', 'Exclusive design kit files', 'Private student community'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-[14px] text-gray-600 font-medium">
                        <CheckCircle2 className="w-[18px] h-[18px] text-primary" /> {item}
                      </li>
                    ))}
                 </ul>
              </div>
            </aside>
          </div>
      </section>
    </div>
  );
}
