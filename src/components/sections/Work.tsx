"use client";
import { useReveal } from "@/lib/useReveal";

const projects = [
  {
    n: "00", featured: true,
    category: "Creative Agency · Founded 2022",
    title:    "ASF Visuals LLC",
    body:     "Photo · Video · Drone · Web · SEO. Certified drone media business serving D1 Athletics, CRE firms, and civic organizations. FAA Part 107 licensed.",
    href:     "https://asfvisualsllc.com",
  },
  {
    n: "01", featured: false,
    category: "Sports Photography & Drone",
    title:    "University of Pittsburgh D1 Athletics",
    body:     "On-field photography and drone videography for Pitt Men's & Women's Soccer.",
    href:     "https://youtube.com/@ASFVisualsLLC",
  },
  {
    n: "02", featured: false,
    category: "Web + Photography",
    title:    "Pittsburgh Prestige Remodeling",
    body:     "Full site with Supabase gallery CMS. Photography across four project categories.",
    href:     "https://prestigepgh.com",
  },
  {
    n: "03", featured: false,
    category: "Web Design",
    title:    "Aqua Design Collective",
    body:     "Dark design system, Supabase CMS, client admin portal.",
    href:     "https://aquadesigncollective.com",
  },
  {
    n: "04", featured: false,
    category: "Commercial Real Estate",
    title:    "S&G Asset Group LLC",
    body:     "CRE photography across two properties — listing assets and drone aerials.",
    href:     null,
  },
  {
    n: "05", featured: false,
    category: "Event Photography",
    title:    "Allegheny Sport & Outdoor",
    body:     "Two-day coverage of Pittsburgh's premier outdoor & sport industry summit.",
    href:     null,
  },
  {
    n: "06", featured: false,
    category: "Civic Event Photography",
    title:    "Global Shapers Pittsburgh Hub",
    body:     "WEF Hub events, community initiatives, and leadership programming.",
    href:     null,
  },
];

export default function Work() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      id="work"
      className="min-h-screen flex items-center px-10 md:px-14 py-28"
    >
      <div className="w-full max-w-5xl mx-auto">

        <p className="reveal font-mono text-[0.5rem] tracking-[0.32em] uppercase text-sky mb-8 flex items-center gap-2">
          <span className="block w-5 h-px bg-sky" /> Selected Work
        </p>

        <h2 className="reveal d1 font-display text-[clamp(2.4rem,4.5vw,5rem)] leading-none tracking-[0.04em] text-ink mb-12">
          Projects &amp; <span className="text-amber">collaborations</span>
        </h2>

        <div className="border-t border-ink/[0.07]">
          {projects.map((p, i) => {
            const inner = (
              <div
                className="flex items-start gap-6 py-7 -mx-3 px-3 hover:bg-ink/[0.02] transition-colors duration-300 group"
              >
                <span className="font-mono text-[0.48rem] text-ink/18 w-7 shrink-0 pt-1">{p.n}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[0.48rem] uppercase tracking-[0.14em] text-amber/70 mb-1">{p.category}</p>
                  <div className={`font-body font-normal text-ink group-hover:text-sky transition-colors duration-300 leading-snug mb-2 ${p.featured ? "text-[1.45rem]" : "text-[1.1rem]"}`}>
                    {p.title}
                  </div>
                  <p className="font-body font-light text-[0.78rem] text-ink/38 leading-[1.8] max-w-xl">{p.body}</p>
                </div>
                {p.href && (
                  <span className="font-mono text-[0.7rem] text-sky/35 group-hover:text-sky/70 transition-colors duration-300 shrink-0 mt-1">↗</span>
                )}
              </div>
            );

            return (
              <div key={p.n} className="reveal border-b border-ink/[0.07]" style={{ transitionDelay: `${i * 0.04}s` }}>
                {p.href
                  ? <a href={p.href} target="_blank" rel="noreferrer">{inner}</a>
                  : inner
                }
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
