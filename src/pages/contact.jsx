import React from 'react';
import { graphql } from 'gatsby';
import {
  Button, Flex, Heading, List, ListIcon, ListItem,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import {
  EmailIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from 'react-share';

import { ExternalLink } from '../components/Link';
import FormikErrorFocus from '../components/FormikErrorFocus';
import { PureLayout as Layout } from '../components/Layout';
import { PurePageHeader as PageHeader } from '../components/PageHeader';
import { TextInputField } from '../components/InputField';
import validate from '../utils/form';

const Contact = ({ data }) => (
  <>
    <PageHeader data={data} pageTitle="About" />
    <Layout data={data}>
      <Heading>Work in progress...</Heading>
      <Flex as="main" w="100%" justify="flex-start" direction="column">
        <Heading as="h1" size="4xl">
          Get in touch...
        </Heading>
        <Flex direction="row">
          <List>
            <ListItem>
              <ListIcon as={() => <EmailIcon size={48} round />} />
              Email: ask@rodneylab.com
            </ListItem>
            <ListItem>
              <ListIcon as={() => <TwitterIcon size={48} round />} />
              Twitter: @askRodney
            </ListItem>
            <ListItem>
              <ListIcon as={() => <FacebookMessengerIcon size={48} round />} />
              Facebook: rodneyLab
            </ListItem>
            <ListItem>
              <ListIcon as={() => <TelegramIcon size={48} round />} />
              <ExternalLink
                aria-label="Contact Rodney Lab on Telegram"
                to="https://t.me/askRodney"
                text="askRodney"
              >
                rodneyLab
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ListIcon as={() => <LinkedinIcon size={48} round />} />
              LinkedIn: rodneyLab
            </ListItem>
          </List>
        </Flex>
        <Flex>
          <Formik
            initialValues={{
              name: '',
              email: '',
              messages: '',
            }}
            onSubmit={() => alert('Submitted!')}
            validate={validate}
          >
            {({ isSubmitting }) => (
              <FormikErrorFocus>
                <Form id="contact-form" name="contact">
                  <Heading>Write us a message...</Heading>
                  <TextInputField
                    isRequired
                    id="name-contact"
                    name="name"
                    placeholder="Name"
                    label="name"
                    title="Name"
                    type="text"
                  />
                  <TextInputField
                    isRequired
                    id="email-contact"
                    name="email"
                    placeholder="Email"
                    label="email"
                    title="Email"
                    type="email"
                  />
                  <Button disabled={isSubmitting} />
                </Form>
              </FormikErrorFocus>
            )}
          </Formik>
        </Flex>
      </Flex>
    </Layout>
  </>
);

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
  }).isRequired,
};

export const query = graphql`
  query ContactQuery {
    site {
      ...PageHeaderFragment
    }
    allContentfulLocation {
      ...HeaderFragment
    }
  }
`;

export { Contact as default };
