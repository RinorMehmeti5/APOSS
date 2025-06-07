"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when clicking escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    // Prevent body scroll when menu is open
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "Download", href: "/download" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -3,
      color: "var(--color-primary)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.4,
        ease: [0.65, 0, 0.35, 1], // Custom cubic bezier for a nice spring effect
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const mobileNavLinkVariants = {
    closed: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const hamburgerIconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180, transition: { duration: 0.3 } },
  };

  return (
    <nav className="w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div initial="hidden" animate="visible" variants={logoVariants}>
          <Link
            href="/"
            className="font-bold text-xl transition-colors duration-300 text-[var(--color-primary)]"
          >
            APOS Solutions
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navLinkVariants}
              whileHover="hover"
              className="relative"
            >
              <Link
                href={link.href}
                className={`relative py-2 transition-colors duration-300 
                  ${
                    pathname === link.href
                      ? "text-[var(--color-primary)] font-medium"
                      : "text-[var(--color-gray-600)]"
                  }`}
              >
                {link.name}
              </Link>
              {pathname === link.href && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary)] transform origin-left"
                  variants={underlineVariants}
                  initial="hidden"
                  animate="visible"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          className="md:hidden flex items-center text-[var(--color-primary)]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          variants={hamburgerIconVariants}
          animate={isMenuOpen ? "open" : "closed"}
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              // X icon when menu is open
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon when menu is closed
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-[var(--color-primary-light)] bg-opacity-80 z-40 md:hidden"
              onClick={toggleMenu}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-5">
                <div className="flex justify-end">
                  <motion.button
                    type="button"
                    onClick={toggleMenu}
                    className="text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors duration-300"
                    aria-label="Close menu"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                <div className="mt-6 flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      variants={mobileNavLinkVariants}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-2 transition-colors duration-300 hover:text-[var(--color-primary)] 
                          ${
                            pathname === link.href
                              ? "text-[var(--color-primary)] font-medium"
                              : "text-[var(--color-gray-600)]"
                          }`}
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
