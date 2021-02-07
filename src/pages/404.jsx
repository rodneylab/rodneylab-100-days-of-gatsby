import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { ConfusedFaceEmoji } from '../components/Emoji';
import { H_ELLIPSIS_ENTITY } from '../constants/entities';
import { PureLayout as Layout } from '../components/Layout';
import { PurePageHeader as PageHeader } from '../components/PageHeader';

export const PurePageNotFound = ({ data }) => (
  <>
    <PageHeader data={data} pageTitle="Page not Found" />
    <Layout data={data}>
      <Heading as="h1" size="xl">
        Not sure that page exists
        {' '}
        <ConfusedFaceEmoji />
        {' '}
        {H_ELLIPSIS_ENTITY}
      </Heading>
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
  </>
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
        site {
          ...PageHeaderFragment
        }
        allContentfulLocation {
          ...HeaderFragment
        }
      }
    `,
  );
  return <PurePageNotFound data={data} />;
};

export { PageNotFound as default };
