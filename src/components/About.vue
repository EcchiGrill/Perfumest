<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";
</script>

<template>
  <section class="bg-gray-100 py-16">
    <div class="container mx-auto px-6">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-5xl font-semibold text-gray-800 mb-4">
          About Perfumest
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          At Perfumest, we believe that every person deserves to find their
          perfect scent. Our curated collection of exquisite fragrances from
          around the world is designed to help you express your unique
          personality and style.
        </p>
        <a
          href="#"
          class="flex place-content-center font-semibold hover:text-primary transition duration-300"
          >Learn More <ExternalLink width="20" class="-ml-1" />
        </a>
      </div>
    </div>
  </section>
</template>
