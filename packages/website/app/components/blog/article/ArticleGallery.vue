<template>
  <div class="max-w-screen flex h-96 snap-x snap-mandatory gap-4 overflow-x-auto py-4">
    <SanityImage
      v-for="image in images"
      :key="image.asset._ref"
      :asset-id="image.asset._ref"
      :alt="image.caption"
      :caption="image.caption"
      auto="format"
      w="400"
      q="80"
      loading="lazy"
      class="rounded-4xl h-full w-auto"
      @click="openLightbox(image.asset._ref)"
    />
  </div>

  <Teleport to="body">
    <Transition
      name="fade"
      enter-active-class="transition-opacity duration-300 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLightBoxOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        @click.self="closeLightbox"
      >
        <SanityImage
          :asset-id="lightboxImage"
          fm="webp"
          class="rounded-4xl max-h-full max-w-full object-contain"
          :key="lightboxImage"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useMagicKeys } from '#imports';
import type { SanityReference } from '@sanity/image-url/lib/types/types';
import { computed, ref, watchEffect } from 'vue';

const { images } = defineProps<{
  images: Array<{
    asset: SanityReference;
    caption: string;
  }>;
}>();

const lightboxImage = ref<string | null>(null);
const isLightBoxOpen = computed(() => lightboxImage.value !== null);
const openLightbox = (assetId: string) => {
  lightboxImage.value = assetId;
};
const closeLightbox = () => {
  lightboxImage.value = null;
};

const { escape } = useMagicKeys({
  passive: false,
  onEventFired(event) {
    if (event.key === 'Escape') {
      if (isLightBoxOpen.value) {
        event.preventDefault()
      }
    }
  },
});

watchEffect(() => {
  if (isLightBoxOpen.value) {
    if (escape.value) {
      closeLightbox();
    }
  }
});
</script>

<style scoped></style>
