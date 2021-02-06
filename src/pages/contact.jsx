import React from 'react';
import { graphql, navigate } from 'gatsby';
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
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

import { ExternalLink } from '../components/Link';
import { PureLayout as Layout } from '../components/Layout';
import { PurePageHeader as PageHeader } from '../components/PageHeader';
import formiumComponents from '../components/FormiumComponents';
import { formium } from '../utils/form';

const Contact = ({ pageContext: { slug }, data }) => {
  const handleSubmit = async (values) => {
    await formium.submitForm(slug, values);
    navigate('/home/', { state: { formSubmitted: true } });
  };

  return (
    <>
      <PageHeader data={data} pageTitle="About" />
      <Layout data={data}>
        <Flex direction="column" w="100%" px={[4, 4, 'auto', 4, 0]}>
          <Heading>Work in progress...</Heading>
          <Flex as="main" justify="flex-start" direction="column">
            <Heading as="h1" size="4xl">
              Get in touch...
            </Heading>
            <Grid templateColumns="1fr auto 1fr" templateRows="auto" color="yellow.500">
              <GridItem colSpan={1} />
              <GridItem colSpan={1}>
                <Flex bg="blue.700" justify="center">
                  <List>
                    <ListItem>
                      <Flex align="center">
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
                        <Flex align="center">
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
                        <Flex align="center">
                          <ListIcon as={() => <FacebookMessengerIcon size={48} round />} />
                          <Text color="yellow.500" ml="3">
                            rodneyLab
                          </Text>
                        </Flex>
                      </ExternalLink>
                    </ListItem>
                    <ListItem>
                      <ExternalLink
                        ariaLabel="Message Rodney Lab on Telegram"
                        to="https://t.me/askRodney"
                      >
                        <Flex align="center">
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
                        <Flex align="center">
                          <ListIcon as={() => <LinkedinIcon size={48} round />} />
                          <Text color="yellow.500" ml="3">
                            ask-rodney
                          </Text>
                        </Flex>
                      </ExternalLink>
                    </ListItem>
                  </List>
                </Flex>
                <Flex bg="blue.700" w="100%" align="center" direction="column">
                  <FormiumForm
                    data={data.formiumForm}
                    onSubmit={handleSubmit}
                    components={formiumComponents}
                  />
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
