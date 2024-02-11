import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

import ReactPlayer from 'react-player/lazy'
import { StudioColors } from '../shared/Colors'
import { Media } from '../shared/ContentfulTypes'
import { SmallParagraph } from '../shared/StyledComponents'

type Data = {
  media: Media
  name: string
  description: string
}
export type EmployeeProps = {
  data: Data
  index: number
  __typename: string
}

const Employee: React.FC<EmployeeProps> = ({ data, index }) => {
  const { media, name, description } = data

  return (
    <div>
      <h5>{name}</h5>
      <Card>
        {media?.gatsbyImageData ? (
          <GatsbyImage
            alt="ok"
            loading="lazy"
            image={media?.gatsbyImageData}
            imgStyle={{ height: '100%', width: '100%', objectFit: 'cover' }}
            style={{ height: '100%', width: '100%' }}
          />
        ) : (
          <ReactPlayer
            playsinline
            playing
            volume={0}
            muted
            loop={true}
            width="100%"
            height="100%"
            url={`${media.file?.url}`}
            style={{ width: '100%', height: '100%' }}
          />
        )}
        <Overlay color={StudioColors[index % 3]}>
          <SmallParagraph>{description}</SmallParagraph>
        </Overlay>
      </Card>
    </div>
  )
}
const Card = styled.div`
  height: 100%;
  height: 28.3rem;
  position: relative;
  overflow: hidden;
  video {
    object-fit: cover;
  }
`

type OverlayProps = {
  color: string
}

export const Overlay = styled.div<OverlayProps>`
  position: absolute;
  bottom: 0;
  background-color: ${(props) => `var(${props.color})`};
  margin: 0;
  width: 100%;
  height: 3.3rem;
  display: flex;
  align-items: center;
  padding-left: 1.3rem;
`
export default Employee
