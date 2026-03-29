"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WorldScene = dynamic(() => import("@/components/3d/WorldScene"), {
  ssr: false,
  loading: () => null,
});

/* ─── Constants ────────────────────────────────────────────── */
const SECTION_LABELS = ["Home", "About", "Skills", "Experience", "Work", "Contact"];
const N = SECTION_LABELS.length; // 6

/* ─── Scroll hook – reads window.scrollY, drives panels ────── */
function useScrollProgress() {
  const [progress,      setProgress]      = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p     = total > 0 ? Math.min(window.scrollY / total, 1) : 0;
      setProgress(p);
      setActiveSection(Math.round(p * (N - 1)));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollToSection = (n: number) => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (n / (N - 1)) * total, behavior: "smooth" });
  };

  return { progress, activeSection, scrollToSection };
}

/* ─── Panel chrome ─────────────────────────────────────────── */
function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-[0.48rem] tracking-[0.32em] uppercase text-sky mb-5 flex items-center gap-2">
      <span className="block w-4 h-px bg-sky" />
      {children}
    </p>
  );
}

function Tag({ children, color = "sky" }: { children: string; color?: "sky" | "amber" }) {
  return (
    <span
      className={`font-mono text-[0.42rem] tracking-[0.08em] uppercase px-2.5 py-1.5 border transition-colors duration-200 ${
        color === "sky"
          ? "border-sky/15 text-ink/35 hover:border-sky/40 hover:text-ink/65"
          : "border-amber/15 text-ink/35 hover:border-amber/40 hover:text-ink/65"
      }`}
    >
      {children}
    </span>
  );
}

/* ─── ── ─── ── ─── PANEL 0: HERO ─── ── ─── ── ─── ─── ──── */
function HeroPanel({ scrollTo }: { scrollTo: (n: number) => void }) {
  return (
    <div>
      <p className="font-mono text-[0.44rem] uppercase tracking-[0.32em] text-sky/65 mb-5 flex items-center gap-3">
        <span className="block w-5 h-px bg-sky/40" />
        Product Manager · Strategist · Creative Director
      </p>

      <h1 className="font-display text-[clamp(4.2rem,9vw,9rem)] leading-[0.87] tracking-[0.03em] text-ink mb-6">
        Andrew
        <br />
        Coutinho
      </h1>

      <p className="font-body font-light text-[0.88rem] text-ink/40 leading-relaxed mb-8 max-w-xs">
        Building at the intersection of creative media,
        <br />
        global community, and economic thinking.
      </p>

      <div className="flex flex-wrap gap-3 mb-10">
        <button
          onClick={() => scrollTo(4)}
          className="font-mono text-[0.48rem] tracking-[0.2em] uppercase px-5 py-3 bg-sky text-bg hover:bg-sky/80 transition-colors duration-200"
        >
          See Work ↓
        </button>
        <button
          onClick={() => scrollTo(5)}
          className="font-mono text-[0.48rem] tracking-[0.2em] uppercase px-5 py-3 border border-ink/20 text-ink/50 hover:text-ink/80 hover:border-ink/40 transition-colors duration-200"
        >
          Get in Touch
        </button>
      </div>

      <p className="font-mono text-[0.44rem] uppercase tracking-[0.3em] text-ink/14 flex items-center gap-3">
        <span className="block w-5 h-px bg-ink/10" />
        Pittsburgh, PA · Open to Opportunities
      </p>
    </div>
  );
}

/* ─── ── ─── ── ─── PANEL 1: ABOUT ─── ── ─── ── ─── ─── ─── */
const education = [
  { inst: "University of Pittsburgh",  deg: "B.A. Economics & Africana Studies · May 2025"  },
  { inst: "Fulbright-Hays Scholar",    deg: "MS Training Centre · Arusha, Tanzania · 2023"  },
];
const stats = [
  { n: "10+",  l: "Universities\nNCBO"      },
  { n: "100+", l: "Club Members\nBuilt"     },
  { n: "11",   l: "Countries\n4 Continents" },
  { n: "FAA",  l: "Part 107\nLicensed"      },
];

function AboutPanel() {
  return (
    <div>
      <SectionLabel>About</SectionLabel>

      <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-[0.04em] text-ink mb-6">
        Multi-disciplinary thinker with a{" "}
        <span className="text-amber">global lens</span>
      </h2>

      <p className="font-body font-light text-[0.86rem] text-ink/50 leading-[1.85] mb-3">
        Pitt-educated in{" "}
        <strong className="font-medium text-ink/80">Economics & Africana Studies</strong>,
        I bring analytical rigor to creative and operational work.{" "}
        <strong className="font-medium text-ink/80">Curator-elect</strong> of Global Shapers
        Pittsburgh (WEF) · Founder of{" "}
        <strong className="font-medium text-ink/80">ASF Visuals LLC</strong> ·{" "}
        <strong className="font-medium text-ink/80">Fulbright-Hays Scholar</strong>, Tanzania 2023.
      </p>

      <p className="font-mono text-[0.48rem] tracking-[0.28em] uppercase text-sky mt-6 mb-3 flex items-center gap-2">
        <span className="block w-4 h-px bg-sky" /> Education
      </p>
      <div className="flex flex-col gap-2 mb-6">
        {education.map((e) => (
          <div key={e.inst} className="pl-4 py-1.5 border-l-2 border-sky/20 hover:border-sky transition-colors duration-300">
            <div className="font-body text-[0.9rem] text-ink">{e.inst}</div>
            <div className="font-body font-light text-[0.7rem] text-ink/30 mt-0.5">{e.deg}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {stats.map((s) => (
          <div key={s.n} className="p-3 border border-ink/[0.07] bg-bg/50">
            <div className="font-display text-[1.8rem] text-amber leading-none mb-1">{s.n}</div>
            <div className="font-mono text-[0.4rem] tracking-[0.15em] uppercase text-ink/22 whitespace-pre-line leading-relaxed">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ── ─── ── ─── PANEL 2: SKILLS ─── ── ─── ── ─── ─── ── */
const skillSets: { label: string; color: "sky" | "amber"; items: string[] }[] = [
  {
    label: "Product Management", color: "sky",
    items: ["Roadmapping", "User Research", "Stakeholder Mgmt", "Data Analysis", "Agile / Scrum", "A/B Testing", "OKRs & KPIs"],
  },
  {
    label: "Creative & Media", color: "amber",
    items: ["Drone Cinematography", "Commercial Photography", "Video Production", "Brand Identity", "Web Design", "SEO"],
  },
  {
    label: "Technical", color: "sky",
    items: ["Next.js / React", "TypeScript", "Supabase", "Tailwind CSS", "Python", "SQL", "Git"],
  },
  {
    label: "Leadership", color: "amber",
    items: ["Community Building", "WEF Global Shapers", "Team Management", "International Ops", "Public Speaking"],
  },
];

function SkillsPanel() {
  return (
    <div>
      <SectionLabel>Skills</SectionLabel>
      <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[0.04em] text-ink mb-8">
        Tools I bring to the <span className="text-amber">table</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skillSets.map((cat) => (
          <div key={cat.label}>
            <p className={`font-mono text-[0.44rem] tracking-[0.2em] uppercase mb-2.5 flex items-center gap-2 ${cat.color === "sky" ? "text-sky" : "text-amber"}`}>
              <span className={`block w-4 h-px ${cat.color === "sky" ? "bg-sky" : "bg-amber"}`} />
              {cat.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <Tag key={item} color={cat.color}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ── ─── PANEL 3: EXPERIENCE ─── ── ─── ── ─── ─── ─── ── */
const jobs = [
  {
    yr:    "Apr 2024 — Present",
    title: "Vice Curator → Curator-elect",
    org:   "Global Shapers Community · WEF",
    note:  "Led recruitment, events & strategy for Pittsburgh Hub. Represented Pittsburgh at WEF Annual Summit in Geneva.",
    tags:  ["Leadership", "WEF"],
  },
  {
    yr:    "Oct 2022 — Present",
    title: "Founder & Creative Director",
    org:   "ASF Visuals LLC",
    note:  "Certified drone media business — photography, video, web. Clients include D1 Pitt Athletics, CRE firms, and civic orgs.",
    tags:  ["Founding", "Creative"],
  },
  {
    yr:    "Aug 2024 — May 2025",
    title: "Global Experience Advisor",
    org:   "University of Pittsburgh",
    note:  "Guided students through study abroad. Improved engagement 30%. Streamlined advising workflows.",
    tags:  ["Advising", "Ops"],
  },
  {
    yr:    "Jul — Aug 2023",
    title: "Cyber Security Analyst",
    org:   "Robin Home Care · London, UK",
    note:  "Secured data per UK regulations. VPN and password management systems company-wide.",
    tags:  ["Security"],
  },
  {
    yr:    "Jan 2022 — Nov 2024",
    title: "Founder & President",
    org:   "Bodybuilding Club at Pitt / NCBO",
    note:  "0 → 100+ members, 200% social growth. Co-founded NCBO connecting 10+ universities.",
    tags:  ["Founding", "Growth"],
  },
];

function ExperiencePanel() {
  return (
    <div>
      <SectionLabel>Experience</SectionLabel>
      <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[0.04em] text-ink mb-7">
        Where I&apos;ve led and <span className="text-amber">built</span>
      </h2>
      <div className="flex flex-col divide-y divide-ink/[0.07]">
        {jobs.map((j, i) => (
          <div key={i} className="py-4 grid grid-cols-[80px_1fr] gap-x-4 items-start">
            <span className="font-mono text-[0.42rem] text-ink/18 leading-relaxed mt-0.5">{j.yr}</span>
            <div>
              <div className="font-body text-[0.95rem] text-ink mb-0.5">{j.title}</div>
              <div className="font-mono text-[0.44rem] uppercase tracking-[0.1em] text-sky mb-1">{j.org}</div>
              <div className="font-body font-light text-[0.76rem] text-ink/38 leading-[1.75]">{j.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ── ─── ── ─── PANEL 4: WORK ─── ── ─── ── ─── ─── ─── */
type ProjectDetails = {
  description: string; role: string; deliverables: string[];
  impact?: string; year: string; tech?: string[];
};
type Project = {
  n: string; featured: boolean; category: string; title: string;
  body: string; href: string | null; details: ProjectDetails;
};

const projects: Project[] = [
  {
    n: "00", featured: true,
    category: "Creative Agency · Founded 2022",
    title: "ASF Visuals LLC",
    body: "Photo · Video · Drone · Web · SEO. FAA Part 107 licensed.",
    href: "https://asfvisualsllc.com",
    details: {
      description: "Founded and operate a full-service creative media agency in Pittsburgh. Grew from zero to an active client roster spanning sports, real estate, civic organizations, and professional services.",
      role: "Founder & Creative Director", year: "2022 – Present",
      deliverables: ["FAA Part 107 drone videography & aerial photography", "Commercial & event photography", "Web design & development (Next.js, Supabase)", "Local SEO strategy & execution", "Brand identity & creative direction"],
      impact: "D1 Pitt Athletics client · 7+ active accounts · 4+ years of operation",
      tech: ["Next.js", "React", "Supabase", "Tailwind CSS", "DJI", "Sony Alpha"],
    },
  },
  {
    n: "01", featured: false,
    category: "Sports Photography & Drone",
    title: "University of Pittsburgh D1 Athletics",
    body: "On-field photography and drone videography for Pitt Soccer.",
    href: "https://youtube.com/@ASFVisualsLLC",
    details: {
      description: "Contracted by Pitt Athletics to capture match-day moments and aerial drone content for Men's and Women's Soccer programs.",
      role: "Lead Photographer & Drone Operator", year: "2023 – 2024",
      deliverables: ["Match-day field photography", "Aerial drone videography", "Social media content packages", "Highlight reels"],
      impact: "Content featured across official Pitt Athletics social channels",
      tech: ["DJI Mavic 3", "Sony Alpha Series"],
    },
  },
  {
    n: "02", featured: false,
    category: "Web + Photography",
    title: "Pittsburgh Prestige Remodeling",
    body: "Full site with Supabase gallery CMS across four project categories.",
    href: "https://prestigepgh.com",
    details: {
      description: "Built a complete web presence with custom CMS-powered photo gallery and client admin portal.",
      role: "Web Developer & Photographer", year: "2023",
      deliverables: ["Custom website (Next.js + Supabase)", "Admin CMS for gallery management", "Photography across 4 project categories", "SEO setup"],
      tech: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
    },
  },
  {
    n: "03", featured: false,
    category: "Web Design",
    title: "Aqua Design Collective",
    body: "Dark design system, Supabase CMS, client admin portal.",
    href: "https://aquadesigncollective.com",
    details: {
      description: "Designed and developed a dark-themed website with a custom CMS and secure client admin portal.",
      role: "Web Developer & Designer", year: "2023 – 2024",
      deliverables: ["Custom dark design system", "Supabase CMS integration", "Admin portal with authentication", "Portfolio showcase"],
      tech: ["Next.js", "Supabase", "Auth.js", "Tailwind CSS"],
    },
  },
  {
    n: "04", featured: false,
    category: "Commercial Real Estate",
    title: "S&G Asset Group LLC",
    body: "CRE photography across two properties — listing assets and drone aerials.",
    href: null,
    details: {
      description: "Delivered interior, exterior, and aerial drone content across two commercial properties.",
      role: "Commercial Photographer & Drone Operator", year: "2023",
      deliverables: ["Interior photography", "Exterior photography", "Aerial drone photography", "Listing-ready delivery"],
      tech: ["DJI Air 3", "Sony Alpha"],
    },
  },
  {
    n: "05", featured: false,
    category: "Event Photography",
    title: "Allegheny Sport & Outdoor",
    body: "Two-day coverage of Pittsburgh's premier outdoor & sport industry summit.",
    href: null,
    details: {
      description: "Full two-day photography coverage of Pittsburgh's premier outdoor and sport industry summit.",
      role: "Event Photographer", year: "2024",
      deliverables: ["Keynote & panel photography", "Networking session coverage", "Brand activation shots", "Edited delivery within 48h"],
    },
  },
  {
    n: "06", featured: false,
    category: "Civic Event Photography",
    title: "Global Shapers Pittsburgh Hub",
    body: "WEF Hub events, community initiatives, and leadership programming.",
    href: null,
    details: {
      description: "As both a Hub leader and embedded photographer, documented events, community programs, and leadership initiatives.",
      role: "Photographer & Hub Leader", year: "2022 – Present",
      deliverables: ["Event & programming photography", "Community documentation", "Social media content", "WEF reporting assets"],
      impact: "Featured in WEF international Hub communications",
    },
  },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-bg/90 backdrop-blur-md" />
      <motion.div
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        className="relative z-10 w-full md:max-w-xl bg-[#111118] border border-ink/[0.1] max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 border-b border-ink/[0.07]">
          <div>
            <p className="font-mono text-[0.42rem] uppercase tracking-[0.18em] text-amber/70 mb-1.5">{project.category}</p>
            <h3 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-ink leading-tight">{project.title}</h3>
          </div>
          <button onClick={onClose} className="font-mono text-[0.48rem] text-ink/22 hover:text-ink/55 transition-colors ml-4 mt-1 shrink-0">[ESC]</button>
        </div>
        <div className="p-6 flex flex-col gap-5">
          <div className="flex gap-8">
            <div>
              <p className="font-mono text-[0.4rem] uppercase tracking-[0.15em] text-ink/22 mb-1">Year</p>
              <p className="font-body text-[0.83rem] text-ink/65">{project.details.year}</p>
            </div>
            <div>
              <p className="font-mono text-[0.4rem] uppercase tracking-[0.15em] text-ink/22 mb-1">Role</p>
              <p className="font-body text-[0.83rem] text-ink/65">{project.details.role}</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[0.42rem] uppercase tracking-[0.15em] text-sky mb-2 flex items-center gap-2">
              <span className="block w-4 h-px bg-sky" /> Overview
            </p>
            <p className="font-body font-light text-[0.83rem] text-ink/50 leading-[1.85]">{project.details.description}</p>
          </div>
          <div>
            <p className="font-mono text-[0.42rem] uppercase tracking-[0.15em] text-sky mb-2.5 flex items-center gap-2">
              <span className="block w-4 h-px bg-sky" /> Deliverables
            </p>
            <ul className="flex flex-col gap-1.5">
              {project.details.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 font-body font-light text-[0.8rem] text-ink/45">
                  <span className="text-amber/60 mt-0.5 shrink-0">—</span>{d}
                </li>
              ))}
            </ul>
          </div>
          {project.details.impact && (
            <div className="pl-4 py-2.5 border-l-2 border-amber/25">
              <p className="font-mono text-[0.4rem] uppercase tracking-[0.15em] text-amber/60 mb-1">Impact</p>
              <p className="font-body font-light text-[0.8rem] text-ink/50">{project.details.impact}</p>
            </div>
          )}
          {project.details.tech && (
            <div>
              <p className="font-mono text-[0.42rem] uppercase tracking-[0.15em] text-sky mb-2 flex items-center gap-2">
                <span className="block w-4 h-px bg-sky" /> Tools & Tech
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.details.tech.map((t) => (
                  <span key={t} className="font-mono text-[0.4rem] uppercase tracking-[0.1em] px-2 py-1.5 border border-ink/10 text-ink/28">{t}</span>
                ))}
              </div>
            </div>
          )}
          {project.href && (
            <a href={project.href} target="_blank" rel="noreferrer"
              className="flex items-center justify-between px-4 py-3.5 border border-sky/20 hover:border-sky/50 hover:bg-sky/[0.04] transition-all duration-200 group mt-1"
            >
              <span className="font-mono text-[0.48rem] uppercase tracking-[0.15em] text-sky/55 group-hover:text-sky transition-colors">Visit Project</span>
              <span className="text-sky/40 group-hover:text-sky transition-colors">↗</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function WorkPanel() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <>
      <div>
        <SectionLabel>Selected Work</SectionLabel>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[0.04em] text-ink mb-2">
          Projects &amp; <span className="text-amber">collaborations</span>
        </h2>
        <p className="font-body font-light text-[0.72rem] text-ink/28 mb-6 italic">Click any project for full details</p>
        <div className="flex flex-col divide-y divide-ink/[0.07]">
          {projects.map((p) => (
            <button
              key={p.n}
              onClick={() => setActive(p)}
              className="w-full text-left flex items-center gap-4 py-3.5 hover:bg-ink/[0.03] transition-colors duration-200 group -mx-2 px-2"
            >
              <span className="font-mono text-[0.44rem] text-ink/18 w-7 shrink-0">{p.n}</span>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[0.42rem] uppercase tracking-[0.12em] text-amber/60 mb-0.5">{p.category}</p>
                <p className={`font-body text-ink group-hover:text-sky transition-colors duration-200 leading-snug ${p.featured ? "text-[1.05rem]" : "text-[0.92rem]"}`}>{p.title}</p>
              </div>
              <span className="text-sky/28 group-hover:text-sky/70 transition-colors text-sm shrink-0">↗</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal key={active.n} project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── ── ─── ── ─── PANEL 5: CONTACT ─── ── ─── ── ─── ─── ── */
const contactLinks = [
  { label: "Email",       sub: "coutinhodrew@gmail.com",  href: "mailto:coutinhodrew@gmail.com"           },
  { label: "LinkedIn",    sub: "/in/andrew-coutinho",     href: "https://linkedin.com/in/andrew-coutinho"  },
  { label: "Instagram",   sub: "@asfvisuals",             href: "https://instagram.com/asfvisuals"        },
  { label: "YouTube",     sub: "ASF Visuals LLC",         href: "https://youtube.com/@ASFVisualsLLC"      },
  { label: "ASF Visuals", sub: "asfvisualsllc.com",       href: "https://asfvisualsllc.com"               },
];

function ContactPanel() {
  return (
    <div>
      <SectionLabel>Contact</SectionLabel>
      <h2 className="font-display text-[clamp(2.8rem,6vw,6.5rem)] leading-none tracking-[0.03em] text-ink mb-3">
        Let&apos;s build
        <br />
        <span className="text-amber">something.</span>
      </h2>
      <p className="font-body font-light text-[0.84rem] text-ink/38 leading-loose mb-7 max-w-xs">
        Open to PM, marketing ops, and creative media roles above{" "}
        <strong className="font-normal text-ink/65">$85K</strong>.
      </p>
      <div className="flex flex-col gap-1.5 max-w-xs">
        {contactLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("mailto") ? undefined : "_blank"}
            rel={l.href.startsWith("mailto") ? undefined : "noreferrer"}
            className="flex items-center justify-between px-4 py-3 border border-ink/[0.08] hover:border-sky/30 hover:bg-sky/[0.03] transition-all duration-200 group"
          >
            <span className="font-body font-light text-[0.82rem] text-ink/55 group-hover:text-ink/85 transition-colors">{l.label}</span>
            <span className="font-mono text-[0.44rem] tracking-[0.1em] text-ink/22 group-hover:text-sky/50 transition-colors">{l.sub} ↗</span>
          </a>
        ))}
      </div>
      <p className="font-mono text-[0.42rem] tracking-[0.22em] uppercase text-ink/12 mt-10">
        Andrew Coutinho · Pittsburgh, PA · US / UK Citizen · {new Date().getFullYear()}
      </p>
    </div>
  );
}

/* ─── Panel animation wrapper ──────────────────────────────── */
const panelVariants = {
  enter: { opacity: 0, y: 18,  scale: 0.98 },
  show:  { opacity: 1, y: 0,   scale: 1    },
  exit:  { opacity: 0, y: -12, scale: 0.99 },
};

/* ─── Main component ───────────────────────────────────────── */
export default function ImmersivePortfolio() {
  const { progress, activeSection, scrollToSection } = useScrollProgress();

  const panels = [
    <HeroPanel       key="hero"       scrollTo={scrollToSection} />,
    <AboutPanel      key="about"      />,
    <SkillsPanel     key="skills"     />,
    <ExperiencePanel key="experience" />,
    <WorkPanel       key="work"       />,
    <ContactPanel    key="contact"    />,
  ];

  return (
    <>
      {/* ── Scroll driver – creates the scrollable height ── */}
      <div style={{ height: "600vh" }} aria-hidden="true" />

      {/* ── Fixed 3D canvas – full screen background ── */}
      <div className="fixed inset-0 z-0">
        <WorldScene />
      </div>

      {/* ── Content panel – left on desktop, bottom on mobile ── */}
      <div className="fixed inset-x-0 bottom-0 md:inset-y-0 md:left-0 md:right-auto md:w-[46%] z-10 flex items-end md:items-center px-4 pb-6 md:px-12 md:pb-0 pointer-events-none">
        <div className="w-full max-h-[62vh] md:max-h-[80vh] overflow-y-auto pointer-events-auto panel-scroll">
          {/* Glass card */}
          <div className="bg-bg/80 backdrop-blur-2xl border border-ink/[0.07] p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                variants={panelVariants}
                initial="enter"
                animate="show"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {panels[activeSection]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Section dots – right side on desktop ── */}
      <nav
        className="fixed right-5 md:right-7 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3 items-center"
        aria-label="Section navigation"
      >
        {SECTION_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            title={label}
            aria-label={`Go to ${label}`}
            className={`rounded-full transition-all duration-400 ${
              activeSection === i
                ? "w-1.5 h-5 bg-sky"
                : "w-1.5 h-1.5 bg-ink/22 hover:bg-ink/45"
            }`}
          />
        ))}
      </nav>

      {/* ── Section label + counter – top right on desktop ── */}
      <div className="fixed top-20 right-5 md:right-8 z-20 hidden md:block text-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-mono text-[0.44rem] uppercase tracking-[0.3em] text-ink/22">
              {SECTION_LABELS[activeSection]}
            </p>
            <p className="font-mono text-[0.38rem] tracking-[0.2em] text-ink/10 mt-0.5">
              0{activeSection + 1} / 0{N}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Mobile: section dots along top (below header) ── */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 md:hidden">
        {SECTION_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            aria-label={label}
            className={`rounded-full transition-all duration-300 ${
              activeSection === i ? "w-5 h-1.5 bg-sky" : "w-1.5 h-1.5 bg-ink/22"
            }`}
          />
        ))}
      </div>

      {/* ── Progress bar – very bottom ── */}
      <div className="fixed bottom-0 left-0 right-0 h-px z-30 bg-ink/5" aria-hidden="true">
        <div className="h-full bg-sky/35" style={{ width: `${progress * 100}%` }} />
      </div>
    </>
  );
}
