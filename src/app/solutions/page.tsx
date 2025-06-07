"use client";
import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function SolutionsPage() {
  // Refs for each section
  const section1Ref = React.useRef(null);
  const section2Ref = React.useRef(null);
  const section3Ref = React.useRef(null);
  const section4Ref = React.useRef(null);
  const ctaRef = React.useRef(null);

  // Check if sections are in viewport using Framer Motion's useInView
  const section1Visible = useInView(section1Ref, { once: true, amount: 0.2 });
  const section2Visible = useInView(section2Ref, { once: true, amount: 0.2 });
  const section3Visible = useInView(section3Ref, { once: true, amount: 0.2 });
  const section4Visible = useInView(section4Ref, { once: true, amount: 0.2 });
  const ctaVisible = useInView(ctaRef, { once: true, amount: 0.3 });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const listItemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 bg-white">
      {/* Page Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--color-primary-dark)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        APOS Solutions: Powering Your Success
      </motion.h1>

      {/* Introductory Paragraph */}
      <motion.p
        className="text-lg text-[var(--color-gray-600)] text-center mb-16 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Our comprehensive business platform is designed for any industry,
        offering a suite of powerful features that streamline operations,
        enhance client experiences, and boost your bottom line.
      </motion.p>

      {/* Feature 1: Workflow & Task Management */}
      <motion.div
        ref={section1Ref}
        className="py-12 md:py-20 border-b border-[var(--color-primary-light)]"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Visual Placeholder (Left on desktop) */}
          <motion.div
            className="w-full md:w-1/2 h-64 md:h-80 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center text-[var(--color-primary)] shadow-md overflow-hidden"
            variants={slideInLeft}
            initial="hidden"
            animate={section1Visible ? "visible" : "hidden"}
          >
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-[var(--color-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p>Visual Placeholder: Interactive task management dashboard</p>
            </div>
          </motion.div>

          {/* Text Content (Right on desktop) */}
          <motion.div
            className="w-full md:w-1/2"
            variants={slideInRight}
            initial="hidden"
            animate={section1Visible ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Intuitive Workflow & Service Management
            </h2>
            <p className="text-lg text-[var(--color-gray-600)] mb-6">
              Empower your team with a lightning-fast, intuitive system that
              reduces training time and minimizes errors. Our customizable
              service and product management tools adapt to your business's
              unique needs, from simple projects to complex enterprise
              solutions.
            </p>
            <motion.ul
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              animate={section1Visible ? "visible" : "hidden"}
            >
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Customizable service catalogs, project templates, and
                  modifiers with easy drag-and-drop editing
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Quick-add tasks and service package builders to speed up
                  project entry
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Smart search with voice recognition capabilities
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Automated prompts for service expansion and compliance alerts
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Lifecycle management with scheduled activation/deactivation
                  dates
                </span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Feature 2: Resource & Asset Coordination */}
      <motion.div
        ref={section2Ref}
        className="py-12 md:py-20 border-b border-[var(--color-primary-light)]"
      >
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
          {/* Visual Placeholder (Right on desktop) */}
          <motion.div
            className="w-full md:w-1/2 h-64 md:h-80 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center text-[var(--color-primary)] shadow-md overflow-hidden"
            variants={slideInRight}
            initial="hidden"
            animate={section2Visible ? "visible" : "hidden"}
          >
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-[var(--color-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p>
                Visual Placeholder: Interactive resource schedule with
                color-coded statuses
              </p>
            </div>
          </motion.div>

          {/* Text Content (Left on desktop) */}
          <motion.div
            className="w-full md:w-1/2"
            variants={slideInLeft}
            initial="hidden"
            animate={section2Visible ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Dynamic Resource & Asset Coordination
            </h2>
            <p className="text-lg text-[var(--color-gray-600)] mb-6">
              Optimize your business's resources and assets with our intuitive
              visual interface. Track asset status in real-time, manage
              bookings, and maximize utilization efficiency to increase
              throughput and revenue.
            </p>
            <motion.ul
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              animate={section2Visible ? "visible" : "hidden"}
            >
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Drag-and-drop schedule designer with custom asset types
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Color-coded status indicators for instant visual assessment
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Integrated booking system with conflict management
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Usage timer tracking for optimized billing and maintenance
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Team assignments with balanced workload distribution
                </span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Feature 3: Analytics & Reporting */}
      <motion.div
        ref={section3Ref}
        className="py-12 md:py-20 border-b border-[var(--color-primary-light)]"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Visual Placeholder (Left on desktop) */}
          <motion.div
            className="w-full md:w-1/2 h-64 md:h-80 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center text-[var(--color-primary)] shadow-md overflow-hidden"
            variants={slideInLeft}
            initial="hidden"
            animate={section3Visible ? "visible" : "hidden"}
          >
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-[var(--color-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p>
                Visual Placeholder: Dashboard with customizable reports and
                visualizations
              </p>
            </div>
          </motion.div>

          {/* Text Content (Right on desktop) */}
          <motion.div
            className="w-full md:w-1/2"
            variants={slideInRight}
            initial="hidden"
            animate={section3Visible ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Real-time Reporting & Analytics
            </h2>
            <p className="text-lg text-[var(--color-gray-600)] mb-6">
              Gain powerful insights into your business's performance with our
              comprehensive reporting and analytics tools. Make data-driven
              decisions with customizable dashboards that highlight key metrics
              and trends in real-time.
            </p>
            <motion.ul
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              animate={section3Visible ? "visible" : "hidden"}
            >
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Customizable dashboards with your choice of key performance
                  indicators (KPIs)
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Sales and revenue analysis by service, category, time period,
                  and more
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Labor cost reporting with scheduling optimization
                  recommendations
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Inventory and resource cost percentage tracking
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Automated reports delivered to your email on your schedule
                </span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Feature 4: Team & Workflow Synchronization */}
      <motion.div
        ref={section4Ref}
        className="py-12 md:py-20 border-b border-[var(--color-primary-light)]"
      >
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
          {/* Visual Placeholder (Right on desktop) */}
          <motion.div
            className="w-full md:w-1/2 h-64 md:h-80 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center text-[var(--color-primary)] shadow-md overflow-hidden"
            variants={slideInRight}
            initial="hidden"
            animate={section4Visible ? "visible" : "hidden"}
          >
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-[var(--color-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p>
                Visual Placeholder: Team collaboration screen with task tiles
                and timers
              </p>
            </div>
          </motion.div>

          {/* Text Content (Left on desktop) */}
          <motion.div
            className="w-full md:w-1/2"
            variants={slideInLeft}
            initial="hidden"
            animate={section4Visible ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Team & Workflow Synchronization
            </h2>
            <p className="text-lg text-[var(--color-gray-600)] mb-6">
              Streamline communication between your front-line and back-end
              teams with our robust synchronization system. Eliminate paper
              trails, reduce errors, and optimize task completion times for
              faster service and higher client satisfaction.
            </p>
            <motion.ul
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              animate={section4Visible ? "visible" : "hidden"}
            >
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Digital task cards with timers and special instructions
                  highlighted
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Color-coded task age indicators for priority management
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Workflow sequencing for perfectly timed multi-stage projects
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Task completion notifications for team members via mobile
                  devices
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={listItemVariant}
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-gray-600)]">
                  Component-level instructions for consistent quality control
                </span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        ref={ctaRef}
        className="py-16 mt-8 bg-[var(--color-primary)] text-white rounded-xl"
        variants={fadeIn}
        initial="hidden"
        animate={ctaVisible ? "visible" : "hidden"}
      >
        <div className="text-center px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to see APOS Solutions in action?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Experience how our platform can transform your business operations
            and boost your bottom line.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/download"
                className="bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] font-semibold py-3 px-6 rounded-lg shadow-md inline-block"
              >
                Request a Demo
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary)] font-semibold py-3 px-6 rounded-lg inline-block"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
