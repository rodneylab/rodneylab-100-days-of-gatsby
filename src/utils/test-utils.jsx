import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { createMemorySource, createHistory, LocationProvider } from '@reach/router';

const source = createMemorySource('active');
const history = createHistory(source);

const locationProvider = ({ children }) => (
  <LocationProvider history={history}>{children}</LocationProvider>
);

export const customRender = (ui, options) => render(ui, { wrapper: locationProvider, ...options });

export const getMetaByName = (metaName) => {
  const metas = document.getElementsByTagName('meta');
  for (let i = 0; i < metas.length; i += 1) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content');
    }
  }
  return '';
};

export const getMetaByProperty = (metaProperty) => {
  const metas = document.getElementsByTagName('meta');
  for (let i = 0; i < metas.length; i += 1) {
    if (metas[i].getAttribute('property') === metaProperty) {
      return metas[i].getAttribute('content');
    }
  }
  return '';
};
