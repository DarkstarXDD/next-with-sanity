import { defineQuery } from "next-sanity"

export const getCategories = defineQuery(
  `
  *[_type == "category" && defined(slug.current)] | order(_createdAt asc){
  _id, _type, title, slug, description, createdAt,
}`
)
