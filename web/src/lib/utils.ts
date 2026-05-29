import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(goals: number, behinds: number): string {
  return `${goals}.${behinds} (${goals * 6 + behinds})`;
}

export function aflPoints(score: number): { goals: number; behinds: number } {
  const goals = Math.floor(score / 6);
  return { goals, behinds: score - goals * 6 };
}
