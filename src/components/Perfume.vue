<script setup lang="ts">
import supabase from "@/lib/supabase-client";
import { CartPerfumeType, FetchedPerfumeType } from "@/lib/types";
import { getShortDesc } from "@/lib/utils";
import { useAuth } from "@/stores/useAuth";
import { usePerfumes } from "@/stores/usePerfumes";
import { useTogglers } from "@/stores/useTogglers";
import { Heart, Pencil, PencilOff, ShoppingCart } from "lucide-vue-next";
import { ref } from "vue";
import Button from "./ui/button/Button.vue";
import Textarea from "./ui/textarea/Textarea.vue";
import Input from "./ui/input/Input.vue";

defineProps<{ perfume: FetchedPerfumeType }>();

const togglersStore = useTogglers();
const perfumesStore = usePerfumes();
const authStore = useAuth();

const isEditing = ref<boolean>(false);

const price = ref<number>();
const name = ref<string>();
const type = ref<string>();
const description = ref<string>();

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const isDescriptionLess = ref(true);

const toggleDescription = () => {
  isDescriptionLess.value = !isDescriptionLess.value;
};

const likePerfume = async (item: FetchedPerfumeType) => {
  if (!perfumesStore.likedIds.includes(item.id)) {
    //Like
    perfumesStore.likedIds.push(item.id);
    perfumesStore.likedPerfumes.push(item);
  } else {
    //Dislike
    perfumesStore.likedIds = perfumesStore.likedIds.filter(
      (likedId) => likedId !== item.id
    );

    perfumesStore.likedPerfumes = perfumesStore.likedPerfumes.filter(
      (perfume) => perfume.id !== item.id
    );
  }

  try {
    const { error } = await supabase.auth.updateUser({
      data: {
        likedIds: perfumesStore.likedIds,
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

const handleSubmit = async (perfume: FetchedPerfumeType) => {
  try {
    const { data, error } = await supabase
      .from("perfumes")
      .update({
        name: (name.value ??= perfume.name),
        price: (price.value ??= perfume.price),
        type: (type.value ??= perfume.type),
        description: (description.value ??= perfume.description),
      })
      .eq("id", perfume.id);

    if (error) throw new Error("Insert error!");

    perfumesStore.perfumes = data!;
  } catch (error) {
    return;
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
      <form v-if="isEditing" @submit.prevent="handleSubmit(perfume)">
        <Input
          :default-value="perfume.name"
          class="text-xl font-semibold text-gray-800 mb-2 focus-visible:ring-primary"
          v-model:model-value="name"
        />

        <Input
          :default-value="perfume.type"
          class="text-base font-thin text-primary mb-2 focus-visible:ring-primary"
          v-model:model-value="type"
        />

        <Textarea
          :default-value="perfume.description"
          class="text-gray-600 text-justify min-h-24 focus-visible:ring-primary"
          v-model:model-value="description"
        />

        <div class="flex justify-between mt-4 place-items-center">
          <Input
            :default-value="perfume.price.toFixed(2)"
            class="font-bold text-primary w-32"
            type="number"
            step="0.01"
            v-model:model-value="price"
          />
          <div @click="toggleEdit">
            <Button variant="default" type="submit" class="text-white"
              >Save Changes</Button
            >
          </div>
        </div>
      </form>

      <h3 v-if="!isEditing" class="text-xl font-semibold text-gray-800 mb-2">
        {{ perfume.name }}
      </h3>

      <p v-if="!isEditing" class="text-base font-thin text-primary mb-2">
        {{ perfume.type }}
      </p>

      <p v-if="!isEditing" class="text-gray-600 mb-4 text-justify">
        {{
          isDescriptionLess
            ? getShortDesc(perfume.description)
            : perfume.description
        }}
      </p>

      <p
        v-if="!isEditing"
        @click="toggleDescription"
        class="text-primary text-right -mt-4 mb-16 cursor-pointer"
      >
        {{ isDescriptionLess ? "More" : "Less" }}
      </p>
      <div
        v-if="!isEditing"
        class="absolute bottom-2 w-[calc(100%-1rem)] flex items-center justify-between"
      >
        <span class="font-bold text-primary"
          >{{ perfume.price.toFixed(2) }} $</span
        >
        <div class="flex justify-between items-center">
          <button
            class="text-gray-600 px-3 py-2 rounded-full hover:text-red-600 transition duration-300"
            @click="likePerfume(perfume)"
          >
            <span class="sr-only">Like</span>
            <Heart
              :class="
                perfumesStore.likedIds.includes(perfume.id)
                  ? 'text-red-600 transition duration-300'
                  : ''
              "
              :fill="
                perfumesStore.likedIds.includes(perfume.id)
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
      <div v-if="authStore.isAdmin" @click="toggleEdit">
        <Button variant="outline" class="absolute top-2 right-2 w-10 h-10 p-0">
          <component
            class="h-4 w-4"
            :is="isEditing ? PencilOff : Pencil"
          /><span class="sr-only">Edit Card</span>
        </Button>
      </div>
    </div>
  </div>
</template>
