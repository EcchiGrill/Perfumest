<script setup lang="ts">
import { computed } from "vue";
import {
  ShoppingCartIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  MoveRight,
} from "lucide-vue-next";
import Separator from "@/components/ui/separator/Separator.vue";
import { useTogglers } from "@/stores/useTogglers";
import { usePerfumes } from "@/stores/usePerfumes";
import { CartPerfumeType } from "@/lib/types";
import supabase from "@/lib/supabase-client";
import Button from "@/components/ui/button/Button.vue";

const togglersStore = useTogglers();
const perfumesStore = usePerfumes();

const subtotal = computed(() => {
  return perfumesStore.cartPerfumes.reduce(
    (total, item) => total + item.price * item.quantity!,
    0
  );
});

const increaseQuantity = (item: CartPerfumeType) => {
  if (!item.quantity) return;
  item.quantity++;
};

const decreaseQuantity = (item: CartPerfumeType) => {
  if (!item.quantity) return;

  const count = item.quantity;

  if (count > 1) {
    item.quantity--;
  }
  if (count === 1) {
    removeItem(item);
  }
};

const removeItem = async (itemToRemove: CartPerfumeType) => {
  perfumesStore.cartIds = perfumesStore.cartIds.filter(
    (cartId) => cartId !== itemToRemove.id
  );
  perfumesStore.cartPerfumes = perfumesStore.cartPerfumes.filter(
    (perfume) => perfume.id !== itemToRemove.id
  );

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
  <transition
    enter-active-class="transition ease-in duration-200"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-out duration-150"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="togglersStore.isCartOpen">
      <div
        class="w-96 transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
      >
        <div as="h3" class="text-lg font-medium leading-6 text-gray-900 mb-5">
          Your Shopping Cart
        </div>

        <div class="mt-4">
          <div
            v-if="perfumesStore.cartPerfumes.length === 0"
            class="text-center py-4"
          >
            <ShoppingCartIcon class="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p class="text-gray-500">Your cart is empty</p>
          </div>
          <div v-else>
            <ul role="list" class="-my-6 divide-y divide-gray-200">
              <li
                v-for="item in perfumesStore.cartPerfumes"
                :key="item.id"
                class="flex py-6"
              >
                <div
                  class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                >
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="h-full w-full object-cover object-center"
                  />
                </div>
                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <h3>{{ item.name }}</h3>
                      <p class="ml-4">
                        ${{ (item.price * item.quantity!).toFixed(2) }}
                      </p>
                    </div>
                    <p class="mt-1 text-sm text-primary font-thin">
                      {{ item.type }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500">
                      {{ item.description }}
                    </p>
                  </div>
                  <div
                    class="flex flex-1 items-end justify-between text-sm mt-2.5"
                  >
                    <div class="flex items-center">
                      <button
                        @click="decreaseQuantity(item)"
                        class="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <MinusCircleIcon class="h-5 w-5" />
                      </button>
                      <span class="mx-2 text-gray-700">{{
                        item.quantity
                      }}</span>
                      <button
                        @click="increaseQuantity(item)"
                        class="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <PlusCircleIcon class="h-5 w-5" />
                      </button>
                    </div>
                    <button
                      @click="removeItem(item)"
                      class="font-medium text-primary hover:text-primary-dark"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            </ul>

            <div class="border-t border-gray-200 mt-6 pt-4">
              <div
                class="flex justify-between text-base font-medium text-gray-900"
              >
                <p>Subtotal</p>
                <p>${{ subtotal.toFixed(2) }}</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
          </div>

          <div class="mt-6">
            <RouterLink to="/checkout" @click="togglersStore.toggleCart">
              <Button
                :disabled="perfumesStore.cartPerfumes.length === 0"
                class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout
              </Button>
            </RouterLink>
          </div>
          <div
            class="mt-6 flex flex-col items-center gap-2 text-sm text-gray-500"
          >
            <Separator label="Or" class="w-full" />
            <RouterLink
              to="/shop"
              class="font-medium text-primary group block"
              @click="togglersStore.toggleCart"
            >
              <div class="flex items-center gap-1">
                Continue Shopping <MoveRight class="mt-1" width="16" />
              </div>
              <span
                class="block w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-primary"
              ></span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
