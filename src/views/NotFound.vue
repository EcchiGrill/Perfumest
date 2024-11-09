<script setup lang="ts">
import { MoveRight, OctagonAlert } from "lucide-vue-next";
</script>
<template>
  <main
    class="h-[calc(100vh-36rem)] md:h-[calc(100vh-23rem)] flex flex-col place-content-center place-items-center text-red-500 gap-5"
  >
    <OctagonAlert width="80" height="80" />
    <p class="text-4xl">404 Page Not Found</p>
    <RouterLink
      to="/"
      class="flex flex-row place-items-center text-2xl gap-1 text-gray-700 -mt-2 hover:text-primary transition duration-300"
      >Go back <MoveRight class="mt-1"
    /></RouterLink>
  </main>
</template>
