import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SECTION_LABELS = ["Home", "About", "Experience", "Work", "Contact"];
export const SECTION_DARK = [false, false, true, false, false]; // which sections have dark bg
