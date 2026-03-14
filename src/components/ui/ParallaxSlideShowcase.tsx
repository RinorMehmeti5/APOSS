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
            start: "40% 50%",
          },
        });

        tl.from(slide.querySelectorAll(".line__inner"), {
          y: 200,
          duration: 2,
          ease: "power4",
          stagger: 0.1,
        })
          .from(
            slide.querySelectorAll(".slide__txt"),
            { x: 100, y: 50, opacity: 0, duration: 2, ease: "power4" },
            0.4
          )
          .from(
            slide.querySelectorAll(".slide__link"),
            { x: -100, y: 100, opacity: 0, duration: 2, ease: "power4" },
            0.3
          )
          .from(
            slide.querySelectorAll(".slide__scroll-btn"),
            { y: 200, duration: 3, ease: "power4" },
            0.4
          )
          .to(
            slide.querySelectorAll(".slide__scroll-line"),
            {
              scaleY: 0.6,
              transformOrigin: "bottom left",
              duration: 2.5,
              ease: "elastic(1,0.5)",
            },
            1.4
          );
      });

      /* ── Parallax on right-column visuals ── */
      slides.forEach((slide) => {
        const imageWrap = slide.querySelector(".col__image-wrap");
        if (!imageWrap) return;

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

            {/* ───── Right: Parallax visual column ───── */}
            <div className="absolute inset-0 z-0 md:relative md:w-1/2 md:shrink-0 overflow-hidden">
              <div className="col__image-wrap absolute left-0 w-full h-[160vh]">
                <div
                  className="w-full h-full"
                  style={{ background: feature.gradient }}
                >
                  {/* Decorative circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-white/20 rounded-full" />
                    <div className="absolute w-52 h-52 border border-white/10 rounded-full" />
                    <div className="absolute w-72 h-72 border border-white/[0.06] rounded-full" />
                    <div className="absolute w-96 h-96 border border-white/[0.03] rounded-full" />
                  </div>

                  {/* Feature icon centred */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/[0.12]">
                    <Icon size={120} />
                  </div>

                  {/* Large number watermark */}
                  <span
                    className="absolute bottom-[25%] right-[8%] text-[20vw] md:text-[15vw] font-bold text-white/[0.08] leading-none select-none"
                    style={{ fontFamily: "var(--font-playfair, serif)" }}
                  >
                    {feature.num}
                  </span>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
