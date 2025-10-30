<script setup lang="ts">
import { Shiki } from '#components';
import { getSliceComponentProps } from '#imports';
import type { Content } from '@prismicio/client';

const { slice } = defineProps(getSliceComponentProps<Content.CodeSlice>());
</script>

<template>
  <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" class="w-full">
    <div class="rounded-4xl w-full bg-[#fff] p-4 text-sm lg:p-8 dark:bg-[#24292e]">
      <p
        class="dark:text-peach-light text-lavender-dark border-b border-gray-300 pb-4 font-mono text-sm dark:border-gray-700"
      >
        {{ slice.primary.filename }}
      </p>
      <Shiki
        hydrate-on-visible
        v-if="slice.primary.code[0] != null"
        :lang="slice.primary.language"
        :code="slice.primary.code[0].text"
        :highlight-options="{ themes: { light: 'github-light', dark: 'github-dark' } }"
        class="mt-4 w-full overflow-x-auto"
      />
    </div>
  </section>
</template>
