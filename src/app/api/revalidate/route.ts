/** Function in /functions/invalidate-tags/index.ts is uploaded to Sanity.
 *  Sanity calls it anytime a content update is detected on Content Lake.
 *  That function has a call to this API route in our Next.js app.
 *  This route revalidates the tags that match the tag names that come from that Sanity fucntion call.
 */

import { type NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

interface RequestBody {
  syncTags: string[]
}

export async function POST(request: NextRequest) {
  const { syncTags } = (await request.json()) as RequestBody

  console.log("Sync tags received:", syncTags)

  for (const tag of syncTags) {
    revalidateTag(`sanity:${tag}`, "max")
  }

  return NextResponse.json({ revalidated: true })
}
