<script setup lang="ts">
import { ref, computed } from "vue";
import {
  ShoppingCartIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
  MailIcon,
  CircleCheckBig,
} from "lucide-vue-next";
import { CartPerfumeType } from "@/lib/types";
import { usePerfumes } from "@/stores/usePerfumes";
import { SHIPPING, TAX_RATE } from "@/lib/constants";
import supabase from "@/lib/supabase-client";
import { RouterLink } from "vue-router";
import { useAuth } from "@/stores/useAuth";
import { Input } from "@/components/ui/input";
import { VueSpinnerBall } from "vue3-spinners";
import Button from "@/components/ui/button/Button.vue";

const perfumesStore = usePerfumes();
const authStore = useAuth();

const email = ref<string>(authStore.userData?.email || "");
const isLoading = ref<boolean>(false);
const isSuccessful = ref<boolean>(false);

const subtotal = computed(() => {
  return perfumesStore.cartPerfumes.reduce(
    (total, item) => total + item.price * item.quantity!,
    0
  );
});

const shipping = ref(SHIPPING);
const taxRate = TAX_RATE;

const tax = computed(() => {
  return subtotal.value * taxRate;
});

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value;
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

const checkout = async () => {
  try {
    isLoading.value = true;

    const { error } = await supabase.from("orders").insert({
      uid: authStore.userData?.id!,
      email: email.value,
      order: perfumesStore.cartPerfumes,
      summary: total.value,
      message: perfumesStore.cartPerfumes.map(
        (perfume) => `${perfume.name} x${perfume.quantity}`
      ),
    });

    if (error) throw error;

    perfumesStore.cartIds = [];
    perfumesStore.cartPerfumes = [];

    await supabase.auth
      .updateUser({
        data: {
          cartIds: perfumesStore.cartIds,
          cartPerfumes: perfumesStore.cartPerfumes,
        },
      })
      .then(() => {
        setTimeout(() => {
          isLoading.value = false;
          isSuccessful.value = true;
        }, 2000);
      });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
</script>

<template>
  <div class="min-h-fullsize bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-semibold text-gray-800 mb-6">
        Your Shopping Cart
      </h1>

      <div
        v-if="
          perfumesStore.cartPerfumes.length === 0 && !isLoading && !isSuccessful
        "
        class="text-center py-12"
      >
        <ShoppingCartIcon class="mx-auto h-20 w-20 text-gray-400 mb-4" />
        <h2 class="text-2xl font-semibold text-gray-600 mb-2">
          Your cart is empty
        </h2>
        <p class="text-gray-500 mb-4">
          Looks like you haven't added any items to your cart yet.
        </p>
        <RouterLink
          to="/shop"
          class="inline-block bg-primary text-white px-5 py-3 rounded-md hover:bg-opacity-90 transition duration-300"
        >
          Continue Shopping
        </RouterLink>
      </div>

      <div v-else-if="isLoading" class="text-center py-12">
        <VueSpinnerBall color="#df4164" size="150" class="mx-auto mb-12" />
        <h2 class="text-3xl font-semibold text-gray-600 mb-10">
          Your order is being processed...
        </h2>
      </div>

      <div v-else-if="isSuccessful" class="text-center py-12">
        <CircleCheckBig class="mx-auto h-28 w-28 text-green-500 mb-4" />
        <h2 class="text-3xl font-semibold text-gray-600 mb-6">
          Your order has been successfully processed.<br />Please await further
          contact from us
        </h2>
        <RouterLink
          to="/"
          class="inline-block bg-primary text-white px-5 py-3 rounded-md hover:bg-opacity-90 transition duration-300"
        >
          Back to Home page
        </RouterLink>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-2/3">
          <div
            v-for="item in perfumesStore.cartPerfumes"
            :key="item.id"
            class="bg-white rounded-lg shadow-md p-6 mb-4 flex items-center"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div class="flex-grow">
              <h3 class="text-lg font-semibold text-gray-800">
                {{ item.name }}
              </h3>
              <p class="text-primary font-thin">{{ item.type }}</p>
              <p class="text-gray-600">{{ item.description }}</p>
              <div class="mt-2 flex items-center">
                <button
                  @click="decreaseQuantity(item)"
                  class="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <MinusCircleIcon class="h-5 w-5" />
                </button>
                <span class="mx-2 text-gray-700">{{ item.quantity }}</span>
                <button
                  @click="increaseQuantity(item)"
                  class="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <PlusCircleIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
            <div class="text-right">
              <p class="text-lg font-semibold text-primary">
                ${{ (item.price * item.quantity!).toFixed(2) }}
              </p>
              <button
                @click="removeItem(item)"
                class="text-red-500 hover:text-red-700 focus:outline-none mt-2"
              >
                <TrashIcon
                  class="h-5 w-5 text-secondary hover:text-primary transition duration-300 mt-1"
                />
              </button>
            </div>
          </div>
        </div>

        <div class="lg:w-1/3">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Subtotal</span>
              <span class="text-gray-800 font-semibold"
                >${{ subtotal.toFixed(2) }}</span
              >
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Shipping</span>
              <span class="text-gray-800 font-semibold"
                >${{ shipping.toFixed(2) }}</span
              >
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Tax</span>
              <span class="text-gray-800 font-semibold"
                >${{ tax.toFixed(2) }}</span
              >
            </div>
            <div class="border-t border-gray-200 mt-4 pt-4">
              <div class="flex justify-between mb-2">
                <span class="text-lg font-semibold text-gray-800">Total</span>
                <span class="text-lg font-semibold text-primary"
                  >${{ total.toFixed(2) }}</span
                >
              </div>
            </div>
            <form @submit.prevent="checkout">
              <div>
                <div class="mt-8 relative rounded-md shadow-sm">
                  <div class="inset-y-0 left-0 pl-3 flex gap-3 items-center">
                    <MailIcon class="h-6 w-6 text-primary" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      v-model="email"
                      class="block w-full pl-3 sm:text-base rounded-md"
                      placeholder="Tell us your email.."
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                class="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition duration-300 mt-4"
              >
                Proceed to Checkout
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
