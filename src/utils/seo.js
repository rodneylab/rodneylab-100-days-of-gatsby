import { getSrc } from 'gatsby-plugin-image';

export const getFeaturedImage = ({ featuredImage }) => ({
  url: getSrc(featuredImage.localFile),
  width: 992,
  height: 730,
});

export const getOgImage = ({ ogImage }) => ({
  url: ogImage ? getSrc(ogImage.localFile) : null,
  width: 1200,
  height: 627,
});

export const getOgSquareImage = ({ ogSquareImage }) => ({
  url: ogSquareImage ? getSrc(ogSquareImage.localFile) : null,
  width: 400,
  height: 400,
});

export const getTwitterImage = ({ twitterImage }) => ({
  url: twitterImage ? getSrc(twitterImage.localFile) : null,
  width: 800,
  height: 418,
});
