import supabase from "@/lib/supabase-client";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./useAuth";
import { FetchedOrdersType } from "@/lib/types";

export const useOrders = defineStore("orders", () => {
  const authStore = useAuth();
  const orders = ref<FetchedOrdersType>([]);

  console.log(orders.value);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select()
        .eq("uid", authStore.userData?.id!);

      if (error) throw new Error("Fetching Error");

      orders.value = data;
    } catch (error) {
      return;
    }
  };

  return {
    orders,
    fetchOrders,
  };
});
