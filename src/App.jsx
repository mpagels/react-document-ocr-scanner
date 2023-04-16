import { useState } from 'react'
import Tesseract from 'tesseract.js';

import './App.css'

function App() {

  const [textExtract, setTextExtract] = useState("")
  const [logger, setLogger] = useState(null)

  const loggerInitialStrings = ["loading tesseract core", "initializing tesseract", "loading language traineddata", "loaded language traineddata", "initializing api", "initialized api"]
  
  const handleImageChange = (event) => {
    setTextExtract("")
    Tesseract.recognize(
      URL.createObjectURL(event.target.files[0]),
      'deu',
      { logger: m => { console.log(m); setLogger(m) }}
    ).then(({ data: { text } }) => {
      setTextExtract(text);
    })

  };
   
 
  return (
    <div className="App">
       <div>
       <input type="file" accept="image/*" onChange={handleImageChange}/>
    </div>
    {logger && loggerInitialStrings.some(string => string === logger.status) && <h1>Prepare scanning...</h1>}
    {logger && logger.progress < 1 && logger.status === "recognizing text" && <h1>Scanning text... {(logger.progress * 100).toFixed(0)} %</h1>}
    {textExtract && <pre>
      {textExtract}</pre>}
    </div>
  )
}

export default App
