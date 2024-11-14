import { CartPerfumesType, FetchedPerfumesType } from "./../lib/types";
import supabase from "@/lib/supabase-client";
import { defineStore } from "pinia";
import { ref } from "vue";
import { shuffleArray } from "@/lib/utils";
import { useAuth } from "./useAuth";

export const usePerfumes = defineStore("perfumes", () => {
  const perfumes = ref<FetchedPerfumesType>([]);
  const shuffledPerfumes = ref<FetchedPerfumesType>([]);
  const likedIds = ref<string[]>([]);
  const likedPerfumes = ref<FetchedPerfumesType>([]);
  const cartIds = ref<string[]>([]);
  const cartPerfumes = ref<CartPerfumesType>([]);

  const authStore = useAuth();

  const fetchPerfumes = async () => {
    try {
      const { data, error } = await supabase.from("perfumes").select();

      if (error) throw new Error("Fetching Error");

      perfumes.value = data;
      likedIds.value = authStore.userData!.user_metadata.likedIds ??= [];
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
  };

  return {
    perfumes,
    shuffledPerfumes,
    likedPerfumes,
    cartIds,
    cartPerfumes,
    likedIds,
    fetchPerfumes,
  };
});
