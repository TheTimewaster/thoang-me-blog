<template>
  <BButton component="a" :variant="variant" :label="label" :disabled="disabled" :href="href">
    <slot>
      {{ label }}
    </slot>
  </BButton>
</template>

<script setup lang="ts">
import BButton from './BButton.vue';

const {
  href,
  variant = 'default',
  label = 'Click me',
  disabled = false,
} = defineProps<{
  /**
   * The URL to navigate to when the button is clicked.
   */
  href: string;

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
</script>

<style scoped></style>
