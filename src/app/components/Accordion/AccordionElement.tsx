import React from "react"
import styled from "@emotion/styled"
import arrow from "../../../images/arrow.svg"

const StyledDiv = styled.div`
  grid-column: span 12;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

const StyledTopSection = styled.div`
  grid-column: span 12;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 4px;
`

const StyledHeading = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 50px;
`

const StyledBottomSection = styled.div`
  padding: 16px 0;
  grid-column: span 8;

  font-family: Whyte Inktrap Regular;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;

  animation: 0.5s linear 1s infinite alternate slidein;
`

type Props = {
  expanded: boolean
  onClick: () => void
  title: string
  content: string
}

const AccordionItem: React.FC<Props> = (props) => {
  const { expanded, onClick, title, content } = props
  return (
    <StyledDiv>
      <StyledTopSection onClick={onClick}>
        <StyledHeading className="accordion-title">{title}</StyledHeading>
        <img
          style={
            expanded
              ? { transform: "rotate(-45deg)" }
              : { transform: "rotate(0deg)" }
          }
          src={arrow}
        />
      </StyledTopSection>
      {expanded && <StyledBottomSection>{content}</StyledBottomSection>}
    </StyledDiv>
  )
}

export default AccordionItem
