import { Database } from "@/lib/database.types";

const getFetchedPerfumesType = (db: Database) => {
  return db.public.Tables.perfumes.Row;
};

export type FetchedPerfumeType = ReturnType<typeof getFetchedPerfumesType>;
export type FetchedPerfumesType = FetchedPerfumeType[];
