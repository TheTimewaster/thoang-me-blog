<template>
  <li>
    <a
      :href="link"
      :aria-label="name"
      class="hover:bg-lavender-dark hover:text-peach-light dark:hover:bg-peach-light dark:hover:text-lavender-dark block rounded-full p-3 transition-colors"
    >
      <Icon :name="icon" class="text-2xl" />
    </a>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  link: string;
  name: string;
  icon: string;
}>();
</script>

<style scoped></style>
