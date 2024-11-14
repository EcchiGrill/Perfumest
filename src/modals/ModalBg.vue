<script setup lang="ts">
import { useTogglers } from "@/stores/useTogglers";
import { closeModal } from "jenesius-vue-modal";
import { onMounted } from "vue";

const togglersStore = useTogglers();

const setScrollHidden = () =>
  document.documentElement.style.setProperty("--body-overflow", "hidden");

onMounted(setScrollHidden);
</script>
<template>
  <div
    class="fixed top-0 min-h-screen w-full bg-gray-700 bg-opacity-50 flex flex-col justify-center xs:px-6 lg:px-8"
    @click="
      togglersStore.isModal
        ? (togglersStore.toggleModal(), closeModal())
        : $router.push('/')
    "
  ></div>
</template>

<style>
body {
  overflow-y: var(--body-overflow);
}
</style>
