import React from 'react';
import { Badge, IconButton, Stack } from '@chakra-ui/react';
import { FiShoppingCart } from '@react-icons/all-files/fi/FiShoppingCart';
import PropTypes from 'prop-types';

import { isBrowser } from '../utils/utils';

const CartButton = ({ quantity, btnRef, onOpen }) => (
  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={3} ml={4}>
    <IconButton
      aria-label={`Shopping cart with ${quantity} items`}
      icon={<FiShoppingCart />}
      variant="ghost"
      ref={btnRef}
      onClick={onOpen}
    />
    {' '}
    <Badge
      height="24px"
      width="24px"
      borderRadius="full"
      p={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {quantity}
    </Badge>
  </Stack>
);

CartButton.defaultProps = {
  btnRef: null,
};

CartButton.propTypes = {
  btnRef: isBrowser
    ? PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ])
    : PropTypes.func,
  onOpen: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

export { CartButton as default };
