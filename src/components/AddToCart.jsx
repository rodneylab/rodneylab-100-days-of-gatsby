import React, { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { StoreContext } from '../context/StoreContext';

const AddToCart = ({
  variantId, quantity, available, ...props
}) => {
  const { addVariantToCart, loading } = useContext(StoreContext);

  return (
    <Button
      onClick={(event) => {
        event.preventDefault();
        addVariantToCart(variantId, quantity);
      }}
      disabled={!available || loading}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {available ? 'Add to Cart' : 'Currently out of Stock'}
    </Button>
  );
};

AddToCart.propTypes = {
  variantId: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  available: PropTypes.bool.isRequired,
};

export { AddToCart as default };
