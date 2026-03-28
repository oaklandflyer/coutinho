"use client";
import { useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useStore, SECTIONS } from "@/store";
import Chrome from "@/components/ui/Chrome";
import Cursor from "@/components/ui/Cursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

export default function Home() {
  const { setCurrentSection } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const sections = container.querySelectorAll("[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
            const i = parseInt(entry.target.getAttribute("data-section") ?? "0");
            if (i !== currentRef.current) {
              currentRef.current = i;
              setCurrentSection(i);
            }
          }
        });
      },
      { root: container, threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [setCurrentSection]);

  const navigateTo = useCallback((i: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-section="${i}"]`);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const cur = currentRef.current;
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        navigateTo(Math.min(cur + 1, SECTIONS.length - 1));
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        navigateTo(Math.max(cur - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigateTo]);

  return (
    <main className="relative w-full h-full bg-[#160f09]">
      <Cursor />
      <Scene />
      <Chrome onNavigate={navigateTo} />
      <div ref={scrollRef} className="snap-container relative z-10">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Contact />
      </div>
    </main>
  );
}
