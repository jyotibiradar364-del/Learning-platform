'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { BookOpen, Clock, Search, PlayCircle } from 'lucide-react';

export default function Library() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('/subjects');
        setSubjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  if (loading) return <div className="py-20 text-center text-gray-500 font-medium">Loading Course Library...</div>;

  const filteredSubjects = subjects.filter(sub => {
    const matchesSearch = sub.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All'
      ? true 
      : sub.title.length % 2 === 0; // Mock filter since DB has no specific categories
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Vibrant Header Section */}
      <div className="bg-white border-b border-gray-100 pt-16 pb-16 px-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
            <h1 className="text-[36px] md:text-[52px] font-extrabold text-gray-900 mb-4 tracking-tight leading-[1.1] max-w-4xl">
              Course <span className="text-primary">Library</span>
            </h1>
            <p className="text-[16px] md:text-[18px] text-gray-500 max-w-2xl leading-relaxed mb-10">
              Explore our full catalog of masterclasses. Find your next skill to master.
            </p>
            
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full max-w-2xl flex shadow-xl shadow-primary/5 rounded-2xl overflow-hidden ring-1 ring-gray-200 bg-white p-2">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-[22px] h-[22px] text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn?" 
                  className="w-full pl-14 pr-4 py-4 text-[16px] focus:outline-none placeholder:text-gray-400 font-medium"
                />
              </div>
              
              <div className="flex gap-2.5 overflow-x-auto w-full max-w-2xl mt-8 pb-2 scrollbar-hide justify-center">
                 {['All', 'Computer Science', 'Design', 'Business', 'Marketing'].map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap transition-all shadow-sm ${
                        activeCategory === cat 
                          ? 'bg-gray-900 text-white hover:bg-black hover:shadow-md hover:scale-105' 
                          : 'bg-white text-gray-600 hover:bg-gray-50 ring-1 ring-gray-200 hover:ring-gray-300'
                      }`}
                    >
                       {cat}
                    </button>
                 ))}
              </div>
            </div>
         </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSubjects.length > 0 ? filteredSubjects.map((subject, idx) => {
             const category = idx % 2 === 0 ? 'DEVELOPMENT' : (idx === 1 ? 'DESIGN' : 'BUSINESS');
             const gradients = [
                'from-emerald-400 to-teal-600', 'from-blue-500 to-indigo-600', 
                'from-orange-400 to-rose-500', 'from-purple-500 to-fuchsia-600',
                'from-amber-400 to-orange-500', 'from-cyan-400 to-blue-600',
             ];
             const grad = gradients[idx % gradients.length];
             const isEnrolled = idx === 0 && user; // Mock first course enrollment if logged in
             
             return (
              <div key={subject.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                <Link href={`/subject/${subject.slug}`} className={`relative h-[220px] bg-gradient-to-br ${grad} overflow-hidden w-full flex items-center justify-center`}>
                   <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                   <PlayCircle className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100 z-10 drop-shadow-lg" strokeWidth={1.5} />
                   <div className="absolute top-5 left-5 z-10">
                      <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                        {category}
                      </span>
                   </div>
                </Link>
                
                <div className="p-6 flex flex-col flex-1 bg-white">
                  <Link href={`/subject/${subject.slug}`}>
                    <h3 className="text-[18px] font-bold leading-tight mb-3 group-hover:text-primary transition-colors text-gray-900 line-clamp-2">
                       {subject.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">{subject.description}</p>
                  
                  <div className="flex items-center gap-4 text-[12px] font-semibold text-gray-400 mb-6 border-b border-gray-100 pb-5">
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-primary" /> {subject.sections ? subject.sections.length : 8} Modules</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-orange-500" /> 5h 20m</span>
                  </div>
                  
                  <div className="mt-auto">
                     {isEnrolled ? (
                       <Link 
                          href={`/learn/${subject.id}`}
                          className="w-full py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white text-[14px] font-bold rounded-xl text-center flex items-center justify-center transition-colors"
                       >
                          Continue Learning
                       </Link>
                     ) : (
                       <Link 
                          href={`/subject/${subject.slug}`}
                          className="w-full py-3 bg-white border-2 border-gray-100 text-gray-700 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 text-[14px] font-bold rounded-xl text-center block transition-all shadow-sm"
                       >
                          View Syllabus
                       </Link>
                     )}
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className="col-span-full py-20 text-center text-gray-500 text-lg">
              No subjects found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
