import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { PureLayout as Layout } from '../../components/Layout';
import { PurePageHeader as PageHeader } from '../../components/PageHeader';

const Location = ({ data }) => (
  <>
    <PageHeader data={data} pageTitle="Locations" />
    <Layout data={data}>
      <main>
        <h1>Locations</h1>
      </main>
    </Layout>
  </>
);

Location.propTypes = {
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
  query LocationQuery {
    site {
      ...PageHeaderFragment
    }
    allContentfulLocation {
      ...HeaderFragment
    }
  }
`;

export { Location as default };
