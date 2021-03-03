import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Twitter = ({
  isArticle,
  seoMetadata: {
    author, featuredImageAlt, timeToRead, seoMetaDescription, siteUrl, title, twitterImage,

  },
  image,
  twitterUsername,
  twitterCardType,
}) => {
  if (isArticle) {
    return (
      <Helmet>
        <meta name="twitter:card" content={twitterCardType} />
        {twitterUsername && <meta name="twitter:site" content={twitterUsername} />}
        {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={author} />
        <meta name="twitter:label2" content="Estimated reading time" />
        <meta name="twitter:data2" content={timeToRead} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={seoMetaDescription} />
        <meta name="twitter:image" content={`${siteUrl}${twitterImage.url}`} />
        <meta name="twitter:image:alt" content={twitterImage.alt} />
      </Helmet>
    );
  }
  return (
    <Helmet>
      <meta name="twitter:card" content={twitterCardType} />
      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
      {twitterUsername && <meta name="twitter:site" content={twitterUsername} />}
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={seoMetaDescription} />
      <meta name="twitter:image" content={`${siteUrl}${image.url}`} />
      <meta name="twitter:image:alt" content={featuredImageAlt} />
    </Helmet>
  );
};

export default Twitter;

Twitter.defaultProps = {
  isArticle: false,
  twitterCardType: 'summary_large_image',
  twitterUsername: null,
};

Twitter.propTypes = {
  isArticle: PropTypes.bool,
  seoMetadata: PropTypes.shape({
    author: PropTypes.string,
    featuredImageAlt: PropTypes.string,
    seoMetaDescription: PropTypes.string,
    siteUrl: PropTypes.string,
    timeToRead: PropTypes.number,
    title: PropTypes.string,
    twitterImage: PropTypes.shape({
      alt: PropTypes.string,
      url: PropTypes.string,
    }),
  }).isRequired,
  image: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  twitterCardType: PropTypes.string,
  twitterUsername: PropTypes.string,
};
