import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react'

import ReactPlayer from 'react-player/lazy'
import { breakpoints } from '../shared/DeviceBreakPoints'
import { StudioColors } from '../shared/Colors'
import { ContentfulRichText, Media } from '../shared/ContentfulTypes'
import Modal from './Modal'
import { isSVGImage } from '../utils/utils'

type Data = {
  media: Media
  mediaSmallScreen?: Media
  switchToSmallScreenImage?: boolean
  mediaLink?: string
  heading: string
  overlay: ContentfulRichText
  showBackgroundOnCard?: boolean
  extraInformation?: string
}
export type CardProps = {
  data: Data
  index: number
}

const Card: React.FC<CardProps> = ({ data, index }) => {
  const { media, mediaSmallScreen, switchToSmallScreenImage, mediaLink, heading, overlay, extraInformation, showBackgroundOnCard } = data
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false)
  const hasMediaModal = !!mediaLink

  const isSvg = media.file?.url ? isSVGImage(media.file?.url) : false;

  return (
    <>
      <Wrapper>
        {heading && <h2>{heading}</h2>}
        <MediaWrapper
          opensModal={hasMediaModal}
          setIsMediaModalOpen={setIsMediaModalOpen}
        >
          <CardWrapper switchToSmallScreenImage={switchToSmallScreenImage} showBackgroundOnCard={showBackgroundOnCard}>
            
            {mediaSmallScreen?.gatsbyImageData ? (
                <MediaElementMultipleSrc  media={media} mediaSmallScreen={mediaSmallScreen} />
              ) : (
                <MediaElement media={media} isSvg={isSvg} />
              )}

            {(overlay || extraInformation) && (
              <Overlay color={StudioColors[index % 3]}>
                {renderRichText(overlay)}
                <Credit hasOverlay={!!overlay}>{extraInformation}</Credit>
              </Overlay>
            )}
          </CardWrapper>
        </MediaWrapper>
      </Wrapper>
      {hasMediaModal && (
        <Modal
          isOpen={isMediaModalOpen}
          onClose={() => {
            setIsMediaModalOpen(false)
          }}
        >
          <ReactPlayer
            playsinline
            controls={true}
            config={{ file: { forceVideo: true } }}
            volume={0.3}
            width="calc(100% - 2rem)"
            height="calc(100% - 3rem)"
            url={mediaLink}
            style={{ margin: '0 auto' }}
          />
        </Modal>
      )}
    </>
  )
}

const MediaWrapper = ({
  children,
  opensModal,
  setIsMediaModalOpen,
}: PropsWithChildren<{
  opensModal: boolean
  setIsMediaModalOpen: Dispatch<SetStateAction<boolean>>
}>) => {
  return opensModal ? (
    <Button
      onClick={() => {
        setIsMediaModalOpen(true)
      }}
    >
      {children}
    </Button>
  ) : (
    <div>{children}</div>
  )
}

const MediaElement = ({ media, isSvg }: { media: Media, isSvg: boolean }) => {
  return media?.gatsbyImageData ? (
    <GatsbyImage
      alt="ok"
      loading="lazy"
      image={media?.gatsbyImageData}
      imgStyle={{ height: '100%', width: '100%', objectFit: 'cover' }}
      style={{ height: '100%', width: '100%' }}      
    />
  ) : (
    isSvg ? (
      <img className="svg-image" src={`${media?.file?.url}`} alt={`${media?.title}`} />
    ): (
      <ReactPlayer
        playsinline
        playing
        volume={0}
        muted
        loop={true}
        width="100%"
        height="100%"
        url={`${media?.file?.url}`}
        style={{ width: '100%', height: '100%' }}
      />
    )
  )
}

const MediaElementMultipleSrc = ({ media, mediaSmallScreen }: { media: Media, mediaSmallScreen: Media }) => {
  return  (
    <picture>
      <source media="(min-width: 768px)" srcSet={`${media?.file?.url}`} />
      <source media="(max-width: 767px)" srcSet={`${mediaSmallScreen?.file?.url}`} />
      <img src={`${media?.file?.url}`} alt={`${media?.title}`} />
    </picture>
  )
}

const Wrapper = styled.div`
  h2 {
    font-weight: 350;
    margin-bottom: 1rem;
  }
`
const Button = styled.button`
  display: block;
  width: 100%;
  background-color: transparent;
  border: 0;
  padding: 0;
`
type CreditProps = {
  hasOverlay?: boolean
}
const Credit = styled.span<CreditProps>`
  flex: 0 0 100%;
  text-align: left;
  margin-top: ${(props) => (props.hasOverlay ? '-1.75rem' : undefined)};
  display: none;
  padding: 0.5rem 0;
  font-size: 1rem;
`
type OverlayProps = {
  color: string
}

export const Overlay = styled.div<OverlayProps>`
  display: flex;
  margin: 0;
  padding-left: 1.3rem;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  background-color: ${(props) => {
    return `var(${props.color})`
  }};
  @media (min-width: ${breakpoints.s}px) {
    justify-content: flex-start;
  }
`

type CardWrapperProps = {
  switchToSmallScreenImage?: boolean
  showBackgroundOnCard?: boolean
}
const CardWrapper = styled.div <CardWrapperProps>`
  height: 100%;
  min-width: 100%;
  height: ${(props) => (props.switchToSmallScreenImage ? 'auto' : '28.3rem')};
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.showBackgroundOnCard &&
    `
    height: 22rem;
    background: linear-gradient(180deg, #0A392E 0%, rgba(56, 115, 101, 0.51) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
 `}

  .svg-image {
    max-width: 50%;
    margin-top: -14%;
  }

  img {
    width: ${(props) => (props.switchToSmallScreenImage ? '100%' : 'auto')};
  }

  &:hover ${Credit} {
    display: block;
  }
  video {
    object-fit: cover;
  }
`

export default Card
