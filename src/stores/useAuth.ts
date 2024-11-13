import { Session, User } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuth = defineStore("auth", () => {
  const userSession = ref<Session | null>(null);
  const userData = ref<User | null | undefined>(null);
  const isLogged = ref<boolean>(false);

  return {
    userSession,
    userData,
    isLogged,
  };
});
