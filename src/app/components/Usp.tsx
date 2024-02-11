import styled from '@emotion/styled'
import React from 'react'
import { ColorMapType, StudioColors } from '../shared/Colors'
import { ContentfulRichText } from '../shared/ContentfulTypes'

export type UspProps = {
  heading: string
  description: ContentfulRichText
  index: number
}
const Usp: React.FC<UspProps> = ({ heading, description, index }) => {
  return <StyledUsp color={StudioColors[(index + 1) % 3]}>{heading}</StyledUsp>
}

const StyledUsp = styled.div<ColorMapType>`
  border-radius: 60px;
  padding: 0.5rem 2rem;
  background-color: ${(props) => `var(${props.color})`};
`
export default Usp
