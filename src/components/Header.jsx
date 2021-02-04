import React from 'react';
import {
  Box, Flex, Heading, Spacer, Text,
} from '@chakra-ui/react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import { DESKTOP_BREAKPOINT } from '../constants/sizes';
import { useMediaQuery } from '../hooks';

const NavLink = ({
  ariaLabel, to, children: navLinkChildren, p,
}) => (
  <Box ml={4} pr={p}>
    <Link aria-label={ariaLabel} to={to}>
      {navLinkChildren}
    </Link>
  </Box>
);

NavLink.defaultProps = {
  p: 0,
};

NavLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  p: PropTypes.string,
};

const sortLocation = (a, b) => {
  if (a.city < b.city) {
    return -1;
  }
  if (a.city > b.city) {
    return 1;
  }
  return 0;
};

export const PureHeader = ({ data }) => {
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);

  return (
    <Flex as="header" color="white" w="100%" maxW="6xl" align="baseline">
      <Flex>
        <Link aria-label="Open Audio Core home page" to="/">
          <Heading size="xl" p="4">AudioC0RE</Heading>
        </Link>
      </Flex>
      <Spacer />
      <Flex>
        <NavLink ariaLabel="Find out about Audio Link" to="/about" p={8}>
          <Text textStyle="headerNavItem">About</Text>
        </NavLink>
        {data.allContentfulLocation.nodes.sort(sortLocation).map((location) => {
          const { city, slug } = location;
          return (
            <NavLink
              ariaLabel={`Open ${city} location page`}
              to={`/location/${slug}`}
              key={slug}
              isDesktop={isDesktop}
            >
              <Text textStyle="headerNavItem">{city}</Text>
            </NavLink>
          );
        })}
      </Flex>
    </Flex>
  );
};

PureHeader.propTypes = {
  data: PropTypes.shape({
    allContentfulLocation: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          city: PropTypes.string,
          slug: PropTypes.string,
        }),
      ),
    }),
  }).isRequired,
};

export const query = graphql`
  fragment HeaderFragment on ContentfulLocationConnection {
    nodes {
      city
      slug
    }
  }
`;

const Header = () => {
  const data = useStaticQuery(
    graphql`
      query HeaderQuery {
        allContentfulLocation {
          ...HeaderFragment
        }
      }
    `,
  );
  return <PureHeader data={data} />;
};

export { Header as default };
