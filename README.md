# React Document OCR Scanner

React Document OCR Scanner is a React app that allows you to upload images and extract (german) text using `optical character recognition` (OCR) using the Tesseract.js library for `OCR`.

## Features

- simple upload images (taken with camera, or a scan)
- Extract (german) text from scanned documents using OCR
- Preview scanned documents and extracted text
- everything is local (on vercel) integrated -> no external call to external packages on `CDN`s
  no scanned files/images & test are stored

## To-Do

- [x] refactor code
- [x] add i18n support
  - [x] add `eng` ocr support
  - [x] let user decide which language `OCR` should extract
- [ ] add "edit" function, user can edit (clean/remove) extracted text
- [ ] add copy to `clipboard` functionality
- [ ] add create and download pdf from extracted text
- [ ] store extracted code in `localStorage` for later use
  - [ ] add small "extract library"
- [ ] research: automatically (uploaded) image improvement for better `OCR`

## Technologies

- React: A JavaScript library for building user interfaces
- Tesseract.js: A JavaScript library for optical character recognition (OCR)
- styled-components: A library for styling React components with CSS
- vite
- deployed on vercel

## Installation

- clone the repo
- install via `npm install`

## Usage

- run `npm run dev` to start the dev server
- check terminal for `url` to visit

## License

React Document OCR Scanner is licensed under the MIT License.

## Contributions

Contributions to React Document OCR Scanner are welcome! If you have any bug reports, feature requests, or pull requests, please submit them through the Github repository's issue tracker.

## Acknowledgments

This project is based on the tesseract library by [naptha](https://github.com/naptha/tesseract.js). Thank you to the developers of Tesseract.js for their excellent OCR library.
