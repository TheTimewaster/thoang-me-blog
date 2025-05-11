<template>
  <IndexArticleCardSmall v-if="small" :date="date" :image="image" :slug="slug" :title="title" :variant="variant" />

  <IndexArticleCardMain v-else :date="date" :image="image" :slug="slug" :title="title" :variant="variant" />
</template>

<script setup lang="ts">
import type { ComponentColorVariant } from '#imports';
import IndexArticleCardMain from './IndexArticleCardMain.vue';
import IndexArticleCardSmall from './IndexArticleCardSmall.vue';
import type { ArticleDocumentData } from '~~/prismicio-types';

const {
  small = false,
  variant = 'peach',

  date,
  image = null,
  slug,
  title,
} = defineProps<{
  small?: boolean;
  variant?: ComponentColorVariant;

  title: string;
  image?: ArticleDocumentData['main_image'];
  date?: string;
  slug: string;
}>();
</script>

<style scoped></style>
