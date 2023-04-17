import { useState } from 'react'
import { createWorker } from 'tesseract.js'

import styled from 'styled-components'
import './App.css'
import Modal from './components/Modal'

function App() {
  const [isCalculating, setIsCalculating] = useState(false)

  const [textExtract, setTextExtract] = useState('')
  const [logger, setLogger] = useState(null)

  const loggerInitialStrings = [
    'loading tesseract core',
    'initializing tesseract',
    'loading language traineddata',
    'loaded language traineddata',
    'initializing api',
    'initialized api',
  ]
  const [image, setImage] = useState(null)

  function handleImageInputChange(event) {
    setImage(URL.createObjectURL(event.target.files[0]))
    setTextExtract('')
  }

  const handleExtractText = async () => {
    setIsCalculating(true)

    const worker = await createWorker({
      workerPath: '/services/tesseract/worker.min.js',
      langPath: '/assets/lang-data',
      corePath: '/services/tesseract-js-core/tesseract-core.wasm.js',
      logger: (m) => {
        console.log(m)
        setLogger(m)
      },
    })

    ;(async () => {
      await worker.load()
      await worker.loadLanguage('deu')
      await worker.initialize('deu')
      const {
        data: { text },
      } = await worker.recognize(image)
      setTextExtract(text)
      setIsCalculating(false)
      console.log(text)
      await worker.terminate()
    })()
  }

  return (
    <div className="App">
      <Modal
        isOpen={isCalculating}
        title="Extracting Text"
        message={
          logger &&
          loggerInitialStrings.some((string) => string === logger.status)
            ? 'Prepare scanning...'
            : logger &&
              logger.progress < 1 &&
              logger.status === 'recognizing text'
            ? `Scanning text... ${(logger.progress * 100).toFixed(0)}%`
            : '  '
        }
      />
      <ImageInputContainer>
        <ImageInputTitle>
          Upload an Image that contains (german) text
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
          {image && (
            <CalculateButton onClick={handleExtractText}>
              Extract Text
            </CalculateButton>
          )}
        </ButtonWrapper>
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
