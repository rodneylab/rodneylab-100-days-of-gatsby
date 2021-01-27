import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import { PurePageHeader as PageHeader } from '../../components/PageHeader';

const LocationTemplate = ({ data }) => {
  const { city } = data.contentfulLocation;

  return (
    <>
      <PageHeader data={data} pageTitle={city} />
      <Layout data={data}>
        <main>
          <h1>{`AudioC0RE in ${city}`}</h1>
        </main>
      </Layout>
    </>
  );
};

LocationTemplate.propTypes = {
  data: PropTypes.shape({
    contentfulLocation: PropTypes.shape({
      city: PropTypes.string,
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
    }
    allContentfulLocation {
      ...HeaderFragment
    }
  }
`;

export { LocationTemplate as default };
