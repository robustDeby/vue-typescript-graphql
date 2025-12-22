import { createServer } from 'node:http'
import { createYoga, createSchema } from 'graphql-yoga'

const schema = createSchema({
  typeDefs: `
    type Query {
      hello: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello from GraphQL backend',
    },
  },
})

const yoga = createYoga({ schema })

const server = createServer(yoga)

server.listen(4000, () => {
  console.log('GraphQL running at http://localhost:4000/graphql')
})
