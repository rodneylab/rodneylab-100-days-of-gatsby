import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '30em', // 480 px
  md: '48em', // 768 px
  lg: '62em', // 992 px
  xl: '80em', // 1280 px
  '2xl': '96em', // 1536 px
});

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

function baseStyleItem(props) {
  return {
    py: '0.4rem',
    px: '0.8rem',
    transition: 'background 50ms ease-in 0s',
    _focus: {
      bg: mode('blue.800', 'whiteAlpha.900')(props),
    },
  };
}

// function variantOutline(props) {
//   const { theme } = props;
//   const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

//   return {
//     field: {
//       border: '1px solid',
//       borderColor: 'yellow.500',
//       bg: 'inherit',
//       _hover: {
//         borderColor: mode('gray.300', 'whiteAlpha.400')(props),
//       },
//       _readOnly: {
//         boxShadow: 'none !important',
//         userSelect: 'all',
//       },
//       _disabled: {
//         opacity: 0.4,
//         cursor: 'not-allowed',
//       },
//       _invalid: {
//         borderColor: getColor(theme, ec),
//         boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
//       },
//       _focus: {
//         zIndex: 1,
//         borderColor: getColor(theme, fc),
//         boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
//       },
//     },
//     addon: {
//       border: '1px solid',
//       borderColor: mode('yellow.500', 'whiteAlpha.50')(props),
//       bg: mode('gray.100', 'whiteAlpha.300')(props),
//     },
//   };
// }

const components = {
  Button: {
    baseStyle: {
      bg: 'blue.700',
      color: 'yellow.500',
    },
    variants: {
      solid: {
        bg: 'yellow.500',
        border: '2px solid',
        borderColor: 'yellow.500',
        color: 'blue.700',
        _hover: {
          bg: 'blue.700',
          borderColor: 'yellow.500',
          color: 'yellow.500',
        },
      },
    },
  },
  Form: {
    baseStyle: {
      helperText: {
        color: 'white',
      },
    },
  },
  Input: {
    baseStyle: {
      field: {
        color: 'pink.200',
        borderColor: 'yellow.500',
        _hover: {
          borderColor: 'yellow.500',
        },
      },
    },
  },
  Link: {
    baseStyle: {
      textDecoration: 'underline',
    },
    variants: {
      footer: {
        color: 'yellow.500',
        _hover: {
          color: 'pink.200',
        },
      },
      footerNavItem: {
        color: 'yellow.500',
        textUnderlineOffset: '0.25rem',
        _hover: {
          color: 'pink.200',
          textUnderlineOffset: '0.5rem',
        },
      },
      header: {
        color: 'white',
        _hover: {
          color: 'pink.100',
          textUnderlineOffset: '0.5rem',
        },
        textDecoration: 'none',
      },
      headerActive: {
        color: 'white',
        textDecoration: 'underline',
        textUnderlineOffset: '0.5rem',
        _hover: {
          color: 'pink.100',
        },
      },
      main: {
        color: 'blue.800',
      },
      logo: {
        textDecoration: 'none',
      },
    },
    defaultProps: {
      variant: 'main',
    },
  },
  Menu: {
    baseStyle: (props) => ({
      item: baseStyleItem(props),
    }),
  },
  Textarea: {
    baseStyle: {
      color: 'pink.200',
      borderColor: 'pink.200',
    },
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
  xl: '1.563rem',
  '2xl': '1.953rem',
  '3xl': '2.441rem',
  '4xl': '3.052rem',
  '5xl': '3.815rem',
  '6xl': '4.768rem',
  '7xl': '5.96rem',
  '8xl': '7.451rem',
  '9xl': '9.313rem',
};

const textStyles = {
  footerNavHeader: {
    color: 'yellow.500',
    fontFamily: 'heading',
    fontSize: 'md',
    fontWeight: '600',
    mb: '1',
  },
  footerNavItem: {
    fontFamily: 'heading',
    fontSize: 'md',
    mb: '1',
  },
  menuNavItem: {
    color: 'pink.100',
    fontSize: 'xl',
    fontFamily: 'heading',
    fontWeight: 400,
  },
  headerNavItem: {
    fontSize: 'xl',
    fontFamily: 'heading',
    fontWeight: 600,
  },
};

const styles = {
  global: {
    body: {
      color: 'pink.700',
      bg: 'green',
    },
  },
};

const theme = extendTheme({
  breakpoints,
  colors,
  components,
  fonts,
  fontSizes,
  textStyles,
  styles,
});

export default theme;
