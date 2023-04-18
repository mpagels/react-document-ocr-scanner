import { useState } from 'react'

import styled from 'styled-components'
import './App.css'
import Modal from './components/Modal'
import useTesseract from './hooks/useTesseract'

function App() {
  const [image, setImage] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState('deu')

  function handleLanguageSelect(language) {
    setSelectedLanguage(language)
  }

  const {
    isCalculating,
    textExtract,
    resetTesseractTextExtract,
    handleExtractText,
    loggerMessage,
  } = useTesseract(image, selectedLanguage)

  function handleImageInputChange(event) {
    setImage(URL.createObjectURL(event.target.files[0]))
    resetTesseractTextExtract()
  }

  return (
    <div className="App">
      <Modal
        isOpen={isCalculating}
        title="Extracting Text"
        message={loggerMessage}
      />
      <ImageInputContainer>
        <ImageInputTitle>
          Upload an Image that contains (ger/eng) text
        </ImageInputTitle>
        <ButtonWrapper>
          <ImageInputLabel htmlFor="image-upload">
            Choose an Image
            <ImageInput
              type="file"
              id="image-upload"
              onChange={handleImageInputChange}
            />
          </ImageInputLabel>
        </ButtonWrapper>

        {image && (
          <>
            <LanguageSwitch>
              Which language is in the image?:
              <LanguageButton
                active={selectedLanguage === 'eng'}
                onClick={() => handleLanguageSelect('eng')}
              >
                English
              </LanguageButton>
              <LanguageButton
                active={selectedLanguage === 'deu'}
                onClick={() => handleLanguageSelect('deu')}
              >
                German
              </LanguageButton>
            </LanguageSwitch>
            <ButtonWrapper>
              <CalculateButton onClick={handleExtractText}>
                Extract Text
              </CalculateButton>
            </ButtonWrapper>
          </>
        )}
        {textExtract && <pre>{textExtract}</pre>}
        {image && <ImageInputPreview src={image} alt="User uploaded" />}
      </ImageInputContainer>
    </div>
  )
}

export default App

const ButtonWrapper = styled.div`
  display: flex;
`

const CalculateButton = styled.button`
  border-radius: 8px;
  padding: 12px 24px;
  background-color: #000;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 600px;
`

const ImageInputTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin: 0;
  margin-bottom: 24px;
`

const ImageInputPreview = styled.img`
  max-width: 100%;
  margin-top: 24px;
`

const ImageInputLabel = styled.label`
  border-radius: 8px;
  padding: 12px 24px;
  background-color: #000;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`

const ImageInput = styled.input`
  display: none;
`

const LanguageSwitch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
`

const LanguageButton = styled.button`
  margin: 0 8px;
  padding: 8px;
  border: none;
  background-color: transparent;
  font-size: 18px;
  font-weight: 700;
  color: ${({ active }) => (active ? '#ccc' : '#333')};
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};

  &:hover {
    color: ${({ active }) => (active ? '#ccc' : '#454545')};
  }
`
