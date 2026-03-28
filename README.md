# Andrew Coutinho — Portfolio

A Next.js portfolio built with React Three Fiber, GSAP, Zustand, and Tailwind CSS.
Drone-inspired 3D scene, full-viewport snap scrolling, warm cream/terracotta palette.

## Tech Stack
- **Next.js 14** (static export for GitHub Pages)
- **React Three Fiber + DREI** — drone-inspired 3D scene
- **GSAP** — animations
- **Zustand** — theme + section state
- **Tailwind CSS** — styling
- **Cormorant + Outfit + JetBrains Mono** — typography

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to GitHub Pages

### One-time setup
1. Create a GitHub repo named `<your-username>.github.io` (or any name)
2. Push this project to the `main` branch
3. Go to **Settings → Pages → Source → GitHub Actions**
4. The workflow in `.github/workflows/deploy.yml` runs automatically on every push

### Custom domain (optional)
Add a `CNAME` file to `/public` with your domain name.

## Customisation

| What | Where |
|------|-------|
| Your name / copy | `src/components/sections/Hero.tsx` |
| About text + stats | `src/components/sections/About.tsx` |
| Experience entries | `src/components/sections/Experience.tsx` |
| ASF Visuals work | `src/components/sections/Work.tsx` |
| Contact details | `src/components/sections/Contact.tsx` |
| 3D scene geometry | `src/components/three/Scene.tsx` |
| Colours | `tailwind.config.ts` |
| Fonts | `src/app/layout.tsx` |

## Adding your photo
Replace the placeholder in `src/components/sections/Hero.tsx`:
```tsx
// Replace the placeholder div with:
<Image src="/your-photo.jpg" alt="Andrew Coutinho" fill className="object-cover" />
```
Drop the image in `/public/your-photo.jpg`.
