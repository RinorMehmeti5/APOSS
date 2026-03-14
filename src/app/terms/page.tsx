"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import TextLineReveal from "@/components/ui/TextLineReveal";

export default function TermsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const sections = containerRef.current.querySelectorAll(".gsap-section");

      gsap.set(sections, { opacity: 0, y: 30 });

      gsap.to(sections, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.3,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[var(--color-bg-light)]"
    >
      <div className="container mx-auto px-4 pt-28 md:pt-32 pb-16 md:pb-24 max-w-4xl">
        <TextLineReveal
          tag="h1"
          className="text-3xl md:text-4xl font-bold mb-8 text-[var(--color-text-on-light)] font-[family-name:var(--font-display)]"
          delay={0.2}
        >
          General Terms and Conditions (GTC)
        </TextLineReveal>

        <p className="gsap-section text-sm text-[var(--color-text-on-light-muted)] mb-8">
          Version: 01.01.2025
        </p>

        <div className="prose prose-lg max-w-none">
          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            1. General Provisions
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            These General Terms and Conditions (hereinafter referred to as "GTC")
            govern all business relationships between APOS GmbH, based in Visp,
            Switzerland (hereinafter "APOS"), and its customers, including all
            resulting claims, in the version valid at the time of order
            confirmation. Deviating terms and conditions of the customer shall not
            be accepted unless APOS has expressly agreed to them in writing on a
            case-by-case basis.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            2. Offers
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            Unless otherwise agreed, APOS offers are non-binding and subject to
            change. If purchase prices, transport costs, public charges, or other
            essential cost factors increase or decrease, APOS reserves the right
            to adjust the agreed prices, including fixed prices.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            3. Order Acceptance
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            Orders are accepted and executed exclusively in accordance with these
            GTC. APOS reserves the right to reject customer orders on a
            case-by-case basis.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            4. Installation
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            Installation, programming, and training times are determined by the
            timeframe stated in the purchase contract. Additional services will be
            charged separately. The creation of data lines (in-building
            installation) and PC installation are the customer's responsibility.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            5. Support Subscription
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            Thirty (30) days after installation, our minimum support subscription
            will be invoiced automatically. This subscription includes free
            on-site service during the warranty period, telephone support during
            business hours, and hotline service outside business hours.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            6. Prices and Shipping Costs
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            Prices are in Swiss Francs (CHF). Unless explicitly stated otherwise,
            prices do not include VAT, disposal fees, charges, shipping,
            packaging, or delivery costs. Packaging is charged in addition to
            shipping costs, with a minimum of CHF 12.00.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            7. Complaints
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            The customer must inspect the goods immediately upon receipt.
            Complaints regarding defective or missing goods must be submitted in
            writing within five (5) days of receipt. Complaints made after this
            period will not entitle the customer to replacement, repair, contract
            cancellation, or compensation.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            8. Payment, Due Date, Default
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            Invoices are payable net within 30 days from the invoice date unless
            otherwise agreed in writing. From the second reminder onward, a
            reminder fee of CHF 10 per reminder will be charged. APOS reserves the
            right to charge interest for late payments from the due date. The
            default interest rate is the Swiss National Bank's discount rate plus
            five percent (5%).
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            9. Security Measures
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            APOS reserves the right to implement a system lock as a security
            measure, which activates in the event of non-compliance with agreed
            payment terms.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            10. Transfer of Risk
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-4">
            The risk of accidental damage or loss of the goods transfers to the
            customer:
          </p>
          <ul className="gsap-section list-disc pl-6 mb-6 text-[var(--color-text-on-light-secondary)]">
            <li>upon delivery,</li>
            <li>upon collection by the customer or a third party,</li>
            <li>or upon handover to a shipping carrier.</li>
          </ul>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            11. Warranty, Guarantee, Liability
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            The warranty period is 20 months from the invoice date. Any differing
            warranty periods must be agreed to in writing. APOS guarantees that
            the products are delivered in working condition. The warranty includes
            correction of defects or replacement of parts proven to be defective
            due to material, construction, or manufacturing faults.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            12. Retention of Title
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            Delivered goods remain the property of APOS until full payment has
            been received. APOS reserves the right to register the retention of
            title at the customer's expense.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            13. Place of Fulfillment
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            The place of fulfillment for all customer obligations is the
            registered office of APOS GmbH.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            14. Jurisdiction
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            This contract is governed by Swiss law. The place of jurisdiction is
            Wallis / Visp. APOS also reserves the right to pursue legal action at
            the customer's domicile.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            15. Miscellaneous
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            APOS reserves the right to amend these GTC at any time. Upon
            publication of an updated version, older versions become void.
          </p>

          <h2 className="gsap-section text-2xl font-semibold mt-8 mb-4 text-[var(--color-text-on-light)]">
            16. Validity
          </h2>
          <p className="gsap-section text-[var(--color-text-on-light-secondary)] mb-6">
            These GTC are an integral part of all purchase and service contracts.
            By entering into a contract, the customer agrees to these terms.
          </p>
        </div>
      </div>
    </div>
  );
}
