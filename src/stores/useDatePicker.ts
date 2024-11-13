import { defineStore } from "pinia";
import { ref } from "vue";
import { type DateValue } from "@internationalized/date";

export const useDatePicker = defineStore("datePicker", () => {
  const value = ref<DateValue>();

  return { value };
});
