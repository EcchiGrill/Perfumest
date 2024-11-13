<script setup lang="ts">
import Perfume from "@/components/Perfume.vue";
import { usePerfumes } from "@/stores/usePerfumes";
import { MoveRight } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";
import { computed } from "vue";

const perfumesStore = usePerfumes();

const getLikesSorted = computed(() =>
  perfumesStore.perfumes.sort((a, b) => {
    const first = perfumesStore.likedPerfumes.includes(a.id) ? 1 : 0;
    const second = perfumesStore.likedPerfumes.includes(b.id) ? 1 : 0;

    return second - first;
  })
);
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-6 flex flex-col gap-5">
      <h2 class="text-3xl font-semibold text-gray-800 mb-8">
        Featured Fragrances
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <Perfume
          v-for="(perfume, index) in getLikesSorted"
          v-show="index < 4"
          :perfume="perfume"
          :key="perfume.id"
        />
      </div>
      <RouterLink to="/shop" class="flex items-center justify-end">
        <Button
          variant="outline"
          class="flex items-center gap-1 hover:text-primary transition duration-300"
          >Show more <MoveRight class="mt-1" width="16" /></Button
      ></RouterLink>
    </div>
  </section>
</template>
