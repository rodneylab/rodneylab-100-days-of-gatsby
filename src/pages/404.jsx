import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import PurePageNotFound from '../components/PurePageNotFound';

export default function PageNotFound() {
  const data = useStaticQuery(
    graphql`
      query PageNotFoundQuery {
        site {
          ...PageHeaderFragment
        }
        allContentfulLocation {
          ...HeaderFragment
        }
      }
    `,
  );
  return <PurePageNotFound data={data} />;
}
