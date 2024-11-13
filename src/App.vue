<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/navbar/Navbar.vue";
import { RouterView } from "vue-router";
import { container as ModalContainer } from "jenesius-vue-modal";
import AuthProvider from "./provider/AuthProvider.vue";
</script>

<template>
  <AuthProvider>
    <Navbar />
    <RouterView />
    <Footer />
    <modal-container class="absolute z-20" />
  </AuthProvider>
</template>
