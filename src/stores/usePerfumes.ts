import { CartPerfumesType, FetchedPerfumesType } from "./../lib/types";
import supabase from "@/lib/supabase-client";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAsyncState } from "@vueuse/core";
import { shuffleArray } from "@/lib/utils";
import { useAuth } from "./useAuth";

export const usePerfumes = defineStore("perfumes", () => {
  const perfumes = ref<FetchedPerfumesType>([]);
  const shuffledPerfumes = ref<FetchedPerfumesType>([]);
  const likedPerfumes = ref<string[]>([]);
  const cartIds = ref<string[]>([]);
  const cartPerfumes = ref<CartPerfumesType>([]);

  const authStore = useAuth();

  useAsyncState(async () => {
    try {
      const { data, error } = await supabase.from("perfumes").select();

      if (error) throw new Error("Fetching Error");

      perfumes.value = data;
      likedPerfumes.value = authStore.userData!.user_metadata.likedPerfumes ??=
        [];
      cartIds.value = authStore.userData!.user_metadata.cartIds ??= [];
      cartPerfumes.value = authStore.userData!.user_metadata.cartPerfumes ??=
        [];

      shuffledPerfumes.value = [...data];
      shuffleArray(shuffledPerfumes.value);

      return data;
    } catch (error) {
      return;
    }
  }, []);

  return {
    perfumes,
    shuffledPerfumes,
    likedPerfumes,
    cartIds,
    cartPerfumes,
  };
});
