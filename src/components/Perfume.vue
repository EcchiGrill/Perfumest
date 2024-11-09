<script setup lang="ts">
import { FetchedPerfumeType } from "@/lib/types";
import { Heart, ShoppingCart } from "lucide-vue-next";
import { computed, ref } from "vue";

const props = defineProps<{ perfume: FetchedPerfumeType }>();

const isDescriptionLess = ref(true);

const toggleDescription = () => {
  isDescriptionLess.value = !isDescriptionLess.value;
};

const getShortDesc = computed<string>(() => {
  const { description } = props.perfume;

  if (description.length < 100) return description;

  const sliced = description.slice(0, 100);
  const shortenArr = sliced.split(" ");

  if (shortenArr.length === 1) return sliced.padEnd(sliced.length + 3, ".");

  shortenArr.pop();
  const shorten = shortenArr.join(" ");

  return shorten.padEnd(shorten.length + 3, ".");
});
</script>
<template>
  <div
    :key="perfume.id"
    class="relative bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105"
  >
    <img
      :src="perfume.image"
      :alt="perfume.name"
      class="w-full h-64 object-cover"
    />
    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">
        {{ perfume.name }}
      </h3>
      <p class="text-base font-thin text-primary mb-2">
        {{ perfume.type }}
      </p>
      <p class="text-gray-600 mb-4 text-justify">
        {{ isDescriptionLess ? getShortDesc : perfume.description }}
      </p>
      <p
        @click="toggleDescription"
        class="text-primary text-right -mt-4 mb-16 cursor-pointer"
      >
        {{ isDescriptionLess ? "More" : "Less" }}
      </p>
      <div
        class="absolute bottom-2 w-[calc(100%-1rem)] flex items-center justify-between"
      >
        <span class="font-bold text-primary"
          >{{ perfume.price.toFixed(2) }} $</span
        >
        <div class="flex justify-between items-center">
          <button
            class="text-gray-600 px-4 py-2 rounded-full hover:text-red-600 transition duration-400"
          >
            <span class="sr-only">Like</span>
            <Heart />
          </button>
          <button
            class="text-gray-600 px-4 py-2 rounded-full hover:text-primary transition duration-400"
          >
            <span class="sr-only">Add to Cart</span>
            <ShoppingCart />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
