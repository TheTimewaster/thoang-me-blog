<template>
  <li class="perspective-distant">
    <BlogIndexArticleCardBase
      class="aspect-square p-8 md:aspect-[3/2] lg:aspect-square"
      :variant="variant"
      :tiltRollModifier="5"
      :slug="slug"
      :isMain="true"
      :image="image"
      :tags="tags"
    >
      <template #title>
        <BlogIndexArticleCardHeader class="mb-4 self-end text-2xl sm:mb-8 sm:text-4xl md:text-6xl xl:w-3/4">
          {{ title }}
        </BlogIndexArticleCardHeader>
      </template>

      <template #date>
        <BlogIndexArticleCardDate :date="date" />
      </template>
    </BlogIndexArticleCardBase>
  </li>
</template>

<script setup lang="ts">
import type { ComponentColorVariant } from '~/composables/useComponentVariant';
import type { ArticleDocumentData } from '~~/prismicio-types';
import BlogIndexArticleCardBase from './IndexArticleCardBase.vue';
import BlogIndexArticleCardDate from './IndexArticleCardDate.vue';
import BlogIndexArticleCardHeader from './IndexArticleCardHeader.vue';

const {
  variant = 'peach',

  date,
  image = null,
  slug,
  title,
  tags = [],
} = defineProps<{
  small?: boolean;
  variant?: ComponentColorVariant;

  title: string;
  image?: ArticleDocumentData['main_image'];
  date?: string;
  slug: string;
  tags?: ArticleDocumentData['tags'];
}>();
</script>

<style scoped></style>
