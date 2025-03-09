<template>
  <NuxtLayout name="article-layout">
    <Head>
      <Title>{{ article.title }}</Title>
      <Meta name="description" content="Read the latest article from thoang.me" />
    </Head>
    <template v-if="article != null">
      <div
        class="md:px-(--article-header__padding,0)"
        :style="{
          '--article-header__padding': headerPadding,
        }"
      >
        <div class="relative flex aspect-square flex-col justify-end overflow-hidden sm:aspect-[3/2] lg:aspect-[2/1]">
          <img
            class="rounded-(--article-image__border-radius) absolute left-0 top-0 -z-10 h-full w-full object-cover transition-all"
            :srcset="srcset"
            :sizes="sizes"
            :src="urlFor(article.mainImage.asset).auto('format').url()"
            :alt="article.title"
            width="1200"
            height="800"
            :style="{
              '--article-image__border-radius': headerImageBorderRadius,
            }"
          />

          <!-- <div
            class="from-peach/40 dark:from-lavender-extra-dark/40 h-32 bg-gradient-to-b from-50% to-transparent"
          ></div> -->

          <div
            class="from-peach/40 dark:from-lavender-extra-dark/40 rounded-(--article-image__border-radius) bg-gradient-to-t from-50% to-transparent p-4 transition-colors md:p-8 lg:p-16"
            :style="{
              '--article-image__border-radius': headerImageBorderRadius,
            }"
            ref="header"
          >
            <h1 class="font-serif text-4xl md:w-2/3 md:text-5xl lg:w-1/2 lg:text-6xl">{{ article.title }}</h1>
          </div>
        </div>
      </div>

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
import {
  computed,
  groq,
  ref,
  shallowRef,
  useSanity,
  useSanityQuery,
  useScroll,
  useState,
  useTemplateRef,
  watchEffect,
} from '#imports';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useDateFormat, useIntersectionObserver } from '@vueuse/core';
import { useRoute } from 'vue-router';
import ArticleGallery from '~/components/blog/article/ArticleGallery.vue';
import type { Article } from '~/santiy.types';

const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $slug][0]`;
const { params } = useRoute();

const { data: article, error } = await useSanityQuery<Article>(ARTICLE_QUERY, params);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

const { y: scrollY } = useScroll(window);

// inital is 0
const headerImageBorderRadius = ref<string>(undefined);
// inital is 32px
const headerPadding = ref<string>(undefined);
watchEffect(() => {
  if (scrollY.value === 0) {
    headerImageBorderRadius.value = undefined;
    headerPadding.value = undefined;
    return;
  }

  // while scrolling, we want to gradually increase the border radius of the header image, until it reaches 32
  headerImageBorderRadius.value = `${Math.min(64, Math.max(0, Math.round(scrollY.value / 10)))}px`;
  // while scrolling, we want to gradually decrease the padding of the header, until it reaches 0
  headerPadding.value = `${Math.min(32, Math.max(0, Math.round(scrollY.value / 10)))}px`;
});

const header = useTemplateRef<HTMLElement>('header');
const showTitleInFactSheet = shallowRef(false);
useIntersectionObserver(header, ([entry]) => {
  console.log(entry.isIntersecting);
  // we want to show title in the fact sheet, once the header is not visible anymore
  showTitleInFactSheet.value = !entry.isIntersecting;
});

const formattedDate = useState(() => useDateFormat(article.value.publishedAt, 'DD MMMM YYYY'));

const srcset = computed(() => {
  if (article.value?.mainImage?.asset) {
    const { asset } = article.value.mainImage;
    // we want to show 600px wide image on mobile, 800px on medium screens, and 1200px on large screens, and 2x for retina displays
    return `
      ${urlFor(asset).width(300).auto('format').url()} 300w,
      ${urlFor(asset).width(600).auto('format').url()} 600w, 
      ${urlFor(asset).width(800).auto('format').url()} 800w,
      ${urlFor(asset).width(1200).auto('format').url()} 1200w,
      ${urlFor(asset).width(1600).auto('format').url()} 2x
    `;
  }
  return '';
});
const sizes = computed(() => {
  if (article.value?.mainImage?.asset) {
    // image is 100% width on mobile, 800px on medium screens, and 1200px on large screens
    return `
      (max-width: 640px) 100vw,
      (max-width: 768px) 600px,
      (max-width: 1024px) 800px,
      1200px
    `;
  }
  return undefined;
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
