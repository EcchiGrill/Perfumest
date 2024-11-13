<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { Slider } from "@/components/ui/slider";
import { usePerfumes } from "@/stores/usePerfumes";
import Perfume from "@/components/Perfume.vue";
import { sortByDate } from "@/lib/utils";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { useFilters } from "@/stores/useFilters";
import Filter from "@/components/shop/Filter.vue";

const perfumesStore = usePerfumes();
const filtersStore = useFilters();

const currentPage = ref(1);
const itemsPerPage = ITEMS_PER_PAGE;

const filteredPerfumes = computed(() => {
  return perfumesStore.perfumes.filter((perfume) => {
    const typeMatch =
      filtersStore.selectedTypes.length === 0 ||
      filtersStore.selectedTypes.includes(perfume.type);

    const genderMatch =
      filtersStore.selectedGenders.length === 0 ||
      filtersStore.selectedGenders.includes(perfume.gender);

    const categoryMatch =
      filtersStore.selectedCategories.length === 0 ||
      perfume.category.filter((category) =>
        filtersStore.selectedCategories.includes(category)
      ).length;

    const scentMatch =
      filtersStore.selectedScents.length === 0 ||
      perfume.scent_type.filter((scent) =>
        filtersStore.selectedScents.includes(scent)
      ).length;

    const priceMatch = filtersStore.priceRange.filter(
      (range) => perfume.price <= range
    ).length;

    return (
      typeMatch && genderMatch && categoryMatch && scentMatch && priceMatch
    );
  });
});

const sortOption = ref("featured");

const sortedProducts = computed(() => {
  let result = [...filteredPerfumes.value!];

  switch (sortOption.value) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "date-desc":
      result.sort((a, b) => sortByDate(a.date, b.date));
      break;
    default:
      break;
  }

  return result;
});

const paginatedPerfumes = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedProducts.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredPerfumes.value!.length / itemsPerPage);
});

const clearFilters = () => {
  filtersStore.selectedCategories = [];
  filtersStore.selectedScents = [];
  filtersStore.selectedGenders = [];
  filtersStore.selectedTypes = [];
  filtersStore.priceRange = [500];
  sortOption.value = "featured";
  currentPage.value = 1;
};

const isShowFilters = ref(window.screen.width < 768 ? false : true);

const toggleShowFilters = () => {
  return (isShowFilters.value = !isShowFilters.value);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-semibold text-gray-800 mb-6">Our Collection</h1>

      <div class="flex flex-col md:flex-row gap-8">
        <aside class="w-full md:w-1/4">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex justify-between text-xl font-semibold">
              <h2>Filters</h2>
              <component
                :is="isShowFilters ? ChevronDown : ChevronUp"
                class="cursor-pointer"
                @click="toggleShowFilters"
              />
            </div>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div v-show="isShowFilters" class="mt-4">
                <Filter
                  v-for="(_, index) in filtersStore.filters"
                  :filter="filtersStore.filters[index]"
                  :filter-name="index"
                />

                <div class="mb-6">
                  <h3 class="font-semibold mb-2">Price Range</h3>
                  <Slider
                    v-model="filtersStore.priceRange"
                    :min="0"
                    :max="500"
                    :step="10"
                  />
                  <div class="flex justify-between text-sm text-secondary mt-2">
                    <span>$0</span>
                    <span>${{ filtersStore.priceRange[0] }}</span>
                  </div>
                </div>

                <button
                  @click="clearFilters"
                  class="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </transition>
          </div>
        </aside>

        <main class="w-full md:w-3/4">
          <div class="mb-6 flex justify-end">
            <select
              v-model="sortOption"
              class="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="date-desc">Newest Arrivals</option>
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Perfume
              v-for="perfume in paginatedPerfumes"
              :perfume="perfume"
              :key="perfume.id"
            >
            </Perfume>
          </div>

          <div class="mt-8 flex justify-center">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'mx-1 px-3 py-1 rounded-md',
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100',
              ]"
            >
              {{ page }}
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
