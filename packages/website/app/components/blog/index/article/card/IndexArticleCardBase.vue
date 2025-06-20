<template>
  <NuxtLink
    ref="linkContainer"
    class="rounded-4xl md:rotate-x-(--rotate-x) md:rotate-y-(--rotate-y) translate-z-0 dark:shadow-peach-light/20 flex flex-col justify-end bg-cover transition-all hover:scale-[1.02]"
    :class="backgroundClass"
    :to="`/blog/${slug}`"
    :style="{
      '--article-image': imageUrl != null ? `url(${imageUrl})` : undefined,
      '--tw-rotate-x': `rotateX(${roll}deg)`,
      '--tw-rotate-y': `rotateY(${tilt}deg)`,
    }"
  >
    <slot name="title" />
    <slot name="date" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import { useComponentVariant } from '#imports';
import { isFilled } from '@prismicio/client';
import { useMouseInElement } from '@vueuse/core';
import { computed, ref, toRef, useTemplateRef, watchEffect } from 'vue';
import { type ComponentColorVariant } from '~/composables/useComponentVariant';
import type { ArticleDocumentData } from '~~/prismicio-types';

const {
  variant = 'peach',

  tags = [],

  isMain = false,
  image = null,
  slug,

  tiltRollModifier = 10,
} = defineProps<{
  variant?: ComponentColorVariant;
  tags?: ArticleDocumentData['tags'];

  isMain?: boolean;
  image?: ArticleDocumentData['main_image'];

  slug: string;

  tiltRollModifier?: number;
}>();

defineSlots<{
  title: () => void;
  date: () => void;
}>();

const variantRef = toRef(() => variant);
const tagsRef = toRef(() => tags);
const variantColor = useComponentVariant(variantRef, tagsRef, true);
const backgroundClass = computed(() => {
  if (!isFilled.image(image)) return variantColor.value;

  let backgroundClass =
    '[background-image:var(--article-image)] bg-center bg-no-repeat bg-cover bg-lavender-dark/20 bg-blend-multiply text-peach-light';

  return backgroundClass;
});

const imageUrl = computed(() => {
  if (!isFilled.image(image)) return undefined;

  if (isMain) {
    return image['big-thumbnail'].url;
  }

  return image['small-thumbnail'].url;
});

const linkContainer = useTemplateRef<InstanceType<typeof NuxtLink>>('linkContainer');
const {
  isOutside,

  elementX: x,
  elementY: y,
  elementWidth: width,
  elementHeight: height,
} = useMouseInElement(linkContainer as unknown as HTMLAnchorElement, {
  handleOutside: false,
  window,
});
const tilt = ref(0);
const roll = ref(0);

// create tilting effect
watchEffect(() => {
  if (isOutside.value) {
    tilt.value = 0;
    roll.value = 0;
    return;
  }

  if (linkContainer.value == null || x.value == null || y.value == null) return;

  const tiltValue = (x.value - width.value / 2) / width.value;
  const rollValue = -(y.value - height.value / 2) / height.value;

  tilt.value = tiltValue * tiltRollModifier;
  roll.value = rollValue * tiltRollModifier;
});
</script>

<style scoped></style>
