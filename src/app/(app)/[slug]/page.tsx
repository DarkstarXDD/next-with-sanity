import { notFound } from "next/navigation"

import { sanityFetch } from "@/sanity/lib/live"
import { getPost } from "@/sanity/queries"

export default async function PostPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params

  const { data: post } = await sanityFetch({
    query: getPost,
    params: { slug },
  })

  if (!post) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      <p className="mb-2 text-gray-300">By {post.author?.name}</p>
      <p className="text-sm text-gray-400">
        Tags: {post.categories?.map((category) => category.title).join(", ")}
      </p>
    </main>
  )
}
