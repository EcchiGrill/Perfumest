<script setup lang="ts">
import Perfume from "@/components/Perfume.vue";
import { usePerfumes } from "@/stores/usePerfumes";
import { MoveRight } from "lucide-vue-next";

const perfumesStore = usePerfumes();
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
          v-for="(perfume, index) in perfumesStore.perfumes"
          v-show="index < 4"
          :perfume="perfume"
          :key="perfume.id"
        />
      </div>
      <RouterLink
        to="/shop"
        class="primary flex items-center justify-end gap-1 hover:text-primary transition duration-300"
        >Show more <MoveRight class="mt-1"
      /></RouterLink>
    </div>
  </section>
</template>
