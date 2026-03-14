"use client";
import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import TextLineReveal from "@/components/ui/TextLineReveal";
import ImageClipReveal from "@/components/ui/ImageClipReveal";

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

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

      // Animate success message
      setTimeout(() => {
        if (successRef.current) {
          gsap.from(successRef.current, {
            scale: 0.9,
            opacity: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          });
        }
      }, 0);
    } catch (error) {
      // The catch block now handles network or server errors
      // Simulate error handling
      setSubmitStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: "An error occurred. Please try again later.",
      });

      // Animate error message
      setTimeout(() => {
        if (errorRef.current) {
          gsap.from(errorRef.current, {
            scale: 0.9,
            opacity: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          });
        }
      }, 0);
    }
  };

  // GSAP animations for form fields
  useGSAP(
    () => {
      // Form fields stagger reveal from bottom
      gsap.from("[data-animate='form-field']", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.5,
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-[var(--color-bg-light)]">
      {/* ── Section 1: Header (DARK) ── */}
      <section className="bg-[var(--color-bg-dark)] pt-32 md:pt-40 pb-36 md:pb-44">
        <div className="container mx-auto px-4 text-center">
          <TextLineReveal
            tag="h1"
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            stagger={0.12}
          >
            Get In Touch
          </TextLineReveal>

          <TextLineReveal
            tag="p"
            className="text-lg md:text-xl max-w-xl mx-auto text-[var(--color-text-on-dark-secondary)]"
            delay={0.2}
          >
            Have questions about APOS Solutions or need support? Fill out the form below, and we'll get back to you as soon as possible.
          </TextLineReveal>
        </div>
      </section>

      {/* ── Section 2 & 3: Form + Contact Info (LIGHT) ── */}
      <section className="bg-[var(--color-bg-light)] -mt-20 md:-mt-24 pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* ── Form Card (slides in with ImageClipReveal) ── */}
            <ImageClipReveal
              direction="bottom"
              className="lg:w-[60%]"
              duration={1}
              scale={false}
            >
              <div className="bg-[var(--color-bg-light-elevated)] border border-[var(--color-border-light)] rounded-2xl shadow-lg p-8 md:p-10">
                <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-on-light)]">
                  Send Us a Message
                </h2>

                {/* Success Message */}
                {submitStatus.isSubmitted && !submitStatus.isError && (
                  <div
                    ref={successRef}
                    className="mb-6 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FiCheckCircle className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-emerald-700">
                          {submitStatus.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus.isError && (
                  <div
                    ref={errorRef}
                    className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FiAlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          {submitStatus.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Form */}
                <form onSubmit={handleSubmit}>
                  {/* Name and Email - Side by Side on Desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name Field */}
                    <div data-animate="form-field">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[var(--color-text-on-light-secondary)] mb-1.5"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-[var(--color-bg-light-elevated)] border ${
                          errors.name
                            ? "border-red-500"
                            : "border-[var(--color-border-light)]"
                        } text-[var(--color-text-on-light)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 rounded-lg px-4 py-2.5 transition-colors placeholder:text-[var(--color-text-on-light-muted)] outline-none`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div data-animate="form-field">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[var(--color-text-on-light-secondary)] mb-1.5"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-[var(--color-bg-light-elevated)] border ${
                          errors.email
                            ? "border-red-500"
                            : "border-[var(--color-border-light)]"
                        } text-[var(--color-text-on-light)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 rounded-lg px-4 py-2.5 transition-colors placeholder:text-[var(--color-text-on-light-muted)] outline-none`}
                        placeholder="john.doe@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div data-animate="form-field" className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[var(--color-text-on-light-secondary)] mb-1.5"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-[var(--color-bg-light-elevated)] border ${
                        errors.subject
                          ? "border-red-500"
                          : "border-[var(--color-border-light)]"
                      } text-[var(--color-text-on-light)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 rounded-lg px-4 py-2.5 transition-colors placeholder:text-[var(--color-text-on-light-muted)] outline-none`}
                      placeholder="Product Inquiry"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div data-animate="form-field" className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--color-text-on-light-secondary)] mb-1.5"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full bg-[var(--color-bg-light-elevated)] border ${
                        errors.message
                          ? "border-red-500"
                          : "border-[var(--color-border-light)]"
                      } text-[var(--color-text-on-light)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 rounded-lg px-4 py-2.5 transition-colors placeholder:text-[var(--color-text-on-light-muted)] outline-none resize-none`}
                      placeholder="Your message here..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div data-animate="form-field">
                    <button
                      type="submit"
                      disabled={submitStatus.isSubmitting}
                      className={`w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold py-3 px-6 rounded-lg
                                transition duration-300 ease-in-out
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
                  </div>
                </form>
              </div>
            </ImageClipReveal>

            {/* ── Contact Information Cards (staggered ImageClipReveal) ── */}
            <div className="lg:w-[40%] space-y-6">
              {/* Email Contact Card */}
              <ImageClipReveal
                direction="right"
                duration={0.9}
                delay={0.1}
                scale={false}
              >
                <div className="card-light p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mr-4 text-[var(--color-accent)] shrink-0">
                      <FiMail size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-text-on-light)] mb-1">
                        Email Us
                      </h3>
                      <p className="text-sm text-[var(--color-text-on-light-secondary)] mb-2">
                        For general inquiries and support
                      </p>
                      <a
                        href="mailto:info@apos-kassen.ch"
                        className="text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-medium transition-colors"
                      >
                        info@apos-kassen.ch
                      </a>
                    </div>
                  </div>
                </div>
              </ImageClipReveal>

              {/* Phone Contact Card */}
              <ImageClipReveal
                direction="right"
                duration={0.9}
                delay={0.25}
                scale={false}
              >
                <div className="card-light p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mr-4 text-[var(--color-accent)] shrink-0">
                      <FiPhone size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-text-on-light)] mb-1">
                        Call Us
                      </h3>
                      <p className="text-sm text-[var(--color-text-on-light-secondary)] mb-2">
                        Monday to Friday, 9am - 5pm ET
                      </p>
                      <a
                        href="tel:+41772250348"
                        className="text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-medium transition-colors"
                      >
                        +41 77 225 03 48
                      </a>
                    </div>
                  </div>
                </div>
              </ImageClipReveal>

              {/* Visit Us Card */}
              <ImageClipReveal
                direction="right"
                duration={0.9}
                delay={0.4}
                scale={false}
              >
                <div className="card-light p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mr-4 text-[var(--color-accent)] shrink-0">
                      <FiMapPin size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-text-on-light)] mb-1">
                        Visit Us
                      </h3>
                      <p className="text-sm text-[var(--color-text-on-light-secondary)] mb-2">
                        Our headquarters location
                      </p>
                      <address className="not-italic text-[var(--color-text-on-light-secondary)]">
                        Balfrinstrasse 14
                        <br />
                        3930 Visp, Switzerland
                      </address>
                    </div>
                  </div>
                </div>
              </ImageClipReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
