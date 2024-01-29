import React from "react"
import Home from "./Home"

import { Entry, EntrySkeletonType, createClient } from "contentful"
import { GetStaticProps } from "next"
import { Track } from "../components/Track"
import { Song } from "../components/Song"
import NotFound from "./404"

export type SlugCollection = (readonly [string, string])[]
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
})
export const getStaticPaths = async () => {
  const { items } = await client.getEntries({
    content_type: "choirSong",
    select: ["fields.slug"],
  })

  const paths = items
    .filter((item) => Boolean(item?.fields?.slug))
    .map((item) => {
      const {
        fields: { slug },
      } = item
      if (!slug) return { params: { slug: [""] } }
      if (slug === "home") {
        return { params: { slug: ["/"] } }
      }
      return {
        params: { slug: [slug.toString()] },
      }
    })

  return {
    paths,
    fallback: "blocking",
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const brokenLinkRedirect = {
    props: {},
  }

  const { slug } = params || {}
  // no slug provided (is it possible?)

  // page
  let contentfulChoirSong: Entry | undefined = undefined
  if (slug) {
    // const concatenatedSlug = typeof slug === "string" ? slug : slug.join("/")

    const { items } = await client.getEntries({
      content_type: "choirSong",
      "fields.slug": slug,
      include: 2,
      limit: 1,
    })

    // no page match in Contentful on provided params.slug
    if (!items[0]) {
      return brokenLinkRedirect
    }

    contentfulChoirSong = items[0]
  }

  // slugCollection

  const { items: pageQueryCollection } =
    await client.getEntries<EntrySkeletonType>({
      content_type: "choirSong",
      select: ["fields.slug", "fields.title"],
      include: 1,
    })

  return {
    props: {
      page: contentfulChoirSong || { songs: pageQueryCollection },
    },
    revalidate: 1,
  }
}
const songPage = ({ page }) => {
  if (!page?.metadata) {
    if (!page?.songs) {
      return <NotFound />
    } else {
      return <Home {...page.songs} />
    }
  }
  return (
    <main>
      <Song {...page.fields} />
    </main>
  )
}

export default songPage
