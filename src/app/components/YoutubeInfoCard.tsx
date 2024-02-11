import styled from '@emotion/styled'
import React, {
} from 'react'

import { ContentfulRichText } from '../shared/ContentfulTypes'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { breakpoints } from '../shared/DeviceBreakPoints'

type Data = {
  videoHeading: string
  videoTitle: string
  videoDescription: ContentfulRichText;
}
export type CardProps = {
  data: Data
  index: number
}

const YoutubeCard: React.FC<CardProps> = ({ data }) => {
  const { videoHeading, videoDescription } = data

  return (
      <YoutubeInfoCardWrapper>
          <h3>{videoHeading}</h3>
          {renderRichText(videoDescription)}
      </YoutubeInfoCardWrapper>
  )
}

const YoutubeInfoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-size: 1.8rem;
    font-weight: 350;
    margin: 0;
    padding: 0;
    line-height: 1.35;
  }

  p {
    color: #252A2E;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 350;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    padding-top: 1.25rem;
    
    @media (min-width: ${breakpoints.l}px) {
      font-size: 1.375rem;
      line-height: 1.8;
    }
  }
`

export default YoutubeCard