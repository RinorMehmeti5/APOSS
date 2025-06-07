"use client";
import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-16 md:py-24 bg-white max-w-4xl"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8 text-[var(--color-primary-dark)]"
        variants={fadeIn}
      >
        Privacy Policy of APOS GmbH
      </motion.h1>

      <motion.p
        className="text-sm text-[var(--color-gray-600)] mb-8"
        variants={fadeIn}
      >
        Effective date: 01.01.2025
      </motion.p>

      <motion.div className="prose prose-lg max-w-none" variants={fadeIn}>
        <p className="text-[var(--color-gray-800)] mb-6">
          Protecting your personal data is a matter of great importance to us.
          We process your data exclusively in accordance with the legal
          requirements of the General Data Protection Regulation (GDPR), the
          Swiss Data Protection Act (DSG), and relevant telecommunications laws.
          This Privacy Policy informs you about the key aspects of how we
          collect and use data, especially in relation to our website and our
          point-of-sale (POS) systems.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--color-primary-dark)]">
          1. Data Controller
        </h2>
        <div className="bg-[var(--color-primary-light)] p-4 rounded-lg mb-6">
          <p className="text-[var(--color-gray-800)]">
            <strong>APOS GmbH</strong>
            <br />
            Balfrinstrasse 14
            <br />
            3930 Visp
            <br />
            Switzerland
            <br />
            Email: info@apos-kassen.ch
            <br />
            Tel: +41 77 225 03 48
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--color-primary-dark)]">
          2. General Information on Data Processing
        </h2>
        <p className="text-[var(--color-gray-800)] mb-4">
          We process personal data only to the extent necessary to provide a
          functional website and to fulfill our contractual obligations.
          Processing takes place based on:
        </p>
        <ul className="list-disc pl-6 mb-6 text-[var(--color-gray-800)]">
          <li>your consent (Art. 6(1)(a) GDPR),</li>
          <li>the performance of a contract (Art. 6(1)(b)),</li>
          <li>legal obligations (Art. 6(1)(c)),</li>
          <li>or our legitimate interests (Art. 6(1)(f)).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--color-primary-dark)]">
          3. Website Data Processing
        </h2>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-[var(--color-primary)]">
          a) Access Data & Server Log Files
        </h3>
        <p className="text-[var(--color-gray-800)] mb-4">
          When you visit our website, the hosting provider automatically
          collects and stores information in server log files, including:
        </p>
        <ul className="list-disc pl-6 mb-4 text-[var(--color-gray-800)]">
          <li>IP address of the requesting device</li>
          <li>Date and time of the request</li>
          <li>Browser type and version</li>
          <li>Operating system used</li>
          <li>Referrer URL</li>
          <li>Hostname of the accessing computer</li>
        </ul>
        <p className="text-[var(--color-gray-800)] mb-6">
          This data is used for ensuring system security and stability and for
          administrative purposes. We do not combine this data with other
          personal information.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-[var(--color-primary)]">
          b) Cookies
        </h3>
        <p className="text-[var(--color-gray-800)] mb-6">
          We use cookies to make our website user-friendly and to enable
          specific functionalities. You can manage or disable cookies in your
          browser settings at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--color-primary-dark)]">
          4. Contacting Us
        </h2>
        <p className="text-[var(--color-gray-800)] mb-6">
          If you contact us via form or email, your provided data (e.g., name,
          email, phone number, message) will be stored for the purpose of
          processing the inquiry and any follow-up questions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--color-primary-dark)]">
          5. POS System Data Processing
        </h2>
        <p className="text-[var(--color-gray-800)] mb-4">
          When installing, using, or maintaining our POS systems, we process
          personal data such as:
        </p>
        <ul className="list-disc pl-6 mb-6 text-[var(--color-gray-800)]">
          <li>Customer master data (name, address, email, phone number)</li>
          <li>Order and transaction data</li>
          <li>System and device information</li>
          <li>
            Payment data (e.g., card transactions through third-party providers)
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--color-primary-dark)]">
          6. Data Disclosure to Third Parties
        </h2>
        <p className="text-[var(--color-gray-800)] mb-6">
          We disclose personal data only when necessary for fulfilling a
          contract (e.g., to payment providers, IT hosting partners), when
          legally required, or when you have given explicit consent. If data is
          transferred outside the EEA, we ensure appropriate safeguards under
          Art. 44 ff. GDPR.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--color-primary-dark)]">
          7. Your Rights
        </h2>
        <p className="text-[var(--color-gray-800)] mb-4">
          You have the following rights under the GDPR:
        </p>
        <ul className="list-disc pl-6 mb-6 text-[var(--color-gray-800)]">
          <li>Right of access (Art. 15)</li>
          <li>Right to rectification (Art. 16)</li>
          <li>Right to erasure (Art. 17)</li>
          <li>Right to restriction of processing (Art. 18)</li>
          <li>Right to data portability (Art. 20)</li>
          <li>Right to object to processing (Art. 21)</li>
          <li>Right to withdraw consent (Art. 7(3))</li>
          <li>
            Right to lodge a complaint with a supervisory authority (Art. 77)
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--color-primary-dark)]">
          8. Data Security
        </h2>
        <p className="text-[var(--color-gray-800)] mb-6">
          We implement appropriate technical and organizational measures to
          protect your data from loss, manipulation, destruction, or
          unauthorized access. Our security practices are continuously improved
          in line with technological developments.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--color-primary-dark)]">
          9. Changes to This Privacy Policy
        </h2>
        <p className="text-[var(--color-gray-800)] mb-6">
          We reserve the right to update this Privacy Policy at any time to
          reflect legal or technical changes. The most current version will
          always be available on our website.
        </p>
      </motion.div>
    </motion.div>
  );
}
