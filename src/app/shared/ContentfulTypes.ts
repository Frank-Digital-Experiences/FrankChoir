import { IGatsbyImageData } from 'gatsby-plugin-image'
import { ContentfulRichTextGatsbyReference } from 'gatsby-source-contentful/rich-text'

// Sections

export type Section = {
  __typename: string
}

export type ContentfulRichText = {
  raw: string
  references: ContentfulRichTextGatsbyReference[]
}

export type ContentfulPage = {
  id: string
  slug: string
  currentLang?: string
  seoTitle: string
  seoDescription: string
  seoImage?: { file: { url: string } }
  showNavbar?: boolean
  showFooter?: boolean
  showLanguageSelector?: boolean
  swedishLanguage?: boolean
  sections: Section[]
  sectionsFullwidth: Section[]
  bottomSection: Section[]
}

export type PageStandard = {
  contentfulPage: ContentfulPage
}
type SEO = {
  seoTitle: string
  seoDescription: string
  seoImage?: any
  slug: string
}
export type PageWrapperStandard = {
  seo: SEO
  showNavbar?: boolean
  showFooter?: boolean
  children: React.ReactNode
}

export type ContentfulSectionHero = {
  __typename: string
  id: string
  heading: string
  ingress: { ingress: string }
  backgroundImageDesktop: {
    gatsbyImageData: IGatsbyImageData
    description: string
    file: { url: string }
  }
  backgroundImageMobile: {
    gatsbyImageData: IGatsbyImageData
    description: string
    file: { url: string }
  }
  Paragraph: string
  // Heading1: string
  // ButtonText: string
  // ButtonStyle: ButtonTypes
  // ButtonColor: ColorTypes
}

export type ContentfulSectionText = {}

type DropdownLink = {
  id: string
  slug: string
}

export type SocialMedia = {
  id: string
  title: string
  url: string
}

export type MenuLink = {
  id: string
  linkName: string
  slug: string
  links: DropdownLink[]
}

export type Media = {
  gatsbyImageData: IGatsbyImageData
  description: string
  file?: { url: string }

}

export type ContentfulMenu = {
  id: string
  logo?: Media
  menuLinks: MenuLink[]
  socialMedia: SocialMedia[]
}

// SpaceToNextSection

export type SpaceToNextSection =
  | 'Small'
  | 'Medium'
  | 'Large'
  | 'Huge'
  | undefined

export type PixelsToNextSection = '16px' | '32px' | '64px' | '128px' | string

export const TextToMarginConverter = {
  Small: '1rem',
  Medium: '2rem',
  Large: '4rem',
  Huge: '8rem',
}
