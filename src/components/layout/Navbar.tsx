"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "Download", href: "/download" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Initial load animation
  useGSAP(() => {
    if (!linksRef.current) return;
    const links = linksRef.current.querySelectorAll(".nav-link");
    gsap.from(links, {
      opacity: 0,
      y: -15,
      duration: 0.5,
      stagger: 0.06,
      ease: "power3.out",
      delay: 0.3,
    });
  }, { scope: navRef });

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current || !backdropRef.current) return;

    if (isMenuOpen) {
      gsap.set(mobileMenuRef.current, { display: "block" });
      gsap.set(backdropRef.current, { display: "block" });

      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      .fromTo(mobileMenuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(mobileMenuRef.current.querySelectorAll(".mobile-link"),
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power3.out" },
        "-=0.2"
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { display: "none" });
          if (backdropRef.current) gsap.set(backdropRef.current, { display: "none" });
        }
      });
      tl.to(mobileMenuRef.current.querySelectorAll(".mobile-link"), {
        opacity: 0, x: 30, duration: 0.2, stagger: 0.03,
      })
      .to(mobileMenuRef.current, {
        x: "100%", duration: 0.3, ease: "power3.in",
      }, "-=0.1")
      .to(backdropRef.current, {
        opacity: 0, duration: 0.2,
      }, "-=0.2");
    }
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className={`w-full transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-[var(--color-border-dark)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <Image
            src="/images/APOS_Logo_4f.png"
            alt="APOS"
            width={140}
            height={42}
            className="transition-transform duration-300 group-hover:scale-105 [clip-path:inset(0_0_35%_0)]"
            style={{ marginBottom: "-1.2rem" }}
          />
          <span className="text-[0.55rem] uppercase tracking-[0.28em] text-white/50 ml-[0.15rem]">
            Point of Sale
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="nav-link relative group">
              <Link
                href={link.href}
                className={`py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-on-dark-secondary)] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
              {/* Underline indicator */}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] bg-[var(--color-accent)] transition-transform duration-300 origin-center ${
                  pathname === link.href ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </div>
          ))}
        </div>

        {/* CTA Button (desktop) */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="px-5 py-2.5 text-sm font-medium rounded-full bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] transition-all duration-300 hover:shadow-[0_0_20px_var(--color-accent-glow)]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden flex items-center text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden hidden"
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-y-0 right-0 z-50 w-72 bg-[var(--color-bg-dark-secondary)] border-l border-[var(--color-border-dark)] hidden md:hidden"
      >
        <div className="p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-[var(--color-text-on-dark-secondary)] hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.name} className="mobile-link">
                <Link
                  href={link.href}
                  className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "text-[var(--color-accent)] bg-[var(--color-accent-glow)]"
                      : "text-[var(--color-text-on-dark-secondary)] hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="mobile-link mt-6">
            <Link
              href="/contact"
              className="block w-full text-center py-3 rounded-full bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-dark)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
