"use client";
import { useRef, useEffect } from "react";

const details = [
  { k: "Phone", v: "+1 (412) 616-3942", href: "tel:+14126163942" },
  { k: "Based in", v: "Pittsburgh, PA · Open to relocation" },
  { k: "Currently", v: "Curator-elect, Global Shapers Pittsburgh (WEF)\nFounder, ASF Visuals LLC" },
  { k: "Education", v: "B.A. Economics & Africana Studies · Pitt 2025\nFulbright-Hays Scholar · Tanzania 2023" },
  { k: "Citizenship", v: "US · UK" },
  { k: "Looking for", v: "Product management, marketing ops,\ncommunications, creative media · $85K+" },
];

const links = [
  { label: "Email Me", sub: "coutinhodrew@gmail.com", href: "mailto:coutinhodrew@gmail.com", fill: true },
  { label: "LinkedIn", sub: "/in/andrew-coutinho", href: "https://linkedin.com/in/andrew-coutinho", fill: false },
  { label: "ASF Visuals", sub: "asfvisualsllc.com", href: "https://asfvisualsllc.com", fill: false },
  { label: "Instagram", sub: "@asfvisuals", href: "https://instagram.com/asfvisuals", fill: false },
  { label: "YouTube", sub: "ASF Visuals LLC", href: "https://youtube.com/@ASFVisualsLLC", fill: false },
];

export default function Contact() {
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
      data-section="4"
      className="section-snap bg-[#1b1109] grid"
      style={{ gridTemplateColumns: "1fr 1px 1fr" }}
    >
      {/* Left */}
      <div className="flex flex-col justify-center px-12 py-16">
        <p className="reveal font-mono text-[0.5rem] tracking-[0.3em] uppercase text-terra mb-5 flex items-center gap-2">
          <span className="block w-5 h-px bg-terra" />Let&apos;s work together
        </p>

        <h2
          className="reveal d1 font-display font-light leading-[0.88] tracking-[-0.025em] mb-9 text-cream-100"
          style={{ fontSize: "clamp(3.2rem,7vw,8.5rem)" }}
        >
          Let&apos;s build<br />
          <em className="italic text-terra">something.</em>
        </h2>

        <p className="reveal d2 font-body font-light text-[0.84rem] leading-[1.95] mb-8 text-cream-200/45">
          Open to{" "}
          <strong className="font-medium text-cream-200/72">product management</strong>,
          marketing operations, communications, and creative media roles above $85K.
          Also available for drone photography and web development projects.
        </p>

        <div className="reveal d3 flex flex-col gap-[6px]">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto") || l.href.startsWith("tel") ? undefined : "_blank"}
              rel="noreferrer"
              data-cursor
              className={`flex items-center justify-between px-5 py-[14px] text-[0.82rem] font-light
                          transition-all duration-200 group hover:translate-x-1 ${
                l.fill
                  ? "bg-terra text-cream-100 border border-terra hover:bg-terra-light"
                  : "border border-cream-200/09 text-cream-100/75 hover:border-cream-200/22 hover:bg-cream-200/04"
              }`}
            >
              {l.label}
              <span className={`font-mono text-[0.52rem] tracking-[0.1em] ${l.fill ? "text-white/48" : "text-cream-200/30"}`}>
                {l.sub}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-16 bg-cream-200/07" />

      {/* Right */}
      <div className="flex flex-col justify-center px-12 py-16">
        <div>
          {details.map((d, i) => (
            <div
              key={i}
              className="reveal py-[18px] border-b border-cream-200/07 flex flex-col gap-[4px]"
              style={{ transitionDelay: `${i * 0.07}s`, ...(i === 0 ? { borderTop: "1px solid rgba(235,228,212,0.07)" } : {}) }}
            >
              <span className="font-mono text-[0.5rem] tracking-[0.24em] uppercase text-cream-200/25">{d.k}</span>
              {d.href ? (
                <a href={d.href} data-cursor className="font-body text-[0.88rem] font-light leading-[1.65] text-terra hover:underline">
                  {d.v}
                </a>
              ) : (
                <span className="font-body text-[0.88rem] font-light leading-[1.65] whitespace-pre-line text-cream-100/80">
                  {d.v}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer mark */}
        <p className="reveal d5 font-mono text-[0.46rem] tracking-[0.2em] uppercase text-cream-200/18 mt-8">
          Andrew Coutinho · Pittsburgh, PA · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
