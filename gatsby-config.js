require('dotenv').config()
const queries = require('./src/utils/algolia')

module.exports = {
  siteMetadata: {
    title: `Sam Denty`,
    siteUrl: `https://samdenty.com`,
    description: `todo`,
    author: `@samdenty`,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-prismjs',
          'gatsby-remark-emojis',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          'gatsby-remark-autolink-headers',
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
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,

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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
  ].filter(Boolean),
  mapping: {
    'Mdx.frontmatter.languages': `LanguagesYaml`,
    'Mdx.frontmatter.tags': `TagsYaml`,
  },
}
