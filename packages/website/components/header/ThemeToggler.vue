<template>
  <BButton>
    <div class="relative h-8 w-8 overflow-hidden" type="button" @click="() => toggleDark()">
      <Transition
        enter-from-class="translate-y-full rotate-90"
        enter-active-class="transition-transform duration-500 ease-in-out"
        enter-to-class="translate-y-0 rotate-0"
        leave-from-class="translate-y-0 rotate-0"
        leave-active-class="transition-transform duration-500 ease-in-out"
        leave-to-class="translate-y-full rotate-90"
        mode="out-in"
      >
        <svg
          v-if="darkMode"
          class="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          wclassth="1em"
          height="1em"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M236.37 139.4a12 12 0 0 0-12-3A84.07 84.07 0 0 1 119.6 31.59a12 12 0 0 0-15-15a108.86 108.86 0 0 0-54.91 38.48A108 108 0 0 0 136 228a107.09 107.09 0 0 0 64.93-21.69a108.86 108.86 0 0 0 38.44-54.94a12 12 0 0 0-3-11.97m-49.88 47.74A84 84 0 0 1 68.86 69.51a84.93 84.93 0 0 1 23.41-21.22Q92 52.13 92 56a108.12 108.12 0 0 0 108 108q3.87 0 7.71-.27a84.79 84.79 0 0 1-21.22 23.41"
          />
        </svg>
        <svg
          v-else
          class="h-full w-full transition-transform duration-200 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M116 36V20a12 12 0 0 1 24 0v16a12 12 0 0 1-24 0m80 92a68 68 0 1 1-68-68a68.07 68.07 0 0 1 68 68m-24 0a44 44 0 1 0-44 44a44.05 44.05 0 0 0 44-44M51.51 68.49a12 12 0 1 0 17-17l-12-12a12 12 0 0 0-17 17Zm0 119l-12 12a12 12 0 0 0 17 17l12-12a12 12 0 1 0-17-17M196 72a12 12 0 0 0 8.49-3.51l12-12a12 12 0 0 0-17-17l-12 12A12 12 0 0 0 196 72m8.49 115.51a12 12 0 0 0-17 17l12 12a12 12 0 0 0 17-17ZM48 128a12 12 0 0 0-12-12H20a12 12 0 0 0 0 24h16a12 12 0 0 0 12-12m80 80a12 12 0 0 0-12 12v16a12 12 0 0 0 24 0v-16a12 12 0 0 0-12-12m108-92h-16a12 12 0 0 0 0 24h16a12 12 0 0 0 0-24"
          />
        </svg>
      </Transition>
    </div>
  </BButton>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core';
import BButton from '~/components/common/BButton.vue';

const darkMode = useDark({
  initialValue: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
});

console.log(darkMode.value);

const toggleDark = () => {
  darkMode.value = !darkMode.value;
};
</script>

<style scoped></style>
