import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Facebook = ({
  seoMetadata: {
    dateModified,
    datePublished,
    featuredImageAlt,
    seoMetaDescription,
    siteTitle,
    siteUrl,
    title,
    url,
  },
  image,
  squareImage,
  ogLanguage,
  facebookAppId,
  facebookAuthorPage,
  facebookPage,
}) => {
  const type = 'website';
  return (
    <>
      <Helmet>
        {siteTitle && <meta property="og:site_name" content={siteTitle} />}
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <meta property="og:locale" content={ogLanguage} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={seoMetaDescription} />
        <meta property="og:image" content={`${siteUrl}${image.url}`} />
        <meta property="og:image:width" content={image.width} />
        <meta property="og:image:height" content={image.height} />
        <meta property="og:image:alt" content={featuredImageAlt} />
        <meta property="og:image" content={`${siteUrl}${squareImage.url}`} />
        <meta property="og:image:width" content={squareImage.width} />
        <meta property="og:image:height" content={squareImage.height} />
        <meta property="og:image:alt" content={featuredImageAlt} />
        <meta property="fb:app_id" content={facebookAppId} />
      </Helmet>
    </>
  );
};

Facebook.defaultProps = {
  facebookAuthorPage: '',
  facebookPage: '',
  isArticle: false,
  ogLanguage: 'en_GB',
};

Facebook.propTypes = {
  seoMetadata: PropTypes.shape({
    dateModified: PropTypes.string,
    datePublished: PropTypes.string,
    featuredImageAlt: PropTypes.string,
    seoMetaDescription: PropTypes.string,
    siteTitle: PropTypes.string,
    siteUrl: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  image: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  squareImage: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  ogLanguage: PropTypes.string,
  facebookAppId: PropTypes.string.isRequired,
  facebookAuthorPage: PropTypes.string,
  facebookPage: PropTypes.string,
};

export default Facebook;
