import React from 'react';
import { getSrc } from 'gatsby-plugin-image';
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
  VisuallyHidden,
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
import { PureSEO as SEO } from '../components/SEO/SEO';
import formiumComponents from '../components/FormiumComponents';
import { formium } from '../utils/form';
import { H_ELLIPSIS_ENTITY } from '../constants/entities';

export default function Contact({ pageContext: { slug }, data }) {
  const [isDesktop] = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  const handleSubmit = async (values) => {
    await formium.submitForm(slug, values);
    navigate('/home/', { state: { formSubmitted: true } });
  };

  const { siteUrl, title } = data.site.siteMetadata;
  const pageMetadata = {
    featuredImage: {
      url: getSrc(data.featuredImage.localFile),
      width: 992,
      height: 730,
    },
    ogImage: {
      url: data.ogImage ? getSrc(data.ogImage.localFile) : null,
      width: 1200,
      height: 627,
    },
    ogSquareImage: {
      url: data.ogSquareImage ? getSrc(data.ogSquareImage.localFile) : null,
      width: 400,
      height: 400,
    },
    twitterImage: {
      url: data.twitterImage ? getSrc(data.twitterImage.localFile) : null,
      width: 800,
      height: 418,
    },
    pageTitle: 'Home',
    seoMetaDescription:
      'AudioC0re: headhones sharing... share your core. Get in touch with your local AudioC0re hub.',
    title,
    url: `${siteUrl}/home/contact/`,
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
        <SEO data={data} pageMetadata={pageMetadata} />
        <Layout data={data}>
          <Flex as="main" w="100%" justify="stretch" direction="column" color="yellow.500">
            <VisuallyHidden as="h1">Contact us</VisuallyHidden>
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
              <GridItem colSpan={1} h="100%" bg="blue.700">
                <Flex direction="column" bg="blue.700" align="center">
                  <Heading as="h2" size="lg" my="8">
                    Our accounts
                  </Heading>
                  <ContactList />
                </Flex>
              </GridItem>
              <GridItem colSpan={1}>
                <Flex bg="blue.700" w="100%" h="100%" align="center" direction="column">
                  <Heading as="h2" size="lg" my="8">
                    Contact form
                  </Heading>
                  <Flex direction="column" align="stretch" w="100%" px="6" mb="6">
                    {data.formiumForm ? (
                      <FormiumForm
                        data={data.formiumForm}
                        onSubmit={handleSubmit}
                        components={formiumComponents}
                      />
                    ) : null}
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
      <SEO data={data} pageMetadata={pageMetadata} />
      <Layout data={data}>
        <Flex as="main" direction="column" w="100%" color="yellow.500" px={[4, 4, 'auto', 4, 0]}>
          <VisuallyHidden as="h1">Contact us</VisuallyHidden>
          <Flex bg="blue.700" justify="flex-start" direction="column">
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
                  <Heading as="h2" mb="4">
                    Sound us out...
                  </Heading>
                  <Flex direction="column" align="stretch" w="100%" px="6" mb="6">
                    {data.formiumForm ? (
                      <FormiumForm
                        data={data.formiumForm}
                        onSubmit={handleSubmit}
                        components={formiumComponents}
                      />
                    ) : null}
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
}

Contact.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
    allContentfulLocation: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          city: PropTypes.string,
          slug: PropTypes.string,
        }),
      ),
    }),
    featuredImage: PropTypes.shape({
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape({
            src: PropTypes.string,
            presentationWidth: PropTypes.number,
            presentationHeight: PropTypes.number,
          }),
        }),
      }),
    }),
    ogImage: PropTypes.shape({
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fixed: PropTypes.shape({
            src: PropTypes.string,
          }),
        }),
      }),
    }),
    ogSquareImage: PropTypes.shape({
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fixed: PropTypes.shape({
            src: PropTypes.string,
          }),
        }),
      }),
    }),
    twitterImage: PropTypes.shape({
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fixed: PropTypes.shape({
            src: PropTypes.string,
          }),
        }),
      }),
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
      ...SEOFragment
    }
    allContentfulLocation {
      ...HeaderFragment
    }
    featuredImage: contentfulAsset(localFile: {absolutePath: {regex: "/headphones\\.jpg*/"}}) {
      ...FeaturedImageFragment
    }
    ogImage: contentfulAsset(localFile: {absolutePath: {regex: "/headphones\\.jpg*/"}}) {
      ...OGImageFragment
    }
    ogSquareImage: contentfulAsset(localFile: {absolutePath: {regex: "/headphones\\.jpg*/"}}) {
      ...OGSquareImageFragment
    }
    twitterImage: contentfulAsset(localFile: {absolutePath: {regex: "/headphones\\.jpg*/"}}) {
      ...TwitterImageFragment
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
