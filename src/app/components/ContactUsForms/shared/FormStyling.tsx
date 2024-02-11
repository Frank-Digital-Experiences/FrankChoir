import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { breakpoints } from '../../../shared/DeviceBreakPoints'

export const ValidationText = styled.p`
  color: tomato;
  font-weight: bold;
  font-size: 16px;
  margin-top: 2px;
  margin-left: 6px;
`

export const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 48%;

  @media (max-width: ${breakpoints.md}px) {
    width: 100%;
  }
`

export const StyledThankYouForm = styled.form`
  position: absolute;
  flex-direction: column;
  display: flex;
  justify-content: center;
  z-index: 100;
  height: 100%;
  width: 100%;
  max-width: 26rem;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 0;
`

type StyledFormProps = {
  opacity?: boolean
}

export const StyledForm = styled.form<StyledFormProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 42rem;
  opacity: ${(StyledFormProps: StyledFormProps) =>
    StyledFormProps.opacity ? '0.25' : '1'};
  margin: 0 auto;
`

export const ThankYouFormFieldset = styled.fieldset`
  position: absolute;
  bottom: 0px;
  width: 100%;
  border: 0 none;
  margin: 0 0 1rem 0;
  padding: 0;
`

export const FormFieldset = styled.fieldset`
  width: 100%;
  border: 0 none;
  margin: 0 0 1rem 0;
  padding: 0;
`

export const FormFieldsetSubmit = styled.fieldset`
  width: 100%;
  border: 0 none;
  margin: 0 0 1rem 0;
  padding: 0;
  display: flex;

  @media (max-width: ${breakpoints.md}px) {
    justify-content: flex-end;
  }
`

export const TwoColumns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const InputWrapper = styled.div`
  position: relative;
  color: var(--color-color-oncolorwhite);

  svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export const CheckboxWrapper = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  input:focus {
    outline: 5px solid black;
}
`

export const InputLabel = styled.label`
  font-size: 1.125rem;
  line-height: 1.5;
  color: var(--color-color-oncolorblack);
  margin-bottom: -0.625rem;
  padding: 0.375rem 0.25rem 0 0.25rem;
  z-index: 1;

  @media ${breakpoints.md} {
    padding: 0.375rem 1rem 0 1rem;
  }

  &hover.is-touched {
    color: tomato;
  }
`

export const FormField = css`
  position: relative;
  appearance: none;
  width: 100%;
  color: var(--color-color-oncolorblack);
  font-family: var(--typography-frank-text-s-font-family);
  font-size: 1rem;
  line-height: 1.5;
  text-transform: none;
  border: 0 none;
  outline: none;
  margin: 0;
  min-height: 2.75rem;
  z-index: 1;

  @media ${breakpoints.md} {
    padding: 0.625rem 1rem;
  }

  &:invalid.is-touched {
    color: tomato;
    border: 2px solid tomato;
  }
`

export const InputText = styled.input`
  ${FormField};
  width: 97.5%;
  padding: 0 1.25%;
`

export const InputSelect = styled.select`
  ${FormField};
  padding-right: 2.25rem;
  background: transparent url('icon__chevron.svg') no-repeat
    calc(100% - 0.625rem) 50%;
  background-size: 1.25rem auto;

  @media ${breakpoints.md} {
    padding-right: 2.25rem;
  }
`

export const InputTextarea = styled.textarea`
  ${FormField};
  min-height: 8.75rem;
  resize: none;
  width: 97.5%;
  padding: 1.25% 1.25%;
`

export const InputCheckbox = styled.input`
  flex: 0 0 1.75rem;
  margin: auto 0;
  margin-right: 0.75rem;
  margin-left: 0.1875rem;
  padding: 0;
  width: 1.75rem;
  height: 1.75rem;
  background: transparent;
  border: 3px solid var(--color-color-oncolorblack);
  border-radius: 0;
  outline: none;

  &:focus,
  &:hover {
    background: linear-gradient(
        var(--color-color-oncolorwhite),
        var(--color-color-oncolorwhite)
      )
      no-repeat 0.375rem 0.375rem/0.875rem 0.875rem;
  }

  &:checked {
    background: linear-gradient(
        var(--color-color-oncolorblack),
        var(--color-color-oncolorblack)
      )
      no-repeat 0.25rem 0.25rem/1.125rem 1.125rem;
  }
`

export const CheckboxLabel = styled.div`
  flex: 0 0 calc(100% - 2.5rem);
  font-size: 1.125rem;
  margin: auto 0;
`

export const SubmitButton = styled.button`
  all: unset;
  margin-top: 2rem;
  font-size: clamp(1.625rem, 0.5rem + 3vw, 3.5rem);
  text-decoration: underline;
  padding-bottom: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  
  &:hover {
    box-shadow: inset 0 -0.125em 0 0 var(--colorGrey),
      inset 0 -0.75em 0 0 var(--primaryPink);
  }

  &:focus {
    box-shadow: inset 0 -0.125em 0 0 var(--colorGrey),
      inset 0 -0.75em 0 0 var(--primaryPink);
    border: 2px solid black;
  }
`

export const ThankYouHeader = styled.h3`
  text-align: center;
  margin-bottom: 2px;
  margin-top: 25%;
`
export const ThankYouText = styled.p`
  text-align: center;
  margin-bottom: 55%;
`

export const VisuallyHiddenLabel = styled.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

export const Disclaimer = styled.p`
  ${FormField};
`
