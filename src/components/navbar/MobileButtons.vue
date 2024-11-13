<script setup lang="ts">
import { usePerfumes } from "@/stores/usePerfumes";
import { useTogglers } from "@/stores/useTogglers";
import { MenuIcon, ShoppingCart, XIcon } from "lucide-vue-next";

const perfumesStore = usePerfumes();
const togglersStore = useTogglers();
</script>
<template>
  <!-- Buttons -->
  <div class="md:hidden grid grid-cols-2 gap-4">
    <div
      @click="togglersStore.toggleCart"
      class="relative content-center -mt-1 group cursor-pointer"
    >
      <ShoppingCart class="w-6 h-6 group-hover:text-primary duration-500" />
      <span
        v-if="perfumesStore.cartIds.length"
        class="flex absolute bottom-0 right-0 -mb-1 bg-red-500 rounded-full w-5 h-5 text-white place-content-center place-items-center text-sm"
        >{{ perfumesStore.cartIds.length }}</span
      >
    </div>

    <button @click="togglersStore.toggleMenu" class="focus:outline-none">
      <span class="sr-only">Toggle menu</span>
      <MenuIcon
        v-if="
          (!togglersStore.isMenuOpen && !togglersStore.isModal) ||
          !togglersStore.isMenuOpen
        "
        class="h-8 w-8"
      />
      <XIcon v-else class="h-8 w-8" />
    </button>
  </div>
</template>
