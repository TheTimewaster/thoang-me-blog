<template>
  <ul class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:grid-rows-3 xl:gap-16">
    <!-- main grid -->
    <BlogIndexArticleCard
      class="col-span-1 md:col-span-3 lg:col-span-3 lg:row-span-3"
      :date="mainArticle.publishedAt"
      :image="urlFor(mainArticle.mainImage)?.format('webp').width(500).height(500).url()"
      :slug="mainArticle.slug.current"
      :title="mainArticle.title"
    />
    <BlogIndexArticleCard
      v-for="(article, index) in mainGridSideArticles"
      class="lg:row-start-(--row-start) md:col-start-1 lg:col-start-4"
      small
      :key="article._id"
      :date="article.publishedAt"
      :image="urlFor(article.mainImage)?.format('webp').width(200).height(200).url()"
      :slug="article.slug.current"
      :title="article.title"
      :style="{
        '--row-start': index + 1,
      }"
    />
  </ul>

  <ul class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:grid-cols-4 xl:gap-16">
    <BlogIndexArticleCard
      v-for="article in otherArticles"
      :key="article._id"
      :date="article.publishedAt"
      :image="urlFor(article.mainImage)?.format('webp').width(200).height(200).url()"
      :slug="article.slug.current"
      :title="article.title"
      class="md:col-span-1 lg:col-span-2"
    />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSanity } from '#imports';
import BlogIndexArticleCard from '~/components/blog/index/article/card/IndexArticleCard.vue';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Article } from '~/santiy.types';

const { articles } = defineProps<{
  articles: Array<Article>;
}>();

const mainArticle = computed(() => articles[0]);
const mainGridSideArticles = computed(() => articles.slice(1, 4));

const otherArticles = computed(() => articles.slice(4));

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;
</script>

<style scoped></style>
