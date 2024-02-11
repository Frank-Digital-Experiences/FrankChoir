import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import FocusTrap from 'focus-trap-react'
import frankLogo from '../../images/frank_logo.svg'
import Hamburger from './HamburgerMenu'
import LanguageSelector from './LanguageSelector'
import { breakpoints } from '../../shared/DeviceBreakPoints'
import { useScrollPosition } from '../../hooks/useScroll'
import { VisuallyHiddenSpan } from '../../shared/StyledComponents'
import { useAppContext } from '../../app-context'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const scrollDirection = useScrollPosition()

  const HandleMenuToggler = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
  }

  const { showLanguageSelector } = useAppContext();

  useEffect(() => {
    const documentBody = document.getElementsByTagName('body')[0]
    if (documentBody) {
      documentBody.style.overflow =
        isMenuOpen && window.innerWidth < breakpoints.s ? 'hidden' : 'visible'
    }
  }, [isMenuOpen])

  useEffect(() => {
    setShowNavbar(scrollDirection.direction === 'up' || scrollDirection.y < 100)
  }, [scrollDirection.direction, scrollDirection.y])

  return (
    <WidthWrapper active={isMenuOpen} showNavBar={showNavbar}>
      <StyledHeader>
        <a href="/">
          <StyledImg src={frankLogo} alt="Frank fam." />
        </a>

        {!isMenuOpen && <LanguageSelector showLanguageSelector={showLanguageSelector}></LanguageSelector>}

        <FocusTrap
          active={isMenuOpen}
          focusTrapOptions={{ onDeactivate: () => setIsMenuOpen(false) }}
        >
          <FocusWrapper>
            <StyledHamburgerWrapper
              type="button"
              onClick={HandleMenuToggler}
              active={isMenuOpen}
            >
              <VisuallyHiddenSpan>
                {isMenuOpen ? 'Close menu' : 'Open menu'}
              </VisuallyHiddenSpan>
              <HamburgerOne active={isMenuOpen} className={'hamburger'} />
              <HamburgerTwo active={isMenuOpen} className={'hamburger'} />
              <HamburgerThree active={isMenuOpen} className={'hamburger'} />
            </StyledHamburgerWrapper>
            <Hamburger
              active={isMenuOpen}
              handleMenuToggler={HandleMenuToggler}
            />
          </FocusWrapper>
        </FocusTrap>
      </StyledHeader>
    </WidthWrapper>
  )
}
type Props = {
  active: boolean
  showNavBar?: boolean
}

const FocusWrapper = styled.div`
  display: flex;
  align-items: center;
`

const WidthWrapper = styled.nav<Props>`
  display: flex;
  position: fixed;
  top: ${(props) => (props.showNavBar || props.active ? '0px' : '-115px')};
  width: 100vw;
  z-index: 100;
  background-color: var(--colorWhite);
  transition: top 0.3s;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background-color: var(--colorWhite);
  padding: 15px var(--site-horizontal-padding);

  @media (max-width: ${breakpoints.s}px) {
    position: absolute;
    width: auto;
    left: 0;
    right: 0;
    z-index: 2000;
    padding: 12px var(--site-horizontal-padding-mobile);
  }
`

const StyledImg = styled.img`
  height: 60px;
  justify-self: center;
  align-self: center;
`

const HamburgerOne = styled.div<Props>`
  transform: ${(props) => props.active && 'rotate(45deg)'};
`

const HamburgerTwo = styled.div<Props>`
  opacity: ${(props) => props.active && '0'};
`

const HamburgerThree = styled.div<Props>`
  transform: ${(props) => props.active && 'rotate(-45deg)'};
`

const StyledHamburgerWrapper = styled.button<Props>`
  grid-column-start: 12;
  align-self: center;
  background: none;
  border: 0;
  padding: 0.75rem 0;
  .hamburger {
    width: 25px;
    height: 5px;
    background-color: var(--colorBlack);
    margin: 2px 10px;
    transform-origin: 2px;
    transition: 0.25s ease-in-out;
  }
`

export default Header
