import React from 'react';
import { Box } from '@chakra-ui/react';

import { ExternalLink } from './Link';

const Footer = () => (
  <footer>
    <Box bg="blue.800" color="white">
      Page created by
      {' '}
      <ExternalLink
        ariaLabel="Open Rodney Lab contact page"
        to="https://rodneylab.com/contact"
        text="Rodney Lab"
        targetBlank={false}
        variant="footer"
      />
      {' '}
      as part of
      {' '}
      <ExternalLink
        ariaLabel="See Rodney Lab post on the challenge"
        to="https://rodneylab.com/100-days-of-gatsby-code-2021/"
        text="100 Days of Gatsby Code 2021"
        targetBlank={false}
        variant="footer"
      />
      .
    </Box>
  </footer>
);

export { Footer as default };
