"use client";
import { useRef, useEffect } from "react";

const jobs = [
  {
    yr: "Apr 2024 — Present",
    title: "Vice Curator → Curator-elect",
    org: "Global Shapers Community · World Economic Forum",
    note: "Led recruitment, events & strategy for Pittsburgh Hub. Represented Pittsburgh at WEF Annual Summit in Geneva. Orchestrating Northeast Retreat 'Bridges of Belonging,' May 2026.",
    tags: ["Leadership", "WEF"],
  },
  {
    yr: "Oct 2022 — Present",
    title: "Founder & Creative Director",
    org: "ASF Visuals LLC",
    note: "Certified drone media business — photography, video, web. Clients include D1 Pitt Athletics, CRE firms, and civic orgs. FAA Part 107 licensed.",
    tags: ["Founding", "Creative"],
  },
  {
    yr: "Aug 2024 — May 2025",
    title: "Global Experience Advisor",
    org: "University of Pittsburgh",
    note: "Guided students through study abroad processes. Improved engagement 30%. Streamlined advising workflows.",
    tags: ["Advising", "Ops"],
  },
  {
    yr: "Jul — Aug 2023",
    title: "Cyber Security Analyst",
    org: "Robin Home Care · London, UK",
    note: "Secured sensitive data per UK regulations. VPN and password management systems company-wide.",
    tags: ["Security"],
  },
  {
    yr: "Jan 2022 — Nov 2024",
    title: "Founder & President",
    org: "Bodybuilding Club at Pitt / NCBO",
    note: "0 → 100+ members, 200% social media growth. Co-founded NCBO connecting 10+ universities.",
    tags: ["Founding", "Growth"],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-full bg-[#1a1009] flex flex-col justify-center"
      style={{ padding: "10vh 52px" }}
    >
      <div className="w-full max-w-[900px]">
        <p className="reveal font-mono text-[0.5rem] tracking-[0.32em] uppercase text-terra mb-8 flex items-center gap-3">
          <span className="block w-5 h-px bg-terra" />
          Experience
        </p>

        <h2
          className="reveal d1 font-display font-light text-cream-100 leading-[0.92] tracking-[-0.02em] mb-14"
          style={{ fontSize: "clamp(2.8rem,5.5vw,6rem)" }}
        >
          Where I&apos;ve led<br />
          and <em className="italic text-terra">built</em>
        </h2>

        <div className="w-full">
          {jobs.map((j, i) => (
            <div
              key={i}
              data-cursor
              className="reveal group border-b border-cream-200/07 py-7
                         hover:bg-cream-200/[0.02] transition-colors duration-300 -mx-4 px-4"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-start gap-8">
                {/* Year */}
                <div className="font-mono text-[0.52rem] text-cream-200/22 tracking-[0.06em] leading-none pt-[5px] w-36 flex-shrink-0">
                  {j.yr}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-6 mb-2">
                    <div
                      className="font-display text-[1.5rem] font-light text-cream-100 leading-[1.15]
                                 group-hover:text-terra-light transition-colors duration-300"
                    >
                      {j.title}
                    </div>
                    <div className="flex gap-[5px] flex-shrink-0 pt-[3px]">
                      {j.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[0.44rem] tracking-[0.1em] uppercase
                                     px-2 py-[3px] border border-cream-200/10 text-cream-200/22"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="font-mono text-[0.56rem] text-terra tracking-[0.1em] uppercase mb-2">
                    {j.org}
                  </div>
                  <div className="font-body text-[0.74rem] text-cream-200/38 leading-[1.82]">
                    {j.note}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
