import { computed, unref, type MaybeRef } from 'vue';
import type { ArticleDocumentData } from '~~/prismicio-types';

export default (mainImage: MaybeRef<ArticleDocumentData['main_image']>) => {
  const hasMainImage = computed(() => {
    const mainImageRaw = unref(mainImage);

    return mainImageRaw && mainImageRaw.url;
  });

  const hasNoMainImage = computed(() => {
    return !hasMainImage.value;
  });

  return {
    hasMainImage,
    hasNoMainImage,
  };
};
