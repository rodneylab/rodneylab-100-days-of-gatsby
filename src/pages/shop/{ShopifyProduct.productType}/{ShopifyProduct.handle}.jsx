import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import AddToCart from '../../../components/AddToCart';
import Breadcrumbs from '../../../components/Breadcrumbs';
import formatPrice from '../../../utils/shop';
import {
  getFeaturedImage,
  getOgImage,
  getOgSquareImage,
  getTwitterImage,
} from '../../../utils/seo';
import { PureLayout as Layout } from '../../../components/Layout';
import { PureSEO as SEO } from '../../../components/SEO/SEO';
import { StoreContext } from '../../../context/StoreContext';
import { VERTICAL_LINE_ENTITY } from '../../../constants/entities';

export default function Product({ data, pageContext }) {
  const { product } = data;
  const {
    description,
    images,
    priceRange,
    title,
    variants: [initialVariant],
  } = product;
  const { handle, productType } = pageContext;
  const { client } = useContext(StoreContext);

  const [variant] = useState({ ...initialVariant });
  const productVariant = client.product.helpers.variantForOptions(product, variant) || variant;

  const [available, setAvailable] = useState(productVariant.availableForSale);
  const [quantity, setQuantity] = useState(1);

  const checkAvailability = useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result = fetchedProduct.variable.filter(
          (localVariant) => localVariant.id === productVariant.storefrontId,
        );

        if (result.length > 0) {
          setAvailable(result[0].available);
        }
      });
    },
    [productVariant.storefrontId, client.product],
  );

  useEffect(() => {
    checkAvailability(product.storefrontId);
  }, [productVariant.storefrontId, checkAvailability, product.storefrontId]);

  const price = formatPrice(
    priceRange.minVariantPrice.currencyCode,
    priceRange.minVariantPrice.amount,
  );

  const { siteUrl, title: seoTitle } = data.site.siteMetadata;
  const pageMetadata = {
    featuredImage: getFeaturedImage({ image: data.featuredImage.localFile }),
    ogImage: getOgImage({ image: data.ogImage.localFile }),
    ogSquareImage: getOgSquareImage({ image: data.ogSquareImage.localFile }),
    twitterImage: getTwitterImage({ image: data.twitterImage.localFile }),
    pageTitle: `${description} ${VERTICAL_LINE_ENTITY} AudioC0re Shop`,
    seoMetaDescription: 'AudioC0re Merchandise: show your appreciation for AudioC0re.',
    title: seoTitle,
    url: `${siteUrl}/home/about/`,
  };

  return (
    <>
      <SEO data={data} pageMetadata={pageMetadata} />
      <Layout data={data}>
        <Breadcrumbs
          items={[
            { name: 'Home', to: '/home/' },
            { name: 'AudioCore Shop', to: '/shop/' },
            { name: `AudioCore ${productType}`, to: `/shop/${productType.toLowerCase()}` },
            { name: title, to: `/shop/${productType.toLowerCase()}/${handle}` },
          ]}
        />
        <Flex as="main" direction="column" my={6}>
          <Heading as="h1" size="lg" mb={6}>
            {title}
          </Heading>
          <GatsbyImage
            objectFit="contain"
            alt={images[0].product.description}
            image={getImage(images[0].gatsbyImageData)}
          />
          <Text fontSize="lg" mt={6} mb={4}>{description}</Text>
          <Flex align="center" mb={4}>
            <Heading as="h2" size="md" mt={4} pl="auto" mr={2}>
              {price}
            </Heading>
            <FormControl id="quantity" as="fieldset" pr={2} mr={2} mt={4} w="100%">
              <FormLabel htmlFor="quantity">
                <VisuallyHidden>Quantity</VisuallyHidden>
              </FormLabel>
              <NumberInput
                onChange={(_, value) => setQuantity(value)}
                value={quantity}
                name="quantity"
                defaultValue={1}
                min={1}
                maxW={20}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <AddToCart
              type="submit"
              variantId={productVariant.storefrontId}
              quantity={quantity}
              available={available}
              mt={4}
            />
          </Flex>
        </Flex>
      </Layout>
    </>
  );
}

Product.propTypes = {
  pageContext: PropTypes.shape({
    handle: PropTypes.string,
    productType: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
    product: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      storefrontId: PropTypes.string,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          gatsbyImageData: PropTypes.shape({
            layout: PropTypes.string,
          }),
          product: PropTypes.shape({
            description: PropTypes.string,
          }),
        }),
      ),
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          values: PropTypes.arrayOf(PropTypes.string),
        }),
      ),
      variants: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
        }),
      ),
      priceRange: PropTypes.shape({
        minVariantPrice: PropTypes.shape({
          amount: PropTypes.string,
          currencyCode: PropTypes.string,
        }),
      }),
    }),
    suggestions: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          shopifyId: PropTypes.string,
          onlineStorePreviewUrl: PropTypes.string,
          title: PropTypes.string,
          images: PropTypes.arrayOf(
            PropTypes.shape({
              gatsbyImageData: PropTypes.shape({
                layout: PropTypes.string,
              }),
            }),
          ),
        }),
      ),
    }),
    featuredImage: PropTypes.shape({
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape({
            src: PropTypes.string,
            presentationWidth: PropTypes.number,
            presentationHeight: PropTypes.number,
          }),
        }),
      }),
    }),
    ogImage: PropTypes.shape({
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fixed: PropTypes.shape({
            src: PropTypes.string,
          }),
        }),
      }),
    }),
    ogSquareImage: PropTypes.shape({
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fixed: PropTypes.shape({
            src: PropTypes.string,
          }),
        }),
      }),
    }),
    twitterImage: PropTypes.shape({
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fixed: PropTypes.shape({
            src: PropTypes.string,
          }),
        }),
      }),
    }),
  }).isRequired,
};

export const query = graphql`
  query($id: String!) {
    site {
      ...SEOFragment
    }
    allContentfulLocation {
      ...HeaderFragment
    }
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      handle
      productType
      storefrontId
      options {
        id
        name
        values
      }
      images {
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640)
        product {
          description
        }
      }
      priceRange: priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
    }
    featuredImage: contentfulAsset(localFile: {absolutePath: {regex: "/headphones\\.jpg*/"}}) {
      ...FeaturedImageFragment
    }
    ogImage: contentfulAsset(localFile: {absolutePath: {regex: "/headphones\\.jpg*/"}}) {
      ...OGImageFragment
    }
    ogSquareImage: contentfulAsset(localFile: {absolutePath: {regex: "/headphones\\.jpg*/"}}) {
      ...OGSquareImageFragment
    }
    twitterImage: contentfulAsset(localFile: {absolutePath: {regex: "/headphones\\.jpg*/"}}) {
      ...TwitterImageFragment
    }
  }
`;
