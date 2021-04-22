import React from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Spacer = ({ size, axis, ...rest }) => {
  const width = axis === 'vertical' ? '1px' : size;
  const height = axis === 'horizontal' ? '1px' : size;

  return (
    <Box
      as="span"
      width={width}
      height={height}
      minWidth={width}
      minHeight={height}
      display="block"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};

Spacer.propTypes = {
  size: PropTypes.string.isRequired,
  axis: PropTypes.string.isRequired,
};

export { Spacer as default };
