"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ParallaxLayer {
  src?: string;
  gradient?: string;
  content?: React.ReactNode;
  speed: number; // -1 to 1, negative = moves opposite
  className?: string;
  label?: string;
}

interface ParallaxHeroSectionProps {
  layers: ParallaxLayer[];
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export default function ParallaxHeroSection({
  layers,
  children,
  className = "",
  height = "min-h-screen",
}: ParallaxHeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const layerEls =
          containerRef.current!.querySelectorAll<HTMLElement>(".parallax-layer");

        layerEls.forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.5");
          const yDistance = speed * 60; // vh units worth of movement

          gsap.fromTo(
            el,
            { y: `${-yDistance}vh` },
            {
              y: `${yDistance}vh`,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        // Fade-in entrance for layers
        gsap.from(layerEls, {
          opacity: 0,
          scale: 1.1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power2.out",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${height} overflow-hidden ${className}`}
    >
      {/* Parallax layers */}
      {layers.map((layer, i) => (
        <div
          key={i}
          className={`parallax-layer absolute pointer-events-none ${layer.className || ""}`}
          data-speed={layer.speed}
        >
          {layer.content ? (
            layer.content
          ) : layer.src ? (
            <img
              src={layer.src}
              alt={layer.label || ""}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full rounded-2xl"
              style={{ background: layer.gradient || "rgba(59,130,246,0.1)" }}
            >
              {layer.label && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 text-sm font-medium tracking-wider uppercase">
                    {layer.label}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Content overlay */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
