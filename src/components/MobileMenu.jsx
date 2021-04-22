import React from 'react';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import ShopNavigation from './ShopNavigation';

const MobileMenu = () => (
  <Flex>
    <Menu>
      <MenuButton
        aria-label="Open/Close navigation menu"
        transition="all 0.2s"
        _hover={{ color: 'pink.100' }}
        _expanded={{ color: 'pink.200' }}
        _focus={{ boxShadow: 'outline' }}
        ml={4}
      >
        <HamburgerIcon boxSize={12} />
      </MenuButton>
      <MenuList
        minWidth={['320px', '512px', '661px', null, null]}
        bg="blue.700"
        borderRadius="0"
        borderColor="yellow.500"
        py={6}
      >
        <ShopNavigation />
      </MenuList>
    </Menu>
  </Flex>
);

export { MobileMenu as default };
