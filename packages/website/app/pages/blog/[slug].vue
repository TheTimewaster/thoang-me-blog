<template>
  <NuxtLayout name="article-layout">
    <Head>
      <Title>{{ article == null ? params.slug : article.title }}</Title>
      <Meta name="description" content="Read the latest article from thoang.me" />
    </Head>
    <template v-if="article != null">
      <ArticleHeader ref="header" 
        :main-image="article.mainImage" 
        :title="article.title"
      />

      <div class="mx-auto mt-8 max-w-screen-lg p-4 md:p-8 lg:flex lg:gap-8 lg:p-0">
        <!-- meta column -->
        <div class="lg:w-1/3">
          <transition
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <p v-if="showTitleInFactSheet" class="font-serif text-2xl font-bold">
              {{ article.title }}
            </p>
          </transition>

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
            <li v-for="tag in article.tags" :key="tag._key" class="text" id="article-tags">{{ tag.title }}</li>
          </ul>
        </div>
        <div class="sanity-content lg:w-2/3">
          <SanityContent
            :blocks="article.content"
            :serializers="{
              types: {
                gallery: ArticleGallery,
              },
            }"
          />
        </div>
      </div>
    </template>
    <template v-else-if="error">
      <p>Whoops! Something went wrong. Please try again later.</p>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { groq, shallowRef, useSanityQuery, useState, useTemplateRef } from '#imports';
import { useDateFormat, useIntersectionObserver } from '@vueuse/core';
import { useRoute } from 'vue-router';
import ArticleGallery from '~/components/blog/article/ArticleGallery.vue';
import ArticleHeader from '~/components/blog/article/ArticleHeader.vue';
import type { Article } from '~/santiy.types';

const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $slug][0]`;
const { params } = useRoute();

const { data: article, error } = await useSanityQuery<Article>(ARTICLE_QUERY, params);

const header = useTemplateRef<InstanceType<typeof ArticleHeader>>('header');
const showTitleInFactSheet = shallowRef(false);
useIntersectionObserver(header, ([entry]) => {
  console.log(entry.isIntersecting);
  // we want to show title in the fact sheet, once the header is not visible anymore
  showTitleInFactSheet.value = !entry.isIntersecting;
});

const formattedDate = useState(() => {
  if (article.value == null) return '';

  return useDateFormat(article.value.publishedAt, 'MMMM DD, YYYY');
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
