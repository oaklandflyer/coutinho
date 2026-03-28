import { create } from "zustand";

export type SectionId = "hero" | "about" | "experience" | "work" | "contact";

const SECTIONS: SectionId[] = ["hero", "about", "experience", "work", "contact"];

interface PortfolioStore {
  currentSection: number; // 0-4, drives 3D scene morphing
  setCurrentSection: (i: number) => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  currentSection: 0,
  setCurrentSection: (i) => set({ currentSection: i }),
}));

export { SECTIONS };
