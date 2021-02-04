import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import Footer from './Footer';
import { PureHeader as Header } from './Header';

export const PureLayout = ({ children, data }) => (
  <Flex flexDirection="column">
    <Box w="100%">
      <Header data={data} w="100%" />
    </Box>
    <Flex
      bg="yellow.500"
      color="blue.500"
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      minH="100vh"
      w="100%"
    >
      {children}
    </Flex>
    <Box w="100%">
      <Footer />
    </Box>
  </Flex>
);

PureLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  data: PropTypes.shape({
    allContentfulLocation: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          city: PropTypes.string,
          slug: PropTypes.string,
        }),
      ),
    }),
  }).isRequired,
};

const Layout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query LayoutQuery {
        allContentfulLocation {
          ...HeaderFragment
        }
      }
    `,
  );
  return <PureLayout data={data}>{children}</PureLayout>;
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export { Layout as default };
