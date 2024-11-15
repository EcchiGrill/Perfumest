import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/constants";
import supabase from "@/lib/supabase-client";
import { ILogin, IRegister } from "@/lib/types";
import { Session, User } from "@supabase/supabase-js";
import { useCookies } from "@vueuse/integrations/useCookies.mjs";
import { closeModal } from "jenesius-vue-modal";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export const useAuth = defineStore(
  "auth",
  () => {
    const userSession = ref<Session | null>(null);
    const userData = ref<User | null | undefined>(null);
    const isLogged = ref<boolean>(false);
    const isAdmin = ref<boolean>(false);
    const toast = useToast();
    const router = useRouter();

    const { set, remove } = useCookies(["session"]);

    const signUser = async (user: ILogin) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: user.password,
        });

        if (error) throw error;

        set("session", data.session?.access_token);

        userSession.value = data.session;
        userData.value = data.user;

        isLogged.value = true;

        if (user.email === ADMIN_EMAIL && user.password === ADMIN_PASSWORD)
          isAdmin.value = true;

        closeModal();
        router.go(0);
      } catch (error) {
        if (error instanceof Error) {
          return toast.error(error.message);
        }
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

        if (error) throw error;

        set("session", data.session?.access_token);

        userSession.value = data.session;
        userData.value = data.user;

        closeModal();
        isLogged.value = true;
        router.go(0);
      } catch (error) {
        if (error instanceof Error) {
          return toast.error(error.message);
        }
      }
    };

    const signOut = async () => {
      try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        remove("session");
        userSession.value = null;
        userData.value = null;
        isLogged.value = false;
        isAdmin.value = false;
        router.push("/").then(() => router.go(0));
      } catch (error) {
        if (error instanceof Error) {
          return toast.error(error.message);
        }
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
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["isLogged", "isAdmin"],
    },
  }
);
