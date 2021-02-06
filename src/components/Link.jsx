import React from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link as GatsbyLink } from 'gatsby';
import { Link, useStyleConfig } from '@chakra-ui/react';

import PropTypes from 'prop-types';

function CustomExternalLink({
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

CustomExternalLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  href: PropTypes.string.isRequired,
  isExternal: PropTypes.bool.isRequired,
  target: PropTypes.string.isRequired,
  rel: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

function CustomInternalLink({
  children, ariaLabel, href, variant,
}) {
  const styles = useStyleConfig('Link', { variant });
  return (
    <Link
      as={GatsbyLink}
      sx={styles}
      aria-label={ariaLabel}
      to={href}
    >
      {children}
    </Link>
  );
}

CustomInternalLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  href: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export const ExternalTextLink = ({
  ariaLabel, to, targetBlank, text, variant,
}) => (
  <>
    {targetBlank ? (
      <CustomExternalLink
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
      </CustomExternalLink>
    ) : (
      <CustomExternalLink
        ariaLabel={ariaLabel}
        href={to}
        target=""
        rel="noopener"
        isExternal={false}
        variant={variant}
      >
        {text}
        {' '}
        <ExternalLinkIcon />
      </CustomExternalLink>
    )}
  </>
);

ExternalTextLink.defaultProps = {
  targetBlank: true,
  variant: 'main',
};

ExternalTextLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  targetBlank: PropTypes.bool,
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

export const ExternalLink = ({
  children, ariaLabel, to, targetBlank, variant,
}) => (
  <>
    {targetBlank ? (
      <CustomExternalLink
        ariaLabel={ariaLabel}
        href={to}
        target="_blank"
        rel="nofollow noopener noreferrer"
        isExternal
        variant={variant}
      >
        {children}
      </CustomExternalLink>
    ) : (
      <CustomExternalLink
        ariaLabel={ariaLabel}
        href={to}
        target=""
        rel="noopener"
        isExternal={false}
        variant={variant}
      >
        {children}
        {' '}
      </CustomExternalLink>
    )}
  </>
);

ExternalLink.defaultProps = {
  targetBlank: true,
  variant: 'main',
};

ExternalLink.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  to: PropTypes.string.isRequired,
  targetBlank: PropTypes.bool,
  variant: PropTypes.string,
};

export const InternalLink = ({
  children, ariaLabel, to, variant,
}) => (
  <CustomInternalLink ariaLabel={ariaLabel} href={to} variant={variant}>
    {children}
  </CustomInternalLink>
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
