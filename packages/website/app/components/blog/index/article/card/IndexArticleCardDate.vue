<template>
  <p class="text-right">
    {{ formattedDate }}
  </p>
</template>

<script setup lang="ts">
import { useState } from '#app';
import { useDateFormat } from '#imports';

const { date } = defineProps<{
  date: Date | string;
}>();

const formattedDate = useState(() => useDateFormat(date, 'DD MMMM, YYYY'));
</script>

<style scoped></style>
