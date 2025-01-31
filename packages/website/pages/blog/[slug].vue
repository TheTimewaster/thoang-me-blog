<template>
  <NuxtLayout name="blog-index">
    <template v-if="article != null">
      <img :src="urlFor(article.mainImage).url()" alt="Article image" />
      <h1>{{ article.title }}</h1>

      <SanityContent v-if="article.content" :blocks="article.content" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { groq, useSanity, useSanityQuery } from '#imports';
import type { SanityDocument } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useRoute } from 'vue-router';

const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $slug][0]`;
const { params } = useRoute();
console.log(params);

const { data: article, status, error } = await useSanityQuery<SanityDocument>(ARTICLE_QUERY, params);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;
</script>

<style scoped></style>
