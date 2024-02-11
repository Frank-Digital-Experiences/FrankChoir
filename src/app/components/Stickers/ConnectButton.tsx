import styled from "@emotion/styled"
import React from "react"
import {
  pulseStarOne,
  pulseStarTwo,
  pulseStarThree,
  rotateObject,
} from "../../design-system/Animations"
import peace from "../../../images/peace-connect/peace.svg"
import connect from "../../../images/peace-connect/connect.svg"
import star from "../../../images/peace-connect/star.svg"
import { VisuallyHiddenSpan } from "../../shared/StyledComponents"
import { breakpoints } from "../../shared/DeviceBreakPoints"

type ConnectButtonProps = {
  link?: string
  spinningText?: boolean
}

const ConnectButton: React.FC<ConnectButtonProps> = ({
  link = "mailto:connect@frankdigital.se",
  spinningText = true,
}) => {
  return (
    <StyledAnchor href={link}>
      <VisuallyHiddenSpan>
        Get in contact with Frank through e-mail
      </VisuallyHiddenSpan>
      <StyledPeace src={peace} alt="" role="presentation" aria-hidden="true" />
      {spinningText && false && (
        <StyledConnect
          src={connect}
          alt=""
          role="presentation"
          aria-hidden="true"
        />
      )}
      <StarOne src={star} alt="" role="presentation" aria-hidden="true" />
      <StarTwo src={star} alt="" role="presentation" aria-hidden="true" />
      <StarThree src={star} alt="" role="presentation" aria-hidden="true" />
    </StyledAnchor>
  )
}

const StyledAnchor = styled.a`
  position: absolute;
  width: 156px;
  height: 156px;
  right: max(36px, calc((100vw - 1404px) / 2));
  top: calc(100vh - 68px);
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  z-index: 5;

  @media (min-width: ${breakpoints.s}px) {
    top: calc(100vh - 90px);
    right: 0px;
  }
  @media (min-width: ${breakpoints.xl}px) {
    top: calc(90vh - 160px);
  }

  :hover {
    transform: scale(1.1);
  }
`
const StarThree = styled.img`
  position: absolute;
  width: 30px;
  right: 77px;
  bottom: 78px;
  transform: rotate(15deg);
  animation: ${pulseStarThree} 1.3s linear infinite alternate;
`
const StarTwo = styled.img`
  position: absolute;
  width: 30px;
  right: 101px;
  bottom: 51px;
  transform: rotate(-30deg);
  animation: ${pulseStarTwo} 1.7s linear infinite alternate;
`
const StarOne = styled.img`
  position: absolute;
  width: 25px;
  right: 30px;
  bottom: 32px;
  transform: rotate(30deg);
  animation: ${pulseStarOne} 2.5s linear infinite alternate;
`
const StyledConnect = styled.img`
  position: absolute;
  width: 200px;
  height: 200px;
  right: -26px;
  bottom: -26px;
  animation: ${rotateObject} 8s linear infinite;
`

const StyledPeace = styled.img`
  position: absolute;
  right: 41px;
  bottom: 25px;
`

export default ConnectButton
