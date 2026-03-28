"use client";
import { useRef, useEffect } from "react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

const supporting = [
  { n: "02", type: "Web + Photography", title: "Pittsburgh Prestige Remodeling", body: "Full site with Supabase gallery CMS. Photography across four project categories.", href: "https://prestigepgh.com" },
  { n: "03", type: "Commercial Real Estate", title: "S&G Asset Group LLC", body: "CRE photography across two properties — listing assets and drone aerials.", href: null },
  { n: "04", type: "Event Photography", title: "Allegheny Sport & Outdoor", body: "Two-day coverage of Pittsburgh's premier outdoor & sport industry summit.", href: null },
  { n: "05", type: "Web Design", title: "Aqua Design Collective", body: "Dark design system, Supabase CMS, client admin portal.", href: "https://aquadesigncollective.com" },
  { n: "06", type: "Civic Event Photography", title: "Global Shapers Pittsburgh Hub", body: "WEF Hub events, community initiatives, and leadership programming.", href: null },
];

export default function Work() {
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

  const bg = isDark ? "bg-brown-900" : "bg-cream-100";
  const text = isDark ? "text-cream-100" : "text-brown-800";
  const sub = isDark ? "text-cream-200/55" : "text-brown-800/60";
  const dim = isDark ? "text-cream-200/35" : "text-brown-800/38";
  const border = isDark ? "border-cream-200/08" : "border-brown-800/10";
  const cardBg = isDark ? "bg-cream-200/03" : "bg-brown-800/02";
  const cardHover = isDark ? "hover:bg-cream-200/06" : "hover:bg-brown-800/04";

  return (
    <section
      ref={ref}
      data-section="3"
      className={cn("section-snap grid", bg)}
      style={{ gridTemplateColumns: "1fr 1fr" }}
    >
      {/* Left — brand panel */}
      <div className="bg-terra flex flex-col justify-center px-12 py-16 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute bottom-[-60px] right-[-60px] w-[260px] h-[260px] rounded-full border border-white/12" />
        <div className="absolute bottom-[20px] right-[20px] w-[140px] h-[140px] rounded-full border border-white/08" />

        <p className="reveal font-mono text-[0.55rem] tracking-[0.26em] uppercase mb-4 text-white/55 flex items-center gap-2 relative z-10">
          <span className="block w-4 h-px bg-white/45" />ASF Visuals LLC
        </p>

        <h2 className="reveal d1 font-display font-light text-cream-100 leading-[0.88] tracking-[-0.02em] mb-6 relative z-10"
          style={{ fontSize: "clamp(3rem,7vw,7.5rem)" }}>
          Authentic.<br /><em className="italic text-white/55">Strategic.</em><br />Focused.
        </h2>

        <p className="reveal d2 font-body font-light text-[0.88rem] leading-[1.82] text-white/70 max-w-[300px] mb-6 relative z-10">
          Photo · Video · Drone · Web · SEO.<br />Built for results, not fluff.
        </p>

        <a href="https://asfvisualsllc.com" target="_blank" rel="noreferrer"
          className="reveal d2 font-mono text-[0.6rem] tracking-[0.18em] uppercase text-white/60
                     flex items-center gap-3 mb-8 relative z-10 transition-colors hover:text-white/90 w-fit" data-cursor>
          <span className="block w-5 h-px bg-white/45" />asfvisualsllc.com
        </a>

        <div className="reveal d3 grid grid-cols-2 gap-px relative z-10 mb-6">
          {[["6+","Clients"],["330+","Photos"],["Part 107","FAA Licensed"],["5★","All Reviews"]].map(([n, l]) => (
            <div key={l} className="bg-black/15 px-4 py-4">
              <div className="font-display text-[2rem] font-light text-cream-100 leading-none">{n}</div>
              <div className="font-mono text-[0.52rem] text-white/45 tracking-[0.08em] uppercase mt-1">{l}</div>
            </div>
          ))}
        </div>

        <div className="reveal d4 flex flex-col gap-2 relative z-10">
          {[
            ["Instagram", "@asfvisuals", "https://instagram.com/asfvisuals"],
            ["YouTube", "ASF Visuals LLC", "https://youtube.com/@ASFVisualsLLC"],
          ].map(([label, handle, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" data-cursor
              className="flex items-center justify-between px-4 py-3 border border-white/15
                         text-white/75 text-[0.8rem] font-light hover:bg-white/10 hover:border-white/35
                         transition-all duration-200">
              {label}
              <span className="font-mono text-[0.52rem] text-white/40">{handle} ↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* Right — work list */}
      <div className="flex flex-col overflow-hidden">
        {/* Featured */}
        <div className={cn(
          "relative px-10 py-8 border-b flex-shrink-0 group transition-colors duration-300",
          border, cardBg, cardHover
        )} data-cursor>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-terra to-terra-light" />
          <div className="reveal font-mono text-[0.5rem] tracking-[0.18em] uppercase text-terra mb-3">
            01 — Featured · Sports Photography & Drone
          </div>
          <div className={cn("reveal d1 font-display text-[1.6rem] font-light leading-[1.15] mb-3", text)}>
            University of Pittsburgh<br />D1 Athletics
          </div>
          <p className={cn("reveal d1 font-body text-[0.75rem] leading-[1.8] mb-4", sub)}>
            On-field photography and drone videography for Pitt Men's & Women's Soccer.
            Game-day assets, aerial footage for media day and social — consistent delivery
            across both programs.
          </p>
          <a href="https://youtube.com/@ASFVisualsLLC" target="_blank" rel="noreferrer" data-cursor
            className="reveal d2 font-mono text-[0.54rem] tracking-[0.16em] uppercase text-terra
                       inline-flex items-center gap-2 transition-all duration-300 hover:gap-4">
            Watch on YouTube →
          </a>
        </div>

        {/* Supporting list */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {supporting.map((w) => (
            <div key={w.n}
              className={cn(
                "flex items-center justify-between px-10 border-b transition-colors duration-200 group",
                "flex-1 min-h-0",
                border, cardHover
              )} data-cursor>
              <span className={cn("font-mono text-[0.5rem] tracking-[0.1em] mr-4 flex-shrink-0", dim)}>{w.n}</span>
              <div className="flex-1 min-w-0 py-3">
                <div className={cn("font-display text-[1.05rem] font-light leading-[1.2] group-hover:text-terra transition-colors duration-200", text)}>
                  {w.title}
                </div>
                <div className={cn("font-mono text-[0.5rem] tracking-[0.1em] uppercase mt-1", dim)}>{w.type}</div>
              </div>
              {w.href ? (
                <a href={w.href} target="_blank" rel="noreferrer" data-cursor
                  className="font-mono text-[0.5rem] tracking-[0.12em] uppercase text-terra
                             opacity-0 group-hover:opacity-100 transition-all duration-200 ml-4 flex-shrink-0">
                  Visit →
                </a>
              ) : (
                <span className={cn("font-mono text-[0.5rem] tracking-[0.1em] uppercase ml-4 opacity-0 group-hover:opacity-40 flex-shrink-0 transition-opacity duration-200", dim)}>
                  ↗
                </span>
              )}
            </div>
          ))}
          <a href="https://asfvisualsllc.com/clients.html" target="_blank" rel="noreferrer" data-cursor
            className={cn(
              "flex items-center justify-center px-10 py-4 font-mono text-[0.54rem] tracking-[0.18em] uppercase",
              "flex-shrink-0 transition-colors duration-200",
              isDark ? "text-cream-200/25 hover:text-cream-200/60" : "text-brown-800/28 hover:text-brown-800/60"
            )}>
            See All Work →
          </a>
        </div>
      </div>
    </section>
  );
}
