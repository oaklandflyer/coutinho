"use client";
import { useRef, useEffect } from "react";

const asfStats = [
  { n: "3+", l: "Years Active" },
  { n: "10+", l: "Clients Served" },
  { n: "D1", l: "Athletics" },
  { n: "FAA", l: "Part 107" },
];

const clients = [
  {
    category: "Sports Photography & Drone",
    title: "University of Pittsburgh D1 Athletics",
    body: "On-field photography and drone videography for Pitt Men's & Women's Soccer.",
    href: "https://youtube.com/@ASFVisualsLLC",
  },
  {
    category: "Web + Photography",
    title: "Pittsburgh Prestige Remodeling",
    body: "Full site with Supabase gallery CMS. Photography across four project categories.",
    href: "https://prestigepgh.com",
  },
  {
    category: "Web Design",
    title: "Aqua Design Collective",
    body: "Dark design system, Supabase CMS, client admin portal.",
    href: "https://aquadesigncollective.com",
  },
  {
    category: "Commercial Real Estate",
    title: "S&G Asset Group LLC",
    body: "CRE photography across two properties — listing assets and drone aerials.",
    href: null,
  },
  {
    category: "Event Photography",
    title: "Allegheny Sport & Outdoor",
    body: "Two-day coverage of Pittsburgh's premier outdoor & sport industry summit.",
    href: null,
  },
];

export default function Work() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        }),
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-full flex"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Left panel — ASF Visuals branding ───────── */}
      <div
        className="hidden md:flex flex-col justify-between"
        style={{
          width: 260,
          flexShrink: 0,
          background: "var(--bg-panel)",
          padding: "8vh 28px",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Top: branding */}
        <div className="reveal">
          <p
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.44rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 14,
            }}
          >
            Selected Work
          </p>
          <div
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "1.8rem",
              letterSpacing: "0.05em",
              lineHeight: 1.0,
              color: "var(--text)",
              marginBottom: 6,
            }}
          >
            ASF Visuals
          </div>
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: "0.72rem",
              color: "var(--text-faint)",
              lineHeight: 1.6,
            }}
          >
            Photo · Video · Drone · Web
          </div>
        </div>

        {/* Mid: stats */}
        <div className="reveal d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {asfStats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "12px 10px",
                border: "1px solid var(--border)",
                background: "var(--bg)",
              }}
            >
              <div
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "1.8rem",
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                  color: "var(--accent2)",
                  marginBottom: 4,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.42rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: links */}
        <div className="reveal d3" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <a
            href="https://instagram.com/asfvisuals"
            target="_blank"
            rel="noreferrer"
            data-cursor
            style={{ ...linkStyle }}
            onMouseEnter={(e) => applyLinkHover(e, true)}
            onMouseLeave={(e) => applyLinkHover(e, false)}
          >
            <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "0.78rem" }}>Instagram</span>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: "0.42rem", letterSpacing: "0.1em", color: "var(--text-faint)" }}>@asfvisuals ↗</span>
          </a>
          <a
            href="https://youtube.com/@ASFVisualsLLC"
            target="_blank"
            rel="noreferrer"
            data-cursor
            style={{ ...linkStyle }}
            onMouseEnter={(e) => applyLinkHover(e, true)}
            onMouseLeave={(e) => applyLinkHover(e, false)}
          >
            <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, fontSize: "0.78rem" }}>YouTube</span>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: "0.42rem", letterSpacing: "0.1em", color: "var(--text-faint)" }}>ASF Visuals ↗</span>
          </a>
        </div>
      </div>

      {/* ── Right panel ───────────────────────────────── */}
      <div className="flex-1 flex flex-col" style={{ overflow: "hidden" }}>

        {/* Featured ASF Visuals project */}
        <a
          href="https://asfvisualsllc.com"
          target="_blank"
          rel="noreferrer"
          data-cursor
          className="reveal group"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "7vh 40px 28px",
            borderBottom: "1px solid var(--border)",
            background: "transparent",
            flexShrink: 0,
            textDecoration: "none",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(74,158,255,0.03)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.48rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 10,
              }}
            >
              Creative Agency · Founded 2022
            </p>
            <div
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                letterSpacing: "0.04em",
                lineHeight: 1.0,
                color: "var(--text)",
              }}
            >
              ASF Visuals LLC
            </div>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 300,
                fontSize: "0.82rem",
                lineHeight: 1.75,
                color: "var(--text-dim)",
                marginTop: 8,
                maxWidth: 480,
              }}
            >
              Certified drone media business — photo, video, drone, web, SEO.
              Serving D1 Athletics, CRE firms, and civic organizations.
            </p>
          </div>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "1.1rem",
              color: "var(--accent)",
              opacity: 0.4,
              transition: "opacity 0.3s ease",
              flexShrink: 0,
              marginLeft: 16,
            }}
          >
            ↗
          </span>
        </a>

        {/* Client rows */}
        <div className="flex-1" style={{ overflowY: "auto" }}>
          {clients.map((c, i) => (
            <ClientRow key={i} client={c} delay={i * 0.05} />
          ))}
        </div>
      </div>

      {/* Mobile: simple label */}
      <div
        className="md:hidden"
        style={{
          position: "absolute",
          top: "6vh",
          left: 28,
          fontFamily: "DM Mono, monospace",
          fontSize: "0.44rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--accent)",
        }}
      >
        Selected Work
      </div>
    </section>
  );
}

const linkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 12px",
  border: "1px solid var(--border)",
  color: "var(--text)",
  textDecoration: "none",
  transition: "border-color 0.2s ease, background 0.2s ease",
};

function applyLinkHover(e: React.MouseEvent, entering: boolean) {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = entering ? "rgba(232,228,221,0.18)" : "var(--border)";
  el.style.background = entering ? "rgba(232,228,221,0.03)" : "transparent";
}

interface Client {
  category: string;
  title: string;
  body: string;
  href: string | null;
}

function ClientRow({ client: c, delay }: { client: Client; delay: number }) {
  const inner = (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        padding: "16px 40px",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(232,228,221,0.022)";
        const title = (e.currentTarget as HTMLDivElement).querySelector(".client-title") as HTMLElement | null;
        if (title) title.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "transparent";
        const title = (e.currentTarget as HTMLDivElement).querySelector(".client-title") as HTMLElement | null;
        if (title) title.style.color = "var(--text)";
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.46rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent2)",
            marginBottom: 4,
            opacity: 0.75,
          }}
        >
          {c.category}
        </p>
        <div
          className="client-title"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 400,
            fontSize: "1.0rem",
            color: "var(--text)",
            lineHeight: 1.3,
            marginBottom: 4,
            transition: "color 0.3s ease",
          }}
        >
          {c.title}
        </div>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 300,
            fontSize: "0.76rem",
            lineHeight: 1.75,
            color: "var(--text-dim)",
            opacity: 0.7,
          }}
        >
          {c.body}
        </p>
      </div>
      {c.href && (
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.85rem",
            color: "var(--accent)",
            opacity: 0.35,
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          ↗
        </span>
      )}
    </div>
  );

  return (
    <div
      className="reveal"
      style={{ transitionDelay: `${delay}s` }}
    >
      {c.href ? (
        <a href={c.href} target="_blank" rel="noreferrer" data-cursor style={{ display: "block", textDecoration: "none" }}>
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}
