import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import Facebook from './Facebook';
import { PureSchemaOrg as SchemaOrg } from './SchemaOrg';
import Twitter from './Twitter';
import { VERTICAL_LINE_ENTITY } from '../../constants/entities';

export const PureSEO = ({ data, pageMetadata = null }) => {
  const {
    site: {
      buildTime,
      siteMetadata: {
        siteUrl,
        siteLanguage,
        ogLanguage,
        author,
        authorImage,
        twitterUsername,
        facebookAppId,
        facebookAuthorPage,
        facebookPage,
        siteTitle,
        siteTitleAlt,
      },
    },
  } = data;
  const { featuredImage } = pageMetadata;
  const seoMetadata = {
    author,
    authorImage,
    categories: pageMetadata.categories,
    dateModified: buildTime,
    datePublished: buildTime,
    facebookAuthorPage,
    facebookPage,
    featuredImage: pageMetadata.featuredImage,
    featuredImageAlt: pageMetadata.featuredImageAlt,
    seoMetaDescription: pageMetadata.seoMetaDescription,
    siteLanguage,
    siteTitle,
    siteTitleAlt,
    siteUrl,
    title: `${pageMetadata.pageTitle} ${VERTICAL_LINE_ENTITY} ${data.site.siteMetadata.title}`,
    url: pageMetadata.url,
  };

  const { faviconImage } = pageMetadata;
  const ogImage = pageMetadata.ogImage || featuredImage;
  const ogSquareImage = pageMetadata.ogSquareImage || ogImage;
  const twitterImage = pageMetadata.twitterImage || featuredImage;

  const homePageMetadata = faviconImage
    ? {
      faviconImage,
    }
    : null;

  return (
    <>
      <Helmet title={seoMetadata.title} htmlAttributes={{ lang: seoMetadata.siteLanguage }} />
      <Helmet>
        <meta name="description" content={seoMetadata.seoMetaDescription} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      </Helmet>
      <SchemaOrg data={data} seoMetadata={seoMetadata} homePageMetadata={homePageMetadata} />
      <Facebook
        seoMetadata={seoMetadata}
        image={ogImage}
        squareImage={ogSquareImage}
        ogLanguage={ogLanguage}
        facebookAppId={facebookAppId}
        facebookAuthorPage={facebookAuthorPage}
        facebookPage={facebookPage}
      />
      <Twitter seoMetadata={seoMetadata} image={twitterImage} twitterUsername={twitterUsername} />
    </>
  );
};

PureSEO.defaultProps = {
  pageMetadata: null,
  postMetadata: null,
  homePageMetadata: null,
};

PureSEO.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      buildTime: PropTypes.string.isRequired,
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string.isRequired,
        headline: PropTypes.string.isRequired,
        siteTitle: PropTypes.string,
        siteTitleAlt: PropTypes.string,
        siteLanguage: PropTypes.string.isRequired,
        ogLanguage: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        authorImage: PropTypes.string.isRequired,
        twitterUsername: PropTypes.string.isRequired,
        facebookAppId: PropTypes.string.isRequired,
        facebookAuthorPage: PropTypes.string.isRequired,
        facebookPage: PropTypes.string.isRequired,
        siteStructure: PropTypes.arrayOf(
          PropTypes.shape({
            categories: PropTypes.string,
            name: PropTypes.name,
            url: PropTypes.string,
          }),
        ),
        title: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  pageMetadata: PropTypes.shape({
    pageTitle: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    seoMetaDescription: PropTypes.string,
  }),
  postMetadata: PropTypes.shape({
    postTitle: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    seoMetaDescription: PropTypes.string,
    timeToRead: PropTypes.number.isRequired,
  }),
  homePageMetadata: PropTypes.shape({
    faviconImage: PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }),
};

export const faviconImageQuery = graphql`
  fragment FaviconImageFragment on File {
    childImageSharp {
      gatsbyImageData(width: 512, height: 512, layout: FIXED)
    }
  }
`;

export const featuredImageQuery = graphql`
  fragment FeaturedImageFragment on ContentfulAsset {
    localFile {
      childImageSharp {
        gatsbyImageData(width: 1350, height: 650, layout: FIXED)
      }
    }
  }
`;

export const ogImageQuery = graphql`
  fragment OGImageFragment on ContentfulAsset {
    localFile {
      childImageSharp {
        gatsbyImageData(width: 1200, height: 627, layout: FIXED)
      }
    }
  }
`;

export const ogSquareImageQuery = graphql`
  fragment OGSquareImageFragment on ContentfulAsset {
    localFile {
      childImageSharp {
        gatsbyImageData(width: 400, height: 400, layout: FIXED)
      }
    }
  }
`;

export const seoQuery = graphql`
  fragment SEOFragment on Site {
    buildTime(formatString: "YYYY-MM-DDTHH:mm:ssZ")
    modifiedTime: buildTime(formatString: "YYYY-MM-DDTHH:mm:ssZ")
    siteMetadata {
      title
      headline
      siteUrl
      siteLanguage
      ogLanguage
      author
      authorImage
      facebookAppId
      facebookAuthorPage
      facebookPage
      twitterUsername
    }
  }
`;

export const twitterImageQuery = graphql`
  fragment TwitterImageFragment on ContentfulAsset {
    localFile {
      childImageSharp {
        gatsbyImageData(width: 800, height: 418, layout: FIXED)
      }
    }
  }
`;

const query = graphql`
  query SEO {
    site {
      ...SEOFragment
    }
  }
`;

export const SEO = ({ children }) => {
  const data = useStaticQuery(query);
  return <PureSEO data={data}>{children}</PureSEO>;
};

SEO.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export { PureSEO as default };
