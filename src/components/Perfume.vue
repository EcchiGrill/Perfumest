<script setup lang="ts">
import supabase from "@/lib/supabase-client";
import { CartPerfumeType, FetchedPerfumeType } from "@/lib/types";
import { getShortDesc } from "@/lib/utils";
import { usePerfumes } from "@/stores/usePerfumes";
import { useTogglers } from "@/stores/useTogglers";
import { Heart, ShoppingCart } from "lucide-vue-next";
import { ref } from "vue";

defineProps<{ perfume: FetchedPerfumeType }>();

const togglersStore = useTogglers();
const perfumesStore = usePerfumes();

const isDescriptionLess = ref(true);

const toggleDescription = () => {
  isDescriptionLess.value = !isDescriptionLess.value;
};

const likePerfume = async (id: string) => {
  if (!perfumesStore.likedPerfumes.includes(id)) {
    //Like
    perfumesStore.likedPerfumes.push(id);
  } else {
    //Dislike
    perfumesStore.likedPerfumes = perfumesStore.likedPerfumes.filter(
      (likedId) => likedId !== id
    );
  }

  try {
    const { error } = await supabase.auth.updateUser({
      data: {
        likedPerfumes: perfumesStore.likedPerfumes,
      },
    });

    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const cartPerfume = async (id: string) => {
  const perfume: CartPerfumeType = perfumesStore.perfumes.find(
    (perfume) => perfume.id === id
  )!;

  if (!perfumesStore.cartIds.includes(id)) {
    //Cart
    perfumesStore.cartIds.push(id);
    perfumesStore.cartPerfumes.push({
      id: perfume.id,
      name: perfume.name,
      price: perfume.price,
      quantity: 1,
      type: perfume.type,
      description: getShortDesc(perfume.description, 75),
      image: perfume.image,
    });
  } else {
    perfume.quantity!++;
    togglersStore.isCartOpen = true;
  }

  togglersStore.isCartOpen = true;

  try {
    const { error } = await supabase.auth.updateUser({
      data: {
        cartIds: perfumesStore.cartIds,
        cartPerfumes: perfumesStore.cartPerfumes,
      },
    });

    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
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
        {{
          isDescriptionLess
            ? getShortDesc(perfume.description)
            : perfume.description
        }}
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
            class="text-gray-600 px-3 py-2 rounded-full hover:text-red-600 transition duration-300"
            @click="likePerfume(perfume.id)"
          >
            <span class="sr-only">Like</span>
            <Heart
              :class="
                perfumesStore.likedPerfumes.includes(perfume.id)
                  ? 'text-red-600 transition duration-300'
                  : ''
              "
              :fill="
                perfumesStore.likedPerfumes.includes(perfume.id)
                  ? '#ba3e2b'
                  : 'transparent'
              "
            />
          </button>
          <button
            :class="
              'pr-4 pl-3 py-2 rounded-full hover:text-primary transition duration-300 ' +
              (perfumesStore.cartIds.includes(perfume.id)
                ? 'text-primary'
                : 'text-gray-600')
            "
            @click="cartPerfume(perfume.id)"
          >
            <span class="sr-only">Add to Cart</span>
            <ShoppingCart />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
