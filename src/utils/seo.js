import { getSrc } from 'gatsby-plugin-image';

export const getFeaturedImage = ({ image }) => ({
  url: getSrc(image.localFile),
  width: 992,
  height: 730,
});

export const getOgImage = ({ image }) => ({
  url: image ? getSrc(image) : null,
  width: 1200,
  height: 627,
});

export const getOgSquareImage = ({ image }) => ({
  url: image ? getSrc(image) : null,
  width: 400,
  height: 400,
});

export const getTwitterImage = ({ image }) => ({
  url: image ? getSrc(image) : null,
  width: 800,
  height: 418,
});
