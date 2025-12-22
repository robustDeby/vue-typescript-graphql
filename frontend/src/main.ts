import { createApp, h } from 'vue'
import { createClient, provideClient } from '@urql/vue'
import { cacheExchange, fetchExchange } from '@urql/core'
import { router } from './router'
import App from './App.vue'

const client = createClient({
  url: 'http://localhost:4000/graphql',
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

app
.use(router)
.mount('#app')
