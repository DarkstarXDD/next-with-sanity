import { notFound } from "next/navigation"
import { PortableText } from "next-sanity"
import Link from "next/link"

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
      <Link
        className="mb-8 inline-block text-sm text-gray-500 hover:underline"
        href={"/"}
      >
        &larr; Back to all posts
      </Link>
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      <p className="mb-2 text-gray-600">By {post.author.name}</p>
      <p className="mb-10 text-sm text-gray-600">
        Tags: {post.categories?.map((category) => category.title).join(", ")}
      </p>

      {post.body ? (
        <div className="prose">
          <PortableText value={post.body} />
        </div>
      ) : null}
    </main>
  )
}
