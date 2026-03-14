"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";

interface SpotlightRevealProps {
  children: React.ReactNode;
  spotlightSize?: number;
  className?: string;
}

export default function SpotlightReveal({
  children,
  spotlightSize = 250,
  className = "",
}: SpotlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const check = () =>
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!overlayRef.current || !isDesktop) return;
    const el = overlayRef.current;

    xTo.current = gsap.quickTo(el, "--mx", {
      duration: 0.3,
      ease: "power2.out",
    });
    yTo.current = gsap.quickTo(el, "--my", {
      duration: 0.3,
      ease: "power2.out",
    });

    // Initialize position off-screen
    gsap.set(el, { "--mx": "50%", "--my": "50%", "--size": "0px" });
  }, [isDesktop]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !isDesktop) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xTo.current?.(`${x}px`);
      yTo.current?.(`${y}px`);
    },
    [isDesktop]
  );

  const onMouseEnter = useCallback(() => {
    if (!overlayRef.current || !isDesktop) return;
    gsap.to(overlayRef.current, {
      "--size": `${spotlightSize}px`,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [isDesktop, spotlightSize]);

  const onMouseLeave = useCallback(() => {
    if (!overlayRef.current || !isDesktop) return;
    gsap.to(overlayRef.current, {
      "--size": "0px",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [isDesktop]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Content (always visible) */}
      <div className="relative z-10">{children}</div>

      {/* Spotlight overlay (desktop only) */}
      {isDesktop && (
        <div
          ref={overlayRef}
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle var(--size, 0px) at var(--mx, 50%) var(--my, 50%), transparent 0%, rgba(10, 10, 10, 0.85) 100%)`,
          }}
        />
      )}
    </div>
  );
}
