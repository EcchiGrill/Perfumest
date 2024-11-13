<script setup lang="ts">
import { FilterNameType } from "@/lib/types";
import { getWithUpperLetter } from "@/lib/utils";
import { useFilters } from "@/stores/useFilters";

const filtersStore = useFilters();
defineProps<{
  filter: string[];
  filterName: FilterNameType;
}>();
</script>
<template>
  <div class="mb-6">
    <h3 class="font-semibold mb-2">{{ filterName.slice(8) }}</h3>
    <div
      v-for="type in filter"
      :key="filterName"
      class="flex items-center mb-2"
    >
      <input
        type="checkbox"
        :id="type"
        :value="type"
        v-model="filtersStore[filterName]"
        class="form-checkbox h-5 w-5 text-gold"
      />
      <label :for="type" class="ml-2 text-gray-700">{{
        getWithUpperLetter(type)
      }}</label>
    </div>
  </div>
</template>
