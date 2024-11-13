<script setup lang="ts">
import { LogIn, PhoneIcon, Store, UserIcon } from "lucide-vue-next";
import LoginView from "@/views/LoginView.vue";
import CheckoutCart from "./CheckoutCart.vue";
import MobileMenu from "./MobileMenu.vue";
import MobileButtons from "./MobileButtons.vue";
import DesktopButtons from "./DesktopButtons.vue";

const navItems = [
  { name: "About", to: "/about", icon: UserIcon },
  { name: "Shop", to: "/shop", icon: Store },
  { name: "Login", icon: LogIn, modal: LoginView },
  { name: "Contact", to: "/contact", icon: PhoneIcon },
];
</script>

<template>
  <nav class="sticky top-0 w-full z-10 bg-white shadow-lg">
    <div
      class="container relative h-28 mx-auto px-5 flex place-content-between items-center gap-8"
    >
      <RouterLink to="/"
        ><img
          src="/logo.png"
          alt="Perfumest"
          class="w-44 md:w-56 hover:scale-95 transition duration-300"
      /></RouterLink>

      <MobileButtons />
      <DesktopButtons :nav-items="navItems" />

      <CheckoutCart
        class="absolute top-28 right-0 p-2 transition transform origin-top-right"
      />
    </div>
    <MobileMenu
      :nav-items="navItems"
      class="md:hidden absolute inset-x-0 p-2 transition transform origin-top-right"
    />
  </nav>
</template>
