"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import ScatteredText from "@/components/ui/ScatteredText";
import TextLineReveal from "@/components/ui/TextLineReveal";
import MouseFollowImage from "@/components/ui/MouseFollowImage";
import StackingCards from "@/components/ui/StackingCards";
import ImageClipReveal from "@/components/ui/ImageClipReveal";
import SpotlightReveal from "@/components/ui/SpotlightReveal";

/* ───────── Solution data ───────── */

interface SolutionSection {
  title: string;
  description: string;
  features: string[];
  label: string;
}

const sections: SolutionSection[] = [
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
  },
];

/* ───────── Component ───────── */

export default function SolutionsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  /* Stagger-in for feature pills inside each stacking card */
  useGSAP(
    () => {
      if (!pageRef.current) return;

      sections.forEach((_, index) => {
        const pills = `.solution-pills-${index} .pill-chip`;

        gsap.from(pills, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: `.solution-card-${index}`,
            start: "top 75%",
            once: true,
          },
        });
      });

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

  /* ── Build StackingCards content ── */
  const stackCards = sections.map((section, index) => ({
    key: section.label,
    content: (
      <div
        className={`solution-card-${index} card-light rounded-2xl border border-[var(--color-border-light)] p-8 md:p-12`}
      >
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Visual placeholder with clip reveal */}
          <div className="w-full md:w-[45%] flex-shrink-0">
            <ImageClipReveal
              direction={index % 2 === 0 ? "left" : "right"}
              className="rounded-xl"
            >
              <div className="h-64 md:h-80 bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-bg-light)] flex items-center justify-center rounded-xl border border-[var(--color-border-light)]">
                <span
                  className="text-7xl font-bold text-[var(--color-accent)]/20"
                  style={{ fontFamily: "var(--font-playfair, serif)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </ImageClipReveal>
          </div>

          {/* Text content */}
          <div className="w-full md:w-[55%]">
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium mb-3 block">
              {section.label}
            </span>
            <h3
              className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-text-on-light)]"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              {section.title}
            </h3>
            <p className="text-base md:text-lg text-[var(--color-text-on-light-secondary)] mb-8 leading-relaxed">
              {section.description}
            </p>

            {/* Feature pills */}
            <div className={`solution-pills-${index} flex flex-wrap gap-2.5`}>
              {section.features.map((feature, fIndex) => (
                <span
                  key={fIndex}
                  className="pill-chip inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
                    border border-[var(--color-border-light)] text-[var(--color-text-on-light-secondary)]
                    transition-all duration-200
                    hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
                >
                  <svg
                    className="w-3.5 h-3.5 text-[var(--color-accent)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
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

      {/* ═════ 3. SOLUTION DETAILS — Light, stacking cards ═════ */}
      <section className="bg-[var(--color-bg-light)] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <ScatteredText
              text="Deep Dive into Each Solution"
              tag="h2"
              className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text-on-light)]"
            />
            <div className="mt-4">
              <TextLineReveal
                tag="p"
                className="text-[var(--color-text-on-light-secondary)] max-w-2xl mx-auto text-lg"
              >
                Explore the tools and capabilities that set APOS apart.
              </TextLineReveal>
            </div>
          </div>

          <StackingCards cards={stackCards} />
        </div>
      </section>

      {/* ═════ 4. CTA — Dark, spotlight ═════ */}
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
