"use client";
import { useReveal } from "@/lib/useReveal";

const stats = [
  { n: "10+",  l: "Universities\nNCBO"       },
  { n: "100+", l: "Club Members\nBuilt"      },
  { n: "11",   l: "Countries\n4 Continents"  },
  { n: "FAA",  l: "Part 107\nLicensed"       },
];

const education = [
  { inst: "University of Pittsburgh",  deg: "B.A. Economics & Africana Studies · May 2025"  },
  { inst: "Fulbright-Hays Scholar",    deg: "MS Training Centre · Arusha, Tanzania · 2023"  },
];

const skills: { label: string; color: "sky" | "amber"; items: string[] }[] = [
  {
    label: "Product Management",
    color: "sky",
    items: [
      "Roadmapping", "User Research", "Stakeholder Management",
      "Data Analysis", "Agile / Scrum", "A/B Testing",
      "Go-to-Market Strategy", "OKRs & KPIs",
    ],
  },
  {
    label: "Creative & Media",
    color: "amber",
    items: [
      "Drone Cinematography (Part 107)", "Commercial Photography",
      "Video Production", "Brand Identity", "Web Design", "SEO",
    ],
  },
  {
    label: "Technical",
    color: "sky",
    items: [
      "Next.js / React", "TypeScript", "Supabase", "Tailwind CSS",
      "Python", "SQL", "Git",
    ],
  },
  {
    label: "Leadership",
    color: "amber",
    items: [
      "Community Building", "WEF Global Shapers", "Team Management",
      "International Operations", "Public Speaking", "Fundraising",
    ],
  },
];

export default function About() {
  const ref = useReveal();

  return (
    <section ref={ref} id="about" className="px-6 md:px-14 py-28">
      <div className="w-full max-w-5xl mx-auto">

        {/* ── Bio + Education ── */}
        <div className="grid md:grid-cols-2 gap-14 lg:gap-24 mb-20">
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

          {/* Stats */}
          <div className="reveal d2 grid grid-cols-2 gap-3 content-start mt-16 md:mt-12">
            {stats.map((s) => (
              <div key={s.n} className="p-5 border border-ink/[0.07] bg-panel hover:border-ink/15 transition-colors duration-300">
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

        {/* ── Skills ── */}
        <div className="border-t border-ink/[0.07] pt-16">
          <p className="reveal font-mono text-[0.5rem] tracking-[0.32em] uppercase text-sky mb-8 flex items-center gap-2">
            <span className="block w-5 h-px bg-sky" /> Skills
          </p>
          <h3 className="reveal d1 font-display text-[clamp(2rem,3.5vw,3.5rem)] leading-none tracking-[0.04em] text-ink mb-12">
            Tools I bring to the <span className="text-amber">table</span>
          </h3>

          <div className="reveal d2 grid sm:grid-cols-2 gap-8">
            {skills.map((cat) => (
              <div key={cat.label}>
                <p
                  className={`font-mono text-[0.46rem] tracking-[0.2em] uppercase mb-3 flex items-center gap-2 ${
                    cat.color === "sky" ? "text-sky" : "text-amber"
                  }`}
                >
                  <span className={`block w-4 h-px ${cat.color === "sky" ? "bg-sky" : "bg-amber"}`} />
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className={`font-mono text-[0.44rem] tracking-[0.08em] uppercase px-2.5 py-1.5 border transition-colors duration-200 ${
                        cat.color === "sky"
                          ? "border-sky/15 text-ink/35 hover:border-sky/40 hover:text-ink/65"
                          : "border-amber/15 text-ink/35 hover:border-amber/40 hover:text-ink/65"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
