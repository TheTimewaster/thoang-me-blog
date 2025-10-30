<template>
  <div class="px-4 md:px-8 lg:flex lg:gap-8">
    <!-- meta column -->
    <ArticleMetaCol class="mb-16 lg:mb-0 lg:w-1/3 2xl:w-1/5" :articleDoc="articleDoc" />

    <SliceZone class="lg:w-4/5" :slices="articleData.slices" wrapper="article" :components="components" />
  </div>
</template>

<script setup lang="ts">
import { computed } from '#imports';
import { components } from '~/slices';
import type { ArticleDocument } from '~~/prismicio-types';
import ArticleMetaCol from './ArticleMetaCol.vue';

const { articleDoc } = defineProps<{
  articleDoc: ArticleDocument;
}>();

const articleData = computed(() => {
  return articleDoc.data;
});
</script>
