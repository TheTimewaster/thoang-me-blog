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
        variant="peach"
      />

      <!-- <BlogIndexArticleCard
        date="2021-09-02"
        image="https://unsplash.com/photos/pEj4EfkMIUw/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM3NzU4NTQ2fA&force=true&w=640"
        slug="article-2"
        title="Article 2"
        variant="lavender"
        small
        class="md:col-start-1 lg:col-start-4 lg:row-start-1"
      />

      <BlogIndexArticleCard
        date="2021-09-03"
        slug="article-3"
        title="Article 3"
        variant="peach"
        small
        class="md:col-start-2 lg:col-start-4 lg:row-start-2"
      />
      <BlogIndexArticleCard
        date="2021-09-03"
        slug="article-4"
        title="Article 4"
        small
        variant="lavender"
        class="md:col-start-3 lg:col-start-4 lg:row-start-3"
      /> -->
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
