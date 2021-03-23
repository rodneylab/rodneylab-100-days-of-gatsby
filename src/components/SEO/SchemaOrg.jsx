import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import hash from 'object-hash';

export const PureSchemaOrg = ({
  seoMetadata: {
    author,
    authorImage,
    // categories,
    dateModified,
    datePublished,
    facebookPage,
    featuredImage,
    seoMetaDescription,
    siteLanguage,
    siteTitle,
    siteTitleAlt,
    siteUrl,
    title,
    url,
  },
  homePageMetadata = null,
}) => {
  // a cryptographic hash is not needed here so MD5 is fine even though, crytopgraphically, it may
  // not be considered secure
  const entityHash = hash({ author }, { algorithm: 'md5' });

  const schemaOrgWebsite = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteTitle,
    description: siteTitleAlt,
    publisher: {
      '@id': `${siteUrl}/#/schema/person/${entityHash}`,
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: `${siteUrl}/?s={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    ],
    inLanguage: siteLanguage,
  };

  const schemaOrgImageObject = {
    '@type': 'ImageObject',
    '@id': `${url}#primaryimage`,
    inLanguage: siteLanguage,
    url: featuredImage.url,
    width: featuredImage.width,
    height: featuredImage.height,
    caption: featuredImage.caption,
  };

  // let schemaOrgBreadcrumbList;

  // try {
  //   schemaOrgBreadcrumbList = {
  //     '@type': 'BreadcrumbList',
  //     '@id': `${url}#breadcrumb`,
  //     itemListElement: categories.map((_category, index, array) => {
  //       const path = array.slice(0, index + 1).join('/');
  //       const siteCategory = siteStructure.find((item) => item.categories === path);

  //       if (!siteCategory) {
  //         throw new Error(
  //         `Error finding categories in siteStructure:\nCategories: ${path}.\n
  // Add entry with categories set to: "${path}" to remove this error.`,
  //         );
  //       }

  //       const { name, url: categoryUrl } = siteCategory;
  //       return {
  //         '@type': 'ListItem',
  //         position: index + 1,
  //         item: {
  //           '@type': 'WebPage',
  //           '@id': `${siteUrl}/${categoryUrl}`,
  //           url: `${siteUrl}/${categoryUrl}`,
  //           name,
  //         },
  //       };
  //     }),
  //   };
  // } catch (error) {
  //   schemaOrgBreadcrumbList = null;
  // }

  const schemaOrgWebPage = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    primaryImageOfPage: {
      '@id': `${url}#primaryimage`,
    },
    datePublished,
    dateModified,
    description: seoMetaDescription,
    // breadcrumb: schemaOrgBreadcrumbList,
    inLanguage: siteLanguage,
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: [url],
      },
    ],
  };

  const schemaOrgPublisher = {
    '@type': ['Person', 'Organization'],
    '@id': `${siteUrl}/#/schema/person/${entityHash}`,
    name: author,
    image: {
      '@type': 'ImageObject',
      '@id': `${siteUrl}/#personlogo`,
      inLanguage: siteLanguage,
      url: authorImage,
      width: 512,
      height: 512,
      caption: author,
    },
    logo: {
      '@id': `${siteUrl}/#personlogo`,
    },
    sameAs: [facebookPage],
  };

  const schemaOrgEntity = homePageMetadata && {
    '@type': ['Person', 'Organization'],
    '@id': `${siteUrl}/#/schema/person/${entityHash}`,
    name: author,
    image: {
      '@type': 'ImageObject',
      '@id': `${siteUrl}/#personlogo`,
      inLanguage: siteLanguage,
      url: homePageMetadata.url,
      width: homePageMetadata.faviconImage.width,
      height: homePageMetadata.faviconImage.height,
      caption: author,
    },
    logo: {
      '@id': `${siteUrl}/#personlogo`,
    },
    sameAs: [facebookPage],
  };

  const schemaOrgArray = [
    schemaOrgEntity,
    schemaOrgWebsite,
    schemaOrgImageObject,
    schemaOrgWebPage,
    // schemaOrgBreadcrumbList,
    schemaOrgPublisher,
  ].filter((val) => val !== null);

  const schemaOrgObject = {
    '@context': 'https://schema.org',
    '@graph': schemaOrgArray,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaOrgObject)}</script>
    </Helmet>
  );
};

PureSchemaOrg.defaultProps = {
  data: null,
  homePageMetadata: null,
};

PureSchemaOrg.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteStructure: PropTypes.arrayOf(
          PropTypes.shape({
            categories: PropTypes.string,
            name: PropTypes.name,
            url: PropTypes.string,
          }),
        ),
      }),
    }),
  }),
  seoMetadata: PropTypes.shape({
    author: PropTypes.string.isRequired,
    authorImage: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    dateModified: PropTypes.string,
    datePublished: PropTypes.string,
    facebookPage: PropTypes.string,
    featuredImage: PropTypes.shape({
      caption: PropTypes.string,
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    seoMetaDescription: PropTypes.string,
    seoTitle: PropTypes.string,
    siteLanguage: PropTypes.string,
    siteTitle: PropTypes.string,
    siteTitleAlt: PropTypes.string,
    siteUrl: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  homePageMetadata: PropTypes.shape({
    faviconImage: PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }),
};

export const SchemaOrg = ({ seoMetadata, homePageMetadata = null }) => (
  <PureSchemaOrg seoMetadata={seoMetadata} homePageMetadata={homePageMetadata} />
);

SchemaOrg.defaultProps = {
  homePageMetadata: null,
};

SchemaOrg.propTypes = {
  seoMetadata: PropTypes.shape({
    author: PropTypes.string.isRequired,
    authorImage: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    dateModified: PropTypes.string,
    datePublished: PropTypes.string,
    facebookPage: PropTypes.string,
    featuredImage: PropTypes.shape({
      caption: PropTypes.string,
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    seoMetaDescription: PropTypes.string,
    seoTitle: PropTypes.string,
    siteLanguage: PropTypes.string,
    siteTitle: PropTypes.string,
    siteTitleAlt: PropTypes.string,
    siteUrl: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  homePageMetadata: PropTypes.shape({
    faviconImage: PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }),
};

export default SchemaOrg;
