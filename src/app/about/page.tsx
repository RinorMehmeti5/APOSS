"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  // Team members data
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
      bio: "David combines his experience as a former chef with his design expertise to create interfaces that make sense in the fast-paced restaurant environment.",
      imagePlaceholder: "DR",
    },
  ];

  // Timeline milestones data
  const milestones = [
    {
      id: 1,
      year: "2019",
      title: "The Beginning",
      description:
        "APOS Restaurant was founded after our team experienced firsthand the challenges of managing restaurants with outdated technology.",
    },
    {
      id: 2,
      year: "2020",
      title: "First Product Launch",
      description:
        "We launched our MVP with a focus on intuitive order taking and basic reporting, quickly gaining our first 50 customers.",
    },
    {
      id: 3,
      year: "2021",
      title: "Major Feature Expansion",
      description:
        "Added kitchen display system, inventory management, and advanced analytics capabilities based on customer feedback.",
    },
    {
      id: 4,
      year: "2023",
      title: "Global Expansion",
      description:
        "Expanded our services internationally, now supporting restaurants in over 15 countries with multi-language capabilities.",
    },
    {
      id: 5,
      year: "2024",
      title: "Cloud Platform Redesign",
      description:
        "Completely rebuilt our platform with next-generation technology to handle enterprise-scale operations while maintaining ease of use.",
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
            To empower restaurants of all sizes with technology that simplifies
            operations, enhances guest experiences, and drives sustainable
            growth.
          </motion.p>

          <motion.div
            className="w-20 h-1 bg-white mx-auto my-10"
            variants={scaleIn}
          ></motion.div>

          <motion.p className="text-lg text-white/90" variants={fadeIn}>
            We believe that restaurant technology should work for you, not the
            other way around. Every feature we build is designed with real
            restaurant workflows in mind, informed by our team is extensive
            experience in the hospitality industry.
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

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-primary-light)] transform md:-translate-x-px"></div>

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
                {/* Year Marker */}
                <div className="flex-none w-full md:w-1/2 flex items-center mb-4 md:mb-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`h-12 w-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center 
                                text-lg font-bold z-10 shadow-md mr-4 md:mr-0 ${
                                  index % 2 === 0
                                    ? "md:ml-auto md:mr-0"
                                    : "md:mr-auto md:ml-0"
                                }`}
                  >
                    {milestone.year}
                  </motion.div>
                </div>

                {/* Timeline Content */}
                <div
                  className={`flex-none w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pl-8" : "md:pr-8"
                  }`}
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
              We constantly push the boundaries of what restaurant technology
              can do, seeking new ways to solve industry challenges.
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
              We build software that restaurants can depend on every day, with
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

      {/* Meet the Team Section */}
      <div className="mb-20">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-12 text-[var(--color-primary-dark)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Meet Our Leadership Team
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-[var(--color-primary-light)]"
            >
              {/* Member Photo Placeholder */}
              <div className="h-48 bg-[var(--color-primary-light)] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-2xl font-bold">
                  {member.imagePlaceholder}
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-[var(--color-primary-dark)]">
                  {member.name}
                </h3>
                <p className="text-[var(--color-primary)] mb-4">
                  {member.title}
                </p>
                <p className="text-[var(--color-gray-600)] text-sm">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Join Our Team CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-[var(--color-primary-light)] rounded-xl p-8 md:p-12 text-center mb-20"
      >
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-[var(--color-primary-dark)]">
          Join Our Growing Team
        </h3>
        <p className="text-[var(--color-gray-600)] mb-6 max-w-2xl mx-auto">
          We are always looking for talented individuals who are passionate
          about creating technology that makes a difference in the restaurant
          industry.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href="#"
          className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          View Open Positions
        </motion.a>
      </motion.div>
    </div>
  );
}
