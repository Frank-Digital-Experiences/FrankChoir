// "use client"
import React from "react"
import Home from "../../components/Home"

import { Entry, EntrySkeletonType, createClient } from "contentful"
import { GetStaticProps } from "next"
import { Track } from "../../components/Track"
import { Song } from "../../components/Song"
import { log } from "console"

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
})
const Page = async ({ params }: any) => {
  const { items } = await client.getEntries({
    content_type: "choirSong",
    "fields.slug": params.slug,
    include: 2,
    limit: 1,
  })

  if (!items || !items[0] || !items[0].fields) {
    return null
  }
  return (
    <main>
      <Song {...items[0].fields} />
    </main>
  )
}
export default Page
