import { create } from "zustand";

export type SectionId = "hero" | "about" | "experience" | "work" | "contact";

const SECTIONS: SectionId[] = ["hero", "about", "experience", "work", "contact"];

interface PortfolioStore {
  currentSection: number;   // 0-4, drives 3D scene morphing
  scrollProgress: number;   // 0-1, drives progress line
  isDark: boolean;
  setCurrentSection: (i: number) => void;
  setScrollProgress: (p: number) => void;
  toggleDark: () => void;
}

export const useStore = create<PortfolioStore>((set, get) => ({
  currentSection: 0,
  scrollProgress: 0,
  isDark: true,
  setCurrentSection: (i) => set({ currentSection: i }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
  toggleDark: () => {
    const newDark = !get().isDark;
    set({ isDark: newDark });
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("light", !newDark);
    }
  },
}));

export { SECTIONS };
