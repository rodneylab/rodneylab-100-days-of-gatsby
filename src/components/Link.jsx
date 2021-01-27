import React from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const ExternalLink = ({
  ariaLabel, to, targetBlank, text,
}) => (
  <>
    {targetBlank ? (
      <Link
        aria-label={ariaLabel}
        href={to}
        target="_blank"
        rel="nofollow noopener noreferrer"
        isExternal
      >
        {text}
        {' '}
        <ExternalLinkIcon />
      </Link>
    ) : (
      <Link
        aria-label="Open Rodney Lab contact page"
        href={to}
        rel="noopener"
        isExternal={false}
      >
        {text}
        {' '}
        <ExternalLinkIcon />
      </Link>
    )}
  </>
);

ExternalLink.defaultProps = {
  targetBlank: true,
};

ExternalLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  targetBlank: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export { ExternalLink as default };
