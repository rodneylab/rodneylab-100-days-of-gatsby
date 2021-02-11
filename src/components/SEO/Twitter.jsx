import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Twitter = ({
  seoMetadata: {
    author, featuredImageAlt, seoMetaDescription, siteUrl, title,
  },
  image,
  twitterUsername,
  twitterCardType,
}) => (
  <>
    <Helmet>
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={seoMetaDescription} />
      <meta name="twitter:image" content={`${siteUrl}${image.url}`} />
      <meta name="twitter:image:alt" content={featuredImageAlt} />
      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
      {twitterUsername && <meta name="twitter:site" content={twitterUsername} />}
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={author} />
    </Helmet>
  </>
);

export default Twitter;

Twitter.defaultProps = {
  twitterCardType: 'summary_large_image',
  twitterUsername: null,
};

Twitter.propTypes = {
  seoMetadata: PropTypes.shape({
    author: PropTypes.string,
    featuredImageAlt: PropTypes.string,
    seoMetaDescription: PropTypes.string,
    siteUrl: PropTypes.string,
    timeToRead: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  image: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  twitterCardType: PropTypes.string,
  twitterUsername: PropTypes.string,
};
