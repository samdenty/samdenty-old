const path = require('path')

exports.createPages = async ({ graphql, getNode, actions }) => {
  const result = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            tableOfContents
            parent {
              ... on File {
                absolutePath
                dir
                relativeDirectory
                name
                sourceInstanceName
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  result.data.allMdx.edges.forEach(({ node }) => {
    const root = node.parent.relativeDirectory.length
      ? node.parent.dir.slice(0, -node.parent.relativeDirectory.length)
      : node.parent.dir

    actions.createPage({
      path: `/${node.parent.sourceInstanceName}/${node.parent.name}`,
      component: path.join(root, 'index.js'),
      context: {
        absPath: node.parent.absolutePath,
        tableOfContents: node.tableOfContents,
        id: node.id,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)

    actions.createNodeField({
      node,
      name: `slug`,
      value: `/${parent.sourceInstanceName}/${parent.name}`,
    })
  }
}
