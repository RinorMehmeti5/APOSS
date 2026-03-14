"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ImageClipRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "bottom" | "center";
  className?: string;
  duration?: number;
  delay?: number;
  scale?: boolean;
}

export default function ImageClipReveal({
  children,
  direction = "left",
  className = "",
  duration = 1.2,
  delay = 0,
  scale = true,
}: ImageClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const clipMap: Record<string, string> = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
    bottom: "inset(100% 0 0 0)",
    center: "inset(50% 50% 50% 50%)",
  };

  useGSAP(
    () => {
      if (!ref.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        ref.current,
        { clipPath: clipMap[direction] },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration,
          delay,
          ease: "power3.inOut",
        }
      );

      if (scale && innerRef.current) {
        tl.from(
          innerRef.current,
          {
            scale: 1.2,
            duration: duration * 1.2,
            ease: "power3.out",
          },
          0
        );
      }
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
