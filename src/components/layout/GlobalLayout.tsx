import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white p-4 shadow-sm border-b border-[var(--color-primary-light)]">
        <Navbar />
      </header>
      <main className="flex-grow bg-white">{children}</main>
      <footer className="bg-[var(--color-primary)] text-white p-4">
        <Footer />
      </footer>
    </div>
  );
};

export default GlobalLayout;
