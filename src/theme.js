import { createTheming } from '@callstack/react-theme-provider'

const { ThemeProvider, withTheme, useTheme } = createTheming({
  primaryColor: 'red',
  accentColor: '#FF4D5A',
  backgroundGradient: ['#072142', '#061c37', '#07182b', '#061220', '#020b16'],
})

export { ThemeProvider, withTheme, useTheme }
