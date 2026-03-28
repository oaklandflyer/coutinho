"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Fire reveal immediately on mount — hero is always above the fold
  useEffect(() => {
    ref.current?.querySelectorAll(".reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 120 + i * 90);
    });
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-screen flex flex-col justify-end px-10 md:px-14 pb-20 pt-32"
    >
      <h1 className="reveal font-display text-[clamp(5.5rem,13vw,14rem)] leading-[0.88] tracking-[0.035em] text-ink">
        Andrew
        <br />
        Coutinho
      </h1>

      <p className="reveal d1 font-body font-light text-[0.9rem] text-ink/40 mt-7 tracking-[0.04em]">
        Strategist&ensp;·&ensp;Founder&ensp;·&ensp;Aerial Photographer
      </p>

      <p className="reveal d2 font-body font-light text-[0.78rem] text-ink/22 mt-2 max-w-xs leading-loose">
        Building at the intersection of creative media,
        <br />
        global community, and economic thinking.
      </p>

      <p className="reveal d3 font-mono text-[0.44rem] uppercase tracking-[0.3em] text-ink/15 mt-10 flex items-center gap-3">
        <span className="block w-5 h-px bg-ink/10" />
        Pittsburgh, PA · Open to Opportunities
      </p>
    </section>
  );
}
