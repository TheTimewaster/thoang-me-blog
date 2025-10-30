<script setup lang="ts">
import { PrismicRichText } from '#components';
import { getSliceComponentProps } from '#imports';
import type { Content } from '@prismicio/client';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(getSliceComponentProps<Content.ContentSlice>(['slice', 'index', 'slices', 'context']));
</script>

<template>
  <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" class="prismic-content">
    <PrismicRichText :field="slice.primary.text"> </PrismicRichText>
  </section>
</template>

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
