"use client";
import { useReveal } from "@/lib/useReveal";

const jobs = [
  {
    yr:    "Apr 2024 — Present",
    title: "Vice Curator → Curator-elect",
    org:   "Global Shapers Community · World Economic Forum",
    note:  "Led recruitment, events & strategy for Pittsburgh Hub. Represented Pittsburgh at WEF Annual Summit in Geneva. Orchestrating Northeast Retreat 'Bridges of Belonging,' May 2026.",
    tags:  ["Leadership", "WEF"],
  },
  {
    yr:    "Oct 2022 — Present",
    title: "Founder & Creative Director",
    org:   "ASF Visuals LLC",
    note:  "Certified drone media business — photography, video, web. Clients include D1 Pitt Athletics, CRE firms, and civic orgs. FAA Part 107 licensed.",
    tags:  ["Founding", "Creative"],
  },
  {
    yr:    "Aug 2024 — May 2025",
    title: "Global Experience Advisor",
    org:   "University of Pittsburgh",
    note:  "Guided students through study abroad processes. Improved engagement 30%. Streamlined advising workflows.",
    tags:  ["Advising", "Ops"],
  },
  {
    yr:    "Jul — Aug 2023",
    title: "Cyber Security Analyst",
    org:   "Robin Home Care · London, UK",
    note:  "Secured sensitive data per UK regulations. VPN and password management systems company-wide.",
    tags:  ["Security"],
  },
  {
    yr:    "Jan 2022 — Nov 2024",
    title: "Founder & President",
    org:   "Bodybuilding Club at Pitt / NCBO",
    note:  "0 → 100+ members, 200% social media growth. Co-founded NCBO connecting 10+ universities.",
    tags:  ["Founding", "Growth"],
  },
];

export default function Experience() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      id="experience"
      className="min-h-screen flex items-center px-10 md:px-14 py-28 bg-panel"
    >
      <div className="w-full max-w-5xl mx-auto">

        <p className="reveal font-mono text-[0.5rem] tracking-[0.32em] uppercase text-sky mb-8 flex items-center gap-2">
          <span className="block w-5 h-px bg-sky" /> Experience
        </p>

        <h2 className="reveal d1 font-display text-[clamp(2.4rem,4.5vw,5rem)] leading-none tracking-[0.04em] text-ink mb-12">
          Where I&apos;ve led and <span className="text-amber">built</span>
        </h2>

        <div>
          {jobs.map((j, i) => (
            <div
              key={i}
              className="reveal border-b border-ink/[0.07] py-6 grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr_auto] gap-x-5 gap-y-3 items-start
                         hover:bg-ink/[0.02] -mx-3 px-3 transition-colors duration-300"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {/* Year */}
              <span className="font-mono text-[0.48rem] text-ink/20 pt-1 leading-relaxed">
                {j.yr}
              </span>

              {/* Content */}
              <div>
                <div className="font-body font-normal text-[1.05rem] text-ink mb-1 leading-snug">
                  {j.title}
                </div>
                <div className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-sky mb-2">
                  {j.org}
                </div>
                <div className="font-body font-light text-[0.8rem] text-ink/40 leading-[1.8]">
                  {j.note}
                </div>
              </div>

              {/* Tags */}
              <div className="col-span-2 md:col-span-1 flex flex-wrap md:flex-col gap-1.5 md:items-end">
                {j.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.42rem] uppercase tracking-[0.1em] px-2 py-1 border border-ink/10 text-ink/22"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
