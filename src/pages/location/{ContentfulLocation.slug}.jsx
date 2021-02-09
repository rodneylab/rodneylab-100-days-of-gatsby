import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import { Flex, Heading, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import { PurePageHeader as PageHeader } from '../../components/PageHeader';

const LocationTemplate = ({ data }) => {
  const {
    bannerImage, city, imageAlt, imageCredit, imageCreditLink,
  } = data.contentfulLocation;
  const bannerImageData = bannerImage.localFile;

  return (
    <>
      <PageHeader data={data} pageTitle={city} />
      <Layout data={data}>
        <main>
          <GatsbyImage image={getImage(bannerImageData)} alt={imageAlt} width={2000} />
          {imageCredit && (
            <Flex ml="auto">
              <Text>
                {imageCredit}
                :
                {' '}
                <a
                  aria-label="See the source of this image"
                  href={imageCreditLink}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  {imageCreditLink}
                </a>
              </Text>
            </Flex>
          )}
          <Flex mx={('0', '0', '0', '0', '4')} my="6">
            <Heading as="h1" size="xl">
              {`AudioC0RE in ${city}`}
            </Heading>
          </Flex>
        </main>
      </Layout>
    </>
  );
};

LocationTemplate.propTypes = {
  data: PropTypes.shape({
    contentfulLocation: PropTypes.shape({
      bannerImage: PropTypes.shape({
        localFile: PropTypes.shape,
      }),
      city: PropTypes.string,
      imageAlt: PropTypes.string,
      imageCredit: PropTypes.string,
      imageCreditLink: PropTypes.string,
    }),
    allContentfulLocation: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          city: PropTypes.string,
          slug: PropTypes.string,
        }),
      ),
    }),
  }).isRequired,
};

export const query = graphql`
  query LocationTemplateQuery($id: String) {
    site {
      ...PageHeaderFragment
    }
    contentfulLocation(id: { eq: $id }) {
      city
      imageAlt
      imageCredit
      imageCreditLink
      bannerImage {
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 1984
              layout: CONSTRAINED
              sizes: "(max-width: 480px) 480px, (max-width: 768px) 768px, 992px"
            )
          }
        }
      }
    }
    allContentfulLocation {
      ...HeaderFragment
    }
  }
`;

export { LocationTemplate as default };
