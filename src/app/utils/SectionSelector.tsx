import Footer from '../components/Footer'
import * as Sections from '../sections'

export type Components = {
  [sectionName: string]: React.ElementType
}

const {
  Hero,
  WhatWeDo,
  OurServices,
  CompanyLogos,
  Cases,
  Openings,
  MediaSection,
  RichTextSection,
  CaseFooter,
  GradientBackground,
  ContactUs,
  SocialMedias,
  FrankDealPage,
  ChristmasGift,
  CallToActionButton,
  BigText,
  ColumnsSection,
  InfinitySlide,
  Usps,
  Blockquote,
  TwoColumnsTextSection,
  TwoColumnsTextAndMediaSection,
} = Sections

export const SectionComponents: Components = {
  ContentfulInfinitySlider: InfinitySlide,
  ContentfulSectionColumns: ColumnsSection,
  ContentfulSectionBigText: BigText,
  ContentfulCallToActionButton: CallToActionButton,
  ContentfulSectionHero: Hero,
  ContentfulFooter: Footer,
  ContentfulSectionWhatWeDo: WhatWeDo,
  ContentfulSectionOurServices: OurServices,
  ContentfulSectionCompanys: CompanyLogos,
  ContentfulSectionCases: Cases,
  ContentfulSectionOpenPositions: Openings,
  ContentfulSectionRichText: RichTextSection,
  ContentfulSectionCards: MediaSection,
  ContentfulSectionCaseFooter: CaseFooter,
  ContentfulSectionGradientBackground: GradientBackground,
  ContentfulSectionContactUs: ContactUs,
  ContentfulSectionSocialMedias: SocialMedias,
  ContentfulSectionFrankDealForm: FrankDealPage,
  ContentfulSectionChristmasGift: ChristmasGift,
  ContentfulSectionUsps: Usps,
  ContentfulSectionBlockquote: Blockquote,
  ContentfulSectionTwoColumnsText: TwoColumnsTextSection,
  ContentfulSectionTwoColumnsTextAndMedia: TwoColumnsTextAndMediaSection,
}
export const isSectionNotWrapped: Record<string, boolean> = {
  ContentfulSectionHero: true,
}
