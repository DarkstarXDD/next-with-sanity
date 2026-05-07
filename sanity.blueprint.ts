import {
  defineSyncTagInvalidateFunction,
  defineBlueprint,
} from "@sanity/blueprints"

export default defineBlueprint({
  resources: [
    defineSyncTagInvalidateFunction({
      name: "invalidate-tags",
      src: "src/sanity/functions/invalidate-tags",
    }),
  ],
})
