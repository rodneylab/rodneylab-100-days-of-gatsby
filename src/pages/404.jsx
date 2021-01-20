import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import { ConfusedFaceEmoji } from '../components/Emoji';
import { H_ELLIPSIS_ENTITY } from '../constants/entities';
import { PureLayout as Layout } from '../components/Layout';

export const PurePageNotFound = ({ data }) => (
  <Layout data={data}>
    <h1>
      Not sure that page exists
      {' '}
      <ConfusedFaceEmoji />
      {' '}
      {H_ELLIPSIS_ENTITY}
    </h1>
    <p>
      Go to
      {' '}
      <Link aria-label="Go to home page" to="/home/">
        home page
      </Link>
      {' '}
      instead?
    </p>
  </Layout>
);

PurePageNotFound.propTypes = {
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

export const PageNotFound = () => {
  const data = useStaticQuery(
    graphql`
      query PageNotFoundQuery {
        allContentfulLocation {
          ...HeaderFragment
        }
      }
    `,
  );
  return <PurePageNotFound data={data} />;
};

export { PageNotFound as default };
