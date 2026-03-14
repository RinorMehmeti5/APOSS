"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ScatteredTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  scrub?: boolean;
  delay?: number;
}

export default function ScatteredText({
  text,
  tag: Tag = "h2",
  className = "",
  scrub = true,
  delay = 0.3,
}: ScatteredTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      import("split-type").then(({ default: SplitType }) => {
        const split = new SplitType(ref.current!, { types: "chars" });
        if (!split.chars || split.chars.length === 0) return;

        split.chars.forEach((char) => {
          gsap.set(char, {
            x: gsap.utils.random(-300, 300),
            y: gsap.utils.random(-200, 200),
            rotation: gsap.utils.random(-180, 180),
            opacity: 0,
            scale: gsap.utils.random(0.3, 1.8),
            willChange: "transform, opacity",
          });
        });

        if (scrub) {
          gsap.to(split.chars, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.02,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          });
        } else {
          gsap.to(split.chars, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            stagger: 0.015,
            delay,
            ease: "power4.out",
          });
        }
      });
    },
    { scope: ref }
  );

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={`split-parent ${className}`}
    >
      {text}
    </Tag>
  );
}
