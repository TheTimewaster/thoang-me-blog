<template>
  <NuxtLink :to="to" custom v-slot="{ navigate, href }">
    <BButtonLink :variant="variant" :label="label" :disabled="disabled" :href="href" @click="navigate">
      <slot>
        {{ label }}
      </slot>
    </BButtonLink>
  </NuxtLink>
</template>

<script setup lang="ts">
import BButtonLink from './BButtonLink.vue';

const {
  to,
  variant = 'default',
  label = 'Click me',
  disabled = false,
} = defineProps<{
  /**
   * The URL to navigate to when the button is clicked.
   */
  to: string;

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
