import React from 'react'
import { Helmet } from 'react-helmet'
import frankOgImage from '../images/frank-fam-share-image.png'

export type SeoProps = {
  description?: string
  title?: string
  image: any
  slug?: string
  language?: string
}
const Seo: React.FC<SeoProps> = ({ title, description, image, slug, language }) => {
  const metaTitle = title
  const metaDescription = `${description || ''}`
  const metaUrl = `https://frankfam.co/${
    slug === 'homepage' || !slug ? '' : slug
  }`

  const metaImage = image ? image.file?.url : `${frankOgImage}`

  return (
    <Helmet
      title={metaTitle}
      htmlAttributes={language ? { lang: language } : { lang: 'en' }}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:locale',
          content: 'en_US',
        },
        {
          property: 'og:site_name',
          content: metaTitle,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          property: 'og:url',
          content: metaUrl,
        },
        {
          name: 'twitter:card',
          content: '',
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: metaImage,
        },
        {},
      ]}
    />
  )
}

export default Seo
