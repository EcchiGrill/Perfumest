<script setup lang="ts">
import { NavItemsType } from "@/lib/types";
import { usePerfumes } from "@/stores/usePerfumes";
import { useTogglers } from "@/stores/useTogglers";
import { openModal } from "jenesius-vue-modal";
import { ShoppingCart } from "lucide-vue-next";
import { useRoute } from "vue-router";

defineProps<{ navItems: NavItemsType }>();

const perfumesStore = usePerfumes();
const togglersStore = useTogglers();
const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};
</script>
<template>
  <div class="hidden md:flex gap-6">
    <nav class="flex gap-1">
      <RouterLink
        v-for="item in navItems"
        :class="`${
          isActive(item.to ?? '')
            ? `bg-primary bg-opacity-45`
            : `hover:bg-gray-100`
        } p-2 px-4 rounded-md text-base xs:text-md flex place-items-center gap-2 text-secondary transition duration-300`"
        :to="item.to ?? ''"
        :key="item.name"
        @click="
          item.modal &&
            (togglersStore.toggleModal(),
            togglersStore.toggleMenu(),
            openModal(item.modal))
        "
      >
        <component :is="item.icon" /> {{ item.name }}</RouterLink
      >
    </nav>
    <div
      @click="togglersStore.toggleCart"
      class="relative content-center group cursor-pointer"
    >
      <ShoppingCart class="w-7 h-7 group-hover:text-primary duration-500" />
      <span
        v-if="perfumesStore.cartIds.length"
        class="flex absolute bottom-0 right-0 -mr-1.5 -mb-1 bg-red-500 rounded-full w-5 h-5 text-white place-content-center place-items-center text-sm"
        >{{ perfumesStore.cartIds.length }}</span
      >
    </div>
  </div>
</template>
