<script setup lang="ts">
import Perfume from "@/components/Perfume.vue";
import { usePerfumes } from "@/stores/usePerfumes";
import { MoveRight } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";
import NewPerfume from "../NewPerfume.vue";
import { useAuth } from "@/stores/useAuth";

const perfumesStore = usePerfumes();
const authStore = useAuth();
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
        <NewPerfume v-if="authStore.isAdmin" />

        <Perfume
          v-for="(perfume, index) in perfumesStore.perfumes"
          v-show="index < 3"
          :perfume="perfume"
          :key="perfume.id"
        />
      </div>
      <RouterLink to="/shop" class="flex items-center justify-end mt-5">
        <Button
          variant="outline"
          class="flex items-center gap-1 hover:text-primary transition duration-300 px-5 py-5 text-base"
          >Show more <MoveRight class="mt-1" width="16" /></Button
      ></RouterLink>
    </div>
  </section>
</template>
