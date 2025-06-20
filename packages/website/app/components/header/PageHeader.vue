<template>
  <header
    ref="header"
    class="header backdrop-blur-(--header-blur) text-lavender-dark dark:text-peach-light fixed left-0 right-0 top-0 z-10 flex items-center gap-4 transition-all"
    :class="{
      'bg-peach-light/20 dark:bg-lavender-extra-dark/20': scrollY > 0,
    }"
    :style="{
      '--header-blur': blurValue + 'px',
    }"
  >
    <div class="flex flex-1 items-center gap-4 p-4 lg:flex-auto">
      <PageLogo />

      <NuxtLink to="/" class="overflow-hidden font-serif text-3xl font-bold" :class="{}">
        <Transition
          enter-active-class="transition-transform duration-500 ease-in-out"
          enter-from-class="translate-y-full"
          enter-to-class="translate-y-0"
          leave-active-class="transition-transform duration-500 ease-in-out"
          leave-from-class="translate-y-0"
          leave-to-class="translate-y-full"
          mode="out-in"
        >
          <div v-if="isNotMainPage" class="flex items-center">
            <Icon name="ic:baseline-chevron-left" class="block text-5xl transition-opacity duration-200" />
            <span class="leading-12">Blog</span>
          </div>

          <p v-else class="leading-12">Blog</p>
        </Transition>
      </NuxtLink>
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
import { useRoute } from 'vue-router';
import PageLogo from '~/components/common/PageLogo.vue';
import ThemeToggler from './ThemeToggler.vue';

const header = useTemplateRef<HTMLElement>('header');

const { y: scrollY } = useScroll(window);
const blurValue = computed(() => {
  return `${Math.min(scrollY.value / 5, 64)}`;
});

const route = useRoute();
const isNotMainPage = computed(() => {
  return route.name !== 'index';
});
</script>

<style scoped></style>
