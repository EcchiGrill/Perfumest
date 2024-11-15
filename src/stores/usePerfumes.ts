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

      if (error) throw error;

      perfumes.value = data;

      shuffledPerfumes.value = [...data];
      shuffleArray(shuffledPerfumes.value);

      likedIds.value = authStore.userData!.user_metadata.likedIds ??= [];
      likedPerfumes.value = likedIds.value.map((id) => {
        return perfumes.value.find((perfume) => perfume.id === id)!;
      });
      cartIds.value = authStore.userData!.user_metadata.cartIds ??= [];
      cartPerfumes.value = cartIds.value.map((id) => {
        return perfumes.value.find((perfume) => perfume.id === id)!;
      });
    } catch (error) {
      return error;
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
