<template>
  <NuxtLayout name="index-layout">
    <div v-if="pending">Loading...</div>

    <span v-else-if="mainArticle == null"> Whoops! Something went wrong. Please try again later. </span>

    <template v-else>
      <ul
        class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:grid-cols-5 lg:grid-rows-3 2xl:grid-cols-4 2xl:gap-16"
      >
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
          v-for="article in gridArticles"
          :key="article.id"
          class="lg:col-span-3 lg:col-start-4 lg:row-span-1 2xl:col-span-1"
          :date="article.first_publication_date"
          :slug="article.uid"
          :image="article.data.main_image"
          :title="article.data.title"
          :tags="article.data.tags"
          small
        />
      </ul>

      <!-- other articles -->
      <ul class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:grid-cols-3 2xl:gap-16">
        <BlogIndexArticleCard
          v-for="article in otherArticles"
          :key="article.id"
          class="col-span-1"
          :date="article.first_publication_date"
          :slug="article.uid"
          :image="article.data.main_image"
          :title="article.data.title"
          :tags="article.data.tags"
          small
        />
      </ul>

      <BButton v-if="hasNextPage" variant="primary" :disabled="isLoadingMore" @click="paginate">
        Load more posts
      </BButton>
      <p v-if="!isLoadingMore && isLoadingMoreError != null" class="text-center">
        Whoops! Something went wrong while loading more posts. Please try again later.
      </p>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, ref, useAsyncData, usePrismic } from '#imports';
import type { Client } from '@prismicio/client';
import BlogIndexArticleCard from '~/components/blog/index/article/card/IndexArticleCard.vue';
import BButton from '~/components/common/BButton.vue';
import type { AllDocumentTypes, ArticleDocument } from '~~/prismicio-types';

const {
  client,
}: {
  client: Client<AllDocumentTypes>;
} = usePrismic();
const page = ref(0);
const hasNextPage = ref(true);
const pageSize = ref(8);
const articles = ref<Array<ArticleDocument>>([]);
const fetchArticles = () =>
  client.getByType('article', {
    orderings: {
      field: 'my.article.first_publication_date',
      direction: 'desc',
    },
    fetch: ['article.title', 'article.main_image', 'article.tags'],
    pageSize: pageSize.value,
    page: page.value + 1,
  });
const { data, pending } = await useAsyncData(`article-index-${page.value}`, fetchArticles);

articles.value = data.value.results || [];
hasNextPage.value = data.value?.next_page != null;

const isLoadingMore = ref(false);
const isLoadingMoreError = ref();
const paginate = async () => {
  page.value += 1;
  isLoadingMore.value = true;
  if (page.value > 0) {
    // Reset the data to avoid appending to the existing data
    pageSize.value = 6;
  }

  try {
    const resp = await fetchArticles();
    isLoadingMoreError.value = undefined;
    if (resp) {
      articles.value.push(...resp.results);
      hasNextPage.value = resp.next_page != null;
    }
  } catch (e) {
    isLoadingMoreError.value = e;
  } finally {
    isLoadingMore.value = false;
  }
};

const mainArticle = computed(() => {
  return articles.value[0];
});

const gridArticles = computed(() => {
  return articles.value.slice(1, 5);
});

const otherArticles = computed(() => {
  return articles.value.slice(5);
});
</script>

<style scoped></style>
