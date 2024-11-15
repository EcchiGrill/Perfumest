<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderIcon,
  Facebook,
  Twitter,
} from "lucide-vue-next";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import { openModal } from "jenesius-vue-modal";
import RegisterView from "@/views/RegisterView.vue";
import ModalBg from "@/modals/ModalBg.vue";
import GoogleIcon from "@/assets/GoogleIcon.vue";
import { useAuth } from "@/stores/useAuth";
import { useRouter } from "vue-router";
import { useLogin } from "@/stores/useLogin";
import { storeToRefs } from "pinia";

const authStore = useAuth();
const loginStore = useLogin();
const router = useRouter();

const { email, isLoading, password } = storeToRefs(loginStore);

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

onBeforeMount(() => {
  setTimeout(() => authStore.isLogged && router.push("/profile"));
});
</script>

<template>
  <div class="z-30 mt-8 sm:mx-auto sw-full max-w-xl mx-2 cursor-auto">
    <div class="bg-white shadow rounded-lg py-10 px-7 xs:px-14">
      <div class=":mx-auto">
        <h2 class="text-center text-3xl font-bold text-secondary mb-10">
          Sign in to Perfumest
        </h2>
      </div>

      <form class="space-y-6" @submit.prevent="loginStore.handleSubmit">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <MailIcon class="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="block w-full pl-10 sm:text-sm rounded-md border-gray-300"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <LockIcon class="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              v-model="password"
              class="'block w-full pl-10 pr-10 sm:text-sm rounded-md border-gray-300"
              placeholder="••••••••"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
              >
                <EyeIcon v-if="showPassword" class="h-5 w-5" />
                <EyeOffIcon v-else class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full text-sm bg-primary hover:bg-opacity-90 text-white py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
          >
            <LoaderIcon
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            />
            {{ isLoading ? "Signing in..." : "Sign in" }}
          </button>
        </div>
      </form>

      <div class="text-center">
        <Button
          variant="link"
          class="text-secondary flex gap-1.5 w-full hover:no-underline mt-1"
          >Don't have an account?

          <span
            class="-mb-0.5 group block text-primary"
            @click="openModal(RegisterView)"
            >Register<span
              class="block w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-primary"
            ></span
          ></span>
        </Button>
      </div>

      <div class="mt-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500"> Or continue with </span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-3">
          <div>
            <a
              href="#"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Sign in with Facebook</span>
              <Facebook class="h-5 w-5" />
            </a>
          </div>

          <div>
            <a
              href="#"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Sign in with Twitter</span>
              <Twitter class="h-5 w-5" />
            </a>
          </div>

          <div>
            <a
              href="#"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Sign in with Google</span>
              <GoogleIcon class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalBg />
</template>
