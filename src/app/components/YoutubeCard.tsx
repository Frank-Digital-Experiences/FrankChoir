import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, {
} from 'react'

import { breakpoints } from '../shared/DeviceBreakPoints'
import { A11yColors } from '../shared/Colors'
import { VisuallyHiddenSpan } from '../shared/StyledComponents'
import { Media } from '../shared/ContentfulTypes'
import externalLinkIcon from '../images/external-link.svg'
import { ReactSVG } from "react-svg";
import { useAppContext } from '../app-context'

type Data = {
  videoLength: string
  media: Media
  mediaSmallScreen?: Media
  screenReaderExtraLinkText?: string
  url: string
}
export type CardProps = {
  data: Data
  index: number
}

const YoutubeCard: React.FC<CardProps> = ({ data, index }) => {
  const { videoLength, media, mediaSmallScreen, screenReaderExtraLinkText, url } = data
  const { currentLanguage } = useAppContext();

  return (
      <YoutubeCardContainer>
          <StyledMedia>
            {mediaSmallScreen?.gatsbyImageData ?(
              <MediaElementMultipleSrc media={media} mediaSmallScreen={mediaSmallScreen} />
              ) : (
                <MediaElement media={media}/>
              )}
          </StyledMedia>
          <ExtraInfo color={A11yColors[index % 3]}>
            <StyledInfo>
              <>
                {videoLength}
                {currentLanguage === 'sv' ? " min intervju." : " min interview."}
              </>
            </StyledInfo>
            <StyledLink href={url} target="_blank">
              {currentLanguage === 'sv' ?
                (<span>Spela <VisuallyHiddenSpan>{screenReaderExtraLinkText}</VisuallyHiddenSpan> på Youtube</span>)
                  : (<span>Play <VisuallyHiddenSpan>{screenReaderExtraLinkText}</VisuallyHiddenSpan> on Youtube</span>)
              }
              <ReactSVG src={externalLinkIcon} role="presentation" wrapper={"span"}/>
            </StyledLink>
          </ExtraInfo>
      </YoutubeCardContainer>
  )
}

const MediaElement = ({ media }: { media: Media }) => {
  return media?.gatsbyImageData ? (
    <GatsbyImage
      alt="ok"
      loading="lazy"
      image={media?.gatsbyImageData}
      imgStyle={{ height: '100%', width: '100%', objectFit: 'cover' }}
      style={{ height: '100%', width: '100%' }}      
    />
  ) : null
}

const MediaElementMultipleSrc = ({ media, mediaSmallScreen }: { media: Media, mediaSmallScreen: Media }) => {
  return  (
    <picture>
      <source media="(min-width: 768px)" srcSet={`${media?.file?.url}`} />
      <source media="(max-width: 767px)" srcSet={`${mediaSmallScreen?.file?.url}`} />
      <img src={`${media?.file?.url}`} alt="ok" />
    </picture>
  )
}

const YoutubeCardContainer = styled.div`
  height: 100%;
  max-width: 400px;
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${breakpoints.s}px) {
    min-width: 439.649px;
  }
`

const StyledMedia = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`

type ExtraInfo = {
  color: string
}

export const ExtraInfo = styled.div<ExtraInfo>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 100%;
  min-height: 2.4rem;
  transition: all 0.6s ease;
  background-color: ${(props) => {
    return `var(${props.color})`
  }};

  @media (min-width: ${breakpoints.s}px) {
    justify-content: flex-start;
  }
`

const StyledInfo = styled.span`
  flex: 1;
  padding-left: 17px;
  padding-top: 2px;
  font-size: 1.125rem;
  font-weight: 350;
  line-height: 1.5rem;
  text-decoration: none;
`

const StyledLink = styled.a`
  display: flex;
  border-radius: 60px;
  border: 2px solid #262A2E;
  background: #F5F5F5;
  margin: 0.6rem 1.125rem 0.6rem 0.5625rem;
  transition: all .17s ease-in-out;

  &:hover, &:focus {
    background-color: #252A2E;

    svg path{
      stroke: white;
    }

    > span:first-of-type {
      color: white;
      padding: .44rem 0.8rem 0.36rem 1.1rem;
      font-size: 0.9063rem;
      font-weight: 500;
    }
  }
  > span:first-of-type {
    padding: .4rem 0.8rem 0.4rem 1.1rem;
    font-size: 0.9063rem;
    font-weight: 500;
  }
  span:nth-child(2) {
    padding: .4rem 0.8rem 0.4rem .3rem;
    font-size: 0.9063rem;
    font-weight: 500;
    display: flex;
    justify-items: center;
  }
  svg {
    margin-top: 3px;
    max-width: 100px;
  }
`

export default YoutubeCard