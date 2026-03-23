'use client';

import { CheckCircle2, Circle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Video {
  id: number;
  title: string;
}

interface Section {
  id: number;
  title: string;
  videos: Video[];
}

interface SidebarProps {
  sections: Section[];
  currentVideoId: number | null;
  onVideoSelect: (video: Video) => void;
  progress: any[];
}

export default function Sidebar({ sections, currentVideoId, onVideoSelect, progress }: SidebarProps) {
  const isVideoCompleted = (videoId: number) => {
    return progress.find(p => p.video_id === videoId)?.is_completed;
  };

  return (
    <div className="w-[340px] h-[calc(100vh-64px)] overflow-y-auto bg-surface-low sticky top-[64px] flex flex-col pt-8 pb-6 px-8 border-r border-[#E6E4DD]">
      <div className="flex-1 space-y-8">
        <header className="space-y-6">
          <h2 className="text-[17px] font-medium leading-tight text-on-surface pr-4">
            Advanced Editorial Design Systems
          </h2>
          
          <div className="space-y-4 pt-4 border-t border-[#E6E4DD]">
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#595853]">Course Progress</span>
                <span className="text-[11px] font-bold text-on-surface">65%</span>
             </div>
             <div className="w-full h-1 bg-[#EBE9E2]">
                <div className="h-full bg-primary" style={{ width: '65%' }} />
             </div>
          </div>
        </header>

        <div className="space-y-8 pt-6">
          {sections.map((section, idx) => (
            <div key={section.id} className="space-y-4">
              <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em]">
                 Module 0{idx + 1}: {section.title}
              </h3>
              <div className="space-y-1">
                {section.videos.map((video) => {
                  const isActive = currentVideoId === video.id;
                  const completed = isVideoCompleted(video.id);

                  return (
                    <button
                      key={video.id}
                      onClick={() => onVideoSelect(video)}
                      className={cn(
                        "w-[calc(100%+24px)] -ml-3 text-left py-2.5 px-3 rounded-full text-[13px] transition flex items-center gap-3",
                        isActive ? "bg-surface shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-primary font-medium" : "text-[#8F8D84] hover:text-on-surface"
                      )}
                    >
                      <div className="flex-shrink-0">
                        {completed ? (
                          <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        ) : isActive ? (
                          <div className="w-[18px] h-[18px] rounded-full border-2 border-primary flex items-center justify-center p-[2px]">
                            <div className="w-full h-full bg-primary rounded-full" />
                          </div>
                        ) : (
                          <div className="w-[18px] h-[18px] rounded-full bg-[#D5D3CB]"></div>
                        )}
                      </div>
                      <span className="truncate">{video.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-8 mt-auto">
        <button 
          onClick={() => window.location.href = '/profile'}
          className="w-full bg-primary text-white font-medium text-[14px] py-3.5 rounded-lg hover:bg-primary/90 transition shadow-sm"
        >
          Exit to Dashboard
        </button>
      </div>
    </div>
  );
}
