"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiCheck } from "react-icons/fi";
import { useTheme, themes } from "./ThemeContext";

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentThemeIndex, setTheme } = useTheme();

  // Handle theme selection
  const handleThemeSelect = (index: number) => {
    setTheme(index);
    // Close the popup after a small delay
    setTimeout(() => setIsOpen(false), 300);
  };

  // Animation variants
  const containerVariants = {
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, rotate: 15, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  const themeOptionVariants = {
    rest: { x: 0 },
    hover: { x: 5, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

  return (
    <div className="fixed left-6 bottom-6 z-50">
      {/* Theme Switcher Button */}
      <motion.button
        className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white shadow-lg flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        aria-label="Change theme"
      >
        <FiSettings className="w-5 h-5" />
      </motion.button>

      {/* Theme Options Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 bottom-16 bg-white rounded-lg shadow-xl p-4 w-64 border border-[var(--color-primary-light)]"
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <h3 className="text-[var(--color-primary-dark)] font-semibold mb-3 text-center">
              Choose a Theme
            </h3>
            <div className="space-y-2">
              {themes.map((theme, index) => (
                <motion.button
                  key={theme.name}
                  className={`w-full flex items-center p-2 rounded-md transition-colors ${
                    currentThemeIndex === index
                      ? "bg-[var(--color-primary-light)]"
                      : "hover:bg-[var(--color-gray-100)]"
                  }`}
                  onClick={() => handleThemeSelect(index)}
                  variants={themeOptionVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div
                    className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-lg"
                    style={{
                      backgroundColor: theme.primaryLight,
                      color: theme.primary,
                    }}
                  >
                    {theme.icon}
                  </div>
                  <span className="flex-grow text-left text-[var(--color-gray-800)]">
                    {theme.name}
                  </span>
                  {currentThemeIndex === index && (
                    <FiCheck className="w-5 h-5 text-[var(--color-primary)]" />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--color-gray-200)] text-center text-xs text-[var(--color-gray-600)]">
              Theme changes will persist across sessions
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
