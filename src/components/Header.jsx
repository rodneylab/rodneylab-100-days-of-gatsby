import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import { DESKTOP_BREAKPOINT } from '../constants/sizes';
import { useMediaQuery } from '../hooks';

const ListLink = ({
  ariaLabel, to, children: listLinkChildren, isDesktop,
}) => (
  <li style={isDesktop ? {} : { padding: '15px 0px' }}>
    <Link aria-label={ariaLabel} to={to}>
      {listLinkChildren}
    </Link>
  </li>
);

ListLink.defaultProps = {
  isDesktop: false,
};

ListLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isDesktop: PropTypes.bool,
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
    <header>
      {/* <Box bg="blue.800" color="yellow.500"> */}
      <Box bg="blue.700" color="white">
        <Heading>AudioC0RE - headphones sharing</Heading>
        <nav>
          <ul>
            <ListLink ariaLabel="Open Home page" to="/home" isDesktop={isDesktop}>
              Home
            </ListLink>
            <ListLink ariaLabel="Open About page" to="/about" isDesktop={isDesktop}>
              About
            </ListLink>
            <ListLink ariaLabel="Open Location page" to="/location" isDesktop={isDesktop}>
              Locations:
            </ListLink>
            <li>
              <ul>
                {data.allContentfulLocation.nodes.sort(sortLocation).map((location) => {
                  const { city, slug } = location;
                  return (
                    <ListLink
                      ariaLabel={`Open ${city} location page`}
                      to={`/location/${slug}`}
                      key={slug}
                      isDesktop={isDesktop}
                    >
                      {city}
                    </ListLink>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </Box>
    </header>
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
