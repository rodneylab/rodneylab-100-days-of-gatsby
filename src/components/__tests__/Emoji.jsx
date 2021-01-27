import React from 'react';
import { screen } from '@testing-library/react';

import { ConfusedFaceEmoji } from '../Emoji';
import { customRender } from '../../utils/test-utils';

describe('ConfusedFaceEmoji', () => {
  it('renders correctly', async () => {
    const elementToRender = (<ConfusedFaceEmoji />);
    const { asFragment } = customRender(elementToRender);
    expect(asFragment(elementToRender)).toMatchSnapshot();
  });

  it('has role set to img', () => {
    const elementToRender = (<ConfusedFaceEmoji />);
    customRender(elementToRender);
    expect(screen.getByRole('img')).toBeTruthy();
  });

  it('has an aria-label set', () => {
    const elementToRender = (<ConfusedFaceEmoji />);
    customRender(elementToRender);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label');
  });
});
