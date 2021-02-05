import React from 'react';
import {
  Box, Flex, Link, ListItem, Text, UnorderedList,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';

import AudioCore from './Brand';
import { ExternalLink, InternalLink } from './Link';

const NavLink = ({ ariaLabel, to, children: navLinkChildren }) => (
  <Box>
    <InternalLink as="GatsbyLink" aria-label={ariaLabel} to={to} variant="footerNavItem">
      {navLinkChildren}
    </InternalLink>
  </Box>
);

NavLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

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
            tracedSVGOptions={{
              color: '#1c768f',
              background: '#ffffff',
            }}
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
  <Flex as="footer" direction="column" my="2">
    <Flex>
      <Text fontSize="2xl">
        <AudioCore />
      </Text>
    </Flex>
    <Flex direction="column" mt="6">
      <Text textStyle="footerNavHeader">COMPANY</Text>
      <UnorderedList styleType="none" m="0" p="0">
        <ListItem>
          <NavLink ariaLabel="Find out about Audio Link" to="/about/">
            <Text textStyle="footerNavItem">About</Text>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink ariaLabel="Contact Audio Link" to="/contact/">
            <Text textStyle="footerNavItem">Contact</Text>
          </NavLink>
        </ListItem>
      </UnorderedList>
    </Flex>
    <Flex mt="8" mb="4">
      <Text>
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
      </Text>
    </Flex>
    <RodneyLabCredit />
  </Flex>
);

export { Footer as default };
