"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ShowcaseItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  gradient: string;
  label: string;
}

interface AnimatedProductShowcaseProps {
  items: ShowcaseItem[];
  className?: string;
}

export default function AnimatedProductShowcase({
  items,
  className = "",
}: AnimatedProductShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards =
        containerRef.current.querySelectorAll<HTMLElement>(".showcase-card");
      const ripples =
        containerRef.current.querySelectorAll<HTMLElement>(".ripple-bg");

      // Staggered entrance with wave-like timing
      gsap.from(cards, {
        y: 120,
        opacity: 0,
        scale: 0.85,
        rotateX: 15,
        duration: 1,
        stagger: {
          amount: 0.8,
          from: "center",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Ripple wave effect on each card image area
      ripples.forEach((ripple) => {
        gsap.to(ripple, {
          scale: 1.5,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ripple.closest(".showcase-card"),
            start: "top 80%",
            toggleActions: "play pause resume pause",
          },
        });
      });

      // Hover timeline per card
      cards.forEach((card) => {
        const img = card.querySelector(".card-visual");
        const overlay = card.querySelector(".card-overlay");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          });
          if (img) {
            gsap.to(img, { scale: 1.08, duration: 0.6, ease: "power2.out" });
          }
          if (overlay) {
            gsap.to(overlay, { opacity: 1, duration: 0.3 });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
          if (img) {
            gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
          }
          if (overlay) {
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
          }
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="showcase-card group cursor-pointer"
            style={{ perspective: "1000px" }}
          >
            <div className="card-light rounded-2xl overflow-hidden h-full">
              {/* Visual area */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className="card-visual absolute inset-0"
                  style={{ background: item.gradient }}
                >
                  {/* Ripple circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="ripple-bg w-24 h-24 rounded-full border-2 border-white/20"
                      style={{ transformOrigin: "center" }}
                    />
                  </div>

                  {/* Label badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                      {item.label}
                    </span>
                  </div>

                  {/* Large number watermark */}
                  <span
                    className="absolute bottom-2 right-4 text-8xl font-bold text-white/10"
                    style={{ fontFamily: "var(--font-playfair, serif)" }}
                  >
                    {String(item.id).padStart(2, "0")}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="card-overlay absolute inset-0 bg-black/30 flex items-center justify-center opacity-0">
                  <span className="text-white text-sm font-semibold tracking-wide uppercase">
                    Learn More
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--color-text-on-light)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-on-light-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
