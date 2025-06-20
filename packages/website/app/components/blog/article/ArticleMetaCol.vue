<template>
  <div class="lg:w-1/3">
    <label for="article-published" class="dark:text-peach-light/60 text-lavender-extra-dark/60 text-xs font-bold">
      Published
    </label>
    <p class="text" id="article-published">
      <NuxtTime
        :datetime="articleDoc.first_publication_date"
        year="numeric"
        month="2-digit"
        day="2-digit"
        locale="fr-CA"
      />
    </p>
    <template v-if="articleData.location && articleData.location.latitude != null">
      <label for="article-location" class="dark:text-peach-light/60 text-lavender-extra-dark/60 text-xs font-bold">
        Location
      </label>
      <p class="text" id="article-location">{{ articleData.location }}</p>
    </template>
    <label for="article-published" class="dark:text-peach-light/60 text-lavender-extra-dark/60 text-xs font-bold">
      Type
    </label>
    <p class="text" id="article-type">Article</p>

    <label for="article-published" class="dark:text-peach-light/60 text-lavender-extra-dark/60 text-xs font-bold">
      Tags
    </label>
    <ul>
      <li v-for="tag in articleData.tags" :key="tag.tag" class="capitalize" id="article-tags">{{ tag.tag }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { NuxtTime } from '#components';
import { computed } from 'vue';
import type { ArticleDocument } from '~~/prismicio-types';

const { articleDoc } = defineProps<{
  articleDoc: ArticleDocument;
}>();

const articleData = computed(() => {
  return articleDoc.data;
});
</script>

<style scoped></style>
