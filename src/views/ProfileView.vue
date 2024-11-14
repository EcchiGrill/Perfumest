<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { History, Settings, Star } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useAuth } from "../stores/useAuth";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import OrdersTable from "@/components/ui/OrdersTable.vue";
import { usePerfumes } from "@/stores/usePerfumes";
import Perfume from "@/components/Perfume.vue";
import AdminView from "./AdminView.vue";

const perfumesStore = usePerfumes();
const authStore = useAuth();
const router = useRouter();

const tabs = [
  { name: "orders", label: "Orders History", icon: History },
  { name: "favourites", label: "Favourite Perfumes", icon: Star },
  { name: "settings", label: "Settings", icon: Settings },
];

const getDate = computed(() => {
  const parsed = new Date(Date.parse(authStore.userData?.created_at!));
  return parsed.toLocaleDateString(["en-US"], {
    month: "long",
    year: "numeric",
  });
});

const currentTab = ref("orders");

const settings = ref({
  email: authStore.userData?.email,
  password: "",
});

const saveSettings = () => {
  console.log("Settings saved:", settings.value);
};

onMounted(() => !authStore.isLogged && router.push("/login"));
</script>

<template>
  <AdminView v-if="authStore.isAdmin" />

  <div v-else class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <!-- Profile Header -->
        <div
          class="bg-primary-light p-6 sm:p-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between"
        >
          <div class="sm:flex sm:items-center">
            <img
              class="mx-auto sm:mx-0 h-24 w-24 rounded-full object-cover border-2 border-white shadow-lg"
              src="https://www.cbnagro.tech/wp-content/uploads/2021/10/icon_member.jpeg"
              alt="Profile picture"
            />
            <div class="mt-4 sm:mt-0 sm:ml-6">
              <h1 class="text-2xl font-bold text-gray-900">
                {{ authStore.userData?.app_metadata.fullName }}
              </h1>
              <p class="text-sm text-gray-600">{{ getDate }}</p>
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
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                    >Email</label
                  >
                  <Input
                    type="email"
                    id="email"
                    v-model="settings.email"
                    class="mt-1"
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >New Password</label
                  >
                  <Input
                    type="password"
                    id="password"
                    v-model="settings.password"
                    class="mt-1"
                  />
                </div>
                <div>
                  <label for="notifications" class="flex items-center">
                    <Input
                      type="checkbox"
                      id="notifications"
                      class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-600"
                      >Receive email notifications</span
                    >
                  </label>
                </div>
                <div class="flex justify-between">
                  <Button
                    variant="default"
                    type="submit"
                    class="text-white mt-1"
                  >
                    Save Changes
                  </Button>
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
