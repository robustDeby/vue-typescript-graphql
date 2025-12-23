import { GraphQLClient } from 'graphql-request'
import { getToken } from '../auth/index'

export const graphqlClient = new GraphQLClient(
  'http://localhost:4000/graphql',
  {
    headers: () => ({
      Authorization: `Bearer ${getToken()}`
    }),
    responseMiddleware: (response) => {
      if (response instanceof Error) {
        if (response.message.includes('Unauthorized')) {
          localStorage.removeItem('token')
          location.href = '/login'
        }
      }
    }
  }
)

