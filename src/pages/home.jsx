import React, { useState } from 'react';
import {
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
          <Heading as="h1" size="xl">
            <AudioCore />
            {' '}
            &mdash; headphones sharing
          </Heading>
          {/* <Box>
            <Grid templateColumns="repeat(5, 1fr)">
              <Box w="100%" h="10" bg="blue.800" color="white">
                blue.800
              </Box>
              <Box w="100%" h="10" bg="blue.700" color="white">
                blue.700
              </Box>
              <Box w="100%" h="10" bg="pink.200" color="white">
                pink.200
              </Box>
              <Box w="100%" h="10" bg="pink.100" color="white">
                pink.100
              </Box>
              <Box w="100%" h="10" bg="yellow.500" color="white">
                yellow.500
              </Box>
            </Grid>
          </Box> */}
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
  }
`;

export { Home as default };
