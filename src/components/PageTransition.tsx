"use client";
import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

const PageTransition: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Skip animation on first load
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // Cinematic slide-in then slide-out transition
    const tl = gsap.timeline();
    tl.set(overlay, { display: "block", y: "100%" })
      .to(overlay, {
        y: "0%",
        duration: 0.4,
        ease: "power3.inOut",
      })
      .to(overlay, {
        y: "-100%",
        duration: 0.4,
        ease: "power3.inOut",
        delay: 0.1,
      })
      .set(overlay, { display: "none" });
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990] bg-[var(--color-accent)] pointer-events-none hidden"
      style={{ transform: "translateY(100%)" }}
    >
      {/* Accent line at top of overlay */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white" />
    </div>
  );
};

export default PageTransition;
