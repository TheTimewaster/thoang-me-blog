<template>
  <NuxtLink
    ref="linkContainer"
    class="fill rounded-4xl md:rotate-x-(--rotate-x) md:rotate-y-(--rotate-y) translate-z-0 shadow-lavender-extra-dark/20 dark:shadow-peach/20 flex flex-col justify-end bg-cover transition-all hover:scale-[1.02] hover:shadow-xl"
    :class="backgroundClass"
    :to="`/blog/${slug}`"
    :style="{
      '--article-image': image != null ? `url(${image})` : undefined,
      '--tw-rotate-x': `rotateX(${roll}deg)`,
      '--tw-rotate-y': `rotateY(${tilt}deg)`,
    }"
  >
    <slot name="title" />
    <slot name="date" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed, ref, toRef, useTemplateRef, watchEffect } from 'vue';
import { NuxtLink } from '#components';
import { useMouseInElement } from '@vueuse/core';
import { useComponentVariant } from '#imports';
import { type ComponentColorVariant } from '~/composables/useComponentVariant';

const {
  variant = 'peach',

  image = null,
  slug,

  tiltRollModifier = 10,
} = defineProps<{
  variant?: ComponentColorVariant;
  image?: string;
  date?: string;
  slug: string;

  tiltRollModifier?: number;
}>();

defineSlots<{
  title: () => void;
  date: () => void;
}>();

const isSolidCard = computed(() => image == null);

const variantRef = toRef(() => variant);
const variantColor = useComponentVariant(variantRef, true);
const backgroundClass = computed(() => {
  if (isSolidCard.value) return variantColor.value;

  let backgroundClass =
    '[background-image:var(--article-image)] bg-center bg-no-repeat bg-cover bg-lavender-dark/20 bg-blend-multiply text-peach';

  return backgroundClass;
});

const linkContainer = useTemplateRef<InstanceType<typeof NuxtLink>>('linkContainer');
const {
  isOutside,

  elementX: x,
  elementY: y,
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

  tilt.value = tiltValue * tiltRollModifier;
  roll.value = rollValue * tiltRollModifier;
});
</script>

<style scoped></style>
