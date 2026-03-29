"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const DroneScene = dynamic(() => import("@/components/3d/DroneScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ref.current?.querySelectorAll(".reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 100 + i * 95);
    });
  }, []);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex overflow-hidden">
      {/* ── Desktop: 3D scene fills right half ── */}
      <div className="hidden md:block absolute right-0 top-0 w-[55%] h-full pointer-events-none">
        <DroneScene />
      </div>

      {/* ── Mobile: faint 3D as background texture ── */}
      <div className="md:hidden absolute inset-0 opacity-20 pointer-events-none">
        <DroneScene />
      </div>

      {/* ── Text ── */}
      <div className="relative z-10 flex flex-col justify-end w-full md:w-[52%] px-6 md:px-14 pb-20 pt-36">
        <p className="reveal font-mono text-[0.44rem] uppercase tracking-[0.32em] text-sky/65 mb-5 flex items-center gap-3">
          <span className="block w-5 h-px bg-sky/40" />
          Product Manager · Strategist · Creative Director
        </p>

        <h1 className="reveal d1 font-display text-[clamp(4.8rem,11vw,12rem)] leading-[0.87] tracking-[0.03em] text-ink">
          Andrew
          <br />
          Coutinho
        </h1>

        <p className="reveal d2 font-body font-light text-[0.88rem] text-ink/40 mt-7 leading-relaxed max-w-xs">
          Building at the intersection of creative media,
          <br />
          global community, and economic thinking.
        </p>

        <div className="reveal d3 flex flex-wrap gap-3 mt-9">
          <a
            href="#work"
            className="font-mono text-[0.48rem] tracking-[0.2em] uppercase px-5 py-3 bg-sky text-bg hover:bg-sky/80 transition-colors duration-200"
          >
            See Work ↓
          </a>
          <a
            href="#contact"
            className="font-mono text-[0.48rem] tracking-[0.2em] uppercase px-5 py-3 border border-ink/20 text-ink/50 hover:text-ink/80 hover:border-ink/40 transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>

        <p className="reveal d4 font-mono text-[0.44rem] uppercase tracking-[0.3em] text-ink/14 mt-10 flex items-center gap-3">
          <span className="block w-5 h-px bg-ink/10" />
          Pittsburgh, PA · Open to Opportunities
        </p>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-8 left-6 md:left-14 flex items-center gap-3 opacity-20 pointer-events-none">
        <span className="scroll-bounce block w-px h-8 bg-gradient-to-b from-ink/0 via-ink/50 to-ink/0" />
        <span className="font-mono text-[0.38rem] tracking-[0.3em] uppercase text-ink/50">Scroll</span>
      </div>
    </section>
  );
}
