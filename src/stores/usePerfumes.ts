import { FetchedPerfumesType } from "./../lib/types";
import supabase from "@/lib/supabase-client";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAsyncState } from "@vueuse/core";

export const usePerfumes = defineStore("perfumes", () => {
  const perfumes = ref<FetchedPerfumesType>([]);

  useAsyncState(async () => {
    try {
      const { data, error } = await supabase.from("perfumes").select();

      if (error) throw new Error("Fetching Error");

      perfumes.value = data;
      return data;
    } catch (error) {
      return;
    }
  }, []);

  return {
    perfumes,
  };
});
