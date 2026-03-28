"use client";
import { useStore, SECTIONS } from "@/store";
import { SECTION_LABELS } from "@/lib/utils";

interface ChromeProps {
  onNavigate: (i: number) => void;
}

export default function Chrome({ onNavigate }: ChromeProps) {
  const { currentSection } = useStore();
  const total = SECTIONS.length;
  const progress = (currentSection / (total - 1)) * 100;
  const isLast = currentSection === total - 1;

  return (
    <>
      {/* Logo — top left */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate(0); }}
        data-cursor
        className="fixed top-9 left-12 z-[600] font-display font-light text-[1.1rem] tracking-[0.08em] text-cream-200/60 hover:text-cream-100 transition-colors duration-400"
        style={{ opacity: 0, animation: "fadeIn 0.7s 0.2s forwards" }}
      >
        AC
      </a>

      {/* Counter + label — top right */}
      <div
        className="fixed top-9 right-12 z-[600] flex items-center gap-5"
        style={{ opacity: 0, animation: "fadeIn 0.7s 0.4s forwards" }}
      >
        <span className="font-mono text-[0.52rem] tracking-[0.24em] uppercase text-cream-200/28">
          {SECTION_LABELS[currentSection]}
        </span>
        <span className="font-mono text-[0.52rem] tracking-[0.12em] text-cream-200/18">
          {String(currentSection + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Progress rail — right edge */}
      <div className="fixed right-0 top-0 bottom-0 w-px z-[600] bg-cream-200/06">
        <div
          className="w-full bg-terra transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Dot nav — right */}
      <div
        className="fixed right-[18px] top-1/2 -translate-y-1/2 z-[600] flex flex-col gap-[9px]"
        style={{ opacity: 0, animation: "fadeIn 0.7s 0.9s forwards" }}
      >
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            data-cursor
            aria-label={SECTION_LABELS[i]}
            className={
              i === currentSection
                ? "block w-[3px] h-[15px] rounded-[2px] bg-terra transition-all duration-300"
                : "block w-[3px] h-[3px] rounded-full bg-cream-200/18 hover:bg-cream-200/45 transition-all duration-300"
            }
          />
        ))}
      </div>

      {/* Scroll indicator — bottom center */}
      <div
        className={`fixed bottom-7 left-1/2 -translate-x-1/2 z-[600] flex flex-col items-center gap-[6px] transition-opacity duration-500 ${isLast ? "opacity-0 pointer-events-none" : ""}`}
        style={{ opacity: 0, animation: isLast ? "none" : "fadeIn 0.7s 1.5s forwards" }}
      >
        <div className="chevron-bounce flex flex-col items-center gap-[4px]">
          <ChevronDown />
          <ChevronDown faint />
        </div>
        <span className="font-mono text-[0.44rem] tracking-[0.3em] uppercase text-cream-200/22">scroll</span>
      </div>
    </>
  );
}

function ChevronDown({ faint }: { faint?: boolean }) {
  return (
    <div className={`relative w-[18px] h-[10px] ${faint ? "opacity-25" : ""}`}>
      <div className="absolute w-[10px] h-px left-0 top-[4px] rotate-[38deg] bg-cream-200/35 origin-left" />
      <div className="absolute w-[10px] h-px right-0 top-[4px] -rotate-[38deg] bg-cream-200/35 origin-right" />
    </div>
  );
}
