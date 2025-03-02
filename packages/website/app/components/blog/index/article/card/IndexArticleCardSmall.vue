<template>
  <li class="perspective-normal">
    <BlogIndexArticleCardBase
      class="aspect-[2/1] p-4 md:aspect-square"
      :variant="variant"
      :tiltRollModifier="10"
      :slug="slug"
      :image="image"
    >
      <template #title>
        <BlogIndexArticleCardHeader class="text-lg lg:text-xl">
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
  variant?: ComponentColorVariant;

  title: string;
  image?: string;
  date?: string;
  slug: string;
}>();
</script>

<style scoped></style>
