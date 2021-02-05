<p align="center">
  <a aria-label="Open Rodney Lab site" href="https://rodneylab.com" rel="noopener">
    <img alt="Gatsby" src="https://rodneylab.com/assets/icon.png" width="60" />
  </a>
</p>
<h1 align="center">
  rodneylab-100-days-of-gatsby
</h1>

## Table of contents
+ [Features](http://github.com/rodneylab/rodneylab-100-days-of-gatsby#features)
+ [Web Performance Tests](http://github.com/rodneylab/rodneylab-100-days-of-gatsby#web-performance-tests)
+ [Quick Start](http://github.com/rodneylab/rodneylab-100-days-of-gatsby#quick-start)
+ [Deploy with Netlify](http://github.com/rodneylab/rodneylab-100-days-of-gatsby#deploy-with-netlify)
+ [Folder Structure](http://github.com/rodneylab/rodneylab-100-days-of-gatsby#folder-structure)
+ [License](http://github.com/rodneylab/rodneylab-100-days-of-gatsby#license)

## Features
+ Accessible
+ Fast
+ Built as part of <a aria-label="Open 100 Days of Gatsby Challenge" href="https://rodneylab.com/100-days-of-gatsby-code-2021/" rel="noopener">100 Days of Gatsby Challenge 2021</a>.  Live site is at <a aria-label="Open Live rodneylab-100-days-of-gatsby live site" href="https://rodneylab100daysofgatsbymain.gtsb.io/home" rel="noopener">https://rodneylab100daysofgatsbymain.gtsb.io/home</a>.

## Web Performance Tests
+ Lighthouse Report - Scores 100 on Performance, Accessibility and Best Practices.  Hosting on Gatsby Cloud Free, a _x-robots-tag: none_ header is served.  This causes the SEO score to drop from 100 to 91.

## Quick Start

#### Create a Gatsby site

Use the Gatsby CLI to create a new site, specifying the Lumen starter.

```sh
# Create a new Gatsby site using this repo
gatsby new blog https://github.com/rodneylab/rodneylab-100-days-of-gatsby
```

#### Start Developing

Navigate into your new site’s directory and start it up.

```sh
cd blog
gatsby develop
```

#### Open the source code and start editing!

Your site is now running at `http://localhost:8000`!

Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

Open the `blog` directory in your code editor of choice and edit `src/templates/index-template.js`. Save your changes and the browser will update in real time!

## Deploy to Gatsby Cloud
Gatsby Cloud is a platform of stable, trusted tools launched by the team behind Gatsby.js.  See <a aria-label="Open instructions on setting up a Gatsby site on Gatsby Cloud" href="https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/deploying-to-gatsby-cloud/" target="_blank" rel="nofollow noopener noreferrer">instrcutions on setting up a Gatsby Cloud deploy</a>.

## Deploy with Netlify

[Netlify](https://netlify.com) CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. Use the button below to build and deploy your own copy of the repository:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/rodneylab/rodneylab-100-days-of-gatsby" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. Next, you’ll need to set up Netlify’s Identity service to authorize users to log in to the CMS.

## Deploy to Github Pages

To deploy to github pages, simply do the following:

- Ensure that your `package.json` file correctly reflects where this repo lives
- Change the `pathPrefix` in your `config.js`
- Run the standard deploy command

```sh
yarn deploy
```


#### Access Locally
```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn
$ yarn develop
```
To test the CMS locally, you'll need run a production build of the site:
```
$ yarn build
$ gatsby serve
```

## Folder Structure

```
└── src
    ├── components
    │   ├── Emoji
    │   ├── Footer
    │   ├── Header
    │   ├── Layout
    │   └── PageHeader
    ├── constants
    ├── pages
    ├── templates
    └── utils
```

## License
The MIT License (MIT)

Copyright (c) 2021 Rodney Johnson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
