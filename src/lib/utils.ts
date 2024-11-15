import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref
) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}

export const getWithUpperLetter = (filter: string) => {
  return filter[0].toUpperCase() + filter.slice(1);
};

export const sortByDate = (a: string, b: string) => {
  const date1 = new Date(a).getTime();
  const date2 = new Date(b).getTime();

  return date1 - date2;
};

export const getShortDesc = (description: string, length: number = 100) => {
  if (description.length < length) return description;

  const sliced = description.slice(0, length);
  const shortenArr = sliced.split(" ");

  if (shortenArr.length === 1) return sliced.padEnd(sliced.length + 3, ".");

  shortenArr.pop();
  const shorten = shortenArr.join(" ");

  return shorten.padEnd(shorten.length + 3, ".");
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
