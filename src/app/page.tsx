"use client";
import { useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useStore } from "@/store";
import Chrome from "@/components/ui/Chrome";
import Cursor from "@/components/ui/Cursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import { viewport } from "@/lib/viewport";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

const SECTION_IDS = ["hero", "about", "experience", "work", "contact"];

export default function Home() {
  const { setCurrentSection, setScrollProgress } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Scroll tracking → drives progress line + 3D scene
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      viewport.scrollProgress = p;
      setScrollProgress(p);
      // Update current section from scroll position
      const idx = Math.round(el.scrollTop / el.clientHeight);
      setCurrentSection(Math.max(0, Math.min(idx, SECTION_IDS.length - 1)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [setCurrentSection, setScrollProgress]);

  // ── Mouse tracking for 3D scene
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      viewport.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      viewport.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // ── Reveal animations on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Immediately reveal hero
    const heroSection = container.querySelector("#hero .section-full");
    if (heroSection) {
      heroSection.querySelectorAll(".reveal").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), 150 + i * 80);
      });
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { root: container, threshold: 0.15 }
    );
    container.querySelectorAll(".section-full").forEach((s) => revealObserver.observe(s));
    return () => revealObserver.disconnect();
  }, []);

  // ── Programmatic scroll helper
  const scrollTo = useCallback((id: string) => {
    const container = containerRef.current;
    if (!container) return;
    const idx = SECTION_IDS.indexOf(id);
    if (idx === -1) return;
    container.scrollTo({ top: idx * container.clientHeight, behavior: "smooth" });
  }, []);

  // ── Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(e.key)) return;
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;
      const cur = Math.round(container.scrollTop / container.clientHeight);
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        const next = Math.min(cur + 1, SECTION_IDS.length - 1);
        container.scrollTo({ top: next * container.clientHeight, behavior: "smooth" });
      } else {
        const prev = Math.max(cur - 1, 0);
        container.scrollTo({ top: prev * container.clientHeight, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="relative" style={{ height: "100vh", overflow: "hidden" }}>
      <Cursor />
      <Scene />
      <Chrome onScrollTo={scrollTo} />

      {/* Scroll snap container */}
      <div
        ref={containerRef}
        className="scroll-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div id="hero"       style={{ scrollSnapAlign: "start" }}><Hero onScrollTo={scrollTo} /></div>
        <div id="about"      style={{ scrollSnapAlign: "start" }}><About /></div>
        <div id="experience" style={{ scrollSnapAlign: "start" }}><Experience /></div>
        <div id="work"       style={{ scrollSnapAlign: "start" }}><Work /></div>
        <div id="contact"    style={{ scrollSnapAlign: "start" }}><Contact /></div>
      </div>
    </main>
  );
}
