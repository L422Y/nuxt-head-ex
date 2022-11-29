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
    <div v-if="sectionTitle">
      Section Title: {{ sectionTitle }}
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

nuxt.$headExtra.callback = (headObj) => {
  // eslint-disable-next-line no-console
  // console.log('headExtra.callback', headObj)
}

const headExtraValues = useState('headExtraValues')

nuxt.$headExtra.renderTitle = function ({
  title,
  subtitle,
  section,
  separator,
  extra
}) {
  let renderedTitle = `${section && section?.length > 0 ? ` ${separator} ${section}` : ''}${extra && extra.length > 0 ? (title ? `  ${separator} ` : '') + extra : ''}`
  if (title) {
    renderedTitle = `⚡️ ${title}${renderedTitle}`
  } else {
    title = renderedTitle
  }
  return renderedTitle
}

const sectionTitle = useState('sectionTitle')
nuxt.hook('headExtra:update', (headObj) => {
  sectionTitle.value = headObj.meta.find(v => v.name === 'clean:section')?.content
})

useHeadEx({
  title: 'Test!',
  section: 'Home Section'
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
