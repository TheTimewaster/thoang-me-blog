<template>
  <h2 class="text-right font-serif font-bold">
    <slot name="default" />
  </h2>
</template>

<script setup lang="ts">
defineSlots<{
  default: () => void;
}>();
</script>

<style scoped></style>
