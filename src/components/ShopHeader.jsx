import React, { useContext, useRef } from 'react';
import { Flex, Spacer, useMediaQuery } from '@chakra-ui/react';

import Cart from './Cart';
import CartButton from './CartButton';
import HeaderLogo from './HeaderLogo';
import MobileMenu from './MobileMenu';
import ShopNavigation from './ShopNavigation';
import LocalSpacer from './Spacer';
import { StoreContext } from '../context/StoreContext';

const ShopHeader = () => {
  const {
    isOpen, onClose, onOpen, checkout,
  } = useContext(StoreContext);
  const [isMobile] = useMediaQuery('(max-width: 768px');
  const btnRef = useRef();

  const items = checkout ? checkout.lineItems : [];

  const quantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Cart isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex bg="blue.700" justify="center">
        <Flex
          w="100%"
          color="white"
          position="fixed"
          zIndex="docked"
          height="navigationHeight"
          bg="blue.700"
        >
          <Flex maxW="6xl" w="100%" mx="auto" px={4}>
            <HeaderLogo />
            <Spacer />
            <Flex>
              {isMobile ? (
                <MobileMenu quantity={quantity} btnRef={btnRef} onOpen={onOpen} />
              ) : (
                <>
                  <ShopNavigation />
                  <CartButton quantity={quantity} onOpen={onOpen} btnRef={btnRef} />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <LocalSpacer size="74px" axis="vertical" />
    </>
  );
};

export { ShopHeader as default };
