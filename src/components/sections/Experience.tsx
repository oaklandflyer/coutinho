"use client";
import { useRef, useEffect } from "react";

const jobs = [
  {
    yr: "Apr 2024 — Present",
    title: "Vice Curator → Curator-elect",
    org: "Global Shapers Community · World Economic Forum",
    note: "Led recruitment, events & strategy for Pittsburgh Hub. Represented Pittsburgh at WEF Annual Summit in Geneva. Orchestrating Northeast Retreat 'Bridges of Belonging,' May 2026.",
    tags: ["Leadership", "WEF", "Strategy"],
  },
  {
    yr: "Oct 2022 — Present",
    title: "Founder & Creative Director",
    org: "ASF Visuals LLC",
    note: "Certified drone media business — photography, video, web development. Clients include D1 Pitt Athletics, CRE firms, civic orgs. FAA Part 107 licensed.",
    tags: ["Founding", "Creative", "Web Dev"],
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
    tags: ["Security", "London"],
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
          if (e.intersectionRatio >= 0.25)
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        });
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-section="2"
      className="section-snap bg-[#160f09] flex flex-col justify-center"
      style={{ padding: "6vh 52px 5vh" }}
    >
      {/* Header */}
      <div className="mb-7">
        <p className="reveal font-mono text-[0.5rem] tracking-[0.3em] uppercase text-terra mb-4 flex items-center gap-2">
          <span className="block w-5 h-px bg-terra" />Experience
        </p>
        <h2
          className="reveal d1 font-display font-light text-cream-100 leading-[0.94] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.8rem,5.5vw,6.5rem)" }}
        >
          Where I&apos;ve led<br />
          and <em className="italic text-terra">built</em>
        </h2>
      </div>

      {/* Jobs table */}
      <div className="reveal d2 w-full">
        {jobs.map((j, i) => (
          <div
            key={i}
            data-cursor
            className="group grid py-5 border-b border-cream-200/07 relative
                       hover:bg-cream-200/[0.025] transition-colors duration-200"
            style={{ gridTemplateColumns: "168px 1fr 148px" }}
          >
            {/* Date */}
            <div className="font-mono text-[0.54rem] text-cream-200/24 leading-[1.8] tracking-[0.04em] pt-[2px]">
              {j.yr}
            </div>

            {/* Role */}
            <div className="pr-6">
              <div
                className="font-display text-[1.45rem] font-light text-cream-100 leading-[1.15] mb-[3px]
                           group-hover:text-terra-light transition-colors duration-200"
              >
                {j.title}
              </div>
              <div className="font-body text-[0.6rem] text-terra tracking-[0.1em] uppercase font-medium mb-2">
                {j.org}
              </div>
              <div className="font-body text-[0.72rem] text-cream-200/38 leading-[1.78]">
                {j.note}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col items-end gap-[5px] pt-[2px]">
              {j.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.46rem] tracking-[0.1em] uppercase
                             px-[7px] py-[3px] border border-cream-200/10 text-cream-200/25"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
