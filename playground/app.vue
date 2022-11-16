<template>
  <main>
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/test">Test Page</nuxt-link>
      <nuxt-link to="/another">Another Page</nuxt-link>
    </nav>
    <div v-if="headExtraValues?.section">
      headExtraValues.section = "{{ headExtraValues.section }}"
    </div>
    <NuxtPage/>
    <div v-if="headExtraValues">
      <p><strong>Passed Title</strong>: {{ headExtraValues?.title || '(none)' }}</p>
      <p><strong>Passed Section</strong>: {{ headExtraValues?.section || '(none)' }}</p>
      <p><strong>Extra</strong>: {{ headExtraValues?.extra || '(none)' }}</p>
      <p><strong>Rendered Title</strong>: {{ headExtraValues?.fullTitle || '(none)' }}</p>
    </div>
  </main>
</template>

<script setup>
import { useNuxtApp, useState } from '#app'
import { useHeadEx } from '#imports'

const nuxt = useNuxtApp()
const headExtraValues = useState('headExtraValues')
nuxt.$headExtra.callback = (headObj) => {
  // eslint-disable-next-line no-console
  console.log('headExtra.callback', headObj)
}
nuxt.hook('headExtra:update', (headObj) => {
  const sectionTitle = headObj.meta.find(v => v.name === 'clean:section')
  // eslint-disable-next-line no-console
  // console.log('headExtra:update', headObj)
})

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
