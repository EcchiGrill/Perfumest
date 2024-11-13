import { Database } from "@/lib/database.types";
import { LucideIcon } from "lucide-vue-next";
import { Component } from "vue";

const getFetchedPerfumesType = (db: Database) => {
  return db.public.Tables.perfumes.Row;
};

export type FetchedPerfumeType = ReturnType<typeof getFetchedPerfumesType>;
export type FetchedPerfumesType = FetchedPerfumeType[];

export type MemberType = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type MissionType = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export type CartPerfumeType = {
  description: string;
  id: string;
  type: "Eau de Parfum" | "Eau de Toilette";
  image: string;
  name: string;
  price: number;
  quantity?: number;
};

export type CartPerfumesType = CartPerfumeType[];

export type FilterNameType =
  | "selectedCategories"
  | "selectedGenders"
  | "selectedTypes"
  | "selectedScents";

export type NavItemsType = {
  name: string;
  to?: string;
  icon: LucideIcon;
  modal?: Component;
}[];
