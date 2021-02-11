require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const {
  CONTENTFUL_API_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
  FORMIUM_TOKEN,
  GATSBY_FORMIUM_PROJECTID,
} = process.env;

delete process.env.https_proxy;
delete process.env.HTTPS_PROXY;
delete process.env.http_proxy;
delete process.env.HTTP_PROXY;
// eslint-disable-next-line no-underscore-dangle
delete process.env._proxy;
const website = {
  title: 'AudioC0re',
  language: 'en-GB',
  background_color: '#011946',
  theme_color: '#fcd600',
  favicon: 'src/images/rodneylab-logo.png',
  siteUrl: 'https://rodneylab100daysofgatsbymain.gtsb.io',
};

module.exports = {
  siteMetadata: {
    author: 'AudioC0re',
    authorImage: '/src/images/rodneylab-logo.png',
    headline: 'Share your core',
    facebookAppId: '0912345678',
    facebookAuthorPage: 'askRodneyLab',
    facebookPage: 'rodneyLab',
    ogLanguage: 'en_GB',
    title: website.title,
    siteLanguage: website.language,
    siteUrl: 'https://rodneylab.com',
    twitterUsername: '@rodneylab',
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
    '@chakra-ui/gatsby-plugin',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'abc',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          placeholder: 'tracedSVG',
          formats: ['auto', 'webp', 'avif'],
          quality: 100,
          avifOptions: { lossless: true, quality: 100, speed: 0 },
          jpgOptions: { quality: 100, progressive: true },
          pngOptions: { quality: 100, compressionSpeed: 1 },
          webpOptions: { quality: 100 },
          tracedSVGOptions: {
            color: '#fcd600',
            background: '#022d5f',
          },
        },
        defaultQuality: 100,
        stripMetadata: false,
        useMozJpeg: true,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/rodneylab-logo.png',
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
    {
      resolve: 'gatsby-source-formium',
      options: {
        projectId: GATSBY_FORMIUM_PROJECTID,
        accessToken: FORMIUM_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: website.title,
        short_name: website.title,
        start_url: '/',
        background_color: website.background_color,
        theme_color: website.theme_color,
        display: 'standalone',
        icon: website.favicon,
        icon_options: {
          purpose: 'any maskable',
        },
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-preact',
  ],
};
