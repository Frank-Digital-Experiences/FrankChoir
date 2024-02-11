import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"

import arrow from "../../images/master-arrow.svg"

type ButtonProps = {
  text: string
  to: string
}

const Button: React.FC<ButtonProps> = ({ text, to }) => {
  return (
    <StyledButton to={to}>
      {text}
      {/* <GatsbyImage alt="arrow" image={arrow}></GatsbyImage> */}
      <Arrow>
        <img src={arrow}></img>
      </Arrow>
    </StyledButton>
  )
}

const StyledButton = styled(Link)`
  color: white;
  background-color: var(--colorBlack);

  color: var(--colorWhite);
  padding: 0.5rem 1.5rem;
  border-radius: 60px;
  text-decoration: none;
  font-size: 1.375rem;
  display: flex;
  align-items: center;
`

const Arrow = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  margin-left: 1.5rem;
  transform: rotate(-35deg);
  img {
    filter: invert(100%) sepia(0%) saturate(2%) hue-rotate(190deg)
      brightness(105%) contrast(101%);
  }
`
export default Button
