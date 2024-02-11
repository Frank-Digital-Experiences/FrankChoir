import React from 'react'
import styled from '@emotion/styled'
import { SocialMedia } from 'src/shared/ContentfulTypes'

type SocialMediaListProps = {
  socialMedia: SocialMedia[]
}

// This is not in use Remove or use it in hamburger menu...
const SocialMediaList: React.FC<SocialMediaListProps> = ({ socialMedia }) => {
  return (
    <StyledSocialMedia>
      {socialMedia?.map((socialMedia) => {
        return (
          <StyledListItem key={`${socialMedia.title}-li`}>
            <StyledAnchor
              key={`${socialMedia.title}-SoMe`}
              href={socialMedia.url}
              target="_blank"
            >
              {socialMedia.title}
            </StyledAnchor>
          </StyledListItem>
        )
      })}
    </StyledSocialMedia>
  )
}

const StyledSocialMedia = styled.ul`
  padding-left: 0;
  margin: 82px 0;
  list-style: none;
  font-size: clamp(1.625rem, 0.5rem + 3vw, 3.5rem);
`

const StyledListItem = styled.li`
  padding: 0.5rem 0rem;

  &:nth-of-type(1) {
    a {
      &:hover {
        box-shadow: inset 0 -0.125em 0 0 var(--colorGrey),
          inset 0 -0.75em 0 0 var(--primaryPink);
      }
    }
  }
  &:nth-of-type(2) {
    a {
      &:hover {
        box-shadow: inset 0 -0.125em 0 0 var(--colorGrey),
          inset 0 -0.75em 0 0 var(--primaryBlue);
      }
    }
  }
  &:nth-of-type(3) {
    a {
      &:hover {
        box-shadow: inset 0 -0.125em 0 0 var(--colorGrey),
          inset 0 -0.75em 0 0 var(--primaryRed);
      }
    }
  }
  &:nth-of-type(4) {
    a {
      &:hover {
        box-shadow: inset 0 -0.125em 0 0 var(--colorGrey),
          inset 0 -0.75em 0 0 var(--primaryGreen);
      }
    }
  }
  &:nth-of-type(5) {
    a {
      &:hover {
        box-shadow: inset 0 -0.125em 0 0 var(--colorGrey),
          inset 0 -0.75em 0 0 var(--primaryPink);
      }
    }
  }
`

const StyledAnchor = styled.a`
  padding-right: 1rem;
`
export default SocialMediaList
