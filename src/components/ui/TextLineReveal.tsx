"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface TextLineRevealProps {
  children: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  stagger?: number;
  delay?: number;
  scrub?: boolean;
}

export default function TextLineReveal({
  children,
  tag: Tag = "p",
  className = "",
  stagger = 0.1,
  delay = 0,
  scrub = false,
}: TextLineRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      import("split-type").then(({ default: SplitType }) => {
        const split = new SplitType(ref.current!, { types: "lines" });
        if (!split.lines || split.lines.length === 0) return;

        // Wrap each line in an overflow:hidden container
        split.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "block";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
          gsap.set(line, { y: "110%" });
        });

        const lines = ref.current!.querySelectorAll(".line");

        if (scrub) {
          gsap.to(lines, {
            y: "0%",
            stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          });
        } else {
          gsap.to(lines, {
            y: "0%",
            duration: 0.8,
            stagger,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
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
      {children}
    </Tag>
  );
}
