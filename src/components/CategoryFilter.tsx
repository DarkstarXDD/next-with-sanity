"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

import type { GetCategoriesResult } from "@/sanity/types"

export default function CategoryFilter({
  categories,
}: {
  categories: GetCategoriesResult
}) {
  const router = useRouter()
  const path = usePathname()
  const readOnlySearchParams = useSearchParams()

  const onCategoryChange = useDebouncedCallback((value: string) => {
    const searchParams = new URLSearchParams(readOnlySearchParams)

    if (value === "") {
      searchParams.delete("category")
    } else {
      searchParams.set("category", value)
    }
    router.push(`/${path}?${searchParams.toString()}`)
  }, 200)

  return (
    <div className="grid gap-2">
      <label
        className="text-sm font-medium text-gray-600"
        htmlFor="category-select"
      >
        Select Category
      </label>
      <select
        className="max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        onChange={(e) => {
          onCategoryChange(e.currentTarget.value)
        }}
        defaultValue={readOnlySearchParams.get("category") ?? ""}
        id="category-select"
        name="category"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option value={category.slug.current} key={category._id}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  )
}
