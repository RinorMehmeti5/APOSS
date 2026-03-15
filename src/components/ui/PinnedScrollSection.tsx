"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface PinnedStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
}

interface PinnedScrollSectionProps {
  steps: PinnedStep[];
  className?: string;
}

/* ── Mock feature cards for pinned visual ── */
function PinnedMockCard({ subtitle }: { subtitle: string }) {
  switch (subtitle) {
    case "Performance":
      return (
        <div className="w-full rounded-xl overflow-hidden bg-[#0f1923]/80 backdrop-blur-sm border border-white/10">
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/10">
            <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Order Processing</span>
            <span className="text-[10px] text-emerald-400 font-medium">Live</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="text-center mb-3">
              <p className="text-[9px] text-white/30 uppercase tracking-wider">Avg Processing Time</p>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair, serif)" }}>0.8<span className="text-base text-white/40">s</span></p>
            </div>
            {[
              { label: "Orders/min", value: "24", bar: 80, color: "bg-blue-500" },
              { label: "Queue wait", value: "1.2s", bar: 15, color: "bg-emerald-500" },
              { label: "Error rate", value: "0.1%", bar: 3, color: "bg-emerald-500" },
            ].map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-white/40">{m.label}</span>
                  <span className="text-white/70 font-medium">{m.value}</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.06]">
                  <div className={`h-full rounded-full ${m.color}/50`} style={{ width: `${m.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "Growth":
      return (
        <div className="w-full rounded-xl overflow-hidden bg-[#0f1923]/80 backdrop-blur-sm border border-white/10">
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/10">
            <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Locations</span>
            <span className="text-[10px] text-emerald-400">All Online</span>
          </div>
          <div className="p-3 space-y-2">
            {[
              { name: "Main St.", rev: "$6,420", growth: "+18%", orders: "198" },
              { name: "Airport", rev: "$4,810", growth: "+24%", orders: "156" },
              { name: "Mall", rev: "$3,250", growth: "+31%", orders: "112" },
              { name: "Downtown", rev: "$5,100", growth: "+12%", orders: "167" },
            ].map((loc) => (
              <div key={loc.name} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/[0.05]">
                <div>
                  <p className="text-xs font-semibold text-white">{loc.name}</p>
                  <p className="text-[9px] text-white/30">{loc.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-white/70">{loc.rev}</p>
                  <p className="text-[9px] text-emerald-400">{loc.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "Flexibility":
      return (
        <div className="w-full rounded-xl overflow-hidden bg-[#0f1923]/80 backdrop-blur-sm border border-white/10">
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/10">
            <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Workflow Editor</span>
            <span className="text-[10px] text-purple-400">Custom</span>
          </div>
          <div className="p-4 space-y-2.5">
            {[
              { label: "Dine-in Flow", steps: "Seat → Order → Kitchen → Serve → Pay", active: true },
              { label: "Takeaway Flow", steps: "Order → Kitchen → Pack → Pickup", active: true },
              { label: "Delivery Flow", steps: "Order → Kitchen → Pack → Dispatch", active: false },
            ].map((wf) => (
              <div key={wf.label} className={`p-2.5 rounded-lg border ${wf.active ? "bg-purple-500/10 border-purple-500/20" : "bg-white/[0.03] border-white/[0.06]"}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-semibold text-white">{wf.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${wf.active ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/30"}`}>{wf.active ? "Active" : "Draft"}</span>
                </div>
                <p className="text-[9px] text-white/30 font-mono">{wf.steps}</p>
              </div>
            ))}
            <div className="flex gap-2 mt-1">
              <div className="flex-1 p-2 rounded-lg bg-white/[0.03] border border-dashed border-white/10 text-center">
                <span className="text-[9px] text-white/25">+ Add workflow</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Automation":
      return (
        <div className="w-full rounded-xl overflow-hidden bg-[#0f1923]/80 backdrop-blur-sm border border-white/10">
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/10">
            <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Inventory</span>
            <span className="text-[10px] text-amber-400">2 alerts</span>
          </div>
          <div className="p-3 space-y-2">
            {[
              { item: "Espresso Beans", stock: 82, unit: "kg", status: "ok" },
              { item: "Whole Milk", stock: 12, unit: "L", status: "low" },
              { item: "Croissants", stock: 8, unit: "pcs", status: "critical" },
              { item: "Avocado", stock: 45, unit: "pcs", status: "ok" },
              { item: "Oat Milk", stock: 18, unit: "L", status: "ok" },
            ].map((inv) => (
              <div key={inv.item} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    inv.status === "critical" ? "bg-red-400" :
                    inv.status === "low" ? "bg-amber-400" :
                    "bg-emerald-400"
                  }`} />
                  <span className="text-[11px] text-white">{inv.item}</span>
                </div>
                <span className={`text-[11px] font-medium ${
                  inv.status === "critical" ? "text-red-400" :
                  inv.status === "low" ? "text-amber-400" :
                  "text-white/50"
                }`}>{inv.stock} {inv.unit}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "Insights":
      return (
        <div className="w-full rounded-xl overflow-hidden bg-[#0f1923]/80 backdrop-blur-sm border border-white/10">
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/10">
            <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Analytics</span>
            <span className="text-[10px] text-white/40">Today</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.05]">
                <p className="text-[8px] text-white/30 uppercase">Revenue</p>
                <p className="text-sm font-bold text-white">$4,820</p>
                <span className="text-[9px] text-emerald-400">+15.2%</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.05]">
                <p className="text-[8px] text-white/30 uppercase">Orders</p>
                <p className="text-sm font-bold text-white">287</p>
                <span className="text-[9px] text-emerald-400">+8.4%</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-[9px] text-white/30 uppercase">Peak Hours</p>
              <div className="flex items-end gap-1 h-[60px]">
                {[15, 25, 40, 55, 80, 95, 100, 90, 70, 45, 30, 20].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{
                    height: `${h}%`,
                    background: h > 80 ? "rgba(6,182,212,0.7)" : "rgba(6,182,212,0.3)",
                  }} />
                ))}
              </div>
              <div className="flex justify-between text-[8px] text-white/20">
                <span>8am</span><span>12pm</span><span>4pm</span><span>8pm</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Security":
      return (
        <div className="w-full rounded-xl overflow-hidden bg-[#0f1923]/80 backdrop-blur-sm border border-white/10">
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/10">
            <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Cloud Backup</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Protected</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="text-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/15">
              <p className="text-[9px] text-emerald-400/70 uppercase tracking-wider">Last Backup</p>
              <p className="text-lg font-bold text-emerald-400">2 min ago</p>
              <p className="text-[9px] text-white/30">256-bit AES encrypted</p>
            </div>
            {[
              { label: "Transactions", status: "Synced", count: "12,847" },
              { label: "Menu data", status: "Synced", count: "342 items" },
              { label: "Staff records", status: "Synced", count: "28 users" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/[0.05]">
                <div>
                  <p className="text-[11px] text-white">{item.label}</p>
                  <p className="text-[9px] text-white/30">{item.count}</p>
                </div>
                <span className="text-[9px] text-emerald-400">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function PinnedScrollSection({
  steps,
  className = "",
}: PinnedScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeSubRef = useRef<HTMLSpanElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !stepsContainerRef.current) return;

      const stepEls = stepsContainerRef.current.querySelectorAll<HTMLElement>(".pinned-step");

      // Progress bar animation
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Animate each step as it enters the viewport
      stepEls.forEach((step, i) => {
        const stepData = steps[i];

        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => updatePinnedContent(i, stepData),
          onEnterBack: () => updatePinnedContent(i, stepData),
        });

        // Fade in step content
        gsap.fromTo(
          step,
          { opacity: 0.3, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );

        // Fade out step content when scrolling past
        gsap.to(step, {
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: step,
            start: "bottom 45%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      });

      function updatePinnedContent(index: number, stepData: PinnedStep) {
        // Update visual gradient
        if (visualRef.current) {
          gsap.to(visualRef.current, {
            background: stepData.gradient,
            duration: 0.6,
            ease: "power2.inOut",
          });
        }

        // Swap mock cards — fade out all, fade in active
        if (sectionRef.current) {
          const cards = sectionRef.current.querySelectorAll<HTMLElement>(".pinned-mock-card");
          cards.forEach((card, ci) => {
            gsap.to(card, {
              opacity: ci === index ? 1 : 0,
              scale: ci === index ? 1 : 0.95,
              duration: 0.4,
              ease: "power2.inOut",
              pointerEvents: ci === index ? "auto" : "none",
            });
          });
        }

        // Update subtitle
        if (activeSubRef.current) {
          gsap.to(activeSubRef.current, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              if (activeSubRef.current) {
                activeSubRef.current.textContent = stepData.subtitle;
                gsap.to(activeSubRef.current, { opacity: 1, duration: 0.3 });
              }
            },
          });
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Pinned left panel — visual showcase */}
        <div
          className="hidden lg:flex w-1/2 h-screen items-center justify-center sticky top-0"
        >
          <div className="relative w-full max-w-2xl mx-auto px-12">
            {/* Large visual card */}
            <div
              ref={visualRef}
              className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: steps[0]?.gradient || "linear-gradient(135deg, #0f2744, #1e3a5f)" }}
            >
              {/* Subtitle badge */}
              <div className="absolute top-6 left-8 z-10">
                <span
                  ref={activeSubRef}
                  className="text-xs uppercase tracking-[0.2em] text-white/50 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  {steps[0]?.subtitle || ""}
                </span>
              </div>

              {/* Mock cards — stacked, one visible at a time */}
              <div className="absolute inset-0 flex items-center justify-center p-8 pt-14">
                {steps.map((step, i) => (
                  <div
                    key={step.id}
                    className="pinned-mock-card absolute inset-0 flex items-center justify-center p-8 pt-14"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <PinnedMockCard subtitle={step.subtitle} />
                  </div>
                ))}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="w-[2px] h-48 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="w-full h-full bg-[var(--color-accent)] origin-top"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>
              <span className="text-[10px] text-white/30 uppercase tracking-wider">
                {steps.length} steps
              </span>
            </div>
          </div>
        </div>

        {/* Scrolling right panel — step content */}
        <div ref={stepsContainerRef} className="w-full lg:w-1/2 lg:pl-8">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className="pinned-step min-h-[60vh] flex items-center"
            >
              <div className="py-12 px-6 lg:px-12 max-w-xl">
                {/* Mobile-only visual card */}
                <div
                  className="lg:hidden mb-8 aspect-video rounded-2xl overflow-hidden relative"
                  style={{ background: step.gradient }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <PinnedMockCard subtitle={step.subtitle} />
                  </div>
                </div>

                {/* Step label */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {step.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-playfair, serif)" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--color-text-on-dark-secondary)] text-base leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative line */}
                <div className="mt-8 w-12 h-[2px] bg-[var(--color-accent)]/30 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
