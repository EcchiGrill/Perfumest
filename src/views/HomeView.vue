<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { RouterLink } from "vue-router";
import { ExternalLink } from "lucide-vue-next";
import Carousel from "@/components/home/Carousel.vue";
import Featured from "@/components/home/Featured.vue";
</script>

<template>
  <div class="relative min-h-screen bg-gray-50">
    <section
      class="relative bg-cover bg-center h-[70vh] bg-fixed"
      style="background-image: url('/header.jpg')"
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4"
          >
            Discover Your Signature Scent
          </h1>
          <p class="text-xl text-gray-200 mb-8">
            Exquisite fragrances for every occasion
          </p>
          <RouterLink to="/shop">
            <Button
              href="#"
              class="text-base text-white transition duration-500 w-32"
              >Shop Now</Button
            >
          </RouterLink>
        </div>
      </div>
    </section>
    <Featured />
    <section class="flex bg-gray-100 py-16 items-center">
      <div
        class="container mx-auto px-6 flex flex-col xl:flex-row items-center gap-5"
      >
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-5xl font-semibold mb-4 text-secondary">
            About Perfumest
          </h2>
          <p class="text-xl mb-8">
            At Perfumest, we believe that every person deserves to find their
            perfect scent. Our curated collection of exquisite fragrances from
            around the world is designed to help you express your unique
            personality and style.
          </p>
          <RouterLink
            to="/about"
            class="flex place-content-center font-semibold hover:text-primary transition duration-300"
            >Learn More <ExternalLink width="20" class="ml-1" />
          </RouterLink>
        </div>

        <div class="py-10 px-5"><Carousel /></div>
      </div>
    </section>
  </div>
</template>
