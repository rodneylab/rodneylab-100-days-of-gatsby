import * as React from 'react';
import { graphql, Link } from 'gatsby';
import {
  Box, Grid, Heading, Tag,
} from '@chakra-ui/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';

import formatPrice from '../utils/shop';

const ProductCard = ({
  product: {
    description, images, priceRange, slug, title,
  },
}) => {
  const price = formatPrice(
    priceRange.minVariantPrice.currencyCode,
    priceRange.minVariantPrice.amount,
  );
  return (
    <Link
      to={slug}
      aria-label={`View the ${description} product`}
      _hover={{ textDecoration: 'none', h2: { color: 'pink' } }}
      _focus={{
        boxShadow: 'none',
        "[data-name='product-image-box']": { boxShadow: 'outline' },
        h2: { color: 'blue' },
      }}
    >
      <Box>
        <GatsbyImage alt="" image={getImage(images[0].gatsbyImageData)} />
      </Box>
      <Grid templateColumns="auto auto" gap={6} mt={6}>
        <Heading as="h2" size="md">
          {title}
        </Heading>
        <Tag alignSelf="flex-start" justifySelf="flex-end" size="lg" bg="blue.700" color="pink.100">
          {price}
        </Tag>
      </Grid>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    slug: PropTypes.string,
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
  }).isRequired,
};

export const query = graphql`
  fragment ProductCardFragment on ShopifyProduct {
    shopifyId
    onlineStorePreviewUrl
    title
    slug: gatsbyPath(filePath: "/shop/{ShopifyProduct.productType}/{ShopifyProduct.handle}")
    images {
      gatsbyImageData(width: 640, aspectRatio: 1)
    }
    priceRange: priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

export { ProductCard as default };
