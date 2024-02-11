import styled from '@emotion/styled'
import { breakpoints } from './DeviceBreakPoints'

// Best practice is to start page with a h1
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
// Pages like Cases skipping the hero should start their page with a h1 styled as the h2s...
export const StyledSectionWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--site-horizontal-padding);

  @media (max-width: ${breakpoints.s}px) {
    padding: 0 var(--site-horizontal-padding-mobile);
  }
`
export const StyledFullwidthSectionWrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: var(--primaryPink);
  padding-bottom: 2.125rem;
`

type StyledInnerGridWrapperProps = {
  singleColumn?: boolean
}
export const StyledInnerGridWrapper = styled.div<StyledInnerGridWrapperProps>`
  max-width: 74.8rem;
  position: relative;

  ${(StyledInnerGridWrapperProps) =>
    StyledInnerGridWrapperProps.singleColumn &&
    `max-width: 52.8rem;`}
  margin: 0 auto;
`

export const SmallParagraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.1375rem;
  margin: 0;
`
export const StyledHeading = styled.h1`
  font-size: 3.5rem;
  font-size: clamp(1rem, 0.2857142857142858rem + 3.571428571428571vw, 3.5rem);
  font-weight: 400;
  line-height: 4.5rem;

  @media (max-width: ${breakpoints.md}px) {
    font-size: 1.5rem;
    line-height: 2.25rem;
  }
`

export const StyledBigH2 = styled.h2`
  font-size: clamp(1.5rem, 0.94rem + 2vw, 3.5rem);
  line-height: 1.275em;
  font-weight: 350;
`

export const StyledH2 = styled.h2`
  font-size: 2.25rem;
  font-weight: 350;
  margin-bottom: 1.125rem;

  @media (max-width: ${breakpoints.s}px) {
    font-size: 1.5rem;
  }
`

export const StyledH2Small = styled.h2`
  font-size: 1.125rem;
  font-weight: 350;
`

export const StyledCaseHeader = styled.h3`
  font-size: 2.25rem;
  text-decoration: underline;
  font-weight: 350;
  margin-bottom: 1.25rem;

  @media (max-width: ${breakpoints.s}px) {
    font-size: 1.25rem;
  }
`

export const StyledH3Underline = styled.h3`
  font-size: 1.375rem;
  line-height: 1.7em;
  font-weight: 350;
  text-decoration: underline;
  margin-bottom: 2.125rem;
`

export const StyledH3Small = styled.h3`
  font-size: 1.125rem;
  font-weight: 350;
`

export const HugeParagraph = styled.p`
  font-size: clamp(1rem, 0.94rem + 2vw, 3.5rem);
  line-height: 1.275em;
  font-weight: 400;
`

export const StyledParagraph = styled.p`
  font-size: 1.375rem;
  line-height: 1.675em;
  margin: 10px 0;
`

type HighlightProps = {
  color: 'Red' | 'Blue' | 'Black' | 'Pink'
}
const highlightColors = {
  Red: '--primaryRed',
  Blue: '--primaryBlue',
  Black: '--highlight-color',
  Pink: '--primaryPink',
}
export const Highlight = styled.span<HighlightProps>`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 55%;
    width: 104%;
    background: inherit;
    z-index: -2;
    margin-top: 1.1rem;
    margin-left: 0.3rem;

    background: ${(props) => {
      return `var(${highlightColors[props.color]})`
    }};
  }
`

export const SpanBlackBackground = styled.span`
  font-family: 'Zilla Slab Highlight';
`

export const VisuallyHiddenSpan = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

type BorderProps = {
  marginBottom?: string
}

export const Border = styled.div<BorderProps>`
  border-top: 3px solid var(--colorBlack);
  margin-bottom: 20px;
  margin-bottom: ${(BorderProps) => BorderProps.marginBottom};
`
