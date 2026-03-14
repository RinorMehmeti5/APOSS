"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ParallaxLayer {
  content: React.ReactNode;
  speed: number;
  zIndex?: number;
  className?: string;
}

interface ParallaxDepthLayersProps {
  layers: ParallaxLayer[];
  className?: string;
}

export default function ParallaxDepthLayers({
  layers,
  className = "",
}: ParallaxDepthLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const layerEls =
        containerRef.current.querySelectorAll<HTMLElement>(".parallax-layer");

      layerEls.forEach((el, i) => {
        const speed = layers[i]?.speed ?? 0;
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          className={`parallax-layer absolute inset-0 pointer-events-none ${layer.className ?? ""}`}
          style={{ zIndex: layer.zIndex ?? i }}
        >
          {layer.content}
        </div>
      ))}
    </div>
  );
}
