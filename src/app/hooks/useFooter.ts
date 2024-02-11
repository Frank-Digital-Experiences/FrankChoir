import { useStaticQuery, graphql } from "gatsby"

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

  // const { items } = await client.getEntries({
  //   content_type: "choirSong",
  //   "fields.slug": params.slug,
  //   include: 2,
  //   limit: 1,
  // })

  return footerData
}
