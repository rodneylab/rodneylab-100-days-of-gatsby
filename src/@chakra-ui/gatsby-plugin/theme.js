import { extendTheme } from '@chakra-ui/react';

const fonts = {
  heading:
    '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body:
    '"Gentium Book Basic", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono:
    '"IBM Plex Mono", SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
};

const components = {
  Link: {
    baseStyle: {
      textDecoration: 'underline',
      color: 'blue.700',
    },
  },
};

const theme = extendTheme({ components, fonts });

export default theme;
