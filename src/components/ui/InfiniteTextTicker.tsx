"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface InfiniteTextTickerProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  separator?: string;
}

export default function InfiniteTextTicker({
  text,
  speed = 20,
  direction = "left",
  className = "",
  separator = " · ",
}: InfiniteTextTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;

      const track = trackRef.current;
      const fullText = `${text}${separator}`;
      // We need enough repetitions to fill the screen
      const repetitions = 8;
      track.innerHTML = Array(repetitions)
        .fill(
          `<span class="whitespace-nowrap">${fullText}</span>`
        )
        .join("");

      // Measure one repetition's width
      const firstChild = track.children[0] as HTMLElement;
      const singleWidth = firstChild.offsetWidth;
      const halfWidth = singleWidth * (repetitions / 2);

      // Set direction
      const xStart = direction === "left" ? 0 : -halfWidth;
      const xEnd = direction === "left" ? -halfWidth : 0;

      gsap.set(track, { x: xStart });

      const duration = (halfWidth / speed) * 0.1;

      tweenRef.current = gsap.to(track, {
        x: xEnd,
        duration,
        ease: "none",
        repeat: -1,
      });

      // Keep constant timeScale
      tweenRef.current.timeScale(1);
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <div ref={trackRef} className="inline-flex will-change-transform" />
    </div>
  );
}
