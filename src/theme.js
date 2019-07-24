import { createTheming } from '@callstack/react-theme-provider'

const { ThemeProvider, withTheme, useTheme } = createTheming({
  headerBackground: '#072142',
  backgroundGradient: ['#051830', '#041428', '#05111e', '#040e17', '#03090f'],
  defaultGradient: ['#e10053', '#FF4D5A', '#ff6c4d'],
  colorfulGradient: [
    '#fb0094',
    '#0000ff',
    '#00ff00',
    '#ffff00',
    '#ff0000',
    '#fb0094',
    '#0000ff',
    '#00ff00',
    '#ffff00',
    '#ff0000',
  ],

  get laptopGradient() {
    return this.colorfulGradient
  },
})

export { ThemeProvider, withTheme, useTheme }
