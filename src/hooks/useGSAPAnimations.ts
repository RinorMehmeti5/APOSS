"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ═══════════════════════════════════════════════════
   1. useScatteredText — Chars scatter → reassemble on scroll
   ═══════════════════════════════════════════════════ */
export function useScatteredText(options?: {
  scrub?: boolean;
  delay?: number;
  triggerStart?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      import("split-type").then(({ default: SplitType }) => {
        const split = new SplitType(ref.current!, { types: "chars" });
        if (!split.chars || split.chars.length === 0) return;

        // Scatter chars randomly
        split.chars.forEach((char) => {
          gsap.set(char, {
            x: gsap.utils.random(-300, 300),
            y: gsap.utils.random(-200, 200),
            rotation: gsap.utils.random(-180, 180),
            opacity: 0,
            scale: gsap.utils.random(0.3, 1.8),
          });
        });

        const useScrub = options?.scrub !== false;

        if (useScrub) {
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
              start: options?.triggerStart ?? "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          });
        } else {
          // On-load animation (for hero)
          gsap.to(split.chars, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            stagger: 0.015,
            delay: options?.delay ?? 0.3,
            ease: "power4.out",
          });
        }
      });
    },
    { scope: ref }
  );

  return ref;
}

/* ═══════════════════════════════════════════════════
   2. useLineReveal — Lines slide up from clip mask
   ═══════════════════════════════════════════════════ */
export function useLineReveal(options?: {
  stagger?: number;
  delay?: number;
  scrub?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      import("split-type").then(({ default: SplitType }) => {
        const split = new SplitType(ref.current!, { types: "lines" });
        if (!split.lines || split.lines.length === 0) return;

        // Wrap each line's content in a span and set overflow hidden on the line
        split.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "block";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
          gsap.set(line, { y: "110%" });
        });

        const targets = ref.current!.querySelectorAll(".line");

        if (options?.scrub) {
          gsap.to(targets, {
            y: "0%",
            stagger: options?.stagger ?? 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          });
        } else {
          gsap.to(targets, {
            y: "0%",
            duration: 0.8,
            stagger: options?.stagger ?? 0.1,
            delay: options?.delay ?? 0,
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

  return ref;
}

/* ═══════════════════════════════════════════════════
   3. useCharStagger — Chars fade in with stagger
   ═══════════════════════════════════════════════════ */
export function useCharStagger(options?: {
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      import("split-type").then(({ default: SplitType }) => {
        const split = new SplitType(ref.current!, { types: "chars" });
        if (!split.chars || split.chars.length === 0) return;

        gsap.from(split.chars, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: options?.stagger ?? 0.02,
          delay: options?.delay ?? 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return ref;
}

/* ═══════════════════════════════════════════════════
   4. useHorizontalScroll — Pin + scroll horizontally
   ═══════════════════════════════════════════════════ */
export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;

      // Only enable on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current!;
        const totalScroll = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + totalScroll,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return { containerRef, trackRef };
}

/* ═══════════════════════════════════════════════════
   5. useParallaxLayers — Multi-element parallax
   ═══════════════════════════════════════════════════ */
export function useParallaxLayers(
  layers: { ref: React.RefObject<HTMLElement | null>; speed: number }[]
) {
  useGSAP(() => {
    layers.forEach(({ ref, speed }) => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });
}

/* ═══════════════════════════════════════════════════
   6. useMouseFollow — Element follows cursor
   ═══════════════════════════════════════════════════ */
export function useMouseFollow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!followerRef.current) return;
    xTo.current = gsap.quickTo(followerRef.current, "x", {
      duration: 0.4,
      ease: "power2.out",
    });
    yTo.current = gsap.quickTo(followerRef.current, "y", {
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    xTo.current?.(e.clientX - rect.left);
    yTo.current?.(e.clientY - rect.top);
  }, []);

  const onMouseEnter = useCallback(() => {
    if (!followerRef.current) return;
    gsap.to(followerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    if (!followerRef.current) return;
    gsap.to(followerRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseEnter, onMouseLeave]);

  return { containerRef, followerRef };
}

/* ═══════════════════════════════════════════════════
   7. useClipPathReveal — Clip-path entrance on scroll
   ═══════════════════════════════════════════════════ */
export function useClipPathReveal(
  direction: "left" | "right" | "bottom" | "center" = "left",
  options?: { duration?: number; delay?: number }
) {
  const ref = useRef<HTMLDivElement>(null);

  const clipMap = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
    bottom: "inset(100% 0 0 0)",
    center: "inset(50% 50% 50% 50%)",
  };

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { clipPath: clipMap[direction] },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: options?.duration ?? 1.2,
          delay: options?.delay ?? 0,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return ref;
}

/* ═══════════════════════════════════════════════════
   8. useScrollVelocity — Track scroll velocity
   ═══════════════════════════════════════════════════ */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        setVelocity(Math.abs(self.getVelocity()));
      },
    });
    return () => trigger.kill();
  }, []);

  return velocity;
}

/* ═══════════════════════════════════════════════════
   9. useCountUp — Animated number counter
   ═══════════════════════════════════════════════════ */
export function useCountUp(
  target: number,
  options?: { duration?: number; suffix?: string; decimals?: number }
) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: options?.duration ?? 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (!ref.current) return;
          const val =
            options?.decimals && options.decimals > 0
              ? obj.val.toFixed(options.decimals)
              : Math.round(obj.val).toLocaleString();
          ref.current.textContent = val + (options?.suffix ?? "");
        },
      });
    },
    { scope: ref }
  );

  return ref;
}

/* ═══════════════════════════════════════════════════
   10. useMagneticCursor — Magnetic pull on hover
   ═══════════════════════════════════════════════════ */
export function useMagneticCursor(strength: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}

/* ═══════════════════════════════════════════════════
   Legacy aliases (for gradual migration)
   ═══════════════════════════════════════════════════ */
export const useFadeIn = (options?: {
  delay?: number;
  y?: number;
  duration?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.from(ref.current, {
        opacity: 0,
        y: options?.y ?? 40,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref }
  );
  return ref;
};

export const useStaggerReveal = (options?: {
  stagger?: number;
  y?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      const children = ref.current.children;
      if (children.length === 0) return;
      gsap.from(children, {
        opacity: 0,
        y: options?.y ?? 40,
        duration: 0.7,
        stagger: options?.stagger ?? 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: ref }
  );
  return ref;
};
