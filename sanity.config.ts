'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { documentInternationalization } from '@sanity/document-internationalization'
import { assist } from '@sanity/assist'
import schema from './sanity/schemas/schema'

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: schema,
  plugins: [
    structureTool(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    assist({
      translate: {
        document: {
          languageField: 'language',
          documentTypes: ['blogpost', 'privacy', 'faq', 'toc'],
        },
      },
    }),
    documentInternationalization({
      supportedLanguages: [
        { id: 'ja', title: 'Japanese' },
        { id: 'en', title: 'English' },
      ],
      schemaTypes: ['blogpost', 'privacy', 'faq', 'toc'],
    }),
  ],
})
