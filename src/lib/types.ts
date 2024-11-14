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
  type: string;
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

const getFetchedOrderType = (db: Database) => {
  return db.public.Tables.orders.Row;
};

export type FetchedOrderType = ReturnType<typeof getFetchedOrderType>;
export type FetchedOrdersType = FetchedOrderType[];

export interface Payment {
  id: string;
  amount: number;
  status: "processing" | "delivering" | "successful" | "failed";
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
}
