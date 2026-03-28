"use client";
import { useEffect, useRef } from "react";

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const ref = useRef<HTMLElement>(null);

  // Trigger reveals immediately on mount
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 120 + i * 60);
    });
  }, []);

  return (
    <section
      ref={ref}
      className="section-full flex flex-col justify-between"
      style={{ padding: "calc(7vh + 60px) 52px 7vh" }}
    >
      {/* Top row — location + availability */}
      <div className="reveal flex items-center justify-between w-full relative z-10">
        <span className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-cream-200/28 flex items-center gap-3">
          <span className="block w-8 h-px bg-cream-200/18" />
          Pittsburgh, PA
        </span>
        <span className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-terra/60 flex items-center gap-3">
          Open to Opportunities
          <span className="block w-8 h-px bg-terra/40" />
        </span>
      </div>

      {/* Center — name block */}
      <div className="relative z-10 flex-1 flex flex-col justify-center py-8">
        <h1
          className="font-display font-light tracking-[-0.03em] leading-[0.82] select-none"
          style={{ fontSize: "clamp(5rem,15vw,18rem)" }}
        >
          <span className="reveal d1 block text-cream-100">Andrew</span>
          <span className="reveal d2 block" style={{ paddingBottom: "0.06em" }}>
            <em className="not-italic text-cream-100/18">Coutinho</em>
            <span className="text-terra">.</span>
          </span>
        </h1>

        <p className="reveal d3 font-mono text-[0.54rem] tracking-[0.28em] uppercase text-cream-200/32 mt-7 flex items-center gap-4">
          <span className="block w-6 h-px bg-cream-200/20" />
          Strategist&ensp;·&ensp;Founder&ensp;·&ensp;Aerial Photographer
        </p>
      </div>

      {/* Bottom row — brief + CTA */}
      <div className="reveal d4 relative z-10 flex items-end justify-between">
        <p className="font-body font-light text-[0.78rem] leading-[2] text-cream-200/35 max-w-[260px]">
          Building at the intersection of creative media,<br />
          global community, and economic thinking.
        </p>

        <div className="flex flex-col items-end gap-4">
          {/* Animated scroll hint */}
          <button
            onClick={() => onScrollTo("about")}
            data-cursor
            className="flex flex-col items-center gap-2 group"
            aria-label="Scroll down"
          >
            <span className="font-mono text-[0.44rem] tracking-[0.32em] uppercase text-cream-200/22
                             group-hover:text-cream-200/45 transition-colors duration-300">
              scroll
            </span>
            <span className="block w-px h-10 bg-cream-200/15 relative overflow-hidden">
              <span className="scroll-line absolute inset-0 bg-terra/60" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
