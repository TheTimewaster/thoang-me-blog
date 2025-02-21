<template>
  <NuxtLayout name="article-layout">
    <template v-if="article != null">
      <div
        class="lg:-mx-(--article-header__negative-margin,64px) relative flex flex-col justify-end overflow-hidden md:aspect-[3/2] lg:aspect-[2/1]"
        :style="{
          '--article-header__negative-margin': headerNegativeMargin,
        }"
      >
        <NuxtImg
          class="rounded-(--article-image__border-radius) absolute left-0 top-0 -z-10 h-full w-full object-cover transition-all"
          :src="urlFor(article.mainImage).format('webp').crop('center').url()"
          :alt="article.title"
          width="600"
          height="400"
          :style="{
            '--article-image__border-radius': headerImageBorderRadius,
          }"
        />
        <div
          class="from-peach/40 dark:from-lavender-extra-dark/40 bg-gradient-to-t from-70% to-transparent transition-colors lg:p-16"
        >
          <h1 class="w-1/2 font-serif text-6xl">{{ article.title }}</h1>

          <div class="mt-4 flex gap-4">
            <time class="font-sans text-lg" :datetime="article.publishedAt">{{ article.publishedAt }}</time>
          </div>
        </div>
      </div>

      <div class="sanity-content lg:max-w-2/3 mx-auto my-8">
        <SanityContent v-if="article.content" :blocks="article.content" />
      </div>
    </template>
    <template v-else-if="error">
      <p>Whoops! Something went wrong. Please try again later.</p>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { definePageMeta, groq, ref, useSanity, useSanityQuery, useScroll, watchEffect } from '#imports';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useRoute } from 'vue-router';
import { NuxtImg } from '#components';
import type { Article } from '~/santiy.types';

const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $slug][0]`;
const { params } = useRoute();

const { data: article, status, error } = await useSanityQuery<Article>(ARTICLE_QUERY, params);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

const { y: scrollY } = useScroll(window);

// inital is 0
const headerImageBorderRadius = ref<string>(undefined);
// inital is 32px
const headerNegativeMargin = ref<string>(undefined);
watchEffect(() => {
  if (scrollY.value === 0) {
    headerImageBorderRadius.value = undefined;
    headerNegativeMargin.value = undefined;
    return;
  }

  // while scrolling, we want to gradually increase the border radius of the header image, until it reaches 32
  headerImageBorderRadius.value = `${Math.min(32, Math.max(0, Math.round(scrollY.value / 10)))}px`;
  // while scrolling, we want to gradually decrease the negative margin of the header, until it reaches 0
  // the negative margin starts at 64
  headerNegativeMargin.value = `${Math.max(0, 64 - Math.round(scrollY.value / 2))}px`;
});
</script>

<style scoped>
@reference '~/assets/css/main.css';

.sanity-content :deep(p) {
  @apply mb-4;
}

.sanity-content :deep(h2) {
  @apply mb-4 mt-8 font-serif text-2xl font-bold;
}

.sanity-content :deep(h3) {
  @apply mb-4 mt-8 font-serif text-xl font-bold;
}

.sanity-content :deep(ul) {
  @apply list-inside list-disc;
}
</style>
