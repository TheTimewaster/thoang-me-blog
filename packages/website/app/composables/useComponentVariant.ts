import { tw } from '#imports';
import { computed, unref, type MaybeRef } from 'vue';
import type { ArticleDocumentData } from '~~/prismicio-types';

export type ComponentColorVariant = 'peach' | 'lavender';

const VARIANT_BG = {
  peach: 'bg-peach',
  lavender: 'bg-lavender',
  vue: tw`bg-gradient-to-br from-emerald-400 to-cyan-400`,
  dev: tw`from-peach bg-gradient-to-br to-red-200`,
};

const VARIANT_TEXT = {
  peach: 'text-lavender-dark',
  lavender: 'text-peach-light',
  vue: tw`text-lavender-dark`,
  dev: tw`text-lavender-dark`,
};

export default (
  variant: MaybeRef<ComponentColorVariant>,
  tags: MaybeRef<ArticleDocumentData['tags']>,
  includeText = false,
) => {
  const color = computed(() => {
    const tagsValue = unref(tags);
    if (tagsValue.map((tag) => tag.tag).includes('vue')) {
      return includeText ? `${VARIANT_BG.vue} ${VARIANT_TEXT.vue}` : VARIANT_BG.vue;
    }

    if (tagsValue.map((tag) => tag.tag).includes('dev')) {
      return includeText ? `${VARIANT_BG.dev} ${VARIANT_TEXT.dev}` : VARIANT_BG.dev;
    }

    const variantValue = unref(variant);
    const bg = VARIANT_BG[variantValue];
    const text = VARIANT_TEXT[variantValue];

    return includeText ? `${bg} ${text}` : bg;
  });

  return color;
};
