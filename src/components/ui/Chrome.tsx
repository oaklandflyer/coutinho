"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { SECTION_LABELS } from "@/lib/utils";

const SECTION_IDS = ["hero", "about", "experience", "work", "contact"];
const TOTAL = SECTION_IDS.length;

interface ChromeProps {
  onScrollTo: (id: string) => void;
}

export default function Chrome({ onScrollTo }: ChromeProps) {
  const { currentSection, scrollProgress, isDark, toggleDark } = useStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 350);
    return () => clearTimeout(t);
  }, []);

  const isLast = currentSection === TOTAL - 1;

  const counter = `${String(currentSection + 1).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`;

  const show: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transition: "opacity 0.6s ease",
    pointerEvents: visible ? "auto" : "none",
  };

  return (
    <>
      {/* ── Progress line — right edge ─────────────────── */}
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          width: 1,
          height: "100vh",
          background: "rgba(232,228,221,0.07)",
          zIndex: 700,
          pointerEvents: "none",
          ...show,
        }}
      >
        <div
          style={{
            width: "100%",
            background: "var(--accent)",
            height: `${scrollProgress * 100}%`,
            transition: "height 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>

      {/* ── Logo — top left ──────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 600,
          padding: "28px 32px",
          ...show,
        }}
      >
        <button
          onClick={() => onScrollTo("hero")}
          data-cursor
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 300,
            fontSize: "1.05rem",
            letterSpacing: "0.14em",
            color: "rgba(232,228,221,0.45)",
            background: "none",
            border: "none",
            cursor: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(232,228,221,0.9)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(232,228,221,0.45)")}
        >
          AC
        </button>
      </div>

      {/* ── Section counter + theme toggle — top right ─── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 14,
          zIndex: 600,
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          ...show,
        }}
      >
        {/* Counter — desktop only */}
        <span
          className="hidden md:block"
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(232,228,221,0.28)",
          }}
        >
          {counter}
        </span>
        <span
          className="hidden md:block"
          style={{ width: 1, height: 12, background: "rgba(232,228,221,0.12)" }}
        />
        {/* Theme toggle */}
        <button
          onClick={toggleDark}
          data-cursor
          aria-label="Toggle light/dark mode"
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(232,228,221,0.28)",
            background: "none",
            border: "none",
            cursor: "none",
            transition: "color 0.3s ease",
            lineHeight: 1,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(232,228,221,0.7)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(232,228,221,0.28)")}
        >
          {isDark ? "☀" : "◐"}
        </button>
      </div>

      {/* ── Dot navigation — right side, desktop ─────────── */}
      <nav
        className="hidden md:flex"
        style={{
          position: "fixed",
          right: 22,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 600,
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          ...show,
        }}
      >
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            onClick={() => onScrollTo(id)}
            data-cursor
            aria-label={`Go to ${SECTION_LABELS[i]}`}
            style={{
              width: 16,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "none",
              padding: 0,
            }}
          >
            <span
              style={{
                display: "block",
                width: 3,
                height: currentSection === i ? 22 : 3,
                borderRadius: 99,
                background:
                  currentSection === i
                    ? "var(--accent)"
                    : "rgba(232,228,221,0.2)",
                transition: "height 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
              }}
            />
          </button>
        ))}
      </nav>

      {/* ── Section name — bottom left ────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          left: 32,
          zIndex: 600,
          ...show,
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.44rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(232,228,221,0.2)",
          }}
        >
          {SECTION_LABELS[currentSection]}
        </span>
      </div>

      {/* ── Chevrons — bottom center (hidden on last section) */}
      <div
        style={{
          position: "fixed",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          pointerEvents: "none",
          opacity: visible ? (isLast ? 0 : 1) : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div className="chevron-bounce" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="rgba(232,228,221,0.32)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="rgba(232,228,221,0.16)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.4rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(232,228,221,0.2)",
            marginTop: 4,
          }}
        >
          scroll
        </span>
      </div>

      {/* ── Mobile bottom dot bar ─────────────────────────── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          paddingBottom: 20,
          paddingTop: 20,
          background: "linear-gradient(to top, rgba(14,13,11,0.85) 0%, transparent 100%)",
          ...show,
        }}
      >
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            onClick={() => onScrollTo(id)}
            aria-label={SECTION_LABELS[i]}
            style={{
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "10px 6px",
            }}
          >
            <span
              style={{
                display: "block",
                width: currentSection === i ? 18 : 5,
                height: 5,
                borderRadius: 99,
                background:
                  currentSection === i
                    ? "var(--accent)"
                    : "rgba(232,228,221,0.25)",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </button>
        ))}
      </div>
    </>
  );
}
