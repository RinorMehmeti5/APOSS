"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";

interface MouseFollowItem {
  text: string;
  subtitle?: string;
  image?: string;
  href?: string;
}

interface MouseFollowImageProps {
  items: MouseFollowItem[];
  className?: string;
}

export default function MouseFollowImage({
  items,
  className = "",
}: MouseFollowImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
    if (!followerRef.current || !isDesktop) return;
    xTo.current = gsap.quickTo(followerRef.current, "x", {
      duration: 0.4,
      ease: "power2.out",
    });
    yTo.current = gsap.quickTo(followerRef.current, "y", {
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isDesktop]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !isDesktop) return;
      const rect = containerRef.current.getBoundingClientRect();
      xTo.current?.(e.clientX - rect.left - 140);
      yTo.current?.(e.clientY - rect.top - 100);
    },
    [isDesktop]
  );

  const onItemEnter = useCallback(
    (index: number) => {
      setActiveIndex(index);
      if (!followerRef.current || !isDesktop) return;
      gsap.to(followerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    },
    [isDesktop]
  );

  const onContainerLeave = useCallback(() => {
    setActiveIndex(null);
    if (!followerRef.current || !isDesktop) return;
    gsap.to(followerRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power3.out",
    });
  }, [isDesktop]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onContainerLeave}
    >
      {/* Floating image follower (desktop only) */}
      {isDesktop && (
        <div
          ref={followerRef}
          className="absolute top-0 left-0 w-[280px] h-[200px] rounded-xl overflow-hidden pointer-events-none z-10 opacity-0 scale-75"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-bg-dark-elevated)] flex items-center justify-center transition-opacity duration-200 ${
                activeIndex === i ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[var(--color-accent)] text-5xl font-bold opacity-30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Text list */}
      <div className="relative z-20">
        {items.map((item, i) => {
          const Tag = item.href ? "a" : "div";
          return (
            <Tag
              key={i}
              href={item.href}
              className={`group block border-b border-[var(--color-border-dark)] py-6 md:py-8 cursor-pointer transition-colors duration-300 ${
                activeIndex === i
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text-on-dark)]"
              }`}
              onMouseEnter={() => onItemEnter(i)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="text-[var(--color-text-on-dark-muted)] text-sm font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-3"
                    style={{
                      fontFamily: "var(--font-playfair, serif)",
                    }}
                  >
                    {item.text}
                  </h3>
                </div>
                {item.subtitle && (
                  <span className="hidden md:block text-[var(--color-text-on-dark-muted)] text-sm max-w-[200px] text-right">
                    {item.subtitle}
                  </span>
                )}
                <svg
                  className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              {/* Mobile: show inline image */}
              {!isDesktop && (
                <div className="mt-4 h-40 rounded-lg overflow-hidden bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-bg-dark-elevated)] flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[var(--color-accent)] text-4xl font-bold opacity-20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
              )}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
