import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import { VERTICAL_LINE_ENTITY } from '../constants/entities';

export const PurePageHeader = ({
  data: {
    site: {
      siteMetadata: { title, siteLanguage },
    },
  },
  pageTitle,
}) => (
  <>
    <Helmet
      title={`${title} ${VERTICAL_LINE_ENTITY} ${pageTitle}`}
      htmlAttributes={{ lang: siteLanguage }}
    />
    <Helmet>
      <meta name="description" content={`${title} ${pageTitle} page`} />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
    </Helmet>
  </>
);

PurePageHeader.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        siteLanguage: PropTypes.string,
      }),
    }),
  }).isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export const query = graphql`
  fragment PageHeaderFragment on Site {
    siteMetadata {
      title
      siteLanguage
    }
  }
`;

const PageHeader = ({ pageTitle }) => {
  const data = useStaticQuery(
    graphql`
      query PageHeaderQuery {
        site {
          ...PageHeaderFragment
        }
      }
    `,
  );
  return <PurePageHeader data={data} pageTitle={pageTitle} />;
};

PageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export { PageHeader as default };
