"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  gradient: string;
  image?: string;
}

interface ScrollReveal3DGalleryProps {
  items: GalleryItem[];
  className?: string;
}

export default function ScrollReveal3DGallery({
  items,
  className = "",
}: ScrollReveal3DGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cards =
          containerRef.current!.querySelectorAll<HTMLElement>(".gallery-3d-item");

        cards.forEach((card, i) => {
          // Randomized rotation for organic feel
          const rotateX = (Math.random() - 0.5) * 40; // -20 to 20
          const rotateY = (Math.random() - 0.5) * 50; // -25 to 25
          const rotateZ = (Math.random() - 0.5) * 10; // -5 to 5
          const xOffset = (Math.random() - 0.5) * 100;

          gsap.fromTo(
            card,
            {
              rotateX,
              rotateY,
              rotateZ,
              x: xOffset,
              y: 80,
              opacity: 0,
              scale: 0.8,
              transformPerspective: 1200,
              transformOrigin: "center center",
            },
            {
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 40%",
                scrub: 1,
              },
            }
          );

          // Subtle float on scroll past
          gsap.to(card, {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 40%",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      // Mobile: simple stagger
      mm.add("(max-width: 767px)", () => {
        const cards =
          containerRef.current!.querySelectorAll<HTMLElement>(".gallery-3d-item");

        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.8,
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
    <div ref={containerRef} className={className} style={{ perspective: "1200px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="gallery-3d-item will-change-transform"
          >
            <div className="card-dark rounded-2xl overflow-hidden group cursor-pointer transition-shadow duration-500 hover:shadow-[0_0_40px_var(--color-accent-glow)]">
              {/* Image area */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{ background: item.gradient }}
                >
                  {/* Decorative circles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full" />

                  {/* Number watermark */}
                  <span
                    className="absolute top-4 right-6 text-6xl font-bold text-white/10"
                    style={{ fontFamily: "var(--font-playfair, serif)" }}
                  >
                    {String(item.id).padStart(2, "0")}
                  </span>
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-transparent to-transparent opacity-60" />
              </div>

              {/* Text */}
              <div className="p-6 relative">
                <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">
                    {String(item.id).padStart(2, "0")}
                  </span>
                </div>
                <div className="pt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-2">
                    {item.subtitle}
                  </p>
                  <h3 className="text-xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
