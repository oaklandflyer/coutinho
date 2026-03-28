"use client";
import { useReveal } from "@/lib/useReveal";

const links = [
  { label: "Email",      sub: "coutinhodrew@gmail.com",    href: "mailto:coutinhodrew@gmail.com"         },
  { label: "LinkedIn",   sub: "/in/andrew-coutinho",       href: "https://linkedin.com/in/andrew-coutinho" },
  { label: "Instagram",  sub: "@asfvisuals",               href: "https://instagram.com/asfvisuals"      },
  { label: "YouTube",    sub: "ASF Visuals LLC",           href: "https://youtube.com/@ASFVisualsLLC"    },
  { label: "ASF Visuals",sub: "asfvisualsllc.com",         href: "https://asfvisualsllc.com"             },
];

export default function Contact() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      id="contact"
      className="min-h-screen flex items-center px-10 md:px-14 py-28 bg-panel"
    >
      <div className="w-full max-w-3xl">

        <p className="reveal font-mono text-[0.5rem] tracking-[0.32em] uppercase text-sky mb-8 flex items-center gap-2">
          <span className="block w-5 h-px bg-sky" /> Contact
        </p>

        <h2 className="reveal d1 font-display text-[clamp(3rem,7vw,8rem)] leading-none tracking-[0.04em] text-ink mb-12">
          Let&apos;s build<br />
          <span className="text-amber">something.</span>
        </h2>

        <p className="reveal d2 font-body font-light text-[0.85rem] text-ink/40 leading-loose mb-10 max-w-sm">
          Open to product management, marketing ops, communications, and creative
          media roles above <strong className="font-normal text-ink/65">$85K</strong>.
          Also available for drone photography and web projects.
        </p>

        {/* Links */}
        <div className="reveal d3 flex flex-col gap-2 max-w-sm">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel={l.href.startsWith("mailto") ? undefined : "noreferrer"}
              className="flex items-center justify-between px-4 py-3 border border-ink/[0.08]
                         hover:border-ink/20 hover:bg-ink/[0.03] transition-all duration-200 group"
            >
              <span className="font-body font-light text-[0.82rem] text-ink/60 group-hover:text-ink/90 transition-colors duration-200">
                {l.label}
              </span>
              <span className="font-mono text-[0.46rem] tracking-[0.1em] text-ink/25">
                {l.sub} ↗
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="reveal d4 font-mono text-[0.44rem] tracking-[0.22em] uppercase text-ink/14 mt-14">
          Andrew Coutinho · Pittsburgh, PA · US / UK Citizen · {new Date().getFullYear()}
        </p>

      </div>
    </section>
  );
}
