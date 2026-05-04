import Link from "next/link"

import { getCategories, getPosts } from "@/sanity/queries"
import CategoryFilter from "@/components/CategoryFilter"
import { sanityFetch } from "@/sanity/lib/live"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category: undefined | string }>
}) {
  const { category } = await searchParams

  const { data: categories } = await sanityFetch({
    query: getCategories,
  })

  const { data: posts } = await sanityFetch({
    query: getPosts,
    params: { category: category ?? null },
  })

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-10 text-3xl font-bold">My site</h1>
      <h2 className="mb-6 text-xl font-semibold">All blog posts</h2>

      <CategoryFilter categories={categories} />

      {posts.length === 0 && (
        <div className="mt-8 rounded-md border border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-500">
          No posts match the filters
        </div>
      )}

      <ul className="mt-8 flex flex-col gap-4">
        {posts.map((post) => (
          <li className="rounded-md border border-gray-300 p-4" key={post._id}>
            <Link
              className="text-lg font-semibold hover:underline"
              href={`/${post.slug.current}`}
            >
              {post.title}
            </Link>

            <p className="mt-1 text-sm text-gray-600">By {post.author.name}</p>

            {post.categories && post.categories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    className="rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-600"
                    key={category._id}
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
