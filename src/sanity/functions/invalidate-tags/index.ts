import { syncTagInvalidateEventHandler } from "@sanity/functions"

export const handler = syncTagInvalidateEventHandler(
  async ({ event, done }) => {
    console.log("Sync tags received:", event.data.syncTags)

    await fetch(`${String(process.env.SITE_URL)}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ syncTags: event.data.syncTags }),
    })

    try {
      const response = await done(event.data.syncTags)
      console.log(
        "Invalidation complete, Sanity responded with an HTTP",
        response.status
      )
    } catch (e) {
      console.error("Error invoking Sanity invalidation done endpoint!", e)
    }
  }
)
