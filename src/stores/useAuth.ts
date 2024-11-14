import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/constants";
import supabase from "@/lib/supabase-client";
import { ILogin, IRegister } from "@/lib/types";
import { Session, User } from "@supabase/supabase-js";
import { useCookies } from "@vueuse/integrations/useCookies.mjs";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuth = defineStore("auth", () => {
  const userSession = ref<Session | null>(null);
  const userData = ref<User | null | undefined>(null);
  const isLogged = ref<boolean>(false);
  const isAdmin = ref<boolean>(false);

  const { set, remove } = useCookies(["session"]);

  const signUser = async (user: ILogin) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      set("session", data.session?.access_token);

      userSession.value = data.session;
      userData.value = data.user;

      isLogged.value = true;

      if (user.email === ADMIN_EMAIL && user.password === ADMIN_PASSWORD)
        isAdmin.value = true;

      return data;
    } catch (error) {
      return;
    }
  };

  const registerUser = async (user: IRegister) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            full_name: user.fullName,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
          },
        },
      });

      if (error) throw new Error(error.message);

      set("session", data.session?.access_token);

      userSession.value = data.session;
      userData.value = data.user;

      isLogged.value = true;
    } catch (error) {
      return;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      remove("session");
      userSession.value = null;
      userData.value = null;
      isLogged.value = false;
      isAdmin.value = false;
    } catch (error) {
      return;
    }
  };

  return {
    userSession,
    userData,
    isLogged,
    isAdmin,
    signUser,
    registerUser,
    signOut,
  };
});
