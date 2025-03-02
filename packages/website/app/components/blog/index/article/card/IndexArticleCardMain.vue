<template>
  <li class="perspective-distant">
    <BlogIndexArticleCardBase
      class="aspect-square p-8 md:aspect-[3/2] lg:aspect-square"
      :variant="variant"
      :tiltRollModifier="5"
      :slug="slug"
      :image="image"
    >
      <template #title>
        <BlogIndexArticleCardHeader class="text-2xl sm:text-6xl">
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
import BlogIndexArticleCardBase from './IndexArticleCardBase.vue';
import BlogIndexArticleCardHeader from './IndexArticleCardHeader.vue';
import BlogIndexArticleCardDate from './IndexArticleCardDate.vue';

const {
  variant = 'peach',

  date,
  image = null,
  slug,
  title,
} = defineProps<{
  small?: boolean;
  variant?: ComponentColorVariant;

  title: string;
  image?: string;
  date?: string;
  slug: string;
}>();
</script>

<style scoped></style>
