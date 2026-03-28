"use client";
import { useRef, useEffect } from "react";

const links = [
  { label: "LinkedIn", sub: "/in/andrew-coutinho", href: "https://linkedin.com/in/andrew-coutinho" },
  { label: "Instagram", sub: "@asfvisuals", href: "https://instagram.com/asfvisuals" },
  { label: "YouTube", sub: "ASF Visuals LLC", href: "https://youtube.com/@ASFVisualsLLC" },
  { label: "ASF Visuals", sub: "asfvisualsllc.com", href: "https://asfvisualsllc.com" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-full bg-[#1a1009] flex flex-col justify-center"
      style={{ padding: "10vh 52px 12vh" }}
    >
      <div className="max-w-[780px]">
        <p className="reveal font-mono text-[0.5rem] tracking-[0.32em] uppercase text-terra mb-8 flex items-center gap-3">
          <span className="block w-5 h-px bg-terra" />
          Let&apos;s connect
        </p>

        {/* Big headline */}
        <h2
          className="reveal d1 font-display font-light text-cream-100 leading-[0.88] tracking-[-0.03em] mb-10"
          style={{ fontSize: "clamp(3.5rem,8vw,10rem)" }}
        >
          Let&apos;s build<br />
          <em className="italic text-terra">something.</em>
        </h2>

        {/* Primary CTA */}
        <a
          href="mailto:coutinhodrew@gmail.com"
          data-cursor
          className="reveal d2 group inline-flex items-center gap-4 mb-14"
        >
          <span
            className="font-display font-light text-cream-100/50 leading-none tracking-[-0.01em]
                       group-hover:text-cream-100 transition-colors duration-400"
            style={{ fontSize: "clamp(1rem,2.2vw,2rem)" }}
          >
            coutinhodrew@gmail.com
          </span>
          <span className="block w-0 h-px bg-terra group-hover:w-12 transition-all duration-400" />
        </a>

        {/* Availability note */}
        <p className="reveal d3 font-body font-light text-[0.82rem] leading-[1.9] text-cream-200/38 mb-12 max-w-[480px]">
          Open to product management, marketing operations, communications,
          and creative media roles above{" "}
          <strong className="font-medium text-cream-200/60">$85K</strong>.
          Also available for drone photography and web projects.
        </p>

        {/* Social links row */}
        <div className="reveal d4 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="flex items-center gap-3 px-4 py-3 border border-cream-200/09
                         hover:border-cream-200/22 hover:bg-cream-200/04
                         transition-all duration-200 group"
            >
              <span className="font-body text-[0.78rem] font-light text-cream-100/65 group-hover:text-cream-100 transition-colors duration-200">
                {l.label}
              </span>
              <span className="font-mono text-[0.46rem] tracking-[0.1em] text-cream-200/28">
                {l.sub} ↗
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="reveal d5 font-mono text-[0.44rem] tracking-[0.22em] uppercase text-cream-200/16 mt-16">
          Andrew Coutinho · Pittsburgh, PA · US / UK Citizen · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
