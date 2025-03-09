<template>
  <button
    class="theme-toggle hover:bg-lavender-extra-dark hover:text-peach-light dark:hover:bg-peach-light dark:hover:text-lavender-extra-dark cursor-pointer rounded-full p-3 transition-colors duration-300"
    @click="emit('click')"
  >
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script setup lang="ts">
const { label = 'Click me' } = defineProps<{
  label?: string;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<style scoped></style>
