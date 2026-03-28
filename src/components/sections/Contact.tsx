"use client";
import { useRef, useEffect } from "react";

const ctaButtons = [
  { label: "Email Me", href: "mailto:coutinhodrew@gmail.com", primary: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/andrew-coutinho", primary: false },
  { label: "Instagram", href: "https://instagram.com/asfvisuals", primary: false },
  { label: "YouTube", href: "https://youtube.com/@ASFVisualsLLC", primary: false },
];

const details = [
  { label: "Location", value: "Pittsburgh, PA" },
  { label: "Email", value: "coutinhodrew@gmail.com" },
  { label: "LinkedIn", value: "/in/andrew-coutinho" },
  { label: "Open to", value: "PM · Marketing · Comms · Drone/Web" },
  { label: "Compensation", value: "$85K+ · Also available for project work" },
  { label: "Citizenship", value: "US / UK Citizen" },
];

export default function Contact() {
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
      style={{ background: "var(--bg-panel)", padding: "0 52px" }}
    >
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20"
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >

        {/* ── Left: heading + CTA buttons ─────────────── */}
        <div className="flex flex-col justify-center">

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
            Contact
          </p>

          {/* Heading */}
          <h2
            className="reveal d1"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 7rem)",
              letterSpacing: "0.04em",
              lineHeight: 0.92,
              color: "var(--text)",
              marginBottom: 36,
            }}
          >
            Let&apos;s build<br />
            <span style={{ color: "var(--accent2)" }}>something.</span>
          </h2>

          {/* Stacked CTAs */}
          <div className="reveal d2" style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320 }}>
            {ctaButtons.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                target={btn.href.startsWith("mailto") ? undefined : "_blank"}
                rel={btn.href.startsWith("mailto") ? undefined : "noreferrer"}
                data-cursor
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "13px 20px",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: btn.primary ? 400 : 300,
                  fontSize: "0.88rem",
                  letterSpacing: "0.02em",
                  color: btn.primary ? "#0e0d0b" : "var(--text)",
                  background: btn.primary ? "var(--accent)" : "transparent",
                  border: btn.primary ? "1px solid var(--accent)" : "1px solid var(--border)",
                  textDecoration: "none",
                  transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
                  cursor: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (btn.primary) {
                    el.style.background = "var(--accent-dark, #2a7fdf)";
                  } else {
                    el.style.borderColor = "rgba(232,228,221,0.25)";
                    el.style.background = "rgba(232,228,221,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (btn.primary) {
                    el.style.background = "var(--accent)";
                  } else {
                    el.style.borderColor = "var(--border)";
                    el.style.background = "transparent";
                  }
                }}
              >
                <span>{btn.label}</span>
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: "0.8rem", opacity: 0.6 }}>↗</span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <p
            className="reveal d4"
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.44rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-faint)",
              marginTop: 36,
            }}
          >
            Andrew Coutinho · Pittsburgh, PA · US / UK Citizen · {new Date().getFullYear()}
          </p>
        </div>

        {/* ── Right: contact details ───────────────────── */}
        <div className="flex flex-col justify-center">
          <div className="reveal d2" style={{ display: "flex", flexDirection: "column" }}>
            {details.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                  gap: 16,
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "0.48rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-faint)",
                    flexShrink: 0,
                  }}
                >
                  {d.label}
                </span>
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.84rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.5,
                  }}
                >
                  {d.value}
                </span>
              </div>
            ))}
          </div>

          {/* Availability note */}
          <p
            className="reveal d3"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: "0.78rem",
              lineHeight: 1.9,
              color: "var(--text-faint)",
              marginTop: 20,
            }}
          >
            Open to product management, marketing ops, communications, and creative media roles.
            Also available for drone photography and web projects.
          </p>
        </div>

      </div>
    </section>
  );
}
