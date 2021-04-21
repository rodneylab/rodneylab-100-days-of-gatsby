import React, { useRef } from 'react';
import {
  Drawer,
  DrawBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import CartButton from './CartButton';
import { isBrowser } from '../utils/utils';
import ShopNavigation from './ShopNavigation';

const MobileMenu = ({ quantity, btnRef, onOpen }) => {
  const { isOpen: isOpenMenu, onOpen: onOpenMenu, onClose: onCloseMenu } = useDisclosure();
  const menuRef = useRef();

  return (
    <>
      <Drawer
        isOpen={isOpenMenu}
        placement="right"
        onClose={onCloseMenu}
        finalFocusRef={menuRef}
        size="full"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawBody>
              <Stack as="nav" direction="column" fontSize="lg" alignItems="center">
                <CartButton quantity={quantity} onOpen={onOpen} btnRef={btnRef} />
                <ShopNavigation />
              </Stack>
            </DrawBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Button
        onClick={onOpenMenu}
        ref={menuRef}
        px={3}
        size="sm"
        aria-label={isOpenMenu ? 'Close menu' : 'Open menu'}
        justifySelf="flex-end"
        rightIcon={<HamburgerIcon />}
      >
        Menu
      </Button>
    </>
  );
};

MobileMenu.defaultProps = {
  btnRef: null,
};

MobileMenu.propTypes = {
  btnRef: isBrowser
    ? PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ])
    : PropTypes.func,
  onOpen: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

export { MobileMenu as default };
