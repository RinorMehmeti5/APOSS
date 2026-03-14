"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

export const themes = [
  {
    name: "Electric",
    accent: "#3B82F6",
    accentLight: "#60A5FA",
    accentDark: "#2563EB",
    accentGlow: "rgba(59, 130, 246, 0.15)",
  },
  {
    name: "Emerald",
    accent: "#10B981",
    accentLight: "#34D399",
    accentDark: "#059669",
    accentGlow: "rgba(16, 185, 129, 0.15)",
  },
  {
    name: "Coral",
    accent: "#F43F5E",
    accentLight: "#FB7185",
    accentDark: "#E11D48",
    accentGlow: "rgba(244, 63, 94, 0.15)",
  },
  {
    name: "Violet",
    accent: "#8B5CF6",
    accentLight: "#A78BFA",
    accentDark: "#7C3AED",
    accentGlow: "rgba(139, 92, 246, 0.15)",
  },
];

interface ThemeContextType {
  currentThemeIndex: number;
  setTheme: (index: number) => void;
  themeName: string;
}

const ThemeContext = createContext<ThemeContextType>({
  currentThemeIndex: 0,
  setTheme: () => {},
  themeName: "Electric",
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const applyTheme = (themeIndex: number) => {
    const theme = themes[themeIndex];
    const root = document.documentElement;
    root.style.setProperty("--color-accent", theme.accent);
    root.style.setProperty("--color-accent-light", theme.accentLight);
    root.style.setProperty("--color-accent-dark", theme.accentDark);
    root.style.setProperty("--color-accent-glow", theme.accentGlow);
    localStorage.setItem("theme", themeIndex.toString());
  };

  const setTheme = (index: number) => {
    setCurrentThemeIndex(index);
    applyTheme(index);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme !== null) {
        const themeIndex = parseInt(savedTheme);
        if (themeIndex >= 0 && themeIndex < themes.length) {
          setCurrentThemeIndex(themeIndex);
          applyTheme(themeIndex);
        }
      }
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentThemeIndex,
        setTheme,
        themeName: themes[currentThemeIndex].name,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
