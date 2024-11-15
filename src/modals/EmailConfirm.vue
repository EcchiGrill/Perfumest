<script setup lang="ts">
import { closeModal } from "jenesius-vue-modal";
import { MailIcon } from "lucide-vue-next";
import ModalBg from "@/modals/ModalBg.vue";
import Button from "@/components/ui/button/Button.vue";
import { useRegister } from "@/stores/useRegister";
import { useTogglers } from "@/stores/useTogglers";

const registerStore = useRegister();
const togglersStore = useTogglers();
</script>

<template>
  <TransitionChild
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
  </TransitionChild>

  <div class="z-30 sm:mx-auto w-full max-w-md mx-4 cursor-auto">
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <div
          class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
        >
          <h3 class="text-2xl font-semibold leading-6 text-gray-900">
            Email Confirmation
          </h3>
          <div class="mt-5 text-center">
            <p class="text-gray-500">We've sent a confirmation email to:</p>
            <p class="text-lg font-semibold text-primary">
              {{ registerStore.email }}
            </p>
            <div class="mt-4 flex items-center justify-center">
              <MailIcon class="h-24 w-24 text-gray-500" />
            </div>
            <p class="mt-4 text-gray-600">
              Please check your inbox and click on the confirmation link to
              complete the process.
            </p>
            <p class="text-sm mt-2 text-primary cursor-auto">
              If you don't see the email, please check your spam folder.
            </p>
            <div
              class="mt-6 text-center"
              @click="
                () => {
                  closeModal();
                  togglersStore.isModal = false;
                  registerStore.email = '';
                }
              "
            >
              <Button variant="default" class="text-white w-full" type="button">
                Got it, thanks!
              </Button>
            </div>
          </div>
        </div>
      </TransitionChild>
    </div>
  </div>
  <ModalBg />
</template>
