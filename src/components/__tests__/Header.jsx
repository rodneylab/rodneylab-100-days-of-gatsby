import React from 'react';

import data from './__fixtures__/header';
import { PureHeader as Header } from '../Header';
import { customRender } from '../../utils/test-utils';

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('Header', () => {
  it('renders correctly', async () => {
    const elementToRender = <Header data={data} />;
    const { asFragment } = customRender(elementToRender);
    expect(asFragment(elementToRender)).toMatchSnapshot();
  });
});
