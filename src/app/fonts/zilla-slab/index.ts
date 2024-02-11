import ZillaSlabHighlightRegular from './ZillaSlabHighlight-Regular.woff'
import ZillaSlabHighlightRegular2 from './ZillaSlabHighlight-Regular.woff2'
import ZillaSlabHighlightBold from './ZillaSlabHighlight-Bold.woff'
import ZillaSlabHighlightBold2 from './ZillaSlabHighlight-Bold.woff2'

const Index = `
	@font-face {
		font-display: block;
		font-family: 'Zilla Slab Highlight';
		font-style: normal;
		font-weight: normal;
		src: url(${ZillaSlabHighlightRegular2}) format('woff2'),
			url(${ZillaSlabHighlightRegular}) format('woff');
	}

	@font-face {
		font-display: block;
		font-family: 'Zilla Slab Highlight Bold';
		font-style: normal;
		font-weight: bold;
		src: url(${ZillaSlabHighlightBold2}) format('woff2'),
			url(${ZillaSlabHighlightBold}) format('woff');
	}
`

export default Index
