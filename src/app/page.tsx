"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  FiCoffee,
  FiGrid,
  FiPieChart,
  FiClock,
  FiCreditCard,
  FiCloud,
} from "react-icons/fi";
import ScatteredText from "@/components/ui/ScatteredText";
import TextLineReveal from "@/components/ui/TextLineReveal";
import InfiniteTextTicker from "@/components/ui/InfiniteTextTicker";
import ParallaxHeroSection from "@/components/ui/ParallaxHeroSection";
import AnimatedProductShowcase from "@/components/ui/AnimatedProductShowcase";
import ScrollReveal3DGallery from "@/components/ui/ScrollReveal3DGallery";
import StaggeredBlindsReveal from "@/components/ui/StaggeredBlindsReveal";
import TestimonialCardFan from "@/components/ui/TestimonialCardFan";
import SpotlightReveal from "@/components/ui/SpotlightReveal";
import { useCountUp } from "@/hooks/useGSAPAnimations";

/* ───────── Parallax Hero Layers (mock floating visuals) ───────── */
const heroLayers = [
  {
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.03))",
    speed: 0.3,
    className: "top-[10%] left-[5%] w-[280px] h-[180px] rounded-2xl opacity-60",
    label: "Dashboard",
  },
  {
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.10), rgba(16,185,129,0.03))",
    speed: -0.4,
    className: "top-[15%] right-[8%] w-[220px] h-[160px] rounded-2xl opacity-50",
    label: "Analytics",
  },
  {
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.10), rgba(168,85,247,0.03))",
    speed: 0.6,
    className: "bottom-[20%] left-[10%] w-[200px] h-[140px] rounded-2xl opacity-40",
    label: "Orders",
  },
  {
    gradient: "linear-gradient(135deg, rgba(251,146,60,0.10), rgba(251,146,60,0.03))",
    speed: -0.2,
    className: "bottom-[25%] right-[12%] w-[240px] h-[170px] rounded-2xl opacity-45",
    label: "Reports",
  },
  {
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.08), transparent)",
    speed: 0.15,
    className: "top-[40%] left-[30%] w-[160px] h-[160px] rounded-full blur-[60px] opacity-30",
  },
  {
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.06), transparent)",
    speed: -0.35,
    className: "top-[30%] right-[25%] w-[200px] h-[200px] rounded-full blur-[80px] opacity-25",
  },
];

/* ───────── Animated Product Showcase items (mock feature cards) ───────── */
const showcaseFeatures = [
  {
    id: 1,
    icon: FiCoffee,
    title: "Intuitive Order Taking",
    description: "Speed up service with our easy-to-use interface, minimizing errors and improving staff efficiency across every shift.",
    gradient: "linear-gradient(135deg, #1e3a5f, #0f2744)",
    label: "Orders",
    num: "01",
  },
  {
    id: 2,
    icon: FiGrid,
    title: "Seamless Table Management",
    description: "Visually manage your floor plan, track table status, and optimize seating to maximize turns during peak hours.",
    gradient: "linear-gradient(135deg, #1a3d2e, #0d2618)",
    label: "Tables",
    num: "02",
  },
  {
    id: 3,
    icon: FiPieChart,
    title: "Insightful Reporting",
    description: "Gain valuable insights into your sales, top items, and staff performance with comprehensive real-time dashboards.",
    gradient: "linear-gradient(135deg, #3b1f5e, #1e1035)",
    label: "Reports",
    num: "03",
  },
  {
    id: 4,
    icon: FiClock,
    title: "Kitchen Display Integration",
    description: "Streamline front-of-house and kitchen communication for faster, more accurate order fulfillment every time.",
    gradient: "linear-gradient(135deg, #5e3b1f, #352010)",
    label: "Kitchen",
    num: "04",
  },
  {
    id: 5,
    icon: FiCreditCard,
    title: "Flexible Payments",
    description: "Accept all payment types including credit cards, mobile payments, and gift cards with ease and security.",
    gradient: "linear-gradient(135deg, #1e4d5e, #0d2a35)",
    label: "Payments",
    num: "05",
  },
  {
    id: 6,
    icon: FiCloud,
    title: "Cloud-Based Management",
    description: "Access your data anywhere. Make menu changes, view reports, and monitor performance remotely from any device.",
    gradient: "linear-gradient(135deg, #4a1e5e, #2a0d35)",
    label: "Cloud",
    num: "06",
  },
];

/* ───────── 3D Gallery items for Showcase section (mock visuals) ───────── */
const galleryItems = [
  {
    id: 1,
    title: "Lightning-Fast Processing",
    subtitle: "Performance",
    gradient: "linear-gradient(135deg, #0f2744, #1e3a5f, #2563eb)",
  },
  {
    id: 2,
    title: "Multi-Location Scaling",
    subtitle: "Growth",
    gradient: "linear-gradient(135deg, #0d2618, #1a3d2e, #10b981)",
  },
  {
    id: 3,
    title: "Custom Workflows",
    subtitle: "Flexibility",
    gradient: "linear-gradient(135deg, #1e1035, #3b1f5e, #a855f7)",
  },
  {
    id: 4,
    title: "Smart Inventory Tracking",
    subtitle: "Automation",
    gradient: "linear-gradient(135deg, #352010, #5e3b1f, #fb923c)",
  },
  {
    id: 5,
    title: "Real-Time Analytics",
    subtitle: "Insights",
    gradient: "linear-gradient(135deg, #0d2a35, #1e4d5e, #06b6d4)",
  },
  {
    id: 6,
    title: "Secure Cloud Backup",
    subtitle: "Security",
    gradient: "linear-gradient(135deg, #2a0d35, #4a1e5e, #d946ef)",
  },
];

const testimonials = [
  { id: 1, quote: "APOS Solutions has revolutionized how we manage orders. Our staff loves it, and our service speed has dramatically improved!", name: "Maria Chen", business: "The Gourmet Spot", initials: "MC" },
  { id: 2, quote: "The reporting features are a game-changer. I finally have a clear understanding of my business performance.", name: "David Miller", business: "Brew & Bites Cafe", initials: "DM" },
  { id: 3, quote: "Switching to APOS was seamless. The interface is incredibly intuitive, and the support team was fantastic.", name: "Aisha Khan", business: "Spice Village", initials: "AK" },
  { id: 4, quote: "Since implementing APOS, we've seen a 30% reduction in order errors and our customers are noticing the improved service.", name: "James Wilson", business: "Urban Plate Group", initials: "JW" },
  { id: 5, quote: "The cloud management feature lets me monitor all three of my locations from anywhere. Absolute game-changer for growth.", name: "Sophie Brunner", business: "Alpine Bistro", initials: "SB" },
  { id: 6, quote: "We cut our table turnover time by 20 minutes during peak hours. The kitchen display integration is flawless.", name: "Luca Fontana", business: "Lakeside Grill", initials: "LF" },
];

const partners = [
  { name: "Sunmi", src: "/images/sunmi.png", label: "Hardware Partner" },
  { name: "SoftPay", src: "/images/softpay.png", label: "SoftPOS Payment" },
];

function StatCounter({ target, suffix, label, decimals }: { target: number; suffix: string; label: string; decimals?: number }) {
  const ref = useCountUp(target, { suffix, decimals });
  return (
    <div className="text-center">
      <span
        ref={ref}
        className="text-6xl md:text-8xl font-bold text-[var(--color-accent)] text-glow"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        0
      </span>
      <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[var(--color-text-on-dark-muted)]">
        {label}
      </p>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  // Hero CTA + scroll indicator animation
  useGSAP(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline({ delay: 1.2 });
    tl.from(".hero-cta", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: "power3.out" })
      .from(".hero-scroll", { opacity: 0, y: -10, duration: 0.5 }, "-=0.2");
  }, { scope: heroRef });

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO — Smooth Parallax Scroll Layout
          Floating parallax layers behind hero text create depth
          ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="bg-[var(--color-bg-dark)]">
        <ParallaxHeroSection layers={heroLayers} className="bg-[var(--color-bg-dark)]">
          <div className="min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-6 relative z-10 text-center pt-24 pb-20">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-medium mb-8 opacity-0 animate-[fadeIn_0.6s_0.2s_forwards]">
                All-Round Progressive Optimized Simple
              </p>

              <ScatteredText
                text="The Future of POS Management"
                tag="h1"
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight max-w-5xl mx-auto text-white"
                scrub={false}
                delay={0.3}
              />

              <div className="mt-8 max-w-xl mx-auto">
                <TextLineReveal
                  tag="p"
                  className="text-lg md:text-xl text-[var(--color-text-on-dark-secondary)] leading-relaxed"
                  delay={0.8}
                >
                  Streamline operations from order to payment. Intuitive, fast, and built for modern restaurants.
                </TextLineReveal>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/solutions"
                  className="hero-cta inline-flex items-center px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold text-sm hover:bg-[var(--color-accent-dark)] transition-all duration-300 hover:shadow-[0_0_30px_var(--color-accent-glow)]"
                >
                  Explore Features
                </Link>
                <Link
                  href="/download"
                  className="hero-cta inline-flex items-center px-8 py-4 rounded-full border border-[var(--color-border-dark)] text-white font-semibold text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  Download Now
                </Link>
              </div>

              {/* Scroll indicator */}
              <div className="hero-scroll mt-20 flex flex-col items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-[var(--color-text-on-dark-muted)]">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-[var(--color-text-on-dark-muted)] to-transparent" />
              </div>
            </div>
          </div>

          {/* Bottom ticker */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <InfiniteTextTicker
              text="ORDER · MANAGE · ANALYZE · GROW"
              className="text-6xl md:text-8xl font-bold text-outline text-white/10 py-4"
              speed={40}
            />
          </div>
        </ParallaxHeroSection>
      </section>

      {/* ═════ PARTNERS — Dark, seamless with hero ═════ */}
      <section className="py-12 bg-[var(--color-bg-dark)]">
        <div className="flex items-center justify-center gap-16 md:gap-24 flex-wrap px-6">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center gap-2">
              <div className="h-10 flex items-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <Image src={partner.src} alt={partner.name} width={100} height={50} className="object-contain" />
              </div>
              <span className="text-[10px] text-[var(--color-text-on-dark-muted)] uppercase tracking-wider">{partner.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES — Animated Fruity Product Showcase
          Wave-stagger entrance, ripple effects, hover interactions
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-light)] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <ScatteredText
              text="Everything Your Business Needs"
              tag="h2"
              className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text-on-light)]"
            />
            <div className="mt-4">
              <TextLineReveal tag="p" className="text-[var(--color-text-on-light-secondary)] max-w-2xl mx-auto text-lg">
                Powerful features designed for the modern restaurant experience.
              </TextLineReveal>
            </div>
          </div>

          <AnimatedProductShowcase items={showcaseFeatures} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SHOWCASE — Smooth 3D Scroll-Driven Reveal Gallery
          Cards flip into view with randomized 3D rotation on scroll
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[var(--color-bg-dark)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <ScatteredText
              text="See It in Action"
              tag="h2"
              className="text-3xl md:text-5xl font-bold tracking-tight text-white"
            />
            <div className="mt-4">
              <TextLineReveal tag="p" className="text-[var(--color-text-on-dark-secondary)] max-w-2xl mx-auto text-lg">
                Explore the tools that power hundreds of successful businesses worldwide.
              </TextLineReveal>
            </div>
          </div>

          <ScrollReveal3DGallery items={galleryItems} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS — With Staggered Blinds Reveal transition
          Horizontal blinds slide away to reveal stat counters
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[var(--color-bg-dark)] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

        <StaggeredBlindsReveal
          blindCount={8}
          direction="horizontal"
          staggerFrom="center"
          color="var(--color-bg-dark-secondary)"
          className="relative z-10"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair, serif)" }}
              >
                Trusted by <span className="text-gradient-accent">Industry Leaders</span>
              </h2>
              <p className="text-[var(--color-text-on-dark-secondary)] max-w-xl mx-auto text-lg">
                Numbers that speak for themselves across hundreds of businesses.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
              <StatCounter target={500} suffix="+" label="Restaurants" />
              <StatCounter target={99.9} suffix="%" label="Uptime" decimals={1} />
              <StatCounter target={30} suffix="%" label="Faster Service" />
            </div>
          </div>
        </StaggeredBlindsReveal>
      </section>

      {/* ═════ TESTIMONIALS — Light bg, card fan ═════ */}
      <section className="py-24 md:py-32 bg-[var(--color-bg-light)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <ScatteredText
              text="Trusted by Businesses Like Yours"
              tag="h2"
              className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text-on-light)]"
            />
          </div>

          <TestimonialCardFan cards={testimonials} />
        </div>
      </section>

      {/* ═════ CTA — Dark bg, spotlight reveal ═════ */}
      <section className="min-h-screen flex items-center justify-center bg-[var(--color-bg-dark)] relative">
        <SpotlightReveal spotlightSize={300} className="w-full min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 text-center py-24">
            <TextLineReveal
              tag="h2"
              className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto"
            >
              Ready to Transform Your Business?
            </TextLineReveal>
            <div className="mt-6">
              <TextLineReveal
                tag="p"
                className="text-lg text-[var(--color-text-on-dark-secondary)] max-w-xl mx-auto leading-relaxed"
                delay={0.3}
              >
                Join hundreds of successful businesses already thriving with APOS.
              </TextLineReveal>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/download"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-dark)] transition-all duration-300 hover:shadow-[0_0_30px_var(--color-accent-glow)]"
              >
                Request a Free Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[var(--color-border-dark)] text-white font-semibold hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                Contact Sales
              </Link>
            </div>
            <p className="mt-8 text-sm text-[var(--color-text-on-dark-muted)]">
              No credit card required &bull; Free 14-day trial &bull; Cancel anytime
            </p>
          </div>
        </SpotlightReveal>
      </section>
    </>
  );
}
