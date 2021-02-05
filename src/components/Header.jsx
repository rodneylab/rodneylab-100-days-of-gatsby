import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { graphql, useStaticQuery } from 'gatsby';
import { HamburgerIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import AudioCore from './Brand';
import { InternalLink } from './Link';
import { DESKTOP_BREAKPOINT } from '../constants/sizes';

const HeaderLogo = () => (
  <Flex>
    <InternalLink aria-label="Open Audio Core home page" to="/" variant="header">
      <Heading size="xl" my="2">
        <AudioCore />
      </Heading>
    </InternalLink>
  </Flex>
);

const NavLink = ({
  ariaLabel, to, children: navLinkChildren, p,
}) => (
  <Box ml={4} pr={p}>
    <InternalLink as="GatsbyLink" aria-label={ariaLabel} to={to} variant="header">
      {navLinkChildren}
    </InternalLink>
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
  const [isDesktop] = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);

  if (isDesktop) {
    return (
      <Flex as="header" color="white" w="100%" maxW="6xl" align="baseline" ml="4" mr="4">
        <HeaderLogo />
        <Spacer />
        <Flex>
          <NavLink ariaLabel="Find out about Audio Link" to="/about" p="8">
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
  }
  return (
    <Flex
      as="header"
      color="white"
      w="100%"
      maxW={['3xl', '3xl', '3xl', '6xl', '6xl']}
      align="center"
      mx={[4, 4, 'auto', 4, 0]}
      justify="center"
    >
      <HeaderLogo />
      <Spacer />
      <Flex>
        <Menu>
          <MenuButton
            transition="all 0.2s"
            _hover={{ color: 'pink.100' }}
            _expanded={{ color: 'pink.200' }}
            _focus={{ boxShadow: 'outline' }}
          >
            <HamburgerIcon boxSize={12} />
          </MenuButton>
          <MenuList minWidth={['320px', '512px', '661px', null, null]} bg="blue.700" borderRadius="0" borderColor="yellow.500">
            <NavLink ariaLabel="Go to Audio Link Homepage" to="/home" p="8">
              <MenuItem>
                <Text textStyle="menuNavItem">Home</Text>
              </MenuItem>
            </NavLink>
            <NavLink ariaLabel="Find out about Audio Link" to="/about" p="8">
              <MenuItem>
                <Text textStyle="menuNavItem">About</Text>
              </MenuItem>
            </NavLink>
            <MenuDivider bg="yellow.500" />
            <MenuGroup title="Locations" textStyle="menuNavItem">
              {data.allContentfulLocation.nodes.sort(sortLocation).map((location) => {
                const { city, slug } = location;
                return (
                  <NavLink
                    ariaLabel={`Open ${city} location page`}
                    to={`/location/${slug}`}
                    key={slug}
                    isDesktop={isDesktop}
                  >
                    <MenuItem>
                      <Text textStyle="menuNavItem">{city}</Text>
                    </MenuItem>
                  </NavLink>
                );
              })}
            </MenuGroup>
          </MenuList>
        </Menu>
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
