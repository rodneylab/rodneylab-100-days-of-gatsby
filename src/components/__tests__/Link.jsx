import React from 'react';
import { screen } from '@testing-library/react';

import { customRender } from '../../utils/test-utils';

import { ExternalLink } from '../Link';

const ariaLabel = 'aria-label text';

describe('External Link', () => {
  it('renders correctly', async () => {
    const elementToRender = (
      <ExternalLink ariaLabel={ariaLabel} to="https://www.test-site.com" text="test site link" />
    );
    const { asFragment } = customRender(elementToRender);
    expect(asFragment(elementToRender)).toMatchSnapshot();
  });

  it('renders correctly with targetBlank false passed in', async () => {
    const elementToRender = (
      <ExternalLink
        ariaLabel={ariaLabel}
        to="https://www.test-site.com"
        text="test site link"
        targetBlank={false}
      />
    );
    const { asFragment } = customRender(elementToRender);
    expect(asFragment(elementToRender)).toMatchSnapshot();
  });

  it('has target attribute set to _blank by default', () => {
    customRender(
      <ExternalLink ariaLabel={ariaLabel} to="https://www.test-site.com" text="test site link" />,
    );
    expect(screen.getByText('test site link').closest('a')).toHaveAttribute('target', '_blank');
  });

  it('has no target attribute set when targetBlank false is passed in', () => {
    customRender(
      <ExternalLink
        ariaLabel={ariaLabel}
        to="https://www.test-site.com"
        text="test site link"
        targetBlank={false}
      />,
    );
    expect(screen.getByText('test site link').closest('a')).not.toHaveAttribute('target', '_blank');
  });

  it('sets noopener rel attribute', () => {
    customRender(
      <ExternalLink ariaLabel={ariaLabel} to="https://www.test-site.com" text="test site link" />,
    );
    expect(
      screen.getByText('test site link').closest('a').getAttribute('rel').includes('noopener'),
    ).toBeTruthy();
  });

  it('includes noreferrer and nofollow in rel attribute when targetBlank is true', () => {
    customRender(
      <ExternalLink ariaLabel={ariaLabel} to="https://www.test-site.com" text="test site link" targetBlank />,
    );
    expect(
      screen.getByText('test site link').closest('a').getAttribute('rel').includes('noreferrer'),
    ).toBeTruthy();
    expect(
      screen.getByText('test site link').closest('a').getAttribute('rel').includes('nofollow'),
    ).toBeTruthy();
  });
});
