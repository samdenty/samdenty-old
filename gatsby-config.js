require('dotenv').config()
const queries = require('./src/utils/algolia')

const siteUrl = `https://samdenty.dev`
module.exports = {
  siteMetadata: {
    title: `Sam Denty`,
    siteUrl,
    description: `todo`,
    author: `@samdenty`,
  },
  plugins: [
    `gatsby-plugin-linaria`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /Icon/,
        },
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-embedded-codesandbox',
            options: {
              directory: `${__dirname}/src/_examples/`,
              protocol: 'codesandbox://',

              // Customise Codesandbox embedding options:
              // https://codesandbox.io/docs/embedding#embed-options
              // default:
              embedOptions: {
                view: 'split',
                runonclick: 1,
                hidenavigation: 1,
              },
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-emojis',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              withWebp: true,
              linkImagesToOriginal: false,
              backgroundColor: '#0A0018',
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'projects',
        path: `${__dirname}/src/projects/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'components',
        path: `${__dirname}/src/components/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    `gatsby-transformer-sharp`,

    process.env.GATSBY_ALGOLIA_APP_ID &&
      process.env.ALGOLIA_ADMIN_KEY && {
        resolve: `gatsby-plugin-algolia`,
        options: {
          appId: process.env.GATSBY_ALGOLIA_APP_ID,
          apiKey: process.env.ALGOLIA_ADMIN_KEY,
          queries,
          chunkSize: 10000, // default: 1000
        },
      },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-netlify-cache`,
      options: {
        extraDirsToCache: ['.linaria-cache'],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
  ].filter(Boolean),
  mapping: {
    'Mdx.frontmatter.languages': `LanguagesYaml`,
    'Mdx.frontmatter.tags': `TagsYaml`,
  },
  proxy: {
    prefix: '/.netlify',
    url: siteUrl,
  },
}
