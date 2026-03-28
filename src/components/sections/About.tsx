"use client";
import { useRef, useEffect } from "react";

const stats = [
  { n: "10+", l: "Universities\nNCBO" },
  { n: "100+", l: "Club Members\nBuilt" },
  { n: "11", l: "Countries\n4 Continents" },
  { n: "FAA", l: "Part 107\nLicensed" },
];

const education = [
  { inst: "University of Pittsburgh", deg: "B.A. Economics & Africana Studies · May 2025" },
  { inst: "Fulbright-Hays Scholar", deg: "MS Training Centre · Arusha, Tanzania · 2023" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        }),
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-full flex items-center"
      style={{ background: "var(--bg)", padding: "0 52px" }}
    >
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20"
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >

        {/* ── Left: bio + education ───────────────────── */}
        <div>
          {/* Label */}
          <p
            className="reveal"
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.5rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ display: "block", width: 20, height: 1, background: "var(--accent)" }} />
            About
          </p>

          {/* Heading */}
          <h2
            className="reveal d1"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(2.4rem, 4vw, 4.2rem)",
              letterSpacing: "0.04em",
              lineHeight: 1.0,
              color: "var(--text)",
              marginBottom: 28,
            }}
          >
            Multi-disciplinary<br />
            thinker with a{" "}
            <span style={{ color: "var(--accent2)" }}>global lens</span>
          </h2>

          {/* Bio */}
          <p
            className="reveal d2"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: "0.88rem",
              lineHeight: 1.85,
              color: "var(--text-dim)",
              marginBottom: 16,
            }}
          >
            Pitt-educated in{" "}
            <strong style={{ fontWeight: 400, color: "var(--text)" }}>Economics &amp; Africana Studies</strong>,
            I bring analytical rigor to creative and operational work — strategy, drones, code,
            and community, often in the same week.
          </p>

          <p
            className="reveal d2"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: "0.88rem",
              lineHeight: 1.85,
              color: "var(--text-dim)",
              marginBottom: 36,
            }}
          >
            <strong style={{ fontWeight: 400, color: "var(--text)" }}>Curator-elect</strong> of
            Global Shapers Pittsburgh (WEF) · Founder of{" "}
            <strong style={{ fontWeight: 400, color: "var(--text)" }}>ASF Visuals LLC</strong> ·
            Co-founder of NCBO ·{" "}
            <strong style={{ fontWeight: 400, color: "var(--text)" }}>Fulbright-Hays Scholar</strong>,
            Tanzania 2023
          </p>

          {/* Education */}
          <div className="reveal d3">
            <p
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ display: "block", width: 20, height: 1, background: "var(--accent)" }} />
              Education
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {education.map((e, i) => (
                <EducationBlock key={i} inst={e.inst} deg={e.deg} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: stats grid ───────────────────────── */}
        <div className="flex flex-col justify-center">
          <div className="reveal d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "22px 20px",
                  border: "1px solid var(--border)",
                  background: "var(--bg-panel2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "clamp(2.6rem, 4vw, 4.2rem)",
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                    color: "var(--accent2)",
                    marginBottom: 8,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "0.48rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-faint)",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationBlock({ inst, deg }: { inst: string; deg: string }) {
  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.borderLeftColor = "var(--accent)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.borderLeftColor = "rgba(74,158,255,0.2)";
  };

  return (
    <div
      style={{
        paddingLeft: 16,
        paddingTop: 10,
        paddingBottom: 10,
        borderLeft: "2px solid rgba(74,158,255,0.2)",
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 400,
          fontSize: "0.95rem",
          color: "var(--text)",
          lineHeight: 1.4,
        }}
      >
        {inst}
      </div>
      <div
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 300,
          fontSize: "0.72rem",
          color: "var(--text-faint)",
          marginTop: 3,
        }}
      >
        {deg}
      </div>
    </div>
  );
}
