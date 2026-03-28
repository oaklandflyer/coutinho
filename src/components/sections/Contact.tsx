"use client";
import { useRef, useEffect } from "react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

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
  const { isDark } = useStore();
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

  const bg = isDark ? "bg-brown-800" : "bg-cream-200";
  const text = isDark ? "text-cream-100" : "text-brown-800";
  const sub = isDark ? "text-cream-200/55" : "text-brown-800/62";
  const dim = isDark ? "text-cream-200/32" : "text-brown-800/35";
  const border = isDark ? "border-cream-200/10" : "border-brown-800/10";
  const border2 = isDark ? "border-cream-200/08" : "border-brown-800/08";

  return (
    <section
      ref={ref}
      data-section="4"
      className={cn("section-snap grid", bg)}
      style={{ gridTemplateColumns: "1fr 1fr" }}
    >
      {/* Left */}
      <div className={cn("flex flex-col justify-center px-12 py-16 border-r", border2)}>
        <p className="reveal font-mono text-[0.55rem] tracking-[0.26em] uppercase mb-4 text-terra flex items-center gap-2">
          <span className="block w-4 h-px bg-terra" />Let&apos;s work together
        </p>

        <h2 className={cn("reveal d1 font-display font-light leading-[0.9] tracking-[-0.02em] mb-8", text,
          "text-[clamp(3.5rem,7vw,8rem)]")}>
          Let&apos;s build<br /><em className="italic text-terra">something.</em>
        </h2>

        <p className={cn("reveal d2 font-body font-light text-[0.88rem] leading-[1.88] mb-8", sub)}>
          Open to <strong className={cn("font-medium", text)}>product management</strong>,
          marketing operations, communications, and creative media roles above $85K.
          Also available for drone photography and web development projects.
        </p>

        <div className="reveal d3 flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto") || l.href.startsWith("tel") ? undefined : "_blank"}
              rel="noreferrer"
              data-cursor
              className={cn(
                "flex items-center justify-between px-5 py-4 text-[0.84rem] font-light transition-all duration-200",
                "group hover:translate-x-1",
                l.fill
                  ? "bg-terra text-cream-100 border border-terra hover:bg-terra-light"
                  : cn("border transition-colors", border2,
                      isDark
                        ? "text-cream-100 hover:border-cream-200/25 hover:bg-cream-200/04"
                        : "text-brown-800 hover:border-brown-800/22 hover:bg-brown-800/03"
                    )
              )}
            >
              {l.label}
              <span className={cn(
                "font-mono text-[0.54rem] tracking-[0.1em]",
                l.fill ? "text-white/50" : dim
              )}>{l.sub}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col justify-center px-12 py-16">
        <div>
          {details.map((d, i) => (
            <div key={i} className={cn(
              "reveal py-5 border-b flex flex-col gap-1",
              border,
              i === 0 && cn("border-t", border)
            )} style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className={cn("font-mono text-[0.54rem] tracking-[0.22em] uppercase", dim)}>{d.k}</span>
              {d.href ? (
                <a href={d.href} data-cursor className={cn("font-body text-[0.9rem] font-light leading-[1.6] text-terra hover:underline")}>
                  {d.v}
                </a>
              ) : (
                <span className={cn("font-body text-[0.9rem] font-light leading-[1.6] whitespace-pre-line", text)}>
                  {d.v}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
