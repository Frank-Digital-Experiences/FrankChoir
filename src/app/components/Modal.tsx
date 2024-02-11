import React, { MouseEventHandler, PropsWithChildren } from 'react'
import styled from '@emotion/styled'
import FocusTrap from 'focus-trap-react'
import { breakpoints } from '../shared/DeviceBreakPoints'
import { VisuallyHiddenSpan } from '../shared/StyledComponents'

type Modalrops = PropsWithChildren<{
  isOpen?: boolean
  onClose: MouseEventHandler
}>

const Modal: React.FC<Modalrops> = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null
  }
  return (
    <Overlay>
      <FocusTrap
        focusTrapOptions={{
          clickOutsideDeactivates: true,
          onDeactivate: () => onClose(),
        }}
      >
        <ModalContainer role="dialog" aria-modal>
          <CloseContainer>
            <CloseButton aria-label="Close modal" onClick={onClose}>
              X
            </CloseButton>
          </CloseContainer>
          {children}
          <CloseContainer>
            <CloseButton aria-label="Close modal" onClick={onClose}>
              <VisuallyHiddenSpan>X</VisuallyHiddenSpan>
            </CloseButton>
          </CloseContainer>
        </ModalContainer>
      </FocusTrap>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 500;
  background-color: rgba(0, 0, 0, 0.5);
`
const ModalContainer = styled.div`
  height: 100vh;
  padding: 1rem;
  background-color: var(--colorBlack);
  color: var(--colorWhite);
  @media (min-width: ${breakpoints.md}px) {
    padding: 1.6rem;
    margin: 4rem auto 0;
    max-height: 65%;
    max-width: 80%;
  }
  @media (min-width: ${breakpoints.l}px) {
    max-width: 70%;
  }
  @media (min-width: ${breakpoints.lxl}px) {
    max-width: 60%;
  }
  @media (min-width: ${breakpoints.xl}px) {
    max-width: 50%;
  }
`

const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`
const CloseButton = styled.button`
  display: flex;
  padding: 0 0.7rem;
  justify-content: flex-end;
  background-color: transparent;
  border: 0;
  font-size: 1.8rem;
  color: var(--colorWhite);
`

export default Modal
