<template>
  <li
    :class="{
      'perspective-distant': !small,
      'perspective-normal': small,
    }"
  >
    <NuxtLink
      ref="linkContainer"
      class="fill rounded-4xl md:rotate-x-(--rotate-x) md:rotate-y-(--rotate-y) translate-z-0 shadow-lavender-extra-dark dark:shadow-peach/20 flex flex-col justify-end bg-cover transition-all hover:scale-[1.02] hover:shadow-xl"
      :class="{
        'aspect-square p-8 md:aspect-[3/2] lg:aspect-square': !small,
        'aspect-[2/1] p-4 md:aspect-square': small,
        'bg-lavender/50 bg-blend-multiply': dark && !isSolidCard,
        '[background-image:var(--article-image)]': !isSolidCard,
        'bg-peach': !dark && isSolidCard,
        'bg-lavender-dark': dark && isSolidCard,
      }"
      :to="`/blog/${slug}`"
      :style="{
        '--article-image': image != null ? `url(${image})` : undefined,
        '--tw-rotate-x': `rotateX(${roll}deg)`,
        '--tw-rotate-y': `rotateY(${tilt}deg)`,
      }"
    >
      <h2
        class="text-right font-serif font-bold"
        :class="{
          'text-2xl sm:text-6xl': !small,
          'text-2xl lg:text-4xl': small,
          'text-peach': dark,
          'text-lavender-dark': !dark && isSolidCard,
        }"
      >
        {{ title }}
      </h2>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watchEffect } from 'vue';
import { NuxtLink } from '#components';
import { useMouseInElement } from '@vueuse/core';

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

const linkContainer = useTemplateRef<InstanceType<typeof NuxtLink>>('linkContainer');
const {
  isOutside,

  elementX: x,
  elementY: y,
  elementPositionX: positionX,
  elementPositionY: positionY,
  elementWidth: width,
  elementHeight: height,
} = useMouseInElement(linkContainer, {
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

  if (small) {
    tilt.value = tiltValue * 20;
    roll.value = rollValue * 20;
    return;
  }

  tilt.value = tiltValue * 10;
  roll.value = rollValue * 10;
});
</script>

<style scoped></style>
