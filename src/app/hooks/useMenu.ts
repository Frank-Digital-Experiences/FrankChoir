import { useStaticQuery, graphql } from 'gatsby'

export type ContentfulPageLink = {
  pageTitle: string
  slug: string
}
export type MenuLink = {
  __typename: string
  pageTitle: string
  links: ContentfulPageLink[]
  contentfulPage: ContentfulPageLink[]
  id: string
  slug: string
}
export type ContentfulMenuProps = {
  id: string
  menuLinks: MenuLink[]
}
export const useMenu = () => {
  const menu = useStaticQuery(graphql`
    {
      contentfulMenu(contentful_id: { eq: "headerNavbar" }) {
        menuLinks {
          slug
          linkName
        }
        socialMedia {
          title
          url
        }
      }
    }
  `)
  return menu
}
