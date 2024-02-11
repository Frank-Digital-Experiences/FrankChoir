import { useStaticQuery, graphql } from 'gatsby'

export const useFooter = () => {
  const footerData = useStaticQuery(graphql`
    {
      contentfulSectionFooter {
        bottomMenu {
          menuLinks {
            linkName
            slug
          }
        }
      }
    }
  `)
  return footerData
}
