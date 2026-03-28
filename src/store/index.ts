import { create } from "zustand";

export type SectionId = "hero" | "about" | "experience" | "work" | "contact";

const SECTIONS: SectionId[] = ["hero", "about", "experience", "work", "contact"];

interface PortfolioStore {
  currentSection: number;
  isDark: boolean;
  isTransitioning: boolean;
  setCurrentSection: (i: number) => void;
  toggleTheme: () => void;
  setTransitioning: (v: boolean) => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  currentSection: 0,
  isDark: false,
  isTransitioning: false,
  setCurrentSection: (i) => set({ currentSection: i }),
  toggleTheme: () => set((s) => ({ isDark: !s.isDark })),
  setTransitioning: (v) => set({ isTransitioning: v }),
}));

export { SECTIONS };
