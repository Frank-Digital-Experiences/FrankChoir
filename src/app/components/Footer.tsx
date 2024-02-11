import React from "react"
import styled from "@emotion/styled"
import { useFooter } from "../hooks/useFooter"
// import frank_logo from "../../images/frank_logo.svg"
import { breakpoints } from "../shared/DeviceBreakPoints"

type MenuLink = {
  title: string
  linkName: string
  slug: string
}

const Footer: React.FC = () => {
  const footerData = useFooter()

  const {
    bottomMenu: [menuLinks],
  } = footerData.contentfulSectionFooter

  return (
    <StyledSection id="connect">
      <BottomMenu>
        <FrankLogoAnchor href="/">
          <img src={frank_logo} alt="frank_logo" />
        </FrankLogoAnchor>
        <MenuLinks>
          {menuLinks.menuLinks.map((menuLink: MenuLink) => {
            return (
              <StyledAnchor key={menuLink.linkName} href={`/${menuLink.slug}`}>
                {menuLink.linkName}
              </StyledAnchor>
            )
          })}
        </MenuLinks>
        <CopyRight>© {new Date().getFullYear()}</CopyRight>
      </BottomMenu>
    </StyledSection>
  )
}

const StyledSection = styled.footer`
  max-width: 1440px;
  margin: 160px auto 50px;
  padding: 0 var(--site-horizontal-padding);

  @media (max-width: ${breakpoints.s}px) {
    padding: 0 var(--site-horizontal-padding-mobile);
  }
`
const BottomMenu = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.md}px) {
    margin-bottom: 30px;
  }
`

const FrankLogoAnchor = styled.a`
  width: 60px;
  height: 60px;
`

const MenuLinks = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: ${breakpoints.md}px) {
    width: 60%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 0px;
    text-align: center;
  }

  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`

const StyledAnchor = styled.a`
  font-size: 1rem;
  height: 60px;
  width: 6rem;
  text-decoration: underline;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    font-family: "Zilla Slab Highlight";
  }
`

const CopyRight = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Footer
