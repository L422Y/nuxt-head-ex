<template>
  <nav>
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link to="/test">Test Page</nuxt-link>
    <nuxt-link to="/another">Another Page</nuxt-link>
  </nav>
  <NuxtPage/>
</template>

<script setup>
import {useHeadEx} from "../src/runtime/composables";

useHeadEx({
  title: 'Test!'
})
</script>
<style>
nav {
  margin-bottom: 1rem;
}
a + a {
  margin-left: 1rem;
}
</style>
