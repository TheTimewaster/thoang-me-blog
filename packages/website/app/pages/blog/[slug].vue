<template>
  <NuxtLayout name="article-layout">
    <Head>
      <Title>{{ article == null ? params.slug : article.title }}</Title>
      <Meta name="description" content="Read the latest article from thoang.me" />
    </Head>
    <template v-if="article != null">
      <ArticleHeader ref="header" :main-image="article.main_image" :title="article.title" />

      <div class="mx-auto my-24 max-w-screen-lg p-4 md:p-8 lg:flex lg:gap-8 lg:p-0">
        <!-- meta column -->
        <div class="lg:w-1/3">
          <label for="article-published" class="dark:text-peach-light/60 text-lavender-extra-dark/60 text-xs font-bold">
            Published
          </label>
          <p class="text" id="article-published">{{ formattedDate }}</p>
          <label for="article-published" class="dark:text-peach-light/60 text-lavender-extra-dark/60 text-xs font-bold">
            Type
          </label>
          <p class="text" id="article-type">Article</p>

          <label for="article-published" class="dark:text-peach-light/60 text-lavender-extra-dark/60 text-xs font-bold">
            Tags
          </label>
          <ul>
            <li v-for="tag in article.tags" :key="tag.tag" class="text" id="article-tags">{{ tag.tag }}</li>
          </ul>
        </div>
        <div class="prismic-content lg:w-2/3">
          <PrismicRichText v-if="article.slices[0]" :field="article.slices[0].primary.text" />
        </div>
      </div>
    </template>
    <template v-else-if="error">
      <p>Whoops! Something went wrong. Please try again later.</p>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, useAsyncData, useDateFormat, usePrismic, useState } from '#imports';
import type { Client } from '@prismicio/client';
import { useRoute } from 'vue-router';
import ArticleHeader from '~/components/blog/article/ArticleHeader.vue';
import type { AllDocumentTypes, ArticleDocument } from '~~/prismicio-types';

const { params } = useRoute();

const {
  client,
}: {
  client: Client<AllDocumentTypes>;
} = usePrismic();
const { data, error } = await useAsyncData<ArticleDocument>(`[article-slug-${params.slug}]`, () =>
  client.getByUID('article', params.slug as string, {}),
);

const article = computed(() => {
  if (data.value == null) return null;

  return data.value.data;
});

const formattedDate = useState(() => {
  if (article.value == null) return '';

  return useDateFormat(data.value.first_publication_date, 'MMMM DD, YYYY');
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
  @apply list-inside list-disc;
}
</style>
