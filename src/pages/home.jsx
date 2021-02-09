import React, { useState } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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
import { PurePageHeader as PageHeader } from '../components/PageHeader';

const Home = ({ data, location }) => {
  const [redirectedFromContactForm, setRedirectedFromContactForm] = useState(
    location?.state?.formSubmitted,
  );
  const {
    isOpen: showThankYouModal,
    onOpen: onOpenThankYouModal,
    onClose: onCloseThankYouModal,
  } = useDisclosure();

  if (redirectedFromContactForm) {
    setRedirectedFromContactForm(false);
    onOpenThankYouModal();
  }

  const mainImageData = data.mainImage.localFile;
  return (
    <>
      <PageHeader data={data} pageTitle="Home" />
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
          <Heading as="h1" size="xl" my="4">
            <AudioCore />
            {' '}
            &mdash; headphones sharing
          </Heading>
          <GatsbyImage image={getImage(mainImageData)} alt="Audo core headphones" width={992} />
          <Flex>
            <Heading as="h1" size="xl" ml="auto" my="4">
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
};

Home.defaultProps = {
  location: { state: { formSubmitted: false } },
};

Home.propTypes = {
  data: PropTypes.shape({
    allContentfulLocation: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          city: PropTypes.string,
          slug: PropTypes.string,
        }),
      ),
    }),
    mainImage: PropTypes.shape({
      localFile: PropTypes.shape,
    }).isRequired,
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
      ...PageHeaderFragment
    }
    allContentfulLocation {
      ...HeaderFragment
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
  }
`;

export { Home as default };
