import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}
// const fetcher = (url) => fetch(url).then((r) => r.json());

// export default fetcher;
