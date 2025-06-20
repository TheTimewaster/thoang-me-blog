<script setup lang="ts">
import { Body, Head, NuxtLayout, NuxtPage, Title } from '#components';
import PageFooter from './components/footer/PageFooter.vue';
import PageHeader from './components/header/PageHeader.vue';
</script>

<template>
  <Head>
    <Title>thoang.me Blog</Title>
    <Body class="bg-peach-light dark:bg-lavender-dark text-lavender-dark dark:text-peach-light transition-colors" />
  </Head>

  <PageHeader />

  <div class="flex min-h-dvh flex-col justify-between">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <PageFooter />
  </div>
</template>
