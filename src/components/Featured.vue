<script setup lang="ts">
import supabase from "@/lib/supabase-client";
import { FetchedPerfumesType } from "@/lib/types";
import { onMounted, ref } from "vue";
import Perfume from "@/components/Perfume.vue";

const perfumes = ref<FetchedPerfumesType>();

async function fetchPerfumes() {
  try {
    const { data, error } = await supabase.from("perfumes").select();

    if (error) throw new Error("Fetching Error");

    perfumes.value = data;
    console.log(data);
  } catch (error) {
    return;
  }
}

onMounted(() => {
  fetchPerfumes();
});
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-semibold text-gray-800 mb-8">
        Featured Fragrances
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <Perfume v-for="perfume in perfumes" :perfume="perfume" />
      </div>
    </div>
  </section>
</template>
