"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { useStore, SECTIONS } from "@/store";
import Chrome from "@/components/ui/Chrome";
import Cursor from "@/components/ui/Cursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import { viewport } from "@/lib/viewport";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

// Section IDs for nav + intersection tracking
const SECTION_IDS = ["hero", "about", "experience", "work", "contact"];

export default function Home() {
  const { setCurrentSection } = useStore();
  const lenisRef = useRef<Lenis | null>(null);

  // ── Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Expose scrollY via viewport for 3D scene
    lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      viewport.scrollProgress = limit > 0 ? scroll / limit : 0;
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // ── Mouse tracking for 3D scene
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      viewport.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      viewport.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // ── Section intersection observer (for scene section morphing)
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            const idx = SECTION_IDS.indexOf(entry.target.id);
            if (idx !== -1) setCurrentSection(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s!));
    return () => observer.disconnect();
  }, [setCurrentSection]);

  // ── Reveal animations on scroll
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".section-full").forEach((s) => revealObserver.observe(s));
    return () => revealObserver.disconnect();
  }, []);

  // ── Nav helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) lenisRef.current?.scrollTo(el, { offset: 0 });
  };

  // ── Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const cur = SECTION_IDS.findIndex((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= -window.innerHeight / 2 && rect.top <= window.innerHeight / 2;
      });
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        const next = SECTION_IDS[Math.min(cur + 1, SECTION_IDS.length - 1)];
        if (next) scrollTo(next);
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        const prev = SECTION_IDS[Math.max(cur - 1, 0)];
        if (prev) scrollTo(prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="relative">
      <Cursor />
      <Scene />
      <Chrome onScrollTo={scrollTo} />

      <div id="hero"><Hero onScrollTo={scrollTo} /></div>
      <div id="about"><About /></div>
      <div id="experience"><Experience /></div>
      <div id="work"><Work /></div>
      <div id="contact"><Contact /></div>
    </main>
  );
}
