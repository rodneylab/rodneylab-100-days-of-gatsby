/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import '@fontsource/fira-code/600.css';
import '@fontsource/gentium-book-basic';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/ibm-plex-mono';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';

import { StoreProvider } from './src/context/StoreContext';

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }) => <StoreProvider>{element}</StoreProvider>;
