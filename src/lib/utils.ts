import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getWithUpperLetter = (filter: string) => {
  return filter[0].toUpperCase() + filter.slice(1);
};

export const sortByDate = (a: string, b: string) => {
  const date1 = new Date(a).getTime();
  const date2 = new Date(b).getTime();

  return date1 - date2;
};

export const shuffleArray = (array: any[]) => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    return ([] = [array[currentIndex], array[randomIndex]] =
      [array[randomIndex], array[currentIndex]]);
  }
};
