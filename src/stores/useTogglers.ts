import { defineStore } from "pinia";
import { ref } from "vue";

export const useTogglers = defineStore("togglers", () => {
  const isCartOpen = ref(false);
  const isMenuOpen = ref(false);
  const isModal = ref(false);

  const toggleMenu = () => {
    if (isCartOpen.value) toggleCart();
    isMenuOpen.value = !isMenuOpen.value;
  };

  const toggleCart = () => {
    if (isMenuOpen.value) toggleMenu();
    isCartOpen.value = !isCartOpen.value;
  };
  const toggleModal = () => {
    return (isModal.value = !isModal.value);
  };

  return {
    isCartOpen,
    isMenuOpen,
    isModal,
    toggleMenu,
    toggleCart,
    toggleModal,
  };
});
