import React, { useState } from 'react';
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image';
import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import AudioCore from '../components/Brand';
import { H_ELLIPSIS_ENTITY } from '../constants/entities';
import { PureLayout as Layout } from '../components/Layout';
import { PureSEO as SEO } from '../components/SEO/SEO';

export default function Home({ data, location }) {
  const [redirectedFromContactForm, setRedirectedFromContactForm] = useState(
    location?.state?.formSubmitted,
  );
  const {
    isOpen: showThankYouModal,
    onOpen: onOpenThankYouModal,
    onClose: onCloseThankYouModal,
  } = useDisclosure();

  const { siteUrl, title } = data.site.siteMetadata;

  const pageMetadata = {
    faviconImage: {
      url: getSrc(data.faviconImage),
      width: 512,
      height: 512,
    },
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
    pageTitle: 'Home',
    seoMetaDescription:
      'AudioC0re: headhones sharing... share your core. Try AudioC0re in a city near you.',
    title,
    url: `${siteUrl}/home/`,
  };

  if (false && redirectedFromContactForm) {
    setRedirectedFromContactForm(false);
    onOpenThankYouModal();
  }

  const mainImageData = data.mainImage.localFile;
  return (
    <>
      <SEO data={data} pageMetadata={pageMetadata} />
      <Layout data={data}>
        <Modal isOpen={false || showThankYouModal} onClose={onCloseThankYouModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Message received!</ModalHeader>
            <ModalCloseButton />
            <ModalBody mb="4">
              Thanks for getting in touch. We normally respond within one working day.
            </ModalBody>
          </ModalContent>
        </Modal>
        <main>
          <Heading as="h1" size="xl" my="4" mx={[4, 4, 0, 0, 0]}>
            <AudioCore />
            {' '}
            &mdash;
            {' '}
            headphones sharing
          </Heading>
          <GatsbyImage image={getImage(mainImageData)} alt="Audo core headphones" width={992} />
          <Flex>
            <Heading as="h1" size="xl" ml="auto" my="4" mx={[4, 4, 0, 0, 0]}>
              {H_ELLIPSIS_ENTITY}
              share your c
              <span style={{ fontFamily: 'Fira Code' }}>0</span>
              re.
            </Heading>
          </Flex>
        </main>
      </Layout>
    </>
  );
}

Home.defaultProps = {
  location: { state: { formSubmitted: false } },
};

Home.propTypes = {
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
    mainImage: PropTypes.shape({
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          gatsbyImageData: PropTypes.shape({
            layout: PropTypes.string,
          }),
        }),
      }),
    }).isRequired,
    faviconImage: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        gatsbyImageData: PropTypes.shape({
          layout: PropTypes.string,
        }),
      }),
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
  location: PropTypes.shape({
    state: PropTypes.shape({
      formSubmitted: PropTypes.bool,
    }),
  }),
};

export const query = graphql`
  query HomeQuery {
    site {
      ...SEOFragment
    }
    allContentfulLocation {
      ...HeaderFragment
    }
    faviconImage: file(absolutePath: { regex: "//src/images/rodneylab-logo.png/" }) {
      ...FaviconImageFragment
    }
    featuredImage: contentfulAsset(localFile: {absolutePath: {regex: "/headphones\\.jpg*/"}}) {
      ...FeaturedImageFragment
    }
    mainImage: contentfulAsset(localFile: {absolutePath: {regex: "/headphones\\.jpg*/"}}) {
      localFile {
        childImageSharp {
          gatsbyImageData(
            width: 992
            layout: CONSTRAINED
            sizes: "(max-width: 480px) 480px, (max-width: 768px) 768px, 992px"
          )
        }
      }
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
