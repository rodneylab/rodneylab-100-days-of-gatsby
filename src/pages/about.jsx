import React from 'react';
import { getSrc } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import {
  Box, Flex, Heading, Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import AudioCore from '../components/Brand';
import { PureLayout as Layout } from '../components/Layout';
import { PureSEO as SEO } from '../components/SEO/SEO';

export default function About({ data }) {
  const { siteUrl, title } = data.site.siteMetadata;
  const pageMetadata = {
    featuredImage: {
      url: getSrc(data.featuredImage.localFile),
      width: 992,
      height: 730,
    },
    ogImage: {
      url: data.ogImage ? getSrc(data.ogImage.localFile) : null,
      width: 1200,
      height: 627,
    },
    ogSquareImage: {
      url: data.ogSquareImage ? getSrc(data.ogSquareImage.localFile) : null,
      width: 400,
      height: 400,
    },
    twitterImage: {
      url: data.twitterImage ? getSrc(data.twitterImage.localFile) : null,
      width: 800,
      height: 418,
    },
    pageTitle: 'About',
    seoMetaDescription: 'AudioC0re: headhones sharing... share your core. Learn about AudoC0re.',
    title,
    url: `${siteUrl}/home/about/`,
  };

  return (
    <>
      <SEO data={data} pageMetadata={pageMetadata} />
      <Layout data={data}>
        <Flex as="main" direction="column" w="100%" maxW="6xl" align="baseline" px="4">
          <Heading as="h1" size="xl" mt={6}>
            About
            {' '}
            <AudioCore />
          </Heading>
          <Box p={6} bg="blue.700" w="80%" mx="auto" mt={12}>
            <Text color="pink.100" fontSize="2xl">
              <AudioCore />
              {' '}
              offer headphone sharing in Cape Town, London and Rio de Janeiro. Get in
              touch now to start sharing.
            </Text>
          </Box>
        </Flex>
      </Layout>
    </>
  );
}

About.propTypes = {
  data: PropTypes.shape({
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
};

export const query = graphql`
  query AboutQuery {
    site {
      ...SEOFragment
    }
    allContentfulLocation {
      ...HeaderFragment
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
