import supabase from "@/lib/supabase-client";
import { defineStore } from "pinia";
import { useAuth } from "./useAuth";
import { FetchedOrdersType } from "@/lib/types";
import { useLocalStorage } from "@vueuse/core";

export const useOrders = defineStore("orders", () => {
  const authStore = useAuth();
  const orders = useLocalStorage<FetchedOrdersType>("orders", []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select()
        .eq("uid", authStore.userData?.id!);

      if (error) throw error;

      orders.value = data;
    } catch (error) {
      return;
    }
  };

  const fetchAdminOrders = async () => {
    try {
      const { data, error } = await supabase.from("orders").select();

      if (error) throw error;

      orders.value = data;
    } catch (error) {
      return;
    }
  };

  return {
    orders,
    fetchOrders,
    fetchAdminOrders,
  };
});
