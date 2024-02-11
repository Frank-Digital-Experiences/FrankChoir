import styled from '@emotion/styled'
import React from 'react'
import { VisuallyHiddenSpan } from '../../shared/StyledComponents'
import {
  pulseStarOne,
  pulseStarTwo,
  pulseStarThree,
  floatingObject,
  rotateObject,
} from '../../design-system/Animations'
import sticker_background from '../../images/join-the-fam/sticker_background.svg'
import sticker_text from '../../images/join-the-fam/text_join_the_fam.svg'
import star from '../../images/peace-connect/star.svg'

const JoinTheFamSticker: React.FC = () => {
  return (
    <FloatingAnchor href="mailto:jointhefam@frankdigital.se">
      <VisuallyHiddenSpan>
        Get in contact with Frank through e-mail
      </VisuallyHiddenSpan>
      <StickerBackground
        src={sticker_background}
        width="124"
        height="124"
        alt=""
        role="presentation"
        aria-hidden="true"
      />
      <StickerText
        src={sticker_text}
        width="124"
        height="124"
        alt="Join the fam"
        role="presentation"
        aria-hidden="true"
      />
      <StarOne src={star} alt="" role="presentation" aria-hidden="true" />
      <StarTwo src={star} alt="" role="presentation" aria-hidden="true" />
      <StarThree src={star} alt="" role="presentation" aria-hidden="true" />
    </FloatingAnchor>
  )
}

const FloatingAnchor = styled.a`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 12px;
  right: 100px;
  animation: ${floatingObject} 6s ease-in-out infinite;
  z-index: 0;
`

const StarOne = styled.img`
  position: absolute;
  width: 22px;
  right: 43px;
  bottom: -4px;
  z-index: 5;
  pointer-events: none;
  transform: rotate(45deg);
  animation: ${pulseStarOne} 1.1s linear infinite alternate;
`

const StarTwo = styled.img`
  position: absolute;
  width: 31px;
  right: -9px;
  bottom: 23px;
  z-index: 5;
  pointer-events: none;
  transform: rotate(-30deg);
  animation: ${pulseStarTwo} 1.9s linear infinite alternate;
`

const StarThree = styled.img`
  position: absolute;
  width: 15px;
  right: 55px;
  bottom: 50px;
  z-index: 5;
  pointer-events: none;
  transform: rotate(15deg);
  animation: ${pulseStarThree} 0.9s linear infinite alternate;
`

const StickerBackground = styled.img`
  position: absolute;
  width: 124px;
  animation: ${rotateObject} 14s linear infinite;
  z-index: 1;

  :hover {
    animation: ${rotateObject} 6s linear infinite;
  }
`

const StickerText = styled.img`
  position: absolute;
  pointer-events: none;
  z-index: 1;
`
export default JoinTheFamSticker
