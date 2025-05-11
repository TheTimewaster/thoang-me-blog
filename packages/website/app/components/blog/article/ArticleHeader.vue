<template>
  <div
    class="md:px-(--article-header__padding,0) 3xl:w-3/5 3xl:pt-48 mx-auto 2xl:w-4/5 2xl:pt-24"
    :style="{
      '--article-header__padding': headerPadding,
    }"
  >
    <div class="relative flex aspect-square flex-col justify-end overflow-hidden sm:aspect-[3/2] lg:aspect-[2/1]">
      <PrismicImage
        v-if="mainImage"
        :field="mainImage"
        class="rounded-(--article-image__border-radius) absolute left-0 top-0 -z-10 h-full w-full object-cover transition-all"
        :style="{
          '--article-image__border-radius': headerImageBorderRadius,
        }"
        :alt="title"
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
import { useScroll } from '@vueuse/core';
import { ref, watchEffect } from 'vue';
import type { ArticleDocumentData } from '~~/prismicio-types';

const { mainImage = null, title } = defineProps<{
  mainImage?: ArticleDocumentData['main_image'];
  title: string;
}>();

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
  headerPadding.value = `${Math.min(32, Math.max(0, Math.round(scrollY.value / 5)))}px`;
});
</script>

<style scoped></style>
