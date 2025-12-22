<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="app">
    <AppHeader />

    <main class="main">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  background-color: antiquewhite;
}
</style>
