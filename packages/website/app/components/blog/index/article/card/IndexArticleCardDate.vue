<template>
  <p class="text-right">
    <NuxtTime :datetime="date" year="numeric" month="2-digit" day="2-digit" locale="fr-CA" />
  </p>
</template>

<script setup lang="ts">
import { NuxtTime } from '#components';

const { date } = defineProps<{
  date: Date | string;
}>();
</script>

<style scoped></style>
