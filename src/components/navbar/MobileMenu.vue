<script setup lang="ts">
import { NavItemsType } from "@/lib/types";
import { useTogglers } from "@/stores/useTogglers";
import { openModal } from "jenesius-vue-modal";
import { useRoute } from "vue-router";
import Button from "../ui/button/Button.vue";

defineProps<{ navItems: NavItemsType }>();

const togglersStore = useTogglers();
const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};
</script>
<template>
  <transition
    enter-active-class="transition ease-in duration-200"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-out duration-150"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="togglersStore.isMenuOpen && !togglersStore.isModal">
      <div
        class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
      >
        <div class="pt-5 pb-6 px-5">
          <nav class="grid gap-y-8">
            <RouterLink
              v-for="item in navItems"
              :key="item.name"
              :to="item.to ?? ''"
              :class="`${
                isActive(item.to ?? '')
                  ? `bg-primary bg-opacity-45`
                  : `hover:bg-gray-100`
              } -m-3 p-3 flex text-secondary items-center rounded-md transition duration-300`"
              @click="
                item.modal &&
                  (togglersStore.toggleModal(),
                  togglersStore.toggleMenu(),
                  openModal(item.modal))
              "
            >
              <component :is="item.icon" class="flex-shrink-0 h-6 w-6" />
              <span class="ml-3 text-base font-medium">
                {{ item.name }}
              </span>
            </RouterLink>
          </nav>
        </div>
        <div class="py-6 px-5 space-y-6">
          <RouterLink to="/shop">
            <Button variant="default" class="text-white text-md w-full py-5">
              Shop Now
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </transition>
</template>
