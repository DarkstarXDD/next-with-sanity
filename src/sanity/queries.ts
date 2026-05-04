import { defineQuery } from "next-sanity"

export const getCategories = defineQuery(
  `
  *[_type == "category" && defined(slug.current)] | order(_createdAt asc){
  _id, _type, title, slug, description, createdAt,
  }`
)

export const getPosts = defineQuery(
  `
  *[
  _type == "post" &&
  defined(slug.current) &&
  select(
    defined($category) => $category in categories[]->slug.current,
    true
  )
  ]{
  _id, _createdAt, _updatedAt, _type, categories, title, slug,
  "author": author->{_id, name},
  "categories": categories[]->{_id, title, slug}
  }`
)

export const getPost = defineQuery(
  `
  *[_type == "post" && slug.current == $slug][0]{
  _id, _createdAt, _updatedAt, _type, title, slug, body,
  "author": author->{_id, name},
  "categories": categories[]->{_id, title, slug}
  }`
)
