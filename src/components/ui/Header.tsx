"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About",      href: "#about",      num: "01" },
  { label: "Experience", href: "#experience", num: "02" },
  { label: "Work",       href: "#work",       num: "03" },
  { label: "Contact",    href: "#contact",    num: "04" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 transition-all duration-500 ${
          scrolled || open ? "bg-bg/90 backdrop-blur-md" : ""
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => setOpen(false)}
          className="font-body text-sm tracking-widest text-ink/45 hover:text-ink/80 transition-colors duration-300 relative z-50"
        >
          AC
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[0.5rem] tracking-[0.26em] uppercase text-ink/25 hover:text-ink/65 transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Hamburger – mobile only */}
        <button
          className="md:hidden relative z-50 flex flex-col gap-[5px] p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <motion.span
            className="block w-6 h-px bg-ink/55 origin-center"
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-6 h-px bg-ink/55"
            animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-px bg-ink/55 origin-center"
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </header>

      {/* ── Mobile fullscreen overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.07 + i * 0.07, duration: 0.32 }}
                  className="group flex items-baseline gap-4"
                >
                  <span className="font-mono text-[0.42rem] tracking-[0.25em] text-ink/20 group-hover:text-sky/60 transition-colors duration-200">
                    {l.num}
                  </span>
                  <span className="font-display text-[clamp(3rem,14vw,5.5rem)] text-ink/80 group-hover:text-sky transition-colors duration-200 leading-none">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.38 }}
              className="absolute bottom-10 font-mono text-[0.42rem] tracking-[0.28em] uppercase text-ink/18"
            >
              Andrew Coutinho · Pittsburgh, PA
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
