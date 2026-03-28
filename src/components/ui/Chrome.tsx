"use client";

interface ChromeProps {
  onScrollTo: (id: string) => void;
}

const navLinks = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export default function Chrome({ onScrollTo }: ChromeProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[600] flex items-center justify-between px-10 py-7"
      style={{ opacity: 0, animation: "fadeIn 0.8s 0.3s forwards" }}
    >
      {/* Logo */}
      <button
        onClick={() => onScrollTo("hero")}
        data-cursor
        className="font-display font-light text-[1.1rem] tracking-[0.1em] text-cream-200/55
                   hover:text-cream-100 transition-colors duration-300"
      >
        AC
      </button>

      {/* Nav links */}
      <nav className="flex items-center gap-8">
        {navLinks.map((l) => (
          <button
            key={l.id}
            onClick={() => onScrollTo(l.id)}
            data-cursor
            className="font-mono text-[0.5rem] tracking-[0.28em] uppercase text-cream-200/35
                       hover:text-cream-200/80 transition-colors duration-300"
          >
            {l.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
