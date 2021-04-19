import React from 'react';
import { getSrc } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import { Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { PureLayout as Layout } from '../../components/Layout';
import { PureSEO as SEO } from '../../components/SEO/SEO';

export default function Location({ data }) {
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
    pageTitle: 'Locations',
    seoMetaDescription:
      'AudioC0re: headhones sharing... share your core. Find your nearest AudioC0re hub.',
    title,
    url: `${siteUrl}/home/location/`,
  };
  return (
    <>
      <SEO data={data} pageMetadata={pageMetadata} />
      <Layout data={data}>
        <main>
          <Heading as="h1" size="xl">
            Locations
          </Heading>
        </main>
      </Layout>
    </>
  );
}

Location.propTypes = {
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
  query LocationQuery {
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
