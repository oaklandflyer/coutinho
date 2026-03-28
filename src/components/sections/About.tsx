"use client";
import { useRef, useEffect } from "react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

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
  const { isDark } = useStore();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.4) {
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const text = isDark ? "text-cream-100" : "text-brown-800";
  const sub  = isDark ? "text-cream-200/55" : "text-brown-800/65";
  const dim  = isDark ? "text-cream-200/35" : "text-brown-800/38";
  const border = isDark ? "border-cream-200/08" : "border-brown-800/10";
  const bg2 = isDark ? "bg-cream-200/03" : "bg-brown-800/02";

  return (
    <section
      ref={ref}
      data-section="1"
      className={cn("section-snap grid", isDark ? "bg-brown-900" : "bg-cream-200")}
      style={{ gridTemplateColumns: "1fr 1px 1fr" }}
    >
      {/* Left */}
      <div className="flex flex-col justify-center px-12 py-20">
        <p className={cn("reveal font-mono text-[0.55rem] tracking-[0.26em] uppercase mb-6 flex items-center gap-2", "text-terra")}>
          <span className="block w-4 h-px bg-terra" />About
        </p>

        <h2 className={cn("reveal d1 font-display font-light leading-[1.04] tracking-[-0.01em] mb-7", text,
          "text-[clamp(2.6rem,4.2vw,4.8rem)]")}>
          Multi-disciplinary<br />thinker with a<br /><em className="italic text-terra">global lens</em>
        </h2>

        <p className={cn("reveal d2 font-body font-light text-[0.88rem] leading-[1.88] mb-3", sub)}>
          Pitt-educated in <strong className={cn("font-medium", text)}>Economics & Africana Studies</strong>.
          I bring analytical rigor to creative and operational work — strategy, drones, code, and
          community, often in the same week.
        </p>
        <p className={cn("reveal d2 font-body font-light text-[0.88rem] leading-[1.88]", sub)}>
          <strong className={cn("font-medium", text)}>Curator-elect</strong> of Global Shapers
          Pittsburgh (WEF). Founder of <strong className={cn("font-medium", text)}>ASF Visuals LLC</strong>.
          Co-founder of NCBO — competitive bodybuilding across 10+ universities.{" "}
          <strong className={cn("font-medium", text)}>Fulbright-Hays Scholar</strong>, Tanzania 2023.
        </p>

        <div className="reveal d3 flex flex-wrap gap-2 mt-6">
          {chips.map((c) => (
            <span key={c} className={cn(
              "px-3 py-[5px] border font-mono text-[0.51rem] tracking-[0.1em] uppercase transition-all duration-250",
              border, dim,
              "hover:border-terra hover:text-terra hover:bg-terra/5"
            )} data-cursor>{c}</span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className={cn("my-24", isDark ? "bg-cream-200/08" : "bg-brown-800/10")} />

      {/* Right */}
      <div className="flex flex-col justify-center px-12 py-20">
        <p className={cn("reveal font-mono text-[0.55rem] tracking-[0.26em] uppercase mb-6 flex items-center gap-2", "text-terra")}>
          <span className="block w-4 h-px bg-terra" />By the numbers
        </p>

        <div className="mb-8">
          {stats.map((s, i) => (
            <div key={i} className={cn("reveal flex justify-between items-baseline py-5 border-b", border,
              i === 0 && cn("border-t", border))} style={{ "--td": `${i * 0.1}s` } as React.CSSProperties}>
              <span className={cn("font-display font-light text-[3rem] leading-none", text)}>{s.n}</span>
              <span className={cn("font-body text-[0.72rem] text-right max-w-[155px] leading-[1.5]", dim)}>{s.l}</span>
            </div>
          ))}
        </div>

        <p className={cn("reveal d3 font-mono text-[0.55rem] tracking-[0.26em] uppercase mb-4 flex items-center gap-2", "text-terra")}>
          <span className="block w-4 h-px bg-terra" />Education
        </p>
        {[
          { inst: "University of Pittsburgh", deg: "B.A. Economics & Africana Studies · May 2025" },
          { inst: "Fulbright-Hays Scholar", deg: "MS Training Centre · Arusha, Tanzania · 2023" },
        ].map((e, i) => (
          <div key={i} className={cn(
            "reveal d4 relative px-5 py-4 border mb-2 overflow-hidden",
            bg2, border
          )}>
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-terra" />
            <div className={cn("font-display text-[1.05rem] font-normal mb-1", text)}>{e.inst}</div>
            <div className={cn("font-body text-[0.73rem] leading-[1.55]", dim)}>{e.deg}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
