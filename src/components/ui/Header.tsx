const links = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Work",       href: "#work"       },
  { label: "Contact",    href: "#contact"    },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-10 py-7">
      <a
        href="#hero"
        className="font-body text-sm tracking-widest text-ink/40 hover:text-ink/80 transition-colors duration-300"
      >
        AC
      </a>
      <nav className="flex gap-8">
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
    </header>
  );
}
