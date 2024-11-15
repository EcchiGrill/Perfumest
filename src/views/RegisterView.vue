<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  LoaderIcon,
  Facebook,
  Twitter,
} from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import DatePicker from "@/components/ui/DatePicker.vue";
import { useDatePicker } from "@/stores/useDatePicker";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import ModalBg from "@/modals/ModalBg.vue";
import GoogleIcon from "@/assets/GoogleIcon.vue";
import { useAuth } from "@/stores/useAuth";
import { useRouter } from "vue-router";
import { closeModal } from "jenesius-vue-modal";

const authStore = useAuth();
const router = useRouter();

const fullName = ref("");
const email = ref("");
const password = ref("");
const dateStore = useDatePicker();
const gender = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const errors = reactive({
  password: "",
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
  if (password.value.length < 8) {
    errors.password = "Password must be at least 8 characters long";
    return;
  }

  errors.password = "";

  console.log(fullName.value);
  console.log(email.value);
  console.log(password.value);
  console.log(dateStore.value?.toString());
  console.log(gender.value);

  authStore.registerUser({
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    dateOfBirth: dateStore.value?.toString()!,
    gender: gender.value,
  });
};

onBeforeMount(() => {
  authStore.isLogged && router.push("/profile");
});
</script>

<template>
  <div class="z-30 sm:mx-auto sw-full max-w-md mx-4 cursor-auto">
    <div class="bg-white shadow rounded-lg py-6 md:py-8 px-8 xs:px-14">
      <div class=":mx-auto">
        <h2 class="text-center text-3xl font-bold text-secondary mb-6">
          Create your Perfumest account
        </h2>
      </div>
      <form class="space-y-3 md:space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <UserIcon class="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              v-model="fullName"
              class="block w-full pl-10 sm:text-sm rounded-md border-gray-300"
              placeholder="John Doe"
            />
          </div>
        </div>

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
              required
              v-model="password"
              :class="[
                'block w-full pl-10 pr-10 sm:text-sm rounded-md',
                errors.password
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300',
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

        <div>
          <label
            for="dateOfBirth"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth
          </label>
          <DatePicker
            id="dateOfBirth"
            name="dateOfBirth"
            required
            class="w-full"
            v-model="dateStore.value"
          />
        </div>

        <div>
          <label
            for="gender"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>

          <Select id="gender" name="gender" required v-model="gender">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="empty">Empty</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            class="h-4 w-4 border-gray-300 rounded accent-primary"
          />
          <label for="terms" class="ml-2 flex gap-1 text-sm text-secondary">
            I agree to the
            <a
              @click="
                () => {
                  closeModal();
                  $router.push('/terms');
                }
              "
              class="group block -mb-0.5 text-primary"
              >Terms and Conditions<span
                class="block w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-primary"
              ></span
            ></a>
          </label>
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
            {{ isLoading ? "Creating account..." : "Create account" }}
          </Button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500"> Or sign up with </span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-3">
          <div>
            <a
              href="#"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Sign up with Facebook</span>
              <Facebook class="h-5 w-5" />
            </a>
          </div>
          <div>
            <a
              href="#"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Sign up with Twitter</span>
              <Twitter class="h-5 w-5" />
            </a>
          </div>
          <div>
            <a
              href="#"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Sign up with Google</span>
              <GoogleIcon class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalBg />
</template>
