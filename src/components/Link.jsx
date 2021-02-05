import React from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, useStyleConfig } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function CustomLink({
  children, ariaLabel, href, target, rel, isExternal, variant,
}) {
  const styles = useStyleConfig('Link', { variant });
  return (
    <Link
      sx={styles}
      aria-label={ariaLabel}
      href={href}
      target={target}
      rel={rel}
      isExternal={isExternal}
    >
      {children}
    </Link>
  );
}

CustomLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  href: PropTypes.string.isRequired,
  isExternal: PropTypes.bool.isRequired,
  target: PropTypes.string.isRequired,
  rel: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export const ExternalLink = ({
  ariaLabel, to, targetBlank, text, variant,
}) => (
  <>
    {targetBlank ? (
      <CustomLink
        ariaLabel={ariaLabel}
        href={to}
        target="_blank"
        rel="nofollow noopener noreferrer"
        isExternal
        variant={variant}
      >
        {text}
        {' '}
        <ExternalLinkIcon />
      </CustomLink>
    ) : (
      <CustomLink
        ariaLabel={ariaLabel}
        href={to}
        rel="noopener"
        isExternal={false}
        variant={variant}
      >
        {text}
        {' '}
        <ExternalLinkIcon />
      </CustomLink>
    )}
  </>
);

ExternalLink.defaultProps = {
  targetBlank: true,
  variant: 'main',
};

ExternalLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  targetBlank: PropTypes.bool,
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

export const InternalLink = ({
  children, ariaLabel, to, variant,
}) => (
  <CustomLink ariaLabel={ariaLabel} href={to} variant={variant}>
    {children}
  </CustomLink>
);

InternalLink.defaultProps = {
  variant: 'main',
};

InternalLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  to: PropTypes.string.isRequired,
  variant: PropTypes.string,
};
