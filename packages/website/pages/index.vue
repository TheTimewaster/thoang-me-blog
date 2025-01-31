<template>
  <NuxtLayout name="blog-index">
    <span v-if="mainArticle == null"> Whoops! Something went wrong. Please try again later. </span>

    <div v-else class="grid grid-cols-1 gap-4 gap-y-8 lg:grid-cols-4 lg:grid-rows-3 lg:gap-8">
      <BlogIndexArticleCard
        class="col-span-1 lg:col-span-3 lg:row-span-3"
        :date="mainArticle.publishedAt.toLocaleString()"
        :image="urlFor(mainArticle.thumbnail)?.format('webp').width(500).height(500).url()"
        :slug="mainArticle.slug.current"
        :title="mainArticle.title"
      />

      <BlogIndexArticleCard
        date="2021-09-02"
        image="https://unsplash.com/photos/pEj4EfkMIUw/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM3NzU4NTQ2fA&force=true&w=640"
        slug="article-2"
        title="Article 2"
        dark
        small
        class="lg:col-start-4 lg:row-start-1"
      />

      <BlogIndexArticleCard
        date="2021-09-03"
        slug="article-3"
        title="Article 3"
        small
        class="lg:col-start-4 lg:row-start-2"
      />
      <BlogIndexArticleCard
        date="2021-09-03"
        slug="article-4"
        title="Article 4"
        small
        dark
        class="lg:col-start-4 lg:row-start-3"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import BlogIndexArticleCard from '~/components/blog/index/IndexArticleCard.vue';
import type { SanityDocument } from '@sanity/client';
import { computed, groq, useSanity, useSanityQuery } from '#imports';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    slug,
    thumbnail
  }
`;

const { data: articles } = await useSanityQuery<SanityDocument[]>(ARTICLES_QUERY);

const mainArticle = computed(() => (articles.value != null ? articles.value[0] : undefined));

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;
</script>

<style scoped></style>
