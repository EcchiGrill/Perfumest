import { Database } from "@/lib/database.types";
import { LucideIcon } from "lucide-vue-next";

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
