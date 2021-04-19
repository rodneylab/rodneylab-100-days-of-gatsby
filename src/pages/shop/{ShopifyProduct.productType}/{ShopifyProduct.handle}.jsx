import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import isEqual from 'lodash.isequal';
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
import ProductListing from '../../../components/ProductListing';
import { PureLayout as Layout } from '../../../components/Layout';
import { PureSEO as SEO } from '../../../components/SEO/SEO';
import { StoreContext } from '../../../context/StoreContext';
import { VERTICAL_LINE_ENTITY } from '../../../constants/entities';

export default function Product({ data, pageContext }) {
  const { product, suggestions } = data;
  const {
    description,
    images,
    options,
    priceRange,
    title,
    variants,
    variants: [initialVariant],
  } = product;
  const { handle, productType } = pageContext;
  const { client } = useContext(StoreContext);

  const [variant, setVariant] = useState({ ...initialVariant });
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

  const handleOptionChange = (index, event) => {
    const { value } = event.target;

    if (value === '') {
      return;
    }

    const currentOptions = [...variant.selectedOptions];

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };

    const selectedVariant = variants.find((element) => isEqual(
      currentOptions, element.selectedOptions,
    ));

    setVariant({ ...selectedVariant });
  };

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

  const imageCount = images.length;
  const hasImages = imageCount > 0;
  const hasMultipleImages = imageCount > 1;

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
        <Flex as="main" direction="column" w="100%" maxW="6xl" align="baseline" px="4">
          <Box w="100%">
            <Container py={[16, 20, 28]} w="100%">
              <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)']} gap={[12, 20]} w="100%">
                <Stack spacing={[8, 16]} order={[2, null, 1]}>
                  <Stack spacing={4}>
                    <Heading as="h1">{title}</Heading>
                    <Text>{description}</Text>
                  </Stack>
                  <Stack spacing={0}>
                    <Heading as="h2">{price}</Heading>
                    <Flex as="form" noValidate direction="row" flexWrap="wrap">
                      <Stack as="fieldset" mr={6} mt={4} sx={{ input: { px: 2, py: 2 } }}>
                        {/* <label htmlFor="quantity">Quantity</label> */}
                        <FormControl id="quantity">
                          <FormLabel htmlFor="quantity">Quantity</FormLabel>
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
                      </Stack>
                      {variants.length > 1 ? (
                        <>
                          {options.map(({ id, name, values }, index) => (
                            <React.Fragment key={id}>
                              <Stack as="fieldset" mt={4} mr={6}>
                                <label htmlFor="variant">{name}</label>
                                <Select
                                  variant="filled"
                                  onChange={(event) => handleOptionChange(index, event)}
                                >
                                  <option value="">{`Choose ${name}`}</option>
                                  {values.map((value) => (
                                    <option value={value} key={`${name}-${value}`}>
                                      {value}
                                    </option>
                                  ))}
                                </Select>
                              </Stack>
                            </React.Fragment>
                          ))}
                        </>
                      ) : null}
                      <AddToCart
                        type="submit"
                        variantId={productVariant.storefrontId}
                        quantity={quantity}
                        available={available}
                        alignSelf="flex-end"
                        mt={4}
                      />
                    </Flex>
                  </Stack>
                </Stack>
                {hasImages ? (
                  <Box data-name="product-image-wrapper" position="relative">
                    <Box
                      role="group"
                      aria-label="gallery"
                      aria-describedby={hasMultipleImages ? 'instructions' : ''}
                      overflowX={hasMultipleImages ? 'scroll' : 'auto'}
                      tabIndex="0"
                      mb={2}
                      _focus={{ outline: 'none', boxShadow: 'outline' }}
                      sx={{
                        WebkitOverflowScrolling: 'touch',
                        '::-webkit-scrollbar': { height: '0.875rem' },
                        '::-webkit-scrollbar-track': {
                          backgroundColor: 'red',
                        },
                        '&hover + #instructions, &:focus + #instructions': {
                          display: 'block',
                        },
                      }}
                    >
                      <Flex as="ul">
                        {images.map((image, index) => (
                          <Box
                            as="li"
                            flex="0 0 100%"
                            display="flex"
                            whiteSpace="nowrap"
                            key={image.id}
                            p={6}
                          >
                            <GatsbyImage
                              objectFit="contain"
                              alt={`${image.product.description} image #${
                                index + 1
                              } out of ${imageCount}`}
                              image={getImage(image.gatsbyImageData)}
                            />
                          </Box>
                        ))}
                      </Flex>
                    </Box>
                    {hasMultipleImages ? (
                      <Box
                        id="instructions"
                        textAlign="center"
                        mt={1}
                        fontSize="18px"
                        display="none"
                        position="absolute"
                        left="50%"
                        transform="translate3d(-50%, 0px, 0px)"
                      >
                        <span aria-hidden>←</span>
                        {' '}
                        scroll for more
                        {' '}
                        <span aria-hidden>→</span>
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </Grid>
            </Container>
          </Box>
          {suggestions.nodes.length > 0 ? (
            <Container my={[20, 28]}>
              <Heading as="h2" mb={8} fontSize="3xl">
                More Products
              </Heading>
              <ProductListing products={suggestions} />
            </Container>
          ) : null}
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
  query($id: String!, $productType: String!) {
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
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCardFragment
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
