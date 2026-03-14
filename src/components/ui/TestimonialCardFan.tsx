"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface TestimonialCard {
  quote: string;
  name: string;
  business: string;
  initials: string;
}

interface TestimonialCardFanProps {
  cards: TestimonialCard[];
  className?: string;
}

export default function TestimonialCardFan({
  cards,
  className = "",
}: TestimonialCardFanProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const cardEls =
        containerRef.current.querySelectorAll<HTMLElement>(".fan-card");
      const center = (cards.length - 1) / 2;

      const mm = gsap.matchMedia();

      // Desktop: fan effect
      mm.add("(min-width: 768px)", () => {
        // Start stacked
        gsap.set(cardEls, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0.95,
          opacity: 0.8,
        });

        // Fan out on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          },
        });

        cardEls.forEach((card, i) => {
          const offset = i - center;
          tl.to(
            card,
            {
              x: offset * 80,
              rotation: offset * 6,
              y: Math.abs(offset) * -15,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            0
          );
        });

        // Hover lift effect
        cardEls.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: "-=20",
              scale: 1.05,
              zIndex: 20,
              duration: 0.3,
              ease: "power2.out",
            });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: "+=20",
              scale: 1,
              zIndex: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      });

      // Mobile: simple stagger
      mm.add("(max-width: 767px)", () => {
        gsap.from(cardEls, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Desktop: overlapping centered layout */}
      <div className="hidden md:flex justify-center items-center min-h-[400px] relative">
        {cards.map((card, i) => (
          <div
            key={i}
            className="fan-card absolute w-[340px] card-light p-8 cursor-pointer transition-shadow duration-300 hover:shadow-xl"
            style={{ zIndex: i + 1 }}
          >
            <p className="text-[var(--color-text-on-light-secondary)] text-base leading-relaxed mb-6 italic">
              &ldquo;{card.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold">
                {card.initials}
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text-on-light)] text-sm">
                  {card.name}
                </p>
                <p className="text-[var(--color-text-on-light-muted)] text-xs">
                  {card.business}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-4">
        {cards.map((card, i) => (
          <div key={i} className="fan-card card-light p-6">
            <p className="text-[var(--color-text-on-light-secondary)] text-sm leading-relaxed mb-4 italic">
              &ldquo;{card.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
                {card.initials}
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text-on-light)] text-sm">
                  {card.name}
                </p>
                <p className="text-[var(--color-text-on-light-muted)] text-xs">
                  {card.business}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
