<script setup lang="ts">
import { ref } from "vue";
import supabase from "@/lib/supabase-client";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import Input from "@/components/ui/input/Input.vue";
import { usePerfumes } from "@/stores/usePerfumes";
import Button from "./ui/button/Button.vue";

const perfumesStore = usePerfumes();

const name = ref<string>();
const price = ref<number>();
const image = ref<string>();
const type = ref<string>();
const description = ref<string>();

const handleSubmit = async () => {
  try {
    const { data, error } = await supabase.from("perfumes").insert({
      price: price.value,
      name: name.value,
      image: image.value,
      description: description.value,
      type: type.value,
    });

    if (error) throw new Error("Insert error!");

    perfumesStore.perfumes = data!;
  } catch (error) {
    return;
  }
};
</script>
<template>
  <div
    class="relative bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105"
  >
    <div class="p-4">
      <form @submit.prevent="handleSubmit">
        <img
          :src="(image ??= 'https://placehold.co/400')"
          class="w-full h-64 object-cover mb-2"
        />

        <Input
          class="text-xl font-semibold text-gray-800 mb-2 focus-visible:ring-primary"
          v-model:model-value="image"
          placeholder="Type image url.."
          required
        />

        <Input
          class="text-xl font-semibold text-gray-800 mb-2 focus-visible:ring-primary"
          v-model:model-value="name"
          placeholder="Perfume name.."
          required
        />

        <Input
          class="text-base font-thin text-primary mb-2 focus-visible:ring-primary"
          v-model:model-value="type"
          placeholder="Perfume type.."
          required
        />

        <Textarea
          class="text-gray-600 text-justify min-h-24 focus-visible:ring-primary"
          v-model:model-value="description"
          placeholder="Perfume description.."
          required
        />

        <div class="flex justify-between mt-2 gap-4 place-items-center">
          <Input
            class="font-bold text-primary w-2/5 focus-visible:ring-primary"
            type="number"
            step="0.01"
            v-model:model-value="price"
            required
          />

          <Button variant="default" type="submit" class="text-white w-3/5"
            >Submit</Button
          >
        </div>
      </form>
    </div>
  </div>
</template>
