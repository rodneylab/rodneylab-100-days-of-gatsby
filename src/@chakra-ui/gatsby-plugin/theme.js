import { extendTheme } from '@chakra-ui/react';

const colors = {
  //   /* CSV */
  // 011946,022d5f,f68e92,f9a0a3,fcd600

  // /* Array */
  // ["011946","022d5f","f68e92","f9a0a3","fcd600"]

  // /* Object */
  // {"Oxford Blue":"011946","Prussian Blue":"022d5f","Light Coral":"f68e92",
  //  "Salmon Pink":"f9a0a3","Gold Web Golden":"fcd600"}

  // /* Extended Array */
  // [{"name":"Oxford Blue","hex":"011946","rgb":[1,25,70],"cmyk":[99,64,0,73],
  //   "hsb":[219,99,27],"hsl":[219,97,14],"lab":[10,12,-31]},
  //  {"name":"Prussian Blue","hex":"022d5f","rgb":[2,45,95],"cmyk":[98,53,0,63],
  //  "hsb":[212,98,37],"hsl":[212,96,19],"lab":[19,8,-34]},
  // {"name":"Light Coral","hex":"f68e92","rgb":[246,142,146],"cmyk":[0,42,41,4],
  // "hsb":[358,42,96],"hsl":[358,85,76],"lab":[70,40,15]},{"name":"Salmon Pink",
  // "hex":"f9a0a3","rgb":[249,160,163],"cmyk":[0,36,35,2],"hsb":[358,36,98],
  // "hsl":[358,88,80],"lab":[75,33,12]},{"name":"Gold Web Golden","hex":"fcd600",
  // "rgb":[252,214,0],"cmyk":[0,15,100,1],"hsb":[51,100,99],"hsl":[51,100,49],
  // "lab":[86,-3,87]}]
  yellow: {
    50: '#fffbda',
    100: '#fff3ad',
    200: '#ffec7d',
    300: '#ffe44b',
    400: '#ffdc1a',
    500: '#fcd600', // '#e6c300', //
    600: '#b39800',
    700: '#806c00',
    800: '#4d4100',
    900: '#1c1600',
  },
  blue: {
    50: '#e3eeff',
    100: '#b4cdfe',
    200: '#83acfa',
    300: '#548bf8',
    400: '#2b6af7',
    500: '#1951dd',
    600: '#113fad',
    700: '#022d5f', // '#082d7c',
    800: '#011946', // '#011b4b', //
    900: '#00091d',
  },
  pink: {
    50: '#ffe4e6',
    100: '#f9a0a3', // '#fcb7ba',
    200: '#f68e92', // '#f6898d', //
    300: '#f15b60',
    400: '#ec2d33',
    500: '#d4171a',
    600: '#a41014',
    700: '#76090e',
    800: '#480406',
    900: '#1e0000',
  },
};

const components = {
  Link: {
    baseStyle: {
      textDecoration: 'underline',
    },
    variants: {
      footer: {
        color: 'pink.200',
      },
      main: {
        color: 'blue.800',
      },
    },
  },
  defaultProps: {
    variant: 'main',
  },
};

const fonts = {
  heading:
    '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body:
    '"Gentium Book Basic", serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono:
    '"IBM Plex Mono", SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
};

const fontSizes = {
  xs: '0.64rem',
  sm: '0.8rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.563',
  '2xl': '1.953rem',
  '3xl': '2.441rem',
  '4xl': '3.052rem',
  '5xl': '3.815rem',
  '6xl': '4.768rem',
  '7xl': '5.96rem',
  '8xl': '7.451rem',
  '9xl': '9.313rem',
};
const theme = extendTheme({
  colors, components, fonts, fontSizes,
});

export default theme;
