<script setup lang="ts">
import Command from "./command/Command.vue";
import CommandInput from "./command/CommandInput.vue";
import { useFilters } from "@/stores/useFilters";

const filtersStore = useFilters();
</script>
<template>
  <Command
    v-model:search-term="filtersStore.search"
    class="text-primary font-medium"
  >
    <CommandInput placeholder="Type your perfume.." class="text-secondary" />
  </Command>
</template>
