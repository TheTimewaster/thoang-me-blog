<template>
  <NuxtLink
    class="fill rounded-4xl flex min-h-56 flex-col justify-end bg-cover transition-transform hover:rotate-2 md:aspect-square"
    :class="{
      'aspect-square p-8': !small,
      'p-4': small,
      'bg-lavender/50 bg-blend-multiply': dark && !isSolidCard,
      '[background-image:var(--article-image)]': !isSolidCard,
      'bg-peach': !dark && isSolidCard,
      'bg-lavender-dark': dark && isSolidCard,
    }"
    :to="`/blog/${slug}`"
    :style="{
      '--article-image': image != null ? `url(${image})` : undefined,
    }"
  >
    <h2
      class="text-right font-serif font-bold"
      :class="{
        'text-6xl': !small,
        'text-4xl': small,
        'text-peach': dark,
        'text-lavender-dark': !dark && isSolidCard,
      }"
    >
      {{ title }}
    </h2>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NuxtLink } from '#components';

const {
  small = false,
  dark = false,

  date,
  image,
  slug,
  title,
} = defineProps<{
  small?: boolean;
  dark?: boolean;

  title: string;
  image?: string;
  date: string;
  slug: string;
}>();

const isSolidCard = computed(() => image == null);
</script>

<style scoped></style>
