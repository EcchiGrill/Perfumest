<script setup lang="ts">
import supabase from "@/lib/supabase-client";
import { onMounted } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useAuth } from "@/stores/useAuth";
import { useOrders } from "@/stores/useOrders";
import { usePerfumes } from "@/stores/usePerfumes";
import { ADMIN_EMAIL } from "@/lib/constants";

const { set, remove } = useCookies(["session"]);
const authStore = useAuth();
const ordersStore = useOrders();
const perfumesStore = usePerfumes();

const checkUserSession = async () => {
  supabase.auth
    .getSession()
    .then(({ data }) => {
      if (!data.session) {
        signInAnon();
      } else if (data.session && data.session.user.email) {
        authStore.isLogged = true;

        if (data.session.user.email === ADMIN_EMAIL) authStore.isAdmin = true;
      }

      set("session", data.session?.access_token);

      authStore.userSession = data.session;
      authStore.userData = data.session?.user;

      perfumesStore.fetchPerfumes();

      if (authStore.isAdmin) {
        ordersStore.fetchAdminOrders();
      } else if (data.session && authStore.isLogged && !authStore.isAdmin) {
        ordersStore.fetchOrders();
      }

      supabase.auth.onAuthStateChange((event, session) => {
        set("session", session?.access_token || "");

        if (event === "SIGNED_OUT") remove("session");

        authStore.userSession = event === "SIGNED_OUT" ? null : session;
        authStore.userData = event === "SIGNED_OUT" ? null : session?.user;
      });
    })
    .catch((error) => {
      remove("session");
      authStore.userSession = null;
      authStore.userData = null;
      throw new Error(error.message);
    });
};

const signInAnon = async () => {
  try {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error) throw error;

    authStore.userSession = data.session;
    authStore.userData = data.user;

    set("session", data.session?.access_token);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

onMounted(() => {
  checkUserSession();
});
</script>

<template>
  <slot />
</template>
