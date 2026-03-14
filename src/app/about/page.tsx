"use client";
import React from "react";
import ScatteredText from "@/components/ui/ScatteredText";
import TextLineReveal from "@/components/ui/TextLineReveal";
import HorizontalScrollSection from "@/components/ui/HorizontalScrollSection";
import StackingCards from "@/components/ui/StackingCards";
import MouseFollowImage from "@/components/ui/MouseFollowImage";

/* ================================================================
   DATA
   ================================================================ */

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

const values = [
  {
    id: 1,
    title: "Innovation",
    description:
      "We constantly push the boundaries of what POS technology can do, seeking new ways to solve industry challenges.",
    icon: (
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
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Customer Focus",
    description:
      "We listen intently to our customers needs and prioritize features that create real value for their businesses.",
    icon: (
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
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Reliability",
    description:
      "We build software that businesses can depend on every day, with uptime and stability as our top priorities.",
    icon: (
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
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Simplicity",
    description:
      "We believe powerful software can also be easy to use. We focus on intuitive designs that require minimal training.",
    icon: (
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
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
];

/* ================================================================
   DERIVED DATA FOR NEW COMPONENTS
   ================================================================ */

const mouseFollowItems = teamMembers.map((member) => ({
  text: member.name,
  subtitle: member.title,
}));

const valueCards = values.map((value) => ({
  key: String(value.id),
  content: (
    <div className="card-light rounded-2xl p-8 md:p-10">
      <div
        className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-border-light)]
          flex items-center justify-center mb-6 text-[var(--color-accent)]"
      >
        {value.icon}
      </div>
      <h3
        className="text-xl md:text-2xl font-semibold mb-3 text-[var(--color-text-on-light)]"
        style={{ fontFamily: "var(--font-playfair, serif)" }}
      >
        {value.title}
      </h3>
      <p className="text-sm md:text-base text-[var(--color-text-on-light-muted)] leading-relaxed max-w-lg">
        {value.description}
      </p>
    </div>
  ),
}));

/* ================================================================
   PAGE COMPONENT
   ================================================================ */

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ============================================================
          SECTION 1 : Hero (DARK)
          ============================================================ */}
      <section className="relative bg-[var(--color-bg-dark)] pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
        {/* Subtle CSS grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-text-on-dark-muted)] mb-8">
            About APOS
          </p>

          <ScatteredText
            text="Meet the Team Behind Your Success"
            tag="h1"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8"
            scrub={false}
            delay={0.3}
          />

          <TextLineReveal
            tag="p"
            className="text-lg md:text-xl text-[var(--color-text-on-dark-secondary)] max-w-2xl mx-auto leading-relaxed"
            delay={0.8}
          >
            To empower businesses of all sizes with technology that simplifies
            operations, enhances customer experiences, and drives sustainable
            growth.
          </TextLineReveal>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 : Timeline - Horizontal Scroll (DARK)
          ============================================================ */}
      <section className="bg-[var(--color-bg-dark)] py-24 md:py-0">
        {/* Section header */}
        <div className="max-w-6xl mx-auto px-6 pb-12 md:pb-0 md:pt-24">
          <TextLineReveal
            tag="h2"
            className="text-3xl md:text-4xl font-bold text-center text-white mb-4"
            scrub
          >
            Our Journey
          </TextLineReveal>
          <TextLineReveal
            tag="p"
            className="text-center text-[var(--color-text-on-dark-muted)] mb-12 md:mb-16 max-w-lg mx-auto"
            scrub
          >
            From an idea born out of industry frustration to a company redefining
            point-of-sale technology.
          </TextLineReveal>
        </div>

        <HorizontalScrollSection>
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="w-full md:w-[80vw] lg:w-[50vw] flex-shrink-0 px-6 md:px-12 py-12 md:py-24 flex flex-col justify-center"
            >
              {/* Large outlined year */}
              <span
                className="text-outline text-6xl md:text-8xl lg:text-9xl font-bold text-[var(--color-text-on-dark-muted)] mb-6 block"
                style={{ fontFamily: "var(--font-playfair, serif)" }}
              >
                {milestone.year}
              </span>

              <h3
                className="text-2xl md:text-3xl font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair, serif)" }}
              >
                {milestone.title}
              </h3>

              <p className="text-base md:text-lg text-[var(--color-text-on-dark-secondary)] leading-relaxed max-w-md">
                {milestone.description}
              </p>
            </div>
          ))}
        </HorizontalScrollSection>
      </section>

      {/* ============================================================
          SECTION 3 : Values - Stacking Cards (LIGHT)
          ============================================================ */}
      <section className="bg-[var(--color-bg-light)] py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <TextLineReveal
            tag="h2"
            className="text-3xl md:text-4xl font-bold text-center text-[var(--color-text-on-light)] mb-4"
            scrub
          >
            Our Core Values
          </TextLineReveal>
          <TextLineReveal
            tag="p"
            className="text-center text-[var(--color-text-on-light-muted)] mb-16 max-w-lg mx-auto"
            scrub
          >
            The principles that guide every decision we make and every line of
            code we write.
          </TextLineReveal>

          <StackingCards cards={valueCards} />
        </div>
      </section>

      {/* ============================================================
          SECTION 4 : Team - Mouse Follow Image (DARK)
          ============================================================ */}
      <section className="bg-[var(--color-bg-dark)] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <TextLineReveal
            tag="h2"
            className="text-3xl md:text-4xl font-bold text-center text-white mb-4"
            scrub
          >
            The People Behind APOS
          </TextLineReveal>
          <TextLineReveal
            tag="p"
            className="text-center text-[var(--color-text-on-dark-muted)] mb-16 max-w-lg mx-auto"
            scrub
          >
            A passionate team combining deep industry knowledge with technical
            excellence.
          </TextLineReveal>

          <MouseFollowImage items={mouseFollowItems} />
        </div>
      </section>

      {/* ============================================================
          SECTION 5 : Vision (LIGHT)
          ============================================================ */}
      <section className="bg-[var(--color-bg-light)] py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="card-light rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
            {/* Subtle corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[var(--color-accent)] rounded-tl-2xl opacity-30" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[var(--color-accent)] rounded-br-2xl opacity-30" />

            <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold tracking-wide bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-border-light)] mb-8">
              The Future
            </span>

            <TextLineReveal
              tag="p"
              className="text-xl md:text-2xl text-[var(--color-text-on-light)] font-light italic leading-relaxed mb-6"
              scrub
            >
              POS should serve the business -- not the other way around
            </TextLineReveal>

            <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto mb-6 opacity-50" />

            <TextLineReveal
              tag="p"
              className="text-base text-[var(--color-text-on-light-muted)] leading-relaxed max-w-xl mx-auto"
              scrub
            >
              Our mission is to become the new standard for intuitive, scalable
              and future-ready point-of-sale systems. We are building a platform
              that grows with your business.
            </TextLineReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
