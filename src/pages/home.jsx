import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { Heading } from '@chakra-ui/react';
import { PureLayout as Layout } from '../components/Layout';
import { PurePageHeader as PageHeader } from '../components/PageHeader';

const Home = ({ data }) => (
  <>
    <PageHeader data={data} pageTitle="Home" />
    <Layout data={data}>
      <main>
        <Heading>Home</Heading>
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
