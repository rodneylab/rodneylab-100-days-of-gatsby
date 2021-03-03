import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Facebook = ({
  seoMetadata: {
    dateModified,
    datePublished,
    featuredImageAlt,
    ogImage,
    ogSquareImage,
    seoMetaDescription,
    siteTitle,
    siteUrl,
    title,
    url,
  },
  ogLanguage,
  facebookAppId,
  facebookAuthorPage,
  facebookPage,
  isArticle,
}) => {
  if (isArticle) {
    return (
      <Helmet>
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <meta property="og:locale" content={ogLanguage} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={seoMetaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="article:publisher" content={facebookPage} />
        <meta property="article:author" content={facebookAuthorPage} />
        <meta property="article:published_time" content={datePublished} />
        <meta property="article:modified_time" content={dateModified} />
        <meta property="og:image" content={`${siteUrl}${ogImage.url}`} />
        <meta property="og:image:width" content={ogImage.width} />
        <meta property="og:image:height" content={ogImage.height} />
        <meta property="og:image:alt" content={ogImage.alt} />
        <meta property="og:image" content={`${siteUrl}${ogSquareImage.url}`} />
        <meta property="og:image:width" content={ogSquareImage.width} />
        <meta property="og:image:height" content={ogSquareImage.height} />
        <meta property="og:image:alt" content={ogSquareImage.alt} />
        <meta property="fb:app_id" content={facebookAppId} />
      </Helmet>
    );
  }

  return (
    <Helmet>
      {siteTitle && <meta property="og:site_name" content={siteTitle} />}
      <link rel="preconnect" href="https://www.facebook.com" />
      <link rel="preconnect" href="https://connect.facebook.net" />
      <link rel="dns-prefetch" href="https://www.facebook.com" />
      <link rel="dns-prefetch" href="https://connect.facebook.net" />
      <meta property="og:locale" content={ogLanguage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={seoMetaDescription} />
      <meta property="og:image" content={`${siteUrl}${ogImage.url}`} />
      <meta property="og:image:width" content={ogImage.width} />
      <meta property="og:image:height" content={ogImage.height} />
      <meta property="og:image:alt" content={featuredImageAlt} />
      <meta property="og:image" content={`${siteUrl}${ogSquareImage.url}`} />
      <meta property="og:image:width" content={ogSquareImage.width} />
      <meta property="og:image:height" content={ogSquareImage.height} />
      <meta property="og:image:alt" content={featuredImageAlt} />
      <meta property="fb:app_id" content={facebookAppId} />
    </Helmet>
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
    ogImage: PropTypes.shape({
      alt: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      url: PropTypes.string,
    }),
    ogSquareImage: PropTypes.shape({
      alt: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      url: PropTypes.string,
    }),
    seoMetaDescription: PropTypes.string,
    siteTitle: PropTypes.string,
    siteUrl: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  ogLanguage: PropTypes.string,
  facebookAppId: PropTypes.string.isRequired,
  facebookAuthorPage: PropTypes.string,
  facebookPage: PropTypes.string,
  isArticle: PropTypes.bool,
};

export default Facebook;
