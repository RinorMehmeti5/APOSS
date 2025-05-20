"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate scroll position and progress
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // Calculate scroll percentage (0-100)
    const scrollPercentage = (scrollTop / windowHeight) * 100;

    // Update state
    setScrollProgress(scrollPercentage);
    setIsVisible(scrollTop > 300); // Show after scrolling 300px
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Calculate circle properties
  const circleRadius = 22;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed right-6 bottom-6 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={scrollToTop}
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border border-[var(--color-primary-light)] focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            {/* SVG for the circular progress indicator */}
            <svg
              className="absolute"
              width="50"
              height="50"
              viewBox="0 0 50 50"
            >
              {/* Background circle */}
              <circle
                cx="25"
                cy="25"
                r={circleRadius}
                fill="none"
                stroke="var(--color-gray-200)"
                strokeWidth="2"
              />

              {/* Progress circle */}
              <circle
                cx="25"
                cy="25"
                r={circleRadius}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 25 25)"
              />
            </svg>

            {/* Arrow icon */}
            <FiArrowUp className="relative z-10 w-5 h-5 text-[var(--color-primary)]" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
