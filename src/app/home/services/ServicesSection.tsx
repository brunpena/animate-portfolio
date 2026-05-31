'use client';
import { useRef, useEffect } from 'react';
import DayServices from './DayServices/DayServices.page';
import MeetingRoom from './MeetingRoom/MeetingRoom.page';
import ParcelFoods from './ParcelFoods/ParcelFoods.page';

const PANELS = 3;

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const onScroll = () => {
      const { top } = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / scrollable));
      track.style.transform = `translateX(${-progress * (PANELS - 1) * 100}vw)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={sectionRef} style={{ height: `${PANELS * 100}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            width: `${PANELS * 100}vw`,
            height: '100%',
            willChange: 'transform',
          }}
        >
            <div style={{ width: '100vw', flexShrink: 0, height: '100%' }}>
            <MeetingRoom />
          </div>
          <div style={{ width: '100vw', flexShrink: 0, height: '100%' }}>
            <DayServices />
          </div>
          <div style={{ width: '100vw', flexShrink: 0, height: '100%' }}>
            <ParcelFoods />
          </div>
        </div>
      </div>
    </div>
  );
}
