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
import HorizontalScrollSection from "@/components/ui/HorizontalScrollSection";
import StackingCards from "@/components/ui/StackingCards";
import ImageClipReveal from "@/components/ui/ImageClipReveal";
import TestimonialCardFan from "@/components/ui/TestimonialCardFan";
import SpotlightReveal from "@/components/ui/SpotlightReveal";
import { useCountUp } from "@/hooks/useGSAPAnimations";

const features = [
  { id: 1, icon: FiCoffee, title: "Intuitive Order Taking", description: "Speed up service with our easy-to-use interface, minimizing errors and improving staff efficiency.", num: "01" },
  { id: 2, icon: FiGrid, title: "Seamless Table Management", description: "Visually manage your floor plan, track table status, and optimize seating to maximize turns.", num: "02" },
  { id: 3, icon: FiPieChart, title: "Insightful Reporting", description: "Gain valuable insights into your sales, top items, and staff performance with comprehensive dashboards.", num: "03" },
  { id: 4, icon: FiClock, title: "Kitchen Display Integration", description: "Streamline front-of-house and kitchen communication for faster, more accurate order fulfillment.", num: "04" },
  { id: 5, icon: FiCreditCard, title: "Flexible Payments", description: "Accept all payment types including credit cards, mobile payments, and gift cards with ease.", num: "05" },
  { id: 6, icon: FiCloud, title: "Cloud-Based Management", description: "Access your data anywhere. Make menu changes, view reports, and monitor performance remotely.", num: "06" },
];

const testimonials = [
  { id: 1, quote: "APOS Solutions has revolutionized how we manage orders. Our staff loves it, and our service speed has dramatically improved!", name: "Maria Chen", business: "The Gourmet Spot", initials: "MC" },
  { id: 2, quote: "The reporting features are a game-changer. I finally have a clear understanding of my business performance.", name: "David Miller", business: "Brew & Bites Cafe", initials: "DM" },
  { id: 3, quote: "Switching to APOS was seamless. The interface is incredibly intuitive, and the support team was fantastic.", name: "Aisha Khan", business: "Spice Village", initials: "AK" },
  { id: 4, quote: "Since implementing APOS, we've seen a 30% reduction in order errors and our customers are noticing the improved service.", name: "James Wilson", business: "Urban Plate Group", initials: "JW" },
  { id: 5, quote: "The cloud management feature lets me monitor all three of my locations from anywhere. Absolute game-changer for growth.", name: "Sophie Brunner", business: "Alpine Bistro", initials: "SB" },
  { id: 6, quote: "We cut our table turnover time by 20 minutes during peak hours. The kitchen display integration is flawless.", name: "Luca Fontana", business: "Lakeside Grill", initials: "LF" },
];

const showcaseCards = [
  { title: "Designed for Speed", desc: "Lightning-fast order processing that keeps up with your busiest hours. Our optimized interface responds in milliseconds." },
  { title: "Built for Scale", desc: "From a single cafe to a multi-location empire. APOS grows with your ambitions, handling any volume effortlessly." },
  { title: "Crafted for You", desc: "Fully customizable workflows, menus, and reports tailored to your unique operations and business model." },
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
      {/* ═════ HERO — Dark, full viewport ═════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg-dark)]">
        {/* Decorative blurred accent shapes */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[100px]" />

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

        {/* Bottom ticker */}
        <div className="absolute bottom-0 left-0 right-0">
          <InfiniteTextTicker
            text="ORDER · MANAGE · ANALYZE · GROW"
            className="text-6xl md:text-8xl font-bold text-outline text-white/10 py-4"
            speed={40}
          />
        </div>
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

      {/* ═════ FEATURES — Light bg, horizontal scroll ═════ */}
      <section className="bg-[var(--color-bg-light)]">
        <div className="py-24 md:py-32">
          <div className="container mx-auto px-6 mb-12">
            <ScatteredText
              text="Everything Your Business Needs"
              tag="h2"
              className="text-3xl md:text-5xl font-bold tracking-tight text-center text-[var(--color-text-on-light)]"
            />
            <div className="mt-4 text-center">
              <TextLineReveal tag="p" className="text-[var(--color-text-on-light-secondary)] max-w-2xl mx-auto text-lg">
                Powerful features designed for the modern restaurant experience.
              </TextLineReveal>
            </div>
          </div>

          <HorizontalScrollSection className="min-h-[70vh]">
            {features.map((feature) => (
              <div key={feature.id} className="w-screen md:w-screen h-full flex items-center justify-center px-6 md:px-16">
                <div className="max-w-lg">
                  <span className="text-8xl font-bold text-outline text-[var(--color-text-on-light)]/10 block mb-6">
                    {feature.num}
                  </span>
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-6">
                    <feature.icon size={26} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-on-light)] mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-[var(--color-text-on-light-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </HorizontalScrollSection>
        </div>
      </section>

      {/* ═════ SHOWCASE — Dark bg, stacking cards ═════ */}
      <section className="py-24 md:py-32 bg-[var(--color-bg-dark)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <ScatteredText
              text="See It in Action"
              tag="h2"
              className="text-3xl md:text-5xl font-bold tracking-tight text-white"
            />
          </div>

          <StackingCards
            cards={showcaseCards.map((card, i) => ({
              key: `showcase-${i}`,
              content: (
                <div className="card-dark p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <ImageClipReveal direction={i % 2 === 0 ? "left" : "right"} className="w-full md:w-1/2">
                    <div className="aspect-video rounded-xl bg-[var(--color-bg-dark-secondary)] flex items-center justify-center">
                      <span className="text-[var(--color-text-on-dark-muted)] text-sm">{card.title} Visual</span>
                    </div>
                  </ImageClipReveal>
                  <div className="w-full md:w-1/2">
                    <span className="text-7xl font-bold text-outline text-white/10 block mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {card.title}
                    </h3>
                    <p className="text-[var(--color-text-on-dark-secondary)] leading-relaxed text-lg">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* ═════ STATS — Dark bg, large accent numbers ═════ */}
      <section className="py-24 md:py-32 bg-[var(--color-bg-dark)] relative overflow-hidden">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <StatCounter target={500} suffix="+" label="Restaurants" />
            <StatCounter target={99.9} suffix="%" label="Uptime" decimals={1} />
            <StatCounter target={30} suffix="%" label="Faster Service" />
          </div>
        </div>
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
