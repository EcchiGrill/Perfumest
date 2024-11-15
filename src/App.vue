<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/navbar/Navbar.vue";
import { RouterView } from "vue-router";
import { container as ModalContainer } from "jenesius-vue-modal";
import AuthProvider from "./provider/AuthProvider.vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { Analytics } from "@vercel/analytics/vue";
</script>

<template>
  <Analytics mode="production" />
  <SpeedInsights />
  <AuthProvider>
    <Navbar />
    <RouterView />
    <Footer />
    <modal-container class="absolute z-20" />
  </AuthProvider>
</template>
