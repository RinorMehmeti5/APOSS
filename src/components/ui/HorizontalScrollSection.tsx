"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalScrollSection({
  children,
  className = "",
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;

      const mm = gsap.matchMedia();

      // Desktop: horizontal pin scroll
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current!;
        const totalScroll = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + totalScroll,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          ScrollTrigger.getAll().forEach((t) => {
            if (t.trigger === containerRef.current) t.kill();
          });
        };
      });

      // Mobile: no changes, natural vertical flow
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:flex-nowrap"
      >
        {children}
      </div>
    </div>
  );
}
