import React from 'react';
import { Flex, Link } from '@chakra-ui/react';
import { StaticImage } from 'gatsby-plugin-image';

import { ExternalLink } from './Link';

const RodneyLabCredit = () => (
  <Flex align="center">
    <span style={{ 'font-family': 'Lato', 'font-weight': 400 }}>A project by</span>
    {' '}
    <Flex flexDirection="row" align="center" ml="1" mr="1">
      <Link aria-label="Contact Rodney Lab" href="https://rodneylab.com/contact" variant="logo">
        <Flex align="center">
          <StaticImage
            alt="Rodney Lab logo"
            src="../images/rodneylab-logo.png"
            width={16}
            height={16}
          />
          {' '}
          <Flex as="span" ml="1" style={{ 'font-family': 'Lato', 'font-weight': 300 }}>
            RODNEY LAB.
          </Flex>
        </Flex>
      </Link>
    </Flex>
  </Flex>
);
const Footer = () => (
  <footer>
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
    <RodneyLabCredit />
  </footer>
);

export { Footer as default };
