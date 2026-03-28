"use client";
import { useReveal } from "@/lib/useReveal";

const stats = [
  { n: "10+",  l: "Universities\nNCBO"          },
  { n: "100+", l: "Club Members\nBuilt"         },
  { n: "11",   l: "Countries\n4 Continents"     },
  { n: "FAA",  l: "Part 107\nLicensed"          },
];

const education = [
  { inst: "University of Pittsburgh",  deg: "B.A. Economics & Africana Studies · May 2025"     },
  { inst: "Fulbright-Hays Scholar",    deg: "MS Training Centre · Arusha, Tanzania · 2023"     },
];

export default function About() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen flex items-center px-10 md:px-14 py-28"
    >
      <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-14 lg:gap-24">

        {/* Bio + education */}
        <div>
          <p className="reveal font-mono text-[0.5rem] tracking-[0.32em] uppercase text-sky mb-8 flex items-center gap-2">
            <span className="block w-5 h-px bg-sky" /> About
          </p>

          <h2 className="reveal d1 font-display text-[clamp(2.4rem,4vw,4rem)] leading-tight tracking-[0.04em] text-ink mb-8">
            Multi-disciplinary thinker with a{" "}
            <span className="text-amber">global lens</span>
          </h2>

          <p className="reveal d2 font-body font-light text-[0.88rem] text-ink/50 leading-[1.85] mb-4">
            Pitt-educated in{" "}
            <strong className="font-medium text-ink/80">Economics & Africana Studies</strong>,
            I bring analytical rigor to creative and operational work — strategy, drones,
            code, and community.
          </p>

          <p className="reveal d2 font-body font-light text-[0.88rem] text-ink/50 leading-[1.85] mb-10">
            <strong className="font-medium text-ink/80">Curator-elect</strong> of Global Shapers
            Pittsburgh (WEF) · Founder of{" "}
            <strong className="font-medium text-ink/80">ASF Visuals LLC</strong> · Co-founder of
            NCBO · <strong className="font-medium text-ink/80">Fulbright-Hays Scholar</strong>,
            Tanzania 2023
          </p>

          {/* Education */}
          <p className="reveal d3 font-mono text-[0.5rem] tracking-[0.32em] uppercase text-sky mb-4 flex items-center gap-2">
            <span className="block w-5 h-px bg-sky" /> Education
          </p>
          <div className="reveal d3 flex flex-col gap-3">
            {education.map((e) => (
              <div
                key={e.inst}
                className="pl-4 py-2 border-l-2 border-sky/20 hover:border-sky transition-colors duration-300"
              >
                <div className="font-body font-normal text-[0.95rem] text-ink">{e.inst}</div>
                <div className="font-body font-light text-[0.72rem] text-ink/30 mt-0.5">{e.deg}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="reveal d2 grid grid-cols-2 gap-3 content-start mt-16 md:mt-0">
          {stats.map((s) => (
            <div key={s.n} className="p-5 border border-ink/[0.07] bg-panel">
              <div className="font-display text-[clamp(2.5rem,4vw,4rem)] tracking-[0.04em] text-amber leading-none mb-2">
                {s.n}
              </div>
              <div className="font-mono text-[0.48rem] tracking-[0.2em] uppercase text-ink/25 whitespace-pre-line leading-relaxed">
                {s.l}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
