import React from 'react';
import { Link } from 'gatsby';
import { Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { ConfusedFaceEmoji } from './Emoji';
import { H_ELLIPSIS_ENTITY } from '../constants/entities';
import { PureLayout as Layout } from './Layout';
import { PurePageHeader as PageHeader } from './PageHeader';

const PurePageNotFound = ({ data }) => (
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

export { PurePageNotFound as default };
