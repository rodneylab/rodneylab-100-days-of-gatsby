import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Footer from '../../components/Footer';
import { PureHeader as Header } from '../../components/Header';

const LocationTemplate = ({ data }) => (
  <>
    <Header data={data} />
    <h1>{`AudioC0RE in ${data.contentfulLocation.city}`}</h1>
    <Footer />
  </>
);

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
    contentfulLocation(id: { eq: $id }) {
      city
    }
    allContentfulLocation {
      ...HeaderFragment
    }
  }
`;

export { LocationTemplate as default };
