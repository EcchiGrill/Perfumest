<script setup lang="ts">
import { MissionType } from "@/lib/types";

defineProps<{ mission: MissionType }>();
</script>

<template>
  <div
    class="bg-white p-6 rounded-lg shadow-md hover:scale-110 transition duration-300"
  >
    <component
      :is="mission.icon"
      class="h-12 w-12 text-secondary mx-auto mb-4"
    />
    <h3 class="text-xl font-semibold mb-2">{{ mission.name }}</h3>
    <p class="text-gray-600">
      {{ mission.description }}
    </p>
  </div>
</template>
