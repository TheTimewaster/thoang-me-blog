<template>
  <NuxtLayout name="index-layout">
    <div v-if="pending">Loading...</div>

    <span v-else-if="mainArticle == null"> Whoops! Something went wrong. Please try again later. </span>

    <ul v-else class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:grid-rows-3 xl:gap-16">
      <BlogIndexArticleCard
        class="col-span-1 md:col-span-3 lg:col-span-3 lg:row-span-3"
        :date="mainArticle.first_publication_date"
        :slug="mainArticle.uid"
        :image="mainArticle.data.main_image"
        :title="mainArticle.data.title"
        :tags="mainArticle.data.tags"
        variant="peach"
      />

      <BlogIndexArticleCard
        v-for="article in data.slice(1, 5)"
        :key="article.id"
        class="lg:col-start-4"
        :date="article.first_publication_date"
        :slug="article.uid"
        :image="article.data.main_image"
        :title="article.data.title"
        :tags="mainArticle.data.tags"
        small
      />
    </ul>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, useAsyncData, usePrismic } from '#imports';
import type { Client } from '@prismicio/client';
import BlogIndexArticleCard from '~/components/blog/index/article/card/IndexArticleCard.vue';
import type { AllDocumentTypes } from '~~/prismicio-types';

const {
  client,
}: {
  client: Client<AllDocumentTypes>;
} = usePrismic();
const { data, pending } = await useAsyncData(`[article-index]`, () =>
  client.getAllByType('article', {
    orderings: {
      field: 'my.article.first_publication_date',
      direction: 'desc',
    },
    pageSize: 4,
  }),
);

const mainArticle = computed(() => {
  if (data.value == null) return null;

  return data.value[0];
});
</script>

<style scoped></style>
