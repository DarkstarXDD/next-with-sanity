"use client"

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, projectId, dataset } from "./src/sanity/env"
import { structure } from "./src/sanity/structure"
import { schema } from "./src/sanity/schemaTypes"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
