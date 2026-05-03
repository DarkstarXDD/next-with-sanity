import Link from "next/link"

import { getCategories } from "@/sanity/queries"
import { sanityFetch } from "@/sanity/lib/live"

export default async function Home() {
  const { data: categories } = await sanityFetch({
    query: getCategories,
  })

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">My site</h1>
      <h2 className="mb-4 text-xl font-semibold">Categories</h2>
      <ul className="mb-8 flex flex-col gap-2">
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              href={`/categories/${category.slug.current}`}
              className="text-white underline"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="text-gray-300">Hello world!</div>
    </main>
  )
}
