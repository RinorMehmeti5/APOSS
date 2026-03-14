"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { FiSettings, FiCheck } from "react-icons/fi";
import { useTheme, themes } from "./ThemeContext";

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentThemeIndex, setTheme } = useTheme();
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleThemeSelect = (index: number) => {
    setTheme(index);
    setTimeout(() => setIsOpen(false), 300);
  };

  useEffect(() => {
    if (!popupRef.current) return;
    if (isOpen) {
      gsap.set(popupRef.current, { display: "block" });
      gsap.fromTo(popupRef.current,
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.7)" }
      );
      const options = popupRef.current.querySelectorAll(".theme-option");
      gsap.fromTo(options,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.25, stagger: 0.04, ease: "power3.out", delay: 0.1 }
      );
    } else {
      gsap.to(popupRef.current, {
        opacity: 0, y: 20, scale: 0.8, duration: 0.25, ease: "power2.in",
        onComplete: () => {
          if (popupRef.current) gsap.set(popupRef.current, { display: "none" });
        }
      });
    }
  }, [isOpen]);

  return (
    <div className="fixed left-6 bottom-6 z-50">
      <button
        ref={buttonRef}
        className="w-12 h-12 rounded-full bg-[var(--color-bg-dark-elevated)] border border-[var(--color-border-dark)] text-[var(--color-accent)] shadow-lg flex items-center justify-center hover:border-[var(--color-accent)] transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change accent color"
      >
        <FiSettings className="w-5 h-5" />
      </button>

      <div
        ref={popupRef}
        className="absolute left-0 bottom-16 bg-[var(--color-bg-dark-elevated)] rounded-xl shadow-2xl p-4 w-56 border border-[var(--color-border-dark)] hidden"
      >
        <h3 className="text-[var(--color-text-on-dark)] font-semibold mb-3 text-sm text-center">
          Accent Color
        </h3>
        <div className="space-y-1">
          {themes.map((theme, index) => (
            <button
              key={theme.name}
              className={`theme-option w-full flex items-center p-2.5 rounded-lg transition-colors duration-200 ${
                currentThemeIndex === index
                  ? "bg-[var(--color-accent)]/10"
                  : "hover:bg-white/5"
              }`}
              onClick={() => handleThemeSelect(index)}
            >
              <div
                className="w-6 h-6 rounded-full mr-3 border-2"
                style={{
                  backgroundColor: theme.accent,
                  borderColor: currentThemeIndex === index ? theme.accent : "transparent",
                }}
              />
              <span className="flex-grow text-left text-sm text-[var(--color-text-on-dark-muted)]">
                {theme.name}
              </span>
              {currentThemeIndex === index && (
                <FiCheck className="w-4 h-4 text-[var(--color-accent)]" />
              )}
            </button>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-[var(--color-border-dark)] text-center text-xs text-[var(--color-text-on-dark-muted)]">
          Persists across sessions
        </div>
      </div>
    </div>
  );
}
