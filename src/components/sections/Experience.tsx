"use client";
import { useRef, useEffect } from "react";

const jobs = [
  {
    yr: "Apr 2024",
    title: "Vice Curator → Curator-elect",
    org: "Global Shapers Community · World Economic Forum",
    note: "Led recruitment, events & strategy for Pittsburgh Hub. Represented Pittsburgh at WEF Annual Summit in Geneva. Orchestrating Northeast Retreat 'Bridges of Belonging,' May 2026.",
    tags: ["Leadership", "WEF"],
  },
  {
    yr: "Oct 2022",
    title: "Founder & Creative Director",
    org: "ASF Visuals LLC",
    note: "Certified drone media business — photography, video, web. Clients include D1 Pitt Athletics, CRE firms, and civic orgs. FAA Part 107 licensed.",
    tags: ["Founding", "Creative"],
  },
  {
    yr: "Aug 2024",
    title: "Global Experience Advisor",
    org: "University of Pittsburgh",
    note: "Guided students through study abroad processes. Improved engagement 30%. Streamlined advising workflows.",
    tags: ["Advising", "Ops"],
  },
  {
    yr: "Jul 2023",
    title: "Cyber Security Analyst",
    org: "Robin Home Care · London, UK",
    note: "Secured sensitive data per UK regulations. VPN and password management systems company-wide.",
    tags: ["Security"],
  },
  {
    yr: "Jan 2022",
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
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        }),
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-full flex items-center"
      style={{ background: "var(--bg-panel)", padding: "0 52px" }}
    >
      <div className="w-full" style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Label */}
        <p
          className="reveal"
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ display: "block", width: 20, height: 1, background: "var(--accent)" }} />
          Experience
        </p>

        {/* Heading */}
        <h2
          className="reveal d1"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(2.4rem, 4.5vw, 5rem)",
            letterSpacing: "0.04em",
            lineHeight: 0.92,
            color: "var(--text)",
            marginBottom: 36,
          }}
        >
          Where I&apos;ve led<br />
          and <span style={{ color: "var(--accent2)" }}>built</span>
        </h2>

        {/* Job rows */}
        <div className="w-full">
          {jobs.map((j, i) => (
            <JobRow key={i} job={j} delay={i * 0.06} />
          ))}
        </div>

      </div>
    </section>
  );
}

interface Job {
  yr: string;
  title: string;
  org: string;
  note: string;
  tags: string[];
}

function JobRow({ job: j, delay }: { job: Job; delay: number }) {
  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.background = "rgba(232,228,221,0.024)";
    const title = (e.currentTarget as HTMLDivElement).querySelector(".job-title") as HTMLElement | null;
    if (title) title.style.color = "var(--accent)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.background = "transparent";
    const title = (e.currentTarget as HTMLDivElement).querySelector(".job-title") as HTMLElement | null;
    if (title) title.style.color = "var(--text)";
  };

  return (
    <div
      className="reveal"
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "20px 14px",
        margin: "0 -14px",
        transition: "background 0.3s ease",
        transitionDelay: `${delay}s`,
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Grid: year | content | tags */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "110px 1fr auto",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {/* Year */}
        <div
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.06em",
            color: "var(--text-faint)",
            paddingTop: 4,
            lineHeight: 1.5,
          }}
        >
          {j.yr}
        </div>

        {/* Content */}
        <div>
          <div
            className="job-title"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 400,
              fontSize: "1.1rem",
              lineHeight: 1.3,
              color: "var(--text)",
              marginBottom: 5,
              transition: "color 0.3s ease",
            }}
          >
            {j.title}
          </div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.5rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 7,
            }}
          >
            {j.org}
          </div>
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: "0.8rem",
              lineHeight: 1.85,
              color: "var(--text-dim)",
              opacity: 0.75,
            }}
          >
            {j.note}
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            flexShrink: 0,
            paddingTop: 2,
          }}
        >
          {j.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.44rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "3px 8px",
                border: "1px solid var(--border)",
                color: "var(--text-faint)",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
