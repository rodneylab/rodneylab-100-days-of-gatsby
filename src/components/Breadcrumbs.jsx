import React from 'react';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Breadcrumbs = ({ items }) => {
  const lastIndex = items.length - 1;

  return (
    <Breadcrumb my={4} px={4} w="100%" separator={<ArrowRightIcon boxSize={2} />}>
      {items.map((item, index) => (
        <BreadcrumbItem isCurrentPage={index === lastIndex}>
          <BreadcrumbLink as={Link} to={item.to}>
            <Text fontSize="lg">{item.name}</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      to: PropTypes.string,
    }),
  ).isRequired,
};

export { Breadcrumbs as default };
