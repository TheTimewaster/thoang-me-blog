<template>
  <NuxtLayout name="article-layout">
    <Head>
      <Title v-if="article == null">{{ params.slug }}</Title>
      <Title v-else>{{ article.title }}</Title>
      <Meta name="description" content="Read the latest article from thoang.me" />
    </Head>
    <template v-if="article != null">
      <ArticleHeader ref="header" :main-image="article.main_image" :title="article.title" :tags="article.tags" />

      <ArticleContent class="mx-auto my-16 max-w-screen-lg md:my-24" :article-doc="data" />
    </template>
    <template v-else-if="error">
      <p>Whoops! Something went wrong. Please try again later.</p>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, useAsyncData, usePrismic } from '#imports';
import type { Client } from '@prismicio/client';
import { useRoute } from 'vue-router';
import ArticleContent from '~/components/blog/article/ArticleContent.vue';
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
