"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCoffee,
  FiHome,
  FiPieChart,
  FiClock,
  FiCreditCard,
  FiCloud,
} from "react-icons/fi";

// Feature data with icons
const features = [
  {
    id: 1,
    icon: FiCoffee,
    title: "Intuitive Order Taking",
    description:
      "Speed up service with our easy-to-use interface, minimizing errors and improving staff efficiency. Designed with real business workflows in mind.",
  },
  {
    id: 2,
    icon: FiHome,
    title: "Seamless Table Management",
    description:
      "Visually manage your floor plan, track table status, and optimize seating to maximize turns. Drag and drop interface makes adjustments simple.",
  },
  {
    id: 3,
    icon: FiPieChart,
    title: "Insightful Reporting",
    description:
      "Gain valuable insights into your sales, top-performing items, and staff performance with comprehensive, easy-to-understand reports and dashboards.",
  },
  {
    id: 4,
    icon: FiClock,
    title: "Kitchen Display System Integration",
    description:
      "Streamline communication between front-of-house and kitchen staff for faster, more accurate order fulfillment and reduced wait times.",
  },
  {
    id: 5,
    icon: FiCreditCard,
    title: "Flexible Payment Processing",
    description:
      "Accept all payment types including credit cards, mobile payments, and gift cards. Split checks, apply discounts, and manage tips with ease.",
  },
  {
    id: 6,
    icon: FiCloud,
    title: "Cloud-Based Management",
    description:
      "Access your data from anywhere. Make menu changes, view reports, and monitor performance remotely through our secure cloud platform.",
  },
];

// Testimonial data
const testimonials = [
  {
    id: 1,
    quote:
      "APOS Solutions has revolutionized how we manage orders. Our staff loves it, and our service speed has dramatically improved!",
    name: "Maria Chen",
    roleOrBusiness: "Owner, The Gourmet Spot",
    avatarPlaceholder: "MC",
  },
  {
    id: 2,
    quote:
      "The reporting features are a game-changer. I finally have a clear understanding of my business performance at my fingertips.",
    name: "David Miller",
    roleOrBusiness: "Manager, Brew & Bites Cafe",
    avatarPlaceholder: "DM",
  },
  {
    id: 3,
    quote:
      "Switching to APOS was seamless. The interface is incredibly intuitive, and the support team was fantastic.",
    name: "Aisha Khan",
    roleOrBusiness: "Chef & Owner, Spice Village",
    avatarPlaceholder: "AK",
  },
  {
    id: 4,
    quote:
      "Since implementing APOS, we've seen a 30% reduction in order errors and our customers are noticing the improved service quality.",
    name: "James Wilson",
    roleOrBusiness: "Operations Director, Urban Plate Group",
    avatarPlaceholder: "JW",
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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

export default function Home() {
  // State for testimonial slider
  const [currentTestimonialIndex, setCurrentTestimonialIndex] =
    React.useState(0);

  // Testimonial navigation functions
  const goToNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonialIndex(index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Text Content Column */}
            <motion.div
              className="w-full md:w-1/2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {/* Animated Tagline */}
              <motion.p
                className="text-lg text-[var(--color-primary)] font-semibold mb-4"
                variants={fadeIn}
              >
                All-Round Progressive Optimized Simple
              </motion.p>

              {/* Animated Headline */}
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)]"
                variants={fadeIn}
              >
                The Future of POS Management, Today
              </motion.h1>

              {/* Animated Sub-headline */}
              <motion.p
                className="text-lg text-[var(--color-gray-600)] mt-4"
                variants={fadeIn}
              >
                Our intuitive Point of Sale system streamlines your operations
                from order taking to payment processing, freeing you up to focus
                on what matters most – your customers and the experience you
                create.
              </motion.p>

              {/* Animated CTA Buttons */}
              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                variants={fadeIn}
              >
                <Link
                  href="#"
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-3 px-6 rounded-lg shadow-md 
                          transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Explore Features
                </Link>
                <Link
                  href="/download"
                  className="border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] font-semibold py-3 px-6 rounded-lg 
                          transition duration-300 ease-in-out"
                >
                  See Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Visual Element Column */}
            <motion.div
              className="w-full md:w-1/2 h-64 md:h-96 bg-[var(--color-primary-light)] rounded-xl flex items-center justify-center 
                       shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-[var(--color-primary)] text-center px-4">
                Visual Placeholder: Future home for an image, illustration, or
                short video of the POS in actions
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Partners Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-[var(--color-primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Official Partners
          </motion.h2>

          {/* Partners Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Sunmi */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-[var(--color-primary-light)] flex items-center justify-center"
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="h-16 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-[var(--color-primary)]">
                    SUNMI
                  </span>
                </div>
                <p className="text-sm text-[var(--color-gray-600)]">
                  Hardware Partner
                </p>
              </div>
            </motion.div>

            {/* SoftPay */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-[var(--color-primary-light)] flex items-center justify-center"
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="h-16 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-[var(--color-primary)]">
                    SoftPay
                  </span>
                </div>
                <p className="text-sm text-[var(--color-gray-600)]">
                  SoftPOS Payment
                </p>
              </div>
            </motion.div>

            {/* SwiPay */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-[var(--color-primary-light)] flex items-center justify-center"
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="h-16 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-[var(--color-primary)]">
                    SwiPay
                  </span>
                </div>
                <p className="text-sm text-[var(--color-gray-600)]">
                  Payment Solutions
                </p>
              </div>
            </motion.div>

            {/* Elavon */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-[var(--color-primary-light)] flex items-center justify-center"
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="h-16 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-[var(--color-primary)]">
                    Elavon
                  </span>
                </div>
                <p className="text-sm text-[var(--color-gray-600)]">
                  Payment Processing
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Partner Description */}
          <motion.p
            className="text-center text-[var(--color-gray-600)] mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Working with industry-leading partners helps APOS become the
            All-Rounder solution for modern businesses, combining cutting-edge
            hardware with seamless payment processing.
          </motion.p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-24 bg-[var(--color-primary-light)]">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-[var(--color-primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Everything Your Business Needs to Thrive
          </motion.h2>

          {/* Feature Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="bg-white rounded-xl p-6 shadow-md border border-[var(--color-primary-light)] 
                          hover:border-[var(--color-primary)] hover:shadow-xl"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-lg flex items-center justify-center mb-4 text-xl">
                  <feature.icon size={24} />
                </div>

                {/* Feature Title */}
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-primary-dark)]">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="text-[var(--color-gray-600)]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-[var(--color-primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Trusted by Businesses Like Yours
          </motion.h2>

          {/* Testimonials Slider */}
          <motion.div
            className="relative mx-auto max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Testimonial Slides Container */}
            <div
              className="overflow-hidden rounded-xl"
              aria-live="polite"
              aria-roledescription="carousel"
            >
              <motion.div
                className="flex"
                animate={{ x: `-${currentTestimonialIndex * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4 py-8 md:py-12"
                    aria-roledescription="slide"
                  >
                    <motion.div
                      className="bg-[var(--color-primary-light)] rounded-xl p-6 md:p-8 shadow-md"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Quote Icon */}
                      <div className="text-[var(--color-primary)] text-4xl mb-4">
                        ☺
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-lg text-[var(--color-gray-800)] italic">
                        {testimonial.quote}
                      </p>

                      {/* Customer Info */}
                      <div className="mt-6 flex items-center">
                        {/* Avatar Placeholder */}
                        <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm mr-3">
                          {testimonial.avatarPlaceholder}
                        </div>

                        <div>
                          <p className="font-semibold text-[var(--color-primary-dark)]">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-[var(--color-gray-600)]">
                            {testimonial.roleOrBusiness}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <motion.button
              type="button"
              onClick={goToPrevTestimonial}
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[var(--color-primary-light)] transition-colors duration-300"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--color-primary)]"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>

            <motion.button
              type="button"
              onClick={goToNextTestimonial}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-8 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[var(--color-primary-light)] transition-colors duration-300"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--color-primary)]"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => goToTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 
                    ${
                      currentTestimonialIndex === index
                        ? "bg-[var(--color-primary)]"
                        : "bg-[var(--color-gray-300)] hover:bg-[var(--color-gray-400)]"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={
                    currentTestimonialIndex === index ? "true" : "false"
                  }
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          {/* CTA Headline */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Business Operations?
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            className="text-lg opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join hundreds of successful businesses already thriving with APOS.
            Start today and see the difference in your efficiency, customer
            satisfaction, and bottom line.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Primary CTA Button with Animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 2,
              }}
            >
              <Link
                href="/download"
                className="bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] font-bold py-4 px-8 rounded-lg shadow-lg text-lg 
                          transition duration-300 ease-in-out"
              >
                Request a Free Demo
              </Link>
            </motion.div>

            {/* Secondary CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary)] 
                          font-bold py-4 px-8 rounded-lg text-lg transition duration-300 ease-in-out"
              >
                Contact Sales
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional Trust Element */}
          <motion.p
            className="mt-8 text-sm opacity-90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            No credit card required • Free 14-day trial • Cancel anytime
          </motion.p>
        </div>
      </section>
    </>
  );
}
