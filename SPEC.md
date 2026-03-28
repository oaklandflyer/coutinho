# Portfolio Redesign — Spec
> Written from the original prompt. Code should not be changed until this spec is approved.

---

## 0. Constraints and non-goals
- Keep **all existing content** (copy, dates, links, stat values). Only visuals change.
- No new pages or routes — single-page static export to GitHub Pages.
- No hamburger menu anywhere.
- No backwards-compat shims for removed code.

---

## 1. Design tokens

### Colors
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0e0d0b` | page background |
| `--bg-panel` | `#1a1a1a` | card / section variant |
| `--bg-panel2` | `#111110` | stat cells, inset surfaces |
| `--text` | `#e8e4dd` | primary text |
| `--text-dim` | `rgba(232,228,221,0.50)` | body copy |
| `--text-faint` | `rgba(232,228,221,0.22)` | labels, meta |
| `--accent` | `#4a9eff` | sky-blue — interactive, active |
| `--accent2` | `#c8873a` | amber/gold — display, stats |
| `--border` | `rgba(232,228,221,0.07)` | dividers |
| `--border-accent` | `rgba(74,158,255,0.25)` | highlight borders |

Light mode (`html.light`) overrides all tokens to an off-white palette. The toggle only adds/removes the `.light` class; no Tailwind `dark:` variants needed.

### Typography
| Role | Family | Weight | Size | Tracking |
|---|---|---|---|---|
| Display headings | Bebas Neue | 400 (only) | `clamp(6rem,13vw,14rem)` (hero); `clamp(2.4rem,4.5vw,5rem)` (section h2) | `0.04em` |
| Body | DM Sans | 300 / 400 | `0.88rem` | `0.02em` |
| Labels / tags / mono | DM Mono | 300 / 400 | `0.44–0.52rem` | `0.20–0.32em`, uppercase |

Google Fonts import (single `<link>` in `layout.tsx`):
```
Bebas+Neue & DM+Sans:ital,wght@0,300;0,400;0,500;1,300 & DM+Mono:wght@300;400
```
CSS variables: `--font-bebas`, `--font-dm-sans`, `--font-dm-mono`.

---

## 2. Navigation chrome

Remove the existing header (`Chrome.tsx`) entirely and replace with six fixed overlay elements, all `z-[600]`, all fade in after 350 ms delay via a `visible` state:

| Element | Position | Content |
|---|---|---|
| Logo | `fixed top-0 left-0` pad `28px 32px` | `"AC"` in DM Sans 300, clicks → hero |
| Section counter | `fixed top-0 right-0` pad `28px 32px` | `"01 / 05"` in DM Mono, desktop only |
| Theme toggle | Same row as counter | `☀` / `◐` icon, calls `toggleDark()` |
| Dot nav | `fixed right-22px top-50% translateY(-50%)` | 5 buttons, 44px hit target; inactive dot = 3×3 rounded, active = 3×22 pill; color `var(--accent)` when active; desktop only |
| Section name | `fixed bottom-28px left-32px` | `SECTION_LABELS[currentSection]` in DM Mono 0.44rem |
| Chevrons | `fixed bottom-22px left-50% translateX(-50%)` | Two stacked `<svg>` chevrons + "scroll" label; **hidden (`opacity:0`) when `currentSection === 4`**; chevron-bounce animation |
| Progress line | `fixed right-0 top-0` 1 px wide, full height | Track: `rgba(232,228,221,0.07)`, fill: `var(--accent)`, height = `scrollProgress * 100%`, `transition: height 0.45s` |
| Mobile bottom bar | `md:hidden fixed bottom-0` | Centered pill dots, same active/inactive logic as dot nav; `min-width/height: 44px` per button; gradient fade overlay |

**Store additions needed** (in `store/index.ts`):
- `scrollProgress: number` — set from scroll container `onScroll`
- `isDark: boolean` — default `true`
- `toggleDark()` — flips `isDark`, toggles `html.light` class

---

## 3. Scroll system

Replace Lenis with **native CSS scroll snap** on a container div:

```
<div ref={containerRef} className="scroll-container">  ← overflow-y:scroll, snap-type y mandatory, h-screen
  <div id="hero"       style={{scrollSnapAlign:"start"}}> ... </div>
  <div id="about"      style={{scrollSnapAlign:"start"}}> ... </div>
  ...
</div>
```

`page.tsx` responsibilities:
- `onScroll` → compute `scrollTop / (scrollHeight - clientHeight)` → `setScrollProgress`; compute `Math.round(scrollTop / clientHeight)` → `setCurrentSection`
- `scrollTo(id)` → `container.scrollTo({ top: idx * clientHeight, behavior:"smooth" })`
- Keyboard: `ArrowUp/Down`, `PageUp/Down` → `scrollTo` prev/next section
- Reveal animations: `IntersectionObserver` with `root: containerRef.current`, threshold 0.15, adds `.visible` to `.reveal` children
- Hero reveals fire immediately on mount (no observer needed)
- Remove all Lenis imports and RAF loop

Section divs keep `id` attributes for `scrollTo` lookup. `section-full` stays on the `<section>` element inside.

Mobile swipe: handled natively by `scroll-snap-type: y mandatory` + `-webkit-overflow-scrolling: touch`.

---

## 4. Three.js scene (`Scene.tsx`)

### Color changes
All terracotta (`#b85535`, `#d06b47`) → amber/gold (`#c8873a`, `#d4953f`).
Cream particles → sky-blue particles (`#4a9eff`, opacity 0.08).

### Globe
Keep existing lat/lon grid structure (18 longitude arcs, 9 latitude rings) on radius 2.6.
Grid line material: `color: 0xc8873a, opacity: 0.14`.
Wireframe shell: `color: 0xc8873a, opacity: 0.03`.

### Country dot markers
11 sky-blue glowing dots on globe surface, one per visited country:

| Country | lat | lon |
|---|---|---|
| USA (Pittsburgh) | 40.4 | -79.9 |
| UK (London) | 51.5 | -0.1 |
| Tanzania (Arusha) | -3.4 | 36.7 |
| Switzerland (Geneva) | 46.2 | 6.1 |
| France (Paris) | 48.9 | 2.3 |
| South Africa | -30.6 | 22.9 |
| Kenya | -1.3 | 36.8 |
| Brazil | -15.8 | -47.9 |
| Germany | 51.2 | 10.5 |
| Japan | 35.7 | 139.7 |
| India | 20.6 | 79.1 |

Conversion: `phi = (90−lat)*(π/180)`, `theta = (lon+180)*(π/180)`, then standard spherical → Cartesian.
Each marker: glow sphere (`r=0.07, opacity:0.18`) + core sphere (`r=0.034, opacity:0.9`), both `color:0x4a9eff`.

### Section configs (morphing targets)
```
hero:       x:1.1,  y:0.05, z:0,    scale:1.15, opacity:1.0
about:      x:0.5,  y:0.3,  z:-0.2, scale:0.9,  opacity:0.75
experience: x:1.3,  y:-0.2, z:-0.5, scale:0.78, opacity:0.5
work:       x:0.8,  y:0.2,  z:-0.2, scale:0.85, opacity:0.6
contact:    x:0.3,  y:-0.2, z:-0.7, scale:0.7,  opacity:0.4
```

### Particles
- `DustAmber`: 600 pts, `#c8873a`, size 0.015, opacity 0.28, slow +Y +X rotation
- `DustBlue`: 350 pts, `#4a9eff`, size 0.007, opacity 0.08, slow −Y +Z rotation
- `TopoRings`: 6 tori at `[-4,-2,-6]`, amber, very faint (0.022), slow Z rotation

---

## 5. Sections

### 5.1 Hero
Layout: `flex-row`. Left fills, right is photo placeholder (desktop only).

**Left:**
- `<h1>` in Bebas Neue, `clamp(6rem,13vw,14rem)`, `letter-spacing:0.035em`, `line-height:0.88`
- `"Andrew\nCoutinho"` — two lines, no period, no ghost opacity on surname
- Subtitle: DM Sans 300, `0.9rem`, `rgba(--text, 0.42)` — `"Strategist · Founder · Aerial Photographer"`
- Brief: DM Sans 300, `0.78rem`, `rgba(--text, 0.25)`
- Location tag: DM Mono, `0.44rem`, uppercase

**Right (hidden on mobile):**
- `230×295` box, `border: 1px solid var(--border-accent)`, `background: rgba(--accent, 0.03)`
- Four corner accent spans: `14×14`, `1.5px` lines in `var(--accent)`
- "Andrew Coutinho" label in DM Mono centered inside

**Scroll hint:** positioned `absolute bottom-7vh right-52px`; animated 1px line + "scroll" label above it.

### 5.2 About
Layout: `md:grid-cols-2`, `gap-12 lg:gap-20`, `max-w-1100 mx-auto`, vertically centered.

**Left col:** section label → Bebas Neue h2 → two bio paragraphs → Education subsection
Education blocks: `border-left: 2px solid rgba(--accent,0.2)` → `var(--accent)` on hover, `padding-left:16px`

**Right col:** 2×2 grid of stat cells
Each cell: `border: 1px solid var(--border)`, `background: var(--bg-panel2)`, pad `22px 20px`
Number: Bebas Neue, `clamp(2.6rem,4vw,4.2rem)`, `var(--accent2)`
Label: DM Mono, `0.48rem`, uppercase, `var(--text-faint)`, `white-space: pre-line`

### 5.3 Experience
Background: `var(--bg-panel)`. Vertically centered. `max-w-1100 mx-auto`.

Each row: `display:grid`, `grid-template-columns: 110px 1fr auto`, `gap:20px`
- **Year col**: DM Mono, `0.5rem`, `var(--text-faint)`
- **Content col**: title (DM Sans 400, `1.1rem`) → org (DM Mono, `0.5rem`, `var(--accent)`) → note (DM Sans 300, `0.8rem`, `var(--text-dim)`)
- **Tags col**: each tag `border: 1px solid var(--border)`, DM Mono `0.44rem` uppercase

Row hover: `background: rgba(232,228,221,0.024)`, title color → `var(--accent)`. Both applied via `onMouseEnter/Leave`.

### 5.4 Work
Layout: `flex-row`. Background: `var(--bg)`.

**Left panel (desktop, `width:260px`, `flex-shrink:0`):**
- `background: var(--bg-panel)`, `border-right: 1px solid var(--border)`, pad `8vh 28px`
- Top: "ASF Visuals" in Bebas Neue `1.8rem` + "Photo · Video · Drone · Web" subline
- Mid: 2×2 stat grid (same pattern as About stats but smaller — `1.8rem` numbers, pad `12×10`)
  Stats: `3+ Years Active`, `10+ Clients Served`, `D1 Athletics`, `FAA Part 107`
- Bottom: Instagram + YouTube links as bordered rows with label + sub + ↗

**Right panel (flex-1, overflow hidden):**
- **Featured header** (top, `flex-shrink:0`): category label → Bebas Neue title `clamp(2rem,3.5vw,3.5rem)` → body text; `border-bottom: 1px solid var(--border)`; links to `asfvisualsllc.com`
- **5 client rows** (scrollable): `ClientRow` component
  Each row: `padding: 16px 40px`, category (DM Mono amber), title (DM Sans 400), body (DM Sans 300)
  Hover: background + title → `var(--accent)`
  Rows with `href` wrap in `<a>`, others in `<div>`

### 5.5 Contact
Layout: `md:grid-cols-2`, `gap-12 lg:gap-20`, `max-w-1100 mx-auto`. Background: `var(--bg-panel)`.

**Left col:** section label → Bebas Neue h2 (`"Let's build\nsomething."`, `clamp(2.8rem,6vw,7rem)`) → stacked CTA buttons → footer line

CTA buttons (`max-w-320`, `flex-col gap-10`):
| Button | Style |
|---|---|
| Email Me | solid `var(--accent)` fill, text `#0e0d0b`, `font-weight:400` |
| LinkedIn | outlined `var(--border)`, text `var(--text)` |
| Instagram | outlined |
| YouTube | outlined |

Each button: `display:flex`, `justify-content:space-between`, `padding:13px 20px`, `↗` right, transition on hover.

**Right col:** labeled rows grid (`grid-template-columns: 110px 1fr`)
Rows: Location, Email, LinkedIn, Open to, Compensation, Citizenship
Label: DM Mono `0.48rem` uppercase faint · Value: DM Sans 300 `0.84rem` dim
`border-bottom: 1px solid var(--border)` per row

---

## 6. CSS (`globals.css`) changes

- Body: `background: var(--bg)`, `color: var(--text)`, `font-family: "DM Sans"`, `overflow: hidden`
- `.scroll-container`: `height:100vh; overflow-y:scroll; scroll-snap-type:y mandatory; scrollbar-width:none; -webkit-overflow-scrolling:touch`
- `.section-full`: `height:100vh; overflow:hidden; position:relative` (remove `min-height`)
- `::selection`: `background: rgba(74,158,255,0.22)`
- Cursor: dot + ring colors → `var(--accent)` (`#4a9eff` base)
- Add `@keyframes chevronBounce` + `.chevron-bounce` class
- Grain opacity `0.04` → `0.03`
- Remove `cursor:none` from `body` if it causes issues with the scroll container — keep it, since `Cursor.tsx` handles the custom cursor

---

## 7. Files modified

| File | Change type |
|---|---|
| `tailwind.config.ts` | New tokens: fonts + colors |
| `src/app/layout.tsx` | Update Google Fonts `<link>` |
| `src/app/globals.css` | Full rewrite of variables, section, scroll, cursor |
| `src/store/index.ts` | Add `scrollProgress`, `isDark`, `toggleDark` |
| `src/app/page.tsx` | Replace Lenis with scroll-snap container |
| `src/components/ui/Chrome.tsx` | Complete rewrite — 6 overlay elements |
| `src/components/sections/Hero.tsx` | Bebas Neue name, photo placeholder |
| `src/components/sections/About.tsx` | Two-col layout, stat grid |
| `src/components/sections/Experience.tsx` | Grid rows, dark panel |
| `src/components/sections/Work.tsx` | Split panel layout |
| `src/components/sections/Contact.tsx` | Split layout, solid/outlined CTAs |
| `src/components/three/Scene.tsx` | Amber colors, country dots, new configs |

**Not modified:** `Cursor.tsx`, `lib/utils.ts`, `lib/viewport.ts`, `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`

---

## 8. Build checklist

- [ ] `npm run build` exits 0
- [ ] No TypeScript errors (strict mode)
- [ ] Static export (`output: "export"`) produces `out/` directory
- [ ] No missing font variables at runtime
- [ ] Scroll snap fires on desktop (Chrome/Firefox/Safari)
- [ ] Keyboard ArrowUp/Down navigates sections
- [ ] Dot nav active state updates correctly
- [ ] Progress line fills top-to-bottom across all 5 sections
- [ ] Chevrons hide on Contact section
- [ ] Theme toggle applies/removes `html.light`
- [ ] Country dots visible on globe
- [ ] Section morphing animates between sections
- [ ] Mobile: bottom dot bar renders; swipe snaps sections; tap targets ≥44px

---

## 9. Open questions (needs decision before coding)

1. **Photo placeholder**: Is there an actual photo to use, or should it remain a placeholder box? If using a real image, Next.js `<Image>` with `unoptimized` (static export) should replace the placeholder div.
2. **Light mode**: The current amber/blue palette inverts reasonably, but some elements (amber globe, dark section panels) may look off in light mode. Is a full light-mode polish in scope, or is a basic background/text flip acceptable?
3. **Lenis removal**: The `lenis` package would become an unused dependency. Remove from `package.json`?
4. **ASF Visuals left panel on mobile**: Currently hidden entirely on mobile. Should a simplified version show, or is the current right-panel-only mobile layout acceptable?
5. **Section reveal threshold**: With scroll snap, sections jump into view instantly. An `IntersectionObserver` with `threshold: 0.15` on a 100vh section inside a snap container may fire unreliably. Should reveals fire immediately when a section becomes the active snap target instead?
