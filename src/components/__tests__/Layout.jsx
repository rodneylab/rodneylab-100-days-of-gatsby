import React from 'react';

import data from './__fixtures__/layout';
import { PureLayout as Layout } from '../Layout';
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

describe('Layout', () => {
  it('renders correctly', async () => {
    const elementToRender = (
      <Layout data={data}>
        <>
          <h1>Test heading</h1>
          <p>Test body</p>
        </>
      </Layout>
    );
    const { asFragment } = customRender(elementToRender);
    expect(asFragment(elementToRender)).toMatchSnapshot();
  });
});
