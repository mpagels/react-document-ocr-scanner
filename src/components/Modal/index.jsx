import React, { useState } from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const ModalContent = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  color: black !important;	
`

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 16px;
`

const ModalText = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  margin-bottom: 24px;
`

export default function Modal({ isOpen, title, message }) {
  if (!isOpen) {
    return null
  }

  return (
    <ModalContainer>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalText>{message}</ModalText>
      </ModalContent>
    </ModalContainer>
  )
}
