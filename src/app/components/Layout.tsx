import * as React from 'react'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'
import { whyteInktrap, zillaSlab } from '../fonts'
import Footer from './Footer'
import Header from './Navbar/Header'
import Seo from './Seo'
import { PageWrapperStandard } from '../shared/ContentfulTypes'
import { breakpoints } from '../shared/DeviceBreakPoints'
import { useAppContext } from '../app-context';

const Layout: React.FC<PageWrapperStandard> = ({
  children,
  seo,
  showNavbar,
  showFooter,
}) => {
  const { currentLanguage } = useAppContext();

  return (
    <>
      <Seo
        language={currentLanguage}
        title={seo.seoTitle}
        description={seo.seoDescription}
        slug={seo.slug ? seo.slug : ''}
        image={seo.seoImage ? seo.seoImage : ''}
      />
      <Global styles={globalStyles} />
      {showNavbar && <Header />}
      <Main showNavBar={showNavbar}>{children}</Main>
      {showFooter && <Footer />}
    </>
  )
}

type PageWrapperProps = {
  showNavBar?: boolean
}

const Main = styled.main<PageWrapperProps>`
  padding-top: ${(props) =>
    props.showNavBar ? 'var(--header-height)' : undefined};
  @media (max-width: ${breakpoints.s}px) {
    padding-top: ${(props) =>
      props.showNavBar ? 'var(--header-height-mobile)' : undefined};
  }
`
export const globalStyles = css`
  ${whyteInktrap}
  ${zillaSlab}
  :root {
    --highlight-color: #252a2e;
    --colorBlack: #252a2e;
    --colorGrey: #f2f2f2;
    --colorWhite: #ffffff;
    --colorWhiteShade: #F5F5F5;
    --primaryRed: #fc4747;
    --primaryGreen: #d9ff43;
    --primaryPink: #f6ddff;
    --primaryBlue: #bcc1ff;
    --xs: ${breakpoints.xs};
    --md: ${breakpoints.md};
    --l: ${breakpoints.l};
    --xl: ${breakpoints.xl};

    --header-height: 97px;
    --header-height-mobile: 91px;
    --hamburger-menu-height: 70vh;
    --site-horizontal-padding: 36px;
    --site-horizontal-padding-mobile: 16px;
  }
  html {
    scroll-padding-top: 140px;
    scroll-behavior: smooth;

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
        scroll-behavior: auto !important;
      }
    }
  }

  body {
    font-family: 'Whyte Inktrap Regular';
    margin: 0px;
    overflow-x: hidden;
    background: var(--colorGrey);
    //cursor: url(${cursor}) 10 10, auto;
  }

  * {
    font-family: 'Whyte Inktrap Regular';
    color: var(--colorBlack);
  }

  .carousel .control-dots {
    display: flex;
    justify-content: center;
  }

  .carousel .control-dots span:hover {
    //cursor: url(${pointer});
  }

  h1, h2, h3 {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: never;
  }

  h1 {
    font-size: 3.5rem;
    line-height: 1.8;

    @media (max-width: ${breakpoints.md}px) {
      font-size: 2rem;
      line-height: 1.6;
    }
  }

  h2 {
    font-size: 2.6rem;
    line-height: 3.75rem;

    @media (max-width: ${breakpoints.md}px) {
      font-size: 2rem;
      line-height: 1.4;
    }
  }
  h3 {
    font-size: 2.35rem;
    line-height: 1.6;
    font-weight: 350;

    @media (max-width: ${breakpoints.md}px) {
      font-size: 1.65rem;
      line-height: 1.4;
    }
  }
  h4 {
    font-size: 2.35rem;
    line-height: 1.6;
    
    @media (max-width: ${breakpoints.md}px) {
      font-size: 1.65rem;
      line-height: 1.4;
    }
  }
  h5 {
    font-size: 1.125rem;
    line-height: 2.25rem;
    @media (max-width: ${breakpoints.md}px) {
      font-size: 1.625rem;
    }
  }
  h6 {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  p {
    font-size: 1.625rem;
    font-weight: 350;

    @media (max-width: ${breakpoints.md}px) {
      font-size: 1.125rem;
    }
  }
  a,
  button {
    //cursor: url(${pointer}) 1 1, pointer;
  }
`

export default Layout
