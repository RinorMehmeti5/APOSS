"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import ScatteredText from "@/components/ui/ScatteredText";
import TextLineReveal from "@/components/ui/TextLineReveal";
import MouseFollowImage from "@/components/ui/MouseFollowImage";
import SplitScreenMaskReveal from "@/components/ui/SplitScreenMaskReveal";
import StaggeredBlindsReveal from "@/components/ui/StaggeredBlindsReveal";
import SpotlightReveal from "@/components/ui/SpotlightReveal";

/* ───────── Solution data ───────── */

const sections = [
  {
    title: "Intuitive Workflow & Service Management",
    description:
      "Empower your team with a lightning-fast, intuitive system that reduces training time and minimizes errors. Our customizable service and product management tools adapt to your business\u2019s unique needs, from simple projects to complex enterprise solutions.",
    features: [
      "Customizable service catalogs",
      "Drag-and-drop editing",
      "Quick-add tasks & packages",
      "Smart search with voice",
      "Automated compliance alerts",
      "Lifecycle management",
    ],
    label: "Order Management",
    gradient: "linear-gradient(135deg, #0f2744, #1e3a5f, #2563eb)",
  },
  {
    title: "Dynamic Resource & Asset Coordination",
    description:
      "Optimize your business\u2019s resources and assets with our intuitive visual interface. Track asset status in real-time, manage bookings, and maximize utilization efficiency to increase throughput and revenue.",
    features: [
      "Drag-and-drop scheduling",
      "Color-coded status indicators",
      "Integrated booking system",
      "Usage timer tracking",
      "Team workload balancing",
      "Conflict management",
    ],
    label: "Resource Planning",
    gradient: "linear-gradient(135deg, #0d2618, #1a3d2e, #10b981)",
  },
  {
    title: "Real-time Reporting & Analytics",
    description:
      "Gain powerful insights into your business\u2019s performance with our comprehensive reporting and analytics tools. Make data-driven decisions with customizable dashboards that highlight key metrics and trends in real-time.",
    features: [
      "Custom KPI dashboards",
      "Sales & revenue analysis",
      "Labor cost reporting",
      "Inventory tracking",
      "Automated email reports",
      "Trend visualization",
    ],
    label: "Analytics Dashboard",
    gradient: "linear-gradient(135deg, #1e1035, #3b1f5e, #a855f7)",
  },
  {
    title: "Team & Workflow Synchronization",
    description:
      "Streamline communication between your front-line and back-end teams with our robust synchronization system. Eliminate paper trails, reduce errors, and optimize task completion times for faster service and higher client satisfaction.",
    features: [
      "Digital task cards",
      "Priority management",
      "Workflow sequencing",
      "Mobile notifications",
      "Quality control",
      "Multi-stage projects",
    ],
    label: "Team Sync",
    gradient: "linear-gradient(135deg, #352010, #5e3b1f, #fb923c)",
  },
];

/* ───────── Component ───────── */

export default function SolutionsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pageRef.current) return;

      /* CTA buttons fade-in */
      gsap.from(".cta-btn", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".solutions-cta",
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: pageRef }
  );

  /* ── Build MouseFollowImage items ── */
  const navigatorItems = sections.map((s) => ({
    text: s.title,
    subtitle: s.label,
  }));

  return (
    <div ref={pageRef}>
      {/* ═════ 1. HEADER — Dark ═════ */}
      <section className="relative bg-[var(--color-bg-dark)] pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
        {/* Decorative accent blurs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-medium mb-8 opacity-0 animate-[fadeIn_0.6s_0.2s_forwards]">
            Our Platform
          </p>

          <ScatteredText
            text="Powering Your Success"
            tag="h1"
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight max-w-5xl mx-auto text-white"
            scrub={false}
            delay={0.3}
          />

          <div className="mt-8 max-w-2xl mx-auto">
            <TextLineReveal
              tag="p"
              className="text-lg md:text-xl text-[var(--color-text-on-dark-secondary)] leading-relaxed"
              delay={0.8}
            >
              Our comprehensive business platform is designed for any industry,
              offering a suite of powerful features that streamline operations,
              enhance client experiences, and boost your bottom line.
            </TextLineReveal>
          </div>
        </div>
      </section>

      {/* ═════ 2. SOLUTION NAVIGATOR — Dark ═════ */}
      <section className="bg-[var(--color-bg-dark)] pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          <MouseFollowImage items={navigatorItems} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. SOLUTION DETAILS — Pinned Split Screen Mask Reveal
          Left = text info, Right = image revealed with clipPath mask
          Scrolls through each solution while pinned on desktop
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-light)]">
        <div className="py-16 md:py-0">
          <div className="container mx-auto px-6 py-16 md:hidden">
            <ScatteredText
              text="Deep Dive into Each Solution"
              tag="h2"
              className="text-3xl font-bold tracking-tight text-[var(--color-text-on-light)] text-center"
            />
          </div>

          <SplitScreenMaskReveal items={sections} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. FEATURE HIGHLIGHTS — Staggered Blinds Reveal
          Blinds slide away to reveal key statistics
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-dark)] py-24 md:py-32">
        <StaggeredBlindsReveal
          blindCount={6}
          direction="vertical"
          staggerFrom="edges"
          color="var(--color-bg-dark-secondary)"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { number: "4", label: "Core Modules", desc: "Comprehensive solution covering every aspect of your business operations" },
                { number: "24+", label: "Key Features", desc: "From smart search to automated compliance, every tool you need" },
                { number: "100%", label: "Customizable", desc: "Tailored workflows and interfaces that adapt to your unique business" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <span
                    className="text-6xl md:text-7xl font-bold text-[var(--color-accent)] text-glow block mb-4"
                    style={{ fontFamily: "var(--font-playfair, serif)" }}
                  >
                    {stat.number}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-[var(--color-text-on-dark-secondary)] max-w-xs mx-auto leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </StaggeredBlindsReveal>
      </section>

      {/* ═════ 5. CTA — Dark, spotlight ═════ */}
      <section className="solutions-cta bg-[var(--color-bg-dark)] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <SpotlightReveal
            spotlightSize={300}
            className="rounded-2xl border border-[var(--color-border-dark)] py-20 md:py-28 px-8 md:px-16"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h2
                className="text-3xl md:text-5xl font-bold mb-6 text-white"
                style={{ fontFamily: "var(--font-playfair, serif)" }}
              >
                Ready to see APOS Solutions{" "}
                <span className="text-gradient-accent">in action?</span>
              </h2>
              <p className="text-lg text-[var(--color-text-on-dark-secondary)] mb-10 max-w-xl mx-auto leading-relaxed">
                Experience how our platform can transform your business
                operations and boost your bottom line.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/download"
                  className="cta-btn inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold text-sm hover:bg-[var(--color-accent-dark)] transition-all duration-300 hover:shadow-[0_0_30px_var(--color-accent-glow)]"
                >
                  Request a Demo
                </Link>
                <Link
                  href="/contact"
                  className="cta-btn inline-flex items-center justify-center px-8 py-4 rounded-full border border-[var(--color-border-dark)] text-white font-semibold text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </SpotlightReveal>
        </div>
      </section>
    </div>
  );
}
