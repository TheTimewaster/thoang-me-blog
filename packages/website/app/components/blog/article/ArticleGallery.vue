<template>
  <div class="relative max-w-full py-4">
    <div class="flex h-96 snap-x snap-mandatory gap-8 overflow-x-hidden" ref="thumbnailsContainer">
      <PrismicImage
        v-for="(image, index) in images"
        ref="thumbnails"
        :key="`${image.image.id}-${index}`"
        :field="image.image.thumbnail"
        :imgix-params="{ fm: 'avif', q: 40 }"
        width="350"
        height="350"
        class="rounded-4xl h-full w-auto scale-100 cursor-pointer snap-start transition-transform duration-200"
        loading="lazy"
        @click="openLightbox(image)"
      />
    </div>

    <div class="mt-8 flex justify-end gap-4">
      <BButton :disabled="arrivedState.left" aria-label="Scroll left" variant="primary" @click="scrollLeft">
        <Icon name="mdi:chevron-left" class="leading-1 text-2xl" />
      </BButton>

      <BButton :disabled="arrivedState.right" aria-label="Scroll right" variant="primary" @click="scrollRight">
        <Icon name="mdi:chevron-right" class="leading-1 text-2xl" />
      </BButton>
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

        <Transition
          :enter-from-class="tw`translate-y-[10rem]`"
          :enter-active-class="tw`transition-transform duration-300 ease-in-out`"
          :enter-to-class="tw`translate-y-0`"
          :leave-active-class="tw`transition-transform duration-300 ease-in-out`"
          :leave-from-class="tw`translate-y-0`"
          :leave-to-class="tw`translate-y-[10rem]`"
        >
          <p
            v-if="isAppearEnd"
            class="text-lavender-dark bg-peach-light absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full px-4 py-2"
          >
            {{ lightboxImage.image.alt || 'Image' }}
          </p>
        </Transition>

        <Transition
          :enter-from-class="tw`scale-0`"
          :enter-active-class="tw`transition-transform duration-300 ease-in-out`"
          :enter-to-class="tw`scale-100`"
          :leave-active-class="tw`transition-transform duration-300 ease-in-out`"
          :leave-from-class="tw`scale-100`"
          :leave-to-class="tw`scale-0`"
        >
          <BButton
            v-if="isAppearEnd"
            class="absolute right-4 top-4"
            @click="closeLightbox"
            aria-label="Close lightbox"
            variant="light"
          >
            <Icon name="mdi:close" class="text-2xl" />
          </BButton>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { PrismicImage } from '#components';
import { tw, useHead, useMagicKeys, useScroll } from '#imports';
import { computed, ref, useTemplateRef, watchEffect } from 'vue';
import BButton from '~/components/common/BButton.vue';
import type { GallerySlice, GallerySliceDefaultPrimaryImagesItem, Simplify } from '~~/prismicio-types';

const { images } = defineProps<{
  images: GallerySlice['primary']['images'];
}>();

const thumbnailsContainer = useTemplateRef<HTMLElement>('thumbnailsContainer');
const thumbnails = useTemplateRef<Array<InstanceType<typeof PrismicImage>>>('thumbnails');
const { arrivedState } = useScroll(thumbnailsContainer, {
  throttle: 100,
  idle: 100,
});

const currentVisibleIndex = ref(0);
const scrollLeft = () => {
  if (thumbnails.value.length === 0) return;

  currentVisibleIndex.value = Math.max(0, currentVisibleIndex.value - 1);
  const targetElement = thumbnails.value[currentVisibleIndex.value].$el;
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  }
};

const scrollRight = () => {
  if (thumbnails.value.length === 0) return;

  currentVisibleIndex.value = Math.min(thumbnails.value.length - 1, currentVisibleIndex.value + 1);
  const targetElement = thumbnails.value[currentVisibleIndex.value].$el;
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  }
};

const lightboxImage = ref<Simplify<GallerySliceDefaultPrimaryImagesItem> | null>(null);
const isLightBoxOpen = computed(() => lightboxImage.value !== null);

const openLightbox = (assetId: Simplify<GallerySliceDefaultPrimaryImagesItem>) => {
  lightboxImage.value = assetId;
};
const closeLightbox = () => {
  lightboxImage.value = null;
  isAppearEnd.value = false; // Reset for next open
};

useHead({
  bodyAttrs: {
    class: () => (isLightBoxOpen.value ? 'overflow-hidden' : ''),
  },
});

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
