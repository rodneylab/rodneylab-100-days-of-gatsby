import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { InternalLink } from './Link';

import AudioCore from './Brand';

const HeaderLogo = () => (
  <Flex>
    <InternalLink ariaLabel="Open Audio Core home page" to="/home/" variant="header">
      <Heading size="xl" my="2">
        <AudioCore />
      </Heading>
    </InternalLink>
  </Flex>
);

export { HeaderLogo as default };
