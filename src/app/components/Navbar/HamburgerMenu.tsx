import styled from '@emotion/styled'
import React from 'react'
import { ContentfulMenu } from 'src/shared/ContentfulTypes'
import { breakpoints } from '../../shared/DeviceBreakPoints'
import { useMenu } from '../../hooks/useMenu'

type props = {
  active: boolean
  handleMenuToggler?: any
}

type MenuType = {
  contentfulMenu: ContentfulMenu
}

const HamburgerMenu: React.FC<props> = ({ active, handleMenuToggler }) => {
  const menu: MenuType = useMenu()

  return (
    <HamburgerMenuWrapper aria-hidden={!active} active={active}>
      <LinkWrapper>
        <SiteLinks>
          <StyledList>
            {menu.contentfulMenu.menuLinks.map((menuLink) => {
              return (
                <StyledListItem key={menuLink.linkName}>
                  <StyledAnchor
                    tabIndex={active ? undefined : -1}
                    key={menuLink.linkName}
                    href={`/${menuLink.slug}`}
                    onClick={handleMenuToggler}
                  >
                    {menuLink.linkName}
                  </StyledAnchor>
                </StyledListItem>
              )
            })}
          </StyledList>
        </SiteLinks>
        <StyledSocialMedia>
          <StyledList>
            {menu.contentfulMenu.socialMedia?.map((socialMedia) => {
              return (
                <StyledListItem key={socialMedia.title}>
                  <StyledAnchor
                    tabIndex={active ? undefined : -1}
                    key={socialMedia.title}
                    href={socialMedia.url}
                    target="_blank"
                  >
                    {socialMedia.title}
                  </StyledAnchor>
                </StyledListItem>
              )
            })}
          </StyledList>
        </StyledSocialMedia>
      </LinkWrapper>
    </HamburgerMenuWrapper>
  )
}

const HamburgerMenuWrapper = styled.div<props>`
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1000;
  padding: 0 var(--site-horizontal-padding);
  background-color: var(--colorWhite);
  opacity: ${(props) => (props.active ? 1 : 0)};
  top: ${(props) => (props.active ? '85px' : '-100vh')};
  transition: all 0.4s ease-in-out;
  @media (max-width: ${breakpoints.md}px) {
    flex-flow: column;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 0 var(--site-horizontal-padding-mobile);
    bottom: ${(props) => (props.active ? '0' : '200vh')};
  }
`

const LinkWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const SiteLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  font-size: clamp(2.2rem, 0.96rem + 3vw, 4rem);
`

const StyledSocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  font-size: clamp(2.2rem, 0.5rem + 3vw, 3rem);
`

const StyledList = styled.ul`
  margin-bottom: 32px;
  padding-left: 0;
  list-style: none;
`

type StyledListItemProps = {
  hideOnMobile?: boolean
}
const StyledListItem = styled.li<StyledListItemProps>`
  padding: 0.5rem 1.5rem;

  @media (max-width: ${breakpoints.md}px) {
    padding: 0;
  }

  @media (max-width: ${breakpoints.s}px) {
    display: ${(StyledListItemProps) =>
      StyledListItemProps.hideOnMobile ? 'none' : ''};
  }

  &:nth-of-type(1) {
    a {
      &:hover {
        box-shadow: inset 0 -0.125em 0 0 var(--colorWhite),
          inset 0 -0.75em 0 0 var(--primaryPink);
      }
    }
  }
  &:nth-of-type(2) {
    a {
      &:hover {
        box-shadow: inset 0 -0.125em 0 0 var(--colorWhite),
          inset 0 -0.75em 0 0 var(--primaryBlue);
      }
    }
  }
  &:nth-of-type(3) {
    a {
      &:hover {
        box-shadow: inset 0 -0.125em 0 0 var(--colorWhite),
          inset 0 -0.75em 0 0 var(--primaryRed);
      }
    }
  }
  &:nth-of-type(4) {
    a {
      &:hover {
        box-shadow: inset 0 -0.125em 0 0 var(--colorWhite),
          inset 0 -0.75em 0 0 var(--primaryGreen);
      }
    }
  }
  &:nth-of-type(5) {
    a {
      &:hover {
        box-shadow: inset 0 -0.125em 0 0 var(--colorWhite),
          inset 0 -0.75em 0 0 var(--primaryPink);
      }
    }
  }
`

const StyledAnchor = styled.a`
  padding-right: 1rem;
  padding-left: 0.5rem;

  @media (max-width: ${breakpoints.md}px) {
    padding-left: 0;
  }
`

export default HamburgerMenu
