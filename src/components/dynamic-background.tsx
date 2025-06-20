"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { selectDynamicBackground, type BackgroundSignal, type SelectedBackground } from '@/ai/flows/dynamic-background-selector';
import { Skeleton } from '@/components/ui/skeleton';

const getDayOfWeek = (date: Date): BackgroundSignal['dayOfWeek'] => {
  const days: BackgroundSignal['dayOfWeek'][] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

const getTimeOfDay = (date: Date): BackgroundSignal['timeOfDay'] => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
};

export function DynamicBackground({ children }: { children: React.ReactNode }) {
  const [background, setBackground] = useState<SelectedBackground | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [currentTraffic, setCurrentTraffic] = useState<number | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
    setCurrentTraffic(Math.floor(Math.random() * 1000) + 1); // 1 to 1000
  }, []);

  useEffect(() => {
    if (!currentDate || currentTraffic === null) return;

    const fetchBackground = async () => {
      setLoading(true);
      setError(null);
      try {
        const signals: BackgroundSignal = {
          timeOfDay: getTimeOfDay(currentDate),
          dayOfWeek: getDayOfWeek(currentDate),
          upcomingEvents: "Restaurant Week promotion starting next Monday. Valentine's Day special menu available Feb 10-14.",
          websiteTraffic: currentTraffic,
        };
        const result = await selectDynamicBackground(signals);
        setBackground(result);
      } catch (err) {
        console.error("Failed to select dynamic background:", err);
        setError("Could not load dynamic background. Displaying default.");
        // Fallback background
        setBackground({
          mediaType: 'image',
          mediaUrl: 'https://placehold.co/1920x1080.png', // Default placeholder
          reason: 'Fallback due to error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBackground();
  }, [currentDate, currentTraffic]);

  const mediaUrl = background?.mediaUrl || 'https://placehold.co/1920x1080.png';
  const mediaType = background?.mediaType || 'image';
  const dataAiHint = mediaType === 'image' ? 'food restaurant' : 'food video';

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center text-primary-foreground overflow-hidden">
      {loading && (!background || background.mediaUrl.includes('placehold.co')) ? (
        <Skeleton className="absolute inset-0 w-full h-full" />
      ) : mediaType === 'image' ? (
        <Image
          src={mediaUrl}
          alt={background?.reason || "Dynamic background image"}
          layout="fill"
          objectFit="cover"
          quality={85}
          priority
          className="z-0"
          data-ai-hint={dataAiHint}
          unoptimized={mediaUrl.startsWith('http://') || mediaUrl.startsWith('https://placehold.co')} // Avoid optimizing placeholders
        />
      ) : (
        <video
          src={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          data-ai-hint={dataAiHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 container mx-auto px-4 text-center">
        {children}
      </div>
       {error && <div role="alert" className="absolute bottom-4 left-4 bg-destructive text-destructive-foreground p-3 rounded-md z-30 text-sm">{error}</div>}
    </div>
  );
}
