// "use client"

import { Entry, EntrySkeletonType, createClient } from "contentful"
import { GetStaticProps } from "next"
import { log } from "console"

import React from "react"
import { PageStandard } from "../shared/ContentfulTypes"
import {
  isSectionNotWrapped,
  SectionComponents,
} from "../utils/SectionSelector"
import Layout from "../components/Layout"
import {
  StyledSectionWrapper,
  StyledFullwidthSectionWrapper,
} from "../shared/StyledComponents"
import { useReduceMotion } from "react-reduce-motion"
import AppContextProvider from "../app-context"
import queryString from "query-string"

type PageProps = {
  data: PageStandard
  location: any
  params: any
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
})

const Page = async ({ data, location, params }) => {
  const { items } = await client.getEntries({
    content_type: "choirSong",
    "fields.slug": params.slug,
    include: 2,
    limit: 1,
  })
  const sections = data.contentfulPage.sections
  const fullwidthSections = data.contentfulPage.sectionsFullwidth
  const bottomSections = data.contentfulPage.bottomSection
  const {
    seoTitle,
    seoDescription,
    seoImage,
    slug,
    swedishLanguage,
    showNavbar,
    showFooter,
    showLanguageSelector,
  } = data.contentfulPage

  console.log(data)

  let prefersReducedMotion
  typeof window === "object"
    ? (prefersReducedMotion = useReduceMotion())
    : false

  const queryParams = queryString.parse(location.search)
  const lang = swedishLanguage ? "sv" : "en"

  return (
    <AppContextProvider
      currentLanguage={queryParams.lang ? (queryParams.lang as string) : lang}
      showLanguageSelector={showLanguageSelector ? showLanguageSelector : false}
      reduceMotion={prefersReducedMotion}
    >
      <Layout
        seo={{ seoTitle, seoDescription, seoImage, slug }}
        showNavbar={showNavbar}
        showFooter={showFooter}
      >
        {sections
          ? sections.map((section, i) => {
              const Component: React.ElementType =
                SectionComponents[section.__typename]
              const isNotWrapped = isSectionNotWrapped[section.__typename]

              if (!SectionComponents[section.__typename]) {
                console.log(`Create a component for ${section.__typename}`)

                // return <div key={i}>create a component for {section.__typename}</div>
              } else {
                return isNotWrapped ? (
                  <Component key={i} index={i} data={section} />
                ) : (
                  <StyledSectionWrapper key={i}>
                    <Component index={i} data={section} />
                  </StyledSectionWrapper>
                )
              }
            })
          : null}

        {fullwidthSections
          ? fullwidthSections.map((section, i) => {
              const Component: React.ElementType =
                SectionComponents[section.__typename]
              const isNotWrapped = isSectionNotWrapped[section.__typename]

              if (!SectionComponents[section.__typename]) {
              } else {
                return isNotWrapped ? (
                  <Component key={i} index={i} data={section} />
                ) : (
                  <StyledFullwidthSectionWrapper key={i}>
                    <StyledSectionWrapper>
                      <Component index={i} data={section} />
                    </StyledSectionWrapper>
                  </StyledFullwidthSectionWrapper>
                )
              }
            })
          : null}

        {bottomSections
          ? bottomSections.map((section, i) => {
              const Component: React.ElementType =
                SectionComponents[section.__typename]
              const isNotWrapped = isSectionNotWrapped[section.__typename]

              if (!SectionComponents[section.__typename]) {
              } else {
                return isNotWrapped ? (
                  <Component key={i} index={i} data={section} />
                ) : (
                  <StyledSectionWrapper key={i}>
                    <Component index={i} data={section} />
                  </StyledSectionWrapper>
                )
              }
            })
          : null}
      </Layout>
    </AppContextProvider>
  )
}

export const query = graphql`/
  query getContentPage($id: String) {
    contentfulPage(id: { eq: $id }) {
      seoTitle
      seoDescription
      seoImage {
        file {
          url
        }
      }
      slug
      id
      showNavbar
      showFooter
      showLanguageSelector
      swedishLanguage
      sections {
        ...contentUsps
        ...contentColumns
        ...contentInfinitySlide
        ...contentBigText
        ...contentSectionCallToActionButton
        ...contentSectionHero
        ...contentWhatWeDo
        ...contentOurServices
        ...contentCompanyLogos
        ...contentSectionCases
        ...contentSectionCards
        ...contentSectionRichText
        ...contentSectionCaseFooter
        ...contentSectionGradientBackground
        ...contentSectionContactUs
        ...contentSectionTwoColumnsText
        ...contentSectionTwoColumnsTextAndMedia
        ...contentSectionBlockquote
        ...contentSectionSocialMedias
        ...contentSectionFrankDealForm
        ...contentSectionChristmasGift
      }
      sectionsFullwidth {
        ...contentSectionRichText
        ...contentSectionTwoColumnsText
        ...contentSectionFrankDealForm
      }
      bottomSection {
        ...contentSectionTwoColumnsTextAndMedia
        ...contentColumns
      }
    }
  }
`
export default Page

// export const getStaticPaths = async () => {

//   const paths = items
//     .filter((item) => Boolean(item?.fields?.slug))
//     .map((item) => {
//       const {
//         fields: { slug },
//       } = item
//       if (!slug) return { params: { slug: [""] } }

//       return {
//         params: { slug: [slug.toString()] },
//       }
//     })
//   return {
//     paths,
//     fallback: "blocking",
//   }
// }
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const brokenLinkRedirect = {
//     props: {},
//   }

//   const { slug } = params || {}
//   // no slug provided (is it possible?)

//   // page
//   let contentfulChoirSong: Entry | undefined = undefined
//   if (slug) {
//     // const concatenatedSlug = typeof slug === "string" ? slug : slug.join("/")

// const { items } = await client.getEntries({
//   content_type: "choirSong",
//   "fields.slug": slug,
//   include: 2,
//   limit: 1,
// })

//     // no page match in Contentful on provided params.slug
//     if (!items[0]) {
//       return brokenLinkRedirect
//     }

//     contentfulChoirSong = items[0]
//   }

//   // slugCollection

//   const { items: pageQueryCollection } =
//     await client.getEntries<EntrySkeletonType>({
//       content_type: "choirSong",
//       select: ["fields.slug", "fields.title"],
//       include: 1,
//     })

//   return {
//     props: {
//       page: contentfulChoirSong || { songs: pageQueryCollection },
//     },
//     revalidate: 1,
//   }
// }
