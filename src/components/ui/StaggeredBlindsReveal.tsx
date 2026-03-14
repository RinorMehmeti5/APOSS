"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface StaggeredBlindsRevealProps {
  children: React.ReactNode;
  blindCount?: number;
  direction?: "horizontal" | "vertical";
  className?: string;
  staggerFrom?: "center" | "start" | "end" | "edges";
  color?: string;
}

export default function StaggeredBlindsReveal({
  children,
  blindCount = 6,
  direction = "horizontal",
  className = "",
  staggerFrom = "center",
  color = "var(--color-bg-dark)",
}: StaggeredBlindsRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blindsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !blindsRef.current) return;

      const blinds =
        blindsRef.current.querySelectorAll<HTMLElement>(".blind-strip");

      // On scroll into view, blinds slide away to reveal content
      gsap.to(blinds, {
        ...(direction === "horizontal"
          ? { xPercent: 100 }
          : { yPercent: 100 }),
        duration: 1,
        stagger: {
          amount: 0.5,
          from: staggerFrom,
        },
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  const isHorizontal = direction === "horizontal";

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Content underneath */}
      <div className="relative z-0">{children}</div>

      {/* Blinds overlay */}
      <div ref={blindsRef} className="absolute inset-0 z-10 pointer-events-none flex"
        style={{ flexDirection: isHorizontal ? "column" : "row" }}
      >
        {Array.from({ length: blindCount }).map((_, i) => (
          <div
            key={i}
            className="blind-strip flex-1"
            style={{
              background: color,
              [isHorizontal ? "width" : "height"]: "100%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
