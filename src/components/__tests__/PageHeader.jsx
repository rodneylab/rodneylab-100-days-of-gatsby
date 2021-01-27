import React from 'react';
import { waitFor } from '@testing-library/react';

import { data, pageTitle } from './__fixtures__/pageHeader';
import { PurePageHeader as PageHeader } from '../PageHeader';
import { customRender } from '../../utils/test-utils';

const elementToRender = (
  <>
    <PageHeader data={data} pageTitle={pageTitle} />
    <h1>Test heading</h1>
    <p>Test body</p>
  </>
);

describe('Header', () => {
  it('renders correctly', async () => {
    const { asFragment } = customRender(elementToRender);
    expect(asFragment(elementToRender)).toMatchSnapshot();
  });

  it('creates html lang tag', async () => {
    customRender(elementToRender);
    await waitFor(() => {
      const htmlTag = document.getElementsByTagName('html')[0];
      expect(htmlTag.getAttribute('lang')).toEqual(data.site.siteMetadata.siteLanguage);
    });
  });

  it('creates head title element', async () => {
    customRender(elementToRender);
    await expect(document.title).toEqual(`${data.site.siteMetadata.title} | ${pageTitle}`);
  });

  it('creates a robot meta tag', async () => {
    customRender(elementToRender);
    await waitFor(() => {
      const tags = document.getElementsByTagName('meta');
      const filteredTags = [].slice.call(tags).filter((tag) => tag.getAttribute('name') === 'robots');
      expect(filteredTags.length).toBe(1);
      expect(filteredTags[0].getAttribute('content')).toBe('index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    });
  });
});
