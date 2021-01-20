require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { CONTENTFUL_API_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = process.env;

delete process.env.https_proxy;
delete process.env.HTTPS_PROXY;
delete process.env.http_proxy;
delete process.env.HTTP_PROXY;
// eslint-disable-next-line no-underscore-dangle
delete process.env._proxy;

module.exports = {
  siteMetadata: {
    title: 'rodneylab-100-days-of-gatsby',
    siteLanguage: 'en-GB',
    siteUrl: 'https://rodneylab.com',
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: CONTENTFUL_API_ACCESS_TOKEN,
        environment: 'master',
        spaceId: CONTENTFUL_SPACE_ID,
        downloadLocal: true,
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'abc',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
};
