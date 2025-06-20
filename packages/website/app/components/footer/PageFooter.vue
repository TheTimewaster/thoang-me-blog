<script setup lang="ts">
import PageFooterSocial from './PageFooterSocial.vue';
</script>

<template>
  <footer class="py-8 text-xs">
    <p class="text-center">Tu Hoang, 2025</p>
    <ul class="my-1 flex justify-center gap-4">
      <PageFooterSocial name="Instagram" link="https://instagram.com/thirtytu" icon="mdi:instagram" />
      <PageFooterSocial name="GitHub" link="https://github.com/TheTimewaster" icon="mdi:github" />
      <PageFooterSocial name="LinkedIn" link="https://www.linkedin.com/in/tu-hoang-50184a1bb" icon="mdi:linkedin" />
    </ul>
    <p class="text-center">
      <a href="https://github.com/TheTimewaster/thoang-me-blog" class="underline">Source</a>
      &nbsp;&#x2022;&nbsp; Powered by
      <a href="https://nuxt.com/" class="underline">Nuxt</a>,
      <a href="https://tailwindcss.com/" class="underline">Tailwind CSS</a>
      and
      <a href="https://pages.cloudflare.com/" class="underline">Cloudflare Pages</a>
    </p>

    <p class="text-center">Content provided by <a href="https://prismic.io" class="underline"> prismic.io </a></p>
  </footer>
</template>
