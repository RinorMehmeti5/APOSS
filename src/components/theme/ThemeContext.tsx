"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

// Theme definitions
export const themes = [
  {
    name: "Blue",
    primary: "#0055ff",
    primaryLight: "#e6f0ff",
    primaryDark: "#0044cc",
    icon: "🔵",
  },
  {
    name: "Orange",
    primary: "#FF5500",
    primaryLight: "#FFF3E0",
    primaryDark: "#E64A19",
    icon: "🟠",
  },
  {
    name: "Green",
    primary: "#2E7D32",
    primaryLight: "#E8F5E9",
    primaryDark: "#1B5E20",
    icon: "🟢",
  },
  {
    name: "Purple",
    primary: "#7B1FA2",
    primaryLight: "#F3E5F5",
    primaryDark: "#4A148C",
    icon: "🟣",
  },
  {
    name: "Pink",
    primary: "#D81B60",
    primaryLight: "#FCE4EC",
    primaryDark: "#AD1457",
    icon: "🔴",
  },
];

// Create context type
interface ThemeContextType {
  currentThemeIndex: number;
  setTheme: (index: number) => void;
  themeName: string;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentThemeIndex: 0,
  setTheme: () => {},
  themeName: "Blue",
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  // Apply theme by updating CSS variables
  const applyTheme = (themeIndex: number) => {
    const theme = themes[themeIndex];
    document.documentElement.style.setProperty(
      "--color-primary",
      theme.primary
    );
    document.documentElement.style.setProperty(
      "--color-primary-light",
      theme.primaryLight
    );
    document.documentElement.style.setProperty(
      "--color-primary-dark",
      theme.primaryDark
    );

    // Save to localStorage for persistence
    localStorage.setItem("theme", themeIndex.toString());
  };

  // Set theme and apply changes
  const setTheme = (index: number) => {
    setCurrentThemeIndex(index);
    applyTheme(index);
  };

  // Load theme from localStorage on initial render
  useEffect(() => {
    // We need to check if window is defined because this is a Next.js app with SSR
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme !== null) {
        const themeIndex = parseInt(savedTheme);
        // Validate to ensure it's within bounds
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
