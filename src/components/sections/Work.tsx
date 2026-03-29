"use client";
import { useState, useEffect } from "react";
import { useReveal } from "@/lib/useReveal";
import { motion, AnimatePresence } from "framer-motion";

type ProjectDetails = {
  description: string;
  role: string;
  deliverables: string[];
  impact?: string;
  year: string;
  tech?: string[];
};

type Project = {
  n: string;
  featured: boolean;
  category: string;
  title: string;
  body: string;
  href: string | null;
  details: ProjectDetails;
};

const projects: Project[] = [
  {
    n: "00",
    featured: true,
    category: "Creative Agency · Founded 2022",
    title: "ASF Visuals LLC",
    body: "Photo · Video · Drone · Web · SEO. Certified drone media business serving D1 Athletics, CRE firms, and civic organizations. FAA Part 107 licensed.",
    href: "https://asfvisualsllc.com",
    details: {
      description:
        "Founded and operate a full-service creative media agency in Pittsburgh. Grew from zero to an active client roster spanning sports, real estate, civic organizations, and professional services. Manage end-to-end production, web development, SEO, and client relationships.",
      role: "Founder & Creative Director",
      deliverables: [
        "FAA Part 107 drone videography & aerial photography",
        "Commercial & event photography",
        "Web design & development (Next.js, Supabase)",
        "Local SEO strategy & execution",
        "Brand identity & creative direction",
      ],
      impact: "D1 Pitt Athletics client · 7+ active accounts · 4+ years of operation",
      year: "2022 – Present",
      tech: ["Next.js", "React", "Supabase", "Tailwind CSS", "DJI", "Sony Alpha"],
    },
  },
  {
    n: "01",
    featured: false,
    category: "Sports Photography & Drone",
    title: "University of Pittsburgh D1 Athletics",
    body: "On-field photography and drone videography for Pitt Men's & Women's Soccer.",
    href: "https://youtube.com/@ASFVisualsLLC",
    details: {
      description:
        "Contracted by Pitt Athletics to capture match-day moments and produce aerial drone content for Men's and Women's Soccer programs. Delivered professional-grade imagery for social media, recruitment, and archival use.",
      role: "Lead Photographer & Drone Operator",
      deliverables: [
        "Match-day field photography",
        "Aerial drone videography",
        "Social media content packages",
        "Highlight reels",
      ],
      impact: "Content featured across official Pitt Athletics social channels",
      year: "2023 – 2024",
      tech: ["DJI Mavic 3", "Sony Alpha Series"],
    },
  },
  {
    n: "02",
    featured: false,
    category: "Web + Photography",
    title: "Pittsburgh Prestige Remodeling",
    body: "Full site with Supabase gallery CMS. Photography across four project categories.",
    href: "https://prestigepgh.com",
    details: {
      description:
        "Built a complete web presence for a Pittsburgh remodeling firm, including a custom CMS-powered photo gallery with client admin portal. Photographed finished projects across kitchens, bathrooms, basements, and exteriors.",
      role: "Web Developer & Photographer",
      deliverables: [
        "Custom website (Next.js + Supabase)",
        "Admin CMS for gallery management",
        "Photography across 4 project categories",
        "SEO setup & metadata",
      ],
      year: "2023",
      tech: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
    },
  },
  {
    n: "03",
    featured: false,
    category: "Web Design",
    title: "Aqua Design Collective",
    body: "Dark design system, Supabase CMS, client admin portal.",
    href: "https://aquadesigncollective.com",
    details: {
      description:
        "Designed and developed a sleek dark-themed website for a design collective. Built a custom content management system with a secure client admin portal, empowering the client to manage portfolio content independently.",
      role: "Web Developer & Designer",
      deliverables: [
        "Custom dark design system",
        "Supabase CMS integration",
        "Admin portal with authentication",
        "Portfolio showcase & filtering",
      ],
      year: "2023 – 2024",
      tech: ["Next.js", "Supabase", "Auth.js", "Tailwind CSS"],
    },
  },
  {
    n: "04",
    featured: false,
    category: "Commercial Real Estate",
    title: "S&G Asset Group LLC",
    body: "CRE photography across two properties — listing assets and drone aerials.",
    href: null,
    details: {
      description:
        "Delivered comprehensive commercial real estate photography across two properties, producing interior, exterior, and aerial drone content ready for listing and marketing collateral.",
      role: "Commercial Photographer & Drone Operator",
      deliverables: [
        "Interior photography",
        "Exterior photography",
        "Aerial drone photography",
        "Editing & listing-ready delivery",
      ],
      year: "2023",
      tech: ["DJI Air 3", "Sony Alpha"],
    },
  },
  {
    n: "05",
    featured: false,
    category: "Event Photography",
    title: "Allegheny Sport & Outdoor",
    body: "Two-day coverage of Pittsburgh's premier outdoor & sport industry summit.",
    href: null,
    details: {
      description:
        "Provided full two-day photography coverage for Pittsburgh's premier outdoor and sport industry summit — capturing keynotes, panels, networking events, and brand activations.",
      role: "Event Photographer",
      deliverables: [
        "Keynote & panel photography",
        "Networking session coverage",
        "Brand activation shots",
        "Edited delivery within 48 hours",
      ],
      year: "2024",
    },
  },
  {
    n: "06",
    featured: false,
    category: "Civic Event Photography",
    title: "Global Shapers Pittsburgh Hub",
    body: "WEF Hub events, community initiatives, and leadership programming.",
    href: null,
    details: {
      description:
        "As both a Hub leader and embedded photographer, documented the Global Shapers Pittsburgh chapter across events, community programs, and leadership initiatives. Imagery used for WEF reporting, social media, and press.",
      role: "Photographer & Hub Leader",
      deliverables: [
        "Event & programming photography",
        "Community initiative documentation",
        "Social media content",
        "Press & WEF reporting assets",
      ],
      impact: "Featured in WEF international Hub communications",
      year: "2022 – Present",
    },
  },
];

/* ── Modal ─────────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg/88 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        className="relative z-10 w-full md:max-w-2xl bg-panel border border-ink/[0.1] max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 md:p-8 border-b border-ink/[0.07]">
          <div>
            <p className="font-mono text-[0.44rem] uppercase tracking-[0.18em] text-amber/70 mb-1.5">
              {project.category}
            </p>
            <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-ink leading-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[0.5rem] text-ink/22 hover:text-ink/55 transition-colors ml-4 mt-1 shrink-0"
          >
            [ESC]
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Meta row */}
          <div className="flex gap-8">
            <div>
              <p className="font-mono text-[0.42rem] uppercase tracking-[0.15em] text-ink/22 mb-1">Year</p>
              <p className="font-body text-[0.85rem] text-ink/65">{project.details.year}</p>
            </div>
            <div>
              <p className="font-mono text-[0.42rem] uppercase tracking-[0.15em] text-ink/22 mb-1">Role</p>
              <p className="font-body text-[0.85rem] text-ink/65">{project.details.role}</p>
            </div>
          </div>

          {/* Overview */}
          <div>
            <p className="font-mono text-[0.44rem] uppercase tracking-[0.15em] text-sky mb-2.5 flex items-center gap-2">
              <span className="block w-4 h-px bg-sky" /> Overview
            </p>
            <p className="font-body font-light text-[0.85rem] text-ink/52 leading-[1.85]">
              {project.details.description}
            </p>
          </div>

          {/* Deliverables */}
          <div>
            <p className="font-mono text-[0.44rem] uppercase tracking-[0.15em] text-sky mb-3 flex items-center gap-2">
              <span className="block w-4 h-px bg-sky" /> Deliverables
            </p>
            <ul className="flex flex-col gap-1.5">
              {project.details.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 font-body font-light text-[0.82rem] text-ink/48">
                  <span className="text-amber/60 mt-0.5 shrink-0">—</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          {project.details.impact && (
            <div className="pl-4 py-3 border-l-2 border-amber/25">
              <p className="font-mono text-[0.42rem] uppercase tracking-[0.15em] text-amber/60 mb-1">
                Impact
              </p>
              <p className="font-body font-light text-[0.82rem] text-ink/52">
                {project.details.impact}
              </p>
            </div>
          )}

          {/* Tech stack */}
          {project.details.tech && (
            <div>
              <p className="font-mono text-[0.44rem] uppercase tracking-[0.15em] text-sky mb-2.5 flex items-center gap-2">
                <span className="block w-4 h-px bg-sky" /> Tools & Tech
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.details.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.42rem] uppercase tracking-[0.1em] px-2.5 py-1.5 border border-ink/10 text-ink/28 hover:border-ink/20 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* External link */}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-4 py-3.5 border border-sky/20 hover:border-sky/50 hover:bg-sky/[0.04] transition-all duration-200 group mt-2"
            >
              <span className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-sky/55 group-hover:text-sky transition-colors">
                Visit Project
              </span>
              <span className="text-sky/40 group-hover:text-sky transition-colors text-sm">↗</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Work section ──────────────────────────────────────────── */
export default function Work() {
  const ref = useReveal();
  const [active, setActive] = useState<Project | null>(null);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <>
      <section ref={ref} id="work" className="min-h-screen flex items-center px-6 md:px-14 py-28">
        <div className="w-full max-w-5xl mx-auto">
          <p className="reveal font-mono text-[0.5rem] tracking-[0.32em] uppercase text-sky mb-8 flex items-center gap-2">
            <span className="block w-5 h-px bg-sky" /> Selected Work
          </p>

          <h2 className="reveal d1 font-display text-[clamp(2.4rem,4.5vw,5rem)] leading-none tracking-[0.04em] text-ink mb-12">
            Projects &amp; <span className="text-amber">collaborations</span>
          </h2>

          <p className="reveal d2 font-body font-light text-[0.78rem] text-ink/30 mb-8 italic">
            Click any project to see full details
          </p>

          <div className="border-t border-ink/[0.07]">
            {projects.map((p, i) => (
              <div
                key={p.n}
                className="reveal border-b border-ink/[0.07]"
                style={{ transitionDelay: `${i * 0.04}s` }}
              >
                <button
                  onClick={() => setActive(p)}
                  className="w-full text-left flex items-start gap-6 py-7 -mx-3 px-3 hover:bg-ink/[0.025] transition-colors duration-300 group"
                >
                  <span className="font-mono text-[0.48rem] text-ink/18 w-7 shrink-0 pt-1">
                    {p.n}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[0.48rem] uppercase tracking-[0.14em] text-amber/70 mb-1">
                      {p.category}
                    </p>
                    <div
                      className={`font-body font-normal text-ink group-hover:text-sky transition-colors duration-300 leading-snug mb-2 ${
                        p.featured ? "text-[1.45rem]" : "text-[1.1rem]"
                      }`}
                    >
                      {p.title}
                    </div>
                    <p className="font-body font-light text-[0.78rem] text-ink/38 leading-[1.8] max-w-xl">
                      {p.body}
                    </p>
                  </div>
                  <span className="font-mono text-[0.62rem] text-sky/28 group-hover:text-sky/60 transition-colors duration-300 shrink-0 mt-1">
                    ↗
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {active && (
          <ProjectModal key={active.n} project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
