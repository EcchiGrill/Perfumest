import { CATEGORIES, GENDERS, SCENT_TYPES, TYPES } from "@/lib/constants";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilters = defineStore("filters", () => {
  const search = ref<string>("");

  const filters = {
    selectedTypes: TYPES,
    selectedGenders: GENDERS,
    selectedCategories: CATEGORIES,
    selectedScents: SCENT_TYPES,
  };
  const selectedTypes = ref<string[]>([]);
  const selectedGenders = ref<string[]>([]);
  const selectedCategories = ref<string[]>([]);
  const selectedScents = ref<string[]>([]);
  const priceRange = ref<number[]>([500]);

  return {
    filters,
    selectedTypes,
    selectedGenders,
    selectedCategories,
    selectedScents,
    priceRange,
    search,
  };
});
