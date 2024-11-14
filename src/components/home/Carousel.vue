<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-vue-next";
import { usePerfumes } from "@/stores/usePerfumes";
import { AUTOPLAY_INTERVAL, ITEMS_PER_CAROUSEL } from "@/lib/constants";

const perfumesStore = usePerfumes();

const currentIndex = ref(0);
const isPlaying = ref(true);
let autoplayInterval: ReturnType<typeof setInterval>;

const checkItemsCount = () => {
  return perfumesStore.perfumes.length <= ITEMS_PER_CAROUSEL
    ? perfumesStore.perfumes.length
    : ITEMS_PER_CAROUSEL;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % checkItemsCount();
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + checkItemsCount()) % checkItemsCount();
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

const toggleAutoplay = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
};

const startAutoplay = () => {
  autoplayInterval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<template>
  <div class="relative w-full max-w-4xl mx-auto">
    <div class="overflow-hidden rounded-lg shadow-lg">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(perfume, index) in perfumesStore.shuffledPerfumes"
          :key="perfume.id"
          v-show="index < checkItemsCount()"
          class="w-full flex-shrink-0"
        >
          <div class="relative aspect-w-16 aspect-h-9">
            <img
              :src="perfume.image"
              :alt="perfume.name"
              class="inset-0 w-full h-[60vh] md:h-[50vh] object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div class="p-4 sm:p-6 text-white">
                <h2 class="text-2xl sm:text-3xl font-semibold mb-2">
                  {{ perfume.name }}
                </h2>
                <p class="text-sm sm:text-base mb-2">
                  {{ perfume.description }}
                </p>
                <span class="font-bold text-lg sm:text-xl"
                  >${{ perfume.price.toFixed(2) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-secondary bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
      aria-label="Previous perfume"
    >
      <ChevronLeftIcon class="w-6 h-6 text-primary" />
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-secondary bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
      aria-label="Next perfume"
    >
      <ChevronRightIcon class="w-6 h-6 text-primary" />
    </button>

    <div
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <button
        v-for="(_, index) in perfumesStore.perfumes"
        :key="index"
        v-show="index < checkItemsCount()"
        @click="goToSlide(index)"
        :class="[
          'w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-300',
          currentIndex === index
            ? 'bg-primary'
            : 'bg-secondary bg-opacity-50 hover:bg-opacity-75',
        ]"
        :aria-label="`Go to perfume ${index + 1}`"
        :aria-current="currentIndex === index ? 'true' : 'false'"
      ></button>
    </div>

    <button
      @click="toggleAutoplay"
      class="text-primary absolute bottom-4 right-4 bg-secondary bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
      :aria-label="isPlaying ? 'Pause autoplay' : 'Start autoplay'"
    >
      <PauseIcon v-if="isPlaying" class="w-6 h-6" />
      <PlayIcon v-else class="w-6 h-6" />
    </button>
  </div>
</template>
