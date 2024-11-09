<script setup lang="ts">
import {
  LogIn,
  MenuIcon,
  PhoneIcon,
  ShoppingCart,
  Store,
  UserIcon,
  XIcon,
} from "lucide-vue-next";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { RouterLink, useRoute } from "vue-router";

const navItems = [
  { name: "About", to: "/about", icon: UserIcon },
  { name: "Shop", to: "/shop", icon: Store },
  { name: "Login", to: "/login", icon: LogIn },
  { name: "Contact", to: "/contact", icon: PhoneIcon },
];

const route = useRoute();

const isMenuOpen = ref(false);

const isActive = (path: string) => {
  return route.path === path;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="sticky top-0 z-10 w-full bg-white shadow-lg">
    <!-- Mobile Buttons -->
    <div
      class="container h-28 mx-auto px-5 flex place-content-between items-center gap-8"
    >
      <RouterLink to="/"
        ><img
          src="/logo.png"
          alt="Perfumest"
          class="w-44 md:w-56 hover:scale-95 transition duration-300"
      /></RouterLink>

      <div class="md:hidden grid grid-cols-2 gap-4">
        <RouterLink to="#" class="relative content-center">
          <ShoppingCart class="w-6 h-6" />
          <span
            class="flex absolute -mb-1 bottom-0 right-0 bg-red-500 rounded-full w-5 h-5 text-white place-content-center place-items-center text-sm shadow-sm"
            >3</span
          >
        </RouterLink>
        <button @click="toggleMenu" class="focus:outline-none">
          <span class="sr-only">Toggle menu</span>
          <MenuIcon v-if="!isMenuOpen" class="h-8 w-8" />
          <XIcon v-else class="h-8 w-8" />
        </button>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex gap-5">
        <nav class="flex gap-1">
          <RouterLink
            :class="`${
              isActive(item.to)
                ? `bg-primary bg-opacity-45`
                : `hover:bg-gray-100`
            } p-2 px-4 rounded-md text-base xs:text-md flex place-items-center gap-2 text-secondary transition duration-300`"
            v-for="item in navItems"
            :to="item.to"
            :key="item.name"
          >
            <component :is="item.icon" /> {{ item.name }}</RouterLink
          >
        </nav>
        <RouterLink to="#" class="relative content-center">
          <ShoppingCart class="w-7 h-7" />
          <span
            class="flex absolute bottom-0 right-0 -mr-1 bg-red-500 rounded-full w-5 h-5 text-white place-content-center place-items-center text-sm shadow-sm"
            >3</span
          >
        </RouterLink>
      </div>
    </div>
    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden items-center absolute inset-x-0 p-2 transition transform origin-top-right"
      >
        <div
          class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
        >
          <div class="pt-5 pb-6 px-5">
            <nav class="grid gap-y-8">
              <RouterLink
                v-for="item in navItems"
                :key="item.name"
                :to="item.to"
                :class="`${
                  isActive(item.to)
                    ? `bg-primary bg-opacity-45`
                    : `hover:bg-gray-100`
                } -m-3 p-3 flex text-secondary items-center rounded-md transition duration-300`"
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
              <Button variant="default" class="text-white text-md w-full"
                >Shop Now</Button
              >
            </RouterLink>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
