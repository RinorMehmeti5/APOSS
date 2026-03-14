"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SplitItem {
  label: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  image?: string;
}

interface SplitScreenMaskRevealProps {
  items: SplitItem[];
  className?: string;
}

export default function SplitScreenMaskReveal({
  items,
  className = "",
}: SplitScreenMaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const sections =
          containerRef.current!.querySelectorAll<HTMLElement>(".split-section");

        sections.forEach((section, i) => {
          const leftContent = section.querySelector(".split-left");
          const rightImage = section.querySelector(".split-right-img");
          const pills = section.querySelectorAll(".split-pill");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "bottom center",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          });

          // Image reveal from bottom via clipPath
          if (rightImage) {
            tl.fromTo(
              rightImage,
              { clipPath: "inset(100% 0px 0px 0px)" },
              {
                clipPath: "inset(0% 0px 0px 0px)",
                duration: 1.2,
                ease: "power3.inOut",
              },
              0
            );
          }

          // Left content slides in
          if (leftContent) {
            tl.from(
              leftContent,
              {
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              0.3
            );
          }

          // Feature pills stagger
          if (pills.length > 0) {
            tl.from(
              pills,
              {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                stagger: 0.06,
                ease: "back.out(2)",
              },
              0.6
            );
          }
        });

        // Pin the entire container on desktop for scroll-through
        if (items.length > 1) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${items.length * 100}%`,
            pin: true,
            pinSpacing: true,
          });

          // Crossfade between sections
          sections.forEach((section, i) => {
            if (i === 0) return; // First section is always visible initially

            gsap.set(section, { opacity: 0, position: "absolute", inset: 0 });

            ScrollTrigger.create({
              trigger: containerRef.current,
              start: `${(i / items.length) * 100}% top`,
              end: `${((i + 1) / items.length) * 100}% top`,
              onEnter: () => {
                // Fade out previous
                if (i > 0) {
                  gsap.to(sections[i - 1], {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                  });
                }
                // Fade in current
                gsap.to(section, {
                  opacity: 1,
                  duration: 0.5,
                  ease: "power2.inOut",
                });
                // Re-trigger clip reveal
                const rightImg = section.querySelector(".split-right-img");
                if (rightImg) {
                  gsap.fromTo(
                    rightImg,
                    { clipPath: "inset(100% 0px 0px 0px)" },
                    {
                      clipPath: "inset(0% 0px 0px 0px)",
                      duration: 1,
                      ease: "power3.inOut",
                    }
                  );
                }
              },
              onLeaveBack: () => {
                gsap.to(section, {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.inOut",
                });
                if (i > 0) {
                  gsap.to(sections[i - 1], {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.inOut",
                  });
                }
              },
            });
          });
        }

        return () => {
          ScrollTrigger.getAll().forEach((t) => {
            if (
              t.trigger === containerRef.current ||
              containerRef.current?.contains(t.trigger as Element)
            )
              t.kill();
          });
        };
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`split-section ${i === 0 ? "" : "md:absolute md:inset-0"} w-full min-h-[80vh] md:h-screen`}
          style={{ zIndex: i + 1 }}
        >
          <div className="flex flex-col md:flex-row h-full">
            {/* Left — Info */}
            <div className="split-left w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
              <div className="max-w-lg">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 mb-6">
                  {item.label}
                </span>

                <h3
                  className="text-3xl md:text-4xl font-bold text-[var(--color-text-on-light)] mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-playfair, serif)" }}
                >
                  {item.title}
                </h3>

                <p className="text-base md:text-lg text-[var(--color-text-on-light-secondary)] mb-8 leading-relaxed">
                  {item.description}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2.5">
                  {item.features.map((feature, fIdx) => (
                    <span
                      key={fIdx}
                      className="split-pill inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
                        border border-[var(--color-border-light)] text-[var(--color-text-on-light-secondary)]
                        transition-all duration-200
                        hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-[var(--color-accent)] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Image with mask reveal */}
            <div className="w-full md:w-1/2 relative overflow-hidden">
              <div
                className="split-right-img h-64 md:h-full"
                style={{ background: item.gradient }}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-40 h-40 border border-white/10 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 border border-white/15 rounded-full" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-5xl font-bold text-white/20"
                        style={{ fontFamily: "var(--font-playfair, serif)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-white/10" />
                <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-white/10" />

                {/* Label */}
                <div className="absolute bottom-6 left-6">
                  <span className="text-sm font-medium text-white/50 tracking-wider uppercase">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
