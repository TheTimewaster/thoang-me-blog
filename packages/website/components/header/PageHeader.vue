<template>
  <header
    ref="header"
    class="header fixed left-0 right-0 top-0 flex items-center gap-4 transition-colors"
    :class="{
      'bg-peach/20 dark:bg-lavender-extra-dark/20 backdrop-blur-[40px]': scrollY > 0,
    }"
  >
    <div class="flex flex-1 items-center gap-4 p-4 lg:flex-auto">
      <PageLogo />

      <h1 class="flex gap-2 font-serif text-3xl font-bold">Blog</h1>
    </div>

    <div class="flex gap-4 px-4">
      <ClientOnly>
        <ThemeToggler />
      </ClientOnly>
    </div>
  </header>
</template>

<script setup lang="ts">
import PageLogo from '~/components/common/PageLogo.vue';
import ThemeToggler from './ThemeToggler.vue';
import { useTemplateRef } from 'vue';
import { useScroll } from '@vueuse/core';
import { ClientOnly } from '#components';

const header = useTemplateRef<HTMLElement>('header');

const { y: scrollY } = useScroll(window);
</script>

<style scoped></style>
