export interface ThemeInterface {
  color: {
    [key: string]: string
  }
}

const colorPrimitives = {
  blueGray: {
    lightest: '#ECEFF1',
    lighter: '#CFD8DC',
    light: '#B0BEC5',
    semilight: '#90A4AE',
    400: '#78909C',
    500: '#607D8B',
    600: '#546E7A',
    700: '#455A64',
    800: '#37474F',
    900: '#263238',
  },
  blue: {
    bright: '#2979FF',
    brightest: '#2962FF',
  },
  white: '#fff',
}

const color = {
  textWhite: colorPrimitives.white,
  cardBorder: colorPrimitives.blueGray.lighter,
  taskProgress: colorPrimitives.blue.bright,
}

export { color }
