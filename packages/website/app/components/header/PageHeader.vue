<template>
  <header
    ref="header"
    class="header fixed left-0 right-0 top-0 z-10 flex items-center gap-4 transition-all backdrop-blur-(--header-blur)"
    :class="{
      'bg-peach-light/20 dark:bg-lavender-extra-dark/20': scrollY > 0,
    }"
    :style="{
      '--header-blur': blurValue + 'px',
    }"
  >
    <div class="flex flex-1 items-center gap-4 p-4 lg:flex-auto">
      <PageLogo />

      <NuxtLink to="/" class="font-serif text-3xl font-bold"> Blog </NuxtLink>
    </div>

    <div class="flex gap-4 px-4">
      <ClientOnly>
        <ThemeToggler />
      </ClientOnly>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ClientOnly } from '#components';
import { useScroll } from '@vueuse/core';
import { computed, useTemplateRef } from 'vue';
import PageLogo from '~/components/common/PageLogo.vue';
import ThemeToggler from './ThemeToggler.vue';

const header = useTemplateRef<HTMLElement>('header');

const { y: scrollY } = useScroll(window);
const blurValue = computed(() => {
  return `${Math.min(scrollY.value / 5, 64)}`;
});
</script>

<style scoped></style>
