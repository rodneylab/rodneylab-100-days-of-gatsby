import React from 'react';

const Footer = () => (
  <footer>
    Page created by
    {' '}
    <a
      aria-label="Open Rodney Lab contact page"
      href="https://rodneylab.com/contact"
      rel="nofollow noopener noreferrer"
    >
      Rodney Lab
    </a>
    {' '}
    as part of
    {' '}
    <a
      aria-label="See Rodney Lab post on the challenge"
      href="https://rodneylab.com/100-days-of-gatsby-code-2021/"
      rel="nofollow nopener noreferrer"
    >
      100 Days of Gatsby Code 2021
    </a>
    .
  </footer>
);

export { Footer as default };
