import React from 'react';
import { Flex } from '@chakra-ui/react';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import Footer from './Footer';
import { PureHeader as Header } from './Header';

export const PureLayout = ({ children, data }) => (
  <Flex flexDirection="column">
    <Flex bg="blue.700" justify="center">
      <Flex maxW="6xl" w="100%">
        <Header data={data} />
      </Flex>
    </Flex>
    <Flex bg="yellow.500" justify="center" w="100%">
      <Flex
        flexDirection="column"
        bg="yellow.500"
        color="blue.500"
        align="center"
        justify="start"
        minH="67vh"
        maxW={['3xl', '3xl', '3xl', '6xl', '6xl']}
        w="100%"
      >
        {children}
      </Flex>
    </Flex>
    <Flex w="100%" bg="blue.800" justify="center">
      <Flex bg="blue.800" color="white" maxW="6xl" w="100%">
        <Footer />
      </Flex>
    </Flex>
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
