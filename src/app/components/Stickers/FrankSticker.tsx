import styled from "@emotion/styled"
import React from "react"
import { floatingObject } from "../../design-system/Animations"
import sticker_logo from "../../../images/sticker_frank_glitter.svg"
import star from "../../../images/peace-connect/star.svg"
import { breakpoints } from "../../shared/DeviceBreakPoints"

const FrankSticker: React.FC = () => {
  return (
    <FloatingDiv role="presentation" aria-hidden="true">
      <FrankLogo src={sticker_logo} alt="" />
      <StarOne src={star} alt="" />
      <StarTwo src={star} alt="" />
      <StarThree src={star} alt="" />
      <StarFour src={star} alt="" />
      <StarFive src={star} alt="" />
      <StarSix src={star} alt="" />
    </FloatingDiv>
  )
}

const logoWidth = 304
const mobileLogoFactor = 0.57

const starConfig = {
  starOne: {
    width: 12,
    right: 72,
    bottom: 8,
  },
  starTwo: {
    width: 8,
    right: 223,
    bottom: 83,
  },
  starThree: {
    width: 14,
    right: 120,
    bottom: 80,
  },
  starFour: {
    width: 3,
    right: 280,
    bottom: 60,
  },
  starFive: {
    width: 3,
    right: 0,
    bottom: 72,
  },
  starSix: {
    width: 6,
    right: 293,
    bottom: 128,
  },
} as const

const FrankLogo = styled.img`
  transition: all 0.2s ease-in-out;
  width: ${logoWidth}px;

  @media (max-width: ${breakpoints.md}px) {
    width: ${logoWidth * mobileLogoFactor}px;
  }
`

const FloatingDiv = styled.div`
  position: absolute;
  top: -13%;
  right: 10%;
  width: ${logoWidth}px;
  animation: ${floatingObject} 6s ease-in-out infinite;
  z-index: 10;

  &:hover > ${FrankLogo} {
    transform: scale(1.1);
  }
  @media (max-width: ${breakpoints.l}px) {
    top: -20%;
  }

  @media (max-width: ${breakpoints.md}px) {
    top: -9%;
    right: 0%;

    width: ${logoWidth * mobileLogoFactor}px;
  }
`

const StarOne = styled.img`
  position: absolute;
  width: ${starConfig.starOne.width}px;
  right: ${starConfig.starOne.right}px;
  bottom: ${starConfig.starOne.bottom}px;
  transition: all 0.32s ease-in-out;
  transform: rotate(210deg);

  ${FloatingDiv}:hover & {
    transform: scale(4.5);
  }

  @media (max-width: ${breakpoints.md}px) {
    width: ${starConfig.starOne.width * mobileLogoFactor}px;
    right: ${starConfig.starOne.right * mobileLogoFactor}px;
    bottom: ${starConfig.starOne.bottom * mobileLogoFactor}px;
  }
`

const StarTwo = styled.img`
  position: absolute;
  width: ${starConfig.starTwo.width}px;
  right: ${starConfig.starTwo.right}px;
  bottom: ${starConfig.starTwo.bottom}px;
  transform: rotate(340deg);
  transition: all 0.2s ease-in-out;

  ${FloatingDiv}:hover & {
    transform: scale(4.5);
  }

  @media (max-width: ${breakpoints.md}px) {
    width: ${starConfig.starTwo.width * mobileLogoFactor}px;
    right: ${starConfig.starTwo.right * mobileLogoFactor}px;
    bottom: ${starConfig.starTwo.bottom * mobileLogoFactor}px;
  }
`

const StarThree = styled.img`
  position: absolute;
  width: ${starConfig.starThree.width}px;
  right: ${starConfig.starThree.right}px;
  bottom: ${starConfig.starThree.bottom}px;
  transform: rotate(-115deg);
  transition: all 0.25s ease-in-out;

  ${FloatingDiv}:hover & {
    transform: scale(3);
  }

  @media (max-width: ${breakpoints.md}px) {
    width: ${starConfig.starThree.width * mobileLogoFactor}px;
    right: ${starConfig.starThree.right * mobileLogoFactor}px;
    bottom: ${starConfig.starThree.bottom * mobileLogoFactor}px;
  }
`

const StarFour = styled.img`
  position: absolute;
  width: ${starConfig.starFour.width}px;
  right: ${starConfig.starFour.right}px;
  bottom: ${starConfig.starFour.bottom}px;
  transform: rotate(180deg);
  transition: all 0.2s ease-in-out;

  ${FloatingDiv}:hover & {
    transform: scale(15);
  }

  @media (max-width: ${breakpoints.md}px) {
    width: ${starConfig.starFour.width * mobileLogoFactor}px;
    right: ${starConfig.starFour.right * mobileLogoFactor}px;
    bottom: ${starConfig.starFour.bottom * mobileLogoFactor}px;
  }
`

const StarFive = styled.img`
  position: absolute;
  width: ${starConfig.starFive.width}px;
  right: ${starConfig.starFive.right}px;
  bottom: ${starConfig.starFive.bottom}px;
  transform: rotate(-180deg);
  transition: all 0.3s ease-in-out;

  ${FloatingDiv}:hover & {
    transform: scale(15);
  }

  @media (max-width: ${breakpoints.md}px) {
    width: ${starConfig.starFive.width * mobileLogoFactor}px;
    right: ${starConfig.starFive.right * mobileLogoFactor}px;
    bottom: ${starConfig.starFive.bottom * mobileLogoFactor}px;
  }
`

const StarSix = styled.img`
  position: absolute;
  width: ${starConfig.starSix.width}px;
  right: ${starConfig.starSix.right}px;
  bottom: ${starConfig.starSix.bottom}px;
  transform: rotate(-270deg);
  transition: all 0.4s ease-in-out;

  ${FloatingDiv}:hover & {
    transform: scale(8);
  }

  @media (max-width: ${breakpoints.md}px) {
    width: ${starConfig.starSix.width * mobileLogoFactor}px;
    right: ${starConfig.starSix.right * mobileLogoFactor}px;
    bottom: ${starConfig.starSix.bottom * mobileLogoFactor}px;
  }
`
export default FrankSticker
