"use client";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const jobs = [
  {
    yr: "Apr 2024 — Present",
    title: "Vice Curator → Curator-elect",
    org: "Global Shapers Community · World Economic Forum",
    note: "Led recruitment, events & strategy for Pittsburgh Hub. Represented Pittsburgh at WEF Annual Summit in Geneva. Orchestrating Northeast Retreat \u2018Bridges of Belonging,\u2019 May 2026. Becoming Curator July 2026.",
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
          if (e.intersectionRatio >= 0.3)
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-section="2"
      className="section-snap bg-brown-800 flex flex-col justify-center"
      style={{ padding: "80px 48px 60px" }}
    >
      <p className="reveal font-mono text-[0.55rem] tracking-[0.26em] uppercase mb-4 text-terra-light flex items-center gap-2">
        <span className="block w-4 h-px bg-terra-light" />Experience
      </p>
      <h2 className="reveal d1 font-display font-light text-cream-100 leading-[1.04] tracking-[-0.01em] mb-8"
        style={{ fontSize: "clamp(2.4rem,4vw,4.4rem)" }}>
        Where I&apos;ve led<br />and <em className="italic text-terra-light">built</em>
      </h2>

      <div className="reveal d2 w-full">
        {jobs.map((j, i) => (
          <div
            key={i}
            data-cursor
            className="group grid gap-7 py-6 border-b border-cream-200/07 relative
                       hover:bg-cream-200/02 transition-colors duration-200"
            style={{ gridTemplateColumns: "164px 1fr 170px" }}
          >
            <div className="font-mono text-[0.58rem] text-cream-200/28 leading-[1.7] tracking-[0.04em] pt-[3px]">
              {j.yr}
            </div>
            <div>
              <div className="font-display text-[1.4rem] font-light text-cream-100 leading-[1.2] mb-1
                              group-hover:text-terra-light transition-colors duration-200">
                {j.title}
              </div>
              <div className="font-body text-[0.64rem] text-terra-light tracking-[0.1em] uppercase font-medium mb-2">
                {j.org}
              </div>
              <div className="font-body text-[0.73rem] text-cream-200/42 leading-[1.72]">
                {j.note}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 pt-[3px]">
              {j.tags.map((t) => (
                <span key={t} className="font-mono text-[0.49rem] tracking-[0.1em] uppercase
                                         px-2 py-[3px] border border-cream-200/10 text-cream-200/28">
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
