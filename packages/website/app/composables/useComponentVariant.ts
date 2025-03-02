import { computed, unref, type MaybeRef } from 'vue';

export type ComponentColorVariant = 'peach' | 'lavender';

const VARIANT_BG = {
  peach: 'bg-peach',
  lavender: 'bg-lavender',
};

const VARIANT_TEXT = {
  peach: 'text-lavender-dark',
  lavender: 'text-peach',
};

export default (variant: MaybeRef<ComponentColorVariant>, includeText?: boolean) => {
  const color = computed(() => {
    const variantValue = unref(variant);
    const bg = VARIANT_BG[variantValue];
    const text = VARIANT_TEXT[variantValue];

    return includeText ? `${bg} ${text}` : bg;
  });

  return color;
};
