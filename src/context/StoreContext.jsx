import React, { createContext, useEffect, useState } from 'react';
import fetch from 'isomorphic-fetch';
import Client from 'shopify-buy';
import PropTypes from 'prop-types';
import { useDisclosure } from '@chakra-ui/react';

import { isBrowser } from '../utils/utils';
import { localStorageKey } from '../utils/shop';

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
  },
  fetch,
);

const defaultValues = {
  cart: [],
  isOpen: false,
  loading: false,
  onOpen: () => {},
  onClose: () => {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  client,
  checkout: {
    linkItems: [],
  },
};

export const StoreContext = createContext(defaultValues);

export const StoreProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkout, setCheckout] = useState(defaultValues.checkout);
  const [loading, setLoading] = useState(false);

  const setCheckoutItem = (checkoutParameter) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkoutParameter.id);
    }

    setCheckout(checkoutParameter);
  };

  useEffect(() => {
    const initilaizeCheckout = async () => {
      const existingCheckoutID = isBrowser ? localStorage.getItem(localStorageKey) : null;

      if (existingCheckoutID && existingCheckoutID !== 'null') {
        try {
          const existingCheckout = await client.checkout.fetch(existingCheckoutID);
          if (!existingCheckoutID.completedAt) {
            setCheckoutItem(existingCheckout);
            return;
          }
        } catch (error) {
          localStorage.setItem(localStorageKey, null);
        }
      }

      const newCheckout = await client.checkout.create();
      setCheckoutItem(newCheckout);
    };

    initilaizeCheckout();
  }, []);

  const addVariantToCart = (variantId, quantity) => {
    setLoading(true);

    const checkoutID = checkout.id;

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    return client.checkout.addLineItems(checkoutID, lineItemsToUpdate).then((result) => {
      setCheckout(result);
      setLoading(false);
    });
  };

  const removeLineItem = (checkoutID, lineItemID) => {
    setLoading(true);

    return client.checkout.removeLineItems(checkoutID, [lineItemID]).then((result) => {
      setCheckout(result);
      setLoading(false);
    });
  };

  const updateLineItem = (checkoutID, lineItemID, quantity) => {
    setLoading(true);

    const lineItemsToUpdate = [
      {
        id: lineItemID,
        quantity: parseInt(quantity, 10),
      },
    ];

    return client.checkout.updateLineItems(checkoutID, lineItemsToUpdate).then((result) => {
      setCheckout(result);
      setLoading(false);
    });
  };

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
