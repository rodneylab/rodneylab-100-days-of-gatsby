import React from 'react';
import { graphql } from 'gatsby';
import { Container, Flex, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import AudioCore from '../../../components/Brand';
import Breadcrumbs from '../../../components/Breadcrumbs';
import {
  getFeaturedImage,
  getOgImage,
  getOgSquareImage,
  getTwitterImage,
} from '../../../utils/seo';
import ProductListing from '../../../components/ProductListing';
import { PureLayout as Layout } from '../../../components/Layout';
import { PureSEO as SEO } from '../../../components/SEO/SEO';
import ShopHeader from '../../../components/ShopHeader';
import { VERTICAL_LINE_ENTITY } from '../../../constants/entities';

export default function ProductTypeIndex({ data, pageContext: { productType } }) {
  const { siteUrl, title } = data.site.siteMetadata;
  const pageMetadata = {
    featuredImage: getFeaturedImage({ image: data.featuredImage.localFile }),
    ogImage: getOgImage({ image: data.ogImage.localFile }),
    ogSquareImage: getOgSquareImage({ image: data.ogSquareImage.localFile }),
    twitterImage: getTwitterImage({ image: data.twitterImage.localFile }),
    pageTitle: `${productType} ${VERTICAL_LINE_ENTITY} AudioC0re Shop`,
    seoMetaDescription: 'AudioC0re Merchandise: show your appreciation for AudioC0re.',
    title,
    url: `${siteUrl}/home/about/`,
  };

  return (
    <>
      <SEO data={data} pageMetadata={pageMetadata} />
      <ShopHeader />
      <Layout data={data} showHeader={false}>
        <Breadcrumbs
          items={[
            { name: 'Home', to: '/home/' },
            { name: 'AudioCore Shop', to: '/shop/' },
            { name: `AudioCore ${productType}`, to: `/shop/${productType.toLowerCase()}` },
          ]}
        />
        <Flex as="main" direction="column" w="100%" maxW="6xl" align="baseline" px="4">
          <Heading as="h1" size="lg">
            <AudioCore />
            {` Shop: ${productType}`}
          </Heading>
          <Container py={20}>
            <ProductListing products={data.products} />
          </Container>
        </Flex>
      </Layout>
    </>
  );
}

ProductTypeIndex.propTypes = {
  data: PropTypes.shape({
    products: PropTypes.shape({}),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
    allContentfulLocation: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          city: PropTypes.string,
          slug: PropTypes.string,
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
  pageContext: PropTypes.shape({
    productType: PropTypes.string,
  }).isRequired,
};

export const query = graphql`
  query($productType: String!) {
    site {
      ...SEOFragment
    }
    allContentfulLocation {
      ...HeaderFragment
    }
    products: allShopifyProduct(
      filter: { productType: { eq: $productType } }
      sort: { fields: publishedAt, order: ASC }
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
