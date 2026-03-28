// Shared mutable state for scroll + mouse position.
// Written by event listeners in page.tsx, read by Scene.tsx in useFrame.
// Plain object — no React state — avoids re-renders.
export const viewport = {
  scrollProgress: 0, // 0 (hero) → 1 (contact)
  mouseX: 0,         // -1 (far left) → 1 (far right)
  mouseY: 0,         // -1 (top) → 1 (bottom)
};
