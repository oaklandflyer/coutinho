"use client";
import { useRef, useEffect } from "react";

const projects = [
  {
    n: "00",
    category: "Creative Agency · Founded",
    title: "ASF Visuals LLC",
    body: "Photo · Video · Drone · Web · SEO. Certified drone media business serving D1 Athletics, CRE firms, and civic organizations. FAA Part 107 licensed.",
    href: "https://asfvisualsllc.com",
    featured: true,
  },
  {
    n: "01",
    category: "Sports Photography & Drone",
    title: "University of Pittsburgh D1 Athletics",
    body: "On-field photography and drone videography for Pitt Men's & Women's Soccer. Game-day assets, aerial media day footage, social content.",
    href: "https://youtube.com/@ASFVisualsLLC",
    featured: false,
  },
  {
    n: "02",
    category: "Web + Photography",
    title: "Pittsburgh Prestige Remodeling",
    body: "Full site with Supabase gallery CMS. Photography across four project categories.",
    href: "https://prestigepgh.com",
    featured: false,
  },
  {
    n: "03",
    category: "Web Design",
    title: "Aqua Design Collective",
    body: "Dark design system, Supabase CMS, client admin portal.",
    href: "https://aquadesigncollective.com",
    featured: false,
  },
  {
    n: "04",
    category: "Commercial Real Estate",
    title: "S&G Asset Group LLC",
    body: "CRE photography across two properties — listing assets and drone aerials.",
    href: null,
    featured: false,
  },
  {
    n: "05",
    category: "Event Photography",
    title: "Allegheny Sport & Outdoor",
    body: "Two-day coverage of Pittsburgh's premier outdoor & sport industry summit.",
    href: null,
    featured: false,
  },
  {
    n: "06",
    category: "Civic Event Photography",
    title: "Global Shapers Pittsburgh Hub",
    body: "WEF Hub events, community initiatives, and leadership programming.",
    href: null,
    featured: false,
  },
];

export default function Work() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        });
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-full bg-[#160f09] flex flex-col justify-center"
      style={{ padding: "10vh 52px" }}
    >
      <div className="w-full">
        <p className="reveal font-mono text-[0.5rem] tracking-[0.32em] uppercase text-terra mb-8 flex items-center gap-3">
          <span className="block w-5 h-px bg-terra" />
          Selected Work
        </p>

        <h2
          className="reveal d1 font-display font-light text-cream-100 leading-[0.92] tracking-[-0.02em] mb-14"
          style={{ fontSize: "clamp(2.8rem,5.5vw,6rem)" }}
        >
          Projects &amp;<br />
          <em className="italic text-terra">collaborations</em>
        </h2>

        {/* Project rows */}
        <div className="w-full border-t border-cream-200/08">
          {projects.map((p, i) => (
            <div
              key={i}
              className="reveal group border-b border-cream-200/07 -mx-4 px-4"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="flex items-start justify-between py-7 gap-8
                             hover:bg-cream-200/[0.025] transition-colors duration-300 -mx-4 px-4"
                >
                  <ProjectRow project={p} />
                </a>
              ) : (
                <div
                  data-cursor
                  className="flex items-start justify-between py-7 gap-8
                             hover:bg-cream-200/[0.025] transition-colors duration-300 -mx-4 px-4"
                >
                  <ProjectRow project={p} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project: p }: { project: typeof projects[0] }) {
  return (
    <>
      {/* Number */}
      <div className="font-mono text-[0.5rem] tracking-[0.1em] text-cream-200/20 w-8 flex-shrink-0 pt-[4px]">
        {p.n}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[0.5rem] tracking-[0.14em] uppercase text-terra/70 mb-2">
          {p.category}
        </div>
        <div
          className={`font-display font-light leading-[1.15] text-cream-100 mb-2
                      group-hover:text-terra-light transition-colors duration-300
                      ${p.featured ? "text-[1.9rem]" : "text-[1.45rem]"}`}
        >
          {p.title}
        </div>
        <div className="font-body text-[0.73rem] text-cream-200/38 leading-[1.82] max-w-[560px]">
          {p.body}
        </div>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0 pt-[4px]">
        {p.href ? (
          <span className="font-mono text-[0.5rem] tracking-[0.1em] text-terra/40
                           group-hover:text-terra transition-colors duration-300 opacity-0
                           group-hover:opacity-100">
            ↗
          </span>
        ) : null}
      </div>
    </>
  );
}
