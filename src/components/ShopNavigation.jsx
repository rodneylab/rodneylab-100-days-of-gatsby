import React from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';

import { InternalLink } from './Link';

const navigationLinks = [
  {
    name: 'All products',
    slug: '/shop/',
    pActive: false,
  },
  {
    name: 'Hats',
    slug: '/shop/hats/',
    pActive: true,
  },
  {
    name: 'T-Shirts',
    slug: '/shop/t-shirts/',
    pActive: true,
  },
];

const ShopNavigation = () => (
  <Stack
    as="nav"
    direction={['column', 'row']}
    fontSize="lg"
    alignItems={['flex-start', 'center', 'center', 'center', 'center']}
  >
    {navigationLinks.map((element) => (
      <Box pl={4}>
        <InternalLink
          as="GatsbyLink"
          ariaLabel={`Jump to ${element.name} in the Audio Link shop`}
          to={element.slug}
          variant="header"
        >
          <Text textStyle="headerNavItem">{element.name}</Text>
        </InternalLink>
      </Box>
    ))}
  </Stack>
);
export { ShopNavigation as default };
