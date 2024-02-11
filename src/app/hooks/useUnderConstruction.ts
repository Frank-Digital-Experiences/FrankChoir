import { useStaticQuery, graphql } from 'gatsby'

export const useUnderConstruction = () => {
  const result = useStaticQuery(graphql`
    {
      contentfulSectionColumns(
        title: { eq: "Frank Studios - Under constrution" }
      ) {
        heading
        heading2
        columns {
          text {
            raw
          }
        }
        bigParagraph {
          raw
        }
      }
    }
  `)
  const data = { ...result.contentfulSectionColumns }
  return data
}
