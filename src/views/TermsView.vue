<script setup lang="ts">
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  Instagram,
  Linkedin,
} from "lucide-vue-next";
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6 sm:p-10">
          <h1 class="text-3xl font-semibold text-primary mb-6">
            Terms and Conditions
          </h1>

          <div class="space-y-6">
            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                1. Introduction
              </h2>
              <p class="text-gray-600">
                Welcome to Perfumest. These Terms and Conditions govern your use
                of our website and the purchase of products from our online
                store. By accessing our website or placing an order, you agree
                to be bound by these Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                2. Definitions
              </h2>
              <p class="text-gray-600">
                "We", "Us", "Our", and "Perfumest" refer to the Perfumest
                company. "You", "Your", and "Customer" refer to the user or
                purchaser of our products.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                3. Products and Pricing
              </h2>
              <p class="text-gray-600">
                We strive to ensure that all product information and pricing on
                our website is accurate. However, we reserve the right to refuse
                or cancel any orders with incorrect pricing information. Prices
                are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                4. Ordering and Payment
              </h2>
              <p class="text-gray-600">
                By placing an order, you are making an offer to purchase
                products. We reserve the right to accept or decline your offer.
                Payment is due at the time of ordering. We accept major credit
                cards and other forms of electronic payment as specified on our
                website.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                5. Shipping and Delivery
              </h2>
              <p class="text-gray-600">
                We aim to process and ship orders promptly. Delivery times may
                vary depending on your location. We are not responsible for
                delays caused by customs or other factors outside our control.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                6. Returns and Refunds
              </h2>
              <p class="text-gray-600">
                We accept returns within 30 days of purchase for unused and
                unopened products. Refunds will be issued to the original form
                of payment. Shipping costs for returns are the responsibility of
                the customer unless the return is due to our error.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                7. Privacy Policy
              </h2>
              <p class="text-gray-600">
                We respect your privacy and protect your personal information.
                Our Privacy Policy, which is incorporated into these Terms and
                Conditions, explains how we collect, use, and disclose
                information about you.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                8. Intellectual Property
              </h2>
              <p class="text-gray-600">
                All content on our website, including text, graphics, logos, and
                images, is the property of Perfumest and protected by copyright
                laws. You may not use, reproduce, or distribute our content
                without our express written permission.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                9. Limitation of Liability
              </h2>
              <p class="text-gray-600">
                Perfumest shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your
                use of our website or products.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                10. Governing Law
              </h2>
              <p class="text-gray-600">
                These Terms and Conditions shall be governed by and construed in
                accordance with the laws of [Your Jurisdiction], without regard
                to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                11. Changes to Terms and Conditions
              </h2>
              <p class="text-gray-600">
                We reserve the right to modify these Terms and Conditions at any
                time. Changes will be effective immediately upon posting on our
                website. Your continued use of our website after changes are
                posted constitutes your acceptance of the modified Terms and
                Conditions.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">
                12. Contact Us
              </h2>
              <p class="text-gray-600">
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </p>
            </section>
          </div>

          <div
            class="mt-8 -mb-2 pt-6 border-t border-gray-200 flex justify-between gap-5"
          >
            <div class="space-y-1">
              <p class="text-gray-600 flex items-center">
                <MailIcon class="h-5 w-5 mr-2 text-primary" />
                <a
                  href="mailto:info@perfumest.one"
                  class="hover:text-primary transition duration-300"
                  >info@perfumest.one</a
                >
              </p>
              <p class="text-gray-600 flex items-center">
                <PhoneIcon class="h-5 w-5 mr-2 text-primary" />
                <a
                  href="tel:+15551234567"
                  class="hover:text-primary transition duration-300"
                  >1 (555) 123-4567</a
                >
              </p>
              <p class="text-gray-600 flex items-center">
                <MapPinIcon class="h-5 w-5 mr-2 text-primary" />
                Sportyvna Square, Kyiv, 01033
              </p>
            </div>
            <div class="flex gap-4 justify-end text-gray-500 items-end">
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
      </div>
    </div>
  </div>
</template>
