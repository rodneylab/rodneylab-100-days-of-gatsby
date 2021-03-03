import React from 'react';
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image';
import { Heading } from '@chakra-ui/react';
import { Link, graphql } from 'gatsby';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

// We're using Gutenberg so we need the block styles
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/theme.css';

import { PureLayout as Layout } from '../components/Layout';
import { PureSEO as SEO } from '../components/SEO/SEO';

export default function BlogPostTemplate({ data }) {
  const { previous, next, post } = data;
  const { featuredImage, title, uri } = post;
  const { opengraphImage, opengraphTitle } = post.seo;
  // const featuredImage = {
  //   fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
  //   alt: post.featuredImage?.node?.alt || '',
  // };

  const { facebookPage, facebookAuthorPage, siteUrl } = data.site.siteMetadata;
  const pageMetadata = {
    featuredImage: {
      url: getSrc(featuredImage?.node?.localFile),
      width: 992,
      height: 730,
    },
    ogImage: {
      url: opengraphImage ? getSrc(opengraphImage.localFile) : null,
      // url: opengraphImage.uri,
      alt: opengraphImage.altText,
      width: 1200,
      height: 627,
    },
    // ogImage: {
    //   width: 1200,
    //   height: 627,
    // },
    // ogSquareImage: {
    //   url: data.ogSquareImage ? getSrc(data.ogSquareImage.localFile) : null,
    //   width: 400,
    //   height: 400,
    // },
    // twitterImage: {
    //   url: data.twitterImage ? getSrc(data.twitterImage.localFile) : null,
    //   width: 800,
    //   height: 418,
    // },
    facebookAuthorPage,
    facebookPage,
    pageTitle: opengraphTitle,
    seoMetaDescription: 'AudioC0re: headhones sharing... share your core. Learn about AudoC0re.',
    title,
    url: `${siteUrl}${uri}`,
  };

  return (
    <Layout data={data}>
      <SEO data={data} isArticle pageMetadata={pageMetadata} />
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <Heading as="h1" size="xl" my="4">
            {parse(post.title)}
          </Heading>
          <p>{post.date}</p>
          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.node?.localFile?.childImageSharp ? (
            <GatsbyImage
              image={getImage(featuredImage?.node?.localFile)}
              alt={featuredImage.altText}
              width={992}
            />
          ) : null}
        </header>
        {!!post.content && <section itemProp="articleBody">{parse(post.content)}</section>}
        <hr />
      </article>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ←
                {' '}
                {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)}
                {' '}
                →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
}

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    previous: PropTypes.shape({
      title: PropTypes.string,
      uri: PropTypes.string,
    }),
    post: PropTypes.shape({
      content: PropTypes.string,
      date: PropTypes.string,
      title: PropTypes.string,
      uri: PropTypes.string,
      featuredImage: PropTypes.shape({
        altText: PropTypes.string,
        node: ({
          localFile: PropTypes.shape({
            childImageSharp: PropTypes.shape,
          }),
        }),
      }),
    }),
    next: PropTypes.shape({
      title: PropTypes.string,
      uri: PropTypes.string,
    }),
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
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    site {
      ...SEOFragment
    }
    allContentfulLocation {
      ...HeaderFragment
    }
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      uri
      seo {
        metaDesc
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphTitle
        opengraphImage {
          altText
          uri
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 1200
                height: 627
                layout: FIXED
              )
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 992
                layout: CONSTRAINED
                sizes: "(max-width: 480px) 480px, (max-width: 768px) 768px, 992px"
              )
            }
          }
        }
      }
    }
    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`;
