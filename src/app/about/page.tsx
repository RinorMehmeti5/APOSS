"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  // Team members data (kept for future use)
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Founder & CEO",
      bio: "Former restaurant manager with 15+ years of industry experience. Sarah founded APOS to solve the problems she faced daily in restaurant operations.",
      imagePlaceholder: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "CTO",
      bio: "Tech industry veteran with a passion for creating intuitive software solutions. Michael leads our development team with a focus on performance and reliability.",
      imagePlaceholder: "MC",
    },
    {
      id: 3,
      name: "Aisha Patel",
      title: "Head of Customer Success",
      bio: "With a background in both hospitality and software support, Aisha ensures our clients get the most out of their APOS implementation.",
      imagePlaceholder: "AP",
    },
    {
      id: 4,
      name: "David Rodriguez",
      title: "Lead Product Designer",
      bio: "David combines his experience as a former chef with his design expertise to create interfaces that make sense in the fast-paced environment.",
      imagePlaceholder: "DR",
    },
  ];

  // Timeline milestones data
  const milestones = [
    {
      id: 1,
      year: "Q1 2024",
      title: "Recognizing the Market Gap",
      description:
        "Identified growing frustration in hospitality and retail sectors with outdated, fragmented POS technologies. Began informal discussions with business owners and internal brainstorming sessions.",
    },
    {
      id: 2,
      year: "Q2 2024",
      title: "Market & Client Needs Analysis",
      description:
        "Conducted competitive analysis across DACH and Europe. Interviewed 50+ potential clients to understand challenges. Identified core needs: intuitive usability, modular architecture, and cross-industry compatibility.",
    },
    {
      id: 3,
      year: "Q3 2024",
      title: "Concept Design & Solution Planning",
      description:
        "Designed the APOS system blueprint as an ecosystem. Drafted core system structure, explored cloud-first integrations, and defined our value proposition: Efficiency, Flexibility, Transparency.",
    },
    {
      id: 4,
      year: "Q4 2024",
      title: "Prototype Development & Strategic Alignment",
      description:
        "Developed first working prototype, ran closed feedback rounds with test clients, and began partnership talks with Sunmi (hardware) and Softpay (softPOS payment).",
    },
    {
      id: 5,
      year: "Apr 2025",
      title: "Official Founding of APOS GmbH",
      description:
        "After over a year of research and testing, officially founded APOS GmbH. Established company registration, expanded core team, and finalized strategic partnerships.",
    },
    {
      id: 6,
      year: "Q2-Q3 2025",
      title: "Product Launch & Market Entry",
      description:
        "Beginning active roll-out in CH with targeted industries. Continuing to refine user experience through real-world feedback while building partner network for rapid scaling.",
    },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="container mx-auto px-4 bg-white">
      {/* Main Page Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mt-16 mb-6 text-[var(--color-primary-dark)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Meet the Team Behind Your Success
      </motion.h1>

      {/* Mission & Vision Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="relative py-20 md:py-32 mb-20 rounded-2xl overflow-hidden bg-[var(--color-primary)] text-white"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white translate-x-20 translate-y-10"></div>
          <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-white -translate-x-20 translate-y-5"></div>
          <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-white -translate-y-10"></div>
        </div>

        <div className="relative z-10 px-6 md:px-16 max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6"
            variants={fadeIn}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl font-light leading-relaxed"
            variants={fadeIn}
          >
            To empower businesses of all sizes with technology that simplifies
            operations, enhances customer experiences, and drives sustainable
            growth.
          </motion.p>

          <motion.div
            className="w-20 h-1 bg-white mx-auto my-10"
            variants={scaleIn}
          ></motion.div>

          <motion.p className="text-lg text-white/90" variants={fadeIn}>
            APOS GmbH is built around one belief: POS should serve the business
            – not the other way around. We believe that powerful software can
            also be easy to use, focusing on intuitive designs that require
            minimal training.
          </motion.p>
        </div>
      </motion.div>

      {/* Our Story Section - Timeline */}
      <div className="mb-20">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-12 text-[var(--color-primary-dark)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Our Journey
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-primary-light)] transform md:-translate-x-px"></div>

          {/* Timeline Items */}
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              className="relative mb-12 md:mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year Marker - Improved design */}
                <div className="flex-none w-full md:w-1/2 flex items-center mb-4 md:mb-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`relative ${
                      index % 2 === 0
                        ? "md:ml-auto md:mr-8"
                        : "md:mr-auto md:ml-8"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-auto w-4 h-4 bg-[var(--color-primary)] rounded-full -translate-x-6 md:translate-x-0 top-1/2 -translate-y-1/2 md:hidden"></div>

                    {/* Year badge */}
                    <div className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow-md font-bold text-sm ml-8 md:ml-0">
                      {milestone.year}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Content */}
                <div
                  className={`flex-none w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pl-8" : "md:pr-8"
                  } pl-8 md:pl-0`}
                >
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-md border border-[var(--color-primary-light)]"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-[var(--color-primary)]">
                      {milestone.title}
                    </h3>
                    <p className="text-[var(--color-gray-600)]">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Future Vision - Special styling */}
          <motion.div
            className="relative mt-16 mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: milestones.length * 0.1 }}
          >
            <div className="text-center">
              <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                <div className="bg-[var(--color-primary-dark)] text-white px-6 py-3 rounded-lg shadow-lg font-bold text-lg mb-6">
                  The Future
                </div>
              </motion.div>

              <motion.div
                className="bg-[var(--color-primary-light)] p-8 rounded-xl shadow-md border-2 border-[var(--color-primary)]"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg text-[var(--color-primary-dark)] font-medium italic">
                  "POS should serve the business – not the other way around"
                </p>
                <p className="text-[var(--color-gray-600)] mt-4">
                  APOS GmbH is built around one belief: Our mission is to become
                  the new standard for intuitive, scalable and future-ready
                  point-of-sale systems.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-20">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-12 text-[var(--color-primary-dark)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Our Core Values
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Value 1 */}
          <motion.div
            variants={fadeIn}
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-xl shadow-md border border-[var(--color-primary-light)]"
          >
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center mb-6 text-[var(--color-primary)]">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--color-primary-dark)]">
              Innovation
            </h3>
            <p className="text-[var(--color-gray-600)]">
              We constantly push the boundaries of what POS technology can do,
              seeking new ways to solve industry challenges.
            </p>
          </motion.div>

          {/* Value 2 */}
          <motion.div
            variants={fadeIn}
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-xl shadow-md border border-[var(--color-primary-light)]"
          >
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center mb-6 text-[var(--color-primary)]">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--color-primary-dark)]">
              Customer Focus
            </h3>
            <p className="text-[var(--color-gray-600)]">
              We listen intently to our customers needs and prioritize features
              that create real value for their businesses.
            </p>
          </motion.div>

          {/* Value 3 */}
          <motion.div
            variants={fadeIn}
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-xl shadow-md border border-[var(--color-primary-light)]"
          >
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center mb-6 text-[var(--color-primary)]">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--color-primary-dark)]">
              Reliability
            </h3>
            <p className="text-[var(--color-gray-600)]">
              We build software that businesses can depend on every day, with
              uptime and stability as our top priorities.
            </p>
          </motion.div>

          {/* Value 4 */}
          <motion.div
            variants={fadeIn}
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-xl shadow-md border border-[var(--color-primary-light)]"
          >
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center mb-6 text-[var(--color-primary)]">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--color-primary-dark)]">
              Simplicity
            </h3>
            <p className="text-[var(--color-gray-600)]">
              We believe powerful software can also be easy to use. We focus on
              intuitive designs that require minimal training.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
