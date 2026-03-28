"use client";
import { useRef, useEffect } from "react";

const stats = [
  { n: "10+", l: "Universities, NCBO" },
  { n: "100+", l: "Club members built" },
  { n: "11", l: "Countries, 4 continents" },
  { n: "FAA", l: "Part 107 Licensed" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-full bg-[#160f09] flex flex-col justify-center"
      style={{ padding: "10vh 52px" }}
    >
      <div className="max-w-[680px]">
        <p className="reveal font-mono text-[0.5rem] tracking-[0.32em] uppercase text-terra mb-8 flex items-center gap-3">
          <span className="block w-5 h-px bg-terra" />
          About
        </p>

        <h2
          className="reveal d1 font-display font-light text-cream-100 leading-[1.0] tracking-[-0.02em] mb-10"
          style={{ fontSize: "clamp(2.8rem,5vw,5.5rem)" }}
        >
          Multi-disciplinary<br />thinker with a{" "}
          <em className="italic text-terra">global lens</em>
        </h2>

        <p className="reveal d2 font-body font-light text-[0.9rem] leading-[2] text-cream-200/52 mb-5">
          Pitt-educated in{" "}
          <strong className="font-medium text-cream-200/80">Economics & Africana Studies</strong>,
          I bring analytical rigor to creative and operational work — strategy, drones, code, and
          community, often in the same week.
        </p>

        <p className="reveal d2 font-body font-light text-[0.9rem] leading-[2] text-cream-200/52 mb-12">
          <strong className="font-medium text-cream-200/80">Curator-elect</strong> of Global Shapers
          Pittsburgh (WEF) · Founder of{" "}
          <strong className="font-medium text-cream-200/80">ASF Visuals LLC</strong> ·
          Co-founder of NCBO · <strong className="font-medium text-cream-200/80">Fulbright-Hays Scholar</strong>,
          Tanzania 2023
        </p>

        {/* Stats row */}
        <div className="reveal d3 grid grid-cols-4 gap-0 border-t border-cream-200/08">
          {stats.map((s, i) => (
            <div key={i} className="pt-6 pr-6">
              <div className="font-display font-light text-[2.4rem] text-cream-100 leading-none mb-1">
                {s.n}
              </div>
              <div className="font-mono text-[0.48rem] tracking-[0.14em] uppercase text-cream-200/28 leading-[1.6]">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="reveal d4 mt-12 flex flex-col gap-3">
          <p className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-terra flex items-center gap-3">
            <span className="block w-5 h-px bg-terra" />
            Education
          </p>
          {[
            { inst: "University of Pittsburgh", deg: "B.A. Economics & Africana Studies · May 2025" },
            { inst: "Fulbright-Hays Scholar", deg: "MS Training Centre · Arusha, Tanzania · 2023" },
          ].map((e, i) => (
            <div key={i} className="relative pl-5 py-1 border-l border-cream-200/10 hover:border-terra/40 transition-colors duration-300">
              <div className="font-display text-[1rem] font-light text-cream-100">{e.inst}</div>
              <div className="font-body text-[0.72rem] text-cream-200/32 mt-[2px]">{e.deg}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
