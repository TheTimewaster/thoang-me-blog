import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {codeInput} from '@sanity/code-input'
import {presentationTool} from 'sanity/presentation'

export default defineConfig({
  name: 'default',
  title: 'thoang-me-blog',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET as string,

  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL_ORIGIN,
        preview: '/',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
