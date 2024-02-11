import styled from "@emotion/styled"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import React from "react"

import { ContentfulRichText } from "src/shared/ContentfulTypes"

import { breakpoints } from "../shared/DeviceBreakPoints"
import UnderConstructionIcon from "../../images/sticker_under_construction.svg"
import TextColumn from "./TextColumn"

type UnderConstructionProps = {
  data: {
    heading: string
    heading2: string
    bigParagraph: ContentfulRichText
    columns: {
      text: ContentfulRichText
      __typename: string
    }[]
  }
}

const Columns = ({ data }: UnderConstructionProps) => {
  const { columns } = data

  return (
    <Section>
      <ImageContainer>
        <UnderConstructionImage
          alt="Stylized text reading 'Full website soon'"
          src={UnderConstructionIcon}
        />
      </ImageContainer>
      {data?.heading && <h4>{data.heading}</h4>}

      {data?.heading2 && <BigText>{data.heading2}</BigText>}
      <Paragraph>{renderRichText(data.bigParagraph)}</Paragraph>
      <Grid>
        {columns.map((column, index: number) => {
          return <TextColumn key={column.text.raw} data={column} />
        })}
      </Grid>
    </Section>
  )
}

const Paragraph = styled.div`
  word-break: break-word;
  p {
    font-size: 2rem;
  }
`
const BigText = styled.p`
  font-size: 2.5rem;
  line-height: 4.7rem;
  margin: 0 0 3rem;
  @media (max-width: ${breakpoints.md}px) {
    font-size: 1.625rem;
    line-height: 2.75rem;
  }
`

const ImageContainer = styled.div`
  position: relative;
`

const UnderConstructionImage = styled.img`
  position: absolute;
  width: 200px;
  top: 0;
  right: 0;
  @media (max-width: ${breakpoints.md}px) {
    width: 130px;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 100px;
  }
`

const Section = styled.section`
  padding-top: 4rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--site-horizontal-padding);

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: -1;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--primaryPink);
  }
  h4 {
    font-size: 3rem;
    padding: 4rem 0 2rem;
    margin: 0;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 0 var(--site-horizontal-padding-mobile);
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1.25rem;
`

export default Columns
