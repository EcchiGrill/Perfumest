<script setup lang="ts">
import { ref, reactive } from "vue";
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

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const errors = reactive({
  email: "",
  password: "",
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// const validateEmail = (email: string) => {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(email);
// };

const handleSubmit = async () => {
  console.log(email);
  console.log(password);

  errors.email = "";
  errors.password = "";

  //   // Validate email
  //   if (!validateEmail(email.value)) {
  //     errors.email = "Please enter a valid email address";
  //     return;
  //   }

  //   // Validate password
  //   if (password.value.length < 8) {
  //     errors.password = "Password must be at least 8 characters long";
  //     return;
  //   }

  //   // If validation passes, proceed with login
  //   try {
  //     isLoading.value = true;
  //     // Simulating an API call
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     console.log("Login successful", {
  //       email: email.value,
  //       password: password.value,
  //       rememberMe: rememberMe.value,
  //     });
  //     // Here you would typically redirect the user or update the app state
  //   } catch (error) {
  //     console.error("Login failed", error);
  //     // Handle login error (e.g., show a notification)
  //   } finally {
  //     isLoading.value = false;
  //   }
};
</script>

<template>
  <div class="z-30 mt-8 sm:mx-auto sw-full max-w-xl mx-2 cursor-auto">
    <div class="bg-white shadow rounded-lg py-10 px-7 xs:px-14">
      <div class=":mx-auto">
        <h2 class="text-center text-3xl font-bold text-secondary mb-10">
          Sign in to Perfumest
        </h2>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit">
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
              :class="[
                'block w-full pl-10 sm:text-sm rounded-md ',
                errors.email
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-gold focus:border-gold',
              ]"
              placeholder="you@example.com"
            />
          </div>
          <p v-if="errors.email" class="mt-2 text-sm text-red-600">
            {{ errors.email }}
          </p>
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
              :class="[
                'block w-full pl-10 pr-10 sm:text-sm rounded-md',
                errors.password
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-gold focus:border-gold',
              ]"
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
          <p v-if="errors.password" class="mt-2 text-sm text-red-600">
            {{ errors.password }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="rememberMe"
              class="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded accent-primary"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium hover:text-primary transition duration-300"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-secondary"
          >
            <LoaderIcon
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            />
            {{ isLoading ? "Signing in..." : "Sign in" }}
          </Button>
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
