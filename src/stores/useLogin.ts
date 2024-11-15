import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./useAuth";

export const useLogin = defineStore("login", () => {
  const authStore = useAuth();

  const email = ref("");
  const password = ref("");
  const isLoading = ref(false);

  const handleSubmit = async () => {
    isLoading.value = true;
    authStore
      .signUser({
        email: email.value,
        password: password.value,
      })
      .finally(() => (isLoading.value = false));

    email.value = "";
    password.value = "";
  };

  return {
    email,
    password,
    isLoading,
    handleSubmit,
  };
});
