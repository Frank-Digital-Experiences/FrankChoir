import React, { useEffect, useState } from 'react'

import {
  CheckboxLabel,
  CheckboxWrapper,
  Disclaimer,
  FormContainer,
  FormFieldset,
  FormFieldsetSubmit,
  InputCheckbox,
  InputLabel,
  InputText,
  InputTextarea,
  InputWrapper,
  StyledForm,
  StyledThankYouForm,
  SubmitButton,
  ThankYouFormFieldset,
  ThankYouHeader,
  ThankYouText,
  ValidationText,
} from './shared/FormStyling'
import { useAppContext } from '../../app-context'

type FormValidation = {
  name: boolean | null
  email: boolean | null
  company: boolean | null
  message: boolean | null
  allowedContact: boolean | null
}

export const ContactUsForm = () => {
  const [validations, setValidations] = useState<FormValidation>({
    name: null,
    email: null,
    message: null,
    company: null,
    allowedContact: null,
  })

  const [showThankYou, setShowThankYou] = useState(false)
  const [url, setUrl] = useState('')
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    allowedContact: '',
  })

  const { currentLanguage } = useAppContext();

  const handleValidation = (event: any) => {
    setValidations({
      ...validations,
      [event.target.name]: !event.target.validity.valid,
    })
  }

  const handleShowForm = (event: any) => {
    setShowThankYou(false)
  }

  useEffect(() => {
    setShowThankYou(location.search === '?ThankYou')
    setUrl(location.href ? location.origin + location.pathname : '')
  }, [])

  const handleSubmit = (e: any) => {
    // TODO: illegal update?
    Object.keys(validations).forEach(
      (key) =>
        (validations[key as keyof FormValidation] =
          validations[key as keyof FormValidation] === null ||
          validations[key as keyof FormValidation] === true
            ? true
            : false)
    )
    setValidations({ ...validations })
  }

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    })
    if (validations[event.target.name as keyof FormValidation] === true) {
      handleValidation(event)
    }
  }

  return (
    <FormContainer>
      {showThankYou && (
        <StyledThankYouForm>
          <ThankYouHeader>
            <span>{currentLanguage === 'sv' ? 'Tan för att du hör av dig!' : 'Thank you for reaching out!'}</span>
          </ThankYouHeader>
          <ThankYouText>
            <span>{currentLanguage === 'sv' ? 'Vi återkopplar inom kort' : 'We will get in touch soon!'}</span>
          </ThankYouText>
          <ThankYouFormFieldset>
            <SubmitButton
              type="submit"
              value="Apply again"
              onClick={handleShowForm}
            >
              <span>{currentLanguage === 'sv' ? 'Skicka igen' : 'Apply Again'}</span>
            </SubmitButton>
          </ThankYouFormFieldset>
        </StyledThankYouForm>
      )}
      <StyledForm
        opacity={showThankYou}
        action={`https://formsubmit.co/jesper.paalsson@frankdigital.se`}
        method="POST"
      >
        <input type="hidden" name="_template" value="table" />
        <input
          type="hidden"
          name="_next"
          value={url + '?ThankYou#ScrollDown'}
        />
        {/* <input type="hidden" name="_next" value={url + '#ContactUs'} /> */}
        <input type="hidden" name="_captcha" value="false" />
        <FormFieldset>
          <InputLabel
            className={validations.name ? 'is-touched' : 'is-touched'}
            htmlFor="name"
          >
            <span>{currentLanguage === 'sv' ? 'Namn' : 'Name'}</span>
          </InputLabel>
          <InputText
            type="text"
            name="name"
            id="name"
            required
            className={validations.name ? 'is-touched' : ''}
            onBlur={handleValidation}
            value={values.name}
            onChange={handleChange}
          />
          {validations.name &&
           <ValidationText>
            <span>{currentLanguage === 'sv' ? 'Ange namn' : 'Enter your name'}</span>
           </ValidationText>}
        </FormFieldset>
        <FormFieldset>
          <InputWrapper>
            <InputLabel
              className={validations.email ? 'is-touched' : 'is-touched'}
              htmlFor="email"
            >
              <span>{currentLanguage === 'sv' ? 'E-post' : 'E-mail'}</span>
            </InputLabel>
            <InputText
              type="email"
              name="email"
              id="email"
              required
              className={validations.email ? 'is-touched' : ''}
              onBlur={handleValidation}
              value={values.email}
              onChange={handleChange}
            />
          </InputWrapper>
          {validations.email && (
            <ValidationText>
                <span>{currentLanguage === 'sv' ? 'Ange en korrekt e-post' : 'Enter a valid email'}</span>
            </ValidationText>
          )}
        </FormFieldset>
        <FormFieldset>
          <InputWrapper>
            <InputLabel htmlFor="company">
              <span>{currentLanguage === 'sv' ? 'Företagsnamn' : 'Company name'}</span>
            </InputLabel>
            <InputText
              type="text"
              name="company"
              id="company"
              required
              className={validations.company ? 'is-touched' : ''}
              onBlur={handleValidation}
              value={values.company}
              onChange={handleChange}
            />
          </InputWrapper>
          {validations.company && (
            <ValidationText>
              <span>{currentLanguage === 'sv' ? 'Var god ange ev. företagsnamn' : 'Enter the name of your company'}</span>
            </ValidationText>
          )}
        </FormFieldset>
        <FormFieldset>
          <InputWrapper>
            <InputLabel htmlFor="message">
              <span>{currentLanguage === 'sv' ? 'Beskriv din verksamhet' : 'Describe your business'}</span>
            </InputLabel>
            <InputTextarea
              name="message"
              id="message"
              required
              className={validations.message ? 'is-touched' : ''}
              onBlur={handleValidation}
              value={values.message}
              onChange={handleChange}
            />
          </InputWrapper>
          {validations.message && (
            <ValidationText>
             <span>{currentLanguage === 'sv' ? 'Beskriv din verksamhet kort text.' : 'Describe your business in a few words'}</span>
            </ValidationText>
          )}
        </FormFieldset>
        <FormFieldset>
          <CheckboxWrapper>
            <InputCheckbox
              type="checkbox"
              name="allowedContact"
              required
              className={validations.allowedContact ? 'is-touched' : ''}
              onBlur={handleValidation}
              value={values.allowedContact}
              onChange={handleChange}
            />
            <CheckboxLabel>
              <span>{currentLanguage === 'sv' ? 'Ja det är ok att Frank kontaktar mig.' : "Yes, it's ok for Frank to contact me. No Spam!"}</span>
            </CheckboxLabel>
          </CheckboxWrapper>
          {validations.allowedContact && (
            <ValidationText><span>{currentLanguage === 'sv' ? 'Du behöver godkänna att vi kontaktar dig' : 'Check the box!'}</span></ValidationText>
          )}
        </FormFieldset>
        <Disclaimer>
        <p>{currentLanguage === 'sv' ? 'Genom att fylla i detta formulär samtycker du till att vi behandlar dina kontaktuppgifter. Vi samlar in data för att kunna kontakta dig så att du kan ta del av vårt erbjudande. Vi delar inte dina kontaktuppgifter med någon annan. Du kan när som helst kontakta oss via hello@frankdigital.se om du vill radera eller ändra dina kontaktuppgifter.' : 'By filling in this form, you consent to processing your contact data. We collect the data in order to be able to contact you, so you can take part of our offer. We are not sharing your contact data with anyone else. You can at anytime contact us via hello@frankdigital.se if you want to delete or change your contact data.'}</p>
        </Disclaimer>
        <FormFieldsetSubmit>

        {!showThankYou && 
          <SubmitButton
            type="submit"
            value={'Apply now'}
            onClick={handleSubmit}
          >
            <span>{currentLanguage === 'sv' ? 'Skicka' : 'Submit'}</span>
          </SubmitButton>
        }
        </FormFieldsetSubmit>
      </StyledForm>
    </FormContainer>
  )
}
