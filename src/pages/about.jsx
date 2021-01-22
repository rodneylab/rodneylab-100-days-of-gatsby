import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { PureLayout as Layout } from '../components/Layout';
import { PurePageHeader as PageHeader } from '../components/PageHeader';

const About = ({ data }) => (
  <>
    <PageHeader data={data} pageTitle="About" />
    <Layout data={data}>
      <h1>About</h1>
    </Layout>
  </>
);

About.propTypes = {
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
  query AboutQuery {
    site {
      ...PageHeaderFragment
    }
    allContentfulLocation {
      ...HeaderFragment
    }
  }
`;

export { About as default };
