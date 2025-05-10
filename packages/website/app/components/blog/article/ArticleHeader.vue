<template>
  <div
    class="md:px-(--article-header__padding,0)"
    :style="{
      '--article-header__padding': headerPadding,
    }"
  >
    <div class="relative flex aspect-square flex-col justify-end overflow-hidden sm:aspect-[3/2] lg:aspect-[2/1]">
      <img
        class="rounded-(--article-image__border-radius) absolute left-0 top-0 -z-10 h-full w-full object-cover transition-all"
        :srcset="srcset"
        :sizes="sizes"
        :src="urlFor(mainImage.asset).auto('format').url()"
        :alt="title"
        width="1200"
        height="800"
        :style="{
          '--article-image__border-radius': headerImageBorderRadius,
        }"
      />

      <!-- <div
            class="from-peach/40 dark:from-lavender-extra-dark/40 h-32 bg-gradient-to-b from-50% to-transparent"
          ></div> -->

      <div
        class="from-peach/40 dark:from-lavender-extra-dark/40 rounded-(--article-image__border-radius) bg-gradient-to-t from-50% to-transparent p-4 transition-colors md:p-8 lg:p-16"
        :style="{
          '--article-image__border-radius': headerImageBorderRadius,
        }"
        ref="header"
      >
        <h1 class="font-serif text-4xl md:w-2/3 md:text-5xl lg:w-1/2 lg:text-6xl">{{ title }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSanity } from '#imports';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useScroll } from '@vueuse/core';
import { computed, ref, watchEffect } from 'vue';

const { 
  mainImage = null,
  title,
 } = defineProps<{
  mainImage?: { asset?: SanityImageSource };
  title: string;
}>();

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

const { y: scrollY } = useScroll(window);

// inital is 0
const headerImageBorderRadius = ref<string>(undefined);
// inital is 32px
const headerPadding = ref<string>(undefined);
watchEffect(() => {
  if (scrollY.value === 0) {
    headerImageBorderRadius.value = undefined;
    headerPadding.value = undefined;
    return;
  }

  // while scrolling, we want to gradually increase the border radius of the header image, until it reaches 32
  headerImageBorderRadius.value = `${Math.min(64, Math.max(0, Math.round(scrollY.value / 10)))}px`;
  // while scrolling, we want to gradually decrease the padding of the header, until it reaches 0
  headerPadding.value = `${Math.min(32, Math.max(0, Math.round(scrollY.value / 10)))}px`;
});

const srcset = computed(() => {
  if (mainImage?.asset) {
    const { asset } = mainImage;
    // we want to show 600px wide image on mobile, 800px on medium screens, and 1200px on large screens, and 2x for retina displays
    return `
      ${urlFor(asset).width(300).auto('format').url()} 300w,
      ${urlFor(asset).width(600).auto('format').url()} 600w, 
      ${urlFor(asset).width(800).auto('format').url()} 800w,
      ${urlFor(asset).width(1200).auto('format').url()} 1200w,
      ${urlFor(asset).width(1600).auto('format').url()} 2x
    `;
  }
  return '';
});
const sizes = computed(() => {
  if (mainImage?.asset) {
    // image is 100% width on mobile, 800px on medium screens, and 1200px on large screens
    return `
      (max-width: 640px) 100vw,
      (max-width: 768px) 600px,
      (max-width: 1024px) 800px,
      1200px
    `;
  }
  return undefined;
});
</script>

<style scoped></style>
