"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;
    const sections = footerRef.current.querySelectorAll(".footer-section");
    gsap.from(sections, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        once: true,
      },
    });
  }, { scope: footerRef });

  return (
    <div ref={footerRef} className="relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[12rem] font-bold text-white/[0.03] tracking-widest">
          APOS
        </span>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="footer-section md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/images/APOS_Logo_4f.png" alt="APOS" width={32} height={32} />
              <span className="font-bold text-lg text-white">APOS Solutions</span>
            </div>
            <p className="text-sm text-[var(--color-text-on-dark-muted)] leading-relaxed">
              All-Round Progressive Optimized Simple. The future of POS management for modern restaurants.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Solutions", href: "/solutions" },
                { name: "Download", href: "/download" },
                { name: "Blog", href: "/blog" },
                { name: "About", href: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-accent)] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[var(--color-text-on-dark-muted)]">
              <li>info@apos-solutions.ch</li>
              <li>+41 XX XXX XX XX</li>
              <li>Zurich, Switzerland</li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer-section">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {["Facebook", "Instagram", "Twitter"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="w-10 h-10 rounded-full border border-[var(--color-border-dark)] flex items-center justify-center text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300"
                  aria-label={platform}
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border-dark)] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[var(--color-text-on-dark-muted)]">
            &copy; {currentYear} APOS Solutions. All Rights Reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-accent)] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-accent)] transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "Facebook":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return null;
  }
}

export default Footer;
