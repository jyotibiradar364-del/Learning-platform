'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import VideoPlayer from '@/components/VideoPlayer';
import { Download, AlignLeft, Folder, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LearnPage() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState<any>(null);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, progressRes] = await Promise.all([
          axios.get(`/subjects/id/${subjectId}`),
          axios.get(`/videos/subject-progress/${subjectId}`)
        ]);
        setSubject(subjectRes.data);
        setProgress(progressRes.data);
        
        const lastWatched = progressRes.data.sort((a: any, b: any) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )[0];

        if (lastWatched) {
          const video = subjectRes.data.sections
            .flatMap((s: any) => s.videos)
            .find((v: any) => v.id === lastWatched.video_id);
          setCurrentVideo(video || subjectRes.data.sections[0].videos[0]);
        } else {
          setCurrentVideo(subjectRes.data.sections[0].videos[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subjectId]);

  if (loading) return <div className="editorial-container py-20 text-center text-on-surface-variant font-medium">Opening Classroom...</div>;
  if (!subject) return <div className="editorial-container py-20 text-center">Subject not found</div>;

  return (
    <div className="flex bg-gray-50 min-h-[calc(100vh-72px)] overflow-hidden">
      <Sidebar 
        sections={subject.sections} 
        currentVideoId={currentVideo?.id}
        onVideoSelect={setCurrentVideo}
        progress={progress}
      />
      
      <main className="flex-1 overflow-y-auto w-full h-[calc(100vh-72px)] bg-gray-50">
        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-10">
          
          {/* Main Video Area */}
          <div className="w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-[24px] overflow-hidden shadow-2xl shadow-slate-900/20 relative flex items-center justify-center border-4 border-white">
            {currentVideo ? (
              <VideoPlayer 
                key={currentVideo.id}
                videoId={currentVideo.id} 
                youtubeUrl={currentVideo.youtube_url} 
                initialTime={progress.find(p => p.video_id === currentVideo.id)?.last_position_seconds || 0}
              />
            ) : (
              <div className="text-white text-center">
                 <h2 className="text-5xl font-medium tracking-wide text-white/50 mb-6">COURSE CONTENT</h2>
                 <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm hover:bg-white/30 transition">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-2" />
                 </button>
              </div>
            )}
            {/* The blue progress bar from makeup 3 */}
            <div className="absolute bottom-0 left-0 h-1 bg-primary" style={{ width: '45%' }}></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">
            {/* Video Details */}
            <div className="space-y-6">
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                  <Folder className="w-3.5 h-3.5" />
                  <span>Module 01 • Lesson 02</span>
               </div>
               
               <h1 className="text-[36px] font-extrabold text-gray-900 leading-tight tracking-tight">
                  {currentVideo?.title || "Tonal Architecture & Surface Layers"}
               </h1>
               
               <p className="text-[17px] text-gray-600 leading-relaxed max-w-2xl font-medium">
                  Explore how to define depth without shadows. We will study the application of background shifts and tonal hierarchy to create a sophisticated, quiet interface that guides the eye naturally.
               </p>
               
               <div className="flex flex-wrap gap-4 pt-4">
                  <button onClick={() => alert('Downloading resources...')} className="flex items-center gap-2.5 px-6 py-3.5 bg-white border-2 border-gray-100 rounded-xl text-[14px] font-bold text-gray-700 hover:border-primary hover:text-primary transition shadow-sm">
                     <Download className="w-4 h-4" />
                     Lesson Resources
                  </button>
                  <button onClick={() => alert('Opening notes pad...')} className="flex items-center gap-2.5 px-6 py-3.5 bg-white border-2 border-gray-100 rounded-xl text-[14px] font-bold text-gray-700 hover:border-primary hover:text-primary transition shadow-sm">
                     <AlignLeft className="w-4 h-4" />
                     Take Notes
                  </button>
               </div>
            </div>

            {/* Up Next Card */}
            <aside className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5">
               <h4 className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-5">Up Next</h4>
               
               <div className="space-y-6">
                  <div className="w-full aspect-[16/10] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center p-4 text-center text-white font-serif shadow-inner relative overflow-hidden">
                     <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                     <div className="relative z-10 drop-shadow-md">
                        <p className="text-[20px] font-extrabold italic">Next</p>
                        <p className="text-[32px] font-black leading-tight">Lessons</p>
                     </div>
                  </div>
                  
                  {(() => {
                    if (!subject || !currentVideo) return null;
                    const allVideos = subject.sections.flatMap((s: any) => s.videos);
                    const currentIndex = allVideos.findIndex((v: any) => v.id === currentVideo.id);
                    const nextVideo = currentIndex !== -1 && currentIndex + 1 < allVideos.length ? allVideos[currentIndex + 1] : null;

                    if (!nextVideo) {
                      return (
                        <div className="text-center py-4">
                          <p className="text-[16px] font-bold text-gray-900 tracking-tight leading-snug">Course Complete!</p>
                          <Link href="/profile" className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white font-bold text-[15px] py-4 rounded-xl hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all">
                             View Certificate <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      );
                    }
                    return (
                      <>
                        <p className="text-[16px] font-bold text-gray-900 tracking-tight leading-snug">{nextVideo.title}</p>
                        <button 
                          onClick={() => setCurrentVideo(nextVideo)}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white font-bold text-[15px] py-4 rounded-xl hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all"
                        >
                           Start Lesson <ArrowRight className="w-4 h-4" />
                        </button>
                      </>
                    );
                  })()}
               </div>
            </aside>
          </div>

        </div>
      </main>
    </div>
  );
}
