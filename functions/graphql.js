const { getSchema } = require('spotify-graphql')
const { ApolloServer } = require('apollo-server-lambda')

const schema = getSchema({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  accessToken: process.env.SPOTIFY_TOKEN,
})

const server = new ApolloServer({
  schema,
})

exports.handler = server.createHandler()
