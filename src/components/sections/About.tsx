"use client";
import { useRef, useEffect } from "react";

const stats = [
  { n: "10+", l: "Universities in the NCBO network" },
  { n: "100+", l: "Club members built from zero" },
  { n: "200%", l: "Social media growth achieved" },
  { n: "11", l: "Countries across 4 continents" },
];

const chips = [
  "Product Strategy", "Marketing Ops", "FAA Part 107",
  "Web Dev", "WEF Global Shapers", "Creative Direction", "Data Analysis",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.35)
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        });
      },
      { threshold: 0.35 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-section="1"
      className="section-snap bg-[#1b1109] grid"
      style={{ gridTemplateColumns: "1fr 1px 1fr" }}
    >
      {/* Left — bio */}
      <div className="flex flex-col justify-center px-12 py-20">
        <p className="reveal font-mono text-[0.5rem] tracking-[0.3em] uppercase text-terra mb-7 flex items-center gap-2">
          <span className="block w-5 h-px bg-terra" />About
        </p>

        <h2
          className="reveal d1 font-display font-light leading-[1.0] tracking-[-0.015em] mb-8 text-cream-100"
          style={{ fontSize: "clamp(2.6rem,4.2vw,5rem)" }}
        >
          Multi-disciplinary<br />thinker with a<br />
          <em className="italic text-terra">global lens</em>
        </h2>

        <p className="reveal d2 font-body font-light text-[0.84rem] leading-[1.95] mb-3 text-cream-200/48">
          Pitt-educated in{" "}
          <strong className="font-medium text-cream-200/75">Economics & Africana Studies</strong>.
          I bring analytical rigor to creative and operational work — strategy, drones, code,
          and community, often in the same week.
        </p>
        <p className="reveal d2 font-body font-light text-[0.84rem] leading-[1.95] text-cream-200/48">
          <strong className="font-medium text-cream-200/75">Curator-elect</strong> of Global Shapers
          Pittsburgh (WEF). Founder of{" "}
          <strong className="font-medium text-cream-200/75">ASF Visuals LLC</strong>.
          Co-founder of NCBO.{" "}
          <strong className="font-medium text-cream-200/75">Fulbright-Hays Scholar</strong>, Tanzania 2023.
        </p>

        <div className="reveal d3 flex flex-wrap gap-[6px] mt-7">
          {chips.map((c) => (
            <span
              key={c}
              data-cursor
              className="px-3 py-[5px] border border-cream-200/10 font-mono text-[0.48rem] tracking-[0.12em] uppercase
                         text-cream-200/28 hover:border-terra/60 hover:text-terra hover:bg-terra/5 transition-all duration-200"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-16 bg-cream-200/07" />

      {/* Right — numbers + education */}
      <div className="flex flex-col justify-center px-12 py-20">
        <p className="reveal font-mono text-[0.5rem] tracking-[0.3em] uppercase text-terra mb-7 flex items-center gap-2">
          <span className="block w-5 h-px bg-terra" />By the numbers
        </p>

        <div className="mb-9">
          {stats.map((s, i) => (
            <div
              key={i}
              className="reveal flex justify-between items-baseline py-[18px] border-b border-cream-200/07 first:border-t first:border-cream-200/07"
              style={{ transitionDelay: `${0.08 + i * 0.08}s` }}
            >
              <span className="font-display font-light text-[3rem] leading-none text-cream-100">{s.n}</span>
              <span className="font-body text-[0.68rem] text-right max-w-[160px] leading-[1.55] text-cream-200/30">{s.l}</span>
            </div>
          ))}
        </div>

        <p className="reveal d3 font-mono text-[0.5rem] tracking-[0.3em] uppercase text-terra mb-5 flex items-center gap-2">
          <span className="block w-5 h-px bg-terra" />Education
        </p>

        {[
          { inst: "University of Pittsburgh", deg: "B.A. Economics & Africana Studies · May 2025" },
          { inst: "Fulbright-Hays Scholar", deg: "MS Training Centre · Arusha, Tanzania · 2023" },
        ].map((e, i) => (
          <div
            key={i}
            className="reveal d4 relative px-5 py-4 border border-cream-200/07 bg-cream-200/[0.02] mb-2 overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-terra" />
            <div className="font-display text-[1.05rem] font-normal mb-[3px] text-cream-100">{e.inst}</div>
            <div className="font-body text-[0.7rem] leading-[1.6] text-cream-200/30">{e.deg}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
