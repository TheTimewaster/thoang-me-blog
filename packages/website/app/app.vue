<script setup lang="ts">
import { NuxtPage } from '#components';
import PageHeader from './components/header/PageHeader.vue';
</script>

<template>
  <Head>
    <Title>thoang.me Blog</Title>
    <Body class="bg-peach dark:bg-lavender-dark text-lavender-dark dark:text-peach transition-colors" />
  </Head>
  <PageHeader />

  <NuxtPage />

  <p class="p-4 text-center text-xs">
    Tu Hoang, 2025
    <br />
    <a href="https://github.com/TheTimewaster/thoang-me-blog" class="underline">Source</a>
    &nbsp;•&nbsp; Powered by <a href="https://nuxt.com" class="underline">Nuxt</a>,
    <a href="https://tailwindcss.com/" class="underline">Tailwind CSS</a> and
    <a href="https://pages.cloudflare.com/" class="underline">Cloudflare Pages</a>
    <br />
    Content provided by <a href="https://sanity.io" class="underline">sanity.io</a>
  </p>
</template>
