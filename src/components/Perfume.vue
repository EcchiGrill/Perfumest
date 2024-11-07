<script setup lang="ts">
import { FetchedPerfumeType } from "@/lib/types";
import { ShoppingCart } from "lucide-vue-next";

defineProps<{ perfume: FetchedPerfumeType }>();

const getShortDesc = (content: string) => {
  if (content.length < 100) return content;

  const sliced = content.slice(0, 100);
  const shortenArr = sliced.split(" ");

  if (shortenArr.length === 1) return sliced.padEnd(sliced.length + 3, ".");

  shortenArr.pop();
  const shorten = shortenArr.join(" ");

  return shorten.padEnd(shorten.length + 3, ".");
};
</script>
<template>
  <div
    :key="perfume.id"
    class="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105"
  >
    <img
      :src="perfume.image!"
      :alt="perfume.name"
      class="w-full h-64 object-contain"
    />
    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">
        {{ perfume.name }}
      </h3>
      <p class="text-gray-600 mb-4 text-justify">
        {{ getShortDesc(perfume.description!) }}
      </p>
      <div class="flex justify-between items-center">
        <span class="font-bold text-primary">{{ perfume.price }}₴</span>
        <button
          class="text-gray-600 px-4 py-2 rounded-full hover:text-primary transition duration-400"
        >
          <span class="sr-only">Add to Cart</span>
          <ShoppingCart />
        </button>
      </div>
    </div>
  </div>
</template>
