<template>
  <div
    class="rounded-(--article-image__border-radius) overflow-hidden lg:rounded-none lg:[clip-path:inset(0px_var(--article-image__scale-x)_0px_var(--article-image__scale-x)_round_var(--article-image__border-radius))]"
    :style="{
      '--article-image__scale-x': headerImageScaleX,
      '--article-image__border-radius': headerImageBorderRadius,
    }"
  >
    <div
      class="relative flex aspect-square h-full w-full flex-col justify-end sm:aspect-[3/2] lg:aspect-[2/1]"
      :class="solidBackgroundClass"
    >
      <div class="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden transition-all duration-75">
        <PrismicImage v-if="mainImage.url" :field="mainImage" class="h-full w-full object-cover" :style="{}" />
      </div>

      <!-- <div
          class="from-peach/40 dark:from-lavender-extra-dark/40 h-32 bg-gradient-to-b from-50% to-transparent"
        ></div> -->

      <div
        class="bg-gradient-to-t from-80% to-transparent py-8 transition-colors lg:py-12"
        :class="isFilled.image(mainImage) ? 'from-peach-light/30 dark:from-lavender-extra-dark/30' : ''"
      >
        <div class="mx-auto max-w-screen-lg" ref="header">
          <h1 class="px-4 font-serif text-4xl md:px-8 md:text-5xl lg:w-3/4 lg:text-6xl xl:w-2/3">{{ title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PrismicImage } from '#components';
import { useComponentVariant } from '#imports';
import { isFilled } from '@prismicio/client';
import { useScroll } from '@vueuse/core';
import { computed, ref, toRef, watchEffect } from 'vue';
import type { ArticleDocumentData } from '~~/prismicio-types';

const {
  mainImage = null,
  title,
  tags = [],
} = defineProps<{
  mainImage?: ArticleDocumentData['main_image'];
  title: string;
  tags?: ArticleDocumentData['tags'];
}>();

const tagsRef = toRef(() => tags);
const colorClass = useComponentVariant('peach', tagsRef, true);
const solidBackgroundClass = computed(() => {
  if (!isFilled.image(mainImage)) return colorClass.value;

  return '';
});

const { y: scrollY } = useScroll(window);

// inital is 0
const headerImageBorderRadius = ref<string>(undefined);
// inital is 32px
const headerImageScaleX = ref<string>('0%');
watchEffect(() => {
  if (scrollY.value === 0) {
    headerImageBorderRadius.value = undefined;
    headerImageScaleX.value = undefined;
    return;
  }

  // while scrolling, we want to gradually increase the border radius of the header image, until it reaches 32
  headerImageBorderRadius.value = `${Math.min(64, Math.max(0, Math.round(scrollY.value / 10)))}px`;
  // while scrolling, increase the scale of the header image from 0 to 64px, until it reaches 64px
  headerImageScaleX.value = `${Math.min(64, Math.max(0, scrollY.value / 10))}px`;
});
</script>

<style scoped></style>
