"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface PinnedStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
}

interface PinnedScrollSectionProps {
  steps: PinnedStep[];
  className?: string;
}

export default function PinnedScrollSection({
  steps,
  className = "",
}: PinnedScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<HTMLSpanElement>(null);
  const activeSubRef = useRef<HTMLSpanElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !stepsContainerRef.current) return;

      const stepEls = stepsContainerRef.current.querySelectorAll<HTMLElement>(".pinned-step");

      // Progress bar animation
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Animate each step as it enters the viewport
      stepEls.forEach((step, i) => {
        const stepData = steps[i];

        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => updatePinnedContent(i, stepData),
          onEnterBack: () => updatePinnedContent(i, stepData),
        });

        // Fade in step content
        gsap.fromTo(
          step,
          { opacity: 0.3, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );

        // Fade out step content when scrolling past
        gsap.to(step, {
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: step,
            start: "bottom 45%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      });

      function updatePinnedContent(index: number, stepData: PinnedStep) {
        // Update visual gradient
        if (visualRef.current) {
          gsap.to(visualRef.current, {
            background: stepData.gradient,
            duration: 0.6,
            ease: "power2.inOut",
          });
        }

        // Update index number
        if (activeIndexRef.current) {
          gsap.to(activeIndexRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            onComplete: () => {
              if (activeIndexRef.current) {
                activeIndexRef.current.textContent = String(index + 1).padStart(2, "0");
                gsap.to(activeIndexRef.current, { opacity: 1, y: 0, duration: 0.3 });
              }
            },
          });
        }

        // Update subtitle
        if (activeSubRef.current) {
          gsap.to(activeSubRef.current, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              if (activeSubRef.current) {
                activeSubRef.current.textContent = stepData.subtitle;
                gsap.to(activeSubRef.current, { opacity: 1, duration: 0.3 });
              }
            },
          });
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Pinned left panel — visual showcase */}
        <div
          className="hidden lg:flex w-1/2 h-screen items-center justify-center sticky top-0"
        >
          <div className="relative w-full max-w-2xl mx-auto px-12">
            {/* Large visual card */}
            <div
              ref={visualRef}
              className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: steps[0]?.gradient || "linear-gradient(135deg, #0f2744, #1e3a5f)" }}
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border border-white/10 rounded-full" />
                <div className="absolute w-40 h-40 border border-white/5 rounded-full" />
                <div className="absolute w-56 h-56 border border-white/[0.03] rounded-full" />
              </div>

              {/* Step number overlay */}
              <div className="absolute bottom-6 left-8">
                <span
                  ref={activeIndexRef}
                  className="text-7xl font-bold text-white/15 block"
                  style={{ fontFamily: "var(--font-playfair, serif)" }}
                >
                  01
                </span>
              </div>

              {/* Subtitle badge */}
              <div className="absolute top-6 left-8">
                <span
                  ref={activeSubRef}
                  className="text-xs uppercase tracking-[0.2em] text-white/50 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  {steps[0]?.subtitle || ""}
                </span>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="w-[2px] h-48 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="w-full h-full bg-[var(--color-accent)] origin-top"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>
              <span className="text-[10px] text-white/30 uppercase tracking-wider">
                {steps.length} steps
              </span>
            </div>
          </div>
        </div>

        {/* Scrolling right panel — step content */}
        <div ref={stepsContainerRef} className="w-full lg:w-1/2 lg:pl-8">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className="pinned-step min-h-[60vh] flex items-center"
            >
              <div className="py-12 px-6 lg:px-12 max-w-xl">
                {/* Mobile-only visual card */}
                <div
                  className="lg:hidden mb-8 aspect-video rounded-2xl overflow-hidden relative"
                  style={{ background: step.gradient }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border border-white/10 rounded-full" />
                    <div className="absolute w-28 h-28 border border-white/5 rounded-full" />
                  </div>
                  <span
                    className="absolute bottom-4 left-6 text-5xl font-bold text-white/10"
                    style={{ fontFamily: "var(--font-playfair, serif)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Step label */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {step.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-playfair, serif)" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--color-text-on-dark-secondary)] text-base leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative line */}
                <div className="mt-8 w-12 h-[2px] bg-[var(--color-accent)]/30 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
