"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import type { IconType } from "react-icons";

interface SlideFeature {
  id: number;
  icon: IconType;
  title: string;
  description: string;
  gradient: string;
  label: string;
  num: string;
}

interface ParallaxSlideShowcaseProps {
  features: SlideFeature[];
  className?: string;
}

/* Muted panel backgrounds — one per feature */
const panelBgs = [
  "#1e3a5f", // Orders – blue
  "#1a3d2e", // Tables – green
  "#3b1f5e", // Reports – purple
  "#5e3b1f", // Kitchen – amber
  "#1e4d5e", // Payments – cyan
  "#4a1e5e", // Cloud – magenta
];

/** Split a title roughly in half for the two-line reveal effect */
function splitTitle(title: string): [string, string] {
  const words = title.split(" ");
  if (words.length <= 1) return [title, ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

/* ── Mock POS feature post cards ── */
function MockPostCard({ label, gradient }: { label: string; gradient: string }) {
  switch (label) {
    case "Orders":
      return (
        <div className="w-[85%] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f1923]/90 backdrop-blur-sm border border-white/10">
          <div className="px-5 py-3 flex items-center justify-between border-b border-white/10">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Live Orders</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="p-4 space-y-3">
            {[
              { id: "#1042", items: "2x Espresso, 1x Croissant", total: "$14.50", status: "Preparing" },
              { id: "#1043", items: "1x Latte, 1x Avocado Toast", total: "$18.90", status: "Ready" },
              { id: "#1044", items: "3x Cappuccino, 2x Muffin", total: "$27.00", status: "New" },
            ].map((order) => (
              <div key={order.id} className="flex items-start justify-between p-3 rounded-lg bg-white/[0.05] border border-white/[0.06]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{order.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      order.status === "New" ? "bg-blue-500/20 text-blue-300" :
                      order.status === "Ready" ? "bg-emerald-500/20 text-emerald-300" :
                      "bg-amber-500/20 text-amber-300"
                    }`}>{order.status}</span>
                  </div>
                  <p className="text-[11px] text-white/40">{order.items}</p>
                </div>
                <span className="text-sm font-semibold text-white/70">{order.total}</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-white/10 flex justify-between items-center">
            <span className="text-[10px] text-white/30 uppercase tracking-wider">Today: 87 orders</span>
            <span className="text-xs font-semibold text-emerald-400">$2,340.50</span>
          </div>
        </div>
      );

    case "Tables":
      return (
        <div className="w-[85%] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f1923]/90 backdrop-blur-sm border border-white/10">
          <div className="px-5 py-3 flex items-center justify-between border-b border-white/10">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Floor Plan</span>
            <span className="text-[10px] text-white/40">12 / 18 occupied</span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-4 gap-3">
              {[
                { n: "1", s: "occupied" }, { n: "2", s: "occupied" }, { n: "3", s: "free" }, { n: "4", s: "reserved" },
                { n: "5", s: "free" }, { n: "6", s: "occupied" }, { n: "7", s: "occupied" }, { n: "8", s: "free" },
                { n: "9", s: "occupied" }, { n: "10", s: "occupied" }, { n: "11", s: "free" }, { n: "12", s: "occupied" },
                { n: "13", s: "occupied" }, { n: "14", s: "reserved" }, { n: "15", s: "occupied" }, { n: "16", s: "occupied" },
              ].map((t) => (
                <div key={t.n} className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold border ${
                  t.s === "occupied" ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" :
                  t.s === "reserved" ? "bg-amber-500/15 border-amber-500/30 text-amber-400" :
                  "bg-white/[0.04] border-white/10 text-white/25"
                }`}>
                  {t.n}
                </div>
              ))}
            </div>
          </div>
          <div className="px-5 py-3 border-t border-white/10 flex gap-4">
            <span className="flex items-center gap-1.5 text-[10px] text-white/40"><span className="w-2 h-2 rounded-full bg-emerald-500/50" />Occupied</span>
            <span className="flex items-center gap-1.5 text-[10px] text-white/40"><span className="w-2 h-2 rounded-full bg-amber-500/50" />Reserved</span>
            <span className="flex items-center gap-1.5 text-[10px] text-white/40"><span className="w-2 h-2 rounded-full bg-white/20" />Free</span>
          </div>
        </div>
      );

    case "Reports":
      return (
        <div className="w-[85%] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f1923]/90 backdrop-blur-sm border border-white/10">
          <div className="px-5 py-3 flex items-center justify-between border-b border-white/10">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Revenue Report</span>
            <span className="text-[10px] text-white/40">This week</span>
          </div>
          <div className="p-5">
            <div className="flex items-end justify-between h-[140px] gap-2 mb-3">
              {[
                { day: "Mon", h: 55 }, { day: "Tue", h: 72 }, { day: "Wed", h: 48 },
                { day: "Thu", h: 85 }, { day: "Fri", h: 95 }, { day: "Sat", h: 100 }, { day: "Sun", h: 68 },
              ].map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-full rounded-t-md" style={{ height: `${d.h}%`, background: `linear-gradient(to top, rgba(168,85,247,0.3), rgba(168,85,247,0.7))` }} />
                  <span className="text-[9px] text-white/30">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                <p className="text-[10px] text-white/40 uppercase">Revenue</p>
                <p className="text-lg font-bold text-white">$18.4k</p>
                <span className="text-[10px] text-emerald-400">+12.3%</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                <p className="text-[10px] text-white/40 uppercase">Avg Order</p>
                <p className="text-lg font-bold text-white">$24.80</p>
                <span className="text-[10px] text-emerald-400">+3.1%</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Kitchen":
      return (
        <div className="w-[85%] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f1923]/90 backdrop-blur-sm border border-white/10">
          <div className="px-5 py-3 flex items-center justify-between border-b border-white/10">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Kitchen Display</span>
            <span className="text-xs text-amber-400 font-medium">3 pending</span>
          </div>
          <div className="p-4 space-y-3">
            {[
              { id: "#1042", time: "2:30", items: ["2x Espresso", "1x Croissant"], urgent: true },
              { id: "#1043", time: "1:15", items: ["1x Latte", "1x Avocado Toast"], urgent: false },
              { id: "#1044", time: "0:45", items: ["3x Cappuccino", "2x Blueberry Muffin"], urgent: false },
            ].map((ticket) => (
              <div key={ticket.id} className={`p-3 rounded-lg border ${
                ticket.urgent ? "bg-red-500/10 border-red-500/20" : "bg-white/[0.04] border-white/[0.06]"
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white">{ticket.id}</span>
                  <span className={`text-xs font-mono ${ticket.urgent ? "text-red-400" : "text-white/50"}`}>{ticket.time}</span>
                </div>
                <div className="space-y-1">
                  {ticket.items.map((item, idx) => (
                    <p key={idx} className="text-[11px] text-white/50 pl-2 border-l border-white/10">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "Payments":
      return (
        <div className="w-[85%] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f1923]/90 backdrop-blur-sm border border-white/10">
          <div className="px-5 py-3 flex items-center justify-between border-b border-white/10">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Payment</span>
            <span className="text-[10px] text-emerald-400">Secure</span>
          </div>
          <div className="p-5 text-center">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Total Due</p>
            <p className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-playfair, serif)" }}>$47.80</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { method: "Card", icon: "💳" },
                { method: "Mobile", icon: "📱" },
                { method: "Cash", icon: "💵" },
                { method: "Gift Card", icon: "🎁" },
              ].map((pm) => (
                <div key={pm.method} className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:border-cyan-500/30 transition-colors cursor-pointer">
                  <span className="text-lg block mb-1">{pm.icon}</span>
                  <span className="text-[10px] text-white/50">{pm.method}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-xs text-emerald-400 font-medium">Tip: $7.17 (15%)</span>
            </div>
          </div>
        </div>
      );

    case "Cloud":
      return (
        <div className="w-[85%] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f1923]/90 backdrop-blur-sm border border-white/10">
          <div className="px-5 py-3 flex items-center justify-between border-b border-white/10">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Cloud Dashboard</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Synced</span>
          </div>
          <div className="p-4 space-y-3">
            {[
              { loc: "Downtown Branch", status: "Online", orders: "142", rev: "$4,230" },
              { loc: "Airport Location", status: "Online", orders: "98", rev: "$3,180" },
              { loc: "Mall Kiosk", status: "Online", orders: "67", rev: "$1,890" },
            ].map((loc) => (
              <div key={loc.loc} className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-white">{loc.loc}</span>
                  <span className="text-[10px] text-emerald-400">{loc.status}</span>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-[9px] text-white/30 uppercase">Orders</p>
                    <p className="text-sm font-semibold text-white/70">{loc.orders}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-white/30 uppercase">Revenue</p>
                    <p className="text-sm font-semibold text-white/70">{loc.rev}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-white/10">
            <span className="text-[10px] text-white/30">Last sync: 2 seconds ago</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function ParallaxSlideShowcase({
  features,
  className = "",
}: ParallaxSlideShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const slides =
        containerRef.current.querySelectorAll<HTMLElement>(".showcase-slide");

      /* ── Slide entrance animations ── */
      slides.forEach((slide) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            start: "top 80%",
          },
        });

        tl.from(slide.querySelectorAll(".line__inner"), {
          y: 200,
          duration: 1.4,
          ease: "power4",
          stagger: 0.1,
        })
          .from(
            slide.querySelectorAll(".slide__txt"),
            { x: 100, y: 50, opacity: 0, duration: 1.4, ease: "power4" },
            0.2
          )
          .from(
            slide.querySelectorAll(".slide__link"),
            { x: -100, y: 100, opacity: 0, duration: 1.4, ease: "power4" },
            0.15
          )
          .from(
            slide.querySelectorAll(".slide__scroll-btn"),
            { y: 200, duration: 2, ease: "power4" },
            0.2
          )
          .to(
            slide.querySelectorAll(".slide__scroll-line"),
            {
              scaleY: 0.6,
              transformOrigin: "bottom left",
              duration: 2,
              ease: "elastic(1,0.5)",
            },
            0.8
          );
      });

      /* ── Parallax on right-column visuals ── */
      slides.forEach((slide) => {
        const imageWrap = slide.querySelector(".col__image-wrap");
        if (imageWrap) {
          gsap.fromTo(
            imageWrap,
            { y: "-30vh" },
            {
              y: "30vh",
              scrollTrigger: {
                trigger: slide,
                scrub: true,
                start: "top bottom",
              },
              ease: "none",
            }
          );
        }

        /* Mock post card: starts near top, travels down as you scroll */
        const postCard = slide.querySelector(".mock-post-wrap");
        if (postCard) {
          gsap.fromTo(
            postCard,
            { y: "0vh" },
            {
              y: "40vh",
              scrollTrigger: {
                trigger: slide,
                scrub: true,
                start: "top bottom",
                end: "bottom top",
              },
              ease: "none",
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {features.map((feature, i) => {
        const Icon = feature.icon;
        const [line1, line2] = splitTitle(feature.title);

        return (
          <section
            key={feature.id}
            id={`showcase-slide-${i}`}
            className={`showcase-slide h-screen overflow-hidden relative md:flex ${
              i % 2 !== 0 ? "bg-white/[0.02]" : ""
            }`}
          >
            {/* ───── Left: Content column ───── */}
            <div className="relative z-[1] h-screen w-full md:w-1/2 md:shrink-0">
              <div
                className="relative flex flex-col justify-end h-full overflow-hidden"
                style={{
                  backgroundColor: panelBgs[i],
                  padding:
                    "clamp(24px, 6vw, 96px) clamp(24px, 6vw, 96px) clamp(40px, 10vw, 160px)",
                }}
              >
                {/* Icon watermark */}
                <div className="absolute top-8 right-8 text-white/[0.06]">
                  <Icon size={100} />
                </div>

                {/* Feature label */}
                <div className="line overflow-hidden mb-4">
                  <span className="line__inner block text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {feature.num} — {feature.label}
                  </span>
                </div>

                {/* Title — two-line reveal */}
                <h2
                  className="mb-[2vw] text-[11vw] md:text-[5.5vw] leading-[0.95] tracking-tight text-white"
                  style={{ fontFamily: "var(--font-playfair, serif)" }}
                >
                  <span className="line block overflow-hidden">
                    <span className="line__inner block">{line1}</span>
                  </span>
                  {line2 && (
                    <span
                      className="line block overflow-hidden"
                      style={{ marginTop: "-0.5vw" }}
                    >
                      <span className="line__inner block">{line2}</span>
                    </span>
                  )}
                </h2>

                {/* Description + decorative circle-link */}
                <div className="flex flex-col-reverse md:flex-row md:justify-end md:items-start gap-6">
                  <div className="slide__link relative flex justify-end w-[75px] h-[53px] cursor-pointer group shrink-0">
                    <div className="w-[53px] h-[53px] rounded-full border border-white/30 group-hover:border-[var(--color-accent)] transition-colors duration-300" />
                    <div className="absolute top-[25px] left-0 w-[64px] h-[3px] bg-white/40 group-hover:bg-[var(--color-accent)] group-hover:translate-x-5 group-hover:scale-x-[0.3] origin-right transition-all duration-500" />
                  </div>
                  <p className="slide__txt md:max-w-[22vw] max-w-[80vw] text-sm text-white/50 leading-relaxed md:ml-8">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Scroll-to-next dark square */}
              {i < features.length - 1 && (
                <button
                  className="slide__scroll-btn absolute -right-[70px] bottom-[3.5vw] z-10 w-[140px] h-[140px] bg-[var(--color-bg-dark)] overflow-hidden hidden md:block cursor-pointer hover:bg-[var(--color-bg-dark-secondary)] transition-colors duration-500"
                  onClick={() => {
                    const target = document.getElementById(
                      `showcase-slide-${i + 1}`
                    );
                    if (target) {
                      gsap.to(window, {
                        duration: 2,
                        scrollTo: { y: target },
                        ease: "power2.inOut",
                      });
                    }
                  }}
                >
                  <div
                    className="slide__scroll-line absolute left-[26px] bottom-0 w-[1px] h-full"
                    style={{ backgroundColor: panelBgs[i] }}
                  />
                </button>
              )}
            </div>

            {/* ───── Right: Parallax visual column with mock post ───── */}
            <div className="absolute inset-0 z-0 md:relative md:w-1/2 md:shrink-0 overflow-hidden">
              {/* Parallax background — moves with scroll */}
              <div className="col__image-wrap absolute left-0 w-full h-[160vh]">
                <div
                  className="w-full h-full"
                  style={{ background: feature.gradient }}
                >
                  {/* Large number watermark */}
                  <span
                    className="absolute bottom-[25%] right-[8%] text-[20vw] md:text-[15vw] font-bold text-white/[0.05] leading-none select-none"
                    style={{ fontFamily: "var(--font-playfair, serif)" }}
                  >
                    {feature.num}
                  </span>
                </div>
              </div>

              {/* Mock post card — starts at top, scrolls down with page */}
              <div className="mock-post-wrap absolute inset-0 z-[1] flex items-start justify-center pt-[10vh]">
                <MockPostCard label={feature.label} gradient={feature.gradient} />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
