import { createApp, h } from 'vue'
import { createClient, provideClient } from '@urql/vue'
import { cacheExchange, fetchExchange } from '@urql/core'
import { router } from './router'
import App from './App.vue'
import { hasValidLocalToken } from '@/auth/session'
import { removeToken } from './auth/index'

const client = createClient({
  url: 'http://localhost:5000/graphql',
  exchanges: [
    cacheExchange,
    fetchExchange,
  ],
})

const app = createApp({
  setup() {
    provideClient(client)
  },
  render: () => h(App),
})

if (!hasValidLocalToken()) {
  removeToken()
}
app
.use(router)
.mount('#app')

