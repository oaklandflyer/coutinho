"use client";
import { useEffect, useRef } from "react";

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 150 + i * 90);
    });
  }, []);

  return (
    <section
      ref={ref}
      className="section-full flex"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Left: name + subtitle ──────────────────────── */}
      <div
        className="flex-1 flex flex-col justify-end"
        style={{ padding: "0 52px 8vh" }}
      >
        {/* Name */}
        <h1
          className="reveal d1 select-none"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(6rem, 13vw, 14rem)",
            letterSpacing: "0.035em",
            lineHeight: 0.88,
            color: "var(--text)",
          }}
        >
          Andrew
          <br />
          Coutinho
        </h1>

        {/* Subtitle */}
        <p
          className="reveal d2"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 300,
            fontSize: "0.9rem",
            letterSpacing: "0.04em",
            color: "rgba(232,228,221,0.42)",
            marginTop: "1.8rem",
          }}
        >
          Strategist&ensp;·&ensp;Founder&ensp;·&ensp;Aerial Photographer
        </p>

        {/* Brief */}
        <p
          className="reveal d3"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 300,
            fontSize: "0.78rem",
            lineHeight: 2,
            color: "rgba(232,228,221,0.25)",
            marginTop: "0.7rem",
            maxWidth: 290,
          }}
        >
          Building at the intersection of creative media,
          <br />
          global community, and economic thinking.
        </p>

        {/* Location tag */}
        <p
          className="reveal d4"
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.44rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(232,228,221,0.18)",
            marginTop: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ display: "block", width: 24, height: 1, background: "rgba(232,228,221,0.14)" }} />
          Pittsburgh, PA · Open to Opportunities
        </p>
      </div>

      {/* ── Right: photo placeholder ───────────────────── */}
      <div
        className="hidden md:flex flex-col justify-center"
        style={{ padding: "0 52px 0 0", alignItems: "flex-end", minWidth: 280 }}
      >
        <div
          className="reveal d2"
          style={{
            width: 230,
            height: 295,
            border: "1px solid var(--border-accent)",
            background: "rgba(74,158,255,0.03)",
            position: "relative",
          }}
        >
          {/* Corner accents */}
          {[
            { top: -1, left: -1, borderTop: "1.5px solid var(--accent)", borderLeft: "1.5px solid var(--accent)" },
            { top: -1, right: -1, borderTop: "1.5px solid var(--accent)", borderRight: "1.5px solid var(--accent)" },
            { bottom: -1, left: -1, borderBottom: "1.5px solid var(--accent)", borderLeft: "1.5px solid var(--accent)" },
            { bottom: -1, right: -1, borderBottom: "1.5px solid var(--accent)", borderRight: "1.5px solid var(--accent)" },
          ].map((s, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                ...s,
              }}
            />
          ))}

          {/* Placeholder label */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.42rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(232,228,221,0.18)",
              }}
            >
              Andrew Coutinho
            </span>
          </div>
        </div>
      </div>

      {/* ── Scroll hint — bottom right ────────────────── */}
      <button
        onClick={() => onScrollTo("about")}
        data-cursor
        aria-label="Scroll down"
        style={{
          position: "absolute",
          bottom: "7vh",
          right: 52,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          cursor: "none",
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.42rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(232,228,221,0.2)",
          }}
        >
          scroll
        </span>
        <span
          style={{
            display: "block",
            width: 1,
            height: 38,
            background: "rgba(232,228,221,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            className="scroll-line"
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--accent)",
            }}
          />
        </span>
      </button>
    </section>
  );
}
