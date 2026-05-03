import {
  type SanityImageSource,
  createImageUrlBuilder,
} from "@sanity/image-url"

import { projectId, dataset } from "../env"

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
