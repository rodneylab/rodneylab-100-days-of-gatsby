import React, { useContext } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import formatPrice from '../utils/shop';
import { isBrowser } from '../utils/utils';
import LineItem from './LineItem';
import Spacer from './Spacer';
import { StoreContext } from '../context/StoreContext';

const TableHeading = ({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Box fontSize="18px" fontWeight="medium" {...rest}>
    {children}
  </Box>
);

TableHeading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const CalcText = ({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Box textTransform="uppercase" letterSpacing="wider" fontWeight="medium" {...rest}>
    {children}
  </Box>
);

CalcText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const Cart = ({ isOpen, onClose, btnRef }) => {
  const { checkout, loading } = useContext(StoreContext);
  const emptyCart = checkout.lineItems.length === 0;
  const isDemoStore = process.env.GATSBY_DEMO_STORE === 'true';

  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="lg" color="blue.800">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>
          <DrawerBody>
            {emptyCart ? (
              <Text textAlign="center" fontSize="18px">
                Your cart is empty
              </Text>
            ) : (
              <>
                <Grid templateColumns="1fr 70px 70px" gap={6}>
                  <TableHeading>Product</TableHeading>
                  <TableHeading>Qty.</TableHeading>
                  <TableHeading textAlign="right">Remove</TableHeading>
                  <Divider as={GridItem} colSpan="3" />
                  {checkout.lineItems.map((item) => (
                    <LineItem item={item} key={item.id} />
                  ))}
                </Grid>
                <Divider my={6} />
                <Grid templateColumns="auto 150px" textAlign="right">
                  <CalcText>Subtotal:</CalcText>
                  <div>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount,
                    )}
                  </div>
                  <CalcText>VAT:</CalcText>
                  <div>
                    {formatPrice(
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount,
                    )}
                  </div>
                  <CalcText>Shipping:</CalcText>
                  <div>Free</div>
                  <Divider as={GridItem} my={6} colSpan="2" />
                  <CalcText fontSize="18px" fontWeight="bold">
                    Total Price:
                  </CalcText>
                  <Box fontSize="18px" fontWeight="bold">
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount,
                    )}
                  </Box>
                  <Spacer as={GridItem} colSpan="2" axis="vertical" size={6} />
                  {isDemoStore ? (
                    <Button gridColumn="span 2/span 2" disabled borderColor="blue.800">
                      Demo Shop
                      {' '}
                      {'\u2014'}
                      {' '}
                      Checkout Disabled
                    </Button>
                  ) : (
                    <Button
                      gridColumn="span 2/span 2"
                      onClick={handleCheckout}
                      disabled={loading}
                      rightIcon={<ArrowForwardIcon />}
                    >
                      Checkout
                    </Button>
                  )}
                </Grid>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

Cart.defaultProps = {
  btnRef: null,
};
Cart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  btnRef: isBrowser
    ? PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ])
    : PropTypes.func,
};
export { Cart as default };
