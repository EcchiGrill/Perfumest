<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  History,
  MoveRight,
  Settings,
  ShoppingBasket,
  Star,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useAuth } from "../stores/useAuth";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import OrdersTable from "@/components/ui/OrdersTable.vue";
import { usePerfumes } from "@/stores/usePerfumes";
import Perfume from "@/components/Perfume.vue";
import supabase from "@/lib/supabase-client";
import { useToast } from "vue-toastification";

const perfumesStore = usePerfumes();
const authStore = useAuth();
const router = useRouter();
const toast = useToast();

const errors = reactive({
  password: "",
  password2: "",
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const password = ref<string>("");
const password2 = ref<string>("");
const isLoading = ref<boolean>(false);

const tabs = [
  { name: "orders", label: "Orders History", icon: History },
  { name: "favourites", label: "Favourite Perfumes", icon: Star },
  { name: "settings", label: "Settings", icon: Settings },
];

const currentTab = ref("orders");

const saveSettings = async () => {
  if (password.value.length < 8) {
    errors.password = "Password must be at least 8 characters long";
    return;
  }

  if (password.value !== password2.value) {
    errors.password2 = "Passwords must match each other!";
    errors.password = "";
    return;
  }

  try {
    isLoading.value = true;

    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser({
      password: password.value,
    });

    errors.password = "";
    errors.password2 = "";

    if (error) throw error;

    authStore.userData = user;

    setTimeout(() => {
      toast.success("Successfully updated password!");
    }, 2000);
  } catch (error) {
    if (error instanceof Error) {
      return toast.error(error.message);
    }
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
};

onMounted(() => !authStore.isLogged && router.push("/login"));
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <!-- Profile Header -->
        <div
          class="bg-primary-light p-6 sm:p-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between"
        >
          <div class="sm:flex sm:items-center">
            <img
              class="mx-auto sm:mx-0 h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
              src="https://i.pinimg.com/736x/fb/c5/ee/fbc5ee78726ad2c69eff28fecead1b59.jpg"
              alt="Profile picture"
            />
            <div class="mt-4 sm:mt-0 sm:ml-6">
              <h1 class="text-2xl font-bold text-gray-900">EcchiGrill</h1>
              <p class="text-sm text-gray-600">####</p>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex">
            <button
              v-for="tab in tabs"
              :key="tab.name"
              @click="currentTab = tab.name"
              :class="[
                currentTab === tab.name
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'flex items-center place-content-center w-1/3 py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              <component :is="tab.icon" class="min-w-5 min-h-5 mr-2" />
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Main Panel -->
          <div v-if="currentTab === 'orders'" class="space-y-6">
            <OrdersTable />
          </div>

          <!-- Settings Panel -->
          <div v-if="currentTab === 'settings'" class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-6">
                Account Settings
              </h2>
              <form @submit.prevent="saveSettings" class="space-y-4">
                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >New Password</label
                  >
                  <div
                    class="flex place-content-center place-items-center gap-3 w-1/3"
                  >
                    <Input
                      :type="showPassword ? 'text' : 'password'"
                      id="password"
                      v-model="password"
                      :class="[
                        'mt-1',
                        errors.password
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300',
                      ]"
                      required
                    />
                    <div class="mt-0.5 flex items-center">
                      <Button
                        variant="outline"
                        @click="togglePasswordVisibility"
                        class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                      >
                        <EyeIcon v-if="showPassword" class="h-5 w-5" />
                        <EyeOffIcon v-else class="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                    {{ errors.password }}
                  </p>

                  <div>
                    <label
                      for="password2"
                      class="block text-sm font-medium text-gray-700 mt-2"
                      >Confirm Password</label
                    >

                    <Input
                      type="password"
                      id="password2"
                      v-model="password2"
                      :class="[
                        'mt-1 w-1/3',
                        errors.password2
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300',
                      ]"
                      required
                    />
                  </div>
                  <p v-if="errors.password2" class="text-sm mt-1 text-red-600">
                    {{ errors.password2 }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <button
                    type="submit"
                    :class="
                      'text-white text-sm mt-1 bg-primary shadow hover:bg-primary/90 hover:bg-opacity-90 p-2 py-1 rounded-md cursor-pointer ' +
                      `${isLoading && ' bg-opacity-45 pointer-events-none'} `
                    "
                    :disabled="isLoading"
                  >
                    Save Changes
                  </button>
                  <div @click="authStore.signOut">
                    <Button variant="destructive" class="text-white mt-1 px-4">
                      Sign Out
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Favourite Perfumes Panel -->
          <div v-if="currentTab === 'favourites'" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">
              My Favourite Perfumes
            </h2>

            <div
              v-if="perfumesStore.likedPerfumes.length === 0"
              class="flex flex-col place-content-center place-items-center h-[20vh] text-center"
            >
              <ShoppingBasket class="h-24 w-24 text-gray-500" />
              <p class="mt-2">
                It looks like you haven’t discovered your favorite scent yet
              </p>
              <RouterLink
                to="/shop"
                class="-mb-0.5 group text-primary flex mt-1"
                ><div class="block">
                  Visit our store
                  <span
                    class="block w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-primary"
                  ></span>
                </div>
                <MoveRight class="ml-0.5 mt-0.5" />
              </RouterLink>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Perfume
                v-for="perfume in perfumesStore.likedPerfumes"
                :perfume="perfume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
