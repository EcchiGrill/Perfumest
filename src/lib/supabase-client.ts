import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { SUPABASE_TOKEN, SUPABASE_URL } from "./constants";

const supabase = createClient<Database>(SUPABASE_URL!, SUPABASE_TOKEN!);

export default supabase;
