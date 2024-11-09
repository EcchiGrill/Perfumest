<script setup lang="ts">
import { MemberType } from "@/lib/types";

defineProps<{ member: MemberType }>();
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:scale-110 transition duration-300"
  >
    <img
      :src="member.image"
      :alt="member.name"
      class="w-full h-72 object-cover"
    />
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">{{ member.name }}</h3>
      <p class="text-gray-600 mb-4">{{ member.role }}</p>
      <p class="text-gray-600">{{ member.bio }}</p>
    </div>
  </div>
</template>
