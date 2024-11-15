import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./useAuth";
import { useDatePicker } from "./useDatePicker";

export const useRegister = defineStore("register", () => {
  const authStore = useAuth();
  const dateStore = useDatePicker();

  const fullName = ref("");
  const email = ref("");
  const password = ref("");
  const gender = ref("");

  const isLoading = ref(false);
  const passwordError = ref<string>("");

  const handleSubmit = async () => {
    if (password.value.length < 8) {
      passwordError.value = "Password must be at least 8 characters long";
      return;
    }
    passwordError.value = "";

    isLoading.value = true;

    authStore
      .registerUser({
        fullName: fullName.value,
        email: email.value,
        password: password.value,
        dateOfBirth: dateStore.value?.toString()!,
        gender: gender.value,
      })
      .finally(() => (isLoading.value = false));

    fullName.value = "";
    password.value = "";
    gender.value = "";
    dateStore.value = undefined;
  };

  return {
    email,
    password,
    fullName,
    gender,
    isLoading,
    passwordError,
    handleSubmit,
  };
});
