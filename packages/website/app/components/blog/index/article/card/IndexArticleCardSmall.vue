<template>
  <li class="perspective-normal">
    <BlogIndexArticleCardBase
      class="aspect-[2/1] h-full w-full p-4 md:aspect-square lg:aspect-auto"
      :variant="variant"
      :tiltRollModifier="10"
      :slug="slug"
      :image="image"
      :tags="tags"
    >
      <template #title>
        <BlogIndexArticleCardHeader class="text-xl lg:text-2xl">
          {{ title }}
        </BlogIndexArticleCardHeader>
      </template>

      <template #date>
        <BlogIndexArticleCardDate :date="date" class="text-sm" />
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
  variant?: ComponentColorVariant;

  title: string;
  image?: ArticleDocumentData['main_image'];
  date?: string;
  slug: string;
  tags?: ArticleDocumentData['tags'];
}>();
</script>
