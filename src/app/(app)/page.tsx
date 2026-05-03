import Link from "next/link"

import { sanityFetch } from "@/sanity/lib/live"
import { getPosts } from "@/sanity/queries"

export default async function Home() {
  const { data: posts } = await sanityFetch({
    query: getPosts,
  })

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">My site</h1>
      <h2 className="mb-4 text-xl font-semibold">All blog posts</h2>
      <ul className="mb-8 flex flex-col gap-2">
        {posts.map((post) => (
          <li key={post._id}>
            <Link
              className="text-white underline"
              href={`/${post.slug.current}`}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
