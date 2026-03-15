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
import ParallaxSlideShowcase from "@/components/ui/ParallaxSlideShowcase";
import PinnedScrollSection from "@/components/ui/PinnedScrollSection";
import StaggeredBlindsReveal from "@/components/ui/StaggeredBlindsReveal";
import TestimonialCardFan from "@/components/ui/TestimonialCardFan";
import SpotlightReveal from "@/components/ui/SpotlightReveal";
import { useCountUp } from "@/hooks/useGSAPAnimations";

/* ───────── Mini mock UI cards for hero parallax ───────── */
const HeroDashboardCard = () => (
  <div className="w-full h-full rounded-2xl bg-[#0d1526] border border-white/[0.08] overflow-hidden shadow-2xl">
    <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
      <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Dashboard</span>
      <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400"/><div className="w-1.5 h-1.5 rounded-full bg-white/20"/></div>
    </div>
    <div className="p-3 space-y-2">
      <div className="flex items-end gap-1 h-16">
        {[40,65,45,80,60,90,70,55,85,75].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-blue-500/60" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="flex justify-between">
        <div><div className="text-[10px] text-white/40">Revenue</div><div className="text-[13px] font-bold text-white">$12,840</div></div>
        <div><div className="text-[10px] text-white/40">Orders</div><div className="text-[13px] font-bold text-green-400">+24%</div></div>
      </div>
    </div>
  </div>
);

const HeroAnalyticsCard = () => (
  <div className="w-full h-full rounded-2xl bg-[#0d1526] border border-white/[0.08] overflow-hidden shadow-2xl">
    <div className="px-4 py-2.5 border-b border-white/[0.06]">
      <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Analytics</span>
    </div>
    <div className="p-3 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-14 h-14 rounded-full border-[3px] border-emerald-400 border-r-transparent flex items-center justify-center">
          <span className="text-[11px] font-bold text-emerald-400">87%</span>
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between text-[9px]"><span className="text-white/50">Dine-in</span><span className="text-white/70">52%</span></div>
          <div className="h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-blue-400" style={{ width: "52%" }}/></div>
          <div className="flex justify-between text-[9px]"><span className="text-white/50">Takeout</span><span className="text-white/70">35%</span></div>
          <div className="h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-purple-400" style={{ width: "35%" }}/></div>
        </div>
      </div>
    </div>
  </div>
);

const HeroOrdersCard = () => (
  <div className="w-full h-full rounded-2xl bg-[#0d1526] border border-white/[0.08] overflow-hidden shadow-2xl">
    <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
      <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Orders</span>
      <span className="text-[9px] text-green-400 font-medium">3 active</span>
    </div>
    <div className="p-2 space-y-1.5">
      {[
        { id: "#1042", status: "Preparing", color: "bg-amber-500", price: "$14.50" },
        { id: "#1043", status: "Ready", color: "bg-green-500", price: "$18.90" },
        { id: "#1044", status: "New", color: "bg-blue-500", price: "$27.00" },
      ].map((o) => (
        <div key={o.id} className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.03]">
          <span className="text-[10px] font-mono text-white/70">{o.id}</span>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-full text-white ${o.color}`}>{o.status}</span>
          <span className="text-[10px] text-white/60">{o.price}</span>
        </div>
      ))}
    </div>
  </div>
);

const HeroReportsCard = () => (
  <div className="w-full h-full rounded-2xl bg-[#0d1526] border border-white/[0.08] overflow-hidden shadow-2xl">
    <div className="px-4 py-2.5 border-b border-white/[0.06]">
      <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Reports</span>
    </div>
    <div className="p-3 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/[0.04] rounded-lg p-2"><div className="text-[9px] text-white/40">Today</div><div className="text-[12px] font-bold text-white">$2,340</div></div>
        <div className="bg-white/[0.04] rounded-lg p-2"><div className="text-[9px] text-white/40">Avg Order</div><div className="text-[12px] font-bold text-white">$26.90</div></div>
      </div>
      <div className="flex items-end gap-[3px] h-8">
        {[30,50,40,70,55,80,65,45,75,60,85,70].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i >= 8 ? "rgba(251,146,60,0.7)" : "rgba(251,146,60,0.3)" }} />
        ))}
      </div>
    </div>
  </div>
);

/* ───────── Parallax Hero Layers (mock floating visuals) ───────── */
const heroLayers = [
  {
    content: <HeroDashboardCard />,
    speed: 0.3,
    className: "top-[22%] left-[5%] w-[260px] h-[180px] rounded-2xl opacity-80",
    label: "Dashboard",
  },
  {
    content: <HeroAnalyticsCard />,
    speed: -0.4,
    className: "top-[15%] right-[8%] w-[220px] h-[150px] rounded-2xl opacity-70",
    label: "Analytics",
  },
  {
    content: <HeroOrdersCard />,
    speed: 0.6,
    className: "bottom-[20%] left-[10%] w-[200px] h-[155px] rounded-2xl opacity-65",
    label: "Orders",
  },
  {
    content: <HeroReportsCard />,
    speed: -0.2,
    className: "bottom-[25%] right-[12%] w-[230px] h-[165px] rounded-2xl opacity-70",
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
    gradient: "linear-gradient(135deg, #2563eb 0%, #1e40af 40%, #0f2744 100%)",
    label: "Orders",
    num: "01",
  },
  {
    id: 2,
    icon: FiGrid,
    title: "Seamless Table Management",
    description: "Visually manage your floor plan, track table status, and optimize seating to maximize turns during peak hours.",
    gradient: "linear-gradient(135deg, #10b981 0%, #047857 40%, #0d2618 100%)",
    label: "Tables",
    num: "02",
  },
  {
    id: 3,
    icon: FiPieChart,
    title: "Insightful Reporting",
    description: "Gain valuable insights into your sales, top items, and staff performance with comprehensive real-time dashboards.",
    gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 40%, #1e1035 100%)",
    label: "Reports",
    num: "03",
  },
  {
    id: 4,
    icon: FiClock,
    title: "Kitchen Display Integration",
    description: "Streamline front-of-house and kitchen communication for faster, more accurate order fulfillment every time.",
    gradient: "linear-gradient(135deg, #fb923c 0%, #d97706 40%, #352010 100%)",
    label: "Kitchen",
    num: "04",
  },
  {
    id: 5,
    icon: FiCreditCard,
    title: "Flexible Payments",
    description: "Accept all payment types including credit cards, mobile payments, and gift cards with ease and security.",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 40%, #0d2a35 100%)",
    label: "Payments",
    num: "05",
  },
  {
    id: 6,
    icon: FiCloud,
    title: "Cloud-Based Management",
    description: "Access your data anywhere. Make menu changes, view reports, and monitor performance remotely from any device.",
    gradient: "linear-gradient(135deg, #d946ef 0%, #a21caf 40%, #2a0d35 100%)",
    label: "Cloud",
    num: "06",
  },
];

/* ───────── Pinned scroll steps for "See It in Action" section ───────── */
const pinnedSteps = [
  {
    id: 1,
    title: "Lightning-Fast Order Processing",
    subtitle: "Performance",
    description: "Every millisecond counts during rush hour. APOS processes orders instantly, keeping your queue moving and your customers happy with zero lag.",
    gradient: "linear-gradient(135deg, #0f2744, #1e3a5f, #2563eb)",
  },
  {
    id: 2,
    title: "Scale Across Multiple Locations",
    subtitle: "Growth",
    description: "Expand effortlessly. Manage menus, staff, and reporting across all your locations from a single centralized dashboard — no matter where you are.",
    gradient: "linear-gradient(135deg, #0d2618, #1a3d2e, #10b981)",
  },
  {
    id: 3,
    title: "Fully Customizable Workflows",
    subtitle: "Flexibility",
    description: "No two restaurants are the same. Tailor order flows, floor plans, and receipt formats to match your unique operations and service style.",
    gradient: "linear-gradient(135deg, #1e1035, #3b1f5e, #a855f7)",
  },
  {
    id: 4,
    title: "Smart Inventory Tracking",
    subtitle: "Automation",
    description: "Automatically track stock levels as orders are placed. Get low-stock alerts and reduce waste with real-time inventory intelligence.",
    gradient: "linear-gradient(135deg, #352010, #5e3b1f, #fb923c)",
  },
  {
    id: 5,
    title: "Real-Time Analytics Dashboard",
    subtitle: "Insights",
    description: "Make data-driven decisions with live sales reports, peak-hour analysis, and staff performance metrics — all visualized in one place.",
    gradient: "linear-gradient(135deg, #0d2a35, #1e4d5e, #06b6d4)",
  },
  {
    id: 6,
    title: "Secure Cloud Backup & Sync",
    subtitle: "Security",
    description: "Your data is always safe. Continuous cloud backups ensure you never lose a transaction, and syncing keeps every device up to date instantly.",
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

  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const partnersRef = useRef<HTMLElement>(null);

  // Hero heading scattered animation + CTA
  useGSAP(() => {
    if (!heroRef.current) return;

    // Scattered text animation for heading
    if (heroHeadingRef.current) {
      import("split-type").then(({ default: SplitType }) => {
        const split = new SplitType(heroHeadingRef.current!, { types: "chars" });
        if (!split.chars || split.chars.length === 0) return;

        split.chars.forEach((char) => {
          gsap.set(char, {
            x: gsap.utils.random(-300, 300),
            y: gsap.utils.random(-200, 200),
            rotation: gsap.utils.random(-180, 180),
            opacity: 0,
            scale: gsap.utils.random(0.3, 1.8),
            willChange: "transform, opacity",
          });
        });

        gsap.to(split.chars, {
          x: 0, y: 0, rotation: 0, opacity: 1, scale: 1,
          duration: 1.4, stagger: 0.015, delay: 0.3, ease: "power4.out",
        });
      });
    }

    const tl = gsap.timeline({ delay: 1.2 });
    tl.fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power3.out" });
  }, { scope: heroRef });

  // Partners entrance animation
  useGSAP(() => {
    if (!partnersRef.current) return;
    gsap.from(partnersRef.current.querySelectorAll(".partner-item"), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: partnersRef.current,
        start: "top 85%",
      },
    });
  }, { scope: partnersRef });

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

              <h1
                ref={heroHeadingRef}
                className="split-parent text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight max-w-5xl mx-auto text-white"
              >
                The Future of <span className="text-[var(--color-accent)]">POS</span>{" "}
                <span className="whitespace-nowrap">Management</span>
              </h1>

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
                  className="hero-cta opacity-0 inline-flex items-center px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold text-sm hover:bg-[var(--color-accent-dark)] transition-all duration-300 hover:shadow-[0_0_30px_var(--color-accent-glow)]"
                >
                  Explore Features
                </Link>
                <Link
                  href="/download"
                  className="hero-cta opacity-0 inline-flex items-center px-8 py-4 rounded-full border border-[var(--color-border-dark)] text-white font-semibold text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  Download Now
                </Link>
              </div>

            </div>
          </div>

          {/* Bottom ticker */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <InfiniteTextTicker
              text="ORDER · MANAGE · ANALYZE · GROW"
              className="text-6xl md:text-8xl font-bold text-outline text-white/60 py-4"
              speed={40}
            />
          </div>
        </ParallaxHeroSection>
      </section>

      {/* ═════ PARTNERS — Dark, seamless with hero ═════ */}
      <section ref={partnersRef} className="py-16 bg-[var(--color-bg-dark)]">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-white/30 mb-10">Trusted Partners</p>
        <div className="flex items-center justify-center gap-20 md:gap-32 flex-wrap px-6">
          {partners.map((partner) => (
            <div key={partner.name} className="partner-item flex flex-col items-center gap-3 group">
              <div className="h-14 flex items-center brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-500">
                <Image src={partner.src} alt={partner.name} width={140} height={70} className="object-contain" />
              </div>
              <span className="text-[11px] text-white/40 uppercase tracking-wider group-hover:text-white/70 transition-colors duration-500">{partner.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES — Smooth Parallax Scroll Layout (Duda-style)
          Full-height slides, 50/50 split, parallax visuals
          ═══════════════════════════════════════════════════════════ */}
      <ParallaxSlideShowcase features={showcaseFeatures} />

      {/* ═══════════════════════════════════════════════════════════
          SHOWCASE — Pinned Scroll Section
          Left panel stays pinned while steps scroll on the right
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-dark)]">
        <div className="container mx-auto px-6 pt-24 md:pt-32 pb-12">
          <div className="text-center">
            <ScatteredText
              text="See It in Action"
              tag="h2"
              className="text-3xl md:text-5xl font-bold tracking-tight text-white"
            />
            <div className="mt-4">
              <TextLineReveal tag="p" className="text-[var(--color-text-on-dark-secondary)] max-w-2xl mx-auto text-lg">
                Scroll through the key capabilities that power hundreds of successful businesses.
              </TextLineReveal>
            </div>
          </div>
        </div>

        <PinnedScrollSection steps={pinnedSteps} />
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
          color="#ffffff"
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
