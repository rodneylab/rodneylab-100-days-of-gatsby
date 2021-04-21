import React, { useCallback, useContext, useState } from 'react';
import {
  Box,
  CloseButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

import formatPrice from '../utils/shop';
import { StoreContext } from '../context/StoreContext';

const LineItem = ({ item }) => {
  const {
    removeLineItem, checkout, updateLineItem, loading,
  } = useContext(StoreContext);

  const [quantity, setQuantity] = useState(item.quantity);
  const variantImage = item.variant.image;
  const price = formatPrice(item.variant.priceV2.currencyCode, item.variant.price);

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id);
  };

  const uli = debounce((value) => updateLineItem(checkout.id, item.id, value), 300);

  const debouncedUli = useCallback((value) => uli(value), []);

  const handleQuantityChange = (value) => {
    if (loading) {
      return;
    }
    const safeValue = Math.max(value, 1);

    setQuantity(safeValue);
    debouncedUli(safeValue);
  };

  const image = variantImage ? (
    <img
      src={variantImage.src}
      alt={variantImage.altText ? variantImage.altText : `Product image of ${item.title}`}
    />
  ) : null;

  return (
    <>
      <Stack direction="row" spacing={6}>
        <Box minWidth="65px" width="65px" p={1} alignSelf="flex-start">
          {image}
        </Box>
        <Stack direction="column" spacing={2}>
          <Box fontSize="18px" fontWeight="medium">
            {item.title}
          </Box>
          <Box>
            {item.variant.title === 'Default Title' ? '' : `${item.variant.title},`}
            {' '}
            {price}
          </Box>
        </Stack>
      </Stack>
      <Stack alignItems="flex-start">
        <NumberInput
          onChange={(_, value) => handleQuantityChange(value)}
          value={quantity}
          aria-label="Quantity"
          defaultValue={quantity}
          min={1}
          size="sm"
          maxW="70px"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
      <CloseButton
        justify-self="center"
        alignSelf="flex-start"
        aria-label="Remove"
        onClick={handleRemove}
      />
    </>
  );
};

LineItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    quantity: PropTypes.number,
    title: PropTypes.string,
    variant: PropTypes.shape({
      price: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.shape({
        altText: PropTypes.string,
        src: PropTypes.string,
      }),
      priceV2: PropTypes.shape({
        currencyCode: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export { LineItem as default };
