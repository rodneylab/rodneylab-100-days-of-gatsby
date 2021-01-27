import React from 'react';

import Footer from '../Footer';
import { customRender } from '../../utils/test-utils';

describe('ConfusedFaceEmoji', () => {
  it('renders correctly', async () => {
    const elementToRender = (<Footer />);
    const { asFragment } = customRender(elementToRender);
    expect(asFragment(elementToRender)).toMatchSnapshot();
  });
});
