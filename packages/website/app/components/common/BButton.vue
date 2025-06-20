<template>
  <button
    class="cursor-pointer rounded-full p-3 transition-all duration-300 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
    :class="variantClass"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { tw } from '#imports';
import { computed } from 'vue';

const {
  variant = 'default',
  label = 'Click me',
  disabled = false,
} = defineProps<{
  label?: string;
  /**
   * Variant of the button.
   *
   * default: Default button style. Transparent background with text color based on the current theme.
   * primary: Solid background with background color inverted based on the current theme. Use for actions that require more attention.
   * dark: Dark background with light text color. Not affected by the current theme.
   * light: Light background with dark text color. Not affected by the current theme.
   */
  variant?: 'default' | 'primary' | 'dark' | 'light';

  /**
   * Disables the button.
   */
  disabled?: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();

const variantClass = computed(() => {
  if (variant === 'primary') {
    return tw`dark:bg-peach-light/90 bg-lavender-dark/90 dark:text-lavender-extra-dark text-peach-light dark:hover:bg-peach-light hover:bg-lavender backdrop-blur-3xl`;
  }

  if (variant === 'dark') {
    return tw`bg-lavender-extra-dark/90 text-peach-light hover:bg-lavender-extra-dark backdrop-blur-3xl`;
  }

  if (variant === 'light') {
    return tw`bg-peach-light/90 text-lavender-dark hover:bg-peach-light backdrop-blur-3xl`;
  }

  return tw`hover:bg-lavender-dark hover:text-peach-light dark:hover:bg-peach-light dark:hover:text-lavender-dark`;
});
</script>

<style scoped></style>
