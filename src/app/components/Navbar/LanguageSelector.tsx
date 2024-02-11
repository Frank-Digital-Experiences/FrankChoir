import styled from '@emotion/styled'
import React from 'react'
import { breakpoints } from '../../shared/DeviceBreakPoints'
import flagSV from '../../images/sv-flag.svg'
import flagEN from '../../images/en-flag.svg'
import { ReactSVG } from 'react-svg'
import { navigate } from 'gatsby';
import { useAppContext } from '../../app-context'

type props = {
  showLanguageSelector: boolean
}

const handleClick = (currentLanguage: string) => {
  if (currentLanguage === 'sv') {
    navigate('/accessibility');
  } else
    navigate('/tillganglighet');
};

const LanguageSelector: React.FC<props> = ({ showLanguageSelector }) => {
  const { currentLanguage } = useAppContext();
  if (!showLanguageSelector) {
    return null
  }

  if (currentLanguage === 'sv') {
    return (
      <LanguageSelectorWrapper>
        {<MyStyledButton type="button" onClick={() => handleClick(currentLanguage)}><span lang="en">Change to English</span> <ReactSVG role="presentation" src={flagEN} wrapper={"svg"}/></MyStyledButton>}
      </LanguageSelectorWrapper>
    )
  } else {
    return (
      <LanguageSelectorWrapper>
        {<MyStyledButton type="button" onClick={() => handleClick(currentLanguage)}><span lang="sv">Byt till svenska</span> <ReactSVG role="presentation" src={flagSV} wrapper={"svg"}/></MyStyledButton>}
      </LanguageSelectorWrapper>
    )
  }
}

const LanguageSelectorWrapper = styled.div`
  align-self: center;
  margin-left: auto;
  margin-right: 2.4rem;

  @media (max-width: ${breakpoints.md}px) {
    margin-right: .5rem;
  }
`
const MyStyledButton = styled.button`
  text-align: center;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 500;
  border-radius: 60px;
  border: 3px solid #262A2E;
  background-color: #F5F5F5;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  @media (max-width: ${breakpoints.md}px) {
    padding: 3px;
    font-size: 1rem;
  }

  &:hover, &:focus {
    background-color: #252A2E;
    svg path{
      stroke: white;
    }
    > span:first-of-type {
      color: white;
      font-weight: 500;
    }
  }
  span {
    margin-top: -2px;
    padding-left: 1.6rem;
    padding-right: 1rem;
  
    @media (max-width: ${breakpoints.md}px) {
      padding-left: 0.7rem;
      padding-right: 0.7rem;
    }
  }
  svg {
    width: 2rem;
    height: 2.0625rem;
  }
`

export default LanguageSelector
