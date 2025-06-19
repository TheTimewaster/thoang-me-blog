<template>
  <div class="px-4 md:px-8 lg:flex lg:gap-8">
    <!-- meta column -->
    <ArticleMetaCol class="lg:w-1/3 2xl:w-1/5" :articleDoc="articleDoc" />

    <div class="prismic-content lg:w-4/5">
      <template v-for="slice in articleData.slices" :key="slice.id">
        <PrismicRichText v-if="slice.slice_type === 'content'" :field="slice.primary.text" />

        <ArticleGallery v-else-if="slice.slice_type === 'gallery'" :images="slice.primary.images" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '#imports';
import type { ArticleDocument } from '~~/prismicio-types';
import ArticleGallery from './ArticleGallery.vue';
import ArticleMetaCol from './ArticleMetaCol.vue';

const { articleDoc } = defineProps<{
  articleDoc: ArticleDocument;
}>();

const articleData = computed(() => {
  return articleDoc.data;
});
</script>

<style scoped>
@reference '~/assets/css/main.css';
.prismic-content :deep(p) {
  @apply mb-4;
}

.prismic-content :deep(h2) {
  @apply mb-4 mt-8 font-serif text-2xl font-bold;
}

.prismic-content :deep(h3) {
  @apply mb-4 mt-8 font-serif text-xl font-bold;
}

.prismic-content :deep(ul) {
  @apply mb-4 list-disc pl-6;
}

.prismic-content :deep(.block-img img) {
  @apply rounded-4xl;
}
</style>
