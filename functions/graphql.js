const { getSchema } = require('spotify-graphql')
const { ApolloServer } = require('apollo-server-lambda')

const schema = getSchema({
  clientId: null,
  clientSecret: null,
  accessToken: process.env.SPOTIFY_TOKEN,
})

const server = new ApolloServer({
  schema,
})

exports.handler = server.createHandler()
