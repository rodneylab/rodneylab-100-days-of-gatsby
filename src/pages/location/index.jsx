import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { PureLayout as Layout } from '../../components/Layout';

const Location = ({ data }) => (
  <Layout data={data}>
    <h1>Locations</h1>
  </Layout>
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
    allContentfulLocation {
      ...HeaderFragment
    }
  }
`;

export { Location as default };
