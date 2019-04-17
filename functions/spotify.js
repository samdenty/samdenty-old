require('dotenv').config()
const typeDefs = require('spotify-graphql/dist/lib/schema').default
const resolverMapBuilder = require('spotify-graphql/dist/lib/resolvers').default
const SpotifyWebApi = require('spotify-web-api-node')
const { makeExecutableSchema } = require('graphql-tools')
const { ApolloServer } = require('apollo-server-lambda')

const client = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'https://samdd.me',
})

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers: resolverMapBuilder(client),
  }),
})

const handler = server.createHandler()

// var authorizeURL = client.createAuthorizeURL([
//   'user-read-recently-played',
//   'user-top-read',
//   'user-read-playback-state',
//   'user-read-currently-playing',
// ])

// console.log(authorizeURL)

exports.handler = (event, context, callback) => {
  client.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN)
  client
    .refreshAccessToken()
    .then(data => {
      client.setAccessToken(data.body['access_token'])
      handler(event, context, callback)
    })
    .catch(error => {
      console.log('error', error)
    })
}
