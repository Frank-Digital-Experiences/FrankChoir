import ABCWhyteInktrapWoff2 from './ABCWhyteInktrap-Regular.woff2'
import ABCWhyteInktrapWoff from './ABCWhyteInktrap-Regular.woff'
import ABCWhyteInktrapMediumWoff2 from './ABCWhyteInktrap-Medium.woff2'
import ABCWhyteInktrapMediumWoff from './ABCWhyteInktrap-Medium.woff'
import ABCWhyteInktrapBoldWoff2 from './ABCWhyteInktrap-Bold.woff2'
import ABCWhyteInktrapBoldWoff from './ABCWhyteInktrap-Bold.woff'
import ABCWhyteInktrapBookWoff2 from './ABCWhyteInktrap-Book.woff2'
import ABCWhyteInktrapBookWoff from './ABCWhyteInktrap-Book.woff'
import ABCWhyteInktrapHeavyWoff2 from './ABCWhyteInktrap-Heavy.woff2'
import ABCWhyteInktrapHeavyWoff from './ABCWhyteInktrap-Heavy.woff'

const Index = `
  @font-face {
    font-display: block;
    font-family: 'Whyte Inktrap Regular';
    font-style: normal;
    font-weight: 350;
    src: url(${ABCWhyteInktrapBookWoff2}) format('woff2'),
      url(${ABCWhyteInktrapBookWoff}) format('woff');
  }

  @font-face {
    font-display: block;
    font-family: 'Whyte Inktrap Regular';
    font-style: normal;
    font-weight: normal;
    src: url(${ABCWhyteInktrapWoff2}) format('woff2'),
      url(${ABCWhyteInktrapWoff}) format('woff');
  }

  @font-face {
    font-display: block;
    font-family: 'Whyte Inktrap Regular';
    font-style: normal;
    font-weight: 500;
    src: url(${ABCWhyteInktrapMediumWoff2}) format('woff2'),
      url(${ABCWhyteInktrapMediumWoff}) format('woff');
  }

  @font-face {
    font-display: block;
    font-family: 'Whyte Inktrap Regular';
    font-style: normal;
    font-weight: bold;
    src: url(${ABCWhyteInktrapBoldWoff2}) format('woff2'),
      url(${ABCWhyteInktrapBoldWoff}) format('woff');
  }


  @font-face {
    font-display: block;
    font-family: 'Whyte Inktrap Regular';
    font-style: normal;
    font-weight: 900;
    src: url(${ABCWhyteInktrapHeavyWoff2}) format('woff2'),
      url(${ABCWhyteInktrapHeavyWoff}) format('woff');
  }
`

export default Index
