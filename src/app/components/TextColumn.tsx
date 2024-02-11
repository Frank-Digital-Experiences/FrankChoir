import { INLINES } from '@contentful/rich-text-types'
import styled from '@emotion/styled'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'
import { ContentfulRichText } from 'src/shared/ContentfulTypes'
import { breakpoints } from '../shared/DeviceBreakPoints'

type Data = {
  text: ContentfulRichText
  __typename: string
}
type TextColumnProps = {
  data: Data
}

const ColumnOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: any, _: any) => {
      const uri = node?.data?.uri
      const text = node?.content[0]?.value
      return (
        <>
          <br />
          <a href={`mailto:${uri}`}>{text}</a>
          <br />
        </>
      )
    },
  },
}
const TextColumn: React.FC<TextColumnProps> = ({ data }) => {
  const { text } = data

  return <Column>{renderRichText(text, ColumnOptions)}</Column>
}
const Column = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 1.375rem;
    line-height: 2rem;
    margin: 0;
    margin-bottom: 3rem;

    @media (max-width: ${breakpoints.md}px) {
      margin-bottom: 2rem;
    }

    b {
      font-weight: 500;
    }
  }
  ul {
    padding: 0;
    margin-top: 2rem;
    li {
      display: flex;
      align-items: center;
      p {
        margin: 0.5rem 0rem;
      }
      &:before {
        content: '';
        height: 0.6rem;
        width: 0.6rem;
        background-color: var(--colorBlack);
        border-radius: 50%;
        margin-right: 1rem;
      }
    }
  }
  h4 {
    font-size: 2rem;
    font-weight: 350;
    margin-bottom: 0.8rem;
    @media (max-width: ${breakpoints.md}px) {
      font-size: 1.7rem;
      margin-bottom: 0;
    }
  }
  h6 {
    u {
      text-decoration: none;
    }
  }
  h6 {
    u {
      display: block;
      border-bottom: 0.2rem solid var(--colorBlack);
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }
  }
`
export default TextColumn
