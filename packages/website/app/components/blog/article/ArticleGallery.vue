<template>
  <div>
    <div class="max-w-screen flex h-96 snap-x snap-mandatory gap-4 overflow-x-auto py-4">
      <PrismicImage
        v-for="(image, index) in images"
        ref="thumbnails"
        :key="`${image.image.id}-${index}`"
        :field="image.image.thumbnail"
        :imgix-params="{ fm: 'avif', q: 40 }"
        class="rounded-4xl h-full w-auto scale-100 cursor-pointer snap-start transition-transform duration-200 hover:scale-105"
        loading="lazy"
        @click="openLightbox(image)"
      />
    </div>
  </div>

  <Teleport to="body">
    <Transition
      :enter-from-class="tw`opacity-0`"
      :enter-active-class="tw`transition-opacity duration-100 ease-in`"
      :enter-to-class="tw`opacity-100 `"
      leave-active-class="transition-opacity duration-100 ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      @after-enter="onAppearEnd"
    >
      <div
        v-if="isLightBoxOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        @click.self="closeLightbox"
      >
        <PrismicImage
          :field="lightboxImage.image"
          class="rounded-4xl max-h-full max-w-full object-contain"
          :key="lightboxImage.image.id"
        />

        <p class="absolute bottom-4 left-1/2 -translate-x-1/2 transform text-white">
          {{ lightboxImage.caption }}
        </p>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { PrismicImage } from '#components';
import { tw, useMagicKeys } from '#imports';
import { computed, ref, useTemplateRef, watchEffect } from 'vue';
import type { GallerySlice, GallerySliceDefaultPrimaryImagesItem, Simplify } from '~~/prismicio-types';

const { images } = defineProps<{
  images: GallerySlice['primary']['images'];
}>();

const lightboxImage = ref<Simplify<GallerySliceDefaultPrimaryImagesItem> | null>(null);
const thumbnails = useTemplateRef<Array<InstanceType<typeof PrismicImage>>>('thumbnails');
const isLightBoxOpen = computed(() => lightboxImage.value !== null);
const openLightbox = (assetId: Simplify<GallerySliceDefaultPrimaryImagesItem>) => {
  lightboxImage.value = assetId;
};
const closeLightbox = () => {
  lightboxImage.value = null;
  isAppearEnd.value = false; // Reset for next open
};

const isAppearEnd = ref(false);
const onAppearEnd = () => {
  isAppearEnd.value = true;
};

const { escape } = useMagicKeys({
  passive: false,
  onEventFired(event) {
    if (event.key === 'Escape') {
      if (isLightBoxOpen.value) {
        event.preventDefault();
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
