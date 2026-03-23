'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { BookOpen, LayoutGrid, Star, Settings, CheckCircle2, Book, PlayCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [enrolledSubjects, setEnrolledSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchEnrolled = async () => {
        try {
          const res = await axios.get('/subjects/enrolled');
          setEnrolledSubjects(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchEnrolled();
    }
  }, [user]);

  if (authLoading || loading) return <div className="py-20 text-center font-medium text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-72px)] flex">
      {/* Sidebar */}
      <aside className="w-[280px] flex-shrink-0 border-r border-gray-100 flex flex-col pt-12 pb-8 h-[calc(100vh-72px)] sticky top-[72px] bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="px-8 space-y-2 mb-10">
          <h3 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-wider">Course Progress</h3>
          <p className="text-[13px] text-primary font-bold">65% Completed</p>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden shadow-inner">
             <div className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2 px-4">
            <li>
               <button onClick={() => alert('Dashboard overview coming soon!')} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[14px] font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition">
                 <LayoutGrid className="w-5 h-5" /> Dashboard
               </button>
            </li>
            <li>
               <button onClick={() => alert('Enrolled courses view coming soon!')} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[14px] font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition">
                 <BookOpen className="w-5 h-5" /> Enrolled Courses
               </button>
            </li>
            <li>
               <button onClick={() => alert('Certificates portal coming soon!')} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[14px] font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition">
                 <Star className="w-5 h-5" /> Certificates
               </button>
            </li>
            <li className="relative">
               <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[14px] font-bold bg-primary/10 text-primary transition shadow-sm border border-primary/20">
                 <Settings className="w-5 h-5" /> Settings
               </button>
            </li>
          </ul>
        </nav>
        
        <div className="px-8 mt-auto">
          <Link href="/" className="w-full flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold text-[14px] py-4 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02]">
            Back to Library
          </Link>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 overflow-y-auto w-full p-10 md:p-14 lg:p-20 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-[840px] space-y-16 relative z-10">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row items-start md:items-center gap-8 bg-white p-10 rounded-[32px] shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>
            <div className="w-[110px] h-[110px] rounded-[32px] bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-[40px] font-black text-white shadow-xl shadow-primary/20 shrink-0 transform -rotate-3">
              {user?.name?.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase() || "JD"}
            </div>
            <div className="space-y-3 flex-1">
              <h1 className="text-[38px] font-extrabold text-gray-900 leading-tight tracking-tight">
                 {user?.name || "Julianne Deering"}
              </h1>
              <p className="text-[16px] text-gray-500 font-semibold bg-gray-50 px-4 py-1.5 rounded-lg inline-block border border-gray-100">
                 {user?.email || "julianne.deering@scholar.com"}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                 <button onClick={() => alert('Profile editing coming soon!')} className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl text-[14px] font-bold text-gray-700 hover:border-primary hover:text-primary transition shadow-sm">
                    Edit Profile
                 </button>
                 <button onClick={() => alert('Transcript download preparing...')} className="px-6 py-3 bg-primary/10 rounded-xl text-[14px] font-bold text-primary hover:bg-primary hover:text-white transition">
                    Download Transcript
                 </button>
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[24px] p-8 shadow-lg shadow-blue-500/20 relative overflow-hidden group text-white">
               <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
                  <PlayCircle className="w-32 h-32" />
               </div>
               <p className="text-[11px] font-black uppercase tracking-widest text-blue-100 mb-4 relative z-10">Videos Watched</p>
               <div className="flex items-baseline gap-3 relative z-10">
                 <p className="text-[48px] font-black tracking-tight leading-none">142</p>
                 <p className="text-[14px] font-bold text-yellow-300 bg-black/20 px-2 py-1 rounded-md">+12 this week</p>
               </div>
            </div>
            <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
               <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">Subjects Enrolled</p>
               <div className="flex flex-col gap-1">
                 <p className="text-[48px] font-black tracking-tight text-gray-900 leading-none">08</p>
                 <p className="text-[14px] font-bold text-primary">Active modules</p>
               </div>
            </div>
            <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
               <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">Certificates</p>
               <div className="flex flex-col gap-1">
                 <p className="text-[48px] font-black tracking-tight text-gray-900 leading-none">05</p>
                 <p className="text-[14px] font-bold text-emerald-500">Earned & Verified</p>
               </div>
            </div>
          </section>

          {/* Course Progress */}
          <section className="space-y-8 bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
            <header className="flex justify-between items-end mb-6">
               <div>
                 <h2 className="text-[28px] font-black text-gray-900 tracking-tight mb-2">Active Learning</h2>
                 <p className="text-[16px] text-gray-500 font-medium">Continue where you left off</p>
               </div>
            </header>
            
            <div className="space-y-6">
              {enrolledSubjects.length > 0 ? enrolledSubjects.map((course, idx) => {
                const gradients = ['from-blue-500 to-indigo-600', 'from-emerald-400 to-teal-500', 'from-orange-400 to-rose-500'];
                const grad = gradients[idx % gradients.length];
                const progress = course.progress_percentage || Math.floor(Math.random() * 100); // Temporary mock if not provided
                
                return (
                <div key={course.id} className="bg-white border-2 border-gray-50 rounded-[20px] p-6 lg:p-8 flex flex-col md:flex-row justify-between items-center gap-8 hover:border-gray-100 transition shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-6 w-full md:w-[45%] shrink-0">
                     <div className={`w-[60px] h-[60px] rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center shrink-0 shadow-lg`}>
                        <Book className="w-6 h-6 text-white" />
                     </div>
                     <div className="space-y-1 overflow-hidden">
                        <h3 className="text-[18px] font-bold text-gray-900 truncate">{course.subject_title || course.title}</h3>
                        <p className="text-[14px] font-semibold text-gray-500 truncate">Advanced Mastery</p>
                     </div>
                  </div>

                  <div className="flex-1 w-full space-y-3 px-0 md:px-4">
                     <div className="flex justify-between items-center text-[12px] font-extrabold uppercase tracking-widest text-gray-400">
                        <span>Progress</span>
                        <span className="text-primary">{progress}%</span>
                     </div>
                     <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${grad}`} style={{ width: `${progress}%` }}></div>
                     </div>
                  </div>

                  <div className="w-full md:w-auto shrink-0 flex justify-end mt-4 md:mt-0">
                     <Link href={`/learn/${course.id || course.subject_id}`} className={`
                       px-8 py-3.5 text-[15px] font-bold rounded-xl shadow-sm w-full md:w-auto text-center transition bg-primary border-2 border-primary text-white hover:shadow-lg hover:shadow-primary/20
                     `}>
                        Resume Learning
                     </Link>
                  </div>
                </div>
              )}) : (
                <div className="py-8 text-center text-gray-500 font-medium">
                  You are not enrolled in any courses yet. <Link href="/" className="text-primary hover:underline">Explore Library</Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
