"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface StackingCardsProps {
  cards: { content: React.ReactNode; key?: string }[];
  className?: string;
}

export default function StackingCards({
  cards,
  className = "",
}: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const cardEls =
        containerRef.current.querySelectorAll<HTMLElement>(".stacking-card");

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        cardEls.forEach((card, i) => {
          // Entrance animation
          gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          });

          // Scale down + dim as user scrolls past (except last card)
          if (i < cardEls.length - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: "top 80px",
              end: "bottom 80px",
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(card, {
                  scale: 1 - progress * 0.05,
                  opacity: 1 - progress * 0.4,
                  filter: `brightness(${1 - progress * 0.3})`,
                });
              },
            });
          }
        });

        return () => {
          ScrollTrigger.getAll().forEach((t) => {
            if (containerRef.current?.contains(t.trigger as Element)) t.kill();
          });
        };
      });

      // Mobile: simple stagger reveal
      mm.add("(max-width: 767px)", () => {
        gsap.from(cardEls, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
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
      {cards.map((card, i) => (
        <div
          key={card.key ?? i}
          className="stacking-card sticky top-20 mb-8 md:mb-12"
          style={{ zIndex: i + 1 }}
        >
          {card.content}
        </div>
      ))}
    </div>
  );
}
