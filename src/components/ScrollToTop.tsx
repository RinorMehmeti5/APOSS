"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0;
      setScrollProgress(scrollPercentage);
      setIsVisible(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;
    if (isVisible) {
      gsap.to(buttonRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" });
    } else {
      gsap.to(buttonRef.current, { opacity: 0, scale: 0, duration: 0.25, ease: "power2.in" });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1, ease: "power3.inOut" });
  };

  const circleRadius = 22;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      ref={buttonRef}
      className="fixed right-6 bottom-6 z-50"
      style={{ opacity: 0, transform: "scale(0)" }}
    >
      <button
        onClick={scrollToTop}
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-bg-dark-elevated)] shadow-lg border border-[var(--color-border-dark)] hover:border-[var(--color-accent)] focus:outline-none transition-colors duration-300"
        aria-label="Scroll to top"
      >
        <svg className="absolute" width="50" height="50" viewBox="0 0 50 50">
          <circle
            cx="25" cy="25" r={circleRadius}
            fill="none" stroke="var(--color-border-dark)" strokeWidth="2"
          />
          <circle
            cx="25" cy="25" r={circleRadius}
            fill="none" stroke="var(--color-accent)" strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 25 25)"
          />
        </svg>
        <FiArrowUp className="relative z-10 w-5 h-5 text-[var(--color-accent)]" />
      </button>
    </div>
  );
}
