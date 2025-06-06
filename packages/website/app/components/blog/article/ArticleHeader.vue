<template>
  <div
    class="md:px-(--article-header__padding,0) 3xl:w-4/5 pt-22 mx-auto 2xl:w-4/5 2xl:pt-36"
    :style="{
      '--article-header__padding': headerPadding,
    }"
  >
    <div
      class="rounded-(--article-image__border-radius) relative flex aspect-square flex-col justify-end overflow-hidden sm:aspect-[3/2] lg:aspect-[2/1]"
      :class="solidBackgroundClass"
      :style="{
        '--article-image__border-radius': headerImageBorderRadius,
      }"
    >
      <PrismicImage
        v-if="mainImage.url"
        :field="mainImage"
        class="absolute left-0 top-0 -z-10 h-full w-full object-cover transition-all"
      />

      <!-- <div
            class="from-peach/40 dark:from-lavender-extra-dark/40 h-32 bg-gradient-to-b from-50% to-transparent"
          ></div> -->

      <div
        class="bg-gradient-to-t from-50% to-transparent px-4 py-8 transition-colors md:p-16 md:px-8 xl:px-16"
        :class="hasMainImage ? 'from-peach/40 dark:from-lavender-extra-dark/40' : ''"
        ref="header"
      >
        <h1 class="font-serif text-4xl md:w-2/3 md:text-5xl lg:text-6xl xl:w-1/2">{{ title }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useComponentVariant } from '#imports';
import { useScroll } from '@vueuse/core';
import { computed, ref, toRef, watchEffect } from 'vue';
import useArticleHasMainImage from '~/composables/useArticleHasMainImage';
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
const { hasMainImage, hasNoMainImage } = useArticleHasMainImage(mainImage);
const solidBackgroundClass = computed(() => {
  if (hasNoMainImage.value) return colorClass.value;

  return '';
});

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
