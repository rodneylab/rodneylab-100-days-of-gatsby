import React from 'react';
import { Box, Grid, Heading } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { ExternalLink } from '../components/Link';
import { PureLayout as Layout } from '../components/Layout';
import { PurePageHeader as PageHeader } from '../components/PageHeader';

const Home = ({ data }) => (
  <>
    <PageHeader data={data} pageTitle="Home" />
    <Layout data={data}>
      <main>
        <Heading as="h1" size="4xl">AudioC0RE &mdash; headphones sharing</Heading>
        <ExternalLink
          ariaLabel="Open Rodney Lab contact page"
          to="https://rodneylab.com/contact"
          text="Rodney Lab"
          targetBlank={false}
        />
        <Box>
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
        </Box>
      </main>
    </Layout>
  </>
);

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
