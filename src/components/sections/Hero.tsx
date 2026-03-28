"use client";
import { useEffect, useRef } from "react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { isDark } = useStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el) => {
      setTimeout(() => el.classList.add("visible"), 100);
    });
  }, []);

  return (
    <section
      className="section-snap flex flex-col justify-end"
      data-section="0"
      style={{ padding: "0 52px 88px" }}
    >
      <div ref={ref} className="relative z-10 w-full">
        <p className={cn(
          "reveal font-mono text-[0.58rem] tracking-[0.28em] uppercase mb-5 flex items-center gap-3",
          isDark ? "text-cream-200/50" : "text-sand"
        )}>
          <span className={cn("block w-6 h-px", isDark ? "bg-cream-200/40" : "bg-sand")} />
          Pittsburgh, PA &nbsp;·&nbsp; Open to Opportunities
        </p>

        <h1 className={cn(
          "reveal d1 font-display font-light leading-[0.87] tracking-[-0.025em]",
          "text-[clamp(5.5rem,12vw,13.5rem)]",
          isDark ? "text-cream-100" : "text-brown-800"
        )}>
          Andrew<br />
          <em className={cn("not-italic", isDark ? "text-cream-200/45" : "text-terra")}>
            Coutinho.
          </em>
        </h1>

        <div className="reveal d2 mt-10 flex items-end justify-between w-full">
          <p className={cn(
            "font-body font-light text-[0.9rem] leading-[1.82] max-w-[380px]",
            isDark ? "text-cream-200/55" : "text-brown-800/65"
          )}>
            <strong className={cn("font-medium", isDark ? "text-cream-100" : "text-brown-800")}>
              Strategist. Founder. Aerial Photographer.
            </strong>
            <br />
            Building at the intersection of creative media,
            <br />global community, and economic thinking.
          </p>

          <a
            href="mailto:coutinhodrew@gmail.com"
            data-cursor
            className={cn(
              "font-mono text-[0.6rem] tracking-[0.2em] uppercase flex items-center gap-3 transition-all duration-300 group",
              isDark ? "text-terra-light" : "text-terra"
            )}
          >
            <span className={cn(
              "block h-px transition-all duration-300 group-hover:w-16",
              isDark ? "bg-terra-light w-10" : "bg-terra w-10"
            )} />
            Get in Touch
          </a>
        </div>
      </div>

      {/* Photo placeholder */}
      <div className={cn(
        "reveal d2 absolute bottom-20 right-12 w-[300px] aspect-[3/4] border flex flex-col items-center justify-center gap-3",
        isDark
          ? "bg-cream-200/5 border-cream-200/10"
          : "bg-brown-800/03 border-brown-800/10"
      )}>
        <div className={cn("absolute top-0 left-0 right-0 h-[2px]", "bg-terra")} />
        <span className="text-3xl opacity-20">🖼</span>
        <span className={cn(
          "font-mono text-[0.5rem] tracking-[0.18em] uppercase",
          isDark ? "text-cream-200/30" : "text-brown-800/30"
        )}>Photo — coming soon</span>
      </div>
    </section>
  );
}
