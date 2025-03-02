<template>
  <NuxtLayout name="article-layout">
    <template v-if="article != null">
      <div
        class="md:px-(--article-header__padding,0)"
        :style="{
          '--article-header__padding': headerPadding,
        }"
      >
        <div
          class="relative flex aspect-square flex-col justify-between overflow-hidden sm:aspect-[3/2] lg:aspect-[2/1]"
        >
          <NuxtImg
            class="rounded-(--article-image__border-radius) absolute left-0 top-0 -z-10 h-full w-full object-cover transition-all"
            :src="urlFor(article.mainImage).format('webp').crop('center').url()"
            :alt="article.title"
            width="600"
            height="400"
            :style="{
              '--article-image__border-radius': headerImageBorderRadius,
            }"
          />

          <div
            class="from-peach/40 dark:from-lavender-extra-dark/40 h-32 bg-gradient-to-b from-70% to-transparent"
          ></div>

          <div
            class="from-peach/40 dark:from-lavender-extra-dark/40 bg-gradient-to-t from-70% to-transparent p-4 transition-colors md:p-8 lg:p-16"
            ref="header"
          >
            <h1 class="font-serif text-4xl md:w-1/2 md:text-6xl">{{ article.title }}</h1>
          </div>
        </div>
      </div>

      <div class="mx-auto mt-8 max-w-screen-lg lg:flex lg:gap-8">
        <!-- meta column -->
        <div class="w-1/3">
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

          <label for="article-published" class="dark:text-peach/60 text-lavender-extra-dark/60 text-xs font-bold">
            Published
          </label>
          <p class="text" id="article-published">{{ formattedDate }}</p>
          <label for="article-published" class="dark:text-peach/60 text-lavender-extra-dark/60 text-xs font-bold">
            Type
          </label>

          <p class="text" id="article-type">Article</p>
          <label for="article-published" class="dark:text-peach/60 text-lavender-extra-dark/60 text-xs font-bold">
            Tags
          </label>
          <p>tag</p>
        </div>
        <div class="sanity-content w-2/3">
          <SanityContent v-if="article.content" :blocks="article.content" />
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
import { useRoute } from 'vue-router';
import { NuxtImg } from '#components';
import type { Article } from '~/santiy.types';
import { useDateFormat, useIntersectionObserver } from '@vueuse/core';

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
