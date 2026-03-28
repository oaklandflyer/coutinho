import { create } from "zustand";

export type SectionId = "hero" | "about" | "experience" | "work" | "contact";

const SECTIONS: SectionId[] = ["hero", "about", "experience", "work", "contact"];

interface PortfolioStore {
  currentSection: number;
  isTransitioning: boolean;
  setCurrentSection: (i: number) => void;
  setTransitioning: (v: boolean) => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  currentSection: 0,
  isTransitioning: false,
  setCurrentSection: (i) => set({ currentSection: i }),
  setTransitioning: (v) => set({ isTransitioning: v }),
}));

export { SECTIONS };
