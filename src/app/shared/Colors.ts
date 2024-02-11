export type ColorMapType = {
  [index: number]:
    | '--primaryRed'
    | '--primaryGreen'
    | '--primaryBlue'
    | '--primaryPink'
}

export const primaryColors: ColorMapType = {
  0: '--primaryBlue',
  1: '--primaryRed',
  2: '--primaryPink',
  3: '--primaryGreen',
}

export const StudioColors: ColorMapType = {
  0: '--primaryBlue',
  1: '--primaryRed',
  2: '--primaryPink',
}

export const A11yColors: ColorMapType = {
  0: '--primaryPink',
  1: '--primaryBlue',
  2: '--primaryGreen',
}