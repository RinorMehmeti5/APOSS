"use client";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "../SmoothScroll";
import CustomCursor from "../CustomCursor";
import PageTransition from "../PageTransition";

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <SmoothScroll>
      <CustomCursor />
      <PageTransition />
      <div className="flex flex-col min-h-screen bg-[var(--color-bg-dark)]">
        <header className="fixed top-0 w-full z-50">
          <Navbar />
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-[var(--color-bg-dark-secondary)]">
          <Footer />
        </footer>
      </div>
    </SmoothScroll>
  );
};

export default GlobalLayout;
