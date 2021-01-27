import React from 'react';

import { ExternalLink } from './Link';

const Footer = () => (
  <footer>
    Page created by
    {' '}
    <ExternalLink
      ariaLabel="Open Rodney Lab contact page"
      to="https://rodneylab.com/contact"
      text="Rodney Lab"
      targetBlank={false}
    />
    {' '}
    as part of
    {' '}
    <ExternalLink
      ariaLabel="See Rodney Lab post on the challenge"
      to="https://rodneylab.com/100-days-of-gatsby-code-2021/"
      text="100 Days of Gatsby Code 2021"
      targetBlank={false}
    />
    .
  </footer>
);

export { Footer as default };
