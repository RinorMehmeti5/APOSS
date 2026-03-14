"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const isHovering = useRef(false);

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (desktop)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible.current) {
        isVisible.current = true;
        gsap.set([dot, circle], { opacity: 1 });
      }

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(circle, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseEnterHover = () => {
      if (isHovering.current) return;
      isHovering.current = true;
      gsap.to(dot, { scale: 0, duration: 0.2 });
      gsap.to(circle, {
        scale: 2,
        borderColor: "var(--color-accent)",
        backgroundColor: "var(--color-accent-glow)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeaveHover = () => {
      isHovering.current = false;
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(circle, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.4)",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "elastic.out(1, 0.4)",
      });
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      gsap.to([dot, circle], { opacity: 0, duration: 0.2 });
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      gsap.to([dot, circle], { opacity: 1, duration: 0.2 });
    };

    // Attach hover listeners to interactive elements
    const attachHoverListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .cursor-hover"
      );
      targets.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterHover);
        el.addEventListener("mouseleave", onMouseLeaveHover);
      });
      return targets;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let targets = attachHoverListeners();

    // Re-attach on DOM mutations (e.g., page navigation)
    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterHover);
        el.removeEventListener("mouseleave", onMouseLeaveHover);
      });
      targets = attachHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterHover);
        el.removeEventListener("mouseleave", onMouseLeaveHover);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-accent)] pointer-events-none z-[9999] opacity-0 hidden md:block mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Circle */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[9998] opacity-0 hidden md:block mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
};

export default CustomCursor;
