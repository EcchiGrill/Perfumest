<script setup lang="ts">
import Member from "@/components/about/Member.vue";
import Mission from "@/components/about/Mission.vue";
import { DropletIcon, BeakerIcon, LeafIcon } from "lucide-vue-next";

const members = [
  {
    name: "EcchiGrill",
    role: "Founder & Master Perfumer",
    bio: "With over 30 years of experience, EcchiGrill brings her passion and expertise to every Perfumest creation.",
    image:
      "https://i.pinimg.com/564x/fd/38/1a/fd381ae773c38d400073573501f60916.jpg",
  },
  {
    name: "John Doe",
    role: "Head of Product Development",
    bio: "John leads our innovative product development team, constantly pushing the boundaries of fragrance.",
    image:
      "https://i.pinimg.com/564x/43/ce/e7/43cee74fa981df02dda2b32e704741d6.jpg",
  },
  {
    name: "Doomer",
    role: "Creative Director",
    bio: "Doomer's keen eye for design ensures that each Perfumest product is as beautiful as it smells.",
    image:
      "https://i.pinimg.com/564x/ed/10/1b/ed101be26524e39dc590f1233fc68a31.jpg",
  },
];

const missions = [
  {
    name: "Quality Ingredients",
    description: "We source only the finest ingredients from around the world",
    icon: DropletIcon,
  },
  {
    name: "Artisanal Craftsmanship",
    description: "Each fragrance is carefully crafted by our expert perfumers",
    icon: BeakerIcon,
  },
  {
    name: "Sustainability",
    description: "We're committed to ethical and sustainable practices",
    icon: LeafIcon,
  },
];
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <section
      class="relative bg-cover bg-left h-[50vh] xl:bg-fixed bg-no-repeat"
      style="background-image: url('/about.jpg')"
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4"
          >
            Our Story
          </h1>
          <p class="text-xl text-gray-200 mb-8">
            Crafting exquisite fragrances since 1995
          </p>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-semibold text-gray-800 mb-8">Our History</h2>
          <div class="space-y-6">
            <p class="text-gray-600">
              Perfumest was founded in 1995 by fragrance enthusiast EcchiGrill
              in a small boutique in Florence, Italy. What started as a passion
              project quickly blossomed into a respected name in the world of
              perfumery.
            </p>
            <p class="text-gray-600">
              Over the years, we've expanded our reach globally, but our
              commitment to quality and artistry remains unchanged. Each
              Perfumest fragrance is a testament to our dedication to the craft,
              blending traditional techniques with modern innovation.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 py-16">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-semibold text-gray-800 mb-8">Our Mission</h2>
          <p class="text-gray-600 mb-8">
            At Perfumest, our mission is to create unforgettable olfactory
            experiences that inspire and delight. We believe that the right
            fragrance has the power to evoke memories, boost confidence, and
            express individuality.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Mission
              v-for="mission in missions"
              :mission="mission"
              :key="mission.name"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Meet Our Team
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Member
            v-for="member in members"
            :member="member"
            :key="member.name"
          />
        </div>
      </div>
    </section>
  </main>
</template>
