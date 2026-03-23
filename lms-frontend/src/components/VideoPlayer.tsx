'use client';

import { useEffect, useRef, useState } from 'react';
import axios from '@/lib/axios';

interface VideoPlayerProps {
  videoId: number;
  youtubeUrl: string;
  initialTime: number;
}

export default function VideoPlayer({ videoId, youtubeUrl, initialTime }: VideoPlayerProps) {
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const videoIdMatch = youtubeUrl.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?\/]+)/);
    const ytId = videoIdMatch ? videoIdMatch[1] : youtubeUrl;

    const onYouTubeIframeAPIReady = () => {
      if (document.getElementById(`youtube-player-${videoId}`)) {
        const newPlayer = new (window as any).YT.Player(`youtube-player-${videoId}`, {
          height: '100%',
          width: '100%',
          videoId: ytId,
          playerVars: {
            autoplay: 1,
            start: Math.floor(initialTime),
            modestbranding: 1,
            rel: 0,
            color: 'white'
          },
          events: {
            onStateChange: (event: any) => {
              if (event.data === (window as any).YT.PlayerState.ENDED) {
                axios.post('/videos/progress', {
                  videoId,
                  lastPositionSeconds: 0,
                  isCompleted: true
                });
              }
            }
          }
        });
        setPlayer(newPlayer);
      }
    };

    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else if ((window as any).YT.Player) {
      onYouTubeIframeAPIReady();
    }

    return () => {
      if (player && player.destroy) player.destroy();
    };
  }, [youtubeUrl, videoId, initialTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player && player.getCurrentTime) {
        axios.post('/videos/progress', {
          videoId,
          lastPositionSeconds: Math.floor(player.getCurrentTime()),
          isCompleted: false
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [player, videoId]);

  return (
    <div className="aspect-video w-full bg-on-surface rounded-2xl overflow-hidden shadow-2xl relative">
      <div id={`youtube-player-${videoId}`} className="w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20">
         <div className="h-full bg-primary" style={{ width: '45%' }} />
      </div>
    </div>
  );
}
