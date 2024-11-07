<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer.vue";
import About from "@/components/About.vue";
import Featured from "@/components//Featured.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <section
      class="relative bg-cover bg-center h-[70vh] bg-fixed"
      style="background-image: url('/header.jpeg')"
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
          <Button
            href="#"
            class="text-base hover:bg-transparent transition duration-500 w-32"
            >Shop Now</Button
          >
        </div>
      </div>
    </section>
    <Featured />
    <About />
    <Footer />
  </div>
</template>
