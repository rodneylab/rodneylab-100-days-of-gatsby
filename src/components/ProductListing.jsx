import React from 'react';
import { Grid } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import ProductCard from './ProductCard';

const ProductListing = ({ products }) => (
  <Grid
    templateColumns={['1fr', 'repeat(2, 1fr)', null, 'repeat(3, 1fr)']}
    columnGap={6}
    rowGap={[12, 16, 20]}
  >
    {products.nodes.map((product) => (
      <ProductCard product={product} key={product.shopifyId} />
    ))}
  </Grid>
);

ProductListing.propTypes = {
  products: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        onlineStorePreviewUrl: PropTypes.string,
        title: PropTypes.string,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            gatsbyImageData: PropTypes.shape({
              layout: PropTypes.string,
            }),
          }),
        ),
        priceRange: PropTypes.shape({
          minVariantPrice: PropTypes.shape({
            amount: PropTypes.string,
            currencyCode: PropTypes.string,
          }),
        }),
      }),
    ),
  }).isRequired,
};

export { ProductListing as default };