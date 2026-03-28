"use client";
import { useEffect } from "react";
import { useStore, SECTIONS } from "@/store";
import { SECTION_LABELS } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ChromeProps {
  onNavigate: (i: number) => void;
}

export default function Chrome({ onNavigate }: ChromeProps) {
  const { currentSection, isDark, toggleTheme } = useStore();
  const total = SECTIONS.length;
  const progress = (currentSection / (total - 1)) * 100;
  const isLast = currentSection === total - 1;

  return (
    <>
      {/* Logo — top left */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate(0); }}
        className={cn(
          "fixed top-9 left-12 z-[600] font-display text-[1rem] font-normal tracking-[0.05em] transition-colors duration-300",
          isDark ? "text-cream-100" : "text-brown-800"
        )}
        style={{ opacity: 0, animation: "fadeIn 0.7s 0.2s forwards" }}
      >
        AC
      </a>

      {/* Section label + index — top right */}
      <div
        className="fixed top-9 right-12 z-[600] flex items-center gap-5"
        style={{ opacity: 0, animation: "fadeIn 0.7s 0.4s forwards" }}
      >
        <span className={cn(
          "font-mono text-[0.56rem] tracking-[0.22em] uppercase transition-colors duration-300",
          isDark ? "text-cream-200/40" : "text-brown-800/35"
        )}>
          {SECTION_LABELS[currentSection]}
        </span>
        <span className={cn(
          "font-mono text-[0.56rem] tracking-[0.15em] transition-colors duration-300",
          isDark ? "text-cream-200/20" : "text-brown-800/25"
        )}>
          {String(currentSection + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={cn(
            "w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-all duration-300",
            isDark
              ? "border-cream-200/20 text-cream-200/50 hover:border-cream-200/50 hover:text-cream-200"
              : "border-brown-800/15 text-brown-800/40 hover:border-brown-800/40 hover:text-brown-800"
          )}
          data-cursor
          aria-label="Toggle theme"
        >
          {isDark ? "☀" : "☾"}
        </button>
      </div>

      {/* Progress rail — right edge */}
      <div className={cn(
        "fixed right-0 top-0 bottom-0 w-[2px] z-[600] transition-colors duration-300",
        isDark ? "bg-cream-200/10" : "bg-brown-800/08"
      )}>
        <div
          className="w-full bg-terra transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Dot nav — right side center */}
      <div
        className="fixed right-5 top-1/2 -translate-y-1/2 z-[600] flex flex-col gap-[10px]"
        style={{ opacity: 0, animation: "fadeIn 0.7s 0.8s forwards" }}
      >
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            data-cursor
            aria-label={SECTION_LABELS[i]}
            className={cn(
              "rounded-full transition-all duration-400",
              i === currentSection
                ? "bg-terra w-[4px] h-[18px] rounded-[2px]"
                : cn(
                    "w-[4px] h-[4px]",
                    isDark ? "bg-cream-200/20 hover:bg-cream-200/50" : "bg-brown-800/20 hover:bg-brown-800/40"
                  )
            )}
          />
        ))}
      </div>

      {/* Chevron — bottom center */}
      <div
        className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 z-[600] flex flex-col items-center gap-1 transition-opacity duration-500",
          isLast ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        style={{ opacity: 0, animation: isLast ? "none" : "fadeIn 0.7s 1.4s forwards" }}
      >
        <div className="chevron-bounce flex flex-col items-center gap-[3px]">
          <ChevronIcon dim={isDark} />
          <ChevronIcon dim={isDark} faint />
        </div>
        <span className={cn(
          "font-mono text-[0.48rem] tracking-[0.28em] uppercase",
          isDark ? "text-cream-200/30" : "text-brown-800/30"
        )}>scroll</span>
      </div>
    </>
  );
}

function ChevronIcon({ dim, faint }: { dim?: boolean; faint?: boolean }) {
  return (
    <div className={cn("relative w-5 h-3", faint && "opacity-30")}>
      <div className={cn(
        "absolute w-[11px] h-[1.5px] left-[1px] top-[5px] rotate-[40deg] transition-colors duration-300",
        dim ? "bg-cream-200/40" : "bg-brown-800/35"
      )} />
      <div className={cn(
        "absolute w-[11px] h-[1.5px] right-[1px] top-[5px] -rotate-[40deg] transition-colors duration-300",
        dim ? "bg-cream-200/40" : "bg-brown-800/35"
      )} />
    </div>
  );
}
