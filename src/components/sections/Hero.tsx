"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 80 + i * 30);
    });
  }, []);

  return (
    <section
      className="section-snap bg-[#160f09] flex flex-col"
      data-section="0"
      style={{ padding: "6vh 52px 5vh" }}
    >
      <div ref={ref} className="flex flex-col h-full relative z-10">
        {/* Top row */}
        <div className="reveal flex items-center justify-between mb-auto pb-6">
          <p className="font-mono text-[0.52rem] tracking-[0.3em] uppercase text-cream-200/28 flex items-center gap-3">
            <span className="block w-7 h-px bg-cream-200/18" />
            Pittsburgh, PA
          </p>
          <p className="font-mono text-[0.52rem] tracking-[0.3em] uppercase text-terra/70 flex items-center gap-3">
            Open to Opportunities
            <span className="block w-7 h-px bg-terra/50" />
          </p>
        </div>

        {/* Main — giant name */}
        <div className="flex-1 flex flex-col justify-center">
          <h1
            className="font-display font-light leading-[0.82] tracking-[-0.03em] select-none"
            style={{ fontSize: "clamp(4.8rem,13.5vw,16rem)" }}
          >
            <span className="reveal d1 block text-cream-100 overflow-hidden">
              Andrew
            </span>
            <span className="reveal d2 block overflow-hidden" style={{ paddingBottom: "0.05em" }}>
              <span className="text-cream-100/20 italic">Coutinho</span>
              <span className="text-terra not-italic">.</span>
            </span>
          </h1>

          <p
            className="reveal d3 font-mono text-[0.56rem] tracking-[0.26em] uppercase text-cream-200/35 mt-8 flex items-center gap-4"
          >
            <span className="block w-5 h-px bg-cream-200/20" />
            Strategist&ensp;·&ensp;Founder&ensp;·&ensp;Aerial Photographer
          </p>
        </div>

        {/* Bottom row */}
        <div className="reveal d4 flex items-end justify-between pt-6">
          <p className="font-body font-light text-[0.8rem] leading-[2] text-cream-200/38 max-w-[280px]">
            Building at the intersection of creative media,
            <br />global community, and economic thinking.
          </p>

          <a
            href="mailto:coutinhodrew@gmail.com"
            data-cursor
            className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-terra flex items-center gap-3
                       transition-all duration-300 group hover:gap-5"
          >
            <span className="block h-px bg-terra w-8 transition-all duration-300 group-hover:w-14" />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
