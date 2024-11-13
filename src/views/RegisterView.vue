<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
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

const fullName = ref("");
const email = ref("");
const password = ref("");
const dateStore = useDatePicker();
const gender = ref("");
const agreeToTerms = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const errors = reactive({
  fullName: "",
  email: "",
  password: "",
  dateOfBirth: "",
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// const validateEmail = (email: string) => {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(email);
// };

const handleSubmit = async () => {
  console.log(fullName.value);
  console.log(email.value);
  console.log(password.value);
  console.log(dateStore.value?.toString());
  console.log(gender.value);
  // Reset errors
  // Object.keys(errors).forEach((key) => (errors[key] = ""));
  // Validate full name
  // if (fullName.value.trim().length < 2) {
  //   errors.fullName = "Full name must be at least 2 characters long";
  // }
  // // Validate email
  // if (!validateEmail(email.value)) {
  //   errors.email = "Please enter a valid email address";
  // }
  // // Validate password
  // if (password.value.length < 8) {
  //   errors.password = "Password must be at least 8 characters long";
  // }
  // // Validate date of birth
  // if (!validateAge(dateOfBirth.value)) {
  //   errors.dateOfBirth = "You must be at least 18 years old to register";
  // }
  // // Check if there are any errors
  // if (Object.values(errors).some((error) => error !== "")) {
  //   return;
  // }
  // // If validation passes, proceed with registration
  // try {
  //   isLoading.value = true;
  //   // Simulating an API call
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   console.log("Registration successful", {
  //     fullName: fullName.value,
  //     email: email.value,
  //     password: password.value,
  //     dateOfBirth: dateOfBirth.value,
  //   });
  //   // Here you would typically redirect the user or update the app state
  // } catch (error) {
  //   console.error("Registration failed", error);
  //   // Handle registration error (e.g., show a notification)
  // } finally {
  //   isLoading.value = false;
  // }
};

const setScrollHidden = () =>
  document.documentElement.style.setProperty("--body-overflow", "hidden");

onMounted(setScrollHidden);
</script>

<template>
  <div class="z-30 mt-8 sm:mx-auto sw-full max-w-md mx-4 cursor-auto">
    <div class="bg-white shadow rounded-lg py-10 px-8 xs:px-14">
      <div class=":mx-auto">
        <h2 class="text-center text-3xl font-bold text-secondary mb-10">
          Create your Perfumest account
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="handleSubmit">
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
              :class="[
                'block w-full pl-10 sm:text-sm rounded-md',
                errors.fullName
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300',
              ]"
              placeholder="John Doe"
            />
          </div>
          <p v-if="errors.fullName" class="mt-2 text-sm text-red-600">
            {{ errors.fullName }}
          </p>
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
              :class="[
                'block w-full pl-10 sm:text-sm rounded-md',
                errors.email
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300',
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
          <p v-if="errors.dateOfBirth" class="mt-2 text-sm text-red-600">
            {{ errors.dateOfBirth }}
          </p>
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
            v-model="agreeToTerms"
            class="h-4 w-4 border-gray-300 rounded accent-primary"
          />
          <label for="terms" class="ml-2 flex gap-1 text-sm text-secondary">
            I agree to the
            <RouterLink to="#" class="group block -mb-0.5 text-primary"
              >Terms and Conditions<span
                class="block w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-primary"
              ></span
            ></RouterLink>
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
