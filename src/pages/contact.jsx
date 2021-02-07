import React from 'react';
import { graphql, navigate } from 'gatsby';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { FormiumForm } from '@formium/react';
import PropTypes from 'prop-types';
import {
  EmailIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from 'react-share';

import { DESKTOP_BREAKPOINT } from '../constants/sizes';
import { ExternalLink } from '../components/Link';
import { PureLayout as Layout } from '../components/Layout';
import { PurePageHeader as PageHeader } from '../components/PageHeader';
import formiumComponents from '../components/FormiumComponents';
import { formium } from '../utils/form';
import { H_ELLIPSIS_ENTITY } from '../constants/entities';

const Contact = ({ pageContext: { slug }, data }) => {
  const [isDesktop] = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  const handleSubmit = async (values) => {
    await formium.submitForm(slug, values);
    navigate('/home/', { state: { formSubmitted: true } });
  };

  const ContactList = () => (
    <List>
      <ListItem>
        <Flex align="center" mb="4">
          <ListIcon as={() => <EmailIcon size={48} round />} />
          <Text color="yellow.500" ml="3">
            ask@rodneylab.com
          </Text>
        </Flex>
      </ListItem>
      <ListItem>
        <ExternalLink
          ariaLabel="Direct message Rodney Lab on twitter"
          to="https://twitter.com/messages/compose?recipient_id=1323579817258831875"
        >
          <Flex align="center" mb="4">
            <ListIcon as={() => <TwitterIcon size={48} round />} />
            <Text color="yellow.500" ml="3">
              @askRodney
            </Text>
          </Flex>
        </ExternalLink>
      </ListItem>
      <ListItem>
        <ExternalLink
          ariaLabel="Direct message Rodney Lab on Facebook Messenger"
          to="https://m.me/rodneyLab"
        >
          <Flex align="center" mb="4">
            <ListIcon as={() => <FacebookMessengerIcon size={48} round />} />
            <Text color="yellow.500" ml="3">
              rodneyLab
            </Text>
          </Flex>
        </ExternalLink>
      </ListItem>
      <ListItem>
        <ExternalLink ariaLabel="Message Rodney Lab on Telegram" to="https://t.me/askRodney">
          <Flex align="center" mb="4">
            <ListIcon as={() => <TelegramIcon size={48} round />} />
            <Text color="yellow.500" ml="3">
              askRodney
            </Text>
          </Flex>
        </ExternalLink>
      </ListItem>
      <ListItem>
        <ExternalLink
          ariaLabel="Reach out to Rodney Lab on Linked In"
          to="https://uk.linkedin.com/in/ask-rodney"
        >
          <Flex align="center" mb="4">
            <ListIcon as={() => <LinkedinIcon size={48} round />} />
            <Text color="yellow.500" ml="3">
              ask-rodney
            </Text>
          </Flex>
        </ExternalLink>
      </ListItem>
    </List>
  );

  if (isDesktop) {
    return (
      <>
        <PageHeader data={data} pageTitle="Contact" />
        <Layout data={data}>
          <Flex as="main" w="100%" justify="stretch" direction="column" color="yellow.500">
            <Grid templateColumns="1fr 40% 40% 1fr" templateRows="auto auto" py="12">
              <GridItem colSpan={1} rowSpan={1} />
              <GridItem bg="blue.700" colSpan={2} rowSpan={1}>
                <Heading as="h1" m="6">
                  We&apos;re waiting for your message
                  {H_ELLIPSIS_ENTITY}
                </Heading>
                <Box m="6">
                  <Text fontSize="xl" color="pink.200">
                    Reach out over social media or if your prefer fill out the little form. Either
                    way, we&apos;ll be in touch soon... usually within one working day.
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={1} rowSpan={1} />
              <GridItem colSpan={1} rowSpan={1} />
              <GridItem colSpan={1} height="100%" bg="blue.700">
                <Flex direction="column" bg="blue.700" align="center">
                  <Heading as="h2" size="lg" my="8">
                    Our accounts
                  </Heading>
                  <ContactList />
                </Flex>
              </GridItem>
              <GridItem colSpan={1}>
                <Flex bg="blue.700" w="100%" align="center" direction="column">
                  <Heading as="h2" size="lg" my="8">Contact form</Heading>
                  <Flex direction="column" align="stretch" w="100%" px="6" mb="6">
                    <FormiumForm
                      data={data.formiumForm}
                      onSubmit={handleSubmit}
                      components={formiumComponents}
                    />
                  </Flex>
                </Flex>
              </GridItem>
              <GridItem colSpan={1} rowSpan={1} />
            </Grid>
          </Flex>
        </Layout>
      </>
    );
  }

  return (
    <>
      <PageHeader data={data} pageTitle="Contact" />
      <Layout data={data}>
        <Flex direction="column" w="100%" color="yellow.500" px={[4, 4, 'auto', 4, 0]}>
          <Flex as="main" justify="flex-start" direction="column">
            <Grid templateColumns="1fr 80% 1fr" templateRows="auto" py="12">
              <GridItem colSpan={1} />
              <GridItem colSpan={1}>
                <Flex direction="column" bg="blue.700" align="center" pt="8">
                  <Heading as="h1" my="4">
                    Get in touch
                    {H_ELLIPSIS_ENTITY}
                  </Heading>
                  <ContactList />
                </Flex>
                <Flex bg="blue.700" w="100%" align="center" direction="column" pt="8">
                  <Heading as="h2" mb="4">Sound us out...</Heading>
                  <Flex direction="column" align="stretch" w="100%" px="6" mb="6">
                    <FormiumForm
                      data={data.formiumForm}
                      onSubmit={handleSubmit}
                      components={formiumComponents}
                    />
                  </Flex>
                </Flex>
              </GridItem>
              <GridItem colSpan={1} />
            </Grid>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

Contact.propTypes = {
  data: PropTypes.shape({
    allContentfulLocation: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          city: PropTypes.string,
          slug: PropTypes.string,
        }),
      ),
    }),
    formiumForm: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export const query = graphql`
  query ContactQuery($slug: String) {
    site {
      ...PageHeaderFragment
    }
    allContentfulLocation {
      ...HeaderFragment
    }
    formiumForm(slug: { eq: $slug }) {
      id
      createAt
      name
      projectId
      schema
      slug
      updateAt
      version
    }
  }
`;

export { Contact as default };
