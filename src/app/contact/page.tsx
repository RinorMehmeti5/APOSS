"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Form submission status state
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: "",
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message";
      isValid = false;
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message should be at least 20 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: "",
    });

    try {
      // THIS IS THE UPDATED PART
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Response:", response);

      if (!response.ok) {
        // If the server response is not OK, throw an error to be caught by the catch block
        throw new Error("Failed to send message.");
      }
      // END OF UPDATED PART

      // Simulate successful submission
      setSubmitStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        message: "Thank you! Your message has been sent.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      // The catch block now handles network or server errors
      // Simulate error handling
      setSubmitStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: "An error occurred. Please try again later.",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-16 md:py-24 bg-white"
    >
      {/* Page Header */}
      <motion.h1
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--color-primary-dark)]"
      >
        Get In Touch
      </motion.h1>

      {/* Introductory Text */}
      <motion.p
        variants={itemVariants}
        className="text-lg text-center mb-12 max-w-xl mx-auto text-[var(--color-gray-600)]"
      >
        Have questions about APOS Solutions or need support? Fill out the form
        below, and we ll get back to you as soon as possible.
      </motion.p>

      {/* Main Content Area - Side by Side on Desktop, Stacked on Mobile */}
      <motion.div
        variants={containerVariants}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12"
      >
        {/* Contact Form Section */}
        <motion.div
          variants={itemVariants}
          className="flex-1 bg-white rounded-2xl shadow-md overflow-hidden p-8 border border-[var(--color-primary-light)]"
        >
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-primary-dark)]">
            Send Us a Message
          </h2>

          {/* Success Message */}
          {submitStatus.isSubmitted && !submitStatus.isError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-[var(--color-primary-light)] border-l-4 border-[var(--color-primary)] p-4 rounded"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiCheckCircle className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-[var(--color-primary-dark)]">
                    {submitStatus.message}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {submitStatus.isError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{submitStatus.message}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <motion.div variants={itemVariants} className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--color-gray-600)] mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border text-[var(--color-gray-600)] ${
                  errors.name
                    ? "border-red-500"
                    : "border-[var(--color-gray-300)]"
                } focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] rounded-md shadow-sm px-4 py-2 transition-colors`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants} className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-gray-600)] mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border text-[var(--color-gray-600)] ${
                  errors.email
                    ? "border-red-500"
                    : "border-[var(--color-gray-300)]"
                } focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] rounded-md shadow-sm px-4 py-2 transition-colors`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </motion.div>

            {/* Subject Field */}
            <motion.div variants={itemVariants} className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-[var(--color-gray-600)] mb-1"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full border text-[var(--color-gray-600)] ${
                  errors.subject
                    ? "border-red-500"
                    : "border-[var(--color-gray-300)]"
                } focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] rounded-md shadow-sm px-4 py-2 transition-colors`}
                placeholder="Product Inquiry"
              />
              {errors.subject && (
                <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
              )}
            </motion.div>

            {/* Message Field */}
            <motion.div variants={itemVariants} className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[var(--color-gray-600)] mb-1"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full border text-[var(--color-gray-600)] ${
                  errors.message
                    ? "border-red-500"
                    : "border-[var(--color-gray-300)]"
                } focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] rounded-md shadow-sm px-4 py-2 transition-colors`}
                placeholder="Your message here..."
              ></textarea>
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={submitStatus.isSubmitting}
                className={`w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-3 px-6 rounded-lg 
                          shadow-md transition duration-300 ease-in-out
                          ${
                            submitStatus.isSubmitting
                              ? "opacity-70 cursor-not-allowed"
                              : ""
                          }`}
              >
                {submitStatus.isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FiSend className="mr-2" />
                    Send Message
                  </span>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Contact Information Section */}
        <motion.div variants={itemVariants} className="lg:w-96 space-y-8">
          <div className="bg-[var(--color-primary-light)] p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--color-primary-dark)]">
              Contact Information
            </h2>

            <div className="space-y-8">
              {/* Email Contact */}
              <motion.div
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center mr-4 text-white">
                  <FiMail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[var(--color-primary-dark)] mb-1">
                    Email Us
                  </h3>
                  <p className="text-[var(--color-gray-600)] mb-1">
                    For general inquiries and support
                  </p>
                  <a
                    href="mailto:info@apos-kassen.ch"
                    className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium"
                  >
                    info@apos-kassen.ch
                  </a>
                </div>
              </motion.div>

              {/* Phone Contact */}
              <motion.div
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center mr-4 text-white">
                  <FiPhone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[var(--color-primary-dark)] mb-1">
                    Call Us
                  </h3>
                  <p className="text-[var(--color-gray-600)] mb-1">
                    Monday to Friday, 9am - 5pm ET
                  </p>
                  <a
                    href="tel:+41772250348"
                    className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium"
                  >
                    +41 77 225 03 48
                  </a>
                </div>
              </motion.div>

              {/* Visit Us */}
              <motion.div
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center mr-4 text-white">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[var(--color-primary-dark)] mb-1">
                    Visit Us
                  </h3>
                  <p className="text-[var(--color-gray-600)] mb-1">
                    Our headquarters location
                  </p>
                  <address className="not-italic text-[var(--color-gray-600)]">
                    Balfrinstrasse 14
                    <br />
                    3930 Visp, Switzerland
                  </address>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-[var(--color-primary-light)]">
            <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary-dark)]">
              Business Hours
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-[var(--color-gray-600)]">
                  Monday - Friday:
                </span>
                <span className="font-medium text-[var(--color-primary-dark)]">
                  9:00 AM - 5:00 PM
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-[var(--color-gray-600)]">Saturday:</span>
                <span className="font-medium text-[var(--color-primary-dark)]">
                  10:00 AM - 2:00 PM
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-[var(--color-gray-600)]">Sunday:</span>
                <span className="font-medium text-[var(--color-primary-dark)]">
                  Closed
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
