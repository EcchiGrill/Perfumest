<script setup lang="ts">
import { ref } from "vue";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  LoaderIcon,
  Instagram,
  Linkedin,
} from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import Input from "@/components/ui/input/Input.vue";
import { Resend } from "resend";
import { RESEND_KEY } from "@/lib/constants";
import { useToast } from "vue-toastification";

const toast = useToast();

const form = ref({
  name: "",
  email: "",
  message: "",
});

const isLoading = ref(false);

const resend = new Resend(RESEND_KEY);

const handleSubmit = async () => {
  isLoading.value = true;

  try {
    const { error } = await resend.emails.send({
      from: `${form.value.name} <${form.value.email}>`,
      to: ["dmitry.oborsky@gmail.com"],
      subject: form.value.name,
      html: `<p>${form.value.message}</p>`,
    });

    if (error) throw error;

    form.value = {
      name: "",
      email: "",
      message: "",
    };

    toast.success("Thank you for your message. We will get back to you soon!");
  } catch (error) {
    if (error instanceof Error) {
      return toast.error(error.message);
    }
  } finally {
    setTimeout(() => (isLoading.value = false), 2000);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-12 text-center">
        Contact Us
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        <!-- Contact Form -->
        <div
          class="bg-white p-8 rounded-lg shadow-md flex flex-col justify-between h-max w-full self-center max-w-md"
        >
          <form @submit.prevent="handleSubmit">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">
              Send us a message
            </h2>

            <div class="mb-4">
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Name</label
              >
              <Input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div class="mb-4">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Email</label
              >
              <Input
                type="email"
                id="email"
                v-model="form.email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div class="mb-4">
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Message</label
              >
              <Textarea
                id="message"
                v-model="form.message"
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              ></Textarea>
            </div>
            <Button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center mt-5"
            >
              <LoaderIcon
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5"
              />
              {{ isLoading ? "Sending..." : "Send Message" }}
            </Button>
          </form>
        </div>

        <!-- Company Information and Map -->
        <div class="w-full">
          <div class="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">
              Our Information
            </h2>
            <div class="space-y-4">
              <div class="flex items-start">
                <MapPinIcon class="h-5 w-5 text-primary mr-2 mt-1" />
                <div>
                  <h3 class="font-semibold">Address</h3>
                  <p>Sportyvna Square, Kyiv, 01033</p>
                </div>
              </div>
              <div class="flex items-start">
                <PhoneIcon class="h-5 w-5 text-primary mr-2 mt-1" />
                <div>
                  <h3 class="font-semibold">Phone</h3>
                  <a
                    href="tel:+15551234567"
                    class="hover:text-primary transition duration-300"
                    >1 (555) 123-4567</a
                  >
                </div>
              </div>
              <div class="flex items-start">
                <MailIcon class="h-5 w-5 text-primary mr-2 mt-1" />
                <div>
                  <h3 class="font-semibold">Email</h3>
                  <a
                    href="mailto:info@perfumest.one"
                    class="hover:text-primary transition duration-300"
                    >info@perfumest.one</a
                  >
                </div>
              </div>
              <div class="flex items-start">
                <ClockIcon class="h-5 w-5 text-primary mr-2 mt-1" />
                <div>
                  <h3 class="font-semibold">Business Hours</h3>
                  <p>Monday - Friday: 9am - 6pm</p>
                  <p>Saturday: 10am - 4pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div class="flex gap-4 justify-end text-gray-500">
                <a
                  href="https://www.linkedin.com/in/dmytro-oborskyi/"
                  target="_blank"
                  ><Linkedin
                    class="w-7 h-7 hover:text-primary transition duration-300"
                /></a>
                <a
                  href="https://www.instagram.com/dmitry_oborsky/"
                  target="_blank"
                  ><Instagram
                    class="w-7 h-7 hover:text-primary transition duration-300"
                /></a>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-lg shadow-md">
            <div
              class="bg-gray-200 h-96 rounded-md flex items-center justify-center"
            >
              <iframe
                class="w-full h-full"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sportyvna%20Square,%20Kyiv,%2001033+(Perfumest)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
