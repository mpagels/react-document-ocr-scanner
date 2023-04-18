import { useState } from 'react'
import { createWorker } from 'tesseract.js'

const loggerInitialStrings = [
  'loading tesseract core',
  'initializing tesseract',
  'loading language traineddata',
  'loaded language traineddata',
  'initializing api',
  'initialized api',
]

export default function useTesseract(image) {
  const [isCalculating, setIsCalculating] = useState(false)
  const [textExtract, setTextExtract] = useState('')
  const [logger, setLogger] = useState(null)

  function resetTesseractTextExtract() {
    setTextExtract('')
  }

  const loggerMessage =
    logger && loggerInitialStrings.some((string) => string === logger.status)
      ? 'Prepare scanning...'
      : logger && logger.progress < 1 && logger.status === 'recognizing text'
      ? `Scanning text... ${(logger.progress * 100).toFixed(0)}%`
      : '  '

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

  return {
    isCalculating,
    textExtract,
    resetTesseractTextExtract,
    handleExtractText,
    loggerMessage,
  }
}
