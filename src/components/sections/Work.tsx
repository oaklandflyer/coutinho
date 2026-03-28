"use client";
import { useRef, useEffect } from "react";

const supporting = [
  { n: "02", type: "Web + Photography", title: "Pittsburgh Prestige Remodeling", body: "Full site with Supabase gallery CMS. Photography across four project categories.", href: "https://prestigepgh.com" },
  { n: "03", type: "Commercial Real Estate", title: "S&G Asset Group LLC", body: "CRE photography across two properties — listing assets and drone aerials.", href: null },
  { n: "04", type: "Event Photography", title: "Allegheny Sport & Outdoor", body: "Two-day coverage of Pittsburgh's premier outdoor & sport industry summit.", href: null },
  { n: "05", type: "Web Design", title: "Aqua Design Collective", body: "Dark design system, Supabase CMS, client admin portal.", href: "https://aquadesigncollective.com" },
  { n: "06", type: "Civic Event Photography", title: "Global Shapers Pittsburgh Hub", body: "WEF Hub events, community initiatives, and leadership programming.", href: null },
];

export default function Work() {
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
      data-section="3"
      className="section-snap bg-[#160f09] grid"
      style={{ gridTemplateColumns: "1fr 1fr" }}
    >
      {/* Left — ASF Visuals brand panel */}
      <div className="bg-terra flex flex-col justify-center px-11 py-16 relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute bottom-[10px] right-[10px] w-[150px] h-[150px] rounded-full border border-white/07 pointer-events-none" />

        <p className="reveal font-mono text-[0.5rem] tracking-[0.3em] uppercase text-white/50 mb-5 flex items-center gap-2 relative z-10">
          <span className="block w-5 h-px bg-white/40" />ASF Visuals LLC
        </p>

        <h2
          className="reveal d1 font-display font-light text-cream-100 leading-[0.86] tracking-[-0.025em] mb-6 relative z-10"
          style={{ fontSize: "clamp(3rem,6.5vw,7rem)" }}
        >
          Authentic.<br />
          <em className="italic text-white/45">Strategic.</em><br />
          Focused.
        </h2>

        <p className="reveal d2 font-body font-light text-[0.84rem] leading-[1.85] text-white/65 max-w-[290px] mb-6 relative z-10">
          Photo · Video · Drone · Web · SEO.<br />Built for results, not fluff.
        </p>

        <a
          href="https://asfvisualsllc.com"
          target="_blank"
          rel="noreferrer"
          data-cursor
          className="reveal d2 font-mono text-[0.56rem] tracking-[0.2em] uppercase text-white/55
                     flex items-center gap-3 mb-8 relative z-10 transition-colors hover:text-white/90 w-fit group"
        >
          <span className="block w-5 h-px bg-white/40 group-hover:w-8 transition-all duration-300" />
          asfvisualsllc.com
        </a>

        <div className="reveal d3 grid grid-cols-2 gap-px relative z-10 mb-6">
          {[["6+", "Clients"], ["330+", "Photos"], ["Part 107", "FAA Licensed"], ["5★", "All Reviews"]].map(([n, l]) => (
            <div key={l} className="bg-black/18 px-4 py-4">
              <div className="font-display text-[2rem] font-light text-cream-100 leading-none">{n}</div>
              <div className="font-mono text-[0.5rem] text-white/40 tracking-[0.1em] uppercase mt-1">{l}</div>
            </div>
          ))}
        </div>

        <div className="reveal d4 flex flex-col gap-[6px] relative z-10">
          {[
            ["Instagram", "@asfvisuals", "https://instagram.com/asfvisuals"],
            ["YouTube", "ASF Visuals LLC", "https://youtube.com/@ASFVisualsLLC"],
          ].map(([label, handle, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="flex items-center justify-between px-4 py-3 border border-white/14
                         text-white/70 text-[0.78rem] font-light hover:bg-white/10 hover:border-white/30
                         transition-all duration-200"
            >
              {label}
              <span className="font-mono text-[0.5rem] text-white/38">{handle} ↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* Right — work list */}
      <div className="flex flex-col overflow-hidden bg-[#160f09]">
        {/* Featured */}
        <div
          className="relative px-10 py-8 border-b border-cream-200/07 flex-shrink-0 group
                     hover:bg-cream-200/[0.025] transition-colors duration-300"
          data-cursor
        >
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-terra to-terra-light opacity-80" />
          <div className="reveal font-mono text-[0.48rem] tracking-[0.2em] uppercase text-terra mb-3">
            01 — Featured · Sports Photography & Drone
          </div>
          <div className="reveal d1 font-display text-[1.65rem] font-light leading-[1.12] mb-3 text-cream-100">
            University of Pittsburgh<br />D1 Athletics
          </div>
          <p className="reveal d1 font-body text-[0.73rem] leading-[1.82] mb-4 text-cream-200/45">
            On-field photography and drone videography for Pitt Men&apos;s & Women&apos;s Soccer.
            Game-day assets, aerial footage for media day and social — consistent delivery
            across both programs.
          </p>
          <a
            href="https://youtube.com/@ASFVisualsLLC"
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="reveal d2 font-mono text-[0.52rem] tracking-[0.18em] uppercase text-terra
                       inline-flex items-center gap-2 transition-all duration-300 hover:gap-4"
          >
            Watch on YouTube →
          </a>
        </div>

        {/* Supporting list */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {supporting.map((w) => (
            <div
              key={w.n}
              className="flex items-center justify-between px-10 border-b border-cream-200/07
                         flex-1 min-h-0 hover:bg-cream-200/[0.025] transition-colors duration-200 group"
              data-cursor
            >
              <span className="font-mono text-[0.48rem] tracking-[0.1em] mr-4 flex-shrink-0 text-cream-200/22">{w.n}</span>
              <div className="flex-1 min-w-0 py-3">
                <div className="font-display text-[1.05rem] font-light leading-[1.2] text-cream-100 group-hover:text-terra transition-colors duration-200">
                  {w.title}
                </div>
                <div className="font-mono text-[0.48rem] tracking-[0.1em] uppercase mt-[3px] text-cream-200/28">{w.type}</div>
              </div>
              {w.href ? (
                <a
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="font-mono text-[0.48rem] tracking-[0.12em] uppercase text-terra
                             opacity-0 group-hover:opacity-100 transition-all duration-200 ml-4 flex-shrink-0"
                >
                  Visit →
                </a>
              ) : (
                <span className="font-mono text-[0.48rem] tracking-[0.1em] uppercase ml-4 opacity-0 group-hover:opacity-30
                                 flex-shrink-0 transition-opacity duration-200 text-cream-200/40">
                  ↗
                </span>
              )}
            </div>
          ))}

          <a
            href="https://asfvisualsllc.com/clients.html"
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="flex items-center justify-center px-10 py-4 font-mono text-[0.52rem] tracking-[0.2em] uppercase
                       flex-shrink-0 text-cream-200/22 hover:text-cream-200/55 transition-colors duration-200"
          >
            See All Work →
          </a>
        </div>
      </div>
    </section>
  );
}
